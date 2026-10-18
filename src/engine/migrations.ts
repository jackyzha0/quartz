// ═══════════════════════════════════════════════════════════════════════════
//  MIGRATIONS DE SCHÉMA DE SAUVEGARDE (étape 3, 2026-10-18)
//
//  Problème historique : chaque évolution du format des parties était un
//  appel de migration codé à la main dans le store (migrerNomsMinisteres
//  ici, slotsVides2026/muraille40_2026 dans defaultConfig…), rejoué à
//  chaque chargement et impossible à tracer. Les tampons ad hoc
//  empiraient à chaque cas.
//
//  Solution : un registre VERSIONNÉ. Chaque migration a un numéro et
//  une fonction pure (etat avant → etat après) ; `migrerEtat` exécute
//  TOUTES les migrations postérieures au `schema` de l'état, UNE FOIS,
//  puis tamponne. Ajouter une migration future = UNE entrée ici.
//
//  La CONFIG (state.config, qui porte les référentiels ET la banque
//  d'effets — le livre des formules) garde son propre tampon
//  (SCHEMA_VERSION_CONFIG dans defaultConfig.ts, convergerConfig) :
//  les deux tampons sont indépendants et complémentaires — le tampon
//  config couvre le référentiel, le tampon schema couvre le reste de
//  l'état (joueurs, population, personnages…).
// ═══════════════════════════════════════════════════════════════════════════

import type { GameState } from './types'
import { normaliserEtat } from './villes'
import { migrerNomsMinisteres } from './ministeres'

/** Une migration de schéma : numéro unique croissant + transformation
 *  pure de l'état (peut muter l'état reçu — il vient d'être chargé). */
export interface MigrationSchema {
  /** Numéro de version CIBLE (croissant, sans trou). */
  v: number
  /** Description courte — visible dans les logs de débogage. */
  quoi: string
  /** La transformation. Doit être idempotente (jouer deux fois = une fois). */
  appliquer: (state: GameState) => void
}

/** Version courante du schéma = plus haut v de MIGRATIONS. */
export const SCHEMA_VERSION_ETAT = 2

/** Registre des migrations. N° attribués définitivement — ne JAMAIS
 *  réutiliser ni renuméroter (les sauvegardes tamponnent leur v). */
export const MIGRATIONS: MigrationSchema[] = [
  {
    v: 1,
    quoi: 'normalisation de base (history/log/villes complétés — garde-fou anciennes sauvegardes)',
    // Historiquement appelé « normaliserEtat » à chaque chargement.
    //  Devenu migration v1 : les états neufs créés par createGame
    //  sont déjà complets ; les états anciens passent ici UNE FOIS.
    appliquer: normaliserEtat,
  },
  {
    v: 2,
    quoi: 'portefeuilles renommés (classeur → offices de cour)',
    // Historiquement « migrerNomsMinisteres ».
    appliquer: migrerNomsMinisteres,
  },
  // ── Futures migrations : v: 3, 4… (une entrée = une évolution) ──
  //  Ex. ajout d'un champ aux personnages, renommage d'une ressource,
  //  restructuration d'un tableau : jamais de renumérotation.
]

/** Exécute toutes les migrations que l'état n'a pas encore eues.
 *  Tamponne state.schema à la version courante. Retourne la liste des
 *  migrations appliquées (pour le log de chargement — débogage). */
export function migrerEtat(state: GameState): string[] {
  const appliquees: string[] = []
  const actuel = (state as { schema?: number }).schema ?? 0
  for (const m of MIGRATIONS) {
    if (m.v <= actuel) continue
    m.appliquer(state)
    appliquees.push(`v${m.v} : ${m.quoi}`)
  }
  ;(state as { schema?: number }).schema = SCHEMA_VERSION_ETAT
  return appliquees
}
