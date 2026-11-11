import { connect as cfConnect } from 'cloudflare:sockets';

// --- MODULE: src/config/edgeDomains.js ---
// ============================================================================
// miliconfig - استخر دامنه‌های لبهٔ کلادفلر برای ساب‌لینک اختصاصی «دامنه»
//
// فهرست زیر از لیست ارسالی کاربر ساخته شده و **همهٔ آن‌ها واقعاً پشت کلادفلر
// هستند**: برای هر دامنه رکورد A گرفته شده و با رنج‌های رسمی IPv4 کلادفلر
// (lord-alfred/ipranges) مقایسه شده است. از ۱۲۳۵ دامنهٔ ارسالی، ۵۵۳ دامنه
// تأیید شد؛ بقیه (مثل status.cloudflare.com که رکورد A ندارد، یا سایت‌هایی که
// روی Google/AWS هستند) حذف شدند چون به‌عنوان آدرس نود کار نمی‌کنند.
//
// نقش این دامنه‌ها: فقط «آدرس اتصال» نود است؛ SNI و Host همان دامنهٔ پنل
// (workerHost) می‌ماند، پس هر دامنه‌ای که به anycast کلادفلر برسد معتبر است و
// می‌تواند جای آی‌پی ثابت را بگیرد.
// ============================================================================

const EDGE_DOMAIN_LIST = 'dash.cloudflare.com,time.cloudflare.com,api.cloudflare.com,workers.cloudflare.com,challenges.cloudflare.com,cdnjs.cloudflare.com,www.cloudflare.com,cdnjs.com,cloudflare-dns.com,radar.cloudflare.com,ns.cloudflare.com,community.cloudflare.com,speed.cloudflare.com,blog.cloudflare.com,support.cloudflare.com,developers.cloudflare.com,rpki.cloudflare.com,pages.cloudflare.com,mozilla.cloudflare-dns.com,cloudflareclient.com,cloudflareinsights.com,static.cloudflareinsights.com,dns.cloudflare.com,stun.cloudflare.com,trycloudflare.com,workers.dev,cloudflare.net,warp.cloudflare.com,teams.cloudflare.com,turn.cloudflare.com,r2.cloudflarestorage.com,cloudflarestorage.com,pages.dev,cloudflaressl.com,cloudflare.tv,stream.cloudflare.com,cloudflare-ech.com,cloudflare-quic.com,cloudflare-eth.com,crypto.cloudflare.com,research.cloudflare.com,pq.cloudflareresearch.com,cloudflareportal.com,udemy.com,www.udemy.com,cloudflaresite.com,cloudflaresolutions.com,cloudflarestudio.com,cloudflaresupport.com,www.codecademy.com,about.udemy.com,blog.udemy.com,codecademy.com,www.freecodecamp.org,business.udemy.com,api.udemy.com,teach.udemy.com,courses.edx.org,freecodecamp.org,news.freecodecamp.org,www.digitalocean.com,www.vultr.com,cloud.digitalocean.com,digitalocean.com,status.digitalocean.com,status.vultr.com,my.vultr.com,try.digitalocean.com,docs.digitalocean.com,www.namecheap.com,www.speedtest.net,www.namesilo.com,www.dynadot.com,dynadot.com,namesilo.com,namecheap.com,ap.www.namecheap.com,registry.npmjs.org,npmjs.com,www.npmjs.com,hub.docker.com,yarnpkg.com,www.yarnpkg.com,beta.speedtest.net,gitlab.com,www.gitlab.com,www.canva.com,status.canva.com,docs.gitlab.com,about.canva.com,about.gitlab.com,lichess.org,chess.com,www.chess.com,www.quizlet.com,quizlet.com,status.quizlet.com,help.quizlet.com,support.chess.com,store.epicgames.com,www.epicgames.com,dev.epicgames.com,www.glassdoor.com,indeed.com,modrinth.com,users.nexusmods.com,www.nexusmods.com,www.indeed.com,www.curseforge.com,glassdoor.com,curseforge.com,authors.curseforge.com,help.glassdoor.com,docs.modrinth.com,nexusmods.com,www.modrinth.com,support.curseforge.com,store.ubisoft.com,www.ziprecruiter.com,www.upwork.com,employers.indeed.com,toptal.com,upwork.com,community.upwork.com,www.toptal.com,www.fiverr.com,ziprecruiter.com,workspace.fiverr.com,fiverr.com,status.upwork.com,affiliates.fiverr.com,techcrunch.com,crunchbase.com,www.wired.com,producthunt.com,wellfound.com,angellist.com,www.crunchbase.com,www.producthunt.com,api.producthunt.com,www.techcrunch.com,www.wellfound.com,www.ycombinator.com,cnet.com,www.pcmag.com,gizmodo.com,www.gizmodo.com,pcmag.com,www.pcworld.com,lifehacker.com,www.lifehacker.com,pcworld.com,mashable.com,www.mashable.com,notebookcheck.net,www.notebookcheck.net,forums.macrumors.com,www.androidauthority.com,www.phonearena.com,phonearena.com,androidauthority.com,www.guru3d.com,macrumors.com,www.macrumors.com,kotaku.com,gamespot.com,www.destructoid.com,www.gamespot.com,guru3d.com,www.escapistmagazine.com,destructoid.com,escapistmagazine.com,www.kotaku.com,wccftech.com,www.wccftech.com,www.videocardz.com,videocardz.com,giantbomb.com,metacritic.com,www.giantbomb.com,isthereanydeal.com,www.fanatical.com,gg.deals,www.pcgamingwiki.com,www.metacritic.com,www.humblebundle.com,steamdb.info,humblebundle.com,pcgamingwiki.com,fanatical.com,www.steamdb.info,www.gg.deals,www.isthereanydeal.com,www.coolmathgames.com,poki.com,armorgames.com,crazygames.com,www.crazygames.com,itch.io,gamejolt.com,www.indiegala.com,www.itch.io,www.poki.com,indiegala.com,coolmathgames.com,www.armorgames.com,www.gamejolt.com,www.spigotmc.org,files.minecraftforge.net,www.minecraftforum.net,aternos.org,www.planetminecraft.com,minecraftforum.net,docs.papermc.io,planetminecraft.com,spigotmc.org,www.aternos.org,minecraftforge.net,www.papermc.io,www.minecraftforge.net,papermc.io,exaroton.com,www.exaroton.com,www.hostgator.com,www.bluehost.com,www.hostinger.com,hpanel.hostinger.com,www.bisecthosting.com,hostinger.com,bisecthosting.com,support.hostinger.com,bluehost.com,a2hosting.com,www.apexminecrafthosting.com,www.a2hosting.com,inmotionhosting.com,www.inmotionhosting.com,www.dreamhost.com,www.shockbyte.com,shockbyte.com,scalacube.com,apexminecrafthosting.com,www.scalacube.com,wpengine.com,www.cloudways.com,hostgator.com,greengeeks.com,cloudways.com,kinsta.com,www.greengeeks.com,manage.runcloud.io,ploi.io,getflywheel.com,www.kinsta.com,www.wpengine.com,laravel.com,my.kinsta.com,www.laravel.com,www.ploi.io,forge.laravel.com,platform.cloudways.com,runcloud.io,www.runcloud.io,realpython.com,symfony.com,laracasts.com,cakephp.org,www.laracasts.com,www.codeigniter.com,www.cakephp.org,www.realpython.com,codeigniter.com,www.symfony.com,fastapi.tiangolo.com,laravel-news.com,www.laravel-news.com,nodejs.org,bun.sh,tiangolo.com,www.nodejs.org,www.bun.sh,docs.astro.build,astro.build,www.docusaurus.io,www.remix.run,www.jekyllrb.com,nuxtjs.org,solidjs.com,www.solidjs.com,bulma.io,tailwindcss.com,docusaurus.io,www.tailwindcss.com,getbootstrap.com,www.getbootstrap.com,icons.getbootstrap.com,www.bulma.io,headlessui.com,heroicons.com,tailwindui.com,www.primefaces.org,primefaces.org,ant.design,primereact.org,www.semantic-ui.com,semantic-ui.com,daisyui.com,radix-ui.com,www.radix-ui.com,www.daisyui.com,expo.dev,vuetifyjs.com,ionicframework.com,docs.expo.dev,www.ionicframework.com,www.expo.dev,www.vuetifyjs.com,capacitorjs.com,primevue.org,www.scala-lang.org,scala-lang.org,www.anaconda.com,anaconda.com,openrouter.ai,conda.io,console.mistral.ai,www.mistral.ai,mistral.ai,www.openrouter.ai,www.perplexity.ai,www.replicate.com,replicate.com,console.groq.com,www.jupyter.org,www.leonardo.ai,poe.com,leonardo.ai,www.poe.com,suno.com,midjourney.com,character.ai,perplexity.ai,www.midjourney.com,www.character.ai,www.suno.com,cloud.appwrite.io,appwrite.io,console.neon.tech,neon.tech,www.appwrite.io,www.supabase.com,www.planetscale.com,redis.io,planetscale.com,orm.drizzle.team,www.redis.io,swagger.io,www.postman.com,postman.com,learning.postman.com,www.stoplight.io,hasura.io,typeorm.io,stoplight.io,www.graphql.org,graphql.org,sequelize.org,www.hasura.io,www.typeorm.io,www.sequelize.org,www.gitbook.com,status.algolia.com,www.algolia.com,prometheus.io,gitbook.com,algolia.com,www.readme.com,www.prometheus.io,www.meilisearch.com,meilisearch.com,vendors.paddle.com,umami.is,www.logrocket.com,logrocket.com,www.umami.is,gumroad.com,lemonsqueezy.com,ko-fi.com,patreon.com,www.patreon.com,www.shopify.com,www.ko-fi.com,www.opencart.com,www.gumroad.com,app.gumroad.com,app.lemonsqueezy.com,www.opencollective.com,www.buymeacoffee.com,opencollective.com,www.prestashop.com,buymeacoffee.com,prestashop.com,www.lemonsqueezy.com,medium.com,carrd.co,www.medium.com,substack.com,www.hackernoon.com,opencart.com,www.carrd.co,www.dev.to,hackernoon.com,www.substack.com,themeforest.net,www.tutsplus.com,elements.envato.com,3docean.net,css-tricks.com,creativemarket.com,audiojungle.net,envato.com,graphicriver.net,www.sitepoint.com,photodune.net,videohive.net,tutsplus.com,www.creativemarket.com,codecanyon.net,www.envato.com,www.css-tricks.com,www.fontawesome.com,fontawesome.com,pexels.com,images.pexels.com,lottiefiles.com,www.pexels.com,icons8.com,pixabay.com,www.lottiefiles.com,www.pixabay.com,ka-f.fontawesome.com,www.icons8.com,remove.bg,www.myfonts.com,www.remove.bg,colorhunt.co,myfonts.com,fontspace.com,tabler.io,coolors.co,ilovepdf.com,www.ilovepdf.com,www.fontspace.com,www.coolors.co,www.colorhunt.co,photopea.com,www.sejda.com,www.photopea.com,www.kapwing.com,freeconvert.com,veed.io,www.veed.io,tools.pdf24.org,sejda.com,www.freeconvert.com,kapwing.com,www.pdf24.org,www.tldraw.com,obsidian.md,mindmeister.com,www.draw.io,www.obsidian.md,app.diagrams.net,forum.obsidian.md,whimsical.com,publish.obsidian.md,www.mindmeister.com,draw.io,www.whimsical.com,www.researchgate.net,capacities.io,www.academia.edu,www.remnote.com,apps.ankiweb.net,www.craft.do,remnote.com,www.capacities.io,www.mendeley.com,researchgate.net,www.acm.org,wiley.com,onlinelibrary.wiley.com,www.tandfonline.com,journals.sagepub.com,dl.acm.org,acm.org,www.wiley.com,www.sagepub.com,tandfonline.com,sagepub.com,www.plos.org,plos.org,www.symbolab.com,consensus.app,symbolab.com,elicit.com,www.brilliant.org,www.elicit.com,www.consensus.app,www.skillshare.com,scrimba.com,www.masterclass.com,www.udacity.com,skillshare.com,masterclass.com,brilliant.org,pluralsight.com,www.pluralsight.com,app.pluralsight.com,www.exercism.org,www.datacamp.com,fireship.io,www.fireship.io,app.datacamp.com,www.scrimba.com,exercism.org,codeforces.com,www.codechef.com,www.leetcode.com,www.codesandbox.io,www.codewars.com,codechef.com,leetcode.com,codesandbox.io,codewars.com,replit.com,status.replit.com,www.replit.com,www.codeforces.com,codepen.io,www.codepen.io,railway.app,jsfiddle.net,www.sealos.io,status.railway.app,www.zeabur.com,dash.zeabur.com,www.railway.app,www.jsfiddle.net,www.koyeb.com,deta.space,sealos.io,www.deta.space';

const CF_EDGE_DOMAINS = EDGE_DOMAIN_LIST.split(',').map(item => item.trim()).filter(Boolean);


// --- MODULE: src/config/sources.js ---
// ============================================================================
// miliconfig v3.1 - استخر منابع زنده اسکنر (پروکسی‌های SOCKS5/HTTP، لیست‌های کشوری و رنج‌های IP)
// همه لیست‌ها هر بار به‌صورت زنده خوانده می‌شوند (بدون کش سمت سرور) و اسکنر
// از هر استخر یک برش چرخشی برمی‌دارد تا سقف subrequest کلادفلر رعایت شود.
//
// نکته مهم درباره فهرست فیدها: هر آدرسی که در این فایل می‌ماند باید زنده باشد.
// در بازبینی اکتبر ۲۰۲۶، ۴۸ آدرس از فهرست قبلی (dimzon، residential ها،
// monosans/geolocation، ipverse و بخشی از proxy_vip) ۴۰۴ بودند و حذف شدند؛
// یک فید ۴۰۴ فقط یک subrequest هدر می‌دهد و ممکن است سهم فیدهای سالم را
// از برش چرخشی بگیرد. آدرس‌های جایگزین زنده به فهرست اضافه شده‌اند.
// ============================================================================

const RAW = 'https://raw.githubusercontent.com/';
const raw = path => RAW + path;

// نوع فید:
//   socks5 → همهٔ خطوط پروکسی SOCKS5 هستند
//   http   → همهٔ خطوط پروکسی HTTP/HTTPS هستند
//   mixed  → هر دو نوع (یا نامشخص)؛ اسکنر خودش پروتکل را با handshake تشخیص می‌دهد
//   any    → فید ترکیبی بدون پروتکل مشخص
const PROXY_FEED_TYPES = ['socks5', 'http', 'mixed', 'any'];

// ---------------------------------------------------------------------------
// فیدهای عمومی SOCKS5 — همه در اکتبر ۲۰۲۶ پاسخ ۲۰۰ داده‌اند
// ---------------------------------------------------------------------------
const SOCKS5_FEEDS = [
  'monosans/proxy-list/main/proxies/socks5.txt',
  'rdavydov/proxy-list/main/proxies/socks5.txt',
  'rdavydov/proxy-list/main/proxies_anonymous/socks5.txt',
  'rdavydov/proxy-list/main/proxies_geolocation/socks5.txt',
  'rdavydov/proxy-list/main/proxies_geolocation_anonymous/socks5.txt',
  'zloi-user/hideip.me/main/socks5.txt',
  'vakhov/fresh-proxy-list/master/socks5.txt',
  'hookzof/socks5_list/master/proxy.txt',
  'MuRongPIG/Proxy-Master/main/socks5.txt',
  'Noctiro/getproxy/master/file/socks5.txt',
  'Noctiro/getproxy/master/file/socks5_with_protocol.txt',
  'roosterkid/openproxylist/main/SOCKS5_RAW.txt',
  'roosterkid/openproxylist/main/SOCKS5.txt',
  'sunny9577/proxy-scraper/master/generated/socks5_proxies.txt',
  'trio666/proxy-checker/main/socks5.txt',
  'TheSpeedX/SOCKS-List/master/socks5.txt',
  'proxifly/free-proxy-list/main/proxies/protocols/socks5/data.txt',
  'ProxyScrape/free-proxy-list/main/proxies/protocols/socks5/data.txt',
  'ikimono-afk/proxy-api/main/proxies/socks5.txt',
  'ikimono-afk/proxy-api/main/proxies_anonymous/socks5.txt',
  'ikimono-afk/proxy-api/main/proxies_geolocation/socks5.txt',
  'ikimono-afk/proxy-api/main/proxies_geolocation_anonymous/socks5.txt',
  'ProxyScraper/ProxyScraper/main/socks5.txt',
  'r00tee/Proxy-List/main/Socks5.txt',
  'jetkai/proxy-list/main/archive/txt/proxies-socks5.txt',
  'iplocate/free-proxy-list/main/protocols/socks5.txt',
  'officialputuid/KangProxy/main/socks5/socks5.txt',
  'karimi-mohammad/SOCKS5-Proxy-Checker/main/socks5.txt',
  'FosterG4/proxy-list/main/socks5.txt',
  'yosephplex/proxy-updater/main/proxies/socks5.txt',
  'readloud/clauneck/main/PROXY-List/socks5.txt',
  'ItzRazvyy/ProxyList/main/socks5.txt',
  'i-am-unbekannt/BLITZPROXY/main/out-files/socks5.txt',
  'ProxyListt/PROXY-list/main/socks5.txt',
  'Daniel3356/Proxy_Full-list/main/socks5.txt',
  'proxygenerator1/ProxyGenerator/main/MostStable/socks5.txt',
  'proxygenerator1/ProxyGenerator/main/Stable/socks5.txt',
  'proxmint/free-proxy-list/main/proxies/socks5.txt',
  'Thordata/awesome-free-proxy-list/main/proxies/socks5.txt',
  'ClearProxy/checked-proxy-list/main/socks5/raw/all.txt',
  'VPSLabCloud/VPSLab-Free-Proxy-List/main/socks5_all.txt',
  'komutan234/Proxy-List-Free/main/proxies/socks5.txt',
  'ALIILAPRO/Proxy/main/socks5.txt'
];

// ---------------------------------------------------------------------------
// فیدهای عمومی HTTP / HTTPS — همه پاسخ ۲۰۰
// ---------------------------------------------------------------------------
const HTTP_FEEDS = [
  'monosans/proxy-list/main/proxies/http.txt',
  'rdavydov/proxy-list/main/proxies/http.txt',
  'rdavydov/proxy-list/main/proxies_anonymous/http.txt',
  'rdavydov/proxy-list/main/proxies_geolocation/http.txt',
  'rdavydov/proxy-list/main/proxies_geolocation_anonymous/http.txt',
  'zloi-user/hideip.me/main/http.txt',
  'zloi-user/hideip.me/main/https.txt',
  'vakhov/fresh-proxy-list/master/http.txt',
  'vakhov/fresh-proxy-list/master/https.txt',
  'Vadim287/free-proxy/main/proxies/http.txt',
  'MuRongPIG/Proxy-Master/main/http.txt',
  'Noctiro/getproxy/master/file/http.txt',
  'Noctiro/getproxy/master/file/https.txt',
  'Noctiro/getproxy/master/file/http_with_protocol.txt',
  'Noctiro/getproxy/master/file/https_with_protocol.txt',
  'roosterkid/openproxylist/main/HTTPS_RAW.txt',
  'roosterkid/openproxylist/main/HTTPS.txt',
  'sunny9577/proxy-scraper/master/generated/http_proxies.txt',
  'trio666/proxy-checker/main/http.txt',
  'trio666/proxy-checker/main/https.txt',
  'TheSpeedX/PROXY-List/master/http.txt',
  'proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
  'proxifly/free-proxy-list/main/proxies/protocols/https/data.txt',
  'ProxyScrape/free-proxy-list/main/proxies/protocols/http/data.txt',
  'ikimono-afk/proxy-api/main/proxies/http.txt',
  'ikimono-afk/proxy-api/main/proxies_anonymous/http.txt',
  'ikimono-afk/proxy-api/main/proxies_geolocation/http.txt',
  'ikimono-afk/proxy-api/main/proxies_geolocation_anonymous/http.txt',
  'ProxyScraper/ProxyScraper/main/http.txt',
  'r00tee/Proxy-List/main/Https.txt',
  'jetkai/proxy-list/main/archive/txt/proxies-http.txt',
  'jetkai/proxy-list/main/archive/txt/proxies-https.txt',
  'iplocate/free-proxy-list/main/protocols/http.txt',
  'iplocate/free-proxy-list/main/protocols/https.txt',
  'officialputuid/KangProxy/main/http/http.txt',
  'officialputuid/KangProxy/main/https/https.txt',
  'elliottophellia/yakumo/master/results/http/global/http_checked.txt',
  'Zaeem20/FREE_PROXIES_LIST/master/http.txt',
  'Zaeem20/FREE_PROXIES_LIST/master/https.txt',
  'Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
  'Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
  'dpangestuw/Free-Proxy/main/http_proxies.txt',
  'Tsprnay/Proxy-lists/master/proxies/http.txt',
  'Tsprnay/Proxy-lists/master/proxies/https.txt',
  'mzyui/proxy-list/main/http.txt',
  'ErcinDedeoglu/proxies/main/proxies/http.txt',
  'ErcinDedeoglu/proxies/main/proxies/https.txt',
  'ALIILAPRO/Proxy/main/http.txt',
  'Skillter/ProxyGather/master/proxies/working-proxies-http.txt',
  'SevenworksDev/proxy-list/main/proxies/http.txt',
  'SevenworksDev/proxy-list/main/proxies/https.txt',
  'Vann-Dev/proxy-list/main/proxies/http.txt',
  'Vann-Dev/proxy-list/main/proxies/https.txt',
  'TuanMinPay/live-proxy/master/http.txt',
  'vmheaven/VMHeaven-Free-Proxy-Updated/main/http.txt',
  'vmheaven/VMHeaven-Free-Proxy-Updated/main/https.txt',
  'yosephplex/proxy-updater/main/proxies/http.txt',
  'readloud/clauneck/main/PROXY-List/http.txt',
  'ItzRazvyy/ProxyList/main/http.txt',
  'i-am-unbekannt/BLITZPROXY/main/out-files/http.txt',
  'ProxyListt/PROXY-list/main/http.txt',
  'Daniel3356/Proxy_Full-list/main/http.txt',
  'proxygenerator1/ProxyGenerator/main/MostStable/http.txt',
  'proxygenerator1/ProxyGenerator/main/Stable/http.txt',
  'proxmint/free-proxy-list/main/proxies/http.txt',
  'Thordata/awesome-free-proxy-list/main/proxies/http.txt',
  'ClearProxy/checked-proxy-list/main/http/raw/all.txt',
  'VPSLabCloud/VPSLab-Free-Proxy-List/main/http_all.txt',
  'komutan234/Proxy-List-Free/main/proxies/http.txt'
];

// ---------------------------------------------------------------------------
// فیدهای ترکیبی (هر دو پروتکل در یک فایل) — پروتکل هنگام تست handshake مشخص می‌شود
// ---------------------------------------------------------------------------
const MIXED_FEEDS = [
  'proxygenerator1/ProxyGenerator/main/MostStable/ALL.txt',
  'proxygenerator1/ProxyGenerator/main/Stable/ALL.txt'
];

// ---------------------------------------------------------------------------
// فیدهای با بازده بالا — در سنجش واقعی اکتبر ۲۰۲۶ (handshake کامل SOCKS5/HTTP)
// بیشترین نرخ اتصال را داشتند. اسکنر اول از این‌ها برمی‌دارد و بعد از بقیه.
// ---------------------------------------------------------------------------
const HIGH_YIELD_PROXY_SOURCES = [
  'zloi-user/hideip.me/main/socks5.txt',
  'iplocate/free-proxy-list/main/protocols/socks5.txt',
  'ProxyScrape/free-proxy-list/main/proxies/protocols/socks5/data.txt',
  'monosans/proxy-list/main/proxies/socks5.txt',
  'proxygenerator1/ProxyGenerator/main/MostStable/ALL.txt',
  'proxygenerator1/ProxyGenerator/main/Stable/ALL.txt',
  'vmheaven/VMHeaven-Free-Proxy-Updated/main/http.txt',
  'iplocate/free-proxy-list/main/protocols/http.txt',
  'ProxyScrape/free-proxy-list/main/proxies/protocols/http/data.txt',
  'proxygenerator1/ProxyGenerator/main/MostStable/http.txt',
  'monosans/proxy-list/main/proxies/http.txt',
  'zloi-user/hideip.me/main/http.txt'
].map(raw);

// ---------------------------------------------------------------------------
// فیدهای کشوری
// ---------------------------------------------------------------------------
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

// ============================================================================
// منبع عمومی لبهٔ کلادفلر: دامنه، IPv4، IPv6 و پروکسی کشوری
// ساختار: ips.txt (IPv4 بهینه)، ip6.txt (IPv6 بهینه)، dom.txt (دامنه‌های لبه)،
// ech_dom.txt (دامنه‌های دارای ECH)، proxy/<CC>.txt (پروکسی هر کشور) و
// proxy_vip/<CC>.txt (پروکسی VIP هر کشور، فهرستش در vip-list).
// ============================================================================
const EDGE_MIRROR_BASE = 'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/';

const EDGE_MIRROR_SOURCES = {
  ipv4: EDGE_MIRROR_BASE + 'ips.txt',
  ipv6: EDGE_MIRROR_BASE + 'ip6.txt',
  domains: EDGE_MIRROR_BASE + 'dom.txt',
  echDomains: EDGE_MIRROR_BASE + 'ech_dom.txt',
  echDns: EDGE_MIRROR_BASE + 'ech_dns.txt',
  proxyAll: EDGE_MIRROR_BASE + 'proxy/ALL.txt',
  vipIndex: EDGE_MIRROR_BASE + 'vip-list',
  proxyCountry: code => EDGE_MIRROR_BASE + `proxy/${String(code).toUpperCase()}.txt`,
  vipCountry: code => EDGE_MIRROR_BASE + `proxy_vip/${String(code).toUpperCase()}.txt`
};

// فقط این کشورها فایل proxy_vip دارند (بقیه ۴۰۴ هستند)
const EDGE_VIP_COUNTRIES = [
  'AD', 'AL', 'CA', 'DE', 'FI', 'FR', 'GB', 'IT', 'MC', 'MX',
  'NL', 'NO', 'RO', 'SE', 'TH', 'TR', 'US'
];
const vipFeed = code => raw(`panel-zeus/Z-E-U-S/main/proxy_vip/${code}.txt`);
const proxyFeed = code => raw(`panel-zeus/Z-E-U-S/main/proxy/${code}.txt`);

// کدام کشورها در کدام قالب کشوری فایل دارند (بازبینی اکتبر ۲۰۲۶).
// برای کشورهای غایب، ساختن آدرس فقط یک ۴۰۴ و یک subrequest هدر است.
const COUNTRY_FEED_AVAILABILITY = {
  clearSocks: new Set('CA DE GB IT NL US FR FI SG RU CN KR VN IN'.split(' ')),
  clearHttp: new Set('DE GB NL TH TR US UZ FR RU SG CN KR VN BR IN'.split(' ')),
  scrapeSocks: new Set('AE CA DE GB IT LV NL SE TH US FR FI RU SG CN KR VN UA IN BR'.split(' ')),
  scrapeHttp: new Set('AE BG CA DE GB IT KZ NL TH SE US TR UZ FI FR RU SG CH CN KR UA VN BR IN'.split(' ')),
  trioSocks: new Set('AE BG CA DE GB IT NL SE TH US FI FR SG RU CN KR CH VN UA BR IN RS SK'.split(' ')),
  trioHttp: new Set('AE CA GB DE IT KZ NL NO SE TH TR US UZ FI FR RU SG CN CH KR UA VN BR IN RS'.split(' '))
};

// منابع کشوری هر کد کشور: هر کد از چند مخزن مستقل تغذیه می‌شود تا ۴۰۴ شدن یک
// مخزن باعث خالی شدن اسکن آن کشور نشود.
function buildCountryFeeds(code) {
  const cc = String(code || '').toUpperCase();
  if (!COUNTRY_META[cc]) return [];
  const lower = cc.toLowerCase();
  const available = COUNTRY_FEED_AVAILABILITY;
  const feeds = [
    raw(`proxifly/free-proxy-list/main/proxies/countries/${cc}/data.txt`)
  ];
  if (available.scrapeSocks.has(cc)) feeds.push(raw(`ProxyScrape/free-proxy-list/main/proxies/countries/${lower}/socks5/data.txt`));
  if (available.scrapeHttp.has(cc)) feeds.push(raw(`ProxyScrape/free-proxy-list/main/proxies/countries/${lower}/http/data.txt`));
  if (available.clearSocks.has(cc)) feeds.push(raw(`ClearProxy/checked-proxy-list/main/socks5/raw/country/${cc}.txt`));
  if (available.clearHttp.has(cc)) feeds.push(raw(`ClearProxy/checked-proxy-list/main/http/raw/country/${cc}.txt`));
  if (available.trioSocks.has(cc)) feeds.push(raw(`trio666/proxy-checker/main/country/${cc}/socks5.txt`));
  if (available.trioHttp.has(cc)) feeds.push(raw(`trio666/proxy-checker/main/country/${cc}/http.txt`));
  // پروکسی‌های VIP و معمولی همان کشور اولویت دارند
  if (EDGE_VIP_COUNTRIES.includes(cc)) feeds.unshift(vipFeed(cc));
  feeds.unshift(proxyFeed(cc));
  return feeds;
}

const COUNTRY_EXTRA_PROXY_SOURCES = (() => {
  const map = {};
  for (const code of Object.keys(COUNTRY_META)) map[code] = buildCountryFeeds(code);
  return map;
})();

// فیدهایی که خودشان آدرس کامل هستند (GitHub Pages) و با raw() ساخته نمی‌شوند
const ABSOLUTE_FEEDS = [
  { url: 'https://sunny9577.github.io/proxy-scraper/generated/socks5_proxies.txt', kind: 'socks5' },
  { url: 'https://sunny9577.github.io/proxy-scraper/generated/http_proxies.txt', kind: 'http' }
];

// ---------------------------------------------------------------------------
// لیست‌های عمومی
// ---------------------------------------------------------------------------
const GLOBAL_SOCKS5_SOURCES = [
  ...SOCKS5_FEEDS.map(raw),
  ...ABSOLUTE_FEEDS.filter(feed => feed.kind === 'socks5').map(feed => feed.url)
];
const GLOBAL_HTTP_SOURCES = [
  ...HTTP_FEEDS.map(raw),
  ...ABSOLUTE_FEEDS.filter(feed => feed.kind === 'http').map(feed => feed.url)
];
const GLOBAL_MIXED_SOURCES = MIXED_FEEDS.map(raw);

// فید عمومی residential در حال حاضر هیچ منبع زنده‌ای ندارد؛ به‌جای نگه‌داشتن
// آدرس‌های ۴۰۴ این فهرست خالی است تا subrequest هدر نرود.
const RESIDENTIAL_SOURCES = [];

// ---------------------------------------------------------------------------
// رجیستری یکپارچه فیدها — همین فهرست در /api/scanner/sources هم برگردانده می‌شود
// ---------------------------------------------------------------------------
const PROXY_FEED_REGISTRY = [
  ...SOCKS5_FEEDS.map(path => ({ url: raw(path), kind: 'socks5', scope: 'global' })),
  ...HTTP_FEEDS.map(path => ({ url: raw(path), kind: 'http', scope: 'global' })),
  ...MIXED_FEEDS.map(path => ({ url: raw(path), kind: 'mixed', scope: 'global' })),
  ...ABSOLUTE_FEEDS.map(feed => ({ url: feed.url, kind: feed.kind, scope: 'global' })),
  ...Object.keys(COUNTRY_META).flatMap(code =>
    buildCountryFeeds(code).map(url => ({
      url,
      kind: guessFeedKind(url),
      scope: 'country',
      country: code
    }))
  )
];

// نوع فید از روی مسیر فایل تشخیص داده می‌شود، نه کل آدرس؛ در غیر این صورت
// خود «https://» باعث می‌شود همه چیز http شناسایی شود.
function guessFeedKind(url) {
  const path = String(url || '').toLowerCase().replace(/^https?:\/\//, '');
  if (/socks/.test(path)) return 'socks5';
  if (/https?/.test(path)) return 'http';
  return 'mixed';
}

const FEED_KIND_BY_URL = new Map(PROXY_FEED_REGISTRY.map(feed => [feed.url, feed.kind]));

// نوع اعلام‌شدهٔ یک فید (برای انتخاب پارسر و پورت پیش‌فرض)
function getFeedKind(url) {
  return FEED_KIND_BY_URL.get(url) || guessFeedKind(url);
}

// ---------------------------------------------------------------------------
// آی‌پی‌ها
// ---------------------------------------------------------------------------
// لیست آی‌پی/دامنه ثابت کلادفلر (هر خط یک آدرس) — نمونه‌گیری زنده برای yx
// دو منبع آخر (IPDB) از پروژه‌های چینی «بهترین آی‌پی کلادفلر» هستند که به‌صورت
// خودکار هر چند ساعت به‌روز می‌شوند و آی‌پی‌های واقعاً سالم را نگه می‌دارند؛
// همین باعث می‌شود تب چندلوکیشن بدون یک بار اسکن هم آی‌پی تازه داشته باشد.
const IP_CANDIDATE_SOURCES = [
  'https://bestcf.pages.dev/vps789/top10.txt',
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/ips.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/bestcf.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestCF/bestcfv4.txt'
];

// آی‌پی‌های IPv6 بهینهٔ کلادفلر (منبع چینی خودبه‌روز)
const IPV6_CANDIDATE_SOURCES = [
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/ip6.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestCF/bestcfv6.txt'
];

// دامنه‌های لبهٔ کلادفلر (برای نودهای دامنه‌محور و SNI جایگزین)
// dom.txt (دامنه‌های سالم) و ech_dom.txt (دامنه‌های دارای ECH) + فهرست آنلاین bestip
const EDGE_DOMAIN_BASE = 'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/';
const DOMAIN_CANDIDATE_SOURCES = [
  EDGE_DOMAIN_BASE + 'dom.txt',
  EDGE_DOMAIN_BASE + 'ech_dom.txt',
  'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt'
];

// Proxy-IP های آمادهٔ عبور از کلادفلر (BPB-style) — لیست خودبه‌روز
const PROXY_IP_SOURCES = [
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestProxy/bestproxy.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestProxy/bestproxy&country.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/proxy.txt',
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy/ALL.txt'
];

// ============================================================================
// منابع ترجیحی داخلی لبهٔ کلادفلر، برای وقتی که هیچ تنظیمی نشده است
// ============================================================================

// ۲۱ دامنهٔ ترجیحی تأییدشده (همان 直连域名列表 cfnew)
const PREFERRED_EDGE_DOMAINS = [
  'cloudflare.182682.xyz',
  'speed.marisalnc.com',
  'freeyx.cloudflare88.eu.org',
  'bestcf.top',
  'cdn.2020111.xyz',
  'cfip.cfcdn.vip',
  'cf.0sm.com',
  'cf.090227.xyz',
  'cf.zhetengsha.eu.org',
  'cloudflare.9jy.cc',
  'cf.zerone-cdn.pp.ua',
  'cfip.1323123.xyz',
  'cnamefuckxxs.yuchen.icu',
  'cloudflare-ip.mofashi.ltd',
  '115155.xyz',
  'cname.xirancdn.us',
  'f3058171cad.002404.xyz',
  '8.889288.xyz',
  'cdn.tzpro.xyz',
  'cf.877771.xyz',
  'xn--b6gac.eu.org'
];

// ۱۰ آی‌پی «اتصال رسمی» (هر کدام در یک /24 متفاوت)
const DIRECT_EDGE_IPS = [
  '172.71.218.190',
  '162.158.228.87',
  '162.158.189.134',
  '162.158.26.63',
  '162.158.25.86',
  '162.158.29.216',
  '162.158.218.160',
  '162.158.227.214',
  '172.69.118.198',
  '172.69.119.150'
];

// ProxyIP های آماده — خروجی از منطقهٔ دلخواه
const EDGE_PROXY_IPS = [
  { domain: 'ProxyIP.HK.CMLiussss.net', region: 'HK' },
  { domain: 'ProxyIP.US.CMLiussss.net', region: 'US' },
  { domain: 'ProxyIP.SG.CMLiussss.net', region: 'SG' },
  { domain: 'ProxyIP.JP.CMLiussss.net', region: 'JP' },
  { domain: 'ProxyIP.KR.CMLiussss.net', region: 'KR' },
  { domain: 'ProxyIP.DE.CMLiussss.net', region: 'DE' },
  { domain: 'ProxyIP.SE.CMLiussss.net', region: 'SE' },
  { domain: 'ProxyIP.NL.CMLiussss.net', region: 'NL' },
  { domain: 'ProxyIP.FI.CMLiussss.net', region: 'FI' },
  { domain: 'ProxyIP.GB.CMLiussss.net', region: 'GB' },
  { domain: 'ProxyIP.Oracle.cmliussss.net', region: 'Oracle' },
  { domain: 'ProxyIP.DigitalOcean.CMLiussss.net', region: 'DigitalOcean' },
  { domain: 'ProxyIP.Vultr.CMLiussss.net', region: 'Vultr' },
  { domain: 'ProxyIP.Multacom.CMLiussss.net', region: 'Multacom' },
  // مجموعهٔ جهانی (انتخاب خودکار سالم‌ترین لبه)
  { domain: 'ProxyIP.CMLiussss.net', region: 'Global' },
  { domain: 'ProxyIP.FR.CMLiussss.net', region: 'FR' },
  // دامنه‌های جایگزین پروژه‌های شناخته‌شده (وقتی CMLiussss کند/کپچا شد)
  { domain: 'bpb.yousef.isegaro.com', region: 'BPB' },
  { domain: 'di.nscl.ir', region: 'Multi' },
  { domain: 'tr.diam4.ggff.net', region: 'Multi' },
  { domain: 'proxy.zjcloud.us.ci', region: 'Multi' },
  { domain: 'pyip.ygkkk.dpdns.org', region: 'Multi' },
  { domain: 'proxyip.leilaomi.cc.cd', region: 'Multi' },
  { domain: 'proxy.farel.is-a.dev', region: 'Multi' },
  { domain: 'proxyip.vultr.fxxk.dedyn.io', region: 'Vultr' },
  { domain: 'proxyip.digitalocean.hw.090227.xyz', region: 'DigitalOcean' },
  { domain: 'proxyip.aliyun.hw.090227.xyz', region: 'SG' },
  { domain: 'proxyip.oracle.fxxk.dedyn.io', region: 'Oracle' },
  { domain: 'cdn-all.xn--b6gac.eu.org', region: 'Multi' }
];

// فهرست آنلاین دامنه/آی‌پی ترجیحی
const EDGE_LIST_URL = 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
const EDGE_REMOTE_CONFIG_URL = 'https://raw.githubusercontent.com/byJoey/test/refs/heads/main/tist.ini';

// ============================================================================
// منابع دقیقاً همان‌هایی که موتور cfnew از آن‌ها تغذیه می‌کند
// (cfnew: 获取值地址列表 از youuin + 直连域名列表 + 备用 ProxyIP + ips/ip6 مخزن)
// اسکنر پنل هم فقط از همین مخازن می‌خواند تا خروجی با موتور cfnew یکی باشد.
// ============================================================================
const CFNEW_IPV4_SOURCES = [
  // مخزن رسمی cfnew (byJoey/cfnew): فهرست ۱۰ آی‌پی برتر که خود cfnew می‌خواند
  'https://bestcf.pages.dev/vps789/top10.txt',
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/ips.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/bestcf.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestCF/bestcfv4.txt'
];

const CFNEW_IPV6_SOURCES = [
  'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/ip6.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestCF/bestcfv6.txt'
];

// دامنه‌های 直连 همان cfnew (فهرست محلی ۲۱تایی + فهرست زندهٔ مخزن)
const CFNEW_DOMAIN_SOURCES = [
  EDGE_MIRROR_BASE + 'dom.txt',
  EDGE_MIRROR_BASE + 'ech_dom.txt'
];

// ProxyIP های آماده (备用地址 cfnew + فیدهای VIP خود Z-E-U-S)
const CFNEW_PROXYIP_SOURCES = [
  EDGE_MIRROR_BASE + 'proxy/ALL.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestProxy/bestproxy.txt',
  'https://raw.githubusercontent.com/ymyuuu/IPDB/main/BestProxy/bestproxy&country.txt'
];

// گروه‌های اپراتوری cfnew (移动/联通/电信/多线/IPv6) از سرویس youuin
const CFNEW_ISP_GROUPS = {
  cmcc: { code: 'cmcc', label: '移动', family: 'ipv4', isp: 'ispMobile' },
  cucc: { code: 'cucc', label: '联通', family: 'ipv4', isp: 'ispUnicom' },
  ctcc: { code: 'ctcc', label: '电信', family: 'ipv4', isp: 'ispTelecom' },
  bgp: { code: 'bgp', label: '多线', family: 'ipv4', isp: '' },
  ipv6: { code: 'ipv6', label: 'IPv6', family: 'ipv6', isp: '' }
};
const CFNEW_API_URL = 'https://api.youuin.com/index.php/index/Cloudflare';
const CFNEW_API_SECRET = 'DdlTxtN0sUOu';
const CFNEW_API_KEY_SALT = '70cloudflareapikey';

// رنج‌های IPv4/IPv6 کلادفلر و سایر ارائه‌دهندگان (همه ۲۰۰ در بازبینی)
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
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/digitalocean/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/linode/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/vultr/ipv6.txt',
    'https://raw.githubusercontent.com/lord-alfred/ipranges/main/amazon/ipv6.txt',
    'https://raw.githubusercontent.com/mrkhachaturov/ipranges/main/all/ipv6.txt',
    'https://raw.githubusercontent.com/dibdot/DoH-IP-blocklists/master/doh-ipv6.txt',
    'https://raw.githubusercontent.com/oneoffdallas/dohservers/master/ipv6list.txt'
  ]
};

// ============================================================================
// WARP (Cloudflare WireGuard) — ثابت‌های رسمی و نقاط پایانی شناخته‌شده
// ============================================================================

// سرویس ثبت‌نام دستگاه WARP (عمومی و بدون احراز هویت) — برای دریافت reserved و آدرس تونل
const WARP_REGISTRATION_URL = 'https://api.cloudflareclient.com/v0a2158/reg';
const WARP_CLIENT_VERSION = 'a-6.30-2158';

// کلید عمومی همتا (پیش‌فرض کلادفلر) — از پاسخ همان سرویس ثبت‌نام
const WARP_PEER_PUBLIC_KEY = 'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=';
const WARP_DEFAULT_HOST = 'engage.cloudflareclient.com';
const WARP_DEFAULT_PORT = 2408;
const WARP_DEFAULT_ADDRESS = '172.16.0.2';

// پورت‌های رسمی WARP (به ترتیب اولویت)
const WARP_ENDPOINT_PORTS = [2408, 500, 1701, 4500];

// رنج‌های رسمی ingress کلادفلر — چندلوکیشن با همین نقاط پایانی ساخته می‌شود
const WARP_ENDPOINT_IPS = [
  '162.159.192.1',
  '162.159.193.1',
  '162.159.195.1',
  '162.159.204.1',
  '188.114.96.1',
  '188.114.97.1',
  '188.114.98.1',
  '188.114.99.1',
  '2606:4700:d0::a29f:c001',
  '2606:4700:d1::a29f:c001'
];

// ============================================================================
// OpenVPN — منابع زندهٔ پروفایل عمومی
// ۱) مخزن گیت‌هاب با پروفایل‌های ‎.ovpn‎ به‌صورت فایل مستقل (از داخل ورکر قابل خواندن است)
// ۲) لیست CSV ونگیت (در برخی شبکه‌های خروجی کلادفلر مسدود است؛ فقط به‌عنوان پشتیبان)
// ============================================================================

const AUTO_OVPN = file => `https://raw.githubusercontent.com/9xN/auto-ovpn/main/configs/${file}`;

// فقط فایل‌هایی که واقعاً در مخزن موجودند (بقیه 404 می‌شدند و کل لیست را خالی می‌کردند)
const OPENVPN_RAW_PROFILE_SOURCES = [
  AUTO_OVPN('server_0_JP.ovpn'),
  AUTO_OVPN('server_92_US.ovpn'),
  AUTO_OVPN('server_81_AT.ovpn'),
  AUTO_OVPN('server_66_AR.ovpn'),
  AUTO_OVPN('server_70_LA.ovpn'),
  AUTO_OVPN('server_42_VN.ovpn'),
  AUTO_OVPN('server_36_TH.ovpn'),
  AUTO_OVPN('server_50_TH.ovpn'),
  AUTO_OVPN('server_69_TH.ovpn'),
  AUTO_OVPN('server_20_RU.ovpn'),
  AUTO_OVPN('server_83_RU.ovpn'),
  AUTO_OVPN('server_14_KR.ovpn')
];

const OPENVPN_CSV_SOURCES = [
  'https://www.vpngate.net/api/iphone/'
];

// نام قدیمی برای سازگاری
const OPENVPN_PROFILE_SOURCES = OPENVPN_RAW_PROFILE_SOURCES;

// کاربر/رمز عمومی سرورهای VPNGate
const OPENVPN_PUBLIC_USER = 'vpn';
const OPENVPN_PUBLIC_PASS = 'vpn';


// --- MODULE: src/config/ipPool.js ---
// ============================================================================
// استخر آی‌پی اختصاصی miliconfig — 696 آی‌پی در 21 کشور
// هر خط: آی‌پی|کد کشور (دادهٔ ثابت و قابل ویرایش؛ همین فایل منبع سابِ /ips است)
// کشورها با نمونه‌گیری جغرافیایی هنگام ساخت فهرست تعیین شده‌اند.
// ============================================================================

const IP_POOL_RAW = `
3.29.240.49|AE
45.82.13.135|AL
85.192.42.198|AT
201.10.80.72|BR
194.124.251.104|CH
43.169.18.179|CN
43.169.19.179|CN
104.105.9.100|DE
104.152.49.87|DE
104.194.156.84|DE
104.194.158.111|DE
104.194.159.48|DE
104.207.130.92|DE
104.238.177.144|DE
108.165.236.229|DE
108.165.236.90|DE
109.120.138.102|DE
109.120.140.190|DE
109.122.197.126|DE
109.122.197.198|DE
109.230.230.38|DE
109.69.58.188|DE
113.30.190.30|DE
113.30.191.181|DE
116.202.132.205|DE
116.203.58.165|DE
128.140.73.159|DE
130.162.245.249|DE
130.17.10.101|DE
130.17.10.20|DE
130.17.10.230|DE
130.17.13.244|DE
130.17.20.158|DE
130.17.4.60|DE
130.61.129.162|DE
130.61.15.72|DE
130.61.187.66|DE
130.61.38.70|DE
130.61.48.18|DE
130.61.71.239|DE
132.145.232.171|DE
132.226.197.103|DE
132.226.199.170|DE
134.122.90.61|DE
134.255.247.200|DE
135.125.228.64|DE
136.244.94.142|DE
138.124.10.45|DE
138.124.228.38|DE
138.124.229.46|DE
138.124.230.140|DE
138.124.230.248|DE
138.124.231.159|DE
138.124.28.6|DE
138.124.28.78|DE
138.124.37.47|DE
138.124.50.24|DE
138.124.53.254|DE
138.124.54.59|DE
138.124.61.184|DE
138.124.61.26|DE
138.124.93.120|DE
138.124.93.139|DE
138.197.183.219|DE
138.199.147.113|DE
138.199.175.118|DE
138.249.8.78|DE
138.3.254.178|DE
139.59.145.120|DE
141.147.31.174|DE
143.20.160.17|DE
144.31.106.137|DE
144.31.151.191|DE
144.31.189.131|DE
144.31.217.95|DE
144.31.218.65|DE
145.63.131.82|DE
150.230.155.135|DE
150.241.115.111|DE
150.241.123.99|DE
150.241.66.68|DE
151.243.224.120|DE
152.53.198.229|DE
152.53.229.84|DE
155.117.234.52|DE
159.100.18.123|DE
162.19.247.245|DE
164.90.226.9|DE
167.17.176.36|DE
167.235.69.166|DE
167.71.45.93|DE
172.238.108.163|DE
172.86.95.236|DE
178.105.227.210|DE
178.17.48.78|DE
178.83.45.206|DE
185.100.159.129|DE
185.14.92.80|DE
185.209.82.152|DE
185.233.81.147|DE
185.233.81.207|DE
185.242.113.117|DE
185.242.113.75|DE
185.66.165.51|DE
185.94.166.8|DE
188.245.161.141|DE
192.124.182.154|DE
193.111.248.107|DE
193.168.201.18|DE
193.233.86.136|DE
194.154.30.254|DE
194.37.80.244|DE
194.58.33.218|DE
194.62.122.155|DE
194.87.189.102|DE
194.87.55.106|DE
194.87.71.141|DE
195.133.193.94|DE
195.133.65.232|DE
195.201.150.4|DE
195.248.240.132|DE
195.58.38.9|DE
2.26.21.163|DE
2.26.21.246|DE
2.26.26.33|DE
2.26.60.27|DE
204.11.2.93|DE
206.189.250.156|DE
207.244.199.221|DE
212.113.104.94|DE
213.165.53.118|DE
217.144.187.155|DE
217.154.237.115|DE
3.122.253.145|DE
3.126.76.108|DE
3.76.138.151|DE
31.172.70.20|DE
31.25.239.66|DE
31.76.100.103|DE
31.76.12.201|DE
31.77.193.128|DE
31.77.219.101|DE
31.77.219.64|DE
31.77.223.15|DE
37.1.195.124|DE
37.1.198.23|DE
37.220.82.145|DE
38.180.165.83|DE
38.180.166.150|DE
38.180.219.131|DE
43.170.58.62|DE
45.138.72.141|DE
45.150.32.112|DE
46.224.214.34|DE
46.225.149.10|DE
46.249.102.151|DE
46.249.99.199|DE
46.38.250.225|DE
47.245.131.215|DE
49.13.228.85|DE
5.104.75.231|DE
5.180.82.38|DE
5.75.182.89|DE
57.129.62.51|DE
63.176.161.135|DE
64.188.118.5|DE
64.188.118.69|DE
64.188.79.189|DE
64.188.83.202|DE
64.226.111.98|DE
64.226.93.71|DE
66.151.43.102|DE
66.151.43.131|DE
68.183.77.241|DE
72.56.106.210|DE
72.56.31.206|DE
77.239.104.229|DE
77.239.98.122|DE
77.239.99.29|DE
78.47.150.18|DE
79.132.136.161|DE
79.132.138.87|DE
8.209.83.19|DE
8.211.36.136|DE
80.240.22.234|DE
81.200.156.219|DE
82.117.245.166|DE
82.165.20.186|DE
82.21.117.137|DE
82.21.117.93|DE
82.21.150.7|DE
82.23.177.177|DE
82.26.150.163|DE
83.219.249.189|DE
85.121.53.39|DE
85.190.107.238|DE
85.208.139.48|DE
85.234.100.221|DE
85.234.100.68|DE
86.53.110.15|DE
86.53.110.160|DE
87.106.198.216|DE
87.120.126.127|DE
87.120.126.131|DE
87.120.205.64|DE
87.120.92.172|DE
87.251.87.213|DE
88.99.92.84|DE
89.106.78.217|DE
89.106.89.97|DE
89.125.54.80|DE
89.167.109.28|DE
89.168.108.209|DE
89.168.67.158|DE
89.191.226.252|DE
89.213.171.201|DE
89.213.171.222|DE
89.40.117.130|DE
89.40.117.143|DE
89.58.59.201|DE
91.107.152.178|DE
91.107.178.25|DE
91.107.240.211|DE
91.107.243.223|DE
91.107.251.16|DE
91.107.254.128|DE
91.132.160.255|DE
91.149.222.113|DE
91.149.223.242|DE
91.219.23.154|DE
91.99.148.150|DE
91.99.161.159|DE
91.99.222.109|DE
92.5.12.76|DE
92.5.37.229|DE
92.5.85.78|DE
92.51.37.45|DE
94.143.231.154|DE
94.177.231.152|DE
94.237.80.56|DE
95.140.154.46|DE
95.85.230.15|DE
95.85.237.48|DE
95.85.252.115|DE
109.120.185.201|FI
109.120.185.210|FI
109.172.54.73|FI
111.88.215.50|FI
132.243.24.155|FI
135.136.177.174|FI
141.0.184.108|FI
141.0.184.160|FI
144.31.184.200|FI
150.241.88.243|FI
185.17.2.161|FI
185.188.181.14|FI
185.221.196.177|FI
185.42.163.194|FI
192.124.181.74|FI
192.145.29.34|FI
193.164.128.68|FI
193.23.201.56|FI
194.180.189.194|FI
195.96.156.121|FI
195.96.156.240|FI
2.26.105.147|FI
206.245.135.117|FI
217.179.49.227|FI
31.77.183.133|FI
37.27.36.143|FI
64.188.80.100|FI
78.17.15.130|FI
78.17.187.202|FI
78.17.39.165|FI
79.110.48.71|FI
81.19.139.232|FI
82.25.174.66|FI
84.22.150.176|FI
85.204.18.6|FI
85.204.18.93|FI
91.186.222.76|FI
92.42.102.109|FI
93.152.207.174|FI
94.156.180.27|FI
95.217.185.57|FI
104.238.191.179|FR
107.161.160.91|FR
109.120.179.99|FR
109.172.55.148|FR
109.199.122.5|FR
109.199.126.6|FR
129.151.242.76|FR
132.243.204.151|FR
132.243.204.84|FR
139.64.167.70|FR
144.31.214.138|FR
145.223.69.87|FR
147.90.14.132|FR
151.80.56.155|FR
152.228.191.232|FR
159.60.146.81|FR
159.60.146.82|FR
161.97.159.242|FR
185.10.18.238|FR
185.10.18.88|FR
185.10.19.205|FR
185.193.89.107|FR
185.234.100.41|FR
188.92.28.145|FR
193.42.60.24|FR
194.76.147.168|FR
194.76.147.171|FR
195.216.169.63|FR
2.7.113.69|FR
20.33.23.66|FR
217.60.5.249|FR
31.56.176.44|FR
31.59.103.13|FR
38.180.240.91|FR
45.144.28.170|FR
45.155.54.115|FR
45.77.61.133|FR
5.157.51.85|FR
51.91.40.26|FR
82.22.50.162|FR
82.64.120.239|FR
82.70.232.70|FR
82.70.234.100|FR
83.171.225.168|FR
91.134.43.127|FR
92.118.168.112|FR
92.119.126.219|FR
92.119.56.83|FR
94.183.187.190|FR
94.183.187.80|FR
104.128.190.209|GB
134.209.19.200|GB
144.31.213.171|GB
159.65.19.63|GB
165.227.237.209|GB
168.222.13.57|GB
168.222.13.58|GB
168.222.13.59|GB
168.222.13.60|GB
168.222.13.61|GB
168.222.13.65|GB
168.222.13.71|GB
168.222.13.73|GB
168.222.13.74|GB
168.222.13.75|GB
172.166.113.27|GB
18.134.196.127|GB
185.153.183.229|GB
185.66.164.51|GB
194.147.88.43|GB
194.147.88.45|GB
194.147.88.46|GB
194.37.82.144|GB
217.154.53.220|GB
31.76.60.114|GB
34.39.62.53|GB
45.147.44.148|GB
45.32.180.58|GB
5.83.218.80|GB
57.128.176.37|GB
57.128.176.87|GB
57.128.177.172|GB
57.128.177.198|GB
57.128.178.196|GB
57.128.178.63|GB
57.128.179.189|GB
57.128.181.219|GB
57.128.181.221|GB
57.128.182.61|GB
57.128.183.108|GB
57.128.183.138|GB
57.128.183.248|GB
57.128.183.3|GB
57.128.183.35|GB
57.128.183.82|GB
57.128.183.90|GB
64.176.181.12|GB
79.72.91.32|GB
8.208.20.116|GB
82.38.171.209|GB
82.38.171.239|GB
84.8.145.58|GB
89.125.212.90|GB
91.149.238.129|GB
77.91.77.98|GE
156.244.57.227|HK
144.31.243.69|LT
151.244.201.178|MX
151.244.201.180|MX
151.244.201.182|MX
151.244.201.189|MX
151.244.201.192|MX
151.244.201.193|MX
151.244.201.194|MX
151.244.201.207|MX
151.244.201.212|MX
151.244.201.213|MX
151.244.201.216|MX
151.244.201.226|MX
151.244.201.231|MX
151.244.201.234|MX
151.244.201.235|MX
151.244.201.242|MX
151.244.201.249|MX
151.244.201.250|MX
151.244.201.253|MX
103.80.87.191|NL
109.234.34.17|NL
113.30.188.83|NL
130.12.46.75|NL
134.209.136.197|NL
138.124.2.203|NL
140.150.226.22|NL
141.144.195.228|NL
144.124.235.197|NL
144.31.72.69|NL
144.31.78.217|NL
146.103.115.212|NL
146.103.96.48|NL
147.45.117.151|NL
147.90.11.46|NL
150.241.90.79|NL
159.223.224.80|NL
165.232.89.21|NL
167.71.65.115|NL
178.62.206.22|NL
185.130.224.105|NL
185.159.128.184|NL
185.159.75.65|NL
185.184.121.228|NL
185.80.53.221|NL
188.253.25.212|NL
194.246.83.147|NL
194.87.83.44|NL
2.27.39.147|NL
2.58.113.192|NL
209.38.101.169|NL
217.179.48.74|NL
31.222.229.52|NL
31.59.140.91|NL
31.76.252.71|NL
45.144.232.27|NL
45.153.186.22|NL
45.43.88.232|NL
46.30.41.73|NL
5.175.217.27|NL
62.171.228.94|NL
64.188.117.181|NL
66.151.33.31|NL
66.163.127.56|NL
72.56.68.247|NL
77.238.228.195|NL
77.239.111.51|NL
79.137.197.140|NL
79.137.197.212|NL
80.74.25.110|NL
85.136.180.64|NL
87.239.250.142|NL
87.239.251.254|NL
89.125.63.28|NL
89.125.85.228|NL
89.127.214.183|NL
89.30.198.194|NL
89.30.198.68|NL
94.142.137.72|NL
94.176.3.215|NL
95.179.140.212|NL
185.65.151.81|RU
109.120.155.164|SE
109.120.156.105|SE
121.127.33.130|SE
132.243.231.36|SE
138.124.102.89|SE
138.124.103.252|SE
138.124.25.223|SE
138.124.25.250|SE
138.124.25.51|SE
141.98.161.36|SE
147.45.73.177|SE
147.45.76.230|SE
158.179.206.143|SE
16.170.253.163|SE
172.232.149.77|SE
185.117.88.115|SE
185.153.180.9|SE
185.186.78.15|SE
185.58.115.45|SE
192.145.30.27|SE
193.168.197.68|SE
193.68.89.220|SE
193.68.89.71|SE
196.196.5.26|SE
196.196.5.28|SE
206.168.215.172|SE
37.203.209.26|SE
37.203.209.42|SE
37.252.9.236|SE
41.216.182.98|SE
45.158.116.43|SE
45.9.18.119|SE
45.9.18.74|SE
46.249.103.176|SE
5.175.236.36|SE
5.175.236.4|SE
5.175.236.48|SE
5.175.236.53|SE
5.175.236.54|SE
5.175.236.58|SE
51.20.202.203|SE
62.182.198.178|SE
64.188.81.49|SE
70.34.194.51|SE
70.34.210.205|SE
79.108.164.203|SE
80.66.78.190|SE
80.66.78.207|SE
84.32.154.0|SE
84.32.208.201|SE
87.251.85.34|SE
89.125.37.200|SE
89.125.76.10|SE
89.127.201.202|SE
92.246.137.103|SE
103.253.145.105|SG
103.6.169.135|SG
124.156.202.172|SG
128.1.186.115|SG
128.1.186.117|SG
128.1.186.119|SG
128.1.186.180|SG
128.1.186.182|SG
128.1.186.183|SG
128.1.186.55|SG
128.1.186.56|SG
128.1.186.59|SG
128.1.186.60|SG
128.1.186.61|SG
128.1.186.62|SG
129.121.129.25|SG
138.2.108.213|SG
139.59.118.255|SG
140.245.103.72|SG
140.245.127.48|SG
143.42.66.91|SG
149.28.159.222|SG
150.109.11.223|SG
152.175.67.17|SG
157.228.130.240|SG
157.230.255.214|SG
159.65.1.74|SG
161.118.220.61|SG
164.52.2.100|SG
164.52.2.99|SG
165.245.176.192|SG
168.138.189.91|SG
168.144.110.83|SG
177.5.66.59|SG
178.93.160.236|SG
20.6.12.145|SG
206.189.39.92|SG
213.35.105.58|SG
43.133.61.219|SG
43.156.116.194|SG
43.156.181.203|SG
43.170.38.62|SG
45.139.226.157|SG
45.77.36.140|SG
47.82.155.79|SG
8.219.185.66|SG
83.147.234.163|SG
84.32.22.205|SG
38.244.150.113|TH
103.83.86.172|TR
104.143.204.62|TR
104.239.87.51|TR
130.94.1.150|TR
130.94.1.177|TR
141.98.118.80|TR
155.103.70.71|TR
155.103.71.111|TR
155.103.71.142|TR
155.103.71.159|TR
155.103.71.80|TR
167.104.219.81|TR
178.157.15.73|TR
185.200.36.36|TR
185.219.132.27|TR
185.219.133.106|TR
185.255.93.189|TR
193.124.46.93|TR
194.36.85.113|TR
201.50.115.20|TR
201.50.115.25|TR
203.202.232.110|TR
203.202.232.211|TR
213.155.119.28|TR
213.238.182.13|TR
31.40.204.131|TR
31.40.204.200|TR
31.40.204.243|TR
37.221.79.43|TR
38.180.172.231|TR
45.136.5.132|TR
45.141.148.137|TR
45.67.202.173|TR
62.133.63.124|TR
62.60.233.121|TR
77.83.245.48|TR
78.135.77.252|TR
82.26.136.32|TR
82.26.198.25|TR
82.26.198.89|TR
83.217.9.70|TR
89.45.45.110|TR
89.45.45.144|TR
93.180.134.48|TR
104.156.225.101|US
104.168.125.179|US
104.238.129.180|US
107.172.190.151|US
107.172.241.7|US
107.173.15.46|US
117.55.231.178|US
129.159.119.161|US
129.159.84.71|US
132.145.166.33|US
138.249.133.40|US
141.148.93.235|US
141.98.41.20|US
141.98.41.28|US
141.98.41.80|US
142.111.173.20|US
143.198.31.221|US
143.47.96.200|US
146.190.56.83|US
149.28.49.149|US
149.28.56.202|US
150.136.105.229|US
150.136.169.72|US
150.136.243.175|US
154.7.183.116|US
154.9.241.186|US
162.212.155.85|US
162.243.115.22|US
163.192.19.221|US
179.255.185.118|US
179.255.185.124|US
179.255.185.132|US
185.198.26.215|US
191.222.247.114|US
192.193.104.25|US
192.204.62.245|US
192.236.234.71|US
194.59.221.122|US
198.20.138.119|US
20.106.211.232|US
203.88.123.113|US
204.44.74.241|US
205.186.76.187|US
205.186.76.237|US
207.246.94.121|US
208.167.245.42|US
213.170.157.1|US
216.155.157.220|US
23.94.123.231|US
23.95.113.61|US
23.95.148.8|US
31.59.138.204|US
35.212.207.185|US
45.138.100.200|US
45.32.136.112|US
45.61.148.252|US
45.63.62.4|US
47.251.18.155|US
47.251.95.178|US
47.254.15.111|US
47.254.57.63|US
47.88.88.99|US
64.176.198.77|US
64.181.255.215|US
64.237.48.135|US
66.112.210.246|US
66.135.5.63|US
66.154.101.223|US
69.12.91.111|US
71.168.153.36|US
8.221.126.227|US
82.38.69.104|US
85.208.119.187|US
85.209.156.253|US
91.149.239.206|US
`;

// نام فارسی کشورها (برای نمایش در پنل)
const IP_POOL_COUNTRY_NAMES = {
  "DE": "آلمان",
  "US": "آمریکا",
  "NL": "هلند",
  "SE": "سوئد",
  "GB": "بریتانیا",
  "FR": "فرانسه",
  "SG": "سنگاپور",
  "TR": "ترکیه",
  "FI": "فنلاند",
  "MX": "مکزیک",
  "CN": "چین",
  "AE": "امارات",
  "AL": "AL",
  "AT": "اتریش",
  "BR": "برزیل",
  "CH": "سوئیس",
  "GE": "GE",
  "HK": "HK",
  "LT": "لیتوانی",
  "RU": "روسیه",
  "TH": "تایلند"
};

const IP_POOL = IP_POOL_RAW.trim().split('\n').filter(Boolean).map(line => {
  const [ip, cc] = line.split('|');
  return { ip: ip.trim(), cc: (cc || '??').trim() };
});

const IP_POOL_SIZE = IP_POOL.length;

// فهرست کشورها به‌ترتیب تعداد آی‌پی (برای منوی انتخاب)
const IP_POOL_COUNTRIES = (() => {
  const counts = {};
  for (const item of IP_POOL) counts[item.cc] = (counts[item.cc] || 0) + 1;
  return Object.keys(counts)
    .map(cc => ({ cc, count: counts[cc], name: IP_POOL_COUNTRY_NAMES[cc] || cc }))
    .sort((a, b) => b.count - a.count || (a.cc < b.cc ? -1 : 1));
})();

function poolCountryName(cc) {
  return IP_POOL_COUNTRY_NAMES[String(cc || '').toUpperCase()] || 'نامشخص';
}

// انتخاب تصادفی بدون تکرار؛ country می‌تواند خالی، یک کد، یا فهرست کد باشد
function pickPoolIps(count = 5, country = '', random = Math.random) {
  const wanted = String(country || '').toUpperCase().split(',').map(s => s.trim()).filter(Boolean);
  const source = wanted.length && !wanted.includes('ALL')
    ? IP_POOL.filter(item => wanted.includes(item.cc))
    : IP_POOL;
  const total = Math.min(Math.max(1, parseInt(count, 10) || 1), source.length || 1);
  const pool = source.slice();
  if (pool.length > total * 4) {
    // برای استخرهای بزرگ، به‌جای کپی کامل فقط به تعداد لازم انتخاب می‌کنیم
    for (let i = 0; i < total; i++) {
      const j = i + Math.floor(random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, total);
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, total);
}

// متن ساب: هر خط یک آی‌پی (با پورت اختیاری) و در صورت خواست، نام کشور
function poolSubscriptionText(options = {}) {
  const port = String(options.port || '').trim().replace(/[^0-9]/g, '');
  const withCountry = Boolean(options.countryLabel);
  const items = pickPoolIps(options.count || IP_POOL_SIZE, options.country || '', options.random);
  const lines = items.map(item => {
    const host = port ? item.ip + ':' + port : item.ip;
    return withCountry ? host + '#' + (IP_POOL_COUNTRY_NAMES[item.cc] || item.cc) : host;
  });
  return lines.join('\n') + '\n';
}


// --- MODULE: src/config/defaults.js ---
// ============================================================================
// miliconfig v3.2 - تنظیمات پیش‌فرض پایه
// مجهز به شادوساکس، فرگمنت، ECH، لیست‌های کشوری، قفل ۳ کاربر و چرخش خودکار آی‌پی
// ============================================================================


const BRAND_NAME = 'miliconfig';
const BRAND_UPPER = 'MILICONFIG';
const VERSION = 'v3.9.1';
const DEFAULT_ADMIN_UUID = '351c9981-04b6-4103-aa4b-864aa9c91469';

// ساب‌لینک اصلی مدیر همیشه ۴۰۰ نود (همهٔ پروتکل‌ها و ترکیب‌های آدرس) دارد
// تا برای تست و کار روزمرهٔ خود مدیر کافی باشد؛ ساب‌های کاربران از تنظیم خودشان پیروی می‌کنند.
const ADMIN_SUB_NODE_COUNT = 400;
const MAX_USERS_LIMIT = 3;
const TELEGRAM_SUPPORT = '@miliconfig';

// مقادیر پیش‌فرض دقیقاً مطابق cfnew (byJoey): vless روشن، بقیهٔ پروتکل‌ها و
// امکانات اضافه خاموش تا کاربر خودش از فرم ساخت/ویرایش کاربر روشن کند.
const CONFIG_DEFAULTS = {
  wk: '',
  ev: 'yes',
  et: 'no',
  ex: 'no',
  es: 'no', // شادوساکس (Shadowsocks) — امکانات اضافه پیش‌فرض خاموش
  sspass: '',
  // هسته این ورکر هدر Shadowsocks را به‌صورت متنی (بدون AEAD) می‌خواند، بنابراین تنها متد سازگار «none» است
  ssmethod: 'aes-128-gcm',
  ech: 'no',
  // — تحریم‌شکن: خروجی همهٔ نودها از «آدرس واسط» بیرون از ایران عبور می‌کند
  // تا سرویس‌هایی که آی‌پی ایران را مسدود می‌کنند باز شوند.
  sb: 'yes',
  sbRegion: 'DE', // منطقهٔ آدرس واسط پیشنهادی (DE/NL/US/…)
  // — گزینه‌های کلاینت که در کانفیگ‌های تولیدشده اعمال می‌شوند
  doh: 'yes', // DNS over HTTPS در کانفیگ کلاینت
  tcp: 'yes', // TCP fast-open / tcp-concurrent در کانفیگ کلاینت
  udp: 'yes', // عبور UDP از نودها
  awgv: '3', // نسخهٔ AmneziaWG برای نودهای WARP: 1 | 2 | 3
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
  ena: 'yes',
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
  // صفر = بدون سقف؛ تعداد کانفیگ را کاربر/پنل انتخاب نمی‌کند و موتور خودش
  // همهٔ آدرس‌های منابع را مثل cfnew به نود تبدیل می‌کند.
  subNodeCount: 0,
  region: 'auto', // منطقهٔ لوکیشن نودها: auto | CF | کد کشور (مثل DE/NL/US)
  brand: BRAND_NAME,
  // تنظیمات ترنسپورت و رفتار کلاینت:
  fp: 'chrome', // فینگرپرینت: chrome, firefox, safari, edge, ios, randomized
  patt: '/?ed=2048', // الگوهای مسیر
  fragmentPreset: 'mci', // پریست‌های فرگمنت
  fragmentLength: '100-200',
  fragmentInterval: '10-20',
  fragmentPackets: 'tlshello',
  ipRotation: 'off', // چرخش آی‌پی: پیش‌فرض خاموش تا آی‌پی نود در کلاینت ثابت بماند
  // — حالت آی‌پی نود در کلاینت: «country» یعنی فقط کشور/منطقه ثابت است و
  // آدرس‌ها بین رفرش‌ها عوض می‌شوند؛ «fixed» یعنی همهٔ نودها یک آی‌پی ثابت
  // دارند و با پینگ/بروزرسانی ساب هم عوض نمی‌شود.
  ipMode: 'country',
  ipPinned: '', // آدرس دلخواه برای حالت ثابت: host یا host:port (خالی = انتخاب خودکار پایدار)
  locationNodeCount: 8, // تعداد نود چندلوکیشن که در ساب‌لینک کشوری ساخته می‌شود
  frag: 'yes', // کلید روشن/خاموش فرگمنت (شادوساکس فرگمنت ندارد)
  ports: '443', // پورت‌های TLS نودهای ساب‌لینک (cfnew: فقط 443)
  // پورت‌های بدون TLS که به‌عنوان «حالت دوم» هر نود ساخته می‌شوند؛ cfnew: 80
  httpPorts: '80',
  adminPasswordHash: '', // هش رمز عبور مدیر
  supportChannel: TELEGRAM_SUPPORT,
  // — نود دامنهٔ پنل: آدرس و SNI دقیقاً دامنهٔ همین ورکر/پیجز (بدون https://)
  pd: 'no',
  pdCount: 2,
  // دامنه‌های اضافی SNI/Host (کاما) — هر دامنه باید به همین ورکر وصل باشد
  sniHosts: '',
  // — WARP / WARP PRO / WARP چندلوکیشن
  warp: 'no',
  warpPro: 'no',
  warpMl: 'no',
  warpCount: 8,
  // — WARP MASQUE (HTTP/3): فقط Mihomo/Clash.Meta و Hiddify آن را می‌خوانند
  warpMasque: 'no',
  warpMasqueCount: 3,
  warpLicense: '', // لایسنس WARP+ برای نود WARP PRO
  warpEndpoint: '', // لیست سفارشی نقاط پایانی: ip:port#برچسب,ip2:port2#برچسب (خالی = نقاط پایانی رسمی کلادفلر)
  // — پروفایل پیش‌فرض نودهای WARP (قابل انتخاب برای هر کاربر)
  warpMtu: 'auto', // auto | 1240 | 1280 | 1320 | 1380
  warpDns: 'auto', // auto | cloudflare | cloudflare-alt | both | google
  warpObf: 'all', // all | off | lite | balanced | aggressive | stealth
  warpFamily: 'auto', // auto | v4 | v6 | domain — خانوادهٔ اندپوینت چندلوکیشن
  // — OpenVPN (پروفایل‌های عمومی زنده از VPNGate)
  ovpn: 'no',
  ovpnCount: 8,
  ovpnCountries: '',
  ovpnSource: '', // آدرس‌های سفارشی ‎.ovpn‎ (کاما) — خالی = منابع پیش‌فرض
  ovpnProto: 'auto', // auto | udp | tcp — فیلتر پروتکل پروفایل‌های OpenVPN
  ovpnTuning: 'all', // all | balanced | mtu-safe | mobile — پروفایل تنظیم MTU/DNS در خروجی .ovpn
  // — بروزرسانی نسخه: امکان استقرار نسخهٔ تازه از داخل پنل
  autoUpdate: 'no', // yes = کرون در صورت وجود توکن، نسخهٔ گیت‌هاب را خودکار مستقر می‌کند
  cfAccountId: '', // Account ID کلادفلر (غیرمحرمانه)
  cfScriptName: '' // نام اسکریپت Workers که باید به‌روز شود (غیرمحرمانه)
};

const BOOLEAN_CONFIG_KEYS = [
  'ev', 'et', 'ex', 'es', 'ech', 'ena', 'epd', 'epi', 'egi',
  'ipv4', 'ipv6', 'ispMobile', 'ispUnicom', 'ispTelecom', 'jk', 'frag',
  'pd', 'warp', 'warpPro', 'warpMl', 'warpMasque', 'ovpn', 'autoUpdate',
  'sb', 'doh', 'tcp', 'udp'
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
  sb: ['sb', 'SB', 'SANCTIONS_BYPASS'],
  sbRegion: ['sbRegion', 'SBREGION', 'SB_REGION'],
  doh: ['doh', 'DOH'],
  tcp: ['tcp', 'TCP'],
  udp: ['udp', 'UDP'],
  awgv: ['awgv', 'AWGV', 'AMNEZIA_VERSION'],
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
  region: ['region', 'REGION', 'LOCATION_REGION'],
  fp: ['fp', 'FP', 'FINGERPRINT'],
  patt: ['patt', 'PATT', 'PATH_PATTERN'],
  fragmentPreset: ['fragmentPreset', 'FRAGMENT_PRESET'],
  frag: ['frag', 'FRAG', 'FRAGMENT_ENABLED'],
  ports: ['ports', 'PORTS', 'NODE_PORTS'],
  httpPorts: ['httpPorts', 'HTTPPORTS', 'HTTP_PORTS', 'NODE_HTTP_PORTS'],
  ipRotation: ['ipRotation', 'IP_ROTATION', 'ROTATION_MINUTES'],
  locationNodeCount: ['locationNodeCount', 'LOCATION_NODE_COUNT'],
  pd: ['pd', 'PD', 'PANEL_DOMAIN_NODES'],
  pdCount: ['pdCount', 'PDCOUNT', 'PANEL_DOMAIN_NODE_COUNT'],
  sniHosts: ['sniHosts', 'SNIHOSTS', 'SNI_HOSTS', 'CUSTOM_DOMAINS', 'FRONT_DOMAINS'],
  warp: ['warp', 'WARP'],
  warpPro: ['warpPro', 'WARPPRO', 'WARP_PRO'],
  warpMl: ['warpMl', 'WARPML', 'WARP_MULTI_LOCATION'],
  warpCount: ['warpCount', 'WARPCOUNT', 'WARP_NODE_COUNT'],
  warpMasque: ['warpMasque', 'WARPMASQUE', 'WARP_MASQUE'],
  warpMasqueCount: ['warpMasqueCount', 'WARPMASQUECOUNT', 'WARP_MASQUE_COUNT'],
  warpLicense: ['warpLicense', 'WARPLICENSE', 'WARP_LICENSE'],
  warpEndpoint: ['warpEndpoint', 'WARPENDPOINT', 'WARP_ENDPOINT'],
  ovpn: ['ovpn', 'OVPN', 'OPENVPN'],
  ovpnCount: ['ovpnCount', 'OVPNCOUNT', 'OPENVPN_NODE_COUNT'],
  ovpnCountries: ['ovpnCountries', 'OVPNCOUNTRIES', 'OPENVPN_COUNTRIES'],
  ovpnSource: ['ovpnSource', 'OVPNSOURCE', 'OPENVPN_SOURCE'],
  ipMode: ['ipMode', 'IPMODE', 'IP_MODE'],
  ipPinned: ['ipPinned', 'IPPINNED', 'IP_PINNED', 'FIXED_IP'],
  warpMtu: ['warpMtu', 'WARPMTU', 'WARP_MTU'],
  warpDns: ['warpDns', 'WARPDNS', 'WARP_DNS'],
  warpObf: ['warpObf', 'WARPOBF', 'WARP_OBF'],
  warpFamily: ['warpFamily', 'WARPFAMILY', 'WARP_FAMILY'],
  ovpnProto: ['ovpnProto', 'OVPNPROTO', 'OPENVPN_PROTO'],
  ovpnTuning: ['ovpnTuning', 'OVPNTUNING', 'OPENVPN_TUNING'],
  autoUpdate: ['autoUpdate', 'AUTOUPDATE', 'AUTO_UPDATE'],
  cfAccountId: ['cfAccountId', 'CFACCOUNTID', 'CF_ACCOUNT_ID'],
  cfScriptName: ['cfScriptName', 'CFSCRIPTNAME', 'CF_SCRIPT_NAME']
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

// منابع کشوری از رجیستری زندهٔ اسکنر (src/config/sources.js) ساخته می‌شوند؛
// آدرس‌های ۴۰۴ (dimzon، بخشی از فایل‌های proxy_vip و …) از این استخر حذف شده‌اند.

// ============================================================================
// ادغام منابع زنده اسکنر (آینهٔ لبه + trio666 + proxifly + ProxyScrape + ClearProxy)
// ============================================================================
const COUNTRY_PROXY_SOURCES = (() => {
  const codes = new Set([
    ...Object.keys(COUNTRY_EXTRA_PROXY_SOURCES),
    ...Object.keys(COUNTRY_META)
  ]);
  const merged = {};
  for (const code of codes) {
    const meta = COUNTRY_META[code] || {};
    const urls = [...new Set(COUNTRY_EXTRA_PROXY_SOURCES[code] || [])];
    merged[code] = {
      name: meta.name || code,
      flag: meta.flag || '',
      urls
    };
  }
  return merged;
})();

const GLOBAL_PROXY_SOURCES = {
  socks5: GLOBAL_SOCKS5_SOURCES,
  http: GLOBAL_HTTP_SOURCES,
  mixed: GLOBAL_MIXED_SOURCES,
  residential: RESIDENTIAL_SOURCES
};


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
  // ۰ = بدون سقف (موتور خودش تعداد نودها را تعیین می‌کند)
  snap.subNodeCount = Number.isFinite(parsedCount) && parsedCount >= 0 ? parsedCount : 0;
  snap.region = String(snap.region || 'auto').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(snap.region)) snap.region = 'auto';
  // چرخش آی‌پی: «off» یا ۰ یعنی خاموش (پیش‌فرض)؛ عدد = دقیقه
  const rotationRaw = String(snap.ipRotation == null ? '' : snap.ipRotation).trim().toLowerCase();
  if (!rotationRaw || rotationRaw === 'off' || rotationRaw === '0' || rotationRaw === 'false') {
    snap.ipRotation = 'off';
  } else {
    const rotNum = parseInt(rotationRaw, 10);
    snap.ipRotation = Number.isFinite(rotNum) && rotNum > 0 ? String(rotNum) + 'm' : 'off';
  }
  // متدهای Shadowsocks پشتیبانی‌شده: aes-128-gcm (پیش‌فرض) و aes-256-gcm
  snap.ssmethod = String(snap.ssmethod || '').toLowerCase() === 'aes-256-gcm' ? 'aes-256-gcm' : 'aes-128-gcm';
  // اگر پریست فرگمنت روی حالت سفارشی باشد و مقادیر خالی بمانند، از مقادیر پیش‌فرض ضد-DPI استفاده می‌شود
  if (!snap.fragmentLength) snap.fragmentLength = '100-200';
  if (!snap.fragmentInterval) snap.fragmentInterval = '10-20';
  if (!snap.fragmentPackets) snap.fragmentPackets = 'tlshello';
  snap.sbRegion = String(snap.sbRegion || 'DE').trim().toUpperCase();
  if (!snap.sbRegion) snap.sbRegion = 'DE';
  snap.ipMode = String(snap.ipMode || '').toLowerCase() === 'fixed' ? 'fixed' : 'country';
  snap.ipPinned = String(snap.ipPinned || '').trim();
  if (snap.ipMode === 'fixed') snap.ipRotation = 'off';
  // نسخهٔ AmneziaWG برای نودهای WARP؛ هر مقدار ناشناخته به نسخهٔ ۳ (امنزیا 3.x) می‌رود
  snap.awgv = ['1', '2', '3'].includes(String(snap.awgv || '').trim()) ? String(snap.awgv).trim() : '3';
  snap.fp = snap.fp || 'chrome';
  snap.patt = snap.patt || '/?ed=2048';
  snap.ports = parseNodePorts(snap.ports).join(',');
  // پورت‌های HTTP اختیاری‌اند؛ مقدار خالی یعنی فقط نودهای TLS ساخته شوند
  snap.httpPorts = String(snap.httpPorts == null ? CONFIG_DEFAULTS.httpPorts : snap.httpPorts).trim()
    ? parseNodePorts(snap.httpPorts).filter(port => CF_HTTP_PORTS.includes(port)).join(',')
    : '';
  const clampInt = (val, min, max, dflt) => {
    const n = parseInt(val, 10);
    if (!Number.isFinite(n)) return dflt;
    return Math.min(max, Math.max(min, n));
  };
  snap.pdCount = clampInt(snap.pdCount, 0, 20, 2);
  snap.warpCount = clampInt(snap.warpCount, 1, 30, 8);
  snap.warpMasqueCount = clampInt(snap.warpMasqueCount, 1, 6, 3);
  snap.ovpnCount = clampInt(snap.ovpnCount, 0, 24, 8);
  snap.warpLicense = String(snap.warpLicense || '').trim();
  snap.warpEndpoint = String(snap.warpEndpoint || '').trim();
  snap.ovpnCountries = String(snap.ovpnCountries || '').trim().toUpperCase();
  snap.ovpnSource = String(snap.ovpnSource || '').trim();
  snap.autoUpdate = normalizeSwitch(snap.autoUpdate, false);
  snap.cfAccountId = String(snap.cfAccountId || '').trim();
  snap.cfScriptName = String(snap.cfScriptName || '').trim();
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
// miliconfig v3.2 - پریست‌های ساخت سریع کاربر
// ============================================================================


const USER_PRESETS = {
  'iran-fast': {
    id: 'iran-fast',
    title: 'ایران — پرسرعت و ضد فیلتر (پیشنهادی)',
    subtitle: 'همراه اول · ایرانسل · مخابرات · دور زدن فیلتر Pages.dev',
    badges: ['فرگمنت 10-30/100-200', 'SNI ضد DPI', 'آی‌پی تمیز Anycast'],
    recommended: true,
    nodeScope: 'all',
    subNodeCount: 0,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'no', // شادوساکس پیش‌فرض خاموش (امکانات اضافهٔ کانال)
      fp: 'chrome',
      frag: 'yes',
      fragmentPreset: 'mci',
      fragmentLength: '100-200',
      fragmentInterval: '10-20',
      fragmentPackets: 'tlshello',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'yes',
      ipv4: 'yes',
      ipv6: 'yes',
      sb: 'yes',
      sbRegion: 'DE'
    }
  },
  'pages-iran': {
    id: 'pages-iran',
    title: 'ایران — ضد فیلتر قوی (ویژه Pages.dev فیلترشده)',
    subtitle: 'عبور از فیلترینگ SNI و مسدودی دامنهٔ pages.dev و workers.dev',
    badges: ['فرگمنت ریز 10-30', 'Mixed-Case SNI', 'xHTTP + VLESS'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 0,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'yes',
      es: 'no',
      fp: 'chrome',
      alpn: 'h2,http/1.1',
      frag: 'yes',
      fragmentPreset: 'custom',
      fragmentLength: '10-30',
      fragmentInterval: '10-20',
      fragmentPackets: 'tlshello',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'yes',
      ipv4: 'yes',
      ipv6: 'yes',
      sb: 'yes',
      sbRegion: 'DE'
    }
  },
  'iran-heavy': {
    id: 'iran-heavy',
    title: 'ایران — مصرف سنگین (نامحدود)',
    subtitle: 'استریم · بازی · دانلود',
    badges: ['حجم نامحدود', 'فرگمنت 50-100', '۲ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 0,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 2,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'yes',
      ex: 'no',
      es: 'no',
      fp: 'chrome',
      frag: 'yes',
      fragmentPreset: 'irancell',
      fragmentLength: '50-100',
      fragmentInterval: '5-10',
      fragmentPackets: 'tlshello',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      sb: 'yes',
      sbRegion: 'NL'
    }
  },
  'international': {
    id: 'international',
    title: 'بین‌المللی — بدون فرگمنت',
    subtitle: 'اینترنت بدون محدودیت · سرعت حداکثری',
    badges: ['بدون فرگمنت', 'بدون محدودیت حجم', '۵ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 0,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 5,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'no',
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
    subNodeCount: 0,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      es: 'no',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'yes'
    }
  },
  'direct-only': {
    id: 'direct-only',
    title: 'فقط سرور اصلی (بدون CDN)',
    subtitle: 'وقتی مسیر CDN مشکل دارد یا تست خود سرور',
    badges: ['فقط نود سرور اصلی', 'بدون لوکیشن', 'بدون فرگمنت'],
    recommended: false,
    nodeScope: 'origin',
    subNodeCount: 0,
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
    subNodeCount: 0, // تعداد کانفیگ دستی نیست؛ موتور cfnew خودش همهٔ آدرس‌ها را می‌سازد
    ...(customOverrides || {})
  });
}


// --- MODULE: src/ui/pwa.js ---
// ============================================================================
// miliconfig v3.5.2 - لایهٔ نصب اپ (PWA)
// سه چیز را فراهم می‌کند: manifest، سرویس‌ورکر و آیکون مستقل.
// با همین‌ها پنل هم روی دسکتاپ (Chrome/Edge) و هم روی گوشی نصب‌شدنی می‌شود و
// در حالت standalone (بدون نوار آدرس) اجرا می‌شود.
// ============================================================================


const THEME_BG = '#05080a';

// آیکون ایستای اپ: همان سپر برند با پس‌زمینهٔ تیره تا در لانچر خوانا بماند
const PWA_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="512" height="512">
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
const PWA_SW_JS = `/* ${BRAND_NAME}OS service worker */
self.addEventListener('install', function (event) { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((self.clients && self.clients.claim) ? self.clients.claim() : Promise.resolve());
});
self.addEventListener('fetch', function () {});
`;

// تکه‌های head برای صفحات پنل/ورود/وضعیت
const PWA_HEAD_TAGS = `<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="${THEME_BG}">
<meta name="application-name" content="${BRAND_NAME}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="${BRAND_NAME}">
<link rel="apple-touch-icon" href="/pwa-icon.svg">`;

// اسکریپت سمت کلاینت (بدون بک‌اسلش تا از لایهٔ unescape سالم بیرون بیاید)
const PWA_CLIENT_JS = `(function () {
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

function pwaManifestResponse() {
  return new Response(JSON.stringify(MANIFEST), {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

function pwaServiceWorkerResponse() {
  return new Response(PWA_SW_JS, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/'
    }
  });
}

function pwaIconResponse() {
  return new Response(PWA_ICON_SVG, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}


// --- MODULE: src/core/utils.js ---
// ============================================================================
// miliconfig v3.9.2 - ابزارهای هسته، رمزنگاری امن (WebCrypto + Pure-JS Fallback)،
// محافظت در برابر Timing Attack، مسدودسازی SSRF و مخفی‌سازی SNI دامنه Pages در ایران
// ============================================================================

const base64TextDecoder = new TextDecoder();
const sharedDecoder = new TextDecoder();

// دسترسی ایمن به WebCrypto در تمام محیط‌ها (Cloudflare Workers/Pages و Node.js 18+)
function getSafeCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) return globalThis.crypto;
  if (typeof crypto !== 'undefined') return crypto;
  return null;
}

function getRandomBytesSafe(size = 16) {
  const bytes = new Uint8Array(size);
  const c = getSafeCrypto();
  if (c && typeof c.getRandomValues === 'function') {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < size; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

// مقایسهٔ زمان‌ثابت (Constant-Time) برای جلوگیری از Timing Attacks روی رمزها و توکن‌ها
function timingSafeEqualStr(a = '', b = '') {
  const strA = String(a || '');
  const strB = String(b || '');
  const enc = new TextEncoder();
  const bufA = enc.encode(strA);
  const bufB = enc.encode(strB);
  const len = Math.max(bufA.length, bufB.length);
  let diff = bufA.length ^ bufB.length;
  for (let i = 0; i < len; i++) {
    diff |= (bufA[i] || 0) ^ (bufB[i] || 0);
  }
  return diff === 0;
}

// محافظت HTML برای جلوگیری کامل از XSS در پنل و صفحه وضعیت
function escapeHtml(str = '') {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// بررسی آدرس‌های خصوصی/داخلی برای جلوگیری از SSRF و سوءاستفاده از شبکه ورکر
function isPrivateOrReservedTarget(host = '') {
  const clean = String(host || '').trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (!clean) return true;
  if (clean === 'localhost' || clean.endsWith('.local') || clean.endsWith('.internal') || clean.endsWith('.arpa')) return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(clean)) {
    const parts = clean.split('.').map(Number);
    if (parts.some(p => p < 0 || p > 255)) return true;
    const [a, b] = parts;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 198 && (b === 18 || b === 19)) return true;
    if (a >= 224) return true;
    return false;
  }
  if (clean.includes(':')) {
    if (clean === '::' || clean === '::1') return true;
    if (/^(fe80|fc00|fd00|ff00):/i.test(clean)) return true;
    if (clean.startsWith('::ffff:')) {
      return isPrivateOrReservedTarget(clean.slice(7));
    }
  }
  return false;
}

// ترفند ضد فیلتر اختصاصی ایران برای دامنه‌های فیلترشده (*.pages.dev و *.workers.dev):
// تغییر تصادفی حروف بزرگ/کوچک و افزودن نقطهٔ پایانی FQDN در SNI در حالی که Host اصلی حفظ می‌شود
function buildAntiFilterSni(host = '', seed = 0) {
  const clean = String(host || '').trim().replace(/\.+$/, '');
  if (!clean || /^\d{1,3}(\.\d{1,3}){3}$/.test(clean) || clean.includes(':')) return clean;
  const lower = clean.toLowerCase();
  const isFilteredDomain = lower.endsWith('.pages.dev') || lower.endsWith('.workers.dev');
  if (!isFilteredDomain) return clean;
  let out = '';
  let h = (Number(seed) || 1337) >>> 0;
  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    if (ch >= 'a' && ch <= 'z') {
      h = (Math.imul(h ^ ch.charCodeAt(0), 16777619) + i) >>> 0;
      out += (h & 1) === 0 ? ch.toUpperCase() : ch;
    } else {
      out += ch;
    }
  }
  if (out === lower) {
    out = lower.replace(/pages\.dev$/, 'PaGeS.dEv').replace(/workers\.dev$/, 'WoRkErS.dEv');
  }
  return out;
}

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
  const c = getSafeCrypto();
  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID().toLowerCase();
  }
  const bytes = getRandomBytesSafe(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function generateShortId(prefix = 'mili') {
  const bytes = getRandomBytesSafe(3);
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
// نام‌گذاری گویا برای نودهای ساب‌لینک:
// «پرچم و کد کشور · نوع نود · خانوادهٔ آدرس (IPv4/IPv6/Domain) · نشانگر پروکسی»
// به‌جای الگوی قبلی «عدد+miliconfig» تا کاربر در کلاینت بفهمد چه نودی را انتخاب
// می‌کند. نودهایی که مسیرشان پروکسی خروجی دارد با «⇄ Proxy» علامت می‌خورند.
// ============================================================================
function countryFlag(code = '') {
  const cc = String(code || '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return '';
  return String.fromCodePoint(...[...cc].map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65));
}

// خانوادهٔ آدرس نود بر اساس شکل هاست (IPv6 / IPv4 / دامنه)
function addressFamilyLabel(host = '') {
  const text = String(host || '').trim();
  if (!text) return '';
  if (text.includes(':')) return 'IPv6';
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(text)) return 'IPv4';
  return 'Domain';
}

const NODE_PROTO_LABELS = {
  vless: 'VLESS',
  trojan: 'Trojan',
  ss: 'SS',
  xhttp: 'xHTTP',
  warp: 'WARP',
  warp_pro: 'WARP PRO',
  warp_ml: 'WARP ML',
  wireguard: 'WARP'
};

function buildNodeDisplayName(meta = {}) {
  const protoKey = String(meta.proto || '').trim().toLowerCase();
  const protoLabel = NODE_PROTO_LABELS[protoKey] || (protoKey ? protoKey.toUpperCase() : 'Node');
  const family = meta.family || addressFamilyLabel(meta.host);
  const cc = String(meta.cc || '').trim().toUpperCase();
  const flag = countryFlag(cc);
  const countryTag = cc ? (flag ? `${flag} ${cc}` : cc) : '🌐 CF';
  const parts = [countryTag, protoLabel];
  if (family) parts.push(family);
  if (meta.tls === false) parts.push('HTTP');
  if (meta.proxy) parts.push('⇄ Proxy');
  if (meta.mci) parts.push('MCI');
  // نسخهٔ AmneziaWG روی نودهای WARP: AWG2 / AWG3
  if (meta.awg) parts.push(`AWG${meta.awg}`);
  return parts.join(' · ');
}

// اعمال نام گویا + شمارهٔ یکتا و محدودیت تعداد نودهای ساب‌لینک کاربر
// ورودی می‌تواند شیء { link, meta } یا لینک خام باشد.
function finalizeMiliSubscriptionLinks(entries = [], subNodeCount = 0) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const prepared = entries.map((entry, idx) => {
    const raw = typeof entry === 'string' ? entry : String(entry?.link || '');
    if (!raw) return null;
    const meta = typeof entry === 'string' ? {} : (entry.meta || {});
    const hashIdx = raw.indexOf('#');
    const base = hashIdx > -1 ? raw.substring(0, hashIdx) : raw;
    return { base, meta, idx };
  }).filter(Boolean);
  // ترتیب نهایی بر اساس خود آدرس است، نه ترتیب استخر؛ پس اگر مجموعهٔ آدرس‌ها
  // یکی باشد، شمارهٔ نود و آدرس پشت آن حتی بین دو ایزولهٔ مختلف یکی می‌ماند و
  // «پرش آی‌پی» در کلاینت دیده نمی‌شود.
  prepared.sort((a, b) => (a.base < b.base ? -1 : a.base > b.base ? 1 : a.idx - b.idx));
  const limit = parseInt(subNodeCount, 10);
  const sliced = Number.isFinite(limit) && limit > 0 ? prepared.slice(0, limit) : prepared;
  return sliced.map((item, idx) => {
    const nodeName = `${buildNodeDisplayName(item.meta)} · #${idx + 1}`;
    return `${item.base}#${encodeURIComponent(nodeName)}`;
  });
}

// ============================================================================
// Pure-JS MD5 (جهت سازگاری کامل بدون خطای ۱۱۰۱)
// ============================================================================
async function md5Hex(text) {
  try {
    const c = getSafeCrypto();
    if (c && c.subtle && typeof c.subtle.digest === 'function') {
      const buf = await c.subtle.digest('MD5', new TextEncoder().encode(String(text)));
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
    const c = getSafeCrypto();
    if (c && c.subtle && typeof c.subtle.digest === 'function') {
      const buf = await c.subtle.digest('SHA-256', new TextEncoder().encode(String(text || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  const h = await sha224Hex(String(text || ''));
  return h + h.slice(0, 8);
}

// ============================================================================
// ساخت ZIP ساده (روش store، بدون فشرده‌سازی) برای بستهٔ کانفیگ‌ها
// ورودی: [{ name: 'WARP.conf', data: 'متن' }] → Uint8Array فایل zip
// ============================================================================
const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZip(entries = []) {
  const encoder = new TextEncoder();
  const files = (Array.isArray(entries) ? entries : [])
    .filter(entry => entry && entry.name)
    .map(entry => ({ name: String(entry.name), bytes: encoder.encode(String(entry.data ?? '')) }));
  if (!files.length) return new Uint8Array(0);

  const chunks = [];
  const central = [];
  let offset = 0;
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2)) & 0xffff;
  const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.bytes);
    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);      // version needed
    lv.setUint16(6, 0x0800, true);  // utf-8 flag
    lv.setUint16(8, 0, true);       // store
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, file.bytes.length, true);
    lv.setUint32(22, file.bytes.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    chunks.push(local, file.bytes);

    const header = new Uint8Array(46 + nameBytes.length);
    const hv = new DataView(header.buffer);
    hv.setUint32(0, 0x02014b50, true);
    hv.setUint16(4, 20, true);
    hv.setUint16(6, 20, true);
    hv.setUint16(8, 0x0800, true);
    hv.setUint16(10, 0, true);
    hv.setUint16(12, dosTime, true);
    hv.setUint16(14, dosDate, true);
    hv.setUint32(16, crc, true);
    hv.setUint32(20, file.bytes.length, true);
    hv.setUint32(24, file.bytes.length, true);
    hv.setUint16(28, nameBytes.length, true);
    hv.setUint32(42, offset, true);
    header.set(nameBytes, 46);
    central.push(header);

    offset += local.length + file.bytes.length;
  }

  const centralSize = central.reduce((sum, item) => sum + item.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  const all = [...chunks, ...central, end];
  const total = all.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let pos = 0;
  for (const part of all) { out.set(part, pos); pos += part.length; }
  return out;
}

function formatBytes(bytes = 0) {
  const b = Number(bytes) || 0;
  if (b <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(b) / Math.log(1024)));
  const val = b / Math.pow(1024, i);
  return `${val >= 100 || i === 0 ? Math.round(val) : val.toFixed(2)} ${units[i]}`;
}


// --- MODULE: src/core/shadowsocksAead.js ---
// ============================================================================
// Shadowsocks AEAD (SIP004) — پیاده‌سازی سبک برای aes-128-gcm / aes-256-gcm
// رمزنگاری واقعی سمت سرور تا نودهای ss:// در همهٔ کلاینت‌ها (v2rayNG،
// NekoBox، sing-box، Clash Meta، Shadowrocket) واقعاً پینگ بدهند.
// کلید اصلی با EVP_BytesToKey/MD5 و کلید هر جهت با HKDF-SHA1 ساخته می‌شود.
// ============================================================================


const te = new TextEncoder();
const MAX_CHUNK = 0x3fff;
const TAG_LEN = 16;

function hexToBytes(hex) {
  const clean = String(hex || '').replace(/[^0-9a-f]/gi, '');
  const out = new Uint8Array(clean.length >> 1);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
  return out;
}

function concat(a, b) {
  const out = new Uint8Array((a?.length || 0) + (b?.length || 0));
  if (a?.length) out.set(a, 0);
  if (b?.length) out.set(b, a?.length || 0);
  return out;
}

function randomBytes(size) {
  return getRandomBytesSafe(size);
}

// nonce = شمارندهٔ ۱۲ بایتی little-endian
function incrementNonce(nonce) {
  for (let i = 0; i < nonce.length; i++) {
    nonce[i] = (nonce[i] + 1) & 0xff;
    if (nonce[i] !== 0) break;
  }
}

function cipherInfo(cipher) {
  return cipher === 'aes-256-gcm'
    ? { keyLen: 32, saltLen: 32, subtle: 'AES-GCM' }
    : { keyLen: 16, saltLen: 16, subtle: 'AES-GCM' };
}

async function deriveMasterKey(password) {
  // keyLen برابر طول خروجی MD5 است؛ پس همان یک دور کافی است
  return hexToBytes(await md5Hex(String(password)));
}

async function deriveSessionKey(master, salt) {
  const base = await getSafeCrypto().subtle.importKey('raw', master, 'HKDF', false, ['deriveBits']);
  const bits = await getSafeCrypto().subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-1', salt, info: te.encode('ss-subkey') },
    base,
    128
  );
  return getSafeCrypto().subtle.importKey('raw', new Uint8Array(bits), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

class SsAeadSession {
  constructor(master, cipher = 'aes-128-gcm') {
    this.master = master;
    this.cipher = cipher;
    this.info = cipherInfo(cipher);
    this.decKey = null;
    this.decNonce = new Uint8Array(12);
    this.decBuffer = new Uint8Array(0);
    this.encKey = null;
    this.encNonce = new Uint8Array(12);
    this.encSaltSent = false;
  }

  static async create(password, cipher = 'aes-128-gcm') {
    return new SsAeadSession(await deriveMasterKey(password), cipher);
  }

  async _open(key, nonce, data) {
    const plain = await getSafeCrypto().subtle.decrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, key, data);
    return new Uint8Array(plain);
  }

  async _seal(key, nonce, data) {
    const buf = await getSafeCrypto().subtle.encrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, key, data);
    return new Uint8Array(buf);
  }

  // داده‌های کلاینت (salt + قاب‌های رمزشده) را می‌گیرد و متن ساده برمی‌گرداند.
  // اگر قاب ناقص باشد، تا رسیدن بایت‌های بعدی بافر می‌کند.
  async pushIncoming(chunk) {
    this.decBuffer = concat(this.decBuffer, chunk);
    if (!this.decKey) {
      if (this.decBuffer.length < this.info.saltLen) return null;
      const salt = this.decBuffer.slice(0, this.info.saltLen);
      this.decBuffer = this.decBuffer.slice(this.info.saltLen);
      this.decKey = await deriveSessionKey(this.master, salt);
    }
    const out = [];
    for (;;) {
      let payloadLen = this.pendingLen || 0;
      if (!payloadLen) {
        if (this.decBuffer.length < 2 + TAG_LEN) break;
        const lenCt = this.decBuffer.slice(0, 2 + TAG_LEN);
        const lenPlain = await this._open(this.decKey, this.decNonce, lenCt);
        incrementNonce(this.decNonce);
        this.decBuffer = this.decBuffer.slice(2 + TAG_LEN);
        payloadLen = (lenPlain[0] << 8) | lenPlain[1];
        if (payloadLen <= 0 || payloadLen > MAX_CHUNK) throw new Error('invalid ss aead chunk length');
        this.pendingLen = payloadLen;
      }
      const total = payloadLen + TAG_LEN;
      if (this.decBuffer.length < total) break; // قاب ناقص: منتظر بایت بعدی
      const payloadCt = this.decBuffer.slice(0, total);
      const plain = await this._open(this.decKey, this.decNonce, payloadCt);
      incrementNonce(this.decNonce);
      this.pendingLen = 0;
      out.push(plain);
      this.decBuffer = this.decBuffer.slice(total);
    }
    if (!out.length) return null;
    return out.length === 1 ? out[0] : out.reduce((a, b) => concat(a, b));
  }

  // پاسخ سرور: اولین خروجی با salt شروع می‌شود، بعد قاب‌های رمزشده
  async encodeOutgoing(chunk) {
    if (!this.encKey) {
      const salt = randomBytes(this.info.saltLen);
      this.encKey = await deriveSessionKey(this.master, salt);
      this.encSaltPrefix = salt;
    }
    const parts = [];
    if (this.encSaltPrefix) {
      parts.push(this.encSaltPrefix);
      this.encSaltPrefix = null;
    }
    let offset = 0;
    while (offset < chunk.length) {
      const slice = chunk.subarray(offset, offset + MAX_CHUNK);
      offset += slice.length;
      const lenPlain = Uint8Array.from([slice.length >> 8, slice.length & 0xff]);
      const lenCt = await this._seal(this.encKey, this.encNonce, lenPlain);
      incrementNonce(this.encNonce);
      const payloadCt = await this._seal(this.encKey, this.encNonce, slice);
      incrementNonce(this.encNonce);
      parts.push(lenCt, payloadCt);
    }
    return parts.length === 1 ? parts[0] : parts.reduce((a, b) => concat(a, b));
  }
}


// --- MODULE: src/core/updater.js ---
// ============================================================================
// miliconfig - کانال بروزرسانی نسخه‌ها
//
// مسئله: ورکرهای نصب‌شده روی حساب‌های دیگران از بیرون قابل جایگزینی نیستند.
// راه‌حل‌ها به ترتیب اولویت:
//   ۱) اتصال به گیت‌هاب (Workers Builds / Pages + Git): هر push به main خودکار
//      مستقر می‌شود و هیچ اطلاعاتی از حساب لازم نیست.
//   ۲) اگر ورکر یک کلید محرمانهٔ CF_API_TOKEN داشته باشد (که در داشبورد کلادفلر
//      و نه در پنل تنظیم می‌شود)، خودِ ورکر نسخهٔ تازه را مستقر می‌کند:
//      اعتبارسنجی با /user/tokens/verify، تشخیص Account ID از /accounts،
//     تشخیص نام اسکریپت از WORKER_NAME/دامنه، حفظ بایندینگ‌های فعلی
//      (D1/KV/متن ساده) و آپلود باندل با نام ماژول تصادفی.
//   ۳) در غیر این صورت پنل فقط نسخهٔ تازه را می‌شمارد و فایل/دستور بروزرسانی
//      می‌دهد؛ هیچ ورودی حساب کلودفلر از کاربر خواسته نمی‌شود.
// ============================================================================


const UPDATE_REPO = 'miladjahani/Miliconfigpro';
const UPDATE_BRANCH = 'main';
const UPDATE_MANIFEST_PATH = 'version.json';
const UPDATE_BUNDLE_PATH = '_worker.js';
const UPDATE_REPO_URL = 'https://github.com/' + UPDATE_REPO;

// چند آینه: اگر raw.githubusercontent فیلتر یا کش‌شده باشد، jsDelivr و githack هم امتحان می‌شوند
function mirrorUrls(path, options = {}) {
  const clean = String(path || '').replace(/^\/+/, '');
  const bust = options.bust ? `?cb=${Date.now()}` : '';
  return [
    `https://raw.githubusercontent.com/${UPDATE_REPO}/${UPDATE_BRANCH}/${clean}${bust}`,
    `https://cdn.jsdelivr.net/gh/${UPDATE_REPO}@${UPDATE_BRANCH}/${clean}${bust}`,
    `https://raw.githack.com/${UPDATE_REPO}/${UPDATE_BRANCH}/${clean}${bust}`
  ];
}

const MANIFEST_CACHE_MS = 10 * 60 * 1000;
let manifestCache = { at: 0, value: null };

// مقایسهٔ نسخه‌ها به‌صورت عددی: 3.10.0 > 3.9.9
function compareVersions(a = '', b = '') {
  const norm = value => String(value || '')
    .replace(/^v/i, '')
    .split(/[.+-]/)
    .map(part => parseInt(part, 10))
    .map(n => (Number.isFinite(n) ? n : 0));
  const left = norm(a);
  const right = norm(b);
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i++) {
    const l = left[i] || 0;
    const r = right[i] || 0;
    if (l > r) return 1;
    if (l < r) return -1;
  }
  return 0;
}

function currentVersionLabel() {
  return String(VERSION || '').replace(/^v/i, '');
}

// دریافت متن از اولین آینهٔ سالم (دو دور تلاش)
async function fetchTextWithFallback(paths, options = {}) {
  const timeout = options.timeout || 9000;
  const rounds = options.rounds || 2;
  for (let attempt = 0; attempt < rounds; attempt++) {
    for (const url of paths) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'miliconfig-updater',
            'Cache-Control': 'no-cache',
            ...(options.headers || {})
          },
          signal: controller.signal
        });
        clearTimeout(timer);
        if (!response.ok) continue;
        const text = await response.text();
        if (text && text.trim()) return { text, url };
      } catch (_e) {}
    }
    if (attempt < rounds - 1) await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

// مانیفست از همهٔ آینه‌ها همزمان خوانده و «بالاترین نسخه» انتخاب می‌شود؛
// چون CDN گیت‌هاب گاهی چند دقیقه نسخهٔ قدیمی را نگه می‌دارد و اگر فقط اولین
// پاسخ سالم را بگیریم، نسخهٔ تازه دیده نمی‌شود.
async function fetchManifest(force = false, env = {}) {
  if (!force && manifestCache.value && Date.now() - manifestCache.at < MANIFEST_CACHE_MS) {
    return manifestCache.value;
  }
  const custom = String(env?.UPDATE_MANIFEST_URL || '').trim();
  const urls = custom
    ? [custom, ...mirrorUrls(UPDATE_MANIFEST_PATH, { bust: true })]
    : mirrorUrls(UPDATE_MANIFEST_PATH, { bust: true });
  const results = await Promise.all(urls.map(async url => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4500);
      const response = await fetch(url, {
        headers: { 'User-Agent': 'miliconfig-updater', 'Cache-Control': 'no-cache' },
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!response.ok) return null;
      const data = await response.json();
      return data && data.version ? data : null;
    } catch (_e) {
      return null;
    }
  }));
  const valid = results.filter(Boolean);
  if (!valid.length) return null;
  const best = valid.reduce((top, item) => (compareVersions(item.version, top.version) > 0 ? item : top));
  manifestCache = { at: Date.now(), value: best };
  return best;
}

// ---------------------------------------------------------------------------
// توکن و هدف استقرار
// ---------------------------------------------------------------------------

function getUpdateTarget(cfg = {}, env = {}, options = {}) {
  const token = String(options.token || env?.CF_API_TOKEN || env?.CLOUDFLARE_API_TOKEN || '').trim();
  const accountId = String(cfg.cfAccountId || options.accountId || env?.CF_ACCOUNT_ID || env?.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const scriptName = String(
    cfg.cfScriptName || options.scriptName || env?.CF_SCRIPT_NAME || env?.WORKER_NAME || ''
  ).trim();
  return {
    token,
    accountId,
    scriptName,
    ready: Boolean(token),
    missing: [
      !token ? 'CF_API_TOKEN' : '',
      !scriptName ? 'نام اسکریپت (خودکار از دامنه تشخیص داده می‌شود)' : ''
    ].filter(Boolean)
  };
}

// اعتبارسنجی توکن با endpoint رسمی کلادفلر
async function verifyUpdateToken(token = '') {
  const value = String(token || '').trim();
  if (!value) return { valid: false, error: 'توکن خالی است' };
  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
      headers: { Authorization: 'Bearer ' + value, 'User-Agent': 'miliconfig-updater' }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      return { valid: false, error: 'توکن معتبر نیست یا دسترسی لازم را ندارد' };
    }
    return { valid: true, status: data.result?.status || 'active' };
  } catch (err) {
    return { valid: false, error: 'خطای شبکه در بررسی توکن: ' + (err?.message || String(err)) };
  }
}

// اگر Account ID تنظیم نشده باشد، از روی توکن پیدا می‌شود
async function resolveAccountId(token = '', current = '') {
  if (current) return { accountId: current, detected: false };
  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/accounts', {
      headers: { Authorization: 'Bearer ' + token, 'User-Agent': 'miliconfig-updater' }
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success && Array.isArray(data.result) && data.result.length) {
      return { accountId: data.result[0].id, detected: true };
    }
    return { accountId: '', detected: false, error: 'حسابی با این توکن پیدا نشد' };
  } catch (err) {
    return { accountId: '', detected: false, error: err?.message || String(err) };
  }
}

// نام اسکریپت از دامنهٔ درخواست: <script>.<subdomain>.workers.dev
function inferScriptName(hostname = '') {
  const host = String(hostname || '').trim().toLowerCase();
  if (!host) return '';
  if (host.endsWith('.workers.dev')) return host.split('.')[0];
  return '';
}

async function cfGet(path, token) {
  try {
    const response = await fetch('https://api.cloudflare.com/client/v4' + path, {
      headers: { Authorization: 'Bearer ' + token, 'User-Agent': 'miliconfig-updater' }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      return { ok: false, detail: cloudflareErrorDetail(response.status, data) };
    }
    return { ok: true, result: data.result };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

// نام اسکریپت وقتی دامنه workers.dev نیست (دامنهٔ اختصاصی یا مسیر سفارشی):
// از Custom Domains و Routes خود حساب پیدا می‌شود و در آخر اگر حساب فقط یک
// اسکریپت داشته باشد همان انتخاب می‌شود.
async function resolveScriptName(accountId, token, hostname = '') {
  const host = String(hostname || '').trim().toLowerCase();
  if (!accountId || !token) return { scriptName: '', source: '' };
  if (host) {
    const domains = await cfGet(`/accounts/${encodeURIComponent(accountId)}/workers/domains`, token);
    if (domains.ok && Array.isArray(domains.result)) {
      const hit = domains.result.find(d => String(d.hostname || '').toLowerCase() === host);
      if (hit && hit.service) return { scriptName: hit.service, source: 'دامنهٔ اختصاصی' };
    }
    const routes = await cfGet(`/accounts/${encodeURIComponent(accountId)}/workers/routes`, token);
    if (routes.ok && Array.isArray(routes.result)) {
      const hit = routes.result.find(r => {
        const pattern = String(r.pattern || '').toLowerCase();
        if (!pattern) return false;
        if (pattern.startsWith(host)) return true;
        const base = pattern.replace(/\/\*$/, '').replace(/\*.*$/, '').replace(/^\*\./, '');
        return Boolean(base) && (host === base || host.endsWith('.' + base));
      });
      if (hit && hit.script) return { scriptName: hit.script, source: 'مسیر (Route)' };
    }
  }
  const scripts = await cfGet(`/accounts/${encodeURIComponent(accountId)}/workers/scripts`, token);
  if (scripts.ok && Array.isArray(scripts.result) && scripts.result.length === 1) {
    const only = scripts.result[0];
    const name = only?.id || only?.name || '';
    if (name) return { scriptName: name, source: 'تنها اسکریپت حساب' };
  }
  return {
    scriptName: '',
    source: '',
    error: 'نام اسکریپت پیدا نشد؛ متغیر WORKER_NAME را روی ورکر با نام دقیق اسکریپت تنظیم کنید.'
  };
}

// ---------------------------------------------------------------------------
// بررسی نسخه
// ---------------------------------------------------------------------------

async function checkForUpdate(cfg = {}, env = {}, options = {}) {
  const manifest = await fetchManifest(options.force === true, env);
  const token = String(options.token || env?.CF_API_TOKEN || '').trim();
  const scriptName = String(cfg.cfScriptName || options.scriptName || env?.CF_SCRIPT_NAME || env?.WORKER_NAME || '').trim();
  const accountId = String(cfg.cfAccountId || env?.CF_ACCOUNT_ID || '').trim();
  const base = {
    current: currentVersionLabel(),
    hasToken: Boolean(token),
    autoUpdate: String(cfg.autoUpdate || 'no') === 'yes',
    scriptName,
    accountIdTail: accountId ? accountId.slice(-6) : ''
  };
  if (!manifest) {
    return {
      ...base,
      success: false,
      updateAvailable: false,
      error: 'دریافت فهرست نسخه‌ها از گیت‌هاب ممکن نشد؛ دسترسی به گیت‌هاب/آینه‌ها را بررسی کنید.',
      autoApplyAvailable: Boolean(token),
      missing: [token ? '' : 'CF_API_TOKEN', scriptName ? '' : 'نام اسکریپت'].filter(Boolean)
    };
  }
  const latest = String(manifest.version || base.current);
  return {
    ...base,
    success: true,
    latest,
    build: manifest.build || '',
    publishedAt: manifest.publishedAt || '',
    notes: Array.isArray(manifest.notes) ? manifest.notes : [],
    repo: manifest.repo || UPDATE_REPO_URL,
    updateAvailable: compareVersions(latest, base.current) > 0,
    autoApplyAvailable: Boolean(token),
    missing: [token ? '' : 'CF_API_TOKEN', scriptName ? '' : 'نام اسکریپت'].filter(Boolean)
  };
}

// ---------------------------------------------------------------------------
// استقرار نسخهٔ تازه (با حفظ بایندینگ‌ها)
// ---------------------------------------------------------------------------

const KEEP_BINDING_TYPES = ['d1', 'kv_namespace', 'plain_text', 'r2_bucket', 'queue', 'service', 'analytics_engine', 'durable_object_namespace'];

function normalizeBinding(binding = {}) {
  if (!binding || !binding.type || !binding.name) return null;
  if (!KEEP_BINDING_TYPES.includes(binding.type)) return null;
  const out = { type: binding.type, name: binding.name };
  if (binding.type === 'd1') out.id = binding.database_id || binding.id || '';
  else if (binding.type === 'kv_namespace') out.namespace_id = binding.namespace_id || binding.id || '';
  else if (binding.type === 'plain_text') out.text = binding.text || '';
  else if (binding.type === 'r2_bucket') out.bucket_name = binding.bucket_name || binding.name;
  else if (binding.type === 'service') out.service = binding.service || '';
  else if (binding.type === 'queue') out.queue_name = binding.queue_name || '';
  else if (binding.type === 'durable_object_namespace') {
    out.class_name = binding.class_name || '';
    out.script_name = binding.script_name || '';
  }
  if (binding.type === 'd1' && !out.id) return null;
  if (binding.type === 'kv_namespace' && !out.namespace_id) return null;
  return out;
}

// تنظیمات فعلی اسکریپت: هم بایندینگ‌ها و هم compatibility_date/flags را می‌دهد
// تا نسخهٔ تازه با همان محیط اجرا مستقر شود.
async function fetchScriptSettings(accountId, scriptName, token) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/workers/scripts/${encodeURIComponent(scriptName)}/settings`,
      { headers: { Authorization: 'Bearer ' + token, 'User-Agent': 'miliconfig-updater' } }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      const detail = cloudflareErrorDetail(response.status, data);
      return { ok: false, error: 'دسترسی به تنظیمات ورکر ممکن نشد: ' + detail.message, cloudflare: detail };
    }
    const settings = data.result || {};
    return { ok: true, settings, bindings: Array.isArray(settings.bindings) ? settings.bindings : [] };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

// پیام و کد خطای کلادفلر را بدون لاپوشانی برمی‌گرداند (برای گزارش دقیق به کاربر)
function cloudflareErrorDetail(status, data) {
  const first = (Array.isArray(data?.errors) && data.errors[0]) || {};
  const code = first.code || status;
  const message = first.message || (status ? `HTTP ${status}` : 'خطای نامشخص');
  const hints = {
    10000: 'توکن معتبر نیست یا منقضی شده است (Authentication error).',
    10007: 'دسترسی توکن کافی نیست؛ Workers Scripts:Edit لازم است.',
    10062: 'حجم اسکریپت از سقف پلن کلادفلر بیشتر است.',
    10063: 'فرمت/محتوای اسکریپت پذیرفته نشد.',
    10066: 'محدودیت تعداد اسکریپت‌های پلن پر شده است.',
    10021: 'یکی از بایندینگ‌ها برای این حساب معتبر نیست.',
    10090: 'ورکر به محدودیت پلن خورده است.',
    7000: 'شناسه یا نام حساب/اسکریپت پیدا نشد.',
    7003: 'مسیر درخواست پیدا نشد؛ نام اسکریپت (WORKER_NAME) را بررسی کنید.'
  };
  return { ok: false, status, code, message, hint: hints[Number(code)] || '' };
}

// دریافت باندل تازه (برای دانلود مستقیم فایل نسخهٔ جدید از پنل)
async function fetchLatestBundle(env = {}) {
  const customBundle = String(env?.UPDATE_BUNDLE_URL || '').trim();
  const bundle = await fetchTextWithFallback(
    customBundle ? [customBundle, ...mirrorUrls(UPDATE_BUNDLE_PATH, { bust: true })] : mirrorUrls(UPDATE_BUNDLE_PATH, { bust: true }),
    { timeout: 20000 }
  );
  if (!bundle || !bundle.text || bundle.text.length < 50000) return null;
  return bundle;
}

async function applyUpdate(cfg = {}, env = {}, options = {}) {
  const token = String(options.token || env?.CF_API_TOKEN || '').trim();
  const hostScriptName = String(options.hostScriptName || '').trim();
  let scriptName = String(
    cfg.cfScriptName || env.CF_SCRIPT_NAME || env.WORKER_NAME || inferScriptName(hostScriptName) || ''
  ).trim();
  let scriptSource = scriptName ? 'تنظیمات ورکر/پنل' : '';

  if (!token) {
    // هیچ ورودی حساب کلودفلر از کاربر خواسته نمی‌شود؛ نسخهٔ تازه به‌صورت
    // فایل قابل دانلود و دستور آمادهٔ استقرار برگردانده می‌شود.
    const info = await checkForUpdate(cfg, env, { force: true });
    const latest = info?.latest || '';
    const target = inferScriptName(hostScriptName) || 'نام-ورکر-شما';
    const mirror = mirrorUrls(UPDATE_BUNDLE_PATH, { bust: true })[0];
    return {
      success: false,
      needsManualDeploy: true,
      latest,
      // فایل از همین پنل و با Content-Disposition دانلود می‌شود، نه باز شدن فایل خام
      downloadPath: '/api/update-bundle',
      fileName: 'miliconfig-worker.js',
      mirrorUrl: mirror,
      command: `curl -fsSL ${mirror} -o _worker.js && npx wrangler deploy _worker.js --name ${target}`,
      error: latest
        ? `نسخهٔ ${latest} آماده است؛ نصب خودکار بدون کلید ورکر انجام نمی‌شود. فایل نسخهٔ تازه دانلود شد — آن را در داشبورد کلادفلر روی همین ورکر مستقر کنید.`
        : 'نصب خودکار روی این استقرار ممکن نیست؛ فایل نسخهٔ تازه دانلود شد تا خودتان روی ورکر مستقر کنید.',
      steps: [
        'فایل نسخهٔ تازه (miliconfig-worker.js) ذخیره شد.',
        'در داشبورد کلادفلر → Workers & Pages → همین ورکر → Edit code → محتوای فایل را جای‌گذاری کنید.',
        'دکمهٔ Deploy را بزنید. بایندینگ‌ها و D1 دست‌نخورده می‌مانند.',
        'برای نصب یک‌کلیکی، کلید CF_API_TOKEN را در متغیرهای همین ورکر تعریف کنید.'
      ],
      missing: []
    };
  }
  const info = await checkForUpdate(cfg, env, { force: true, token, scriptName });
  if (!info.success && !options.force) return { success: false, error: info.error };
  if (info.success && !info.updateAvailable && !options.force) {
    return { success: true, alreadyLatest: true, message: `نسخهٔ نصب‌شده (${info.current}) به‌روز است.` };
  }

  // قبل از هر تغییری، معتبر بودن کلید بررسی می‌شود تا خطا شفاف گزارش شود
  const tokenCheck = await verifyUpdateToken(token);
  if (!tokenCheck.valid) {
    return {
      success: false,
      error: 'کلید CF_API_TOKEN معتبر نیست: ' + (tokenCheck.error || 'دسترسی کافی ندارد') + ' — کلیدی با دسترسی Workers Scripts:Edit و Account Settings:Read بسازید.',
      diagnose: true
    };
  }

  const account = await resolveAccountId(token, String(cfg.cfAccountId || env.CF_ACCOUNT_ID || '').trim());
  if (!account.accountId) {
    return {
      success: false,
      error: 'Account ID پیدا نشد: ' + (account.error || 'توکن را بررسی کنید') + ' — کلید را با دسترسی Account Settings:Read بسازید یا CF_ACCOUNT_ID را روی ورکر تعریف کنید.',
      diagnose: true
    };
  }

  // روی دامنهٔ اختصاصی، نام اسکریپت از دامنه/مسیرهای خود حساب پیدا می‌شود
  if (!scriptName) {
    const resolved = await resolveScriptName(account.accountId, token, hostScriptName);
    if (resolved.scriptName) {
      scriptName = resolved.scriptName;
      scriptSource = resolved.source || '';
    } else {
      return {
        success: false,
        error: resolved.error || 'نام اسکریپت Workers مشخص نیست؛ متغیر WORKER_NAME را روی ورکر تنظیم کنید.',
        missing: ['WORKER_NAME'],
        diagnose: true
      };
    }
  }

  const customBundle = String(env?.UPDATE_BUNDLE_URL || '').trim();
  const bundle = await fetchTextWithFallback(
    customBundle ? [customBundle, ...mirrorUrls(UPDATE_BUNDLE_PATH, { bust: true })] : mirrorUrls(UPDATE_BUNDLE_PATH, { bust: true }),
    { timeout: 20000 }
  );
  if (!bundle) return { success: false, error: 'دریافت باندل تازه از گیت‌هاب و آینه‌ها ناموفق بود.' };
  if (bundle.text.length < 50000) {
    return { success: false, error: 'باندل دریافتی معتبر نیست (حجم غیرمنتظره).' };
  }

  // بایندینگ‌ها و تنظیمات فعلی حفظ می‌شوند تا D1 و متغیرها بعد از آپدیت از بین نروند
  const current = await fetchScriptSettings(account.accountId, scriptName, token);
  if (!current.ok) {
    return {
      success: false,
      error: 'قبل از آپدیت باید دسترسی خواندن تنظیمات ورکر وجود داشته باشد: ' + current.error,
      cloudflare: current.cloudflare || null
    };
  }
  const bindings = [];
  const keepTypes = new Set(['secret_text']);
  for (const raw of current.bindings) {
    // مقادیر محرمانه هرگز در بدنهٔ آپلود نمی‌روند؛ با keep_bindings سر جایشان می‌مانند
    if (raw?.type === 'secret_text') continue;
    const normalized = normalizeBinding(raw);
    if (normalized) {
      bindings.push(normalized);
    } else if (raw?.type) {
      // بایندینگ‌هایی که نمی‌توانیم بازسازی کنیم حذف نمی‌شوند؛ نوعشان نگه داشته می‌شود
      keepTypes.add(String(raw.type));
    }
  }

  const moduleName = `worker_${Math.random().toString(36).slice(2, 10)}.js`;
  const settings = current.settings || {};
  const compatFlags = Array.isArray(settings.compatibility_flags) ? settings.compatibility_flags : [];
  const metadata = {
    main_module: moduleName,
    compatibility_date: settings.compatibility_date || '2024-09-23',
    ...(compatFlags.length ? { compatibility_flags: compatFlags } : {}),
    bindings,
    // کلیدهای محرمانه و بایندینگ‌های خاص موجود دست‌نخورده می‌مانند
    keep_bindings: [...keepTypes],
    ...(settings.placement && settings.placement.mode ? { placement: { mode: settings.placement.mode } } : {}),
    ...(settings.limits && settings.limits.cpu_ms ? { limits: { cpu_ms: settings.limits.cpu_ms } } : {}),
    ...(settings.observability && settings.observability.enabled ? { observability: { enabled: true } } : {}),
    // اگر ورکر فایل‌های استاتیک دارد، دست‌نخورده بمانند
    ...(settings.assets ? { keep_assets: true } : {})
  };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }), 'metadata.json');
  form.append(moduleName, new Blob([bundle.text], { type: 'application/javascript+module' }), moduleName);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account.accountId)}/workers/scripts/${encodeURIComponent(scriptName)}`,
      {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token, 'User-Agent': 'miliconfig-updater' },
        body: form
      }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      const detail = cloudflareErrorDetail(response.status, data);
      return {
        success: false,
        error: 'آپلود به کلادفلر ناموفق بود: ' + detail.message + (detail.hint ? ' — ' + detail.hint : ''),
        cloudflare: detail,
        scriptName,
        accountTail: account.accountId.slice(-6)
      };
    }
    return {
      success: true,
      updated: true,
      from: info.current,
      to: info.latest || currentVersionLabel(),
      bytes: bundle.text.length,
      scriptName,
      scriptSource,
      accountDetected: account.detected,
      mirrors: bundle.url,
      message: `نسخهٔ ${info.latest || 'تازه'} روی اسکریپت «${scriptName}» مستقر شد${account.detected ? ' (Account ID خودکار شناسایی شد)' : ''}.`
    };
  } catch (err) {
    return { success: false, error: 'خطای شبکه در آپلود: ' + (err?.message || String(err)) };
  }
}

// ---------------------------------------------------------------------------
// تشخیص نصب خودکار: دقیقاً می‌گوید کدام مرحله می‌شکند و چرا
// ---------------------------------------------------------------------------

async function inspectUpdateTarget(cfg = {}, env = {}, options = {}) {
  const token = String(options.token || env?.CF_API_TOKEN || env?.CLOUDFLARE_API_TOKEN || '').trim();
  const hostname = String(options.hostScriptName || '').trim();
  const configured = String(cfg.cfScriptName || env?.CF_SCRIPT_NAME || env?.WORKER_NAME || '').trim();
  const inferred = inferScriptName(hostname);
  const scriptName = configured || inferred;
  const accountHint = String(cfg.cfAccountId || env?.CF_ACCOUNT_ID || env?.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const result = {
    success: true,
    hostname,
    tokenPresent: Boolean(token),
    tokenValid: false,
    tokenStatus: '',
    tokenError: '',
    accountId: '',
    accountTail: '',
    accountDetected: false,
    accountError: '',
    scriptName,
    scriptSource: configured ? 'ورکر (CF_SCRIPT_NAME / WORKER_NAME / preset)' : (inferred ? 'از دامنهٔ workers.dev' : ''),
    bindings: [],
    bindingCount: 0,
    bindingsError: '',
    compatibilityDate: '',
    compatibilityFlags: [],
    current: currentVersionLabel(),
    latest: '',
    updateAvailable: false,
    canAutoDeploy: false,
    steps: []
  };

  if (!token) {
    result.steps.push('کلید CF_API_TOKEN روی ورکر تعریف نشده است، پس نصب خودکار از داخل پنل ممکن نیست؛ فایل نسخهٔ تازه را دانلود کنید و مستقر کنید.');
    return result;
  }

  const verify = await verifyUpdateToken(token);
  result.tokenValid = verify.valid === true;
  result.tokenStatus = verify.status || '';
  result.tokenError = verify.error || '';
  if (!verify.valid) {
    result.steps.push('کلید موجود معتبر نیست یا منقضی شده؛ یک API Token با دسترسی Workers Scripts:Edit بسازید.');
    return result;
  }
  result.steps.push('کلید معتبر است.');

  const account = await resolveAccountId(token, accountHint);
  result.accountId = account.accountId || '';
  result.accountTail = account.accountId ? account.accountId.slice(-6) : '';
  result.accountDetected = account.detected === true;
  result.accountError = account.error || '';
  if (!result.accountId) {
    result.steps.push('Account ID پیدا نشد: کلید به account:read دسترسی ندارد؛ کلید را کامل‌تر بسازید یا CF_ACCOUNT_ID را روی ورکر تعریف کنید.');
    return result;
  }

  if (!result.scriptName) {
    const resolved = await resolveScriptName(result.accountId, token, hostname);
    if (resolved.scriptName) {
      result.scriptName = resolved.scriptName;
      result.scriptSource = resolved.source || '';
      result.steps.push('نام اسکریپت از ' + (resolved.source || 'حساب') + ' شناسایی شد.');
    } else {
      result.steps.push(resolved.error || 'نام اسکریپت مشخص نیست؛ متغیر WORKER_NAME یا CF_SCRIPT_NAME را روی ورکر تعریف کنید.');
      return result;
    }
  }

  const settings = await fetchScriptSettings(result.accountId, result.scriptName, token);
  if (!settings.ok) {
    result.bindingsError = settings.error || '';
    result.steps.push('خواندن تنظیمات اسکریپت ناموفق بود: ' + (settings.error || '') + (settings.cloudflare?.hint ? ' — ' + settings.cloudflare.hint : ''));
    return result;
  }
  result.bindings = settings.bindings.map(b => ({ name: b.name, type: b.type }));
  result.bindingCount = result.bindings.length;
  result.compatibilityDate = settings.settings?.compatibility_date || '';
  result.compatibilityFlags = Array.isArray(settings.settings?.compatibility_flags) ? settings.settings.compatibility_flags : [];

  const info = await checkForUpdate(cfg, env, { token, scriptName: result.scriptName });
  result.current = info.current;
  result.latest = info.latest || '';
  result.updateAvailable = info.updateAvailable === true;
  result.canAutoDeploy = true;
  result.steps.push('همهٔ پیش‌نیازها آماده است؛ دکمهٔ «نصب خودکار» نسخهٔ ' + (result.latest || 'تازه') + ' را مستقر می‌کند.');
  return result;
}

// در کرون: اگر بروزرسانی خودکار روشن و توکن موجود باشد، نسخهٔ تازه مستقر می‌شود
async function autoUpdateIfEnabled(cfg = {}, env = {}, options = {}) {
  if (String(cfg.autoUpdate || 'no') !== 'yes') return { skipped: 'disabled' };
  const token = String(options.token || env?.CF_API_TOKEN || '').trim();
  if (!token) return { skipped: 'no-token' };
  const info = await checkForUpdate(cfg, env, { token });
  if (!info.success) return { skipped: 'manifest-unreachable' };
  if (!info.updateAvailable) return { skipped: 'up-to-date', current: info.current };
  return await applyUpdate(cfg, env, { token, hostScriptName: options.hostScriptName });
}


// --- MODULE: src/core/proxyGeo.js ---
// ============================================================================
// اعتبارسنجی واقعی پروکسی‌های کشوری
// به‌جای اعتماد به برچسب فایل منبع، از طریق خود پروکسی به trace کلادفلر وصل می‌شویم
// و کد کشور خروجی (loc) را می‌خوانیم. فقط پروکسی‌ای که loc آن با کشور یکی باشد
// «تأییدشده» است؛ بقیه یا مرده‌اند یا کشورشان چیز دیگری است.
// ============================================================================

const PROXY_PROBE_HOST = 'www.cloudflare.com';
const PROXY_PROBE_PATH = '/cdn-cgi/trace';
const PROXY_PROBE_TIMEOUT_MS = 2600;
const PROXY_PROBE_MAX_ACTIVE = 5; // سقف اتصال هم‌زمان خروجی در هر درخواست ورکر

let activeProbes = 0;
const probeWaiters = [];

function acquireProbeSlot() {
  if (activeProbes < PROXY_PROBE_MAX_ACTIVE) {
    activeProbes++;
    return Promise.resolve();
  }
  return new Promise(resolve => probeWaiters.push(resolve));
}

function releaseProbeSlot() {
  const next = probeWaiters.shift();
  if (next) next();
  else activeProbes = Math.max(0, activeProbes - 1);
}

function withProbeTimeout(promise, ms) {
  const wait = Math.max(120, Number(ms) || PROXY_PROBE_TIMEOUT_MS);
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('proxy probe timeout')), wait);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// خروجی: کد دوحرفی کشور یا null (مرده/نامعتبر/بدون پاسخ)
async function probeProxyExitCountry(proxyUrl, timeoutMs = PROXY_PROBE_TIMEOUT_MS) {
  let cfg = null;
  try {
    cfg = parseOutboundProxyConfig(proxyUrl);
  } catch (_e) {
    return null;
  }
  if (!cfg) return null;

  let sock = null;
  try {
    sock = await withProbeTimeout(connectViaOutboundProxy(1, PROXY_PROBE_HOST, 80, cfg), timeoutMs);
    const writer = sock.writable.getWriter();
    const reader = sock.readable.getReader();
    try {
      const request = [
        `GET ${PROXY_PROBE_PATH} HTTP/1.1`,
        `Host: ${PROXY_PROBE_HOST}`,
        'User-Agent: curl/8.5.0',
        'Accept: */*',
        'Connection: close',
        '',
        ''
      ].join('\r\n');
      await withProbeTimeout(writer.write(new TextEncoder().encode(request)), timeoutMs);
      let acc = '';
      for (let i = 0; i < 8 && acc.length < 4096; i++) {
        const { value, done } = await withProbeTimeout(reader.read(), timeoutMs);
        if (done || !value) break;
        acc += new TextDecoder().decode(value);
        const match = /(?:^|\n)loc=([A-Z]{2})/.exec(acc);
        if (match) return match[1];
      }
      return null;
    } finally {
      try { writer.releaseLock(); } catch (_e) {}
      try { reader.releaseLock(); } catch (_e) {}
    }
  } catch (_e) {
    return null;
  } finally {
    try { sock?.close(); } catch (_e) {}
  }
}

// تست گروهی با سقف هم‌زمانی و مهلت کلی؛ به‌محض رسیدن به «need» متوقف می‌شود
async function verifyCountryProxies(proxies = [], options = {}) {
  const list = [...new Set((Array.isArray(proxies) ? proxies : []).filter(Boolean))];
  if (list.length === 0) return [];
  const need = Math.max(1, parseInt(options.need, 10) || 4);
  const timeoutMs = Math.max(600, parseInt(options.timeoutMs, 10) || PROXY_PROBE_TIMEOUT_MS);
  const deadline = Number(options.deadline) || Date.now() + 3500;

  const verified = [];
  let cursor = 0;

  const worker = async () => {
    while (cursor < list.length && verified.length < need && Date.now() < deadline) {
      const proxy = list[cursor++];
      await acquireProbeSlot();
      try {
        const budget = Math.min(timeoutMs, deadline - Date.now());
        if (budget <= 0) break;
        const country = await probeProxyExitCountry(proxy, budget);
        if (country) verified.push({ proxy, country });
      } finally {
        releaseProbeSlot();
      }
    }
  };

  const workers = Array.from({ length: Math.min(6, list.length) }, () => worker().catch(() => {}));
  await Promise.all(workers);
  return verified;
}


// --- MODULE: src/core/edgePool.js ---
// ============================================================================
// miliconfig - استخر یکپارچه منابع لبهٔ کلادفلر
//
// منابع (طبق درخواست کاربر، هر دو مخزن کامل مطالعه شده‌اند):
//   • منابع ترجیحی داخلی          → ۲۱ دامنهٔ ترجیحی، ۱۰ آی‌پی اتصال رسمی،
//                                       ۱۴ ProxyIP منطقه‌ای، فهرست آنلاین bestip
//   • آینهٔ لبهٔ عمومی             → ips.txt (IPv4)، ip6.txt (IPv6)،
//                                       dom.txt (دامنه لبه)، ech_dom.txt و
//                                       ech_dns.txt (دامنه/DNS برای ECH)
//
// قواعد مهم:
//   ۱) آی‌پی‌ها با رنج‌های رسمی کلادفلر فیلتر می‌شوند؛ لیست‌های عمومی حاوی
//      آی‌پی‌های غیرکلادفلر هم هستند و آدرس‌کردن آن‌ها نود را خراب می‌کند.
//   ۲) پاسخ فوری از فهرست داخلی ساخته می‌شود و لیست‌های تازه در پس‌زمینه
//      (waitUntil) جایگزین می‌شوند؛ مسیر ساب‌لینک هیچ‌وقت منتظر شبکه نمی‌ماند.
//   ۳) نتیجه ۳۰ دقیقه در حافظهٔ ایزوله و در Cache API نگه داشته می‌شود.
// ============================================================================


// استخرهای cfnew چند بار در روز عوض می‌شوند؛ با TTL متعادل هم از سقف subrequest
// کلادفلر محافظت می‌شود و هم نودها همیشه به‌روز می‌مانند.
const POOL_TTL_MS = 15 * 60 * 1000;
const POOL_FETCH_TIMEOUT_MS = 2200;
// حداکثر صبر یک ایزولهٔ سرد برای گرفتن لیست زنده (بعد از آن همان استخر داخلی)
// کوتاه است تا ساب‌لینک کند نشود؛ لیست زنده در همان درخواست بعدی می‌نشیند.
const POOL_COLD_WAIT_MS = 600;
const POOL_MAX_CHARS = 180000;
const POOL_MAX_ITEMS = 240;
const POOL_CACHE_BASE = 'https://edge-pool.miliconfig.internal';

// رنج‌های رسمی کلادفلر (cloudflare.com/ips-v4 و ips-v6)
const CF_IPV4_CIDRS = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'
];
const CF_IPV6_CIDRS = [
  '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
  '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32'
];

function poolIpv4ToInt(ip) {
  const parts = String(ip).split('.');
  if (parts.length !== 4) return -1;
  let value = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return -1;
    value = value * 256 + n;
  }
  return value;
}

const IPV4_RANGES = CF_IPV4_CIDRS.map(cidr => {
  const [base, bits] = cidr.split('/');
  const prefix = Number(bits) || 32;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return { base: poolIpv4ToInt(base) & mask, mask };
});

function isCloudflareIpv4(ip) {
  const value = poolIpv4ToInt(ip);
  if (value < 0) return false;
  return IPV4_RANGES.some(range => (value & range.mask) === range.base);
}

function isCloudflareIpv6(ip) {
  const text = String(ip || '').toLowerCase().replace(/^\[|\]$/g, '');
  if (!text.includes(':')) return false;
  const expanded = poolExpandIpv6(text);
  if (!expanded) return false;
  return CF_IPV6_CIDRS.some(cidr => {
    const [base, bits] = cidr.split('/');
    const prefixBits = Number(bits) || 128;
    const baseExpanded = poolExpandIpv6(base.toLowerCase());
    if (!baseExpanded) return false;
    return expanded.slice(0, prefixBits) === baseExpanded.slice(0, prefixBits);
  });
}

// تبدیل IPv6 به رشتهٔ ۱۲۸ بیتی (هر کاراکتر یک بیت) برای مقایسهٔ پیشوندی
function poolExpandIpv6(input) {
  const [headRaw, tailRaw] = String(input).split('::');
  const head = headRaw ? headRaw.split(':').filter(Boolean) : [];
  const tail = tailRaw ? tailRaw.split(':').filter(Boolean) : [];
  if (head.length + tail.length > 8) return '';
  const groups = [
    ...head,
    ...Array(Math.max(0, 8 - head.length - tail.length)).fill('0'),
    ...tail
  ];
  let bits = '';
  for (const group of groups) {
    const n = parseInt(group || '0', 16);
    if (!Number.isFinite(n)) return '';
    bits += n.toString(2).padStart(16, '0');
  }
  return bits;
}

function isCloudflareAddress(host) {
  if (isValidIpAddress(host) || /^\d{1,3}(\.\d{1,3}){3}$/.test(String(host))) {
    return String(host).includes(':') ? isCloudflareIpv6(host) : isCloudflareIpv4(host);
  }
  return false;
}

async function readPoolTextLimited(response, maxChars) {
  const reader = response.body?.getReader?.();
  if (!reader) {
    const text = await response.text();
    return text.slice(0, maxChars);
  }
  const decoder = new TextDecoder();
  let out = '';
  let done = false;
  while (!done && out.length < maxChars) {
    const chunk = await reader.read();
    done = chunk.done;
    if (chunk.value) out += decoder.decode(chunk.value, { stream: !done });
  }
  try { reader.cancel(); } catch (_e) {}
  return out.slice(0, maxChars);
}

async function poolFetchText(url, timeout = POOL_FETCH_TIMEOUT_MS) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!response.ok) return '';
    return await readPoolTextLimited(response, POOL_MAX_CHARS);
  } catch (_e) {
    return '';
  }
}

function poolPushUnique(list, seen, value, limit = POOL_MAX_ITEMS) {
  if (list.length >= limit) return;
  if (!value || seen.has(value)) return;
  seen.add(value);
  list.push(value);
}

// فهرست داخلی فوری — همیشه در دسترس، بدون هیچ درخواست شبکه‌ای
function poolBuiltin() {
  const ipv4 = [];
  const ipv4Seen = new Set();
  for (const ip of DIRECT_EDGE_IPS) poolPushUnique(ipv4, ipv4Seen, ip);
  for (const ip of OFFICIAL_DIRECT_IPS) poolPushUnique(ipv4, ipv4Seen, ip);

  const ipv6 = [];
  const ipv6Seen = new Set();
  for (const ip of OFFICIAL_DIRECT_IPV6) poolPushUnique(ipv6, ipv6Seen, ip);

  const domains = [];
  const domainSeen = new Set();
  for (const domain of PREFERRED_EDGE_DOMAINS) poolPushUnique(domains, domainSeen, domain, 120);
  for (const item of DIRECT_DOMAINS) poolPushUnique(domains, domainSeen, item.domain, 120);

  const echDomains = [];
  const echSeen = new Set();
  for (const domain of ECH_DOMAINS) poolPushUnique(echDomains, echSeen, domain, 60);

  const proxyIps = EDGE_PROXY_IPS.map(item => ({ ...item, port: 443 }))
    .concat(FALLBACK_PROXY_IPS.map(item => ({ ...item })));

  return { ipv4, ipv6, domains, echDomains, echDns: [], proxyIps, origin: 'builtin' };
}

// ادغام لیست‌های تازه در استخر داخلی؛ آی‌پی‌های خارج از رنج کلادفلر دور ریخته می‌شوند
function poolMergeFetched(builtin, fetched) {
  const v4Seen = new Set(builtin.ipv4);
  const v6Seen = new Set(builtin.ipv6);
  const domSeen = new Set(builtin.domains);
  const echSeen = new Set(builtin.echDomains);
  const dnsSeen = new Set(builtin.echDns);
  const out = {
    ipv4: [...builtin.ipv4],
    ipv6: [...builtin.ipv6],
    domains: [...builtin.domains],
    echDomains: [...builtin.echDomains],
    echDns: [...builtin.echDns],
    proxyIps: [...builtin.proxyIps],
    origin: 'live'
  };

  // ProxyIP های زندهٔ فیدها (مناطق جدید مثل FR/GB یا استخرهای تازه) هم اضافه می‌شوند
  const proxySeen = new Set(out.proxyIps.map(item => String(item.domain).toLowerCase()));
  for (const item of (fetched.proxyIps || [])) {
    const domain = String(item?.domain || '').toLowerCase();
    if (!domain || proxySeen.has(domain) || !isValidDomain(domain)) continue;
    proxySeen.add(domain);
    out.proxyIps.push({ domain, region: item.region || 'Multi' });
    if (out.proxyIps.length >= 80) break;
  }

  for (const item of fetched.ipv4) {
    if (!isValidIpAddress(item) || !isCloudflareIpv4(item)) continue;
    poolPushUnique(out.ipv4, v4Seen, item, POOL_MAX_ITEMS);
  }
  for (const item of fetched.ipv6) {
    if (!isValidIpAddress(item) || !isCloudflareIpv6(item)) continue;
    poolPushUnique(out.ipv6, v6Seen, item, POOL_MAX_ITEMS);
  }
  for (const item of fetched.domains) {
    if (!isValidDomain(item)) continue;
    poolPushUnique(out.domains, domSeen, item, 160);
  }
  for (const item of fetched.echDomains) {
    if (!isValidDomain(item)) continue;
    poolPushUnique(out.echDomains, echSeen, item, 80);
  }
  for (const item of fetched.echDns) {
    if (!isValidIpAddress(item)) continue;
    poolPushUnique(out.echDns, dnsSeen, item, 40);
  }
  return out;
}

// پارس خطوط «یک آدرس در هر خط»؛ خطوط host:port#برچسب هم پشتیبانی می‌شوند
function poolParseAddressLines(text) {
  const hosts = [];
  const domains = [];
  for (const rawLine of String(text || '').split(/[\r\n]+/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('*')) continue;
    const hashIdx = line.indexOf('#');
    if (hashIdx > -1) line = line.slice(0, hashIdx).trim();
    line = line.replace(/^[a-z0-9+.-]+:\/\//i, '');
    if (line.includes('@')) line = line.split('@').pop();
    line = line.split('/')[0].trim();
    if (line.startsWith('[')) line = line.replace(/^\[|\].*$/g, '');
    else {
      const colon = line.lastIndexOf(':');
      if (colon > -1 && /^\d+$/.test(line.slice(colon + 1))) line = line.slice(0, colon);
    }
    if (!line) continue;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(line) || line.includes(':')) hosts.push(line);
    else if (isValidDomain(line) || line.includes('.')) domains.push(line);
  }
  return { hosts, domains };
}

let memoryPool = { at: 0, value: null };
let inflight = null;
let lastLiveAt = 0;

function poolGetCache() {
  try {
    return typeof caches !== 'undefined' ? caches.default : null;
  } catch (_e) {
    return null;
  }
}

// همهٔ فیدهای cfnew به‌صورت زنده خوانده می‌شوند با رعایت سخت‌گیرانه سقف subrequest کلادفلر:
// هر دسته حداکثر ۲ فید هم‌زمان (مجموعاً ۱۰ درخواست) تا هیچ‌گاه Error 1101 رخ ندهد.
async function poolFetchFresh() {
  const uniq = list => [...new Set(list.filter(Boolean))];
  const v4Urls = uniq([EDGE_MIRROR_SOURCES.ipv4, ...IP_CANDIDATE_SOURCES, ...CFNEW_IPV4_SOURCES]);
  const v6Urls = uniq([IPV6_CANDIDATE_SOURCES[0], EDGE_MIRROR_SOURCES.ipv6, ...IPV6_CANDIDATE_SOURCES, ...CFNEW_IPV6_SOURCES]);
  const domUrls = uniq([EDGE_MIRROR_SOURCES.domains, ...DOMAIN_CANDIDATE_SOURCES, EDGE_LIST_URL]);
  const proxyUrls = uniq(CFNEW_PROXYIP_SOURCES);

  const fetchMany = urls => Promise.all(urls.slice(0, 2).map(url => poolFetchText(url)));
  const [v4Texts, v6Texts, domTexts, proxyTexts, echDom, echDns] = await Promise.all([
    fetchMany(v4Urls),
    fetchMany(v6Urls),
    fetchMany(domUrls),
    fetchMany(proxyUrls),
    poolFetchText(EDGE_MIRROR_SOURCES.echDomains),
    poolFetchText(EDGE_MIRROR_SOURCES.echDns)
  ]);

  const flat = (texts) => texts.flatMap(text => {
    const parsed = poolParseAddressLines(text);
    return [...parsed.hosts, ...parsed.domains];
  });

  // ProxyIP های زندهٔ فیدها: دامنه‌های ProxyIP.* منطقه‌دار و بقیه به‌عنوان مولتی
  const proxyIps = [];
  const proxySeen = new Set();
  for (const text of proxyTexts) {
    for (const rawLine of String(text || '').split(/[\r\n]+/)) {
      let line = rawLine.trim();
      if (!line || line.length > 120) continue;
      line = line.replace(/^[a-z0-9+.-]+:\/\//i, '').split('#')[0].split('|')[0].split(',')[0].trim();
      const host = line.split('/')[0].replace(/^\[|\].*$/g, '').split(':')[0].trim().toLowerCase();
      if (!host || !isValidDomain(host) || proxySeen.has(host)) continue;
      proxySeen.add(host);
      const region = (host.match(/proxyip\.([a-z]{2})\./i) || [])[1] || '';
      proxyIps.push({ domain: host, region: region ? region.toUpperCase() : 'Multi' });
      if (proxyIps.length >= 60) break;
    }
  }

  const domParsedAll = domTexts.map(text => poolParseAddressLines(text));
  const echParsed = poolParseAddressLines(echDom);
  return {
    ipv4: [...flat(v4Texts), ...domParsedAll.flatMap(parsed => parsed.hosts)],
    ipv6: flat(v6Texts),
    domains: domParsedAll.flatMap(parsed => parsed.domains),
    echDomains: echParsed.domains,
    echDns: poolParseAddressLines(echDns).hosts,
    proxyIps
  };
}

// استخر لبه برای یک درخواست ساب‌لینک. مسیر پیش‌فرض: پاسخ فوری از استخر داخلی و
// در صورت داشتن waitUntil، تازه‌سازی در پس‌زمینه (بدون تأخیر برای کاربر).
// خواندن آخرین استخر زنده از Cache API — برای ایزولهٔ تازه که هنوز حافظه ندارد
async function poolReadCache() {
  const cache = poolGetCache();
  if (!cache) return null;
  try {
    const hit = await cache.match(`${POOL_CACHE_BASE}/v1`);
    if (!hit) return null;
    const data = await hit.json();
    if (!data || !Array.isArray(data.ipv4) || !data.ipv4.length) return null;
    return data;
  } catch (_e) {
    return null;
  }
}

async function getEdgePool(cfg = {}, options = {}) {
  const now = Date.now();
  if (memoryPool.value && now - memoryPool.at < POOL_TTL_MS) return memoryPool.value;

  const builtin = poolBuiltin();
  // ایزولهٔ سرد (مثلاً بعد از استقرار تازه): آخرین استخر زنده‌ای که در Cache API
  // ذخیره شده فوراً برگردانده می‌شود و در پس‌زمینه تازه می‌شود؛ پس کاربر هیچ‌وقت
  // با لیست ثابت و کهنه روبه‌رو نمی‌شود.
  if (!memoryPool.value) {
    const cached = await poolReadCache();
    if (cached) memoryPool = { at: now - POOL_TTL_MS, value: cached };
  }

  const refresh = async () => {
    if (inflight) return inflight;
    inflight = (async () => {
      try {
        const fetched = await poolFetchFresh();
        const merged = poolMergeFetched(builtin, fetched);
        lastLiveAt = Date.now();
        memoryPool = { at: Date.now(), value: merged };
        const cache = poolGetCache();
        if (cache) {
          try {
            await cache.put(
              `${POOL_CACHE_BASE}/v1`,
              new Response(JSON.stringify(merged), {
                headers: {
                  'content-type': 'application/json',
                  'cache-control': `max-age=${Math.floor(POOL_TTL_MS / 1000)}`
                }
              })
            );
          } catch (_e) {}
        }
        return merged;
      } catch (_e) {
        return builtin;
      } finally {
        inflight = null;
      }
    })();
    return inflight;
  };

  // تازه‌سازی همیشه شروع می‌شود؛ اگر waitUntil باشد در پس‌زمینه ادامه می‌دهد
  const live = refresh();
  if (options.waitUntil) {
    try { options.waitUntil(live); } catch (_e) {}
  }

  // اگر استخری در حافظه یا کش نیست، حداکثر ۶۰۰ میلی‌ثانیه منتظر لیست زنده می‌مانیم
  // تا همان اولین درخواست هم از منابع به‌روز ساخته شود.
  if (!memoryPool.value && options.allowNetwork !== false && options.awaitRefresh !== false) {
    const merged = await Promise.race([
      live,
      new Promise(resolve => setTimeout(() => resolve(null), POOL_COLD_WAIT_MS))
    ]);
    return merged || builtin;
  }

  return memoryPool.value || builtin;
}

// تازه‌سازی اجباری (کرون) — خروجی خلاصه برای لاگ
async function warmEdgePool() {
  const builtin = poolBuiltin();
  const fetched = await poolFetchFresh();
  const merged = poolMergeFetched(builtin, fetched);
  lastLiveAt = Date.now();
  memoryPool = { at: Date.now(), value: merged };
  const cache = poolGetCache();
  if (cache) {
    try {
      await cache.put(
        `${POOL_CACHE_BASE}/v1`,
        new Response(JSON.stringify(merged), {
          headers: {
            'content-type': 'application/json',
            'cache-control': `max-age=${Math.floor(POOL_TTL_MS / 1000)}`
          }
        })
      );
    } catch (_e) {}
  }
  return {
    ipv4: merged.ipv4.length,
    ipv6: merged.ipv6.length,
    domains: merged.domains.length,
    echDomains: merged.echDomains.length,
    echDns: merged.echDns.length,
    proxyIps: merged.proxyIps.length
  };
}

// انتخاب چرخشی با پرهیز از تکرار، برای نودهای ساب‌لینک
function pickFromPool(pool = [], count = 1, options = {}) {
  const list = Array.isArray(pool) ? pool.filter(Boolean) : [];
  const wanted = Math.max(1, parseInt(count, 10) || 1);
  if (!list.length) return [];
  const stride = Math.max(1, Math.floor(list.length / wanted));
  const bucket = Math.floor(Date.now() / (options.windowMs || 15 * 60 * 1000));
  const start = options.seed !== undefined
    ? Math.abs(Number(options.seed) || 0) % list.length
    : bucket % list.length;
  const out = [];
  for (let i = 0; i < wanted && i < list.length; i++) {
    const item = list[(start + i * stride) % list.length];
    if (!out.includes(item)) out.push(item);
  }
  return out;
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
  menu: wrap('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/>'),
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
  // نصب روی دستگاه: گوشی با فلش پایین
  install: wrap('<rect x="6.5" y="2.6" width="11" height="18.8" rx="2.8"/><path d="M12 7.4v5.6"/><path d="m9.8 11 2.2 2.2 2.2-2.2"/><path d="M10.6 18.2h2.8"/>'),
  // آیکون اختصاصی آرشیو ZIP: پوشهٔ فایل با زیپ وسط
  zip: wrap('<path d="M15 3H8.5A2.5 2.5 0 0 0 6 5.5v13A2.5 2.5 0 0 0 8.5 21h7a2.5 2.5 0 0 0 2.5-2.5V6z"/><path d="M15 3v3.4h3"/><path d="M12 7.4v1.3M12 10.4v1.3M12 13.4v1.3M12 16.4v1.3"/>'),
  check: wrap('<path d="m4.5 12.5 4.8 4.8L19.5 6.8"/>'),
  close: wrap('<path d="m6 6 12 12"/><path d="m18 6-12 12"/>'),
  sun: wrap('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>'),
  moon: wrap('<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.6 8.6 0 1 0 20 14.2z"/>'),
  // قالب ظاهری: پالت رنگ با چهار چکهٔ رنگ
  palette: wrap('<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2.3-.9 2.3-2.1 0-.6-.3-1.1-.6-1.5-.3-.5-.6-.9-.6-1.5 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4-4-6.9-9-6.9z"/><circle cx="7.6" cy="12" r="1.1" fill="currentColor"/><circle cx="9.5" cy="7.8" r="1.1" fill="currentColor"/><circle cx="14" cy="7" r="1.1" fill="currentColor"/><circle cx="17.3" cy="10" r="1.1" fill="currentColor"/>'),
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
  filter: wrap('<path d="M4 5.5h16l-6 7.2v5.6l-4 2v-7.6L4 5.5z"/>'),
  // تحریم‌شکن: سپر با آذرخش
  sanctions: wrap('<path d="M12 2.8 20 6v5.6c0 4.9-3.3 8.7-8 10.6-4.7-1.9-8-5.7-8-10.6V6l8-3.2z"/><path d="m13.1 8.2-3.4 4.4h3l-1 3.6 3.4-4.5h-3l1-3.5z"/>'),
  // اندپوینت/API: قلاب کد
  api: wrap('<path d="m8.4 8.2-4 3.8 4 3.8"/><path d="m15.6 8.2 4 3.8-4 3.8"/><path d="m13.4 5.6-2.8 12.8"/>'),
  // DNS و DoH
  dns: wrap('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2"/><circle cx="12" cy="12" r="8.4" stroke-dasharray="2.6 3.4"/>'),
  // WARP: خط موج
  warp: wrap('<path d="M3 9.4c2.4-3 4.6-3 6.9 0s4.5 3 6.9 0c.9-1.1 1.9-1.7 3.2-1.7"/><path d="M3 15.6c2.4-3 4.6-3 6.9 0s4.5 3 6.9 0c.9-1.1 1.9-1.7 3.2-1.7"/>'),
  // موقعیت/منطقه
  pin: wrap('<path d="M12 21s6.2-5 6.2-10.2A6.2 6.2 0 0 0 5.8 10.8C5.8 16 12 21 12 21z"/><circle cx="12" cy="10.6" r="2.4"/>'),

  telegram: wrap('<path d="M21.4 4.2 2.8 11c-.8.3-.8 1.4 0 1.7l4.6 1.6 1.8 5.4c.2.7 1.1.9 1.6.3l2.5-2.9 4.5 3.3c.6.4 1.4.1 1.6-.6l3-14.5c.2-.8-.6-1.4-1.2-1.1z"/><path d="m7.4 14.3 9.3-6.2-7.2 7.9"/>'),
  back: wrap('<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>'),
  stop: wrap('<rect x="6" y="6" width="12" height="12" rx="2.4"/>'),
  // تپش/حرکت
  pulse: wrap('<path d="M2.8 12h3.6l2-4.8 3.4 9.8 2.2-5h7.2"/>'),
  sparkles: wrap('<path d="M12 3.2l1.6 4.1 4.1 1.6-4.1 1.6L12 14.6l-1.6-4.1L6.3 8.9l4.1-1.6L12 3.2z"/><path d="M18.4 14.1l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1z"/><path d="M5.2 15.1l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z"/>')
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
  pendingUserFlush: new Map(),
  lastSyncAt: 0,
  d1Error: null,
  lastD1WriteAt: 0,
  lastD1WriteError: null,
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

  const generated = generateUuidV4();
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
  return Boolean(expected) && timingSafeEqualStr(clean, expected);
}

// چرخش مسیر مدیریت: تولید UUID جدید و ذخیره آن (امکان تغییر مسیر در هر زمان)
async function rotateAdminPath(env = {}) {
  await ensureD1Schema(env);
  const generated = generateUuidV4();
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
// ستون‌های جدول users به‌تفکیک نوع — برای جدول‌هایی که با اسکیمای قدیمی‌تر
// ساخته شده‌اند و ALTER TABLE لازم دارند.
const USER_TABLE_COLUMNS = {
  sub_node_count: 'INTEGER NOT NULL DEFAULT 50',
  status: "TEXT NOT NULL DEFAULT 'active'",
  enabled: 'INTEGER NOT NULL DEFAULT 1',
  data_limit_gb: 'REAL NOT NULL DEFAULT 0',
  used_bytes: 'INTEGER NOT NULL DEFAULT 0',
  lifetime_bytes: 'INTEGER NOT NULL DEFAULT 0',
  request_count: 'INTEGER NOT NULL DEFAULT 0',
  expire_days: 'INTEGER NOT NULL DEFAULT 0',
  expire_at: 'INTEGER NOT NULL DEFAULT 0',
  start_on_first_use: 'INTEGER NOT NULL DEFAULT 1',
  first_connected_at: 'INTEGER NOT NULL DEFAULT 0',
  ip_limit: 'INTEGER NOT NULL DEFAULT 50',
  node_scope: "TEXT NOT NULL DEFAULT 'all'",
  preset: "TEXT NOT NULL DEFAULT 'iran-fast'",
  note: "TEXT DEFAULT ''",
  config_json: "TEXT NOT NULL DEFAULT '{}'",
  created_at: 'INTEGER NOT NULL DEFAULT 0',
  updated_at: 'INTEGER NOT NULL DEFAULT 0'
};

const SYSTEM_CONFIG_COLUMNS = {
  value: "TEXT NOT NULL DEFAULT ''",
  updated_at: 'INTEGER NOT NULL DEFAULT 0'
};

// افزودن ستون‌های جاافتادهٔ یک جدول؛ خروجی: فهرست خطاها (خالی = بدون مشکل)
async function addMissingColumns(db, table, columns = {}) {
  const errors = [];
  let existing = new Set();
  try {
    const info = await db.prepare(`PRAGMA table_info(${table})`).all();
    existing = new Set((info?.results || []).map(row => String(row.name || '').toLowerCase()));
  } catch (err) {
    return [err?.message || String(err)];
  }
  for (const [name, type] of Object.entries(columns)) {
    if (existing.has(name.toLowerCase())) continue;
    try {
      await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`).run();
    } catch (err) {
      errors.push(`${table}.${name}: ${err?.message || String(err)}`);
    }
  }
  return errors;
}

// تأیید واقعی نوشته‌شدن کلیدهای تنظیمات در D1 (تست خواندنی پس از ذخیره)
async function verifyConfigInD1(env = {}, keys = []) {
  const wanted = (Array.isArray(keys) ? keys : []).map(key => String(key));
  const state = await ensureD1Schema(env);
  const detected = detectD1Binding(env);
  if (!detected || !state.d1Enabled || !memoryStore.d1SchemaReady) {
    return { checked: wanted.length, found: 0, missing: wanted, error: state.error || 'D1 در دسترس نیست' };
  }
  try {
    const res = await detected.db.prepare(`SELECT key FROM system_config`).all();
    const stored = new Set((res?.results || []).map(row => String(row.key)));
    const missing = wanted.filter(key => !stored.has(key));
    return { checked: wanted.length, found: wanted.length - missing.length, missing, error: null };
  } catch (err) {
    return { checked: wanted.length, found: 0, missing: wanted, error: err?.message || String(err) };
  }
}

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
    )`,
    // استخر پروکسی تأییدشدهٔ هر کشور (خروجی واقعی تست‌شده با trace کلادفلر)
    `CREATE TABLE IF NOT EXISTS country_proxy_pool (
      code TEXT NOT NULL,
      proxy TEXT NOT NULL,
      unverified INTEGER NOT NULL DEFAULT 0,
      checked_at INTEGER NOT NULL,
      PRIMARY KEY (code, proxy)
    )`
  ];

  // هر دستور DDL جداگانه اجرا می‌شود؛ یک جدول مشکل‌دار نباید کل اسکیما (و در
  // نتیجه ذخیرهٔ تنظیمات در D1) را از کار بیندازد.
  const schemaErrors = [];
  for (const sql of ddlStatements) {
    try {
      await db.prepare(sql).run();
    } catch (err) {
      schemaErrors.push(err?.message || String(err));
    }
  }

  // جدول‌هایی که با نسخهٔ قدیمی ساخته شده‌اند ستون‌های تازه را ندارند و همین
  // باعث می‌شد INSERT در D1 خطا بدهد و تنظیمات فقط در حافظه بماند.
  try {
    schemaErrors.push(...await addMissingColumns(db, 'users', USER_TABLE_COLUMNS));
  } catch (err) {
    schemaErrors.push(err?.message || String(err));
  }
  try {
    schemaErrors.push(...await addMissingColumns(db, 'system_config', SYSTEM_CONFIG_COLUMNS));
  } catch (err) {
    schemaErrors.push(err?.message || String(err));
  }

  // فقط اگر جدول‌های اصلی قابل خواندن باشند D1 آمادهٔ استفاده اعلام می‌شود
  let schemaUsable = true;
  try {
    await db.prepare(`SELECT COUNT(*) as cnt FROM users`).first();
    await db.prepare(`SELECT COUNT(*) as cnt FROM system_config`).first();
  } catch (err) {
    schemaUsable = false;
    schemaErrors.push(err?.message || String(err));
  }

  if (!schemaUsable) {
    memoryStore.d1SchemaReady = false;
    memoryStore.d1Error = schemaErrors.filter(Boolean).join(' | ') || 'D1 آماده نشد';
    ensureMemorySeeded(env);
    return {
      d1Enabled: false,
      bindingName,
      migrated: false,
      error: memoryStore.d1Error
    };
  }

  try {
    memoryStore.d1SchemaReady = true;
    memoryStore.d1Error = schemaErrors.filter(Boolean).join(' | ') || null;

    // بررسی وجود کاربر اولیه
    const countRow = await db.prepare(`SELECT COUNT(*) as cnt FROM users`).first();
    const totalUsers = Number(countRow?.cnt || 0);
    if (totalUsers === 0) {
      const adminUuid = generateSeedUuid();
      const envSnap = getEnvConfigSnapshot(env);
      const defaultUserConfig = buildUserDefaultConfig(envSnap, 'iran-fast', { subNodeCount: 0 });
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
        0,
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

    return { d1Enabled: true, bindingName, migrated: true, error: memoryStore.d1Error };
  } catch (err) {
    // ساخت کاربر اولیه نباید D1 را از کار بیندازد؛ ستون‌های جدول قبلاً بررسی شده‌اند
    memoryStore.d1SchemaReady = true;
    memoryStore.d1Error = err?.message || String(err);
    return { d1Enabled: true, bindingName, migrated: true, error: memoryStore.d1Error };
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
    const cfg = buildUserDefaultConfig(envSnap, 'iran-fast', { subNodeCount: 0 });
    memoryStore.users.set(firstId, {
      id: firstId,
      username: firstId,
      uuid: adminUuid,
      subNodeCount: 0,
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
  return timingSafeEqualStr(candHash, hash);
}

async function changeAdminPassword(env = {}, currentPassword, newPassword, clientIp = '') {
  const isMatch = await verifyAdminPassword(env, currentPassword);
  if (!isMatch) {
    throw new Error('رمز عبور فعلی نادرست است.');
  }
  return await setAdminPassword(env, newPassword, clientIp);
}

// تنظیمات سراسری پنل
// ----------------------------------------------------------------------------
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
        // کلیدهای محرمانه (توکن بروزرسانی) وارد پیکربندی عمومی نمی‌شوند
        if (!r || !r.key) continue;
        if (r.key === 'cf_token' || r.key.startsWith('secret_')) continue;
        stored[r.key] = r.value;
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
    // همهٔ کلیدها در یک batch نوشته می‌شوند (اتمی و سریع) و خطای واقعی D1
    // ذخیره می‌شود تا در پنل به‌جای پیام «ذخیره شد» ي‌صورت صادقانه گزارش گردد.
    try {
      const statements = [];
      for (const [k, v] of Object.entries(newValues || {})) {
        if (v === '' || v === null || v === undefined) {
          statements.push(safeBind(detectedD1.db.prepare(`DELETE FROM system_config WHERE key = ?`), k));
        } else {
          statements.push(safeBind(
            detectedD1.db.prepare(
              `INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?)
               ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
            ),
            k,
            String(v),
            now
          ));
        }
      }
      if (statements.length) await detectedD1.db.batch(statements);
      memoryStore.lastD1WriteAt = now;
      memoryStore.lastD1WriteError = null;
    } catch (err) {
      memoryStore.lastD1WriteError = err?.message || String(err);
    }
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
      // فقط کلیدهای تنظیمات پاک می‌شوند؛ رمز مدیر، مسیر پنل و توکن بروزرسانی
      // باید بمانند تا بعد از بازنشانی هم دسترسی و آپدیت از دست نرود.
      await detectedD1.db.prepare(
        `DELETE FROM system_config
         WHERE key NOT IN ('admin_password_hash', 'admin_path', 'cf_token')
           AND key NOT LIKE 'secret_%'`
      ).run();
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
// ── استخر پروکسی تأییدشدهٔ هر کشور (تب چندلوکیشن) ──────────────────────────
// ساب‌لیک در حالت MULTI فیدها را تست نمی‌کند؛ از همین جدول (که با تست واقعی
// خروجی پر شده است) استفاده می‌کند تا هم سریع باشد و هم کشور درست بماند.
// پروکسی‌های عمومی سریع می‌میرند؛ پس استخر ذخیره‌شده حداکثر ۱۲ دقیقه معتبر است
// و cron هر ۱۰ دقیقه آن را بازسازی می‌کند.
const COUNTRY_POOL_DEFAULT_TTL_MS = 12 * 60 * 1000;

async function loadCountryProxyPool(env = {}, code = '', ttlMs = COUNTRY_POOL_DEFAULT_TTL_MS) {
  const detected = detectD1Binding(env);
  const cc = String(code || '').trim().toUpperCase();
  if (!detected || !cc) return [];
  try {
    await ensureD1Schema(env);
    const since = Date.now() - Math.max(60000, Number(ttlMs) || COUNTRY_POOL_DEFAULT_TTL_MS);
    const res = await detected.db
      .prepare(`SELECT proxy, unverified FROM country_proxy_pool WHERE code = ? AND checked_at >= ? ORDER BY unverified ASC, checked_at DESC LIMIT 24`)
      .bind(cc, since)
      .all();
    return (res?.results || [])
      .map(row => ({ proxy: String(row.proxy || ''), unverified: Number(row.unverified) === 1 }))
      .filter(item => item.proxy);
  } catch (_e) {
    return [];
  }
}

async function saveCountryProxyPool(env = {}, code = '', entries = []) {
  const detected = detectD1Binding(env);
  const cc = String(code || '').trim().toUpperCase();
  if (!detected || !cc) return 0;
  const rows = (Array.isArray(entries) ? entries : [])
    .filter(item => item && item.proxy)
    .slice(0, 24);
  if (!rows.length) return 0;
  try {
    await ensureD1Schema(env);
    const now = Date.now();
    await detected.db.prepare(`DELETE FROM country_proxy_pool WHERE code = ?`).bind(cc).run();
    const stmt = detected.db.prepare(
      `INSERT OR REPLACE INTO country_proxy_pool (code, proxy, unverified, checked_at) VALUES (?, ?, ?, ?)`
    );
    for (const row of rows) {
      await stmt.bind(cc, String(row.proxy), row.unverified ? 1 : 0, now).run();
    }
    return rows.length;
  } catch (_e) {
    return 0;
  }
}

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
      ssmethod: payload.ssmethod ?? payload.config?.ssmethod ?? globalCfg.ssmethod ?? 'aes-128-gcm',
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
  let insertError = null;
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
      // تأیید واقعی نوشتن: اگر ردیف در D1 نباشد، کاربر «ساخته‌شده» ولی ناپایدار است
      const check = await detectedD1.db.prepare(`SELECT id FROM users WHERE id = ?`).bind(userObj.id).first();
      if (!check || !check.id) throw new Error('ردیف کاربر پس از نوشتن در D1 پیدا نشد');
    } catch (err) {
      insertError = err?.message || String(err);
    }
  }

  if (insertError) {
    memoryStore.users.delete(userObj.id);
    throw new Error('ذخیرهٔ کاربر در D1 ناموفق بود: ' + insertError);
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
      const check = await detectedD1.db.prepare(`SELECT config_json, updated_at FROM users WHERE id = ?`).bind(existing.id).first();
      if (!check || Number(check.updated_at) !== Number(now)) throw new Error('تغییرات کاربر در D1 ثبت نشد');
      const storedCfg = JSON.parse(check.config_json || '{}');
      const wantedKeys = Object.keys(updated.config || {});
      const lost = wantedKeys.filter(key => !(key in storedCfg));
      if (lost.length) throw new Error('این کلیدها در D1 ذخیره نشدند: ' + lost.slice(0, 6).join(', '));
    } catch (err) {
      memoryStore.users.set(existing.id, existing);
      throw new Error('ذخیرهٔ تغییرات در D1 ناموفق بود: ' + (err?.message || String(err)));
    }
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
  const safeBytes = Math.max(0, Number(bytesDelta) || 0);
  const safeReqs = Math.max(0, Number(reqDelta) || 0);
  const hourKey = new Date(now).toISOString().slice(0, 13);
  const prevHour = memoryStore.trafficHourly.get(hourKey) || { bytes: 0, requests: 0 };
  prevHour.bytes += safeBytes;
  prevHour.requests += safeReqs;
  memoryStore.trafficHourly.set(hourKey, prevHour);
  if (memoryStore.trafficHourly.size > 48) {
    const oldestKey = memoryStore.trafficHourly.keys().next().value;
    if (oldestKey) memoryStore.trafficHourly.delete(oldestKey);
  }

  const u = memoryStore.users.get(userId);
  if (u) {
    u.usedBytes = (u.usedBytes || 0) + safeBytes;
    u.lifetimeBytes = (u.lifetimeBytes || 0) + safeBytes;
    u.requestCount = (u.requestCount || 0) + safeReqs;
    if (!u.firstConnectedAt) {
      u.firstConnectedAt = now;
      if (u.startOnFirstUse && u.expireDays > 0 && !u.expireAt) {
        u.expireAt = now + u.expireDays * 86400 * 1000;
      }
    }
    u.updatedAt = now;
  }

  // تجمیع هوشمند نوشتن ترافیک در D1 (حداکثر هر ۵ ثانیه یا بالای ۵۱۲ کیلوبایت)
  // برای جلوگیری از اشباع کوئری‌های همزمان D1 و جلوگیری کامل از Error 1101
  const pending = memoryStore.pendingUserFlush.get(userId) || { bytes: 0, reqs: 0, lastFlushAt: 0 };
  pending.bytes += safeBytes;
  pending.reqs += safeReqs;
  memoryStore.pendingUserFlush.set(userId, pending);

  if (now - pending.lastFlushAt < 5000 && pending.bytes < 524288 && pending.reqs < 20) {
    return;
  }

  const flushBytes = pending.bytes;
  const flushReqs = pending.reqs;
  pending.bytes = 0;
  pending.reqs = 0;
  pending.lastFlushAt = now;

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
        flushBytes,
        flushBytes,
        flushReqs,
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
    d1Error: d1State.error || memoryStore.lastD1WriteError || null,
    d1LastWriteAt: memoryStore.lastD1WriteAt || 0,
    d1WriteError: memoryStore.lastD1WriteError || null,
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
// تبدیل لینک‌های نود به Clash / Sing-box / Surge / QuanX / Loon
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
    // نود WARP/WireGuard (خانوادهٔ WARP که در انتهای ساب‌لینک ساخته می‌شود)
    if (link.startsWith('wireguard://') || link.startsWith('warp://')) {
      const isWarp = link.startsWith('warp://');
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      const reserved = (params.get('reserved') || '')
        .split(',')
        .map(x => parseInt(x.trim(), 10))
        .filter(n => Number.isFinite(n));
      // پارامترهای مبهم‌سازی AmneziaWG (اگر در لینک باشند)
      const awgFields = ['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4'];
      const awg = {};
      for (const key of awgFields) {
        const value = parseInt(params.get(key), 10);
        if (Number.isFinite(value)) awg[key] = value;
      }
      return {
        proto: 'wireguard',
        name: decodeURIComponent(url.hash.substring(1)) || 'WARP',
        privateKey: decodeURIComponent(url.username),
        publicKey: params.get('publickey') || '',
        presharedKey: params.get('presharedkey') || '',
        reserved,
        address: params.get('address') || '172.16.0.2/32',
        mtu: parseInt(params.get('mtu') || '1280', 10) || 1280,
        dns: (params.get('dns') || '').split(',').map(s => s.trim()).filter(Boolean),
        server: normalizeHost(url.hostname),
        port: parseInt(url.port, 10) || (isWarp ? 2408 : 2408),
        awg: Object.keys(awg).length ? awg : null
      };
    }
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
        ech: params.get('ech') || '',
        fragment: params.get('fragment') || ''
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
        ech: params.get('ech') || '',
        fragment: params.get('fragment') || ''
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

// نود WireGuard/WARP برای Mihomo (type: wireguard)
function buildClashWireGuardYaml(node) {
  const lines = [];
  lines.push(`  - name: ${quoteYaml(node.name)}`);
  lines.push('    type: wireguard');
  lines.push(`    server: ${quoteYaml(normalizeHost(node.server))}`);
  lines.push(`    port: ${node.port}`);
  lines.push(`    ip: ${quoteYaml(String(node.address || '172.16.0.2/32').split('/')[0])}`);
  lines.push(`    private-key: ${quoteYaml(node.privateKey)}`);
  lines.push(`    public-key: ${quoteYaml(node.publicKey)}`);
  if (node.presharedKey) lines.push(`    pre-shared-key: ${quoteYaml(node.presharedKey)}`);
  lines.push("    allowed-ips: ['0.0.0.0/0', '::/0']");
  if (node.reserved && node.reserved.length) lines.push(`    reserved: [${node.reserved.join(', ')}]`);
  lines.push(`    mtu: ${node.mtu || 1280}`);
  // مبهم‌سازی AmneziaWG برای Mihomo/Clash Meta
  if (node.awg && Object.keys(node.awg).length) {
    lines.push('    amnezia-wg-option:');
    for (const key of ['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4']) {
      if (Number.isFinite(node.awg[key])) lines.push(`      ${key}: ${node.awg[key]}`);
    }
  }
  lines.push('    remote-dns-resolve: true');
  if (node.dns && node.dns.length) lines.push(`    dns: [${node.dns.map(d => quoteYaml(d)).join(', ')}]`);
  lines.push('    udp: true');
  return lines.join('\n');
}

// نود OpenVPN برای Mihomo (type: openvpn) از پروفایل‌های زندهٔ VPNGate
function buildClashOpenVpnYaml(node) {
  const lines = [];
  lines.push(`  - name: ${quoteYaml(node.name)}`);
  lines.push('    type: openvpn');
  lines.push(`    server: ${quoteYaml(node.server)}`);
  lines.push(`    port: ${node.port}`);
  lines.push(`    proto: ${node.proto === 'tcp' ? 'tcp' : 'udp'}`);
  lines.push(`    udp: ${node.proto === 'tcp' ? 'false' : 'true'}`);
  if (node.username) lines.push(`    username: ${quoteYaml(node.username)}`);
  if (node.password) lines.push(`    password: ${quoteYaml(node.password)}`);
  if (node.cipher) lines.push(`    cipher: ${quoteYaml(node.cipher)}`);
  if (node.auth) lines.push(`    auth: ${quoteYaml(node.auth)}`);
  if (node.tlsAuth) {
    lines.push(`    tls-auth: ${quoteYaml(node.tlsAuth)}`);
    lines.push(`    key-direction: ${quoteYaml(node.keyDirection || '1')}`);
  }
  lines.push('    dev: tun');
  lines.push('    remote-dns-resolve: true');
  lines.push('    dns: [1.1.1.1, 8.8.8.8]');
  if (node.ca) {
    lines.push(`    ca: |`);
    lines.push(String(node.ca).split('\n').map(l => `      ${l}`).join('\n'));
  }
  if (node.cert) {
    lines.push(`    cert: |`);
    lines.push(String(node.cert).split('\n').map(l => `      ${l}`).join('\n'));
  }
  if (node.key) {
    lines.push(`    key: |`);
    lines.push(String(node.key).split('\n').map(l => `      ${l}`).join('\n'));
  }
  return lines.join('\n');
}

function buildClashNodeYaml(node, customECHDomain = 'cloudflare-ech.com', opts = {}) {
  if (node.proto === 'wireguard') return buildClashWireGuardYaml(node);
  // UDP روی هر نود قابل خاموش کردن است (تنظیم udp پنل)
  const udpLine = opts.udp === false ? '    udp: false' : '    udp: true';
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
    lines.push(udpLine);
    lines.push(`    tls: ${node.tls ? 'true' : 'false'}`);
    if (node.flow) lines.push(`    flow: ${quoteYaml(node.flow)}`);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'trojan') {
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(udpLine);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'ss') {
    lines.push(`    cipher: ${quoteYaml(node.cipher || 'none')}`);
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(udpLine);
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
    const rawPath = String(node.path || '/');
    const edMatch = rawPath.match(/[?&]ed=(\d+)/);
    const cleanPath = edMatch ? rawPath.replace(/([?&])ed=\d+&?/, '$1').replace(/[?&]$/, '') || '/' : rawPath;
    lines.push(`    network: ws`);
    lines.push(`    ws-opts:`);
    lines.push(`      path: ${quoteYaml(cleanPath)}`);
    lines.push(`      headers:`);
    lines.push(`        Host: ${quoteYaml(host)}`);
    if (edMatch) {
      lines.push(`      max-early-data: ${parseInt(edMatch[1], 10) || 2048}`);
      lines.push(`      early-data-header-name: Sec-WebSocket-Protocol`);
    }
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
  // گزینه‌های کلاینت از تنظیمات کاربر می‌آیند (DoH / TCP / UDP)
  const wantDoh = String(options.doh == null ? 'yes' : options.doh) !== 'no';
  const wantTcp = String(options.tcp == null ? 'yes' : options.tcp) !== 'no';
  const wantUdp = String(options.udp == null ? 'yes' : options.udp) !== 'no';
  const yamlUdpOpts = { udp: wantUdp };
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss' || n.proto === 'wireguard'));
  const ovpnNodes = Array.isArray(options.ovpnNodes) ? options.ovpnNodes : [];
  // نودهای WARP MASQUE (HTTP/3) — فقط Mihomo/Clash.Meta نوع masque را می‌فهمد
  const masqueNodes = Array.isArray(options.masqueNodes) ? options.masqueNodes : [];
  const names = [...nodes.map(n => n.name), ...ovpnNodes.map(n => n.name), ...masqueNodes.map(n => n.name)];

  const header = [
    '# miliconfig v3.1 - Clash / Mihomo Subscription',
    'mixed-port: 7890',
    'allow-lan: true',
    'mode: rule',
    'log-level: info',
    'ipv6: true',
    'external-controller: 127.0.0.1:9090',
    'unified-delay: true',
    `tcp-concurrent: ${wantTcp}`,
    ...(wantTcp ? ['tcp-fast-open: true', 'tcp-fast-open-keep-alive: true'] : []),
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
    wantDoh
      ? `    - ${customDNS.startsWith('http') ? customDNS : 'https://223.5.5.5/dns-query'}`
      : '    - 223.5.5.5',
    wantDoh ? '    - https://1.1.1.1/dns-query' : '    - 119.29.29.29',
    ...(wantDoh
      ? ['  fallback:', '    - https://1.1.1.1/dns-query', '    - https://8.8.8.8/dns-query']
      : ['  fallback:', '    - 1.1.1.1', '    - 8.8.8.8']),
    '  fallback-filter:',
    '    geoip: true',
    '    geoip-code: CN',
    '    ipcidr:',
    '      - 240.0.0.0/4',
    ''
  ];

  const proxiesSection = ['proxies:'];
  for (const n of nodes) proxiesSection.push(buildClashNodeYaml(n, customECHDomain, yamlUdpOpts));
  for (const n of ovpnNodes) proxiesSection.push(buildClashOpenVpnYaml(n));
  for (const m of masqueNodes) {
    proxiesSection.push(
      `  - { name: "${m.name}", type: masque, server: "${m.server}", port: ${m.port}, ` +
      `private-key: "${m.privateKey}", public-key: "${m.publicKey}", ip: ${m.address4}/32` +
      (m.address6 ? `, ipv6: ${m.address6}/128` : '') +
      `, sni: consumer-masque.cloudflareclient.com, mtu: 1280, udp: true, remote-dns-resolve: true, dns: [1.1.1.1, 1.0.0.1] }`
    );
  }

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
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss' || n.proto === 'wireguard'));
  const outboundTags = nodes.map(n => n.name);

  function buildOutbound(n) {
    if (n.proto === 'wireguard') {
      const wg = {
        type: 'wireguard',
        tag: n.name,
        server: normalizeHost(n.server),
        server_port: n.port,
        local_address: [n.address || '172.16.0.2/32'],
        private_key: n.privateKey,
        peer_public_key: n.publicKey,
        mtu: n.mtu || 1280
      };
      if (n.reserved && n.reserved.length) wg.reserved = n.reserved;
      if (n.presharedKey) wg.pre_shared_key = n.presharedKey;
      return wg;
    }
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
      if (n.fragment) {
        out.tls.fragment = true;
        out.tls.record_fragment = true;
      }
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
      const rawPath = String(n.path || '/');
      const edMatch = rawPath.match(/[?&]ed=(\d+)/);
      const cleanPath = edMatch ? rawPath.replace(/([?&])ed=\d+&?/, '$1').replace(/[?&]$/, '') || '/' : rawPath;
      out.transport = {
        type: 'ws',
        path: cleanPath,
        headers: { Host: n.host },
        max_early_data: edMatch ? (parseInt(edMatch[1], 10) || 2048) : 2048,
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
        // DoH در تنظیمات کاربر خاموش شود، DNS معمولی UDP استفاده می‌شود
        String(options.doh == null ? 'yes' : options.doh) === 'no'
          ? { type: 'udp', tag: 'remote', server: '223.5.5.5', detour: 'select' }
          : { ...splitDnsAddress(customDNS), tag: 'remote', detour: 'select' },
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
      "clash_api": { external_controller: '127.0.0.1:9090' }
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

// ============================================================================
// استخر اختصاصی زنجیره خانگی — زنده از همان مخازن cfnew + استخر داخلی پنل
// نودهای «CF前置» ساب خانگی از این استخر ساخته می‌شوند تا وابسته به فهرست
// ثابت ساب نباشند؛ کش کوتاه است تا آدرس‌های تازه زودتر وارد شوند.
// ============================================================================
const JK_POOL_TTL = 10 * 60 * 1000;
const JK_POOL_MAX_NODES = 6;
let jkPoolCache = { at: 0, hosts: [], live: false };

function parseJkPoolHosts(text) {
  const hosts = [];
  const seen = new Set();
  const re = /\b((?:\d{1,3}\.){3}\d{1,3})\b/g;
  let m;
  while ((m = re.exec(String(text || ''))) !== null) {
    const ip = m[1];
    const parts = ip.split('.').map(Number);
    if (parts.some(p => p < 0 || p > 255)) continue;
    // آدرس‌های خصوصی/رزرو برای لبهٔ کلادفلر بی‌معنی‌اند
    if (parts[0] === 10 || parts[0] === 127 || parts[0] === 0) continue;
    if (parts[0] === 192 && parts[1] === 168) continue;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) continue;
    if (parts[0] === 169 && parts[1] === 254) continue;
    if (seen.has(ip)) continue;
    seen.add(ip);
    hosts.push(ip);
  }
  return hosts;
}

async function readJkPoolSource(url, timeoutMs = 3500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' },
      signal: controller.signal
    });
    if (!resp.ok) return [];
    return parseJkPoolHosts(await resp.text());
  } catch (_e) {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJkFrontPool() {
  const now = Date.now();
  if (jkPoolCache.hosts.length && now - jkPoolCache.at < JK_POOL_TTL) return jkPoolCache;
  const results = await Promise.allSettled(CFNEW_IPV4_SOURCES.map(url => readJkPoolSource(url)));
  const live = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  const seen = new Set();
  const hosts = [];
  for (const ip of [...live, ...IP_POOL.map(item => item.ip)]) {
    if (!ip || seen.has(ip)) continue;
    seen.add(ip);
    hosts.push(ip);
    if (hosts.length >= 32) break;
  }
  jkPoolCache = { at: now, hosts, live: live.length > 0 };
  return jkPoolCache;
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

  // نودهای «CF前置» از استخر اختصاصی زنجیره خانگی (زنده از مخازن cfnew)
  const pool = await fetchJkFrontPool().catch(() => ({ hosts: [], live: false }));
  const poolTemplate = frontNodes.find(n => n.tls) || null;
  const usedFrontServers = new Set(frontNodes.map(n => normalizeHost(n.server)));
  let poolAdded = 0;
  if (poolTemplate) {
    for (const ip of pool.hosts) {
      if (poolAdded >= JK_POOL_MAX_NODES) break;
      if (usedFrontServers.has(ip)) continue;
      usedFrontServers.add(ip);
      frontNodes.push({ ...poolTemplate, server: ip, name: `${frontNodes.length + 1}+${BRAND_NAME}` });
      poolAdded++;
    }
  }
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

  if (poolAdded) {
    header.push(
      `# front pool: cfnew live — ${poolAdded} IP${pool.live ? '' : ' (builtin fallback)'}`,
      ''
    );
  }

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
// miliconfig v3.2 - تولیدکننده ساب‌لینک چندکاربره با نام‌گذاری گویای نودها
// و اعمال دقیق تنظیمات هر کاربر + محدودیت تعداد نودها در ساب (subNodeCount)
// ============================================================================


// هش پایدار برای انتخاب «آی‌پی ثابت» هر کاربر: آدرس نود نباید با هر بار
// خواندن ساب‌لینک عوض شود (درخواست: آی‌پی در کلاینت ثابت بماند).
function stableAddressSeed(text = '') {
  const str = String(text || '');
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

// انتخاب پایدار از یک فهرست: ترتیب بر اساس هش (seed + آیتم) است، پس با هر
// بار خواندن ساب‌لینک همان آی‌پی‌ها برمی‌گردند (آی‌پی ثابت در کلاینت).
function pickStableAddresses(list = [], count = 1, seed = '') {
  const items = [...new Set((Array.isArray(list) ? list : []).filter(Boolean).map(String))];
  if (!items.length) return [];
  const ranked = items
    .map(item => ({ item, rank: stableAddressSeed(String(seed) + '|' + item) }))
    .sort((a, b) => a.rank - b.rank || a.item.localeCompare(b.item));
  return ranked.slice(0, Math.max(1, count)).map(entry => entry.item);
}

function getOfficialDirectAddress(seed = '') {
  const list = OFFICIAL_DIRECT_IPS;
  const hit = seed
    ? list[stableAddressSeed(seed) % list.length]
    : list[Math.floor(Math.random() * list.length)];
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
  // ProxyIP سفارشی/منطقه‌ای (cfnew: 回退地址) — ورکر با همین آدرس MTProto/سایت
  // مقصد را باز می‌کند؛ آدرس نود همچنان آی‌پی ثابت است.
  if (!item?.proxy && cfg.p) parts.push(`p=${encodeProxyForPath(cfg.p)}`);
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

// همه حالت‌های پورت یک آدرس: یک پورت TLS + یک پورت HTTP (اگر تنظیم شده باشد).
// با همین، هر آدرس/کشور هم نسخهٔ TLS و هم نسخهٔ بدون TLS دارد و اگر یکی در
// شبکهٔ کاربر فیلتر باشد دیگری کار می‌کند.
function buildPortVariants(cfg = {}, item = {}, index = 0) {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const explicit = Number(item?.port) || 0;
  if (explicit) {
    return [{ port: explicit, tls: !CF_HTTP_PORTS.includes(explicit) }];
  }
  const tlsPorts = parseNodePorts(cfg.ports).filter(port => !CF_HTTP_PORTS.includes(port));
  const httpPorts = disableNonTls ? [] : parseNodePorts(cfg.httpPorts || '')
    .filter(port => CF_HTTP_PORTS.includes(port));
  const out = [];
  if (tlsPorts.length) out.push({ port: tlsPorts[Math.abs(index) % tlsPorts.length], tls: true });
  if (httpPorts.length) out.push({ port: httpPorts[Math.abs(index) % httpPorts.length], tls: false });
  return out.length ? out : [{ port: 443, tls: true }];
}

// چیدمان متناوب آی‌پی‌ها و دامنه‌های پیش‌فرض: هر ۲ آی‌پی، یک دامنه،
// تا نودهای دامنه حتی با سقف کم نود هم حتماً داخل سابلینک باشند.
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

// ساخت یک ورودی نود همراه با فرادادهٔ لازم برای نام‌گذاری و توزیع مساوی
function makeNodeEntry(link, proto, host, item = null, tls = true) {
  const cc = String(item?.country || '').trim().toUpperCase();
  const meta = {
    proto,
    host,
    family: addressFamilyLabel(host),
    cc: /^[A-Z]{2}$/.test(cc) ? cc : '',
    proxy: Boolean(item?.proxy),
    tls: tls !== false
  };
  return { link, meta };
}

// توزیع مساوی ترکیب‌های مختلف در سابلینک: هر «پروتکل × خانوادهٔ آدرس»
// (VLESS/IPv4، VLESS/IPv6، VLESS/Domain، Trojan/IPv4 و ...) به تعداد برابر
// در ساب حاضر می‌شود و نودهای پروکسی‌دار یک‌درمیان بین بقیه پخش می‌شوند.
function balanceComboEntries(entries = [], limit = 0) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const groups = new Map();
  // حذف تکرار: یک آدرس ممکن است از چند منبع (فهرست ثابت، ترجیحی و ...) بیاید
  const seenLinks = new Set();
  for (const entry of entries) {
    if (!entry || !entry.link) continue;
    if (seenLinks.has(entry.link)) continue;
    seenLinks.add(entry.link);
    const key = `${entry.meta.proto}|${entry.meta.family || 'na'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }
  if (!groups.size) return [];

  // داخل هر گروه، نودهای پروکسی‌دار و بدون پروکسی یک‌درمیان بیایند
  for (const [key, list] of groups) {
    // ترتیب پایدار: مستقل از ترتیب رسیدن منابع، تا لینک‌ها بین دو درخواست
    // جابه‌جا نشوند (آی‌پی نود در کلاینت ثابت می‌ماند).
    const withProxy = list.filter(item => item.meta.proxy)
      .sort((a, b) => stableAddressSeed(String(a.link)) - stableAddressSeed(String(b.link)) || String(a.link).localeCompare(String(b.link)));
    const plain = list.filter(item => !item.meta.proxy)
      .sort((a, b) => stableAddressSeed(String(a.link)) - stableAddressSeed(String(b.link)) || String(a.link).localeCompare(String(b.link)));
    const mixed = [];
    let a = 0;
    let b = 0;
    while (a < withProxy.length || b < plain.length) {
      if ((mixed.length % 2 === 0 && a < withProxy.length) || b >= plain.length) {
        mixed.push(withProxy[a++]);
      } else {
        mixed.push(plain[b++]);
      }
    }
    groups.set(key, mixed);
  }

  // سهمیهٔ برابر برای هر ترکیب تا سقف نود کاربر
  const total = entries.length;
  const target = limit > 0 ? Math.min(limit, total) : total;
  const keys = [...groups.keys()];
  const quota = new Map(keys.map(key => [key, 0]));
  let remaining = target;
  let pending = keys.slice();
  while (remaining > 0 && pending.length) {
    const share = Math.max(1, Math.floor(remaining / pending.length));
    const next = [];
    for (const key of pending) {
      const bucket = groups.get(key);
      const left = bucket.length - quota.get(key);
      const take = Math.min(share, left, remaining);
      quota.set(key, quota.get(key) + take);
      remaining -= take;
      if (bucket.length - quota.get(key) > 0) next.push(key);
      if (remaining <= 0) break;
    }
    if (next.length === pending.length) {
      const progressed = next.some(key => quota.get(key) > 0);
      if (!progressed) break;
    }
    pending = next;
  }

  const queues = keys.map(key => groups.get(key).slice(0, quota.get(key)));
  const out = [];
  let guard = 0;
  while (out.length < target && guard++ < target * 4) {
    let moved = false;
    for (const queue of queues) {
      if (queue.length && out.length < target) {
        out.push(queue.shift());
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

function buildLocationSourceList(proxyPool = [], cfg = {}, fallbackHost = '', seed = '') {
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
  // انتخاب پایدار بر اساس seed کاربر (نه زمان): با هر بار خواندن ساب‌لینک
  // همان پروکسی‌ها برمی‌گردند تا آی‌پی نود در کلاینت عوض نشود.
  const bucket = seed ? stableAddressSeed(String(seed) + '-loc') : 0;

  // با گام‌بندی روی استخر، هم IPv4 و هم IPv6 (اگر فعال باشد) در ساب‌لینک حضور پیدا می‌کنند
  const stride = Math.max(1, Math.floor(addressPool.length / wanted));
  const out = [];
  for (let i = 0; i < wanted; i++) {
    const code = countryCodes[(bucket + i) % countryCodes.length];
    const group = byCountry.get(code) || usable;
    // اگر برای این کشور پروکسی تأییدشده وجود دارد، فقط همان‌ها استفاده می‍شوند تا
    // خروجی واقعاً از کشور انتخابی باشد؛ پروکسی خام فقط وقتی هیچ تأییدشده‌ای نیست.
    const verifiedGroup = group.filter(item => item.unverified !== true);
    const pickFrom = verifiedGroup.length ? verifiedGroup : group;
    const picked = pickFrom[(bucket + i) % pickFrom.length];
    out.push({
      ip: addressPool[(i * stride) % addressPool.length],
      // «?» یعنی پروکسی تأییدشده نبود (کشورش با برچسب نخواند یا هیچ پروکسی سالمی نبود)
      isp: `Loc-${picked.country || 'CF'}${picked.unverified ? '?' : ''}`,
      country: picked.country || '',
      unverified: picked.unverified === true,
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

// ============================================================================
// استخر تأییدشدهٔ هر کشور: پروکسی‌ها از فیدها خوانده و از طریق خودشان تست می‌شوند؛
// فقط آن‌هایی که loc خروجی‌شان با کد کشور یکی است نگه داشته می‌شوند.
// نتیجه ۱۰ دقیقه در cache کلادفلر می‌ماند تا هر درخواست ساب‌لینک گران نشود.
// ============================================================================
const COUNTRY_VERIFIED_CACHE_MS = 15 * 60 * 1000;
const COUNTRY_VERIFIED_CANDIDATES = 12;
const COUNTRY_VERIFIED_TIMEOUT_MS = 1800;
const COUNTRY_VERIFIED_DEADLINE_MS = 5000;
const COUNTRY_VERIFIED_CACHE_BASE = 'https://country-verify.miliconfig.internal';

// کشورهای تب چندلوکیشن — همین فهرست در cron هم تازه‌سازی می‌شود
const MULTI_COUNTRY_CODES = ['DE', 'NL', 'US', 'GB', 'TR', 'AE', 'CA', 'SE'];

function getCountryCache() {
  try {
    return typeof caches !== 'undefined' ? caches.default : null;
  } catch (_e) {
    return null;
  }
}

// تازه‌سازی استخر یک کشور (برای cron / پيش‌گرم کردن D1)
async function refreshCountryProxyPool(env, code) {
  const cc = String(code || '').trim().toUpperCase();
  const urls = (COUNTRY_PROXY_SOURCES[cc]?.urls || []).join(',');
  if (!env || !cc || !urls) return { code: cc, candidates: 0, verified: 0 };
  const found = await fetchPreferredFromUrls(urls);
  const candidates = [];
  for (const item of found) {
    if (!item.proxy || candidates.includes(item.proxy)) continue;
    candidates.push(item.proxy);
    if (candidates.length >= 16) break;
  }
  const results = await verifyCountryProxies(candidates, {
    need: 8,
    timeoutMs: 2000,
    deadline: Date.now() + 8000
  });
  const verified = results.filter(item => item.country === cc).map(item => ({ proxy: item.proxy, country: cc }));
  if (verified.length) await saveCountryProxyPool(env, cc, verified);
  return { code: cc, candidates: candidates.length, verified: verified.length };
}

async function getVerifiedCountryProxies(code, urls, options = {}) {
  const need = Math.max(1, parseInt(options.need, 10) || 4);
  const verify = options.verify !== false;
  const deadline = Number(options.deadline) || Date.now() + 3500;
  const env = options.env || null;

  // ۱) استخر ذخیره‌شده در D1 (تست واقعی قبلی) — سریع‌ترین مسیر و پایهٔ حالت MULTI
  if (env) {
    const stored = await loadCountryProxyPool(env, code);
    const storedVerified = stored.filter(item => !item.unverified);
    if (storedVerified.length) return storedVerified.slice(0, need);
  }

  const cache = getCountryCache();
  const bucket = Math.floor(Date.now() / COUNTRY_VERIFIED_CACHE_MS);
  const cacheKey = `${COUNTRY_VERIFIED_CACHE_BASE}/${code}/${bucket}/${need}/v${verify ? 1 : 0}`;

  if (cache) {
    try {
      const hit = await cache.match(cacheKey);
      if (hit) {
        const cached = await hit.json();
        if (Array.isArray(cached?.list)) return cached.list;
      }
    } catch (_e) {}
  }

  const found = await fetchPreferredFromUrls(urls);
  const candidates = [];
  for (const item of found) {
    if (!item.proxy || candidates.includes(item.proxy)) continue;
    candidates.push(item.proxy);
    if (candidates.length >= COUNTRY_VERIFIED_CANDIDATES) break;
  }

  let verified = [];
  if (verify && candidates.length) {
    const results = await verifyCountryProxies(candidates, {
      need,
      timeoutMs: COUNTRY_VERIFIED_TIMEOUT_MS,
      deadline
    });
    verified = results.filter(r => r.country === code).map(r => ({ proxy: r.proxy, country: code }));
  }

  // تأییدشده‌ها اول؛ اگر کمتر از نیاز بودند با پروکسی‌های خام (با برچسب هشدار «?»)
  // تکمیل می‌شود تا تب کشور خالی نماند.
  const verifiedSet = new Set(verified.map(v => v.proxy));
  const topUp = candidates
    .filter(proxy => !verifiedSet.has(proxy))
    .slice(0, Math.max(0, need - verified.length))
    .map(proxy => ({ proxy, country: code, unverified: true }));
  const list = [...verified, ...topUp];

  // نتیجهٔ تأییدشده در D1 ذخیره می‌شود تا حالت MULTI و درخواست‌های بعدی
  // بدون تست مجدد و بدون هزینهٔ زمانی از همان استفاده کنند.
  if (env && verified.length) {
    try { await saveCountryProxyPool(env, code, verified); } catch (_e) {}
  }

  // کل لیست (تأییدشده یا پشتیبان) کش می‌شود تا درخواست بعدی سریع باشد
  if (cache) {
    try {
      await cache.put(
        cacheKey,
        new Response(JSON.stringify({ list, checkedAt: Date.now() }), {
          headers: {
            'content-type': 'application/json',
            'cache-control': `max-age=${Math.floor(COUNTRY_VERIFIED_CACHE_MS / 1000)}`
          }
        })
      );
    } catch (_e) {}
  }

  return list;
}

// ---------------------------------------------------------------------------
// دامنه‌های SNI/Host
// بعضی نصب‌ها چند دامنه دارند که همه به همین ورکر وصل‌اند (دامنهٔ سفارشی،
// چند دامنهٔ ثبت‌شده روی اکانت و …). این دامنه‌ها در تنظیمات وارد می‌شوند و
// نودها به ترتیب بین آن‌ها می‌چرخند تا اگر یک دامنه کند/مسدود شد بقیه کار کنند.
// فقط دامنه‌هایی که واقعاً به همین ورکر مسیر می‌شوند معتبرند؛ دامنهٔ دلخواه باعث
// می‌شود نود به سایت دیگری وصل شود.
// ---------------------------------------------------------------------------
function resolveFrontHosts(workerHost, cfg = {}) {
  const out = [];
  const push = (value) => {
    const host = normalizeNodeHost(value);
    if (!host) return;
    if (out.some(item => item.toLowerCase() === host.toLowerCase())) return;
    out.push(host);
  };
  // دامنه‌های سفارشی اول می‌آیند تا حتی با یک آدرس هم SNI/Host انتخابی کاربر
  // روی نود بنشیند؛ دامنهٔ خود ورکر به‌عنوان آخرین گزینه (fallback) می‌ماند.
  const raw = String(cfg.sniHosts || '')
    .split(/[,\n]+/)
    .map(item => item.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, ''))
    .filter(Boolean);
  raw.forEach(push);
  push(workerHost);
  return out;
}

// تشخیص دامنهٔ فیلترشدهٔ Cloudflare Pages یا Workers در ایران و تولید SNI ضد-DPI
function isFilteredPagesOrWorkersHost(host = '') {
  const lower = String(host || '').trim().toLowerCase().replace(/\.+$/, '');
  return lower.endsWith('.pages.dev') || lower.endsWith('.workers.dev');
}

function getEffectiveSniForNode(nodeHost, rawHost, idx = 0) {
  const cleanHost = String(nodeHost || '').trim();
  if (!isFilteredPagesOrWorkersHost(cleanHost)) return cleanHost;
  // در ایران دامنهٔ *.pages.dev و *.workers.dev روی SNI فیلتر است:
  // با ترکیب Mixed-Case SNI و سید یکتا، فیلترینگ مبتنی بر تطابق رشتهٔ SNI دور زده می‌شود
  // در حالی که کلودفلر SNI را بدون حساسیت به بزرگی/کوچکی حروف می‌پذیرد و به همین پروژه هدایت می‌کند.
  return buildAntiFilterSni(cleanHost, stableAddressSeed(cleanHost + '|' + rawHost + '|' + idx));
}

function frontHostFor(item, fallbackHost) {
  const host = item && item.frontHost ? String(item.frontHost).trim() : '';
  return host || fallbackHost;
}

function buildVlessLinks(list, userUuid, workerHost, cfg, wkOverride = '') {
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

    // مسیر یکتا برای نوع نود + کشور؛ پروکسی خروجی هم داخل همان مسیر به ورکر داده می‌شود
    const itemPath = buildNodePath('vless', cfg, wkOverride, item);
    const nodeHost = frontHostFor(item, workerHost);

    for (const { port, tls } of buildPortVariants(cfg, item, idx)) {
      const nodeName = buildNodeDisplayName({
        proto: 'vless',
        host: rawHost,
        cc: item?.country,
        proxy: Boolean(item?.proxy),
        tls
      });
      if (tls) {
        const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'tls',
          sni: effectiveSni,
          fp: cfg.fp || 'random',
          type: 'ws',
          host: nodeHost,
          path: itemPath,
          alpn: alpn || 'h2,http/1.1'
        });
        if (alpn) params.set('alpn', alpn);
        if (echValue) params.set('ech', echValue);
        if (fragmentValue) params.set('fragment', fragmentValue);
        links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'vless', rawHost, item, tls));
      } else {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'none',
          type: 'ws',
          host: nodeHost,
          path: itemPath
        });
        links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'vless', rawHost, item, tls));
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

// شادوساکس با همان مکانیزم ورکر Z-E-U-S (منبع الهام cfnew): هر آدرس یک نود
// SIP002 با userinfo base64 («متد:رمز») + پلاگین v2ray-websocket روی همان مسیر.
// متد پیش‌فرض AEAD است (aes-128-gcm) چون «none» در بیشتر کلاینت‌ها پشتیبانی
// نمی‌شود و نود بدون پینگ می‌ماند؛ هسته هم AEAD را رمزگشایی می‌کند.
function buildShadowsocksLinks(list, userUuid, workerHost, cfg) {
  const links = [];
  const sspass = (cfg.sspass && String(cfg.sspass).trim()) || userUuid;
  const cipher = cfg.ssmethod === 'aes-256-gcm' ? 'aes-256-gcm' : 'aes-128-gcm';
  const userinfo = encodeSip002UserInfo(`${cipher}:${sspass}`);

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    // شادوساکس با پلاگین v2ray فقط روی TLS معنا دارد؛ همیشه نسخهٔ TLS انتخاب می‌شود
    const { port } = buildPortVariants(cfg, item, idx).find(variant => variant.tls) || { port: 443 };
    const nodeName = buildNodeDisplayName({ proto: 'ss', host: rawHost, cc: item?.country, proxy: Boolean(item?.proxy), tls: true });
    const itemPath = buildNodePath('ss', cfg, '', item);
    const pluginOpts = `v2ray-plugin;mode=websocket;host=${frontHostFor(item, workerHost)};path=${itemPath};tls`;
    links.push(
      makeNodeEntry(`ss://${userinfo}@${safeAddr}:${port}/?plugin=${encodeURIComponent(pluginOpts)}#${encodeURIComponent(nodeName)}`, 'ss', rawHost, item, true)
    );
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

function buildTrojanLinks(list, userUuid, workerHost, cfg, wkOverride = '') {
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

    {
      const itemPath = buildNodePath('trojan', cfg, wkOverride, item);
      const nodeHost = frontHostFor(item, workerHost);
      for (const { port, tls } of buildPortVariants(cfg, item, idx)) {
        const nodeName = buildNodeDisplayName({
          proto: 'trojan',
          host: rawHost,
          cc: item?.country,
          proxy: Boolean(item?.proxy),
          tls
        });
        if (tls) {
          const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
          const params = new URLSearchParams({
            security: 'tls',
            sni: effectiveSni,
            fp: cfg.fp || 'random',
            type: 'ws',
            host: nodeHost,
            path: itemPath,
            alpn: alpn || 'h2,http/1.1'
          });
          if (alpn) params.set('alpn', alpn);
          if (echValue) params.set('ech', echValue);
          if (fragmentValue) params.set('fragment', fragmentValue);
          links.push(makeNodeEntry(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'trojan', rawHost, item, tls));
        } else {
          const params = new URLSearchParams({
            security: 'none',
            type: 'ws',
            host: nodeHost,
            path: itemPath
          });
          links.push(makeNodeEntry(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'trojan', rawHost, item, tls));
        }
      }
    }
  }
  return links;
}

function buildXhttpLinks(list, userUuid, workerHost, cfg) {
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
    const { port } = buildPortVariants(cfg, item, idx).find(variant => variant.tls) || { port: 443 };
    const nodeName = buildNodeDisplayName({ proto: 'xhttp', host: rawHost, cc: item?.country, proxy: Boolean(item?.proxy), tls: true });
    // مسیر یکتای xHTTP + کشور + پروکسی خروجی
    let xhttpPath = `/${shortPath}?nt=xhttp`;
    const xhttpCountry = String(item.country || '').trim().toUpperCase();
    if (/^[A-Z]{2}$/.test(xhttpCountry)) xhttpPath += `&cc=${xhttpCountry}`;
    if (item.proxy) xhttpPath += `&s=${encodeProxyForPath(item.proxy)}`;
    const nodeHost = frontHostFor(item, workerHost);
    const effectiveSni = getEffectiveSniForNode(nodeHost, rawHost, idx);
    const params = new URLSearchParams({
      encryption: 'none',
      security: 'tls',
      sni: effectiveSni,
      fp: cfg.fp || 'random',
      type: 'xhttp',
      host: nodeHost,
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
    links.push(makeNodeEntry(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`, 'xhttp', rawHost, item, true));
  }
  return links;
}

// ============================================================================
// نودهای «دامنهٔ پنل» — آدرس و SNI دقیقاً دامنهٔ همین ورکر/پیجز (بدون https://)
// ============================================================================
// انتخاب چرخشی از استخر دامنه‌های تأییدشدهٔ کلادفلر؛ هر ۱۵ دقیقه یک پنجرهٔ
// شروع تازه می‌گیرد تا سابلینک ثابت نماند (stride ۱۳ تا پراکندگی داشته باشد).
function pickEdgeDomains(count, seed = '') {
  const pool = CF_EDGE_DOMAINS;
  const wanted = Math.max(1, parseInt(count, 10) || 1);
  if (!pool.length) return [];
  // با seed پایدار، دامنه‌های نود هم برای هر کاربر ثابت می‌مانند
  const start = seed
    ? stableAddressSeed(seed) % pool.length
    : Math.floor(Date.now() / (15 * 60 * 1000)) % pool.length;
  const out = [];
  const seen = new Set();
  for (let step = 0; out.length < Math.min(wanted, pool.length) && step < pool.length * 2; step++) {
    const domain = pool[(start + step * 13) % pool.length];
    if (!domain || seen.has(domain)) continue;
    seen.add(domain);
    out.push(domain);
  }
  return out;
}

function buildPanelDomainNodes(workerHost, cfg = {}) {
  const host = normalizeNodeHost(workerHost);
  if (!host) return [];
  const count = Math.max(1, Math.min(parseInt(cfg.pdCount, 10) || 2, 20));
  // اگر دامنهٔ پنل *.pages.dev باشد (که در ایران DNS و آی‌پی آن مسدود است)،
  // به‌جای قرار دادن مستقیم دامنهٔ مسدود در بخش Address، از آی‌پی‌ها و دامنه‌های تمیز کلادفلر استفاده می‌کنیم
  if (isFilteredPagesOrWorkersHost(host)) {
    const cleanAddresses = [...OFFICIAL_DIRECT_IPS, ...DIRECT_DOMAINS.map(d => d.domain)];
    return Array.from({ length: count }, (_, idx) => ({
      ip: cleanAddresses[idx % cleanAddresses.length],
      port: 443,
      isp: 'Pages-Bypass'
    }));
  }
  return Array.from({ length: count }, () => ({ ip: host, port: 443, isp: 'Panel' }));
}

// ============================================================================
// WARP / WARP PRO / WARP چندلوکیشن — تولید کانفیگ واقعی WireGuard
// خروجی سازگار با v2rayN / Hiddify / NekoBox (قالب wireguard://) و Mihomo/sing-box
// ============================================================================

const X25519_P = (1n << 255n) - 19n;
const X25519_A24 = 121665n;

function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64) {
  let clean = String(b64 || '').trim().replace(/-/g, '+').replace(/_/g, '/').replace(/\s+/g, '');
  while (clean.length % 4 !== 0) clean += '=';
  try {
    const bin = atob(clean);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch (_e) {
    return new Uint8Array(0);
  }
}

// بستن اسکالر کلید خصوصی طبق RFC 7748 (همان کلمپی که WireGuard انجام می‌دهد)
function clampScalar(raw) {
  const key = Uint8Array.from(raw);
  key[0] &= 248;
  key[31] &= 127;
  key[31] |= 64;
  return key;
}

// ضرب اسکالر منحنی Curve25519 روی نقطه پایه (X25519) — کلید عمومی از کلید خصوصی
function x25519PublicKey(privateKeyBytes) {
  let k = 0n;
  for (let i = 31; i >= 0; i--) k = (k << 8n) | BigInt(privateKeyBytes[i]);
  const inv = a => {
    let result = 1n;
    let base = a % X25519_P;
    let exp = X25519_P - 2n;
    while (exp > 0n) {
      if (exp & 1n) result = (result * base) % X25519_P;
      base = (base * base) % X25519_P;
      exp >>= 1n;
    }
    return result;
  };
  const x1 = 9n;
  let x2 = 1n;
  let z2 = 0n;
  let x3 = 9n;
  let z3 = 1n;
  let swap = 0n;
  for (let t = 254; t >= 0; t--) {
    const bit = (k >> BigInt(t)) & 1n;
    swap ^= bit;
    if (swap === 1n) {
      [x2, x3] = [x3, x2];
      [z2, z3] = [z3, z2];
    }
    swap = bit;
    const a = (x2 + z2) % X25519_P;
    const aa = (a * a) % X25519_P;
    const b = (x2 - z2 + X25519_P) % X25519_P;
    const bb = (b * b) % X25519_P;
    const e = (aa - bb + X25519_P) % X25519_P;
    const c = (x3 + z3) % X25519_P;
    const d = (x3 - z3 + X25519_P) % X25519_P;
    const da = (d * a) % X25519_P;
    const cb = (c * b) % X25519_P;
    const daCb = (da + cb) % X25519_P;
    const daCbNeg = (da - cb + X25519_P) % X25519_P;
    x3 = (daCb * daCb) % X25519_P;
    z3 = (x1 * ((daCbNeg * daCbNeg) % X25519_P)) % X25519_P;
    x2 = (aa * bb) % X25519_P;
    z2 = (e * ((aa + X25519_A24 * e) % X25519_P)) % X25519_P;
  }
  if (swap === 1n) {
    [x2, x3] = [x3, x2];
    [z2, z3] = [z3, z2];
  }
  const value = (x2 * inv(z2)) % X25519_P;
  const out = new Uint8Array(32);
  let rest = value;
  for (let i = 0; i < 32; i++) {
    out[i] = Number(rest & 255n);
    rest >>= 8n;
  }
  return out;
}

function generateWireGuardIdentity() {
  const raw = getRandomBytesSafe(32);
  const privateKeyBytes = clampScalar(raw);
  return {
    privateKey: bytesToBase64(privateKeyBytes),
    publicKey: bytesToBase64(x25519PublicKey(privateKeyBytes))
  };
}

// کش ثبت‌نام WARP در حافظهٔ ایزوله؛ از ثبت‌نام مجدد در هر درخواست ساب‌لینک جلوگیری می‌کند
let warpRegCache = { key: '', at: 0, data: null };
const WARP_REG_CACHE_TTL = 6 * 60 * 60 * 1000;

async function applyWarpLicense(deviceId, license) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(`${WARP_REGISTRATION_URL}/${deviceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({ license, warp_enabled: true }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return null;
    return await resp.json();
  } catch (_e) {
    return null;
  }
}

// ثبت‌نام دستگاه رایگان WARP برای دریافت reserved/آدرس تونل/کلید همتا (و ارتقای لایسنس در حالت PRO)
async function fetchWarpRegistration(cfg = {}, force = false) {
  const license = String(cfg.warpLicense || '').trim();
  const cacheKey = license ? `lic:${license}` : 'free';
  if (!force && warpRegCache.data && warpRegCache.key === cacheKey && Date.now() - warpRegCache.at < WARP_REG_CACHE_TTL) {
    return warpRegCache.data;
  }
  try {
    const identity = generateWireGuardIdentity();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const resp = await fetch(WARP_REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({
        key: identity.publicKey,
        install_id: '',
        fcm_token: '',
        tos: new Date().toISOString(),
        model: 'PC',
        serial_number: '',
        locale: 'en_US'
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return null;
    let device = await resp.json();
    if (license && device?.id) {
      const upgraded = await applyWarpLicense(device.id, license);
      if (upgraded && upgraded.config) device = upgraded;
    }
    const peer = device?.config?.peers?.[0] || {};
    const endpointHostRaw = String(peer?.endpoint?.host || `${WARP_DEFAULT_HOST}:${WARP_DEFAULT_PORT}`);
    const [endpointHost, endpointPortRaw] = endpointHostRaw.split(':');
    const clientIdBytes = base64ToBytes(device?.config?.client_id || '');
    const data = {
      privateKey: identity.privateKey,
      publicKey: peer.public_key || WARP_PEER_PUBLIC_KEY,
      reserved: clientIdBytes.length >= 3 ? [...clientIdBytes.slice(0, 3)] : [0, 0, 0],
      address4: device?.config?.interface?.addresses?.v4 || WARP_DEFAULT_ADDRESS,
      address6: device?.config?.interface?.addresses?.v6 || '',
      server: endpointHost || WARP_DEFAULT_HOST,
      port: parseInt(endpointPortRaw, 10) || WARP_DEFAULT_PORT,
      license: device?.account?.license || '',
      registered: true
    };
    warpRegCache = { key: cacheKey, at: Date.now(), data };
    return data;
  } catch (_e) {
    return null;
  }
}

// پیکربندی پشتیبان وقتی سرویس ثبت‌نام در دسترس نیست (کلیدهای شناخته‌شدهٔ WARP)
function buildFallbackWarpConfig() {
  const identity = generateWireGuardIdentity();
  return {
    privateKey: identity.privateKey,
    publicKey: WARP_PEER_PUBLIC_KEY,
    reserved: [0, 0, 0],
    address4: WARP_DEFAULT_ADDRESS,
    address6: '',
    server: WARP_DEFAULT_HOST,
    port: WARP_DEFAULT_PORT,
    license: '',
    registered: false
  };
}

// ============================================================================
// WARP MASQUE (HTTP/3) — تونل IP روی CONNECT-IP
// نه WireGuard است و نه AmneziaWG: کلید دستگاه ECDSA P-256 است و لبه با SNI
// مخصوص MASQUE و پین‌کردن کلید عمومی لبه احراز می‌کند. این نوع نود فقط در
// Mihomo/Clash.Meta (type: masque) و فورک Hiddify قابل استفاده است.
// ============================================================================
const WARP_MASQUE_SNI = 'consumer-masque.cloudflareclient.com';
const WARP_MASQUE_PORTS = [443, 8443, 4443, 500, 1701, 4500];
let warpMasqueCache = { key: '', at: 0, data: null };

function derTlv(tag, bytes) {
  const len = bytes.length;
  let lenBytes;
  if (len < 0x80) {
    lenBytes = [len];
  } else {
    const tmp = [];
    let n = len;
    while (n > 0) { tmp.unshift(n & 0xff); n >>= 8; }
    lenBytes = [0x80 | tmp.length, ...tmp];
  }
  return Uint8Array.from([tag, ...lenBytes, ...bytes]);
}

// کلید خصوصی P-256 را از JWK به قالب SEC1 DER می‌برد (چیزی که Mihomo می‌خواهد)
function buildSec1PrivateKey(jwk = {}) {
  const oidPrime256v1 = Uint8Array.from([0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07]);
  const version = Uint8Array.from([0x02, 0x01, 0x01]);
  const privateKey = derTlv(0x04, base64ToBytes(jwk.d || ''));
  const params = derTlv(0xa0, oidPrime256v1);
  const point = Uint8Array.from([0x00, 0x04, ...base64ToBytes(jwk.x || ''), ...base64ToBytes(jwk.y || '')]);
  const publicKey = derTlv(0xa1, derTlv(0x03, point));
  const body = new Uint8Array(version.length + privateKey.length + params.length + publicKey.length);
  body.set(version, 0);
  body.set(privateKey, version.length);
  body.set(params, version.length + privateKey.length);
  body.set(publicKey, version.length + privateKey.length + params.length);
  return derTlv(0x30, body);
}

// ثبت‌نام دستگاه MASQUE: اول ساخت دستگاه، بعد ارتقا به tunnel_type=masque با کلید P-256
async function fetchWarpMasqueRegistration(cfg = {}, force = false) {
  const license = String(cfg.warpLicense || '').trim();
  const cacheKey = license ? `masque-lic:${license}` : 'masque-free';
  if (!force && warpMasqueCache.data && warpMasqueCache.key === cacheKey && Date.now() - warpMasqueCache.at < WARP_REG_CACHE_TTL) {
    return warpMasqueCache.data;
  }
  try {
    const pair = await getSafeCrypto().subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const spki = new Uint8Array(await getSafeCrypto().subtle.exportKey('spki', pair.publicKey));
    const jwk = await getSafeCrypto().subtle.exportKey('jwk', pair.privateKey);
    const pubB64 = bytesToBase64(spki);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const created = await fetch(WARP_REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1'
      },
      body: JSON.stringify({
        key: pubB64,
        install_id: '',
        fcm_token: '',
        tos: new Date().toISOString(),
        model: 'PC',
        serial_number: '',
        locale: 'en_US'
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!created.ok) return null;
    const device = await created.json();
    if (!device?.id || !device?.token) return null;

    const upgradeCtrl = new AbortController();
    const upgradeTimer = setTimeout(() => upgradeCtrl.abort(), 8000);
    const upgraded = await fetch(`${WARP_REGISTRATION_URL}/${device.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'CF-Client-Version': WARP_CLIENT_VERSION,
        'User-Agent': 'okhttp/3.12.1',
        Authorization: `Bearer ${device.token}`
      },
      body: JSON.stringify({
        key: pubB64,
        key_type: 'secp256r1',
        tunnel_type: 'masque',
        ...(license ? { license, warp_enabled: true } : {})
      }),
      signal: upgradeCtrl.signal
    });
    clearTimeout(upgradeTimer);
    if (!upgraded.ok) return null;
    const reg = await upgraded.json();
    const peer = reg?.config?.peers?.[0] || {};
    const edgePublicKey = String(peer.public_key || '').replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
    const endpointHost = String(peer?.endpoint?.v4 || '').split(':')[0];
    const ports = (Array.isArray(peer?.endpoint?.ports) ? peer.endpoint.ports : [])
      .map(port => parseInt(port, 10))
      .filter(port => port > 0);
    const data = {
      privateKey: bytesToBase64(buildSec1PrivateKey(jwk)),
      publicKey: edgePublicKey,
      address4: reg?.config?.interface?.addresses?.v4 || '',
      address6: reg?.config?.interface?.addresses?.v6 || '',
      server: endpointHost || '162.159.198.2',
      ports: ports.length ? ports : WARP_MASQUE_PORTS.slice(),
      license: reg?.account?.license || ''
    };
    if (!data.privateKey || !data.publicKey || !data.address4) return null;
    warpMasqueCache = { key: cacheKey, at: Date.now(), data };
    return data;
  } catch (_e) {
    return null;
  }
}

// نودهای MASQUE: چند پورت از همان لبهٔ ثبت‌شده — لوکیشن خروج را کلادفلر انتخاب می‌کند
// و قابل پین‌کردن نیست؛ پس برچسب هر نود پورت/لبه است، نه کشور.
async function buildWarpMasqueNodes(cfg = {}) {
  if (!isEnabledValue(cfg.warpMasque, true)) return [];
  const reg = await fetchWarpMasqueRegistration(cfg);
  if (!reg) return [];
  const wanted = parseInt(cfg.warpMasqueCount, 10);
  const count = Math.max(1, Math.min(6, Number.isFinite(wanted) && wanted > 0 ? wanted : 3));
  const ordered = [...new Set([...WARP_MASQUE_PORTS.filter(p => reg.ports.includes(p)), ...reg.ports])];
  return ordered.slice(0, count).map((port, idx) => ({
    name: `WARP MASQUE ${idx + 1} · ${port}`,
    server: reg.server,
    port,
    privateKey: reg.privateKey,
    publicKey: reg.publicKey,
    address4: reg.address4,
    address6: reg.address6
  }));
}

// لیست نقاط پایانی: مقدار دستی پنل (ip:port#برچسب) یا رنج‌های رسمی WARP
function parseWarpEndpointList(raw, count, family = 'auto', seed = '') {
  const manual = String(raw || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  if (manual.length) {
    return manual.map(item => {
      const [addrPart, labelPart] = item.split('#');
      const clean = String(addrPart || '').trim();
      const bracketed = clean.match(/^\[([^\]]+)\](?::(\d+))?$/);
      const plain = clean.match(/^([^:]+)(?::(\d+))?$/);
      const host = bracketed ? bracketed[1] : (plain ? plain[1] : clean);
      const port = parseInt((bracketed ? bracketed[2] : plain?.[2]) || String(WARP_DEFAULT_PORT), 10);
      return { host, port, label: String(labelPart || '').trim() };
    }).filter(x => x.host);
  }
  const wanted = Math.max(1, Math.min(parseInt(count, 10) || WARP_ML_CONF_COUNT, 30));
  const fam = String(family || 'auto').toLowerCase();
  const v4Hosts = WARP_ENDPOINT_IPS.filter(host => !String(host).includes(':'));
  const v6Hosts = WARP_ENDPOINT_IPS.filter(host => String(host).includes(':'));
  // انتخاب پایدار بر اساس بذر کاربر/تنظیمات (نه ساعت): با پینگ و رفرش ساب
  // اندپوینت‌های چندلوکیشن جابه‌جا نمی‌شوند.
  const shift = Math.abs(awgHash(`${seed}:${fam}:${wanted}`)) % 97;
  const out = [];
  for (let i = 0; i < wanted; i++) {
    let host = '';
    let isV6 = false;
    if (fam === 'domain') {
      host = WARP_DEFAULT_HOST;
    } else if (fam === 'v6' && v6Hosts.length) {
      host = v6Hosts[(shift + i) % v6Hosts.length];
      isV6 = true;
    } else if (fam === 'v4' && v4Hosts.length) {
      host = v4Hosts[(shift + i) % v4Hosts.length];
    } else {
      // ترکیب دو طرفه: هر از گاهی اندپوینت IPv6 هم می‌آید تا کاربر نسخهٔ دوم را هم داشته باشد
      isV6 = v6Hosts.length > 0 && wanted >= 4 && i % 3 === 2;
      const pool = isV6 ? v6Hosts : v4Hosts;
      host = pool[(shift + i) % pool.length];
    }
    if (!host) continue;
    const port = WARP_ENDPOINT_PORTS[(shift + i) % WARP_ENDPOINT_PORTS.length];
    out.push({ host, port, label: isV6 ? 'IPv6' : '' });
  }
  return out;
}

// ============================================================================
// AmneziaWG — همان WireGuard با پارامترهای مبهم‌سازی (Jc/Jmin/Jmax/S1/S2/H1..H4)
// مقادیر پایدار بر اساس سرور و پورت ساخته می‌شوند تا با هر بار تازه‌سازی ساب‌لینک
// عوض نشوند؛ بازه‌ها مطابق نمونه‌های رسمی AmneziaWG انتخاب شده‌اند.
// ============================================================================
function awgHash(text) {
  let h = 2166136261 >>> 0;
  const str = String(text || '');
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  return h >>> 0;
}

// نسخه‌های AmneziaWG: نسخهٔ ۱ فقط بسته‌های Junk، نسخهٔ ۲ پدینگ/هدر و بسته‌های
// امضایی I1..I5 را اضافه می‌کند و نسخهٔ ۳ تنظیمات زمان‌بندی و
// ContentPaddingAddition را هم می‌آورد. برای WARP (همتای وایرگارد استاندارد)
// مقدار S/H صفر و ۱..۴ است، وگرنه هندشیک رد می‌شود.
function normalizeAwgVersion(value) {
  const v = String(value == null ? '' : value).trim();
  return v === '1' || v === '2' || v === '3' ? v : '3';
}

// رشتهٔ امضای CPS برای بسته‌های ویژهٔ AmneziaWG — فقط تگ‌های مجاز
// (<b 0x..> بایت ثابت، <r N> بایت تصادفی، <rc N> حرف، <rd N> رقم، <t> زمان)
function buildAwgSignatureCps(idx, next) {
  const fixed = ['ce00000001', 'f6ab3267fa', 'a10000000200', '8d00000001', 'e700000001'];
  const hex = fixed[idx % fixed.length];
  const letters = next(6, 14);
  const rand = next(24, 64);
  if (idx % 2 === 0) return `<b 0x${hex}><rc ${letters}><t><r ${rand}>`;
  return `<b 0x${hex}><t><rd ${letters}><r ${rand}>`;
}

function buildAmneziaWgParams(config = {}) {
  const version = normalizeAwgVersion(config.awgv);
  const seed = `${config.seed || ''}:${config.server || WARP_DEFAULT_HOST}:${config.port || WARP_DEFAULT_PORT}:${config.publicKey || WARP_PEER_PUBLIC_KEY}:v${version}`;
  let h = awgHash(seed) || 1;
  const next = (min, max) => {
    h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    return min + (h % (max - min + 1));
  };
  const jmin = next(40, 70);
  const jmax = jmin + next(950, 1150);
  const jc = next(3, 7);
  // سرورهای WARP وایرگارد استاندارد هستند: هدر و پدینگ دست‌کاری‌شده را رد می‌کنند.
  // پس S همیشه صفر و H1..H4 همان ۱..۴ وایرگارد می‌ماند؛ فقط بسته‌های Junk و
  // بسته‌های امضایی (که سمت سرور نادیده گرفته می‌شوند) فعال‌اند.
  const fullObfuscation = config.obfuscateHandshake === true && version === '1';
  const base = {
    version,
    jc,
    jmin,
    jmax,
    s1: fullObfuscation ? next(20, 60) : 0,
    s2: fullObfuscation ? next(30, 90) : 0,
    s3: 0,
    s4: 0,
    h1: fullObfuscation ? next(100000, 800000) : 1,
    h2: 0,
    h3: 0,
    h4: 0
  };
  base.h2 = fullObfuscation ? base.h1 + next(1, 4000) : 2;
  base.h3 = fullObfuscation ? base.h1 + next(4001, 9000) : 3;
  base.h4 = fullObfuscation ? base.h1 + next(9001, 16000) : 4;
  if (version === '1') return base;

  // ‏۲.x و ۳.x: بسته‌های امضایی I1..I3 + بسته‌های اضافی؛ همه سمت کلاینت
  const signatures = [];
  const sigCount = version === '3' ? 3 : 2;
  for (let i = 0; i < sigCount; i++) signatures.push(buildAwgSignatureCps(i, next));
  base.signatures = signatures;
  base.paddingAddition = `${next(10, 40)}-${next(60, 120)}`;
  if (version === '3') {
    base.rekeyAfterTime = `${next(100, 110)}-${next(115, 130)}`;
    base.rekeyTimeout = `${next(3, 4)}-${next(5, 8)}`;
    base.rejectAfterTime = `${next(150, 165)}-${next(175, 195)}`;
    base.keepaliveTimeout = `${next(5, 8)}-${next(12, 18)}`;
    base.maxHandshakeAttempts = `${next(15, 17)}-${next(18, 22)}`;
  }
  return base;
}

// قالب استاندارد wireguard:// (سازگار با v2rayN/NekoBox/Hiddify) + پارامترهای AmneziaWG
function buildWireguardLink(config = {}, name = 'WARP') {
  const host = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = host.includes(':') ? `[${host}]` : host;
  const awg = config.awg === false ? null : buildAmneziaWgParams({ ...config, awgv: config.awgv || '3' });
  const params = new URLSearchParams();
  params.set('publickey', config.publicKey || WARP_PEER_PUBLIC_KEY);
  params.set('reserved', (Array.isArray(config.reserved) ? config.reserved : [0, 0, 0]).join(','));
  const address = String(config.address4 || WARP_DEFAULT_ADDRESS);
  params.set('address', `${address}/32`);
  params.set('mtu', String(parseInt(config.mtu, 10) || 1280));
  params.set('dns', String(config.dns || '1.1.1.1,1.0.0.1').replace(/\s+/g, ''));
  if (config.address6) params.set('address6', String(config.address6));
  if (awg) {
    params.set('awg', awg.version || '1');
    params.set('jc', String(awg.jc));
    params.set('jmin', String(awg.jmin));
    params.set('jmax', String(awg.jmax));
    // مقادیر صفر در لینک نوشته نمی‌شوند (کلاینت آن‌ها را پیش‌فرض وایرگارد می‌گیرد)
    for (const key of ['s1', 's2', 's3', 's4', 'h1', 'h2', 'h3', 'h4']) {
      if (awg[key] > 0) params.set(key, String(awg[key]));
    }
    if (awg.paddingAddition) params.set('cpa', awg.paddingAddition);
    (awg.signatures || []).forEach((sig, idx) => params.set(`i${idx + 1}`, sig));
  }
  const userInfo = encodeURIComponent(String(config.privateKey || ''));
  return `wireguard://${userInfo}@${endpoint}:${config.port || WARP_DEFAULT_PORT}?${params.toString()}#${encodeURIComponent(name)}`;
}

// فایل کانفیگ .conf قابل ایمپورت در AmneziaWG / WireGuard
// (کلیدهای Reserved عمداً به‌صورت کامنت می‌آیند تا پارسر کلاینت خطا ندهد)
function buildWireGuardConf(config = {}, name = 'WARP') {
  const awg = buildAmneziaWgParams(config);
  const endpointHost = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = endpointHost.includes(':') ? `[${endpointHost}]` : endpointHost;
  const reserved = (Array.isArray(config.reserved) ? config.reserved : [0, 0, 0]).join(', ');
  const mtu = parseInt(config.mtu, 10) || 1280;
  const dns = String(config.dns || '1.1.1.1, 1.0.0.1');
  const family = String(config.server || '').includes(':') ? 'IPv6' : 'IPv4';
  const lines = [
    `# ${name} — ${BRAND_NAME}`,
    `# AmneziaWG profile — junk packets only (Jc/Jmin/Jmax) keep WARP handshake intact`,
    `# endpoint family: ${family} | MTU ${mtu}`,
    `# Reserved (WARP client id): ${reserved}`,
    '[Interface]',
    `PrivateKey = ${config.privateKey || ''}`,
    `Address = ${config.address4 || WARP_DEFAULT_ADDRESS}/32`
  ];
  if (config.address6) lines.push(`Address = ${config.address6}`);
  lines.push(`DNS = ${dns}`, `MTU = ${mtu}`);
  lines.push(
    `Jc = ${awg.jc}`,
    `Jmin = ${awg.jmin}`,
    `Jmax = ${awg.jmax}`
  );
  // پارامترهای پدینگ/هدر فقط در حالت مبهم‌سازی کامل نوشته می‌شوند؛ صفر برای
  // WARP لازم است و گرنه هندشیک وایرگارد استاندارد رد می‌شود.
  for (const [key, value] of [['S1', awg.s1], ['S2', awg.s2], ['S3', awg.s3], ['S4', awg.s4], ['H1', awg.h1], ['H2', awg.h2], ['H3', awg.h3], ['H4', awg.h4]]) {
    if (value > 0) lines.push(`${key} = ${value}`);
  }
  // AmneziaWG 2.x/3.x: بسته‌های امضایی و تنظیمات زمان‌بندی (فقط سمت کلاینت)
  (awg.signatures || []).forEach((sig, idx) => lines.push(`I${idx + 1} = ${sig}`));
  if (awg.paddingAddition) lines.push(`ContentPaddingAddition = ${awg.paddingAddition}`);
  if (awg.rekeyAfterTime) lines.push(`RekeyAfterTime = ${awg.rekeyAfterTime}`);
  if (awg.rekeyTimeout) lines.push(`RekeyTimeout = ${awg.rekeyTimeout}`);
  if (awg.rejectAfterTime) lines.push(`RejectAfterTime = ${awg.rejectAfterTime}`);
  if (awg.keepaliveTimeout) lines.push(`KeepaliveTimeout = ${awg.keepaliveTimeout}`);
  if (awg.maxHandshakeAttempts) lines.push(`MaxHandshakeAttempts = ${awg.maxHandshakeAttempts}`);
  lines.push(
    '[Peer]',
    `PublicKey = ${config.publicKey || WARP_PEER_PUBLIC_KEY}`,
    'AllowedIPs = 0.0.0.0/0, ::/0',
    'PersistentKeepalive = 25',
    `Endpoint = ${endpoint}:${config.port || WARP_DEFAULT_PORT}`
  );
  // لایسنس حساب هرگز داخل فایل کاربر نوشته نمی‌شود (نشت کلید پولی)
  return lines.join('\n') + '\n';
}

// کانفیگ WireGuard استاندارد (بدون پارامترهای امنزیا) — برای کلاینت‌هایی که
// AmneziaWG ندارند ولی WARP ساده را کامل پشتیبانی می‌کنند.
function buildPlainWireGuardConf(config = {}, name = 'WARP') {
  const endpointHost = String(config.server || WARP_DEFAULT_HOST);
  const endpoint = endpointHost.includes(':') ? `[${endpointHost}]` : endpointHost;
  const mtu = parseInt(config.mtu, 10) || 1280;
  const dns = String(config.dns || '1.1.1.1, 1.0.0.1');
  return [
    `# ${name} — ${BRAND_NAME} (WireGuard)`,
    '[Interface]',
    `PrivateKey = ${config.privateKey || ''}`,
    `Address = ${config.address4 || WARP_DEFAULT_ADDRESS}/32`,
    `DNS = ${dns}`,
    `MTU = ${mtu}`,
    '[Peer]',
    `PublicKey = ${config.publicKey || WARP_PEER_PUBLIC_KEY}`,
    'AllowedIPs = 0.0.0.0/0, ::/0',
    'PersistentKeepalive = 25',
    `Endpoint = ${endpoint}:${config.port || WARP_DEFAULT_PORT}`
  ].join('\n') + '\n';
}

// بستهٔ کانفیگ‌های آمادهٔ WARP برای دانلود (zip) — بدون نیاز به هیچ تنظیمی در پنل:
// WARP، WARP PRO، ماتریس کامل اندپوینت‌های IPv4/IPv6 در چند پورت و چند پروفایل
// مبهم‌سازی. پارامترها بر اساس شناسهٔ کاربر ساخته می‌شوند تا هر کاربر بستهٔ
// اختصاصی خودش را بگیرد (امضای شبکه‌ای یکسان برای همهٔ کاربران خطرناک است).
const WARP_ML_CONF_COUNT = 8;

// پروفایل‌های آماده: MTU و DNS متفاوت → رفتار متفاوت در DPI اپراتورها
const WARP_PROFILE_PRESETS = {
  balanced: { mtu: 1280, dns: '1.1.1.1, 1.0.0.1' },
  aggressive: { mtu: 1180, dns: '1.1.1.1' },
  lite: { mtu: 1380, dns: '1.0.0.1, 1.1.1.1' },
  mobile: { mtu: 1240, dns: '1.1.1.1, 1.0.0.1' }
};

// پروفایل‌های مبهم‌سازی WARP: هر پروفایل نسخهٔ AmneziaWG، MTU و DNS متفاوت دارد
// تا یک نود در DPI یک اپراتور کار کند و دیگری نه؛ همه روی همان اندپوینت اصلی.
const WARP_OBF_PROFILES = [
  { id: 'lite', name: 'WARP OBF LITE', awgv: '1', mtu: 1320, dns: '1.0.0.1' },
  { id: 'balanced', name: 'WARP OBF BALANCED', awgv: '2', mtu: 1280, dns: '1.1.1.1' },
  { id: 'aggressive', name: 'WARP OBF AGGRESSIVE', awgv: '3', mtu: 1180, dns: '1.1.1.1, 1.0.0.1' },
  { id: 'stealth', name: 'WARP OBF STEALTH', awgv: '2', mtu: 1240, dns: '1.0.0.1, 1.1.1.1' }
];

function warpEndpointTag(host) {
  return String(host).replace(/:/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
}

async function buildWarpConfBundle(cfg = {}, options = {}) {
  const registered = await fetchWarpRegistration(cfg);
  const base = registered || buildFallbackWarpConfig();
  const awgv = normalizeAwgVersion(cfg.awgv);
  const seed = String(options.seed || cfg.wk || BRAND_NAME);
  const v4Hosts = WARP_ENDPOINT_IPS.filter(host => !String(host).includes(':'));
  const v6Hosts = WARP_ENDPOINT_IPS.filter(host => String(host).includes(':'));
  const shift = awgHash(seed) % Math.max(1, v4Hosts.length);
  const v4Rotated = [...v4Hosts.slice(shift), ...v4Hosts.slice(0, shift)];
  const ports = WARP_ENDPOINT_PORTS;

  const entries = [];
  const add = (host, port, preset, kind) => entries.push({ host, port, preset, kind });
  // ۱) پروفایل اصلی روی اندپوینتی که ثبت‌نام برگرداند
  add(base.server || WARP_DEFAULT_HOST, base.port || WARP_DEFAULT_PORT, 'balanced', 'primary');
  add(base.server || WARP_DEFAULT_HOST, WARP_DEFAULT_PORT, 'aggressive', 'primary');
  // ۲) ماتریس IPv4: چهار آی‌پی × چهار پورت
  v4Rotated.slice(0, 4).forEach((host, idx) => {
    ports.forEach((port, pIdx) => {
      add(host, port, (idx + pIdx) % 2 === 0 ? 'balanced' : 'lite', 'v4');
    });
  });
  // ۳) اندپوینت‌های IPv6 — تونل دوطرفه (ترافیک v4/v6 از زیرساخت v6 عبور می‌کند)
  v6Hosts.forEach((host, idx) => {
    [2408, 500].forEach((port, pIdx) => {
      add(host, port, (idx + pIdx) % 2 === 0 ? 'mobile' : 'balanced', 'v6');
    });
  });
  // ۴) اندپوینت دامنه‌ای (dual-stack) برای شبکه‌هایی که IP خام را می‌بندند
  [2408, 1701].forEach((port, idx) => add(WARP_DEFAULT_HOST, port, idx === 0 ? 'balanced' : 'aggressive', 'dns'));

  const files = [];
  const used = new Set();
  const pushFile = (fileName, label, entry, presetId) => {
    const preset = WARP_PROFILE_PRESETS[presetId] || WARP_PROFILE_PRESETS.balanced;
    let name = fileName;
    let n = 2;
    while (used.has(name)) name = fileName.replace(/\.conf$/, `-${n++}.conf`);
    used.add(name);
    files.push({
      name,
      data: buildWireGuardConf(
        { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awgv, seed: `${seed}:${name}` },
        label
      )
    });
  };

  pushFile('01-WARP.conf', 'WARP', entries[0], 'balanced');
  pushFile('02-WARP-PRO.conf', 'WARP PRO', entries[1], 'aggressive');
  entries.slice(2).forEach(entry => {
    const tag = `${entry.kind}-${warpEndpointTag(entry.host)}-${entry.port}`;
    pushFile(
      `WARP-${tag}-${entry.preset}.conf`,
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port} ${entry.preset}`,
      entry,
      entry.preset
    );
  });
  // پنجرهٔ امتحان پروفایل‌ها روی همان اندپوینت اصلی (برای تست MTU/DNS در اپراتور)
  for (const presetId of Object.keys(WARP_PROFILE_PRESETS)) {
    pushFile(`WARP-profile-${presetId}.conf`, `WARP ${presetId}`, entries[0], presetId);
  }

  // پروفایل‌های مبهم‌سازی مختلف روی همان اندپوینت: AWG1 (فقط Junk)، AWG2
  // (امضایی + پدینگ) و AWG3 (زمان‌بندی کامل) با MTU/DNS متفاوت.
  const obfLinks = [];
  for (const obf of WARP_OBF_PROFILES) {
    const profileSeed = `${seed}:obf:${obf.id}`;
    files.push({
      name: `WARP-obf-${obf.id}.conf`,
      data: buildWireGuardConf(
        {
          ...base,
          server: entries[0].host,
          port: entries[0].port,
          mtu: obf.mtu,
          dns: obf.dns,
          awgv: obf.awgv,
          seed: profileSeed
        },
        obf.name
      )
    });
    obfLinks.push(buildWireguardLink(
      {
        ...base,
        server: entries[0].host,
        port: entries[0].port,
        mtu: obf.mtu,
        dns: obf.dns,
        awgv: obf.awgv,
        seed: profileSeed
      },
      obf.name
    ));
  }
  files.push({ name: 'links-obf.txt', data: obfLinks.join('\n') + '\n' });

  const links = entries.map(entry => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return buildWireguardLink(
      { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awgv, seed: `${seed}:link:${entry.host}:${entry.port}` },
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
    );
  });
  files.push({ name: 'links.txt', data: links.join('\n') + '\n' });

  // لینک‌های «وایرگارد ساده» بدون پارامترهای AmneziaWG: بعضی کلاینت‌ها
  // (v2rayN / NekoBox / Shadowrocket) پارامترهای i1/i2/i3 و cpa را نمی‌شناسند و
  // کل لینک را رد می‌کنند؛ ساب base64 از همین نسخهٔ ساده ساخته می‌شود.
  const plainLinks = entries.map(entry => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return buildWireguardLink(
      { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns, awg: false, seed: `${seed}:plain:${entry.host}:${entry.port}` },
      `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
    );
  });
  files.push({ name: 'links-plain.txt', data: plainLinks.join('\n') + '\n' });

  // ---- همهٔ فرمت‌های دیگر WARP در همین زیپ ----
  const reservedArr = (Array.isArray(base.reserved) ? base.reserved : [0, 0, 0]).slice(0, 3);
  const dnsList = String(base.dns || '1.1.1.1, 1.0.0.1').split(',').map(item => item.trim()).filter(Boolean);
  const localAddress = [base.address4 || WARP_DEFAULT_ADDRESS];
  if (base.address6) localAddress.push(base.address6);

  // ۱) ساب‌لینک base64 (v2rayN / NekoBox / Hiddify) — با لینک‌های استاندارد WireGuard
  files.push({ name: 'WARP-sub-base64.txt', data: encodeBase64Utf8(plainLinks.join('\n')) + '\n' });

  // ۲) Clash Meta / Mihomo
  const proxyNames = [];
  const clashProxies = entries.map((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    const proxyName = `WARP ${idx + 1} ${entry.kind} ${entry.port}`;
    proxyNames.push(proxyName);
    const awg = buildAmneziaWgParams({ ...base, awgv, seed: `${seed}:clash:${entry.host}:${entry.port}` });
    const parts = [
      `name: "${proxyName}"`,
      'type: wireguard',
      `server: "${entry.host}"`,
      `port: ${entry.port}`,
      `ip: ${localAddress[0]}/32`,
      `private-key: "${base.privateKey || ''}"`,
      `public-key: "${base.publicKey || WARP_PEER_PUBLIC_KEY}"`,
      `mtu: ${preset.mtu}`,
      'udp: true',
      `reserved: [${reservedArr.join(', ')}]`,
      `dns: [${dnsList.map(item => `"${item}"`).join(', ')}]`,
      'allowed-ips: ["0.0.0.0/0", "::/0"]',
      'remote-dns-resolve: true'
    ];
    if (awgv >= 2) {
      parts.push(`amnezia-wg-option: { jc: ${awg.jc}, jmin: ${awg.jmin}, jmax: ${awg.jmax}, s1: 0, s2: 0, h1: 1, h2: 2, h3: 3, h4: 4 }`);
    }
    return `  - { ${parts.join(', ')} }`;
  });
  // ۲-ب) MASQUE در بستهٔ مستقل /warp/masque ارائه می‌شود و عمداً در این ZIP نیست.

  files.push({
    name: 'WARP-clash.yaml',
    data: [
      `# ${BRAND_NAME} — WARP / WARP PRO / multi-location`,
      '# Clash Meta / Mihomo (clash-verge, flclash, stash)',
      `# profiles: ${entries.length} — AmneziaWG junk packets, headers stay default for WARP`,
      'mixed-port: 7890',
      'allow-lan: false',
      'mode: rule',
      'log-level: warning',
      'dns:',
      '  enable: true',
      '  enhanced-mode: fake-ip',
      '  nameserver:',
      ...dnsList.map(item => `    - ${item}`),
      'proxies:',
      ...clashProxies,
      'proxy-groups:',
      '  - name: "WARP"',
      '    type: select',
      '    proxies:',
      ...proxyNames.map(name => `      - "${name}"`),
      '      - DIRECT',
      'rules:',
      '  - MATCH,WARP'
    ].join('\n') + '\n'
  });

  // ۳) sing-box
  const sbOutbounds = entries.map((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    return {
      type: 'wireguard',
      tag: `WARP ${idx + 1} ${entry.kind} ${entry.port}`,
      server: entry.host,
      server_port: entry.port,
      local_address: localAddress.map(item => (item.includes('/') ? item : item.includes(':') ? `${item}/128` : `${item}/32`)),
      private_key: base.privateKey || '',
      peer_public_key: base.publicKey || WARP_PEER_PUBLIC_KEY,
      mtu: preset.mtu,
      reserved: reservedArr
    };
  });
  const singboxConfig = {
    log: { level: 'warn' },
    inbounds: [{ type: 'mixed', tag: 'mixed-in', listen: '127.0.0.1', listen_port: 2080 }],
    outbounds: [
      {
        type: 'selector',
        tag: 'select',
        outbounds: sbOutbounds.map(item => item.tag).concat(['direct']),
        default: sbOutbounds.length ? sbOutbounds[0].tag : 'direct'
      },
      ...sbOutbounds,
      { type: 'direct', tag: 'direct' }
    ],
    route: { final: 'select' }
  };
  files.push({ name: 'WARP-singbox.json', data: JSON.stringify(singboxConfig, null, 2) + '\n' });

  // ۴) WireGuard خالص (بدون پارامترهای امنزیا) برای کلاینت‌های معمولی
  entries.slice(0, 6).forEach((entry, idx) => {
    const preset = WARP_PROFILE_PRESETS[entry.preset] || WARP_PROFILE_PRESETS.balanced;
    files.push({
      name: `plain-wireguard/${String(idx + 1).padStart(2, '0')}-${entry.kind}-${warpEndpointTag(entry.host)}-${entry.port}-${entry.preset}.conf`,
      data: buildPlainWireGuardConf(
        { ...base, server: entry.host, port: entry.port, mtu: preset.mtu, dns: preset.dns },
        `WARP ${entry.kind.toUpperCase()} ${entry.host}:${entry.port}`
      )
    });
  });

  const endpointList = [
    `# ${BRAND_NAME} — WARP endpoint matrix`,
    `# IPv4: ${v4Hosts.length} hosts x ${ports.length} ports`,
    `# IPv6: ${v6Hosts.length} hosts x 2 ports`,
    '',
    ...entries.map(entry => `${entry.kind}\t${entry.host}\t${entry.port}\t${entry.preset}`)
  ].join('\n');
  files.push({ name: 'endpoints.txt', data: endpointList + '\n' });

  files.push({
    name: 'README.txt',
    data: [
      `${BRAND_NAME} — WARP / WARP PRO / multi-location`,
      '',
      `files: ${files.length + 1} — IPv4 + IPv6 endpoints, multiple UDP ports, 4 tuning profiles`,
      '',
      'formats inside this zip:',
      '  *.conf ................ AmneziaWG profile (Jc/Jmin/Jmax + AWG2/AWG3 signatures)',
      '  plain-wireguard/*.conf . standard WireGuard profile (no AmneziaWG keys)',
      '  WARP-clash.yaml ....... Clash Meta / Mihomo profile (clash-verge, flclash, stash)',
      '  WARP-obf-*.conf ....... 4 obfuscation profiles (AWG1 junk / AWG2 / AWG3 / stealth)',
      '  WARP-singbox.json ..... sing-box config with a selector group',
      '  links.txt ............. wireguard:// links with AmneziaWG tuning (Hiddify / NekoBox)',
      '  links-obf.txt ......... wireguard:// links for the 4 obfuscation profiles',
      '  links-plain.txt ....... plain wireguard:// links (any WireGuard-capable client)',
      '  WARP-sub-base64.txt ... same links in base64 subscription form',
      '',
      'WARP MASQUE (HTTP/3) deliberately lives in its own bundle:',
      '  /warp/masque/<token>?format=zip|clash|json|links',
      '  endpoints.txt ......... endpoint matrix (host / port / profile)',
      '',
      'AmneziaWG: import any .conf into AmneziaWG (Windows / Android / iOS / macOS).',
      'WireGuard: use plain-wireguard/ if your client does not support AmneziaWG.',
      'Jc/Jmin/Jmax send junk packets before the handshake; S/H stay 0 because',
      'Cloudflare WARP is a plain WireGuard peer and rejects modified headers.',
      'If a profile does not connect, try another port (500/1701/4500) or the IPv6 file.',
      '',
      `endpoint: ${base.server}:${base.port}`,
      `address:  ${base.address4}/32${base.address6 ? ' + ' + base.address6 : ''}`,
      `profile:  ${seed.slice(0, 8)}`
    ].join('\n')
  });
  return { config: base, files };
}

// خانوادهٔ WARP: یک نود WARP، یک نود WARP PRO (با لایسنس) و N نود چندلوکیشن
async function buildWarpFamilyLinks(cfg = {}, options = {}) {
  const links = [];
  // always=true (ساب‌لینک و دانلود بدون تنظیم) → WARP و WARP PRO همیشه ساخته می‌شوند
  const always = options.always === true;
  // هر کلید WARP مستقل عمل می‌کند: خاموش‌کردن WARP نباید PRO یا چندلوکیشن را
  // هم حذف کند، و روشن‌بودن هر کلید باید در خروجی دیده شود.
  const wantWarp = isEnabledValue(cfg.warp, always);
  const wantPro = isEnabledValue(cfg.warpPro, false);
  const wantMl = isEnabledValue(cfg.warpMl, false);
  if (!wantWarp && !wantPro && !wantMl) return links;

  const registered = await fetchWarpRegistration(cfg);
  const base = registered || buildFallbackWarpConfig();
  // نسخهٔ AmneziaWG (۱/۲/۳) در همهٔ نودهای WARP اعمال می‌شود
  const awgv = normalizeAwgVersion(cfg.awgv);
  // پروفایل پیش‌فرض قابل انتخاب: MTU و DNS روی همهٔ نودهای WARP می‌نشیند
  const mtu = parseInt(cfg.warpMtu, 10) > 0 ? parseInt(cfg.warpMtu, 10) : 0;
  const dnsMap = { cloudflare: '1.1.1.1', 'cloudflare-alt': '1.0.0.1', both: '1.1.1.1,1.0.0.1', google: '8.8.8.8' };
  const dns = dnsMap[String(cfg.warpDns || '').toLowerCase()] || '';
  const profiled = extra => ({ ...base, ...(mtu ? { mtu } : {}), ...(dns ? { dns } : {}), ...extra });
  const obfMode = String(cfg.warpObf || 'all').toLowerCase();
  const obfProfiles = obfMode === 'off'
    ? []
    : obfMode === 'all'
      ? WARP_OBF_PROFILES
      : WARP_OBF_PROFILES.filter(profile => profile.id === obfMode);

  if (wantWarp) {
    links.push(buildWireguardLink(profiled({ awgv, seed: `warp:${awgv}` }), buildNodeDisplayName({ proto: 'warp', family: 'WireGuard', awg: awgv })));
    // همان اندپوینت با سطوح مختلف مبهم‌سازی (AWG1 junk / AWG2 / AWG3 / stealth)
    for (const obf of obfProfiles) {
      links.push(buildWireguardLink(
        profiled({ awgv: obf.awgv, mtu: mtu || obf.mtu, dns: dns || obf.dns, seed: `warp:obf:${obf.id}` }),
        `${buildNodeDisplayName({ proto: 'warp', family: 'WireGuard', awg: obf.awgv })} · OBF ${obf.id.toUpperCase()}`
      ));
    }
  }
  if (wantPro) {
    // بدون لایسنس هم ساخته می‌شود (کلید رایگان) تا کاربر هیچ تنظیمی لازم نداشته باشد
    links.push(buildWireguardLink(profiled({ awgv, seed: `warp_pro:${awgv}` }), buildNodeDisplayName({ proto: 'warp_pro', family: 'WireGuard', awg: awgv })));
  }
  if (wantMl) {
    const endpoints = parseWarpEndpointList(cfg.warpEndpoint, cfg.warpCount, cfg.warpFamily, String(cfg.wk || BRAND_NAME));
    endpoints.forEach((endpoint, idx) => {
      const label = String(endpoint.label || '').trim().toUpperCase();
      const meta = { proto: 'warp_ml', family: 'WireGuard', cc: /^[A-Z]{2}$/.test(label) ? label : '', awg: awgv };
      const name = `${buildNodeDisplayName(meta)} · ${label || 'EP'}-${idx + 1}`;
      links.push(buildWireguardLink(
        profiled({ server: endpoint.host, port: endpoint.port, awgv, seed: `warp_ml:${endpoint.host}:${endpoint.port}:${awgv}` }),
        name
      ));
    });
  }
  return links;
}

// ============================================================================
// OpenVPN — پروفایل‌های رایگان و زنده (VPNGate) با پشتیبانی چندکشوری
// ============================================================================

let openVpnCache = { at: 0, items: [], key: '' };
const OPENVPN_CACHE_TTL = 30 * 60 * 1000;
const OPENVPN_ROTATE_MS = 30 * 60 * 1000;
const OPENVPN_MAX_CHARS = 320000; // برش امن برای جلوگیری از دریافت کل فایل ۱.۳ مگابایتی

function extractOvpnDirective(text, name) {
  const match = String(text || '').match(new RegExp(`^\\s*${name}\\s+(.+)$`, 'mi'));
  return match ? match[1].trim() : '';
}

function extractOvpnBlock(text, tag) {
  const match = String(text || '').match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

async function readLimitedText(response, maxChars) {
  if (!response.body || typeof response.body.getReader !== 'function') {
    const full = await response.text();
    return full.slice(0, maxChars);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  try {
    while (text.length < maxChars) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch (_e) {
    // اگر برش خورد، همان مقدار خوانده‌شده کافی است
  }
  try { await reader.cancel(); } catch (_e) {}
  return text;
}

// تبدیل متن یک پروفایل ‎.ovpn‎ خام به نود قابل استفاده در Clash / خروجی ‎.ovpn‎
function parseOvpnProfileText(profileText, meta = {}) {
  const profile = String(profileText || '').replace(/\r\n/g, '\n');
  if (!profile.includes('remote ')) return null;
  const remote = extractOvpnDirective(profile, 'remote').split(/\s+/);
  const server = remote[0];
  if (!server) return null;
  const ca = extractOvpnBlock(profile, 'ca');
  if (!ca) return null;
  const cc = String(meta.country || '').trim().toUpperCase();
  const proto = (extractOvpnDirective(profile, 'proto') || 'udp').toLowerCase();
  return {
    name: meta.name || `OpenVPN-${cc || 'ML'}-${(parseInt(meta.index, 10) || 0) + 1}`,
    country: cc,
    server,
    port: parseInt(remote[1], 10) || 1194,
    proto: proto.startsWith('tcp') ? 'tcp' : 'udp',
    cipher: extractOvpnDirective(profile, 'cipher') || 'AES-128-CBC',
    auth: extractOvpnDirective(profile, 'auth') || 'SHA1',
    ca,
    cert: extractOvpnBlock(profile, 'cert'),
    key: extractOvpnBlock(profile, 'key'),
    tlsAuth: extractOvpnBlock(profile, 'tls-auth') || extractOvpnBlock(profile, 'tls-crypt'),
    keyDirection: extractOvpnDirective(profile, 'key-direction') || '1',
    username: OPENVPN_PUBLIC_USER,
    password: OPENVPN_PUBLIC_PASS,
    profile
  };
}

// تبدیل خطوط CSV منبع VPNGate به نودهای OpenVPN
function parseOpenVpnList(raw, cfg = {}) {
  if (!isEnabledValue(cfg.ovpn, true)) return [];
  const limit = Math.max(0, Math.min(parseInt(cfg.ovpnCount, 10) || 8, 24));
  if (limit === 0) return [];
  const countryFilter = String(cfg.ovpnCountries || '')
    .split(',')
    .map(x => x.trim().toUpperCase())
    .filter(Boolean);
  const seenCountries = new Set();
  const items = [];
  for (const line of String(raw || '').split(/\r?\n/)) {
    if (!line || line.startsWith('*') || line.startsWith('#')) continue;
    const cols = line.split(',');
    if (cols.length < 15) continue;
    const cc = String(cols[6] || '').trim().toUpperCase();
    const profileB64 = String(cols[cols.length - 1] || '').trim();
    if (!profileB64) continue;
    if (countryFilter.length && !countryFilter.includes(cc)) continue;
    // در حالت آزاد از هر کشور فقط یک سرور انتخاب می‌شود تا ساب‌لینک چندلوکیشن بماند
    if (!countryFilter.length && seenCountries.has(cc)) continue;
    const node = parseOvpnProfileText(decodeBase64Utf8(profileB64), { country: cc, index: items.length });
    if (!node) continue;
    const protoFilter = String(cfg.ovpnProto || 'auto').toLowerCase();
    if ((protoFilter === 'udp' || protoFilter === 'tcp') && node.proto !== protoFilter) continue;
    items.push(node);
    seenCountries.add(cc);
    if (items.length >= limit) break;
  }
  return items;
}

// پروفایل‌های تنظیم کلاینت OpenVPN — هر پروفایل همان تونل است با MTU/DNS متفاوت،
// تا در هر اپراتور حداقل یکی از پروفایل‌ها بالا بیاید (ضد فیلترینگ عملی).
const OVPN_TUNING_PRESETS = [
  { id: 'balanced', mtu: 1400, dns: '1.1.1.1' },
  { id: 'mtu-safe', mtu: 1340, dns: '1.0.0.1' },
  { id: 'mobile', mtu: 1240, dns: '1.1.1.1' }
];

// انتخاب پروفایل(های) تنظیم OpenVPN از مقدار فرم کاربر؛ هم ZIP و هم فایل
// تک‌نفره از همین تابع استفاده می‌کنند تا تنظیم فرم واقعاً در خروجی دیده شود.
function resolveOvpnTuningPresets(mode = 'all') {
  const wanted = String(mode || 'all').toLowerCase();
  const list = wanted === 'all'
    ? OVPN_TUNING_PRESETS
    : OVPN_TUNING_PRESETS.filter(preset => preset.id === wanted);
  return list.length ? list : OVPN_TUNING_PRESETS;
}

// افزودن تنظیمات امن/ضد DPI به یک پروفایل .ovpn بدون دست زدن به کلیدها و CA
// (هیچ دایرکتیو امنیتی سرور تغییر نمی‌کند؛ فقط پارامترهای سمت کلاینت تنظیم می‌شوند)
function buildOvpnVariant(profileText, node = {}, preset = {}, seed = '') {
  const text = String(profileText || '').replace(/\r\n/g, '\n').trimEnd();
  if (!text.includes('remote ')) return text;
  const presetId = preset.id || 'balanced';
  // جیتر کوچک بر اساس کاربر: هر کاربر MTU کمی متفاوت دارد (امضای DPI یکسان نباشد)
  const jitter = awgHash(`${seed}:${node.server || ''}:${node.port || ''}:${presetId}`) % 21;
  const mtu = Math.max(1100, (parseInt(preset.mtu, 10) || 1400) - jitter);
  const mssfix = Math.max(1000, mtu - 60);
  const stripped = text
    .replace(/^\s*(tun-mtu|mssfix|sndbuf|rcvbuf|persist-tun|nobind|resolv-retry|connect-retry|connect-retry-max|tls-version-min|dhcp-option DNS)\b.*$/gmi, '')
    .replace(/\n{3,}/g, '\n\n');
  const extra = [
    `# --- ${BRAND_NAME} tuning (${presetId}) ---`,
    `tun-mtu ${mtu}`,
    `mssfix ${mssfix}`,
    'sndbuf 0',
    'rcvbuf 0',
    'persist-tun',
    'nobind',
    'resolv-retry infinite',
    'connect-retry 1 2',
    'connect-retry-max 8',
    'tls-version-min 1.2',
    `dhcp-option DNS ${preset.dns || '1.1.1.1'}`
  ];
  return `${stripped}\n\n${extra.join('\n')}\n`;
}

function isOvpnCsv(text) {
  const head = String(text || '').slice(0, 400);
  return head.includes('OpenVPN_ConfigData_Base64') || head.startsWith('*vpn_servers') || head.includes('#HostName,IP,');
}

// انتخاب منابع: لیست سفارشی مدیر (ovpnSource) یا فایل‌های ‎.ovpn‎ مخزن گیت‌هاب، با چرخش دوره‌ای
function pickOpenVpnSources(cfg = {}, limit = 4) {
  const custom = String(cfg.ovpnSource || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  const pool = custom.length ? custom : OPENVPN_RAW_PROFILE_SOURCES;
  const countryFilter = String(cfg.ovpnCountries || '')
    .split(',')
    .map(x => x.trim().toUpperCase())
    .filter(Boolean);
  const withCountry = pool.map(url => {
    const match = String(url).match(/_([A-Za-z]{2})\.ovpn(?:[?#]|$)/);
    return { url, country: match ? match[1].toUpperCase() : '' };
  });
  const filtered = countryFilter.length
    ? withCountry.filter(item => !item.country || countryFilter.includes(item.country))
    : withCountry;
  if (!filtered.length) return [];
  const bucket = Math.floor(Date.now() / OPENVPN_ROTATE_MS);
  const shift = bucket % filtered.length;
  const rotated = [...filtered.slice(shift), ...filtered.slice(0, shift)];
  return rotated.slice(0, Math.max(1, limit));
}

async function fetchOpenVpnNodes(cfg = {}, force = false) {
  if (!isEnabledValue(cfg.ovpn, true)) return [];
  const limit = Math.max(0, Math.min(parseInt(cfg.ovpnCount, 10) || 8, 24));
  if (limit === 0) return [];
  // کلید کش شامل فیلترها هم هست؛ وگرنه تغییر پروتکل/کشور/تعداد، نتیجهٔ قدیمی را برمی‌گرداند
  const cacheKey = [limit, String(cfg.ovpnCountries || '').toUpperCase(), String(cfg.ovpnProto || 'auto').toLowerCase()].join('|');
  // کش فقط وقتی کافی است که به اندازهٔ درخواست پروفایل داشته باشد
  if (!force && openVpnCache.key === cacheKey && openVpnCache.items.length >= limit && Date.now() - openVpnCache.at < OPENVPN_CACHE_TTL) {
    return openVpnCache.items;
  }

  const fetchProfile = async (source, index) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const resp = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' },
        signal: controller.signal
      });
      if (!resp.ok) return [];
      const text = await readLimitedText(resp, OPENVPN_MAX_CHARS);
      clearTimeout(timer);
      if (isOvpnCsv(text)) return parseOpenVpnList(text, cfg);
      const node = parseOvpnProfileText(text, { country: source.country, index });
      return node ? [node] : [];
    } catch (_e) {
      return [];
    }
  };

  const collected = [];
  // ۱) فهرست زندهٔ VPNGate: چندین کشور با یک درخواست (پایدارترین منبع)
  for (const url of OPENVPN_CSV_SOURCES) {
    const nodes = await fetchProfile({ url, country: '' }, 0);
    if (nodes.length) {
      collected.push(...nodes);
      break;
    }
  }
  // ۲) پروفایل‌های خام مخزن برای تنوع بیشتر کشورها (با چرخش دوره‌ای)
  if (collected.length < limit) {
    const sources = pickOpenVpnSources(cfg, limit - collected.length + 2);
    const results = await Promise.allSettled(sources.map(fetchProfile));
    for (const result of results) {
      if (result.status === 'fulfilled' && Array.isArray(result.value)) collected.push(...result.value);
    }
  }

  const seen = new Set();
  const items = [];
  const protoFilter = String(cfg.ovpnProto || 'auto').toLowerCase();
  for (const node of collected) {
    if ((protoFilter === 'udp' || protoFilter === 'tcp') && node.proto !== protoFilter) continue;
    const key = `${node.server}:${node.port}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(node);
    if (items.length >= limit) break;
  }

  if (items.length) openVpnCache = { at: Date.now(), items, key: cacheKey };
  return items;
}

// ============================================================================
// آدرس واسط «تحریم‌شکن»: خروجی همهٔ نودها از یک پروکسی بیرون از ایران عبور
// می‍کند تا سرویس‌هایی که آی‌پی ایران را مسدود می‌کنند باز شوند. انتخاب پایدار
// است تا با هر بار خواندن ساب‌لینک عوض نشود.
// ============================================================================
function resolveSanctionsProxy(cfg = {}, seed = '') {
  const pool = Array.isArray(FALLBACK_PROXY_IPS) ? FALLBACK_PROXY_IPS : [];
  if (!pool.length) return '';
  const wanted = String(cfg.sbRegion || cfg.region || 'DE').trim().toUpperCase();
  const usable = wanted && wanted !== 'AUTO' ? pool.filter(item => String(item.regionCode).toUpperCase() === wanted) : [];
  const list = usable.length ? usable : pool;
  const idx = seed ? stableAddressSeed(String(seed) + '-sb') % list.length : 0;
  const picked = list[idx];
  return `${picked.domain}:${picked.port || 443}`;
}

// کش فهرست آی‌پی‌های ترجیحی (اپراتوری): این فهرست از شبکه خوانده می‌شود و
// بدون کش، با هر بار خواندن ساب‌لینک آدرس نودها عوض می‌شد (پرش آی‌پی در کلاینت).
const PREFERRED_CACHE_TTL = 6 * 60 * 60 * 1000;
let preferredIpsCache = { key: '', at: 0, list: [] };

// کش مشترک بین ایزوله‌ها: در ورکر هر درخواست ممکن است در ایزولهٔ تازه اجرا شود،
// پس فقط حافظهٔ محلی کافی نیست و فهرست در D1 هم نگه داشته می‌شود تا آدرس نودها
// برای همهٔ درخواست‌ها (و کلاینتها) یکی بماند.
function getD1(env) {
  const db = env && (env.DB || env.D1 || env.MILICONFIG_DB || env.MILI_DB);
  return db && typeof db.prepare === 'function' ? db : null;
}

async function readSharedCache(env, key) {
  const db = getD1(env);
  if (!db) return null;
  try {
    const row = await db.prepare('SELECT value FROM system_config WHERE key = ?').bind(key).first();
    if (!row || !row.value) return null;
    const parsed = JSON.parse(String(row.value));
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_e) {
    return null;
  }
}

async function writeSharedCache(env, key, payload) {
  const db = getD1(env);
  if (!db) return;
  try {
    await db.prepare(
      `INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    ).bind(key, JSON.stringify(payload), Date.now()).run();
  } catch (_e) {}
}

async function fetchPreferredIpsCached(cfg = {}, env = null) {
  const key = [cfg.ipv4, cfg.ipv6, cfg.ispMobile, cfg.ispUnicom, cfg.ispTelecom].join('|');
  const sharedKey = 'preferred_ips_cache_' + stableAddressSeed(key);
  if (preferredIpsCache.key === key && Date.now() - preferredIpsCache.at < PREFERRED_CACHE_TTL) {
    return preferredIpsCache.list;
  }
  const shared = await readSharedCache(env, sharedKey);
  if (shared && Array.isArray(shared.list) && shared.list.length && Date.now() - Number(shared.at || 0) < PREFERRED_CACHE_TTL) {
    preferredIpsCache = { key, at: Number(shared.at), list: shared.list };
    return shared.list;
  }
  const list = await fetchUouinPreferredIps(cfg).catch(() => []);
  if (Array.isArray(list) && list.length) {
    const at = Date.now();
    preferredIpsCache = { key, at, list };
    await writeSharedCache(env, sharedKey, { at, list });
  }
  return Array.isArray(list) ? list : [];
}

// کش کوتاه‌مدت لیست نودها: پاسخ یکسان برای همان کاربر/تنظیمات تا نودها بین
// دو بار خواندن ساب‌لینک (پینگ، بروزرسانی کلاینت) جابه‌جا نشوند و ساب صفحهٔ
// وضعیت و تب لوکیشن دقیقاً هماهنگ باشند.
//Cache کوتاه‌تر از TTL استخر است تا آدرس‌های تازهٔ منابع cfnew زودتر در ساب نشینند
const NODES_CACHE_TTL = 5 * 60 * 1000;
const NODES_CACHE_MAX = 80;
const nodesCache = new Map();

function buildNodesCacheKey(workerHost, userOrConfig, cfg, overrides = {}, epoch = 0) {
  const uuid = String(userOrConfig?.uuid || overrides.uuid || 'default').toLowerCase();
  const params = [
    overrides.set || '', overrides.country || '', overrides.region || '',
    overrides.proto || '', overrides.limit === undefined ? '' : String(overrides.limit),
    overrides.wk || '', overrides.scope || userOrConfig?.nodeScope || 'all',
    overrides.nowarp || ''
  ].join('|');
  return `${workerHost}|${uuid}|${stableAddressSeed(JSON.stringify(cfg))}|${params}|e${epoch}`;
}

// ---------------------------------------------------------------------------
// نوبت بروزرسانی (refresh epoch)
// آدرس نودها باید با هر بروزرسانی در کلاینت تازه شود، ولی با پینگ‌گرفتن یا
// درخواست تکراری نباید بپرد. «نوبت» را از پنجرهٔ زمانی سراسری می‌گیریم (نه از
// حافظهٔ یک ایزوله) تا همهٔ ایزوله‌ها و همهٔ درخواست‌های یک کلاینت در یک پنجره
// دقیقاً همان مجموعه آدرس را ببینند و فقط با شروع پنجرهٔ بعدی آدرس تازه بیاید.
// ---------------------------------------------------------------------------
const REFRESH_EPOCH_MS = 5 * 60 * 1000;

function nextRefreshEpoch(_key = '') {
  return Math.floor(Date.now() / REFRESH_EPOCH_MS);
}

function rememberNodes(key, links) {
  if (!key) return;
  nodesCache.set(key, { at: Date.now(), links });
  if (nodesCache.size > NODES_CACHE_MAX) {
    const oldest = [...nodesCache.entries()].sort((a, b) => a[1].at - b[1].at).slice(0, nodesCache.size - NODES_CACHE_MAX);
    for (const [entryKey] of oldest) nodesCache.delete(entryKey);
  }
}

// تولید لیست کامل لینک‌های نود برای کاربر با نام‌گذاری گویا (کشور/پروتکل/خانوادهٔ آدرس)
// و رعایت سقف تعداد نود در ساب
async function generateUserNodesList(userOrConfig, workerHost, queryOverrides = {}) {
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);
  // حالت آی‌پی ثابت: نودها به یک آدرس قفل می‌شوند و نوبت رفرش/پینگ هم روی
  // آدرس اثر ندارد؛ پس بذر و کلید کش هم ثابت می‌مانند.
  const fixedIpMode = cfg.ipMode === 'fixed';
  const rotationEpoch = fixedIpMode ? 0 : nextRefreshEpoch(String(userOrConfig?.uuid || queryOverrides.uuid || 'anonymous'));
  const cachedKey = buildNodesCacheKey(workerHost, userOrConfig, cfg, queryOverrides, rotationEpoch);
  const cached = nodesCache.get(cachedKey);
  if (cached && Date.now() - cached.at < NODES_CACHE_TTL) return cached.links.slice();
  // استخر لبهٔ ترکیبی دامنه/آی‌پی: پاسخ فوری از فهرست داخلی و تازه‌سازی
  // لیست‌های آنلاین در پس‌زمینه؛ تولید ساب‌لینک هیچ‌وقت منتظر شبکه نمی‌ماند.
  const edgePool = await getEdgePool(cfg, { waitUntil: queryOverrides.waitUntil });
  const userUuid = String(userOrConfig?.uuid || queryOverrides.uuid || '351c9981-04b6-4103-aa4b-864aa9c91469').toLowerCase();
  // بذر انتخاب آدرس: شناسهٔ کاربر + نوبت بروزرسانی (نه زمان لحظه‌ای)
  const addrSeed = `${userUuid}~${fixedIpMode ? 'pin' : 'e' + rotationEpoch}`;
  const nodeScope = queryOverrides.scope || userOrConfig?.nodeScope || 'all';
  const wkOverride = (queryOverrides.wk || cfg.wk || '').trim().toUpperCase();
  const protoFilter = (queryOverrides.proto || '').trim().toLowerCase();
  // ساب‌لینک اختصاصی «دامنه‌های لبهٔ کلادفلر»: ?set=domain
  // فقط نودهای دامنه‌محور می‌سازد و از استخر آی‌پی/کشوری/WARP استفاده نمی‌کند.
  const setParam = String(queryOverrides.set || '').trim().toLowerCase();
  const domainMode = setParam === 'domain';
  // منطقهٔ انتخابی کاربر/لوکیشن (region) — در نبود ?country از همین استفاده می‌شود
  const regionCode = String(queryOverrides.region || cfg.region || 'auto').trim().toUpperCase();
  const regionFilter = /^[A-Z]{2}$/.test(regionCode) && regionCode !== 'AUTO' && regionCode !== 'CF'
    ? regionCode
    : '';
  // ساب‌لینک اختصاصی «فقط IPv6» برای شبکهٔ همراه اول: ?set=ipv6
  // (همراهاول روی IPv6 عملکرد بهتری دارد؛ این ساب هیچ نود IPv4/دامنه ندارد.)
  const ipv6Mode = setParam === 'ipv6' || setParam === 'ipv6-mci' || setParam === 'mci';

  // اولویت آدرس واسط: مقدار صریح کاربر → منطقهٔ انتخابی → پیش‌فرض تحریم‌شکن
  const explicitProxy = String(rawCfg.p || '').trim();
  if (!explicitProxy && regionFilter) {
    cfg.p = `ProxyIP.${regionFilter}.CMLiussss.net:443`;
  }
  if (!String(cfg.p || '').trim() && cfg.sb === 'yes') {
    cfg.p = resolveSanctionsProxy(cfg, userUuid);
  }

  if (ipv6Mode) {
    // فقط آی‌پی نسخه ۶؛ دامنه محور/لیست ترجیحی/سرور اصلی/چندلوکیشن کنار گذاشته می‌شوند
    cfg.ipv4 = 'no';
    cfg.ipv6 = 'yes';
    cfg.epd = 'no';
    cfg.egi = 'no';
    cfg.ena = 'no';
    cfg.pd = 'no';
    cfg.yxby = 'yes';
  }

  // نودهای قفل‌شده روی یک آی‌پی: همهٔ منابع آدرس خاموش می‌شوند تا فقط
  // همان آدرس (دستی یا انتخاب پایدار از استخر) در کلاینت بنشیند.
  let pinnedNode = null;
  let fixedIpCountry = '';
  if (fixedIpMode) {
    cfg.ipRotation = 'off';
    cfg.ena = 'no';
    cfg.pd = 'no';
    cfg.epi = 'no';
    cfg.epd = 'no';
    cfg.egi = 'no';
    cfg.yxby = 'yes';
    cfg.yx = '';
    const pinnedParse = parseCustomPreferredString(cfg.ipPinned || '');
    const chosen = pinnedParse.ipList[0] || pinnedParse.domainList[0];
    const fallback = pickStableAddresses(OFFICIAL_DIRECT_IPS, 1, addrSeed + '-pin')[0];
    const host = String((chosen && (chosen.ip || chosen.domain)) || fallback || '').trim();
    if (host) {
      const isV6 = host.includes(':');
      cfg.ipv4 = isV6 ? 'no' : 'yes';
      cfg.ipv6 = isV6 ? 'yes' : 'no';
      pinnedNode = { ip: host, port: (chosen && chosen.port) || 443, isp: 'Fixed-IP' };
      const name = String((chosen && (chosen.name || chosen.isp)) || '').trim();
      const match = name.match(/\b([A-Za-z]{2})\b/);
      fixedIpCountry = match ? match[1].toUpperCase() : '';
    }
  }

  const evEnabled = protoFilter ? protoFilter === 'vless' : isEnabledValue(cfg.ev, true);
  const etEnabled = protoFilter ? protoFilter === 'trojan' : isEnabledValue(cfg.et, false);
  const exEnabled = protoFilter ? protoFilter === 'xhttp' : isEnabledValue(cfg.ex, false);
  const esEnabled = protoFilter ? (protoFilter === 'ss' || protoFilter === 'shadowsocks') : isEnabledValue(cfg.es, false);

  // هر پروتکل در گروه جداگانه ساخته می‌شود تا در پایان ترکیب‌های مختلف
  // (پروتکل × خانوادهٔ آدرس) به تعداد مساوی در ساب حاضر باشند.
  const protoGroups = { vless: [], trojan: [], ss: [], xhttp: [] };

  // فرگمنت TLS بر اساس پریست انتخابی مدیر (off = بدون فرگمنت)
  // شادوساکس هیچ‌وقت پارامتر fragment نمی‌گیرد و همیشه در سابلینک می‌ماند.
  cfg.fragmentValue = buildFragmentValue(cfg);
  if (!cfg.fragmentValue && cfg.frag !== 'no' && isFilteredPagesOrWorkersHost(workerHost)) {
    cfg.fragmentValue = '10-30,10-20,tlshello';
  }

  // دامنه‌های SNI/Host: ابتدا مقدار خود کاربر، بعد تنظیمات کلی پنل (چون این
  // فهرست یک تنظیم نصب است و معمولاً فقط روی تنظیمات کلی ست می‌شود).
  const globalSniHosts = queryOverrides.sniHosts
    || (queryOverrides.globalCfg && queryOverrides.globalCfg.sniHosts)
    || '';
  const frontHosts = resolveFrontHosts(workerHost, {
    sniHosts: String(cfg.sniHosts || '').trim() ? cfg.sniHosts : globalSniHosts
  });
  let frontCursor = 0;

  function appendFromSource(sourceList) {
    const safeList = filterAddressFamily(sourceList, cfg);
    if (!Array.isArray(safeList) || safeList.length === 0) return;
    const decorated = frontHosts.length > 1
      ? safeList.map(item => ({ ...item, frontHost: frontHosts[(frontCursor++) % frontHosts.length] }))
      : safeList;
    if (evEnabled) protoGroups.vless.push(...buildVlessLinks(decorated, userUuid, workerHost, cfg, wkOverride));
    if (etEnabled) protoGroups.trojan.push(...buildTrojanLinks(decorated, userUuid, workerHost, cfg, wkOverride));
    if (exEnabled) protoGroups.xhttp.push(...buildXhttpLinks(decorated, userUuid, workerHost, cfg));
    if (esEnabled) protoGroups.ss.push(...buildShadowsocksLinks(decorated, userUuid, workerHost, cfg));
  }

  // ساب اختصاصی IPv6: همهٔ آی‌پی‌های نسخه ۶ استخر + آی‌پی‌های رسمی کلادفلر
  if (ipv6Mode) {
    // فهرست رسمی IPv6 کلادفلر (ثابت) + استخر زنده به‌صورت مرتب‌شده
    const v6Pool = [
      ...OFFICIAL_DIRECT_IPV6,
      ...pickStableAddresses(edgePool.ipv6, 12, addrSeed + '-v6')
    ].filter(Boolean);
    appendFromSource(v6Pool.map(ip => ({ ip, isp: 'CF-IPv6', family: 'ipv6' })));
  }

  // نودهای «دامنهٔ کلادفلر»: آدرس نود فقط دامنه است (بدون آی‌پی). دامنه‌ها
  // از استخر تأییدشدهٔ CF_EDGE_DOMAINS به‌صورت چرخشی انتخاب می‌شوند.
  if (domainMode) {
    const wantedRaw = parseInt(
      queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
      10
    );
    // ۰/نامعتبر = بدون سقف؛ تعداد آدرس‌ها را موتور خودش تعیین می‌کند
    const wanted = Number.isFinite(wantedRaw) && wantedRaw > 0 ? wantedRaw : 0;
    const protocolCount = [evEnabled, etEnabled, exEnabled, esEnabled].filter(Boolean).length || 1;
    // cfnew حداکثر همان ۲۱ دامنهٔ 直连域名 را استفاده می‌کند؛ بیشتر از این
    // فقط ساب‌لینک را بی‌دلیل بزرگ می‌کند.
    const addressCount = wanted > 0
      ? Math.min(21, Math.max(4, Math.ceil(wanted / protocolCount) + 4))
      : 21;
    // اول دامنه‌های واقعی منابع بیرونی و بعد استخر تأییدشدهٔ داخلی
    const domains = pickStableAddresses(
      [...DIRECT_DOMAINS.map(d => d.domain), ...edgePool.domains],
      addressCount,
      addrSeed + '-dom'
    );
    appendFromSource(domains.map(domain => ({ ip: domain, port: 443, isp: 'CF-Domain', domain })));
  }

  // چندلوکیشن: پروکسی‌های کشوری به‌عنوان زنجیره خروجی سمت ورکر استفاده می‌شوند، نه به‌عنوان آدرس نود.
  // آدرس نود یک آی‌پی ثابت واقعی کلادفلر است تا پینگ بگیرد و ترافیک از کشور انتخابی خارج شود.
  // منطقه (region) مثل cfnew با «آدرس جایگزین» پیاده می‌شود: آدرس نود همان
  // آی‌پی ثابت کلادفلر می‌ماند و خروجی از ProxyIP همان منطقه عبور می‌کند.
  let countryMode = false;
  // منطقهٔ ذخیره‌شدهٔ کاربر هم باید مثل ?country عمل کند؛ قبلاً فقط برای
  // ساختن ProxyIP استفاده می‌شد و تب «منطقه» روی کشور نودها اثر کامل نداشت.
  const countryFilter = fixedIpMode ? '' : String(queryOverrides.country || regionFilter || '').trim().toUpperCase();
  if (!domainMode && !ipv6Mode && !fixedIpMode && countryFilter) {
    const wantedCountries = countryFilter === 'MULTI' || countryFilter === 'ALL'
      ? MULTI_COUNTRY_CODES.slice()
      : (COUNTRY_PROXY_SOURCES[countryFilter] ? [countryFilter] : []);
    // اعتبارسنجی واقعی خروجی برای همهٔ کشورها: تا ۳.۵ ثانیه مهلت، نتیجه ۱۰ دقیقه کش می‌شود
    // تست واقعی پروکسی فقط برای یک یا دو کشور انجام می‌شود؛ در حالت MULTI تعداد
    // فیدها و اتصال‌های هم‌زمان از سقف subrequest ورکر می‌گذرد، پس همان رفتار قبلی
    // (بدون تست) حفظ می‌شود تا تعداد نودها کم نشود.
    const verifyEnabled = String(queryOverrides.verify || '') !== '0' && wantedCountries.length <= 2;
    const deadline = Date.now() + COUNTRY_VERIFIED_DEADLINE_MS;
    const needPerCountry = Math.max(2, Math.min(6, parseInt(cfg.locationNodeCount, 10) || 6));
    const countryLists = await Promise.all(wantedCountries.map(code => {
      const urls = (COUNTRY_PROXY_SOURCES[code]?.urls || []).join(',');
      if (!urls) return Promise.resolve(null);
      return getVerifiedCountryProxies(code, urls, { need: needPerCountry, deadline, verify: verifyEnabled, env: queryOverrides.env || null });
    }));
    const proxyPool = [];
    countryLists.forEach((list, idx) => {
      const code = wantedCountries[idx];
      for (const item of (list || [])) {
        proxyPool.push({ proxy: item.proxy, country: code, unverified: item.unverified === true });
      }
    });
    const locationNodes = buildLocationSourceList(proxyPool, cfg, workerHost, addrSeed + ':country');
    if (locationNodes.length > 0) {
      appendFromSource(locationNodes);
      countryMode = true;
    }
  }

  const disablePreferred = cfg.yxby === 'yes' || nodeScope === 'origin';
  const enableNative = !fixedIpMode && (cfg.ena === 'yes' || nodeScope === 'origin');

  // حالت آی‌پی ثابت: فقط همان یک آدرس (برای هر پروتکل فعال) ساخته می‌شود.
  if (fixedIpMode && pinnedNode) {
    appendFromSource([{ ...pinnedNode, country: fixedIpCountry }]);
  }

  if (!domainMode && !ipv6Mode && enableNative && nodeScope !== 'edge') {
    // اگر هاست پنل روی pages.dev یا workers.dev است، در ایران رکورد DNS آن مسدود است؛
    // بنابراین آدرس اتصال نود Origin را روی آی‌پی تمیز Anycast کلادفلر قرار می‌دهیم تا ۱۰۰٪ پینگ بدهد!
    const originConnIp = isFilteredPagesOrWorkersHost(workerHost)
      ? (pickStableAddresses(OFFICIAL_DIRECT_IPS, 1, addrSeed + '-origin')[0] || OFFICIAL_DIRECT_IPS[0])
      : workerHost;
    appendFromSource([{ ip: originConnIp, isp: 'Origin' }]);
  }

  // نودهای «دامنهٔ پنل» — آدرس و SNI دقیقاً دامنهٔ همین ورکر/پیجز (بدون https://)
  if (!domainMode && !ipv6Mode && isEnabledValue(cfg.pd, true) && nodeScope !== 'origin') {
    const panelDomainNodes = buildPanelDomainNodes(workerHost, cfg);
    if (panelDomainNodes.length) appendFromSource(panelDomainNodes);
  }

  const { ipList: customIps, domainList: customDomains, proxyList: customProxies } = parseCustomPreferredString(cfg.yx);
  const hasCustomPreferred = customIps.length > 0 || customDomains.length > 0;

  // ورودی‌های پروکسی (پورت غیر CF) به نودهای زنجیره‌ای تبدیل می‌شوند تا پینگ بدهند
  if (!domainMode && !ipv6Mode && !countryMode && customProxies.length > 0) {
    appendFromSource(buildLocationSourceList(customProxies, cfg, workerHost, addrSeed + ':custom'));
  }

  if (!domainMode && !ipv6Mode && !fixedIpMode && !disablePreferred && !countryMode) {
    if (hasCustomPreferred) {
      if (customIps.length > 0 && cfg.epi === 'yes') {
        appendFromSource(customIps);
      }
      if (customDomains.length > 0 && cfg.epd === 'yes') {
        appendFromSource(customDomains.map(d => ({ ip: d.domain, port: d.port, isp: d.name || d.domain })));
      }
    } else {
      // دامنه‌های پیش‌فرض همیشه حاضرند و با آی‌پی‌های ثابت به‌صورت متناوب
      // چیده می‌شوند تا با سقف کم نود هم حتماً در سایلینک باشند.
      // آی‌پی‌های تازه از استخر لبهٔ کلادفلر (همه با رنج رسمی کلادفلر فیلتر شده‌اند)
      // آی‌پی ثابت در کلاینت: فقط از فهرست‌های ثابت (رسمی کلادفلر و ۲۱ دامنهٔ
      // cfnew) با ترتیب هش‌محور انتخاب می‌شود تا با هر بار خواندن ساب عوض نشود.
      const pooledAddresses = [
        ...pickStableAddresses(OFFICIAL_DIRECT_IPS, 8, addrSeed + '-v4'),
        ...(cfg.ipv6 === 'no' ? [] : pickStableAddresses(OFFICIAL_DIRECT_IPV6, 4, addrSeed + '-v6'))
      ];
      const staticIpNodes = cfg.epi === 'yes'
        ? pooledAddresses.map(ip => ({ ip, isp: 'CF-Fast' }))
        : [];
      const pooledDomains = pickStableAddresses(DIRECT_DOMAINS.map(d => d.domain), 9, addrSeed + '-dom');
      const domainNodes = cfg.epd === 'yes'
        ? pooledDomains.map(domain => ({ ip: domain, isp: domain }))
        : [];
      if (staticIpNodes.length || domainNodes.length) {
        appendFromSource(interleaveAddresses(staticIpNodes, domainNodes));
      }
      // ۲) استخر آی‌پی‌های بهینه ارائه‌شده بر اساس اپراتور
      if (cfg.epi === 'yes' && !cfg.yxURL) {
        const uouinList = await fetchPreferredIpsCached(cfg, queryOverrides.env || null);
        if (uouinList.length > 0) {
          // ترتیب پایدار: از بین آی‌پی‌های برگشتی، همیشه همان تعداد ثابت و با
          // ترتیب هش‌محور انتخاب می‌شود تا آدرس‌ها بین دو درخواست نبض نزنند.
          const byHost = new Map(uouinList.map(item => [String(item.ip), item]));
          const stable = pickStableAddresses([...byHost.keys()], 6, addrSeed + '-uouin')
            .map(ip => byHost.get(ip))
            .filter(Boolean);
          appendFromSource(stable);
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
          appendFromSource(buildLocationSourceList(proxyOnly, cfg, workerHost, addrSeed + ':url'));
        }
      }
      // ترکیب خانواده‌ها در ساب‌لینک اصلی: بخشی از نودها IPv6 و بخشی دامنه‌محور
      // می‌شوند تا هر سه استخر (IPv4 / IPv6 / دامنه) طبق تعداد نود همان کاربر
      // در ساب‌لینک حاضر باشند؛ نه فقط در ساب‌های ?set=ipv6 و ?set=domain.
      if (!domainMode && !ipv6Mode && !countryMode) {
        const wantedTotal = parseInt(
          queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
          10
        ) || 0;
        if (wantedTotal === 0 || wantedTotal >= 6) {
          const base = wantedTotal || 24;
          // برای ساب‌های بزرگ (مثل ساب ۴۰۰ نودی مدیر) تعداد آی‌پی نسخهٔ ۶ و دامنه هم
          // بالا می‌رود، وگرنه چند گروه کوچک سقف کل ساب را پایین می‌آورند.
          const v6Wanted = cfg.ipv6 === 'no' ? 0 : Math.max(2, Math.min(60, Math.round(base * 0.2)));
          const domWanted = Math.max(2, Math.min(60, Math.round(base * 0.25)));
          if (v6Wanted > 0) {
            const v6List = pickStableAddresses(
              [...OFFICIAL_DIRECT_IPV6, ...edgePool.ipv6],
              v6Wanted,
              addrSeed + '-mix-v6'
            ).filter(Boolean);
            appendFromSource(v6List.map(ip => ({ ip, port: 443, isp: 'CF-IPv6', family: 'ipv6' })));
          }
          const domList = pickStableAddresses(
            [...DIRECT_DOMAINS.map(d => d.domain), ...edgePool.domains],
            domWanted,
            addrSeed + '-mix-dom'
          ).filter(Boolean);
          appendFromSource(domList.map(domain => ({ ip: domain, port: 443, isp: 'CF-Domain', domain })));
        }
      }

      // اگر به هر دلیلی هیچ نودی ساخته نشد، از استخر رسمی CF استفاده می‌کنیم
      const builtCount = protoGroups.vless.length + protoGroups.trojan.length + protoGroups.ss.length + protoGroups.xhttp.length;
      if (builtCount < 15 && cfg.epi === 'yes') {
        appendFromSource(getStaticCfAddresses(cfg).map(ip => ({ ip, isp: 'CF-Direct' })));
      }

      // تکمیل تا سقف درخواستی: ساب‌های بزرگ (۴۰۰ نودی مدیر) با منابع ثابت
      // کسری می‌مانند؛ از استخر زندهٔ لبهٔ CF پر می‌شود تا تعداد واقعاً برسد.
      const requestedTotal = parseInt(
        queryOverrides.limit ?? userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0,
        10
      ) || 0;
      if (requestedTotal > 0) {
        const activeProtoCount = [evEnabled, etEnabled, exEnabled, esEnabled].filter(Boolean).length || 1;
        const builtNow = protoGroups.vless.length + protoGroups.trojan.length + protoGroups.ss.length + protoGroups.xhttp.length;
        if (builtNow < requestedTotal) {
          const perProto = Math.ceil((requestedTotal - builtNow) / activeProtoCount) + 3;
          const extraIps = pickStableAddresses(edgePool.ipv4, perProto * 2, addrSeed + '-topup')
            .map(ip => ({ ip, port: 443, isp: 'CF-Live' }));
          if (extraIps.length) appendFromSource(extraIps);
          const extraV6 = cfg.ipv6 === 'no' ? [] : pickStableAddresses(edgePool.ipv6, perProto, addrSeed + '-topup-v6')
            .map(ip => ({ ip, port: 443, isp: 'CF-Live-v6', family: 'ipv6' }));
          if (extraV6.length) appendFromSource(extraV6);
        }
      }
    }
  }

  const allEntries = [
    ...protoGroups.vless,
    ...protoGroups.trojan,
    ...protoGroups.ss,
    ...protoGroups.xhttp
  ];

  if (allEntries.length === 0) {
    const fallbackConnIp = isFilteredPagesOrWorkersHost(workerHost)
      ? (OFFICIAL_DIRECT_IPS[0] || workerHost)
      : workerHost;
    appendFromSource([{ ip: fallbackConnIp, port: 443, isp: 'Origin' }]);
  }

  const subNodeCountRaw = queryOverrides.limit !== undefined
    ? parseInt(queryOverrides.limit, 10)
    : Number(userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0);
  const subNodeCount = Number.isFinite(subNodeCountRaw) && subNodeCountRaw > 0 ? subNodeCountRaw : 0;

  // توزیع مساوی ترکیب‌ها (پروتکل × IPv4/IPv6/Domain) و بعد چرخش زمانی اختیاری
  const balancedEntries = balanceComboEntries(allEntries, subNodeCount);
  const rotatedLinks = rotateIpListByTimeBucket(balancedEntries, cfg.ipRotation || 'off');

  // اعمال نام گویا (کشور/نوع نود/خانوادهٔ آدرس) + سقف تعداد نود ساب‌لینک کاربر
  const finalized = finalizeMiliSubscriptionLinks(rotatedLinks, subNodeCount);

  // خانوادهٔ WARP (WARP / WARP PRO / WARP چندلوکیشن) در انتهای ساب‌لینک با نام اختصاصی خودش
  const warpAllowed = !protoFilter || protoFilter === 'warp' || protoFilter === 'wireguard';
  // WARP و WARP PRO بدون نیاز به هیچ تنظیمی همیشه حاضرند؛ فقط حذف کامل آن‌ها
  // با ?proto=vless (یا پروتکل دیگر) یا ?nowarp=1 ممکن است.
  const nowarp = String(queryOverrides.nowarp || '') === '1'
    || (cfg.warp === 'no' && cfg.warpPro === 'no' && cfg.warpMl === 'no');
  // در حالت آی‌پی ثابت، نودهای WARP هم ساخته نمی‌شوند تا هیچ نودی با آی‌پی/کشور
  // متفاوت در کلاینت نباشد و قول «آی‌پی ثابت» واقعاً حفظ شود.
  const warpLinks = warpAllowed && !domainMode && !ipv6Mode && !fixedIpMode && !nowarp
    ? await buildWarpFamilyLinks(cfg, { always: true })
    : [];

  // ساب‌لینک فقط نود واقعی دارد: نودهای «اطلاع‌رسانی» با آدرس 127.0.0.1 در کلاینت
  // کار نمی‌کردند و کاربر فکر می‌کرد نود خراب است؛ دیگر تزریق نمی‌شوند.
  const result = [...finalized, ...warpLinks];
  rememberNodes(cachedKey, result);
  return result;
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

async function handleSubscriptionResponse(request, userOrConfig, url = null, env = null, ctx = null) {
  if (!url) url = new URL(request.url);
  const workerHost = url.hostname;
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);

  // بررسی وضعیت فعال بودن، حجم و انقضای کاربر
  if (userOrConfig && userOrConfig.enabled === false) {
    const disabledNode = `vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=tls&type=ws#${encodeURIComponent('⛔ حساب غیرفعال')}`;
    return new Response(btoa(disabledNode), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const target = detectTargetFromRequest(request, url);

  // ساب‌لینک OpenVPN: پروفایل خام (قابل ایمپورت در کلاینت‌های OpenVPN)
  if (['ovpn', 'openvpn'].includes(target)) {
    if (!isEnabledValue(cfg.ovpn, true)) {
      return new Response('نودهای OpenVPN در پنل مدیریت miliconfig خاموش است.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
    const ovpnNodes = await fetchOpenVpnNodes(cfg);
    if (!ovpnNodes.length) {
      return new Response('در حال حاضر پروفایل OpenVPN در دسترس نیست؛ لطفاً بعداً تلاش کنید.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
    // ?format=zip → همهٔ پروفایل‌ها در یک بستهٔ قابل دانلود؛ در غیر این صورت تک‌فایل .ovpn
    const wantZip = ['zip', 'bundle', 'pack'].includes(String(url.searchParams.get('format') || '').toLowerCase());
    if (wantZip) {
      const used = new Set();
      const files = [];
      const seed = String(userOrConfig?.uuid || cfg.wk || BRAND_NAME);
      const chosenTuning = resolveOvpnTuningPresets(cfg.ovpnTuning);
      ovpnNodes.slice(0, 10).forEach((node, idx) => {
        const code = String(node.country || 'ML').toUpperCase();
        for (const preset of chosenTuning) {
          let name = `${BRAND_NAME}-${code}-${String(idx + 1).padStart(2, '0')}-${preset.id}.ovpn`;
          while (used.has(name)) name = name.replace(/\.ovpn$/, `-${Date.now() % 997}.ovpn`);
          used.add(name);
          const header = `# ${BRAND_NAME} OpenVPN — ${code} ${node.server}:${node.port}/${node.proto} (${preset.id})\n`;
          files.push({ name, data: header + buildOvpnVariant(node.profile, node, preset, seed) });
        }
      });
      files.push({
        name: 'servers.txt',
        data: [
          `# ${BRAND_NAME} OpenVPN servers in this bundle`,
          ...ovpnNodes.slice(0, 10).map((node, idx) =>
            `${String(idx + 1).padStart(2, '0')}\t${node.country || 'ML'}\t${node.server}\t${node.port}\t${node.proto}\t${node.cipher}`
          )
        ].join('\n') + '\n'
      });
      files.push({
        name: 'README.txt',
        data: [
          `${BRAND_NAME} — ${files.length} OpenVPN profile(s)`,
          '',
          'هر سرور در سه پروفایل تنظیم شده ارائه می‌شود (balanced / mtu-safe / mobile).',
          'اگر یکی وصل نشد، پروفایل بعدی همان کشور را امتحان کنید.',
          'Import into OpenVPN Connect / AmneziaVPN / OpenVPN GUI.',
          'Username/password for public VPNGate servers: vpn / vpn',
          '',
          `profiles: ${ovpnNodes.length} servers x ${chosenTuning.length} tuning presets`
        ].join('\n')
      });
      return new Response(buildZip(files), {
        status: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="miliconfig-openvpn.zip"',
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    const first = ovpnNodes[0];
    const firstTuning = resolveOvpnTuningPresets(cfg.ovpnTuning)[0];
    const body = [
      `# ${BRAND_NAME} OpenVPN - ${first.country || 'ML'} (${first.server}:${first.port}/${first.proto})`,
      `# ${ovpnNodes.length} سرور در این ساب‌لینک موجود است؛ برای بستهٔ کامل ?format=zip`,
      `# tuning: ${firstTuning.id}`,
      buildOvpnVariant(first.profile, first, firstTuning, String(userOrConfig?.uuid || cfg.wk || BRAND_NAME))
    ].join('\n');
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-openvpn-profile; charset=utf-8',
        'Content-Disposition': 'attachment; filename="miliconfig-openvpn.ovpn"',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

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
    verify: url.searchParams.get('verify') || '',
    set: url.searchParams.get('set') || '',
    nowarp: url.searchParams.get('nowarp') || '',
    env,
    waitUntil: ctx && typeof ctx.waitUntil === 'function' ? ctx.waitUntil.bind(ctx) : null,
    scope: url.searchParams.get('scope') || userOrConfig?.nodeScope || 'all',
    limit: url.searchParams.get('limit') !== null ? url.searchParams.get('limit') : undefined
  };

  // تنظیمات کلی پنل برای فهرست دامنه‌های SNI/Host (تنظیم نصب، نه تنظیم کاربر)
  if (env && !queryOverrides.globalCfg) {
    try {
      queryOverrides.globalCfg = await loadGlobalConfig(env);
    } catch (_e) {}
  }

  const finalLinks = await generateUserNodesList(userOrConfig, workerHost, queryOverrides);

  let bodyContent = '';
  let contentType = 'text/plain; charset=utf-8';

  switch (target) {
    case 'clash':
    case 'clashr':
    case 'stash':
    case 'meta':
    case 'clashmeta': {
      // نودهای OpenVPN (پروفایل‌های زندهٔ VPNGate) فقط در خروجی Clash/Mihomo قابل استفاده‌اند.
      // در حالت آی‌پی ثابت، OpenVPN اضافه نمی‌شود چون آدرس/کشور خروجی آن قابل پین نیست.
      // MASQUE هم در ساب/ZIP مستقل /warp/masque ارائه می‌شود و در ساب اصلی نیست.
      const ovpnNodes = cfg.ipMode === 'fixed' ? [] : await fetchOpenVpnNodes(cfg);
      bodyContent = generateClashConfig(finalLinks, { ...cfg, ovpnNodes, masqueNodes: [] });
      contentType = 'text/yaml; charset=utf-8';
      break;
    }
    case 'vg':
    case 'jk':
    case 'jiakuan':
      try {
        bodyContent = await generateResidentialChainConfig(finalLinks, {
          ...cfg,
          subNodeCount: userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 0
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


// --- MODULE: src/subscription/masqueBundle.js ---

// ============================================================================
// بستهٔ مستقل WARP MASQUE (HTTP/3 CONNECT-IP)
// ساب/ZIP جدا از WARP وایرگارد؛ فقط کلاینت‌هایی که نوع masque را می‌شناسند
// (Mihomo/Clash.Meta، FlClash، Clash Verge، Hiddify) آن را می‌خوانند.
// ============================================================================
async function buildWarpMasqueBundle(cfg = {}, options = {}) {
  const nodes = await buildWarpMasqueNodes(cfg).catch(() => []);
  const seed = String(options.seed || 'public');
  const dnsList = ['1.1.1.1', '1.0.0.1'];
  const files = [];
  const server = nodes[0]?.server || '';
  const count = nodes.length;

  if (count) {
    const proxies = nodes.map(node =>
      `  - { name: "${node.name}", type: masque, server: "${node.server}", port: ${node.port}, ` +
      `private-key: "${node.privateKey}", public-key: "${node.publicKey}", ip: ${node.address4}/32` +
      (node.address6 ? `, ipv6: ${node.address6}/128` : '') +
      `, sni: ${WARP_MASQUE_SNI}, mtu: 1280, udp: true, remote-dns-resolve: true, dns: [${dnsList.join(', ')}] }`
    );
    files.push({
      name: 'WARP-masque.yaml',
      data: [
        `# ${BRAND_NAME} — WARP MASQUE (HTTP/3 CONNECT-IP)`,
        '# مستقل از WARP وایرگارد — فقط Mihomo / Clash.Meta / FlClash / Clash Verge / Hiddify',
        `# edge: ${server} — sni: ${WARP_MASQUE_SNI} — nodes: ${count}`,
        'mixed-port: 7890',
        'allow-lan: false',
        'mode: rule',
        'log-level: warning',
        'dns:',
        '  enable: true',
        '  enhanced-mode: fake-ip',
        '  nameserver:',
        ...dnsList.map(item => `    - ${item}`),
        'proxies:',
        ...proxies,
        'proxy-groups:',
        '  - name: "WARP-MASQUE"',
        '    type: select',
        '    proxies:',
        ...nodes.map(node => `      - "${node.name}"`),
        '      - DIRECT',
        'rules:',
        '  - MATCH,WARP-MASQUE'
      ].join('\n') + '\n'
    });

    files.push({
      name: 'WARP-masque.json',
      data: JSON.stringify({
        brand: BRAND_NAME,
        protocol: 'masque',
        sni: WARP_MASQUE_SNI,
        server,
        nodes: nodes.map(node => ({
          name: node.name,
          server: node.server,
          port: node.port,
          privateKey: node.privateKey,
          publicKey: node.publicKey,
          address4: node.address4,
          address6: node.address6
        }))
      }, null, 2) + '\n'
    });

    files.push({
      name: 'endpoints.txt',
      data: [
        `# ${BRAND_NAME} — WARP MASQUE endpoints`,
        `# sni: ${WARP_MASQUE_SNI}`,
        `# seed: ${seed.slice(0, 8)}`,
        '',
        ...nodes.map(node => `${node.server}\t${node.port}\t${node.name}`)
      ].join('\n') + '\n'
    });
  }

  files.push({
    name: 'README.txt',
    data: [
      `${BRAND_NAME} — WARP MASQUE`,
      '',
      'این بستهٔ جداست: هیچ فایل WireGuard/AmneziaWG داخل آن نیست و برعکس،',
      'بستهٔ اصلی WARP هیچ نود MASQUE ندارد.',
      '',
      'files:',
      '  WARP-masque.yaml ... پروفایل Mihomo / Clash.Meta / FlClash / Clash Verge',
      '  WARP-masque.json ... همان نودها به شکل JSON',
      '  endpoints.txt ...... لیست لبه/پورت',
      '',
      `sni: ${WARP_MASQUE_SNI}`,
      `nodes: ${count}`,
      'اگر کلاینت نوع masque را پشتیبانی نکند، این فایل را وارد نکنید؛',
      'برای کلاینت‌های وایرگارد از ZIP اصلی WARP استفاده کنید.'
    ].join('\n') + '\n'
  });

  return { config: { server, sni: WARP_MASQUE_SNI, nodes: count }, files, nodes };
}


// --- MODULE: src/core/runtime.js ---
// ============================================================================
// miliconfig v3.1 - موتور هسته پروکسی (VLESS + Trojan + xhttp + SOCKS5/HTTP + GrainTCP)
// هستهٔ پروکسی ورکر + احراز هویت چندکاربره D1 و ثبت ترافیک
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

// کش هش SHA-224 رمزهای Trojan در حافظه ایزوله برای کاهش مصرف CPU به نزدیک صفر و جلوگیری از Error 1101
const TROJAN_HASH_CACHE = new Map();
async function getCachedTrojanHash(pass = '') {
  const key = String(pass || '');
  if (TROJAN_HASH_CACHE.has(key)) return TROJAN_HASH_CACHE.get(key);
  const h = await sha224Hex(key);
  if (TROJAN_HASH_CACHE.size > 128) TROJAN_HASH_CACHE.clear();
  TROJAN_HASH_CACHE.set(key, h);
  return h;
}

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

// اتصال مستقیم ورکر به بعضی مقصدها (مثل سایت‌های پشت خود کلادفلر) یا بی‌صدا
// معلق می‌ماند یا رد می‌شود. بدون مهلت، retryConnect هیچ‌وقت اجرا نمی‌شد و همان
// نود در کلاینت «بعضی سایت‌ها را باز نمی‌کند»؛ پس هر اتصال مهلت سخت دارد.
const CONNECT_TIMEOUT_MS = 2200;

function raceTimeout(promise, ms, label) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(label || 'connect-timeout'));
    }, ms);
    promise.then(value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    }, err => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function openVerifiedSocket(address, port, fetcher = null) {
  try {
    const sock = openRawSocket(address, port, fetcher);
    if (sock?.opened) await raceTimeout(sock.opened, CONNECT_TIMEOUT_MS, 'direct-timeout');
    return sock;
  } catch (err) {
    if (!fetcher) throw err;
    const sock = cfConnect({ hostname: address, port });
    if (sock?.opened) await raceTimeout(sock.opened, CONNECT_TIMEOUT_MS, 'direct-timeout');
    return sock;
  }
}

// مقصدهایی که مسیر مستقیم برایشان جواب نداده (معمولاً پشت کلادفلر هستند) در
// حافظهٔ ایزوله علامت می‌خورند تا اتصال بعدی همان سایت معطل ۲ ثانیه‌ای نشود.
const DEAD_DIRECT_HOSTS = new Map();
const DEAD_DIRECT_TTL_MS = 10 * 60 * 1000;

function markDirectDead(host) {
  if (!host) return;
  DEAD_DIRECT_HOSTS.set(String(host).toLowerCase(), Date.now() + DEAD_DIRECT_TTL_MS);
  if (DEAD_DIRECT_HOSTS.size > 400) {
    const now = Date.now();
    for (const [key, until] of DEAD_DIRECT_HOSTS) if (until <= now) DEAD_DIRECT_HOSTS.delete(key);
  }
}

function isDirectMarkedDead(host) {
  const key = String(host || '').toLowerCase();
  const until = DEAD_DIRECT_HOSTS.get(key);
  if (!until) return false;
  if (until <= Date.now()) {
    DEAD_DIRECT_HOSTS.delete(key);
    return false;
  }
  return true;
}

// آیا بستهٔ اول کلاینت یک TLS ClientHello با SNI است؟ (شرط کار کردن ProxyIP)
function hasTlsClientHello(bytes) {
  if (!bytes || bytes.byteLength < 6) return false;
  if (bytes[0] !== 0x16 || bytes[1] !== 0x03) return false;
  for (let i = 5; i < Math.min(bytes.byteLength, 2200); i++) {
    // امتداد server_name در ClientHello
    if (bytes[i] === 0x00 && bytes[i + 1] === 0x00) return true;
  }
  return false;
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

async function pipeRemoteToWebSocket(remoteSocket, ws, vlessHeader, retryCallback, onBytesTransferred = null, encodeChunk = null) {
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
      // مسیر Shadowsocks AEAD: هر بستهٔ سرور→کلاینت باید رمز شود
      if (encodeChunk) chunk = await encodeChunk(chunk);
      if (!chunk || !chunk.byteLength) continue;
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
    if (isPrivateOrReservedTarget(targetHost)) {
      throw new Error('blocked-private-target');
    }
    if (!useProxy && isDirectMarkedDead(targetHost)) {
      throw new Error('direct-blocked-host');
    }
    const remoteSock = useProxy
      ? await connectViaOutboundProxy(addressType, targetHost, targetPort, parsedProxy, fetcher, firstPacket)
      : await connectRacedSocket(targetHost, targetPort, fetcher, CONNECT_RACE_COUNT).catch((err) => {
          markDirectDead(targetHost);
          throw err;
        });
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
    pipeRemoteToWebSocket(sock, ws, vlessRespHeader, retryCb, onBytesTransferred, remoteState.encodeDown || null).finally(() => {
      if (remoteState.socket === sock) {
        try { writer.releaseLock(); } catch (_e) {}
        remoteState.writer = null;
      }
    });
  }

  async function retryConnect(mode = 'fail') {
    if (proxyOnly && proxyEnabled) {
      closeSocketSafe(ws);
      return;
    }
    // بستن ناگهانی مقصد: اول همان مقصد اصلی را یک بار دیگر امتحان کن؛ اگر نشد،
    // مسیر جایگزین (ProxyIP) فقط وقتی معنا دارد که بستهٔ کلاینت TLS با SNI باشد.
    if (mode === 'close' && !(downgradeEnabled && proxyEnabled)) {
      try {
        const { remoteSock, writer } = await connectAndSend(host, port, false);
        bindRemote(remoteSock, writer, () => { detachIfCurrent(remoteSock, writer); retryConnect('close'); });
        return;
      } catch (_retryErr) {
        if (!hasTlsClientHello(firstPacket) && !fallbackAddr) {
          closeSocketSafe(ws);
          return;
        }
      }
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
      retryConnect('close');
    });
  } catch (_err) {
    await retryConnect('fail');
  }
}

async function handleWebSocketUpgrade(request, env, ctx, globalCfg, allUsers, adminUuid) {
  const reqUrl = new URL(request.url);
  const queryP = reqUrl.searchParams.get('p') || '';
  const queryWk = (reqUrl.searchParams.get('wk') || '').toUpperCase();
  const queryRm = reqUrl.searchParams.get('rm') || '';
  const queryS = reqUrl.searchParams.get('s') || '';
  const queryCc = reqUrl.searchParams.get('cc') || '';
  // نود کشوری (cc + s): اگر پروکسی از کار بیفتد هرگز بی‌صدا به مسیر مستقیم
  // کلادفلر سقوط نمی‌کند (رنگ خروجی به کشور دیگری نمی‌پرد)، فقط اتصال بسته می‌شود.
  const countryProxyLock = Boolean(queryS && /^[A-Za-z]{2}$/.test(queryCc));

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

  // تابع تشخیص کاربر بر اساس هش SHA-224 رمز عبور در Trojan (مجهز به کش O(1) و مقایسه زمان‌ثابت)
  async function resolveTrojanUser(incomingHash) {
    for (const u of allUsers) {
      const pass = (u.config?.tp && String(u.config.tp).trim()) || u.uuid;
      const hash = await getCachedTrojanHash(pass);
      if (timingSafeEqualStr(hash, incomingHash)) {
        if (!u.enabled) return null;
        if (u.dataLimitGb > 0 && u.usedBytes >= u.dataLimitGb * 1073741824) return null;
        if (u.expireAt > 0 && Date.now() > u.expireAt) return null;
        return u;
      }
    }
    const adminPass = (globalCfg.tp && String(globalCfg.tp).trim()) || adminUuid;
    const adminHash = await getCachedTrojanHash(adminPass);
    if (timingSafeEqualStr(adminHash, incomingHash)) {
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

  // ---- Shadowsocks AEAD: فهرست رمزهای ممکن برای یافتن کاربر درست ----
  function ssCandidates() {
    const list = [];
    const seen = new Set();
    const push = (pw, user) => {
      const key = String(pw || '');
      if (!key || seen.has(key)) return;
      seen.add(key);
      list.push({ pw: key, user });
    };
    const qp = (reqUrl.searchParams.get('sspass') || '').trim();
    if (qp) push(qp, allUsers.find(u => (u.config?.sspass || u.uuid) === qp) || null);
    allUsers.slice(0, 24).forEach(u => push(u.config?.sspass || u.uuid, u));
    if (adminUuid) {
      push(
        globalCfg.sspass || adminUuid,
        { id: null, username: 'admin', uuid: adminUuid, config: globalCfg }
      );
    }
    return list;
  }

  async function tryShadowsocksAead(data) {
    const primary = String(globalCfg.ssmethod || 'aes-128-gcm') === 'aes-256-gcm' ? 'aes-256-gcm' : 'aes-128-gcm';
    const ciphers = primary === 'aes-256-gcm' ? ['aes-256-gcm', 'aes-128-gcm'] : ['aes-128-gcm', 'aes-256-gcm'];
    for (const cand of ssCandidates()) {
      const userMethod = String(cand.user?.config?.ssmethod || '');
      const ordered = userMethod === 'aes-256-gcm' ? ['aes-256-gcm', 'aes-128-gcm'] : ciphers;
      for (const cipher of ordered) {
        try {
          const session = await SsAeadSession.create(cand.pw, cipher);
          const plain = await session.pushIncoming(data);
          if (!plain || plain.byteLength < 7) continue;
          const header = parseShadowsocksHeader(plain);
          if (header.hasError) continue;
          return {
            user: cand.user || allUsers[0] || null,
            header,
            decode: chunk => session.pushIncoming(chunk),
            encode: chunk => session.encodeOutgoing(chunk)
          };
        } catch (_e) {}
      }
    }
    return null;
  }

  const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
  const wsReadable = makeWebSocketReadableStream(serverWs, earlyDataHeader);

  wsReadable
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          if (closed) return;
          let data = toUint8Array(chunk);
          // شادوساکس AEAD: ورودی کلاینت رمزشده است
          if (remoteState.ssDecode) {
            try {
              const plain = await remoteState.ssDecode(data);
              if (!plain || !plain.byteLength) return;
              data = plain;
            } catch (_e) {
              return closeTransport();
            }
          }
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
                ...(queryS ? { s: queryS } : {}),
                ...(countryProxyLock ? { qj: 'only' } : {})
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
                ...(queryS ? { s: queryS } : {}),
                ...(countryProxyLock ? { qj: 'only' } : {})
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

          // تلاش برای Shadowsocks AEAD (aes-128-gcm/aes-256-gcm) — متد پیش‌فرض جدید
          if (data.byteLength >= 18) {
            const ssAead = await tryShadowsocksAead(data);
            if (ssAead) {
              detectedProto = 'ss';
              matchedUserObj = ssAead.user;
              remoteState.ssDecode = ssAead.decode;
              remoteState.encodeDown = ssAead.encode;
              const userCfg = {
                ...globalCfg,
                ...(matchedUserObj?.config || {}),
                ...(queryP ? { p: queryP } : {}),
                ...(queryWk ? { wk: queryWk } : {}),
                ...(queryRm ? { rm: queryRm } : {}),
                ...(queryS ? { s: queryS } : {}),
                ...(countryProxyLock ? { qj: 'only' } : {})
              };
              await establishOutboundAndPipe(
                ssAead.header.addressType,
                ssAead.header.hostname,
                ssAead.header.port,
                ssAead.header.rawPayload,
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

          // تلاش برای Shadowsocks (SS-WS) فقط با احراز هویت صریح (بدون دسترسی آزاد بدون رمز)
          if (data.byteLength >= 7) {
            const querySsPass = (reqUrl.searchParams.get('sspass') || '').trim();
            if (querySsPass) {
              const ssRes = parseShadowsocksHeader(data);
              if (!ssRes.hasError) {
                let ssUser = allUsers.find(u => u.enabled && timingSafeEqualStr(u.config?.sspass || u.uuid, querySsPass));
                if (!ssUser && adminUuid && timingSafeEqualStr(globalCfg.sspass || adminUuid, querySsPass)) {
                  ssUser = { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
                }
                if (ssUser) {
                  if (ssUser.dataLimitGb > 0 && ssUser.usedBytes >= ssUser.dataLimitGb * 1073741824) {
                    throw new Error('User quota exceeded');
                  }
                  if (ssUser.expireAt > 0 && Date.now() > ssUser.expireAt) {
                    throw new Error('User expired');
                  }
                  detectedProto = 'ss';
                  matchedUserObj = ssUser;
                  const userCfg = {
                    ...globalCfg,
                    ...(matchedUserObj?.config || {}),
                    ...(queryP ? { p: queryP } : {}),
                    ...(queryWk ? { wk: queryWk } : {}),
                    ...(queryRm ? { rm: queryRm } : {}),
                    ...(queryS ? { s: queryS } : {}),
                    ...(countryProxyLock ? { qj: 'only' } : {})
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

  const parsedHeader = await readXhttpHeader(request.body, resolveUserFn);
  if (!parsedHeader) {
    return new Response('Bad Request', { status: 400 });
  }

  if (isPrivateOrReservedTarget(parsedHeader.hostname)) {
    return new Response('Forbidden', { status: 403 });
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
    Server: 'nginx',
    'Content-Type': 'application/octet-stream'
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
  // کلیدهای محرمانه (توکن بروزرسانی و …) هرگز به کلاینت نمی‌روند
  for (const key of Object.keys(copy)) {
    if (key === 'cf_token' || key === 'cfToken' || key.startsWith('secret_')) delete copy[key];
  }
  return copy;
}

function sanitizeUserForClient(user) {
  if (!user || typeof user !== 'object') return user;
  return { ...user, config: sanitizeConfigForClient(user.config || {}) };
}

// ============================================================================
// تجزیهٔ فیدهای پروکسی
// فیدهای عمومی قالب یکسان ندارند؛ این پارسر به‌جای تکیه بر «کل خط = host:port»
// هر توکن host:port را در خط پیدا می‌کند تا همهٔ این قالب‌ها خوانده شوند:
//   host:port | host:port:Country | host:port|Country|City | 🇩🇪 1.2.3.4:1080 519ms DE [ISP]
//   SOCKS5 US 0.15s 1.2.3.4:45395 | socks5://user:pass@host:port | HTTPS://host:port
// و اگر خط فقط یک آی‌پی باشد (بدون پورت) با پورت پیش‌فرض همان پروتکل خوانده می‌شود.
// ============================================================================
const DEFAULT_PROXY_PORTS = { SOCKS5: 1080, SOCKS4: 1080, HTTP: 80, HTTPS: 443 };
const IPV4_HP_RE = /\b((?:\d{1,3}\.){3}\d{1,3}):(\d{1,5})\b/;
const IPV6_HP_RE = /\[([0-9a-fA-F:]+)\]:(\d{1,5})/;
const DOMAIN_HP_RE = /\b((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}):(\d{1,5})\b/i;
const BARE_IPV4_RE = /^(\d{1,3}(?:\.\d{1,3}){3})$/;

function isStrictIpv4(ip) {
  const parts = String(ip).split('.');
  if (parts.length !== 4) return false;
  return parts.every(p => /^\d{1,3}$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
}

// اولین host:port معتبر داخل خط (هر جای خط باشد)
function extractHostPort(line) {
  let m = line.match(IPV6_HP_RE);
  if (m) return { host: m[1], port: parseInt(m[2], 10) };
  m = line.match(IPV4_HP_RE);
  if (m && isStrictIpv4(m[1])) return { host: m[1], port: parseInt(m[2], 10) };
  m = line.match(DOMAIN_HP_RE);
  if (m) return { host: m[1].toLowerCase(), port: parseInt(m[2], 10) };
  return null;
}

// کد کشور اگر در خط باشد (پسوند :DE یا ستون |DE| یا توکن DE)
function extractCountryHint(line) {
  if (line.includes('|')) {
    const parts = line.split('|').map(s => s.trim());
    for (const part of parts.slice(1)) {
      if (/^[A-Za-z]{2}$/.test(part)) return part.toUpperCase();
    }
  }
  const notProxy = (line.match(IPV4_HP_RE) || line.match(DOMAIN_HP_RE) || [''])[0];
  const rest = notProxy ? line.replace(notProxy, ' ') : line;
  const token = rest.match(/\b([A-Z]{2})\b/);
  return token ? token[1] : '';
}

function normalizeProxyProtocol(value) {
  const raw = String(value || '').toLowerCase();
  if (raw === 'socks5' || raw === 'socks5h' || raw === 'socks') return 'SOCKS5';
  if (raw === 'socks4') return 'SOCKS4';
  if (raw === 'https') return 'HTTPS';
  if (raw === 'http') return 'HTTP';
  return '';
}

// فیدهای JSON (مثل ProxyGenerator/ALL/all.json): فقط فرمت‌های سبک و کوچک
function parseProxyJson(text, hintProtocol) {
  const trimmed = String(text || '').trim();
  if (trimmed.length > 1_500_000) return [];
  // اولین کاراکتر باید «[» (کد ۹۱) یا آکولاد باز (کد ۱۲۳) باشد؛ به‌جای نوشتن
  // خود کاراکتر آکولاد داخل رشته، کد کاراکتر مقایسه می‌شود تا تعداد آکولادهای
  // متن سورس متوازن بماند (اعتبارسنج استقرار توازن آکولادهای ورکر را می‌سنجد).
  const firstCode = trimmed.length ? trimmed.charCodeAt(0) : 0;
  if (firstCode !== 91 && firstCode !== 123) return [];
  let data;
  try { data = JSON.parse(trimmed); } catch (_e) { return []; }
  const rows = Array.isArray(data) ? data : (data.proxies || data.data || data.list || []);
  if (!Array.isArray(rows)) return [];
  const out = [];
  for (const row of rows) {
    if (typeof row === 'string') {
      const found = extractHostPort(row) || (BARE_IPV4_RE.test(row.trim()) ? { host: row.trim(), port: 0 } : null);
      if (found) out.push({ ...found, protocol: normalizeProxyProtocol(row.split('://')[0]) || hintProtocol, username: '', password: '', countryHint: '' });
      continue;
    }
    if (!row || typeof row !== 'object') continue;
    const host = row.ip || row.host || row.address || row.server || row.proxy_ip;
    const port = parseInt(row.port || row.proxy_port || row.proxyPort || 0, 10);
    if (!host || !port) continue;
    const rawProtocol = row.protocol || row.protocols || row.type || row.scheme || '';
    out.push({
      host: String(host),
      port,
      protocol: normalizeProxyProtocol(Array.isArray(rawProtocol) ? rawProtocol[0] : rawProtocol) || hintProtocol,
      username: String(row.username || row.user || ''),
      password: String(row.password || row.pass || ''),
      countryHint: String(row.country || row.country_code || '').toUpperCase().slice(0, 2)
    });
  }
  return out;
}

// hintProtocol خالی یعنی «مشخص نیست» و هنگام تست، SOCKS5 و بعد HTTP امتحان می‌شود.
function parseProxyLines(text, hintProtocol = '') {
  const source = String(text || '');
  const fromJson = parseProxyJson(source, hintProtocol);
  if (fromJson.length) return fromJson;

  const out = [];
  const compatibleHint = normalizeProxyProtocol(hintProtocol);
  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//') || line.startsWith(';')) continue;
    if (/^(website|support|btc|eth|ltc|doge)\b/i.test(line)) continue;
    if (/^(format|fromat)\b/i.test(line)) continue;
    if (/updated\s+at\s+\d{4}-\d{2}-\d{2}/i.test(line)) continue;

    const schemeMatch = line.match(/\b(socks5h?|socks4|socks|https?):\/\//i);
    const schemeProtocol = schemeMatch ? normalizeProxyProtocol(schemeMatch[1]) : '';
    let username = '';
    let password = '';
    const authMatch = line.match(/\/\/([^@\/\s]+)@/);
    if (authMatch) {
      const parts = authMatch[1].split(':');
      username = parts[0] || '';
      password = parts.slice(1).join(':') || '';
    }

    const found = extractHostPort(line);
    let host = found ? found.host : '';
    let port = found ? found.port : 0;
    if (!host) {
      const bare = line.match(BARE_IPV4_RE);
      if (!bare || !isStrictIpv4(bare[1])) continue;
      host = bare[1];
      port = DEFAULT_PROXY_PORTS[schemeProtocol || compatibleHint] || 1080;
    }
    if (!host || !(port > 0 && port < 65536)) continue;
    if (host.includes(':') && !/^[0-9a-fA-F:]+$/.test(host)) continue;

    const protocol = schemeProtocol || compatibleHint;
    const family = host.includes(':') ? 'ipv6' : (isStrictIpv4(host) ? 'ipv4' : 'domain');
    out.push({
      host,
      port,
      protocol,
      secure: protocol === 'HTTPS',
      username,
      password,
      countryHint: extractCountryHint(line),
      proxy: protocol ? `${protocol.toLowerCase().replace('socks5h', 'socks5')}://${username ? `${username}:${password}@` : ''}${host}:${port}` : '',
      family
    });
  }
  return out;
}

// دسته‌بندی ورودی‌ها با احترام به سقف اتصال هم‌زمان کلادفلر (۶ سوکت باز)
const MAX_PARALLEL_SOCKETS = 5;

async function runLimited(items, limit, worker, stopAt = 0) {
  let index = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (index < items.length) {
      if (stopAt && Date.now() > stopAt) return;
      const current = index++;
      await worker(items[current], current);
    }
  });
  await Promise.all(runners);
}

function withDeadline(promise, timeoutMs, message = 'timeout') {
  let timer = 0;
  const guard = new Promise((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, guard]).finally(() => clearTimeout(timer));
}

function concatBytes(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function shortError(err) {
  return String((err && err.message) || err || 'connect_failed').slice(0, 40);
}

// مقصد آزمایشی handshake پروکسی — فقط برای اثبات عبور ترافیک است
const PROXY_TEST_TARGET = { host: 'www.cloudflare.com', port: 443 };
// بیشتر پروکسی‌های مرده همین اول در برقراری TCP گیر می‌کنند؛ مهلت کوتاه اتصال
// باعث می‌شود بودجهٔ زمانی اسکن صرف پروکسی‌های واقعاً زنده شود.
const PROXY_CONNECT_TIMEOUT_MS = 900;

// تست واقعی SOCKS5: احراز هویت + CONNECT به مقصد آزمایشی
async function verifySocks5(entry, timeoutMs) {
  const started = Date.now();
  // بودجهٔ زمانی برای کل handshake است، نه هر مرحله؛ در غیر این صورت مجموع
  // مراحل می‌توانست چند برابر مهلت شود.
  const left = () => Math.max(250, timeoutMs - (Date.now() - started));
  let sock = null;
  try {
    sock = connect({ hostname: entry.host, port: entry.port });
    await withDeadline(sock.opened, Math.min(left(), PROXY_CONNECT_TIMEOUT_MS));
    const writer = sock.writable.getWriter();
    const reader = sock.readable.getReader();
    let buf = new Uint8Array(0);
    const readExact = async count => {
      while (buf.length < count) {
        const { value, done } = await withDeadline(reader.read(), left());
        if (done || !value) throw new Error('closed');
        buf = concatBytes(buf, value);
      }
      const out = buf.slice(0, count);
      buf = buf.slice(count);
      return out;
    };
    const needsAuth = Boolean(entry.username);
    await writer.write(new Uint8Array(needsAuth ? [5, 2, 0, 2] : [5, 1, 0]));
    const greeting = await readExact(2);
    if (greeting[0] !== 5) throw new Error('not-socks5');
    const method = greeting[1];
    if (method === 255) throw new Error('no-method');
    if (method === 2) {
      if (!needsAuth) throw new Error('auth-required');
      const enc = new TextEncoder();
      const userBytes = enc.encode(entry.username);
      const passBytes = enc.encode(entry.password || '');
      await writer.write(new Uint8Array([1, userBytes.length, ...userBytes, passBytes.length, ...passBytes]));
      const authReply = await readExact(2);
      if (authReply[1] !== 0) throw new Error('auth-failed');
    } else if (method !== 0) {
      throw new Error('method-' + method);
    }
    const targetHost = new TextEncoder().encode(PROXY_TEST_TARGET.host);
    const targetPort = PROXY_TEST_TARGET.port;
    await writer.write(new Uint8Array([5, 1, 0, 3, targetHost.length, ...targetHost, (targetPort >> 8) & 255, targetPort & 255]));
    const reply = await readExact(4);
    if (reply[1] !== 0) throw new Error('connect-code-' + reply[1]);
    const latencyMs = Date.now() - started;
    try { writer.releaseLock(); } catch (_e) {}
    try { reader.releaseLock(); } catch (_e) {}
    try { sock.close(); } catch (_e) {}
    return { ok: true, latencyMs };
  } catch (err) {
    try { if (sock) sock.close(); } catch (_e) {}
    return { ok: false, error: shortError(err) };
  }
}

// تست واقعی HTTP(S): درخواست CONNECT و انتظار پاسخ 2xx
async function verifyHttpProxy(entry, timeoutMs) {
  const started = Date.now();
  const left = () => Math.max(250, timeoutMs - (Date.now() - started));
  let sock = null;
  try {
    // اتصال همیشه TCP است: بیشتر خط‌های «https://» در این فیدها پروکسی CONNECT معمولی
    // هستند، و اتصال TLS به یک آی‌پی باعث خطای «certificate IP mismatch» در runtime می‌شد.
    sock = connect({ hostname: entry.host, port: entry.port });
    await withDeadline(sock.opened, Math.min(left(), PROXY_CONNECT_TIMEOUT_MS));
    const writer = sock.writable.getWriter();
    const reader = sock.readable.getReader();
    const authority = `${PROXY_TEST_TARGET.host}:${PROXY_TEST_TARGET.port}`;
    let request =
      `CONNECT ${authority} HTTP/1.1\r\n` +
      `Host: ${authority}\r\n` +
      `Proxy-Connection: keep-alive\r\n`;
    if (entry.username) {
      request += `Proxy-Authorization: Basic ${btoa(`${entry.username}:${entry.password || ''}`)}\r\n`;
    }
    request += '\r\n';
    await writer.write(new TextEncoder().encode(request));
    const decoder = new TextDecoder();
    let text = '';
    while (!text.includes('\r\n\r\n') && text.length < 2048) {
      const { value, done } = await withDeadline(reader.read(), left());
      if (done || !value) break;
      text += decoder.decode(value, { stream: true });
    }
    if (!/^HTTP\/1\.[01] 2\d\d/.test(text)) {
      if (/^HTTP\/1\.[01] 407/.test(text)) throw new Error('auth-required');
      throw new Error(text.startsWith('HTTP/') ? 'rejected-' + text.slice(9, 12) : 'bad-response');
    }
    const latencyMs = Date.now() - started;
    try { writer.releaseLock(); } catch (_e) {}
    try { reader.releaseLock(); } catch (_e) {}
    try { sock.close(); } catch (_e) {}
    return { ok: true, latencyMs };
  } catch (err) {
    try { if (sock) sock.close(); } catch (_e) {}
    return { ok: false, error: shortError(err) };
  }
}

// تأیید نهایی یک پروکسی: پروتکل نامشخص باشد، هر دو حالت امتحان می‌شود.
async function verifyProxyEntry(entry, timeoutMs = 3200) {
  const attempts = entry.protocol ? [entry.protocol] : ['SOCKS5', 'HTTP'];
  const deadlineAt = Date.now() + timeoutMs;
  let lastError = 'timeout';
  for (let i = 0; i < attempts.length; i++) {
    // پروتکل نامشخص: بودجهٔ زمانی بین SOCKS5 و HTTP نصف می‌شود تا هر دو شانس
    // امتحان داشته باشند و مجموع از مهلت کلی رد نشود.
    const remaining = deadlineAt - Date.now();
    const budget = Math.floor(remaining / (attempts.length - i));
    if (budget < 300) break;
    const protocol = attempts[i];
    const result = protocol === 'SOCKS5'
      ? await verifySocks5(entry, budget)
      : await verifyHttpProxy(entry, budget);
    if (result.ok) return { ...result, protocol, verified: true };
    lastError = result.error;
  }
  return { ok: false, error: lastError, verified: false };
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
  const bytes = getRandomBytesSafe(16);
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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // بدون گزینهٔ cache: خود runtime کلادفلر مقدار cache: 'no-store' را پیاده نکرده و
    // درخواست فوراً throw می‌شود؛ به‌جای آن پارامتر یکتای _mili برای هر درخواست
    // امکان کش شدن پاسخ را از بین می‌برد.
    const separator = url.includes('?') ? '&' : '?';
    const res = await fetch(`${url}${separator}_mili=${Date.now()}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'miliconfig-scanner/3.1',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) return '';
    return await res.text();
  } catch (_e) {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

// تست واقعی اتصال TCP و اندازه‌گیری پینگ
async function probeTcp(host, port, timeoutMs = 1800) {
  const started = Date.now();
  let socket;
  let timer = 0;
  try {
    socket = connect({ hostname: host, port });
    const guard = new Promise((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    });
    await Promise.race([socket.opened, guard]);
    const latencyMs = Date.now() - started;
    try { socket.close(); } catch (_e) {}
    return { ok: true, latencyMs };
  } catch (err) {
    try { if (socket) socket.close(); } catch (_e2) {}
    return { ok: false, latencyMs: 0, error: String((err && err.message) || err || 'connect_failed').slice(0, 40) };
  } finally {
    if (timer) clearTimeout(timer);
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
      const keys = Object.keys(body || {}).filter(key => !key.startsWith('_'));
      const updated = await saveGlobalConfig(env, body || {});
      // تأیید واقعی: after از نوشتن، کلیدها دوباره از D1 خوانده می‌شوند
      const verification = await verifyConfigInD1(env, keys);
      const storedInD1 = !verification.error && verification.found === keys.length;
      await addAuditLog(
        env,
        'ذخیره تنظیمات پنل',
        storedInD1 ? `${keys.length} کلید در D1` : `D1: ${verification.error || verification.missing.join(',')}`,
        clientIp
      ).catch(() => {});
      return jsonResponse({
        success: true,
        storedInD1,
        storage: {
          mode: verification.error ? 'Memory' : 'D1',
          written: verification.found,
          checked: verification.checked,
          missing: verification.missing,
          error: verification.error
        },
        message: storedInD1
          ? `تنظیمات در D1 ذخیره شد (${verification.found} کلید)`
          : `ذخیره در D1 انجام نشد: ${verification.error || verification.missing.join(', ')}`,
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

// ۲. بروزرسانی نسخه: بررسی و استقرار نسخهٔ تازه از گیت‌هاب روی همین اسکریپت (/api/update)
// هیچ اطلاعات حساب کلودفلر از کاربر گرفته نمی‌شود؛ اگر ورکر خودش کلید
// CF_API_TOKEN داشته باشد (تنظیم‌شده در داشبورد کلادفلر) نصب خودکار انجام می‌شود.
async function resolveUpdateToken(env) {
  const envToken = String(env?.CF_API_TOKEN || env?.CLOUDFLARE_API_TOKEN || '').trim();
  return { token: envToken, source: envToken ? 'env' : '' };
}

async function handleUpdateApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  const cfg = await loadGlobalConfig(env);
  const { token, source } = await resolveUpdateToken(env);
  const hostScriptName = new URL(request.url).hostname;

  const url = new URL(request.url);
  if (request.method === 'GET' && url.searchParams.get('diagnose') === '1') {
    const diag = await inspectUpdateTarget(cfg, env, { token, hostScriptName });
    return jsonResponse({ ...diag, tokenSource: source });
  }

  if (request.method === 'GET') {
    const info = await checkForUpdate(cfg, env, { token, scriptName: inferScriptName(hostScriptName) });
    return jsonResponse({ ...info, tokenSource: source });
  }

  if (request.method === 'POST') {
    let body = {};
    try { body = await request.json(); } catch (_e) {}
    const action = String(body?.action || 'check').toLowerCase();
    if (action === 'check') {
      return jsonResponse(await checkForUpdate(cfg, env, { force: true, token, scriptName: inferScriptName(hostScriptName) }));
    }
    if (action === 'apply') {
      const result = await applyUpdate(cfg, env, {
        force: body?.force === true,
        token,
        hostScriptName
      });
      // مسیرهای نسبی پاسخ را کامل کن تا پنل بتواند مستقیم دانلود/گزارش کند
      const origin = new URL(request.url).origin;
      if (result?.downloadPath) result.downloadUrl = origin + result.downloadPath;
      if (result?.success) {
        await addAuditLog(env, 'بروزرسانی نسخه', `از ${result.from || '?'} به ${result.to || '?'}`, clientIp).catch(() => {});
      }
      return jsonResponse(result, result.success ? 200 : 400);
    }
    return jsonResponse({ success: false, error: 'action نامعتبر است' }, 400);
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۲-الف. دانلود مستقیم فایل نسخهٔ تازه از گیت‌هاب/آینه‌ها (بدون نیاز به کلید حساب)
async function handleUpdateBundle(request, env) {
  const bundle = await fetchLatestBundle(env);
  if (!bundle) {
    return new Response('دریافت فایل نسخهٔ تازه ناموفق بود؛ چند دقیقهٔ دیگر تلاش کنید.', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(bundle.text, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Content-Disposition': 'attachment; filename="miliconfig-worker.js"',
      'Cache-Control': 'no-store'
    }
  });
}

// ۲-ب. وضعیت بروزرسانی خودکار — بدون هیچ ورودی حسابی از کاربر
// اگر ورکر کلید CF_API_TOKEN داشته باشد، نصب خودکار در دسترس است؛ در غیر این
// صورت پنل فقط دانلود فایل و دستور استقرار را نشان می‌دهد.
async function handleAutoUpdateSetupApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  let body = {};
  try { body = await request.json(); } catch (_e) {}
  const action = String(body?.action || 'check').toLowerCase();
  const cfg = await loadGlobalConfig(env);
  const envToken = String(env?.CF_API_TOKEN || env?.CLOUDFLARE_API_TOKEN || '').trim();
  const scriptGuess = inferScriptName(new URL(request.url).hostname) || '';

  if (action === 'check') {
    return jsonResponse({
      success: true,
      has_token: Boolean(envToken),
      token_source: envToken ? 'env' : '',
      can_auto_deploy: Boolean(envToken),
      auto_update: String(cfg.autoUpdate || 'no') === 'yes',
      account_id: cfg.cfAccountId || '',
      script_name: cfg.cfScriptName || scriptGuess,
      worker_name: String(env?.WORKER_NAME || ''),
      message: envToken
        ? 'نصب خودکار از داخل همین ورکر فعال است.'
        : 'برای نصب خودکار کافی است کلید CF_API_TOKEN را در متغیرهای ورکر (داشبورد کلادفلر) اضافه کنید؛ پنل هیچ ورودی حسابی نمی‌خواهد.'
    });
  }

  if (action === 'enable') {
    if (!envToken) {
      return jsonResponse({
        success: false,
        error: 'TOKEN_MISSING',
        can_auto_deploy: false,
        message: 'کلید CF_API_TOKEN روی این ورکر تنظیم نشده است؛ بدون آن فقط دانلود فایل نسخهٔ تازه و دستور استقرار در دسترس است.'
      }, 400);
    }
    const verified = await verifyUpdateToken(envToken);
    if (!verified.valid) {
      return jsonResponse({ success: false, error: 'INVALID_TOKEN', message: verified.error || 'کلید ورکر معتبر نیست.' }, 400);
    }
    const account = await resolveAccountId(envToken, cfg.cfAccountId || '');
    const patch = { autoUpdate: 'yes' };
    if (account.accountId && !cfg.cfAccountId) patch.cfAccountId = account.accountId;
    if (scriptGuess && !cfg.cfScriptName) patch.cfScriptName = scriptGuess;
    const saved = await saveGlobalConfig(env, patch);
    await addAuditLog(env, 'فعال‌سازی بروزرسانی خودکار', `حساب: ${account.accountId ? account.accountId.slice(-6) : 'نامشخص'}`, clientIp).catch(() => {});
    return jsonResponse({
      success: true,
      has_token: true,
      can_auto_deploy: true,
      auto_update: true,
      account_id: saved?.cfAccountId || patch.cfAccountId || '',
      script_name: saved?.cfScriptName || patch.cfScriptName || '',
      message: 'کلید ورکر تأیید شد و بروزرسانی خودکار روشن شد.'
    });
  }

  if (action === 'disable') {
    await saveGlobalConfig(env, { autoUpdate: 'no' });
    return jsonResponse({ success: true, auto_update: false, message: 'بروزرسانی خودکار خاموش شد.' });
  }

  return jsonResponse({ success: false, error: 'action نامعتبر است' }, 400);
}

// ۳. مدیریت کامل کاربران در دیتابیس D1 (/api/users)
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

// محافظ ضد Brute-Force برای ورود و بازیابی رمز مدیر (حداکثر ۸ تلاش ناموفق در ۱۰ دقیقه برای هر IP)
const LOGIN_ATTEMPTS = new Map();
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_FAILS = 8;

function checkLoginRateLimit(ip = '') {
  const key = String(ip || '127.0.0.1');
  const now = Date.now();
  if (LOGIN_ATTEMPTS.size > 500) {
    for (const [k, v] of LOGIN_ATTEMPTS) if (now - v.firstAt > LOGIN_WINDOW_MS) LOGIN_ATTEMPTS.delete(k);
  }
  const rec = LOGIN_ATTEMPTS.get(key);
  if (!rec) return { allowed: true };
  if (now - rec.firstAt > LOGIN_WINDOW_MS) {
    LOGIN_ATTEMPTS.delete(key);
    return { allowed: true };
  }
  if (rec.fails >= LOGIN_MAX_FAILS) {
    return { allowed: false, retrySec: Math.ceil((LOGIN_WINDOW_MS - (now - rec.firstAt)) / 1000) };
  }
  return { allowed: true };
}

function recordLoginFailure(ip = '') {
  const key = String(ip || '127.0.0.1');
  const now = Date.now();
  const rec = LOGIN_ATTEMPTS.get(key);
  if (!rec || now - rec.firstAt > LOGIN_WINDOW_MS) {
    LOGIN_ATTEMPTS.set(key, { fails: 1, firstAt: now });
  } else {
    rec.fails += 1;
  }
}

function clearLoginFailures(ip = '') {
  LOGIN_ATTEMPTS.delete(String(ip || '127.0.0.1'));
}

function matchesAdminKey(candidate, adminPath, customPath) {
  const key = normalizeAdminKey(candidate);
  if (!key) return false;
  if (timingSafeEqualStr(key, normalizeAdminKey(adminPath))) return true;
  const custom = normalizeAdminKey(customPath);
  return Boolean(custom) && timingSafeEqualStr(key, custom);
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
    const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const rl = checkLoginRateLimit(clientIp);
    if (!rl.allowed) {
      return jsonResponse({ success: false, message: `تلاش‌های ناموفق بیش از حد مجاز؛ لطفاً ${rl.retrySec} ثانیه دیگر تلاش کنید.` }, 429);
    }
    const body = await request.json().catch(() => ({}));
    const pass = String(body.password || '').trim();
    const ok = await verifyAdminPassword(env, pass);
    if (!ok) {
      recordLoginFailure(clientIp);
      return jsonResponse({ success: false, message: 'رمز عبور وارد شده اشتباه است.' }, 401);
    }
    clearLoginFailures(clientIp);
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
    const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const rl = checkLoginRateLimit(clientIp);
    if (!rl.allowed) {
      return jsonResponse({ success: false, message: `تلاش‌های ناموفق بیش از حد مجاز؛ لطفاً ${rl.retrySec} ثانیه دیگر تلاش کنید.` }, 429);
    }
    const body = await request.json().catch(() => ({}));
    const key = String(body.uuid || body.key || body.adminPath || '').trim();
    const newPass = String(body.password || '').trim();
    if (newPass.length < 4) {
      return jsonResponse({ success: false, message: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد.' }, 400);
    }
    const adminPath = await getOrCreateAdminPath(env);
    const cfg = await loadGlobalConfig(env);
    if (!matchesAdminKey(key, adminPath, cfg.d)) {
      recordLoginFailure(clientIp);
      return jsonResponse({ success: false, message: 'UUID/مسیر مدیریت نامعتبر است.' }, 403);
    }
    clearLoginFailures(clientIp);
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

// ============================================================================
// مخازن cfnew — همان منابعی که موتور خود cfnew برای ساخت نودها می‌خواند
// (فهرست IPv4 / IPv6 / دامنه / ProxyIP + گروه‌های اپراتوری سرویس youuin)
// اسکنر پنل فقط از همین‌ها تغذیه می‌شود تا نتیجه دقیقاً مثل cfnew باشد.
// ============================================================================
const SCAN_FAMILY_SOURCES = {
  ipv4: CFNEW_IPV4_SOURCES,
  ipv6: CFNEW_IPV6_SOURCES,
  proxyip: CFNEW_PROXYIP_SOURCES,
  domain: CFNEW_DOMAIN_SOURCES
};

// گرو‌ه‌های اپراتوری زندهٔ cfnew (移动/联通/电信/多线/IPv6) — با همان کلید md5
async function fetchCfnewIspGroups(cfg = {}) {
  try {
    const time = String(Date.now());
    const inner = await md5Hex(CFNEW_API_SECRET);
    const key = await md5Hex(inner + CFNEW_API_KEY_SALT + time);
    const res = await fetch(`${CFNEW_API_URL}?key=${key}&time=${time}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!res.ok) return { ok: false, status: res.status, groups: [] };
    const data = await res.json().catch(() => null);
    const groups = data && data.data ? data.data : null;
    if (!groups) return { ok: false, status: res.status, groups: [] };
    const out = [];
    for (const [name, meta] of Object.entries(CFNEW_ISP_GROUPS)) {
      if (meta.family === 'ipv6' && isEnabledValue(cfg.ipv6, true) === false) continue;
      if (meta.family === 'ipv4' && isEnabledValue(cfg.ipv4, true) === false) continue;
      if (meta.isp && isEnabledValue(cfg[meta.isp], true) === false) continue;
      const bucket = groups[name];
      const list = bucket && Array.isArray(bucket.info) ? bucket.info : [];
      for (const item of list) {
        const ip = normalizeNodeHost(item && item.ip);
        if (!ip) continue;
        out.push({ ip, family: meta.family, isp: meta.label, code: meta.code });
      }
    }
    return { ok: true, status: res.status, groups: out };
  } catch (err) {
    return { ok: false, status: 0, error: String(err && err.message || err), groups: [] };
  }
}

// خواندن همهٔ مخازن یک خانواده به‌صورت موازی + گزارش سلامت هر منبع
async function readCfnewFamilySources(family, timeoutMs = 4500) {
  const sources = SCAN_FAMILY_SOURCES[family] || [];
  return Promise.all(sources.map(async url => {
    const text = await fetchSourceText(url, timeoutMs);
    let entries = [];
    if (family === 'domain') {
      entries = String(text || '').split(/\r?\n/)
        .map(line => normalizeNodeHost(String(line || '').trim()))
        .filter(host => host && !host.startsWith('#') && isValidDomain(host))
        .map(host => ({ host, port: 443, family: 'domain' }));
    } else {
      entries = parseIpCandidateLines(text, family === 'proxyip' ? 'any' : family);
    }
    return { url, reachable: Boolean(text && text.length), entries };
  }));
}

// اسکن مخازن cfnew: IPv4 / IPv6 / دامنه / ProxyIP + گروه‌های اپراتوری youuin
async function scanCfnewMode({ mode, limit = 10, region = '', cfg = {} }) {
  const startedAt = Date.now();
  const family = mode === 'proxyip' ? 'proxyip' : mode === 'domain' ? 'domain' : mode;
  const feeds = await readCfnewFamilySources(family);
  const diagnostics = feeds.map(feed => ({
    source: feed.url,
    reachable: feed.reachable,
    entries: feed.entries.length
  }));

  const candidates = [];
  const seen = new Set();

  // استخر آی‌پی اختصاصی miliconfig (داخل مخزن) — همیشه در دسترس و بدون وابستگی به شبکه
  if (family === 'proxyip' && IP_POOL.length) {
    const wanted = String(region || '').toUpperCase();
    const local = wanted ? IP_POOL.filter(item => item.cc === wanted) : IP_POOL;
    if (local.length) {
      diagnostics.push({ source: 'builtin:ip-pool', reachable: true, entries: local.length, label: 'استخر اختصاصی' });
      for (const item of local) {
        const key = `${item.ip}:443`;
        if (seen.has(key)) continue;
        seen.add(key);
        candidates.push({ host: item.ip, port: 443, family: 'proxyip', cc: item.cc });
      }
    }
  }

  for (const feed of feeds) {
    for (const entry of feed.entries) {
      const key = `${entry.host}:${entry.port || 443}`;
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push(entry);
    }
  }

  // cfnew برای IPv4/IPv6 اول از گروه‌های اپراتوری سرویس می‌خواند (移动/联通/电信/多线/IPv6)
  if ((mode === 'ipv4' || mode === 'ipv6') && !cfg.yxURL) {
    const isp = await fetchCfnewIspGroups(cfg);
    diagnostics.push({
      source: CFNEW_API_URL,
      reachable: isp.ok,
      entries: isp.groups.length,
      label: 'گروه‌های اپراتوری'
    });
    for (const group of isp.groups) {
      if (mode === 'ipv4' && group.family !== 'ipv4') continue;
      if (mode === 'ipv6' && group.family !== 'ipv6') continue;
      if (seen.has(group.ip)) continue;
      seen.add(group.ip);
      candidates.push({ host: group.ip, port: 443, family: group.family, isp: group.isp });
    }
  }

  if (!candidates.length) {
    return {
      success: false,
      kind: mode,
      family,
      count: 0,
      sourceCount: feeds.length,
      testedCount: 0,
      capacity: candidates.length,
      proxies: [],
      diagnostics,
      message: 'هیچ‌یک از منابع آدرس پاسخ ندادند؛ چند لحظه بعد دوباره تلاش کنید.',
      elapsedMs: Date.now() - startedAt
    };
  }

  const pool = shuffleList(candidates).slice(0, Math.min(candidates.length, Math.min(Math.max(limit * 2, 12), 20)));
  const probed = [];
  const deadline = Date.now() + 8500;
  await runLimited(pool, MAX_PARALLEL_SOCKETS, async candidate => {
    if (probed.length >= limit || Date.now() > deadline) return;
    const probe = await probeTcp(candidate.host, candidate.port || 443, 2600);
    if (!probe.ok) return;
    probed.push({ ...candidate, latencyMs: probe.latencyMs });
  }, deadline);

  // ورکر کلادفلر خروجی IPv6 ندارد؛ اگر تست TCP برای IPv6 چیزی برنگرداند،
  // آدرس‌های مخزن به‌صورت «تأییدنشده» برمی‌گردند تا قابل افزودن به yx باشند.
  if (mode === 'ipv6' && probed.length === 0) {
    const fallback = shuffleList(candidates).slice(0, limit).map(item => ({ ...item, latencyMs: 0 }));
    const unverified = fallback.map(item => ({
      kind: 'ip',
      ip: item.host,
      port: item.port || 443,
      name: item.host,
      proxy: '',
      country: region || 'IPv6',
      code: region || 'CF',
      family: 'ipv6',
      protocol: 'IPv6',
      latencyMs: 0,
      verified: false,
      status: 'unverified'
    }));
    return {
      success: unverified.length > 0,
      kind: mode,
      family,
      count: unverified.length,
      sourceCount: feeds.length + 1,
      testedCount: pool.length,
      capacity: candidates.length,
      proxies: unverified,
      diagnostics,
      elapsedMs: Date.now() - startedAt,
      message: unverified.length
        ? `${unverified.length} آدرس IPv6 از منابع آدرس خوانده شد؛ ورکر خروجی IPv6 ندارد پس تست اتصال ممکن نیست — با کلاینت خودتان امتحان کنید.`
        : 'منبع IPv6 در دسترس نبود؛ دوباره تلاش کنید.'
    };
  }

  const proxies = probed
    .sort((a, b) => (a.latencyMs || 0) - (b.latencyMs || 0))
    .slice(0, limit)
    .map(item => ({
      kind: mode === 'proxyip' ? 'proxyip' : 'ip',
      ip: item.host,
      port: item.port || 443,
      name: item.host,
      proxy: mode === 'proxyip' ? `https://${item.host}:${item.port || 443}` : '',
      country: region
        ? (IP_POOL_COUNTRY_NAMES[region] || region)
        : mode === 'proxyip'
          ? (item.cc ? (IP_POOL_COUNTRY_NAMES[item.cc] || item.cc) : 'ProxyIP')
          : mode === 'ipv6' ? 'IPv6' : 'CF',
      code: region || item.cc || 'CF',
      family: item.family || (mode === 'ipv6' ? 'ipv6' : 'ipv4'),
      protocol: mode === 'domain' ? 'Domain' : mode === 'proxyip' ? 'ProxyIP' : (mode === 'ipv6' ? 'IPv6' : 'IPv4'),
      latencyMs: item.latencyMs || 0,
      verified: true,
      status: 'online'
    }));

  return {
    success: proxies.length > 0,
    kind: mode,
    family,
    count: proxies.length,
    sourceCount: feeds.length + (mode === 'ipv4' || mode === 'ipv6' ? 1 : 0),
    testedCount: pool.length,
    capacity: candidates.length,
    proxies,
    diagnostics,
    elapsedMs: Date.now() - startedAt,
    message: proxies.length
      ? `${proxies.length} مورد سالم از منابع آدرس (${candidates.length} ورودی خوانده شد)`
      : `از ${pool.length} آدرس تست‌شده هیچ‌کدام TCP پاسخ نداد؛ احتمالاً این محیط خروجی ${mode === 'ipv6' ? 'IPv6' : 'شبکه'} ندارد.`
  };
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
        if (!host || (!isValidIpAddress(host) && !isValidDomain(host)) || isPrivateOrReservedTarget(host)) {
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

  // تست یک آدرس مشخص با یک درخواست GET ساده (برای ابزارها و مانیتورینگ بیرونی)
  // /api/scanner/probe?host=104.16.0.1&port=443
  if (action === 'probe' && request.method === 'GET') {
    const host = normalizeNodeHost(url.searchParams.get('host') || url.searchParams.get('ip') || '');
    const port = parseInt(url.searchParams.get('port') || '443', 10) || 443;
    if (!host || (!isValidIpAddress(host) && !isValidDomain(host)) || isPrivateOrReservedTarget(host)) {
      return jsonResponse({ success: false, error: 'invalid-host', message: 'آدرس واردشده معتبر یا مجاز نیست.' }, 400);
    }
    let probe = await probeTcp(host, port, 2500);
    // اگر TCP از سمت ورکر مسدود باشد (مثلاً آدرس‌های خود کلادفلر)، یک درخواست
    // HTTPS به همان آدرس می‌زنیم؛ پاسخ HTTP یعنی آدرس زنده است.
    if (!probe.ok) {
      const startedAt = Date.now();
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const safeHost = host.includes(':') ? `[${host}]` : host;
        const resp = await fetch(`https://${safeHost}:${port}/cdn-cgi/trace`, {
          method: 'GET',
          redirect: 'manual',
          headers: { Host: 'cloudflare.com' },
          signal: controller.signal
        });
        clearTimeout(timer);
        if (resp && typeof resp.status === 'number' && resp.status > 0) {
          probe = { ok: true, latencyMs: Date.now() - startedAt, error: '' };
        }
      } catch (_e) {}
    }
    return jsonResponse({
      success: Boolean(probe.ok),
      host,
      port,
      latencyMs: probe.latencyMs || 0,
      error: probe.ok ? '' : (probe.error || 'unreachable')
    });
  }

  // اسکن سریع با GET: /api/scanner/quick?mode=proxyip&country=DE&limit=5
  if (action === 'quick' && request.method === 'GET') {
    try {
      const requested = String(url.searchParams.get('mode') || url.searchParams.get('kind') || 'proxyip').toLowerCase();
      const mode = ['ipv4', 'ipv6', 'domain', 'proxyip'].includes(requested) ? requested : 'proxyip';
      const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '8', 10), 1), 30);
      const cfgNow = await loadGlobalConfig(env);
      const result = await scanCfnewMode({
        mode,
        limit,
        region: String(url.searchParams.get('country') || '').toUpperCase(),
        cfg: cfgNow
      });
      return jsonResponse(result);
    } catch (_e) {
      return jsonResponse({ success: false, message: 'اسکن ناموفق بود؛ بعداً دوباره تلاش کنید.' }, 500);
    }
  }

  // فهرست اندپوینت‌های اسکنر (خودتوصیف، برای ابزارهای بیرونی)
  if (action === 'endpoints' && request.method === 'GET') {
    const origin = url.origin;
    return jsonResponse({
      success: true,
      endpoints: [
        { method: 'GET', path: '/api/scanner/probe?host=&port=', description: 'تست اتصال یک آدرس و پورت' },
        { method: 'GET', path: '/api/scanner/quick?mode=proxyip&country=DE&limit=5', description: 'دریافت و تست آدرس‌های سالم' },
        { method: 'POST', path: '/api/scanner/fetch-and-test', description: 'اسکن کامل با بدنهٔ JSON' },
        { method: 'POST', path: '/api/scanner/apply', description: 'نوشتن نتیجه در تنظیمات آدرس‌های دستی/آدرس واسط/پروکسی خروجی' },
        { method: 'GET', path: '/api/scanner/sources', description: 'فهرست منابع آدرس' },
        { method: 'GET', path: '/api/scanner/countries', description: 'فهرست کشورها و آی‌پی‌های پیش‌فرض' }
      ],
      examples: {
        probe: `${origin}/api/scanner/probe?host=104.16.0.1&port=443`,
        quick: `${origin}/api/scanner/quick?mode=proxyip&country=DE&limit=5`
      }
    });
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
        mixed: (GLOBAL_PROXY_SOURCES.mixed || []).length,
        ipv4: IP_RANGE_SOURCES.ipv4.length,
        ipv6: IP_RANGE_SOURCES.ipv6.length
      },
      // آی‌پی‌ها و دامنه‌های پیش‌فرض لبهٔ کلادفلر برای افزودن مستقیم به yx از داخل اسکنر
      officialIps: OFFICIAL_DIRECT_IPS,
      officialIpv6: OFFICIAL_DIRECT_IPV6,
      directDomains: DIRECT_DOMAINS.map(item => item.domain),
      // استخر آی‌پی اختصاصی miliconfig (داخل مخزن) — برای حالت ProxyIP اسکنر
      ipPool: {
        count: IP_POOL.length,
        countries: IP_POOL_COUNTRIES.map(item => ({ code: item.cc, name: item.name, count: item.count })),
        subscription: '/ips',
        meta: '/ips.json'
      }
    });
  }

  // رجیستری فیدها: همهٔ آدرس‌هایی که اسکنر از آنها تغذیه می‌شود، به‌صورت JSON
  // (?scope=country|global و ?country=DE و ?kind=socks5|http|mixed برای فیلتر)
  // این همان «سازوکار اتصال» به مخازن بیرونی است؛ هر ابزار بیرونی می‌تواند از
  // همین خروجی فهرست منابع را بخواند و مستقیم همان آدرس‌ها را دریافت کند.
  if (action === 'sources' && request.method === 'GET') {
    const scope = String(url.searchParams.get('scope') || '').toLowerCase();
    const countryFilter = String(url.searchParams.get('country') || '').toUpperCase();
    const kindFilter = String(url.searchParams.get('kind') || '').toLowerCase();
    let feeds = PROXY_FEED_REGISTRY.slice();
    if (scope === 'global' || scope === 'country') feeds = feeds.filter(feed => feed.scope === scope);
    if (countryFilter) feeds = feeds.filter(feed => feed.country === countryFilter);
    if (kindFilter) feeds = feeds.filter(feed => feed.kind === kindFilter);
    return jsonResponse({
      success: true,
      count: feeds.length,
      total: PROXY_FEED_REGISTRY.length,
      kinds: ['socks5', 'http', 'mixed'],
      // روش‌های خواندن هر فید: خطوط host:port، host:port:CC، host:port|CC|City،
      // خطوط بس‌شدهٔ آی‌پی، فیدهای JSON، و پروکسی‌های دارای user:pass@
      supportedFormats: ['host:port', 'scheme://host:port', 'user:pass@host:port', 'host:port:CC', 'host:port|CC|City', 'bare-ip', 'json'],
      feeds
    });
  }

  // رجیستری مخازن cfnew: کدام مخزن برای IPv4/IPv6/دامنه/ProxyIP استفاده می‌شود
  if (action === 'cfnew-sources' && request.method === 'GET') {
    return jsonResponse({
      success: true,
      engine: 'cfnew',
      api: CFNEW_API_URL,
      ispGroups: Object.values(CFNEW_ISP_GROUPS).map(g => ({ code: g.code, label: g.label, family: g.family })),
      sources: {
        ipv4: CFNEW_IPV4_SOURCES,
        ipv6: CFNEW_IPV6_SOURCES,
        domain: CFNEW_DOMAIN_SOURCES,
        proxyip: CFNEW_PROXYIP_SOURCES
      }
    });
  }

  // اسکن زنده: هر بار لیست‌ها از منابع خوانده می‌شوند (بدون کش) و فقط یک برش چرخشی تست می‌شود
  if (action === 'fetch-and-test' && request.method === 'POST') {
    try {
      const body = await request.json().catch(() => ({}));
      // حالت‌های موتور cfnew: ipv4 / ipv6 / domain / proxyip
      const cfMode = ['ipv4', 'ipv6', 'domain', 'proxyip'].includes(String(body.mode || body.kind || '').toLowerCase())
        ? String(body.mode || body.kind).toLowerCase()
        : '';
      if (cfMode) {
        const cfg = await loadGlobalConfig(env);
        const limit = Math.min(Math.max(parseInt(body.limit || '10', 10), 1), 30);
        const result = await scanCfnewMode({
          mode: cfMode,
          limit,
          region: String(body.country || '').toUpperCase(),
          cfg
        });
        return jsonResponse(result);
      }
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
        // لیست IPv6 واقعیِ منبع چینی خودبه‌روز (bestcfv6) — قبل از ساختن آدرس تصادفی
        const listedV6 = family === 'ipv6'
          ? parseIpCandidateLines(await fetchSourceText(pickRotating(IPV6_CANDIDATE_SOURCES, 1)[0], 4000), 'ipv6').map(i => i.host)
          : [];

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
          for (const ip of shuffleList(listedV6)) {
            if (picked.length >= limit) break;
            if (seenV6.has(ip)) continue;
            seenV6.add(ip);
            picked.push(ip);
          }
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
            count: proxies.length, sourceCount: ranges.length + curatedV6.length + listedV6.length, testedCount: 0,
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

        // لیست زنده آی‌پی‌های فرانت‌شده کلادفلر؛ آدرس‌های تصادفی داخل رنج‌ها
        // از داخل ورکر کلادفلر قابل اتصال نیستند، بنابراین از خود لیست نمونه می‌گیریم.
        // فیدهای همیشه‌به‌روز: آی‌پی‌های تست‌شدهٔ IPDB (BestCF) و پروکسی‌آی‌پی‌های آمادهٔ (BestProxy)
        const ipListSources = family === 'ipv6' ? [] : [...IP_CANDIDATE_SOURCES, ...PROXY_IP_SOURCES];
        const listSource = ipListSources.length ? pickRotating(ipListSources, 1)[0] : null;
        const listText = listSource ? await fetchSourceText(listSource, 5000) : '';
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
      //
      // هر پروکسی قبل از نمایش، handshake واقعی پروتکل را پاس می‌کند (SOCKS5 CONNECT یا
      // HTTP CONNECT). باز بودن پورت به‌تنهایی معیار نیست: بیشتر پروکسی‌های منقضی پورت
      // باز دارند ولی ترافیک را عبور نمی‌دهند و همین باعث می‌شد نودهای «آنلاین» کار نکنند.
      const countrySources = multi
        ? pickRotating(Object.keys(COUNTRY_PROXY_SOURCES), 3).flatMap(c => pickRotating(COUNTRY_PROXY_SOURCES[c].urls || [], 1))
        : pickRotating(COUNTRY_PROXY_SOURCES[code].urls || [], 5);
      // فیدهای با بازده بالا اولویت دارند؛ در حالت کشوری هم دو فید عمومی
      // با بازده بالا اضافه می‌شود تا استخر تست کوچک نماند.
      const highYield = pickRotating(HIGH_YIELD_PROXY_SOURCES, multi ? 4 : 2);
      const sources = [...new Set([...countrySources, ...highYield])].slice(0, 8);

      const feedResults = await Promise.all(sources.map(async src => {
        const text = await fetchSourceText(src, 4000);
        const kind = getFeedKind(src);
        const hint = kind === 'socks5' ? 'SOCKS5' : kind === 'http' ? 'HTTP' : '';
        return { url: src, reachable: text.length > 0, entries: text ? parseProxyLines(text, hint) : [] };
      }));

      const seen = new Set();
      const candidates = [];
      for (const feed of feedResults) {
        for (const p of feed.entries) {
          if (family !== 'any' && p.family && p.family !== family && p.family !== 'domain') continue;
          const key = p.host + ':' + p.port;
          if (seen.has(key)) continue;
          seen.add(key);
          candidates.push(p);
        }
      }

      // گزارش وضعیت هر فید — برای این‌که پنل بتواند دلیل نتیجه صفر را نشان دهد
      const diagnostics = feedResults.map(feed => ({
        source: feed.url,
        kind: getFeedKind(feed.url),
        reachable: feed.reachable,
        entries: feed.entries.length
      }));
      const deadFeeds = diagnostics.filter(item => !item.reachable || item.entries === 0).length;

      if (!candidates.length) {
        return jsonResponse({
          success: false, kind, family, country: countryLabel, code,
          count: 0, sourceCount: sources.length, testedCount: 0, proxies: [], diagnostics,
          message: `از ${sources.length} منبع هیچ ورودی پروکسی خوانده نشد (${deadFeeds} منبع خالی یا در دسترس نبود). چند لحظه بعد دوباره تلاش کنید.`
        });
      }

      // سقف ۴ سوکت هم‌زمان (runtime کلادفلر حداکثر ۶ اتصال هم‌زمان می‌دهد) و
      // سقف زمانی، تا اسکن هیچ‌وقت با خطای «Too many open connections» یا timeout نکشد.
      const startedAt = Date.now();
      const scanDeadline = startedAt + 9000;
      const pool = shuffleList(candidates).slice(0, Math.min(candidates.length, 20));
      const verifiedProxies = [];
      let testedCount = 0;
      // آمار دلیل ردشدن‌ها — برای این‌که معلوم باشد مشکل «کد» است یا «خشک بودن استخر»
      const failures = {};

      await runLimited(pool, MAX_PARALLEL_SOCKETS, async candidate => {
        if (verifiedProxies.length >= limit || Date.now() > scanDeadline) return;
        testedCount++;
        const result = await verifyProxyEntry(candidate, 3200);
        if (result.ok) {
          verifiedProxies.push({ ...candidate, ...result });
        } else {
          const reason = String(result.error || 'unknown').split('-')[0];
          failures[reason] = (failures[reason] || 0) + 1;
        }
      }, scanDeadline);

      const online = verifiedProxies
        .sort((a, b) => a.latencyMs - b.latencyMs)
        .slice(0, limit);

      const proxies = online.map(p => {
        const scheme = (p.protocol || 'SOCKS5').toLowerCase() === 'https' ? 'http' : (p.protocol || 'SOCKS5').toLowerCase();
        const auth = p.username ? `${p.username}:${p.password || ''}@` : '';
        return {
          kind: 'proxy',
          ip: p.host,
          port: p.port,
          name: `${p.host}:${p.port}`,
          proxy: `${scheme}://${auth}${p.host}:${p.port}`,
          country: countryLabel,
          code: p.countryHint && COUNTRY_PROXY_SOURCES[p.countryHint] ? p.countryHint : code,
          family: p.family || '',
          protocol: p.protocol,
          latencyMs: p.latencyMs,
          verified: true,
          status: 'online'
        };
      });

      return jsonResponse({
        success: proxies.length > 0, kind, family, country: countryLabel, code,
        count: proxies.length, sourceCount: candidates.length, testedCount, proxies, diagnostics,
        failures,
        elapsedMs: Date.now() - startedAt,
        message: proxies.length
          ? `${proxies.length} پروکسی تأییدشده (handshake کامل) از ${testedCount} مورد تست‌شده در ${sources.length} منبع`
          : `از ${testedCount} پروکسی تست‌شده هیچ‌کدام handshake را پاس نکردند${deadFeeds ? ` (${deadFeeds} منبع خالی/۴۰۴)` : ''}؛ دوباره تلاش کنید یا حالت «چند کشور» را انتخاب کنید.`
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
    if (await hasAdminPassword(env)) {
      const rawCookie = request.headers.get('Cookie') || '';
      const tokenMatch = rawCookie.match(/(?:^|;\s*)mili_auth=([^;]*)/);
      const sessionToken = tokenMatch ? decodeURIComponent(tokenMatch[1]) : '';
      if (rawCookie && !(await verifyAdminSession(env, sessionToken))) {
        return jsonResponse({ success: false, message: 'نشست مدیر معتبر نیست؛ ابتدا وارد پنل شوید.' }, 401);
      }
    }
    try {
      const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
      const body = await request.json().catch(() => ({}));
      const target = ['s', 'yx', 'p'].indexOf(body.target) > -1 ? body.target : '';
      const items = Array.isArray(body.items) ? body.items : [body];
      const cfg = await loadGlobalConfig(env);
      // اگر کاربر هدف مشخص شده باشد، نتیجهٔ اسکن داخل تنظیمات همان کاربر
      // نوشته می‌شود (تب تنظیمات حذف شده و همهٔ متغیرها per-user هستند).
      const targetUser = body.userId ? await getUserByIdOrToken(env, String(body.userId)) : null;

      if (targetUser && target === 'yx') {
        const list = parseYxArray(targetUser.config?.yx || '');
        let added = 0;
        for (const item of items) {
          const ip = String(item?.ip || '').trim();
          const port = parseInt(item?.port || 443, 10) || 443;
          if (!ip || (!isValidIpAddress(ip) && !isValidDomain(ip))) continue;
          if (list.some(x => x.ip === ip && x.port === port)) continue;
          list.push({ ip, port, name: String(item?.name || ip) });
          added++;
        }
        if (added > 0) {
          await updateUser(env, targetUser.id, { config: { yx: serializeYxArray(list), epi: 'yes' } }, clientIp);
        }
        return jsonResponse({
          success: added > 0,
          added,
          userId: targetUser.id,
          total: list.length,
          message: added > 0
            ? `${added} آدرس به آدرس‌های دستی کاربر «${targetUser.username}» اضافه شد`
            : 'آی‌پی جدیدی برای افزودن نبود'
        });
      }

      if (targetUser && target === 'p') {
        // آدرس واسط (ProxyIP): تنها یک نشانی پذیرفته می‌شود و به‌صورت host:port ذخیره می‌گردد
        const item = items[0] || {};
        const host = String(item.ip || item.proxy || '').trim();
        const port = parseInt(item.port || 443, 10) || 443;
        if (!host || (!isValidIpAddress(host) && !isValidDomain(host))) {
          return jsonResponse({ success: false, message: 'آدرس واسط معتبری ارسال نشد' }, 400);
        }
        const proxyIp = (host.includes(':') ? `[${host}]` : host) + ':' + port;
        await updateUser(env, targetUser.id, { config: { p: proxyIp } }, clientIp);
        return jsonResponse({ success: true, p: proxyIp, userId: targetUser.id, message: `آدرس واسط کاربر «${targetUser.username}» روی ${proxyIp} تنظیم شد` });
      }

      if (targetUser && target === 's') {
        const item = items[0] || {};
        const proxyUrl = String(item.proxy || '').trim();
        if (!proxyUrl) return jsonResponse({ success: false, message: 'پروکسی معتبری ارسال نشد' }, 400);
        await updateUser(env, targetUser.id, { config: { s: proxyUrl } }, clientIp);
        return jsonResponse({ success: true, s: proxyUrl, userId: targetUser.id, message: 'پروکسی خروجی برای این کاربر تنظیم شد' });
      }      if (target === 'p') {
        const item = items[0] || {};
        const host = String(item.ip || item.proxy || '').trim();
        const port = parseInt(item.port || 443, 10) || 443;
        if (!host || (!isValidIpAddress(host) && !isValidDomain(host))) {
          return jsonResponse({ success: false, message: 'آدرس واسط معتبری ارسال نشد' }, 400);
        }
        const proxyIp = (host.includes(':') ? `[${host}]` : host) + ':' + port;
        await saveGlobalConfig(env, { p: proxyIp });
        return jsonResponse({ success: true, p: proxyIp, message: `آدرس واسط روی ${proxyIp} تنظیم شد` });
      }

      if (target === 's') {
        const item = items[0] || { };
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
          message: added > 0 ? `${added} آدرس به آدرس‌های دستی اضافه شد` : 'آدرس جدیدی برای افزودن نبود'
        });
      }

      return jsonResponse({ success: false, message: 'مقصد نتیجه نامعتبر است' }, 400);
    } catch (err) {
      return jsonResponse({ success: false, message: 'خطا در اعمال نتیجه اسکن: ' + (err?.message || err) }, 500);
    }
  }

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}


// ============================================================================
// سازندهٔ پروکسی تلگرام (MTProto Fake-TLS & SOCKS5) و وب‌پروکسی زنده (/webproxy)
// ============================================================================

function buildFakeTlsSecret(sniDomain = "www.google.com", seedHex = "") {
  const cleanSni = String(sniDomain || "www.google.com")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/[^a-z0-9.-]/g, "") || "www.google.com";
  let hex16 = String(seedHex || "").replace(/[^0-9a-f]/gi, "").toLowerCase().slice(0, 32);
  if (hex16.length < 32) {
    const rnd = getRandomBytesSafe(16);
    hex16 = Array.from(rnd, b => b.toString(16).padStart(2, "0")).join("");
  }
  const sniBytes = new TextEncoder().encode(cleanSni);
  const sniHex = Array.from(sniBytes, b => b.toString(16).padStart(2, "0")).join("");
  return { secret: "ee" + hex16 + sniHex, sni: cleanSni, rawSecret: hex16 };
}

async function handleTelegramProxyApi(request, env) {
  try {
    const url = new URL(request.url);
    let body = {};
    if (request.method === "POST") {
      body = await request.json().catch(() => ({}));
    }
    const country = String(body.country || url.searchParams.get("country") || "DE").trim().toUpperCase();
    const sniInput = String(body.sni || url.searchParams.get("sni") || "www.google.com").trim();
    const format = String(body.format || url.searchParams.get("format") || "json").trim().toLowerCase();
    const limit = Math.min(Math.max(parseInt(body.limit || url.searchParams.get("limit") || "8", 10) || 8, 1), 20);

    const { secret, sni } = buildFakeTlsSecret(sniInput);
    const proxies = [];
    const seen = new Set();

    // ۱) دریافت پروکسی‌های SOCKS5 زنده همان کشور (در صورت وجود در کش یا فید سریع)
    const countryMeta = COUNTRY_PROXY_SOURCES[country] || COUNTRY_PROXY_SOURCES.DE;
    if (countryMeta && Array.isArray(countryMeta.urls)) {
      const rawText = countryMeta.urls[0] ? await fetchSourceText(countryMeta.urls[0], 2000).catch(() => "") : "";
      const rawLines = String(rawText || "").split(/[\r\n]+/).filter(Boolean);
      for (const raw of rawLines.slice(0, 20)) {
        const parsed = parseAddressAndPort(String(raw || "").replace(/^[a-z0-9+.-]+:\/\//i, "").split("#")[0].trim(), 1080);
        const pHost = parsed && parsed.address ? parsed.address : "";
        const pPort = (parsed && parsed.port) || 1080;
        if (!pHost || (!isValidIpAddress(pHost) && !isValidDomain(pHost)) || isPrivateOrReservedTarget(pHost)) continue;
        const key = pHost + ":" + pPort;
        if (seen.has(key)) continue;
        seen.add(key);
        const tgSocks = `tg://socks?server=${encodeURIComponent(pHost)}&port=${pPort}&remarks=${encodeURIComponent(country + "-SOCKS5")}`;
        const tmeSocks = `https://t.me/proxy?server=${encodeURIComponent(pHost)}&port=${pPort}`;
        proxies.push({
          type: "SOCKS5",
          country,
          server: pHost,
          port: pPort,
          sni: "—",
          secret: "",
          tgUrl: tgSocks,
          tmeUrl: tmeSocks,
          label: `${country} · SOCKS5 · ${pHost}:${pPort}`
        });
        if (proxies.length >= Math.ceil(limit / 2)) break;
      }
    }

    // ۲) ساخت پروکسی‌های MTProto Fake-TLS با دامنهٔ SNI ضد فیلتر روی آی‌پی‌های منتخب همان کشور و لبه
    const poolHits = IP_POOL.filter(item => item.cc === country).map(item => item.ip);
    const candidateIps = [...poolHits, ...OFFICIAL_DIRECT_IPS];
    for (const ip of candidateIps) {
      if (proxies.length >= limit) break;
      if (!ip || isPrivateOrReservedTarget(ip)) continue;
      const key = "mt:" + ip + ":443";
      if (seen.has(key)) continue;
      seen.add(key);
      const tgMt = `tg://proxy?server=${encodeURIComponent(ip)}&port=443&secret=${secret}`;
      const tmeMt = `https://t.me/proxy?server=${encodeURIComponent(ip)}&port=443&secret=${secret}`;
      proxies.push({
        type: "MTProto Fake-TLS",
        country,
        server: ip,
        port: 443,
        sni,
        secret,
        tgUrl: tgMt,
        tmeUrl: tmeMt,
        label: `${country} · Fake-TLS (${sni}) · ${ip}:443`
      });
    }

    const webproxyUrl = `${url.origin}/webproxy`;
    const subUrl = `${url.origin}/tg?format=links&country=${encodeURIComponent(country)}&sni=${encodeURIComponent(sni)}`;

    if (format === "links" || format === "txt" || format === "raw") {
      const lines = proxies.map(p => p.tmeUrl).concat(proxies.map(p => p.tgUrl));
      return new Response(lines.join("\n") + "\n", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return jsonResponse({
      success: true,
      country,
      sni,
      secret,
      webproxyUrl,
      subUrl,
      count: proxies.length,
      proxies,
      message: `${proxies.length} پروکسی و وب‌پروکسی تلگرام (${country} · SNI: ${sni}) آماده شد`
    });
  } catch (err) {
    return jsonResponse({ success: false, message: "خطا در ساخت پروکسی تلگرام: " + (err?.message || err) }, 500);
  }
}

async function handleWebProxyRequest(request, env) {
  const url = new URL(request.url);
  const channelParam = String(url.searchParams.get("channel") || "").trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9_]/g, "");
  let targetRaw = String(url.searchParams.get("url") || "").trim();
  if (!targetRaw && channelParam) {
    targetRaw = `https://t.me/s/${channelParam}`;
  }

  if (targetRaw) {
    let parsedTarget;
    try {
      if (!/^https?:\/\//i.test(targetRaw)) targetRaw = "https://" + targetRaw;
      parsedTarget = new URL(targetRaw);
    } catch (_e) {
      return jsonResponse({ error: "آدرس هدف برای وب‌پروکسی معتبر نیست" }, 400);
    }
    if (
      (parsedTarget.protocol !== "https:" && parsedTarget.protocol !== "http:") ||
      parsedTarget.hostname.toLowerCase() === url.hostname.toLowerCase() ||
      isPrivateOrReservedTarget(parsedTarget.hostname)
    ) {
      return jsonResponse({ error: "آدرس هدف مجاز نیست (مسدودسازی امنیتی SSRF)" }, 400);
    }

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6500);
      const upstream = await fetch(parsedTarget.toString(), {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          "Accept": request.headers.get("Accept") || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "fa,en-US;q=0.9,en;q=0.8"
        },
        redirect: "follow",
        signal: ctrl.signal
      });
      clearTimeout(timer);

      const contentType = upstream.headers.get("Content-Type") || "text/html; charset=utf-8";
      if (contentType.toLowerCase().includes("text/html")) {
        let html = await upstream.text();
        const proxyPrefix = `${url.origin}/webproxy?url=`;
        // بازنویسی لینک‌های تلگرام و منابع صفحه برای عبور از وب‌پروکسی
        html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${parsedTarget.origin}/">`);
        html = html.replace(/https:\/\/t\.me\/s\/([a-zA-Z0-9_]+)/g, `${url.origin}/webproxy?channel=$1`);
        const banner = `<div dir="rtl" style="position:sticky;top:0;z-index:999999;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 16px;background:rgba(9,13,22,0.94);color:#e9f3ff;border-bottom:1px solid rgba(181,255,77,0.35);font:13px/1.6 Tahoma,system-ui,sans-serif;backdrop-filter:blur(12px);">
          <div><b>وب‌پروکسی تلگرام miliconfig</b> · در حال نمایش: <span dir="ltr" style="font-family:monospace;color:#b5ff4d;">${escapeHtml(parsedTarget.hostname + parsedTarget.pathname)}</span></div>
          <div style="display:flex;gap:8px;">
            <a href="${url.origin}/webproxy" style="padding:5px 12px;border-radius:999px;background:#b5ff4d;color:#081206;text-decoration:none;font-weight:700;">جستجوی کانال دیگر</a>
          </div>
        </div>`;
        html = html.replace(/<body([^>]*)>/i, `<body$1>${banner}`);
        return new Response(html, {
          status: upstream.status,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }

      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=300",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (err) {
      return new Response(`خطا در دریافت آدرس از وب‌پروکسی: ${escapeHtml(err?.message || String(err))}`, {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }

  // صفحهٔ پرتال تعاملی وب‌پروکسی تلگرام و سازندهٔ لینک MTProto/SOCKS5
  const { secret: sampleSecret } = buildFakeTlsSecret("www.google.com");
  const sampleIp = OFFICIAL_DIRECT_IPS[0] || "162.159.152.4";
  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl" data-theme="zedsecure">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>وب‌پروکسی و پروکسی تلگرام — ${BRAND_NAME}</title>
  <style>
    :root {
      --bg: #0b0914; --panel: #151224; --line: rgba(208,188,255,0.2);
      --accent: #d0bcff; --accent-text: #1c1136; --text: #f3edff; --muted: #a59bb8;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Vazirmatn", Tahoma, system-ui, sans-serif; background: radial-gradient(800px 420px at 80% 0%, rgba(208,188,255,0.14), transparent 65%), var(--bg); color: var(--text); min-height: 100vh; padding: 24px 14px; }
    .wrap { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
    .card { background: var(--panel); border: 1px solid var(--line); border-radius: 26px; padding: 20px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); }
    h1 { margin: 0 0 8px; font-size: 1.35rem; }
    p { margin: 0 0 14px; color: var(--muted); font-size: 0.86rem; line-height: 1.8; }
    .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 12px; }
    input, select { width: 100%; padding: 11px 14px; border-radius: 14px; border: 1px solid var(--line); background: rgba(0,0,0,0.3); color: var(--text); font-family: inherit; font-size: 0.85rem; outline: none; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 18px; border-radius: 999px; border: 1px solid var(--line); background: rgba(255,255,255,0.05); color: var(--text); font-weight: 700; font-size: 0.82rem; cursor: pointer; text-decoration: none; transition: 0.18s; }
    .btn.primary { background: var(--accent); color: var(--accent-text); border-color: transparent; }
    .btn:hover { transform: translateY(-2px); }
    .list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
    .item { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding: 12px 14px; border-radius: 16px; border: 1px solid var(--line); background: rgba(255,255,255,0.025); }
    .mono { font-family: ui-monospace, monospace; direction: ltr; font-size: 0.78rem; color: var(--accent); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>وب‌پروکسی زندهٔ تلگرام و وب (${BRAND_NAME})</h1>
      <p>بدون نیاز به نصب فیلترشکن، کانال‌های عمومی تلگرام را مستقیماً از طریق سرور لبهٔ کلودفلر مشاهده کنید یا هر آدرس وب مسدودشده را باز نمایید.</p>
      <form action="/webproxy" method="GET" class="row">
        <input type="text" name="channel" placeholder="نام کانال تلگرام (مثلاً telegram یا durov)">
        <button class="btn primary" type="submit">مشاهدهٔ کانال در وب‌پروکسی</button>
      </form>
      <form action="/webproxy" method="GET" class="row" style="margin-top:8px;">
        <input type="text" name="url" dir="ltr" placeholder="https://t.me/s/telegram یا هر آدرس https://...">
        <button class="btn" type="submit">باز کردن آدرس در وب‌پروکسی</button>
      </form>
    </div>

    <div class="card">
      <h1>سازندهٔ هوشمند پروکسی تلگرام (MTProto Fake-TLS & SOCKS5)</h1>
      <p>ساخت آنی پروکسی ضد فیلتر تلگرام با دامنهٔ Fake-TLS (عبور از فیلترینگ ملی) و پروکسی‌های SOCKS5 کشوری.</p>
      <div class="row">
        <select id="tgCountry">
          <option value="DE">آلمان (DE)</option>
          <option value="NL">هلند (NL)</option>
          <option value="FI">فنلاند (FI)</option>
          <option value="SE">سوئد (SE)</option>
          <option value="GB">بریتانیا (GB)</option>
          <option value="US">آمریکا (US)</option>
          <option value="TR">ترکیه (TR)</option>
        </select>
        <input type="text" id="tgSni" dir="ltr" value="www.google.com" placeholder="دامنه Fake-TLS (مثلاً www.google.com)">
        <button class="btn primary" type="button" onclick="buildProxies()">ساخت پروکسی تلگرام</button>
      </div>
      <div id="tgResult" class="list">
        <div class="item">
          <div><b>پروکسی آماده Fake-TLS</b><div class="mono">${sampleIp}:443 · SNI: www.google.com</div></div>
          <div style="display:flex;gap:6px;">
            <a class="btn primary" href="tg://proxy?server=${sampleIp}&port=443&secret=${sampleSecret}">اتصال در تلگرام</a>
            <a class="btn" href="https://t.me/proxy?server=${sampleIp}&port=443&secret=${sampleSecret}" target="_blank" rel="noopener">لینک t.me</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    function buildProxies() {
      var c = document.getElementById("tgCountry").value;
      var s = document.getElementById("tgSni").value;
      var box = document.getElementById("tgResult");
      box.innerHTML = "<div class=\"item\">در حال ساخت و بررسی پروکسی‌های تلگرام...</div>";
      fetch("/api/telegram/build?country=" + encodeURIComponent(c) + "&sni=" + encodeURIComponent(s))
        .then(function(r) { return r.json(); })
        .then(function(d) {
          if (!d.success || !d.proxies || !d.proxies.length) {
            box.innerHTML = "<div class=\"item\">موردی یافت نشد.</div>";
            return;
          }
          box.innerHTML = d.proxies.map(function(p) {
            return "<div class=\"item\"><div><b>" + p.label + "</b><div class=\"mono\">" + p.type + (p.sni && p.sni !== "—" ? " · SNI: " + p.sni : "") + "</div></div>" +
              "<div style=\"display:flex;gap:6px;\"><a class=\"btn primary\" href=\"" + p.tgUrl + "\">اتصال در تلگرام</a>" +
              "<a class=\"btn\" href=\"" + p.tmeUrl + "\" target=\"_blank\" rel=\"noopener\">لینک t.me</a></div></div>";
          }).join("");
        })
        .catch(function() { box.innerHTML = "<div class=\"item\">خطا در ارتباط با سرور</div>"; });
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}


// --- MODULE: src/ui/loginHtml.js ---
// ============================================================================
// miliconfig v3.2 - درگاه ورود با استتار nginx
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


// --- MODULE: src/ui/statusHtml.js ---
// ============================================================================
// miliconfig v3.3 - پورتال وضعیت و اشتراک اختصاصی کاربر
// طراحی تم‌پذیر با هدر سه‌بعدی، تب‌های فشرده و کارت‌های تعاملی
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


// --- MODULE: src/ui/adminHtml.js ---
// ============================================================================
// miliconfig v3.2 - مرکز کنترل مدیریت پنل
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


// --- MODULE: src/index.js ---
// ============================================================================
// miliconfig v3.1 - نقطه ورود اصلی Cloudflare Workers & Pages
// مجهز به لایه دیتابیس D1، مدیریت چندکاربره، نام‌گذاری number+miliconfig و محافظ ضد خطای 1101
// ============================================================================


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

