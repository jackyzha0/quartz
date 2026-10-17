// ══════════════════════════════════════════════════════════════════
// CHASSE & PÊCHE — Edge Function « resoudre-tour » (protocole v2)
//
// VERSION FICHIER UNIQUE, collable dans le Dashboard Supabase
// (Edge Functions → Create a function → nom : resoudre-tour).
// Elle charge le moteur du jeu (bundle ESM publié sur le site :
// https://losth230.github.io/quartz/cp-moteur.mjs) et exécute la
// résolution du tour CÔTÉ SERVEUR :
//   1. verrou consultatif (un seul exécutant par salon) ;
//   2. idempotence par tour_publie (double appel = sans effet) ;
//   3. fusion des sections du tour (événements cp_events) ;
//   4. runTurn par le moteur pur ;
//   5. publication transactionnelle + purge de la file.
//
// Payload : { salon: string, tour: number, attendus: number[] }
// ══════════════════════════════════════════════════════════════════
import { createClient } from 'jsr:@supabase/supabase-js@2'

const MOTEUR_URL = 'https://losth230.github.io/quartz/cp-moteur.mjs'

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

    // 0. Charger le moteur (bundle public, mis en cache par Deno).
    const { runTurn } = await import(MOTEUR_URL)

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

      // 4. Fusion (bug 2026-10-17 : routes et cités libres sont
      //    PARTAGÉES — l'ancienne fusion écrasait tout le tableau
      //    avec la version du dernier joueur, perdant les actions
      //    des autres sur le même tour).
      //    · routes : une route n'appartient qu'à SON propriétaire
      //      (route.joueur) — chaque section ne remplace que les
      //      routes de son joueur, les autres sont préservées ;
      //    · cités libres : fusion PAR CITÉ (clé nom) — une section
      //      ne remplace que les cités qu'elle a réellement
      //      modifiées (différentes de la référence), les autres
      //      sont préservées.
      const ref = row.state
      const draft = structuredClone(row.state)
      const newLogs = []
      const refCiteParNom = new Map((ref.citesLibres ?? []).map((c) => [c.nom, JSON.stringify(c)]))
      const citeFusionnes = new Map((draft.citesLibres ?? []).map((c) => [c.nom, c]))
      const routesFusionnees = [...(draft.routesCommerce ?? [])]
      for (const e of events) {
        const sec = e.payload
        const pj = draft.players.find((q) => q.n === e.joueur)
        if (pj && sec.player) Object.assign(pj, sec.player)
        if (sec.population) draft.population[e.joueur] = sec.population
        // ROUTES : remplacer uniquement les routes de CE joueur
        if (Array.isArray(sec.routes)) {
          for (let i = routesFusionnees.length - 1; i >= 0; i--) {
            if (routesFusionnees[i].joueur === e.joueur) routesFusionnees.splice(i, 1)
          }
          for (const r of sec.routes) routesFusionnees.push(r)
        }
        // CITÉS LIBRES : ne prendre que les cités MODIFIÉES par ce
        //  joueur (différentes de la référence de début de tour)
        if (Array.isArray(sec.citesLibres)) {
          for (const c of sec.citesLibres) {
            const cle = c.nom
            const refJson = refCiteParNom.get(cle)
            if (refJson !== undefined && JSON.stringify(c) !== refJson) {
              citeFusionnes.set(cle, c)
            }
          }
          // cité créée pendant le tour (absente de la référence)
          if (!refCiteParNom.has('') ) { /* noop */ }
        }
        if (Array.isArray(sec.log)) newLogs.push(...sec.log)
      }
      draft.routesCommerce = routesFusionnees
      // cités créées pendant le tour : présentes dans une section
      //  mais absentes de la référence → les ajouter
      for (const e of events) {
        const sec = e.payload
        if (!Array.isArray(sec.citesLibres)) continue
        for (const c of sec.citesLibres) {
          if (!refCiteParNom.has(c.nom) && !citeFusionnes.has(c.nom)) {
            citeFusionnes.set(c.nom, c)
          }
        }
      }
      draft.citesLibres = [...citeFusionnes.values()]
      const logFusionne = [...draft.log, ...newLogs]
      draft.log = logFusionne.slice(-Math.max(50, draft.log.length))

      // 5. Exécution du tour par le moteur pur.
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
