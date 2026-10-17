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
import { invaliderIndexPopulation } from './naissances'
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
    const candidats = vivants.filter((c) => c.age >= C.p.adultAge && !c.titre && !(c.traits ?? []).includes(C.p.traitObstine))
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
  const mariesIds = new Set<string>()
  const marier = (a: Character, b: Character) => {
    invaliderIndexPopulation()
    a.mariage = fullName(b)
    b.mariage = fullName(a)
    mariesIds.add(b.id)
    const noble = isNobleDyn(a.dynastie, C) && isNobleDyn(b.dynastie, C)
    if (noble) bump(recap.mariagesNobles, formatDynastyPair(a.dynastie, b.dynastie))
    state.log.push({
      turn: state.turn + 1, type: 'Mariage', joueur: p.n,
      texte: noble
        ? `Mariage noble : ${fullName(a)} (${a.dynastie}) épouse ${fullName(b)} (${b.dynastie}).`
        : `Mariage : ${fullName(a)} épouse ${fullName(b)}.`,
    })
  }
  /** Tente de marier `a` avec un candidat libre. false = plus de candidats. */
  const tenter = (a: Character, candidats: Character[]): boolean => {
    const dispo = candidats.filter((x) => !x.mariage && !mariesIds.has(x.id))
    if (dispo.length === 0) return false
    const b = rng.pick(dispo)
    if (rng.chance(computeMarriageProbability(a, b, C))) marier(a, b)
    return true
  }
  // Passe hétérosexuelle : chaque femme célibataire avec un homme libre.
  const femmes = rng.shuffle(celib.filter((c) => c.sexe === 'F'))
  const hommes = celib.filter((c) => c.sexe === 'M')
  for (const f of femmes) {
    if (f.mariage) continue
    if (!tenter(f, hommes)) break
  }
  // Passes homosexuelles — si la culture du pays les autorise (champ
  // paramétrable du référentiel, onglet « Cultures & régimes »). Pas de
  // conception entre époux de même sexe (conceptionEtNaissances,
  // naissances.ts).
  if (cultureDef(p.culture, C.config)?.homoAutorisee) {
    for (const [sexeA, sexeB] of [['F', 'F'], ['M', 'M']] as const) {
      const premiers = rng.shuffle(celib.filter((c) => c.sexe === sexeA))
      const seconds = celib.filter((c) => c.sexe === sexeB)
      for (const a of premiers) {
        if (a.mariage) continue
        if (!tenter(a, seconds)) break
      }
    }
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
  const batF = (f.traits ?? []).includes(C.p.traitBatard)
  const batH = (h.traits ?? []).includes(C.p.traitBatard)
  if (batF) score += C.p.mariageBatard
  if (batH) score += C.p.mariageBatard
  if (batF && batH) score += C.p.mariageDeuxBatards
  if (batF && nobleF && nobleH) score += C.p.mariageBatard
  if (batH && nobleH && nobleF) score += C.p.mariageBatard
  return Math.min(C.p.mariagePlafond, Math.max(C.p.mariagePlancher, score))
}

function characterMarriageMod(c: Character, C: Cfg = cfgOf()): number {
  let total = 0
  for (const t of (c.traits ?? [])) {
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
  if ((c.traits ?? []).includes(C.p.traitObstine)) return
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
  if ((c.traits ?? []).includes(C.p.traitBatard)) {
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

// ── Titres accessibles (règle simplifiée) ────────────────────────────────

/** Titres accessibles aux habitants d'un joueur : par défaut le seul
 *  Chasseur ; UN Gouverneur par ville (nécessairement noble —
 *  l'unicité par ville et la noblesse restent contrôlées par
 *  validateTitleAssignment) ; et les titres à attribution
 *  « Education » dont l'éducation est enseignée par au moins un
 *  Professeur vivant du joueur. Dirigeant/Héritier (succession),
 *  Soldat/Commandant (armées) et Professeur (attribution automatique
 *  par ville) ne figurent pas dans la liste manuelle. */
export function titresAccessibles(state: GameState, p: Player, C: Cfg = cfgOf(state.config)): string[] {
  const out: string[] = [C.p.titreChasseur, C.p.titreGouverneur]
  // « Ministre » (refonte 2026-10-14) : nomination manuelle — le cap
  //  (nombre de Ministres = rang de pays, table paysRangs) et la règle
  //  « nobleSeul » sont contrôlés par validateTitleAssignment
  //  (avertissement affiché, jamais bloquant). Le portefeuille se
  //  choisit ensuite dans la page Population.
  out.push('Ministre')
  // « Marchand » (marqueur (t)) : attribution manuelle comme Chasseur,
  //  Gouverneur ou Ministre — le titre ouvre UNE route commerciale
  //  (engine/commerce.ts : +marchandOrTour Or pour les 2 joueurs
  //  reliés + copie d'une ressource d'un aménagement de la ville
  //  ciblée). Pas de gain par tour dans la table des titres.
  out.push('Marchand')
  const pop = state.population[p.n] ?? []
  const educations = new Set<string>()
  for (const c of pop) {
    if (c.statut !== 'Décédé' && c.titre === C.p.titreProfesseur && c.education) {
      educations.add(c.education)
    }
  }
  for (const t of C.titres) {
    if (t.attribution === 'Education' && t.education && educations.has(t.education)) {
      out.push(t.titre)
    }
  }
  return [...new Set(out)]
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

// ── Gouverneurs automatiques (marqueur (w), retour Thibaut) ──────────────

/** Gouverneur en poste dans une ville d'un joueur (vivant, titre
 *  « Gouverneur », rattaché à la ville) — null si la ville n'a pas
 *  de gouverneur. */
export function gouverneurDeVille(
  state: GameState, p: Player, ville: string, C: Cfg = cfgOf(state.config),
): Character | null {
  return (state.population[p.n] ?? []).find(
    (c) => c.statut !== 'Décédé' && c.titre === C.p.titreGouverneur && c.ville === ville,
  ) ?? null
}

/** Si une ville sans gouverneur abrite au moins un noble, le noble le
 *  plus âgé devient AUTOMATIQUEMENT gouverneur (retour Thibaut, marqueur
 *  (w) — appelé à chaque fin de tour AVANT le calcul des gains : le
 *  bonus +10 % d'impôts s'applique dès le tour de la nomination). Le
 *  Dirigeant et l'Héritier ne sont jamais choisis (leur titre
 *  commande la succession et ne se remplace pas). */
export function designerGouverneurs(state: GameState, C: Cfg = cfgOf(state.config)): void {
  for (const p of state.players) {
    const pop = state.population[p.n] ?? []
    for (const ville of p.villes) {
      if (gouverneurDeVille(state, p, ville.nom, C)) continue
      const nobles = pop.filter(
        (c) => c.statut !== 'Décédé' && c.ville === ville.nom
          && isNobleDyn(c.dynastie, C)
          && c.titre !== C.p.titreDirigeant && c.titre !== C.p.titreHeritierStr,
      )
      if (nobles.length === 0) continue
      const elu = nobles.reduce((a, b) => (b.age > a.age ? b : a))
      elu.titre = C.p.titreGouverneur
      state.log.push({
        turn: state.turn + 1, type: 'Titre', joueur: p.n,
        texte: `🏰 ${ville.nom} n'a pas de ${C.p.titreGouverneur} — ${fullName(elu)}, noble le plus âgé de la ville, prend automatiquement la charge (+10 % d'impôts sur la ville).`,
      })
    }
  }
}
