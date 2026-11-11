// ============================================================================
// miliconfig v3.9 - باندلر ماژولار و سازنده خروجی Cloudflare Workers & Pages
// پشتیبانی همزمان از استقرار مستقیم گیت‌هاب در Cloudflare Workers و Cloudflare Pages
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { obfuscateWorkerBundle } from './obfuscate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ترتیب دقیق ماژول‌ها برای باندلینگ یکپارچه بدون وابستگی به باندلر خارجی
const MODULE_ORDER = [
  'src/config/edgeDomains.js',
  'src/config/sources.js',
  'src/config/ipPool.js',
  'src/config/defaults.js',
  'src/config/presets.js',
  'src/ui/pwa.js',
  'src/core/utils.js',
  'src/core/shadowsocksAead.js',
  'src/core/updater.js',
  'src/core/proxyGeo.js',
  'src/core/edgePool.js',
  'src/ui/icons.js',
  'src/db/d1.js',
  'src/subscription/converters.js',
  'src/subscription/generator.js',
  'src/subscription/masqueBundle.js',
  'src/core/runtime.js',
  'src/api/handlers.js',
  'src/ui/loginHtml.js',
  'src/ui/statusHtml.js',
  'src/ui/adminHtml.js',
  'src/index.js'
];

function stripLocalImportsAndExports(code, isEntryPoint = false) {
  const lines = code.split('\n');
  const out = [];
  let skipMultiLineImport = false;
  let skipExportBlock = false;

  for (let line of lines) {
    const trimmed = line.trim();

    if (skipMultiLineImport) {
      if (trimmed.includes('from ') && (trimmed.endsWith(';') || trimmed.endsWith("'") || trimmed.endsWith('"'))) {
        skipMultiLineImport = false;
      }
      continue;
    }

    // بلوک‌های «export { ... }» و «export * from ...» باید کامل حذف شوند؛
    // در غیر این صورت runtime کلادفلر به‌خاطر نام‌های غیرتابعی در namespace ماژول، ورکر را بالا نمی‌آورد.
    if (skipExportBlock) {
      if (trimmed.includes('}')) skipExportBlock = false;
      continue;
    }
    if (/^export\s*\{/.test(trimmed)) {
      if (!trimmed.includes('}')) skipExportBlock = true;
      continue;
    }
    if (/^export\s+\*/.test(trimmed)) {
      continue;
    }

    // نگه داشتن فقط import { connect as cfConnect } from 'cloudflare:sockets'
    if (/^import\s+.*from\s+['"]cloudflare:sockets['"]/.test(trimmed)) {
      continue;
    }

    if (/^import\s+/.test(trimmed)) {
      if (!trimmed.includes('from ')) {
        skipMultiLineImport = true;
      }
      continue;
    }

    if (!isEntryPoint && /^export\s+default\s+/.test(trimmed)) {
      line = line.replace(/^(\s*)export\s+default\s+/, '$1');
    } else if (/^export\s+(async\s+function|function|const|let|var|class)\s+/.test(trimmed)) {
      line = line.replace(/^(\s*)export\s+/, '$1');
    }

    out.push(line);
  }

  return out.join('\n');
}

async function buildAll() {
  console.log('⚡ [miliconfig] در حال ساخت و باندل کردن ماژول‌های پروژه...');

  const chunks = [`import { connect as cfConnect } from 'cloudflare:sockets';\n`];

  for (const relPath of MODULE_ORDER) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`فایل ماژول یافت نشد: ${relPath}`);
    }
    const raw = fs.readFileSync(fullPath, 'utf8');
    const isEntry = relPath === 'src/index.js';
    const cleaned = stripLocalImportsAndExports(raw, isEntry);
    chunks.push(`// --- MODULE: ${relPath} ---\n${cleaned}\n`);
  }

  const rawBundle = chunks.join('\n');

  const distDir = path.join(ROOT_DIR, 'dist');
  const publicDir = path.join(ROOT_DIR, 'public');
  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  // ذخیره نسخه باندل‌شده خوانا جهت دیباگ و بررسی
  fs.writeFileSync(path.join(distDir, 'worker.readable.js'), rawBundle, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, '明文源吗'), rawBundle, 'utf8');

  // اجرای مبهم‌سازی پیشرفته بدون خطای 1101
  console.log('🔒 [miliconfig] در حال اعمال مبهم‌سازی پیشرفته (Advanced Obfuscation)...');
  const obfuscatedCode = await obfuscateWorkerBundle(rawBundle);

  // نوشتن خروجی‌های نهایی برای Cloudflare Workers و Cloudflare Pages
  fs.writeFileSync(path.join(distDir, '_worker.js'), obfuscatedCode, 'utf8');
  fs.writeFileSync(path.join(publicDir, '_worker.js'), obfuscatedCode, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, '_worker.js'), obfuscatedCode, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, '少年你相信光吗'), obfuscatedCode, 'utf8');

  // فایل‌های استاتیک کمکی برای Cloudflare Pages
  const staticAssetsHtml = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>miliconfig</title></head><body>miliconfig Cloudflare Pages Active</body></html>`;
  fs.writeFileSync(path.join(distDir, 'status-static.html'), staticAssetsHtml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'status-static.html'), staticAssetsHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '', 'utf8');

  // سازگاری خودکار با محیط بیلد Cloudflare Pages (تشخیص متغیر CF_PAGES=1)
  if (process.env.CF_PAGES === '1' || process.env.CF_PAGES === 'true') {
    console.log('☁️ [miliconfig] محیط Cloudflare Pages تشخیص داده شد؛ تنظیم خودکار wrangler.toml برای Pages...');
    const pagesWrangler = `name = "miliconfig"
pages_build_output_dir = "dist"
compatibility_date = "2024-11-06"

[vars]
BRAND = "miliconfig"
`;
    fs.writeFileSync(path.join(ROOT_DIR, 'wrangler.toml'), pagesWrangler, 'utf8');
  }

  console.log(`✅ [miliconfig] بیلد و مبهم‌سازی با موفقیت کامل شد! حجم باندل مبهم‌شده: ${(obfuscatedCode.length / 1024).toFixed(1)} KB`);
}

buildAll().catch(err => {
  console.error('❌ خطا در بیلد پروژه:', err);
  process.exit(1);
});
