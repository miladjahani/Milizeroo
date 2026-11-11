// ============================================================================
// miliconfig v3.1 - نقطه ورود اصلی Cloudflare Workers & Pages
// مجهز به لایه دیتابیس D1، مدیریت چندکاربره، نام‌گذاری number+miliconfig و محافظ ضد خطای 1101
// ============================================================================

import { ADMIN_SUB_NODE_COUNT, BRAND_NAME, DIRECT_DOMAINS, OFFICIAL_DIRECT_IPS, OFFICIAL_DIRECT_IPV6 } from './config/defaults.js';
import {
  ensureD1Schema,
  getOrCreateAdminPath,
  getStorageDiagnostics,
  getUserByIdOrToken,
  hasAdminPassword,
  listUsers,
  loadGlobalConfig,
  recordUserActivity,
  verifyAdminSession
} from './db/d1.js';
import { handleWebSocketUpgrade, handleXhttpPostRequest } from './core/runtime.js';
import { warmEdgePool } from './core/edgePool.js';
import { autoUpdateIfEnabled } from './core/updater.js';
import {
  MULTI_COUNTRY_CODES,
  buildWarpConfBundle,
  buildWireGuardConf,
  generateUserNodesList,
  handleSubscriptionResponse,
  refreshCountryProxyPool
} from './subscription/generator.js';
import { buildWarpMasqueBundle } from './subscription/masqueBundle.js';
import { buildZip, isPrivateOrReservedTarget, timingSafeEqualStr } from './core/utils.js';
import { IP_POOL, IP_POOL_COUNTRIES, IP_POOL_SIZE, poolSubscriptionText } from './config/ipPool.js';
import {
  handleAuthApi,
  handleAutoUpdateSetupApi,
  handleConfigApi,
  handleDashboardStatsApi,
  handlePreferredIpsApi,
  handlePublicUserStatusApi,
  handleScannerApi,
  handleTelegramProxyApi,
  handleWebProxyRequest,
  handleUpdateApi,
  handleUpdateBundle,
  handleUsersApi
} from './api/handlers.js';
import { renderLoginGatewayHtml } from './ui/loginHtml.js';
import { renderUserStatusPageHtml } from './ui/statusHtml.js';
import { renderAdminDashboardHtml } from './ui/adminHtml.js';
import { pwaIconResponse, pwaManifestResponse, pwaServiceWorkerResponse } from './ui/pwa.js';

// پرچم آماده‌سازی یک‌بارهٔ اسکیمای D1 در هر ایزوله
let schemaReady = false;

function normalizeCleanPath(p = '') {
  return String(p || '').trim().replace(/^\/+|\/+$/g, '').toLowerCase();
}

function isAdminAuthorizedPath(prefixPath, adminUuid, customPath) {
  const cleanPrefix = normalizeCleanPath(prefixPath);
  if (!cleanPrefix) return false;
  const cleanAdmin = normalizeCleanPath(adminUuid);
  const cleanCustom = normalizeCleanPath(customPath);
  if (cleanCustom) {
    return timingSafeEqualStr(cleanPrefix, cleanCustom) || timingSafeEqualStr(cleanPrefix, cleanAdmin);
  }
  return timingSafeEqualStr(cleanPrefix, cleanAdmin);
}

