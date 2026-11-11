// ============================================================================
// miliconfig - استخر یکپارچه منابع لبهٔ کلادفلر
//
// منابع (طبق درخواست کاربر، هر دو مخزن کامل مطالعه شده‌اند):
//   • منابع ترجیحی داخلی          → ۲۱ دامنهٔ ترجیحی، ۱۰ آی‌پی اتصال رسمی،
//                                       ۱۴ ProxyIP منطقه‌ای، فهرست آنلاین bestip
//   • آینهٔ لبهٔ عمومی             → ips.txt (IPv4)، ip6.txt (IPv6)،
//                                       dom.txt (دامنه لبه)، ech_dom.txt و
//                                       ech_dns.txt (دامنه/DNS برای ECH)
//
// قواعد مهم:
//   ۱) آی‌پی‌ها با رنج‌های رسمی کلادفلر فیلتر می‌شوند؛ لیست‌های عمومی حاوی
//      آی‌پی‌های غیرکلادفلر هم هستند و آدرس‌کردن آن‌ها نود را خراب می‌کند.
//   ۲) پاسخ فوری از فهرست داخلی ساخته می‌شود و لیست‌های تازه در پس‌زمینه
//      (waitUntil) جایگزین می‌شوند؛ مسیر ساب‌لینک هیچ‌وقت منتظر شبکه نمی‌ماند.
//   ۳) نتیجه ۳۰ دقیقه در حافظهٔ ایزوله و در Cache API نگه داشته می‌شود.
// ============================================================================

import {
  CFNEW_IPV4_SOURCES,
  CFNEW_IPV6_SOURCES,
  CFNEW_PROXYIP_SOURCES,
  DIRECT_EDGE_IPS,
  EDGE_LIST_URL,
  PREFERRED_EDGE_DOMAINS,
  EDGE_PROXY_IPS,
  DOMAIN_CANDIDATE_SOURCES,
  IPV6_CANDIDATE_SOURCES,
  IP_CANDIDATE_SOURCES,
  EDGE_MIRROR_SOURCES
} from '../config/sources.js';
import {
  DIRECT_DOMAINS,
  ECH_DOMAINS,
  FALLBACK_PROXY_IPS,
  OFFICIAL_DIRECT_IPS,
  OFFICIAL_DIRECT_IPV6
} from '../config/defaults.js';
import { isValidDomain, isValidIpAddress } from './utils.js';

// استخرهای cfnew چند بار در روز عوض می‌شوند؛ با TTL متعادل هم از سقف subrequest
// کلادفلر محافظت می‌شود و هم نودها همیشه به‌روز می‌مانند.
const POOL_TTL_MS = 15 * 60 * 1000;
const POOL_FETCH_TIMEOUT_MS = 2200;
// حداکثر صبر یک ایزولهٔ سرد برای گرفتن لیست زنده (بعد از آن همان استخر داخلی)
// کوتاه است تا ساب‌لینک کند نشود؛ لیست زنده در همان درخواست بعدی می‌نشیند.
const POOL_COLD_WAIT_MS = 600;
const POOL_MAX_CHARS = 180000;
const POOL_MAX_ITEMS = 240;
const POOL_CACHE_BASE = 'https://edge-pool.miliconfig.internal';

// رنج‌های رسمی کلادفلر (cloudflare.com/ips-v4 و ips-v6)
export const CF_IPV4_CIDRS = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'
];
export const CF_IPV6_CIDRS = [
  '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
  '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32'
];

function poolIpv4ToInt(ip) {
  const parts = String(ip).split('.');
  if (parts.length !== 4) return -1;
  let value = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return -1;
    value = value * 256 + n;
  }
  return value;
}

const IPV4_RANGES = CF_IPV4_CIDRS.map(cidr => {
  const [base, bits] = cidr.split('/');
  const prefix = Number(bits) || 32;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return { base: poolIpv4ToInt(base) & mask, mask };
});

export function isCloudflareIpv4(ip) {
  const value = poolIpv4ToInt(ip);
  if (value < 0) return false;
  return IPV4_RANGES.some(range => (value & range.mask) === range.base);
}

