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
  adulteryRate: number
  /** Migration scolaire : enfant sans Professeur dans sa ville → ville
   *  avec Professeur du même joueur. */
  migrationEcole: number
  /** …ville avec Professeur du suzerain (ou du suzerain du suzerain). */
  migrationSuzerain: number
  /** …ville avec Professeur de n'importe quel joueur. */
  migrationMonde: number
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
  // ── Maladie (rework habitants 2026-10-20 : Gompertz, plus d'âge-
  //    plafond — la maladie est la SEULE cause de mort) ──
  /** Probabilité de contracter la maladie ce tour :
   *  min(maladieCap, maladieBase × exp(maladiePente × âge)),
   *  calibrée Monte-Carlo pour une espérance de vie ≈ 60 ans. */
  maladieBase: number
  maladiePente: number
  maladieCap: number
  /** Modificateur de contraction pour une femme enceinte. */
  modMaladieEnceinte: number
  /** Guérison par tour d'un malade : probaGuerison − modGuerisonAge × âge
   *  (un malade qui re-contracte la maladie meurt). */
  probaGuerison: number
  modGuerisonAge: number
  // ── Métiers (caps par habitation, rework habitants 2026-10-20) ──
  /** Capacité maximale de Chasseurs dans une habitation « Ville »
   *  (arbitre 2026-10-20 : caps séparées selon le type). */
  capMetierChasseurVille: number
  /** Capacité maximale de Chasseurs dans un « Château ». */
  capMetierChasseurChateau: number
  /** Garnison STATIQUE accordée par un Garde en poste (vague 3a :
   *  « la Garnison n'est jamais par tour » — valeur d'état de la ville,
   *  retirée si le Garde part ou meurt). */
  garnisonParGarde: number
  // ── Éducation ──
  chanceEducRoturier: number
  chanceEducNoble: number
  professeurBaseChance: number
  profBonusEduc: number
  // ── Mariage ──
  mariageRoturiers: number
  mariageNobles: number
  mariageMesalliance: number
  mariageBonusMetier: number
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
  /** Prix de levée d'une armée : Or par tranche de armeePriXPuissance points de force. */
  armeePrixOr: number
  /** Prix de levée : taille de la tranche de points de force facturée. */
  armeePriXPuissance: number
  /** ANCIEN plafond d'armées — OBSOLÈTE (retour joueur 2026-10-18 :
   *  plus aucun hardcap d'armées). Champ conservé pour la compatibilité
   *  des sauvegardes existantes, mais ignoré par le moteur et l'UI. */
  maxArmees: number
  /** Nombre maximal de marchands par joueur (retour Thibaut : 0 par défaut,
   *  certaines techs en octroient). */
  maxMarchands: number
  // ── Vassaux ──
  vassalPrelevement: number  // part des revenus d'habitants (Or) reversée au suzerain
  // ── Commerce (marqueur (t)) ──
  /** Or par tour généré par une route commerciale de marchand, pour
   *  CHACUN des deux joueurs reliés (retour Thibaut 2026-10-15). */
  marchandOrTour: number
  // ── Noms des entités système (chaînes) ──
  metierDirigeant: string
  metierGouverneur: string
  metierProfesseur: string
  metierChasseur: string
  metierSoldat: string
  metierCommandant: string
  metierGarde: string
  metierBanquier: string
  metierTroubadour: string
  traitBatard: string
  traitConsanguin: string
  traitObstine: string
  dynastieRoturier: string
  // ── Système ──
  maxLog: number
  maxHistory: number
  saisonLongueur: number
  // ── Effets chiffrés des événements (multiplicateurs par niveau) ──
  evMultFaible: number
  evMultMoyenne: number
  evMultForte: number
  evMultExtreme: number
  dangerSeuilForte: number
  dangerSeuilExtreme: number
  proxRiviereNourriture: number
  proxMerNourriture: number
}

