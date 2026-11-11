// ============================================================================
// miliconfig v3.2 - تولیدکننده ساب‌لینک چندکاربره با نام‌گذاری گویای نودها
// و اعمال دقیق تنظیمات هر کاربر + محدودیت تعداد نودها در ساب (subNodeCount)
// ============================================================================

import {
  BRAND_NAME,
  CF_EDGE_DOMAINS,
  CF_HTTPS_PORTS,
  CF_HTTP_PORTS,
  CONFIG_DEFAULTS,
  COUNTRY_PROXY_SOURCES,
  DIRECT_DOMAINS,
  FALLBACK_PROXY_IPS,
  FRAGMENT_PRESETS,
  OFFICIAL_DIRECT_IPS,
  OFFICIAL_DIRECT_IPV6,
  OPENVPN_CSV_SOURCES,
  OPENVPN_PROFILE_SOURCES,
  OPENVPN_PUBLIC_PASS,
  OPENVPN_RAW_PROFILE_SOURCES,
  OPENVPN_PUBLIC_USER,
  WARP_DEFAULT_ADDRESS,
  WARP_DEFAULT_HOST,
  WARP_DEFAULT_PORT,
  WARP_ENDPOINT_IPS,
  WARP_ENDPOINT_PORTS,
  WARP_PEER_PUBLIC_KEY,
  WARP_REGISTRATION_URL,
  WARP_CLIENT_VERSION,
  isEnabledValue,
  normalizeAlpn,
  normalizeEffectiveConfig,
  parseNodePorts
} from '../config/defaults.js';
import {
  addressFamilyLabel,
  buildAntiFilterSni,
  buildNodeDisplayName,
  buildZip,
  decodeBase64Utf8,
  encodeBase64Utf8,
  finalizeMiliSubscriptionLinks,
  getRandomBytesSafe,
  getSafeCrypto,
  isValidDomain,
  isValidIpAddress,
  md5Hex,
  normalizeNodeHost,
  parseAddressAndPort
} from '../core/utils.js';
import { verifyCountryProxies } from '../core/proxyGeo.js';
import { loadGlobalConfig } from '../db/d1.js';
import { getEdgePool, pickFromPool } from '../core/edgePool.js';
import {
  generateClashConfig,
  generateLoonConfig,
  generateQuanxConfig,
  generateResidentialChainConfig,
  generateSingboxConfig,
  generateSurgeConfig
} from './converters.js';

// هش پایدار برای انتخاب «آی‌پی ثابت» هر کاربر: آدرس نود نباید با هر بار
// خواندن ساب‌لینک عوض شود (درخواست: آی‌پی در کلاینت ثابت بماند).
export function stableAddressSeed(text = '') {
  const str = String(text || '');
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

// انتخاب پایدار از یک فهرست: ترتیب بر اساس هش (seed + آیتم) است، پس با هر
// بار خواندن ساب‌لینک همان آی‌پی‌ها برمی‌گردند (آی‌پی ثابت در کلاینت).
export function pickStableAddresses(list = [], count = 1, seed = '') {
  const items = [...new Set((Array.isArray(list) ? list : []).filter(Boolean).map(String))];
  if (!items.length) return [];
  const ranked = items
    .map(item => ({ item, rank: stableAddressSeed(String(seed) + '|' + item) }))
    .sort((a, b) => a.rank - b.rank || a.item.localeCompare(b.item));
  return ranked.slice(0, Math.max(1, count)).map(entry => entry.item);
}

export function getOfficialDirectAddress(seed = '') {
  const list = OFFICIAL_DIRECT_IPS;
  const hit = seed
    ? list[stableAddressSeed(seed) % list.length]
    : list[Math.floor(Math.random() * list.length)];
  return {
    domain: hit,
    region: 'CF',
    regionCode: 'CF',
    port: 443
  };
}

function getNeighborRegions(region) {
  const map = {
    US: ['SG', 'JP', 'KR'],
    SG: ['JP', 'KR', 'US'],
    JP: ['SG', 'KR', 'US'],
    KR: ['JP', 'SG', 'US'],
    DE: ['NL', 'GB', 'SE', 'FI'],
    SE: ['DE', 'NL', 'FI', 'GB'],
    NL: ['DE', 'GB', 'SE', 'FI'],
    FI: ['SE', 'DE', 'NL', 'GB'],
    GB: ['DE', 'NL', 'SE', 'FI']
  };
  return map[region] || [];
}

function getOrderedRegions(region) {
  const neighbors = getNeighborRegions(region);
  const all = ['US', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB'];
  return [region, ...neighbors, ...all.filter(r => r !== region && !neighbors.includes(r))];
}

export async function selectFallbackProxyAddress(workerRegion = '', enableRegionMatch = true) {
  if (!workerRegion || workerRegion === 'CF') {
    return getOfficialDirectAddress();
  }
  if (FALLBACK_PROXY_IPS.length === 0) {
    return getOfficialDirectAddress();
  }
  if (enableRegionMatch && workerRegion) {
    const ordered = getOrderedRegions(workerRegion);
    for (const r of ordered) {
      const found = FALLBACK_PROXY_IPS.find(item => item.regionCode === r);
      if (found) return found;
    }
  }
  return FALLBACK_PROXY_IPS[0];
}

// ============================================================================
// مقدار پارامتر ECH در لینک‌ها — همان قالب قبلی: «دامنه ECH + آدرس DNS»
// ============================================================================
export function buildEchParamValue(cfg = {}) {
  if (cfg.ech !== 'yes') return '';
  const dnsVal = cfg.customDNS || CONFIG_DEFAULTS.customDNS;
  const echDomain = cfg.customECHDomain || CONFIG_DEFAULTS.customECHDomain;
  return `${echDomain}+${dnsVal}`;
}

// مسیر یکتای هر نوع نود (vless/trojan/xhttp/ss) و هر کشور؛ ورکر به مسیر حساس نیست
// و همین مسیر را در درخواست WebSocket می‌بیند، پس تفکیک مسیرها اتصال را خراب نمی‌کند.
export function buildNodePath(proto, cfg = {}, wkOverride = '', item = null) {
  // الگوی مسیر انتخاب‌شده در پنل (patt) دقیقاً روی نودها اعمال می‌شود
  const pattern = String(cfg.patt || '/?ed=2048').replace(/\{random\}/g, () => Math.random().toString(36).slice(2, 10));
  const qIdx = pattern.indexOf('?');
  const rawPath = qIdx > -1 ? pattern.slice(0, qIdx) : pattern;
  const rawQuery = qIdx > -1 ? pattern.slice(qIdx + 1) : '';
  const pathName = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
  const parts = [];
  if (rawQuery) parts.push(rawQuery);
  if (wkOverride) parts.push(`wk=${encodeURIComponent(wkOverride)}`);
  parts.push(`nt=${encodeURIComponent(proto)}`);
  const cc = String(item?.country || '').trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(cc)) parts.push(`cc=${cc}`);
  if (item?.proxy) parts.push(`s=${encodeProxyForPath(item.proxy)}`);
  // ProxyIP سفارشی/منطقه‌ای (cfnew: 回退地址) — ورکر با همین آدرس MTProto/سایت
  // مقصد را باز می‌کند؛ آدرس نود همچنان آی‌پی ثابت است.
  if (!item?.proxy && cfg.p) parts.push(`p=${encodeProxyForPath(cfg.p)}`);
  return pathName + (parts.length ? '?' + parts.join('&') : '');
}

// پارامتر فرگمنت TLS مطابق فرمت کلاینتی v2rayNG/NekoBox: «طول,فاصله,نوع‌پکت»
export function buildFragmentValue(cfg = {}) {
  // کلید اصلی روشن/خاموش فرگمنت؛ شادوساکس همیشه بدون فرگمنت ساخته می‌شود
  if (cfg.frag === 'no') return '';
  const presetId = String(cfg.fragmentPreset || 'off');
  if (presetId === 'off') return '';
  const preset = FRAGMENT_PRESETS[presetId] || FRAGMENT_PRESETS.mci;
  if (!preset) return '';
  let length = preset.length;
  let interval = preset.interval;
  let packets = preset.packets;
  if (presetId === 'custom') {
    length = cfg.fragmentLength || preset.length;
    interval = cfg.fragmentInterval || preset.interval;
    packets = cfg.fragmentPackets || preset.packets;
  }
  if (!length || !interval) return '';
  return `${length},${interval},${packets || 'tlshello'}`;
}

// همه حالت‌های پورت یک آدرس: یک پورت TLS + یک پورت HTTP (اگر تنظیم شده باشد).
// با همین، هر آدرس/کشور هم نسخهٔ TLS و هم نسخهٔ بدون TLS دارد و اگر یکی در
// شبکهٔ کاربر فیلتر باشد دیگری کار می‌کند.
export function buildPortVariants(cfg = {}, item = {}, index = 0) {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const explicit = Number(item?.port) || 0;
  if (explicit) {
    return [{ port: explicit, tls: !CF_HTTP_PORTS.includes(explicit) }];
  }
  const tlsPorts = parseNodePorts(cfg.ports).filter(port => !CF_HTTP_PORTS.includes(port));
  const httpPorts = disableNonTls ? [] : parseNodePorts(cfg.httpPorts || '')
    .filter(port => CF_HTTP_PORTS.includes(port));
  const out = [];
  if (tlsPorts.length) out.push({ port: tlsPorts[Math.abs(index) % tlsPorts.length], tls: true });
  if (httpPorts.length) out.push({ port: httpPorts[Math.abs(index) % httpPorts.length], tls: false });
  return out.length ? out : [{ port: 443, tls: true }];
}

// چیدمان متناوب آی‌پی‌ها و دامنه‌های پیش‌فرض: هر ۲ آی‌پی، یک دامنه،
// تا نودهای دامنه حتی با سقف کم نود هم حتماً داخل سابلینک باشند.
function interleaveAddresses(ipNodes = [], domainNodes = []) {
  const out = [];
  const ips = [...ipNodes];
  const domains = [...domainNodes];
  let ipTurn = 0;
  while (ips.length || domains.length) {
    for (let i = 0; i < 2 && ips.length; i++) out.push(ips.shift());
    ipTurn++;
    if (domains.length) out.push(domains.shift());
  }
  return out;
}

// ساخت یک ورودی نود همراه با فرادادهٔ لازم برای نام‌گذاری و توزیع مساوی
function makeNodeEntry(link, proto, host, item = null, tls = true) {
  const cc = String(item?.country || '').trim().toUpperCase();
  const meta = {
    proto,
    host,
    family: addressFamilyLabel(host),
    cc: /^[A-Z]{2}$/.test(cc) ? cc : '',
    proxy: Boolean(item?.proxy),
    tls: tls !== false
  };
  return { link, meta };
}

// توزیع مساوی ترکیب‌های مختلف در سابلینک: هر «پروتکل × خانوادهٔ آدرس»
// (VLESS/IPv4، VLESS/IPv6، VLESS/Domain، Trojan/IPv4 و ...) به تعداد برابر
// در ساب حاضر می‌شود و نودهای پروکسی‌دار یک‌درمیان بین بقیه پخش می‌شوند.
function balanceComboEntries(entries = [], limit = 0) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const groups = new Map();
  // حذف تکرار: یک آدرس ممکن است از چند منبع (فهرست ثابت، ترجیحی و ...) بیاید
  const seenLinks = new Set();
  for (const entry of entries) {
    if (!entry || !entry.link) continue;
    if (seenLinks.has(entry.link)) continue;
    seenLinks.add(entry.link);
    const key = `${entry.meta.proto}|${entry.meta.family || 'na'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }
  if (!groups.size) return [];

  // داخل هر گروه، نودهای پروکسی‌دار و بدون پروکسی یک‌درمیان بیایند
  for (const [key, list] of groups) {
    // ترتیب پایدار: مستقل از ترتیب رسیدن منابع، تا لینک‌ها بین دو درخواست
    // جابه‌جا نشوند (آی‌پی نود در کلاینت ثابت می‌ماند).
    const withProxy = list.filter(item => item.meta.proxy)
      .sort((a, b) => stableAddressSeed(String(a.link)) - stableAddressSeed(String(b.link)) || String(a.link).localeCompare(String(b.link)));
    const plain = list.filter(item => !item.meta.proxy)
      .sort((a, b) => stableAddressSeed(String(a.link)) - stableAddressSeed(String(b.link)) || String(a.link).localeCompare(String(b.link)));
    const mixed = [];
    let a = 0;
    let b = 0;
    while (a < withProxy.length || b < plain.length) {
      if ((mixed.length % 2 === 0 && a < withProxy.length) || b >= plain.length) {
        mixed.push(withProxy[a++]);
      } else {
        mixed.push(plain[b++]);
      }
    }
    groups.set(key, mixed);
  }

  // سهمیهٔ برابر برای هر ترکیب تا سقف نود کاربر
  const total = entries.length;
  const target = limit > 0 ? Math.min(limit, total) : total;
  const keys = [...groups.keys()];
  const quota = new Map(keys.map(key => [key, 0]));
  let remaining = target;
  let pending = keys.slice();
  while (remaining > 0 && pending.length) {
    const share = Math.max(1, Math.floor(remaining / pending.length));
    const next = [];
    for (const key of pending) {
      const bucket = groups.get(key);
      const left = bucket.length - quota.get(key);
      const take = Math.min(share, left, remaining);
      quota.set(key, quota.get(key) + take);
      remaining -= take;
      if (bucket.length - quota.get(key) > 0) next.push(key);
      if (remaining <= 0) break;
    }
    if (next.length === pending.length) {
      const progressed = next.some(key => quota.get(key) > 0);
      if (!progressed) break;
    }
    pending = next;
  }

  const queues = keys.map(key => groups.get(key).slice(0, quota.get(key)));
  const out = [];
  let guard = 0;
  while (out.length < target && guard++ < target * 4) {
    let moved = false;
    for (const queue of queues) {
      if (queue.length && out.length < target) {
        out.push(queue.shift());
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

function isIpv6Literal(host) {
  return String(host || '').includes(':');
}

function isIpv4Literal(host) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(String(host || ''));
}

// اعمال واقعی سوییچ‌های IPv4/IPv6 روی تمام منابع آی‌پی (ثابت، ترجیحی، کشوری و ...)
export function filterAddressFamily(list, cfg = {}) {
  const allowV4 = cfg.ipv4 !== 'no';
  const allowV6 = cfg.ipv6 !== 'no';
  return (Array.isArray(list) ? list : []).filter(item => {
    if (!item) return false;
    const host = normalizeNodeHost(item.ip || item.domain);
    if (!host) return false;
    if (isIpv6Literal(host)) return allowV6;
    if (isIpv4Literal(host)) return allowV4;
    return true;
  });
}

export function getStaticCfAddresses(cfg = {}) {
  const v4 = cfg.ipv4 === 'no' ? [] : OFFICIAL_DIRECT_IPS.slice();
  const v6 = cfg.ipv6 === 'no' ? [] : OFFICIAL_DIRECT_IPV6.slice();
  return [...v4, ...v6];
}

// ساخت نودهای چندلوکیشن: آدرس = آی‌پی ثابت CF، و پروکسی کشور از طریق ?s= در مسیر ws
const LOCATION_PROXY_SCHEMES = ['socks5://', 'socks://', 'http://', 'https://'];

export function buildLocationSourceList(proxyPool = [], cfg = {}, fallbackHost = '', seed = '') {
  const usable = (Array.isArray(proxyPool) ? proxyPool : []).filter(item => {
    const p = String(item?.proxy || '').trim();
    return LOCATION_PROXY_SCHEMES.some(s => p.toLowerCase().startsWith(s));
  });
  if (usable.length === 0) return [];

  // گروه‌بندی بر اساس کشور تا در حالت MULTI هر نود از یک کشور متفاوت بیاید
  const byCountry = new Map();
  for (const item of usable) {
    const code = String(item.country || '').trim().toUpperCase();
    if (!byCountry.has(code)) byCountry.set(code, []);
    byCountry.get(code).push(item);
  }
  const countryCodes = [...byCountry.keys()];

  // نودهای زنجیره‌ای همیشه روی آی‌پی ثابت واقعی کلادفلر سوار می‌شوند تا پینگ بگیرند
  const staticIps = getStaticCfAddresses(cfg);
  const addressPool = staticIps.length > 0 ? staticIps : (fallbackHost ? [fallbackHost] : []);
  if (addressPool.length === 0) return [];

  const wanted = Math.max(1, Math.min(parseInt(cfg.locationNodeCount, 10) || 8, usable.length));
  // انتخاب پایدار بر اساس seed کاربر (نه زمان): با هر بار خواندن ساب‌لینک
  // همان پروکسی‌ها برمی‌گردند تا آی‌پی نود در کلاینت عوض نشود.
  const bucket = seed ? stableAddressSeed(String(seed) + '-loc') : 0;

  // با گام‌بندی روی استخر، هم IPv4 و هم IPv6 (اگر فعال باشد) در ساب‌لینک حضور پیدا می‌کنند
  const stride = Math.max(1, Math.floor(addressPool.length / wanted));
  const out = [];
  for (let i = 0; i < wanted; i++) {
    const code = countryCodes[(bucket + i) % countryCodes.length];
    const group = byCountry.get(code) || usable;
    // اگر برای این کشور پروکسی تأییدشده وجود دارد، فقط همان‌ها استفاده می‍شوند تا
    // خروجی واقعاً از کشور انتخابی باشد؛ پروکسی خام فقط وقتی هیچ تأییدشده‌ای نیست.
    const verifiedGroup = group.filter(item => item.unverified !== true);
    const pickFrom = verifiedGroup.length ? verifiedGroup : group;
    const picked = pickFrom[(bucket + i) % pickFrom.length];
    out.push({
      ip: addressPool[(i * stride) % addressPool.length],
      // «?» یعنی پروکسی تأییدشده نبود (کشورش با برچسب نخواند یا هیچ پروکسی سالمی نبود)
      isp: `Loc-${picked.country || 'CF'}${picked.unverified ? '?' : ''}`,
      country: picked.country || '',
      unverified: picked.unverified === true,
      proxy: picked.proxy
    });
  }

  // تضمین حضور حداقل یک نود IPv6 وقتی کاربر IPv6 را فعال کرده است
  const v6Only = OFFICIAL_DIRECT_IPV6;
  if (cfg.ipv6 !== 'no' && v6Only.length > 0 && !out.some(n => isIpv6Literal(n.ip))) {
    out[out.length - 1].ip = v6Only[0];
  }
  return out;
}

export function getXhttpPaddingMeta(uuidStr) {
  const s = String(uuidStr || '');
  return {
    header: s.slice(1, 7) || 'x-mili',
    key: '_' + (s.slice(25, 31) || 'pad001')
  };
}

export function parseCustomPreferredString(yxStr = '') {
  const ipList = [];
  const domainList = [];
  const proxyList = [];
  if (!yxStr || !String(yxStr).trim()) {
    return { ipList, domainList, proxyList };
  }
  const items = String(yxStr)
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  for (const item of items) {
    // خطوط پروکسی (socks5://...) آدرس نود نیستند و نباید در لیست آی‌پی ترجیحی بیایند
    if (item.includes('://')) continue;
    let nodeName = '';
    let addrPart = item;
    if (item.includes('#')) {
      const parts = item.split('#');
      addrPart = parts[0].trim();
      nodeName = parts.slice(1).join('#').trim();
    }
    const { address, port } = parseAddressAndPort(addrPart);
    if (!address) continue;
    if (!nodeName) {
      nodeName = `${address}${port ? ':' + port : ''}`;
    }
    // پورت غیر کلادفلر یعنی این خط یک پروکسی خروجی است (مثل socks5 روی 1080/11080) و آدرس نود نیست
    if (port && !CF_HTTPS_PORTS.includes(port) && !CF_HTTP_PORTS.includes(port)) {
      proxyList.push({ proxy: `socks5://${address}:${port}`, name: nodeName });
      continue;
    }
    if (isValidIpAddress(address)) {
      ipList.push({ ip: address, port: port || 443, isp: nodeName, name: nodeName });
    } else if (isValidDomain(address) || address.includes('.')) {
      domainList.push({ domain: address, port: port || 443, name: nodeName });
    }
  }
  return { ipList, domainList, proxyList };
}

