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

/** État de la barrière du tour en cours (mode multijoueur) :
 *  n° des joueurs qui ont poussé leur section de fin de tour. */
export interface EtatBarriere {
  prets: Set<number>
  monTourPousse: boolean
}

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
  /** Mon n° de joueur dans le salon multijoueur (persisté par salon). */
  monNumero: number
  /** Le définir (choix à l'entrée du salon). */
  setMonNumero: (n: number) => void
  /** État de la barrière du tour (joueurs qui ont finit leur tour). */
  barriere: EtatBarriere
  /** FORCER le passage du tour (ignore la barrière) — test solo,
   *  joueur absent : applique et publie l'état local immédiatement. */
  forceNextTurn: () => void
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
  // ── TOUR-SIMULTANÉ (barrière stricte, 2026-10-16) ──
  // Mon n° de joueur : persisté par salon (localStorage) — chaque
  //  navigateur choisit son numéro à l'entrée du salon (SetupPanel).
  const [monNumero, setMonNumero] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('cpe.monNumero')
      return raw ? parseInt(raw, 10) : 1
    } catch { return 1 }
  })
  const monNumeroRef = useRef(monNumero)
  useEffect(() => { monNumeroRef.current = monNumero }, [monNumero])
  const setMonNumeroPersist = useCallback((n: number) => {
    setMonNumero(n)
    monNumeroRef.current = n
    try { localStorage.setItem('cpe.monNumero', String(n)) } catch { /* noop */ }
  }, [])
  // Barrière du tour en cours : joueurs qui ont poussé leur section.
  const [barriere, setBarriere] = useState<EtatBarriere>({ prets: new Set(), monTourPousse: false })
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


  /**
   * SAUVEGARDE DEBOUNCÉE (optimisation multijoueur 2026-10-16) :
   * à 16 000 habitants, l'état JSON fait ~5 Mo — l'envoyer à CHAQUE
   * clic (clone 37 ms + sérialisation 15 ms + upload) sature le
   * réseau des 8 joueurs et le realtime Supabase. Les mutations
   * rapprochées (une saisie, une série de constructions) sont
   * FUSIONNÉES : seule la version finale part (la dernière gagne —
   * c'est déjà la sémantique du salon). La sauvegarde locale reste
   * immédiate (perte de données impossible : le localStorage est
   * écrit à chaque mutation).
   */
  const persistDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const persistPending = useRef<GameState | null>(null)
  /** Dernière sauvegarde RÉSEAU (revue lag simultané 2026-10-17) :
   *  en mode barrière, on pousse l'état complet au plus toutes les
   *  30 s pendant le tour — le reste part au flush et à la
   *  résolution du tour. */
  const lastRemotePush = useRef(0)
  /**
   * SAUVEGARDE DEBOUNCÉE — locale ET réseau (optimisation frappe
   * 2026-10-16) : à 16 000 habitants, chaque frappe coûtait ~113 ms
   * de BLOCAGE (structuredClone du update + compacterEtat qui
   * re-clonait + JSON.stringify + setItem synchrone + upsert). À la
   * saisie, les mutations arrivent plus vite que la sauvegarde :
   * le thread principal était saturé. Désormais UNE frappe ne
   * déclenche AUCUNE écriture — la version finale part après
   * 400 ms d'inactivité (la plus récente gagne, sémantique du
   * salon inchangée). Anti-perte GARANTI :
   *  · beforeunload → flush immédiat (fermeture d'onglet) ;
   *  · visibilitychange (hidden) → flush (changement d'onglet /
   *    mise en veille, notamment mobile) ;
   *  · bouton Sauvegarder → flush ;
   *  · REJOIGNE un salon / OUVRE une ancienne partie : le dernier
   *    état flushé y est déjà.
   */
  const persist = useCallback((s: GameState, m: Mode, salonId: string) => {
    persistPending.current = s
    if (persistDebounce.current) clearTimeout(persistDebounce.current)
    persistDebounce.current = setTimeout(async () => {
      const toSave = persistPending.current
      persistPending.current = null
      if (!toSave) return
      setSaving(true)
      try {
        // Local TOUJOURS (anti-perte : le localStorage est écrit à
        //  chaque mutation).
        storage.saveLocal(toSave)
        // RÉSEAU — BEAUCOUP PLUS RARE (revue lag simultané
        //  2026-10-17) : en mode barrière stricte, l'état de
        //  RÉFÉRENCE n'est utile aux autres joueurs qu'à la
        //  résolution du tour (publierEtatFusionne). Pousser ~5 Mo
        //  à chaque mutation arrosait tous les clients d'événements
        //  realtime → re-téléchargements complets en boucle → lag
        //  dès que deux joueurs jouent en même temps. Désormais :
        //  sauvegarde réseau réduite à toutes les 30 s minimum
        //  (filet anti-panne : un client qui CRASHE peut être
        //  récupéré par une autre machine avec ≤ 30 s de retard),
        //  le reste ne part qu'au flush (beforeunload/onglet
        //  caché/Sauvegarder) et à la résolution du tour.
        if (m === 'supabase' && salonId) {
          const maintenant = Date.now()
          if (maintenant - lastRemotePush.current >= 30000) {
            lastRemotePush.current = maintenant
            const ok = await remote.saveRemote(salonId, toSave)
            if (!ok) storage.saveLocal(toSave)
          }
        }
        setLastSavedAt(Date.now())
      } finally {
        setSaving(false)
      }
    }, 400)
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
      persist(s2, mode, salon)
    }
  }, [mode, salon, persist])

  /**
   * CLONE SÉLECTIF (optimisation frappe 2026-10-16) : clone l'état en
   *  SÉPARANT la population (l'objet le plus lourd : 34 des 39 ms du
   *  clone) et la config (181 Ko, immuable entre deux saves —
   *  setGlobalCfg la remplace par un nouvel objet, jamais mutée).
   *  La config est réattachée PAR RÉFÉRENCE : sûr car aucun mutateur
   *  ne la touche en place.
   */
  const update = useCallback((mutator: (s: GameState) => void) => {
    // Revue (Q1) : clone STRUCTUREL. Les mutateurs pendants sont
    //  rejoués dans l'ordre (Q2) : une mise à jour distante reçue
    //  entre-temps sert de base — les éditions simultanées se
    //  COMBINENT.
    setState((prev) => {
      if (!prev) return prev
      const popClone = structuredClone(prev.population)
      const draft = {
        ...structuredClone({ ...prev, population: {}, config: undefined }),
        population: popClone,
        config: prev.config,
      } as GameState
      for (const m of pendingMutators.current) m(draft)
      pendingMutators.current = []
      mutator(draft)
      lastLocalEdit.current = Date.now()
      persist(draft, mode, salon)
      return draft
    })
  }, [mode, salon, persist])

  /**
   * FIN DE TOUR — TOUR-SIMULTANÉ (barrière stricte, 2026-10-16).
   *  Mode LOCAL : comportement inchangé (runTurn immédiat).
   *  Mode SUPABASE : je pousse MA section (mes changements du tour),
   *   puis on attend que TOUS les joueurs aient poussé. Le premier
   *   client qui constate la barrière complète fusionne les sections
   *   dans l'état de référence, exécute runTurn() et publie le
   *   résultat — tout le monde reçoit le tour suivant par realtime.
   *   Barrière STRICTE : le tour n'avance que si tous ont cliqué.
   */
  const nextTurn = useCallback(() => {
    // ── MODE LOCAL : runTurn immédiat ──
    if (mode !== 'supabase' || !salon) {
      setState((prev) => {
        if (!prev) return prev
        const popClone = structuredClone(prev.population)
        const draft = {
          ...structuredClone({ ...prev, population: {}, config: undefined }),
          population: popClone,
          config: prev.config,
        } as GameState
        for (const m of pendingMutators.current) m(draft)
        pendingMutators.current = []
        runTurn(draft)
        lastLocalEdit.current = Date.now()
        persist(draft, mode, salon)
        return draft
      })
      return
    }
    // ── MODE SUPABASE : barrière stricte ──
    void (async () => {
      const st = stateRef.current
      if (!st) return
      const moi = monNumeroRef.current
      // 1. extraire MA section (ce que j'ai modifié ce tour-ci)
      const maSection: remote.SectionJoueur = {
        player: structuredClone(st.players.find((q) => q.n === moi) ?? null),
        population: structuredClone(st.population[moi] ?? []),
        routes: structuredClone(st.routesCommerce ?? []),
        citesLibres: structuredClone(st.citesLibres ?? []),
        log: structuredClone(st.log.slice(-50)),
        tour: st.turn,
      }
      setBarriere({ prets: new Set([moi]), monTourPousse: true })
      // 2. pousser ma section
      const apres = await remote.pousserSection(salon, moi, maSection)
      if (!apres) {
        // REPLI (2026-10-16) : la barrière a échoué — schéma Supabase
        //  non migré (colonnes sections/turn_done absentes : exécutez
        //  supabase/schema.sql), erreur réseau, ou salon en test solo.
        //  On ne bloque JAMAIS le tour : retour à la résolution
        //  immédiate (runTurn local + publication directe).
        setBarriere({ prets: new Set(), monTourPousse: false })
        await resoudreSeul()
        return
      }
      // 3. observer la barrière (poll léger) jusqu'à ce que tous
      //    les joueurs de la partie aient poussé
      const attendus = st.players.map((q) => q.n)
      const prets = new Set(Object.keys(apres.sections ?? {}).map(Number))
      setBarriere({ prets, monTourPousse: true })
      if (prets.size >= attendus.length) {
        // je suis le dernier : résoudre la barrière
        await resoudreBarriere(apres.sections, attendus)
      } else {
        // attendre : poll toutes les 2 s (le realtime nous préviendra
        //  aussi, le poll est le filet de sécurité)
        void pollerBarriere(attendus)
      }
    })()
  }, [mode, salon, persist])

  /** REPLI : résolution IMMÉDIATE sans barrière — runTurn sur l'état
   *  local courant puis publication directe (l'ancien flux, utilisé
   *  quand la barrière est indisponible : schéma non migré, réseau
   *  KO, ou test en solo dans un salon multijoueur). */
  const resoudreSeul = useCallback(async () => {
    const st = stateRef.current
    if (!st) return
    const popClone = structuredClone(st.population)
    const draft = {
      ...structuredClone({ ...st, population: {}, config: undefined }),
      population: popClone,
      config: st.config,
    } as GameState
    for (const m of pendingMutators.current) m(draft)
    pendingMutators.current = []
    runTurn(draft)
    stateRef.current = draft
    setState(draft)
    lastLocalEdit.current = Date.now()
    persist(draft, mode, salon)
  }, [mode, salon, persist])

  /** FORCER le tour : ignorer la barrière, résoudre seul + publier.
   *  Bouton « ⏭ Forcer » (test solo, joueur absent). */
  const forceNextTurn = useCallback(() => {
    setBarriere({ prets: new Set(), monTourPousse: false })
    void resoudreSeul()
  }, [resoudreSeul])

  /** Résoudre la barrière : fusionner les sections dans l'état de
   *  référence (téléchargé frais), exécuter runTurn, publier. */
  const resoudreBarriere = useCallback(async (
    sections: Record<string, remote.SectionJoueur>,
    attendus: number[],
  ) => {
    // état de référence FRAIS (pas notre état local)
    const ref = await remote.loadRemote(salon)
    if (!ref) return
    // fusionner chaque section dans le clone de référence
    const popClone = structuredClone(ref.population)
    const draft = {
      ...structuredClone({ ...ref, population: {}, config: undefined }),
      population: popClone,
      config: ref.config,
    } as GameState
    const newLogs: unknown[] = []
    for (const nStr of Object.keys(sections)) {
      const n = Number(nStr)
      const sec = sections[nStr]
      if (!sec) continue
      const pj = draft.players.find((q) => q.n === n)
      if (pj && sec.player) Object.assign(pj, sec.player)
      if (sec.population) draft.population[n] = sec.population as typeof draft.population[number]
      if (sec.routes) draft.routesCommerce = sec.routes as typeof draft.routesCommerce
      if (sec.citesLibres) draft.citesLibres = sec.citesLibres as typeof draft.citesLibres
      if (Array.isArray(sec.log)) newLogs.push(...(sec.log as unknown[]))
    }
    // journal fusionné : entrées de tous les joueurs, triées par tour
    const logFusionne = [...draft.log, ...(newLogs as typeof draft.log)]
    draft.log = logFusionne.slice(-Math.max(50, draft.log.length))
    void attendus
    // exécuter le tour
    runTurn(draft)
    // publier le nouvel état de référence
    const ok = await remote.publierEtatFusionne(salon, draft)
    if (ok) {
      stateRef.current = draft
      setState(draft)
      lastLocalEdit.current = 0
      setBarriere({ prets: new Set(), monTourPousse: false })
      setConflit(false)
    }
  }, [salon])

  /** Poller la barrière jusqu'à résolution (filet de sécurité du
   *  realtime ; s'arrête dès que la barrière est complète ou que le
   *  tour a changé). */
  const pollerBarriere = useCallback(async (attendus: number[]) => {
    const tourDebut = stateRef.current?.turn ?? 0
    for (let i = 0; i < 60; i++) {  // max 2 minutes
      await new Promise((r) => setTimeout(r, 2000))
      const b = await remote.lireBarriere(salon)
      if (!b) continue
      // le tour a été résolu par quelqu'un d'autre : le realtime
      //  nous amènera l'état ; on arrête le poll
      if (b.turn_done !== tourDebut) { setBarriere({ prets: new Set(), monTourPousse: false }); return }
      const prets = new Set(Object.keys(b.sections ?? {}).map(Number))
      setBarriere({ prets, monTourPousse: true })
      if (prets.size >= attendus.length) {
        await resoudreBarriere(b.sections ?? {}, attendus)
        return
      }
    }
  }, [salon, resoudreBarriere])

  const newGame = useCallback((setups: SetupLine[], seed: number, m: Mode, salonId?: string) => {
    // La nouvelle part démarre avec la configuration commune actuelle,
    // convergée (marqueur (x)) : format identique à l'affichage.
    const s = createGame(setups, seed, m, convergerConfig(globalConfigRef.current))
    setMode(m)
    setSalon(salonId ?? '')
    setConflit(false)
    stateRef.current = s
    setState(s)
    persist(s, m, salonId ?? '')
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
    persist(s, mode, salon)
  }, [mode, salon, persist])

  const saveNow = useCallback(() => {
    // FLUSH : annule le debounce et envoie immédiatement la version
    //  la plus récente (bouton « Sauvegarder » = intention explicite).
    if (persistDebounce.current) clearTimeout(persistDebounce.current)
    const toSave = persistPending.current ?? state
    persistPending.current = null
    if (toSave) persist(toSave, mode, salon)
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
      persist(s, mode, salon)
      return true
    }
    return false
  }, [mode, salon, persist, syncGlobalCfg])

  const exportState = useCallback(() => (state ? storage.exportJson(state) : ''), [state])

  // FLUSH avant fermeture/rafraîchissement de l'onglet (anti-perte,
  //  optimisation multijoueur 2026-10-16) : le debounce de 800 ms
  //  peut encore tenir la dernière action du joueur — on l'envoie
  //  immédiatement (sendBeacon n'accepte pas l'API Supabase, on
  //  déclenche la requête fetch directement via saveRemote).
  useEffect(() => {
    const flush = () => {
      if (persistDebounce.current) clearTimeout(persistDebounce.current)
      const toSave = persistPending.current
      if (!toSave) return
      persistPending.current = null
      // anti-perte : TOUJOURS le localStorage, réseau si salon
      storage.saveLocal(toSave)
      if (mode === 'supabase' && salon) void remote.saveRemote(salon, toSave)
    }
    const onHidden = () => { if (document.hidden) flush() }
    window.addEventListener('beforeunload', flush)
    // changement d'onglet / mise en veille : flush aussi (mobile !)
    document.addEventListener('visibilitychange', onHidden)
    return () => {
      window.removeEventListener('beforeunload', flush)
      document.removeEventListener('visibilitychange', onHidden)
    }
  }, [mode, salon])

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
    monNumero, setMonNumero: setMonNumeroPersist, barriere, forceNextTurn,
  }), [state, mode, salon, saving, conflit, lastSavedAt, globalConfig, setGlobalCfg,
    newGame, joinGame, nextTurn, update, replaceState, saveNow, reset, importState, exportState,
    monNumero, setMonNumeroPersist, barriere, forceNextTurn])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame doit être utilisé dans <GameProvider>')
  return ctx
}
