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

# CHANTIER : PROFIL & BANDEAU PUSH — Règles de gestion et UI

## 1. RÈGLES DE GESTION BANDEAU PUSH

### Périmètre : Phases de gestion d'une demande uniquement

Le bandeau push ne concerne QUE les 3 phases actives de gestion :

**Phase 1 : Demande d'emprunt**
- Status : `pending`
- Affichage :
  * Owner : "{borrower} miroite votre {item}. La mérite-t-il ?"
  * Borrower : "En attente de réponse de {owner} pour {item}"

**Phase 2 : Acceptation → Organiser RDV**
- Status : `accepted`
- Affichage :
  * Owner : "Vous avez dit oui ! Organisez la remise avec {borrower}"
  * Borrower : "{owner} accepte ! Appelez-le pour récupérer {item_article}"

**Phase 3 : Valider l'échange**
- Status : `accepted` (entre acceptation et handed_at)
- Affichage : Idem Phase 2 jusqu'à validation QR

**Objets empruntés (status `active`) :**
- **Règle générale** : PAS de bandeau push — apparaissent dans les onglets Prêtés/Empruntés
- **Exception** : Si durée > X jours → bandeau rappel :
  * Owner : "{borrower} a {item_article} depuis {days} jours"
  * Borrower : "Pensez à rendre {item_article} à {owner} (depuis {days} jours)"

### Durée d'alerte à définir
- Option 1 : 7 jours
- Option 2 : 14 jours
- Option 3 : Paramétrable par objet (durée emprunt attendue)

**⚠️ DÉCISION À PRENDRE** : Quelle durée trigger le bandeau rappel ?

---

## 2. AMÉLIORATION COPYWRITING BANDEAU PUSH

### Problème actuel
- Accroches pas assez incitatives
- Ton à affiner selon contexte
- Manque de variété dans certaines catégories

### Actions
1. Enrichir CATCHPHRASES avec plus de variantes (5-7 par catégorie)
2. Tester différents registres :
   - Urgent : "Répondez vite à {borrower} !"
   - Amical : "{borrower} compte sur vous"
   - Ludique : "{borrower} rêve de votre {item}"
3. A/B test sur engagement (taux de clic)

### Brief design bandeau push
**Objectif** : Rendre le bandeau plus incitatif et visible

**Problème actuel :**
- Bandeau coupé visuellement
- Pas assez accrocheur
- Manque de hiérarchie visuelle

**Contraintes techniques :**
- Gradient vert (`#1F9D55 → #17845C`) à conserver
- Charte Kolkoze
- Mobile-first (viewport 375px)
- Slide horizontal si plusieurs bandeaux
- Chevron `›` à droite

**Éléments à designer :**
- Titre principal (18px bold actuellement)
- Sous-titre/CTA (15px actuellement)
- Chevron/icône d'action
- Dots indicateurs (si plusieurs)
- État hover/tap (feedback visuel)

**Inspiration/Direction :**
- Notification push iOS (élégance + urgence)
- Cartes Material Design (profondeur)
- Duolingo notifications (ton friendly + incitatif)

**Livrables attendus :**
- Spécifications CSS (padding, font-size, border-radius, shadows)
- États : normal, hover, active
- Animation si pertinent (ex: pulse subtil)

---

## 3. SIMPLIFICATION PARCOURS TRANSACTION

### Problème
Cheminement encore complexe pour l'utilisateur

### Actions
- [ ] Cartographier le parcours actuel (demande → acceptation → remise → retour)
- [ ] Identifier les points de friction
- [ ] Simplifier les étapes redondantes
- [ ] Améliorer feedback utilisateur à chaque étape
- [ ] Tester avec utilisateurs réels

**TODO** : Session de diagnostic UX avec screenshots du parcours complet

---

## 4. UI À AMÉLIORER (LISTE OUVERTE)

- [ ] Bandeau push (cf. section 2)
- [ ] Thread transaction (lisibilité, hiérarchie)
- [ ] Boutons CTA (taille, couleur, position)
- [ ] Feedback validation (confettis actuels suffisants ?)
- [ ] ?

**TODO** : Lister précisément les éléments à retravailler

---

## 5. CALCUL ÉQUIVALENTS CARBONE

