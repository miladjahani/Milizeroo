// ============================================================================
// miliconfig v3.2 - درگاه ورود با استتار nginx
// صفحه اول دقیقاً «Welcome to nginx!» است؛ پس از ۳ ثانیه صفحه تار می‌شود و
// پنجره ورود آرام روی آن ظاهر می‌شود. حالت روز/شب و زبان فارسی/انگلیسی هم دارد.
// ============================================================================

import { BRAND_NAME, BRAND_UPPER, VERSION } from '../config/defaults.js';
import { FAVICON_DATA_URI, stripEmoji } from './icons.js';
import { PWA_CLIENT_JS, PWA_HEAD_TAGS } from './pwa.js';

const I18N = {
  fa: {
    dir: 'rtl',
    lang: 'فارسی',
    switchLang: 'English',
    loginTitle: 'ورود به مرکز مدیریت',
    setupTitle: 'راه‌اندازی اولیه',
    loginSub: 'درگاه امن مدیر به مرکز کنترل',
    setupSub: 'تعیین رمز عبور مدیر برای اولین اجرا',
    password: 'رمز عبور پنل مدیریت',
    passwordPh: 'رمز عبور خود را وارد کنید...',
    newPassword: 'رمز عبور جدید (حداقل ۴ کاراکتر)',
    confirmPassword: 'تکرار رمز عبور',
    loginBtn: 'ورود به مرکز مدیریت',
    setupBtn: 'ذخیره رمز و راه‌اندازی پنل',
    working: 'در حال بررسی...',
    recovery: 'فراموشی رمز؟ بازیابی با UUID',
    setupDone: 'پنل با موفقیت راه‌اندازی شد',
    setupDoneHint: 'شناسه رندوم مدیریت شما (برای بازیابی رمز نگه دارید) — نیازی به وارد کردن آن نیست:',
    copyId: 'کپی شناسه',
    goPanel: 'ورود به صفحه مدیریت',
    idCopied: 'کپی شد',
    recoveryTitle: 'بازیابی رمز با UUID مدیر',
    recoveryHint: 'مسیر مدیریت (UUID) را وارد کنید؛ مالکیت این مسیر یعنی دسترسی مدیر.',
    uuidLabel: 'UUID / مسیر مدیریت',
    uuidPh: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    recoverBtn: 'بازیابی رمز',
    back: 'بازگشت به ورود',
    themeLight: 'حالت روز',
    themeDark: 'حالت شب',
    errWrong: 'رمز عبور وارد شده اشتباه است.',
    errMismatch: 'رمزهای عبور یکسان نیستند.',
    errShort: 'رمز عبور باید حداقل ۴ کاراکتر باشد.',
    errNetwork: 'خطای شبکه در برقراری ارتباط',
    errUuid: 'UUID/مسیر مدیریت نامعتبر است.',
    errFill: 'همه فیلدها را کامل کنید.'
  },
  en: {
    dir: 'ltr',
    lang: 'English',
    switchLang: 'فارسی',
    loginTitle: 'Admin Login',
    setupTitle: 'First Run Setup',
    loginSub: 'Secure gateway to the control center',
    setupSub: 'Set the admin password for the first run',
    password: 'Admin panel password',
    passwordPh: 'Enter your password...',
    newPassword: 'New password (min 4 characters)',
    confirmPassword: 'Confirm password',
    loginBtn: 'Sign in',
    setupBtn: 'Save password & launch',
    working: 'Checking...',
    recovery: 'Forgot password? Recover with UUID',
    setupDone: 'Panel is ready',
    setupDoneHint: 'Your random admin ID (keep it for password recovery) — you never need to type it:',
    copyId: 'Copy ID',
    goPanel: 'Open admin panel',
    idCopied: 'Copied',
    recoveryTitle: 'Recover password with admin UUID',
    recoveryHint: 'Enter the admin path (UUID). Owning this path proves admin access.',
    uuidLabel: 'UUID / admin path',
    uuidPh: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    recoverBtn: 'Recover password',
    back: 'Back to login',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    errWrong: 'Incorrect password.',
    errMismatch: 'Passwords do not match.',
    errShort: 'Password must be at least 4 characters.',
    errNetwork: 'Network error while connecting',
    errUuid: 'Invalid admin UUID/path.',
    errFill: 'Please fill all fields.'
  }
};

