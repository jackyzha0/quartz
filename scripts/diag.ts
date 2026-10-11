// ══════════════════════════════════════════════════════════════════════
//  DIAGNOSTIQUE MOTEUR (CI uniquement — n'est pas importé par le jeu).
//  Bundle des modules du moteur + reproduction des bugs signalés +
//  scénarios de dégradation : chaque résultat est publié dans l'issue
//  « Diagnostic moteur » par le workflow diag.yaml.
// ══════════════════════════════════════════════════════════════════════
import { readFileSync } from 'node:fs'
const refJson = JSON.parse(readFileSync(new URL('../src/config/referentiels.json', import.meta.url), 'utf8'))

// ══ src/config/params.ts ══
// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Paramètres du moteur
//  Toutes les constantes et valeurs numériques des formules sont ici.
//  Elles sont modifiables à tout moment depuis l'onglet « Paramètres »
//  (n'importe qui peut les changer, aucune contrainte bloquante : les
//  valeurs restent des nombres libres, les stocks peuvent être négatifs).
// ══════════════════════════════════════════════════════════════════════

export interface GameParams {
  // ── Population ──
  adultAge: number
  setupAgeMax: number
  ageMaxBase: number
  ageMaxAla: number
  adulteryRate: number
  migrationProba: number
  consoNourrParHab: number
  gainsCrediteStock: number  // 1 = les gains de population créditent le stock
  // ── Fécondité ──
  fertBaseRate: number
  fertSingleFactor: number
  fertTwinsRate: number
  fertTripletsRate: number
  fertTraitFactorMin: number
  fertTraitFactorMax: number
  cultureFertBase: number
  // ── Maladie ──
  probaMaladie: number
  modMaladieAge: number
  modMaladieEnceinte: number
  probaGuerison: number
  modGuerisonAge: number
  // ── Éducation ──
  chanceEducRoturier: number
  chanceEducNoble: number
  professeurBaseChance: number
  profBonusEduc: number
  // ── Mariage ──
  mariageRoturiers: number
  mariageNobles: number
  mariageMesalliance: number
  mariageBonusTitre: number
  mariageMemeCulture: number
  mariageAutreCulture: number
  mariageParAnEcart: number
  mariageTraitMax: number
  mariagePlafond: number
  mariagePlancher: number
  mariageBatard: number
  mariageDeuxBatards: number
  // ── Héritage des traits ──
  traitHeriteParEssai: number
  traitHeriteEssais: number
  traitTirageSlot: number
  // ── Conversion culturelle ──
  conversionProba: number
  conversionPoidsLocal: number
  conversionMemeCulture: number
  // ── Taxes ──
  taxOrFaibles: number
  taxOrHautes: number
  taxNaissFaibles: number
  taxNaissHautes: number
  // ── Armées ──
  puissanceGeneral: number
  puissanceSoldat: number
  soldatAgeMin: number
  soldatAgeMax: number
  // ── Vassaux ──
  vassalPrelevement: number  // part des revenus d'habitants (Or) reversée au suzerain
  // ── Noms des entités système (chaînes) ──
  titreDirigeant: string
  titreGouverneur: string
  titreProfesseur: string
  titreChasseur: string
  titreSoldat: string
  titreCommandant: string
  traitBatard: string
  traitConsanguin: string
  traitObstine: string
  dynastieRoturier: string
  // ── Système ──
  maxLog: number
  saisonLongueur: number
  // ── Effets chiffrés des événements (multiplicateurs par niveau) ──
  evMultFaible: number
  evMultMoyenne: number
  evMultForte: number
  evMultExtreme: number
  dangerSeuilForte: number
  dangerSeuilExtreme: number
}

export const DEFAULT_PARAMS: GameParams = {
  adultAge: 16,
  setupAgeMax: 50,
  ageMaxBase: 40,
  ageMaxAla: 39,
  adulteryRate: 0.03,
  migrationProba: 0.1,
  consoNourrParHab: 1,
  gainsCrediteStock: 1,
  fertBaseRate: 1.5,
  fertSingleFactor: 0.1,
  fertTwinsRate: 0.05,
  fertTripletsRate: 0.001,
  fertTraitFactorMin: 0,
  fertTraitFactorMax: 1.6,
  cultureFertBase: 1,
  probaMaladie: 0.0005,
  modMaladieAge: 0.0001,
  modMaladieEnceinte: 0.03,
  probaGuerison: 0.25,
  modGuerisonAge: 0.003,
  chanceEducRoturier: 0.08,
  chanceEducNoble: 0.15,
  professeurBaseChance: 0.9,
  profBonusEduc: 0.1,
  mariageRoturiers: 0.3,
  mariageNobles: 0.15,
  mariageMesalliance: 0.03,
  mariageBonusTitre: 0.1,
  mariageMemeCulture: 0.1,
  mariageAutreCulture: -0.1,
  mariageParAnEcart: 0.005,
  mariageTraitMax: 0.2,
  mariagePlafond: 0.9,
  mariagePlancher: 0.01,
  mariageBatard: -0.05,
  mariageDeuxBatards: 0.1,
  traitHeriteParEssai: 0.4,
  traitHeriteEssais: 3,
  traitTirageSlot: 0.3,
  conversionProba: 0.1,
  conversionPoidsLocal: 5,
  conversionMemeCulture: 5,
  taxOrFaibles: 0.5,
  taxOrHautes: 1.5,
  taxNaissFaibles: 1.5,
  taxNaissHautes: 0.5,
  puissanceGeneral: 45,
  puissanceSoldat: 15,
  soldatAgeMin: 16,
  soldatAgeMax: 30,
  vassalPrelevement: 0.5,
  titreDirigeant: 'Dirigeant',
  titreGouverneur: 'Gouverneur',
  titreProfesseur: 'Professeur',
  titreChasseur: 'Chasseur',
  titreSoldat: 'Soldat',
  titreCommandant: 'Commandant',
  traitBatard: 'Bâtard',
  traitConsanguin: 'Consanguin',
  traitObstine: 'Obstiné',
  dynastieRoturier: 'Roturier',
  maxLog: 4000,
  saisonLongueur: 3,
  evMultFaible: 1,
  evMultMoyenne: 2,
  evMultForte: 3,
  evMultExtreme: 5,
  dangerSeuilForte: 9,
  dangerSeuilExtreme: 11,
}

// champs texte (éditables aussi) — gérés sépartement pour l'UI
export interface GameParamStrings {
  titreHeritierStr: string
}
export const DEFAULT_PARAM_STRINGS: GameParamStrings = {
  titreHeritierStr: 'Héritier',
}

/** Groupes + libellés pour l'éditeur de l'onglet Paramètres. */
export const PARAM_META: {
  key: keyof GameParams
  label: string
  groupe: string
  unite?: string
  aide?: string
}[] = [
  { key: 'adultAge', label: 'Âge adulte', groupe: 'Population', aide: 'Âge à partir duquel un personnage reçoit un titre et peut se marier.' },
  { key: 'ageMaxBase', label: 'Espérance de vie de base', groupe: 'Population', aide: 'AgeMax = base + aléa(0..ageMaxAla) + modificateurs de traits.' },
  { key: 'ageMaxAla', label: 'Espérance de vie — aléa maximal', groupe: 'Population' },
  { key: 'adulteryRate', label: 'Taux d\'adultère', groupe: 'Population', unite: 'proba' },
  { key: 'migrationProba', label: 'Probabilité de migration des enfants', groupe: 'Population', unite: 'proba' },
  { key: 'consoNourrParHab', label: 'Consommation Nourriture / habitant vivant', groupe: 'Population' },
  { key: 'gainsCrediteStock', label: 'Gains de population crédités au stock (1 = oui)', groupe: 'Population' },
  { key: 'fertBaseRate', label: 'Fécondité de base (conception / tour)', groupe: 'Fécondité' },
  { key: 'fertSingleFactor', label: 'Facteur fécondité célibataire', groupe: 'Fécondité' },
  { key: 'fertTwinsRate', label: 'Proba jumeaux', groupe: 'Fécondité', unite: 'proba' },
  { key: 'fertTripletsRate', label: 'Proba triplés', groupe: 'Fécondité', unite: 'proba' },
  { key: 'fertTraitFactorMin', label: 'Facteur traits — plancher', groupe: 'Fécondité' },
  { key: 'fertTraitFactorMax', label: 'Facteur traits — plafond', groupe: 'Fécondité' },
  { key: 'cultureFertBase', label: 'Facteur fécondité culturel de base', groupe: 'Fécondité' },
  { key: 'probaMaladie', label: 'Probabilité de maladie (base)', groupe: 'Maladie', unite: 'proba' },
  { key: 'modMaladieAge', label: 'Maladie — modificateur par année d\'âge', groupe: 'Maladie' },
  { key: 'modMaladieEnceinte', label: 'Maladie — modificateur femme enceinte', groupe: 'Maladie' },
  { key: 'probaGuerison', label: 'Probabilité de guérison (base)', groupe: 'Maladie', unite: 'proba' },
  { key: 'modGuerisonAge', label: 'Guérison — modificateur par année d\'âge', groupe: 'Maladie' },
  { key: 'chanceEducRoturier', label: 'Chance d\'éducation — roturier', groupe: 'Éducation', unite: 'proba' },
  { key: 'chanceEducNoble', label: 'Chance d\'éducation — noble', groupe: 'Éducation', unite: 'proba' },
  { key: 'professeurBaseChance', label: 'Chance de base d\'attribution Professeur', groupe: 'Éducation' },
  { key: 'profBonusEduc', label: 'Bonus d\'éducation par professeur supplémentaire', groupe: 'Éducation' },
  { key: 'mariageRoturiers', label: 'Proba mariage roturier × roturier', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageNobles', label: 'Proba mariage noble × noble', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageMesalliance', label: 'Proba mésalliance noble × roturier', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageBonusTitre', label: 'Bonus par époux titré (non-Chasseur)', groupe: 'Mariage' },
  { key: 'mariageMemeCulture', label: 'Bonus même culture', groupe: 'Mariage' },
  { key: 'mariageAutreCulture', label: 'Malus culture différente', groupe: 'Mariage' },
  { key: 'mariageParAnEcart', label: 'Malus par année d\'écart d\'âge', groupe: 'Mariage' },
  { key: 'mariageTraitMax', label: 'Plafond des modificateurs de traits', groupe: 'Mariage' },
  { key: 'mariagePlafond', label: 'Probabilité maximale', groupe: 'Mariage' },
  { key: 'mariagePlancher', label: 'Probabilité minimale', groupe: 'Mariage' },
  { key: 'mariageBatard', label: 'Malus mariage par époux bâtard', groupe: 'Mariage' },
  { key: 'mariageDeuxBatards', label: 'Bonus si les deux époux sont bâtards', groupe: 'Mariage' },
  { key: 'setupAgeMax', label: 'Âge maximal d\'un personnage généré au setup', groupe: 'Population' },
  { key: 'traitHeriteParEssai', label: 'Proba d\'hériter d\'un trait parental (par essai)', groupe: 'Traits' },
  { key: 'traitHeriteEssais', label: 'Nombre d\'essais d\'héritage par trait', groupe: 'Traits' },
  { key: 'traitTirageSlot', label: 'Proba de tirage aléatoire par slot libre', groupe: 'Traits' },
  { key: 'conversionProba', label: 'Proba de tentative de conversion culturelle', groupe: 'Culture', unite: 'proba' },
  { key: 'conversionPoidsLocal', label: 'Poids des voisins de même culture', groupe: 'Culture' },
  { key: 'conversionMemeCulture', label: 'Poids de sa propre culture', groupe: 'Culture' },
  { key: 'taxOrFaibles', label: 'Taxes faibles — multiplicateur Or', groupe: 'Taxes' },
  { key: 'taxOrHautes', label: 'Taxes fortes — multiplicateur Or', groupe: 'Taxes' },
  { key: 'taxNaissFaibles', label: 'Taxes faibles — multiplicateur naissances', groupe: 'Taxes' },
  { key: 'taxNaissHautes', label: 'Taxes fortes — multiplicateur naissances', groupe: 'Taxes' },
  { key: 'puissanceGeneral', label: 'Puissance d\'un commandant', groupe: 'Armées' },
  { key: 'puissanceSoldat', label: 'Puissance d\'un soldat', groupe: 'Armées' },
  { key: 'soldatAgeMin', label: 'Âge minimal de recrutement', groupe: 'Armées' },
  { key: 'soldatAgeMax', label: 'Âge maximal de recrutement', groupe: 'Armées' },
  { key: 'vassalPrelevement', label: "Part des revenus d'habitants reversée au suzerain", groupe: 'Vassaux', unite: 'proportion', aide: "Un vassal prête serment à un autre joueur : à chaque fin de tour, il reverse cette part des gains d'Or de ses habitants à son suzerain (0,5 = 50 %)." },
  { key: 'maxLog', label: 'Taille maximale du journal', groupe: 'Système' },
  { key: 'saisonLongueur', label: 'Durée d\'une saison (tours)', groupe: 'Système', aide: 'Un tour = 2 ans de temps de jeu ; Été/Hiver alternent toutes les N saisons… modifiable à volonté.' },
  { key: 'evMultFaible', label: 'Multiplicateur événement — faible (dé 1-5)', groupe: 'Événements' },
  { key: 'evMultMoyenne', label: 'Multiplicateur événement — moyenne (6-8)', groupe: 'Événements' },
  { key: 'evMultForte', label: 'Multiplicateur événement — forte (9-10)', groupe: 'Événements' },
  { key: 'evMultExtreme', label: 'Multiplicateur événement — extrême (11+)', groupe: 'Événements' },
  { key: 'dangerSeuilForte', label: 'Seuil de dangerosité — effet fort', groupe: 'Événements' },
  { key: 'dangerSeuilExtreme', label: 'Seuil de dangerosité — effet extrême', groupe: 'Événements' },
]

export const PARAM_STRINGS_META: { key: keyof GameParamStrings; label: string; groupe: string }[] = [
  { key: 'titreHeritierStr', label: 'Nom du titre Héritier', groupe: 'Noms système' },
]

/** Fusionne les paramètres d'une partie avec les défauts (tolérant aux clés manquantes). */
export function mergeParams(custom: Record<string, unknown> | undefined): GameParams & GameParamStrings {
  const out: Record<string, unknown> = { ...DEFAULT_PARAMS, ...DEFAULT_PARAM_STRINGS }
  if (custom && typeof custom === 'object') {
    for (const [k, v] of Object.entries(custom)) {
      if (v !== undefined && v !== null && v !== '') out[k] = v
    }
  }
  return out as GameParams & GameParamStrings
}


// ══ src/config/defaultConfig.ts ══
// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Configuration par défaut
//  Toutes les données de référence du classeur Excel (feuilles init,
//  JSON, Titres, traits_genetiques, Culture, Peuples, Ville, Bat,
//  Progrès, Tourisme, Cités L, BDD_pop, Accueil) + paramètres moteur.
//  Tout est stocké DANS la partie (state.config) et modifiable à chaud
//  depuis l'onglet « Paramètres » — aucun redémarrage nécessaire.
// ══════════════════════════════════════════════════════════════════════


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
}
export interface RegimeDef { nom: string; loi: string }
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
export interface MaladieDef {
  nom: string
  poids: number
  sexuellementTransmissible: boolean
  hereditaire: boolean
  description: string
}
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
export interface PeupleRef {
  nom: string
  description: string
  lignes: { label: string; texte: string }[]
}
export interface FicheLigne { label: string; texte: string }
export interface BatimentRef { categorie: string; nom: string; cout: string; effet: string }
export interface AmenagementRef { amenagement: string; type: string; rang: string; effet: string }
export interface ProgresArbre { arbre: string; entrees: { texte: string; prerequis: string }[] }

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
  maladies: MaladieDef[]
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
  rangsHabitation: { rang: string; cout: string; effet: string }[]
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
    homoAutorisee: false,
    fertFactor: 1,
    reglePays: c.reglePays || '',
    reglePerso: c.reglePerso || '',
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
  maladies: ref.maladies,
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
  rangsHabitation: ref.rangsHabitation,
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
  maladies: MaladieDef[]
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

