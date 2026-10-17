// ══════════════════════════════════════════════════════════════════════
//  Client Supabase — mode multijoueur temps réel (8 joueurs simultanés)
//  Pas d'authentification : la table `parties_chasse_peche` est accessible en anonyme
//  (RLS ouverte, cf. supabase/schema.sql) et suivie en realtime.
//
//  Identifiants PRÉ-CONFIGURÉS : le jeu utilise par défaut le projet
//  Supabase du site quartz (wargame). Cette clé est PUBLIQUE par
//  conception (protégée par RLS) et figure déjà en clair dans la config
//  du site (quartz/static/cp-supabase.js). Priorité : réglage de
//  l'onglet 🌐 (localStorage) > variables .env (dev) > défaut ci-dessous.
// ══════════════════════════════════════════════════════════════════════

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { GameState } from '../engine/types'
import { compacterEtat, elargirEtat } from '../state/storage'

const LS_URL = 'cpe.supabase.url'
const LS_KEY = 'cpe.supabase.anon'

// Projet Supabase public du site quartz (C&P / Khazhags) — table `parties_chasse_peche`
// du jeu à créer une fois via supabase/schema.sql dans le SQL Editor.
const DEFAULT_URL = 'https://kucgmmefluwmlobujanc.supabase.co'
const DEFAULT_KEY = 'sb_publishable_YB_VCzZgD2vi4xeFvFT6ZA_BA9Pwn7R'

let client: SupabaseClient | null = null

function readCreds(): { url: string; key: string } {
  let url = ''
  let key = ''
  try {
    url = window.localStorage.getItem(LS_URL) ?? ''
    key = window.localStorage.getItem(LS_KEY) ?? ''
  } catch { /* localStorage indisponible (mode privé etc.) */ }
  if (!url) url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''
  if (!key) key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? ''
  // Défaut : projet du site quartz — le jeu est prêt à l'emploi.
  if (!url) url = DEFAULT_URL
  if (!key) key = DEFAULT_KEY
  return { url, key }
}

/** Identifiants actuellement configurés (onglet 🌐, puis .env, puis défaut). */
export function supabaseCreds(): { url: string; key: string } | null {
  const { url, key } = readCreds()
  return url && key ? { url, key } : null
}

/** Mémorise les identifiants dans le navigateur et réinitialise le client. */
export function setSupabaseCredentials(url: string, key: string): void {
  try {
    window.localStorage.setItem(LS_URL, url.trim())
    window.localStorage.setItem(LS_KEY, key.trim())
  } catch { /* noop */ }
  client = null
}

/** Oublie les identifiants mémorisés et réinitialise le client. */
export function clearSupabaseCredentials(): void {
  try {
    window.localStorage.removeItem(LS_URL)
    window.localStorage.removeItem(LS_KEY)
  } catch { /* noop */ }
  client = null
}

export function getSupabase(): SupabaseClient | null {
  if (client) return client
  const { url, key } = readCreds()
  if (!url || !key) return null
  client = createClient(url, key, {
    realtime: { params: { eventsPerSecond: 5 } },
  })
  return client
}

export function supabaseAvailable(): boolean {
  return getSupabase() !== null
}

/** Vérifie que l'URL + la clé fonctionnent et que la table `parties` existe. */
export async function testSupabase(): Promise<{ ok: boolean; message: string }> {
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'Renseignez l\'URL et la clé anon, puis « Connecter ».' }
  const { error } = await sb.from(TABLE).select('id').limit(1)
  if (error) {
    return { ok: false, message: `Connexion OK mais table introuvable : ${error.message}. Exécutez supabase/schema.sql dans l'éditeur SQL de votre projet Supabase (il crée la table parties_chasse_peche).` }
  }
  return { ok: true, message: 'Connecté : multijoueur temps réel disponible.' }
}

// Table PROPRE au jeu : ce même projet Supabase héberge déjà la table `parties`
// du wargame (colonnes incompatibles, id uuid) — le jeu ne doit PAS y toucher.
const TABLE = 'parties_chasse_peche'

/** Charge une partie depuis Supabase (id = code de salon). */
export async function loadRemote(id: string): Promise<GameState | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb.from(TABLE).select('state').eq('id', id).maybeSingle()
  if (error || !data) return null
  // format compact : reconstruire les champs omis (valeurs par défaut)
  return elargirEtat(data.state as GameState)
}

