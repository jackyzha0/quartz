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

/** Tourisme FLAT crédité UNE FOIS (à la construction — jamais un flux).
 *  N'est appliqué que par le site « construction » (construire), pas
 *  par le calcul de tour. */
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
  /** Règle de faction active requise (nom EXACT du référentiel). */
  regleFaction?: string
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
  /** Conditions d'activation (toutes en ET). Vide = toujours actif
   *  quand la source est possédée. */
  conditions?: ConditionRegle
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
