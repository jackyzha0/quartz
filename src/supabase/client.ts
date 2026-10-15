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
  return data.state as GameState
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
    state,
    updated_by: CLIENT_ID,
    updated_at: new Date().toISOString(),
  })
  return !error
}

/** S'abonne aux changements du salon. Retourne la fonction de désabonnement. */
export function subscribeRemote(
  id: string,
  onChange: (state: GameState) => void,
): () => void {
  const sb = getSupabase()
  if (!sb) return () => {}
  const channel = sb
    .channel(`parties:${id}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: TABLE,
      filter: `id=eq.${id}`,
    }, (payload: { new: { state: GameState; updated_by?: string } }) => {
      // Q3 : ignorer ses propres échos — on vient d'écrire cette
      //  version, la réceptionner déclencherait un setState inutile
      //  (et une fenêtre de conflit artificielle).
      if (payload.new?.state && payload.new?.updated_by !== CLIENT_ID) onChange(payload.new.state)
    })
    .subscribe()
  return () => {
    sb.removeChannel(channel)
  }
}
