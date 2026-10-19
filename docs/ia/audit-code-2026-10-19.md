# Audit complet du code — 2026-10-19

Rapport d'audit statique exhaustif du jeu « Chasse & Pêche » (dépôt `losth230/quartz`,
branche `chasse-et-peche-web`). Audit réalisé sur la tête `66282293` le 19/10/2026 ;
les problèmes P0 ont été corrigés le soir même (commits `362e1db4` puis `ccfa04ef`,
documentation `857e1b2d`). Ce document fait foi pour les problèmes restants : avant
de « redécouvrir » un des points ci-dessous, vérifier ici s'il n'est pas déjà connu
et priorisé.

**Périmètre** : moteur, store, fusion multijoueur, Edge Function, schémas SQL, UI,
règles (`src/rules/`), tests, CI.
**Volumétrie** : 63 fichiers TS/TSX, ~21 800 lignes de code de jeu (hors site Quartz),
48 tests natifs + 12 tests de rendu, 5 workflows CI.
**Méthode** : revue statique exhaustive + sondage en lecture seule de l'API GitHub
Actions et de l'Edge Function déployée. Aucune écriture sur la partie en ligne
(salon de test jetable `audit-probe-fix`, neutralisé puis purgé manuellement).

## Statut des correctifs (mise à jour du 19/10 au soir)