export function cfgOf(config: GameConfig | undefined): Cfg {
  const c = config ?? DEFAULT_CONFIG
  const merged: GameConfig = {
    ...DEFAULT_CONFIG,
    ...c,
    params: mergeParams(c.params as unknown as Record<string, unknown>),
  }
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
    maladies: merged.maladies,
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


// ══ src/engine/types.ts ══
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


// ══ src/engine/rng.ts ══
// ══════════════════════════════════════════════════════════════════════
//  Générateur pseudo-aléatoire déterministe (mulberry32)
//  Remplace Rnd() du VBA : la graine est stockée dans GameState.rngState,
//  ce qui rend chaque partie reproductible et rejouable.
// ══════════════════════════════════════════════════════════════════════

export interface Rng {
  next(): number            // [0, 1)
  int(min: number, max: number): number   // entier inclusif [min, max]
  die(n: number): number                  // 1dN
  chance(p: number): boolean              // tirage < p
  pick<T>(arr: T[]): T
  pickWeighted<T>(items: T[], weight: (t: T) => number): T
  shuffle<T>(arr: T[]): T[]
  state(): number
}

export function makeRng(seed: number): Rng {
  let s = seed >>> 0
  function next(): number {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    die: (n) => 1 + Math.floor(next() * n),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    pickWeighted: (items, weight) => {
      const total = items.reduce((s2, it) => s2 + Math.max(0, weight(it)), 0)
      if (total <= 0) return items[Math.floor(next() * items.length)]
      let r = next() * total
      for (const it of items) {
        r -= Math.max(0, weight(it))
        if (r <= 0) return it
      }
      return items[items.length - 1]
    },
    shuffle: (arr) => {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    state: () => s,
  }
}

export function newSeed(): number {
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
}


// ══ src/engine/gameData.ts ══
// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Accès aux référentiels
//  Les données vivent dans state.config (onglet « Paramètres ») ;
//  les helpers ci-dessous acceptent une config optionnelle et
//  retombent sur les valeurs par défaut sinon.
// ══════════════════════════════════════════════════════════════════════



export const RESOURCES: string[] = DEFAULT_CONFIG.ressources
export const TITRES: TitreDef[] = DEFAULT_CONFIG.titres
export const TRAITS: TraitDef[] = DEFAULT_CONFIG.traits
export const CULTURES: CultureDef[] = DEFAULT_CONFIG.cultures
export const REGIMES = DEFAULT_CONFIG.regimes
export const ORIENTATIONS = DEFAULT_CONFIG.orientations
export const GENRES = DEFAULT_CONFIG.genres
export const MALADIES = DEFAULT_CONFIG.maladies
export const EDUCATIONS = DEFAULT_CONFIG.educations
export const BANQUES = DEFAULT_CONFIG.banquesNoms

// Peuples (référence : nom + banque de noms associée)
export interface PeupleDef {
  nom: string
  noms: string[]
  prenomsM: string[]
  prenomsF: string[]
}
export const PEUPLES: PeupleDef[] = DEFAULT_CONFIG.peuples.map((nom) => {
  const b = DEFAULT_CONFIG.banquesNoms[DEFAULT_CONFIG.peupleBanque[nom] ?? 0] ?? DEFAULT_CONFIG.banquesNoms[0]
  return { nom, noms: b.noms, prenomsM: b.prenomsM, prenomsF: b.prenomsF }
})

export function titreDef(titre: string, cfg?: GameConfig): TitreDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).titres.find((t) => t.titre === titre)
}
export function traitDef(name: string, cfg?: GameConfig): TraitDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).traits.find((t) => t.name === name)
}
export function cultureDef(nom: string, cfg?: GameConfig): CultureDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).cultures.find((c) => c.nom === nom)
}
export function peupleDef(nom: string, cfg?: GameConfig): PeupleDef | undefined {
  const c = cfg ?? DEFAULT_CONFIG
  const b = c.banquesNoms[c.peupleBanque[nom] ?? 0] ?? c.banquesNoms[0]
  if (!b) return undefined
  return { nom, noms: b.noms, prenomsM: b.prenomsM, prenomsF: b.prenomsF }
}
export function ressourcesOf(cfg?: GameConfig): string[] {
  return (cfg ?? DEFAULT_CONFIG).ressources
}


// ══ src/engine/gameData2.ts ══
// ══════════════════════════════════════════════════════════════════════
//  Bâtiments, événements, cartes dynastie — accès via la config.
// ══════════════════════════════════════════════════════════════════════



export const BUILDINGS: BuildingDef[] = DEFAULT_CONFIG.batiments
export const EVENTS: EventDef[] = DEFAULT_CONFIG.events
export const DYNASTIES: DynastieDef[] = DEFAULT_CONFIG.dynasties

export function buildingDef(nom: string, cfg?: GameConfig): BuildingDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).batiments.find((b) => b.nom === nom)
}

/** Rang d'école le plus élevé d'une ville (0 = aucune école). */
export function schoolRankOf(batiments: string[], cfg?: GameConfig): number {
  let rank = 0
  for (const b of batiments) {
    const def = buildingDef(b, cfg)
    if (def && def.ecoleRang > rank) rank = def.ecoleRang
  }
  return rank
}

// Conditions de victoire (texte de référence, chapitre XII du livret)
export const VICTORY_TEXT: { nom: string; texte: string }[] = [
  { nom: 'Militaire', texte: 'Capturer un total de 5 habitations (rang IV de la voie Militaire).' },
  { nom: 'Économique', texte: 'Posséder 5 Guildes (rang IV de la voie Économique).' },
  { nom: 'Culturelle', texte: 'Posséder 360 Tourisme et 5 Merveilles (rang IV de la voie Culturelle).' },
  { nom: 'Scientifique', texte: 'Terminer le Progrès Futur (rang IV de la voie Scientifique).' },
  { nom: 'Démographique', texte: 'Posséder une population totale de 1500 habitants (rang IV de la voie Démographique).' },
  { nom: 'Diplomatique', texte: 'Être suzerain de 3 cités libres (rang IV de la voie Diplomatique).' },
]


// ══ src/engine/shared.ts ══
// ══════════════════════════════════════════════════════════════════════
//  OUTILS TRANSVERSAUX DU MOTEUR
//  Identifiants, noms, dynasties nobles, récapitulatifs.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ── Utilitaires ─────────────────────────────────────────────────────────
let idCounter = 0
export function newId(rng: Rng): string {
  return `c${Date.now().toString(36)}${(idCounter++).toString(36)}${rng.int(100, 999)}`
}

export function isNobleDyn(dyn: string, C: Cfg = cfgOf()): boolean {
  const d = dyn.trim()
  return d !== '' && d !== C.p.dynastieRoturier
}

export function fullName(c: Character): string {
  return `${c.prenom} ${c.nom}`
}

export function emptyRecap(): PlayerRecap {
  return {
    conceptions: {}, naissances: {}, deces: {}, decesMaladie: 0,
    mariagesNobles: {}, conversions: {}, titresAttribues: {}, crises: [],
    commandantTombe: null,
  }
}

export function bump(dict: Record<string, number>, key: string, n = 1) {
  if (!key) key = '(inconnu)'
  dict[key] = (dict[key] ?? 0) + n
}


// ══ src/engine/saisons.ts ══
// ══════════════════════════════════════════════════════════════════════
//  SAISONS, ÉVÉNEMENTS ET CARTES DYNASTIE (FinDeTour, étapes 1-2)
//  Sélection de la saison, effets chiffrés des événements et des cartes dynastie.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


export function saisonForTurn(turn: number, C: Cfg = cfgOf()): 'Été' | 'Hiver' {
  return Math.floor(turn / Math.max(1, C.p.saisonLongueur)) % 2 === 0 ? 'Été' : 'Hiver'
}

/**
 * Effets chiffrés des événements du classeur : la table eventEffets de la
 * config donne, pour chaque événement, un effet de base par ressource,
 * multiplié par le coefficient de niveau (params evMult*) ; Peste ajoute
 * un risque de maladie, Sombres présages augmente modDanger.
 * Tout est modifiable à chaud dans l'onglet « Paramètres ».
 */
