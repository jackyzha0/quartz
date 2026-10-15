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
/** Effet structuré d'une construction (retour Thibaut, marqueur (s)) :
 *  une CASE RESSOURCE + une CASE QUANTITÉ, plus de texte à analyser.
 *  · ressource de flux (Or, Nourriture…) → crédité à chaque fin de tour ;
 *  · quantité négative → consommation par tour ;
 *  · ete: true → production d'ÉTÉ uniquement (Champ, Rizière — canal
 *    « Nourr - été ») ;
 *  · Tourisme et Garnison sont des ressources INSTANTANÉES : jamais de
 *    flux par tour — Tourisme crédité UNE fois à la construction,
 *    Garnison = valeur d'état tant que le bâtiment tient. */
export interface EffetConstruction {
  ressource: string
  quantite: number
  ete?: boolean
}

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
  /** Effets STRUCTURÉS (marqueur (s)) — source du moteur quand présents ;
   *  sinon repli sur l'analyse du texte exact (anciennes configs). */
  effets?: EffetConstruction[]
}
/** Effet AUTOMATIQUE d'une technologie de progrès (paramétrable dans
 *  Référentiels → Progrès, champ « effets » de chaque tech) :
 *    gain               — crédit unique au déblocage (« recevez 20 Or »),
 *    prodCapitale       — +N ressource par tour (capitale du joueur),
 *    prodParHabitation  — +N ressource par tour et par habitation,
 *    prodParTitre       — +N ressource par tour et par habitant titré,
 *    prodParAmenagement — +N ressource par tour et par aménagement listé,
 *    garnison           — +N garnison statique (capitale ou habitations).
 *  AIDE DE JEU UNIQUEMENT (arbitrage Thibaut 2026-10-14) : AUCUN effet
 *  moteur — le résumé est affiché sous la tech, tout s'applique au
 *  plateau (bataille, coûts de construction, limites… inclus). */
export interface EffetProgres {
  type: 'gain' | 'prodCapitale' | 'prodParHabitation' | 'prodParTitre' | 'prodParAmenagement' | 'garnison'
  /** ressource concernée (tous les types sauf garnison) */
  ressource?: string
  /** valeur de l'effet (négative = malus) */
  montant: number
  /** titre des habitants concernés (prodParTitre) */
  titre?: string
  /** aménagements concernés (prodParAmenagement) */
  amenagements?: string[]
  /** cible de la garnison (garnison) */
  cible?: 'capitale' | 'habitations'
}

/** Une technologie d'un arbre de progrès : nom, coût (Science — DÉDUITE
 *  automatiquement du stock au déblocage), description de l'effet et
 *  effets chiffrés (AIDE DE JEU : résumé affiché, application au
 *  plateau uniquement). */
export interface ProgresTechDef {
  nom: string
  cout: string
  description: string
  /** Effets chiffrés (AIDE DE JEU — aucun effet moteur, application au
   *  plateau) ; champ optionnel : absent → aucun résumé affiché. */
  effets?: EffetProgres[]
}
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
  ministeres: {
    ministere: string
    effet: string
    /** Rang de pays minimum pour tenir le portefeuille (refonte
     *  2026-10-14) — avertissement non bloquant à la nomination.
     *  Champ optionnel : anciens formats → « Baronnie » (toujours
     *  disponible). */
    rangMinimum?: string
    /** « Auto » (appliqué par le moteur) ou « Plateau » (appliqué à
     *  la table). Champ optionnel : anciens formats → « Plateau ». */
    mode?: string
  }[]
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
  paysRangs: { nom: string; coutOr: number; coutNourriture: number; serments: number; ministres: number; bonus: string }[]
  tourismeSeuils: { seuil: number; bonus: string }[]
  dogmes: { dogme: string; bonusPontife: string; bonusFideles: string }[]
  citesLibres: { type: string; effet: string }[]
  regleCitesLibres: string
  victoires: {
    voie: string
    /** 4 niveaux par voie, renommés LAURIERS (refonte 2026-10-14 —
     *  plus de « Rang I-IV », déjà pris par les rangs de pays et
     *  d'habitation). Validation manuelle au radar de l'accueil,
     *  ordre strict ; crise à chaque Laurier I-III validé ; bonus
     *  one-shot si complété pendant l'âge de même numéro ; le
     *  Laurier IV = Victoire. */
    lauriers: { laurier: string; condition: string; bonus: string }[]
  }[]
  crises: string[]
  rappelsRegles: string[]
  /** Couleurs d'affichage (graphiques, pastilles, lignes de tableaux)
   *  — éditables dans Référentiels → Couleurs (retour Thibaut
   *  2026-10-14). Champ optionnel : les anciennes sauvegardes sont
   *  complétées par migrerCouleurs (défauts ci-dessous). */
  couleurs?: CouleursConfig
}

