// ═══════════════════════════════════════════════════════════════════════════
//  FUSION DES SECTIONS DE FIN DE TOUR — IMPLÉMENTATION UNIQUE (archi 2026-10-18)
//
//  Ce module PUR est la SEULE implémentation de la fusion multijoueur.
//  Il est partagé par :
//   · le client (src/state/store.tsx — repli local de la résolution v2) ;
//   · l'Edge Function « resoudre-tour » (résolution serveur, via le
//     bundle copié par scripts/build-function.mjs).
//
//  Historique (bugs corrigés ici, ne pas régresser — tests fusion.test.ts) :
//   · 2026-10-17 : routes et cités libres sont PARTAGÉES — remplacer tout
//     le tableau par la section du dernier joueur perdait les actions des
//     autres. Routes : par PROPRIÉTAIRE. Cités : par cité, si modifiée.
//   · 2026-10-17 : les sections embarquaient TOUTES les routes du monde →
//     duplication à chaque résolution. Les sections n'embarquent plus que
//     les routes de leur joueur ; déduplication par id en défense.
//   · 2026-10-17 : les événements partagés (transfert de ville) sont
//     REJOUÉS après la fusion, AVANT runTurn — une mutation inter-joueurs
//     ne peut pas vivre dans une section.
// ═══════════════════════════════════════════════════════════════════════════

import type { GameState, RouteCommerce, CiteLibre, LogEntry } from './types'
import { rejouerTransfertVille } from './villes'

/** Section d'un joueur pour la barrière de fin de tour (cf. supabase/client.ts).
 *  Redéclarée ici pour que le module soit autonome (client + serveur). */
export interface SectionJoueurFusion {
  player?: unknown
  population?: unknown
  routes?: unknown
  citesLibres?: unknown
  log?: unknown
  tour: number
}

/** Événement partagé du tour (cp_events hors sections). */
export interface EvenementPartage {
  joueur: number
  type: string
  payload: Record<string, unknown>
}

/** Fusionne les sections du tour dans un ÉTAT DE RÉFÉRENCE cloné.
 *
 *  CONTRAT : la fonction ne mute PAS `ref` — elle travaille sur un
 *  clone structuré (la population, la plus lourde, est clonée une
 *  seule fois) et renvoie l'état fusionné. Aucune I/O : le client et
 *  le serveur récupèrent ref/sections/événements par leurs moyens et
 *  publient le résultat.
 *
 *  Règles de fusion :
 *   · player : Object.assign de la section du joueur (ses données) ;
 *   · population : remplacée par la section du joueur (sa population) ;
 *   · routes : par PROPRIÉTAIRE — les routes du joueur remplacent les
 *     siennes, celles des autres sont préservées ; déduplication par id ;
 *   · cités libres : par NOM — une cité n'est remplacée que si elle
 *     diffère de la référence (modifiée par ce joueur) ou si elle est
 *     nouvelle (créée pendant le tour) ;
 *   · log : entrées de toutes les sections, plafonnées (historique).
 */
export function fusionnerSections(
  ref: GameState,
  sections: Record<string, SectionJoueurFusion>,
): GameState {
  const popClone = structuredClone(ref.population)
  const draft: GameState = {
    ...structuredClone({ ...ref, population: {}, config: undefined }),
    population: popClone,
    config: ref.config,
  } as GameState

  const newLogs: unknown[] = []
  const refCiteParNom = new Map((ref.citesLibres ?? []).map((c) => [c.nom, JSON.stringify(c)]))
  const citeFusionnes = new Map((draft.citesLibres ?? []).map((c) => [c.nom, c]))
  const routesFusionnees: RouteCommerce[] = [...(draft.routesCommerce ?? [])]

  for (const nStr of Object.keys(sections)) {
    const n = Number(nStr)
    const sec = sections[nStr]
    if (!sec) continue
    const pj = draft.players.find((q) => q.n === n)
    if (pj && sec.player) Object.assign(pj, sec.player)
    if (sec.population) draft.population[n] = sec.population as typeof draft.population[number]
    // ROUTES : remplacer uniquement les routes de CE joueur
    if (Array.isArray(sec.routes)) {
      for (let i = routesFusionnees.length - 1; i >= 0; i--) {
        if (routesFusionnees[i]?.joueur === n) routesFusionnees.splice(i, 1)
      }
      for (const r of sec.routes as RouteCommerce[]) routesFusionnees.push(r)
    }
    // CITÉS LIBRES : ne prendre que les cités MODIFIÉES par ce joueur
    //  (différentes de la référence) ou CRÉÉES pendant le tour.
    if (Array.isArray(sec.citesLibres)) {
      for (const c of (sec.citesLibres ?? []) as CiteLibre[]) {
        const refJson = refCiteParNom.get(c.nom)
        if (refJson === undefined) {
          if (!citeFusionnes.has(c.nom)) citeFusionnes.set(c.nom, c)
        } else if (JSON.stringify(c) !== refJson) {
          citeFusionnes.set(c.nom, c)
        }
      }
    }
    if (Array.isArray(sec.log)) newLogs.push(...(sec.log as unknown[]))
  }

  // Déduplication par id (défense en profondeur : sections déjà poussées
  //  ce tour peuvent encore contenir des routes d'autres joueurs).
  const vus = new Set<string>()
  draft.routesCommerce = routesFusionnees.filter((r) => {
    if (vus.has(r.id)) return false
    vus.add(r.id)
    return true
  })
  draft.citesLibres = [...citeFusionnes.values()]
  const logFusionne = [...draft.log, ...(newLogs as LogEntry[])]
  draft.log = logFusionne.slice(-Math.max(50, draft.log.length))
  return draft
}

/** Rejoue les ÉVÉNEMENTS PARTAGÉS du tour (transferts de villes…) sur un
 *  état déjà fusionné — à appeler APRÈS fusionnerSections, AVANT runTurn.
 *  Les types inconnus sont ignorés silencieusement (forward compat). */
export function rejouerEvenementsPartages(
  draft: GameState,
  evenements: EvenementPartage[],
): void {
  for (const ev of evenements) {
    if (ev.type === 'transfert_ville') {
      rejouerTransfertVille(draft, ev.payload as { ville: string; src: number; dst: number })
    }
  }
}
