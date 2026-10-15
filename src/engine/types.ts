// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Types du moteur (portage TypeScript du VBA)
//  Colonnes de la table P_j → champs de Character
// ══════════════════════════════════════════════════════════════════════

export type Sexe = 'M' | 'F'
export type Statut = 'Sain' | 'Malade' | 'Enceinte' | 'Décédé'
// Le classeur utilise les formes au féminin ; les deux graphies sont admises.
export type Orientation =
  | 'Hétérosexuel' | 'Homosexuel' | 'Bisexuel' | 'Asexuel'
  | 'Hétérosexuelle' | 'Homosexuelle' | 'Bisexuelle' | 'Asexuelle'
export type Saison = 'Été' | 'Hiver'
export type TaxeNiveau = 'Faible' | 'Moyenne' | 'Forte'
export type Heredite = 'Masculine' | 'Féminine' | 'Parité'
export type Martialite = 'Masculine' | 'Féminine' | 'Les deux'
export type RegleGenre = 'Aucune' | 'Masculine' | 'Féminine' | 'Culture'
export type Attribution = 'Manuelle' | 'Education' | 'Armée' | 'Aléatoire'

// ── Référentiels (tables du classeur → seeds éditables) ────────────────

export interface TraitDef {
  name: string
  weight: number
  description: string
  life_delta: number          // ±années sur AgeMax
  resurrection_min_roll: number // seuil 1d6 : ≥ seuil → +2d6 ans (0 = désactivé)
  fert_add: number             // ajouté au multiplicateur de fécondité du couple
  heritable: boolean
  marriage_mod: number         // modificateur de probabilité de mariage
}

export interface TitreDef {
  titre: string
  education: string            // éducation requise ('' = aucune)
  valeur1: number              // gain par tour
  ressource1: string           // ressource du gain 1
  valeur2: number
  ressource2: string
  description: string
  nobleSeul: boolean
  regleGenre: RegleGenre
  attribution: Attribution
}

export interface CultureDef {
  nom: string
  heredite: Heredite
  martialite: Martialite
  homoAutorisee: boolean
  fertFactor: number
}

export interface PeupleDef {
  nom: string
  noms: string[]        // noms de famille (→ dynasties)
  prenomsM: string[]
  prenomsF: string[]
}

export interface BuildingDef {
  nom: string
  categorie: 'Santé' | 'Éducation' | 'Économie' | 'Culture'
  ecoleRang: number                 // 1=élémentaire, 2=intermédiaire, 3=supérieure
  malContraction: number            // modificateur proba contracter maladie
  bonusGuerison: number             // modificateur proba guérison (local)
  bonusGuerisonGlobal: number       // ex. Guilde des Médecins
  effet: string                    // description lisible
}

export interface EventDef {
  nom: string
  saison: Saison
  poids: number
  faible: string
  moyenne: string
  forte: string
  extreme: string
}

export interface DynastieDef {
  nom: string
  description: string
}

// ── Entités de jeu ─────────────────────────────────────────────────────

export interface Character {
  id: string
  nom: string
  prenom: string
  dynastie: string
  sexe: Sexe
  age: number
  culture: string
  ville: string
  orientation: Orientation
  traits: [string, string, string]
  statut: Statut
  mariage: string | null      // nom complet du conjoint
  mere: string | null         // nom complet
  pere: string | null
  pereBio: string | null      // père biologique en cas d'adultère
  enfantBatard: boolean
  /** femme enceinte ayant contracté la maladie : elle accouchera,
   *  puis mourra de la maladie (règle simplifiée « malade ou sain »). */
  enceinteMalade?: boolean
  titre: string | null
  /** Portefeuille ministériel si le titre est « Ministre » (table
   *  `ministeres` du référentiel : Sénéchal, Trésorier… — refonte
   *  2026-10-14). Champ optionnel : absent des vieilles sauvegardes →
   *  aucun portefeuille. */
  ministere?: string | null
  education: string | null
  fecondite: number
  ageMax: number
  armee: string | null        // nom de l'armée de rattachement
}

