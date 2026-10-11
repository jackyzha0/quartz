// ══════════════════════════════════════════════════════════════════════
//  ÉCONOMIE — GAINS DE POPULATION (CalculerGainsPopulation)
//  Revenus par ville (titres, taxes, consommation) et facteur de taxes sur les naissances.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf, titreDef, type Cfg } from './gameData'

// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Titres → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par les
//  taxes de la ville, puis consommation de 1 Nourriture par habitant vivant.
// ══════════════════════════════════════════════════════════════════════

export function calculerGainsPopulation(state: GameState, p: Player, rng: Rng): Record<string, number> {
  const C = cfgOf(state.config)
  const totals: Record<string, number> = {}
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const cityGains: Record<string, number> = {}
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    for (const c of vivants) {
      if (!c.titre) continue
      const td = titreDef(c.titre, C.config)
      if (!td) continue
      if (td.ressource1 && td.valeur1 !== 0) {
        cityGains[td.ressource1] = (cityGains[td.ressource1] ?? 0) + td.valeur1
      }
      if (td.ressource2 && td.valeur2 !== 0) {
        cityGains[td.ressource2] = (cityGains[td.ressource2] ?? 0) + td.valeur2
      }
    }
    // Taxes : Faible → Or ×0,5 / Forte → Or ×1,5 (l'inverse pour la Nourriture)
    const taxOr = ville.taxes === 'Faible' ? C.p.taxOrFaibles : ville.taxes === 'Forte' ? C.p.taxOrHautes : 1
    const taxNourr = ville.taxes === 'Faible' ? C.p.taxOrHautes : ville.taxes === 'Forte' ? C.p.taxOrFaibles : 1
    if (cityGains['Or']) cityGains['Or'] *= taxOr
    if (cityGains['Nourriture']) cityGains['Nourriture'] *= taxNourr
    // Consommation (non taxée, appliquée après)
    cityGains['Nourriture'] = (cityGains['Nourriture'] ?? 0) - C.p.consoNourrParHab * vivants.length
    for (const [res, v] of Object.entries(cityGains)) {
      totals[res] = (totals[res] ?? 0) + v
    }
  }
  return totals
}

/** Facteur de taxes sur la conception (Faible ×1,5 / Moyenne ×1 / Forte ×0,5). */
export function taxBirthFactor(ville: City | undefined, C: Cfg = cfgOf()): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? C.p.taxNaissFaibles : ville.taxes === 'Forte' ? C.p.taxNaissHautes : 1
}
