// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Configuration par défaut
//  Toutes les données de référence du classeur Excel (feuilles init,
//  JSON, Titres, traits_genetiques, Culture, Peuples, Ville, Bat,
//  Progrès, Tourisme, Cités L, BDD_pop, Accueil) + paramètres moteur.
//  Tout est stocké DANS la partie (state.config) et modifiable à chaud
//  depuis l'onglet « Paramètres » — aucun redémarrage nécessaire.
// ══════════════════════════════════════════════════════════════════════

import refJson from './referentiels.json'
import { mergeParams, type GameParams, type GameParamStrings } from './params'

// ── Types des référentiels (issus du classeur) ─────────────────────────

export interface TitreDef {
  titre: string
  education: string
  valeur1: number
  ressource1: string
  valeur2: number
  ressource2: string
  description: string
  nobleSeul: boolean
  regleGenre: string
  attribution: string
}
export interface TraitDef {
  name: string
  weight: number
  description: string
  life_delta: number
  resurrection_min_roll: number
  fert_add: number
  heritable: boolean
  marriage_mod: number
}
export interface CultureDef {
  nom: string
  heredite: string
  martialite: string
  homoAutorisee: boolean
  fertFactor: number
  reglePays: string
  reglePerso: string
  /** Règles chiffrées appliquées AUTOMATIQUEMENT par le moteur
   *  (engine/regimes.ts, engine/titres.ts) : la capitale génère +N d'une
   *  ressource par habitation de cette culture dans le monde, et chaque
   *  construction de bâtiment rapporte +N Science. Champs optionnels :
   *  absents des vieilles configurations, complétés par migrerCultures. */
  capitalNourrParHabMonde?: number
  capitalTourismeParHabMonde?: number
  capitalOrParHabMonde?: number
  scienceParConstruction?: number
}
export interface RegimeDef {
  nom: string
  loi: string
  /** Loi chiffrée appliquée AUTOMATIQUEMENT par le moteur
   *  (engine/regimes.ts) : garnison des habitations +N par rang
   *  d'habitation (Autoritarisme), +N Nourriture par tour d'été pour les
   *  champs et rizières (Socialisme). Champs optionnels : absents
   *  des vieilles configurations, complétés par migrerRegimes. */
  garnisonParRang?: number
  nourrEteChampRiziere?: number
}
/** Ligne de la table « types d'habitation » (feuille Ville du classeur) :
 *  chaque ville est de type Ville (Hameau → Cité → Grande Cité) ou
 *  Château (Motte → Donjon → Forteresse) ; chaque rang a un coût
 *  d'amélioration, un nombre d'habitants requis, une consommation
 *  par tour et une garnison de base — débités/appliqués
 *  automatiquement par le moteur (engine/habitations.ts). */
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
export interface EventDef {
  nom: string
  saison: string
  poids: number
  faible: string
  moyenne: string
  forte: string
  extreme: string
}
export interface DynastieDef { nom: string; poids: number; description: string }
export interface OffrandeDef { nom: string; poids: number; description: string }
export interface BanqueNoms { nom: string; noms: string[]; prenomsM: string[]; prenomsF: string[] }
export interface BuildingDef {
  nom: string
  categorie: string
  ecoleRang: number
  malContraction: number
  bonusGuerison: number
  bonusGuerisonGlobal: number
  effet: string
}
export interface PoidsNom { nom: string; poids: number }
export interface RegleFaction { nom: string; texte: string }
export interface PeupleRef {
  nom: string
  description: string
  lignes: { label: string; texte: string }[]
  /** Fiche de faction : victoire (désactivée), bâtiment/aménagement de
   *  faction, 2 règles de base, 3 règles d'Âge II et 3 d'Âge III (le
   *  joueur en choisit UNE par âge à la montée d'âge). Champs
   *  optionnels : les vieux référentiels n'ont que « lignes ». */
  victoire?: string
  batiment?: string
  reglesBase?: RegleFaction[]
  ageII?: RegleFaction[]
  ageIII?: RegleFaction[]
}
export interface FicheLigne { label: string; texte: string }
export interface BatimentRef { categorie: string; nom: string; cout: string; effet: string }
export interface AmenagementRef { amenagement: string; type: string; rang: string; effet: string }
/** Table canonique des constructions (feuille « Ville » du classeur 7.19) :
 *  coût EXACT, production EXACTE (analysable par le moteur) et description
 *  EXACTE du classeur — parfois similaires. */
