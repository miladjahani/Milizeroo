// ============================================================================
// miliconfig v3.9 — تست تأثیر تنظیمات پنجرهٔ کاربر روی نودهای تولیدشده
// اجرا: node scripts/verify-user-settings.mjs
// شبکه قطع است؛ فقط ثبت‌نام WARP با پاسخ ساختگی انجام می‌شود.
// ============================================================================

import nodeCrypto from 'node:crypto';
if (!globalThis.crypto && nodeCrypto.webcrypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}

const WARP_JSON = {
  id: 'device-test',
  config: {
    client_id: 'AAAA',
    interface: { addresses: { v4: '172.16.0.2', v6: 'fd01::2' } },
    peers: [{ public_key: 'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=', endpoint: { host: 'engage.cloudflareclient.com:2408' } }]
  }
};

const realFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  const target = String(url && url.url ? url.url : url);
  if (target.startsWith('https://api.cloudflareclient.com/')) {
    return {
      ok: true,
      status: 200,
      json: async () => WARP_JSON,
      text: async () => JSON.stringify(WARP_JSON),
      headers: new Headers()
    };
  }
  return {
    ok: false,
    status: 404,
    json: async () => ({}),
    text: async () => '',
    headers: new Headers()
  };
};

const { generateUserNodesList, parseOpenVpnList, buildOvpnVariant, resolveOvpnTuningPresets } = await import('../src/subscription/generator.js');
const { generateClashConfig, generateSingboxConfig } = await import('../src/subscription/converters.js');
const { CONFIG_DEFAULTS } = await import('../src/config/defaults.js');

const WORKER = 'panel.example.com';
const UUID = '351c9981-04b6-4103-aa4b-864aa9c01469';
const base = {
  ...CONFIG_DEFAULTS,
  ev: 'yes', et: 'no', ex: 'no', es: 'no',
  ena: 'yes', epi: 'no', epd: 'no', egi: 'no', yxby: 'yes', pd: 'no',
  sb: 'no', yx: '', yxURL: '', p: '', s: '',
  warp: 'no', warpPro: 'no', warpMl: 'no', warpMasque: 'no', ovpn: 'no',
  ipMode: 'country', ipRotation: 'off'
};

let index = 0;
async function build(cfgPatch = {}, extra = {}, workerDomain = WORKER) {
  index += 1;
  const user = { uuid: UUID, config: { ...base, ...cfgPatch } };
  const links = await generateUserNodesList(user, workerDomain, { uuid: UUID + index, ...extra });
  return links;
}

