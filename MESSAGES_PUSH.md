# Messages Push - Rue Gamma

## Tonalité éditoriale

### Persona : Le Voisin Bienveillant

**Personnalité :**
- **Amical mais pas familier** : Tutoiement naturel, pas de "mon pote" ou "ma poule"
- **Léger humour** : Pointes d'ironie douce, jeux de mots subtils
- **Positif** : Encourage la confiance et l'entraide
- **Direct** : Phrases courtes, pas de blabla
- **Respectueux** : Jamais condescendant ou moralisateur

**Tonalité :**
- **Chaleureux** : On se parle entre voisins qui se respectent
- **Ludique** : Un soupçon d'espièglerie (ex: "miroite", "lorgne")
- **Pragmatique** : On va à l'essentiel
- **Non-corporate** : Pas de "Nous vous informons que..."

**Ce qu'on fait :**
✅ Jeux de mots légers ("miroite", "flash", "coup de cœur")  
✅ Questions directes ("Vous validez ?", "C'est parti ?")  
✅ Variété tonale (parfois sérieux, parfois joueur)  
✅ Verbes d'action ("Organisez", "Appelez", "Pensez à")

**Ce qu'on évite :**
❌ Langage corporate ("Nous vous informons", "Veuillez")  
❌ Familiarité excessive ("mon pote", "ma poule", emojis)  
❌ Culpabilisation ("Vous devriez", "Il faut")  
❌ Registre de la confiance/méfiance  
❌ Longueur excessive (max 2 phrases)

---

## Variables disponibles

### Utilisateur
- `{borrower}` : Prénom de l'emprunteur (ex: "Jean-Pierre", "Marie")
- `{borrower_il_elle}` : "il" ou "elle"
- `{borrower_il_elle_maj}` : "Il" ou "Elle"
- `{borrower_le_la}` : "le" ou "la"
- `{borrower_son_sa}` : "son" ou "sa"
- `{owner}` : Prénom du propriétaire
- `{owner_il_elle}` : "il" ou "elle"
- `{owner_le_la}` : "le" ou "la"

### Objet
- `{item}` : Nom de l'objet (ex: "perceuse", "échelle")
- `{item_le_la}` : "la perceuse", "le marteau"
- `{item_un_une}` : "une perceuse", "un marteau"
- `{item_ce_cette}` : "cette perceuse", "ce marteau"
- `{item_article}` : Article défini + objet ("la perceuse")

### Durée (pour messages active)
- `{days}` : Nombre de jours (ex: "10")

---

## Messages par type de transaction

### `pending_owner` - Demande d'emprunt (côté propriétaire)

**Situation** : Jean-Pierre veut emprunter ta perceuse

**12 variantes :**

1. "{borrower} s'intéresse de près à votre {item}. Accepterez-vous le deal ?"
2. "Votre {item} fait de l'œil à {borrower}. Vous lui prêtez ?"
3. "{borrower} veut emprunter votre {item}. Partant·e ?"
4. "Votre {item} est convoité·e par {borrower}. On dit oui ?"
5. "{borrower} aimerait emprunter {item_le_la}. Ça vous tente ?"
6. "Demande de {borrower} : emprunter {item_le_la}. Banco ?"
7. "{borrower} voudrait bien {item_le_la}. Ça marche pour vous ?"
8. "{borrower} lorgne {item_le_la}. Go ou no go ?"
9. "{borrower} rêve de votre {item}. Allez-vous céder ?"
10. "{borrower} demande {item_le_la}. On partage ?"
11. "Faites plaisir à {borrower} en lui prêtant votre {item}."
12. "{borrower} rêve de votre {item}. Exaucez-le !"

---

### `pending_borrower` - Demande d'emprunt (côté emprunteur)

**Situation** : Tu as demandé à emprunter la scie de Vincent, tu attends sa réponse

**12 variantes :**

1. "{item_le_la} de {owner} : la balle est dans son camp."
2. "{owner} consulte son cœur (et son calendrier de travaux) pour {item_le_la}."
3. "{item_le_la} : {owner} pèse le pour et le contre."
4. "Demande envoyée à {owner} pour {item_le_la}. Réponse sous peu !"
5. "{owner} étudie votre demande pour {item_le_la}."
6. "En attente de {owner} pour {item_le_la}. Suspense !"
7. "Demande transmise à {owner} pour {item_le_la}. Réponse bientôt !"
8. "{item_le_la} demandé·e à {owner}. {owner_il_elle_maj} réfléchit..."
9. "{owner} prend son temps pour {item_le_la}. Patience !"
10. "Votre demande pour {item_le_la} attend le feu vert de {owner}."
11. "{item_le_la} : {owner} consulte son agenda et son stock de bonne volonté."
12. "Demande pour {item_le_la} envoyée. {owner} va-t-{owner_il_elle} dire banco ?"