export function isCloudflareIpv6(ip) {
  const text = String(ip || '').toLowerCase().replace(/^\[|\]$/g, '');
  if (!text.includes(':')) return false;
  const expanded = poolExpandIpv6(text);
  if (!expanded) return false;
  return CF_IPV6_CIDRS.some(cidr => {
    const [base, bits] = cidr.split('/');
    const prefixBits = Number(bits) || 128;
    const baseExpanded = poolExpandIpv6(base.toLowerCase());
    if (!baseExpanded) return false;
    return expanded.slice(0, prefixBits) === baseExpanded.slice(0, prefixBits);
  });
}

// تبدیل IPv6 به رشتهٔ ۱۲۸ بیتی (هر کاراکتر یک بیت) برای مقایسهٔ پیشوندی
function poolExpandIpv6(input) {
  const [headRaw, tailRaw] = String(input).split('::');
  const head = headRaw ? headRaw.split(':').filter(Boolean) : [];
  const tail = tailRaw ? tailRaw.split(':').filter(Boolean) : [];
  if (head.length + tail.length > 8) return '';
  const groups = [
    ...head,
    ...Array(Math.max(0, 8 - head.length - tail.length)).fill('0'),
    ...tail
  ];
  let bits = '';
  for (const group of groups) {
    const n = parseInt(group || '0', 16);
    if (!Number.isFinite(n)) return '';
    bits += n.toString(2).padStart(16, '0');
  }
  return bits;
}

export function isCloudflareAddress(host) {
  if (isValidIpAddress(host) || /^\d{1,3}(\.\d{1,3}){3}$/.test(String(host))) {
    return String(host).includes(':') ? isCloudflareIpv6(host) : isCloudflareIpv4(host);
  }
  return false;
}

async function readPoolTextLimited(response, maxChars) {
  const reader = response.body?.getReader?.();
  if (!reader) {
    const text = await response.text();
    return text.slice(0, maxChars);
  }
  const decoder = new TextDecoder();
  let out = '';
  let done = false;
  while (!done && out.length < maxChars) {
    const chunk = await reader.read();
    done = chunk.done;
    if (chunk.value) out += decoder.decode(chunk.value, { stream: !done });
  }
  try { reader.cancel(); } catch (_e) {}
  return out.slice(0, maxChars);
}

async function poolFetchText(url, timeout = POOL_FETCH_TIMEOUT_MS) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!response.ok) return '';
    return await readPoolTextLimited(response, POOL_MAX_CHARS);
  } catch (_e) {
    return '';
  }
}

function poolPushUnique(list, seen, value, limit = POOL_MAX_ITEMS) {
  if (list.length >= limit) return;
  if (!value || seen.has(value)) return;
  seen.add(value);
  list.push(value);
}

// فهرست داخلی فوری — همیشه در دسترس، بدون هیچ درخواست شبکه‌ای
export function poolBuiltin() {
  const ipv4 = [];
  const ipv4Seen = new Set();
  for (const ip of DIRECT_EDGE_IPS) poolPushUnique(ipv4, ipv4Seen, ip);
  for (const ip of OFFICIAL_DIRECT_IPS) poolPushUnique(ipv4, ipv4Seen, ip);

  const ipv6 = [];
  const ipv6Seen = new Set();
  for (const ip of OFFICIAL_DIRECT_IPV6) poolPushUnique(ipv6, ipv6Seen, ip);

  const domains = [];
  const domainSeen = new Set();
  for (const domain of PREFERRED_EDGE_DOMAINS) poolPushUnique(domains, domainSeen, domain, 120);
  for (const item of DIRECT_DOMAINS) poolPushUnique(domains, domainSeen, item.domain, 120);

  const echDomains = [];
  const echSeen = new Set();
  for (const domain of ECH_DOMAINS) poolPushUnique(echDomains, echSeen, domain, 60);

  const proxyIps = EDGE_PROXY_IPS.map(item => ({ ...item, port: 443 }))
    .concat(FALLBACK_PROXY_IPS.map(item => ({ ...item })));

  return { ipv4, ipv6, domains, echDomains, echDns: [], proxyIps, origin: 'builtin' };
}

