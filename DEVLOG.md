# FLO — Journal de développement

---

## Session 31 mai 2026 — Restructuration documentation

- Archivage PROJET.md → PROJET.md.old
- Création structure documentaire : PRODUCT_VISION, MVP_TEST_PLAN, ROADMAP, STATUS, DEVLOG, PATTERNS

---

## Session 30 mai 2026 — Bouteilles à la mer + Animations + Notifications

### Réalisations
- Système bouteilles à la mer complet (modale profil, tri, labels, viewed_at, dismissals DB)
- Badge Profil (style identique badge Transactions, realtime)
- Animations : fadeOutCard, highlightNewCard, _animateCurrentStepOut
- Popin suppression bouteille après emprunt
- Suppression encarts obsolètes Home

### Bugs corrigés
- Badge Transactions ne se remet plus à 0 par erreur (_markRead appelle updateProfileBadge)
- Dismissals bouteilles persistés en DB (était localStorage)

### Tables DB
- `bottle_dismissals` créée
- `viewed_at` sur search_request_responses
- `responses_last_viewed_at` sur search_requests

---

## Session 28 mai 2026 — Notifications Realtime + Identité visuelle

### Réalisations
- Badge Transactions source unique (updateNotificationBadge)
- Supabase Realtime (INSERT notifications → badge temps réel)
- Identité visuelle FLO : logo, favicon, apple-touch-icon, PWA manifest
- Splash screen avec animation + logo FLO
- Fixes DB & profil

---

## Session 27 mai 2026 — Thésaurus CO₂ + Fixes onboarding

### Réalisations
- Table `item_categories` avec CO₂ par catégorie
- Détection catégorie via DB (remplace IA hardcodée)
- Fixes onboarding (tunnel 3 objets)
- Fixes signup (4 étapes)
- Modal invitation simplifiée
- Viewport mobile (VIEWPORT-01) résolu
- Fixes DB & recherche

---

## Session 26 mai 2026 — Système invitation/inscription complet

### Réalisations
- Structure DB invitations
- invite.html : page invitation avec validation code
- login.html : refonte complète
- signup.html : 4 étapes (code → identité → coordonnées → mot de passe)
- onboarding.html : tunnel 3 objets
- Workflow complet validé

---

## Session 23 mai 2026

### Réalisations
- Fixes divers profil et transactions
- Bandeau push incitatif

---

## Session 13 mai 2026 — Profil redesign + onglets dynamiques

### Réalisations
- Redesign profil avec onglets (Objets / Prêtés / Empruntés)
- loadProfileTabs() dynamique
- Bandeau push incitatif (PRD)
- Toggle archivées
- Page 0 résultat moteur de recherche
- Onglet Transactions restructuré
- Template card unifié 2 lignes

### Bugs résolus
- Race condition loadProfileTabs
- Guillemets typographiques (récurrent)

---

## Avant mai 2026 — Fondations

- Auth Supabase
- CRUD objets
- Flow prêt complet (QR ou validation manuelle)
- RLS policies
- Design system initial