**Tonalité :**
- ✅ Ludique ("la balle est dans son camp", "stock de bonne volonté", "banco")
- ✅ L'objet est TOUJOURS mentionné
- ✅ Varié (neutre à joueur)
- ✅ Pas culpabilisant

---

### `accepted_borrower` - Accepté, organiser RDV (côté emprunteur)

**Situation** : Vincent a accepté de te prêter son escabeau, c'est à TOI de l'appeler pour organiser

**Règle** : C'est à l'emprunteur de contacter le prêteur pour organiser l'échange

**12 variantes :**

1. "{owner} accepte de vous prêter {item_le_la} ! Contactez-{owner_le_la} pour organiser l'échange."
2. "C'est oui ! Contactez {owner} pour récupérer {item_le_la}."
3. "{owner} dit banco ! À vous de fixer un RDV pour récupérer {item_le_la}."
4. "Bonne nouvelle : {owner} vous prête {item_le_la}. Contactez-{owner_le_la} !"
5. "{item_le_la} est disponible ! Reste à appeler {owner} pour organiser ça."
6. "Youpi ! {owner} vous prête {item_le_la}. Fixez un créneau avec {owner_le_la}."
7. "{owner} valide ! Contactez-{owner_le_la} pour récupérer {item_le_la}."
8. "Échange conclu ! Organisez la remise de {item_le_la} avec {owner}."
9. "{item_le_la} vous attend ! Prenez RDV avec {owner}."
10. "C'est dans la poche ! Contactez {owner} pour la passation de {item_le_la}."
11. "{owner} vous fait confiance. À vous de jouer pour récupérer {item_le_la} !"
12. "Ça roule ! Téléphonez à {owner} pour récupérer {item_le_la}."

**Tonalité :**
- ✅ Encourageant ("C'est oui !", "Youpi !", "Ça roule !")
- ✅ Appel à l'action clair ("Contactez", "Appelez", "Organisez")
- ✅ Responsabilisation emprunteur ("À vous de...", "Reste à...")

---

### `accepted_owner` - Accepté, attendre que l'emprunteur contacte

**Situation** : Tu as accepté de prêter ta ponceuse à Marie, c'est à ELLE de t'appeler pour organiser

