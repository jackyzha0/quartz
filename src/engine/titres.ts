// ══════════════════════════════════════════════════════════════════════
//  TITRES, PROFESSEURS, MARIAGES ET ÉDUCATION
//  Professeurs, mariages, éducation des mineurs, titres automatiques et règles d'attribution.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player, PlayerRecap } from './types'
import type { Rng } from './rng'
import { cfgOf, titreDef, cultureDef, traitDef, type Cfg } from './gameData'
import { schoolRankOf } from './gameData2'
import { bump, fullName, isNobleDyn } from './shared'
import { martialiteOk } from './armees'

// ── Professeurs ─────────────────────────────────────────────────────────

export function maybeAssignProfesseurs(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const rank = schoolRankOf(ville.batiments, C.config)
    if (rank <= 0) continue
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    let nbProfs = vivants.filter((c) => c.titre === C.p.titreProfesseur).length
    if (nbProfs >= rank) continue
    // chance = professeurBaseChance / ln(profs + 2,72)
    const chance = C.p.professeurBaseChance / Math.log(nbProfs + 2.72)
    if (!rng.chance(chance)) continue
    // VBA : pas de Professeur « Obstiné » (TRAIT_NO_EDUC)
    const candidats = vivants.filter((c) => c.age >= C.p.adultAge && !c.titre && !c.traits.includes(C.p.traitObstine))
    if (candidats.length === 0) continue
    const elu = rng.pick(candidats)
    elu.titre = C.p.titreProfesseur
    if (!elu.education) elu.education = rng.pick(C.educations)
    nbProfs++
    bump(recap.titresAttribues, C.p.titreProfesseur)
    state.log.push({
      turn: state.turn + 1, type: 'Titre', joueur: p.n,
      texte: `${fullName(elu)} est promu Professeur à ${ville.nom}.`,
    })
  }
}

// ── Mariages ────────────────────────────────────────────────────────────

export function gestionMariages(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const celib = pop.filter(
    (c) => c.statut !== 'Décédé' && !c.mariage && c.age >= C.p.adultAge,
  )
  const femmes = rng.shuffle(celib.filter((c) => c.sexe === 'F'))
  const hommes = celib.filter((c) => c.sexe === 'M')
  const mariesIds = new Set<string>()
  for (const f of femmes) {
    if (f.mariage) continue
    const dispo = hommes.filter((h) => !h.mariage && !mariesIds.has(h.id))
    if (dispo.length === 0) break
    const h = rng.pick(dispo)
    const proba = computeMarriageProbability(f, h, C)
    if (!rng.chance(proba)) continue
    f.mariage = fullName(h)
    h.mariage = fullName(f)
    mariesIds.add(h.id)
    const noble = isNobleDyn(f.dynastie, C) && isNobleDyn(h.dynastie, C)
    if (noble) bump(recap.mariagesNobles, formatDynastyPair(f.dynastie, h.dynastie))
    state.log.push({
      turn: state.turn + 1, type: 'Mariage', joueur: p.n,
      texte: noble
        ? `Mariage noble : ${fullName(f)} (${f.dynastie}) épouse ${fullName(h)} (${h.dynastie}).`
        : `Mariage : ${fullName(f)} épouse ${fullName(h)}.`,
    })
  }
}

export function formatDynastyPair(d1: string, d2: string): string {
  return d1 <= d2 ? `${d1} & ${d2}` : `${d2} & ${d1}`
}