### Questions ouvertes
- Source des données CO₂ par objet ?
- Formule de calcul (achat évité ? production évitée ?)
- Équivalences parlantes (km en voiture, arbres plantés, etc.)
- Crédibilité scientifique (source ADEME ?)

### Actions
- [ ] Rechercher bases de données fiables (ADEME, Base Carbone)
- [ ] Définir méthodologie transparente
- [ ] Documenter sources dans l'app (page À propos ?)
- [ ] Valider calculs avec expert si possible

**TODO** : Session dédiée avec recherche documentaire

---

## PRIORISATION PROPOSÉE

1. **Règles gestion bandeau** (1-2h) → impact immédiat sur l'expérience
2. **UI bandeau** (1-2h) → amélioration visuelle rapide
3. **Simplification parcours** (3-4h) → analyse + implémentation
4. **Calcul CO₂** (4-6h) → recherche + validation + implémentation
5. **UI générale** (continu) → itérations progressives

---

# RÉCONCILIATION DESIGN SYSTEM

## Contexte
Un Design System initial a été créé avec Claude Design en début de projet. Au fil des sessions, des écarts se sont créés (bandeau push, onglets pills, couleurs gradient, etc.). Il faut raccrocher les wagons.

## Plan d'action

### 1. Retrouver le DS initial
- Chercher la conversation Claude.ai où le DS a été créé
- Extraire les specs (couleurs, typo, composants, spacing)
- Créer `DESIGN_SYSTEM.md` à la racine avec le DS initial

### 2. Audit des écarts
Avec Claude Code, comparer DS initial vs implémentation actuelle dans `index.html` :
- Couleurs qui dérivent
- Font-sizes hors système
- Padding/spacing custom
- Nouveaux composants non documentés

**Produire rapport** : liste des incohérences + plan de migration

### 3. Réconciliation avec Claude Design
Session Claude.ai pour valider :
- Nouveaux composants (bandeau push, onglets pills)
- Écarts à corriger
- Améliorations cohérentes

**Livrable** : `DESIGN_SYSTEM.md` v2 propre et à jour

### 4. Migration progressive
Avec Claude Code, remplacer les valeurs hardcodées :
1. Couleurs (`#hex` → `var(--)`)
2. Font-sizes (normaliser sur scale DS)
3. Spacing (padding custom → scale DS)
4. Border-radius (normaliser)

**1 commit par catégorie** pour rollback si besoin

---

## Fichiers à créer

### DESIGN_SYSTEM.md (structure cible)

```markdown
# Design System Kolkoze

## État actuel
Version : 1.1 (13 mai 2026)
Dernière mise à jour : Session redesign Profil

## Écarts connus vs DS initial
- Bandeau push : nouveau composant
- Couleur accent dark (#17845C) : ajoutée pour gradient
- Onglets pills : nouveau pattern

## Couleurs
### Primaires
- `--accent`      : #1F9D55
- `--accent-dark` : #17845C (gradient bandeau push)

### Neutrals
- `--text`         : #1A1A1C
- `--text-muted`   : rgba(60,60,67,0.62)
- `--line`         : rgba(60,60,67,0.12)
- `--surface`      : #FFFFFF
- `--surface-alt`  : #F7F7F5

## Typographie
[à compléter depuis DS initial]

## Composants
### Bandeau Push
**Usage** : Notifications incitatives profil
**Specs** : [à documenter]

### Onglets Pills (Profile)
**Usage** : Navigation Profil
**Specs** : [à documenter]
```

---

## Workflow Design ↔ Code

### Itération design (Claude.ai)
1. Ouvrir conversation Claude.ai classique
2. Brief avec contexte DS actuel
3. Itérer sur artifact interactif
4. Extraire specs CSS finales

### Intégration code (Claude Code)
1. Copier specs CSS validées
2. Intégrer dans `index.html`
3. Tester
4. Commit

---

## TODO IMMÉDIAT

- [ ] Retrouver conversation DS initial (Claude.ai)
- [ ] Créer `DESIGN_SYSTEM.md` avec DS initial
- [ ] Audit écarts avec Claude Code
- [ ] Session réconciliation avec Claude Design
- [ ] Migration progressive (1 commit par catégorie)

**PRIORISATION** : À faire avant les gros chantiers UI (bandeau push, parcours, etc.) pour assurer la cohérence.

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
