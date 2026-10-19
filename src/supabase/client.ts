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
import type { GameConfig } from '../config/defaultConfig'
import { elargirEtat } from '../state/storage'

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
  // DURCISSEMENT (2026-10-19, tests de rendu Node) : `import.meta.env`
  //  n'existe QUE dans un bundle Vite — hors navigateur (tsx/CI, tests
  //  de rendu serveur) il vaut undefined et l'accès direct plantait
  //  le RENDU de SetupPanel (supabaseCreds → readCreds au rendu).
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env
  if (!url) url = env?.VITE_SUPABASE_URL ?? ''
  if (!key) key = env?.VITE_SUPABASE_ANON_KEY ?? ''
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

function getSupabase(): SupabaseClient | null {
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
/** Ligne réservée qui porte la configuration mondiale unique. */
const CONFIG_MONDIALE_ID = '__config__'

// ── CONFIG MONDIALE UNIQUE (règle 2026-10-19) ─────────────────────────────
// Une seule et unique configuration, INDÉPENDANTE des parties : stockée
// dans la ligne réservée '__config__' de la même table. Toutes les
// parties de tous les salons l'utilisent ; seul le créateur (garde du
// store) l'édite en multijoueur ; chaque client l'adopte au chargement
// et périodiquement. Les parties n'embarquent plus leur propre source
// de vérité de config.

/** Charge la configuration mondiale (null si jamais publiée). */
export async function chargerConfigMondiale(): Promise<GameConfig | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(TABLE).select('state').eq('id', CONFIG_MONDIALE_ID).maybeSingle()
  if (error || !data) return null
  return (data.state as { config?: GameConfig })?.config ?? null
}

/** Publie la configuration mondiale (upsert de la ligne '__config__'). */
export async function sauverConfigMondiale(config: GameConfig): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const { error } = await sb.from(TABLE).upsert({
    id: CONFIG_MONDIALE_ID,
    state: { config } as unknown as GameState,
    updated_by: CLIENT_ID,
    updated_at: new Date().toISOString(),
  })
  return !error
}

/** Charge une partie depuis Supabase (id = code de salon). */
export async function loadRemote(id: string): Promise<GameState | null> {
  const sb = getSupabase()
  if (!sb) return null
  // La ligne '__config__' n'est PAS une partie (config mondiale) :
  //  jamais joignable comme salon.
  if (id === CONFIG_MONDIALE_ID) return null
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

// (RETRAIT 2026-10-19, brûlage audit R5) : pousserSection — la barrière
//  v1 par colonne « sections » (lire-modifier-écrire) — a été retiré
//  avec le protocole v1 : les sections passent désormais par des
//  ÉVÉNEMENTS append-only (pousserSectionV2, table cp_events).

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
    // v2 : le tour publié avance aussi pour la garde anti-rollback
    //  (le trigger SQL refuse tout recul ultérieur).
    tour_publie: state.turn,
    updated_by: CLIENT_ID,
    updated_at: new Date().toISOString(),
  }).eq('id', id)
  return !error
}

// (RETRAIT 2026-10-19, brûlage audit R5) : lireBarriere (v1) a été
//  retiré avec le protocole v1 — la barrière se lit sur les événements
//  du tour (lireBarriereV2).

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
      // Signal reçu → récupérer l'état complet par SELECT (léger en
      //  évènement, exact en donnée).
      const { data } = await sb.from(TABLE).select('state').eq('id', id).maybeSingle()
      if (data?.state) onChange(data.state as GameState)
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
        const full = await sb.from(TABLE).select('state').eq('id', id).maybeSingle()
        if (full.data?.state) onChange(full.data.state as GameState)
      }
    } catch { /* réseau indisponible — le prochain tick réessaiera */ }
  }, 5000)
  return () => {
    clearInterval(poll)
    sb.removeChannel(channel)
  }
}

// ══════════════════════════════════════════════════════════════════
//  PROTOCOLE v2 UNIQUE (serveur autoritaire + events append-only)
//  (RETRAIT v1 2026-10-19, brûlage audit R5 : le flux v1 — colonne
//  « sections » + feature flag « cpe.proto2 » — a été brûlé.)
// ══════════════════════════════════════════════════════════════════

/** Pousser MA section de fin de tour en ÉVÉNEMENT append-only :
 *  un INSERT ne peut pas écraser la section d'un autre joueur
 *  (fin du lire-modifier-écrire). Idempotent côté serveur : la clé
 *  unique (salon, tour, joueur, 'section') fait qu'un double-clic
 *  remplace la ligne au lieu de la dupliquer. */