**Règle** : C'est l'emprunteur qui contacte le prêteur (pas l'inverse)

**8 variantes :**

1. "Vous avez dit oui ! {borrower} va vous contacter pour récupérer {item_le_la}."
2. "{borrower} sait que vous acceptez. {borrower_il_elle_maj} devrait vous appeler bientôt."
3. "Deal validé ! Attendez l'appel de {borrower} pour {item_le_la}."
4. "Vous prêtez {item_le_la} à {borrower}. {borrower_il_elle_maj} va organiser la remise."
5. "C'est parti ! {borrower} va prendre contact pour récupérer {item_le_la}."
6. "Bravo pour le partage ! {borrower} vous appellera pour {item_le_la}."
7. "{borrower} est prévenu·e. Attendez son appel pour {item_le_la}."
8. "Vous avez accepté ! {borrower} va vous contacter pour fixer un RDV."

**Tonalité :**
- ✅ Encourageant ("Bravo", "C'est parti")
- ✅ Clair sur le process (emprunteur contacte prêteur)
- ✅ Pas d'action requise côté propriétaire (attente passive)

---

### `active_owner` - En cours, rappel après X jours (côté propriétaire)

**Situation** : Jean-Pierre a ta perceuse depuis 10 jours, petit rappel pour organiser le retour

**Déclenchement** : Afficher ce bandeau si l'objet est emprunté depuis plus de X jours (à définir : 7, 10, 14 jours ?)

**8 variantes :**

1. "Votre {item} est chez {borrower} depuis {days} jours. Organisez son retour !"
2. "Votre {item} vous manque ? Demandez à {borrower} de vous {item_le_la} rendre."
3. "Avez-vous récupéré {item_le_la} ? {borrower} a peut-être oublié..."
4. "Votre {item} manque à l'appel ? Contactez {borrower}."
5. "{borrower} a {item_le_la} depuis {days} jours. Contactez-{borrower_le_la} !"
6. "{days} jours que {borrower} utilise {item_le_la}. Prévoyez le retour."
7. "Besoin de {item_le_la} ? {borrower} {item_le_la} a depuis {days} jours."
8. "{days} jours déjà ! Rappelez à {borrower} de rendre {item_le_la}."

**Tonalité :**
- ✅ Direct et responsabilisant ("Organisez", "Demandez", "Contactez")
- ✅ Pas accusateur (questions, suggestions)
- ✅ Informatif (durée claire avec {days})

---

### `active_borrower` - En cours, rappel après X jours (côté emprunteur)

**Situation** : Tu as l'échelle de Marie depuis 12 jours, rappel pour organiser le retour

**Déclenchement** : Afficher ce bandeau si l'emprunteur a l'objet depuis plus de X jours (à définir : 7, 10, 14 jours ?)

**10 variantes :**

1. "Vous avez {item_le_la} de {owner} depuis {days} jours. Pensez au retour !"
2. "{item_le_la} de {owner} est chez vous depuis {days} jours. Organisez le retour."
3. "{days} jours déjà ! Pensez à rendre {item_le_la} à {owner}."
4. "N'oubliez pas de rendre {item_le_la} à {owner} ({days} jours)."
5. "Vous utilisez {item_le_la} depuis {days} jours. {owner} attend peut-être..."
6. "{item_le_la} chez vous depuis {days} jours. Contactez {owner} pour le retour !"
7. "{days} jours que vous avez {item_le_la}. Prévoyez la restitution à {owner}."
8. "Avez-vous fini avec {item_le_la} ? {owner} attend depuis {days} jours."
9. "{item_le_la} : {days} jours chez vous. Appelez {owner} pour organiser le retour."
10. "Vous gardez {item_le_la} de {owner} depuis {days} jours. Pensez au retour !"

**Tonalité :**
- ✅ Rappel amical mais ferme ("Pensez à", "N'oubliez pas")
- ✅ Responsabilisant ("Organisez", "Contactez", "Prévoyez")
- ✅ Pas culpabilisant (suggestions, pas accusations)
- ✅ Informatif (durée claire avec {days})

### `onboarding_create` - Inciter à créer des objets

**Situation** : L'utilisateur a 0-2 objets, on veut l'encourager à en ajouter pour participer

**Déclenchement** : Afficher ce bandeau si l'utilisateur a moins de 3 objets

**12 variantes :**

1. "Votre garage regorge d'objets inutilisés. Vos voisins peuvent les utiliser - **partagez-les !**"
2. "Cet objet que vous utilisez 2 fois par an ? **Partagez-le !**"
3. "Challenge : ajoutez 5 objets (ou plus) à la communauté. **C'est parti !**"
4. "Rencontrez vos voisins grâce aux objets que vous partagez. **Ajoutez un objet !**"
5. "Un objet qui traîne chez vous pourrait servir à quelqu'un. **Ajoutez-le !**"
6. "Vous avez sûrement des outils à partager. **Ajoutez-en un !**"
7. "Plus vous partagez, plus vous pouvez emprunter. **Ajoutez un objet !**"
8. "Partagez ce qui dort chez vous. Quelqu'un en a besoin. **Ajoutez-le !**"
9. "Un objet ajouté = une rue plus solidaire. **Lancez-vous !**"
10. "Transformez vos objets dormants en ressources utiles. **Ajoutez un objet !**"
11. "Votre échelle, votre perceuse, votre scie... **Partagez-les !**"
12. "Votre perceuse dort au garage ? **Ajoutez-la à la communauté !**"

**Tonalité :**
- ✅ Encourageant (pas culpabilisant)
- ✅ Concret (exemples d'objets précis)
- ✅ Bénéfice clair ("servir à quelqu'un", "plus solidaire")
- ✅ Questions ouvertes ("C'est parti ?")

**CTA** : Clic sur le bandeau → Redirection vers le formulaire "Ajouter un objet"

---

**TOUS LES 7 TYPES DE MESSAGES PUSH SONT MAINTENANT COMPLÉTÉS !** ✅

---

## Implémentation technique

### Stockage en DB

Ajouter colonne `push_message` dans table `loans` :

```sql
ALTER TABLE loans 
ADD COLUMN push_message TEXT;
```

### Génération du message

À la **création de la transaction** :
1. Détecter le type de message selon le statut et le rôle (owner/borrower)
2. Sélectionner une variante aléatoire parmi les 10-12 disponibles
3. Remplacer les variables par les vraies valeurs
4. Stocker dans `loans.push_message`

### Affichage

Toujours lire `loans.push_message` depuis la DB - **jamais régénérer**.

Le message reste **persistant** pour toute la durée de la transaction.

---

**Date de création** : 17 mai 2026  
**Dernière mise à jour** : 18 mai 2026  
**Statut** : Complété ✅ (7 types documentés)
