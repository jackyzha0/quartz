// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — MOTEUR DE JEU
//  Portage TypeScript des macros VBA :
//    · PersonnagesPourJoueur (moteur de population)
//    · FinDeTour (ressources, saisons, événements, dynasties)
//    · CalculerGainsPopulation (gains par ville : titres, taxes, conso)
//    · RecruitForArmies (armées)
//  Un tour = 2 ans de jeu.
// ══════════════════════════════════════════════════════════════════════

import type {
  Character, City, GameState, Player, PlayerRecap, LogEntry,
} from './types'
import type { Rng } from './rng'
import { makeRng } from './rng'
import {
  RESOURCES, TITRES, TRAITS, ORIENTATIONS, CULTURES, PEUPLES,
  titreDef, traitDef, cultureDef, peupleDef,
} from './gameData'
import { EVENTS, DYNASTIES, BUILDINGS, buildingDef, schoolRankOf } from './gameData2'
import { checkVictory } from './victory'
import { findTitleIssues, titleCandidatesFor } from './validation'

// ── Constantes (issues mot pour mot du module VBA « Personnages ») ─────
export const ADULT_AGE = 16
export const ADULTERY_RATE = 0.03
export const TRAIT_BASTARD = 'Bâtard'
export const TRAIT_INBRED = 'Consanguin'
export const TITRE_DIRIGEANT = 'Dirigeant'
export const TITRE_GOUVERNEUR = 'Gouverneur'
export const TITRE_HERITIER = 'Héritier'
export const TITRE_PROFESSEUR = 'Professeur'
export const TITRE_CHASSEUR = 'Chasseur'
export const CHANCE_EDUC_ROTURIER = 0.08
export const CHANCE_EDUC_NOBLE = 0.15
export const PROFESSEUR_BASE_CHANCE = 0.9
export const PROF_BONUS_EDUC = 0.1
export const PROBA_MALADIE = 0.0005
export const MOD_MALADIE_AGE = 0.0001
export const MOD_MALADIE_ENCEINTE = 0.03
export const PROBA_GUERISON = 0.25
export const MOD_GUERISON_AGE = 0.003
export const FERT_BASE_RATE = 1.5
export const FERT_SINGLE_FACTOR = 0.1
export const FERT_TWINS_RATE = 0.05
export const FERT_TRIPLETS_RATE = 0.001
export const FERT_TRAIT_FACTOR_MIN = 0
export const FERT_TRAIT_FACTOR_MAX = 1.6
export const MIGRATION_PROBA = 0.1
export const CONSO_NOURR_PAR_HAB = 1
export const GAINS_CREDITE_STOCK = true
export const PUISSANCE_GENERAL = 45
export const PUISSANCE_SOLDAT = 15
export const SOLDAT_AGE_MIN = 16
export const SOLDAT_AGE_MAX = 30
export const MAX_LOG = 4000

export const TAX_OR_FAIBLES = 0.5
export const TAX_OR_HAUTES = 1.5
export const TAX_NAISS_FAIBLES = 1.5
export const TAX_NAISS_HAUTES = 0.5

export const EDU_AGRICOLE = 'Agricole'
export const EDU_SCIENTIFIQUE = 'Scientifique'
export const EDU_MILITAIRE = 'Militaire'
export const EDU_ECONOMIQUE = 'Économique'
export const EDU_MEDICALE = 'Médicale'
export const EDU_CULTURELLE = 'Culturelle'
export const ALL_EDUCATIONS = [
  EDU_AGRICOLE, EDU_SCIENTIFIQUE, EDU_MILITAIRE,
  EDU_ECONOMIQUE, EDU_MEDICALE, EDU_CULTURELLE,
]

// ── Utilitaires ─────────────────────────────────────────────────────────
let idCounter = 0
export function newId(rng: Rng): string {
  return `c${Date.now().toString(36)}${(idCounter++).toString(36)}${rng.int(100, 999)}`
}

export function isNobleDyn(dyn: string): boolean {
  const d = dyn.trim()
  return d !== '' && d !== 'Roturier'
}

export function fullName(c: Character): string {
  return `${c.prenom} ${c.nom}`
}

function emptyRecap(): PlayerRecap {
  return {
    conceptions: {}, naissances: {}, deces: {}, decesMaladie: 0,
    mariagesNobles: {}, conversions: {}, titresAttribues: {}, crises: [],
    commandantTombe: null,
  }
}

function bump(dict: Record<string, number>, key: string, n = 1) {
  if (!key) key = '(inconnu)'
  dict[key] = (dict[key] ?? 0) + n
}

// ══════════════════════════════════════════════════════════════════════
//  FIN DE TOUR — point d'entrée principal
// ══════════════════════════════════════════════════════════════════════

