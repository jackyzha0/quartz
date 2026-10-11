// ══════════════════════════════════════════════════════════════════════
//  OUTILS TRANSVERSAUX DU MOTEUR
//  Identifiants, noms, dynasties nobles, récapitulatifs.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, PlayerRecap } from './types'
import type { Rng } from './rng'
import { cfgOf, type Cfg } from './gameData'

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

function emptyRecap(): PlayerRecap {
  return {
    conceptions: {}, naissances: {}, deces: {}, decesMaladie: 0,
    mariagesNobles: {}, conversions: {}, titresAttribues: {}, crises: [],
    commandantTombe: null,
  }
}

function bump(dict: Record<string, number>, key: string, n = 1) {
  if (!key) key = '(inconnu)'
  dict[key] = (dict[key] ?? 0) + n
}
