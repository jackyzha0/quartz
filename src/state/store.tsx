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
import { runTurn } from '../engine/engine'
import { migrerEtat } from '../engine/migrations'
import { fusionnerSections, rejouerEvenementsPartages, appliquerConfigMondiale } from '../engine/fusion'
import type { SetupLine } from '../engine/setup'
import { createGame } from '../engine/setup'
import { cfgOf, convergerConfig, type GameConfig } from '../config/defaultConfig'
import * as storage from './storage'
import { adopterConfig } from './configPriorite'
import * as remote from '../supabase/client'

// (RETRAIT 2026-10-19, brûlage audit R5) : le protocole v1 et son
//  feature flag « cpe.proto2 » ont été retirés — le protocole v2
//  (événements append-only + résolution serveur) est l'UNIQUE flux
//  de fin de tour, plus aucune bascule par joueur.

export type Mode = 'local' | 'supabase'

/** Salon multijoueur persisté (clé cpe.salon) — restauré au chargement
 *  pour RÉINTÉGRER automatiquement la partie après un rechargement de
 *  page (bug 2026-10-18 : mode et salon n'étaient JAMAIS persistés ; un
 *  joueur qui rechargeait retombait en mode 'local' — il jouait tout un
 *  tour débranché du salon, son Fin de tour ne poussait AUCUNE section,
 *  et la résolution du tour ignorait toutes ses actions). */
