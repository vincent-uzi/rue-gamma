# THÉSAURUS OBJETS — TABLE item_categories

## Objectif

Table de référence pour la détection automatique de catégorie et le calcul CO₂ lors de l'ajout d'un objet.
Deux niveaux de catégorisation :
- **category** : catégorie visible par l'utilisateur (filtre, navigation)
- **co2_subcategory** : sous-catégorie invisible, sert uniquement au calcul CO₂

## Structure DB

```sql
CREATE TABLE item_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,           -- Mot clé détecté dans le nom de l'objet
  category TEXT NOT NULL,          -- Catégorie visible utilisateur
  co2_subcategory TEXT,            -- Sous-catégorie CO₂ (invisible)
  co2_kg NUMERIC(8,1),             -- CO₂ fabrication évité (kg CO₂e)
  co2_source TEXT DEFAULT 'estimé',-- 'ADEME' ou 'estimé'
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Principe de calcul CO₂

**Hypothèse :** un emprunt évite un achat → CO₂ de fabrication évité = CO₂ affiché.
**Source principale :** ADEME / ImpactCO2 (https://impactco2.fr)
**Fallback :** valeur estimée par sous-catégorie si objet non référencé ADEME.

## Logique de détection

```javascript
// 1. Recherche nom complet
ilike('keyword', '%nom complet%')

// 2. Si non trouvé : mot par mot, du plus long au plus court
words.sort((a, b) => b.length - a.length)

