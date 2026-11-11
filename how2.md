# استقرار بدون خطای ۱۱۰۱ (روش آزموده‌شدهٔ این پروژه)

این رویه دقیقاً همان ترتیبی است که در این مخزن جواب می‌دهد. کلیدهای حساس را داخل فایل نگذارید؛ از متغیر محیطی استفاده کنید.

```bash
export CF_API_TOKEN="<توکن کلادفلر با دسترسی Workers Scripts>"
export CF_ACCOUNT_ID="<ACCOUNT_ID>"
export WORKER_NAME="<نام ورکر>"
export D1_ID="<D1_DATABASE_ID>"
```

---

## گام ۱ — ساخت باندل

```bash
node scripts/build.js
```

خروجی باید چیزی شبیه این باشد:

```
✅ [miliconfig] بیلد و مبهم‌سازی با موفقیت کامل شد! حجم باندل مبهم‌شده: ~720 KB
```

اگر خطا داد، همان‌جا متوقف شوید؛ استقرار باندل ناقص، همیشه ۱۱۰۱ می‌دهد.

بررسی سینتکس:

```bash
node --check _worker.js
```

## گام ۲ — ساخت پوشهٔ استقرار

```bash
mkdir -p .deploy
cp _worker.js .deploy/main.js
cat > .deploy/meta.json <<JSON
{
  "main_module": "main.js",
  "compatibility_date": "2024-11-06",
  "bindings": [
    { "type": "d1", "name": "DB", "id": "${D1_ID}" }
  ]
}
JSON
```

> `bindings` را جا نیندازید. بدون آن، پنل بعد از استقرار خالی یا ۱۱۰۱ می‌شود.

## گام ۳ — حذف نسخهٔ قبلی (کلید جلوگیری از ۱۱۰۱)

```bash
curl -s -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$WORKER_NAME" \
  -H "Authorization: Bearer $CF_API_TOKEN"
sleep 3
```

## گام ۴ — آپلود نسخهٔ تازه

```bash
curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$WORKER_NAME" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -F "metadata=@.deploy/meta.json;type=application/json" \
  -F "main.js=@.deploy/main.js;type=application/javascript+module" \
  | grep -o '"success": *[a-z]*'
```

باید `"success": true` ببینید.

## گام ۵ — فعال‌سازی آدرس workers.dev

```bash
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$WORKER_NAME/subdomain" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enabled":true,"previews_enabled":false}'
```

## گام ۶ — صبر کوتاه و تست دود

```bash
sleep 10
BASE="https://$WORKER_NAME.<subdomain>.workers.dev"

for p in / /manifest.webmanifest /sw.js /pwa-icon.svg; do
  curl -s -o /dev/null -w "$p %{http_code}\n" "$BASE$p"
done
```

همه باید ۲۰۰ باشند. اگر `/` عدد ۵ را برگرداند (`hello`)، یعنی هندلر خطا فعال شده؛ به `how.md` بخش «روش سریع پیدا کردن علت» بروید.

تست ساب‌لینک کاربر (توکن = UUID کاربر):

```bash
curl -s -o /dev/null -w "sub %{http_code}\n" "$BASE/sub/<UUID>"
```

## گام ۷ — پاک‌سازی

```bash
rm -rf .deploy
```

---

## رویهٔ جایگزین با Wrangler

اگر `wrangler.toml` دارید و ترجیح می‌دهید با CLI کار کنید:

```bash
npx wrangler deploy _worker.js --name "$WORKER_NAME"
```

و در `wrangler.toml`:

```toml
name = "miliconfig"
main = "_worker.js"
compatibility_date = "2024-11-06"

[[d1_databases]]
binding = "DB"
database_name = "miliconfig"
database_id = "<D1_DATABASE_ID>"
```

اگر Wrangler هم بعد از استقرار ۱۱۰۱ داد، یک بار `npx wrangler delete --name "$WORKER_NAME"` و بعد `deploy` بزنید (همان منطق DELETE + PUT).

---

## بازگشت سریع (Rollback)

قبل از هر استقرار، نسخهٔ سالم را نگه دارید:

```bash
cp _worker.js _worker.backup.js
```

اگر نسخهٔ تازه خراب بود، همان نسخهٔ پشتیبان را با گام ۳ و ۴ آپلود کنید. چون باندل مستقل است، rollback فقط چند ثانیه طول می‌کشد.

---

## چک‌لیست نهایی استقرار

- [ ] `node scripts/build.js` بدون خطا
- [ ] `node --check _worker.js`
- [ ] `meta.json` با بایندینگ `DB`
- [ ] DELETE قبل از PUT
- [ ] فعال‌سازی subdomain
- [ ] `/`، `/manifest.webmanifest`، `/admin`، `/sub/<UUID>` همه ۲۰۰
- [ ] حداقل یک ساب‌لینک در کلاینت ایمپورت و حداقل یک نود واقعی تست شد
