// ══════════════════════════════════════════════════════════════════════
//  Store React — état de jeu, persistance (local ou Supabase), realtime
//  Mode 'local' : localStorage · Mode 'supabase' : table `parties_chasse_peche`
//  Verrou optimiste : chaque mutation sauvegarde ; si une mise à jour
//  distante arrive pendant une édition locale, bandeau de conflit + recharge.
//  La configuration (formules + référentiels) est COMMUNE à toutes les
//  parties : clé localStorage dédiée, éditable en permanence (même sans
//  partie en cours), propagée à la partie en cours et aux nouvelles parties,
//  et alignée sur les parties rejointes/importées/distantes.
// ══════════════════════════════════════════════════════════════════════

import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react'
import type { GameState } from '../engine/types'
import { runTurn, migrerNomsMinisteres, normaliserEtat } from '../engine/engine'
import type { SetupLine } from '../engine/setup'
import { createGame } from '../engine/setup'
import { cfgOf, convergerConfig, cloneDefaultConfig, type GameConfig } from '../config/defaultConfig'
import * as storage from './storage'
import * as remote from '../supabase/client'

export type Mode = 'local' | 'supabase'

interface GameContextValue {
  state: GameState | null
  mode: Mode
  salon: string
  saving: boolean
  conflit: boolean
  lastSavedAt: number | null
  /** Configuration commune à toutes les parties (éditable en permanence). */
  globalConfig: GameConfig
  /** Édite la configuration commune — persistée et propagée à la partie en cours. */
  setGlobalCfg: (fn: (c: GameConfig) => void) => void
  newGame: (setups: SetupLine[], seed: number, mode: Mode, salon?: string) => void
  joinGame: (salon: string) => Promise<boolean>
  nextTurn: () => void
  update: (mutator: (s: GameState) => void) => void
  replaceState: (s: GameState) => void
  saveNow: () => void
  reset: () => void
  importState: (json: string) => boolean
  exportState: () => string
}

const GameContext = createContext<GameContextValue | null>(null)

