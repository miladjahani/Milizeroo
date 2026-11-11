// ============================================================================
// miliconfig v3.9.2 - ابزارهای هسته، رمزنگاری امن (WebCrypto + Pure-JS Fallback)،
// محافظت در برابر Timing Attack، مسدودسازی SSRF و مخفی‌سازی SNI دامنه Pages در ایران
// ============================================================================

const base64TextDecoder = new TextDecoder();
export const sharedDecoder = new TextDecoder();

// دسترسی ایمن به WebCrypto در تمام محیط‌ها (Cloudflare Workers/Pages و Node.js 18+)
export function getSafeCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) return globalThis.crypto;
  if (typeof crypto !== 'undefined') return crypto;
  return null;
}

export function getRandomBytesSafe(size = 16) {
  const bytes = new Uint8Array(size);
  const c = getSafeCrypto();
  if (c && typeof c.getRandomValues === 'function') {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < size; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

// مقایسهٔ زمان‌ثابت (Constant-Time) برای جلوگیری از Timing Attacks روی رمزها و توکن‌ها
export function timingSafeEqualStr(a = '', b = '') {
  const strA = String(a || '');
  const strB = String(b || '');
  const enc = new TextEncoder();
  const bufA = enc.encode(strA);
  const bufB = enc.encode(strB);
  const len = Math.max(bufA.length, bufB.length);
  let diff = bufA.length ^ bufB.length;
  for (let i = 0; i < len; i++) {
    diff |= (bufA[i] || 0) ^ (bufB[i] || 0);
  }
  return diff === 0;
}

// محافظت HTML برای جلوگیری کامل از XSS در پنل و صفحه وضعیت
export function escapeHtml(str = '') {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// بررسی آدرس‌های خصوصی/داخلی برای جلوگیری از SSRF و سوءاستفاده از شبکه ورکر
export function isPrivateOrReservedTarget(host = '') {
  const clean = String(host || '').trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (!clean) return true;
  if (clean === 'localhost' || clean.endsWith('.local') || clean.endsWith('.internal') || clean.endsWith('.arpa')) return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(clean)) {
    const parts = clean.split('.').map(Number);
    if (parts.some(p => p < 0 || p > 255)) return true;
    const [a, b] = parts;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 198 && (b === 18 || b === 19)) return true;
    if (a >= 224) return true;
    return false;
  }
  if (clean.includes(':')) {
    if (clean === '::' || clean === '::1') return true;
    if (/^(fe80|fc00|fd00|ff00):/i.test(clean)) return true;
    if (clean.startsWith('::ffff:')) {
      return isPrivateOrReservedTarget(clean.slice(7));
    }
  }
  return false;
}

// ترفند ضد فیلتر اختصاصی ایران برای دامنه‌های فیلترشده (*.pages.dev و *.workers.dev):
// تغییر تصادفی حروف بزرگ/کوچک و افزودن نقطهٔ پایانی FQDN در SNI در حالی که Host اصلی حفظ می‌شود
export function buildAntiFilterSni(host = '', seed = 0) {
  const clean = String(host || '').trim().replace(/\.+$/, '');
  if (!clean || /^\d{1,3}(\.\d{1,3}){3}$/.test(clean) || clean.includes(':')) return clean;
  const lower = clean.toLowerCase();
  const isFilteredDomain = lower.endsWith('.pages.dev') || lower.endsWith('.workers.dev');
  if (!isFilteredDomain) return clean;
  let out = '';
  let h = (Number(seed) || 1337) >>> 0;
  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    if (ch >= 'a' && ch <= 'z') {
      h = (Math.imul(h ^ ch.charCodeAt(0), 16777619) + i) >>> 0;
      out += (h & 1) === 0 ? ch.toUpperCase() : ch;
    } else {
      out += ch;
    }
  }
  if (out === lower) {
    out = lower.replace(/pages\.dev$/, 'PaGeS.dEv').replace(/workers\.dev$/, 'WoRkErS.dEv');
  }
  return out;
}

export function decodeBase64Utf8(b64) {
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return base64TextDecoder.decode(bytes);
  } catch (_e) {
    return '';
  }
}

