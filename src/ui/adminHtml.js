// ============================================================================
// miliconfig v3.2 - مرکز کنترل مدیریت پنل
// بدون ایموجی - تمام آیکون‌ها SVG اختصاصی - دکمه‌ها با event delegation
// ============================================================================

import {
  BRAND_NAME,
  BRAND_UPPER,
  CF_PORT_CHOICES,
  CONFIG_DEFAULTS,
  COUNTRY_PROXY_SOURCES,
  DNS_PRESETS,
  ECH_DOMAINS,
  FINGERPRINT_PRESETS,
  FRAGMENT_PRESETS,
  MAX_USERS_LIMIT,
  PATH_PATTERNS,
  TELEGRAM_SUPPORT,
  VERSION
} from '../config/defaults.js';
import { IP_POOL, IP_POOL_COUNTRIES, IP_POOL_COUNTRY_NAMES } from '../config/ipPool.js';
import { USER_PRESETS } from '../config/presets.js';
import { EDGE_VIP_COUNTRIES } from '../config/sources.js';
import { FAVICON_DATA_URI, SHIELD_LOGO_SVG, icon, stripEmoji } from './icons.js';
import { PWA_CLIENT_JS, PWA_HEAD_TAGS } from './pwa.js';

const SUPPORT_URL = `https://t.me/${String(TELEGRAM_SUPPORT).replace(/^@/, '')}`;

// دیکشنری دوزبانه پنل (فارسی / انگلیسی)
const PANEL_I18N = {
  fa: {
    'nav.dashboard': 'داشبورد', 'nav.users': 'کاربران', 'nav.settings': 'تنظیمات',
    'nav.scanner': 'اسکنر', 'nav.locations': 'چندلوکیشن',
    'top.support': 'پشتیبانی', 'top.multi': 'چندلوکیشن', 'top.theme': 'حالت روز', 'top.lang': 'English',
    'panel.dashboard': 'داشبورد', 'panel.dashboardSub': 'وضعیت زنده سیستم و مصرف',
    'panel.users': 'کاربران', 'panel.usersSub': 'مدیریت اشتراک و محدودیت',
    'panel.settings': 'تنظیمات', 'panel.settingsSub': 'هسته پروکسی، شبکه و پنل',
    'panel.scanner': 'اسکنر زنده', 'panel.scannerSub': 'دریافت زنده پروکسی و آی‌پی ثابت (IPv4/IPv6) به تفکیک کشور',
    'panel.locations': 'چندلوکیشن', 'panel.locationsSub': 'ساب‌لینک به تفکیک کشور',
    'btn.reload': 'بروزرسانی', 'btn.createUser': 'ایجاد کاربر', 'btn.newUser': 'کاربر جدید',
    'btn.save': 'ذخیره تنظیمات', 'btn.reset': 'بازنشانی پیش‌فرض', 'btn.copyMaster': 'کپی ساب‌لینک اصلی',
    'btn.scan': 'دریافت و تست', 'btn.password': 'تغییر رمز مدیر',
    'metric.users': 'کاربران فعال', 'metric.traffic': 'حجم مصرف‌شده',
    'metric.ips': 'آی‌پی‌های سالم', 'metric.protocols': 'پروتکل‌های فعال',
    'settings.protocols': 'پروتکل‌ها و قابلیت‌ها', 'settings.network': 'شبکه و ترنسپورت', 'settings.panel': 'پنل و امنیت',
    'scanner.country': 'کشور', 'scanner.kind': 'نوع', 'scanner.family': 'خانواده آی‌پی',
    'scanner.count': 'تعداد',    'scanner.addCfIps': 'افزودن آی‌پی‌های پیش‌فرض کلادفلر به آدرس‌های دستی',
    'scanner.addCfDomains': 'افزودن دامنه‌های پیش‌فرض کلادفلر به آدرس‌های دستی',
    'btn.editUser': 'ویرایش', 'card.nodesAuto': 'تعداد نود: خودکار',
    'modal.create': 'ایجاد کاربر جدید', 'modal.username': 'نام کاربری', 'modal.preset': 'پریست',
    'modal.limit': 'حجم مجاز (GB) — صفر برای نامحدود', 'modal.days': 'مدت اعتبار (روز) — صفر برای بدون انقضا',
    'modal.nodes': 'تعداد نود در ساب‌لینک', 'modal.createBtn': 'ساخت کاربر', 'modal.cancel': 'انصراف',
    'modal.advanced': 'تنظیمات منحصر به فرد این کاربر',
    'modal.password': 'تغییر رمز مدیر', 'modal.old': 'رمز فعلی', 'modal.new': 'رمز جدید',
    'modal.confirmNew': 'تکرار رمز جدید', 'modal.savePassword': 'ذخیره رمز',
    'field.echDomain': 'دامنه ECH', 'field.dns': 'DNS سفارشی (DoH)', 'field.fragPreset': 'پریست فرگمنت',
    'field.ports': 'پورت‌های نود', 'field.fp': 'اثر انگشت TLS', 'field.patt': 'الگوی مسیر',
    'field.rotation': 'چرخش آی‌پی', 'field.proxyIP': 'آدرس واسط سفارشی', 'field.locCount': 'تعداد نود چندلوکیشن',
    'field.outProxy': 'پروکسی خروجی', 'field.dnsHint': 'یک DNS از لیست انتخاب کنید یا مقدار دلخواه DoH بنویسید.',
    'field.adminPath': 'مسیر مدیریت تصادفی', 'field.customPath': 'مسیر سفارشی پنل',
    'field.homepage': 'صفحهٔ استتار', 'field.yx': 'آدرس‌های دستی', 'field.nodeCount': 'تعداد نود هر کاربر',
    'warn.title': 'هشدار تداخل تنظیمات:',
    'card.usage': 'مصرف', 'card.expiry': 'انقضا', 'card.unlimited': 'نامحدود',
    'card.noExpiry': 'بدون انقضا', 'card.nodes': 'نود', 'card.active': 'فعال',
    'card.inactive': 'غیرفعال', 'card.preset': 'پریست', 'card.subscription': 'اشتراک فعال',
    'btn.copySub': 'ساب', 'btn.status': 'وضعیت', 'btn.resetUser': 'ریست', 'btn.testNodes': 'تست اتصال',
    'btn.domainSub': 'دامنه‌ها',
    'btn.rotatePath': 'مسیر جدید', 'btn.addToYx': 'افزودن به آدرس‌های دستی', 'btn.connectS': 'اتصال به پروکسی خروجی',
    'scan.colCountry': 'کشور', 'scan.colAddr': 'آدرس / پورت', 'scan.colType': 'نوع / پروتکل',
    'scan.colPing': 'پینگ', 'scan.colStatus': 'وضعیت', 'scan.colAction': 'عملیات',
    'scan.online': 'آنلاین', 'scan.unverified': 'پیشنهادی', 'scan.ipStatic': 'آی‌پی ثابت',
    'scan.proxy': 'پروکسی', 'scan.domain': 'دامنه', 'scan.idle': 'برای شروع، دریافت و تست را بزنید.',
    'scan.testing': 'در حال تست...', 'scan.none': 'موردی یافت نشد.',
    'toast.copied': 'در حافظه کپی شد', 'toast.linkCopied': 'لینک کپی شد',
    'toast.masterCopied': 'ساب‌لینک اصلی کپی شد', 'toast.saveOk': 'تنظیمات ذخیره شد',
    'toast.saveErr': 'خطا در ذخیره تنظیمات', 'toast.network': 'خطای شبکه',
    'toast.testingNodes': 'در حال تست اتصال نودها...', 'toast.rotateConfirm': 'مسیر مدیریت عوض شود؟ مسیر قبلی دیگر کار نمی‌کند.'
  },
  en: {
    'nav.dashboard': 'Dashboard', 'nav.users': 'Users', 'nav.settings': 'Settings',
    'nav.scanner': 'Scanner', 'nav.locations': 'Locations',
    'top.support': 'Support', 'top.multi': 'Locations', 'top.theme': 'Light mode', 'top.lang': 'فارسی',
    'panel.dashboard': 'Dashboard', 'panel.dashboardSub': 'Live system status and usage',
    'panel.users': 'Users', 'panel.usersSub': 'Subscriptions and limits',
    'panel.settings': 'Settings', 'panel.settingsSub': 'Proxy core, network and panel',
    'panel.scanner': 'Live scanner', 'panel.scannerSub': 'Live proxies and static IPs (IPv4/IPv6) by country',
    'panel.locations': 'Locations', 'panel.locationsSub': 'Country-specific subscriptions',
    'btn.reload': 'Refresh', 'btn.createUser': 'Create user', 'btn.newUser': 'New user',
    'btn.save': 'Save settings', 'btn.reset': 'Reset defaults', 'btn.copyMaster': 'Copy master subscription',
    'btn.scan': 'Fetch & test', 'btn.password': 'Change admin password',
    'metric.users': 'Active users', 'metric.traffic': 'Traffic used',
    'metric.ips': 'Healthy IPs', 'metric.protocols': 'Active protocols',
    'settings.protocols': 'Protocols & features', 'settings.network': 'Network & transport', 'settings.panel': 'Panel & security',
    'scanner.country': 'Country', 'scanner.kind': 'Type', 'scanner.family': 'IP family',
    'scanner.count': 'Count',    'scanner.addCfIps': 'Add Cloudflare default IPs to manual addresses',
    'scanner.addCfDomains': 'Add Cloudflare default domains to manual addresses',
    'btn.editUser': 'Edit', 'card.nodesAuto': 'Nodes: automatic',
    'modal.create': 'Create new user', 'modal.username': 'Username', 'modal.preset': 'Preset',
    'modal.limit': 'Data limit (GB) — 0 for unlimited', 'modal.days': 'Validity (days) — 0 for never',
    'modal.nodes': 'Nodes in subscription', 'modal.createBtn': 'Create user', 'modal.cancel': 'Cancel',
    'modal.advanced': 'Unique settings for this user',
    'modal.password': 'Change admin password', 'modal.old': 'Current password', 'modal.new': 'New password',
    'modal.confirmNew': 'Confirm new password', 'modal.savePassword': 'Save password',
    'field.echDomain': 'ECH domain', 'field.dns': 'Custom DNS (DoH)', 'field.fragPreset': 'Fragment preset',
    'field.ports': 'Node ports', 'field.fp': 'TLS fingerprint', 'field.patt': 'Path pattern',
    'field.rotation': 'IP rotation', 'field.proxyIP': 'Custom proxy address', 'field.locCount': 'Location node count',
    'field.outProxy': 'Outbound proxy', 'field.dnsHint': 'Pick a DNS from the list or type a custom DoH value.',
    'field.adminPath': 'Random admin path', 'field.customPath': 'Custom panel path',
    'field.homepage': 'Camouflage page', 'field.yx': 'Manual addresses', 'field.nodeCount': 'Nodes per user',
    'warn.title': 'Settings conflict warning:',
    'card.usage': 'Usage', 'card.expiry': 'Expiry', 'card.unlimited': 'Unlimited',
    'card.noExpiry': 'No expiry', 'card.nodes': 'nodes', 'card.active': 'Active',
    'card.inactive': 'Disabled', 'card.preset': 'Preset', 'card.subscription': 'Active subscription',
    'btn.copySub': 'Sub', 'btn.status': 'Status', 'btn.resetUser': 'Reset', 'btn.testNodes': 'Test',
    'btn.domainSub': 'Domains',
    'btn.rotatePath': 'New path', 'btn.addToYx': 'Add to manual addresses', 'btn.connectS': 'Connect to egress proxy',
    'scan.colCountry': 'Country', 'scan.colAddr': 'Address / port', 'scan.colType': 'Type / protocol',
    'scan.colPing': 'Ping', 'scan.colStatus': 'Status', 'scan.colAction': 'Action',
    'scan.online': 'Online', 'scan.unverified': 'Suggested', 'scan.ipStatic': 'Static IP',
    'scan.proxy': 'Proxy', 'scan.domain': 'Domain', 'scan.idle': 'Press fetch & test to start.',
    'scan.testing': 'Testing...', 'scan.none': 'Nothing found.',
    'toast.copied': 'Copied', 'toast.linkCopied': 'Link copied',
    'toast.masterCopied': 'Master subscription copied', 'toast.saveOk': 'Settings saved',
    'toast.saveErr': 'Failed to save settings', 'toast.network': 'Network error',
    'toast.testingNodes': 'Testing node connectivity...', 'toast.rotateConfirm': 'Rotate the admin path? The old path will stop working.'
  }
};

function countryOptions() {
  return Object.entries(COUNTRY_PROXY_SOURCES)
    .map(([code, c]) => `<option value="${code}">${c.name} — ${code}</option>`)
    .join('');
}

export function renderAdminDashboardHtml(initialData = {}) {
  const config = initialData.config || CONFIG_DEFAULTS;
  const safeInitialJson = JSON.stringify({
    brand: BRAND_NAME,
    version: VERSION,
    defaults: CONFIG_DEFAULTS,
    presets: USER_PRESETS,
    config,
    users: initialData.users || [],
    diagnostics: initialData.diagnostics || {},
    adminPath: initialData.adminPath || '',
    // فقط نام کشورها به کلاینت می‌رود (آدرس منابع داخلی لازم نیست در صفحه باشد)
    countrySources: Object.keys(COUNTRY_PROXY_SOURCES).reduce(function(acc, code) {
      var item = COUNTRY_PROXY_SOURCES[code] || {};
      acc[code] = { name: item.name || code, flag: item.flag || '' };
      return acc;
    }, {}),
    vipCountries: EDGE_VIP_COUNTRIES,
    // استخر آی‌پی اختصاصی؛ برای انتخاب تصادفی در پنجرهٔ تنظیمات کاربر و ساخت ساب /ips
    ipPool: IP_POOL,
    ipPoolCountries: IP_POOL_COUNTRIES,
    ipPoolCountryNames: IP_POOL_COUNTRY_NAMES,
    ipPoolPath: '/ips',
    maxUsersLimit: MAX_USERS_LIMIT,
    telegramSupport: TELEGRAM_SUPPORT,
    dnsPresets: DNS_PRESETS,
    portChoices: CF_PORT_CHOICES,
    echDomains: ECH_DOMAINS,
    fragmentPresets: FRAGMENT_PRESETS,
    pathPatterns: PATH_PATTERNS,
    fingerprints: FINGERPRINT_PRESETS,
    officialIps: initialData.officialIps || [],
    officialIpv6: initialData.officialIpv6 || [],
    directDomains: initialData.directDomains || [],
    i18n: PANEL_I18N
  }).replace(/</g, '\\u003c');

  const clientIcons = JSON.stringify({
    copy: icon('copy'),
    trash: icon('trash'),
    refresh: icon('refresh'),
    plus: icon('plus'),
    link: icon('link'),
    external: icon('external'),
    bolt: icon('bolt'),
    globe: icon('globe'),
    radar: icon('radar'),
    gauge: icon('gauge'),
    check: icon('check'),
    clock: icon('clock'),
    power: icon('power'),
    layers: icon('layers'),
    download: icon('download'),
    zip: icon('zip'),
    server: icon('server'),
    terminal: icon('terminal'),
    signal: icon('signal'),
    settings: icon('settings'),
    edit: icon('settings'),
    sanctions: icon('sanctions'),
    warp: icon('warp'),
    dns: icon('dns'),
    pin: icon('pin'),
    api: icon('api'),
    pulse: icon('pulse'),
    telegram: icon('telegram'),
    back: icon('back'),
    stop: icon('stop'),
    sun: icon('sun'),
    moon: icon('moon'),
    palette: icon('palette'),
    sparkles: icon('sparkles')
  });

  const ssmethods = ['none'];
  const ipRotationOptions = [
    ['off', 'غیرفعال'],
    ['5m', 'هر ۵ دقیقه'],
    ['15m', 'هر ۱۵ دقیقه'],
    ['30m', 'هر ۳۰ دقیقه'],
    ['1h', 'هر ۱ ساعت'],
    ['24h', 'هر ۲۴ ساعت']
  ];

  const presetOptions = Object.entries(USER_PRESETS)
    .map(([id, p]) => `<option value="${id}">${p.title || id}</option>`)
    .join('');

  return stripEmoji(`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${BRAND_UPPER} ${VERSION} — مرکز کنترل</title>
<link rel="icon" href="${FAVICON_DATA_URI}">
${PWA_HEAD_TAGS}
<script>
// ——— عیب‌یابی: هر خطای اجرایی را روی صفحه نشان بده (نه سکوت) ———
(function() {
  var shown = false;
  function banner(title, detail) {
    if (shown) return; shown = true;
    try {
      var box = document.createElement('div');
      box.setAttribute('dir', 'rtl');
      box.style.cssText = 'position:fixed;z-index:99999;left:0;right:0;top:0;padding:10px 14px;background:#3a0d0d;color:#ffd9d9;font:12px/1.8 system-ui,Tahoma,sans-serif;border-bottom:1px solid #a33;text-align:right';
      box.textContent = title + (detail ? ' | ' + detail : '');
      (document.body || document.documentElement).appendChild(box);
      window.__miliBootError = box.textContent;
    } catch (e) {}
  }
  window.__miliDiag = { ready: false, banner: banner };
  window.addEventListener('error', function(e) {
    banner('خطای اجرای پنل: ' + ((e && e.message) || 'نامشخص'), ((e && e.filename) || '') + ':' + ((e && e.lineno) || ''));
  });
  window.addEventListener('unhandledrejection', function(e) {
    var r = e && e.reason;
    banner('خطای غیرمنتظره: ' + ((r && r.message) || String(r || '')), '');
  });
  setTimeout(function() {
    if (!window.__miliDiag.ready && !shown) {
      banner('اسکریپت پنل اجرا نشد؛ صفحه را با Ctrl+F5 (پاک‌کردن کش) باز کنید.', 'در صورت تکرار این پیام را بفرستید.');
    }
  }, 4000);
})();
</script>
<style>
  :root {
    --bg: #05080a;
    --bg-rgb: 5, 8, 10;
    --bg-soft: #070c0e;
    --panel: rgba(9, 15, 13, 0.92);
    --panel-2: rgba(12, 20, 16, 0.9);
    --line: rgba(var(--neon-rgb), 0.13);
    --line-strong: rgba(var(--neon-rgb), 0.34);
    --neon: #b5ff4d;
    --neon-rgb: 181, 255, 77;
    --neon-soft: rgba(var(--neon-rgb), 0.1);
    --neon-glow: rgba(var(--neon-rgb), 0.28);
    --text: #e9f3e2;
    --muted: #85957f;
    --muted-2: #5d6b59;
    --danger: #ff6262;
    --warn: #ffce5c;
    --info: #63e6d4;
    --info-rgb: 99, 230, 212;
    --radius: 18px;
    --window-radius: 18px;
    --btn-radius: 11px;
    --icon-radius: 11px;
    --tab-radius: 14px;
    --tabbar-radius: 20px;
    --card-radius: 15px;
    --shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
    --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
    --font: "Vazirmatn", "Segoe UI", Tahoma, system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding-bottom: 48px;
    -webkit-font-smoothing: antialiased;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(900px 480px at 82% -8%, rgba(var(--neon-rgb), 0.11), transparent 65%),
      radial-gradient(700px 420px at 8% 4%, rgba(var(--info-rgb), 0.06), transparent 60%),
      linear-gradient(180deg, var(--bg-soft) 0%, var(--bg) 100%);
  }
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(var(--neon-rgb), 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(var(--neon-rgb), 0.035) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 78%);
    opacity: 0.55;
    pointer-events: none;
  }
  /* ---------- light theme (پنل، نه فقط صفحه ورود) ---------- */
  body.light-mode {
    --bg: #eef3f0;
    --bg-rgb: 238, 243, 240;
    --bg-soft: #f7faf8;
    --panel: rgba(255, 255, 255, 0.94);
    --panel-2: rgba(248, 252, 249, 0.94);
    --line: rgba(6, 118, 71, 0.16);
    --line-strong: rgba(6, 118, 71, 0.38);
    --neon: #0b8a4b;
    --neon-rgb: 11, 138, 75;
    --neon-soft: rgba(11, 138, 75, 0.1);
    --neon-glow: rgba(11, 138, 75, 0.22);
    --info: #0284c7;
    --info-rgb: 2, 132, 199;
    --text: #0c1a12;
    --muted: #5a6d60;
    --muted-2: #7a8b7f;
    --shadow: 0 20px 50px rgba(15, 40, 25, 0.12);
  }
  body.light-mode::before {
    background:
      radial-gradient(900px 480px at 82% -8%, rgba(11, 138, 75, 0.1), transparent 65%),
      radial-gradient(700px 420px at 8% 4%, rgba(2, 132, 199, 0.08), transparent 60%),
      linear-gradient(180deg, #f7faf8 0%, #eaf0ec 100%);
  }
  body.light-mode::after {
    background-image:
      linear-gradient(rgba(11, 138, 75, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(11, 138, 75, 0.05) 1px, transparent 1px);
    opacity: 0.7;
  }
  body.light-mode .topbar { background: rgba(250, 253, 251, 0.9); }
  body.light-mode .window { background: linear-gradient(180deg, #ffffff, #f6faf7); }
  body.light-mode .metric,
  body.light-mode .card,
  body.light-mode .user-card,
  body.light-mode .loc-card { background: #ffffff; }

  body.light-mode .modal-card { background: #ffffff; }
  body.light-mode .toast-body { background: #ffffff; color: #0c1a12; }
  body.light-mode .field input,
  body.light-mode .field select,
  body.light-mode .field textarea { background: #ffffff; color: #0c1a12; border-color: var(--line); }
  body.light-mode .btn { background: #ffffff; color: #0c1a12; }
  body.light-mode .btn.primary { color: #06130b; }
  body.light-mode table.scan th { background: rgba(11, 138, 75, 0.06); }
  body.light-mode .icon-btn { background: #ffffff; color: #0c1a12; }
  body.light-mode .chip { background: #ffffff; }
  body.light-mode .scan-status { color: #5a6d60; }

  body.light-mode .switch i { background: #cfdcd4; }

  /* ---------- قالب‌های ظاهری (تم) — پیش‌فرض: سبز نئونی ---------- */
  body[data-theme="cyan"]:not(.light-mode) {
    --bg: #040b10;
    --bg-rgb: 4, 11, 16;
    --bg-soft: #06131a;
    --panel: rgba(6, 18, 25, 0.94);
    --panel-2: rgba(8, 24, 32, 0.92);
    --line: rgba(57, 230, 255, 0.14);
    --line-strong: rgba(57, 230, 255, 0.4);
    --neon: #39e6ff;
    --neon-rgb: 57, 230, 255;
    --neon-soft: rgba(57, 230, 255, 0.1);
    --neon-glow: rgba(57, 230, 255, 0.32);
    --info: #8b7bff;
    --info-rgb: 139, 123, 255;
    --text: #e2f6fc;
    --muted: #7b98a5;
    --muted-2: #55707c;
    --shadow: 0 24px 60px rgba(0, 8, 14, 0.6);
  }
  body[data-theme="violet"]:not(.light-mode) {
    --bg: #080611;
    --bg-rgb: 8, 6, 17;
    --bg-soft: #0d0a1a;
    --panel: rgba(16, 12, 27, 0.94);
    --panel-2: rgba(22, 16, 36, 0.92);
    --line: rgba(179, 136, 255, 0.16);
    --line-strong: rgba(179, 136, 255, 0.42);
    --neon: #b388ff;
    --neon-rgb: 179, 136, 255;
    --neon-soft: rgba(179, 136, 255, 0.1);
    --neon-glow: rgba(179, 136, 255, 0.32);
    --info: #58d8ff;
    --info-rgb: 88, 216, 255;
    --text: #efe9ff;
    --muted: #9489ad;
    --muted-2: #6c6185;
    --shadow: 0 24px 60px rgba(8, 4, 18, 0.62);
  }
  body[data-theme="amber"]:not(.light-mode) {
    --bg: #0b0803;
    --bg-rgb: 11, 8, 3;
    --bg-soft: #141006;
    --panel: rgba(24, 18, 8, 0.94);
    --panel-2: rgba(32, 24, 10, 0.92);
    --line: rgba(255, 176, 32, 0.16);
    --line-strong: rgba(255, 176, 32, 0.42);
    --neon: #ffb020;
    --neon-rgb: 255, 176, 32;
    --neon-soft: rgba(255, 176, 32, 0.1);
    --neon-glow: rgba(255, 176, 32, 0.3);
    --info: #ff7a59;
    --info-rgb: 255, 122, 89;
    --text: #fdf1dc;
    --muted: #b09a7a;
    --muted-2: #836f55;
    --shadow: 0 24px 60px rgba(12, 7, 0, 0.6);
  }
  body[data-theme="rose"]:not(.light-mode) {
    --bg: #0c0508;
    --bg-rgb: 12, 5, 8;
    --bg-soft: #15090f;
    --panel: rgba(26, 10, 17, 0.94);
    --panel-2: rgba(35, 13, 22, 0.92);
    --line: rgba(255, 84, 112, 0.16);
    --line-strong: rgba(255, 84, 112, 0.42);
    --neon: #ff5470;
    --neon-rgb: 255, 84, 112;
    --neon-soft: rgba(255, 84, 112, 0.11);
    --neon-glow: rgba(255, 84, 112, 0.32);
    --info: #ff9f6e;
    --info-rgb: 255, 159, 110;
    --text: #ffe8ee;
    --muted: #b1899a;
    --muted-2: #855f70;
    --shadow: 0 24px 60px rgba(14, 3, 8, 0.62);
  }
  body[data-theme="emerald"]:not(.light-mode) {
    --bg: #010a06;
    --bg-rgb: 1, 10, 6;
    --bg-soft: #03150d;
    --panel: rgba(4, 24, 15, 0.94);
    --panel-2: rgba(6, 31, 20, 0.92);
    --line: rgba(43, 255, 158, 0.14);
    --line-strong: rgba(43, 255, 158, 0.42);
    --neon: #2bff9e;
    --neon-rgb: 43, 255, 158;
    --neon-soft: rgba(43, 255, 158, 0.1);
    --neon-glow: rgba(43, 255, 158, 0.3);
    --info: #5cffd6;
    --info-rgb: 92, 255, 214;
    --text: #e4fff4;
    --muted: #83ab9a;
    --muted-2: #5a7a6a;
    --shadow: 0 24px 60px rgba(0, 8, 4, 0.7);
  }

  /* ==========================================================================
     پوستهٔ ساختاری تم‌ها — هر تم فقط رنگ نیست؛ شکل دکمه‌ها، آیکون‌ها، تب‌ها،
     کارت‌ها، هدر و بافت پس‌زمینه هم عوض می‌شود.
     ========================================================================== */

  /* ---- نئون سبز: زاویه‌دار، ترمینالی، خطوط اسکن ---- */
  body[data-theme="neon"]:not(.light-mode) {
    --window-radius: 12px; --btn-radius: 7px; --icon-radius: 8px;
    --tab-radius: 9px; --tabbar-radius: 14px; --card-radius: 10px;
  }
  body[data-theme="neon"]:not(.light-mode) .brand-name { font-family: var(--mono); letter-spacing: 0.6px; }
  body[data-theme="neon"]:not(.light-mode) .window-head {
    background:
      repeating-linear-gradient(180deg, rgba(var(--neon-rgb), 0.06) 0 1px, transparent 1px 4px),
      linear-gradient(90deg, rgba(var(--neon-rgb), 0.09), transparent 58%);
  }
  body[data-theme="neon"]:not(.light-mode) .window-title { font-family: var(--mono); }
  body[data-theme="neon"]:not(.light-mode) .window-title .mi { filter: drop-shadow(0 0 7px var(--neon-glow)); }
  body[data-theme="neon"]:not(.light-mode) .metric-icon {
    padding: 4px; border: 1px solid var(--line-strong); border-radius: 5px;
    background: var(--neon-soft); box-sizing: content-box;
  }
  body[data-theme="neon"]:not(.light-mode) .btn.primary {
    background: linear-gradient(180deg, var(--neon), #8fd52f); color: #08130a;
    box-shadow: 0 0 0 1px rgba(var(--neon-rgb), 0.45), 0 12px 28px -14px var(--neon);
  }
  body[data-theme="neon"]:not(.light-mode) .btn.primary:hover { background: linear-gradient(180deg, #c8ff77, #a2e83a); }
  body[data-theme="neon"]:not(.light-mode) .icon-btn { background: rgba(var(--neon-rgb), 0.05); }
  body[data-theme="neon"]:not(.light-mode) .icon-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -16px var(--neon); }
  body[data-theme="neon"]:not(.light-mode) .tab.is-active { background: linear-gradient(180deg, rgba(var(--neon-rgb), 0.18), rgba(var(--neon-rgb), 0.04)); }
  body[data-theme="neon"]:not(.light-mode) .tab.is-active::after { width: 18px; height: 2px; border-radius: 2px; bottom: 6px; }

  /* ---- نئون سبز تیره: زمردی، هالهٔ نرم، حلقه‌های نور ---- */
  body[data-theme="emerald"]:not(.light-mode) {
    --window-radius: 22px; --btn-radius: 13px; --icon-radius: 50%;
    --tab-radius: 999px; --tabbar-radius: 26px; --card-radius: 18px;
  }
  body[data-theme="emerald"]:not(.light-mode) .topbar {
    background: rgba(2, 16, 10, 0.7);
    border-bottom-color: rgba(43, 255, 158, 0.16);
  }
  body[data-theme="emerald"]:not(.light-mode) .brand .mili-shield-svg { filter: drop-shadow(0 0 12px rgba(43, 255, 158, 0.42)); }
  body[data-theme="emerald"]:not(.light-mode) .window {
    background:
      radial-gradient(680px 320px at 100% 0%, rgba(92, 255, 214, 0.08), transparent 60%),
      radial-gradient(620px 420px at 0% 100%, rgba(43, 255, 158, 0.07), transparent 64%),
      linear-gradient(165deg, rgba(5, 28, 18, 0.94), rgba(2, 12, 8, 0.97));
    border-color: rgba(43, 255, 158, 0.22);
    box-shadow: 0 34px 80px -52px rgba(43, 255, 158, 0.55), inset 0 1px 0 rgba(180, 255, 222, 0.09);
    backdrop-filter: blur(10px);
  }
  body[data-theme="emerald"]:not(.light-mode) .window-head {
    background:
      radial-gradient(420px 80px at 12% 0%, rgba(43, 255, 158, 0.16), transparent 70%),
      linear-gradient(90deg, rgba(43, 255, 158, 0.1), transparent 65%);
    border-bottom-color: rgba(43, 255, 158, 0.16);
  }
  body[data-theme="emerald"]:not(.light-mode) .window-title .mi { color: var(--neon); filter: drop-shadow(0 0 8px var(--neon-glow)); }
  body[data-theme="emerald"]:not(.light-mode) .metric {
    background:
      radial-gradient(260px 150px at 100% 0%, rgba(43, 255, 158, 0.13), transparent 70%),
      linear-gradient(160deg, rgba(7, 34, 22, 0.82), rgba(3, 18, 12, 0.9));
    border-color: rgba(43, 255, 158, 0.2);
    box-shadow: inset 0 1px 0 rgba(180, 255, 222, 0.05), 0 18px 38px -34px rgba(43, 255, 158, 0.6);
  }
  body[data-theme="emerald"]:not(.light-mode) .metric::after {
    background: linear-gradient(180deg, var(--neon), rgba(92, 255, 214, 0.2), transparent);
    box-shadow: 0 0 12px var(--neon-glow);
  }
  body[data-theme="emerald"]:not(.light-mode) .metric-icon {
    padding: 5px; border-radius: 50%; box-sizing: content-box;
    background: radial-gradient(circle at 35% 30%, rgba(43, 255, 158, 0.28), rgba(43, 255, 158, 0.06));
    border: 1px solid rgba(43, 255, 158, 0.34);
    box-shadow: 0 0 18px -6px rgba(43, 255, 158, 0.55);
  }
  body[data-theme="emerald"]:not(.light-mode) .metric-value { text-shadow: 0 0 18px rgba(43, 255, 158, 0.22); }
  body[data-theme="emerald"]:not(.light-mode) .btn {
    background: rgba(43, 255, 158, 0.055);
    border-color: rgba(43, 255, 158, 0.24);
  }
  body[data-theme="emerald"]:not(.light-mode) .btn:hover { background: rgba(43, 255, 158, 0.14); }
  body[data-theme="emerald"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #22e08a, #6dffc2);
    color: #01130a;
    box-shadow: 0 0 0 1px rgba(43, 255, 158, 0.4), 0 16px 34px -18px rgba(43, 255, 158, 0.9);
  }
  body[data-theme="emerald"]:not(.light-mode) .btn.primary:hover { background: linear-gradient(120deg, #36f39c, #8affd0); filter: none; }
  body[data-theme="emerald"]:not(.light-mode) .icon-btn {
    background: rgba(43, 255, 158, 0.06);
    border-color: rgba(43, 255, 158, 0.22);
  }
  body[data-theme="emerald"]:not(.light-mode) .icon-btn:hover {
    background: rgba(43, 255, 158, 0.16); color: var(--neon);
    box-shadow: 0 10px 24px -14px rgba(43, 255, 158, 0.9);
  }
  body[data-theme="emerald"]:not(.light-mode) .tabbar-pill {
    background: rgba(2, 18, 11, 0.82);
    border-color: rgba(43, 255, 158, 0.2);
    box-shadow: 0 18px 50px rgba(0, 8, 4, 0.7), inset 0 1px 0 rgba(140, 255, 202, 0.08);
  }
  body[data-theme="emerald"]:not(.light-mode) .tab { border-radius: 999px; }
  body[data-theme="emerald"]:not(.light-mode) .tab.is-active {
    background: radial-gradient(120% 140% at 50% 0%, rgba(43, 255, 158, 0.3), rgba(43, 255, 158, 0.08));
    border-color: rgba(43, 255, 158, 0.45); color: #d6ffe9;
    box-shadow: 0 0 22px -10px rgba(43, 255, 158, 0.95), inset 0 0 12px rgba(43, 255, 158, 0.06);
  }
  body[data-theme="emerald"]:not(.light-mode) .tab.is-active::after { display: none; }
  body[data-theme="emerald"]:not(.light-mode) .card,
  body[data-theme="emerald"]:not(.light-mode) .user-card,
  body[data-theme="emerald"]:not(.light-mode) .loc-card {
    background:
      radial-gradient(220px 120px at 100% 0%, rgba(92, 255, 214, 0.07), transparent 65%),
      linear-gradient(160deg, rgba(6, 32, 20, 0.76), rgba(3, 16, 10, 0.72));
    border-color: rgba(43, 255, 158, 0.18);
    box-shadow: inset 0 1px 0 rgba(180, 255, 222, 0.04);
  }
  body[data-theme="emerald"]:not(.light-mode) .modal-card { border-color: rgba(43, 255, 158, 0.24); box-shadow: 0 30px 80px -50px rgba(43, 255, 158, 0.5); }
  body[data-theme="emerald"]:not(.light-mode)::before {
    background:
      radial-gradient(900px 560px at 88% -10%, rgba(43, 255, 158, 0.16), transparent 62%),
      radial-gradient(760px 520px at 0% 104%, rgba(92, 255, 214, 0.11), transparent 64%),
      linear-gradient(180deg, #03150d, #010805 78%);
  }
  body[data-theme="emerald"]:not(.light-mode)::after {
    background-image: radial-gradient(rgba(43, 255, 158, 0.16) 1px, transparent 1.4px);
    background-size: 26px 26px; opacity: 0.45;
  }

  /* ---- سایبر آبی: شیشهٔ اقیانوسی، دکمهٔ کپسولی، آیکون گرد ---- */
  body[data-theme="cyan"]:not(.light-mode) {
    --window-radius: 26px; --btn-radius: 999px; --icon-radius: 50%;
    --tab-radius: 16px; --tabbar-radius: 28px; --card-radius: 22px;
  }
  body[data-theme="cyan"]:not(.light-mode) .topbar {
    background: rgba(4, 11, 16, 0.62); border-bottom-color: rgba(57, 230, 255, 0.16);
    box-shadow: 0 18px 44px -34px #39e6ff;
  }
  body[data-theme="cyan"]:not(.light-mode) .brand .mili-shield-svg { filter: drop-shadow(0 0 10px rgba(57, 230, 255, 0.4)); }
  body[data-theme="cyan"]:not(.light-mode) .window {
    background: linear-gradient(165deg, rgba(16, 42, 54, 0.74), rgba(5, 14, 20, 0.92));
    border-color: rgba(57, 230, 255, 0.2);
    box-shadow: 0 30px 70px -40px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(10px);
  }
  body[data-theme="cyan"]:not(.light-mode) .window-head {
    background: linear-gradient(90deg, rgba(57, 230, 255, 0.12), rgba(139, 123, 255, 0.09) 55%, transparent);
    border-bottom-color: rgba(57, 230, 255, 0.14);
  }
  body[data-theme="cyan"]:not(.light-mode) .dots { display: none; }
  body[data-theme="cyan"]:not(.light-mode) .window-title .mi {
    padding: 5px; border-radius: 50%; background: rgba(57, 230, 255, 0.12);
    box-sizing: content-box; width: 16px; height: 16px;
  }
  body[data-theme="cyan"]:not(.light-mode) .metric {
    aspect-ratio: 4 / 3;
    background:
      radial-gradient(120% 90% at 100% 0%, rgba(57, 230, 255, 0.15), transparent 62%),
      linear-gradient(160deg, rgba(20, 52, 66, 0.58), rgba(8, 20, 28, 0.62));
    border-color: rgba(57, 230, 255, 0.16);
  }
  body[data-theme="cyan"]:not(.light-mode) .metric::after { display: none; }
  body[data-theme="cyan"]:not(.light-mode) .metric-icon {
    width: 30px; height: 30px; border-radius: 50%; box-sizing: border-box;
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(57, 230, 255, 0.12); border: 1px solid rgba(57, 230, 255, 0.26);
  }
  body[data-theme="cyan"]:not(.light-mode) .metric-icon .mi { width: 16px; height: 16px; }
  body[data-theme="cyan"]:not(.light-mode) .btn { padding: 9px 17px; background: rgba(57, 230, 255, 0.06); border-color: rgba(57, 230, 255, 0.22); }
  body[data-theme="cyan"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #39e6ff, #8b7bff); color: #041016;
    box-shadow: 0 14px 32px -14px rgba(57, 230, 255, 0.75);
  }
  body[data-theme="cyan"]:not(.light-mode) .btn.primary:hover { background: linear-gradient(120deg, #62edff, #a294ff); filter: none; }
  body[data-theme="cyan"]:not(.light-mode) .icon-btn { background: rgba(57, 230, 255, 0.06); border-color: rgba(57, 230, 255, 0.2); }
  body[data-theme="cyan"]:not(.light-mode) .icon-btn:hover {
    transform: translateY(-2px); background: rgba(57, 230, 255, 0.16);
    box-shadow: 0 8px 22px -12px rgba(57, 230, 255, 0.8);
  }
  body[data-theme="cyan"]:not(.light-mode) .tabbar-pill {
    background: rgba(6, 20, 28, 0.74); border-color: rgba(57, 230, 255, 0.18);
    box-shadow: 0 24px 60px -30px #000, inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  body[data-theme="cyan"]:not(.light-mode) .tab.is-active {
    background: linear-gradient(180deg, rgba(57, 230, 255, 0.24), rgba(139, 123, 255, 0.12));
    border-color: rgba(57, 230, 255, 0.36);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 12px 26px -20px #39e6ff;
  }
  body[data-theme="cyan"]:not(.light-mode) .tab.is-active::after { width: 6px; height: 6px; }
  body[data-theme="cyan"]:not(.light-mode) .card,
  body[data-theme="cyan"]:not(.light-mode) .user-card { background: linear-gradient(160deg, rgba(24, 58, 72, 0.36), rgba(8, 20, 28, 0.36)); }
  body[data-theme="cyan"]:not(.light-mode)::before {
    background:
      radial-gradient(820px 520px at 88% -10%, rgba(57, 230, 255, 0.2), transparent 62%),
      radial-gradient(760px 520px at 0% 108%, rgba(139, 123, 255, 0.17), transparent 62%),
      linear-gradient(180deg, #040b10, #02070a);
  }
  body[data-theme="cyan"]:not(.light-mode)::after {
    background-image: radial-gradient(rgba(57, 230, 255, 0.16) 1px, transparent 1.4px);
    background-size: 26px 26px; opacity: 0.5;
  }

  /* ---- کوانتوم بنفش: هولوگرافیک، گوشه‌های بریده، خطوط داده ---- */
  body[data-theme="violet"]:not(.light-mode) {
    --window-radius: 6px; --btn-radius: 4px; --icon-radius: 7px;
    --tab-radius: 6px; --tabbar-radius: 8px; --card-radius: 8px;
  }
  body[data-theme="violet"]:not(.light-mode) .window,
  body[data-theme="violet"]:not(.light-mode) .card,
  body[data-theme="violet"]:not(.light-mode) .user-card,
  body[data-theme="violet"]:not(.light-mode) .modal-card,
  body[data-theme="violet"]:not(.light-mode) .metric {
    clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
  }
  body[data-theme="violet"]:not(.light-mode) .window {
    background: linear-gradient(155deg, rgba(22, 16, 40, 0.96), rgba(8, 6, 18, 0.97));
    border-color: rgba(179, 136, 255, 0.24);
  }
  body[data-theme="violet"]:not(.light-mode) .window-head {
    background: linear-gradient(90deg, rgba(179, 136, 255, 0.16), rgba(88, 216, 255, 0.09) 55%, transparent);
  }
  body[data-theme="violet"]:not(.light-mode) .window-head::after {
    content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--neon), var(--info), transparent);
    opacity: 0.75; animation: mili-scan-x 5s linear infinite;
  }
  body[data-theme="violet"]:not(.light-mode) .window-title { text-transform: uppercase; letter-spacing: 0.8px; font-size: 0.86rem; }
  body[data-theme="violet"]:not(.light-mode) .window-title .mi { filter: drop-shadow(0 0 8px rgba(179, 136, 255, 0.8)); }
  body[data-theme="violet"]:not(.light-mode) .metric {
    background:
      repeating-linear-gradient(0deg, rgba(179, 136, 255, 0.05) 0 1px, transparent 1px 22px),
      repeating-linear-gradient(90deg, rgba(88, 216, 255, 0.05) 0 1px, transparent 1px 22px),
      linear-gradient(160deg, rgba(30, 20, 54, 0.9), rgba(11, 8, 22, 0.96));
  }
  body[data-theme="violet"]:not(.light-mode) .metric::after {
    width: 3px; top: 12px; bottom: 12px;
    background: linear-gradient(180deg, var(--info), var(--neon), transparent);
  }
  body[data-theme="violet"]:not(.light-mode) .metric-value { font-family: var(--mono); }
  body[data-theme="violet"]:not(.light-mode) .btn { letter-spacing: 0.4px; }
  body[data-theme="violet"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #b388ff, #58d8ff); color: #0b0618;
    box-shadow: 0 0 0 1px rgba(179, 136, 255, 0.5), 0 14px 34px -16px #b388ff;
  }
  body[data-theme="violet"]:not(.light-mode) .btn.primary:hover { background: linear-gradient(120deg, #c8a6ff, #7ce3ff); }
  body[data-theme="violet"]:not(.light-mode) .icon-btn { background: rgba(179, 136, 255, 0.07); border-color: rgba(179, 136, 255, 0.24); }
  body[data-theme="violet"]:not(.light-mode) .icon-btn:hover { background: rgba(179, 136, 255, 0.16); box-shadow: 0 0 20px -8px #b388ff; }
  body[data-theme="violet"]:not(.light-mode) .tab { border-radius: 4px; letter-spacing: 0.5px; }
  body[data-theme="violet"]:not(.light-mode) .tab.is-active {
    background: linear-gradient(180deg, rgba(179, 136, 255, 0.22), rgba(88, 216, 255, 0.08));
    border-color: rgba(179, 136, 255, 0.4);
  }
  body[data-theme="violet"]:not(.light-mode) .tab.is-active::after {
    width: 100%; height: 2px; border-radius: 0; bottom: 0; box-shadow: none;
    background: linear-gradient(90deg, transparent, var(--neon), var(--info), transparent);
  }
  body[data-theme="violet"]:not(.light-mode) .brand-name { letter-spacing: 1.6px; }
  body[data-theme="violet"]:not(.light-mode)::before {
    background:
      radial-gradient(900px 500px at 80% -12%, rgba(179, 136, 255, 0.2), transparent 60%),
      radial-gradient(620px 460px at 4% 100%, rgba(88, 216, 255, 0.12), transparent 62%),
      linear-gradient(180deg, #0d0a1a, #05040c);
  }
  body[data-theme="violet"]:not(.light-mode)::after {
    background-image:
      linear-gradient(rgba(179, 136, 255, 0.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(88, 216, 255, 0.07) 1px, transparent 1px);
    background-size: 58px 58px; opacity: 0.55;
  }

  /* ---- کهربایی: صنعتی، ترمینال قدیمی، گوشه‌های تیز و قاب ---- */
  body[data-theme="amber"]:not(.light-mode) {
    --window-radius: 3px; --btn-radius: 2px; --icon-radius: 2px;
    --tab-radius: 2px; --tabbar-radius: 3px; --card-radius: 3px;
  }
  body[data-theme="amber"]:not(.light-mode) .topbar {
    border-bottom: 2px solid rgba(255, 176, 32, 0.28);
    background:
      repeating-linear-gradient(90deg, rgba(255, 176, 32, 0.05) 0 2px, transparent 2px 7px),
      rgba(11, 8, 3, 0.9);
  }
  body[data-theme="amber"]:not(.light-mode) .brand-name,
  body[data-theme="amber"]:not(.light-mode) .window-title,
  body[data-theme="amber"]:not(.light-mode) .card h3 { font-family: var(--mono); letter-spacing: 0.5px; }
  body[data-theme="amber"]:not(.light-mode) .window {
    background: linear-gradient(180deg, rgba(26, 19, 8, 0.97), rgba(9, 6, 2, 0.98));
    border-color: rgba(255, 176, 32, 0.28);
    box-shadow: 0 0 0 1px rgba(255, 176, 32, 0.06) inset, 0 20px 50px rgba(0, 0, 0, 0.7);
  }
  body[data-theme="amber"]:not(.light-mode) .window-head {
    background: rgba(255, 176, 32, 0.06);
    border-bottom: 1px dashed rgba(255, 176, 32, 0.34);
  }
  body[data-theme="amber"]:not(.light-mode) .dots { display: none; }
  body[data-theme="amber"]:not(.light-mode) .window-title::before {
    content: ">"; color: var(--neon); font-family: var(--mono); font-weight: 900;
  }
  body[data-theme="amber"]:not(.light-mode) .metric {
    aspect-ratio: auto; min-height: 118px;
    background: rgba(255, 176, 32, 0.03);
    border: 1px dashed rgba(255, 176, 32, 0.34);
    border-radius: 2px;
  }
  body[data-theme="amber"]:not(.light-mode) .metric::before {
    content: ""; position: absolute; inset: 5px; border: 1px solid rgba(255, 176, 32, 0.1); pointer-events: none;
  }
  body[data-theme="amber"]:not(.light-mode) .metric::after {
    width: 4px; top: 0; bottom: 0; background: repeating-linear-gradient(180deg, var(--neon) 0 4px, transparent 4px 9px); opacity: 0.7;
  }
  body[data-theme="amber"]:not(.light-mode) .metric-value { font-family: var(--mono); }
  body[data-theme="amber"]:not(.light-mode) .metric-icon {
    padding: 3px; border: 1px solid rgba(255, 176, 32, 0.32); box-sizing: content-box; background: rgba(255, 176, 32, 0.06);
  }
  body[data-theme="amber"]:not(.light-mode) .btn { background: rgba(255, 176, 32, 0.05); border-color: rgba(255, 176, 32, 0.32); font-family: var(--mono); font-size: 0.76rem; }
  body[data-theme="amber"]:not(.light-mode) .btn:hover { background: rgba(255, 176, 32, 0.14); }
  body[data-theme="amber"]:not(.light-mode) .btn.primary { background: var(--neon); color: #120c03; box-shadow: none; }
  body[data-theme="amber"]:not(.light-mode) .btn.primary:hover { background: #ffc44d; }
  body[data-theme="amber"]:not(.light-mode) .icon-btn { background: rgba(255, 176, 32, 0.04); border-color: rgba(255, 176, 32, 0.3); }
  body[data-theme="amber"]:not(.light-mode) .icon-btn:hover { background: var(--neon); color: #120c03; border-color: var(--neon); }
  body[data-theme="amber"]:not(.light-mode) .tabbar-pill { background: rgba(11, 8, 3, 0.96); border: 1px solid rgba(255, 176, 32, 0.32); box-shadow: none; }
  body[data-theme="amber"]:not(.light-mode) .tab { border: 1px solid transparent; font-family: var(--mono); }
  body[data-theme="amber"]:not(.light-mode) .tab.is-active { background: var(--neon); color: #120c03; border-color: var(--neon); box-shadow: none; }
  body[data-theme="amber"]:not(.light-mode) .tab.is-active .mi { color: #120c03; }
  body[data-theme="amber"]:not(.light-mode) .tab.is-active::after { display: none; }
  body[data-theme="amber"]:not(.light-mode) .card,
  body[data-theme="amber"]:not(.light-mode) .user-card { border-style: dashed; background: rgba(255, 176, 32, 0.025); }
  body[data-theme="amber"]:not(.light-mode)::before {
    background:
      radial-gradient(700px 380px at 50% -10%, rgba(255, 176, 32, 0.13), transparent 65%),
      linear-gradient(180deg, #141006, #0a0703);
  }
  body[data-theme="amber"]:not(.light-mode)::after {
    background-image:
      linear-gradient(rgba(255, 176, 32, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 176, 32, 0.05) 1px, transparent 1px);
    background-size: 34px 34px; opacity: 0.6;
  }

  /* ---- آتشین: شیشهٔ نرم، کپسولی، هالهٔ گرم ---- */
  body[data-theme="rose"]:not(.light-mode) {
    --window-radius: 30px; --btn-radius: 999px; --icon-radius: 50%;
    --tab-radius: 22px; --tabbar-radius: 30px; --card-radius: 24px;
  }
  body[data-theme="rose"]:not(.light-mode) .topbar { background: rgba(21, 9, 15, 0.6); border-bottom-color: rgba(255, 84, 112, 0.16); }
  body[data-theme="rose"]:not(.light-mode) .window {
    background: linear-gradient(160deg, rgba(48, 18, 30, 0.72), rgba(15, 7, 11, 0.94));
    border-color: rgba(255, 84, 112, 0.2);
    box-shadow: 0 32px 70px -46px rgba(255, 84, 112, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
  }
  body[data-theme="rose"]:not(.light-mode) .window-head {
    background: linear-gradient(90deg, rgba(255, 84, 112, 0.13), rgba(255, 159, 110, 0.07) 55%, transparent);
    border-bottom-color: rgba(255, 84, 112, 0.14);
  }
  body[data-theme="rose"]:not(.light-mode) .dots { display: none; }
  body[data-theme="rose"]:not(.light-mode) .window-title .mi { color: var(--info); }
  body[data-theme="rose"]:not(.light-mode) .metric {
    aspect-ratio: auto; min-height: 132px;
    background:
      radial-gradient(150px 110px at 100% 0%, rgba(255, 159, 110, 0.18), transparent 70%),
      linear-gradient(160deg, rgba(46, 18, 28, 0.8), rgba(18, 8, 13, 0.85));
    border-color: rgba(255, 84, 112, 0.18);
  }
  body[data-theme="rose"]:not(.light-mode) .metric::after { display: none; }
  body[data-theme="rose"]:not(.light-mode) .metric-icon {
    width: 32px; height: 32px; border-radius: 50%; box-sizing: border-box;
    display: inline-flex; align-items: center; justify-content: center;
    background: radial-gradient(circle at 35% 30%, rgba(255, 159, 110, 0.45), rgba(255, 84, 112, 0.16));
    border: 1px solid rgba(255, 84, 112, 0.3);
  }
  body[data-theme="rose"]:not(.light-mode) .metric-icon .mi { width: 17px; height: 17px; }
  body[data-theme="rose"]:not(.light-mode) .btn { padding: 9px 18px; background: rgba(255, 84, 112, 0.07); border-color: rgba(255, 84, 112, 0.24); }
  body[data-theme="rose"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #ff5470, #ff9f6e); color: #20070f;
    box-shadow: 0 16px 34px -16px rgba(255, 84, 112, 0.9);
  }
  body[data-theme="rose"]:not(.light-mode) .btn.primary:hover { background: linear-gradient(120deg, #ff7188, #ffb287); filter: none; }
  body[data-theme="rose"]:not(.light-mode) .icon-btn { background: rgba(255, 84, 112, 0.07); border-color: rgba(255, 84, 112, 0.24); }
  body[data-theme="rose"]:not(.light-mode) .icon-btn:hover { background: rgba(255, 84, 112, 0.18); box-shadow: 0 10px 26px -14px #ff5470; }
  body[data-theme="rose"]:not(.light-mode) .tabbar-pill { background: rgba(21, 9, 15, 0.72); border-color: rgba(255, 84, 112, 0.18); }
  body[data-theme="rose"]:not(.light-mode) .tab.is-active {
    background: linear-gradient(180deg, rgba(255, 84, 112, 0.26), rgba(255, 159, 110, 0.12));
    border-color: rgba(255, 84, 112, 0.36);
  }
  body[data-theme="rose"]:not(.light-mode) .tab.is-active::after { width: 6px; height: 6px; }
  body[data-theme="rose"]:not(.light-mode) .card,
  body[data-theme="rose"]:not(.light-mode) .user-card { background: linear-gradient(160deg, rgba(52, 20, 32, 0.34), rgba(20, 9, 14, 0.3)); }
  body[data-theme="rose"]:not(.light-mode)::before {
    background:
      radial-gradient(820px 520px at 90% -8%, rgba(255, 84, 112, 0.22), transparent 62%),
      radial-gradient(680px 460px at 2% 102%, rgba(255, 159, 110, 0.16), transparent 62%),
      linear-gradient(180deg, #15090f, #080307);
  }
  body[data-theme="rose"]:not(.light-mode)::after {
    background-image: radial-gradient(rgba(255, 159, 110, 0.14) 1px, transparent 1.4px);
    background-size: 30px 30px; opacity: 0.45;
  }

  /* ---- روشن: مینیمال، تیز، کنتراست بالا ---- */
  body.light-mode {
    --window-radius: 10px; --btn-radius: 8px; --icon-radius: 8px;
    --tab-radius: 8px; --tabbar-radius: 10px; --card-radius: 10px;
  }
  body.light-mode .topbar { box-shadow: 0 10px 30px -24px rgba(15, 40, 25, 0.5); }
  body.light-mode .window { border-color: #e2e8e4; box-shadow: 0 14px 40px -30px rgba(15, 40, 25, 0.35); }
  body.light-mode .window-head { background: linear-gradient(180deg, #f4f8f5, #ffffff); border-bottom-color: #e6ece8; }
  body.light-mode .dots i { background: #c9d6cd; }
  body.light-mode .dots i:nth-child(1) { background: #e5b3b3; }
  body.light-mode .dots i:nth-child(2) { background: #e6d3a3; }
  body.light-mode .dots i:nth-child(3) { background: #a9d3b7; }
  body.light-mode .metric { background: #ffffff; border-color: #e2e8e4; box-shadow: 0 6px 18px -16px rgba(15, 40, 25, 0.4); }
  body.light-mode .metric::after { background: linear-gradient(180deg, var(--neon), transparent); }
  body.light-mode .metric-icon { padding: 4px; border-radius: 7px; background: rgba(11, 138, 75, 0.08); border: 1px solid rgba(11, 138, 75, 0.18); box-sizing: content-box; }
  body.light-mode .metric-value { font-weight: 800; letter-spacing: -0.2px; }
  body.light-mode .btn { border-color: #dbe4de; background: #ffffff; box-shadow: 0 2px 6px -4px rgba(15, 40, 25, 0.4); }
  body.light-mode .btn.primary { background: #0b8a4b; color: #ffffff; box-shadow: 0 10px 24px -14px rgba(11, 138, 75, 0.8); }
  body.light-mode .btn.primary:hover { background: #0a7a43; filter: none; }
  body.light-mode .icon-btn { background: #ffffff; border-color: #dfe7e2; color: #16261d; }
  body.light-mode .icon-btn:hover { background: rgba(11, 138, 75, 0.08); color: #0b8a4b; border-color: rgba(11, 138, 75, 0.3); }
  body.light-mode .tabbar-pill { background: #ffffff; border-color: #e2e8e4; box-shadow: 0 12px 30px -24px rgba(15, 40, 25, 0.45); }
  body.light-mode .tab { color: #5a6d60; }
  body.light-mode .tab:hover { background: rgba(11, 138, 75, 0.06); }
  body.light-mode .tab.is-active { background: #ffffff; color: #0b8a4b; border-color: #e2e8e4; box-shadow: 0 4px 12px -10px rgba(15, 40, 25, 0.5); }
  body.light-mode .tab.is-active::after { width: 18px; height: 3px; border-radius: 3px; bottom: 5px; }
  body.light-mode .card, body.light-mode .user-card { border-color: #e2e8e4; background: #ffffff; }
  body.light-mode::before { background: radial-gradient(900px 480px at 82% -8%, rgba(11, 138, 75, 0.1), transparent 62%), linear-gradient(180deg, #f7faf8, #eef3f0); }
  body.light-mode::after { background-image: radial-gradient(rgba(11, 138, 75, 0.12) 1px, transparent 1.3px); background-size: 28px 28px; opacity: 0.5; }

  @keyframes mili-scan-x {
    0% { transform: translateX(-60%); opacity: 0; }
    15% { opacity: 0.9; }
    85% { opacity: 0.9; }
    100% { transform: translateX(60%); opacity: 0; }
  }

  /* ---------- انتخاب قالب ظاهری ---------- */
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }
  .theme-card {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 13px 12px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: var(--panel-2);
    color: var(--text);
    font-family: inherit;
    text-align: right;
    cursor: pointer;
    transition: 0.18s;
  }
  .theme-card:hover { border-color: var(--line-strong); transform: translateY(-2px); }
  .theme-card.is-active { border-color: var(--swatch, var(--neon)); box-shadow: 0 0 0 1px var(--swatch, var(--neon)) inset, 0 14px 30px -22px var(--swatch, var(--neon)); }
  .theme-card b { font-size: 0.8rem; font-weight: 700; }
  .theme-card small { font-size: 0.68rem; color: var(--muted); }
  .theme-dots { display: flex; gap: 5px; }
  .theme-dots i { width: 18px; height: 18px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.14); }
  .theme-card .theme-check { display: none; color: var(--swatch, var(--neon)); }
  .theme-card.is-active .theme-check { display: inline-flex; }
  .theme-card b { display: flex; align-items: center; gap: 6px; }
  .theme-card small { line-height: 1.7; }

  /* پیش‌نمایش واقعی شکل رابط کاربری هر تم (نه فقط سه نقطهٔ رنگ) */
  .theme-preview {
    position: relative;
    height: 62px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #0a1210;
    padding: 7px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
  }
  .tp-top { height: 8px; border-radius: 3px; background: linear-gradient(90deg, var(--swatch), transparent 85%); opacity: 0.75; }
  .tp-body { display: flex; align-items: stretch; gap: 4px; flex: 1; min-height: 0; }
  .tp-block { flex: 1; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.05); }
  .tp-bar { width: 30%; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.04); display: flex; align-items: flex-end; padding: 3px; }
  .tp-btn { display: block; width: 16px; height: 6px; background: var(--swatch); border-radius: 2px; }
  .theme-preview.tp-neon { background: #08110c; }
  .theme-preview.tp-neon .tp-block { border-radius: 0; background: linear-gradient(180deg, rgba(181, 255, 77, 0.12), transparent); }
  .theme-preview.tp-neon .tp-btn { border-radius: 0; }
  .theme-preview.tp-neon::after {
    content: ""; position: absolute; inset: 0;
    background: repeating-linear-gradient(180deg, rgba(181, 255, 77, 0.09) 0 1px, transparent 1px 4px);
    pointer-events: none;
  }
  .theme-preview.tp-emerald { background: linear-gradient(160deg, #07251a, #020b07); border-color: rgba(43, 255, 158, 0.26); box-shadow: inset 0 0 30px rgba(43, 255, 158, 0.06); }
  .theme-preview.tp-emerald .tp-top { background: linear-gradient(90deg, #2bff9e, #5cffd6 40%, transparent 90%); opacity: 0.8; }
  .theme-preview.tp-emerald .tp-block { border-radius: 8px; border-color: rgba(43, 255, 158, 0.24); background: radial-gradient(120% 100% at 50% 0%, rgba(43, 255, 158, 0.14), rgba(43, 255, 158, 0.03)); box-shadow: inset 0 0 10px rgba(43, 255, 158, 0.05); }
  .theme-preview.tp-emerald .tp-btn { border-radius: 999px; background: linear-gradient(90deg, #22e08a, #8affd0); box-shadow: 0 0 8px rgba(43, 255, 158, 0.8); }
  .theme-preview.tp-emerald::after {
    content: ""; position: absolute; left: 50%; top: 50%; width: 34px; height: 34px;
    border-radius: 50%; border: 1px solid rgba(43, 255, 158, 0.2);
    transform: translate(-50%, -50%); pointer-events: none;
  }
  .theme-preview.tp-cyan { background: linear-gradient(160deg, #0d2a36, #050f15); border-color: rgba(57, 230, 255, 0.24); }
  .theme-preview.tp-cyan .tp-top { border-radius: 999px; }
  .theme-preview.tp-cyan .tp-block { border-radius: 9px; border-color: rgba(57, 230, 255, 0.22); background: rgba(57, 230, 255, 0.08); }
  .theme-preview.tp-cyan .tp-btn { border-radius: 999px; }
  .theme-preview.tp-violet { background: linear-gradient(160deg, #1a1230, #080511); border-color: rgba(179, 136, 255, 0.24); }
  .theme-preview.tp-violet .tp-block { border-radius: 0; clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px); background: rgba(179, 136, 255, 0.1); }
  .theme-preview.tp-violet .tp-btn { border-radius: 0; background: linear-gradient(90deg, #b388ff, #58d8ff); }
  .theme-preview.tp-amber { background: #0d0904; border-color: rgba(255, 176, 32, 0.26); }
  .theme-preview.tp-amber .tp-block { border-radius: 0; border-style: dashed; border-color: rgba(255, 176, 32, 0.3); background: rgba(255, 176, 32, 0.04); }
  .theme-preview.tp-amber .tp-btn { border-radius: 0; }
  .theme-preview.tp-amber .tp-bar { border-color: rgba(255, 176, 32, 0.24); }
  .theme-preview.tp-rose { background: linear-gradient(160deg, #33131f, #10060a); border-color: rgba(255, 84, 112, 0.24); }
  .theme-preview.tp-rose .tp-top { border-radius: 999px; }
  .theme-preview.tp-rose .tp-block { border-radius: 10px; border-color: rgba(255, 84, 112, 0.22); background: linear-gradient(180deg, rgba(255, 84, 112, 0.12), rgba(255, 159, 110, 0.05)); }
  .theme-preview.tp-rose .tp-btn { border-radius: 999px; background: linear-gradient(90deg, #ff5470, #ff9f6e); }
  .theme-preview.tp-light { background: #ffffff; border-color: #e2e8e4; }
  .theme-preview.tp-light .tp-top { background: linear-gradient(90deg, #0b8a4b, transparent 85%); opacity: 0.55; }
  .theme-preview.tp-light .tp-block { border-radius: 3px; border-color: #e2e8e4; background: #f6faf7; }
  .theme-preview.tp-light .tp-bar { border-color: #e2e8e4; background: #f6faf7; }
  .theme-preview.tp-light .tp-btn { background: #0b8a4b; border-radius: 3px; }

  /* ---------- افکت زندهٔ پس‌زمینه (FX) ---------- */
  #fxCanvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    opacity: 0.82;
    display: none;
  }
  body.fx-on #fxCanvas { display: block; }
  body.fx-on::after { opacity: 0.18; }
  body.light-mode #fxCanvas { opacity: 0.55; }
  .fx-btn { position: relative; }
  body.fx-on .fx-btn {
    color: var(--neon);
    background: var(--neon-soft);
    border-color: var(--line-strong);
    box-shadow: 0 0 0 1px rgba(var(--neon-rgb), 0.28), 0 0 22px -8px var(--neon);
    animation: fx-btn-pulse 3.6s ease-in-out infinite;
  }
  body.fx-on .fx-btn .mi { filter: drop-shadow(0 0 5px var(--neon-glow)); }
  .fx-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
  .fx-card {
    display: flex; flex-direction: column; gap: 8px; align-items: stretch;
    padding: 10px; border-radius: 12px; border: 1px solid var(--line);
    background: var(--panel-2); color: var(--text); font-family: inherit;
    text-align: right; cursor: pointer; transition: 0.18s;
  }
  .fx-card:hover { border-color: var(--line-strong); transform: translateY(-2px); }
  .fx-card.is-active { border-color: var(--neon); box-shadow: 0 0 0 1px var(--neon) inset, 0 14px 30px -24px var(--neon); }
  .fx-card b { display: flex; align-items: center; gap: 5px; font-size: 0.78rem; }
  .fx-card small { font-size: 0.66rem; color: var(--muted); line-height: 1.6; }
  .fx-card .theme-check { display: none; margin-inline-start: auto; color: var(--neon); }
  .fx-card.is-active .theme-check { display: inline-flex; }
  .fx-stage.fx-auto {
    background:
      radial-gradient(60% 80% at 20% 30%, rgba(var(--neon-rgb), 0.5), transparent 70%),
      radial-gradient(70% 90% at 80% 70%, rgba(var(--info-rgb), 0.46), transparent 70%),
      radial-gradient(60% 70% at 50% 110%, rgba(var(--neon-rgb), 0.28), transparent 70%),
      rgba(var(--bg-rgb), 0.92);
    animation: fx-auto-pulse 6s ease-in-out infinite;
  }
  .fx-stage {
    position: relative; height: 46px; border-radius: 9px; overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(var(--bg-rgb), 0.9);
  }
  .fx-stage i { position: absolute; display: block; }
  .fx-stage.fx-off { background: repeating-linear-gradient(45deg, rgba(var(--neon-rgb), 0.05) 0 6px, rgba(var(--bg-rgb), 0.9) 6px 12px); }
  .fx-stage.fx-aurora i { width: 70%; height: 90%; border-radius: 50%; filter: blur(9px); opacity: 0.75; animation: fx-drift 7s ease-in-out infinite; }
  .fx-stage.fx-aurora i:nth-child(1) { background: var(--neon); left: -10%; top: -20%; }
  .fx-stage.fx-aurora i:nth-child(2) { background: var(--info); right: -12%; bottom: -30%; animation-delay: -2.2s; }
  .fx-stage.fx-aurora i:nth-child(3) { background: rgba(var(--neon-rgb), 0.55); left: 28%; bottom: -40%; opacity: 0.4; animation-delay: -4s; }
  .fx-stage.fx-particles i { width: 4px; height: 4px; border-radius: 50%; background: var(--neon, #b5ff4d); box-shadow: 0 0 8px currentColor; animation: fx-float 5s ease-in-out infinite; }
  .fx-stage.fx-particles i:nth-child(1) { left: 18%; top: 30%; }
  .fx-stage.fx-particles i:nth-child(2) { left: 42%; top: 62%; animation-delay: -1.2s; }
  .fx-stage.fx-particles i:nth-child(3) { left: 66%; top: 22%; animation-delay: -2.4s; }
  .fx-stage.fx-particles i:nth-child(4) { left: 84%; top: 58%; animation-delay: -3.4s; }
  .fx-stage.fx-particles i:nth-child(5) { left: 30%; top: 78%; animation-delay: -4.1s; }
  .fx-stage.fx-grid-mode { background-image: linear-gradient(rgba(var(--neon-rgb), 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--neon-rgb), 0.24) 1px, transparent 1px); background-size: 12px 12px; animation: fx-grid 4s linear infinite; }
  .fx-stage.fx-matrix { background: linear-gradient(180deg, rgba(var(--neon-rgb), 0.12), transparent); }
  .fx-stage.fx-matrix i { top: -30%; width: 1px; height: 120%; background: linear-gradient(180deg, transparent, var(--neon, #b5ff4d)); opacity: 0.7; animation: fx-fall 2.6s linear infinite; }
  .fx-stage.fx-matrix i:nth-child(1) { left: 18%; animation-delay: -0.4s; }
  .fx-stage.fx-matrix i:nth-child(2) { left: 38%; animation-delay: -1.6s; }
  .fx-stage.fx-matrix i:nth-child(3) { left: 58%; animation-delay: -0.9s; }
  .fx-stage.fx-matrix i:nth-child(4) { left: 76%; animation-delay: -2.1s; }
  .fx-stage.fx-matrix i:nth-child(5) { left: 90%; animation-delay: -1.1s; }
  .fx-stage.fx-orbs i { width: 22px; height: 22px; border-radius: 50%; filter: blur(4px); background: var(--neon, #b5ff4d); opacity: 0.55; animation: fx-float 6s ease-in-out infinite; }
  .fx-stage.fx-orbs i:nth-child(1) { left: 10%; top: 20%; }
  .fx-stage.fx-orbs i:nth-child(2) { left: 42%; bottom: 12%; background: var(--info, #63e6d4); animation-delay: -2s; }
  .fx-stage.fx-orbs i:nth-child(3) { right: 12%; top: 26%; animation-delay: -4s; }
  .fx-stage.fx-cosmos {
    background:
      radial-gradient(80% 120% at 18% 0%, rgba(var(--info-rgb), 0.28), transparent 62%),
      radial-gradient(90% 120% at 86% 100%, rgba(var(--neon-rgb), 0.22), transparent 65%),
      rgba(var(--bg-rgb), 0.95);
  }
  .fx-stage.fx-cosmos::before {
    content: ""; position: absolute; inset: -20% -40%;
    background-image:
      radial-gradient(rgba(var(--neon-rgb), 0.9) 0.7px, transparent 1.3px),
      radial-gradient(rgba(var(--info-rgb), 0.8) 0.6px, transparent 1.2px);
    background-size: 17px 19px, 23px 21px;
    background-position: 2px 3px, 9px 11px;
    animation: fx-stars 12s linear infinite;
  }
  .fx-stage.fx-cosmos i { width: 46%; height: 90%; border-radius: 50%; filter: blur(10px); opacity: 0.45; animation: fx-drift 9s ease-in-out infinite; }
  .fx-stage.fx-cosmos i:nth-child(1) { background: var(--info); left: -12%; top: -26%; }
  .fx-stage.fx-cosmos i:nth-child(2) { background: var(--neon); right: -14%; bottom: -34%; animation-delay: -3.4s; }
  .fx-stage.fx-cosmos i:nth-child(3) { width: 5px; height: 5px; left: 64%; top: 30%; border-radius: 50%; filter: none; opacity: 1; background: var(--neon); box-shadow: 0 0 10px 2px rgba(var(--neon-rgb), 0.75); animation: fx-float 4.6s ease-in-out infinite; }
  .fx-stage.fx-spacetime {
    background:
      radial-gradient(60% 95% at 50% 50%, rgba(var(--neon-rgb), 0.2), transparent 66%),
      rgba(var(--bg-rgb), 0.94);
  }
  .fx-stage.fx-spacetime::before {
    content: ""; position: absolute; left: 50%; top: 50%; width: 96%; height: 96%;
    transform: translate(-50%, -50%); border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, rgba(var(--info-rgb), 0.25), transparent 30%, rgba(var(--neon-rgb), 0.25), transparent 62%);
    filter: blur(6px); animation: fx-spin 9s linear infinite;
  }
  .fx-stage.fx-spacetime::after {
    content: ""; position: absolute; left: 50%; top: 50%; width: 12px; height: 7px;
    transform: translate(-50%, -50%); border-radius: 50%;
    background: rgba(var(--neon-rgb), 0.9);
    box-shadow: 0 0 12px 4px rgba(var(--neon-rgb), 0.4), 0 0 26px 8px rgba(var(--info-rgb), 0.2);
  }
  .fx-stage.fx-spacetime i {
    left: 50%; top: 50%; width: 44px; height: 25px; margin: -12.5px 0 0 -22px;
    border-radius: 50%; border: 1px solid rgba(var(--neon-rgb), 0.52);
    box-shadow: 0 0 10px rgba(var(--neon-rgb), 0.28), inset 0 0 8px rgba(var(--neon-rgb), 0.12);
    animation: fx-ring 3.4s ease-out infinite;
  }
  .fx-stage.fx-spacetime i:nth-child(2) { border-color: rgba(var(--info-rgb), 0.48); animation-delay: -1.15s; }
  .fx-stage.fx-spacetime i:nth-child(3) { animation-delay: -2.3s; }
  @keyframes fx-btn-pulse { 0%, 100% { box-shadow: 0 0 0 1px rgba(var(--neon-rgb), 0.24), 0 0 18px -10px var(--neon); } 50% { box-shadow: 0 0 0 1px rgba(var(--neon-rgb), 0.42), 0 0 28px -6px var(--neon); } }
  @keyframes fx-auto-pulse { 0%, 100% { opacity: 0.82; } 50% { opacity: 1; } }
  @keyframes fx-stars { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-34px, 38px, 0); } }
  @keyframes fx-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes fx-ring { 0% { transform: scale(0.18); opacity: 0; } 22% { opacity: 0.9; } 100% { transform: scale(1.45); opacity: 0; } }
  @keyframes fx-drift { 0%, 100% { transform: translate3d(-8%, -4%, 0) scale(1); } 50% { transform: translate3d(10%, 8%, 0) scale(1.18); } }
  @keyframes fx-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes fx-fall { from { transform: translateY(-60%); } to { transform: translateY(140%); } }
  @keyframes fx-grid { from { background-position: 0 0, 0 0; } to { background-position: 24px 0, 0 24px; } }
  @media (prefers-reduced-motion: reduce) {
    .fx-stage, .fx-stage i, .fx-stage::before, .fx-stage::after, body.fx-on .fx-btn { animation: none !important; }
  }

  .mi { width: 20px; height: 20px; display: inline-block; vertical-align: middle; flex: none; }
  .mi-sm { width: 16px; height: 16px; }
  .mi-lg { width: 26px; height: 26px; }


  /* ==========================================================================
     نسل جدید قالب‌های جامع اندرویدی (Material You / Bento / Expressive)
     تغییر کامل چیدمان، شکل کارت‌ها، دکمه‌ها، سوییچ‌ها، انیمیشن صفحه، موس و اسکرول‌بار
     ========================================================================== */

  /* --- اسکرول‌بار اختصاصی پویا بر اساس قالب فعال --- */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: rgba(var(--bg-rgb), 0.85); border-inline-start: 1px solid var(--line); }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--neon), var(--info));
    border-radius: var(--btn-radius, 999px);
    border: 2px solid rgba(var(--bg-rgb), 0.9);
    box-shadow: 0 0 12px var(--neon-glow);
  }
  ::-webkit-scrollbar-thumb:hover { filter: brightness(1.15); }
  html { scrollbar-width: thin; scrollbar-color: var(--neon) rgba(var(--bg-rgb), 0.85); }

  /* --- نشانگر موس اختصاصی و حلقهٔ دنبال‌کنندهٔ تعاملی (Custom Cursor) --- */
  @media (hover: hover) and (pointer: fine) {
    body {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%23b5ff4d' stroke='%2305080a' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="zedsecure"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%23d0bcff' stroke='%23140c26' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="aurora"], body[data-theme="emerald"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%232dd4bf' stroke='%2302100d' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="tokyo"], body[data-theme="cyan"], body[data-theme="violet"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%237aa2f7' stroke='%23060916' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="solar"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%23facc15' stroke='%23140e02' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="ember"], body[data-theme="amber"], body[data-theme="rose"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%23fb923c' stroke='%23170902' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="moss"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%2334d399' stroke='%2303120c' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
    body[data-theme="clay"] {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 3l15 7.5-7 2-3.5 7L4 3z' fill='%23e08e6d' stroke='%231a0d08' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E") 3 3, auto;
    }
  }
  #miliCursorFollower {
    position: fixed;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: -14px 0 0 -14px;
    border-radius: var(--btn-radius, 50%);
    border: 1.5px solid rgba(var(--neon-rgb), 0.55);
    background: radial-gradient(circle, rgba(var(--neon-rgb), 0.14), transparent 70%);
    pointer-events: none;
    z-index: 99998;
    transition: width 0.18s ease, height 0.18s ease, margin 0.18s ease, border-radius 0.22s ease, border-color 0.2s ease, opacity 0.2s ease;
    opacity: 0;
    box-shadow: 0 0 16px -4px var(--neon-glow);
  }
  #miliCursorFollower.is-hover {
    width: 44px;
    height: 44px;
    margin: -22px 0 0 -22px;
    border-color: var(--neon);
    background: radial-gradient(circle, rgba(var(--neon-rgb), 0.24), transparent 72%);
  }
  @media (hover: none), (pointer: coarse) {
    #miliCursorFollower { display: none !important; }
  }

  /* --- سوییچ‌های کپسولی اندرویدی Material 3 با آیکون تیک داخل دایره --- */
  .switch { width: 50px; height: 28px; }
  .switch i { border-radius: 999px; background: rgba(255, 255, 255, 0.08); border: 1.5px solid var(--line-strong); }
  .switch i::after {
    top: 4px; inset-inline-start: 4px; width: 17px; height: 17px;
    background: var(--muted);
    transition: transform 0.22s cubic-bezier(.2,.9,.3,1.2), inset-inline-start 0.22s cubic-bezier(.2,.9,.3,1.2), width 0.18s, height 0.18s, background 0.18s;
  }
  .switch input:checked + i {
    background: var(--neon);
    border-color: var(--neon);
    box-shadow: 0 4px 16px -4px var(--neon-glow);
  }
  .switch input:checked + i::after {
    top: 3px;
    width: 20px;
    height: 20px;
    inset-inline-start: 24px;
    background: #0b0a12;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-width='2.3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.3l3 3 6-6.5'/%3E%3C/svg%3E");
    background-size: 13px 13px;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: none;
  }

  /* --- شماره‌گذاری کاشی‌ها (01, 02, 03, 04) و نقش شکل‌های کم‌رنگ پس‌زمینهٔ کارت‌ها --- */
  .metrics { counter-reset: mili-tile; }
  .metric { counter-increment: mili-tile; position: relative; overflow: hidden; }
  .metric::before {
    content: "0" counter(mili-tile);
    position: absolute;
    inset-inline-end: 12px;
    bottom: 8px;
    font: 900 2.1rem/1 var(--mono);
    color: rgba(var(--neon-rgb), 0.07);
    pointer-events: none;
    letter-spacing: -1px;
  }
  .card, .user-card, .loc-card { position: relative; overflow: hidden; }
  .card::after, .user-card::after {
    content: "";
    position: absolute;
    width: 110px;
    height: 110px;
    inset-inline-end: -28px;
    bottom: -34px;
    border-radius: 38% 62% 55% 45%;
    background: radial-gradient(circle, rgba(var(--neon-rgb), 0.065), transparent 70%);
    pointer-events: none;
  }

  /* --- لمس بازیگوش (Playful Press & Icon Spin) و موج نوار پیشرفت --- */
  .metric:hover .metric-icon .mi,
  .card:hover h3 .mi,
  .scan-tile:hover .mi {
    transform: rotate(-10deg) scale(1.1);
    transition: transform 0.24s cubic-bezier(.2,.9,.3,1.3);
  }
  .bar > i {
    position: relative;
    overflow: hidden;
  }
  .bar > i::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent);
    animation: mili-wave-bar 2.4s linear infinite;
  }
  @keyframes mili-wave-bar {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }

  /* --- انیمیشن‌های تبدیل صفحه متناسب با هر قالب (هل دادن، عمق، کشسان، لغزش) --- */
  @keyframes mili-page-push {
    from { opacity: 0; transform: translateX(22px) scale(0.985); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes mili-page-depth {
    from { opacity: 0; transform: scale(0.94) translateY(10px); filter: blur(4px); }
    to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  @keyframes mili-page-elastic {
    0% { opacity: 0; transform: translateY(24px) scale(0.95); }
    65% { opacity: 1; transform: translateY(-4px) scale(1.01); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .panel.is-active { animation: mili-page-push 0.32s cubic-bezier(.2,.85,.25,1) both; }

  /* ==========================================================================
     تعریف قالب‌های جدید اندرویدی (ZedSecure, Aurora, Tokyo, Solar, Ember, Moss, Clay)
     ========================================================================== */

  /* ۱) ZedSecure — قالب پیش‌فرض اندروید ۱۶ Material You (یاسی/بنفش پاستلی + داک شناور پایین) */
  body[data-theme="zedsecure"]:not(.light-mode) {
    --bg: #0c0914;
    --bg-rgb: 12, 9, 20;
    --bg-soft: #130e21;
    --panel: rgba(24, 19, 38, 0.94);
    --panel-2: rgba(31, 25, 49, 0.92);
    --line: rgba(208, 188, 255, 0.16);
    --line-strong: rgba(208, 188, 255, 0.44);
    --neon: #d0bcff;
    --neon-rgb: 208, 188, 255;
    --neon-soft: rgba(208, 188, 255, 0.13);
    --neon-glow: rgba(208, 188, 255, 0.34);
    --info: #f48fb1;
    --info-rgb: 244, 143, 177;
    --text: #f4effa;
    --muted: #a99eb8;
    --muted-2: #766b85;
    --window-radius: 28px;
    --btn-radius: 999px;
    --icon-radius: 16px;
    --tab-radius: 999px;
    --tabbar-radius: 999px;
    --card-radius: 24px;
    padding-bottom: 96px;
  }
  body[data-theme="zedsecure"]:not(.light-mode) .tabbar {
    position: fixed;
    bottom: 14px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    width: min(560px, calc(100% - 24px));
    z-index: 48;
    margin: 0;
    padding: 0;
  }
  body[data-theme="zedsecure"]:not(.light-mode) .tabbar-pill {
    background: rgba(28, 21, 46, 0.92);
    border: 1px solid rgba(208, 188, 255, 0.28);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.72), 0 0 0 1px rgba(208, 188, 255, 0.1) inset;
    backdrop-filter: blur(20px);
    padding: 7px;
  }
  body[data-theme="zedsecure"]:not(.light-mode) .tab.is-active {
    background: #d0bcff;
    color: #211042;
    font-weight: 800;
    box-shadow: 0 8px 22px -8px rgba(208, 188, 255, 0.75);
  }
  body[data-theme="zedsecure"]:not(.light-mode) .tab.is-active .mi { color: #211042; }
  body[data-theme="zedsecure"]:not(.light-mode) .tab.is-active::after { display: none; }
  body[data-theme="zedsecure"]:not(.light-mode) .btn.primary {
    background: #d0bcff;
    color: #211042;
    box-shadow: 0 10px 26px -10px rgba(208, 188, 255, 0.8);
  }

  /* ۲) Aurora — مشکی خالص AMOLED + شفق زمردی + چیدمان بنتو (Bento Grid) */
  body[data-theme="aurora"]:not(.light-mode) {
    --bg: #000000;
    --bg-rgb: 0, 0, 0;
    --bg-soft: #040b09;
    --panel: rgba(7, 17, 15, 0.96);
    --panel-2: rgba(10, 24, 21, 0.94);
    --line: rgba(45, 212, 191, 0.18);
    --line-strong: rgba(45, 212, 191, 0.46);
    --neon: #2dd4bf;
    --neon-rgb: 45, 212, 191;
    --neon-soft: rgba(45, 212, 191, 0.12);
    --neon-glow: rgba(45, 212, 191, 0.36);
    --info: #818cf8;
    --info-rgb: 129, 140, 248;
    --text: #ecfdf5;
    --muted: #82a89e;
    --muted-2: #52736a;
    --window-radius: 26px;
    --btn-radius: 16px;
    --icon-radius: 14px;
    --tab-radius: 18px;
    --tabbar-radius: 24px;
    --card-radius: 22px;
  }
  body[data-theme="aurora"]:not(.light-mode) .panel.is-active { animation-name: mili-page-depth; }
  @media (min-width: 820px) {
    body[data-theme="aurora"]:not(.light-mode) .metrics {
      grid-template-columns: 1.35fr 1fr 1fr 1.35fr;
    }
  }

  /* ۳) Tokyo — توکیو سایبرپانک (آبی/بنفش نئون + گوشه‌های بریده + دوستونه) */
  body[data-theme="tokyo"]:not(.light-mode) {
    --bg: #070913;
    --bg-rgb: 7, 9, 19;
    --bg-soft: #0c1021;
    --panel: rgba(14, 19, 38, 0.94);
    --panel-2: rgba(19, 26, 51, 0.92);
    --line: rgba(122, 162, 247, 0.18);
    --line-strong: rgba(122, 162, 247, 0.46);
    --neon: #7aa2f7;
    --neon-rgb: 122, 162, 247;
    --neon-soft: rgba(122, 162, 247, 0.13);
    --neon-glow: rgba(122, 162, 247, 0.36);
    --info: #bb9af7;
    --info-rgb: 187, 154, 247;
    --text: #e6eefc;
    --muted: #8b9bb8;
    --muted-2: #5d6c89;
    --window-radius: 14px;
    --btn-radius: 10px;
    --icon-radius: 10px;
    --tab-radius: 10px;
    --tabbar-radius: 14px;
    --card-radius: 14px;
  }
  body[data-theme="tokyo"]:not(.light-mode) .window,
  body[data-theme="tokyo"]:not(.light-mode) .user-card,
  body[data-theme="tokyo"]:not(.light-mode) .metric {
    clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  }
  body[data-theme="tokyo"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #7aa2f7, #bb9af7);
    color: #060916;
  }

  /* ۴) Solar — خورشیدی طلایی Expressive */
  body[data-theme="solar"]:not(.light-mode) {
    --bg: #0c0902;
    --bg-rgb: 12, 9, 2;
    --bg-soft: #171104;
    --panel: rgba(26, 20, 6, 0.94);
    --panel-2: rgba(36, 27, 8, 0.92);
    --line: rgba(250, 204, 21, 0.18);
    --line-strong: rgba(250, 204, 21, 0.45);
    --neon: #facc15;
    --neon-rgb: 250, 204, 21;
    --neon-soft: rgba(250, 204, 21, 0.13);
    --neon-glow: rgba(250, 204, 21, 0.34);
    --info: #fb923c;
    --info-rgb: 251, 146, 60;
    --text: #fef9c3;
    --muted: #b8a978;
    --muted-2: #85774a;
    --window-radius: 26px;
    --btn-radius: 999px;
    --icon-radius: 50%;
    --tab-radius: 999px;
    --tabbar-radius: 999px;
    --card-radius: 24px;
  }
  body[data-theme="solar"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #facc15, #f59e0b);
    color: #171002;
  }

  /* ۵) Ember — اخگر آتشین با گوشه‌های تیز و قاب صنعتی */
  body[data-theme="ember"]:not(.light-mode) {
    --bg: #0d0603;
    --bg-rgb: 13, 6, 3;
    --bg-soft: #170a05;
    --panel: rgba(27, 13, 7, 0.95);
    --panel-2: rgba(37, 18, 10, 0.92);
    --line: rgba(251, 146, 60, 0.18);
    --line-strong: rgba(251, 146, 60, 0.45);
    --neon: #fb923c;
    --neon-rgb: 251, 146, 60;
    --neon-soft: rgba(251, 146, 60, 0.13);
    --neon-glow: rgba(251, 146, 60, 0.34);
    --info: #f43f5e;
    --info-rgb: 244, 63, 94;
    --text: #ffedd5;
    --muted: #b58d76;
    --muted-2: #825e4a;
    --window-radius: 10px;
    --btn-radius: 8px;
    --icon-radius: 8px;
    --tab-radius: 8px;
    --tabbar-radius: 12px;
    --card-radius: 10px;
  }
  body[data-theme="ember"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #fb923c, #f97316);
    color: #1a0902;
  }

  /* ۶) Moss — خزه‌ای با گوشه‌های برگی (Leaf Corners) مطابق تصویر تنظیمات اندروید */
  body[data-theme="moss"]:not(.light-mode) {
    --bg: #040c08;
    --bg-rgb: 4, 12, 8;
    --bg-soft: #081710;
    --panel: rgba(10, 26, 18, 0.94);
    --panel-2: rgba(14, 34, 24, 0.92);
    --line: rgba(52, 211, 153, 0.18);
    --line-strong: rgba(52, 211, 153, 0.44);
    --neon: #34d399;
    --neon-rgb: 52, 211, 153;
    --neon-soft: rgba(52, 211, 153, 0.13);
    --neon-glow: rgba(52, 211, 153, 0.34);
    --info: #a3e635;
    --info-rgb: 163, 230, 53;
    --text: #ecfdf5;
    --muted: #84a999;
    --muted-2: #56786a;
    --window-radius: 30px;
    --btn-radius: 22px 6px 22px 6px;
    --icon-radius: 16px 4px 16px 4px;
    --tab-radius: 20px 6px 20px 6px;
    --tabbar-radius: 28px 10px 28px 10px;
    --card-radius: 28px 8px 28px 8px;
  }
  body[data-theme="moss"]:not(.light-mode) .panel.is-active { animation-name: mili-page-elastic; }
  body[data-theme="moss"]:not(.light-mode) .metric,
  body[data-theme="moss"]:not(.light-mode) .card,
  body[data-theme="moss"]:not(.light-mode) .user-card,
  body[data-theme="moss"]:not(.light-mode) .loc-card,
  body[data-theme="moss"]:not(.light-mode) .btn {
    border-radius: 26px 8px 26px 8px;
  }
  body[data-theme="moss"]:not(.light-mode) .btn.primary {
    background: linear-gradient(120deg, #34d399, #10b981);
    color: #03140d;
  }

  /* ۷) Clay — سفالی گرم Material You + داک پایین */
  body[data-theme="clay"]:not(.light-mode) {
    --bg: #0f0907;
    --bg-rgb: 15, 9, 7;
    --bg-soft: #1a100c;
    --panel: rgba(29, 19, 15, 0.94);
    --panel-2: rgba(38, 25, 20, 0.92);
    --line: rgba(224, 142, 109, 0.18);
    --line-strong: rgba(224, 142, 109, 0.44);
    --neon: #e08e6d;
    --neon-rgb: 224, 142, 109;
    --neon-soft: rgba(224, 142, 109, 0.13);
    --neon-glow: rgba(224, 142, 109, 0.34);
    --info: #f4a261;
    --info-rgb: 244, 162, 97;
    --text: #fbebe4;
    --muted: #b3978c;
    --muted-2: #7d645b;
    --window-radius: 28px;
    --btn-radius: 999px;
    --icon-radius: 18px;
    --tab-radius: 999px;
    --tabbar-radius: 999px;
    --card-radius: 24px;
    padding-bottom: 96px;
  }
  body[data-theme="clay"]:not(.light-mode) .tabbar {
    position: fixed;
    bottom: 14px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    width: min(560px, calc(100% - 24px));
    z-index: 48;
    margin: 0;
    padding: 0;
  }
  body[data-theme="clay"]:not(.light-mode) .tabbar-pill {
    background: rgba(33, 21, 16, 0.92);
    border: 1px solid rgba(224, 142, 109, 0.28);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(20px);
    padding: 7px;
  }
  body[data-theme="clay"]:not(.light-mode) .tab.is-active,
  body[data-theme="clay"]:not(.light-mode) .btn.primary {
    background: #e08e6d;
    color: #1f0d06;
  }
  body[data-theme="clay"]:not(.light-mode) .tab.is-active .mi { color: #1f0d06; }
  body[data-theme="clay"]:not(.light-mode) .tab.is-active::after { display: none; }

  /* --- کارت‌های پیش‌نمایش عمودی موبایلی در پنجرهٔ انتخاب قالب (مطابق تصاویر ارسالی) --- */
  .m3-theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
    gap: 12px;
    margin-top: 10px;
  }
  .m3-theme-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 10px;
    border-radius: 22px;
    border: 2px solid var(--line);
    background: rgba(0, 0, 0, 0.28);
    color: var(--text);
    font-family: inherit;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(.2,.9,.3,1.2), border-color 0.2s, box-shadow 0.2s;
  }
  .m3-theme-card:hover { transform: translateY(-3px); border-color: var(--swatch); }
  .m3-theme-card.is-active {
    border-color: var(--swatch);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 0 0 1px var(--swatch) inset, 0 16px 34px -18px var(--swatch);
  }
  .m3-phone {
    width: 100%;
    height: 126px;
    border-radius: 18px;
    padding: 10px 9px;
    background: var(--p-bg, #120e1c);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .m3-orb {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--swatch);
    box-shadow: 0 0 18px -2px var(--swatch);
  }
  .m3-pills {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
  .m3-pills i {
    display: block;
    height: 18px;
    border-radius: var(--p-rad, 7px);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    position: relative;
  }
  .m3-pills i::after {
    content: "";
    position: absolute;
    left: 25%;
    right: 25%;
    bottom: 4px;
    height: 3px;
    border-radius: 99px;
    background: var(--swatch);
  }
  .m3-bar {
    width: 100%;
    height: 12px;
    border-radius: var(--p-rad, 7px);
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    padding: 0 6px;
  }
  .m3-bar::after {
    content: "";
    width: 55%;
    height: 4px;
    border-radius: 99px;
    background: #ffffff;
    opacity: 0.85;
  }
  .m3-cta {
    width: 100%;
    height: 16px;
    border-radius: var(--p-rad, 999px);
    background: var(--swatch);
  }
  .m3-theme-card b { font-size: 0.78rem; font-weight: 800; display: flex; align-items: center; gap: 5px; }
  .m3-theme-card small { font-size: 0.64rem; color: var(--muted); text-align: center; line-height: 1.45; }

  /* ---------- top bar ---------- */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 22px;
    background: rgba(var(--bg-rgb), 0.82);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
  }
  .brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .brand .mili-shield-svg { width: 38px; height: 38px; flex: none; }
  .brand-text { line-height: 1.15; min-width: 0; overflow: hidden; }
  .brand-name { font-size: 1.02rem; font-weight: 800; letter-spacing: 0.4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .brand-name span { color: var(--neon); }
  .brand-ver {
    font-family: var(--mono);
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 0.6px;
  }
  .topbar-spacer { flex: 1; }
  /* هدر فقط لوگو + آیکون‌های افقی بدون متن فارسی */
  .topbar-actions { display: flex; align-items: center; gap: 7px; flex: none; }
  .topbar-actions .icon-btn { width: 38px; height: 38px; padding: 0; border-radius: var(--icon-radius); }
  .topbar-actions .icon-btn .mi { width: 19px; height: 19px; }
  .topbar-actions .icon-btn.tg { color: #7fd7ff; border-color: rgba(125, 211, 252, 0.3); background: rgba(56, 189, 248, 0.1); }
  .topbar-actions .icon-btn.tg:hover { color: #b9edff; border-color: rgba(125, 211, 252, 0.5); background: rgba(56, 189, 248, 0.18); }
  .topbar-actions .icon-btn.danger { color: var(--danger); }
  /* دکمهٔ نصب: وقتی مرورگر نصب را پیشنهاد می‌دهد درخشان می‌شود */
  .topbar-actions .icon-btn.install.is-ready {
    color: var(--neon);
    border-color: rgba(var(--neon-rgb), 0.45);
    background: var(--neon-soft);
    box-shadow: 0 0 18px -10px var(--neon);
    animation: mili-float 3.8s ease-in-out infinite;
  }
  /* دکمهٔ بروزرسانی هدر: تنها ورودی بروزرسانی پنل */
  .topbar-actions .icon-btn.update-btn {
    position: relative;
    color: var(--neon);
    border-color: rgba(var(--neon-rgb), 0.36);
    background: rgba(var(--neon-rgb), 0.08);
  }
  .topbar-actions .icon-btn.update-btn:hover {
    color: #08130a;
    border-color: var(--neon);
    background: var(--neon);
    box-shadow: 0 10px 26px -14px var(--neon);
  }
  .topbar-actions .icon-btn.update-btn.has-update {
    box-shadow: 0 0 0 1px rgba(var(--neon-rgb), 0.34) inset, 0 0 20px -8px var(--neon);
    animation: mili-float 3.8s ease-in-out infinite;
  }
  .update-dot {
    position: absolute;
    inset-inline-end: 7px;
    top: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--warn);
    box-shadow: 0 0 8px var(--warn);
  }
  .update-dot[hidden] { display: none; }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 11px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.025);
    font-size: 0.76rem;
    color: var(--muted);
    white-space: nowrap;
  }
  .chip b { color: var(--text); font-weight: 700; }
  .chip .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--neon); box-shadow: 0 0 10px var(--neon-glow); }
  .chip.warn .dot { background: var(--warn); box-shadow: 0 0 10px rgba(255, 206, 92, 0.4); }
  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 8px 12px;
    border-radius: var(--icon-radius);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text);
    font-family: inherit;
    font-size: 0.78rem;
    cursor: pointer;
    transition: 0.16s;
  }
  .icon-btn:hover { border-color: var(--line-strong); background: var(--neon-soft); color: var(--neon); }
  .icon-btn.danger:hover { border-color: rgba(255, 98, 98, 0.5); background: rgba(255, 98, 98, 0.1); color: var(--danger); }

  /* ---------- main ---------- */
  .main { max-width: 1180px; margin: 0 auto; padding: 18px 20px 10px; }

  /* ---------- نوار تب‌ها (جدا از منو، به سبک نوار شناور قبلی) ---------- */
  .tabbar {
    position: sticky;
    top: 61px;
    z-index: 35;
    display: flex;
    justify-content: center;
    padding: 10px 0 12px;
    margin-bottom: 12px;
    background: linear-gradient(180deg, rgba(var(--bg-rgb), 0.96), rgba(var(--bg-rgb), 0.7));
    backdrop-filter: blur(14px);
  }
  .tabbar-pill {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    width: min(100%, 560px);
    padding: 7px;
    border-radius: var(--tabbar-radius);
    border: 1px solid var(--line);
    background: rgba(var(--bg-rgb), 0.92);
    backdrop-filter: blur(20px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.4) inset;
    scrollbar-width: none;
  }
  .tabbar-pill::-webkit-scrollbar { display: none; }
  /* همهٔ تب‌ها یک بافت و یک اندازه دارند؛ فقط رنگ و حاشیه وضعیت فعال را نشان می‌دهد */
  .tab {
    appearance: none;
    border: 1px solid transparent;
    background: transparent;
    color: var(--muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    min-width: 0;
    height: 58px;
    padding: 7px 6px;
    border-radius: var(--tab-radius);
    font-family: inherit;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.1;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.18s;
    position: relative;
    overflow: hidden;
  }
  .tab .mi { width: 20px; height: 20px; }
  .tab > span[data-i18n] { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .tab:hover { color: var(--text); background: rgba(255, 255, 255, 0.05); border-color: var(--line); }
  .tab.is-active {
    color: var(--neon);
    background: var(--neon-soft);
    border-color: var(--line-strong);
    box-shadow: inset 0 0 0 1px rgba(var(--neon-rgb), 0.1);
  }
  .tab.is-active::after {
    content: "";
    position: absolute;
    bottom: 5px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--neon);
    box-shadow: 0 0 8px var(--neon-glow);
  }
  .tab::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.16) 50%, transparent 70%);
    transform: translateX(-130%);
    opacity: 0;
  }
  .tab:hover::before { animation: mili-sheen 0.85s ease; }
  body.light-mode .tabbar { background: linear-gradient(180deg, rgba(238, 243, 240, 0.96), rgba(238, 243, 240, 0.7)); }
  body.light-mode .tabbar-pill { background: rgba(255, 255, 255, 0.95); }
  body.light-mode .tab { color: #4b5c50; }
  .panel { display: none; animation: rise 0.32s ease both; }
  .panel.is-active { display: block; }
  @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .window {
    min-width: 0;
    max-width: 100%;
    border: 1px solid var(--line);
    border-radius: var(--window-radius);
    background: linear-gradient(180deg, rgba(12, 19, 16, 0.96), rgba(6, 10, 9, 0.94));
    box-shadow: var(--shadow);
    overflow: hidden;
    margin-bottom: 20px;
  }
  .window-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 18px;
    border-bottom: 1px solid var(--line);
    background: linear-gradient(90deg, rgba(var(--neon-rgb), 0.06), transparent 55%);
  }
  .dots { display: inline-flex; gap: 6px; margin-inline-start: 2px; }
  .dots i { width: 8px; height: 8px; border-radius: 50%; display: block; background: #2b3a2c; }
  .dots i:nth-child(1) { background: #ff6b6b; }
  .dots i:nth-child(2) { background: #ffce5c; }
  .dots i:nth-child(3) { background: var(--neon); }
  .window-title { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 0.95rem; }
  .window-title .mi { color: var(--neon); }
  .window-sub { color: var(--muted); font-size: 0.74rem; margin-inline-start: 4px; font-weight: 500; }
  .window-head .spacer { flex: 1; }
  .window-body { padding: 18px; min-width: 0; }

  /* ---------- metrics ---------- */
  /* داشبورد: کارت‌های مربعی دوتایی کنار هم */
  .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  @media (min-width: 900px) { .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .metric {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    aspect-ratio: 1 / 1;
    min-width: 0;
    border: 1px solid var(--line);
    border-radius: var(--card-radius);
    padding: 13px;
    background:
      radial-gradient(140px 90px at 100% 0%, rgba(var(--neon-rgb), 0.09), transparent 70%),
      rgba(255, 255, 255, 0.018);
    overflow: hidden;
  }
  .metric::after {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: 16px;
    bottom: 16px;
    width: 2px;
    background: linear-gradient(180deg, var(--neon), transparent);
    opacity: 0.6;
  }
  .metric-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .metric-label { color: var(--muted); font-size: 0.78rem; }
  .metric-icon { color: var(--neon); opacity: 0.9; }
  .metric-value { font-size: clamp(1.15rem, 5.2vw, 1.62rem); font-weight: 800; margin: 0; letter-spacing: 0.5px; line-height: 1.15; }
  .metric-value small { font-size: 0.74rem; color: var(--muted); font-weight: 600; margin-inline-start: 4px; }
  .metric-foot { font-size: 0.66rem; line-height: 1.55; color: var(--muted-2); }

  .split { display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; margin-top: 16px; }
  .card {
    border: 1px solid var(--line);
    border-radius: var(--card-radius);
    background: rgba(255, 255, 255, 0.016);
    padding: 16px;
  }
  .card h3 { margin: 0 0 12px; font-size: 0.86rem; color: var(--text); display: flex; align-items: center; gap: 8px; }
  .card h3 .mi { color: var(--neon); width: 17px; height: 17px; }
  .kv { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px dashed rgba(var(--neon-rgb), 0.09); font-size: 0.8rem; }
  .kv:last-child { border-bottom: 0; }
  .kv span { color: var(--muted); }
  .kv b { font-weight: 700; font-family: var(--mono); font-size: 0.78rem; }
  .tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2px;
    padding: 3px 8px; border-radius: 7px;
    border: 1px solid var(--line);
    color: var(--muted);
    background: rgba(255, 255, 255, 0.02);
  }
  .tag.on { color: var(--neon); border-color: var(--line-strong); background: var(--neon-soft); }
  .tag.off { opacity: 0.55; }
  .tag.mono { font-family: var(--mono); }
  .tag .mi { width: 13px; height: 13px; }

  /* ---------- buttons ---------- */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 15px; border-radius: var(--btn-radius);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.025);
    color: var(--text);
    font-family: inherit; font-size: 0.8rem; font-weight: 700;
    cursor: pointer; transition: 0.16s;
  }
  .btn .mi { width: 16px; height: 16px; }
  .btn:hover { border-color: var(--line-strong); background: var(--neon-soft); }
  .btn.primary {
    background: linear-gradient(180deg, rgba(var(--neon-rgb), 0.95), rgba(139, 209, 42, 0.95));
    color: #0a1206; border-color: transparent;
    box-shadow: 0 8px 22px rgba(var(--neon-rgb), 0.18);
  }
  .btn.primary:hover { filter: brightness(1.06); background: linear-gradient(180deg, #c7ff72, #98dd33); }
  .btn.ghost { background: transparent; }
  .btn.danger { color: var(--danger); border-color: rgba(255, 98, 98, 0.28); }
  .btn.danger:hover { background: rgba(255, 98, 98, 0.1); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn.sm { padding: 7px 10px; font-size: 0.72rem; border-radius: max(6px, calc(var(--btn-radius) - 2px)); }
  .btn.sm .mi { width: 14px; height: 14px; }
  .toolbar { display: flex; flex-wrap: wrap; gap: 9px; align-items: center; }
  .toolbar .spacer { flex: 1; }

  /* ---------- users ---------- */
  .user-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 14px; }
  .user-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid var(--line);
    border-radius: var(--card-radius);
    padding: 15px;
    background: linear-gradient(180deg, rgba(var(--neon-rgb), 0.035), rgba(255, 255, 255, 0.012));
  }
  .user-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .user-name { font-weight: 800; font-size: 0.94rem; }
  .user-uuid { font-family: var(--mono); font-size: 0.66rem; color: var(--muted-2); direction: ltr; text-align: left; margin-top: 3px; overflow-wrap: anywhere; }
  .pill { font-size: 0.68rem; font-weight: 700; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line); }
  .pill.on { color: var(--neon); border-color: var(--line-strong); background: var(--neon-soft); }
  .pill.off { color: var(--danger); border-color: rgba(255, 98, 98, 0.3); background: rgba(255, 98, 98, 0.08); }
  .usage { display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--muted); margin-top: 4px; }
  .bar { height: 6px; border-radius: 99px; background: rgba(255, 255, 255, 0.07); overflow: hidden; margin: 7px 0 2px; }
  .bar > i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, rgba(var(--neon-rgb), 0.55), var(--neon)); }
  .user-tags { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0; }
  .user-actions { display: flex; flex-wrap: wrap; gap: 6px; min-width: 0; }
  .user-actions .btn { min-width: 0; justify-content: center; }
  .user-more { margin-top: 8px; border-top: 1px dashed var(--line); padding-top: 8px; }
  .user-more > summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 10px;
    margin-top: 2px;
    border: 1px solid var(--line);
    border-radius: 9px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--muted);
    transition: 0.16s;
  }
  .user-more > summary::-webkit-details-marker { display: none; }
  .user-more > summary::after { content: "+"; font-size: 0.9rem; color: var(--neon); line-height: 1; }
  .user-more[open] > summary::after { content: "−"; }
  .user-more > summary:hover { color: var(--text); border-color: var(--line-strong); background: var(--neon-soft); }
  .user-more > .user-actions { margin-top: 8px; }
  .empty { text-align: center; color: var(--muted); padding: 34px 12px; font-size: 0.84rem; }

  /* ---------- forms ---------- */
  .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 0.76rem; color: var(--muted); }
  .field input[type="text"], .field input[type="number"], .field input[type="password"], .field select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: rgba(0, 0, 0, 0.35);
    color: var(--text);
    font-family: inherit;
    font-size: 0.82rem;
    outline: none;
    transition: 0.15s;
  }
  .field input:focus, .field select:focus { border-color: var(--line-strong); box-shadow: 0 0 0 3px rgba(var(--neon-rgb), 0.08); }
  .field .hint { font-size: 0.68rem; color: var(--muted-2); }
  .switch-row {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 10px 12px; border: 1px solid var(--line); border-radius: 11px;
    background: rgba(255, 255, 255, 0.015);
  }
  .switch-row .switch-meta { display: flex; align-items: center; gap: 9px; min-width: 0; }
  .switch-row .switch-meta .mi { color: var(--neon); width: 17px; height: 17px; }
  .switch-row .switch-meta b { font-size: 0.78rem; font-weight: 700; display: block; }
  .switch-row .switch-meta span { font-size: 0.68rem; color: var(--muted-2); display: block; }
  .switch { position: relative; width: 42px; height: 24px; flex: none; }
  .switch input { position: absolute; opacity: 0; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
  .switch i {
    position: absolute; inset: 0; border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--line);
    transition: 0.18s;
  }
  .switch i::after {
    content: ""; position: absolute; top: 3px; inset-inline-start: 3px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #6b7a67; transition: 0.18s;
  }
  .switch input:checked + i { background: rgba(var(--neon-rgb), 0.26); border-color: var(--line-strong); }
  .switch input:checked + i::after { background: var(--neon); inset-inline-start: 21px; box-shadow: 0 0 10px var(--neon-glow); }
  .group-title { font-size: 0.8rem; font-weight: 800; color: var(--text); margin: 4px 0 12px; display: flex; align-items: center; gap: 8px; }
  .group-title .mi { color: var(--neon); width: 17px; height: 17px; }

  /* ---------- scanner ---------- */
  .scan-controls { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr)); gap: 10px; align-items: end; }
  .scan-controls .btn { min-height: 40px; justify-content: center; }
  .table-wrap { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 14px; border: 1px solid var(--line); border-radius: 12px; }
  table.scan { width: 100%; border-collapse: collapse; font-size: 0.78rem; min-width: 620px; }
  table.scan th {
    text-align: right; padding: 10px 12px; color: var(--muted);
    font-weight: 600; font-size: 0.72rem;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--line);
  }
  table.scan td { padding: 10px 12px; border-bottom: 1px solid rgba(var(--neon-rgb), 0.07); }
  table.scan tr:last-child td { border-bottom: 0; }
  table.scan tr:hover td { background: rgba(var(--neon-rgb), 0.03); }
  .mono { font-family: var(--mono); direction: ltr; text-align: left; }
  .lat-fast { color: var(--neon); }
  .lat-med { color: var(--warn); }
  .lat-slow { color: var(--danger); }
  .scan-status { font-size: 0.78rem; color: var(--muted); margin-top: 10px; min-height: 18px; }
  .scan-status.err { color: var(--danger); }
  .warn-box {
    margin-top: 14px; padding: 11px 13px; border-radius: 11px;
    border: 1px solid rgba(255, 206, 92, 0.45);
    background: rgba(255, 206, 92, 0.08);
    color: var(--warn); font-size: 0.78rem; line-height: 1.95;
  }
  .warn-box b { display: block; margin-bottom: 4px; }
  .warn-box ul { margin: 0; padding-inline-start: 18px; }
  .code-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 34px; padding: 3px 6px; border-radius: 7px;
    border: 1px solid var(--line-strong);
    background: var(--neon-soft);
    color: var(--neon); font-family: var(--mono); font-size: 0.68rem; font-weight: 700;
  }

  /* ---------- locations ---------- */
  .loc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(245px, 100%), 1fr)); gap: 12px; }
  .loc-card {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    border: 1px solid var(--line); border-radius: 12px; padding: 11px 12px;
    background: rgba(255, 255, 255, 0.015);
  }
  .loc-name { font-size: 0.8rem; font-weight: 700; }
  .loc-meta { font-size: 0.68rem; color: var(--muted-2); margin-top: 2px; }
  /* همان حرکت منوی کشویی روی کارت‌های لوکیشن: موج لمس، بالا آمدن و ورود پله‌ای */
  .loc-grid .loc-card { animation: rise .4s cubic-bezier(.22, .8, .3, 1) both; }
  .loc-grid .loc-card:nth-child(1) { animation-delay: 0s; }
  .loc-grid .loc-card:nth-child(2) { animation-delay: .04s; }
  .loc-grid .loc-card:nth-child(3) { animation-delay: .08s; }
  .loc-grid .loc-card:nth-child(4) { animation-delay: .12s; }
  .loc-grid .loc-card:nth-child(5) { animation-delay: .16s; }
  .loc-grid .loc-card:nth-child(6) { animation-delay: .2s; }
  .loc-grid .loc-card:nth-child(7) { animation-delay: .24s; }
  .loc-grid .loc-card:nth-child(n+8) { animation-delay: .28s; }
  /* دکمههای لوکیشن فقط آیکون، بدون کادر و بدون متن، همه در یک ردیف */
  .loc-acts { display: flex; align-items: center; gap: 4px; flex: none; }
  .loc-act {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 13px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: background .2s ease, transform .2s ease;
  }
  .loc-act .mi { width: 26px; height: 26px; }
  .loc-act:hover { background: rgba(255, 255, 255, 0.05); transform: translateY(-2px); }
  body.light-mode .loc-act:hover { background: rgba(12, 26, 18, 0.06); }
  .loc-act.c-copy .mi { color: #a6e86b; }
  .loc-act.c-proxy .mi { color: #62c8f7; }
  .loc-act.c-ip .mi { color: #b79cff; }
  body.light-mode .loc-act.c-copy .mi { color: #2f8f2f; }
  body.light-mode .loc-act.c-proxy .mi { color: #1789c2; }
  body.light-mode .loc-act.c-ip .mi { color: #6b4fd6; }
  .loc-card.is-press { transform: translateY(0) scale(.992); }
  .loc-card.is-press .mi { animation: mili-tap .44s cubic-bezier(.2, .8, .3, 1); }
  .loc-card .btn .mi { transition: transform .2s ease; }
  .loc-card [data-act="copy"] .mi { color: #a6e86b; }
  .loc-card [data-act="country-proxy"] .mi { color: #62c8f7; }
  .loc-card [data-act="country-ip"] .mi { color: #b79cff; }
  body.light-mode .loc-card [data-act="copy"] .mi { color: #2f8f2f; }
  body.light-mode .loc-card [data-act="country-proxy"] .mi { color: #1789c2; }
  body.light-mode .loc-card [data-act="country-ip"] .mi { color: #6b4fd6; }
  /* اندپوینت اختصاصی WARP: آدرس طولانی نمایش داده نمی‌شود؛ فقط دکمه‌های کپی */
  .ep-card { grid-column: 1 / -1; flex-direction: column; align-items: stretch; gap: 10px; }
  .ep-card .toolbar { margin-top: 2px; }


  /* ---------- modal / toast ---------- */
  .modal { position: fixed; inset: 0; z-index: 90; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(2, 5, 4, 0.72); backdrop-filter: blur(6px); }
  .modal.is-open { display: flex; }
  .modal-card { width: min(460px, 100%); border-radius: var(--window-radius); border: 1px solid var(--line-strong); background: var(--bg-soft); box-shadow: var(--shadow); overflow: hidden; }
  .modal-card.wide { width: min(860px, 100%); }
  .user-form-modal { display: flex; flex-direction: column; max-height: min(90vh, 880px); }
  .user-form-modal .modal-body { flex: 1 1 auto; min-height: 0; max-height: none; }
  .modal-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--line); }
  .modal-head b { font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
  .modal-head .mi { color: var(--neon); }
  .modal-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 74vh; overflow-y: auto; }
  .form-tabs { display: flex; gap: 6px; overflow-x: auto; padding: 11px 14px; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--line); scrollbar-width: none; scroll-snap-type: x proximity; }
  .form-tabs::-webkit-scrollbar { height: 0; }
  .ftab { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--line); background: transparent; color: inherit; opacity: 0.7; border-radius: 999px; padding: 7px 13px; font: inherit; font-size: 0.78rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: 0.18s ease; scroll-snap-align: center; }
  .ftab:hover { opacity: 1; border-color: var(--line-strong); }
  .ftab .ftab-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.5; }
  .ftab .mi { width: 15px; height: 15px; opacity: 0.75; }
  .ftab.is-active .mi { opacity: 1; }
  .ftab.is-active { opacity: 1; color: var(--neon); border-color: rgba(var(--neon-rgb), 0.45); background: rgba(var(--neon-rgb), 0.1); }
  .ftab.is-active .ftab-dot { opacity: 1; box-shadow: 0 0 8px var(--neon); }
  body.light-mode .form-tabs { background: #f6faf8; }
  /* خلاصهٔ زندهٔ کاربر: هر تغییری در تب‌ها بلافاصله اینجا دیده می‌شود */
  .uf-summary { display: flex; flex-wrap: wrap; gap: 6px; padding: 9px 14px; border-bottom: 1px solid var(--line); background: rgba(var(--neon-rgb), 0.035); }
  .uf-summary .uf-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.025); font-size: 0.7rem; color: var(--muted); white-space: nowrap; }
  .uf-summary .uf-chip b { color: var(--text); font-weight: 700; }
  .uf-summary .uf-chip.on { border-color: rgba(var(--neon-rgb), 0.4); color: var(--neon); }
  .uf-summary .uf-chip.on b { color: var(--neon); }
  .uf-pane { display: none; }
  .uf-pane.is-active { display: block; animation: rise 0.22s ease both; }
  .uf-section { display: flex; align-items: center; gap: 10px; margin: 18px 0 10px; }
  .uf-section:first-child { margin-top: 0; }
  .uf-section span { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.02em; color: var(--neon); opacity: 0.85; white-space: nowrap; }
  .uf-section i { flex: 1; height: 1px; background: var(--line); }
  .uf-pane .field textarea { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--line); background: rgba(0, 0, 0, 0.35); color: var(--text); font-family: inherit; font-size: 0.82rem; line-height: 2; outline: none; resize: vertical; transition: 0.15s; }
  .uf-pane .field textarea:focus { border-color: var(--line-strong); box-shadow: 0 0 0 3px rgba(var(--neon-rgb), 0.08); }
  body.light-mode .uf-pane .field textarea { background: #ffffff; color: #0c1a12; }
  .field-hint { display: block; margin-top: 4px; font-size: 0.72rem; line-height: 1.7; opacity: 0.6; }
  .ip-pool { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; padding: 8px 9px; border: 1px dashed rgba(var(--info-rgb), 0.3); border-radius: 10px; background: rgba(var(--info-rgb), 0.045); }
  .ip-pool-title { font-size: 0.72rem; opacity: 0.75; }
  .ip-pool-count { width: 62px; padding: 6px 8px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(0, 0, 0, 0.25); color: var(--text); font: inherit; font-size: 0.74rem; }
  .ip-pool-country { flex: 1 1 130px; min-width: 110px; padding: 6px 8px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(0, 0, 0, 0.25); color: var(--text); font: inherit; font-size: 0.74rem; }
  .ip-pool .btn { flex: none; }
  .ip-pool-meta { font-size: 0.68rem; opacity: 0.5; flex-basis: 100%; }
  .field-hint code { font-size: 0.7rem; padding: 1px 5px; border-radius: 5px; background: rgba(var(--neon-rgb), 0.1); color: var(--neon); direction: ltr; display: inline-block; }
  .adv-box { border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; background: rgba(255, 255, 255, 0.015); }
  .adv-box summary { cursor: pointer; font-size: 0.8rem; font-weight: 700; color: var(--neon); }
  body.light-mode .adv-box { background: #f8faf9; }
  .modal-foot { padding: 0 16px 16px; display: flex; gap: 8px; justify-content: flex-start; flex-wrap: wrap; }
  .user-form-modal .modal-foot { padding: 12px 16px; border-top: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }

  /* ---------- بازنشانی تنظیمات (دکمهٔ قرمز هدر) ---------- */
  .topbar-actions .icon-btn.reset-all {
    color: #ff8080;
    border-color: rgba(255, 98, 98, 0.38);
    background: rgba(255, 98, 98, 0.09);
  }
  .topbar-actions .icon-btn.reset-all:hover {
    color: #fff;
    border-color: rgba(255, 98, 98, 0.75);
    background: rgba(255, 98, 98, 0.26);
    box-shadow: 0 10px 26px rgba(255, 98, 98, 0.3);
  }
  .topbar-actions .icon-btn.help-btn {
    color: var(--info);
    border-color: rgba(var(--info-rgb), 0.36);
    background: rgba(var(--info-rgb), 0.09);
  }
  .topbar-actions .icon-btn.help-btn:hover {
    color: #eafffb;
    border-color: rgba(var(--info-rgb), 0.7);
    background: rgba(var(--info-rgb), 0.22);
    box-shadow: 0 10px 26px rgba(var(--info-rgb), 0.26);
  }
  .reset-list { margin: 0; padding-inline-start: 18px; color: var(--muted); line-height: 2; font-size: 0.82rem; }
  .reset-list b { color: var(--text); }

  /* ---------- راهنمای خوش‌آمدگویی: آبی فیروزه‌ای + سبز نئونی ---------- */
  .modal.animated { opacity: 0; transition: opacity 0.28s ease; }
  .modal.animated.is-open { opacity: 1; animation: help-fade 0.38s ease both; }
  .modal.animated.is-open .modal-card { animation: help-rise 0.58s cubic-bezier(0.2, 0.85, 0.25, 1) both; }
  @keyframes help-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes help-rise { from { opacity: 0; transform: translateY(30px) scale(0.955); } to { opacity: 1; transform: none; } }
  @keyframes help-pane-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .help-modal {
    width: min(960px, 100%);
    max-height: min(92vh, 920px);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(var(--info-rgb), 0.36);
    background:
      radial-gradient(880px 380px at 10% -12%, rgba(var(--info-rgb), 0.16), transparent 62%),
      radial-gradient(720px 360px at 94% -4%, rgba(var(--neon-rgb), 0.14), transparent 60%),
      #070d0b;
    box-shadow: 0 36px 90px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(var(--neon-rgb), 0.07);
  }
  .help-modal .modal-head {
    background: linear-gradient(90deg, rgba(var(--info-rgb), 0.14), rgba(var(--neon-rgb), 0.1));
    border-bottom-color: rgba(var(--info-rgb), 0.26);
  }
  .help-modal .modal-head b { color: #d8fffb; }
  .help-modal .modal-head b .mi { color: var(--info); }

  /* ---------- پنجرهٔ بروزرسانی ---------- */
  .update-card {
    width: min(430px, 100%);
    border-color: rgba(var(--neon-rgb), 0.36);
    background:
      radial-gradient(420px 220px at 100% -10%, rgba(var(--neon-rgb), 0.14), transparent 68%),
      var(--bg-soft);
  }
  .update-body { gap: 14px; }
  .update-hero {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: rgba(var(--neon-rgb), 0.045);
  }
  .update-orb {
    width: 46px;
    height: 46px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    border: 1px solid rgba(var(--neon-rgb), 0.4);
    background: rgba(var(--neon-rgb), 0.12);
    color: var(--neon);
    box-shadow: 0 0 24px -12px var(--neon);
  }
  .update-orb .mi { width: 23px; height: 23px; }
  .update-copy { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .update-kicker { font-size: 0.7rem; color: var(--muted); }
  .update-kicker b { color: var(--text); }
  .update-versions { display: flex; align-items: baseline; gap: 7px; font-size: 1.02rem; }
  .update-versions span { font-size: 0.7rem; color: var(--muted); }
  .update-versions b { color: var(--neon); }
  .update-state { font-size: 0.74rem; color: var(--muted); }
  .update-state.is-available { color: var(--warn); }
  .update-state.is-current { color: var(--neon); }
  .update-state.is-error { color: var(--danger); }
  .update-note { margin: 0; font-size: 0.77rem; line-height: 1.95; color: var(--muted); }
  .update-meta { display: flex; flex-direction: column; gap: 2px; }
  .update-foot { gap: 7px; }
  .update-foot .btn.primary { flex: 1 1 170px; justify-content: center; }
  body.light-mode .update-card { background: #ffffff; }
  body.light-mode .update-hero { background: rgba(11, 138, 75, 0.05); }
  body.light-mode .update-note { color: #5a6d60; }
  .help-tabs {
    display: flex;
    gap: 7px;
    padding: 12px 16px 2px;
    overflow-x: auto;
    scrollbar-width: none;
    flex: none;
  }
  .help-tabs::-webkit-scrollbar { display: none; }
  .help-tab {
    flex: none;
    cursor: pointer;
    border: 1px solid rgba(var(--info-rgb), 0.26);
    background: rgba(var(--info-rgb), 0.06);
    color: var(--muted);
    border-radius: 999px;
    padding: 7px 13px;
    font: inherit;
    font-size: 0.76rem;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }
  .help-tab:hover { transform: translateY(-1px); color: #eafffb; background: rgba(var(--info-rgb), 0.14); }
  .help-tab.is-active {
    color: #04120d;
    border-color: transparent;
    background: linear-gradient(120deg, var(--info), var(--neon));
    box-shadow: 0 10px 26px rgba(var(--info-rgb), 0.3);
    font-weight: 700;
  }
  .help-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 14px 18px 10px;
    display: block;
  }
  .help-pane { display: none; }
  .help-pane.is-active { display: block; animation: help-pane-in 0.36s ease both; }
  .help-lead { margin: 0 0 12px; color: var(--text); font-size: 0.86rem; line-height: 2; }
  .help-lead b { color: var(--neon); }
  .help-grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
  .help-card {
    border: 1px solid rgba(var(--info-rgb), 0.2);
    border-radius: 14px;
    padding: 12px 14px;
    background: linear-gradient(180deg, rgba(var(--info-rgb), 0.07), rgba(var(--neon-rgb), 0.03));
  }
  .help-card h4 {
    margin: 0 0 7px;
    font-size: 0.82rem;
    color: #cffcf6;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .help-card h4 .mi { width: 17px; height: 17px; color: var(--info); }
  .help-card ul, .help-card ol { margin: 0; padding-inline-start: 17px; color: var(--muted); font-size: 0.78rem; line-height: 1.95; }
  .help-card li { margin-bottom: 3px; }
  .help-card li::marker { color: #63e6d4; }
  .help-card b, .help-card strong { color: #e9fff9; font-weight: 700; }
  .help-kbd {
    font-family: var(--mono);
    font-size: 0.72rem;
    direction: ltr;
    display: inline-block;
    padding: 1px 6px;
    border-radius: 6px;
    color: var(--neon);
    background: rgba(var(--neon-rgb), 0.1);
    border: 1px solid rgba(var(--neon-rgb), 0.26);
  }
  .help-note {
    margin-top: 10px;
    border-inline-start: 3px solid var(--neon);
    background: rgba(var(--neon-rgb), 0.07);
    border-radius: 0 12px 12px 0;
    padding: 9px 12px;
    color: var(--muted);
    font-size: 0.77rem;
    line-height: 1.9;
  }
  .help-note b { color: var(--neon); }
  .help-foot {
    flex: none;
    border-top: 1px solid rgba(var(--info-rgb), 0.2);
    background: rgba(var(--info-rgb), 0.04);
    padding: 11px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .help-foot .help-check {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--muted);
    font-size: 0.74rem;
    cursor: pointer;
    margin-inline-start: auto;
  }
  .help-foot .help-check input { accent-color: #63e6d4; width: 15px; height: 15px; }
  body.light-mode .help-modal { background: #ffffff; }
  body.light-mode .help-modal .modal-head b { color: #083a33; }
  body.light-mode .help-card { background: #f4fffd; border-color: rgba(11, 138, 75, 0.2); }
  body.light-mode .help-card h4 { color: #0b5c4e; }
  body.light-mode .help-card b, body.light-mode .help-card strong { color: #0c1a12; }
  body.light-mode .help-lead b { color: #0b8a4b; }
  body.light-mode .help-tab { color: #456; }
  body.light-mode .help-kbd { color: #0b6b3a; background: rgba(11, 138, 75, 0.08); }
  @media (max-width: 720px) {
    .help-modal { max-height: 100%; }
    .help-body { padding: 12px; }
    .help-tab { padding: 6px 11px; font-size: 0.72rem; }
  }
  @media (max-width: 640px) {
    .modal { padding: 0; }
    .modal-card { border-radius: 0; border-inline: 0; }
    .user-form-modal { width: 100%; height: 100%; max-height: none; }
    .user-form-modal .modal-head { padding: 11px 13px; }
    .user-form-modal .form-tabs { padding: 9px 12px; }
    .user-form-modal .modal-body { padding: 14px 12px 6px; }
    .user-form-modal .modal-foot { padding: 10px 12px calc(12px + env(safe-area-inset-bottom)); }
    .user-form-modal .modal-foot .btn { flex: 1; justify-content: center; }
    .user-form-modal .form-grid { grid-template-columns: 1fr; gap: 12px; }
    .ftab { font-size: 0.75rem; padding: 7px 11px; }
  }
  .toast {
    position: fixed; z-index: 120; inset-inline: 0; bottom: 96px;
    display: flex; justify-content: center; pointer-events: none;
  }
  .toast-body {
    transform: translateY(14px); opacity: 0;
    transition: 0.25s; max-width: 90vw;
    padding: 10px 16px; border-radius: 12px;
    border: 1px solid var(--line-strong);
    background: rgba(8, 14, 11, 0.96);
    color: var(--text); font-size: 0.8rem; font-weight: 600;
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
  }
  .toast-body.show { transform: none; opacity: 1; }
  .toast-body.err { border-color: rgba(255, 98, 98, 0.5); color: #ffb3b3; }
  .toast-body.ok { color: var(--neon); }

  @media (max-width: 820px) {
    .main { padding: 16px 12px 6px; }
    .topbar { padding: 10px 13px; gap: 9px; }
    .brand-ver { font-size: 0.62rem; }
    .split { grid-template-columns: 1fr; }
    .scan-controls { grid-template-columns: 1fr; }
    .window-body { padding: 14px; }
    .window-sub { display: none; }
  }
  @media (max-width: 460px) {
    .main { padding: 12px 9px 6px; }
    .topbar { padding: 9px 10px; gap: 7px; }
    .brand .mili-shield-svg { width: 32px; height: 32px; }
    .brand-name { font-size: 0.92rem; }
    .window-body { padding: 11px; }
    .user-grid, .loc-grid, .scan-grid { gap: 10px; }
    .user-card { padding: 12px; }
    .user-actions .btn.sm { flex: 1 1 calc(50% - 4px); }
    .scan-tile { padding: 11px 12px; }
    .scan-head .btn { margin-inline-start: 0; width: 100%; }
  }

  /* ---------- mobile drawer (کشوی منو) ---------- */
  .menu-btn { display: none; }
  .nav-drawer {
    display: none;
    position: fixed;
    inset-inline: 0;
    top: 0;
    z-index: 80;
    max-height: 88vh;
    overflow-y: auto;
    background: #060b09;
    border-bottom: 1px solid var(--line-strong);
    border-radius: 0 0 20px 20px;
    box-shadow: 0 26px 60px rgba(0, 0, 0, 0.66);
    transform: translateY(-102%);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.26s ease, opacity 0.2s ease, visibility 0.26s;
    padding-bottom: 12px;
  }
  body.light-mode .nav-drawer { background: #ffffff; }
  .nav-drawer.is-open { transform: none; opacity: 1; visibility: visible; }
  .drawer-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 70;
    background: rgba(2, 5, 4, 0.6);
    backdrop-filter: blur(3px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .drawer-backdrop.is-open { opacity: 1; pointer-events: auto; }
  .drawer-head {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: inherit;
    border-bottom: 1px solid var(--line);
  }
  .drawer-head .mili-shield-svg { width: 30px; height: 30px; }
  .drawer-title { font-size: 0.92rem; font-weight: 800; }
  .drawer-close { margin-inline-start: auto; }
  /* منوی موبایل: فقط آیکون‌های رنگی، بدون کادر و مستطیل بیرونی */
  .drawer-icons { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px 8px; padding: 8px 14px 16px; }
  .drawer-item {
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    padding: 14px 0;
    border: 0;
    border-radius: 14px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: transform .18s cubic-bezier(.2, .8, .3, 1), background .18s ease;
  }
  .drawer-item .mi { width: 30px; height: 30px; }
  .drawer-item:hover, .drawer-item:focus-visible { background: rgba(255, 255, 255, 0.05); transform: translateY(-2px); }
  body.light-mode .drawer-item:hover { background: rgba(12, 26, 18, 0.05); }
  /* هر لوگو رنگ خودش را دارد */
  .drawer-item.d-checkup .mi { color: #a6e86b; }
  .drawer-item.d-telegram .mi { color: #62c8f7; }
  .drawer-item.d-key .mi { color: #ffce5c; }
  .drawer-item.d-sun .mi { color: #ffb454; }
  .drawer-item.d-theme .mi { color: #b388ff; }
  .drawer-item.d-fx .mi { color: #63e6d4; }
  .drawer-item.d-lang .mi { color: #b79cff; }
  .drawer-item.d-logout .mi { color: #ff6b6b; }
  body.light-mode .drawer-item.d-checkup .mi { color: #2f8f2f; }
  body.light-mode .drawer-item.d-fx .mi { color: #0f9488; }
  body.light-mode .drawer-item.d-telegram .mi { color: #1789c2; }
  body.light-mode .drawer-item.d-key .mi { color: #b97800; }
  body.light-mode .drawer-item.d-sun .mi { color: #d97706; }
  body.light-mode .drawer-item.d-lang .mi { color: #6b4fd6; }
  body.light-mode .drawer-item.d-logout .mi { color: #d32f2f; }
  .drawer-head .icon-btn { border-color: transparent; background: transparent; }
  .drawer-head .icon-btn:hover { border-color: var(--line-strong); background: rgba(255, 255, 255, 0.06); }

  /* ---------- لایهٔ حرکت، بافت و بازخورد لمسی ---------- */
  @keyframes mili-drift {
    0% { transform: translate3d(-6%, -3%, 0) scale(1.04); opacity: .75; }
    50% { transform: translate3d(5%, 3%, 0) scale(1.12); opacity: 1; }
    100% { transform: translate3d(-6%, -3%, 0) scale(1.04); opacity: .75; }
  }
  @keyframes mili-sheen {
    0% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
    35% { opacity: .9; }
    100% { transform: translateX(230%) skewX(-16deg); opacity: 0; }
  }
  @keyframes mili-ripple {
    from { opacity: .45; transform: scale(0); }
    to { opacity: 0; transform: scale(2.4); }
  }
  @keyframes mili-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes mili-trace {
    to { stroke-dashoffset: -240; }
  }

  body { -webkit-tap-highlight-color: transparent; }
  .btn, .icon-btn, .tab, .ftab, .chip, .drawer-item, .switch { touch-action: manipulation; }
  .mi { transition: transform .24s cubic-bezier(.2, .8, .3, 1); }
  .btn:hover .mi, .tab:hover .mi, .drawer-item:hover .mi, .ftab:hover .mi { transform: scale(1.1) rotate(-4deg); }

  .window { position: relative; }
  .window::after {
    content: "";
    position: absolute;
    inset-inline: -10%;
    top: -55%;
    height: 300px;
    pointer-events: none;
    background: radial-gradient(50% 58% at 50% 50%, rgba(var(--neon-rgb), 0.1), transparent 70%);
    animation: mili-drift 24s ease-in-out infinite;
  }
  .window-head { position: relative; z-index: 1; }

  .metric, .card, .user-card, .loc-card {
    transition: transform .3s cubic-bezier(.2, .8, .3, 1), box-shadow .3s ease, border-color .3s ease;
    will-change: transform;
  }
  .metric:hover, .card:hover, .user-card:hover, .loc-card:hover {
    transform: translateY(-4px);
    border-color: var(--line-strong);
    box-shadow: 0 22px 46px rgba(0, 0, 0, 0.45);
  }
  body.light-mode .metric:hover,
  body.light-mode .card:hover,
  body.light-mode .user-card:hover,
  body.light-mode .loc-card:hover { box-shadow: 0 22px 42px rgba(15, 40, 25, 0.16); }

  .btn { position: relative; overflow: hidden; }
  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(100deg, transparent 22%, rgba(255, 255, 255, 0.34) 50%, transparent 78%);
    transform: translateX(-130%);
    opacity: 0;
  }
  .btn:hover::after { animation: mili-sheen .85s ease; }
  .btn:hover { transform: translateY(-1px); }
  .btn:active, .btn.is-press { transform: translateY(0) scale(.975); }
  .icon-btn:active, .icon-btn.is-press { transform: scale(.94); }
  /* بدون position روی خود دکمه، موج لمس به گوشهٔ صفحه می‌پرد */
  .ftab, .icon-btn, .drawer-item, .scan-tile, .loc-card, .loc-act { position: relative; overflow: hidden; }
  .ripple {
    position: absolute;
    width: 130px;
    height: 130px;
    margin: -65px 0 0 -65px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(var(--neon-rgb), 0.55), transparent 70%);
    animation: mili-ripple .62s ease-out forwards;
  }
  body.light-mode .ripple { background: radial-gradient(circle, rgba(11, 138, 75, 0.35), transparent 70%); }

  .tab.is-active .mi { animation: mili-float 3.6s ease-in-out infinite; }

  /* همهٔ آیکون‌ها هنگام کلیک تکان می‌خورند */
  @keyframes mili-tap {
    0% { transform: scale(1); }
    32% { transform: scale(.8) rotate(-7deg); }
    64% { transform: scale(1.14) rotate(4deg); }
    100% { transform: scale(1); }
  }
  .btn.is-press .mi,
  .icon-btn.is-press .mi,
  .tab.is-press .mi,
  .ftab.is-press .mi,
  .drawer-item.is-press .mi,
  .loc-act.is-press .mi,
  .loc-card.is-press .mi { animation: mili-tap .44s cubic-bezier(.2, .8, .3, 1); }
  .brand .mili-shield-svg { animation: mili-float 6s ease-in-out infinite; }

  table.scan tbody tr { transition: background .2s ease, box-shadow .2s ease; }
  table.scan tbody tr:hover { background: rgba(var(--neon-rgb), 0.05); box-shadow: inset 2px 0 0 var(--neon); }
  body.light-mode table.scan tbody tr:hover { background: rgba(11, 138, 75, 0.06); }

  .panel.is-active > .window { animation: rise .42s cubic-bezier(.22, .8, .3, 1) both; }
  .panel.is-active > .window:nth-child(2) { animation-delay: .05s; }

  /* اسکنر: منوی اسکن + صفحهٔ اختصاصی هر اسکن */
  /* هر اسکن یک کارت مربعی با کلید روشن/خاموش است؛ کارت خودش کلیک نمی‌شود */
  .scan-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; width: 100%; max-width: 780px; margin: 0 auto; }
  /* هر اسکن یک کارت کادردار با رنگ اختصاصی؛ آیکون بالا، نام وسط، کلید زیر لوگو */
  .scan-tile {
    --accent: var(--neon);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 0;
    padding: 14px 8px 12px;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.008));
    color: var(--text);
    font-family: inherit;
    transition: transform .28s cubic-bezier(.2, .8, .3, 1), border-color .28s ease, box-shadow .28s ease, background .28s ease;
  }
  .scan-tile[data-mode="ipv4"] { --accent: var(--neon); }
  .scan-tile[data-mode="ipv6"] { --accent: #4fd8e4; }
  .scan-tile[data-mode="domain"] { --accent: #6aa9ff; }
  .scan-tile[data-mode="proxyip"] { --accent: #b79cff; }
  .scan-tile[data-mode="proxy"] { --accent: #ffb35c; }
  .scan-tile[data-mode="manual"] { --accent: #ff8fc7; }
  body.light-mode .scan-tile[data-mode="ipv4"] { --accent: #2f8f2f; }
  body.light-mode .scan-tile[data-mode="ipv6"] { --accent: #0f7f8c; }
  body.light-mode .scan-tile[data-mode="domain"] { --accent: #2b6fd6; }
  body.light-mode .scan-tile[data-mode="proxyip"] { --accent: #6a49c9; }
  body.light-mode .scan-tile[data-mode="proxy"] { --accent: #b96b12; }
  body.light-mode .scan-tile[data-mode="manual"] { --accent: #c0427f; }
  body.light-mode .scan-tile { background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.55)); }
  .scan-tile:hover { transform: translateY(-2px); border-color: var(--accent); }
  .scan-tile.is-on {
    border-color: var(--accent);
    box-shadow: 0 12px 28px -18px var(--accent), inset 0 0 22px -14px var(--accent);
  }
  .scan-tile .mi { color: var(--accent); width: 30px; height: 30px; transition: transform .28s cubic-bezier(.2, .8, .3, 1); }
  .scan-tile:hover .mi { transform: scale(1.08); }
  .scan-tile b { font-size: 0.72rem; font-weight: 700; line-height: 1.4; text-align: center; color: var(--text); }
  .scan-tile.is-on b { color: var(--accent); }
  /* کلید روشن/خاموش دقیقاً زیر لوگو می‌نشیند */
  .scan-tile .scan-switch { flex: none; margin-top: 2px; }
  .scan-tile.is-on .scan-switch i { border-color: var(--accent); }
  .scan-tile.is-on .scan-switch i::after { background: var(--accent); box-shadow: 0 0 10px -1px var(--accent); }
  @media (min-width: 900px) {
    .scan-grid { gap: 14px; max-width: 900px; }
    .scan-tile { padding: 20px 14px 16px; gap: 10px; }
    .scan-tile .mi { width: 38px; height: 38px; }
    .scan-tile b { font-size: 0.82rem; }
  }
  .scan-view { display: none; }
  .scan-view.is-active { display: block; animation: rise .28s ease both; }
  .scan-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
  .scan-head .scan-title { font-size: 0.9rem; font-weight: 800; display: flex; align-items: center; gap: 8px; }
  .scan-head .scan-title .mi { color: var(--neon); }
  .scan-head .scan-desc { font-size: 0.72rem; color: var(--muted-2); }
  .scan-head .btn { margin-inline-start: auto; }
  .scan-note { font-size: 0.74rem; line-height: 1.95; color: var(--muted-2); margin: 0 0 12px; }

  /* اسکنر: ارتفاع آزاد؛ فهرست نتایج همیشه دیده می‌شود و فقط خودش اسکرول دارد */
  .panel[data-panel="scanner"].is-active {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }
  .panel[data-panel="scanner"] > .window { display: flex; flex-direction: column; flex: none; margin-bottom: 0; }
  .panel[data-panel="scanner"] .window-body { display: flex; flex-direction: column; min-height: 0; overflow: visible; }
  #scanHome { display: flex; flex-direction: column; flex: none; min-height: 0; }
  /* wrapper نماها فقط وقتی نما فعال است ارتفاع می‌گیرد تا در حالت خانه فضای شبکه را نخورد */
  #scanViews { display: block; }
  #scanHome { justify-content: center; }
  #scanHome .scan-grid { flex: none; }
  #scanBar { flex: none; }
  #scanHome .toolbar { flex: none; margin: 10px 0 0 !important; flex-wrap: wrap; }
  .scan-view.is-active { display: block; }
  /* فهرست نتایج: ارتفاع تضمین‌شده برای دیده شدن؛ اگر بیشتر شد خود جدول اسکرول می‌شود */
  .scan-view .table-wrap { overflow: auto; min-height: 160px; max-height: 58vh; }
  .scan-view .scan-status { min-height: 18px; }
  .panel[data-panel="scanner"] .window-body {
    background: radial-gradient(78% 58% at 50% 0%, rgba(var(--neon-rgb), 0.055), transparent 72%);
  }
  /* دسکتاپ: کارت اسکنر جمع‌وجور و وسط‌چین می‌شود، نه کشیده و خالی */
  @media (min-width: 1000px) {
    .panel[data-panel="scanner"] > .window { max-width: 1040px; margin: 0 auto; }
    .panel[data-panel="scanner"] .window-body { padding: 26px 30px 22px; }
    #scanHome .toolbar { margin-top: 18px !important; justify-content: center; }
    .scan-view .table-wrap { max-height: 52vh; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .001ms !important;
    }
  }

  /* قواعد موبایل آخرین بلوک استایل هستند تا بر قواعد پایهٔ بالا اولویت داشته باشند */
  @media (max-width: 820px) {
    .topbar-actions .icon-btn.opt { display: none; }
    .topbar-actions .icon-btn { width: 34px; height: 34px; }
    .topbar-actions .icon-btn.install { width: 34px; height: 34px; }
    .topbar-actions { gap: 6px; }
    .brand { flex: none; }
    .menu-btn { display: inline-flex; }
    .nav-drawer { display: block; }
    .drawer-backdrop { display: block; }
    .toast { bottom: 24px; }
    .tabbar { top: 55px; padding: 8px 0 10px; }
    .tabbar-pill { width: 100%; padding: 6px; gap: 5px; }
    .tab { height: 54px; padding: 6px 3px; font-size: 0.63rem; }
    .tab .mi { width: 18px; height: 18px; }
  }
  @media (max-width: 560px) {
    /* در گوشی فقط نشان برند می‌ماند تا با دکمه‌های اکشن روی هم نیفتد */
    .brand-text { display: none; }
    .brand { gap: 0; }
    .topbar { gap: 8px; }
  }
</style>
</head>
<body data-theme="neon" data-fx="auto">
  <canvas id="fxCanvas" aria-hidden="true"></canvas>
  <header class="topbar">
    <button class="icon-btn menu-btn" type="button" data-act="toggle-drawer" aria-controls="navDrawer" aria-expanded="false" title="منو">${icon('menu')}</button>
    <div class="brand">
      ${SHIELD_LOGO_SVG}
      <div class="brand-text">
        <div class="brand-name">${BRAND_NAME}<span>OS</span></div>
        <div class="brand-ver">${BRAND_UPPER} ${VERSION}</div>
      </div>
    </div>
    <div class="topbar-spacer"></div>
    <div class="topbar-actions">
      <button class="icon-btn install" id="installBtn" type="button" data-act="install-app" title="نصب روی دسکتاپ یا گوشی" aria-label="install">${icon('install')}</button>
      <a class="icon-btn tg" href="${SUPPORT_URL}" target="_blank" rel="noopener" title="${TELEGRAM_SUPPORT}" aria-label="Telegram" data-act="open-support">${icon('telegram')}</a>
      <button class="icon-btn opt" type="button" data-act="open-theme" id="themeBtn" title="قالب ظاهری" aria-label="themes">${icon('palette')}</button>
      <button class="icon-btn opt" type="button" data-act="toggle-lang" id="langBtn" title="تغییر زبان" aria-label="language">${icon('globe')}</button>
      <button class="icon-btn opt" type="button" data-act="open-multi" title="سابلینک چندلوکیشن" aria-label="locations">${icon('pin')}</button>
      <button class="icon-btn opt" type="button" data-act="open-password" title="تغییر رمز مدیر" aria-label="password">${icon('key')}</button>
      <button class="icon-btn update-btn" id="updateBtn" type="button" data-act="open-update" title="بروزرسانی پنل" aria-label="update">${icon('download')}<span class="update-dot" id="updateDot" hidden></span></button>
      <button class="icon-btn help-btn" type="button" data-act="open-help" title="راهنمای کامل پنل" aria-label="help">${icon('shield')}</button>
      <button class="icon-btn reset-all" type="button" data-act="open-reset" title="بازگرداندن همهٔ تنظیمات به پیش‌فرض" aria-label="reset settings">${icon('refresh')}</button>
      <button class="icon-btn danger" type="button" data-act="logout" title="خروج" aria-label="logout">${icon('logout')}</button>
    </div>
  </header>

  <!-- کشوی منوی موبایل: لیست کامل و مرتب؛ با دکمهٔ بالا باز/بسته می‌شود -->
  <div class="drawer-backdrop" id="drawerBackdrop" data-act="close-drawer"></div>
  <nav class="nav-drawer" id="navDrawer" aria-label="منوی اصلی" aria-hidden="true">
    <div class="drawer-head">
      ${SHIELD_LOGO_SVG}
      <div>
        <div class="drawer-title">${BRAND_NAME}OS</div>
        <div class="brand-ver">${BRAND_UPPER} v${VERSION.replace(/^v/i, '')}</div>
      </div>
      <button class="icon-btn drawer-close" type="button" data-act="close-drawer" title="بستن">${icon('close')}</button>
    </div>
    <div class="drawer-icons">
      <a class="drawer-item d-telegram" href="${SUPPORT_URL}" target="_blank" rel="noopener" aria-label="${TELEGRAM_SUPPORT}" title="${TELEGRAM_SUPPORT}">${icon('telegram')}</a>
      <button class="drawer-item d-key" type="button" data-act="open-password" aria-label="تغییر رمز مدیر" title="تغییر رمز مدیر">${icon('key')}</button>
      <button class="drawer-item d-fx" type="button" data-act="open-fx" aria-label="افکت زندهٔ پس‌زمینه" title="افکت زندهٔ پس‌زمینه">${icon('sparkles')}</button>
      <button class="drawer-item d-theme" type="button" data-act="open-theme" aria-label="قالب ظاهری" title="قالب ظاهری">${icon('palette')}</button>
      <button class="drawer-item d-sun" type="button" data-act="toggle-theme" aria-label="حالت روز / شب" title="حالت روز / شب">${icon('sun')}</button>
      <button class="drawer-item d-lang" type="button" data-act="toggle-lang" aria-label="تغییر زبان" title="تغییر زبان">${icon('globe')}</button>
      <button class="drawer-item d-logout" type="button" data-act="logout" aria-label="خروج" title="خروج">${icon('logout')}</button>
    </div>
  </nav>

  <main class="main">

  <!-- نوار تب‌ها: از منو جدا است و همهٔ صفحه‌ها را با یک کلیک عوض می‌کند -->
  <div class="tabbar" id="tabbar">
    <nav class="tabbar-pill" aria-label="تب‌های پنل">
      <button class="tab is-active" type="button" data-tab="dashboard">${icon('dashboard')}<span data-i18n="nav.dashboard">داشبورد</span></button>
      <button class="tab" type="button" data-tab="users">${icon('users')}<span data-i18n="nav.users">کاربران</span></button>
      <button class="tab" type="button" data-tab="scanner">${icon('radar')}<span data-i18n="nav.scanner">اسکنر</span></button>
      <button class="tab" type="button" data-tab="locations">${icon('globe')}<span data-i18n="nav.locations">چندلوکیشن</span></button>
    </nav>
  </div>

    <section class="panel is-active" data-panel="dashboard">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('dashboard')} <span data-i18n="panel.dashboard">داشبورد</span> <span class="window-sub" data-i18n="panel.dashboardSub">وضعیت زنده سیستم و مصرف</span></div>
          <div class="spacer"></div>
          <button class="btn sm ghost" type="button" data-act="reload-users">${icon('refresh')} <span data-i18n="btn.reload">بروزرسانی</span></button>
        </div>
        <div class="window-body">
          <div class="metrics">
            <div class="metric">
              <div class="metric-top"><span class="metric-label" data-i18n="metric.users">کاربران فعال</span><span class="metric-icon">${icon('users')}</span></div>
              <div class="metric-value" id="mUsers">0 <small>/ ${MAX_USERS_LIMIT}</small></div>
              <div class="metric-foot" id="mUsersFoot">ظرفیت آزاد</div>
            </div>
            <div class="metric">
              <div class="metric-top"><span class="metric-label" data-i18n="metric.traffic">حجم مصرف‌شده</span><span class="metric-icon">${icon('activity')}</span></div>
              <div class="metric-value" id="mTraffic">0.00 <small>GB</small></div>
              <div class="metric-foot">مجموع مصرف کاربران روی D1</div>
            </div>
            <div class="metric">
              <div class="metric-top"><span class="metric-label" data-i18n="metric.ips">آی‌پی‌های سالم</span><span class="metric-icon">${icon('server')}</span></div>
              <div class="metric-value" id="mIps">0 <small>نود</small></div>
              <div class="metric-foot">نودهای ترجیحی · IPv4 / IPv6 / دامنه</div>
            </div>
            <div class="metric">
              <div class="metric-top"><span class="metric-label" data-i18n="metric.protocols">پروتکل‌های فعال</span><span class="metric-icon">${icon('layers')}</span></div>
              <div class="metric-value" id="mProto" style="font-size: 1.25rem;">—</div>
              <div class="metric-foot">بر پایه تنظیمات ذخیره‌شده</div>
            </div>
          </div>

          <div class="split">
            <div class="card">
              <h3>${icon('terminal')} وضعیت هسته</h3>
              <div class="kv"><span>موتور پروکسی</span><b>VLESS / Trojan / xHTTP</b></div>
              <div class="kv"><span>ذخیره‌سازی</span><b id="kvStorage">—</b></div>
              <div class="kv"><span>بایندینگ دیتابیس</span><b id="kvBinding">—</b></div>
              <div class="kv"><span>مسیر مدیریت</span><b id="kvPath" class="mono">—</b></div>
              <div class="kv"><span>سقف کاربران</span><b>${MAX_USERS_LIMIT}</b></div>
            </div>
            <div class="card">
              <h3>${icon('bolt')} اقدام‌های سریع</h3>
              <div class="toolbar" style="flex-direction: column; align-items: stretch;">
                <button class="btn primary" type="button" data-act="open-create">${icon('plus')} <span data-i18n="btn.newUser">کاربر جدید</span></button>
                <button class="btn" type="button" data-act="go-scan">${icon('radar')} <span data-i18n="nav.scanner">اسکنر</span></button>
                <button class="btn" type="button" data-act="open-tg">${icon('telegram')} وب‌پروکسی و پروکسی تلگرام</button>
                <button class="btn" type="button" data-act="copy-master">${icon('copy')} <span data-i18n="btn.copyMaster">کپی سابلینک اصلی</span></button>
                <button class="btn ghost" type="button" data-act="open-password">${icon('key')} <span data-i18n="btn.password">تغییر رمز مدیر</span></button>
                <button class="btn ghost" type="button" data-act="copy-admin-path">${icon('copy')} کپی مسیر مدیریت</button>
                <button class="btn ghost" type="button" data-act="rotate-path">${icon('refresh')} مسیر مدیریت جدید</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="panel" data-panel="users">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('users')} <span data-i18n="panel.users">کاربران</span> <span class="window-sub" data-i18n="panel.usersSub">مدیریت اشتراک و محدودیت</span></div>
          <div class="spacer"></div>
          <button class="btn sm ghost" type="button" data-act="reload-users">${icon('refresh')} <span data-i18n="btn.reload">بروزرسانی</span></button>
          <button class="btn sm primary" type="button" data-act="open-create">${icon('plus')} <span data-i18n="btn.createUser">ایجاد کاربر</span></button>
        </div>
        <div class="window-body">
          <div class="user-grid" id="usersGrid"></div>
          <div class="empty" id="usersEmpty" style="display:none;">هنوز کاربری ساخته نشده است.</div>
        </div>
      </div>
    </section>

    <section class="panel" data-panel="scanner">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('radar')} <span id="scanPanelTitle" data-i18n="panel.scanner">اسکنر زنده</span> <span class="window-sub" data-i18n="panel.scannerSub">همهٔ اسکن‌ها داخل پنل اجرا می‌شوند</span></div>
          <div class="spacer"></div>
          <button class="btn sm ghost" type="button" id="scanBackBtn" data-act="scan-back" style="display:none;">${icon('back')} بازگشت به اسکن‌ها</button>
        </div>
        <div class="window-body">
          <!-- خانهٔ اسکنر: هر اسکن یک کارت مربعی با کلید روشن/خاموش است -->
          <div id="scanHome">
            <div class="scan-grid">
              <div class="scan-tile" data-mode="ipv4" title="IPv4">
                ${icon('server')}
                <b>IPv4</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="ipv4" aria-label="IPv4"><i></i></label>
              </div>
              <div class="scan-tile" data-mode="ipv6" title="IPv6">
                ${icon('signal')}
                <b>IPv6</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="ipv6" aria-label="IPv6"><i></i></label>
              </div>
              <div class="scan-tile" data-mode="domain" title="Domain">
                ${icon('globe')}
                <b>Domain</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="domain" aria-label="Domain"><i></i></label>
              </div>
              <div class="scan-tile" data-mode="proxyip" title="ProxyIP">
                ${icon('api')}
                <b>ProxyIP</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="proxyip" aria-label="ProxyIP"><i></i></label>
              </div>
              <div class="scan-tile" data-mode="proxy" title="SOCKS5">
                ${icon('link')}
                <b>SOCKS5</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="proxy" aria-label="SOCKS5"><i></i></label>
              </div>
              <div class="scan-tile" data-mode="manual" title="Manual">
                ${icon('terminal')}
                <b>Manual</b>
                <label class="switch scan-switch"><input type="checkbox" data-scan="manual" aria-label="Manual"><i></i></label>
              </div>
            </div>
          </div>
          <!-- مقصد نتیجه: در همهٔ صفحه‌های اسکن مشترک است -->
          <div id="scanBar" style="display:none;">
            <div class="scan-controls" style="margin-bottom: 4px;">
              <div class="field">
                <label>افزودن نتیجه به کاربر</label>
                <select id="scanUser"><option value="">تنظیمات پیش‌فرض پنل</option></select>
              </div>
              <div class="field">
                <label>مقصد نتیجه</label>
                <select id="scanTarget">
                  <option value="yx" selected>آدرس‌های دستی</option>
                  <option value="p">آدرس واسط (ProxyIP)</option>
                  <option value="s">پروکسی خروجی</option>
                </select>
              </div>
            </div>
          </div>
          <div id="scanViews"></div>
        </div>
      </div>
    </section>

    <section class="panel" data-panel="locations">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('pin')} <span data-i18n="panel.locations">چندلوکیشن</span> <span class="window-sub" data-i18n="panel.locationsSub">سابلینک به تفکیک کشور</span></div>
          <div class="spacer"></div>
          <button class="btn sm ghost" type="button" data-act="copy-master">${icon('copy')} همه لوکیشن‌ها</button>
        </div>
        <div class="window-body">
          <p class="loc-meta" style="margin: 0 0 12px;">برای هر منطقه، آدرس‌های همان کشور از منابع عمومی خوانده و تست می‌شوند. با «آی‌پی تصادفی» چند آدرس سالم همان منطقه داخل تنظیمات کاربر انتخابی نوشته می‌شود.</p>
          <div class="scan-controls" style="margin-bottom:12px;">
            <div class="field">
              <label>منطقه</label>
              <select id="locRegion">${countryOptions()}</select>
            </div>
            <div class="field">
              <label>کاربر هدف</label>
              <select id="locUser"><option value="">تنظیمات پیش‌فرض پنل</option></select>
            </div>
            <button class="btn primary" type="button" data-act="loc-random-ip">${icon('bolt')} افزودن آی‌پی تصادفی</button>
            <button class="btn" type="button" data-act="loc-random-ipv6">${icon('signal')} آی‌پی تصادفی IPv6</button>
            <button class="btn ghost" type="button" data-act="loc-copy-region">${icon('copy')} کپی ساب همین منطقه</button>
          </div>
          <div class="scan-status" id="locStatus"></div>
          <div class="loc-grid" id="locGrid"></div>
        </div>
      </div>
    </section>
  </main>


  <!-- فرم ساخت/ویرایش کاربر: همهٔ گزینه‌های موتور به‌صورت داینامیک از
       USER_FORM_SCHEMA ساخته می‌شوند تا هیچ متغیری جا نیفتد. -->
  <div class="modal" id="createModal">
    <div class="modal-card wide user-form-modal">
      <div class="modal-head"><b id="userFormTitle">${icon('plus')} ایجاد کاربر جدید</b><button class="icon-btn" type="button" data-act="close-modal" data-modal="createModal">${icon('close')}</button></div>
      <div class="form-tabs" id="userFormTabs" role="tablist"></div>
      <div class="uf-summary" id="userFormSummary" aria-live="polite"></div>
      <div class="modal-body" id="userFormBody"></div>
      <div class="modal-foot">
        <button class="btn primary" type="button" data-act="save-user" id="userFormSubmit">${icon('check')} <span data-i18n="modal.createBtn">ساخت کاربر</span></button>
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="createModal"><span data-i18n="modal.cancel">انصراف</span></button>
      </div>
    </div>
  </div>

  <div class="modal" id="passwordModal">
    <div class="modal-card">
      <div class="modal-head"><b>${icon('key')} تغییر رمز مدیر</b><button class="icon-btn" type="button" data-act="close-modal" data-modal="passwordModal">${icon('close')}</button></div>
      <div class="modal-body">
        <div class="field"><label>رمز فعلی</label><input type="password" id="pwdOld" autocomplete="current-password"></div>
        <div class="field"><label>رمز جدید</label><input type="password" id="pwdNew" autocomplete="new-password"></div>
        <div class="field"><label>تکرار رمز جدید</label><input type="password" id="pwdNew2" autocomplete="new-password"></div>
      </div>
      <div class="modal-foot">
        <button class="btn primary" type="button" data-act="save-password">${icon('check')} ذخیره رمز</button>
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="passwordModal">انصراف</button>
      </div>
    </div>
  </div>

  <!-- بازگرداندن همهٔ تنظیمات به پیش‌فرض (دکمهٔ قرمز هدر) -->
  <div class="modal animated" id="resetAllModal" role="dialog" aria-modal="true">
    <div class="modal-card">
      <div class="modal-head"><b>${icon('refresh')} بازگرداندن همهٔ تنظیمات به پیش‌فرض</b><button class="icon-btn" type="button" data-act="close-modal" data-modal="resetAllModal" aria-label="بستن">${icon('close')}</button></div>
      <div class="modal-body">
        <p class="help-lead">اگر تنظیمات را به‌هم ریختی و نمی‌دانی کدام گزینه را عوض کردی، این دکمه همه‌چیز را به حالت اولیهٔ کارخانه برمی‌گرداند.</p>
        <ul class="reset-list">
          <li><b>چه چیزی ریست می‌شود:</b> تنظیمات کلی موتور (پروتکل‌ها، پورت‌ها، فرگمنت، DNS، WARP، مسیر خروج و...).</li>
          <li><b>چه چیزی دست‌نخورده می‌ماند:</b> کاربران، شناسه‌ها، حجم مصرف‌شده، تاریخ انقضا، رمز مدیر، مسیر پنل و توکن بروزرسانی.</li>
          <li><b>بعدش چه می‌شود:</b> ساب‌لینک‌ها با تنظیمات پیش‌فرض از نو ساخته می‌شوند؛ کافی است در کلاینت «بروزرسانی ساب» بزنی.</li>
        </ul>
        <div class="help-note"><b>پیشنهاد:</b> قبل از ریست، اگر تنظیم خاصی را دوست داشتی آن را یادداشت کن تا دوباره همان را وارد کنی.</div>
      </div>
      <div class="modal-foot">
        <button class="btn danger" type="button" data-act="confirm-reset">${icon('power')} بله، همه را پیش‌فرض کن</button>
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="resetAllModal">انصراف</button>
      </div>
    </div>
  </div>

  <!-- انتخاب قالب جامع اندرویدی + کلید روشن/خاموش افکت پس‌زمینه هماهنگ با قالب -->
  <div class="modal" id="themeModal" role="dialog" aria-modal="true" aria-labelledby="themeTitle">
    <div class="modal-card wide">
      <div class="modal-head">
        <b id="themeTitle">${icon('palette')} پوسته‌ها و قالب‌های آمادهٔ پنل</b>
        <button class="icon-btn" type="button" data-act="close-modal" data-modal="themeModal" aria-label="بستن">${icon('close')}</button>
      </div>
      <div class="modal-body">
        <!-- کلید تک‌حالته روشن/خاموش افکت زندهٔ پس‌زمینه (خودکار هماهنگ با قالب) -->
        <div class="switch-row" style="margin-bottom: 14px; padding: 13px 16px; border-radius: 20px; border-color: var(--line-strong); background: var(--neon-soft);">
          <div class="switch-meta">
            ${icon('sparkles')}
            <div>
              <b style="font-size: 0.85rem;">افکت زندهٔ پس‌زمینه (هماهنگ با قالب)</b>
              <span>وقتی روشن است، افکت متحرک پس‌زمینه به‌طور خودکار متناسب با قالب انتخابی تغییر می‌کند</span>
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" id="fxToggleSwitch" data-act="toggle-fx-switch" checked>
            <i></i>
          </label>
        </div>

        <p class="help-lead" style="margin-bottom: 8px;">هر قالب کل چیدمان، گوشهٔ کارت‌ها (برگی / قرصی / تیز / هولوگرافیک)، نوار ناوبری، انیمیشن صفحه‌ها، نشانگر موس، اسکرول‌بار و افکت پس‌زمینه را یکجا عوض می‌کند:</p>

        <div class="m3-theme-grid">
          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="zedsecure" style="--swatch:#d0bcff;--p-bg:#120d1d;--p-rad:999px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>ZedSecure <span class="theme-check">${icon('check')}</span></b>
            <small>اندروید ۱۶ · داک شناور پایین · کپسولی</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="aurora" style="--swatch:#2dd4bf;--p-bg:#000000;--p-rad:10px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Aurora <span class="theme-check">${icon('check')}</span></b>
            <small>مشکی AMOLED · چیدمان بنتو · فضا-زمان</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="neon" style="--swatch:#b5ff4d;--p-bg:#060c04;--p-rad:8px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Neon Lime <span class="theme-check">${icon('check')}</span></b>
            <small>نئون لایم · لمس فنری · باران داده</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="tokyo" style="--swatch:#7aa2f7;--p-bg:#080b18;--p-rad:4px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Tokyo <span class="theme-check">${icon('check')}</span></b>
            <small>سایبرپانک · گوشهٔ بریده · کهکشانی</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="solar" style="--swatch:#facc15;--p-bg:#120d02;--p-rad:999px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Solar <span class="theme-check">${icon('check')}</span></b>
            <small>طلایی خورشیدی · عناوین بزرگ · حباب نئون</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="ember" style="--swatch:#fb923c;--p-bg:#140803;--p-rad:4px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Ember <span class="theme-check">${icon('check')}</span></b>
            <small>اخگر صنعتی · گوشهٔ تیز · شبکهٔ پالس</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="moss" style="--swatch:#34d399;--p-bg:#04100a;--p-rad:14px 3px 14px 3px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Moss <span class="theme-check">${icon('check')}</span></b>
            <small>خزه‌ای · گوشه‌های برگی · ذرات شناور</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="clay" style="--swatch:#e08e6d;--p-bg:#140b08;--p-rad:999px">
            <span class="m3-phone"><span class="m3-orb"></span><span class="m3-pills"><i></i><i></i></span><span class="m3-bar"></span><span class="m3-cta"></span></span>
            <b>Clay <span class="theme-check">${icon('check')}</span></b>
            <small>سفالی گرم · داک پایین · شفق نرم</small>
          </button>

          <button class="m3-theme-card theme-card" type="button" data-act="set-theme" data-skin="light" style="--swatch:#0b8a4b;--p-bg:#eef3f0;--p-rad:8px">
            <span class="m3-phone" style="border-color:#cbd5e1;"><span class="m3-orb"></span><span class="m3-pills"><i style="background:#fff;border-color:#cbd5e1;"></i><i style="background:#fff;border-color:#cbd5e1;"></i></span><span class="m3-bar" style="background:#dde5e0;"></span><span class="m3-cta"></span></span>
            <b>Light <span class="theme-check">${icon('check')}</span></b>
            <small>مینیمال روشن · کنتراست بالا · روزانه</small>
          </button>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="themeModal">بستن</button>
      </div>
    </div>
  </div>

  <!-- پنجرهٔ ساخت وب‌پروکسی و پروکسی ضد فیلتر تلگرام (MTProto Fake-TLS & SOCKS5) -->
  <div class="modal" id="tgModal" role="dialog" aria-modal="true" aria-labelledby="tgModalTitle">
    <div class="modal-card wide">
      <div class="modal-head">
        <b id="tgModalTitle">${icon('telegram')} وب‌پروکسی و سازندهٔ پروکسی تلگرام</b>
        <button class="icon-btn" type="button" data-act="close-modal" data-modal="tgModal" aria-label="بستن">${icon('close')}</button>
      </div>
      <div class="modal-body">
        <p class="help-lead">از این بخش می‌توانید مستقیماً وب‌پروکسی زندهٔ تلگرام را باز کنید یا با دامنهٔ Fake-TLS (برای عبور از فیلترینگ ایران) لینک‌های پروکسی تلگرام (MTProto و SOCKS5) بسازید.</p>
        <div class="toolbar" style="margin-bottom: 14px;">
          <a class="btn primary" href="/webproxy" target="_blank" rel="noopener">${icon('external')} باز کردن وب‌پروکسی تلگرام (/webproxy)</a>
          <button class="btn" type="button" data-act="copy-tg-sub">${icon('copy')} کپی لینک اشتراک پروکسی تلگرام (/tg)</button>
        </div>
        <div class="form-grid" style="margin-bottom: 12px;">
          <div class="field">
            <label>کشور پروکسی تلگرام</label>
            <select id="tgProxyCountry">
              <option value="DE">آلمان (DE)</option>
              <option value="NL">هلند (NL)</option>
              <option value="FI">فنلاند (FI)</option>
              <option value="SE">سوئد (SE)</option>
              <option value="GB">بریتانیا (GB)</option>
              <option value="US">آمریکا (US)</option>
              <option value="TR">ترکیه (TR)</option>
            </select>
          </div>
          <div class="field">
            <label>دامنهٔ Fake-TLS (SNI ضد فیلتر)</label>
            <input type="text" id="tgProxySni" class="mono" value="www.google.com" placeholder="www.google.com">
          </div>
        </div>
        <div class="toolbar" style="margin-bottom: 12px;">
          <button class="btn primary" type="button" data-act="build-tg-proxy">${icon('bolt')} ساخت و دریافت پروکسی‌های تلگرام</button>
        </div>
        <div id="tgProxyList" class="table-wrap" style="padding: 10px;">
          <div class="empty">روی «ساخت و دریافت پروکسی‌های تلگرام» کلیک کنید تا لینک‌های آمادهٔ اتصال نمایش داده شوند.</div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="tgModal">بستن</button>
      </div>
    </div>
  </div>

  <!-- راهنمای کامل پنل: دو ثانیه بعد از ورود، با حرکت نرم باز می‌شود -->
  <div class="modal animated" id="helpModal" role="dialog" aria-modal="true" aria-labelledby="helpTitle">
    <div class="modal-card help-modal">
      <div class="modal-head">
        <b id="helpTitle">${icon('shield')} راهنمای پنل و ساخت کانفیگ</b>
        <button class="icon-btn" type="button" data-act="close-modal" data-modal="helpModal" aria-label="بستن راهنما">${icon('close')}</button>
      </div>

      <div class="help-tabs" role="tablist" aria-label="بخش‌های راهنما">
        <button class="help-tab is-active" type="button" role="tab" data-help-tab="quick">شروع سریع</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="config">ساخت کانفیگ</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="users">کاربران</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="scanner">اسکنر</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="warp">چندلوکیشن و WARP</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="clients">اتصال کلاینت‌ها</button>
        <button class="help-tab" type="button" role="tab" data-help-tab="fix">عیب‌یابی</button>
      </div>

      <div class="help-body">
        <!-- شروع سریع -->
        <section class="help-pane is-active" data-help-pane="quick">
          <p class="help-lead">سلام! این پنل مغز متفکر سرویس توست: از همین‌جا کاربر می‌سازی، نود و آدرس می‌سازی و ساب‌لینک تحویل می‌دهی. نگران نباش، همه‌چیز در سه قدم ساده راه می‌افتد.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('bolt')} سه قدم تا اولین اتصال</h4>
              <ol>
                <li>تب <b>کاربران</b> را باز کن و دکمهٔ <b>ایجاد کاربر جدید</b> را بزن.</li>
                <li>یک نام، حجم و مدت اعتبار بده؛ بقیهٔ گزینه‌ها را دست نزن و <b>ساخت کاربر</b> را بزن.</li>
                <li>روی کارت کاربر دکمهٔ <b>کپی ساب</b> را بزن و آدرس را در کلاینت وارد کن.</li>
              </ol>
            </div>
            <div class="help-card">
              <h4>${icon('link')} ساب‌لینک اصلی مدیر</h4>
              <ul>
                <li>دکمهٔ <b>کپی ساب اصلی</b> در تب کاربران، ساب کامل پنل را کپی می‌کند.</li>
                <li>این ساب همیشه <b>۴۰۰ نود</b> دارد: VLESS، Trojan، xHTTP، Shadowsocks، WARP و MASQUE.</li>
                <li>برای تست موتور و مقایسهٔ سرعت‌ها بهترین مرجع همین ساب است.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('lock')} امنیت اولیه</h4>
              <ul>
                <li>از دکمهٔ کلید در هدر، <b>رمز مدیر</b> را به یک رمز قوی تغییر بده.</li>
                <li>مسیر پنل اختصاصی است؛ آن را در اختیار کسی که نباید پنل را ببیند نگذار.</li>
                <li>هر کاربر باید شناسهٔ خودش را داشته باشد؛ شناسهٔ یک کاربر را برای دیگری نده.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>نکته:</b> هر زمان خواستی این راهنما را دوباره ببینی، روی آیکون سپر کنار دکمهٔ خروج در هدر بزن.</div>
        </section>

        <!-- ساخت کانفیگ -->
        <section class="help-pane" data-help-pane="config">
          <p class="help-lead">وقتی کاربر را می‌سازی یا ویرایش می‌کنی، یک فرم چندتبی باز می‌شود. هر تب یک خانوادهٔ تنظیمات است؛ همهٔ آن‌ها با توضیح کنارشان آمده‌اند و لازم نیست همه را پر کنی. پیش‌فرض‌ها انتخاب‌های خوبی هستند.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('layers')} پروتکل‌ها</h4>
              <ul>
                <li><b>VLESS:</b> پروتکل اصلی و سازگارترین گزینه؛ همیشه روشن بماند.</li>
                <li><b>Trojan:</b> روی شبکه‌هایی که VLESS را محدود می‌کنند، شانس دوم است.</li>
                <li><b>xHTTP:</b> ترنسپورت جدیدتر برای دور زدن محدودیت شدید؛ کمی سنگین‌تر است.</li>
                <li><b>Shadowsocks:</b> سبک و سریع؛ فرگمنت روی آن اعمال نمی‌شود.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('server')} آدرس، پورت و مسیر</h4>
              <ul>
                <li><b>پورت‌ها:</b> چند پورت را با کاما بنویس (مثلاً 443,2053,8443) تا اگر یکی بسته بود بقیه کار کنند.</li>
                <li><b>آدرس‌های دستی:</b> هر خط یک آدرس؛ قالب‌های پذیرفته‌شده در همان کادر توضیح داده شده است.</li>
                <li><b>دامنه‌های SNI و Host:</b> اگر دامنه‌ای داری که به همین ورکر وصل است، اینجا بگذار تا نودها بین آن‌ها بچرخند.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('signal')} دور زدن فیلترینگ</h4>
              <ul>
                <li><b>فرگمنت:</b> بستهٔ TLS را تکه‌تکه می‌کند تا اثر انگشت اتصال عادی نباشد.</li>
                <li><b>ECH:</b> نام دامنه را از دید شنودکننده پنهان می‌کند و به DNS از نوع DoH نیاز دارد.</li>
                <li><b>پریست فرگمنت:</b> اگر مطمئن نیستی، پریست پیشنهادی را انتخاب کن؛ بهترین نتیجه با تست به دست می‌آید.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('sanctions')} مسیر خروج</h4>
              <ul>
                <li><b>تحریم‌شکن:</b> ترافیک را از یک آدرس بیرون از ایران خارج می‌کند تا سرویس‌های مسدود باز شوند.</li>
                <li><b>پروکسی خروجی:</b> اگر socks5 یا http داری، اینجا بده تا خروجی از آن برود.</li>
                <li><b>منطقهٔ خروج:</b> کشور خروجی را انتخاب کن؛ روی برخی سایت‌ها (بانک، استریم) اثر دارد.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('radar')} پریست‌ها</h4>
              <ul>
                <li><b>ایران سریع:</b> برای استفادهٔ روزمره در ایران؛ تعادل خوبی بین سرعت و پایداری دارد.</li>
                <li><b>پرقدرت:</b> برای شبکه‌های سخت‌گیرتر؛ کمی سنگین‌تر است.</li>
                <li>پریست فقط فرم را پر می‌کند؛ بعد از آن می‌توانی هر فیلدی را دستی عوض کنی.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('gauge')} تعداد نود هر کاربر</h4>
              <ul>
                <li>عدد نود در ساب همان کاربر تعیین می‌کند چند نود ساخته شود.</li>
                <li>صفر یعنی سقف ندارد و همهٔ آدرس‌های زنده استفاده می‌شوند.</li>
                <li>برای گوشی معمولاً ۳۰ تا ۶۰ نود کافی است؛ بیشتر از آن فقط لیست را شلوغ می‌کند.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>هشدارهای هوشمند:</b> اگر ترکیبی از تنظیمات با هم جور نباشد (مثلاً ECH بدون DNS امن)، پنل کنار فرم به تو می‌گوید.</div>
        </section>

        <!-- کاربران -->
        <section class="help-pane" data-help-pane="users">
          <p class="help-lead">قلب روزمرهٔ پنل همین‌جاست: هر کارت یک کاربر است با مصرف، انقضا و دسترسی‌های سریع.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('users')} کارت کاربر</h4>
              <ul>
                <li><b>کپی ساب:</b> لینک اختصاصی همین کاربر.</li>
                <li><b>صفحهٔ وضعیت:</b> صفحهٔ قابل ارسال به کاربر با راهنمای اتصال و دکمه‌های دانلود.</li>
                <li><b>ویرایش:</b> همهٔ تنظیمات موتور برای همان کاربر.</li>
                <li><b>ریست مصرف:</b> شمارندهٔ حجم را صفر می‌کند؛ تاریخ انقضا دست نمی‌خورد.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('layers')} لینک‌های آماده</h4>
              <ul>
                <li><b>Clash:</b> همان ساب با خروجی مناسب Mihomo و Clash.</li>
                <li><b>Singbox:</b> خروجی JSON برای Hiddify و sing-box.</li>
                <li><b>دامنه:</b> فقط نودهای دامنه‌محور، مناسب وقتی آی‌پی خام مشکل دارد.</li>
                <li><b>IPv6 همراه اول:</b> نسخهٔ IPv6 که در شبکهٔ همراه اول عملکرد بهتری دارد.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('gauge')} کنترل و پایش</h4>
              <ul>
                <li><b>تست نود:</b> نودهای کاربر به‌صورت زنده تست می‌شوند و نتیجه همان‌جا می‌آید.</li>
                <li><b>حجم و انقضا:</b> صفر یعنی نامحدود یا بدون تاریخ انقضا.</li>
                <li><b>غیرفعال کردن:</b> کاربری که سقف حجمش تمام شود اجازهٔ اتصال ندارد.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>یادت باشد:</b> بعد از هر تغییر در تنظیمات یک کاربر، به او بگو در کلاینت «بروزرسانی ساب» بزند تا نودهای تازه بیاید.</div>
        </section>

        <!-- اسکنر -->
        <section class="help-pane" data-help-pane="scanner">
          <p class="help-lead">اسکنر کارخانهٔ آدرس‌های خوب است: آی‌پی‌ها را تست می‌کند و هر چه واقعاً جواب بدهد به فهرست نودها اضافه می‌کند.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('radar')} چه چیزی اسکن می‌شود</h4>
              <ul>
                <li><b>آدرس و دامنه:</b> منابع آنلاین و آی‌پی‌های تازهٔ لبه را می‌خواند.</li>
                <li><b>پروکسی:</b> پروکسی‌های کشوری را پیدا می‌کند تا مسیر خروج داشته باشی.</li>
                <li><b>دستی:</b> هر آدرسی که خودت در کادر بگذاری تست می‌شود.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('filter')} انتخاب‌ها</h4>
              <ul>
                <li><b>کشور:</b> خروجی از همان کشور انتخاب شود.</li>
                <li><b>تعداد:</b> چند مورد برتر نگه داشته شود.</li>
                <li><b>خانوادهٔ آدرس:</b> IPv4، IPv6 یا هر دو.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('check')} اعمال نتیجه</h4>
              <ul>
                <li>نتایج تست فقط نمایش داده می‌شوند؛ تا <b>اعمال</b> را نزنی چیزی ذخیره نمی‌شود.</li>
                <li>اعمال روی «آدرس‌های دستی» یا «پروکسی خروجی» انجام می‌شود.</li>
                <li>می‌توانی نتیجه را برای یک کاربر خاص هم ذخیره کنی.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>تجربهٔ عملی:</b> اگر سرعت افت کرد، اول یک اسکن تازه بگیر و بعد ساب را بروزرسانی کن؛ معمولاً مشکل از آی‌پی اشباع‌شده است.</div>
        </section>

        <!-- چندلوکیشن و WARP -->
        <section class="help-pane" data-help-pane="warp">
          <p class="help-lead">اینجا آدرس‌های آمادهٔ کشور‌به‌کشور و نودهای WARP را می‌بینی؛ همین تب برای کارهای حرفه‌ای بیشترین کاربرد را دارد.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('globe')} ساب هر کشور</h4>
              <ul>
                <li>هر کارت یک کشور است؛ دکمهٔ کپی، ساب همان کشور را می‌دهد.</li>
                <li>آی‌پی تصادفی تازه، آی‌پی خروجی همان کشور را عوض می‌کند.</li>
                <li>نسخهٔ IPv6 برای شبکه‌هایی که IPv4 را محدود می‌کنند مفید است.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('warp')} خانوادهٔ WARP</h4>
              <ul>
                <li><b>WARP:</b> اتصال رایگان کلادفلر برای دسترسی به سرویس‌های عمومی.</li>
                <li><b>WARP PRO:</b> با کلید لایسنس، پهنای باند و کیفیت بالاتر.</li>
                <li><b>چندلوکیشن:</b> چند لبهٔ مختلف برای انتخاب دستی در کلاینت.</li>
                <li><b>MASQUE:</b> نسخهٔ HTTP/3 روی CONNECT-IP؛ فقط Mihomo و Clash.Meta و فورک Hiddify آن را می‌فهمند.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('bolt')} امنزیا و پروفایل‌ها</h4>
              <ul>
                <li><b>AmneziaWG:</b> بسته‌های فریبنده برای عبور از DPI؛ نسخهٔ ۳ کامل‌ترین است.</li>
                <li><b>پروفایل‌های تنظیم:</b> چند نسخه با MTU و DNS مختلف برای تست در اپراتور.</li>
                <li>کلید و آی‌پی هر نود در پنل پنهان است؛ فقط دکمه‌های کپی و دانلود را ببین.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('zip')} اندپوینت WARP</h4>
              <ul>
                <li>یک آدرس برای همهٔ فرمت‌ها: <span class="help-kbd">/warp/شناسه</span></li>
                <li>خودش از روی کلاینت تشخیص می‌دهد YAML، JSON یا base64 بدهد.</li>
                <li>برای گرفتن همهٔ فایل‌ها با هم، دکمهٔ ZIP را بزن.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>نکته:</b> اگر WARP وصل نشد، اول فایل .conf را در اپلیکیشن رسمی تست کن؛ اگر آنجا هم وصل نشد، مشکل از شبکهٔ اپراتور است نه پنل.</div>
        </section>

        <!-- اتصال کلاینت‌ها -->
        <section class="help-pane" data-help-pane="clients">
          <p class="help-lead">ساب‌لینک یک آدرس است که کلاینت آن را می‌خواند و نودها را خودکار می‌سازد. فرمت درست، نصف راه است.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('link')} آدرس اصلی</h4>
              <ul>
                <li>ساختار: <span class="help-kbd">/sub/شناسه</span> که شناسه همان UUID کاربر است.</li>
                <li>این آدرس خودش فرمت مناسب کلاینت را انتخاب می‌کند.</li>
                <li>لینک را کامل کپی کن؛ حتی یک حرف کم، ساب را خراب می‌کند.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('terminal')} پارامترهای پرکاربرد</h4>
              <ul>
                <li><span class="help-kbd">?target=clash</span> خروجی Mihomo</li>
                <li><span class="help-kbd">?target=singbox</span> خروجی sing-box</li>
                <li><span class="help-kbd">?target=raw</span> فهرست خام لینک‌ها</li>
                <li><span class="help-kbd">?limit=80</span> تعداد نود این دریافت</li>
                <li><span class="help-kbd">?country=DE</span> ساب اختصاصی یک کشور</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('globe')} کدام کلاینت؟</h4>
              <ul>
                <li><b>Hiddify:</b> ساب معمولی را وارد کن؛ JSON و YAML را هم می‌خواند.</li>
                <li><b>v2rayNG:</b> ساب معمولی یا base64.</li>
                <li><b>Clash Verge / FlClash / Stash:</b> دکمهٔ Clash یا <span class="help-kbd">?target=clash</span>.</li>
                <li><b>Shadowrocket / Streisand:</b> ساب معمولی یا base64.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('refresh')} بروزرسانی</h4>
              <ul>
                <li>در کلاینت گزینهٔ بروزرسانی خودکار را روی ۶ تا ۱۲ ساعت بگذار.</li>
                <li>اگر نودها عوض شدند، یک‌بار دستی بروزرسانی کن.</li>
                <li>بعضی کلاینت‌ها کش می‌کنند؛ اگر تغییری ندیدی کلاینت را ببند و باز کن.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>اگر ساب خالی آمد:</b> آدرس را در مرورگر باز کن. اگر جواب داد مشکل از کلاینت است؛ اگر جواب نداد لینک یا شناسه را چک کن.</div>
        </section>

        <!-- عیب‌یابی -->
        <section class="help-pane" data-help-pane="fix">
          <p class="help-lead">هر چیزی که خراب شد، اول آرام باش: بیشتر مشکلات با یکی از این چند کار حل می‌شود.</p>
          <div class="help-grid">
            <div class="help-card">
              <h4>${icon('stop')} ساب در کلاینت وارد نمی‌شود</h4>
              <ul>
                <li>آدرس را بدون پارامتر اضافه در مرورگر باز کن؛ اگر متن یا فایل آمد، آدرس سالم است.</li>
                <li>برای کلاینتت فرمت درست را انتخاب کن (Clash، sing-box یا ساب معمولی).</li>
                <li>اگر کلاینت نسخهٔ قدیمی است، اول بروزرسانی‌اش کن؛ بعضی فرمت‌های تازه را نمی‌فهمد.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('gauge')} کند است یا قطع و وصل می‌شود</h4>
              <ul>
                <li>یک آی‌پی یا دامنهٔ دیگر را از اسکنر امتحان کن.</li>
                <li>پورت را عوض کن؛ بعضی اپراتورها پورت‌های خاص را می‌بندند.</li>
                <li>اگر فقط بعضی سایت‌ها باز نمی‌شوند، مسئله خروجی است نه اتصال.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('refresh')} خطای ۱۱۰۱ یا خطای اتصال ورکر</h4>
              <ul>
                <li>یعنی نسخهٔ مستقر با بایندینگ دیتابیس هم‌خوان نیست.</li>
                <li>کافی است نسخه را دوباره مستقر کنی؛ دادهٔ کاربران در D1 محفوظ می‌ماند.</li>
                <li>بعد از استقرار چند ثانیه صبر کن و صفحه را دوباره باز کن.</li>
              </ul>
            </div>
            <div class="help-card">
              <h4>${icon('power')} بازگرداندن تنظیمات</h4>
              <ul>
                <li>دکمهٔ <b>قرمز چرخش</b> در هدر همهٔ تنظیمات کلی را به پیش‌فرض برمی‌گرداند.</li>
                <li>کاربران، مصرف و تاریخ انقضا دست‌نخورده می‌مانند.</li>
                <li>بعد از ریست، ساب‌ها را در کلاینت بروزرسانی کن.</li>
              </ul>
            </div>
          </div>
          <div class="help-note"><b>هنوز گیر کردی؟</b> از دکمهٔ تلگرام در هدر پیام بده و همین متن خطا را بفرست؛ سریع‌تر راهنمایی می‌شوی.</div>
        </section>
      </div>

      <div class="help-foot">
        <button class="btn primary" type="button" data-act="close-modal" data-modal="helpModal">${icon('check')} فهمیدم، شروع می‌کنم</button>
        <a class="btn ghost" href="${SUPPORT_URL}" target="_blank" rel="noopener">${icon('telegram')} پشتیبانی</a>
        <label class="help-check"><input type="checkbox" id="helpNoAuto"> دیگر خودکار باز نشود</label>
      </div>
    </div>
  </div>

  <!-- پنجرهٔ بروزرسانی: بعد از بستن راهنما (با ۳ ثانیه تأخیر) برای نسخهٔ قدیمی باز می‌شود -->
  <div class="modal animated" id="updateModal" role="dialog" aria-modal="true" aria-labelledby="updateTitle">
    <div class="modal-card update-card">
      <div class="modal-head">
        <b id="updateTitle">${icon('download')} بروزرسانی پنل</b>
        <button class="icon-btn" type="button" data-act="close-modal" data-modal="updateModal" aria-label="بستن بروزرسانی">${icon('close')}</button>
      </div>
      <div class="modal-body update-body">
        <div class="update-hero">
          <span class="update-orb">${icon('download')}</span>
          <div class="update-copy">
            <span class="update-kicker">نسخهٔ نصب‌شده <b class="mono">v${VERSION.replace(/^v/i, '')}</b></span>
            <div class="update-versions"><span>آخرین نسخه</span><b class="mono" id="updLatest">—</b></div>
            <div class="update-state" id="updState">در حال بررسی...</div>
          </div>
        </div>
        <p class="update-note">کلید کلادفلر به‌صورت محرمانه در سکرت‌های همین ورکر قرار گرفته است؛ برای بروزرسانی لازم نیست هیچ توکنی وارد کنید. اگر نسخهٔ تازه‌ای موجود باشد، با یک کلیک روی همین ورکر مستقر می‌شود.</p>
        <div class="update-meta">
          <div class="kv"><span>نصب خودکار</span><b id="updAuto">—</b></div>
          <div class="kv"><span>اسکریپت هدف</span><b class="mono" id="updScript">—</b></div>
        </div>
        <ul id="updNotes" class="loc-meta" style="margin:0;padding-inline-start:18px;display:none;"></ul>
        <div class="adv-box" id="updDiagBox" style="display:none;">
          <div class="loc-meta" id="updDiagBody" style="line-height:2;"></div>
        </div>
      </div>
      <div class="modal-foot update-foot">
        <button class="btn primary" type="button" data-act="apply-update">${icon('download')} بروزرسانی و استقرار</button>
        <button class="btn" type="button" data-act="download-update">${icon('download')} دانلود فایل</button>
        <button class="btn ghost" type="button" data-act="close-modal" data-modal="updateModal">بعداً</button>
      </div>
    </div>
  </div>

  <!-- لیست‌های آماده: همهٔ ورودی‌های متنی فرم ساخت کاربر و تنظیمات پیشنهاد آماده دارند -->
  <datalist id="dlPorts">
    <option value="443,2053,2087,8443"></option>
    <option value="443"></option>
    <option value="8443"></option>
    <option value="2053,2087,2096"></option>
    <option value="443,8443"></option>
    <option value="2053"></option>
    <option value="2087"></option>
    <option value="2096"></option>
  </datalist>
  <datalist id="dlHttpPorts">
    <option value="80,8080"></option>
    <option value="80"></option>
    <option value="8080"></option>
    <option value="8080,8880"></option>
    <option value="2052,2082"></option>
  </datalist>
  <datalist id="dlNodeCount">
    <option value="30"></option><option value="50"></option><option value="80"></option>
    <option value="100"></option><option value="120"></option><option value="150"></option>
    <option value="200"></option>
  </datalist>
  <datalist id="dlDataLimit">
    <option value="0"></option><option value="10"></option><option value="30"></option>
    <option value="50"></option><option value="100"></option><option value="200"></option>
  </datalist>
  <datalist id="dlExpireDays">
    <option value="0"></option><option value="7"></option><option value="15"></option>
    <option value="30"></option><option value="60"></option><option value="90"></option>
    <option value="180"></option>
  </datalist>
  <datalist id="dlFragmentLen">
    <option value="100-200"></option><option value="50-100"></option><option value="10-20"></option>
    <option value="5-10"></option><option value="200-400"></option>
  </datalist>
  <datalist id="dlFragmentInt">
    <option value="10-20"></option><option value="5-10"></option><option value="20-40"></option>
    <option value="1-3"></option>
  </datalist>
  <datalist id="dlFragmentPackets">
    <option value="tlshello"></option><option value="1-3"></option><option value="1-5"></option>
  </datalist>
  <datalist id="dlProxy">
    <option value="socks5://host:1080"></option>
    <option value="socks5://user:pass@host:1080"></option>
    <option value="http://host:8080"></option>
    <option value="https://host:443"></option>
  </datalist>
  <datalist id="dlProxyIp">
    <option value="example.com:443"></option><option value="1.2.3.4:443"></option>
    <option value="[2606:4700::1]:443"></option>
  </datalist>
  <datalist id="dlYx">
    <option value="1.2.3.4:443#Node"></option>
    <option value="[2606:4700::1]:443#IPv6"></option>
    <option value="example.com:443#Domain"></option>
    <option value="1.2.3.4:443#A,5.6.7.8:443#B"></option>
  </datalist>
  <datalist id="dlCountries">
    <option value="DE"></option><option value="FR"></option><option value="NL"></option>
    <option value="US"></option><option value="GB"></option><option value="TR"></option>
    <option value="JP"></option><option value="KR"></option><option value="SG"></option>
    <option value="FI"></option><option value="SE"></option><option value="AE"></option>
  </datalist>
  <datalist id="dlWarpEndpoint">
    <option value="162.159.192.1:2408#DE"></option>
    <option value="188.114.97.1:500#TR"></option>
    <option value="[2606:4700:d0::a29f:c001]:2408#US"></option>
    <option value="162.159.192.1:2408#DE,188.114.97.1:500#TR"></option>
  </datalist>
  <datalist id="dlDNS">
    <option value="https://223.5.5.5/dns-query"></option>
    <option value="https://1.1.1.1/dns-query"></option>
    <option value="https://8.8.8.8/dns-query"></option>
    <option value="https://dns.google/dns-query"></option>
    <option value="https://cloudflare-dns.com/dns-query"></option>
  </datalist>
  <datalist id="dlHomepage">
    <option value="https://www.cloudflare.com"></option>
    <option value="https://www.google.com"></option>
    <option value="https://example.com"></option>
  </datalist>
  <datalist id="dlAdminPath">
    <option value="admin"></option><option value="panel"></option><option value="manage"></option>
  </datalist>
  <datalist id="dlTp">
    <option value=""></option><option value="mili-pass"></option><option value="change-me"></option>
  </datalist>

  <div class="toast"><div class="toast-body" id="toastBody"></div></div>

<script>
  var INITIAL_DATA = ${safeInitialJson};
  var ICO = ${clientIcons};
  var MAX_USERS = INITIAL_DATA.maxUsersLimit || 3;
  var ADMIN_PATH = String(INITIAL_DATA.adminPath || '').replace(/^\\/+|\\/+$/g, '');
  var API_BASE = ADMIN_PATH ? '/' + ADMIN_PATH : '';
  var state = {
    config: INITIAL_DATA.config || {},
    users: INITIAL_DATA.users || [],
    diagnostics: INITIAL_DATA.diagnostics || {}
  };
  var scanResults = [];

  function $(id) { return document.getElementById(id); }
  function origin() { return window.location.origin; }
  // دسترسی امن به حافظهٔ مرورگر (در حالت‌های مسدود/خصوصی خطا ندهد)
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  // اگر مرورگر پنجرهٔ تأیید را مسدود کند، به‌جای «هیچ اتفاقی نیفتادن» ادامه بده
  function ask(msg) {
    try { var r = window.confirm(msg); if (typeof r === 'boolean') return r; } catch (e) {}
    return true;
  }
  function userKey(u) { return (u && (u.uuid || u.id)) || ''; }
  function escHtml(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // نصب اپ: اگر مرورگر رویداد نصب داده باشد پنجرهٔ نصب باز می‌شود، وگرنه
  // راهنمای همان دستگاه (iOS / اندروید / دسکتاپ) نشان داده می‌شود.
  function promptInstall() {
    var p = window.miliInstallPrompt;
    if (p && typeof p.prompt === 'function') {
      p.prompt();
      if (p.userChoice && p.userChoice.then) {
        p.userChoice.then(function() { window.miliInstallPrompt = null; });
      }
      return;
    }
    var standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    if (standalone || (window.navigator && window.navigator.standalone)) {
      showToast('برنامه از قبل نصب شده و در حالت مستقل اجرا می‌شود', 'ok');
      return;
    }
    var ua = String((window.navigator && window.navigator.userAgent) || '');
    var isIos = ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPod') > -1;
    var isAndroid = ua.indexOf('Android') > -1;
    if (isIos) showToast('در سافاری: دکمهٔ اشتراک‌گذاری ← Add to Home Screen', 'ok');
    else if (isAndroid) showToast('در کروم: منوی سه‌نقطه ← Install app / افزودن به صفحهٔ اصلی', 'ok');
    else showToast('در کروم یا اج: آیکون نصب در نوار آدرس ← Install', 'ok');
  }

  function showToast(text, kind) {
    var t = $('toastBody');
    t.textContent = text;
    t.className = 'toast-body show ' + (kind || '');
    clearTimeout(t._timer);
    t._timer = setTimeout(function() { t.className = 'toast-body ' + (kind || ''); }, 2800);
  }

  function copyText(text, okMsg) {
    var done = function() { showToast(okMsg || 'در حافظه کپی شد', 'ok'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function() { legacyCopy(text, done); });
    } else {
      legacyCopy(text, done);
    }
  }
  function legacyCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { showToast('کپی ناموفق بود', 'err'); }
    document.body.removeChild(ta);
  }

  function api(path, options) {
    var opts = options || {};
    opts.headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    return fetch(API_BASE + path, opts).then(function(res) {
      return res.json().catch(function() { return { success: false, message: 'پاسخ نامعتبر از سرور' }; })
        .then(function(data) { data._status = res.status; return data; });
    });
  }

  function fmtGb(bytes) { return (Number(bytes || 0) / 1073741824).toFixed(2); }
  function fmtDate(ms) {
    if (!ms) return t('card.noExpiry');
    try { return new Date(ms).toLocaleDateString('fa-IR'); } catch (e) { return '—'; }
  }

  function activeProtocols() {
    var c = state.config || {};
    var list = [];
    list.push('VLESS');
    if (c.es === 'yes') list.push('SS');
    if (c.et === 'yes') list.push('Trojan');
    if (c.ex === 'yes') list.push('xHTTP');
    if (c.ech === 'yes') list.push('ECH');
    return list;
  }

  function showPanel(name) {
    document.querySelectorAll('.panel').forEach(function(p) {
      p.classList.toggle('is-active', p.getAttribute('data-panel') === name);
    });
    document.querySelectorAll('.tab[data-tab]').forEach(function(b) {
      b.classList.toggle('is-active', b.getAttribute('data-tab') === name);
    });
    document.querySelectorAll('.drawer-item[data-tab]').forEach(function(b) {
      b.classList.toggle('is-active', b.getAttribute('data-tab') === name);
    });
    toggleDrawer(false);
    if (history.replaceState) history.replaceState(null, '', '#' + name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // کشوی منوی موبایل: باز/بسته شدن با انیمیشن به سمت پایین
  function toggleDrawer(open) {
    var drawer = $('navDrawer');
    var backdrop = $('drawerBackdrop');
    if (!drawer) return;
    var next = open === undefined ? !drawer.classList.contains('is-open') : !!open;
    drawer.classList.toggle('is-open', next);
    drawer.setAttribute('aria-hidden', next ? 'false' : 'true');
    if (backdrop) backdrop.classList.toggle('is-open', next);
    var btn = document.querySelector('[data-act="toggle-drawer"]');
    if (btn) btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    document.body.style.overflow = next ? 'hidden' : '';
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') toggleDrawer(false);
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth > 820) toggleDrawer(false);
  });

  function renderMetrics() {
    var users = state.users || [];
    var totalBytes = users.reduce(function(a, u) { return a + Number(u.usedBytes || 0); }, 0);
    $('mUsers').innerHTML = users.length + ' <small>/ ' + MAX_USERS + '</small>';
    $('mUsersFoot').textContent = users.length >= MAX_USERS ? 'سقف کاربران تکمیل است' : (MAX_USERS - users.length) + ' ظرفیت آزاد';
    $('mTraffic').innerHTML = fmtGb(totalBytes) + ' <small>GB</small>';
    $('mIps').innerHTML = (state.diagnostics.healthyCfIps || 0) + ' <small>نود</small>';
    $('mProto').textContent = activeProtocols().join(' + ');

    var storage = state.diagnostics.storageMode || (state.diagnostics.d1Enabled ? 'D1' : 'Memory');
    $('kvStorage').textContent = storage;
    $('kvBinding').textContent = state.diagnostics.d1BindingName || '—';
    $('kvPath').textContent = ADMIN_PATH ? '/' + ADMIN_PATH.slice(0, 6) + '…' + ADMIN_PATH.slice(-4) : '—';
  }

  function renderUsers() {
    var grid = $('usersGrid');
    var users = state.users || [];
    grid.innerHTML = '';
    $('usersEmpty').style.display = users.length ? 'none' : 'block';
    users.forEach(function(u, idx) {
      var used = Number(u.usedBytes || 0);
      var limitGb = Number(u.dataLimitGb || 0);
      var pct = limitGb > 0 ? Math.min(100, Math.round((used / (limitGb * 1073741824)) * 100)) : 0;
      var base = origin() + '/sub/' + userKey(u);
      var statusUrl = origin() + '/status/' + userKey(u);
      var card = document.createElement('div');
      card.className = 'user-card';
      var nodeCount = Number(u.subNodeCount || 0);
      var key = userKey(u);
      card.innerHTML = [
        '<div class="user-head">',
          '<div><div class="user-name">' + escHtml(u.username || ('کاربر ' + (idx + 1))) + '</div>',
          '<div class="user-uuid">/' + 'sub/' + key + '</div></div>',
          '<span class="pill ' + (u.enabled ? 'on' : 'off') + '">' + (u.enabled ? t('card.active') : t('card.inactive')) + '</span>',
        '</div>',
        '<div class="usage"><span>' + t('card.usage') + ' ' + fmtGb(used) + ' GB</span><span>' + (limitGb > 0 ? limitGb + ' GB' : t('card.unlimited')) + '</span></div>',
        '<div class="bar"><i style="width:' + Math.max(pct, 2) + '%"></i></div>',
        '<div class="usage"><span>' + t('card.expiry') + ' ' + fmtDate(u.expireAt) + '</span><span>' + (nodeCount ? nodeCount + ' نود' : t('card.nodesAuto')) + '</span></div>',
        '<div class="user-tags">' + activeProtocols().map(function(p) { return '<span class="tag on">' + p + '</span>'; }).join('') +
          (u.config && u.config.sb === 'yes' ? '<span class="tag on" title="خروجی از آدرس واسط بیرون از ایران">' + ICO.sanctions + ' تحریم‌شکن</span>' : '') +
          (u.config && u.config.awgv ? '<span class="tag" title="نسخهٔ امنزیا در نودهای WARP">' + ICO.warp + ' امنزیا ' + u.config.awgv + '</span>' : '') +
        '</div>',
        '<div class="user-actions" style="margin-top:auto;">',
          '<button class="btn sm primary" type="button" data-act="copy" data-url="' + base + '">' + ICO.copy + ' ' + t('btn.copySub') + '</button>',
          '<a class="btn sm" href="' + statusUrl + '" target="_blank" rel="noopener">' + ICO.external + ' ' + t('btn.status') + '</a>',
          '<button class="btn sm" type="button" data-act="edit-user" data-id="' + u.id + '">' + ICO.settings + ' ' + t('btn.editUser') + '</button>',
        '</div>',
        '<details class="user-more">',
          '<summary>لینک‌ها و ابزارها</summary>',
          '<div class="user-actions">',
            '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?target=clash">' + ICO.layers + ' Clash</button>',
            '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?target=singbox">' + ICO.bolt + ' Singbox</button>',
            '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?set=domain">' + ICO.globe + ' ' + t('btn.domainSub') + '</button>',
            '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?set=ipv6">' + ICO.signal + ' IPv6 همراه اول</button>',
            '<button class="btn sm ghost" type="button" data-act="test-nodes" data-user="' + key + '">' + ICO.radar + ' ' + t('btn.testNodes') + '</button>',
            '<button class="btn sm ghost" type="button" data-act="reset-user" data-id="' + u.id + '">' + ICO.refresh + ' ' + t('btn.resetUser') + '</button>',
            '<button class="btn sm danger" type="button" data-act="delete-user" data-id="' + u.id + '">' + ICO.trash + ' ' + 'حذف</button>',
          '</div>',
        '</details>'
      ].join('');
      grid.appendChild(card);
    });
    // انتخاب کاربر هدف برای نوشتن نتیجهٔ اسکن (yx / s)
    var targetSel = $('scanUser');
    if (targetSel) {
      var current = targetSel.value;
      targetSel.innerHTML = '<option value="">تنظیمات پیش‌فرض پنل</option>' + users.map(function(u) {
        return '<option value="' + escHtml(u.id) + '">' + escHtml(u.username || u.id) + '</option>';
      }).join('');
      targetSel.value = current && users.some(function(u) { return u.id === current; }) ? current : '';
    }
    renderMetrics();
  }

  function renderLocations() {
    var grid = $('locGrid');
    if (!grid) return;
    var base = origin() + '/sub/' + (userKey(state.users[0]) || ADMIN_PATH);
    var countries = INITIAL_DATA.countrySources || {};
    var token = userKey(state.users[0]) || '';
    var ep = origin() + '/warp/' + encodeURIComponent(token);
    var html = '<div class="loc-card"><div><div class="loc-name">همه لوکیشن‌ها</div><div class="loc-meta">MULTI</div></div>' +
      '<div class="loc-acts"><button class="loc-act c-copy" type="button" data-act="copy" data-url="' + base + '?country=MULTI" title="کپی ساب" aria-label="کپی ساب">' + ICO.copy + '</button></div></div>' +
      // کارت اختصاصی وب‌پروکسی و پروکسی تلگرام
      '<div class="loc-card"><div><div class="loc-name">وب‌پروکسی و پروکسی تلگرام</div><div class="loc-meta">MTProto Fake-TLS · SOCKS5 · پیش‌نمایش بدون فیلتر کانال‌ها</div></div>' +
      '<div class="toolbar">' +
      '<button class="btn sm primary" type="button" data-act="open-tg">' + ICO.telegram + ' ساخت پروکسی تلگرام</button>' +
      '<a class="btn sm" href="/webproxy" target="_blank" rel="noopener">' + ICO.external + ' وب‌پروکسی (/webproxy)</a>' +
      '<button class="btn sm ghost" type="button" data-act="copy-tg-sub">' + ICO.copy + ' ساب تلگرام (/tg)</button>' +
      '</div></div>' +
      // وارپ و اپن‌وی‌پی آماده، بدون اسکنر و بدون تنظیم
      '<div class="loc-card"><div><div class="loc-name">WARP / WARP PRO</div><div class="loc-meta">AmneziaWG + WireGuard · Clash · sing-box · IPv4+IPv6</div></div>' +
      '<div class="toolbar">' +
      '<a class="btn sm" href="' + origin() + '/warp/' + encodeURIComponent(token) + '?format=zip" download>' + ICO.zip + ' ZIP همهٔ فرمت‌ها</a>' +
      '<a class="btn sm ghost" href="' + origin() + '/warp/' + encodeURIComponent(token) + '?format=conf" download>WARP.conf</a>' +
      '<a class="btn sm ghost" href="' + origin() + '/warp/' + encodeURIComponent(token) + '?format=links" download>links.txt</a>' +
      '<a class="btn sm ghost" href="' + origin() + '/warp/masque/' + encodeURIComponent(token) + '?format=zip" download>' + ICO.zip + ' ZIP جداگانهٔ MASQUE</a>' +
      '</div></div>' +
      // اندپوینت مخصوص WARP: یک آدرس با همهٔ فرمت‌ها
      '<div class="loc-card ep-card"><div><div class="loc-name">اندپوینت اختصاصی WARP</div><div class="loc-meta">Clash/Mihomo · Hiddify/sing-box · WireGuard · Shadowrocket — هر کاربر توکن خودش را دارد</div></div>' +
      '<div class="toolbar">' +
      '<button class="btn sm primary" type="button" data-act="copy" data-url="' + ep + '?format=clash">' + ICO.copy + ' Clash</button>' +
      '<button class="btn sm ghost" type="button" data-act="copy" data-url="' + ep + '?format=singbox">' + ICO.copy + ' sing-box</button>' +
      '<button class="btn sm ghost" type="button" data-act="copy" data-url="' + ep + '?format=conf">' + ICO.copy + ' WireGuard</button>' +
      '<button class="btn sm ghost" type="button" data-act="copy" data-url="' + ep + '?format=base64">' + ICO.copy + ' base64</button>' +
      '<a class="btn sm ghost" href="' + ep + '?format=zip">' + ICO.zip + ' ZIP</a>' +
      '</div></div>' +
      '<div class="loc-card"><div><div class="loc-name">OpenVPN</div><div class="loc-meta">.ovpn · 3 پروفایل تنظیم · ZIP</div></div>' +
      '<div class="toolbar">' +
      '<a class="btn sm" href="' + base + '?target=ovpn&format=zip" download>' + ICO.zip + ' ZIP</a>' +
      '<a class="btn sm ghost" href="' + base + '?target=ovpn" download>.ovpn</a>' +
      '</div></div>';
    var vipList = INITIAL_DATA.vipCountries || [];
    Object.keys(countries).forEach(function(code) {
      var vip = vipList.indexOf(code) > -1;
      html += '<div class="loc-card"><div><div class="loc-name">' + countries[code].name + (vip ? ' <span class="tag on">VIP</span>' : '') + '</div><div class="loc-meta">' + code + ' · ' + (vip ? 'منابع ویژه + منابع عادی' : 'منابع منطقه‌ای') + '</div></div>' +
        '<div class="loc-acts">' +
        '<button class="loc-act c-copy" type="button" data-act="copy" data-url="' + base + '?country=' + code + '" title="کپی ساب" aria-label="کپی ساب">' + ICO.copy + '</button>' +
        '<button class="loc-act c-proxy" type="button" data-act="country-proxy" data-code="' + code + '" title="پروکسی → s" aria-label="پروکسی → s">' + ICO.link + '</button>' +
        '<button class="loc-act c-ip" type="button" data-act="country-ip" data-code="' + code + '" title="آی‌پی → yx" aria-label="آی‌پی → yx">' + ICO.globe + '</button>' +
        '</div></div>';
    });
    grid.innerHTML = html;
    var locUser = $('locUser');
    if (locUser) {
      var current = locUser.value;
      locUser.innerHTML = '<option value="">تنظیمات پیش‌فرض پنل</option>' + (state.users || []).map(function(u) {
        return '<option value="' + escHtml(u.id) + '">' + escHtml(u.username || u.id) + '</option>';
      }).join('');
      locUser.value = current && (state.users || []).some(function(u) { return u.id === current; }) ? current : '';
    }
  }

  // افزودن تصادفی آی‌پی سالم همان منطقه به نودهای ترجیحی (yx) کاربر انتخابی
  function locRandomIp(ipv6) {
    var code = $('locRegion') ? $('locRegion').value : 'DE';
    var status = $('locStatus');
    var userId = $('locUser') ? $('locUser').value : '';
    if (status) { status.className = 'scan-status'; status.textContent = 'در حال خواندن منابع آدرس و تست اتصال برای ' + code + '...'; }
    var send = function(payload) {
      return fetch(origin() + '/api/scanner/fetch-and-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function(res) { return res.json(); });
    };
    send({ mode: ipv6 ? 'ipv6' : 'ipv4', country: code, limit: 8 })
      .then(function(data) {
        if (!data.success || !data.proxies || !data.proxies.length) {
          if (status) { status.className = 'scan-status err'; status.textContent = data.message || 'آی‌پی سالمی پیدا نشد.'; }
          return null;
        }
        var items = data.proxies.map(function(p) { return { ip: p.ip, port: p.port, name: p.ip }; });
        return fetch(origin() + '/api/scanner/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Mili-Admin': '1' },
          body: JSON.stringify({ target: 'yx', items: items, userId: userId })
        }).then(function(res) { return res.json(); }).then(function(applied) {
          if (status) {
            status.className = applied.success ? 'scan-status' : 'scan-status err';
            status.textContent = applied.message || (applied.success ? 'آی‌پی‌ها اضافه شدند' : 'افزودن آی‌پی ناموفق بود');
          }
          if (applied.success) reloadUsers();
          return applied;
        });
      })
      .catch(function() {
        if (status) { status.className = 'scan-status err'; status.textContent = 'خطای شبکه در افزودن آی‌پی تصادفی.'; }
      });
  }

  function locCopyRegion() {
    var code = $('locRegion') ? $('locRegion').value : 'DE';
    var user = (state.users || []).filter(function(u) { return u.id === ($('locUser') ? $('locUser').value : ''); })[0] || state.users[0];
    var token = userKey(user) || ADMIN_PATH;
    copyText(origin() + '/sub/' + token + '?country=' + code, 'ساب منطقهٔ ' + code + ' کپی شد');
  }

  function fillSettings() {
    var c = state.config || {};
    document.querySelectorAll('.switch input[data-key]').forEach(function(input) {
      input.checked = c[input.getAttribute('data-key')] === 'yes';
    });
    document.querySelectorAll('input[data-key], select[data-key]').forEach(function(input) {
      if (input.type === 'checkbox') return;
      var key = input.getAttribute('data-key');
      var val = c[key];
      if (key === 'ipRotation') {
        var map = { 0: 'off', '0': 'off', 5: '5m', 15: '15m', 30: '30m', 60: '1h', 1440: '24h' };
        val = (typeof val === 'string' && isNaN(Number(val))) ? val : (map[val] || 'off');
      }
      if (val === undefined || val === null) val = '';
      input.value = String(val);
    });
    var pathView = $('adminPathView');
    if (pathView) pathView.value = ADMIN_PATH ? '/' + ADMIN_PATH : '—';
    var dnsSel = $('dnsPreset');
    if (dnsSel) {
      var presets = INITIAL_DATA.dnsPresets || [];
      var match = presets.filter(function(d) { return d.value === c.customDNS; })[0];
      dnsSel.value = match ? c.customDNS : (c.customDNS ? 'custom' : (presets[0] ? presets[0].value : 'custom'));
    }
  }

  var LANG = lsGet('mili_lang') === 'en' ? 'en' : 'fa';
  function t(key) {
    var dict = (INITIAL_DATA.i18n || {})[LANG] || (INITIAL_DATA.i18n || {}).fa || {};
    return dict[key] || key;
  }
  var SKIN_NAMES = { zedsecure: 'ZedSecure (اندروید ۱۶)', aurora: 'Aurora (شفق AMOLED)', neon: 'Neon Lime (نئون لایم)', tokyo: 'Tokyo (سایبرپانک)', solar: 'Solar (خورشیدی)', ember: 'Ember (اخگر صنعتی)', moss: 'Moss (برگی خزه‌ای)', clay: 'Clay (سفالی گرم)', emerald: 'زمردی', cyan: 'سایبر آبی', violet: 'کوانتوم بنفش', amber: 'کهربایی', rose: 'آتشین' };
  function activeSkin() {
    var skin = document.body.getAttribute('data-theme') || 'neon';
    return SKIN_NAMES[skin] ? skin : 'neon';
  }
  function updateThemeCards() {
    var current = document.body.classList.contains('light-mode') ? 'light' : activeSkin();
    document.querySelectorAll('.theme-card').forEach(function(card) {
      card.classList.toggle('is-active', card.getAttribute('data-skin') === current);
    });
  }
  function updateThemeLabel() {
    var btn = $('themeBtn');
    var light = document.body.classList.contains('light-mode');
    var name = light ? (LANG === 'en' ? 'Light' : 'روشن') : (LANG === 'en' ? 'Theme' : (SKIN_NAMES[activeSkin()] || 'نئون سبز'));
    var text = (LANG === 'en' ? 'Theme: ' : 'قالب ظاهری: ') + name;
    if (btn) {
      btn.setAttribute('title', text);
      btn.setAttribute('aria-label', text);
      btn.innerHTML = ICO.palette;
    }
    updateThemeCards();
  }
  function applySkin(skin) {
    var next = SKIN_NAMES[skin] ? skin : 'neon';
    var light = document.body.classList.contains('light-mode');
    document.body.setAttribute('data-theme', light ? 'light' : next);
    lsSet('mili_skin', next);
    updateThemeLabel();
    if (typeof fxRefresh === 'function') fxRefresh();
  }
  function setTheme(skin) {
    if (skin === 'light') {
      document.body.classList.add('light-mode');
      document.body.setAttribute('data-theme', 'light');
      lsSet('mili_theme', 'light');
      updateThemeLabel();
      if (typeof fxRefresh === 'function') fxRefresh();
    } else {
      document.body.classList.remove('light-mode');
      lsSet('mili_theme', 'dark');
      applySkin(skin);
    }
    updateThemeLabel();
    closeModal('themeModal');
    showToast('قالب ظاهری: ' + (skin === 'light' ? 'روشن' : (SKIN_NAMES[skin] || 'نئون سبز')), 'ok');
  }

  /* ==========================================================================
     افکت زندهٔ پس‌زمینه (FX) — لایهٔ canvas مستقل، هماهنگ با قالب فعلی
     ========================================================================== */
  var FX_NAMES = {
    off: 'خاموش', auto: 'هماهنگ با قالب', aurora: 'شفق قطبی',
    cosmos: 'فضای بی‌کران', spacetime: 'فضا-زمان درهم‌تنیده',
    particles: 'ذرات شناور', grid: 'شبکهٔ پالس', matrix: 'باران داده', orbs: 'حباب نئون'
  };
  var FX_DEFAULT = { zedsecure: 'aurora', aurora: 'spacetime', neon: 'matrix', tokyo: 'cosmos', solar: 'orbs', ember: 'grid', moss: 'particles', clay: 'aurora', emerald: 'spacetime', cyan: 'cosmos', violet: 'spacetime', amber: 'grid', rose: 'orbs', light: 'aurora' };
  var FX_CHOICE = lsGet('mili_fx') === 'off' ? 'off' : 'auto';
  var fx = {
    canvas: null, ctx: null, raf: 0, mode: 'off', items: [],
    w: 0, h: 0, dpr: 1, last: 0, t: 0,
    rgbA: [181, 255, 77], rgbB: [99, 230, 212], rgbC: [140, 242, 144]
  };
  var fxReduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function fxCurrentSkin() {
    return document.body.classList.contains('light-mode') ? 'light' : activeSkin();
  }
  function fxResolve() {
    if (FX_CHOICE === 'off') return 'off';
    return FX_DEFAULT[fxCurrentSkin()] || 'aurora';
  }
  function fxRgb(varName, fallback) {
    try {
      var v = getComputedStyle(document.body).getPropertyValue(varName).trim();
      var parts = v.match(/\d+/g);
      if (parts && parts.length >= 3) return parts.slice(0, 3).map(Number);
    } catch (e) {}
    return fallback;
  }
  function fxRgba(rgb, alpha) {
    return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha + ')';
  }
  function fxMix(a, b, k) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * k),
      Math.round(a[1] + (b[1] - a[1]) * k),
      Math.round(a[2] + (b[2] - a[2]) * k)
    ];
  }
  function fxUpdateCards() {
    document.querySelectorAll('.fx-card').forEach(function(card) {
      card.classList.toggle('is-active', card.getAttribute('data-fx') === FX_CHOICE);
    });
  }
  function fxUpdateLabel() {
    var btn = $('fxBtn');
    if (!btn) return;
    var text = 'افکت زندهٔ پس‌زمینه: ' + (FX_CHOICE === 'auto' ? ('خودکار (' + (FX_NAMES[fxResolve()] || 'خاموش') + ')') : (FX_NAMES[FX_CHOICE] || 'هماهنگ با قالب'));
    btn.setAttribute('title', text);
    btn.setAttribute('aria-label', text);
  }
  function fxSeed() {
    fx.items = [];
    var i, n;
    if (fx.mode === 'particles') {
      n = Math.max(26, Math.min(70, Math.round(fx.w * fx.h / 24000)));
      for (i = 0; i < n; i++) {
        fx.items.push({
          x: Math.random() * fx.w, y: Math.random() * fx.h,
          vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.5) * 16,
          r: 0.9 + Math.random() * 1.8
        });
      }
    } else if (fx.mode === 'matrix') {
      n = Math.ceil(fx.w / 20);
      for (i = 0; i < n; i++) {
        fx.items.push({ x: i * 20 + 4, y: Math.random() * fx.h, speed: 40 + Math.random() * 120, seed: i * 7 });
      }
    } else if (fx.mode === 'orbs') {
      for (i = 0; i < 6; i++) {
        fx.items.push({
          x: Math.random() * fx.w, y: Math.random() * fx.h,
          r: 60 + Math.random() * 150, speed: 0.05 + Math.random() * 0.12,
          phase: Math.random() * 6.28, info: i % 2 === 1
        });
      }
    } else if (fx.mode === 'aurora') {
      for (i = 0; i < 3; i++) {
        fx.items.push({ x: 0.2 + i * 0.3, y: 0.15 + (i % 2) * 0.55, size: 0.42 + i * 0.08, phase: i * 2.1, speed: 0.18 + i * 0.06 });
      }
    } else if (fx.mode === 'cosmos') {
      n = Math.max(90, Math.min(170, Math.round(fx.w * fx.h / 9000)));
      for (i = 0; i < n; i++) {
        fx.items.push({
          a: Math.random() * 6.2832, r: 0.04 + Math.random() * 0.96,
          speed: 0.035 + Math.random() * 0.11, size: 0.5 + Math.random() * 1.5,
          info: Math.random() < 0.3
        });
      }
    } else if (fx.mode === 'spacetime') {
      for (i = 0; i < 30; i++) {
        fx.items.push({
          a: Math.random() * 6.2832, r: 0.12 + Math.random() * 0.82,
          speed: 0.18 + Math.random() * 0.55, size: 0.7 + Math.random() * 1.6,
          info: i % 3 === 0
        });
      }
    }
  }
  function fxDraw(dt) {
    var ctx = fx.ctx;
    if (!ctx) return;
    var w = fx.w, h = fx.h, t = fx.t, i, j;
    ctx.clearRect(0, 0, w, h);
    if (fx.mode === 'off') return;
    if (fx.mode === 'aurora') {
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < fx.items.length; i++) {
        var p = fx.items[i];
        var x = w * (p.x + Math.sin(t * p.speed + p.phase) * 0.14);
        var y = h * (p.y + Math.cos(t * p.speed * 0.8 + p.phase) * 0.12);
        var radius = Math.max(w, h) * p.size;
        var g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, fxRgba(i === 1 ? fx.rgbB : fx.rgbA, 0.14));
        g.addColorStop(0.55, fxRgba(i === 1 ? fx.rgbB : fx.rgbA, 0.05));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = 'source-over';
    } else if (fx.mode === 'cosmos') {
      ctx.globalCompositeOperation = 'lighter';
      var ccx = w * 0.5, ccy = h * 0.5;
      var cmax = Math.sqrt(w * w + h * h) * 0.58;
      var cg = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, cmax);
      cg.addColorStop(0, fxRgba(fx.rgbC, 0.055));
      cg.addColorStop(0.55, fxRgba(fx.rgbA, 0.03));
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, w, h);
      var neb = [
        { x: w * 0.16 + Math.sin(t * 0.07) * w * 0.05, y: h * 0.22, r: Math.max(w, h) * 0.32, c: fx.rgbB, al: 0.06 },
        { x: w * 0.86 + Math.cos(t * 0.05) * w * 0.04, y: h * 0.76, r: Math.max(w, h) * 0.34, c: fx.rgbA, al: 0.05 }
      ];
      for (i = 0; i < neb.length; i++) {
        var nb = neb[i];
        var ng = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.r);
        ng.addColorStop(0, fxRgba(nb.c, nb.al));
        ng.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = ng;
        ctx.beginPath(); ctx.arc(nb.x, nb.y, nb.r, 0, 6.2832); ctx.fill();
      }
      for (i = 0; i < fx.items.length; i++) {
        var st = fx.items[i];
        var prevR = st.r;
        st.r += dt * st.speed;
        if (st.r > 1.12) {
          st.r = 0.03 + Math.random() * 0.08;
          st.a = Math.random() * 6.2832;
          prevR = st.r;
        }
        var rr = st.r * cmax;
        var rr0 = Math.max(0, prevR - st.speed * dt * 2.4) * cmax;
        var sx = Math.cos(st.a), sy = Math.sin(st.a);
        var x1 = ccx + sx * rr, y1 = ccy + sy * rr * 0.92;
        var x0 = ccx + sx * rr0, y0 = ccy + sy * rr0 * 0.92;
        var sa = Math.min(0.8, 0.06 + st.r * 0.62);
        ctx.strokeStyle = fxRgba(st.info ? fx.rgbB : fx.rgbA, sa);
        ctx.lineWidth = Math.max(0.5, st.size * (0.55 + st.r));
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        if (st.r > 0.28) {
          ctx.fillStyle = fxRgba(st.info ? fx.rgbB : fx.rgbC, sa);
          ctx.fillRect(x1 - 1, y1 - 1, 2.2, 2.2);
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    } else if (fx.mode === 'spacetime') {
      ctx.globalCompositeOperation = 'lighter';
      var tcx = w * 0.5 + Math.sin(t * 0.16) * w * 0.025;
      var tcy = h * 0.5 + Math.cos(t * 0.13) * h * 0.02;
      var tmax = Math.sqrt(w * w + h * h) * 0.58;
      var glow = ctx.createRadialGradient(tcx, tcy, 0, tcx, tcy, tmax * 0.55);
      glow.addColorStop(0, fxRgba(fx.rgbA, 0.2));
      glow.addColorStop(0.35, fxRgba(fx.rgbB, 0.07));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      var rings = 12;
      for (i = 0; i < rings; i++) {
        var rad = 18 + Math.pow(i / (rings - 1), 1.7) * tmax;
        var rot = t * (0.12 + i * 0.02) + i * 0.28;
        var squash = 0.56 + Math.sin(t * 0.2 + i) * 0.02;
        ctx.strokeStyle = fxRgba(i % 3 === 0 ? fx.rgbB : fx.rgbA, 0.055 + (i / (rings - 1)) * 0.15);
        ctx.lineWidth = i === rings - 1 ? 1.2 : 0.8;
        ctx.beginPath();
        ctx.ellipse(tcx, tcy, rad, rad * squash, 0, rot, rot + 5.7);
        ctx.stroke();
      }
      var spokes = 16;
      for (i = 0; i < spokes; i++) {
        var a0 = (i / spokes) * 6.2832 + t * 0.09;
        var bend = 0.5 + Math.sin(t * 0.3 + i) * 0.12;
        ctx.strokeStyle = fxRgba(fx.rgbB, 0.045);
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(tcx + Math.cos(a0) * 22, tcy + Math.sin(a0) * 22 * 0.58);
        ctx.quadraticCurveTo(
          tcx + Math.cos(a0 + bend) * tmax * 0.45, tcy + Math.sin(a0 + bend) * tmax * 0.45 * 0.58,
          tcx + Math.cos(a0 + bend * 1.7) * tmax, tcy + Math.sin(a0 + bend * 1.7) * tmax * 0.58
        );
        ctx.stroke();
      }
      for (i = 0; i < 3; i++) {
        var hr = tmax * (0.15 + i * 0.055);
        ctx.strokeStyle = fxRgba(i === 0 ? fx.rgbC : fx.rgbA, 0.28 - i * 0.06);
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(tcx, tcy, hr, hr * 0.58, 0, 0, 6.2832); ctx.stroke();
      }
      for (i = 0; i < fx.items.length; i++) {
        var tp = fx.items[i];
        var oldA = tp.a;
        tp.a += dt * tp.speed;
        var tpr = tp.r * tmax;
        var tx = tcx + Math.cos(tp.a) * tpr, ty = tcy + Math.sin(tp.a) * tpr * 0.58;
        var ox = tcx + Math.cos(oldA) * tpr, oy = tcy + Math.sin(oldA) * tpr * 0.58;
        ctx.strokeStyle = fxRgba(tp.info ? fx.rgbC : fx.rgbB, 0.3);
        ctx.lineWidth = tp.size * 0.6;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = fxRgba(tp.info ? fx.rgbB : fx.rgbA, 0.65);
        ctx.beginPath(); ctx.arc(tx, ty, tp.size, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    } else if (fx.mode === 'orbs') {
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < fx.items.length; i++) {
        var o = fx.items[i];
        o.x += Math.cos(t * o.speed + o.phase) * dt * 14;
        o.y += Math.sin(t * o.speed + o.phase) * dt * 12;
        var og = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        var oc = o.info ? fx.rgbB : fx.rgbA;
        og.addColorStop(0, fxRgba(oc, 0.2));
        og.addColorStop(0.6, fxRgba(oc, 0.05));
        og.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    } else if (fx.mode === 'particles') {
      for (i = 0; i < fx.items.length; i++) {
        var q = fx.items[i];
        q.x += q.vx * dt; q.y += q.vy * dt;
        if (q.x < -10) q.x = w + 10; if (q.x > w + 10) q.x = -10;
        if (q.y < -10) q.y = h + 10; if (q.y > h + 10) q.y = -10;
      }
      for (i = 0; i < fx.items.length; i++) {
        var a = fx.items[i];
        for (j = i + 1; j < fx.items.length; j++) {
          var b = fx.items[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            var alpha = (1 - d2 / 13000) * 0.16;
            ctx.strokeStyle = fxRgba(fx.rgbB, alpha);
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = fxRgba(fx.rgbA, 0.55);
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
    } else if (fx.mode === 'grid') {
      var horizon = h * 0.5;
      var vp = w / 2;
      ctx.strokeStyle = fxRgba(fx.rgbA, 0.12);
      ctx.lineWidth = 1;
      for (i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(vp + i * 16, horizon);
        ctx.lineTo(vp + i * w * 0.18, h);
        ctx.stroke();
      }
      var gap = 46, offset = (fx.t * 34) % gap;
      for (i = 0; i < 16; i++) {
        var yy = horizon + i * gap + offset;
        if (yy < horizon || yy > h) continue;
        var fade = Math.max(0, 1 - (yy - horizon) / (h - horizon + 1)) * 0.3;
        ctx.strokeStyle = fxRgba(fx.rgbB, fade);
        ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(w, yy); ctx.stroke();
      }
    } else if (fx.mode === 'matrix') {
      ctx.font = '13px ui-monospace, monospace';
      ctx.textAlign = 'center';
      var glyphs = '0123456789ABCDEF';
      for (i = 0; i < fx.items.length; i++) {
        var col = fx.items[i];
        col.y += col.speed * dt;
        if (col.y > h + 40) { col.y = -Math.random() * 160; col.speed = 40 + Math.random() * 120; }
        for (j = 0; j < 6; j++) {
          var gy = col.y - j * 17;
          if (gy < -20 || gy > h + 20) continue;
          var al = (1 - j / 6) * 0.5;
          ctx.fillStyle = fxRgba(fx.rgbA, al);
          var gi = ((Math.floor(gy / 17) + col.seed) % glyphs.length + glyphs.length) % glyphs.length;
          ctx.fillText(glyphs.charAt(gi), col.x, gy);
        }
      }
    }
  }
  function fxLoop(ts) {
    if (!fx.canvas) return;
    if (!fx.last) fx.last = ts;
    var delta = Math.min(80, ts - fx.last);
    if (document.hidden) { fx.last = ts; fx.raf = requestAnimationFrame(fxLoop); return; }
    if (delta < 32) { fx.raf = requestAnimationFrame(fxLoop); return; }
    fx.last = ts;
    fx.t += delta / 1000;
    fxDraw(delta / 1000);
    fx.raf = requestAnimationFrame(fxLoop);
  }
  function fxResize() {
    if (!fx.canvas) return;
    var c = fx.canvas;
    fx.w = Math.max(320, window.innerWidth || 360);
    fx.h = Math.max(320, window.innerHeight || 360);
    fx.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    c.width = Math.round(fx.w * fx.dpr);
    c.height = Math.round(fx.h * fx.dpr);
    fx.ctx.setTransform(fx.dpr, 0, 0, fx.dpr, 0, 0);
    fxSeed();
    fxDraw(0);
  }
  function fxStart() {
    if (!fx.canvas) fx.canvas = $('fxCanvas');
    if (!fx.canvas) return;
    if (!fx.ctx) fx.ctx = fx.canvas.getContext('2d', { alpha: true });
    if (!fx.ctx) return;
    fx.rgbA = fxRgb('--neon-rgb', [181, 255, 77]);
    fx.rgbB = fxRgb('--info-rgb', [99, 230, 212]);
    fx.rgbC = fxMix(fx.rgbA, fx.rgbB, 0.5);
    fx.mode = fxResolve();
    document.body.setAttribute('data-fx', FX_CHOICE);
    document.body.classList.toggle('fx-on', fx.mode !== 'off');
    fxUpdateCards();
    fxUpdateLabel();
    if (fx.raf) cancelAnimationFrame(fx.raf);
    fx.raf = 0;
    fx.last = 0;
    fx.t = 0;
    fxResize();
    if (fx.mode !== 'off' && !fxReduce) fx.raf = requestAnimationFrame(fxLoop);
  }
  function fxRefresh() {
    if (typeof fxStart === 'function') fxStart();
  }
  function applyFx(choice) {
    var next = choice === 'off' ? 'off' : 'auto';
    FX_CHOICE = next;
    lsSet('mili_fx', next);
    var sw = $('fxToggleSwitch');
    if (sw) sw.checked = next !== 'off';
    fxStart();
    showToast('افکت پس‌زمینه: ' + (next === 'off' ? 'خاموش' : ('روشن (هماهنگ با قالب: ' + (FX_NAMES[fxResolve()] || 'شفق') + ')')), 'ok');
  }
  function toggleFxOnOff() {
    applyFx(FX_CHOICE === 'off' ? 'auto' : 'off');
  }
  function buildTgProxiesInModal() {
    var c = $('tgProxyCountry') ? $('tgProxyCountry').value : 'DE';
    var s = $('tgProxySni') ? $('tgProxySni').value : 'www.google.com';
    var box = $('tgProxyList');
    if (box) box.innerHTML = '<div class="empty">در حال ساخت پروکسی‌های تلگرام و تست اتصال...</div>';
    fetch(origin() + '/api/telegram/build?country=' + encodeURIComponent(c) + '&sni=' + encodeURIComponent(s))
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!box) return;
        if (!d || !d.success || !d.proxies || !d.proxies.length) {
          box.innerHTML = '<div class="empty">پروکسی تلگرامی یافت نشد.</div>';
          return;
        }
        box.innerHTML = '<table class="scan"><thead><tr><th>نوع</th><th>سرور و پورت</th><th>SNI / استتار</th><th>اتصال فوری</th></tr></thead><tbody>' +
          d.proxies.map(function(p) {
            return '<tr><td><span class="tag on">' + escHtml(p.type) + '</span></td>' +
              '<td class="mono">' + escHtml(p.server + ':' + p.port) + '</td>' +
              '<td class="mono">' + escHtml(p.sni || '—') + '</td>' +
              '<td><div class="toolbar"><a class="btn sm primary" href="' + escHtml(p.tgUrl) + '">اتصال تلگرام</a>' +
              '<button class="btn sm" type="button" data-act="copy" data-url="' + escHtml(p.tmeUrl) + '">کپی لینک</button></div></td></tr>';
          }).join('') + '</tbody></table>';
        showToast(d.message || 'پروکسی‌های تلگرام ساخته شدند', 'ok');
      })
      .catch(function() {
        if (box) box.innerHTML = '<div class="empty">خطا در ساخت پروکسی تلگرام</div>';
      });
  }
  window.addEventListener('resize', function() {
    if (fx.mode && fx.mode !== 'off') fxResize();
  });
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden && fx.mode !== 'off' && !fx.raf && !fxReduce) fx.raf = requestAnimationFrame(fxLoop);
  });
  function applyLanguage() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var text = t(key);
      if (text) el.textContent = text;
    });
    updateThemeLabel();
  }
  function toggleTheme() {
    var light = document.body.classList.toggle('light-mode');
    if (light) {
      document.body.setAttribute('data-theme', 'light');
      lsSet('mili_theme', 'light');
    } else {
      var saved = lsGet('mili_skin');
      var next = SKIN_NAMES[saved] ? saved : 'neon';
      document.body.setAttribute('data-theme', next);
      lsSet('mili_theme', 'dark');
    }
    updateThemeLabel();
    if (typeof fxRefresh === 'function') fxRefresh();
  }
  function toggleLang() {
    LANG = LANG === 'fa' ? 'en' : 'fa';
    lsSet('mili_lang', LANG);
    applyLanguage();
    renderUsers();
    renderLocations();
    if (typeof scanResults !== 'undefined' && scanResults.length) renderScanRows(scanResults);
  }

  // هشدار هوشمند تداخل تنظیمات
  function detectConflicts(c) {
    var out = [];
    if (c.es === 'yes' && c.frag === 'yes') out.push('Shadowsocks از فرگمنت پشتیبانی نمی‌کند؛ نودهای SS بدون fragment ساخته می‌شوند (مجاز است).');
    if (c.ech === 'yes' && !/^https:\\/\\//i.test(String(c.customDNS || ''))) out.push('ECH به یک DNS از نوع DoH (https://) نیاز دارد.');
    if (c.ech === 'yes' && c.dkby === 'no') out.push('با فعال بودن ECH، پورت‌های HTTP خودکار حذف می‌شوند.');
    if (c.frag === 'yes' && (!c.fragmentPreset || c.fragmentPreset === 'off')) out.push('فرگمنت روشن است اما پریست روی «غیرفعال» است؛ پارامتری ساخته نمی‌شود.');
    if (c.epi === 'no' && c.epd === 'no' && !String(c.yx || '').trim()) out.push('همه منابع آدرس خاموش‌اند؛ سابلینک فقط از هاست ورکر ساخته می‌شود.');
    if (c.ev === 'no' && c.et === 'no' && c.ex === 'no' && c.es === 'no') out.push('هیچ پروتکلی روشن نیست؛ هسته به‌ناچار VLESS را فعال می‌کند.');
    if (String(c.s || '').trim() && !/^(socks5?|https?):\\/\\//i.test(String(c.s).trim())) out.push('آدرس پروکسی خروجی باید با socks5:// یا http:// شروع شود.');
    if (c.yxURL && c.egi === 'no') out.push('منبع آنلاین آدرس وارد شده اما گزینهٔ «منبع آنلاین آدرس» خاموش است.');
    var ports = String(c.ports || '').split(/[,\\s]+/).filter(Boolean).map(Number).filter(function(p) { return p >= 1 && p <= 65535; });
    if (!ports.length) out.push('لیست پورت‌های نود خالی/نامعتبر است؛ از 443 استفاده می‌شود.');
    if (c.ipRotation && c.ipRotation !== 'off' && !String(c.yx || '').trim()) out.push('چرخش آی‌پی فعال است اما فهرست آدرس‌های دستی خالی است.');
    if (c.warpPro === 'yes' && !String(c.warpLicense || '').trim()) out.push('WARP پلاس روشن است اما لایسنس آن وارد نشده؛ نود با برچسب «بدون لایسنس» ساخته می‌شود.');
    return out;
  }
  // ------------------------------------------------------------------
  // فرم ساخت/ویرایش کاربر — همهٔ گزینه‌های موتور
  // ------------------------------------------------------------------
  var USER_FORM_SCHEMA = [
    {
      id: 'protocols',
      title: 'پروتکل‌ها',
      icon: 'layers',
      fields: [
        { key: 'ev', section: 'پروتکل‌های فعال', label: 'VLESS', hint: 'پروتکل اصلی؛ بهتر است روشن بماند', type: 'switch', def: 'yes' },
        { key: 'et', section: 'پروتکل‌های فعال', label: 'Trojan', type: 'switch', def: 'no' },
        { key: 'ex', section: 'پروتکل‌های فعال', label: 'xHTTP', type: 'switch', def: 'no' },
        { key: 'es', section: 'پروتکل‌های فعال', label: 'Shadowsocks', type: 'switch', def: 'no' },
        { key: 'tp', section: 'تنظیمات پروتکل', label: 'رمز Trojan', type: 'text', def: '', list: 'dlTp', ph: 'خالی = شناسهٔ خودکار کاربر' },
        { key: 'sspass', section: 'تنظیمات پروتکل', label: 'رمز Shadowsocks', type: 'text', def: '', ph: 'خالی = شناسهٔ خودکار کاربر' },
        { key: 'jk', section: 'تنظیمات پروتکل', label: 'زنجیرهٔ خانگی', type: 'switch', def: 'no' },
        { key: 'dkby', section: 'تنظیمات پروتکل', label: 'حذف پورت‌های HTTP', type: 'switch', def: 'no' }
      ]
    },
    {
      id: 'transport',
      title: 'امنیت و انتقال',
      icon: 'shield',
      fields: [
        { key: 'ech', section: 'امنیت', label: 'رمزنگاری ECH', type: 'switch', def: 'no' },
        { key: 'doh', section: 'امنیت', label: 'DNS رمزنگاری‌شده (DoH)', hint: 'در کانفیگ کلاینت، پرس‌وجوهای DNS از مسیر DoH انجام می‌شود', type: 'switch', def: 'yes' },
        { key: 'customECHDomain', section: 'امنیت', label: 'دامنهٔ ECH', type: 'select', def: 'cloudflare-ech.com', options: 'echDomains', raw: true },
        { key: 'customDNS', section: 'امنیت', label: 'سرور DNS رمزنگاری‌شده', type: 'select', def: 'https://223.5.5.5/dns-query', options: 'dnsPresets', raw: true },
        { key: 'alpn', section: 'امنیت', label: 'پروتکل‌های لایهٔ انتقال (ALPN)', type: 'select', def: '', options: [['', 'خودکار'], ['h2,http/1.1', 'h2 + http/1.1'], ['h3,h2,http/1.1', 'h3 + h2 + http/1.1']] },
        { key: 'fp', section: 'امنیت', label: 'اثر انگشت TLS', type: 'select', def: 'chrome', options: 'fingerprints' },
        { key: 'patt', section: 'انتقال و فرگمنت', label: 'مسیر WebSocket', type: 'select', def: '/?ed=2048', options: 'pathPatterns' },
        { key: 'ports', section: 'انتقال و فرگمنت', label: 'پورت‌های امن (TLS)', type: 'text', def: '443', list: 'dlPorts', ph: '443' },
        { key: 'httpPorts', section: 'انتقال و فرگمنت', label: 'پورت‌های HTTP', type: 'text', def: '80', list: 'dlHttpPorts', ph: '80 — خالی برای حذف' },
        { key: 'tcp', section: 'انتقال و فرگمنت', label: 'TCP سریع', hint: 'tcp-concurrent و tcp-fast-open در کانفیگ کلاینت', type: 'switch', def: 'yes' },
        { key: 'udp', section: 'انتقال و فرگمنت', label: 'عبور UDP', hint: 'نودها UDP را عبور می‌دهند (بازی و تماس)', type: 'switch', def: 'yes' },
        { key: 'frag', section: 'انتقال و فرگمنت', label: 'فرگمنت TLS', type: 'switch', def: 'yes' },
        { key: 'fragmentPreset', section: 'انتقال و فرگمنت', label: 'پریست فرگمنت', type: 'select', def: 'mci', options: 'fragmentPresets' },
        { key: 'fragmentLength', section: 'انتقال و فرگمنت', label: 'طول فرگمنت', type: 'text', def: '100-200', list: 'dlFragmentLen' },
        { key: 'fragmentInterval', section: 'انتقال و فرگمنت', label: 'فاصلهٔ فرگمنت', type: 'text', def: '10-20', list: 'dlFragmentInt' },
        { key: 'fragmentPackets', section: 'انتقال و فرگمنت', label: 'نوع بسته‌های فرگمنت', type: 'text', def: 'tlshello', list: 'dlFragmentPackets' }
      ]
    },
    {
      id: 'addresses',
      title: 'آدرس‌ها و منطقه',
      icon: 'pin',
      fields: [
        { key: 'region', section: 'منطقه', label: 'منطقهٔ خروجی', type: 'select', def: 'auto', options: 'regions', hint: 'کشور خروجی نودها؛ «خودکار» یعنی بدون محدودیت کشور.' },
        { key: 'ipMode', section: 'آی‌پی نود در کلاینت', label: 'حالت آی‌پی', type: 'select', def: 'country', options: [['country', 'کشور ثابت (آدرس‌ها از استخر تازه می‌شوند)'], ['fixed', 'آی‌پی ثابت (یک آدرس برای همهٔ نودها)']], hint: 'در حالت «آی‌پی ثابت»، با هر پینگ یا بروزرسانی ساب، آدرس و کشور خروجی نود عوض نمی‌شود؛ برای تضمین این ثبات، نودهای WARP در این حالت ساخته نمی‌شوند.' },
        { key: 'ipPinned', section: 'آی‌پی نود در کلاینت', label: 'آی‌پی ثابت دلخواه', type: 'text', def: '', ph: '104.16.0.1 یا 104.16.0.1:443 — خالی = انتخاب پایدار خودکار', hint: 'فقط در حالت «آی‌پی ثابت» استفاده می‌شود؛ خالی بماند، پنل خودش یک آدرس پایدار انتخاب می‌کند.' },
        { key: 'yx', section: 'آدرس‌های دستی', label: 'آدرس‌های دستی', type: 'textarea', rows: 4, wide: true, def: '', pool: true, ph: ['104.16.0.1:443#آلمان', '104.17.0.1:2053', '1.2.3.4', '[2606:4700::1]:443#آمریکا'].join(String.fromCharCode(10)), hint: 'هر آدرس در یک خط؛ هر قالبی که بخواهید قابل قبول است: <code>آی‌پی</code> · <code>آی‌پی:پورت</code> · <code>آی‌پی:پورت#نام</code> · <code>[آی‌پی نسخهٔ ۶]:پورت#نام</code> · <code>دامنه:پورت</code> — جدا کردن با کاما هم کار می‌کند.' },
        { key: 'yxURL', section: 'آدرس‌های دستی', label: 'منبع آنلاین آدرس‌ها', type: 'text', wide: true, def: '', list: 'dlYxUrl', ph: 'https://... (چند نشانی را با کاما جدا کنید)' },
        { key: 'sb', section: 'مسیر خروج', label: 'تحریم‌شکن (خروجی از آدرس واسط)', hint: 'همهٔ نودها از یک آدرس بیرون از ایران خارج می‌شوند تا سرویس‌های مسدود برای آی‌پی ایران باز شوند', type: 'switch', def: 'yes' },
        { key: 'sbRegion', section: 'مسیر خروج', label: 'منطقهٔ تحریم‌شکن', type: 'select', def: 'DE', options: 'regions' },
        { key: 'p', section: 'مسیر خروج', label: 'آدرس واسط (ProxyIP)', type: 'text', def: '', list: 'dlProxyIp', ph: 'ProxyIP.DE.example.com:443' },
        { key: 's', section: 'مسیر خروج', label: 'پروکسی خروجی', type: 'text', def: '', list: 'dlProxy', ph: 'socks5://host:1080' }
      ]
    },
    {
      id: 'advanced',
      title: 'پیشرفته و پنل',
      icon: 'settings',
      fields: [
        { key: 'ae', section: 'دسترسی و مسیر', label: 'اجازهٔ دسترسی به API', type: 'switch', def: 'no' },
        { key: 'rm', section: 'دسترسی و مسیر', label: 'حالت مسیر', type: 'text', def: '', ph: 'خالی = پیش‌فرض' },
        { key: 'qj', section: 'دسترسی و مسیر', label: 'قفل آی‌پی', type: 'text', def: '', ph: 'خالی = غیرفعال' },
        { key: 'yxby', section: 'دسترسی و مسیر', label: 'نادیده‌گرفتن آدرس‌های دستی', type: 'switch', def: 'no' },
        { key: 'ipRotation', label: 'چرخش آی‌پی', type: 'select', def: 'off', options: [['off', 'غیرفعال'], ['5m', '۵ دقیقه'], ['15m', '۱۵ دقیقه'], ['30m', '۳۰ دقیقه'], ['1h', '۱ ساعت'], ['24h', '۲۴ ساعت']] },
        { key: 'd', section: 'دسترسی و مسیر', label: 'مسیر اختصاصی کاربر', type: 'text', def: '', list: 'dlAdminPath' },
        { key: 'homepage', section: 'دسترسی و مسیر', label: 'صفحهٔ استتار', type: 'text', def: '', list: 'dlHomepage' },
        { key: 'scu', section: 'دسترسی و مسیر', label: 'سرویس تبدیل اشتراک', type: 'text', def: '', list: 'dlScu' },
        { key: 'pd', section: 'دامنهٔ پنل', label: 'نود با دامنهٔ پنل', type: 'switch', def: 'no' },
        { key: 'pdCount', section: 'دامنهٔ پنل', label: 'تعداد نود دامنهٔ پنل', type: 'number', def: 2, min: 0, max: 20 },
        { key: 'sniHosts', section: 'دامنهٔ پنل', label: 'دامنه‌های SNI و Host', type: 'text', def: '', hint: 'کاما بین دامنه‌ها؛ هر دامنه باید به همین ورکر وصل باشد. نودها به ترتیب بین این دامنه‌ها می‌چرخند (خالی = فقط دامنهٔ همین ورکر).' }
      ]
    },
    {
      id: 'extras',
      title: 'افزونه‌ها',
      icon: 'warp',
      fields: [
        { key: 'warp', section: 'WARP', label: 'WARP', type: 'switch', def: 'no' },
        { key: 'awgv', section: 'WARP', label: 'نسخهٔ امنزیا (AmneziaWG)', hint: 'نسخهٔ ۳ = بسته‌های امضایی I1..I3 و تنظیمات زمانی', type: 'select', def: '3', options: [['3', 'نسخهٔ ۳ (پیشنهادی)'], ['2', 'نسخهٔ ۲'], ['1', 'نسخهٔ ۱ — فقط بسته‌های Junk']] },
        { key: 'warpPro', section: 'WARP', label: 'WARP پلاس', type: 'switch', def: 'no' },
        { key: 'warpMl', section: 'WARP', label: 'WARP چندلوکیشن', type: 'switch', def: 'no' },
        { key: 'warpCount', section: 'WARP', label: 'تعداد WARP', type: 'number', def: 8, min: 1, max: 30 },
        { key: 'warpMasque', section: 'WARP', label: 'WARP MASQUE (HTTP/3)', type: 'switch', def: 'no' },
        { key: 'warpMasqueCount', section: 'WARP', label: 'تعداد MASQUE', type: 'number', def: 3, min: 1, max: 6 },
        { key: 'warpLicense', section: 'WARP', label: 'لایسنس WARP پلاس', type: 'text', def: '' },
        { key: 'warpEndpoint', section: 'WARP', label: 'نقاط پایانی WARP', type: 'text', def: '', list: 'dlWarpEndpoint', hint: 'خالی = نقاط پایانی رسمی کلادفلر. هر مورد: <code>ip:port#برچسب</code>' },
        { key: 'warpMtu', section: 'پروفایل WARP', label: 'MTU وایرگارد', type: 'select', def: 'auto', options: [['auto', 'خودکار (پیش‌فرض کلاینت)'], ['1280', '۱۲۸۰ — متعادل'], ['1240', '۱۲۴۰ — موبایل'], ['1180', '۱۱۸۰ — ضد DPI شدید'], ['1380', '۱۳۸۰ — سرعت بالا']], hint: 'روی همهٔ نودهای WARP اعمال می‌شود.' },
        { key: 'warpDns', section: 'پروفایل WARP', label: 'DNS نودهای WARP', type: 'select', def: 'auto', options: [['auto', 'پیش‌فرض ثبت‌نام'], ['cloudflare', 'Cloudflare 1.1.1.1'], ['cloudflare-alt', 'Cloudflare 1.0.0.1'], ['both', 'هر دو (1.1.1.1 + 1.0.0.1)'], ['google', 'Google 8.8.8.8']] },
        { key: 'warpObf', section: 'پروفایل WARP', label: 'پروفایل مبهم‌سازی (AmneziaWG)', type: 'select', def: 'all', options: [['all', 'همهٔ پروفایل‌ها (LITE/BALANCED/AGGRESSIVE/STEALTH)'], ['off', 'بدون نسخهٔ اضافی مبهم‌سازی'], ['lite', 'فقط LITE'], ['balanced', 'فقط BALANCED'], ['aggressive', 'فقط AGGRESSIVE'], ['stealth', 'فقط STEALTH']], hint: 'پروفایل انتخابی، تعداد و نوع نودهای OBF را تعیین می‌کند.' },
        { key: 'warpFamily', section: 'پروفایل WARP', label: 'خانوادهٔ اندپوینت چندلوکیشن', type: 'select', def: 'auto', options: [['auto', 'خودکار (ترکیب IPv4 + IPv6)'], ['v4', 'فقط IPv4'], ['v6', 'فقط IPv6'], ['domain', 'فقط دامنه (dual-stack)']], hint: 'در حالت خودکار، هر سه نود از خانواده‌های مختلف ساخته می‌شود.' },
        { key: 'ovpn', section: 'OpenVPN', label: 'OpenVPN', type: 'switch', def: 'no' },
        { key: 'ovpnCount', section: 'OpenVPN', label: 'تعداد OpenVPN', type: 'number', def: 4, min: 0, max: 24 },
        { key: 'ovpnCountries', section: 'OpenVPN', label: 'کشورهای OpenVPN', type: 'text', def: '', list: 'dlCountries' },
        { key: 'ovpnProto', section: 'OpenVPN', label: 'پروتکل OpenVPN', type: 'select', def: 'auto', options: [['auto', 'خودکار (هر دو)'], ['udp', 'فقط UDP'], ['tcp', 'فقط TCP']], hint: 'پروفایل‌های ناسازگار از ساب حذف می‌شوند.' },
        { key: 'ovpnTuning', section: 'OpenVPN', label: 'پروفایل تنظیم خروجی', type: 'select', def: 'all', options: [['all', 'هر سه پروفایل (balanced / mtu-safe / mobile)'], ['balanced', 'فقط balanced'], ['mtu-safe', 'فقط mtu-safe'], ['mobile', 'فقط mobile']], hint: 'در دانلود ZIP، هر سرور با همین پروفایل(ها) ساخته می‌شود.' },
        { key: 'ovpnSource', section: 'OpenVPN', label: 'منبع OpenVPN', type: 'text', def: '', ph: 'https://... (کاما برای چند منبع)' }
      ]
    }
  ];

  var formState = { editingId: null, tab: 'basic' };
  var NL = String.fromCharCode(10);
  var SEP_RE = new RegExp('[,' + String.fromCharCode(10, 13) + ';،]+');

  function optionHtml(field, current) {
    var list = field.options;
    var pairs = [];
    if (typeof list === 'string') {
      if (list === 'echDomains') pairs = (INITIAL_DATA.echDomains || []).map(function(d) { return [d, d]; });
      else if (list === 'dnsPresets') pairs = (INITIAL_DATA.dnsPresets || []).map(function(d) { return [d.value, d.name]; });
      else if (list === 'fingerprints') pairs = (INITIAL_DATA.fingerprints || []).map(function(f) { return [f.id, f.name]; });
      else if (list === 'pathPatterns') pairs = (INITIAL_DATA.pathPatterns || []).map(function(p) { return [p.id, p.name]; });
      else if (list === 'fragmentPresets') pairs = Object.keys(INITIAL_DATA.fragmentPresets || {}).map(function(id) { return [id, INITIAL_DATA.fragmentPresets[id].name || id]; });
      else if (list === 'regions') {
        pairs = [['auto', 'خودکار (بدون محدودیت منطقه)'], ['CF', 'مستقیم کلادفلر (CF)']];
        var srcs = INITIAL_DATA.countrySources || {};
        Object.keys(srcs).sort().forEach(function(code) { pairs.push([code, srcs[code].name + ' — ' + code]); });
      }
    } else if (Array.isArray(list)) {
      pairs = list;
    }
    if (current !== undefined && current !== null && current !== '' && !pairs.some(function(p) { return String(p[0]) === String(current); })) {
      pairs = pairs.concat([[current, current]]);
    }
    return pairs.map(function(p) {
      return '<option value="' + String(p[0]).replace(/"/g, '&quot;') + '"' + (String(p[0]) === String(current) ? ' selected' : '') + '>' + p[1] + '</option>';
    }).join('');
  }

  function isPortNo(value) {
    var s = String(value || '').trim();
    if (!s || s.length > 5) return false;
    for (var i = 0; i < s.length; i++) { if (s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57) return false; }
    return true;
  }

  // آدرس‌های دستی: هر خط (یا کاما) یک آدرس با قالب‌های آزاد قابل قبول است
  function normalizeManualList(text) {
    var seen = {}, out = [];
    String(text || '').split(SEP_RE).forEach(function(line) {
      var item = String(line || '').trim();
      var scheme = item.indexOf('://');
      if (scheme > -1) item = item.slice(scheme + 3);
      var slash = item.indexOf('/');
      if (slash > -1) item = item.slice(0, slash);
      item = item.trim();
      if (!item) return;
      var name = '';
      var hash = item.indexOf('#');
      if (hash > -1) {
        name = item.slice(hash + 1).trim();
        item = item.slice(0, hash).trim();
      }
      var host = item, port = 443;
      if (item.charAt(0) === '[') {
        var close = item.indexOf(']');
        if (close > 0) {
          host = item.slice(1, close);
          var tail = item.slice(close + 1).replace(/^:/, '');
          if (isPortNo(tail)) port = parseInt(tail, 10);
        }
      } else if ((item.match(/:/g) || []).length === 1) {
        var parts = item.split(':');
        if (isPortNo(parts[1])) { host = parts[0]; port = parseInt(parts[1], 10); }
      }
      host = String(host || '').trim();
      if (!host || host.split(' ').length > 1) return;
      if (!(port > 0 && port <= 65535)) port = 443;
      var key = host + ':' + port;
      if (seen[key]) return;
      seen[key] = 1;
      var label = (name || (host + ':' + port)).replace(/,/g, ' ');
      out.push((host.indexOf(':') > -1 ? '[' + host + ']' : host) + ':' + port + '#' + label);
    });
    return out.join(',');
  }

  function manualListToLines(text) {
    return String(text || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean).join(NL);
  }

  // کنترل «انتخاب تصادفی» برای فیلدهای آی‌پی؛ فهرست از استخر داخلی می‌آید
  function ipPoolControlHtml(field) {
    if (!field.pool) return '';
    var pool = INITIAL_DATA.ipPool || [];
    var countries = INITIAL_DATA.ipPoolCountries || [];
    var opts = '<option value="">همه کشورها</option>' + countries.map(function(c) {
      return '<option value="' + c.cc + '">' + c.name + ' — ' + c.cc + ' (' + c.count + ')</option>';
    }).join('');
    var subPath = INITIAL_DATA.ipPoolPath || '/ips';
    return '<div class="ip-pool" data-pool-for="' + field.key + '">' +
      '<span class="ip-pool-title">انتخاب تصادفی از استخر ' + pool.length + ' آی‌پی:</span>' +
      '<input class="ip-pool-count" type="number" min="1" max="64" step="1" value="5" aria-label="تعداد آی‌پی">' +
      '<select class="ip-pool-country" aria-label="کشور">' + opts + '</select>' +
      '<button class="btn sm" type="button" data-pool-fill="' + field.key + '">' + ICO.refresh + ' تصادفی</button>' +
      '<a class="btn sm ghost" href="' + subPath + '" target="_blank" rel="noopener">' + ICO.link + ' ساب لیست</a>' +
      '<span class="ip-pool-meta">ساب: ' + subPath + '?count=10&amp;country=DE&amp;port=443&amp;label=1</span>' +
    '</div>';
  }

  function fieldHtml(field, value) {
    var id = 'uf_' + field.key;
    var val = value === undefined || value === null ? field.def : value;
    var hint = field.hint ? '<span class="field-hint">' + field.hint + '</span>' : '';
    var wideClass = field.wide ? ' style="grid-column: 1 / -1;"' : '';
    if (field.type === 'textarea') {
      var rows = field.rows || 4;
      return '<div class="field"' + wideClass + '><label>' + field.label + '</label>' +
        '<textarea id="' + id + '" data-uf="' + field.key + '" rows="' + rows + '" spellcheck="false" dir="ltr" placeholder="' +
        String(field.ph || '').split(NL).join('&#10;').replace(/"/g, '&quot;') + '">' +
        manualListToLines(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>' + hint + ipPoolControlHtml(field) + '</div>';
    }
    if (field.type === 'switch') {
      var on = String(val) === 'yes';
      return '<div class="switch-row"><div class="switch-meta"><div><b>' + field.label + '</b>' + hint + '</div></div>' +
        '<label class="switch"><input type="checkbox" id="' + id + '" data-uf="' + field.key + '" data-type="switch"' + (on ? ' checked' : '') + '><i></i></label></div>';
    }
    if (field.type === 'select') {
      return '<div class="field"><label>' + field.label + '</label>' +
        '<select id="' + id + '" data-uf="' + field.key + '">' + optionHtml(field, val) + '</select>' + hint + '</div>';
    }
    var attrs = 'type="' + (field.type === 'number' ? 'number' : 'text') + '" id="' + id + '" data-uf="' + field.key + '"';
    if (field.type === 'number') attrs += ' min="' + (field.min === undefined ? 0 : field.min) + '" max="' + (field.max === undefined ? 999 : field.max) + '" step="1"';
    if (field.list) attrs += ' list="' + field.list + '"';
    if (field.ph) attrs += ' placeholder="' + field.ph.replace(/"/g, '&quot;') + '"';
    return '<div class="field"><label>' + field.label + '</label>' +
      '<input ' + attrs + ' value="' + String(val === undefined ? '' : val).replace(/"/g, '&quot;') + '">' + hint + ipPoolControlHtml(field) + '</div>';
  }

  function formPaneHtml(group, cfg) {
    var html = '', lastSection = null, open = false;
    group.fields.forEach(function(field) {
      if (field.section && field.section !== lastSection) {
        if (open) html += '</div>';
        html += '<div class="uf-section"><span>' + field.section + '</span><i></i></div><div class="form-grid">';
        open = true;
        lastSection = field.section;
      } else if (!open) {
        html += '<div class="form-grid">';
        open = true;
      }
      html += fieldHtml(field, cfg[field.key]);
    });
    if (open) html += '</div>';
    return html;
  }

  function switchUserFormTab(id) {
    var modal = $('createModal');
    if (!modal) return;
    formState.tab = id;
    modal.querySelectorAll('[data-uf-tab]').forEach(function(b) {
      var on = b.getAttribute('data-uf-tab') === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
    modal.querySelectorAll('[data-uf-pane]').forEach(function(p) {
      p.classList.toggle('is-active', p.getAttribute('data-uf-pane') === id);
    });
    var body = $('userFormBody');
    if (body) body.scrollTop = 0;
  }

  // خلاصهٔ زندهٔ پنجرهٔ کاربر: وضعیت پروتکل‌ها/آی‌پی/فرگمنت/WARP/OpenVPN را
  // روی سربرگ فرم نشان می‌دهد تا معلوم باشد هر تنظیم در خروجی چه می‌کند.
  function updateFormSummary() {
    var box = $('userFormSummary');
    if (!box) return;
    var cfg = (collectUserForm().config) || {};
    var protos = [];
    if (cfg.ev === 'yes') protos.push('VLESS');
    if (cfg.et === 'yes') protos.push('Trojan');
    if (cfg.ex === 'yes') protos.push('xHTTP');
    if (cfg.es === 'yes') protos.push('SS');
    if (cfg.jk === 'yes') protos.push('JK');
    var chip = function(label, cls) {
      return '<span class="uf-chip' + (cls ? ' ' + cls : '') + '">' + label + '</span>';
    };
    var parts = [];
    parts.push(chip('<b>' + (protos.join(' + ') || 'بدون پروتکل') + '</b>', 'on'));
    parts.push(chip('منطقه <b>' + (cfg.region && cfg.region !== 'auto' ? cfg.region : 'خودکار') + '</b>'));
    parts.push(chip(cfg.ipMode === 'fixed' ? '<b>آی‌پی ثابت</b>' : 'کشور ثابت', cfg.ipMode === 'fixed' ? 'on' : ''));
    parts.push(chip('فرگمنت <b>' + (cfg.frag === 'yes' && cfg.fragmentPreset !== 'off' ? 'روشن' : 'خاموش') + '</b>', cfg.frag === 'yes' && cfg.fragmentPreset !== 'off' ? 'on' : ''));
    parts.push(chip('تحریم‌شکن <b>' + (cfg.sb === 'yes' ? 'روشن' : 'خاموش') + '</b>'));
    var warpOn = cfg.warp === 'yes' || cfg.warpPro === 'yes' || cfg.warpMl === 'yes' || cfg.warpMasque === 'yes';
    if (warpOn) parts.push(chip('WARP <b>' + (parseInt(cfg.warpCount, 10) || 0) + '</b>', 'on'));
    if (cfg.ovpn === 'yes') parts.push(chip('OpenVPN <b>' + (parseInt(cfg.ovpnCount, 10) || 0) + '</b>', 'on'));
    box.innerHTML = parts.join('');
  }

  function renderUserForm(user, presetId) {
    var body = $('userFormBody');
    if (!body) return;
    // برای کاربر جدید، مقادیر از تنظیمات کلی پنل و برای ویرایش از خود کاربر
    var base = user ? (INITIAL_DATA.defaults || {}) : Object.assign({}, INITIAL_DATA.defaults || {}, state.config || {});
    var cfg = Object.assign({}, base, (user && user.config) || {});
    var preset = (INITIAL_DATA.presets || {})[presetId || (user && user.preset) || 'iran-fast'];
    // در ویرایش، تنظیمات ذخیره‌شدهٔ کاربر باید برنده باشد؛ پریست فقط برای کاربر تازه
    // یا وقتی خود مدیر پریست را عوض می‌کند اعمال می‌شود (باگ: قبلاً مقادیر پریست
    // روی تنظیمات ذخیره‌شده می‌نشست و فرم همان تنظیمات پایه را نشان می‌داد).
    if (preset && preset.configOverrides && (!user || presetId)) cfg = Object.assign({}, cfg, preset.configOverrides);
    var activeTab = formState.tab || 'basic';
    var basicHtml = '<div class="uf-section"><span>مشخصات کاربر</span><i></i></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>نام کاربری</label><input type="text" id="uf_username" value="' + String((user && user.username) || '').replace(/"/g, '&quot;') + '" placeholder="مثلاً ali"></div>' +
      '<div class="field"><label>پریست آماده</label><select id="uf_preset">' + Object.keys(INITIAL_DATA.presets || {}).map(function(k) {
        var p = INITIAL_DATA.presets[k];
        return '<option value="' + k + '"' + (k === (presetId || (user && user.preset)) ? ' selected' : '') + '>' + p.title + '</option>';
      }).join('') + '</select></div>' +
      '<div class="field"><label>یادداشت</label><input type="text" id="uf_note" value="' + String((user && user.note) || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="field"><label>شناسهٔ کاربر (UUID)</label><input type="text" id="uf_uuid" class="mono" value="' + String((user && user.uuid) || '') + '" placeholder="خالی = ساخت خودکار"></div>' +
      '</div>' +
      '<div class="uf-section"><span>سهمیه و محدودیت</span><i></i></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>حجم مجاز (گیگابایت) — ۰ = نامحدود</label><input type="number" id="uf_dataLimitGb" min="0" step="1" list="dlDataLimit" value="' + Number((user && user.dataLimitGb) || 0) + '"></div>' +
      '<div class="field"><label>مدت اعتبار (روز) — ۰ = بدون انقضا</label><input type="number" id="uf_expireDays" min="0" step="1" list="dlExpireDays" value="' + Number((user && user.expireDays) || 0) + '"></div>' +
      '<div class="field"><label>سقف دستگاه متصل</label><input type="number" id="uf_ipLimit" min="1" max="200" step="1" value="' + Number((user && user.ipLimit) || 50) + '"></div>' +
      '</div>' +
      '<div class="field" style="margin-top:10px;"><span class="field-hint">تعداد کانفیگ را خود پنل تعیین می‌کند؛ هر آدرس فعال از تب «آدرس‌ها و منطقه» به یک نود تبدیل می‌شود. برای قفل‌کردن نودها روی یک آی‌پی، همان‌جا حالت «آی‌پی ثابت» را انتخاب کن.</span></div>';

    var tabButton = function(id, label, iconName) {
      var on = activeTab === id;
      return '<button type="button" role="tab" aria-selected="' + (on ? 'true' : 'false') + '" class="ftab' + (on ? ' is-active' : '') + '" data-uf-tab="' + id + '">' + (ICO[iconName] || '<i class="ftab-dot"></i>') + label + '</button>';
    };
    var tabsHtml = tabButton('basic', 'اطلاعات کاربر', 'users');
    USER_FORM_SCHEMA.forEach(function(group) { tabsHtml += tabButton(group.id, group.title, group.icon); });
    var tabsBar = $('userFormTabs');
    if (tabsBar) tabsBar.innerHTML = tabsHtml;

    var html = '<div class="uf-pane' + (activeTab === 'basic' ? ' is-active' : '') + '" data-uf-pane="basic">' + basicHtml + '</div>';
    USER_FORM_SCHEMA.forEach(function(group) {
      html += '<div class="uf-pane' + (activeTab === group.id ? ' is-active' : '') + '" data-uf-pane="' + group.id + '">' + formPaneHtml(group, cfg) + '</div>';
    });
    body.innerHTML = html;
    formState.tab = activeTab;
    formState.editingId = user ? user.id : null;
    updateFormSummary();
    if ($('userFormTitle')) $('userFormTitle').innerHTML = (user ? ICO.refresh + ' ویرایش کاربر «' + escHtml(user.username || '') + '»' : ICO.plus + ' ایجاد کاربر جدید');
    if ($('userFormSubmit')) $('userFormSubmit').innerHTML = user ? ICO.check + ' ذخیرهٔ تغییرات' : ICO.check + ' ساخت کاربر';
  }

  function collectUserForm() {
    var body = $('userFormBody');
    var config = {};
    if (body) {
      body.querySelectorAll('[data-uf]').forEach(function(el) {
        var key = el.getAttribute('data-uf');
        if (el.getAttribute('data-type') === 'switch') { config[key] = el.checked ? 'yes' : 'no'; return; }
        if (el.type === 'number') {
          var num = parseInt(el.value, 10);
          config[key] = Number.isFinite(num) ? num : 0;
          return;
        }
        if (key === 'yx') { config[key] = normalizeManualList(el.value); return; }
        config[key] = String(el.value || '').trim();
      });
    }
    var val = function(id, fallback) { return $(id) ? String($(id).value || '').trim() : fallback; };
    return {
      username: val('uf_username', ''),
      preset: val('uf_preset', 'iran-fast'),
      uuid: val('uf_uuid', ''),
      note: val('uf_note', ''),
      dataLimitGb: Number(val('uf_dataLimitGb', '0')) || 0,
      expireDays: Number(val('uf_expireDays', '0')) || 0,
      ipLimit: Number(val('uf_ipLimit', '50')) || 50,
      config: config
    };
  }

  function openUserForm(user) {
    formState.tab = 'basic';
    renderUserForm(user || null, null);
    openModal('createModal');
  }

  function saveUser() {
    var body = collectUserForm();
    if (body.username.length < 2) { showToast('نام کاربری باید حداقل ۲ کاراکتر باشد', 'err'); return; }
    // هشدارهای تداخل تنظیمات (فقط نمایش؛ جلوی ذخیره را نمی‌گیرد)
    var conflicts = detectConflicts(body.config);
    if (conflicts.length) showToast('هشدار: ' + conflicts[0], 'err');
    var isEdit = Boolean(formState.editingId);
    var payload = body;
    if (isEdit) payload.id = formState.editingId;
    var btn = $('userFormSubmit');
    if (btn) btn.disabled = true;
    api('/api/users', { method: isEdit ? 'PUT' : 'POST', body: JSON.stringify(payload) })
      .then(function(data) {
        if (data.success) {
          if (isEdit) {
            state.users = state.users.map(function(u) { return u.id === data.user.id ? data.user : u; });
          } else {
            state.users.unshift(data.user);
          }
          renderUsers(); renderLocations();
          closeModal('createModal');
          showToast(data.message || (isEdit ? 'کاربر ویرایش شد' : 'کاربر ساخته شد'), 'ok');
        } else {
          showToast(data.message || 'خطا در ذخیرهٔ کاربر', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در ذخیرهٔ کاربر', 'err'); })
      .finally(function() { if (btn) btn.disabled = false; });
  }

  function editUser(id) {
    var user = (state.users || []).filter(function(u) { return u.id === id; })[0];
    if (!user) { showToast('کاربر یافت نشد', 'err'); return; }
    // همیشه تازه‌ترین نسخه را از سرور بگیر تا همهٔ متغیرها (config) کامل باشد
    api('/api/users?t=' + Date.now())
      .then(function(data) {
        if (data.success) {
          state.users = data.users || state.users;
          user = state.users.filter(function(u) { return u.id === id; })[0] || user;
        }
        openUserForm(user);
      })
      .catch(function() { openUserForm(user); });
  }

  function applyPresetToForm() {
    var presetId = $('uf_preset') ? $('uf_preset').value : 'iran-fast';
    renderUserForm(formState.editingId ? (state.users || []).filter(function(u) { return u.id === formState.editingId; })[0] : null, presetId);
  }

  // ---------- نسخه و بروزرسانی ----------
  var lastUpdateInfo = null;
  var updatePromptTimer = null;
  var updatePromptShown = false;

  function setUpdateState(text, tone) {
    var stateEl = $('updState');
    if (!stateEl) return;
    stateEl.textContent = text;
    stateEl.classList.toggle('is-available', tone === 'available');
    stateEl.classList.toggle('is-current', tone === 'current');
    stateEl.classList.toggle('is-error', tone === 'error');
  }

  function renderUpdateInfo(info, silent) {
    if (info) lastUpdateInfo = info;
    var latest = $('updLatest');
    var notesEl = $('updNotes');
    if (latest) latest.textContent = info && info.latest ? 'v' + info.latest : '—';
    var autoReady = Boolean(info && (info.hasToken || info.autoApplyAvailable || info.tokenSource === 'env'));
    if ($('updAuto')) {
      $('updAuto').textContent = autoReady ? 'فعال (کلید محرمانه روی ورکر)' : 'دانلود دستی';
      $('updAuto').style.color = autoReady ? 'var(--neon)' : 'var(--warn)';
    }
    if ($('updScript')) $('updScript').textContent = (info && info.scriptName) || 'تشخیص خودکار';

    var hasUpdate = Boolean(info && info.updateAvailable);
    var updateBtn = $('updateBtn');
    if (updateBtn) updateBtn.classList.toggle('has-update', hasUpdate);
    var updateDot = $('updateDot');
    if (updateDot) updateDot.hidden = !hasUpdate;

    if (!info || info.success === false) {
      setUpdateState('بررسی ناموفق — دوباره تلاش کنید', 'error');
      if (!silent) showToast((info && info.error) || 'بررسی بروزرسانی ناموفق بود', 'err');
      return;
    }
    if (hasUpdate) {
      setUpdateState('نسخهٔ تازه موجود است', 'available');
      if (!silent) showToast('نسخهٔ ' + info.latest + ' آماده است', 'ok');
    } else {
      setUpdateState('نسخهٔ نصب‌شده به‌روز است', 'current');
      if (!silent) showToast('نسخهٔ نصب‌شده به‌روز است', 'ok');
    }
    if (notesEl) {
      var notes = info.notes || [];
      notesEl.innerHTML = notes.map(function(n) { return '<li>' + n + '</li>'; }).join('');
      notesEl.style.display = notes.length ? 'block' : 'none';
    }
  }

  function checkUpdate(silent, openWhenAvailable) {
    api('/api/update?t=' + Date.now())
      .then(function(info) {
        renderUpdateInfo(info, silent);
        if (openWhenAvailable && info && info.updateAvailable) {
          updatePromptShown = true;
          openModal('updateModal');
        }
      })
      .catch(function() {
        setUpdateState('بررسی ناموفق — خطای شبکه', 'error');
        if (!silent) showToast('خطای شبکه در بررسی بروزرسانی', 'err');
      });
  }

  function openUpdateModal() {
    updatePromptShown = true;
    openModal('updateModal');
    if (!lastUpdateInfo) setUpdateState('در حال بررسی...', '');
    checkUpdate(true, false);
  }

  // بعد از بستن راهنما، سه ثانیه صبر می‌کنیم؛ فقط اگر نسخهٔ تازه باشد پنجره باز می‌شود.
  function scheduleUpdatePrompt() {
    if (updatePromptShown) return;
    clearTimeout(updatePromptTimer);
    updatePromptTimer = setTimeout(function() {
      if (updatePromptShown) return;
      if (document.querySelector('.modal.is-open')) { scheduleUpdatePrompt(); return; }
      updatePromptShown = true;
      if (lastUpdateInfo && lastUpdateInfo.updateAvailable) {
        openModal('updateModal');
        checkUpdate(true, false);
      } else if (!lastUpdateInfo) {
        checkUpdate(true, true);
      }
    }, 3000);
  }

  // بروزرسانی بدون هیچ ورودی حسابی: فایل نسخهٔ تازه به‌صورت دانلود ذخیره می‌شود
  // (قبلاً فایل خام _worker.js در تب جدید باز می‌شد و کاربر یک صفحهٔ کد می‌دید)
  function downloadUpdateBundle() {
    var link = document.createElement('a');
    link.href = origin() + API_BASE + '/api/update-bundle';
    link.setAttribute('download', 'miliconfig-worker.js');
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('فایل نسخهٔ تازه دانلود شد', 'ok');
  }

  // گزارش گام‌به‌گام وضعیت نصب خودکار (فقط خواندنی؛ چیزی را تغییر نمی‌دهد)
  function updateDiagRow(label, value, state) {
    var color = state === false ? 'var(--danger)' : state === true ? 'var(--neon)' : 'var(--text)';
    return '<div><b style="color:' + color + '">' + label + ':</b> ' + (value || '—') + '</div>';
  }

  function showUpdateBox(title, lines) {
    var box = $('updDiagBox');
    var body = $('updDiagBody');
    if (!box || !body) return;
    var html = title ? '<b>' + title + '</b>' : '';
    if (lines && lines.length) {
      html += '<div style="margin-top:' + (title ? '6px' : '0') + '">' + lines.join('<br>') + '</div>';
    }
    body.innerHTML = html;
    box.style.display = 'block';
  }

  function renderUpdateDiagnose(d) {
    if (!d || d.success === false) {
      showUpdateBox('تشخیص ناموفق بود', [(d && (d.error || d.message)) || 'پاسخ نامعتبر از سرور']);
      return;
    }
    var lines = [];
    lines.push(updateDiagRow('کلید CF_API_TOKEN', d.tokenPresent ? 'تعریف شده روی ورکر' : 'تعریف نشده', d.tokenPresent));
    if (d.tokenPresent) {
      lines.push(updateDiagRow('اعتبار کلید', d.tokenValid ? ('معتبر' + (d.tokenStatus ? ' (' + d.tokenStatus + ')' : '')) : ('نامعتبر — ' + (d.tokenError || 'دلیل نامشخص')), d.tokenValid));
    }
    if (d.accountId) {
      lines.push(updateDiagRow('Account ID', '…' + d.accountTail + (d.accountDetected ? ' (خودکار شناسایی شد)' : ''), true));
    } else if (d.accountError) {
      lines.push(updateDiagRow('Account ID', d.accountError, false));
    }
    lines.push(updateDiagRow('اسکریپت هدف', d.scriptName || 'تشخیص داده نشد', Boolean(d.scriptName)));
    if (d.scriptSource) lines.push(updateDiagRow('منبع نام اسکریپت', d.scriptSource));
    if (d.bindingCount) {
      lines.push(updateDiagRow('بایندینگ‌های فعلی', d.bindingCount + ' مورد (' + (d.bindings || []).map(function(b) { return b.type; }).join(', ') + ')'));
    } else if (d.bindingsError) {
      lines.push(updateDiagRow('بایندینگ‌های فعلی', d.bindingsError, false));
    }
    if (d.compatibilityDate) {
      lines.push(updateDiagRow('تاریخ سازگاری', d.compatibilityDate + ((d.compatibilityFlags || []).length ? ' · ' + d.compatibilityFlags.join(', ') : '')));
    }
    lines.push(updateDiagRow('نسخه', d.current + ' → ' + (d.latest || 'نامشخص'), d.updateAvailable ? null : true));
    var steps = d.steps || [];
    if (steps.length) {
      lines.push('<div style="margin-top:6px">' + steps.map(function(s) { return '• ' + s; }).join('<br>') + '</div>');
    }
    showUpdateBox('نتیجهٔ تشخیص نصب خودکار', lines);
  }

  function diagnoseUpdate() {
    showToast('در حال بررسی پیش‌نیازهای نصب خودکار...', 'ok');
    api('/api/update?diagnose=1&t=' + Date.now())
      .then(renderUpdateDiagnose)
      .catch(function() { showToast('خطای شبکه در تشخیص نصب خودکار', 'err'); });
  }

  function copyUpdateCommand() {
    api('/api/update?t=' + Date.now())
      .then(function(info) {
        var cmd = info && info.command
          ? info.command
          : 'curl -fsSL ' + (info && info.downloadUrl ? info.downloadUrl : '') + ' -o _worker.js && npx wrangler deploy _worker.js';
        copyText(cmd, 'دستور استقرار کپی شد');
      })
      .catch(function() { showToast('خطای شبکه در دریافت دستور', 'err'); });
  }

  function enableAutoUpdate() {
    var btn = document.querySelector('[data-act="enable-autoupdate"]');
    if (btn) btn.disabled = true;
    api('/api/auto-update-setup', { method: 'POST', body: JSON.stringify({ action: 'enable' }) })
      .then(function(data) {
        if (data.success) {
          showToast(data.message || 'بروزرسانی خودکار فعال شد', 'ok');
          checkUpdate(true);
        } else {
          showToast(data.message || data.error || 'نصب خودکار در دسترس نیست', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در فعال‌سازی', 'err'); })
      .finally(function() { if (btn) btn.disabled = false; });
  }

  function disableAutoUpdate() {
    if (!ask('بروزرسانی خودکار خاموش شود؟')) return;
    api('/api/auto-update-setup', { method: 'POST', body: JSON.stringify({ action: 'disable' }) })
      .then(function(data) {
        showToast(data.success ? 'بروزرسانی خودکار خاموش شد' : 'خطا', data.success ? 'ok' : 'err');
        checkUpdate(true);
      })
      .catch(function() { showToast('خطای شبکه', 'err'); });
  }

  function applyUpdateNow() {
    if (!ask('نسخهٔ تازهٔ گیت‌هاب روی همین ورکر مستقر شود؟')) return;
    var btn = document.querySelector('[data-act="apply-update"]');
    if (btn) btn.disabled = true;
    showToast('در حال دریافت و استقرار نسخهٔ تازه...', 'ok');
    api('/api/update', { method: 'POST', body: JSON.stringify({ action: 'apply' }) })
      .then(function(data) {
        if (data.success) {
          showToast(data.message || 'نسخهٔ تازه مستقر شد', 'ok');
          setTimeout(function() { location.reload(); }, 2500);
        } else if (data.needsManualDeploy) {
          // بدون کلید ورکر: فایل به‌صورت دانلود ذخیره می‌شود (نه باز شدن فایل خام)
          downloadUpdateBundle();
          showUpdateBox(data.error || 'نصب خودکار در دسترس نیست', data.steps || []);
          showToast('فایل نسخهٔ تازه ذخیره شد؛ راهنمای استقرار زیر کارت است', 'err');
        } else {
          showToast(data.error || data.message || 'بروزرسانی ناموفق بود', 'err');
          if (data.error) showUpdateBox('خطای نصب خودکار', [data.error]);
          if (data.diagnose) setTimeout(diagnoseUpdate, 600);
        }
      })
      .catch(function() { showToast('خطای شبکه در بروزرسانی', 'err'); })
      .finally(function() { if (btn) btn.disabled = false; });
  }

  function deleteUser(id) {
    if (!ask('این کاربر حذف شود؟')) return;
    api('/api/users?id=' + encodeURIComponent(id), { method: 'DELETE' })
      .then(function(data) {
        if (data.success) {
          state.users = state.users.filter(function(u) { return u.id !== id; });
          renderUsers(); renderLocations();
          showToast('کاربر حذف شد', 'ok');
        } else {
          showToast(data.message || 'خطا در حذف کاربر', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در حذف کاربر', 'err'); });
  }

  function resetUser(id) {
    if (!ask('مصرف این کاربر صفر شود؟')) return;
    api('/api/users', { method: 'PUT', body: JSON.stringify({ id: id, action: 'reset' }) })
      .then(function(data) {
        if (data.success) {
          state.users = state.users.map(function(u) { return u.id === id ? data.user : u; });
          renderUsers();
          showToast(data.message || 'مصرف صفر شد', 'ok');
        } else {
          showToast(data.message || 'خطا در ریست مصرف', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در ریست مصرف', 'err'); });
  }

  function reloadUsers() {
    api('/api/users?t=' + Date.now())
      .then(function(data) {
        if (data.success) {
          state.users = data.users || [];
          renderUsers(); renderLocations();
          showToast('لیست کاربران بروزرسانی شد', 'ok');
        }
      })
      .catch(function() { showToast('خطا در دریافت کاربران', 'err'); });
  }

  // منوی اسکن: هر مورد یک صفحهٔ مستقل دارد و همه چیز داخل پنل اجرا می‌شود
  var SCAN_META = {
    ipv4: {
      title: 'آی‌پی ثابت IPv4', icon: 'server', target: 'yx', country: true, family: false, manual: false,
      desc: 'آدرس‌های سالم IPv4 به تفکیک کشور',
      note: 'منابع آدرس به‌صورت زنده خوانده می‌شوند و هر آدرس با تست اتصال بررسی می‌شود. نتیجه را با دکمهٔ هر ردیف به آدرس‌های دستی، آدرس واسط یا پروکسی خروجی همان کاربر اضافه کنید.'
    },
    ipv6: {
      title: 'آی‌پی ثابت IPv6', icon: 'signal', target: 'yx', country: true, family: false, manual: false, defaultCountry: 'IR',
      desc: 'آدرس‌های نسخهٔ ۶ برای شبکه‌های همراه',
      note: 'آدرس‌های IPv6 از رنج‌های زندهٔ کلادفلر انتخاب می‌شوند. خروجی ورکر IPv6 ندارد، پس این آدرس‌ها بدون تست TCP به‌عنوان پیشنهاد داده می‌شوند و باید در کلاینت امتحان شوند.'
    },
    domain: {
      title: 'دامنه‌های جایگزین', icon: 'globe', target: 'yx', country: true, family: false, manual: false,
      desc: 'دامنهٔ لبهٔ کلادفلر به جای آی‌پی خام',
      note: 'برای شبکه‌هایی که آی‌پی خام را می‌بندند؛ دامنه‌ها به‌جای آی‌پی در تنظیمات آدرس‌های دستی می‌نشینند.'
    },
    proxyip: {
      title: 'آدرس واسط (ProxyIP)', icon: 'api', target: 'p', country: true, family: false, manual: false,
      desc: 'آدرس واسط آماده برای خروج از ایران',
      note: 'یک آدرس واسط سالم انتخاب می‌شود تا نودها از بیرون ایران خارج شوند. با «تنظیم روی این کاربر» فقط همان کاربر تغییر می‌کند.'
    },
    proxy: {
      title: 'پروکسی کشوری', icon: 'link', target: 's', country: true, family: true, manual: false,
      desc: 'SOCKS5 و HTTP به تفکیک کشور',
      note: 'پروکسی‌های زندهٔ همان کشور خوانده و تست می‌شوند؛ سریع‌ترین را می‌توانید به‌عنوان پروکسی خروجی ثبت کنید.'
    },
    manual: {
      title: 'تست آدرس دستی', icon: 'terminal', target: 'yx', country: false, family: false, manual: true,
      desc: 'فهرست خودتان را داخل پنل تست کنید',
      note: 'هر خط یک آدرس یا host:port بنویسید (حداکثر ۲۴ مورد). تست از همین پنل انجام می‌شود و نتیجه همان‌جا می‌آید.'
    }
  };
  var currentScan = '';

  function scanCountryOptions(selected) {
    var countries = INITIAL_DATA.countrySources || {};
    return Object.keys(countries).map(function(code) {
      return '<option value="' + code + '"' + (code === selected ? ' selected' : '') + '>' + countries[code].name + ' — ' + code + '</option>';
    }).join('');
  }

  function scanLimitOptions(selected) {
    return [5, 10, 15, 20].map(function(n) {
      var fa = { 5: '۵', 10: '۱۰', 15: '۱۵', 20: '۲۰' }[n];
      return '<option value="' + n + '"' + (n === selected ? ' selected' : '') + '>' + fa + ' مورد</option>';
    }).join('');
  }

  function scanViewHtml(id) {
    var m = SCAN_META[id];
    var controls = '';
    if (m.manual) {
      controls = '<div class="field" style="grid-column: 1 / -1;"><label>آدرس‌ها؛ هر خط یک مورد (host یا host:port)</label>' +
        '<textarea id="sc_manual_hosts" rows="4" placeholder="104.16.0.1" style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.35);color:var(--text);font-family:var(--mono);font-size:.8rem;direction:ltr;text-align:left;outline:none;resize:vertical;"></textarea></div>';
    } else {
      if (m.country) controls += '<div class="field"><label>کشور</label><select id="sc_' + id + '_country">' + scanCountryOptions(m.defaultCountry || 'DE') + '</select></div>';
      if (m.family) controls += '<div class="field"><label>خانواده آی‌پی</label><select id="sc_' + id + '_family"><option value="any" selected>IPv4 + IPv6</option><option value="ipv4">فقط IPv4</option><option value="ipv6">فقط IPv6</option></select></div>';
      controls += '<div class="field"><label>تعداد نتیجه</label><select id="sc_' + id + '_limit">' + scanLimitOptions(10) + '</select></div>';
    }
    controls += '<button class="btn primary" type="button" data-act="scan-run" data-mode="' + id + '">' + ICO.bolt + ' ' + (m.manual ? 'تست آدرس‌ها' : 'شروع اسکن') + '</button>';
    return '<div class="scan-view" id="scanView_' + id + '">' +
      '<div class="scan-head"><span class="scan-title">' + ICO[m.icon] + ' ' + m.title + '</span></div>' +
      '<div class="scan-controls">' + controls + '</div>' +
      (m.manual ? '<div class="toolbar" style="margin:0 0 8px;">' +
        '<button class="btn sm" type="button" data-act="add-cf-ips">' + ICO.plus + ' <span data-i18n="scanner.addCfIps">آی‌پی‌های کلادفلر → آدرس‌های دستی</span></button>' +
        '<button class="btn sm ghost" type="button" data-act="add-cf-domains">' + ICO.globe + ' <span data-i18n="scanner.addCfDomains">دامنه‌های کلادفلر → آدرس‌های دستی</span></button>' +
        '</div>' : '') +
      '<div class="scan-status" id="scStatus_' + id + '"></div>' +
      '<div class="table-wrap"><table class="scan"><thead><tr><th>کشور</th><th>آدرس / پورت</th><th>نوع / پروتکل</th><th>پینگ</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody id="scBody_' + id + '"><tr><td colspan="6" class="empty">هنوز اسکنی اجرا نشده است.</td></tr></tbody></table></div>' +
      '</div>';
  }

  function buildScanViews() {
    var host = $('scanViews');
    if (!host) return;
    host.innerHTML = Object.keys(SCAN_META).map(scanViewHtml).join('');
    closeScanView();
  }

  function openScanView(id) {
    if (!SCAN_META[id]) return;
    currentScan = id;
    showPanel('scanner');
    if ($('scanHome')) $('scanHome').style.display = 'none';
    if ($('scanBar')) $('scanBar').style.display = 'block';
    if ($('scanBackBtn')) $('scanBackBtn').style.display = 'inline-flex';
    if ($('scanPanelTitle')) $('scanPanelTitle').textContent = SCAN_META[id].title;
    syncScanSwitches(id);
    document.querySelectorAll('.scan-view').forEach(function(view) {
      view.classList.toggle('is-active', view.id === 'scanView_' + id);
    });
    if ($('scanTarget')) $('scanTarget').value = SCAN_META[id].target;
  }

  function closeScanView() {
    currentScan = '';
    if ($('scanHome')) $('scanHome').style.display = '';
    if ($('scanBar')) $('scanBar').style.display = 'none';
    if ($('scanBackBtn')) $('scanBackBtn').style.display = 'none';
    if ($('scanPanelTitle')) $('scanPanelTitle').textContent = t('panel.scanner');
    syncScanSwitches('');
    document.querySelectorAll('.scan-view').forEach(function(view) { view.classList.remove('is-active'); });
  }

  // کلیدهای روشن/خاموش اسکنر: فقط یکی روشن می‌ماند و با کارت هم‌زمان هماهنگ است
  function syncScanSwitches(id) {
    document.querySelectorAll('input[data-scan]').forEach(function(input) {
      input.checked = input.getAttribute('data-scan') === id;
    });
    document.querySelectorAll('.scan-tile').forEach(function(tile) {
      tile.classList.toggle('is-on', tile.getAttribute('data-mode') === id);
    });
  }

  function toggleScanMode(id, on) {
    if (!on) { closeScanView(); return; }
    openScanView(id);
    if (id !== 'manual') runScanMode(id);
  }

  function renderScanRows(items, mode) {
    mode = mode || currentScan;
    var body = $('scBody_' + mode);
    if (!body) return;
    if (!items.length) {
      body.innerHTML = '<tr><td colspan="6" class="empty">' + t('scan.none') + '</td></tr>';
      return;
    }
    body.innerHTML = items.map(function(p) {
      var latClass = p.latencyMs < 150 ? 'lat-fast' : (p.latencyMs < 400 ? 'lat-med' : 'lat-slow');
      var isProxyIp = p.kind === 'proxyip';
      var isIp = p.kind === 'ip' || isProxyIp;
      var ipLabel = p.family === 'ipv6' ? 'IPv6' : (p.family === 'domain' ? t('scan.domain') : 'IPv4');
      var typeLabel = isProxyIp ? 'آدرس واسط · ' + p.protocol : (isIp ? (t('scan.ipStatic') + ' · ' + ipLabel) : (t('scan.proxy') + ' · ' + p.protocol));
      var targetLabel = { yx: 'آدرس‌های دستی', p: 'آدرس واسط', s: 'پروکسی خروجی' }[scanTargetValue()];
      var action = isIp
        ? '<button class="btn sm" type="button" data-act="add-ip" data-ip="' + p.ip + '" data-port="' + p.port + '">' + ICO.plus + ' به ' + targetLabel + '</button>'
        : '<button class="btn sm" type="button" data-act="use-proxy" data-proxy="' + String(p.proxy || '').replace(/"/g, '&quot;') + '">' + ICO.link + ' ' + t('btn.connectS') + '</button>';
      return '<tr>' +
        '<td><span class="code-badge">' + (p.code || '—') + '</span> ' + (p.country || '—') + '</td>' +
        '<td class="mono">' + (String(p.ip).includes(':') ? '[' + p.ip + ']' : p.ip) + ':' + p.port + '</td>' +
        '<td><span class="tag on">' + typeLabel + '</span></td>' +
        '<td class="mono ' + latClass + '">' + p.latencyMs + ' ms</td>' +
        '<td><span class="tag ' + (p.verified === false ? '' : 'on') + '">' + (p.verified === false ? t('scan.unverified') : t('scan.online')) + '</span></td>' +
        '<td>' + action + '</td>' +
      '</tr>';
    }).join('');
  }

  function scanRequest(payload) {
    return fetch(origin() + '/api/scanner/fetch-and-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function(res) { return res.json(); });
  }

  function scanTargetValue() {
    var el = $('scanTarget');
    var v = el ? el.value : 'yx';
    return v === 'p' || v === 's' ? v : 'yx';
  }

  function applyScanItems(target, items) {
    target = target || scanTargetValue();
    var userId = $('scanUser') ? $('scanUser').value : '';
    return fetch(origin() + '/api/scanner/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Mili-Admin': '1' },
      body: JSON.stringify({ target: target, items: items, userId: userId })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        showToast(data.message || (data.success ? 'اعمال شد' : 'خطا در اعمال'), data.success ? 'ok' : 'err');
        if (data.success) {
          if (userId) api('/api/users?t=' + Date.now()).then(function(list) {
            if (list.success) { state.users = list.users || []; renderUsers(); renderLocations(); }
          }).catch(function() {});
          return api('/api/config').then(function(cfg) {
            if (cfg && typeof cfg === 'object' && !cfg.error) {
              state.config = Object.assign({}, state.config, cfg);
              fillSettings();
            }
            return data;
          });
        }
        return data;
      })
      .catch(function() { showToast('خطای شبکه در اعمال نتیجه اسکن', 'err'); });
  }

  function runScanMode(id) {
    if (id === 'manual') return runManualScan();
    var meta = SCAN_META[id];
    if (!meta) return Promise.resolve([]);
    var status = $('scStatus_' + id);
    var body = $('scBody_' + id);
    var countryEl = $('sc_' + id + '_country');
    var limitEl = $('sc_' + id + '_limit');
    var familyEl = $('sc_' + id + '_family');
    var payload = { country: countryEl ? countryEl.value : 'DE', limit: limitEl ? limitEl.value : '10' };
    if (id === 'proxy') {
      payload.kind = 'proxy';
      payload.family = familyEl ? familyEl.value : 'any';
    } else {
      payload.mode = id;
    }
    if (body) body.innerHTML = '<tr><td colspan="6" class="empty">در حال تست...</td></tr>';
    if (status) {
      status.className = 'scan-status';
      status.textContent = id === 'proxy'
        ? 'در حال خواندن پروکسی‌های کشوری و تست اتصال...'
        : 'در حال خواندن منابع آدرس و تست اتصال...';
    }
    return scanRequest(payload)
      .then(function(data) {
        var diag = '';
        if (data.diagnostics && data.diagnostics.length) {
          var healthy = data.diagnostics.filter(function(d) { return d.reachable && d.entries > 0; }).length;
          diag = ' · منابع سالم: ' + healthy + ' از ' + data.diagnostics.length;
        }
        if (data.elapsedMs) diag += ' · ' + Math.round(data.elapsedMs / 1000) + 's';
        if (data.success && data.proxies && data.proxies.length) {
          scanResults = data.proxies;
          renderScanRows(data.proxies, id);
          if (status) status.textContent = (data.message || (data.proxies.length + ' مورد آنلاین از ' + data.testedCount + ' تست')) + diag;
          return data.proxies;
        }
        if (body) body.innerHTML = '<tr><td colspan="6" class="empty">موردی یافت نشد.</td></tr>';
        if (status) {
          status.className = 'scan-status err';
          status.textContent = (data.message || 'دریافت لیست یا تست ناموفق بود.') + diag;
        }
        return [];
      })
      .catch(function() {
        if (body) body.innerHTML = '<tr><td colspan="6" class="empty">خطا.</td></tr>';
        if (status) { status.className = 'scan-status err'; status.textContent = 'خطای شبکه در اجرای اسکنر.'; }
        return [];
      });
  }

  // آدرس‌های دستی: خط‌به‌خط داخل همین پنل تست می‌شوند
  function parseManualHosts(raw) {
    var lines = String(raw || '').split(',').join(String.fromCharCode(10)).split(String.fromCharCode(10));
    var out = [];
    lines.forEach(function(line) {
      var text = String(line || '').trim();
      if (!text) return;
      var scheme = text.indexOf('://');
      if (scheme > -1) text = text.slice(scheme + 3);
      var host = text;
      var port = 443;
      var colon = text.lastIndexOf(':');
      if (colon > 0) {
        var maybe = parseInt(text.slice(colon + 1), 10);
        if (maybe > 0 && maybe < 65536) { host = text.slice(0, colon); port = maybe; }
      }
      if (host.charAt(0) === '[' && host.charAt(host.length - 1) === ']') host = host.slice(1, -1);
      if (!host) return;
      out.push({ host: host, port: port });
    });
    return out.slice(0, 24);
  }

  function runManualScan() {
    var status = $('scStatus_manual');
    var body = $('scBody_manual');
    var hosts = parseManualHosts($('sc_manual_hosts') ? $('sc_manual_hosts').value : '');
    if (!hosts.length) {
      if (status) { status.className = 'scan-status err'; status.textContent = 'آدرسی وارد نشده است؛ هر خط یک آدرس یا host:port بنویسید.'; }
      return Promise.resolve([]);
    }
    if (body) body.innerHTML = '<tr><td colspan="6" class="empty">در حال تست...</td></tr>';
    var queue = hosts.slice();
    var results = [];
    var done = 0;
    if (status) { status.className = 'scan-status'; status.textContent = 'تست ' + hosts.length + ' آدرس داخل پنل...'; }
    var probeOne = function(item) {
      return fetch(origin() + '/api/scanner/probe?host=' + encodeURIComponent(item.host) + '&port=' + item.port)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          var ipv6 = item.host.indexOf(':') > -1;
          results.push({
            code: '—', country: 'دستی', ip: item.host, port: item.port, kind: 'ip',
            family: ipv6 ? 'ipv6' : 'ipv4', protocol: ipv6 ? 'IPv6' : 'IPv4',
            latencyMs: Number(data && data.latencyMs) || 0, verified: !!(data && data.success)
          });
        })
        .catch(function() {
          results.push({ code: '—', country: 'دستی', ip: item.host, port: item.port, kind: 'ip', family: 'ipv4', protocol: 'IPv4', latencyMs: 0, verified: false });
        })
        .then(function() {
          done++;
          if (status) status.textContent = 'تست ' + done + ' از ' + hosts.length + ' آدرس...';
        });
    };
    var worker = function() {
      if (!queue.length) return Promise.resolve();
      var item = queue.shift();
      return probeOne(item).then(worker);
    };
    var runners = [];
    for (var i = 0; i < 6; i++) runners.push(worker());
    return Promise.all(runners).then(function() {
      results.sort(function(a, b) { return (b.verified ? 1 : 0) - (a.verified ? 1 : 0); });
      var online = results.filter(function(r) { return r.verified; });
      renderScanRows(results, 'manual');
      scanResults = results;
      if (status) {
        status.className = online.length ? 'scan-status' : 'scan-status err';
        status.textContent = online.length
          ? online.length + ' از ' + results.length + ' آدرس پاسخ داد؛ با دکمهٔ ردیف به تنظیمات کاربر اضافه کنید.'
          : 'هیچ آدرسی پاسخ نداد؛ آدرس‌ها یا پورت را بررسی کنید.';
      }
      return results;
    });
  }

  function syncConditionalFields() {
    document.querySelectorAll('[data-show-when]').forEach(function(el) {
      var key = el.getAttribute('data-show-when');
      var input = document.querySelector('.switch input[data-key="' + key + '"]');
      el.style.display = (!input || input.checked) ? '' : 'none';
    });
  }

  function rotatePath() {
    if (!ask(t('toast.rotateConfirm'))) return;
    fetch(origin() + '/api/admin/rotate-path', { method: 'POST' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success && data.redirect) {
          window.location.href = data.redirect;
        } else {
          showToast(data.message || t('toast.network'), 'err');
        }
      })
      .catch(function() { showToast(t('toast.network'), 'err'); });
  }

  function testUserNodes(token) {
    if (!token) return;
    showToast(t('toast.testingNodes'), 'ok');
    fetch(origin() + '/sub/' + token + '?target=raw&limit=6')
      .then(function(res) { return res.text(); })
      .then(function(text) {
        var nodes = [];
        var seen = {};
        String(text || '').split(/\\r?\\n/).forEach(function(line) {
          var match = line.match(/@\\[?([0-9a-fA-F:.]+)\\]?:(\\d+)/);
          if (!match) return;
          var host = match[1];
          var port = parseInt(match[2], 10) || 443;
          var key = host + ':' + port;
          if (seen[key] || host === '127.0.0.1') return;
          seen[key] = true;
          nodes.push({ host: host, port: port });
        });
        if (!nodes.length) { showToast(t('scan.none'), 'err'); return; }
        return fetch(origin() + '/api/scanner/test-nodes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes: nodes.slice(0, 8) })
        }).then(function(res) { return res.json(); }).then(function(data) {
          showToast(data.message || t('toast.network'), data.success ? 'ok' : 'err');
        });
      })
      .catch(function() { showToast(t('toast.network'), 'err'); });
  }

  function addCfDefaults(kind) {
    var items = kind === 'ips'
      ? (INITIAL_DATA.officialIps || []).concat(INITIAL_DATA.officialIpv6 || []).map(function(ip) { return { ip: ip, port: 443, name: ip }; })
      : (INITIAL_DATA.directDomains || []).map(function(domain) { return { ip: domain, port: 443, name: domain }; });
    if (!items.length) { showToast('لیست پیش‌فرض خالی است', 'err'); return; }
    applyScanItems('yx', items).then(function(data) {
      if (data && data.success) {
        showToast((kind === 'ips' ? 'آی‌پی‌های پیش‌فرض کلادفلر' : 'دامنه‌های پیش‌فرض کلادفلر') + ' به آدرس‌های دستی اضافه شدند', 'ok');
      }
    });
  }

  function addNode(ip, port) {
    var host = String(ip || '').trim();
    var p = Number(port) || 443;
    if (scanTargetValue() === 'p') return applyScanItems('p', [{ ip: host, port: p }]);
    return applyScanItems('yx', [{ ip: host, port: p, name: host }]);
  }

  function useProxy(proxyUrl) {
    if (!proxyUrl) { showToast('آدرس پروکسی نامعتبر است', 'err'); return; }
    return applyScanItems('s', [{ proxy: proxyUrl }]);
  }

  function countryProxy(code) {
    openScanView('proxy');
    if ($('sc_proxy_country')) $('sc_proxy_country').value = code;
    if ($('scanTarget')) $('scanTarget').value = 's';
    return runScanMode('proxy').then(function(items) {
      if (!items || !items.length || !items[0].proxy) return;
      var status = $('scStatus_proxy');
      if (status) status.textContent = 'سریع‌ترین پروکسی ' + code + ' (' + items[0].latencyMs + ' ms) به‌عنوان پروکسی خروجی ثبت شد.';
      return useProxy(items[0].proxy);
    });
  }

  function countryIp(code) {
    openScanView('ipv4');
    if ($('sc_ipv4_country')) $('sc_ipv4_country').value = code;
    if ($('scanTarget')) $('scanTarget').value = 'yx';
    return runScanMode('ipv4').then(function(items) {
      if (!items || !items.length) return;
      var status = $('scStatus_ipv4');
      return applyScanItems('yx', items.slice(0, 3).map(function(p) { return { ip: p.ip, port: p.port, name: p.ip }; }))
        .then(function() { if (status) status.textContent = 'آدرس‌های ثابت به «آدرس‌های دستی» اضافه شدند و در تب «آدرس‌ها و منطقه» کاربر دیده می‌شوند.'; });
    });
  }

  function savePassword() {
    var oldPwd = ($('pwdOld').value || '').trim();
    var newPwd = ($('pwdNew').value || '').trim();
    var newPwd2 = ($('pwdNew2').value || '').trim();
    if (newPwd.length < 4) { showToast('رمز جدید باید حداقل ۴ کاراکتر باشد', 'err'); return; }
    if (newPwd !== newPwd2) { showToast('تکرار رمز جدید یکسان نیست', 'err'); return; }
    fetch(origin() + '/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          closeModal('passwordModal');
          $('pwdOld').value = ''; $('pwdNew').value = ''; $('pwdNew2').value = '';
          showToast('رمز مدیر تغییر کرد', 'ok');
        } else {
          showToast(data.message || 'خطا در تغییر رمز', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در تغییر رمز', 'err'); });
  }

  function logout() {
    fetch(origin() + '/api/admin/logout', { method: 'POST' }).catch(function() {}).finally(function() {
      window.location.href = '/';
    });
  }

  function openModal(id) { var m = $(id); if (m) m.classList.add('is-open'); }
  function closeModal(id) {
    var m = $(id);
    if (m) m.classList.remove('is-open');
    // بستن راهنما شروع شمارش سه‌ثانیه‌ای پنجرهٔ بروزرسانی است.
    if (id === 'helpModal') scheduleUpdatePrompt();
  }

  // ——— راهنمای پنل: چند تب، باز شدن نرم بعد از دو ثانیه ———
  function switchHelpTab(id) {
    document.querySelectorAll('[data-help-tab]').forEach(function(b) {
      b.classList.toggle('is-active', b.getAttribute('data-help-tab') === id);
    });
    document.querySelectorAll('[data-help-pane]').forEach(function(p) {
      p.classList.toggle('is-active', p.getAttribute('data-help-pane') === id);
    });
    var body = document.querySelector('#helpModal .help-body');
    if (body) body.scrollTop = 0;
  }
  function openHelp() {
    switchHelpTab(lsGet('mili_help_tab') || 'quick');
    openModal('helpModal');
  }

  // بازگرداندن همهٔ تنظیمات کلی به پیش‌فرض
  function resetAllSettings() {
    var btn = document.querySelector('[data-act="confirm-reset"]');
    if (btn) { btn.disabled = true; btn.classList.add('is-busy'); }
    api('/api/config', { method: 'POST', body: JSON.stringify({ _reset: true }) })
      .then(function(data) {
        if (data && data.success) {
          closeModal('resetAllModal');
          showToast('همهٔ تنظیمات به حالت پیش‌فرض برگشت', 'ok');
          if (data.config) { state.config = data.config; fillSettings(); }
          setTimeout(function() { window.location.reload(); }, 1100);
          return;
        }
        if (btn) { btn.disabled = false; btn.classList.remove('is-busy'); }
        showToast((data && data.message) || 'بازنشانی انجام نشد', 'err');
      })
      .catch(function() {
        if (btn) { btn.disabled = false; btn.classList.remove('is-busy'); }
        showToast('خطای شبکه در بازنشانی تنظیمات', 'err');
      });
  }

  function masterSub() { return origin() + '/sub/' + (ADMIN_PATH || ''); }

  document.addEventListener('click', function(event) {
    var tab = event.target.closest('[data-tab]');
    if (tab) {
      var tabName = tab.getAttribute('data-tab');
      // رفتن به تب اسکنر دوباره منوی اسکن‌ها را نشان می‌دهد
      if (tabName === 'scanner') closeScanView();
      showPanel(tabName);
      return;
    }

    var formTab = event.target.closest('[data-uf-tab]');
    if (formTab) { switchUserFormTab(formTab.getAttribute('data-uf-tab')); return; }

    var helpTab = event.target.closest('[data-help-tab]');
    if (helpTab) {
      var helpTabId = helpTab.getAttribute('data-help-tab');
      lsSet('mili_help_tab', helpTabId);
      switchHelpTab(helpTabId);
      return;
    }

    var el = event.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');

    if (act === 'copy') { copyText(el.getAttribute('data-url') || '', 'لینک کپی شد'); }
    else if (act === 'copy-master') { copyText(masterSub(), 'سابلینک اصلی کپی شد'); }
    else if (act === 'open-create') { openUserForm(null); }
    else if (act === 'edit-user') { editUser(el.getAttribute('data-id')); }
    else if (act === 'save-user' || act === 'create-user') { saveUser(); }
    else if (act === 'toggle-drawer') { toggleDrawer(); }
    else if (act === 'close-drawer') { toggleDrawer(false); }
    else if (act === 'open-update') { openUpdateModal(); }
    else if (act === 'check-update') { openUpdateModal(); }
    else if (act === 'apply-update') { applyUpdateNow(); }
    else if (act === 'diagnose-update') { diagnoseUpdate(); }
    else if (act === 'download-update') { downloadUpdateBundle(); }
    else if (act === 'copy-update-cmd') { copyUpdateCommand(); }
    else if (act === 'enable-autoupdate') { enableAutoUpdate(); }
    else if (act === 'disable-autoupdate') { disableAutoUpdate(); }
    else if (act === 'open-password') { openModal('passwordModal'); }
    else if (act === 'open-help') { openHelp(); }
    else if (act === 'open-reset') { openModal('resetAllModal'); }
    else if (act === 'confirm-reset') { resetAllSettings(); }
    else if (act === 'open-multi') { showPanel('locations'); }
    else if (act === 'close-modal') { closeModal(el.getAttribute('data-modal')); }
    else if (act === 'delete-user') { deleteUser(el.getAttribute('data-id')); }
    else if (act === 'reset-user') { resetUser(el.getAttribute('data-id')); }
    else if (act === 'reload-users') { reloadUsers(); }
    else if (act === 'save-password') { savePassword(); }
    else if (act === 'logout') { logout(); }
    else if (act === 'go-scan') { showPanel('scanner'); closeScanView(); }
    else if (act === 'add-node' || act === 'add-ip') { addNode(el.getAttribute('data-ip'), el.getAttribute('data-port')); }
    else if (act === 'use-proxy') { useProxy(el.getAttribute('data-proxy')); }
    else if (act === 'country-proxy') { countryProxy(el.getAttribute('data-code')); }
    else if (act === 'loc-random-ip') { locRandomIp(false); }
    else if (act === 'loc-random-ipv6') { locRandomIp(true); }
    else if (act === 'loc-copy-region') { locCopyRegion(); }
    else if (act === 'country-ip') { countryIp(el.getAttribute('data-code')); }
    else if (act === 'toggle-theme') { toggleTheme(); }
    else if (act === 'open-theme') { updateThemeCards(); if ($('fxToggleSwitch')) $('fxToggleSwitch').checked = FX_CHOICE !== 'off'; openModal('themeModal'); }
    else if (act === 'set-theme') { setTheme(el.getAttribute('data-skin')); }
    else if (act === 'open-fx') { toggleFxOnOff(); }
    else if (act === 'open-tg') { openModal('tgModal'); buildTgProxiesInModal(); }
    else if (act === 'build-tg-proxy') { buildTgProxiesInModal(); }
    else if (act === 'copy-tg-sub') { copyText(origin() + '/tg?format=links&country=' + (($('tgProxyCountry') && $('tgProxyCountry').value) || 'DE'), 'لینک اشتراک پروکسی تلگرام کپی شد'); }
    else if (act === 'set-fx') { applyFx(el.getAttribute('data-fx')); }
    else if (act === 'install-app') { promptInstall(); }
    else if (act === 'toggle-lang') { toggleLang(); }
    else if (act === 'add-cf-ips') { addCfDefaults('ips'); }
    else if (act === 'add-cf-domains') { addCfDefaults('domains'); }
    else if (act === 'copy-admin-path') { copyText('/' + ADMIN_PATH, 'مسیر مدیریت کپی شد'); }
    else if (act === 'rotate-path') { rotatePath(); }
    else if (act === 'test-nodes') { testUserNodes(el.getAttribute('data-user')); }
    else if (act === 'scan-back') { closeScanView(); }
    else if (act === 'scan-run') { runScanMode(el.getAttribute('data-mode')); }
  });

  // بازخورد لمسی: موج نور از نقطهٔ لمس/کلیک روی دکمه‌ها و تب‌ها
  document.addEventListener('pointerdown', function(event) {
    var host = event.target.closest('.btn, .icon-btn, .ftab, .tab, .drawer-item, .loc-card, .loc-act');
    if (!host || host.disabled) return;
    var rect = host.getBoundingClientRect();
    var wave = document.createElement('span');
    wave.className = 'ripple';
    wave.style.left = (event.clientX - rect.left) + 'px';
    wave.style.top = (event.clientY - rect.top) + 'px';
    host.appendChild(wave);
    host.classList.add('is-press');
    setTimeout(function() {
      if (wave.parentNode) wave.parentNode.removeChild(wave);
      host.classList.remove('is-press');
    }, 620);
  }, { passive: true });

  document.addEventListener('click', function(event) {
    if (event.target.classList && event.target.classList.contains('modal')) {
      closeModal(event.target.id);
    }
  });

  // ——— استخر آی‌پی اختصاصی: انتخاب تصادفی در پنجرهٔ تنظیمات کاربر ———
  function fillRandomFromIpPool(button) {
    var key = button.getAttribute('data-pool-fill');
    var box = button.closest ? button.closest('.ip-pool') : null;
    var field = document.getElementById('uf_' + key);
    if (!box || !field) return;
    var countInput = box.querySelector('.ip-pool-count');
    var countrySelect = box.querySelector('.ip-pool-country');
    var count = Math.max(1, Math.min(parseInt(countInput && countInput.value, 10) || 5, 64));
    var cc = countrySelect ? countrySelect.value : '';
    var pool = (INITIAL_DATA.ipPool || []).filter(function(item) { return !cc || item.cc === cc; });
    if (!pool.length) return;
    var names = INITIAL_DATA.ipPoolCountryNames || {};
    var picked = pool.slice();
    for (var i = picked.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = picked[i]; picked[i] = picked[j]; picked[j] = tmp;
    }
    picked = picked.slice(0, Math.min(count, picked.length));
    var lines = picked.map(function(item) { return item.ip + ':443#' + (names[item.cc] || item.cc); });
    var current = String(field.value || '').split(SEP_RE).map(function(s) { return s.trim(); }).filter(Boolean);
    var seen = {};
    current.forEach(function(line) { seen[line] = 1; });
    lines.forEach(function(line) { if (!seen[line]) { seen[line] = 1; current.push(line); } });
    field.value = current.join(NL);
    field.dispatchEvent(new Event('input', { bubbles: true }));
    showToast(lines.length + ' آی‌پی تصادفی به آدرس‌های دستی اضافه شد', 'ok');
  }

  document.addEventListener('click', function(event) {
    var btn = event.target && event.target.closest ? event.target.closest('[data-pool-fill]') : null;
    if (!btn) return;
    event.preventDefault();
    fillRandomFromIpPool(btn);
  });

  document.addEventListener('change', function(event) {
    var target = event.target;
    if (!target) return;
    if (target.matches && target.matches('.switch input[data-key]')) {
      var key = target.getAttribute('data-key');
      if (key === 'frag' || key === 'ech') syncConditionalFields();
    }
    if (target.matches && target.matches('input[data-scan]')) {
      toggleScanMode(target.getAttribute('data-scan'), target.checked);
    }
    if (target.closest && target.closest('#createModal')) updateFormSummary();
    if (target.id === 'uf_preset') applyPresetToForm();
    if (target.id === 'fxToggleSwitch') applyFx(target.checked ? 'auto' : 'off');
    if (target.id === 'dnsPreset') {
      var dnsInput = document.querySelector('input[data-key="customDNS"]');
      if (dnsInput && target.value !== 'custom') dnsInput.value = target.value;
    }
  });

  document.addEventListener('input', function(event) {
    var target = event.target;
    if (target && target.closest && target.closest('#createModal')) updateFormSummary();
  });


  applySkin(lsGet('mili_skin') || 'zedsecure');
  (function initCustomCursor() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var cur = document.createElement('div');
    cur.id = 'miliCursorFollower';
    document.body.appendChild(cur);
    window.addEventListener('pointermove', function(e) {
      cur.style.opacity = '1';
      cur.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      var interactive = e.target && e.target.closest ? e.target.closest('button, a, input, select, textarea, summary, .switch, .m3-theme-card') : null;
      cur.classList.toggle('is-hover', Boolean(interactive));
    }, { passive: true });
  })();
  if (lsGet('mili_theme') === 'light') {
    document.body.classList.add('light-mode');
    document.body.setAttribute('data-theme', 'light');
    updateThemeLabel();
  }
  applyLanguage();
  fxStart();
  buildScanViews();
  renderUsers();
  renderLocations();
  fillSettings();
  syncConditionalFields();
  renderMetrics();

  // راهنما: دو ثانیه پس از ورود با یک حرکت نرم جلوی کاربر می‌آید؛ اگر تیک
  // «دیگر خودکار باز نشود» را بزند، از دفعهٔ بعد فقط دستی باز می‌شود.
  (function initHelp() {
    var noAuto = $('helpNoAuto');
    if (noAuto) {
      noAuto.checked = lsGet('mili_help_off') === '1';
      noAuto.addEventListener('change', function() {
        lsSet('mili_help_off', noAuto.checked ? '1' : '0');
      });
    }
    if (lsGet('mili_help_off') === '1') {
      // اگر راهنما خودکار باز نمی‌شود، سه ثانیه بعد از ورود بررسی و در
      // صورت وجود نسخهٔ تازه پنجرهٔ بروزرسانی باز می‌شود.
      scheduleUpdatePrompt();
      return;
    }
    setTimeout(function() {
      if (document.querySelector('.modal.is-open')) return;
      openHelp();
    }, 2000);
  })();

  // نصب اپ: ثبت سرویس‌ورکر و نگه‌داشتن رویداد نصب مرورگر
  ${PWA_CLIENT_JS}

  // بررسی بی‌صدای نسخه در پس‌زمینه (خروجی ۱۰ دقیقه کش می‌شود)
  setTimeout(function() { checkUpdate(true); }, 1200);

  var hash = (window.location.hash || '').replace('#', '');
  if (hash && document.querySelector('[data-panel="' + hash + '"]')) showPanel(hash);
  if (window.__miliDiag) window.__miliDiag.ready = true;
</script>
</body>
</html>`);
}
