# FLO — État technique

Dernière mise à jour : 31 mai 2026

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
| `splash.html` | Écran de démarrage | ⚠️ Redirect à fixer |

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

- [ ] Splash screen : fix redirect vers index.html après animation *(non critique pour le test)*
- [ ] Tests multi-devices (iPhone SE, Android)
- [ ] Audit RLS Supabase (sécurité)

### 🟡 Important

- [ ] Mot de passe oublié
- [ ] Transactions : animations fade in/out (debug en cours)
- [x] Perceuse Vincent : loan fantôme sans remise visible ✅

### ⚪ Nice-to-have

- [x] Upload photo objet — compression, feedback, lightbox ✅
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
| Mot de passe oublié | ❌ |
| Back-office admin | ❌ |

## Design System

- **patterns.html** : référentiel visuel complet — https://rue-gamma.vercel.app/patterns.html
- 15 composants documentés (boutons, cards, labels, modales, animations)
- 10 snowflakes identifiés à rationaliser en Phase 2