export async function fetchUouinPreferredIps(cfg = {}) {
  const lineMap = {
    ctcc: '电信',
    cucc: '联通',
    cmcc: '移动',
    bgp: '多线',
    ipv6: 'IPv6'
  };
  const v4Enabled = cfg.ipv4 !== 'no';
  const v6Enabled = cfg.ipv6 !== 'no';
  const mobileEnabled = cfg.ispMobile !== 'no';
  const unicomEnabled = cfg.ispUnicom !== 'no';
  const telecomEnabled = cfg.ispTelecom !== 'no';

  try {
    const ts = String(Date.now());
    const innerHash = await md5Hex('DdlTxtN0sUOu');
    const keyHash = await md5Hex(innerHash + '70cloudflareapikey' + ts);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const resp = await fetch(`https://api.uouin.com/index.php/index/Cloudflare?key=${keyHash}&time=${ts}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return [];
    const data = await resp.json();
    const groups = data && data.data;
    if (!groups) return [];
    const results = [];
    for (const groupKey of Object.keys(lineMap)) {
      const isV6 = groupKey === 'ipv6';
      if (isV6 && !v6Enabled) continue;
      if (!isV6 && !v4Enabled) continue;
      const lineName = lineMap[groupKey];
      if (lineName === '移动' && !mobileEnabled) continue;
      if (lineName === '联通' && !unicomEnabled) continue;
      if (lineName === '电信' && !telecomEnabled) continue;
      const groupObj = groups[groupKey];
      const infoList = groupObj && Array.isArray(groupObj.info) ? groupObj.info : [];
      for (const entry of infoList) {
        const ip = normalizeNodeHost(entry && entry.ip);
        if (!ip) continue;
        results.push({ isp: lineName, ip, port: 443, colo: entry?.colo || '' });
      }
    }
    return results;
  } catch (_e) {
    return [];
  }
}

export async function fetchPreferredFromUrls(urlListStr = '', defaultPort = '443', timeout = 3000) {
  if (!urlListStr || !String(urlListStr).trim()) return [];
  const urls = String(urlListStr)
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);
  if (!urls.length) return [];

  // نگاشت «host:port» → آدرس کامل پروکسی (با scheme و رمز) برای استفاده در زنجیره خروجی
  const outMap = new Map();
  await Promise.allSettled(
    urls.map(async url => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!resp.ok) return;
        const text = await resp.text();
        if (!text || !text.trim()) return;
        const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
        const isCsv = lines.length > 1 && lines[0].includes(',');
        const v6Pattern = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
        if (!isCsv) {
          for (const line of lines) {
            // پشتیبانی از خطوط scheme://user:pass@host:port (socks5/http) و host:port
            let clean = line;
            let proxyUrl = '';
            const schemeMatch = clean.match(/^([a-z0-9+.-]+):\/\//i);
            if (schemeMatch) {
              const scheme = schemeMatch[1].toLowerCase();
              if (['vless', 'vmess', 'trojan', 'ss', 'ssr'].includes(scheme)) continue;
              if (['socks5', 'socks', 'http', 'https'].includes(scheme)) proxyUrl = clean.trim();
              clean = clean.slice(schemeMatch[0].length);
            }
            if (clean.includes('@')) clean = clean.split('@').pop();
            clean = clean.split('/')[0];
            const hashIdx = clean.indexOf('#');
            const [hostPart, remark] = hashIdx > -1 ? [clean.substring(0, hashIdx), clean.substring(hashIdx)] : [clean, ''];
            let hasPort = false;
            if (hostPart.startsWith('[')) {
              hasPort = /\]:(\d+)$/.test(hostPart);
            } else {
              const colonIdx = hostPart.lastIndexOf(':');
              hasPort = colonIdx > -1 && /^\d+$/.test(hostPart.substring(colonIdx + 1));
            }
            const port = new URL(url).searchParams.get('port') || defaultPort;
            const key = hasPort ? clean : `${hostPart}:${port}${remark}`;
            if (!outMap.has(key) || proxyUrl) outMap.set(key, proxyUrl || key);
          }
        } else {
          const headers = lines[0].split(',').map(h => h.trim());
          const dataRows = lines.slice(1);
          if (headers.includes('IP地址') && headers.includes('端口')) {
            const ipIdx = headers.indexOf('IP地址');
            const portIdx = headers.indexOf('端口');
            const tlsIdx = headers.indexOf('TLS');
            for (const row of dataRows) {
              const cols = row.split(',').map(c => c.trim());
              if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') continue;
              const wrapped = v6Pattern.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
              const key = `${wrapped}:${cols[portIdx]}#CF`;
              if (!outMap.has(key)) outMap.set(key, '');
            }
          }
        }
      } catch (_e) {}
    })
  );

  const parsed = [];
  const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
  for (const [item, proxyUrl] of outMap) {
    const m = item.match(regex);
    if (m) {
      parsed.push({
        ip: normalizeNodeHost(m[1]),
        port: parseInt(m[2] || '443', 10),
        name: m[3]?.trim() || m[1],
        proxy: proxyUrl && proxyUrl !== item ? proxyUrl : ''
      });
    }
  }
  return parsed;
}

// ============================================================================
// استخر تأییدشدهٔ هر کشور: پروکسی‌ها از فیدها خوانده و از طریق خودشان تست می‌شوند؛
// فقط آن‌هایی که loc خروجی‌شان با کد کشور یکی است نگه داشته می‌شوند.
// نتیجه ۱۰ دقیقه در cache کلادفلر می‌ماند تا هر درخواست ساب‌لینک گران نشود.
// ============================================================================
const COUNTRY_VERIFIED_CACHE_MS = 15 * 60 * 1000;
const COUNTRY_VERIFIED_CANDIDATES = 12;
const COUNTRY_VERIFIED_TIMEOUT_MS = 1800;
const COUNTRY_VERIFIED_DEADLINE_MS = 5000;
const COUNTRY_VERIFIED_CACHE_BASE = 'https://country-verify.miliconfig.internal';

// کشورهای تب چندلوکیشن — همین فهرست در cron هم تازه‌سازی می‌شود
export const MULTI_COUNTRY_CODES = ['DE', 'NL', 'US', 'GB', 'TR', 'AE', 'CA', 'SE'];

function getCountryCache() {
  try {
    return typeof caches !== 'undefined' ? caches.default : null;
  } catch (_e) {
    return null;
  }
}

// تازه‌سازی استخر یک کشور (برای cron / پيش‌گرم کردن D1)
export async function refreshCountryProxyPool(env, code) {
  const cc = String(code || '').trim().toUpperCase();
  const urls = (COUNTRY_PROXY_SOURCES[cc]?.urls || []).join(',');
  if (!env || !cc || !urls) return { code: cc, candidates: 0, verified: 0 };
  const found = await fetchPreferredFromUrls(urls);
  const candidates = [];
  for (const item of found) {
    if (!item.proxy || candidates.includes(item.proxy)) continue;
    candidates.push(item.proxy);
    if (candidates.length >= 16) break;
  }
  const results = await verifyCountryProxies(candidates, {
    need: 8,
    timeoutMs: 2000,
    deadline: Date.now() + 8000
  });
  const verified = results.filter(item => item.country === cc).map(item => ({ proxy: item.proxy, country: cc }));
  if (verified.length) await saveCountryProxyPool(env, cc, verified);
  return { code: cc, candidates: candidates.length, verified: verified.length };
}

async function getVerifiedCountryProxies(code, urls, options = {}) {
  const need = Math.max(1, parseInt(options.need, 10) || 4);
  const verify = options.verify !== false;
  const deadline = Number(options.deadline) || Date.now() + 3500;
  const env = options.env || null;

  // ۱) استخر ذخیره‌شده در D1 (تست واقعی قبلی) — سریع‌ترین مسیر و پایهٔ حالت MULTI
  if (env) {
    const stored = await loadCountryProxyPool(env, code);
    const storedVerified = stored.filter(item => !item.unverified);
    if (storedVerified.length) return storedVerified.slice(0, need);
  }

  const cache = getCountryCache();
  const bucket = Math.floor(Date.now() / COUNTRY_VERIFIED_CACHE_MS);
  const cacheKey = `${COUNTRY_VERIFIED_CACHE_BASE}/${code}/${bucket}/${need}/v${verify ? 1 : 0}`;

  if (cache) {
    try {
      const hit = await cache.match(cacheKey);
      if (hit) {
        const cached = await hit.json();
        if (Array.isArray(cached?.list)) return cached.list;
      }
    } catch (_e) {}
  }

  const found = await fetchPreferredFromUrls(urls);
  const candidates = [];
  for (const item of found) {
    if (!item.proxy || candidates.includes(item.proxy)) continue;
    candidates.push(item.proxy);
    if (candidates.length >= COUNTRY_VERIFIED_CANDIDATES) break;
  }

  let verified = [];
  if (verify && candidates.length) {
    const results = await verifyCountryProxies(candidates, {
      need,
      timeoutMs: COUNTRY_VERIFIED_TIMEOUT_MS,
      deadline
    });
    verified = results.filter(r => r.country === code).map(r => ({ proxy: r.proxy, country: code }));
  }

  // تأییدشده‌ها اول؛ اگر کمتر از نیاز بودند با پروکسی‌های خام (با برچسب هشدار «?»)
  // تکمیل می‌شود تا تب کشور خالی نماند.
  const verifiedSet = new Set(verified.map(v => v.proxy));
  const topUp = candidates
    .filter(proxy => !verifiedSet.has(proxy))
    .slice(0, Math.max(0, need - verified.length))
    .map(proxy => ({ proxy, country: code, unverified: true }));
  const list = [...verified, ...topUp];

  // نتیجهٔ تأییدشده در D1 ذخیره می‌شود تا حالت MULTI و درخواست‌های بعدی
  // بدون تست مجدد و بدون هزینهٔ زمانی از همان استفاده کنند.
  if (env && verified.length) {
    try { await saveCountryProxyPool(env, code, verified); } catch (_e) {}
  }

  // کل لیست (تأییدشده یا پشتیبان) کش می‌شود تا درخواست بعدی سریع باشد
  if (cache) {
    try {
      await cache.put(
        cacheKey,
        new Response(JSON.stringify({ list, checkedAt: Date.now() }), {
          headers: {
            'content-type': 'application/json',
            'cache-control': `max-age=${Math.floor(COUNTRY_VERIFIED_CACHE_MS / 1000)}`
          }
        })
      );
    } catch (_e) {}
  }

  return list;
}

// ---------------------------------------------------------------------------
// دامنه‌های SNI/Host
// بعضی نصب‌ها چند دامنه دارند که همه به همین ورکر وصل‌اند (دامنهٔ سفارشی،
// چند دامنهٔ ثبت‌شده روی اکانت و …). این دامنه‌ها در تنظیمات وارد می‌شوند و
// نودها به ترتیب بین آن‌ها می‌چرخند تا اگر یک دامنه کند/مسدود شد بقیه کار کنند.
// فقط دامنه‌هایی که واقعاً به همین ورکر مسیر می‌شوند معتبرند؛ دامنهٔ دلخواه باعث
// می‌شود نود به سایت دیگری وصل شود.
// ---------------------------------------------------------------------------
function resolveFrontHosts(workerHost, cfg = {}) {
  const out = [];
  const push = (value) => {
    const host = normalizeNodeHost(value);
    if (!host) return;
    if (out.some(item => item.toLowerCase() === host.toLowerCase())) return;
    out.push(host);
  };
  // دامنه‌های سفارشی اول می‌آیند تا حتی با یک آدرس هم SNI/Host انتخابی کاربر
  // روی نود بنشیند؛ دامنهٔ خود ورکر به‌عنوان آخرین گزینه (fallback) می‌ماند.
  const raw = String(cfg.sniHosts || '')
    .split(/[,\n]+/)
    .map(item => item.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, ''))
    .filter(Boolean);
  raw.forEach(push);
  push(workerHost);
  return out;
}

// تشخیص دامنهٔ فیلترشدهٔ Cloudflare Pages یا Workers در ایران و تولید SNI ضد-DPI
export function isFilteredPagesOrWorkersHost(host = '') {
  const lower = String(host || '').trim().toLowerCase().replace(/\.+$/, '');
  return lower.endsWith('.pages.dev') || lower.endsWith('.workers.dev');
}

function getEffectiveSniForNode(nodeHost, rawHost, idx = 0) {
  const cleanHost = String(nodeHost || '').trim();
  if (!isFilteredPagesOrWorkersHost(cleanHost)) return cleanHost;
  // در ایران دامنهٔ *.pages.dev و *.workers.dev روی SNI فیلتر است:
  // با ترکیب Mixed-Case SNI و سید یکتا، فیلترینگ مبتنی بر تطابق رشتهٔ SNI دور زده می‌شود
  // در حالی که کلودفلر SNI را بدون حساسیت به بزرگی/کوچکی حروف می‌پذیرد و به همین پروژه هدایت می‌کند.
  return buildAntiFilterSni(cleanHost, stableAddressSeed(cleanHost + '|' + rawHost + '|' + idx));
}

function frontHostFor(item, fallbackHost) {
  const host = item && item.frontHost ? String(item.frontHost).trim() : '';
  return host || fallbackHost;
}

function buildVlessLinks(list, userUuid, workerHost, cfg, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;

    // مسیر یکتا برای نوع نود + کشور؛ پروکسی خروجی هم داخل همان مسیر به ورکر داده می‌شود
    const itemPath = buildNodePath('vless', cfg, wkOverride, item);
    const nodeHost = frontHostFor(item, workerHost);

    for (const { port, tls } of buildPortVariants(cfg, item, idx)) {
      const nodeName = buildNodeDisplayName({
        proto: 'vless',
        host: rawHost,
        cc: item?.country,
        proxy: Boolean(item?.proxy),
        tls
      });
      if (tls) {
        const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'tls',
          sni: effectiveSni,
          fp: cfg.fp || 'random',
          type: 'ws',
          host: nodeHost,
          path: itemPath,
          alpn: alpn || 'h2,http/1.1'
        });
        if (alpn) params.set('alpn', alpn);
        if (echValue) params.set('ech', echValue);
        if (fragmentValue) params.set('fragment', fragmentValue);
        links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'vless', rawHost, item, tls));
      } else {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'none',
          type: 'ws',
          host: nodeHost,
          path: itemPath
        });
        links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'vless', rawHost, item, tls));
      }
    }
  }
  return links;
}