export const DEFAULT_PARAMS: GameParams = {
  adultAge: 16,
  setupAgeMax: 50,
  adulteryRate: 0.03,
  migrationEcole: 0.10,
  migrationSuzerain: 0.02,
  migrationMonde: 0.01,
  consoNourrParHab: 1,
  gainsCrediteStock: 1,
  fertBaseRate: 1.5,
  fertSingleFactor: 0.1,
  fertTwinsRate: 0.05,
  fertTripletsRate: 0.001,
  fertTraitFactorMin: 0,
  fertTraitFactorMax: 1.6,
  cultureFertBase: 1,
  maladieBase: 0.0025,
  maladiePente: 0.08,
  maladieCap: 0.9,
  modMaladieEnceinte: 0.03,
  probaGuerison: 0.25,
  modGuerisonAge: 0.003,
  capMetierChasseurVille: 50,
  capMetierChasseurChateau: 25,
  garnisonParGarde: 10,
  chanceEducRoturier: 0.08,
  chanceEducNoble: 0.15,
  professeurBaseChance: 0.9,
  profBonusEduc: 0.1,
  mariageRoturiers: 0.3,
  mariageNobles: 0.15,
  mariageMesalliance: 0.03,
  mariageBonusMetier: 0.1,
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
  // Effet des taxes Faibles/Fortes : ±25 % (retour Thibaut, marqueur
  //  (z) — avant ±50 % ; les configs existantes encore aux anciens
  //  défauts sont migrées ciblément par cfgOf, champ taxes25).
  taxOrFaibles: 0.75,
  taxOrHautes: 1.25,
  taxNaissFaibles: 1.25,
  taxNaissHautes: 0.75,
  puissanceGeneral: 45,
  puissanceSoldat: 15,
  soldatAgeMin: 16,
  soldatAgeMax: 30,
  armeePrixOr: 1,
  armeePriXPuissance: 2,
  maxArmees: 2,
  maxMarchands: 0,
  vassalPrelevement: 0.5,
  marchandOrTour: 4,
  proxRiviereNourriture: 12,
  proxMerNourriture: 7,
  metierDirigeant: 'Dirigeant',
  metierGouverneur: 'Gouverneur',
  metierProfesseur: 'Professeur',
  metierChasseur: 'Chasseur',
  metierSoldat: 'Soldat',
  metierCommandant: 'Commandant',
  metierGarde: 'Garde',
  metierBanquier: 'Banquier',
  metierTroubadour: 'Troubadour',
  traitBatard: 'Bâtard',
  traitConsanguin: 'Consanguin',
  traitObstine: 'Obstiné',
  dynastieRoturier: 'Roturier',
  maxLog: 4000,
  maxHistory: 120,
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
  metierHeritierStr: string
}
export const DEFAULT_PARAM_STRINGS: GameParamStrings = {
  metierHeritierStr: 'Héritier',
}