export function runTurn(state: GameState): GameState {
  const rng = makeRng(state.rngState)
  const turnBefore = state.turn
  const newSaison = saisonForTurn(turnBefore + 1)

  // 1. Événement de saison (si la saison change au tour qui commence)
  if (newSaison !== state.saison) {
    const ev = rng.pickWeighted(
      EVENTS.filter((e) => e.saison === newSaison),
      (e) => e.poids,
    )
    const danger = rng.die(6) + state.modDanger
    const level = danger <= 5 ? 'faible' : danger <= 8 ? 'moyenne' : danger <= 10 ? 'forte' : 'extreme'
    const texte = ev[level as 'faible' | 'moyenne' | 'forte' | 'extreme']
    state.log.push({
      turn: turnBefore + 1, type: 'Événement', joueur: null,
      texte: `【${newSaison}】 ${ev.nom} (danger ${danger}/6) : ${texte}`,
    })
    applyEventEffect(state, ev.nom, level)
    state.saison = newSaison
  }

  // 2. Carte dynastie pour chaque joueur (TirerDynastie)
  for (const p of state.players) {
    const card = rng.pick(DYNASTIES)
    p.dynastie = { nom: card.nom, description: card.description }
    state.log.push({
      turn: turnBefore + 1, type: 'Dynastie', joueur: p.n,
      texte: `${p.nom} — Dynastie « ${card.nom} » : ${card.description}`,
    })
    applyDynastieCard(state, p, card.nom, rng)
  }

  // 3. Boucle par joueur : gains de population puis production
  for (const p of state.players) {
    const gains = calculerGainsPopulation(state, p, rng)
    // production : stock += prod (lignes 18-28 des J{n})
    for (const r of RESOURCES) {
      const rs = p.resources[r]
      if (!rs) continue
      rs.stock += rs.prod
    }
    if (state.saison === 'Été') {
      // bonus Nourr - été
      const rs = p.resources['Nourriture']
      if (rs) rs.stock += rs.prod
    }
    // gains de population crédités au stock (GAINS_CREDITE_STOCK = True)
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v
    }
  }

  // 4. Moteur de population (PersonnagesPourJoueur) pour chaque joueur
  for (const p of state.players) {
    populationTurn(state, p, rng)
  }

  // 5. Armées (RecruitForArmies)
  for (const p of state.players) {
    recruitForArmies(state, p, rng)
  }

  // 6. Snapshot (SnapshotRessources → _Historique)
  snapshotRessources(state, turnBefore + 1)

  // 7. Tour suivant
  state.turn = turnBefore + 1
  if (state.log.length > MAX_LOG) {
    state.log = state.log.slice(state.log.length - MAX_LOG)
  }
  state.rngState = rng.state()
  return state
}

export function saisonForTurn(turn: number): 'Été' | 'Hiver' {
  return Math.floor(turn / 3) % 2 === 0 ? 'Été' : 'Hiver'
}