export interface ConstructionRef {
  categorie: string   // 'Bâtiment' | 'Aménagement'
  groupe: string      // 'Ville' | 'Château' | 'Capitale' | 'Terrain'
  famille: string      // Militaire / Economique / Guilde / Capitale / ''
  nom: string
  /** Faction (peuple) propriétaire de la construction — champ optionnel :
   *  un joueur ne peut construire les bâtiments de faction que de SON
   *  peuple (catégorie « Bâtiment de faction » des cadres ville). */
  faction?: string
  terrain?: string     // aménagements uniquement
  cout: string
  production: string
  description: string
}
/** Une technologie d'un arbre de progrès : nom, coût (Science, entre
 *  parenthèses dans le classeur) et description de l'effet — appliqué
 *  au plateau (aucun effet automatique dans le moteur web). */
export interface ProgresTechDef { nom: string; cout: string; description: string }
/** Un arbre de progrès (feuille « Progrès » du classeur) : 2 branches de
 *  2 technologies (la tech 2 exige la tech 1) + une technologie C
 *  (exigée après 2 techs d'une même branche, optionnelle). Un arbre est
 *  TERMINÉ à EXACTEMENT 3 technologies débloquées ; 3 arbres de l'âge
 *  N-1 complétés ouvrent l'âge N. */
export interface ProgresArbre {
  nom: string
  /** 1..3 — l'âge auquel l'arbre appartient. */
  age: number
  /** Tags indicatifs du classeur (ex. « C, PV, Aurore N »). */
  tags?: string
  brancheA: ProgresTechDef[]
  brancheB: ProgresTechDef[]
  techC: ProgresTechDef
}

export interface EffetDef { ressource: string; base: number }
export interface EventEffetsDef {
  nom: string
  effets: EffetDef[]   // base × multiplicateur de niveau (params evMult*)
  maladieRisque: number // risque de maladie supplémentaire ce tour (× mult)
  modDanger: number     // bonus permanent de dangerosité (ex. Sombres présages)
}
export interface DynastieEffetsDef {
  nom: string
  effets: EffetDef[]    // base fixe (pas de multiplicateur de niveau)
  guerison: boolean     // true = guérit un personnage malade du pays
}
export interface GameConfig {
  ressources: string[]
  educations: string[]
  params: GameParams & GameParamStrings
  titres: TitreDef[]
  traits: TraitDef[]
  cultures: CultureDef[]
  regimes: RegimeDef[]
  events: EventDef[]
  dynasties: DynastieDef[]
  offrandes: OffrandeDef[]
  orientations: PoidsNom[]
  genres: PoidsNom[]
  agesPoids: { age: string; poids: number }[]
  banquesNoms: BanqueNoms[]
  peupleBanque: Record<string, number>
  peuples: string[]
  batiments: BuildingDef[]
  eventEffets: EventEffetsDef[]
  dynastieEffets: DynastieEffetsDef[]
  // ── données de référence « fiches » (affichage, 100% éditables) ──
  init: {
    nbPerso: number
    pourcentageMarie: number
    nbNoble: number
    ageDefaut: number
    orientationDefaut: string
    sexeDefaut: string
  }
  traitsGenetiques: {
    id: number; name: string; weight: number; heritable: boolean
    marriageMod: number; fertAdd: number; lifeDelta: number
    resurrectionMinRoll: number; description: string
  }[]
  ministeres: { ministere: string; effet: string }[]
  titresEffets: { titre: string; effet: string; revocation: string }[]
  peuplesLibres: PeupleRef[]
  peuplesAutres: PeupleRef[]
  batimentsVille: BatimentRef[]
  batimentsChateau: BatimentRef[]
  batimentsCouts: Record<string, unknown>[]
  amenagements: AmenagementRef[]
  constructions: ConstructionRef[]
  rangsHabitation: { rang: string; cout: string; effet: string }[]
  typesHabitation: HabitationDef[]
  progres: ProgresArbre[]
  paysRangs: { bloc: string; nom: string; cout: string; bonus: string; succession: string }[]
  tourismeSeuils: { seuil: number; bonus: string }[]
  dogmes: { dogme: string; bonusPontife: string; bonusFideles: string }[]
  citesLibres: { type: string; effet: string }[]
  regleCitesLibres: string
  victoires: { voie: string; rangs: { rang: string; condition: string; bonus: string }[] }[]
  crises: string[]
  rappelsRegles: string[]
}