export function rotateIpListByTimeBucket(list, rotationSetting = 'off') {
  if (!rotationSetting || rotationSetting === 'off' || !Array.isArray(list) || list.length <= 1) {
    return list;
  }
  let intervalMs = 0;
  if (rotationSetting === '5m') intervalMs = 5 * 60 * 1000;
  else if (rotationSetting === '15m') intervalMs = 15 * 60 * 1000;
  else if (rotationSetting === '30m') intervalMs = 30 * 60 * 1000;
  else if (rotationSetting === '1h') intervalMs = 60 * 60 * 1000;
  else if (rotationSetting === '6h') intervalMs = 6 * 3600 * 1000;
  else if (rotationSetting === '24h') intervalMs = 24 * 3600 * 1000;
  if (!intervalMs) return list;

  const bucket = Math.floor(Date.now() / intervalMs);
  const shift = bucket % list.length;
  if (shift === 0) return list;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

// شادوساکس با همان مکانیزم ورکر Z-E-U-S (منبع الهام cfnew): هر آدرس یک نود
// SIP002 با userinfo base64 («متد:رمز») + پلاگین v2ray-websocket روی همان مسیر.
// متد پیش‌فرض AEAD است (aes-128-gcm) چون «none» در بیشتر کلاینت‌ها پشتیبانی
// نمی‌شود و نود بدون پینگ می‌ماند؛ هسته هم AEAD را رمزگشایی می‌کند.
export function buildShadowsocksLinks(list, userUuid, workerHost, cfg) {
  const links = [];
  const sspass = (cfg.sspass && String(cfg.sspass).trim()) || userUuid;
  const cipher = cfg.ssmethod === 'aes-256-gcm' ? 'aes-256-gcm' : 'aes-128-gcm';
  const userinfo = encodeSip002UserInfo(`${cipher}:${sspass}`);

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    // شادوساکس با پلاگین v2ray فقط روی TLS معنا دارد؛ همیشه نسخهٔ TLS انتخاب می‌شود
    const { port } = buildPortVariants(cfg, item, idx).find(variant => variant.tls) || { port: 443 };
    const nodeName = buildNodeDisplayName({ proto: 'ss', host: rawHost, cc: item?.country, proxy: Boolean(item?.proxy), tls: true });
    const itemPath = buildNodePath('ss', cfg, '', item);
    const pluginOpts = `v2ray-plugin;mode=websocket;host=${frontHostFor(item, workerHost)};path=${itemPath};tls`;
    links.push(
      makeNodeEntry(`ss://${userinfo}@${safeAddr}:${port}/?plugin=${encodeURIComponent(pluginOpts)}#${encodeURIComponent(nodeName)}`, 'ss', rawHost, item, true)
    );
  }
  return links;
}

// آدرس پروکسی داخل مسیر ws قرار می‌گیرد؛ باید فقط یک‌بار دیکد شود تا ورکر آن را درست بخواند
function encodeProxyForPath(proxy) {
  return encodeURIComponent(String(proxy || ''))
    .replace(/%3A/gi, ':')
    .replace(/%2F/gi, '/')
    .replace(/%40/gi, '@');
}

function encodeSip002UserInfo(text) {
  return btoa(String(text || ''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function buildTrojanLinks(list, userUuid, workerHost, cfg, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const password = (cfg.tp && String(cfg.tp).trim()) || userUuid;
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;

    {
      const itemPath = buildNodePath('trojan', cfg, wkOverride, item);
      const nodeHost = frontHostFor(item, workerHost);
      for (const { port, tls } of buildPortVariants(cfg, item, idx)) {
        const nodeName = buildNodeDisplayName({
          proto: 'trojan',
          host: rawHost,
          cc: item?.country,
          proxy: Boolean(item?.proxy),
          tls
        });
        if (tls) {
          const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
          const params = new URLSearchParams({
            security: 'tls',
            sni: effectiveSni,
            fp: cfg.fp || 'random',
            type: 'ws',
            host: nodeHost,
            path: itemPath,
            alpn: alpn || 'h2,http/1.1'
          });
          if (alpn) params.set('alpn', alpn);
          if (echValue) params.set('ech', echValue);
          if (fragmentValue) params.set('fragment', fragmentValue);
          links.push(makeNodeEntry(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'trojan', rawHost, item, tls));
        } else {
          const params = new URLSearchParams({
            security: 'none',
            type: 'ws',
            host: nodeHost,
            path: itemPath
          });
          links.push(makeNodeEntry(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'trojan', rawHost, item, tls));
        }
      }
    }
  }
  return links;
}

function buildXhttpLinks(list, userUuid, workerHost, cfg) {
  const links = [];
  const shortPath = String(userUuid || '').substring(0, 8);
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';
  const { header: xPadHeader, key: xPadKey } = getXhttpPaddingMeta(userUuid);

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const { port } = buildPortVariants(cfg, item, idx).find(variant => variant.tls) || { port: 443 };
    const nodeName = buildNodeDisplayName({ proto: 'xhttp', host: rawHost, cc: item?.country, proxy: Boolean(item?.proxy), tls: true });
    // مسیر یکتای xHTTP + کشور + پروکسی خروجی
    let xhttpPath = `/${shortPath}?nt=xhttp`;
    const xhttpCountry = String(item.country || '').trim().toUpperCase();
    if (/^[A-Z]{2}$/.test(xhttpCountry)) xhttpPath += `&cc=${xhttpCountry}`;
    if (item.proxy) xhttpPath += `&s=${encodeProxyForPath(item.proxy)}`;
    const nodeHost = frontHostFor(item, workerHost);
    const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
    const params = new URLSearchParams({
      encryption: 'none',
      security: 'tls',
      sni: effectiveSni,
      fp: cfg.fp || 'random',
      type: 'xhttp',
      host: nodeHost,
      path: xhttpPath,
      mode: 'stream-one'
    });
    params.set(
      'extra',
      JSON.stringify({
        xPaddingObfsMode: true,
        xPaddingMethod: 'tokenish',
        xPaddingPlacement: 'queryInHeader',
        xPaddingHeader: xPadHeader,
        xPaddingKey: xPadKey
      })
    );
    if (alpn) params.set('alpn', alpn);
    if (echValue) params.set('ech', echValue);
    if (fragmentValue) params.set('fragment', fragmentValue);
    links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'xhttp', rawHost, item, true));
  }
  return links;
}

// ============================================================================
// نودهای «دامنهٔ پنل» — آدرس و SNI دقیقاً دامنهٔ همین ورکر/پیجز (بدون https://)
// ============================================================================
// انتخاب چرخشی از استخر دامنه‌های تأییدشدهٔ کلادفلر؛ هر ۱۵ دقیقه یک پنجرهٔ
// شروع تازه می‌گیرد تا سابلینک ثابت نماند (stride ۱۳ تا پراکندگی داشته باشد).
export function pickEdgeDomains(count, seed = '') {
  const pool = CF_EDGE_DOMAINS;
  const wanted = Math.max(1, parseInt(count, 10) || 1);
  if (!pool.length) return [];
  // با seed پایدار، دامنه‌های نود هم برای هر کاربر ثابت می‌مانند
  const start = seed
    ? stableAddressSeed(seed) % pool.length
    : Math.floor(Date.now() / (15 * 60 * 1000)) % pool.length;
  const out = [];
  const seen = new Set();
  for (let step = 0; out.length < Math.min(wanted, pool.length) && step < pool.length * 2; step++) {
    const domain = pool[(start + step * 13) % pool.length];
    if (!domain || seen.has(domain)) continue;
    seen.add(domain);
    out.push(domain);
  }
  return out;
}

export function buildPanelDomainNodes(workerHost, cfg = {}) {
  const host = normalizeNodeHost(workerHost);
  if (!host) return [];
  const count = Math.max(1, Math.min(parseInt(cfg.pdCount, 10) || 2, 20));
  // اگر دامنهٔ پنل *.pages.dev باشد (که در ایران DNS و آی‌پی آن مسدود است)،
  // به‌جای قرار دادن مستقیم دامنهٔ مسدود در بخش Address، از آی‌پی‌ها و دامنه‌های تمیز کلادفلر استفاده می‌کنیم
  if (isFilteredPagesOrWorkersHost(host)) {
    const cleanAddresses = [...OFFICIAL_DIRECT_IPS, ...DIRECT_DOMAINS.map(d => d.domain)];
    return Array.from({ length: count }, (_, idx) => ({
      ip: cleanAddresses[idx % cleanAddresses.length],
      port: 443,
      isp: 'Pages-Bypass'
    }));
  }
  return Array.from({ length: count }, () => ({ ip: host, port: 443, isp: 'Panel' }));
}

// ============================================================================
// WARP / WARP PRO / WARP چندلوکیشن — تولید کانفیگ واقعی WireGuard
// خروجی سازگار با v2rayN / Hiddify / NekoBox (قالب wireguard://) و Mihomo/sing-box
// ============================================================================

const X25519_P = (1n << 255n) - 19n;
const X25519_A24 = 121665n;

function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64) {
  let clean = String(b64 || '').trim().replace(/-/g, '+').replace(/_/g, '/').replace(/\s+/g, '');
  while (clean.length % 4 !== 0) clean += '=';
  try {
    const bin = atob(clean);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch (_e) {
    return new Uint8Array(0);
  }
}

// بستن اسکالر کلید خصوصی طبق RFC 7748 (همان کلمپی که WireGuard انجام می‌دهد)
function clampScalar(raw) {
  const key = Uint8Array.from(raw);
  key[0] &= 248;
  key[31] &= 127;
  key[31] |= 64;
  return key;
}

// ضرب اسکالر منحنی Curve25519 روی نقطه پایه (X25519) — کلید عمومی از کلید خصوصی
function x25519PublicKey(privateKeyBytes) {
  let k = 0n;
  for (let i = 31; i >= 0; i--) k = (k << 8n) | BigInt(privateKeyBytes[i]);
  const inv = a => {
    let result = 1n;
    let base = a % X25519_P;
    let exp = X25519_P - 2n;
    while (exp > 0n) {
      if (exp & 1n) result = (result * base) % X25519_P;
      base = (base * base) % X25519_P;
      exp >>= 1n;
    }
    return result;
  };
  const x1 = 9n;
  let x2 = 1n;
  let z2 = 0n;
  let x3 = 9n;
  let z3 = 1n;
  let swap = 0n;
  for (let t = 254; t >= 0; t--) {
    const bit = (k >> BigInt(t)) & 1n;
    swap ^= bit;
    if (swap === 1n) {
      [x2, x3] = [x3, x2];
      [z2, z3] = [z3, z2];
    }
    swap = bit;
    const a = (x2 + z2) % X25519_P;
    const aa = (a * a) % X25519_P;
    const b = (x2 - z2 + X25519_P) % X25519_P;
    const bb = (b * b) % X25519_P;
    const e = (aa - bb + X25519_P) % X25519_P;
    const c = (x3 + z3) % X25519_P;
    const d = (x3 - z3 + X25519_P) % X25519_P;
    const da = (d * a) % X25519_P;
    const cb = (c * b) % X25519_P;
    const daCb = (da + cb) % X25519_P;
    const daCbNeg = (da - cb + X25519_P) % X25519_P;
    x3 = (daCb * daCb) % X25519_P;
    z3 = (x1 * ((daCbNeg * daCbNeg) % X25519_P)) % X25519_P;
    x2 = (aa * bb) % X25519_P;
    z2 = (e * ((aa + X25519_A24 * e) % X25519_P)) % X25519_P;
  }
  if (swap === 1n) {
    [x2, x3] = [x3, x2];
    [z2, z3] = [z3, z2];
  }
  const value = (x2 * inv(z2)) % X25519_P;
  const out = new Uint8Array(32);
  let rest = value;
  for (let i = 0; i < 32; i++) {
    out[i] = Number(rest & 255n);
    rest >>= 8n;
  }
  return out;
}

export function generateWireGuardIdentity() {
  const raw = getRandomBytesSafe(32);
  const privateKeyBytes = clampScalar(raw);
  return {
    privateKey: bytesToBase64(privateKeyBytes),
    publicKey: bytesToBase64(x25519PublicKey(privateKeyBytes))
  };
}

// کش ثبت‌نام WARP در حافظهٔ ایزوله؛ از ثبت‌نام مجدد در هر درخواست ساب‌لینک جلوگیری می‌کند
let warpRegCache = { key: '', at: 0, data: null };
const WARP_REG_CACHE_TTL = 6 * 60 * 60 * 1000;

async function applyWarpLicense(deviceId, license) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(`${WARP_REGISTRATION_URL}/${deviceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({ license, warp_enabled: true }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return null;
    return await resp.json();
  } catch (_e) {
    return null;
  }
}

// ثبت‌نام دستگاه رایگان WARP برای دریافت reserved/آدرس تونل/کلید همتا (و ارتقای لایسنس در حالت PRO)
export async function fetchWarpRegistration(cfg = {}, force = false) {
  const license = String(cfg.warpLicense || '').trim();
  const cacheKey = license ? `lic:${license}` : 'free';
  if (!force && warpRegCache.data && warpRegCache.key === cacheKey && Date.now() - warpRegCache.at < WARP_REG_CACHE_TTL) {
    return warpRegCache.data;
  }
  try {
    const identity = generateWireGuardIdentity();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const resp = await fetch(WARP_REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({
        key: identity.publicKey,
        install_id: '',
        fcm_token: '',
        tos: new Date().toISOString(),
        model: 'PC',
        serial_number: '',
        locale: 'en_US'
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return null;
    let device = await resp.json();
    if (license && device?.id) {
      const upgraded = await applyWarpLicense(device.id, license);
      if (upgraded && upgraded.config) device = upgraded;
    }
    const peer = device?.config?.peers?.[0] || {};
    const endpointHostRaw = String(peer?.endpoint?.host || `${WARP_DEFAULT_HOST}:${WARP_DEFAULT_PORT}`);
    const [endpointHost, endpointPortRaw] = endpointHostRaw.split(':');
    const clientIdBytes = base64ToBytes(device?.config?.client_id || '');
    const data = {
      privateKey: identity.privateKey,
      publicKey: peer.public_key || WARP_PEER_PUBLIC_KEY,
      reserved: clientIdBytes.length >= 3 ? [...clientIdBytes.slice(0, 3)] : [0, 0, 0],
      address4: device?.config?.interface?.addresses?.v4 || WARP_DEFAULT_ADDRESS,
      address6: device?.config?.interface?.addresses?.v6 || '',
      server: endpointHost || WARP_DEFAULT_HOST,
      port: parseInt(endpointPortRaw, 10) || WARP_DEFAULT_PORT,
      license: device?.account?.license || '',
      registered: true
    };
    warpRegCache = { key: cacheKey, at: Date.now(), data };
    return data;
  } catch (_e) {
    return null;
  }
}

// پیکربندی پشتیبان وقتی سرویس ثبت‌نام در دسترس نیست (کلیدهای شناخته‌شدهٔ WARP)
export function buildFallbackWarpConfig() {
  const identity = generateWireGuardIdentity();
  return {
    privateKey: identity.privateKey,
    publicKey: WARP_PEER_PUBLIC_KEY,
    reserved: [0, 0, 0],
    address4: WARP_DEFAULT_ADDRESS,
    address6: '',
    server: WARP_DEFAULT_HOST,
    port: WARP_DEFAULT_PORT,
    license: '',
    registered: false
  };
}

// ============================================================================
// WARP MASQUE (HTTP/3) — تونل IP روی CONNECT-IP
// نه WireGuard است و نه AmneziaWG: کلید دستگاه ECDSA P-256 است و لبه با SNI
// مخصوص MASQUE و پین‌کردن کلید عمومی لبه احراز می‌کند. این نوع نود فقط در
// Mihomo/Clash.Meta (type: masque) و فورک Hiddify قابل استفاده است.
// ============================================================================
export const WARP_MASQUE_SNI = 'consumer-masque.cloudflareclient.com';
const WARP_MASQUE_PORTS = [443, 8443, 4443, 500, 1701, 4500];
let warpMasqueCache = { key: '', at: 0, data: null };

function derTlv(tag, bytes) {
  const len = bytes.length;
  let lenBytes;
  if (len < 0x80) {
    lenBytes = [len];
  } else {
    const tmp = [];
    let n = len;
    while (n > 0) { tmp.unshift(n & 0xff); n >>= 8; }
    lenBytes = [0x80 | tmp.length, ...tmp];
  }
  return Uint8Array.from([tag, ...lenBytes, ...bytes]);
}

// کلید خصوصی P-256 را از JWK به قالب SEC1 DER می‌برد (چیزی که Mihomo می‌خواهد)
function buildSec1PrivateKey(jwk = {}) {
  const oidPrime256v1 = Uint8Array.from([0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07]);
  const version = Uint8Array.from([0x02, 0x01, 0x01]);
  const privateKey = derTlv(0x04, base64ToBytes(jwk.d || ''));
  const params = derTlv(0xa0, oidPrime256v1);
  const point = Uint8Array.from([0x00, 0x04, ...base64ToBytes(jwk.x || ''), ...base64ToBytes(jwk.y || '')]);
  const publicKey = derTlv(0xa1, derTlv(0x03, point));
  const body = new Uint8Array(version.length + privateKey.length + params.length + publicKey.length);
  body.set(version, 0);
  body.set(privateKey, version.length);
  body.set(params, version.length + privateKey.length);
  body.set(publicKey, version.length + privateKey.length + params.length);
  return derTlv(0x30, body);
}

// ثبت‌نام دستگاه MASQUE: اول ساخت دستگاه، بعد ارتقا به tunnel_type=masque با کلید P-256
async function fetchWarpMasqueRegistration(cfg = {}, force = false) {
  const license = String(cfg.warpLicense || '').trim();
  const cacheKey = license ? `masque-lic:${license}` : 'masque-free';
  if (!force && warpMasqueCache.data && warpMasqueCache.key === cacheKey && Date.now() - warpMasqueCache.at < WARP_REG_CACHE_TTL) {
    return warpMasqueCache.data;
  }
  try {
    const pair = await getSafeCrypto().subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const spki = new Uint8Array(await getSafeCrypto().subtle.exportKey('spki', pair.publicKey));
    const jwk = await getSafeCrypto().subtle.exportKey('jwk', pair.privateKey);
    const pubB64 = bytesToBase64(spki);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const created = await fetch(WARP_REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({
        key: pubB64,
        install_id: '',
        fcm_token: '',
        tos: new Date().toISOString(),
        model: 'PC',
        serial_number: '',
        locale: 'en_US'
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!created.ok) return null;
    const device = await created.json();
    if (!device?.id || !device?.token) return null;

    const upgradeCtrl = new AbortController();
    const upgradeTimer = setTimeout(() => upgradeCtrl.abort(), 8000);
    const upgraded = await fetch(`${WARP_REGISTRATION_URL}/${device.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1',
        Authorization: `Bearer ${device.token}`
      },
      body: JSON.stringify({
        key: pubB64,
        key_type: 'secp256r1',
        tunnel_type: 'masque',
        ...(license ? { license, warp_enabled: true } : {})
      }),
      signal: upgradeCtrl.signal
    });
    clearTimeout(upgradeTimer);
    if (!upgraded.ok) return null;
    const reg = await upgraded.json();
    const peer = reg?.config?.peers?.[0] || {};
    const edgePublicKey = String(peer.public_key || '').replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
    const endpointHost = String(peer?.endpoint?.v4 || '').split(':')[0];
    const ports = (Array.isArray(peer?.endpoint?.ports) ? peer.endpoint.ports : [])
      .map(port => parseInt(port, 10))
      .filter(port => port > 0);
    const data = {
      privateKey: bytesToBase64(buildSec1PrivateKey(jwk)),
      publicKey: edgePublicKey,
      address4: reg?.config?.interface?.addresses?.v4 || '',
      address6: reg?.config?.interface?.addresses?.v6 || '',
      server: endpointHost || '162.159.198.2',
      ports: ports.length ? ports : WARP_MASQUE_PORTS.slice(),
      license: reg?.account?.license || ''
    };
    if (!data.privateKey || !data.publicKey || !data.address4) return null;
    warpMasqueCache = { key: cacheKey, at: Date.now(), data };
    return data;
  } catch (_e) {
    return null;
  }
}

