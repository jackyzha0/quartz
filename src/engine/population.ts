// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur) + MIGRATION
//  Orchestration démographique du tour : appelle les modules titres, santé, naissances, culture et journal.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, City, GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf } from './gameData'
import { emptyRecap, fullName } from './shared'
import { attraitTouristiqueVille } from './production'
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

  // 3.6bis Migration (scolarité + attrait touristique)
  migrerPopulation(state, p, rng)

  // Récap dans le journal
  writeRecap(state, p, recap)
}

// ══════════════════════════════════════════════════════════════════════
//  MIGRATION (règles étendues)
//    1. SCOLARITÉ — un enfant vivant sans éducation dont la ville n'a
//       pas de Professeur peut partir étudier ailleurs :
//         · 10 % : ville avec Professeur du MÊME joueur ;
//         · 2 % : ville avec Professeur d'un autre joueur suzerain
//           (ou suzerain du suzerain) ;
//         · 1 % : ville avec Professeur de n'importe quel joueur.
//       Les « Obstinés » ne migrent jamais (l'éducation ne les tentera
//       jamais — VBA).
//    2. ATTRACTION — 2 % par habitant vivant et par tour de déménager
//       vers une autre ville du monde, tirée pondérément par son attrait
//       touristique (Tourisme / tour de la ville) ; le conjoint et les
//       enfants mineurs suivent. Les soldats (armée) ne migrent pas.
//  Un personnage qui change de joueur est physiquement déplacé dans le
//  tableau de population de son nouveau joueur.
// ══════════════════════════════════════════════════════════════════════

/** Cible de migration : une ville, chez un joueur donné. */
interface CibleVille { joueur: Player; ville: City }

/**
 * Villes d'un joueur abritant au moins un Professeur vivant.
 * OPTIMISATION 2026-10-16 : cache par état (invalidé quand l'état
 *  change) — l'ancien pop.some() scannait toute la population du
 *  joueur pour CHAQUE appel, lui-même fait par migrant.
 */
let cacheVillesProfState: { state: object; parJoueur: Map<number, Set<string>> } | null = null
function villesAvecProfesseur(state: GameState, joueur: Player): City[] {
  const C = cfgOf(state.config)
  if (!cacheVillesProfState || cacheVillesProfState.state !== state) {
    const parJoueur = new Map<number, Set<string>>()
    for (const [nStr, liste] of Object.entries(state.population ?? {})) {
      const n = Number(nStr)
      const villes = new Set<string>()
      for (const c of liste ?? []) {
        if (c.statut !== 'Décédé' && c.titre === C.p.titreProfesseur) villes.add(c.ville)
      }
      parJoueur.set(n, villes)
    }
    cacheVillesProfState = { state, parJoueur }
  }
  const villes = cacheVillesProfState.parJoueur.get(joueur.n) ?? new Set<string>()
  return joueur.villes.filter((v) => villes.has(v.nom))
}

