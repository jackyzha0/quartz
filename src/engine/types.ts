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
  /** Technologies débloquées (texte des entrées des arbres de progrès). */
  progresDebloques?: string[]
}

export interface LogEntry {
  turn: number
  type: 'Événement' | 'Dynastie' | 'Crise' | 'Naissance' | 'Décès' | 'Mariage' | 'Titre' | 'Armée' | 'Culture' | 'Système'
  joueur: number | null
  texte: string
}

/** Apports d'un tour, canal par canal (récap ressources du joueur).
 *  Les événements et cartes dynastie du tour ne sont pas inclus :
 *  ils figurent dans le journal du tour. */
export interface ApportsTour {
  /** production de base (l'été double la Nourriture) */
  production: Record<string, number>
  /** effets automatiques des bâtiments (engine/batiments.ts) */
  batiments: Record<string, number>
  /** effets des aménagements de terrain (engine/amenagements.ts).
   *  Champ optionnel : absent des historiques d'avant l'ajout des aménagements. */
  amenagements?: Record<string, number>
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
  log: LogEntry[]
  history: HistoryRow[]
}

// ── Conditions de victoire (chapitre XII du livret) ─────────────────────

export interface VictoryStatus {
  joueur: number
  nom: string
  militaire: boolean
  economique: boolean
  culturelle: boolean
  scientifique: boolean
  demographique: boolean
  dynastique: boolean
}