export function applyEventEffect(state: GameState, nom: string, level: 'faible' | 'moyenne' | 'forte' | 'extreme') {
  const C = cfgOf(state.config)
  const mult =
    level === 'faible' ? C.p.evMultFaible
    : level === 'moyenne' ? C.p.evMultMoyenne
    : level === 'forte' ? C.p.evMultForte
    : C.p.evMultExtreme
  const def = C.config.eventEffets.find((e) => e.nom === nom)
  if (!def) return
  if (def.modDanger) state.modDanger += def.modDanger
  for (const eff of def.effets) {
    const v = eff.base * mult
    for (const p of state.players) {
      const rs = p.resources[eff.ressource]
      if (rs) rs.stock += v
    }
  }
  if (def.maladieRisque > 0) {
    const risk = def.maladieRisque * mult
    const rng = makeRng(state.rngState)
    for (const p of state.players) {
      for (const c of state.population[p.n] ?? []) {
        if (c.statut === 'Sain' && c.statut !== 'Décédé' && rng.chance(risk)) {
          c.statut = 'Malade'
        }
      }
    }
    state.rngState = rng.state()
  }
}

/**
 * Effets chiffrés des cartes dynastie du classeur : table dynastieEffets de
 * la config ('(aléatoire)' = une ressource de base tirée au sort ;
 * guerison = guérit un personnage malade). Les cartes « à option » du
 * classeur (dépenser X pour gagner Y) ne dépensent rien automatiquement :
 * leur texte reste affiché dans le journal, le joueur applique son choix
 * en éditant ses stocks — aucune contrainte bloquante.
 */
export function applyDynastieCard(state: GameState, p: Player, nom: string, rng: Rng) {
  const C = cfgOf(state.config)
  const def = C.config.dynastieEffets.find((e) => e.nom === nom)
  if (!def) return
  const baseRessources = C.ressources.slice(0, 7)
  if (def.guerison) {
    const pop = state.population[p.n] ?? []
    const malades = pop.filter((c) => c.statut === 'Malade' && c.statut !== 'Décédé')
    if (malades.length > 0) {
      const elu = rng.pick(malades)
      elu.statut = 'Sain'
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: p.n,
        texte: `Miracle : ${fullName(elu)} est guéri(e).`,
      })
    }
  }
  for (const eff of def.effets) {
    const res = eff.ressource === '(aléatoire)' ? rng.pick(baseRessources) : eff.ressource
    const rs = p.resources[res]
    if (rs) rs.stock += eff.base
  }
}


// ══ src/engine/economie.ts ══
// ══════════════════════════════════════════════════════════════════════
//  ÉCONOMIE — GAINS DE POPULATION (CalculerGainsPopulation)
//  Revenus par ville (titres, taxes, consommation) et facteur de taxes sur les naissances.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Titres → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par les
//  taxes de la ville, puis consommation de 1 Nourriture par habitant vivant.
// ══════════════════════════════════════════════════════════════════════

export function calculerGainsPopulation(state: GameState, p: Player, rng: Rng): Record<string, number> {
  const C = cfgOf(state.config)
  const totals: Record<string, number> = {}
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const cityGains: Record<string, number> = {}
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    for (const c of vivants) {
      if (!c.titre) continue
      const td = titreDef(c.titre, C.config)
      if (!td) continue
      if (td.ressource1 && td.valeur1 !== 0) {
        cityGains[td.ressource1] = (cityGains[td.ressource1] ?? 0) + td.valeur1
      }
      if (td.ressource2 && td.valeur2 !== 0) {
        cityGains[td.ressource2] = (cityGains[td.ressource2] ?? 0) + td.valeur2
      }
    }
    // Taxes : Faible → Or ×0,5 / Forte → Or ×1,5 (l'inverse pour la Nourriture)
    const taxOr = ville.taxes === 'Faible' ? C.p.taxOrFaibles : ville.taxes === 'Forte' ? C.p.taxOrHautes : 1
    const taxNourr = ville.taxes === 'Faible' ? C.p.taxOrHautes : ville.taxes === 'Forte' ? C.p.taxOrFaibles : 1
    if (cityGains['Or']) cityGains['Or'] *= taxOr
    if (cityGains['Nourriture']) cityGains['Nourriture'] *= taxNourr
    // Consommation (non taxée, appliquée après)
    cityGains['Nourriture'] = (cityGains['Nourriture'] ?? 0) - C.p.consoNourrParHab * vivants.length
    for (const [res, v] of Object.entries(cityGains)) {
      totals[res] = (totals[res] ?? 0) + v
    }
  }
  return totals
}

/** Facteur de taxes sur la conception (Faible ×1,5 / Moyenne ×1 / Forte ×0,5). */
export function taxBirthFactor(ville: City | undefined, C: Cfg = cfgOf()): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? C.p.taxNaissFaibles : ville.taxes === 'Forte' ? C.p.taxNaissHautes : 1
}


// ══ src/engine/vassalite.ts ══
// ══════════════════════════════════════════════════════════════════════
//  VASSALITÉ — TRIBUT ENTRE JOUEURS (étape 3bis de FinDeTour)
//  Un vassal reverse une part des revenus d'habitants de sa ville à son suzerain.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


//  Chaque vassal reverse une part des revenus de ses habitants (gains
//  d'Or, après taxes) à son suzerain. Les chaînes A→B→C fonctionnent :
//  chacun ne reverse que SES propres revenus, jamais l'argent reçu de ses
//  propres vassaux.
export function transfererTributVassal(
  state: GameState,
  gainsParJoueur: Record<number, Record<string, number>>,
  C: Cfg,
): void {
  for (const p of state.players) {
    if (p.vassalDe == null) continue
    const suzerain = state.players.find((x) => x.n === p.vassalDe)
    if (!suzerain || suzerain.vassalDe === p.n) continue // suzerain disparu ou serment croisé
    const gains = gainsParJoueur[p.n] ?? {}
    const part = (gains['Or'] ?? 0) * C.p.vassalPrelevement
    if (part === 0) continue
    gains['Or'] = (gains['Or'] ?? 0) - part
    const gainsSuz = gainsParJoueur[suzerain.n] ?? (gainsParJoueur[suzerain.n] = {})
    gainsSuz['Or'] = (gainsSuz['Or'] ?? 0) + part
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `🤝 Vassalité — ${p.nom} verse ${Math.round(part * 10) / 10} Or à ${suzerain.nom} (tribut de vassalité : ${Math.round(C.p.vassalPrelevement * 100)} % des revenus de ses habitants).`,
    })
  }
}


// ══ src/engine/titres.ts ══
// ══════════════════════════════════════════════════════════════════════
//  TITRES, PROFESSEURS, MARIAGES ET ÉDUCATION
//  Professeurs, mariages, éducation des mineurs, titres automatiques et règles d'attribution.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ── Professeurs ─────────────────────────────────────────────────────────

export function maybeAssignProfesseurs(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const rank = schoolRankOf(ville.batiments, C.config)
    if (rank <= 0) continue
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    let nbProfs = vivants.filter((c) => c.titre === C.p.titreProfesseur).length
    if (nbProfs >= rank) continue
    // chance = professeurBaseChance / ln(profs + 2,72)
    const chance = C.p.professeurBaseChance / Math.log(nbProfs + 2.72)
    if (!rng.chance(chance)) continue
    // VBA : pas de Professeur « Obstiné » (TRAIT_NO_EDUC)
    const candidats = vivants.filter((c) => c.age >= C.p.adultAge && !c.titre && !c.traits.includes(C.p.traitObstine))
    if (candidats.length === 0) continue
    const elu = rng.pick(candidats)
    elu.titre = C.p.titreProfesseur
    if (!elu.education) elu.education = rng.pick(C.educations)
    nbProfs++
    bump(recap.titresAttribues, C.p.titreProfesseur)
    state.log.push({
      turn: state.turn + 1, type: 'Titre', joueur: p.n,
      texte: `${fullName(elu)} est promu Professeur à ${ville.nom}.`,
    })
  }
}

// ── Mariages ────────────────────────────────────────────────────────────

export function gestionMariages(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const celib = pop.filter(
    (c) => c.statut !== 'Décédé' && !c.mariage && c.age >= C.p.adultAge,
  )
  const femmes = rng.shuffle(celib.filter((c) => c.sexe === 'F'))
  const hommes = celib.filter((c) => c.sexe === 'M')
  const mariesIds = new Set<string>()
  for (const f of femmes) {
    if (f.mariage) continue
    const dispo = hommes.filter((h) => !h.mariage && !mariesIds.has(h.id))
    if (dispo.length === 0) break
    const h = rng.pick(dispo)
    const proba = computeMarriageProbability(f, h, C)
    if (!rng.chance(proba)) continue
    f.mariage = fullName(h)
    h.mariage = fullName(f)
    mariesIds.add(h.id)
    const noble = isNobleDyn(f.dynastie, C) && isNobleDyn(h.dynastie, C)
    if (noble) bump(recap.mariagesNobles, formatDynastyPair(f.dynastie, h.dynastie))
    state.log.push({
      turn: state.turn + 1, type: 'Mariage', joueur: p.n,
      texte: noble
        ? `Mariage noble : ${fullName(f)} (${f.dynastie}) épouse ${fullName(h)} (${h.dynastie}).`
        : `Mariage : ${fullName(f)} épouse ${fullName(h)}.`,
    })
  }
}

export function formatDynastyPair(d1: string, d2: string): string {
  return d1 <= d2 ? `${d1} & ${d2}` : `${d2} & ${d1}`
}

export function computeMarriageProbability(f: Character, h: Character, C: Cfg = cfgOf()): number {
  const nobleF = isNobleDyn(f.dynastie, C)
  const nobleH = isNobleDyn(h.dynastie, C)
  let score: number
  if (!nobleF && !nobleH) score = C.p.mariageRoturiers
  else if (nobleF && nobleH) score = C.p.mariageNobles
  else score = C.p.mariageMesalliance // mésalliance
  // bonus titre non-Chasseur (par époux)
  if (f.titre && f.titre !== C.p.titreChasseur) score += C.p.mariageBonusTitre
  if (h.titre && h.titre !== C.p.titreChasseur) score += C.p.mariageBonusTitre
  // mods marriage_mod des traits (bornés ±mariageTraitMax par époux)
  score += characterMarriageMod(f, C) + characterMarriageMod(h, C)
  // culture
  if (f.culture && h.culture) {
    score += f.culture.toLowerCase() === h.culture.toLowerCase()
      ? C.p.mariageMemeCulture
      : C.p.mariageAutreCulture
  }
  // écart d'âge
  score -= Math.abs(f.age - h.age) * C.p.mariageParAnEcart
  // bâtards
  const batF = f.traits.includes(C.p.traitBatard)
  const batH = h.traits.includes(C.p.traitBatard)
  if (batF) score += C.p.mariageBatard
  if (batH) score += C.p.mariageBatard
  if (batF && batH) score += C.p.mariageDeuxBatards
  if (batF && nobleF && nobleH) score += C.p.mariageBatard
  if (batH && nobleH && nobleF) score += C.p.mariageBatard
  return Math.min(C.p.mariagePlafond, Math.max(C.p.mariagePlancher, score))
}

function characterMarriageMod(c: Character, C: Cfg = cfgOf()): number {
  let total = 0
  for (const t of c.traits) {
    if (!t) continue
    const td = traitDef(t, C.config)
    if (td) total += td.marriage_mod
  }
  return Math.min(C.p.mariageTraitMax, Math.max(-C.p.mariageTraitMax, total))
}

// ── Éducation des mineurs (TryEducateMinor) ─────────────────────────────

export function tryEducateMinor(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  // VBA : le trait « Obstiné » refuse toute éducation.
  if (c.traits.includes(C.p.traitObstine)) return
  const ville = p.villes.find((v) => v.nom === c.ville)
  if (!ville) return
  const rank = schoolRankOf(ville.batiments, C.config)
  if (rank <= 0) return
  const pop = state.population[p.n] ?? []
  const profs = pop.filter((x) => x.statut !== 'Décédé' && x.ville === ville.nom && x.titre === C.p.titreProfesseur)
  if (profs.length === 0) return
  const base = isNobleDyn(c.dynastie, C) ? C.p.chanceEducNoble : C.p.chanceEducRoturier
  let chance = base * rank * (1 + C.p.profBonusEduc * (profs.length - 1))
  chance = Math.min(0.95, chance)
  if (!rng.chance(chance)) return
  const edus = new Set<string>()
  for (const prof of profs) if (prof.education) edus.add(prof.education)
  if (edus.size === 0) return
  c.education = rng.pick([...edus])
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `${fullName(c)} (${c.age} ans) reçoit une éducation ${c.education.toLowerCase()} à ${ville.nom}.`,
  })
}