// ── Couleurs d'affichage (retour Thibaut 2026-10-14, marqueur (o)) ──────

/** Couleurs des graphiques : une par joueur (J1 = index 0) et une par
 *  ressource, + transparence des lignes de tableaux. Entièrement
 *  paramétrable dans Référentiels → Couleurs ; les anciennes
 *  sauvegardes sans ce champ retombent sur les défauts. */
export type CouleursConfig = {
  /** Couleur des joueurs dans les graphiques (J1..J8). */
  joueurs?: string[]
  /** Couleur par nom de ressource (y compris « Habitants », hors
   *  référentiel « ressources »). */
  ressources?: Record<string, string>
  /** Transparence (0–100 %) du fond des LIGNES de ressources des
   *  tableaux de la page Pays (récap, taxes, production des villes) :
   *  0 = couleur pleine, 100 = invisible. Défaut : 85. */
  transparenceLignes?: number
}

/** Palette des joueurs (demande de Thibaut 2026-10-14) : J1 rouge, J2
 *  bleu royal, J3 vert, J4 jaune, J5 violet, J6 orange, J7 turquoise,
 *  J8 rose. */
export const COULEURS_JOUEURS_DEFAUT: string[] = [
  '#C80000', // J1 rouge
  '#0131B4', // J2 bleu royal
  '#2CA02C', // J3 vert
  '#F5C518', // J4 jaune
  '#660099', // J5 violet
  '#F97316', // J6 orange
  '#40E0D0', // J7 turquoise
  '#EC4899', // J8 rose
]

/** Palette des ressources (demande de Thibaut 2026-10-14) : Bois
 *  marron, Bétail vert terne, Charbon gris foncé, Fer rouge, Science
 *  bleu clair, Pierre gris clair, Nourriture (et « Nourr - été »)
 *  vert, Soie rose-violet, Habitants vert foncé, Or jaune ; Tourisme
 *  et Garnison neutres (non spécifiés — paramétrables). */
export const COULEURS_RESSOURCES_DEFAUT: Record<string, string> = {
  'Bois': '#7B4B2A',
  'Bétail': '#8A9A5B',
  'Charbon': '#3A3A3A',
  'Fer': '#C80000',
  'Science': '#7EC8E3',
  'Pierre': '#BFC1C2',
  'Nourriture': '#2FA84F',
  'Nourr - été': '#2FA84F',
  'Soie': '#CC55AA',
  'Habitants': '#1B5E20',
  'Or': '#F5C518',
  'Tourisme': '#E8927C',
  'Garnison': '#4A6274',
}

/** Transparence par défaut du fond des lignes de ressources (85 % →
 *  teinte légère, lisible en thème clair comme sombre). */
export const TRANSPARENCE_LIGNES_DEFAUT = 85

/** Complète une config de couleurs partielle (ancienne sauvegarde) :
 *  joueurs complétés à 8 depuis les défauts, ressources fusionnées
 *  sur les défauts, « Nourr - été » suit toujours la Nourriture,
 *  transparence bornée 0–100. */
export function migrerCouleurs(c?: CouleursConfig): CouleursConfig {
  const joueurs = COULEURS_JOUEURS_DEFAUT.map((d, i) => c?.joueurs?.[i] || d)
  const ressources: Record<string, string> = {
    ...COULEURS_RESSOURCES_DEFAUT,
    ...(c?.ressources ?? {}),
  }
  ressources['Nourr - été'] = c?.ressources?.['Nourr - été'] ?? ressources['Nourriture']
  const t = typeof c?.transparenceLignes === 'number' && isFinite(c.transparenceLignes)
    ? Math.max(0, Math.min(100, c.transparenceLignes))
    : TRANSPARENCE_LIGNES_DEFAUT
  return { joueurs, ressources, transparenceLignes: t }
}