const ref = refJson as any

// ── Normalisation des tables du classeur vers les types du moteur ─────

/** Table des traits génétiques — feuille `traits_genetiques` du classeur 7.19.
 *  C'est LA liste du moteur : création des personnages, héritage à la
 *  naissance, effets (mariage, fécondité, espérance de vie, résurrection).
 *  Remplace l'ancienne table V2 des 37 traits de personnage. */
function normaliserTraits(): TraitDef[] {
  const out: TraitDef[] = ref.traitsGenetiques.map((t: any) => ({
    name: t.name,
    weight: Number(t.weight) || 0,
    description: t.description || '',
    life_delta: Number(t.lifeDelta) || 0,
    resurrection_min_roll: Number(t.resurrectionMinRoll) || 0,
    fert_add: Number(t.fertAdd) || 0,
    heritable: !!t.heritable,
    marriage_mod: Number(t.marriageMod) || 0,
  }))
  // Traits système : présents dans la table (poids 0, jamais tirés) ;
  // on les garantit même si la table était incomplète.
  if (!out.some((t) => t.name === 'Bâtard')) {
    out.push({ name: 'Bâtard', weight: 0, description: '(système) Enfant illégitime.', life_delta: 0, resurrection_min_roll: 0, fert_add: 0, heritable: false, marriage_mod: 0 })
  }
  if (!out.some((t) => t.name === 'Consanguin')) {
    out.push({ name: 'Consanguin', weight: 0, description: '(système) Parents apparentés.', life_delta: -2, resurrection_min_roll: 0, fert_add: -0.2, heritable: false, marriage_mod: 0 })
  }
  return out
}

function normaliserTitres(): TitreDef[] {
  return ref.titres.map((t: any) => ({
    titre: t.titre,
    education: t.education || '',
    valeur1: Number(t.valeur1) || 0,
    ressource1: t.ressource1 || '',
    valeur2: Number(t.valeur2) || 0,
    ressource2: t.ressource2 || '',
    description: t.description || '',
    nobleSeul: !!t.nobleSeul,
    regleGenre: (t.regleGenre === 'vide' ? '' : t.regleGenre) || '',
    attribution: t.attribution || '',
  }))
}

function normaliserCultures(): CultureDef[] {
  return ref.cultures.map((c: any) => ({
    nom: c.nom,
    heredite: c.heredite,
    martialite: c.martialite,
    homoAutorisee: c.homoAutorisee === true || c.homoAutorisee === 'true',
    fertFactor: Number(c.fertFactor) || 1,
    reglePays: c.reglePays || '',
    reglePerso: c.reglePerso || '',
    capitalNourrParHabMonde: Number(c.capitalNourrParHabMonde) || undefined,
    capitalTourismeParHabMonde: Number(c.capitalTourismeParHabMonde) || undefined,
    capitalOrParHabMonde: Number(c.capitalOrParHabMonde) || undefined,
    scienceParConstruction: Number(c.scienceParConstruction) || undefined,
  }))
}