// ── Titre automatique à l'âge adulte ────────────────────────────────────

export function assignAdultTitle(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  if (c.traits.includes(C.p.traitBatard)) {
    c.titre = C.p.titreChasseur
    bump(recap.titresAttribues, C.p.titreChasseur)
    return
  }
  let titre: string | null = null
  if (c.education) {
    const td = C.titres.find(
      (t) => t.attribution === 'Education' && t.education === c.education,
    )
    if (td && titreAllowedForCharacter(td.titre, c, p, C)) titre = td.titre
  }
  if (!titre) titre = C.p.titreChasseur
  c.titre = titre
  bump(recap.titresAttribues, titre)
}

export function titreAllowedForCharacter(titre: string, c: Character, p: Player, C: Cfg = cfgOf()): boolean {
  const td = titreDef(titre, C.config)
  if (!td) return false
  if (td.nobleSeul && !isNobleDyn(c.dynastie, C)) return false
  if (td.regleGenre === 'Masculine' && c.sexe !== 'M') return false
  if (td.regleGenre === 'Féminine' && c.sexe !== 'F') return false
  if (td.regleGenre === 'Hérédité' || td.regleGenre === 'Culture') {
    const cult = cultureDef(p.culture, C.config)
    if (cult) {
      if (cult.heredite === 'Masculine' && c.sexe !== 'M') return false
      if (cult.heredite === 'Féminine' && c.sexe !== 'F') return false
    }
  }
  if (td.regleGenre === 'Martialité') {
    const cult = cultureDef(p.culture, C.config)
    if (cult && !martialiteOk(cult.martialite, c.sexe)) return false
  }
  return true
}


// ══ src/engine/sante.ts ══
// ══════════════════════════════════════════════════════════════════════
//  SANTÉ, MORT ET SUCCESSION
//  Âge maximum, résurrection, maladie, décès et succession du Dirigeant.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


export function computeAgeMax(c: Character, rng: Rng, C: Cfg = cfgOf()): number {
  // VBA ComputeAgeMaxEx : somme des life_delta des trois traits.
  let delta = 0
  for (const t of c.traits) {
    const td = t ? traitDef(t, C.config) : undefined
    if (td) delta += td.life_delta
  }
  return C.p.ageMaxBase + rng.int(0, Math.max(0, C.p.ageMaxAla)) + delta
}

export function tryResurrection(c: Character, rng: Rng, C: Cfg = cfgOf()): boolean {
  const t1 = traitDef(c.traits[0], C.config)
  const seuil = t1 ? t1.resurrection_min_roll : 0
  if (seuil > 0 && rng.die(6) >= seuil) {
    c.ageMax += rng.die(6) + rng.die(6)
    return true
  }
  return false
}

// ── Maladie ──────────────────────────────────────────────────────────────

export function maladieStep(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  if (c.statut === 'Décédé') return
  const C = cfgOf(state.config)
  const ville = p.villes.find((v) => v.nom === c.ville)
  const batiments = ville ? ville.batiments : []
  let contractMod = 0
  let cureMod = 0
  for (const v of p.villes) {
    for (const b of v.batiments) {
      const bd = buildingDef(b, C.config)
      if (bd) cureMod += bd.bonusGuerisonGlobal
    }
  }
  for (const b of batiments) {
    const bd = buildingDef(b, C.config)
    if (bd) {
      contractMod += bd.malContraction
      cureMod += bd.bonusGuerison
    }
  }
  if (c.statut === 'Sain' || c.statut === 'Enceinte') {
    let pContract = C.p.probaMaladie + C.p.modMaladieAge * c.age + contractMod
    if (c.statut === 'Enceinte') pContract += C.p.modMaladieEnceinte
    if (rng.chance(Math.max(0, pContract))) {
      if (c.statut === 'Enceinte') {
        // une femme enceinte qui tombe malade perd la grossesse
        c.statut = 'Malade'
        c.pereBio = null
        state.log.push({
          turn: state.turn + 1, type: 'Naissance', joueur: p.n,
          texte: `${fullName(c)} perd sa grossesse suite à la maladie.`,
        })
      } else {
        c.statut = 'Malade'
      }
    }
  } else if (c.statut === 'Malade') {
    // un malade qui re-contracte la maladie meurt
    if (rng.chance(Math.max(0, C.p.probaMaladie + C.p.modMaladieAge * c.age + contractMod))) {
      killCharacter(state, p, c, 'maladie', recap)
      return
    }
    const pCure = C.p.probaGuerison - C.p.modGuerisonAge * c.age + cureMod
    if (rng.chance(Math.max(0, pCure))) c.statut = 'Sain'
  }
}

// ── Décès ────────────────────────────────────────────────────────────────

export function killCharacter(state: GameState, p: Player, c: Character, cause: 'vieillesse' | 'maladie', recap: PlayerRecap) {
  const C = cfgOf(state.config)
  c.statut = 'Décédé'
  // libérer le conjoint
  const pop = state.population[p.n] ?? []
  if (c.mariage) {
    const conjoint = pop.find((x) => x.mariage === fullName(c))
    if (conjoint) conjoint.mariage = null
  }
  bump(recap.deces, c.dynastie)
  if (cause === 'maladie') recap.decesMaladie++
  state.log.push({
    turn: state.turn + 1, type: 'Décès', joueur: p.n,
    texte: `${fullName(c)} (${c.age} ans, ${c.dynastie}${c.titre ? `, ${c.titre}` : ''}) meurt de ${cause === 'maladie' ? 'la maladie' : 'vieillesse'}.`,
  })
  // succession si Dirigeant
  if (c.titre === C.p.titreDirigeant) {
    handleDirigeantSuccession(state, p, c, recap)
  }
}

export function handleDirigeantSuccession(state: GameState, p: Player, defunt: Character, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const heritier = pop.find(
    (c) => c.statut !== 'Décédé' && c.titre === C.p.titreHeritierStr,
  )
  if (heritier) {
    heritier.titre = C.p.titreDirigeant
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `${p.nom} : ${fullName(heritier)} (${heritier.dynastie}) succède à ${fullName(defunt)} comme Dirigeant.`,
    })
    return
  }
  const nobles = pop.filter(
    (c) => c.statut !== 'Décédé' && c.age >= C.p.adultAge && isNobleDyn(c.dynastie, C) && c.titre !== C.p.titreSoldat && c.titre !== C.p.titreCommandant,
  )
  const rng = makeRng(state.rngState)
  const eligibles = nobles.filter((c) => titreAllowedForCharacter(C.p.titreDirigeant, c, p, C))
  if (eligibles.length > 0) {
    const elu = rng.pick(eligibles)
    elu.titre = C.p.titreDirigeant
    state.rngState = rng.state()
    recap.crises.push('CRISE DE SUCCESSION')
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `CRISE DE SUCCESSION — ${p.nom} : le noble ${fullName(elu)} (${elu.dynastie}) est promu Dirigeant.`,
    })
    return
  }
  recap.crises.push('CRISE MAJEURE : poste de Dirigeant vacant')
  state.log.push({
    turn: state.turn + 1, type: 'Crise', joueur: p.n,
    texte: `CRISE MAJEURE — ${p.nom} : aucun héritier ni noble disponible, le poste de Dirigeant est vacant !`,
  })
}



// ══ src/engine/naissances.ts ══
// ══════════════════════════════════════════════════════════════════════
//  FÉCONDITÉ, CONCEPTIONS ET NAISSANCES
//  Facteurs de fertilité, conception, accouchement, noms, dynastie du bébé et héritage des traits.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════



export function computeFecondite(state: GameState, p: Player, c: Character): number {
  const C = cfgOf(state.config)
  if (c.statut === 'Décédé' || c.age < C.p.adultAge) return 0
  if (c.sexe === 'F') {
    return femaleAgeFactor(c.age) * cultureFertFactor(p.culture, C) * orientationFertFactor(c.orientation)
  }
  return maleAgeFactor(c.age) * orientationFertFactor(c.orientation)
}

export function femaleAgeFactor(age: number): number {
  if (age < 16) return 0
  if (age <= 25) return 1.0
  if (age <= 30) return 0.9
  if (age <= 35) return 0.8
  if (age <= 40) return 0.7
  if (age <= 44) return 0.4
  if (age <= 49) return 0.1
  if (age <= 99) return 0.02
  return 0
}

export function maleAgeFactor(age: number): number {
  if (age < 16) return 0
  return Math.max(0, 1 - (0.5 * (age - 16)) / 42)
}

export function orientationFertFactor(orientation: string): number {
  const o = orientation.toLowerCase()
  return o.includes('homo') || o.includes('asex') ? 0.7 : 1
}

function cultureFertFactor(culture: string, C: Cfg = cfgOf()): number {
  const c = cultureDef(culture, C.config)
  return c ? c.fertFactor : 1
}

function traitsFertFactor(a: Character, b: Character | null, C: Cfg = cfgOf()): number {
  let sum = 0
  for (const t of a.traits) {
    const td = t ? traitDef(t, C.config) : undefined
    if (td) sum += td.fert_add
  }
  if (b) {
    for (const t of b.traits) {
      const td = t ? traitDef(t, C.config) : undefined
      if (td) sum += td.fert_add
    }
  }
  return Math.min(C.p.fertTraitFactorMax, Math.max(C.p.fertTraitFactorMin, 1 + sum))
}

// ── Conception et naissances ─────────────────────────────────────────────