/** Groupes + libellés pour l'éditeur de l'onglet Paramètres. */
export const PARAM_META: {
  key: keyof GameParams
  label: string
  groupe: string
  unite?: string
  aide?: string
}[] = [
  { key: 'adultAge', label: 'Âge adulte', groupe: 'Population', aide: 'Âge à partir duquel un personnage reçoit un métier et peut se marier.' },
  { key: 'adulteryRate', label: 'Taux d\'adultère', groupe: 'Population', unite: 'proba' },
  { key: 'migrationEcole', label: 'Migration scolaire (même joueur)', groupe: 'Population', unite: 'proba', aide: 'Un enfant sans éducation dont la ville n\'a pas de Professeur part vers une ville avec Professeur du même joueur.' },
  { key: 'migrationSuzerain', label: 'Migration scolaire (suzerain)', groupe: 'Population', unite: 'proba', aide: '…vers une ville avec Professeur de son suzerain, ou du suzerain de son suzerain.' },
  { key: 'migrationMonde', label: 'Migration scolaire (monde)', groupe: 'Population', unite: 'proba', aide: '…vers une ville avec Professeur de n\'importe quel joueur.' },
  { key: 'consoNourrParHab', label: 'Consommation Nourriture / habitant vivant', groupe: 'Population' },
  { key: 'gainsCrediteStock', label: 'Gains de population crédités au stock (1 = oui)', groupe: 'Population' },
  { key: 'fertBaseRate', label: 'Fécondité de base (conception / tour)', groupe: 'Fécondité' },
  { key: 'fertSingleFactor', label: 'Facteur fécondité célibataire', groupe: 'Fécondité' },
  { key: 'fertTwinsRate', label: 'Proba jumeaux', groupe: 'Fécondité', unite: 'proba' },
  { key: 'fertTripletsRate', label: 'Proba triplés', groupe: 'Fécondité', unite: 'proba' },
  { key: 'fertTraitFactorMin', label: 'Facteur traits — plancher', groupe: 'Fécondité' },
  { key: 'fertTraitFactorMax', label: 'Facteur traits — plafond', groupe: 'Fécondité' },
  { key: 'cultureFertBase', label: 'Facteur fécondité culturel de base', groupe: 'Fécondité' },
  { key: 'maladieBase', label: 'Maladie — probabilité de base (Gompertz)', groupe: 'Maladie', unite: 'proba', aide: 'Rework 2026-10-20 : plus d\'âge-plafond — chaque tour, probabilité de contracter la maladie = min(cap, base × exp(pente × âge)) ; calibrée pour une espérance de vie ≈ 60 ans.' },
  { key: 'maladiePente', label: 'Maladie — pente (Gompertz)', groupe: 'Maladie' },
  { key: 'maladieCap', label: 'Maladie — plafond de probabilité', groupe: 'Maladie' },
  { key: 'modMaladieEnceinte', label: 'Maladie — modificateur femme enceinte', groupe: 'Maladie' },
  { key: 'probaGuerison', label: 'Probabilité de guérison (base)', groupe: 'Maladie', unite: 'proba' },
  { key: 'modGuerisonAge', label: 'Guérison — modificateur par année d\'âge', groupe: 'Maladie' },
  { key: 'capMetierChasseurVille', label: 'Capacité Chasseurs par ville « Ville »', groupe: 'Métiers' },
  { key: 'capMetierChasseurChateau', label: 'Capacité Chasseurs par « Château »', groupe: 'Métiers' },
  { key: 'garnisonParGarde', label: 'Garnison par Garde en poste', groupe: 'Métiers' },
  { key: 'chanceEducRoturier', label: 'Chance d\'éducation — roturier', groupe: 'Éducation', unite: 'proba' },
  { key: 'chanceEducNoble', label: 'Chance d\'éducation — noble', groupe: 'Éducation', unite: 'proba' },
  { key: 'professeurBaseChance', label: 'Chance de base d\'attribution Professeur', groupe: 'Éducation' },
  { key: 'profBonusEduc', label: 'Bonus d\'éducation par professeur supplémentaire', groupe: 'Éducation' },
  { key: 'mariageRoturiers', label: 'Proba mariage roturier × roturier', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageNobles', label: 'Proba mariage noble × noble', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageMesalliance', label: 'Proba mésalliance noble × roturier', groupe: 'Mariage', unite: 'proba' },
  { key: 'mariageBonusMetier', label: 'Bonus par époux avec métier (non-Chasseur)', groupe: 'Mariage' },
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
  { key: 'taxOrFaibles', label: 'Taxes faibles — multiplicateur sur toutes les ressources', groupe: 'Taxes' },
  { key: 'taxOrHautes', label: 'Taxes fortes — multiplicateur sur toutes les ressources', groupe: 'Taxes' },
  { key: 'marchandOrTour', label: 'Marchand — Or / tour par route commerciale', groupe: 'Commerce', aide: 'Or gagné CHAQUE tour par les DEUX joueurs reliés par une route de marchand (propriétaire + ville ciblée).' },
  { key: 'taxNaissFaibles', label: 'Taxes faibles — multiplicateur naissances', groupe: 'Taxes' },
  { key: 'taxNaissHautes', label: 'Taxes fortes — multiplicateur naissances', groupe: 'Taxes' },
  { key: 'proxRiviereNourriture', label: 'Proximité rivière — Nourriture / tour', groupe: 'Villes', aide: 'Bonus automatique de chaque ville « au bord d\'une rivière » (marqueur (y)).' },
  { key: 'proxMerNourriture', label: 'Proximité mer — Nourriture / tour', groupe: 'Villes', aide: 'Bonus automatique de chaque ville « au bord de la mer » (marqueur (y)).' },
  { key: 'puissanceGeneral', label: 'Puissance d\'un commandant', groupe: 'Armées' },
  { key: 'puissanceSoldat', label: 'Puissance d\'un soldat', groupe: 'Armées' },
  { key: 'armeePrixOr', label: 'Prix de levée — Or par tranche de force', groupe: 'Armées', aide: 'Levée d\'une armée : ce prix est facturé pour chaque tranche de points de force de la puissance cible (règle du classeur : 1 Or tous les 2 points) — payé UNE FOIS à la levée, pas d\'entretien.' },
  { key: 'armeePriXPuissance', label: 'Prix de levée — points de force par tranche', groupe: 'Armées' },
  { key: 'maxMarchands', label: 'Nombre maximal de marchands par joueur', groupe: 'Armées', aide: '0 par défaut. Les règles qui accordent un marchand supplémentaire l\'augmentent.' },
  { key: 'soldatAgeMin', label: 'Âge minimal de recrutement', groupe: 'Armées' },
  { key: 'soldatAgeMax', label: 'Âge maximal de recrutement', groupe: 'Armées' },
  { key: 'vassalPrelevement', label: "Part des revenus d'habitants reversée au suzerain", groupe: 'Vassaux', unite: 'proportion', aide: "Un vassal prête serment à un autre joueur : à chaque fin de tour, il reverse cette part des gains d'Or de ses habitants à son suzerain (0,5 = 50 %)." },
  { key: 'maxLog', label: 'Taille maximale du journal', groupe: 'Système' },
  { key: 'maxHistory', label: 'Tours d’historique conservés (snapshots)', groupe: 'Système', aide: 'Chaque tour ajoute un snapshot par joueur (stocks + apports). Les plus anciens au-delà du plafond sont retirés.' },
  { key: 'saisonLongueur', label: 'Durée d\'une saison (tours)', groupe: 'Système', aide: 'Un tour = 2 ans de temps de jeu ; Été/Hiver alternent toutes les N saisons… modifiable à volonté.' },
  { key: 'evMultFaible', label: 'Multiplicateur événement — faible (dé 1-5)', groupe: 'Événements' },
  { key: 'evMultMoyenne', label: 'Multiplicateur événement — moyenne (6-8)', groupe: 'Événements' },
  { key: 'evMultForte', label: 'Multiplicateur événement — forte (9-10)', groupe: 'Événements' },
  { key: 'evMultExtreme', label: 'Multiplicateur événement — extrême (11+)', groupe: 'Événements' },
  { key: 'dangerSeuilForte', label: 'Seuil de dangerosité — effet fort', groupe: 'Événements' },
  { key: 'dangerSeuilExtreme', label: 'Seuil de dangerosité — effet extrême', groupe: 'Événements' },
]

