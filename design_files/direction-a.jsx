// ─────────────────────────────────────────────────────────────
// Direction A · Silencieux
// Tone: ultra-minimal, neutral warm grays, single moss accent.
// CO₂ visualized as a clean monochrome ring, no decoration.
// ─────────────────────────────────────────────────────────────
const T_A = window.RG_TOKENS.silent;

// Common chrome (status bar + home indicator) for embedded screens
function MemberPillA({ name, no }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 8px 2px 4px', borderRadius: 9999,
      background: T_A.surface, border: `0.5px solid ${T_A.line}`,
      color: T_A.text, fontSize: 11, fontWeight: 500, lineHeight: 1.3,
    }}>
      <span style={{
        width: 16, height: 16, borderRadius: 8,
        background: T_A.accentSoft, color: T_A.accent,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 700, letterSpacing: 0,
      }}>{name.charAt(0)}</span>
      <span>{name} · n°{no}</span>
    </span>
  );
}

function ChromeA({ children, scale = 1 }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: T_A.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
      color: T_A.text,
      WebkitFontSmoothing: 'antialiased'
    }}>
      <StatusBarA />
      <div style={{ position: 'absolute', inset: '54px 0 32px', overflow: 'hidden' }}>{children}</div>
      <HomeIndicatorA />
    </div>);

}

function StatusBarA() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '21px 28px 0', boxSizing: 'border-box', zIndex: 20
    }}>
      <span style={{ ...rgType('headline'), fontWeight: 600 }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6.5" width="2.8" height="4" rx="0.5" fill={T_A.text} /><rect x="4.2" y="4.5" width="2.8" height="6" rx="0.5" fill={T_A.text} /><rect x="8.4" y="2.5" width="2.8" height="8" rx="0.5" fill={T_A.text} /><rect x="12.6" y="0" width="2.8" height="10.5" rx="0.5" fill={T_A.text} /></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={T_A.text} strokeOpacity="0.4" fill="none" /><rect x="2" y="2" width="17" height="7" rx="1.5" fill={T_A.text} /><path d="M22 3.5v4c.7-.2 1.3-.9 1.3-2s-.6-1.8-1.3-2z" fill={T_A.text} fillOpacity="0.45" /></svg>
      </div>
      {/* dynamic island */}
      <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 32, borderRadius: 20, background: '#000' }} />
    </div>);

}

function HomeIndicatorA() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8, zIndex: 20
    }}>
      <div style={{ width: 124, height: 4.5, borderRadius: 100, background: 'rgba(0,0,0,0.22)' }} />
    </div>);

}

// CO₂ Ring (monochrome, silent)
function CO2RingA({ kg = 47.2, level = 3, max = 5, size = 168 }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, level / max);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T_A.line} strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T_A.accent} strokeWidth="3"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 1 }}>CO₂ évité</div>
        <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: -0.5, color: T_A.text, fontFeatureSettings: '"tnum"' }}>{kg.toFixed(1)}</div>
        <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>kg</div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Screen 1 · Accueil
