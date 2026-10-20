// ═══════════════════════════════════════════════════════════════════════════
//  BANQUE D'EFFETS — CONTRAT COMMUN (refactor 2026-10-18)
//
//  Principe : une règle (bâtiment, aménagement, dogme, règle de faction,
//  technologie, régime…) = une DONNÉE qui combine des effetspiochés dans
//  la BANQUE. Modifier une règle = modifier son appel à la banque ;
//  le code du moteur ne change JAMAIS quand une règle change.
//
//  Trois couches :
//   1. src/rules/types.ts (ce fichier) — les types d'effets et de
//      conditions, stables, versionnés ;
//   2. src/rules/effects/ — l'implémentation de chaque type d'effet,
//      écrite UNE fois, testée UNE fois ;
//   3. src/rules/registry.ts — associe les règles du référentiel
//      (bâtiments, dogmes…) à leurs effets. C'est LA seule couche à
//      éditer pour changer une règle.
// ═══════════════════════════════════════════════════════════════════════════

import type { GameState, Player, City } from '../engine/types'

// ── Contexte d'application ────────────────────────────────────────────────

/** Contexte passé à chaque effet : tout ce dont un effet peut avoir besoin
 *  pour se calculer. Le moteur le construit une fois par site d'application
 *  (joueur, ville, tour) et le donne à la banque. */
export interface ContexteEffet {
  /** État complet de la partie (lecture seule par convention — un effet
   *  ne mute JAMAIS l'état directement : il renvoie sa contribution). */
  state: GameState
  /** Joueur concerné par l'application. */
  joueur: Player
  /** Ville concernée si le site est une ville (sinon undefined). */
  ville?: City
  /** Saison du tour en cours. */
  saison: string
}

// ── Types d'effets de la banque ────────────────────────────────────────────

/** Production par tour d'une ressource, dans la ville du contexte
 *  (canal « Bâtiments » du récap). Négatif = consommation. */
export interface EffetFluxVille {
  type: 'fluxVille'
  ressource: string
  valeur: number
  /** true = créditée uniquement en été (canal « Nourr - été »). */
  ete?: boolean
}

/** Production par tour créditée au joueur entier (toutes ses villes,
 *  canal « Régimes & cultures » / « Ministres »…). */
export interface EffetFluxJoueur {
  type: 'fluxJoueur'
  ressource: string
  valeur: number
  /** true = uniquement en été. */
  ete?: boolean
}

/** Production par tour du portefeuille ministériel donné — CUMULABLE :
 *  la valeur s'applique PAR MINISTRE porteur vivant (deux Trésoriers =
 *  +10 Or). Retour Thibaut (arbitrage portefeuilles cumulables). */
export interface EffetFluxJoueurParMinistre {
  type: 'fluxJoueurParMinistre'
  /** Portefeuille concerné (nom exact de la table `ministeres`). */
  portefeuille: string
  ressource: string
  valeur: number
}

/** Production par tour, par AMÉNAGEMENT portant l'un des noms listés,
 *  dans TOUTES les villes du joueur (ex. Socialisme : +N Nourriture
 *  d'été par Champ et Rizière — champ nourrEteChampRiziere du
 *  référentiel, brûlage #3 source 2/3). */
export interface EffetFluxParAmenagement {
  type: 'fluxParAmenagement'
  ressource: string
  valeur: number
  /** noms d'aménagements comptés (ex. ['Champ', 'Rizière']) */
  noms: string[]
}

/** Production par tour, par VILLE de la culture du joueur dans le
 *  MONDE entier, tous joueurs confondus (ex. Lunisme : +N Tourisme
 *  par ville de culture Lunisme — règle de pays du classeur, champs
 *  capitalNourr/Tourisme/OrParHabMonde). */
export interface EffetFluxParVilleCultureMonde {
  type: 'fluxParVilleCultureMonde'
  ressource: string
  valeur: number
}

// ── Effets des technologies de progrès (source 'tech', brûlage #3
//  source 3/3 : TOUTE production passe par la banque) ──────────────────

