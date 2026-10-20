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
import { productionTourismeBatiment } from './batiments'
import { detailGainsVille } from './economie'

// ── Influence culturelle (ApplyCultureInfluence) ─────────────────────────

/** Tourisme rattaché à UNE habitation (revue 2026-10-16) :
 *  constructions statiques de la ville (Chapelle +35, Foire +5…)
 *  + production locale par tour (Artistes et lignes « Autres » de
 *  la ville, taxes comprises). */
function tourismeVilleDe(state: GameState, p: Player, ville: import('./types').City): number {
  const C = cfgOf(state.config)
  let t = 0
  for (const b of ville.batiments ?? []) t += productionTourismeBatiment(b, C, ville.type)
  for (const a of ville.amenagements ?? []) t += productionTourismeBatiment(a, C, ville.type)
  const d = detailGainsVille(state, p, ville, C)
  t += Math.max(0, (d.taxes['Tourisme'] ?? 0) * C.p.gainsCrediteStock)
  return t
}

/** Total du Tourisme rattaché aux habitations d'un joueur. */
function tourismeVillesDe(state: GameState, p: Player): number {
  let t = 0
  for (const v of p.villes) t += tourismeVilleDe(state, p, v)
  return t
}

export function applyCultureInfluence(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // Pression touristique (revue 2026-10-16, retour Thibaut) : pour
  //  CHAQUE culture, pression = tourisme GÉNÉRAL des joueurs qui la
  //  pratiquent (technologies, lois de culture, régimes, ministres…
  //  — tout ce qui n'est pas rattachable à une habitation) + le
  //  tourisme de CHAQUE HABITATION de cette culture (bâtiments,
  //  aménagements et production locale de la ville). Un joueur qui
  //  a une capitale culturelle puissante pousse sa culture partout,
  //  et une ville d'accueil convertit ses habitants à la culture
  //  qu'elle pratique.
  const pression: Record<string, number> = {}
  for (const cult of C.cultures) pression[cult.nom] = 0.001
  // tourisme GÉNÉRAL par culture : total des joueurs de cette culture
  //  moins la part rattachée à leurs villes (habitations).
  const generalParCulture: Record<string, number> = {}
  for (const other of state.players) {
    const tourTotal = other.resources['Tourisme']?.stock ?? 0
    const tourVilles = tourismeVillesDe(state, other)
    generalParCulture[other.culture] = (generalParCulture[other.culture] ?? 0) + tourTotal - tourVilles
  }
  // tourisme de chaque HABITATION, crédité à SA culture (ville.culture)
  for (const other of state.players) {
    for (const v of other.villes) {
      const tv = tourismeVilleDe(state, other, v)
      if (tv > 0) pression[v.culture ?? other.culture] = (pression[v.culture ?? other.culture] ?? 0) + tv
    }
  }
  for (const [cult, v] of Object.entries(generalParCulture)) {
    pression[cult] = (pression[cult] ?? 0) + Math.max(0, v)
  }
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.metier === C.p.metierDirigeant) continue
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
