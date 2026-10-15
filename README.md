# 🐗 Chasse & Pêche — Légendes (version web)

Portage **React + TypeScript + Supabase** du jeu de grande stratégie **Chasse & Pêche**
(classeur Excel « Chasse ^LLL0 Peche Legendes 7.19 » + macros VBA + livret de règles).
8 joueurs, un tour = 2 ans de temps de jeu, comme dans le classeur d'origine.

> 📌 Ce dossier est publié sur la branche **`chasse-et-peche-web`** du repo
> `losth230/quartz` (la branche `v4` du générateur de site Quartz n'est pas touchée),
> et également sur `losth230/Chasse-et-Peche` (main).

---

## 1. Jouer en ligne — rien à installer, aucune ligne de commande

Le jeu est publié automatiquement sur **GitHub Pages** à chaque push :

> 🎮 **https://losth230.github.io/quartz/jeu/**

- Ouvrez le lien dans un navigateur (ordi, tablette, téléphone) et cliquez sur
  « ⚙ Nouvelle partie ». Aucune installation, aucun terminal.
- **Un seul écran (hotseat)** : créez la partie, jouez à 8 autour du même écran.
  La sauvegarde reste dans le navigateur.
- **Chacun chez soi (temps réel)** : le jeu est déjà pré-configuré avec le projet
  Supabase du site quartz (URL + clé « anon public » pré-remplies dans l'onglet
  ⚙ Nouvelle partie → 🌐 — vous pouvez aussi y coller vos propres identifiants,
  mémorisés par le navigateur, sans fichier `.env`). Exécutez **une seule fois**
  `supabase/schema.sql` dans le **SQL Editor** du projet : il crée la table
  `parties_chasse_peche` du jeu (sans toucher à la table `parties` du wargame).
  Un joueur crée la partie avec un code de
  salon, les 7 autres cliquent « 🔗 Rejoindre ce salon » — tout se synchronise en temps réel.

Le déploiement est assuré par `.github/workflows/deploy.yaml` du dépôt `quartz` :
à chaque push sur `v4` ou sur `chasse-et-peche-web`, le workflow reconstruit le site
quartz v4 ET le jeu, puis publie l'ensemble — le jeu est servi sous `/jeu/`, à côté du
site existant, sans l'écraser.

## 2. Lancer le jeu (mode développeur, optionnel)

```bash
npm install
npm run dev        # http://localhost:5173
```

Autres commandes :

```bash
npm run build      # build de production (vite)
npm run build:strict  # build + vérification de types stricte (tsc)
npm run typecheck  # vérification de types seule
npm run preview    # sert le build
npm run docx       # régénère docs/Chasse-et-Peche-Livret-numerique.docx (Python 3, sans dépendance)
```

### Mode multijoueur (Supabase)

La façon recommandée est **sans ligne de commande** : voir §1 — les identifiants
Supabase sont déjà pré-configurés dans l'onglet **⚙ Nouvelle partie → 🌐** du jeu
(mémorisés par le navigateur). Le `.env` reste possible pour le mode développeur :

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Exécutez `supabase/schema.sql` dans le **SQL Editor** (table `parties_chasse_peche` + RLS ouverte + realtime — propre au jeu, distincte de la table `parties` du wargame du même projet).
3. Copiez `.env.example` en `.env` et renseignez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
   (secours uniquement : l'onglet 🌐 de l'interface prime).
4. Relancez `npm run dev`, choisissez « Multijoueur en ligne » dans **⚙ Nouvelle partie**
   et entrez un code de salon partagé entre les 8 joueurs.

Sans clés Supabase, l'application tourne **entièrement en local** (localStorage, export/import JSON) :
idéal pour jouer à 8 sur le même écran (hotseat). Il n'y a **pas d'authentification** :
tous les joueurs accèdent à la même partie par le code du salon (RLS anon ouverte).

---

## 3. Ce qui est porté du classeur

| Classeur Excel / VBA | Portage TypeScript |
|---|---|
| Macro `FinDeTour` (ressources, saisons, événements, cartes dynastie) | `src/engine/engine.ts` → `runTurn()` |
| Macro `PersonnagesPourJoueur` (population complète) | `src/engine/engine.ts` → `populationTurn()` |
| Mariages (`ComputeMarriageProbability`), toutes les pondérations | `computeMarriageProbability()` — formules identiques |
| Grossesses/naissances (jumeaux 5 %, triplés 0,1 %, adultère 3 %, consanguinité, traits) | `conceptionEtNaissances()`, `inheritTraits()`, `computeBabyDynasty()` |
| Maladies (proba, guérison, bâtiments de santé, grossesse perdue) | `maladieStep()` — constantes VBA exactes |
| Écoles & Professeurs (`MaybeAssignProfesseursInCities`, `TryEducateMinor`) | `maybeAssignProfesseurs()`, `tryEducateMinor()` |
| Succession du Dirigeant (Héritier → noble → crise) | `handleDirigeantSuccession()` |
| Influence culturelle (pression touristique + présence locale) | `applyCultureInfluence()`, `updateCityCultures()` |
| Migration des enfants sans éducation (10 %/tour) | `migrerEnfants()` |
| Taxes par ville (`TAX_OR_FAIBLES`… `TAX_NAISS_HAUTES`) | `calculerGainsPopulation()`, `taxBirthFactor()` |
| `RecruitForArmies`, `LeverArmee`, `RetirerArmee` (Général 45, Soldat 15) | `recruitForArmies()` + onglet Armées |
| `ValidateTitleAssignment` (frmAttribuerTitre) | `src/engine/validation.ts` |
| `GenererPopulationInitiale` (frmInitPop, couple royal) | `src/engine/setup.ts` |
| `SnapshotRessources` (_Historique) + graphiques | `snapshotRessources()` + onglet Historique (SVG) |
| `WriteRecapA3` (J{n}!A35) | `writeRecap()` + récap par joueur |
| **27 feuilles du classeur** (Titres, traits_genetiques, params_culture, BDD_pop, JSON événements, bâtiments, aménagements, maladies, offrandes, dogmes, ministères, crises, victoires…) | **données réelles intégrées** dans `src/config/referentiels.json` (≈126 Ko), normalisées par `src/config/defaultConfig.ts` |
| Constantes et formules VBA (taux, seuils, pondérations) | `src/config/params.ts` (~63 paramètres nommés, valeurs VBA exactes) |
| `Rnd()` (non déterministe) | RNG mulberry32 **déterministe** (graine rejouable) |

---

## 4. Interface

8 sections : **Accueil** (tableau de bord 8 joueurs + conditions de victoire ch. XII),
**Pays** (ressources, villes, taxes, bâtiments, récap), **Population** (filtres, tri,
attribution de titres avec toutes les règles VBA), **Armées** (lever, commandant, cible,
dissolution), **Journal** (tout l'historique des événements), **Historique** (courbes SVG),
**🎛 Paramètres** (éditeur complet du jeu, voir §4), **Référentiels** (16 onglets : fiches
réelles du classeur en consultation), **⚙ Nouvelle partie** (8 joueurs, graine, mode).

---

## 5. Tout est paramétrable — aucune contrainte bloquante

Le cahier des charges : **toutes les variables (constantes et formules) modifiables à
volonté par n'importe qui, chaque joueur peut toucher à ses stocks et productions à tout
moment, aucune contrainte bloquante.**

- **🎛 Onglet « Paramètres »** : 15 onglets d'édition en direct — formules du moteur
  (naissance, mortalité, mariages, maladies, taxes, migration, armées…), titres, traits,
  cultures, régimes, événements et leurs effets chiffrés, cartes dynastie, maladies,
  offrandes, probabilités, peuples & noms, ressources/éducations, plus un onglet
  **JSON export/import/reset** pour sauvegarder, partager ou restaurer une configuration.
- **Aucune validation bloquante** : les contrôles d'attribution de titres
  (`ValidateTitleAssignment`) ne produisent que des **avertissements** — le titre est
  toujours appliqué si vous confirmez. Chaque joueur peut modifier **à tout moment**
  ses stocks, ses productions, ses impôts et ses bâtiments dans l'onglet **Pays**.
- **Chaud** : les modifications prennent effet au tour suivant, sans recharger la partie.
  Les données de référence sont éditables directement dans `src/config/referentiels.json`
  (JSON lisible), les formules dans `src/config/params.ts`, la normalisation dans
  `src/config/defaultConfig.ts`.

---

## 6. VBA de référence & livret

- `vba/Personnages.vba` — module « Personnages » complet (3 604 lignes) : source du portage.
- `vba/FinDeTour-et-gains-population.vba` — `FinDeTour`, `SnapshotRessources`,
  `CalculerGainsPopulation` et les versions retravaillées (traits, taxes, migration).
- `docs/Chasse-et-Peche-Livret-numerique.docx` — livret numérique regénérable via
  `npm run docx` (script `scripts/make_docx.py`, Python 3 standard, aucune dépendance ;
  écrit un DOCX OOXML minimal). Le DOCX n'est pas versionné en binaire ici :
  `make_docx.py` le régénère à l'identique.

---

## 7. Limites connues

1. **Nourriture négative** : fidèle au classeur — la production de départ est nulle et
   chaque habitant vivant consomme 1 Nourriture/tour. Ajoutez des Fermiers, des Chasseurs
   ou de la production dans l'onglet Pays pour équilibrer (les stocks sont modifiables
   à tout moment).
2. `Evenement` : comme dans le VBA, la dangerosité est `1d6 + modDanger`
   (≤5 faible · 6-8 moyenne · 9-10 forte · 11+ extrême).
3. Les points d'attention documentés du VBA (double compteur de tour, `totalProb`,
   code mort de l'éducation à la naissance) sont corrigés par construction dans le portage :
   un seul compteur (`GameState.turn`), tirage pondéré cohérent.
4. Les effets d'événements et de cartes dynastie sont **chiffrés d'après le livret et le
   classeur** ; toute valeur peut être corrigée dans l'onglet 🎛 Paramètres.

---

## 8. Structure

```
src/
  config/     params.ts (formules/constantes VBA), defaultConfig.ts (référentiels normalisés),
              referentiels.json (données réelles des 27 feuilles du classeur)
  engine/     types, rng, gameData/gameData2 (exports dérivés de la config), engine (VBA porté),
              setup, validation, victory
  state/      store React (local/supabase + realtime), storage (localStorage)
  components/ UI : Dashboard, PlayerView, PopulationTable, ArmiesPanel, EventLog,
              HistoryPanel (SVG), SetupPanel, ParamsPanel (éditeur complet), 
              ReferenceDataPanel (consultation), TurnBar, ui
  supabase/   client (table parties_chasse_peche, realtime)
supabase/     schema.sql (table, RLS anon, publication realtime)
scripts/      make_docx.py (livret DOCX)
.github/workflows/deploy.yaml  déploiement GitHub Pages (site v4 + jeu sous /jeu/)
vba/          code VBA original de référence
docs/         livret DOCX (régénérable)
```

---

## 9. Suppression / réinitialisation

Le bouton ✕ de la barre de tour efface la sauvegarde locale. En mode Supabase,
supprimez la ligne du salon dans la table `parties_chasse_peche` (ou `TRUNCATE parties_chasse_peche`).
L'onglet 🎛 Paramètres contient un bouton de réinitialisation de la configuration
(retour aux valeurs par défaut du classeur).

---

## 10. Commerce — routes des marchands (marqueur (t))

- **Titre « Marchand »** : attribution manuelle (page Population, comme Chasseur
  ou Gouverneur). Un marchand ouvre **une seule route commerciale** entre sa
  ville et la ville d'un autre joueur (page Pays, carte « Commerce »).
- **Chaque tour**, les **deux joueurs reliés** gagnent `marchandOrTour` Or
  (4 par défaut — Paramètres → Formules, groupe Commerce).
- Le propriétaire du marchand **copie en plus** la production de l'aménagement
  ENTIER choisi dans la ville ciblée (toutes ses ressources produites — choix
  fait à l'ouverture, modifiable à tout moment). Une production d'été n'est
  copiée qu'en été ; les ressources instantanées (Tourisme, Garnison) et les
  effets négatifs ne sont pas copiables.
- La route se ferme si le marchand meurt ou perd son titre (ou via le bouton ✕).
- Canal **« Commerce »** du récap des ressources (tableau par tour + apports
  cumulés du dernier tour, page Pays).
