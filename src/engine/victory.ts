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

// ── Progression chiffrée vers chaque condition (radar de l'accueil) ─────

/** Clés booléennes de VictoryStatus : une par condition, une par axe du radar. */
export type VictoryKey =
  'militaire' | 'economique' | 'culturelle' | 'scientifique' | 'demographique' | 'dynastique'

export interface VictoryProgress {
  joueur: number
  nom: string
  /** ratio 0..1 par condition — 1 = condition atteinte (👑). */
  valeurs: Record<VictoryKey, number>
  /** détail du calcul, affiché au survol du sommet correspondant du radar. */
  details: Record<VictoryKey, string>
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/** Moyenne de sous-conditions plafonnées à 1 : 1 = toutes atteintes. */
function moyenne01(ratios: number[]): number {
  if (ratios.length === 0) return 0
  return clamp01(ratios.reduce((a, b) => a + b, 0) / ratios.length)
}

/** Progression estimée (0..1) de chaque joueur vers chaque condition de
 *  victoire du chapitre XII — mêmes seuils et mêmes mécaniques que
 *  checkVictory, mais en ratios lisibles pour le radar de l'accueil :
 *    • Militaire : part des armées du joueur sur les armées en jeu
 *      (condition : plus aucune armée adverse),
 *    • Économique : part de la production d'Or mondiale (seuil 50 %),
 *    • Culturelle : plus faible des deux parts — Tourisme mondial et
 *      villes converties à sa culture (seuils 50 % et 50 %),
 *    • Scientifique : stock de Science (seuil 100),
 *    • Démographique : plus faible des deux ratios — villes (seuil 5)
 *      et production de Nourriture (seuil 100),
 *    • Dynastique : moyenne des quatre sous-conditions (gouverneurs 2,
 *      éducations rang 3 : 4, famille 10, part de la cour mondiale 33 %). */
export function victoryProgress(state: GameState): VictoryProgress[] {
  const C = cfgOf(state.config)
  const T_DIRIGEANT = C.p.titreDirigeant
  const T_GOUVERNEUR = C.p.titreGouverneur
  const vivantsMonde = state.players.reduce(
    (n, p) => n + (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé').length, 0,
  )
  const orTotal = sumProd(state, 'Or')
  const tourTotal = Math.max(1, state.players.reduce((n, q) => n + (q.resources['Tourisme']?.stock ?? 0), 0))

  return state.players.map((p) => {
    const pop = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé')
    const dynDirigeant = pop.find((c) => c.titre === T_DIRIGEANT)?.dynastie
    const famille = dynDirigeant ? pop.filter((c) => c.dynastie === dynDirigeant) : []
    const gouverneurs = famille.filter((c) => c.titre === T_GOUVERNEUR).length
    const eduRang3 = famille.filter((c) => c.education === 'Médicale' || c.education === 'Scientifique' || c.education === 'Militaire').length
    const prodNourr = p.resources['Nourriture']?.prod ?? 0
    const orProd = p.resources['Or']?.prod ?? 0
    const tourStock = p.resources['Tourisme']?.stock ?? 0
    const cultVilles = state.players.reduce((n, q) => n + q.villes.filter((v) => v.culture === p.culture).length, 0)
    const villesTotales = state.players.reduce((n, q) => n + q.villes.length, 0)
    const pourcentCour = vivantsMonde > 0 ? pop.length / vivantsMonde : 0
    const garnison = p.resources['Garnison']?.stock ?? 0
    const science = p.resources['Science']?.stock ?? 0
    const armeesJoueur = p.armees.length
    const armeesAdv = state.players.filter((q) => q.n !== p.n).reduce((n, q) => n + q.armees.length, 0)

    const militaire =
      armeesAdv === 0 ? (garnison > 0 ? 1 : 0)
        : armeesJoueur + armeesAdv === 0 ? 0
          : armeesJoueur / (armeesJoueur + armeesAdv)
    const partOr = orTotal > 0 ? orProd / orTotal : 0
    const economique = clamp01(partOr / 0.5)
    const partTour = clamp01(tourStock / tourTotal)
    const partCult = villesTotales > 0 ? cultVilles / villesTotales : 0
    const culturelle = Math.min(clamp01(partTour / 0.5), clamp01(partCult / 0.5))
    const scientifique = clamp01(science / 100)
    const demographique = Math.min(clamp01(p.villes.length / 5), clamp01(prodNourr / 100))
    const dynastique = dynDirigeant
      ? moyenne01([
          clamp01(gouverneurs / 2),
          clamp01(eduRang3 / 4),
          clamp01(famille.length / 10),
          clamp01(pourcentCour / 0.33),
        ])
      : 0

    return {
      joueur: p.n,
      nom: p.nom,
      valeurs: { militaire, economique, culturelle, scientifique, demographique, dynastique },
      details: {
        militaire: `${armeesJoueur} armée(s) en jeu contre ${armeesAdv} adverse(s), garnison ${garnison} — condition : zéro armée adverse.`,
        economique: `${Math.round(partOr * 100)} % de la production d'Or mondiale (seuil : 50 %).`,
        culturelle: `${Math.round(partTour * 100)} % du Tourisme mondial et ${Math.round(partCult * 100)} % des villes converties (seuils : 50 % et 50 %).`,
        scientifique: `${science} / 100 de Science en stock.`,
        demographique: `${p.villes.length} / 5 villes et ${Math.round(prodNourr)} / 100 de production de Nourriture.`,
        dynastique: dynDirigeant
          ? `Dynastie ${dynDirigeant} : ${gouverneurs}/2 gouverneurs, ${eduRang3}/4 éducations rang 3, ${famille.length}/10 membres, ${Math.round(pourcentCour * 100)} % / 33 % de la cour mondiale.`
          : 'Aucun dirigeant vivant : dynastie non établie.',
      },
    }
  })
}

export function victoryLabels(): { key: VictoryKey; label: string }[] {
  return [
    { key: 'militaire', label: 'Militaire' },
    { key: 'economique', label: 'Économique' },
    { key: 'culturelle', label: 'Culturelle' },
    { key: 'scientifique', label: 'Scientifique' },
    { key: 'demographique', label: 'Démographique' },
    { key: 'dynastique', label: 'Dynastique' },
  ]
}
