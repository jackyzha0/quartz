// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Configuration par défaut
//  Toutes les données de référence du classeur Excel (feuilles init,
//  JSON, Metiers, traits_genetiques, Culture, Peuples, Ville, Bat,
//  Progrès, Tourisme, Cités L, BDD_pop, Accueil) + paramètres moteur.
//  Tout est stocké DANS la partie (state.config) et modifiable à chaud
//  depuis l'onglet « Paramètres » — aucun redémarrage nécessaire.
// ══════════════════════════════════════════════════════════════════════

import refJson from './referentiels.json'
import { mergeParams, type GameParams, type GameParamStrings } from './params'

// ── Types des référentiels (issus du classeur) ─────────────────────────

export interface MetierDef {
  metier: string
  education: string
  valeur1: number
  ressource1: string
  valeur2: number
  ressource2: string
  description: string
  nobleSeul: boolean
  regleGenre: string
  attribution: string
  /** Capacité maximale par ville (rework habitants 2026-10-20, vague
   *  3b) : absent = illimité — la cap de base vient du rang
   *  d'habitation, les paramètres capMetierChasseur* sont supprimés. */
  /** Production UNIQUEMENT pendant l'été (vague 3a — ex. Fermier
   *  « +5 Nourriture par tour en été ») : les gains valeur1/ressource1 et
   *  valeur2/ressource2 ne sont crédités qu'en saison d'Été. */
  ete?: boolean
  capParVille?: number
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
  homoAutorisee: boolean
  fertFactor: number
  reglePays: string
  reglePerso: string
  /** Règles chiffrées appliquées AUTOMATIQUEMENT par le moteur
   *  (engine/regimes.ts, engine/metiers.ts) : la capitale génère +N d'une
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
  /** métiers disponibles à la base du rang (vague 3b, ex. « 50 Chasseurs, 2 Gardes ») */
  metiersDisponibles: string
  /** domiciles disponibles (affichage seul, ex. « 50 maisons, 10 Auberge ») */
  domicilesDisponibles: string
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
  famille: string      // Militaire / Economique / Guilde / Capitale / Merveille / ''
  nom: string
  /** Merveilles ET aménagements tiers 2/3 : rang d'habitation
   *  MINIMUM requis pour construire/améliorer (1 = Hameau/Motte…,
   *  2 = Cité/Donjon, 3 = Grande Cité/Forteresse). Champ optionnel. */
  rangMinHabitation?: number
  terrain?: string     // aménagements uniquement
  /** Aménagements tiers 2/3 (vague 3c, arbitrage Thibaut
   *  2026-10-22) : nom de l'aménagement de TIER INFÉRIEUR que cette
   *  AMÉLIORATION remplace (un exemplaire de la même ville) —
   *  « Baleinier (tier 2) » remplace « Baleinier », « Baleinier
   *  (tier 3) » remplace « Baleinier (tier 2) ». Champ optionnel :
   *  absent = tier 1 (aménagement de base, constructible tel quel). */
  remplaceAmenagement?: string
  cout: string
  production: string
  description: string
  /** Effets STRUCTURÉS (marqueur (s)) — source du moteur quand présents ;
   *  sinon repli sur l'analyse du texte exact (anciennes configs). */
  effets?: EffetConstruction[]
  /** Emplacements de métiers (vague 3a, arbitrage Thibaut 2026-10-21) :
   *  la production DIRECTE des aménagements tier 1 est remplacée par des
   *  postes — chaque aménagement présent dans une ville octroie
   *  `places` postes de `metier` (cap par ville = somme des emplacements,
   *  + cap par défaut du Chasseur). Champ optionnel : aucun emplacement. */
  emplacements?: EmplacementDef[]
}
/** Un emplacement de métier accordé par une construction (vague 3a). */
export interface EmplacementDef {
  metier: string
  places: number
}
/** Effet AUTOMATIQUE d'une technologie de progrès (paramétrable dans
 *  Référentiels → Progrès, champ « effets » de chaque tech) :
 *    gain               — crédit unique au déblocage (« recevez 20 Or »),
 *    prodCapitale       — +N ressource par tour (capitale du joueur),
 *    prodParHabitation  — +N ressource par tour et par habitation,
 *    prodParMetier       — +N ressource par tour et par habitant titré,
 *    prodParAmenagement — +N ressource par tour et par aménagement listé,
 *    garnison           — +N garnison statique (capitale ou habitations).
 *  AIDE DE JEU UNIQUEMENT (arbitrage Thibaut 2026-10-14) : AUCUN effet
 *  moteur — le résumé est affiché sous la tech, tout s'applique au
 *  plateau (bataille, coûts de construction, limites… inclus). */