const scheme = link => String(link).split('://')[0].toLowerCase();
const parseLink = link => new URL(String(link));
const hostsOf = links => links.map(link => parseLink(link).hostname);
const results = [];
function check(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

// ۱) پروتکل‌ها
{
  const onlyVless = await build();
  const withTrojan = await build({ et: 'yes' });
  const withSs = await build({ es: 'yes' });
  const withXhttp = await build({ ex: 'yes' });
  check('پروتکل VLESS', onlyVless.every(l => scheme(l) === 'vless'), `${onlyVless.length} node`);
  check('پروتکل Trojan', withTrojan.some(l => scheme(l) === 'trojan') && !onlyVless.some(l => scheme(l) === 'trojan'));
  check('پروتکل Shadowsocks', withSs.some(l => scheme(l) === 'ss'));
  check('پروتکل xHTTP', withXhttp.some(l => scheme(l) === 'vless' && String(l).includes('type=xhttp')));
}

// ۲) پورت‌ها و مسیر/امنیت
{
  const p2053 = await build({ ports: '2053', httpPorts: '' });
  const ports = p2053.map(l => parseLink(l).port);
  check('پورت‌های نود', ports.length > 0 && ports.every(p => p === '2053'), ports.join(','));

  const tlsOnly = links => links.filter(l => parseLink(l).searchParams.get('security') === 'tls');
  const noFrag = await build({ frag: 'no', fragmentPreset: 'off' });
  const withFrag = await build({ frag: 'yes', fragmentPreset: 'mci' });
  check('فرگمنت', !noFrag.some(l => String(l).includes('fragment=')) && tlsOnly(withFrag).every(l => String(l).includes('fragment=')));

  const alpn = await build({ alpn: 'h2,http/1.1' });
  check('ALPN', tlsOnly(alpn).every(l => parseLink(l).searchParams.get('alpn') === 'h2,http/1.1'));

  const fp = await build({ fp: 'firefox' });
  check('اثر انگشت TLS', tlsOnly(fp).every(l => parseLink(l).searchParams.get('fp') === 'firefox'));

  const customFrag = await build({ frag: 'yes', fragmentPreset: 'custom', fragmentLength: '5-10', fragmentInterval: '1-2', fragmentPackets: '1-1' });
  check('فرگمنت سفارشی', tlsOnly(customFrag).every(l => parseLink(l).searchParams.get('fragment') === '5-10,1-2,1-1'));

  const path = await build({ patt: '/ws' });
  check('مسیر WebSocket', tlsOnly(path).every(l => parseLink(l).searchParams.get('path').startsWith('/ws')));

  const sni = await build({ sniHosts: 'edge.example.net' });
  check('دامنهٔ SNI/Host', tlsOnly(sni).some(l => parseLink(l).searchParams.get('sni') === 'edge.example.net'));

  const noHttp = await build({ dkby: 'yes', httpPorts: '80' });
  check('حذف پورت HTTP', noHttp.every(l => parseLink(l).protocol === 'vless:' && parseLink(l).port === '443'));
}

// ۲-ب) رمزها، ECH و آدرس واسط (ProxyIP)
{
  const tlsOnly = links => links.filter(l => parseLink(l).searchParams.get('security') === 'tls');
  const trojan = await build({ et: 'yes', tp: 'secret-tp' });
  check('رمز Trojan', tlsOnly(trojan).filter(l => scheme(l) === 'trojan').every(l => parseLink(l).username === 'secret-tp'));

  const ss = await build({ es: 'yes', ssmethod: 'aes-256-gcm', sspass: 'ss-secret' });
  const ssUser = ss.filter(l => scheme(l) === 'ss').map(l => Buffer.from(String(l).split('://')[1].split('@')[0], 'base64').toString());
  check('رمز و متد Shadowsocks', ssUser.length > 0 && ssUser.every(v => v === 'aes-256-gcm:ss-secret'), ssUser[0] || 'empty');

  const ech = await build({ ech: 'yes', customDNS: 'https://1.1.1.1/dns-query', customECHDomain: 'cloudflare-ech.com' });
  check('ECH', tlsOnly(ech).every(l => (parseLink(l).searchParams.get('ech') || '').startsWith('cloudflare-ech.com+https://')));
  check('ECH پورت HTTP را حذف می‌کند', ech.every(l => parseLink(l).port !== '80'));

  const proxyIp = await build({ p: 'ProxyIP.DE.example.com:443' });
  check('آدرس واسط ProxyIP', tlsOnly(proxyIp).every(l => (parseLink(l).searchParams.get('path') || '').includes('p=ProxyIP.DE.example.com:443')));

  const sanctions = await build({ sb: 'yes', sbRegion: 'DE', p: '' });
  check('تحریم‌شکن خودکار', tlsOnly(sanctions).every(l => (parseLink(l).searchParams.get('path') || '').includes('p=')));
}

// ۳) منطقه و آدرس دستی
{
  const manual = await build({ ena: 'no', epi: 'yes', yxby: 'no', yx: '104.16.0.9:2053#آلمان' });
  check('آدرس دستی', manual.some(l => parseLink(l).hostname === '104.16.0.9' && parseLink(l).port === '2053'));

  // منطقهٔ ذخیره‌شده باید بدون ?country هم مسیر خروج را عوض کند.
  const region = await build({ region: 'DE', sb: 'no', ena: 'yes', epi: 'no', epd: 'no', egi: 'no', yxby: 'yes', yx: '', p: '' });
  check('منطقهٔ خروجی روی نودها', region.some(l => String(parseLink(l).searchParams.get('path') || '').includes('p=ProxyIP.DE.CMLiussss.net:443')));
}

// ۳-ب) ضد فیلتر خودکار برای دامنهٔ فیلترشدهٔ Cloudflare Pages (*.pages.dev) در ایران
{
  const pagesLinks = await build(
    { ena: 'yes', pd: 'yes', pdCount: 3, epi: 'no', epd: 'no', egi: 'no', frag: 'yes', fragmentPreset: 'off' },
    {},
    'my-panel.pages.dev'
  );
  const pagesHosts = hostsOf(pagesLinks);
  const pagesTls = pagesLinks.filter(l => parseLink(l).searchParams.get('security') === 'tls');
  check(
    'ضد فیلتر Pages.dev — جایگزینی خودکار آدرس اتصال فیلترشده با آی‌پی تمیز Anycast',
    pagesHosts.length > 0 && pagesHosts.every(h => !h.endsWith('.pages.dev')),
    pagesHosts.join(',')
  );
  check(
    'ضد فیلتر Pages.dev — اعمال Mixed-Case SNI و فرگمنت اجباری TLS',
    pagesTls.length > 0 &&
      pagesTls.every(l => {
        const u = parseLink(l);
        const sniVal = u.searchParams.get('sni') || '';
        const fragVal = u.searchParams.get('fragment') || '';
        return sniVal.toLowerCase() === 'my-panel.pages.dev' && sniVal !== 'my-panel.pages.dev' && fragVal.length > 0;
      }),
    pagesTls[0] ? `${parseLink(pagesTls[0]).searchParams.get('sni')} / frag=${parseLink(pagesTls[0]).searchParams.get('fragment')}` : ''
  );
  const sbJson = JSON.parse(generateSingboxConfig(pagesTls));
  const sbVless = sbJson.outbounds.find(o => o.type === 'vless');
  check(
    'ضد فیلتر Pages.dev در Sing-box/Hiddify — فعال‌سازی tls.fragment و record_fragment',
    Boolean(sbVless && sbVless.tls && sbVless.tls.fragment === true && sbVless.tls.record_fragment === true)
  );
}

// ۴) آی‌پی ثابت
{
  const fixed1 = await build({ ipMode: 'fixed', ev: 'yes', et: 'yes', ex: 'yes', es: 'yes' });
  const fixed2 = await build({ ipMode: 'fixed', ev: 'yes', et: 'yes', ex: 'yes', es: 'yes' });
  const hosts1 = hostsOf(fixed1.filter(l => scheme(l) !== 'wireguard'));
  const hosts2 = hostsOf(fixed2.filter(l => scheme(l) !== 'wireguard'));
  check('آی‌پی ثابت — یک آدرس برای همهٔ نودها', hosts1.length > 0 && new Set(hosts1).size === 1, hosts1[0] || 'empty');
  check('آی‌پی ثابت — پایدار بین دو تولید', hosts1.join(',') === hosts2.join(','));
  check('آی‌پی ثابت — بدون نود WARP ناهمگون', fixed1.every(l => scheme(l) !== 'wireguard'));
  const pinned = await build({ ipMode: 'fixed', ipPinned: '104.17.0.7:8443' });
  check('آی‌پی ثابت سفارشی', pinned.every(l => parseLink(l).hostname === '104.17.0.7' && parseLink(l).port === '8443'));
  const countryHosts = hostsOf(await build());
  check('حالت کشور ثابت (پیش‌فرض) دست‌نخورده', countryHosts.length > 0 && new Set(countryHosts).size >= 1);
}

// ۵) WARP
{
  const warp = await build({ warp: 'yes', warpMtu: '1240', warpDns: 'both', awgv: '3', warpObf: 'off' });
  const wg = warp.filter(l => scheme(l) === 'wireguard');
  check('WARP ساخته می‌شود', wg.length >= 1, `${wg.length} node`);
  check('WARP MTU', wg.every(l => parseLink(l).searchParams.get('mtu') === '1240'));
  check('WARP DNS', wg.every(l => parseLink(l).searchParams.get('dns') === '1.1.1.1,1.0.0.1'));
  check('WARP نسخهٔ AmneziaWG', wg.every(l => parseLink(l).searchParams.get('awg') === '3'));

  const obfAll = (await build({ warp: 'yes', warpObf: 'all' })).filter(l => scheme(l) === 'wireguard');
  const obfOne = (await build({ warp: 'yes', warpObf: 'stealth' })).filter(l => scheme(l) === 'wireguard');
  const obfOff = (await build({ warp: 'yes', warpObf: 'off' })).filter(l => scheme(l) === 'wireguard');
  check('WARP پروفایل مبهم‌سازی', obfAll.length === obfOff.length + 4 && obfOne.length === obfOff.length + 1, `${obfOff.length}/${obfOne.length}/${obfAll.length}`);

  const pro = (await build({ warp: 'no', warpPro: 'yes', warpObf: 'off' })).filter(l => scheme(l) === 'wireguard');
  check('WARP PRO مستقل از WARP', pro.length === 1 && decodeURIComponent(String(pro[0]).split('#')[1]).includes('PRO'), decodeURIComponent(String(pro[0] || '').split('#')[1] || ''));

  const warpOff = (await build({ warp: 'no', warpPro: 'no', warpMl: 'no' })).filter(l => scheme(l) === 'wireguard');
  check('خاموش‌کردن کامل WARP', warpOff.length === 0);

  const ml = (await build({ warp: 'no', warpMl: 'yes', warpCount: 3, warpObf: 'off', warpFamily: 'domain' })).filter(l => scheme(l) === 'wireguard');
  check('WARP چندلوکیشن — تعداد', ml.length === 3, `${ml.length}`);
  check('WARP چندلوکیشن — خانوادهٔ دامنه', ml.every(l => parseLink(l).hostname === 'engage.cloudflareclient.com'));

  const mlV4 = (await build({ warp: 'no', warpMl: 'yes', warpCount: 2, warpObf: 'off', warpFamily: 'v4' })).filter(l => scheme(l) === 'wireguard');
  const mlV6 = (await build({ warp: 'no', warpMl: 'yes', warpCount: 2, warpObf: 'off', warpFamily: 'v6' })).filter(l => scheme(l) === 'wireguard');
  check('WARP چندلوکیشن — فقط IPv4', mlV4.length === 2 && mlV4.every(l => /^\d+\.\d+\.\d+\.\d+$/.test(parseLink(l).hostname)), mlV4.map(l => parseLink(l).hostname).join(','));
  check('WARP چندلوکیشن — فقط IPv6', mlV6.length === 2 && mlV6.every(l => parseLink(l).hostname.includes(':')), mlV6.map(l => parseLink(l).hostname).join(','));
}

// ۵-ب) گزینه‌های سطح کلاینت (DoH / TCP / UDP) در خروجی Clash
{
  const links = await build();
  const on = generateClashConfig(links, { doh: 'yes', tcp: 'yes', udp: 'yes', customDNS: 'https://1.1.1.1/dns-query' });
  const off = generateClashConfig(links, { doh: 'no', tcp: 'no', udp: 'no', customDNS: 'https://1.1.1.1/dns-query' });
  check('کلاینت: DoH / TCP / UDP', on.includes('tcp-concurrent: true') && off.includes('tcp-concurrent: false') && off.includes('udp: false') && on.includes('udp: true'));
}

// ۶) OpenVPN — پارس، فیلتر کشور/پروتکل، پروفایل‌های تنظیم
{
  const profile = [
    'client',
    'proto udp',
    'remote 1.2.3.4 1194',
    '<ca>',
    'CA',
    '</ca>',
    ''
  ].join('\n');
  const b64 = Buffer.from(profile, 'utf8').toString('base64');
  const cols = ['server01', '1.2.3.4', '1194', 'udp', 'DE', '', 'DE', '', '', '', '', '', '', '', b64];
  const csv = cols.join(',');

  const all = parseOpenVpnList(csv, { ovpn: 'yes', ovpnCount: 4 });
  const udp = parseOpenVpnList(csv, { ovpn: 'yes', ovpnCount: 4, ovpnProto: 'udp' });
  const tcp = parseOpenVpnList(csv, { ovpn: 'yes', ovpnCount: 4, ovpnProto: 'tcp' });
  const wrongCountry = parseOpenVpnList(csv, { ovpn: 'yes', ovpnCount: 4, ovpnCountries: 'NL' });
  check('OpenVPN پارس پروفایل', all.length === 1 && all[0].proto === 'udp');
  check('OpenVPN فیلتر UDP/TCP', udp.length === 1 && tcp.length === 0);
  check('OpenVPN فیلتر کشور', wrongCountry.length === 0);

  const variants = [
    { id: 'balanced', mtu: 1400, dns: '1.1.1.1' },
    { id: 'mobile', mtu: 1240, dns: '1.0.0.1' }
  ].map(preset => buildOvpnVariant(profile, { server: '1.2.3.4', port: 1194 }, preset, 'seed'));
  check('OpenVPN پروفایل تنظیم', variants[0].includes('tun-mtu ') && variants[0] !== variants[1]);
  check('OpenVPN انتخاب پروفایل تنظیم', resolveOvpnTuningPresets('mobile').length === 1 && resolveOvpnTuningPresets('mobile')[0].id === 'mobile' && resolveOvpnTuningPresets('all').length === 3);

  const allTuning = resolveOvpnTuningPresets('all').map(preset => buildOvpnVariant(profile, { server: '1.2.3.4', port: 1194 }, preset, 'seed'));
  check('OpenVPN هر سه پروفایل خروجی', allTuning.length === 3 && new Set(allTuning).size === 3);
}

const failed = results.filter(r => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} PASS`);
globalThis.fetch = realFetch;
if (failed.length) process.exitCode = 1;