/** Effets chiffrés simplifiés des événements seed (annexe III du livret). */
function applyEventEffect(state: GameState, nom: string, level: 'faible' | 'moyenne' | 'forte' | 'extreme') {
  const mult = { faible: 1, moyenne: 2, forte: 3, extreme: 5 }[level]
  const add = (res: string, v: number) => {
    for (const p of state.players) {
      const rs = p.resources[res]
      if (rs) rs.stock += v
    }
  }
  if (nom === 'Terres fertiles') add('Nourriture', 10 * mult)
  else if (nom === 'Récoltes abondantes' || nom === 'Chasse d\'hiver' || nom === 'Bonne pêche') add('Nourriture', [10, 25, 40, 60][level === 'faible' ? 0 : level === 'moyenne' ? 1 : level === 'forte' ? 2 : 3])
  else if (nom === 'Sécheresse' || nom === 'Gel des récoltes' || nom === 'Tempête de neige') add('Nourriture', -10 * mult)
  else if (nom === 'Fête du soleil' || nom === 'Fête du solstice' || nom === 'Ambassade lointaine') {
    add('Tourisme', 5 * mult)
    add('Or', 2 * mult)
  }
  else if (nom === 'Explosion volcanique') { add('Nourriture', -5 * mult); add('Bois', -2 * mult) }
  else if (nom === 'Razzia de brigands') add('Or', -2 * mult)
  else if (nom === 'Loups en maraude') add('Bétail', -2 * mult)
  // Épidémie : gérée via risque de maladie supplémentaire ce tour
  if (nom === 'Épidémie' || nom === 'Épidémie d\'hiver') {
    const risk = { faible: 0.05, moyenne: 0.1, forte: 0.15, extreme: 0.25 }[level]
    for (const p of state.players) {
      const pop = state.population[p.n] ?? []
      for (const c of pop) {
        if (c.statut === 'Sain') {
          const r2 = makeRng(state.rngState ^ (hash(c.id) & 0xffff))
          if (r2.chance(risk)) c.statut = 'Malade'
          state.rngState = r2.state()
        }
      }
    }
  }
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function applyDynastieCard(state: GameState, p: Player, nom: string, rng: Rng) {
  const or = p.resources['Or']
  const nourr = p.resources['Nourriture']
  const tour = p.resources['Tourisme']
  switch (nom) {
    case 'Étoile montante': if (or) or.stock += 10; break
    case 'Union providentielle': if (or) or.stock += 20; break
    case 'Trésor oublié': if (or) or.stock += 25; break
    case 'Ère de prospérité':
      if (or) or.stock += 15; if (nourr) nourr.stock += 15; if (tour) tour.stock += 10
      break
    case 'Disgrâce': if (or) or.stock -= 15; if (tour) tour.stock -= 10; break
    case 'Famine dynastique': if (nourr) nourr.stock -= 10; if (or) or.stock -= 5; break
    case 'Sang nouveau': {
      const hab = p.resources['Habitants']
      if (hab) hab.stock += 5
      break
    }
    case 'Guerre de succession lointaine': {
      const g = p.resources['Garnison']
      if (g) g.stock += 5
      break
    }
    default: break // Oracle, Héritage contesté, Anoblissement, Prophétie : effets narratifs
  }
}

// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Titres → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par les
//  taxes de la ville, puis consommation de 1 Nourriture par habitant vivant.
// ══════════════════════════════════════════════════════════════════════

export function calculerGainsPopulation(state: GameState, p: Player, rng: Rng): Record<string, number> {
  const totals: Record<string, number> = {}
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const cityGains: Record<string, number> = {}
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    for (const c of vivants) {
      if (!c.titre) continue
      const td = titreDef(c.titre)
      if (!td) continue
      if (td.ressource1 && td.valeur1 !== 0) {
        cityGains[td.ressource1] = (cityGains[td.ressource1] ?? 0) + td.valeur1
      }
      if (td.ressource2 && td.valeur2 !== 0) {
        cityGains[td.ressource2] = (cityGains[td.ressource2] ?? 0) + td.valeur2
      }
    }
    // Taxes : Faible → Or ×0,5 / Forte → Or ×1,5 (l'inverse pour la Nourriture)
    const taxOr = ville.taxes === 'Faible' ? TAX_OR_FAIBLES : ville.taxes === 'Forte' ? TAX_OR_HAUTES : 1
    const taxNourr = ville.taxes === 'Faible' ? TAX_OR_HAUTES : ville.taxes === 'Forte' ? TAX_OR_FAIBLES : 1
    if (cityGains['Or']) cityGains['Or'] *= taxOr
    if (cityGains['Nourriture']) cityGains['Nourriture'] *= taxNourr
    // Consommation (non taxée, appliquée après)
    cityGains['Nourriture'] = (cityGains['Nourriture'] ?? 0) - CONSO_NOURR_PAR_HAB * vivants.length
    for (const [res, v] of Object.entries(cityGains)) {
      totals[res] = (totals[res] ?? 0) + v
    }
  }
  return totals
}

/** Facteur de taxes sur la conception (Faible ×1,5 / Moyenne ×1 / Forte ×0,5). */
export function taxBirthFactor(ville: City | undefined): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? TAX_NAISS_FAIBLES : ville.taxes === 'Forte' ? TAX_NAISS_HAUTES : 1
}

// ══════════════════════════════════════════════════════════════════════
//  MOTEUR DE POPULATION (PersonnagesPourJoueur)
// ══════════════════════════════════════════════════════════════════════

export function populationTurn(state: GameState, p: Player, rng: Rng) {
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
    if (!c.ageMax || c.ageMax <= 0) c.ageMax = computeAgeMax(c, rng)
    // vieillissement : +2 ans par tour
    c.age += 2
    // éducation des mineurs
    if (c.age < ADULT_AGE) tryEducateMinor(state, p, c, rng, recap)
    // fécondité affichée
    c.fecondite = computeFecondite(state, p, c)
    // mort de vieillesse
    if (c.age >= c.ageMax) {
      const resurrected = tryResurrection(c, rng)
      if (!resurrected) {
        killCharacter(state, p, c, 'vieillesse', recap)
        continue
      }
    }
    // titre automatique à l'âge adulte
    if (c.age >= ADULT_AGE && !c.titre) assignAdultTitle(state, p, c, rng, recap)
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

export function computeAgeMax(c: Character, rng: Rng): number {
  const t1 = traitDef(c.traits[0])
  const delta = t1 ? t1.life_delta : 0
  return 40 + rng.int(0, 39) + delta
}

function tryResurrection(c: Character, rng: Rng): boolean {
  const t1 = traitDef(c.traits[0])
  const seuil = t1 ? t1.resurrection_min_roll : 0
  if (seuil > 0 && rng.die(6) >= seuil) {
    c.ageMax += rng.die(6) + rng.die(6)
    return true
  }
  return false
}

// ── Professeurs ─────────────────────────────────────────────────────────

export function maybeAssignProfesseurs(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const rank = schoolRankOf(ville.batiments)
    if (rank <= 0) continue
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    let nbProfs = vivants.filter((c) => c.titre === TITRE_PROFESSEUR).length
    if (nbProfs >= rank) continue
    // chance = 0,9 / ln(profs + 2,72)
    const chance = PROFESSEUR_BASE_CHANCE / Math.log(nbProfs + 2.72)
    if (!rng.chance(chance)) continue
    const candidats = vivants.filter((c) => c.age >= ADULT_AGE && !c.titre)
    if (candidats.length === 0) continue
    const elu = rng.pick(candidats)
    elu.titre = TITRE_PROFESSEUR
    if (!elu.education) elu.education = rng.pick(ALL_EDUCATIONS)
    nbProfs++
    bump(recap.titresAttribues, TITRE_PROFESSEUR)
    state.log.push({
      turn: state.turn + 1, type: 'Titre', joueur: p.n,
      texte: `${fullName(elu)} est promu Professeur à ${ville.nom}.`,
    })
  }
}

