// ─────────────────────────────────────────────────────────────
// Design System overview page — shown as a wide artboard.
// ─────────────────────────────────────────────────────────────
function DesignSystemPage({ direction = 'silent' }) {
  const T = window.RG_TOKENS[direction];
  const isS = direction === 'silent';

  const Section = ({ title, children, sub }) => (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: 0.1, marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ ...rgType('footnote'), color: T.textMuted, marginBottom: 14 }}>{sub}</div>}
      {!sub && <div style={{ marginBottom: 14 }}/>}
      {children}
    </div>
  );

  const Swatch = ({ color, label, value, ink = T.text }) => (
    <div style={{ width: 140 }}>
      <div style={{ width: '100%', height: 80, borderRadius: 12, background: color, border: `1px solid ${T.line}` }}/>
      <div style={{ ...rgType('caption'), color: ink, fontWeight: 600, marginTop: 6 }}>{label}</div>
      <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{value}</div>
    </div>
  );

  const Type = ({ k, label }) => {
    const t = window.RG_TOKENS.type[k];
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '10px 0', borderBottom: `0.5px solid ${T.line}` }}>
        <div style={{ width: 110, ...rgType('caption'), color: T.textMuted, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{k}</div>
        <div style={{ flex: 1, ...rgType(k), color: T.text }}>{label}</div>
        <div style={{ ...rgType('caption'), color: T.textMuted, fontFamily: 'ui-monospace, SFMono-Regular, monospace', minWidth: 80, textAlign: 'right' }}>{t.size}/{t.line} · {t.weight}</div>
      </div>
    );
  };

  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, color: T.text,
      fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif',
      padding: '40px 48px', boxSizing: 'border-box', overflowY: 'auto',
      WebkitFontSmoothing: 'antialiased',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.6 }}>Rue gamma</div>
        <div style={{ fontSize: 14, color: T.textMuted }}>· Design system · Direction {isS ? 'A — Silencieuse' : 'B — Chaleureuse'}</div>
      </div>
      <div style={{ ...rgType('body'), color: T.textMuted, marginBottom: 36, maxWidth: 640, textWrap: 'pretty' }}>
        Système iOS-natif original. Échelle typo SF Pro, espacements 4-pt, surfaces neutres, accent unique.
        Direction A : silencieuse, monochrome, accent moss. Direction B : chaleureuse, illustrée, accent terracotta.
      </div>

      {/* COLORS */}
      <Section title="Couleurs · sémantique">
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Swatch color={T.bg} label="bg" value={T.bg}/>
          <Swatch color={T.surface} label="surface" value={T.surface}/>
          <Swatch color={T.surfaceAlt} label="surfaceAlt" value={T.surfaceAlt}/>
          <Swatch color={T.text} label="text" value={T.text} ink={T.text}/>
          <Swatch color={T.accent} label="accent" value={T.accent}/>
          <Swatch color={T.accentSoft} label="accent soft" value={T.accentSoft}/>
          <Swatch color={T.success} label="success" value={T.success}/>
          <Swatch color={T.warn} label="warn" value={T.warn}/>
          <Swatch color={T.danger} label="danger" value={T.danger}/>
        </div>
      </Section>

      {/* TYPE */}
      <Section title="Typographie · SF Pro" sub="Échelle iOS native, ajustable via le contrôle Tweaks d'échelle.">
        <Type k="largeTitle" label="Rue des Vignoles"/>
        <Type k="title1" label="Perceuse Bosch GSR 12V"/>
        <Type k="title2" label="Voisin·e engagé·e"/>
        <Type k="title3" label="Récemment ajoutés"/>
        <Type k="headline" label="Demander à emprunter"/>
        <Type k="body" label="Marc attend pour la reprendre"/>
        <Type k="callout" label="catégorie ADEME 04"/>
        <Type k="subhead" label="34 voisins · 142 objets"/>
        <Type k="footnote" label="évités si vous l'empruntez"/>
        <Type k="caption" label="DISPONIBLE"/>
      </Section>

      {/* SPACING */}
      <Section title="Espacements · base 4 px">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {Object.entries(window.RG_TOKENS.space).map(([k, v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ width: v, height: v, background: T.accent, borderRadius: 4, marginBottom: 6 }}/>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace' }}>{k} · {v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* RADII */}
      <Section title="Rayons">
        <div style={{ display: 'flex', gap: 18 }}>
          {Object.entries(window.RG_TOKENS.radius).filter(([k]) => k !== 'pill').map(([k, v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: T.surface, border: `1px solid ${T.line}`, borderRadius: v }}/>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>{k} · {v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPONENTS */}
      <Section title="Composants clés">
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* primary button */}
          <div>
            <button style={{
              height: 50, padding: '0 22px', borderRadius: 14, border: 'none',
              background: isS ? T.accent : T.text, color: isS ? T.accentInk : T.surface, ...rgType('headline'), fontWeight: 600, cursor: 'pointer',
            }}>Demander</button>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>btn · primary</div>
          </div>
          {/* secondary */}
          <div>
            <button style={{
              height: 50, padding: '0 22px', borderRadius: 14, border: `1px solid ${T.line}`,
              background: T.surface, color: T.text, ...rgType('headline'), fontWeight: 600, cursor: 'pointer',
            }}>Décaler</button>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>btn · secondary</div>
          </div>
          {/* status pills */}
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', background: isS ? T.accentSoft : '#E5EAD9', color: isS ? T.accent : T.success, borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: isS ? T.accent : T.success }}/>
                DISPO
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', background: 'rgba(60,60,67,0.08)', color: T.textMuted, borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: T.textMuted }}/>
                PRÊTÉ
              </div>
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>status · pill</div>
          </div>
          {/* search */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: '11px 14px', color: T.textMuted, width: 220 }}>
              <RGIcon.search size={16} w={1.6}/>
              <span style={{ ...rgType('body') }}>Chercher</span>
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>field · search</div>
          </div>
          {/* card */}
          <div>
            <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: '12px 14px', width: 220, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: T.accentSoft }}/>
              <div style={{ flex: 1 }}>
                <div style={{ ...rgType('subhead'), fontWeight: 600 }}>Perceuse Bosch</div>
                <div style={{ ...rgType('caption'), color: T.textMuted }}>Outils · Marc</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'ui-monospace, monospace', marginTop: 6 }}>card · item</div>
          </div>
        </div>
      </Section>

      {/* ICONS */}
      <Section title="Icônes" sub="Stroke 1.5–1.8 px, viewBox normalisé. Couleur héritée via currentColor.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, maxWidth: 640 }}>
          {Object.keys(window.RGIcon).map((name) => (
            <div key={name} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '16px 8px', background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12,
              color: T.text,
            }}>
              <div style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {window.RGIcon[name]({ size: 22, w: 1.6 })}
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: 'ui-monospace, monospace' }}>{name}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

window.DesignSystemPage = DesignSystemPage;
