# FLO — Plan de test MVP

## Objectif

Valider 5 hypothèses avec 5–10 voisins réels sur la Rue Charles-Saint-Venant, Lille.

---

## Hypothèses à tester

### H1 — Les gens déclarent des objets

> "Un voisin invité sur FLO va ajouter au moins un objet dans les 48h."

**Mesure :**
```sql
SELECT COUNT(*) FROM items WHERE status != 'archived' AND created_at > NOW() - INTERVAL '48 hours';
SELECT owner_id, COUNT(*) FROM items GROUP BY owner_id ORDER BY COUNT DESC;
```

### H2 — Les gens empruntent

> "Un voisin va faire au moins une demande d'emprunt dans les 2 premières semaines."

**Mesure :**
```sql
SELECT COUNT(*) FROM loans WHERE status != 'declined' AND requested_at > NOW() - INTERVAL '14 days';
SELECT borrower_id, COUNT(*) FROM loans GROUP BY borrower_id;
```

### H3 — Les propriétaires répondent

> "80% des demandes reçoivent une réponse (acceptée ou déclinée) en moins de 24h."

**Mesure :**
```sql
SELECT
  COUNT(*) FILTER (WHERE status IN ('accepted','active','returned')) AS acceptees,
  COUNT(*) FILTER (WHERE status = 'declined') AS declinees,
  COUNT(*) FILTER (WHERE status = 'pending' AND requested_at < NOW() - INTERVAL '24 hours') AS sans_reponse,
  COUNT(*) AS total
FROM loans;
```

### H4 — Les échanges aboutissent

> "Au moins 1 échange complet (demande → remise → retour) se produit."

**Mesure :**
```sql
SELECT COUNT(*) FROM loans WHERE status = 'returned';
SELECT AVG(EXTRACT(EPOCH FROM (returned_at - handed_at))/3600) AS duree_moyenne_h FROM loans WHERE returned_at IS NOT NULL;
```

### H5 — Les échanges génèrent des interactions

> "Les voisins se parlent en dehors de l'app à cause de FLO."

**Mesure :** Qualitatif — entretiens informels, mentions lors du bilan.

---

## Red Routes (parcours critiques)

### ✅ Red Route 1 : Invitation + création de compte
`invite.html` → `signup.html` → `onboarding.html` → `index.html`

### ✅ Red Route 2 : Ajout objet
`index.html` (onglet +) → formulaire → détection catégorie IA → CO₂ affiché

### ✅ Red Route 3 : Recherche + flow prêt complet
Recherche → fiche objet → demande → acceptation → QR remise → QR retour

### ✅ Red Route 4 : CO₂ et impact visible
Badge CO₂ sur chaque objet + total mensuel sur Home

### ❌ Red Route 5 : Back-office admin
Non implémenté — géré manuellement pour le MVP

---

## Protocole de lancement

1. Vincent invite les voisins manuellement via `invite.html`
2. Chaque invité reçoit un lien avec code pré-rempli
3. Signup en 4 étapes : code → identité → coordonnées → mot de passe
4. Onboarding : 3 objets suggérés à ajouter
5. Bilan à J+14

---

## Suivi post-lancement

```sql
-- Vue d'ensemble communauté
SELECT
  (SELECT COUNT(*) FROM members WHERE community_id = 'ed225eef-e9e0-4cf8-9ae9-aaf687b55c42') AS membres,
  (SELECT COUNT(*) FROM items WHERE status != 'archived') AS objets_actifs,
  (SELECT COUNT(*) FROM loans) AS demandes_total,
  (SELECT COUNT(*) FROM loans WHERE status = 'returned') AS echanges_complets;
```
