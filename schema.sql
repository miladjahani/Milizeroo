-- ============================================================================
-- miliconfig v3.1 - اسکیمای دیتابیس Cloudflare D1
-- توجه: این جداول به صورت ۱۰۰٪ خودکار در زمان اجرا (Auto-Migration) نیز ساخته می‌شوند
-- بنابراین در استقرار دستی یا اتصال مستقیم گیت‌هاب نیازی به اجرای دستی SQL نیست.
-- ============================================================================

CREATE TABLE IF NOT EXISTS system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
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
);

-- استخر پروکسی تأییدشدهٔ هر کشور (تب چندلوکیشن) — خروجی واقعی تست‌شده با trace کلادفلر
CREATE TABLE IF NOT EXISTS country_proxy_pool (
  code TEXT NOT NULL,
  proxy TEXT NOT NULL,
  unverified INTEGER NOT NULL DEFAULT 0,
  checked_at INTEGER NOT NULL,
  PRIMARY KEY (code, proxy)
);

CREATE TABLE IF NOT EXISTS preferred_nodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL DEFAULT 443,
  name TEXT NOT NULL,
  colo TEXT DEFAULT '',
  latency INTEGER DEFAULT 0,
  source TEXT DEFAULT 'manual',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  detail TEXT NOT NULL,
  ip TEXT DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS traffic_hourly (
  hour_key TEXT PRIMARY KEY,
  bytes INTEGER NOT NULL DEFAULT 0,
  requests INTEGER NOT NULL DEFAULT 0
);