/** Production par tour SI le joueur possède une capitale (canal
 *  historique « prodCapitale » des techs — ex. Musées : +30 Tourisme
 *  par tour si capitale ; ex. Garde suzeraine : +12 Nourriture si
 *  capitale ET cité suzeraine, la suzeraineté étant une CONDITION
 *  de la règle). */
export interface EffetFluxSiCapitale {
  type: 'fluxSiCapitale'
  ressource: string
  valeur: number
}

/** Production par tour, PAR VILLE du joueur (canal historique
 *  « prodParHabitation » des techs — ex. Assemblées scientifiques :
 *  +1 Science par ville). */
export interface EffetFluxParVille {
  type: 'fluxParVille'
  ressource: string
  valeur: number
}

/** Production par tour, PAR VILLE dont la proximité est la donnée
 *  `proximite` (canal historique « côtier » des techs — ex. Cours de
 *  pêche : +4 Nourriture par ville à proximité de la Mer). */
export interface EffetFluxParVilleProximite {
  type: 'fluxParVilleProximite'
  ressource: string
  valeur: number
  /** proximité requise (ex. 'Mer') */
  proximite: string
}

/** Production par tour, PAR RANG d'habitation cumulé sur toutes les
 *  villes (ex. Surconsommation : +1 Science et +5 Tourisme par rang —
 *  la consommation de Nourriture reste un coût, pas une production). */
export interface EffetFluxParRangHabitation {
  type: 'fluxParRangHabitation'
  ressource: string
  valeur: number
}

/** Production par tour, PAR BÂTIMENT des villes du joueur, limité à
 *  une famille du référentiel si `famille` est fournie (ex.
 *  Industrialisation : +1 Charbon par bâtiment ; Merveilleux :
 *  +1 Science par bâtiment de famille Merveille). */
export interface EffetFluxParBatiment {
  type: 'fluxParBatiment'
  ressource: string
  valeur: number
  /** famille de la table constructions (ex. 'Merveille') — absent =
   *  tous les bâtiments comptent */
  famille?: string
}

/** Production par tour proportionnelle à la GARNISON d'habitants :
 *  valeur × Σ garnisonHabitationVille sur les villes du joueur (ex.
 *  Service militaire avancé : +0,5 Habitants par point de garnison). */
export interface EffetFluxParGarnisonHabitation {
  type: 'fluxParGarnisonHabitation'
  ressource: string
  valeur: number
}

/** Production par tour, PAR TITULAIRE VIVANT du metier donné dans la
 *  population du joueur (générique des techs `prodParMetier` du
 *  référentiel — ex. Commerce lointain : +3 Or par Marchand). */
export interface EffetFluxParMetier {
  type: 'fluxParMetier'
  ressource: string
  valeur: number
  /** metier exact (ex. 'Marchand', 'Ministre') */
  metier: string
}

/** Production par tour de la CAPITALE du joueur. */
export interface EffetFluxCapitale {
  type: 'fluxCapitale'
  ressource: string
  valeur: number
}

/** Garnison statique ajoutée à la ville (valeur d'état : tient tant que
 *  la source tient — bâtiment, technologie, règle…). */
export interface EffetGarnisonVille {
  type: 'garnisonVille'
  valeur: number
}

/** Garnison statique par RANG d'habitation de la ville (ex. régime
 *  Autoritarisme : +15 × rang). */
export interface EffetGarnisonParRang {
  type: 'garnisonParRang'
  valeur: number
}

/** Garnison ajoutée à TOUTES les habitations du joueur (ministre
 *  Connétable : +15 par ville à la prise de fonction). */
export interface EffetGarnisonJoueur {
  type: 'garnisonJoueur'
  valeur: number
}

/** TYPE HISTORIQUE — plus AUCUN producteur depuis le retour Thibaut
 *  2026-10-16 : le Tourisme est un FLUX NORMAL (fluxVille ; stock
 *  recalculé en fin de tour — stock = production). Conservé dans le
 *  contrat de types pour compatibilité des règles déjà saisies ; le
 *  registre de constructions ne le produit plus. */
export interface EffetTourismeInstantane {
  type: 'tourismeInstantane'
  valeur: number
}

