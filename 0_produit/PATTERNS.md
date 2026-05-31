# FLO — Patterns UI & Design System

## Référentiel visuel

Le design system complet est documenté dans **patterns.html** à la racine du projet.
URL locale : https://rue-gamma.vercel.app/patterns.html

Ce fichier contient :
- Aperçus visuels de chaque composant
- Code HTML prêt à copier
- Usage par section fonctionnelle
- Liste des Snowflakes (composants non mutualisés) à rationaliser en Phase 2

---

## Composants disponibles

### Boutons
- `btn-primary` — CTA vert #1F9D55, border-radius:24px
- `btn-secondary` — outline vert, border:2px solid #1F9D55
- `btn-ghost` — neutre, border:1px solid #E5E5E5
- `btn-icon-round` — cercle vert 44px (bouton +)
- `btn-icon-close` — × fermeture modale

### Cards
- `card` — fond blanc, bordure #EAF5EA, radius:12px
- `card-object` — template objet liste (2 lignes + badges)
- `card-muted` — fond #F5F5F5
- `card-alert` — fond #FFEAA7 (alertes bouteilles)
- `card-empty` — dashed border, état zéro

### Labels & badges
- `badge-owner` — fond vert, texte blanc (Vous)
- `badge-member` — fond #EAF5EA, texte vert (autre membre)
- `badge-co2` — fond #EAF5EA, texte vert (impact CO₂)
- `badge-new` — fond orange #F39C12 (nouvelles réponses)
- `tab-badge` — rouge #EF4444, position absolute (compteur tab-bar)
- `avatar-initiales` — cercle 44px (grand) ou 32px (compact)

### Modales
- `bottom-sheet` — radius 24px 24px 0 0, slide du bas
- `slide-right` — translateX(100%)→0, transition 300ms, z-index:400
- `toast-undo` — fond #333, pleine largeur, bouton Annuler vert

### Animations
- `highlightNewCard(card)` — fade in + bordure orange → verte 1.5s
- `fadeOutCard(card, cb)` — bordure orange → fade out → collapse → remove

---

## Snowflakes — À rationaliser en Phase 2

| # | Problème | Impact | Fix |
|---|----------|--------|-----|
| 1 | Deux verts (#1F9D55 + #00A651) | H | --brand-green |
| 2 | 6 façons d'ouvrir une modale | H | _setModalOpen() |
| 3 | Modal open pattern ×4 | H | _openModal() générique |
| 4 | Data attributes incohérents | M | Standardiser |
| 5 | Z-index fragmentés | M | Variables CSS |
| 6 | Transitions incohérentes | M | --anim-fast/normal |
| 7 | btn-primary inline ×16 | M | Classe CSS |
| 8 | Timeouts arbitraires | M | Constantes DELAY_* |
| 9 | .badge-dot inline ×5 | L | Classe CSS |
| 10 | fontSize sans échelle | L | --text-xs/sm/base/lg |

---

## Charte graphique

### Couleurs
| Rôle | Valeur |
|------|--------|
| Accent principal | #1F9D55 |
| Accent clair | #EAF5EA |
| Orange alerte | #F39C12 |
| Rouge badge | #EF4444 |
| Fond jaune alerte | #FFEAA7 |
| Texte principal | #333 |
| Texte secondaire | #666 |
| Texte discret | #999 |
| Fond page | #FBFDFB |

### Espacement
- Border-radius cards : 12px
- Border-radius modales : 24px (bottom sheet) / 20px (floating)
- Border-radius boutons : 24px (pill)
- Padding card : 16px
- Gap liste : 12px
