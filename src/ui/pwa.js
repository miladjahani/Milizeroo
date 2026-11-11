// ============================================================================
// miliconfig v3.5.2 - لایهٔ نصب اپ (PWA)
// سه چیز را فراهم می‌کند: manifest، سرویس‌ورکر و آیکون مستقل.
// با همین‌ها پنل هم روی دسکتاپ (Chrome/Edge) و هم روی گوشی نصب‌شدنی می‌شود و
// در حالت standalone (بدون نوار آدرس) اجرا می‌شود.
// ============================================================================

import { BRAND_NAME, VERSION } from '../config/defaults.js';

const THEME_BG = '#05080a';

// آیکون ایستای اپ: همان سپر برند با پس‌زمینهٔ تیره تا در لانچر خوانا بماند
export const PWA_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="512" height="512">
  <rect width="128" height="128" rx="26" fill="${THEME_BG}"/>
  <circle cx="64" cy="64" r="50" fill="#0c1a12" stroke="#65a30d" stroke-width="2" stroke-opacity="0.7"/>
  <path d="M64 32L88 42.4V61.6C88 78.8 77.8 93.6 64 99C50.2 93.6 40 78.8 40 61.6V42.4L64 32Z" fill="none" stroke="#b5ff4d" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M54.8 63.2L61.6 70L74 57.2" fill="none" stroke="#b5ff4d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const MANIFEST = {
  name: `${BRAND_NAME}OS`,
  short_name: BRAND_NAME,
  description: 'مرکز کنترل اتصال و کانفیگ',
  lang: 'fa',
  dir: 'rtl',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  display_override: ['standalone', 'minimal-ui'],
  orientation: 'portrait-primary',
  background_color: THEME_BG,
  theme_color: THEME_BG,
  version: String(VERSION).replace(/^v/i, ''),
  icons: [
    { src: '/pwa-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: '/pwa-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
  ]
};

// سرویس‌ورکر عمداً هیچ صفحه‌ای را کش نمی‌کند: پنل پویاست و کش کهنه باعث
// نمایش نسخهٔ قدیمی می‌شود. فقط شرط نصب‌پذیری و کنترل پنجره را فراهم می‌کند.
export const PWA_SW_JS = `/* ${BRAND_NAME}OS service worker */
self.addEventListener('install', function (event) { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((self.clients && self.clients.claim) ? self.clients.claim() : Promise.resolve());
});
self.addEventListener('fetch', function () {});
`;

// تکه‌های head برای صفحات پنل/ورود/وضعیت
export const PWA_HEAD_TAGS = `<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="${THEME_BG}">
<meta name="application-name" content="${BRAND_NAME}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="${BRAND_NAME}">
<link rel="apple-touch-icon" href="/pwa-icon.svg">`;

// اسکریپت سمت کلاینت (بدون بک‌اسلش تا از لایهٔ unescape سالم بیرون بیاید)
export const PWA_CLIENT_JS = `(function () {
  try {
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    }
  } catch (e) {}
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.miliInstallPrompt = e;
    var btn = document.getElementById('installBtn');
    if (btn) { btn.classList.add('is-ready'); btn.removeAttribute('hidden'); }
  });
  window.addEventListener('appinstalled', function () {
    window.miliInstallPrompt = null;
    var btn = document.getElementById('installBtn');
    if (btn) btn.classList.remove('is-ready');
  });
})();`;

export function pwaManifestResponse() {
  return new Response(JSON.stringify(MANIFEST), {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

export function pwaServiceWorkerResponse() {
  return new Response(PWA_SW_JS, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/'
    }
  });
}

export function pwaIconResponse() {
  return new Response(PWA_ICON_SVG, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
