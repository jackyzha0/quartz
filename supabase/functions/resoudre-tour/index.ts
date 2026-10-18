// ═══════════════════════════════════════════════════════════════════════════
// CHASSE & PÊCHE — Edge Function « resoudre-tour » (protocole v2)
//
// Résolution du tour CÔTÉ SERVEUR :
//   1. verrou consultatif (un seul exécutant par salon) ;
//   2. idempotence par tour_publie (double appel = sans effet) ;
//   3. fusion des sections du tour — IMPLÉMENTATION PARTAGÉE avec le
//      client : ./engine/src/engine/fusion.ts (copié par
//      scripts/build-function.mjs — plus AUCUN chargement de bundle
//      distant cp-moteur.mjs : le moteur voyage AVEC la fonction,
//      versionné dans le même commit) ;
//   4. runTurn par le moteur pur (même bundle local) ;
//   5. publication + purge de la file.
//
// Payload : { salon: string, tour: number, attendus: number[] }
// ═══════════════════════════════════════════════════════════════════════════
import { createClient } from 'jsr:@supabase/supabase-js@2'
// Moteur et fusion : BUNDLE LOCAL copié par scripts/build-function.mjs
//  (lancer `node scripts/build-function.mjs` avant
//   `supabase functions deploy resoudre-tour`).
import { runTurn } from './engine/src/engine/engine.ts'
import { fusionnerSections, rejouerEvenementsPartages } from './engine/src/engine/fusion.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const { salon, tour, attendus } = await req.json()
    if (!salon || typeof tour !== 'number' || !Array.isArray(attendus) || !attendus.length) {
      return json({ ok: false, error: 'payload invalide (salon, tour, attendus requis)' }, 400)
    }

    const sb = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
      { auth: { persistSession: false } },
    )

    // 1. Verrou : un seul exécutant. Les autres invocations sortent.
    const { data: verrou } = await sb.rpc('cp_advisory_lock', { p_salon: salon })
    if (verrou !== true) return json({ ok: true, dejaPublie: true })
    try {
      // 2. État de référence + idempotence.
      const { data: row, error: errLecture } = await sb
        .from('parties_chasse_peche')
        .select('state, tour_publie')
        .eq('id', salon)
        .maybeSingle()
      if (errLecture || !row) return json({ ok: false, error: 'salon introuvable' }, 404)
      if ((row.tour_publie ?? 0) > tour) {
        return json({ ok: true, dejaPublie: true, tour: row.tour_publie })
      }

      // 3. Sections du tour (événements append-only).
      const { data: events, error: errEvents } = await sb
        .from('cp_events')
        .select('joueur, payload')
        .eq('salon', salon)
        .eq('tour', tour)
        .eq('type', 'section')
      if (errEvents) return json({ ok: false, error: 'lecture evenements impossible' }, 500)

      const pousses = new Set((events ?? []).map((e) => e.joueur))
      const manquants = attendus.filter((n) => !pousses.has(n))
      if (manquants.length) {
        return json({ ok: false, error: `barriere incomplete : ${manquants.join(', ')}` }, 409)
      }

      // 4. Fusion — IMPLÉMENTATION PARTAGÉE avec le client
      //    (src/engine/fusion.ts, mêmes tests fusion.test.ts).
      //    Format des événements : { joueur, payload } → sections.
      const sections: Record<string, unknown> = {}
      for (const e of events ?? []) sections[String(e.joueur)] = e.payload
      const draft = fusionnerSections(row.state, sections)

      // ÉVÉNEMENTS PARTAGÉS du tour (transferts de villes…) : rejoués
      //  APRÈS la fusion des sections, AVANT runTurn.
      const { data: evtsPartages, error: errEvts } = await sb
        .from('cp_events')
        .select('joueur, type, payload')
        .eq('salon', salon)
        .eq('tour', tour)
        .neq('type', 'section')
      if (!errEvts) {
        rejouerEvenementsPartages(draft, evtsPartages ?? [])
      }

      // 5. Exécution du tour par le moteur pur (bundle local).
      runTurn(draft)

      // 6. Publication + purge (transaction logique : update puis delete).
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
      if (errPub) return json({ ok: false, error: `publication impossible : ${errPub.message}` }, 500)
      await sb.from('cp_events').delete().eq('salon', salon).eq('tour', tour)

      return json({ ok: true, tour: draft.turn })
    } finally {
      await sb.rpc('cp_advisory_unlock', { p_salon: salon })
    }
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500)
  }
})