/** Identité de CE navigateur dans le salon (multijoueur simultané,
 *  revue Q3 2026-10-15) : permet à chaque client d'ignorer ses PROPRES
 *  échos realtime (la boucle update → événement → setState était
 *  inutile et creusait la fenêtre de conflit). */
const CLIENT_ID = 'c' + Math.random().toString(36).slice(2, 10)
export function clientId(): string { return CLIENT_ID }

/** Sauvegarde une partie (création ou mise à jour) — upsert avec
 *  identité du writers (updated_by) : la dernière écriture gagne
 *  (garanti par le serveur), le rebase client fusionne les éditions
 *  simultanées de feuilles différentes. */
export async function saveRemote(id: string, state: GameState): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const { error } = await sb.from(TABLE).upsert({
    id,
    state: compacterEtat(structuredClone(state)),
    updated_by: CLIENT_ID,
    updated_at: new Date().toISOString(),
  })
  return !error
}


// ═══════════════════════════════════════════════════════════════════════
//  TOUR-SIMULTANÉ — BARRIÈRE STRICTE (2026-10-16)
//  Chaque joueur joue en LOCAL pendant le tour (zéro réseau par clic).
//  Au « Fin de tour » il pousse SA SECTION ; quand tous les joueurs
//  attendus ont poussé, le premier qui le constate fusionne, exécute
//  runTurn() et publie le nouvel état de référence.
// ═══════════════════════════════════════════════════════════════════════

/** Section d'un joueur pour la barrière : tout ce qu'il peut modifier
 *  pendant son tour. Sérialisée telle quelle (déjà compactée par
 *  l'appelant si besoin). */
export interface SectionJoueur {
  player: unknown
  population: unknown
  routes: unknown
  citesLibres: unknown
  log: unknown
  tour: number
}

/**
 * Pousser MA section de fin de tour. Retourne l'état de la barrière
 *  après écriture : { sections, turn_done } — null si erreur réseau.
 *
 *  ANTI-COLLISION (revue lag 2026-10-17) : le lire-modifier-écrire
 *  était non protégé — deux « Fin de tour » SIMULTANÉS lisaient la
 *  même ligne puis le second écrivait SA version de `sections`
 *  (sans la clé du premier : section PERDUE, barrière bloquée).
 *  Maintenant : l'UPDATE passe par une FONCTION RPC serveur qui
 *  fusionne atomiquement MA clé dans `sections` — plus de fenêtre
 *  d'écrasement. Repli : lire-modifier-écrire avec vérification du
 *  tour (le repli reste rare : RPC présente par schema.sql).
 */
export async function pousserSection(
  id: string, n: number, section: SectionJoueur,
): Promise<{ sections: Record<string, SectionJoueur>; turn_done: number } | null> {
  const sb = getSupabase()
  if (!sb) return null
  // 1. FUSION ATOMIQUE serveur : la fonction SQL pousser_section
  //    (supabase/schema.sql) fait sections = sections || {"<n>": section}
  //    dans la transaction — deux Fin de tour simultanés ne peuvent
  //    plus s'écraser mutuellement leurs clés.
  const { data: apres, error } = await sb
    .rpc('pousser_section', { p_id: id, p_n: n, p_section: section })
  if (!error && apres) {
    const out = apres as { sections?: Record<string, SectionJoueur>; turn_done?: number }
    return { sections: out.sections ?? {}, turn_done: out.turn_done ?? 0 }
  }
  // 2. REPLI (RPC absente — schéma non mis à jour) : lire-modifier-
  //    écrire avec vérification du tour. La fenêtre de collision
  //    existe mais reste rare (deux clics à la milliseconde près).
  const { data: row, error: errLecture } = await sb
    .from(TABLE).select('sections, turn_done').eq('id', id).maybeSingle()
  if (errLecture || !row) return null
  if ((row.turn_done ?? 0) !== section.tour) return null
  const sections = { ...((row.sections as Record<string, SectionJoueur>) ?? {}) }
  sections[String(n)] = section
  const { error: errEcriture } = await sb
    .from(TABLE).update({
      sections,
      updated_by: CLIENT_ID,
      updated_at: new Date().toISOString(),
    }).eq('id', id)
  if (errEcriture) return null
  return { sections, turn_done: row.turn_done ?? 0 }
}

/** Publier l'état de référence du NOUVEAU tour (résolution de la
 *  barrière) et réinitialiser les sections. */
