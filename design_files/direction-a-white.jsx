// Direction A — variante fond blanc (A')
// Réutilise les composants de direction-a.jsx puis swappe les couleurs
// via un walker DOM post-render (les sélecteurs d'attributs ne matchent
// pas car React sérialise les hex en rgb()).
const _silent = window.RG_TOKENS.silent;
const _silentW = window.RG_TOKENS.silentWhite;

// Hex -> rgb string for matching computed values
const _hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const _swaps = [
  { from: _hexToRgb(_silent.bg),         to: _silentW.bg },         // #F4F3EF -> #FFFFFF
  { from: _hexToRgb(_silent.surfaceAlt), to: _silentW.surfaceAlt }, // #FAF9F5 -> #F7F7F5
  { from: _hexToRgb(_silent.accent),     to: _silentW.accent },     // moss   -> vert vif (fonds bouton)
];
// Color swaps (text + border) — match by computed color/borderColor
const _colorSwaps = [
  { from: _hexToRgb(_silent.accent), to: _silentW.accent },
];

function WhiteWrap({ children }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const apply = () => {
      const all = ref.current.querySelectorAll('*');
      all.forEach((el) => {
        const cs = getComputedStyle(el);
        // background swap
        const bg = cs.backgroundColor;
        for (const swap of _swaps) {
          if (bg === swap.from) {
            el.style.setProperty('background-color', swap.to, 'important');
            if (el.style.background) {
              el.style.setProperty('background', swap.to, 'important');
            }
            break;
          }
        }
        // text color swap (tab active label, link, etc.)
        const col = cs.color;
        for (const swap of _colorSwaps) {
          if (col === swap.from) {
            el.style.setProperty('color', swap.to, 'important');
            break;
          }
        }
        // svg fill / stroke swap (tab active icon)
        const fill = cs.fill;
        if (fill) {
          for (const swap of _colorSwaps) {
            if (fill === swap.from) {
              el.style.setProperty('fill', swap.to, 'important');
              break;
            }
          }
        }
        const stroke = cs.stroke;
        if (stroke) {
          for (const swap of _colorSwaps) {
            if (stroke === swap.from) {
              el.style.setProperty('stroke', swap.to, 'important');
              break;
            }
          }
        }
        // border color (tab indicator, focus ring)
        const bc = cs.borderTopColor; // assume uniform
        for (const swap of _colorSwaps) {
          if (bc === swap.from) {
            el.style.setProperty('border-color', swap.to, 'important');
            break;
          }
        }
      });
    };
    apply();
    // re-apply on subtree changes (e.g. token updates, lazy children)
    const mo = new MutationObserver(apply);
    mo.observe(ref.current, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    return () => mo.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}

const HomeAWhite      = () => <WhiteWrap><HomeA/></WhiteWrap>;
const SearchAWhite    = () => <WhiteWrap><SearchA/></WhiteWrap>;
const ItemAWhite      = () => <WhiteWrap><ItemA/></WhiteWrap>;
const ProfileAWhite   = () => <WhiteWrap><ProfileA/></WhiteWrap>;
const NotifLateAWhite = () => <WhiteWrap><NotifLateA/></WhiteWrap>;
const NotifAlertAWhite= () => <WhiteWrap><NotifAlertA/></WhiteWrap>;
const ConfirmAddAWhite= () => <WhiteWrap><ConfirmAddA/></WhiteWrap>;

Object.assign(window, {
  HomeAWhite, SearchAWhite, ItemAWhite, ProfileAWhite, NotifLateAWhite, NotifAlertAWhite, ConfirmAddAWhite,
});