| Réf | Problème | Statut |
|-----|----------|--------|
| B1 | Edge Function : `cfgMondiale` non défini → 500 à CHAQUE résolution serveur | ✅ corrigé (`362e1db4`) |
| B2 | `pollerBarriereV2Ref` déclaré et appelé mais jamais assigné | ✅ corrigé (`362e1db4`) |
| B4 | Le Tourisme copié par une route commerciale était affiché (canal Commerce) mais jamais crédité au stock | ✅ résolu (arbitrage Thibaut + `ee26eb80` + correctif cycle `06422b9`, 2026-10-19) |
| R1 | La CI ne type-checkait pas le handler Deno (cause racine de B1) | ✅ corrigé (`ccfa04ef`) |
| R2 | RLS ouverte à `anon`, y compris DELETE | ⚖️ arbitré : assumé, modèle « amis de confiance » (Thibaut, 2026-10-19) — risque documenté, aucun changement SQL |
| R3 | Retour de `saveLocal` jamais vérifié (quota localStorage) | ✅ résolu (arbitrage « bandeau d'alerte » + `dea1997`, 2026-10-19) |
| R4 | Fusion multijoueur sans validation de forme | ✅ résolu (arbitrage « rejet + journal visible » + `3b964cf`, 2026-10-19) |
| R5 | Mélange de protocoles v1/v2 possible dans un salon | ✅ résolu par brûlage du protocole v1 (`27a5173c` + `166a7ab`, 2026-10-19) |
| M1-M7 | Problèmes moyens | ✅ traités (arbitrages Thibaut 2026-10-19 : M1 « ids purs », M7 « retrait complet » ; `5576b25` + `4d13324` + `c41ac32` + `13a6520`) |

Preuve en production après correctif : résolution serveur vérifiée bout-en-bout sur
un salon de test (`{ok:true, tour:2}`), idempotence confirmée (2e appel =
`dejaPublie`), config mondiale injectée dans l'état publié, garde `tour_publie`
posée.

## Verdict global

Code de très bonne qualité pour un projet de cette nature : architecture claire
(moteur pur sans React, façade `engine.ts`, couche `rules/` en migration maîtrisée),
hygiène exemplaire (strict + `noUnusedLocals/Parameters`, zéro `any` hors parsing
JSON du référentiel, pas de `console.log` parasite, pas de TODO), robustesse soignée
(migrations versionnées, garde-fous, replis en cascade documentés), documentation
exceptionnelle (AGENTS.md, docblocks-mémoire).

L'audit a néanmoins découvert 2 bugs réels dont 1 en production, tous deux dans la
couche multijoueur v2 introduite/refondue le 2026-10-19 — passés inaperçus car la CI
ne testait pas le handler Deno lui-même. Le jeu continuait de fonctionner grâce aux
replis, mais l'architecture « serveur autoritaire » était inopérante en production.
**Corrigé le soir même** (voir le tableau ci-dessus).

## 🟥 Bugs bloquants — CORRIGÉS le 19/10 soir

### B1 — Edge Function : `cfgMondiale` n'existe pas → toute résolution serveur échouait

`supabase/functions/resoudre-tour/index.ts` (tête auditée `66282293`, ligne 107) :

```ts
appliquerConfigMondiale(draft, cfgMondiale)   // ← cfgMondiale n'est défini NULLE PART
```

- La variable `cfgMondiale` n'était ni déclarée ni importée dans ce fichier :
  `ReferenceError` attrapé par le `catch` global → réponse 500.
- Introduit par le commit `714a54bb` (2026-10-19, série « config mondiale »). Le
  workflow « Deploy Edge Function » a tourné avec succès sur ce commit et tous les
  suivants : la fonction déployée contenait le bug, tous contrôles verts.
- **Impact** : chaque « Fin de tour » multijoueur tentait la résolution serveur →
  500 → repli local `resoudreBarriereLocaleV2` chez le dernier pousseur. Le jeu
  avançait quand même (le repli fait fusion + événements + config mondiale +
  `runTurn` + publication), donc personne n'a rien vu — mais l'atomicité promise
  (verrou, transaction, publication serveur) était perdue : résolution par un client
  arbitraire, double-résolution simultanée non exclue par le verrou.
- **Correctif appliqué** (`362e1db4`) — lire la ligne `__config__` avant l'injection
  (même sémantique que le repli client : absente → null → config embarquée conservée) :

```ts
// CONFIG MONDIALE : la ligne '__config__' porte la config publiée
const { data: cfgRow } = await sb.from('parties_chasse_peche')
  .select('state').eq('id', '__config__').maybeSingle()
const cfgMondiale = (cfgRow?.state as { config?: GameConfig })?.config ?? null
appliquerConfigMondiale(draft, cfgMondiale)
```

### B2 — `pollerBarriereV2Ref` déclaré et appelé… mais jamais assigné

`src/state/store.tsx` (tête auditée `66282293`) :

- `const pollerBarriereV2Ref = useRef<...>(async () => {})` (no-op) ;
- `void pollerBarriereV2Ref.current(attendus, st.turn)` — appelé quand un joueur
  pousse sa section **sans être le dernier** ;
- **aucune ligne n'assignait `pollerBarriereV2Ref.current`** (le twin
  `resoudreBarriereLocaleV2Ref` l'est bien — et la fonction `pollerBarriereV2`
  n'existait même pas dans le fichier).

**Impact** : les clients en attente ne pollaient jamais la barrière ; seule la
realtime / la résolution par le dernier pousseur faisait avancer le tour. Si ce
dernier pousseur fermait son onglet ou perdait le réseau juste après avoir poussé
sa section, le salon se bloquait pour tout le monde (seuls « ⏭ Forcer » ou un
rechargement débloquaient). Origine : la purge qualité du 19/10 a supprimé
`pollerBarriereV2` comme « code mort » (réputé remplacé par le realtime), mais
l'appel qui pointait dessus est resté.

**Correctif appliqué** (`362e1db4`) : `pollerBarriereV2` implémentée (poll de la
barrière toutes les 2 s, max 2 min, arrêt si le tour local a avancé, résolution
serveur idempotente avec repli local) et assignée au ref, comme son jumeau.

## 🟠 Risques élevés

### R1 — CORRIGÉ : la CI ne type-checkait pas le handler Deno (pourquoi B1 est passé vert)

`npm run test:function` (scripts/test-function.mjs) ne teste que le **bundle moteur**
`_engine.mjs` (`runTurn`, `normaliserEtat`) — jamais le handler `Deno.serve` lui-même.
`npx tsc --noEmit` ne couvrait pas non plus `supabase/functions/` (tsconfig du jeu :
`include: ["src"]`). Résultat : un identifiant non défini dans `index.ts` passait
tous les contrôles et partait en prod.

**Correctif appliqué** (`ccfa04ef`) : check strict dédié
`npx tsc -p supabase/functions/resoudre-tour/tsconfig.check.json` (stubs jsr: et
`_engine.mjs` dans `types/stubs.d.ts`), branché dans CI jeu ET deploy-function.
Validé en POSITIF (handler corrigé = pass) et en NÉGATIF : le bug historique rejoué
→ `TS2304: Cannot find name 'cfgMondiale'` → la CI échoue. NB : un `deno check`
complet a été essayé en premier et échoue en CI (il tente d'installer les
dépendances npm transitives de supabase-js hors package-lock — jsr 2.118.0 vs
package-lock) ; c'est pourquoi le check passe par `tsc` + stubs.

Recommandation restante : un test d'intégration du handler avec un mock de
`createClient` (sections → fusion → publication), en plus du test de bundle.

### R2 — Schéma Supabase : RLS totalement ouverte, y compris DELETE

`schema.sql` / `schema-v2.sql` : `anon` peut SELECT, INSERT, UPDATE **et DELETE** sur
`parties_chasse_peche` et `cp_events` (policies `to anon using (true)`). La clé
publishable est publique et en dur dans le client. Modèle assumé (« salon par code »,
amis de confiance) et documenté, mais :

- n'importe qui connaît l'URL peut **effacer les sections d'un salon pendant la
  barrière** (sabotage silencieux : la résolution ne voit plus les joueurs « prêts »),
  écraser l'état publié, ou supprimer la ligne `__config__` ;
- la policy DELETE sur `cp_events` est plus large que nécessaire (la purge légitime
  vient de l'Edge Function avec la `service_role`, qui ignore la RLS).

**Recommandations** (sans toucher au modèle « sans auth ») :
1. Retirer la policy DELETE à `anon` sur `cp_events` ; le repli client
   `delete ma ligne` de `pousserSectionV2` (index absent) devrait passer par une
   RPC dédiée si l'upsert échoue, pas par un DELETE ouvert.
2. Restreindre UPDATE de `parties_chasse_peche.state` à la `service_role` (l'état
   ne devrait être écrit que par la résolution) et ne laisser à `anon` que
   l'écriture de `sections`/`cp_events`.
3. Documenter dans AGENTS.md que le `forceNextTurn` publie en direct → si `state`
   passe en service-only, le Forcer doit invoquer l'Edge Function (déjà le cas en
   v2) et son repli local doit être repensé (voir R5).

**→ Arbitré (Thibaut, 2026-10-19) : NE RIEN TOUCHER — modèle « salon par code,
amis de confiance » ASSUMÉ.** Le risque est documenté et accepté tel quel :
aucune policy SQL modifiée, aucun changement client. Les recommandations
ci-dessus restent en réserve (P2-documentation) si le contexte change
(parties publiques, salon ouvert à des inconnus).

### R3 — localStorage : quota dépassable en fin de partie, échec silencieux

L'état atteint ~5 Mo (et jusqu'à ~12 Mo de JSON non compacté à 16 000 habitants
d'après les commentaires du code) ; beaucoup de navigateurs plafonnent localStorage
à 5-10 Mo par origine. `storage.saveLocal` attrape l'exception et **retourne `false`,
que personne ne vérifie**. En fin de partie multijoueur, la sauvegarde locale peut
donc échouer silencieusement à chaque mutation → un rechargement en milieu de tour
perd les actions non poussées.

**Recommandations** : vérifier le retour de `saveLocal` et afficher un bandeau
(« sauvegarde locale impossible, quota dépassé ») ; à terme, migrer vers IndexedDB
(pas de quota en Mo) — d'autant que le repli « fermeture d'onglet » a été supprimé :
localStorage est la SEULE protection anti-perte du tour en cours.

**→ RÉSOLU (2026-10-19, arbitrage Thibaut « bandeau d'alerte » + correctif
`dea1997`) : `persist` vérifie désormais le retour de `storage.saveLocal` et arme
`saveLocaleEchec` (exposé par le contexte de jeu) ; TurnBar affiche un bandeau
⚠ « Sauvegarde locale impossible (quota du navigateur dépassé) » avec un bouton
d'export JSON immédiat — la partie ne vit alors plus qu'en mémoire, l'export est
la copie de secours. IndexedDB reste une piste de fond (P2, point 9).**

### R4 — Fusion multijoueur sans validation de forme

`fusionnerSections` applique au mot : `Object.assign(pj, sec.player)`,
`draft.population[n] = sec.population`, `routes.push(...)`. Les sections viennent
du réseau (`cp_events.payload`, JSON non contrôlé) : un client bogué — ou
malveillant puisque RLS ouverte — peut injecter des objets malformés (types
inattendus, `"tour": "abc"`, population non tableau…) qui crasheront `runTurn` au
moment de la publication, côté serveur ou repli. Le moteur est pur et typé, mais
sa frontière réseau ne l'est pas.

**Recommandation** : une fonction `validerSection(payload)` minimaliste (types des
5 champs, `tour` nombre, `player.n` nombre), rejet silencieux + log, partagée
client/serveur comme `fusionnerSections`.

**→ RÉSOLU (2026-10-19, arbitrage Thibaut « rejeter + journal visible » +
correctif `3b964cf`) : `sectionValide()` est exportée de fusion.ts (contrat
minimal : `tour` nombre fini ; `player` objet, `population`/`routes`/
`citesLibres`/`log` tableaux, s'ils sont présents) et appelée dans la boucle de
`fusionnerSections` — une section invalide est rejetée ENTIÈRE (jamais de
demi-fusion qui casserait `runTurn` à la publication) avec une entrée VISIBLE
dans le journal du tour (type Système : « ⚠ Section invalide ignorée… — les
actions de Jn ne comptent pas pour ce tour ») ; les clés non numériques sont
ignorées sans trace. Partagée client + Edge Function (le bundle `_engine.mjs`
embarque la validation → la résolution serveur est protégée aussi). Tests de
régression dans fusion.test.ts (13 tests au total).**

### R5 — Mélange de protocoles v1/v2 possible dans un même salon

Le toggle v1/v2 (`cpe.proto2`) est **par joueur, par navigateur** (localStorage).
Rien n'empêche un salon où 7 joueurs sont en v2 (events append-only) et 1 en v1
(colonne `sections`) : la barrière v2 ne verra jamais la section du joueur v1 →
tour bloqué jusqu'au Forcer (qui ignore ses actions). Le défaut est v2 et le
toggle est présenté comme dépannage, mais l'incident est plausible (un joueur qui
revient en v1 « parce que ça marchait mieux » bloque tout le salon sans le savoir).

**Recommandation** : au `joinGame`/réintégration, lire un marqueur de protocole du
salon (ex. colonne `proto` posée par le premier push v2) et forcer/refuser le
downgrade ; ou à défaut, afficher un avertissement croisé (« J4 semble jouer en v1 »).

**→ RÉSOLU (2026-10-19, brûlage)** : plutôt qu'une garde anti-mélange, l'arbitre a
fait retirer le protocole v1 ENTIER (`27a5173c`, correctif CI `166a7ab`) —
`pousserSection`/`lireBarriere`, `proto2Actif`, branche v1 de `nextTurn`,
`resoudreBarriere`/`pollerBarriere`, bouton de bascule de la barre : le mélange
est désormais IMPOSSIBLE. La clé localStorage `cpe.proto2` résiduelle dans les
navigateurs est silencieusement ignorée.

## 🟡 Problèmes moyens

| # | Où | Problème | Détail / suggestion |
|---|---|---|---|
| M1 | `engine/types.ts` (et `sante.ts`, `PopulationTable.tsx`, `naissances.ts`) | **Identité démographique par nom complet** : `mariage`, `mere`, `pere` sont des strings « Prénom Nom » | À 16 000 habitants, les collisions de noms complets sont probables (générateurs à listes finies) → mauvais conjoint veuvé, mauvaise filiation. Les `id` existent déjà : migration d'état (nouvelle version dans `migrations.ts`) vers `mariageId`/`mereId`/`pereId` avec repli nom. C'est le plus gros chantier de fond du moteur. **→ RÉSOLU (`5576b25`, arbitrage Thibaut « ids purs ») : champs `mariageId`/`mereId`/`pereId`/`pereBioId` ajoutés à Character (noms conservés pour l'affichage, tenus en sync à chaque mutation) ; TOUTE résolution passe par les ids (veuvage sante/armees/UI, filiation et arbre généalogique, consanguinité, index de fecondité) ; SANS rattrapage des vieilles sauvegardes (elles n'ont plus lieu d'exister — leurs relations tombent à null) ; compaction : les ids null sont omis (DEFAUTS_PERSO) ; 3 tests M1 dans mutateurs.test.ts.** |
| M2 | `state/store.tsx` (`setGlobalCfg`) | **Branche morte** : `if (stateRef.current) return` en tête, puis `const s = stateRef.current; if (s) {...}` — jamais atteinte | Reste du refactor « config hors partie » ; à supprimer pour éviter toute confusion. **→ RÉSOLU (`c41ac32`) : branche supprimée, commentaire RETRAIT posé.** |
| M3 | `components/TurnBar.tsx` (bouton `✕`) | **Reset sans confirmation** | Un clic sur `✕` efface la sauvegarde locale + le salon persisté, sans `window.confirm` (les actions destructrices voisines en ont toutes un). En multijoueur, le salon distant survit (rejoignable), mais la partie locale est perdue. **→ RÉSOLU (`c41ac32`) : window.confirm AVANT l'effacement (comme les actions destructrices voisines).** |
| M4 | `engine/constructions.ts` (`constructionRef`) | **Fallback silencieux par nom** : `(groupe ? liste.find(groupe) : undefined) ?? liste[0]` | Avec les constructions doublées Ville/Château, un groupe erroné retourne la variante « Ville » sans signal. Acceptable par pragmatisme, mais logguer le repli en debug. **→ RÉSOLU (`c41ac32`) : repli ASSUMÉ et documenté dans le docblock de constructionRef (moteur pur, zéro console — pas de log possible en chemin chaud d'affichage).** |
| M5 | `villes.ts` / `economie.ts` / `titres.ts` | **Associations par nom de ville** (gouverneur, `c.ville`, filtres de population) | Le renommage automatique des villes transférées est géré (`Capitale 2`), mais tout renommage manuel futur casserait gouverneurs + rattachements. À garder en tête pour toute évolution UI de renommage. **→ DOCUMENTÉ (`4d13324`) : note M5 posée dans transfererVille (villes.ts) — le renommage MANUEL devra répercuter le nom sur gouverneurs + populations + rattachements.** |
| M6 | `sante.ts` / fusion | `transfererVille` crédite un Tourisme « statique » à la réception (`tourismeStatiqueBatiment`), alors que la sémantique actuelle (retour 2026-10-16) est « stock = production courante » (resynchronisé au prochain tour) | Incohérence transitoire sans gravité (le resync du tour suivant répare), mais à unifier. **→ RÉSOLU (`4d13324`) : le receveur est resynchronisé APRÈS avoir reçu la ville (stock = production courante, canaux flux compris) ; le donneur resynchronisé après la perte ; le crédit « statique » manuel par bâtiment SUPPRIMÉ.** |
| M7 | `supabase/schema-v2.sql` + Edge Function | **Verrou consultatif sur connexions poolées** : `pg_try_advisory_lock` via PostgREST tient sur une connexion du pool ; l'`unlock` (autre requête, autre connexion probable) ne libère rien | En pratique sans conséquence (la vraie protection = `tour_publie` + index unique + déterminisme de `runTurn`), mais la promesse « un seul exécutant » n'est pas garantie. À documenter comme garde-fous réels : idempotence par `tour_publie`, index unique, déterminisme. **→ RÉSOLU (`13a6520`, arbitrage Thibaut « retrait complet ») : les 2 appels RPC retirés du handler ; fonctions `cp_advisory_*` DROPPÉES du schéma (drop if exists pour les installations existantes) ; les vrais garde-fous (tour_publie, index unique, déterminisme de runTurn) documentés en tête du handler.** |

## 🟢 Dette mineure / cosmétique

- **Doc drift Tourisme** : AGENTS.md disait « Tourisme et Garnison instantanés, le
  Tourisme est crédité UNE fois à la construction » — contredisait le code actuel
  (`RESSOURCES_INSTANTANEES = {'Garnison'}` seul, Tourisme = flux avec
  `stock = production`, retour arbitre 2026-10-16). **AGENTS.md réaligné le 19/10
  soir** ; les commentaires internes de `constructions.ts` (bloc du marqueur (s),
  l.143-144) se contredisent toujours avec le docblock l.150-155 — à réaligner à la
  prochaine retouche du fichier, sinon le prochain contributeur (ou moteur IA)
  réintroduira l'ancienne règle.
- `engine/shared.ts` — `newId()` mélange `Date.now()` + compteur module + RNG : la
  reproductibilité stricte par graine n'est pas garantie pour les ids (les tirages
  RNG restent déterministes). Peu important, mais contredit la promesse « partie
  rejouable » du docblock de `rng.ts`.
- `state/storage.ts` (`saveLocal`) : le `WeakSet dejasCompacts` ajoute la **copie**
  mais teste l'**original** — jamais utile. Inoffensif, micro-perf.
- `vite.config.ts` : commentaire de `base` obsolète (« GitHub Pages
  /Chasse-et-Peche/ » — le jeu vit sous `/quartz/jeu/`).
- `config/defaultConfig.ts` : ~11 casts `as any` concentrés sur le parsing de
  `referentiels.json` — zone à typer un jour (le reste du code est any-free).
- `pousserSection` (v1, colonne `sections`) fait un lire-modifier-écrire non
  atomique — reconnu en commentaire ; le protocole v2 (append-only) est la bonne
  réponse, v1 ne mérite plus d'investissement. **Retiré le 2026-10-19 (`27a5173c`) :
  la fonction n'existe plus dans le code.**
- Tests de rendu : assertions de type « fumée » (longueur HTML + présence de
  titres). Correct pour le coût, mais ils n'attraperaient pas un tableau rendu avec
  de mauvaises données.
- Couverture unitaire absente sur : démographie détaillée (`naissances`, `sante`),
  `commerce`, `citesLibres`, `victory`, `production` (seule la régression 20 tours +
  les tests de mutateurs couvrent le cœur). Dette connue et assumée ; priorité aux
  modules touchés par les prochains arbitrages.

## ✅ Points forts (à préserver)

1. **Architecture** : moteur 100 % pur (aucun React dans `engine/`), façade
   `engine.ts`, fusion/événements partagés client-serveur via un module unique
   (`fusion.ts`), couche `rules/` en strangle pattern propre.
2. **Hygiène** : `strict` + `noUnusedLocals/noUnusedParameters` activés ; 11 `any`
   en tout (parsing JSON) ; zéro `TODO`/`console.log` ; imports morts purgés.
3. **Robustesse multijoueur** (conception) : append-only + index unique
   `(salon, tour, joueur, type)`, garde anti-rollback SQL (`garde_tour_publie`),
   migrations d'état versionnées rejouées côté serveur avant fusion, sections
   rafraîchies à chaque mutation (upsert idempotent), garde « tour strictement plus
   récent » en realtime, réintégration auto au rechargement.
4. **Repli en cascade documenté** : serveur → résolution locale avec publication →
   résolution solo ; chaque étape cite le bug historique qui l'a motivée. Les
   docblocks sont une mémoire d'ingénierie rare et précieuse.
5. **CI** : typecheck strict + 48 tests + bundle Edge Function testé en exécution +
   build vite, par push ; déploiement Pages/Function automatisé.
6. **Sécurité des secrets** : publishable key assumée et documentée, token Supabase
   en GitHub Secret, aucune clé de service côté client.

## 📋 Plan d'action recommandé

**P0 — avant la prochaine partie en ligne : FAIT le 19/10 soir**
1. ✅ Fixer B1 : lire `__config__` dans l'Edge Function et redéployer (`362e1db4`).
2. ✅ Fixer B2 : implémenter `pollerBarriereV2` + assignation du ref (`362e1db4`).
3. ✅ Étendre la CI : `tsc` dédié sur `supabase/functions/` (`ccfa04ef`) — validé
   positif et négatif (le bug rejoué fait échouer la CI).

**P1 — prochaine vague qualité**
4. ✅ Vérifier le retour de `saveLocal` + bandeau quota (R3) — FAIT le
   2026-10-19 (`dea1997`) : `persist` arme `saveLocaleEchec`, TurnBar affiche
   le bandeau avec export JSON de secours.
5. ⚖️ Serrer la RLS (R2) — ARBITRÉ le 2026-10-19 (Thibaut) : modèle « amis de
   confiance » ASSUMÉ, on ne touche à rien — le risque reste documenté
   (section R2).
6. ✅ `sectionValide()` à la fusion (R4) — FAIT le 2026-10-19 (`3b964cf`) :
   rejet ENTIÈR + journal visible ; la garde anti-mélange v1/v2 (R5) est
   SANS OBJET : le protocole v1 a été brûlé le 2026-10-19 (`27a5173c`).

**P2 — chantiers de fond**
7. ✅ Migration démographie vers des ids — FAIT le 2026-10-19 (`5576b25`,
   arbitrage Thibaut « ids purs » : `mariageId`/`mereId`/`pereId`/`pereBioId`,
   PAS de migration de rattrapage des vieilles sauvegardes — elles n'ont
   plus lieu d'exister).
8. ✅ Réaligner les commentaires internes Tourisme de `constructions.ts` —
   FAIT le 2026-10-19 (`ebb5d1e`) : commentaires réalignés sur la sémantique
   arbitrée (Tourisme = flux, stock = production) dans constructions.ts,
   batiments.ts, commerce.ts, types.ts et villes.ts ; et la voie de calcul
   Tourisme est UNIFIÉE sur la banque (productionTourismeBatiment lit la
   règle — plus de regex sur les textes).
9. IndexedDB pour la persistance locale — **ABANDONNÉ le 2026-10-19
   (décision Thibaut : « pas d'IndexedDB », la persistance localStorage
   suffit)** ; unitaires
   démographie/commerce (partiellement couvert : 3 tests M1 démographie dans
   mutateurs.test.ts) ; ✅ reset avec confirmation (M3, `c41ac32`) ;
   ✅ branche morte `setGlobalCfg` (M2, `c41ac32`).

Le P2 est désormais INTÉGRALEMENT traité (points 7-9 ci-dessus).

---

*Audit du 19/10/2026 sur `66282293` ; correctifs P0 appliqués le soir même
(`362e1db4` = B1+B2, `ccfa04ef` = check CI handler, `857e1b2d` = documentation).
Mise à jour de ce rapport : même date, au push de ce fichier.*

## Annexe (19/10, soir) — État de la banque d'effets (`src/rules/`), analyse pré-brûlage

Analyse demandée avant d'engager les « brûlages » (aucune partie en cours). Concerne la
couche banque d'effets / registre de règles (refactor 2026-10-18).

### Le contrat est sain — à GARDER, pas à brûler

Trois couches propres (`rules/types.ts` types stables, `rules/effects/banque.ts`
implémentation unique, `rules/registry.ts` registre-données), immuabilité (un effet
renvoie sa contribution, ne mute jamais l'état), contexte lecture-seule, et surtout un
**test d'ÉQUIVALENCE** : « la banque redonne exactement le moteur historique sur toutes
les constructions » (77/77) + « toute construction à effets a SA règle » + ids
stables/uniques (aucune collision `(nom, groupe)` — les 15 doublons Ville/Château sont
correctement distingués par `@groupe`).

### Complétude : NON — 1 source migrée sur ~10, et 70 % des constructions

- `registreComplet()` ne produit QUE `reglesConstructions()`. Sources prévues dans
  `SourceRegle` mais **sans aucun producteur** : dogme, faction, régime, culture, tech,
  ministre, événement, laurier — leurs effets restent codés en dur dans le moteur
  (`ministeres.ts`, `factions.ts`, `regimes.ts`, `progresAuto.ts`, `culture.ts`).
- 77/109 constructions du référentiel ont des effets structurés (migrées vers la
  banque) ; **32 restent en texte seul** (dont Tour de sorcier, Camp de bâtisseurs,
  Hôpital, Clinique, Temple du soleil, bâtiments de faction) → repli parser texte.
- 14 des 16 types d'effets de la banque n'ont **aucun producteur**. `tourismeInstantane`
  est mort depuis le retour arbitre 2026-10-16 (le registre mappe Tourisme → `fluxVille`).

### Usage : 2 sites de consommation, et 3 interprétations parallèles

La banque n'est branchée que sur `effetsConstructionRef` (flux récap) et
`garnisonConstructionRef` (garnison). Les accesseurs `effetsEteConstructionRef`,
`instantanesConstructionRef`, `eteSeulementRef` **dupliquent l'interprétation des
effets localement** au lieu de passer par la banque (même sémantique en 2 exemplaires —
les canaux `fluxEte`/`instantanes` de `ContributionEffets` existent mais ne servent pas).

### 🟥 2 nouveaux bugs trouvés (sémantique Tourisme à double voie)

Le Tourisme vit en effet sur **deux voies** : `tourismeStatiqueBatiment` (stock =
production, attrait, conversion culturelle, canal 7 de `tourismeCourant`) ET le flux
banque (`fluxVille`, récap, été, copie de commerce). Elles doivent s'accorder par
convention, pas par construction — et divergent :

- **B3 — Attrait migratoire double-compté** : `attraitTouristiqueVille`
  (production.ts) additionne le Tourisme STATIQUE et `productionVille().total`
  (qui contient le flux banque) → pour les 15 constructions structurées portant du
  Tourisme (Chapelle +35, Église +8, Foire +5, Grands bains…), le Tourisme compte
  DEUX FOIS dans l'attrait (une Chapelle = +70 au lieu de +35). Impacte la heatmap
  de la page Pays et la migration spontanée (`migrationTourisme`). Introduit par le
  retour 2026-10-16 (stock = production), pas par la banque — la banque reproduit
  fidèlement le moteur (le test d'équivalence l'encyclopedise).
  **→ SANS OBJET depuis le retrait de l'attrait migratoire (2026-10-19, `2c24bd3a`) :
  le système entier a été retiré sur retour arbitre (à refaire), B3 ne peut plus se
  produire.**
- **B4 — Le commerce copie le Tourisme** : `ressourcesCopiables` (commerce.ts) lit
  `effetsConstructionRef` ; son docblock affirme « les instantanés (Tourisme, Garnison)
  sont déjà exclus », mais depuis le mapping flux, le Tourisme EST dans le flux → un
  marchand peut copier le Tourisme d'un aménagement (ex. Foire +5/tour), affiché au
  canal Commerce… puis **écrasé à la fin de tour** par `resynchroniserTourisme`
  (`tourismeCourant` n'a pas de canal commerce) : affiché, jamais crédité au stock.
  Contredit l'arbitrage (u) « instantanés jamais copiés ». **→ RÉSOLU (2026-10-19,
  arbitrage Thibaut + `ee26eb80` + correctif cycle d'import `06422b9`) : le Tourisme
  EST copiable par design (« le stock n'est jamais mis à jour avec la production,
  il est recalculé pour l'égaler — stock = production ») ; le résidu réel était
  l'absence du canal Commerce dans `tourismeCourant` (affiché, jamais crédité) —
  la copie compte désormais dans le stock ; docblocks périmés de commerce.ts
  réalignés ; test de régression commerce.test.ts.**

**Recommandation racine** : arbitrer UNE sémantique Tourisme (une seule voie de vérité)
AVANT de migrer les autres sources vers la banque — sinon B3/B4 se propageront à chaque
nouvelle source branchée. **Sémantique arbitrée le 2026-10-19 (retour Thibaut) : le
Tourisme est un flux normal dont le stock n'est jamais cumulé — recalculé à chaque
fin de tour (stock = production), la copie commerce comprise ; la voie de calcul
est UNIFIÉE sur la banque depuis le 2026-10-19 (`ebb5d1e`).**

### Contournements autonomes (hors banque, à recenser pour le brûlage)

Effets ministres (tous), règles de faction **(RETIRÉES du code le 2026-10-19,
`2c24bd3a` — les fiches peuples restent dans le référentiel comme source de refonte)**,
lois de régimes, canal Progrès
(`progresAuto.ts`, réintégré par la refonte), règles culturelles, `EFFETS_FORCES`
(4 bâtiments hors référentiel : Ponton, Port de pêche, Port de commerce, Guilde des
marchands), `reductionCampDeBatisseurs` (regex sur texte de description + défaut
codé en dur), `prerequisConstruction` (regex sur texte de coût). Plus un cycle
d'imports constaté : `engine/constructions → rules/effects/banque → engine/factions →
engine/batiments → engine/constructions` (famille des 13 cycles différés).

### Décision de brûlage qui en découle

La banque est la **bonne base** (contrat sain, testée, unique point de vérité pour
« une règle = une donnée »). Ne pas la brûler. Le brûlage pertinent :
1. ✅ corriger B4 — RÉSOLU (2026-10-19, arbitrage Thibaut : Tourisme copiable,
   stock = production ; `ee26eb80` + correctif cycle `06422b9`) ; B3 est SANS
   OBJET depuis le retrait de l'attrait migratoire (`2c24bd3a`, 2026-10-19) ;
2. ✅ RÉSOLU (2026-10-19, retour Thibaut « tout ce qui a rapport à une
   production passe par la banque », `ebb5d1e`) — la voie Tourisme est
   UNIFIÉE (productionTourismeBatiment lit la règle de banque, plus aucune
   regex sur les textes) et le repli texte est SUPPRIMÉ : `parseProductionTexte`,
   l'analyseur local de batiments.ts, `EFFETS_FORCES` (les 4 bâtiments étaient
   en fait tous dans la table constructions) et les regex
   Tourisme/Garnison ont été retirés. Les accès moteur (flux, été, garnison,
   instantanés, eteSeulement) lisent EXCLUSIVEMENT la règle de banque ; une
   construction sans règle ne produit RIEN (invariant testé). Les « 32 entrées
   texte » de l'analyse initiale s'étaient réduites à 26 (retrait des
   constructions de faction `2c24bd3a`) : 24 décrivent des mécaniques de
   plateau non modélisées (production nulle — rien à structurer), Falheim et
   Notan portent des effets de MERVEILLE codés (doublement Science / réduction
   de levée), hors production par tour. Restent hors périmètre production
   (coûts/prérequis, toujours lus sur les textes canoniques du classeur) :
   `reductionCampDeBatisseurs` et `prerequisConstruction` ;
3. ensuite seulement migrer les autres sources (ministres, régimes…) une
   par une sur la banque, et supprimer leurs implémentations en dur — en
   appliquant PARTOUT le principe arbitré le 2026-10-19 : TOUT ce qui a
   rapport à une production passe par la banque. Les règles de
   faction ayant été retirées, leur éventuelle refonte devra naître DIRECTEMENT
   sur la banque (ne pas recréer d'implémentation en dur).

*Mise à jour le 19/10 au soir après le retrait de l'attrait migratoire et des bonus
de faction (commit `2c24bd3a`) ; B4 résolu dans la foulée (arbitrage Thibaut,
`ee26eb80` + `06422b9`) ; analyse initiale sur la tête `8476070e`.*