function normaliserBatiments(): BuildingDef[] {
  // Effets moteur (santé / écoles) — valeurs issues du livret, modifiables
  const effets: Record<string, Partial<BuildingDef>> = {
    'Herboristerie': { categorie: 'Santé', malContraction: 0.05, bonusGuerison: 0.05 },
    'Clinique': { categorie: 'Santé', malContraction: 0.10, bonusGuerison: 0.10 },
    'Guilde des médecins': { categorie: 'Santé', bonusGuerisonGlobal: 0.10 },
    'Ecole élémentaire': { categorie: 'Éducation', ecoleRang: 1 },
    'École élémentaire': { categorie: 'Éducation', ecoleRang: 1 },
    'Ecole intermédiaire': { categorie: 'Éducation', ecoleRang: 2 },
    'École intermédiaire': { categorie: 'Éducation', ecoleRang: 2 },
    'Ecole supérieure': { categorie: 'Éducation', ecoleRang: 3 },
    'École supérieure': { categorie: 'Éducation', ecoleRang: 3 },
  }
  const vus = new Set<string>()
  const out: BuildingDef[] = []
  const push = (nom: string, categorie: string, effet: string) => {
    if (!nom || vus.has(nom)) return
    // lignes parasites du classeur (effets seuls, numéros de colonne)
    if (/^\d+$/.test(nom) || nom.startsWith('Consomme ')) return
    vus.add(nom)
    out.push({
      nom, categorie, effet,
      ecoleRang: 0, malContraction: 0, bonusGuerison: 0, bonusGuerisonGlobal: 0,
      ...(effets[nom] ?? {}),
    })
  }
  for (const b of ref.batimentsVille) push(b.nom, b.categorie || 'Ville', b.effet || '')
  for (const b of ref.batimentsChateau) push(b.nom, b.categorie || 'Château', b.effet || '')
  for (const nom of Object.keys(effets)) if (!vus.has(nom)) push(nom, effets[nom].categorie as string, 'Bâtiment à effet moteur (santé / éducation).')
  return out
}

function peuplesNoms(): string[] {
  return [...ref.peuplesLibres, ...ref.peuplesAutres].map((p: any) => p.nom).filter(Boolean)
}

/** Associe chaque peuple à une banque de noms (Banque 1/2/3 du classeur). */
const BANQUE_PEUPLE: Record<string, number> = {
  'Basiléens': 0, 'PEAUX VERTES': 1, 'HOMMES LEZARDS': 0, 'NAINS': 2, "ELFES D'OR": 0,
  'NORLS': 0, "LEGIONS D'OUTRE-TOMBE": 2, 'VERMINES DE KAOSS': 0, 'KROVORS': 0, 'THRAKSANS': 1,
}
function peupleBanqueOf(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const nom of peuplesNoms()) out[nom] = BANQUE_PEUPLE[nom] ?? 0
  return out
}

// ── Effets chiffrés des événements et cartes dynastie (annexe du livret) ──
// '(aléatoire)' = une ressource de base tirée au sort. Tout est éditable
// depuis l'onglet « Paramètres ».
const BASE_EVENT_EFFECTS: Record<string, { effets: EffetDef[]; maladieRisque?: number; modDanger?: number }> = {
  'Sécheresse': { effets: [{ ressource: 'Nourriture', base: -10 }] },
  'Explosion volcanique': { effets: [{ ressource: 'Nourriture', base: -6 }, { ressource: 'Bois', base: -2 }] },
  'Innondation': { effets: [{ ressource: 'Nourriture', base: -8 }, { ressource: 'Or', base: -2 }] },
  'Barbarisme': { effets: [{ ressource: 'Bétail', base: -4 }] },
  'Brigandage': { effets: [{ ressource: 'Or', base: -7 }] },
  'Incendie': { effets: [{ ressource: 'Bois', base: -5 }] },
  'Radiations solaires': { effets: [{ ressource: 'Science', base: 3 }] },
  'Ouragan': { effets: [{ ressource: 'Bois', base: -3 }, { ressource: 'Or', base: -2 }] },
  'Eclipse': { effets: [{ ressource: 'Science', base: 2 }] },
  'Famine': { effets: [{ ressource: 'Nourriture', base: -12 }] },
  'Avalanche': { effets: [{ ressource: 'Nourriture', base: -6 }, { ressource: 'Bois', base: -2 }] },
  'Blizzard': { effets: [{ ressource: 'Nourriture', base: -8 }] },
  'Ere glaciaire': { effets: [{ ressource: 'Nourriture', base: -15 }] },
  'Hiver prolongé': { effets: [{ ressource: 'Nourriture', base: -5 }, { ressource: 'Or', base: -2 }] },
  'Peste': { effets: [{ ressource: 'Habitants', base: -3 }], maladieRisque: 0.04 },
  'Gel': { effets: [{ ressource: 'Nourriture', base: -6 }] },
  'Redoux': { effets: [{ ressource: 'Bétail', base: 2 }] },
  'Sombres présages': { effets: [], modDanger: 1 },
}