/** Ligne « Autres » d'une ville (feuille J{n}, bloc « Autres » du classeur) :
 *  production additionnelle hors bâtiments et aménagements — par exemple
 *  « Nourriture | Rivière | 1 | 12 » crédite 12 Nourriture par tour. */
export interface AutreDef {
  /** ressource produite */
  ressource: string
  /** origine libre (Capital, Rivière, Cité L, Progrès, Régime…) */
  source: string
  /** multiplicateur/nombre d'occurrences */
  nombre: number
  /** production par occurrence */
  bonus: number
}

/** Ligne de la table « types d'habitation » (feuille Ville du classeur) :
 *  chaque ville est de type Ville (Hameau → Cité → Grande Cité) ou
 *  Château (Motte → Donjon → Forteresse). Chaque rang a un coût
 *  d'amélioration, un nombre d'habitants requis, une consommation
 *  par tour (ex. « 10 Nourriture, 8 Or », débitée du stock par le
 *  moteur) et une garnison de base. Table paramétrable dans les
 *  Référentiels → « Habitations ». */
export interface HabitationDef {
  /** « Ville » ou « Château » */
  type: string
  /** nom du rang (Hameau, Cité, Grande Cité, Motte, Donjon, Forteresse) */
  rang: string
  cout: string
  habitantsRequis: number
  /** consommation par tour, quantités positives (ex. « 10 Nourriture, 8 Or ») */
  consommation: string
  garnison: number
}

export interface City {
  nom: string
  culture: string
  /** Type d'habitation : Ville (Hameau → Cité → Grande Cité) ou
   *  Château (Motte → Donjon → Forteresse) — feuille « Ville » du
   *  classeur. Champ optionnel : absent des vieilles sauvegardes →
   *  « Ville ». Détermine l'échelle des rangs, la consommation par
   *  tour et la garnison de base (table typesHabitation). */
  type?: string
  taxes: TaxeNiveau
  /** Proximité de la ville (marqueur (y), retour Thibaut 2026-10-15) :
   *  « Plaine » (aucun bonus), « Rivière » (+proxRiviereNourriture
   *  Nourriture/tour) ou « Mer » (+proxMerNourriture Nourriture/tour) —
   *  bonus automatique à chaque fin de tour (canal « Proximité » du
   *  récap). Champ optionnel : absent des vieilles sauvegardes →
   *  « Plaine » (aucun bonus). */
  proximite?: string
  /** Rang d'habitation (Hameau / Cité / Grande Cité — table
   *  rangsHabitation du classeur). Champ optionnel : absent des vieilles
   *  sauvegardes → « Hameau ». Utilisé par la garnison des habitations
   *  (loi Autoritarisme) et l'affichage page « Pays ». */
  rang?: string
  batiments: string[]
  /** Aménagements de terrain (Baleinier, Champ, Mine d'Or… — feuille
   *  « Aménagements » du classeur). Champ optionnel : absent des
   *  vieilles sauvegardes → traité comme une liste vide. */
  amenagements?: string[]
  /** Lignes « Autres » (production additionnelle : ressource, source,
   *  nombre, bonus — prod = nombre × bonus). Champ optionnel : absent
   *  des vieilles sauvegardes → traité comme une liste vide. */
  autres?: AutreDef[]
}

export interface Army {
  nom: string
  puissanceCible: number
  puissance: number
  commandant: string | null   // id du personnage
  soldats: string[]           // ids des personnages titre Soldat
  cible: string | null        // ville / joueur visé
}

/** Cité libre : habitation sans joueur (règle « Cités libres » du
 *  référentiel). Champ optionnel de GameState : absent des vieilles
 *  sauvegardes → traité comme une liste vide.
 *  La cité possède sa propre population (habitants titrés — les
 *  Chasseurs y produisent le DOUBLE de Nourriture) ; lorsqu'un joueur
 *  devient son suzerain (3 émissaires — plateau), elle lui verse ses
 *  taxes à chaque fin de tour (canal « Cités libres » du récap). */