// ─────────────────────────────────────────────────────────────
function HomeA() {
  const items = [
  { name: 'Perceuse Bosch', cat: 'Outils', who: 'Marc', no: '14', state: 'available' },
  { name: 'Échelle 3 m', cat: 'Outils', who: 'Sophie', no: '22', state: 'borrowed' },
  { name: 'Sorbetière', cat: 'Cuisine', who: 'Léa', no: '8', state: 'available' },
  { name: 'Tente 4 places', cat: 'Camping', who: 'Karim', no: '31', state: 'available' },
  { name: 'Vidéoprojecteur', cat: 'Multimédia', who: 'Anouk', no: '5', state: 'borrowed' }];

  return (
    <ChromeA>
      <div style={{ padding: '12px 20px 100px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
        {/* community header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 0.1, marginBottom: 4 }}>Ma rue</div>
            <div style={{ ...rgType('largeTitle'), color: T_A.text }}>Rue des Vignoles</div>
            <div style={{ ...rgType('subhead'), color: T_A.textMuted, marginTop: 4 }}>34 voisins · 142 objets</div>
          </div>
          <div style={{ ...{
              width: 40, height: 40, borderRadius: 20, background: T_A.surface,
              border: `1px solid ${T_A.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.text
            }, border: "1px solid rgb(30, 156, 85)" }}>
            <RGIcon.share size={18} w={1.5} />
          </div>
        </div>

        {/* search */}
        <div style={{ ...{
            display: 'flex', alignItems: 'center', gap: 10,
            background: T_A.surface, border: `1px solid ${T_A.line}`,
            borderRadius: 14, padding: '12px 14px', marginBottom: 26,
            color: T_A.textMuted
          }, border: "1px solid rgb(30, 156, 85)" }}>
          <RGIcon.search size={18} w={1.6} />
          <span style={{ ...rgType('body') }}>Rechercher un objet</span>
        </div>

        {/* CO2 strip */}
        <div style={{
          background: T_A.surface, border: `1px solid ${T_A.line}`,
          borderRadius: 18, padding: '16px 18px', marginBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 1 }}>La rue ce mois-ci</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 600, color: T_A.text, letterSpacing: -0.5, fontFeatureSettings: '"tnum"' }}>312</span>
              <span style={{ ...rgType('callout'), color: T_A.textMuted }}>kg CO₂ évités</span>
            </div>
          </div>
          {/* mini bar viz */}
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 36 }}>
            {[18, 32, 22, 41, 28, 36, 30].map((h, i) =>
            <div key={i} style={{ width: 6, height: h, borderRadius: 2, background: i === 6 ? T_A.accent : T_A.line }} />
            )}
          </div>
        </div>

        {/* recent items header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ ...rgType('title3'), color: T_A.text }}>Récemment ajoutés</div>
          <div style={{ ...rgType('subhead'), color: T_A.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
            Tout voir <RGIcon.chev size={9} color={T_A.accent} w={2} />
          </div>
        </div>

        {/* list */}
        <div style={{ background: T_A.surface, border: `1px solid ${T_A.line}`, borderRadius: 16, overflow: 'hidden' }}>
          {items.map((it, i) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', padding: '14px 16px',
            borderBottom: i < items.length - 1 ? `0.5px solid ${T_A.line}` : 'none'
          }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...rgType('headline'), color: T_A.text, marginBottom: 4 }}>{it.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...rgType('footnote'), color: T_A.textMuted }}>
                  <span>{it.cat}</span>
                  <span>·</span>
                  <MemberPillA name={it.who} no={it.no}/>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: T_A.statusDot[it.state] }} />
                {it.state === 'available' && (
                  <div style={{
                    background: T_A.accentSoft, color: T_A.accent,
                    borderRadius: 9999, fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', border: 'none', cursor: 'pointer'
                  }}>Emprunter</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom tab bar */}
      <BottomTabA active="home" />
    </ChromeA>);

}

