// ══════════════════════════════════════════════════════════════════════
//  ARMÉES (RecruitForArmies)
//  Recrutement, pertes, commandants, martialité et puissance des armées.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf, cultureDef } from './gameData'
import { emptyRecap, fullName } from './shared'

// ── Armées (RecruitForArmies) ────────────────────────────────────────────

export function recruitForArmies(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const recap = p.recap ?? emptyRecap()
  const cult = cultureDef(p.culture, C.config)
  for (const armee of p.armees) {
    // retirer les soldats morts
    armee.soldats = armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    })
    // commandant mort ?
    const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
    let puissance = armee.soldats.length * C.p.puissanceSoldat
    if (cmd && cmd.statut !== 'Décédé') {
      puissance += C.p.puissanceGeneral
    } else if (armee.commandant) {
      armee.commandant = null
      recap.commandantTombe = armee.nom
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${p.nom} : le commandant de l'armée « ${armee.nom} » est tombé — à remplacer !`,
      })
    }
    // recruter jusqu'à la puissance cible
    while (puissance < armee.puissanceCible) {
      const candidats = pop.filter(
        (c) =>
          c.statut !== 'Décédé' &&
          c.age >= C.p.soldatAgeMin && c.age <= C.p.soldatAgeMax &&
          !c.armee && (!c.titre || c.titre === C.p.titreChasseur) &&
          martialiteOk(cult?.martialite, c.sexe),
      )
      if (candidats.length === 0) break
      const s = rng.pick(candidats)
      s.titre = C.p.titreSoldat
      s.armee = armee.nom
      armee.soldats.push(s.id)
      puissance += C.p.puissanceSoldat
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${fullName(s)} rejoint l'armée « ${armee.nom} » comme soldat.`,
      })
    }
    armee.puissance = puissance
  }
}

export function martialiteOk(martialite: string | undefined, sexe: 'M' | 'F'): boolean {
  if (!martialite || martialite === 'Les deux') return true
  if (martialite === 'Masculine') return sexe === 'M'
  if (martialite === 'Féminine') return sexe === 'F'
  return true
}

/** Recalcule la puissance affichée d'une armée (après édition manuelle). */
export function recomputeArmy(state: GameState, p: Player, armee: { nom: string; soldats: string[]; commandant: string | null; puissance: number }) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
  armee.puissance =
    armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    }).length * C.p.puissanceSoldat + (cmd && cmd.statut !== 'Décédé' ? C.p.puissanceGeneral : 0)
}
