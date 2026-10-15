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
//  · transfererVille : déplace la ville ET sa population « classique »
//    (vivants et décédés inscrits dans cette ville) vers le joueur
//    cible : ils produisent désormais pour lui (gains d'habitants par
//    titres × taxes) et y sont éditables dans son onglet Population.
//    La COUR du joueur (nobles — tableau « La cour » de l'onglet
//    Population) reste auprès de lui : un noble ne change de joueur
//    que s'il est explicitement DONNÉ (donnerPersonnage, cour.ts —
//    retour Thibaut 2026-10-14). Les nobles restés derrière sont
//    ré-ancrés sur la première ville restante du joueur. Si le joueur
//    cible possède déjà une ville du même nom, la ville transférée est
//    RENOMMÉE automatiquement (ex. « Capitale 2 ») pour que ses
//    habitants restent rattachables sans ambiguïté.
// ══════════════════════════════════════════════════════════════════════

import type { Character, City, GameState, Player } from './types'
import { cfgOf, type Cfg } from './gameData'
import { isNobleDyn } from './shared'

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
 *  vente, cadeau). La ville ET sa population « classique » (vivants et
 *  décédés inscrits dans la ville) changent de propriétaire : ils
 *  produisent désormais pour le joueur cible. La COUR (nobles du
 *  joueur) reste auprès de lui, ré-ancrée sur sa première ville
 *  restante. Retourne true si le transfert a eu lieu. */
export function transfererVille(
  state: GameState, p: Player, idx: number, cible: Player,
): boolean {
  const C = cfgOf(state.config)
  const ville = p.villes[idx]
  if (!ville || cible.n === p.n) return false
  p.villes.splice(idx, 1)
  cible.villes.push(ville)
  // Les habitants « classiques » de la ville suivent (vivants ET
  //  décédés, pour l'arbre généalogique) ; la cour (nobles) reste
  //  auprès de son joueur — on ne déplace un noble que sur DON
  //  explicite (donnerPersonnage, engine/cour.ts).
  const ancienNom = ville.nom
  const popSrc = state.population[p.n] ?? []
  const restants: Character[] = []
  const deplaces: Character[] = []
  const courRestee: Character[] = []
  for (const c of popSrc) {
    if (c.ville !== ancienNom) restants.push(c)
    else if (isNobleDyn(c.dynastie, C)) {
      // noble de la ville : il RESTE chez son joueur (ré-ancré plus bas)
      courRestee.push(c)
      restants.push(c)
    } else deplaces.push(c)
  }
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
  // La cour restée derrière est ré-ancrée sur la première ville
  //  restante du joueur (elle continue de produire) ; s'il ne lui
  //  reste aucune ville, le champ « ville » est laissé tel quel
  //  (l'arbitre reloge la cour quand le joueur refonde une ville).
  const refuge = p.villes[0]?.nom
  if (refuge) for (const c of courRestee) c.ville = refuge
  state.population[p.n] = restants
  state.population[cible.n] = [...(state.population[cible.n] ?? []), ...deplaces]
  state.log.push({
    turn: state.turn, type: 'Système', joueur: cible.n,
    texte: `🗝 ${ancienNom}${renommee ? ` (renommée « ${renommee} »)` : ''} passe de ${p.nom} à ${cible.nom}${deplaces.length ? `, avec ses ${deplaces.length} habitant(s) (production des titres recalculée pour ${cible.nom})` : ''}${courRestee.length ? ` — la cour de ${p.nom} (${courRestee.length} noble(s)) reste auprès de lui` : ''}.`,
  })
  return true
}

// ── Proximité des villes (marqueur (y), retour Thibaut 2026-10-15) ──────

/** Bonus de Nourriture par tour de la proximité d'une ville (marqueur
 *  (y)) : « Rivière » → proxRiviereNourriture, « Mer » →
 *  proxMerNourriture, « Plaine » (ou absent) → 0. Crédité
 *  automatiquement à chaque fin de tour (canal « Proximité » du récap
 *  ressources — appliquerBonusProximite dans engine.ts) ; montants
 *  paramétrables dans Paramètres → Formules → Villes. */
export function bonusProximite(ville: City, C: Cfg): number {
  if (ville.proximite === 'Rivière') return C.p.proxRiviereNourriture
  if (ville.proximite === 'Mer') return C.p.proxMerNourriture
  return 0
}

/** Étape moteur (marqueur (y)) : crédite au stock le bonus de
 *  proximité de CHAQUE ville (Rivière +12, Mer +7 Nourriture/tour par
 *  défaut) et retourne les apports par joueur (canal « Proximité » du
 *  récap ressources ; pas de log par tour pour ne pas noyer le
 *  journal). */
export function appliquerBonusProximite(
  state: GameState, C: Cfg = cfgOf(state.config),
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const gains: Record<string, number> = {}
    for (const v of p.villes) {
      const b = bonusProximite(v, C)
      if (b !== 0) gains['Nourriture'] = (gains['Nourriture'] ?? 0) + b
    }
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v
    }
    if (Object.keys(gains).length > 0) out[p.n] = gains
  }
  return out
}
