// ============================================================================
// Shadowsocks AEAD (SIP004) — پیاده‌سازی سبک برای aes-128-gcm / aes-256-gcm
// رمزنگاری واقعی سمت سرور تا نودهای ss:// در همهٔ کلاینت‌ها (v2rayNG،
// NekoBox، sing-box، Clash Meta، Shadowrocket) واقعاً پینگ بدهند.
// کلید اصلی با EVP_BytesToKey/MD5 و کلید هر جهت با HKDF-SHA1 ساخته می‌شود.
// ============================================================================

import { getRandomBytesSafe, getSafeCrypto, md5Hex } from './utils.js';

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

export class SsAeadSession {
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
