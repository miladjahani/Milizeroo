// ============================================================================
// miliconfig v3.1 - لایه دیتابیس Cloudflare D1 با Auto-Migration،
// محدودیت سقف ۳ کاربر، سیستم رمز عبور مدیر و Fallback هوشمند
// ============================================================================

import {
  BRAND_NAME,
  CONFIG_DEFAULTS,
  DEFAULT_ADMIN_UUID,
  MAX_USERS_LIMIT,
  getEnvConfigSnapshot,
  normalizeEffectiveConfig
} from '../config/defaults.js';
import { buildUserDefaultConfig } from '../config/presets.js';
import { generateShortId, generateUuidV4, isValidUuid, sha256Hex, timingSafeEqualStr } from '../core/utils.js';

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

export function detectD1Binding(env) {
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

export function detectKvBinding(env) {
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

export function getAdminUuid(env = {}) {
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
export async function getOrCreateAdminPath(env = {}) {
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
export async function buildAdminSessionToken(env = {}) {
  const hash = await getAdminPasswordHash(env);
  if (!hash) return '';
  return (await sha256Hex(hash + '::mili-session::v1')).slice(0, 40);
}

export async function verifyAdminSession(env = {}, token = '') {
  const clean = String(token || '').trim();
  if (!clean) return false;
  const expected = await buildAdminSessionToken(env);
  return Boolean(expected) && timingSafeEqualStr(clean, expected);
}

// چرخش مسیر مدیریت: تولید UUID جدید و ذخیره آن (امکان تغییر مسیر در هر زمان)
export async function rotateAdminPath(env = {}) {
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
export async function verifyConfigInD1(env = {}, keys = []) {
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

export async function ensureD1Schema(env = {}, force = false) {
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
export async function getAdminPasswordHash(env = {}) {
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

export async function hasAdminPassword(env = {}) {
  const hash = await getAdminPasswordHash(env);
  return Boolean(hash && hash.length > 0);
}

export async function setAdminPassword(env = {}, plainPassword, clientIp = '') {
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

export async function verifyAdminPassword(env = {}, candidatePassword) {
  const cleanPass = String(candidatePassword || '').trim();
  if (!cleanPass) return false;
  const hash = await getAdminPasswordHash(env);
  if (!hash) return false;
  const candHash = await sha256Hex(cleanPass);
  return timingSafeEqualStr(candHash, hash);
}

export async function changeAdminPassword(env = {}, currentPassword, newPassword, clientIp = '') {
  const isMatch = await verifyAdminPassword(env, currentPassword);
  if (!isMatch) {
    throw new Error('رمز عبور فعلی نادرست است.');
  }
  return await setAdminPassword(env, newPassword, clientIp);
}

// تنظیمات سراسری پنل
// ----------------------------------------------------------------------------
export async function loadGlobalConfig(env = {}, force = false) {
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

export async function saveGlobalConfig(env = {}, newValues = {}) {
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

export async function resetGlobalConfig(env = {}) {
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

export async function loadCountryProxyPool(env = {}, code = '', ttlMs = COUNTRY_POOL_DEFAULT_TTL_MS) {
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

export async function saveCountryProxyPool(env = {}, code = '', entries = []) {
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

export async function listUsers(env = {}) {
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

export async function getUserByIdOrToken(env = {}, token = '') {
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
export async function createUser(env = {}, payload = {}, clientIp = '') {
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

export async function updateUser(env = {}, userId, payload = {}, clientIp = '') {
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

export async function resetUserStats(env = {}, userId, clientIp = '') {
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

export async function deleteUser(env = {}, userId, clientIp = '') {
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

export async function recordUserActivity(env = {}, userId, bytesDelta = 0, reqDelta = 1) {
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

export async function addAuditLog(env = {}, action, detail = '', ip = '') {
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

export async function getAuditLogs(env = {}, limit = 15) {
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

export async function getStorageDiagnostics(env = {}) {
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