export function migrerPopulation(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  /** personnages déjà déplacés ce tour (pas de double migration) */
  const deplaces = new Set<string>()

  /** Déplace c (appartenant au joueur n° srcN) vers la ville de dest. */
  const migrer = (c: Character, srcN: number, dest: CibleVille, motif: string) => {
    if (dest.joueur.n !== srcN) {
      const src = state.population[srcN] ?? []
      const i = src.indexOf(c)
      if (i >= 0) src.splice(i, 1)
      const dst = state.population[dest.joueur.n] ?? (state.population[dest.joueur.n] = [])
      dst.push(c)
    }
    const avant = c.ville
    c.ville = dest.ville.nom
    deplaces.add(c.id)
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: srcN,
      texte: dest.joueur.n === srcN
        ? `${fullName(c)} quitte ${avant} pour ${dest.ville.nom} (${motif}).`
        : `${fullName(c)} quitte ${avant} pour ${dest.ville.nom} chez ${dest.joueur.nom} (${motif}).`,
    })
  }

  // ── 1. Migration scolaire des enfants ─────────────────────────────────
  const profsChezMoi = villesAvecProfesseur(state, p)
  const chezMoiAutres = profsChezMoi.map((v) => ({ joueur: p, ville: v }))
  const suzerain1 = p.vassalDe != null && p.vassalDe !== p.n
    ? state.players.find((x) => x.n === p.vassalDe) : undefined
  const suzerain2 = suzerain1?.vassalDe != null && suzerain1.vassalDe !== p.n
    ? state.players.find((x) => x.n === suzerain1.vassalDe) : undefined
  const chezSuzerains = [suzerain1, suzerain2]
    .filter((s): s is Player => !!s)
    .flatMap((s) => villesAvecProfesseur(state, s).map((v) => ({ joueur: s, ville: v })))
  const chezLeMonde = state.players
    .filter((q) => q.n !== p.n)
    .flatMap((q) => villesAvecProfesseur(state, q).map((v) => ({ joueur: q, ville: v })))

  for (const c of [...pop]) {
    if (c.statut === 'Décédé' || c.age >= C.p.adultAge) continue
    if (c.education) continue
    // VBA : les « Obstinés » ne migrent pas — l'éducation ne les tentera jamais.
    if (c.traits.includes(C.p.traitObstine)) continue
    if (deplaces.has(c.id)) continue
    // un Professeur dans SA ville → pas de migration scolaire
    if (profsChezMoi.some((v) => v.nom === c.ville)) continue
    const ciblesMemeJoueur = chezMoiAutres.filter((t) => t.ville.nom !== c.ville)
    if (ciblesMemeJoueur.length > 0 && rng.chance(C.p.migrationEcole)) {
      migrer(c, p.n, rng.pick(ciblesMemeJoueur), 'scolarité — rejoint un Professeur')
      continue
    }
    const ciblesSuzerain = chezSuzerains.filter((t) => t.ville.nom !== c.ville)
    if (ciblesSuzerain.length > 0 && rng.chance(C.p.migrationSuzerain)) {
      migrer(c, p.n, rng.pick(ciblesSuzerain), 'scolarité — Professeur du suzerain')
      continue
    }
    const ciblesMonde = [...ciblesMemeJoueur, ...chezLeMonde]
    if (ciblesMonde.length > 0 && rng.chance(C.p.migrationMonde)) {
      migrer(c, p.n, rng.pick(ciblesMonde), 'scolarité — Professeur')
    }
  }

  // ── 2. Migration par attrait touristique (tous les habitants) ────────
  const cibles: { cible: CibleVille; attrait: number }[] = []
  for (const q of state.players) {
    for (const v of q.villes) {
      const a = attraitTouristiqueVille(state, q, v, C)
      if (a > 0) cibles.push({ cible: { joueur: q, ville: v }, attrait: a })
    }
  }
  if (cibles.length === 0) return

  /** OPTIMISATION 2026-10-16 : index id→joueur et nom→personnages
   *  construits UNE fois (la famille d'un migrant était recherchée
   *  dans toutes les populations du monde à CHAQUE migrant : O(N²)
   *  à 16 000 personnages). */
  const proprietaireParId = new Map<string, number>()
  const vivantsParNom = new Map<string, Character[]>()
  const mineursParParent = new Map<string, Character[]>()
  for (const q of state.players) {
    for (const x of state.population[q.n] ?? []) {
      proprietaireParId.set(x.id, q.n)
      if (x.statut === 'Décédé') continue
      const nom = fullName(x)
      const lst = vivantsParNom.get(nom)
      if (lst) lst.push(x)
      else vivantsParNom.set(nom, [x])
      if (x.age < C.p.adultAge && !x.armee) {
        for (const parent of [x.mere, x.pere]) {
          if (!parent) continue
          const l2 = mineursParParent.get(parent)
          if (l2) l2.push(x)
          else mineursParParent.set(parent, [x])
        }
      }
    }
  }
  for (const c of [...pop]) {
    if (c.statut === 'Décédé' || deplaces.has(c.id)) continue
    if (c.armee) continue // les soldats ne déménagent pas
    if (!rng.chance(C.p.migrationTourisme)) continue
    const dispo = cibles.filter((t) => !(t.cible.joueur.n === p.n && t.cible.ville.nom === c.ville))
    if (dispo.length === 0) continue
    const dest = rng.pickWeighted(dispo, (t) => t.attrait)
    migrer(c, p.n, dest.cible, 'attrait touristique')
    // le conjoint et les enfants mineurs suivent (via index)
    const nomComplet = fullName(c)
    const famille: Character[] = []
    if (c.mariage) {
      for (const x of vivantsParNom.get(c.mariage) ?? []) {
        if (deplaces.has(x.id) || x.id === c.id || x.armee) continue
        famille.push(x)
      }
    }
    for (const x of mineursParParent.get(nomComplet) ?? []) {
      if (deplaces.has(x.id) || x.id === c.id || famille.includes(x)) continue
      famille.push(x)
    }
    for (const x of famille) {
      const srcN = proprietaireParId.get(x.id)
      if (srcN == null) continue
      migrer(x, srcN, dest.cible, `accompagne ${nomComplet} — attrait touristique`)
    }
  }
}