export function encodeBase64Utf8(str) {
  try {
    const bytes = new TextEncoder().encode(String(str ?? ''));
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (_e) {
    return btoa(unescape(encodeURIComponent(String(str ?? ''))));
  }
}

export function isValidUuid(str) {
  if (!str || typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

export function generateUuidV4() {
  const c = getSafeCrypto();
  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID().toLowerCase();
  }
  const bytes = getRandomBytesSafe(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function generateShortId(prefix = 'mili') {
  const bytes = getRandomBytesSafe(3);
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}-${hex}`;
}

// اعتبارسنجی کامل IPv6 (شامل فرم فشرده مثل 2606:4700::1 و IPv4-mapped)
export function isValidIpv6Address(addr) {
  const s = String(addr || '').trim();
  if (!s.includes(':')) return false;
  if (/[^0-9a-fA-F:.]/.test(s)) return false;
  if (s.includes(':::')) return false;
  const halves = s.split('::');
  if (halves.length > 2) return false;
  const groupsOf = part => (part ? part.split(':') : []);
  const head = groupsOf(halves[0]);
  const tail = halves.length === 2 ? groupsOf(halves[1]) : [];
  const validGroup = g => /^[0-9a-fA-F]{1,4}$/.test(g) || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(g);
  if (![...head, ...tail].every(validGroup)) return false;
  const total = head.length + tail.length;
  if (halves.length === 2) return total <= 7;
  return total === 8;
}

export function isValidIpAddress(addr) {
  if (!addr || typeof addr !== 'string') return false;
  const s = addr.trim().replace(/^\[([^\]]+)\]$/, '$1');
  const v4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (v4.test(s)) return true;
  return isValidIpv6Address(s);
}

export function isValidDomain(domain) {
  if (!domain || typeof domain !== 'string') return false;
  return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(domain.trim());
}

export function normalizeNodeHost(host) {
  return String(host || '').trim().replace(/^\[([^\]]+)\]$/, '$1');
}

export function parseAddressAndPort(input) {
  const raw = String(input || '').trim();
  if (!raw) return { address: '', port: null };
  if (raw.includes('[') && raw.includes(']')) {
    const m = raw.match(/^\[([^\]]+)\](?::(\d+))?$/);
    if (m) {
      return {
        address: m[1],
        port: m[2] ? parseInt(m[2], 10) : null
      };
    }
  }
  const lastColon = raw.lastIndexOf(':');
  if (lastColon > 0) {
    const addr = raw.substring(0, lastColon);
    const portStr = raw.substring(lastColon + 1);
    const port = parseInt(portStr, 10);
    if (!addr.includes(':') && !Number.isNaN(port) && port > 0 && port <= 65535) {
      return { address: addr, port };
    }
  }
  return { address: raw, port: null };
}

// ============================================================================
// نام‌گذاری گویا برای نودهای ساب‌لینک:
// «پرچم و کد کشور · نوع نود · خانوادهٔ آدرس (IPv4/IPv6/Domain) · نشانگر پروکسی»
// به‌جای الگوی قبلی «عدد+miliconfig» تا کاربر در کلاینت بفهمد چه نودی را انتخاب
// می‌کند. نودهایی که مسیرشان پروکسی خروجی دارد با «⇄ Proxy» علامت می‌خورند.
// ============================================================================
export function countryFlag(code = '') {
  const cc = String(code || '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return '';
  return String.fromCodePoint(...[...cc].map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65));
}

// خانوادهٔ آدرس نود بر اساس شکل هاست (IPv6 / IPv4 / دامنه)
export function addressFamilyLabel(host = '') {
  const text = String(host || '').trim();
  if (!text) return '';
  if (text.includes(':')) return 'IPv6';
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(text)) return 'IPv4';
  return 'Domain';
}

const NODE_PROTO_LABELS = {
  vless: 'VLESS',
  trojan: 'Trojan',
  ss: 'SS',
  xhttp: 'xHTTP',
  warp: 'WARP',
  warp_pro: 'WARP PRO',
  warp_ml: 'WARP ML',
  wireguard: 'WARP'
};

export function buildNodeDisplayName(meta = {}) {
  const protoKey = String(meta.proto || '').trim().toLowerCase();
  const protoLabel = NODE_PROTO_LABELS[protoKey] || (protoKey ? protoKey.toUpperCase() : 'Node');
  const family = meta.family || addressFamilyLabel(meta.host);
  const cc = String(meta.cc || '').trim().toUpperCase();
  const flag = countryFlag(cc);
  const countryTag = cc ? (flag ? `${flag} ${cc}` : cc) : '🌐 CF';
  const parts = [countryTag, protoLabel];
  if (family) parts.push(family);
  if (meta.tls === false) parts.push('HTTP');
  if (meta.proxy) parts.push('⇄ Proxy');
  if (meta.mci) parts.push('MCI');
  // نسخهٔ AmneziaWG روی نودهای WARP: AWG2 / AWG3
  if (meta.awg) parts.push(`AWG${meta.awg}`);
  return parts.join(' · ');
}

// اعمال نام گویا + شمارهٔ یکتا و محدودیت تعداد نودهای ساب‌لینک کاربر
// ورودی می‌تواند شیء { link, meta } یا لینک خام باشد.
export function finalizeMiliSubscriptionLinks(entries = [], subNodeCount = 0) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const prepared = entries.map((entry, idx) => {
    const raw = typeof entry === 'string' ? entry : String(entry?.link || '');
    if (!raw) return null;
    const meta = typeof entry === 'string' ? {} : (entry.meta || {});
    const hashIdx = raw.indexOf('#');
    const base = hashIdx > -1 ? raw.substring(0, hashIdx) : raw;
    return { base, meta, idx };
  }).filter(Boolean);
  // ترتیب نهایی بر اساس خود آدرس است، نه ترتیب استخر؛ پس اگر مجموعهٔ آدرس‌ها
  // یکی باشد، شمارهٔ نود و آدرس پشت آن حتی بین دو ایزولهٔ مختلف یکی می‌ماند و
  // «پرش آی‌پی» در کلاینت دیده نمی‌شود.
  prepared.sort((a, b) => (a.base < b.base ? -1 : a.base > b.base ? 1 : a.idx - b.idx));
  const limit = parseInt(subNodeCount, 10);
  const sliced = Number.isFinite(limit) && limit > 0 ? prepared.slice(0, limit) : prepared;
  return sliced.map((item, idx) => {
    const nodeName = `${buildNodeDisplayName(item.meta)} · #${idx + 1}`;
    return `${item.base}#${encodeURIComponent(nodeName)}`;
  });
}

// ============================================================================
// Pure-JS MD5 (جهت سازگاری کامل بدون خطای ۱۱۰۱)
// ============================================================================
export async function md5Hex(text) {
  try {
    const c = getSafeCrypto();
    if (c && c.subtle && typeof c.subtle.digest === 'function') {
      const buf = await c.subtle.digest('MD5', new TextEncoder().encode(String(text)));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  return pureJsMd5(String(text));
}

function pureJsMd5(str) {
  const bytes = new TextEncoder().encode(str);
  const k = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ]);
  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];
  const origLenBits = bytes.length * 8;
  const withOne = bytes.length + 1;
  const padLen = ((56 - (withOne % 64)) + 64) % 64;
  const totalLen = withOne + padLen + 8;
  const buf = new Uint8Array(totalLen);
  buf.set(bytes);
  buf[bytes.length] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(totalLen - 8, origLenBits >>> 0, true);
  dv.setUint32(totalLen - 4, Math.floor(origLenBits / 0x100000000), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < totalLen; offset += 64) {
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      const word = dv.getUint32(offset + g * 4, true);
      F = (F + A + k[i] + word) >>> 0;
      A = D;
      D = C;
      C = B;
      const rot = (F << s[i]) | (F >>> (32 - s[i]));
      B = (B + rot) >>> 0;
    }
    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const outDv = new DataView(out.buffer);
  outDv.setUint32(0, a0, true);
  outDv.setUint32(4, b0, true);
  outDv.setUint32(8, c0, true);
  outDv.setUint32(12, d0, true);
  return Array.from(out, b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// SHA-224 (پروتکل Trojan)
// ============================================================================
function rotr32(val, bits) {
  return (val >>> bits) | (val << (32 - bits));
}

export async function sha224Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(text || ''));
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const H = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
  const msgLen = data.length;
  const bitLen = msgLen * 8;
  const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(data);
  buf[msgLen] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(paddedLen - 4, bitLen, false);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    const W = new Uint32Array(64);
    for (let i = 0; i < 16; i++) {
      W[i] = view.getUint32(chunk + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr32(W[i - 15], 7) ^ rotr32(W[i - 15], 18) ^ (W[i - 15] >>> 3);
      const s1 = rotr32(W[i - 2], 17) ^ rotr32(W[i - 2], 19) ^ (W[i - 2] >>> 10);
      W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr32(e, 6) ^ rotr32(e, 11) ^ rotr32(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
      const S0 = rotr32(a, 2) ^ rotr32(a, 13) ^ rotr32(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
  }
  const out = [];
  for (let i = 0; i < 7; i++) {
    out.push(
      ((H[i] >>> 24) & 0xff).toString(16).padStart(2, '0'),
      ((H[i] >>> 16) & 0xff).toString(16).padStart(2, '0'),
      ((H[i] >>> 8) & 0xff).toString(16).padStart(2, '0'),
      (H[i] & 0xff).toString(16).padStart(2, '0')
    );
  }
  return out.join('');
}

// ============================================================================
// SHA-256 (برای سیستم احراز هویت و هش رمز عبور مدیر)
// ============================================================================
export async function sha256Hex(text) {
  try {
    const c = getSafeCrypto();
    if (c && c.subtle && typeof c.subtle.digest === 'function') {
      const buf = await c.subtle.digest('SHA-256', new TextEncoder().encode(String(text || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  const h = await sha224Hex(String(text || ''));
  return h + h.slice(0, 8);
}

// ============================================================================
// ساخت ZIP ساده (روش store، بدون فشرده‌سازی) برای بستهٔ کانفیگ‌ها
// ورودی: [{ name: 'WARP.conf', data: 'متن' }] → Uint8Array فایل zip
// ============================================================================
const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

export function buildZip(entries = []) {
  const encoder = new TextEncoder();
  const files = (Array.isArray(entries) ? entries : [])
    .filter(entry => entry && entry.name)
    .map(entry => ({ name: String(entry.name), bytes: encoder.encode(String(entry.data ?? '')) }));
  if (!files.length) return new Uint8Array(0);

  const chunks = [];
  const central = [];
  let offset = 0;
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2)) & 0xffff;
  const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.bytes);
    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);      // version needed
    lv.setUint16(6, 0x0800, true);  // utf-8 flag
    lv.setUint16(8, 0, true);       // store
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, file.bytes.length, true);
    lv.setUint32(22, file.bytes.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    chunks.push(local, file.bytes);

    const header = new Uint8Array(46 + nameBytes.length);
    const hv = new DataView(header.buffer);
    hv.setUint32(0, 0x02014b50, true);
    hv.setUint16(4, 20, true);
    hv.setUint16(6, 20, true);
    hv.setUint16(8, 0x0800, true);
    hv.setUint16(10, 0, true);
    hv.setUint16(12, dosTime, true);
    hv.setUint16(14, dosDate, true);
    hv.setUint32(16, crc, true);
    hv.setUint32(20, file.bytes.length, true);
    hv.setUint32(24, file.bytes.length, true);
    hv.setUint16(28, nameBytes.length, true);
    hv.setUint32(42, offset, true);
    header.set(nameBytes, 46);
    central.push(header);

    offset += local.length + file.bytes.length;
  }

  const centralSize = central.reduce((sum, item) => sum + item.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  const all = [...chunks, ...central, end];
  const total = all.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let pos = 0;
  for (const part of all) { out.set(part, pos); pos += part.length; }
  return out;
}

export function formatBytes(bytes = 0) {
  const b = Number(bytes) || 0;
  if (b <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(b) / Math.log(1024)));
  const val = b / Math.pow(1024, i);
  return `${val >= 100 || i === 0 ? Math.round(val) : val.toFixed(2)} ${units[i]}`;
}