// ادغام لیست‌های تازه در استخر داخلی؛ آی‌پی‌های خارج از رنج کلادفلر دور ریخته می‌شوند
function poolMergeFetched(builtin, fetched) {
  const v4Seen = new Set(builtin.ipv4);
  const v6Seen = new Set(builtin.ipv6);
  const domSeen = new Set(builtin.domains);
  const echSeen = new Set(builtin.echDomains);
  const dnsSeen = new Set(builtin.echDns);
  const out = {
    ipv4: [...builtin.ipv4],
    ipv6: [...builtin.ipv6],
    domains: [...builtin.domains],
    echDomains: [...builtin.echDomains],
    echDns: [...builtin.echDns],
    proxyIps: [...builtin.proxyIps],
    origin: 'live'
  };

  // ProxyIP های زندهٔ فیدها (مناطق جدید مثل FR/GB یا استخرهای تازه) هم اضافه می‌شوند
  const proxySeen = new Set(out.proxyIps.map(item => String(item.domain).toLowerCase()));
  for (const item of (fetched.proxyIps || [])) {
    const domain = String(item?.domain || '').toLowerCase();
    if (!domain || proxySeen.has(domain) || !isValidDomain(domain)) continue;
    proxySeen.add(domain);
    out.proxyIps.push({ domain, region: item.region || 'Multi' });
    if (out.proxyIps.length >= 80) break;
  }

  for (const item of fetched.ipv4) {
    if (!isValidIpAddress(item) || !isCloudflareIpv4(item)) continue;
    poolPushUnique(out.ipv4, v4Seen, item, POOL_MAX_ITEMS);
  }
  for (const item of fetched.ipv6) {
    if (!isValidIpAddress(item) || !isCloudflareIpv6(item)) continue;
    poolPushUnique(out.ipv6, v6Seen, item, POOL_MAX_ITEMS);
  }
  for (const item of fetched.domains) {
    if (!isValidDomain(item)) continue;
    poolPushUnique(out.domains, domSeen, item, 160);
  }
  for (const item of fetched.echDomains) {
    if (!isValidDomain(item)) continue;
    poolPushUnique(out.echDomains, echSeen, item, 80);
  }
  for (const item of fetched.echDns) {
    if (!isValidIpAddress(item)) continue;
    poolPushUnique(out.echDns, dnsSeen, item, 40);
  }
  return out;
}

// پارس خطوط «یک آدرس در هر خط»؛ خطوط host:port#برچسب هم پشتیبانی می‌شوند
function poolParseAddressLines(text) {
  const hosts = [];
  const domains = [];
  for (const rawLine of String(text || '').split(/[\r\n]+/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('*')) continue;
    const hashIdx = line.indexOf('#');
    if (hashIdx > -1) line = line.slice(0, hashIdx).trim();
    line = line.replace(/^[a-z0-9+.-]+:\/\//i, '');
    if (line.includes('@')) line = line.split('@').pop();
    line = line.split('/')[0].trim();
    if (line.startsWith('[')) line = line.replace(/^\[|\].*$/g, '');
    else {
      const colon = line.lastIndexOf(':');
      if (colon > -1 && /^\d+$/.test(line.slice(colon + 1))) line = line.slice(0, colon);
    }
    if (!line) continue;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(line) || line.includes(':')) hosts.push(line);
    else if (isValidDomain(line) || line.includes('.')) domains.push(line);
  }
  return { hosts, domains };
}

let memoryPool = { at: 0, value: null };
let inflight = null;
let lastLiveAt = 0;

function poolGetCache() {
  try {
    return typeof caches !== 'undefined' ? caches.default : null;
  } catch (_e) {
    return null;
  }
}

