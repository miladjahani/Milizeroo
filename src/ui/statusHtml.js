// ============================================================================
// miliconfig v3.3 - پورتال وضعیت و اشتراک اختصاصی کاربر
// طراحی تم‌پذیر با هدر سه‌بعدی، تب‌های فشرده و کارت‌های تعاملی
// ============================================================================

import {
  BRAND_NAME,
  BRAND_UPPER,
  CF_EDGE_DOMAINS,
  COUNTRY_PROXY_SOURCES,
  isEnabledValue,
  normalizeEffectiveConfig
} from '../config/defaults.js';
import { FAVICON_DATA_URI, SHIELD_LOGO_SVG, icon, stripEmoji } from './icons.js';
import { formatBytes, escapeHtml } from '../core/utils.js';

export function renderUserStatusPageHtml(user, nodes = [], originUrl = '') {
  const urlObj = new URL(originUrl || 'https://miliconfig.workers.dev');
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
  // همیشه از مسیر استاندارد /sub/{uuid} استفاده می‌شود تا لینک‌ها دقیقاً
  // به ساب‌لینک همین کاربر متصل باشند (نه مسیر شخصی/ادمین).
  const apiToken = user.id || user.uuid || '';
  const subToken = user.uuid || user.id || '';
  const baseSubUrl = `${baseUrl}/sub/${encodeURIComponent(subToken)}`;
  const usageApiUrl = `${baseUrl}/api/status/${encodeURIComponent(apiToken)}`;
  const statusUrl = `${baseUrl}/status/${encodeURIComponent(apiToken)}`;
  const totalNodes = nodes.length;

  const usedBytes = Number(user.usedBytes || 0);
  const limitGb = Number(user.dataLimitGb || 0);
  const limitBytes = limitGb > 0 ? limitGb * 1073741824 : 0;
  const usagePercent = limitBytes > 0 ? Math.min(100, Math.round((usedBytes / limitBytes) * 100)) : 0;

  let expireLabel = 'بدون انقضا';
  if (user.expireAt > 0) {
    const diffDays = Math.ceil((user.expireAt - Date.now()) / 86400000);
    expireLabel = diffDays > 0 ? `${diffDays} روز باقی‌مانده` : 'منقضی شده';
  } else if (user.startOnFirstUse && user.expireDays > 0) {
    expireLabel = `${user.expireDays} روز (شروع با اولین اتصال)`;
  }

  // لوکیشن‌های واقعی اسکنر: هر کشور لینک ساب‌لینک کشوری خودش را می‌گیرد
  const locationsList = Object.keys(COUNTRY_PROXY_SOURCES).map(code => ({
    code,
    title: COUNTRY_PROXY_SOURCES[code].name || code,
    url: `${baseSubUrl}?country=${code}`
  }));
  locationsList.unshift({ code: 'MULTI', title: 'چند کشور (MULTI)', url: `${baseSubUrl}?country=MULTI` });

  // لینک‌های این صفحه باید دقیقاً با تنظیمات همین کاربر هماهنگ باشند:
  // فقط پروتکل‌ها و بخش‌هایی که در پنل برای او روشن است نمایش داده می‌شوند.
  const userCfg = normalizeEffectiveConfig(user.config || {});
  const warpEnabled = isEnabledValue(userCfg.warp, true) || isEnabledValue(userCfg.warpPro, false);
  const ovpnEnabled = isEnabledValue(userCfg.ovpn, true);

  const protoCombos = [
    { title: 'اتصال هوشمند (همه نودها × همه پروتکل‌ها)', badge: 'Base64', url: baseSubUrl }
  ];
  if (isEnabledValue(userCfg.ev, true)) {
    protoCombos.push({ title: 'فقط پروتکل VLESS (WebSocket + TLS)', badge: 'VLESS', url: `${baseSubUrl}?proto=vless` });
  }
  if (isEnabledValue(userCfg.et, true)) {
    protoCombos.push({ title: 'فقط پروتکل Trojan (WebSocket + TLS)', badge: 'Trojan', url: `${baseSubUrl}?proto=trojan` });
  }
  if (isEnabledValue(userCfg.es, true)) {
    protoCombos.push({ title: 'فقط پروتکل Shadowsocks (بدون فرگمنت)', badge: 'SS', url: `${baseSubUrl}?proto=ss` });
  }
  if (isEnabledValue(userCfg.ex, true)) {
    protoCombos.push({ title: 'فقط پروتکل xhttp (ضد فیلتر پیشرفته)', badge: 'xhttp', url: `${baseSubUrl}?proto=xhttp` });
  }
  if (isEnabledValue(userCfg.epd, true)) {
    protoCombos.push({ title: 'ساب‌لینک اختصاصی دامنه‌های کلادفلر (بدون آی‌پی)', badge: 'Domains', url: `${baseSubUrl}?set=domain` });
  }
  if (isEnabledValue(userCfg.ipv6, true)) {
    protoCombos.push({ title: 'ساب اختصاصی IPv6 — همراه اول', badge: 'IPv6', url: `${baseSubUrl}?set=ipv6` });
  }
  if (warpEnabled) {
    protoCombos.push({ title: 'فقط نودهای WARP / WARP PRO / چندلوکیشن', badge: 'WARP', url: `${baseSubUrl}?proto=warp` });
  }
  if (ovpnEnabled) {
    protoCombos.push({ title: 'پروفایل OpenVPN (خروجی .ovpn)', badge: 'OVPN', url: `${baseSubUrl}?target=ovpn` });
    protoCombos.push({ title: 'بستهٔ کامل OpenVPN (ZIP چندفایلی)', badge: 'OVPN-ZIP', url: `${baseSubUrl}?target=ovpn&format=zip` });
  }
  protoCombos.push(
    { title: 'فقط نودهای لبه CDN (Multi-Location)', badge: 'Edge', url: `${baseSubUrl}?scope=edge` },
    { title: 'فقط سرور اصلی (بدون CDN)', badge: 'Origin', url: `${baseSubUrl}?scope=origin` },
    { title: 'کانفیگ اختصاصی Clash Meta / Mihomo', badge: 'YAML', url: `${baseSubUrl}?target=clash` },
    { title: 'کانفیگ اختصاصی Sing-box / Hiddify', badge: 'JSON', url: `${baseSubUrl}?target=singbox` },
    { title: 'کانفیگ اختصاصی Surge', badge: 'INI', url: `${baseSubUrl}?target=surge` },
    { title: 'کانفیگ اختصاصی Quantumult X', badge: 'QuanX', url: `${baseSubUrl}?target=quanx` },
    { title: 'کانفیگ اختصاصی Loon', badge: 'Loon', url: `${baseSubUrl}?target=loon` },
    { title: 'متن خام لینک‌ها (Raw Plaintext)', badge: 'RAW', url: `${baseSubUrl}?target=raw` }
  );

  const scopeLinks = [
    { title: 'همه نودهای من', desc: 'ساب‌لینک اصلی با همه نودها', badge: 'All', url: baseSubUrl },
    { title: 'فقط لبهٔ CDN', desc: 'نودهای Multi-Location', badge: 'Edge', url: `${baseSubUrl}?scope=edge` },
    { title: 'فقط سرور اصلی', desc: 'بدون نودهای CDN', badge: 'Origin', url: `${baseSubUrl}?scope=origin` },
    { title: 'دامنه‌های کلادفلر', desc: `${CF_EDGE_DOMAINS.length} دامنهٔ تأییدشده`, badge: 'Domain', url: `${baseSubUrl}?set=domain` }
  ];

  const downloadLinks = [];
  if (warpEnabled) {
    downloadLinks.push(
      { title: 'ZIP کامل WARP', sub: 'AmneziaWG · WireGuard · Clash · sing-box', icon: 'zip', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=zip` },
      { title: 'WARP.conf', sub: 'فایل خام WireGuard', icon: 'download', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=conf` },
      { title: 'پروفایل Clash', sub: 'Mihomo / Clash Meta', icon: 'layers', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=clash` },
      { title: 'کانفیگ sing-box', sub: 'Hiddify / sing-box', icon: 'api', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=singbox` },
      { title: 'لینک‌های WireGuard', sub: 'NekoBox / Hiddify', icon: 'link', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=links` },
      { title: 'ZIP جداگانهٔ MASQUE', sub: 'HTTP/3 · WARP MASQUE', icon: 'zip', url: `${baseUrl}/warp/masque/${encodeURIComponent(subToken)}?format=zip` }
    );
  }
  if (ovpnEnabled) {
    downloadLinks.push({ title: 'ZIP پروفایل‌های OpenVPN', sub: 'همهٔ سرورها · همهٔ تنظیم‌ها', icon: 'zip', url: `${baseSubUrl}?target=ovpn&format=zip` });
  }

  const quickAccess = [
    { title: 'Clash / Mihomo', sub: 'YAML آماده', icon: 'layers', badge: 'YAML', url: `${baseSubUrl}?target=clash` },
    { title: 'Sing-box / Hiddify', sub: 'JSON سبک', icon: 'api', badge: 'JSON', url: `${baseSubUrl}?target=singbox` },
    { title: 'وب‌پروکسی تلگرام', sub: 'مشاهده کانال‌ها و ساخت MTProto', icon: 'telegram', badge: 'WEB', url: `${baseUrl}/webproxy` },
    { title: 'پروکسی تلگرام', sub: 'لینک‌های Fake-TLS و SOCKS5', icon: 'link', badge: 'TG', url: `${baseUrl}/tg?format=links` }
  ];
  if (warpEnabled) {
    quickAccess.push({ title: 'WARP کامل', sub: 'همهٔ فرمت‌ها در یک ZIP', icon: 'warp', badge: 'ZIP', url: `${baseUrl}/warp/${encodeURIComponent(subToken)}?format=zip` });
  }
  if (ovpnEnabled) {
    quickAccess.push({ title: 'OpenVPN', sub: 'پروفایل‌های .ovpn', icon: 'shield', badge: 'ZIP', url: `${baseSubUrl}?target=ovpn&format=zip` });
  }

  const clientGroups = [
    {
      id: 'quick',
      title: 'شروع سریع',
      icon: 'bolt',
      accent: 'neon',
      clients: [
        { name: 'اتصال هوشمند', os: 'همه پلتفرم‌ها', badge: 'Base64', mark: 'IQ', url: baseSubUrl, note: 'سریع‌ترین نود بر اساس پینگ واقعی' }
      ]
    },
    {
      id: 'xray',
      title: 'Xray / Base64',
      icon: 'layers',
      accent: 'neon',
      clients: [
        { name: 'v2rayNG', os: 'Android', badge: 'Base64', mark: 'v2', url: baseSubUrl, download: 'https://github.com/2dust/v2rayNG/releases' },
        { name: 'Exclusive', os: 'Android', badge: 'Base64', mark: 'EX', url: baseSubUrl, download: 'https://github.com/GFW-knocker/MahsaNG/releases' },
        { name: 'Amnezia VPN', os: 'Android · iOS · دسکتاپ', badge: 'Base64', mark: 'AM', url: baseSubUrl, download: 'https://amnezia.org/en/downloads' },
        { name: 'Streisand', os: 'iOS · macOS', badge: 'Base64', mark: 'ST', url: baseSubUrl, download: 'https://apps.apple.com/app/streisand/id6450534064' },
        { name: 'Shadowrocket', os: 'iOS', badge: 'Base64', mark: 'SR', url: baseSubUrl, download: 'https://apps.apple.com/app/shadowrocket/id932747118' },
        { name: 'V2Box', os: 'Android · iOS', badge: 'Base64', mark: 'VB', url: baseSubUrl, download: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690' },
        { name: 'v2rayN / Nekoray', os: 'Windows · Linux · macOS', badge: 'Base64', mark: 'vN', url: baseSubUrl, download: 'https://github.com/2dust/v2rayN/releases' }
      ]
    },
    {
      id: 'singbox',
      title: 'sing-box',
      icon: 'api',
      accent: 'info',
      clients: [
        { name: 'Hiddify / Sing-box', os: 'همه پلتفرم‌ها', badge: 'JSON', mark: 'SB', url: `${baseSubUrl}?target=singbox`, download: 'https://github.com/hiddify/hiddify-app/releases' }
      ]
    },
    {
      id: 'clash',
      title: 'Clash / Mihomo',
      icon: 'layers',
      accent: 'warn',
      clients: [
        { name: 'Clash Meta / Verge / FlClash', os: 'Android · Windows · macOS', badge: 'YAML', mark: 'CM', url: `${baseSubUrl}?target=clash`, download: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases' },
        ...(user.config?.jk === 'yes'
          ? [{ name: 'CLASH زنجیرهٔ اینترنت خانگی', os: 'Mihomo 1.19.25+', badge: 'Residential', mark: 'HG', url: `${baseSubUrl}?target=vg` }]
          : [])
      ]
    },
    {
      id: 'tools',
      title: 'هسته‌ها و ابزارها',
      icon: 'terminal',
      accent: 'violet',
      clients: [
        { name: 'Surge', os: 'iOS · macOS', badge: 'INI', mark: 'SG', url: `${baseSubUrl}?target=surge` },
        { name: 'Quantumult X', os: 'iOS', badge: 'QuanX', mark: 'QX', url: `${baseSubUrl}?target=quanx` },
        { name: 'Loon', os: 'iOS', badge: 'Loon', mark: 'LN', url: `${baseSubUrl}?target=loon` }
      ]
    }
  ];

  const safeNodesJson = JSON.stringify(nodes).replace(/</g, '\\u003c');
  const safeUsername = escapeHtml(user.username || 'کاربر');
  const statusLabel = user.enabled
    ? (user.startOnFirstUse && !user.firstConnectedAt ? 'شروع با اولین اتصال' : 'فعال و آنلاین')
    : 'غیرفعال';

  return stripEmoji(`<!DOCTYPE html>
<html lang="fa" dir="rtl" data-theme="neon">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark light">
  <title>وضعیت اشتراک ${safeUsername} — ${BRAND_UPPER}</title>
  <link rel="icon" href="${FAVICON_DATA_URI}">
  <script>
    // تم پنل مدیریت اگر در همین مرورگر ذخیره شده باشد، همین‌جا هم اعمال می‌شود.
    (function () {
      try {
        var skins = ['zedsecure', 'aurora', 'neon', 'tokyo', 'solar', 'ember', 'moss', 'clay', 'emerald', 'cyan', 'violet', 'amber', 'rose'];
        var skin = localStorage.getItem('mili_skin') || 'neon';
        var light = localStorage.getItem('mili_theme') === 'light';
        if (skins.indexOf(skin) < 0) skin = 'neon';
        document.documentElement.setAttribute('data-theme', light ? 'light' : skin);
        if (light) document.documentElement.classList.add('light-mode');
      } catch (e) {}
    })();
  </script>
  <style>
    :root {
      --bg: #05080a;
      --bg-soft: #070c0e;
      --panel: rgba(9, 15, 13, 0.92);
      --panel-2: rgba(12, 20, 16, 0.9);
      --line: rgba(181, 255, 77, 0.14);
      --line-strong: rgba(181, 255, 77, 0.38);
      --neon: #b5ff4d;
      --neon-rgb: 181, 255, 77;
      --info: #63e6d4;
      --info-rgb: 99, 230, 212;
      --warn: #ffce5c;
      --danger: #ff6262;
      --text: #e9f3e2;
      --muted: #85957f;
      --muted-2: #5d6b59;
      --shadow: 0 28px 70px rgba(0, 0, 0, 0.52);
      --radius: 20px;
      --btn-radius: 12px;
      --font: "Vazirmatn", "Segoe UI", Tahoma, system-ui, sans-serif;
      --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
      color-scheme: dark;
    }
    ::-webkit-scrollbar { width: 9px; height: 9px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--neon); border-radius: var(--btn-radius); }
    html[data-theme="zedsecure"] {
      --bg: #0c0914; --bg-soft: #130e21;
      --panel: rgba(24, 19, 38, 0.94); --panel-2: rgba(31, 25, 49, 0.92);
      --line: rgba(208, 188, 255, 0.16); --line-strong: rgba(208, 188, 255, 0.44);
      --neon: #d0bcff; --neon-rgb: 208, 188, 255;
      --info: #f48fb1; --info-rgb: 244, 143, 177;
      --text: #f4effa; --muted: #a99eb8; --muted-2: #766b85;
      --radius: 28px; --btn-radius: 999px;
    }
    html[data-theme="aurora"] {
      --bg: #000000; --bg-soft: #040b09;
      --panel: rgba(7, 17, 15, 0.96); --panel-2: rgba(10, 24, 21, 0.94);
      --line: rgba(45, 212, 191, 0.18); --line-strong: rgba(45, 212, 191, 0.46);
      --neon: #2dd4bf; --neon-rgb: 45, 212, 191;
      --info: #818cf8; --info-rgb: 129, 140, 248;
      --text: #ecfdf5; --muted: #82a89e; --muted-2: #52736a;
      --radius: 24px; --btn-radius: 16px;
    }
    html[data-theme="tokyo"] {
      --bg: #070913; --bg-soft: #0c1021;
      --panel: rgba(14, 19, 38, 0.94); --panel-2: rgba(19, 26, 51, 0.92);
      --line: rgba(122, 162, 247, 0.18); --line-strong: rgba(122, 162, 247, 0.46);
      --neon: #7aa2f7; --neon-rgb: 122, 162, 247;
      --info: #bb9af7; --info-rgb: 187, 154, 247;
      --text: #e6eefc; --muted: #8b9bb8; --muted-2: #5d6c89;
      --radius: 14px; --btn-radius: 10px;
    }
    html[data-theme="solar"] {
      --bg: #0c0902; --bg-soft: #171104;
      --panel: rgba(26, 20, 6, 0.94); --panel-2: rgba(36, 27, 8, 0.92);
      --line: rgba(250, 204, 21, 0.18); --line-strong: rgba(250, 204, 21, 0.45);
      --neon: #facc15; --neon-rgb: 250, 204, 21;
      --info: #fb923c; --info-rgb: 251, 146, 60;
      --text: #fef9c3; --muted: #b8a978; --muted-2: #85774a;
      --radius: 26px; --btn-radius: 999px;
    }
    html[data-theme="ember"] {
      --bg: #0d0603; --bg-soft: #170a05;
      --panel: rgba(27, 13, 7, 0.95); --panel-2: rgba(37, 18, 10, 0.92);
      --line: rgba(251, 146, 60, 0.18); --line-strong: rgba(251, 146, 60, 0.45);
      --neon: #fb923c; --neon-rgb: 251, 146, 60;
      --info: #f43f5e; --info-rgb: 244, 63, 94;
      --text: #ffedd5; --muted: #b58d76; --muted-2: #825e4a;
      --radius: 10px; --btn-radius: 8px;
    }
    html[data-theme="moss"] {
      --bg: #040c08; --bg-soft: #081710;
      --panel: rgba(10, 26, 18, 0.94); --panel-2: rgba(14, 34, 24, 0.92);
      --line: rgba(52, 211, 153, 0.18); --line-strong: rgba(52, 211, 153, 0.44);
      --neon: #34d399; --neon-rgb: 52, 211, 153;
      --info: #a3e635; --info-rgb: 163, 230, 53;
      --text: #ecfdf5; --muted: #84a999; --muted-2: #56786a;
      --radius: 26px 8px 26px 8px; --btn-radius: 22px 6px 22px 6px;
    }
    html[data-theme="clay"] {
      --bg: #0f0907; --bg-soft: #1a100c;
      --panel: rgba(29, 19, 15, 0.94); --panel-2: rgba(38, 25, 20, 0.92);
      --line: rgba(224, 142, 109, 0.18); --line-strong: rgba(224, 142, 109, 0.44);
      --neon: #e08e6d; --neon-rgb: 224, 142, 109;
      --info: #f4a261; --info-rgb: 244, 162, 97;
      --text: #fbebe4; --muted: #b3978c; --muted-2: #7d645b;
      --radius: 26px; --btn-radius: 999px;
    }
    html[data-theme="emerald"] {
      --bg: #010a06; --bg-soft: #03150d;
      --panel: rgba(4, 24, 15, 0.92); --panel-2: rgba(6, 31, 20, 0.92);
      --line: rgba(43, 255, 158, 0.15); --line-strong: rgba(43, 255, 158, 0.42);
      --neon: #2bff9e; --neon-rgb: 43, 255, 158;
      --info: #5cffd6; --info-rgb: 92, 255, 214;
      --text: #e4fff4; --muted: #83ab9a; --muted-2: #5a7a6a;
      --shadow: 0 28px 70px rgba(0, 8, 4, 0.7);
      --radius: 26px; --btn-radius: 14px;
    }
    html[data-theme="cyan"] {
      --bg: #040b10; --bg-soft: #06131a;
      --panel: rgba(6, 18, 25, 0.92); --panel-2: rgba(8, 24, 32, 0.92);
      --line: rgba(57, 230, 255, 0.15); --line-strong: rgba(57, 230, 255, 0.4);
      --neon: #39e6ff; --neon-rgb: 57, 230, 255;
      --info: #8b7bff; --info-rgb: 139, 123, 255;
      --text: #e2f6fc; --muted: #7b98a5; --muted-2: #55707c;
      --shadow: 0 28px 70px rgba(0, 8, 14, 0.64);
      --radius: 24px; --btn-radius: 999px;
    }
    html[data-theme="violet"] {
      --bg: #080611; --bg-soft: #0d0a1a;
      --panel: rgba(16, 12, 27, 0.94); --panel-2: rgba(22, 16, 36, 0.92);
      --line: rgba(179, 136, 255, 0.17); --line-strong: rgba(179, 136, 255, 0.44);
      --neon: #b388ff; --neon-rgb: 179, 136, 255;
      --info: #58d8ff; --info-rgb: 88, 216, 255;
      --text: #efe9ff; --muted: #9489ad; --muted-2: #6c6185;
      --shadow: 0 28px 70px rgba(8, 4, 18, 0.66);
      --radius: 10px; --btn-radius: 6px;
    }
    html[data-theme="amber"] {
      --bg: #0b0803; --bg-soft: #141006;
      --panel: rgba(24, 18, 8, 0.94); --panel-2: rgba(32, 24, 10, 0.92);
      --line: rgba(255, 176, 32, 0.17); --line-strong: rgba(255, 176, 32, 0.44);
      --neon: #ffb020; --neon-rgb: 255, 176, 32;
      --info: #ff7a59; --info-rgb: 255, 122, 89;
      --text: #fdf1dc; --muted: #b09a7a; --muted-2: #836f55;
      --shadow: 0 28px 70px rgba(12, 7, 0, 0.64);
      --radius: 7px; --btn-radius: 4px;
    }
    html[data-theme="rose"] {
      --bg: #0c0508; --bg-soft: #15090f;
      --panel: rgba(26, 10, 17, 0.94); --panel-2: rgba(35, 13, 22, 0.92);
      --line: rgba(255, 84, 112, 0.17); --line-strong: rgba(255, 84, 112, 0.44);
      --neon: #ff5470; --neon-rgb: 255, 84, 112;
      --info: #ff9f6e; --info-rgb: 255, 159, 110;
      --text: #ffe8ee; --muted: #b1899a; --muted-2: #855f70;
      --shadow: 0 28px 70px rgba(14, 3, 8, 0.66);
      --radius: 30px; --btn-radius: 999px;
    }
    html.light-mode {
      --bg: #eef3f0; --bg-soft: #f7faf8;
      --panel: #ffffff; --panel-2: #f5faf7;
      --line: rgba(6, 118, 71, 0.16); --line-strong: rgba(6, 118, 71, 0.38);
      --neon: #0b8a4b; --neon-rgb: 11, 138, 75;
      --info: #0284c7; --info-rgb: 2, 132, 199;
      --text: #0c1a12; --muted: #5a6d60; --muted-2: #7a8b7f;
      --shadow: 0 20px 50px rgba(15, 40, 25, 0.12);
      --radius: 16px; --btn-radius: 10px;
      color-scheme: light;
    }
    * { box-sizing: border-box; }
    .mi { width: 16px; height: 16px; display: inline-block; vertical-align: -3px; flex: none; }
    html { scroll-behavior: smooth; }
    html, body { margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      font-family: var(--font);
      color: var(--text);
      background:
        radial-gradient(900px 560px at 82% -8%, rgba(var(--neon-rgb), 0.15), transparent 62%),
        radial-gradient(760px 520px at 0% 102%, rgba(var(--info-rgb), 0.12), transparent 62%),
        linear-gradient(180deg, var(--bg-soft), var(--bg) 70%);
      padding: clamp(12px, 2.6vw, 28px) 14px 44px;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(var(--neon-rgb), 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(var(--neon-rgb), 0.035) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 78%);
      opacity: 0.6;
      animation: grid-drift 28s linear infinite;
    }
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.18));
    }
    html.light-mode body::after { background: linear-gradient(180deg, transparent 62%, rgba(15, 40, 25, 0.04)); }
    .ambient { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    .ambient i {
      position: absolute;
      width: 34vw;
      height: 34vw;
      min-width: 220px;
      min-height: 220px;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.22;
      animation: drift 18s ease-in-out infinite alternate;
    }
    .ambient i:nth-child(1) { top: -12%; right: -8%; background: var(--neon); }
    .ambient i:nth-child(2) { left: -10%; bottom: 4%; background: var(--info); animation-delay: -7s; opacity: 0.14; }
    .ambient i:nth-child(3) { top: 45%; left: 38%; width: 18vw; height: 18vw; background: var(--neon); animation-delay: -11s; opacity: 0.08; }
    html.light-mode .ambient i { opacity: 0.1; }
    .shell {
      position: relative;
      z-index: 1;
      width: min(1060px, 100%);
      margin: 0 auto;
      perspective: 1400px;
    }
    .hero {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      border: 1px solid var(--line-strong);
      border-radius: calc(var(--radius) + 6px);
      background:
        radial-gradient(120% 140% at 100% 0%, rgba(var(--neon-rgb), 0.16), transparent 58%),
        radial-gradient(90% 120% at 0% 100%, rgba(var(--info-rgb), 0.1), transparent 62%),
        linear-gradient(150deg, var(--panel), var(--panel-2));
      box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      padding: clamp(18px, 3vw, 30px);
      transform-style: preserve-3d;
      transform: perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
      transition: transform 0.3s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      will-change: transform;
    }
    .hero:hover { border-color: rgba(var(--neon-rgb), 0.56); }
    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: radial-gradient(360px circle at var(--mx, 75%) var(--my, 18%), rgba(255, 255, 255, 0.1), transparent 62%);
      pointer-events: none;
    }
    .hero::after {
      content: "";
      position: absolute;
      inset-inline: 0;
      top: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--neon), var(--info), transparent);
      opacity: 0.8;
      animation: scan-line 6s ease-in-out infinite;
      pointer-events: none;
    }
    .hero-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .brand-lockup {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--mono);
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      color: var(--muted);
      direction: ltr;
    }
    .brand-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--neon);
      box-shadow: 0 0 0 4px rgba(var(--neon-rgb), 0.1), 0 0 16px var(--neon);
      animation: pulse-dot 2.4s ease-in-out infinite;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid rgba(var(--neon-rgb), 0.34);
      background: rgba(var(--neon-rgb), 0.09);
      color: var(--neon);
      font-size: 0.74rem;
      font-weight: 700;
      box-shadow: inset 0 0 14px rgba(var(--neon-rgb), 0.04);
    }
    .status-pill i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 8px currentColor;
      animation: pulse-dot 2s ease-in-out infinite;
    }
    .status-pill.is-off {
      border-color: rgba(255, 98, 98, 0.36);
      background: rgba(255, 98, 98, 0.09);
      color: var(--danger);
    }
    .hero-inner {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.75fr);
      align-items: center;
      gap: clamp(14px, 3vw, 30px);
      transform-style: preserve-3d;
    }
    .hero-copy { min-width: 0; transform: translateZ(22px); }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: var(--neon);
      font-family: var(--mono);
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .eyebrow .mi { width: 14px; height: 14px; }
    .hero h1 {
      margin: 0;
      font-size: clamp(1.9rem, 4.6vw, 3.2rem);
      line-height: 1.12;
      letter-spacing: -0.045em;
      font-weight: 900;
      text-shadow: 0 0 32px rgba(var(--neon-rgb), 0.14);
    }
    .hero h1 span {
      display: block;
      font-size: 0.42em;
      letter-spacing: 0.16em;
      font-weight: 700;
      color: var(--muted);
      font-family: var(--mono);
      margin-top: 7px;
    }
    .hero-copy p {
      max-width: 54ch;
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 0.86rem;
      line-height: 1.9;
    }
    .hero-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 13px; }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border: 1px solid var(--line);
      border-radius: 9px;
      background: rgba(255, 255, 255, 0.035);
      color: var(--muted);
      font-size: 0.72rem;
    }
    .hero-tag .mi { width: 13px; height: 13px; color: var(--neon); }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 17px; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 39px;
      padding: 9px 14px;
      border: 1px solid var(--line);
      border-radius: var(--btn-radius);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.18s, border-color 0.18s, background 0.18s, box-shadow 0.18s;
    }
    .btn:hover { transform: translateY(-2px); border-color: var(--line-strong); background: rgba(var(--neon-rgb), 0.09); }
    .btn.primary {
      border-color: transparent;
      background: linear-gradient(135deg, var(--neon), rgba(var(--neon-rgb), 0.68));
      color: #06130b;
      box-shadow: 0 12px 28px -14px rgba(var(--neon-rgb), 0.9);
    }
    .btn.primary:hover { box-shadow: 0 16px 34px -14px rgba(var(--neon-rgb), 0.9); }
    .btn.ghost { background: transparent; color: var(--muted); }
    button:focus-visible, a:focus-visible, summary:focus-visible { outline: 2px solid var(--neon); outline-offset: 2px; }
    .hero-visual {
      position: relative;
      min-height: 238px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateZ(36px);
      transform-style: preserve-3d;
    }
    .orbital {
      position: relative;
      width: 174px;
      height: 174px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      animation: floaty 6s ease-in-out infinite;
    }
    .orbit {
      position: absolute;
      inset: -15px;
      border-radius: 50%;
      border: 1px solid rgba(var(--neon-rgb), 0.28);
      transform: rotateX(66deg) rotateZ(18deg);
      box-shadow: 0 0 18px rgba(var(--neon-rgb), 0.12);
    }
    .orbit.b { inset: -31px; border-color: rgba(var(--info-rgb), 0.22); transform: rotateX(72deg) rotateZ(-26deg); animation: orbit-spin 18s linear infinite; }
    .orbit.c { inset: -4px; border-style: dashed; border-color: rgba(var(--neon-rgb), 0.18); transform: rotateX(58deg) rotateZ(68deg); animation: orbit-spin-reverse 13s linear infinite; }
    .orbit::after {
      content: "";
      position: absolute;
      top: 50%;
      inset-inline-start: -3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--neon);
      box-shadow: 0 0 12px var(--neon);
    }
    .logo-core {
      position: relative;
      z-index: 2;
      width: 116px;
      height: 116px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 34px;
      border: 1px solid rgba(var(--neon-rgb), 0.38);
      background:
        radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18), transparent 36%),
        linear-gradient(145deg, rgba(var(--neon-rgb), 0.2), rgba(0, 0, 0, 0.18));
      box-shadow:
        0 22px 48px -26px rgba(var(--neon-rgb), 0.95),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        inset 0 -12px 24px rgba(0, 0, 0, 0.18);
      transform: rotateX(9deg) rotateY(-13deg);
      transition: transform 0.3s ease;
    }
    .hero:hover .logo-core { transform: rotateX(4deg) rotateY(-4deg) translateY(-3px); }
    .logo-core .mili-shield-svg { width: 72px; height: 72px; filter: drop-shadow(0 0 15px rgba(var(--neon-rgb), 0.48)); }
    .logo-core .mili-shield-svg circle:nth-of-type(1) { stroke: var(--neon); fill: rgba(var(--neon-rgb), 0.05); }
    .logo-core .mili-shield-svg circle:nth-of-type(2) { fill: rgba(var(--neon-rgb), 0.1); }
    .logo-core .mili-shield-svg path { stroke: var(--neon); }
    .float-chip {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 7px 10px;
      border: 1px solid var(--line-strong);
      border-radius: 12px;
      background: rgba(6, 12, 9, 0.88);
      background: color-mix(in srgb, var(--panel) 86%, transparent);
      backdrop-filter: blur(10px);
      box-shadow: 0 14px 30px -20px #000;
      font-size: 0.7rem;
      color: var(--muted);
      transform: translateZ(56px);
      animation: floaty 5.5s ease-in-out infinite;
    }
    .float-chip b { color: var(--text); font-size: 0.82rem; }
    .float-chip .mi { width: 14px; height: 14px; color: var(--neon); }
    .float-chip.a { top: 8px; inset-inline-start: -4px; }
    .float-chip.b { bottom: 10px; inset-inline-end: -6px; animation-delay: -2.4s; }
    .hero-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid var(--line);
      color: var(--muted-2);
      font-size: 0.68rem;
    }
    .hero-foot span { display: inline-flex; align-items: center; gap: 5px; direction: ltr; }
    .hero-foot .mi { width: 12px; height: 12px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 9px;
      margin-top: 12px;
    }
    .stat {
      position: relative;
      overflow: hidden;
      min-height: 102px;
      padding: 12px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--panel);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
      transition: transform 0.22s, border-color 0.22s, box-shadow 0.22s;
    }
    .stat:hover {
      transform: translateY(-3px) rotateX(2deg);
      border-color: rgba(var(--neon-rgb), 0.34);
      box-shadow: 0 16px 34px -28px rgba(var(--neon-rgb), 0.8);
    }
    .stat::after {
      content: "";
      position: absolute;
      inset-inline: 12px;
      bottom: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--neon), transparent);
      opacity: 0.4;
    }
    .stat-icon {
      width: 27px;
      height: 27px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 9px;
      color: var(--neon);
      background: rgba(var(--neon-rgb), 0.1);
      border: 1px solid rgba(var(--neon-rgb), 0.22);
      margin-bottom: 7px;
    }
    .stat-icon .mi { width: 15px; height: 15px; }
    .stat-label { color: var(--muted); font-size: 0.7rem; }
    .stat-val {
      margin-top: 2px;
      color: var(--text);
      font-size: 0.9rem;
      font-weight: 900;
      line-height: 1.55;
      overflow-wrap: anywhere;
    }
    .usage-card {
      display: grid;
      gap: 8px;
      margin-top: 9px;
      padding: 12px 14px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: linear-gradient(110deg, rgba(var(--neon-rgb), 0.05), transparent 40%), var(--panel);
    }
    .usage-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.72rem; color: var(--muted); }
    .usage-head b { color: var(--text); font-size: 0.76rem; }
    .usage-track {
      position: relative;
      height: 9px;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.07);
    }
    .usage-track i {
      display: block;
      height: 100%;
      min-width: 2px;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--neon), var(--info));
      box-shadow: 0 0 14px rgba(var(--neon-rgb), 0.5);
      transition: width 0.65s ease;
      animation: grow 1s ease both;
    }
    .usage-meta { display: flex; justify-content: space-between; gap: 8px; color: var(--muted-2); font-size: 0.68rem; }
    .dock {
      position: sticky;
      top: 10px;
      z-index: 30;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 5px;
      margin: 13px 0;
      padding: 5px;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: rgba(7, 12, 14, 0.86);
      background: color-mix(in srgb, var(--panel) 82%, transparent);
      backdrop-filter: blur(18px);
      box-shadow: 0 18px 40px -34px #000;
    }
    .dock-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 34px;
      padding: 7px 7px;
      border: 1px solid transparent;
      border-radius: 11px;
      background: transparent;
      color: var(--muted);
      font-family: inherit;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
      transition: 0.18s;
      white-space: nowrap;
    }
    .dock-btn .mi { width: 14px; height: 14px; }
    .dock-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.04); }
    .dock-btn.is-active {
      color: var(--neon);
      border-color: rgba(var(--neon-rgb), 0.3);
      background: linear-gradient(180deg, rgba(var(--neon-rgb), 0.15), rgba(var(--neon-rgb), 0.04));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 18px -18px rgba(var(--neon-rgb), 0.8);
    }
    [data-panel] { display: none; animation: rise 0.3s ease both; }
    [data-panel].is-active { display: block; }
    .layout-two { display: grid; grid-template-columns: minmax(0, 1.22fr) minmax(0, 0.78fr); gap: 10px; }
    .layout-two.single { grid-template-columns: 1fr; }
    .card {
      position: relative;
      overflow: hidden;
      padding: 15px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--panel);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
    }
    .card::before {
      content: "";
      position: absolute;
      inset-inline: 15px;
      top: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(var(--neon-rgb), 0.55), transparent);
      opacity: 0.6;
    }
    .card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 9px; }
    .card-title { display: inline-flex; align-items: center; gap: 7px; font-size: 0.9rem; font-weight: 900; }
    .card-title .mi { width: 16px; height: 16px; color: var(--neon); }
    .card-sub { color: var(--muted); font-size: 0.7rem; line-height: 1.7; }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 3px 8px;
      border: 1px solid rgba(var(--neon-rgb), 0.24);
      border-radius: 999px;
      background: rgba(var(--neon-rgb), 0.08);
      color: var(--neon);
      font-size: 0.62rem;
      font-weight: 800;
      white-space: nowrap;
    }
    .copybox {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 7px 6px 8px;
      border: 1px solid var(--line);
      border-radius: 11px;
      background: rgba(0, 0, 0, 0.2);
    }      html.light-mode .copybox { background: #f2f7f4; }
      html.light-mode .float-chip, html.light-mode .dock { background: rgba(255, 255, 255, 0.92); }
    .copybox code {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      direction: ltr;
      text-align: left;
      color: var(--text);
      font: 0.72rem/1.5 var(--mono);
    }
    .copybox .mini-btn { flex: none; }
    .mini-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      min-height: 30px;
      padding: 5px 9px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.045);
      color: var(--text);
      font-family: inherit;
      font-size: 0.68rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: 0.16s;
      white-space: nowrap;
    }
    .mini-btn:hover { color: var(--neon); border-color: var(--line-strong); background: rgba(var(--neon-rgb), 0.09); }
    .mini-btn .mi { width: 12px; height: 12px; }
    .card-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .download-grid, .quick-grid, .scope-grid, .loc-grid, .protocol-grid { display: grid; gap: 7px; }
    .download-grid { grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); }
    .quick-grid { grid-template-columns: repeat(auto-fit, minmax(165px, 1fr)); }
    .scope-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .loc-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .protocol-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tile {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.025);
      color: var(--text);
      text-decoration: none;
      cursor: pointer;
      text-align: right;
      transition: transform 0.18s, border-color 0.18s, background 0.18s;
    }
    .tile:hover { transform: translateY(-2px); border-color: var(--line-strong); background: rgba(var(--neon-rgb), 0.06); }
    .tile-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
    .tile-icon { width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; color: var(--neon); background: rgba(var(--neon-rgb), 0.1); }
    .tile-icon .mi { width: 14px; height: 14px; }
    .tile b { font-size: 0.76rem; }
    .tile small { color: var(--muted); font-size: 0.65rem; line-height: 1.55; }
    .quick-tile { position: relative; overflow: hidden; }
    .quick-tile::after { content: ""; position: absolute; inset-inline-end: -16px; bottom: -20px; width: 58px; height: 58px; border-radius: 50%; background: var(--neon); filter: blur(28px); opacity: 0.12; }
    .section-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 16px 2px 7px; }
    .section-head h2 { display: inline-flex; align-items: center; gap: 7px; margin: 0; font-size: 0.96rem; font-weight: 900; }
    .section-head h2 .mi { width: 16px; height: 16px; color: var(--neon); }
    .section-head small { color: var(--muted); font-size: 0.68rem; }
    .fold {
      overflow: hidden;
      margin-top: 9px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--panel);
    }
    .fold summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 13px 14px;
      color: var(--text);
      cursor: pointer;
      list-style: none;
      font-size: 0.84rem;
      font-weight: 800;
    }
    .fold summary::-webkit-details-marker { display: none; }
    .fold summary span { display: inline-flex; align-items: center; gap: 7px; }
    .fold summary .mi { width: 15px; height: 15px; color: var(--neon); }
    .fold summary small { color: var(--muted); font-size: 0.67rem; font-weight: 500; }
    .fold .chev { width: 14px; height: 14px; color: var(--muted); transform: rotate(90deg); transition: transform 0.2s; }
    .fold[open] .chev { transform: rotate(-90deg); color: var(--neon); }
    .fold-body { padding: 0 12px 13px; }
    .client-group { margin-top: 12px; }
    .client-group:first-of-type { margin-top: 0; }
    .group-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 0 2px 6px; color: var(--muted); font-size: 0.7rem; }
    .group-head b { display: inline-flex; align-items: center; gap: 6px; color: var(--text); font-size: 0.78rem; }
    .group-head .mi { width: 14px; height: 14px; color: var(--neon); }
    .client-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
    .client-card {
      position: relative;
      overflow: hidden;
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: linear-gradient(145deg, rgba(var(--neon-rgb), 0.035), transparent 55%), var(--panel-2);
      transition: transform 0.18s, border-color 0.18s;
    }
    .client-card:hover { transform: translateY(-2px); border-color: var(--line-strong); }
    .client-main { display: flex; align-items: flex-start; gap: 7px; min-width: 0; }
    .client-mark {
      width: 29px;
      height: 29px;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(var(--neon-rgb), 0.24);
      border-radius: 9px;
      background: rgba(var(--neon-rgb), 0.1);
      color: var(--neon);
      font: 800 0.62rem/1 var(--mono);
      letter-spacing: 0.02em;
    }
    .client-info { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .client-info b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
    .client-info small { color: var(--muted); font-size: 0.63rem; line-height: 1.45; }
    .client-card .badge { align-self: flex-start; font-size: 0.57rem; padding: 2px 6px; }
    .client-note { color: var(--muted-2); font-size: 0.62rem; line-height: 1.55; margin-top: 5px; }
    .client-foot { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-top: 8px; padding-top: 7px; border-top: 1px solid var(--line); }
    .client-foot .mini-btn { min-height: 26px; font-size: 0.62rem; padding: 4px 6px; }
    .client-foot .mini-btn.ghost { color: var(--muted); background: transparent; }
    .node-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
    .node-scroll { max-height: 440px; overflow: auto; margin-top: 9px; padding-inline-end: 2px; }
    .node-scroll::-webkit-scrollbar { width: 6px; }
    .node-scroll::-webkit-scrollbar-thumb { background: rgba(var(--neon-rgb), 0.22); border-radius: 99px; }
    .node-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 5px;
      padding: 9px 10px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.025);
    }
    .node-item:hover { border-color: var(--line-strong); background: rgba(var(--neon-rgb), 0.05); }
    .node-name { min-width: 0; }
    .node-tag { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text); font: 700 0.74rem/1.4 var(--mono); direction: ltr; text-align: left; }
    .node-proto { color: var(--muted-2); font-size: 0.62rem; margin-top: 2px; }
    .empty-state { padding: 22px 12px; text-align: center; color: var(--muted); font-size: 0.78rem; }
    .page-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 9px;
      flex-wrap: wrap;
      margin-top: 15px;
      padding: 12px 2px 0;
      border-top: 1px solid var(--line);
      color: var(--muted-2);
      font-size: 0.65rem;
    }
    .page-foot b { color: var(--muted); font-weight: 700; }
    .toast {
      position: fixed;
      z-index: 100;
      top: 16px;
      left: 50%;
      display: none;
      transform: translateX(-50%);
      padding: 9px 17px;
      border: 1px solid var(--neon);
      border-radius: 999px;
      background: var(--panel);
      color: var(--neon);
      box-shadow: 0 12px 30px -14px rgba(var(--neon-rgb), 0.6);
      font-size: 0.76rem;
      font-weight: 700;
      backdrop-filter: blur(12px);
    }
    .toast.show { display: block; animation: toast-in 0.22s ease both; }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.45; transform: scale(0.72); } }
    @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes orbit-spin { to { transform: rotateX(72deg) rotateZ(334deg); } }
    @keyframes orbit-spin-reverse { to { transform: rotateX(58deg) rotateZ(-292deg); } }
    @keyframes scan-line { 0%, 100% { opacity: 0.2; transform: translateX(-45%); } 50% { opacity: 0.85; transform: translateX(45%); } }
    @keyframes grid-drift { to { background-position: 42px 42px, 42px 42px; } }
    @keyframes drift { to { transform: translate3d(8%, 7%, 0) scale(1.12); } }
    @keyframes grow { from { width: 0; } }
    @keyframes rise { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toast-in { from { opacity: 0; transform: translate(-50%, -7px); } to { opacity: 1; transform: translate(-50%, 0); } }
    @media (max-width: 820px) {
      .hero-inner { grid-template-columns: 1fr; }
      .hero-visual { order: -1; min-height: 188px; margin: -4px 0 2px; }
      .orbital { width: 132px; height: 132px; }
      .logo-core { width: 92px; height: 92px; border-radius: 27px; }
      .logo-core .mili-shield-svg { width: 57px; height: 57px; }
      .float-chip { font-size: 0.62rem; padding: 5px 7px; }
      .float-chip.a { inset-inline-start: 2%; }
      .float-chip.b { inset-inline-end: 2%; }
      .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .layout-two { grid-template-columns: 1fr; }
      .loc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .client-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 520px) {
      body { padding-inline: 10px; }
      .hero { padding: 16px 13px; border-radius: calc(var(--radius) + 2px); }
      .hero-topline { margin-bottom: 8px; }
      .hero-visual { min-height: 160px; }
      .orbital { width: 112px; height: 112px; }
      .logo-core { width: 78px; height: 78px; border-radius: 23px; }
      .logo-core .mili-shield-svg { width: 48px; height: 48px; }
      .orbit { inset: -10px; }
      .orbit.b { inset: -21px; }
      .float-chip { display: none; }
      .hero h1 { font-size: 1.85rem; }
      .hero-actions .btn { flex: 1 1 auto; }
      .dock { gap: 3px; padding: 4px; border-radius: 13px; }
      .dock-btn { gap: 3px; padding: 6px 3px; font-size: 0.64rem; border-radius: 9px; }
      .dock-btn .mi { width: 12px; height: 12px; }
      .scope-grid, .loc-grid, .protocol-grid, .client-grid { grid-template-columns: 1fr; }
      .quick-grid { grid-template-columns: 1fr 1fr; }
      .download-grid { grid-template-columns: 1fr 1fr; }
      .stat { min-height: 90px; padding: 10px; }
      .stat-val { font-size: 0.82rem; }
      .section-head { margin-top: 13px; }
      .node-scroll { max-height: 56vh; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      .hero { transform: none !important; }
    }
  </style>
</head>
<body>
  <div class="ambient" aria-hidden="true"><i></i><i></i><i></i></div>
  <div id="toast" class="toast"></div>

  <div class="shell">
    <header class="hero" id="heroCard" data-tilt>
      <div class="hero-topline">
        <span class="brand-lockup"><span class="brand-dot"></span>${BRAND_UPPER} / ACCESS NODE</span>
        <span class="status-pill ${user.enabled ? '' : 'is-off'}" id="statusPill"><i></i><span id="statusText">${statusLabel}</span></span>
      </div>

      <div class="hero-inner">
        <div class="hero-copy">
          <span class="eyebrow">${icon('sparkles')} SUBSCRIPTION CONTROL</span>
          <h1>${safeUsername}<span>${BRAND_NAME} // PRIVATE GATEWAY</span></h1>
          <p>یک نقطهٔ دسترسی، همهٔ مسیرها. وضعیت اشتراک، لینک‌های آماده و نودهای اختصاصی شما در یک نگاه.</p>
          <div class="hero-tags">
            <span class="hero-tag">${icon('layers')} ${totalNodes} نود</span>
            <span class="hero-tag">${icon('clock')} ${expireLabel}</span>
            <span class="hero-tag">${icon(warpEnabled ? 'warp' : 'shield')} ${warpEnabled ? 'WARP فعال' : 'اتصال امن'}</span>
          </div>
          <div class="hero-actions">
            <button class="btn primary" type="button" onclick="copyText('${baseSubUrl}', 'ساب‌لینک اصلی کپی شد')">${icon('copy')} کپی ساب‌لینک</button>
            <button class="btn ghost" type="button" onclick="window.location.reload()">${icon('refresh')} بروزرسانی وضعیت</button>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="orbital">
            <span class="orbit"></span>
            <span class="orbit b"></span>
            <span class="orbit c"></span>
            <div class="logo-core">${SHIELD_LOGO_SVG}</div>
          </div>
          <div class="float-chip a">${icon('layers')}<b>${totalNodes}</b> نود آماده</div>
          <div class="float-chip b">${icon('activity')}<b>LIVE</b> اتصال</div>
        </div>
      </div>

      <div class="hero-foot">
        <span>${icon('globe')} ${baseUrl.replace(/^https?:\/\//, '')}</span>
        <span>${icon('pulse')} پایش هر ۳۰ ثانیه</span>
      </div>
    </header>

    <section class="stats-grid" aria-label="خلاصهٔ وضعیت">
      <div class="stat">
        <span class="stat-icon">${icon('gauge')}</span>
        <div class="stat-label">مصرف فعلی</div>
        <div class="stat-val" id="statUsed">${formatBytes(usedBytes)}</div>
      </div>
      <div class="stat">
        <span class="stat-icon">${icon('database')}</span>
        <div class="stat-label">سهمیهٔ حجم</div>
        <div class="stat-val" id="statLimit">${limitGb > 0 ? `${limitGb} GB (${usagePercent}%)` : '∞ نامحدود'}</div>
      </div>
      <div class="stat">
        <span class="stat-icon">${icon('server')}</span>
        <div class="stat-label">نودهای اشتراک</div>
        <div class="stat-val" id="statNodes">${totalNodes} نود (${BRAND_NAME})</div>
      </div>
      <div class="stat">
        <span class="stat-icon">${icon('clock')}</span>
        <div class="stat-label">وضعیت انقضا</div>
        <div class="stat-val" id="statExpire">${expireLabel}</div>
      </div>
    </section>

    <section class="usage-card" aria-label="مصرف پهنای باند">
      <div class="usage-head"><span>${icon('activity')} <b>پهنای باند</b></span><span id="usageUpdated">در حال همگام‌سازی…</span></div>
      <div class="usage-track" title="مصرف واقعی ثبت‌شده در پنل"><i id="usageBar" style="width:${usagePercent}%"></i></div>
      <div class="usage-meta"><span id="usageMeta">${limitGb > 0 ? `${formatBytes(usedBytes)} از ${limitGb} GB` : formatBytes(usedBytes) + ' مصرف‌شده'}</span><span>${BRAND_UPPER} · D1 TELEMETRY</span></div>
    </section>

    <nav class="dock" aria-label="بخش‌های صفحه">
      <button class="dock-btn is-active" type="button" data-tab="overview" aria-selected="true">${icon('dashboard')} نمای کلی</button>
      <button class="dock-btn" type="button" data-tab="access" aria-selected="false">${icon('link')} دسترسی‌ها</button>
      <button class="dock-btn" type="button" data-tab="clients" aria-selected="false">${icon('users')} کلاینت‌ها</button>
      <button class="dock-btn" type="button" data-tab="nodes" aria-selected="false">${icon('server')} نودها</button>
    </nav>

    <main>
      <section class="panel-page is-active" data-panel="overview">
        <div class="layout-two ${downloadLinks.length ? '' : 'single'}">
          <article class="card">
            <div class="card-head">
              <div>
                <div class="card-title">${icon('link')} ساب‌لینک اصلی</div>
                <div class="card-sub">یک لینک برای همهٔ نودها و پروتکل‌ها</div>
              </div>
              <span class="badge">Base64</span>
            </div>
            <div class="copybox">
              <code>${baseSubUrl}</code>
              <button class="mini-btn" type="button" onclick="copyText('${baseSubUrl}', 'ساب‌لینک اصلی کپی شد')">${icon('copy')} کپی</button>
            </div>
            <div class="card-actions">
              <button class="mini-btn" type="button" onclick="copyText('${statusUrl}', 'لینک صفحهٔ وضعیت کپی شد')">${icon('link')} کپی لینک وضعیت</button>
              <a class="mini-btn" href="${baseSubUrl}" target="_blank" rel="noopener">${icon('external')} باز کردن ساب</a>
            </div>
          </article>

          ${downloadLinks.length ? `
          <article class="card">
            <div class="card-head">
              <div>
                <div class="card-title">${icon('download')} دانلود مستقیم</div>
                <div class="card-sub">فایل‌های آماده برای کلاینت‌ها</div>
              </div>
              <span class="badge">${downloadLinks.length}</span>
            </div>
            <div class="download-grid">
              ${downloadLinks.map(d => `
                <a class="tile" href="${d.url}" download>
                  <span class="tile-top"><span class="tile-icon">${icon(d.icon)}</span><span class="badge">GET</span></span>
                  <b>${d.title}</b><small>${d.sub}</small>
                </a>`).join('')}
            </div>
          </article>` : ''}
        </div>

        <div class="section-head"><h2>${icon('bolt')} دسترسی سریع</h2><small>مستقیم به کلاینت دلخواه</small></div>
        <div class="card">
          <div class="quick-grid">
            ${quickAccess.map(q => `
              <a class="tile quick-tile" href="${q.url}" target="_blank" rel="noopener">
                <span class="tile-top"><span class="tile-icon">${icon(q.icon)}</span><span class="badge">${q.badge}</span></span>
                <b>${q.title}</b><small>${q.sub}</small>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="panel-page" data-panel="access">
        <div class="section-head"><h2>${icon('layers')} محدودهٔ نودها</h2><small>فیلتر سریع مسیر اتصال</small></div>
        <div class="scope-grid">
          ${scopeLinks.map(s => `
            <div class="tile">
              <span class="tile-top"><span class="tile-icon">${icon('link')}</span><span class="badge">${s.badge}</span></span>
              <b>${s.title}</b><small>${s.desc}</small>
              <button class="mini-btn" type="button" style="margin-top:4px" onclick="copyText('${s.url}', 'لینک ${s.title} کپی شد')">${icon('copy')} کپی لینک</button>
            </div>`).join('')}
        </div>

        <details class="fold">
          <summary><span>${icon('globe')} لوکیشن‌ها <small>${locationsList.length} لینک</small></span><span class="chev">${icon('chevron')}</span></summary>
          <div class="fold-body">
            <div class="loc-grid">
              ${locationsList.map(loc => `
                <div class="tile">
                  <span class="tile-top"><b>${loc.title}</b><span class="badge">${loc.code}</span></span>
                  <button class="mini-btn" type="button" onclick="copyText('${loc.url}', 'لینک لوکیشن ${loc.code} کپی شد')">${icon('copy')} کپی ساب</button>
                </div>`).join('')}
            </div>
          </div>
        </details>

        <details class="fold">
          <summary><span>${icon('link')} ترکیب پروتکل‌ها <small>${protoCombos.length} لینک</small></span><span class="chev">${icon('chevron')}</span></summary>
          <div class="fold-body">
            <div class="protocol-grid">
              ${protoCombos.map(p => `
                <div class="tile">
                  <span class="tile-top"><b>${p.title}</b><span class="badge">${p.badge}</span></span>
                  <button class="mini-btn" type="button" onclick="copyText('${p.url}', 'لینک کپی شد')">${icon('copy')} کپی لینک</button>
                </div>`).join('')}
            </div>
          </div>
        </details>
      </section>

      <section class="panel-page" data-panel="clients">
        <div class="section-head"><h2>${icon('users')} کلاینت‌ها</h2><small>ساب‌لینک و دانلود مستقیم</small></div>
        ${clientGroups.map(group => `
          <div class="client-group">
            <div class="group-head"><b>${icon(group.icon)} ${group.title}</b><span>${group.clients.length} کلاینت</span></div>
            <div class="client-grid">
              ${group.clients.map(c => `
                <article class="client-card">
                  <div class="client-main">
                    <span class="client-mark">${c.mark}</span>
                    <div class="client-info"><b>${c.name}</b><small>${c.os}</small></div>
                    <span class="badge">${c.badge}</span>
                  </div>
                  ${c.note ? `<div class="client-note">${c.note}</div>` : ''}
                  <div class="client-foot">
                    <button class="mini-btn" type="button" onclick="copyText('${c.url}', 'لینک ${c.name} کپی شد')">${icon('copy')} کپی</button>
                    ${c.download ? `<a class="mini-btn ghost" href="${c.download}" target="_blank" rel="noopener">${icon('download')} دریافت</a>` : ''}
                  </div>
                </article>`).join('')}
            </div>
          </div>`).join('')}
      </section>

      <section class="panel-page" data-panel="nodes">
        <div class="section-head"><h2>${icon('server')} نودهای اشتراک</h2><small>${totalNodes} کانفیگ · ${BRAND_NAME}</small></div>
        <div class="card">
          <div class="node-head">
            <div class="card-sub">${icon('bolt')} لیست کامل کانفیگ‌های خروجی با نام‌گذاری ${BRAND_NAME}</div>
            <button class="mini-btn" type="button" onclick="copyAllNodes()">${icon('copy')} کپی همه</button>
          </div>
          <div id="nodesContainer" class="node-scroll"></div>
        </div>
      </section>
    </main>

    <footer class="page-foot">
      <span><b>${BRAND_UPPER}</b> / ${BRAND_NAME} · وضعیت اختصاصی شما</span>
      <span>${icon('shield')} اتصال امن · ${icon('refresh')} بروزرسانی خودکار</span>
    </footer>
  </div>

  <script>
    var ALL_NODES = ${safeNodesJson};

    function showToast(msg) {
      var t = document.getElementById('toast');
      if (!t) return;
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(function() { t.classList.remove('show'); }, 2500);
    }

    function copyText(text, msg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() { showToast(msg || 'کپی شد'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(msg || 'کپی شد');
      }
    }

    function copyAllNodes() {
      copyText(ALL_NODES.join('\\n'), 'همهٔ کانفیگ‌ها کپی شدند');
    }

    function copyNodeByIndex(idx) {
      var link = ALL_NODES[idx];
      if (!link) return;
      copyText(link, 'کانفیگ ' + (idx + 1) + '+${BRAND_NAME} کپی شد');
    }

    function esc(value) {
      return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
    }

    function renderNodes() {
      var container = document.getElementById('nodesContainer');
      if (!container) return;
      if (!ALL_NODES.length) {
        container.innerHTML = '<div class="empty-state">هنوز نودی برای این اشتراک ساخته نشده است.</div>';
        return;
      }
      var html = '';
      for (var i = 0; i < ALL_NODES.length; i++) {
        var link = ALL_NODES[i];
        var hashIdx = link.indexOf('#');
        var name = (i + 1) + '+${BRAND_NAME}';
        if (hashIdx > -1) {
          try { name = decodeURIComponent(link.substring(hashIdx + 1)); }
          catch (e) { name = link.substring(hashIdx + 1); }
        }
        var proto = link.split('://')[0].toUpperCase();
        html += '<div class="node-item">' +
          '<div class="node-name"><div class="node-tag">' + esc(name) + '</div><div class="node-proto">' + esc(proto) + ' · CLOUDFLARE EDGE</div></div>' +
          '<button type="button" class="mini-btn" onclick="copyNodeByIndex(' + i + ')">${icon('copy')} کپی</button>' +
          '</div>';
      }
      container.innerHTML = html;
    }

    function fmtBytesClient(bytes) {
      var n = Number(bytes || 0);
      if (n <= 0) return '0 B';
      var units = ['B', 'KB', 'MB', 'GB', 'TB'];
      var i = Math.floor(Math.log(n) / Math.log(1024));
      if (i < 0) i = 0;
      if (i > units.length - 1) i = units.length - 1;
      return (n / Math.pow(1024, i)).toFixed(i >= 3 ? 2 : 1) + ' ' + units[i];
    }

    // اتصال مستقیم نمایشگر مصرف به آمار واقعی پنل (D1)
    function refreshUsage() {
      fetch('${usageApiUrl}?t=' + Date.now(), { cache: 'no-store' })
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (!data || !data.success || !data.user) return;
          var u = data.user;
          var used = Number(u.usedBytes || 0);
          var limitGb = Number(u.dataLimitGb || 0);
          var limitBytes = limitGb > 0 ? limitGb * 1073741824 : 0;
          var pct = limitBytes > 0 ? Math.min(100, Math.round((used / limitBytes) * 100)) : 0;
          var usedEl = document.getElementById('statUsed');
          if (usedEl) usedEl.textContent = fmtBytesClient(used);
          var limitEl = document.getElementById('statLimit');
          if (limitEl) limitEl.textContent = limitGb > 0 ? (limitGb + ' GB (' + pct + '%)') : '∞ نامحدود';
          var nodesEl = document.getElementById('statNodes');
          if (nodesEl) nodesEl.textContent = (data.nodeCount || 0) + ' نود (${BRAND_NAME})';
          var bar = document.getElementById('usageBar');
          if (bar) bar.style.width = Math.max(pct, used > 0 ? 2 : 0) + '%';
          var meta = document.getElementById('usageMeta');
          if (meta) meta.textContent = limitGb > 0 ? (fmtBytesClient(used) + ' از ' + limitGb + ' GB') : (fmtBytesClient(used) + ' مصرف‌شده');
          var expEl = document.getElementById('statExpire');
          if (expEl) {
            if (u.expireAt > 0) {
              var days = Math.ceil((u.expireAt - Date.now()) / 86400000);
              expEl.textContent = days > 0 ? (days + ' روز باقی‌مانده') : 'منقضی شده';
            } else {
              expEl.textContent = 'بدون انقضا';
            }
          }
          var pill = document.getElementById('statusPill');
          var pillText = document.getElementById('statusText');
          if (pill) pill.classList.toggle('is-off', !u.enabled);
          if (pillText) {
            pillText.textContent = u.enabled
              ? ((u.startOnFirstUse && !u.firstConnectedAt) ? 'شروع با اولین اتصال' : 'فعال و آنلاین')
              : 'غیرفعال';
          }
          var upd = document.getElementById('usageUpdated');
          if (upd) upd.textContent = 'آخرین بروزرسانی: ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        })
        .catch(function() {});
    }

    function showPanel(id) {
      var tabs = ['overview', 'access', 'clients', 'nodes'];
      if (tabs.indexOf(id) < 0) id = 'overview';
      document.querySelectorAll('[data-tab]').forEach(function(btn) {
        var on = btn.getAttribute('data-tab') === id;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.querySelectorAll('[data-panel]').forEach(function(panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-panel') === id);
      });
    }

    function applyStoredTheme() {
      try {
        var skins = ['zedsecure', 'aurora', 'neon', 'tokyo', 'solar', 'ember', 'moss', 'clay', 'emerald', 'cyan', 'violet', 'amber', 'rose'];
        var skin = localStorage.getItem('mili_skin') || 'neon';
        var light = localStorage.getItem('mili_theme') === 'light';
        if (skins.indexOf(skin) < 0) skin = 'neon';
        document.documentElement.setAttribute('data-theme', light ? 'light' : skin);
        document.documentElement.classList.toggle('light-mode', light);
      } catch (e) {}
    }

    function initTilt() {
      var card = document.getElementById('heroCard');
      if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
      card.addEventListener('pointermove', function(event) {
        var box = card.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width;
        var py = (event.clientY - box.top) / box.height;
        card.style.setProperty('--ry', ((px - 0.5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', function() {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--mx', '75%');
        card.style.setProperty('--my', '18%');
      });
    }

    document.addEventListener('click', function(event) {
      var tab = event.target.closest('[data-tab]');
      if (tab) showPanel(tab.getAttribute('data-tab'));
    });
    window.addEventListener('storage', function(event) {
      if (event.key === 'mili_skin' || event.key === 'mili_theme') applyStoredTheme();
    });

    showPanel('overview');
    renderNodes();
    refreshUsage();
    setInterval(refreshUsage, 30000);
    initTilt();
  </script>
</body>
</html>`);
}
