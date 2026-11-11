// ============================================================================
// miliconfig v3.1 - مجموعه آیکون‌های اختصاصی SVG (بدون هیچ ایموجی)
// تمام آیکون‌ها stroke-based و با currentColor رنگ می‌گیرند.
// ============================================================================

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{200D}]/gu;

export function stripEmoji(text = '') {
  return String(text).replace(EMOJI_RE, '');
}

const wrap = (body, extraClass = '') =>
  `<svg class="mi ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const ICONS = {
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

export function icon(name, extraClass = '') {
  const raw = ICONS[name] || ICONS.dashboard;
  return extraClass ? raw.replace('class="mi ', `class="mi ${extraClass} `) : raw;
}

export const SHIELD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-shield-svg">
  <circle cx="32" cy="32" r="30" fill="#08110b" stroke="#65a30d" stroke-width="1.5" stroke-opacity="0.65"/>
  <circle cx="32" cy="32" r="24" fill="#0c1a12"/>
  <path d="M32 16L44 21.2V30.8C44 39.4 38.88 46.84 32 49.5C25.12 46.84 20 39.4 20 30.8V21.2L32 16Z" stroke="#b5ff4d" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M27.4 31.6L30.8 35L37 28.6" stroke="#b5ff4d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const CLOUD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-cloud-svg">
  <rect x="4" y="4" width="56" height="56" rx="18" fill="#080d09" stroke="#3f6212" stroke-width="1.6"/>
  <path d="M25.5 42H40.5C44.6421 42 48 38.6421 48 34.5C48 30.491 44.8544 27.2165 40.8926 27.0104C39.2471 21.7876 34.3652 18 28.6 18C21.4203 18 15.6 23.8203 15.6 31C15.6 37.0751 20.1249 42 25.5 42Z" stroke="#b5ff4d" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const FAVICON_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#05080a" stroke="#a3e635" stroke-width="3"/><path d="M32 15L45 20.5V30.8C45 39.8 39.5 47.5 32 50.5C24.5 47.5 19 39.8 19 30.8V20.5L32 15Z" fill="none" stroke="#b5ff4d" stroke-width="4" stroke-linejoin="round"/></svg>`
)}`;