const BASE_DYNASTIE_EFFECTS: Record<string, { effets: EffetDef[]; guerison?: boolean }> = {
  'Bénédiction de Samodiva': { effets: [{ ressource: 'Nourriture', base: 5 }] },
  'Brigandage': { effets: [{ ressource: 'Or', base: -4 }] },
  'Découverte': { effets: [{ ressource: 'Science', base: 2 }] },
  'Hommage au roi': { effets: [{ ressource: '(aléatoire)', base: 2 }] },
  'Merveille architecturale': { effets: [{ ressource: 'Tourisme', base: 5 }] },
  'Troupe de troubadours': { effets: [{ ressource: 'Tourisme', base: 5 }] },
  'Miracle': { effets: [], guerison: true },
  'Migration': { effets: [{ ressource: 'Habitants', base: 2 }] },
  'tempête magique': { effets: [{ ressource: 'Science', base: 2 }] },
  'Sombre proposition': { effets: [{ ressource: 'Science', base: 2 }, { ressource: 'Or', base: 5 }] },
  'Système de prévention': { effets: [{ ressource: 'Or', base: 5 }] },
  'Découverte archéologique': { effets: [{ ressource: 'Science', base: 5 }] },
  'incendie': { effets: [{ ressource: '(aléatoire)', base: -1 }] },
}

export const DEFAULT_CONFIG: GameConfig = {
  ressources: ['Bétail', 'Bois', 'Charbon', 'Fer', 'Pierre', 'Soie', 'Or', 'Nourriture', 'Science', 'Habitants', 'Tourisme', 'Garnison'],
  educations: ['Agricole', 'Scientifique', 'Militaire', 'Économique', 'Culturelle'],
  params: mergeParams(undefined),
  titres: normaliserTitres(),
  traits: normaliserTraits(),
  cultures: normaliserCultures(),
  regimes: ref.regimes,
  events: ref.events,
  dynasties: ref.dynasties,
  offrandes: ref.offrandes,
  orientations: ref.orientations,
  genres: ref.genres,
  agesPoids: ref.agesPoids,
  banquesNoms: ref.banquesNoms,
  peupleBanque: peupleBanqueOf(),
  peuples: peuplesNoms(),
  batiments: normaliserBatiments(),
  eventEffets: ref.events.map((e: any) => ({
    nom: e.nom,
    effets: BASE_EVENT_EFFECTS[e.nom]?.effets ?? [],
    maladieRisque: BASE_EVENT_EFFECTS[e.nom]?.maladieRisque ?? 0,
    modDanger: BASE_EVENT_EFFECTS[e.nom]?.modDanger ?? 0,
  })),
  dynastieEffets: ref.dynasties.map((d: any) => ({
    nom: d.nom,
    effets: BASE_DYNASTIE_EFFECTS[d.nom]?.effets ?? [],
    guerison: !!BASE_DYNASTIE_EFFECTS[d.nom]?.guerison,
  })),
  init: ref.init,
  traitsGenetiques: ref.traitsGenetiques,
  ministeres: ref.ministeres,
  titresEffets: ref.titresEffets,
  peuplesLibres: ref.peuplesLibres,
  peuplesAutres: ref.peuplesAutres,
  batimentsVille: ref.batimentsVille,
  batimentsChateau: ref.batimentsChateau,
  batimentsCouts: ref.batimentsCouts,
  amenagements: ref.amenagements,
  constructions: ref.constructions,
  rangsHabitation: ref.rangsHabitation,
  typesHabitation: ref.typesHabitation,
  progres: ref.progres,
  paysRangs: [], // rempli depuis la feuille Pays (voir normalisation ci-dessous)
  tourismeSeuils: ref.tourismeSeuils,
  dogmes: ref.dogmes,
  citesLibres: ref.citesLibres,
  regleCitesLibres: ref.regleCitesLibres,
  victoires: ref.victoires,
  crises: ref.crises,
  rappelsRegles: ref.rappelsRegles,
}