export async function pousserSectionV2(
  id: string, n: number, section: SectionJoueur,
): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const ligne = {
    salon: id, tour: section.tour, joueur: n, type: 'section',
    payload: section as unknown as Record<string, unknown>,
  }
  // 1. upsert idempotent — nécessite l'index unique
  //    cp_events_section_unique (schema-v2.sql §6). S'il est absent
  //    (SQL collé avant son ajout), PostgREST refuse onConflict.
  const { error } = await sb.from('cp_events')
    .upsert(ligne, { onConflict: 'salon,tour,joueur,type' })
  if (!error) return true
  // 2. REPLI sans index : delete ma ligne puis insert (remplace la
  //    précédente — même idempotence, sans dépendre du SQL §6).
  await sb.from('cp_events').delete()
    .eq('salon', id).eq('tour', section.tour)
    .eq('joueur', n).eq('type', 'section')
  const { error: err2 } = await sb.from('cp_events').insert(ligne)
  return !err2
}

/** Pousser un ÉVÉNEMENT PARTAGÉ du tour (mutations inter-joueurs —
 *  ex. transfert de ville) : rejoint les sections dans cp_events et
 *  est REJOUÉ par la résolution (Edge Function ou repli local)
 *  APRÈS la fusion des sections — c'est la seule façon de préserver
 *  une action qui touche l'état d'un AUTRE joueur (sa section,
 *  poussée avant, écraserait le transfert). */
export async function pousserEvenementPartage(
  id: string, tour: number, joueur: number,
  type: string, payload: Record<string, unknown>,
): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const { error } = await sb.from('cp_events').insert({
    salon: id, tour, joueur, type, payload,
  })
  return !error
}

/** Lire les ÉVÉNEMENTS PARTAGÉS du tour (hors sections) : mutations
 *  inter-joueurs (ex. transferts de villes) à rejouer par la
 *  résolution APRÈS la fusion des sections. */
export async function lireEvenementsPartages(
  id: string, tour: number,
): Promise<Array<{ joueur: number; type: string; payload: Record<string, unknown> }>> {
  const sb = getSupabase()
  if (!sb) return []
  const { data, error } = await sb
    .from('cp_events')
    .select('joueur, type, payload')
    .eq('salon', id)
    .eq('tour', tour)
    .neq('type', 'section')
  if (error) return []
  return (data ?? []).map((r) => ({
    joueur: r.joueur, type: r.type, payload: (r.payload ?? {}) as Record<string, unknown>,
  }))
}

/** Lire les sections COMPLÈTES du tour (payload inclus) — repli de
 *  résolution locale quand la Edge Function est indisponible. */
export async function lireSectionsV2(
  id: string, tour: number,
): Promise<Record<string, SectionJoueur> | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('cp_events')
    .select('joueur, payload')
    .eq('salon', id)
    .eq('tour', tour)
    .eq('type', 'section')
  if (error) return null
  const out: Record<string, SectionJoueur> = {}
  for (const r of data ?? []) out[String(r.joueur)] = r.payload as SectionJoueur
  return out
}

/** Lire la barrière v2 : quels joueurs ont poussé leur section pour
 *  le tour N. Léger — payload exclu, on ne ramène que les clés. */
export async function lireBarriereV2(
  id: string, tour: number,
): Promise<Set<number> | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('cp_events')
    .select('joueur')
    .eq('salon', id)
    .eq('tour', tour)
    .eq('type', 'section')
  if (error) return null
  return new Set((data ?? []).map((r) => r.joueur))
}

/** Invoquer la Edge Function de résolution serveur. Idempotente et
 *  verrouillée : l'invoquer plusieurs fois ou à plusieurs est sans
 *  effet si le tour est déjà publié. */
export async function resoudreTourServeur(
  salon: string, tour: number, attendus: number[],
): Promise<{ ok: boolean; dejaPublie?: boolean; tour?: number; error?: string }> {
  const creds = supabaseCreds()
  if (!creds) return { ok: false, error: 'supabase non configuré' }
  const { url, key } = creds
  try {
    const resp = await fetch(`${url}/functions/v1/resoudre-tour`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      body: JSON.stringify({ salon, tour, attendus }),
    })
    return await resp.json() as { ok: boolean; dejaPublie?: boolean; tour?: number; error?: string }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}
