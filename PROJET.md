# Kolkoze — Documentation projet

# Kolkoze — Documentation projet

## Concept
Application web mobile-first de prêt d'objets entre voisins, 
ancrée dans une rue ou un quartier. Le levier de motivation 
est environnemental : chaque objet emprunté plutôt qu'acheté 
est traduit en kg de CO₂ évités.

## Stack technique
- HTML/CSS/JS vanilla — single page application (index.html)
- Supabase — base de données + auth
- Vercel — déploiement
- GitHub — versioning
- API Anthropic — catégorisation IA des objets

## Infrastructure
- GitHub : github.com/vincent-uzi/rue-gamma
- Vercel : rue-gamma.vercel.app
- Supabase : projet rue-gamma

## Schéma base de données
- communities : id, name, street, city, created_at
- members : id, community_id, first_name, last_name, 
  address, email, is_moderator, joined_at
- items : id, community_id, owner_id, name, description, 
  category, co2_saved_kg, status, created_at
- loans : id, item_id, borrower_id, owner_id, status, 
  borrower_comment, owner_comment, requested_at, 
  accepted_at, remised_at, returned_at

## Statuts objet
available → borrowed → unavailable

## Statuts prêt
pending → accepted → active → returned → declined

## Parcours prêt
1. Emprunteur clique "Emprunter" sur fiche objet
2. Propriétaire reçoit notification dans Échanges
3. Propriétaire accepte → popin "À vous de jouer"
4. Statut objet passe à "réservé"
5. L'un ou l'autre clique "Remis" → popin légère 
   (photo + commentaire optionnels)
6. Statut passe à "emprunté"
7. L'un ou l'autre clique "Rendu" → popin légère
8. Statut repasse à "disponible"

## Écrans implémentés
- HomeA — accueil recherche + objets récents
- SearchA — moteur de recherche + badge CO₂
- ItemA — fiche objet + CTA emprunter
- ProfileA — profil + ring CO₂ + onglets objets
- Échanges — demandes + remises + retours
- Ajouter un objet — formulaire + écran succès
- Onboarding — création compte
- Login — connexion email + mot de passe

## Parcours restants à implémenter
- Notifications (cloche header)
- Invitation voisin fonctionnelle

---

## Backlog Dette Technique

### DT-01 — Découpage index.html
Single page app dans un seul fichier — difficile à maintenir.
Migration vers React ou modules JS séparés.
Complexité : 🔴 Élevée — ~15 000 tokens

### DT-02 — Dossier /mobile à supprimer
Vestige React Native — pollue le repo.
Complexité : 🟢 Faible — ~200 tokens

### DT-03 — Upload photos non fonctionnel
Bouton présent mais pas de Supabase Storage.
Complexité : 🟡 Moyenne — ~3 000 tokens

### DT-04 — Catégorisation IA non robuste
Pas de gestion d'erreur ni fallback sur l'appel Anthropic.
Complexité : 🟡 Moyenne — ~2 000 tokens

### DT-05 — RLS Supabase trop permissive
Toutes les policies sont publiques.
À sécuriser avant mise en production.
Complexité : 🔴 Élevée — ~5 000 tokens

### DT-06 — PWA non testée iPhone
Safe area, offline, gestes iOS non vérifiés.
Complexité : 🟢 à 🟡 — ~1 000 tokens

### DT-07 — Données statiques résiduelles
Profil et échanges encore partiellement hardcodés.
Complexité : 🟡 Moyenne — ~4 000 tokens

### DT-08 — Pas de back-office admin
Gestion membres et communautés en SQL uniquement.
Complexité : 🔴 Élevée — ~10 000 tokens
