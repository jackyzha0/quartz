// ══════════════════════════════════════════════════════════════════════
//  Persistance locale (localStorage) — mode solo/hotseat
//  + configuration COMMUNE à toutes les parties (clé dédiée).
// ══════════════════════════════════════════════════════════════════════

import type { GameState } from '../engine/types'
import { cloneDefaultConfig, type GameConfig } from '../config/defaultConfig'

const KEY = 'chasse-et-peche:save'
const CONFIG_KEY = 'chasse-et-peche:config'

/**
 * FORMAT COMPACT (optimisation 2026-10-16) : à 16 000+ habitants, la
 * population fait ~12 Mo de JSON — la majorité des champs de chaque
 * personnage sont à leur valeur PAR DÉFAUT (mariage null, titre null,
 * traits ['', '', ''], armee null, fecondite 0…). Le compactage omet
 * ces champs ; l'EXPANSION au chargement les reconstruit — aucune
 * donnée n'est perdue (un champ omis = sa valeur par défaut).
 * Gain mesuré : ~40 % de la taille de l'état.
 */
const DEFAUTS_PERSO: Record<string, unknown> = {
  mariage: null, mere: null, pere: null, pereBio: null, armee: null,
  titre: null, education: null, enfantBatard: false, fecondite: 0,
  ministere: null,
}

/**
 * Compacter un état POUR L'ÉCRITURE (récursif sur toutes les
 * populations : joueurs et cités libres).
 *
 * OPTIMISATION FRAPPE 2026-10-16 : ne clone PAS — compacte EN PLACE.
 * L'appelant fournit une copie jetable (le store clone déjà l'état à
 * chaque update ; saveRemote en sérialise le résultat). À 16 000
 * habitants, le structuredClone() ici DOUBLAIT le coût de chaque
 * frappe (~113 ms de blocage → ~45 ms).
 *
 * ⚠ Ne passez JAMAIS l'état React vivant : la fonction MUT son
 * argument (les champs par défaut sont supprimés de l'objet). Pour
 * un état à conserver, passez structuredClone(state) vous-même.
 */
export function compacterEtat(state: GameState): GameState {
  const compact = (liste: unknown[]): void => {
    for (const c of liste as Array<Record<string, unknown>>) {
      for (const [k, def] of Object.entries(DEFAUTS_PERSO)) {
        if (k in c && c[k] === def) delete c[k]
      }
      if (Array.isArray(c.traits) && (c.traits as string[]).every((t) => !t)) delete c.traits
    }
  }
  for (const liste of Object.values(state.population ?? {})) compact(liste ?? [])
  for (const cite of state.citesLibres ?? []) compact(cite.population ?? [])
  return state
}

/** Élargir un état compacté : les champs omis retrouvent leurs
 *  valeurs par défaut (idempotent — un état non compacté passe
 *  sans changement). */
export function elargirEtat(state: GameState): GameState {
  const expand = (liste: unknown[]): void => {
    for (const c of liste as Array<Record<string, unknown>>) {
      for (const [k, def] of Object.entries(DEFAUTS_PERSO)) {
        if (!(k in c)) c[k] = def
      }
      if (!Array.isArray(c.traits)) c.traits = ['', '', '']
    }
  }
  for (const liste of Object.values(state.population ?? {})) expand(liste ?? [])
  for (const cite of state.citesLibres ?? []) expand(cite.population ?? [])
  return state
}

export function saveLocal(state: GameState): boolean {
  try {
    // compacter une COPIE : l'état reçu est souvent l'état React VIVANT
    // (compacterEtat mute son argument).
    localStorage.setItem(KEY, JSON.stringify(compacterEtat(structuredClone(state))))
    return true
  } catch {
    return false
  }
}

export function loadLocal(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const state = JSON.parse(raw) as GameState
    if (!state || !Array.isArray(state.players) || state.players.length === 0) return null
    // format compact : reconstruire les champs omis (valeurs par défaut)
    elargirEtat(state)
    // migration : les parties sans config reçoivent la config par défaut
    if (!state.config) state.config = cloneDefaultConfig()
    return state
  } catch {
    return null
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

// ── Configuration commune (indépendante des parties) ──────────────────

export function saveGlobalConfig(config: GameConfig): boolean {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
    return true
  } catch {
    return false
  }
}

export function loadGlobalConfig(): GameConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return null
    const config = JSON.parse(raw) as GameConfig
    if (!config || !Array.isArray(config.titres) || !config.params) return null
    return config
  } catch {
    return null
  }
}

export function exportJson(state: GameState): string {
  return JSON.stringify(state, null, 2)
}

export function importJson(text: string): GameState | null {
  try {
    const state = JSON.parse(text) as GameState
    if (!state || !Array.isArray(state.players) || state.players.length === 0) return null
    if (!state.config) state.config = cloneDefaultConfig()
    return state
  } catch {
    return null
  }
}