// نودهای MASQUE: چند پورت از همان لبهٔ ثبت‌شده — لوکیشن خروج را کلادفلر انتخاب می‌کند
// و قابل پین‌کردن نیست؛ پس برچسب هر نود پورت/لبه است، نه کشور.
export async function buildWarpMasqueNodes(cfg = {}) {
  if (!isEnabledValue(cfg.warpMasque, true)) return [];
  const reg = await fetchWarpMasqueRegistration(cfg);
  if (!reg) return [];
  const wanted = parseInt(cfg.warpMasqueCount, 10);
  const count = Math.max(1, Math.min(6, Number.isFinite(wanted) && wanted > 0 ? wanted : 3));
  const ordered = [...new Set([...WARP_MASQUE_PORTS.filter(p => reg.ports.includes(p)), ...reg.ports])];
  return ordered.slice(0, count).map((port, idx) => ({
    name: `WARP MASQUE ${idx + 1} · ${port}`,
    server: reg.server,
    port,
    privateKey: reg.privateKey,
    publicKey: reg.publicKey,
    address4: reg.address4,
    address6: reg.address6
  }));
}

// لیست نقاط پایانی: مقدار دستی پنل (ip:port#برچسب) یا رنج‌های رسمی WARP
function parseWarpEndpointList(raw, count, family = 'auto', seed = '') {
  const manual = String(raw || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  if (manual.length) {
    return manual.map(item => {
      const [addrPart, labelPart] = item.split('#');
      const clean = String(addrPart || '').trim();
      const bracketed = clean.match(/^\[([^\]]+)\](?::(\d+))?$/);
      const plain = clean.match(/^([^:]+)(?::(\d+))?$/);
      const host = bracketed ? bracketed[1] : (plain ? plain[1] : clean);
      const port = parseInt((bracketed ? bracketed[2] : plain?.[2]) || String(WARP_DEFAULT_PORT), 10);
      return { host, port, label: String(labelPart || '').trim() };
    }).filter(x => x.host);
  }
  const wanted = Math.max(1, Math.min(parseInt(count, 10) || WARP_ML_CONF_COUNT, 30));
  const fam = String(family || 'auto').toLowerCase();
  const v4Hosts = WARP_ENDPOINT_IPS.filter(host => !String(host).includes(':'));
  const v6Hosts = WARP_ENDPOINT_IPS.filter(host => String(host).includes(':'));
  // انتخاب پایدار بر اساس بذر کاربر/تنظیمات (نه ساعت): با پینگ و رفرش ساب
  // اندپوینت‌های چندلوکیشن جابه‌جا نمی‌شوند.
  const shift = Math.abs(awgHash(`${seed}:${fam}:${wanted}`)) % 97;
  const out = [];
  for (let i = 0; i < wanted; i++) {
    let host = '';
    let isV6 = false;
    if (fam === 'domain') {
      host = WARP_DEFAULT_HOST;
    } else if (fam === 'v6' && v6Hosts.length) {
      host = v6Hosts[(shift + i) % v6Hosts.length];
      isV6 = true;
    } else if (fam === 'v4' && v4Hosts.length) {
      host = v4Hosts[(shift + i) % v4Hosts.length];
    } else {
      // ترکیب دو طرفه: هر از گاهی اندپوینت IPv6 هم می‌آید تا کاربر نسخهٔ دوم را هم داشته باشد
      isV6 = v6Hosts.length > 0 && wanted >= 4 && i % 3 === 2;
      const pool = isV6 ? v6Hosts : v4Hosts;
      host = pool[(shift + i) % pool.length];
    }
    if (!host) continue;
    const port = WARP_ENDPOINT_PORTS[(shift + i) % WARP_ENDPOINT_PORTS.length];
    out.push({ host, port, label: isV6 ? 'IPv6' : '' });
  }
  return out;
}

// ============================================================================
// AmneziaWG — همان WireGuard با پارامترهای مبهم‌سازی (Jc/Jmin/Jmax/S1/S2/H1..H4)
// مقادیر پایدار بر اساس سرور و پورت ساخته می‌شوند تا با هر بار تازه‌سازی ساب‌لینک
// عوض نشوند؛ بازه‌ها مطابق نمونه‌های رسمی AmneziaWG انتخاب شده‌اند.
// ============================================================================
function awgHash(text) {
  let h = 2166136261 >>> 0;
  const str = String(text || '');
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  return h >>> 0;
}

// نسخه‌های AmneziaWG: نسخهٔ ۱ فقط بسته‌های Junk، نسخهٔ ۲ پدینگ/هدر و بسته‌های
// امضایی I1..I5 را اضافه می‌کند و نسخهٔ ۳ تنظیمات زمان‌بندی و
// ContentPaddingAddition را هم می‌آورد. برای WARP (همتای وایرگارد استاندارد)
// مقدار S/H صفر و ۱..۴ است، وگرنه هندشیک رد می‌شود.
export function normalizeAwgVersion(value) {
  const v = String(value == null ? '' : value).trim();
  return v === '1' || v === '2' || v === '3' ? v : '3';
}

// رشتهٔ امضای CPS برای بسته‌های ویژهٔ AmneziaWG — فقط تگ‌های مجاز
// (<b 0x..> بایت ثابت، <r N> بایت تصادفی، <rc N> حرف، <rd N> رقم، <t> زمان)
function buildAwgSignatureCps(idx, next) {
  const fixed = ['ce00000001', 'f6ab3267fa', 'a10000000200', '8d00000001', 'e700000001'];
  const hex = fixed[idx % fixed.length];
  const letters = next(6, 14);
  const rand = next(24, 64);
  if (idx % 2 === 0) return `<b 0x${hex}><rc ${letters}><t><r ${rand}>`;
  return `<b 0x${hex}><t><rd ${letters}><r ${rand}>`;
}

export function buildAmneziaWgParams(config = {}) {
  const version = normalizeAwgVersion(config.awgv);
  const seed = `${config.seed || ''}:${config.server || WARP_DEFAULT_HOST}:${config.port || WARP_DEFAULT_PORT}:${config.publicKey || WARP_PEER_PUBLIC_KEY}:v${version}`;
  let h = awgHash(seed) || 1;
  const next = (min, max) => {
    h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    return min + (h % (max - min + 1));
  };
  const jmin = next(40, 70);
  const jmax = jmin + next(950, 1150);
  const jc = next(3, 7);
  // سرورهای WARP وایرگارد استاندارد هستند: هدر و پدینگ دست‌کاری‌شده را رد می‌کنند.
  // پس S همیشه صفر و H1..H4 همان ۱..۴ وایرگارد می‌ماند؛ فقط بسته‌های Junk و
  // بسته‌های امضایی (که سمت سرور نادیده گرفته می‌شوند) فعال‌اند.
  const fullObfuscation = config.obfuscateHandshake === true && version === '1';
  const base = {
    version,
    jc,
    jmin,
    jmax,
    s1: fullObfuscation ? next(20, 60) : 0,
    s2: fullObfuscation ? next(30, 90) : 0,
    s3: 0,
    s4: 0,
    h1: fullObfuscation ? next(100000, 800000) : 1,
    h2: 0,
    h3: 0,
    h4: 0
  };
  base.h2 = fullObfuscation ? base.h1 + next(1, 4000) : 2;
  base.h3 = fullObfuscation ? base.h1 + next(4001, 9000) : 3;
  base.h4 = fullObfuscation ? base.h1 + next(9001, 16000) : 4;
  if (version === '1') return base;

  // ‏۲.x و ۳.x: بسته‌های امضایی I1..I3 + بسته‌های اضافی؛ همه سمت کلاینت
  const signatures = [];
  const sigCount = version === '3' ? 3 : 2;
  for (let i = 0; i < sigCount; i++) signatures.push(buildAwgSignatureCps(i, next));
  base.signatures = signatures;
  base.paddingAddition = `${next(10, 40)}-${next(60, 120)}`;
  if (version === '3') {
    base.rekeyAfterTime = `${next(100, 110)}-${next(115, 130)}`;
    base.rekeyTimeout = `${next(3, 4)}-${next(5, 8)}`;
    base.rejectAfterTime = `${next(150, 165)}-${next(175, 195)}`;
    base.keepaliveTimeout = `${next(5, 8)}-${next(12, 18)}`;
    base.maxHandshakeAttempts = `${next(15, 17)}-${next(18, 22)}`;
  }
  return base;
}

// قالب استاندارد wireguard:// (سازگار با v2rayN/NekoBox/Hiddify) + پارامترهای AmneziaWG
export function buildWireguardLink(config = {}, name = 'WARP') {
  const host = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = host.includes(':') ? `[${host}]` : host;
  const awg = config.awg === false ? null : buildAmneziaWgParams({ ...config, awgv: config.awgv || '3' });
  const params = new URLSearchParams();
  params.set('publickey', config.publicKey || WARP_PEER_PUBLIC_KEY);
  params.set('reserved', (Array.isArray(config.reserved) ? config.reserved : [0, 0, 0]).join(','));
  const address = String(config.address4 || WARP_DEFAULT_ADDRESS);
  params.set('address', `${address}/32`);
  params.set('mtu', String(parseInt(config.mtu, 10) || 1280));
  params.set('dns', String(config.dns || '1.1.1.1,1.0.0.1').replace(/\s+/g, ''));
  if (config.address6) params.set('address6', String(config.address6));
  if (awg) {
    params.set('awg', awg.version || '1');
    params.set('jc', String(awg.jc));
    params.set('jmin', String(awg.jmin));
    params.set('jmax', String(awg.jmax));
    // مقادیر صفر در لینک نوشته نمی‌شوند (کلاینت آن‌ها را پیش‌فرض وایرگارد می‌گیرد)
    for (const key of ['s1', 's2', 's3', 's4', 'h1', 'h2', 'h3', 'h4']) {
      if (awg[key] > 0) params.set(key, String(awg[key]));
    }
    if (awg.paddingAddition) params.set('cpa', awg.paddingAddition);
    (awg.signatures || []).forEach((sig, idx) => params.set(`i${idx + 1}`, sig));
  }
  const userInfo = encodeURIComponent(String(config.privateKey || ''));
  return `wireguard://${userInfo}@${endpoint}:${config.port || WARP_DEFAULT_PORT}?${params.toString()}#${encodeURIComponent(name)}`;
}

// فایل کانفیگ .conf قابل ایمپورت در AmneziaWG / WireGuard
// (کلیدهای Reserved عمداً به‌صورت کامنت می‌آیند تا پارسر کلاینت خطا ندهد)
export function buildWireGuardConf(config = {}, name = 'WARP') {
  const awg = buildAmneziaWgParams(config);
  const endpointHost = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = endpointHost.includes(':') ? `[${endpointHost}]` : endpointHost;
  const reserved = (Array.isArray(config.reserved) ? config.reserved : [0, 0, 0]).join(', ');
  const mtu = parseInt(config.mtu, 10) || 1280;
  const dns = String(config.dns || '1.1.1.1, 1.0.0.1');
  const family = String(config.server || '').includes(':') ? 'IPv6' : 'IPv4';
  const lines = [
    `# ${name} — ${BRAND_NAME}`,
    `# AmneziaWG profile — junk packets only (Jc/Jmin/Jmax) keep WARP handshake intact`,
    `# endpoint family: ${family} | MTU ${mtu}`,
    `# Reserved (WARP client id): ${reserved}`,
    '[Interface]',
    `PrivateKey = ${config.privateKey || ''}`,
    `Address = ${config.address4 || WARP_DEFAULT_ADDRESS}/32`
  ];
  if (config.address6) lines.push(`Address = ${config.address6}`);
  lines.push(`DNS = ${dns}`, `MTU = ${mtu}`);
  lines.push(
    `Jc = ${awg.jc}`,
    `Jmin = ${awg.jmin}`,
    `Jmax = ${awg.jmax}`
  );
  // پارامترهای پدینگ/هدر فقط در حالت مبهم‌سازی کامل نوشته می‌شوند؛ صفر برای
  // WARP لازم است و گرنه هندشیک وایرگارد استاندارد رد می‌شود.
  for (const [key, value] of [['S1', awg.s1], ['S2', awg.s2], ['S3', awg.s3], ['S4', awg.s4], ['H1', awg.h1], ['H2', awg.h2], ['H3', awg.h3], ['H4', awg.h4]]) {
    if (value > 0) lines.push(`${key} = ${value}`);
  }
  // AmneziaWG 2.x/3.x: بسته‌های امضایی و تنظیمات زمان‌بندی (فقط سمت کلاینت)
  (awg.signatures || []).forEach((sig, idx) => lines.push(`I${idx + 1} = ${sig}`));
  if (awg.paddingAddition) lines.push(`ContentPaddingAddition = ${awg.paddingAddition}`);
  if (awg.rekeyAfterTime) lines.push(`RekeyAfterTime = ${awg.rekeyAfterTime}`);
  if (awg.rekeyTimeout) lines.push(`RekeyTimeout = ${awg.rekeyTimeout}`);
  if (awg.rejectAfterTime) lines.push(`RejectAfterTime = ${awg.rejectAfterTime}`);
  if (awg.keepaliveTimeout) lines.push(`KeepaliveTimeout = ${awg.keepaliveTimeout}`);
  if (awg.maxHandshakeAttempts) lines.push(`MaxHandshakeAttempts = ${awg.maxHandshakeAttempts}`);
  lines.push(
    '[Peer]',
    `PublicKey = ${config.publicKey || WARP_PEER_PUBLIC_KEY}`,
    'AllowedIPs = 0.0.0.0/0, ::/0',
    'PersistentKeepalive = 25',
    `Endpoint = ${endpoint}:${config.port || WARP_DEFAULT_PORT}`
  );
  // لایسنس حساب هرگز داخل فایل کاربر نوشته نمی‌شود (نشت کلید پولی)
  return lines.join('\n') + '\n';
}

// کانفیگ WireGuard استاندارد (بدون پارامترهای امنزیا) — برای کلاینت‌هایی که
// AmneziaWG ندارند ولی WARP ساده را کامل پشتیبانی می‌کنند.
export function buildPlainWireGuardConf(config = {}, name = 'WARP') {
  const endpointHost = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = endpointHost.includes(':') ? `[${endpointHost}]` : endpointHost;
  const mtu = parseInt(config.mtu, 10) || 1280;
  const dns = String(config.dns || '1.1.1.1, 1.0.0.1');
  return [
    `# ${name} — ${BRAND_NAME} (WireGuard)`,
    '[Interface]',
    `PrivateKey = ${config.privateKey || ''}`,
    `Address = ${config.address4 || WARP_DEFAULT_ADDRESS}/32`,
    `DNS = ${dns}`,
    `MTU = ${mtu}`,
    '[Peer]',
    `PublicKey = ${config.publicKey || WARP_PEER_PUBLIC_KEY}`,
    'AllowedIPs = 0.0.0.0/0, ::/0',
    'PersistentKeepalive = 25',
    `Endpoint = ${endpoint}:${config.port || WARP_DEFAULT_PORT}`
  ].join('\n') + '\n';
}

// بستهٔ کانفیگ‌های آمادهٔ WARP برای دانلود (zip) — بدون نیاز به هیچ تنظیمی در پنل:
// WARP، WARP PRO، ماتریس کامل اندپوینت‌های IPv4/IPv6 در چند پورت و چند پروفایل
// مبهم‌سازی. پارامترها بر اساس شناسهٔ کاربر ساخته می‌شوند تا هر کاربر بستهٔ
// اختصاصی خودش را بگیرد (امضای شبکه‌ای یکسان برای همهٔ کاربران خطرناک است).
const WARP_ML_CONF_COUNT = 8;

// پروفایل‌های آماده: MTU و DNS متفاوت → رفتار متفاوت در DPI اپراتورها
const WARP_PROFILE_PRESETS = {
  balanced: { mtu: 1280, dns: '1.1.1.1, 1.0.0.1' },
  aggressive: { mtu: 1180, dns: '1.1.1.1' },
  lite: { mtu: 1380, dns: '1.0.0.1, 1.1.1.1' },
  mobile: { mtu: 1240, dns: '1.1.1.1, 1.0.0.1' }
};

