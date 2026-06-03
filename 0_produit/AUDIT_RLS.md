# FLO — Audit RLS Supabase

Date : 2 juin 2026

---

## Méthode

L'app utilise la clé **anon** (publique) pour toutes les opérations depuis le navigateur.
Le RLS (Row Level Security) est la seule barrière entre un utilisateur malveillant et les données.

> ⚠️ `member_id` est stocké dans `localStorage` côté client — il ne faut JAMAIS lui faire confiance. Seul `auth.uid()` (token JWT Supabase) est fiable.

---

## Requêtes d'audit à passer dans Supabase → SQL Editor

### 1. Voir toutes les policies actives

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
```

### 2. Vérifier que RLS est activé sur toutes les tables

```sql
SELECT relname AS table, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relnamespace = 'public'::regnamespace
  AND relkind = 'r'
ORDER BY relname;
```

---

## Risques identifiés par table

### 🔴 CRITIQUE — `members`

**Risque :** Un utilisateur peut-il lire l'adresse et le téléphone de tous les voisins ?

La table `members` contient `address` et `phone` — données sensibles.
Le code charge tous les membres via `.select('*')` pour afficher les profils.

**Policy attendue :**
- SELECT : uniquement les membres de la même communauté (`community_id = auth.uid()'s community`)
- UPDATE : uniquement son propre profil (`id = auth.uid()` ou via `auth_id`)
- INSERT : uniquement via signup (service role)
- DELETE : interdit (anon)

**Requête de test :**
```sql
-- Peut-on lire tous les membres sans restriction ?
SELECT id, first_name, phone, address FROM members LIMIT 5;
-- Si ça retourne des données sans être connecté → RLS absent ou trop permissif
```

---

### 🔴 CRITIQUE — `items`

**Risque :** Un utilisateur peut-il modifier ou archiver les objets d'un autre voisin ?

Le code fait `.update({ status: 'archived' }).eq('id', item.id)` — si RLS ne vérifie pas `owner_id`, n'importe qui peut archiver n'importe quel objet.

**Policy attendue :**
- SELECT : tous les items de la même communauté
- UPDATE : uniquement `owner_id = auth_member_id`
- INSERT : uniquement pour soi-même
- DELETE : interdit (utiliser `status = 'archived'`)

**Requête de test :**
```sql
-- Tenter un UPDATE sur un item dont on n'est pas owner
-- (à tester depuis l'app avec un second compte)
UPDATE items SET status = 'archived' WHERE id = '<id_item_autre_user>';
-- Doit retourner 0 rows affected
```

---

### 🔴 CRITIQUE — `loans`

**Risque :** Un utilisateur peut-il accepter/décliner/clore un prêt auquel il ne participe pas ?

Le code fait `.update(updates).eq('id', loanId)` sans vérifier côté serveur si l'utilisateur est `owner_id` ou `borrower_id`.

**Policy attendue :**
- SELECT : `owner_id = me OR borrower_id = me`
- UPDATE : `owner_id = me OR borrower_id = me`
- INSERT : `borrower_id = me`
- DELETE : interdit

---

### 🟡 IMPORTANT — `notifications`

**Risque :** Un utilisateur peut-il lire les notifications d'un autre ?

**Policy attendue :**
- SELECT : `user_id = me`
- UPDATE : `user_id = me` (pour marquer lu)
- INSERT : service role uniquement (ou tout utilisateur connecté pour notifier autrui — à valider)
- DELETE : interdit

> Note : l'app insère des notifications pour d'autres utilisateurs (ex: notifier le propriétaire d'une demande de prêt). Cette opération doit être autorisée en INSERT pour tout utilisateur authentifié, mais SELECT/UPDATE strictement limités à `user_id = me`.

---

### 🟡 IMPORTANT — `search_requests`

**Risque :** Un utilisateur peut-il clore la bouteille à la mer d'un autre ?

Le code fait `.update({ status: 'closed' }).eq('id', id)`.

**Policy attendue :**
- SELECT : tous les membres de la communauté
- UPDATE : `member_id = me`
- INSERT : utilisateur authentifié
- DELETE : interdit

---

### 🟡 IMPORTANT — `search_request_responses`

**Risque :** Un utilisateur peut-il lire les réponses privées d'un autre ?

**Policy attendue :**
- SELECT : `responder_id = me OR (requester_id = me)`
- INSERT : utilisateur authentifié
- UPDATE : `responder_id = me OR requester_id = me`
- DELETE : interdit

---

### 🟢 FAIBLE — `bottle_dismissals`

**Risque :** Un utilisateur pourrait insérer un dismissal avec le `member_id` de quelqu'un d'autre.

Le code fait `.insert({ member_id: memberId, ... })` où `memberId` vient de `localStorage`.

**Policy attendue :**
- INSERT : `member_id = auth_member_id` (résolu via `auth.uid()`)
- SELECT/DELETE : `member_id = me`

---

### 🟢 FAIBLE — `invitations`

**Risque :** Un utilisateur peut-il créer des codes d'invitation ?

**Policy attendue :**
- SELECT : lecture pour valider un code (anon OK)
- INSERT/UPDATE/DELETE : admin uniquement (service role ou `role = 'admin'`)

---

### 🟢 FAIBLE — `communities` / `item_categories`

- `communities` : lecture seule pour les membres, pas de modification depuis l'app
- `item_categories` : lecture seule, référentiel CO₂

---

## Checklist de vérification

Coller dans Supabase SQL Editor et vérifier :

```sql
-- Vue d'ensemble des policies
SELECT tablename, policyname, cmd, roles,
       left(qual, 80) as condition
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
```

**Pour chaque table, vérifier :**

| Table | RLS ON | SELECT restreint | UPDATE par owner | INSERT authentifié | DELETE bloqué |
|---|---|---|---|---|---|
| members | ? | ? | ? | ? | ? |
| items | ? | ? | ? | ? | ? |
| loans | ? | ? | ? | ? | ? |
| notifications | ? | ? | ? | ? | ? |
| search_requests | ? | ? | ? | ? | ? |
| search_request_responses | ? | ? | ? | ? | ? |
| bottle_dismissals | ? | ? | ? | ? | ? |
| invitations | ? | ? | — | ? | ? |
| communities | ? | ? | — | — | — |
| item_categories | ? | ? | — | — | — |

---

## Prochaine étape

1. Passer les requêtes dans Supabase SQL Editor
2. Pour chaque table sans policy correcte → créer la policy manquante
3. Tester avec un second compte utilisateur