export function renderLoginGatewayHtml(options = {}) {
  const initialized = options.initialized !== false;
  const customPath = options.customPath || '';
  const recover = options.recover === true;
  const adminHint = String(customPath || '').trim();

  return stripEmoji(`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to nginx!</title>
<link rel="icon" href="${FAVICON_DATA_URI}">
${PWA_HEAD_TAGS}
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; min-height: 100%; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
    color: #333333;
    min-height: 100vh;
    transition: background 0.6s ease, color 0.6s ease, filter 0.9s ease;
    overflow-x: hidden;
  }
  .nginx-page {
    max-width: 680px;
    margin: 0 auto;
    padding: 70px 24px 40px;
    text-align: center;
    transition: filter 0.9s ease, opacity 0.9s ease, transform 0.9s ease;
  }
  .nginx-logo { width: 96px; height: 96px; margin: 0 auto 26px; display: block; }
  .nginx-page h1 {
    font-size: 38px;
    font-weight: 700;
    color: #333;
    margin: 0 0 18px;
    letter-spacing: -0.5px;
  }
  .nginx-page p {
    font-size: 18px;
    line-height: 1.7;
    color: #555;
    margin: 12px auto;
    max-width: 540px;
  }
  .nginx-page .thanks { color: #777; font-size: 16px; margin-top: 26px; }
  .nginx-foot {
    margin-top: 46px;
    padding-top: 18px;
    border-top: 1px solid #e6e6e6;
    font-size: 13px;
    color: #999;
  }
  body.is-veiled { background: #06090b; }
  body.is-veiled .nginx-page {
    filter: blur(7px) brightness(0.62);
    opacity: 0.42;
    transform: scale(1.02);
    pointer-events: none;
    user-select: none;
  }

  /* ---------- login overlay ---------- */
  .gate {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.9s ease, visibility 0s linear 0.9s;
  }
  .gate.is-visible {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.9s ease, visibility 0s;
  }
  .gate::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 18%, rgba(181, 255, 77, 0.12), transparent 46%),
      radial-gradient(circle at 82% 82%, rgba(0, 240, 255, 0.1), transparent 46%),
      rgba(4, 7, 9, 0.86);
    backdrop-filter: blur(14px);
  }
  .card {
    position: relative;
    width: min(430px, 100%);
    border-radius: 20px;
    border: 1px solid rgba(181, 255, 77, 0.26);
    background: rgba(10, 16, 13, 0.94);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    color: #e9f3e2;
    transform: translateY(18px) scale(0.97);
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    direction: rtl;
    text-align: right;
  }
  .gate.is-visible .card { transform: none; }
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 15px;
    border-bottom: 1px solid rgba(181, 255, 77, 0.16);
    background: linear-gradient(90deg, rgba(181, 255, 77, 0.08), transparent 60%);
  }
  .dots { display: inline-flex; gap: 6px; }
  .dots i { width: 9px; height: 9px; border-radius: 50%; display: block; }
  .dots i:nth-child(1) { background: #ff6b6b; }
  .dots i:nth-child(2) { background: #ffce5c; }
  .dots i:nth-child(3) { background: #b5ff4d; }
  .head-tools { display: inline-flex; gap: 6px; align-items: center; }
  .mini-btn {
    border: 1px solid rgba(181, 255, 77, 0.24);
    background: rgba(255, 255, 255, 0.03);
    color: #cfe3bf;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.72rem;
    cursor: pointer;
    font-family: inherit;
  }
  .mini-btn:hover { color: #b5ff4d; border-color: rgba(181, 255, 77, 0.5); }
  .card-body { padding: 26px 24px 24px; }
  .brand-line { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .brand-mark {
    width: 44px; height: 44px; border-radius: 13px;
    border: 1px solid rgba(181, 255, 77, 0.45);
    background: rgba(181, 255, 77, 0.1);
    display: flex; align-items: center; justify-content: center;
    color: #b5ff4d; flex: none;
  }
  .brand-mark svg { width: 26px; height: 26px; }
  .brand-name { font-size: 1.02rem; font-weight: 800; letter-spacing: 0.3px; color: #f2fbe9; }
  .brand-sub { font-size: 0.74rem; color: #8fa485; margin-top: 3px; }
  .field { margin-bottom: 14px; }
  .field label { display: block; font-size: 0.78rem; color: #9db193; margin-bottom: 7px; font-weight: 600; }
  .field input {
    width: 100%;
    padding: 11px 13px;
    border-radius: 11px;
    border: 1px solid rgba(181, 255, 77, 0.2);
    background: rgba(4, 8, 6, 0.85);
    color: #eaf6e0;
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    transition: 0.18s;
  }
  .field input:focus { border-color: #b5ff4d; box-shadow: 0 0 0 3px rgba(181, 255, 77, 0.12); }
  .field input[dir="ltr"] { text-align: left; }
  .cta {
    width: 100%;
    margin-top: 6px;
    padding: 12px 16px;
    border: 0;
    border-radius: 12px;
    background: linear-gradient(180deg, #c7ff72, #9adf39);
    color: #0c1407;
    font-weight: 800;
    font-size: 0.92rem;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 0 10px 26px rgba(181, 255, 77, 0.22);
    transition: 0.18s;
  }
  .cta:hover { filter: brightness(1.05); transform: translateY(-1px); }
  .cta:disabled { opacity: 0.6; cursor: not-allowed; }
  .ghost-link {
    display: inline-block;
    margin-top: 14px;
    color: #79d9c9;
    font-size: 0.76rem;
    cursor: pointer;
    text-decoration: none;
    background: none;
    border: 0;
    font-family: inherit;
    padding: 0;
  }
  .ghost-link:hover { text-decoration: underline; }
  .err {
    display: none;
    margin: 0 0 12px;
    padding: 9px 11px;
    border-radius: 10px;
    border: 1px solid rgba(255, 98, 98, 0.5);
    background: rgba(255, 98, 98, 0.1);
    color: #ffb3b3;
    font-size: 0.78rem;
    text-align: center;
  }
  .hint {
    margin-top: 14px;
    font-size: 0.72rem;
    line-height: 1.8;
    color: #7d9074;
    border-top: 1px dashed rgba(181, 255, 77, 0.14);
    padding-top: 12px;
  }
  .hidden { display: none !important; }
  .mono-id {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 0.8rem;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px dashed rgba(181, 255, 77, 0.4);
    background: rgba(181, 255, 77, 0.07);
    color: #d8ffb0;
    word-break: break-all;
  }
  body.light-mode .mono-id { color: #0f5132; border-color: rgba(5, 150, 105, 0.45); background: rgba(5, 150, 105, 0.07); }
  body.light-mode { background: #eef2f7; color: #1f2937; }
  body.light-mode .gate::before {
    background:
      radial-gradient(circle at 18% 18%, rgba(5, 150, 105, 0.12), transparent 46%),
      radial-gradient(circle at 82% 82%, rgba(2, 132, 199, 0.1), transparent 46%),
      rgba(241, 245, 249, 0.9);
  }
  body.light-mode .card {
    background: rgba(255, 255, 255, 0.96);
    border-color: rgba(5, 150, 105, 0.3);
    color: #0f172a;
  }
  body.light-mode .brand-name { color: #0f172a; }
  body.light-mode .field input { background: #f8fafc; color: #0f172a; border-color: rgba(5, 150, 105, 0.3); }
  body.light-mode .mini-btn { color: #475569; border-color: rgba(5, 150, 105, 0.3); }
  body.light-mode .hint { color: #64748b; }
  .card[dir="ltr"] { direction: ltr; text-align: left; }
</style>
</head>
<body>
  <div class="nginx-page" id="nginxPage">
    <svg class="nginx-logo" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="128" height="128" rx="18" fill="#009639"/>
      <path d="M34 94V34l60 60V34" fill="none" stroke="#fff" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
    <p>For online documentation and support please refer to <span>nginx.org</span>.<br>Commercial support is available at <span>nginx.com</span>.</p>
    <p class="thanks">Thank you for using nginx.</p>
    <div class="nginx-foot">Server at ${BRAND_UPPER}.${VERSION.replace(/\./g, '-').toLowerCase()} Port 80</div>
  </div>

  <div class="gate" id="gate">
    <div class="card" id="card" dir="rtl">
      <div class="card-head">
        <span class="dots"><i></i><i></i><i></i></span>
        <div class="head-tools">
          <button class="mini-btn" type="button" id="langBtn">English</button>
          <button class="mini-btn" type="button" id="themeBtn">حالت روز</button>
        </div>
      </div>
      <div class="card-body">
        <div class="brand-line">
          <div class="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 3v6c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V5z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <div class="brand-name">${BRAND_NAME} OS</div>
            <div class="brand-sub" id="brandSub"></div>
          </div>
        </div>

        <div class="err" id="errBox"></div>

        <form id="loginForm" class="${initialized && !recover ? '' : 'hidden'}" onsubmit="handleLogin(event)">
          <div class="field">
            <label id="lblPassword"></label>
            <input type="password" id="pwdInput" dir="ltr" autocomplete="current-password" required>
          </div>
          <button type="submit" class="cta" id="loginBtn"></button>
          <button type="button" class="ghost-link" id="recoverLink" onclick="showRecover()"></button>
        </form>

        <form id="setupForm" class="${initialized ? 'hidden' : ''}" onsubmit="handleSetup(event)">
          <div class="field">
            <label id="lblNewPassword"></label>
            <input type="password" id="newPwd" dir="ltr" autocomplete="new-password" required>
          </div>
          <div class="field">
            <label id="lblConfirmPassword"></label>
            <input type="password" id="confirmPwd" dir="ltr" autocomplete="new-password" required>
          </div>
          <button type="submit" class="cta" id="setupBtn"></button>
        </form>

        <div id="doneCard" class="hidden">
          <div class="field">
            <label id="lblDone"></label>
            <div class="mono-id" id="doneId" dir="ltr"></div>
          </div>
          <button type="button" class="cta" id="goPanelBtn"></button>
          <button type="button" class="ghost-link" id="copyIdBtn"></button>
        </div>

        <form id="recoverForm" class="hidden" onsubmit="handleRecover(event)">
          <div class="field">
            <label id="lblUuid"></label>
            <input type="text" id="recoverUuid" dir="ltr" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
          </div>
          <div class="field">
            <label id="lblRecoverPassword"></label>
            <input type="password" id="recoverPwd" dir="ltr" autocomplete="new-password">
          </div>
          <button type="submit" class="cta" id="recoverBtn"></button>
          <button type="button" class="ghost-link" id="backLink" onclick="showLogin()"></button>
        </form>

        <div class="hint" id="hintBox"></div>
      </div>
    </div>
  </div>

<script>
  var I18N = ${JSON.stringify(I18N).replace(/</g, '\\u003c')};
  var INITIALIZED = ${initialized ? 'true' : 'false'};
  var ADMIN_HINT = ${JSON.stringify(adminHint)};
  var state = { lang: localStorage.getItem('mili_lang') === 'en' ? 'en' : 'fa', theme: localStorage.getItem('mili_theme') === 'light' ? 'light' : 'dark' };

  function t(key) { return (I18N[state.lang] || I18N.fa)[key] || key; }

  function applyLang() {
    var dict = I18N[state.lang] || I18N.fa;
    var html = document.documentElement;
    html.lang = state.lang;
    html.dir = dict.dir;
    document.getElementById('card').dir = dict.dir;
    document.getElementById('langBtn').textContent = dict.switchLang;
    document.getElementById('themeBtn').textContent = state.theme === 'light' ? dict.themeDark : dict.themeLight;
    document.getElementById('brandSub').textContent = INITIALIZED ? dict.loginSub : dict.setupSub;
    document.getElementById('lblPassword').textContent = dict.password;
    document.getElementById('pwdInput').placeholder = dict.passwordPh;
    document.getElementById('loginBtn').textContent = dict.loginBtn;
    document.getElementById('recoverLink').textContent = dict.recovery;
    document.getElementById('lblNewPassword').textContent = dict.newPassword;
    document.getElementById('lblConfirmPassword').textContent = dict.confirmPassword;
    document.getElementById('setupBtn').textContent = dict.setupBtn;
    document.getElementById('lblUuid').textContent = dict.uuidLabel;
    document.getElementById('lblRecoverPassword').textContent = dict.newPassword;
    document.getElementById('recoverPwd').placeholder = dict.uuidPh;
    document.getElementById('recoverUuid').placeholder = dict.uuidPh;
    document.getElementById('recoverBtn').textContent = dict.recoverBtn;
    document.getElementById('backLink').textContent = dict.back;
    document.getElementById('lblDone').textContent = dict.setupDone + ' — ' + dict.setupDoneHint;
    document.getElementById('goPanelBtn').textContent = dict.goPanel;
    document.getElementById('copyIdBtn').textContent = dict.copyId;
    document.getElementById('hintBox').textContent = INITIALIZED
      ? (state.lang === 'en' ? 'Session is valid for 30 days. Password recovery is available with the admin UUID.' : 'نشست شما ۳۰ روز معتبر است. بازیابی رمز فقط با UUID مدیر امکان‌پذیر است.')
      : (state.lang === 'en' ? 'First run: set an admin password to start the control center.' : 'اولین اجرا: برای شروع مرکز کنترل یک رمز عبور مدیر تعیین کنید.');
    document.title = document.getElementById('gate').classList.contains('is-visible') ? (BRAND_TITLE) : 'Welcome to nginx!';
    if (document.getElementById('loginForm').classList.contains('hidden') && document.getElementById('setupForm').classList.contains('hidden')) {
      document.getElementById('recoverBtn').textContent = dict.recoverBtn;
    }
  }
  var BRAND_TITLE = '${BRAND_UPPER} ${VERSION}';

  function applyTheme() {
    document.body.classList.toggle('light-mode', state.theme === 'light');
  }

  document.getElementById('langBtn').addEventListener('click', function() {
    state.lang = state.lang === 'fa' ? 'en' : 'fa';
    localStorage.setItem('mili_lang', state.lang);
    applyLang();
  });
  document.getElementById('themeBtn').addEventListener('click', function() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mili_theme', state.theme);
    applyTheme();
    applyLang();
  });

  function showErr(msg) {
    var box = document.getElementById('errBox');
    box.textContent = msg;
    box.style.display = 'block';
  }
  function clearErr() {
    var box = document.getElementById('errBox');
    box.style.display = 'none';
  }

  function showRecover() {
    clearErr();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('setupForm').classList.add('hidden');
    document.getElementById('recoverForm').classList.remove('hidden');
  }
  function showLogin() {
    clearErr();
    document.getElementById('recoverForm').classList.add('hidden');
    if (INITIALIZED) document.getElementById('loginForm').classList.remove('hidden');
    else document.getElementById('setupForm').classList.remove('hidden');
  }

  async function postJson(url, payload) {
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    var data = await res.json().catch(function() { return { success: false }; });
    return { ok: res.ok, data: data };
  }

  async function handleLogin(event) {
    event.preventDefault();
    clearErr();
    var pwd = document.getElementById('pwdInput').value.trim();
    if (!pwd) { showErr(t('errFill')); return; }
    var btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = t('working');
    try {
      var result = await postJson('/api/admin/login', { password: pwd });
      if (result.data && result.data.success) {
        window.location.href = result.data.redirect || '/';
        return;
      }
      showErr((result.data && result.data.message) || t('errWrong'));
    } catch (err) {
      showErr(t('errNetwork'));
    }
    btn.disabled = false;
    btn.textContent = t('loginBtn');
  }

  async function handleSetup(event) {
    event.preventDefault();
    clearErr();
    var p1 = document.getElementById('newPwd').value.trim();
    var p2 = document.getElementById('confirmPwd').value.trim();
    if (p1.length < 4) { showErr(t('errShort')); return; }
    if (p1 !== p2) { showErr(t('errMismatch')); return; }
    var btn = document.getElementById('setupBtn');
    btn.disabled = true;
    btn.textContent = t('working');
    try {
      var result = await postJson('/api/admin/setup-password', { password: p1 });
      if (result.data && result.data.success) {
        // شناسه رندوم همین لحظه ساخته شده؛ آن را در همان صفحه اول نشان می‌دهیم
        INITIALIZED = true;
        document.getElementById('setupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('recoverForm').classList.add('hidden');
        document.getElementById('doneId').textContent = result.data.adminId || '';
        var done = document.getElementById('doneCard');
        done.classList.remove('hidden');
        done.setAttribute('data-redirect', result.data.redirect || '/');
        btn.disabled = false;
        btn.textContent = t('setupBtn');
        return;
      }
      showErr((result.data && result.data.message) || t('errNetwork'));
    } catch (err) {
      showErr(t('errNetwork'));
    }
    btn.disabled = false;
    btn.textContent = t('setupBtn');
  }

  document.getElementById('goPanelBtn').addEventListener('click', function() {
    var done = document.getElementById('doneCard');
    window.location.href = done.getAttribute('data-redirect') || '/';
  });
  document.getElementById('copyIdBtn').addEventListener('click', function() {
    var text = document.getElementById('doneId').textContent || '';
    if (!text) return;
    var btn = this;
    var done = function() { btn.textContent = t('idCopied'); setTimeout(function() { btn.textContent = t('copyId'); }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  });

  async function handleRecover(event) {
    event.preventDefault();
    clearErr();
    var uuid = document.getElementById('recoverUuid').value.trim();
    var pwd = document.getElementById('recoverPwd').value.trim();
    if (!uuid || pwd.length < 4) { showErr(t('errFill')); return; }
    var btn = document.getElementById('recoverBtn');
    btn.disabled = true;
    btn.textContent = t('working');
    try {
      var result = await postJson('/api/admin/reset-password', { uuid: uuid, password: pwd });
      if (result.data && result.data.success) {
        window.location.href = result.data.redirect || '/';
        return;
      }
      showErr((result.data && result.data.message) || t('errUuid'));
    } catch (err) {
      showErr(t('errNetwork'));
    }
    btn.disabled = false;
    btn.textContent = t('recoverBtn');
  }

  applyTheme();
  applyLang();

  // نصب اپ (PWA) از همین صفحهٔ ورود هم ممکن است
  ${PWA_CLIENT_JS}

  // استتار nginx → تاری صفحه → نمایش آرام پنجره ورود پس از ۳ ثانیه
  setTimeout(function() {
    document.body.classList.add('is-veiled');
  }, 2300);
  setTimeout(function() {
    document.getElementById('gate').classList.add('is-visible');
    document.title = BRAND_TITLE;
  }, 3000);

  ${recover ? "setTimeout(function(){ showRecover(); }, 3100);" : ''}
</script>
</body>
</html>`);
}
