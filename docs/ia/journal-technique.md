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

## Raccourci git

Les messages de commit sont rédigés en français et documentent chaque refonte : pour
comprendre une zone de code, `git log --oneline -- <fichier>` et les messages de
commit sont la source la plus rapide (chaque marqueur/commit cite ses arbitrages).
