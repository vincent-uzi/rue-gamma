# ÉTAT DES FONCTIONNALITÉS

Dernière mise à jour : 19 mai 2026 22:30

---

# 🎯 RED ROUTES & PLAN TEST RUE

## Objectif du test

**MVP/Prototype à proposer aux voisins de la rue**  
**Cible :** 5-10 personnes (test utilisateur réel en conditions naturelles)  
**Timeline :** Lancement prévu dans 2 semaines

## Red Routes prioritaires

### ✅ RED ROUTE 1 : Création de compte + invitation
**Status :** ⚠️ PARTIELLEMENT PRÊT

**Ce qui fonctionne :**
- Onboarding fonctionnel (création compte)
- Auth Supabase opérationnelle

**Ce qui MANQUE :**
- ❌ Système d'invitation par membre (pas implémenté)
- ❌ Workflow de validation modérateur (pas implémenté)
- ❌ Gestion multi-communautés (structure DB anticipée, pas codée)

**Solution temporaire pour test :**
- Comptes créés manuellement en SQL par Vincent
- Bypass invitation pour Phase 1
- Système invitation = Phase 2 après feedback

### ✅ RED ROUTE 2 : Ajout objet incitatif dès onboarding
**Status :** ⚠️ PARTIELLEMENT PRÊT

**Ce qui fonctionne :**
- Formulaire ajout objet complet
- Upload photo opérationnel
- Catégorisation IA

**Ce qui MANQUE :**
- ❌ Onboarding ne pousse PAS vers ajout objet (pas de tunnel guidé)
- ❌ Pas de blocage si user skip

**Action requise :**
- Modifier onboarding : redirection auto vers 'Ajouter un objet' après inscription
- Écran intermédiaire : 'Partagez votre premier objet ! 🎉'
- **Estimation :** 1-2h

### ✅ RED ROUTE 3 : Recherche + flow prêt complet
**Status :** ✅ 100% FONCTIONNEL

**Ce qui fonctionne :**
- Moteur de recherche opérationnel
- Page 0 résultat avec 'Avis de recherche'
- Parcours emprunt complet (Demander → Accepter → Remettre → Retourner)
- QR codes scan + validation manuelle
- Onglet Transactions restructuré en 4 phases

**Rien à faire, prêt pour le test ! 🎉**

### ✅ RED ROUTE 4 : Incitation CO₂
**Status :** ✅ FONCTIONNEL

**Ce qui fonctionne :**
- Calcul CO₂ par objet (catégorisation IA)
- Ring CO₂ dans Profil (niveau 3 / X kg évité)
- Badge CO₂ sur toutes les cards objets

**Améliorations futures (Phase 2) :**
- Écran 'Impact CO₂' dédié avec graphique
- Comparaison communauté
- Notifications 'Tu as évité X kg ce mois-ci'

**Suffisant tel quel pour le test.**

### ❌ RED ROUTE 5 : BO création + suivi communautés
**Status :** ❌ PAS IMPLÉMENTÉ

**Ce qui manque :**
- ❌ Back-office admin (interface web)
- ❌ CRUD communautés
- ❌ CRUD membres
- ❌ Dashboard suivi activité

**Solution temporaire pour test :**
- Gestion en SQL directement dans Supabase
- Tables déjà créées : communities, members, items, loans
- **BO custom = Phase 2 après validation concept**
- **Estimation si implémentation :** 10-15h

---

## 📋 PLAN D'ACTION TEST RUE

### ⚡ OPTION RETENUE : 'Smart MVP' (10-14h)

**Stratégie :** Implémenter le strict minimum pour red routes + sécurité de base

### 🔥 Chantiers OBLIGATOIRES avant lancement (priorité ordre)

#### 1. VIEWPORT-01 : Configuration mobile + Safe-area (1-2h) 🚨 BLOQUANT UX
**Pourquoi obligatoire :**
- Sans ça, UI cassée sur certains iPhone (notamment SE 320px)
- Première impression critique : 'proto qui marche pas' vs 'app pro'
- Coût/bénéfice énorme (1-2h pour gain UX majeur)

**Actions :**
- Meta viewport configuré (width=device-width, user-scalable=no, viewport-fit=cover)
- Safe-area iPhone (env(safe-area-inset-top/bottom))
- PWA manifest (display: standalone, orientation: portrait)
- Tests rapides sur 3 tailles (iPhone SE / 13 / 14 Pro Max)

#### 2. ONBOARD-01 : Tunnel guidé vers ajout objet (1-2h) 🎯 RED ROUTE 2
**Pourquoi obligatoire :**
- Sans ça, users finissent onboarding sans ajouter d'objet
- Communauté vide = pas de valeur
- Red route critique pour engagement initial

**Actions :**
- Redirection auto vers 'Ajouter un objet' après inscription
- Écran intermédiaire : 'Partagez votre premier objet pour rejoindre la communauté !'
- Message encourageant avant formulaire

#### 3. CH-03 : Notifications badge (3-4h) 🔔 ENGAGEMENT
**Pourquoi obligatoire :**
- Sans ça, users ne voient pas les demandes de prêt
- Engagement critique pour test
- Feedback visuel nécessaire

**Actions :**
- Badge rouge sur onglet Transactions
- Compteur notifications non lues
- INSERT notifications lors des actions
- Marquer comme 'lu'

#### 4. Tests multi-devices (1-2h) ✅ VALIDATION
**Actions :**
- Parcours complet sur iPhone SE / 13 / 14 Pro Max
- Vérifier responsive sur 320px-428px
- Tests QR codes
- Tests ajout photo

---

### 📅 Timeline recommandée

**Semaine 1 (6-10h dev) :**
- Lundi : Viewport + Safe-area (1-2h)
- Mardi : Onboarding → Ajout objet (1-2h)
- Mercredi-Jeudi : Notifications badge (3-4h)
- Vendredi : Tests devices (1-2h)

**Semaine 2 :**
- Création 5-10 comptes voisins manuellement (SQL)
- Envoi login/password
- **🚀 LANCEMENT TEST RUE**

**Après 2-3 semaines de feedback :**
- Si ça marche → Coder système invitation + BO
- Si ça marche pas → Pivoter avant d'investir 20h+

---

### ⏸️ Chantiers DIFFÉRÉS (Phase 2 post-feedback)