// ── Mariages ────────────────────────────────────────────────────────────

export function gestionMariages(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []
  const celib = pop.filter(
    (c) => c.statut !== 'Décédé' && !c.mariage && c.age >= ADULT_AGE,
  )
  const femmes = rng.shuffle(celib.filter((c) => c.sexe === 'F'))
  const hommes = celib.filter((c) => c.sexe === 'M')
  const mariesIds = new Set<string>()
  for (const f of femmes) {
    if (f.mariage) continue
    const dispo = hommes.filter((h) => !h.mariage && !mariesIds.has(h.id))
    if (dispo.length === 0) break
    const h = rng.pick(dispo)
    const proba = computeMarriageProbability(f, h)
    if (!rng.chance(proba)) continue
    f.mariage = fullName(h)
    h.mariage = fullName(f)
    mariesIds.add(h.id)
    const noble = isNobleDyn(f.dynastie) && isNobleDyn(h.dynastie)
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

export function computeMarriageProbability(f: Character, h: Character): number {
  const nobleF = isNobleDyn(f.dynastie)
  const nobleH = isNobleDyn(h.dynastie)
  let score: number
  if (!nobleF && !nobleH) score = 0.3
  else if (nobleF && nobleH) score = 0.15
  else score = 0.03 // mésalliance
  // bonus titre non-Chasseur (par époux)
  if (f.titre && f.titre !== TITRE_CHASSEUR) score += 0.1
  if (h.titre && h.titre !== TITRE_CHASSEUR) score += 0.1
  // mods marriage_mod des traits (bornés ±0,20 par époux)
  score += characterMarriageMod(f) + characterMarriageMod(h)
  // culture
  if (f.culture && h.culture) {
    score += f.culture.toLowerCase() === h.culture.toLowerCase() ? 0.1 : -0.1
  }
  // écart d'âge
  score -= Math.abs(f.age - h.age) * 0.005
  // bâtards
  const batF = f.traits.includes(TRAIT_BASTARD)
  const batH = h.traits.includes(TRAIT_BASTARD)
  if (batF) score -= 0.05
  if (batH) score -= 0.05
  if (batF && batH) score += 0.1
  if (batF && nobleF && nobleH) score -= 0.05
  if (batH && nobleH && nobleF) score -= 0.05
  return Math.min(0.9, Math.max(0.01, score))
}

function characterMarriageMod(c: Character): number {
  let total = 0
  for (const t of c.traits) {
    if (!t) continue
    const td = traitDef(t)
    if (td) total += td.marriage_mod
  }
  return Math.min(0.2, Math.max(-0.2, total))
}

// ── Éducation des mineurs (TryEducateMinor) ─────────────────────────────

export function tryEducateMinor(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  const ville = p.villes.find((v) => v.nom === c.ville)
  if (!ville) return
  const rank = schoolRankOf(ville.batiments)
  if (rank <= 0) return
  const pop = state.population[p.n] ?? []
  const profs = pop.filter((x) => x.statut !== 'Décédé' && x.ville === ville.nom && x.titre === TITRE_PROFESSEUR)
  if (profs.length === 0) return
  const base = isNobleDyn(c.dynastie) ? CHANCE_EDUC_NOBLE : CHANCE_EDUC_ROTURIER
  let chance = base * rank * (1 + PROF_BONUS_EDUC * (profs.length - 1))
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
  if (c.traits.includes(TRAIT_BASTARD)) {
    c.titre = TITRE_CHASSEUR
    bump(recap.titresAttribues, TITRE_CHASSEUR)
    return
  }
  let titre: string | null = null
  if (c.education) {
    const td = TITRES.find(
      (t) => t.attribution === 'Education' && t.education === c.education,
    )
    if (td && titreAllowedForCharacter(td.titre, c, p)) titre = td.titre
  }
  if (!titre) titre = TITRE_CHASSEUR
  c.titre = titre
  bump(recap.titresAttribues, titre)
}

export function titreAllowedForCharacter(titre: string, c: Character, p: Player): boolean {
  const td = titreDef(titre)
  if (!td) return false
  if (td.nobleSeul && !isNobleDyn(c.dynastie)) return false
  if (td.regleGenre === 'Masculine' && c.sexe !== 'M') return false
  if (td.regleGenre === 'Féminine' && c.sexe !== 'F') return false
  if (td.regleGenre === 'Culture') {
    const cult = cultureDef(p.culture)
    if (cult) {
      if (cult.heredite === 'Masculine' && c.sexe !== 'M') return false
      if (cult.heredite === 'Féminine' && c.sexe !== 'F') return false
    }
  }
  return true
}

// ── Maladie ──────────────────────────────────────────────────────────────

function maladieStep(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  if (c.statut === 'Décédé') return
  const ville = p.villes.find((v) => v.nom === c.ville)
  const batiments = ville ? ville.batiments : []
  const guildeGlobal = p.villes.some((v) => v.batiments.includes('Guilde des Médecins'))
  let contractMod = 0
  let cureMod = guildeGlobal ? 0.1 : 0
  for (const b of batiments) {
    const bd = buildingDef(b)
    if (bd) {
      contractMod += bd.malContraction
      cureMod += bd.bonusGuerison
    }
  }
  if (c.statut === 'Sain' || c.statut === 'Enceinte') {
    let pContract = PROBA_MALADIE + MOD_MALADIE_AGE * c.age + contractMod
    if (c.statut === 'Enceinte') pContract += MOD_MALADIE_ENCEINTE
    if (rng.chance(Math.max(0, pContract))) {
      if (c.statut === 'Enceinte') {
        // une femme enceinte qui tombe malade perd la grossesse
        c.statut = 'Malade'
        c.pereBio = null
        state.log.push({
          turn: state.turn + 1, type: 'Naissance', joueur: p.n,
          texte: `${fullName(c)} perd sa grossesse suite à la maladie.`,
        })
      } else {
        c.statut = 'Malade'
      }
    }
  } else if (c.statut === 'Malade') {
    // un malade qui re-contracte la maladie meurt
    if (rng.chance(Math.max(0, PROBA_MALADIE + MOD_MALADIE_AGE * c.age + contractMod))) {
      killCharacter(state, p, c, 'maladie', recap)
      return
    }
    const pCure = PROBA_GUERISON - MOD_GUERISON_AGE * c.age + cureMod
    if (rng.chance(Math.max(0, pCure))) c.statut = 'Sain'
  }
}

// ── Décès ────────────────────────────────────────────────────────────────

export function killCharacter(state: GameState, p: Player, c: Character, cause: 'vieillesse' | 'maladie', recap: PlayerRecap) {
  c.statut = 'Décédé'
  // libérer le conjoint
  const pop = state.population[p.n] ?? []
  if (c.mariage) {
    const conjoint = pop.find((x) => x.mariage === fullName(c))
    if (conjoint) conjoint.mariage = null
  }
  bump(recap.deces, c.dynastie)
  if (cause === 'maladie') recap.decesMaladie++
  state.log.push({
    turn: state.turn + 1, type: 'Décès', joueur: p.n,
    texte: `${fullName(c)} (${c.age} ans, ${c.dynastie}${c.titre ? `, ${c.titre}` : ''}) meurt de ${cause === 'maladie' ? 'la maladie' : 'vieillesse'}.`,
  })
  // succession si Dirigeant
  if (c.titre === TITRE_DIRIGEANT) {
    handleDirigeantSuccession(state, p, c, recap)
  }
}

export function handleDirigeantSuccession(state: GameState, p: Player, defunt: Character, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []
  const heritier = pop.find(
    (c) => c.statut !== 'Décédé' && c.titre === TITRE_HERITIER,
  )
  if (heritier) {
    heritier.titre = TITRE_DIRIGEANT
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `${p.nom} : ${fullName(heritier)} (${heritier.dynastie}) succède à ${fullName(defunt)} comme Dirigeant.`,
    })
    return
  }
  const nobles = pop.filter(
    (c) => c.statut !== 'Décédé' && c.age >= ADULT_AGE && isNobleDyn(c.dynastie) && c.titre !== 'Soldat' && c.titre !== 'Commandant',
  )
  const rng = makeRng(state.rngState)
  const eligibles = nobles.filter((c) => titreAllowedForCharacter(TITRE_DIRIGEANT, c, p))
  if (eligibles.length > 0) {
    const elu = rng.pick(eligibles)
    elu.titre = TITRE_DIRIGEANT
    state.rngState = rng.state()
    recap.crises.push('CRISE DE SUCCESSION')
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `CRISE DE SUCCESSION — ${p.nom} : le noble ${fullName(elu)} (${elu.dynastie}) est promu Dirigeant.`,
    })
    return
  }
  recap.crises.push('CRISE MAJEURE : poste de Dirigeant vacant')
  state.log.push({
    turn: state.turn + 1, type: 'Crise', joueur: p.n,
    texte: `CRISE MAJEURE — ${p.nom} : aucun héritier ni noble disponible, le poste de Dirigeant est vacant !`,
  })
}

