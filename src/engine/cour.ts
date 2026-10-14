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
//    vivants, majeurs et non mariés. Chacun reste chez son porteur —
//    le mariage est un lien, pas un déménagement (comme au plateau).
//    Le moteur sait retrouver un conjoint chez un autre porteur :
//    libération au décès (sante.ts) et recherches du père pour les
//    naissances (naissances.ts) parcourent TOUTES les populations.
//  Retour Thibaut (2026-10-14, suite) : la population des CITÉS
//  LIBRES est gérée « comme si c'étaient des joueurs » (onglet 👥
//  Population) — les dons (deplacerPersonnage, shared.ts) déplacent un
//  personnage entre JOUEURS et CITÉS LIBRES dans tous les sens, et le
//  log du mariage nomme le porteur de chaque époux (joueur ou cité).
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player } from './types'
import { cfgOf } from './gameData'
import { isNobleDyn, fullName, deplacerPersonnage, porteurDe, nomDe, memeDetenteur } from './shared'

/** Donne un personnage (habitant ou noble) à un autre joueur : cadeau,
 *  exile, rachat… Il quitte la population du joueur source, rejoint
 *  celle de la cible (éditable dans son onglet Population, production
 *  des titres recalculée pour elle) ; sa ville est ré-ancrée sur la
 *  première ville de la cible si sa ville actuelle n'y existe pas.
 *  Wrapper joueur→joueur du don GÉNÉRALISÉ (deplacerPersonnage,
 *  shared.ts) qui couvre aussi les cités libres. Retourne null si tout
 *  s'est bien passé, sinon un message d'erreur. */
export function donnerPersonnage(
  state: GameState, p: Player, c: Character, cible: Player,
): string | null {
  if (cible.n === p.n) return 'Ce personnage appartient déjà à ce joueur.'
  return deplacerPersonnage(state, c, { kind: 'joueur', p: cible })
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
  // Porteurs des époux (joueurs OU cités libres — retour Thibaut
  //  2026-10-14 : on peut marier un noble d'un joueur à un noble
  //  d'une cité libre) : le log nomme chacun.
  const dA = porteurDe(state, a)
  const dB = porteurDe(state, b)
  const union = dA && dB && !memeDetenteur(dA, dB) ? ' — union de deux cours' : ''
  state.log.push({
    turn: state.turn, type: 'Mariage', joueur: dA?.kind === 'joueur' ? dA.p.n : null,
    texte: `Mariage noble (manuel) : ${fullName(a)} (${a.dynastie}${dA ? `, ${nomDe(dA)}` : ''}) épouse ${fullName(b)} (${b.dynastie}${dB ? `, ${nomDe(dB)}` : ''})${union}.`,
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