export async function publierEtatFusionne(
  id: string, state: GameState,
): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const { error } = await sb.from(TABLE).update({
    state,
    sections: {},
    turn_done: state.turn,
    updated_by: CLIENT_ID,
    updated_at: new Date().toISOString(),
  }).eq('id', id)
  return !error
}

/** Lire l'état de la barrière (sections poussées, tour couvert). */
export async function lireBarriere(
  id: string,
): Promise<{ sections: Record<string, SectionJoueur> | null; turn_done: number } | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(TABLE).select('sections, turn_done').eq('id', id).maybeSingle()
  if (error || !data) return null
  return { sections: data.sections ?? null, turn_done: data.turn_done ?? 0 }
}

/** S'abonne aux changements du salon. Retourne la fonction de désabonnement.
 *
 * OPTIMISATION MULTIJOUEUR 2026-10-16 : à 16 000 habitants l'état
 * JSON fait ~5 Mo — le payload postgres_changes est limité à ~1 MiB
 * par message côté Supabase (wal2json) : les évènements seraient
 * silencieusement DROPPÉS en fin de partie. On s'abonne donc à un
 * signal LÉGER (updated_at) et on RECHERCHE la ligne par SELECT :
 * un évènement de quelques octets + un fetch ciblé.
 */
export function subscribeRemote(
  id: string,
  onChange: (state: GameState) => void,
): () => void {
  const sb = getSupabase()
  if (!sb) return () => {}
  let lastSeen = ''
  // Dernier tour PUBLIÉ déjà reçu : les UPDATE de sections (Fin de
  //  tour des autres joueurs) et les saveRemote ne changent PAS
  //  l'état de référence — inutile de re-télécharger ~5 Mo à chaque
  //  événement (revue lag simultané 2026-10-17).
  let tourPublie = -1
  const channel = sb
    .channel(`parties:${id}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: TABLE,
      filter: `id=eq.${id}`,
    }, async (payload: { new: { updated_at?: string; updated_by?: string } }) => {
      // Q3 : ignorer ses propres échos — on vient d'écrire cette
      //  version, la réceptionner déclencherait un setState inutile.
      const stamp = payload.new?.updated_at ?? ''
      if (!stamp || stamp === lastSeen) return
      if (payload.new?.updated_by === CLIENT_ID) { lastSeen = stamp; return }
      lastSeen = stamp
            // OPTIMISATION SIMULTANÉ (revue lag 2026-10-17) : pendant le tour,
      //  les UPDATE de sections (Fin de tour des autres) et les saveRemote
      //  périodiques ne changent PAS l'état de référence — re-télécharger
      //  ~5 Mo à chaque événement saturait le réseau des joueurs en
      //  simultané. On ne télécharge l'état complet QUE si le tour
      //  publié a avancé (résolution de barrière).
      const { data: meta } = await sb.from(TABLE).select('turn_done').eq('id', id).maybeSingle()
      if (meta && (meta.turn_done ?? 0) <= tourPublie) return
      const { data } = await sb.from(TABLE).select('state').eq('id', id).maybeSingle()
      if (data?.state) {
        const el = data.state as GameState
        if (typeof el.turn === 'number') tourPublie = el.turn
        onChange(el)
      }
    })
    .subscribe()
  // Filet de sécurité (anti-perte) : polling léger de updated_at —
  //  si le realtime droppe l'event (payload trop gros, réseau), le
  //  client reçoit quand même la mise à jour en retard de ≤ 5 s.
  const poll = setInterval(async () => {
    try {
      const { data } = await sb.from(TABLE).select('updated_at, updated_by').eq('id', id).maybeSingle()
      const stamp = data?.updated_at ?? ''
      if (stamp && stamp !== lastSeen && data?.updated_by !== CLIENT_ID) {
        lastSeen = stamp
        // Même logique que le realtime : ne re-télécharger que si le
        //  tour publié a AVANCÉ (résolution de barrière).
        const { data: meta } = await sb.from(TABLE).select('turn_done').eq('id', id).maybeSingle()
        if (meta && (meta.turn_done ?? 0) <= tourPublie) return
        const full = await sb.from(TABLE).select('state').eq('id', id).maybeSingle()
        if (full.data?.state) {
          const el = full.data.state as GameState
          if (typeof el.turn === 'number') tourPublie = el.turn
          onChange(el)
        }
      }
    } catch { /* réseau indisponible — le prochain tick réessaiera */ }
  }, 5000)
  return () => {
    clearInterval(poll)
    sb.removeChannel(channel)
  }
}
