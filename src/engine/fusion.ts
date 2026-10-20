// ═══════════════════════════════════════════════════════════════════════════
//  FUSION DES SECTIONS DE FIN DE TOUR — IMPLÉMENTATION UNIQUE (archi 2026-10-18)
//
//  Ce module PUR est la SEULE implémentation de la fusion multijoueur.
//  Il est partagé par :
//   · le client (src/state/store.tsx — repli local de la résolution v2) ;
//   · l'Edge Function « resoudre-tour » (résolution serveur, via le
//     bundle esbuild _engine.mjs construit par scripts/build-function.mjs
//     et testé par scripts/test-function.mjs avant tout déploiement).
//
//  DÉPLOIEMENT (2026-10-19) : la branche chasse-et-peche-web est
//  autorisée par l'environnement github-pages — un push = CI + Edge
//  Function + publication site/jeu, sans sync v4.
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
import type { GameConfig } from '../config/defaultConfig'
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

/** (R4 — arbitrage Thibaut 2026-10-19 : rejet + journal visible)
 *  Valide la FORME d'une section avant fusion : les payloads viennent
 *  du réseau (cp_events — JSON non contrôlé) ; un client bogué peut
 *  y déposer n'importe quoi. Contrat minimal (audit R4) : `tour` nombre
 *  fini ; `player` objet s'il est présent ; population / routes /
 *  citesLibres / log sont des TABLEAUX s'ils sont présents. Une
 *  section invalide est rejetée ENTIÈRE — pas de demi-fusion (une
 *  moitié de section pourrait casser runTurn à la publication).
 *  Partagée client/Edge Function comme fusionnerSections. */
export function sectionValide(sec: SectionJoueurFusion): boolean {
  if (!sec || typeof sec !== 'object') return false
  if (typeof sec.tour !== 'number' || !Number.isFinite(sec.tour)) return false
  if (sec.player !== undefined && (typeof sec.player !== 'object' || sec.player === null)) return false
  if (sec.population !== undefined && !Array.isArray(sec.population)) return false
  if (sec.routes !== undefined && !Array.isArray(sec.routes)) return false
  if (sec.citesLibres !== undefined && !Array.isArray(sec.citesLibres)) return false
  if (sec.log !== undefined && !Array.isArray(sec.log)) return false
  return true
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
  const conflits: LogEntry[] = []
  const refCiteParNom = new Map((ref.citesLibres ?? []).map((c) => [c.nom, JSON.stringify(c)]))
  const citeFusionnes = new Map((draft.citesLibres ?? []).map((c) => [c.nom, c]))
  const citeModifieePar = new Map<string, number[]>()
  const routesFusionnees: RouteCommerce[] = [...(draft.routesCommerce ?? [])]

  // Ordre DÉTERMINISTE : trier les numéros de joueurs — l'ordre
  //  d'insertion de Object.keys varie selon le moment des poussées,
  //  rendant « le dernier gagne » des cités libres non reproductible
  //  entre les clients et le serveur.
  const numerosJoueurs = Object.keys(sections)
    .map(Number)
    .filter((n) => Number.isInteger(n) && n >= 0)
    .sort((a, b) => a - b)

  for (const n of numerosJoueurs) {
    const nStr = String(n)
    // Clé non numérique (payload réseau non contrôlé) : aucun joueur
    //  à fusionner — ignorée sans log (rien n'a été tenté).
    if (!Number.isInteger(n) || n < 0) continue
    const sec = sections[nStr]
    if (!sec) continue
    // R4 (arbitrage Thibaut 2026-10-19) : validation de FORME avant
    //  toute application — une section malformée ne doit jamais
    //  atteindre Object.assign / runTurn (crash à la publication).
    //  Rejet ENTIÈR + entrée visible dans le journal du tour.
    if (!sectionValide(sec)) {
      newLogs.push({
        turn: ref.turn + 1, type: 'Système', joueur: n,
        texte: `⚠ Section invalide ignorée (données malformées reçues) — les actions de J${n} ne comptent pas pour ce tour.`,
      })
      continue
    }
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
          citeModifieePar.set(c.nom, [...(citeModifieePar.get(c.nom) ?? []), n])
          citeFusionnes.set(c.nom, c)
        }
      }
    }
    if (Array.isArray(sec.log)) newLogs.push(...(sec.log as unknown[]))
  }

  // CONFLITS de cités libres : deux joueurs ont modifié la MÊME cité ce
  //  tour — la version du plus petit numéro l'emporte (déterministe,
  //  ordre trié ci-dessus), et un événement CONFLIT est journalisé dans
  //  le salon pour l'arbitre (plus de last-write-wins silencieux).
  const tourFusion = draft.turn
  for (const [nom, auteurs] of citeModifieePar) {
    if (auteurs.length > 1) {
      for (const n of [...auteurs].sort((a, b) => a - b)) {
        const sec = sections[String(n)]
        if (!sec || !sectionValide(sec)) continue
        const cand = ((sec.citesLibres as CiteLibre[] | undefined) ?? []).find((c) => c.nom === nom)
        if (cand) {
          citeFusionnes.set(nom, cand)
          break
        }
      }
      conflits.push({
        turn: tourFusion,
        type: 'Conflit',
        joueur: null,
        texte: `⚠️ Cité libre « ${nom} » modifiée par ${auteurs.length} joueurs ce tour (${auteurs.join(', ')}) — version du joueur ${Math.min(...auteurs)} retenue.`,
      })
    }
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
  const logFusionne = [...draft.log, ...conflits, ...(newLogs as LogEntry[])]
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
    } else if (ev.type === 'forcer_absents') {
      const message = typeof ev.payload.message === 'string' ? ev.payload.message : '⏭ Tour forcé.'
      draft.log.push({
        turn: draft.turn,
        type: 'Conflit',
        joueur: ev.joueur,
        texte: message,
      })
    }
  }
}

