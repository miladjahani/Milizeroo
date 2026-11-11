# miliconfig v3.9.1 — مرکز کنترل زیرساخت پروکسی روی Cloudflare Workers & Pages + D1

![Version](https://img.shields.io/badge/version-v3.9.1--D1-b5ff4d?style=flat-square&labelColor=0b140b)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers%20%26%20Pages-84cc16?style=flat-square&labelColor=0b140b)
![Cloudflare D1](https://img.shields.io/badge/Database-Cloudflare%20D1%20Auto--Migrate-a3e635?style=flat-square&labelColor=0b140b)
![Obfuscation](https://img.shields.io/badge/Security-Advanced%20Obfuscation%20(Zero%201101)-b5ff4d?style=flat-square&labelColor=0b140b)

**زبان:** [فارسی](فارسی.md) | [English](#english-overview)

---

## تازه در `v3.9.1`

- **تم «نئون سبز تیره» و افکت‌های تازه:** پوستهٔ زمردی، «فضای بی‌کران» و «فضا-زمان درهم‌تنیده» اضافه شدند و رنگ افکت‌ها با قالب فعال هماهنگ است.
- **هدر مرتب‌تر:** دکمهٔ افکت زنده فقط در منوی کشویی است و در موبایل نام برند با دکمه‌های اکشن تداخل ندارد.
- **چند قالب ظاهری:** نئون سبز (پیش‌فرض)، زمردی تیره، سایبر آبی، کوانتوم بنفش، کهربایی، آتشین و حالت روشن؛ انتخاب هر کاربر در مرورگر خودش ذخیره می‌شود.
- **آی‌پی ثابت در کلاینت:** در تب «آدرس‌ها و منطقه» می‌توانید حالت «آی‌پی ثابت» را انتخاب کنید تا همهٔ نودها روی یک آدرس قفل شوند و با پینگ یا بروزرسانی ساب، آی‌پی/کشور خروجی عوض نشود (امکان تعیین آدرس دلخواه هم هست).
- **پنجرهٔ کاربر بازطراحی‌شده:** نوار خلاصهٔ زنده + تب منطقهٔ ساده‌شده (بدون کلیدهای اضافی).
- **تنظیمات کامل WARP و OpenVPN:** MTU، DNS، سطح مبهم‌سازی AmneziaWG و خانوادهٔ اندپوینت برای WARP؛ فیلتر UDP/TCP و پروفایل تنظیم خروجی برای OpenVPN.
- تست خودکار تأثیر تنظیمات روی نودها: `npm run test:settings`.

## ویژگی‌های کلیدی نسخه `miliconfig v3.2`

1. **معماری ماژولار چندفایلی (Multi-File Modular Architecture)**:
   - دیگر یک اسکریپت تک‌فایلی شلوغ نیست؛ کدها در دایرکتری `src/` به تفکیک `config/`، `db/`، `core/`، `subscription/`، `api/` و `ui/` سازماندهی شده‌اند.
   - همزمان فایل‌های باندل و مبهم‌سازی‌شده (`_worker.js`, `dist/_worker.js`, `public/_worker.js`, `少年你相信光吗`) به صورت خودکار تولید می‌شوند تا در هر روش استقراری بلافاصله کار کنند.

2. **دیتابیس Cloudflare D1 بدون هیچ خطایی در استقرار دستی یا اتوماتیک**:
   - **تشخیص خودکار بایندینگ D1**: فرقی نمی‌کند نام متغیر D1 را در کلودفلر `DB`، `D1`، `miliconfig` یا هر نام دیگری بگذارید؛ سیستم به صورت خودکار آن را شناسایی می‌کند.
   - **ساخت خودکار جداول (Auto-Migration)**: نیازی به زدن دستورات SQL یا `wrangler d1 execute` نیست! در اولین درخواست، جداول `users`، `system_config`، `preferred_nodes`، `audit_logs` و `traffic_hourly` به صورت خودکار ساخته می‌شوند.
   - **محافظ ضد خطای D1 و ضد خطای `Error 1101`**: حتی اگر قبل از اتصال D1 پروژه را به صورت دستی یا از گیت‌هاب مستقر کنید، برنامه کرش نمی‌کند و بدون خطای ۱۱۰۱ با حافظه پشتیبان کار می‌کند تا هر زمان که خواستید D1 را متصل نمایید.

3. **مدیریت پیشرفته کاربران + کپی تمام تنظیمات پیش‌فرض کد پایه**:
   - با کلیک روی دکمه **«+ کاربر جدید (پیشرفته)»** یا **«ساخت سریع کاربر»**، علاوه بر **نام کاربر (`username`)** و **تعداد نودها در ساب (`subNodeCount`)**، **تمام ۳۱ تنظیم پیش‌فرض کد پایه (`wk`, `ev`, `et`, `ex`, `ech`, `tp`, `customDNS`, `customECHDomain`, `alpn`, `d`, `p`, `yx`, `yxURL`, `s`, `homepage`, `scu`, `ena`, `epd`, `epi`, `egi`, `ae`, `rm`, `qj`, `dkby`, `yxby`, `ipv4`, `ipv6`, `ispMobile`, `ispUnicom`, `ispTelecom`, `jk`)** برای کاربر وجود دارد و قابل شخصی‌سازی است.

4. **برندینگ `miliconfig` و نام‌گذاری کانفیگ‌ها به فرمت `number+miliconfig`**:
   - تمامی کانفیگ‌های خروجی در همه کلاینت‌ها (v2rayNG, Streisand, Shadowrocket, Amnezia, Exclusive, Clash Meta/Mihomo, Sing-box/Hiddify, Surge, Loon, Quantumult X) دقیقاً با فرمت **`1+miliconfig`**، **`2+miliconfig`**، **`3+miliconfig`** تا **`N+miliconfig`** (بر اساس تعداد نودهای تعیین‌شده در تنظیمات کاربر) نام‌گذاری می‌شوند.

5. **صفحه وضعیت اختصاصی برای ارسال به هر کاربر (`/status/{user_id}`)**:
   - هر کاربر دارای یک لینک اختصاصی **پنجره وضعیت** است که می‌توانید مستقیماً برای مشتری ارسال کنید (شامل وضعیت حجم و انقضا، انتخاب محدوده نودها، سابلینک لوکیشن‌محور ۱۱ کشور، سابلینک اختصاصی ۱۶ کلاینت در ۵ خانواده، لینک دانلود کلاینت‌ها و کپی تکی کانفیگ‌ها).

---

## استخر آی‌پی اختصاصی و سابِ `/ips`

فهرست ثابت **۶۹۶ آی‌پی** در ۲۱ کشور داخل مخزن نگه داشته می‌شود (`src/config/ipPool.js`) و به سه شکل در دسترس است:

- **ساب اختصاصی:** `GET /ips` (متن ساده، هر خط یک آی‌پی) — پارامترهای `count`، `country` (مثل `DE` یا `DE,NL`)، `port` و `label=1`
- **فراداده:** `GET /ips.json` (تعداد، فهرست کشورها و همهٔ آی‌پی‌ها)
- **پنجرهٔ تنظیمات کاربر:** زیر «آدرس‌های دستی» دکمهٔ **تصادفی** با انتخاب تعداد و کشور، آی‌پی‌های تازه را با برچسب کشور در همان فیلد می‌نویسد.

اسکنر در حالت **ProxyIP** هم همین استخر را به‌عنوان منبع همیشه‌در‌دسترس استفاده می‌کند (فیلتر کشور با پارامتر `region`).

## WARP، MASQUE و Shadowsocks

- **WARP با چند سطح مبهم‌سازی:** ساب‌لینک و ZIP وارپ شامل ۴ پروفایل مجزاست — `OBF LITE` (AmneziaWG 1 + Junk)، `OBF BALANCED` (AWG2)، `OBF AGGRESSIVE` (AWG3) و `OBF STEALTH` — با MTU و DNS متفاوت تا در اپراتورهای مختلف یکی از آن‌ها وصل شود (`links-obf.txt` و `WARP-obf-*.conf`).
- **ساب/ZIP جدا برای WARP MASQUE:** `GET /warp/masque/<token>?format=zip|clash|json|links` فقط نودهای HTTP/3 CONNECT-IP را می‌دهد؛ بستهٔ اصلی وایرگارد دیگر هیچ نود MASQUE ندارد.
- **استخر زندهٔ زنجیرهٔ خانگی:** ساب `target=jk|vg` نودهای «CF前置» را به‌صورت زنده از استخر اختصاصی cfnew (فیدهای bestcf / Z-E-U-S / IPDB) و در صورت قطعی از استخر داخلی پنل می‌سازد؛ کش ۱۰ دقیقه‌ای و سقف ۶ نود اضافه.
- **Shadowsocks با رمزنگاری واقعی:** متد پیش‌فرض `aes-128-gcm` (SIP004، HKDF-SHA1) است و هسته قاب‌های AEAD را در هر دو جهت رمز/رمزگشایی می‌کند؛ روش متنی `none` نیز برای سازگاری باقی مانده است. لینک‌ها با پلاگین `v2ray-plugin` روی TLS ساخته می‌شوند و در v2rayNG/NekoBox/sing-box/Clash Meta/Shadowrocket پینگ می‌دهند.

## راهنمای استقرار مستقیم از گیت‌هاب (Cloudflare Workers & Pages)

### روش اول: اتصال مستقیم گیت‌هاب به Cloudflare Workers
1. این مخزن را در گیت‌هاب خود آپلود (Push) کنید.
2. در پنل Cloudflare وارد **Workers & Pages** شوید -> **Create** -> **Workers** -> **Import a repository** را بزنید و مخزن گیت‌هاب را متصل کنید.
3. پروژه به لطف فایل استاندارد `wrangler.toml` (`main = "src/index.js"`) بلافاصله بدون هیچ خطایی مستقر می‌شود!
4. برای اتصال دیتابیس D1:
   - در پنل کلودفلر از منوی **Storage & Databases -> D1 SQL Database** یک دیتابیس بسازید (مثلاً `miliconfig-db`).
   - وارد تنظیمات Worker خود شوید -> **Settings -> Bindings -> Add -> D1 database** -> متغیر را `DB` بنامید و دیتابیس را انتخاب و Deploy کنید. (جداول به صورت خودکار ساخته می‌شوند!).

### روش دوم: اتصال مستقیم گیت‌هاب به Cloudflare Pages
1. در پنل Cloudflare وارد **Workers & Pages -> Create -> Pages -> Connect to Git** شوید.
2. مخزن گیت‌هاب خود را انتخاب کنید:
   - **Build command**: `npm run build` (یا خالی بگذارید)
   - **Build output directory**: `dist` (اگر Build command را خالی گذاشتید می‌توانید `/` یا `dist` یا `public` قرار دهید)
3. پس از استقرار، از بخش **Settings -> Functions -> D1 database bindings** دیتابیس D1 خود را با نام `DB` متصل کنید.

---

## بروزرسانی نسخه‌های نصب‌شده (از v3.2.0 به بعد)

**هیچ‌جا از شما نام حساب، Account ID یا توکن کلادفلر خواسته نمی‌شود.** سه مسیر وجود دارد، به ترتیب سادگی:

1. **اتصال گیت‌هاب (خودکارترین راه):** اگر Worker/Pages به همین مخزن وصل باشد، هر push به `main` خودکار مستقر می‌شود و کاری لازم نیست.
2. **نصب خودکار از داخل پنل:** فقط اگر خودِ ورکر متغیر محرمانهٔ `CF_API_TOKEN` را داشته باشد (که در داشبورد کلادفلر تعریف می‌شود، نه در پنل)، دکمهٔ «نصب خودکار» نسخهٔ تازه را مستقر می‌کند:
   - کلید را با `GET /user/tokens/verify` تأیید می‌کند،
   - `Account ID` را از `GET /accounts` خودکار می‌گیرد،
   - نام اسکریپت را از دامنهٔ `*.workers.dev` یا `WORKER_NAME` تشخیص می‌دهد،
   - باندل تازه را از چند آینه (GitHub raw، jsDelivr، githack) می‌گیرد و **بالاترین نسخه** را انتخاب می‌کند،
   - **بایندینگ‌های فعلی (D1/KV/متن ساده) را حفظ می‌کند** و با نام ماژول تصادفی آپلود می‌کند.

   با روشن شدن `autoUpdate`، کرون هم هر ۱۰ دقیقه نسخه را بررسی و در صورت وجود نسخهٔ تازه مستقر می‌کند.
3. **بدون کلید:** کارت «نسخه و بروزرسانی» دکمهٔ **«دانلود فایل نسخهٔ تازه»** و **«کپی دستور استقرار»** دارد؛ با همان فایل/دستور، نسخه به‌روز می‌شود. نسخه‌های قدیمی‌تر از v3.2.0 هم فقط با یک‌بار استقرار مجدد (Deploy از گیت‌هاب یا paste کردن `_worker.js`) به‌روز می‌شوند. داده‌های مشترک (لیست آی‌پی/دامنه) از منابع آنلاین حتی در نسخه‌های قدیمی تازه می‌مانند.

فهرست نسخه در `version.json` مخزن نگه‌داری می‌شود؛ برای فورک‌های خصوصی می‌توانید آدرس آن را با `UPDATE_MANIFEST_URL` و `UPDATE_BUNDLE_URL` جایگزین کنید.

---

## ساختار ماژولار پروژه

```text
miliconfig/
├── src/
│   ├── index.js                  # روتر اصلی Cloudflare Worker & Pages + محافظ ضد Error 1101
│   ├── config/
│   │   ├── defaults.js           # همهٔ تنظیم‌های پیش‌فرض هسته + ثابت‌های miliconfig
│   │   └── presets.js            # ۵ پریست ساخت سریع کاربر (ایران پرسرعت، مصرف سنگین، بین‌المللی و...)
│   ├── db/
│   │   └── d1.js                 # لایه دیتابیس Cloudflare D1 با Auto-Migration و تشخیص هوشمند بایندینگ
│   ├── core/
│   │   ├── runtime.js            # هسته پروکسی VLESS + Trojan + xhttp + SOCKS5/HTTP + احراز هویت چندکاربره D1
│   │   └── utils.js              # نام‌گذاری گویای نودها (کشور/پروتکل/IPv4-IPv6)، رمزنگاری MD5/SHA224 خالص و ابزارها
│   ├── subscription/
│   │   ├── generator.js          # تولیدکننده ساب‌لینک چندکاربره با اعمال subNodeCount
│   │   └── converters.js         # مبدل‌های داخلی Clash YAML، Sing-box JSON، Surge، Loon، QuanX و زنجیره خانگی
│   ├── api/
│   │   └── handlers.js           # اندپوینت‌های REST API مدیریت کاربران، تنظیمات و نودها
│   └── ui/
│       ├── icons.js              # لوگوهای نئونی سپر و ابر miliconfig
│       ├── loginHtml.js          # درگاه ورود
│       ├── adminHtml.js          # پنل مدیریت کامل مطابق تصاویر ارسالی
│       └── statusHtml.js         # صفحه وضعیت اختصاصی کاربر برای ارسال به مشتری
├── scripts/
│   ├── build.js                  # باندلر ماژولار و سازگارکننده خودکار Workers / Pages
│   ├── obfuscate.js              # مبهم‌ساز پیشرفته ایمن برای کلودفلر (بدون خطای 1101)
│   └── test-worker.js            # تست خودکار کامل
├── migrations/
│   └── 0001_init_miliconfig.sql  # فایل مایگریشن استاندارد D1
├── schema.sql                    # اسکیمای SQL دیتابیس D1
├── wrangler.toml                 # تنظیمات استقرار مستقیم Cloudflare
└── package.json
```

---

## English Overview

**miliconfig v3.2** is a modular, multi-user Cloudflare Workers & Pages proxy control center powered by **Cloudflare D1** and built on a complete multi-protocol engine (VLESS, Trojan, xhttp, ECH, SOCKS5/HTTP outbound proxy, Residential Chain, and built-in Clash/Sing-box/Surge/QuanX/Loon converters).
- **Self-describing Node Names**: every node is labelled with country flag + CC, protocol (VLESS/Trojan/SS/xHTTP/WARP), address family (IPv4 / IPv6 / Domain) and a `⇄ Proxy` marker for proxy-chained nodes.
- **Balanced Combinations**: all protocols × address families appear in equal numbers, plus dedicated `?set=domain` and `?set=ipv6` (MCI-optimised) subscriptions.
- **Per-User Node Count & Full Defaults**: Every user created via D1 inherits all default settings of the base engine plus custom `username` and `subNodeCount`.
- **Zero-Error D1 & 1101 Protection**: Automatic D1 binding detection, runtime table auto-migration, and Worker-safe AST obfuscation.
