// ══════════════════════════════════════════════════════════════════════
//  ARMÉES (RecruitForArmies)
//  Recrutement, pertes, commandants, martialité et puissance des armées.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf, cultureDef } from './gameData'
import { aMinistre } from './ministeres'
import { rangPaysNiveau, nbAmenagements, regleActive } from './factions'
import { emptyRecap, fullName } from './shared'
import { reductionLeveeArmeesMerveilles } from './merveilles'
import { reductionLevee } from './progresAuto'

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

/** Prix de levée d'une armée : Or facturés pour sa puissance CIBLE,
 *  1 Or tous les 2 points de force (paramétrable via armeePrixOr /
 *  armeePriXPuissance). Payé UNE FOIS à la levée — pas d'entretien. */
export function prixArmee(
  puissanceCible: number,
  C: { p: { armeePrixOr: number; armeePriXPuissance: number } },
  p?: Player,
  state?: GameState,
  ville?: { batiments?: string[] },
): number {
  const tranche = Math.max(1, C.p.armeePriXPuissance)
  if (puissanceCible <= 0) return 0
  let prix = (puissanceCible / tranche) * C.p.armeePrixOr
  // Réductions automatiques (revue 2026-10-15, retour Thibaut
  //  « tous les ministres et règles de faction automatiques ») :
  //  · Grand écuyer (ministre) : −10 Or par rang de pays du joueur ;
  //  · Sylvains « Vengeance de la terre » (Âge II) : −10 Or
  //    par apiculture possédée. Plancher 0.
  if (p && state) {
    const cfg = cfgOf(state.config)
    if (aMinistre(state, p, 'Grand écuyer')) prix -= 10 * rangPaysNiveau(p, cfg)
    if (p.peuple === 'Sylvains' && regleActive(p, cfg, 'Vengeance de la terre')) {
      prix -= 10 * nbAmenagements(p, 'Apiculture')
    }
    // Merveilles (retour Thibaut 2026-10-15) : Temple de Bahamutt et
    //  Ordre des chevaliers de Notan : -20/-25 Or sur les levées.
    prix -= reductionLeveeArmeesMerveilles(p)
    // Conscription I (revue 2026-10-15) : -10 Or sur les levées.
    prix -= reductionLevee(p, cfg)
    // Stratégies militaires I : la PROCHAINE armée coûte 50 Or de moins
    if (p.prochaineArmeeReduite) prix -= 50
    //  (one-shot — flag consommé à la levée ; consommé par ArmiesPanel).
    // Bonus des BÂTIMENTS DE LA VILLE DE LEVÉE (retour Thibaut
    //  2026-10-15) : la levée se passe DANS une habitation — le
    //  joueur choisit la ville, ses bâtiments s'appliquent :
    //  · Terrain d'entrainement (Château) : −10 Or ;
    //  · Ecole militaire (Château) : −25 Or ;
    //  · Grande caserne (Capitale) : −8 Or ;
    //  · Guilde des explorateurs : −20 Or ;
    //  · Autel eud Guer' (faction Peaux Vertes) : −20 Or.
    // Peaux Vertes « Diriger par la peur » (Âge II, revue 2026-10-15) :
    //  le coût de levée des VASSAUX d'un suzerain Peaux Vertes est
    //  augmenté de 10 Or par rang de pays du suzerain.
    if (state) {
      const suz = state.players.find((q) => q.n === p.vassalDe)
      if (suz && suz.peuple === 'PEAUX VERTES' && regleActive(suz, cfg, 'Diriger par la peur')) {
        prix += 10 * rangPaysNiveau(suz, cfg)
      }
    }
    if (ville?.batiments) {
      if (ville.batiments.includes("Terrain d'entrainement")) prix -= 10
      if (ville.batiments.includes('Ecole militaire')) prix -= 25
      if (ville.batiments.includes('Grande caserne')) prix -= 8
      if (ville.batiments.includes('Guilde des explorateurs')) prix -= 20
      if (ville.batiments.includes("Autel eud Guer'")) prix -= 20
    }
  }
  return Math.max(0, Math.round(prix))
}

/** Nombre maximal d'armées d'un joueur (revue 2026-10-15) : paramètre
 *  maxArmees (2 par défaut) + 1 par règle de faction qui accorde une
 *  armée supplémentaire (« Tous avek moa ! », « L'art du viking »,
 *  « Armées des traditions » des Norls). */
export function maxArmeesJoueur(
  p: Player,
  C: { p: { maxArmees: number } } & import('./gameData').Cfg,
): number {
  let max = C.p.maxArmees
  if (p.peuple === 'PEAUX VERTES' && regleActive(p, C, 'Tous avek moa !')) max += 1
  if (p.peuple === 'NORLS' && regleActive(p, C, "L'art du viking")) max += 1
  if (p.peuple === 'NORLS' && regleActive(p, C, 'Armées des traditions')) max += 1
  return max
}
