// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur) + MIGRATION
//  Orchestration démographique du tour : appelle les modules titres, santé, naissances, culture et journal.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf } from './gameData'
import { emptyRecap, fullName } from './shared'
import { maybeAssignProfesseurs, gestionMariages, tryEducateMinor, assignAdultTitle } from './titres'
import { computeAgeMax, tryResurrection, killCharacter, maladieStep } from './sante'
import { computeFecondite, conceptionEtNaissances } from './naissances'
import { applyCultureInfluence, updateCityCultures } from './culture'
import { writeRecap } from './journal'

// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur)
// ══════════════════════════════════════════════════════════════════════

export function populationTurn(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n]
  if (!pop) return
  const recap = emptyRecap()
  p.recap = recap

  // 3.1 Professeurs
  maybeAssignProfesseurs(state, p, rng, recap)

  // 3.2 Mariages
  gestionMariages(state, p, rng, recap)

  // 3.3 Boucle principale sur chaque vivant
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  for (const c of vivants) {
    // statut vide → Sain
    if (!c.statut) c.statut = 'Sain'
    // AgeMax par défaut : 40 + aléa(0-39) + life_delta(Trait1)
    if (!c.ageMax || c.ageMax <= 0) c.ageMax = computeAgeMax(c, rng, C)
    // vieillissement : +2 ans par tour
    c.age += 2
    // éducation des mineurs
    if (c.age < C.p.adultAge) tryEducateMinor(state, p, c, rng, recap)
    // fécondité affichée
    c.fecondite = computeFecondite(state, p, c)
    // mort de vieillesse
    if (c.age >= c.ageMax) {
      const resurrected = tryResurrection(c, rng, C)
      if (!resurrected) {
        killCharacter(state, p, c, 'vieillesse', recap)
        continue
      }
    }
    // titre automatique à l'âge adulte
    if (c.age >= C.p.adultAge && !c.titre) assignAdultTitle(state, p, c, rng, recap)
    // maladie
    maladieStep(state, p, c, rng, recap)
  }

  // 3.4 Grossesses et naissances
  conceptionEtNaissances(state, p, rng, recap)

  // 3.6 Influence culturelle
  applyCultureInfluence(state, p, rng, recap)
  updateCityCultures(state, p)

  // Migration des enfants sans éducation (MIGRATION_PROBA)
  migrerEnfants(state, p, rng)

  // Récap dans le journal
  writeRecap(state, p, recap)
}

// ── Migration des enfants sans éducation ─────────────────────────────────

export function migrerEnfants(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  if (p.villes.length <= 1) return
  const pop = state.population[p.n] ?? []
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.age >= C.p.adultAge) continue
    if (c.education) continue
    // VBA : les « Obstinés » ne migrent pas — l'éducation ne les tentera jamais.
    if (c.traits.includes(C.p.traitObstine)) continue
    if (!rng.chance(C.p.migrationProba)) continue
    const autres = p.villes.filter((v) => v.nom !== c.ville)
    if (autres.length === 0) continue
    const dest = rng.pick(autres)
    const avant = c.ville
    c.ville = dest.nom
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `${fullName(c)} quitte ${avant} pour ${dest.nom} (migration).`,
    })
  }
}