// همهٔ فیدهای cfnew به‌صورت زنده خوانده می‌شوند با رعایت سخت‌گیرانه سقف subrequest کلادفلر:
// هر دسته حداکثر ۲ فید هم‌زمان (مجموعاً ۱۰ درخواست) تا هیچ‌گاه Error 1101 رخ ندهد.
async function poolFetchFresh() {
  const uniq = list => [...new Set(list.filter(Boolean))];
  const v4Urls = uniq([EDGE_MIRROR_SOURCES.ipv4, ...IP_CANDIDATE_SOURCES, ...CFNEW_IPV4_SOURCES]);
  const v6Urls = uniq([IPV6_CANDIDATE_SOURCES[0], EDGE_MIRROR_SOURCES.ipv6, ...IPV6_CANDIDATE_SOURCES, ...CFNEW_IPV6_SOURCES]);
  const domUrls = uniq([EDGE_MIRROR_SOURCES.domains, ...DOMAIN_CANDIDATE_SOURCES, EDGE_LIST_URL]);
  const proxyUrls = uniq(CFNEW_PROXYIP_SOURCES);

  const fetchMany = urls => Promise.all(urls.slice(0, 2).map(url => poolFetchText(url)));
  const [v4Texts, v6Texts, domTexts, proxyTexts, echDom, echDns] = await Promise.all([
    fetchMany(v4Urls),
    fetchMany(v6Urls),
    fetchMany(domUrls),
    fetchMany(proxyUrls),
    poolFetchText(EDGE_MIRROR_SOURCES.echDomains),
    poolFetchText(EDGE_MIRROR_SOURCES.echDns)
  ]);

  const flat = (texts) => texts.flatMap(text => {
    const parsed = poolParseAddressLines(text);
    return [...parsed.hosts, ...parsed.domains];
  });

  // ProxyIP های زندهٔ فیدها: دامنه‌های ProxyIP.* منطقه‌دار و بقیه به‌عنوان مولتی
  const proxyIps = [];
  const proxySeen = new Set();
  for (const text of proxyTexts) {
    for (const rawLine of String(text || '').split(/[\r\n]+/)) {
      let line = rawLine.trim();
      if (!line || line.length > 120) continue;
      line = line.replace(/^[a-z0-9+.-]+:\/\//i, '').split('#')[0].split('|')[0].split(',')[0].trim();
      const host = line.split('/')[0].replace(/^\[|\].*$/g, '').split(':')[0].trim().toLowerCase();
      if (!host || !isValidDomain(host) || proxySeen.has(host)) continue;
      proxySeen.add(host);
      const region = (host.match(/proxyip\.([a-z]{2})\./i) || [])[1] || '';
      proxyIps.push({ domain: host, region: region ? region.toUpperCase() : 'Multi' });
      if (proxyIps.length >= 60) break;
    }
  }

  const domParsedAll = domTexts.map(text => poolParseAddressLines(text));
  const echParsed = poolParseAddressLines(echDom);
  return {
    ipv4: [...flat(v4Texts), ...domParsedAll.flatMap(parsed => parsed.hosts)],
    ipv6: flat(v6Texts),
    domains: domParsedAll.flatMap(parsed => parsed.domains),
    echDomains: echParsed.domains,
    echDns: poolParseAddressLines(echDns).hosts,
    proxyIps
  };
}

// استخر لبه برای یک درخواست ساب‌لینک. مسیر پیش‌فرض: پاسخ فوری از استخر داخلی و
// در صورت داشتن waitUntil، تازه‌سازی در پس‌زمینه (بدون تأخیر برای کاربر).
// خواندن آخرین استخر زنده از Cache API — برای ایزولهٔ تازه که هنوز حافظه ندارد
async function poolReadCache() {
  const cache = poolGetCache();
  if (!cache) return null;
  try {
    const hit = await cache.match(`${POOL_CACHE_BASE}/v1`);
    if (!hit) return null;
    const data = await hit.json();
    if (!data || !Array.isArray(data.ipv4) || !data.ipv4.length) return null;
    return data;
  } catch (_e) {
    return null;
  }
}

export async function getEdgePool(cfg = {}, options = {}) {
  const now = Date.now();
  if (memoryPool.value && now - memoryPool.at < POOL_TTL_MS) return memoryPool.value;

  const builtin = poolBuiltin();
  // ایزولهٔ سرد (مثلاً بعد از استقرار تازه): آخرین استخر زنده‌ای که در Cache API
  // ذخیره شده فوراً برگردانده می‌شود و در پس‌زمینه تازه می‌شود؛ پس کاربر هیچ‌وقت
  // با لیست ثابت و کهنه روبه‌رو نمی‌شود.
  if (!memoryPool.value) {
    const cached = await poolReadCache();
    if (cached) memoryPool = { at: now - POOL_TTL_MS, value: cached };
  }

  const refresh = async () => {
    if (inflight) return inflight;
    inflight = (async () => {
      try {
        const fetched = await poolFetchFresh();
        const merged = poolMergeFetched(builtin, fetched);
        lastLiveAt = Date.now();
        memoryPool = { at: Date.now(), value: merged };
        const cache = poolGetCache();
        if (cache) {
          try {
            await cache.put(
              `${POOL_CACHE_BASE}/v1`,
              new Response(JSON.stringify(merged), {
                headers: {
                  'content-type': 'application/json',
                  'cache-control': `max-age=${Math.floor(POOL_TTL_MS / 1000)}`
                }
              })
            );
          } catch (_e) {}
        }
        return merged;
      } catch (_e) {
        return builtin;
      } finally {
        inflight = null;
      }
    })();
    return inflight;
  };

  // تازه‌سازی همیشه شروع می‌شود؛ اگر waitUntil باشد در پس‌زمینه ادامه می‌دهد
  const live = refresh();
  if (options.waitUntil) {
    try { options.waitUntil(live); } catch (_e) {}
  }

  // اگر استخری در حافظه یا کش نیست، حداکثر ۶۰۰ میلی‌ثانیه منتظر لیست زنده می‌مانیم
  // تا همان اولین درخواست هم از منابع به‌روز ساخته شود.
  if (!memoryPool.value && options.allowNetwork !== false && options.awaitRefresh !== false) {
    const merged = await Promise.race([
      live,
      new Promise(resolve => setTimeout(() => resolve(null), POOL_COLD_WAIT_MS))
    ]);
    return merged || builtin;
  }

  return memoryPool.value || builtin;
}

// تازه‌سازی اجباری (کرون) — خروجی خلاصه برای لاگ
export async function warmEdgePool() {
  const builtin = poolBuiltin();
  const fetched = await poolFetchFresh();
  const merged = poolMergeFetched(builtin, fetched);
  lastLiveAt = Date.now();
  memoryPool = { at: Date.now(), value: merged };
  const cache = poolGetCache();
  if (cache) {
    try {
      await cache.put(
        `${POOL_CACHE_BASE}/v1`,
        new Response(JSON.stringify(merged), {
          headers: {
            'content-type': 'application/json',
            'cache-control': `max-age=${Math.floor(POOL_TTL_MS / 1000)}`
          }
        })
      );
    } catch (_e) {}
  }
  return {
    ipv4: merged.ipv4.length,
    ipv6: merged.ipv6.length,
    domains: merged.domains.length,
    echDomains: merged.echDomains.length,
    echDns: merged.echDns.length,
    proxyIps: merged.proxyIps.length
  };
}

// انتخاب چرخشی با پرهیز از تکرار، برای نودهای ساب‌لینک
export function pickFromPool(pool = [], count = 1, options = {}) {
  const list = Array.isArray(pool) ? pool.filter(Boolean) : [];
  const wanted = Math.max(1, parseInt(count, 10) || 1);
  if (!list.length) return [];
  const stride = Math.max(1, Math.floor(list.length / wanted));
  const bucket = Math.floor(Date.now() / (options.windowMs || 15 * 60 * 1000));
  const start = options.seed !== undefined
    ? Math.abs(Number(options.seed) || 0) % list.length
    : bucket % list.length;
  const out = [];
  for (let i = 0; i < wanted && i < list.length; i++) {
    const item = list[(start + i * stride) % list.length];
    if (!out.includes(item)) out.push(item);
  }
  return out;
}