**Nice-to-have mais pas bloquants :**
- RESP-01 : Responsive audit complet (4-6h) → Viewport suffit pour Phase 1
- CH-05 : Upload photo amélioré compression + crop (2-3h)
- Splash screen (1-2h)
- Section 'Bouteilles à la mer' sur Home (2-3h)
- Notification retour 'Avis de recherche' visuelle (1-2h)
- Réactiver limite anti-spam 1/24h
- Expiration auto avis recherche 7j
- Système invitation membre complet (4-6h)
- Back-office admin (10-15h)
- NOTIF-01 : Notifications email sélectives (4-6h) → voir specs ci-dessous

---

### NOTIF-01 : Notifications email sélectives

**Contexte :**
Badge navbar Transactions fonctionne (CH-03) mais pas de notif quand app fermée.
Email = réactivité immédiate pour demandes critiques.

**Périmètre :**
- Email UNIQUEMENT pour événements critiques :
  1. Demande de prêt reçue ("Jean-Pierre veut emprunter votre perceuse")
  2. Prêt accepté ("Vincent a accepté de vous prêter son escabeau")
- Pas d'email pour : réponses bouteilles, rappels retour (badge suffit)

**Template email minimaliste :**
```
Sujet : [Prénom] veut emprunter votre [objet]

Bonjour [Prénom],

[Prénom emprunteur] a demandé à emprunter votre [objet].

👉 Ouvrir l'app pour répondre : [lien deep link]

---
FLO · Front de Libération des Objets
[Lien désinscription]
```

**Stack technique :**
- Service email : Resend (recommandé, 100 emails/jour gratuit) ou SendGrid
- Supabase Edge Functions pour trigger
- Table `email_preferences` pour opt-in/opt-out
- Deep links vers app (ex: `flo://transaction/[id]`)

**Implémentation :**
1. Setup Resend API (30min)
2. Créer templates HTML emails (1-2h)
3. Edge Function trigger INSERT notifications (1-2h)
4. Gestion opt-in/opt-out (1-2h)
5. Deep links (1h)
6. Tests (1h)

**Estimation :** 4-6h

**Priorité :** Phase 2 (après feedback test rue)

**Décisions à prendre :**
- Opt-in obligatoire (RGPD) ou opt-out ?
- Fréquence max emails/jour (ex: max 3/jour) ?

**Status :** BACKLOG ⏸️

---

### 🎯 Couverture Red Routes après chantiers obligatoires

| Red Route | Avant | Après |
|-----------|-------|-------|
| 1. Création compte | ⚠️ Manuel | ⚠️ Manuel (OK pour test) |
| 2. Ajout objet onboarding | ❌ | ✅ Tunnel guidé |
| 3. Recherche + prêt | ✅ | ✅ |
| 4. CO₂ | ✅ | ✅ |
| 5. BO admin | ❌ | ❌ (SQL direct) |

**Verdict : Suffisant pour tester le concept avec 10 voisins.**

---

## ✅ TERMINÉ

### CH-04 : Parcours emprunt complet
- Demander à emprunter
- Accepter/Décliner
- Validation QR remise (scan + manuel)
- Statut Emprunté/Prêté
- Validation QR retour
- **Status : COMPLET ET FONCTIONNEL** ✅

### Redesign Profil
- Header simplifié
- Bandeau push catchy (avec copywriting à affiner)
- Onglets pills dynamiques
- **Status : FONCTIONNEL** ✅

### Toggle archivées
- Afficher/masquer archivées dans Transactions
- **Status : FONCTIONNEL** ✅

