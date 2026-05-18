# Brief d'intégration - Messages Push sur Profil

**Date** : 18 Mai 2026  
**Documentation source** : `MESSAGES_PUSH.md`  
**Objectif** : Intégrer les messages push personnalisés sur le Profil

---

## 1. CONTEXTE

**Objectif global** : Afficher des bandeaux push personnalisés sur le Profil pour informer l'utilisateur des actions à effectuer sur ses transactions (demandes, acceptations, retours) et l'inciter à ajouter des objets.

**Documentation** : `MESSAGES_PUSH.md` contient 7 types de messages (79 variantes au total) avec tonalité éditoriale définie ("Le Voisin Bienveillant").

**Contraintes** :
- Un message par transaction = message persistant (ne change jamais)
- Design responsive mobile (320px-428px)
- Scroll horizontal si plusieurs messages (déjà implémenté)

---

## 2. TYPES DE MESSAGES

### Transactions actives (6 types)

**`pending_owner`** : Demande d'emprunt reçue (12 variantes)
- Situation : Jean-Pierre veut emprunter ta perceuse
- Action : Accepter/Refuser la demande

**`pending_borrower`** : Demande d'emprunt envoyée, en attente (12 variantes)
- Situation : Tu as demandé la scie de Vincent, tu attends sa réponse
- Action : Aucune (attente passive)

**`accepted_owner`** : Prêt accepté, attendre l'appel de l'emprunteur (8 variantes)
- Situation : Tu as accepté de prêter ta ponceuse à Marie
- Action : Aucune (c'est l'emprunteur qui contacte)

**`accepted_borrower`** : Prêt accepté, appeler le prêteur (12 variantes)
- Situation : Vincent a accepté de te prêter son escabeau
- Action : Appeler/SMS Vincent pour organiser

**`active_owner`** : Objet prêté depuis X jours, organiser retour (8 variantes)
- Situation : Jean-Pierre a ta perceuse depuis 10 jours
- Action : Appeler Jean-Pierre pour organiser le retour

**`active_borrower`** : Objet emprunté depuis X jours, penser au retour (10 variantes)
- Situation : Tu as l'échelle de Marie depuis 12 jours
- Action : Appeler Marie pour organiser le retour

### Onboarding (1 type)

**`onboarding_create`** : Inciter à ajouter des objets régulièrement (12 variantes)
- Situation : Pas de transactions actives ET <3 objets ajoutés dans les 15 derniers jours
- Action : Redirection vers formulaire "Ajouter un objet"

---

## 3. RÈGLES D'AFFICHAGE

### Priorité des messages

**1. Messages transactions** (priorité absolue)
- Affichés par ordre chronologique : **plus ancien en premier**
- Maximum 5 bandeaux simultanés (si plus, afficher les 5 plus anciens)

**2. Message onboarding** (priorité secondaire)
- **Condition 1** : S'affiche UNIQUEMENT s'il n'y a AUCUN message transaction à afficher
- **Condition 2** : Ne s'affiche PAS si l'utilisateur a ajouté ≥3 objets au cours des 15 derniers jours
- **Résumé** : Incitation régulière, mais masquée si activité récente ou transactions en cours

### Durée d'affichage

- **`pending_*`** : Tant que `status = 'pending'`
- **`accepted_*`** : Tant que `status = 'accepted'` ET `handed_at IS NULL`
- **`active_*`** :
  - Déclenché après **10 jours** (paramétrable)
  - Tant que `status = 'active'` ET `returned_at IS NULL`
- **`onboarding_create`** : Réapparaît régulièrement si conditions réunies

---

## 4. SCHÉMA BASE DE DONNÉES

### Modifications nécessaires

