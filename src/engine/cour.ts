// ══════════════════════════════════════════════════════════════════════
//  LA COUR — DONS ENTRE JOUEURS ET MARIAGES MANUELS
//  Retours Thibaut (2026-10-14) : pouvoir donner des habitants ou des
//  nobles à un autre joueur, et marier deux nobles — y compris de
//  joueurs différents (exemple : la fille du joueur 1 avec le fils du
//  joueur 2).
//  · donnerPersonnage : transfère UN personnage (habitant ou noble) à
//    un autre joueur — il quitte la population du source, rejoint
//    celle de la cible et y produit dès le prochain calcul ; sa ville
//    est ré-ancrée sur la première ville de la cible si la sienne
//    n'existe pas chez elle.
//  · marierPersonnages : mariage MANUEL de l'arbitre entre deux nobles
//    vivants, majeurs et non mariés. Chacun reste chez son joueur —
//    le mariage est un lien, pas un déménagement (comme au plateau).
//    Le moteur sait retrouver un conjoint chez un autre joueur :
//    libération au décès (sante.ts) et recherches du père pour les
//    naissances (naissances.ts) parcourent TOUTES les populations.
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player } from './types'
import { cfgOf } from './gameData'
import { isNobleDyn, fullName } from './shared'

/** Donne un personnage (habitant ou noble) à un autre joueur : cadeau,
 *  exile, rachat… Il quitte la population du joueur source, rejoint
 *  celle de la cible (éditable dans son onglet Population, production
 *  des titres recalculée pour elle) ; sa ville est ré-ancrée sur la
 *  première ville de la cible si sa ville actuelle n'y existe pas.
 *  Retourne null si tout s'est bien passé, sinon un message d'erreur. */
export function donnerPersonnage(
  state: GameState, p: Player, c: Character, cible: Player,
): string | null {
  if (cible.n === p.n) return 'Ce personnage appartient déjà à ce joueur.'
  const pop = state.population[p.n] ?? []
  const i = pop.indexOf(c)
  if (i < 0) return 'Personnage introuvable dans la population du joueur.'
  pop.splice(i, 1)
  if (!cible.villes.some((v) => v.nom === c.ville)) {
    c.ville = cible.villes[0]?.nom ?? c.ville
  }
  const dst = state.population[cible.n] ?? (state.population[cible.n] = [])
  dst.push(c)
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🤝 ${fullName(c)} (${c.dynastie}${c.titre ? `, ${c.titre}` : ''}) passe de ${p.nom} à ${cible.nom}.`,
  })
  return null
}

/** Marier deux nobles (mariage manuel de l'arbitre — par exemple unir
 *  la fille du joueur 1 au fils du joueur 2). Chacun reste chez son
 *  joueur : le mariage est un lien, pas un déménagement. Retourne null
 *  si le mariage a eu lieu, sinon un message d'erreur. */
export function marierPersonnages(state: GameState, a: Character, b: Character): string | null {
  const C = cfgOf(state.config)
  if (a.id === b.id) return 'Un personnage ne peut pas se marier avec lui-même.'
  if (a.statut === 'Décédé' || b.statut === 'Décédé') return 'Un des deux personnages est décédé.'
  if (a.age < C.p.adultAge || b.age < C.p.adultAge) return 'Les deux doivent être majeurs pour se marier.'
  if (a.mariage || b.mariage) return 'Un des deux personnages est déjà marié.'
  if (!isNobleDyn(a.dynastie, C) || !isNobleDyn(b.dynastie, C)) {
    return 'Le mariage manuel unit deux NOBLES (la population se marie au fil des tours).'
  }
  a.mariage = fullName(b)
  b.mariage = fullName(a)
  const nA = numeroJoueurDe(state, a)
  const nB = numeroJoueurDe(state, b)
  state.log.push({
    turn: state.turn, type: 'Mariage', joueur: nA >= 0 ? nA : null,
    texte: `Mariage noble (manuel) : ${fullName(a)} (${a.dynastie}) épouse ${fullName(b)} (${b.dynastie})${nA >= 0 && nB >= 0 && nA !== nB ? ' — union de deux cours' : ''}.`,
  })
  return null
}

/** N° du joueur à la population duquel appartient un personnage
 *  (−1 = introuvable). */
export function numeroJoueurDe(state: GameState, c: Character): number {
  for (const q of state.players) {
    if ((state.population[q.n] ?? []).some((x) => x.id === c.id)) return q.n
  }
  return -1
}
