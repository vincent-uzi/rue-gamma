// ─────────────────────────────────────────────────────────────
// Rue gamma — design tokens
// Two directions sharing the same structural system (spacing, radii,
// type scale ramp), differing in tone (silent vs expressive).
// ─────────────────────────────────────────────────────────────

const RG_TOKENS = {
  // shared structure
  space: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 56, 10: 72 },
  radius: { sm: 10, md: 14, lg: 20, xl: 28, pill: 9999 },
  // type ramp (multiplied by tweak factor at runtime)
  type: {
    largeTitle: { size: 34, line: 41, weight: 700, tracking: 0.4 },
    title1:     { size: 28, line: 34, weight: 700, tracking: 0.36 },
    title2:     { size: 22, line: 28, weight: 700, tracking: 0.35 },
    title3:     { size: 20, line: 25, weight: 600, tracking: 0.38 },
    headline:   { size: 17, line: 22, weight: 600, tracking: -0.43 },
    body:       { size: 17, line: 22, weight: 400, tracking: -0.43 },
    callout:    { size: 16, line: 21, weight: 400, tracking: -0.31 },
    subhead:    { size: 15, line: 20, weight: 400, tracking: -0.23 },
    footnote:   { size: 13, line: 18, weight: 400, tracking: -0.08 },
    caption:    { size: 12, line: 16, weight: 400, tracking: 0 },
    micro:      { size: 11, line: 13, weight: 500, tracking: 0.06 },
  },

  // ── Direction A · Silencieux ─────────────────────────────
  // Off-whites with a hint of warm gray. Single muted moss accent.
  // Glass is barely there. CO₂ shown as monochrome jauge.
  silent: {
    name: 'Silencieux',
    bg:        '#F4F3EF',     // warm off-white (slight green-cream cast)
    surface:   '#FFFFFF',
    surfaceAlt:'#FAF9F5',
    line:      'rgba(60,60,67,0.10)',
    text:      '#1A1A1C',
    textMuted: 'rgba(60,60,67,0.62)',
    textDim:   'rgba(60,60,67,0.38)',
    accent:    '#3D5C3A',      // moss
    accentInk: '#FFFFFF',
    accentSoft:'#E5EAE2',
    success:   '#3D5C3A',
    warn:      '#8C6A1F',
    danger:    '#A14545',
    glassBg:   'rgba(255,255,255,0.55)',
    glassBlur: 18,
    statusDot: { available: '#3D5C3A', borrowed: 'rgba(60,60,67,0.45)' },
  },

  // ── Direction A' · Silencieux fond blanc ─────────────────
  silentWhite: {
    name: 'Silencieux · blanc',
    bg:        '#FFFFFF',
    surface:   '#FFFFFF',
    surfaceAlt:'#F7F7F5',
    line:      'rgba(60,60,67,0.12)',
    text:      '#1A1A1C',
    textMuted: 'rgba(60,60,67,0.62)',
    textDim:   'rgba(60,60,67,0.38)',
    accent:    '#1F9D55',  // vert chlorophylle vif (CTA + tab active)
    accentInk: '#FFFFFF',
    accentSoft:'#E5EAE2',
    success:   '#3D5C3A',
    warn:      '#8C6A1F',
    danger:    '#A14545',
    glassBg:   'rgba(255,255,255,0.65)',
    glassBlur: 18,
    statusDot: { available: '#3D5C3A', borrowed: 'rgba(60,60,67,0.45)' },
  },

  // ── Direction B · Expressif ──────────────────────────────
  // Soft cream with terracotta accent + chalkboard green. More color
  // surfaces, illustrated CO₂ jauge, hand-drawn feel.
  warm: {
    name: 'Chaleureux',
    bg:        '#F2EBDC',     // cream
    surface:   '#FFFAF0',
    surfaceAlt:'#EDE3CF',
    line:      'rgba(80,55,30,0.14)',
    text:      '#2B1F12',
    textMuted: 'rgba(80,55,30,0.62)',
    textDim:   'rgba(80,55,30,0.40)',
    accent:    '#C25A3A',      // terracotta
    accentInk: '#FFFAF0',
    accentSoft:'#F4D8C5',
    success:   '#3F6B3D',
    warn:      '#B07A1E',
    danger:    '#A14545',
    glassBg:   'rgba(255,250,240,0.6)',
    glassBlur: 14,
    statusDot: { available: '#3F6B3D', borrowed: 'rgba(80,55,30,0.40)' },
  },
};

window.RG_TOKENS = RG_TOKENS;

// helper: pick a typography style and apply tweak scale
function rgType(key, scale = 1) {
  const t = RG_TOKENS.type[key];
  return {
    fontSize: t.size * scale,
    lineHeight: (t.line * scale) + 'px',
    fontWeight: t.weight,
    letterSpacing: t.tracking,
    fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
  };
}
window.rgType = rgType;
