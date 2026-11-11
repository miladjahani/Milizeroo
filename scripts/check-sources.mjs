// ============================================================================
// miliconfig - بازبینی زندهٔ فیدهای اسکنر
// اجرا:  node scripts/check-sources.mjs            (همه)
//        node scripts/check-sources.mjs --country DE
//        node scripts/check-sources.mjs --kind socks5
//
// هر آدرس را می‌خواند و تعداد ورودی‌های قابل‌خواندن را گزارش می‌کند؛ برای حذف
// فیدهای ۴۰۴/خالی از src/config/sources.js استفاده می‌شود.
// ============================================================================

import { PROXY_FEED_REGISTRY } from '../src/config/sources.js';

const args = process.argv.slice(2);
const readArg = name => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : '';
};
const country = readArg('--country').toUpperCase();
const kind = readArg('--kind').toLowerCase();

// همان قالب‌هایی که اسکنر می‌خواند: host:port (آی‌پی یا دامنه)، host:port:CC،
// host:port|CC|City و خطوطی که فقط یک آی‌پی دارند (با پورت پیش‌فرض پروتکل).
const HOST_PORT = /(?:\d{1,3}(?:\.\d{1,3}){3}|[a-z0-9.-]+\.[a-z]{2,}|\[[0-9a-f:]+\]):(\d{1,5})/i;
const BARE_IP = /^\d{1,3}(?:\.\d{1,3}){3}$/;

async function audit(feed) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'miliconfig-source-check', 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return { ...feed, status: res.status, entries: 0, ms: Date.now() - started };
    const text = await res.text();
    let entries = 0;
    for (const line of text.split(/\r?\n/)) {
      const clean = line.trim();
      if (!clean) continue;
      if (HOST_PORT.test(clean) || BARE_IP.test(clean)) entries++;
    }
    return { ...feed, status: res.status, entries, bytes: text.length, ms: Date.now() - started };
  } catch (err) {
    return { ...feed, status: 0, entries: 0, ms: Date.now() - started, error: String(err?.message || err).slice(0, 40) };
  } finally {
    clearTimeout(timer);
  }
}

const feeds = PROXY_FEED_REGISTRY.filter(feed =>
  (!country || feed.country === country) && (!kind || feed.kind === kind)
);

console.log(`بازبینی ${feeds.length} فید${country ? ' کشور ' + country : ''}${kind ? ' نوع ' + kind : ''}...\n`);

const results = [];
for (let i = 0; i < feeds.length; i += 10) {
  results.push(...await Promise.all(feeds.slice(i, i + 10).map(audit)));
}

for (const item of results) {
  const mark = item.status === 200 && item.entries > 0 ? 'OK ' : 'BAD';
  const label = item.url.replace('https://raw.githubusercontent.com/', '');
  console.log(`${mark} ${String(item.status).padEnd(3)} ${String(item.entries).padStart(6)} ورودی  ${String(item.ms).padStart(5)}ms  ${label}${item.error ? '  ' + item.error : ''}`);
}

const healthy = results.filter(item => item.status === 200 && item.entries > 0).length;
const dead = results.filter(item => item.status !== 200 || item.entries === 0);
console.log(`\n${healthy}/${results.length} فید سالم.`);
if (dead.length) {
  console.log('\nفیدهای ناسالم (از src/config/sources.js حذف یا جایگزین شوند):');
  for (const item of dead) console.log(' - ' + item.url + '  [' + (item.status || item.error || 'empty') + ']');
  process.exitCode = 1;
}