// پروفایل‌های مبهم‌سازی WARP: هر پروفایل نسخهٔ AmneziaWG، MTU و DNS متفاوت دارد
// تا یک نود در DPI یک اپراتور کار کند و دیگری نه؛ همه روی همان اندپوینت اصلی.
const WARP_OBF_PROFILES = [
  { id: 'lite', name: 'WARP OBF LITE', awgv: '1', mtu: 1320, dns: '1.0.0.1' },
  { id: 'balanced', name: 'WARP OBF BALANCED', awgv: '2', mtu: 1280, dns: '1.1.1.1' },
  { id: 'aggressive', name: 'WARP OBF AGGRESSIVE', awgv: '3', mtu: 1180, dns: '1.1.1.1, 1.0.0.1' },
  { id: 'stealth', name: 'WARP OBF STEALTH', awgv: '2', mtu: 1240, dns: '1.0.0.1, 1.1.1.1' }
];

function warpEndpointTag(host) {
  return String(host).replace(/:/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
}

export async function buildWarpConfBundle(cfg = {}, options = {}) {
  const registered = await fetchWarpRegistration(cfg);
  const base = registered || buildFallbackWarpConfig();
  const awgv = normalizeAwgVersion(cfg.awgv);
  const seed = String(options.seed || cfg.wk || BRAND_NAME);
  const v4Hosts = WARP_ENDPOINT_IPS.filter(host => !String(host).includes(':'));
  const v6Hosts = WARP_ENDPOINT_IPS.filter(host => String(host).includes(':'));
  const shift = awgHash(seed) % Math.max(1, v4Hosts.length);
  const v4Rotated = [...v4Hosts.slice(shift), ...v4Hosts.slice(0, shift)];
  const ports = WARP_ENDPOINT_PORTS;

  const entries = [];
  const add = (host, port, preset, kind) => entries.push({ host, port, preset, kind });
  // ۱) پروفایل اصلی روی اندپوینتی که ثبت‌نام برگرداند
  add(base.server || WARP_DEFAULT_HOST, base.port || WARP_DEFAULT_PORT, 'balanced', 'primary');
  add(base.server || WARP_DEFAULT_HOST, WARP_DEFAULT_PORT, 'aggressive', 'primary');
  // ۲) ماتریس IPv4: چهار آی‌پی × چهار پورت
  v4Rotated.slice(0, 4).forEach((host, idx) => {
    ports.forEach((port, pIdx) => {
      add(host, port, (idx + pIdx) % 2 === 0 ? 'balanced' : 'lite', 'v4');
    });
  });
  // ۳) اندپوینت‌های IPv6 — تونل دوطرفه (ترافیک v4/v6 از زیرساخت v6 عبور می‌کند)
  v6Hosts.forEach((host, idx) => {
    [2408, 500].forEach((port, pIdx) => {
      add(host, port, (idx + pIdx) % 2 === 0 ? 'mobile' : 'balanced', 'v6');
    });
  });
  // ۴) اندپوینت دامنه‌ای (dual-stack) برای شبکه‌هایی که IP خام را می‌بندند
  [2408, 1701].forEach((port, idx) => add(WARP_DEFAULT_HOST, port, idx === 0 ? 'balanced' : 'aggressive', 'dns'));

  const files = [];
  const used = new Set();
  const pushFile = (fileName, label, entry, presetId) => {
    const preset = WARP_PROFILE_PRESETS[presetId] || WARP_PROFILE_PRESETS.balanced;
    let name = fileName;
    let n = 2;
    while (used.has(name)) name = fileName.replace(/\.conf$/, `-${n++}.conf`);
    used.add(name);
    files.push({
      name,
      data: buildWireGuardConf(
        { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awgv, seed: `${seed}:${name}` },
        label
      )
    });
  };

  pushFile('01-WARP.conf', 'WARP', entries[0], 'balanced');
  pushFile('02-WARP-PRO.conf', 'WARP PRO', entries[1], 'aggressive');
  entries.slice(2).forEach(entry => {
    const tag = `${entry.kind}-${warpEndpointTag(entry.host)}-${entry.port}`;
    pushFile(
      `WARP-${tag}-${entry.preset}.conf`,
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port} ${entry.preset}`,
      entry,
      entry.preset
    );
  });
  // پنجرهٔ امتحان پروفایل‌ها روی همان اندپوینت اصلی (برای تست MTU/DNS در اپراتور)
  for (const presetId of Object.keys(WARP_PROFILE_PRESETS)) {
    pushFile(`WARP-profile-${presetId}.conf`, `WARP ${presetId}`, entries[0], presetId);
  }

  // پروفایل‌های مبهم‌سازی مختلف روی همان اندپوینت: AWG1 (فقط Junk)، AWG2
  // (امضایی + پدینگ) و AWG3 (زمان‌بندی کامل) با MTU/DNS متفاوت.
  const obfLinks = [];
  for (const obf of WARP_OBF_PROFILES) {
    const profileSeed = `${seed}:obf:${obf.id}`;
    files.push({
      name: `WARP-obf-${obf.id}.conf`,
      data: buildWireGuardConf(
        {
          ...base,
          server: entries[0].host,
          port: entries[0].port,
          mtu: obf.mtu,
          dns: obf.dns,
          awgv: obf.awgv,
          seed: profileSeed
        },
        obf.name
      )
    });
    obfLinks.push(buildWireguardLink(
      {
        ...base,
        server: entries[0].host,
        port: entries[0].port,
        mtu: obf.mtu,
        dns: obf.dns,
        awgv: obf.awgv,
        seed: profileSeed
      },
      obf.name
    ));
  }
  files.push({ name: 'links-obf.txt', data: obfLinks.join('\n') + '\n' });

  const links = entries.map(entry => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return buildWireguardLink(
      { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awgv, seed: `${seed}:link:${entry.host}:${entry.port}` },
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
    );
  });
  files.push({ name: 'links.txt', data: links.join('\n') + '\n' });

  // لینک‌های «وایرگارد ساده» بدون پارامترهای AmneziaWG: بعضی کلاینت‌ها
  // (v2rayN / NekoBox / Shadowrocket) پارامترهای i1/i2/i3 و cpa را نمی‌شناسند و
  // کل لینک را رد می‌کنند؛ ساب base64 از همین نسخهٔ ساده ساخته می‌شود.
  const plainLinks = entries.map(entry => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return buildWireguardLink(
      { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awg: false, seed: `${seed}:plain:${entry.host}:${entry.port}` },
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
    );
  });
  files.push({ name: 'links-plain.txt', data: plainLinks.join('\n') + '\n' });

  // ---- همهٔ فرمت‌های دیگر WARP در همین زیپ ----
  const reservedArr = (Array.isArray(base.reserved) ? base.reserved : [0, 0, 0]).slice(0, 3);
  const dnsList = String(base.dns || '1.1.1.1, 1.0.0.1').split(',').map(item => item.trim()).filter(Boolean);
  const localAddress = [base.address4 || WARP_DEFAULT_ADDRESS];
  if (base.address6) localAddress.push(base.address6);

  // ۱) ساب‌لینک base64 (v2rayN / NekoBox / Hiddify) — با لینک‌های استاندارد WireGuard
  files.push({ name: 'WARP-sub-base64.txt', data: encodeBase64Utf8(plainLinks.join('\n')) + '\n' });

  // ۲) Clash Meta / Mihomo
  const proxyNames = [];
  const clashProxies = entries.map((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    const proxyName = `WARP ${idx + 1} ${entry.kind} ${entry.port}`;
    proxyNames.push(proxyName);
    const awg = buildAmneziaWgParams({ ...base, awgv, seed: `${seed}:clash:${entry.host}:${entry.port}` });
    const parts = [
      `name: "${proxyName}"`,
      'type: wireguard',
      `server: "${entry.host}"`,
      `port: ${entry.port}`,
      `ip: ${localAddress[0]}/32`,
      `private-key: "${base.privateKey || ''}"`,
      `public-key: "${base.publicKey || WARP_PEER_PUBLIC_KEY}"`,
      `mtu: ${preset.mtu}`,
      'udp: true',
      `reserved: [${reservedArr.join(', ')}]`,
      `dns: [${dnsList.map(item => `"${item}"`).join(', ')}]`,
      'allowed-ips: ["0.0.0.0/0", "::/0"]',
      'remote-dns-resolve: true'
    ];
    if (awgv >= 2) {
      parts.push(`amnezia-wg-option: { jc: ${awg.jc}, jmin: ${awg.jmin}, jmax: ${awg.jmax}, s1: 0, s2: 0, h1: 1, h2: 2, h3: 3, h4: 4 }`);
    }
    return `  - { ${parts.join(', ')} }`;
  });
  // ۲-ب) MASQUE در بستهٔ مستقل /warp/masque ارائه می‌شود و عمداً در این ZIP نیست.

  files.push({
    name: 'WARP-clash.yaml',
    data: [
      `# ${BRAND_NAME} — WARP / WARP PRO / multi-location`,
      '# Clash Meta / Mihomo (clash-verge, flclash, stash)',
      `# profiles: ${entries.length} — AmneziaWG junk packets, headers stay default for WARP`,
      'mixed-port: 7890',
      'allow-lan: false',
      'mode: rule',
      'log-level: warning',
      'dns:',
      '  enable: true',
      '  enhanced-mode: fake-ip',
      '  nameserver:',
      ...dnsList.map(item => `    - ${item}`),
      'proxies:',
      ...clashProxies,
      'proxy-groups:',
      '  - name: "WARP"',
      '    type: select',
      '    proxies:',
      ...proxyNames.map(name => `      - "${name}"`),
      '      - DIRECT',
      'rules:',
      '  - MATCH,WARP'
    ].join('\n') + '\n'
  });

  // ۳) sing-box
  const sbOutbounds = entries.map((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return {
      type: 'wireguard',
      tag: `WARP ${idx + 1} ${entry.kind} ${entry.port}`,
      server: entry.host,
      server_port: entry.port,
      local_address: localAddress.map(item => (item.includes('/') ? item : item.includes(':') ? `${item}/128` : `${item}/32`)),
      private_key: base.privateKey || '',
      peer_public_key: base.publicKey || WARP_PEER_PUBLIC_KEY,
      mtu: preset.mtu,
      reserved: reservedArr
    };
  });
  const singboxConfig = {
    log: { level: 'warn' },
    inbounds: [{ type: 'mixed', tag: 'mixed-in', listen: '127.0.0.1', listen_port: 2080 }],
    outbounds: [
      {
        type: 'selector',
        tag: 'select',
        outbounds: sbOutbounds.map(item => item.tag).concat(['direct']),
        default: sbOutbounds.length ? sbOutbounds[0].tag : 'direct'
      },
      ...sbOutbounds,
      { type: 'direct', tag: 'direct' }
    ],
    route: { final: 'select' }
  };
  files.push({ name: 'WARP-singbox.json', data: JSON.stringify(singboxConfig, null, 2) + '\n' });

  // ۴) WireGuard خالص (بدون پارامترهای امنزیا) برای کلاینت‌های معمولی
  entries.slice(0, 6).forEach((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    files.push({
      name: `plain-wireguard/${String(idx + 1).padStart(2, '0')}-${entry.kind}-${warpEndpointTag(entry.host)}-${entry.port}-${entry.preset}.conf`,
      data: buildPlainWireGuardConf(
        { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns },
        `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
      )
    });
  });

  const endpointList = [
    `# ${BRAND_NAME} — WARP endpoint matrix`,
    `# IPv4: ${v4Hosts.length} hosts x ${ports.length} ports`,
    `# IPv6: ${v6Hosts.length} hosts x 2 ports`,
    '',
    ...entries.map(entry => `${entry.kind}\t${entry.host}\t${entry.port}\t${entry.preset}`)
  ].join('\n');
  files.push({ name: 'endpoints.txt', data: endpointList + '\n' });

  files.push({
    name: 'README.txt',
    data: [
      `${BRAND_NAME} — WARP / WARP PRO / multi-location`,
      '',
      `files: ${files.length + 1} — IPv4 + IPv6 endpoints, multiple UDP ports, 4 tuning profiles`,
      '',
      'formats inside this zip:',
      '  *.conf ................ AmneziaWG profile (Jc/Jmin/Jmax + AWG2/AWG3 signatures)',
      '  plain-wireguard/*.conf . standard WireGuard profile (no AmneziaWG keys)',
      '  WARP-clash.yaml ....... Clash Meta / Mihomo profile (clash-verge, flclash, stash)',
      '  WARP-obf-*.conf ....... 4 obfuscation profiles (AWG1 junk / AWG2 / AWG3 / stealth)',
      '  WARP-singbox.json ..... sing-box config with a selector group',
      '  links.txt ............. wireguard:// links with AmneziaWG tuning (Hiddify / NekoBox)',
      '  links-obf.txt ......... wireguard:// links for the 4 obfuscation profiles',
      '  links-plain.txt ....... plain wireguard:// links (any WireGuard-capable client)',
      '  WARP-sub-base64.txt ... same links in base64 subscription form',
      '',
      'WARP MASQUE (HTTP/3) deliberately lives in its own bundle:',
      '  /warp/masque/<token>?format=zip|clash|json|links',
      '  endpoints.txt ......... endpoint matrix (host / port / profile)',
      '',
      'AmneziaWG: import any .conf into AmneziaWG (Windows / Android / iOS / macOS).',
      'WireGuard: use plain-wireguard/ if your client does not support AmneziaWG.',
      'Jc/Jmin/Jmax send junk packets before the handshake; S/H stay 0 because',
      'Cloudflare WARP is a plain WireGuard peer and rejects modified headers.',
      'If a profile does not connect, try another port (500/1701/4500) or the IPv6 file.',
      '',
      `endpoint: ${base.server}:${base.port}`,
      `address:  ${base.address4}/32${base.address6 ? ' + ' + base.address6 : ''}`,
      `profile:  ${seed.slice(0, 8)}`
    ].join('\n')
  });
  return { config: base, files };
}

// خانوادهٔ WARP: یک نود WARP، یک نود WARP PRO (با لایسنس) و N نود چندلوکیشن
export async function buildWarpFamilyLinks(cfg = {}, options = {}) {
  const links = [];
  // always=true (ساب‌لینک و دانلود بدون تنظیم) → WARP و WARP PRO همیشه ساخته می‌شوند
  const always = options.always === true;
  // هر کلید WARP مستقل عمل می‌کند: خاموش‌کردن WARP نباید PRO یا چندلوکیشن را
  // هم حذف کند، و روشن‌بودن هر کلید باید در خروجی دیده شود.
  const wantWarp = isEnabledValue(cfg.warp, always);
  const wantPro = isEnabledValue(cfg.warpPro, false);
  const wantMl = isEnabledValue(cfg.warpMl, false);
  if (!wantWarp && !wantPro && !wantMl) return links;

  const registered = await fetchWarpRegistration(cfg);
  const base = registered || buildFallbackWarpConfig();
  // نسخهٔ AmneziaWG (۱/۲/۳) در همهٔ نودهای WARP اعمال می‌شود
  const awgv = normalizeAwgVersion(cfg.awgv);
  // پروفایل پیش‌فرض قابل انتخاب: MTU و DNS روی همهٔ نودهای WARP می‌نشیند
  const mtu = parseInt(cfg.warpMtu, 10) > 0 ? parseInt(cfg.warpMtu, 10) : 0;
  const dnsMap = { cloudflare: '1.1.1.1', 'cloudflare-alt': '1.0.0.1', both: '1.1.1.1,1.0.0.1', google: '8.8.8.8' };
  const dns = dnsMap[String(cfg.warpDns || '').toLowerCase()] || '';
  const profiled = extra => ({ ...base, ...(mtu ? { mtu } : {}), ...(dns ? { dns } : {}), ...extra });
  const obfMode = String(cfg.warpObf || 'all').toLowerCase();
  const obfProfiles = obfMode === 'off'
    ? []
    : obfMode === 'all'
      ? WARP_OBF_PROFILES
      : WARP_OBF_PROFILES.filter(profile => profile.id === obfMode);

  if (wantWarp) {
    links.push(buildWireguardLink(profiled({ awgv, seed: `warp:${awgv}` }), buildNodeDisplayName({ proto: 'warp', family: 'WireGuard', awg: awgv })));
    // همان اندپوینت با سطوح مختلف مبهم‌سازی (AWG1 junk / AWG2 / AWG3 / stealth)
    for (const obf of obfProfiles) {
      links.push(buildWireguardLink(
        profiled({ awgv: obf.awgv, mtu: mtu || obf.mtu, dns: dns || obf.dns, seed: `warp:obf:${obf.id}` }),
        `${buildNodeDisplayName({ proto: 'warp', family: 'WireGuard', awg: obf.awgv })} · OBF ${obf.id.toUpperCase()}`
      ));
    }
  }
  if (wantPro) {
    // بدون لایسنس هم ساخته می‌شود (کلید رایگان) تا کاربر هیچ تنظیمی لازم نداشته باشد
    links.push(buildWireguardLink(profiled({ awgv, seed: `warp_pro:${awgv}` }), buildNodeDisplayName({ proto: 'warp_pro', family: 'WireGuard', awg: awgv })));
  }
  if (wantMl) {
    const endpoints = parseWarpEndpointList(cfg.warpEndpoint, cfg.warpCount, cfg.warpFamily, String(cfg.wk || BRAND_NAME));
    endpoints.forEach((endpoint, idx) => {
      const label = String(endpoint.label || '').trim().toUpperCase();
      const meta = { proto: 'warp_ml', family: 'WireGuard', cc: /^[A-Z]{2}$/.test(label) ? label : '', awg: awgv };
      const name = `${buildNodeDisplayName(meta)} · ${label || 'EP'}-${idx + 1}`;
      links.push(buildWireguardLink(
        profiled({ server: endpoint.host, port: endpoint.port, awgv, seed: `warp_ml:${endpoint.host}:${endpoint.port}:${awgv}` }),
        name
      ));
    });
  }
  return links;
}

// ============================================================================
// OpenVPN — پروفایل‌های رایگان و زنده (VPNGate) با پشتیبانی چندکشوری
// ============================================================================

let openVpnCache = { at: 0, items: [], key: '' };
const OPENVPN_CACHE_TTL = 30 * 60 * 1000;
const OPENVPN_ROTATE_MS = 30 * 60 * 1000;
const OPENVPN_MAX_CHARS = 320000; // برش امن برای جلوگیری از دریافت کل فایل ۱.۳ مگابایتی

function extractOvpnDirective(text, name) {
  const match = String(text || '').match(new RegExp(`^\\s*${name}\\s+(.+)$`, 'mi'));
  return match ? match[1].trim() : '';
}

function extractOvpnBlock(text, tag) {
  const match = String(text || '').match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

async function readLimitedText(response, maxChars) {
  if (!response.body || typeof response.body.getReader !== 'function') {
    const full = await response.text();
    return full.slice(0, maxChars);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  try {
    while (text.length < maxChars) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch (_e) {
    // اگر برش خورد، همان مقدار خوانده‌شده کافی است
  }
  try { await reader.cancel(); } catch (_e) {}
  return text;
}

// تبدیل متن یک پروفایل ‎.ovpn‎ خام به نود قابل استفاده در Clash / خروجی ‎.ovpn‎
export function parseOvpnProfileText(profileText, meta = {}) {
  const profile = String(profileText || '').replace(/\r\n/g, '\n');
  if (!profile.includes('remote ')) return null;
  const remote = extractOvpnDirective(profile, 'remote').split(/\s+/);
  const server = remote[0];
  if (!server) return null;
  const ca = extractOvpnBlock(profile, 'ca');
  if (!ca) return null;
  const cc = String(meta.country || '').trim().toUpperCase();
  const proto = (extractOvpnDirective(profile, 'proto') || 'udp').toLowerCase();
  return {
    name: meta.name || `OpenVPN-${cc || 'ML'}-${(parseInt(meta.index, 10) || 0) + 1}`,
    country: cc,
    server,
    port: parseInt(remote[1], 10) || 1194,
    proto: proto.startsWith('tcp') ? 'tcp' : 'udp',
    cipher: extractOvpnDirective(profile, 'cipher') || 'AES-128-CBC',
    auth: extractOvpnDirective(profile, 'auth') || 'SHA1',
    ca,
    cert: extractOvpnBlock(profile, 'cert'),
    key: extractOvpnBlock(profile, 'key'),
    tlsAuth: extractOvpnBlock(profile, 'tls-auth') || extractOvpnBlock(profile, 'tls-crypt'),
    keyDirection: extractOvpnDirective(profile, 'key-direction') || '1',
    username: OPENVPN_PUBLIC_USER,
    password: OPENVPN_PUBLIC_PASS,
    profile
  };
}

// تبدیل خطوط CSV منبع VPNGate به نودهای OpenVPN
export function parseOpenVpnList(raw, cfg = {}) {
  if (!isEnabledValue(cfg.ovpn, true)) return [];
  const limit = Math.max(0, Math.min(parseInt(cfg.ovpnCount, 10) || 8, 24));
  if (limit === 0) return [];
  const countryFilter = String(cfg.ovpnCountries || '')
    .split(',')
    .map(x => x.trim().toUpperCase())
    .filter(Boolean);
  const seenCountries = new Set();
  const items = [];
  for (const line of String(raw || '').split(/\r?\n/)) {
    if (!line || line.startsWith('*') || line.startsWith('#')) continue;
    const cols = line.split(',');
    if (cols.length < 15) continue;
    const cc = String(cols[6] || '').trim().toUpperCase();
    const profileB64 = String(cols[cols.length - 1] || '').trim();
    if (!profileB64) continue;
    if (countryFilter.length && !countryFilter.includes(cc)) continue;
    // در حالت آزاد از هر کشور فقط یک سرور انتخاب می‌شود تا ساب‌لینک چندلوکیشن بماند
    if (!countryFilter.length && seenCountries.has(cc)) continue;
    const node = parseOvpnProfileText(decodeBase64Utf8(profileB64), { country: cc, index: items.length });
    if (!node) continue;
    const protoFilter = String(cfg.ovpnProto || 'auto').toLowerCase();
    if ((protoFilter === 'udp' || protoFilter === 'tcp') && node.proto !== protoFilter) continue;
    items.push(node);
    seenCountries.add(cc);
    if (items.length >= limit) break;
  }
  return items;
}

// پروفایل‌های تنظیم کلاینت OpenVPN — هر پروفایل همان تونل است با MTU/DNS متفاوت،
// تا در هر اپراتور حداقل یکی از پروفایل‌ها بالا بیاید (ضد فیلترینگ عملی).
const OVPN_TUNING_PRESETS = [
  { id: 'balanced', mtu: 1400, dns: '1.1.1.1' },
  { id: 'mtu-safe', mtu: 1340, dns: '1.0.0.1' },
  { id: 'mobile', mtu: 1240, dns: '1.1.1.1' }
];

// انتخاب پروفایل(های) تنظیم OpenVPN از مقدار فرم کاربر؛ هم ZIP و هم فایل
// تک‌نفره از همین تابع استفاده می‌کنند تا تنظیم فرم واقعاً در خروجی دیده شود.
export function resolveOvpnTuningPresets(mode = 'all') {
  const wanted = String(mode || 'all').toLowerCase();
  const list = wanted === 'all'
    ? OVPN_TUNING_PRESETS
    : OVPN_TUNING_PRESETS.filter(preset => preset.id === wanted);
  return list.length ? list : OVPN_TUNING_PRESETS;
}

// افزودن تنظیمات امن/ضد DPI به یک پروفایل .ovpn بدون دست زدن به کلیدها و CA
// (هیچ دایرکتیو امنیتی سرور تغییر نمی‌کند؛ فقط پارامترهای سمت کلاینت تنظیم می‌شوند)
export function buildOvpnVariant(profileText, node = {}, preset = {}, seed = '') {
  const text = String(profileText || '').replace(/\r\n/g, '\n').trimEnd();
  if (!text.includes('remote ')) return text;
  const presetId = preset.id || 'balanced';
  // جیتر کوچک بر اساس کاربر: هر کاربر MTU کمی متفاوت دارد (امضای DPI یکسان نباشد)
  const jitter = awgHash(`${seed}:${node.server || ''}:${node.port || ''}:${presetId}`) % 21;
  const mtu = Math.max(1100, (parseInt(preset.mtu, 10) || 1400) - jitter);
  const mssfix = Math.max(1000, mtu - 60);
  const stripped = text
    .replace(/^\s*(tun-mtu|mssfix|sndbuf|rcvbuf|persist-tun|nobind|resolv-retry|connect-retry|connect-retry-max|tls-version-min|dhcp-option DNS)\b.*$/gmi, '')
    .replace(/\n{3,}/g, '\n\n');
  const extra = [
    `# --- ${BRAND_NAME} tuning (${presetId}) ---`,
    `tun-mtu ${mtu}`,
    `mssfix ${mssfix}`,
    'sndbuf 0',
    'rcvbuf 0',
    'persist-tun',
    'nobind',
    'resolv-retry infinite',
    'connect-retry 1 2',
    'connect-retry-max 8',
    'tls-version-min 1.2',
    `dhcp-option DNS ${preset.dns || '1.1.1.1'}`
  ];
  return `${stripped}\n\n${extra.join('\n')}\n`;
}

function isOvpnCsv(text) {
  const head = String(text || '').slice(0, 400);
  return head.includes('OpenVPN_ConfigData_Base64') || head.startsWith('*vpn_servers') || head.includes('#HostName,IP,');
}

// انتخاب منابع: لیست سفارشی مدیر (ovpnSource) یا فایل‌های ‎.ovpn‎ مخزن گیت‌هاب، با چرخش دوره‌ای
function pickOpenVpnSources(cfg = {}, limit = 4) {
  const custom = String(cfg.ovpnSource || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  const pool = custom.length ? custom : OPENVPN_RAW_PROFILE_SOURCES;
  const countryFilter = String(cfg.ovpnCountries || '')
    .split(',')
    .map(x => x.trim().toUpperCase())
    .filter(Boolean);
  const withCountry = pool.map(url => {
    const match = String(url).match(/_([A-Za-z]{2})\.ovpn(?:[?#]|$)/);
    return { url, country: match ? match[1].toUpperCase() : '' };
  });
  const filtered = countryFilter.length
    ? withCountry.filter(item => !item.country || countryFilter.includes(item.country))
    : withCountry;
  if (!filtered.length) return [];
  const bucket = Math.floor(Date.now() / OPENVPN_ROTATE_MS);
  const shift = bucket % filtered.length;
  const rotated = [...filtered.slice(shift), ...filtered.slice(0, shift)];
  return rotated.slice(0, Math.max(1, limit));
}

export async function fetchOpenVpnNodes(cfg = {}, force = false) {
  if (!isEnabledValue(cfg.ovpn, true)) return [];
  const limit = Math.max(0, Math.min(parseInt(cfg.ovpnCount, 10) || 8, 24));
  if (limit === 0) return [];
  // کلید کش شامل فیلترها هم هست؛ وگرنه تغییر پروتکل/کشور/تعداد، نتیجهٔ قدیمی را برمی‌گرداند
  const cacheKey = [limit, String(cfg.ovpnCountries || '').toUpperCase(), String(cfg.ovpnProto || 'auto').toLowerCase()].join('|');
  // کش فقط وقتی کافی است که به اندازهٔ درخواست پروفایل داشته باشد
  if (!force && openVpnCache.key === cacheKey && openVpnCache.items.length >= limit && Date.now() - openVpnCache.at < OPENVPN_CACHE_TTL) {
    return openVpnCache.items;
  }

  const fetchProfile = async (source, index) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const resp = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' },
        signal: controller.signal
      });
      if (!resp.ok) return [];
      const text = await readLimitedText(resp, OPENVPN_MAX_CHARS);
      clearTimeout(timer);
      if (isOvpnCsv(text)) return parseOpenVpnList(text, cfg);
      const node = parseOvpnProfileText(text, { country: source.country, index });
      return node ? [node] : [];
    } catch (_e) {
      return [];
    }
  };

  const collected = [];
  // ۱) فهرست زندهٔ VPNGate: چندین کشور با یک درخواست (پایدارترین منبع)
  for (const url of OPENVPN_CSV_SOURCES) {
    const nodes = await fetchProfile({ url, country: '' }, 0);
    if (nodes.length) {
      collected.push(...nodes);
      break;
    }
  }
  // ۲) پروفایل‌های خام مخزن برای تنوع بیشتر کشورها (با چرخش دوره‌ای)
  if (collected.length < limit) {
    const sources = pickOpenVpnSources(cfg, limit - collected.length + 2);
    const results = await Promise.allSettled(sources.map(fetchProfile));
    for (const result of results) {
      if (result.status === 'fulfilled' && Array.isArray(result.value)) collected.push(...result.value);
    }
  }

  const seen = new Set();
  const items = [];
  const protoFilter = String(cfg.ovpnProto || 'auto').toLowerCase();
  for (const node of collected) {
    if ((protoFilter === 'udp' || protoFilter === 'tcp') && node.proto !== protoFilter) continue;
    const key = `${node.server}:${node.port}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(node);
    if (items.length >= limit) break;
  }

  if (items.length) openVpnCache = { at: Date.now(), items, key: cacheKey };
  return items;
}

// ============================================================================
// آدرس واسط «تحریم‌شکن»: خروجی همهٔ نودها از یک پروکسی بیرون از ایران عبور
// می‍کند تا سرویس‌هایی که آی‌پی ایران را مسدود می‌کنند باز شوند. انتخاب پایدار
// است تا با هر بار خواندن ساب‌لینک عوض نشود.
// ============================================================================
export function resolveSanctionsProxy(cfg = {}, seed = '') {
  const pool = Array.isArray(FALLBACK_PROXY_IPS) ? FALLBACK_PROXY_IPS : [];
  if (!pool.length) return '';
  const wanted = String(cfg.sbRegion || cfg.region || 'DE').trim().toUpperCase();
  const usable = wanted && wanted !== 'AUTO' ? pool.filter(item => String(item.regionCode).toUpperCase() === wanted) : [];
  const list = usable.length ? usable : pool;
  const idx = seed ? stableAddressSeed(String(seed) + '-sb') % list.length : 0;
  const picked = list[idx];
  return `${picked.domain}:${picked.port || 443}`;
}

// کش فهرست آی‌پی‌های ترجیحی (اپراتوری): این فهرست از شبکه خوانده می‌شود و
// بدون کش، با هر بار خواندن ساب‌لینک آدرس نودها عوض می‌شد (پرش آی‌پی در کلاینت).
const PREFERRED_CACHE_TTL = 6 * 60 * 60 * 1000;
let preferredIpsCache = { key: '', at: 0, list: [] };

// کش مشترک بین ایزوله‌ها: در ورکر هر درخواست ممکن است در ایزولهٔ تازه اجرا شود،
// پس فقط حافظهٔ محلی کافی نیست و فهرست در D1 هم نگه داشته می‌شود تا آدرس نودها
// برای همهٔ درخواست‌ها (و کلاینتها) یکی بماند.
function getD1(env) {
  const db = env && (env.DB || env.D1 || env.MILICONFIG_DB || env.MILI_DB);
  return db && typeof db.prepare === 'function' ? db : null;
}

async function readSharedCache(env, key) {
  const db = getD1(env);
  if (!db) return null;
  try {
    const row = await db.prepare('SELECT value FROM system_config WHERE key = ?').bind(key).first();
    if (!row || !row.value) return null;
    const parsed = JSON.parse(String(row.value));
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_e) {
    return null;
  }
}

async function writeSharedCache(env, key, payload) {
  const db = getD1(env);
  if (!db) return;
  try {
    await db.prepare(
      `INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    ).bind(key, JSON.stringify(payload), Date.now()).run();
  } catch (_e) {}
}

async function fetchPreferredIpsCached(cfg = {}, env = null) {
  const key = [cfg.ipv4, cfg.ipv6, cfg.ispMobile, cfg.ispUnicom, cfg.ispTelecom].join('|');
  const sharedKey = 'preferred_ips_cache_' + stableAddressSeed(key);
  if (preferredIpsCache.key === key && Date.now() - preferredIpsCache.at < PREFERRED_CACHE_TTL) {
    return preferredIpsCache.list;
  }
  const shared = await readSharedCache(env, sharedKey);
  if (shared && Array.isArray(shared.list) && shared.list.length && Date.now() - Number(shared.at || 0) < PREFERRED_CACHE_TTL) {
    preferredIpsCache = { key, at: Number(shared.at), list: shared.list };
    return shared.list;
  }
  const list = await fetchUouinPreferredIps(cfg).catch(() => []);
  if (Array.isArray(list) && list.length) {
    const at = Date.now();
    preferredIpsCache = { key, at, list };
    await writeSharedCache(env, sharedKey, { at, list });
  }
  return Array.isArray(list) ? list : [];
}

// کش کوتاه‌مدت لیست نودها: پاسخ یکسان برای همان کاربر/تنظیمات تا نودها بین
// دو بار خواندن ساب‌لینک (پینگ، بروزرسانی کلاینت) جابه‌جا نشوند و ساب صفحهٔ
// وضعیت و تب لوکیشن دقیقاً هماهنگ باشند.
//Cache کوتاه‌تر از TTL استخر است تا آدرس‌های تازهٔ منابع cfnew زودتر در ساب نشینند
const NODES_CACHE_TTL = 5 * 60 * 1000;
const NODES_CACHE_MAX = 80;
const nodesCache = new Map();

function buildNodesCacheKey(workerHost, userOrConfig, cfg, overrides = {}, epoch = 0) {
  const uuid = String(userOrConfig?.uuid || overrides.uuid || 'default').toLowerCase();
  const params = [
    overrides.set || '', overrides.country || '', overrides.region || '',
    overrides.proto || '', overrides.limit === undefined ? '' : String(overrides.limit),
    overrides.wk || '', overrides.scope || userOrConfig?.nodeScope || 'all',
    overrides.nowarp || ''
  ].join('|');
  return `${workerHost}|${uuid}|${stableAddressSeed(JSON.stringify(cfg))}|${params}|e${epoch}`;
}

// ---------------------------------------------------------------------------
// نوبت بروزرسانی (refresh epoch)
// آدرس نودها باید با هر بروزرسانی در کلاینت تازه شود، ولی با پینگ‌گرفتن یا
// درخواست تکراری نباید بپرد. «نوبت» را از پنجرهٔ زمانی سراسری می‌گیریم (نه از
// حافظهٔ یک ایزوله) تا همهٔ ایزوله‌ها و همهٔ درخواست‌های یک کلاینت در یک پنجره
// دقیقاً همان مجموعه آدرس را ببینند و فقط با شروع پنجرهٔ بعدی آدرس تازه بیاید.
// ---------------------------------------------------------------------------
const REFRESH_EPOCH_MS = 5 * 60 * 1000;

export function nextRefreshEpoch(_key = '') {
  return Math.floor(Date.now() / REFRESH_EPOCH_MS);
}

function rememberNodes(key, links) {
  if (!key) return;
  nodesCache.set(key, { at: Date.now(), links });
  if (nodesCache.size > NODES_CACHE_MAX) {
    const oldest = [...nodesCache.entries()].sort((a, b) => a[1].at - b[1].at).slice(0, nodesCache.size - NODES_CACHE_MAX);
    for (const [entryKey] of oldest) nodesCache.delete(entryKey);
  }
}

// تولید لیست کامل لینک‌های نود برای کاربر با نام‌گذاری گویا (کشور/پروتکل/خانوادهٔ آدرس)
// و رعایت سقف تعداد نود در ساب
export async function generateUserNodesList(userOrConfig, workerHost, queryOverrides = {}) {
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);
  // حالت آی‌پی ثابت: نودها به یک آدرس قفل می‌شوند و نوبت رفرش/پینگ هم روی
  // آدرس اثر ندارد؛ پس بذر و کلید کش هم ثابت می‌مانند.
  const fixedIpMode = cfg.ipMode === 'fixed';
  const rotationEpoch = fixedIpMode ? 0 : nextRefreshEpoch(String(userOrConfig?.uuid || queryOverrides.uuid || 'anonymous'));
  const cachedKey = buildNodesCacheKey(workerHost, userOrConfig, cfg, queryOverrides, rotationEpoch);
  const cached = nodesCache.get(cachedKey);
  if (cached && Date.now() - cached.at < NODES_CACHE_TTL) return cached.links.slice();
  // استخر لبهٔ ترکیبی دامنه/آی‌پی: پاسخ فوری از فهرست داخلی و تازه‌سازی
  // لیست‌های آنلاین در پس‌زمینه؛ تولید ساب‌لینک هیچ‌وقت منتظر شبکه نمی‌ماند.
  const edgePool = await getEdgePool(cfg, { waitUntil: queryOverrides.waitUntil });
  const userUuid = String(userOrConfig?.uuid || queryOverrides.uuid || '351c9981-04b6-4103-aa4b-864aa9c91469').toLowerCase();
  // بذر انتخاب آدرس: شناسهٔ کاربر + نوبت بروزرسانی (نه زمان لحظه‌ای)
  const addrSeed = `${userUuid}~${fixedIpMode ? 'pin' : 'e' + rotationEpoch}`;
  const nodeScope = queryOverrides.scope || userOrConfig?.nodeScope || 'all';
  const wkOverride = (queryOverrides.wk || cfg.wk || '').trim().toUpperCase();
  const protoFilter = (queryOverrides.proto || '').trim().toLowerCase();
  // ساب‌لینک اختصاصی «دامنه‌های لبهٔ کلادفلر»: ?set=domain
  // فقط نودهای دامنه‌محور می‌سازد و از استخر آی‌پی/کشوری/WARP استفاده نمی‌کند.
  const setParam = String(queryOverrides.set || '').trim().toLowerCase();
  const domainMode = setParam === 'domain';
  // منطقهٔ انتخابی کاربر/لوکیشن (region) — در نبود ?country از همین استفاده می‌شود
  const regionCode = String(queryOverrides.region || cfg.region || 'auto').trim().toUpperCase();
  const regionFilter = /^[A-Z]{2}$/.test(regionCode) && regionCode !== 'AUTO' && regionCode !== 'CF'
    ? regionCode
    : '';
  // ساب‌لینک اختصاصی «فقط IPv6» برای شبکهٔ همراه اول: ?set=ipv6
  // (همراهاول روی IPv6 عملکرد بهتری دارد؛ این ساب هیچ نود IPv4/دامنه ندارد.)
  const ipv6Mode = setParam === 'ipv6' || setParam === 'ipv6-mci' || setParam === 'mci';

  // اولویت آدرس واسط: مقدار صریح کاربر → منطقهٔ انتخابی → پیش‌فرض تحریم‌شکن
  const explicitProxy = String(rawCfg.p || '').trim();
  if (!explicitProxy && regionFilter) {
    cfg.p = `ProxyIP.${regionFilter}.CMLiussss.net:443`;
  }
  if (!String(cfg.p || '').trim() && cfg.sb === 'yes') {
    cfg.p = resolveSanctionsProxy(cfg, userUuid);
  }

  if (ipv6Mode) {
    // فقط آی‌پی نسخه ۶؛ دامنه محور/لیست ترجیحی/سرور اصلی/چندلوکیشن کنار گذاشته می‌شوند
    cfg.ipv4 = 'no';
    cfg.ipv6 = 'yes';
    cfg.epd = 'no';
    cfg.egi = 'no';
    cfg.ena = 'no';
    cfg.pd = 'no';
    cfg.yxby = 'yes';
  }

  // نودهای قفل‌شده روی یک آی‌پی: همهٔ منابع آدرس خاموش می‌شوند تا فقط
  // همان آدرس (دستی یا انتخاب پایدار از استخر) در کلاینت بنشیند.
  let pinnedNode = null;
  let fixedIpCountry = '';
  if (fixedIpMode) {
    cfg.ipRotation = 'off';
    cfg.ena = 'no';
    cfg.pd = 'no';
    cfg.epi = 'no';
    cfg.epd = 'no';
    cfg.egi = 'no';
    cfg.yxby = 'yes';
    cfg.yx = '';
    const pinnedParse = parseCustomPreferredString(cfg.ipPinned || '');
    const chosen = pinnedParse.ipList[0] || pinnedParse.domainList[0];
    const fallback = pickStableAddresses(OFFICIAL_DIRECT_IPS, 1, addrSeed + '-pin')[0];
    const host = String((chosen && (chosen.ip || chosen.domain)) || fallback || '').trim();
    if (host) {
      const isV6 = host.includes(':');
      cfg.ipv4 = isV6 ? 'no' : 'yes';
      cfg.ipv6 = isV6 ? 'yes' : 'no';
      pinnedNode = { ip: host, port: (chosen && chosen.port) || 443, isp: 'Fixed-IP' };
      const name = String((chosen && (chosen.name || chosen.isp)) || '').trim();
      const match = name.match(/\b([A-Za-z]{2})\b/);
      fixedIpCountry = match ? match[1].toUpperCase() : '';
    }
  }

  const evEnabled = protoFilter ? protoFilter === 'vless' : isEnabledValue(cfg.ev, true);
  const etEnabled = protoFilter ? protoFilter === 'trojan' : isEnabledValue(cfg.et, false);
  const exEnabled = protoFilter ? protoFilter === 'xhttp' : isEnabledValue(cfg.ex, false);
  const esEnabled = protoFilter ? (protoFilter === 'ss' || protoFilter === 'shadowsocks') : isEnabledValue(cfg.es, false);

  // هر پروتکل در گروه جداگانه ساخته می‌شود تا در پایان ترکیب‌های مختلف
  // (پروتکل × خانوادهٔ آدرس) به تعداد مساوی در ساب حاضر باشند.
  const protoGroups = { vless: [], trojan: [], ss: [], xhttp: [] };

  // فرگمنت TLS بر اساس پریست انتخابی مدیر (off = بدون فرگمنت)
  // شادوساکس هیچ‌وقت پارامتر fragment نمی‌گیرد و همیشه در سابلینک می‌ماند.
  cfg.fragmentValue = buildFragmentValue(cfg);
  if (!cfg.fragmentValue && cfg.frag !== 'no' && isFilteredPagesOrWorkersHost(workerHost)) {
    cfg.fragmentValue = '10-30,10-20,tlshello';
  }

  // دامنه‌های SNI/Host: ابتدا مقدار خود کاربر، بعد تنظیمات کلی پنل (چون این
  // فهرست یک تنظیم نصب است و معمولاً فقط روی تنظیمات کلی ست می‌شود).
  const globalSniHosts = queryOverrides.sniHosts
    || (queryOverrides.globalCfg && queryOverrides.globalCfg.sniHosts)
    || '';
  const frontHosts = resolveFrontHosts(workerHost, {
    sniHosts: String(cfg.sniHosts || '').trim() ? cfg.sniHosts : globalSniHosts
  });
  let frontCursor = 0;

  function appendFromSource(sourceList) {
    const safeList = filterAddressFamily(sourceList, cfg);
    if (!Array.isArray(safeList) || safeList.length === 0) return;
    const decorated = frontHosts.length > 1
      ? safeList.map(item => ({ ...item, frontHost: frontHosts[(frontCursor++) % frontHosts.length] }))
      : safeList;
    if (evEnabled) protoGroups.vless.push(...buildVlessLinks(decorated, userUuid, workerHost, cfg, wkOverride));
    if (etEnabled) protoGroups.trojan.push(...buildTrojanLinks(decorated, userUuid, workerHost, cfg, wkOverride));
    if (exEnabled) protoGroups.xhttp.push(...buildXhttpLinks(decorated, userUuid, workerHost, cfg));
    if (esEnabled) protoGroups.ss.push(...buildShadowsocksLinks(decorated, userUuid, workerHost, cfg));
  }

  // ساب اختصاصی IPv6: همهٔ آی‌پی‌های نسخه ۶ استخر + آی‌پی‌های رسمی کلادفلر
  if (ipv6Mode) {
    // فهرست رسمی IPv6 کلادفلر (ثابت) + استخر زنده به‌صورت مرتب‌شده
    const v6Pool = [
      ...OFFICIAL_DIRECT_IPV6,
      ...pickStableAddresses(edgePool.ipv6, 12, addrSeed + '-v6')
    ].filter(Boolean);
    appendFromSource(v6Pool.map(ip => ({ ip, isp: 'CF-IPv6', family: 'ipv6' })));
  }

  // نودهای «دامنهٔ کلادفلر»: آدرس نود فقط دامنه است (بدون آی‌پی). دامنه‌ها
  // از استخر تأییدشدهٔ CF_EDGE_DOMAINS به‌صورت چرخشی انتخاب می‌شوند.
  if (domainMode) {
    const wantedRaw = parseInt(
      queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
      10
    );
    // ۰/نامعتبر = بدون سقف؛ تعداد آدرس‌ها را موتور خودش تعیین می‌کند
    const wanted = Number.isFinite(wantedRaw) && wantedRaw > 0 ? wantedRaw : 0;
    const protocolCount = [evEnabled, etEnabled, exEnabled, esEnabled].filter(Boolean).length || 1;
    // cfnew حداکثر همان ۲۱ دامنهٔ 直连域名 را استفاده می‌کند؛ بیشتر از این
    // فقط ساب‌لینک را بی‌دلیل بزرگ می‌کند.
    const addressCount = wanted > 0
      ? Math.min(21, Math.max(4, Math.ceil(wanted / protocolCount) + 4))
      : 21;
    // اول دامنه‌های واقعی منابع بیرونی و بعد استخر تأییدشدهٔ داخلی
    const domains = pickStableAddresses(
      [...DIRECT_DOMAINS.map(d => d.domain), ...edgePool.domains],
      addressCount,
      addrSeed + '-dom'
    );
    appendFromSource(domains.map(domain => ({ ip: domain, port: 443, isp: 'CF-Domain', domain })));
  }

  // چندلوکیشن: پروکسی‌های کشوری به‌عنوان زنجیره خروجی سمت ورکر استفاده می‌شوند، نه به‌عنوان آدرس نود.
  // آدرس نود یک آی‌پی ثابت واقعی کلادفلر است تا پینگ بگیرد و ترافیک از کشور انتخابی خارج شود.
  // منطقه (region) مثل cfnew با «آدرس جایگزین» پیاده می‌شود: آدرس نود همان
  // آی‌پی ثابت کلادفلر می‌ماند و خروجی از ProxyIP همان منطقه عبور می‌کند.
  let countryMode = false;
  // منطقهٔ ذخیره‌شدهٔ کاربر هم باید مثل ?country عمل کند؛ قبلاً فقط برای
  // ساختن ProxyIP استفاده می‌شد و تب «منطقه» روی کشور نودها اثر کامل نداشت.
  const countryFilter = fixedIpMode ? '' : String(queryOverrides.country || regionFilter || '').trim().toUpperCase();
  if (!domainMode && !ipv6Mode && !fixedIpMode && countryFilter) {
    const wantedCountries = countryFilter === 'MULTI' || countryFilter === 'ALL'
      ? MULTI_COUNTRY_CODES.slice()
      : (COUNTRY_PROXY_SOURCES[countryFilter] ? [countryFilter] : []);
    // اعتبارسنجی واقعی خروجی برای همهٔ کشورها: تا ۳.۵ ثانیه مهلت، نتیجه ۱۰ دقیقه کش می‌شود
    // تست واقعی پروکسی فقط برای یک یا دو کشور انجام می‌شود؛ در حالت MULTI تعداد
    // فیدها و اتصال‌های هم‌زمان از سقف subrequest ورکر می‌گذرد، پس همان رفتار قبلی
    // (بدون تست) حفظ می‌شود تا تعداد نودها کم نشود.
    const verifyEnabled = String(queryOverrides.verify || '') !== '0' && wantedCountries.length <= 2;
    const deadline = Date.now() + COUNTRY_VERIFIED_DEADLINE_MS;
    const needPerCountry = Math.max(2, Math.min(6, parseInt(cfg.locationNodeCount, 10) || 6));
    const countryLists = await Promise.all(wantedCountries.map(code => {
      const urls = (COUNTRY_PROXY_SOURCES[code]?.urls || []).join(',');
      if (!urls) return Promise.resolve(null);
      return getVerifiedCountryProxies(code, urls, { need: needPerCountry, deadline, verify: verifyEnabled, env: queryOverrides.env || null });
    }));
    const proxyPool = [];
    countryLists.forEach((list, idx) => {
      const code = wantedCountries[idx];
      for (const item of (list || [])) {
        proxyPool.push({ proxy: item.proxy, country: code, unverified: item.unverified === true });
      }
    });
    const locationNodes = buildLocationSourceList(proxyPool, cfg, workerHost, addrSeed + ':country');
    if (locationNodes.length > 0) {
      appendFromSource(locationNodes);
      countryMode = true;
    }
  }

  const disablePreferred = cfg.yxby === 'yes' || nodeScope === 'origin';
  const enableNative = !fixedIpMode && (cfg.ena === 'yes' || nodeScope === 'origin');

  // حالت آی‌پی ثابت: فقط همان یک آدرس (برای هر پروتکل فعال) ساخته می‌شود.
  if (fixedIpMode && pinnedNode) {
    appendFromSource([{ ...pinnedNode, country: fixedIpCountry }]);
  }

  if (!domainMode && !ipv6Mode && enableNative && nodeScope !== 'edge') {
    // اگر هاست پنل روی pages.dev یا workers.dev است، در ایران رکورد DNS آن مسدود است؛
    // بنابراین آدرس اتصال نود Origin را روی آی‌پی تمیز Anycast کلادفلر قرار می‌دهیم تا ۱۰۰٪ پینگ بدهد!
    const originConnIp = isFilteredPagesOrWorkersHost(workerHost)
      ? (pickStableAddresses(OFFICIAL_DIRECT_IPS, 1, addrSeed + '-origin')[0] || OFFICIAL_DIRECT_IPS[0])
      : workerHost;
    appendFromSource([{ ip: originConnIp, isp: 'Origin' }]);
  }

  // نودهای «دامنهٔ پنل» — آدرس و SNI دقیقاً دامنهٔ همین ورکر/پیجز (بدون https://)
  if (!domainMode && !ipv6Mode && isEnabledValue(cfg.pd, true) && nodeScope !== 'origin') {
    const panelDomainNodes = buildPanelDomainNodes(workerHost, cfg);
    if (panelDomainNodes.length) appendFromSource(panelDomainNodes);
  }

  const { ipList: customIps, domainList: customDomains, proxyList: customProxies } = parseCustomPreferredString(cfg.yx);
  const hasCustomPreferred = customIps.length > 0 || customDomains.length > 0;

  // ورودی‌های پروکسی (پورت غیر CF) به نودهای زنجیره‌ای تبدیل می‌شوند تا پینگ بدهند
  if (!domainMode && !ipv6Mode && !countryMode && customProxies.length > 0) {
    appendFromSource(buildLocationSourceList(customProxies, cfg, workerHost, addrSeed + ':custom'));
  }

  if (!domainMode && !ipv6Mode && !fixedIpMode && !disablePreferred && !countryMode) {
    if (hasCustomPreferred) {
      if (customIps.length > 0 && cfg.epi === 'yes') {
        appendFromSource(customIps);
      }
      if (customDomains.length > 0 && cfg.epd === 'yes') {
        appendFromSource(customDomains.map(d => ({ ip: d.domain, port: d.port, isp: d.name || d.domain })));
      }
    } else {
      // دامنه‌های پیش‌فرض همیشه حاضرند و با آی‌پی‌های ثابت به‌صورت متناوب
      // چیده می‌شوند تا با سقف کم نود هم حتماً در سایلینک باشند.
      // آی‌پی‌های تازه از استخر لبهٔ کلادفلر (همه با رنج رسمی کلادفلر فیلتر شده‌اند)
      // آی‌پی ثابت در کلاینت: فقط از فهرست‌های ثابت (رسمی کلادفلر و ۲۱ دامنهٔ
      // cfnew) با ترتیب هش‌محور انتخاب می‌شود تا با هر بار خواندن ساب عوض نشود.
      const pooledAddresses = [
        ...pickStableAddresses(OFFICIAL_DIRECT_IPS, 8, addrSeed + '-v4'),
        ...(cfg.ipv6 === 'no' ? [] : pickStableAddresses(OFFICIAL_DIRECT_IPV6, 4, addrSeed + '-v6'))
      ];
      const staticIpNodes = cfg.epi === 'yes'
        ? pooledAddresses.map(ip => ({ ip, isp: 'CF-Fast' }))
        : [];
      const pooledDomains = pickStableAddresses(DIRECT_DOMAINS.map(d => d.domain), 9, addrSeed + '-dom');
      const domainNodes = cfg.epd === 'yes'
        ? pooledDomains.map(domain => ({ ip: domain, isp: domain }))
        : [];
      if (staticIpNodes.length || domainNodes.length) {
        appendFromSource(interleaveAddresses(staticIpNodes, domainNodes));
      }
      // ۲) استخر آی‌پی‌های بهینه ارائه‌شده بر اساس اپراتور
      if (cfg.epi === 'yes' && !cfg.yxURL) {
        const uouinList = await fetchPreferredIpsCached(cfg, queryOverrides.env || null);
        if (uouinList.length > 0) {
          // ترتیب پایدار: از بین آی‌پی‌های برگشتی، همیشه همان تعداد ثابت و با
          // ترتیب هش‌محور انتخاب می‌شود تا آدرس‌ها بین دو درخواست نبض نزنند.
          const byHost = new Map(uouinList.map(item => [String(item.ip), item]));
          const stable = pickStableAddresses([...byHost.keys()], 6, addrSeed + '-uouin')
            .map(ip => byHost.get(ip))
            .filter(Boolean);
          appendFromSource(stable);
        }
      }
      if (cfg.egi === 'yes' && cfg.yxURL) {
        const urlList = await fetchPreferredFromUrls(cfg.yxURL);
        // خطوط دارای scheme (socks5/http) پروکسی خروجی هستند، نه آدرس نود:
        // آنها را به نودهای «آی‌پی ثابت CF + زنجیره پروکسی در مسیر» تبدیل می‌کنیم تا پینگ بدهند.
        const ipOnly = urlList.filter(x => !x.proxy);
        const proxyOnly = urlList.filter(x => x.proxy).map(x => ({ proxy: x.proxy, country: '' }));
        if (ipOnly.length > 0) {
          appendFromSource(ipOnly);
        }
        if (proxyOnly.length > 0) {
          appendFromSource(buildLocationSourceList(proxyOnly, cfg, workerHost, addrSeed + ':url'));
        }
      }
      // ترکیب خانواده‌ها در ساب‌لینک اصلی: بخشی از نودها IPv6 و بخشی دامنه‌محور
      // می‌شوند تا هر سه استخر (IPv4 / IPv6 / دامنه) طبق تعداد نود همان کاربر
      // در ساب‌لینک حاضر باشند؛ نه فقط در ساب‌های ?set=ipv6 و ?set=domain.
      if (!domainMode && !ipv6Mode && !countryMode) {
        const wantedTotal = parseInt(
          queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
          10
        ) || 0;
        if (wantedTotal === 0 || wantedTotal >= 6) {
          const base = wantedTotal || 24;
          // برای ساب‌های بزرگ (مثل ساب ۴۰۰ نودی مدیر) تعداد آی‌پی نسخهٔ ۶ و دامنه هم
          // بالا می‌رود، وگرنه چند گروه کوچک سقف کل ساب را پایین می‌آورند.
          const v6Wanted = cfg.ipv6 === 'no' ? 0 : Math.max(2, Math.min(60, Math.round(base * 0.2)));
          const domWanted = Math.max(2, Math.min(60, Math.round(base * 0.25)));
          if (v6Wanted > 0) {
            const v6List = pickStableAddresses(
              [...OFFICIAL_DIRECT_IPV6, ...edgePool.ipv6],
              v6Wanted,
              addrSeed + '-mix-v6'
            ).filter(Boolean);
            appendFromSource(v6List.map(ip => ({ ip, port: 443, isp: 'CF-IPv6', family: 'ipv6' })));
          }
          const domList = pickStableAddresses(
            [...DIRECT_DOMAINS.map(d => d.domain), ...edgePool.domains],
            domWanted,
            addrSeed + '-mix-dom'
          ).filter(Boolean);
          appendFromSource(domList.map(domain => ({ ip: domain, port: 443, isp: 'CF-Domain', domain })));
        }
      }

      // اگر به هر دلیلی هیچ نودی ساخته نشد، از استخر رسمی CF استفاده می‌کنیم
      const builtCount = protoGroups.vless.length + protoGroups.trojan.length + protoGroups.ss.length + protoGroups.xhttp.length;
      if (builtCount < 15 && cfg.epi === 'yes') {
        appendFromSource(getStaticCfAddresses(cfg).map(ip => ({ ip, isp: 'CF-Direct' })));
      }

      // تکمیل تا سقف درخواستی: ساب‌های بزرگ (۴۰۰ نودی مدیر) با منابع ثابت
      // کسری می‌مانند؛ از استخر زندهٔ لبهٔ CF پر می‌شود تا تعداد واقعاً برسد.
      const requestedTotal = parseInt(
        queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
        10
      ) || 0;
      if (requestedTotal > 0) {
        const activeProtoCount = [evEnabled, etEnabled, exEnabled, esEnabled].filter(Boolean).length || 1;
        const builtNow = protoGroups.vless.length + protoGroups.trojan.length + protoGroups.ss.length + protoGroups.xhttp.length;
        if (builtNow < requestedTotal) {
          const perProto = Math.ceil((requestedTotal - builtNow) / activeProtoCount) + 3;
          const extraIps = pickStableAddresses(edgePool.ipv4, perProto * 2, addrSeed + '-topup')
            .map(ip => ({ ip, port: 443, isp: 'CF-Live' }));
          if (extraIps.length) appendFromSource(extraIps);
          const extraV6 = cfg.ipv6 === 'no' ? [] : pickStableAddresses(edgePool.ipv6, perProto, addrSeed + '-topup-v6')
            .map(ip => ({ ip, port: 443, isp: 'CF-Live-v6', family: 'ipv6' }));
          if (extraV6.length) appendFromSource(extraV6);
        }
      }
    }
  }

  const allEntries = [
    ...protoGroups.vless,
    ...protoGroups.trojan,
    ...protoGroups.ss,
    ...protoGroups.xhttp
  ];

  if (allEntries.length === 0) {
    const fallbackConnIp = isFilteredPagesOrWorkersHost(workerHost)
      ? (OFFICIAL_DIRECT_IPS[0] || workerHost)
      : workerHost;
    appendFromSource([{ ip: fallbackConnIp, port: 443, isp: 'Origin' }]);
  }

  const subNodeCountRaw = queryOverrides.limit !== undefined
    ? parseInt(queryOverrides.limit, 10)
    : Number(userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0);
  const subNodeCount = Number.isFinite(subNodeCountRaw) && subNodeCountRaw > 0 ? subNodeCountRaw : 0;

  // توزیع مساوی ترکیب‌ها (پروتکل × IPv4/IPv6/Domain) و بعد چرخش زمانی اختیاری
  const balancedEntries = balanceComboEntries(allEntries, subNodeCount);
  const rotatedLinks = rotateIpListByTimeBucket(balancedEntries, cfg.ipRotation || 'off');

  // اعمال نام گویا (کشور/نوع نود/خانوادهٔ آدرس) + سقف تعداد نود ساب‌لینک کاربر
  const finalized = finalizeMiliSubscriptionLinks(rotatedLinks, subNodeCount);

  // خانوادهٔ WARP (WARP / WARP PRO / WARP چندلوکیشن) در انتهای ساب‌لینک با نام اختصاصی خودش
  const warpAllowed = !protoFilter || protoFilter === 'warp' || protoFilter === 'wireguard';
  // WARP و WARP PRO بدون نیاز به هیچ تنظیمی همیشه حاضرند؛ فقط حذف کامل آن‌ها
  // با ?proto=vless (یا پروتکل دیگر) یا ?nowarp=1 ممکن است.
  const nowarp = String(queryOverrides.nowarp || '') === '1'
    || (cfg.warp === 'no' && cfg.warpPro === 'no' && cfg.warpMl === 'no');
  // در حالت آی‌پی ثابت، نودهای WARP هم ساخته نمی‌شوند تا هیچ نودی با آی‌پی/کشور
  // متفاوت در کلاینت نباشد و قول «آی‌پی ثابت» واقعاً حفظ شود.
  const warpLinks = warpAllowed && !domainMode && !ipv6Mode && !fixedIpMode && !nowarp
    ? await buildWarpFamilyLinks(cfg, { always: true })
    : [];

  // ساب‌لینک فقط نود واقعی دارد: نودهای «اطلاع‌رسانی» با آدرس 127.0.0.1 در کلاینت
  // کار نمی‌کردند و کاربر فکر می‌کرد نود خراب است؛ دیگر تزریق نمی‌شوند.
  const result = [...finalized, ...warpLinks];
  rememberNodes(cachedKey, result);
  return result;
}

// تشخیص خودکار کلاینت از User-Agent در صورت عدم ارسال پارامتر target
export function detectTargetFromRequest(request, url) {
  const explicit = url.searchParams.get('target');
  if (explicit && explicit.trim()) return explicit.trim().toLowerCase();
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  if (ua.includes('clash') || ua.includes('mihomo') || ua.includes('flclash') || ua.includes('stash') || ua.includes('verge')) {
    return 'clash';
  }
  if (ua.includes('sing-box') || ua.includes('singbox') || ua.includes('hiddify') || ua.includes('sfa') || ua.includes('sfm') || ua.includes('karing')) {
    return 'singbox';
  }
  if (ua.includes('surge')) return 'surge';
  if (ua.includes('quantumult')) return 'quanx';
  if (ua.includes('loon')) return 'loon';
  return 'base64';
}

export async function handleSubscriptionResponse(request, userOrConfig, url = null, env = null, ctx = null) {
  if (!url) url = new URL(request.url);
  const workerHost = url.hostname;
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);

  // بررسی وضعیت فعال بودن، حجم و انقضای کاربر
  if (userOrConfig && userOrConfig.enabled === false) {
    const disabledNode = `vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=tls&type=ws#${encodeURIComponent('⛔ حساب غیرفعال')}`;
    return new Response(btoa(disabledNode), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const target = detectTargetFromRequest(request, url);

  // ساب‌لینک OpenVPN: پروفایل خام (قابل ایمپورت در کلاینت‌های OpenVPN)
  if (['ovpn', 'openvpn'].includes(target)) {
    if (!isEnabledValue(cfg.ovpn, true)) {
      return new Response('نودهای OpenVPN در پنل مدیریت miliconfig خاموش است.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
    const ovpnNodes = await fetchOpenVpnNodes(cfg);
    if (!ovpnNodes.length) {
      return new Response('در حال حاضر پروفایل OpenVPN در دسترس نیست؛ لطفاً بعداً تلاش کنید.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
    // ?format=zip → همهٔ پروفایل‌ها در یک بستهٔ قابل دانلود؛ در غیر این صورت تک‌فایل .ovpn
    const wantZip = ['zip', 'bundle', 'pack'].includes(String(url.searchParams.get('format') || '').toLowerCase());
    if (wantZip) {
      const used = new Set();
      const files = [];
      const seed = String(userOrConfig?.uuid || cfg.wk || BRAND_NAME);
      const chosenTuning = resolveOvpnTuningPresets(cfg.ovpnTuning);
      ovpnNodes.slice(0, 10).forEach((node, idx) => {
        const code = String(node.country || 'ML').toUpperCase();
        for (const preset of chosenTuning) {
          let name = `${BRAND_NAME}-${code}-${String(idx + 1).padStart(2, '0')}-${preset.id}.ovpn`;
          while (used.has(name)) name = name.replace(/\.ovpn$/, `-${Date.now() % 997}.ovpn`);
          used.add(name);
          const header = `# ${BRAND_NAME} OpenVPN — ${code} ${node.server}:${node.port}/${node.proto} (${preset.id})\n`;
          files.push({ name, data: header + buildOvpnVariant(node.profile, node, preset, seed) });
        }
      });
      files.push({
        name: 'servers.txt',
        data: [
          `# ${BRAND_NAME} OpenVPN servers in this bundle`,
          ...ovpnNodes.slice(0, 10).map((node, idx) =>
            `${String(idx + 1).padStart(2, '0')}\t${node.country || 'ML'}\t${node.server}\t${node.port}\t${node.proto}\t${node.cipher}`
          )
        ].join('\n') + '\n'
      });
      files.push({
        name: 'README.txt',
        data: [
          `${BRAND_NAME} — ${files.length} OpenVPN profile(s)`,
          '',
          'هر سرور در سه پروفایل تنظیم شده ارائه می‌شود (balanced / mtu-safe / mobile).',
          'اگر یکی وصل نشد، پروفایل بعدی همان کشور را امتحان کنید.',
          'Import into OpenVPN Connect / AmneziaVPN / OpenVPN GUI.',
          'Username/password for public VPNGate servers: vpn / vpn',
          '',
          `profiles: ${ovpnNodes.length} servers x ${chosenTuning.length} tuning presets`
        ].join('\n')
      });
      return new Response(buildZip(files), {
        status: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="miliconfig-openvpn.zip"',
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    const first = ovpnNodes[0];
    const firstTuning = resolveOvpnTuningPresets(cfg.ovpnTuning)[0];
    const body = [
      `# ${BRAND_NAME} OpenVPN - ${first.country || 'ML'} (${first.server}:${first.port}/${first.proto})`,
      `# ${ovpnNodes.length} سرور در این ساب‌لینک موجود است؛ برای بستهٔ کامل ?format=zip`,
      `# tuning: ${firstTuning.id}`,
      buildOvpnVariant(first.profile, first, firstTuning, String(userOrConfig?.uuid || cfg.wk || BRAND_NAME))
    ].join('\n');
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-openvpn-profile; charset=utf-8',
        'Content-Disposition': 'attachment; filename="miliconfig-openvpn.ovpn"',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const isJkTarget = ['vg', 'jk', 'jiakuan'].includes(target);
  if (isJkTarget && cfg.jk !== 'yes') {
    return new Response('زنجیره اینترنت خانگی فعال نیست. در پنل مدیریت miliconfig گزینه «فعال‌سازی زنجیره اینترنت خانگی (jk)» را روشن کنید.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const queryOverrides = {
    wk: url.searchParams.get('wk') || '',
    proto: url.searchParams.get('proto') || '',
    country: url.searchParams.get('country') || '',
    verify: url.searchParams.get('verify') || '',
    set: url.searchParams.get('set') || '',
    nowarp: url.searchParams.get('nowarp') || '',
    env,
    waitUntil: ctx && typeof ctx.waitUntil === 'function' ? ctx.waitUntil.bind(ctx) : null,
    scope: url.searchParams.get('scope') || userOrConfig?.nodeScope || 'all',
    limit: url.searchParams.get('limit') !== null ? url.searchParams.get('limit') : undefined
  };

  // تنظیمات کلی پنل برای فهرست دامنه‌های SNI/Host (تنظیم نصب، نه تنظیم کاربر)
  if (env && !queryOverrides.globalCfg) {
    try {
      queryOverrides.globalCfg = await loadGlobalConfig(env);
    } catch (_e) {}
  }

  const finalLinks = await generateUserNodesList(userOrConfig, workerHost, queryOverrides);

  let bodyContent = '';
  let contentType = 'text/plain; charset=utf-8';

  switch (target) {
    case 'clash':
    case 'clashr':
    case 'stash':
    case 'meta':
    case 'clashmeta': {
      // نودهای OpenVPN (پروفایل‌های زندهٔ VPNGate) فقط در خروجی Clash/Mihomo قابل استفاده‌اند.
      // در حالت آی‌پی ثابت، OpenVPN اضافه نمی‌شود چون آدرس/کشور خروجی آن قابل پین نیست.
      // MASQUE هم در ساب/ZIP مستقل /warp/masque ارائه می‌شود و در ساب اصلی نیست.
      const ovpnNodes = cfg.ipMode === 'fixed' ? [] : await fetchOpenVpnNodes(cfg);
      bodyContent = generateClashConfig(finalLinks, { ...cfg, ovpnNodes, masqueNodes: [] });
      contentType = 'text/yaml; charset=utf-8';
      break;
    }
    case 'vg':
    case 'jk':
    case 'jiakuan':
      try {
        bodyContent = await generateResidentialChainConfig(finalLinks, {
          ...cfg,
          subNodeCount: userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0
        });
        contentType = 'text/yaml; charset=utf-8';
      } catch (err) {
        return new Response('گره‌های اینترنت خانگی موقتاً در دسترس نیستند: ' + (err?.message || err), {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
        });
      }
      break;
    case 'singbox':
    case 'sing-box':
      bodyContent = generateSingboxConfig(finalLinks, cfg);
      contentType = 'application/json; charset=utf-8';
      break;
    case 'surge':
    case 'surge2':
    case 'surge3':
    case 'surge4':
      bodyContent = generateSurgeConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'quantumult':
    case 'quanx':
      bodyContent = generateQuanxConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'loon':
      bodyContent = generateLoonConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'raw':
    case 'plain':
      bodyContent = finalLinks.join('\n');
      contentType = 'text/plain; charset=utf-8';
      break;
    default:
      bodyContent = btoa(finalLinks.join('\n'));
      contentType = 'text/plain; charset=utf-8';
      break;
  }

  const totalBytes = userOrConfig?.dataLimitGb > 0 ? Math.floor(userOrConfig.dataLimitGb * 1073741824) : 0;
  const usedBytes = Number(userOrConfig?.usedBytes || 0);
  const expireSec = userOrConfig?.expireAt > 0 ? Math.floor(userOrConfig.expireAt / 1000) : 0;
  const profileTitle = userOrConfig?.username ? `${BRAND_NAME} - ${userOrConfig.username}` : BRAND_NAME;

  const headers = {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Profile-Title': `base64:${encodeBase64Utf8(profileTitle)}`,
    'Profile-Update-Interval': '12',
    'Subscription-Userinfo': `upload=0; download=${usedBytes}; total=${totalBytes}; expire=${expireSec}`
  };

  if (cfg.ech === 'yes') {
    headers['X-ECH-Status'] = 'ENABLED';
  }

  return new Response(bodyContent, { headers });
}