/** Couleur d'un joueur (n = 1..8) — palette de la partie si fournie,
 *  défauts sinon. */
export function couleurJoueur(n: number, C?: Cfg): string {
  const pal = C?.couleurs ?? DEFAULT_CONFIG.couleurs
  return pal.joueurs?.[n - 1] || COULEURS_JOUEURS_DEFAUT[(n - 1) % COULEURS_JOUEURS_DEFAUT.length]
}

/** Couleur d'une ressource (ou pseudo-ressource « Habitants ») —
 *  palette de la partie si fournie, gris neutre sinon. */
export function couleurRessource(nom: string, C?: Cfg): string {
  const pal = C?.couleurs ?? DEFAULT_CONFIG.couleurs
  return pal.ressources?.[nom] || '#9aa4ad'
}

/** Fond teinté d'une ressource pour les LIGNES de tableaux (page
 *  Pays : récap par tour, taxes des villageois, production des
 *  villes) : couleur de la ressource + transparence réglable
 *  (0 = couleur pleine, 100 = invisible). */
export function fondRessource(nom: string, C?: Cfg): string {
  const pal = C?.couleurs ?? DEFAULT_CONFIG.couleurs
  const t = typeof pal.transparenceLignes === 'number'
    ? Math.max(0, Math.min(100, pal.transparenceLignes))
    : TRANSPARENCE_LIGNES_DEFAUT
  return `color-mix(in srgb, ${couleurRessource(nom, C)} ${100 - t}%, transparent)`
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
  couleurs: {
    joueurs: [...COULEURS_JOUEURS_DEFAUT],
    ressources: { ...COULEURS_RESSOURCES_DEFAUT },
    transparenceLignes: TRANSPARENCE_LIGNES_DEFAUT,
  },
}

