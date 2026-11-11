// ============================================================================
// اعتبارسنجی واقعی پروکسی‌های کشوری
// به‌جای اعتماد به برچسب فایل منبع، از طریق خود پروکسی به trace کلادفلر وصل می‌شویم
// و کد کشور خروجی (loc) را می‌خوانیم. فقط پروکسی‌ای که loc آن با کشور یکی باشد
// «تأییدشده» است؛ بقیه یا مرده‌اند یا کشورشان چیز دیگری است.
// ============================================================================

const PROXY_PROBE_HOST = 'www.cloudflare.com';
const PROXY_PROBE_PATH = '/cdn-cgi/trace';
const PROXY_PROBE_TIMEOUT_MS = 2600;
const PROXY_PROBE_MAX_ACTIVE = 5; // سقف اتصال هم‌زمان خروجی در هر درخواست ورکر

let activeProbes = 0;
const probeWaiters = [];

function acquireProbeSlot() {
  if (activeProbes < PROXY_PROBE_MAX_ACTIVE) {
    activeProbes++;
    return Promise.resolve();
  }
  return new Promise(resolve => probeWaiters.push(resolve));
}

function releaseProbeSlot() {
  const next = probeWaiters.shift();
  if (next) next();
  else activeProbes = Math.max(0, activeProbes - 1);
}

function withProbeTimeout(promise, ms) {
  const wait = Math.max(120, Number(ms) || PROXY_PROBE_TIMEOUT_MS);
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('proxy probe timeout')), wait);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// خروجی: کد دوحرفی کشور یا null (مرده/نامعتبر/بدون پاسخ)
export async function probeProxyExitCountry(proxyUrl, timeoutMs = PROXY_PROBE_TIMEOUT_MS) {
  let cfg = null;
  try {
    cfg = parseOutboundProxyConfig(proxyUrl);
  } catch (_e) {
    return null;
  }
  if (!cfg) return null;

  let sock = null;
  try {
    sock = await withProbeTimeout(connectViaOutboundProxy(1, PROXY_PROBE_HOST, 80, cfg), timeoutMs);
    const writer = sock.writable.getWriter();
    const reader = sock.readable.getReader();
    try {
      const request = [
        `GET ${PROXY_PROBE_PATH} HTTP/1.1`,
        `Host: ${PROXY_PROBE_HOST}`,
        'User-Agent: curl/8.5.0',
        'Accept: */*',
        'Connection: close',
        '',
        ''
      ].join('\r\n');
      await withProbeTimeout(writer.write(new TextEncoder().encode(request)), timeoutMs);
      let acc = '';
      for (let i = 0; i < 8 && acc.length < 4096; i++) {
        const { value, done } = await withProbeTimeout(reader.read(), timeoutMs);
        if (done || !value) break;
        acc += new TextDecoder().decode(value);
        const match = /(?:^|\n)loc=([A-Z]{2})/.exec(acc);
        if (match) return match[1];
      }
      return null;
    } finally {
      try { writer.releaseLock(); } catch (_e) {}
      try { reader.releaseLock(); } catch (_e) {}
    }
  } catch (_e) {
    return null;
  } finally {
    try { sock?.close(); } catch (_e) {}
  }
}

// تست گروهی با سقف هم‌زمانی و مهلت کلی؛ به‌محض رسیدن به «need» متوقف می‌شود
export async function verifyCountryProxies(proxies = [], options = {}) {
  const list = [...new Set((Array.isArray(proxies) ? proxies : []).filter(Boolean))];
  if (list.length === 0) return [];
  const need = Math.max(1, parseInt(options.need, 10) || 4);
  const timeoutMs = Math.max(600, parseInt(options.timeoutMs, 10) || PROXY_PROBE_TIMEOUT_MS);
  const deadline = Number(options.deadline) || Date.now() + 3500;

  const verified = [];
  let cursor = 0;

  const worker = async () => {
    while (cursor < list.length && verified.length < need && Date.now() < deadline) {
      const proxy = list[cursor++];
      await acquireProbeSlot();
      try {
        const budget = Math.min(timeoutMs, deadline - Date.now());
        if (budget <= 0) break;
        const country = await probeProxyExitCountry(proxy, budget);
        if (country) verified.push({ proxy, country });
      } finally {
        releaseProbeSlot();
      }
    }
  };

  const workers = Array.from({ length: Math.min(6, list.length) }, () => worker().catch(() => {}));
  await Promise.all(workers);
  return verified;
}