export const PARAM_STRINGS_META: { key: keyof GameParamStrings; label: string; groupe: string }[] = [
  { key: 'metierHeritierStr', label: 'Nom du métier Héritier', groupe: 'Noms système' },
]

/** Fusionne les paramètres d'une partie avec les défauts (tolérant aux clés manquantes). */
// Rework habitants 2026-10-20 : les clés titreXxx sont devenues
//  metierXxx (et mariageBonusTitre → mariageBonusMetier). Les configs
//  existantes embarquent les anciennes clés — traduction ciblée,
//  IDEMPOTENTE : la nouvelle clé, si déjà présente, prime ; l'ancienne
//  n'écrase jamais, quel que soit l'ordre des clés.
const RENOMMAGES_PARAMS: Record<string, string> = {
  titreDirigeant: 'metierDirigeant',
  titreGouverneur: 'metierGouverneur',
  titreProfesseur: 'metierProfesseur',
  titreChasseur: 'metierChasseur',
  titreSoldat: 'metierSoldat',
  titreCommandant: 'metierCommandant',
  titreHeritierStr: 'metierHeritierStr',
  mariageBonusTitre: 'mariageBonusMetier',
}

export function mergeParams(custom: Record<string, unknown> | undefined): GameParams & GameParamStrings {
  const trad: Record<string, unknown> = {}
  if (custom && typeof custom === 'object') {
    for (const [k, v] of Object.entries(custom)) {
      if (v === undefined || v === null || v === '') continue
      const cle = RENOMMAGES_PARAMS[k] ?? k
      //  une clé ANCIENNE (renommée) ne doit jamais écraser la clé
      //  nouvelle déjà fournie — la nouvelle prime (rework habitants v3).
      if (RENOMMAGES_PARAMS[k] !== undefined && trad[cle] !== undefined) continue
      trad[cle] = v
    }
  }
  const out: Record<string, unknown> = { ...DEFAULT_PARAMS, ...DEFAULT_PARAM_STRINGS, ...trad }
  return out as unknown as GameParams & GameParamStrings
}