// Rangs de pays (feuille « Pays ») — échelle féodale UNIQUE (refonte 2026-10-14) :
//   montée par SACRE (coût Or/Nourriture + serments exigés : vassaux et cités
//   libres sous suzeraineté — 1/2/3/4), chaque rang agrandit le conseil
//   (nombre de Ministres autorisés). Le bonus de fin de saison reste à gérer
//   au plateau. Entièrement paramétrable dans Référentiels → « Pays & rangs ».
DEFAULT_CONFIG.paysRangs = [
  { nom: 'Baronnie', coutOr: 0, coutNourriture: 0, serments: 0, ministres: 1, bonus: 'Fin d\'été : +20 Nourriture.' },
  { nom: 'Comté', coutOr: 20, coutNourriture: 40, serments: 1, ministres: 2, bonus: 'Fin d\'été : +10 Or.' },
  { nom: 'Duché', coutOr: 30, coutNourriture: 60, serments: 2, ministres: 3, bonus: 'Fin d\'hiver : +6 Science.' },
  { nom: 'Royaume', coutOr: 50, coutNourriture: 100, serments: 3, ministres: 4, bonus: 'Fin d\'été : 6 ressources de base au choix.' },
  { nom: 'Empire', coutOr: 100, coutNourriture: 200, serments: 4, ministres: 5, bonus: 'Fin d\'hiver : volez 5 Sciences à chaque joueur de rang inférieur.' },
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
  couleurs: CouleursConfig
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

// Rangs de pays : migration de l'ancienne table à blocs Féodal/Républicain
// (champs bloc/cout/succession en texte libre) vers l'échelle féodale
// unique (champs coutOr/coutNourriture/serments/ministres). Les parties
// sauvegardées avec l'ancien format repassent sur la table par défaut.
function migrerPaysRangs(rangs: GameConfig['paysRangs']): GameConfig['paysRangs'] {
  if (!Array.isArray(rangs) || rangs.length === 0) return DEFAULT_CONFIG.paysRangs
  const r0 = rangs[0] as Record<string, unknown>
  if (typeof r0.coutOr !== 'number' || typeof r0.serments !== 'number' || typeof r0.ministres !== 'number') {
    return DEFAULT_CONFIG.paysRangs
  }
  return rangs
}

// Voies de victoire (feuille « Référentiel », table victoires) : migration
// des anciens formats (refonte 2026-10-14) — « Rang I-IV » devient
// « Laurier I-IV » ; les vieilles sauvegardes avec `rangs` repassent
// automatiquement sur `lauriers` (textes du classeur conservés).
function migrerVictoires(list: GameConfig['victoires']): GameConfig['victoires'] {
  const convert = (m: any) => ({
    voie: m.voie ?? '',
    lauriers: (m.lauriers ?? m.rangs ?? []).map((r: any) => ({
      laurier: r.laurier ?? r.rang ?? '',
      condition: r.condition ?? '',
      bonus: r.bonus ?? '',
    })),
  })
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_CONFIG.victoires
  return list.map(convert)
}

// Ministères (feuille « Référentiel », table ministeres) : migration des
// anciens formats sans rangMinimum/mode (refonte 2026-10-14) — les
// portefeuilles d'origine restent intacts, seuls les champs manquants
// sont complétés par leurs valeurs par défaut.
// Marqueur (v) 2026-10-15 : les 7 portefeuilles « du classeur » prennent
// des noms d'offices de cour (comme les 16 autres). Les configurations
// sauvegardées portent encore les anciens noms → renommage ci-dessous,
// puis fusion avec les 23 défauts du référentiel : les portefeuilles
// manquants d'une vieille config (ex. les 16 offices de cour arrivés au
// marqueur (h)) sont réintégrés ; les personnalisations de même nom
// sont conservées ; les entrées perso hors référentiel restent en queue.
export const RENOMMAGES_MINISTERES: Record<string, string> = {
  Colonial: 'Grand bailli',
  Culture: 'Maître des arts',
  'Défense': 'Grand prévôt',
  Ecologie: 'Grand veneur',
  Economie: 'Surintendant des finances',
  Guerre: 'Grand écuyer',
  Recherche: 'Grand bibliothécaire',
}

function migrerMinisteres(list: GameConfig['ministeres']): GameConfig['ministeres'] {
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_CONFIG.ministeres
  // (a) renommage des anciens noms du classeur
  const rentrees = list.map((m) => ({
    ...m,
    ministere: RENOMMAGES_MINISTERES[m.ministere] ?? m.ministere,
  }))
  // (b) fusion avec les défauts du référentiel : chaque portefeuille
  // connu prend sa place par défaut (entrée utilisateur conservée si
  // elle existe), les portefeuilles manquants sont réintégrés.
  const parNom = new Map(rentrees.map((m) => [m.ministere, m]))
  const defauts = DEFAULT_CONFIG.ministeres.map((d) => {
    const u = parNom.get(d.ministere)
    if (!u) return d
    const f = { ...d, ...u }
    return {
      ...f,
      rangMinimum: f.rangMinimum ?? 'Baronnie',
      mode: f.mode ?? 'Plateau',
    } as typeof d
  })
  // (c) entrées personnalisées hors référentiel : conservées à la suite.
  const connus = new Set(DEFAULT_CONFIG.ministeres.map((d) => d.ministere))
  const persos = rentrees
    .filter((m) => !connus.has(m.ministere))
    .map((m) => ({
      ...m,
      rangMinimum: m.rangMinimum ?? 'Baronnie',
      mode: m.mode ?? 'Plateau',
    }))
  return [...defauts, ...persos]
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
  // rangs de pays : échelle féodale unique (refonte 2026-10-14)
  merged.paysRangs = migrerPaysRangs(merged.paysRangs)
  // ministères : complétion rangMinimum/mode (refonte 2026-10-14)
  merged.ministeres = migrerMinisteres(merged.ministeres)
  // couleurs d'affichage : complétion depuis les défauts (marqueur (o))
  merged.couleurs = migrerCouleurs(c.couleurs)
  // voies de victoire : rangs → lauriers (refonte 2026-10-14)
  merged.victoires = migrerVictoires(merged.victoires)
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
    couleurs: merged.couleurs,
    config: merged,
  }
}

/** Deep-clone la config par défaut pour une nouvelle partie. */
export function cloneDefaultConfig(): GameConfig {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG))
}