/** Configuration commune initiale : localStorage dédié, fusionnée sur les défauts. */
function initialGlobalConfig(): GameConfig {
  const loaded = storage.loadGlobalConfig()
  return JSON.parse(JSON.stringify(cfgOf(loaded ?? undefined).config)) as GameConfig
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  // ── Configuration commune (localStorage dédié, indépendant des parties) ──
  const [globalConfig, setGlobalConfig] = useState<GameConfig>(initialGlobalConfig)

  // ── État de jeu : une partie reprend TOUJOURS la configuration commune ──
  const [state, setState] = useState<GameState | null>(() => {
    const loaded = storage.loadLocal()
    if (!loaded) return null
    loaded.config = JSON.parse(JSON.stringify(convergerConfig(globalConfig))) as GameConfig
    // Marqueur (v) : portefeuilles renommés (classeur → offices de cour).
    migrerNomsMinisteres(loaded)
    // Marqueur (a) : garde-fou anciennes sauvegardes — tableaux
    //  history/log/villes complétés (manquants = crash moteur/rendu).
    normaliserEtat(loaded)
    return loaded
  })

  const [mode, setMode] = useState<Mode>('local')
  const [salon, setSalon] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [conflit, setConflit] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const lastLocalEdit = useRef(0)
  // Revue 2026-10-15 (Q2/Q3 — multijoueur simultané) : les joueurs
  //  éditent CHACUN leur feuille en même temps. Un mutateur local ne doit
  //  plus partir d'un état figé (le dernier rendu local) mais être
  //  REJOUÉ au moment de la mutation sur l'état le plus récent (local ou
  //  distant arrivé entre-temps) — les éditions simultanées de joueurs
  //  différents se COMBINENT au lieu de s'écraser.
  const pendingMutators = useRef<((s: GameState) => void)[]>([])

  // Références miroirs : lectures fiables dans les callbacks asynchrones.
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])
  const globalConfigRef = useRef(globalConfig)
  useEffect(() => { globalConfigRef.current = globalConfig }, [globalConfig])

  const persist = useCallback(async (s: GameState, m: Mode, salonId: string) => {
    setSaving(true)
    try {
      if (m === 'supabase' && salonId) {
        const ok = await remote.saveRemote(salonId, s)
        if (!ok) storage.saveLocal(s)
      } else {
        storage.saveLocal(s)
      }
      setLastSavedAt(Date.now())
    } finally {
      setSaving(false)
    }
  }, [])

  /** Aligne la configuration commune sur une config extérieure (partie rejointe, importée ou distante).
   *  Marqueur (x) : la config extérieure est CONVERGÉE (fusion + migrations
   *  + tampon) avant sauvegarde — la structure brute sauvegardée est
   *  identique à celle affichée dans Paramètres. */
  const syncGlobalCfg = useCallback((c: GameConfig) => {
    const clone = JSON.parse(JSON.stringify(convergerConfig(c))) as GameConfig
    globalConfigRef.current = clone
    setGlobalConfig(clone)
    storage.saveGlobalConfig(clone)
  }, [])

  /**
   * Édite la configuration COMMUNE (formules + référentiels).
   * Accessible en permanence : sans partie en cours, la modification est
   * simplement mémorisée (elle s'appliquera à la prochaine partie) ;
   * avec une partie en cours, elle est propagée immédiatement.
   */
  const setGlobalCfg = useCallback((fn: (c: GameConfig) => void) => {
    // Marqueur (x) : le brouillon part de la config CONVERGÉE (fusion +
    // migrations + tampon de version) — la structure sauvegardée est
    // identique à celle affichée dans les onglets Paramètres, et les
    // migrations ne sont jamais REJOUÉES : une entrée supprimée ou
    // renommée (ministère, bâtiment…) ne « revient » plus.
    const draft = JSON.parse(JSON.stringify(convergerConfig(globalConfigRef.current))) as GameConfig
    fn(draft)
    globalConfigRef.current = draft
    setGlobalConfig(draft)
    storage.saveGlobalConfig(draft)
    const s = stateRef.current
    if (s) {
      const s2 = JSON.parse(JSON.stringify(s)) as GameState
      s2.config = JSON.parse(JSON.stringify(draft)) as GameConfig
      stateRef.current = s2
      setState(s2)
      lastLocalEdit.current = Date.now()
      void persist(s2, mode, salon)
    }
  }, [mode, salon, persist])

  const update = useCallback((mutator: (s: GameState) => void) => {
    // Revue (Q1) : clone STRUCTUREL (structuredClone, ~3× plus rapide
    //  que JSON.parse(JSON.stringify) sur les gros états, sans passer
    //  par une chaîne). Les mutateurs pendants sont rejoués dans
    //  l'ordre (Q2) : une mise à jour distante reçue entre-temps sert
    //  de base — les éditions simultanées se COMBINENT.
    setState((prev) => {
      if (!prev) return prev
      const draft = structuredClone(prev) as GameState
      for (const m of pendingMutators.current) m(draft)
      pendingMutators.current = []
      mutator(draft)
      lastLocalEdit.current = Date.now()
      void persist(draft, mode, salon)
      return draft
    })
  }, [mode, salon, persist])

  const nextTurn = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev
      const draft = structuredClone(prev) as GameState
      for (const m of pendingMutators.current) m(draft)
      pendingMutators.current = []
      runTurn(draft)
      lastLocalEdit.current = Date.now()
      void persist(draft, mode, salon)
      return draft
    })
  }, [mode, salon, persist])

  const newGame = useCallback((setups: SetupLine[], seed: number, m: Mode, salonId?: string) => {
    // La nouvelle part démarre avec la configuration commune actuelle,
    // convergée (marqueur (x)) : format identique à l'affichage.
    const s = createGame(setups, seed, m, convergerConfig(globalConfigRef.current))
    setMode(m)
    setSalon(salonId ?? '')
    setConflit(false)
    stateRef.current = s
    setState(s)
    void persist(s, m, salonId ?? '')
  }, [persist])

  /** Rejoint une partie multijoueur existante (chargée depuis Supabase). */
  const joinGame = useCallback(async (salonId: string): Promise<boolean> => {
    const s = await remote.loadRemote(salonId)
    if (!s) return false
    // Paramètres communs : on adopte la configuration de la partie rejointe.
    if (s.config) syncGlobalCfg(s.config)
    // Marqueur (x) : la config de la partie rejointe est convergée
    // (migrations + tampon) — plus jamais re-migrée ensuite.
    s.config = JSON.parse(JSON.stringify(convergerConfig(s.config))) as GameConfig
    // Marqueur (v) : portefeuilles renommés (classeur → offices de cour).
    migrerNomsMinisteres(s)
    normaliserEtat(s)
    setMode('supabase')
    setSalon(salonId)
    setConflit(false)
    lastLocalEdit.current = 0
    stateRef.current = s
    setState(s)
    return true
  }, [syncGlobalCfg])

  const replaceState = useCallback((s: GameState) => {
    stateRef.current = s
    setState(s)
    lastLocalEdit.current = Date.now()
    void persist(s, mode, salon)
  }, [mode, salon, persist])

  const saveNow = useCallback(() => {
    if (state) void persist(state, mode, salon)
  }, [state, mode, salon, persist])

  const reset = useCallback(() => {
    storage.clearLocal()
    stateRef.current = null
    setState(null)
    setConflit(false)
  }, [])

  const importState = useCallback((json: string) => {
    const s = storage.importJson(json)
    if (s) {
      // Paramètres communs : la partie importée impose sa configuration.
      if (s.config) syncGlobalCfg(s.config)
      // Marqueur (x) : la config importée est convergée (migrations +
      // tampon) — plus jamais re-migrée ensuite.
      s.config = JSON.parse(JSON.stringify(convergerConfig(s.config))) as GameConfig
      // Marqueur (v) : portefeuilles renommés (classeur → offices de cour).
      migrerNomsMinisteres(s)
      normaliserEtat(s)
      stateRef.current = s
      setState(s)
      lastLocalEdit.current = Date.now()
      void persist(s, mode, salon)
      return true
    }
    return false
  }, [mode, salon, persist, syncGlobalCfg])

  const exportState = useCallback(() => (state ? storage.exportJson(state) : ''), [state])

  // Abonnement realtime (mode supabase)
  useEffect(() => {
    if (mode !== 'supabase' || !salon) return
    const unsub = remote.subscribeRemote(salon, (remoteState) => {
      // Marqueur (a) : les états distants arrivent BRUTS — même garde-fou
      //  que les chargements locaux (villes complétées).
      normaliserEtat(remoteState)
      const localDirty = Date.now() - lastLocalEdit.current < 1500
      if (localDirty) {
        // Revue (Q2/Q3) : une édition locale est en cours — l'état
        //  distant devient la NOUVELLE BASE du prochain mutateur (le
        //  rebase est automatique : update/nextTurn partent toujours de
        //  l'état courant, qui est maintenant distant). Le bandeau
        //  signale la fusion ; les éditions de feuilles DIFFÉRENTES
        //  se combinent, une même valeur éditée par deux joueurs
        //  prend la dernière écriture (dernier clic gagne).
        setConflit(true)
      }
      stateRef.current = remoteState
      setState(remoteState)
      // Paramètres communs : on suit la configuration arrivée avec la partie.
      if (remoteState.config) syncGlobalCfg(remoteState.config)
    })
    return unsub
  }, [mode, salon, syncGlobalCfg])

  const value = useMemo<GameContextValue>(() => ({
    state, mode, salon, saving, conflit, lastSavedAt,
    globalConfig, setGlobalCfg,
    newGame, joinGame, nextTurn, update, replaceState, saveNow, reset, importState, exportState,
  }), [state, mode, salon, saving, conflit, lastSavedAt, globalConfig, setGlobalCfg,
    newGame, joinGame, nextTurn, update, replaceState, saveNow, reset, importState, exportState])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame doit être utilisé dans <GameProvider>')
  return ctx
}
