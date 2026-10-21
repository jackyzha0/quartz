# Règles et arbitrages — source de vérité du design

Ce document archive **toutes les décisions de design actées** pour « Chasse & Pêche »,
arbitrées par Thibaut Lafue (game designer). Il complète le classeur Excel (référence
de fond) : en cas de divergence, **l'arbitrage le plus récent de ce document gagne**.
Un moteur IA (ou un développeur) qui implémente une mécanique DOIT vérifier ici
l'arbitrage correspondant — et ne pas « réinventer » une règle déjà tranchée.

L'historique d'implémentation (commits, incidents techniques) est dans
[journal-technique.md](journal-technique.md).

## Décisions fondatrices

- **L'Influence n'existe plus : remplacée par les émissaires.** (Info plus récente que
  le classeur 7.19 et que le référentiel web — les références restantes à l'Influence
  sont à convertir en émissaires.)
- **Thibaut est l'arbitre** : je propose des options, il tranche, j'implémente. Les
  arbitrages listés ci-dessous sont ACTÉS et doivent être considérés comme la règle.

## Mécaniques du moteur (vérifiées dans le code)

- **Vassalité** : serment `vassalDe`, tribut `vassalPrelevement = 0.5` (50 % des gains
  d'Or des habitants du vassal versés au suzerain), chaînes A→B→C possibles, serments
  croisés interdits.
- **Cités libres** : suzeraineté à 3 émissaires (`emissaires: Record<joueur, n>`, suivi
  manuel dans l'app, 1 tentative par saison) ; taxes versées au suzerain (Chasseurs
  ×2 Nourriture) ; une cité libre sous suzeraineté compte comme un serment.
- **Dogmes** : NON implémentés dans le moteur (affichés dans les Référentiels, appliqués
  au plateau) — sauf le Pacifisme (voir ci-dessous).
- **Rangs de pontificat** : Rang I à 100 Tourisme, II à 180, III à 340, cumulables ;
  le pontife reçoit aussi les bonus « fidèles ».

### Dogme du Pacifisme (refondu — architecture actée)

Pontife = bonus de SUZERAIN, Fidèles = bonus de VASSAL ; fidèles vassaux « de n'importe
quel suzerain » :

- **bonusPontife** — R1 : 1 émissaire immédiat avec la cité libre de son choix, puis
  1 émissaire supplémentaire à chaque passage d'âge. R2 : +3 Or et +3 Nourriture par
  tour par serment possédé (vassaux + cités libres), max 4 serments. R3 : suzeraineté
  d'une cité libre dès 2 émissaires (au lieu de 3), pas de double taxes.
- **bonusFideles** — R1 : tribut de vassalité allégé à 40 % (au lieu de 50 %). R2 :
  tant que vassal : habitations +10 Garnison et +2 Or/tour. R3 : tant que vassal :
  +10 Garnison, +2 Nourriture et +2 Or/tour supplémentaires.
- L'ancien bonus « révocation −2 Ressources −10 Or » est retiré complètement.
- Interprétation à confirmer : R1 pontife lu comme « 1 émissaire par cité libre de
  son choix » (pas un émissaire global).

## Voies de victoire — « Lauriers » (structure actée, validation MANUELLE)

Chaque voie a **4 Lauriers** ; validation en **ordre strict** ; **crise à chaque
Laurier I-III** validé ; bonus one-shot uniquement si le Laurier est complété pendant
l'âge de même numéro ; Laurier III sans bonus ; **Laurier IV = victoire**. Les joueurs
cochent eux-mêmes dans l'application (pas d'auto-détection).

- **Diplomatique** (réécrite) : I = 3 émissaires (bonus Âge I : +1 émissaire avec la
  cité de votre choix) · II = 5 émissaires au total (bonus Âge II : 1 Ministre
  au-delà du plafond du rang) · III = rang de pays Royaume · IV = 10 émissaires =
  Victoire. « 2 Professeurs » abandonné.
- **Culturelle** : I = Pontificat Rang I (100 Tourisme ; bonus : prochaine Merveille
  −20 Or −10 ressources de base) · II = 3 Merveilles (bonus : +40 Tourisme au total) ·
  III = Pontificat Rang III (340 Tourisme) · IV = 360 Tourisme + 5 Merveilles.
  Les Merveilles se jouent au plateau (aucune Merveille dans le référentiel ; règle
  « une par ville »).
