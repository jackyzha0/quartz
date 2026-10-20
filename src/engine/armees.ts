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
import { rangPaysNiveau } from './factions'
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
          !c.armee && (!c.metier || c.metier === C.p.metierChasseur) &&
          martialiteOk(cult?.martialite, c.sexe),
      )
      if (candidats.length === 0) break
      const s = rng.pick(candidats)
      s.metier = C.p.metierSoldat
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

/**
 * INFLIGER DES PERTES (revue 2026-10-17) : tue `nb` soldats d'une armée
 *  (l'ordre du tableau = l'ordre d'engagement), retire leurs ids de
 *  l'armée, et tue le commandant en premier si demandé. Les soldats
 *  tombés au combat : statut « Décédé », conjoint libéré, puissance
 *  recalculée. Retourne la liste des noms des soldats tués.
 */
export function infligerPertes(
  state: GameState, p: Player, idxArmee: number, nb: number,
  tuerCommandant = false,
): string[] {
  const armee = p.armees?.[idxArmee]
  if (!armee || nb <= 0) return []
  const pop = state.population[p.n] ?? []
  const tombes: string[] = []
  const tuer = (c: import('./types').Character) => {
    c.statut = 'Décédé'
    // M1 (2026-10-19) : veuvage par ID (les noms complets ne sont plus
    //  une identité fiable à 16 000 habitants).
    if (c.mariageId) {
      for (const liste of Object.values(state.population ?? {})) {
        for (const x of liste ?? []) {
          if (x.mariageId === c.id) { x.mariage = null; x.mariageId = null }
        }
      }
    }
    armee.soldats = armee.soldats.filter((id) => id !== c.id)
    c.armee = null
    tombes.push(fullName(c))
  }
  if (tuerCommandant && armee.commandant) {
    const cmd = pop.find((x) => x.id === armee.commandant)
    if (cmd && cmd.statut !== 'Décédé') {
      tuer(cmd)
      armee.commandant = null
    }
  }
  for (const id of [...armee.soldats]) {
    if (tombes.length >= nb) break
    const c = pop.find((x) => x.id === id)
    if (c && c.statut !== 'Décédé') tuer(c)
  }
  recomputeArmy(state, p, armee)
  if (tombes.length > 0) {
    state.log.push({
      turn: state.turn, type: 'Armée', joueur: p.n,
      texte: `⚔ Pertes — ${armee.nom} : ${tombes.length} tombé(s) au combat (${tombes.join(', ')}). Puissance restante : ${Math.round(armee.puissance)}.`,
    })
  }
  return tombes
}

/**
 * FIN DE SERVICE (revue 2026-10-17) : N soldats quittent l'armée et
 *  redeviennent CHASSEURS (même convention que Dissoudre — ils restent
 *  vivants et productifs). Le commandant peut être démobilisé aussi.
 *  Puissance recalculée. Retourne les noms des soldats libérés.
 */
export function libererSoldats(
  state: GameState, p: Player, idxArmee: number, nb: number,
  libererCommandant = false,
): string[] {
  const armee = p.armees?.[idxArmee]
  if (!armee || nb <= 0) return []
  const pop = state.population[p.n] ?? []
  const liberes: string[] = []
  const liberer = (c: import('./types').Character) => {
    c.armee = null
    c.metier = 'Chasseur' // re-titré comme Dissoudre / RetirerArmee
    armee.soldats = armee.soldats.filter((id) => id !== c.id)
    liberes.push(fullName(c))
  }
  if (libererCommandant && armee.commandant) {
    const cmd = pop.find((x) => x.id === armee.commandant)
    if (cmd && cmd.statut !== 'Décédé') {
      liberer(cmd)
      armee.commandant = null
    }
  }
  for (const id of [...armee.soldats]) {
    if (liberes.length >= nb) break
    const c = pop.find((x) => x.id === id)
    if (c && c.statut !== 'Décédé') liberer(c)
  }
  recomputeArmy(state, p, armee)
  if (liberes.length > 0) {
    state.log.push({
      turn: state.turn, type: 'Armée', joueur: p.n,
      texte: `🕊 Fin de service — ${armee.nom} : ${liberes.length} soldat(s) libéré(s) comme Chasseur(s) (${liberes.join(', ')}). Puissance restante : ${Math.round(armee.puissance)}.`,
    })
  }
  return liberes
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
  // Réductions automatiques (revue 2026-10-15) :
  //  · Grand écuyer (ministre) : −10 Or par rang de pays du joueur.
  if (p && state) {
    const cfg = cfgOf(state.config)
    if (aMinistre(state, p, 'Grand écuyer')) prix -= 10 * rangPaysNiveau(p, cfg)
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
    //  · Guilde des explorateurs : −20 Or.
    if (ville?.batiments) {
      if (ville.batiments.includes("Terrain d'entrainement")) prix -= 10
      if (ville.batiments.includes('Ecole militaire')) prix -= 25
      if (ville.batiments.includes('Grande caserne')) prix -= 8
      if (ville.batiments.includes('Guilde des explorateurs')) prix -= 20
    }
  }
  return Math.max(0, Math.round(prix))
}

/** Plafond d'armées — SUPPRIMÉ (retour joueur 2026-10-18) : plus aucun
 *  hardcap, le paramètre maxArmees est ignoré. Fonction conservée pour la
 *  compatibilité de l'API (autres modules) mais ne plafonne plus. */
export function maxArmeesJoueur(
  _p: Player,
  _C: { p: { maxArmees: number } } & import('./gameData').Cfg,
): number {
  return Number.POSITIVE_INFINITY
}