export function computeMarriageProbability(f: Character, h: Character, C: Cfg = cfgOf()): number {
  const nobleF = isNobleDyn(f.dynastie, C)
  const nobleH = isNobleDyn(h.dynastie, C)
  let score: number
  if (!nobleF && !nobleH) score = C.p.mariageRoturiers
  else if (nobleF && nobleH) score = C.p.mariageNobles
  else score = C.p.mariageMesalliance // mésalliance
  // bonus titre non-Chasseur (par époux)
  if (f.titre && f.titre !== C.p.titreChasseur) score += C.p.mariageBonusTitre
  if (h.titre && h.titre !== C.p.titreChasseur) score += C.p.mariageBonusTitre
  // mods marriage_mod des traits (bornés ±mariageTraitMax par époux)
  score += characterMarriageMod(f, C) + characterMarriageMod(h, C)
  // culture
  if (f.culture && h.culture) {
    score += f.culture.toLowerCase() === h.culture.toLowerCase()
      ? C.p.mariageMemeCulture
      : C.p.mariageAutreCulture
  }
  // écart d'âge
  score -= Math.abs(f.age - h.age) * C.p.mariageParAnEcart
  // bâtards
  const batF = f.traits.includes(C.p.traitBatard)
  const batH = h.traits.includes(C.p.traitBatard)
  if (batF) score += C.p.mariageBatard
  if (batH) score += C.p.mariageBatard
  if (batF && batH) score += C.p.mariageDeuxBatards
  if (batF && nobleF && nobleH) score += C.p.mariageBatard
  if (batH && nobleH && nobleF) score += C.p.mariageBatard
  return Math.min(C.p.mariagePlafond, Math.max(C.p.mariagePlancher, score))
}

function characterMarriageMod(c: Character, C: Cfg = cfgOf()): number {
  let total = 0
  for (const t of c.traits) {
    if (!t) continue
    const td = traitDef(t, C.config)
    if (td) total += td.marriage_mod
  }
  return Math.min(C.p.mariageTraitMax, Math.max(-C.p.mariageTraitMax, total))
}

// ── Éducation des mineurs (TryEducateMinor) ─────────────────────────────

export function tryEducateMinor(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  // VBA : le trait « Obstiné » refuse toute éducation.
  if (c.traits.includes(C.p.traitObstine)) return
  const ville = p.villes.find((v) => v.nom === c.ville)
  if (!ville) return
  const rank = schoolRankOf(ville.batiments, C.config)
  if (rank <= 0) return
  const pop = state.population[p.n] ?? []
  const profs = pop.filter((x) => x.statut !== 'Décédé' && x.ville === ville.nom && x.titre === C.p.titreProfesseur)
  if (profs.length === 0) return
  const base = isNobleDyn(c.dynastie, C) ? C.p.chanceEducNoble : C.p.chanceEducRoturier
  let chance = base * rank * (1 + C.p.profBonusEduc * (profs.length - 1))
  chance = Math.min(0.95, chance)
  if (!rng.chance(chance)) return
  const edus = new Set<string>()
  for (const prof of profs) if (prof.education) edus.add(prof.education)
  if (edus.size === 0) return
  c.education = rng.pick([...edus])
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `${fullName(c)} (${c.age} ans) reçoit une éducation ${c.education.toLowerCase()} à ${ville.nom}.`,
  })
}

// ── Titre automatique à l'âge adulte ────────────────────────────────────

export function assignAdultTitle(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  if (c.traits.includes(C.p.traitBatard)) {
    c.titre = C.p.titreChasseur
    bump(recap.titresAttribues, C.p.titreChasseur)
    return
  }
  let titre: string | null = null
  if (c.education) {
    const td = C.titres.find(
      (t) => t.attribution === 'Education' && t.education === c.education,
    )
    if (td && titreAllowedForCharacter(td.titre, c, p, C)) titre = td.titre
  }
  if (!titre) titre = C.p.titreChasseur
  c.titre = titre
  bump(recap.titresAttribues, titre)
}

export function titreAllowedForCharacter(titre: string, c: Character, p: Player, C: Cfg = cfgOf()): boolean {
  const td = titreDef(titre, C.config)
  if (!td) return false
  if (td.nobleSeul && !isNobleDyn(c.dynastie, C)) return false
  if (td.regleGenre === 'Masculine' && c.sexe !== 'M') return false
  if (td.regleGenre === 'Féminine' && c.sexe !== 'F') return false
  if (td.regleGenre === 'Hérédité' || td.regleGenre === 'Culture') {
    const cult = cultureDef(p.culture, C.config)
    if (cult) {
      if (cult.heredite === 'Masculine' && c.sexe !== 'M') return false
      if (cult.heredite === 'Féminine' && c.sexe !== 'F') return false
    }
  }
  if (td.regleGenre === 'Martialité') {
    const cult = cultureDef(p.culture, C.config)
    if (cult && !martialiteOk(cult.martialite, c.sexe)) return false
  }
  return true
}