- **Démographique** : I = 3 habitations (bonus : prochaine habitation −5 Bois et
  +15 habitants de départ) · II = 1 habitation ≥ 300 habitants (bonus : capitale
  +25 habitants) · III = 3 habitations de rang III (Grande Cité ou Forteresse) ·
  IV = 1500 habitants au total.
- **Économique** : I = 4 aménagements de ressources naturelles (bonus : 5 ressources
  de base au choix) · II = 3 routes commerciales (**compteur manuel** ; bonus :
  capitale +1 emplacement de bâtiment) · III = revenu de 80 Or/tour · IV = 5 Guildes
  différentes.
- **Militaire** : I = capturer 1 habitation (bonus : prochaine levée −60 Or) ·
  II = Donjon doté d'une Caserne (bonus : levée −10 Or pour le reste de la partie,
  cumul avec le portefeuille Guerre accepté) · III = 800 pts d'armée · IV = 5
  habitations capturées (compteurs manuels I/IV).
- **Scientifique** : I = revenu de 7 Science/tour (bonus : +30 Science) · II = Donjon
  doté d'un Cabinet d'astronomie (bonus : terminer gratuitement un arbre de Progrès
  d'Âge I) · III = 3 arbres de Progrès d'Âge III terminés · IV = terminer l'arbre
  « Progrès du développement futur ».

## Rangs de pays (refonte arbitrée 2026-10-14)

Remplace le prérequis « 1 serment par rang intermédiaire » du classeur, jugé inadéquat
(rareté des serments à 6-8 joueurs). Design final :

- **Échelle féodale unique pour tous** — le bloc Républicain
  (Commune/District/Union/Confédération) est supprimé (avec ses bonus Influence
  obsolètes) ; les régimes Démocratie/Socialisme partent aussi de la Baronnie.
  Titres : **Baronnie → Comté → Duché → Royaume → Empire**.
- **Aucune référence aux Terres** dans les rangs (un vassal peut détenir plus de
  terres que son suzerain sans être forcé de monter).
- **Octroi : 1 Ministre par rang** (cap cumulé 1→5). Les bonus « +1 Ministre
  supplémentaire » (voie diplomatique, orientations/dogmes) = dépassements de
  plafond, toujours valides.
- Table : **Baronnie** = départ, 1 Ministre · **Comté** = 20 Or + 40 Nourriture +
  1 serment, 2 Ministres · **Duché** = 30 Or + 60 Nourriture + 2 serments, 3
  Ministres · **Royaume** = 50 Or + 100 Nourriture + 3 serments, 4 Ministres ·
  **Empire** = 100 Or + 200 Nourriture + 4 serments, 5 Ministres.
  **La seule condition de montée est le nombre de serments (1/2/3/4)** — pas de
  Donjon, pas de Tourisme, pas d'autre grandeur. Serment = vassal OU cité libre
  sous suzeraineté. Le cap Pacifisme R2 (max 4 serments) coïncide avec le seuil
  impérial (constaté, non corrigé).
- **Succession (Avènement)** : avec héritier → l'Héritier devient Dirigeant et paie
  le **sacre d'avènement = moitié du prix de son rang** ; sans héritier → le noble
  élu devient Dirigeant + **crise aléatoire** tirée de la table des crises.
  « Renouvellement d'hommage des vassaux » et « la cour tombe » : proposés, NON
  retenus. Le délai/chute de rang du sacre impayé n'est PAS implémenté (paiement
  seul) — à arbitrer si besoin.
- Réécritures induites : loi Démocratie « Elections : sacre d'avènement gratuit » ;
  trait Héritier = « L'Héritier devient Dirigeant lors de la succession. Si votre
  héritier meurt, déclenchez une crise. » (la moitié « Terres » est obsolète).
- Implémentation : `DEFAULT_CONFIG.paysRangs` (table éditable dans
  Référentiels → « Pays & rangs »), `rangPaysNiveau` (factions.ts),
  `sermentsPossedes` (engine.ts), bouton « ⬆ Sacre » (page Royaume) avec débit
  automatique, avènement dans sante.ts `handleDirigeantSuccession`, cap Ministres
  en simple avertissement (jamais bloquant).

## Ministres / portefeuilles (arbitrages actés)

