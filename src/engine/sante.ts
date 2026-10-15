// ══════════════════════════════════════════════════════════════════════
//  SANTÉ, MORT ET SUCCESSION
//  Âge maximum, résurrection, maladie, décès et succession du Dirigeant.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player, PlayerRecap } from './types'
import { makeRng, type Rng } from './rng'
import { cfgOf, traitDef, type Cfg } from './gameData'
import { buildingDef } from './gameData2'
import { bump, fullName, isNobleDyn, toutesLesPopulations } from './shared'
import { titreAllowedForCharacter } from './titres'
import { facteurSacre, facteurAvencement } from './ministeres'

export function computeAgeMax(c: Character, rng: Rng, C: Cfg = cfgOf()): number {
  // VBA ComputeAgeMaxEx : somme des life_delta des trois traits.
  let delta = 0
  for (const t of c.traits) {
    const td = t ? traitDef(t, C.config) : undefined
    if (td) delta += td.life_delta
  }
  return C.p.ageMaxBase + rng.int(0, Math.max(0, C.p.ageMaxAla)) + delta
}

export function tryResurrection(c: Character, rng: Rng, C: Cfg = cfgOf()): boolean {
  const t1 = traitDef(c.traits[0], C.config)
  const seuil = t1 ? t1.resurrection_min_roll : 0
  if (seuil > 0 && rng.die(6) >= seuil) {
    c.ageMax += rng.die(6) + rng.die(6)
    return true
  }
  return false
}

// ── Maladie (règle simplifiée : on est malade ou sain, plus de
//    tableau de maladies distinctes) ──────────────────────────────────
//    · une personne saine (ou enceinte) peut contracter la maladie ;
//    · un malade qui la re-contracte meurt ;
//    · une femme enceinte qui tombe malade accouchera puis mourra
//      (flag enceinteMalade) ;
//    · une femme malade qui tombe enceinte est guérie (bug assumé).

export function maladieStep(state: GameState, p: Player, c: Character, rng: Rng, recap: PlayerRecap) {
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
        // une femme enceinte qui tombe malade mourra après l'accouchement
        c.enceinteMalade = true
        state.log.push({
          turn: state.turn + 1, type: 'Naissance', joueur: p.n,
          texte: `${fullName(c)} tombe malade en étant enceinte — elle accouchera, puis mourra de la maladie.`,
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
  // libérer le conjoint — il peut vivre chez un AUTRE porteur depuis
  //  les mariages manuels entre cours (engine/cour.ts, 2026-10-14) :
  //  on parcourt donc TOUTES les populations du monde, joueurs ET
  //  cités libres (retour Thibaut 2026-10-14).
  if (c.mariage) {
    const conjoint = toutesLesPopulations(state).find((x) => x.mariage === fullName(c))
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
    // Sacre d'Avènement (refonte des rangs) : le nouveau dirigeant paie
    // la MOITIÉ du prix de son rang de pays (coût de sacre de la table
    // paysRangs, débité automatiquement ; un coût nul ne débite rien).
    const rangs = C.config.paysRangs ?? []
    const rangDef = rangs.find((r) => r.nom === p.rang)
    let sacreTxt = ''
    if (rangDef) {
      // Sacre d'Avènement (refonte des rangs) : le nouveau dirigeant paie
      // la MOITIÉ du prix de son rang de pays, débité automatiquement.
      // Réductions ministérielles (refonte 2026-10-14) : Chancelier de
      // justice −25 % (facteurSacre) et Archichancelier « sacre réduit de
      // moitié » (facteurAvencement → quart du prix) — cumulables.
      const fS = facteurSacre(state, p)
      const fA = facteurAvencement(state, p)
      // Démocratie (retour Thibaut 2026-10-15 : loi non prise en
      //  compte) : « Elections : le sacre d'avènement est gratuit » —
      //  facteur 0 appliqué automatiquement.
      const fDemocratie = p.regime === 'Démocratie' ? 0 : 1
      const demiOr = Math.floor((rangDef.coutOr ?? 0) * fS * fA * fDemocratie)
      const demiNourr = Math.floor((rangDef.coutNourriture ?? 0) * fS * fA * fDemocratie)
      const or = p.resources['Or']
      if (or) or.stock -= demiOr
      const nourr = p.resources['Nourriture']
      if (nourr) nourr.stock -= demiNourr
      if (demiOr > 0 || demiNourr > 0) {
        const reduc: string[] = []
        if (fS < 1) reduc.push('Chancelier de justice : −25 %')
        if (fA < 0.5) reduc.push('Archichancelier : sacre d’avènement réduit de moitié')
        sacreTxt = ` Sacre d'avènement payé : ${demiOr} Or et ${demiNourr} Nourriture (${reduc.length > 0 ? `réduit — ${reduc.join(' ; ')}` : p.regime === 'Démocratie' ? 'sacre d\u2019avènement gratuit (Démocratie)' : `moitié du prix du rang ${rangDef.nom}`}).`
      }
    }
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `${p.nom} : ${fullName(heritier)} (${heritier.dynastie}) succède à ${fullName(defunt)} comme Dirigeant.${sacreTxt}`,
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
    // Avènement SANS héritier (refonte des rangs) : un noble est promu et
    // une crise ALÉATOIRE de la table « crises » du référentiel se déclenche.
    const crises = C.config.crises ?? []
    const crise = crises.length > 0 ? rng.pick(crises) : null
    state.rngState = rng.state()
    recap.crises.push('CRISE DE SUCCESSION')
    state.log.push({
      turn: state.turn + 1, type: 'Crise', joueur: p.n,
      texte: `CRISE DE SUCCESSION — ${p.nom} : le noble ${fullName(elu)} (${elu.dynastie}) est promu Dirigeant.${crise ? ` Avènement sans héritier — crise déclenchée : ${crise}` : ''}`,
    })
    return
  }
  recap.crises.push('CRISE MAJEURE : poste de Dirigeant vacant')
  state.log.push({
    turn: state.turn + 1, type: 'Crise', joueur: p.n,
    texte: `CRISE MAJEURE — ${p.nom} : aucun héritier ni noble disponible, le poste de Dirigeant est vacant !`,
  })
}

