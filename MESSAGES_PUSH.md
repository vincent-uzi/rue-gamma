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

### `accepted_owner` - Accepté → organiser RDV (côté propriétaire)

**Situation** : Tu as accepté de prêter ta ponceuse à Marie

**À COMPLÉTER** (10-12 variantes)

---

### `accepted_borrower` - Accepté → organiser RDV (côté emprunteur)

**Situation** : Vincent a accepté de te prêter son escabeau

**À COMPLÉTER** (10-12 variantes)

---

### `active_owner` - En cours, rappel après X jours (côté propriétaire)

**Situation** : Jean-Pierre a ta perceuse depuis 10 jours

**À COMPLÉTER** (10-12 variantes)

---

### `active_borrower` - En cours, rappel après X jours (côté emprunteur)

**Situation** : Tu as l'échelle de Marie depuis 12 jours

**À COMPLÉTER** (10-12 variantes)

---

### `onboarding_create` - Inciter à créer des objets

**Situation** : L'utilisateur a 0-2 objets, on veut l'encourager à en ajouter pour participer

**Déclenchement** : Afficher ce bandeau si l'utilisateur a moins de 3 objets

**12 variantes :**

1. "Votre perceuse dort au garage ? Partagez-la avec vos voisins !"
2. "Un objet qui traîne chez vous pourrait servir à quelqu'un d'autre."
3. "Vous avez sûrement des outils à partager. Ajoutez-en un !"
4. "Plus vous partagez, plus vous pouvez emprunter. Ajoutez un objet !"
5. "Votre rue regorge d'objets inutilisés. Commencez par le vôtre !"
6. "Partagez ce qui dort chez vous. Quelqu'un en a besoin."
7. "Un objet ajouté = une rue plus solidaire. C'est parti ?"
8. "Cette perceuse que vous utilisez 2 fois par an ? Partagez-la !"
9. "Transformez vos objets dormants en ressources utiles."
10. "Ajoutez un objet, c'est ouvrir la porte à vos voisins."
11. "Votre échelle, votre perceuse, votre scie... Partagez-les !"
12. "Un objet partagé, c'est un objet qui vit vraiment."

**Tonalité :**
- ✅ Encourageant (pas culpabilisant)
- ✅ Concret (exemples d'objets précis)
- ✅ Bénéfice clair ("servir à quelqu'un", "plus solidaire")
- ✅ Questions ouvertes ("C'est parti ?")

**CTA** : Clic sur le bandeau → Redirection vers le formulaire "Ajouter un objet"

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
**Statut** : En cours (pending_owner complété, reste 5 types)