function BottomTabA({ active = 'home', exchanges = 2 }) {
  const tab = (key, icon, label, badge = 0) => {
    const on = active === key;
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        color: on ? T_A.accent : T_A.textMuted
      }}>
        <div style={{ position: 'relative' }}>
          {icon}
          {badge > 0 && (
            <div style={{
              position: 'absolute', top: -4, right: -6,
              background: '#FF3B30', color: '#fff',
              borderRadius: 9999, minWidth: 15, height: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, padding: '0 3px', lineHeight: 1
            }}>{badge}</div>
          )}
        </div>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 0.1 }}>{label}</div>
      </div>);

  };
  return (
    <div style={{
      position: 'absolute', bottom: 32, left: 12, right: 12,
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      border: `1px solid ${T_A.line}`, borderRadius: 22, padding: '10px 8px 12px',
      display: 'flex', zIndex: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>
      {tab('home', <RGIcon.home size={20} color={active === 'home' ? T_A.accent : T_A.textMuted} w={1.6} />, 'Accueil')}
      {tab('add', <RGIcon.plus size={20} color={active === 'add' ? T_A.accent : T_A.textMuted} w={1.8} />, 'Ajouter')}
      {tab('exchanges', <RGIcon.swap size={20} color={active === 'exchanges' ? T_A.accent : T_A.textMuted} w={1.6} />, 'Échanges', exchanges)}
      {tab('profile', <RGIcon.user size={20} color={active === 'profile' ? T_A.accent : T_A.textMuted} w={1.6} />, 'Profil')}
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Screen 2 · SERP (search)
// ─────────────────────────────────────────────────────────────
function SearchA() {
  const recent = ['Perceuse', 'Échelle', 'Robot pâtissier', 'Vidéoprojecteur'];
  const results = [
  { name: 'Perceuse Bosch GSR 12V', cat: 'Outils', who: 'Marc', no: '14', state: 'available', co2: '8,2' },
  { name: 'Perceuse-visseuse Makita', cat: 'Outils', who: 'Élise', no: '9', state: 'borrowed', co2: '8,2' },
  { name: 'Perceuse à colonne', cat: 'Outils', who: 'Tom', no: '27', state: 'available', co2: '12,4' }];

  return (
    <ChromeA>
      <div style={{ padding: '12px 20px 60px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
        {/* search field active */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: T_A.surface, border: `1.5px solid ${T_A.text}`,
            borderRadius: 14, padding: '11px 14px'
          }}>
            <RGIcon.search size={18} w={1.6} color={T_A.text} />
            <span style={{ ...rgType('body'), color: T_A.text, flex: 1 }}>perceu</span>
            <span style={{ display: 'inline-block', width: 1.5, height: 18, background: T_A.text, animation: 'rgblink 1s steps(2) infinite' }} />
          </div>
          <div style={{ ...rgType('body'), color: T_A.accent }}>Annuler</div>
        </div>

        {/* autocomplete */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 0.1, marginBottom: 10 }}>Suggestions</div>
          {['perceuse', 'perceuse à colonne', 'perceuse visseuse'].map((s, i) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderBottom: i < 2 ? `0.5px solid ${T_A.line}` : 'none'
          }}>
              <RGIcon.search size={16} color={T_A.textDim} w={1.5} />
              <span style={{ ...rgType('body'), color: T_A.text }}>{s}</span>
            </div>
          )}
        </div>

        {/* results */}
        <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 0.1, marginBottom: 10 }}>3 résultats</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((r, i) =>
          <div key={i} style={{
            background: T_A.surface, border: `1px solid ${T_A.line}`, borderRadius: 14,
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12
          }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...rgType('headline'), color: T_A.text, marginBottom: 4 }}>{r.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...rgType('footnote'), color: T_A.textMuted }}>
                  <span>{r.cat}</span>
                  <span>·</span>
                  <MemberPillA name={r.who} no={r.no}/>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: T_A.statusDot[r.state] }} />
                  <div style={{ ...rgType('footnote'), color: r.state === 'available' ? T_A.accent : T_A.textMuted }}>
                    {r.state === 'available' ? 'Dispo' : 'Prêté'}
                  </div>
                </div>
                <div style={{ ...rgType('caption'), color: T_A.textMuted, marginTop: 4 }}>−{r.co2} kg CO₂</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes rgblink{50%{opacity:0}}`}</style>
    </ChromeA>);

}

// ─────────────────────────────────────────────────────────────
// Screen 3 · Fiche objet + demande
// ─────────────────────────────────────────────────────────────
function ItemA({ state = 'available' }) {
  return (
    <ChromeA>
      <div style={{ height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: 180 }}>
        {/* hero photo */}
        <div style={{
          position: 'relative', width: '100%', height: 240,
          background: `linear-gradient(160deg, #C8B89A 0%, #A89878 45%, #6E5F4A 100%)`,
          overflow: 'hidden'
        }}>
          {/* photo placeholder pattern */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 75% 70%, rgba(0,0,0,0.18), transparent 50%)`
          }} />
          <div aria-hidden style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 200, height: 130, borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.55)', ...rgType('caption'), letterSpacing: 1
          }}>PHOTO</div>

          {/* nav floating over hero */}
          <div style={{ position: 'absolute', top: 8, left: 0, right: 0, padding: '0 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 44 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18,
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.text }}>
              <RGIcon.back size={11} w={2.2} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 18,
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.text }}>
              <RGIcon.more size={18} w={1.6} />
            </div>
          </div>

          {/* dot pagination */}
          <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 5 }}>
            {[0, 1, 2].map((i) =>
            <div key={i} style={{
              width: i === 0 ? 18 : 5, height: 5, borderRadius: 3,
              background: i === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)'
            }} />
            )}
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          {/* status pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', background: T_A.accentSoft, color: T_A.accent, borderRadius: 9999, ...rgType('caption'), fontWeight: 600 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: T_A.accent }} />
            DISPONIBLE
          </div>

          {/* title */}
          <div style={{ ...rgType('largeTitle'), color: T_A.text, marginTop: 14, lineHeight: '40px' }}>Perceuse Bosch<br />GSR 12V</div>

          {/* category */}
          <div style={{ ...rgType('callout'), color: T_A.textMuted, marginTop: 8 }}>Outils · catégorie ADEME 04</div>

          {/* CO2 callout */}
          <div style={{
            marginTop: 22, background: T_A.surface, border: `1px solid ${T_A.line}`, borderRadius: 16,
            padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: T_A.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.accent }}>
              <RGIcon.leaf size={20} w={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...rgType('headline'), color: T_A.text }}>−8,2 kg CO₂</div>
              <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>évités si vous l'empruntez</div>
            </div>
          </div>

          {/* description */}
          <div style={{ marginTop: 26 }}>
            <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 0.1, marginBottom: 8 }}>Description</div>
            <div style={{ ...rgType('body'), color: T_A.text, textWrap: 'pretty' }}>
              Perceuse-visseuse 12V avec deux batteries et chargeur. Mèches dans la mallette. Bon état général, peu utilisée.
            </div>
          </div>

          {/* owner */}
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: T_A.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rgType('headline'), color: T_A.accent }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ ...rgType('headline'), color: T_A.text }}>Marc</div>
              <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>n°14 · membre depuis mars</div>
            </div>
          </div>
        </div>
      </div>

      {/* sticky action */}
      <div style={{
        position: 'absolute', bottom: 32, left: 0, right: 0, padding: '40px 20px 12px',
        background: `linear-gradient(to top, ${T_A.bg} 55%, ${T_A.bg}E6 80%, ${T_A.bg}00)`, zIndex: 10,
        pointerEvents: 'none'
      }}>
        {state === 'available' ? (
          <button style={{
            width: '100%', height: 54, borderRadius: 16, border: 'none',
            background: T_A.accent, color: T_A.accentInk, ...rgType('headline'),
            fontWeight: 600, letterSpacing: -0.2, cursor: 'pointer', pointerEvents: 'auto'
          }}>Demander à emprunter</button>
        ) : (
          <div style={{
            textAlign: 'center', color: T_A.textMuted, ...rgType('body'),
            pointerEvents: 'auto'
          }}>Objet indisponible</div>
        )}
      </div>
    </ChromeA>);

}

// ─────────────────────────────────────────────────────────────
// Screen 4 · Profil + niveau CO₂
// ─────────────────────────────────────────────────────────────
function ProfileA() {
  const myItems = [
  { name: 'Robot Kitchenaid', state: 'borrowed' },
  { name: 'Sorbetière', state: 'available' },
  { name: 'Pierrade', state: 'available' },
  { name: 'Tente 2 places', state: 'available' }];

  return (
    <ChromeA>
      <div style={{ padding: '8px 20px 100px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
        {/* nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 44 }}>
          <div style={{ ...rgType('headline'), color: T_A.text }}>Profil</div>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: T_A.surface, border: `1px solid ${T_A.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.text }}>
            <RGIcon.more size={18} w={1.6} />
          </div>
        </div>

        {/* identity */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: T_A.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.accent, fontSize: 22, fontWeight: 600 }}>L</div>
          <div>
            <div style={{ ...rgType('title2'), color: T_A.text }}>Léa Mercier</div>
            <div style={{ ...rgType('subhead'), color: T_A.textMuted }}>n°8 · Rue des Vignoles</div>
          </div>
        </div>

        {/* CO2 ring */}
        <div style={{
          marginTop: 28, background: T_A.surface, border: `1px solid ${T_A.line}`,
          borderRadius: 22, padding: '24px 20px',
          display: 'flex', alignItems: 'center', gap: 22
        }}>
          <CO2RingA kg={47.2} level={3} max={5} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...rgType('caption'), color: T_A.textMuted, letterSpacing: 0.1, marginBottom: 6 }}>Niveau 3</div>
            <div style={{ ...rgType('title3'), color: T_A.text, marginBottom: 6 }}>Voisin·e engagé·e</div>
            <div style={{ ...rgType('footnote'), color: T_A.textMuted, lineHeight: '17px' }}>3 prêts pour atteindre niveau 4</div>
            {/* progress bar */}
            <div style={{ marginTop: 12, height: 4, background: T_A.line, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', background: T_A.accent }} />
            </div>
          </div>
        </div>

        {/* stats */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[
          { v: '12', l: 'objets' },
          { v: '23', l: 'prêts' },
          { v: '4', l: 'badges' }].
          map((s, i) =>
          <div key={i} style={{ flex: 1, background: T_A.surface, border: `1px solid ${T_A.line}`, borderRadius: 14, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: T_A.text, fontFeatureSettings: '"tnum"' }}>{s.v}</div>
              <div style={{ ...rgType('caption'), color: T_A.textMuted, marginTop: 2 }}>{s.l}</div>
            </div>
          )}
        </div>

        {/* items */}
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ ...rgType('title3'), color: T_A.text }}>Mes objets</div>
          <div style={{ ...rgType('subhead'), color: T_A.accent }}>+ Ajouter</div>
        </div>
        <div style={{ background: T_A.surface, border: `1px solid ${T_A.line}`, borderRadius: 16, overflow: 'hidden' }}>
          {myItems.map((it, i) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', padding: '13px 16px',
            borderBottom: i < myItems.length - 1 ? `0.5px solid ${T_A.line}` : 'none'
          }}>
              <div style={{ ...rgType('body'), color: T_A.text, flex: 1 }}>{it.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: T_A.statusDot[it.state] }} />
                {it.state === 'available' && (
                  <div style={{
                    background: T_A.accentSoft, color: T_A.accent,
                    borderRadius: 9999, fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', border: 'none', cursor: 'pointer'
                  }}>Emprunter</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomTabA active="profile" />
    </ChromeA>);

}

