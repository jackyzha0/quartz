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
  titreDef, traitDef, cultureDef, peupleDef, cfgOf,
  type Cfg,
} from './gameData'
import { buildingDef, schoolRankOf } from './gameData2'
import { checkVictory } from './victory'
import { findTitleIssues, titleCandidatesFor } from './validation'

// Toutes les constantes du module VBA vivent désormais dans la config de la
// partie (state.config, onglet « Paramètres ») : valeurs par défaut dans
// src/config/params.ts, données de référence dans src/config/defaultConfig.ts.
// Chaque formule ci-dessous lit ses constantes via cfgOf(state.config) :
// n'importe qui peut les changer à chaud, sans aucune contrainte.

// ── Utilitaires ─────────────────────────────────────────────────────────
let idCounter = 0
export function newId(rng: Rng): string {
  return `c${Date.now().toString(36)}${(idCounter++).toString(36)}${rng.int(100, 999)}`
}

export function isNobleDyn(dyn: string, C: Cfg = cfgOf()): boolean {
  const d = dyn.trim()
  return d !== '' && d !== C.p.dynastieRoturier
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
  const C = cfgOf(state.config)
  const rng = makeRng(state.rngState)
  const turnBefore = state.turn
  const newSaison = saisonForTurn(turnBefore + 1, C)

  // 1. Événement de saison (si la saison change au tour qui commence)
  if (newSaison !== state.saison) {
    const ev = rng.pickWeighted(
      C.events.filter((e) => e.saison === newSaison),
      (e) => e.poids,
    )
    const danger = rng.die(6) + state.modDanger
    const level: 'faible' | 'moyenne' | 'forte' | 'extreme' =
      danger <= 5 ? 'faible' : danger <= 8 ? 'moyenne' : danger < C.p.dangerSeuilForte ? 'forte' : 'extreme'
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
    const card = rng.pick(C.dynasties)
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
    for (const r of C.ressources) {
      const rs = p.resources[r]
      if (!rs) continue
      rs.stock += rs.prod
    }
    if (state.saison === 'Été') {
      // bonus Nourr - été
      const rs = p.resources['Nourriture']
      if (rs) rs.stock += rs.prod
    }
    // gains de population crédités au stock × gainsCrediteStock (paramètre)
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v * C.p.gainsCrediteStock
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
  if (state.log.length > C.p.maxLog) {
    state.log = state.log.slice(state.log.length - C.p.maxLog)
  }
  state.rngState = rng.state()
  return state
}

export function saisonForTurn(turn: number, C: Cfg = cfgOf()): 'Été' | 'Hiver' {
  return Math.floor(turn / Math.max(1, C.p.saisonLongueur)) % 2 === 0 ? 'Été' : 'Hiver'
}

/**
 * Effets chiffrés des événements du classeur : la table eventEffets de la
 * config donne, pour chaque événement, un effet de base par ressource,
 * multiplié par le coefficient de niveau (params evMult*) ; Peste ajoute
 * un risque de maladie, Sombres présages augmente modDanger.
 * Tout est modifiable à chaud dans l'onglet « Paramètres ».
 */
function applyEventEffect(state: GameState, nom: string, level: 'faible' | 'moyenne' | 'forte' | 'extreme') {
  const C = cfgOf(state.config)
  const mult =
    level === 'faible' ? C.p.evMultFaible
    : level === 'moyenne' ? C.p.evMultMoyenne
    : level === 'forte' ? C.p.evMultForte
    : C.p.evMultExtreme
  const def = C.config.eventEffets.find((e) => e.nom === nom)
  if (!def) return
  if (def.modDanger) state.modDanger += def.modDanger
  for (const eff of def.effets) {
    const v = eff.base * mult
    for (const p of state.players) {
      const rs = p.resources[eff.ressource]
      if (rs) rs.stock += v
    }
  }
  if (def.maladieRisque > 0) {
    const risk = def.maladieRisque * mult
    const rng = makeRng(state.rngState)
    for (const p of state.players) {
      for (const c of state.population[p.n] ?? []) {
        if (c.statut === 'Sain' && c.statut !== 'Décédé' && rng.chance(risk)) {
          c.statut = 'Malade'
        }
      }
    }
    state.rngState = rng.state()
  }
}

/**
 * Effets chiffrés des cartes dynastie du classeur : table dynastieEffets de
 * la config ('(aléatoire)' = une ressource de base tirée au sort ;
 * guerison = guérit un personnage malade). Les cartes « à option » du
 * classeur (dépenser X pour gagner Y) ne dépensent rien automatiquement :
 * leur texte reste affiché dans le journal, le joueur applique son choix
 * en éditant ses stocks — aucune contrainte bloquante.
 */
function applyDynastieCard(state: GameState, p: Player, nom: string, rng: Rng) {
  const C = cfgOf(state.config)
  const def = C.config.dynastieEffets.find((e) => e.nom === nom)
  if (!def) return
  const baseRessources = C.ressources.slice(0, 7)
  if (def.guerison) {
    const pop = state.population[p.n] ?? []
    const malades = pop.filter((c) => c.statut === 'Malade' && c.statut !== 'Décédé')
    if (malades.length > 0) {
      const elu = rng.pick(malades)
      elu.statut = 'Sain'
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: p.n,
        texte: `Miracle : ${fullName(elu)} est guéri(e).`,
      })
    }
  }
  for (const eff of def.effets) {
    const res = eff.ressource === '(aléatoire)' ? rng.pick(baseRessources) : eff.ressource
    const rs = p.resources[res]
    if (rs) rs.stock += eff.base
  }
}

// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Titres → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par les
//  taxes de la ville, puis consommation de 1 Nourriture par habitant vivant.
// ══════════════════════════════════════════════════════════════════════

export function calculerGainsPopulation(state: GameState, p: Player, rng: Rng): Record<string, number> {
  const C = cfgOf(state.config)
  const totals: Record<string, number> = {}
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const cityGains: Record<string, number> = {}
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    for (const c of vivants) {
      if (!c.titre) continue
      const td = titreDef(c.titre, C.config)
      if (!td) continue
      if (td.ressource1 && td.valeur1 !== 0) {
        cityGains[td.ressource1] = (cityGains[td.ressource1] ?? 0) + td.valeur1
      }
      if (td.ressource2 && td.valeur2 !== 0) {
        cityGains[td.ressource2] = (cityGains[td.ressource2] ?? 0) + td.valeur2
      }
    }
    // Taxes : Faible → Or ×0,5 / Forte → Or ×1,5 (l'inverse pour la Nourriture)
    const taxOr = ville.taxes === 'Faible' ? C.p.taxOrFaibles : ville.taxes === 'Forte' ? C.p.taxOrHautes : 1
    const taxNourr = ville.taxes === 'Faible' ? C.p.taxOrHautes : ville.taxes === 'Forte' ? C.p.taxOrFaibles : 1
    if (cityGains['Or']) cityGains['Or'] *= taxOr
    if (cityGains['Nourriture']) cityGains['Nourriture'] *= taxNourr
    // Consommation (non taxée, appliquée après)
    cityGains['Nourriture'] = (cityGains['Nourriture'] ?? 0) - C.p.consoNourrParHab * vivants.length
    for (const [res, v] of Object.entries(cityGains)) {
      totals[res] = (totals[res] ?? 0) + v
    }
  }
  return totals
}

/** Facteur de taxes sur la conception (Faible ×1,5 / Moyenne ×1 / Forte ×0,5). */
export function taxBirthFactor(ville: City | undefined, C: Cfg = cfgOf()): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? C.p.taxNaissFaibles : ville.taxes === 'Forte' ? C.p.taxNaissHautes : 1
}

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

export function computeAgeMax(c: Character, rng: Rng, C: Cfg = cfgOf()): number {
  // VBA ComputeAgeMaxEx : somme des life_delta des trois traits.
  let delta = 0
  for (const t of c.traits) {
    const td = t ? traitDef(t, C.config) : undefined
    if (td) delta += td.life_delta
  }
  return C.p.ageMaxBase + rng.int(0, Math.max(0, C.p.ageMaxAla)) + delta
}

