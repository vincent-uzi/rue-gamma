# Handoff — Rue gamma · variante Silencieux fond blanc

## Vue d'ensemble

**Rue gamma** est une application mobile (concept) de prêt d'objets entre voisins, ancrée dans une rue ou un quartier. Le levier principal de motivation est environnemental : chaque objet emprunté plutôt qu'acheté est traduit en kg de CO₂ évités, et chaque utilisateur·rice progresse sur des paliers de "voisin·e engagé·e".

Cette variante **Silencieux fond blanc** est l'une des trois directions explorées dans le projet de design. Elle se distingue par :
- Fond blanc pur (#FFFFFF), surfaces neutres, bordures fines
- Typographie SF Pro avec une hiérarchie iOS-native
- Un seul accent : un vert chlorophylle vif (#1F9D55) pour les CTA et les états actifs
- Aucune décoration superflue — la photo produit fait toute la couleur, le reste est calme

## Au sujet des fichiers de design

Les fichiers du dossier `design_files/` sont des **maquettes de référence en HTML/JSX** — des prototypes statiques montrant l'apparence et le comportement attendus, **pas du code de production à copier tel quel**.

La mission est de **reproduire ces maquettes dans l'environnement cible** (React Native, Swift/SwiftUI, Flutter, etc.) en suivant les conventions et la stack du codebase. Si aucun codebase n'existe encore, choisir la stack la plus appropriée (React Native + Expo recommandé pour iOS+Android) et y intégrer les designs.

À noter : la variante `direction-a-white.jsx` réutilise les composants de `direction-a.jsx` puis applique un walker DOM post-render qui swappe les couleurs. **Ne pas reproduire ce mécanisme** — il s'agit d'une astuce de prototypage. Dans le code de production, partir directement des tokens `silentWhite` (cf. ci-dessous) et appliquer les bonnes couleurs à la source.

## Fidélité

**High-fidelity** — couleurs, typo, espacements et rayons sont définitifs. Le développeur doit reproduire l'UI au pixel près, en utilisant les composants natifs ou la lib UI du codebase cible.

## Design tokens

Tous les tokens sont définis dans `design_files/tokens.jsx` sous la clé `silentWhite`. Réplique :

```js
const silentWhite = {
  // Surfaces
  bg:         '#FFFFFF',
  surface:    '#FFFFFF',
  surfaceAlt: '#F7F7F5',

  // Lignes
  line:       'rgba(60,60,67,0.12)',  // ~iOS separator

  // Texte
  text:       '#1A1A1C',
  textMuted:  'rgba(60,60,67,0.62)',
  textDim:    'rgba(60,60,67,0.38)',

  // Accent (CTA + états actifs)
  accent:     '#1F9D55',  // vert chlorophylle vif
  accentInk:  '#FFFFFF',
  accentSoft: '#E5EAE2',  // fond pastille verte (badges, avatars accent)

  // Sémantique
  success:    '#1F9D55',
  warn:       '#8C6A1F',
  danger:     '#A14545',

  // Glass (tab bar flottante)
  glassBg:    'rgba(255,255,255,0.65)',
  glassBlur:  18,

  // Indicateurs
  statusDot:  { available: '#1F9D55', borrowed: 'rgba(60,60,67,0.45)' },
};
```

## Typographie

Famille : **SF Pro Text / SF Pro Display** (-apple-system fallback). Sur Android, utiliser Inter ou la font système ; sur web, charger SF Pro depuis le CDN Apple ou Inter en remplacement.

Échelle (cf. `rgType` dans `direction-a.jsx`) :

| Token | Taille | Weight | Line-height | Usage |
|---|---|---|---|---|
| `largeTitle` | 32 | 700 | 38 | Titres d'écran (header de Home, fiche objet) |
| `title2` | 22 | 700 | 28 | Titres bottom-sheet |
| `title3` | 19 | 600 | 24 | Sous-titres de section ("Récemment ajoutés") |
| `headline` | 16 | 600 | 21 | Nom d'objet, label de CTA, badges |
| `body` | 16 | 400 | 22 | Texte courant, descriptions |
| `callout` | 15 | 400 | 21 | Catégories sous le titre objet |
| `subhead` | 14 | 400 | 19 | Métadonnées ("34 voisins · 142 objets") |
| `footnote` | 12 | 400 | 16 | Tags, sous-textes ("n°14 · membre depuis mars") |
| `caption` | 11 | 500 | 14 | Micro-labels ("Description", "Suggestions") |

Tous les textes sont en **sentence case** — aucun uppercase, aucun letter-spacing > 0.1.

## Espacements & rayons

- **Padding écran** : 20 px horizontal
- **Gap entre sections** : 22-28 px vertical
- **Gap interne carte** : 12-16 px
- **Border-radius** :
  - Boutons / inputs / cartes : 14-16 px
  - Cartes hero / CTA principaux : 16 px
  - Pastilles & avatars : 9999 (cercle parfait)
  - Bottom-sheet : 24 px (haut uniquement)
  - Phone bezel : 42 px (uniquement pour la maquette, pas en prod)

## Écrans

> Le parcours comporte **7 écrans**. Tous les composants partagés (tab bar, MemberPill, ChromeA, RGIcon) sont décrits plus bas.

### 1. Accueil (`HomeA`)

**But** — point d'entrée : voir le pouls de la rue + les objets récemment ajoutés + chercher.

**Layout** (de haut en bas, padding 12 / 20) :
1. **Header communauté** (flex row, `justify: space-between`)
   - Bloc gauche : caption "Ma rue" (textMuted) + largeTitle "Rue des Vignoles" + subhead "34 voisins · 142 objets"
   - Bloc droit : bouton circle 40×40, fond `surface`, border `line`, picto `share` (3 cercles reliés par 2 traits)
2. **Champ recherche** (passif) — h ~46 px, fond `surface`, border `line`, radius 14, padding 12/14, picto `search` 18px + texte "Chercher un objet" (textMuted)
3. **Bandeau CO₂ rue** — fond `surface`, border `line`, radius 18, padding 16/18 ; à gauche caption "La rue ce mois-ci" + chiffre 28 px + "kg CO₂" muted, à droite picto `leaf` accent
4. **Section "Récemment ajoutés"** — title3 + lien "Tout voir" accent + chev
5. **Liste d'items** (5-6 lignes, séparateur 0.5px `line` entre lignes) — chaque ligne :
   - Nom de l'objet (`headline`)
   - Sous-ligne flex : `{catégorie} · MemberPill`
   - **MemberPill** : pastille pill (radius 9999, border 0.5px line, fond surface, padding 2/8/2/4) contenant un cercle 16×16 `accentSoft` avec l'initiale en vert + nom + " · n°XX" en `footnote`
   - À droite : status dot 6×6 (vert si available, gris si borrowed)
6. **Bottom tab bar** (flottante, glass) — voir ci-dessous

### 2. Recherche (`SearchA`)

**But** — saisir une requête, voir suggestions et résultats.

**Layout** :
1. **Champ recherche actif** — fond `surface`, border `line`, radius 14, picto search + texte tapé "perceu" + caret clignotant 1.5×18 noir + bouton "Annuler" à droite
2. **Section "Suggestions"** — caption + 3 lignes "perceuse", "perceuse à colonne", "perceuse visseuse" avec picto `search` 16 textDim, séparateur 0.5px line
3. **Compteur "3 résultats"** caption muted
4. **Liste résultats** — même structure que items de Home (nom + cat + MemberPill), avec en plus à droite un badge CO₂ : `flex inline gap:4, fontSize:11, weight:600, color: success, padding: 2/8, background: accentSoft, borderRadius: 9999, picto leaf 11px + "−8,2 kg"`

### 3. Fiche objet + demande (`ItemA`)

**But** — voir un objet en détail et envoyer une demande d'emprunt.

**Layout** :
1. **Hero photo** — bloc 240 px de haut, full-width, dégradé chaud (linear 160deg, #C8B89A → #A89878 → #6E5F4A) avec radial overlays (placeholder). Sur la maquette : un cadre central 200×130 qui dit "PHOTO" — à remplacer par la vraie image objet.
   - **Boutons flottants** en haut : back & more, circle 36×36, `rgba(255,255,255,0.9)` + backdrop-blur 12px
   - **Pagination** en bas : 3 dots blancs (1 actif élargi 18×5, 2 inactifs 5×5, opacity 0.5)
2. **Pill statut** "Disponible" — inline-flex, fond `accentSoft`, color `accent`, padding 5/11, radius 9999, dot 6×6 accent + caption weight 600
3. **Titre objet** — largeTitle "Perceuse Bosch GSR 12V" sur 2 lignes, lineHeight 40
4. **Catégorie** — callout textMuted "Outils · catégorie ADEME 04"
5. **Bandeau CO₂** — fond surface, border line, radius 16, padding 16/18, gauche : avatar 44×44 `accentSoft` + leaf accent, droite : headline "−8,2 kg CO₂" + footnote muted "évités si vous l'empruntez"
6. **Description** — caption "Description" muted + body texte
7. **Propriétaire** — flex row gap 12 : avatar 44×44 `accentSoft` avec initiale `accent` headline + nom headline + "n°14 · membre depuis mars" footnote muted
8. **CTA sticky bottom** — bouton plein largeur, h 54, radius 16, fond `accent`, ink `accentInk`, headline weight 600, texte "Demander à emprunter". Dégradé de fond depuis bg blanc (55%) → bg E6 (80%) → transparent pour fade le scroll.

### 4. Profil + niveau CO₂ (`ProfileA`)

**Layout** :
1. **Nav** : back + titre "Profil" headline + bouton more, all 36×36 circle border line
2. **Hero CO₂ ring** — bloc flex row gap 16 : à gauche un anneau SVG 120×120 (stroke-width 8, track `surfaceAlt`, progress `accent`), centré avec caption "Niveau 3" muted + chiffre 38 weight 600 (kg total) + "kg" footnote ; à droite caption "Niveau 3" muted + title3 "Voisin·e engagé·e" + footnote muted "3 prêts pour atteindre niveau 4" + barre de progression 6 px (track `surfaceAlt`, fill `accent`)
3. **Stats row** — 3 colonnes égales fond `surface` border `line` radius 14 padding 14/12 centré : chiffre 26 weight 600 + caption muted ("Prêts faits", "En cours", "Voisin·e·s")
4. **Section "Mes objets"** — title3 + "+ Ajouter" accent ; liste 4-5 items avec status pill droite (vert "Dispo" ou gris "Prêté")
5. **Bottom tab** active sur Profil

### 5. Notif retard (`NotifLateA`)

**Bottom-sheet modal** — overlay rgba(0,0,0,0.35), fond blanc radius 24/24/0/0 padding 12/20/44 :
1. Drag handle 36×4 line center
2. Strip warn — flex row gap 10, color `warn`, picto clock + caption weight 600 "Retour prévu il y a 3 jours"
3. Title2 "La sorbetière est toujours chez vous ?"
4. Body muted "Karim attend pour la reprendre. Donnez-lui une nouvelle date ou organisez le retour."
5. Carte voisin demandeur — fond `accentSoft` radius 14 padding 14, avatar+nom+"il y a 2j"
6. Boutons stack — primaire "Proposer une date" + secondaire fond surface border "Organiser le retour"

### 6. Alerte dispo (`NotifAlertA`)

**Carte notif in-app** :
1. Header card — fond `accent`, ink `accentInk`, radius 18, padding 18, picto bell 18 + "Sorbetière disponible" headline + footnote "Karim a confirmé · il y a 5 min"
2. CTA "Demander maintenant" en dessous (même style que ItemA)
3. Strip "2 voisins attendent aussi cet objet" — fond `surfaceAlt` radius 12 padding 12/14, picto alert + footnote muted
4. Strip CO₂ — fond surface border radius 14 padding 14/16, leaf accent + "Empruntée plutôt qu'achetée :" + headline accent "−14 kg CO₂"

### 7. Confirmation ajout (`ConfirmAddA`)

**But** — feedback positif après qu'un voisin·e ait publié un nouvel objet à prêter. Bottom-sheet modal sur fond flou de "Mes objets".

**Layout** :
1. **Backdrop** : la liste "Mes objets" reste visible derrière, blurrée (`blur(3px) saturate(.55) opacity(.5)`)
2. **Bottom-sheet** : fond `surface`, radius 24px en haut, padding 14/24/40, shadow `0 -8px 40px rgba(0,0,0,0.14)`, bouton croix top-right (32×32 circle, fond `surfaceAlt`, picto close 12px)
3. **Drag handle** 36×4 line center, marginBottom 28
4. **Picto célébration** : cercle 88×88 fond `accentSoft`, contient un picto leaf 36px `accent`, avec deux anneaux concentriques (border 1px `accent` opacity 0.18 puis 0.08) qui suggèrent un petit halo
5. **Titre** title2 centré, `text-wrap: balance`, "Merci, votre objet fera des heureux !"
6. **Sous-titre** callout centré, color `textMuted`, max-width 280, "À chaque emprunt, il économisera **{X} kg de CO₂**" — le montant CO₂ est en `accent` weight 600 dans un span, avec `white-space: nowrap` pour éviter le retour à la ligne au mauvais endroit
7. **CTA primaire** plein largeur, h 52, radius 16, fond `accent`, "Voir mon objet"
8. **Lien secondaire** plein largeur, h 44, fond transparent, color `text`, "Ajouter un autre objet"

**Données** : le `X kg de CO₂` est calculé côté serveur (catégorie ADEME × volume estimé d'emprunts annuels). Pour la beta, tabler sur la valeur de catégorie ADEME unique.

## Composants partagés

### `MemberPill`
Affichage de "Marc · n°14" dans une pilule.
```
inline-flex, gap: 5, padding: 2/8/2/4, radius: 9999,
background: surface, border: 0.5px line, color: text,
fontSize: 11, fontWeight: 500
  ├─ avatar circle 16×16, background: accentSoft, color: accent,
  │  fontSize: 9, fontWeight: 700, contenu: première lettre du nom
  └─ texte "{nom} · n°{numéro}"
```

### `BottomTabA`
Tab bar flottante glass — `position: absolute, bottom: 32, left: 12, right: 12`, `background: rgba(255,255,255,0.85)`, `backdrop-blur: 20px saturate(160%)`, border 1px line, radius 28, height ~64, shadow `0 4px 20px rgba(0,0,0,0.05)`.
4 onglets : Accueil (home), Chercher (search), Ajouter (plus), Profil (user). Chaque tab : flex column gap 3, picto 20px + label fontSize 10 weight 500.
Inactif : `textMuted`. Actif : `accent` (vert vif #1F9D55) sur picto ET label.

### `StatusBarA` & `HomeIndicatorA`
Status bar iOS factice (heure 9:41 + signal/wifi/batterie SVG, height 54). Home indicator factice (124×4.5 radius 100, bottom 8). **À retirer en prod** — utiliser le SafeArea natif du device.

### `RGIcon`
Set d'icônes stroke 1.5-1.8 px, viewBox normalisé, couleur `currentColor`. Voir `design_files/icons.jsx`. Slots : search, leaf, bell, plus, arrow, chev, back, more, check, clock, camera, user, home, flame, close, filter, alert, share. **Recommandation** : remplacer par SF Symbols (iOS) / Material Icons (Android) selon la plateforme cible — ces SVG sont des placeholders.

## Interactions & comportements

- **Navigation** : push entre Accueil → Recherche, Accueil → Fiche objet, Fiche objet → bottom-sheet de demande, Profil → fiche d'un de ses objets. Transitions iOS standard (push horizontal).
- **CTA "Demander à emprunter"** → ouvre un bottom-sheet de confirmation (non maquetté, à concevoir)
- **Bottom-sheet** : drag-to-dismiss + tap sur backdrop ferme.
- **Tab bar** : icône+label active passe en `accent` instantanément (pas d'animation autre).
- **Pagination hero** : swipe horizontal entre photos.
- **Status pill** : statique, pas d'interaction.

## États

- **Objet** : `available` (dot vert, pill "Disponible") | `borrowed` (dot gris, pill "Prêté")
- **Member** : juste affichage statique pour le concept
- **CO₂ ring** : rempli proportionnellement au niveau (level/max), animation entrée optionnelle (stroke-dashoffset 600ms ease-out)

## Données nécessaires pour brancher

Pour chaque écran principal, voici la forme de données à fetcher :

```ts
// Item
{ id, name, category, ademeCategory, photos: [], description,
  status: 'available' | 'borrowed',
  co2SavedKg: number,
  owner: { id, firstName, houseNumber, joinedAt }
}

// Member
{ id, firstName, houseNumber, joinedAt, level, co2SavedKg, lendsCount, currentBorrows: [] }

// Street (community)
{ slug, displayName, neighborsCount, itemsCount, co2SavedThisMonthKg }
```

## Assets

Aucun asset binaire à fournir — toutes les illustrations sont CSS/SVG dans les fichiers source. **À remplacer en prod** :
- Photos d'objets (hero) — uploadées par les propriétaires
- Avatars membres (optionnel, fallback sur initiale dans cercle accent)

## Fichiers de référence

- `design_files/Rue gamma.html` — page principale, charge tous les scripts et orchestre le canvas (utile pour visualiser les écrans dans un navigateur)
- `design_files/tokens.jsx` — tous les tokens de design (3 directions, utiliser `silentWhite`)
- `design_files/icons.jsx` — set d'icônes SVG
- `design_files/direction-a.jsx` — composants des 6 écrans (HomeA, SearchA, ItemA, ProfileA, NotifLateA, NotifAlertA) + MemberPillA + ChromeA + BottomTabA + CO2RingA
- `design_files/direction-a-white.jsx` — wrapper de prototypage seulement (ne pas reproduire en prod)
- `design_files/design-system.jsx` — page récap tokens (utile comme référence visuelle)

## Comment ouvrir les maquettes

1. Servir le dossier `design_files/` avec un serveur HTTP statique (ex. `python -m http.server` ou `npx serve`)
2. Ouvrir `Rue gamma.html` — le canvas s'affiche avec tous les écrans, dont la section "A' · Écrans — Silencieux fond blanc" qui est la cible de ce handoff.