// ─────────────────────────────────────────────────────────────
// Screen 5 · Notification de retard (modal sheet)
// ─────────────────────────────────────────────────────────────
function NotifLateA() {
  return (
    <ChromeA>
      {/* dimmed background ghost of home */}
      <div style={{ padding: '12px 20px', height: '100%', boxSizing: 'border-box', filter: 'blur(2px) saturate(.6) opacity(.6)', pointerEvents: 'none' }}>
        <div style={{ ...rgType('largeTitle'), color: T_A.text, opacity: .4 }}>Rue des Vignoles</div>
        <div style={{ marginTop: 22, height: 60, background: T_A.surface, borderRadius: 14, opacity: .5 }} />
        <div style={{ marginTop: 16, height: 80, background: T_A.surface, borderRadius: 16, opacity: .5 }} />
      </div>

      {/* persistent banner top */}
      <div style={{
        position: 'absolute', top: 0, left: 12, right: 12,
        background: T_A.surface, border: `1px solid ${T_A.line}`,
        borderRadius: 16, padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        zIndex: 30
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: T_A.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.accent }}>
          <RGIcon.clock size={16} w={1.6} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...rgType('subhead'), fontWeight: 600, color: T_A.text }}>Retour en retard</div>
          <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>Sorbetière chez Karim · 3 jours</div>
        </div>
        <RGIcon.chev size={9} color={T_A.textDim} w={2} />
      </div>

      {/* bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: T_A.surface, borderRadius: '24px 24px 0 0',
        padding: '12px 20px 44px', zIndex: 40,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.12)'
      }}>
        <div style={{ width: 36, height: 4, background: T_A.line, borderRadius: 2, margin: '0 auto 18px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: T_A.warn, marginBottom: 14 }}>
          <RGIcon.clock size={16} w={1.7} />
          <span style={{ ...rgType('caption'), letterSpacing: 0.1, fontWeight: 600 }}>Retour prévu il y a 3 jours</span>
        </div>

        <div style={{ ...rgType('title2'), color: T_A.text, marginBottom: 8, lineHeight: '28px' }}>
          La sorbetière est toujours chez vous ?
        </div>
        <div style={{ ...rgType('body'), color: T_A.textMuted, marginBottom: 22 }}>
          Karim attend pour la reprendre. Donnez-lui une nouvelle date ou organisez le retour.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{
            height: 50, borderRadius: 14, border: 'none',
            background: T_A.accent, color: T_A.accentInk, ...rgType('headline'), fontWeight: 600, cursor: 'pointer'
          }}>Je rends aujourd'hui</button>
          <button style={{
            height: 50, borderRadius: 14, border: `1px solid ${T_A.line}`,
            background: T_A.surface, color: T_A.text, ...rgType('headline'), fontWeight: 600, cursor: 'pointer'
          }}>Décaler le retour</button>
          <button style={{
            height: 44, borderRadius: 14, border: 'none', background: 'transparent',
            color: T_A.textMuted, ...rgType('subhead'), cursor: 'pointer'
          }}>Envoyer un message à Karim</button>
        </div>
      </div>
    </ChromeA>);

}

// ─────────────────────────────────────────────────────────────
// Screen 6 · Alerte dispo activée
// ─────────────────────────────────────────────────────────────
function NotifAlertA() {
  return (
    <ChromeA>
      <div style={{ padding: '8px 20px 60px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 44 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: T_A.surface, border: `1px solid ${T_A.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.text }}>
            <RGIcon.back size={11} w={2.2} />
          </div>
        </div>

        {/* status pill */}
        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', background: 'rgba(60,60,67,0.08)', color: T_A.textMuted, borderRadius: 9999, ...rgType('caption'), fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: T_A.textMuted }} />
          PRÊTÉE
        </div>

        <div style={{ ...rgType('largeTitle'), color: T_A.text, marginTop: 14, lineHeight: '40px' }}>Échelle 3 m</div>
        <div style={{ ...rgType('callout'), color: T_A.textMuted, marginTop: 8 }}>Outils · chez Sophie n°22</div>

        {/* alert toggled card */}
        <div style={{
          marginTop: 26, background: T_A.surface, border: `1.5px solid ${T_A.accent}`, borderRadius: 18,
          padding: '18px 18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: T_A.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T_A.accent }}>
              <RGIcon.bell size={18} w={1.6} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...rgType('headline'), color: T_A.text }}>Alerte activée</div>
              <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>Vous serez notifié·e dès retour</div>
            </div>
            {/* toggle */}
            <div style={{ width: 50, height: 30, borderRadius: 15, background: T_A.accent, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, right: 2, width: 26, height: 26, borderRadius: 13, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
            </div>
          </div>
          <div style={{ ...rgType('footnote'), color: T_A.textMuted, paddingTop: 12, borderTop: `0.5px solid ${T_A.line}` }}>
            Sophie a indiqué un retour pour le <span style={{ color: T_A.text, fontWeight: 600 }}>lun. 12 mai</span>.
          </div>
        </div>

        {/* queue info */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: T_A.surfaceAlt, borderRadius: 12 }}>
          <RGIcon.alert size={16} color={T_A.textMuted} w={1.6} />
          <div style={{ ...rgType('footnote'), color: T_A.textMuted }}>2 voisins attendent aussi cet objet</div>
        </div>

        {/* CO2 */}
        <div style={{ marginTop: 22, padding: '14px 16px', borderRadius: 14, background: T_A.surface, border: `1px solid ${T_A.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <RGIcon.leaf size={18} color={T_A.accent} w={1.5} />
          <div style={{ ...rgType('subhead'), color: T_A.text, flex: 1 }}>Empruntée plutôt qu'achetée :</div>
          <div style={{ ...rgType('headline'), color: T_A.accent, fontWeight: 600 }}>−14 kg CO₂</div>
        </div>
      </div>
    </ChromeA>);

}

// ─────────────────────────────────────────────────────────────
// Screen 7 · Confirmation ajout d'objet
// Bottom-sheet de remerciement après publication d'un objet.
// Halo accent autour d'un picto leaf, titre gentil, CO₂ projeté en accent,
// CTA "Voir mon objet" + lien secondaire "Ajouter un autre".
// ─────────────────────────────────────────────────────────────
function ConfirmAddA() {
  return (
    <ChromeA>
      {/* faded ghost of "Mes objets" behind the sheet */}
      <div style={{ padding: '12px 20px', height: '100%', boxSizing: 'border-box', filter: 'blur(3px) saturate(.55) opacity(.5)', pointerEvents: 'none' }}>
        <div style={{ ...rgType('largeTitle'), color: T_A.text, opacity: .4 }}>Mes objets</div>
        <div style={{ marginTop: 22, height: 64, background: T_A.surface, borderRadius: 14, opacity: .6 }} />
        <div style={{ marginTop: 10, height: 64, background: T_A.surface, borderRadius: 14, opacity: .55 }} />
        <div style={{ marginTop: 10, height: 64, background: T_A.surface, borderRadius: 14, opacity: .5 }} />
      </div>

      {/* bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: T_A.surface, borderRadius: '24px 24px 0 0',
        padding: '14px 24px 40px', zIndex: 40,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.14)'
      }}>
        {/* close X */}
        <button aria-label="Fermer" style={{
          position: 'absolute', top: 16, right: 16,
          width: 32, height: 32, borderRadius: 16,
          background: T_A.surfaceAlt, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: T_A.textMuted, cursor: 'pointer', padding: 0,
        }}>
          <RGIcon.close size={12} w={2} />
        </button>

        <div style={{ width: 36, height: 4, background: T_A.line, borderRadius: 2, margin: '0 auto 28px' }} />

        {/* icon + halo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 44,
            background: T_A.accentSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            {/* outer halo ring */}
            <div style={{
              position: 'absolute', inset: -10, borderRadius: 54,
              border: `1px solid ${T_A.accent}`, opacity: .18,
            }} />
            <div style={{
              position: 'absolute', inset: -22, borderRadius: 66,
              border: `1px solid ${T_A.accent}`, opacity: .08,
            }} />
            <RGIcon.leaf size={36} color={T_A.accent} w={1.4} />
          </div>
        </div>

        {/* title */}
        <div style={{
          ...rgType('title2'), color: T_A.text, textAlign: 'center',
          marginBottom: 12, lineHeight: '30px', textWrap: 'balance',
        }}>
          Merci, votre objet fera des heureux !
        </div>

        {/* subtitle with highlighted CO₂ */}
        <div style={{
          ...rgType('callout'), color: T_A.textMuted, textAlign: 'center',
          marginBottom: 30, lineHeight: '22px', maxWidth: 280, marginLeft: 'auto', marginRight: 'auto',
        }}>
          À chaque emprunt, il économisera{' '}
          <span style={{ color: T_A.accent, fontWeight: 600, whiteSpace: 'nowrap' }}>
            8,2 kg de CO₂
          </span>
        </div>

        {/* primary CTA */}
        <button style={{
          width: '100%', height: 52, borderRadius: 16, border: 'none',
          background: T_A.accent, color: T_A.accentInk,
          ...rgType('headline'), fontWeight: 600, cursor: 'pointer',
          marginBottom: 8,
        }}>
          Voir mon objet
        </button>

        {/* secondary link */}
        <button style={{
          width: '100%', height: 44, borderRadius: 14, border: 'none',
          background: 'transparent', color: T_A.text,
          ...rgType('subhead'), fontWeight: 500, cursor: 'pointer',
        }}>
          Ajouter un autre objet
        </button>
      </div>
    </ChromeA>);

}