export interface EffetProgres {
  type: 'gain' | 'prodCapitale' | 'prodParHabitation' | 'prodParMetier' | 'prodParAmenagement' | 'garnison'
  /** ressource concernée (tous les types sauf garnison) */
  ressource?: string
  /** valeur de l'effet (négative = malus) */
  montant: number
  /** metier des habitants concernés (prodParMetier) */
  metier?: string
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
  metiers: MetierDef[]
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
  metiersEffets: { metier: string; effet: string; revocation: string }[]
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
  /** Tampon de convergence (marqueur (x), 2026-10-15) : une config
   *  portant SCHEMA_VERSION_CONFIG courant a été fusionnée sur les
   *  défauts + migrée une fois pour toutes (convergerConfig) — elle
   *  n'est PLUS re-migrée à chaque lecture, pour que les entrées du
   *  référentiel SUPPRIMÉES ou RENOMMÉES dans Paramètres y persistent
   *  (elles étaient jusque-là « ressuscitées » à chaque cfgOf par les
   *  migrations de complétion : impossible de supprimer un ministère,
   *  un bâtiment… par défaut). Champ optionnel : absentes des
   *  anciennes sauvegardes, elles migrent au premier passage. */
  schemaVersion?: number
  /** Marqueur (z) : l'effet des taxes Faibles/Fortes a été passé de
   *  ±50 % à ±25 % — ce champ trace la migration ciblée des
   *  paramètres de taxes (cfgOf), SANS toucher au tampon
   *  schemaVersion (les suppressions/renommages du référentiel
   *  persistent — règle (x)). */
  taxes25?: boolean
  /** Migration renommages de techs doublons (2026-10-16) — rejouée
   *  tant que false/absente, puis tamponnée. */
  renommagesTechs2026?: boolean
  /** Migration techs manquantes (2026-10-16) — slots vides complétés
   *  depuis le référentiel, descriptions corrigées. */
  techsManquantes2026?: boolean
  /** Migration Laurier IV Militaire (2026-10-16) — condition mise à
   *  jour « Contrôler 6 des habitations de départ ». */
  laurier4Militaire2026?: boolean
  /** Migration Sylvains (2026-10-16) — fiche et peuple ré-ajoutés
   *  si absents (le tampon schemaVersion avait avalé leur ajout). */
  sylvains2026?: boolean
  /** Migration valeurs de Nourriture (2026-10-16) — Grange 20, Silo 35,
   *  Moulin/Guilde 60, Champ 15 été, Rizière 20 été, Pâturage +1 Bétail
   *  +4 Nourr. Mise à jour uniquement des anciennes valeurs exactes. */
  valeursNourriture2026?: boolean
  /** Migration pontificats (2026-10-17) — retrait de la mention
   *  « crédité automatiquement » du palier 220 Tourisme : tous les
   *  paliers sont des aides de jeu au plateau (décision Thibaut). */
  pontificats2026?: boolean
  /** Migration Muraille +40 Garnison (2026-10-17) — les configs
   *  tamponnées avant le passage +10 Défense → +40 Garnison gardent
   *  l'ancienne description (la migration techsManquantes2026 était
   *  déjà jouée et ne se rejoue pas). Ne remplace QUE l'ancien
   *  texte exact — les éditions personnalisées sont préservées. */
  muraille40_2026?: boolean
  /** Migration slots vides (2026-10-18) — TOUT slot vide d'un arbre
   *  existant reçoit la tech du référentiel à jour (clé : nom+âge
   *  de l'arbre, indépendant des index). Couvre les trous laissés
   *  par les techs ajoutées après la création de la partie. */
  slotsVides2026?: boolean
  /** Suppression de la martialité (arbitrage Thibaut 2026-10-21) :
   *  Soldat/Commandant passent de regleGenre « Martialité » à vide
   *  (aucune restriction de sexe), la clé martialite disparaît des
   *  cultures — l'HÉRÉDITÉ est conservée. Marqueur (z) : migration
   *  ciblée (cfgOf) indépendante du tampon schemaVersion. */
  martialiteSupprimee?: boolean
  /** Rework métiers & aménagements vague 3a (arbitrage Thibaut
   *  2026-10-21) : 24 métiers (renommages Artisan→Commerçant,
   *  Chercheur→Scientifique, Sportif→Garde, Propagandiste supprimé,
   *  nouveaux métiers de production), gains recalibrés SANS éducation,
   *  et production des 14 aménagements tier 1 remplacée par des
   *  emplacements. Marqueur (z) : migration ciblée (cfgOf)
   *  indépendante du tampon schemaVersion. */
  metiersAmenagements2026?: boolean
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
  const pal = C?.couleurs ?? migrerCouleurs()
  return pal.joueurs?.[n - 1] || COULEURS_JOUEURS_DEFAUT[(n - 1) % COULEURS_JOUEURS_DEFAUT.length]
}

/** Couleur d'une ressource (ou pseudo-ressource « Habitants ») —
 *  palette de la partie si fournie, gris neutre sinon. */
export function couleurRessource(nom: string, C?: Cfg): string {
  const pal = C?.couleurs ?? migrerCouleurs()
  return pal.ressources?.[nom] || '#9aa4ad'
}

/** Fond teinté d'une ressource pour les LIGNES de tableaux (page
 *  Pays : récap par tour, taxes des villageois, production des
 *  villes) : couleur de la ressource + transparence réglable
 *  (0 = couleur pleine, 100 = invisible). */
