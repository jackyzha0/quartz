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
  titre: string | null
  education: string | null
  fecondite: number
  ageMax: number
  armee: string | null        // nom de l'armée de rattachement
}

export interface City {
  nom: string
  culture: string
  taxes: TaxeNiveau
  batiments: string[]
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
}

export interface LogEntry {
  turn: number
  type: 'Événement' | 'Dynastie' | 'Crise' | 'Naissance' | 'Décès' | 'Mariage' | 'Titre' | 'Armée' | 'Culture' | 'Système'
  joueur: number | null
  texte: string
}

export interface HistoryRow {
  turn: number
  joueur: number
  stocks: Record<string, number>
  prods: Record<string, number>
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