// ── Fécondité (affichée) ─────────────────────────────────────────────────

export function computeFecondite(state: GameState, p: Player, c: Character): number {
  if (c.statut === 'Décédé' || c.age < ADULT_AGE) return 0
  if (c.sexe === 'F') {
    return femaleAgeFactor(c.age) * cultureFertFactor(p.culture) * orientationFertFactor(c.orientation)
  }
  return maleAgeFactor(c.age) * orientationFertFactor(c.orientation)
}

export function femaleAgeFactor(age: number): number {
  if (age < 16) return 0
  if (age <= 25) return 1.0
  if (age <= 30) return 0.9
  if (age <= 35) return 0.8
  if (age <= 40) return 0.7
  if (age <= 44) return 0.4
  if (age <= 49) return 0.1
  if (age <= 99) return 0.02
  return 0
}

export function maleAgeFactor(age: number): number {
  if (age < 16) return 0
  return Math.max(0, 1 - (0.5 * (age - 16)) / 42)
}

export function orientationFertFactor(orientation: string): number {
  const o = orientation.toLowerCase()
  return o.includes('homo') || o.includes('asex') ? 0.7 : 1
}

function cultureFertFactor(culture: string): number {
  const c = cultureDef(culture)
  return c ? c.fertFactor : 1
}

