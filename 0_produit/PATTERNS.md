# FLO — Patterns UI & Charte graphique

---

## Charte graphique

### Couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| Accent principal | `#1F9D55` | CTA, badges, liens actifs |
| Accent clair | `#EAF5EA` | Fond cards, bordures subtiles |
| Orange alerte | `#F39C12` | Nouvelles réponses, animations |
| Rouge badge | `#EF4444` | Badge transactions |
| Fond jaune | `#FFEAA7` | Encarts bouteilles à la mer |
| Texte principal | `#333` | Titres, labels |
| Texte secondaire | `#666` | Sous-titres, descriptions |
| Texte discret | `#999` | Dates, métadonnées |

### Typographie

- Font : `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Titre card : `font-size:15-18px; font-weight:600-700`
- Corps : `font-size:14px; font-weight:400`
- Petit : `font-size:13px; color:#999`

### Espacement & rayon

- Border-radius cards : `12px`
- Border-radius modales : `20px` (floating) ou `24px 24px 0 0` (bottom sheet)
- Border-radius boutons pill : `24px`
- Padding card : `16px`
- Padding modale : `32px 24px`
- Gap liste : `12px`

---

## Composants

### Boutons

```html
<!-- CTA principal (vert) -->
<button style="background:#1F9D55; color:white; border:none; border-radius:24px; padding:14px 24px; font-size:16px; font-weight:600; cursor:pointer;">
  Action
</button>

<!-- Secondaire (outline) -->
<button style="background:white; color:#1F9D55; border:2px solid #1F9D55; border-radius:24px; padding:12px 24px; font-size:15px; font-weight:600; cursor:pointer;">
  Action
</button>

<!-- Destructif -->
<button style="background:white; color:#333; border:1px solid #E5E5E5; border-radius:24px; padding:14px; font-size:15px; font-weight:600; cursor:pointer;">
  Annuler
</button>
```

### Cards

```html
<!-- Card objet liste -->
<div data-item-id="..." style="background:white; border:1px solid #EAF5EA; border-radius:12px; padding:16px; margin-bottom:12px;">
  <!-- contenu -->
</div>

<!-- Card alerte jaune (bouteille) -->
<div style="background:#FFEAA7; border-radius:12px; padding:16px 20px; cursor:pointer;">
  <p style="font-size:14px; font-weight:700; color:#1F9D55; margin-bottom:4px;">Titre</p>
  <p style="font-size:14px; color:#555; margin-bottom:8px;">Sous-titre</p>
  <p style="font-size:14px; color:#1F9D55; text-decoration:underline; font-weight:400; margin:0;">Lien →</p>
</div>

<!-- Card vide (état zéro) -->
<div style="background:white; border:1.5px dashed #CCC; border-radius:12px; padding:24px; text-align:center; color:#999;">
  Message état vide
</div>
```

### Modales

```html
<!-- Bottom sheet -->
<div style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; display:flex; align-items:flex-end; justify-content:center;">
  <div style="background:white; border-radius:24px 24px 0 0; padding:32px 24px; width:100%; max-width:480px; padding-bottom:calc(32px + env(safe-area-inset-bottom));">
    <!-- contenu -->
  </div>
</div>

<!-- Slide depuis droite (pattern thread) -->
<div style="position:fixed; top:0; right:0; bottom:0; width:min(430px,100vw); background:var(--bg,white); z-index:400; transform:translateX(100%); transition:transform 300ms;">
  <!-- contenu -->
</div>
```

### Badges

```css
/* Tab badge (transactions, profil) */
.tab-badge {
  position: absolute;
  top: -4px; right: -6px;
  background: #EF4444;
  color: #fff;
  border-radius: 9999px;
  min-width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; padding: 0 4px;
}

/* Label "nouvelles" (orange) */
<span style="background:#F39C12; color:white; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600;">
  N nouvelle(s)
</span>
```

### Toast undo

```javascript
// Fond sombre pleine largeur, message 2 lignes + bouton Annuler vert
toast.style.cssText = 'position:fixed; bottom:calc(80px + env(safe-area-inset-bottom)); left:16px; right:16px; background:#333; color:white; padding:12px 16px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; z-index:99999; box-shadow:0 4px 12px rgba(0,0,0,0.3);';
toast.innerHTML = `
  <div style="font-size:14px; line-height:1.4; flex:1; margin-right:16px;">
    <span style="font-weight:600;">${message}</span><br>
    <span style="opacity:0.8; font-size:13px;">est supprimée</span>
  </div>
  <button onclick="_undoDelete()" style="background:none; border:none; color:#1F9D55; font-size:14px; font-weight:700; cursor:pointer; padding:0; white-space:nowrap; flex-shrink:0;">Annuler</button>
`;
```

---

## Animations

### highlightNewCard — Apparition nouvelle card

Utilisé quand une nouvelle card apparaît dans une liste suite à une action.

```javascript
function highlightNewCard(card) {
  card.style.opacity = '0';
  card.style.border = '1.5px solid #F39C12';
  card.style.transition = 'opacity 0.4s ease, border-color 1.5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    card.style.opacity = '1';
    setTimeout(() => { card.style.borderColor = '#EAF5EA'; }, 1500);
  }));
}
```

Appeler avec un délai de 400ms après le refresh DOM.

### fadeOutCard — Disparition card

Utilisé pour supprimer une card de liste avec animation.  
Séquence : bordure orange (300ms) → fade out (400ms) → collapse hauteur (300ms) → remove DOM.

```javascript
function fadeOutCard(card, onComplete) {
  const height = card.offsetHeight;
  card.style.transition = 'border-color 0.3s ease';
  card.style.border = '1.5px solid #F39C12';
  setTimeout(() => {
    card.style.transition = 'opacity 0.4s ease';
    card.style.opacity = '0';
    setTimeout(() => {
      card.style.transition = 'max-height 0.3s ease, margin-bottom 0.3s ease, padding 0.3s ease';
      card.style.overflow = 'hidden';
      card.style.maxHeight = height + 'px';
      requestAnimationFrame(() => {
        card.style.maxHeight = '0px';
        card.style.marginBottom = '0px';
        card.style.paddingTop = '0px';
        card.style.paddingBottom = '0px';
        setTimeout(() => { card.remove(); if (onComplete) onComplete(); }, 300);
      });
    }, 400);
  }, 300);
}
```

### fadeInUp — Nouvelle step transaction

Défini en CSS, appliqué via `_buildStepEl(step, animate=true)` :

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## Conventions code

### Nommage fonctions

- `_camelCase` : fonctions privées / internes
- `camelCase` : fonctions publiques / appelées depuis HTML
- `_loadXxx()` : chargement données
- `_openXxx()` / `_closeXxx()` : ouverture/fermeture modales
- `_renderXxx()` : rendu DOM

### Data attributes

- `data-item-id` : ID d'un objet sur ses cards
- `data-bottle-id` : ID d'une bouteille sur les cards carousel
- `data-tab` : onglet de navigation dans la tab-bar

### Z-index

| Couche | Valeur |
|---|---|
| Backdrop thread | 390 |
| Thread panel | 400 |
| Contact backdrop | 9999 |
| Contact popin | 10000 |
| Search request | 1000–1001 |
| Modal bouteilles backdrop | 390 |
| Modal bouteilles panel | 400 |
| Undo toast | 99999 |
