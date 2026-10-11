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