- **Système retenu** : titre « Ministre » (cap = rang de pays, cumulable, jamais
  bloquant), les ministres portent des **portefeuilles** aux effets distincts,
  soumis à un **rang de pays minimum**. Nomination : **nobles et membres de
  dynasties uniquement, strict** (pas d'anoblissement par la charge).
- **Effets MIXTES** : les simples appliqués automatiquement par l'application
  (« Auto »), les complexes appliqués au plateau (« Plateau »).
- **Portefeuilles CUMULABLES** (2× le même = OK) ; le catalogue doit couvrir toutes
  les voies de victoire.
- Les 7 ministères du classeur ont été renommés en offices de cour :
  Colonial→**Grand bailli**, Culture→**Maître des arts**, Défense→**Grand prévôt**,
  Ecologie→**Grand veneur**, Economie→**Surintendant des finances**,
  Guerre→**Grand écuyer**, Recherche→**Grand bibliothécaire**.
- **Catalogue en ligne : 18 portefeuilles** (adapté de la partie réelle de Thibaut ;
  5 supprimés : Maître des arts, Intendant des hommes, Maître des œuvres, Maître des
  espions, Ambassadeur des cités). Effets **Auto codés** :
  - Grand bailli : fondation d'habitation −8 Or −3 Bois (plafonnés à 0 ; améliorations non réduites).
  - Grand prévôt : +1 Fer/tour + 10 Garnison × rang de pays par habitation (dynamique).
  - Grand veneur : −5 Nourriture × rang de pays sur la consommation des habitations.
  - Surintendant des finances : après construction d'un bâtiment, 1 ressource au
    choix produite par l'habitation × rang.
  - Grand bibliothécaire : +rang de pays en Science au déblocage d'une technologie.
  - Légat du pontificat : +20 Tourisme à la fin de chaque saison.
  - Connétable : +15 Garnison à la prise de fonction (permanent).
  - Et les effets Auto historiques : Trésorier (+5 Or/tour), Grand Précepteur
    (+1 Science/tour), Sénéchal (+15 Nourriture fin d'été), Maître de cour
    (+2 Tourisme fin de saison), Grand Chambellan (+10 % taxes reçues, cumulable
    avec le gouverneur), Chancelier de justice (−25 % sacres), Archichancelier
    (sacre d'avènement ÷2).
  - **Non automatisables** (absents de l'app) : Grand écuyer (une levée d'armée ne
    coûte rien), Chancelier des émissaires (saisie manuelle prévue page Cités
    libres), Maître des guildes (aucune limite de guildes), Maréchal (pas de points
    de moralité).
- Interactions à surveiller : Chancelier de justice + Archichancelier s'empilent
  (avènement ≈ 37,5 % du prix) ; la loi Démocratie (avènement gratuit) prime ;
  PAS de serment virtuel (contournerait la condition de montée en rang).
- Le catalogue est **entièrement éditable** dans Paramètres → Ministères
  (nom, rang minimum, mode Auto/Plateau, effet, +/− lignes).

## Progrès technologiques (règles actées)

- Tech 2 exige la tech 1 de sa branche ; la tech C exige les 2 techs d'une même
  branche ; un arbre est TERMINÉ à EXACTEMENT 3 technologies (tech C optionnelle) ;
  3 arbres complétés de l'âge N-1 ouvrent l'âge N.
- **AUCUN effet automatique dans le moteur** : les effets des technologies
  s'appliquent TOUS au plateau (les textes d'effets sont une aide de jeu purement
  indicative). Seule exception : le **coût en Science est déduit automatiquement**
  du stock au déblocage, puis **remboursé** si la tech est reprise.
- Référentiel : 21 arbres (7 colonnes × 3 âges), entièrement paramétrable dans
  Paramètres → Progrès. Restent à remplir par l'arbitre : tech C de « Progrès du
  développement futur » (Âge III), tech C de « Progrès du développement
  économique » (Âge III), a.1 de « Progrès de la défense nationale » (Âge III).

## Barème d'équilibrage de référence (validé en approche)

- Fidèle ≈ 50 % du pontife ; Rang 2 ≈ ×1,5 du Rang 1.
- 1 Science/tour ≈ 4 éq-Or (benchmark Tour de sorcier) ; 1 habitant net ≈ 0,1 Or
  (Chasseur) ; 15 habitants ≈ +1,5 Or/tour.

### Propositions d'équilibrage EN ATTENTE (présentées, non appliquées)

- Capitalisme fidèle R3 (+20 Or/tour) : outlier brut à corriger.
- Lumières : R1=R2 (copié-collé) — proposer +2 Science au R2 pontife.
- Guerres-Saintes pontife R2 « Tourisme +20 » : non-bonus hors thème — proposer un
  bonus militaire (ex. levée −20 Or).
- Socialisme fidèle R1 identique pontife (+15 hab) — proposer 10.
- Seuil 20 Tourisme (3 ressources/été) du classeur absent du référentiel web :
  divergence à harmoniser.

## Arbitrages de jeu au fil des sessions (tous ACTÉS)

- **Aménagements dédoublables** ; les bâtiments restent uniques par ville.
- **Supprimer une ville** : les habitants RESTENT dans la population de l'ancien
  propriétaire (l'arbitre les reloge ensuite).
- **Transférer une ville** : la ville ET sa population « classique » (vivants et
  décédés) changent de propriétaire ; la COUR (nobles) reste auprès de son joueur,
  ré-ancrée sur sa première ville restante ; renommage automatique en cas de
  collision (« Bourg 1 2 »). Un noble ne change de joueur que par DON explicite.
- **Le mariage manuel unit deux NOBLES** vivants, majeurs, non mariés — y compris de
  joueurs différents ou d'une cité libre. **La personne mariée DÉMÉNAGE** dans la
  ville de son conjoint (changement de joueur ou de cité possible) ; c'est la
  personne de la ligne qui déménage, pas le conjoint choisi dans le menu. Le moteur
  sait retrouver un conjoint chez n'importe quel porteur (veuvage, naissances).
  L'INTERFACE de proposition ne cible que les nobles du MÊME porteur (fin du
  ciblage des autres joueurs) ; le moteur garde sa capacité inter-porteurs.
- **Dons** : transfert d'un habitant OU d'un noble vers un autre joueur ou une cité
  libre, dans tous les sens ; ré-ancrage sur la première ville de la cible si besoin.
- **Cités libres « comme des joueurs »** : population en onglet (roturiers et
  nobles), démographie MANUELLE (statut éditable ; naissances/vieillissement au
  plateau — l'automatisation complète n'est pas demandée), consommation de
  Nourriture plate par cité. Une cité libre créée automatiquement par joueur au
  setup, caractéristiques tirées au hasard.
- **Nouvelle ville/château = 50 habitants SANS noble** (~40 % d'adultes mariés —
  mariages entre adultes seulement).
- **Gouverneur automatique** : une ville sans gouverneur qui abrite un noble prend
  son noble LE PLUS ÂGÉ comme gouverneur à chaque fin de tour (hors
  Dirigeant/Héritier), AVANT le calcul des gains → **Gouverneur = +10 % d'impôts
  sur sa ville** (cumulable avec le Grand Chambellan, s'applique aussi à l'impôt
  manuel).
- **Impôts manuels** : générables HORS fin de tour autant de fois que voulu — les
  boutons AJOUTENT l'impôt par-dessus celui du fin de tour (rattrapage, jamais un
  remplacement).
- **Marchands / routes commerciales** : titre « Marchand », UNE route par marchand
  (ville du marchand ↔ ville d'un autre joueur) ; +4 Or/tour aux DEUX joueurs ;
  le propriétaire **copie l'AMÉNAGEMENT ENTIER** de la ville ciblée (toutes ses
  ressources positives, modifiable à tout moment, saisonnier — une production
  d'été n'est copiée qu'en été ; la Garnison (valeur d'état) et les effets
  négatifs sont exclus ; **le Tourisme EST copiable** — arbitrage 2026-10-19 :
  le stock de Tourisme n'est jamais cumulé, il est recalculé à chaque fin de tour
  (stock = production) et le Tourisme copié compte dans ce calcul) ;
  fermeture automatique si le marchand meurt ou perd son titre.