export function conceptionEtNaissances(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []

  // 1. Naissances des femmes enceintes depuis le tour précédent
  for (const mere of pop) {
    if (mere.statut !== 'Enceinte') continue
    if (mere.statut === 'Décédé') continue
    const pereBioName = mere.pereBio
    const pere = pereBioName ? pop.find((x) => fullName(x) === pereBioName) : undefined
    accoucher(state, p, mere, pere, rng, recap)
    mere.statut = 'Sain'
    mere.pereBio = null
  }

  // 2. Tentatives de conception (femmes adultes saines)
  for (const mere of pop) {
    if (mere.sexe !== 'F' || mere.statut !== 'Sain') continue
    if (mere.age < C.p.adultAge) continue
    const ville = p.villes.find((v) => v.nom === mere.ville)
    const mari = mere.mariage ? pop.find((x) => fullName(x) === mere.mariage && x.statut !== 'Décédé') : undefined
    const factorMari = mari ? maleAgeFactor(mari.age) * orientationFertFactor(mari.orientation) : C.p.fertSingleFactor
    let proba = C.p.fertBaseRate
    proba *= femaleAgeFactor(mere.age)
    proba *= factorMari
    proba *= traitsFertFactor(mere, mari ?? null, C)
    proba *= cultureFertFactor(p.culture, C)
    proba *= orientationFertFactor(mere.orientation)
    proba *= taxBirthFactor(ville, C)
    if (rng.chance(proba)) {
      let pereBio: Character | undefined
      let batard = false
      if (mari) {
        if (rng.chance(C.p.adulteryRate)) {
          // adultère : amant aléatoire
          const amants = pop.filter(
            (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= C.p.adultAge && x.id !== mari.id,
          )
          pereBio = amants.length > 0 ? rng.pick(amants) : undefined
          batard = true
        } else {
          pereBio = mari
        }
      } else {
        // célibataire : amant aléatoire, enfant bâtard
        const amants = pop.filter(
          (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= C.p.adultAge,
        )
        pereBio = amants.length > 0 ? rng.pick(amants) : undefined
        batard = true
      }
      mere.statut = 'Enceinte'
      mere.pereBio = pereBio ? fullName(pereBio) : null
      mere.enfantBatard = batard
      bump(recap.conceptions, mere.dynastie)
      state.log.push({
        turn: state.turn + 1, type: 'Naissance', joueur: p.n,
        texte: `${fullName(mere)} attend un enfant${batard ? ' (bâtard)' : ''}.`,
      })
    }
  }
}

function accoucher(state: GameState, p: Player, mere: Character, pere: Character | undefined, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // nombre d'enfants
  const r = rng.next()
  const nb = r < C.p.fertTripletsRate ? 3 : r < C.p.fertTripletsRate + C.p.fertTwinsRate ? 2 : 1
  const batard = mere.enfantBatard
  const consanguin = isConsanguineous(mere, pere)
  for (let i = 0; i < nb; i++) {
    const enfant: Character = {
      id: newId(rng),
      nom: mere.nom,
      prenom: pickName(state, p, rng, undefined),
      dynastie: computeBabyDynasty(state, p, mere, pere, batard, rng),
      sexe: rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F',
      age: 0,
      culture: mere.culture,
      ville: mere.ville,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
      traits: ['', '', ''],
      statut: 'Sain',
      mariage: null,
      mere: fullName(mere),
      pere: pere ? fullName(pere) : null,
      pereBio: null,
      enfantBatard: batard,
      titre: null,
      education: null,
      fecondite: 0,
      ageMax: 0,
      armee: null,
    }
    // traits
    inheritTraits(enfant, mere, pere, rng, C)
    if (batard) ensureTraitPresent(enfant, C.p.traitBatard)
    if (consanguin) ensureTraitPresent(enfant, C.p.traitConsanguin)
    enfant.ageMax = computeAgeMax(enfant, rng, C)
    pop.push(enfant)
    bump(recap.naissances, enfant.dynastie)
    state.log.push({
      turn: state.turn + 1, type: 'Naissance', joueur: p.n,
      texte: `Naissance : ${fullName(enfant)} (${enfant.sexe}, ${enfant.dynastie})${nb > 1 ? ` — fratrie de ${nb}` : ''}.`,
    })
  }
  mere.enfantBatard = false
}

export function pickName(state: GameState, p: Player, rng: Rng, sexe: 'M' | 'F' | undefined): string {
  const C = cfgOf(state.config)
  const peup = peupleDef(p.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  if (!peup) return 'Anonyme'
  if (sexe === 'F') return rng.pick(peup.prenomsF)
  if (sexe === 'M') return rng.pick(peup.prenomsM)
  return rng.pick([...peup.prenomsM, ...peup.prenomsF])
}

/** Consanguinité simple (1 degré) : la mère et le père biologique partagent un parent. */
export function isConsanguineous(mere: Character, pere: Character | undefined): boolean {
  if (!pere) return false
  if (mere.mere && mere.mere === pere.mere) return true
  if (mere.pere && mere.pere === pere.pere) return true
  return false
}

/** Dynastie du bébé selon l'Hérédité de la culture (Masculine/Féminine/Parité). */
export function computeBabyDynasty(
  state: GameState, p: Player, mere: Character, pere: Character | undefined,
  batard: boolean, rng: Rng,
): string {
  const C = cfgOf(state.config)
  if (batard) {
    // dynastie noble du parent noble s'il existe, sinon Roturier
    if (pere && isNobleDyn(pere.dynastie, C)) return pere.dynastie
    if (isNobleDyn(mere.dynastie, C)) return mere.dynastie
    return C.p.dynastieRoturier
  }
  const cult = cultureDef(p.culture, C.config)
  const hered = cult ? cult.heredite : 'Masculine'
  if (hered === 'Masculine') return pere ? pere.dynastie : mere.dynastie
  if (hered === 'Féminine') return mere.dynastie
  // Parité
  return rng.chance(0.5) ? (pere ? pere.dynastie : mere.dynastie) : mere.dynastie
}

/** Héritage des traits : 40% par trait parental héritable (3 essais mère + 3 essais père),
 *  puis 30% de tirage pondéré par slot libre. */
export function inheritTraits(enfant: Character, mere: Character, pere: Character | undefined, rng: Rng, C: Cfg = cfgOf()) {
  const parents = [mere, ...(pere ? [pere] : [])]
  const nbEssais = Math.max(0, Math.round(C.p.traitHeriteEssais))
  for (const parent of parents) {
    for (const t of parent.traits) {
      if (!t) continue
      const td = traitDef(t, C.config)
      if (!td || !td.heritable) continue
      for (let essai = 0; essai < nbEssais; essai++) {
        if (rng.chance(C.p.traitHeriteParEssai)) {
          if (addTraitIfFree(enfant, t)) break
        }
      }
    }
  }
  // VBA : tirage pondéré par slot libre, hors traits déjà présents.
  const pris = enfant.traits.filter(Boolean) as string[]
  const pool = C.traits.filter((td) => td.weight > 0 && !pris.includes(td.name))
  for (let slot = 0; slot < 3 && pool.length > 0; slot++) {
    if (enfant.traits[slot]) continue
    if (rng.chance(C.p.traitTirageSlot)) {
      const t = rng.pickWeighted(pool, (td) => td.weight)
      addTraitIfFree(enfant, t.name)
    }
  }
}

function addTraitIfFree(c: Character, trait: string): boolean {
  if (c.traits.includes(trait)) return false
  const idx = c.traits.findIndex((t) => !t)
  if (idx < 0) return false
  c.traits[idx] = trait
  return true
}

function ensureTraitPresent(c: Character, trait: string) {
  if (!c.traits.includes(trait)) {
    const idx = c.traits.findIndex((t) => !t)
    if (idx >= 0) c.traits[idx] = trait
    else c.traits[2] = trait // écrase le 3e slot si plein (comportement VBA SetTraitCell)
  }
}


// ══ src/engine/culture.ts ══
// ══════════════════════════════════════════════════════════════════════
//  CULTURE — CONVERSIONS ET VILLES (ApplyCultureInfluence)
//  Pression touristique, conversions culturelles et culture majoritaire des villes.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ── Influence culturelle (ApplyCultureInfluence) ─────────────────────────

export function applyCultureInfluence(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // pression touristique globale : somme du Tourisme de tous les joueurs par culture
  const pression: Record<string, number> = {}
  for (const cult of C.cultures) pression[cult.nom] = 0.001
  for (const other of state.players) {
    const tour = other.resources['Tourisme']?.stock ?? 0
    pression[other.culture] = (pression[other.culture] ?? 0) + tour
  }
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.titre === C.p.titreDirigeant) continue
    if (!rng.chance(C.p.conversionProba)) continue
    const poids: Record<string, number> = {}
    for (const [cult, w] of Object.entries(pression)) {
      let weight = w
      if (cult === c.culture) weight *= C.p.conversionMemeCulture // présence locale
      const same = pop.filter((x) => x.statut !== 'Décédé' && x.ville === c.ville && x.culture === cult).length
      weight += same * C.p.conversionPoidsLocal
      poids[cult] = weight
    }
    const entries = Object.entries(poids)
    const nouvelle = rng.pickWeighted(entries, (e) => e[1])[0]
    if (nouvelle !== c.culture) {
      c.culture = nouvelle
      bump(recap.conversions, nouvelle)
      state.log.push({
        turn: state.turn + 1, type: 'Culture', joueur: p.n,
        texte: `${fullName(c)} se convertit à la culture ${nouvelle}.`,
      })
    }
  }
}

export function updateCityCultures(state: GameState, p: Player) {
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    if (vivants.length === 0) continue
    const counts: Record<string, number> = {}
    for (const c of vivants) counts[c.culture] = (counts[c.culture] ?? 0) + 1
    const major = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    ville.culture = major
  }
}


// ══ src/engine/population.ts ══
// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur) + MIGRATION
//  Orchestration démographique du tour : appelle les modules titres, santé, naissances, culture et journal.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur)
// ══════════════════════════════════════════════════════════════════════

export function populationTurn(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n]
  if (!pop) return
  const recap = emptyRecap()
  p.recap = recap

  // 3.1 Professeurs
  maybeAssignProfesseurs(state, p, rng, recap)

  // 3.2 Mariages
  gestionMariages(state, p, rng, recap)

  // 3.3 Boucle principale sur chaque vivant
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  for (const c of vivants) {
    // statut vide → Sain
    if (!c.statut) c.statut = 'Sain'
    // AgeMax par défaut : 40 + aléa(0-39) + life_delta(Trait1)
    if (!c.ageMax || c.ageMax <= 0) c.ageMax = computeAgeMax(c, rng, C)
    // vieillissement : +2 ans par tour
    c.age += 2
    // éducation des mineurs
    if (c.age < C.p.adultAge) tryEducateMinor(state, p, c, rng, recap)
    // fécondité affichée
    c.fecondite = computeFecondite(state, p, c)
    // mort de vieillesse
    if (c.age >= c.ageMax) {
      const resurrected = tryResurrection(c, rng, C)
      if (!resurrected) {
        killCharacter(state, p, c, 'vieillesse', recap)
        continue
      }
    }
    // titre automatique à l'âge adulte
    if (c.age >= C.p.adultAge && !c.titre) assignAdultTitle(state, p, c, rng, recap)
    // maladie
    maladieStep(state, p, c, rng, recap)
  }

  // 3.4 Grossesses et naissances
  conceptionEtNaissances(state, p, rng, recap)

  // 3.6 Influence culturelle
  applyCultureInfluence(state, p, rng, recap)
  updateCityCultures(state, p)

  // Migration des enfants sans éducation (MIGRATION_PROBA)
  migrerEnfants(state, p, rng)

  // Récap dans le journal
  writeRecap(state, p, recap)
}

// ── Migration des enfants sans éducation ─────────────────────────────────

export function migrerEnfants(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  if (p.villes.length <= 1) return
  const pop = state.population[p.n] ?? []
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.age >= C.p.adultAge) continue
    if (c.education) continue
    // VBA : les « Obstinés » ne migrent pas — l'éducation ne les tentera jamais.
    if (c.traits.includes(C.p.traitObstine)) continue
    if (!rng.chance(C.p.migrationProba)) continue
    const autres = p.villes.filter((v) => v.nom !== c.ville)
    if (autres.length === 0) continue
    const dest = rng.pick(autres)
    const avant = c.ville
    c.ville = dest.nom
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `${fullName(c)} quitte ${avant} pour ${dest.nom} (migration).`,
    })
  }
}


// ══ src/engine/armees.ts ══
// ══════════════════════════════════════════════════════════════════════
//  ARMÉES (RecruitForArmies)
//  Recrutement, pertes, commandants, martialité et puissance des armées.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ── Armées (RecruitForArmies) ────────────────────────────────────────────

export function recruitForArmies(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const recap = p.recap ?? emptyRecap()
  const cult = cultureDef(p.culture, C.config)
  for (const armee of p.armees) {
    // retirer les soldats morts
    armee.soldats = armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    })
    // commandant mort ?
    const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
    let puissance = armee.soldats.length * C.p.puissanceSoldat
    if (cmd && cmd.statut !== 'Décédé') {
      puissance += C.p.puissanceGeneral
    } else if (armee.commandant) {
      armee.commandant = null
      recap.commandantTombe = armee.nom
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${p.nom} : le commandant de l'armée « ${armee.nom} » est tombé — à remplacer !`,
      })
    }
    // recruter jusqu'à la puissance cible
    while (puissance < armee.puissanceCible) {
      const candidats = pop.filter(
        (c) =>
          c.statut !== 'Décédé' &&
          c.age >= C.p.soldatAgeMin && c.age <= C.p.soldatAgeMax &&
          !c.armee && (!c.titre || c.titre === C.p.titreChasseur) &&
          martialiteOk(cult?.martialite, c.sexe),
      )
      if (candidats.length === 0) break
      const s = rng.pick(candidats)
      s.titre = C.p.titreSoldat
      s.armee = armee.nom
      armee.soldats.push(s.id)
      puissance += C.p.puissanceSoldat
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${fullName(s)} rejoint l'armée « ${armee.nom} » comme soldat.`,
      })
    }
    armee.puissance = puissance
  }
}

export function martialiteOk(martialite: string | undefined, sexe: 'M' | 'F'): boolean {
  if (!martialite || martialite === 'Les deux') return true
  if (martialite === 'Masculine') return sexe === 'M'
  if (martialite === 'Féminine') return sexe === 'F'
  return true
}

/** Recalcule la puissance affichée d'une armée (après édition manuelle). */
export function recomputeArmy(state: GameState, p: Player, armee: { nom: string; soldats: string[]; commandant: string | null; puissance: number }) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
  armee.puissance =
    armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    }).length * C.p.puissanceSoldat + (cmd && cmd.statut !== 'Décédé' ? C.p.puissanceGeneral : 0)
}


