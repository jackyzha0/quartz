// ═══════════════════════════════════════════════════════════════════════════
// CHASSE & PÊCHE — Edge Function « resoudre-tour » (protocole v2)
//
// Résolution du tour CÔTÉ SERVEUR :
//   1. verrou consultatif (un seul exécutant par salon) ;
//   2. idempotence par tour_publie (double appel = sans effet) ;
//   3. fusion des sections — IMPLÉMENTATION PARTAGÉE avec le client
//      (src/engine/fusion.ts, mêmes tests fusion.test.ts) ;
//   4. runTurn par le moteur pur ;
//   5. publication + purge de la file.
//
// MOTEUR : bundle local _engine.mjs, construit par esbuild —
//   node scripts/build-function.mjs && node scripts/test-function.mjs
//   supabase functions deploy resoudre-tour
// (esbuild résout les imports sans extension et inline le JSON des
//  référentiels — une copie brute de src/engine ne fonctionne PAS en
//  Deno. Le bundle voyage AVEC ce fichier, versionné dans le dépôt.)
//
// Payload : { salon: string, tour: number, attendus: number[] }
// ═══════════════════════════════════════════════════════════════════════════
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { runTurn, fusionnerSections, rejouerEvenementsPartages, migrerEtat, appliquerConfigMondiale } from './_engine.mjs'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
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

    // 1. (RETRAIT 2026-10-19, audit M7 — arbitrage Thibaut « retrait
    //    complet ») : le verrou consultatif pg_try_advisory_lock via
    //    PostgREST NE TENAIT PAS — chaque RPC roule sur une connexion
    //    du pool, l'unlock libérait (au mieux) le verrou d'une AUTRE
    //    connexion : la promesse « un seul exécutant » n'était jamais
    //    tenue. Les VRAIS garde-fous restent intacts : idempotence par
    //    tour_publie (une 2e résolution voit dejaPublie → no-op), index
    //    unique (salon, tour, joueur, type) et DÉTERMINISME de runTurn
    //    (deux exécutants sur les mêmes sections convergent vers le
    //    même état publié). Fonctions cp_advisory_* retirées du schéma.
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

    const pousses = new Set((events ?? []).map((e: { joueur: number }) => e.joueur))
    const manquants = attendus.filter((n) => !pousses.has(n))
    if (manquants.length) {
      return json({ ok: false, error: `barriere incomplete : ${manquants.join(', ')}` }, 409)
    }

    // 3bis. MIGRATIONS DE SCHÉMA (critique 2026-10-18) : l'état de
    //  référence peut avoir été publié par une version antérieure —
    //  le serveur le migre AVANT la fusion, sinon il publierait des
    //  états non migrés à tous les clients (le tampon schema des
    //  clients serait écrasé à chaque résolution en multijoueur).
    //  Mêmes migrations versionnées que le client (engine/migrations.ts).
    migrerEtat(row.state)

    // 4. Fusion — IMPLÉMENTATION PARTAGÉE avec le client
    //    (src/engine/fusion.ts, verrouillée par fusion.test.ts).
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

    // CONFIG MONDIALE : injection avant l'exécution du tour — le
    //  tour N+1 est calculé avec les règles publiées par le créateur.
    //  ⚠ BUG 2026-10-19 corrigé : `cfgMondiale` était UTILISÉ sans
    //  jamais être lu ni défini → ReferenceError à CHAQUE résolution
    //  serveur (500) → repli local systématique depuis le 19/10
    //  matin. La config mondiale vit dans la ligne réservée
    //  '__config__' de la même table (cf. src/supabase/client.ts) :
    //  on la lit ICI, avant l'injection. Ligne absente (jamais
    //  publiée) → null → l'état garde sa config embarquée
    //  (comportement historique, même sémantique que le repli
    //  client resoudreBarriereLocaleV2).
    const { data: cfgRow } = await sb
      .from('parties_chasse_peche')
      .select('state')
      .eq('id', '__config__')
      .maybeSingle()
    const cfgMondiale = (cfgRow?.state as { config?: unknown } | null)?.config ?? null
    appliquerConfigMondiale(draft, cfgMondiale)

    // 5. Exécution du tour par le moteur pur (bundle local testé).
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
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500)
  }
})
