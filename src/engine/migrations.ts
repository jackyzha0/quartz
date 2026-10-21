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
import { toutesLesPopulations } from './shared'

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
export const SCHEMA_VERSION_ETAT = 4

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
  {
    v: 3,
    quoi: 'rework habitants : titre → metier, retrait ageMax, ajout domicile',
    // Rework habitants (2026-10-20) : le champ `titre` devient `metier`
    //  (null = Sans-emploi, rôle neutre) ; `ageMax` disparaît (la
    //  maladie Gompertz est la seule cause de mort) ; `domicile`
    //  (null en vague 1) est ajouté par les garde-fous, pas ici.
    appliquer: migrerTitresVersMetiers,
  },
  {
    v: 4,
    quoi: 'vague 3a : renommages métiers Artisan→Commerçant, Chercheur→Scientifique, Sportif→Garde ; Propagandiste supprimé (Sans-emploi)',
    // Rework métiers & aménagements (2026-10-21) : la table du
    //  référentiel passe à 24 métiers. Les métiers disparus ou
    //  renommés migrent sur TOUTES les populations (joueurs ET
    //  cités libres). Le Propagandiste (supprimé avec ses charges)
    //  devient Sans-emploi (metier null).
    appliquer: migrerMetiersVague3a,
  },
  // ── Futures migrations : v: 5, 6… (une entrée = une évolution) ──
  //  Ex. ajout d'un champ aux personnages, renommage d'une ressource,
  //  restructuration d'un tableau : jamais de renumérotation.
]

/** Rework habitants (2026-10-20), migration v3 : convertit
 *  `titre` → `metier` sur TOUTES les populations (joueurs ET cités
 *  libres), supprime les champs `titre`/`ageMax` obsolètes et renomme
 *  `recap.titresAttribues` → `recap.metiersAttribues`. Le test
 *  nullish sur `metier` est CRITIQUE : loadLocal appelle elargirEtat
 *  AVANT migrerEtat, et elargirEtat ajoute déjà `metier: null` depuis
 *  DEFAUTS_PERSO — dans ce cas le titre est PERDU (comportement
 *  accepté : l'élargissement est la référence) ; sans elargirEtat
 *  préalable, le titre est converti. Idempotente. */
export function migrerTitresVersMetiers(state: GameState): void {
  for (const c of toutesLesPopulations(state) as unknown as Array<Record<string, unknown>>) {
    if (c.titre !== undefined && (c.metier === undefined || c.metier === null)) {
      c.metier = c.titre
    }
    delete c.titre
    delete c.ageMax
  }
  for (const p of state.players as unknown as Array<{ recap?: Record<string, unknown> }>) {
    const recap = p.recap
    if (recap && recap.titresAttribues !== undefined) {
      const existants = recap.metiersAttribues as Record<string, unknown> | null | undefined
      if (existants == null || Object.keys(existants).length === 0) {
        recap.metiersAttribues = recap.titresAttribues
      }
      delete recap.titresAttribues
    }
  }
}

/** Vague 3a (rework métiers & aménagements, 2026-10-21), migration
 *  v4 : renomme les métiers disparus du référentiel sur toutes les
 *  populations et passe les Propagandistes Sans-emploi. Idempotente
 *  (un métier déjà renommé ne matche plus la table). */
export function migrerMetiersVague3a(state: GameState): void {
  const RENOMS: Record<string, string | null> = {
    Artisan: 'Commerçant',
    Chercheur: 'Scientifique',
    Sportif: 'Garde',
    Propagandiste: null, // supprimé (charges comprises) → Sans-emploi
  }
  for (const c of toutesLesPopulations(state) as unknown as Array<{ metier?: string | null }>) {
    if (c.metier && c.metier in RENOMS) c.metier = RENOMS[c.metier]
  }
}

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