export interface CiteLibre {
  nom: string
  /** Type de la cité (table citesLibres du référentiel : Industrielles -
   *  Ville, Maritime - Ville, Militaires - Château, Économique - Château). */
  type: string
  /** Culture des habitants de la cité. */
  culture?: string
  /** Niveau de taxes de la cité (module TOUTES les ressources produites
   *  par ses habitants, comme pour une ville de joueur). */
  taxes?: TaxeNiveau
  /** Type d'habitation de la cité (retour Thibaut 2026-10-14) : Hameau
   *  (rural) ou Château (fortifié), tiré AU HASARD à la création de la
   *  partie. La règle du référentiel dit que la cité « change de niveau
   *  d'habitation dès qu'un joueur entre dans une nouvelle ère » — suivi
   *  au plateau. Champ optionnel : vieilles sauvegardes → null. */
  habitation?: 'Hameau' | 'Château' | null
  /** N° du joueur suzerain de la cité (3 émissaires — plateau), sinon null. */
  suzerain?: number | null
  /** Émissaires gagnés par chaque joueur auprès de la cité (clé = n° de
   *  joueur) — suivi manuel des tentatives d'influence du plateau. */
  emissaires?: Record<number, number>
  /** Population de la cité (habitants — titre Chasseur par défaut). */
  population?: Character[]
}

/** Route commerciale (marqueur (t)) : un personnage titré « Marchand »
 *  relie SA ville à la ville d'un AUTRE joueur. Chaque tour, les deux
 *  joueurs gagnent marchandOrTour Or (4 par défaut) ; le propriétaire
 *  copie en plus la production d'UNE ressource d'UN aménagement de la
 *  ville ciblée (choix modifiable à tout moment — arbitrage Thibaut
 *  2026-10-15). Un marchand ne tient qu'une route ; elle se ferme s'il
 *  meurt ou perd son titre (nettoyerRoutesCommerce, engine/commerce.ts).
 *  Champ optionnel de GameState : absent des vieilles sauvegardes → []. */
export interface RouteCommerce {
  id: string
  /** N° du joueur PROPRIÉTAIRE du marchand (encaisse Or + copie). */
  joueur: number
  /** Id du personnage portant le titre « Marchand ». */
  marchandId: string
  /** N° du joueur propriétaire de la ville ciblée (encaisse l'Or). */
  joueurCible: number
  /** Ville ciblée (une ville de joueurCible — les cités libres ne
   *  produisent rien, cf. l'effet Marchand du référentiel). */
  villeCible: string
  /** Aménagement copié (présent dans la ville ciblée) — ENTIER
   *  (marqueur (u) : toutes ses ressources positives). */
  amenagement: string
  /** OBSOLÈTE (marqueur (u)) : ne plus lire ni écrire — l'aménagement
   *  entier est copié. Champ gardé OPTIONNEL pour les sauvegardes
   *  faites sous le marqueur (t) (ignorez la valeur). */
  ressource?: string
}

export interface ResourceState {
  stock: number
  prod: number
}

export interface PlayerRecap {
  conceptions: Record<string, number>
  naissances: Record<string, number>
  deces: Record<string, number>
  decesMaladie: number
  mariagesNobles: Record<string, number>
  conversions: Record<string, number>
  titresAttribues: Record<string, number>
  crises: string[]
  commandantTombe: string | null
}