/** Habitants ajoutés immédiatement à la ville (Socialisme dogme :
 *  « votre capitale reçoit 15 habitants »). */
export interface EffetHabitantsVille {
  type: 'habitantsVille'
  valeur: number
}

/** Poids supplémentaire dans la pression de conversion culturelle de
 *  la culture concernée (dogmes, merveilles culturelles…). */
export interface EffetConversionPoids {
  type: 'conversionPoids'
  culture: string
  valeur: number
}

/** Poids supplémentaire d'attrait migratoire de la ville (festivals,
 *  merveilles… — voir population.ts). */
export interface EffetMigrationPoids {
  type: 'migrationPoids'
  valeur: number
}

/** Réduction du coût de construction (Or et/ou ressources de base) —
 *  ex. Grand bailli : −8 Or −3 Bois sur fondation d'habitation. */
export interface EffetReductionCout {
  type: 'reductionCout'
  /** Type de construction concernée : 'habitation' | 'batiment' | 'amenagement' | 'merveille' | 'leveeArmee' */
  cible: string
  reductions: Record<string, number>
}

/** Réduction du coût de levée d'armée (Or) — ex. Grand écuyer, techs,
 *  bâtiments de la ville de levée. */
export interface EffetReductionLeveeArmee {
  type: 'reductionLeveeArmee'
  valeur: number
}

/** Émissaires : gain immédiat (Pacifisme : 1 émissaire cité libre au
 *  choix) ou capacité maximale augmentée (Capitalisme : +1 marchand). */
export interface EffetEmissaires {
  type: 'emissaires'
  /** nombre d'émissaires gagnés immédiatement */
  gain: number
  /** capacité maximale de marchands +N (0 = sans effet) */
  marchandsMax?: number
}

/** Science gagnée immédiatement (bonus one-shot de Laurier). */
export interface EffetScienceInstantanee {
  type: 'scienceInstantanee'
  valeur: number
}

/** Ressources de base gagnées immédiatement (bonus de Laurier). */
export interface EffetRessourcesInstantanees {
  type: 'ressourcesInstantanees'
  /** clé = nom de ressource, valeur = quantité gagnée */
  gains: Record<string, number>
}

/** Modificateur démographique appliqué à la ville (santé, fécondité…).
 *  Réservé aux règles démographiques fines — rare. */
export interface EffetDemographieVille {
  type: 'demographieVille'
  /** probabilité de maladie supplémentaire (ex. épidémie) */
  risqueMaladie?: number
  /** fécondité bonus des couples de la ville */
  feconditeBonus?: number
}

/** Union : TOUS les types d'effets de la banque. */
export type Effet =
  | EffetFluxVille
  | EffetFluxJoueur
  | EffetFluxJoueurParMinistre
  | EffetFluxParAmenagement
  | EffetFluxParVilleCultureMonde
  | EffetFluxSiCapitale
  | EffetFluxParVille
  | EffetFluxParVilleProximite
  | EffetFluxParRangHabitation
  | EffetFluxParBatiment
  | EffetFluxParGarnisonHabitation
  | EffetFluxParMetier
  | EffetFluxCapitale
  | EffetGarnisonVille
  | EffetGarnisonParRang
  | EffetGarnisonJoueur
  | EffetTourismeInstantane
  | EffetHabitantsVille
  | EffetConversionPoids
  | EffetMigrationPoids
  | EffetReductionCout
  | EffetReductionLeveeArmee
  | EffetEmissaires
  | EffetScienceInstantanee
  | EffetRessourcesInstantanees
  | EffetDemographieVille

// ── Conditions ─────────────────────────────────────────────────────────────

/** Une règle peut être conditionnée. Toutes les conditions sont
 *  optionnelles (absence = toujours actif) et combinées en ET. */