// ══ src/engine/journal.ts ══
// ══════════════════════════════════════════════════════════════════════
//  JOURNAL — SNAPSHOT ET RÉCAPITULATIF (SnapshotRessources, WriteRecapA3)
//  Historique des stocks et récapitulatif de fin de tour par joueur.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════


// ── Historique (SnapshotRessources) ──────────────────────────────────────

export function snapshotRessources(state: GameState, turn: number) {
  const C = cfgOf(state.config)
  for (const p of state.players) {
    const stocks: Record<string, number> = {}
    const prods: Record<string, number> = {}
    for (const r of C.ressources) {
      stocks[r] = p.resources[r]?.stock ?? 0
      prods[r] = p.resources[r]?.prod ?? 0
    }
    state.history.push({ turn, joueur: p.n, stocks, prods })
  }
}

// ── Récap (WriteRecapA3) ────────────────────────────────────────────────

export function writeRecap(state: GameState, p: Player, recap: PlayerRecap) {
  const fmt = (dict: Record<string, number>) =>
    Object.entries(dict)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k} : ${v}`)
      .join(', ') || '—'
  const lignes = [
    `Conceptions — ${fmt(recap.conceptions)}`,
    `Naissances — ${fmt(recap.naissances)}`,
    `Décès — ${fmt(recap.deces)} (dont maladie : ${recap.decesMaladie})`,
    `Mariages nobles — ${fmt(recap.mariagesNobles)}`,
    `Conversions culturelles — ${fmt(recap.conversions)}`,
    `Titres attribués — ${fmt(recap.titresAttribues)}`,
  ]
  if (recap.crises.length > 0) lignes.push(`⚠ Crises : ${recap.crises.join(' ; ')}`)
  if (recap.commandantTombe) lignes.push(`⚠ Commandant tombé : ${recap.commandantTombe}`)
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `Récap ${p.nom} — ${lignes.join(' | ')}`,
  })
}


// ══ src/engine/victory.ts ══
// ══════════════════════════════════════════════════════════════════════
//  Conditions de victoire — chapitre XII du livret « Déterminer le vainqueur »
// ══════════════════════════════════════════════════════════════════════


export function checkVictory(state: GameState): VictoryStatus[] {
  const C = cfgOf(state.config)
  const T_DIRIGEANT = C.p.titreDirigeant
  const T_GOUVERNEUR = C.p.titreGouverneur
  const vivantsMonde = state.players.reduce(
    (n, p) => n + (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé').length, 0,
  )
  const orTotal = sumProd(state, 'Or')
  const tourTotal = Math.max(1, sumProd(state, 'Tourisme'))
  const garnisons = state.players.map((p) => p.resources['Garnison']?.stock ?? 0)
  const armeesAdverses = (p: number) =>
    state.players.filter((q) => q.n !== p).reduce((n, q) => n + q.armees.length, 0)

  return state.players.map((p) => {
    const pop = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé')
    const dynDirigeant = pop.find((c) => c.titre === T_DIRIGEANT)?.dynastie
    const famille = pop.filter((c) => c.dynastie === dynDirigeant && dynDirigeant)
    const gouverneurs = famille.filter((c) => c.titre === T_GOUVERNEUR).length
    const eduRang3 = famille.filter((c) => c.education === 'Médicale' || c.education === 'Scientifique' || c.education === 'Militaire').length
    const nourr = p.resources['Nourriture']
    const prodNourr = nourr ? nourr.prod : 0
    const orProd = p.resources['Or']?.prod ?? 0
    const tourStock = p.resources['Tourisme']?.stock ?? 0
    const cultVilles = state.players.reduce((n, q) => n + q.villes.filter((v) => v.culture === p.culture).length, 0)
    const villesTotales = state.players.reduce((n, q) => n + q.villes.length, 0)
    const pourcentCour = vivantsMonde > 0 ? pop.length / vivantsMonde : 0

    return {
      joueur: p.n,
      nom: p.nom,
      militaire: armeesAdverses(p.n) === 0 && garnisons[p.n - 1] > 0,
      economique: orTotal > 0 && orProd / orTotal > 0.5,
      culturelle: tourStock / tourTotal > 0.5 && villesTotales > 0 && cultVilles / villesTotales >= 0.5,
      scientifique: (p.resources['Science']?.stock ?? 0) >= 100,
      demographique: p.villes.length >= 5 && prodNourr >= 100,
      dynastique:
        !!dynDirigeant &&
        gouverneurs >= 2 &&
        eduRang3 >= 4 &&
        famille.length >= 10 &&
        pourcentCour >= 0.33,
    }
  })
}

function sumProd(state: GameState, res: string): number {
  return state.players.reduce((n, p) => n + Math.max(0, p.resources[res]?.prod ?? 0), 0) || 1
}

export function victoryLabels(): { key: keyof import('./types').VictoryStatus; label: string }[] {
  return [
    { key: 'militaire', label: 'Militaire' },
    { key: 'economique', label: 'Économique' },
    { key: 'culturelle', label: 'Culturelle' },
    { key: 'scientifique', label: 'Scientifique' },
    { key: 'demographique', label: 'Démographique' },
    { key: 'dynastique', label: 'Dynastique' },
  ]
}


// ══ src/engine/validation.ts ══
// ══════════════════════════════════════════════════════════════════════
//  Contrôle de cohérence de l'attribution des titres
//  (portage de la macro VBA ValidateTitleAssignment + frmAttribuerTitre)
//  PHILOSOPHIE : ces contrôles sont des AVERTISSEMENTS, jamais des
//  blocages. L'attribution est toujours appliquée (aucune contrainte
//  bloquante) ; le message sert d'aide au joueur qui peut l'ignorer.
// ══════════════════════════════════════════════════════════════════════


export interface TitleIssue {
  ok: boolean
  message: string
}

/**
 * Contrôle l'attribution d'un titre à un personnage (cohérence avec le
 * classeur) : âge adulte, noblesse, règles de genre du titre et de la
 * culture (Reglege : vide / Masculine / Féminine / Hérédité / Martialité),
 * éducation requise, unicité Dirigeant/Héritier/Gouverneur/Professeur.
 */
export function validateTitleAssignment(
  state: GameState,
  player: Player,
  char: Character,
  titre: string,
): TitleIssue {
  const C = cfgOf(state.config)
  const td = titreDef(titre, C.config)
  if (!td) return { ok: false, message: `Titre inconnu : ${titre}` }
  if (char.statut === 'Décédé') return { ok: false, message: 'Ce personnage est décédé.' }
  if (char.age < C.p.adultAge) return { ok: false, message: `Ce personnage est mineur (${char.age} ans, adulte à ${C.p.adultAge}).` }
  if (td.attribution === 'Armée') {
    return { ok: false, message: `Le titre « ${titre} » s'obtient normalement par l'engagement militaire.` }
  }
  if (td.nobleSeul && !isNobleDyn(char.dynastie, C)) {
    return { ok: false, message: `Le titre « ${titre} » est en principe réservé aux nobles (${char.dynastie}).` }
  }
  // règles de genre (colonne RegleGenre du classeur : vide/Masculine/Féminine/Hérédité/Martialité)
  const cult = cultureDef(player.culture, C.config)
  if (td.regleGenre === 'Masculine' && char.sexe !== 'M') {
    return { ok: false, message: 'Ce titre est en principe réservé aux hommes.' }
  }
  if (td.regleGenre === 'Féminine' && char.sexe !== 'F') {
    return { ok: false, message: 'Ce titre est en principe réservé aux femmes.' }
  }
  if (td.regleGenre === 'Hérédité' && cult) {
    if (cult.heredite === 'Masculine' && char.sexe !== 'M') {
      return { ok: false, message: `La culture ${player.culture} (hérédité masculine) réserve en principe ce poste aux hommes.` }
    }
    if (cult.heredite === 'Féminine' && char.sexe !== 'F') {
      return { ok: false, message: `La culture ${player.culture} (hérédité féminine) réserve en principe ce poste aux femmes.` }
    }
  }
  if (td.regleGenre === 'Martialité' && cult) {
    if (cult.martialite === 'Masculine' && char.sexe !== 'M') {
      return { ok: false, message: `La culture ${player.culture} (martialité masculine) réserve en principe ce poste aux hommes.` }
    }
    if (cult.martialite === 'Féminine' && char.sexe !== 'F') {
      return { ok: false, message: `La culture ${player.culture} (martialité féminine) réserve en principe ce poste aux femmes.` }
    }
  }
  // éducation requise
  if (td.education && char.education !== td.education) {
    return { ok: false, message: `Éducation attendue : ${td.education} (ce personnage a : ${char.education ?? 'aucune'}).` }
  }
  // règles d'unicité (Dirigeant, Héritier, Gouverneur, Professeurs)
  const pop = (state.population[player.n] ?? []).filter((c) => c.statut !== 'Décédé')
  if (titre === C.p.titreDirigeant && pop.some((c) => c.id !== char.id && c.titre === C.p.titreDirigeant)) {
    return { ok: false, message: `Il y a déjà un ${C.p.titreDirigeant}.` }
  }
  if (titre === C.p.titreHeritierStr) {
    const dirigeant = pop.find((c) => c.titre === C.p.titreDirigeant)
    if (pop.some((c) => c.id !== char.id && c.titre === C.p.titreHeritierStr)) {
      return { ok: false, message: `Il y a déjà un ${C.p.titreHeritierStr}.` }
    }
    if (dirigeant && char.dynastie !== dirigeant.dynastie) {
      return { ok: false, message: `L'${C.p.titreHeritierStr} est en principe de la dynastie du ${C.p.titreDirigeant} (${dirigeant.dynastie}).` }
    }
  }
  if (titre === C.p.titreGouverneur) {
    const autres = pop.filter((c) => c.id !== char.id && c.titre === C.p.titreGouverneur && c.ville === char.ville)
    if (autres.length > 0) {
      return { ok: false, message: `${char.ville} a déjà un ${C.p.titreGouverneur}.` }
    }
  }
  if (titre === C.p.titreProfesseur) {
    const ville = player.villes.find((v) => v.nom === char.ville)
    const rank = ville ? schoolRankOf(ville.batiments, C.config) : 0
    const nbProfs = pop.filter((c) => c.titre === C.p.titreProfesseur && c.ville === char.ville).length
    if (rank === 0) return { ok: false, message: `${char.ville} ne possède pas d'école.` }
    if (nbProfs >= rank) {
      return { ok: false, message: `${char.ville} a déjà ${nbProfs} ${C.p.titreProfesseur}(s) pour une école de rang ${rank}.` }
    }
  }
  return { ok: true, message: `« ${titre} » attribué à ${char.prenom} ${char.nom}.` }
}

/** Liste des titres du référentiel avec contrôle de cohérence (jamais bloquant). */
export function titleCandidatesFor(state: GameState, player: Player, char: Character) {
  const C = cfgOf(state.config)
  return C.titres.map((t) => {
    const issue = validateTitleAssignment(state, player, char, t.titre)
    return { titre: t.titre, ok: issue.ok, motif: issue.ok ? '' : issue.message }
  })
}

/** Avertissements pour le titre courant d'un personnage (affichés, jamais bloquants). */
export function findTitleIssues(state: GameState, player: Player, char: Character): string[] {
  const out: string[] = []
  if (!char.titre) return out
  const C = cfgOf(state.config)
  const td = titreDef(char.titre, C.config)
  if (!td) return out
  if (char.statut !== 'Décédé') {
    const issue = validateTitleAssignment(state, player, char, char.titre)
    if (!issue.ok) out.push(issue.message)
  }
  return out
}


