// ══════════════════════════════════════════════════════════════════════
//  Contrôle de cohérence de l'attribution des métiers
//  (portage de la macro VBA ValidateMetierAssignment + frmAttribuerMetier)
//  PHILOSOPHIE : ces contrôles sont des AVERTISSEMENTS, jamais des
//  blocages. L'attribution est toujours appliquée (aucune contrainte
//  bloquante) ; le message sert d'aide au joueur qui peut l'ignorer.
// ══════════════════════════════════════════════════════════════════════

import type { Character, Player, GameState } from './types'
import { cfgOf, cultureDef, metierDef } from './gameData'
import { schoolRankOf } from './gameData2'
import { isNobleDyn } from './engine'
import { rangPaysNiveau } from './factions'

export interface MetierIssue {
  ok: boolean
  message: string
}

/**
 * Contrôle l'attribution d'un métier à un personnage (cohérence avec le
 * classeur) : âge adulte, noblesse, règles de genre du metier et de la
 * culture (Reglege : vide / Masculine / Féminine / Hérédité / Martialité),
 * éducation requise, unicité Dirigeant/Héritier/Gouverneur/Professeur.
 */
export function validateMetierAssignment(
  state: GameState,
  player: Player,
  char: Character,
  metier: string,
): MetierIssue {
  const C = cfgOf(state.config)
  const td = metierDef(metier, C.config)
  if (!td) return { ok: false, message: `Métier inconnu : ${metier}` }
  if (char.statut === 'Décédé') return { ok: false, message: 'Ce personnage est décédé.' }
  if (char.age < C.p.adultAge) return { ok: false, message: `Ce personnage est mineur (${char.age} ans, adulte à ${C.p.adultAge}).` }
  if (td.attribution === 'Armée') {
    return { ok: false, message: `Le métier « ${metier} » s'obtient normalement par l'engagement militaire.` }
  }
  if (td.nobleSeul && !isNobleDyn(char.dynastie, C)) {
    return { ok: false, message: `Le métier « ${metier} » est en principe réservé aux nobles (${char.dynastie}).` }
  }
  // règles de genre (colonne RegleGenre du classeur : vide/Masculine/Féminine/Hérédité/Martialité)
  const cult = cultureDef(player.culture, C.config)
  if (td.regleGenre === 'Masculine' && char.sexe !== 'M') {
    return { ok: false, message: 'Ce métier est en principe réservé aux hommes.' }
  }
  if (td.regleGenre === 'Féminine' && char.sexe !== 'F') {
    return { ok: false, message: 'Ce métier est en principe réservé aux femmes.' }
  }
  if (td.regleGenre === 'Hérédité' && cult) {
    if (cult.heredite === 'Masculine' && char.sexe !== 'M') {
      return { ok: false, message: `La culture ${player.culture} (hérédité masculine) réserve en principe ce poste aux hommes.` }
    }
    if (cult.heredite === 'Féminine' && char.sexe !== 'F') {
      return { ok: false, message: `La culture ${player.culture} (hérédité féminine) réserve en principe ce poste aux femmes.` }
    }
  }
  if (td.regleGenre === 'Martialité' && cult) {
    if (cult.martialite === 'Masculine' && char.sexe !== 'M') {
      return { ok: false, message: `La culture ${player.culture} (martialité masculine) réserve en principe ce poste aux hommes.` }
    }
    if (cult.martialite === 'Féminine' && char.sexe !== 'F') {
      return { ok: false, message: `La culture ${player.culture} (martialité féminine) réserve en principe ce poste aux femmes.` }
    }
  }
  // éducation requise
  if (td.education && char.education !== td.education) {
    return { ok: false, message: `Éducation attendue : ${td.education} (ce personnage a : ${char.education ?? 'aucune'}).` }
  }
  // règles d'unicité (Dirigeant, Héritier, Gouverneur, Professeurs)
  const pop = (state.population[player.n] ?? []).filter((c) => c.statut !== 'Décédé')
  if (metier === C.p.metierDirigeant && pop.some((c) => c.id !== char.id && c.metier === C.p.metierDirigeant)) {
    return { ok: false, message: `Il y a déjà un ${C.p.metierDirigeant}.` }
  }
  if (metier === C.p.metierHeritierStr) {
    const dirigeant = pop.find((c) => c.metier === C.p.metierDirigeant)
    if (pop.some((c) => c.id !== char.id && c.metier === C.p.metierHeritierStr)) {
      return { ok: false, message: `Il y a déjà un ${C.p.metierHeritierStr}.` }
    }
    if (dirigeant && char.dynastie !== dirigeant.dynastie) {
      return { ok: false, message: `L'${C.p.metierHeritierStr} est en principe de la dynastie du ${C.p.metierDirigeant} (${dirigeant.dynastie}).` }
    }
  }
  if (metier === C.p.metierGouverneur) {
    const autres = pop.filter((c) => c.id !== char.id && c.metier === C.p.metierGouverneur && c.ville === char.ville)
    if (autres.length > 0) {
      return { ok: false, message: `${char.ville} a déjà un ${C.p.metierGouverneur}.` }
    }
  }
  if (metier === C.p.metierProfesseur) {
    const ville = player.villes.find((v) => v.nom === char.ville)
    const rank = ville ? schoolRankOf(ville.batiments, C.config) : 0
    const nbProfs = pop.filter((c) => c.metier === C.p.metierProfesseur && c.ville === char.ville).length
    if (rank === 0) return { ok: false, message: `${char.ville} ne possède pas d'école.` }
    if (nbProfs >= rank) {
      return { ok: false, message: `${char.ville} a déjà ${nbProfs} ${C.p.metierProfesseur}(s) pour une école de rang ${rank}.` }
    }
  }
  // conseil de Ministres indexé sur le rang de pays (échelle féodale unique) :
  // chaque rang de la table paysRangs fixe le nombre de Ministres autorisés.
  if (metier === 'Ministre') {
    const rangs = C.config.paysRangs ?? []
    const cap = rangs[rangPaysNiveau(player, C) - 1]?.ministres ?? 0
    const nbMin = pop.filter((c) => c.id !== char.id && c.metier === 'Ministre').length
    if (nbMin >= cap) {
      return {
        ok: false,
        message: `Le rang de pays ${player.rang || rangs[0]?.nom || 'de départ'} n'autorise que ${cap} Ministre(s) — montez de rang (sacre) pour agrandir votre conseil.`,
      }
    }
  }
  return { ok: true, message: `« ${metier} » attribué à ${char.prenom} ${char.nom}.` }
}

/** Liste des metiers du référentiel avec contrôle de cohérence (jamais bloquant). */
export function titleCandidatesFor(state: GameState, player: Player, char: Character) {
  const C = cfgOf(state.config)
  return C.metiers.map((t) => {
    const issue = validateMetierAssignment(state, player, char, t.metier)
    return { metier: t.metier, ok: issue.ok, motif: issue.ok ? '' : issue.message }
  })
}

/** Avertissements pour le métier courant d'un personnage (affichés, jamais bloquants). */
export function findMetierIssues(state: GameState, player: Player, char: Character): string[] {
  const out: string[] = []
  if (!char.metier) return out
  const C = cfgOf(state.config)
  const td = metierDef(char.metier, C.config)
  if (!td) return out
  if (char.statut !== 'Décédé') {
    const issue = validateMetierAssignment(state, player, char, char.metier)
    if (!issue.ok) out.push(issue.message)
  }
  return out
}