- **Taxes** : effet ±25 % (Faibles ×0,75, Fortes ×1,25 — arbitrage du ±50 % initial).
- **Nombre de joueurs** : 2 à 8 à la création (le jeu est conçu pour 6-8, la borne
  basse est souple pour les tests).
- **Couleurs** : J1 rouge, J2 bleu royal, J3 vert, J4 jaune, J5 violet, J6 orange,
  J7 turquoise, J8 rose #EC4899 ; couleurs de ressources paramétrables
  (Référentiels → Couleurs, avec transparence des lignes de tableaux, défaut 85 %).
- **Proximité des villes** : Plaine = rien, Rivière = +12 Nourriture/tour,
  Mer = +7 (paramétrable) ; les aménagements marins restent disponibles partout.
- **Production des villes** : capital par défaut VIDE (aucun bâtiment initial) ;
  toutes les ressources affichées même à production 0.
- **Martialité supprimée** (arbitrage 2026-10-21) : la règle de genre
  « Martialité » disparaît du jeu — Soldat et Commandant passent à regleGenre
  vide (aucune restriction de sexe), le recrutement des armées (soldats ET
  commandants) est ouvert aux deux sexes, la colonne martialité disparaît des
  cultures (référentiel, Référentiels, Paramètres). **L'HÉRÉDITÉ est
  conservée** (Dirigeant/Héritier et les métiers marqués Hérédité continuent
  d'être régis par elle). Les configs sauvegardées sont converties par la
  migration ciblée `martialiteSupprimee` (pattern (z), sans incrémenter
  SCHEMA_VERSION_CONFIG — les configs v3 convergées ne rejouent pas les
  migrations v3).

## Rework des habitants (design arbitré 2026-10-20 — VAGUES 1 & 2 IMPLÉMENTÉES)

Refonte complète du système d'habitants demandée par l'arbitre le 2026-10-20.
Les arbitrages ci-dessous sont ACTÉS et les **VAGUES 1 & 2 SONT
IMPLÉMENTÉES** (2026-10-20, voir journal-technique.md). Cette section reste la référence de
l'implémentation (le code devra y revenir avant chaque vague).

### Modèle d'habitant (arbitré)

- Champs conservés tels quels : **nom, prénom, dynastie, âge, sexe,
  orientation sexuelle, mariage, culture, ville**, traits génétiques (rework
  ultérieur), et le **statut Sain / Malade / Enceinte / Décédé** (inchangé).
- **`titre` devient `métier`** : les rôles de cour (Dirigeant, Héritier,
  Gouverneur, Ministre, Marchand, Professeur, Maréchal) migrent DANS le champ
  métier — plus de champ « titre » distinct.
- **Nouveau `domicile`** (identifiant de bâtiment de logement, ou null =
  sans domicile) : aucun effet au plateau tant que les bâtiments de logement
  n'existent pas (vague 3).
- **Suppression d'`ageMax`** : plus d'âge-plafond individuel ; les fonctions
  associées (`computeAgeMax`, résurrection) sont retirées.

### Santé et mortalité (arbitré)

- La mort ne vient plus d'un plafond d'âge : chaque tour, la probabilité de
  CONTRACTER la maladie croît avec l'âge — courbe de Gompertz
  `min(cap, base × exp(pente × âge))`, calibrée par simulation Monte-Carlo
  pour une espérance de vie d'environ **60 ans**.
- **Un malade qui re-contracte la maladie MEURT** (règle existante de
  `maladieStep`) — la maladie reste la seule cause de mort.
- Paramètres `maladieBase`/`maladiePente`/`maladieCap` éditables (Paramètres →
  Maladie) ; calibrés à **0.0025 / 0.08 / 0.9** par Monte-Carlo (N=200 000) :
  E[âge de décès] = 59,5 ans, médiane 60, p10 48, p90 70. Les modificateurs
  de bâtiments existants (`malContraction`, `bonusGuerison`,
  `bonusGuerisonGlobal`, `modMaladieEnceinte`) sont conservés.
- Implémenté (interim traits) : jusqu'au rework des traits, `life_delta`
  module la PENTE de la courbe (somme des deltas des traits, bornée ±50 %).

### Métiers (arbitré)

- Registre des métiers (ex-table des titres) : chaque métier a un **nombre
  maximal de postes par ville**, qui évoluera avec les bâtiments et
  aménagements présents (vague 3).
- **Chasseur** : capacité paramétrable DIFFÉRENTE selon le type d'habitation
  (Ville vs Château).
- **Priorisation** : un habitant sans métier prend en priorité un métier
  autre que Chasseur si une place y est libre ; si seul Chasseur a des
  places, il devient Chasseur ; si aucun métier n'a de place, il est
  **Sans-emploi**.
- **Surnombre** (cap baissé, bâtiment perdu…) : les PLUS ÂGÉS perdent leur
  métier en premier.
- **Sans-emploi** : aucun effet au plateau (neutre), impôt nul.
- Règles propres de cour conservées : Gouverneur = noble le plus âgé de la
  ville (hors Dirigeant/Héritier, +10 % impôts), cap des Ministres = rang de
  pays, Dirigeant/Héritier inchangés.
- Impôts : « métiers × taxes » remplace « titres × taxes ».
- Choc attendu sur les parties existantes (50 habitants/ville avec des caps
  bas → vagues massives de Sans-emploi au premier tour) → caps de base
  GÉNÉREUSES ARBITRÉES le 2026-10-20 : **Ville 50 / Château 25** (« très
  généreux »), paramétrables (`capMetierChasseurVille` /
  `capMetierChasseurChateau`). Seul le Chasseur est plafonné en vague 1 ;
  les autres métiers pourront déclarer `capParVille` au référentiel
  (absent = illimité). La réaffectation tourne à chaque tour AVANT le
  calcul des gains (étape 2ter, les caps s'appliquent aux impôts du tour).

### Migration (actée techniquement)

- `SCHEMA_VERSION_ETAT`++ dans `engine/migrations.ts` : conversion
  `titre` → `métier` (mapping 1:1 des noms actuels), retrait d'`ageMax`,
  `domicile` → null. Les parties en cours doivent rester jouables sans
  intervention manuelle.

### Plan en 3 vagues (proposé)

1. **V1 moteur — FAIT (2026-10-20)** : renommage intégral titre → métier
   (~60 fichiers UI+moteur), champ domicile, fin d'ageMax + courbe calibrée,
   caps Chasseur (Ville 50 / Château 25), réaffectation chaque tour par
   ville (étape 2ter), migrations état v3 + config v3, harnais 112/112.
2. **V2 UI — FAIT (2026-10-20)** : PopulationTable — colonne Domicile
   (null = « — », logements en vague 3) et écran « Métiers et places
   par ville » (en poste / cap / places libres par ville et métier,
   Chasseur Ville 50 / Château 25, ligne Sans-emploi toujours présente,
   helper moteur occupationsMetierVille).
3. **V3 (ultérieure)** : métiers créés par les bâtiments/aménagements,
   production taxable étendue, bâtiments de logement → domicile.

## Rework métiers & aménagements — vague 3 (arbitré 2026-10-21, design consolidé)

Suite du rework des habitants : les métiers deviennent des **postes à
emplacements** créés par les aménagements. Tous les arbitrages ci-dessous
sont ACTÉS (session 2026-10-21) — l'implémentation est planifiée en
sous-vagues 3a (métiers & emplacements) puis 3b (routes dissociées).

### Métiers de production (arbitré)

- **Aucune éducation requise** : un emplacement libre est pris
  automatiquement (priorisation vague 1 : métier autre que Chasseur
  d'abord, habitant sans métier ; les plus âgés perdent leur poste en
  premier au surnombre). La colonne éducation disparaît des métiers de
  production.
- Gains par habitant et par tour : Chasseur +1,2 Nourriture (défaut) ·
  Artiste +5 Tourisme · Commerçant +1 Or · Bûcheron +0,5 Bois ·
  Mineur +0,5 Pierre · Forgeron +0,5 Fer · Tisseur +0,5 Soie ·
  Éleveur +0,5 Bétail +2 Nourriture · Charbonnier +0,5 Charbon ·
  Fermier +5 Nourriture (ÉTÉ uniquement) · Archéologue +4 Tourisme ·
  Pêcheur +4 Nourriture · Scientifique +0,5 Science · Marchand +2 Or.
- **Garde : +10 Garnison — STATIQUE** (« la Garnison n'est jamais par
  tour ») : le bonus est ACTIF tant que le Garde tient le poste ;
  retiré s'il part ou meurt.
- **Métiers de taxe** : Professeur +10 % taxe Science, Banquier +10 %
  taxe Or, Troubadour +10 % taxe Tourisme — dans leur ville. Les bonus
  de taxe se cumulent de façon **ADDITIVE** avec le Gouverneur (+10 %
  d'impôts) : ex. Gouverneur + Professeur = +20 % sur la Science.
- Rôles de cour inchangés : Dirigeant, Héritier, Gouverneur, Ministre
  (noblesse et règles propres conservées).
- Soldat (15 pts d'armée) et Commandant (45 pts, nobles) : attribution
  Armée, aucune restriction de sexe (arbitrage martialité du même jour).
- **Chasseur = métier par défaut** : cap par habitation (paramètres
  Ville/Château conservés) + emplacements des aménagements ; tout
  habitant sans place est **Sans-emploi** (rôle neutre, impôt nul).
  Une ville sans aménagement ne produit quasiment rien par métiers —
  assumé (c'était déjà le cas).
- **Disparitions ACTÉES** : Artisan (→ Commerçant), Chercheur
  (→ Scientifique), Sportif (→ Garde), **Propagandiste supprimé** (les
  3 charges de conversion disparaissent ; en migration, ses titulaires
  deviennent Sans-emploi). **24 métiers** au référentiel.

### Aménagements tier 1 : production → emplacements (arbitré)

La production directe des aménagements tier 1 (coût inchangé :
8 Or + 3 Bois) est remplacée par des emplacements de métiers. La
production calibrée retombe sur les valeurs actuelles (10/14 aménagements
identiques si tous les emplacements sont remplis) :

- Baleinier : +3 Pêcheur, +2 Commerçant
- Bâteau de pêche : +2 Pêcheur
- Carrière : +2 Mineur
- Champ : +3 Fermier
- Foire : +1 Artiste, +1 Commerçant
- Mine de Charbon : +2 Charbonnier
- Mine de Fer : +2 Forgeron
- Mine d'Or : +3 Marchand
- Observatoire : +1 Scientifique
- Pâturage : +2 Éleveur
- Rizière : +4 Fermier
- Scierie : +2 Bûcheron, +2 Chasseur
- Sériciculture : +2 Tisseur, +2 Chasseur
- Site archéologique : +2 Archéologue

- Garde, Professeur, Banquier, Troubadour : **aucune source d'emplacement
  tier 1** — les bâtiments qui les créeront arrivent plus tard (tiers
  suivants) ; en attendant, attribution manuelle MJ possible.
- Caps par ville = **somme des emplacements des aménagements présents**
  (+ cap par défaut du Chasseur selon le type d'habitation).

### Marchand & routes commerciales dissociées (arbitré)

- Le **Marchand devient un métier de production** (+2 Or/tour) ; ses
  emplacements viennent des Mines d'Or et des routes commerciales.
- La **route commerciale est dissociée du Marchand** : ouverte
  indépendamment, elle permet de **copier exactement UN aménagement**
  de la ville ciblée — **y compris ses emplacements de population** —
  et octroie **+1 emplacement de Marchand au joueur à l'origine et
  +1 au joueur ciblé**.
- **Le bonus +4 Or/tour des deux côtés disparaît** : la route ne
  rapporte plus QUE la copie + les emplacements Marchand.
- **À trancher avant la sous-vague 3b** : nombre de routes par
  joueur/ville, coût d'ouverture, portée et destinations (cités
  libres ?), conditions de fermeture, sort des routes existantes des
  parties en cours.

### Plan d'implémentation (proposé)

1. **3a — métiers & emplacements** : référentiel 24 métiers +
   emplacements des aménagements + caps dynamiques par ville +
   bonus de taxe additifs + Garde statique + migrations (état :
   renommages des métiers ; config : pattern (z)) + UI (PopulationTable,
   écran Métiers et places par ville, Référentiels, Paramètres).
   **→ IMPLÉMENTÉE le 2026-10-21** (moteur + UI + migrations état v4 /
   config `metiersAmenagements2026`, 136 tests verts) — voir
   journal-technique.md, entrée « vague 3a ». Exceptions provisoires
   tant que la 3b n'est pas là : les routes commerciales restent
   « telles quelles » (+4 Or/tour + copie, tenues par un Marchand) et
   un Marchand qui TIENT une route occupe un poste créé par elle
   (jamais en surnombre — sinon toute route mourrait à chaque fin de
   tour) ; le métier « Fermier » porte le marqueur `ete` (production
   d'été lu sur le métier, plus sur le Champ).
2. **3b — routes dissociées** : après les arbitrages restants.

### Déménagement : perte du métier ET du domicile (arbitré 2026-10-21, vague 3a ; complément Dirigeant/Héritier le même soir)

- **Règle** : un habitant qui CHANGE d'habitation (il déménage vers
  une autre ville) **perd son métier ET son domicile** — les postes à
  emplacements sont créés par les aménagements de la ville qu'il
  quitte, le domicile est un bâtiment de cette ville. Il redevient
  Sans-emploi (rôle neutre, impôt nul) jusqu'à la réaffectation de fin
  de tour ; un Gouverneur perdu ainsi est re-désigné automatiquement
  (noble le plus âgé de la ville, règle (w)).
- **Sites de déménagement réels** (le moteur y applique
  `perteDemenagement`) : don du personnage à un autre porteur
  (`deplacerPersonnage` — joueur ou cité libre), mariage chez le
  conjoint (`marierPersonnages`), migration automatique de population
  (`migrerPopulation`), cour ré-ancrée après transfert ou suppression
  de ville (`transfererVille`/`supprimerVille` — la cour suit son
  joueur mais change de ville), nobles ré-ancrés ville → cité libre
  (`citesLibres.ts`).
- **Exceptions** : le RENOMMAGE d'une ville (même ville, nouveau nom)
  et le TRANSFERT DE PROPRIÉTÉ d'une ville (les habitants ne bougent
  pas — la population classique suit la ville et garde son poste et
  son domicile ; seule la cour restée derrière, ré-ancrée sur une
  autre ville du joueur, perd les deux).
- **Arbitrage complémentaire (acté 2026-10-21, soir) : un DIRIGEANT ou
  un HÉRITIER ne déménage JAMAIS** — son titre n'est pas perdu par un
  changement d'habitation, aucune succession ne se déclenche :
  - **don** : refusé AVANT toute mutation (« Un Dirigeant ou un Héritier
    ne déménage jamais ») — `deplacerPersonnage` retourne l'erreur,
    personnage inchangé ;
  - **mariage** : le conjoint non ancré DÉMÉNAGE chez le
    Dirigeant/Héritier (inversion de la règle (o) pour ce cas) ; si les
    DEUX époux sont ancrés (Dirigeant/Héritier) dans des cours
    différentes, le mariage est REFUSÉ avant toute mutation ; même
    porteur → mariage normal, aucun déménagement ;
  - **ré-ancrage de cour** (transfert/suppression de ville, ville
    devenue cité libre) : le Dirigeant/Héritier suit sa cour (sa ville
    est perdue, il DOIT suivre) mais GARDE son titre et son domicile
    de fonction ;
  - la migration automatique (`migrerPopulation`) ne déplace QUE des
    enfants : un Dirigeant/Héritier n'y passe jamais.

## Conventions techniques de règles (à respecter en implémentant)

- **Effets structurés** : les constructions (bâtiments + aménagements) portent
  `effets: {ressource, quantite, ete?}[]` ; le champ texte `production` reste en
  repli d'affichage. `RESSOURCES_INSTANTANEES = {Garnison}` (valeur
  d'état) ; le Tourisme est un flux NORMAL dont le stock n'est jamais cumulé —
  recalculé à chaque fin de tour (stock = production, retours arbitre 2026-10-16
  et 2026-10-19 ; le Tourisme copié par une route commerciale compte).
- Un gain instantané crédité (Tourisme, Garnison Connétable) n'est **pas retiré**
  ensuite (démolition ou mort ne rembourse pas) — à arbitrer si l'inverse est voulu.
- Migrations de configuration : passer par `cfgOf`/`convergerConfig` et
  `SCHEMA_VERSION_CONFIG` (voir AGENTS.md) ; le registre versionné
  (`engine/migrations.ts`, champ `schema` sur l'état) gère les évolutions du format
  des sauvegardes — toute nouvelle migration doit y être pure et numérotée.

## Suites possibles (proposées à l'arbitre, non tranchées)

1. Harmonisation des autres dogmes (le Pacifisme seul est refondu).
2. Implémentation moteur des effets automatiques du Pacifisme (tribut 40 % par
   joueur via override de `vassalPrelevement`, flux par serment, saisons/âges connus).
3. Purge de l'Influence de tout le référentiel : voie diplomatique, seuils
   « 10 Influence/été », décisions, progrès Délégation/Ambassade/Vassalisation,
   universités, marchands.
4. Vague qualité suivante : assainissement des cycles d'imports `rules/ ↔ engine/`
   (13 cycles) et découpage des 5 grosses vues restantes (PopulationTable ~800 l.,
   ReferenceDataPanel ~650, RoyaumeView ~630, ConfigTables ~600, CitesLibresView ~430).