// Rangs de pays (feuille « Pays ») : Féodal / Républicain
DEFAULT_CONFIG.paysRangs = [
  { bloc: 'Féodal', nom: 'Baronnie', cout: '', bonus: 'Fin été : +20 Nourriture.', succession: 'Terres : 1 habitation.' },
  { bloc: 'Féodal', nom: 'Comté', cout: '20 Or, 40 Nourriture', bonus: 'Fin été : +10 Or.', succession: 'Terres : 2' },
  { bloc: 'Féodal', nom: 'Duché', cout: '30 Or, 60 Nourriture', bonus: 'Fin hiver : +6 Science.', succession: 'Terres : 3' },
  { bloc: 'Féodal', nom: 'Royaume', cout: '50 Or, 100 Nourriture', bonus: 'Fin été : 6 ressources de base au choix.', succession: 'Terres : 4' },
  { bloc: 'Féodal', nom: 'Empire', cout: '100 Or, 200 Nourriture', bonus: 'Fin hiver : volez 5 sciences à chaque joueur de rang inférieur.', succession: 'Terres : 5' },
  { bloc: 'Républicain', nom: 'Commune', cout: '40 Or, 20 Nourriture', bonus: 'Fin été : 2 ressources de base aléatoires.', succession: 'Terres : 2' },
  { bloc: 'Républicain', nom: 'District', cout: '60 Or, 30 Nourriture', bonus: 'Fin hiver : 10 Influence avec une cité libre au choix.', succession: 'Terres : 2' },
  { bloc: 'Républicain', nom: 'Union', cout: '100 Or, 50 Nourriture', bonus: 'Fin été : arrivée d\'un personnage aléatoire.', succession: 'Terres : 3' },
  { bloc: 'Républicain', nom: 'Confédération', cout: '200 Or, 100 Nourriture', bonus: 'Fin hiver : 25 Influence avec une cité libre au choix.', succession: 'Terres : 3' },
]

// ── Accès à la configuration effective d'une partie ───────────────────

export interface Cfg {
  p: GameParams & GameParamStrings
  ressources: string[]
  educations: string[]
  titres: TitreDef[]
  traits: TraitDef[]
  cultures: CultureDef[]
  regimes: RegimeDef[]
  events: EventDef[]
  dynasties: DynastieDef[]
  offrandes: OffrandeDef[]
  orientations: PoidsNom[]
  genres: PoidsNom[]
  banquesNoms: BanqueNoms[]
  peupleBanque: Record<string, number>
  peuples: string[]
  batiments: BuildingDef[]
  config: GameConfig
}

/** Fusionne la config d'une partie (state.config) sur les défauts. */
/** Migration : une table de traits héritée de la V2 (37 traits de
 *  personnage, dont « Nanisme ») repasse sur la table génétique 7.19.
 *  Les configs éditées à partir de la nouvelle liste ne sont pas touchées. */
