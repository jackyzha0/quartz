# Journal technique — historique des évolutions et conventions

Ce document complète [AGENTS.md](../AGENTS.md) et
[regles-et-arbitrages.md](regles-et-arbitrages.md) : il retrace l'HISTORIQUE des
évolutions du projet (thème, fichiers, shas), les incidents réels et les règles
d'ingénierie durables qui en découlent. Les décisions de design détaillées sont
dans regles-et-arbitrages.md ; ici, chaque évolution tient en quelques lignes.

## Conventions de déploiement — ÉTAT ACTUEL (depuis 2026-10-19)

- **Un seul push sur `chasse-et-peche-web` déclenche TOUT** : workflow « CI jeu »
  (`npm ci` + `tsc --noEmit` strict + `npm test` + bundle esbuild de l'Edge Function
  + exécution-test du bundle + `npm run build`) PUIS déploiement GitHub Pages
  (https://losth230.github.io/quartz/jeu/) + Edge Function.
- La partie multijoueur de l'arbitre tourne EN CONTINU sur ce déploiement : un push
  qui casse la CI casse sa partie. Ne jamais pousser sans validation locale complète.
- Après un push de code : attendre ~150 s, vérifier les check-runs du sha
  (build + jeu + diag + deploy = success), puis vérifier le bundle live
  (`https://losth230.github.io/quartz/jeu/` → `assets/index-*.js` a un NOUVEAU hash
  et contient les nouvelles chaînes).
- **SYSTÈME HISTORIQUE DÉPRÉCIÉ** : jusqu'au 2026-10-19, le déploiement passait par
  une double branche (`chasse-et-peche-web` + `v4`) avec des « marqueurs »
  alphabétiques insérés dans `.github/workflows/deploy.yaml`. Les marqueurs se
  sont arrêtés à **(a)** (3e cycle alphabétique). Ne plus ajouter de marqueur ;
  les mentions (g)…(a) ci-dessous sont des références historiques, utiles pour
  retrouver un arbitrage dans `git log`.

## Chronologie des évolutions (marqueurs historiques)

Chaque entrée renvoie aux sections correspondantes de regles-et-arbitrages.md.

- **(g) 2026-10-14 — Rangs de pays refondés** : échelle féodale unique Baronnie→Empire,
  montée par serments uniquement (1/2/3/4), `DEFAULT_CONFIG.paysRangs` + `migrerPaysRangs()`,
  `rangPaysNiveau`/`sermentsPossedes`, page Royaume (sacre, avènement), cap Ministres.
  Jeu `455ee04f`… (voir git log de l'époque).
- **(h) 2026-10-14 — Ministres/portefeuilles** : 23 portefeuilles (7 du classeur + 16
  « de cour »), effets Auto/Plateau, nouveau `engine/ministeres.ts`, nomination nobles
  uniquement, cap = rang. Jeu `87428bcf`.
- **(i) 2026-10-14 — Voies de victoire « Lauriers I à IV »** : validation manuelle en
  ordre strict, crise aux Lauriers I-III, bonus one-shot par âge, Laurier IV = victoire ;
  `engine/victory.ts` réécrit + carte radar/coches sur l'Accueil. Jeu `455ee04f`.
- **(j) 2026-10-14 — Cinq retours joueurs** : aménagements dédoublables, nouveau module
  `engine/villes.ts` (`supprimerVille`, `transfererVille`), barre Ressources flottante
  page Pays, Progrès sans effets moteur (coût Science débité/remboursé seul), population
  des cités libres en panneau dédié.
- **(k) 2026-10-14 — Impôts manuels** : boutons « 💰 Générer l'impôt de la population /
  🤝 des vassaux » (page Pays, carte Récap), N tours à la fois, s'AJOUTENT au fin de tour ;
  `engine/economie.ts` (`impotPopulation`, `impotsVassaux`, `genererImpot*`).
- **(l) 2026-10-14 — Quatre retours UI/moteur** : barre Ressources pinnée en JS (pas
  sticky CSS), purge de ~25 paragraphes de texte, `debiterCoutHabitation` (coût des
  habitations débité), onglet Référentiels → Habitations complété.
- **(m) 2026-10-14 — La cour, dons et mariages** : `transfererVille` déplace ville +
  population (la cour reste), onglet Population scindé « 👑 La cour » / population
  classique, nouveau `engine/cour.ts` (`donnerPersonnage`, `marierPersonnages`) ; le
  veuvage et la recherche de conjoint parcourent TOUTES les populations du monde.
- **(n) 2026-10-14 — Cités libres « comme des joueurs »** : onglets 🗼 dans la section
  Population, architecture « détenteurs » (`Detenteur` joueur|cité, `shared.ts`),
  `toutesLesPopulations`, 50 habitants, consommation Nourriture plate.
- **(o) 2026-10-14 — Mariage = déménagement** (remplace l'arbitrage (m)) : la personne
  de la ligne « 💍 Marier avec… » déménage dans la ville du conjoint (peut changer de
  porteur) ; couleurs J1-J8 et des ressources paramétrables (onglet Couleurs), lignes
  de tableaux teintées `color-mix` avec slider de transparence. Jeu `13197b66`.
- **(p) 2026-10-14 — Mise en forme** : carte « Récap du dernier tour » déplacée en haut
  de Population, compactage Accueil/Pays/Progrès (hauteurs, densification cartes de ville).
- **(q) 2026-10-14 — Nombre de joueurs paramétrable** : sélecteur 2-8 à la création
  (défaut 8), `createGame(setups)` boucle sur les lignes, cités libres = 1/joueur.
  Jeu `03de348e`.
- **(r) 2026-10-14 — Douze retours** : ressources colorées partout, erreurs des
  dons/mariages AFFICHÉES en rouge (le moteur refusait silencieusement), aucun bâtiment
  par défaut en capitale, colonne « Capitale » au setup (Cité/Château, `typeCapitale`),
  Foire RÉPARÉE (parser ne lisait que « Tourisme +N », pas « +N Tourisme par tour. »),
  **Tourisme = valeur FLAT créditée UNE fois à la construction** (bâtiments ET
  aménagements), aménagements paramétrables, pastilles bâtiments par famille
  (badge-fam-*), toutes les ressources affichées même à 0, carte « 👑 Ministres ».
  Jeu `47e1ba16`.
- **(s) 2026-10-14 — Effets structurés + wiki** : interface `EffetConstruction
  {ressource, quantite, ete?}` + champ `effets[]` sur 67/97 entrées de
  referentiels.json (migration scriptée, matching par index pour les doublons de noms) ;
  `RESSOURCES_INSTANTANEES = {Tourisme, Garnison}` (jamais de flux par tour), accès
  `effetsConstructionRef`/`instantanesConstructionRef`/`resumeConstruction` avec repli
  texte `parseProductionTexte` ; TOUS les éditeurs regroupés dans `ConfigTables.tsx`
  (onglets Paramètres) ; ReferenceDataPanel réécrit en **wiki de règles LECTURE SEULE**.
  Jeu `abfe0c18`.
- **(t) 2026-10-15 — Marchands et routes commerciales** : titre Marchand, UNE route par
  marchand, +`marchandOrTour` Or/tour aux DEUX joueurs, copie de production d'aménagement,
  nouveau `engine/commerce.ts`, canal « Commerce » partout, paramètre `marchandOrTour`.
  Jeu `b366b375`. NB : ce jour-là les push API ne déclenchaient aucun workflow →
  déblocage par `workflow_dispatch` manuel (à savoir refaire si ça se reproduit).
- **(u) 2026-10-15 — Correctif commerce** : bug « Marchand introuvable » = Selects
  contrôlés soumettant `''` → **règle durable : soumettre la valeur EFFECTIVE
  (état || première option)** dans tout formulaire en cascade ; arbitrage Thibaut : la
  copie porte sur l'AMÉNAGEMENT ENTIER (champ `ressource` obsolète optionnel).
  Jeu `ae3fe76e`.
- **(v) 2026-10-15 — Offices de cour + migration** : renommage des 7 ministères du
  classeur (Colonial→Grand bailli, etc.), `migrerMinisteres` réécrit (fusion des
  manquants + conservation des personnalisations), `migrerNomsMinisteres(state)` aux
  3 points d'ingestion du store, choix du portefeuille déplacé dans la carte
  « 👑 Ministres ». Jeu `90279b8d`.
- **(w) 2026-10-15 — Gouverneurs + nouvelles villes** : nouvelle ville/château = 50
  roturiers SANS noble (`peuplerNouvelleVille`) ; gouverneur automatique = noble LE
  PLUS ÂGÉ de la ville (hors Dirigeant/Héritier), +10 % d'impôts sur SA ville cumulable
  avec le Grand Chambellan. Jeu `cc37456f`.
- **(x) 2026-10-15 — Convergence de la configuration** : cause racine = les migrations
  de complétion (migrerMinisteres/Constructions/Factions) se rejouaient à CHAQUE `cfgOf`
  et ressuscitaient les entrées par défaut supprimées. Correctif : `SCHEMA_VERSION_CONFIG`
  + champ `schemaVersion` (tampon), `convergerConfig` aux points de sauvegarde/chargement.
  **Règle durable : toute évolution du référentiel devant atteindre les configs
  existantes → INCRÉMENTER `SCHEMA_VERSION_CONFIG`.** Jeu `8000c6f7`.
- **(y) 2026-10-15 — Ministres automatisés + proximité + ChoicePicker** : les 18
  portefeuilles réels de la partie en ligne de l'arbitre deviennent le référentiel
  (5 supprimés), effets Auto codés (bailli, prévôt, veneur, finances, bibliothécaire,
  légat, connétable) ; `City.proximite` (Plaine/Rivière/Mer) + canal « Proximité » ;
  `components/Picker.tsx` (ChoicePicker : bouton → panneau → catégories → cartes
  décrites) appliqué aux aménagements/bâtiments/ministres/titres ; les constructions
  de faction des AUTRES peuples ne sont plus constructibles. Jeu `6eb832a4`.
- **(z) 2026-10-15 — Mariage ciblé, taxes ±25 %** : « Marier avec… » ne cible plus que
  les nobles du MÊME porteur (le moteur garde sa capacité inter-porteurs) ; infobulles
  des traits génétiques ; effet des taxes passé de ±50 % à ±25 % avec migration ciblée
  `taxes25` (SANS toucher au tampon schemaVersion). Jeu `7bcf7ce5`.
- **(a) 2026-10-15, 3e cycle — Écran blanc + aide « compté automatiquement »** :
  triple correctif page blanche (hooks React APRÈS retours anticipés, `normaliserEtat`
  aux 4 points d'ingestion du store, `ErrorBoundary` global + par onglet) et bloc
  d'aide « 🧮 Qu'est-ce que l'application compte automatiquement ? ». **Deux incidents
  majeurs → règles durables : voir la section « Règles d'ingénierie » ci-dessous.**
  Jeu `1fd0a1d3`. Dernier marqueur v4 ; le système marqueurs est ensuite abandonné.

## Refontes techniques « vibecoding » (17-19 octobre 2026)

Travail lourd effectué par l'arbitre hors sessions de suivi, constaté en relecture du
dépôt (tête d'époque `14344ee7`) — à connaître avant toute modification :

- **Fusion multijoueur par sections** (`engine/fusion.ts`, testé) : la SEULE écriture
  réseau est la fin de tour ; `rejouerEvenementsPartages` pour les événements
  inter-joueurs. Les anciens boutons « 💾 »/flush fermeture d'onglet ont été retirés
  (ils écrasaient le salon avec un état local incomplet).
- **Registre de migrations VERSIONNÉ** (`engine/migrations.ts`, testé) : tampon
  `schema` sur l'état, migrations pures numérotées exécutées une fois — à utiliser
  pour toute évolution future du FORMAT des sauvegardes (≠ `SCHEMA_VERSION_CONFIG`,
  qui concerne le référentiel de configuration).
- **Config mondiale unique** : ligne `__config__` de la table Supabase, adoption au
  chargement (monde > embarquée > locale, `state/configPriorite.ts` pur et testé) ;
  édition HORS partie uniquement ; plus de « règle créateur ».
- **Résolution de tour côté serveur** : Edge Function Deno
  `supabase/functions/resoudre-tour` (mêmes règles que le local : fusion + config +
  runTurn), replis v1/v2 documentés. Le dossier `supabase/` à la racine est AUTONOME
  (n'importe pas `src/supabase/client.ts`).
- **Couche `src/rules/`** (testée) : banque d'effets lecture-seule au-dessus du moteur,
  préparation d'un futur refact des effets. NB : contient des cycles d'imports avec
  `engine/` (13 cycles), volontairement non traités pour l'instant.
- **Perf** : `saveLocal` sérialise par replacer (zéro structuredClone de l'état ~5 Mo).
- **CI « CI jeu »** : c'est à partir de ces refontes que la branche du jeu a sa propre
  CI complète (type-check strict + 40 tests natifs à l'époque + build) et le droit de
  déclencher le déploiement Pages.

## Un fichier par UI + tests de rendu (2026-10-19)

Réponse aux retours de revue critique n°2 et n°3 — 3 commits verts :
`94161581` (pose les 12 fichiers `src/components/pays/`), `8f95576b` (helper
`components/testRendu.ts` + 12 tests de rendu `*.test.ts` sans JSX, un par vue),
`034d208f` (PlayerView.tsx réduit à un assemblage ~150 lignes + durcissement
`supabase/client.ts` : `import.meta.env` lu OPTIONNELLEMENT, hors bundle Vite il vaut
undefined).

- **Découpage `components/pays/`** : `pays-utils.tsx` (constantes/formateurs partagés),
  `Constructions.ts` (fabriques pures `faireConstruire`/`faireBatParFamille` — l'état
  est fourni par l'appelant), puis une carte par fichier : RessourcesBar, AideAuto,
  SurintendantFinances, CulturePays, VillesCarte, VilleCarte, CommerceRoutes,
  RecapParTour, RecapDernierTour, NotesJoueur. Extraction vérifiée byte-identique.
- **Piège TypeScript noté** : le narrowing d'un PROP ne traverse pas une closure
  `onClick` → capturer la valeur AVANT (`const surintQty = surint.qty`).
- **Piège tests de rendu** : `renderToString` ne joue PAS les `useEffect` ; le helper
  fait un shim `localStorage` + partie 8 joueurs graine fixe + 2 runTurn AVANT le rendu.

## Purge qualité (2026-10-19) — durcissement tsc + code mort + tests mutateurs

Suite à l'audit critique (structure/logique/SOLID/code mort), 4 commits verts :
`ce042d0a` (signatures allégées + exports morts gameData/gameData2 + regex
RESSOURCES_FLUX unifiée dans constructions.ts), `e2572ac6` (`engine/mutateurs.test.ts`
8 tests + imports React morts), `4deceb16` (locaux morts des 7 vues restantes +
règles CSS orphelines `.taxes-tbl`/`.frule-manuel`/`.cl-reserves`), `6e55751c`
(**`tsconfig.json` : `noUnusedLocals` + `noUnusedParameters` à true** + store.tsx
`pollerBarriereV2` mort + supabase/client.ts `saveRemote`/`clientId` morts +
`migrateGameConfig`).

- Compteur tests : **48 natifs + 12 rendu**.
- `engine/mutateurs.test.ts` couvre `supprimerVille` (habitants restent), 
  `transfererVille` (roturier suit, noble ré-ancré, renommage en collision),
  `rejouerTransfertVille` v2 IDEMPOTENT, `marierPersonnages` inter-joueurs + 5
  gardes-fous.
- **Dette volontairement différée** (à ne pas « découvrir » comme un oubli) :
  (1) les 13 cycles d'imports `rules/` ↔ `engine/` (dont engine.ts↔validation.ts et le
  cluster economie↔titres↔naissances↔sante) — refonte architecturale risquée pendant
  la partie en ligne ; (2) le découpage des 5 grosses vues restantes (PopulationTable
  798 l., ReferenceDataPanel 647, RoyaumeView 626, ConfigTables 609, CitesLibresView
  429). Vague suivante, à proposer à l'arbitre.

## Audit complet du code + correctifs multijoueur (2026-10-19, soir)

Audit complet du dépôt à la tête `66282293` (moteur, store, fusion, Edge Function,
schémas SQL, UI, règles, tests, CI). Verdict global : architecture et hygiène très
au-dessus de la moyenne — mais DEUX bugs réels dans la couche multijoueur v2, dont
un EN PRODUCTION :

1. **Edge Function cassée en prod** — `resoudre-tour/index.ts` appelait
   `appliquerConfigMondiale(draft, cfgMondiale)` sans que `cfgMondiale` ne soit
   défini NULLE PART (introduit par `714a54bb`) → `ReferenceError` → 500 à
   CHAQUE résolution serveur → repli local systématique depuis le 19/10 matin.
   Le jeu avançait quand même (le repli fait fusion + événements + config
   mondiale + runTurn + publication), personne n'a rien vu — mais l'atomicité
   serveur (verrou, transaction) était perdue. CORRIGÉ (`362e1db4`) : la config
   mondiale est LUE dans la ligne réservée `__config__` avant l'injection
   (ligne absente → null → config embarquée conservée, même sémantique que le
   repli client).
2. **`pollerBarriereV2Ref` jamais assigné** (store.tsx) — le ref était déclaré
   no-op, APPELÉ par `nextTurnV2` quand un joueur pousse sans être le dernier,
   mais la fonction `pollerBarriereV2` n'existait pas : les clients en attente
   ne pollaient RIEN. Si le dernier pousseur fermait son onglet avant la
   résolution, le salon se bloquait pour tous (seul « Forcer » ou un
   rechargement débloquait). CORRIGÉ (`362e1db4`) : poller v2 implémenté
   (toutes les 2 s, max 2 min, arrêt si le tour local a avancé) + assignation
   au ref comme son jumeau `resoudreBarriereLocaleV2Ref`.
3. **Cause racine : la CI ne type-checkait pas le handler Deno** —
   `npm run test:function` ne teste que le bundle moteur `_engine.mjs`, et le
   tsconfig du jeu n'inclut pas `supabase/functions/` : le bug (1) est parti en
   production vert. CORRIGÉ (`ccfa04ef`) : check dédié
   `npx tsc -p supabase/functions/resoudre-tour/tsconfig.check.json`
   (strict, stubs `jsr:@supabase/supabase-js@2` et `*_engine.mjs` dans
   `types/stubs.d.ts`), dans CI jeu ET deploy-function. Un `deno check`
   complet a été essayé en premier : il échoue en CI (il tente d'installer les
   dépendances npm transitives de supabase-js hors package-lock — reproduit
   localement, Deno 2.9.7). Le check tsc est vérifié en POSITIF (handler
   corrigé = pass) et en NÉGATIF (le bug historique rejoué → TS2304
   « Cannot find name 'cfgMondiale' » → échec de la CI).
4. **Preuve en production** : après redéploiement de l'Edge Function
   (workflow deploy-function vert sur `ccfa04ef`), résolution serveur vérifiée
   BOUT-EN-BOUT sur un salon de test jetable `{ok:true, tour:2}` — idempotence
   (2e appel = `dejaPublie`), config mondiale injectée dans l'état publié,
   garde `tour_publie` posée. NB : `parties_chasse_peche` n'a PAS de policy
   DELETE anon → le salon de test (`audit-probe-fix`) a été réduit à une tombe
   inerte ; purge manuelle en SQL :
   `delete from parties_chasse_peche where id = 'audit-probe-fix';`.

Constats de l'audit NON corrigés (priorisés, à arbitrer) : RLS DELETE ouverte à anon
sur `cp_events` (sabotage de barrière possible) ; retour de `saveLocal` jamais
vérifié (quota localStorage dépassable en fin de partie, échec silencieux) ;
identité démographique par NOM COMPLET (`mariage`/`mere`/`pere` = strings —
collisions possibles à 16 000 habitants) ; doc drift Tourisme (AGENTS.md dit
« crédité UNE fois » alors que le code actuel le traite en flux avec
stock = production) ; mélange de protocoles v1/v2 possible dans un même salon ;
bouton reset (✕) sans confirmation.

Le rapport complet de l'audit (bugs, risques R2-R5, problèmes moyens M1-M7, dette
mineure, points forts, plan d'action) est versé dans
[audit-code-2026-10-19.md](audit-code-2026-10-19.md). RÈGLE DURABLE (retour arbitre
2026-10-19) : toute documentation produite (audit, rapport, synthèse) doit être versée
dans `docs/ia/` du dépôt, pas seulement dans les outils de suivi de session.

## Retrait de l'attrait migratoire et des bonus de faction (2026-10-19, retour arbitre)

Aucune partie en cours — décision de brûlage partiel prononcée par l'arbitre : deux
systèmes jugés insatisfaisants sont retirés pour être refaits plus tard sur de
meilleures bases. Commit `2c24bd3a` (32 fichiers, ≈400 lignes de moteur/UI en moins,
référentiel de 109 → 90 constructions) :

1. **Attrait migratoire supprimé** — migration spontanée par attrait Tourisme +
   heatmap de la page Pays. Ne restent que les migrations scolarté (enfants sans
   éducation…). Le bug B3 de l'audit (attrait double-compté) disparaît AVEC le
   système ; B4 (commerce copie le Tourisme) reste valable.
2. **Bonus de faction supprimés** — canal Production « Faction », règles d'âge,
   table EFFETS des règles, statut FACTIONS, 19 constructions de faction (Église,
   Puit de mana, Grande Cathédrale…), bonus codés en dur (NORLS, Basiléens,
   PEAUX VERTES, Sylvains, Elfes d'Or), prérequis de faction, fiches mécaniques
   des peuples, canal « Faction » du récap.
3. **Conservé** : champ « Peuple » au setup (identité pure, sans effets),
   utilitaires partagés de `factions.ts` (nbAmenagements, nbBatiments,
   nbBatimentsVille, nbVassaux, rangPaysNiveau, capitaleDe, batimentsCapitale),
   fiches peuplesLibres/peuplesAutres du référentiel (source documentaire pour la
   refonte), migrations scolarté.
4. **Conventions posées** : les docblocks d'arbitrage ne sont jamais supprimés —
   remplacés par un commentaire « RETRAIT 2026-10-19 (retour arbitre — à refaire) » ;
   `SCHEMA_VERSION_CONFIG` passe à 2 : la convergence filtre les constructions de
   faction des configs existantes AVANT `migrerConstructions` (les 19 constructions
   disparaissent automatiquement des parties sauvegardées, tampon re-posé) ;
   `ConditionRegle.regleFaction` retiré du système de règles.
5. **Validation avant push** : tsc strict au niveau baseline exact (3 erreurs stub
   client Supabase), 48/48 tests moteur/règles/état, smoke runtime 3 joueurs +
   runTurn (0 construction de faction, canaux Production sans « Faction »,
   `migrationTourisme` absent des paramètres, origines garnison base/régime),
   convergence v1→v2 vérifiée sur une config contenant des constructions de faction.

**RÈGLE (retour arbitre 2026-10-19, soir) : le SUIVI DE SESSION vit ICI.** `docs/ia/` est LA
référence unique de l'état du projet — ce journal pour l'historique (évolutions, incidents,
shas, tête de branche), `regles-et-arbitrages.md` pour les décisions de design,
`audit-code-2026-10-19.md` pour l'audit et ses suites. Les bases de connaissances locales
des sessions d'agents IA ne sont PLUS maintenues comme référence : toute mise à jour de
suivi se pousse au dépôt, à chaud (une entrée par événement ou par session).

## Brûlage du protocole multijoueur v1 (2026-10-19, audit R5)

Aucune partie en cours — l'arbitre a prononcé le brûlage du protocole multijoueur v1.
Le risque R5 de l'audit ne pouvait PAS se corriger par des gardes : un salon où
7 joueurs sont en v2 et 1 en v1 reste bloqué ; la seule protection fiable est
l'IMPOSSIBILITÉ du mélange. Le protocole v2 (événements append-only + résolution
serveur) est désormais l'UNIQUE flux de fin de tour.

Commit `27a5173c` (4 fichiers) :

1. **supabase/client.ts** : `pousserSection` et `lireBarriere` (barrière v1 par
   colonne `sections`, lire-modifier-écrire) retirés, remplacés par des commentaires
   RETRAIT ; `publierEtatFusionne` (résolution + garde anti-rollback) et tout le
   flux v2 conservés.
2. **state/store.tsx** : `proto2Actif()` (feature flag `cpe.proto2`), la branche v1
   entière de `nextTurn` et les replis v1 `resoudreBarriere`/`pollerBarriere`
   retirés ; `nextTurn` appelle TOUJOURS `nextTurnV2` ; gardes `proto2Actif() &&`
   retirées de update (section vivante), resoudreSeul, forceNextTurn et realtime ;
   docblock `nextTurnV2` réaligné (repli = résolution LOCALE v2, plus « retour au
   flux v1 »).
3. **components/TurnBar.tsx** : bouton de bascule v1/v2 et state `proto2` retirés
   (5 boutons restants), import React devenu inutile retiré.
4. **AGENTS.md** : section Multijoueur retitrée « protocole v2 UNIQUE » + phrase de
   règle (plus aucun mélange possible dans un salon).

Incident de coupe (commit `166a7ab`) : le splice scripté de la branche v1 de
`nextTurn` a avalé les lignes de fermeture du `void (async () => {…})` et du
`useCallback` → `'}' expected` en fin de store.tsx → **CI jeu #33 ROUGE** (diag et
check Edge Function passaient — seuls tsc strict/build l'attrapent, comme prévu).
Réparé dans la foulée (réinsertion des fermetures) ; CI jeu #34 verte, diag #190
vert, **Deploy Pages #1204 vert** : bundle live republié (l'ancien
`index-CGmShlKV.js` renvoie 404, la page live rend le jeu) ; le Deploy #1203 du
commit cassé a bien échoué SANS rien publier. **Règle durable confirmée (cf. règle
7 des règles d'ingénierie) : après une coupe scriptée entre marqueurs, vérifier
l'équilibre des fermetures de la zone coupée avant de pousser.**

Non modifiés : Edge Function (déjà v2-pure, non redéployée — run #15 toujours en
vigueur), colonnes SQL v1 (`sections`, `turn_done`) laissées en base, inoffensives
(`publierEtatFusionne` écrit `sections: {}`), tests (aucun ne référençait
v1/proto2). R5 est marqué résolu dans
[audit-code-2026-10-19.md](audit-code-2026-10-19.md).

## Arbitrage B4 — le Tourisme copié par le commerce compte dans le stock (2026-10-19)

Arbitrage Thibaut (retour sur la phrase B4 de l'audit) : « le tourisme peut être
copié puisque le stock de tourisme n'est jamais mis à jour avec la production.
L'idée est que stock tourisme = production tourisme ». Le Tourisme EST donc
copiable par une route commerciale ; le bug B4 n'était pas la copie elle-même
mais le résidu : `tourismeCourant` (regimes.ts) n'avait pas de canal Commerce —
la copie s'affichait au récap mais `resynchroniserTourisme` écrasait le stock
sans elle (affiché, jamais crédité).

Correctif `ee26eb80` « fix(jeu): le Tourisme copié par le commerce compte dans le
stock (B4, arbitrage) » :
- `regimes.ts` : canal 7 dans `tourismeCourant`
  (`effetsCommerceJoueur(state, p, state.saison, C)['Tourisme']`), docblock
  réaligné (commerce compris dans « stock = production ») ;
- `commerce.ts` : docblocks d'entête et de `ressourcesCopiables` réalignés
  (Garnison et effets négatifs exclus ; le Tourisme EST copiable — arbitrage
  2026-10-19) ;
- `commerce.test.ts` (nouveau) : test de régression « le Tourisme copié par une
  route compte dans la production et le stock » — partie 2 joueurs, Foire sur la
  ville cible, route ouverte par un roturier promu marchand, asserts copie > 0,
  production ≥ copie, stock = max(0, production).

**Incident CI #36 (cycle d'import, ReferenceError TDZ)** : le nouvel import
`regimes → commerce` a refermé un cycle d'évaluation `constructions → banque →
regimes → commerce → amenagements` : l'initialisation top-level `AMENAGEMENTS`
(amenagements.ts) s'est exécutée avant que constructions.ts n'initialise
`RESSOURCES_INSTANTANEES` → `ReferenceError: Cannot access
'RESSOURCES_INSTANTANEES' before initialization` → crash à l'import de TOUS les
fichiers de test (CI #36 rouge en 3 s) ET du bundle Edge (deploy-function #16
rouge — la garde-fou a refusé le déploiement, l'Edge #15 est restée en service).
Le typecheck strict passait (TDZ = erreur d'exécution) : Deploy Pages #1206 a
publié un bundle moteur cassé pendant ~4 min avant #1207 (fenêtre fermée).

Correctif `06422b9` « fix(jeu): correctif cycle d'import commerce→amenagements » :
`amenagementRef` (amenagements.ts) est un alias PUR de `constructionRef`
(constructions.ts) — `ressourcesCopiables` lit désormais `constructionRef`
directement et commerce.ts n'importe PLUS amenagements.ts (commentaire RETRAIT +
règle d'hygiène d'import dans l'entête du fichier). `1611312` : espace de
commentaire rétablie (zéro changement de code). Incident reproduit et diagnostiqué
en local (exécution des tests du tarball du commit, trace de l'ordre d'évaluation
des modules) et correctif vérifié : 49 tests natifs verts avant le push.

Vérifications : CI jeu #37 (06422b9) et #38 (1611312) vertes, diag #193/#194
verts, Edge #17/#18 verts (**redéployée**), Deploy Pages #1207/#1208 verts.
B4 est marqué résolu dans
[audit-code-2026-10-19.md](audit-code-2026-10-19.md) ; les règles sont mises à
jour dans [regles-et-arbitrages.md](regles-et-arbitrages.md).

## R2/R3/R4 — arbitrages et correctifs (2026-10-19, au soir)

Les trois risques P1 de l'audit arbitrés par Thibaut, puis implémentés :

- **R2 (RLS ouverte à `anon`, DELETE inclus) — ASSUMÉ, rien à coder.**
  Arbitrage : « ne rien toucher — documenter le risque, modèle amis de
  confiance assumé ». Le modèle « salon par code » sans auth reste tel quel :
  aucune policy SQL modifiée. Le risque (sabotage possible par quiconque
  connaît l'URL pendant la barrière) est documenté dans
  [audit-code-2026-10-19.md](audit-code-2026-10-19.md) (section R2, statut
  « arbitré : assumé ») ; les recommandations de durcissement restent en
  réserve si le contexte change (parties publiques).
- **R3 (quota localStorage, échec silencieux) — bandeau d'alerte (`dea1997`).**
  `storage.saveLocal` retourne `false` en cas d'échec (QuotaExceeded, mode
  privé) mais personne ne le lisait : en fin de partie (~5 Mo d'état) la
  sauvegarde locale pouvait échouer à CHAQUE mutation sans aucun signe, et
  un rechargement perdait le tour en cours. Correctif : `persist` arme
  `saveLocaleEchec` (miroir du retour de saveLocal, exposé par le contexte
  de jeu) ; TurnBar affiche un bandeau ⚠ « Sauvegarde locale impossible
  (quota du navigateur dépassé) — un rechargement perdrait le tour en
  cours » avec bouton d'export JSON immédiat : la partie ne vit alors plus
  qu'en mémoire, l'export est la copie de secours.
- **R4 (fusion sans validation de forme) — rejet ENTIÈR + journal visible
  (`3b964cf`).** Les sections viennent du réseau (cp_events.payload, JSON
  non contrôlé) : un client bogué pouvait déposer `"tour": "abc"` ou une
  population non tableau qui crashaient `runTurn` à la publication (serveur
  ou repli local). Correctif : `sectionValide()` exportée de fusion.ts
  (contrat minimal : tour nombre fini ; player objet ; population / routes
  / citesLibres / log tableaux si présents), appelée dans la boucle de
  `fusionnerSections` — une section invalide est ignorée EN ENTIER (jamais
  de demi-fusion qui casserait runTurn) avec une entrée « ⚠ Section invalide
  ignorée » dans le journal du tour (arbitrage Thibaut : le rejet doit être
  VISIBLE pour que l'arbitre voie la triche/le bug, pas silencieux) ; les
  clés non numériques sont ignorées sans trace (aucun joueur à fusionner).
  Partagée client + Edge Function : le bundle `_engine.mjs` embarque la
  validation — la résolution serveur est protégée aussi. 3 tests de
  régression dans fusion.test.ts (13 au total).

Vérifications : CI jeu #40 (`3b964cf`) et #41 (`dea1997`) vertes, diag #196/#197
verts, Deploy Edge Function #19 vert (le bundle `_engine.mjs` embarque
`sectionValide` — la résolution serveur est protégée ; pas de redéploiement
pour `dea1997`, aucun fichier moteur touché), Deploy Pages #1211 vert — le
site live sert déjà les deux correctifs (bandeau R3 + validation R4
vérifiés dans le bundle publié).
R2/R3/R4 sont marqués dans
[audit-code-2026-10-19.md](audit-code-2026-10-19.md) (tableau + sections +
plan d'action P1). Restent ouverts : M1-M7 (P2) et les chantiers de fond
(IndexedDB, ids démographie, brûlage banque d'effets).

## M1-M7 — les sept problèmes moyens traités (2026-10-19, fin de soirée)

Les P2 de l'audit passés en revue un par un ; deux arbitrages Thibaut :
M1 « ids purs — ignorer les vieilles sauvegardes, elles n'ont plus lieu
d'exister » et M7 « retrait complet » (verrou ET fonctions SQL).

- **M1 — identité démographique par ids (`5576b25`).** `mariage`, `mere`,
  `pere`, `pereBio` étaient des noms complets : à 16 000 habitants les
  collisions (générateurs à listes finies) donnaient un mauvais conjoint
  veuvé et une mauvaise filiation. Quatre champs d'identité ajoutés à
  Character (`mariageId`/`mereId`/`pereId`/`pereBioId`) ; les noms restent
  pour l'AFFICHAGE, tenus en sync à chaque mutation ; TOUTE résolution
  passe par les ids : veuvage (sante, armees, décès en cité libre),
  index de fecondité (indexé par id désormais), filiation de l'arbre
  généalogique, consanguinité, mariages (setup, titres, cour, UI).
  Arbitrage : PAS de migration de rattrapage — une vieille sauvegarde
  chargée voit ses relations à null (assumé). Compaction : les ids null
  sont omis à l'écriture (DEFAUTS_PERSO). 3 tests de régression M1
  (veuvage par id avec homonyme leurre, consanguinité par id, invariants
  du setup — couples symétriques par id).
- **M6 — Tourisme du transfert de ville unifié (`4d13324`).**
  L'ancien code resynchronisait le receveur AVANT qu'il ait la ville
  puis créditait « à la main » un Tourisme statique par bâtiment
  (approximation sans les canaux flux banque/commerce, écrasée au
  resync du tour suivant). Désormais : chaque côté resynchronisé APRÈS
  le déplacement — stock = production courante, point (sémantique
  arbitrée 2026-10-16). Crédit manuel supprimé.
- **M5 — associations par nom de ville : documentées (`4d13324`).**
  Note posée dans transfererVille : le renommage AUTOMATIQUE (collision)
  met à jour habitants + ville ensemble ; toute UI future de renommage
  MANUEL devra répercuter sur gouverneurs + populations + rattachements.
- **M2 — branche morte de setGlobalCfg supprimée (`c41ac32`)** (RETRAIT
  documenté) : le bloc « réinjection de la config dans la partie en
  cours » était inatteignable depuis le garde `if (stateRef.current)
  return`.
- **M3 — reset avec confirmation (`c41ac32`)** : le ✕ de TurnBar
  demande AVANT d'effacer (« la partie locale sera perdue, le salon
  distant reste rejoignable ») — aligné sur les actions destructrices
  voisines.
- **M4 — repli de constructionRef assumé et documenté (`c41ac32`)** :
  groupe introuvable → première variante ; docblock posé (pas de log :
  lookup en chemin chaud d'affichage, moteur pur).
- **M7 — verrou consultatif retiré (`13a6520`).** Arbitrage « retrait
  complet » : les 2 appels RPC (cp_advisory_lock/unlock) retirés du
  handler Deno (le verrou ne tenait pas sur le pool de connexions
  PostgREST), fonctions SQL droppées du schéma (drop if exists pour les
  installations existantes). Les VRAIS garde-fous, documentés en tête
  du handler : idempotence par `tour_publie`, index unique
  (salon, tour, joueur, type), DÉTERMINISME de runTurn.

Vérifications : 55 tests verts en local avant push (35 moteur dont les
3 tests M1 + 20 rules/state) ; CI verte sur les 4 commits — détail dans
[Actions](https://github.com/losth230/quartz/actions). Byte-à-byte
poussé/local vérifié sur les 19 fichiers. M1-M7 sont marqués dans
[audit-code-2026-10-19.md](audit-code-2026-10-19.md) (tableau + lignes
M1-M7 + plan d'action P2). Restaient ouverts à ce stade : point 8 du P2
(commentaires internes Tourisme), IndexedDB, brûlage de la banque d'effets —
traités dans la section suivante.

## P2 achevé + banque d'effets : TOUTE production passe par la banque (2026-10-19, nuit)

Deux décisions Thibaut enchaînées : « pas d'IndexedDB » (la persistance
localStorage suffit — point 9 du P2 abandonné) et « pour la banque, il
faut que TOUT ce qui a rapport à une production passe par la banque »
(principe désormais gouvernant toute migration de source sur la banque).

- **Point 8 du P2 — commentaires Tourisme réalignés (`ebb5d1e`).** Les
  commentaires périmés (« Tourisme crédité UNE FOIS à la
  construction », « ressources instantanées Tourisme/Garnison ») sont
  réalignés sur la sémantique arbitrée (Tourisme = flux, stock =
  production) dans constructions.ts, batiments.ts, commerce.ts,
  rules/types.ts et villes.ts. Le résumé affichable ne dit plus
  « +X Tourisme (à la construction) » : le Tourisme s'affiche comme
  flux.
- **Brûlage #2 de la banque — voie UNIQUE de production (`ebb5d1e`).**
  Tout ce qui a rapport à une production se lit EXCLUSIVEMENT sur la
  règle de banque (rules/registry → rules/effects) :
  `effetsConstructionRef` (flux), `effetsEteConstructionRef` (canal été),
  `garnisonConstructionRef` / `instantanesConstructionRef` (valeur
  d'état), `eteSeulementRef` (lu sur la règle) — les anciennes
  duplications d'interprétation locale de `ref.effets` sont supprimées.
  RETRAITS : `parseProductionTexte` et son analyseur (constructions.ts),
  l'analyseur local + `EFFETS_FORCES` + cache (batiments.ts — les 4
  « bâtiments hors référentiel » étaient en fait tous dans la table
  constructions), les regex Tourisme/Garnison des replis,
  `effetsConstructionEntries`. Invariant : une construction SANS règle
  de banque ne produit RIEN (test dédié).
- **Voie Tourisme unifiée (`ebb5d1e`).** `tourismeStatiqueBatiment`
  (l'ancienne double voie : regex sur les textes) devient
  `productionTourismeBatiment` qui lit le flux Tourisme de la règle de
  banque — la même valeur que le canal Bâtiments du récap alimente
  désormais tourismeCourant (stock = production) et la conversion
  culturelle. Plus aucune lecture Tourisme hors banque.
- **Falheim / Notan et les 24 constructions sans production.** Leurs
  textes décrivent des mécaniques de plateau non modélisées ou des
  effets de merveille codés (doublement Science, −25 Or de levée) : via
  la banque leur production par tour est nulle, ce qui est le
  comportement historique. Rien à structurer — la « structuration des
  32 » de l'audit s'est résolue en : production nulle par défaut,
  repli supprimé.
- Hors périmètre production (inchangés, textes canoniques du classeur) :
  `parseCoutTexte`, `reductionCampDeBatisseurs`, `prerequisConstruction`
  (coûts/prérequis, pas des productions).

Vérifications : 57 tests verts en local avant push (baseline 55
rejouée au harnais maison, +2 nouveaux : Tourisme = flux via la banque
[Chapelle +35, plus aucun instantané], Champ/Rizière production d'été
sur la règle) ; invariant « sans règle = production nulle » testé sur
les 26 constructions sans effets ; smoke valeurs historiques (Bahamutt
+16, Chapelle +35, garnison Poste de garde 40, Guilde des marchands
−1 Charbon, Ponton 0) ; CI VERTE sur `ebb5d1e` (jeu, build, diag,
deploy Pages + Edge — détail dans
[Actions](https://github.com/losth230/quartz/actions)) ; byte-à-byte
poussé/local 10/10. Prochaine
étape banque (brûlage #3) : migrer une par une les sources restantes
(ministres, lois de régime/culture, techs) en appliquant partout le
principe « toute production passe par la banque ».

## Brûlage #3, source 1/3 — les ministres passent par la banque (2026-10-20)

Première source du brûlage #3, principe arbitré : TOUTE production
passe par la banque. Commit `9ae36ad0` (7 fichiers) + correctif CI
`78bd3f24`.

- **Nouveau type d'effet `fluxJoueurParMinistre`** (rules/types.ts) :
  production CUMULABLE — valeur × nombre de ministres VIVANTS porteurs
  (arbitrage portefeuilles cumulables) ; nouveau champ
  `declencheur?: 'tour' | 'finSaison'` sur `RegleBanque` (production
  par tour, canal « Ministères » du récap, vs production de fin de
  saison — production ÉQUIVALENTE PAR TOUR, comptée dans
  tourismeCourant).
- **`MINISTERES_AUTO`** (rules/registry.ts) — LA couche d'édition des
  règles ministérielles : Trésorier +5 Or, Grand Précepteur +1 Science,
  Grand prévôt +1 Fer ('tour') ; Sénéchal +15 Nourriture avec la
  condition `saison: 'Été'` DANS LA RÈGLE, Maître de cour +2 Tourisme,
  Légat du pontificat +20 Tourisme ('finSaison'). `registreComplet` =
  constructions + ministres.
- **`engine/ministeres.ts` ne fait que LIRE la banque** (plus aucun
  montant codé) : `appliquerEffetsMinisteres` applique les règles
  'tour' ; `effetsFinSaisonMinisteres` applique les règles 'finSaison'
  règle par règle (conditions évaluées par la banque) en conservant le
  format EXACT des logs ; nouveau `fluxFinSaisonMinisteres` (lecture
  seule) alimente le canal 5 « Ministères » de `tourismeCourant`
  (regimes.ts — plus de ×2/×20 codés en dur).
- **Chancelier des émissaires : HORS banque, en conscience** — +1
  émissaire en réserve par fin de saison est un INSTANTANÉ, pas une
  production par tour : il reste appliqué au site, documenté dans le
  registre et le code (test dédié).
- **8 nouveaux tests** (src/rules/ministres.test.ts — cumul deux
  Trésoriers +10 Or, ministre décédé = rien, Sénéchal fin d'été oui /
  fin d'hiver non, Maître de cour + Légat chaque saison + format des
  logs + pluriels, flux par tour 22 Tourisme, Chancelier instantané,
  cohérence du registre). 65/65 verts au harnais local AVANT le push.

**Incident CI #50 (rouge) — `Array.prototype.at()` vs lib ES2020** :
`9ae36ad0` a fait échouer le tsc strict de la CI (jeu + build) sur
`.at(-1)` dans deux messages de diagnostic de ministres.test.ts — le
harnais local (Node 22, strip-types, SANS type-check) l'exécutait très
bien. Correctif `78bd3f24` : index classique `[arr.length - 1]`,
diff chirurgical +2/−2 vérifié par l'API compare. → règle 12
ci-dessous.

**Incident d'outillage (sans effet dépôt)** : le bac d'exécution local
a été recyclé EN COURS DE TOUR (worker bash perdu, système de fichiers
indisponible, ~20 min de tentatives) — diagnostic (annotations de
l'API check-runs) et correctif ont été menés ENTIÈREMENT à distance
(contenu via l'API GitHub authentifiée, push, diff vérifié). Les
sources 2/3 (lois de régime + règles de pays culturelles) et 3/3
(flux de progrès) du brûlage #3 NE SONT PAS ENTAMÉES : la règle 11
impose les tests AVANT push après tout nouvel import entre modules du
moteur (effetsRegime/effetsCulturePays importeront la banque), et le
harnais est indisponible. Conception de la suite (pour le prochain
tour) : types `fluxParAmenagement{ressource, valeur, noms}`
(Socialisme : +5 Nourriture d'été × Champ/Rizière, condition saison
dans la règle) et `fluxParVilleCultureMonde{ressource, valeur}`
(règles de pays : +N par ville de la culture dans le MONDE) ;
conditions `regime`/`culture` ajoutées à `ConditionRegle` ;
`reglesRegimes`/`reglesCultures` dans le registre lisant les champs
du référentiel (`nourrEteChampRiziere`,
`capitalNourr/Tourisme/OrParHabMonde`) ; `effetsRegime` prend l'état
en argument (contexte banque) et `detailCulturePays` lit la banque
(UI = moteur, une seule vérité).

Vérifications : byte-à-byte 7/7 au sha `9ae36ad0` (avant le recyclage
du bac) ; CI du correctif `78bd3f24` VERTE — CI jeu #51, diag #207,
Deploy Pages #1221, Deploy Edge Function #26 (le bundle moteur
redéployé embarque la refonte ministres) ; le grep des chaînes dans le
bundle live reste À FAIRE au prochain tour (bac indisponible — règle
10 à compléter).

## Brûlage #3, source 2/3 — régimes & cultures passent par la banque (2026-10-20)

Deuxième source, principe arbitré : TOUTE production passe par la
banque. Commit `35c34bcd` (7 fichiers) : types d'effet
`fluxParAmenagement{ressource, valeur, noms}` (Socialisme :
+N Nourriture d'été par Champ/Rizière — l'été est une CONDITION de la
règle, plus un if moteur) et `fluxParVilleCultureMonde{ressource,
valeur}` (règles de pays : +N par ville de la culture dans le MONDE,
tous joueurs confondus) ; conditions `regime`/`culture` dans
`ConditionRegle` ; `reglesRegimes`/`reglesCultures` dans le registre
lisant les champs du référentiel (`nourrEteChampRiziere`,
`capitalNourr/Tourisme/OrParHabMonde`) ; `effetsRegime` prend l'état
en argument (contexte banque) et `detailCulturePays` lit la banque
(UI = moteur, une seule vérité). Restent HORS banque, en conscience :
garnison Autoritarisme (valeur d'état), Déisme
(scienceParConstruction = instantané de construction).

**Incident CI rouge (règle 12 confirmée)** : le harnais local (sans
type-check) passait 75/75 mais `tsc strict` refusait le nouveau
fichier de tests — 8 annotations `'ville' is possibly 'undefined'`
(hors du `const { state, joueur, ville } = ctx`, `ville?: City` est
optionnel dans ContexteEffet). GitHub n'affiche que 10 annotations
max : le diff a été RE-LU en entier pour traquer d'éventuelles erreurs
cachées (aucune). Correctif `2d2b73f9` : 6 gardes
`assert.ok(ville, …)` (rétrécissement de type pour tsc strict,
pattern déjà éprouvé dans banque.test.ts). CI du correctif VERTE —
CI jeu #54, diag #210, Deploy Pages #1224, Deploy Edge Function #28
(le bundle moteur redéployé embarque la source régimes & cultures).
Vérifications : harnais 75/75 après correctif ; byte-à-byte 6/6
types.ts/registry.ts/banque.ts/regimes.ts/production.ts/
regimes-cultures.test.ts au sha `35c34bcd` + 1/1 au `2d2b73f9`.

## Brûlage #3, source 3/3 — les flux de progrès passent par la banque (2026-10-20)

Troisième et dernière source du brûlage #3 : le canal « Progrès » du
récap. Commit `cd791628` (6 fichiers). Les montants qui vivaient
codés en dur dans `fluxProgresJoueur` (engine/progresAuto.ts, ~150
lignes de `if aTech(...) add(...)`) deviennent des DONNÉES du
registre :

- **7 types d'effet nouveaux** dans la banque (chacun implémenté UNE
  fois) : `fluxSiCapitale` (canal prodCapitale — Musées +30 Tourisme,
  Garde suzeraine +12 Nourriture avec condition `suzerainDeCite`),
  `fluxParVille` (Assemblées scientifiques), `fluxParVilleProximite`
  (côtier — Cours de pêche × Mer), `fluxParRangHabitation`
  (Surconsommation : +1 Science +5 Tourisme par rang), `fluxParBatiment`
  (Industrialisation +1 Charbon ; filtre `famille` pour Merveilles
  naturelles/Merveilleux), `fluxParGarnisonHabitation` (Service
  militaire avancé : +0,5 Habitants × garnison), `fluxParTitre`
  (générique `prodParTitre` du référentiel : Commerce lointain
  +3 Or/Marchand, Prix Gorback Nobel +6 Science/Ministre, Culte de la
  personnalité +30 Tourisme/Ministre) — plus le réutilisé
  `fluxParAmenagement` (Engrais, Charues, Exploitation forestière
  avec Bois NÉGATIF, Stands de goodies, Fascination culturelle,
  Parcs naturels).
- **Table éditoriale `PROGRES_FLUX`** (30 règles, ids `tech.<slug>`,
  conditions `techNom` = nom de tech — homonymes matchés comme
  l'historique aTech) + `reglesProgres(config)` qui y ajoute les
  génériques prodParTitre traduits du référentiel (conditions `tech`
  par clé `<arbre>:<slot>`, application par arbre préservée).
- **`clesTechsParNom`** : la résolution nom → clés vit dans le
  REGISTRE ; `aTech` (moteur : réductions de coût, garnisons) et la
  condition `techNom` (banque) partagent la MÊME vérité.
- **`fluxProgresJoueur` = LIRE la banque** (une ligne) ; restent
  locaux, hors production par tour : `gainDeblocageProgres`
  (one-shot au déblocage = instantané, comme le Chancelier), les
  réductions de coût (coûts), les garnisons (valeurs d'état).

Sémantiques préservées exactement : capitale requise pour le canal
prodCapitale, application par arbre de prodParTitre, filtre famille
Merveille, montants négatifs (Bois −1/Charbon +1 des Scieries),
décédés exclus. Tests : +16 dans `src/rules/progres.test.ts`
(91/91 au harnais local, Node 22 strip-types SANS type-check) ;
registre 33 règles progrès, ids uniques, TYPES_CONNUSS étendu.

Vérifications : byte-à-byte 6/6 au sha `cd791628` ; CI VERTE au
premier coup — CI jeu #55, diag #211, Deploy Pages #1225, Deploy
Edge Function #29 (le bundle moteur redéployé embarque la voie
banque du canal Progrès). LIVE vérifié : le bundle déployé
(index-r0L6w5DM.js, Pages #1225) contient les chaînes
distinctives `fluxSiCapitale`, `fluxParRangHabitation`,
`fluxParGarnisonHabitation`, `fluxParTitre`, `suzerainDeCite`,
`techNom` (la banque du canal Progrès est en prod — pensez à
Ctrl+F5).

## Correctif egress Supabase — les états publiés n'embarquent plus la config (2026-10-20)

**Incident** : Supabase renvoie 402 `exceed_egress_quota` — quota
d'egress du plan Free (5 Go/mois, tout cumulé) épuisé. Cause mesurée :
le champ `state.config` — devenu un simple CACHE du moteur depuis la
règle 2026-10-19 (seule la mondiale `__config__` fait foi) — continuait
d'être PUBLIÉ dans chaque état de référence (~181 Ko, le référentiel
complet) puis RELU par chaque client à chaque fin de tour (realtime,
poll, relectures post-résolution) : ~1,5 Mo de config par tour et par
salon de 8 joueurs, pour un cache que chaque navigateur possède déjà.
Arbitrage de l'arbitre : rester sur Pages + Supabase, correctif payload
(demandé « repars de ce qui a été fait sur la branche v4 »).

**Correctif** (8 fichiers, porté sur les DEUX branches) :
- `etatReseau(state)` (engine/fusion.ts, pur, partagé client + Edge
  Function via le bundle `_engine.mjs`) : copie superficielle SANS la
  clé `config` (la clé est retirée, pas mise à null — le payload ne
  dépend pas du comportement de `JSON.stringify` sur `undefined`) ;
  ne mute pas l'original (le client garde son cache en mémoire).
- PUBLICATION : `publierEtatFusionne` (supabase/client.ts) et l'Edge
  Function `resoudre-tour` publient `etatReseau(...)` — le draft garde
  sa config en mémoire (runTurn l'a consommée avant la publication).
- INGESTION : les 5 sites du store qui avalent un état distant (callback
  realtime, `nextTurnV2`, `pollerBarriereV2`, `forceNextTurn`, repli
  `resoudreBarriereLocaleV2` : locale d'abord, mondiale ensuite)
  réinjectent la locale via `adopterConfig` (contrat configPriorite :
  mondiale adoptée au chargement — sans injection, l'UI et runTurn
  rouleraient sur `cfgOf(undefined)` = DÉFAUTS, bug classe
  « adultAge 16 »).
- TESTS : `src/state/payload.test.ts` (6 tests : clé absente du JSON,
  non-mutation, conservation du reste, ingestion, rétrocompat embarquée
  ≠ source, repli locale-puis-mondiale) ; `scripts/test-function.mjs`
  vérifie que le BUNDLE expose et retire (un bundle sans le helper n'est
  jamais déployé) ; stub `types/stubs.d.ts` étendu (typecheck du
  handler). Harnais : 97/97 (91 baseline + 6) sur les DEUX branches.

**Compatibilité** : les lignes existantes qui embarquent encore leur
config restent lisibles (le champ est ignoré — l'ingestion écrase le
cache par la locale, il n'est plus une source). Fenêtre courte : entre
le déploiement de la nouvelle Edge Function et le rechargement
(Ctrl+F5) de chaque joueur, un ANCIEN bundle client qui recevrait un
état sans config afficherait les défauts. Salon sans `__config__`
jamais publiée : le serveur résout désormais sur les défauts (plus de
cache embarqué pour l'amorcer) — publier une fois la config mondiale
depuis l'accueil si ce cas existe.

**Shas** : v4 `e7d5fcf9` (correctif demandé par l'arbitre, posé sur la
tête qui porte la publication conditionnée `c2b49c5c`) ;
chasse-et-peche-web `58a72c89` (SOURCE DU JEU LIVE — le deploy.yaml
checkoute TOUJOURS cette branche pour le build Pages ; un push v4 seul
ne change pas le jeu en prod). Intégrité byte-à-byte 8/8 au sha sur
chaque branche.

**Vérifications** : CI VERTE au premier coup sur les DEUX branches —
chasse-et-peche-web : CI jeu #57, diag #213, Deploy Pages #1232,
Deploy Edge Function #30 (la fonction redéployée publie sans la
config) ; v4 : deploy #1231. LIVE vérifié : bundle `index-BqeOLTZ4.js`
(nouveau hash) contient la forme minifiée d'`etatReseau`
(`const t={...e};return delete t.config,t`) — pensez à Ctrl+F5.
NB : v4 conserve 4 correctifs NON portés sur chasse-et-peche-web
(publication conditionnée CAS `c2b49c5c`, fusion déterministe +
conflits de cités journalisés, journal du Forcer, doc dette
déterminisme rng/newId) — à synchroniser à l'arbitrage de l'arbitre.

## Synchronisation v4 → production : les 4 correctifs portés (2026-10-20)

Arbitrage de l'arbitre : porter sur `chasse-et-peche-web` les 4
correctifs qui vivaient uniquement sur v4 (cf. section egress
ci-dessus). Périmètre établi par diff complet des deux têtes :
6 fichiers divergents, tous rattachés aux 4 correctifs (aucune
divergence résiduelle — les arbres jeu `src/`, `supabase/`,
`scripts/` sont à présent BYTE-IDENTIQUES entre les deux branches).

1. **Publication CONDITIONNÉE** (Edge Function `resoudre-tour`,
   v4 `c2b49c5c`) : l'UPDATE ne porte que si `tour_publie` n'a pas
   changé depuis la lecture (comparaison-et-échange atomique côté
   serveur) — deux exécutants simultanés du même tour ne peuvent plus
   ni s'écraser, ni purger la file de l'autre (le perdant voit
   `dejaPublie` sans purge). Complète l'idempotence existante.
2. **Fusion DÉTERMINISTE + conflits journalisés** (engine/fusion.ts +
   `type: 'Conflit'` dans types.ts, v4 `b6671187`) : les numéros de
   joueurs sont TRIÉS (l'ordre d'insertion de `Object.keys` rendait
   « le dernier gagne » des cités libres non reproductible entre
   clients et serveur) ; deux joueurs qui modifient la MÊME cité libre
   → version du plus petit numéro + événement Conflit visible pour
   l'arbitre (plus de last-write-wins silencieux).
3. **Journal du Forcer** (state/store.tsx) : les absents d'un tour
   forcé sont listés dans le salon via l'événement partagé
   `forcer_absents` (rejoué par la résolution) — un tour forcé sans
   les actions de certains joueurs ne peut plus passer pour normal.
4. **Doc dette déterminisme** (rng.ts + shared.ts) : périmètre
   documenté — les TIRAGES sont seuls reproductibles par graine ;
   les ids `newId` (Date.now + compteur) ne le sont pas (jamais utilisés
   dans le calcul).

Vérifications : harnais 97/97 sur le staging avant push ; intégrité
byte-à-byte 6/6 au sha ; CI VERTE au premier coup — CI jeu #59,
diag #215, Deploy Pages #1234, **Deploy Edge Function #31** (la
publication conditionnée est en prod côté serveur). LIVE vérifié :
bundle `index-COwg77pQ.js` (nouveau hash) contient
`forcer_absents` ×2 et « Tour forcé : sections de » — pensez à
Ctrl+F5. Shas : `chasse-et-peche-web` = `0fd913d7` (tête), v4 =
`e7d5fcf9` (inchangée — les deux branches portent désormais le même
code jeu).

## Rework des habitants — design arbitré et consigné (2026-10-20)

Après le correctif egress et la synchronisation v4 → production
(ci-dessus), l'arbitre a demandé une refonte complète du système
d'habitants. Analyse préalable du code : la plupart des champs
demandés (identité, dynastie, sexe, orientation, culture, ville,
statut, traits, mariage) EXISTENT déjà dans `Character` ; le rework
porte donc sur `titre` → `métier`, un nouveau champ `domicile`, la
suppression d'`ageMax` au profit d'une probabilité croissante de
maladie avec l'âge, et un système de caps de métiers par ville.

Quatre arbitrages tranchés par l'arbitre : (1) les rôles de cour
(Dirigeant, Héritier, Gouverneur, Ministre, Marchand, Professeur,
Maréchal) migrent DANS le champ métier ; (2) la capacité Chasseur
est paramétrable DIFFÉRENTE selon le type d'habitation (Ville vs
Château) ; (3) en cas de surnombre, les PLUS ÂGÉS perdent leur
métier en premier ; (4) Sans-emploi = aucun effet au plateau
(neutre, impôt nul). Santé : courbe de Gompertz calibrée
Monte-Carlo pour une espérance de vie ~60 ans, maladie = seule
cause de mort (un malade qui re-contracte meurt, règle existante).
Migration d'état versionnée (`SCHEMA_VERSION_ETAT`++) : titre→métier
(mapping 1:1), retrait ageMax, domicile→null.

Design détaillé consigné dans regles-et-arbitrages.md, section
« Rework des habitants » — c'est la référence de l'implémentation.
Découpage acté en 3 vagues (V1 moteur complet, V2 UI population/
métiers, V3 métiers par bâtiments + logements) ; AUCUN code de
ce rework n'est poussé à ce jour. Ce commit ne touche QUE la
documentation (docs/ia/) — la partie multijoueur n'est pas
impactée.

## Rework des habitants — VAGUE 1 IMPLÉMENTÉE (2026-10-20, soir)

La vague 1 (moteur complet) est poussée sur `chasse-et-peche-web`
(4 commits fractionnés — limite de taille d'outil de push — puis
suppression du tombstone : `src/engine/titres.ts` renommé
`src/engine/metiers.ts`) et en miroir sur `v4` (arbres src/
byte-identiques).

- **Renommage intégral** `titre` → `metier` (~60 fichiers) : moteur,
  UI, règles, état. `null` = Sans-emploi, rôle NEUTRE (impôt nul,
  aucun effet — verrouillé par test via `detailGainsVille`). Union
  des logs : `'Métier'` (nouvelles émissions) + `'Titre'` (legacy).
  Référentiel converti : `.metiers` (15), `.metiersEffets` (9),
  effets de techs `prodParTitre` → `prodParMetier`.
- **Champ `domicile`** (optionnel, null en vague 1, AUCUN effet) :
  compressé par `DEFAUTS_PERSO` (omis à l'écriture, ajouté par
  `elargirEtat`).
- **Mortalité Gompertz** : `ageMax`/`computeAgeMax`/`tryResurrection`
  retirés — `probaContracterMaladie(c, C) = min(maladieCap,
  maladieBase × exp(maladiePente × âge))`, `life_delta` module la
  pente (borné ±50 %). Calibration Monte-Carlo (N=200 000, mécanique
  exacte de `maladieStep` : contraction / re-contraction mortelle /
  guérison dégressive) : **0.0025 / 0.08 / 0.9** → E[décès] = 59,5,
  médiane 60, p10 48, p90 70.
- **Caps Chasseur** (seul métier plafonné en vague 1) : Ville 50 /
  Château 25 (« très généreux »), paramétrables. `capMetierVille` +
  `reaffecterMetiers` (nouvelle étape **2ter** dans `runTurn`, après
  `designerGouverneurs`, AVANT le calcul des gains) : surnombre → les
  plus âgés passent Sans-emploi ; places libres → les Sans-emploi
  ADULTES deviennent Chasseurs, les plus âgés d'abord, jamais les
  enfants. Les cités libres ne passent pas (hors champ vague 1).
- **Migrations versionnées** : état **v3** `migrerTitresVersMetiers`
  (joueurs ET cités libres via `toutesLesPopulations`, retrait
  `titre`/`ageMax`, `recap.titresAttribues` → `metiersAttribues`,
  idempotente, robuste à l'`elargirEtat` préalable de `loadLocal`) ;
  config **v3** (conversion champ par champ dans `cfgOf`,
  personnalisations conservées) + `mergeParams` traduit les anciennes
  clés `titreXxx` sans jamais écraser les nouvelles.
- **UI** : accents français restaurés partout (Métier, métiers ×
  taxes, « (sans métier) »…), colonne **Âge max retirée** de la table
  Population, classes CSS `picker-metier`/`refbat-metier`, onglets
  « Métiers ».
- **`scripts/diag.ts`** : seules les lectures du référentiel renommé
  sont patchées avec REPLI sur l'ancien format (`ref.metiers ??
  ref.titres`) — le moteur interne legacy du diag est volontairement
  inchangé (freeze accepté).
- **Tests** : harnais local `node --experimental-strip-types`
  112/112 verts (97 baseline + 15 nouveaux) : formule Gompertz +
  Monte-Carlo seedé (E ∈ [55, 66]), caps/surnombre/places libres/
  Sans-emploi neutre, `mergeParams` v3, `cfgOf` v2→v3, migrations v3.
  INCIDENT de la séance : le sandbox local a été RÉINITIALISÉ en
  cours de mise en œuvre — tout le travail a été reconstruit depuis
  le tarball `0d017a58` (aucune perte, harnais rejoué intégralement).
  INCIDENT CI (jeu ROUGE sur `8258fac`) : le `tsc --noEmit` strict
  de la CI a refusé 3 fichiers que le harnais local (Node 22
  strip-types, SANS type-check) exécutait très bien (112/112) :
  fixtures `traits: []` des nouveaux tests (Character.traits est un
  TUPLE `[string, string, string]`) et `Object.keys` sur un
  `recap.metiersAttribues` potentiellement null dans la migration v3
  (crash latent en plus du défaut de type). Correctif `e912455`
  (miroir v4 `60f9cba`) : fixtures à 3 traits `life_delta = 0`
  (Obstiné/Stérile/Fécond — pente Gompertz non modulée, tests
  formule et Monte-Carlo inchangés) + garde `existants == null`.
  CI VERTE sur les DEUX branches (jeu, build, diag, deploy Pages +
  Edge Function) ; LIVE vérifié : bundle `index-vkyhOHr1.js` (nouveau
  hash) contient « Métiers accessibles », « Tous les métiers »,
  « quitte le métier », la réaffectation (« places disponibles »)
  et la Gompertz ; plus AUCUN `ageMax` hors du `delete` de migration.
  NB : un doublon du commit docs (`9e5927e`) est parti sur un 503
  fantôme du push API (contenu identique, sans effet).

## Règles d'ingénierie durables (issues d'incidents réels)

1. **Jamais `a || b ?? c` sans parenthèses** — erreur de syntaxe JS/esbuild
   (incident (u) : build CI échoué pour ça).
2. **Vérifier l'équilibre des balises JSX avant tout push** : ni `tsc` (sur .ts) ni
   les tests natifs ne parsent le JSX. Un `<ErrorBoundary>` jamais refermé a fait
   échouer un build CI en production (incident (a)). Un contrôle automatique
   d'équilibre des 22 fichiers .tsx a été utilisé à l'époque ; le re-créer ou
   l'équivalent si l'on pousse du JSX modifié en masse.
3. **Hooks React : tous les `useState` AVANT tout retour anticipé**, sinon
   « Rendered more hooks than during the previous render » = page blanche sans message.
4. **`normaliserEtat(state)`** (engine/villes.ts) doit être appelé à TOUTE ingestion
   d'un état (chargement local, salon rejoint, import JSON, callback realtime) :
   une ville sans `batiments` ni `history` = crash moteur ET rendu.
5. **`SCHEMA_VERSION_CONFIG`** (config/defaultConfig.ts) : à incrémenter pour toute
   évolution du RÉGISTRE devant atteindre les configs existantes. Les configs sont
   convergées puis tamponnées : suppression/renommage d'une ligne dans les Paramètres
   = DÉFINITIF. Ne PAS incrémenter pour une migration ciblée qui doit respecter les
   suppressions de l'utilisateur (précédent : champ `taxes25` du marqueur (z)).
6. **Formulaires en cascade** : soumettre la valeur EFFECTIVE (`état || première
   option`), jamais l'état brut qui reste à `''` (incident (u)).
7. **Éditions scriptées (sed etc.)** : les numéros de ligne changent ENTRE deux
   invocations sur le même fichier → une seule invocation par fichier quand les
   adresses se chevauchent, sinon re-grep les cibles ; et TOUJOURS re-diffuser le
   fichier complet contre la base après une série d'éditions avant push (un éditeur
   a déjà supprimé des lignes hors zone cible, dont 10 lignes de referentiels.json →
   JSON invalide → 2 builds CI rouges).
8. **Repli texte conservé** : le champ `production` texte reste dans
   referentiels.json et sert d'affichage de repli ; le moteur lit `effets[]` en
   priorité. Les configs sans `effets` continuent de fonctionner.
9. **Docblocks = mémoire des arbitrages** : les docblocks du code archivent les
   décisions de l'arbitre avec leur date ; ne jamais les supprimer en « nettoyant ».
10. **Vérification post-push** : check-runs du sha (build/jeu/diag/deploy success)
    puis bundle live `assets/index-*.js` : nouveau hash + grep des nouvelles chaînes.
    Le CDN de raw.githubusercontent.com peut servir un contenu périmé juste après un
    push ; vérifier l'intégrité via un contenu à sha inédit ou via l'API.
11. **Cycles d'import moteur (incident CI #36 / Edge #16, 2026-10-19)** : la TDZ
    (`Cannot access 'X' before initialization`) n'est attrapée NI par tsc strict
    NI par le typecheck Edge — uniquement par l'EXÉCUTION. Après tout nouvel
    import entre modules du moteur, lancer les tests AVANT de pousser ; un module
    à effets de bord top-level (`AMENAGEMENTS` dans amenagements.ts) ne doit
    jamais se retrouver dans un cycle (le canal Commerce de `tourismeCourant`,
    regimes → commerce, l'a appris à nos dépens).
12. **lib ES2020 de la CI (incident CI #50, 2026-10-20)** : le tsc
    strict de la CI compile avec `lib: ES2020` — les API post-ES2020
    (`Array.prototype.at`, `findLast`, `Object.hasOwn`…) échouent au
    type-check alors que le harnais local (Node 22, sans type-check)
    les exécute très bien. Ne pas utiliser d'API post-ES2020 dans
    `src/` (ou passer la lib en ES2022 — à arbitrer à l'occasion d'un
    vrai besoin).
13. **`tsc --noEmit` strict REPRODUCTIBLE EN LOCAL, sans `npm ci`**
    (incident `8258fac`, 2026-10-20) : le harnais strip-types ne
    type-check RIEN — les 3 erreurs du commit passaient 112/112. Le
    tsc de la CI se reconstruit dans le bac : télécharger le tarball
    TypeScript de la version exacte du package-lock
    (registry.npmjs.org/typescript/-/typescript-5.9.3.tgz),
    l'extraire (plus les tarballs react/@types si absents), puis
    lancer `node <tsc>/bin/tsc --noEmit`. Artefacts locaux attendus :
    les erreurs de stub `src/supabase/client.ts` (paquet
    @supabase/supabase-js absent du bac, présent en CI — le fichier
    n'a pas changé) ; toute AUTRE erreur est réelle. À lancer avant
    tout push de .ts/.tsx (seul filet sur les .tsx, cf. règle 2).

## Raccourci git

Les messages de commit sont rédigés en français et documentent chaque refonte : pour
comprendre une zone de code, `git log --oneline -- <fichier>` et les messages de
commit sont la source la plus rapide (chaque marqueur/commit cite ses arbitrages).
