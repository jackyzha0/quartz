// ══════════════════════════════════════════════════════════════════════
//  CULTURE — CONVERSIONS ET VILLES (ApplyCultureInfluence)
//  Pression touristique, conversions culturelles et culture majoritaire des villes.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player, PlayerRecap } from './types'
import type { Rng } from './rng'
import { cfgOf } from './gameData'
import { bump, fullName } from './shared'

// ── Influence culturelle (ApplyCultureInfluence) ─────────────────────────

export function applyCultureInfluence(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // pression touristique globale : somme du Tourisme de tous les joueurs par culture
  const pression: Record<string, number> = {}
  for (const cult of C.cultures) pression[cult.nom] = 0.001
  for (const other of state.players) {
    const tour = other.resources['Tourisme']?.stock ?? 0
    pression[other.culture] = (pression[other.culture] ?? 0) + tour
  }
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.titre === C.p.titreDirigeant) continue
    if (!rng.chance(C.p.conversionProba)) continue
    const poids: Record<string, number> = {}
    for (const [cult, w] of Object.entries(pression)) {
      let weight = w
      if (cult === c.culture) weight *= C.p.conversionMemeCulture // présence locale
      const same = pop.filter((x) => x.statut !== 'Décédé' && x.ville === c.ville && x.culture === cult).length
      weight += same * C.p.conversionPoidsLocal
      poids[cult] = weight
    }
    const entries = Object.entries(poids)
    const nouvelle = rng.pickWeighted(entries, (e) => e[1])[0]
    if (nouvelle !== c.culture) {
      c.culture = nouvelle
      bump(recap.conversions, nouvelle)
      state.log.push({
        turn: state.turn + 1, type: 'Culture', joueur: p.n,
        texte: `${fullName(c)} se convertit à la culture ${nouvelle}.`,
      })
    }
  }
}

export function updateCityCultures(state: GameState, p: Player) {
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    if (vivants.length === 0) continue
    const counts: Record<string, number> = {}
    for (const c of vivants) counts[c.culture] = (counts[c.culture] ?? 0) + 1
    const major = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    ville.culture = major
  }
}
