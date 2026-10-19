# AGENTS.md — Contexte du dépôt pour moteurs IA

Ce fichier est le point d'entrée pour tout agent IA (ou humain) qui veut comprendre,
modifier ou étendre ce projet sans devoir dérouler tout l'historique.

## Le projet en 30 secondes

**« Chasse & Pêche »** est un jeu de campagne de table pour 6 à 8 joueurs, conçu et
arbitré par **Thibaut Lafue** (game designer — ses décisions font foi). Deux livrables :

1. **Un classeur Excel source** (règles du jeu, non versionné ici) — la référence de fond.
2. **Cette application web de suivi de partie** (React 18 + TypeScript strict), qui
   automatise le « moteur » du jeu (impôts, production, démographie, fin de tour) et
   sert d'aide de jeu pour ce qui se joue au plateau. Déployée sur GitHub Pages :
   https://losth230.github.io/quartz/jeu/

Le dépôt `losth230/quartz` contient aussi le site vitrine « Quartz » ; le jeu vit sous
`src/` sur la branche **`chasse-et-peche-web`** (c'est LA branche fonctionnelle du jeu).

## Philosophie de conception (source de vérité)

- **Thibaut propose/valide, l'IA implémente.** Chaque décision de design actée est
  enregistrée dans [docs/ia/regles-et-arbitrages.md](docs/ia/regles-et-arbitrages.md).
  Avant de coder une mécanique, vérifier ce fichier : l'arbitrage existe peut-être déjà.
- **Automatique vs plateau** : l'application crédite automatiquement tout ce qui est
  calculable (impôts, production, consommation, démographie, ministres « Auto »…) ;
  tout le reste (émissaires, effets de technologies, ministres « Plateau », voies de
  victoire à cocher, armées, dogmes) est suivi à la main. L'aide « 🧮 Qu'est-ce que
  l'application compte automatiquement ? » (page Pays) fait foi.
- **L'Influence n'existe plus** : remplacée par les **émissaires**. Toute référence
  restante à l'Influence dans les textes est une dette à convertir.
- **Tourisme et Garnison sont des valeurs d'état instantanées** : jamais des flux par
  tour (`RESSOURCES_INSTANTANEES`, engine/constructions.ts). Le Tourisme est crédité
  UNE fois à la construction.
- **Toute évolution du référentiel devant atteindre des configs existantes** →
  incrémenter `SCHEMA_VERSION_CONFIG` (config/defaultConfig.ts). Les configs sont
  « convergées » une fois puis tamponnées : supprimer/renommer une ligne dans les
  Paramètres est DÉFINITIF (seule une table vidée entièrement retrouve les défauts).

## Structure du code

```
src/
├── main.tsx, App.tsx        — point d'entrée, navigation 7 sections, ErrorBoundary global + par onglet
├── config/                  — defaultConfig.ts (référentiel par défaut + migrations cfgOf/convergerConfig),
│                              referentiels.json (données du classeur), params.ts (formules paramétrables)
├── engine/                  — LE MOTEUR PUR (aucun React) :
│                              engine.ts (runTurn = fin de tour en ~20 étapes numérotées 1bis, 1ter, 2bis…),
│                              setup.ts (createGame), production.ts (production détaillée par canal),
│                              economie.ts (impôts), villes.ts (supprimer/transférer une ville),
│                              cour.ts (dons/mariages), commerce.ts (routes de marchands),
│                              titres.ts, naissances.ts, sante.ts (démographie), ministeres.ts,
│                              factions.ts (règles par peuple), regimes.ts, progresAuto.ts,
│                              constructions.ts/batiments.ts/amenagements.ts (effets du référentiel),
│                              fusion.ts (multijoueur par sections), migrations.ts (registre versionné),
│                              victory.ts (Lauriers I à IV), validation.ts, types.ts
├── rules/                   — couche lecture-seule « banque d'effets » au-dessus du moteur (refact en préparation)
├── state/                   — store.tsx (useGame, le SEUL état partagé), storage.ts (localStorage compacté),
│                              configPriorite.ts (config mondiale > embarquée > locale)
├── supabase/client.ts        — multijoueur : salon, sections par joueur, barrière de fin de tour,
│                              résolution serveur (Edge Function Deno `supabase/functions/resoudre-tour`)
├── components/              — une vue par onglet (Dashboard, PlayerView ~150 lignes = assemblage,
│                              PopulationTable, RoyaumeView, ProgresView, CitesLibresView, ArmiesPanel,
│                              EventLogPanel, HistoryPanel, ParamsPanel, SetupPanel, ReferenceDataPanel…)
│   └── pays/                 — cartes de la page « Pays », un fichier par carte
├── styles.css               — styles globaux (design sombre, cartes)
└── engine/*.test.ts, rules/*.test.ts, state/*.test.ts, components/*.test.ts
                             — tests natifs node:test (48) + tests de rendu (12)
```

## Multijoueur (protocole v2 — à ne pas casser)

Chaque joueur joue en LOCAL pendant le tour (zéro réseau par clic). Au « Fin de tour »,
il pousse SA SECTION ; quand tous les joueurs attendus ont poussé, la résolution
(fusion des sections + config + `runTurn`) se fait CÔTÉ SERVEUR (Edge Function), avec
repli client documenté. Les mutations INTER-JOUEURS (ex. transfert de ville) sont des
**événements partagés** rejoués APRÈS la fusion (`rejouerTransfertVille` — idempotent).
La SEULE écriture réseau est la fin de tour : ne jamais réintroduire de sauvegarde
automatique de l'état global (un client périmé écraserait le salon).

## Validation avant tout push

1. `npx tsc --noEmit` — **strict** : `noUnusedLocals` et `noUnusedParameters` sont
   ACTIVÉS (depuis le 2026-10-19) ; toute déclaration non lue casse la CI.
2. `npm test` — tests natifs `node --test` (48 : fusion, migrations, régression 20 tours
   avec invariants, config, registre, banque, mutateurs) + tests de rendu (12 vues).
3. `npm run build` (vite) — le job CI « Build jeu » bundle le tout.

La CI (« CI jeu ») tourne sur la branche du jeu : type-check strict + tests + build +
déploiement GitHub Pages + Edge Function. Un push qui casse un test NE DOIT PAS être
déployé : la partie en ligne de l'arbitre tourne en continu.

## Pièges documentés (incidents réels)

- **Ordre des hooks React** : jamais de `useState` après un retour anticipé dans un
  composant → « Rendered more hooks than during the previous render » = page blanche.
- **JSX non parsé par les tests natifs** : vérifier l'équilibre des balises
  (un `<ErrorBoundary>` jamais refermé a fait échouer un build CI).
- **Jamais `a || b ?? c` sans parenthèses** : erreur de syntaxe esbuild/JS.
- **Formulaire en cascade** : les `<Select>` contrôlés restent à `''` tant qu'on ne les
  touche pas → toujours soumettre la valeur EFFECTIVE (état || première option).
- **Vieilles sauvegardes** : tout état ingéré passe par `normaliserEtat()` (tableaux
  manquants = crash moteur ET rendu).
- **Edits automatisés** : re-diffuser TOUJOURS le fichier complet contre la base après
  une série d'éditions scriptées (sed ou équivalent) avant de pousser.

## Où trouver le détail

- **[docs/ia/regles-et-arbitrages.md](docs/ia/regles-et-arbitrages.md)** — toutes les
  décisions de design actées, mécaniques moteur vérifiées, propositions en attente.
- **[docs/ia/journal-technique.md](docs/ia/journal-technique.md)** — historique des
  évolutions (marqueurs (g)→(z), (a), refontes, purge qualité), conventions de
  déploiement et incidents.
- **`Règles.md`** (racine) — règles du jeu rédigées pour les joueurs.
- **`README.md`** (section jeu) — manuel utilisateur de l'application.

## Conventions de contribution

- Messages de commit en français, style `feat(jeu): …` / `fix(jeu): …` /
  `chore(qualité): …` / `test(moteur): …` / `docs(ia): …`.
- Le code et les commentaires de code sont en français (y compris les docblocks qui
  documentent les arbitrages et les retours de l'arbitre avec leur date).
- Ne jamais supprimer ou « simplifier » un docblock qui archive un arbitrage de design :
  c'est la mémoire des règles.
