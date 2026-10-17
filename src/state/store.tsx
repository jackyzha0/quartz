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

/** PROTOCOLE v2 (étape 2, 2026-10-17) — feature flag localStorage
 *  « cpe.proto2 » = "1" : Fin de tour par événements append-only +
 *  résolution SERVEUR (Edge Function resoudre-tour). Défaut : v1
 *  (l'ancien flux). Bascule par joueur, dans la barre de jeu. */
function proto2Actif(): boolean {
  // Étape 3 : v2 est le PROTOCOLE PAR DÉFAUT. Le flag ne sert plus
  //  qu'au DOWNGRADE volontaire (« cpe.proto2 » = "0") pour revenir
  //  à l'ancien flux (dépannage).
  try { return window.localStorage.getItem('cpe.proto2') !== '0' } catch { return true }
}

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
  // Miroir asynchrone (lecture fiable dans les callbacks async).
  const barriereRef = useRef(barriere)
  useEffect(() => { barriereRef.current = barriere }, [barriere])
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
  const persist = useCallback((s: GameState, m: Mode, salonId: string, forcer = false) => {
    persistPending.current = s
    if (persistDebounce.current) clearTimeout(persistDebounce.current)
    persistDebounce.current = setTimeout(async () => {
      const toSave = persistPending.current
      persistPending.current = null
      if (!toSave) return
      setSaving(true)
      try {
        // Local TOUJOURS (anti-perte perso : chaque mutation est
        //  dans le localStorage de la machine).
        storage.saveLocal(toSave)
        // Réseau — PROTOCOLE v2 (étape 3, 2026-10-17) : pendant le
        //  tour, PLUS AUCUN upsert d'état complet par mutation. À
        //  16 000 habitants, chaque action poussait ~5 Mo qui
        //  déclenchait chez les 7 autres joueurs un événement
        //  realtime → re-téléchargement complet → lag en simultané.
        //  L'état du salon n'est plus écrit qu'à la RÉSOLUTION du
        //  tour par la Edge Function (fusion des sections par
        //  joueur — rien ne peut être perdu : chaque joueur est
        //  entièrement reconstruit depuis SA section). Anti-panne :
        //  bouton 💾 (forcer=true) et flush beforeunload/onglet
        //  caché poussent toujours l'état complet (reprise depuis
        //  n'importe quelle machine après un crash).
        if (m === 'supabase' && salonId && (!proto2Actif() || forcer)) {
          const ok = await remote.saveRemote(salonId, toSave)
          if (!ok) storage.saveLocal(toSave)
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
      // BUG « actions non prises en compte » (2026-10-17) : stateRef
      //  n'était mis à jour que par le useEffect de rendu — une
      //  action suivie d'un « Fin de tour » RAPIDE capturait la
      //  section sur un état SANS la dernière action. Mise à jour
      //  SYNCHRONE : la section du prochain Fin de tour part
      //  toujours de l'état le plus récent.
      stateRef.current = draft
      persist(draft, mode, salon)
      // SECTION VIVANTE (bug « techs/constructions perdues au tour
      //  suivant » 2026-10-17) : après avoir cliqué « Fin de tour »,
      //  un joueur qui continue à jouer (déblocage d'une tech,
      //  construction…) produisait des actions ABSENTES de sa
      //  section déjà poussée — perdues à la résolution. Chaque
      //  mutation RAFRAÎCHIT la section (upsert idempotent par
      //  (salon, tour, joueur, 'section')) : elle reste exacte
      //  jusqu'à la résolution, quel que soit le moment du clic.
      if (mode === 'supabase' && salon && proto2Actif() && barriereRef.current.monTourPousse) {
        const moi = monNumeroRef.current
        void remote.pousserSectionV2(salon, moi, {
          player: structuredClone(draft.players.find((q) => q.n === moi) ?? null),
          population: structuredClone(draft.population[moi] ?? []),
          routes: structuredClone(draft.routesCommerce ?? []),
          citesLibres: structuredClone(draft.citesLibres ?? []),
          log: structuredClone(draft.log.slice(-50)),
          tour: draft.turn,
        })
      }
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
      // ── PROTOCOLE v2 (flag cpe.proto2) : événements + serveur ──
      if (proto2Actif()) {
        await nextTurnV2(st, moi)
        return
      }
      // ── PROTOCOLE v1 (défaut) : barrière par colonne sections ──
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
    // v2 : persist ne pousse PLUS l'état pendant le tour — une
    //  résolution locale doit TOUJOURS publier, sinon le salon
    //  reste à l'ancien tour (tour fantôme local, bug 2026-10-17).
    if (mode === 'supabase' && salon && proto2Actif()) {
      await remote.publierEtatFusionne(salon, draft)
    }
  }, [mode, salon, persist])

  /** FORCER le tour : ignorer la barrière, résoudre seul + publier.
   *  Bouton « ⏭ Forcer » (test solo, joueur absent). */
  const forceNextTurn = useCallback(() => {
    setBarriere({ prets: new Set(), monTourPousse: false })
    // v2 : le Forcer passe par la résolution SERVEUR avec la liste
    //  d'attendus RÉDUITE aux joueurs ayant poussé (les absents
    //  sont ignorés — leurs sections non poussées ne seront pas
    //  dans la fusion, c'est la sémantique du Forcer). On garde le
    //  repli local si le serveur est indisponible.
    if (proto2Actif() && mode === 'supabase' && salon) {
      void (async () => {
        const st = stateRef.current
        if (!st) return
        const moi = monNumeroRef.current
        // MA section d'abord (si pas déjà poussée)
        const maSection: remote.SectionJoueur = {
          player: structuredClone(st.players.find((q) => q.n === moi) ?? null),
          population: structuredClone(st.population[moi] ?? []),
          routes: structuredClone(st.routesCommerce ?? []),
          citesLibres: structuredClone(st.citesLibres ?? []),
          log: structuredClone(st.log.slice(-50)),
          tour: st.turn,
        }
        await remote.pousserSectionV2(salon, moi, maSection)
        const prets = await remote.lireBarriereV2(salon, st.turn)
        const attendus = [...(prets ?? new Set([moi]))]
        if (attendus.length === 0) attendus.push(moi)
        const res = await remote.resoudreTourServeur(salon, st.turn, attendus)
        if (res.ok) {
          const nouveau = await remote.loadRemote(salon)
          if (nouveau) {
            normaliserEtat(nouveau)
            stateRef.current = nouveau
            setState(nouveau)
            setConflit(false)
          }
        } else {
          // repli local (serveur indisponible)
          await resoudreSeul()
        }
      })()
      return
    }
    void resoudreSeul()
  }, [resoudreSeul, mode, salon])

  /** PROTOCOLE v2 — Fin de tour : MA section en ÉVÉNEMENT append-only
   *  (table cp_events), puis la barrière est observée sur les
   *  événements du tour. Quand tous les joueurs attendus ont poussé,
   *  le premier qui le constate invoque la Edge Function
   *  « resoudre-tour » : la fusion + runTurn + publication se font
   *  côté SERVEUR (idempotent, verrouillé). Le client ne pousse
   *  JAMAIS l'état global. Repli : si l'événement ne passe pas
   *  (table absente — SQL v2 non exécuté) ou si la fonction serveur
   *  n'est pas déployée, retour au flux v1 puis à resoudreSeul. */
  /** Indirections pour les déclarations anticipées (ordre de
   *  déclaration : nextTurnV2 est défini avant les deux fonctions
   *  de repli qu'il appelle). */
  const pollerBarriereV2Ref = useRef<(attendus: number[], tour: number) => Promise<void>>(async () => {})
  const resoudreBarriereLocaleV2Ref = useRef<(attendus: number[], tour: number) => Promise<void>>(async () => {})

  const nextTurnV2 = useCallback(async (st: GameState, moi: number) => {
    const maSection: remote.SectionJoueur = {
      player: structuredClone(st.players.find((q) => q.n === moi) ?? null),
      population: structuredClone(st.population[moi] ?? []),
      routes: structuredClone(st.routesCommerce ?? []),
      citesLibres: structuredClone(st.citesLibres ?? []),
      log: structuredClone(st.log.slice(-50)),
      tour: st.turn,
    }
    setBarriere({ prets: new Set([moi]), monTourPousse: true })
    // Poussée avec RETRY (bug 2026-10-17 : un échec transitoire faisait
    //  passer le joueur au tour suivant LOCALEMENT sans rien publier —
    //  le salon restait à l'ancien tour et le reload perdait tout).
    //  Si la section ne part vraiment pas, ON N'AVANCE PAS : le joueur
    //  reste sur « ▶ Tour suivant » et peut recliquer. Un tour fantôme
    //  local est TOUJOURS pire qu'un tour non résolu.
    let ok = false
    for (let essai = 0; essai < 3 && !ok; essai++) {
      ok = await remote.pousserSectionV2(salon, moi, maSection)
      if (!ok) await new Promise((r) => setTimeout(r, 800 * (essai + 1)))
    }
    if (!ok) {
      // table cp_events absente (SQL v2 non exécuté) ou réseau KO :
      //  dernier repli — résolution LOCALE AVEC PUBLICATION (le
      //  joueur n'est jamais bloqué, et le salon avance pour tous).
      setBarriere({ prets: new Set(), monTourPousse: false })
      await resoudreBarriereLocaleV2Ref.current([moi], st.turn)
      return
    }
    const attendus = st.players.map((q) => q.n)
    const prets = await remote.lireBarriereV2(salon, st.turn) ?? new Set<number>([moi])
    setBarriere({ prets, monTourPousse: true })
    if (prets.size >= attendus.length) {
      // je suis le dernier : demander la résolution SERVEUR
      const res = await remote.resoudreTourServeur(salon, st.turn, attendus)
      if (res.ok) {
        // le serveur a publié : récupérer l'état du tour suivant
        const nouveau = await remote.loadRemote(salon)
        if (nouveau) {
          normaliserEtat(nouveau)
          stateRef.current = nouveau
          setState(nouveau)
          setBarriere({ prets: new Set(), monTourPousse: false })
          setConflit(false)
        }
      } else if (!res.dejaPublie) {
        // FONCTION SERVEUR INDISPONIBLE — repli : résolution LOCALE
        //  AVEC PUBLICATION (bug 2026-10-17 : l'ancien repli faisait
        //  runTurn SANS publier — chaque joueur avançait chez lui,
        //  le salon restait à l'ancien tour, et un reload perdait
        //  tout). On fusionne les sections du tour comme la Edge
        //  Function le ferait, on exécute runTurn, et on PUBLIE :
        //  les autres joueurs reçoivent le tour par le realtime.
        setBarriere({ prets: new Set(), monTourPousse: false })
        await resoudreBarriereLocaleV2Ref.current(attendus, st.turn)
      }
    } else {
      // attendre : poll léger des événements du tour ; quand la
      //  barrière est complète, n'importe qui invoque le serveur —
      //  elle est idempotente, un double appel est sans effet.
      void pollerBarriereV2Ref.current(attendus, st.turn)
    }
  }, [salon])

  /** REPLI v2 — résolution LOCALE AVEC PUBLICATION : la Edge
   *  Function est indisponible (absente, erreur, quota). Même
   *  sémantique qu'elle : télécharge l'état de référence, fusionne
   *  les sections du tour (cp_events), runTurn, PUBLIE. Les autres
   *  joueurs reçoivent le tour par le realtime — aucune perte. */
  const resoudreBarriereLocaleV2 = useCallback(async (attendus: number[], tour: number) => {
    const sections = await remote.lireSectionsV2(salon, tour)
    if (!sections) { await resoudreSeul(); return }
    const ref = await remote.loadRemote(salon)
    if (!ref) { await resoudreSeul(); return }
    const popClone = structuredClone(ref.population)
    const draft: GameState = {
      ...structuredClone({ ...ref, population: {}, config: undefined }),
      population: popClone,
      config: ref.config,
    } as GameState
    // FUSION (bug 2026-10-17) : routes et cités libres sont PARTAGÉES —
    //  remplacer tout le tableau par la section du dernier joueur
    //  perdait les actions des autres. Routes : par PROPRIÉTAIRE.
    //  Cités libres : par cité, uniquement si modifiée vs référence.
    const newLogs: unknown[] = []
    const refCiteParNom = new Map((ref.citesLibres ?? []).map((c) => [c.nom, JSON.stringify(c)]))
    const citeFusionnes = new Map((draft.citesLibres ?? []).map((c) => [c.nom, c]))
    const routesFusionnees = [...(draft.routesCommerce ?? [])]
    for (const nStr of Object.keys(sections)) {
      const n = Number(nStr)
      const sec = sections[nStr]
      const pj = draft.players.find((q) => q.n === n)
      if (pj && sec.player) Object.assign(pj, sec.player)
      if (sec.population) draft.population[n] = sec.population as typeof draft.population[number]
      if (Array.isArray(sec.routes)) {
        for (let i = routesFusionnees.length - 1; i >= 0; i--) {
          if (routesFusionnees[i]?.joueur === n) routesFusionnees.splice(i, 1)
        }
        for (const r of sec.routes as typeof routesFusionnees) routesFusionnees.push(r)
      }
      if (Array.isArray(sec.citesLibres)) {
        for (const c of (sec.citesLibres ?? []) as NonNullable<typeof draft.citesLibres>) {
          const refJson = refCiteParNom.get(c.nom)
          if (refJson === undefined) {
            // cité créée pendant le tour
            if (!citeFusionnes.has(c.nom)) citeFusionnes.set(c.nom, c)
          } else if (JSON.stringify(c) !== refJson) {
            // cité modifiée par ce joueur → sa version
            citeFusionnes.set(c.nom, c)
          }
        }
      }
      if (Array.isArray(sec.log)) newLogs.push(...(sec.log as unknown[]))
    }
    draft.routesCommerce = routesFusionnees
    draft.citesLibres = [...citeFusionnes.values()]
    const logFusionne = [...draft.log, ...(newLogs as typeof draft.log)]
    draft.log = logFusionne.slice(-Math.max(50, draft.log.length))
    runTurn(draft)
    const ok = await remote.publierEtatFusionne(salon, draft)
    if (ok) {
      stateRef.current = draft
      setState(draft)
      lastLocalEdit.current = 0
      setBarriere({ prets: new Set(), monTourPousse: false })
      setConflit(false)
    }
    void attendus
  }, [salon, resoudreSeul])
  resoudreBarriereLocaleV2Ref.current = resoudreBarriereLocaleV2

  /** Poll v2 : barrière sur cp_events, résolution serveur dès
   *  complète. S'arrête dès que le tour publié a changé (le realtime
   *  apporte le nouvel état au handler subscribeRemote). */
  const pollerBarriereV2 = useCallback(async (attendus: number[], tour: number) => {
    for (let i = 0; i < 60; i++) {  // max 2 minutes
      await new Promise((r) => setTimeout(r, 2000))
      const prets = await remote.lireBarriereV2(salon, tour)
      if (!prets) continue
      if (stateRef.current?.turn !== tour) {
        setBarriere({ prets: new Set(), monTourPousse: false })
        return
      }
      setBarriere({ prets, monTourPousse: true })
      if (prets.size >= attendus.length) {
        const res = await remote.resoudreTourServeur(salon, tour, attendus)
        if (res.ok) {
          const nouveau = await remote.loadRemote(salon)
          if (nouveau) {
            normaliserEtat(nouveau)
            stateRef.current = nouveau
            setState(nouveau)
            setBarriere({ prets: new Set(), monTourPousse: false })
            setConflit(false)
          }
          return
        }
        if (res.dejaPublie) return
        // repli avec publication (cf. nextTurnV2)
        setBarriere({ prets: new Set(), monTourPousse: false })
        await resoudreBarriereLocaleV2(attendus, tour)
        return
      }
    }
  }, [salon])



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
    if (toSave) persist(toSave, mode, salon, true)
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
      // anti-perte : TOUJOURS le localStorage, réseau si salon —
      //  y compris en v2 (fermeture d'onglet / mise en veille :
      //  l'état complet part pour la reprise multi-machines).
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
      // GARDE DE TOUR (correctif rollback aléatoire 2026-10-17) :
      //  ignorer tout état PLUS ANCIEN que l'état courant — même si
      //  un écriture périmée passait la garde serveur, elle ne peut
      //  plus faire RECULER l'affichage des clients à jour.
      const tourLocal = stateRef.current?.turn ?? 0
      if (typeof remoteState.turn === 'number' && remoteState.turn < tourLocal) return
      // PROTOCOLE v2 (étape 3) : pendant le tour, un état de MÊME tour
      //  ne peut venir que d'un 💾 ou d'un flush d'un autre joueur —
      //  or en v2 la source de vérité du tour est la résolution
      //  SERVEUR (sections par joueur, fusionnées au tour suivant).
      //  Accepter un état de même tour écraserait les actions locales
      //  en cours des autres joueurs. En v2, on n'accepte donc
      //  qu'un tour STRICTEMENT plus récent (la résolution serveur).
      if (proto2Actif() && typeof remoteState.turn === 'number'
        && remoteState.turn === tourLocal) {
        return
      }
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