/** CONFIG MONDIALE (règle 2026-10-19) : injecte la config mondiale dans
 *  l'état fusionné AVANT runTurn — la mise à jour de la config se fait
 *  EN FIN DE TOUR, comme tout le reste (sections, événements). Le créateur
 *  publie ses éditions dans la ligne '__config__' à tout moment ; elles
 *  prennent effet à la prochaine résolution du tour (Edge Function ou
 *  repli local — même chemin, ici). `null` = pas de config mondiale
 *  publiée : l'état garde sa config embarquée (comportement historique). */
export function appliquerConfigMondiale(
  draft: GameState,
  cfg: GameConfig | null | undefined,
): void {
  if (cfg) draft.config = cfg
}

/** CORRECTIF EGRESS (2026-10-20) : la forme RÉSEAU d'un état — tout
 *  l'état, SANS le cache config.
 *
 *  Incident réel : quota egress Supabase (5 Go/mois, plan Free) explosé
 *  — chaque publication d'état de référence embarquait le CACHE config
 *  (~181 Ko, le référentiel complet), relu par CHAQUE client à CHAQUE
 *  fin de tour (8 joueurs ≈ 1,5 Mo de config par tour et par salon,
 *  pour un cache que chaque client possède déjà : la mondiale
 *  '__config__', adoptée au chargement). La règle 2026-10-19 avait
 *  déjà déclassé ce champ : la config EMBARQUÉE n'est PLUS une source,
 *  seule la mondiale fait foi — le réseau n'avait plus aucune raison
 *  de la transporter.
 *
 *  CONTRAT :
 *   · PUBLICATION — publierEtatFusionne (src/supabase/client.ts) et
 *     l'Edge Function « resoudre-tour » publient etatReseau(state) ;
 *   · INGESTION — chaque site d'ingestion du store réinjecte la
 *     config locale (mondiale adoptée au chargement — adopterConfig,
 *     src/state/configPriorite.ts : le cache doit rester présent pour
 *     l'UI et runTurn, cfgOf(undefined) = défauts serait un bug de la
 *     classe « adultAge 16 ») ;
 *   · RÉTROCOMPAT — les lignes EXISTANTES qui embarquent encore leur
 *     config restent lisibles (le champ est ignoré : l'ingestion
 *     écrase le cache par la locale, il n'est plus une source).
 *
 *  PARTAGÉ client + Edge Function (même contrat que fusionnerSections
 *  — le bundle _engine.mjs l'embarque). Pur : ne mute PAS `state`
 *  (copie superficielle, la clé `config` est retirée de la copie — le
 *  JSON réseau ne dépend pas du comportement de JSON.stringify sur
 *  `undefined`). */
export function etatReseau(state: GameState): GameState {
  const reseau: GameState = { ...state }
  delete reseau.config
  return reseau
}