function traitsFertFactor(a: Character, b: Character | null): number {
  let sum = 0
  for (const t of a.traits) {
    const td = t ? traitDef(t) : undefined
    if (td) sum += td.fert_add
  }
  if (b) {
    for (const t of b.traits) {
      const td = t ? traitDef(t) : undefined
      if (td) sum += td.fert_add
    }
  }
  return Math.min(FERT_TRAIT_FACTOR_MAX, Math.max(FERT_TRAIT_FACTOR_MIN, 1 + sum))
}

// ── Conception et naissances ─────────────────────────────────────────────

export function conceptionEtNaissances(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []

  // 1. Naissances des femmes enceintes depuis le tour précédent
  for (const mere of pop) {
    if (mere.statut !== 'Enceinte') continue
    const pereBioName = mere.pereBio
    const pere = pereBioName ? pop.find((x) => fullName(x) === pereBioName) : undefined
    accoucher(state, p, mere, pere, rng, recap)
    mere.statut = 'Sain'
    mere.pereBio = null
  }

  // 2. Tentatives de conception (femmes adultes saines)
  for (const mere of pop) {
    if (mere.sexe !== 'F' || mere.statut !== 'Sain') continue
    if (mere.age < ADULT_AGE) continue
    const ville = p.villes.find((v) => v.nom === mere.ville)
    const mari = mere.mariage ? pop.find((x) => fullName(x) === mere.mariage && x.statut !== 'Décédé') : undefined
    const factorMari = mari ? maleAgeFactor(mari.age) * orientationFertFactor(mari.orientation) : FERT_SINGLE_FACTOR
    let proba = FERT_BASE_RATE
    proba *= femaleAgeFactor(mere.age)
    proba *= factorMari
    proba *= traitsFertFactor(mere, mari ?? null)
    proba *= cultureFertFactor(p.culture)
    proba *= orientationFertFactor(mere.orientation)
    proba *= taxBirthFactor(ville)
    if (rng.chance(proba)) {
      let pereBio: Character | undefined
      let batard = false
      if (mari) {
        if (rng.chance(ADULTERY_RATE)) {
          // adultère : amant aléatoire
          const amants = pop.filter(
            (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= ADULT_AGE && x.id !== mari.id,
          )
          pereBio = amants.length > 0 ? rng.pick(amants) : undefined
          batard = true
        } else {
          pereBio = mari
        }
      } else {
        // célibataire : amant aléatoire, enfant bâtard
        const amants = pop.filter(
          (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= ADULT_AGE,
        )
        pereBio = amants.length > 0 ? rng.pick(amants) : undefined
        batard = true
      }
      mere.statut = 'Enceinte'
      mere.pereBio = pereBio ? fullName(pereBio) : null
      mere.enfantBatard = batard
      bump(recap.conceptions, mere.dynastie)
      state.log.push({
        turn: state.turn + 1, type: 'Naissance', joueur: p.n,
        texte: `${fullName(mere)} attend un enfant${batard ? ' (bâtard)' : ''}.`,
      })
    }
  }
}

function accoucher(state: GameState, p: Player, mere: Character, pere: Character | undefined, rng: Rng, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []
  // nombre d'enfants
  const r = rng.next()
  const nb = r < FERT_TRIPLETS_RATE ? 3 : r < FERT_TRIPLETS_RATE + FERT_TWINS_RATE ? 2 : 1
  const batard = mere.enfantBatard
  const consanguin = isConsanguineous(mere, pere)
  for (let i = 0; i < nb; i++) {
    const enfant: Character = {
      id: newId(rng),
      nom: mere.nom,
      prenom: pickName(state, p, rng, undefined),
      dynastie: computeBabyDynasty(state, p, mere, pere, batard, rng),
      sexe: rng.chance(0.5) ? 'M' : 'F',
      age: 0,
      culture: mere.culture,
      ville: mere.ville,
      orientation: rng.pickWeighted(ORIENTATIONS, (o) => o.poids).nom as Character['orientation'],
      traits: ['', '', ''],
      statut: 'Sain',
      mariage: null,
      mere: fullName(mere),
      pere: pere ? fullName(pere) : null,
      pereBio: null,
      enfantBatard: batard,
      titre: null,
      education: null,
      fecondite: 0,
      ageMax: 0,
      armee: null,
    }
    // traits
    inheritTraits(enfant, mere, pere, rng)
    if (batard) ensureTraitPresent(enfant, TRAIT_BASTARD)
    if (consanguin) ensureTraitPresent(enfant, TRAIT_INBRED)
    enfant.ageMax = computeAgeMax(enfant, rng)
    pop.push(enfant)
    bump(recap.naissances, enfant.dynastie)
    state.log.push({
      turn: state.turn + 1, type: 'Naissance', joueur: p.n,
      texte: `Naissance : ${fullName(enfant)} (${enfant.sexe}, ${enfant.dynastie})${nb > 1 ? ` — fratrie de ${nb}` : ''}.`,
    })
  }
  mere.enfantBatard = false
}

export function pickName(state: GameState, p: Player, rng: Rng, sexe: 'M' | 'F' | undefined): string {
  const peup = peupleDef(p.peuple) ?? PEUPLES[0]
  if (sexe === 'F') return rng.pick(peup.prenomsF)
  if (sexe === 'M') return rng.pick(peup.prenomsM)
  return rng.pick([...peup.prenomsM, ...peup.prenomsF])
}

/** Consanguinité simple (1 degré) : la mère et le père biologique partagent un parent. */
export function isConsanguineous(mere: Character, pere: Character | undefined): boolean {
  if (!pere) return false
  if (mere.mere && mere.mere === pere.mere) return true
  if (mere.pere && mere.pere === pere.pere) return true
  return false
}

/** Dynastie du bébé selon l'Hérédité de la culture (Masculine/Féminine/Parité). */
export function computeBabyDynasty(
  state: GameState, p: Player, mere: Character, pere: Character | undefined,
  batard: boolean, rng: Rng,
): string {
  if (batard) {
    // dynastie noble du parent noble s'il existe, sinon Roturier
    if (pere && isNobleDyn(pere.dynastie)) return pere.dynastie
    if (isNobleDyn(mere.dynastie)) return mere.dynastie
    return 'Roturier'
  }
  const cult = cultureDef(p.culture)
  const hered = cult ? cult.heredite : 'Masculine'
  if (hered === 'Masculine') return pere ? pere.dynastie : mere.dynastie
  if (hered === 'Féminine') return mere.dynastie
  // Parité
  return rng.chance(0.5) ? (pere ? pere.dynastie : mere.dynastie) : mere.dynastie
}

/** Héritage des traits : 40% par trait parental héritable (3 essais mère + 3 essais père),
 *  puis 30% de tirage pondéré par slot libre. */
export function inheritTraits(enfant: Character, mere: Character, pere: Character | undefined, rng: Rng) {
  const parents = [mere, ...(pere ? [pere] : [])]
  for (const parent of parents) {
    for (const t of parent.traits) {
      if (!t) continue
      const td = traitDef(t)
      if (!td || !td.heritable) continue
      for (let essai = 0; essai < 3; essai++) {
        if (rng.chance(0.4)) {
          if (addTraitIfFree(enfant, t)) break
        }
      }
    }
  }
  for (let slot = 0; slot < 3; slot++) {
    if (enfant.traits[slot]) continue
    if (rng.chance(0.3)) {
      const t = rng.pickWeighted(TRAITS, (td) => td.weight)
      if (t.weight > 0) addTraitIfFree(enfant, t.name)
    }
  }
}

function addTraitIfFree(c: Character, trait: string): boolean {
  if (c.traits.includes(trait)) return false
  const idx = c.traits.findIndex((t) => !t)
  if (idx < 0) return false
  c.traits[idx] = trait
  return true
}

function ensureTraitPresent(c: Character, trait: string) {
  if (!c.traits.includes(trait)) {
    const idx = c.traits.findIndex((t) => !t)
    if (idx >= 0) c.traits[idx] = trait
    else c.traits[2] = trait // écrase le 3e slot si plein (comportement VBA SetTraitCell)
  }
}

// ── Influence culturelle (ApplyCultureInfluence) ─────────────────────────

export function applyCultureInfluence(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const pop = state.population[p.n] ?? []
  // pression touristique globale : somme du Tourisme de tous les joueurs par culture
  const pression: Record<string, number> = {}
  for (const cult of CULTURES) pression[cult.nom] = 0.001
  for (const other of state.players) {
    const tour = other.resources['Tourisme']?.stock ?? 0
    pression[other.culture] = (pression[other.culture] ?? 0) + tour
  }
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.titre === TITRE_DIRIGEANT) continue
    if (!rng.chance(0.1)) continue
    const poids: Record<string, number> = {}
    for (const [cult, w] of Object.entries(pression)) {
      let weight = w
      if (cult === c.culture) weight *= 5 // présence locale
      const same = pop.filter((x) => x.statut !== 'Décédé' && x.ville === c.ville && x.culture === cult).length
      weight += same * 5
      poids[cult] = weight
    }
    const entries = Object.entries(poids)
    const nouvelle = rng.pickWeighted(entries, (e) => e[1])[0]
    if (nouvelle !== c.culture) {
      c.culture = nouvelle
      bump(recap.conversions, nouvelle)
      state.log.push({
        turn: state.turn + 1, type: 'Culture', joueur: p.n,
        texte: `${fullName(c)} se convertit à la culture ${nouvelle}.`,
      })
    }
  }
}