const LS_SALON = 'cpe.salon'
function readPersistedSalon(): string {
  try { return window.localStorage.getItem(LS_SALON) ?? '' } catch { return '' }
}
function persistSalon(salonId: string): void {
  try {
    if (salonId) window.localStorage.setItem(LS_SALON, salonId)
    else window.localStorage.removeItem(LS_SALON)
  } catch { /* noop */ }
}

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
  /** R3 (audit 2026-10-19, arbitrage Thibaut « bandeau d'alerte ») :
   *  true si la DERNIÈRE sauvegarde locale a échoué (quota localStorage
   *  dépassé / mode privé). Le bandeau de TurnBar propose l'export
   *  JSON de secours — la partie reste en mémoire, un rechargement
   *  sans export la perdrait. */
  saveLocaleEchec: boolean
  /** Configuration commune à toutes les parties (éditable en permanence).
   *  En multijoueur, SEUL le créateur de la partie peut l'éditer (règle
   *  2026-10-19) — sa config est publiée au salon et adoptée par tous. */
  globalConfig: GameConfig
  /** True si CE navigateur peut éditer la configuration : en local toujours ;
   *  en multijoueur, uniquement le créateur de la partie. */
  peutEditerConfig: boolean
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
  // CONFIG MONDIALE (règle 2026-10-19) : adoption au CHARGEMENT de la
  //  page — « les joueurs actualisent pour obtenir la modification ».
  //  Le localStorage local sert d'amorçe (hors-ligne) puis est remplacé
  //  par la config mondiale '__config__' dès qu'elle est joignable.
  useEffect(() => {
    void (async () => {
      const cfg = await remote.chargerConfigMondiale()
      if (cfg) syncGlobalCfg(cfg)
    })()
    // une seule fois au montage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── État de jeu : une partie reprend TOUJOURS la configuration commune ──
  const [state, setState] = useState<GameState | null>(() => {
    const loaded = storage.loadLocal()
    if (!loaded) return null
    // CONFIG MONDIALE : la partie chargée reçoit la config mondiale
    //  (globalConfig = mondiale adoptée au chargement) — la config
    //  embarquée de la sauvegarde n'est plus une source.
    loaded.config = JSON.parse(JSON.stringify(convergerConfig(globalConfig))) as GameConfig
    // MIGRATIONS VERSIONNÉES (étape 3) : normalisation + renommages
    //  portefeuilles exécutés UNE FOIS par état (tampon state.schema),
    //  au lieu d'appels manuels rejoués à chaque chargement.
    migrerEtat(loaded)
    return loaded
  })

  const [mode, setMode] = useState<Mode>('local')
  const [salon, setSalon] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [conflit, setConflit] = useState(false)
  // R3 (audit 2026-10-19, arbitrage « bandeau d'alerte ») : miroir du
  //  retour de storage.saveLocal — persist l'arme à chaque flush.
  const [saveLocaleEchec, setSaveLocaleEchec] = useState(false)
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
        // Local TOUJOURS (anti-perte perso : chaque mutation est
        //  dans le localStorage de la machine).
        // R3 (audit 2026-10-19, arbitrage Thibaut « bandeau d'alerte ») :
        //  on ne jette plus le retour — saveLocal peut échouer (QuotaExceeded,
        //  mode privé) ; l'échec arme le bandeau de TurnBar.
        setSaveLocaleEchec(!storage.saveLocal(toSave))
        // Réseau — RÈGLE (2026-10-19) : PLUS AUCUN upsert d'état par
        //  mutation, même en protocole v1 — la SEULE synchronisation
        //  est la fin de tour (résolution : Edge Function ou repli
        //  local). L'ancien flush fermeture d'onglet et l'ancien
        //  bouton 💾 écrasaient l'état du salon avec l'état local
        //  incomplet du joueur (pollution de la référence de fusion).
        void m; void salonId
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
    // N°1 (revue critique) : réinjecter dans l'état de partie courant —
    //  l'UI de jeu lit state.config (75 sites cfgOf(state.config)) ;
    //  sans cette réinjection, l'onglet Paramètres montrait la nouvelle
    //  config pendant que tout le jeu tournait sur l'ancienne.
    const s = stateRef.current
    if (s && s.config !== clone) {
      const s2 = { ...s, config: clone }
      stateRef.current = s2
      setState(s2)
    }
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
    // RÈGLE (2026-10-19, simplification) : la configuration ne se
    //  modifie PLUS pendant une partie — uniquement HORS partie
    //  (page d'accueil sans partie en cours). Ce garde-fou bloque tout
    //  appel programmatique pendant qu'une partie est chargée.
    if (stateRef.current) return
    const draft = JSON.parse(JSON.stringify(convergerConfig(globalConfigRef.current))) as GameConfig
    fn(draft)
    globalConfigRef.current = draft
    setGlobalConfig(draft)
    storage.saveGlobalConfig(draft)
    // (RETRAIT 2026-10-19, audit M2) : la branche morte « const s =
    //  stateRef.current; if (s) { …réinjection de la config dans la
    //  partie en cours… } » a été supprimée — INATTEIGNABLE depuis le
    //  garde `if (stateRef.current) return` ci-dessus (reste du refactor
    //  « config hors partie ») ; aucune partie chargée ne doit plus
    //  voir sa config muter, la config mondiale est unique (règle
    //  2026-10-19 ci-dessous).
    // CONFIG MONDIALE UNIQUE (règle 2026-10-19) : la config n'appartient
    //  à AUCUNE partie — elle est publiée dans la ligne mondiale '__config__'
    //  et s'applique à TOUTES les parties de tous les salons. Le garde du
    //  haut garantit qu'on est HORS partie : édition libre, dernier
    //  écrivain gagne ; les autres joueurs l'obtiennent en actualisant.
    void remote.sauverConfigMondiale(draft)
  }, [])

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
      if (mode === 'supabase' && salon && barriereRef.current.monTourPousse) {
        const moi = monNumeroRef.current
        void remote.pousserSectionV2(salon, moi, {
          player: structuredClone(draft.players.find((q) => q.n === moi) ?? null),
          population: structuredClone(draft.population[moi] ?? []),
          // SEULEMENT mes routes (bug duplication : la section
          //  embarquait toutes les routes du monde).
          routes: structuredClone(draft.routesCommerce ?? []).filter((r) => r.joueur === moi),
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
      // ── PROTOCOLE v2 UNIQUE (RETRAIT v1 2026-10-19, brûlage audit
      //  R5) : fin de tour TOUJOURS par événements append-only +
      //  résolution serveur — plus de bascule par feature flag. ──
      await nextTurnV2(st, moi)
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
    // CONFIG MONDIALE : effet en fin de tour, comme tout le reste
    //  (seulement en réseau : en local sans réseau, la config commune
    //  locale fait foi — pas de serveur pour la config mondiale).
    if (mode === 'supabase' && salon) {
      appliquerConfigMondiale(draft, await remote.chargerConfigMondiale())
    }
    runTurn(draft)
    stateRef.current = draft
    setState(draft)
    lastLocalEdit.current = Date.now()
    persist(draft, mode, salon)
    // v2 : persist ne pousse PLUS l'état pendant le tour — une
    //  résolution locale doit TOUJOURS publier, sinon le salon
    //  reste à l'ancien tour (tour fantôme local, bug 2026-10-17).
    if (mode === 'supabase' && salon) {
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
    if (mode === 'supabase' && salon) {
      void (async () => {
        const st = stateRef.current
        if (!st) return
        const moi = monNumeroRef.current
        // MA section d'abord (si pas déjà poussée)
        const maSection: remote.SectionJoueur = {
          player: structuredClone(st.players.find((q) => q.n === moi) ?? null),
          population: structuredClone(st.population[moi] ?? []),
          // SEULEMENT mes routes (bug duplication 2026-10-17 : la
          //  section embarquait toutes les routes du monde).
          routes: structuredClone(st.routesCommerce ?? []).filter((r) => r.joueur === moi),
          citesLibres: structuredClone(st.citesLibres ?? []),
          log: structuredClone(st.log.slice(-50)),
          tour: st.turn,
        }
        await remote.pousserSectionV2(salon, moi, maSection)
        const prets = await remote.lireBarriereV2(salon, st.turn)
        const attendus = [...(prets ?? new Set([moi]))]
        if (attendus.length === 0) attendus.push(moi)
        // JOURNAL du Forcer : les actions des absents sont ignorées —
        //  il faut que ce soit VISIBLE dans le salon (sinon le tour
        //  forcé semble « normal » alors que des joueurs ont perdu
        //  leurs actions du tour).
        const tous = st.players.map((q) => q.n)
        const absents = tous.filter((n) => !attendus.includes(n))
        if (absents.length > 0) {
          const nomsAbsents = st.players
            .filter((q) => absents.includes(q.n))
            .map((q) => `${q.nom} (J${q.n})`)
            .join(', ')
          await remote.pousserEvenementPartage(salon, st.turn, moi, 'forcer_absents', {
            absents,
            message: `⏭ Tour forcé : sections de ${absents.length} joueur(s) ignorées — ${nomsAbsents}.`,
          })
        }
        const res = await remote.resoudreTourServeur(salon, st.turn, attendus)
        if (res.ok) {
          const nouveau = await remote.loadRemote(salon)
          if (nouveau) {
            migrerEtat(nouveau)
            // EGRESS 2026-10-20 : l'état publié n'embarque plus le cache
            //  config (etatReseau) — réinjection locale (configPriorite).
            adopterConfig(nouveau, { locale: globalConfigRef.current })
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
   *  n'est pas déployée, résolution LOCALE avec publication
   *  (resoudreBarriereLocaleV2, puis resoudreSeul en dernier recours). */
  /** Indirections pour les déclarations anticipées (ordre de
   *  déclaration : nextTurnV2 est défini avant les deux fonctions
   *  de repli qu'il appelle). */
  const pollerBarriereV2Ref = useRef<(attendus: number[], tour: number) => Promise<void>>(async () => {})
  const resoudreBarriereLocaleV2Ref = useRef<(attendus: number[], tour: number) => Promise<void>>(async () => {})

  const nextTurnV2 = useCallback(async (st: GameState, moi: number) => {
    const maSection: remote.SectionJoueur = {
      player: structuredClone(st.players.find((q) => q.n === moi) ?? null),
      population: structuredClone(st.population[moi] ?? []),
      // SEULEMENT mes routes (bug duplication 2026-10-17 : la
      //  section embarquait toutes les routes du monde).
      routes: structuredClone(st.routesCommerce ?? []).filter((r) => r.joueur === moi),
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
          migrerEtat(nouveau)
          // EGRESS 2026-10-20 : l'état publié n'embarque plus le cache
          //  config (etatReseau) — réinjection locale (configPriorite).
          adopterConfig(nouveau, { locale: globalConfigRef.current })
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
    // FUSION : implémentation UNIQUE partagée avec l'Edge Function
    //  (src/engine/fusion.ts — tests fusion.test.ts). Les bugs de
    //  routes/cités/transferts corrigés en production y sont verrouillés.
    const draft = fusionnerSections(ref, sections)
    const evts = await remote.lireEvenementsPartages(salon, tour)
    rejouerEvenementsPartages(draft, evts)
    // CONFIG MONDIALE : effet en fin de tour, comme tout le reste —
    //  le repli local applique exactement ce que l'Edge Function applique.
    // EGRESS 2026-10-20 : la référence publiée n'embarque PLUS le cache
    //  config — la LOCALE (mondiale adoptée au chargement) amorce le
    //  draft, puis la MONDIALE prime si elle est publiée (contrat
    //  configPriorite : le draft ne doit JAMAIS rouler sur cfgOf(undefined)).
    adopterConfig(draft, { locale: globalConfigRef.current })
    appliquerConfigMondiale(draft, await remote.chargerConfigMondiale())
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

  /** PROTOCOLE v2 — POLLER LA BARRIÈRE en attente (bug 2026-10-19 :
   *  pollerBarriereV2Ref était APPELÉ mais jamais ASSIGNÉ — les
   *  clients en attente ne pollaient rien ; si le dernier joueur à
   *  pousser fermait son onglet avant la résolution, le salon se
   *  bloquait pour tous jusqu'à un « Forcer » ou un rechargement).
   *  Filet de sécurité du realtime : toutes les 2 s (max 2 minutes),
   *  on relit la barrière v2 ; quand elle est complète, N'IMPORTE
   *  QUI peut invoquer le serveur — la résolution est idempotente
   *  (verrou + garde tour_publie), un double appel est sans effet. */
  const pollerBarriereV2 = useCallback(async (attendus: number[], tour: number) => {
    for (let i = 0; i < 60; i++) {  // max 2 minutes
      await new Promise((r) => setTimeout(r, 2000))
      // le tour a été résolu et publié par quelqu'un d'autre : le
      //  realtime nous a déjà amené l'état — arrêter le poll.
      if ((stateRef.current?.turn ?? 0) > tour) {
        setBarriere({ prets: new Set(), monTourPousse: false })
        return
      }
      const prets = await remote.lireBarriereV2(salon, tour)
      if (!prets) continue  // erreur réseau ponctuelle : tick suivant
      setBarriere({ prets, monTourPousse: true })
      if (prets.size >= attendus.length) {
        const res = await remote.resoudreTourServeur(salon, tour, attendus)
        if (res.ok) {
          // le serveur a publié : récupérer l'état du tour suivant
          const nouveau = await remote.loadRemote(salon)
          if (nouveau) {
            migrerEtat(nouveau)
            // EGRESS 2026-10-20 : l'état publié n'embarque plus le cache
            //  config (etatReseau) — réinjection locale (configPriorite).
            adopterConfig(nouveau, { locale: globalConfigRef.current })
            stateRef.current = nouveau
            setState(nouveau)
            setBarriere({ prets: new Set(), monTourPousse: false })
            setConflit(false)
          }
        } else if (!res.dejaPublie) {
          // FONCTION SERVEUR INDISPONIBLE — même repli que le dernier
          //  pousseur : résolution LOCALE AVEC PUBLICATION.
          setBarriere({ prets: new Set(), monTourPousse: false })
          await resoudreBarriereLocaleV2Ref.current(attendus, tour)
        }
        return
      }
    }
  }, [salon])
  pollerBarriereV2Ref.current = pollerBarriereV2


  // (RETRAIT 2026-10-19, brûlage audit R5) : resoudreBarriere et
  //  pollerBarriere — la barrière v1 par colonne « sections »
  //  (lire-modifier-écrire) — ont été retirés avec le protocole v1.
  //  La résolution passe par la Edge Function « resoudre-tour » (v2)
  //  ou son repli local v2 (resoudreBarriereLocaleV2).

  const newGame = useCallback((setups: SetupLine[], seed: number, m: Mode, salonId?: string) => {
    // La nouvelle part démarre avec la configuration commune actuelle,
    // convergée (marqueur (x)) : format identique à l'affichage.
    const s = createGame(setups, seed, m, convergerConfig(globalConfigRef.current))
    setMode(m)
    setSalon(salonId ?? '')
    persistSalon(m === 'supabase' ? (salonId ?? '') : '')
    setConflit(false)
    stateRef.current = s
    setState(s)
    persist(s, m, salonId ?? '')
  }, [persist])

  /** Rejoint une partie multijoueur existante (chargée depuis Supabase). */
  const joinGame = useCallback(async (salonId: string): Promise<boolean> => {
    const s = await remote.loadRemote(salonId)
    if (!s) return false
    // CONFIG MONDIALE (règle 2026-10-19) : contrat de priorité testé
    //  (state/configPriorite.ts — config.test.ts) : la mondiale PRIME
    //  sur l'embarquée du salon (édition depuis l'accueil entre deux
    //  tours), puis injection dans l'état (l'UI lit state.config).
    // CONFIG MONDIALE (règle 2026-10-19) : SEULE la mondiale fait loi —
    //  la config embarquée du salon n'est plus une source (elle n'est
    //  qu'un cache d'époque). Sans mondiale (jamais publiée), la
    //  config LOCALE (amorce du navigateur) reste.
    const cfgMondiale = await remote.chargerConfigMondiale()
    const choisie = adopterConfig(s, { mondiale: cfgMondiale, locale: globalConfigRef.current })
    if (choisie) syncGlobalCfg(choisie)
    migrerEtat(s)
    setMode('supabase')
    setSalon(salonId)
    persistSalon(salonId)
    setConflit(false)
    lastLocalEdit.current = 0
    stateRef.current = s
    setState(s)
    return true
  }, [syncGlobalCfg])

  // RÉINTÉGRATION AUTO au chargement (bug 2026-10-18) : un joueur qui
  //  rechargeait la page retombait en mode 'local' (mode/salon vivaient
  //  seulement en mémoire React) — il jouait tout un tour DÉBRANCHÉ du
  //  salon : ses actions restaient dans son localStorage, son « Fin de
  //  tour » ne poussait AUCUNE section (branche locale de nextTurn), et
  //  la résolution ignorait tout son tour. Désormais, si un salon était
  //  rejoint lors de la session précédente (clé cpe.salon), on le
  //  RÉINTÈGRE immédiatement : mode 'supabase' restauré, salon
  //  réactivé (realtime). On n'utilise PAS joinGame ici : il écraserait
  //  l'état local par la référence distante — or au rechargement en
  //  MILIEU de tour, l'état local contient les actions du tour en
  //  cours (pas encore poussées). Règle : on adopte le distant seulement
  //  s'il est PLUS RÉCENT (la résolution a tourné pendant notre absence)
  //  ou si nous n'avons pas d'état local ; sinon on garde le local.
  const reintegrationFaite = useRef(false)
  useEffect(() => {
    if (reintegrationFaite.current) return
    reintegrationFaite.current = true
    const salonId = readPersistedSalon()
    if (!salonId) return
    void (async () => {
      const distant = await remote.loadRemote(salonId)
      if (!distant) { persistSalon(''); return }
      const local = stateRef.current
      const garderLocal = !!local && typeof distant.turn === 'number'
        && local.turn >= distant.turn
      setMode('supabase')
      setSalon(salonId)
      if (garderLocal) return
      // CONFIG MONDIALE : contrat de priorité testé (configPriorite.ts).
      const cfgMondiale2 = await remote.chargerConfigMondiale()
      const choisie2 = adopterConfig(distant, { mondiale: cfgMondiale2, locale: globalConfigRef.current })
      if (choisie2) syncGlobalCfg(choisie2)
      migrerEtat(distant)
      setConflit(false)
      lastLocalEdit.current = 0
      stateRef.current = distant
      setState(distant)
    })()
  }, [])

  const replaceState = useCallback((s: GameState) => {
    stateRef.current = s
    setState(s)
    lastLocalEdit.current = Date.now()
    persist(s, mode, salon)
  }, [mode, salon, persist])

  // SAVE NOW SUPPRIMÉ (règle 2026-10-19) : la SEULE synchronisation est
  //  la fin de tour — la sauvegarde auto à la fermeture d'onglet et le
  //  bouton 💾 écrasaient l'état du salon avec l'état local incomplet
  //  du joueur (pollution de la référence de fusion). Le localStorage
  //  reste écrit à chaque mutation (reprise hors-ligne du joueur).

  const reset = useCallback(() => {
    storage.clearLocal()
    // le salon persisté suit la sauvegarde locale : effacer l'un efface
    //  l'autre (sinon le prochain chargement réintègre un salon orphelin).
    persistSalon('')
    stateRef.current = null
    setState(null)
    setConflit(false)
  }, [])

  const importState = useCallback((json: string) => {
    const s = storage.importJson(json)
    if (s) {
      // CONFIG MONDIALE (règle 2026-10-19) : la partie importée
      //  n'impose PLUS sa config — SEULE la mondiale fait loi. La
      //  config embarquée de l'import est IGNORÉE, la mondiale
      //  (globalConfig, adoptée au chargement) est injectée.
      s.config = JSON.parse(JSON.stringify(convergerConfig(globalConfigRef.current))) as GameConfig
      migrerEtat(s)
      stateRef.current = s
      setState(s)
      lastLocalEdit.current = Date.now()
      persist(s, mode, salon)
      return true
    }
    return false
  }, [mode, salon, persist, syncGlobalCfg])

  const exportState = useCallback(() => (state ? storage.exportJson(state) : ''), [state])

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
      if (typeof remoteState.turn === 'number'
        && remoteState.turn === tourLocal) {
        return
      }
      // Les états distants arrivent BRUTS — migrations versionnées
      //  (idempotentes, tamponnées par état).
      migrerEtat(remoteState)
      // CORRECTIF EGRESS (2026-10-20) : les états publiés n'embarquent
      //  PLUS le cache config (etatReseau, ~181 Ko par publication ×
      //  N lecteurs par tour — cause du quota egress Supabase explosé).
      //  Injection LOCALE (contrat configPriorite : la mondiale
      //  '__config__' adoptée au chargement fait foi — un cache
      //  embarqué par une vieille ligne ne PRIME PAS non plus) :
      //  sans elle, l'UI et runTurn rouleraient sur les DÉFAUTS
      //  (bug classe « adultAge 16 »).
      adopterConfig(remoteState, { locale: globalConfigRef.current })
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
      // CONFIG MONDIALE (règle 2026-10-19) : une config embarquée dans un
      //  état distant ne PRIME PLUS — seule la config mondiale '__config__'
      //  fait foi (adoptée au montage + poll). On ne sync plus depuis
      //  remoteState.config : la partie n'impose jamais sa config.
    })
    return unsub
  }, [mode, salon, syncGlobalCfg])

  // RÈGLE (2026-10-19, simplification) : la config s'édite uniquement
  //  HORS partie — aucune modification pendant une partie. Les joueurs
  //  obtiennent les changements en actualisant la page.
  const peutEditerConfig = state == null

  const value = useMemo<GameContextValue>(() => ({
    state, mode, salon, saving, conflit, lastSavedAt, saveLocaleEchec,
    globalConfig, peutEditerConfig, setGlobalCfg,
    newGame, joinGame, nextTurn, update, replaceState, reset, importState, exportState,
    monNumero, setMonNumero: setMonNumeroPersist, barriere, forceNextTurn,
  }), [state, mode, salon, saving, conflit, lastSavedAt, saveLocaleEchec, globalConfig, peutEditerConfig, setGlobalCfg,
    newGame, joinGame, nextTurn, update, replaceState, reset, importState, exportState,
    monNumero, setMonNumeroPersist, barriere, forceNextTurn])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame doit être utilisé dans <GameProvider>')
  return ctx
}