export interface Player {
  n: number                 // 1..8
  nom: string
  peuple: string
  culture: string
  regime: string
  /** Émissaires disponibles (revue 2026-10-15) : ressource du joueur,
   *  dépensés dans les cités libres (1 émissaire placé = 1 de moins
   *  ici). Champ optionnel : 0 par défaut. */
  emissaires?: number
  /** Notes libres du joueur (retour Thibaut 2026-10-15) : pense-bête
   *  affiché en bas de l'onglet Pays. Champ optionnel. */
  notes?: string
  resources: Record<string, ResourceState> // clés = RESOURCES
  villes: City[]
  dynastie: { nom: string; description: string } | null
  armees: Army[]
  recap: PlayerRecap | null
  /** Rang de pays (feuille « Pays » du classeur) : Baronnie, Comté, … Commune.
   *  Champ optionnel : absent des vieilles sauvegardes → valeur par défaut
   *  dérivée du régime politique (voir rangParDefaut dans setup.ts). */
  rang?: string
  /** Vassalité : n° du suzerain si ce joueur lui a prêté serment, sinon null.
   *  Un vassal reverse chaque tour une part des revenus de ses habitants
   *  (paramètre vassalPrelevement) à son suzerain. */
  vassalDe?: number | null
  /** Technologies de progrès débloquées par ce joueur — clés
   *  `<indexArbre>:<slot>` (index dans Référentiels → Progrès, slot
   *  a1|a2|b1|b2|c). Règles appliquées par la vue « Progrès » :
   *  tech 2 exige la tech 1 de sa branche, la tech C exige 2 techs
   *  d'une même branche, un arbre est terminé à EXACTEMENT 3 techs,
   *  et l'âge N exige 3 arbres complétés de l'âge N-1. */
  progresDebloques?: string[]
  /** Règle de faction choisie pour l'Âge II / l'Âge III : le joueur
   *  choisit UNE règle parmi les trois de son peuple à chaque montée
   *  d'âge (la montée d'âge elle-même n'est PAS automatisée — choix
   *  manuel, effet non appliqué automatiquement). */
  regleAge2?: string | null
  regleAge3?: string | null
  /** Bonus de garnison des ministères (refonte 2026-10-14) : crédité
   *  une fois à la prise de fonction d'un Connétable (+5 par ville,
   *  engine/ministeres.ts) et ajouté à la garnison calculée de chaque
   *  ville (garnisonHabitationVille). Champ optionnel : absent des
   *  vieilles sauvegardes → 0. */
  garnisonMinisteres?: number
  /** Lauriers de victoire validés (refonte 2026-10-14) : clé = nom de la
   *  voie (table victoires du référentiel), valeur = nombre de Lauriers
   *  validés 0-4, en ORDRE STRICT (un Laurier ne se valide que si le
   *  précédent est acquis — cocherLaurier dans engine/victory.ts,
   *  cochage manuel au radar de l'accueil ; crise à chaque Laurier
   *  I-III validé, Laurier IV = victoire). Champ optionnel : absent
   *  des vieilles sauvegardes → aucun Laurier validé. */
  lauriers?: Record<string, number>
}

export interface LogEntry {
  turn: number
  type: 'Événement' | 'Dynastie' | 'Crise' | 'Naissance' | 'Décès' | 'Mariage' | 'Titre' | 'Armée' | 'Culture' | 'Commerce' | 'Système'
  joueur: number | null
  texte: string
}

/** Apports d'un tour, canal par canal (récap ressources du joueur).
 *  Les événements et cartes dynastie du tour ne sont pas inclus :
 *  ils figurent dans le journal du tour. */
