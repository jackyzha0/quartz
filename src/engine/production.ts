// ══════════════════════════════════════════════════════════════════════
//  PRODUCTION PAR TOUR — VUE DÉTAILLÉE PAR CANAL (page « Pays »)
//  Recense l'ensemble des productions par tour d'un joueur :
//    · base (production propre du pays, stockée dans resources[r].prod),
//    · habitants (titres et taxes, moins la consommation — Économie),
//    · bâtiments (effets automatiques, feuilles Ville / Château),
//    · aménagements (effets de terrain, feuille Aménagements),
//    · vassalité (tribut payé / reçu, paramètre vassalPrelevement).
//  La production affichée est CALCULÉE (non modifiable) : le stock du
//  tour N égale le stock du tour N−1 plus la production par tour.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import type { Cfg } from './gameData'
import { makeRng } from './rng'
import { calculerGainsPopulation } from './economie'
import { effetsBatimentsVille } from './batiments'
import { effetsAmenagementsVille } from './amenagements'

export interface ProductionDetail {
  /** production de base (l'Été double la Nourriture, comme le moteur) */
  base: Record<string, number>
  /** gains d'habitants (titres, taxes, − consommation) × gainsCrediteStock */
  habitants: Record<string, number>
  /** effets automatiques des bâtiments */
  batiments: Record<string, number>
  /** effets des aménagements de terrain */
  amenagements: Record<string, number>
  /** tribut de vassalité (négatif = payé, positif = reçu) */
  vassalite: Record<string, number>
  /** somme de tous les canaux */
  total: Record<string, number>
}

/** Gains bruts d'habitants d'un joueur, AVANT tribut de vassalité.
 *  calculerGainsPopulation est déterministe (le rng n'est pas consommé). */
function gainsBruts(state: GameState, p: Player): Record<string, number> {
  return calculerGainsPopulation(state, p, makeRng(1))
}

/** Production par tour détaillée d'un joueur, canal par canal.
 *  Reflète exactement les étapes du moteur (FinDeTour) : les valeurs
 *  affichées ici sont celles créditées au stock au prochain tour. */
export function productionDetaillee(state: GameState, p: Player, C: Cfg): ProductionDetail {
  const saison: GameState['saison'] = state.saison
  const coefGains = C.p.gainsCrediteStock
  const prelevement = C.p.vassalPrelevement

  // Base : production propre + double Nourriture en été (étape 3 du moteur)
  const base: Record<string, number> = {}
  for (const [res, rs] of Object.entries(p.resources)) {
    let v = rs.prod
    if (res === 'Nourriture' && saison === 'Été') v *= 2
    if (v !== 0) base[res] = v
  }

  // Habitants : gains propres (avant tribut) × coefficient de crédit
  const habitants: Record<string, number> = {}
  for (const [res, v] of Object.entries(gainsBruts(state, p))) {
    if (v !== 0) habitants[res] = v * coefGains
  }

  // Bâtiments + aménagements : effets par tour (non taxés par la vassalité)
  const batiments: Record<string, number> = {}
  const amenagements: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsBatimentsVille(ville, C))) {
      batiments[res] = (batiments[res] ?? 0) + v
    }
    for (const [res, v] of Object.entries(effetsAmenagementsVille(ville, saison))) {
      amenagements[res] = (amenagements[res] ?? 0) + v
    }
  }

  // Vassalité : tribut payé au suzerain + tributs reçus des vassaux
  // (seuls les revenus d'habitants sont prélevés — étape 3bis du moteur)
  const vassalite: Record<string, number> = {}
  if (p.vassalDe != null) {
    const part = (gainsBruts(state, p)['Or'] ?? 0) * prelevement * coefGains
    if (part !== 0) vassalite['Or'] = (vassalite['Or'] ?? 0) - part
  }
  for (const q of state.players) {
    if (q.vassalDe !== p.n) continue
    const part = (gainsBruts(state, q)['Or'] ?? 0) * prelevement * coefGains
    if (part !== 0) vassalite['Or'] = (vassalite['Or'] ?? 0) + part
  }

  // Total
  const total: Record<string, number> = {}
  for (const canal of [base, habitants, batiments, amenagements, vassalite]) {
    for (const [res, v] of Object.entries(canal)) {
      total[res] = (total[res] ?? 0) + v
    }
  }
  return { base, habitants, batiments, amenagements, vassalite, total }
}