export interface ConditionRegle {
  /** Peuple requis (ex. 'NORLS' pour « L'art du viking »). */
  peuple?: string
  /** Rang de Pontificat minimum requis. */
  pontificatMin?: number
  /** Âge minimum du joueur. */
  ageMin?: number
  /** Saison requise (ex. effets d'été). */
  saison?: string
  /** Le joueur doit être vassal (Pacifisme Fidèles rang 2). */
  vassal?: boolean
  /** Le joueur doit détenir ce ministre (nom EXACT). */
  ministre?: string
  /** Technologie débloquée requise (clé `<arbre>:<slot>`). */
  tech?: string
  /** Régime politique du joueur requis (ex. Socialisme). */
  regime?: string
  /** Culture du joueur requise (ex. Lunisme — règle de pays). */
  culture?: string
  /** Technologie débloquée requise, désignée par NOM (la clé réelle
   *  `<arbre>:<slot>` est résolue par le registre — les homonymes de
   *  plusieurs arbres matchent, comme l'historique aTech ; source
   *  'tech', brûlage #3 source 3/3). */
  techNom?: string
  /** Le joueur doit posséder au moins une CITÉ LIBRE suzeraine
   *  (ex. Garde suzeraine, Patronage — relations diplomatiques). */
  suzerainDeCite?: boolean
}

// ── Règle de la banque ─────────────────────────────────────────────────────

/** Source d'une règle : où elle vit dans le référentiel. */
export type SourceRegle =
  | 'batiment'        // table constructions, catégorie Bâtiment
  | 'amenagement'    // table constructions, catégorie Aménagement
  | 'merveille'      // table constructions, famille Merveille
  | 'dogme'           // table dogmes (bonus Pontife / Fidèles)
  | 'faction'         // règles de faction (base, Âge II, Âge III)
  | 'regime'          // loi chiffrée du régime politique
  | 'culture'         // règle de pays culturelle
  | 'tech'            // technologies de progrès
  | 'ministre'         // portefeuille automatique
  | 'evenement'        // événement de saison
  | 'laurier'          // bonus one-shot de Laurier

/** Une règle de la banque : identité + conditions + effets.
 *  L'identifiant `id` est STABLE (jamais renommé, jamais réutilisé) —
 *  les textes d'affichage (nom, description) peuvent changer librement
 *  dans le référentiel sans casser la règle. */
export interface RegleBanque {
  /** Identifiant stable de la règle (ex. 'batiment.poste-de-garde',
   *  'dogme.capitalisme.pontife.r1'). */
  id: string
  /** Source dans le référentiel. */
  source: SourceRegle
  /** Nom affiché de la règle (ex. 'Poste de garde') — pour les logs
   *  et l'UI ; MODIFIABLE librement. */
  nom: string
  /** Groupe de la source (constructions : 'Ville' | 'Château' | 'Capitale' | 'Terrain')
   *  — 15 constructions existent en double (Ville ET Château), le
   *  groupe distingue leurs règles. Optionnel pour les sources sans
   *  groupe (dogmes, factions…). */
  groupe?: string
  /** Conditions d'activation (toutes en ET). Vide = toujours actif
   *  quand la source est possédée. */
  conditions?: ConditionRegle
  /** QUAND la règle se déclenche : 'tour' (chaque fin de tour —
   *  défaut) ou 'finSaison' (au changement de saison, production
   *  équivalente par tour : Sénéchal, Maître de cour, Légat…). */
  declencheur?: 'tour' | 'finSaison'
  /** Les effets — TOUJOURS piochés dans la banque. */
  effets: Effet[]
}

// ── Résultats d'application ────────────────────────────────────────────────

/** Résultat agrégé d'une application de la banque sur un site. */
export interface ContributionEffets {
  /** Flux par tour par ressource (clé = ressource). */
  flux: Record<string, number>
  /** Flux d'été par ressource (canal « Nourr - été »). */
  fluxEte: Record<string, number>
  /** Garnison totale ajoutée au site. */
  garnison: number
  /** Poids de conversion culturelle par culture. */
  conversion: Record<string, number>
  /** Poids migratoire du site. */
  migration: number
  /** Réductions de coût par type de cible. */
  reductions: Record<string, Record<string, number>>
  /** Effets instantanés (appliqués une fois, hors calcul de tour). */
  instantanes: Effet[]
}