function tryResurrection(c: Character, rng: Rng, C: Cfg = cfgOf()): boolean {
  const t1 = traitDef(c.traits[0], C.config)
  const seuil = t1 ? t1.resurrection_min_roll : 0
  if (seuil > 0 && rng.die(6) >= seuil) {
    c.ageMax += rng.die(6) + rng.die(6)
    return true
  }
  return false
}

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

// ── Maladie ──────────────────────────────────────────────────────────────

function maladieStep(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
  if (c.statut === 'Décédé') return
  const C = cfgOf(state.config)
  const ville = p.villes.find((v) => v.nom === c.ville)
  const batiments = ville ? ville.batiments : []
  let contractMod = 0
  let cureMod = 0
  for (const v of p.villes) {
    for (const b of v.batiments) {
      const bd = buildingDef(b, C.config)
      if (bd) cureMod += bd.bonusGuerisonGlobal
    }
  }
  for (const b of batiments) {
    const bd = buildingDef(b, C.config)
    if (bd) {
      contractMod += bd.malContraction
      cureMod += bd.bonusGuerison
    }
  }
  if (c.statut === 'Sain' || c.statut === 'Enceinte') {
    let pContract = C.p.probaMaladie + C.p.modMaladieAge * c.age + contractMod
    if (c.statut === 'Enceinte') pContract += C.p.modMaladieEnceinte
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
    if (rng.chance(Math.max(0, C.p.probaMaladie + C.p.modMaladieAge * c.age + contractMod))) {
      killCharacter(state, p, c, 'maladie', recap)
      return
    }
    const pCure = C.p.probaGuerison - C.p.modGuerisonAge * c.age + cureMod
    if (rng.chance(Math.max(0, pCure))) c.statut = 'Sain'
  }
}

// ── Décès ────────────────────────────────────────────────────────────────

export function killCharacter(state: GameState, p: Player, c: Character, cause: 'vieillesse' | 'maladie', recap: PlayerRecap) {
  const C = cfgOf(state.config)
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
  if (c.titre === C.p.titreDirigeant) {
    handleDirigeantSuccession(state, p, c, recap)
  }
}