// ══ src/engine/engine.ts ══
// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — MOTEUR DE JEU (façade d'orchestration)
//  Portage TypeScript des macros VBA :
//    · FinDeTour (ressources, saisons, événements, dynasties)
//    · PersonnagesPourJoueur (moteur de population)
//    · CalculerGainsPopulation (gains par ville : titres, taxes, conso)
//    · RecruitForArmies (armées)
//  Un tour = 2 ans de jeu.
//
//  ARCHITECTURE (découpage SOLID — une responsabilité par module) :
//    shared.ts      outils transversaux (ids, noms, noblesse, récap)
//    saisons.ts     saisons, événements, cartes dynastie
//    economie.ts    gains de population par ville, taxes
//    vassalite.ts   tribut des vassaux vers leur suzerain
//    population.ts  orchestration démographique du tour, migration
//    titres.ts      professeurs, mariages, éducation, titres
//    sante.ts       maladie, décès, succession du Dirigeant
//    naissances.ts  fécondité, conceptions, accouchement, traits
//    culture.ts    conversions culturelles, culture des villes
//    armees.ts     recrutement et puissance des armées
//    journal.ts    snapshot des stocks, récapitulatif
//  Ce fichier ne contient QUE la séquence FinDeTurn ; la façade
//  ré-exporte l'API publique inchangée (mêmes noms qu'avant découpage).
// ══════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════
//  FIN DE TOUR — point d'entrée principal
// ══════════════════════════════════════════════════════════════════════

export function runTurn(state: GameState): GameState {
  const C = cfgOf(state.config)
  const rng = makeRng(state.rngState)
  const turnBefore = state.turn
  const newSaison = saisonForTurn(turnBefore + 1, C)

  // 1. Événement de saison (si la saison change au tour qui commence)
  if (newSaison !== state.saison) {
    const ev = rng.pickWeighted(
      C.events.filter((e) => e.saison === newSaison),
      (e) => e.poids,
    )
    const danger = rng.die(6) + state.modDanger
    const level: 'faible' | 'moyenne' | 'forte' | 'extreme' =
      danger <= 5 ? 'faible' : danger <= 8 ? 'moyenne' : danger < C.p.dangerSeuilForte ? 'forte' : 'extreme'
    const texte = ev[level as 'faible' | 'moyenne' | 'forte' | 'extreme']
    state.log.push({
      turn: turnBefore + 1, type: 'Événement', joueur: null,
      texte: `【${newSaison}】 ${ev.nom} (danger ${danger}/6) : ${texte}`,
    })
    applyEventEffect(state, ev.nom, level)
    state.saison = newSaison
  }

  // 2. Carte dynastie pour chaque joueur (TirerDynastie)
  for (const p of state.players) {
    const card = rng.pick(C.dynasties)
    p.dynastie = { nom: card.nom, description: card.description }
    state.log.push({
      turn: turnBefore + 1, type: 'Dynastie', joueur: p.n,
      texte: `${p.nom} — Dynastie « ${card.nom} » : ${card.description}`,
    })
    applyDynastieCard(state, p, card.nom, rng)
  }

  // 3. Boucle par joueur : gains de population puis production
  const gainsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const gains = calculerGainsPopulation(state, p, rng)
    gainsParJoueur[p.n] = gains
    // production : stock += prod (lignes 18-28 des J{n})
    for (const r of C.ressources) {
      const rs = p.resources[r]
      if (!rs) continue
      rs.stock += rs.prod
    }
    if (state.saison === 'Été') {
      // bonus Nourr - été
      const rs = p.resources['Nourriture']
      if (rs) rs.stock += rs.prod
    }
  }

  // 3bis. Vassalité : chaque vassal reverse une part des revenus de ses
  // habitants à son suzerain (formule dans engine/vassalite.ts).
  transfererTributVassal(state, gainsParJoueur, C)

  // 3ter. Gains de population crédités au stock × gainsCrediteStock (paramètre)
  for (const p of state.players) {
    const gains = gainsParJoueur[p.n] ?? {}
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v * C.p.gainsCrediteStock
    }
  }

  // 4. Moteur de population (PersonnagesPourJoueur) pour chaque joueur
  for (const p of state.players) {
    populationTurn(state, p, rng)
  }

  // 5. Armées (RecruitForArmies)
  for (const p of state.players) {
    recruitForArmies(state, p, rng)
  }

  // 6. Snapshot (SnapshotRessources → _Historique)
  snapshotRessources(state, turnBefore + 1)

  // 7. Tour suivant
  state.turn = turnBefore + 1
  if (state.log.length > C.p.maxLog) {
    state.log = state.log.slice(state.log.length - C.p.maxLog)
  }
  state.rngState = rng.state()
  return state
}
// ── API publique (ré-exports — signatures et noms inchangés) ────────────

// (bloc de ré-exports supprimé : inutile dans le bundle)
// ══ src/engine/setup.ts ══
// ══════════════════════════════════════════════════════════════════════
//  Génération de la population initiale
//  (portage de la macro VBA GenererPopulationInitiale / frmInitPop)
//  La config (référentiels + paramètres) vient de la configuration
//  COMMUNE à toutes les parties (voir store) : tout reste modifiable
//  à chaud ensuite, sans aucune contrainte.
// ══════════════════════════════════════════════════════════════════════


export interface SetupLine {
  nom: string
  peuple: string
  culture: string
  regime: string
  taillePopulation: number
  pourcentageMariages: number
  villes: string[]
}

const DEFAULT_VILLES = ['Capitale', 'Bourg']

/**
 * Crée une partie complète à 8 joueurs à partir des paramètres de setup.
 * La partie démarre avec la configuration commune (sinon : défauts du classeur).
 */
export function createGame(setups: SetupLine[], seed: number, mode?: 'local' | 'supabase', config?: GameConfig): GameState {
  const rng = makeRng(seed)
  const startConfig: GameConfig = config
    ? (JSON.parse(JSON.stringify(config)) as GameConfig)
    : cloneDefaultConfig()
  const C = cfgOf(startConfig)
  const state: GameState = {
    version: 1,
    seed,
    rngState: rng.state(),
    turn: 1,
    saison: 'Été',
    modDanger: 0,
    config: startConfig,
    players: [],
    population: {},
    log: [
      { turn: 1, type: 'Système', joueur: null, texte: `Partie créée (graine ${seed}, mode ${mode ?? 'local'}). Tour 1 = année 1.` },
    ],
    history: [],
  }
  for (let i = 0; i < 8; i++) {
    const s = setups[i]
    const n = i + 1
    const player = makePlayer(n, s, C)
    state.players.push(player)
    state.population[n] = makePopulation(player, s, rng, C)
  }
  state.rngState = rng.state()
  return state
}

export function makePlayer(n: number, s: SetupLine, C: Cfg): Player {
  const resources: Record<string, { stock: number; prod: number }> = {}
  for (const r of C.ressources) {
    resources[r] = { stock: r === 'Nourriture' ? 50 : r === 'Or' ? 20 : 0, prod: 0 }
  }
  const peuples = C.peuples
  return {
    n,
    nom: s.nom || `Joueur ${n}`,
    peuple: s.peuple || peuples[(n - 1) % Math.max(1, peuples.length)],
    culture: s.culture || C.cultures[(n - 1) % Math.max(1, C.cultures.length)]?.nom || '',
    regime: s.regime || C.regimes[0]?.nom || 'Monarchie',
    resources,
    villes: (s.villes && s.villes.length > 0 ? s.villes : DEFAULT_VILLES).map((nom, idx) => ({
      nom,
      culture: s.culture,
      taxes: 'Moyenne',
      batiments: idx === 0 ? ['Ecole élémentaire', 'Herboristerie'] : [],
    })),
    dynastie: null,
    armees: [],
    recap: null,
    rang: rangParDefaut(s.regime || C.regimes[0]?.nom || 'Monarchie', C),
    vassalDe: null,
    progresDebloques: [],
  }
}

/** Rang de pays par défaut selon le régime politique :
 *  Démocratie / Socialisme → bloc Républicain (Commune),
 *  Monarchie / Autoritarisme → bloc Féodal (Baronnie).
 *  Modifiable ensuite depuis la page « Royaume ». */
export function rangParDefaut(regime: string, C: Cfg): string {
  const bloc = regime === 'Démocratie' || regime === 'Socialisme' ? 'Républicain' : 'Féodal'
  const rangs = C.config.paysRangs ?? []
  return rangs.find((r) => r.bloc === bloc)?.nom ?? rangs[0]?.nom ?? 'Baronnie'
}