### Page 0 résultat (moteurs de recherche) - Refonte complète
- Icône bouteille à la mer (SVG vert charte #00A651)
- Textes FLO : "Lancez une bouteille à la mer !"
- Fix keyboard overlap (padding-bottom 300px)
- Scroll to top avant ouverture modal
- Bouton désactivé après envoi
- Logique dupliquée sur page Objets
- **Status : COMPLET ET FONCTIONNEL** ✅

### Onglet 'Transactions' (ex-Demandes) - Restructuration complète
- 4 sections par phase de prêt :
  - Demandes de prêts à valider (badge rouge)
  - En attente du propriétaire
  - Organiser la remise
  - Planifier le retour
- Toggle archivées accessible
- Suppression logique "Bouteilles à la mer" (déplacée ailleurs)
- **Status : COMPLET ET FONCTIONNEL** ✅

### Template card unifié 2 lignes - Design System
- Structure : Titre objet (ellipsis) + Chevron / Pills user + CO₂
- Pill "Vous" : vert #00A651
- Pill autre user : gris #F0F0F0
- Pill CO₂ : fond #E8F5E9, texte #00A651
- Déployé sur : Home, Profil (Objets/Prêtés/Empruntés), Transactions, SERP, Page Objets
- **Status : COMPLET ET FONCTIONNEL** ✅

### DT-09 : Policies RLS sécurisées
- Architecture simplifiée : members.id = auth.users.id
- Colonne auth_user_id supprimée (inutile)
- 4 policies INSERT strictes :
  - items : auth.uid() = owner_id
  - loans : auth.uid() = borrower_id
  - search_requests : auth.uid() = requester_id
  - search_request_responses : auth.uid() = responder_id
- Policies SELECT restent publiques (lecture ouverte OK pour MVP)
- **Status : COMPLET ET FONCTIONNEL** ✅
- **Testé : Parcours complet Demande → Validation → Remise → Restitution**

---

## ❌ À FAIRE

### CH-03 : Notifications
- Badge rouge sur onglet Transactions
- Compteur notifications non lues
- INSERT notifications lors des actions
- Marquer comme "lu"
- **Status : PAS COMMENCÉ** ❌
- **Estimation : 3-4h**

### Splash screen
- Écran de chargement pendant init
- Logo + animation fade
- Disparaît après checkAuth
- **Status : PAS COMMENCÉ** ❌
- **Estimation : 1-2h**

### CH-05 : Amélioration Upload Photo
**Contexte :** Upload photo basique fonctionnel (Supabase Storage Items-photos + RLS policies OK), mais expérience utilisateur à améliorer.

**Objectifs :**
1. **Compression automatique** : Réduire taille fichiers (~80% compression) pour :
   - Chargement plus rapide (mobile)
   - Économie de stockage
   - Meilleure performance globale

2. **Crop manuel avec preview** : Interface de recadrage style Instagram
   - L'utilisateur choisit la zone à garder
   - Preview en temps réel du résultat carré 800x800px
   - Évite les objets coupés ou mal cadrés
   - UX familière et intuitive

3. **Preview amélioré** : Meilleur aperçu avant sauvegarde
   - Affichage du résultat final (après compression + crop)
   - Feedback visuel clair
   - Possibilité de recommencer si insatisfait

**Approches envisagées pour le crop :**
- ❌ Option 1 : Crop centré automatique (risque de couper l'objet)
- ❌ Option 2 : Resize intelligent avec bandes blanches (pas esthétique)
- ✅ **Option 3 : Crop manuel avec preview** (choix retenu)
- ❌ Option 4 : Détection IA de l'objet (trop complexe/coûteux)

**Librairies envisagées :**
- Compression : `browser-image-compression` ou `compressor.js`
- Crop : `cropperjs` ou solution custom Canvas API
- Format cible : JPEG 800x800px, qualité 85%

**Estimation :** 2-3h
**Prérequis :** Upload photo basique fonctionnel ✅ (fait 17 mai 2026)
**Statut :** À FAIRE ⏸️
**Impact UX :** Élevé 🔥

### RESP-01 : Responsive webapp mobile - Adaptation multi-tailles smartphones
**Contexte :** Rue Gamma est une webapp mobile-first. L'interface doit s'adapter à toutes les tailles de smartphones, pas desktop/tablet.

**Problème actuel :**
- Bandeau push déborde sur certains écrans (visible sur petits smartphones)
- Alignement incohérent entre éléments (card CO₂, bandeau, onglets, listes)
- Valeurs fixes en pixels qui ne s'adaptent pas
- Pas testé sur différentes tailles de smartphones

**Tailles smartphones à supporter :**
- **Petits** : 320px-375px (iPhone SE, petits Android)
- **Standards** : 375px-414px (iPhone 12/13/14, majorité des users)
- **Grands** : 414px-428px (iPhone Pro Max, grands Android)

**Solution technique :**

1. **Unités relatives partout** :
   - `width: 100%` au lieu de valeurs fixes
   - `box-sizing: border-box` sur tous les éléments
   - Padding cohérent en pixels (16px OK)

2. **Conteneur parent unique** :
```css
   .main-container {
     padding: 0 16px;
     width: 100%;
     max-width: 100vw;
     box-sizing: border-box;
   }
```

3. **Enfants à 100%** :
```css
   .card-co2, .bandeau-push, .onglets, .listes {
     width: 100%;
     margin: 0;
     box-sizing: border-box;
   }
```

4. **Tests sur 3 tailles** :
   - 320px (iPhone SE)
   - 375px (iPhone standard)
   - 414px (iPhone Pro Max)

**Livrable :**
- Tous les éléments (card CO₂, bandeau, onglets, listes) parfaitement alignés verticalement
- Même bords gauche/droit sur toutes les tailles d'écran
- Pas de débordement horizontal
- Interface fluide de 320px à 428px

**Priorité :** Moyenne (fonctionne sur la majorité des écrans, mais pas parfait)  
**Estimation :** 4-6h (audit complet + refonte responsive)  
**Statut :** À FAIRE ⏸️  
**Impact UX :** Moyen à élevé (critique pour petits écrans)

---

## 🔄 EN COURS / À AFFINER

### Bandeau push
- Fonctionnel mais à améliorer (cf. chantier dédié)
- Copywriting à enrichir
- UI à retravailler avec Claude Design

### Design System
- Besoin de réconciliation (cf. chantier dédié)

---

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

## TODO : Feature "Avis de recherche" (0 résultat SERP)

### Concept
Quand une recherche retourne 0 résultat, permettre à l'utilisateur de solliciter la communauté pour savoir si quelqu'un possède l'objet (mais ne l'a pas encore déclaré dans FLO).

**Objectif** : Stimuler l'ajout d'objets + renforcer le lien communautaire + résoudre la frustration du 0 résultat.

---

### Parcours utilisateur complet

**Étape 1 : Recherche 0 résultat**

Jean-Pierre cherche "ponceuse d'angle" → 0 résultat → Écran "Aucun résultat trouvé"

**UI écran 0 résultat :**
- Titre : "🔍 Aucun résultat"
- Message : "Personne n'a encore partagé 'ponceuse d'angle' dans FLO"
- Suggestion : "Peut-être qu'un voisin en a une sans l'avoir encore déclarée ?"
- CTA principal : "Demander à la communauté"
- Info : "Tous vos voisins seront notifiés"

---

**Étape 2 : Envoi demande à la communauté**

Jean-Pierre clique "Demander à la communauté"
→ INSERT search_requests (status = 'open')
→ TOUS les membres de la community reçoivent notification

---

**Étape 3 : Notification aux membres**

Tous les membres voient dans leur onglet **"Demandes"** (ex-Transactions) :

**Template "Avis de recherche" :**
- Badge : "🔍 Avis de recherche"
- Message : "Jean-Pierre a besoin d'une ponceuse d'angle"
- CTA secondaire : "Non désolé" (lien souligné, dismiss local)
- CTA principal : "Déclarez la vôtre" (bouton vert)

---

**Étape 4 : Réponse d'un membre**

Marie clique "Déclarez la vôtre"
→ Formulaire ajout objet (name pré-rempli : "ponceuse d'angle")
→ Marie valide
→ INSERT items
→ INSERT search_request_responses (lien search_request + item)

---

**Étape 5 : Notification retour vers Jean-Pierre**

**Déclencheur** : Après 24h (groupage)

**Logique** :
1. Cron/trigger vérifie les search_requests.status = 'open' de plus de 24h
2. Compte le nombre de responses associées
3. Si > 0 → Notifie Jean-Pierre + UPDATE status = 'notified'

**Notification Jean-Pierre :**
- Badge : "✅ Bonne nouvelle !"
- Message : "3 FLOteurs ont ajouté une ponceuse d'angle"
- CTA : "Voir les objets →" (lien vers SERP "ponceuse d'angle")

---

**Étape 6 : Jean-Pierre découvre les objets**

Jean-Pierre clique "Voir les objets"
→ Ouverture SERP avec query "ponceuse d'angle"
→ 3 résultats affichés (ponceuses de Marie, Paul, Sophie)
→ Jean-Pierre peut emprunter
→ UPDATE search_request status = 'closed'

---

### Structure DB

**Nouvelle table `search_requests` :**

```sql
CREATE TABLE search_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) NOT NULL,
  requester_id UUID REFERENCES members(id) NOT NULL,
  item_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open', -- 'open', 'notified', 'closed'
  created_at TIMESTAMP DEFAULT NOW(),
  notified_at TIMESTAMP,
  closed_at TIMESTAMP
);

CREATE INDEX idx_search_requests_community_status 
  ON search_requests(community_id, status);
```

**Nouvelle table `search_request_responses` :**

```sql
CREATE TABLE search_request_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_request_id UUID REFERENCES search_requests(id) NOT NULL,
  responder_id UUID REFERENCES members(id) NOT NULL,
  item_id UUID REFERENCES items(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_search_request_responses_request 
  ON search_request_responses(search_request_id);
```

**Statuts search_requests :**
- `open` : En attente de réponse (affichée dans onglet Demandes de tous)
- `notified` : Jean-Pierre a été notifié (objets trouvés)
- `closed` : Jean-Pierre a consulté les résultats ou clôturé manuellement

---

### Notifications

**1. Notification à la communauté (broadcast)**
- Déclencheur : INSERT search_requests
- Cible : TOUS les members de la community (sauf requester)
- Type : Badge + card dans onglet "Demandes"

**2. Notification retour au requester**
- Déclencheur : Cron 24h après creation
- Condition : COUNT(responses) > 0
- Cible : requester uniquement
- Type : Push notification + bandeau app

---

### Matching item_name

**Problème** : "ponceuse d'angle" vs "Ponceuse D'angle" vs "ponceuse angle"

**Solution fuzzy match :**

```javascript
function matchSearchRequest(itemName, searchRequestName) {
  const normalize = (str) => str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // Enlever accents
    .replace(/[^a-z0-9\s]/g, "") // Enlever ponctuation
    .trim();
  
  const item = normalize(itemName);
  const search = normalize(searchRequestName);
  
  // Match exact ou contient
  return item.includes(search) || search.includes(item);
}
```

**Alternative IA** : Utiliser API Anthropic pour matching sémantique
- "ponceuse d'angle" match "meuleuse d'angle" ? (oui, similaire)
- "ponceuse d'angle" match "perceuse" ? (non, différent)

---

### Renommage onglet

**Transactions → Demandes**

**Nouveau contenu onglet "Demandes" :**
1. **Avis de recherche** (nouveau, en haut, badge si nouveau)
2. **Demandes d'emprunt reçues** (pending où je suis owner)
3. **Mes demandes d'emprunt** (pending où je suis borrower)
4. **En cours** (accepted/active)
5. **Archivées** (toggle)

---

### Limitations / Anti-spam

**Limite fréquence :**
- 1 avis de recherche par jour et par utilisateur
- Vérifier avant INSERT : `COUNT(search_requests WHERE requester_id = X AND created_at > NOW() - INTERVAL '24 hours') < 1`

**Expiration automatique :**
- Avis de recherche fermés automatiquement après 7 jours si status = 'open'
- Cron quotidien : `UPDATE search_requests SET status = 'closed' WHERE created_at < NOW() - INTERVAL '7 days' AND status = 'open'`

**Notification fatigue :**
- Option : Grouper les avis de recherche en digest hebdo ?
- Option : Paramètre utilisateur "Recevoir avis de recherche : Oui/Non"

---

### Implémentation technique

**Fichiers à modifier :**

`index.html` :
- Écran 0 résultat avec CTA "Demander à la communauté"
- Template "Avis de recherche" dans onglet Demandes
- Notification retour bandeau app
- Renommer "Transactions" → "Demandes"

**Supabase :**
- `CREATE TABLE search_requests`
- `CREATE TABLE search_request_responses`
- RLS policies (search_requests visible par community_id)
- Trigger OU Cron pour notification retour (à définir)

**Logique matching :**
- Fonction JS fuzzy match
- OU appel API Anthropic pour matching sémantique (si besoin)

---

### Estimation

- Écran 0 résultat : 1h
- Tables DB + policies RLS : 1h
- Notification broadcast communauté : 2h
- Template "Avis de recherche" onglet Demandes : 1h
- Formulaire ajout objet pré-rempli : 0,5h
- Matching items + trigger notification retour : 2h
- Cron/groupage 24h : 1h
- Tests + debug : 1,5h

**TOTAL : ~10h**

---

### Priorité

**Moyenne** - Après :
1. DT-09 : RLS sécurisées (URGENT)
2. CH-03 : Notifications badge
3. Scanner QR optimisé

**Impact UX : Élevé** 🔥
- Résout frustration 0 résultat
- Stimule ajout objets
- Renforce engagement communautaire

---

### Questions ouvertes

**1. Notification retour : Immédiate ou groupée 24h ?**
- Immédiate : Feedback rapide pour requester
- Groupée : Moins spammy si plusieurs réponses

→ **Proposition : Groupée 24h**

**2. Matching : Fuzzy ou IA ?**
- Fuzzy : Simple, rapide, gratuit
- IA : Plus précis, coûts API

→ **Proposition : Fuzzy pour MVP, IA si besoin**

**3. Expiration avis de recherche ?**
- 7 jours ? 14 jours ? Jamais ?

→ **Proposition : 7 jours auto-close**

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

---

## CONCEPT COMMUNAUTÉS

### Définition

Une **communauté** = regroupement d'individus autour d'une **entité géographique OU sociale**

**Types de communautés :**
- **Géographique** : Rue, immeuble, quartier, village
  - Exemples : "Rue Saint-Venant", "Immeuble Les Lilas", "Quartier Wazemmes"
  
- **Social** : Entreprise, association, groupe d'amis
  - Exemples : "Entreprise TechCorp", "Association Repairs Café", "Groupe d'amis La Bande"

---

### Règles de gestion

**1. Modération**
- Chaque communauté a **1 ou plusieurs modérateurs** (`is_moderator = true`)
- Le modérateur **valide les nouveaux membres**
- Workflow validation : demande d'adhésion → validation modérateur → accès

**2. Accès**
- **Sur invitation uniquement** d'un membre existant
- Pas d'accès public ou inscription libre
- Lien d'invitation avec token unique

**3. Multi-appartenance**
- **Un utilisateur peut appartenir à PLUSIEURS communautés**
- Exemple : Vincent membre de "Rue Saint-Venant" + "TechCorp Lille" + "Repairs Café"
- Pas de limite nombre de communautés par utilisateur

**4. Recherche et visibilité**
- Quand un utilisateur cherche un objet, la recherche s'effectue dans **TOUTES ses communautés**
- Les résultats sont agrégés avec indication de la communauté source
- Badge communauté affiché sur chaque objet

---

### Structure DB (actuelle vs anticipée)

**ACTUEL (structure simple - 1 communauté par user) :**

```sql
-- Table communities (OK)
CREATE TABLE communities (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  street TEXT,
  city TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table members (OK mais incomplet pour multi-communautés)
CREATE TABLE members (
  id UUID PRIMARY KEY,
  community_id UUID REFERENCES communities(id), -- ❌ Limite à 1 communauté
  first_name TEXT,
  last_name TEXT,
  address TEXT,
  email TEXT,
  is_moderator BOOLEAN DEFAULT false,
  joined_at TIMESTAMP DEFAULT NOW()
);
```

---

**ANTICIPÉ (structure multi-communautés) :**

```sql
-- Table communities (inchangée)
CREATE TABLE communities (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT, -- 'geographic' ou 'social'
  street TEXT, -- Pour type 'geographic'
  city TEXT,   -- Pour type 'geographic'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table users (nouveau nom pour éviter confusion avec members)
-- Contient les données d'authentification
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table community_members (table de liaison)
-- Relation many-to-many entre users et communities
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  community_id UUID REFERENCES communities(id) NOT NULL,
  role TEXT DEFAULT 'member', -- 'member', 'moderator', 'admin'
  status TEXT DEFAULT 'pending', -- 'pending', 'active', 'suspended'
  joined_at TIMESTAMP DEFAULT NOW(),
  validated_by UUID REFERENCES users(id), -- Modérateur qui a validé
  validated_at TIMESTAMP,
  UNIQUE(user_id, community_id) -- Un user ne peut être qu'une fois dans une communauté
);

CREATE INDEX idx_community_members_user ON community_members(user_id);
CREATE INDEX idx_community_members_community ON community_members(community_id);

-- Table invitations (nouveau)
-- Gestion des invitations à rejoindre une communauté
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) NOT NULL,
  inviter_id UUID REFERENCES users(id) NOT NULL,
  invitee_email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL, -- Token unique dans lien d'invitation
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'expired'
  expires_at TIMESTAMP NOT NULL, -- Expiration 7 jours
  created_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP
);

CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_email ON invitations(invitee_email);
```

---

### Migration nécessaire

**Étape 1 : Créer nouvelles tables**
- `users` (copier données depuis `members`)
- `community_members` (copier relations depuis `members.community_id`)
- `invitations` (nouvelle)

**Étape 2 : Migrer données existantes**
```sql
-- Copier users
INSERT INTO users (id, email, first_name, last_name, created_at)
SELECT id, email, first_name, last_name, joined_at
FROM members;

-- Copier relations communauté
INSERT INTO community_members (user_id, community_id, role, status, joined_at)
SELECT id, community_id, 
  CASE WHEN is_moderator THEN 'moderator' ELSE 'member' END,
  'active',
  joined_at
FROM members;
```

**Étape 3 : Adapter items, loans, search_requests**
- `items.owner_id` → toujours référence `users.id` ✅
- `loans.borrower_id, owner_id` → toujours référence `users.id` ✅
- `search_requests.requester_id` → référence `users.id` ✅

**Étape 4 : Supprimer ancienne table**
```sql
DROP TABLE members; -- Une fois migration validée
```

---

### Impact sur les fonctionnalités

**1. Recherche multi-communautés**

**Query actuelle (single community) :**
```javascript
const { data: items } = await db
  .from('items')
  .select('*')
  .eq('community_id', userCommunityId)
  .ilike('name', `%${query}%`);
```

**Query future (multi-communities) :**
```javascript
// Récupérer toutes les communautés de l'utilisateur
const { data: memberships } = await db
  .from('community_members')
  .select('community_id')
  .eq('user_id', userId)
  .eq('status', 'active');

const communityIds = memberships.map(m => m.community_id);

// Recherche dans TOUTES ses communautés
const { data: items } = await db
  .from('items')
  .select('*, community:communities(name, type)')
  .in('community_id', communityIds)
  .ilike('name', `%${query}%`);
```

**Affichage résultats avec badge communauté :**
- "Perceuse - Rue Saint-Venant"
- "Ponceuse - TechCorp Lille"

---

**2. Avis de recherche multi-communautés**

**Problème** : Quand Jean-Pierre fait un avis de recherche, dans quelle(s) communauté(s) envoyer ?

**Solution proposée : Choix de communauté(s)**

**UI écran 0 résultat :**
```
┌─────────────────────────────────────────┐
│ 🔍 Aucun résultat                       │
│                                         │
│ Aucun résultat dans vos 3 communautés  │
│                                         │
│ [Demander à la communauté]             │
└─────────────────────────────────────────┘
```

**Modal choix communauté(s) :**
```
┌─────────────────────────────────────────┐
│ Dans quelle(s) communauté(s) demander ? │
│                                         │
│ ☑ Rue Saint-Venant (34 membres)        │
│ □ TechCorp Lille (120 membres)         │
│ □ Repairs Café Lille (45 membres)      │
│                                         │
│ [Annuler]  [Envoyer la demande]        │
└─────────────────────────────────────────┘
```

**Implémentation :**
- Si 1 communauté cochée → 1 INSERT `search_requests`
- Si 3 communautés cochées → 3 INSERT `search_requests`
- Chaque avis de recherche = 1 communauté spécifique

---

**3. Profil multi-communautés**

**UI Profil :**
- Header : "Membre de 3 communautés"
- Switch communauté ? OU tout agrégé ?
- Badge sur objets/transactions : "Rue Saint-Venant"

**Onglets :**
- "Mes objets" → Tous objets toutes communautés OU filtrable par communauté ?
- "Prêtés/Empruntés" → Agrégé toutes communautés avec badge

---

**4. Workflow invitation**

**Parcours invitation :**

1. Vincent (membre de "Rue Saint-Venant") invite Marie
2. → INSERT invitations (invitee_email = 'marie@example.com', token = UUID, expires_at = NOW() + 7 days)
3. Marie reçoit email avec lien : `https://flo.app/invite/abc123xyz`
4. Marie clique lien → Vérification token valide + non expiré
5. Marie crée son compte (si nouveau) OU se connecte (si existant)
6. INSERT community_members (user_id = Marie, community_id = Rue Saint-Venant, status = 'pending')
7. Modérateur reçoit notification : "Marie souhaite rejoindre Rue Saint-Venant"
8. Modérateur valide → UPDATE community_members SET status = 'active', validated_by = moderator_id
9. Marie reçoit notification : "Vous êtes membre de Rue Saint-Venant !"

---

### Workflow validation modérateur

**UI modérateur — Onglet "Demandes d'adhésion" (nouveau) :**
```
┌─────────────────────────────────────────┐
│ 👤 Nouvelle demande                     │
│                                         │
│ Marie Dupont (marie@example.com)       │
│ Invitée par Vincent Mayol              │
│ Il y a 2 heures                        │
│                                         │
│ [Refuser]  [Accepter]                  │
└─────────────────────────────────────────┘
```

---

### Estimation migration

- Structure DB : 2h (création tables + migration données)
- Recherche multi-communautés : 3h (query + UI badges)
- Avis de recherche multi-communautés : 2h (modal choix)
- Workflow invitation : 4h (génération token + email + validation)
- Workflow modération : 3h (UI validation + notifications)
- Tests : 2h

**TOTAL : ~16h**

---

### Priorité

**Haute** - Fondamental pour le concept FLO

**Pré-requis pour :**
- Feature "Avis de recherche" (nécessite clarification communauté)
- Scalabilité (un user = plusieurs communautés)
- Croissance virale (invitation + validation)

**À faire AVANT :**
- Grosse refonte, risque de régression
- Mieux faire maintenant que plus tard avec données prod

---

### Questions ouvertes

**1. Naming : `users` ou `members` ?**
- `users` = Comptes utilisateurs (auth)
- `members` = Appartenance à une communauté (relation)

→ **Proposition : `users` (global) + `community_members` (relation)**

**2. Affichage profil : Switch communauté OU tout agrégé ?**
- Switch : Plus clair, mais clicks supplémentaires
- Agrégé : Plus simple, mais peut être confus

→ **Proposition : Agrégé avec badges + filtre optionnel**

**3. Avis de recherche : Pré-cocher toutes communautés OU aucune ?**
- Toutes : Plus de reach, mais plus de spam
- Aucune : Utilisateur choisit, mais friction

→ **Proposition : Communauté active par défaut (dernière utilisée)**

---

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

### DT-03 — Upload photos ✅ RÉSOLU (17 mai 2026)
Upload vers Supabase Storage (bucket Items-photos) + photo_url en DB.
Amélioration UX (compression + crop) → voir CH-05.

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

---

## HISTORIQUE DES SESSIONS

### Session 17 Mai 2026 - Dimanche après-midi

**Durée** : ~3h  
**Tokens utilisés** : 45% hebdo  
**Reste** : 55% hebdo

**Réalisations :**

✅ **Menus contextuels dropdown** - Option Modifier + Supprimer + Se déconnecter  
✅ **Suppression objets** - Mise à jour multi-listes (Profil, Home, Objets) + toast Annuler  
✅ **Upload photo fonctionnel** - Supabase Storage Items-photos + RLS policies  
✅ **Édition photo dans modale** - Upload/Supprimer/Changer photo  
✅ **Bandeau push amélioré** - Hauteur adaptative + alignement largeur  
✅ **Documentation messages push** - MESSAGES_PUSH.md créé avec 3 types sur 7 documentés

**Bugs identifiés :**

⚠️ **Responsive global** - Bandeau déborde sur certains écrans → TODO RESP-01 créé

**Prochaines étapes :**

- [ ] Compléter 4 types messages push restants (accepted_owner, accepted_borrower, active_owner, active_borrower)
- [ ] Implémenter système génération/stockage messages push
- [ ] Gérer genre utilisateur + objet
- [ ] CH-05 : Amélioration upload photo (compression + crop)
- [ ] RESP-01 : Responsive global

**Commits :** 10 commits effectués

---

### Session 19 Mai 2026 - Soirée

**Durée** : ~3h  
**Focus** : Uniformisation UI + restructuration onglet Transactions

**Réalisations :**

✅ **Page 0 résultat (moteurs de recherche) - Refonte complète**
   - Icône bouteille à la mer (SVG vert charte) remplace l'emoji loupe
   - Textes FLO : "Lancez une bouteille à la mer !" (titre vert)
   - "Il n'y a pas d'**Aspirateur** dans FLO" (mot recherché en bold)
   - "Un Floteur en a sans doute un qu'il n'a pas encore déclaré"
   - Fix keyboard overlap (padding-bottom 300px)
   - Scroll to top avant ouverture modal
   - Bouton désactivé après envoi ("✓ Demande envoyée")
   - Logique dupliquée sur page Objets (même comportement)

✅ **Onglet 'Demandes' → 'Transactions' - Restructuration complète**
   - Renommage de l'onglet
   - 4 sections claires par phase de prêt
   - Suppression logique "Bouteilles à la mer"
   - Toggle accessible

✅ **Template card unifié 2 lignes - Design System**
   - Structure : Ligne 1 (Titre + Chevron) / Ligne 2 (Pills user + CO₂)
   - Pills : Vous (vert), autre user (gris), CO₂ (vert clair)
   - Déployé partout : Home, Profil, Transactions, SERP, Page Objets

✅ **Bugs UI résolus**
   - Double encadré, alignement pills, ellipsis titres

**Décisions d'architecture :**
- Transactions = Suivi pur des prêts
- Bouteilles à la mer → ailleurs (découverte collective)
- Template unique = cohérence totale

**Commits effectués :**
1. UX: Page 0 résultat - Icône bouteille + textes FLO + fix keyboard overlap
2. UX: Scroll to top avant ouverture modal
3. UX: Uniformiser moteurs recherche
4. Refonte: Onglet Transactions - 4 sections
5. Fix: Double encadré + alignement pills
6. UX: Template 2 lignes unifié

**Prochaines étapes :**
- [x] ~~DT-09 : RLS sécurisées~~ ✅ TERMINÉ (19 mai 22h30)
- Section "Bouteilles à la mer" sur Home
- Phase 6 : Notification retour "Avis de recherche"
- CH-03 : Notifications badge
- Splash screen

**Méthodologie :**
- Brief → Discussion → Co-écriture → Claude Code → Commit manuel
- Pas d'instructions commit/push dans les briefs

---

### Session 19 Mai 2026 - Lundi

**Durée** : ~4h  

**Réalisations :**

✅ **Thread cards "Prochaines étapes"** — Refonte structure visuelle : titre 14px/500 + ligne contact verte 13px (seul "Contactez-vous" souligné) + hint gris 13px + CTA bouton  
✅ **Onglet "Prêtés" corrigé** — Filtrage `status = 'active' AND handed_at IS NOT NULL` (était `accepted`)  
✅ **Feature "Avis de recherche" (MVP complet, phases 1–5)**  
  - SERP 0 résultat → CTA "Demander à la communauté" (construit en DOM API)  
  - Modal bottom sheet (outside `#app`, z-index 1000/1001) avec animation slide  
  - Tables DB créées : `search_requests` + `search_request_responses`  
  - `sendSearchRequest()` : INSERT + toast + reload onglet Demandes  
  - Section "Avis de recherche" dans onglet Demandes (`_buildSearchRequestsSection`)  
  - Formulaire ajout objet pré-rempli via `window._prefilledItemName`  
  - Lien item créé → search_request_responses + notification fuzzy match  
✅ **Onglet "Transactions" → "Demandes"** — Renommage tab + panel  
✅ **RLS `search_requests` désactivé** — `DISABLE ROW LEVEL SECURITY` pour débloquer dev (auth.uid() ≠ members.id)  
✅ **Anti-spam 1/24h retiré** — Temporairement commenté pour tests MVP  
✅ **DT-09 documenté** — Statut PARTIELLEMENT FAIT ⚠️, problem root cause auth.uid()≠members.id, Option A (auth_user_id column) et Option B, checklist avant prod  

**Bugs résolus :**

🐛 **`position:fixed` inside `#app` (overflow:hidden) bloque touch iOS** → Modal déplacée outside `#app`  
🐛 **`innerHTML` + `querySelector` + `addEventListener` ne fire pas** → Reconstruit en `document.createElement` DOM API  
🐛 **`panel-exchanges.classList.contains('open')` toujours false** → Corrigé en `style.display !== 'none'`  
🐛 **Supabase FK join `members!requester_id` unreliable** → Simplifié en `members(first_name)`  
🐛 **`loadTransactions` écrasait `searchRequests` au merge** → Ajout branche `s.searchRequests = ...`  
🐛 **Bouton "Envoyer" onclick inline non déclenché** → Déplacé vers `addEventListener` via `cloneNode`  

**Décisions techniques :**

- [DECISION] RLS `search_requests` désactivé temporairement — Réactiver avec Option A (DT-09) avant prod  
- [DECISION] Notification retour immédiate pour MVP (pas cron 24h groupé)  
- [DECISION] Anti-spam 1/24h désactivé pour tests — Réactiver avant prod  
- [DECISION] Fuzzy match JS pour MVP (pas IA matching)  

**Commits effectués :**
1. `Doc: Session 19 Mai - FLO + Avis recherche + Communautes` (PROJET.md)
2. `DB: Tables pour feature Avis de recherche` (search_requests + responses)
3. `Feature: Avis de recherche SERP 0 resultat (MVP complet)` (5 phases)
4. `Debug: Ajout logs sendSearchRequest + fix event listener`
5. `Fix: Modal search request clics bloques iOS/Safari` (z-index + DOM structure)
6. `Fix: Bouton "Demander a la communaute" construit en DOM API`
7. `Fix: RLS search_requests + suppression limite anti-spam`
8. `Doc: Mise a jour DT-09 RLS - Solution A documentee`

**Prochaines étapes :**

- [ ] Phase 6 : Notification bandeau retour visuel vers requester ("3 membres ont déclaré un objet")
- [ ] Réactiver RLS `search_requests` avec Option A (ajouter `auth_user_id` dans `members`) — DT-09
- [ ] Réactiver limite anti-spam 1 demande/24h
- [ ] Expiration automatique avis recherche après 7 jours
- [ ] CH-03 : Notifications badge + compteur
- [ ] Splash screen (1-2h)

---

## SESSION HOME REFONTE - 21 Mai 2026 (EN COURS)

### OBJECTIF
Affiner le design de la page Home post-wireframe HOME-01 pour plus de clarté et de chaleur, inspiré de la simplicité Poppins.

### ÉTAT AVANCEMENT HOME

#### ✅ TERMINÉ (cette session)
1. Header (Bonjour + metrics + Inviter)
2. Bandeau recherche (bord-à-bord)
3. Bloc "Avez-vous ces objets ?" (carrousel complet)

#### ⏳ À AFFINER
4. Bloc "Bravo la commu !" (CO₂ + Objets disponibles) → Design/interactions
5. CTA dynamique : Card "Ajouter un objet" ↔ Card carrousel bouteilles
6. Contact G.O : Pill modérateur cliquable en bas

### RÉALISATIONS DÉTAILLÉES

#### 1. HEADER HOME - Ajustements progressifs

**Bonjour Prénom :**
- Ajout dynamique "Bonjour Vincent" (ou prénom membre connecté)
- HTML ligne ~2146 : `<p id="home-greeting">Bonjour</p>`
- JS ligne ~3220 : Injection `currentMember.first_name`

**Icône inviter user+ :**
- SVG user+ 14x14px avec stroke vert #1F9D55
- Modal "Parcours invitation" (fermable)
- Contour bouton vert #1F9D55

**Refonte metrics + lien inline :**
- Ordre inversé : "13 objets · 3 membres" (au lieu de "3 voisins · 13 objets")
- Remplacement "voisins" → "membres"
- Lien "Inviter" inline après "3 membres" (plus de bouton circulaire séparé)
- Alignement baseline parfait : icône 14px = texte 14px

**Commits :**
- `14c90c1` Feat: Afficher 'Bonjour Prénom' dans header Home
- Feat: Header Home - icône inviter user+ vert + modal Parcours invitation
- Fix: Contour bouton inviter en vert #1F9D55
- Refonte header : Metrics inversées + lien Inviter inline
- UX: Lien Inviter inline après '3 membres'
- Fix: Alignement parfait header - icône 14px + baseline

#### 2. BANDEAU RECHERCHE - Bord à bord

**Modifications :**
- Fond vert #E8F5E9 bord-à-bord (suppression margin latérale)
- Titre "Trouvez cet objet !" (au lieu de "Trouver cet objet")
- Style H3 bold 16px #333, margin-bottom 12px

**Commit :**
- UX: Bandeau recherche - fond bord à bord + titre 'Trouvez cet objet !'

#### 3. BLOC AVIS DE RECHERCHE - Refonte complète

**Structure finale :**
- Titre "Avez-vous ces objets ?" AVANT le bloc
- Contenu carte sur 2 lignes :
  - Ligne 1 : "Uzi recherche" (16px noir normal)
  - Ligne 2 : "un·e Nom de l'objet" (18px bold, max 2 lignes avec ellipsis)

**Carrousel :**
- Format horizontal scroll-snap
- 1 seule carte : 100% largeur
- Plusieurs cartes : 95% largeur + 5% du suivant visible
- Points pagination en dessous
- Alignement avec bloc CO₂

**Style visuel :**
- Fond jaune pastel #ffeaa7
- Pas de bordure
- Boutons : "Non, désolé" (noir souligné), "Je l'ai !" (primary vert #1F9D55)

**Animation dismiss :**
- Clic "Non, désolé" → slide down + fade out (0.8s cubic-bezier)
- Scroll smooth automatique vers carte suivante/précédente

**Règle de gestion :**
- Filtre : `b.requester_id !== userId`
- Utilisateur ne voit JAMAIS ses propres alertes
- Si 0 résultats → Bloc entier masqué

**Commits clés :**
- UX: Titre 'Avez-vous ces objets ?' + contenu 18px bold 2 lignes
- Test: Fond jaune clair #ffeaa7 sur cartes recherche
- UX: Largeur dynamique cartes recherche - 100% si seul, 95% si carrousel
- UX: Animation carrousel améliorée + design info (16px noir + 2 lignes max)
- Logic: Filtrer Avis de recherche - exclure propres alertes user

### WORKFLOW AMÉLIORÉ

**Nouveau process (Option 1 adoptée) :**
Tous les briefs Claude Code se terminent par "NE PAS committer ni pusher".
Commits manuels pour contrôle total et historique Git propre.

### TESTS DEVICE

iPhone validations :
- ✅ "Bonjour Vincent" visible
- ✅ Lien Inviter cliquable
- ✅ Bandeau recherche bord-à-bord
- ✅ Carrousel swipeable
- ✅ Animation dismiss fluide

### PRINCIPES DESIGN APPLIQUÉS

1. Simplicité radicale : pas d'encarts partout
2. 1 bloc couleur fort : fond vert recherche, fond jaune cartes
3. Hiérarchie par taille : pas de borders/ombres excessives
4. Cohérence template 2 lignes

### CHANTIERS IDENTIFIÉS

**EN ATTENTE sur Home :**
- Bloc "Bravo la commu !" → Affinage design/interactions
- CTA dynamique "Ajouter un objet" / carrousel bouteilles
- Contact G.O en bas de page

**PENDING autres chantiers :**
- SVG bouteille plus reconnaissable
- ONBOARD-01 : Tunnel ajout objet (BLOQUANT test rue)
- CH-03 : Notifications badge (BLOQUANT test rue)

### MÉTRIQUES SESSION

- Durée : ~7h (14h → 21h)
- Commits : 15+ commits fonctionnels
- Features complètes : Header, Recherche, Avis de recherche (carrousel)
- **Avancement Home : ~60% (3/6 sections finalisées)**

---

## SESSION HOME REFONTE (SUITE) - 22 Mai 2026

### OBJECTIF
Finaliser la refonte Home : section 'Partagez vos objets', bloc 'Bravo la commu !', Contact G.O, et cohérence visuelle globale.

### RÉALISATIONS

#### 1. SECTION 'PARTAGEZ VOS OBJETS' - Finalisation

**Logique dynamique fusionnée :**
- CAS 1 (défaut) : Card incitation 'Prêtez plus pour emprunter plus' + bouton pill 'Ajouter'
- CAS 2 (si bouteilles autres) : Carrousel bouteilles avec bouton 'Ajouter' + lien 'Non, désolé'
- Titre section unique : 'Partagez vos objets'
- Transition automatique entre les 2 cas

**Bouton pill arrondi :**
- Style : border-radius 24px, icône + entourée intégrée, calé à gauche
- Appliqué sur : bouton 'Ajouter' (card + carrousel)
- CTA secondaire 'Non, désolé' reste en texte souligné

**Carrousel recherche ajusté :**
- Nom produit limité à 1 ligne avec ellipsis
- Typo uniformisée : 'Vincent recherche un·e' (18px bold) puis nom produit
- 'Vous avez cet objet ?' en 16px gris (comme 'Vous partagez déjà X objets')
- Bouton 'Ajouter' au lieu de 'Je l'ai !'

#### 2. BLOC 'BRAVO LA COMMU !' - Refonte complète

**Structure 3 cartes metrics :**
- Carte 1 : Total | 57,4kg | CO₂ évités (vert #1F9D55 bold)
- Carte 2 : Mois | 20 | Nouveaux objets
- Carte 3 : Mois | 25 | Échanges

**Design :**
- 3 cartes même hauteur/largeur, flex côte à côte
- Chiffres 28px bold, unité 'kg' 18px bold
- Contenus alignés à gauche
- Padding ajusté : 12px vertical, 8px horizontal (carte 1), 16px horizontal (cartes 2-3)
- Gap entre cartes réduit à 6px

**Données dynamiques :**
- CO₂ mois : Déjà calculé
- Nouveaux objets : COUNT items WHERE created_at >= début mois
- Échanges : COUNT loans WHERE handed_at >= début mois

#### 3. CONTACT G.O - Card wrapper

**Modifications :**
- Bloc 'Une question ?' entouré d'une card blanche
- Padding vertical réduit à 10px
- Typo 'Une question ?' uniformisée : 18px bold (comme carrousel)

#### 4. COHÉRENCE VISUELLE GLOBALE

**Fond page :**
- Body Home en #FBFDFB (gris très clair)
- Header conserve fond blanc

**Bordures vertes :**
- Toutes les cards (metrics, contact, objets, transactions, profil) : border 1px solid #EAF5EA
- Suppression borders grises #F0F0F0
- Cohérence visuelle totale

**Espacements titres sections :**
- Espacement avant augmenté de 40% : margin-top 34px (au lieu de 24px)
- Espacement après conservé : margin-bottom 16px

### ÉTAT FINAL HOME

#### ✅ TERMINÉ (100%)
1. Header (Bonjour + metrics + Inviter inline)
2. Bandeau recherche (bord-à-bord vert)
3. Section 'Partagez vos objets' (card + carrousel dynamique)
4. Bloc 'Bravo la commu !' (3 cartes metrics)
5. Contact G.O (card 'Une question ?')
6. Cohérence visuelle (fond #FBFDFB + bordures vertes #EAF5EA)

**HOME TERMINÉE ! 🎉**

### PRINCIPES DESIGN APPLIQUÉS

1. **Bouton pill arrondi** : Style cohérent sur toute l'app (border-radius 24px + icône)
2. **Bordures vertes** : #EAF5EA sur toutes les cards pour cohérence
3. **Fond gris clair** : #FBFDFB pour contraste doux avec cards blanches
4. **Typo uniformisée** : 18px bold pour tous les headlines sections
5. **Espacements maîtrisés** : Padding/margins optimisés pour densité visuelle

### DÉCISION STRATÉGIQUE : NOTIFICATIONS

**Constat :**
- Messages push Profil (12-18h dev) apportent peu de valeur
- Vrai pain point : Pas de notifications sur demandes/acceptations/réponses bouteilles
- Solution : CH-03 Badge navbar Transactions (3-4h)

**Priorisation :**
1. 🔴 **CH-03 : Badge Transactions** (3-4h) — BLOQUANT test rue
2. 🟡 ONBOARD-01 : Tunnel ajout objet (1-2h) — BLOQUANT test rue
3. ⚪ Messages push Profil — ABANDONNÉ (effort/valeur désaligné)

### MÉTRIQUES SESSION

- Durée : ~3h (matinée 22 mai)
- Commits : 25+ commits fonctionnels
- Features complètes : Home 100% + cohérence visuelle app
- **Avancement global : Home TERMINÉE ! 🚀**