export function handleDirigeantSuccession(state: GameState, p: Player, defunt: Character, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const heritier = pop.find(
    (c) => c.statut !== 'Décédé' && c.titre === C.p.titreHeritierStr,
  )
  if (heritier) {
    heritier.titre = C.p.titreDirigeant
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `${p.nom} : ${fullName(heritier)} (${heritier.dynastie}) succède à ${fullName(defunt)} comme Dirigeant.`,
    })
    return
  }
  const nobles = pop.filter(
    (c) => c.statut !== 'Décédé' && c.age >= C.p.adultAge && isNobleDyn(c.dynastie, C) && c.titre !== C.p.titreSoldat && c.titre !== C.p.titreCommandant,
  )
  const rng = makeRng(state.rngState)
  const eligibles = nobles.filter((c) => titreAllowedForCharacter(C.p.titreDirigeant, c, p, C))
  if (eligibles.length > 0) {
    const elu = rng.pick(eligibles)
    elu.titre = C.p.titreDirigeant
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
  const C = cfgOf(state.config)
  if (c.statut === 'Décédé' || c.age < C.p.adultAge) return 0
  if (c.sexe === 'F') {
    return femaleAgeFactor(c.age) * cultureFertFactor(p.culture, C) * orientationFertFactor(c.orientation)
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

function cultureFertFactor(culture: string, C: Cfg = cfgOf()): number {
  const c = cultureDef(culture, C.config)
  return c ? c.fertFactor : 1
}

function traitsFertFactor(a: Character, b: Character | null, C: Cfg = cfgOf()): number {
  let sum = 0
  for (const t of a.traits) {
    const td = t ? traitDef(t, C.config) : undefined
    if (td) sum += td.fert_add
  }
  if (b) {
    for (const t of b.traits) {
      const td = t ? traitDef(t, C.config) : undefined
      if (td) sum += td.fert_add
    }
  }
  return Math.min(C.p.fertTraitFactorMax, Math.max(C.p.fertTraitFactorMin, 1 + sum))
}

// ── Conception et naissances ─────────────────────────────────────────────

export function conceptionEtNaissances(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []

  // 1. Naissances des femmes enceintes depuis le tour précédent
  for (const mere of pop) {
    if (mere.statut !== 'Enceinte') continue
    if (mere.statut === 'Décédé') continue
    const pereBioName = mere.pereBio
    const pere = pereBioName ? pop.find((x) => fullName(x) === pereBioName) : undefined
    accoucher(state, p, mere, pere, rng, recap)
    mere.statut = 'Sain'
    mere.pereBio = null
  }

  // 2. Tentatives de conception (femmes adultes saines)
  for (const mere of pop) {
    if (mere.sexe !== 'F' || mere.statut !== 'Sain') continue
    if (mere.age < C.p.adultAge) continue
    const ville = p.villes.find((v) => v.nom === mere.ville)
    const mari = mere.mariage ? pop.find((x) => fullName(x) === mere.mariage && x.statut !== 'Décédé') : undefined
    const factorMari = mari ? maleAgeFactor(mari.age) * orientationFertFactor(mari.orientation) : C.p.fertSingleFactor
    let proba = C.p.fertBaseRate
    proba *= femaleAgeFactor(mere.age)
    proba *= factorMari
    proba *= traitsFertFactor(mere, mari ?? null, C)
    proba *= cultureFertFactor(p.culture, C)
    proba *= orientationFertFactor(mere.orientation)
    proba *= taxBirthFactor(ville, C)
    if (rng.chance(proba)) {
      let pereBio: Character | undefined
      let batard = false
      if (mari) {
        if (rng.chance(C.p.adulteryRate)) {
          // adultère : amant aléatoire
          const amants = pop.filter(
            (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= C.p.adultAge && x.id !== mari.id,
          )
          pereBio = amants.length > 0 ? rng.pick(amants) : undefined
          batard = true
        } else {
          pereBio = mari
        }
      } else {
        // célibataire : amant aléatoire, enfant bâtard
        const amants = pop.filter(
          (x) => x.sexe === 'M' && x.statut === 'Sain' && x.age >= C.p.adultAge,
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
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // nombre d'enfants
  const r = rng.next()
  const nb = r < C.p.fertTripletsRate ? 3 : r < C.p.fertTripletsRate + C.p.fertTwinsRate ? 2 : 1
  const batard = mere.enfantBatard
  const consanguin = isConsanguineous(mere, pere)
  for (let i = 0; i < nb; i++) {
    const enfant: Character = {
      id: newId(rng),
      nom: mere.nom,
      prenom: pickName(state, p, rng, undefined),
      dynastie: computeBabyDynasty(state, p, mere, pere, batard, rng),
      sexe: rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F',
      age: 0,
      culture: mere.culture,
      ville: mere.ville,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
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
    inheritTraits(enfant, mere, pere, rng, C)
    if (batard) ensureTraitPresent(enfant, C.p.traitBatard)
    if (consanguin) ensureTraitPresent(enfant, C.p.traitConsanguin)
    enfant.ageMax = computeAgeMax(enfant, rng, C)
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
  const C = cfgOf(state.config)
  const peup = peupleDef(p.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  if (!peup) return 'Anonyme'
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
  const C = cfgOf(state.config)
  if (batard) {
    // dynastie noble du parent noble s'il existe, sinon Roturier
    if (pere && isNobleDyn(pere.dynastie, C)) return pere.dynastie
    if (isNobleDyn(mere.dynastie, C)) return mere.dynastie
    return C.p.dynastieRoturier
  }
  const cult = cultureDef(p.culture, C.config)
  const hered = cult ? cult.heredite : 'Masculine'
  if (hered === 'Masculine') return pere ? pere.dynastie : mere.dynastie
  if (hered === 'Féminine') return mere.dynastie
  // Parité
  return rng.chance(0.5) ? (pere ? pere.dynastie : mere.dynastie) : mere.dynastie
}

/** Héritage des traits : 40% par trait parental héritable (3 essais mère + 3 essais père),
 *  puis 30% de tirage pondéré par slot libre. */
export function inheritTraits(enfant: Character, mere: Character, pere: Character | undefined, rng: Rng, C: Cfg = cfgOf()) {
  const parents = [mere, ...(pere ? [pere] : [])]
  const nbEssais = Math.max(0, Math.round(C.p.traitHeriteEssais))
  for (const parent of parents) {
    for (const t of parent.traits) {
      if (!t) continue
      const td = traitDef(t, C.config)
      if (!td || !td.heritable) continue
      for (let essai = 0; essai < nbEssais; essai++) {
        if (rng.chance(C.p.traitHeriteParEssai)) {
          if (addTraitIfFree(enfant, t)) break
        }
      }
    }
  }
  // VBA : tirage pondéré par slot libre, hors traits déjà présents.
  const pris = enfant.traits.filter(Boolean) as string[]
  const pool = C.traits.filter((td) => td.weight > 0 && !pris.includes(td.name))
  for (let slot = 0; slot < 3 && pool.length > 0; slot++) {
    if (enfant.traits[slot]) continue
    if (rng.chance(C.p.traitTirageSlot)) {
      const t = rng.pickWeighted(pool, (td) => td.weight)
      addTraitIfFree(enfant, t.name)
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
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  // pression touristique globale : somme du Tourisme de tous les joueurs par culture
  const pression: Record<string, number> = {}
  for (const cult of C.cultures) pression[cult.nom] = 0.001
  for (const other of state.players) {
    const tour = other.resources['Tourisme']?.stock ?? 0
    pression[other.culture] = (pression[other.culture] ?? 0) + tour
  }
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.titre === C.p.titreDirigeant) continue
    if (!rng.chance(C.p.conversionProba)) continue
    const poids: Record<string, number> = {}
    for (const [cult, w] of Object.entries(pression)) {
      let weight = w
      if (cult === c.culture) weight *= C.p.conversionMemeCulture // présence locale
      const same = pop.filter((x) => x.statut !== 'Décédé' && x.ville === c.ville && x.culture === cult).length
      weight += same * C.p.conversionPoidsLocal
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

// ── Armées (RecruitForArmies) ────────────────────────────────────────────

export function recruitForArmies(state: GameState, p: Player, rng: Rng) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const recap = p.recap ?? emptyRecap()
  const cult = cultureDef(p.culture, C.config)
  for (const armee of p.armees) {
    // retirer les soldats morts
    armee.soldats = armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    })
    // commandant mort ?
    const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
    let puissance = armee.soldats.length * C.p.puissanceSoldat
    if (cmd && cmd.statut !== 'Décédé') {
      puissance += C.p.puissanceGeneral
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
          c.age >= C.p.soldatAgeMin && c.age <= C.p.soldatAgeMax &&
          !c.armee && (!c.titre || c.titre === C.p.titreChasseur) &&
          martialiteOk(cult?.martialite, c.sexe),
      )
      if (candidats.length === 0) break
      const s = rng.pick(candidats)
      s.titre = C.p.titreSoldat
      s.armee = armee.nom
      armee.soldats.push(s.id)
      puissance += C.p.puissanceSoldat
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
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const cmd = armee.commandant ? pop.find((x) => x.id === armee.commandant) : undefined
  armee.puissance =
    armee.soldats.filter((id) => {
      const s = pop.find((x) => x.id === id)
      return s && s.statut !== 'Décédé'
    }).length * C.p.puissanceSoldat + (cmd && cmd.statut !== 'Décédé' ? C.p.puissanceGeneral : 0)
}

// ── Historique (SnapshotRessources) ──────────────────────────────────────

export function snapshotRessources(state: GameState, turn: number) {
  const C = cfgOf(state.config)
  for (const p of state.players) {
    const stocks: Record<string, number> = {}
    const prods: Record<string, number> = {}
    for (const r of C.ressources) {
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
