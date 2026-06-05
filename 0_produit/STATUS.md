# FLO — État technique

Dernière mise à jour : 2 juin 2026

## État global : ✅ Prêt pour le test rue

---

## Fichiers HTML

| Fichier | Rôle | État |
|---|---|---|
| `index.html` | App principale (PWA) | ✅ Stable |
| `login.html` | Connexion | ✅ Stable |
| `invite.html` | Page invitation voisin | ✅ Stable |
| `signup.html` | Inscription 4 étapes | ✅ Stable |
| `onboarding.html` | Tunnel ajout 3 objets | ✅ Stable |
| `splash.html` | Écran de démarrage | ✅ Redesign + lancement à froid |
| `reset-password.html` | Réinitialisation mot de passe | ✅ Nouveau |

## Tables Supabase

| Table | Rôle | État |
|---|---|---|
| `members` | Profils voisins | ✅ |
| `items` | Objets partagés | ✅ |
| `loans` | Demandes et prêts | ✅ |
| `communities` | Communautés | ✅ |
| `notifications` | Notifications in-app | ✅ |
| `search_requests` | Bouteilles à la mer | ✅ |
| `search_request_responses` | Réponses aux bouteilles | ✅ |
| `bottle_dismissals` | Dismissals persistés | ✅ |
| `item_categories` | Thésaurus CO₂ | ✅ |
| `invitations` | Codes d'invitation | ✅ |

## Colonnes ajoutées récemment

- `search_request_responses.viewed_at` — suivi consultation réponses
- `search_requests.responses_last_viewed_at` — suivi consultation liste
- `members.role` — admin / member

## Backlog avant test rue

### 🔴 Bloquant

- [ ] Tests multi-devices (iPhone SE, Android)
- [x] Audit RLS Supabase (sécurité) ✅

### 🟡 Important

- [x] Mot de passe oublié — page reset-password.html ✅
- [ ] Transactions : animations fade in/out
- [x] Perceuse Vincent : loan fantôme sans remise visible ✅

### ⚪ Nice-to-have

- [x] Upload photo objet — compression, feedback, lightbox ✅
- [x] Correction rotation EXIF photos ✅
- [x] Vue grille objets avec toggle liste/grille ✅
- [x] Splash screen redesign (logo blanc, pictos animés, typo ui-rounded) ✅
- [x] Pull-to-refresh : fix déclenchement intempestif ✅
- [ ] Responsive fin (très petits écrans)
- [ ] Back-office admin

## Red Routes — état

| Parcours | État |
|---|---|
| Invitation → signup → onboarding | ✅ |
| Ajout objet + CO₂ | ✅ |
| Recherche → demande → prêt complet | ✅ |
| Bouteilles à la mer | ✅ |
| Notifications realtime | ✅ |
| Mot de passe oublié | ✅ |
| Back-office admin | ❌ |

## Design System

- **patterns.html** : référentiel visuel complet — https://rue-gamma.vercel.app/patterns.html
- 15 composants documentés (boutons, cards, labels, modales, animations)
- 10 snowflakes identifiés à rationaliser en Phase 2
- Typo titres : `ui-rounded` 800 (SF Pro Rounded sur iOS)
- Logo : `logo-green.png` sur pages auth, `logo-white.png` sur splash

## Scripts maintenance

| Script | Rôle |
|---|---|
| `scripts/recompress-photos.mjs` | Recompresse les photos > 1 Mo dans le bucket |
| `scripts/fix-rotation.mjs` | Corrige la rotation EXIF des photos existantes |
| `scripts/delete-test-items.mjs` | Supprime les items de test par nom |