// 3. Fallback final
{ category: 'Divers', co2_kg: 30 }
```

## Catégories (Niveau 1 — visible utilisateur)

| Catégorie | Nb keywords | Description |
|-----------|-------------|-------------|
| Bricolage | 52 | Outils manuels, électriques, peinture, mesure |
| Sport & loisirs | 48 | Vélos, sports neige, nautique, camping |
| Jardinage | 33 | Outillage jardin manuel et motorisé |
| Cuisine | 30 | Petit et gros électroménager cuisine |
| Multimédia | 27 | Numérique, son, photo, instruments |
| Enfant & puériculture | 24 | Mobilité, sécurité, jeux enfant |
| Mobilier | 23 | Petit, moyen et grand mobilier |
| Électroménager | 22 | Aspirateur, lave-linge, frigo... |
| Barbecue & extérieur | 19 | Cuisson, mobilier jardin, piscine |
| Fête & événement | 12 | Sono, jeux, machines événement |
| Textile & couture | 11 | Vêtements (ADEME), machines couture |
| Livres & culture | 7 | Livres, jeux société, supports AV |

**Total : 309 keywords**
**Fallback : Divers / 30 kg CO₂**

## Sous-catégories CO₂ (Niveau 2 — invisible)

### Bricolage
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Outillage manuel | marteau, pince, tournevis | 2–8 | estimé |
| Outillage électrique filaire | scie, meuleuse, ponceuse | 20–35 | estimé |
| Outillage électrique batterie | perceuse, visseuse sans fil | 45–60 | estimé |
| Gros outillage électrique | compresseur, bétonnière, soudeuse | 80–150 | estimé |
| Échelles & accès | marchepied, escabeau, échafaudage | 8–80 | estimé |

### Jardinage
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Outillage manuel jardin | bêche, râteau, sécateur | 2–15 | estimé |
| Outillage électrique jardin | taille-haie, souffleur, rotofil | 35–45 | estimé |
| Gros outillage jardin | tondeuse, motoculteur, tronçonneuse | 50–150 | estimé |

### Cuisine
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Petit électroménager cuisine | mixeur, raclette, gaufrier | 15–38 | ADEME/estimé |
| Électroménager cuisine moyen | robot, cafetière, airfryer | 50–212 | ADEME/estimé |
| Électroménager cuisine lourd | thermomix, cookeo, multicuiseur | 100–120 | estimé |

### Électroménager
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Petit électroménager | aspirateur, fer à repasser | 30–73 | ADEME/estimé |
| Électroménager moyen | karcher, déshumidificateur | 40–60 | estimé |
| Gros électroménager | lave-linge, frigo, four, clim | 121–513 | ADEME |

### Mobilier
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Petit mobilier | chaise, tabouret, pouf | 19 | ADEME |
| Mobilier moyen | table, bureau, étagère | 50–100 | ADEME/estimé |
| Grand mobilier | canapé, lit, armoire | 179–907 | ADEME |

### Numérique & Multimédia
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Petit numérique | smartphone, gopro, micro | 20–38 | ADEME/estimé |
| Numérique moyen | ordinateur portable, drone, console | 80–193 | ADEME/estimé |
| Grand numérique | télévision, vidéoprojecteur | 150–472 | ADEME/estimé |
| Instrument musique | guitare, ampli, clavier | 30–50 | estimé |

### Sport & loisirs
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Vélo électrique | vae, vélo assist | 262 | ADEME |
| Vélo mécanique | vélo, vtt, bicyclette | 134 | ADEME |
| Trottinette électrique | trottinette élec | 80 | estimé |
| Trottinette mécanique | trottinette | 15 | estimé |
| Sport nautique | kayak, paddle, canoë, surf | 30–60 | estimé |
| Équipement léger | roller, skateboard, patins | 10–15 | estimé |
| Ski & montagne | ski, snowboard, chaussures ski | 10–40 | estimé |
| Escalade | corde, baudrier, piolet | 5–10 | estimé |
| Camping léger | tente, sac couchage, frontale | 2–20 | estimé |
| Camping lourd | glacière, tente familiale | 20–50 | estimé |

### Enfant & puériculture
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Sécurité enfant | siège auto, rehausseur | 20–60 | estimé |
| Petit équipement bébé | baby phone, tire lait | 8–20 | estimé |
| Équipement bébé moyen | transat, balancelle, lit parapluie | 20–30 | estimé |
| Mobilité enfant | draisienne, vélo enfant, tricycle | 10–40 | estimé |
| Poussette | poussette, landau | 80–100 | estimé |
| Jeux extérieur | toboggan, trampoline, portique | 30–60 | estimé |

### Barbecue & extérieur
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Mobilier extérieur léger | hamac, transat, parasol | 8–20 | estimé |
| Équipement cuisson extérieur | barbecue, plancha, brasero | 30–60 | estimé |
| Structure extérieure | tonnelle, barnum, pergola | 40–120 | estimé |
| Piscine & eau | piscine gonflable, spa, jacuzzi | 40–300 | estimé |

### Textile & couture
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Vêtement | jean, veste, manteau | 25–89 | ADEME |
| Machine couture | machine à coudre, surjeteuse | 30–50 | estimé |

### Fête & événement
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Sonorisation | sono portable, pied micro | 10–60 | estimé |
| Effets & déco | machine fumée, boule disco | 8–25 | estimé |
| Machines événement | popcorn, barbe à papa | 15–20 | estimé |
| Jeux événement | baby foot, billard, pétanque | 5–150 | estimé |

### Livres & culture
| Sous-catégorie | Exemples | CO₂ kg | Source |
|----------------|----------|--------|--------|
| Livre & presse | livre, roman, BD, manga | 2–3 | estimé |
| Jeu | jeu de société | 5 | estimé |
| Support audio-visuel | vinyle, dvd | 2–3 | estimé |

## Données ADEME précises (21 objets)

| Objet | CO₂ kg | URL source |
|-------|--------|-----------|
| Lave-linge | 513 | https://impactco2.fr/outils/electromenager/lavelinge |
| Lave-vaisselle | 461 | https://impactco2.fr/outils/electromenager/lavevaisselle |
| Climatiseur | 422 | https://impactco2.fr/outils/electromenager/climatiseur |
| Réfrigérateur/Congélateur | 339 | https://impactco2.fr/outils/electromenager/refrigirateur |
| Four électrique | 273 | https://impactco2.fr/outils/electromenager/fourelectrique |
| Cafetière expresso/dosette | 212 | https://impactco2.fr/outils/electromenager/cafetiereexpresso |
| Cafetière filtre | 191 | https://impactco2.fr/outils/electromenager/cafetierefiltre |
| Micro-ondes | 121 | https://impactco2.fr/outils/electromenager/microondes |
| Aspirateur | 73 | https://impactco2.fr/outils/electromenager/aspirateur |
| Bouilloire | 38 | https://impactco2.fr/outils/electromenager/bouilloire |
| Télévision | 472 | https://impactco2.fr/outils/numerique/television |
| Ordinateur portable | 193 | https://impactco2.fr/outils/numerique/ordinateurportable |
| Smartphone | 38 | https://impactco2.fr/outils/numerique/smartphone |
| Armoire | 907 | https://impactco2.fr/outils/mobilier/armoire |
| Lit | 444 | https://impactco2.fr/outils/mobilier/lit |
| Canapé convertible | 198 | https://impactco2.fr/outils/mobilier/canapéconvertible |
| Canapé | 179 | https://impactco2.fr/outils/mobilier/canapetextile |
| Table | 80 | https://impactco2.fr/outils/mobilier/tableenbois |
| Chaise | 19 | https://impactco2.fr/outils/mobilier/chaiseenbois |
| Vélo électrique | 262 | https://www.sami.eco/blog/bilan-carbone-velo-electrique |
| Vélo mécanique | 134 | Fédération Européenne Cyclisme |
| Manteau | 89 | ADEME textile |
| Veste | 39 | ADEME textile |
| Jean | 25 | ADEME textile |

## Évolution du thésaurus

Pour ajouter des keywords :
```sql
INSERT INTO item_categories (keyword, category, co2_subcategory, co2_kg, co2_source)
VALUES ('nouveau keyword', 'Catégorie', 'Sous-catégorie CO₂', 12.5, 'estimé');
```

Pour corriger une valeur CO₂ :
```sql
UPDATE item_categories 
SET co2_kg = 85.0, co2_source = 'ADEME'
WHERE keyword = 'keyword à corriger';
```

Pour vérifier la couverture :
```sql
SELECT category, COUNT(*) as nb, AVG(co2_kg) as co2_moyen
FROM item_categories
GROUP BY category
ORDER BY nb DESC;
```