export function migrateTraits(t: TraitDef[] | undefined): TraitDef[] {
  if (!Array.isArray(t) || t.length === 0) return DEFAULT_CONFIG.traits
  if (t.some((x) => x?.name === 'Obstiné')) return t
  return DEFAULT_CONFIG.traits
}

/** Applique la migration des traits à une config complète (chargement). */
export function migrateGameConfig(cfg: GameConfig): GameConfig {
  return { ...cfg, traits: migrateTraits(cfg.traits) }
}

/** Complète les cultures d'une configuration existante avec les champs
 *  chiffrés ajoutés après coup (par nom — les valeurs éditées par
 *  l'utilisateur priment sur les défauts, les champs manquants viennent
 *  du référentiel). */
export function migrerCultures(list: CultureDef[] | undefined): CultureDef[] {
  const defs = DEFAULT_CONFIG.cultures
  if (!Array.isArray(list) || list.length === 0) return defs
  return list.map((c) => {
    const d = defs.find((x) => x.nom === c?.nom)
    return d ? { ...d, ...c } : c
  })
}

/** Complète les régimes d'une configuration existante avec les champs
 *  chiffrés ajoutés après coup (par nom — même logique que migrerCultures). */
export function migrerRegimes(list: RegimeDef[] | undefined): RegimeDef[] {
  const defs = DEFAULT_CONFIG.regimes
  if (!Array.isArray(list) || list.length === 0) return defs
  return list.map((r) => {
    const d = defs.find((x) => x.nom === r?.nom)
    return d ? { ...d, ...r } : r
  })
}

/** Complète les fiches de faction d'une configuration existante :
 *  les champs structurés (victoire, batiment, reglesBase, ageII, ageIII)
 *  manquent dans les vieilles sauvegardes — on les reprend du
 *  référentiel courant, faction par faction (par nom), et on ajoute
 *  les factions apparues depuis (ex. Sylvains). Les fiches
 *  explicitement éditées dans la config ne sont pas écrasées. */
export function migrerFactions(
  list: PeupleRef[] | undefined, defauts: PeupleRef[],
): PeupleRef[] {
  const out: PeupleRef[] = (list ?? []).map((f) => {
    const ref = defauts.find((d) => d.nom === f.nom)
    return ref ? { ...ref, ...f } : f
  })
  for (const d of defauts) {
    if (!out.some((f) => f.nom === d.nom)) out.push(d)
  }
  return out
}

/** Correctif Sylvains (V3) : « Savoir ancestral » et « Bibliothèque
 *  enfouie » ont échangé leur âge (Bibliothèque enfouie → Âge II,
 *  Savoir ancestral → Âge III). Les vieilles configurations qui
 *  portent l'ancienne répartition sont corrigées nommément ; les
 *  choix de règle d'âge stockés sur le joueur (regleAge2/regleAge3)
 *  sont simplement invalidés si le nom ne figure plus dans l'âge
 *  correspondant (le joueur re-choisit dans le cadre Faction). */
export function migrerSwapSylvains(f: PeupleRef): PeupleRef {
  if (f.nom !== 'Sylvains') return f
  const a2 = f.ageII ?? []
  const a3 = f.ageIII ?? []
  const s2 = a2.find((r) => r.nom === 'Savoir ancestral')
  const b3 = a3.find((r) => r.nom === 'Bibliothèque enfouie')
  if (!s2 || !b3) return f // déjà à jour (ou fiche éditée autrement)
  return {
    ...f,
    ageII: a2.map((r) => (r.nom === 'Savoir ancestral' ? b3 : r)),
    ageIII: a3.map((r) => (r.nom === 'Bibliothèque enfouie' ? s2 : r)),
    lignes: (f.lignes ?? []).map((l) => {
      if (/^Âge II — Savoir ancestral/.test(l.label)) {
        return { label: 'Âge II — Bibliothèque enfouie', texte: b3.texte }
      }
      if (/^Âge III — Bibliothèque enfouie/.test(l.label)) {
        return { label: 'Âge III — Savoir ancestral', texte: s2.texte }
      }
      return l
    }),
  }
}

