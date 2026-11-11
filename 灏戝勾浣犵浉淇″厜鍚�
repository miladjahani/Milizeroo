import { connect, connect as cfConnect } from 'cloudflare:sockets';

// --- MODULE: src/config/sources.js ---
// ============================================================================
// miliconfig v3.1 - استخر منابع زنده اسکنر (پروکسی‌های کشوری، لیست‌های عمومی و رنج‌های IP)
// همه لیست‌ها هر بار به‌صورت زنده خوانده می‌شوند (بدون کش سمت سرور) و اسکنر
// از هر استخر یک برش چرخشی برمی‌دارد تا سقف subrequest کلادفلر رعایت شود.
// ============================================================================

const ZEUS_VIP = code => `https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/${code}.txt`;
const TRIO = (code, kind) => `https://raw.githubusercontent.com/trio666/proxy-checker/main/country/${code}/${kind}.txt`;

// منابع اختصاصی هر کشور (Z-E-U-S vip + trio666 کشوری)
const COUNTRY_EXTRA_PROXY_SOURCES = {
  AE: [ZEUS_VIP('AE')],
  BG: [ZEUS_VIP('BG')],
  CA: [ZEUS_VIP('CA')],
  DE: [ZEUS_VIP('DE'), TRIO('DE', 'socks5'), TRIO('DE', 'http')],
  GB: [ZEUS_VIP('GB')],
  IT: [ZEUS_VIP('IT')],
  KZ: [ZEUS_VIP('KZ')],
  LV: [ZEUS_VIP('LV')],
  NL: [ZEUS_VIP('NL'), TRIO('NL', 'socks5'), TRIO('NL', 'http')],
  NO: [ZEUS_VIP('NO')],
  SE: [ZEUS_VIP('SE')],
  TH: [ZEUS_VIP('TH'), TRIO('TH', 'socks5'), TRIO('TH', 'http')],
  TR: [ZEUS_VIP('TR')],
  US: [ZEUS_VIP('US'), TRIO('US', 'socks5'), TRIO('US', 'http')],
  UZ: [ZEUS_VIP('UZ')],
  FR: ['https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/FR.txt'],
  FI: [TRIO('FI', 'socks5'), TRIO('FI', 'http')],
  SG: [TRIO('SG', 'socks5'), TRIO('SG', 'http')],
  RU: [TRIO('RU', 'socks5'), TRIO('RU', 'http'), 'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/RU.txt'],
  CN: [TRIO('CN', 'socks5'), TRIO('CN', 'http')],
  CH: [TRIO('CH', 'socks5'), TRIO('CH', 'http')],
  KR: [TRIO('KR', 'socks5'), TRIO('KR', 'http')],
  UA: [TRIO('UA', 'socks5'), TRIO('UA', 'http')],
  VN: [TRIO('VN', 'socks5'), TRIO('VN', 'http')],
  BR: [TRIO('BR', 'socks5'), TRIO('BR', 'http')],
  IN: [TRIO('IN', 'socks5'), TRIO('IN', 'http')],
  RS: [TRIO('RS', 'socks5'), TRIO('RS', 'http')],
  SK: [TRIO('SK', 'socks5'), TRIO('SK', 'http')]
};

const COUNTRY_META = {
  AE: { name: 'امارات متحده عربی', flag: '🇦🇪' },
  BG: { name: 'بلغارستان', flag: '🇧🇬' },
  CA: { name: 'کانادا', flag: '🇨🇦' },
  DE: { name: 'آلمان', flag: '🇩🇪' },
  GB: { name: 'بریتانیا', flag: '🇬🇧' },
  IT: { name: 'ایتالیا', flag: '🇮🇹' },
  KZ: { name: 'قزاقستان', flag: '🇰🇿' },
  LV: { name: 'لتونی', flag: '🇱🇻' },
  NL: { name: 'هلند', flag: '🇳🇱' },
  NO: { name: 'نروژ', flag: '🇳🇴' },
  SE: { name: 'سوئد', flag: '🇸🇪' },
  TH: { name: 'تایلند', flag: '🇹🇭' },
  TR: { name: 'ترکیه', flag: '🇹🇷' },
  US: { name: 'ایالات متحده آمریکا', flag: '🇺🇸' },
  UZ: { name: 'ازبکستان', flag: '🇺🇿' },
  FR: { name: 'فرانسه', flag: '🇫🇷' },
  FI: { name: 'فنلاند', flag: '🇫🇮' },
  SG: { name: 'سنگاپور', flag: '🇸🇬' },
  RU: { name: 'روسیه', flag: '🇷🇺' },
  CN: { name: 'چین', flag: '🇨🇳' },
  CH: { name: 'سوئیس', flag: '🇨🇭' },
  KR: { name: 'کره‌جنوبی', flag: '🇰🇷' },
  UA: { name: 'اوکراین', flag: '🇺🇦' },
  VN: { name: 'ویتنام', flag: '🇻🇳' },
  BR: { name: 'برزیل', flag: '🇧🇷' },
  IN: { name: 'هند', flag: '🇮🇳' },
  RS: { name: 'صربستان', flag: '🇷🇸' },
  SK: { name: 'اسلواکی', flag: '🇸🇰' }
};

// لیست‌های عمومی SOCKS5 (هر بار زنده، برش چرخشی)
const GLOBAL_SOCKS5_SOURCES = [
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_geolocation/socks5.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_geolocation_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks5.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_geolocation/socks5.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_geolocation_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
  'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
  'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
  'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/socks5.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/socks5_with_protocol.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5.txt',
  'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/socks5_proxies.txt',
  'https://sunny9577.github.io/proxy-scraper/generated/socks5_proxies.txt',
  'https://raw.githubusercontent.com/trio666/proxy-checker/main/socks5.txt',
  'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
  'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies/socks5.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_geolocation/socks5.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_geolocation_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/socks5.txt',
  'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks5.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/archive/txt/proxies-socks5.txt',
  'https://raw.githubusercontent.com/iplocate/free-proxy-list/main/protocols/socks5.txt',
  'https://raw.githubusercontent.com/officialputuid/KangProxy/main/socks5/socks5.txt',
  'https://raw.githubusercontent.com/karimi-mohammad/SOCKS5-Proxy-Checker/main/socks5.txt',
  'https://raw.githubusercontent.com/FosterG4/proxy-list/main/socks5.txt',
  'https://raw.githubusercontent.com/yosephplex/proxy-updater/main/proxies/socks5.txt',
  'https://raw.githubusercontent.com/readloud/clauneck/main/PROXY-List/socks5.txt',
  'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/socks5.txt',
  'https://raw.githubusercontent.com/i-am-unbekannt/BLITZPROXY/main/out-files/socks5.txt',
  'https://raw.githubusercontent.com/caedencode/proxy-list/main/socks5.txt',
  'https://raw.githubusercontent.com/ProxyListt/PROXY-list/main/socks5.txt',
  'https://raw.githubusercontent.com/Daniel3356/Proxy_Full-list/main/socks5.txt',
  'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/socks5.txt',
  'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/Stable/socks5.txt'
];

// لیست‌های عمومی HTTP/HTTPS
const GLOBAL_HTTP_SOURCES = [
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_geolocation/http.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_geolocation_anonymous/http.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_geolocation/http.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_geolocation_anonymous/http.txt',
  'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt',
  'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
  'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
  'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
  'https://raw.githubusercontent.com/Vadim287/free-proxy/main/proxies/http.txt',
  'https://raw.githubusercontent.com/Vadim287/free-proxy/main/proxies/https.txt',
  'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/http.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/https.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/http_with_protocol.txt',
  'https://raw.githubusercontent.com/Noctiro/getproxy/master/file/https_with_protocol.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS.txt',
  'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/http_proxies.txt',
  'https://sunny9577.github.io/proxy-scraper/generated/http_proxies.txt',
  'https://raw.githubusercontent.com/trio666/proxy-checker/main/http.txt',
  'https://raw.githubusercontent.com/trio666/proxy-checker/main/https.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
  'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
  'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/https/data.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies/http.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_anonymous/http.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_geolocation/http.txt',
  'https://raw.githubusercontent.com/ikimono-afk/proxy-api/main/proxies_geolocation_anonymous/http.txt',
  'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
  'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Https.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/archive/txt/proxies-http.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/archive/txt/proxies-https.txt',
  'https://raw.githubusercontent.com/iplocate/free-proxy-list/main/protocols/http.txt',
  'https://raw.githubusercontent.com/iplocate/free-proxy-list/main/protocols/https.txt',
  'https://raw.githubusercontent.com/officialputuid/KangProxy/main/http/http.txt',
  'https://raw.githubusercontent.com/officialputuid/KangProxy/main/https/https.txt',
  'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/http/global/http_checked.txt',
  'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
  'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
  'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
  'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
  'https://raw.githubusercontent.com/dpangestuw/Free-Proxy/main/http_proxies.txt',
  'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/http.txt',
  'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/https.txt',
  'https://raw.githubusercontent.com/mzyui/proxy-list/main/http.txt',
  'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
  'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
  'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
  'https://raw.githubusercontent.com/Skillter/ProxyGather/master/proxies/working-proxies-http.txt',
  'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/http.txt',
  'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/https.txt',
  'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/http.txt',
  'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/https.txt',
  'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
  'https://raw.githubusercontent.com/vmheaven/VMHeaven-Free-Proxy-Updated/main/http.txt',
  'https://raw.githubusercontent.com/vmheaven/VMHeaven-Free-Proxy-Updated/main/https.txt',
  'https://raw.githubusercontent.com/yosephplex/proxy-updater/main/proxies/http.txt',
  'https://raw.githubusercontent.com/readloud/clauneck/main/PROXY-List/http.txt',
  'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/http.txt',
  'https://raw.githubusercontent.com/i-am-unbekannt/BLITZPROXY/main/out-files/http.txt',
  'https://raw.githubusercontent.com/caedencode/proxy-list/main/http.txt',
  'https://raw.githubusercontent.com/ProxyListt/PROXY-list/main/http.txt',
  'https://raw.githubusercontent.com/Daniel3356/Proxy_Full-list/main/http.txt',
  'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/http.txt',
  'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/Stable/http.txt'
];

// لیست‌های مسکونی (residential) — به‌عنوان استخر مکمل
const RESIDENTIAL_SOURCES = [
  'https://raw.githubusercontent.com/shadowsock/proxy-lists/main/residential.txt',
  'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/types/residential/data.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/types/residential.txt',
  'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_types/residential.txt',
  'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/residential.txt',
  'https://raw.githubusercontent.com/parser-free/proxy-list/main/residential/proxy.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/residential.txt'
];

// لیست‌های آی‌پی/دامنه ثابت کلادفلر (هر خط یک آدرس) — نمونه‌گیری زنده برای yx
// منبع Z-E-U-S شامل هزاران آی‌پی فرانت‌شده کلادفلر است که به‌عنوان آدرس نود پاسخ می‌دهند.
const IP_CANDIDATE_SOURCES = [
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/ips.txt'
];

// رنج‌های IPv4/IPv6 کلادفلر برای تست و انتخاب آی‌پی ثابت
const IP_RANGE_SOURCES = {
  ipv4: [
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/cloudflare/ipv4.txt',
    'https://raw.githubusercontent.com/mrkhachaturov/ipranges/main/cloudflare/ipv4.txt'
  ],
  ipv6: [
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/cloudflare/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/cloudflare/ipv6_merged.txt',
    'https://raw.githubusercontent.com/mrkhachaturov/ipranges/main/cloudflare/ipv6.txt',
    'https://raw.githubusercontent.com/mrkhachaturov/ipranges/main/cloudflare/ipv6_merged.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/telegram/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/telegram/ipv6_merged.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/google/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/google/ipv6_merged.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/apple-proxy/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/apple-proxy/ipv6_merged.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/microsoft/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/microsoft/ipv6_merged.txt',
    'https://raw.githubusercontent.com/XIU2/CloudflareSpeedTest/master/ipv6.txt'
  ],
  // رنج‌های IPv6 سایر ارائه‌دهندگان (برای تست دستی/پیشرفته)
  extraIpv6: [
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/all/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/apple-proxy/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/digitalocean/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/linode/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/vultr/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/oracle/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/amazon/ipv6.txt',
    'https://raw.githubusercontent.com/mrkhachaturov/ipranges/main/all/ipv6.txt',
    'https://raw.githubusercontent.com/dibdot/DoH-IP-blocklists/master/doh-ipv6.txt',
    'https://raw.githubusercontent.com/oneoffdallas/dohservers/master/ipv6list.txt'
  ]
};


// --- MODULE: src/config/defaults.js ---
// ============================================================================
// miliconfig v3.1 - تنظیمات پیش‌فرض پایه (الهام‌گرفته از Z-E-U-S و CFnew)
// مجهز به شادوساکس، فرگمنت، ECH، لیست‌های کشوری، قفل ۳ کاربر و چرخش خودکار آی‌پی
// ============================================================================


const BRAND_NAME = 'miliconfig';
const BRAND_UPPER = 'MILICONFIG';
const VERSION = 'v3.1';
const DEFAULT_ADMIN_UUID = '351c9981-04b6-4103-aa4b-864aa9c91469';
const MAX_USERS_LIMIT = 3;
const TELEGRAM_SUPPORT = '@miliconfig';

// ۳ نود هاردکدشده اطلاع‌رسانی که باید در ابتدای تمام سابلینک‌ها قرار گیرند
const HARDCODED_INFO_NODES = [
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%DB%B1.%20%D9%85%DB%8C%D9%84%DB%8C%20%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%DB%B2.%20%D9%81%D8%B1%D9%88%D8%B4%20%D8%A7%DB%8C%D9%86%20%DA%A9%D8%A7%D9%86%D9%81%DB%8C%DA%AF%20%D9%87%D8%A7%20%D8%AD%D8%B1%D8%A7%D9%85%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%DB%B3.%20%D8%A8%D9%87%20%D8%B7%D9%88%D8%B1%20%D8%B4%D8%AE%D8%B5%DB%8C%20%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87%20%DA%A9%D9%86%DB%8C%D8%AF'
];

const CONFIG_DEFAULTS = {
  wk: '',
  ev: 'yes',
  et: 'yes',
  ex: 'yes',
  es: 'yes', // شادوساکس (Shadowsocks) — طبق درخواست همیشه در سابلینک حاضر است
  sspass: '',
  // هسته این ورکر هدر Shadowsocks را به‌صورت متنی (بدون AEAD) می‌خواند، بنابراین تنها متد سازگار «none» است
  ssmethod: 'none',
  ech: 'no',
  tp: '',
  customDNS: 'https://223.5.5.5/dns-query',
  customECHDomain: 'cloudflare-ech.com',
  alpn: '',
  d: 'admin', // آدرس ثابت پنل: /admin (قابل تغییر از تنظیمات)
  p: '',
  yx: '',
  yxURL: '',
  s: '',
  homepage: '',
  scu: 'https://url.v1.mk/sub',
  ena: 'no',
  epd: 'yes',
  epi: 'yes',
  egi: 'yes',
  ae: '',
  rm: '',
  qj: '',
  dkby: 'no',
  yxby: '',
  ipv4: 'yes',
  ipv6: 'yes',
  ispMobile: 'yes',
  ispUnicom: 'yes',
  ispTelecom: 'yes',
  jk: 'no',
  subNodeCount: 50,
  brand: BRAND_NAME,
  // تنظیمات جدید الهام‌گرفته از ZEUS:
  fp: 'chrome', // فینگرپرینت: chrome, firefox, safari, edge, ios, randomized
  patt: '/?ed=2048', // الگوهای مسیر
  fragmentPreset: 'mci', // پریست‌های فرگمنت
  fragmentLength: '100-200',
  fragmentInterval: '10-20',
  fragmentPackets: 'tlshello',
  ipRotation: 15, // چرخش خودکار آی‌پی به دقیقه (۰ = خاموش)
  locationNodeCount: 8, // تعداد نود چندلوکیشن که در ساب‌لینک کشوری ساخته می‌شود
  frag: 'yes', // کلید روشن/خاموش فرگمنت (شادوساکس فرگمنت ندارد)
  ports: '443,2053,2087,8443', // پورت‌های نودهای ساب‌لینک (لیست جداشده با کاما)
  adminPasswordHash: '', // هش رمز عبور مدیر
  supportChannel: TELEGRAM_SUPPORT
};

const BOOLEAN_CONFIG_KEYS = [
  'ev', 'et', 'ex', 'es', 'ech', 'ena', 'epd', 'epi', 'egi',
  'ipv4', 'ipv6', 'ispMobile', 'ispUnicom', 'ispTelecom', 'jk', 'frag'
];

const ENV_KEY_MAPPING = {
  wk: ['wk', 'WK'],
  ev: ['ev', 'EV'],
  et: ['et', 'ET'],
  ex: ['ex', 'EX'],
  es: ['es', 'ES', 'SS', 'ss'],
  sspass: ['sspass', 'SSPASS', 'SS_PASSWORD'],
  ssmethod: ['ssmethod', 'SSMETHOD', 'SS_METHOD'],
  ech: ['ech', 'ECH'],
  tp: ['tp', 'TP'],
  customDNS: ['customDNS', 'CUSTOMDNS', 'CUSTOM_DNS'],
  customECHDomain: ['customECHDomain', 'CUSTOMECHDOMAIN', 'CUSTOM_ECH_DOMAIN'],
  alpn: ['alpn', 'ALPN'],
  d: ['d', 'D'],
  p: ['p', 'P'],
  yx: ['yx', 'YX'],
  yxURL: ['yxURL', 'YXURL', 'YX_URL'],
  s: ['s', 'S'],
  homepage: ['homepage', 'HOMEPAGE'],
  scu: ['scu', 'SCU'],
  ena: ['ena', 'ENA'],
  epd: ['epd', 'EPD'],
  epi: ['epi', 'EPI'],
  egi: ['egi', 'EGI'],
  ae: ['ae', 'AE'],
  rm: ['rm', 'RM'],
  qj: ['qj', 'QJ'],
  dkby: ['dkby', 'DKBY'],
  yxby: ['yxby', 'YXBY'],
  ipv4: ['ipv4', 'IPV4'],
  ipv6: ['ipv6', 'IPV6'],
  ispMobile: ['ispMobile', 'ISPMOBILE', 'ISP_MOBILE'],
  ispUnicom: ['ispUnicom', 'ISPUNICOM', 'ISP_UNICOM'],
  ispTelecom: ['ispTelecom', 'ISPTELECOM', 'ISP_TELECOM'],
  jk: ['jk', 'JK'],
  subNodeCount: ['subNodeCount', 'SUB_NODE_COUNT', 'nodeCount', 'NODE_COUNT'],
  fp: ['fp', 'FP', 'FINGERPRINT'],
  patt: ['patt', 'PATT', 'PATH_PATTERN'],
  fragmentPreset: ['fragmentPreset', 'FRAGMENT_PRESET'],
  frag: ['frag', 'FRAG', 'FRAGMENT_ENABLED'],
  ports: ['ports', 'PORTS', 'NODE_PORTS'],
  ipRotation: ['ipRotation', 'IP_ROTATION', 'ROTATION_MINUTES'],
  locationNodeCount: ['locationNodeCount', 'LOCATION_NODE_COUNT']
};

const FRAGMENT_PRESETS = {
  'off': { name: 'غیرفعال', length: '', interval: '', packets: '' },
  'mci': { name: 'همراه اول (MCI)', length: '100-200', interval: '10-20', packets: 'tlshello' },
  'irancell': { name: 'ایرانسل (MTN Irancell)', length: '50-100', interval: '5-10', packets: 'tlshello' },
  'rightel': { name: 'مخابرات و رایتل (Rightel / TCI)', length: '1-3', interval: '1-5', packets: '1-1' },
  'anti-dpi': { name: 'ضد فیلترینگ شدید (Anti-DPI)', length: '10-30', interval: '20-40', packets: 'tlshello' },
  'custom': { name: 'سفارشی (Custom)', length: '100-200', interval: '10-20', packets: 'tlshello' }
};

const FINGERPRINT_PRESETS = [
  { id: 'chrome', name: 'Chrome (پیشنهادی)' },
  { id: 'firefox', name: 'Firefox' },
  { id: 'safari', name: 'Safari (iOS/macOS)' },
  { id: 'edge', name: 'Microsoft Edge' },
  { id: 'ios', name: 'iOS Device' },
  { id: 'randomized', name: 'Randomized (تصادفی)' }
];

const ECH_DOMAINS = [
  'cloudflare-ech.com',
  'crypto.cloudflare.com',
  'cloudflare-dns.com',
  'cloudflare.com',
  'deflect.ca',
  'one.one.one.one',
  'mozilla.cloudflare-dns.com',
  'cloudflare-ech.net'
];

// لیست آماده DNS (DoH) برای انتخاب در پنل — مقدار نهایی در پارامتر dns نودها می‌نشیند
const DNS_PRESETS = [
  { id: 'cloudflare', name: 'Cloudflare (1.1.1.1)', value: 'https://1.1.1.1/dns-query' },
  { id: 'cloudflare-alt', name: 'Cloudflare (223.5.5.5)', value: 'https://223.5.5.5/dns-query' },
  { id: 'google', name: 'Google (8.8.8.8)', value: 'https://8.8.8.8/dns-query' },
  { id: 'quad9', name: 'Quad9 (9.9.9.9)', value: 'https://9.9.9.9/dns-query' },
  { id: 'opendns', name: 'OpenDNS (208.67.222.222)', value: 'https://208.67.222.222/dns-query' },
  { id: 'shecan', name: 'شکن (178.22.122.100)', value: 'https://178.22.122.100/dns-query' },
  { id: 'radar', name: 'رادار (10.202.10.10)', value: 'https://10.202.10.10/dns-query' },
  { id: 'begzar', name: 'بگذر (185.55.226.26)', value: 'https://185.55.226.26/dns-query' },
  { id: 'adguard', name: 'AdGuard (94.140.14.14)', value: 'https://94.140.14.14/dns-query' },
  { id: 'nextdns', name: 'NextDNS (45.90.28.0)', value: 'https://45.90.28.0/dns-query' },
  { id: 'iranserver', name: 'ایران‌سرور (172.29.2.100)', value: 'https://172.29.2.100/dns-query' },
  { id: 'electrotm', name: 'الکترو (78.157.42.101)', value: 'https://78.157.42.101/dns-query' }
];

const PATH_PATTERNS = [
  { id: '/?ed=2048', name: 'استاندارد (/?ed=2048)' },
  { id: '/?ed=2560', name: 'حجم بزرگ (/?ed=2560)' },
  { id: '/mili/{random}?ed=2048', name: 'مسیر رندوم (/mili/{random}?ed=2048)' },
  { id: '/api/v1/stream', name: 'استتار API (/api/v1/stream)' },
  { id: '/grpc', name: 'gRPC مسیر (/grpc)' },
  { id: '/ws', name: 'وب‌سوکت ساده (/ws)' },
  { id: '/video/stream', name: 'استتار ویدیو (/video/stream)' },
  { id: '/download/file?ed=2048', name: 'استتار دانلود (/download/file)' }
];

// پورت‌های مجاز کلادفلر برای انتخاب در پنل
const CF_PORT_CHOICES = [
  { port: 443, tls: true, label: '443 (HTTPS اصلی)' },
  { port: 2053, tls: true, label: '2053 (HTTPS)' },
  { port: 2083, tls: true, label: '2083 (HTTPS)' },
  { port: 2087, tls: true, label: '2087 (HTTPS)' },
  { port: 2096, tls: true, label: '2096 (HTTPS)' },
  { port: 8443, tls: true, label: '8443 (HTTPS)' },
  { port: 80, tls: false, label: '80 (HTTP)' },
  { port: 8080, tls: false, label: '8080 (HTTP)' },
  { port: 8880, tls: false, label: '8880 (HTTP)' },
  { port: 2052, tls: false, label: '2052 (HTTP)' },
  { port: 2082, tls: false, label: '2082 (HTTP)' },
  { port: 2086, tls: false, label: '2086 (HTTP)' },
  { port: 2095, tls: false, label: '2095 (HTTP)' }
];

function parseNodePorts(value = '') {
  const source = String(value || '').trim() || CONFIG_DEFAULTS.ports;
  const seen = new Set();
  const list = [];
  for (const chunk of source.split(/[,\s]+/)) {
    const port = parseInt(chunk, 10);
    if (!Number.isFinite(port) || port < 1 || port > 65535 || seen.has(port)) continue;
    seen.add(port);
    list.push(port);
  }
  return list.length ? list : [443];
}

// لیست پروکسی‌های کشوری VIP (پایه؛ در انتها با منابع زنده اسکنر ادغام می‌شود)
const BASE_COUNTRY_PROXY_SOURCES = {
  'DE': {
    name: 'آلمان',
    flag: '🇩🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/DE.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/DE/socks5.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/DE.txt'
    ]
  },
  'NL': {
    name: 'هلند',
    flag: '🇳🇱',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/NL.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/NL/socks5.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/NL.txt'
    ]
  },
  'US': {
    name: 'ایالات متحده آمریکا',
    flag: '🇺🇸',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/US.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/US/socks5.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/US.txt'
    ]
  },
  'GB': {
    name: 'بریتانیا / انگلستان',
    flag: '🇬🇧',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/GB.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/GB.txt'
    ]
  },
  'CA': {
    name: 'کانادا',
    flag: '🇨🇦',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/CA.txt'
    ]
  },
  'TR': {
    name: 'ترکیه',
    flag: '🇹🇷',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/TR.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/TR.txt'
    ]
  },
  'AE': {
    name: 'امارات متحده عربی',
    flag: '🇦🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/AE.txt'
    ]
  },
  'FR': {
    name: 'فرانسه',
    flag: '🇫🇷',
    urls: [
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/FR.txt'
    ]
  },
  'FI': {
    name: 'فنلاند',
    flag: '🇫🇮',
    urls: [
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/FI/socks5.txt',
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/FI.txt'
    ]
  },
  'SE': {
    name: 'سوئد',
    flag: '🇸🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/SE.txt'
    ]
  },
  'NO': {
    name: 'نروژ',
    flag: '🇳🇴',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/NO.txt'
    ]
  },
  'IT': {
    name: 'ایتالیا',
    flag: '🇮🇹',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/IT.txt'
    ]
  },
  'BG': {
    name: 'بلغارستان',
    flag: '🇧🇬',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/BG.txt'
    ]
  },
  'KZ': {
    name: 'قزاقستان',
    flag: '🇰🇿',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/KZ.txt'
    ]
  },
  'LV': {
    name: 'لتونی',
    flag: '🇱🇻',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/LV.txt'
    ]
  },
  'TH': {
    name: 'تایلند',
    flag: '🇹🇭',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/TH.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/TH/socks5.txt'
    ]
  },
  'UZ': {
    name: 'ازبکستان',
    flag: '🇺🇿',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/UZ.txt'
    ]
  },
  'SG': {
    name: 'سنگاپور',
    flag: '🇸🇬',
    urls: [
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/SG/socks5.txt'
    ]
  }
};

// ============================================================================
// ادغام منابع پایه با منابع زنده اسکنر (Z-E-U-S + trio666 + dimzon)
// ============================================================================
const COUNTRY_PROXY_SOURCES = (() => {
  const codes = new Set([
    ...Object.keys(BASE_COUNTRY_PROXY_SOURCES),
    ...Object.keys(COUNTRY_EXTRA_PROXY_SOURCES),
    ...Object.keys(COUNTRY_META)
  ]);
  const merged = {};
  for (const code of codes) {
    const base = BASE_COUNTRY_PROXY_SOURCES[code] || {};
    const meta = COUNTRY_META[code] || {};
    const urls = [...new Set([...(base.urls || []), ...(COUNTRY_EXTRA_PROXY_SOURCES[code] || [])])];
    merged[code] = {
      name: base.name || meta.name || code,
      flag: base.flag || meta.flag || '',
      urls
    };
  }
  return merged;
})();

const GLOBAL_PROXY_SOURCES = {
  socks5: GLOBAL_SOCKS5_SOURCES,
  http: GLOBAL_HTTP_SOURCES,
  residential: RESIDENTIAL_SOURCES
};

export { IP_CANDIDATE_SOURCES, IP_RANGE_SOURCES };

const REGION_MAP = {
  CF: ['🌐 مستقیم رسمی CF', 'CF', 'Cloudflare Direct'],
  HK: ['🇭🇰 هنگ‌کنگ', 'HK', 'Hong Kong'],
  US: ['🇺🇸 آمریکا', 'US', 'United States'],
  SG: ['🇸🇬 سنگاپور', 'SG', 'Singapore'],
  JP: ['🇯🇵 ژاپن', 'JP', 'Japan'],
  KR: ['🇰🇷 کره‌جنوبی', 'KR', 'South Korea'],
  DE: ['🇩🇪 آلمان', 'DE', 'Germany'],
  SE: ['🇸🇪 سوئد', 'SE', 'Sweden'],
  NL: ['🇳🇱 هلند', 'NL', 'Netherlands'],
  FI: ['🇫🇮 فنلاند', 'FI', 'Finland'],
  GB: ['🇬🇧 بریتانیا', 'GB', 'United Kingdom'],
  CA: ['🇨🇦 کانادا', 'CA', 'Canada'],
  TR: ['🇹🇷 ترکیه', 'TR', 'Turkey'],
  FR: ['🇫🇷 فرانسه', 'FR', 'France'],
  AE: ['🇦🇪 امارات', 'AE', 'United Arab Emirates'],
  Oracle: ['☁️ Oracle', 'Oracle'],
  DigitalOcean: ['🌊 DigitalOcean', 'DigitalOcean'],
  Vultr: ['⚡ Vultr', 'Vultr'],
  Multacom: ['🏢 Multacom', 'Multacom']
};

// آی‌پی‌های ثابت (anycast) خود کلادفلر؛ این‌ها برخلاف دامنه‌های CNAME همیشه پاسخ می‌دهند
// و به‌عنوان «آی‌پی ثابت» در ابتدای نودهای ساب‌لینک قرار می‌گیرند.
const OFFICIAL_DIRECT_IPS = [
  '172.71.218.190',
  '162.158.228.87',
  '162.158.189.134',
  '162.158.26.63',
  '162.158.25.86',
  '162.158.29.216',
  '162.158.218.160',
  '162.158.227.214',
  '172.69.118.198',
  '172.69.119.150',
  '104.16.131.1',
  '104.17.0.1',
  '104.18.0.1',
  '104.19.0.1',
  '104.20.0.1',
  '104.21.0.1',
  '104.22.0.1',
  '104.24.0.1',
  '104.25.0.1',
  '104.26.0.1',
  '104.27.0.1',
  '172.64.0.1',
  '172.65.0.1',
  '172.66.0.1',
  '172.67.0.1',
  '162.159.0.1',
  '188.114.96.1',
  '188.114.97.1'
];

// آی‌پی‌های ثابت IPv6 کلادفلر (فقط وقتی IPv6 فعال باشد)
const OFFICIAL_DIRECT_IPV6 = [
  '2606:4700::6810:1',
  '2606:4700::6811:1',
  '2606:4700::6812:1',
  '2606:4700::6813:1',
  '2606:4700:10::6810:1',
  '2803:f800:50::6ca2:c001'
];

const FALLBACK_PROXY_IPS = [
  { domain: 'ProxyIP.HK.CMLiussss.net', region: 'HK', regionCode: 'HK', port: 443 },
  { domain: 'ProxyIP.US.CMLiussss.net', region: 'US', regionCode: 'US', port: 443 },
  { domain: 'ProxyIP.SG.CMLiussss.net', region: 'SG', regionCode: 'SG', port: 443 },
  { domain: 'ProxyIP.JP.CMLiussss.net', region: 'JP', regionCode: 'JP', port: 443 },
  { domain: 'ProxyIP.KR.CMLiussss.net', region: 'KR', regionCode: 'KR', port: 443 },
  { domain: 'ProxyIP.DE.CMLiussss.net', region: 'DE', regionCode: 'DE', port: 443 },
  { domain: 'ProxyIP.SE.CMLiussss.net', region: 'SE', regionCode: 'SE', port: 443 },
  { domain: 'ProxyIP.NL.CMLiussss.net', region: 'NL', regionCode: 'NL', port: 443 },
  { domain: 'ProxyIP.FI.CMLiussss.net', region: 'FI', regionCode: 'FI', port: 443 },
  { domain: 'ProxyIP.GB.CMLiussss.net', region: 'GB', regionCode: 'GB', port: 443 },
  { domain: 'ProxyIP.Oracle.cmliussss.net', region: 'Oracle', regionCode: 'Oracle', port: 443 },
  { domain: 'ProxyIP.DigitalOcean.CMLiussss.net', region: 'DigitalOcean', regionCode: 'DigitalOcean', port: 443 },
  { domain: 'ProxyIP.Vultr.CMLiussss.net', region: 'Vultr', regionCode: 'Vultr', port: 443 },
  { domain: 'ProxyIP.Multacom.CMLiussss.net', region: 'Multacom', regionCode: 'Multacom', port: 443 }
];

const DIRECT_DOMAINS = [
  { name: 'cloudflare.182682.xyz', domain: 'cloudflare.182682.xyz' },
  { name: 'speed.marisalnc.com', domain: 'speed.marisalnc.com' },
  { domain: 'freeyx.cloudflare88.eu.org' },
  { domain: 'bestcf.top' },
  { domain: 'cdn.2020111.xyz' },
  { domain: 'cfip.cfcdn.vip' },
  { domain: 'cf.0sm.com' },
  { domain: 'cf.090227.xyz' },
  { domain: 'cf.zhetengsha.eu.org' },
  { domain: 'cloudflare.9jy.cc' },
  { domain: 'cf.zerone-cdn.pp.ua' },
  { domain: 'cfip.1323123.xyz' },
  { domain: 'cnamefuckxxs.yuchen.icu' },
  { domain: 'cloudflare-ip.mofashi.ltd' },
  { domain: '115155.xyz' },
  { domain: 'cname.xirancdn.us' },
  { domain: 'f3058171cad.002404.xyz' },
  { domain: '8.889288.xyz' },
  { domain: 'cdn.tzpro.xyz' },
  { domain: 'cf.877771.xyz' },
  { domain: 'xn--b6gac.eu.org' }
];

const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
const ALLOWED_ALPN = ['', 'h3', 'h2', 'http/1.1', 'h3,h2', 'h2,http/1.1', 'h3,h2,http/1.1'];
const REMOTE_CONFIG_URL = 'https://raw.githubusercontent.com/byJoey/test/refs/heads/main/tist.ini';

function isEnabledValue(val, defaultEnabled = false) {
  if (val === undefined || val === null || val === '') return defaultEnabled;
  if (val === true || val === false) return val;
  const text = String(val).trim().toLowerCase();
  if (text === 'yes' || text === 'true' || text === '1' || text === 'on') return true;
  if (text === 'no' || text === 'false' || text === '0' || text === 'off') return false;
  return defaultEnabled;
}

function normalizeSwitch(val, defaultEnabled = false) {
  return isEnabledValue(val, defaultEnabled) ? 'yes' : 'no';
}

function normalizeAlpn(val) {
  const s = String(val || '').trim();
  return ALLOWED_ALPN.includes(s) ? s : '';
}

function normalizeEffectiveConfig(rawConfig = {}) {
  const snap = {
    ...CONFIG_DEFAULTS,
    ...(rawConfig || {})
  };
  for (const key of BOOLEAN_CONFIG_KEYS) {
    snap[key] = normalizeSwitch(snap[key], isEnabledValue(CONFIG_DEFAULTS[key]));
  }
  if (snap.ev === 'no' && snap.et === 'no' && snap.ex === 'no' && snap.es === 'no') {
    snap.ev = 'yes';
  }
  if (snap.ech === 'yes') {
    snap.dkby = 'yes';
  }
  snap.alpn = normalizeAlpn(snap.alpn);
  const parsedCount = parseInt(snap.subNodeCount, 10);
  snap.subNodeCount = Number.isFinite(parsedCount) && parsedCount >= 0 ? parsedCount : 50;
  snap.ipRotation = Number.isFinite(parseInt(snap.ipRotation, 10)) ? parseInt(snap.ipRotation, 10) : 15;
  // تنها متد Shadowsocks پشتیبانی‌شده توسط هسته همین ورکر «none» است؛ انتخاب‌های دیگر باعث بی‌پاسخ شدن نود می‌شدند
  snap.ssmethod = 'none';
  // اگر پریست فرگمنت روی حالت سفارشی باشد و مقادیر خالی بمانند، از مقادیر پیش‌فرض ضد-DPI استفاده می‌شود
  if (!snap.fragmentLength) snap.fragmentLength = '100-200';
  if (!snap.fragmentInterval) snap.fragmentInterval = '10-20';
  if (!snap.fragmentPackets) snap.fragmentPackets = 'tlshello';
  snap.fp = snap.fp || 'chrome';
  snap.patt = snap.patt || '/?ed=2048';
  snap.ports = parseNodePorts(snap.ports).join(',');
  snap.supportChannel = TELEGRAM_SUPPORT;
  snap.brand = BRAND_NAME;
  return snap;
}

function readEnvConfigValue(env, ...names) {
  if (!env) return undefined;
  for (const name of names) {
    if (env[name] !== undefined && env[name] !== null && env[name] !== '' && typeof env[name] !== 'object') {
      return env[name];
    }
  }
  return undefined;
}

function getEnvConfigSnapshot(env = {}) {
  const snap = {};
  for (const [key, names] of Object.entries(ENV_KEY_MAPPING)) {
    const val = readEnvConfigValue(env, ...names);
    if (val !== undefined) snap[key] = val;
  }
  return snap;
}


// --- MODULE: src/config/presets.js ---
// ============================================================================
// miliconfig v3.1 - پریست‌های ساخت سریع کاربر (مطابق رابط کاربری Zeus و CFnew)
// ============================================================================


const USER_PRESETS = {
  'iran-fast': {
    id: 'iran-fast',
    title: 'ایران — پرسرعت (پیشنهادی)',
    subtitle: 'همراه اول · ایرانسل · مخابرات',
    badges: ['فرگمنت 100-200 با فاصله 10-20', 'fingerprint chrome', 'بلاک تبلیغات'],
    recommended: true,
    nodeScope: 'all',
    subNodeCount: 50,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'yes', // شادوساکس هم فعال باشد
      fp: 'chrome',
      fragmentPreset: 'mci',
      fragmentLength: '100-200',
      fragmentInterval: '10-20',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'no',
      ipv4: 'yes',
      ipv6: 'yes'
    }
  },
  'iran-heavy': {
    id: 'iran-heavy',
    title: 'ایران — مصرف سنگین (نامحدود)',
    subtitle: 'استریم · بازی · دانلود',
    badges: ['حجم نامحدود', 'فرگمنت 50-100', '۲ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 60,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 2,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'yes',
      ex: 'no',
      es: 'yes',
      fp: 'chrome',
      fragmentPreset: 'irancell',
      fragmentLength: '50-100',
      fragmentInterval: '5-10',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes'
    }
  },
  'international': {
    id: 'international',
    title: 'بین‌المللی — بدون فرگمنت',
    subtitle: 'اینترنت بدون محدودیت · سرعت حداکثری',
    badges: ['بدون فرگمنت', 'بدون محدودیت حجم', '۵ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 50,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 5,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'yes',
      dkby: 'yes',
      alpn: 'h2,http/1.1'
    }
  },
  'multi-location': {
    id: 'multi-location',
    title: 'چند لوکیشن — فقط نودهای لبه و VIP',
    subtitle: 'لوکیشن‌های تفکیک‌شده آلمان، هلند، آمریکا و...',
    badges: ['فقط نودهای مولتی‌لوکیشن', 'نام‌گذاری number+miliconfig', 'فرگمنت فعال'],
    recommended: false,
    nodeScope: 'edge',
    subNodeCount: 40,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      es: 'yes',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'no'
    }
  },
  'direct-only': {
    id: 'direct-only',
    title: 'فقط سرور اصلی (بدون CDN)',
    subtitle: 'وقتی مسیر CDN مشکل دارد یا تست خود سرور',
    badges: ['فقط نود سرور اصلی', 'بدون لوکیشن', 'بدون فرگمنت'],
    recommended: false,
    nodeScope: 'origin',
    subNodeCount: 10,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      ena: 'yes',
      epd: 'no',
      epi: 'no',
      egi: 'no',
      yxby: 'yes'
    }
  }
};

function buildUserDefaultConfig(basePanelConfig = {}, presetId = 'iran-fast', customOverrides = {}) {
  const preset = USER_PRESETS[presetId] || USER_PRESETS['iran-fast'];
  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...(basePanelConfig || {}),
    ...(preset.configOverrides || {}),
    subNodeCount: customOverrides.subNodeCount ?? basePanelConfig?.subNodeCount ?? preset.subNodeCount ?? 50,
    ...(customOverrides || {})
  });
}


// --- MODULE: src/core/utils.js ---
// ============================================================================
// miliconfig v3.1 - ابزارهای هسته، نام‌گذاری نودها (number+miliconfig) و رمزنگاری
// ============================================================================


const base64TextDecoder = new TextDecoder();
const sharedDecoder = new TextDecoder();

function decodeBase64Utf8(b64) {
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return base64TextDecoder.decode(bytes);
  } catch (_e) {
    return '';
  }
}

function encodeBase64Utf8(str) {
  try {
    const bytes = new TextEncoder().encode(String(str ?? ''));
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (_e) {
    return btoa(unescape(encodeURIComponent(String(str ?? ''))));
  }
}

function isValidUuid(str) {
  if (!str || typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

function generateUuidV4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().toLowerCase();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function generateShortId(prefix = 'mili') {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 3; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}-${hex}`;
}

// اعتبارسنجی کامل IPv6 (شامل فرم فشرده مثل 2606:4700::1 و IPv4-mapped)
function isValidIpv6Address(addr) {
  const s = String(addr || '').trim();
  if (!s.includes(':')) return false;
  if (/[^0-9a-fA-F:.]/.test(s)) return false;
  if (s.includes(':::')) return false;
  const halves = s.split('::');
  if (halves.length > 2) return false;
  const groupsOf = part => (part ? part.split(':') : []);
  const head = groupsOf(halves[0]);
  const tail = halves.length === 2 ? groupsOf(halves[1]) : [];
  const validGroup = g => /^[0-9a-fA-F]{1,4}$/.test(g) || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(g);
  if (![...head, ...tail].every(validGroup)) return false;
  const total = head.length + tail.length;
  if (halves.length === 2) return total <= 7;
  return total === 8;
}

function isValidIpAddress(addr) {
  if (!addr || typeof addr !== 'string') return false;
  const s = addr.trim().replace(/^\[([^\]]+)\]$/, '$1');
  const v4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (v4.test(s)) return true;
  return isValidIpv6Address(s);
}

function isValidDomain(domain) {
  if (!domain || typeof domain !== 'string') return false;
  return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(domain.trim());
}

function normalizeNodeHost(host) {
  return String(host || '').trim().replace(/^\[([^\]]+)\]$/, '$1');
}

function parseAddressAndPort(input) {
  const raw = String(input || '').trim();
  if (!raw) return { address: '', port: null };
  if (raw.includes('[') && raw.includes(']')) {
    const m = raw.match(/^\[([^\]]+)\](?::(\d+))?$/);
    if (m) {
      return {
        address: m[1],
        port: m[2] ? parseInt(m[2], 10) : null
      };
    }
  }
  const lastColon = raw.lastIndexOf(':');
  if (lastColon > 0) {
    const addr = raw.substring(0, lastColon);
    const portStr = raw.substring(lastColon + 1);
    const port = parseInt(portStr, 10);
    if (!addr.includes(':') && !Number.isNaN(port) && port > 0 && port <= 65535) {
      return { address: addr, port };
    }
  }
  return { address: raw, port: null };
}

// ============================================================================
// نام‌گذار اختصاصی نودهای خروجی با فرمت دقیق number+miliconfig
// (مثلاً: 1+miliconfig, 2+miliconfig, 3+miliconfig ...)
// ============================================================================
function createMiliNodeNamer(brand = BRAND_NAME) {
  let counter = 0;
  const cleanBrand = String(brand || BRAND_NAME).trim() || BRAND_NAME;
  return function nameNode(_item) {
    counter += 1;
    return `${counter}+${cleanBrand}`;
  };
}

// بازشماری و اعمال محدودیت تعداد نودهای ساب‌لینک کاربر با فرمت دقیق number+miliconfig
function finalizeMiliSubscriptionLinks(links = [], subNodeCount = 0, brand = BRAND_NAME) {
  if (!Array.isArray(links) || links.length === 0) return [];
  const cleanBrand = String(brand || BRAND_NAME).trim() || BRAND_NAME;
  const limit = parseInt(subNodeCount, 10);
  const sliced = Number.isFinite(limit) && limit > 0 ? links.slice(0, limit) : links.slice();
  return sliced.map((link, idx) => {
    const nodeName = `${idx + 1}+${cleanBrand}`;
    const hashIdx = link.indexOf('#');
    const base = hashIdx > -1 ? link.substring(0, hashIdx) : link;
    return `${base}#${encodeURIComponent(nodeName)}`;
  });
}

// ============================================================================
// Pure-JS MD5 (جهت سازگاری کامل بدون خطای ۱۱۰۱)
// ============================================================================
async function md5Hex(text) {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
      const buf = await crypto.subtle.digest('MD5', new TextEncoder().encode(String(text)));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  return pureJsMd5(String(text));
}

function pureJsMd5(str) {
  const bytes = new TextEncoder().encode(str);
  const k = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ]);
  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];
  const origLenBits = bytes.length * 8;
  const withOne = bytes.length + 1;
  const padLen = ((56 - (withOne % 64)) + 64) % 64;
  const totalLen = withOne + padLen + 8;
  const buf = new Uint8Array(totalLen);
  buf.set(bytes);
  buf[bytes.length] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(totalLen - 8, origLenBits >>> 0, true);
  dv.setUint32(totalLen - 4, Math.floor(origLenBits / 0x100000000), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < totalLen; offset += 64) {
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      const word = dv.getUint32(offset + g * 4, true);
      F = (F + A + k[i] + word) >>> 0;
      A = D;
      D = C;
      C = B;
      const rot = (F << s[i]) | (F >>> (32 - s[i]));
      B = (B + rot) >>> 0;
    }
    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const outDv = new DataView(out.buffer);
  outDv.setUint32(0, a0, true);
  outDv.setUint32(4, b0, true);
  outDv.setUint32(8, c0, true);
  outDv.setUint32(12, d0, true);
  return Array.from(out, b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// SHA-224 (پروتکل Trojan)
// ============================================================================
function rotr32(val, bits) {
  return (val >>> bits) | (val << (32 - bits));
}

async function sha224Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(text || ''));
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const H = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
  const msgLen = data.length;
  const bitLen = msgLen * 8;
  const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(data);
  buf[msgLen] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(paddedLen - 4, bitLen, false);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    const W = new Uint32Array(64);
    for (let i = 0; i < 16; i++) {
      W[i] = view.getUint32(chunk + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr32(W[i - 15], 7) ^ rotr32(W[i - 15], 18) ^ (W[i - 15] >>> 3);
      const s1 = rotr32(W[i - 2], 17) ^ rotr32(W[i - 2], 19) ^ (W[i - 2] >>> 10);
      W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr32(e, 6) ^ rotr32(e, 11) ^ rotr32(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
      const S0 = rotr32(a, 2) ^ rotr32(a, 13) ^ rotr32(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
  }
  const out = [];
  for (let i = 0; i < 7; i++) {
    out.push(
      ((H[i] >>> 24) & 0xff).toString(16).padStart(2, '0'),
      ((H[i] >>> 16) & 0xff).toString(16).padStart(2, '0'),
      ((H[i] >>> 8) & 0xff).toString(16).padStart(2, '0'),
      (H[i] & 0xff).toString(16).padStart(2, '0')
    );
  }
  return out.join('');
}

// ============================================================================
// SHA-256 (برای سیستم احراز هویت و هش رمز عبور مدیر)
// ============================================================================
async function sha256Hex(text) {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(text || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  // اگر به هر دلیلی در دسترس نبود، sha224 با پدینگ ۳۲ بایتی برگشت داده می‌شود
  const h = await sha224Hex(String(text || ''));
  return h + h.slice(0, 8);
}

function formatBytes(bytes = 0) {
  const b = Number(bytes) || 0;
  if (b <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(b) / Math.log(1024)));
  const val = b / Math.pow(1024, i);
  return `${val >= 100 || i === 0 ? Math.round(val) : val.toFixed(2)} ${units[i]}`;
}


// --- MODULE: src/ui/icons.js ---
// ============================================================================
// miliconfig v3.1 - مجموعه آیکون‌های اختصاصی SVG (بدون هیچ ایموجی)
// تمام آیکون‌ها stroke-based و با currentColor رنگ می‌گیرند.
// ============================================================================

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{200D}]/gu;

function stripEmoji(text = '') {
  return String(text).replace(EMOJI_RE, '');
}

const wrap = (body, extraClass = '') =>
  `<svg class="mi ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const ICONS = {
  dashboard: wrap('<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>'),
  users: wrap('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.1 2.5-5.2 5.5-5.2s5.5 2.1 5.5 5.2"/><path d="M16.2 5.4a3 3 0 0 1 0 5.6"/><path d="M17.6 14.6c2 .6 3.4 2.4 3.4 4.7"/>'),
  settings: wrap('<path d="M4 7h9"/><path d="M17 7h3"/><circle cx="15" cy="7" r="2.2"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="9" cy="17" r="2.2"/>'),
  radar: wrap('<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><path d="M12 12l6-5.6"/>'),
  globe: wrap('<circle cx="12" cy="12" r="8.8"/><path d="M3.4 12h17.2"/><path d="M12 3.2c2.6 2.4 3.9 5.4 3.9 8.8s-1.3 6.4-3.9 8.8c-2.6-2.4-3.9-5.4-3.9-8.8S9.4 5.6 12 3.2z"/>'),
  bolt: wrap('<path d="M13.2 2.8 4.8 13.4h5.6l-1.2 7.8 8.8-11h-5.8l1-7.4z"/>'),
  shield: wrap('<path d="M12 3 20 6.2v5.4c0 4.9-3.3 8.6-8 10.4-4.7-1.8-8-5.5-8-10.4V6.2L12 3z"/><path d="m8.8 12 2.4 2.4 4-4.4"/>'),
  copy: wrap('<rect x="9" y="9" width="11" height="11" rx="2.4"/><path d="M15.2 6.4V5.6A2.4 2.4 0 0 0 12.8 3.2H6.4A2.4 2.4 0 0 0 4 5.6v6.4a2.4 2.4 0 0 0 2.4 2.4h.8"/>'),
  trash: wrap('<path d="M4.5 7h15"/><path d="M9.5 7V4.8h5V7"/><path d="M6.5 7l.9 12.2h9.2L17.5 7"/><path d="M10.2 10.5v5.4"/><path d="M13.8 10.5v5.4"/>'),
  refresh: wrap('<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.4h-4.4"/>'),
  plus: wrap('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  lock: wrap('<rect x="4.5" y="10" width="15" height="10" rx="2.6"/><path d="M8.2 10V7.6a3.8 3.8 0 0 1 7.6 0V10"/><circle cx="12" cy="15" r="1.3" fill="currentColor"/>'),
  key: wrap('<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8"/><path d="m16 4 4 4"/><path d="m14 6 4 4"/>'),
  logout: wrap('<path d="M14.5 4.5h-7A2.5 2.5 0 0 0 5 7v10a2.5 2.5 0 0 0 2.5 2.5h7"/><path d="M11 12h9"/><path d="m17 8.5 3.5 3.5L17 15.5"/>'),
  link: wrap('<path d="M10.2 6.8 12.6 4.4a4.1 4.1 0 0 1 5.8 5.8l-2.4 2.4"/><path d="M13.8 17.2 11.4 19.6a4.1 4.1 0 0 1-5.8-5.8l2.4-2.4"/><path d="m9.4 14.6 5.2-5.2"/>'),
  download: wrap('<path d="M12 3.5v11"/><path d="m7.6 10.6 4.4 4.4 4.4-4.4"/><path d="M4.5 19.5h15"/>'),
  check: wrap('<path d="m4.5 12.5 4.8 4.8L19.5 6.8"/>'),
  close: wrap('<path d="m6 6 12 12"/><path d="m18 6-12 12"/>'),
  sun: wrap('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>'),
  moon: wrap('<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.6 8.6 0 1 0 20 14.2z"/>'),
  database: wrap('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>'),
  activity: wrap('<path d="M3 12h3.4l2.2-6.6 3.6 13.2L15 12h6"/>'),
  wifi: wrap('<path d="M4 9.4a12.5 12.5 0 0 1 16 0"/><path d="M7 12.6a8.2 8.2 0 0 1 10 0"/><path d="M9.8 15.8a4 4 0 0 1 4.4 0"/><circle cx="12" cy="19" r="1.1" fill="currentColor"/>'),
  layers: wrap('<path d="m12 3.5 8.4 4.4L12 12.3 3.6 7.9 12 3.5z"/><path d="m4.6 12.4 7.4 3.9 7.4-3.9"/><path d="m4.6 16.6 7.4 3.9 7.4-3.9"/>'),
  clock: wrap('<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 2"/>'),
  terminal: wrap('<rect x="3" y="4.5" width="18" height="15" rx="2.6"/><path d="m7.4 9.6 2.6 2.4-2.6 2.4"/><path d="M12.8 14.6h3.8"/>'),
  external: wrap('<path d="M13.5 4.5h6v6"/><path d="m19.5 4.5-8 8"/><path d="M18 14v4.2a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V7.8A1.8 1.8 0 0 1 5.8 6H10"/>'),
  server: wrap('<rect x="3.5" y="4" width="17" height="6.4" rx="2"/><rect x="3.5" y="13.6" width="17" height="6.4" rx="2"/><path d="M7 7.2h.01M7 16.8h.01"/>'),
  power: wrap('<path d="M12 3.5v8"/><path d="M7 6.2a8 8 0 1 0 10 0"/>'),
  chevron: wrap('<path d="m8.5 5.5 6.5 6.5-6.5 6.5"/>'),
  signal: wrap('<path d="M4.5 19.5v-4"/><path d="M9.5 19.5v-8"/><path d="M14.5 19.5v-12"/><path d="M19.5 19.5v-16"/>'),
  gauge: wrap('<path d="M4.2 17.5a8.4 8.4 0 1 1 15.6 0"/><path d="m12 13.5 3.6-4.2"/><circle cx="12" cy="14.6" r="1.5"/>'),
  branch: wrap('<circle cx="6.5" cy="6" r="2.2"/><circle cx="6.5" cy="18" r="2.2"/><circle cx="17.5" cy="8.5" r="2.2"/><path d="M6.5 8.2v7.6"/><path d="M17.5 10.7c0 3.1-2.4 5.3-6 6.3"/>'),
  search: wrap('<circle cx="11" cy="11" r="6.4"/><path d="m16 16 4.2 4.2"/>'),
  filter: wrap('<path d="M4 5.5h16l-6 7.2v5.6l-4 2v-7.6L4 5.5z"/>')
};

function icon(name, extraClass = '') {
  const raw = ICONS[name] || ICONS.dashboard;
  return extraClass ? raw.replace('class="mi ', `class="mi ${extraClass} `) : raw;
}

const SHIELD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-shield-svg">
  <circle cx="32" cy="32" r="30" fill="#08110b" stroke="#65a30d" stroke-width="1.5" stroke-opacity="0.65"/>
  <circle cx="32" cy="32" r="24" fill="#0c1a12"/>
  <path d="M32 16L44 21.2V30.8C44 39.4 38.88 46.84 32 49.5C25.12 46.84 20 39.4 20 30.8V21.2L32 16Z" stroke="#b5ff4d" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M27.4 31.6L30.8 35L37 28.6" stroke="#b5ff4d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const CLOUD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-cloud-svg">
  <rect x="4" y="4" width="56" height="56" rx="18" fill="#080d09" stroke="#3f6212" stroke-width="1.6"/>
  <path d="M25.5 42H40.5C44.6421 42 48 38.6421 48 34.5C48 30.491 44.8544 27.2165 40.8926 27.0104C39.2471 21.7876 34.3652 18 28.6 18C21.4203 18 15.6 23.8203 15.6 31C15.6 37.0751 20.1249 42 25.5 42Z" stroke="#b5ff4d" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const FAVICON_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#05080a" stroke="#a3e635" stroke-width="3"/><path d="M32 15L45 20.5V30.8C45 39.8 39.5 47.5 32 50.5C24.5 47.5 19 39.8 19 30.8V20.5L32 15Z" fill="none" stroke="#b5ff4d" stroke-width="4" stroke-linejoin="round"/></svg>`
)}`;


// --- MODULE: src/db/d1.js ---
// ============================================================================
// miliconfig v3.1 - لایه دیتابیس Cloudflare D1 با Auto-Migration،
// محدودیت سقف ۳ کاربر، سیستم رمز عبور مدیر و Fallback هوشمند
// ============================================================================


// حافظه کش داخلی هر Isolate جهت کارکرد بدون وقفه و حداکثر سرعت
const memoryStore = {
  initialized: false,
  d1SchemaReady: false,
  bootTime: Date.now(),
  globalConfig: {},
  users: new Map(),
  auditLogs: [],
  trafficHourly: new Map(),
  lastSyncAt: 0,
  adminPasswordHash: '',
  adminPath: ''
};

function detectD1Binding(env) {
  if (!env || typeof env !== 'object') return null;
  const priorityNames = ['DB', 'D1', 'db', 'd1', 'MILICONFIG_DB', 'miliconfig_db', 'DATABASE', 'database'];
  for (const name of priorityNames) {
    const candidate = env[name];
    if (candidate && typeof candidate === 'object' && typeof candidate.prepare === 'function') {
      return { db: candidate, bindingName: name };
    }
  }
  for (const [key, val] of Object.entries(env)) {
    if (val && typeof val === 'object' && typeof val.prepare === 'function') {
      return { db: val, bindingName: key };
    }
  }
  return null;
}

function detectKvBinding(env) {
  if (!env || typeof env !== 'object') return null;
  const priorityNames = ['C', 'c', 'KV', 'kv', 'MILICONFIG_KV'];
  for (const name of priorityNames) {
    const candidate = env[name];
    if (
      candidate &&
      typeof candidate === 'object' &&
      typeof candidate.get === 'function' &&
      typeof candidate.put === 'function' &&
      typeof candidate.prepare !== 'function'
    ) {
      return { kv: candidate, bindingName: name };
    }
  }
  for (const [key, val] of Object.entries(env)) {
    if (
      val &&
      typeof val === 'object' &&
      typeof val.get === 'function' &&
      typeof val.put === 'function' &&
      typeof val.prepare !== 'function'
    ) {
      return { kv: val, bindingName: key };
    }
  }
  return null;
}

function safeBind(stmt, ...params) {
  const sanitized = params.map(p => {
    if (p === undefined) return null;
    if (typeof p === 'number' && !Number.isFinite(p)) return 0;
    if (typeof p === 'boolean') return p ? 1 : 0;
    return p;
  });
  return stmt.bind(...sanitized);
}

function getAdminUuid(env = {}) {
  // UUID پیش‌فرض عمومی حذف شده است؛ فقط مقدار محیطی یا مسیر رندوم همین نصب
  const raw = env?.u || env?.U || env?.UUID || env?.uuid || memoryStore.adminPath || '';
  return String(raw).trim().toLowerCase();
}

// UUID کاربر اولیه: همیشه رندوم — هرگز UUID پیش‌فرض قدیمی
function generateSeedUuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return generateUuidV4();
}

// مسیر مدیریت بدون UUID پیش‌فرض عمومی:
// اگر متغیر محیطی u/UUID تنظیم نشده باشد، یک UUID رندوم یکتا برای همین نصب ساخته
// و در D1/KV ذخیره می‌شود؛ بنابراین هیچ مسیر قابل حدسی روی استقرار وجود ندارد.
async function getOrCreateAdminPath(env = {}) {
  const envValue = env?.u || env?.U || env?.UUID || env?.uuid;
  if (envValue && String(envValue).trim()) {
    return String(envValue).trim().toLowerCase();
  }
  if (memoryStore.adminPath) return memoryStore.adminPath;

  await ensureD1Schema(env);
  const key = 'admin_path';
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const row = await detectedD1.db.prepare('SELECT value FROM system_config WHERE key = ?').bind(key).first();
      if (row && row.value) {
        memoryStore.adminPath = String(row.value).trim().toLowerCase();
        return memoryStore.adminPath;
      }
    } catch (_e) {}
  }

  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try {
      const kvVal = await detectedKv.kv.get(key);
      if (kvVal) {
        memoryStore.adminPath = String(kvVal).trim().toLowerCase();
        return memoryStore.adminPath;
      }
    } catch (_e) {}
  }

  const generated = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : generateUuidV4();
  memoryStore.adminPath = generated;

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await detectedD1.db.prepare(
        'INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
      ).bind(key, generated, Date.now()).run();
    } catch (_e) {}
  }
  if (detectedKv) {
    try { await detectedKv.kv.put(key, generated); } catch (_e) {}
  }
  return generated;
}

// توکن نشست مدیریت: مشتق‌شده از هش رمز عبور (با تغییر رمز، نشست‌های قبلی باطل می‌شوند)
async function buildAdminSessionToken(env = {}) {
  const hash = await getAdminPasswordHash(env);
  if (!hash) return '';
  return (await sha256Hex(hash + '::mili-session::v1')).slice(0, 40);
}

async function verifyAdminSession(env = {}, token = '') {
  const clean = String(token || '').trim();
  if (!clean) return false;
  const expected = await buildAdminSessionToken(env);
  return Boolean(expected) && clean === expected;
}

// چرخش مسیر مدیریت: تولید UUID جدید و ذخیره آن (امکان تغییر مسیر در هر زمان)
async function rotateAdminPath(env = {}) {
  await ensureD1Schema(env);
  const generated = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : generateUuidV4();
  memoryStore.adminPath = generated;

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await detectedD1.db.prepare(
        'INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
      ).bind('admin_path', generated, Date.now()).run();
    } catch (_e) {}
  }
  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try { await detectedKv.kv.put('admin_path', generated); } catch (_e) {}
  }
  await addAuditLog(env, 'چرخش مسیر مدیریت', 'Admin path rotated', '');
  return generated;
}

// ساخت خودکار جداول D1 (Auto-Migration)
async function ensureD1Schema(env = {}, force = false) {
  const detected = detectD1Binding(env);
  if (!detected) {
    ensureMemorySeeded(env);
    return { d1Enabled: false, bindingName: null, migrated: false };
  }
  const { db, bindingName } = detected;
  if (memoryStore.d1SchemaReady && !force) {
    return { d1Enabled: true, bindingName, migrated: true };
  }

  const ddlStatements = [
    `CREATE TABLE IF NOT EXISTS system_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      uuid TEXT NOT NULL UNIQUE,
      sub_node_count INTEGER NOT NULL DEFAULT 50,
      status TEXT NOT NULL DEFAULT 'active',
      enabled INTEGER NOT NULL DEFAULT 1,
      data_limit_gb REAL NOT NULL DEFAULT 0,
      used_bytes INTEGER NOT NULL DEFAULT 0,
      lifetime_bytes INTEGER NOT NULL DEFAULT 0,
      request_count INTEGER NOT NULL DEFAULT 0,
      expire_days INTEGER NOT NULL DEFAULT 0,
      expire_at INTEGER NOT NULL DEFAULT 0,
      start_on_first_use INTEGER NOT NULL DEFAULT 1,
      first_connected_at INTEGER NOT NULL DEFAULT 0,
      ip_limit INTEGER NOT NULL DEFAULT 50,
      node_scope TEXT NOT NULL DEFAULT 'all',
      preset TEXT NOT NULL DEFAULT 'iran-fast',
      note TEXT DEFAULT '',
      config_json TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS preferred_nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT NOT NULL,
      port INTEGER NOT NULL DEFAULT 443,
      name TEXT NOT NULL,
      colo TEXT DEFAULT '',
      latency INTEGER DEFAULT 0,
      source TEXT DEFAULT 'manual',
      created_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      detail TEXT NOT NULL,
      ip TEXT DEFAULT '',
      created_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS traffic_hourly (
      hour_key TEXT PRIMARY KEY,
      bytes INTEGER NOT NULL DEFAULT 0,
      requests INTEGER NOT NULL DEFAULT 0
    )`
  ];

  try {
    for (const sql of ddlStatements) {
      await db.prepare(sql).run();
    }
    memoryStore.d1SchemaReady = true;

    // بررسی وجود کاربر اولیه
    const countRow = await db.prepare(`SELECT COUNT(*) as cnt FROM users`).first();
    const totalUsers = Number(countRow?.cnt || 0);
    if (totalUsers === 0) {
      const adminUuid = generateSeedUuid();
      const envSnap = getEnvConfigSnapshot(env);
      const defaultUserConfig = buildUserDefaultConfig(envSnap, 'iran-fast', { subNodeCount: 50 });
      const now = Date.now();
      const firstId = generateShortId('mili');
      await safeBind(
        db.prepare(
          `INSERT OR IGNORE INTO users (
            id, username, uuid, sub_node_count, status, enabled,
            data_limit_gb, used_bytes, lifetime_bytes, request_count,
            expire_days, expire_at, start_on_first_use, first_connected_at,
            ip_limit, node_scope, preset, note, config_json, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ),
        firstId,
        firstId,
        adminUuid,
        50,
        'active',
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        50,
        'all',
        'iran-fast',
        'کاربر اولیه پیش‌فرض miliconfig',
        JSON.stringify(defaultUserConfig),
        now,
        now
      ).run();

      await addAuditLog(env, 'ساخت خودکار دیتابیس D1', `${firstId} · iran-fast`, 'system');
    }

    return { d1Enabled: true, bindingName, migrated: true };
  } catch (err) {
    ensureMemorySeeded(env);
    return {
      d1Enabled: false,
      bindingName,
      migrated: false,
      error: err?.message || String(err)
    };
  }
}

function ensureMemorySeeded(env = {}) {
  if (memoryStore.initialized) return;
  memoryStore.initialized = true;
  const adminUuid = generateSeedUuid();
  const envSnap = getEnvConfigSnapshot(env);
  memoryStore.globalConfig = { ...envSnap };

  if (memoryStore.users.size === 0) {
    const now = Date.now();
    const firstId = 'mili-default';
    const cfg = buildUserDefaultConfig(envSnap, 'iran-fast', { subNodeCount: 50 });
    memoryStore.users.set(firstId, {
      id: firstId,
      username: firstId,
      uuid: adminUuid,
      subNodeCount: 50,
      status: 'active',
      enabled: true,
      dataLimitGb: 0,
      usedBytes: 0,
      lifetimeBytes: 0,
      requestCount: 0,
      expireDays: 0,
      expireAt: 0,
      startOnFirstUse: true,
      firstConnectedAt: 0,
      ipLimit: 50,
      nodeScope: 'all',
      preset: 'iran-fast',
      note: 'کاربر اولیه پیش‌فرض miliconfig',
      config: cfg,
      createdAt: now,
      updatedAt: now
    });
    memoryStore.auditLogs.unshift({
      id: 1,
      action: 'راه‌اندازی اولیه سیستم',
      detail: `${firstId} · iran-fast`,
      ip: '127.0.0.1',
      createdAt: now
    });
  }
}

function mapUserRow(row) {
  if (!row) return null;
  let parsedConfig = {};
  try {
    parsedConfig = typeof row.config_json === 'string' ? JSON.parse(row.config_json) : (row.config_json || row.config || {});
  } catch (_e) {
    parsedConfig = {};
  }
  const subNodeCount = Number.isFinite(Number(row.sub_node_count ?? row.subNodeCount))
    ? Number(row.sub_node_count ?? row.subNodeCount)
    : Number(parsedConfig.subNodeCount ?? 50);
  const effectiveConfig = normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...parsedConfig,
    subNodeCount
  });
  return {
    id: String(row.id),
    username: String(row.username || row.id),
    uuid: String(row.uuid || '').toLowerCase(),
    subNodeCount,
    status: String(row.status || 'active'),
    enabled: Boolean(row.enabled === undefined ? true : Number(row.enabled) !== 0),
    dataLimitGb: Number(row.data_limit_gb ?? row.dataLimitGb ?? 0),
    usedBytes: Number(row.used_bytes ?? row.usedBytes ?? 0),
    lifetimeBytes: Number(row.lifetime_bytes ?? row.lifetimeBytes ?? 0),
    requestCount: Number(row.request_count ?? row.requestCount ?? 0),
    expireDays: Number(row.expire_days ?? row.expireDays ?? 0),
    expireAt: Number(row.expire_at ?? row.expireAt ?? 0),
    startOnFirstUse: Boolean(row.start_on_first_use === undefined ? (row.startOnFirstUse ?? true) : Number(row.start_on_first_use) !== 0),
    firstConnectedAt: Number(row.first_connected_at ?? row.firstConnectedAt ?? 0),
    ipLimit: Number(row.ip_limit ?? row.ipLimit ?? 50),
    nodeScope: String(row.node_scope || row.nodeScope || 'all'),
    preset: String(row.preset || 'iran-fast'),
    note: String(row.note || ''),
    config: effectiveConfig,
    createdAt: Number(row.created_at ?? row.createdAt ?? Date.now()),
    updatedAt: Number(row.updated_at ?? row.updatedAt ?? Date.now())
  };
}

// ============================================================================
// مدیریت سیستم رمز عبور مدیر (بررسی، راه‌اندازی اول، تغییر پسورد)
// ============================================================================
async function getAdminPasswordHash(env = {}) {
  await ensureD1Schema(env);
  if (memoryStore.adminPasswordHash) return memoryStore.adminPasswordHash;

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const row = await detectedD1.db.prepare(`SELECT value FROM system_config WHERE key = 'admin_password_hash'`).first();
      if (row && row.value) {
        memoryStore.adminPasswordHash = String(row.value).trim();
        return memoryStore.adminPasswordHash;
      }
    } catch (_e) {}
  }

  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try {
      const kvVal = await detectedKv.kv.get('admin_password_hash');
      if (kvVal) {
        memoryStore.adminPasswordHash = String(kvVal).trim();
        return memoryStore.adminPasswordHash;
      }
    } catch (_e) {}
  }

  return memoryStore.adminPasswordHash || '';
}

async function hasAdminPassword(env = {}) {
  const hash = await getAdminPasswordHash(env);
  return Boolean(hash && hash.length > 0);
}

async function setAdminPassword(env = {}, plainPassword, clientIp = '') {
  if (!plainPassword || String(plainPassword).trim().length < 4) {
    throw new Error('رمز عبور باید حداقل ۴ کاراکتر باشد.');
  }
  // اطمینان از آماده بودن اسکیما پیش از نوشتن؛ رفع باگ «فراموش شدن رمز»
  await ensureD1Schema(env);
  const cleanPass = String(plainPassword).trim();
  const hash = await sha256Hex(cleanPass);
  memoryStore.adminPasswordHash = hash;

  const now = Date.now();
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO system_config (key, value, updated_at) VALUES ('admin_password_hash', ?, ?)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
        ),
        hash,
        now
      ).run();
    } catch (_e) {}
  }

  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try {
      await detectedKv.kv.put('admin_password_hash', hash);
    } catch (_e) {}
  }

  await addAuditLog(env, 'تعیین رمز عبور مدیر', 'Admin password updated', clientIp);
  return true;
}

async function verifyAdminPassword(env = {}, candidatePassword) {
  const cleanPass = String(candidatePassword || '').trim();
  if (!cleanPass) return false;
  const hash = await getAdminPasswordHash(env);
  if (!hash) return false;
  const candHash = await sha256Hex(cleanPass);
  return candHash === hash;
}

async function changeAdminPassword(env = {}, currentPassword, newPassword, clientIp = '') {
  const isMatch = await verifyAdminPassword(env, currentPassword);
  if (!isMatch) {
    throw new Error('رمز عبور فعلی نادرست است.');
  }
  return await setAdminPassword(env, newPassword, clientIp);
}

// تنظیمات سراسری پنل
async function loadGlobalConfig(env = {}, force = false) {
  await ensureD1Schema(env);
  const envSnap = getEnvConfigSnapshot(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);

  if (!force && memoryStore.lastSyncAt > 0 && Date.now() - memoryStore.lastSyncAt < 15000) {
    return normalizeEffectiveConfig({
      ...CONFIG_DEFAULTS,
      ...envSnap,
      ...memoryStore.globalConfig
    });
  }

  let stored = {};
  if (detectedKv) {
    try {
      const kvRaw = await detectedKv.kv.get('c');
      if (kvRaw) stored = { ...stored, ...JSON.parse(kvRaw) };
    } catch (_e) {}
  }

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await detectedD1.db.prepare(`SELECT key, value FROM system_config`).all();
      const rows = res?.results || [];
      for (const r of rows) {
        if (r && r.key) {
          stored[r.key] = r.value;
        }
      }
    } catch (_e) {}
  }

  memoryStore.globalConfig = { ...memoryStore.globalConfig, ...stored };
  memoryStore.lastSyncAt = Date.now();
  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...envSnap,
    ...memoryStore.globalConfig
  });
}

async function saveGlobalConfig(env = {}, newValues = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);
  const now = Date.now();

  for (const [k, v] of Object.entries(newValues || {})) {
    if (v === '' || v === null || v === undefined) {
      delete memoryStore.globalConfig[k];
    } else {
      memoryStore.globalConfig[k] = String(v);
    }
  }

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      for (const [k, v] of Object.entries(newValues || {})) {
        if (v === '' || v === null || v === undefined) {
          await safeBind(detectedD1.db.prepare(`DELETE FROM system_config WHERE key = ?`), k).run();
        } else {
          await safeBind(
            detectedD1.db.prepare(
              `INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?)
               ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
            ),
            k,
            String(v),
            now
          ).run();
        }
      }
    } catch (_e) {}
  }

  if (detectedKv) {
    try {
      await detectedKv.kv.put('c', JSON.stringify(memoryStore.globalConfig));
      await detectedKv.kv.put('c_ver', String(now));
    } catch (_e) {}
  }

  memoryStore.lastSyncAt = now;
  return await loadGlobalConfig(env, true);
}

async function resetGlobalConfig(env = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);
  memoryStore.globalConfig = {};

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await detectedD1.db.prepare(`DELETE FROM system_config WHERE key != 'admin_password_hash'`).run();
    } catch (_e) {}
  }
  if (detectedKv) {
    try {
      await detectedKv.kv.put('c', JSON.stringify({}));
      await detectedKv.kv.put('c_ver', String(Date.now()));
    } catch (_e) {}
  }
  memoryStore.lastSyncAt = Date.now();
  return await loadGlobalConfig(env, true);
}

// لیست کاربران
async function listUsers(env = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await detectedD1.db.prepare(`SELECT * FROM users ORDER BY created_at DESC`).all();
      const users = (res?.results || []).map(mapUserRow).filter(Boolean);
      memoryStore.users.clear();
      for (const u of users) memoryStore.users.set(u.id, u);
      return users;
    } catch (_e) {}
  }

  ensureMemorySeeded(env);
  return Array.from(memoryStore.users.values()).sort((a, b) => b.createdAt - a.createdAt);
}

async function getUserByIdOrToken(env = {}, token = '') {
  if (!token) return null;
  const clean = String(token).trim();
  const cleanLower = clean.toLowerCase().replace(/^\/+|\/+$/g, '');
  const users = await listUsers(env);
  for (const u of users) {
    if (
      u.id.toLowerCase() === cleanLower ||
      u.uuid.toLowerCase() === cleanLower ||
      u.username.toLowerCase() === cleanLower ||
      (u.config?.d && u.config.d.trim().replace(/^\/+|\/+$/g, '').toLowerCase() === cleanLower)
    ) {
      return u;
    }
  }
  return null;
}

// ایجاد کاربر جدید با قفل سخت‌گیرانه حداکثر ۳ کاربر
async function createUser(env = {}, payload = {}, clientIp = '') {
  await ensureD1Schema(env);

  // محدودیت قطعی حداکثر ۳ کاربر طبق درخواست کاربر
  const currentUsers = await listUsers(env);
  if (currentUsers.length >= MAX_USERS_LIMIT) {
    throw new Error(`سقف مجاز ایجاد کاربر (حداکثر ${MAX_USERS_LIMIT} کاربر) پر شده است. برای افزودن کاربر جدید، لطفاً یکی از کاربران قبلی را حذف کنید.`);
  }

  const globalCfg = await loadGlobalConfig(env);
  const now = Date.now();

  const presetId = payload.preset || 'iran-fast';
  const rawName = String(payload.username || payload.name || '').trim();
  const id = payload.id && String(payload.id).trim() ? String(payload.id).trim() : generateShortId('mili');
  const username = rawName || id;
  const uuid = isValidUuid(payload.uuid) ? String(payload.uuid).trim().toLowerCase() : generateUuidV4();

  const subNodeCountRaw = parseInt(payload.subNodeCount ?? payload.config?.subNodeCount ?? globalCfg.subNodeCount ?? 50, 10);
  const subNodeCount = Number.isFinite(subNodeCountRaw) && subNodeCountRaw >= 0 ? subNodeCountRaw : 50;

  const mergedUserConfig = buildUserDefaultConfig(
    payload.usePanelDefaults !== false ? globalCfg : CONFIG_DEFAULTS,
    presetId,
    {
      ...(payload.config || {}),
      wk: payload.wk ?? payload.config?.wk ?? globalCfg.wk ?? CONFIG_DEFAULTS.wk,
      ev: payload.ev ?? payload.config?.ev ?? globalCfg.ev ?? CONFIG_DEFAULTS.ev,
      et: payload.et ?? payload.config?.et ?? globalCfg.et ?? CONFIG_DEFAULTS.et,
      ex: payload.ex ?? payload.config?.ex ?? globalCfg.ex ?? CONFIG_DEFAULTS.ex,
      es: payload.es ?? payload.config?.es ?? globalCfg.es ?? CONFIG_DEFAULTS.es,
      sspass: payload.sspass ?? payload.config?.sspass ?? globalCfg.sspass ?? '',
      ssmethod: payload.ssmethod ?? payload.config?.ssmethod ?? globalCfg.ssmethod ?? 'chacha20-ietf-poly1305',
      ech: payload.ech ?? payload.config?.ech ?? globalCfg.ech ?? CONFIG_DEFAULTS.ech,
      tp: payload.tp ?? payload.config?.tp ?? globalCfg.tp ?? CONFIG_DEFAULTS.tp,
      customDNS: payload.customDNS ?? payload.config?.customDNS ?? globalCfg.customDNS ?? CONFIG_DEFAULTS.customDNS,
      customECHDomain: payload.customECHDomain ?? payload.config?.customECHDomain ?? globalCfg.customECHDomain ?? CONFIG_DEFAULTS.customECHDomain,
      alpn: payload.alpn ?? payload.config?.alpn ?? globalCfg.alpn ?? CONFIG_DEFAULTS.alpn,
      d: payload.d ?? payload.config?.d ?? '',
      p: payload.p ?? payload.config?.p ?? globalCfg.p ?? CONFIG_DEFAULTS.p,
      yx: payload.yx ?? payload.config?.yx ?? globalCfg.yx ?? CONFIG_DEFAULTS.yx,
      yxURL: payload.yxURL ?? payload.config?.yxURL ?? globalCfg.yxURL ?? CONFIG_DEFAULTS.yxURL,
      s: payload.s ?? payload.config?.s ?? globalCfg.s ?? CONFIG_DEFAULTS.s,
      homepage: payload.homepage ?? payload.config?.homepage ?? globalCfg.homepage ?? CONFIG_DEFAULTS.homepage,
      scu: payload.scu ?? payload.config?.scu ?? globalCfg.scu ?? CONFIG_DEFAULTS.scu,
      ena: payload.ena ?? payload.config?.ena ?? globalCfg.ena ?? CONFIG_DEFAULTS.ena,
      epd: payload.epd ?? payload.config?.epd ?? globalCfg.epd ?? CONFIG_DEFAULTS.epd,
      epi: payload.epi ?? payload.config?.epi ?? globalCfg.epi ?? CONFIG_DEFAULTS.epi,
      egi: payload.egi ?? payload.config?.egi ?? globalCfg.egi ?? CONFIG_DEFAULTS.egi,
      ae: payload.ae ?? payload.config?.ae ?? globalCfg.ae ?? CONFIG_DEFAULTS.ae,
      rm: payload.rm ?? payload.config?.rm ?? globalCfg.rm ?? CONFIG_DEFAULTS.rm,
      qj: payload.qj ?? payload.config?.qj ?? globalCfg.qj ?? CONFIG_DEFAULTS.qj,
      dkby: payload.dkby ?? payload.config?.dkby ?? globalCfg.dkby ?? CONFIG_DEFAULTS.dkby,
      yxby: payload.yxby ?? payload.config?.yxby ?? globalCfg.yxby ?? CONFIG_DEFAULTS.yxby,
      ipv4: payload.ipv4 ?? payload.config?.ipv4 ?? globalCfg.ipv4 ?? CONFIG_DEFAULTS.ipv4,
      ipv6: payload.ipv6 ?? payload.config?.ipv6 ?? globalCfg.ipv6 ?? CONFIG_DEFAULTS.ipv6,
      ispMobile: payload.ispMobile ?? payload.config?.ispMobile ?? globalCfg.ispMobile ?? CONFIG_DEFAULTS.ispMobile,
      ispUnicom: payload.ispUnicom ?? payload.config?.ispUnicom ?? globalCfg.ispUnicom ?? CONFIG_DEFAULTS.ispUnicom,
      ispTelecom: payload.ispTelecom ?? payload.config?.ispTelecom ?? globalCfg.ispTelecom ?? CONFIG_DEFAULTS.ispTelecom,
      jk: payload.jk ?? payload.config?.jk ?? globalCfg.jk ?? CONFIG_DEFAULTS.jk,
      fp: payload.fp ?? payload.config?.fp ?? globalCfg.fp ?? 'chrome',
      patt: payload.patt ?? payload.config?.patt ?? globalCfg.patt ?? '/?ed=2048',
      fragmentPreset: payload.fragmentPreset ?? payload.config?.fragmentPreset ?? globalCfg.fragmentPreset ?? 'mci',
      fragmentLength: payload.fragmentLength ?? payload.config?.fragmentLength ?? globalCfg.fragmentLength ?? '100-200',
      fragmentInterval: payload.fragmentInterval ?? payload.config?.fragmentInterval ?? globalCfg.fragmentInterval ?? '10-20',
      fragmentPackets: payload.fragmentPackets ?? payload.config?.fragmentPackets ?? globalCfg.fragmentPackets ?? 'tlshello',
      ipRotation: payload.ipRotation ?? payload.config?.ipRotation ?? globalCfg.ipRotation ?? 15,
      subNodeCount
    }
  );

  const dataLimitGb = Math.max(0, Number(payload.dataLimitGb ?? 0) || 0);
  const expireDays = Math.max(0, parseInt(payload.expireDays ?? 0, 10) || 0);
  const startOnFirstUse = payload.startOnFirstUse !== undefined ? Boolean(payload.startOnFirstUse) : true;
  const expireAt = !startOnFirstUse && expireDays > 0 ? now + expireDays * 86400 * 1000 : 0;
  const ipLimit = Math.max(1, parseInt(payload.ipLimit ?? 50, 10) || 50);
  const nodeScope = String(payload.nodeScope || 'all');
  const enabled = payload.enabled !== undefined ? Boolean(payload.enabled) : true;
  const note = String(payload.note || '');

  const userObj = {
    id,
    username,
    uuid,
    subNodeCount,
    status: enabled ? 'active' : 'disabled',
    enabled,
    dataLimitGb,
    usedBytes: 0,
    lifetimeBytes: 0,
    requestCount: 0,
    expireDays,
    expireAt,
    startOnFirstUse,
    firstConnectedAt: 0,
    ipLimit,
    nodeScope,
    preset: presetId,
    note,
    config: mergedUserConfig,
    createdAt: now,
    updatedAt: now
  };

  memoryStore.users.set(id, userObj);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO users (
            id, username, uuid, sub_node_count, status, enabled,
            data_limit_gb, used_bytes, lifetime_bytes, request_count,
            expire_days, expire_at, start_on_first_use, first_connected_at,
            ip_limit, node_scope, preset, note, config_json, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ),
        userObj.id,
        userObj.username,
        userObj.uuid,
        userObj.subNodeCount,
        userObj.status,
        userObj.enabled ? 1 : 0,
        userObj.dataLimitGb,
        0,
        0,
        0,
        userObj.expireDays,
        userObj.expireAt,
        userObj.startOnFirstUse ? 1 : 0,
        0,
        userObj.ipLimit,
        userObj.nodeScope,
        userObj.preset,
        userObj.note,
        JSON.stringify(userObj.config),
        now,
        now
      ).run();
    } catch (_e) {}
  }

  await addAuditLog(env, 'ساخت کاربر جدید', `${userObj.username} (${currentUsers.length + 1}/3)`, clientIp);
  return userObj;
}

async function updateUser(env = {}, userId, payload = {}, clientIp = '') {
  const existing = await getUserByIdOrToken(env, userId);
  if (!existing) return null;
  const now = Date.now();

  const subNodeCountRaw = parseInt(
    payload.subNodeCount ?? payload.config?.subNodeCount ?? existing.subNodeCount ?? 50,
    10
  );
  const subNodeCount = Number.isFinite(subNodeCountRaw) && subNodeCountRaw >= 0 ? subNodeCountRaw : existing.subNodeCount;

  const updatedConfig = normalizeEffectiveConfig({
    ...existing.config,
    ...(payload.config || {}),
    ...(payload.wk !== undefined ? { wk: payload.wk } : {}),
    ...(payload.ev !== undefined ? { ev: payload.ev } : {}),
    ...(payload.et !== undefined ? { et: payload.et } : {}),
    ...(payload.ex !== undefined ? { ex: payload.ex } : {}),
    ...(payload.es !== undefined ? { es: payload.es } : {}),
    ...(payload.sspass !== undefined ? { sspass: payload.sspass } : {}),
    ...(payload.ssmethod !== undefined ? { ssmethod: payload.ssmethod } : {}),
    ...(payload.ech !== undefined ? { ech: payload.ech } : {}),
    ...(payload.tp !== undefined ? { tp: payload.tp } : {}),
    ...(payload.customDNS !== undefined ? { customDNS: payload.customDNS } : {}),
    ...(payload.customECHDomain !== undefined ? { customECHDomain: payload.customECHDomain } : {}),
    ...(payload.alpn !== undefined ? { alpn: payload.alpn } : {}),
    ...(payload.d !== undefined ? { d: payload.d } : {}),
    ...(payload.p !== undefined ? { p: payload.p } : {}),
    ...(payload.yx !== undefined ? { yx: payload.yx } : {}),
    ...(payload.yxURL !== undefined ? { yxURL: payload.yxURL } : {}),
    ...(payload.s !== undefined ? { s: payload.s } : {}),
    ...(payload.homepage !== undefined ? { homepage: payload.homepage } : {}),
    ...(payload.scu !== undefined ? { scu: payload.scu } : {}),
    ...(payload.ena !== undefined ? { ena: payload.ena } : {}),
    ...(payload.epd !== undefined ? { epd: payload.epd } : {}),
    ...(payload.epi !== undefined ? { epi: payload.epi } : {}),
    ...(payload.egi !== undefined ? { egi: payload.egi } : {}),
    ...(payload.ae !== undefined ? { ae: payload.ae } : {}),
    ...(payload.rm !== undefined ? { rm: payload.rm } : {}),
    ...(payload.qj !== undefined ? { qj: payload.qj } : {}),
    ...(payload.dkby !== undefined ? { dkby: payload.dkby } : {}),
    ...(payload.yxby !== undefined ? { yxby: payload.yxby } : {}),
    ...(payload.ipv4 !== undefined ? { ipv4: payload.ipv4 } : {}),
    ...(payload.ipv6 !== undefined ? { ipv6: payload.ipv6 } : {}),
    ...(payload.ispMobile !== undefined ? { ispMobile: payload.ispMobile } : {}),
    ...(payload.ispUnicom !== undefined ? { ispUnicom: payload.ispUnicom } : {}),
    ...(payload.ispTelecom !== undefined ? { ispTelecom: payload.ispTelecom } : {}),
    ...(payload.jk !== undefined ? { jk: payload.jk } : {}),
    ...(payload.fp !== undefined ? { fp: payload.fp } : {}),
    ...(payload.patt !== undefined ? { patt: payload.patt } : {}),
    ...(payload.fragmentPreset !== undefined ? { fragmentPreset: payload.fragmentPreset } : {}),
    ...(payload.fragmentLength !== undefined ? { fragmentLength: payload.fragmentLength } : {}),
    ...(payload.fragmentInterval !== undefined ? { fragmentInterval: payload.fragmentInterval } : {}),
    ...(payload.fragmentPackets !== undefined ? { fragmentPackets: payload.fragmentPackets } : {}),
    ...(payload.ipRotation !== undefined ? { ipRotation: payload.ipRotation } : {}),
    subNodeCount
  });

  const enabled = payload.enabled !== undefined ? Boolean(payload.enabled) : existing.enabled;
  const expireDays = payload.expireDays !== undefined ? Math.max(0, parseInt(payload.expireDays, 10) || 0) : existing.expireDays;
  const startOnFirstUse = payload.startOnFirstUse !== undefined ? Boolean(payload.startOnFirstUse) : existing.startOnFirstUse;
  let expireAt = existing.expireAt;
  if (payload.expireDays !== undefined) {
    expireAt = !startOnFirstUse && expireDays > 0 ? now + expireDays * 86400 * 1000 : 0;
  }

  const updated = {
    ...existing,
    username: payload.username !== undefined && String(payload.username).trim() ? String(payload.username).trim() : existing.username,
    uuid: payload.uuid && isValidUuid(payload.uuid) ? String(payload.uuid).trim().toLowerCase() : existing.uuid,
    subNodeCount,
    enabled,
    status: enabled ? 'active' : 'disabled',
    dataLimitGb: payload.dataLimitGb !== undefined ? Math.max(0, Number(payload.dataLimitGb) || 0) : existing.dataLimitGb,
    expireDays,
    expireAt,
    startOnFirstUse,
    ipLimit: payload.ipLimit !== undefined ? Math.max(1, parseInt(payload.ipLimit, 10) || 50) : existing.ipLimit,
    nodeScope: payload.nodeScope !== undefined ? String(payload.nodeScope) : existing.nodeScope,
    preset: payload.preset !== undefined ? String(payload.preset) : existing.preset,
    note: payload.note !== undefined ? String(payload.note) : existing.note,
    config: updatedConfig,
    updatedAt: now
  };

  memoryStore.users.set(existing.id, updated);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `UPDATE users SET
            username = ?, uuid = ?, sub_node_count = ?, status = ?, enabled = ?,
            data_limit_gb = ?, expire_days = ?, expire_at = ?, start_on_first_use = ?,
            ip_limit = ?, node_scope = ?, preset = ?, note = ?, config_json = ?, updated_at = ?
           WHERE id = ?`
        ),
        updated.username,
        updated.uuid,
        updated.subNodeCount,
        updated.status,
        updated.enabled ? 1 : 0,
        updated.dataLimitGb,
        updated.expireDays,
        updated.expireAt,
        updated.startOnFirstUse ? 1 : 0,
        updated.ipLimit,
        updated.nodeScope,
        updated.preset,
        updated.note,
        JSON.stringify(updated.config),
        now,
        existing.id
      ).run();
    } catch (_e) {}
  }

  await addAuditLog(env, 'ویرایش کاربر', `${updated.username}`, clientIp);
  return updated;
}

async function resetUserStats(env = {}, userId, clientIp = '') {
  const existing = await getUserByIdOrToken(env, userId);
  if (!existing) return null;
  const now = Date.now();
  const updated = {
    ...existing,
    usedBytes: 0,
    requestCount: 0,
    firstConnectedAt: 0,
    expireAt: !existing.startOnFirstUse && existing.expireDays > 0 ? now + existing.expireDays * 86400 * 1000 : 0,
    updatedAt: now
  };
  memoryStore.users.set(existing.id, updated);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `UPDATE users SET used_bytes = 0, request_count = 0, first_connected_at = 0, expire_at = ?, updated_at = ? WHERE id = ?`
        ),
        updated.expireAt,
        now,
        existing.id
      ).run();
    } catch (_e) {}
  }
  await addAuditLog(env, 'صفر کردن مصرف کاربر', `${existing.username}`, clientIp);
  return updated;
}

async function deleteUser(env = {}, userId, clientIp = '') {
  const existing = await getUserByIdOrToken(env, userId);
  if (!existing) return false;
  memoryStore.users.delete(existing.id);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(detectedD1.db.prepare(`DELETE FROM users WHERE id = ?`), existing.id).run();
    } catch (_e) {}
  }
  await addAuditLog(env, 'حذف کاربر', `${existing.username}`, clientIp);
  return true;
}

async function recordUserActivity(env = {}, userId, bytesDelta = 0, reqDelta = 1) {
  if (!userId) return;
  const now = Date.now();
  const hourKey = new Date(now).toISOString().slice(0, 13);
  const prevHour = memoryStore.trafficHourly.get(hourKey) || { bytes: 0, requests: 0 };
  prevHour.bytes += Math.max(0, Number(bytesDelta) || 0);
  prevHour.requests += Math.max(0, Number(reqDelta) || 0);
  memoryStore.trafficHourly.set(hourKey, prevHour);

  const u = memoryStore.users.get(userId);
  if (u) {
    u.usedBytes = (u.usedBytes || 0) + Math.max(0, Number(bytesDelta) || 0);
    u.lifetimeBytes = (u.lifetimeBytes || 0) + Math.max(0, Number(bytesDelta) || 0);
    u.requestCount = (u.requestCount || 0) + Math.max(0, Number(reqDelta) || 0);
    if (!u.firstConnectedAt) {
      u.firstConnectedAt = now;
      if (u.startOnFirstUse && u.expireDays > 0 && !u.expireAt) {
        u.expireAt = now + u.expireDays * 86400 * 1000;
      }
    }
    u.updatedAt = now;
  }

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `UPDATE users SET
            used_bytes = used_bytes + ?,
            lifetime_bytes = lifetime_bytes + ?,
            request_count = request_count + ?,
            first_connected_at = CASE WHEN first_connected_at = 0 THEN ? ELSE first_connected_at END,
            expire_at = CASE WHEN start_on_first_use = 1 AND expire_days > 0 AND expire_at = 0 THEN ? + (expire_days * 86400000) ELSE expire_at END,
            updated_at = ?
           WHERE id = ?`
        ),
        Math.max(0, Number(bytesDelta) || 0),
        Math.max(0, Number(bytesDelta) || 0),
        Math.max(0, Number(reqDelta) || 0),
        now,
        now,
        now,
        userId
      ).run();
    } catch (_e) {}
  }
}

async function addAuditLog(env = {}, action, detail = '', ip = '') {
  const now = Date.now();
  memoryStore.auditLogs.unshift({
    id: memoryStore.auditLogs.length + 1,
    action: String(action || ''),
    detail: String(detail || ''),
    ip: String(ip || ''),
    createdAt: now
  });
  if (memoryStore.auditLogs.length > 50) {
    memoryStore.auditLogs.length = 50;
  }
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(`INSERT INTO audit_logs (action, detail, ip, created_at) VALUES (?, ?, ?, ?)`),
        String(action || ''),
        String(detail || ''),
        String(ip || ''),
        now
      ).run();
    } catch (_e) {}
  }
}

async function getAuditLogs(env = {}, limit = 15) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await safeBind(
        detectedD1.db.prepare(`SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`),
        limit
      ).all();
      if (res?.results?.length) {
        return res.results.map(r => ({
          id: r.id,
          action: r.action,
          detail: r.detail,
          ip: r.ip,
          createdAt: r.created_at
        }));
      }
    } catch (_e) {}
  }
  return memoryStore.auditLogs.slice(0, limit);
}

async function getStorageDiagnostics(env = {}) {
  const d1State = await ensureD1Schema(env);
  const kvDetected = detectKvBinding(env);
  const users = await listUsers(env);
  const logs = await getAuditLogs(env, 12);
  const hasPass = await hasAdminPassword(env);

  let totalUsedBytes = 0;
  let totalLifetimeBytes = 0;
  let totalRequests = 0;
  let activeUsers = 0;
  for (const u of users) {
    totalUsedBytes += u.usedBytes || 0;
    totalLifetimeBytes += u.lifetimeBytes || 0;
    totalRequests += u.requestCount || 0;
    if (u.enabled) activeUsers += 1;
  }

  return {
    d1Enabled: d1State.d1Enabled,
    d1BindingName: d1State.bindingName || 'DB',
    d1Migrated: d1State.migrated,
    d1Error: d1State.error || null,
    kvEnabled: Boolean(kvDetected),
    kvBindingName: kvDetected?.bindingName || 'C',
    hasPassword: hasPass,
    maxUsersLimit: MAX_USERS_LIMIT,
    uptimeMs: Date.now() - memoryStore.bootTime,
    bootTime: memoryStore.bootTime,
    totalUsers: users.length,
    activeUsers,
    disabledUsers: Math.max(0, users.length - activeUsers),
    totalUsedBytes,
    totalLifetimeBytes,
    totalRequests,
    recentLogs: logs
  };
}


// --- MODULE: src/subscription/converters.js ---
// ============================================================================
// miliconfig v3.1 - مبدل‌های داخلی اشتراک (Clash, Sing-box, Surge, Loon, QuanX, Residential Chain)
// منطبق ۱۰۰٪ با منطق کد اصلی CFnew v3.1 + نام‌گذاری number+miliconfig
// ============================================================================


function quoteYaml(val) {
  if (val == null) return '""';
  const s = String(val);
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// SIP002 از base64url بدون padding استفاده می‌کند؛ atob مرورگر آن را نمی‌پذیرد
function decodeSip002(part) {
  const raw = String(part || '').trim();
  try {
    let b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    return atob(b64);
  } catch (_e) {
    try { return decodeURIComponent(raw); } catch (_e2) { return raw; }
  }
}

function normalizeHost(hostname) {
  if (!hostname) return hostname;
  const s = String(hostname);
  if (s.startsWith('[') && s.endsWith(']')) return s.slice(1, -1);
  return s;
}

function buildClashGroupProxies(names, opts = {}) {
  const { directFirst = false, extraGroups = [] } = opts;
  const nodeLines = names.length ? names.map(n => `      - ${quoteYaml(n)}`).join('\n') : '      - DIRECT';
  const lines = [];
  if (directFirst) {
    lines.push('      - "🎯 全球直连"', '      - "🚀 节点选择"');
  } else {
    lines.push('      - "🚀 节点选择"', '      - "🎯 全球直连"');
  }
  for (const g of extraGroups) lines.push(`      - ${quoteYaml(g)}`);
  lines.push(nodeLines);
  return lines.join('\n');
}

function buildIniGroupProxies(names, opts = {}) {
  const { directFirst = false, extraGroups = [], compact = false } = opts;
  const sep = compact ? ',' : ', ';
  const listStr = names.length ? names.join(sep) : 'DIRECT';
  const parts = [];
  if (directFirst) parts.push('🎯 全球直连', '🚀 节点选择');
  else parts.push('🚀 节点选择', '🎯 全球直连');
  parts.push(...extraGroups);
  if (names.length) parts.push(listStr);
  return parts.join(sep);
}

function parseShareLink(link) {
  try {
    if (link.startsWith('vless://')) {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      return {
        proto: 'vless',
        name: decodeURIComponent(url.hash.substring(1)) || `${url.hostname}:${url.port}`,
        uuid: url.username,
        server: normalizeHost(url.hostname),
        port: parseInt(url.port, 10) || 443,
        tls: params.get('security') === 'tls' || params.get('security') === 'reality',
        network: params.get('type') || 'ws',
        path: params.get('path') || '/?ed=2048',
        host: normalizeHost(params.get('host') || url.hostname),
        sni: normalizeHost(params.get('sni') || params.get('host') || url.hostname),
        alpn: (params.get('alpn') || '').split(',').map(s => s.trim()).filter(Boolean),
        fp: params.get('fp') || 'chrome',
        flow: params.get('flow') || '',
        encryption: params.get('encryption') || 'none',
        mode: params.get('mode') || '',
        ech: params.get('ech') || ''
      };
    }
    if (link.startsWith('trojan://')) {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      return {
        proto: 'trojan',
        name: decodeURIComponent(url.hash.substring(1)) || `${url.hostname}:${url.port}`,
        password: decodeURIComponent(url.username),
        server: normalizeHost(url.hostname),
        port: parseInt(url.port, 10) || 443,
        tls: params.get('security') !== 'none',
        network: params.get('type') || 'ws',
        path: params.get('path') || '/?ed=2048',
        host: normalizeHost(params.get('host') || url.hostname),
        sni: normalizeHost(params.get('sni') || params.get('host') || url.hostname),
        alpn: (params.get('alpn') || '').split(',').map(s => s.trim()).filter(Boolean),
        fp: params.get('fp') || 'chrome',
        ech: params.get('ech') || ''
      };
    }
    if (link.startsWith('ss://')) {
      const rest = link.substring(5);
      const hashIdx = rest.indexOf('#');
      const mainPart = hashIdx > -1 ? rest.substring(0, hashIdx) : rest;
      const nodeName = hashIdx > -1 ? decodeURIComponent(rest.substring(hashIdx + 1)) : 'Shadowsocks';

      let cipher = 'chacha20-ietf-poly1305';
      let password = '';
      let server = '';
      let port = 443;
      let host = '';
      let path = '/';
      let isTls = true;
      let fp = 'chrome';

      const atIdx = mainPart.indexOf('@');
      if (atIdx > -1) {
        const credPart = mainPart.substring(0, atIdx);
        const credDecoded = decodeSip002(credPart);
        const colonIdx = credDecoded.indexOf(':');
        if (colonIdx > -1) {
          cipher = credDecoded.substring(0, colonIdx);
          password = credDecoded.substring(colonIdx + 1);
        } else {
          password = credDecoded;
        }

        const serverPart = mainPart.substring(atIdx + 1);
        const qIdx = serverPart.indexOf('?');
        const hp = qIdx > -1 ? serverPart.substring(0, qIdx).replace(/\/$/, '') : serverPart.replace(/\/$/, '');
        const query = qIdx > -1 ? serverPart.substring(qIdx + 1) : '';

        let addr = hp;
        let p = 443;
        if (hp.startsWith('[')) {
          const m = hp.match(/^(\[[^\]]+\])(?::(\d+))?$/);
          if (m) { addr = m[1]; p = parseInt(m[2] || '443', 10); }
        } else {
          const cIdx = hp.lastIndexOf(':');
          if (cIdx > -1) {
            addr = hp.substring(0, cIdx);
            p = parseInt(hp.substring(cIdx + 1) || '443', 10);
          }
        }
        server = addr;
        port = p;

        const sp = new URLSearchParams(query);
        host = sp.get('host') || sp.get('sni') || server;
        path = sp.get('path') || '/';
        isTls = sp.get('security') === 'tls' || (sp.get('plugin') || '').includes('tls');
        fp = sp.get('fp') || 'chrome';

        // گزینه‌های v2ray-plugin (mode/host/path/tls) مرجع واقعی هدر Host و مسیر در SS هستند
        const pluginRaw = sp.get('plugin') || '';
        if (pluginRaw) {
          const parts = pluginRaw.split(';').map(x => x.trim()).filter(Boolean);
          for (const part of parts) {
            const eq = part.indexOf('=');
            const key = (eq > -1 ? part.slice(0, eq) : part).toLowerCase();
            const val = eq > -1 ? part.slice(eq + 1) : '';
            if (key === 'host' && val) host = val;
            else if (key === 'path' && val) path = val;
            else if (key === 'tls') isTls = true;
          }
        }
      } else {
        // قالب قدیمی شادوساکس: ss://base64(method:pass@host:port)?plugin=v2ray-plugin;...
        try {
          const qIdx0 = mainPart.indexOf('?');
          const b64Part = qIdx0 > -1 ? mainPart.substring(0, qIdx0) : mainPart;
          const query0 = qIdx0 > -1 ? mainPart.substring(qIdx0 + 1) : '';
          const decoded = decodeSip002(b64Part) || decodeBase64Utf8(b64Part);
          const atInDec = String(decoded || '').indexOf('@');
          if (atInDec > -1) {
            const cred = decoded.substring(0, atInDec);
            const srvP = decoded.substring(atInDec + 1);
            const colonIdx = cred.indexOf(':');
            cipher = colonIdx > -1 ? cred.substring(0, colonIdx) : cipher;
            password = colonIdx > -1 ? cred.substring(colonIdx + 1) : cred;
            const cIdx = srvP.lastIndexOf(':');
            if (cIdx > -1) {
              server = srvP.substring(0, cIdx);
              port = parseInt(srvP.substring(cIdx + 1) || '443', 10);
            } else {
              server = srvP;
            }
            host = server;
            const sp0 = new URLSearchParams(query0);
            host = sp0.get('host') || sp0.get('sni') || host;
            path = sp0.get('path') || path;
            isTls = sp0.get('security') === 'tls' || (sp0.get('plugin') || '').includes('tls');
            const pluginRaw0 = sp0.get('plugin') || '';
            if (pluginRaw0) {
              for (const part of pluginRaw0.split(';').map(x => x.trim()).filter(Boolean)) {
                const eq = part.indexOf('=');
                const key = (eq > -1 ? part.slice(0, eq) : part).toLowerCase();
                const val = eq > -1 ? part.slice(eq + 1) : '';
                if (key === 'host' && val) host = val;
                else if (key === 'path' && val) path = val;
                else if (key === 'tls') isTls = true;
              }
            }
          }
        } catch (_e) {}
      }

      if (server) {
        return {
          proto: 'ss',
          name: nodeName,
          cipher,
          password,
          server: normalizeHost(server),
          port,
          tls: isTls,
          network: 'ws',
          path,
          host: normalizeHost(host),
          sni: normalizeHost(host),
          fp
        };
      }
    }
  } catch (_e) {}
  return null;
}

function buildClashNodeYaml(node, customECHDomain = 'cloudflare-ech.com') {
  const lines = [];
  const srv = normalizeHost(node.server);
  const host = normalizeHost(node.host) || srv;
  const sni = normalizeHost(node.sni) || host;
  lines.push(`  - name: ${quoteYaml(node.name)}`);
  lines.push(`    type: ${node.proto}`);
  lines.push(`    server: ${quoteYaml(srv)}`);
  lines.push(`    port: ${node.port}`);
  if (node.proto === 'vless') {
    lines.push(`    uuid: ${node.uuid}`);
    lines.push(`    udp: true`);
    lines.push(`    tls: ${node.tls ? 'true' : 'false'}`);
    if (node.flow) lines.push(`    flow: ${quoteYaml(node.flow)}`);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'trojan') {
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(`    udp: true`);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'ss') {
    lines.push(`    cipher: ${quoteYaml(node.cipher || 'none')}`);
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(`    udp: true`);
    lines.push(`    plugin: v2ray-plugin`);
    lines.push(`    plugin-opts:`);
    lines.push(`      mode: websocket`);
    lines.push(`      tls: ${node.tls ? 'true' : 'false'}`);
    lines.push(`      skip-cert-verify: false`);
    lines.push(`      host: ${quoteYaml(host)}`);
    lines.push(`      path: ${quoteYaml(node.path || '/')}`);
  }
  if (node.tls && node.proto !== 'ss') {
    lines.push(`    servername: ${quoteYaml(sni)}`);
    if (node.alpn && node.alpn.length) {
      lines.push(`    alpn: [${node.alpn.map(a => quoteYaml(a)).join(', ')}]`);
    }
    lines.push(`    skip-cert-verify: false`);
  }
  if (node.network === 'ws' || node.network === 'xhttp') {
    lines.push(`    network: ws`);
    lines.push(`    ws-opts:`);
    lines.push(`      path: ${quoteYaml(node.path)}`);
    lines.push(`      headers:`);
    lines.push(`        Host: ${quoteYaml(host)}`);
  } else if (node.network === 'grpc') {
    lines.push(`    network: grpc`);
    lines.push(`    grpc-opts:`);
    lines.push(`      grpc-service-name: ${quoteYaml(node.path)}`);
  }
  if (node.ech) {
    const echDomain = customECHDomain || 'cloudflare-ech.com';
    lines.push(`    ech-opts:`);
    lines.push(`      enable: true`);
    lines.push(`      query-server-name: ${quoteYaml(echDomain)}`);
  }
  return lines.join('\n');
}

function generateClashConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const customECHDomain = options.customECHDomain || 'cloudflare-ech.com';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);

  const header = [
    '# miliconfig v3.1 - Clash / Mihomo Subscription',
    'mixed-port: 7890',
    'allow-lan: true',
    'mode: rule',
    'log-level: info',
    'ipv6: true',
    'external-controller: 127.0.0.1:9090',
    'unified-delay: true',
    'tcp-concurrent: true',
    'geodata-mode: true',
    'geo-auto-update: true',
    'geo-update-interval: 24',
    'geox-url:',
    '  geoip: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"',
    '  geosite: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"',
    '  mmdb: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"',
    '  asn: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"',
    'sniffer:',
    '  enable: true',
    '  force-dns-mapping: true',
    '  parse-pure-ip: true',
    '  sniff:',
    '    HTTP:',
    '      ports: [80, 8080-8880]',
    '      override-destination: true',
    '    TLS:',
    '      ports: [443, 8443]',
    '    QUIC:',
    '      ports: [443, 8443]',
    'dns:',
    '  enable: true',
    '  listen: 0.0.0.0:1053',
    '  ipv6: true',
    '  enhanced-mode: fake-ip',
    '  fake-ip-range: 198.18.0.1/16',
    '  fake-ip-filter:',
    '    - "*.lan"',
    '    - "+.local"',
    '    - "+.market.xiaomi.com"',
    '    - "+.msftconnecttest.com"',
    '    - "+.msftncsi.com"',
    '    - "localhost.ptlogin2.qq.com"',
    '    - "+.srv.nintendo.net"',
    '    - "+.stun.playstation.net"',
    '    - "+.xboxlive.com"',
    '  default-nameserver:',
    '    - 223.5.5.5',
    '    - 119.29.29.29',
    '  nameserver:',
    `    - ${customDNS}`,
    '    - https://119.29.29.29/dns-query',
    '  fallback:',
    '    - https://1.1.1.1/dns-query',
    '    - https://8.8.8.8/dns-query',
    '  fallback-filter:',
    '    geoip: true',
    '    geoip-code: CN',
    '    ipcidr:',
    '      - 240.0.0.0/4',
    ''
  ];

  const proxiesSection = ['proxies:'];
  for (const n of nodes) proxiesSection.push(buildClashNodeYaml(n, customECHDomain));

  const nodesOnly = names.length ? names.map(n => `      - ${quoteYaml(n)}`).join('\n') : '      - DIRECT';
  const groupsSection = [
    'proxy-groups:',
    '  - name: "🚀 节点选择"',
    '    type: select',
    '    proxies:',
    '      - "🎯 全球直连"',
    nodesOnly,
    '  - name: "🌍 国外媒体"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "📺 哔哩哔哩"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "📹 油管视频"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { extraGroups: ['🌍 国外媒体'] }),
    '  - name: "🎬 奈飞视频"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { extraGroups: ['🌍 国外媒体'] }),
    '  - name: "📲 电报信息"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "🌐 谷歌服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "🤖 OpenAI"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "Ⓜ️ 微软服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "🍎 苹果服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "🎯 全球直连"',
    '    type: select',
    '    proxies:',
    '      - DIRECT',
    '  - name: "🛑 全球拦截"',
    '    type: select',
    '    proxies:',
    '      - REJECT',
    '      - DIRECT',
    '  - name: "🍃 应用净化"',
    '    type: select',
    '    proxies:',
    '      - REJECT',
    '      - DIRECT',
    '  - name: "🐟 漏网之鱼"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    ''
  ];

  const ruleBase = 'https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release';
  const provider = (name, behavior) => [
    `  ${name}:`,
    `    type: http`,
    `    behavior: ${behavior}`,
    `    url: "${ruleBase}/${name}.txt"`,
    `    path: ./rulesets/loyalsoldier/${name}.txt`,
    `    interval: 86400`
  ].join('\n');

  const ruleProviders = [
    'rule-providers:',
    provider('reject', 'domain'),
    provider('icloud', 'domain'),
    provider('apple', 'domain'),
    provider('google', 'domain'),
    provider('proxy', 'domain'),
    provider('direct', 'domain'),
    provider('private', 'domain'),
    provider('gfw', 'domain'),
    provider('greatfire', 'domain'),
    provider('tld-not-cn', 'domain'),
    provider('telegramcidr', 'ipcidr'),
    provider('cncidr', 'ipcidr'),
    provider('lancidr', 'ipcidr'),
    provider('applications', 'classical'),
    ''
  ];

  const rules = [
    'rules:',
    '  - DOMAIN-SUFFIX,acl4.ssr,🎯 全球直连',
    '  - DOMAIN-SUFFIX,local,🎯 全球直连',
    '  - DOMAIN,clash.razord.top,🎯 全球直连',
    '  - DOMAIN,yacd.haishan.me,🎯 全球直连',
    '  - DOMAIN,yacd.metacubex.one,🎯 全球直连',
    '  - DOMAIN,d.metacubex.one,🎯 全球直连',
    '  - DOMAIN-SUFFIX,googleapis.cn,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,gstatic.com,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,googlevideo.com,📹 油管视频',
    '  - DOMAIN-SUFFIX,googleusercontent.com,🌐 谷歌服务',
    '  - DOMAIN-KEYWORD,youtube,📹 油管视频',
    '  - DOMAIN-SUFFIX,youtube.com,📹 油管视频',
    '  - DOMAIN-SUFFIX,youtu.be,📹 油管视频',
    '  - DOMAIN-KEYWORD,netflix,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxext.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxso.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxvideo.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflximg.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflximg.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,netflix.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,netflix.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,bilibili.com,📺 哔哩哔哩',
    '  - DOMAIN-SUFFIX,bilivideo.com,📺 哔哩哔哩',
    '  - DOMAIN-SUFFIX,hdslb.com,📺 哔哩哔哩',
    '  - DOMAIN-KEYWORD,openai,🤖 OpenAI',
    '  - DOMAIN-KEYWORD,chatgpt,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,openai.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,oaistatic.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,anthropic.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,claude.ai,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,perplexity.ai,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,gemini.google.com,🤖 OpenAI',
    '  - RULE-SET,applications,🎯 全球直连',
    '  - RULE-SET,private,🎯 全球直连',
    '  - RULE-SET,reject,🛑 全球拦截',
    '  - RULE-SET,icloud,🍎 苹果服务',
    '  - RULE-SET,apple,🍎 苹果服务',
    '  - RULE-SET,google,🌐 谷歌服务',
    '  - RULE-SET,proxy,🚀 节点选择',
    '  - RULE-SET,gfw,🚀 节点选择',
    '  - RULE-SET,greatfire,🚀 节点选择',
    '  - RULE-SET,tld-not-cn,🚀 节点选择',
    '  - RULE-SET,direct,🎯 全球直连',
    '  - RULE-SET,lancidr,🎯 全球直连,no-resolve',
    '  - RULE-SET,cncidr,🎯 全球直连,no-resolve',
    '  - RULE-SET,telegramcidr,📲 电报信息,no-resolve',
    '  - GEOIP,LAN,🎯 全球直连,no-resolve',
    '  - GEOIP,CN,🎯 全球直连,no-resolve',
    '  - MATCH,🐟 漏网之鱼'
  ];

  return [header.join('\n'), proxiesSection.join('\n'), '', groupsSection.join('\n'), ruleProviders.join('\n'), rules.join('\n'), ''].join('\n');
}

function splitDnsAddress(addr) {
  const text = String(addr || '').trim();
  try {
    const url = new URL(text);
    const proto = url.protocol.replace(':', '').toLowerCase();
    if (proto === 'https' || proto === 'http3' || proto === 'h3') {
      const out = { type: 'https', server: url.hostname };
      if (url.port) out.server_port = Number(url.port);
      if (url.pathname && url.pathname !== '/' && url.pathname !== '/dns-query') out.path = url.pathname;
      return out;
    }
    if (proto === 'tls') return { type: 'tls', server: url.hostname };
    if (proto === 'quic') return { type: 'quic', server: url.hostname };
    if (proto === 'udp' || proto === 'dns') return { type: 'udp', server: url.hostname };
  } catch (_e) {}
  return { type: 'udp', server: text.replace(/^[a-z0-9]+:\/\//i, '').split('/')[0] || '223.5.5.5' };
}

function generateSingboxConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const outboundTags = nodes.map(n => n.name);

  function buildOutbound(n) {
    const out = {
      type: n.proto,
      tag: n.name,
      server: normalizeHost(n.server),
      server_port: n.port
    };
    if (n.proto === 'vless') {
      out.uuid = n.uuid;
      if (n.flow) out.flow = n.flow;
    } else if (n.proto === 'trojan') {
      out.password = n.password;
    } else if (n.proto === 'ss') {
      out.type = 'shadowsocks';
      out.method = n.cipher || 'none';
      out.password = n.password;
      // در sing-box تنظیمات WS/TLS شادوساکس داخل plugin_opts می‌رود
      const ssOpts = ['mode=websocket', `host=${n.host || n.sni || n.server}`, `path=${n.path || '/'}`];
      if (n.tls) ssOpts.push('tls');
      out.plugin = 'v2ray-plugin';
      out.plugin_opts = ssOpts.join(';');
    }
    if (n.tls && n.proto !== 'ss') {
      out.tls = {
        enabled: true,
        server_name: n.sni,
        insecure: false,
        utls: {
          enabled: true,
          fingerprint: n.fp || 'chrome'
        }
      };
      if (n.alpn && n.alpn.length) out.tls.alpn = n.alpn;
      if (n.ech) {
        out.tls.ech = {
          enabled: true,
          pq_signature_schemes_enabled: false,
          dynamic_record_sizing_disabled: false
        };
      }
    }
    if (n.proto === 'ss') {
      // شادوساکس sing-box فقط از طریق plugin_opts به WS وصل می‌شود
    } else if (n.network === 'ws' || n.network === 'xhttp') {
      out.transport = {
        type: 'ws',
        path: n.path,
        headers: { Host: n.host },
        max_early_data: 2048,
        early_data_header_name: 'Sec-WebSocket-Protocol'
      };
    } else if (n.network === 'grpc') {
      out.transport = {
        type: 'grpc',
        service_name: n.path
      };
    }
    return out;
  }

  const geositeBase = 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite';
  const geoipBase = 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geoip';
  const geositeRule = name => ({
    tag: `geosite-${name}`,
    type: 'remote',
    format: 'binary',
    url: `${geositeBase}/${name}.srs`,
    download_detour: 'direct'
  });
  const geoipRule = name => ({
    tag: `geoip-${name}`,
    type: 'remote',
    format: 'binary',
    url: `${geoipBase}/${name}.srs`,
    download_detour: 'direct'
  });

  const config = {
    log: { level: 'info', timestamp: true },
    dns: {
      servers: [
        { ...splitDnsAddress(customDNS), tag: 'remote', detour: 'select' },
        { type: 'udp', tag: 'local', server: '223.5.5.5', detour: 'direct' },
        { type: 'fakeip', tag: 'fakeip', inet4_range: '198.18.0.0/15', inet6_range: 'fc00::/18' }
      ],
      rules: [
        { rule_set: 'geosite-category-ads-all', action: 'reject' },
        { rule_set: 'geosite-cn', server: 'local' },
        { query_type: ['A', 'AAAA'], server: 'fakeip' }
      ],
      strategy: 'ipv4_only'
    },
    inbounds: [
      { type: 'mixed', tag: 'mixed-in', listen: '127.0.0.1', listen_port: 2080 },
      {
        type: 'tun',
        tag: 'tun-in',
        interface_name: 'sing-box',
        address: ['172.19.0.1/30', 'fdfe:dcba:9876::1/126'],
        mtu: 9000,
        auto_route: true,
        strict_route: true,
        stack: 'mixed'
      }
    ],
    outbounds: [
      { type: 'selector', tag: 'select', outbounds: ['direct', ...outboundTags], default: outboundTags[0] || 'direct' },
      { type: 'selector', tag: '🌍 国外媒体', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '📲 电报信息', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🌐 谷歌服务', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🤖 OpenAI', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: 'Ⓜ️ 微软服务', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '🍎 苹果服务', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '📺 哔哩哔哩', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '📹 油管视频', outbounds: ['select', '🌍 国外媒体', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🎬 奈飞视频', outbounds: ['select', '🌍 国外媒体', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🎯 全球直连', outbounds: ['direct'] },
      { type: 'selector', tag: '🐟 漏网之鱼', outbounds: ['select', 'direct', ...outboundTags] },
      ...nodes.map(buildOutbound),
      { type: 'direct', tag: 'direct' }
    ],
    route: {
      rule_set: [
        geositeRule('cn'), geositeRule('private'), geositeRule('apple'), geositeRule('apple-cn'),
        geositeRule('microsoft'), geositeRule('microsoft@cn'), geositeRule('google'), geositeRule('telegram'),
        geositeRule('openai'), geositeRule('anthropic'), geositeRule('youtube'), geositeRule('netflix'),
        geositeRule('disney'), geositeRule('spotify'), geositeRule('tiktok'), geositeRule('twitter'),
        geositeRule('facebook'), geositeRule('github'), geositeRule('geolocation-!cn'),
        geositeRule('category-ads-all'), geoipRule('cn'), geoipRule('private'), geoipRule('telegram')
      ],
      rules: [
        { action: 'sniff' },
        { protocol: 'dns', action: 'hijack-dns' },
        { ip_is_private: true, outbound: 'direct' },
        { rule_set: 'geosite-category-ads-all', action: 'reject' },
        { rule_set: 'geosite-private', outbound: 'direct' },
        { rule_set: 'geosite-apple-cn', outbound: 'direct' },
        { rule_set: 'geosite-microsoft@cn', outbound: 'direct' },
        { rule_set: 'geosite-apple', outbound: '🍎 苹果服务' },
        { rule_set: 'geosite-microsoft', outbound: 'Ⓜ️ 微软服务' },
        { rule_set: 'geosite-openai', outbound: '🤖 OpenAI' },
        { rule_set: 'geosite-anthropic', outbound: '🤖 OpenAI' },
        { rule_set: 'geosite-telegram', outbound: '📲 电报信息' },
        { rule_set: 'geoip-telegram', outbound: '📲 电报信息' },
        { rule_set: 'geosite-google', outbound: '🌐 谷歌服务' },
        { rule_set: 'geosite-youtube', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-netflix', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-disney', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-spotify', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-tiktok', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-twitter', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-facebook', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-github', outbound: 'select' },
        { rule_set: 'geosite-geolocation-!cn', outbound: 'select' },
        { rule_set: 'geosite-cn', outbound: 'direct' },
        { rule_set: 'geoip-cn', outbound: 'direct' },
        { ip_is_private: true, outbound: 'direct' }
      ],
      final: '🐟 漏网之鱼',
      default_domain_resolver: { server: 'local' },
      auto_detect_interface: true
    },
    experimental: {
      cache_file: { enabled: true, store_fakeip: true },
      clash_api: { external_controller: '127.0.0.1:9090' }
    }
  };

  return JSON.stringify(config, null, 2);
}

const aclRuleBase = 'https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash';
const aclRule = name => `${aclRuleBase}/${name}.list`;

function generateSurgeConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const lines = [
    '[General]',
    'loglevel = notify',
    'internet-test-url = http://www.apple.com/library/test/success.html',
    'proxy-test-url = http://www.gstatic.com/generate_204',
    'test-timeout = 3',
    `dns-server = ${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}, 119.29.29.29, system`,
    'encrypted-dns-server = https://223.5.5.5/dns-query, https://1.12.12.12/dns-query',
    'ipv6 = true',
    'allow-wifi-access = false',
    'wifi-access-http-port = 6152',
    'wifi-access-socks5-port = 6153',
    'skip-proxy = 127.0.0.1, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local, captive.apple.com',
    'exclude-simple-hostnames = true',
    'show-error-page-for-reject = true',
    '',
    '[Proxy]'
  ];
  for (const n of nodes) {
    if (n.proto === 'trojan') {
      lines.push(`${n.name} = trojan, ${n.server}, ${n.port}, password=${n.password}, sni=${n.sni}, ws=true, ws-path=${n.path}, ws-headers=Host:${n.host}, skip-cert-verify=false, tfo=true`);
    } else if (n.proto === 'ss') {
      lines.push(`${n.name} = ss, ${n.server}, ${n.port}, encrypt-method=${n.cipher || 'chacha20-ietf-poly1305'}, password=${n.password}, ws=true, ws-path=${n.path || '/'}, ws-headers=Host:${n.host}, tls=${n.tls ? 'true' : 'false'}, sni=${n.sni}`);
    }
  }
  if (!nodes.length) {
    lines.push('Direct = direct');
  }
  lines.push('', '[Proxy Group]');
  const listStr = names.length ? names.join(', ') : 'DIRECT';
  lines.push(`🚀 节点选择 = select, 🎯 全球直连, ${listStr}`);
  lines.push(`🌍 国外媒体 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`📺 哔哩哔哩 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`📹 油管视频 = select, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`🎬 奈飞视频 = select, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`📲 电报信息 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`🌐 谷歌服务 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`🤖 OpenAI = select, ${buildIniGroupProxies(names)}`);
  lines.push(`Ⓜ️ 微软服务 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`🍎 苹果服务 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`🎯 全球直连 = select, DIRECT`);
  lines.push(`🛑 全球拦截 = select, REJECT, DIRECT`);
  lines.push(`🐟 漏网之鱼 = select, ${buildIniGroupProxies(names)}`);
  lines.push('', '[Rule]');
  lines.push(`RULE-SET,${aclRule('LocalAreaNetwork')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('UnBan')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('BanAD')},🛑 全球拦截`);
  lines.push(`RULE-SET,${aclRule('BanProgramAD')},🛑 全球拦截`);
  lines.push(`RULE-SET,${aclRule('GoogleFCM')},🌐 谷歌服务`);
  lines.push(`RULE-SET,${aclRule('GoogleCN')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('SteamCN')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('Microsoft')},Ⓜ️ 微软服务`);
  lines.push(`RULE-SET,${aclRule('Apple')},🍎 苹果服务`);
  lines.push(`RULE-SET,${aclRule('Telegram')},📲 电报信息`);
  lines.push(`RULE-SET,${aclRule('OpenAi')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Claude')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Copilot')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Netflix')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('YouTube')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('Disney')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('Spotify')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('TikTok')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('BiliBili')},📺 哔哩哔哩`);
  lines.push(`RULE-SET,${aclRule('ProxyMedia')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('ProxyGFWlist')},🚀 节点选择`);
  lines.push(`RULE-SET,${aclRule('ChinaDomain')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('ChinaCompanyIp')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('ChinaIp')},🎯 全球直连`);
  lines.push('GEOIP,CN,🎯 全球直连');
  lines.push('FINAL,🐟 漏网之鱼,dns-failed');
  return lines.join('\n');
}

function generateLoonConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const lines = [
    '[General]',
    'ip-mode = dual',
    `dns-server = ${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')},119.29.29.29,system`,
    'doh-server = https://223.5.5.5/dns-query, https://1.12.12.12/dns-query',
    'allow-udp-proxy = true',
    'allow-wifi-access = false',
    'sni-sniffing = true',
    'skip-proxy = 127.0.0.1,192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,localhost,*.local,captive.apple.com',
    'bypass-tun = 10.0.0.0/8,100.64.0.0/10,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,255.255.255.255/32',
    '',
    '[Proxy]'
  ];
  for (const n of nodes) {
    if (n.proto === 'vless') {
      const parts = [`${n.server}`, `${n.port}`, `udp=true`, `username=${n.uuid}`, `transport=ws`, `path=${n.path}`, `host=${n.host}`, `over-tls=${n.tls ? 'true' : 'false'}`];
      if (n.tls) {
        parts.push(`tls-name=${n.sni}`);
        if (n.alpn && n.alpn.length) parts.push(`alpn=${n.alpn.join(':')}`);
        parts.push(`skip-cert-verify=false`);
      }
      lines.push(`${n.name} = vless,${parts.join(',')}`);
    } else if (n.proto === 'trojan') {
      const parts = [`${n.server}`, `${n.port}`, `password=${n.password}`, `transport=ws`, `path=${n.path}`, `host=${n.host}`, `over-tls=true`, `tls-name=${n.sni}`];
      if (n.alpn && n.alpn.length) parts.push(`alpn=${n.alpn.join(':')}`);
      parts.push(`skip-cert-verify=false`);
      lines.push(`${n.name} = trojan,${parts.join(',')}`);
    } else if (n.proto === 'ss') {
      lines.push(`${n.name} = Shadowsocks,${n.server},${n.port},${n.cipher || 'chacha20-ietf-poly1305'},"${n.password}",fast-open=false,udp=true,plugin=v2ray-plugin,plugin-opts=mode:websocket;host:${n.host};path:${n.path || '/'};tls:${n.tls ? 'true' : 'false'}`);
    }
  }
  lines.push('', '[Proxy Group]');
  const listStr = names.length ? names.join(',') : 'DIRECT';
  lines.push(`🚀 节点选择 = select,🎯 全球直连,${listStr}`);
  lines.push(`🌍 国外媒体 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`📺 哔哩哔哩 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`📹 油管视频 = select,${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'], compact: true })}`);
  lines.push(`🎬 奈飞视频 = select,${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'], compact: true })}`);
  lines.push(`📲 电报信息 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`🌐 谷歌服务 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`🤖 OpenAI = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`Ⓜ️ 微软服务 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`🍎 苹果服务 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`🎯 全球直连 = select,DIRECT`);
  lines.push(`🛑 全球拦截 = select,REJECT,DIRECT`);
  lines.push(`🐟 漏网之鱼 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push('', '[Remote Rule]');
  lines.push(`${aclRule('LocalAreaNetwork')}, policy=🎯 全球直连, tag=局域网, enabled=true`);
  lines.push(`${aclRule('BanAD')}, policy=🛑 全球拦截, tag=广告拦截, enabled=true`);
  lines.push(`${aclRule('BanProgramAD')}, policy=🛑 全球拦截, tag=应用广告, enabled=true`);
  lines.push(`${aclRule('GoogleCN')}, policy=🎯 全球直连, tag=GoogleCN, enabled=true`);
  lines.push(`${aclRule('SteamCN')}, policy=🎯 全球直连, tag=SteamCN, enabled=true`);
  lines.push(`${aclRule('Microsoft')}, policy=Ⓜ️ 微软服务, tag=微软, enabled=true`);
  lines.push(`${aclRule('Apple')}, policy=🍎 苹果服务, tag=苹果, enabled=true`);
  lines.push(`${aclRule('Telegram')}, policy=📲 电报信息, tag=电报, enabled=true`);
  lines.push(`${aclRule('OpenAi')}, policy=🤖 OpenAI, tag=OpenAI, enabled=true`);
  lines.push(`${aclRule('Netflix')}, policy=🌍 国外媒体, tag=Netflix, enabled=true`);
  lines.push(`${aclRule('YouTube')}, policy=🌍 国外媒体, tag=YouTube, enabled=true`);
  lines.push(`${aclRule('Disney')}, policy=🌍 国外媒体, tag=Disney, enabled=true`);
  lines.push(`${aclRule('Spotify')}, policy=🌍 国外媒体, tag=Spotify, enabled=true`);
  lines.push(`${aclRule('TikTok')}, policy=🌍 国外媒体, tag=TikTok, enabled=true`);
  lines.push(`${aclRule('BiliBili')}, policy=📺 哔哩哔哩, tag=哔哩哔哩, enabled=true`);
  lines.push(`${aclRule('ProxyMedia')}, policy=🌍 国外媒体, tag=代理媒体, enabled=true`);
  lines.push(`${aclRule('ProxyGFWlist')}, policy=🚀 节点选择, tag=代理列表, enabled=true`);
  lines.push(`${aclRule('ChinaDomain')}, policy=🎯 全球直连, tag=中国域名, enabled=true`);
  lines.push(`${aclRule('ChinaIp')}, policy=🎯 全球直连, tag=中国IP, enabled=true`);
  lines.push('', '[Rule]', 'GEOIP,CN,🎯 全球直连', 'FINAL,🐟 漏网之鱼');
  return lines.join('\n');
}

function generateQuanxConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const qxBase = 'https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/QuantumultX';
  const lines = [
    '[general]',
    'network_check_url=http://www.gstatic.com/generate_204',
    'server_check_url=http://www.gstatic.com/generate_204',
    'dns_exclusion_list=*.cmpassport.com, *.jegotrip.com.cn, *.icloud.com, *.icloud.com.cn, *.apple.com, *.weibo.com, *.qq.com',
    'running_mode_trigger=filter',
    '',
    '[dns]',
    `server=${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}`,
    'server=119.29.29.29',
    'server=https://223.5.5.5/dns-query',
    'server=https://1.12.12.12/dns-query',
    '',
    '[server_local]'
  ];
  for (const n of nodes) {
    if (n.proto === 'vless') {
      const parts = [`${n.server}:${n.port}`, `method=none`, `password=${n.uuid}`, `obfs=${n.tls ? 'wss' : 'ws'}`, `obfs-host=${n.host}`, `obfs-uri=${n.path}`];
      if (n.tls) parts.push(`tls-verification=true`, `tls13=true`);
      parts.push(`tag=${n.name}`);
      lines.push(`vless=${parts.join(', ')}`);
    } else if (n.proto === 'trojan') {
      const parts = [`${n.server}:${n.port}`, `password=${n.password}`, `over-tls=true`, `tls-host=${n.sni}`, `obfs=wss`, `obfs-host=${n.host}`, `obfs-uri=${n.path}`, `tls-verification=true`, `tag=${n.name}`];
      lines.push(`trojan=${parts.join(', ')}`);
    } else if (n.proto === 'ss') {
      lines.push(`shadowsocks=${n.server}:${n.port}, method=${n.cipher || 'chacha20-ietf-poly1305'}, password=${n.password}, obfs=${n.tls ? 'wss' : 'ws'}, obfs-host=${n.host}, obfs-uri=${n.path || '/'}, tag=${n.name}`);
    }
  }
  lines.push('', '[policy]');
  const listStr = names.length ? names.join(', ') : 'direct';
  lines.push(`static=🚀 节点选择, ${listStr}, direct`);
  lines.push(`static=🌍 国外媒体, ${buildIniGroupProxies(names)}`);
  lines.push(`static=📺 哔哩哔哩, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=📹 油管视频, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`static=🎬 奈飞视频, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`static=📲 电报信息, ${buildIniGroupProxies(names)}`);
  lines.push(`static=🌐 谷歌服务, ${buildIniGroupProxies(names)}`);
  lines.push(`static=🤖 OpenAI, ${buildIniGroupProxies(names)}`);
  lines.push(`static=Ⓜ️ 微软服务, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=🍎 苹果服务, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=🎯 全球直连, direct`);
  lines.push(`static=🛑 全球拦截, reject, direct`);
  lines.push(`static=🐟 漏网之鱼, ${buildIniGroupProxies(names)}`);
  lines.push('', '[filter_remote]');
  lines.push(`${qxBase}/Lan/Lan.list, tag=局域网, force-policy=🎯 全球直连, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Advertising/Advertising.list, tag=广告拦截, force-policy=🛑 全球拦截, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Microsoft/Microsoft.list, tag=微软, force-policy=Ⓜ️ 微软服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Apple/Apple.list, tag=苹果, force-policy=🍎 苹果服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Telegram/Telegram.list, tag=电报, force-policy=📲 电报信息, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Google/Google.list, tag=谷歌, force-policy=🌐 谷歌服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/OpenAI/OpenAI.list, tag=OpenAI, force-policy=🤖 OpenAI, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Claude/Claude.list, tag=Claude, force-policy=🤖 OpenAI, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/YouTube/YouTube.list, tag=YouTube, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Netflix/Netflix.list, tag=Netflix, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Disney/Disney.list, tag=Disney, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Spotify/Spotify.list, tag=Spotify, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/TikTok/TikTok.list, tag=TikTok, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/BiliBili/BiliBili.list, tag=哔哩哔哩, force-policy=📺 哔哩哔哩, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Global/Global.list, tag=全球加速, force-policy=🚀 节点选择, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/ChinaMax/ChinaMax.list, tag=中国直连, force-policy=🎯 全球直连, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push('', '[filter_local]', 'geoip, cn, 🎯 全球直连', 'final, 🐟 漏网之鱼');
  return lines.join('\n');
}

// ============================================================================
// زنجیره اینترنت خانگی (Residential Chain - ?target=vg / jk)
// ============================================================================
const JK_SOURCE = 'https://www.vpngate.net/api/iphone/';
const JK_CACHE_TTL = 30 * 60 * 1000;
let jkCache = null;
let jkCacheTime = 0;
const jkDirectiveRegex = {};

function getJkDirective(text, name) {
  if (!jkDirectiveRegex[name]) jkDirectiveRegex[name] = new RegExp('^[ \\t]*' + name + '[ \\t]+(.+?)[ \\t]*$', 'm');
  const m = text.match(jkDirectiveRegex[name]);
  return m ? m[1].trim() : '';
}

function getJkInlineBlock(text, tag) {
  const m = text.match(new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>'));
  return m ? m[1].trim() : '';
}

function indentCert(text, pad) {
  return text.split('\n').map(l => l.trim()).filter(Boolean).map(l => pad + l).join('\n');
}

function decodeJkConfig(b64, full = false) {
  const clean = b64.replace(/\s/g, '');
  if (full || clean.length <= 6000) return decodeBase64Utf8(clean);
  return decodeBase64Utf8(clean.slice(0, 6000));
}

function parseJkList(raw) {
  const candidates = [];
  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.charAt(0) === '*' || line.charAt(0) === '#') continue;
    const fields = line.split(',');
    if (fields.length < 15) continue;
    if ((fields[0] || '').indexOf('public-vpn') === 0) continue;
    if ((fields[1] || '').indexOf('219.100.37.') === 0) continue;
    const b64 = fields[fields.length - 1];
    if (!b64 || b64.length < 100) continue;
    candidates.push({
      country: (fields[6] || '').toUpperCase() || 'XX',
      speed: parseInt(fields[4], 10) || 0,
      b64
    });
  }
  candidates.sort((a, b) => b.speed - a.speed);
  const nodes = [];
  let cert = null;
  for (const item of candidates) {
    let text = '';
    try {
      text = decodeJkConfig(item.b64);
      if (!getJkDirective(text, 'remote')) text = decodeJkConfig(item.b64, true);
    } catch (_e) {
      continue;
    }
    if ((getJkDirective(text, 'proto') || 'tcp').toLowerCase() !== 'tcp') continue;
    const remote = getJkDirective(text, 'remote').split(/\s+/);
    if (!remote[0]) continue;
    if (!cert) {
      try {
        const fullText = decodeJkConfig(item.b64, true);
        const c = {
          ca: getJkInlineBlock(fullText, 'ca'),
          cert: getJkInlineBlock(fullText, 'cert'),
          key: getJkInlineBlock(fullText, 'key')
        };
        if (c.ca && c.cert && c.key) cert = c;
      } catch (_e) {}
      if (!cert) continue;
    }
    nodes.push({
      country: item.country,
      address: remote[0],
      port: parseInt(remote[1], 10) || 443,
      cipher: getJkDirective(text, 'cipher') || 'AES-128-CBC',
      auth: getJkDirective(text, 'auth') || 'SHA1'
    });
  }
  return { nodes, cert };
}

async function fetchJkNodes() {
  const now = Date.now();
  if (jkCache && now - jkCacheTime < JK_CACHE_TTL) return jkCache;
  let raw = '';
  let lastErr = null;
  for (const src of [JK_SOURCE, JK_SOURCE.replace(/^https:/, 'http:')]) {
    try {
      const resp = await fetch(src, {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' }
      });
      if (!resp.ok) {
        lastErr = new Error('Status ' + resp.status);
        continue;
      }
      raw = await resp.text();
      break;
    } catch (e) {
      lastErr = e;
    }
  }
  if (!raw) throw lastErr || new Error('Empty JK response');
  const parsed = parseJkList(raw);
  if (!parsed.nodes.length || !parsed.cert) throw new Error('No valid JK residential nodes');
  jkCache = parsed;
  jkCacheTime = now;
  return parsed;
}

async function generateResidentialChainConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const customECHDomain = options.customECHDomain || 'cloudflare-ech.com';
  const subNodeCount = parseInt(options.subNodeCount ?? 50, 10) || 0;
  const frontGroupName = '⚡ CF前置';
  const jkAuto = '🏠 家宽自动';
  const jkSelect = '🏠 家宽节点';
  const mainSelect = '🚀 节点选择';

  const allFront = links
    .map(parseShareLink)
    .filter(n => n && (n.proto === 'vless' || n.proto === 'trojan'));
  const tlsFront = allFront.filter(n => n.tls);
  const frontNodes = (tlsFront.length ? tlsFront : allFront).map((n, idx) => ({
    ...n,
    name: `${idx + 1}+${BRAND_NAME}`
  }));
  const frontNames = frontNodes.map(n => n.name);

  const { nodes, cert } = await fetchJkNodes();
  const slicedJk = subNodeCount > 0 ? nodes.slice(0, subNodeCount) : nodes;
  const jkItems = slicedJk.map((n, idx) => ({
    ...n,
    name: `${frontNodes.length + idx + 1}+${BRAND_NAME}`
  }));

  const header = [
    '# miliconfig 家宽订阅：CF 节点带路，落地是住宅宽带',
    'mixed-port: 7890',
    'allow-lan: false',
    'mode: rule',
    'log-level: info',
    'ipv6: false',
    'unified-delay: true',
    'tcp-concurrent: true',
    'external-controller: 127.0.0.1:9090',
    'dns:',
    '  enable: true',
    '  ipv6: false',
    '  enhanced-mode: fake-ip',
    '  fake-ip-range: 198.18.0.1/16',
    '  nameserver:',
    '    - ' + customDNS,
    '    - https://1.1.1.1/dns-query',
    ''
  ];

  const proxySection = ['proxies:'];
  for (const n of frontNodes) proxySection.push(buildClashNodeYaml(n, customECHDomain));
  jkItems.forEach((n, idx) => {
    const row = [
      '  - name: "' + n.name + '"',
      '    type: openvpn',
      '    server: ' + n.address,
      '    port: ' + n.port,
      '    proto: tcp',
      '    username: vpn',
      '    password: vpn',
      '    cipher: ' + n.cipher,
      '    auth: ' + n.auth,
      '    udp: false',
      '    handshake-timeout: 30',
      '    remote-dns-resolve: true',
      '    dns: [ 8.8.8.8, 1.1.1.1 ]'
    ];
    if (frontNames.length) row.push('    dialer-proxy: "' + frontGroupName + '"');
    if (idx === 0) {
      row.push('    ca: &jkca |-', indentCert(cert.ca, '      '));
      row.push('    cert: &jkcert |-', indentCert(cert.cert, '      '));
      row.push('    key: &jkkey |-', indentCert(cert.key, '      '));
    } else {
      row.push('    ca: *jkca', '    cert: *jkcert', '    key: *jkkey');
    }
    proxySection.push(row.join('\n'));
  });

  const listFmt = arr => arr.map(x => '      - "' + x + '"').join('\n');
  const jkNames = jkItems.map(x => x.name);
  const groupSection = ['proxy-groups:'];
  if (frontNames.length) {
    groupSection.push(
      '  - name: "' + frontGroupName + '"',
      '    type: url-test',
      '    url: https://www.gstatic.com/generate_204',
      '    interval: 300',
      '    tolerance: 50',
      '    proxies:',
      listFmt(frontNames)
    );
  }
  groupSection.push(
    '  - name: "' + jkAuto + '"',
    '    type: fallback',
    '    url: https://www.gstatic.com/generate_204',
    '    interval: 1800',
    '    lazy: true',
    '    proxies:',
    listFmt(jkNames)
  );
  groupSection.push('  - name: "' + jkSelect + '"', '    type: select', '    proxies:', listFmt(jkNames));
  const mainList = ['      - "' + jkAuto + '"', '      - "' + jkSelect + '"'];
  if (frontNames.length) mainList.push('      - "' + frontGroupName + '"');
  mainList.push('      - DIRECT');
  groupSection.push('  - name: "' + mainSelect + '"', '    type: select', '    proxies:', mainList.join('\n'));

  const rules = [
    'rules:',
    '  - GEOIP,LAN,DIRECT,no-resolve',
    '  - GEOIP,CN,DIRECT,no-resolve',
    '  - MATCH,' + mainSelect
  ];

  return header.concat(proxySection, [''], groupSection, [''], rules, ['']).join('\n');
}


// --- MODULE: src/subscription/generator.js ---
// ============================================================================
// miliconfig v3.1 - تولیدکننده ساب‌لینک چندکاربره با نام‌گذاری number+miliconfig
// و اعمال دقیق تنظیمات هر کاربر + محدودیت تعداد نودها در ساب (subNodeCount)
// ============================================================================


function getOfficialDirectAddress() {
  const hit = OFFICIAL_DIRECT_IPS[Math.floor(Math.random() * OFFICIAL_DIRECT_IPS.length)];
  return {
    domain: hit,
    region: 'CF',
    regionCode: 'CF',
    port: 443
  };
}

function getNeighborRegions(region) {
  const map = {
    US: ['SG', 'JP', 'KR'],
    SG: ['JP', 'KR', 'US'],
    JP: ['SG', 'KR', 'US'],
    KR: ['JP', 'SG', 'US'],
    DE: ['NL', 'GB', 'SE', 'FI'],
    SE: ['DE', 'NL', 'FI', 'GB'],
    NL: ['DE', 'GB', 'SE', 'FI'],
    FI: ['SE', 'DE', 'NL', 'GB'],
    GB: ['DE', 'NL', 'SE', 'FI']
  };
  return map[region] || [];
}

function getOrderedRegions(region) {
  const neighbors = getNeighborRegions(region);
  const all = ['US', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB'];
  return [region, ...neighbors, ...all.filter(r => r !== region && !neighbors.includes(r))];
}

async function selectFallbackProxyAddress(workerRegion = '', enableRegionMatch = true) {
  if (!workerRegion || workerRegion === 'CF') {
    return getOfficialDirectAddress();
  }
  if (FALLBACK_PROXY_IPS.length === 0) {
    return getOfficialDirectAddress();
  }
  if (enableRegionMatch && workerRegion) {
    const ordered = getOrderedRegions(workerRegion);
    for (const r of ordered) {
      const found = FALLBACK_PROXY_IPS.find(item => item.regionCode === r);
      if (found) return found;
    }
  }
  return FALLBACK_PROXY_IPS[0];
}

// ============================================================================
// مقدار پارامتر ECH در لینک‌ها — همان قالب قبلی: «دامنه ECH + آدرس DNS»
// ============================================================================
function buildEchParamValue(cfg = {}) {
  if (cfg.ech !== 'yes') return '';
  const dnsVal = cfg.customDNS || CONFIG_DEFAULTS.customDNS;
  const echDomain = cfg.customECHDomain || CONFIG_DEFAULTS.customECHDomain;
  return `${echDomain}+${dnsVal}`;
}

// مسیر یکتای هر نوع نود (vless/trojan/xhttp/ss) و هر کشور؛ ورکر به مسیر حساس نیست
// و همین مسیر را در درخواست WebSocket می‌بیند، پس تفکیک مسیرها اتصال را خراب نمی‌کند.
function buildNodePath(proto, cfg = {}, wkOverride = '', item = null) {
  // الگوی مسیر انتخاب‌شده در پنل (patt) دقیقاً روی نودها اعمال می‌شود
  const pattern = String(cfg.patt || '/?ed=2048').replace(/\{random\}/g, () => Math.random().toString(36).slice(2, 10));
  const qIdx = pattern.indexOf('?');
  const rawPath = qIdx > -1 ? pattern.slice(0, qIdx) : pattern;
  const rawQuery = qIdx > -1 ? pattern.slice(qIdx + 1) : '';
  const pathName = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
  const parts = [];
  if (rawQuery) parts.push(rawQuery);
  if (wkOverride) parts.push(`wk=${encodeURIComponent(wkOverride)}`);
  parts.push(`nt=${encodeURIComponent(proto)}`);
  const cc = String(item?.country || '').trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(cc)) parts.push(`cc=${cc}`);
  if (item?.proxy) parts.push(`s=${encodeProxyForPath(item.proxy)}`);
  return pathName + (parts.length ? '?' + parts.join('&') : '');
}

// پارامتر فرگمنت TLS مطابق فرمت کلاینتی v2rayNG/NekoBox: «طول,فاصله,نوع‌پکت»
function buildFragmentValue(cfg = {}) {
  // کلید اصلی روشن/خاموش فرگمنت؛ شادوساکس همیشه بدون فرگمنت ساخته می‌شود
  if (cfg.frag === 'no') return '';
  const presetId = String(cfg.fragmentPreset || 'off');
  if (presetId === 'off') return '';
  const preset = FRAGMENT_PRESETS[presetId] || FRAGMENT_PRESETS.mci;
  if (!preset) return '';
  let length = preset.length;
  let interval = preset.interval;
  let packets = preset.packets;
  if (presetId === 'custom') {
    length = cfg.fragmentLength || preset.length;
    interval = cfg.fragmentInterval || preset.interval;
    packets = cfg.fragmentPackets || preset.packets;
  }
  if (!length || !interval) return '';
  return `${length},${interval},${packets || 'tlshello'}`;
}

// انتخاب پورت نود از لیست پنل (ports) — هر نود یک پورت، به‌صورت چرخشی
function chooseNodePort(cfg = {}, item = {}, index = 0) {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const explicit = Number(item?.port) || 0;
  if (explicit) {
    return { port: explicit, tls: !CF_HTTP_PORTS.includes(explicit) };
  }
  let ports = parseNodePorts(cfg.ports);
  if (disableNonTls) ports = ports.filter(p => !CF_HTTP_PORTS.includes(p));
  if (!ports.length) ports = [443];
  const port = ports[Math.abs(index) % ports.length];
  return { port, tls: !CF_HTTP_PORTS.includes(port) };
}

// چیدمان متناوب آی‌پی‌ها و دامنه‌های پیش‌فرض CFnew: هر ۲ آی‌پی، یک دامنه،
// تا دامنه‌های cfnew حتی با سقف کم نود هم حتماً داخل سابلینک باشند.
function interleaveAddresses(ipNodes = [], domainNodes = []) {
  const out = [];
  const ips = [...ipNodes];
  const domains = [...domainNodes];
  let ipTurn = 0;
  while (ips.length || domains.length) {
    for (let i = 0; i < 2 && ips.length; i++) out.push(ips.shift());
    ipTurn++;
    if (domains.length) out.push(domains.shift());
  }
  return out;
}

// توزیع مساوی پروتکل‌ها در سابلینک (vless / trojan / ss / xhttp به‌صورت چرخشی)
function interleaveProtocols(groups = {}) {
  const order = ['vless', 'trojan', 'ss', 'xhttp'];
  const queues = order.map(key => (Array.isArray(groups[key]) ? [...groups[key]] : []));
  const total = queues.reduce((sum, q) => sum + q.length, 0);
  const out = [];
  let guard = 0;
  while (out.length < total && guard++ < total * 4) {
    let moved = false;
    for (const q of queues) {
      if (q.length) {
        out.push(q.shift());
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

function isIpv6Literal(host) {
  return String(host || '').includes(':');
}

function isIpv4Literal(host) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(String(host || ''));
}

// اعمال واقعی سوییچ‌های IPv4/IPv6 روی تمام منابع آی‌پی (ثابت، ترجیحی، کشوری و ...)
function filterAddressFamily(list, cfg = {}) {
  const allowV4 = cfg.ipv4 !== 'no';
  const allowV6 = cfg.ipv6 !== 'no';
  return (Array.isArray(list) ? list : []).filter(item => {
    if (!item) return false;
    const host = normalizeNodeHost(item.ip || item.domain);
    if (!host) return false;
    if (isIpv6Literal(host)) return allowV6;
    if (isIpv4Literal(host)) return allowV4;
    return true;
  });
}

function getStaticCfAddresses(cfg = {}) {
  const v4 = cfg.ipv4 === 'no' ? [] : OFFICIAL_DIRECT_IPS.slice();
  const v6 = cfg.ipv6 === 'no' ? [] : OFFICIAL_DIRECT_IPV6.slice();
  return [...v4, ...v6];
}

// ساخت نودهای چندلوکیشن: آدرس = آی‌پی ثابت CF، و پروکسی کشور از طریق ?s= در مسیر ws
const LOCATION_PROXY_SCHEMES = ['socks5://', 'socks://', 'http://', 'https://'];

function buildLocationSourceList(proxyPool = [], cfg = {}, fallbackHost = '') {
  const usable = (Array.isArray(proxyPool) ? proxyPool : []).filter(item => {
    const p = String(item?.proxy || '').trim();
    return LOCATION_PROXY_SCHEMES.some(s => p.toLowerCase().startsWith(s));
  });
  if (usable.length === 0) return [];

  // گروه‌بندی بر اساس کشور تا در حالت MULTI هر نود از یک کشور متفاوت بیاید
  const byCountry = new Map();
  for (const item of usable) {
    const code = String(item.country || '').trim().toUpperCase();
    if (!byCountry.has(code)) byCountry.set(code, []);
    byCountry.get(code).push(item);
  }
  const countryCodes = [...byCountry.keys()];

  // نودهای زنجیره‌ای همیشه روی آی‌پی ثابت واقعی کلادفلر سوار می‌شوند تا پینگ بگیرند
  const staticIps = getStaticCfAddresses(cfg);
  const addressPool = staticIps.length > 0 ? staticIps : (fallbackHost ? [fallbackHost] : []);
  if (addressPool.length === 0) return [];

  const wanted = Math.max(1, Math.min(parseInt(cfg.locationNodeCount, 10) || 8, usable.length));
  // چرخش پنج‌دقیقه‌ای پروکسی‌ها تا نودها همیشه از استخر تازه انتخاب شوند
  const bucket = Math.floor(Date.now() / (5 * 60 * 1000));

  // با گام‌بندی روی استخر، هم IPv4 و هم IPv6 (اگر فعال باشد) در ساب‌لینک حضور پیدا می‌کنند
  const stride = Math.max(1, Math.floor(addressPool.length / wanted));
  const out = [];
  for (let i = 0; i < wanted; i++) {
    const code = countryCodes[(bucket + i) % countryCodes.length];
    const group = byCountry.get(code) || usable;
    const picked = group[(bucket + i) % group.length];
    out.push({
      ip: addressPool[(i * stride) % addressPool.length],
      isp: `Loc-${picked.country || 'CF'}`,
      country: picked.country || '',
      proxy: picked.proxy
    });
  }

  // تضمین حضور حداقل یک نود IPv6 وقتی کاربر IPv6 را فعال کرده است
  const v6Only = OFFICIAL_DIRECT_IPV6;
  if (cfg.ipv6 !== 'no' && v6Only.length > 0 && !out.some(n => isIpv6Literal(n.ip))) {
    out[out.length - 1].ip = v6Only[0];
  }
  return out;
}

function getXhttpPaddingMeta(uuidStr) {
  const s = String(uuidStr || '');
  return {
    header: s.slice(1, 7) || 'x-mili',
    key: '_' + (s.slice(25, 31) || 'pad001')
  };
}

function parseCustomPreferredString(yxStr = '') {
  const ipList = [];
  const domainList = [];
  const proxyList = [];
  if (!yxStr || !String(yxStr).trim()) {
    return { ipList, domainList, proxyList };
  }
  const items = String(yxStr)
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  for (const item of items) {
    // خطوط پروکسی (socks5://...) آدرس نود نیستند و نباید در لیست آی‌پی ترجیحی بیایند
    if (item.includes('://')) continue;
    let nodeName = '';
    let addrPart = item;
    if (item.includes('#')) {
      const parts = item.split('#');
      addrPart = parts[0].trim();
      nodeName = parts.slice(1).join('#').trim();
    }
    const { address, port } = parseAddressAndPort(addrPart);
    if (!address) continue;
    if (!nodeName) {
      nodeName = `${address}${port ? ':' + port : ''}`;
    }
    // پورت غیر کلادفلر یعنی این خط یک پروکسی خروجی است (مثل socks5 روی 1080/11080) و آدرس نود نیست
    if (port && !CF_HTTPS_PORTS.includes(port) && !CF_HTTP_PORTS.includes(port)) {
      proxyList.push({ proxy: `socks5://${address}:${port}`, name: nodeName });
      continue;
    }
    if (isValidIpAddress(address)) {
      ipList.push({ ip: address, port: port || 443, isp: nodeName, name: nodeName });
    } else if (isValidDomain(address) || address.includes('.')) {
      domainList.push({ domain: address, port: port || 443, name: nodeName });
    }
  }
  return { ipList, domainList, proxyList };
}

async function fetchUouinPreferredIps(cfg = {}) {
  const lineMap = {
    ctcc: '电信',
    cucc: '联通',
    cmcc: '移动',
    bgp: '多线',
    ipv6: 'IPv6'
  };
  const v4Enabled = cfg.ipv4 !== 'no';
  const v6Enabled = cfg.ipv6 !== 'no';
  const mobileEnabled = cfg.ispMobile !== 'no';
  const unicomEnabled = cfg.ispUnicom !== 'no';
  const telecomEnabled = cfg.ispTelecom !== 'no';

  try {
    const ts = String(Date.now());
    const innerHash = await md5Hex('DdlTxtN0sUOu');
    const keyHash = await md5Hex(innerHash + '70cloudflareapikey' + ts);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const resp = await fetch(`https://api.uouin.com/index.php/index/Cloudflare?key=${keyHash}&time=${ts}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return [];
    const data = await resp.json();
    const groups = data && data.data;
    if (!groups) return [];
    const results = [];
    for (const groupKey of Object.keys(lineMap)) {
      const isV6 = groupKey === 'ipv6';
      if (isV6 && !v6Enabled) continue;
      if (!isV6 && !v4Enabled) continue;
      const lineName = lineMap[groupKey];
      if (lineName === '移动' && !mobileEnabled) continue;
      if (lineName === '联通' && !unicomEnabled) continue;
      if (lineName === '电信' && !telecomEnabled) continue;
      const groupObj = groups[groupKey];
      const infoList = groupObj && Array.isArray(groupObj.info) ? groupObj.info : [];
      for (const entry of infoList) {
        const ip = normalizeNodeHost(entry && entry.ip);
        if (!ip) continue;
        results.push({ isp: lineName, ip, port: 443, colo: entry?.colo || '' });
      }
    }
    return results;
  } catch (_e) {
    return [];
  }
}

async function fetchPreferredFromUrls(urlListStr = '', defaultPort = '443', timeout = 3000) {
  if (!urlListStr || !String(urlListStr).trim()) return [];
  const urls = String(urlListStr)
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);
  if (!urls.length) return [];

  // نگاشت «host:port» → آدرس کامل پروکسی (با scheme و رمز) برای استفاده در زنجیره خروجی
  const outMap = new Map();
  await Promise.allSettled(
    urls.map(async url => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!resp.ok) return;
        const text = await resp.text();
        if (!text || !text.trim()) return;
        const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
        const isCsv = lines.length > 1 && lines[0].includes(',');
        const v6Pattern = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
        if (!isCsv) {
          for (const line of lines) {
            // پشتیبانی از خطوط scheme://user:pass@host:port (socks5/http) و host:port
            let clean = line;
            let proxyUrl = '';
            const schemeMatch = clean.match(/^([a-z0-9+.-]+):\/\//i);
            if (schemeMatch) {
              const scheme = schemeMatch[1].toLowerCase();
              if (['vless', 'vmess', 'trojan', 'ss', 'ssr'].includes(scheme)) continue;
              if (['socks5', 'socks', 'http', 'https'].includes(scheme)) proxyUrl = clean.trim();
              clean = clean.slice(schemeMatch[0].length);
            }
            if (clean.includes('@')) clean = clean.split('@').pop();
            clean = clean.split('/')[0];
            const hashIdx = clean.indexOf('#');
            const [hostPart, remark] = hashIdx > -1 ? [clean.substring(0, hashIdx), clean.substring(hashIdx)] : [clean, ''];
            let hasPort = false;
            if (hostPart.startsWith('[')) {
              hasPort = /\]:(\d+)$/.test(hostPart);
            } else {
              const colonIdx = hostPart.lastIndexOf(':');
              hasPort = colonIdx > -1 && /^\d+$/.test(hostPart.substring(colonIdx + 1));
            }
            const port = new URL(url).searchParams.get('port') || defaultPort;
            const key = hasPort ? clean : `${hostPart}:${port}${remark}`;
            if (!outMap.has(key) || proxyUrl) outMap.set(key, proxyUrl || key);
          }
        } else {
          const headers = lines[0].split(',').map(h => h.trim());
          const dataRows = lines.slice(1);
          if (headers.includes('IP地址') && headers.includes('端口')) {
            const ipIdx = headers.indexOf('IP地址');
            const portIdx = headers.indexOf('端口');
            const tlsIdx = headers.indexOf('TLS');
            for (const row of dataRows) {
              const cols = row.split(',').map(c => c.trim());
              if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') continue;
              const wrapped = v6Pattern.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
              const key = `${wrapped}:${cols[portIdx]}#CF`;
              if (!outMap.has(key)) outMap.set(key, '');
            }
          }
        }
      } catch (_e) {}
    })
  );

  const parsed = [];
  const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
  for (const [item, proxyUrl] of outMap) {
    const m = item.match(regex);
    if (m) {
      parsed.push({
        ip: normalizeNodeHost(m[1]),
        port: parseInt(m[2] || '443', 10),
        name: m[3]?.trim() || m[1],
        proxy: proxyUrl && proxyUrl !== item ? proxyUrl : ''
      });
    }
  }
  return parsed;
}

function buildVlessLinks(list, userUuid, workerHost, cfg, namer, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const { port, tls } = chooseNodePort(cfg, item, idx);

    // مسیر یکتا برای نوع نود + کشور؛ پروکسی خروجی هم داخل همان مسیر به ورکر داده می‌شود
    const itemPath = buildNodePath('vless', cfg, wkOverride, item);

    {
      const nodeName = namer(item);
      if (tls) {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'tls',
          sni: workerHost,
          fp: cfg.fp || 'chrome',
          type: 'ws',
          host: workerHost,
          path: itemPath
        });
        if (alpn) params.set('alpn', alpn);
        if (echValue) params.set('ech', echValue);
        if (fragmentValue) params.set('fragment', fragmentValue);
        links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      } else {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'none',
          type: 'ws',
          host: workerHost,
          path: itemPath
        });
        links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      }
    }
  }
  return links;
}


function rotateIpListByTimeBucket(list, rotationSetting = 'off') {
  if (!rotationSetting || rotationSetting === 'off' || !Array.isArray(list) || list.length <= 1) {
    return list;
  }
  let intervalMs = 0;
  if (rotationSetting === '5m') intervalMs = 5 * 60 * 1000;
  else if (rotationSetting === '15m') intervalMs = 15 * 60 * 1000;
  else if (rotationSetting === '30m') intervalMs = 30 * 60 * 1000;
  else if (rotationSetting === '1h') intervalMs = 60 * 60 * 1000;
  else if (rotationSetting === '6h') intervalMs = 6 * 3600 * 1000;
  else if (rotationSetting === '24h') intervalMs = 24 * 3600 * 1000;
  if (!intervalMs) return list;

  const bucket = Math.floor(Date.now() / intervalMs);
  const shift = bucket % list.length;
  if (shift === 0) return list;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

function buildShadowsocksLinks(list, userUuid, workerHost, cfg, namer) {
  const links = [];
  const sspass = (cfg.sspass && String(cfg.sspass).trim()) || userUuid;
  // این ورکر هدر Shadowsocks را به‌صورت متنی می‌خواند (parseShadowsocksHeader)، بنابراین cipher باید none باشد
  const cipher = 'none';
  const userinfo = encodeSip002UserInfo(`${cipher}:${sspass}`);

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const { port } = chooseNodePort(cfg, item, idx);
    const nodeName = namer(item);
    const itemPath = buildNodePath('ss', cfg, '', item);
    const pluginOpts = `v2ray-plugin;mode=websocket;host=${workerHost};path=${itemPath};tls`;

    // دو قالب استاندارد شادوساکس برای سازگاری با کلاینت‌های مختلف:
    // ۱) SIP002 (userinfo جدا)  ۲) قالب قدیمی base64 کامل (method:pass@host:port)
    if (idx % 2 === 0) {
      links.push(
        `ss://${userinfo}@${safeAddr}:${port}/?plugin=${encodeURIComponent(pluginOpts)}#${encodeURIComponent(nodeName)}`
      );
    } else {
      const legacy = encodeBase64Utf8(`${cipher}:${sspass}@${safeAddr}:${port}`);
      links.push(
        `ss://${legacy}?plugin=${encodeURIComponent(pluginOpts)}#${encodeURIComponent(nodeName)}`
      );
    }
  }
  return links;
}

// آدرس پروکسی داخل مسیر ws قرار می‌گیرد؛ باید فقط یک‌بار دیکد شود تا ورکر آن را درست بخواند
function encodeProxyForPath(proxy) {
  return encodeURIComponent(String(proxy || ''))
    .replace(/%3A/gi, ':')
    .replace(/%2F/gi, '/')
    .replace(/%40/gi, '@');
}

function encodeSip002UserInfo(text) {
  return btoa(String(text || ''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function buildTrojanLinks(list, userUuid, workerHost, cfg, namer, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const password = (cfg.tp && String(cfg.tp).trim()) || userUuid;
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const { port, tls } = chooseNodePort(cfg, item, idx);

    {
      const nodeName = namer(item);
      const itemPath = buildNodePath('trojan', cfg, wkOverride, item);
      if (tls) {
        const params = new URLSearchParams({
          security: 'tls',
          sni: workerHost,
          fp: cfg.fp || 'chrome',
          type: 'ws',
          host: workerHost,
          path: itemPath
        });
        if (alpn) params.set('alpn', alpn);
        if (echValue) params.set('ech', echValue);
        if (fragmentValue) params.set('fragment', fragmentValue);
        links.push(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      } else {
        const params = new URLSearchParams({
          security: 'none',
          type: 'ws',
          host: workerHost,
          path: itemPath
        });
        links.push(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      }
    }
  }
  return links;
}

function buildXhttpLinks(list, userUuid, workerHost, cfg, namer) {
  const links = [];
  const shortPath = String(userUuid || '').substring(0, 8);
  const alpn = normalizeAlpn(cfg.alpn);
  const echValue = buildEchParamValue(cfg);
  const fragmentValue = cfg.fragmentValue || '';
  const { header: xPadHeader, key: xPadKey } = getXhttpPaddingMeta(userUuid);

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const { port } = chooseNodePort(cfg, item, idx);
    const nodeName = namer(item);
    // مسیر یکتای xHTTP + کشور + پروکسی خروجی
    let xhttpPath = `/${shortPath}?nt=xhttp`;
    const xhttpCountry = String(item.country || '').trim().toUpperCase();
    if (/^[A-Z]{2}$/.test(xhttpCountry)) xhttpPath += `&cc=${xhttpCountry}`;
    if (item.proxy) xhttpPath += `&s=${encodeProxyForPath(item.proxy)}`;
    const params = new URLSearchParams({
      encryption: 'none',
      security: 'tls',
      sni: workerHost,
      fp: cfg.fp || 'chrome',
      type: 'xhttp',
      host: workerHost,
      path: xhttpPath,
      mode: 'stream-one'
    });
    params.set(
      'extra',
      JSON.stringify({
        xPaddingObfsMode: true,
        xPaddingMethod: 'tokenish',
        xPaddingPlacement: 'queryInHeader',
        xPaddingHeader: xPadHeader,
        xPaddingKey: xPadKey
      })
    );
    if (alpn) params.set('alpn', alpn);
    if (echValue) params.set('ech', echValue);
    if (fragmentValue) params.set('fragment', fragmentValue);
    links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
  }
  return links;
}

// تولید لیست کامل لینک‌های نود برای کاربر با نام‌گذاری دقیق number+miliconfig و رعایت سقف تعداد نود در ساب
async function generateUserNodesList(userOrConfig, workerHost, queryOverrides = {}) {
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);
  const userUuid = String(userOrConfig?.uuid || queryOverrides.uuid || '351c9981-04b6-4103-aa4b-864aa9c91469').toLowerCase();
  const nodeScope = queryOverrides.scope || userOrConfig?.nodeScope || 'all';
  const wkOverride = (queryOverrides.wk || cfg.wk || '').trim().toUpperCase();
  const protoFilter = (queryOverrides.proto || '').trim().toLowerCase();

  const evEnabled = protoFilter ? protoFilter === 'vless' : isEnabledValue(cfg.ev, true);
  const etEnabled = protoFilter ? protoFilter === 'trojan' : isEnabledValue(cfg.et, false);
  const exEnabled = protoFilter ? protoFilter === 'xhttp' : isEnabledValue(cfg.ex, false);
  const esEnabled = protoFilter ? (protoFilter === 'ss' || protoFilter === 'shadowsocks') : isEnabledValue(cfg.es, false);

  const namer = createMiliNodeNamer(BRAND_NAME);
  // هر پروتکل در گروه جداگانه ساخته می‌شود تا در پایان با چیدمان چرخشی
  // همه پروتکل‌ها به نسبت مساوی در سابلینک حاضر باشند (نه فقط VLESS).
  const protoGroups = { vless: [], trojan: [], ss: [], xhttp: [] };
  const rawLinks = [];

  // فرگمنت TLS بر اساس پریست انتخابی مدیر (off = بدون فرگمنت)
  // شادوساکس هیچ‌وقت پارامتر fragment نمی‌گیرد و همیشه در سابلینک می‌ماند.
  cfg.fragmentValue = buildFragmentValue(cfg);

  function appendFromSource(sourceList) {
    const safeList = filterAddressFamily(sourceList, cfg);
    if (!Array.isArray(safeList) || safeList.length === 0) return;
    if (evEnabled) protoGroups.vless.push(...buildVlessLinks(safeList, userUuid, workerHost, cfg, namer, wkOverride));
    if (etEnabled) protoGroups.trojan.push(...buildTrojanLinks(safeList, userUuid, workerHost, cfg, namer, wkOverride));
    if (exEnabled) protoGroups.xhttp.push(...buildXhttpLinks(safeList, userUuid, workerHost, cfg, namer));
    if (esEnabled) protoGroups.ss.push(...buildShadowsocksLinks(safeList, userUuid, workerHost, cfg, namer));
  }

  // چندلوکیشن: پروکسی‌های کشوری به‌عنوان زنجیره خروجی سمت ورکر استفاده می‌شوند، نه به‌عنوان آدرس نود.
  // آدرس نود یک آی‌پی ثابت واقعی کلادفلر است تا پینگ بگیرد و ترافیک از کشور انتخابی خارج شود.
  let countryMode = false;
  const countryFilter = (queryOverrides.country || '').trim().toUpperCase();
  if (countryFilter) {
    const wantedCountries = countryFilter === 'MULTI' || countryFilter === 'ALL'
      ? ['DE', 'NL', 'US', 'GB', 'TR', 'AE', 'CA', 'SE']
      : (COUNTRY_PROXY_SOURCES[countryFilter] ? [countryFilter] : []);
    const proxyPool = [];
    for (const code of wantedCountries) {
      const urls = (COUNTRY_PROXY_SOURCES[code]?.urls || []).join(',');
      if (!urls) continue;
      const found = await fetchPreferredFromUrls(urls);
      for (const item of found) {
        if (item.proxy) proxyPool.push({ proxy: item.proxy, country: code });
      }
    }
    const locationNodes = buildLocationSourceList(proxyPool, cfg, workerHost);
    if (locationNodes.length > 0) {
      appendFromSource(locationNodes);
      countryMode = true;
    }
  }

  const disablePreferred = cfg.yxby === 'yes' || nodeScope === 'origin';
  const enableNative = cfg.ena === 'yes' || nodeScope === 'origin';

  if (enableNative && nodeScope !== 'edge') {
    appendFromSource([{ ip: workerHost, isp: 'Origin' }]);
  }

  const { ipList: customIps, domainList: customDomains, proxyList: customProxies } = parseCustomPreferredString(cfg.yx);
  const hasCustomPreferred = customIps.length > 0 || customDomains.length > 0;

  // ورودی‌های پروکسی (پورت غیر CF) به نودهای زنجیره‌ای تبدیل می‌شوند تا پینگ بدهند
  if (!countryMode && customProxies.length > 0) {
    appendFromSource(buildLocationSourceList(customProxies, cfg, workerHost));
  }

  if (!disablePreferred && !countryMode) {
    if (hasCustomPreferred) {
      if (customIps.length > 0 && cfg.epi === 'yes') {
        appendFromSource(customIps);
      }
      if (customDomains.length > 0 && cfg.epd === 'yes') {
        appendFromSource(customDomains.map(d => ({ ip: d.domain, port: d.port, isp: d.name || d.domain })));
      }
    } else {
      // دامنه‌های پیش‌فرض CFnew همیشه حاضرند و با آی‌پی‌های ثابت به‌صورت متناوب
      // چیده می‌شوند تا با سقف کم نود هم حتماً در سایلینک باشند.
      const staticIpNodes = cfg.epi === 'yes'
        ? getStaticCfAddresses(cfg).map(ip => ({ ip, isp: 'CF-Static' }))
        : [];
      const domainNodes = cfg.epd === 'yes'
        ? DIRECT_DOMAINS.map(d => ({ ip: d.domain, isp: d.name || d.domain }))
        : [];
      if (staticIpNodes.length || domainNodes.length) {
        appendFromSource(interleaveAddresses(staticIpNodes, domainNodes));
      }
      // ۲) استخر آی‌پی‌های بهینه ارائه‌شده بر اساس اپراتور
      if (cfg.epi === 'yes' && !cfg.yxURL) {
        const uouinList = await fetchUouinPreferredIps(cfg);
        if (uouinList.length > 0) {
          appendFromSource(uouinList);
        }
      }
      if (cfg.egi === 'yes' && cfg.yxURL) {
        const urlList = await fetchPreferredFromUrls(cfg.yxURL);
        // خطوط دارای scheme (socks5/http) پروکسی خروجی هستند، نه آدرس نود:
        // آنها را به نودهای «آی‌پی ثابت CF + زنجیره پروکسی در مسیر» تبدیل می‌کنیم تا پینگ بدهند.
        const ipOnly = urlList.filter(x => !x.proxy);
        const proxyOnly = urlList.filter(x => x.proxy).map(x => ({ proxy: x.proxy, country: '' }));
        if (ipOnly.length > 0) {
          appendFromSource(ipOnly);
        }
        if (proxyOnly.length > 0) {
          appendFromSource(buildLocationSourceList(proxyOnly, cfg, workerHost));
        }
      }
      // اگر به هر دلیلی هیچ نودی ساخته نشد، از استخر رسمی CF استفاده می‌کنیم
      const builtCount = protoGroups.vless.length + protoGroups.trojan.length + protoGroups.ss.length + protoGroups.xhttp.length;
      if (builtCount < 15 && cfg.epi === 'yes') {
        appendFromSource(getStaticCfAddresses(cfg).map(ip => ({ ip, isp: 'CF-Direct' })));
      }
    }
  }

  if (protoGroups.vless.length === 0 && protoGroups.trojan.length === 0 && protoGroups.ss.length === 0 && protoGroups.xhttp.length === 0) {
    appendFromSource([{ ip: workerHost, port: 443, isp: 'Origin' }]);
  }

  // چیدمان چرخشی پروتکل‌ها: vless → trojan → ss → xhttp → تکرار
  const balancedLinks = interleaveProtocols(protoGroups);
  if (balancedLinks.length) rawLinks.push(...balancedLinks);

  const subNodeCount = queryOverrides.limit !== undefined
    ? parseInt(queryOverrides.limit, 10)
    : Number(userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 50);

  // اعمال چرخش خودکار آی‌پی در صورت تنظیم بازه زمانی توسط مدیر
  const rotatedLinks = rotateIpListByTimeBucket(rawLinks, cfg.ipRotation || 'off');

  // اعمال دقیق نام‌گذاری number+miliconfig و سقف تعداد نودهای ساب‌لینک کاربر
  const finalized = finalizeMiliSubscriptionLinks(rotatedLinks, subNodeCount, BRAND_NAME);

  // افزودن الزامی ۳ نود هاردکدشده اطلاع‌رسانی در صدر تمام ساب‌لینک‌ها
  return [...HARDCODED_INFO_NODES, ...finalized];
}

// تشخیص خودکار کلاینت از User-Agent در صورت عدم ارسال پارامتر target
function detectTargetFromRequest(request, url) {
  const explicit = url.searchParams.get('target');
  if (explicit && explicit.trim()) return explicit.trim().toLowerCase();
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  if (ua.includes('clash') || ua.includes('mihomo') || ua.includes('flclash') || ua.includes('stash') || ua.includes('verge')) {
    return 'clash';
  }
  if (ua.includes('sing-box') || ua.includes('singbox') || ua.includes('hiddify') || ua.includes('sfa') || ua.includes('sfm') || ua.includes('karing')) {
    return 'singbox';
  }
  if (ua.includes('surge')) return 'surge';
  if (ua.includes('quantumult')) return 'quanx';
  if (ua.includes('loon')) return 'loon';
  return 'base64';
}

async function handleSubscriptionResponse(request, userOrConfig, url = null) {
  if (!url) url = new URL(request.url);
  const workerHost = url.hostname;
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);

  // بررسی وضعیت فعال بودن، حجم و انقضای کاربر
  if (userOrConfig && userOrConfig.enabled === false) {
    const disabledNode = `vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=tls&type=ws#${encodeURIComponent('1+' + BRAND_NAME)}`;
    return new Response(btoa(disabledNode), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const target = detectTargetFromRequest(request, url);
  const isJkTarget = ['vg', 'jk', 'jiakuan'].includes(target);
  if (isJkTarget && cfg.jk !== 'yes') {
    return new Response('زنجیره اینترنت خانگی فعال نیست. در پنل مدیریت miliconfig گزینه «فعال‌سازی زنجیره اینترنت خانگی (jk)» را روشن کنید.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const queryOverrides = {
    wk: url.searchParams.get('wk') || '',
    proto: url.searchParams.get('proto') || '',
    country: url.searchParams.get('country') || '',
    scope: url.searchParams.get('scope') || userOrConfig?.nodeScope || 'all',
    limit: url.searchParams.get('limit') !== null ? url.searchParams.get('limit') : undefined
  };

  const finalLinks = await generateUserNodesList(userOrConfig, workerHost, queryOverrides);

  let bodyContent = '';
  let contentType = 'text/plain; charset=utf-8';

  switch (target) {
    case 'clash':
    case 'clashr':
    case 'stash':
    case 'meta':
    case 'clashmeta':
      bodyContent = generateClashConfig(finalLinks, cfg);
      contentType = 'text/yaml; charset=utf-8';
      break;
    case 'vg':
    case 'jk':
    case 'jiakuan':
      try {
        bodyContent = await generateResidentialChainConfig(finalLinks, {
          ...cfg,
          subNodeCount: userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 50
        });
        contentType = 'text/yaml; charset=utf-8';
      } catch (err) {
        return new Response('گره‌های اینترنت خانگی موقتاً در دسترس نیستند: ' + (err?.message || err), {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
        });
      }
      break;
    case 'singbox':
    case 'sing-box':
      bodyContent = generateSingboxConfig(finalLinks, cfg);
      contentType = 'application/json; charset=utf-8';
      break;
    case 'surge':
    case 'surge2':
    case 'surge3':
    case 'surge4':
      bodyContent = generateSurgeConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'quantumult':
    case 'quanx':
      bodyContent = generateQuanxConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'loon':
      bodyContent = generateLoonConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'raw':
    case 'plain':
      bodyContent = finalLinks.join('\n');
      contentType = 'text/plain; charset=utf-8';
      break;
    default:
      bodyContent = btoa(finalLinks.join('\n'));
      contentType = 'text/plain; charset=utf-8';
      break;
  }

  const totalBytes = userOrConfig?.dataLimitGb > 0 ? Math.floor(userOrConfig.dataLimitGb * 1073741824) : 0;
  const usedBytes = Number(userOrConfig?.usedBytes || 0);
  const expireSec = userOrConfig?.expireAt > 0 ? Math.floor(userOrConfig.expireAt / 1000) : 0;
  const profileTitle = userOrConfig?.username ? `${BRAND_NAME} - ${userOrConfig.username}` : BRAND_NAME;

  const headers = {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Profile-Title': `base64:${encodeBase64Utf8(profileTitle)}`,
    'Profile-Update-Interval': '12',
    'Subscription-Userinfo': `upload=0; download=${usedBytes}; total=${totalBytes}; expire=${expireSec}`
  };

  if (cfg.ech === 'yes') {
    headers['X-ECH-Status'] = 'ENABLED';
  }

  return new Response(bodyContent, { headers });
}


// --- MODULE: src/core/runtime.js ---
// ============================================================================
// miliconfig v3.1 - موتور هسته پروکسی (VLESS + Trojan + xhttp + SOCKS5/HTTP + GrainTCP)
// منطبق ۱۰۰٪ با کد اصلی CFnew v3.1 + احراز هویت چندکاربره D1 و ثبت ترافیک
// ============================================================================


const ADDR_TYPE_IPV4 = 1;
const ADDR_TYPE_DOMAIN = 2;
const ADDR_TYPE_IPV6 = 3;

const PROXY_KIND_SOCKS5 = 'p5';
const PROXY_KIND_HTTP = 'pt';
const PROXY_KIND_HTTPS = 'pts';

const CHUNK_SIZE = 64 * 1024;
const DOWNLOAD_PACKET_SIZE = 32 * 1024;
const DOWNLOAD_TAIL = 512;
const DOWNLOAD_DELAY = 0;
const UPLOAD_PACKET_SIZE = 16 * 1024;
const UPLOAD_QUEUE_LIMIT = 256 * 1024;
const CONNECT_RACE_COUNT = 2;
const FIRST_BYTE_TIMEOUT = 3500;

const HEX_TABLE = Array.from({ length: 256 }, (_v, i) => (i + 256).toString(16).slice(1));

function bytesToUuid(bytes, offset = 0) {
  const s = (
    HEX_TABLE[bytes[offset]] +
    HEX_TABLE[bytes[offset + 1]] +
    HEX_TABLE[bytes[offset + 2]] +
    HEX_TABLE[bytes[offset + 3]] +
    '-' +
    HEX_TABLE[bytes[offset + 4]] +
    HEX_TABLE[bytes[offset + 5]] +
    '-' +
    HEX_TABLE[bytes[offset + 6]] +
    HEX_TABLE[bytes[offset + 7]] +
    '-' +
    HEX_TABLE[bytes[offset + 8]] +
    HEX_TABLE[bytes[offset + 9]] +
    '-' +
    HEX_TABLE[bytes[offset + 10]] +
    HEX_TABLE[bytes[offset + 11]] +
    HEX_TABLE[bytes[offset + 12]] +
    HEX_TABLE[bytes[offset + 13]] +
    HEX_TABLE[bytes[offset + 14]] +
    HEX_TABLE[bytes[offset + 15]]
  ).toLowerCase();
  return isValidUuid(s) ? s : '';
}

function toUint8Array(chunk) {
  if (chunk instanceof Uint8Array) return chunk;
  if (chunk instanceof ArrayBuffer) return new Uint8Array(chunk);
  if (ArrayBuffer.isView(chunk)) return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  return new Uint8Array(chunk || 0);
}

function concatUint8Arrays(head, body) {
  const a = toUint8Array(head);
  const b = toUint8Array(body);
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a);
  out.set(b, a.byteLength);
  return out;
}

function closeSocketSafe(ws) {
  try {
    if (ws && (ws.readyState === 1 || ws.readyState === 2)) ws.close();
  } catch (_e) {}
}

function parseBase64EarlyData(b64Str) {
  if (!b64Str) return { earlyData: null, error: null };
  try {
    const clean = b64Str.replace(/-/g, '+').replace(/_/g, '/');
    return {
      earlyData: Uint8Array.from(atob(clean), c => c.charCodeAt(0)).buffer,
      error: null
    };
  } catch (error) {
    return { earlyData: null, error };
  }
}

function parseOutboundProxyConfig(rawAddr) {
  let rem = String(rawAddr || '').trim();
  if (!rem) return null;
  let kind = PROXY_KIND_SOCKS5;
  const lower = rem.toLowerCase();
  if (lower.startsWith('https://')) {
    kind = PROXY_KIND_HTTPS;
    rem = rem.slice(8);
  } else if (lower.startsWith('http://')) {
    kind = PROXY_KIND_HTTP;
    rem = rem.slice(7);
  } else if (lower.startsWith('socks5://')) {
    rem = rem.slice(9);
  } else if (lower.startsWith('socks://')) {
    rem = rem.slice(8);
  }
  const slashIdx = rem.indexOf('/');
  if (slashIdx >= 0) rem = rem.slice(0, slashIdx);
  if (!rem) throw new Error('Invalid proxy address');
  const [hostPart, authPart] = rem.split('@').reverse();
  let username, password, hostname, socksPort;
  if (authPart) {
    const parts = authPart.split(':');
    if (parts.length !== 2) throw new Error('Invalid proxy auth format');
    [username, password] = parts;
  }
  const hostSegments = hostPart.split(':');
  const lastSeg = hostSegments.pop();
  socksPort = Number(lastSeg);
  if (Number.isNaN(socksPort)) {
    if (kind === PROXY_KIND_SOCKS5) throw new Error('Invalid proxy port');
    hostSegments.push(lastSeg);
    socksPort = kind === PROXY_KIND_HTTPS ? 443 : 80;
  }
  hostname = hostSegments.join(':');
  if (!hostname) throw new Error('Empty proxy hostname');
  return { username, password, hostname, socksPort, kind };
}

function createChunkQueue(packetSize, maxBytes = packetSize, maxItems = Math.max(1, maxBytes >> 8)) {
  let queue = [];
  let head = 0;
  let queuedBytes = 0;
  let mergeBuf = null;

  function compact() {
    if (head > 32 && head * 2 >= queue.length) {
      queue = queue.slice(head);
      head = 0;
    }
  }

  function shiftOne() {
    if (head >= queue.length) return null;
    const item = queue[head];
    queue[head++] = undefined;
    queuedBytes -= item.byteLength;
    compact();
    return item;
  }

  return {
    get empty() {
      return head >= queue.length;
    },
    clear() {
      queue = [];
      head = 0;
      queuedBytes = 0;
    },
    sow(data) {
      const len = data?.byteLength || 0;
      if (!len) return true;
      if (queuedBytes + len > maxBytes || queue.length - head >= maxItems) return false;
      queue.push(data);
      queuedBytes += len;
      return true;
    },
    bundle(first = null) {
      first ||= shiftOne();
      if (!first || head >= queue.length || first.byteLength >= packetSize) return [first, false];
      let total = first.byteLength;
      let end = head;
      while (end < queue.length) {
        const next = queue[end];
        const nextTotal = total + next.byteLength;
        if (nextTotal > packetSize) break;
        total = nextTotal;
        end++;
      }
      if (end === head) return [first, false];
      const out = (mergeBuf ||= new Uint8Array(packetSize));
      out.set(first);
      let offset = first.byteLength;
      while (head < end) {
        const item = queue[head];
        queue[head++] = undefined;
        queuedBytes -= item.byteLength;
        out.set(item, offset);
        offset += item.byteLength;
      }
      compact();
      return [out.subarray(0, total), true];
    }
  };
}

function createDownloadCoalescer(ws, onBytesSent = null) {
  const maxPacket = DOWNLOAD_PACKET_SIZE;
  const tail = DOWNLOAD_TAIL;
  const minThreshold = Math.max(4096, tail << 3);
  let buf = new Uint8Array(maxPacket);
  let offset = 0;
  let timer = 0;
  let microScheduled = false;
  let pushSeq = 0;
  let snapSeq = 0;
  let deferCount = 0;

  function flush() {
    if (timer) clearTimeout(timer);
    timer = 0;
    microScheduled = false;
    if (!offset) return;
    if (ws.readyState === 1) {
      ws.send(buf.subarray(0, offset).slice());
      if (onBytesSent) onBytesSent(offset);
    }
    buf = new Uint8Array(maxPacket);
    offset = 0;
    deferCount = 0;
  }

  function schedule() {
    if (timer || microScheduled) return;
    microScheduled = true;
    snapSeq = pushSeq;
    queueMicrotask(() => {
      microScheduled = false;
      if (!offset || timer) return;
      if (maxPacket - offset < tail) return flush();
      timer = setTimeout(() => {
        timer = 0;
        if (!offset) return;
        if (maxPacket - offset < tail) return flush();
        if (deferCount < 2 && (pushSeq !== snapSeq || offset < minThreshold)) {
          deferCount++;
          snapSeq = pushSeq;
          return schedule();
        }
        flush();
      }, Math.max(DOWNLOAD_DELAY, 1));
    });
  }

  return {
    send(chunk) {
      const data = toUint8Array(chunk);
      let pos = 0;
      const len = data.byteLength;
      if (!len) return;
      while (pos < len) {
        if (!offset && len - pos >= maxPacket) {
          const sz = Math.min(maxPacket, len - pos);
          if (ws.readyState === 1) {
            ws.send(pos || sz !== len ? data.subarray(pos, pos + sz) : data);
            if (onBytesSent) onBytesSent(sz);
          }
          pos += sz;
          continue;
        }
        const sz = Math.min(maxPacket - offset, len - pos);
        buf.set(data.subarray(pos, pos + sz), offset);
        offset += sz;
        pos += sz;
        pushSeq++;
        if (offset === maxPacket || maxPacket - offset < tail) flush();
        else schedule();
      }
    },
    flush
  };
}

function openRawSocket(address, port, fetcher = null, options = undefined) {
  const target = { hostname: address, port };
  if (fetcher && typeof fetcher.connect === 'function') {
    return options === undefined ? fetcher.connect(target) : fetcher.connect(target, options);
  }
  return options === undefined ? cfConnect(target) : cfConnect(target, options);
}

async function openVerifiedSocket(address, port, fetcher = null) {
  try {
    const sock = openRawSocket(address, port, fetcher);
    if (sock?.opened) await sock.opened;
    return sock;
  } catch (err) {
    if (!fetcher) throw err;
    const sock = cfConnect({ hostname: address, port });
    if (sock?.opened) await sock.opened;
    return sock;
  }
}

async function connectRacedSocket(address, port, fetcher = null, raceCount = 1) {
  const count = Math.max(1, raceCount | 0);
  if (count <= 1) return openVerifiedSocket(address, port, fetcher);
  const tasks = Array.from({ length: count }, () => openVerifiedSocket(address, port, fetcher));
  const winner = await Promise.any(tasks);
  tasks.forEach(p => {
    p.then(sock => {
      if (sock !== winner) {
        try {
          sock.close();
        } catch (_e) {}
      }
    }, () => {});
  });
  return winner;
}

function wrapResidualSocket(sock, residualData) {
  let upstreamReader = null;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(residualData);
      upstreamReader = sock.readable.getReader();
    },
    async pull(controller) {
      const { value, done } = await upstreamReader.read();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(value);
    },
    cancel(reason) {
      try {
        upstreamReader?.cancel(reason);
      } catch (_e) {}
    }
  });
  return {
    readable,
    writable: sock.writable,
    closed: sock.closed,
    opened: sock.opened,
    close: () => sock.close()
  };
}

async function connectHttpTunnel(targetHost, targetPort, proxyCfg, fetcher = null, firstPacket = null) {
  const { username, password, hostname, socksPort, kind } = proxyCfg;
  const opts = kind === PROXY_KIND_HTTPS ? { secureTransport: 'on', allowHalfOpen: false } : undefined;
  const sock = openRawSocket(hostname, socksPort, fetcher, opts);
  if (sock?.opened) await sock.opened;
  const formattedHost = targetHost.includes(':') && !/^\[.*\]$/.test(targetHost) ? `[${targetHost}]` : targetHost;
  const authority = `${formattedHost}:${targetPort}`;
  let reqHeaders =
    `CONNECT ${authority} HTTP/1.1\r\n` +
    `Host: ${authority}\r\n` +
    `User-Agent: Mozilla/5.0\r\n` +
    `Proxy-Connection: Keep-Alive\r\n`;
  if (username) {
    reqHeaders += `Proxy-Authorization: Basic ${btoa(`${username}:${password || ''}`)}\r\n`;
  }
  reqHeaders += '\r\n';

  const writer = sock.writable.getWriter();
  const reader = sock.readable.getReader();
  try {
    await writer.write(new TextEncoder().encode(reqHeaders));
    let buf = new Uint8Array(0);
    let headerEnd = -1;
    while (headerEnd < 0) {
      const { value, done } = await reader.read();
      if (done || !value) throw new Error('Failed to open HTTP proxy tunnel');
      buf = concatUint8Arrays(buf, value);
      for (let i = 0; i + 3 < buf.length; i++) {
        if (buf[i] === 13 && buf[i + 1] === 10 && buf[i + 2] === 13 && buf[i + 3] === 10) {
          headerEnd = i + 4;
          break;
        }
      }
      if (headerEnd < 0 && buf.length > 8192) throw new Error('Invalid proxy response');
    }
    const statusLine = sharedDecoder.decode(buf.subarray(0, Math.min(headerEnd, 128)));
    if (!statusLine.startsWith('HTTP/')) throw new Error('Invalid proxy response');
    const code = Number(statusLine.split(' ')[1]);
    if (!(code >= 200 && code < 300)) throw new Error('Proxy tunnel rejected');
    const residual = buf.subarray(headerEnd);
    if (firstPacket && firstPacket.byteLength) await writer.write(firstPacket);
    writer.releaseLock();
    reader.releaseLock();
    if (residual.byteLength) return wrapResidualSocket(sock, residual);
    return sock;
  } catch (err) {
    try { writer.releaseLock(); } catch (_e) {}
    try { reader.releaseLock(); } catch (_e) {}
    try { sock.close(); } catch (_e) {}
    throw err;
  }
}

async function connectViaOutboundProxy(_addrType, targetHost, targetPort, proxyCfg, fetcher = null, firstPacket = null) {
  if (proxyCfg && (proxyCfg.kind === PROXY_KIND_HTTP || proxyCfg.kind === PROXY_KIND_HTTPS)) {
    return connectHttpTunnel(targetHost, targetPort, proxyCfg, fetcher, firstPacket);
  }
  const { username, password, hostname, socksPort } = proxyCfg;
  const sock = openRawSocket(hostname, socksPort, fetcher);
  const writer = sock.writable.getWriter();
  await writer.write(new Uint8Array(username ? [5, 2, 0, 2] : [5, 1, 0]));
  const reader = sock.readable.getReader();
  let residual = new Uint8Array(0);

  async function readExact(needed) {
    while (residual.length < needed) {
      const { value, done } = await reader.read();
      if (done || !value) throw new Error('Failed to open SOCKS5 connection');
      residual = concatUint8Arrays(residual, value);
    }
    return residual;
  }
  function consume(n) {
    const res = residual.subarray(0, n);
    residual = residual.subarray(n);
    return res;
  }

  let head = await readExact(2);
  if (head[0] !== 5 || head[1] === 255) throw new Error('No acceptable SOCKS5 auth method');
  const method = head[1];
  consume(2);
  if (method === 2) {
    if (!username || !password) throw new Error('SOCKS5 server requires auth');
    const enc = new TextEncoder();
    const uBytes = enc.encode(username);
    const pBytes = enc.encode(password);
    await writer.write(new Uint8Array([1, uBytes.length, ...uBytes, pBytes.length, ...pBytes]));
    head = await readExact(2);
    if (head[0] !== 1 || head[1] !== 0) throw new Error('SOCKS5 auth failed');
    consume(2);
  }
  const cleanHost = /^\[.*\]$/.test(String(targetHost)) ? String(targetHost).slice(1, -1) : String(targetHost);
  const hostBytes = new TextEncoder().encode(cleanHost);
  await writer.write(new Uint8Array([5, 1, 0, 3, hostBytes.length, ...hostBytes, targetPort >> 8, targetPort & 255]));
  head = await readExact(4);
  if (head[1] !== 0) throw new Error('SOCKS5 connect failed');
  const bindType = head[3];
  let replyLen = 10;
  if (bindType === 1) replyLen = 10;
  else if (bindType === 4) replyLen = 22;
  else if (bindType === 3) replyLen = 7 + (await readExact(5))[4];
  else throw new Error('Invalid SOCKS5 reply');
  await readExact(replyLen);
  consume(replyLen);
  if (firstPacket && firstPacket.byteLength) await writer.write(firstPacket);
  writer.releaseLock();
  reader.releaseLock();
  if (residual.length) return wrapResidualSocket(sock, residual);
  return sock;
}

// پارس هدر VLESS با پشتیبانی از چندکاربره (دریافت کالبک resolveUserByUuid)
function parseVlessHeader(chunk, resolveUserFn) {
  const bytes = toUint8Array(chunk);
  if (bytes.byteLength < 24) return { hasError: true, message: 'invalid data' };
  const version = bytes.subarray(0, 1);
  const incomingUuid = bytesToUuid(bytes, 1);
  const matchedUser = incomingUuid ? resolveUserFn(incomingUuid) : null;
  if (!matchedUser) {
    return { hasError: true, message: 'invalid user' };
  }
  const optLen = bytes[17];
  const cmdIndex = 18 + optLen;
  if (bytes.byteLength < cmdIndex + 5) return { hasError: true, message: 'invalid data' };
  const cmd = bytes[cmdIndex];
  let isUDP = false;
  if (cmd === 1) {
    isUDP = false;
  } else if (cmd === 2) {
    isUDP = true;
  } else {
    return { hasError: true, message: 'command is not supported' };
  }
  const portIndex = 19 + optLen;
  const port = (bytes[portIndex] << 8) | bytes[portIndex + 1];
  let addrIndex = portIndex + 2;
  let addrLen = 0;
  let addrValIndex = addrIndex + 1;
  let hostname = '';
  const addressType = bytes[addrIndex];
  switch (addressType) {
    case ADDR_TYPE_IPV4:
      addrLen = 4;
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      hostname = `${bytes[addrValIndex]}.${bytes[addrValIndex + 1]}.${bytes[addrValIndex + 2]}.${bytes[addrValIndex + 3]}`;
      break;
    case ADDR_TYPE_DOMAIN:
      if (bytes.byteLength < addrValIndex + 1) return { hasError: true, message: 'invalid data' };
      addrLen = bytes[addrValIndex++];
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      hostname = sharedDecoder.decode(bytes.subarray(addrValIndex, addrValIndex + addrLen));
      break;
    case ADDR_TYPE_IPV6: {
      addrLen = 16;
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      const parts = [];
      const dv = new DataView(bytes.buffer, bytes.byteOffset + addrValIndex, addrLen);
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid addressType: ${addressType}` };
  }
  if (!hostname) return { hasError: true, message: 'addressValue is empty' };
  return {
    hasError: false,
    addressType,
    port,
    hostname,
    isUDP,
    rawIndex: addrValIndex + addrLen,
    version,
    matchedUser
  };
}

// پارس هدر Trojan با پشتیبانی از چندکاربره

// پارس هدر استاندارد Shadowsocks (SOCKS5 address request)
function parseShadowsocksHeader(buffer) {
  const bytes = toUint8Array(buffer);
  if (bytes.byteLength < 7) {
    return { hasError: true, message: 'invalid shadowsocks data - too short' };
  }
  const atyp = bytes[0];
  let addrLen = 0;
  let addrIdx = 1;
  let hostname = '';
  switch (atyp) {
    case 1: // IPv4
      addrLen = 4;
      if (bytes.byteLength < 1 + 4 + 2) return { hasError: true, message: 'invalid SS IPv4 length' };
      hostname = bytes.subarray(addrIdx, addrIdx + addrLen).join('.');
      break;
    case 3: // Domain
      addrLen = bytes[addrIdx];
      addrIdx += 1;
      if (bytes.byteLength < addrIdx + addrLen + 2) return { hasError: true, message: 'invalid SS domain length' };
      hostname = sharedDecoder.decode(bytes.subarray(addrIdx, addrIdx + addrLen));
      break;
    case 4: { // IPv6
      addrLen = 16;
      if (bytes.byteLength < 1 + 16 + 2) return { hasError: true, message: 'invalid SS IPv6 length' };
      const dv = new DataView(bytes.buffer, bytes.byteOffset + addrIdx, addrLen);
      const parts = [];
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid SS addressType ${atyp}` };
  }
  if (!hostname) return { hasError: true, message: 'SS address is empty' };
  const portIdx = addrIdx + addrLen;
  const port = new DataView(bytes.buffer, bytes.byteOffset + portIdx, 2).getUint16(0);
  if (port < 1 || port > 65535) {
    return { hasError: true, message: `invalid SS port ${port}` };
  }
  return {
    hasError: false,
    addressType: atyp,
    port,
    hostname,
    rawPayload: bytes.subarray(portIdx + 2)
  };
}

async function parseTrojanHeader(buffer, resolveTrojanUserFn) {
  const bytes = toUint8Array(buffer);
  if (bytes.byteLength < 58) {
    return { hasError: true, message: 'invalid trojan data - too short' };
  }
  if (bytes[56] !== 0x0d || bytes[57] !== 0x0a) {
    return { hasError: true, message: 'invalid trojan header format' };
  }
  const incomingHash = sharedDecoder.decode(bytes.subarray(0, 56));
  const matchedUser = await resolveTrojanUserFn(incomingHash);
  if (!matchedUser) {
    return { hasError: true, message: 'invalid trojan password' };
  }
  const socksBuf = bytes.subarray(58);
  if (socksBuf.byteLength < 6) {
    return { hasError: true, message: 'invalid SOCKS5 request data' };
  }
  const view = new DataView(socksBuf.buffer, socksBuf.byteOffset, socksBuf.byteLength);
  const cmd = view.getUint8(0);
  if (cmd !== 1) {
    return { hasError: true, message: 'unsupported command, only TCP is allowed' };
  }
  const atyp = view.getUint8(1);
  let addrLen = 0;
  let addrIdx = 2;
  let hostname = '';
  switch (atyp) {
    case 1:
      addrLen = 4;
      hostname = socksBuf.subarray(addrIdx, addrIdx + addrLen).join('.');
      break;
    case 3:
      addrLen = socksBuf[addrIdx];
      addrIdx += 1;
      hostname = sharedDecoder.decode(socksBuf.subarray(addrIdx, addrIdx + addrLen));
      break;
    case 4: {
      addrLen = 16;
      const dv = new DataView(socksBuf.buffer, socksBuf.byteOffset + addrIdx, addrLen);
      const parts = [];
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid addressType ${atyp}` };
  }
  if (!hostname) return { hasError: true, message: 'address is empty' };
  const portIdx = addrIdx + addrLen;
  const port = new DataView(socksBuf.buffer, socksBuf.byteOffset + portIdx, 2).getUint16(0);
  return {
    hasError: false,
    addressType: atyp,
    port,
    hostname,
    rawClientData: socksBuf.subarray(portIdx + 4),
    matchedUser
  };
}

function makeWebSocketReadableStream(ws, earlyDataHeader) {
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      ws.addEventListener('message', event => {
        if (!cancelled) controller.enqueue(toUint8Array(event.data));
      });
      ws.addEventListener('close', () => {
        if (!cancelled) {
          closeSocketSafe(ws);
          try { controller.close(); } catch (_e) {}
        }
      });
      ws.addEventListener('error', err => {
        try { controller.error(err); } catch (_e) {}
      });
      const { earlyData, error } = parseBase64EarlyData(earlyDataHeader);
      if (error) controller.error(error);
      else if (earlyData) controller.enqueue(toUint8Array(earlyData));
    },
    cancel() {
      cancelled = true;
      closeSocketSafe(ws);
    }
  });
}

async function pipeRemoteToWebSocket(remoteSocket, ws, vlessHeader, retryCallback, onBytesTransferred = null) {
  let header = vlessHeader;
  let hasData = false;
  let retried = false;
  let firstByteTimer = null;

  if (retryCallback) {
    firstByteTimer = setTimeout(() => {
      if (!hasData && !retried) {
        retried = true;
        try { remoteSocket.close && remoteSocket.close(); } catch (_e) {}
        retryCallback();
      }
    }, FIRST_BYTE_TIMEOUT);
  }

  const coalescer = createDownloadCoalescer(ws, onBytesTransferred);
  let reader = null;
  let useByob = true;
  let buffer = new ArrayBuffer(CHUNK_SIZE);

  try {
    try {
      reader = remoteSocket.readable.getReader({ mode: 'byob' });
    } catch (_e) {
      useByob = false;
      reader = remoteSocket.readable.getReader();
    }
    for (;;) {
      const res = useByob ? await reader.read(new Uint8Array(buffer, 0, CHUNK_SIZE)) : await reader.read();
      if (res.done) break;
      const val = res.value;
      let chunk = toUint8Array(val);
      const nextBuf =
        useByob && val?.buffer instanceof ArrayBuffer && val.buffer.byteLength >= CHUNK_SIZE
          ? val.buffer
          : new ArrayBuffer(CHUNK_SIZE);
      if (!chunk.byteLength) continue;
      if (!hasData) {
        hasData = true;
        if (firstByteTimer) {
          clearTimeout(firstByteTimer);
          firstByteTimer = null;
        }
      }
      if (ws.readyState !== 1) throw new Error('WebSocket is not open');
      if (header) {
        chunk = concatUint8Arrays(header, chunk);
        header = null;
      }
      if (chunk.byteLength >= CHUNK_SIZE >> 1) {
        coalescer.flush();
        ws.send(chunk);
        if (onBytesTransferred) onBytesTransferred(chunk.byteLength);
        if (useByob) buffer = new ArrayBuffer(CHUNK_SIZE);
      } else {
        coalescer.send(chunk.slice());
        if (useByob) buffer = nextBuf;
      }
    }
    coalescer.flush();
  } catch (_e) {
    if (!retried) closeSocketSafe(ws);
  } finally {
    try { coalescer.flush(); } catch (_e) {}
    try { reader?.releaseLock(); } catch (_e) {}
  }

  if (firstByteTimer) clearTimeout(firstByteTimer);
  if (!hasData && !retried && retryCallback) retryCallback();
}

async function handleUdpDns(udpChunk, ws, vlessHeader, fetcher = null) {
  try {
    const sock = await connectRacedSocket('8.8.4.4', 53, fetcher, 1);
    const writer = sock.writable.getWriter();
    await writer.write(udpChunk);
    writer.releaseLock();
    await pipeRemoteToWebSocket(sock, ws, vlessHeader, null);
  } catch (_e) {}
}

async function establishOutboundAndPipe(
  addressType,
  host,
  port,
  rawClientData,
  ws,
  vlessRespHeader,
  remoteState,
  effectiveCfg,
  fetcher = null,
  onBytesTransferred = null
) {
  const fallbackAddr = (effectiveCfg.p || '').trim();
  const workerRegion = (effectiveCfg.wk || 'CF').trim().toUpperCase();
  const enableRegionMatch = (effectiveCfg.rm || '').toLowerCase() !== 'no';
  const qjMode = (effectiveCfg.qj || '').toLowerCase();
  const downgradeEnabled = qjMode === 'no';
  const proxyOnly = qjMode === 'only';

  let parsedProxy = null;
  let proxyEnabled = false;
  if (effectiveCfg.s && String(effectiveCfg.s).trim()) {
    try {
      parsedProxy = parseOutboundProxyConfig(effectiveCfg.s);
      proxyEnabled = Boolean(parsedProxy);
    } catch (_e) {
      proxyEnabled = false;
    }
  }

  const firstPacket = toUint8Array(rawClientData);
  if (firstPacket.byteLength && onBytesTransferred) {
    onBytesTransferred(firstPacket.byteLength);
  }

  async function connectAndSend(targetHost, targetPort, useProxy = false) {
    const remoteSock = useProxy
      ? await connectViaOutboundProxy(addressType, targetHost, targetPort, parsedProxy, fetcher, firstPacket)
      : await connectRacedSocket(targetHost, targetPort, fetcher, CONNECT_RACE_COUNT);
    const writer = remoteSock.writable.getWriter();
    if (!useProxy && firstPacket.byteLength) await writer.write(firstPacket);
    return { remoteSock, writer };
  }

  function detachIfCurrent(sock, writer) {
    if (remoteState.socket !== sock) return;
    try { writer?.releaseLock(); } catch (_e) {}
    remoteState.socket = null;
    remoteState.writer = null;
  }

  function bindRemote(sock, writer, retryCb) {
    try {
      if (remoteState.writer && remoteState.writer !== writer) {
        remoteState.writer.releaseLock();
      }
    } catch (_e) {}
    remoteState.socket = sock;
    remoteState.writer = writer;
    remoteState.drainUpload?.();
    sock.closed.catch(() => {}).finally(() => {
      if (remoteState.socket === sock) closeSocketSafe(ws);
    });
    pipeRemoteToWebSocket(sock, ws, vlessRespHeader, retryCb, onBytesTransferred).finally(() => {
      if (remoteState.socket === sock) {
        try { writer.releaseLock(); } catch (_e) {}
        remoteState.writer = null;
      }
    });
  }

  async function retryConnect() {
    if (proxyOnly && proxyEnabled) {
      closeSocketSafe(ws);
      return;
    }
    if (downgradeEnabled && proxyEnabled) {
      try {
        const { remoteSock, writer } = await connectAndSend(host, port, true);
        bindRemote(remoteSock, writer, null);
        return;
      } catch (_proxyErr) {
        let fbHost, fbPort;
        if (fallbackAddr) {
          const parsed = parseAddressAndPort(fallbackAddr);
          fbHost = parsed.address;
          fbPort = parsed.port || port;
        } else {
          const fb = await selectFallbackProxyAddress(workerRegion, enableRegionMatch);
          fbHost = fb ? fb.domain : host;
          fbPort = fb ? fb.port : port;
        }
        try {
          const { remoteSock, writer } = await connectAndSend(fbHost, fbPort, false);
          bindRemote(remoteSock, writer, null);
        } catch (_fbErr) {
          closeSocketSafe(ws);
        }
      }
    } else {
      let fbHost, fbPort;
      if (fallbackAddr) {
        const parsed = parseAddressAndPort(fallbackAddr);
        fbHost = parsed.address;
        fbPort = parsed.port || port;
      } else {
        const fb = await selectFallbackProxyAddress(workerRegion, enableRegionMatch);
        fbHost = fb ? fb.domain : host;
        fbPort = fb ? fb.port : port;
      }
      try {
        const { remoteSock, writer } = await connectAndSend(fbHost, fbPort, proxyEnabled);
        bindRemote(remoteSock, writer, null);
      } catch (_fbErr) {
        closeSocketSafe(ws);
      }
    }
  }

  try {
    const firstHopProxy = proxyOnly && proxyEnabled ? true : downgradeEnabled ? false : proxyEnabled;
    const { remoteSock, writer } = await connectAndSend(host, port, firstHopProxy);
    bindRemote(remoteSock, writer, () => {
      detachIfCurrent(remoteSock, writer);
      retryConnect();
    });
  } catch (_err) {
    await retryConnect();
  }
}

async function handleWebSocketUpgrade(request, env, ctx, globalCfg, allUsers, adminUuid) {
  const reqUrl = new URL(request.url);
  const queryP = reqUrl.searchParams.get('p') || '';
  const queryWk = (reqUrl.searchParams.get('wk') || '').toUpperCase();
  const queryRm = reqUrl.searchParams.get('rm') || '';
  const queryS = reqUrl.searchParams.get('s') || '';

  // تابع تشخیص کاربر بر اساس UUID در VLESS
  function resolveVlessUser(incomingUuid) {
    const lower = String(incomingUuid || '').toLowerCase();
    for (const u of allUsers) {
      if (u.uuid.toLowerCase() === lower) {
        if (!u.enabled) return null;
        if (u.dataLimitGb > 0 && u.usedBytes >= u.dataLimitGb * 1073741824) return null;
        if (u.expireAt > 0 && Date.now() > u.expireAt) return null;
        return u;
      }
    }
    if (lower === adminUuid.toLowerCase()) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  // تابع تشخیص کاربر بر اساس هش SHA-224 رمز عبور در Trojan
  async function resolveTrojanUser(incomingHash) {
    for (const u of allUsers) {
      const pass = (u.config?.tp && String(u.config.tp).trim()) || u.uuid;
      const hash = await sha224Hex(pass);
      if (hash === incomingHash) {
        if (!u.enabled) return null;
        if (u.dataLimitGb > 0 && u.usedBytes >= u.dataLimitGb * 1073741824) return null;
        if (u.expireAt > 0 && Date.now() > u.expireAt) return null;
        return u;
      }
    }
    const adminPass = (globalCfg.tp && String(globalCfg.tp).trim()) || adminUuid;
    const adminHash = await sha224Hex(adminPass);
    if (adminHash === incomingHash) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  const pair = new WebSocketPair();
  const [clientWs, serverWs] = Object.values(pair);
  serverWs.accept();
  serverWs.binaryType = 'arraybuffer';

  let remoteState = { socket: null, writer: null, drainUpload: null };
  let isDnsSession = false;
  let detectedProto = null;
  let matchedUserObj = null;
  let sessionBytes = 0;
  let draining = false;
  let closed = false;
  const uploadQueue = createChunkQueue(UPLOAD_PACKET_SIZE, UPLOAD_QUEUE_LIMIT, UPLOAD_QUEUE_LIMIT >> 8);
  const fetcher = request.fetcher;

  function addTransferredBytes(n) {
    sessionBytes += Number(n) || 0;
  }

  function flushSessionTraffic() {
    if (matchedUserObj?.id && sessionBytes > 0) {
      const bytesToRecord = sessionBytes;
      sessionBytes = 0;
      const p = recordUserActivity(env, matchedUserObj.id, bytesToRecord, 1).catch(() => {});
      if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
    }
  }

  function closeTransport() {
    if (closed) return;
    closed = true;
    uploadQueue.clear();
    try { remoteState.writer?.releaseLock(); } catch (_e) {}
    remoteState.writer = null;
    try { remoteState.socket?.close(); } catch (_e) {}
    closeSocketSafe(serverWs);
    flushSessionTraffic();
  }

  function enqueueUpload(chunk) {
    const data = toUint8Array(chunk);
    if (!data.byteLength) return true;
    addTransferredBytes(data.byteLength);
    if (!uploadQueue.sow(data)) {
      closeTransport();
      return false;
    }
    remoteState.drainUpload?.();
    return true;
  }

  async function drainUploadQueue() {
    if (draining || closed || !remoteState.writer) return;
    draining = true;
    try {
      for (;;) {
        if (closed || !remoteState.writer) break;
        const [bundled] = uploadQueue.bundle();
        if (!bundled) break;
        await remoteState.writer.write(bundled);
      }
    } catch (_e) {
      closeTransport();
    } finally {
      draining = false;
      if (!uploadQueue.empty && !closed && remoteState.writer) queueMicrotask(drainUploadQueue);
    }
  }

  remoteState.drainUpload = () => {
    if (!draining && !uploadQueue.empty && remoteState.writer) queueMicrotask(drainUploadQueue);
  };

  const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
  const wsReadable = makeWebSocketReadableStream(serverWs, earlyDataHeader);

  wsReadable
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          if (closed) return;
          const data = toUint8Array(chunk);
          if (isDnsSession) return await handleUdpDns(data, serverWs, null, fetcher);
          if (remoteState.socket && remoteState.writer) {
            if (!enqueueUpload(data)) throw new Error('upload queue overflow');
            return;
          }
          if (detectedProto) {
            if (!enqueueUpload(data)) throw new Error('upload queue overflow');
            return;
          }

          // تلاش برای VLESS
          if (data.byteLength >= 24) {
            const vlessRes = parseVlessHeader(data, resolveVlessUser);
            if (!vlessRes.hasError) {
              detectedProto = 'vless';
              matchedUserObj = vlessRes.matchedUser;
              const userCfg = {
                ...globalCfg,
                ...(matchedUserObj?.config || {}),
                ...(queryP ? { p: queryP } : {}),
                ...(queryWk ? { wk: queryWk } : {}),
                ...(queryRm ? { rm: queryRm } : {}),
                ...(queryS ? { s: queryS } : {})
              };
              if (vlessRes.isUDP) {
                if (vlessRes.port === 53) isDnsSession = true;
                else throw new Error('UDP proxy only enabled for DNS port 53');
              }
              const respHeader = new Uint8Array([vlessRes.version[0], 0]);
              const rawPayload = data.subarray(vlessRes.rawIndex);
              if (isDnsSession) return handleUdpDns(rawPayload, serverWs, respHeader, fetcher);
              await establishOutboundAndPipe(
                vlessRes.addressType,
                vlessRes.hostname,
                vlessRes.port,
                rawPayload,
                serverWs,
                respHeader,
                remoteState,
                userCfg,
                fetcher,
                addTransferredBytes
              );
              return;
            }
          }

          // تلاش برای Trojan
          if (data.byteLength >= 58) {
            const trojanRes = await parseTrojanHeader(data, resolveTrojanUser);
            if (!trojanRes.hasError) {
              detectedProto = 'trojan';
              matchedUserObj = trojanRes.matchedUser;
              const userCfg = {
                ...globalCfg,
                ...(matchedUserObj?.config || {}),
                ...(queryP ? { p: queryP } : {}),
                ...(queryWk ? { wk: queryWk } : {}),
                ...(queryRm ? { rm: queryRm } : {}),
                ...(queryS ? { s: queryS } : {})
              };
              await establishOutboundAndPipe(
                trojanRes.addressType,
                trojanRes.hostname,
                trojanRes.port,
                trojanRes.rawClientData,
                serverWs,
                null,
                remoteState,
                userCfg,
                fetcher,
                addTransferredBytes
              );
              return;
            }
          }

          // تلاش برای Shadowsocks (SS-WS)
          if (data.byteLength >= 7) {
            const ssRes = parseShadowsocksHeader(data);
            if (!ssRes.hasError) {
              const querySsPass = reqUrl.searchParams.get('sspass') || '';
              let ssUser = null;
              if (querySsPass) {
                ssUser = allUsers.find(u => (u.config?.sspass || u.uuid) === querySsPass);
              }
              if (!ssUser) {
                ssUser = allUsers.find(u => u.config?.es === 'yes') || (globalCfg.es === 'yes' ? { id: null, username: 'admin', uuid: adminUuid, config: globalCfg } : null);
              }
              if (!ssUser && allUsers.length > 0) {
                ssUser = allUsers[0];
              }
              if (ssUser) {
                detectedProto = 'ss';
                matchedUserObj = ssUser;
                const userCfg = {
                  ...globalCfg,
                  ...(matchedUserObj?.config || {}),
                  ...(queryP ? { p: queryP } : {}),
                  ...(queryWk ? { wk: queryWk } : {}),
                  ...(queryRm ? { rm: queryRm } : {}),
                  ...(queryS ? { s: queryS } : {})
                };
                await establishOutboundAndPipe(
                  ssRes.addressType,
                  ssRes.hostname,
                  ssRes.port,
                  ssRes.rawPayload,
                  serverWs,
                  null,
                  remoteState,
                  userCfg,
                  fetcher,
                  addTransferredBytes
                );
                return;
              }
            }
          }

          throw new Error('Invalid protocol or authentication failed');
        }
      })
    )
    .catch(() => {
      closeTransport();
    });

  return new Response(null, { status: 101, webSocket: clientWs });
}

// ============================================================================
// پروتکل xhttp (HTTP POST Streaming) با پشتیبانی از چندکاربره
// ============================================================================
const XHTTP_HUFFMAN_LEN = [
  13, 23, 28, 28, 28, 28, 28, 28, 28, 24, 30, 28, 28, 30, 28, 28,
  28, 28, 28, 28, 28, 28, 30, 28, 28, 28, 28, 28, 28, 28, 28, 28,
  6, 10, 10, 12, 13, 6, 8, 11, 10, 10, 8, 11, 8, 6, 6, 6,
  5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 7, 8, 15, 6, 12, 10,
  13, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 8, 13, 19, 13, 14, 6,
  15, 5, 6, 5, 6, 5, 6, 6, 6, 5, 7, 7, 6, 6, 6, 5,
  6, 7, 6, 5, 5, 6, 7, 7, 7, 7, 7, 15, 11, 14, 13, 28,
  20, 22, 20, 20, 22, 22, 22, 23, 22, 23, 23, 23, 23, 23, 24, 23,
  24, 24, 22, 23, 24, 23, 23, 23, 23, 21, 22, 23, 22, 23, 23, 24,
  22, 21, 20, 22, 22, 23, 23, 21, 23, 22, 22, 24, 21, 22, 23, 23,
  21, 21, 22, 21, 23, 22, 23, 23, 20, 22, 22, 22, 23, 22, 22, 23,
  26, 26, 20, 19, 22, 23, 22, 25, 26, 26, 26, 27, 27, 26, 24, 25,
  19, 21, 26, 27, 27, 26, 27, 24, 21, 21, 26, 26, 28, 27, 27, 27,
  20, 24, 20, 21, 22, 21, 21, 23, 22, 22, 25, 25, 24, 24, 26, 23,
  26, 27, 26, 26, 27, 27, 27, 27, 27, 28, 27, 27, 27, 27, 27, 26,
  30
];

const XHTTP_PAD_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateXhttpPaddingString(len) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += XHTTP_PAD_CHARS[Math.floor(Math.random() * XHTTP_PAD_CHARS.length)];
  }
  return out;
}

function calcHuffmanByteLen(str) {
  const bytes = new TextEncoder().encode(str);
  let bits = 0;
  for (let i = 0; i < bytes.length; i++) bits += XHTTP_HUFFMAN_LEN[bytes[i]];
  return Math.ceil(bits / 8);
}

function validateXhttpPadding(request, padHeader, padKey) {
  let padVal = '';
  const hVal = request.headers.get(padHeader);
  if (hVal) {
    try {
      const parsed = new URL(hVal, 'https://x.invalid');
      padVal = parsed.searchParams.get(padKey) || hVal;
    } catch (_e) {
      padVal = hVal;
    }
  } else {
    try {
      padVal = new URL(request.url).searchParams.get(padKey) || '';
    } catch (_e) {
      padVal = '';
    }
  }
  if (!padVal) return true;
  const len = calcHuffmanByteLen(padVal);
  return len >= 98 && len <= 1002;
}

async function readXhttpHeader(readableStream, resolveUserFn) {
  const reader = readableStream.getReader({ mode: 'byob' });
  try {
    let res = await reader.readAtLeast(18, new Uint8Array(new ArrayBuffer(128 * 1024)));
    let totalRead = res.value.length;
    let buf = res.value;
    const version = buf[0];
    const incomingUuid = bytesToUuid(buf, 1);
    const matchedUser = incomingUuid ? resolveUserFn(incomingUuid) : null;
    if (!matchedUser) {
      try { reader.releaseLock(); } catch (_e) {}
      return null;
    }
    const optLen = buf[17];
    const addrOffset = 18 + optLen + 1 + 2 + 1;
    if (addrOffset + 1 > totalRead) {
      if (res.done) return null;
      const needed = addrOffset + 1 - totalRead;
      res = await reader.readAtLeast(needed, new Uint8Array(new ArrayBuffer(128 * 1024)));
      totalRead += res.value.length;
      buf = concatUint8Arrays(buf, res.value);
    }
    const cmd = buf[18 + optLen];
    if (cmd !== 1) return null;
    const port = (buf[addrOffset - 3] << 8) + buf[addrOffset - 2];
    const atyp = buf[addrOffset - 1];
    let headerLen = -1;
    if (atyp === ADDR_TYPE_IPV4) headerLen = addrOffset + 4;
    else if (atyp === ADDR_TYPE_IPV6) headerLen = addrOffset + 16;
    else if (atyp === ADDR_TYPE_DOMAIN) headerLen = addrOffset + 1 + buf[addrOffset];
    if (headerLen < 0) return null;
    const rem = headerLen - totalRead;
    if (rem > 0) {
      if (res.done) return null;
      res = await reader.readAtLeast(rem, new Uint8Array(new ArrayBuffer(128 * 1024)));
      totalRead += res.value.length;
      buf = concatUint8Arrays(buf, res.value);
    }
    let hostname = '';
    if (atyp === ADDR_TYPE_IPV4) {
      hostname = buf.slice(addrOffset, addrOffset + 4).join('.');
    } else if (atyp === ADDR_TYPE_DOMAIN) {
      hostname = sharedDecoder.decode(buf.slice(addrOffset + 1, addrOffset + 1 + buf[addrOffset]));
    } else if (atyp === ADDR_TYPE_IPV6) {
      hostname = buf
        .slice(addrOffset, addrOffset + 16)
        .reduce((acc, v, i, arr) => (i % 2 ? acc.concat(((arr[i - 1] << 8) + v).toString(16)) : acc), [])
        .join(':');
    }
    if (!hostname) return null;
    return {
      hostname,
      port,
      data: buf.slice(headerLen),
      resp: new Uint8Array([version, 0]),
      reader,
      done: res.done,
      matchedUser
    };
  } catch (_e) {
    try { reader.releaseLock(); } catch (_ig) {}
    return null;
  }
}

async function handleXhttpPostRequest(request, env, ctx, globalCfg, allUsers, adminUuid) {
  if (!request.body) return new Response('Bad Request', { status: 400 });

  function resolveUserFn(incomingUuid) {
    const lower = String(incomingUuid || '').toLowerCase();
    for (const u of allUsers) {
      if (u.uuid.toLowerCase() === lower && u.enabled) return u;
    }
    if (lower === adminUuid.toLowerCase()) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  const parsedHeader = await readXhttpHeader(request.body, resolveUserFn);
  if (!parsedHeader) {
    return new Response('Bad Request', { status: 400 });
  }

  const matchedUser = parsedHeader.matchedUser;
  const userUuid = matchedUser.uuid || adminUuid;
  const { header: xPadHeader, key: xPadKey } = getXhttpPaddingMeta(userUuid);
  if (!validateXhttpPadding(request, xPadHeader, xPadKey)) {
    return new Response('Bad Request', { status: 400 });
  }

  let remoteSocket = null;
  try {
    remoteSocket = await connectRacedSocket(parsedHeader.hostname, parsedHeader.port, request.fetcher, CONNECT_RACE_COUNT);
  } catch (_e) {
    const fb = await selectFallbackProxyAddress(globalCfg.wk || 'CF', true);
    if (!fb) return new Response('Gateway Timeout', { status: 504 });
    try {
      remoteSocket = await connectRacedSocket(fb.domain, fb.port || parsedHeader.port, request.fetcher, 1);
    } catch (_e2) {
      return new Response('Bad Gateway', { status: 502 });
    }
  }

  let totalBytes = 0;
  const upPromise = (async () => {
    const writer = remoteSocket.writable.getWriter();
    try {
      if (parsedHeader.data && parsedHeader.data.length) {
        totalBytes += parsedHeader.data.length;
        await writer.write(parsedHeader.data);
      }
      while (!parsedHeader.done) {
        const r = await parsedHeader.reader.read(new Uint8Array(new ArrayBuffer(64 * 1024)));
        if (r.done) break;
        if (r.value && r.value.length) {
          totalBytes += r.value.length;
          await writer.write(r.value);
        }
      }
    } catch (_e) {} finally {
      try { await writer.close(); } catch (_e) {}
      try { parsedHeader.reader.releaseLock(); } catch (_e) {}
    }
  })();

  const { readable, writable } = new TransformStream();
  const downPromise = (async () => {
    const writer = writable.getWriter();
    const reader = remoteSocket.readable.getReader();
    try {
      await writer.write(parsedHeader.resp);
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
        if (r.value && r.value.length) {
          totalBytes += r.value.length;
          await writer.write(r.value);
        }
      }
      await writer.close();
    } catch (_e) {} finally {
      try { reader.releaseLock(); } catch (_e) {}
      try { writer.releaseLock(); } catch (_e) {}
    }
  })();

  const closedPromise = Promise.allSettled([upPromise, downPromise]).finally(() => {
    try { remoteSocket.close(); } catch (_e) {}
    if (matchedUser?.id && totalBytes > 0) {
      recordUserActivity(env, matchedUser.id, totalBytes, 1).catch(() => {});
    }
  });

  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(closedPromise);
  }

  const respHeaders = {
    'X-Accel-Buffering': 'no',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive',
    'User-Agent': 'Go-http-client/2.0',
    'Content-Type': 'application/grpc'
  };
  try {
    const padUrl = new URL('https://x.invalid/');
    padUrl.searchParams.set(xPadKey, generateXhttpPaddingString(100 + Math.floor(Math.random() * 901)));
    respHeaders[xPadHeader] = padUrl.toString();
  } catch (_e) {}

  return new Response(readable, { headers: respHeaders });
}


// --- MODULE: src/api/handlers.js ---
// ============================================================================
// miliconfig v3.1 - هندلرهای REST API (مدیریت کاربران D1، تنظیمات، نودهای ترجیحی، وضعیت سیستم)
// ============================================================================


function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

// حذف اطلاعات حساس (هش رمز مدیر) از پاسخ‌های API
function sanitizeConfigForClient(raw = {}) {
  const copy = { ...(raw || {}) };
  delete copy.adminPasswordHash;
  delete copy.admin_password_hash;
  return copy;
}

function sanitizeUserForClient(user) {
  if (!user || typeof user !== 'object') return user;
  return { ...user, config: sanitizeConfigForClient(user.config || {}) };
}

// تجزیه لیست پروکسی: پشتیبانی از socks5://user:pass@host:port و host:port
// آدرس کامل پروکسی (با پروتکل و رمز) برای تنظیم مقدار s حفظ می‌شود.
function parseProxyLines(text, defaultProtocol = '') {
  const out = [];
  for (const raw of String(text || '').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    let protocol = 'TCP';
    let proxyUrl = '';
    let rest = line;
    const scheme = rest.match(/^([a-z0-9+.-]+):\/\//i);
    if (scheme) {
      protocol = scheme[1].toUpperCase();
      const schemeName = scheme[1].toLowerCase();
      const rawRest = rest.slice(scheme[0].length).split('#')[0].trim();
      if (['socks5', 'socks', 'http', 'https'].includes(schemeName)) {
        proxyUrl = `${schemeName}://${rawRest}`;
      }
      rest = rest.slice(scheme[0].length);
    }
    rest = rest.split('#')[0].trim();
    if (rest.includes('@')) rest = rest.split('@').pop();
    rest = rest.split('/')[0].trim();
    let host = '';
    let port = 0;
    if (rest.startsWith('[')) {
      const m = rest.match(/^\[([^\]]+)\]:(\d{1,5})/);
      if (m) { host = m[1]; port = parseInt(m[2], 10); }
    } else {
      const idx = rest.lastIndexOf(':');
      if (idx > 0) { host = rest.slice(0, idx).trim(); port = parseInt(rest.slice(idx + 1), 10); }
    }
    if (!host || !Number.isFinite(port) || port < 1 || port > 65535) continue;
    if (/^(vless|vmess|trojan|ss|ssr)$/i.test(protocol)) continue;
    let proto = protocol === 'HTTPS' ? 'HTTPS' : protocol === 'HTTP' ? 'HTTP' : protocol === 'SOCKS5' ? 'SOCKS5' : protocol === 'SOCKS4' ? 'SOCKS4' : 'TCP';
    // لیست‌های بدون scheme (مثل monosans) از مسیر منبع تشخیص داده می‌شوند
    if (proto === 'TCP' && defaultProtocol) {
      proto = defaultProtocol;
      proxyUrl = `${defaultProtocol.toLowerCase()}://${host}:${port}`;
    }
    const family = host.includes(':') ? 'ipv6' : (/^\d+\.\d+\.\d+\.\d+$/.test(host) ? 'ipv4' : 'domain');
    out.push({ host, port, protocol: proto, proxy: proxyUrl, family });
  }
  return out;
}

// --- اسکنر آی‌پی: تجزیه رنج‌های CIDR و انتخاب تصادفی آدرس سالم ---
function parseRangeLines(text) {
  const out = [];
  for (const raw of String(text || '').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([0-9a-fA-F:.]+)\/(\d{1,3})$/);
    if (!m) continue;
    const base = m[1];
    const bits = parseInt(m[2], 10);
    if (!Number.isFinite(bits)) continue;
    if (base.includes(':')) {
      if (bits <= 128) out.push({ family: 'ipv6', base, bits });
    } else if (/^\d+\.\d+\.\d+\.\d+$/.test(base) && bits <= 32) {
      out.push({ family: 'ipv4', base, bits });
    }
  }
  return out;
}

function ipv4ToInt(ip) {
  const parts = String(ip).split('.').map(p => parseInt(p, 10) || 0);
  return (((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
}

function intToIpv4(value) {
  return [24, 16, 8, 0].map(shift => (value >>> shift) & 255).join('.');
}

function randomIpv4FromRange(base, bits) {
  const hostBits = 32 - bits;
  const size = Math.pow(2, hostBits);
  const offset = size > 2 ? 1 + Math.floor(Math.random() * (size - 2)) : 0;
  return intToIpv4((ipv4ToInt(base) + offset) >>> 0);
}

function ipv6ToBigInt(text) {
  const s = String(text || '').trim();
  if (!s.includes(':')) return 0n;
  const [head, tail] = s.split('::');
  const headParts = head ? head.split(':').filter(Boolean) : [];
  const tailParts = tail !== undefined ? (tail ? tail.split(':').filter(Boolean) : []) : null;
  const groups = tailParts === null
    ? headParts
    : [...headParts, ...Array(Math.max(0, 8 - headParts.length - tailParts.length)).fill('0'), ...tailParts];
  if (groups.length !== 8) return 0n;
  let value = 0n;
  for (const group of groups) value = (value << 16n) + BigInt(parseInt(group, 16) || 0);
  return value;
}

function bigIntToIpv6(value) {
  const groups = [];
  for (let i = 7; i >= 0; i--) groups.push(Number((value >> BigInt(i * 16)) & 0xffffn));
  let bestStart = -1;
  let bestLen = 0;
  for (let i = 0; i < groups.length; i++) {
    if (groups[i] !== 0) continue;
    let len = 0;
    while (i + len < groups.length && groups[i + len] === 0) len++;
    if (len > bestLen && len >= 2) { bestStart = i; bestLen = len; }
    i += len - 1;
  }
  const hex = groups.map(g => g.toString(16));
  if (bestStart < 0) return hex.join(':');
  const before = hex.slice(0, bestStart).join(':');
  const after = hex.slice(bestStart + bestLen).join(':');
  return `${before}::${after}`;
}

function randomIpv6FromRange(base, bits) {
  const hostBits = 128 - bits;
  const baseValue = ipv6ToBigInt(base);
  if (hostBits <= 0) return bigIntToIpv6(baseValue);
  const size = 1n << BigInt(hostBits);
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  const rand = BigInt('0x' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')) % size;
  return bigIntToIpv6(baseValue + rand);
}

// تجزیه فهرست آی‌پی/دامنه ثابت (هر خط یک آدرس، با یا بدون پورت)
function parseIpCandidateLines(text, family = 'any') {
  const out = [];
  const seen = new Set();
  for (const raw of String(text || '').split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    line = line.split('#')[0].trim();
    if (line.includes('/')) line = line.split('/')[0].trim();
    if (line.includes('://')) {
      try { line = new URL(line).hostname; } catch (_e) { continue; }
    }
    if (line.includes('@')) line = line.split('@').pop();
    const { address } = parseAddressAndPort(line);
    if (!address) continue;
    const isV6 = address.includes(':');
    if (family === 'ipv4' && isV6) continue;
    if (family === 'ipv6' && !isV6) continue;
    if (isV6) {
      if (!isValidIpAddress(address)) continue;
    } else if (!isValidIpAddress(address) && !isValidDomain(address)) {
      continue;
    }
    if (seen.has(address)) continue;
    seen.add(address);
    out.push({
      host: address,
      port: 443,
      family: isV6 ? 'ipv6' : (isValidIpAddress(address) ? 'ipv4' : 'domain'),
      kind: 'ip'
    });
  }
  return out;
}

function shuffleList(list) {
  return (Array.isArray(list) ? list.slice() : []).sort(() => 0.5 - Math.random());
}

// برش چرخشی از یک استخر تا سقف subrequest کلادفلر حفظ شود
function pickRotating(list, count, seed = Date.now()) {
  const items = Array.isArray(list) ? list : [];
  if (!items.length) return [];
  const start = Math.floor(seed / 60000) % items.length;
  const out = [];
  for (let i = 0; i < Math.min(count, items.length); i++) out.push(items[(start + i) % items.length]);
  return out;
}

async function fetchSourceText(url, timeoutMs = 3500) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const separator = url.includes('?') ? '&' : '?';
    const res = await fetch(`${url}${separator}_mili=${Date.now()}`, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'User-Agent': 'miliconfig-scanner/3.1',
        'Cache-Control': 'no-cache'
      }
    });
    clearTimeout(timer);
    if (!res.ok) return '';
    return await res.text();
  } catch (_e) {
    return '';
  }
}

async function fetchProxySource(url, timeoutMs = 3500) {
  const lower = String(url || '').toLowerCase();
  const defaultProtocol = /socks/.test(lower) ? 'SOCKS5' : /http/.test(lower) ? 'HTTP' : '';
  return parseProxyLines(await fetchSourceText(url, timeoutMs), defaultProtocol);
}

// تست واقعی اتصال TCP و اندازه‌گیری پینگ
async function probeTcp(host, port, timeoutMs = 1800) {
  const started = Date.now();
  let socket;
  try {
    socket = connect({ hostname: host, port });
    const guard = new Promise((_resolve, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs));
    await Promise.race([socket.opened, guard]);
    const latencyMs = Date.now() - started;
    try { socket.close(); } catch (_e) {}
    return { ok: true, latencyMs };
  } catch (err) {
    try { if (socket) socket.close(); } catch (_e2) {}
    return { ok: false, latencyMs: 0, error: String((err && err.message) || err || 'connect_failed').slice(0, 40) };
  }
}

function parseYxArray(yxStr = '') {
  if (!yxStr || !String(yxStr).trim()) return [];
  const items = String(yxStr)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const res = [];
  for (const item of items) {
    let name = '';
    let addrPart = item;
    if (item.includes('#')) {
      const parts = item.split('#');
      addrPart = parts[0].trim();
      name = parts.slice(1).join('#').trim();
    }
    const { address, port } = parseAddressAndPort(addrPart);
    if (!address) continue;
    if (!name) name = `${address}:${port || 443}`;
    res.push({
      ip: address,
      port: port || 443,
      name,
      addedAt: new Date().toISOString()
    });
  }
  return res;
}

function serializeYxArray(arr = []) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  return arr.map(item => {
    const host = String(item.ip || '').includes(':') ? `[${item.ip}]` : item.ip;
    return `${host}:${item.port || 443}#${item.name || item.ip}`;
  }).join(',');
}

// ۱. مدیریت تنظیمات سراسری پنل (/api/config)
async function handleConfigApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';

  if (request.method === 'GET') {
    const cfg = sanitizeConfigForClient(await loadGlobalConfig(env));
    const diag = await getStorageDiagnostics(env);
    return jsonResponse({
      ...cfg,
      kvEnabled: true,
      d1Enabled: diag.d1Enabled,
      d1BindingName: diag.d1BindingName,
      storageMode: diag.d1Enabled ? 'D1' : diag.kvEnabled ? 'KV' : 'Memory'
    });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      if (body && body._reset === true) {
        const cfg = await resetGlobalConfig(env);
        await addAuditLog(env, 'بازنشانی تنظیمات پنل', 'Reset to defaults', clientIp);
        return jsonResponse({
          success: true,
          message: 'تمام تنظیمات به مقادیر پیش‌فرض بازنشانی شد',
          config: sanitizeConfigForClient(cfg)
        });
      }
      const updated = await saveGlobalConfig(env, body || {});
      await addAuditLog(env, 'ذخیره تنظیمات پنل', 'بروزرسانی پیکربندی سراسری', clientIp);
      return jsonResponse({
        success: true,
        message: 'تنظیمات با موفقیت در دیتابیس ذخیره شد',
        config: sanitizeConfigForClient(updated)
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ذخیره تنظیمات: ' + (err?.message || String(err))
      }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۲. مدیریت کامل کاربران در دیتابیس D1 (/api/users)
async function handleUsersApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const users = await listUsers(env);
    const globalCfg = await loadGlobalConfig(env);
    return jsonResponse({
      success: true,
      brand: BRAND_NAME,
      defaults: sanitizeConfigForClient({
        ...CONFIG_DEFAULTS,
        ...globalCfg
      }),
      presets: USER_PRESETS,
      count: users.length,
      users: users.map(sanitizeUserForClient)
    });
  }

  if (request.method === 'POST') {
    try {
      const currentUsers = await listUsers(env);
      if (currentUsers.length >= MAX_USERS_LIMIT) {
        return jsonResponse({
          success: false,
          error: 'LIMIT_REACHED',
          message: 'حداکثر سقف مجاز ایجاد کاربر (۳ کاربر) تکمیل شده است. طبق سیاست امنیتی، بیش از ۳ کاربر قابل تعریف نیست.'
        }, 400);
      }
      const body = await request.json();
      const created = await createUser(env, body || {}, clientIp);
      return jsonResponse({
        success: true,
        message: `کاربر «${created.username}» با موفقیت ساخته شد`,
        user: sanitizeUserForClient(created)
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ساخت کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  if (request.method === 'PUT') {
    try {
      const body = await request.json();
      const targetId = body.id || url.searchParams.get('id');
      if (!targetId) {
        return jsonResponse({ success: false, message: 'شناسه کاربر الزامی است' }, 400);
      }
      if (body.action === 'reset') {
        const resetObj = await resetUserStats(env, targetId, clientIp);
        if (!resetObj) return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
        return jsonResponse({
          success: true,
          message: `مصرف کاربر «${resetObj.username}» صفر شد`,
          user: resetObj
        });
      }
      const updated = await updateUser(env, targetId, body, clientIp);
      if (!updated) {
        return jsonResponse({ success: false, message: 'کاربر مورد نظر یافت نشد' }, 404);
      }
      return jsonResponse({
        success: true,
        message: `تنظیمات کاربر «${updated.username}» بروزرسانی شد`,
        user: sanitizeUserForClient(updated)
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ویرایش کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  if (request.method === 'DELETE') {
    try {
      let targetId = url.searchParams.get('id');
      if (!targetId) {
        try {
          const body = await request.json();
          targetId = body?.id;
        } catch (_e) {}
      }
      if (!targetId) {
        return jsonResponse({ success: false, message: 'شناسه کاربر الزامی است' }, 400);
      }
      const ok = await deleteUser(env, targetId, clientIp);
      if (!ok) {
        return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
      }
      return jsonResponse({
        success: true,
        message: 'کاربر با موفقیت حذف شد'
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در حذف کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۳. مدیریت لیست IP ترجیحی (/api/preferred-ips) - سازگار با yx-tools و پنل گرافیکی
async function handlePreferredIpsApi(request, env, bypassAeCheck = false) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const cfg = await loadGlobalConfig(env);
  if (!bypassAeCheck && cfg.ae !== 'yes' && request.headers.get('X-Mili-Admin') !== '1') {
    return jsonResponse({
      success: false,
      error: 'API غیرفعال است',
      message: 'برای استفاده از API خارجی، گزینه «اجازه مدیریت API (ae)» را در تنظیمات فعال کنید.'
    }, 403);
  }

  try {
    if (request.method === 'GET') {
      const list = parseYxArray(cfg.yx || '');
      return jsonResponse({
        success: true,
        count: list.length,
        data: list
      });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const itemsToAdd = Array.isArray(body) ? body : [body];
      if (!itemsToAdd.length) {
        return jsonResponse({ success: false, message: 'لیست IP ارسالی خالی است' }, 400);
      }
      const currentList = parseYxArray(cfg.yx || '');
      const added = [];
      const skipped = [];
      const errors = [];

      for (const item of itemsToAdd) {
        const rawIp = String(item?.ip || item?.domain || '').trim();
        if (!rawIp) {
          errors.push({ ip: 'نامشخص', reason: 'آدرس IP یا دامنه الزامی است' });
          continue;
        }
        const port = parseInt(item.port || 443, 10) || 443;
        const name = String(item.name || `${rawIp}:${port}`).trim();
        if (!isValidIpAddress(rawIp) && !isValidDomain(rawIp)) {
          errors.push({ ip: rawIp, reason: 'فرمت IP یا دامنه نامعتبر است' });
          continue;
        }
        if (currentList.some(x => x.ip === rawIp && x.port === port)) {
          skipped.push({ ip: rawIp, port, reason: 'قبلاً ثبت شده است' });
          continue;
        }
        const entry = { ip: rawIp, port, name, addedAt: new Date().toISOString() };
        currentList.push(entry);
        added.push(entry);
      }

      if (added.length > 0) {
        await saveGlobalConfig(env, { yx: serializeYxArray(currentList) });
      }

      return jsonResponse({
        success: added.length > 0,
        message: `${added.length} نود ترجیحی با موفقیت اضافه شد`,
        added: added.length,
        skipped: skipped.length,
        errors: errors.length,
        data: { addedIPs: added, skippedIPs: skipped, errors }
      });
    }

    if (request.method === 'DELETE') {
      const body = await request.json();
      if (body?.all === true) {
        const currentList = parseYxArray(cfg.yx || '');
        await saveGlobalConfig(env, { yx: '' });
        return jsonResponse({
          success: true,
          message: `تمام ${currentList.length} نود ترجیحی پاک شدند`,
          deletedCount: currentList.length
        });
      }
      if (!body?.ip) {
        return jsonResponse({ success: false, message: 'فیلد ip برای حذف الزامی است' }, 400);
      }
      const port = parseInt(body.port || 443, 10) || 443;
      const currentList = parseYxArray(cfg.yx || '');
      const nextList = currentList.filter(x => !(x.ip === body.ip && x.port === port));
      await saveGlobalConfig(env, { yx: serializeYxArray(nextList) });
      return jsonResponse({
        success: true,
        message: 'نود ترجیحی حذف شد',
        deleted: { ip: body.ip, port }
      });
    }

    return jsonResponse({ error: 'Method not allowed' }, 405);
  } catch (err) {
    return jsonResponse({
      success: false,
      error: 'خطا در پردازش درخواست',
      message: err?.message || String(err)
    }, 500);
  }
}

// ۴. وضعیت زنده داشبورد و دیتابیس D1 (/api/stats & /api/d1)
async function handleDashboardStatsApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);

  if (request.method === 'POST' && url.pathname.endsWith('/d1-init')) {
    const res = await ensureD1Schema(env, true);
    const diag = await getStorageDiagnostics(env);
    return jsonResponse({
      success: true,
      message: res.d1Enabled
        ? `جداول دیتابیس D1 (${res.bindingName}) با موفقیت بررسی و آماده شدند.`
        : 'اتصال D1 در تنظیمات Worker/Pages یافت نشد؛ سیستم بدون خطا در حالت حافظه پشتیبان فعال است.',
      d1: res,
      diagnostics: diag
    });
  }

  const globalCfg = await loadGlobalConfig(env);
  const diag = await getStorageDiagnostics(env);
  const users = await listUsers(env);
  const customNodes = parseYxArray(globalCfg.yx || '');
  const totalHealthyIps = customNodes.length + DIRECT_DOMAINS.length + OFFICIAL_DIRECT_IPS.length;

  return jsonResponse({
    success: true,
    brand: BRAND_NAME,
    timestamp: new Date().toISOString(),
    config: sanitizeConfigForClient(globalCfg),
    diagnostics: {
      ...diag,
      healthyCfIps: totalHealthyIps,
      customPreferredCount: customNodes.length,
      builtinDomainCount: DIRECT_DOMAINS.length,
      officialDirectCount: OFFICIAL_DIRECT_IPS.length
    },
    users: users.map(sanitizeUserForClient)
  });
}

// ۵. اطلاعات عمومی وضعیت یک کاربر برای صفحه وضعیت (/api/status/:token)
async function handlePublicUserStatusApi(request, env, token) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const user = await getUserByIdOrToken(env, token);
  if (!user) {
    return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
  }
  const nodes = await generateUserNodesList(user, url.hostname, {
    limit: user.subNodeCount
  });
  return jsonResponse({
    success: true,
    brand: BRAND_NAME,
    user: {
      id: user.id,
      username: user.username,
      uuid: user.uuid,
      subNodeCount: user.subNodeCount,
      enabled: user.enabled,
      status: user.status,
      dataLimitGb: user.dataLimitGb,
      usedBytes: user.usedBytes,
      lifetimeBytes: user.lifetimeBytes,
      requestCount: user.requestCount,
      expireDays: user.expireDays,
      expireAt: user.expireAt,
      startOnFirstUse: user.startOnFirstUse,
      ipLimit: user.ipLimit,
      nodeScope: user.nodeScope,
      preset: user.preset,
      protocols: {
        vless: user.config?.ev === 'yes',
        trojan: user.config?.et === 'yes',
        xhttp: user.config?.ex === 'yes',
        ech: user.config?.ech === 'yes',
        jk: user.config?.jk === 'yes'
      }
    },
    nodeCount: nodes.length,
    nodes
  });
}


// ساخت کوکی نشست واقعی مدیریت (HttpOnly و مشتق‌شده از هش رمز)
function buildSessionCookie(request, token) {
  const isSecure = new URL(request.url).protocol === 'https:';
  return `mili_auth=${encodeURIComponent(token)}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax${isSecure ? '; Secure' : ''}`;
}

function normalizeAdminKey(value) {
  return String(value || '').trim().replace(/^\/+|\/+$/g, '').toLowerCase();
}

function matchesAdminKey(candidate, adminPath, customPath) {
  const key = normalizeAdminKey(candidate);
  if (!key) return false;
  if (key === normalizeAdminKey(adminPath)) return true;
  const custom = normalizeAdminKey(customPath);
  return Boolean(custom) && key === custom;
}

async function resolveRedirectPath(env) {
  const cfg = await loadGlobalConfig(env);
  const adminPath = await getOrCreateAdminPath(env);
  return '/' + (String(cfg.d || '').trim() || adminPath);
}

// ۶. مدیریت احراز هویت و رمز عبور مدیر (/api/admin/...)
async function handleAuthApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const path = url.pathname.replace(/^.*\/api\/admin\/?/, '');

  if (path === 'auth-status' && request.method === 'GET') {
    const initialized = await hasAdminPassword(env);
    return jsonResponse({
      success: true,
      initialized,
      brand: BRAND_NAME
    });
  }

  if (path === 'setup-password' && request.method === 'POST') {
    const initialized = await hasAdminPassword(env);
    if (initialized) {
      return jsonResponse({ success: false, message: 'رمز عبور مدیر قبلاً تنظیم شده است.' }, 400);
    }
    const body = await request.json().catch(() => ({}));
    const pass = String(body.password || '').trim();
    if (!pass || pass.length < 4) {
      return jsonResponse({ success: false, message: 'رمز عبور باید حداقل ۴ کاراکتر باشد.' }, 400);
    }
    await setAdminPassword(env, pass);
    const token = await buildAdminSessionToken(env);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': buildSessionCookie(request, token)
    });
    // شناسه رندوم مدیریت همان لحظه ساخته/برگردانده می‌شود تا کاربر در صفحه اول آن را ببیند
    const adminId = await getOrCreateAdminPath(env);
    return new Response(JSON.stringify({
      success: true,
      message: 'رمز عبور مدیر با موفقیت ذخیره شد.',
      adminId,
      redirect: await resolveRedirectPath(env)
    }), { status: 200, headers });
  }

  if (path === 'login' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const pass = String(body.password || '').trim();
    const ok = await verifyAdminPassword(env, pass);
    if (!ok) {
      return jsonResponse({ success: false, message: 'رمز عبور وارد شده اشتباه است.' }, 401);
    }
    const token = await buildAdminSessionToken(env);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': buildSessionCookie(request, token)
    });
    return new Response(JSON.stringify({
      success: true,
      message: 'ورود با موفقیت انجام شد.',
      redirect: await resolveRedirectPath(env)
    }), { status: 200, headers });
  }

  // بازیابی رمز از طریق UUID/مسیر مدیریت (مالکیت مسیر = احراز هویت)
  if (path === 'reset-password' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const key = String(body.uuid || body.key || body.adminPath || '').trim();
    const newPass = String(body.password || '').trim();
    if (newPass.length < 4) {
      return jsonResponse({ success: false, message: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد.' }, 400);
    }
    const adminPath = await getOrCreateAdminPath(env);
    const cfg = await loadGlobalConfig(env);
    if (!matchesAdminKey(key, adminPath, cfg.d)) {
      return jsonResponse({ success: false, message: 'UUID/مسیر مدیریت نامعتبر است.' }, 403);
    }
    await setAdminPassword(env, newPass);
    const token = await buildAdminSessionToken(env);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': buildSessionCookie(request, token)
    });
    return new Response(JSON.stringify({
      success: true,
      message: 'رمز عبور با موفقیت بازیابی شد.',
      adminId: adminPath,
      redirect: '/' + (String(cfg.d || '').trim() || adminPath)
    }), { status: 200, headers });
  }

  if (path === 'change-password' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const oldPass = String(body.oldPassword || '').trim();
    const newPass = String(body.newPassword || '').trim();
    if (!newPass || newPass.length < 4) {
      return jsonResponse({ success: false, message: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد.' }, 400);
    }
    const ok = await changeAdminPassword(env, oldPass, newPass);
    if (!ok) {
      return jsonResponse({ success: false, message: 'رمز عبور فعلی نامعتبر است.' }, 400);
    }
    // نشست فعلی با هش جدید بازسازی می‌شود تا کاربر بلافاصله بیرون نیفتد
    const token = await buildAdminSessionToken(env);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': buildSessionCookie(request, token)
    });
    return new Response(JSON.stringify({ success: true, message: 'رمز عبور مدیر با موفقیت بروزرسانی شد.' }), { status: 200, headers });
  }

  // چرخش مسیر مدیریت (نیازمند نشست معتبر)
  if (path === 'rotate-path' && request.method === 'POST') {
    const rawCookie = request.headers.get('Cookie') || '';
    const tokenMatch = rawCookie.match(/(?:^|;\s*)mili_auth=([^;]*)/);
    const sessionToken = tokenMatch ? decodeURIComponent(tokenMatch[1]) : '';
    if (!(await verifyAdminSession(env, sessionToken))) {
      return jsonResponse({ success: false, message: 'دسترسی غیرمجاز' }, 403);
    }
    const newPath = await rotateAdminPath(env);
    return jsonResponse({ success: true, message: 'مسیر مدیریت جدید ساخته شد', redirect: '/' + newPath, adminPath: newPath });
  }

  if (path === 'logout' && request.method === 'POST') {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': 'mili_auth=; Path=/; Max-Age=0'
    });
    return new Response(JSON.stringify({ success: true, message: 'با موفقیت خارج شدید.' }), { status: 200, headers });
  }

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}

// ۷. اسکنر زنده پروکسی‌های کشوری و ساخت سابلینک مولتی‌لوکیشن (/api/scanner/...)
async function handleScannerApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const action = url.pathname.replace(/^.*\/api\/scanner\/?/, '');

  // تست اتصال TCP به نودها از سمت ورکر (بررسی دسترس‌پذیری آدرس/پورت نود)
  if (action === 'test-nodes' && request.method === 'POST') {
    try {
      const body = await request.json().catch(() => ({}));
      const nodes = Array.isArray(body.nodes) ? body.nodes.slice(0, 12) : [];
      const results = await Promise.all(nodes.map(async node => {
        const host = normalizeNodeHost(node && (node.host || node.ip));
        const port = parseInt(node && node.port, 10) || 443;
        if (!host || (!isValidIpAddress(host) && !isValidDomain(host))) {
          return { host, port, ok: false, latencyMs: 0, error: 'invalid-host' };
        }
        const probe = await probeTcp(host, port, 2500);
        return { host, port, ok: probe.ok, latencyMs: probe.latencyMs, error: probe.error || '' };
      }));
      const online = results.filter(item => item.ok).length;
      return jsonResponse({
        success: online > 0,
        tested: results.length,
        online,
        results,
        message: `${online} از ${results.length} نود از سمت ورکر پاسخ داد`
      });
    } catch (_e) {
      return jsonResponse({ success: false, message: 'تست نود ناموفق بود' }, 400);
    }
  }

  if (action === 'countries' && request.method === 'GET') {
    const countries = Object.keys(COUNTRY_PROXY_SOURCES).map(code => ({
      code,
      name: COUNTRY_PROXY_SOURCES[code].name,
      sourceCount: COUNTRY_PROXY_SOURCES[code].urls.length
    }));
    return jsonResponse({
      success: true,
      countries,
      globalSources: {
        socks5: GLOBAL_PROXY_SOURCES.socks5.length,
        http: GLOBAL_PROXY_SOURCES.http.length,
        ipv4: IP_RANGE_SOURCES.ipv4.length,
        ipv6: IP_RANGE_SOURCES.ipv6.length
      },
      // آی‌پی‌ها و دامنه‌های پیش‌فرض CFnew برای افزودن مستقیم به yx از داخل اسکنر
      officialIps: OFFICIAL_DIRECT_IPS,
      officialIpv6: OFFICIAL_DIRECT_IPV6,
      directDomains: DIRECT_DOMAINS.map(item => item.domain)
    });
  }

  // اسکن زنده: هر بار لیست‌ها از منابع خوانده می‌شوند (بدون کش) و فقط یک برش چرخشی تست می‌شود
  if (action === 'fetch-and-test' && request.method === 'POST') {
    try {
      const body = await request.json().catch(() => ({}));
      const kind = body.kind === 'ip' ? 'ip' : 'proxy';
      const family = body.family === 'ipv4' || body.family === 'ipv6' ? body.family : 'any';
      const limit = Math.min(Math.max(parseInt(body.limit || '10', 10), 1), 25);
      const requested = String(body.country || 'DE').toUpperCase();
      const multi = requested === 'MULTI' || requested === 'ALL';
      const code = multi ? 'MULTI' : (COUNTRY_PROXY_SOURCES[requested] ? requested : 'DE');
      const countryLabel = multi ? 'چند کشور' : COUNTRY_PROXY_SOURCES[code].name;

      // ---- اسکن آی‌پی ثابت (IPv4 / IPv6) از رنج‌های کلادفلر ----
      if (kind === 'ip') {
        const curatedV4 = OFFICIAL_DIRECT_IPS.map(ip => ({ host: ip, port: 443, family: 'ipv4', kind: 'ip' }));
        const curatedV6 = OFFICIAL_DIRECT_IPV6.map(ip => ({ host: ip, port: 443, family: 'ipv6', kind: 'ip' }));

        // ورکرهای کلادفلر خروجی IPv6 ندارند، بنابراین تست TCP روی IPv6 از این محیط ممکن نیست.
        // در این حالت آدرس‌های Anycast معتبر از رنج‌های زنده کلادفلر نمونه‌گیری می‌شوند و
        // به‌عنوان پیشنهاد (verified:false) برگردانده می‌شوند تا در yx قابل استفاده باشند.
        const ipv6Control = family === 'ipv4' ? null : await probeTcp(OFFICIAL_DIRECT_IPV6[0], 443, 2200);
        if (family === 'ipv6' && ipv6Control && !ipv6Control.ok) {
          const rangeTexts = await Promise.all(
            pickRotating(IP_RANGE_SOURCES.ipv6, 2).map(src => fetchSourceText(src, 4000))
          );
          const ranges = rangeTexts.flatMap(text => parseRangeLines(text)).filter(r => r && r.family === 'ipv6');
          const seenV6 = new Set();
          const picked = [];
          for (const item of shuffleList(curatedV6)) {
            if (picked.length >= limit) break;
            if (seenV6.has(item.host)) continue;
            seenV6.add(item.host);
            picked.push(item.host);
          }
          let guard = 0;
          while (picked.length < limit && ranges.length && guard < 120) {
            guard++;
            const range = ranges[Math.floor(Math.random() * ranges.length)];
            const ip = randomIpv6FromRange(range.base, range.bits);
            if (!ip || seenV6.has(ip) || !isValidIpAddress(ip)) continue;
            seenV6.add(ip);
            picked.push(ip);
          }
          const proxies = picked.slice(0, limit).map(ip => ({
            kind: 'ip',
            ip,
            port: 443,
            name: ip,
            country: countryLabel,
            code,
            family: 'ipv6',
            protocol: 'IPv6',
            latencyMs: 0,
            status: 'unverified',
            verified: false
          }));
          return jsonResponse({
            success: proxies.length > 0, kind, family: 'ipv6', country: countryLabel, code,
            count: proxies.length, sourceCount: ranges.length + curatedV6.length, testedCount: 0,
            verified: false, proxies,
            attempts: [{ ip: OFFICIAL_DIRECT_IPV6[0], control: 'ipv6', ok: false, latencyMs: ipv6Control.latencyMs, error: ipv6Control.error || '' }],
            message: proxies.length
              ? `${proxies.length} آدرس IPv6 کلادفلر از رنج‌های زنده انتخاب شد؛ ورکر خروجی IPv6 ندارد، پس تست TCP ممکن نیست — با کلاینت خودتان امتحان کنید.`
              : 'منبع رنج IPv6 در دسترس نبود؛ دوباره تلاش کنید.'
          });
        }

        const curatedPool = [
          ...(family === 'ipv6' ? [] : curatedV4),
          ...(family === 'ipv4' ? [] : curatedV6)
        ];

        // لیست زنده آی‌پی‌های فرانت‌شده کلادفلر (Z-E-U-S)؛ آدرس‌های تصادفی داخل رنج‌ها
        // از داخل ورکر کلادفلر قابل اتصال نیستند، بنابراین از خود لیست نمونه می‌گیریم.
        const listSource = pickRotating(IP_CANDIDATE_SOURCES, 1)[0];
        const listText = listSource && family !== 'ipv6' ? await fetchSourceText(listSource, 5000) : '';
        const listed = listText ? parseIpCandidateLines(listText, family) : [];

        const wanted = Math.min(limit * 3, 30);
        const curatedPick = shuffleList(curatedPool).slice(0, Math.max(3, Math.ceil(wanted / 2)));
        const seenHosts = new Set(curatedPick.map(p => p.host));
        const listedPick = [];
        for (const item of shuffleList(listed)) {
          if (listedPick.length >= wanted - curatedPick.length) break;
          if (seenHosts.has(item.host)) continue;
          seenHosts.add(item.host);
          listedPick.push(item);
        }
        const candidates = [...curatedPick, ...listedPick];

        if (!candidates.length) {
          return jsonResponse({
            success: false, kind, family, country: countryLabel, code,
            count: 0, sourceCount: 0, testedCount: 0, proxies: [],
            message: 'منبع آی‌پی در دسترس نبود؛ دوباره تلاش کنید.'
          });
        }

        const controlV4 = await probeTcp('172.71.218.190', 443, 2500);
        const controlV6 = ipv6Control;
        const probed = await Promise.all(candidates.map(async p => ({ ...p, ...(await probeTcp(p.host, 443, 2500)) })));
        const online = probed.filter(p => p.ok).sort((a, b) => a.latencyMs - b.latencyMs).slice(0, limit);
        const attempts = [
          { ip: '172.71.218.190', control: 'ipv4', ok: controlV4.ok, latencyMs: controlV4.latencyMs, error: controlV4.error || '' },
          ...(controlV6 ? [{ ip: OFFICIAL_DIRECT_IPV6[0], control: 'ipv6', ok: controlV6.ok, latencyMs: controlV6.latencyMs, error: controlV6.error || '' }] : []),
          ...probed.slice(0, 8).map(p => ({ ip: p.host, ok: p.ok, latencyMs: p.latencyMs, error: p.error || '' }))
        ];
        const proxies = online.map(p => ({
          kind: 'ip',
          ip: p.host,
          port: 443,
          name: p.host,
          country: countryLabel,
          code,
          family: p.family,
          protocol: p.family === 'ipv6' ? 'IPv6' : (p.family === 'domain' ? 'Domain' : 'IPv4'),
          latencyMs: p.latencyMs,
          status: 'online'
        }));
        const noV6Egress = family !== 'ipv4' && controlV6 && !controlV6.ok;

        return jsonResponse({
          success: proxies.length > 0, kind, family, country: countryLabel, code,
          count: proxies.length, sourceCount: candidates.length, testedCount: probed.length, proxies, attempts,
          message: proxies.length
            ? `${proxies.length} آی‌پی سالم از ${probed.length} آدرس تست‌شده (${family === 'any' ? 'IPv4 + IPv6' : family.toUpperCase()})`
            : (noV6Egress
              ? 'این محیط خروجی IPv6 ندارد؛ IPv6 فقط به‌عنوان نود ثابت در ساب‌لینک استفاده می‌شود.'
              : `از ${probed.length} آی‌پی هیچ‌کدام پاسخ نداد؛ دوباره تلاش کنید.`)
        });
      }

      // ---- اسکن پروکسی (SOCKS5/HTTP) با منابع کشوری + لیست‌های عمومی ----
      // برای کشور مشخص فقط منابع همان کشور خوانده می‌شود تا نتیجه واقعاً به آن کشور تعلق داشته باشد؛
      // لیست‌های عمومی فقط در حالت «چند کشور» استفاده می‌شوند.
      const countrySources = multi
        ? pickRotating(Object.keys(COUNTRY_PROXY_SOURCES), 3).flatMap(c => pickRotating(COUNTRY_PROXY_SOURCES[c].urls || [], 1))
        : pickRotating(COUNTRY_PROXY_SOURCES[code].urls || [], 4);
      const globalSources = multi
        ? pickRotating([...GLOBAL_PROXY_SOURCES.socks5, ...GLOBAL_PROXY_SOURCES.http], 3)
        : [];
      const sources = [...new Set([...countrySources, ...globalSources])].slice(0, 12);

      const lists = await Promise.all(sources.map(src => fetchProxySource(src, 3500)));
      const seen = new Set();
      const candidates = [];
      for (const list of lists) {
        for (const p of list) {
          if (family !== 'any' && p.family && p.family !== family && p.family !== 'domain') continue;
          const key = p.host + ':' + p.port;
          if (seen.has(key)) continue;
          seen.add(key);
          candidates.push(p);
        }
      }

      if (!candidates.length) {
        return jsonResponse({
          success: false, kind, family, country: countryLabel, code,
          count: 0, sourceCount: sources.length, testedCount: 0, proxies: [],
          message: 'منبع لیست پروکسی در دسترس نبود یا خالی بود. چند لحظه بعد دوباره تلاش کنید.'
        });
      }

      const pool = candidates
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(candidates.length, limit * 3));

      const probed = await Promise.all(pool.map(async p => {
        const result = await probeTcp(p.host, p.port, 1800);
        return { ...p, ...result };
      }));

      const online = probed
        .filter(p => p.ok)
        .sort((a, b) => a.latencyMs - b.latencyMs)
        .slice(0, limit);

      const proxies = online.map(p => {
        const isHttp = p.protocol === 'HTTP' || p.protocol === 'HTTPS';
        const proxyUrl = p.proxy || `${isHttp ? 'http' : 'socks5'}://${p.host}:${p.port}`;
        return {
          kind: 'proxy',
          ip: p.host,
          port: p.port,
          name: `${p.host}:${p.port}`,
          proxy: proxyUrl,
          country: countryLabel,
          code,
          family: p.family || '',
          protocol: p.protocol,
          latencyMs: p.latencyMs,
          status: 'online'
        };
      });

      return jsonResponse({
        success: proxies.length > 0, kind, family, country: countryLabel, code,
        count: proxies.length, sourceCount: candidates.length, testedCount: probed.length, proxies,
        message: proxies.length
          ? `${proxies.length} پروکسی آنلاین از ${probed.length} اتصال تست‌شده`
          : `هیچ‌کدام از ${probed.length} پروکسی پاسخ ندادند؛ دوباره تلاش کنید.`
      });
    } catch (err) {
      return jsonResponse({ success: false, message: 'خطا در اسکنر: ' + (err?.message || err) }, 500);
    }
  }

  // اتصال نتیجه اسکن: آی‌پی‌ها به yx و پروکسی‌ها به s
  if (action === 'apply' && request.method === 'POST') {
    if (request.headers.get('X-Mili-Admin') !== '1') {
      return jsonResponse({ success: false, message: 'دسترسی غیرمجاز' }, 403);
    }
    try {
      const body = await request.json().catch(() => ({}));
      const target = body.target === 's' ? 's' : body.target === 'yx' ? 'yx' : '';
      const items = Array.isArray(body.items) ? body.items : [body];
      const cfg = await loadGlobalConfig(env);

      if (target === 's') {
        const item = items[0] || {};
        const proxyUrl = String(item.proxy || '').trim();
        if (!proxyUrl) return jsonResponse({ success: false, message: 'پروکسی معتبری ارسال نشد' }, 400);
        await saveGlobalConfig(env, { s: proxyUrl });
        return jsonResponse({ success: true, s: proxyUrl, message: 'پروکسی خروجی (s) تنظیم شد' });
      }

      if (target === 'yx') {
        const list = parseYxArray(cfg.yx || '');
        let added = 0;
        for (const item of items) {
          const ip = String(item?.ip || '').trim();
          const port = parseInt(item?.port || 443, 10) || 443;
          if (!ip || (!isValidIpAddress(ip) && !isValidDomain(ip))) continue;
          if (list.some(x => x.ip === ip && x.port === port)) continue;
          list.push({ ip, port, name: String(item?.name || ip) });
          added++;
        }
        if (added > 0) await saveGlobalConfig(env, { yx: serializeYxArray(list) });
        return jsonResponse({
          success: added > 0,
          added,
          total: list.length,
          message: added > 0 ? `${added} آی‌پی به نودهای ترجیحی (yx) اضافه شد` : 'آی‌پی جدیدی برای افزودن نبود'
        });
      }

      return jsonResponse({ success: false, message: 'مقصد نامعتبر است (yx یا s)' }, 400);
    } catch (err) {
      return jsonResponse({ success: false, message: 'خطا در اعمال نتیجه اسکن: ' + (err?.message || err) }, 500);
    }
  }

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}


// --- MODULE: src/ui/loginHtml.js ---
// ============================================================================
// miliconfig v3.1 - درگاه ورود با استتار nginx (الهام از edgetunnel)
// صفحه اول دقیقاً «Welcome to nginx!» است؛ پس از ۳ ثانیه صفحه تار می‌شود و
// پنجره ورود آرام روی آن ظاهر می‌شود. حالت روز/شب و زبان فارسی/انگلیسی هم دارد.
// ============================================================================


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

function renderLoginGatewayHtml(options = {}) {
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


// --- MODULE: src/ui/statusHtml.js ---
// ============================================================================
// miliconfig v3.1 - صفحه وضعیت و اشتراک اختصاصی کاربر (ارسالی به کاربر)
// طراحی ۱۰۰٪ مطابق تصاویر 1000050224.jpg و 1000050225.jpg با برند miliconfig
// ============================================================================


function renderUserStatusPageHtml(user, nodes = [], originUrl = '') {
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
  const lifetimeBytes = Number(user.lifetimeBytes || 0);
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


  const protoCombos = [
    { title: 'اتصال هوشمند (همه نودها × همه پروتکل‌ها)', badge: 'Base64', url: baseSubUrl },
    { title: 'فقط پروتکل VLESS (WebSocket + TLS)', badge: 'VLESS', url: `${baseSubUrl}?proto=vless` },
    { title: 'فقط پروتکل Trojan (WebSocket + TLS)', badge: 'Trojan', url: `${baseSubUrl}?proto=trojan` },
    { title: 'فقط پروتکل Shadowsocks (بدون فرگمنت)', badge: 'SS', url: `${baseSubUrl}?proto=ss` },
    { title: 'فقط پروتکل xhttp (ضد فیلتر پیشرفته)', badge: 'xhttp', url: `${baseSubUrl}?proto=xhttp` },
    { title: 'فقط نودهای لبه CDN (Multi-Location)', badge: 'Edge', url: `${baseSubUrl}?scope=edge` },
    { title: 'فقط سرور اصلی (بدون CDN)', badge: 'Origin', url: `${baseSubUrl}?scope=origin` },
    { title: 'کانفیگ اختصاصی Clash Meta / Mihomo', badge: 'YAML', url: `${baseSubUrl}?target=clash` },
    { title: 'کانفیگ اختصاصی Sing-box / Hiddify', badge: 'JSON', url: `${baseSubUrl}?target=singbox` },
    { title: 'کانفیگ اختصاصی Surge', badge: 'INI', url: `${baseSubUrl}?target=surge` },
    { title: 'کانفیگ اختصاصی Quantumult X', badge: 'QuanX', url: `${baseSubUrl}?target=quanx` },
    { title: 'کانفیگ اختصاصی Loon', badge: 'Loon', url: `${baseSubUrl}?target=loon` },
    { title: 'متن خام لینک‌ها (Raw Plaintext)', badge: 'RAW', url: `${baseSubUrl}?target=raw` }
  ];

  const safeNodesJson = JSON.stringify(nodes).replace(/</g, '\\u003c');

  return stripEmoji(`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>وضعیت اشتراک ${user.username} — ${BRAND_UPPER}</title>
  <link rel="icon" href="${FAVICON_DATA_URI}">
  <style>
    .mi { width: 16px; height: 16px; display: inline-block; vertical-align: -3px; }
    :root {
      --bg-0: #070d07;
      --bg-1: #0c160c;
      --card: rgba(15, 26, 15, 0.90);
      --card-inner: rgba(9, 16, 9, 0.92);
      --border: rgba(163, 230, 53, 0.18);
      --border-hi: rgba(181, 255, 77, 0.48);
      --neon: #b5ff4d;
      --neon-dim: rgba(181, 255, 77, 0.14);
      --text: #f3f8f1;
      --muted: #93a88a;
      --danger: #f87171;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Vazirmatn", Tahoma, sans-serif;
      background:
        radial-gradient(circle at 20% 0%, rgba(132, 204, 22, 0.18) 0%, transparent 48%),
        radial-gradient(circle at 85% 90%, rgba(101, 163, 13, 0.14) 0%, transparent 45%),
        var(--bg-0);
      color: var(--text);
      padding: 18px 14px 90px;
      line-height: 1.6;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(163, 230, 53, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(163, 230, 53, 0.04) 1px, transparent 1px);
      background-size: 36px 36px;
      pointer-events: none;
      z-index: 0;
    }
    .container {
      position: relative;
      z-index: 1;
      max-width: 680px;
      margin: 0 auto;
    }
    .status-hero {
      background: var(--card);
      border: 1px solid var(--border-hi);
      border-radius: 22px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 16px 44px rgba(0, 0, 0, 0.6);
    }
    .hero-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .hero-user {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .hero-logo {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }
    .hero-logo svg { width: 100%; height: 100%; }
    .hero-name {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text);
    }
    .hero-brand {
      font-size: 0.76rem;
      color: var(--neon);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      background: var(--neon-dim);
      border: 1px solid var(--border-hi);
      color: var(--neon);
    }
    .pill-off {
      background: rgba(248, 113, 113, 0.14);
      border-color: rgba(248, 113, 113, 0.4);
      color: var(--danger);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    @media (min-width: 520px) {
      .stats-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .stat-box {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 11px 12px;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .stat-val {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--text);
    }
    .usage-track {
      height: 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border);
      overflow: hidden;
      margin: 2px 0 8px;
    }
    .usage-track i {
      display: block;
      height: 100%;
      min-width: 2px;
      background: linear-gradient(90deg, #a3e635, #b5ff4d);
      transition: width 0.5s ease;
    }
    .usage-meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.76rem;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .url-copy-box {
      background: #060b06;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 10px;
    }
    .url-text {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.8rem;
      color: #d7e8cf;
      direction: ltr;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 12px;
      padding: 9px 16px;
      cursor: pointer;
      font-size: 0.84rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.18s;
      flex-shrink: 0;
    }
    .copy-btn:hover {
      border-color: var(--neon);
      color: var(--neon);
      background: var(--neon-dim);
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 22px 4px 10px;
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text);
    }
    .section-head .sub-meta {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--muted);
    }
    .acc-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      margin-bottom: 12px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    .acc-card.open {
      border-color: var(--border-hi);
    }
    .acc-header {
      width: 100%;
      background: transparent;
      border: none;
      color: var(--text);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      font-family: inherit;
      text-align: right;
    }
    .acc-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .acc-title {
      font-size: 0.96rem;
      font-weight: 800;
    }
    .acc-count {
      font-size: 0.78rem;
      color: var(--muted);
    }
    .acc-arrow {
      font-size: 0.9rem;
      color: var(--muted);
      transition: transform 0.22s;
    }
    .acc-card.open .acc-arrow {
      transform: rotate(180deg);
      color: var(--neon);
    }
    .acc-body {
      display: none;
      padding: 0 18px 18px;
      border-top: 1px solid rgba(163, 230, 53, 0.1);
    }
    .acc-card.open .acc-body {
      display: block;
    }
    .client-desc {
      font-size: 0.82rem;
      color: var(--muted);
      margin: 12px 0 14px;
      line-height: 1.65;
    }
    .client-item {
      padding: 14px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .client-item:first-of-type { border-top: none; }
    .client-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .client-name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .client-name {
      font-size: 0.98rem;
      font-weight: 800;
      color: #fff;
    }
    .client-os {
      font-size: 0.76rem;
      color: var(--muted);
    }
    .tag-green {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--neon);
      background: rgba(163, 230, 53, 0.12);
      border: 1px solid rgba(163, 230, 53, 0.35);
    }
    .dl-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .dl-btn:hover {
      border-color: var(--neon);
      color: var(--neon);
    }
    .node-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--card-inner);
      border: 1px solid var(--border);
      margin-top: 8px;
    }
    .node-tag {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--neon);
      direction: ltr;
    }
    .node-proto {
      font-size: 0.74rem;
      color: var(--muted);
    }
    .fab-refresh {
      position: fixed;
      bottom: 22px;
      left: 22px;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #060a06;
      border: 1px solid var(--border-hi);
      color: var(--text);
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      transition: all 0.2s;
    }
    .fab-refresh:hover {
      color: var(--neon);
      transform: rotate(90deg);
    }
    .toast {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: #112211;
      border: 1px solid var(--neon);
      color: var(--neon);
      padding: 10px 20px;
      border-radius: 999px;
      font-size: 0.86rem;
      font-weight: 700;
      z-index: 100;
      display: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    }
  </style>
</head>
<body>
  <div id="toast" class="toast"></div>

  <div class="container">
    <!-- کارت اصلی وضعیت کاربر -->
    <div class="status-hero">
      <div class="hero-top">
        <div class="hero-user">
          <div class="hero-logo">${SHIELD_LOGO_SVG}</div>
          <div>
            <div class="hero-name">${user.username}</div>
            <div class="hero-brand">${BRAND_UPPER} SUBSCRIPTION PORTAL</div>
          </div>
        </div>
        <span class="pill ${user.enabled ? '' : 'pill-off'}" id="statusPill">
          ● ${user.enabled ? (user.startOnFirstUse && !user.firstConnectedAt ? 'شروع با اولین اتصال' : 'فعال و آنلاین') : 'غیرفعال'}
        </span>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">مصرف فعلی</div>
          <div class="stat-val" id="statUsed">${formatBytes(usedBytes)}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">سهمیه حجم</div>
          <div class="stat-val" id="statLimit">${limitGb > 0 ? `${limitGb} GB (${usagePercent}%)` : '∞ نامحدود'}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">تعداد نود در ساب</div>
          <div class="stat-val" id="statNodes">${totalNodes} نود (${BRAND_NAME})</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">وضعیت انقضا</div>
          <div class="stat-val" id="statExpire">${expireLabel}</div>
        </div>
      </div>
      <div class="usage-track" title="مصرف واقعی ثبت‌شده در پنل">
        <i id="usageBar" style="width:${usagePercent}%"></i>
      </div>
      <div class="usage-meta">
        <span id="usageMeta">${limitGb > 0 ? `${formatBytes(usedBytes)} از ${limitGb} GB` : formatBytes(usedBytes) + ' مصرف‌شده'}</span>
        <span id="usageUpdated"></span>
      </div>

      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:4px;">لینک مستقیم صفحه وضعیت و اشتراک شما:</div>
      <div class="url-copy-box">
        <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک اشتراک هوشمند کپی شد')">${icon('copy')} کپی ساب‌لینک</button>
        <div class="url-text">${baseSubUrl}</div>
      </div>
    </div>

    <!-- محدوده نودها -->
    <div class="section-head">
      <span>${icon('globe')} محدودهٔ نودها</span>
      <span class="sub-meta">همه نودها (${totalNodes} نود با فرمت number+${BRAND_NAME})</span>
    </div>
    <div class="acc-card" id="accScope">
      <button type="button" class="acc-header" onclick="toggleAcc('accScope')">
        <div class="acc-title-wrap">
          <span class="acc-title">فقط بخشی از نودها را می‌خواهید؟</span>
          <span class="acc-count">4 گزینه · ${totalNodes} نود در کل</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">می‌توانید تعداد نودهای خروجی یا محدوده نودها را در لینک اشتراک خود فیلتر کنید:</p>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">همه نودهای کاربر (${totalNodes} نود)</span>
            <span class="tag-green">پیش‌فرض کاربر</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">۱۰ نود اول (1+${BRAND_NAME} تا 10+${BRAND_NAME})</span>
            <span class="tag-green">سبک و سریع</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?limit=10', 'کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?limit=10</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">فقط نودهای لبه CDN</span>
            <span class="tag-green">Multi-Location</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?scope=edge', 'کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?scope=edge</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">فقط سرور اصلی (بدون CDN)</span>
            <span class="tag-green">Direct Origin</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?scope=origin', 'کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?scope=origin</div>
          </div>
        </div>
      </div>
    </div>

    <!-- لوکیشن‌ها -->
    <div class="section-head">
      <span>${icon('globe')} لوکیشن‌ها</span>
      <span class="sub-meta">هر کشور یک سابلینک جدا</span>
    </div>
    <div class="acc-card" id="accLocations">
      <button type="button" class="acc-header" onclick="toggleAcc('accLocations')">
        <div class="acc-title-wrap">
          <span class="acc-title">سابلینک لوکیشن‌محور</span>
          <span class="acc-count">${locationsList.length} لوکیشن</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">با استفاده از هر لینک، مسیر خروجی روی همان منطقه تنظیم می‌شود:</p>
        ${locationsList
          .map(
            loc => `
          <div class="client-item">
            <div class="client-top">
              <span class="client-name">${loc.title}</span>
              <span class="tag-green">${loc.code}</span>
            </div>
            <div class="url-copy-box">
              <button type="button" class="copy-btn" onclick="copyText('${loc.url}', 'لینک لوکیشن ${loc.code} کپی شد')">${icon('copy')}</button>
              <div class="url-text">${loc.url}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>

    <!-- سابلینک اختصاصی هر کلاینت -->
    <div class="section-head">
      <span>${icon('shield')} سابلینک اختصاصی هر کلاینت</span>
      <span class="sub-meta">16 کلاینت در 5 خانواده</span>
    </div>

    <!-- شروع سریع -->
    <div class="acc-card open" id="accQuickStart">
      <button type="button" class="acc-header" onclick="toggleAcc('accQuickStart')">
        <div class="acc-title-wrap">
          <span class="acc-title">شروع سریع</span>
          <span class="acc-count">1 کلاینت</span>
          <span class="tag-green">پیشنهادی</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">یک لینک برای همه‌چیز؛ سریع‌ترین نود بر اساس پینگ، مناسب هر کلاینتی.</p>
        <div class="client-top">
          <div class="client-name-row">
            <span class="client-name">اتصال هوشمند</span>
            <span class="client-os">همه پلتفرم‌ها</span>
          </div>
          <span class="tag-green">اتصال هوشمند (همه نودها × همه پروتکل‌ها)</span>
        </div>
        <div class="url-copy-box">
          <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'سابلینک هوشمند کپی شد')">${icon('copy')}</button>
          <div class="url-text">${baseSubUrl}</div>
        </div>
        <div style="font-size:0.78rem;color:var(--muted);margin-top:8px;">سریع‌ترین نود بر اساس پینگ واقعی؛ مناسب شروع سریع.</div>
      </div>
    </div>

    <!-- خانواده 1: Xray / Base64 -->
    <div class="acc-card open" id="accXray">
      <button type="button" class="acc-header" onclick="toggleAcc('accXray')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده Xray / متن ساده — Base64</span>
          <span class="acc-count">7 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">v2rayNG، Exclusive، Amnezia، Streisand، Shadowrocket، V2Box و FoXray سابلینک Base64 (یا متن ساده) می‌خوانند.</p>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">v2rayNG</span>
              <span class="client-os">Android</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/2dust/v2rayNG/releases" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک v2rayNG کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
          <div style="font-size:0.78rem;color:var(--muted);margin-top:6px;">پرکاربردترین کلاینت اندروید؛ فرگمنت، sni و vless را کامل پشتیبانی می‌کند.</div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Exclusive</span>
              <span class="client-os">Android</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/GFW-knocker/MahsaNG/releases" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Exclusive کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
          <div style="font-size:0.78rem;color:var(--muted);margin-top:6px;">کلاینت اندروید؛ از سابلینک استاندارد Base64 استفاده می‌کند.</div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Amnezia VPN</span>
              <span class="client-os">Android · iOS · دسکتاپ</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://amnezia.org/en/downloads" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Amnezia کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Streisand</span>
              <span class="client-os">iOS · macOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/streisand/id6450534064" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Streisand کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Shadowrocket</span>
              <span class="client-os">iOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/shadowrocket/id932747118" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Shadowrocket کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">V2Box</span>
              <span class="client-os">Android · iOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/v2box-v2ray-client/id6446814690" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک V2Box کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">v2rayN / Nekoray</span>
              <span class="client-os">Windows · Linux · macOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/2dust/v2rayN/releases" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک v2rayN کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- خانواده 2: sing-box — JSON -->
    <div class="acc-card" id="accSingbox">
      <button type="button" class="acc-header" onclick="toggleAcc('accSingbox')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده sing-box — JSON</span>
          <span class="acc-count">5 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">مناسب Hiddify، Sing-box (نسخه 1.12 به بالا)، Karing، NekoBox و Exclave:</p>
        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Hiddify / Sing-box</span>
              <span class="client-os">همه پلتفرم‌ها</span>
              <span class="tag-green">JSON (Sing-box)</span>
            </div>
            <a class="dl-btn" href="https://github.com/hiddify/hiddify-app/releases" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=singbox', 'لینک Sing-box کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=singbox</div>
          </div>
        </div>
      </div>
    </div>

    <!-- خانواده 3: Clash / Mihomo — فقط YAML -->
    <div class="acc-card" id="accClash">
      <button type="button" class="acc-header" onclick="toggleAcc('accClash')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده Clash / Mihomo — فقط YAML</span>
          <span class="acc-count">2 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">مناسب Clash Meta for Android (CMFA)، Clash Verge Rev، FlClash و Stash:</p>
        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Clash Meta / Verge / FlClash</span>
              <span class="client-os">Android · Windows · macOS</span>
              <span class="tag-green">YAML (Mihomo)</span>
            </div>
            <a class="dl-btn" href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases" target="_blank" rel="noopener">${icon('download')} دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=clash', 'لینک Clash کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=clash</div>
          </div>
        </div>
        ${
          user.config?.jk === 'yes'
            ? `<div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">CLASH زنجیره اینترنت خانگی</span>
              <span class="client-os">Mihomo 1.19.25+</span>
              <span class="tag-green">Residential IP</span>
            </div>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=vg', 'لینک CLASH خانگی کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=vg</div>
          </div>
        </div>`
            : ''
        }
      </div>
    </div>

    <!-- خانواده 4: هسته‌ها و ابزارها -->
    <div class="acc-card" id="accTools">
      <button type="button" class="acc-header" onclick="toggleAcc('accTools')">
        <div class="acc-title-wrap">
          <span class="acc-title">هسته‌ها و ابزارها (Surge / QuanX / Loon)</span>
          <span class="acc-count">3 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <div class="client-item">
          <div class="client-top"><span class="client-name">Surge</span><span class="tag-green">INI</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=surge', 'لینک Surge کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=surge</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top"><span class="client-name">Quantumult X</span><span class="tag-green">QuanX</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=quanx', 'لینک Quantumult X کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=quanx</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top"><span class="client-name">Loon</span><span class="tag-green">Loon</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=loon', 'لینک Loon کپی شد')">${icon('copy')}</button>
            <div class="url-text">${baseSubUrl}?target=loon</div>
          </div>
        </div>
      </div>
    </div>

    <!-- سابلینک به تفکیک پروتکل و ترنسپورت -->
    <div class="section-head">
      <span>${icon('link')} سابلینک به تفکیک پروتکل و ترنسپورت</span>
      <span class="sub-meta">${protoCombos.length} ترکیب</span>
    </div>
    <div class="acc-card" id="accCombos">
      <button type="button" class="acc-header" onclick="toggleAcc('accCombos')">
        <div class="acc-title-wrap">
          <span class="acc-title">لیست ترکیب‌های نود × پروتکل</span>
          <span class="acc-count">${protoCombos.length} لینک</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        ${protoCombos
          .map(
            c => `
          <div class="client-item">
            <div class="client-top">
              <span class="client-name">${c.title}</span>
              <span class="tag-green">${c.badge}</span>
            </div>
            <div class="url-copy-box">
              <button type="button" class="copy-btn" onclick="copyText('${c.url}', 'کپی شد')">${icon('copy')}</button>
              <div class="url-text">${c.url}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>

    <!-- لیست تکی نودهای خروجی با فرمت number+miliconfig -->
    <div class="section-head">
      <span>${icon('bolt')} نودها</span>
      <span class="sub-meta">${totalNodes} از ${totalNodes} آنلاین · نام‌گذاری number+${BRAND_NAME}</span>
    </div>
    <div class="acc-card open" id="accNodes">
      <button type="button" class="acc-header" onclick="toggleAcc('accNodes')">
        <div class="acc-title-wrap">
          <span class="acc-title">لیست کانفیگ‌های خروجی (1+${BRAND_NAME} تا ${totalNodes}+${BRAND_NAME})</span>
          <span class="acc-count">${totalNodes} کانفیگ</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <div style="margin:12px 0;">
          <button type="button" class="copy-btn" style="width:100%;justify-content:center;" onclick="copyAllNodes()">
            ${icon('copy')} کپی یکجای همه ${totalNodes} کانفیگ (1+${BRAND_NAME} تا ${totalNodes}+${BRAND_NAME})
          </button>
        </div>
        <div id="nodesContainer"></div>
      </div>
    </div>
  </div>

  <button type="button" class="fab-refresh" onclick="window.location.reload()" title="بروزرسانی وضعیت">${icon('refresh')}</button>

  <script>
    var ALL_NODES = ${safeNodesJson};

    function showToast(msg) {
      var t = document.getElementById('toast');
      if (!t) return;
      t.textContent = msg;
      t.style.display = 'block';
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(function() {
        t.style.display = 'none';
      }, 2500);
    }

    function copyText(text, msg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast(msg || 'کپی شد');
        });
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
      copyText(ALL_NODES.join('\\n'), 'همه کانفیگ‌ها کپی شدند');
    }

    function toggleAcc(id) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle('open');
    }

    function renderNodes() {
      var container = document.getElementById('nodesContainer');
      if (!container) return;
      var html = '';
      for (var i = 0; i < ALL_NODES.length; i++) {
        var link = ALL_NODES[i];
        var hashIdx = link.indexOf('#');
        var name = hashIdx > -1 ? decodeURIComponent(link.substring(hashIdx + 1)) : ((i + 1) + '+${BRAND_NAME}');
        var proto = link.split('://')[0].toUpperCase();
        html += '<div class="node-row">' +
          '<div><div class="node-tag">' + name + '</div><div class="node-proto">' + proto + ' · Cloudflare Edge</div></div>' +
          '<button type="button" class="copy-btn" onclick="copyNodeByIndex(' + i + ')">${icon('copy')} کپی کانفیگ</button>' +
          '</div>';
      }
      container.innerHTML = html;
    }

    function copyNodeByIndex(idx) {
      var link = ALL_NODES[idx];
      if (!link) return;
      copyText(link, 'کانفیگ ' + (idx + 1) + '+${BRAND_NAME} کپی شد');
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
          var pillar = document.getElementById('statusPill');
          if (pillar) {
            pillar.textContent = u.enabled ? '● فعال و آنلاین' : '● غیرفعال';
            pillar.className = 'pill' + (u.enabled ? '' : ' pill-off');
          }
          var upd = document.getElementById('usageUpdated');
          if (upd) upd.textContent = 'آخرین بروزرسانی: ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        })
        .catch(function() {});
    }

    renderNodes();
    refreshUsage();
    setInterval(refreshUsage, 30000);
  </script>
</body>
</html>`);
}


// --- MODULE: src/ui/adminHtml.js ---
// ============================================================================
// miliconfig v3.1 - مرکز کنترل سیستم‌عامل مدیریت (تم Z-E-U-S)
// بدون ایموجی - تمام آیکون‌ها SVG اختصاصی - دکمه‌ها با event delegation
// ============================================================================


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
    'scanner.count': 'تعداد', 'scanner.addCfIps': 'افزودن IPهای پیش‌فرض CFnew به yx',
    'scanner.addCfDomains': 'افزودن دامنه‌های پیش‌فرض CFnew به yx',
    'modal.create': 'ایجاد کاربر جدید', 'modal.username': 'نام کاربری', 'modal.preset': 'پریست',
    'modal.limit': 'حجم مجاز (GB) — صفر برای نامحدود', 'modal.days': 'مدت اعتبار (روز) — صفر برای بدون انقضا',
    'modal.nodes': 'تعداد نود در ساب‌لینک', 'modal.createBtn': 'ساخت کاربر', 'modal.cancel': 'انصراف',
    'modal.advanced': 'تنظیمات منحصر به فرد این کاربر',
    'modal.password': 'تغییر رمز مدیر', 'modal.old': 'رمز فعلی', 'modal.new': 'رمز جدید',
    'modal.confirmNew': 'تکرار رمز جدید', 'modal.savePassword': 'ذخیره رمز',
    'field.echDomain': 'دامنه ECH', 'field.dns': 'DNS سفارشی (DoH)', 'field.fragPreset': 'پریست فرگمنت',
    'field.ports': 'پورت‌های نود (ports)', 'field.fp': 'فینگرپرینت TLS', 'field.patt': 'الگوی مسیر (patt)',
    'field.rotation': 'چرخش آی‌پی', 'field.proxyIP': 'ProxyIP سفارشی (p)', 'field.locCount': 'تعداد نود چندلوکیشن',
    'field.outProxy': 'پروکسی خروجی (s)', 'field.dnsHint': 'یک DNS از لیست انتخاب کنید یا مقدار دلخواه DoH بنویسید.',
    'field.adminPath': 'مسیر مدیریت (رندوم)', 'field.customPath': 'مسیر سفارشی پنل (d)',
    'field.homepage': 'صفحه استتار (homepage)', 'field.yx': 'نودهای ترجیحی (yx)', 'field.nodeCount': 'تعداد نود هر کاربر',
    'warn.title': 'هشدار تداخل تنظیمات:',
    'card.usage': 'مصرف', 'card.expiry': 'انقضا', 'card.unlimited': 'نامحدود',
    'card.noExpiry': 'بدون انقضا', 'card.nodes': 'نود', 'card.active': 'فعال',
    'card.inactive': 'غیرفعال', 'card.preset': 'پریست', 'card.subscription': 'اشتراک فعال',
    'btn.copySub': 'ساب', 'btn.status': 'وضعیت', 'btn.resetUser': 'ریست', 'btn.testNodes': 'تست اتصال',
    'btn.rotatePath': 'مسیر جدید', 'btn.addToYx': 'افزودن به yx', 'btn.connectS': 'اتصال به s',
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
    'scanner.count': 'Count', 'scanner.addCfIps': 'Add CFnew default IPs to yx',
    'scanner.addCfDomains': 'Add CFnew default domains to yx',
    'modal.create': 'Create new user', 'modal.username': 'Username', 'modal.preset': 'Preset',
    'modal.limit': 'Data limit (GB) — 0 for unlimited', 'modal.days': 'Validity (days) — 0 for never',
    'modal.nodes': 'Nodes in subscription', 'modal.createBtn': 'Create user', 'modal.cancel': 'Cancel',
    'modal.advanced': 'Unique settings for this user',
    'modal.password': 'Change admin password', 'modal.old': 'Current password', 'modal.new': 'New password',
    'modal.confirmNew': 'Confirm new password', 'modal.savePassword': 'Save password',
    'field.echDomain': 'ECH domain', 'field.dns': 'Custom DNS (DoH)', 'field.fragPreset': 'Fragment preset',
    'field.ports': 'Node ports (ports)', 'field.fp': 'TLS fingerprint', 'field.patt': 'Path pattern (patt)',
    'field.rotation': 'IP rotation', 'field.proxyIP': 'Custom ProxyIP (p)', 'field.locCount': 'Location node count',
    'field.outProxy': 'Outbound proxy (s)', 'field.dnsHint': 'Pick a DNS from the list or type a custom DoH value.',
    'field.adminPath': 'Admin path (random)', 'field.customPath': 'Custom panel path (d)',
    'field.homepage': 'Camouflage page (homepage)', 'field.yx': 'Preferred nodes (yx)', 'field.nodeCount': 'Nodes per user',
    'warn.title': 'Settings conflict warning:',
    'card.usage': 'Usage', 'card.expiry': 'Expiry', 'card.unlimited': 'Unlimited',
    'card.noExpiry': 'No expiry', 'card.nodes': 'nodes', 'card.active': 'Active',
    'card.inactive': 'Disabled', 'card.preset': 'Preset', 'card.subscription': 'Active subscription',
    'btn.copySub': 'Sub', 'btn.status': 'Status', 'btn.resetUser': 'Reset', 'btn.testNodes': 'Test',
    'btn.rotatePath': 'New path', 'btn.addToYx': 'Add to yx', 'btn.connectS': 'Connect to s',
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

function renderAdminDashboardHtml(initialData = {}) {
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
    countrySources: COUNTRY_PROXY_SOURCES,
    maxUsersLimit: MAX_USERS_LIMIT,
    telegramSupport: TELEGRAM_SUPPORT,
    dnsPresets: DNS_PRESETS,
    portChoices: CF_PORT_CHOICES,
    echDomains: ECH_DOMAINS,
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
    layers: icon('layers')
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
<style>
  :root {
    --bg: #05080a;
    --bg-soft: #070c0e;
    --panel: rgba(9, 15, 13, 0.92);
    --panel-2: rgba(12, 20, 16, 0.9);
    --line: rgba(181, 255, 77, 0.13);
    --line-strong: rgba(181, 255, 77, 0.34);
    --neon: #b5ff4d;
    --neon-soft: rgba(181, 255, 77, 0.1);
    --neon-glow: rgba(181, 255, 77, 0.28);
    --text: #e9f3e2;
    --muted: #85957f;
    --muted-2: #5d6b59;
    --danger: #ff6262;
    --warn: #ffce5c;
    --info: #63e6d4;
    --radius: 18px;
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
    padding-bottom: 108px;
    -webkit-font-smoothing: antialiased;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(900px 480px at 82% -8%, rgba(181, 255, 77, 0.11), transparent 65%),
      radial-gradient(700px 420px at 8% 4%, rgba(99, 230, 212, 0.06), transparent 60%),
      linear-gradient(180deg, #060a0b 0%, #040607 100%);
  }
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(181, 255, 77, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(181, 255, 77, 0.035) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 78%);
    opacity: 0.55;
    pointer-events: none;
  }
  /* ---------- light theme (پنل، نه فقط صفحه ورود) ---------- */
  body.light-mode {
    --bg: #eef3f0;
    --bg-soft: #f7faf8;
    --panel: rgba(255, 255, 255, 0.94);
    --panel-2: rgba(248, 252, 249, 0.94);
    --line: rgba(6, 118, 71, 0.16);
    --line-strong: rgba(6, 118, 71, 0.38);
    --neon: #0b8a4b;
    --neon-soft: rgba(11, 138, 75, 0.1);
    --neon-glow: rgba(11, 138, 75, 0.22);
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
  body.light-mode .dock { background: rgba(255, 255, 255, 0.95); }
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
  body.light-mode .dock-item { color: #4b5c50; }
  body.light-mode .switch i { background: #cfdcd4; }

  .mi { width: 20px; height: 20px; display: inline-block; vertical-align: middle; flex: none; }
  .mi-sm { width: 16px; height: 16px; }
  .mi-lg { width: 26px; height: 26px; }

  /* ---------- top bar ---------- */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 22px;
    background: rgba(5, 8, 10, 0.82);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
  }
  .brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .brand .mili-shield-svg { width: 38px; height: 38px; flex: none; }
  .brand-text { line-height: 1.15; }
  .brand-name { font-size: 1.02rem; font-weight: 800; letter-spacing: 0.4px; }
  .brand-name span { color: var(--neon); }
  .brand-ver {
    font-family: var(--mono);
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 0.6px;
  }
  .topbar-spacer { flex: 1; }
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
    border-radius: 11px;
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
  .topbar .hide-sm { display: inline-flex; }

  /* ---------- main ---------- */
  .main { max-width: 1180px; margin: 0 auto; padding: 24px 20px 10px; }
  .panel { display: none; animation: rise 0.32s ease both; }
  .panel.is-active { display: block; }
  @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .window {
    border: 1px solid var(--line);
    border-radius: var(--radius);
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
    background: linear-gradient(90deg, rgba(181, 255, 77, 0.06), transparent 55%);
  }
  .dots { display: inline-flex; gap: 6px; margin-inline-start: 2px; }
  .dots i { width: 8px; height: 8px; border-radius: 50%; display: block; background: #2b3a2c; }
  .dots i:nth-child(1) { background: #ff6b6b; }
  .dots i:nth-child(2) { background: #ffce5c; }
  .dots i:nth-child(3) { background: #b5ff4d; }
  .window-title { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 0.95rem; }
  .window-title .mi { color: var(--neon); }
  .window-sub { color: var(--muted); font-size: 0.74rem; margin-inline-start: 4px; font-weight: 500; }
  .window-head .spacer { flex: 1; }
  .window-body { padding: 18px; }

  /* ---------- metrics ---------- */
  .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 14px; }
  .metric {
    position: relative;
    border: 1px solid var(--line);
    border-radius: 15px;
    padding: 16px 16px 14px;
    background:
      radial-gradient(140px 90px at 100% 0%, rgba(181, 255, 77, 0.09), transparent 70%),
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
  .metric-value { font-size: 1.7rem; font-weight: 800; margin: 10px 0 2px; letter-spacing: 0.5px; }
  .metric-value small { font-size: 0.86rem; color: var(--muted); font-weight: 600; margin-inline-start: 4px; }
  .metric-foot { font-size: 0.72rem; color: var(--muted-2); }

  .split { display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; margin-top: 16px; }
  .card {
    border: 1px solid var(--line);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.016);
    padding: 16px;
  }
  .card h3 { margin: 0 0 12px; font-size: 0.86rem; color: var(--text); display: flex; align-items: center; gap: 8px; }
  .card h3 .mi { color: var(--neon); width: 17px; height: 17px; }
  .kv { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px dashed rgba(181, 255, 77, 0.09); font-size: 0.8rem; }
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

  /* ---------- buttons ---------- */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 15px; border-radius: 11px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.025);
    color: var(--text);
    font-family: inherit; font-size: 0.8rem; font-weight: 700;
    cursor: pointer; transition: 0.16s;
  }
  .btn .mi { width: 16px; height: 16px; }
  .btn:hover { border-color: var(--line-strong); background: var(--neon-soft); }
  .btn.primary {
    background: linear-gradient(180deg, rgba(181, 255, 77, 0.95), rgba(139, 209, 42, 0.95));
    color: #0a1206; border-color: transparent;
    box-shadow: 0 8px 22px rgba(181, 255, 77, 0.18);
  }
  .btn.primary:hover { filter: brightness(1.06); background: linear-gradient(180deg, #c7ff72, #98dd33); }
  .btn.ghost { background: transparent; }
  .btn.danger { color: var(--danger); border-color: rgba(255, 98, 98, 0.28); }
  .btn.danger:hover { background: rgba(255, 98, 98, 0.1); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn.sm { padding: 7px 10px; font-size: 0.72rem; border-radius: 9px; }
  .btn.sm .mi { width: 14px; height: 14px; }
  .toolbar { display: flex; flex-wrap: wrap; gap: 9px; align-items: center; }
  .toolbar .spacer { flex: 1; }

  /* ---------- users ---------- */
  .user-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .user-card {
    border: 1px solid var(--line);
    border-radius: 15px;
    padding: 15px;
    background: linear-gradient(180deg, rgba(181, 255, 77, 0.035), rgba(255, 255, 255, 0.012));
  }
  .user-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .user-name { font-weight: 800; font-size: 0.94rem; }
  .user-uuid { font-family: var(--mono); font-size: 0.66rem; color: var(--muted-2); direction: ltr; text-align: left; margin-top: 3px; }
  .pill { font-size: 0.68rem; font-weight: 700; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line); }
  .pill.on { color: var(--neon); border-color: var(--line-strong); background: var(--neon-soft); }
  .pill.off { color: var(--danger); border-color: rgba(255, 98, 98, 0.3); background: rgba(255, 98, 98, 0.08); }
  .usage { display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--muted); margin-top: 4px; }
  .bar { height: 6px; border-radius: 99px; background: rgba(255, 255, 255, 0.07); overflow: hidden; margin: 7px 0 2px; }
  .bar > i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, #86c62c, #b5ff4d); }
  .user-tags { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0; }
  .user-actions { display: flex; flex-wrap: wrap; gap: 6px; }
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
  .field input:focus, .field select:focus { border-color: var(--line-strong); box-shadow: 0 0 0 3px rgba(181, 255, 77, 0.08); }
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
  .switch input:checked + i { background: rgba(181, 255, 77, 0.26); border-color: var(--line-strong); }
  .switch input:checked + i::after { background: var(--neon); inset-inline-start: 21px; box-shadow: 0 0 10px var(--neon-glow); }
  .group-title { font-size: 0.8rem; font-weight: 800; color: var(--text); margin: 4px 0 12px; display: flex; align-items: center; gap: 8px; }
  .group-title .mi { color: var(--neon); width: 17px; height: 17px; }

  /* ---------- scanner ---------- */
  .scan-controls { display: grid; grid-template-columns: 1.4fr 0.8fr auto; gap: 10px; align-items: end; }
  .table-wrap { overflow-x: auto; margin-top: 14px; border: 1px solid var(--line); border-radius: 12px; }
  table.scan { width: 100%; border-collapse: collapse; font-size: 0.78rem; min-width: 620px; }
  table.scan th {
    text-align: right; padding: 10px 12px; color: var(--muted);
    font-weight: 600; font-size: 0.72rem;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--line);
  }
  table.scan td { padding: 10px 12px; border-bottom: 1px solid rgba(181, 255, 77, 0.07); }
  table.scan tr:last-child td { border-bottom: 0; }
  table.scan tr:hover td { background: rgba(181, 255, 77, 0.03); }
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
  .loc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr)); gap: 12px; }
  .loc-card {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    border: 1px solid var(--line); border-radius: 12px; padding: 11px 12px;
    background: rgba(255, 255, 255, 0.015);
  }
  .loc-name { font-size: 0.8rem; font-weight: 700; }
  .loc-meta { font-size: 0.68rem; color: var(--muted-2); margin-top: 2px; }

  /* ---------- dock ---------- */
  .dock-wrap { position: fixed; inset-inline: 0; bottom: 14px; z-index: 60; display: flex; justify-content: center; pointer-events: none; }
  .dock {
    pointer-events: auto;
    display: flex; align-items: center; gap: 4px;
    padding: 7px;
    border-radius: 20px;
    border: 1px solid var(--line);
    background: rgba(6, 10, 9, 0.9);
    backdrop-filter: blur(20px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.4) inset;
  }
  .dock-item {
    appearance: none; border: 0; background: transparent; color: var(--muted);
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    min-width: 74px; padding: 8px 10px; border-radius: 14px;
    font-family: inherit; font-size: 0.68rem; font-weight: 600; cursor: pointer;
    transition: 0.16s; position: relative;
  }
  .dock-item .mi { width: 21px; height: 21px; }
  .dock-item:hover { color: var(--text); background: rgba(255, 255, 255, 0.04); }
  .dock-item.is-active { color: var(--neon); background: var(--neon-soft); }
  .dock-item.is-active::after {
    content: ""; position: absolute; bottom: 4px; width: 4px; height: 4px; border-radius: 50%;
    background: var(--neon); box-shadow: 0 0 8px var(--neon-glow);
  }

  /* ---------- modal / toast ---------- */
  .modal { position: fixed; inset: 0; z-index: 90; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(2, 5, 4, 0.72); backdrop-filter: blur(6px); }
  .modal.is-open { display: flex; }
  .modal-card { width: min(460px, 100%); border-radius: var(--radius); border: 1px solid var(--line-strong); background: #070d0b; box-shadow: var(--shadow); overflow: hidden; }
  .modal-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--line); }
  .modal-head b { font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
  .modal-head .mi { color: var(--neon); }
  .modal-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 74vh; overflow-y: auto; }
  .adv-box { border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; background: rgba(255, 255, 255, 0.015); }
  .adv-box summary { cursor: pointer; font-size: 0.8rem; font-weight: 700; color: var(--neon); }
  body.light-mode .adv-box { background: #f8faf9; }
  .modal-foot { padding: 0 16px 16px; display: flex; gap: 8px; justify-content: flex-start; }
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
    .topbar .hide-sm { display: none; }
    .brand-ver { font-size: 0.62rem; }
    .split { grid-template-columns: 1fr; }
    .scan-controls { grid-template-columns: 1fr; }
    .window-body { padding: 14px; }
    .window-sub { display: none; }
    .dock-item { min-width: 60px; padding: 7px 6px; font-size: 0.62rem; }
    .dock-item .mi { width: 19px; height: 19px; }
  }
</style>
</head>
<body>
  <header class="topbar">
    <div class="brand">
      ${SHIELD_LOGO_SVG}
      <div class="brand-text">
        <div class="brand-name">${BRAND_NAME}<span>OS</span></div>
        <div class="brand-ver">${BRAND_UPPER} ${VERSION}</div>
      </div>
    </div>
    <div class="topbar-spacer"></div>
    <div class="chip hide-sm" id="storageChip"><span class="dot"></span><span id="storageText">حافظه</span></div>
    <div class="chip"><span id="userChipText">0 / ${MAX_USERS_LIMIT}</span><span>کاربر</span></div>
    <div class="chip hide-sm" id="clockChip">--:--</div>
    <button class="icon-btn" type="button" data-act="toggle-theme" id="themeBtn" title="حالت روز / شب">${icon('bolt')}<span class="hide-sm" data-i18n="top.theme">حالت روز</span></button>
    <button class="icon-btn" type="button" data-act="toggle-lang" id="langBtn" title="زبان"><span data-i18n="top.lang">English</span></button>
    <a class="icon-btn hide-sm" href="${SUPPORT_URL}" target="_blank" rel="noopener">${icon('signal')}<span data-i18n="top.support">پشتیبانی</span></a>
    <button class="icon-btn" type="button" data-act="open-multi" title="سابلینک چندلوکیشن">${icon('globe')}<span class="hide-sm" data-i18n="top.multi">چندلوکیشن</span></button>
    <button class="icon-btn" type="button" data-act="open-password" title="تغییر رمز مدیر">${icon('key')}</button>
    <button class="icon-btn danger" type="button" data-act="logout" title="خروج">${icon('logout')}</button>
  </header>

  <main class="main">
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
              <div class="metric-foot">CFnew + نودهای ترجیحی</div>
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
                <button class="btn" type="button" data-act="copy-master">${icon('copy')} <span data-i18n="btn.copyMaster">کپی سابلینک اصلی</span></button>
                <button class="btn ghost" type="button" data-act="go-settings">${icon('settings')} <span data-i18n="nav.settings">تنظیمات</span></button>
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

    <section class="panel" data-panel="settings">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('settings')} <span data-i18n="panel.settings">تنظیمات</span> <span class="window-sub" data-i18n="panel.settingsSub">هسته پروکسی، شبکه و پنل</span></div>
        </div>
        <div class="window-body">
          <div class="group-title">${icon('layers')} <span data-i18n="settings.protocols">پروتکل‌ها و قابلیت‌ها</span></div>
          <div class="form-grid">
            <div class="switch-row">
              <div class="switch-meta">${icon('shield')}<div><b>VLESS</b><span>پروتکل اصلی اشتراک</span></div></div>
              <label class="switch"><input type="checkbox" data-key="ev"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('shield')}<div><b>Shadowsocks</b><span>پروتکل جایگزین · بدون فرگمنت</span></div></div>
              <label class="switch"><input type="checkbox" data-key="es"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('shield')}<div><b>Trojan</b><span>پورت و رمز عبور</span></div></div>
              <label class="switch"><input type="checkbox" data-key="et"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('terminal')}<div><b>xHTTP</b><span>استریمینگ HTTP جدید</span></div></div>
              <label class="switch"><input type="checkbox" data-key="ex"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('lock')}<div><b>ECH</b><span>رمزنگاری SNI</span></div></div>
              <label class="switch"><input type="checkbox" data-key="ech"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('bolt')}<div><b>فرگمنت TLS</b><span>ضد DPI — شادوساکس فرگمنت ندارد</span></div></div>
              <label class="switch"><input type="checkbox" data-key="frag"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('wifi')}<div><b>EPI</b><span>IP پیش‌فرض کلاینت</span></div></div>
              <label class="switch"><input type="checkbox" data-key="epi"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('branch')}<div><b>زنجیره خانگی (JK)</b><span>اتصال زنجیره‌ای</span></div></div>
              <label class="switch"><input type="checkbox" data-key="jk"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('wifi')}<div><b>IPv4</b><span>آی‌پی‌های ثابت نسخه ۴</span></div></div>
              <label class="switch"><input type="checkbox" data-key="ipv4"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('wifi')}<div><b>IPv6</b><span>آی‌پی‌های ثابت نسخه ۶</span></div></div>
              <label class="switch"><input type="checkbox" data-key="ipv6"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('globe')}<div><b>دامنه‌های مستقیم (EPD)</b><span>نودهای دامنه CNAME</span></div></div>
              <label class="switch"><input type="checkbox" data-key="epd"><i></i></label>
            </div>
            <div class="switch-row">
              <div class="switch-meta">${icon('globe')}<div><b>لیست آی‌پی خارجی (EGI)</b><span>واکشی از آدرس yxURL</span></div></div>
              <label class="switch"><input type="checkbox" data-key="egi"><i></i></label>
            </div>
          </div>

          <div class="group-title" style="margin-top: 22px;">${icon('sliders')} <span data-i18n="settings.network">شبکه و ترنسپورت</span></div>
          <div class="form-grid">
            <div class="field">
              <label>رمز تروجان (tp)</label>
              <input type="text" data-key="tp" placeholder="اختیاری">
            </div>
            <div class="field">
              <label>متد Shadowsocks</label>
              <select data-key="ssmethod">
                ${ssmethods.map(m => `<option value="${m}">${m} (سازگار با هسته)</option>`).join('')}
              </select>
              <span class="hint">هسته این ورکر فقط هدر متنی SS را می‌خواند؛ متدهای AEAD باعث بی‌پاسخ شدن نود می‌شوند.</span>
            </div>
            <div class="field" data-show-when="ech">
              <label>دامنه ECH</label>
              <select data-key="customECHDomain">
                ${ECH_DOMAINS.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </div>
            <div class="field" data-show-when="frag">
              <label>پریست فرگمنت</label>
              <select data-key="fragmentPreset">
                ${Object.entries(FRAGMENT_PRESETS).map(([id, p]) => `<option value="${id}">${p.name}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>فینگرپرینت TLS</label>
              <select data-key="fp">
                ${FINGERPRINT_PRESETS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>الگوی مسیر (patt)</label>
              <select data-key="patt">
                ${PATH_PATTERNS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>چرخش آی‌پی</label>
              <select data-key="ipRotation">
                ${ipRotationOptions.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>ProxyIP سفارشی (p)</label>
              <input type="text" data-key="p" placeholder="domain:port">
            </div>
            <div class="field">
              <label>تعداد نود چندلوکیشن</label>
              <input type="number" data-key="locationNodeCount" min="1" max="40" step="1" placeholder="8">
            </div>
            <div class="field">
              <label>پروکسی خروجی (s)</label>
              <input type="text" data-key="s" placeholder="socks5://user:pass@host:port">
              <span class="hint">ترافیک خروجی از این پروکسی عبور می‌کند (همان مقدار در مسیر نود هم گذاشته می‌شود).</span>
            </div>
            <div class="field" data-show-when="frag">
              <label>طول فرگمنت</label>
              <input type="text" data-key="fragmentLength" placeholder="100-200">
            </div>
            <div class="field" data-show-when="frag">
              <label>فاصله فرگمنت</label>
              <input type="text" data-key="fragmentInterval" placeholder="10-20">
            </div>
            <div class="field" data-show-when="frag">
              <label>نوع پکت فرگمنت</label>
              <input type="text" data-key="fragmentPackets" placeholder="tlshello">
            </div>
            <div class="field">
              <label data-i18n="field.dns">DNS سفارشی (DoH)</label>
              <select id="dnsPreset">
                ${DNS_PRESETS.map(d => `<option value="${d.value}">${d.name}</option>`).join('')}
                <option value="custom">سفارشی (مقدار دلخواه)</option>
              </select>
              <input type="text" data-key="customDNS" placeholder="https://223.5.5.5/dns-query" style="margin-top:8px;">
              <span class="hint" data-i18n="field.dnsHint">یک DNS از لیست انتخاب کنید یا مقدار دلخواه DoH بنویسید.</span>
            </div>
            <div class="field">
              <label data-i18n="field.ports">پورت‌های نود (ports)</label>
              <input type="text" data-key="ports" placeholder="443,2053,2087,8443">
              <span class="hint">لیست پورت‌ها با کاما — مجاز: ${CF_PORT_CHOICES.map(p => p.port).join(' , ')}. پورت HTTP فقط وقتی ECH خاموش است استفاده می‌شود.</span>
            </div>
          </div>

          <div class="group-title" style="margin-top: 22px;">${icon('shield')} <span data-i18n="settings.panel">پنل و امنیت</span></div>
          <div class="form-grid">
            <div class="field">
              <label data-i18n="field.adminPath">مسیر مدیریت (رندوم)</label>
              <div class="toolbar">
                <input type="text" id="adminPathView" class="mono" readonly style="flex:1;">
                <button class="btn sm" type="button" data-act="copy-admin-path">${icon('copy')} کپی</button>
                <button class="btn sm ghost" type="button" data-act="rotate-path">${icon('refresh')} <span data-i18n="btn.rotatePath">مسیر جدید</span></button>
              </div>
              <span class="hint">آدرس ثابت پنل همیشه <b>/admin</b> است؛ مسیر رندوم بالا (یا مسیر سفارشی d) هم به‌عنوان آدرس جایگزین کار می‌کند.</span>
            </div>
            <div class="field">
              <label data-i18n="field.customPath">مسیر سفارشی پنل (d)</label>
              <input type="text" data-key="d" placeholder="admin">
              <span class="hint">در صورت خالی بودن، همان مسیر رندوم بالا استفاده می‌شود.</span>
            </div>
            <div class="field">
              <label>صفحه استتار (homepage)</label>
              <input type="text" data-key="homepage" placeholder="https://example.com">
            </div>
            <div class="field">
              <label>نودهای ترجیحی (yx)</label>
              <input type="text" data-key="yx" placeholder="1.2.3.4:443#Node, 5.6.7.8:443#Node2">
            </div>
            <div class="field">
              <label data-i18n="field.nodeCount">تعداد نود هر کاربر</label>
              <input type="number" data-key="subNodeCount" min="1" max="200" step="1">
            </div>
          </div>

          <div id="configWarnings" class="warn-box" style="display:none;"></div>

          <div class="toolbar" style="margin-top: 18px;">
            <button class="btn primary" type="button" data-act="save-config">${icon('check')} <span data-i18n="btn.save">ذخیره تنظیمات</span></button>
            <button class="btn ghost" type="button" data-act="reset-config">${icon('refresh')} <span data-i18n="btn.reset">بازنشانی پیش‌فرض</span></button>
            <div class="spacer"></div>
            <button class="btn" type="button" data-act="open-password">${icon('key')} <span data-i18n="btn.password">تغییر رمز مدیر</span></button>
          </div>
        </div>
      </div>
    </section>

    <section class="panel" data-panel="scanner">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('radar')} <span data-i18n="panel.scanner">اسکنر زنده</span> <span class="window-sub" data-i18n="panel.scannerSub">دریافت زنده پروکسی و آی‌پی ثابت (IPv4/IPv6) به تفکیک کشور</span></div>
        </div>
        <div class="window-body">
          <div class="scan-controls">
            <div class="field">
              <label data-i18n="scanner.country">کشور</label>
              <select id="scanCountry">${countryOptions()}</select>
            </div>
            <div class="field">
              <label data-i18n="scanner.kind">نوع</label>
              <select id="scanKind">
                <option value="proxy" selected>پروکسی زنده (SOCKS5 / HTTP)</option>
                <option value="ip">آی‌پی ثابت CF</option>
              </select>
            </div>
            <div class="field" id="scanFamilyWrap">
              <label data-i18n="scanner.family">خانواده آی‌پی</label>
              <select id="scanFamily">
                <option value="any" selected>IPv4 + IPv6</option>
                <option value="ipv4">فقط IPv4</option>
                <option value="ipv6">فقط IPv6</option>
              </select>
            </div>
            <div class="field">
              <label data-i18n="scanner.count">تعداد</label>
              <select id="scanLimit">
                <option value="5">۵ مورد</option>
                <option value="10" selected>۱۰ مورد</option>
                <option value="15">۱۵ مورد</option>
                <option value="20">۲۰ مورد</option>
              </select>
            </div>
            <button class="btn primary" type="button" id="btnScan" data-act="run-scan">${icon('bolt')} <span data-i18n="btn.scan">دریافت و تست</span></button>
          </div>
          <div class="scan-status" id="scanHint">آی‌پی‌های سالم با دکمهٔ «افزودن به yx» و پروکسی‌ها با «اتصال به s» در تنظیمات ذخیره می‌شوند.</div>
          <div class="toolbar" style="margin-top: 12px;">
            <button class="btn sm" type="button" data-act="add-cf-ips">${icon('plus')} <span data-i18n="scanner.addCfIps">افزودن IPهای پیش‌فرض CFnew به yx</span></button>
            <button class="btn sm" type="button" data-act="add-cf-domains">${icon('globe')} <span data-i18n="scanner.addCfDomains">افزودن دامنه‌های پیش‌فرض CFnew به yx</span></button>
          </div>
          <div class="scan-status" id="scanStatus"></div>
          <div class="table-wrap">
            <table class="scan">
              <thead>
                <tr>
                  <th data-i18n="scan.colCountry">کشور</th>
                  <th data-i18n="scan.colAddr">آدرس / پورت</th>
                  <th data-i18n="scan.colType">نوع / پروتکل</th>
                  <th data-i18n="scan.colPing">پینگ</th>
                  <th data-i18n="scan.colStatus">وضعیت</th>
                  <th data-i18n="scan.colAction">عملیات</th>
                </tr>
              </thead>
              <tbody id="scanBody">
                <tr><td colspan="6" class="empty">برای شروع، دریافت و تست را بزنید.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="panel" data-panel="locations">
      <div class="window">
        <div class="window-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <div class="window-title">${icon('globe')} <span data-i18n="panel.locations">چندلوکیشن</span> <span class="window-sub" data-i18n="panel.locationsSub">سابلینک به تفکیک کشور</span></div>
          <div class="spacer"></div>
          <button class="btn sm ghost" type="button" data-act="copy-master">${icon('copy')} همه لوکیشن‌ها</button>
        </div>
        <div class="window-body">
          <div class="loc-grid" id="locGrid"></div>
        </div>
      </div>
    </section>
  </main>

  <div class="dock-wrap">
    <nav class="dock">
      <button class="dock-item is-active" type="button" data-tab="dashboard">${icon('dashboard')}<span data-i18n="nav.dashboard">داشبورد</span></button>
      <button class="dock-item" type="button" data-tab="users">${icon('users')}<span data-i18n="nav.users">کاربران</span></button>
      <button class="dock-item" type="button" data-tab="settings">${icon('settings')}<span data-i18n="nav.settings">تنظیمات</span></button>
      <button class="dock-item" type="button" data-tab="scanner">${icon('radar')}<span data-i18n="nav.scanner">اسکنر</span></button>
      <button class="dock-item" type="button" data-tab="locations">${icon('globe')}<span data-i18n="nav.locations">چندلوکیشن</span></button>
    </nav>
  </div>

  <div class="modal" id="createModal">
    <div class="modal-card">
      <div class="modal-head"><b>${icon('plus')} ایجاد کاربر جدید</b><button class="icon-btn" type="button" data-act="close-modal" data-modal="createModal">${icon('close')}</button></div>
      <div class="modal-body">
        <div class="field"><label>نام کاربری</label><input type="text" id="newUsername" placeholder="مثلاً ali"></div>
        <div class="field"><label>پریست</label><select id="newPreset">${presetOptions}</select></div>
        <div class="field"><label>حجم مجاز (GB) — صفر برای نامحدود</label><input type="number" id="newLimit" min="0" step="1" value="0"></div>
        <div class="field"><label>مدت اعتبار (روز) — صفر برای بدون انقضا</label><input type="number" id="newDays" min="0" step="1" value="0"></div>
        <div class="field"><label>تعداد نود در سابلینک</label><input type="number" id="newNodes" min="1" max="200" step="1" value="${Number(config.subNodeCount) || 50}"></div>
        <details class="adv-box">
          <summary data-i18n="modal.advanced">تنظیمات منحصر به فرد این کاربر</summary>
          <div class="form-grid" style="margin-top:10px;">
            <div class="field"><label>VLESS</label><select id="cfgEv"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label>Trojan</label><select id="cfgEt"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label>Shadowsocks</label><select id="cfgEs"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label>xHTTP</label><select id="cfgEx"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label>ECH</label><select id="cfgEch"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label>فرگمنت</label><select id="cfgFrag"><option value="yes">روشن</option><option value="no">خاموش</option></select></div>
            <div class="field"><label data-i18n="field.dns">DNS سفارشی</label>
              <select id="cfgDNS">${DNS_PRESETS.map(d => `<option value="${d.value}">${d.name}</option>`).join('')}</select>
            </div>
            <div class="field"><label data-i18n="field.echDomain">دامنه ECH</label>
              <select id="cfgEchDomain">${ECH_DOMAINS.map(d => `<option value="${d}">${d}</option>`).join('')}</select>
            </div>
            <div class="field"><label data-i18n="field.ports">پورت‌های نود</label><input type="text" id="cfgPorts" value="${config.ports || '443,2053,2087,8443'}"></div>
            <div class="field"><label data-i18n="field.fp">فینگرپرینت TLS</label>
              <select id="cfgFp">${FINGERPRINT_PRESETS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select>
            </div>
            <div class="field"><label data-i18n="field.patt">الگوی مسیر</label>
              <select id="cfgPatt">${PATH_PATTERNS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select>
            </div>
            <div class="field"><label data-i18n="field.yx">نودهای ترجیحی (yx)</label><input type="text" id="cfgYx" placeholder="1.2.3.4:443#Node"></div>
            <div class="field"><label data-i18n="field.outProxy">پروکسی خروجی (s)</label><input type="text" id="cfgS" placeholder="socks5://host:1080"></div>
          </div>
        </details>
      </div>
      <div class="modal-foot">
        <button class="btn primary" type="button" data-act="create-user">${icon('check')} <span data-i18n="modal.createBtn">ساخت کاربر</span></button>
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
  function userKey(u) { return (u && (u.uuid || u.id)) || ''; }

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
    document.querySelectorAll('.dock-item').forEach(function(b) {
      b.classList.toggle('is-active', b.getAttribute('data-tab') === name);
    });
    if (history.replaceState) history.replaceState(null, '', '#' + name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMetrics() {
    var users = state.users || [];
    var totalBytes = users.reduce(function(a, u) { return a + Number(u.usedBytes || 0); }, 0);
    $('mUsers').innerHTML = users.length + ' <small>/ ' + MAX_USERS + '</small>';
    $('mUsersFoot').textContent = users.length >= MAX_USERS ? 'سقف کاربران تکمیل است' : (MAX_USERS - users.length) + ' ظرفیت آزاد';
    $('mTraffic').innerHTML = fmtGb(totalBytes) + ' <small>GB</small>';
    $('mIps').innerHTML = (state.diagnostics.healthyCfIps || 0) + ' <small>نود</small>';
    $('mProto').textContent = activeProtocols().join(' + ');
    $('userChipText').textContent = users.length + ' / ' + MAX_USERS;

    var storage = state.diagnostics.storageMode || (state.diagnostics.d1Enabled ? 'D1' : 'Memory');
    $('storageText').textContent = 'ذخیره‌سازی ' + storage;
    $('storageChip').className = 'chip hide-sm' + (storage === 'D1' ? '' : ' warn');
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
      card.innerHTML = [
        '<div class="user-head">',
          '<div><div class="user-name">' + (u.username || ('کاربر ' + (idx + 1))) + '</div>',
          '<div class="user-uuid">' + (u.preset ? t('card.preset') + ': ' + u.preset : t('card.subscription')) + ' · ' + (u.subNodeCount || 0) + ' ' + t('card.nodes') + '</div></div>',
          '<span class="pill ' + (u.enabled ? 'on' : 'off') + '">' + (u.enabled ? t('card.active') : t('card.inactive')) + '</span>',
        '</div>',
        '<div class="usage"><span>' + t('card.usage') + ' ' + fmtGb(used) + ' GB</span><span>' + (limitGb > 0 ? limitGb + ' GB' : t('card.unlimited')) + '</span></div>',
        '<div class="bar"><i style="width:' + Math.max(pct, 2) + '%"></i></div>',
        '<div class="usage"><span>' + t('card.expiry') + ' ' + fmtDate(u.expireAt) + '</span><span>' + (u.subNodeCount || 0) + ' ' + t('card.nodes') + '</span></div>',
        '<div class="user-tags">' + activeProtocols().map(function(p) { return '<span class="tag on">' + p + '</span>'; }).join('') + '</div>',
        '<div class="user-actions">',
          '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '">' + ICO.copy + ' ' + t('btn.copySub') + '</button>',
          '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?target=clash">' + ICO.layers + ' Clash</button>',
          '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?target=singbox">' + ICO.bolt + ' Singbox</button>',
          '<a class="btn sm" href="' + statusUrl + '" target="_blank" rel="noopener">' + ICO.external + ' ' + t('btn.status') + '</a>',
          '<button class="btn sm ghost" type="button" data-act="test-nodes" data-user="' + userKey(u) + '">' + ICO.radar + ' ' + t('btn.testNodes') + '</button>',
          '<button class="btn sm ghost" type="button" data-act="reset-user" data-id="' + u.id + '">' + ICO.refresh + ' ' + t('btn.resetUser') + '</button>',
          '<button class="btn sm danger" type="button" data-act="delete-user" data-id="' + u.id + '">' + ICO.trash + '</button>',
        '</div>'
      ].join('');
      grid.appendChild(card);
    });
    renderMetrics();
  }

  function renderLocations() {
    var grid = $('locGrid');
    if (!grid) return;
    var base = origin() + '/sub/' + (userKey(state.users[0]) || ADMIN_PATH);
    var countries = INITIAL_DATA.countrySources || {};
    var html = '<div class="loc-card"><div><div class="loc-name">همه لوکیشن‌ها</div><div class="loc-meta">MULTI</div></div>' +
      '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?country=MULTI">' + ICO.copy + ' کپی</button></div>';
    Object.keys(countries).forEach(function(code) {
      html += '<div class="loc-card"><div><div class="loc-name">' + countries[code].name + '</div><div class="loc-meta">' + code + '</div></div>' +
        '<div class="toolbar">' +
        '<button class="btn sm" type="button" data-act="copy" data-url="' + base + '?country=' + code + '">' + ICO.copy + ' کپی</button>' +
        '<button class="btn sm ghost" type="button" data-act="country-proxy" data-code="' + code + '">' + ICO.link + ' پروکسی → s</button>' +
        '<button class="btn sm ghost" type="button" data-act="country-ip" data-code="' + code + '">' + ICO.globe + ' آی‌پی → yx</button>' +
        '</div></div>';
    });
    grid.innerHTML = html;
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

  var LANG = localStorage.getItem('mili_lang') === 'en' ? 'en' : 'fa';
  function t(key) {
    var dict = (INITIAL_DATA.i18n || {})[LANG] || (INITIAL_DATA.i18n || {}).fa || {};
    return dict[key] || key;
  }
  function updateThemeLabel() {
    var btn = $('themeBtn');
    if (!btn) return;
    var label = btn.querySelector('span[data-i18n]');
    var light = document.body.classList.contains('light-mode');
    var text = LANG === 'en' ? (light ? 'Dark mode' : 'Light mode') : (light ? 'حالت شب' : 'حالت روز');
    if (label) label.textContent = text;
  }
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
    localStorage.setItem('mili_theme', light ? 'light' : 'dark');
    updateThemeLabel();
  }
  function toggleLang() {
    LANG = LANG === 'fa' ? 'en' : 'fa';
    localStorage.setItem('mili_lang', LANG);
    applyLanguage();
    renderUsers();
    renderLocations();
    if (typeof scanResults !== 'undefined' && scanResults.length) renderScanRows(scanResults);
  }

  // هشدار هوشمند تداخل تنظیمات
  function detectConflicts(c) {
    var out = [];
    if (c.es === 'yes' && c.frag === 'yes') out.push('Shadowsocks از فرگمنت پشتیبانی نمی‌کند؛ نودهای SS بدون fragment ساخته می‌شوند (مجاز است).');
    if (c.ech === 'yes' && !/^https:\/\//i.test(String(c.customDNS || ''))) out.push('ECH به یک DNS از نوع DoH (https://) نیاز دارد.');
    if (c.ech === 'yes' && c.dkby === 'no') out.push('با فعال بودن ECH، پورت‌های HTTP خودکار حذف می‌شوند.');
    if (c.frag === 'yes' && (!c.fragmentPreset || c.fragmentPreset === 'off')) out.push('فرگمنت روشن است اما پریست روی «غیرفعال» است؛ پارامتری ساخته نمی‌شود.');
    if (c.epi === 'no' && c.epd === 'no' && !String(c.yx || '').trim()) out.push('همه منابع آدرس خاموش‌اند؛ سابلینک فقط از هاست ورکر ساخته می‌شود.');
    if (c.ev === 'no' && c.et === 'no' && c.ex === 'no' && c.es === 'no') out.push('هیچ پروتکلی روشن نیست؛ هسته به‌ناچار VLESS را فعال می‌کند.');
    if (String(c.s || '').trim() && !/^(socks5?|https?):\/\//i.test(String(c.s).trim())) out.push('آدرس پروکسی خروجی (s) باید با socks5:// یا http:// شروع شود.');
    if (c.yxURL && c.egi === 'no') out.push('آدرس yxURL وارد شده اما لیست آی‌پی خارجی (EGI) خاموش است.');
    var ports = String(c.ports || '').split(/[,\s]+/).filter(Boolean).map(Number).filter(function(p) { return p >= 1 && p <= 65535; });
    if (!ports.length) out.push('لیست پورت‌های نود خالی/نامعتبر است؛ از 443 استفاده می‌شود.');
    if (c.ipRotation && c.ipRotation !== 'off' && !String(c.yx || '').trim()) out.push('چرخش آی‌پی فعال است اما لیست yx خالی است.');
    return out;
  }
  function renderWarnings(list) {
    var box = $('configWarnings');
    if (!box) return;
    if (!list.length) { box.style.display = 'none'; box.innerHTML = ''; return; }
    box.style.display = 'block';
    box.innerHTML = '<b>' + t('warn.title') + '</b><ul>' + list.map(function(w) { return '<li>' + w + '</li>'; }).join('') + '</ul>';
  }

  function saveSettings() {
    var payload = {};
    document.querySelectorAll('.switch input[data-key]').forEach(function(input) {
      payload[input.getAttribute('data-key')] = input.checked ? 'yes' : 'no';
    });
    document.querySelectorAll('input[data-key], select[data-key]').forEach(function(input) {
      if (input.type === 'checkbox') return;
      payload[input.getAttribute('data-key')] = String(input.value || '').trim();
    });
    var warnings = detectConflicts(payload);
    renderWarnings(warnings);
    if (warnings.length && !confirm(t('warn.title') + '\n\n' + warnings.map(function(w, i) { return (i + 1) + '. ' + w; }).join('\n') + '\n\nادامه می‌دهید؟')) return;
    var btn = document.querySelector('[data-act="save-config"]');
    if (btn) btn.disabled = true;
    api('/api/config', { method: 'POST', body: JSON.stringify(payload) })
      .then(function(data) {
        if (data.success) {
          state.config = Object.assign({}, state.config, payload);
          fillSettings();
          renderMetrics();
          showToast('تنظیمات در D1 ذخیره شد', 'ok');
        } else {
          showToast(data.message || 'خطا در ذخیره تنظیمات', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در ذخیره تنظیمات', 'err'); })
      .finally(function() { if (btn) btn.disabled = false; });
  }

  function createUser() {
    var username = ($('newUsername').value || '').trim();
    if (username.length < 2) { showToast('نام کاربری باید حداقل ۲ کاراکتر باشد', 'err'); return; }
    var body = {
      username: username,
      preset: $('newPreset').value,
      dataLimitGb: Number($('newLimit').value) || 0,
      expireDays: Number($('newDays').value) || 0,
      subNodeCount: Number($('newNodes').value) || 50,
      config: {
        ev: $('cfgEv') ? $('cfgEv').value : 'yes',
        et: $('cfgEt') ? $('cfgEt').value : 'no',
        es: $('cfgEs') ? $('cfgEs').value : 'yes',
        ex: $('cfgEx') ? $('cfgEx').value : 'no',
        ech: $('cfgEch') ? $('cfgEch').value : 'no',
        frag: $('cfgFrag') ? $('cfgFrag').value : 'yes',
        customDNS: $('cfgDNS') ? $('cfgDNS').value : '',
        customECHDomain: $('cfgEchDomain') ? $('cfgEchDomain').value : '',
        ports: $('cfgPorts') ? $('cfgPorts').value.trim() : '',
        fp: $('cfgFp') ? $('cfgFp').value : 'chrome',
        patt: $('cfgPatt') ? $('cfgPatt').value : '/?ed=2048',
        yx: $('cfgYx') ? $('cfgYx').value.trim() : '',
        s: $('cfgS') ? $('cfgS').value.trim() : ''
      }
    };
    api('/api/users', { method: 'POST', body: JSON.stringify(body) })
      .then(function(data) {
        if (data.success) {
          state.users.push(data.user);
          renderUsers();
          renderLocations();
          closeModal('createModal');
          $('newUsername').value = '';
          showToast(data.message || 'کاربر ساخته شد', 'ok');
        } else {
          showToast(data.message || 'خطا در ساخت کاربر', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در ساخت کاربر', 'err'); });
  }

  function deleteUser(id) {
    if (!confirm('این کاربر حذف شود؟')) return;
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
    if (!confirm('مصرف این کاربر صفر شود؟')) return;
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

  function renderScanRows(items) {
    var body = $('scanBody');
    if (!items.length) {
      body.innerHTML = '<tr><td colspan="6" class="empty">' + t('scan.none') + '</td></tr>';
      return;
    }
    body.innerHTML = items.map(function(p) {
      var latClass = p.latencyMs < 150 ? 'lat-fast' : (p.latencyMs < 400 ? 'lat-med' : 'lat-slow');
      var isIp = p.kind === 'ip';
      var ipLabel = p.family === 'ipv6' ? 'IPv6' : (p.family === 'domain' ? t('scan.domain') : 'IPv4');
      var typeLabel = isIp ? (t('scan.ipStatic') + ' · ' + ipLabel) : (t('scan.proxy') + ' · ' + p.protocol);
      var action = isIp
        ? '<button class="btn sm" type="button" data-act="add-ip" data-ip="' + p.ip + '" data-port="' + p.port + '">' + ICO.plus + ' ' + t('btn.addToYx') + '</button>'
        : '<button class="btn sm" type="button" data-act="use-proxy" data-proxy="' + String(p.proxy || '').replace(/"/g, '&quot;') + '">' + ICO.link + ' ' + t('btn.connectS') + '</button>';
      return '<tr>' +
        '<td><span class="code-badge">' + p.code + '</span> ' + p.country + '</td>' +
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

  function applyScanItems(target, items) {
    return fetch(origin() + '/api/scanner/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Mili-Admin': '1' },
      body: JSON.stringify({ target: target, items: items })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        showToast(data.message || (data.success ? 'اعمال شد' : 'خطا در اعمال'), data.success ? 'ok' : 'err');
        if (data.success) {
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

  function runScan() {
    var country = $('scanCountry').value;
    var limit = $('scanLimit').value;
    var kind = $('scanKind') ? $('scanKind').value : 'proxy';
    var family = $('scanFamily') ? $('scanFamily').value : 'any';
    var btn = $('btnScan');
    var status = $('scanStatus');
    btn.disabled = true;
    status.className = 'scan-status';
    status.textContent = kind === 'ip'
      ? 'در حال نمونه‌گیری و تست واقعی آی‌پی‌های ثابت...'
      : 'در حال دریافت زنده لیست‌ها و تست واقعی اتصال TCP...';
    $('scanBody').innerHTML = '<tr><td colspan="6" class="empty">در حال تست...</td></tr>';

    scanRequest({ country: country, limit: limit, kind: kind, family: family })
      .then(function(data) {
        if (data.success && data.proxies && data.proxies.length) {
          scanResults = data.proxies;
          renderScanRows(data.proxies);
          status.textContent = data.message || (data.proxies.length + ' مورد آنلاین از ' + data.testedCount + ' تست');
        } else {
          $('scanBody').innerHTML = '<tr><td colspan="6" class="empty">موردی یافت نشد.</td></tr>';
          status.className = 'scan-status err';
          status.textContent = data.message || 'دریافت لیست یا تست ناموفق بود.';
        }
      })
      .catch(function() {
        $('scanBody').innerHTML = '<tr><td colspan="6" class="empty">خطا.</td></tr>';
        status.className = 'scan-status err';
        status.textContent = 'خطای شبکه در اجرای اسکنر.';
      })
      .finally(function() {
        btn.disabled = false;
      });
  }

  function syncConditionalFields() {
    document.querySelectorAll('[data-show-when]').forEach(function(el) {
      var key = el.getAttribute('data-show-when');
      var input = document.querySelector('.switch input[data-key="' + key + '"]');
      el.style.display = (!input || input.checked) ? '' : 'none';
    });
    var famWrap = $('scanFamilyWrap');
    if (famWrap) {
      var kindSel = $('scanKind');
      famWrap.style.display = (kindSel && kindSel.value === 'ip') ? '' : 'none';
    }
  }

  function rotatePath() {
    if (!confirm(t('toast.rotateConfirm'))) return;
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
        String(text || '').split(/\r?\n/).forEach(function(line) {
          var match = line.match(/@\[?([0-9a-fA-F:.]+)\]?:(\d+)/);
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
        showToast((kind === 'ips' ? 'آی‌پی‌های پیش‌فرض CFnew' : 'دامنه‌های پیش‌فرض CFnew') + ' به yx اضافه شدند', 'ok');
      }
    });
  }

  function addNode(ip, port) {
    return applyScanItems('yx', [{ ip: ip, port: Number(port) || 443, name: ip }]);
  }

  function useProxy(proxyUrl) {
    if (!proxyUrl) { showToast('آدرس پروکسی نامعتبر است', 'err'); return; }
    return applyScanItems('s', [{ proxy: proxyUrl }]);
  }

  function countryProxy(code) {
    showPanel('scanner');
    if ($('scanCountry')) $('scanCountry').value = code;
    if ($('scanKind')) $('scanKind').value = 'proxy';
    syncConditionalFields();
    var status = $('scanStatus');
    status.className = 'scan-status';
    status.textContent = 'در حال یافتن سریع‌ترین پروکسی ' + code + ' ...';
    $('scanBody').innerHTML = '<tr><td colspan="6" class="empty">در حال تست...</td></tr>';
    scanRequest({ country: code, limit: 8, kind: 'proxy', family: 'any' })
      .then(function(data) {
        if (!data.success || !data.proxies || !data.proxies.length) {
          status.className = 'scan-status err';
          status.textContent = data.message || 'پروکسی زنده‌ای برای این کشور پیدا نشد.';
          return;
        }
        renderScanRows(data.proxies);
        status.textContent = 'سریع‌ترین پروکسی ' + code + ' (' + data.proxies[0].latencyMs + ' ms) به s وصل شد.';
        return useProxy(data.proxies[0].proxy);
      })
      .catch(function() {
        status.className = 'scan-status err';
        status.textContent = 'خطای شبکه در دریافت پروکسی کشوری.';
      });
  }

  function countryIp(code) {
    showPanel('scanner');
    if ($('scanCountry')) $('scanCountry').value = code;
    if ($('scanKind')) $('scanKind').value = 'ip';
    if ($('scanFamily')) $('scanFamily').value = 'any';
    syncConditionalFields();
    var status = $('scanStatus');
    status.className = 'scan-status';
    status.textContent = 'در حال تست آی‌پی‌های ثابت...';
    $('scanBody').innerHTML = '<tr><td colspan="6" class="empty">در حال تست...</td></tr>';
    scanRequest({ country: code, limit: 10, kind: 'ip', family: 'any' })
      .then(function(data) {
        if (!data.success || !data.proxies || !data.proxies.length) {
          status.className = 'scan-status err';
          status.textContent = data.message || 'آی‌پی سالمی پیدا نشد.';
          return;
        }
        renderScanRows(data.proxies);
        return applyScanItems('yx', data.proxies.slice(0, 3).map(function(p) { return { ip: p.ip, port: p.port, name: p.ip }; }))
          .then(function() { status.textContent = 'آی‌پی‌های ثابت به yx اضافه شدند (سوییچ EPI را روشن نگه دارید).'; });
      })
      .catch(function() {
        status.className = 'scan-status err';
        status.textContent = 'خطای شبکه در تست آی‌پی‌ها.';
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
  function closeModal(id) { var m = $(id); if (m) m.classList.remove('is-open'); }

  function masterSub() { return origin() + '/sub/' + (ADMIN_PATH || ''); }

  document.addEventListener('click', function(event) {
    var tab = event.target.closest('[data-tab]');
    if (tab) { showPanel(tab.getAttribute('data-tab')); return; }

    var el = event.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');

    if (act === 'copy') { copyText(el.getAttribute('data-url') || '', 'لینک کپی شد'); }
    else if (act === 'copy-master') { copyText(masterSub(), 'سابلینک اصلی کپی شد'); }
    else if (act === 'open-create') { openModal('createModal'); }
    else if (act === 'open-password') { openModal('passwordModal'); }
    else if (act === 'open-multi') { showPanel('locations'); }
    else if (act === 'close-modal') { closeModal(el.getAttribute('data-modal')); }
    else if (act === 'create-user') { createUser(); }
    else if (act === 'delete-user') { deleteUser(el.getAttribute('data-id')); }
    else if (act === 'reset-user') { resetUser(el.getAttribute('data-id')); }
    else if (act === 'reload-users') { reloadUsers(); }
    else if (act === 'save-config') { saveSettings(); }
    else if (act === 'reset-config') { resetConfig(); }
    else if (act === 'save-password') { savePassword(); }
    else if (act === 'logout') { logout(); }
    else if (act === 'go-scan') { showPanel('scanner'); }
    else if (act === 'go-settings') { showPanel('settings'); }
    else if (act === 'run-scan') { runScan(); }
    else if (act === 'add-node' || act === 'add-ip') { addNode(el.getAttribute('data-ip'), el.getAttribute('data-port')); }
    else if (act === 'use-proxy') { useProxy(el.getAttribute('data-proxy')); }
    else if (act === 'country-proxy') { countryProxy(el.getAttribute('data-code')); }
    else if (act === 'country-ip') { countryIp(el.getAttribute('data-code')); }
    else if (act === 'toggle-theme') { toggleTheme(); }
    else if (act === 'toggle-lang') { toggleLang(); }
    else if (act === 'add-cf-ips') { addCfDefaults('ips'); }
    else if (act === 'add-cf-domains') { addCfDefaults('domains'); }
    else if (act === 'copy-admin-path') { copyText('/' + ADMIN_PATH, 'مسیر مدیریت کپی شد'); }
    else if (act === 'rotate-path') { rotatePath(); }
    else if (act === 'test-nodes') { testUserNodes(el.getAttribute('data-user')); }
  });

  document.addEventListener('click', function(event) {
    if (event.target.classList && event.target.classList.contains('modal')) {
      event.target.classList.remove('is-open');
    }
  });

  document.addEventListener('change', function(event) {
    var target = event.target;
    if (!target) return;
    if (target.matches && target.matches('.switch input[data-key]')) {
      var key = target.getAttribute('data-key');
      if (key === 'frag' || key === 'ech') syncConditionalFields();
    }
    if (target.id === 'scanKind') syncConditionalFields();
    if (target.id === 'dnsPreset') {
      var dnsInput = document.querySelector('input[data-key="customDNS"]');
      if (dnsInput && target.value !== 'custom') dnsInput.value = target.value;
    }
  });

  function resetConfig() {
    if (!confirm('همه تنظیمات به مقادیر پیش‌فرض بازگردد؟')) return;
    api('/api/config', { method: 'POST', body: JSON.stringify({ _reset: true }) })
      .then(function(data) {
        if (data.success) {
          state.config = data.config || {};
          fillSettings(); renderMetrics();
          showToast('تنظیمات بازنشانی شد', 'ok');
        } else {
          showToast(data.message || 'خطا در بازنشانی', 'err');
        }
      })
      .catch(function() { showToast('خطای شبکه در بازنشانی', 'err'); });
  }



  function tickClock() {
    var d = new Date();
    var txt = d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    var chip = $('clockChip');
    if (chip) chip.textContent = txt;
  }

  if (localStorage.getItem('mili_theme') === 'light') document.body.classList.add('light-mode');
  applyLanguage();
  renderUsers();
  renderLocations();
  fillSettings();
  syncConditionalFields();
  renderMetrics();
  tickClock();
  setInterval(tickClock, 30000);

  var hash = (window.location.hash || '').replace('#', '');
  if (hash && document.querySelector('[data-panel="' + hash + '"]')) showPanel(hash);
</script>
</body>
</html>`);
}


// --- MODULE: src/index.js ---
// ============================================================================
// miliconfig v3.1 - نقطه ورود اصلی Cloudflare Workers & Pages
// مجهز به لایه دیتابیس D1، مدیریت چندکاربره، نام‌گذاری number+miliconfig و محافظ ضد خطای 1101
// ============================================================================


function normalizeCleanPath(p = '') {
  return String(p || '').trim().replace(/^\/+|\/+$/g, '').toLowerCase();
}

function isAdminAuthorizedPath(prefixPath, adminUuid, customPath) {
  const cleanPrefix = normalizeCleanPath(prefixPath);
  if (!cleanPrefix) return false;
  const cleanAdmin = normalizeCleanPath(adminUuid);
  const cleanCustom = normalizeCleanPath(customPath);
  if (cleanCustom) {
    return cleanPrefix === cleanCustom || cleanPrefix === cleanAdmin;
  }
  return cleanPrefix === cleanAdmin;
}

const __MILI_WORKER_EXPORT__ = {
  async fetch(request, env = {}, ctx = {}) {
    try {
      const url = new URL(request.url);
      const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase();
      const isWebSocket = upgradeHeader === 'websocket';

      // اطمینان از آماده بودن اسکیمای D1 یا حافظه پشتیبان بدون هیچ خطایی
      await ensureD1Schema(env);
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
          // استتار nginx (الهام از edgetunnel): کلادفلر صفحه را وب‌سرور معمولی می‌بیند
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

        if (apiSubPath === 'config') {
          return await handleConfigApi(request, env);
        }
        if (apiSubPath === 'users') {
          return await handleUsersApi(request, env);
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
        // ۴-الف: صفحه اصلی /
        if (url.pathname === '/' || pathParts.length === 0) {
          if (globalCfg.homepage && String(globalCfg.homepage).trim()) {
            try {
              const camouflageResp = await fetch(String(globalCfg.homepage).trim(), {
                method: 'GET',
                headers: {
                  'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
                  Accept: request.headers.get('Accept') || '*/*'
                },
                redirect: 'follow'
              });
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
              subNodeCount: globalCfg.subNodeCount || 50,
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
            limit: userObj.subNodeCount
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
              subNodeCount: globalCfg.subNodeCount || 50,
              enabled: true,
              dataLimitGb: 0,
              usedBytes: 0,
              expireAt: 0,
              nodeScope: 'all',
              config: globalCfg
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
          return await handleSubscriptionResponse(request, targetUser, url);
        }

        // ۴-هـ: دسترسی به پنل مدیریت ادمین یا صفحه وضعیت کاربر با /{token}
        const fullCleanPath = normalizeCleanPath(url.pathname);
        if (isAdminAuthorizedPath(fullCleanPath, adminUuid, globalCfg.d)) {
          if (url.searchParams.get('view') === 'status') {
            const adminUser = allUsers[0] || {
              id: 'mili-admin',
              username: BRAND_NAME,
              uuid: adminUuid,
              subNodeCount: globalCfg.subNodeCount || 50,
              enabled: true,
              config: globalCfg
            };
            const nodes = await generateUserNodesList(adminUser, url.hostname, {
              limit: adminUser.subNodeCount
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
            limit: matchedUser.subNodeCount
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
      // محافظ سطح بالا جهت جلوگیری ۱۰۰٪ از بروز خطای Cloudflare Error 1101
      return new Response(
        JSON.stringify({
          status: 'recovered',
          brand: BRAND_NAME,
          message: err?.message || String(err)
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      );
    }
  }
};


export default __MILI_WORKER_EXPORT__;
