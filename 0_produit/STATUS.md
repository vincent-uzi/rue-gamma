# FLO — État technique

Dernière mise à jour : 31 mai 2026

## État global : 85% prêt pour le test rue

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

- [ ] Splash screen : fix redirect vers index.html après animation
- [ ] Tests multi-devices (iPhone SE, Android)
- [ ] Audit RLS Supabase (sécurité)

### 🟡 Important

- [ ] Mot de passe oublié
- [ ] Transactions : animations fade in/out (debug en cours)
- [ ] Perceuse Vincent : loan fantôme sans remise visible

### ⚪ Nice-to-have

- [ ] Upload photo objet
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