export function fondRessource(nom: string, C?: Cfg): string {
  const pal = C?.couleurs ?? migrerCouleurs()
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

function normaliserMetiers(): MetierDef[] {
  return ref.metiers.map((t: any) => ({
    metier: t.metier,
    education: t.education || '',
    valeur1: Number(t.valeur1) || 0,
    ressource1: t.ressource1 || '',
    valeur2: Number(t.valeur2) || 0,
    ressource2: t.ressource2 || '',
    description: t.description || '',
    nobleSeul: !!t.nobleSeul,
    regleGenre: (t.regleGenre === 'vide' ? '' : t.regleGenre) || '',
    attribution: t.attribution || '',
    capParVille: t.capParVille === undefined ? undefined : Number(t.capParVille),
    ete: t.ete === true ? true : undefined,
  }))
}

function normaliserCultures(): CultureDef[] {
  return ref.cultures.map((c: any) => ({
    nom: c.nom,
    heredite: c.heredite,
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
  metiers: normaliserMetiers(),
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
  metiersEffets: ref.metiersEffets,
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
  { nom: 'Baronnie', coutOr: 0, coutNourriture: 0, serments: 0, ministres: 1, bonus: '' },
  { nom: 'Comté', coutOr: 20, coutNourriture: 40, serments: 1, ministres: 2, bonus: '' },
  { nom: 'Duché', coutOr: 30, coutNourriture: 60, serments: 2, ministres: 3, bonus: '' },
  { nom: 'Royaume', coutOr: 50, coutNourriture: 100, serments: 3, ministres: 4, bonus: '' },
  { nom: 'Empire', coutOr: 100, coutNourriture: 200, serments: 4, ministres: 5, bonus: '' },
]

// ── Accès à la configuration effective d'une partie ───────────────────

export interface Cfg {
  p: GameParams & GameParamStrings
  ressources: string[]
  educations: string[]
  metiers: MetierDef[]
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

/** Table des constructions (bâtiments / aménagements) d'une
 *  configuration existante : les entrées du référentiel
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

/** (v4, retour Thibaut 2026-10-22) : RÉALIGNEMENT des aménagements
 *  d'une ancienne configuration sur le référentiel courant. Les configs
 *  sauvegardées AVANT le rework « production → emplacements » (vague
 *  3a, 2026-10-21) portent encore les ANCIENNES descriptions (« +2 Or
 *  et +10 Nourriture par tour. ») ET les anciens effets structurés
 *  (encore lus par le moteur — l'aménagement continuait de produire !)
 *  sans champ `emplacements` : la partie en cours affichait donc des
 *  aménagements mensongers et hors rework, alors que les tiers 2/3
 *  (ajoutés neufs par migrerConstructions) étaient conformes — un
 *  mélange incohérent. migrerConstructions n'ajoutant que les
 *  entrées MANQUANTES par nom, les entrées existantes restaient figées.
 *  Arbitrage : un aménagement du référentiel est une donnée de
 *  RÉFÉRENCE, pas de personnalisation — toute entrée de même nom (et
 *  de catégorie Aménagement) est REMPLACÉE par l'entrée courante du
 *  référentiel (description, production, coût, terrain, emplacements,
 *  effets, rangMinHabitation, remplaceAmenagement). Les aménagements
 *  PERSO (noms hors référentiel) sont conservés tels quels. */
export function realignerAmenagements(
  list: ConstructionRef[] | undefined, defauts: ConstructionRef[],
): ConstructionRef[] {
  if (!Array.isArray(list)) return defauts
  const parNom = new Map(
    defauts.filter((d) => d.categorie === 'Aménagement').map((d) => [d.nom, d]),
  )
  return list.map((c) =>
    (c.categorie === 'Aménagement' ? parNom.get(c.nom) : undefined) ?? c)
}

/** Table des types d'habitation (Ville / Château) d'une configuration
 *  existante — défauts du classeur si absents ou vides. */
export function migrerTypesHabitation(list: HabitationDef[] | undefined): HabitationDef[] {
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_CONFIG.typesHabitation
  // Vague 3b (2026-10-22) : les configs sauvegardées avant le rework
  //  portent consommation/garnison au lieu de metiersDisponibles/
  //  domicilesDisponibles — les colonnes manquantes sont complétées
  //  depuis la ligne du DEFAULT_CONFIG de même (type, rang) ; les
  //  anciens champs sont ignorés (consommation et garnison de base
  //  supprimées par arbitrage).
  for (const d of list) {
    if (d.metiersDisponibles === undefined || d.domicilesDisponibles === undefined) {
      const ref = DEFAULT_CONFIG.typesHabitation.find((t) => t.type === d.type && t.rang === d.rang)
      d.metiersDisponibles = d.metiersDisponibles ?? ref?.metiersDisponibles ?? ''
      d.domicilesDisponibles = d.domicilesDisponibles ?? ref?.domicilesDisponibles ?? ''
    }
  }
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

/** Version de schéma de la configuration (marqueur (x), 2026-10-15).
 *  Une configuration convergée (fusion + migrations + tampon
 *  schemaVersion = ce numéro) n'est plus re-migrée à chaque cfgOf —
 *  les migrations de complétion (migrerMinisteres, migrerFactions,
 *  migrerConstructions…) ne servent qu'à mettre au niveau les
 *  ANCIENNES configurations : elles réintégraient sinon à CHAQUE
 *  lecture les entrées par défaut manquantes, « ressuscitant » les
 *  entrées supprimées ou renommées dans l'onglet Paramètres.
 *  AJUSTER CE NUMÉRO quand une évolution du référentiel (nouvelles
 *  entrées, renommages, nouveau format de table) doit être répercutée
 *  dans les configurations existantes : les configs tamponnées au
 *  numéro précédent repasseront alors une fois par les migrations. */
// Version 2 (2026-10-19, retour arbitre) : retrait du système de faction
//  — les constructions marquées `faction` (Église, Apiculture, Puit de
//  mana, Colonies souterraines…, 19 au total) sont FILTRÉES des
//  configurations existantes lors de la convergence.
// Version 3 (2026-10-20, rework habitants) : le référentiel `titres`
//  devient `metiers` (champ `titre` → `metier` par entrée), la banque
//  `titresEffets` devient `metiersEffets`, et les effets de techs
//  `prodParTitre` deviennent `prodParMetier` — les configs v2 sont
//  converties une fois dans cfgOf (personnalisations conservées).
// Version 4 (2026-10-22, retour Thibaut « les descriptions des
//  aménagements, c'est du grand n'importe quoi ») : les configs v3
//  sauvegardées avant la vague 3a portent encore les ANCIENNES
//  descriptions/effets des aménagements (« +2 Or et +10 Nourriture
//  par tour. », effets structurés actifs, pas d'emplacements) —
//  RÉALIGNEMENT complet des aménagements sur le référentiel (entrées
//  de même nom remplacées ; aménagements perso conservés ; bâtiments
//  et autres tables intouchés). Les tiers 2/3 de la vague 3c sont
//  ajoutés par migrerConstructions.
export const SCHEMA_VERSION_CONFIG = 4

/** Garde-fous appliqués à TOUTES les configurations, même convergées :
 *  chaque table du référentiel migrée doit contenir au moins une entrée
 *  (le moteur en lit certaines pour fonctionner : cultures, paysRangs…).
 *  Ces tables retrouvaient leurs défauts quand elles étaient vides via
 *  les migrations — le comportement est conservé une fois convergées.
 *  Une table vidée par l'utilisateur repasse sur les défauts : les
 *  entrées restent supprimables UNE À UNE, ce qui est le comportement
 *  documenté de l'onglet Paramètres. */
function gardeFous(m: GameConfig): void {
  const ouDefauts = <T>(list: T[] | undefined, defauts: T[]): T[] =>
    Array.isArray(list) && list.length > 0 ? list : defauts
  m.traits = ouDefauts(m.traits, DEFAULT_CONFIG.traits)
  m.cultures = ouDefauts(m.cultures, DEFAULT_CONFIG.cultures)
  m.regimes = ouDefauts(m.regimes, DEFAULT_CONFIG.regimes)
  m.typesHabitation = ouDefauts(m.typesHabitation, DEFAULT_CONFIG.typesHabitation)
  m.progres = ouDefauts(m.progres, DEFAULT_CONFIG.progres)
  // Ajout d'arbres du référentiel manquants dans une config déjà convergée
  //  (marqueur (aa) 2026-10-15) : les NOUVEAUX arbres du référentiel
  //  (ex. « Relations diplomatiques » et « Tourisme », âge 1) sont AJOUTÉS
  //  sans toucher aux arbres existants — la personnalisation (édition,
  //  suppression) persiste. Clé : (nom, âge).
  if (Array.isArray(m.progres)) {
    const connus = new Set(m.progres.map((a) => `${a.nom}|${a.age}`))
    for (const def of DEFAULT_CONFIG.progres) {
      if (!connus.has(`${def.nom}|${def.age}`)) m.progres.push(def)
    }
  }
  m.paysRangs = ouDefauts(m.paysRangs, DEFAULT_CONFIG.paysRangs)
  m.ministeres = ouDefauts(m.ministeres, DEFAULT_CONFIG.ministeres)
  m.victoires = ouDefauts(m.victoires, DEFAULT_CONFIG.victoires)
  // Mise à jour des CONDITIONS de victoire (retour Thibaut 2026-10-15) :
  //  les nouvelles voies du référentiel REMPLACENT celles d'une config
  //  convergée — mais les Lauriers VALIDÉS par les joueurs (p.lauriers)
  //  sont conservés : seul le texte des conditions/bonus est actualisé.
  if (Array.isArray(m.victoires)) {
    const voies = new Map(m.victoires.map((v) => [v.voie, v]))
    for (const def of DEFAULT_CONFIG.victoires) {
      const existante = voies.get(def.voie)
      const diff = !existante || existante.lauriers.some((l, i) =>
        l.condition !== def.lauriers[i]?.condition || l.bonus !== def.lauriers[i]?.bonus)
      if (diff) m.victoires = m.victoires.map((v) => v.voie === def.voie ? def : v)
    }
    // voies absentes de la config (ajoutées au référentiel)
    for (const def of DEFAULT_CONFIG.victoires) {
      if (!m.victoires.some((v) => v.voie === def.voie)) m.victoires.push(def)
    }
  }
  m.peuplesLibres = ouDefauts(m.peuplesLibres, DEFAULT_CONFIG.peuplesLibres)
  m.peuplesAutres = ouDefauts(m.peuplesAutres, DEFAULT_CONFIG.peuplesAutres)
  m.constructions = ouDefauts(m.constructions, DEFAULT_CONFIG.constructions)
  // Ajout des constructions du référentiel manquantes dans une config
  //  déjà convergée (revue 2026-10-15) : les NOUVELLES constructions
  //  (ex. les 12 MERVEILLES) sont AJOUTÉES sans toucher aux existantes —
  //  la personnalisation (coûts édités, suppressions) persiste. Clé : nom.
  //  Une construction existante du même nom N'EST PAS écrasée.
  if (Array.isArray(m.constructions)) {
    // Mise à jour des RANGS d'habitation (revue 2026-10-15 : les
    //  configs convergées gardaient les anciens défauts — sans
    //  rangMinHabitation — d'où l'absence de séparation par rang
    //  dans le picker). La règle du référentiel fait foi ; une
    //  construction EXISTANTE du même nom dont le rang diffère est
    //  actualisée (les autres champs — coûts édités — sont
    //  préservés).
    const parNom = new Map(DEFAULT_CONFIG.constructions.map((c) => [c.nom, c]))
    for (const c of m.constructions) {
      const def = parNom.get(c.nom)
      if (def && def.rangMinHabitation !== undefined) c.rangMinHabitation = def.rangMinHabitation
    }
    const connus = new Set(m.constructions.map((c) => c.nom))
    for (const def of DEFAULT_CONFIG.constructions) {
      if (!connus.has(def.nom)) m.constructions.push(def)
    }
  }
  m.couleurs = migrerCouleurs(m.couleurs)
}

/** Converge une configuration quelconque vers le format courant :
 *  fusion sur les défauts + migrations (si ancienne) + garde-fous +
 *  tampon de version (marqueur (x), 2026-10-15). À utiliser avant de
 *  SAUVEGARDER la configuration commune (édition dans Paramètres,
 *  partie importée/jointe) ou d'en repartir (nouvelle partie) : la
 *  structure sauvée devient identique à celle affichée, et la
 *  convergence n'a plus jamais besoin d'être rejouée. */
export function convergerConfig(c: GameConfig | undefined): GameConfig {
  return cfgOf(c).config
}

export function cfgOf(config?: GameConfig): Cfg {
  const c = config ?? DEFAULT_CONFIG
  const merged: GameConfig = {
    ...DEFAULT_CONFIG,
    ...c,
    params: mergeParams(c.params as unknown as Record<string, unknown>),
  }
  if ((c?.schemaVersion ?? 0) >= SCHEMA_VERSION_CONFIG) {
    // Déjà convergée (marqueur (x)) : PAS de re-migration — les
    // suppressions et renommements d'entrées du référentiel
    // persistent. Seuls les garde-fous s'appliquent.
    gardeFous(merged)
  } else {
    // Ancienne configuration : migrations une fois pour toutes, puis
    // tampon — le résultat est sauvegardé convergé par les points
    // d'entrée (setGlobalCfg, syncGlobalCfg, import/export…).
    // rework habitants (2026-10-20, v3) : `titres` → `metiers` (champ
    //  renommé, personnalisation conservée), `titresEffets` →
    //  `metiersEffets`, effets de techs `prodParTitre` →
    //  `prodParMetier`. Les configs déjà convergées v3 ne portent plus
    //  ces champs : le bloc est dans la branche de migration une fois
    //  pour toutes.
    const ancienM = c as unknown as { titres?: unknown; titresEffets?: unknown }
    if (Array.isArray(ancienM.titres)) {
      merged.metiers = (ancienM.titres as Array<Record<string, unknown>>).map((t) => {
        const { titre: ancienMetier, ...reste } = t
        const r = reste as unknown as MetierDef
        if (r.metier === undefined && ancienMetier !== undefined) r.metier = ancienMetier as string
        return r
      })
      delete ancienM.titres
    }
    if (Array.isArray(ancienM.titresEffets)) {
      // champ interne `titre` → `metier` de chaque entrée (l'UI et la
      //  révocation lisent e.metier)
      merged.metiersEffets = (ancienM.titresEffets as Array<Record<string, unknown>>).map((e) => {
        const { titre: ancienTitre, ...reste } = e
        const r = reste as unknown as GameConfig['metiersEffets'][number]
        if (r.metier === undefined && ancienTitre !== undefined) r.metier = ancienTitre as string
        return r
      })
      delete ancienM.titresEffets
    }
    for (const arbre of merged.progres ?? []) {
      const techs = [...(arbre.brancheA ?? []), ...(arbre.brancheB ?? []), ...(arbre.techC ? [arbre.techC] : [])] as unknown as Array<{ effets?: Array<Record<string, unknown>> }>
      for (const tech of techs) {
        for (const e of tech.effets ?? []) {
          if (e.type === 'prodParTitre') {
            const ancienTitre = e.titre
            delete e.titre
            e.type = 'prodParMetier'
            if (e.metier === undefined && ancienTitre !== undefined) e.metier = ancienTitre
          }
        }
      }
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
    // retrait des constructions de faction (2026-10-19, retour arbitre) :
    //  filtrées AVANT la complétion pour ne pas être ré-ajoutées.
    merged.constructions = (merged.constructions ?? []).filter((c) => !(c as { faction?: string }).faction)
    // constructions : ajout des entrées du référentiel apparues depuis
    //  la sauvegarde
    // (v4) : réalignement des AMÉNAGEMENTS existants sur le
    //  référentiel AVANT la complétion (retour Thibaut 2026-10-22 —
    //  voir realignerAmenagements : descriptions/effets de la vague 3a)
    merged.constructions = realignerAmenagements(merged.constructions, DEFAULT_CONFIG.constructions)
    merged.constructions = migrerConstructions(merged.constructions, DEFAULT_CONFIG.constructions)
    merged.schemaVersion = SCHEMA_VERSION_CONFIG
  }
  // Effet des taxes ±50 % → ±25 % (marqueur (z), retour Thibaut
  //  2026-10-15) : migration CIBLÉE des paramètres, indépendante du
  //  tampon schemaVersion — on ne re-joue PAS les autres migrations
  //  (les suppressions/renommements du référentiel persistent, règle
  //  (x)). Ne remplace qu'une valeur encore à l'ANCIEN défaut
  //  (0.5 / 1.5) ; toute valeur personnalisée est conservée. Le
  //  champ taxes25 marque la migration faite (persisté par
  //  convergerConfig aux points de sauvegarde).
  // RENOMMAGES DE TECHS DOUBLONS (revue 2026-10-16) : les homonymes
  //  du r\u00e9f\u00e9rentiel ont \u00e9t\u00e9 renomm\u00e9s. Une config sauvegard\u00e9e AVANT
  //  embarque encore les anciens noms \u2014 aTech/gainDeblocage ne
  //  reconnaissent plus les effets. Migration cibl\u00e9e par SLOT (comme
  //  taxes25, ind\u00e9pendante du tampon schemaVersion), marqu\u00e9e
  //  renommagesTechs2026 pour n'\u00eatre pas rejou\u00e9e. Le nom n'est
  //  remplac\u00e9 QUE s'il vaut encore l'ancien homonyme : une \u00e9dition
  //  personnalis\u00e9e dans ConfigTables est pr\u00e9serv\u00e9e. Les cl\u00e9s de
  //  d\u00e9blocage (i:slot) ne changent pas \u2014 les parties en cours
  //  gardent leurs d\u00e9blocages.
  if (!merged.renommagesTechs2026) {
    // [index d'arbre, slot, ancien nom, nouveau nom]
    const RENOMS: Array<[number, string, string, string]> = [
      [17, 'b2', 'Service militaire', 'Service militaire avanc\u00e9'],
      [21, 'a2', 'D\u00e9forestation', 'Exploitation foresti\u00e8re'],
      [21, 'b2', 'Usinage', 'Industrialisation'],
      [22, 'a1', 'Geste', 'Hommage solennel'],
      [22, 'b1', 'D\u00e9l\u00e9gation', 'Cartes de dynastie'],
      [22, 'b2', 'Ambassade', 'Diplomatie effr\u00e9n\u00e9e'],
      [22, 'c', 'Vassalisation', 'Vassalit\u00e9 \u00e9largie'],
      [18, 'b2', 'Parcs naturels', 'Merveilles naturelles'],
      [16, 'b2', 'Sappeurs', 'Grand d\u00e9ploiement'],
    ]
    for (const [iArbre, slot, ancien, nouveau] of RENOMS) {
      const a = merged.progres?.[iArbre]
      if (!a) continue
      const t = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)?.[+slot[1] - 1]
      if (t && t.nom === ancien) t.nom = nouveau
    }
    merged.renommagesTechs2026 = true
  }
  // TECHS MANQUANTES (revue 2026-10-16) : Muraille (+40 Garnison),
  //  Art de la Guerre (16:c), D\u00e9fense nationale A1 (17:a1), d\u00e9veloppement
  //  \u00e9conomique C (19:c) et futur C (18:c) ont \u00e9t\u00e9 ajout\u00e9es au
  //  r\u00e9f\u00e9rentiel du bundle \u2014 mais une config sauvegard\u00e9e AVANT garde
  //  ces slots vides (ou la vieille description). Copie cibl\u00e9e depuis
  //  DEFAULT_CONFIG : un slot VIDE re\u00e7oit la tech ; Muraille et Art
  //  de la Guerre voient leur description mise \u00e0 jour si le nom
  //  correspond (une \u00e9dition personnalis\u00e9e d'un autre slot n'est pas
  //  touch\u00e9e). Marqu\u00e9e techsManquantes2026.
  if (!merged.techsManquantes2026) {
    const FIX: Array<[number, string]> = [
      [11, 'c'], [16, 'c'], [17, 'a1'], [18, 'c'], [19, 'c'],
    ]
    for (const [iArbre, slot] of FIX) {
      const a = merged.progres?.[iArbre]
      const d = DEFAULT_CONFIG.progres?.[iArbre]
      if (!a || !d) continue
      const t = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)?.[+slot[1] - 1]
      const dt = slot === 'c' ? d.techC : (slot[0] === 'a' ? d.brancheA : d.brancheB)?.[+slot[1] - 1]
      if (!t || !dt) continue
      if (!t.nom) {
        // slot vide : la tech manquante est copi\u00e9e enti\u00e8rement
        Object.assign(t, dt)
      } else if (t.nom === dt.nom) {
        // m\u00eame tech : description \u00e0 jour (Muraille +40 Garnison,
        // Art de la Guerre liste d'arm\u00e9e apr\u00e8s l'adversaire)
        t.description = dt.description
      }
    }
    merged.techsManquantes2026 = true
  }
  // LAURIER IV MILITAIRE (revue 2026-10-16) : « Capturer un total de
  //  3 Capitales » \u2192 \u00ab Contr\u00f4ler 6 des habitations de d\u00e9part \u00bb.
  //  Migration cibl\u00e9e (m\u00eame sch\u00e9ma que taxes25) : le texte n'est
  //  remplac\u00e9 QUE s'il vaut encore l'ancienne condition \u2014 une
  //  \u00e9dition personnalis\u00e9e est pr\u00e9serv\u00e9e. La validation des Lauriers
  //  reste manuelle (radar de l'accueil) : aucun impact m\u00e9tier.
  if (!merged.laurier4Militaire2026) {
    const voieM = merged.victoires?.find((v) => v.voie === 'Militaire')
    const l4 = voieM?.lauriers?.[3]
    const ancien = 'Capturer un total de 3 Capitales.'
    if (l4 && l4.condition === ancien) {
      l4.condition = 'Contr\u00f4ler 6 des habitations de d\u00e9part.'
    }
    merged.laurier4Militaire2026 = true
  }
  // SYLVAINS (revue 2026-10-16) : le tampon schemaVersion \u00ab les
  //  suppressions persistent \u00bb a aval\u00e9 l'AJOUT des Sylvains \u2014 une
  //  config sauvegard\u00e9e \u00e0 l'\u00e9poque \u00ab peuples r\u00e9duits \u00bb ne les
  //  r\u00e9-ajoutait jamais (le peuple du joueur existait mais sa fiche
  //  avait disparu \u2192 remplac\u00e9 par Basil\u00e9ens au setup). Migration
  //  cibl\u00e9e (m\u00eame sch\u00e9ma que taxes25) : la fiche Sylvains et le
  //  peuple sont r\u00e9-ajout\u00e9s s'ils manquent. Une suppression
  //  VOLONTAIRE reste possible : supprimer de nouveau dans Param\u00e8tres
  //  apr\u00e8s cette migration la retire pour de bon.
  if (!merged.sylvains2026) {
    const dLibres = DEFAULT_CONFIG.peuplesLibres
    const dAutres = DEFAULT_CONFIG.peuplesAutres
    const defSyl = [...dLibres, ...dAutres].find((f) => f.nom === 'Sylvains')
    if (defSyl && !(merged.peuplesLibres ?? []).some((f) => f.nom === 'Sylvains')
      && !(merged.peuplesAutres ?? []).some((f) => f.nom === 'Sylvains')) {
      merged.peuplesLibres = [...(merged.peuplesLibres ?? []), structuredClone(defSyl)]
    }
    if (defSyl && !(merged.peuples ?? []).includes('Sylvains')) {
      merged.peuples = [...(merged.peuples ?? []), 'Sylvains']
    }
    merged.sylvains2026 = true
  }
  // VALEURS DE NOURRITURE (revue 2026-10-16) : Grange 20, Silo à grain
  //  35, Moulin à vent 60, Guilde des artisans de la terre 60,
  //  Champ 15 été, Rizière 20 été, Pâturage +1 Bétail +4 Nourr.
  //  Le tampon schemaVersion « les valeurs persistent » gardait les
  //  ANCIENNES valeurs dans les parties existantes — migration ciblée
  //  (même schéma que taxes25) : les valeurs sont mises à jour UNIQUEMENT
  //  si elles valent encore l'ancienne valeur exacte (une édition
  //  personnalisée dans Paramètres est préservée).
  if (!merged.valeursNourriture2026) {
    const MAJ: Array<[string, EffetConstruction[], string | null, string | null]> = [
      // [nom, effets attendus, ancienne production, nouvelle production]
      ['Grange', [{ ressource: 'Nourriture', quantite: 20 }], '+15 Nourriture par tour.', '+20 Nourriture par tour.'],
      ['Silo à grain', [{ ressource: 'Nourriture', quantite: 35 }], '+25 Nourriture par tour.', '+35 Nourriture par tour.'],
      ['Moulin à vent', [{ ressource: 'Charbon', quantite: -1 }, { ressource: 'Nourriture', quantite: 60 }], 'Consomme 1 Charbon par tour. +45 Nourriture par tour.', 'Consomme 1 Charbon par tour. +60 Nourriture par tour.'],
      ["Guilde des artisans de la terre.", [{ ressource: 'Charbon', quantite: -1 }, { ressource: 'Nourriture', quantite: 60 }], 'Consomme 1 Charbon par tour. +45 Nourriture par tour.', 'Consomme 1 Charbon par tour. +60 Nourriture par tour.'],
      ['Champ', [{ ressource: 'Nourriture', quantite: 15, ete: true }], '+10 Nourriture par tour en été.', '+15 Nourriture par tour en été.'],
      ['Rizière', [{ ressource: 'Nourriture', quantite: 20, ete: true }], '+15 Nourriture par tour en été.', '+20 Nourriture par tour en été.'],
      ['Pâturage', [{ ressource: 'Bétail', quantite: 1 }, { ressource: 'Nourriture', quantite: 4 }], '+1 Bétail et +8 Nourriture par tour.', '+1 Bétail et +4 Nourriture par tour.'],
    ]
    for (const c of merged.constructions ?? []) {
      const maj = MAJ.find(([nom]) => nom === c.nom)
      if (!maj) continue
      const [, effets, ancienneProd, nouvelleProd] = maj
      // ne remplacer QUE si la valeur actuelle est l'ANCIENNE exacte
      const estAncienne = Array.isArray(c.effets) && JSON.stringify(c.effets) !== JSON.stringify(effets)
        && c.production === ancienneProd
      if (estAncienne) {
        c.effets = effets
        if (nouvelleProd) c.production = nouvelleProd
      }
    }
    merged.valeursNourriture2026 = true
  }
  // Migration pontificats (2026-10-17) : le palier 220 Tourisme
  //  affichait encore « (crédité automatiquement) » alors que
  //  l'automatisation a été retirée du moteur (commit d5d3005b) —
  //  tous les paliers de pontificat sont des aides de jeu au
  //  plateau. Ne remplace QUE si le texte actuel est l'ancien exact
  //  (édition personnalisée préservée). Même schéma que taxes25.
  if (!merged.pontificats2026) {
    const ANCIEN = 'A la fin de chaque hiver, recevez 1 Émissaire en réserve (crédité automatiquement).'
    const NOUVEAU = 'A la fin de chaque hiver, recevez 1 Émissaire en réserve (à gérer au plateau).'
    for (const t of merged.tourismeSeuils ?? []) {
      if (t.seuil === 220 && t.bonus === ANCIEN) t.bonus = NOUVEAU
    }
    merged.pontificats2026 = true
  }
  // MIGRATION MURAILLE (2026-10-17) : « +10 Défense dans vos
  //  habitations. » → « +40 Garnison dans vos habitations. » —
  //  les configs sauvegardées AVANT le changement de valeur
  //  gardaient l'ancienne description (le tampon techsManquantes2026
  //  était déjà posé et le bloc ne se rejoue pas). Remplacement
  //  ciblé : uniquement si la description vaut ENCORE l'ancien
  //  texte exact (une édition personnalisée est préservée).
  if (!merged.muraille40_2026) {
    const ANCIENNE_MURAILLE = '+10 Défense dans vos habitations.'
    const NOUVELLE_MURAILLE = '+40 Garnison dans vos habitations.'
    for (const arbre of merged.progres ?? []) {
      for (const t of [...(arbre.brancheA ?? []), ...(arbre.brancheB ?? []), ...(arbre.techC ? [arbre.techC] : [])]) {
        if (t?.nom === 'Muraille' && t.description === ANCIENNE_MURAILLE) {
          t.description = NOUVELLE_MURAILLE
        }
      }
    }
    merged.muraille40_2026 = true
  }
  // MIGRATION SLOTS VIDES (2026-10-18) : les « — emplacement
  //  vide — » dans Référentiels → Progrès venaient des configs
  //  tamponnées dont les arbres dataient d'avant l'ajout de techs
  //  au référentiel. La migration techsManquantes2026 ne couvrait
  //  que 5 slots prédéfinis et ne se rejoue pas (tampon). Ici :
  //  pour CHAQUE arbre de la config (retrouvé par nom+âge dans le
  //  référentiel à jour), tout slot VIDE reçoit la tech du
  //  référentiel. Les slots remplis (éditions personnalisées
  //  comprises) ne sont JAMAIS touchés.
  if (!merged.slotsVides2026) {
    for (const arbre of merged.progres ?? []) {
      const ref = DEFAULT_CONFIG.progres.find((d) => d.nom === arbre.nom && d.age === arbre.age)
      if (!ref) continue
      arbre.brancheA = arbre.brancheA ?? []
      arbre.brancheB = arbre.brancheB ?? []
      while (arbre.brancheA.length < 2) arbre.brancheA.push({ nom: '', cout: '', description: '' } as never)
      while (arbre.brancheB.length < 2) arbre.brancheB.push({ nom: '', cout: '', description: '' } as never)
      for (let k = 0; k < 2; k++) {
        if (!arbre.brancheA[k]?.nom && ref.brancheA?.[k]?.nom) {
          arbre.brancheA[k] = ref.brancheA[k]
        }
        if (!arbre.brancheB[k]?.nom && ref.brancheB?.[k]?.nom) {
          arbre.brancheB[k] = ref.brancheB[k]
        }
      }
      if (!arbre.techC?.nom && ref.techC?.nom) {
        arbre.techC = ref.techC
      }
    }
    merged.slotsVides2026 = true
  }
  if (!merged.taxes25) {
    const pm = merged.params as unknown as Record<string, unknown>
    if (pm.taxOrFaibles === 0.5) pm.taxOrFaibles = 0.75
    if (pm.taxOrHautes === 1.5) pm.taxOrHautes = 1.25
    if (pm.taxNaissFaibles === 1.5) pm.taxNaissFaibles = 1.25
    if (pm.taxNaissHautes === 0.5) pm.taxNaissHautes = 0.75
    merged.taxes25 = true
  }
  // SUPPRESSION DE LA MARTIALITÉ (arbitrage Thibaut 2026-10-21) :
  //  l'hérédité est conservée, mais la martialité disparaît du jeu —
  //  Soldat et Commandant ne sont plus régis par le sexe, le
  //  recrutement des armées est ouvert à tous. Migration ciblée
  //  (même schéma que taxes25, SANS toucher au tampon schemaVersion —
  //  règle (x)) : les configs sauvegardées portent encore
  //  regleGenre « Martialité » et la clé martialite des cultures.
  //  Seule la valeur exacte « Martialité » est remplacée (une
  //  édition personnalisée est préservée) ; la clé martialite est
  //  dépouillée (inerte de toute façon). Marquée martialiteSupprimee.
  if (!merged.martialiteSupprimee) {
    for (const m of merged.metiers) {
      if (m.regleGenre === 'Martialité') m.regleGenre = ''
    }
    for (const cu of merged.cultures) {
      delete (cu as unknown as { martialite?: string }).martialite
    }
    merged.martialiteSupprimee = true
  }
  // REWORK MÉTIERS & AMÉNAGEMENTS (vague 3a, arbitrage Thibaut
  //  2026-10-21) : les métiers deviennent des postes à emplacements
  //  créés par les aménagements — 24 métiers au référentiel, gains
  //  recalibrés SANS éducation requise (Artisan→Commerçant,
  //  Chercheur→Scientifique, Sportif→Garde, Propagandiste supprimé,
  //  nouveaux métiers de production), production DIRECTE des 14
  //  aménagements tier 1 remplacée par des emplacements. Migration
  //  ciblée (même schéma que taxes25, SANS toucher au tampon
  //  schemaVersion — règle (x)) : les configs sauvegardées portent
  //  encore l'ancienne table. Convention de préservation :
  //  · une entrée qui vaut ENCORE l'ANCIEN défaut exact est remplacée
  //    par le nouveau défaut (renommage + valeurs comprises) ;
  //  · une entrée personnalisée est seulement RENOMMÉE (ses valeurs
  //    restent les siennes) ;
  //  · les métiers manquants du nouveau référentiel sont AJOUTÉS ;
  //  · Propagandiste (supprimé) est retiré (ses titulaires passent
  //    Sans-emploi par la migration d'ÉTAT v4).
  if (!merged.metiersAmenagements2026) {
    const RENOMMAGES: Record<string, string> = {
      Artisan: 'Commerçant', Chercheur: 'Scientifique', Sportif: 'Garde',
    }
    // Anciens défauts (15 métiers, pré-3a, après normalisation —
    //  regleGenre « vide » → '') : [nom, education, v1, r1, v2, r2, desc, nobleSeul, regleGenre, attribution]
    const ANCIENS: Array<[string, string, number, string, number, string, string, boolean, string, string]> = [
      ['Chasseur', '', 1, 'Nourriture', 0.1, 'Or', 'Métier par défaut', false, '', ''],
      ['Artiste', 'Culturelle', 1.2, 'Tourisme', 0, '', '', false, '', 'Education'],
      ['Chercheur', 'Scientifique', 0.2, 'Science', 0, '', '', false, '', 'Education'],
      ['Éleveur', 'Agricole', 2.5, 'Nourriture', 0, '', '', false, '', 'Education'],
      ['Sportif', 'Militaire', 5, 'Garnison', 0, '', '', false, '', 'Education'],
      ['Artisan', 'Économique', 1.5, 'Or', 0, '', '', false, '', 'Education'],
      ['Professeur', '', 0, '', 0, '', '', false, '', 'Ville'],
      ['Dirigeant', '', 0, '', 0, '', 'Chef de faction · 1 par joueur', true, 'Hérédité', 'Succession'],
      ['Gouverneur', '', 0, '', 0, '', 'Max 1 par ville', true, '', 'Manuelle'],
      ['Héritier', '', 0, '', 0, '', 'Même dynastie que le Dirigeant', true, 'Hérédité', 'Manuelle'],
      ['Marchand', '', 0, '', 0, '', '', false, '', 'Manuelle'],
      ['Ministre', '', 0, '', 0, '', 'Plusieurs autorisés', true, '', 'Manuelle'],
      ['Propagandiste', '', 0, '', 0, '', '', false, '', 'Manuelle'],
      ['Soldat', '', 0, '', 0, '', '', false, '', 'Armée'],
      ['Commandant', '', 0, '', 0, '', '', true, '', 'Armée'],
    ]
    const cle = (m: { education: string; valeur1: number; ressource1: string; valeur2: number; ressource2: string; description: string; nobleSeul: boolean; regleGenre: string; attribution: string }) =>
      JSON.stringify([m.education, m.valeur1, m.ressource1, m.valeur2, m.ressource2, m.description, m.nobleSeul, m.regleGenre, m.attribution])
    const nouveaux = new Map(DEFAULT_CONFIG.metiers.map((d) => [d.metier, d]))
    const parAncienNom = new Map(ANCIENS.map((a2) => [a2[0], a2]))
    const out: MetierDef[] = []
    for (const m of merged.metiers) {
      const nom = m.metier
      const ancien = parAncienNom.get(nom)
      if (ancien && cle(m) === JSON.stringify(ancien.slice(1))) {
        // encore à l'ancien défaut exact → nouveau défaut (renommé si besoin)
        const def = nouveaux.get(RENOMMAGES[nom] ?? nom)
        if (def) out.push(structuredClone(def))
        continue
      }
      if (RENOMMAGES[nom] && !merged.metiers.some((x) => x.metier === RENOMMAGES[nom])) {
        m.metier = RENOMMAGES[nom] // personnalisée : renommée, valeurs conservées
      }
      if (nom !== 'Propagandiste') out.push(m)
    }
    // métiers manquants du nouveau référentiel : ajoutés à la fin
    for (const d of DEFAULT_CONFIG.metiers) {
      if (!out.some((m) => m.metier === d.metier)) out.push(structuredClone(d))
    }
    merged.metiers = out
    // metiersEffets (wiki) : Propagandiste retiré, Garde/Banquier/
    //  Troubadour/Professeur ajoutés, texte Marchand mis à jour.
    merged.metiersEffets = (merged.metiersEffets ?? []).filter((e) => e.metier !== 'Propagandiste')
    for (const d of DEFAULT_CONFIG.metiersEffets) {
      if (!merged.metiersEffets.some((e) => e.metier === d.metier)) {
        merged.metiersEffets.push(structuredClone(d))
      } else if (d.metier === 'Marchand') {
        const e = merged.metiersEffets.find((x) => x.metier === 'Marchand')
        const ANCIEN_M = 'Portée 9 PM, 4 PM par tour. Le marchand ouvre UNE route commerciale entre sa ville et la ville d\'un autre joueur : chaque tour, les DEUX joueurs reliés gagnent 4 Or et le propriétaire du marchand copie la production de l\'aménagement ENTIER choisi dans la ville ciblée — toutes ses ressources produites (choisi à l\'ouverture de la route, modifiable à tout moment ; un marchand ne tient qu\'une route, qui se ferme s\'il perd son titre ou meurt). Un marchand peut traverser les cases d\'eau et de rivière une fois les bateaux débloqués. Un marchand envoyé vers une cité libre ne produit pas de ressources (règle de plateau).'
        if (e && e.effet === ANCIEN_M) e.effet = d.effet
      }
    }
    // Constructions : les 14 aménagements tier 1 passent production →
    //  emplacements. Effets remplacés SEULEMENT s'ils valent encore
    //  l'ancien défaut exact (édition préservée sinon) ; les
    //  emplacements sont TOUJOURS ajoutés s'ils manquent.
    const ANCIENS_EFFETS: Record<string, Array<EffetConstruction>> = {
      'Baleinier': [{ ressource: 'Or', quantite: 2 }, { ressource: 'Nourriture', quantite: 10 }],
      'Bâteau de pêche': [{ ressource: 'Nourriture', quantite: 8 }],
      'Carrière': [{ ressource: 'Pierre', quantite: 1 }],
      'Champ': [{ ressource: 'Nourriture', quantite: 15, ete: true }],
      'Foire': [{ ressource: 'Tourisme', quantite: 5 }],
      'Mine de Charbon': [{ ressource: 'Charbon', quantite: 1 }],
      'Mine de Fer': [{ ressource: 'Fer', quantite: 1 }],
      "Mine d'Or": [{ ressource: 'Or', quantite: 4 }],
      'Observatoire': [{ ressource: 'Science', quantite: 1 }],
      'Pâturage': [{ ressource: 'Bétail', quantite: 1 }, { ressource: 'Nourriture', quantite: 4 }],
      'Rizière': [{ ressource: 'Nourriture', quantite: 20, ete: true }],
      'Scierie': [{ ressource: 'Bois', quantite: 1 }],
      'Sériciculture': [{ ressource: 'Soie', quantite: 1 }],
      'Site archéologique': [{ ressource: 'Tourisme', quantite: 8 }],
    }
    const defsAmenagements = new Map(
      DEFAULT_CONFIG.constructions.filter((c) => c.emplacements).map((c) => [c.nom, c]),
    )
    for (const c of merged.constructions ?? []) {
      const def = defsAmenagements.get(c.nom)
      if (!def) continue
      if (c.emplacements === undefined) c.emplacements = structuredClone(def.emplacements)
      const ancienEffets = ANCIENS_EFFETS[c.nom]
      if (ancienEffets && JSON.stringify(c.effets ?? null) === JSON.stringify(ancienEffets)) {
        c.effets = []
        c.production = def.production
        c.description = def.description
      }
    }
    merged.metiersAmenagements2026 = true
  }
  return {
    p: merged.params,
    ressources: merged.ressources,
    educations: merged.educations,
    metiers: merged.metiers,
    traits: merged.traits,
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
    couleurs: migrerCouleurs(merged.couleurs),
    config: merged,
  }
}

/** Deep-clone la config par défaut pour une nouvelle partie. */
export function cloneDefaultConfig(): GameConfig {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG))
}