export interface ApportsTour {
  /** production de base du pays (nourriture générale : jamais doublée) */
  production: Record<string, number>
  /** effets automatiques des bâtiments (engine/batiments.ts) */
  batiments: Record<string, number>
  /** effets des aménagements de terrain (engine/amenagements.ts),
   *  HORS production d'été. Champ optionnel : absent des historiques
   *  d'avant l'ajout des aménagements. */
  amenagements?: Record<string, number>
  /** nourriture d'ÉTÉ (ligne « Nourr - été » du classeur : aménagements
   *  Champ/Rizière + lignes « Autres » « Nourr - été ») — créditée au
   *  stock de Nourriture uniquement pendant l'été (0 sinon).
   *  Champ optionnel : absent des historiques d'avant le canal. */
  nourrEte?: Record<string, number>
  /** lignes « Autres » des villes (ressource × nombre × bonus — engine/autres.ts).
   *  Champ optionnel : absent des historiques d'avant l'ajout de la catégorie. */
  autres?: Record<string, number>
  /** gains d'habitants (titres, taxes) après coefficient gainsCrediteStock, hors tribut */
  population: Record<string, number>
  /** tribut de vassalité net (négatif = payé, positif = reçu) */
  vassalite: Record<string, number>
  /** lois chiffrées des régimes politiques & cultures (engine/regimes.ts) —
   *  garnison de la loi du régime, bonus de capitale de la culture, etc.
   *  Champ optionnel : absent des historiques d'avant l'ajout du canal. */
  regimesCultures?: Record<string, number>
  /** consommations par tour des habitations (engine/habitations.ts) —
   *  négatives (ex. Cité : −10 Nourriture, −8 Or). Champ optionnel :
   *  absent des historiques d'avant l'ajout du canal. */
  habitations?: Record<string, number>
  /** bonus automatiques des règles de faction du peuple du joueur
   *  (engine/factions.ts — étape 3nonies). Champ optionnel : absent
   *  des historiques d'avant l'ajout du canal. */
  faction?: Record<string, number>
  /** effets par tour des technologies de progrès débloquées
   *  (engine/progres.ts — étape 3undecies). Champ optionnel : absent
   *  des historiques d'avant l'ajout du canal. */
  progres?: Record<string, number>
  /** taxes reçues des cités libres sous suzeraineté du joueur
   *  (engine/citesLibres.ts — étape 3decies). Champ optionnel : absent
   *  des historiques d'avant l'ajout du canal. */
  citesLibres?: Record<string, number>
  /** effets automatiques par tour des portefeuilles ministériels
   *  (engine/ministeres.ts — étape 3duodecies : Trésorier +5 Or,
   *  Grand Précepteur +1 Science, cumulables). Champ optionnel :
   *  absent des historiques d'avant l'ajout du canal. */
  ministeres?: Record<string, number>
  /** routes commerciales des marchands (engine/commerce.ts — étape
   *  3terdecies : +marchandOrTour Or pour chaque joueur relié + copie
   *  d'une ressource d'un aménagement de la ville ciblée). Champ
   *  optionnel : absent des historiques d'avant le canal. */
  commerce?: Record<string, number>
  /** bonus de proximité des villes (marqueur (y) : Rivière
   *  +proxRiviereNourriture, Mer +proxMerNourriture Nourriture/tour —
   *  engine/villes.ts). Champ optionnel : absent des historiques
   *  d'avant le canal. */
  proximite?: Record<string, number>
}

export interface HistoryRow {
  turn: number
  joueur: number
  stocks: Record<string, number>
  prods: Record<string, number>
  /** Apports du tour (champ optionnel : absent des vieilles sauvegardes). */
  apports?: ApportsTour
}

export interface GameSetup {
  joueurs: {
    nom: string
    peuple: string
    culture: string
    regime: string
    taillePopulation: number
    pourcentageMariages: number
    villes: string[]          // noms des villes
  }[]
}

export interface GameState {
  /** Configuration de la partie : référentiels + paramètres des formules.
   *  Absente des vieilles sauvegardes → complétée par cloneDefaultConfig(). */
  config?: import('../config/defaultConfig').GameConfig
  version: number
  seed: number
  rngState: number
  turn: number                // numéro du tour en cours
  saison: Saison
  modDanger: number
  players: Player[]
  population: Record<number, Character[]> // clé = n° joueur
  /** Cités libres de la partie (onglet « 🗼 Cités libres »). Champ
   *  optionnel : absent des vieilles sauvegardes → liste vide. */
  citesLibres?: CiteLibre[]
  /** Routes commerciales des marchands (marqueur (t), engine/commerce.ts).
   *  Champ optionnel : absent des vieilles sauvegardes → liste vide. */
  routesCommerce?: RouteCommerce[]
  log: LogEntry[]
  history: HistoryRow[]
}

// ── Voies de victoire (chapitre XII du livret) ─────────────────────────
//  Refonte 2026-10-14 : les Lauriers validés sont suivis dans
//  Player.lauriers (cochage manuel, ordre strict — engine/victory.ts).
//  L'ancienne interface VictoryStatus (auto-détection « domination »,
//  voie Dynastique fantôme) a été supprimée avec checkVictory.
