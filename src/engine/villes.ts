// ══════════════════════════════════════════════════════════════════════
//  VILLES — SUPPRESSION ET TRANSFERT ENTRE JOUEURS
//  Retours Thibaut (2026-10-14) : chaque ville de la page « Pays »
//  peut être SUPPRIMÉE (détruite / retirée de la partie) ou
//  TRANSFÉRÉE à un autre joueur (capture, vente, cadeau).
//  · supprimerVille : retire la ville du joueur ; ses habitants
//    RESTENT dans la population du joueur (l'arbitre les gère ensuite
//    — filtre « ville » de l'onglet Population). Si la ville était la
//    capitale, la première ville restante devient capitale (règle
//    générale : capitaleDe = ville nommée « Capitale », sinon la 1re).
//  · transfererVille : déplace la ville ET ses habitants (vivants et
//    décédés inscrits dans cette ville) vers le joueur cible : ils
//    produisent désormais pour lui (gains d'habitants par titres ×
//    taxes) et y sont éditables dans son onglet Population. Si le
//    joueur cible possède déjà une ville du même nom, la ville
//    transférée est RENOMMÉE automatiquement (ex. « Capitale 2 »)
//    pour que ses habitants restent rattachables sans ambiguïté.
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player } from './types'

/** Supprime la i-ème ville d'un joueur (bouton « Supprimer la ville »,
 *  confirmation côté interface). Les habitants inscrits dans cette
 *  ville restent dans la population du joueur. Retourne le nom de la
 *  ville supprimée (null = introuvable). */
export function supprimerVille(state: GameState, p: Player, idx: number): string | null {
  const ville = p.villes[idx]
  if (!ville) return null
  p.villes.splice(idx, 1)
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🗑 ${ville.nom} n'est plus une ville de ${p.nom} (supprimée) — ses habitants restent inscrits dans sa population.`,
  })
  return ville.nom
}

/** Transfère la i-ème ville d'un joueur à un autre joueur (capture,
 *  vente, cadeau). La ville ET ses habitants (vivants et décédés)
 *  changent de propriétaire : ils produisent désormais pour le joueur
 *  cible. Retourne true si le transfert a eu lieu. */
export function transfererVille(
  state: GameState, p: Player, idx: number, cible: Player,
): boolean {
  const ville = p.villes[idx]
  if (!ville || cible.n === p.n) return false
  p.villes.splice(idx, 1)
  cible.villes.push(ville)
  // Les habitants de la ville suivent (vivants ET décédés, pour
  //  l'arbre généalogique) ; les autres restent au propriétaire.
  const ancienNom = ville.nom
  const popSrc = state.population[p.n] ?? []
  const restants: Character[] = []
  const deplaces: Character[] = []
  for (const c of popSrc) (c.ville === ancienNom ? deplaces : restants).push(c)
  // Collision de nom chez le nouveau propriétaire (ex. deux « Capitale ») :
  //  la ville transférée est renommée pour que ses habitants restent
  //  rattachables sans ambiguïté (filtre « ville », gains par ville…).
  let renommee = ''
  if (cible.villes.some((v) => v !== ville && v.nom === ancienNom)) {
    let i = 2
    while (cible.villes.some((v) => v.nom === `${ancienNom} ${i}`)) i++
    renommee = `${ancienNom} ${i}`
    ville.nom = renommee
    for (const c of deplaces) c.ville = renommee
  }
  state.population[p.n] = restants
  state.population[cible.n] = [...(state.population[cible.n] ?? []), ...deplaces]
  state.log.push({
    turn: state.turn, type: 'Système', joueur: cible.n,
    texte: `🗝 ${ancienNom}${renommee ? ` (renommée « ${renommee} »)` : ''} passe de ${p.nom} à ${cible.nom}${deplaces.length ? `, avec ses ${deplaces.length} habitant(s) (production des titres recalculée pour ${cible.nom})` : ''}.`,
  })
  return true
}