export function updateCityCultures(state: GameState, p: Player) {
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    if (vivants.length === 0) continue
    const counts: Record<string, number> = {}
    for (const c of vivants) counts[c.culture] = (counts[c.culture] ?? 0) + 1
    const major = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    ville.culture = major
  }
}

// ── Migration des enfants sans éducation ─────────────────────────────────

export function migrerEnfants(state: GameState, p: Player, rng: Rng) {
  if (p.villes.length <= 1) return
  const pop = state.population[p.n] ?? []
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.age >= ADULT_AGE) continue
    if (c.education) continue
    if (!rng.chance(MIGRATION_PROBA)) continue
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

// ── Armées (RecruitForArmies) ────────────────────────────────────────────

export function recruitForArmies(state: GameState, p: Player, rng: Rng) {
  const pop = state.population[p.n] ?? []
  const recap = p.recap ?? emptyRecap()
  const cult = cultureDef(p.culture)
  for (const armee of p.armees) {
    // retirer les soldats morts
    armee.soldats = armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    })
    // commandant mort ?
    const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
    let puissance = armee.soldats.length * PUISSANCE_SOLDAT
    if (cmd && cmd.statut !== 'Décédé') {
      puissance += PUISSANCE_GENERAL
    } else if (armee.commandant) {
      armee.commandant = null
      recap.commandantTombe = armee.nom
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${p.nom} : le commandant de l'armée « ${armee.nom} » est tombé — à remplacer !`,
      })
    }
    // recruter jusqu'à la puissance cible
    while (puissance < armee.puissanceCible) {
      const candidats = pop.filter(
        (c) =>
          c.statut !== 'Décédé' &&
          c.age >= SOLDAT_AGE_MIN && c.age <= SOLDAT_AGE_MAX &&
          !c.armee && (!c.titre || c.titre === TITRE_CHASSEUR || c.titre === 'Pêcheur') &&
          martialiteOk(cult?.martialite, c.sexe),
      )
      if (candidats.length === 0) break
      const s = rng.pick(candidats)
      s.titre = 'Soldat'
      s.armee = armee.nom
      armee.soldats.push(s.id)
      puissance += PUISSANCE_SOLDAT
      state.log.push({
        turn: state.turn + 1, type: 'Armée', joueur: p.n,
        texte: `${fullName(s)} rejoint l'armée « ${armee.nom} » comme soldat.`,
      })
    }
    armee.puissance = puissance
  }
}

