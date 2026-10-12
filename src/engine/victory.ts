// ══════════════════════════════════════════════════════════════════════
//  Conditions de victoire — chapitre XII du livret « Déterminer le vainqueur »
// ══════════════════════════════════════════════════════════════════════

import type { GameState, VictoryStatus } from './types'
import { cfgOf } from './gameData'

export function checkVictory(state: GameState): VictoryStatus[] {
  const C = cfgOf(state.config)
  const T_DIRIGEANT = C.p.titreDirigeant
  const T_GOUVERNEUR = C.p.titreGouverneur
  const vivantsMonde = state.players.reduce(
    (n, p) => n + (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé').length, 0,
  )
  const orTotal = sumProd(state, 'Or')
  // Le Tourisme est une VALEUR D'ÉTAT (bonus fixes acquis à la
  // construction, pas des flux par tour) : la victoire culturelle
  // compare les stocks de Tourisme entre joueurs.
  const tourTotal = Math.max(1, state.players.reduce((n, q) => n + (q.resources['Tourisme']?.stock ?? 0), 0))
  const garnisons = state.players.map((p) => p.resources['Garnison']?.stock ?? 0)
  const armeesAdverses = (p: number) =>
    state.players.filter((q) => q.n !== p).reduce((n, q) => n + q.armees.length, 0)

  return state.players.map((p) => {
    const pop = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé')
    const dynDirigeant = pop.find((c) => c.titre === T_DIRIGEANT)?.dynastie
    const famille = pop.filter((c) => c.dynastie === dynDirigeant && dynDirigeant)
    const gouverneurs = famille.filter((c) => c.titre === T_GOUVERNEUR).length
    const eduRang3 = famille.filter((c) => c.education === 'Médicale' || c.education === 'Scientifique' || c.education === 'Militaire').length
    const nourr = p.resources['Nourriture']
    const prodNourr = nourr ? nourr.prod : 0
    const orProd = p.resources['Or']?.prod ?? 0
    const tourStock = p.resources['Tourisme']?.stock ?? 0
    const cultVilles = state.players.reduce((n, q) => n + q.villes.filter((v) => v.culture === p.culture).length, 0)
    const villesTotales = state.players.reduce((n, q) => n + q.villes.length, 0)
    const pourcentCour = vivantsMonde > 0 ? pop.length / vivantsMonde : 0

    return {
      joueur: p.n,
      nom: p.nom,
      militaire: armeesAdverses(p.n) === 0 && garnisons[p.n - 1] > 0,
      economique: orTotal > 0 && orProd / orTotal > 0.5,
      culturelle: tourStock / tourTotal > 0.5 && villesTotales > 0 && cultVilles / villesTotales >= 0.5,
      scientifique: (p.resources['Science']?.stock ?? 0) >= 100,
      demographique: p.villes.length >= 5 && prodNourr >= 100,
      dynastique:
        !!dynDirigeant &&
        gouverneurs >= 2 &&
        eduRang3 >= 4 &&
        famille.length >= 10 &&
        pourcentCour >= 0.33,
    }
  })
}

function sumProd(state: GameState, res: string): number {
  return state.players.reduce((n, p) => n + Math.max(0, p.resources[res]?.prod ?? 0), 0) || 1
}

export function victoryLabels(): { key: keyof import('./types').VictoryStatus; label: string }[] {
  return [
    { key: 'militaire', label: 'Militaire' },
    { key: 'economique', label: 'Économique' },
    { key: 'culturelle', label: 'Culturelle' },
    { key: 'scientifique', label: 'Scientifique' },
    { key: 'demographique', label: 'Démographique' },
    { key: 'dynastique', label: 'Dynastique' },
  ]
}
