// ─────────────────────────────────────────────────────────────
// Icons — minimal stroke set, no emoji. Reusable across both directions.
// ─────────────────────────────────────────────────────────────
const RGIcon = {
  search: (p = {}) =>
  <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.6} style={{ stroke: "rgb(30, 156, 85)" }} />
      <path d="M14 14l4 4" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.6} strokeLinecap="round" />
    </svg>,

  leaf: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <path d="M15 2.5C9 2.5 3 6 3 12c0 1.5.5 2.8 1.3 3.7C5.2 16.6 6.7 15.5 8 14c2.5-3 5-5 7-7-1 4-3.5 7-6 9" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  bell: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <path d="M3.5 13c0-.5.3-.8.6-1.2.7-.7 1-1.7 1-3.3V7.5c0-2.5 1.7-4.5 4-4.5s4 2 4 4.5v1c0 1.6.3 2.6 1 3.3.3.4.6.7.6 1.2 0 .3-.2.5-.6.5H4.1c-.4 0-.6-.2-.6-.5z" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinejoin="round" />
      <path d="M7.5 15.2c.2.5.8.8 1.5.8s1.3-.3 1.5-.8" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinecap="round" />
    </svg>,

  plus: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <path d="M9 3v12M3 9h12" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.8} strokeLinecap="round" />
    </svg>,

  arrow: (p = {}) =>
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  chev: (p = {}) =>
  <svg width={p.size || 10} height={p.size || 16} viewBox="0 0 10 16" fill="none">
      <path d="M2 2l6 6-6 6" stroke={p.color || 'currentColor'} strokeWidth={p.w || 2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  back: (p = {}) =>
  <svg width={p.size || 12} height={p.size || 20} viewBox="0 0 12 20" fill="none">
      <path d="M10 2L2 10l8 8" stroke={p.color || 'currentColor'} strokeWidth={p.w || 2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  more: (p = {}) =>
  <svg width={p.size || 22} height={p.size || 6} viewBox="0 0 22 6" fill="none">
      <circle cx="3" cy="3" r="2" fill={p.color || 'currentColor'} />
      <circle cx="11" cy="3" r="2" fill={p.color || 'currentColor'} />
      <circle cx="19" cy="3" r="2" fill={p.color || 'currentColor'} />
    </svg>,

  check: (p = {}) =>
  <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5l3 3 6-7" stroke={p.color || 'currentColor'} strokeWidth={p.w || 2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  clock: (p = {}) =>
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <path d="M8 4.5V8l2.5 1.5" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  camera: (p = {}) =>
  <svg width={p.size || 20} height={p.size || 18} viewBox="0 0 20 18" fill="none">
      <path d="M6.4 3.2l.7-1.4c.3-.5.8-.8 1.4-.8h3c.6 0 1.1.3 1.4.8l.7 1.4h2.6c1.1 0 2 .9 2 2v8.4c0 1.1-.9 2-2 2H3.8c-1.1 0-2-.9-2-2V5.2c0-1.1.9-2 2-2h2.6z" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinejoin="round" />
      <circle cx="10" cy="9.6" r="3.2" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <circle cx="15.5" cy="6" r="0.6" fill={p.color || 'currentColor'} />
    </svg>,

  user: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <path d="M3 16c0-3 2.7-5 6-5s6 2 6 5" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinecap="round" />
    </svg>,

  home: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <path d="M2.5 8L9 2.5 15.5 8v6.5c0 .5-.4 1-1 1h-3v-4h-3v4h-3c-.5 0-1-.5-1-1V8z" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinejoin="round" />
    </svg>,

  flame: (p = {}) =>
  <svg width={p.size || 16} height={p.size || 18} viewBox="0 0 16 18" fill="none">
      <path d="M8 1c0 3-3 4-3 7.5 0 2.5 1 4.5 3 6 .5-3 2-4 2-6 0 1.5 2 2 2 4 0 2-1.5 3.5-4 3.5S2 14 2 11C2 6.5 8 5 8 1z" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.4} strokeLinejoin="round" />
    </svg>,

  close: (p = {}) =>
  <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 14 14" fill="none">
      <path d="M3 3l8 8M11 3l-8 8" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.8} strokeLinecap="round" />
    </svg>,

  filter: (p = {}) =>
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M4 8h8M6 12h4" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.6} strokeLinecap="round" />
    </svg>,

  alert: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <path d="M9 5v4.5M9 12.5v.5" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.6} strokeLinecap="round" />
    </svg>,

  share: (p = {}) =>
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 18 18" fill="none">
      <circle cx="14" cy="4" r="2.2" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <circle cx="4" cy="9" r="2.2" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <circle cx="14" cy="14" r="2.2" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} />
      <path d="M6 8l6-3M6 10l6 3" stroke={p.color || 'currentColor'} strokeWidth={p.w || 1.5} strokeLinecap="round" />
    </svg>

};
window.RGIcon = RGIcon;