```sql
-- 1. Ajouter colonne pour stocker le message généré
ALTER TABLE loans 
ADD COLUMN push_message TEXT;

-- 2. Ajouter champ genre utilisateur
ALTER TABLE profiles 
ADD COLUMN gender VARCHAR(10); -- 'M', 'F', 'N' (neutre)

-- Mise à jour manuelle pour utilisateurs existants si besoin
-- UPDATE profiles SET gender = 'N' WHERE gender IS NULL;
```

### Détection genre objet

**Option 1 : Dictionnaire automatique** (recommandé)
```javascript
const genreDict = {
  'perceuse': 'F',
  'marteau': 'M',
  'échelle': 'F',
  'scie': 'F',
  // etc.
};
```

**Option 2 : Saisie manuelle**
- Ajouter champ `gender` dans formulaire création objet
- Radio buttons : Masculin / Féminin

---

## 5. VARIABLES À REMPLACER

### Utilisateur

- `{borrower}` / `{owner}` : Prénom (ex: "Jean-Pierre", "Marie")
- `{borrower_il_elle}` / `{owner_il_elle}` : "il" ou "elle"
- `{borrower_il_elle_maj}` / `{owner_il_elle_maj}` : "Il" ou "Elle"
- `{borrower_le_la}` / `{owner_le_la}` : "le" ou "la"
- `{borrower_son_sa}` / `{owner_son_sa}` : "son" ou "sa"

### Objet

- `{item}` : Nom de l'objet (ex: "perceuse")
- `{item_le_la}` : Article défini + objet (ex: "la perceuse")
- `{item_un_une}` : Article indéfini + objet (ex: "une perceuse")
- `{item_ce_cette}` : Démonstratif + objet (ex: "cette perceuse")
- `{item_article}` : Alias de `{item_le_la}`

### Durée (pour `active_*`)

- `{days}` : Nombre de jours depuis handed_at (ex: "10")

---

## 6. WORKFLOW D'IMPLÉMENTATION

### Étape 1 : Génération du message à la création de transaction

**Quand** : À la création d'une transaction (`INSERT INTO loans`)

**Process** :
1. Détecter le type de message selon `status` + rôle utilisateur
   - `status = 'pending'` + côté owner → `pending_owner`
   - `status = 'pending'` + côté borrower → `pending_borrower`
   - `status = 'accepted'` + côté owner → `accepted_owner`
   - `status = 'accepted'` + côté borrower → `accepted_borrower`

2. Sélectionner une variante aléatoire parmi les X disponibles
```javascript
   const messages = MESSAGES_PUSH['pending_owner']; // 12 variantes
   const randomIndex = Math.floor(Math.random() * messages.length);
   const template = messages[randomIndex];
```

3. Remplacer les variables par les vraies valeurs
```javascript
   let message = template
     .replace('{borrower}', borrowerName)
     .replace('{borrower_il_elle}', borrowerGender === 'M' ? 'il' : 'elle')
     .replace('{item}', itemName)
     .replace('{item_le_la}', itemGender === 'M' ? `le ${itemName}` : `la ${itemName}`)
     // etc.
```

4. Stocker dans `loans.push_message`
```javascript
   await db.from('loans')
     .update({ push_message: message })
     .eq('id', loanId);
```

**IMPORTANT** : Ce message reste **persistant** pour toute la durée de la transaction. Ne JAMAIS régénérer.

---

### Étape 2 : Messages `active_*` (rappel après X jours)

**Déclenchement** : Après 10 jours (paramétrable)