export function martialiteOk(martialite: string | undefined, sexe: 'M' | 'F'): boolean {
  if (!martialite || martialite === 'Les deux') return true
  if (martialite === 'Masculine') return sexe === 'M'
  if (martialite === 'Féminine') return sexe === 'F'
  return true
}

/** Recalcule la puissance affichée d'une armée (après édition manuelle). */
export function recomputeArmy(state: GameState, p: Player, armee: { nom: string; soldats: string[]; commandant: string | null; puissance: number }) {
  const pop = state.population[p.n] ?? []
  const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
  armee.puissance =
    armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    }).length * PUISSANCE_SOLDAT + (cmd && cmd.statut !== 'Décédé' ? PUISSANCE_GENERAL : 0)
}

// ── Historique (SnapshotRessources) ──────────────────────────────────────

export function snapshotRessources(state: GameState, turn: number) {
  for (const p of state.players) {
    const stocks: Record<string, number> = {}
    const prods: Record<string, number> = {}
    for (const r of RESOURCES) {
      stocks[r] = p.resources[r]?.stock ?? 0
      prods[r] = p.resources[r]?.prod ?? 0
    }
    state.history.push({ turn, joueur: p.n, stocks, prods })
  }
}

// ── Récap (WriteRecapA3) ────────────────────────────────────────────────

export function writeRecap(state: GameState, p: Player, recap: PlayerRecap) {
  const fmt = (dict: Record<string, number>) =>
    Object.entries(dict)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k} : ${v}`)
      .join(', ') || '—'
  const lignes = [
    `Conceptions — ${fmt(recap.conceptions)}`,
    `Naissances — ${fmt(recap.naissances)}`,
    `Décès — ${fmt(recap.deces)} (dont maladie : ${recap.decesMaladie})`,
    `Mariages nobles — ${fmt(recap.mariagesNobles)}`,
    `Conversions culturelles — ${fmt(recap.conversions)}`,
    `Titres attribués — ${fmt(recap.titresAttribues)}`,
  ]
  if (recap.crises.length > 0) lignes.push(`⚠ Crises : ${recap.crises.join(' ; ')}`)
  if (recap.commandantTombe) lignes.push(`⚠ Commandant tombé : ${recap.commandantTombe}`)
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `Récap ${p.nom} — ${lignes.join(' | ')}`,
  })
}

export { checkVictory, findTitleIssues, titleCandidatesFor }
