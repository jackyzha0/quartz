// ══════════════════════════════════════════════════════════════════════
//  Contrôle de cohérence de l'attribution des titres
//  (portage de la macro VBA ValidateTitleAssignment + frmAttribuerTitre)
//  PHILOSOPHIE : ces contrôles sont des AVERTISSEMENTS, jamais des
//  blocages. L'attribution est toujours appliquée (aucune contrainte
//  bloquante) ; le message sert d'aide au joueur qui peut l'ignorer.
// ══════════════════════════════════════════════════════════════════════

import type { Character, Player, GameState } from './types'
import { cfgOf, cultureDef, titreDef } from './gameData'
import { schoolRankOf } from './gameData2'
import { isNobleDyn } from './engine'
import { rangPaysNiveau } from './factions'

export interface TitleIssue {
  ok: boolean
  message: string
}

/**
 * Contrôle l'attribution d'un titre à un personnage (cohérence avec le
 * classeur) : âge adulte, noblesse, règles de genre du titre et de la
 * culture (Reglege : vide / Masculine / Féminine / Hérédité / Martialité),
 * éducation requise, unicité Dirigeant/Héritier/Gouverneur/Professeur.
 */
export function validateTitleAssignment(
  state: GameState,
  player: Player,
  char: Character,
  titre: string,
): TitleIssue {
  const C = cfgOf(state.config)
  const td = titreDef(titre, C.config)
  if (!td) return { ok: false, message: `Titre inconnu : ${titre}` }
  if (char.statut === 'Décédé') return { ok: false, message: 'Ce personnage est décédé.' }
  if (char.age < C.p.adultAge) return { ok: false, message: `Ce personnage est mineur (${char.age} ans, adulte à ${C.p.adultAge}).` }
  if (td.attribution === 'Armée') {
    return { ok: false, message: `Le titre « ${titre} » s'obtient normalement par l'engagement militaire.` }
  }
  if (td.nobleSeul && !isNobleDyn(char.dynastie, C)) {
    return { ok: false, message: `Le titre « ${titre} » est en principe réservé aux nobles (${char.dynastie}).` }
  }
  // règles de genre (colonne RegleGenre du classeur : vide/Masculine/Féminine/Hérédité/Martialité)
  const cult = cultureDef(player.culture, C.config)
  if (td.regleGenre === 'Masculine' && char.sexe !== 'M') {
    return { ok: false, message: 'Ce titre est en principe réservé aux hommes.' }
  }
  if (td.regleGenre === 'Féminine' && char.sexe !== 'F') {
    return { ok: false, message: 'Ce titre est en principe réservé aux femmes.' }
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
  if (titre === C.p.titreDirigeant && pop.some((c) => c.id !== char.id && c.titre === C.p.titreDirigeant)) {
    return { ok: false, message: `Il y a déjà un ${C.p.titreDirigeant}.` }
  }
  if (titre === C.p.titreHeritierStr) {
    const dirigeant = pop.find((c) => c.titre === C.p.titreDirigeant)
    if (pop.some((c) => c.id !== char.id && c.titre === C.p.titreHeritierStr)) {
      return { ok: false, message: `Il y a déjà un ${C.p.titreHeritierStr}.` }
    }
    if (dirigeant && char.dynastie !== dirigeant.dynastie) {
      return { ok: false, message: `L'${C.p.titreHeritierStr} est en principe de la dynastie du ${C.p.titreDirigeant} (${dirigeant.dynastie}).` }
    }
  }
  if (titre === C.p.titreGouverneur) {
    const autres = pop.filter((c) => c.id !== char.id && c.titre === C.p.titreGouverneur && c.ville === char.ville)
    if (autres.length > 0) {
      return { ok: false, message: `${char.ville} a déjà un ${C.p.titreGouverneur}.` }
    }
  }
  if (titre === C.p.titreProfesseur) {
    const ville = player.villes.find((v) => v.nom === char.ville)
    const rank = ville ? schoolRankOf(ville.batiments, C.config) : 0
    const nbProfs = pop.filter((c) => c.titre === C.p.titreProfesseur && c.ville === char.ville).length
    if (rank === 0) return { ok: false, message: `${char.ville} ne possède pas d'école.` }
    if (nbProfs >= rank) {
      return { ok: false, message: `${char.ville} a déjà ${nbProfs} ${C.p.titreProfesseur}(s) pour une école de rang ${rank}.` }
    }
  }
  // conseil de Ministres indexé sur le rang de pays (échelle féodale unique) :
  // chaque rang de la table paysRangs fixe le nombre de Ministres autorisés.
  if (titre === 'Ministre') {
    const rangs = C.config.paysRangs ?? []
    const cap = rangs[rangPaysNiveau(player, C) - 1]?.ministres ?? 0
    const nbMin = pop.filter((c) => c.id !== char.id && c.titre === 'Ministre').length
    if (nbMin >= cap) {
      return {
        ok: false,
        message: `Le rang de pays ${player.rang || rangs[0]?.nom || 'de départ'} n'autorise que ${cap} Ministre(s) — montez de rang (sacre) pour agrandir votre conseil.`,
      }
    }
  }
  return { ok: true, message: `« ${titre} » attribué à ${char.prenom} ${char.nom}.` }
}

/** Liste des titres du référentiel avec contrôle de cohérence (jamais bloquant). */
export function titleCandidatesFor(state: GameState, player: Player, char: Character) {
  const C = cfgOf(state.config)
  return C.titres.map((t) => {
    const issue = validateTitleAssignment(state, player, char, t.titre)
    return { titre: t.titre, ok: issue.ok, motif: issue.ok ? '' : issue.message }
  })
}

/** Avertissements pour le titre courant d'un personnage (affichés, jamais bloquants). */
export function findTitleIssues(state: GameState, player: Player, char: Character): string[] {
  const out: string[] = []
  if (!char.titre) return out
  const C = cfgOf(state.config)
  const td = titreDef(char.titre, C.config)
  if (!td) return out
  if (char.statut !== 'Décédé') {
    const issue = validateTitleAssignment(state, player, char, char.titre)
    if (!issue.ok) out.push(issue.message)
  }
  return out
}