**Process** :
1. Cron job quotidien (ou calcul à l'affichage) :
```sql
   SELECT * FROM loans 
   WHERE status = 'active' 
   AND returned_at IS NULL
   AND EXTRACT(DAY FROM NOW() - handed_at) >= 10
   AND push_message_active IS NULL; -- Pas encore généré
```

2. Générer message `active_owner` ou `active_borrower`
   - Remplacer `{days}` par le nombre de jours calculé
   - Stocker dans nouvelle colonne `push_message_active`

3. Afficher ce message en plus du message initial

**Alternative** : Générer `active_*` à la volée lors de l'affichage (pas de stockage)

---

### Étape 3 : Affichage sur le Profil

**Récupération des transactions** :
```javascript
// 1. Récupérer les transactions actives de l'utilisateur
const { data: loans } = await db
  .from('loans')
  .select(`
    id,
    status,
    handed_at,
    returned_at,
    push_message,
    borrower:profiles!borrower_id(name),
    owner:profiles!owner_id(name),
    item:items(name)
  `)
  .or(`borrower_id.eq.${userId},owner_id.eq.${userId}`)
  .in('status', ['pending', 'accepted', 'active'])
  .order('created_at', { ascending: true }); // Plus ancien en premier

// 2. Filtrer selon règles d'affichage
const messagesToDisplay = loans
  .filter(loan => {
    // Masquer active si <10 jours
    if (loan.status === 'active' && loan.handed_at) {
      const days = Math.floor((Date.now() - new Date(loan.handed_at)) / 86400000);
      if (days < 10) return false;
    }
    return true;
  })
  .slice(0, 5); // Maximum 5 bandeaux

// 3. Lire push_message (ne JAMAIS régénérer)
messagesToDisplay.forEach(loan => {
  displayBanner(loan.push_message);
});
```

**Message onboarding** :
```javascript
// Afficher SI aucune transaction + <3 objets dans 15 derniers jours
if (messagesToDisplay.length === 0) {
  const { count } = await db
    .from('items')
    .select('id', { count: 'exact' })
    .eq('owner_id', userId)
    .gte('created_at', new Date(Date.now() - 15 * 86400000).toISOString());
  
  if (count < 3) {
    const onboardingMessages = MESSAGES_PUSH['onboarding_create'];
    const randomMsg = onboardingMessages[Math.floor(Math.random() * onboardingMessages.length)];
    displayBanner(randomMsg);
  }
}
```

---

### Étape 4 : Gestion du genre

**Genre utilisateur** :
- Ajouter champ lors de l'inscription
```html
  <select name="gender">
    <option value="M">Homme</option>
    <option value="F">Femme</option>
    <option value="N">Préfère ne pas préciser</option>
  </select>
```

**Genre objet** :
- **Option 1 (recommandé)** : Dictionnaire automatique
```javascript
  function detectItemGender(itemName) {
    const genreDict = {
      'perceuse': 'F', 'ponceuse': 'F', 'scie': 'F', 'échelle': 'F',
      'marteau': 'M', 'tournevis': 'M', 'escabeau': 'M',
      // etc.
    };
    return genreDict[itemName.toLowerCase()] || 'M'; // Défaut masculin
  }
```

- **Option 2** : Saisie manuelle lors création objet

---

## 7. DESIGN

### Bandeau existant (déjà implémenté)

**CSS** :
- Largeur : 100% avec padding cohérent (16px)
- Hauteur : adaptative selon contenu
- Border-radius : 12px
- Background : Gradient vert (#1F9D55)
- Box-shadow : 0 2px 8px rgba(0,0,0,0.1)
- Dots indicateurs pour navigation (si plusieurs bandeaux)

**Responsive** :
- Scroll horizontal si plusieurs messages
- Fonctionne sur mobile 320px-428px
- TODO RESP-01 : Améliorer responsive global (voir PROJET.md)

---

### CTA (Call To Action) au clic

**Actions par type de message** :

| Type | Action au clic |
|------|----------------|
| `pending_owner` | Ouvrir modal accepter/refuser demande |
| `pending_borrower` | Aucune action (attente passive) |
| `accepted_owner` | Aucune action (attente appel emprunteur) |
| `accepted_borrower` | Ouvrir app Téléphone ou SMS avec numéro du prêteur |
| `active_owner` | Ouvrir app Téléphone ou SMS avec numéro de l'emprunteur |
| `active_borrower` | Ouvrir app Téléphone ou SMS avec numéro du prêteur |
| `onboarding_create` | Redirection vers formulaire "Ajouter un objet" |

**Implémentation** :
```javascript
function handleBannerClick(loanId, messageType) {
  switch(messageType) {
    case 'pending_owner':
      openAcceptRefuseModal(loanId);
      break;
    case 'accepted_borrower':
    case 'active_owner':
    case 'active_borrower':
      const phoneNumber = getPhoneNumber(loanId);
      window.location.href = `tel:${phoneNumber}`;
      break;
    case 'onboarding_create':
      window.location.href = '#panel-add';
      break;
    default:
      // Pas d'action
  }
}
```

---

## 8. QUESTIONS À TRANCHER

### Durée trigger `active_*`

**Options** :
- ⚪ 7 jours
- ✅ **10 jours** (recommandé)
- ⚪ 14 jours

**Décision** : 10 jours semble être un bon équilibre entre laisser le temps et ne pas trop attendre.

---

### Maximum bandeaux simultanés

**Options** :
- ⚪ 3 bandeaux max
- ✅ **5 bandeaux max** (recommandé)
- ⚪ Illimité

**Décision** : 5 max pour éviter le scroll infini, afficher les 5 plus anciens.

---

### Genre objet

**Options** :
- ✅ **Dictionnaire automatique** (recommandé)
- ⚪ Saisie manuelle lors création objet

**Décision** : Dictionnaire auto + fallback masculin si objet inconnu. Saisie manuelle = friction UX.

---

### CTA au clic

**À implémenter** :
- Modal accepter/refuser pour `pending_owner`
- Liens `tel:` pour appeler/SMS
- Redirection vers formulaire pour `onboarding_create`

---

## 9. PLANNING D'IMPLÉMENTATION

### Phase 1 : Préparation (1-2h)
- [ ] Ajouter colonne `push_message` dans table `loans`
- [ ] Ajouter colonne `gender` dans table `profiles`
- [ ] Créer dictionnaire genre objets
- [ ] Fonction de remplacement des variables

### Phase 2 : Génération messages (2-3h)
- [ ] Fonction génération message à la création de transaction
- [ ] Stocker message dans `loans.push_message`
- [ ] Tester génération pour chaque type de message

### Phase 3 : Affichage (2-3h)
- [ ] Récupération transactions actives
- [ ] Filtrage selon règles d'affichage
- [ ] Affichage bandeaux avec scroll horizontal
- [ ] Gestion dots indicateurs (déjà implémenté)

### Phase 4 : CTA (2-3h)
- [ ] Modal accepter/refuser pour `pending_owner`
- [ ] Liens `tel:` pour appeler
- [ ] Redirection formulaire pour `onboarding_create`
- [ ] Tester toutes les actions

### Phase 5 : Messages `active_*` (2-3h)
- [ ] Cron job ou calcul à l'affichage
- [ ] Génération messages avec `{days}`
- [ ] Affichage rappel après 10 jours

### Phase 6 : Tests & Polish (2-3h)
- [ ] Tester tous les types de messages
- [ ] Tester responsive mobile (320px-428px)
- [ ] Tester scroll horizontal multiple bandeaux
- [ ] Polish design si besoin

**Estimation totale** : 12-18h

---

## 10. DOCUMENTATION TECHNIQUE

### Fichiers à modifier

- `index.html` :
  - Fonction génération messages
  - Fonction affichage bandeaux
  - CTA au clic
  - Dictionnaire genre objets

### Fichiers SQL

- `schema.sql` (si existe) :
  - ALTER TABLE loans ADD COLUMN push_message
  - ALTER TABLE profiles ADD COLUMN gender

### Documentation

- `MESSAGES_PUSH.md` : Source de vérité pour les messages
- `PROJET.md` : Ajouter tâche dans historique des sessions

---

**Brief rédigé le 18 Mai 2026**  
**Prêt pour implémentation !**