export default {
  // کرون: هر ۲۰ دقیقه استخر پروکسی تأییدشدهٔ کشورها در D1 تازه می‌شود تا
  // ساب‌لیک (به‌ویژه حالت MULTI) بدون تست زمان‌بر و با کشور درست سرو شود.
  async scheduled(_event, env = {}, ctx = {}) {
    const task = (async () => {
      const results = [];
      // استخر لبهٔ کلادفلر (IPv4/IPv6/دامنه) در هر اجرای کرون تازه می‌شود
      try {
        results.push({ edgePool: await warmEdgePool() });
      } catch (e) {
        results.push({ edgePool: null, edgeError: e?.message || String(e) });
      }
      // بروزرسانی خودکار نسخه (فقط اگر مدیر روشن کرده و توکن کلادفلر ست شده باشد)
      try {
        const cfg = await loadGlobalConfig(env);
        // کلید نصب خودکار فقط از متغیرهای خود ورکر خوانده می‌شود (نه از پنل)
        const cronToken = String(env?.CF_API_TOKEN || env?.CLOUDFLARE_API_TOKEN || '').trim();
        results.push({ update: await autoUpdateIfEnabled(cfg, env, { token: cronToken }) });
      } catch (e) {
        results.push({ update: { skipped: 'error', message: e?.message || String(e) } });
      }
      // چرخش هوشمند ۲ کشور در هر نوبت کرون تا سقف ۵۰ درخواست فرعی کلودفلر هرگز شکسته نشود
      const slot = Math.floor(Date.now() / (10 * 60 * 1000)) % Math.max(1, MULTI_COUNTRY_CODES.length);
      const batchCodes = [
        MULTI_COUNTRY_CODES[slot % MULTI_COUNTRY_CODES.length],
        MULTI_COUNTRY_CODES[(slot + 1) % MULTI_COUNTRY_CODES.length]
      ].filter(Boolean);
      for (const code of batchCodes) {
        try {
          results.push(await refreshCountryProxyPool(env, code));
        } catch (_e) {
          results.push({ code, verified: 0 });
        }
      }
      return results;
    })();
    if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(task);
    return task;
  },

  async fetch(request, env = {}, ctx = {}) {
    try {
      const url = new URL(request.url);
      const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase();
      const isWebSocket = upgradeHeader === 'websocket';

      // اطمینان از آماده بودن اسکیمای D1 یا حافظه پشتیبان بدون هیچ خطایی.
      // فقط یک‌بار در عمر هر ایزوله انجام می‌شود تا هر درخواست CPU اضافی نگیرد
      // (روش آزموده‌شده برای جلوگیری از خطای ۱۱۰۲/۱۱۰۱).
      if (!schemaReady) {
        await ensureD1Schema(env);
        schemaReady = true;
      }
      // مسیر مدیریت رندوم و یکتا برای هر نصب — UUID پیش‌فرض عمومی حذف شده است
      const adminUuid = await getOrCreateAdminPath(env);
      const globalCfg = await loadGlobalConfig(env);
      const allUsers = await listUsers(env);

      const readCookie = (name) => {
        const raw = request.headers.get('Cookie') || '';
        const match = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
      };
      const loginPageResponse = async (extra = {}) => new Response(renderLoginGatewayHtml({
        initialized: await hasAdminPassword(env),
        customPath: globalCfg.d,
        ...extra
      }), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          // استتار nginx: کلادفلر صفحه را وب‌سرور معمولی می‌بیند
          'Server': 'nginx',
          'X-Powered-By': 'nginx'
        }
      });

      // ۱. هندل کردن ترافیک پروکسی WebSocket (VLESS + Trojan + UDP DNS)
      if (isWebSocket) {
        return await handleWebSocketUpgrade(request, env, ctx, globalCfg, allUsers, adminUuid);
      }

      const pathParts = url.pathname.split('/').filter(Boolean);

      // ۲. هندل کردن APIهای احراز هویت، اسکنر، مدیریتی و عمومی
      if (url.pathname.includes('/api/')) {
        if (url.pathname.startsWith('/api/admin/')) {
          return await handleAuthApi(request, env);
        }
        if (url.pathname.startsWith('/api/scanner/')) {
          return await handleScannerApi(request, env);
        }
        if (url.pathname.startsWith('/api/telegram/')) {
          return await handleTelegramProxyApi(request, env);
        }
        const apiIdx = pathParts.indexOf('api');
        const prefix = pathParts.slice(0, apiIdx).join('/');
        const apiSubPath = pathParts.slice(apiIdx + 1).join('/');

        // API عمومی صفحه وضعیت کاربر
        if (apiSubPath.startsWith('status/')) {
          const token = decodeURIComponent(apiSubPath.slice('status/'.length));
          return await handlePublicUserStatusApi(request, env, token);
        }

        // بررسی دسترسی مدیر برای APIهای مدیریتی
        if (!isAdminAuthorizedPath(prefix, adminUuid, globalCfg.d)) {
          return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز (مسیر مدیریت نامعتبر است)' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
        }
        if ((await hasAdminPassword(env)) && request.method !== 'OPTIONS') {
          const cookieOk = await verifyAdminSession(env, readCookie('mili_auth'));
          const headerToken = request.headers.get('X-Mili-Session') || '';
          const headerOk = headerToken ? await verifyAdminSession(env, headerToken) : false;
          // در صورتی که رمز عبور تنظیم شده باشد و درخواست از مرورگر با کوکی نامعتبر بیاید، مسدود می‌شود
          const hasCookieHeader = Boolean(request.headers.get('Cookie'));
          if (hasCookieHeader && !cookieOk && !headerOk) {
            return new Response(JSON.stringify({ error: 'نشست مدیریتی منقضی شده یا نامعتبر است؛ دوباره وارد شوید.' }), {
              status: 401,
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
          }
        }

        if (apiSubPath === 'config') {
          return await handleConfigApi(request, env);
        }
        if (apiSubPath === 'users') {
          return await handleUsersApi(request, env);
        }
        if (apiSubPath === 'update') {
          return await handleUpdateApi(request, env);
        }
        if (apiSubPath === 'update-bundle') {
          return await handleUpdateBundle(request, env);
        }
        if (apiSubPath === 'auto-update-setup') {
          return await handleAutoUpdateSetupApi(request, env);
        }
        if (apiSubPath === 'preferred-ips') {
          return await handlePreferredIpsApi(request, env, true);
        }
        if (apiSubPath === 'stats' || apiSubPath === 'd1-init') {
          return await handleDashboardStatsApi(request, env);
        }

        return new Response(JSON.stringify({ error: 'مسیر API یافت نشد' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }

      // ۳. هندل کردن پروتکل xhttp (درخواست‌های POST غیر API)
      if (request.method === 'POST') {
        return await handleXhttpPostRequest(request, env, ctx, globalCfg, allUsers, adminUuid);
      }

      // ۴. هندل کردن درخواست‌های GET
      if (request.method === 'GET' || request.method === 'HEAD') {
        // ۴-۰-۰: ساب اختصاصی استخر آی‌پی miliconfig (فهرست ثابت داخل مخزن)
        if (url.pathname === '/ips' || url.pathname === '/ips.txt' || url.pathname === '/ips.json') {
          const poolHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
            'profile-update-interval': '6'
          };
          if (url.pathname === '/ips.json') {
            return new Response(JSON.stringify({
              success: true,
              name: 'miliconfig-ip-pool',
              count: IP_POOL_SIZE,
              countries: IP_POOL_COUNTRIES,
              ips: IP_POOL.map(item => item.ip),
              subscription: url.origin + '/ips'
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json; charset=utf-8', ...poolHeaders }
            });
          }
          const rawCount = String(url.searchParams.get('count') || '').trim();
          const count = Math.min(Math.max(parseInt(rawCount, 10) || IP_POOL_SIZE, 1), IP_POOL_SIZE);
          const body = poolSubscriptionText({
            count,
            country: url.searchParams.get('country') || url.searchParams.get('cc') || '',
            port: url.searchParams.get('port') || '',
            countryLabel: /^(1|yes|true)$/i.test(String(url.searchParams.get('label') || ''))
          });
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Content-Disposition': 'inline; filename="miliconfig-ips.txt"',
              ...poolHeaders
            }
          });
        }

        // ۴-۰: فایل‌های نصب اپ (PWA) — برای دسکتاپ و گوشی، بیرون از مسیر مدیریت
        if (url.pathname === '/webproxy' || url.pathname === '/tg-web') return await handleWebProxyRequest(request, env);
        if (url.pathname === '/tg' || url.pathname.startsWith('/tg/')) return await handleTelegramProxyApi(request, env);
        if (url.pathname === '/manifest.webmanifest') return pwaManifestResponse();
        if (url.pathname === '/sw.js') return pwaServiceWorkerResponse();
        if (url.pathname === '/pwa-icon.svg') return pwaIconResponse();

        // ۴-الف: صفحه اصلی /
        if (url.pathname === '/' || pathParts.length === 0) {
          if (globalCfg.homepage && String(globalCfg.homepage).trim()) {
            try {
              const targetUrl = new URL(String(globalCfg.homepage).trim());
              if (
                (targetUrl.protocol === 'https:' || targetUrl.protocol === 'http:') &&
                targetUrl.hostname.toLowerCase() !== url.hostname.toLowerCase() &&
                !isPrivateOrReservedTarget(targetUrl.hostname)
              ) {
                const ctrl = new AbortController();
                const timer = setTimeout(() => ctrl.abort(), 3500);
                const camouflageResp = await fetch(targetUrl.toString(), {
                  method: 'GET',
                  headers: {
                    'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
                    Accept: request.headers.get('Accept') || '*/*'
                  },
                  redirect: 'follow',
                  signal: ctrl.signal
                });
                clearTimeout(timer);
                if (camouflageResp.ok) {
                  return new Response(await camouflageResp.text(), {
                    status: camouflageResp.status,
                    headers: {
                      'Content-Type': camouflageResp.headers.get('Content-Type') || 'text/html; charset=utf-8',
                      'Cache-Control': 'no-cache, no-store, must-revalidate'
                    }
                  });
                }
              }
            } catch (_e) {}
          }
          if (false) {
            try {
              const camouflageResp = null;
              if (camouflageResp.ok) {
                return new Response(await camouflageResp.text(), {
                  status: camouflageResp.status,
                  headers: {
                    'Content-Type': camouflageResp.headers.get('Content-Type') || 'text/html; charset=utf-8',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                  }
                });
              }
            } catch (_e) {}
          }
          // مسیر مدیریت دیگر داخل HTML لو نمی‌رود؛ فقط پس از ورود موفق از سرور برگردانده می‌شود
          return await loginPageResponse();
        }

        // ۴-ب: مسیرهای سازگار با کد پایه /{prefix}/region و /{prefix}/test-api
        if (pathParts.length === 2 && (pathParts[1] === 'region' || pathParts[1] === 'test-api')) {
          const prefix = pathParts[0];
          if (!isAdminAuthorizedPath(prefix, adminUuid, globalCfg.d)) {
            return new Response(JSON.stringify({ error: 'Access Denied' }), {
              status: 403,
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
          }
          if (pathParts[1] === 'region') {
            return new Response(
              JSON.stringify({
                region: globalCfg.wk ? globalCfg.wk.toUpperCase() : globalCfg.p ? 'CUSTOM' : 'CF',
                detectionMethod: globalCfg.wk ? 'تعیین دستی منطقه' : globalCfg.p ? 'ProxyIP سفارشی' : 'اتصال مستقیم رسمی CF',
                timestamp: new Date().toISOString()
              }),
              { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
            );
          }
          return new Response(
            JSON.stringify({
              detectedRegion: 'CF',
              message: 'API تست با موفقیت انجام شد',
              timestamp: new Date().toISOString()
            }),
            { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
          );
        }

        // ۴-ج: صفحه وضعیت اختصاصی برای ارسال به کاربر (/status/{token} یا /{token}/status)
        if (
          (pathParts[0] === 'status' && pathParts[1]) ||
          (pathParts.length === 2 && pathParts[1] === 'status')
        ) {
          const token = decodeURIComponent(pathParts[0] === 'status' ? pathParts[1] : pathParts[0]);
          let userObj = await getUserByIdOrToken(env, token);
          if (!userObj && isAdminAuthorizedPath(token, adminUuid, globalCfg.d)) {
            userObj = allUsers[0] || {
              id: 'mili-admin',
              username: 'Admin',
              uuid: adminUuid,
              subNodeCount: ADMIN_SUB_NODE_COUNT,
              enabled: true,
              status: 'active',
              dataLimitGb: 0,
              usedBytes: 0,
              lifetimeBytes: 0,
              requestCount: 0,
              expireDays: 0,
              expireAt: 0,
              startOnFirstUse: true,
              ipLimit: 50,
              nodeScope: 'all',
              config: globalCfg
            };
          }
          if (!userObj) {
            return new Response('کاربر مورد نظر یافت نشد', {
              status: 404,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
          }
          const nodes = await generateUserNodesList(userObj, url.hostname, {
            limit: userObj.subNodeCount,
            waitUntil: ctx && typeof ctx.waitUntil === 'function' ? ctx.waitUntil.bind(ctx) : null
          });
          return new Response(renderUserStatusPageHtml(userObj, nodes, request.url), {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          });
        }

        // ۴-د: لینک اشتراک کلاینت‌ها (/{token}/sub یا /sub/{token})
        if (
          (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'sub') ||
          (pathParts[0] === 'sub' && pathParts[1])
        ) {
          const token = pathParts[0] === 'sub'
            ? decodeURIComponent(pathParts.slice(1).join('/'))
            : decodeURIComponent(pathParts.slice(0, -1).join('/'));

          // مسیر مدیر همیشه با تنظیمات کل باید سرو شود، حتی اگر کاربری همان UUID را داشته باشد
          const isAdminToken = isAdminAuthorizedPath(token, adminUuid, globalCfg.d);
          let targetUser = isAdminToken ? null : await getUserByIdOrToken(env, token);
          if (!targetUser && isAdminToken) {
            targetUser = {
              id: allUsers[0]?.id || null,
              username: BRAND_NAME,
              uuid: adminUuid,
              subNodeCount: ADMIN_SUB_NODE_COUNT,
              enabled: true,
              dataLimitGb: 0,
              usedBytes: 0,
              expireAt: 0,
              nodeScope: 'all',
              // ساب مدیر همهٔ پروتکل‌ها/ترکیب‌ها را دارد (VLESS + Trojan + XHTTP + Shadowsocks + WARP)
              config: { ...globalCfg, ev: 'yes', et: 'yes', ex: 'yes', es: 'yes', warp: 'yes', warpPro: 'yes', warpMl: 'yes', warpMasque: 'yes', warpMasqueCount: globalCfg.warpMasqueCount || 3 }
            };
          }
          if (!targetUser) {
            return new Response(JSON.stringify({ error: 'شناسه اشتراک نامعتبر است' }), {
              status: 403,
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
          }
          if (targetUser.id) {
            const p = recordUserActivity(env, targetUser.id, 0, 1).catch(() => {});
            if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
          }
          return await handleSubscriptionResponse(request, targetUser, url, env, ctx);
        }

        // ۴-د-۲: دانلود مستقیم کانفیگ‌های WARP / WARP PRO / چندلوکیشن (AmneziaWG)
        // /warp/<token>?format=zip|conf|json — بدون هیچ تنظیمی کار می‌کند؛
        // حتی بدون توکن (آدرس /warp) هم یک بستهٔ آماده برمی‌گردد.
        if (pathParts[0] === 'warp' && String(pathParts[1] || '').toLowerCase() === 'masque') {
          // ساب/ZIP مستقل WARP MASQUE (HTTP/3) — جدا از بستهٔ وایرگارد
          const masqueToken = decodeURIComponent(pathParts.slice(2).join('/'));
          let masqueUser = null;
          if (masqueToken && !isAdminAuthorizedPath(masqueToken, adminUuid, globalCfg.d)) {
            masqueUser = await getUserByIdOrToken(env, masqueToken);
            if (!masqueUser) {
              return new Response(JSON.stringify({ error: 'شناسه نامعتبر است' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
              });
            }
          }
          const masqueCfg = { ...globalCfg, ...((masqueUser && masqueUser.config) || {}), warpMasque: 'yes' };
          const masqueFormat = String(url.searchParams.get('format') || 'zip').toLowerCase();
          const bundle = await buildWarpMasqueBundle(masqueCfg, { seed: masqueUser?.uuid || 'public' });
          const pick = (name, type, fileName) => {
            const file = bundle.files.find(item => item.name === name);
            return new Response(file ? file.data : '', {
              status: file ? 200 : 404,
              headers: {
                'Content-Type': type,
                'Content-Disposition': `inline; filename="${fileName}"`,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store'
              }
            });
          };
          if (['clash', 'yaml', 'mihomo', 'meta'].includes(masqueFormat)) {
            return pick('WARP-masque.yaml', 'text/yaml; charset=utf-8', 'WARP-masque.yaml');
          }
          if (['json', 'sub', 'nodes'].includes(masqueFormat)) {
            return pick('WARP-masque.json', 'application/json; charset=utf-8', 'WARP-masque.json');
          }
          if (['links', 'txt', 'text', 'conf'].includes(masqueFormat)) {
            return pick('endpoints.txt', 'text/plain; charset=utf-8', 'masque-endpoints.txt');
          }
          return new Response(buildZip(bundle.files), {
            status: 200,
            headers: {
              'Content-Type': 'application/zip',
              'Content-Disposition': 'attachment; filename="miliconfig-warp-masque.zip"',
              'Cache-Control': 'no-store'
            }
          });
        }

        if (pathParts[0] === 'warp') {
          const warpToken = decodeURIComponent(pathParts.slice(1).join('/'));
          let warpUser = null;
          if (warpToken) {
            const isAdminToken = isAdminAuthorizedPath(warpToken, adminUuid, globalCfg.d);
            if (!isAdminToken) {
              warpUser = await getUserByIdOrToken(env, warpToken);
              if (!warpUser) {
                return new Response(JSON.stringify({ error: 'شناسه نامعتبر است' }), {
                  status: 403,
                  headers: { 'Content-Type': 'application/json; charset=utf-8' }
                });
              }
            }
          }
          const warpCfg = { ...globalCfg, ...((warpUser && warpUser.config) || {}) };
          // قالب خروجی: اگر format داده شده همان، وگرنه از روی User-Agent کلاینت
          // تشخیص داده می‌شود. پیش‌فرض base64 است چون تقریباً همهٔ کلاینت‌ها
          // (v2rayN، NekoBox، Shadowrocket، Hiddify) آن را می‌خوانند؛ کلاینت‌های
          // Clash/Mihomo و sing-box نسخهٔ اختصاصی خودشان را می‌گیرند.
          const formatParam = String(url.searchParams.get('format') || '').toLowerCase();
          const warpUa = String(request.headers.get('User-Agent') || '').toLowerCase();
          const detectWarpFormat = () => {
            if (new RegExp("clash|mihomo|flclash|stash|verge").test(warpUa)) return 'clash';
            if (new RegExp("sing-?box|hiddify|sfa|sfi|sfm|karing").test(warpUa)) return 'singbox';
            return 'base64';
          };
          // فرمت‌های شناخته‌شده؛ هر مقدار ناشناخته به قالب کلاینت برمی‌گردد (نه ZIP)
          const KNOWN_WARP_FORMATS = new Set([
            'zip', 'clash', 'yaml', 'mihomo', 'singbox', 'sing-box', 'sb', 'hiddify', 'karing', 'json-sub',
            'base64', 'sub', 'v2ray', 'v2rayng', 'nekobox', 'shadowrocket', 'text', 'txt64',
            'conf', 'wg', 'txt', 'links', 'json'
          ]);
          const format = KNOWN_WARP_FORMATS.has(formatParam) ? formatParam : detectWarpFormat();
          // پارامترهای مبهم‌سازی و ترتیب اندپوینت‌ها با شناسهٔ کاربر ساخته می‌شود
          // تا بستهٔ هر کاربر منحصر به فرد باشد.
          const bundle = await buildWarpConfBundle(warpCfg, { seed: warpUser?.uuid || 'public' });
          if (format === 'links') {
            const linksFile = bundle.files.find(file => file.name === 'links.txt');
            return new Response(linksFile ? linksFile.data : '', {
              status: 200,
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                // inline: بعضی کلاینت‌ها فایل attachment را به‌جای سابلینک پارس نمی‌کنند
                'Content-Disposition': 'inline; filename="miliconfig-warp-links.txt"',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store'
              }
            });
          }
          const pickFormat = (name, type, fileName) => {
            const file = bundle.files.find(item => item.name === name);
            return new Response(file ? file.data : '', {
              status: file ? 200 : 404,
              headers: {
                'Content-Type': type,
                'Content-Disposition': `inline; filename="${fileName}"`,
                'Access-Control-Allow-Origin': '*',
                'profile-update-interval': '12',
                'Cache-Control': 'no-store'
              }
            });
          };
          if (format === 'clash' || format === 'yaml' || format === 'mihomo') {
            return pickFormat('WARP-clash.yaml', 'text/yaml; charset=utf-8', 'miliconfig-warp-clash.yaml');
          }
          if (format === 'singbox' || format === 'sing-box' || format === 'sb' || format === 'hiddify' || format === 'karing' || format === 'json-sub') {
            return pickFormat('WARP-singbox.json', 'application/json; charset=utf-8', 'miliconfig-warp-singbox.json');
          }
          if (
            format === 'base64' || format === 'sub' || format === 'v2ray' ||
            format === 'v2rayng' || format === 'nekobox' || format === 'shadowrocket' ||
            format === 'text' || format === 'txt64'
          ) {
            return pickFormat('WARP-sub-base64.txt', 'text/plain; charset=utf-8', 'miliconfig-warp-base64.txt');
          }
          if (format === 'conf' || format === 'wg' || format === 'txt') {
            return new Response(buildWireGuardConf(bundle.config, 'WARP'), {
              status: 200,
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Content-Disposition': 'inline; filename="WARP.conf"',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store'
              }
            });
          }
          if (format === 'json') {
            return new Response(JSON.stringify({ success: true, config: bundle.config, files: bundle.files.map(f => f.name) }), {
              status: 200,
              headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
            });
          }
          return new Response(buildZip(bundle.files), {
            status: 200,
            headers: {
              'Content-Type': 'application/zip',
              'Content-Disposition': 'attachment; filename="miliconfig-warp.zip"',
              'Cache-Control': 'no-store'
            }
          });
        }

        // ۴-هـ: دسترسی به پنل مدیریت ادمین یا صفحه وضعیت کاربر با /{token}
        const fullCleanPath = normalizeCleanPath(url.pathname);
        if (isAdminAuthorizedPath(fullCleanPath, adminUuid, globalCfg.d)) {
          if (url.searchParams.get('view') === 'status') {
            const adminUser = allUsers[0] || {
              id: 'mili-admin',
              username: BRAND_NAME,
              uuid: adminUuid,
              subNodeCount: ADMIN_SUB_NODE_COUNT,
              enabled: true,
              config: { ...globalCfg, ev: 'yes', et: 'yes', ex: 'yes', es: 'yes', warp: 'yes', warpPro: 'yes', warpMl: 'yes', warpMasque: 'yes', warpMasqueCount: globalCfg.warpMasqueCount || 3 }
            };
            const nodes = await generateUserNodesList(adminUser, url.hostname, {
              limit: adminUser.subNodeCount,
              waitUntil: ctx && typeof ctx.waitUntil === 'function' ? ctx.waitUntil.bind(ctx) : null
            });
            return new Response(renderUserStatusPageHtml(adminUser, nodes, request.url), {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }

          // ورود واقعی: بدون کوکی نشست معتبر، پنل نمایش داده نمی‌شود (رفع باگ رمز/امنیت)
          const sessionOk = await verifyAdminSession(env, readCookie('mili_auth'));
          if (!sessionOk) {
            return await loginPageResponse();
          }

          const diag = await getStorageDiagnostics(env);
          const customYxCount = (globalCfg.yx || '').split(',').filter(Boolean).length;
          return new Response(
            renderAdminDashboardHtml({
              config: globalCfg,
              users: allUsers,
              diagnostics: {
                ...diag,
                healthyCfIps: customYxCount + DIRECT_DOMAINS.length + OFFICIAL_DIRECT_IPS.length
              },
              adminPath: fullCleanPath,
              officialIps: OFFICIAL_DIRECT_IPS,
              officialIpv6: OFFICIAL_DIRECT_IPV6,
              directDomains: DIRECT_DOMAINS.map(item => item.domain)
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store'
              }
            }
          );
        }

        // اگر توکن متعلق به یکی از کاربران ثبت‌شده در D1 باشد، صفحه وضعیت اختصاصی همان کاربر نمایش داده می‌شود
        const matchedUser = await getUserByIdOrToken(env, fullCleanPath);
        if (matchedUser) {
          const nodes = await generateUserNodesList(matchedUser, url.hostname, {
            limit: matchedUser.subNodeCount,
            waitUntil: ctx && typeof ctx.waitUntil === 'function' ? ctx.waitUntil.bind(ctx) : null
          });
          return new Response(renderUserStatusPageHtml(matchedUser, nodes, request.url), {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          });
        }
      }

      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    } catch (err) {
      // محافظ سطح بالا جهت جلوگیری ۱۰۰٪ از بروز خطای Cloudflare Error 1101.
      // خطای مدیریت‌شده هرگز به استثنای ورکر تبدیل نمی‌شود
      // و پاسخ سادهٔ ۲۰۰ برمی‌گردد تا هیچ صفحهٔ خطای کلادفلر ظاهر نشود.
      try { console.error('[' + BRAND_NAME + '] recovered:', err?.message || String(err)); } catch (_e) {}
      return new Response('hello', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'Server': 'nginx'
        }
      });
    }
  }
};