export function makePopulation(player: Player, s: SetupLine, rng: Rng, C: Cfg): Character[] {
  const taille = Math.max(10, s.taillePopulation || 30)
  const pourcentMariages = Math.min(100, Math.max(0, s.pourcentageMariages ?? 40))
  const peup = peupleDef(player.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  const fallback = C.banquesNoms[0]
  const noms = peup?.noms ?? fallback.noms
  const prenomsM = peup?.prenomsM ?? fallback.prenomsM
  const prenomsF = peup?.prenomsF ?? fallback.prenomsF
  const cult = C.cultures.find((c) => c.nom === player.culture)
  const heredite = cult ? cult.heredite : 'Masculine'
  const pop: Character[] = []

  let id = 0
  const nextId = () => `p${player.n}c${++id}`

  function randomOrientation(): Character['orientation'] {
    return rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation']
  }

  function randomSexe(): 'M' | 'F' {
    return rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F'
  }

  function randomTraits(): [string, string, string] {
    // Comme la macro VBA AjouterPopulation : 1er trait systématique,
    // 2e à 50 %, 3e à 30 % — tirage pondéré dans traits_genetiques (7.19),
    // sans doublon (exclusion des traits déjà tirés).
    const traits: [string, string, string] = ['', '', '']
    const draw = (exclus: string[]): string => {
      const pool = C.traits.filter((td) => td.weight > 0 && !exclus.includes(td.name))
      if (pool.length === 0) return ''
      return rng.pickWeighted(pool, (td) => td.weight).name
    }
    traits[0] = draw([])
    if (traits[0]) traits[1] = rng.chance(0.5) ? draw([traits[0]]) : ''
    if (traits[1] && rng.chance(0.3)) traits[2] = draw([traits[0], traits[1]])
    return traits
  }

  // 1. Population générale : sexes pondérés par le classeur, âges 0-setupAgeMax
  for (let i = 0; i < taille - 2; i++) {
    const sexe: 'M' | 'F' = randomSexe()
    const c: Character = {
      id: nextId(),
      nom: rng.pick(noms),
      prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
      dynastie: C.p.dynastieRoturier,
      sexe,
      age: rng.int(0, Math.max(1, Math.round(C.p.setupAgeMax))),
      culture: player.culture,
      ville: rng.pick(player.villes).nom,
      orientation: randomOrientation(),
      traits: randomTraits(),
      statut: 'Sain',
      mariage: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      titre: null,
      education: null,
      fecondite: 0,
      ageMax: 0,
      armee: null,
    }
    c.ageMax = computeAgeMax(c, rng, C)
    pop.push(c)
  }

  // 2. Couple royal : un homme et une femme adultes (âges forcés à 20),
  //    chacun reçoit un nom distinct devenu sa dynastie, mariés.
  const roiName = rng.pick(noms)
  let reineName = rng.pick(noms.filter((x) => x !== roiName))
  if (!reineName) reineName = roiName + 'e'
  const roi: Character = {
    id: nextId(), nom: roiName, prenom: rng.pick(prenomsM), dynastie: roiName,
    sexe: 'M', age: 20, culture: player.culture, ville: player.villes[0].nom,
    orientation: (C.orientations[0]?.nom ?? 'Hétérosexuelle') as Character['orientation'],
    traits: randomTraits(), statut: 'Sain', mariage: null, mere: null, pere: null,
    pereBio: null, enfantBatard: false, titre: null, education: null,
    fecondite: 0, ageMax: 0, armee: null,
  }
  const reine: Character = {
    id: nextId(), nom: reineName, prenom: rng.pick(prenomsF), dynastie: reineName,
    sexe: 'F', age: 20, culture: player.culture, ville: player.villes[0].nom,
    orientation: (C.orientations[0]?.nom ?? 'Hétérosexuelle') as Character['orientation'],
    traits: randomTraits(), statut: 'Sain', mariage: null, mere: null, pere: null,
    pereBio: null, enfantBatard: false, titre: null, education: null,
    fecondite: 0, ageMax: 0, armee: null,
  }
  roi.mariage = `${reine.prenom} ${reine.nom}`
  reine.mariage = `${roi.prenom} ${roi.nom}`
  roi.ageMax = computeAgeMax(roi, rng, C)
  reine.ageMax = computeAgeMax(reine, rng, C)
  // Le Dirigeant est le roi si l'hérédité est masculine ou paritaire, sinon la reine
  if (heredite === 'Féminine') reine.titre = C.p.titreDirigeant
  else roi.titre = C.p.titreDirigeant
  pop.push(roi, reine)

  // 3. Les enfants sont répartis dans le couple royal
  for (const c of pop) {
    if (c.age >= C.p.adultAge || c === roi || c === reine) continue
    if (rng.chance(0.7)) {
      c.nom = roi.nom
      c.dynastie = heredite === 'Féminine' ? reineName : roi.nom
      c.mere = `${reine.prenom} ${reine.nom}`
      c.pere = `${roi.prenom} ${roi.nom}`
    }
  }

  // 4. Titres aléatoires pour les adultes non-Dirigeant, mariages des roturiers.
  //    Seuls les titres roturiers à attribution Manuelle du classeur sont
  //    tirés ici (aucun blocage : corrigez ensuite dans la table Population).
  const adultes = pop.filter((c) => c.age >= C.p.adultAge && c.titre !== C.p.titreDirigeant)
  const titresRoturiers = C.titres
    .filter((t) => !t.nobleSeul && (t.attribution === 'Manuelle' || t.attribution === ''))
    .map((t) => t.titre)
  for (const c of adultes) {
    if (!c.titre && titresRoturiers.length > 0 && rng.chance(0.6)) c.titre = rng.pick(titresRoturiers)
  }
  // ~le % demandé d'adultes roturiers se marient entre eux
  const celibataires = adultes.filter((c) => !c.mariage && !isNobleDyn(c.dynastie, C))
  const nbMariages = Math.floor((celibataires.length * pourcentMariages) / 100)
  const celibM = rng.shuffle(celibataires.filter((c) => c.sexe === 'M'))
  const celibF = rng.shuffle(celibataires.filter((c) => c.sexe === 'F'))
  for (let i = 0; i < Math.min(nbMariages, celibM.length, celibF.length); i++) {
    const h = celibM[i]
    const f = celibF[i]
    h.mariage = `${f.prenom} ${f.nom}`
    f.mariage = `${h.prenom} ${h.nom}`
  }

  // 5. Fécondités calculées pour les adultes
  const fakeState: GameState = {
    config: C.config,
    version: 1, seed: 0, rngState: 0, turn: 1, saison: 'Été', modDanger: 0,
    players: [player], population: { [player.n]: pop }, log: [], history: [],
  } as GameState
  for (const c of pop) {
    c.fecondite = computeFecondite(fakeState, player, c)
  }

  return pop
}

export function defaultSetups(): SetupLine[] {
  const C = cfgOf(undefined)
  const peuples = C.peuples.length > 0 ? C.peuples : ['Basiléens']
  return Array.from({ length: 8 }, (_, i) => ({
    nom: `Joueur ${i + 1}`,
    peuple: peuples[i % peuples.length],
    culture: C.cultures[i % Math.max(1, C.cultures.length)]?.nom ?? '',
    regime: C.regimes[0]?.nom ?? 'Monarchie',
    taillePopulation: 30,
    pourcentageMariages: 40,
    villes: i === 0 ? ['Capitale', 'Bourg'] : ['Capitale'],
  }))
}


// ══════════════════════════════════════════════════════════════════════
//  HARNais DE DIAGNOSTIC
// ══════════════════════════════════════════════════════════════════════
const __out: string[] = []
function dlog(...a: any[]) { __out.push(a.map(String).join(' ')) }
function clone<T>(x: T): T { return JSON.parse(JSON.stringify(x)) as T }

try {
  const st = createGame(defaultSetups(), 20261011, 'local')
  dlog('createGame OK —', st.players.length, 'joueurs')
  for (let t = 0; t < 4; t++) runTurn(st)
  dlog('4 tours OK — turn', st.turn, '· saison', st.saison, '· log', st.log.length, 'entrées')
  const C = cfgOf(st.config)
  const p1 = st.players[0]
  const pop1 = st.population[1] ?? []
  const cult = cultureDef(p1.culture, C.config)
  let cands = pop1.filter((c: any) => c.statut !== 'Décédé' && c.age >= C.p.adultAge && isNobleDyn(c.dynastie, C) && !c.armee && martialiteOk(cult?.martialite, c.sexe))
  if (cands.length < 2) {
    cands = pop1.filter((c: any) => c.statut !== 'Décédé' && c.age >= C.p.adultAge && !c.armee && martialiteOk(cult?.martialite, c.sexe))
    cands.forEach((c: any) => { c.dynastie = c.nom + '-nob' })
  }
  dlog('commandants disponibles pour J1 :', cands.length)
  for (let i = 0; i < 2 && i < cands.length; i++) {
    const cmd = cands[i]
    const nomA = 'Armée ' + (i + 1)
    p1.armees.push({ nom: nomA, puissanceCible: 90, puissance: C.p.puissanceGeneral, commandant: cmd.id, soldats: [], cible: null })
    cmd.titre = C.p.titreCommandant
    cmd.armee = nomA
  }
  runTurn(st)
  dlog('levée + recrutement OK —', p1.armees.map((a: any) => a.nom + ':' + a.soldats.length + ' soldats').join(', '))

  // dissolution idx=1 (mutator exact d'ArmiesPanel)
  {
    const s: any = clone(st)
    const x: any = s.players.find((q: any) => q.n === 1)
    const idx = 1
    const armee = x.armees[idx]
    const pers = s.population[1] ?? []
    for (const c of pers) { if (c.armee === armee.nom) { c.armee = null; c.titre = C.p.titreChasseur } }
    x.armees.splice(idx, 1)
    dlog('dissolution armée idx=1 : OK')
  }
  // renommage idx=0 (mutator exact d'ArmiesPanel)
  {
    const s: any = clone(st)
    const x: any = s.players.find((q: any) => q.n === 1)
    const ancien = x.armees[0].nom
    x.armees[0].nom = 'Garde royale'
    for (const c of s.population[1] ?? []) { if (c.armee === ancien) c.armee = 'Garde royale' }
    dlog('renommage armée idx=0 : OK')
  }
  runTurn(st)
  dlog('tour suivant (armées en place) : OK — turn', st.turn)

  dlog('')
  dlog('═══ SCÉNARIOS DE DÉGRADATION (runTurn sur état cloné puis dégradé) ═══')
  const scen: { nom: string; apply: (s: any) => void }[] = [
    { nom: 'population supprimée', apply: (s) => { delete s.population } },
    { nom: 'population = {}', apply: (s) => { s.population = {} } },
    { nom: 'player.armees supprimé', apply: (s) => { s.players.forEach((p: any) => delete p.armees) } },
    { nom: 'player.villes supprimé', apply: (s) => { s.players.forEach((p: any) => delete p.villes) } },
    { nom: 'ville.batiments supprimé', apply: (s) => { s.players.forEach((p: any) => p.villes.forEach((v: any) => delete v.batiments)) } },
    { nom: 'ville.taxes supprimé', apply: (s) => { s.players.forEach((p: any) => p.villes.forEach((v: any) => delete v.taxes)) } },
    { nom: 'char.traits supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.traits) } },
    { nom: 'char.statut supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.statut) } },
    { nom: 'char.ageMax supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.ageMax) } },
    { nom: 'char.dynastie supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.dynastie) } },
    { nom: 'char.ville supprimée (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.ville) } },
    { nom: 'char.orientation supprimée (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.orientation) } },
    { nom: 'char.id supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.id) } },
    { nom: 'char.mariage supprimé (tous J1)', apply: (s) => { (s.population[1] ?? []).forEach((c: any) => delete c.mariage) } },
    { nom: 'state.log supprimé', apply: (s) => { delete s.log } },
    { nom: 'state.history supprimé', apply: (s) => { delete s.history } },
    { nom: 'state.rngState supprimé', apply: (s) => { delete s.rngState } },
    { nom: 'player.resources supprimé', apply: (s) => { s.players.forEach((p: any) => delete p.resources) } },
    { nom: 'config supprimée', apply: (s) => { delete s.config } },
    { nom: 'config.cultures = []', apply: (s) => { s.config.cultures = [] } },
    { nom: 'config.genres = []', apply: (s) => { s.config.genres = [] } },
    { nom: 'config.orientations = []', apply: (s) => { s.config.orientations = [] } },
    { nom: 'config.titres = []', apply: (s) => { s.config.titres = [] } },
    { nom: 'config.traits = []', apply: (s) => { s.config.traits = [] } },
    { nom: 'config.ressources = []', apply: (s) => { s.config.ressources = [] } },
    { nom: 'config.banquesNoms = []', apply: (s) => { s.config.banquesNoms = [] } },
    { nom: 'config.peuples = []', apply: (s) => { s.config.peuples = [] } },
    { nom: 'config.educations = []', apply: (s) => { s.config.educations = [] } },
    { nom: 'config.dynasties = []', apply: (s) => { s.config.dynasties = [] } },
    { nom: 'config.events = []', apply: (s) => { s.config.events = [] } },
    { nom: 'config.eventEffets = []', apply: (s) => { s.config.eventEffets = [] } },
    { nom: 'config.dynastieEffets = []', apply: (s) => { s.config.dynastieEffets = [] } },
    { nom: 'config.batiments = []', apply: (s) => { s.config.batiments = [] } },
    { nom: 'player.n décalés (+8)', apply: (s) => { s.players.forEach((p: any) => { p.n = p.n + 8 }) } },
    { nom: 'vassalDe = 99 (suzerain fantôme)', apply: (s) => { s.players[0].vassalDe = 99 } },
    { nom: 'armee.soldats supprimé', apply: (s) => { s.players.forEach((p: any) => (p.armees ?? []).forEach((a: any) => delete a.soldats)) } },
    { nom: 'armee.commandant supprimé', apply: (s) => { s.players.forEach((p: any) => (p.armees ?? []).forEach((a: any) => delete a.commandant)) } },
    { nom: 'armee.nom supprimé', apply: (s) => { s.players.forEach((p: any) => (p.armees ?? []).forEach((a: any) => delete a.nom)) } },
    { nom: 'armee.puissanceCible supprimé', apply: (s) => { s.players.forEach((p: any) => (p.armees ?? []).forEach((a: any) => delete a.puissanceCible)) } },
    { nom: 'player.recap corrompu (=  {})', apply: (s) => { s.players.forEach((p: any) => { p.recap = {} }) } },
  ]
  for (const sc of scen) {
    const s = clone(st)
    try { sc.apply(s) } catch (e: any) { dlog('  (setup scénario échoué)', sc.nom, String(e?.message).slice(0, 80)); continue }
    try { runTurn(s); dlog('  [OK sans erreur] ', sc.nom) }
    catch (e: any) { dlog('  [ÉCHEC runTurn]', sc.nom, '→', String(e?.message ?? e).slice(0, 130)) }
  }

  dlog('')
  dlog('═══ DISSOLUTION / RENOMMAGE (mutators ArmiesPanel) sur états dégradés ═══')
  const scen2: { nom: string; apply: (s: any) => void }[] = [
    { nom: 'population supprimée', apply: (s) => { delete s.population } },
    { nom: 'player.armees supprimé', apply: (s) => { s.players.forEach((p: any) => delete p.armees) } },
    { nom: 'état sain (témoin)', apply: () => {} },
  ]
  for (const sc of scen2) {
    const s: any = clone(st)
    sc.apply(s)
    try {
      const x: any = s.players.find((q: any) => q.n === 1)
      const idx = 1
      const armee = x.armees[idx]
      const pers = s.population[1] ?? []
      for (const c of pers) { if (c.armee === armee.nom) { c.armee = null; c.titre = C.p.titreChasseur } }
      x.armees.splice(idx, 1)
      const ancien = x.armees[0].nom
      x.armees[0].nom = 'Garde royale'
      for (const c of s.population[1] ?? []) { if (c.armee === ancien) c.armee = 'Garde royale' }
      dlog('  [OK sans erreur] ', sc.nom)
    } catch (e: any) { dlog('  [ÉCHEC mutator]', sc.nom, '→', String(e?.message ?? e).slice(0, 130)) }
  }
} catch (e: any) {
  dlog('FATAL :', String(e?.stack ?? e).slice(0, 2000))
}
console.log(__out.join('\n'))
