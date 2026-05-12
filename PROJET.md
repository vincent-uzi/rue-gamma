# SESSION 13 MAI 2026 — PROFIL REDESIGN + ONGLETS DYNAMIQUES

## Contexte
Suite session précédente (CH-04 parcours emprunt complet fonctionnel avec QR code). Amélioration page Profil avec design plus engageant et onglets dynamiques.

## Redesign Profil — Maquette validée

**Design final :**
- Header compact : avatar initiales + nom/adresse + menu ⋮ (centré verticalement)
- Jauge CO₂ inchangée
- Bandeau(x) push transactions avec accroches catchy, slide horizontal si plusieurs
- 3 onglets cards (N Objets / N Prêtés / N Empruntés) avec border vert sur actif, compteurs 20px
- Suppression titre "Mes objets" + ancien bloc stats

## PRD Bandeau Push Incitatif

**Objectif :** Inciter actions via langage naturel engageant

**Variables :** `{owner}`, `{borrower}`, `{item}`, `{item_article}`

**Catchphrases par combinaison (status, rôle) avec variantes aléatoires :**
- `pending_owner` : "{borrower} lorgne votre {item} — La mérite-t-il ? Décidez !"
- `pending_borrower` : "En attente de {owner} pour {item_article}"
- `accepted_owner` : "Remise à planifier avec {borrower}"
- `accepted_borrower` : "{owner} accepte ! Appelez-le pour récupérer {item_article}"
- `active_owner` : "{item_article} est chez {borrower}"
- `active_borrower` : "Vous empruntez {item_article} à {owner}"

**Articles définis :** liste fermée ~15 objets (perceuse→la perceuse, marteau→le marteau, échelle→l'échelle). Fallback `"l'objet"` si inconnu.

**Design :** gradient vert 135deg `#1F9D55→#17845C`, titre 18px bold + sous-titre 15px, chevron `›` à droite (32px), dots indicateurs si 2+, scroll-snap horizontal.

## Implémentation

**Commits :**
1. Redesign Profil : Header simplifié + Bandeau push + Onglets
2. Fix Profil : Suppression ancien bloc stats + Texte onglets ferré gauche
3. Brancher onglets Profil : Prêtés + Empruntés avec vraies listes
4. Fix : Race condition loadProfileTabs — attendre loadMember()
5. Fix : Guillemets typographiques onclick (15 occurrences)

**Structure HTML :**
- `#transaction-push-container` avec slider scroll-snap + `#push-dots`
- 3 conteneurs `#profile-tab-{objets,prete,emprunte}` avec `display:none/block`
- `switchProfileTab(tab)` toggle affichage + classes `.active`
- `loadProfileTabs()` query Supabase `status IN ('pending','accepted','active')`
- Compteurs dynamiques injectés dans `#tab-{objets,prete,emprunte}-count`

**CSS clé :**
- `.transaction-push` : gradient 135deg, padding 20px, border-radius 16px, min-height 100px
- `.push-title` : 18px 600, `.push-subtitle` : 15px 400
- `.push-chevron` : font-size 32px, à droite
- `.profile-tab` : flex:1, border 2px solid var(--line), border-radius 12px, align-items flex-start, padding-left 16px
- `.profile-tab.active` : background + border accent + color white
- `.profile-tab .tab-count` : 20px 600, `.profile-tab .tab-label` : 13px 500

## Problèmes résolus

### Race Condition loadProfileTabs
`loadMember()` async écrit `member_id` en localStorage après 2 round-trips Supabase. `loadProfileTabs()` démarrait en parallèle et lisait `member_id` avant définition → retour silencieux, listes vides.
**Fix :** `loadMember().then(() => loadProfileTabs())` garantit l'attente.

### Guillemets Typographiques (récurrent)
Guillemets courbes `'` `'` dans attributs `onclick` HTML (ex: `switchProfileTab('prete')`) causaient `SyntaxError: Invalid character '‘'`.
**Fix :** Script Python ciblant les attributs `on*` + blocs `<script>`. À noter : l'éditeur réintroduit ces guillemets à chaque paste — appliquer `sed -i '' "s/'/'/g; s/'/'/g"` après chaque session si nécessaire.

## Actions terminées ✅

- Header Profil simplifié (avatar initiales + nom + menu ⋮)
- Bandeau push avec CATCHPHRASES variées par statut/rôle
- Onglets card design avec compteurs dynamiques
- Branchement Supabase onglets Prêtés/Empruntés
- Race condition loadMember/loadProfileTabs fixée
- Toggle afficher/masquer archivées dans Échanges
- CH-04 Parcours emprunt complet avec QR scan optimisé (session précédente)

## Actions pendantes ⏸️

- CH-03 Notifications (badge cloche + liste)
- DT-09 Policies RLS sécurisées ⚠️ CRITIQUE avant prod
- Splash screen onboarding
- DT-05 RLS Supabase (voir backlog)

---

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
- Dans PROJET.md, ajoute cette section après "Parcours restants à implémenter" :

## Parcours à revoir / spécifier

### Parcours prêt — à re-spécifier
Le parcours emprunt/prêt a été implémenté mais nécessite 
une revue complète :
- Les statuts et transitions entre écrans sont à consolider
- Le processus Remis / Rendu / Récupéré est à clarifier 
  avec des gribouillages
- Les notifications associées à chaque étape sont à définir
- Priorité haute avant branchement Supabase complet
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
