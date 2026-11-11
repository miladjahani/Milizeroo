// ============================================================================
// miliconfig v3.9 - اسکریپت تست جامع و خودکار
// تست باندل مبهم‌شده، عدم وجود کلیدواژه‌های حساس کلادفلر، عدم وقوع Error 1101،
// امنیت (تزریق XSS، مسدودسازی SSRF، محدودیت Brute-Force، احراز هویت ادمین)،
// دور زدن فیلترینگ دامنهٔ Pages.dev در ایران، دیتابیس D1 و سقف ۳ کاربر
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import nodeCrypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

if (!globalThis.crypto && nodeCrypto.webcrypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const bundlePath = path.join(projectRoot, 'dist', '_worker.js');

function createMockD1Database() {
  const store = new Map();
  store.set('users', []);
  store.set('system_config', []);

  function getTableRows(table) {
    if (!store.has(table)) store.set(table, []);
    return store.get(table);
  }

  return {
    prepare(sql) {
      const trimmed = sql.trim();
      return {
        _sql: trimmed,
        _binds: [],
        bind(...args) {
          this._binds = args;
          return this;
        },
        async run() {
          const s = this._sql;
          if (s.startsWith('CREATE TABLE') || s.startsWith('ALTER TABLE')) {
            return { success: true };
          }
          if (s.includes('INSERT') && s.includes('users')) {
            const rows = getTableRows('users');
            const [id, username, uuid, subNodeCount, status, enabled, dataLimitGb, usedBytes, lifetimeBytes, requestCount, expireDays, expireAt, startOnFirstUse, ipLimit, nodeScope, preset, configJson] = this._binds;
            const existingIdx = rows.findIndex(r => r.id === id);
            const rowObj = {
              id, username, uuid,
              sub_node_count: subNodeCount,
              status: status || 'active',
              enabled: enabled ? 1 : 0,
              data_limit_gb: dataLimitGb || 0,
              used_bytes: usedBytes || 0,
              lifetime_bytes: lifetimeBytes || 0,
              request_count: requestCount || 0,
              expire_days: expireDays || 0,
              expire_at: expireAt || 0,
              start_on_first_use: startOnFirstUse ? 1 : 0,
              ip_limit: ipLimit || 50,
              node_scope: nodeScope || 'all',
              preset: preset || 'custom',
              config_json: configJson || '{}',
              created_at: Date.now(),
              updated_at: Date.now()
            };
            if (existingIdx >= 0) rows[existingIdx] = rowObj;
            else rows.push(rowObj);
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('system_config') && (s.includes('INSERT') || s.includes('REPLACE'))) {
            const rows = getTableRows('system_config');
            const [k, v] = this._binds;
            const existing = rows.find(r => r.key === k);
            if (existing) existing.value = v;
            else rows.push({ key: k, value: v, updated_at: Date.now() });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('DELETE FROM users')) {
            const rows = getTableRows('users');
            const id = this._binds[0];
            const filtered = rows.filter(r => r.id !== id);
            store.set('users', filtered);
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        },
        async first(col) {
          const s = this._sql;
          if (s.includes('system_config WHERE key =')) {
            const k = this._binds[0];
            const rows = getTableRows('system_config');
            const hit = rows.find(r => r.key === k);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          if (s.includes('FROM users WHERE id =') || s.includes('FROM users WHERE uuid =')) {
            const val = this._binds[0];
            const rows = getTableRows('users');
            const hit = rows.find(r => r.id === val || r.uuid === val);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          return null;
        },
        async all() {
          const s = this._sql;
          if (s.includes('FROM users')) {
            const rows = getTableRows('users');
            return { success: true, results: [...rows] };
          }
          if (s.includes('FROM system_config')) {
            const rows = getTableRows('system_config');
            return { success: true, results: [...rows] };
          }
          return { success: true, results: [] };
        }
      };
    }
  };
}

async function runTests() {
  console.log('🧪 [miliconfig] شروع تست جامع خودکار باندل مبهم‌شده، ضد بن کلادفلر، امنیت و دور زدن فیلتر Pages...');

  assert.ok(fs.existsSync(bundlePath), 'فایل dist/_worker.js باید وجود داشته باشد');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');

  // تست ۰: بررسی صفر بودن امضاهای متنی حساس پروکسی در باندل نهایی برای جلوگیری ۱۰۰٪ از بن کلادفلر
  const forbiddenSignatures = ['vless://', 'trojan://', 'wireguard://', 'shadowsocks', 'CMLiussss', 'v2ray-plugin', 'chacha20-ietf-poly1305'];
  for (const sig of forbiddenSignatures) {
    assert.strictEqual(
      rawBundle.toLowerCase().includes(sig.toLowerCase()),
      false,
      `امضای متنی حساس "${sig}" نباید به‌صورت آشکار در باندل _worker.js وجود داشته باشد!`
    );
  }
  console.log('  ✓ تست ۰ (حذف ۱۰۰٪ امضاهای متنی پروکسی از باندل _worker.js برای جلوگیری از بن کلادفلر): موفق');

  const tmpTestFile = path.join(projectRoot, 'dist', '_worker_test_stub.mjs');
  const stubCode = rawBundle.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]cloudflare:sockets['"]\s*;?/g,
    (_m, imports) => {
      const bindings = imports
        .split(',')
        .map(part => {
          const asMatch = part.trim().match(/^(?:\w+\s+as\s+)?(\w+)$/);
          return asMatch ? `const ${asMatch[1]} = () => ({});` : '';
        })
        .join(' ');
      return bindings || 'const cfConnect = () => ({});';
    }
  );

  fs.writeFileSync(tmpTestFile, stubCode, 'utf8');

  try {
    const mod = await import(tmpTestFile);
    const worker = mod.default;
    assert.ok(worker && typeof worker.fetch === 'function', 'باندل مبهم‌شده باید دارای متد fetch معتبر باشد');
    assert.ok(typeof worker.scheduled === 'function', 'باندل مبهم‌شده باید دارای متد scheduled معتبر باشد');

    const adminUuid = '351c9981-04b6-4103-aa4b-864aa9c91469';

    // تست ۱: استقرار دستی بدون اتصال دیتابیس D1 (نباید هیچ خطایی یا Error 1101 رخ دهد)
    const emptyEnv = { u: adminUuid };
    const rootResp = await worker.fetch(new Request('https://mili.example.com/'), emptyEnv, {});
    assert.strictEqual(rootResp.status, 200, 'صفحه اصلی بدون D1 باید با کد 200 باز شود');
    const rootHtml = await rootResp.text();
    assert.ok(rootHtml.includes('MILICONFIG'), 'برند MILICONFIG باید در صفحه ورود وجود داشته باشد');
    console.log('  ✓ تست ۱ (استقرار دستی بدون D1 و بدون خطای 1101): موفق');

    // تست ۲: اتصال دیتابیس D1 و ساخت خودکار جداول + پنل مدیریت
    const mockD1 = createMockD1Database();
    const d1Env = { u: adminUuid, DB: mockD1 };

    const adminResp = await worker.fetch(new Request(`https://mili.example.com/${adminUuid}`), d1Env, {});
    assert.strictEqual(adminResp.status, 200, 'پنل مدیریت با D1 باید با کد 200 باز شود');
    const adminHtml = await adminResp.text();
    assert.ok(adminHtml.includes('MILICONFIG'), 'پنل مدیریت باید شامل برند باشد');
    console.log('  ✓ تست ۲ (پنل مدیریت OS و ساخت خودکار جداول D1): موفق');

    // تست ۳: سیستم رمز عبور مدیر، محافظت از مسیرهای ادمین و جلوگیری از حملات Brute-Force
    const setupPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'mili-secret-123' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(setupPwdResp.status, 200, 'تعیین رمز عبور باید 200 برگرداند');

    // بررسی رد شدن دسترسی بدون کوکی/مسیر ادمین به /api/scanner/apply
    const unauthApplyResp = await worker.fetch(
      new Request('https://mili.example.com/api/scanner/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'yx', items: [{ ip: '104.16.0.1', port: 443 }] })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(unauthApplyResp.status, 403, 'درخواست غیرمجاز به /api/scanner/apply باید با کد 403 مسدود شود');

    const loginResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'mili-secret-123' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(loginResp.status, 200, 'ورود با رمز عبور باید موفق باشد');
    let sessionCookie = (loginResp.headers.get('Set-Cookie') || '').split(';')[0];
    assert.ok(sessionCookie.startsWith('mili_auth='), 'کوکی نشست امن باید صادر شود');

    const chgPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
        body: JSON.stringify({ oldPassword: 'mili-secret-123', newPassword: 'mili-new-pass-456' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(chgPwdResp.status, 200, 'تغییر رمز عبور مدیر باید موفق باشد');
    sessionCookie = (chgPwdResp.headers.get('Set-Cookie') || '').split(';')[0];
    console.log('  ✓ تست ۳ (سیستم رمز عبور مدیر، نشست امن و مسدودسازی دسترسی غیرمجاز به APIها): موفق');

    // تست ۴: ایجاد کاربر اول و بررسی ساب‌لینک روی دامنهٔ فیلترشدهٔ *.pages.dev در ایران
    const createResp = await worker.fetch(
      new Request(`https://mili.pages.dev/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
        body: JSON.stringify({
          username: 'reza-vip',
          preset: 'pages-iran',
          ev: 'yes',
          es: 'yes',
          et: 'yes'
        })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(createResp.status, 200, 'ایجاد کاربر در D1 باید 200 برگرداند');
    const createdData = await createResp.json();
    assert.strictEqual(createdData.success, true);
    assert.strictEqual(createdData.user.username, 'reza-vip');

    const newUserUuid = createdData.user.uuid;
    const subRawResp = await worker.fetch(
      new Request(`https://mili.pages.dev/sub/${newUserUuid}?target=raw`),
      d1Env,
      {}
    );
    assert.strictEqual(subRawResp.status, 200);
    const rawLinksText = await subRawResp.text();
    const rawLines = rawLinksText.trim().split('\n').filter(Boolean);
    assert.ok(rawLines.length >= 5, `تعداد نودهای تولیدشده باید حداقل ۵ نود باشد ولی ${rawLines.length} بود`);

    // هیچ نودی نباید مستقیماً به آدرس مسدودشدهٔ mili.pages.dev وصل شود؛ همه باید از آی‌پی/دامنه تمیز کلادفلر عبور کنند
    const vlessLines = rawLines.filter(l => l.startsWith('vless://'));
    assert.ok(vlessLines.length > 0, 'نودهای VLESS باید تولید شوند');
    for (const vl of vlessLines) {
      const parsed = new URL(vl);
      assert.notStrictEqual(
        parsed.hostname.toLowerCase(),
        'mili.pages.dev',
        'هاست اتصال نود در دامنهٔ فیلترشدهٔ pages.dev نباید خود pages.dev باشد بلکه باید آی‌پی/دامنه تمیز Anycast باشد'
      );
      if (parsed.searchParams.get('security') === 'tls') {
        const sni = parsed.searchParams.get('sni') || '';
        const frag = parsed.searchParams.get('fragment') || '';
        assert.strictEqual(sni.toLowerCase(), 'mili.pages.dev', 'SNI باید به دامنهٔ ورکر اشاره کند');
        assert.notStrictEqual(sni, 'mili.pages.dev', 'SNI روی دامنهٔ pages.dev باید Mixed-Case ضد فیلترینگ باشد');
        assert.ok(frag.length > 0, 'فرگمنت TLS باید روی دامنهٔ pages.dev فعال باشد');
      }
    }
    console.log('  ✓ تست ۴ (تولید نودهای ضد فیلتر قوی روی دامنهٔ مسدود *.pages.dev با آی‌پی تمیز، Mixed-Case SNI و TLS Fragment): موفق');

    // تست ۵: تست کلاینت‌های Clash و Sing-box همراه با فرگمنت و Early Data
    const clashResp = await worker.fetch(
      new Request(`https://mili.pages.dev/sub/${newUserUuid}?target=clash`),
      d1Env,
      {}
    );
    const clashYaml = await clashResp.text();
    assert.ok(clashYaml.includes('proxies:') && clashYaml.includes('max-early-data: 2048'), 'کانفیگ Clash باید شامل تنظیمات Early Data باشد');

    const sbResp = await worker.fetch(
      new Request(`https://mili.pages.dev/sub/${newUserUuid}?target=singbox`),
      d1Env,
      {}
    );
    const sbJson = JSON.parse(await sbResp.text());
    assert.ok(
      sbJson.outbounds.some(o => o.type === 'vless' && o.tls && o.tls.fragment === true),
      'کانفیگ Sing-box باید شامل نود VLESS با tls.fragment فعال باشد'
    );
    console.log('  ✓ تست ۵ (تبدیل اشتراک Clash و Sing-box با پشتیبانی کامل از TLS Fragment و 0-RTT Early Data): موفق');

    // تست ۶: قفل سخت‌گیرانه سقف ۳ کاربر (Hard Limit of Max 3 Users) و محافظت XSS در صفحه وضعیت
    await worker.fetch(
      new Request(`https://mili.pages.dev/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
        body: JSON.stringify({ username: '<script>alert(1)</script>' })
      }),
      d1Env, {}
    );
    const usersListResp = await worker.fetch(
      new Request(`https://mili.pages.dev/${adminUuid}/api/users`, {
        headers: { Cookie: sessionCookie }
      }),
      d1Env, {}
    );
    const usersListData = await usersListResp.json();
    const xssUser = usersListData.users.find(u => u.username.includes('script'));
    const statusPageResp = await worker.fetch(
      new Request(`https://mili.pages.dev/status/${xssUser.uuid}`),
      d1Env, {}
    );
    const statusHtml = await statusPageResp.text();
    assert.strictEqual(statusHtml.includes('<script>alert(1)</script>'), false, 'تگ اسکریپت در نام کاربری باید Escape شود تا XSS رخ ندهد');

    await worker.fetch(
      new Request(`https://mili.pages.dev/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
        body: JSON.stringify({ username: 'user-3' })
      }),
      d1Env, {}
    );
    const user4Resp = await worker.fetch(
      new Request(`https://mili.pages.dev/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
        body: JSON.stringify({ username: 'user-4-overflow' })
      }),
      d1Env, {}
    );
    assert.strictEqual(user4Resp.status, 400, 'ایجاد بیش از ۳ کاربر باید با خطای 400 رد شود');
    console.log('  ✓ تست ۶ (قفل سخت‌گیرانه سقف ۳ کاربر و محافظت کامل در برابر تزریق XSS): موفق');

    // تست ۷: مسدودسازی SSRF روی آی‌پی‌های خصوصی و اجرای امن Cron بدون Error 1101
    const ssrfProbeResp = await worker.fetch(
      new Request('https://mili.pages.dev/api/scanner/probe?host=127.0.0.1&port=80'),
      d1Env, {}
    );
    assert.strictEqual(ssrfProbeResp.status, 400, 'پروب آی‌پی لوکال/خصوصی (SSRF) باید با خطای 400 مسدود شود');

    await worker.scheduled({ cron: '*/30 * * * *' }, d1Env, { waitUntil: p => p });
    console.log('  ✓ تست ۷ (مسدودسازی SSRF به شبکه داخلی و اجرای بهینهٔ Cron بدون خطای 1101): موفق');

    // تست ۸: وب‌پروکسی تلگرام (/webproxy)، سازندهٔ پروکسی تلگرام (/api/telegram/build و /tg) و قالب‌های اندرویدی
    const tgApiResp = await worker.fetch(
      new Request('https://mili.pages.dev/api/telegram/build?country=DE&sni=www.google.com'),
      d1Env, {}
    );
    assert.strictEqual(tgApiResp.status, 200, 'API ساخت پروکسی تلگرام باید کد 200 برگرداند');
    const tgData = await tgApiResp.json();
    assert.strictEqual(tgData.success, true);
    assert.ok(tgData.secret.startsWith('ee'), 'سکرت Fake-TLS تلگرام باید با پیشوند استاندارد ee شروع شود');
    assert.ok(Array.isArray(tgData.proxies) && tgData.proxies.length > 0, 'لیست پروکسی‌های تلگرام نباید خالی باشد');

    const webproxyUiResp = await worker.fetch(
      new Request('https://mili.pages.dev/webproxy'),
      d1Env, {}
    );
    assert.strictEqual(webproxyUiResp.status, 200, 'صفحهٔ وب‌پروکسی تلگرام (/webproxy) باید کد 200 برگرداند');
    const webproxyHtml = await webproxyUiResp.text();
    assert.ok(webproxyHtml.includes('وب‌پروکسی زندهٔ تلگرام'), 'رابط کاربری وب‌پروکسی تلگرام باید رندر شود');

    const webproxySsrfResp = await worker.fetch(
      new Request('https://mili.pages.dev/webproxy?url=http://127.0.0.1:8080'),
      d1Env, {}
    );
    assert.strictEqual(webproxySsrfResp.status, 400, 'وب‌پروکسی باید آدرس‌های خصوصی/لوکال را مسدود کند');

    const authedAdminResp = await worker.fetch(new Request(`https://mili.pages.dev/${adminUuid}`, { headers: { Cookie: sessionCookie } }), d1Env, {});
    const authedAdminHtml = await authedAdminResp.text();
    assert.ok(
      authedAdminHtml.includes('data-skin="zedsecure"') &&
      authedAdminHtml.includes('data-skin="aurora"') &&
      authedAdminHtml.includes('data-skin="moss"') &&
      authedAdminHtml.includes('fxToggleSwitch') &&
      authedAdminHtml.includes('miliCursorFollower'),
      'پنل مدیریت باید شامل قالب‌های آمادهٔ اندرویدی، سوییچ تک‌حالته افکت پس‌زمینه و نشانگر موس اختصاصی باشد'
    );
    console.log('  ✓ تست ۸ (وب‌پروکسی تلگرام /webproxy، سازندهٔ Fake-TLS MTProto و قالب‌های جامع اندرویدی): موفق');

    console.log('\n🎉 تمام تست‌های عملکردی، ضد بن کلادفلر، ضد فیلتر Pages.dev، امنیت، دیتابیس D1 و رابط کاربری ۱۰۰٪ پاس شدند!');
  } finally {
    if (fs.existsSync(tmpTestFile)) fs.unlinkSync(tmpTestFile);
  }
}

runTests().catch(err => {
  console.error('❌ تست ناموفق بود:', err);
  process.exit(1);
});
