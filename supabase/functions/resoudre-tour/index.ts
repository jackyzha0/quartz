// ══════════════════════════════════════════════════════════════════
// CHASSE & PÊCHE — Edge Function « resoudre-tour » (protocole v2, étape 1)
//
// RÉSOLUTION SERVEUR de la barrière stricte : quand tous les joueurs
// attendus ont poussé leur section (événement type 'section' du tour N),
// n'importe quel client peut invoquer cette fonction — elle est
// IDEMPOTENTE et protégée par verrou :
//   1. verrou consultatif pg_try_advisory_lock : un seul exécutant ;
//   2. relecture de l'état de référence + des sections du tour ;
//   3. si le tour demandé est déjà publié → sortie (idempotence) ;
//   4. fusion des sections (même sémantique que le client actuel :
//      player, population, routes, citesLibres, log par joueur) ;
//   5. runTurn (moteur pur, bundlé depuis src/engine) ;
//   6. publication transactionnelle : état + tour_publie = N+1, et
//      purge des événements du tour N.
//
// Payload attendu : { salon: string, tour: number, attendus: number[] }
// Réponses : { ok: true, dejaPublie?: true, tour?: N+1 }
//          | { ok: false, error: string }
// ══════════════════════════════════════════════════════════════════
import { createClient } from 'jsr:@supabase/supabase-js@2'

// ── Moteur (bundlé par scripts/build-function.mjs) ─────────────────
// @ts-ignore — injecté au build
import { runTurn } from './engine/src/engine/engine.ts'
// @ts-ignore
import type { GameState } from './engine/src/engine/types.ts'

interface SectionJoueur {
  player: unknown
  population: unknown
  routes: unknown
  citesLibres: unknown
  log: unknown
  tour: number
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors })
  }
  try {
    const { salon, tour, attendus } = await req.json() as {
      salon: string; tour: number; attendus: number[]
    }
    if (!salon || typeof tour !== 'number' || !Array.isArray(attendus) || attendus.length === 0) {
      return json({ ok: false, error: 'payload invalide (salon, tour, attendus requis)' }, 400)
    }

    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    )

    // 1. Verrou : un seul exécutant à la fois. Les autres invocations
    //    (double-clic, deux clients simultanés) sortent silencieusement.
    const { data: verrou } = await sb.rpc('cp_advisory_lock', { p_salon: salon })
    if (verrou !== true) {
      return json({ ok: true, dejaPublie: true })
    }
    try {
      // 2. État de référence + barrière du tour demandé.
      const { data: row, error: errLecture } = await sb
        .from('parties_chasse_peche')
        .select('state, tour_publie')
        .eq('id', salon)
        .maybeSingle()
      if (errLecture || !row) {
        return json({ ok: false, error: 'salon introuvable' }, 404)
      }

      // 3. Idempotence : le tour demandé est déjà résolu → rien à faire.
      if ((row.tour_publie ?? 0) > tour) {
        return json({ ok: true, dejaPublie: true, tour: row.tour_publie })
      }

      const { data: events, error: errEvents } = await sb
        .from('cp_events')
        .select('joueur, payload')
        .eq('salon', salon)
        .eq('tour', tour)
        .eq('type', 'section')
      if (errEvents) {
        return json({ ok: false, error: 'lecture evenements impossible' }, 500)
      }

      // 4. Barrière complète ? (chaque joueur attendu a poussé sa section)
      const pousses = new Set((events ?? []).map((e) => e.joueur))
      const manquants = attendus.filter((n) => !pousses.has(n))
      if (manquants.length > 0) {
        return json({ ok: false, error: `barriere incomplete : ${manquants.join(', ')}` }, 409)
      }

      // 5. Fusion des sections (même sémantique que le client actuel).
      const ref = row.state as GameState
      const draft: GameState = structuredClone(ref)
      const newLogs: unknown[] = []
      for (const e of events!) {
        const sec = e.payload as unknown as SectionJoueur
        const n = e.joueur
        const pj = draft.players.find((q) => q.n === n)
        if (pj && sec.player) Object.assign(pj, sec.player)
        if (sec.population) (draft as any).population[n] = sec.population
        if (sec.routes) (draft as any).routesCommerce = sec.routes
        if (sec.citesLibres) (draft as any).citesLibres = sec.citesLibres
        if (Array.isArray(sec.log)) newLogs.push(...(sec.log as unknown[]))
      }
      const logFusionne = [...draft.log, ...(newLogs as typeof draft.log)]
      draft.log = logFusionne.slice(-Math.max(50, draft.log.length))

      // 6. Exécution du tour par le moteur pur.
      runTurn(draft)

      // 7. Publication transactionnelle + purge de la file du tour.
      const { error: errPub } = await sb
        .from('parties_chasse_peche')
        .update({
          state: draft,
          sections: {},
          turn_done: tour,
          tour_publie: draft.turn,
          updated_by: 'server',
          updated_at: new Date().toISOString(),
        })
        .eq('id', salon)
      if (errPub) {
        return json({ ok: false, error: `publication impossible : ${errPub.message}` }, 500)
      }
      await sb.from('cp_events').delete().eq('salon', salon).eq('tour', tour)

      return json({ ok: true, tour: draft.turn })
    } finally {
      await sb.rpc('cp_advisory_unlock', { p_salon: salon })
    }
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500)
  }
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status, headers: { ...cors, 'Content-Type': 'application/json' },
  })
}