/** Table des constructions (bâtiments / aménagements, y compris de
 *  faction) d'une configuration existante : les entrées du référentiel
 *  par défaut absentes de la config (apparues depuis la sauvegarde)
 *  sont AJOUTÉES, sans toucher aux entrées déjà présentes. */
export function migrerConstructions(
  list: ConstructionRef[] | undefined, defauts: ConstructionRef[],
): ConstructionRef[] {
  const out = [...(list ?? [])]
  const noms = new Set(out.map((c) => c.nom))
  for (const d of defauts) {
    if (!noms.has(d.nom)) out.push(d)
  }
  return out
}

/** Table des types d'habitation (Ville / Château) d'une configuration
 *  existante — défauts du classeur si absents ou vides. */
export function migrerTypesHabitation(list: HabitationDef[] | undefined): HabitationDef[] {
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_CONFIG.typesHabitation
  return list
}

/** Arbres de progrès d'une configuration existante : l'ANCIEN format
 *  du classeur ({ arbre, entrees } à plat) est remplacé par le
 *  référentiel courant (structure par branches a/b + tech C). Les
 *  configs déjà au nouveau format (nom/age/branches) sont conservées
 *  telles quelles (éditables dans Référentiels → Progrès). */
export function migrerProgres(list: ProgresArbre[] | undefined): ProgresArbre[] {
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_CONFIG.progres
  const vieuxFormat = (list as unknown[]).some(
    (t: any) => t && (t.entrees !== undefined || t.arbre !== undefined) && t.brancheA === undefined,
  )
  if (vieuxFormat) return DEFAULT_CONFIG.progres
  return list
}

export function cfgOf(config: GameConfig | undefined): Cfg {
  const c = config ?? DEFAULT_CONFIG
  const merged: GameConfig = {
    ...DEFAULT_CONFIG,
    ...c,
    params: mergeParams(c.params as unknown as Record<string, unknown>),
  }
  // migrations : traits (V2), cultures et régimes (champs chiffrés)
  merged.traits = migrateTraits(merged.traits)
  merged.cultures = migrerCultures(merged.cultures)
  merged.regimes = migrerRegimes(merged.regimes)
  merged.typesHabitation = migrerTypesHabitation(merged.typesHabitation)
  // arbres de progrès : migration de l'ancien format à plat du classeur
  merged.progres = migrerProgres(merged.progres)
  // fiches de faction : structure (victoire/bâtiment/âges) du référentiel
  //  + correctif Sylvains (Savoir ancestral ↔ Bibliothèque enfouie)
  merged.peuplesLibres = migrerFactions(merged.peuplesLibres, DEFAULT_CONFIG.peuplesLibres).map(migrerSwapSylvains)
  merged.peuplesAutres = migrerFactions(merged.peuplesAutres, DEFAULT_CONFIG.peuplesAutres)
  // constructions de faction (Église, Apiculture, Puit de mana…) :
  //  ajout des entrées du référentiel apparues depuis la sauvegarde
  merged.constructions = migrerConstructions(merged.constructions, DEFAULT_CONFIG.constructions)
  return {
    p: merged.params,
    ressources: merged.ressources,
    educations: merged.educations,
    titres: merged.titres,
    traits: migrateTraits(merged.traits),
    cultures: merged.cultures,
    regimes: merged.regimes,
    events: merged.events,
    dynasties: merged.dynasties,
    offrandes: merged.offrandes,
    orientations: merged.orientations,
    genres: merged.genres,
    banquesNoms: merged.banquesNoms,
    peupleBanque: merged.peupleBanque,
    peuples: merged.peuples,
    batiments: merged.batiments,
    config: merged,
  }
}

/** Deep-clone la config par défaut pour une nouvelle partie. */
export function cloneDefaultConfig(): GameConfig {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG))
}
