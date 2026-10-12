// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — MOTEUR DE JEU (façade d'orchestration)
//  Portage TypeScript des macros VBA :
//    · FinDeTour (ressources, saisons, événements, dynasties)
//    · PersonnagesPourJoueur (moteur de population)
//    · CalculerGainsPopulation (gains par ville : titres, taxes, conso)
//    · RecruitForArmies (armées)
//  Un tour = 2 ans de jeu.
//
//  ARCHITECTURE (découpage SOLID — une responsabilité par module) :
//    shared.ts      outils transversaux (ids, noms, noblesse, récap)
//    saisons.ts     saisons, événements, cartes dynastie
//    economie.ts    gains de population par ville, taxes (toutes ressources)
//    batiments.ts   bâtiments — production exacte du référentiel
//    amenagements.ts aménagements de terrain — production exacte du référentiel
//    autres.ts      lignes « Autres » des villes (production additionnelle)
//    vassalite.ts   tribut des vassaux vers leur suzerain
//    population.ts  orchestration démographique du tour, migration
//    titres.ts      professeurs, mariages, éducation, titres
//    sante.ts       maladie, décès, succession du Dirigeant
//    naissances.ts  fécondité, conceptions, accouchement, traits
//    culture.ts    conversions culturelles, culture des villes
//    armees.ts     recrutement et puissance des armées
//    journal.ts    snapshot des stocks, récapitulatif
//  Ce fichier ne contient QUE la séquence FinDeTurn ; la façade
//  ré-exporte l'API publique inchangée (mêmes noms qu'avant découpage).
// ══════════════════════════════════════════════════════════════════════

import type { ApportsTour, GameState } from './types'
import { makeRng } from './rng'
import { cfgOf } from './gameData'
import { saisonForTurn, applyEventEffect, applyDynastieCard } from './saisons'
import { calculerGainsPopulation } from './economie'
import { appliquerEffetsBatiments } from './batiments'
import { appliquerEffetsAmenagements } from './amenagements'
import { appliquerEffetsAutres } from './autres'
import { appliquerEffetsRegimesCultures } from './regimes'
import { appliquerConsommationsHabitations } from './habitations'
import { transfererTributVassal } from './vassalite'
import { populationTurn } from './population'
import { recruitForArmies } from './armees'
import { snapshotRessources } from './journal'

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

  // 3. Gains de population par joueur (CalculerGainsPopulation), puis
  //    production de base : stock += prod (lignes 18-28 des J{n}) ; l'été
  //    double la production de Nourriture. Les apports sont tracés pour
  //    le récap ressources (history.apports).
  const gainsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    gainsParJoueur[p.n] = calculerGainsPopulation(state, p, rng)
  }
  const prodParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const prodTot: Record<string, number> = {}
    for (const r of C.ressources) {
      const rs = p.resources[r]
      if (!rs) continue
      rs.stock += rs.prod
      prodTot[r] = rs.prod
    }
    if (state.saison === 'Été') {
      // bonus Nourr - été
      const rs = p.resources['Nourriture']
      if (rs) {
        rs.stock += rs.prod
        prodTot['Nourriture'] = (prodTot['Nourriture'] ?? 0) + rs.prod
      }
    }
    prodParJoueur[p.n] = prodTot
  }

  // 3bis. Vassalité : chaque vassal reverse une part des revenus de ses
  // habitants à son suzerain (formule dans engine/vassalite.ts).
  // Copie des gains avant tribut : elle isole la part « vassalité » du
  // récap ressources (population = gains propres, vassalité = tribut net).
  const gainsAvantTribut: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    gainsAvantTribut[p.n] = { ...(gainsParJoueur[p.n] ?? {}) }
  }
  transfererTributVassal(state, gainsParJoueur, C)

  // 3ter. Gains de population crédités au stock × gainsCrediteStock (paramètre)
  const coefGains = C.p.gainsCrediteStock
  for (const p of state.players) {
    const gains = gainsParJoueur[p.n] ?? {}
    for (const [res, v] of Object.entries(gains)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v * coefGains
    }
  }

  // 3quater. Bâtiments : effets automatiques par tour (engine/batiments.ts).
  // Appliqués SÉPARÉMENT des gains d'habitants : la vassalité ne prélève
  // que sur les revenus des habitants, pas sur les effets des bâtiments.
  const batimentsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    batimentsParJoueur[p.n] = appliquerEffetsBatiments(p, C)
  }

  // 3quinquies. Aménagements de terrain : production exacte du référentiel
  // (table `constructions`), dépendant de la saison (Champ et Rizière ne
  // produisent qu'en été).
  const amenagementsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    amenagementsParJoueur[p.n] = appliquerEffetsAmenagements(p, state.saison, C.config)
  }

  // 3sexies. Autres : lignes « Autres » des villes (bloc « Autres » du
  // classeur J{n}) — ressource × nombre × bonus, créditées au stock.
  const autresParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    autresParJoueur[p.n] = appliquerEffetsAutres(p)
  }

  // 3septies. Régimes & cultures : lois chiffrées des régimes politiques
  //  et règles de pays des cultures (engine/regimes.ts) — paramétrables
  //  dans les référentiels, appliquées automatiquement chaque fin de tour.
  const regimesCulturesParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    regimesCulturesParJoueur[p.n] = appliquerEffetsRegimesCultures(state, p, state.saison, C)
  }

  // 3octies. Habitations : consommation par tour de chaque ville selon
  //  son type (Ville / Château) et son rang (engine/habitations.ts —
  //  ex. Cité : −10 Nourriture, −8 Or ; table typesHabitation).
  const habitationsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    habitationsParJoueur[p.n] = appliquerConsommationsHabitations(state, p, C)
  }

  // 4. Moteur de population (PersonnagesPourJoueur) pour chaque joueur
  for (const p of state.players) {
    populationTurn(state, p, rng)
  }

  // 5. Armées (RecruitForArmies)
  for (const p of state.players) {
    recruitForArmies(state, p, rng)
  }

  // 6. Snapshot (SnapshotRessources → _Historique) + apports du tour
  //    (production, bâtiments, habitants, vassalité → récap ressources).
  const apportsParJoueur: Record<number, ApportsTour> = {}
  for (const p of state.players) {
    const population: Record<string, number> = {}
    for (const [res, v] of Object.entries(gainsAvantTribut[p.n] ?? {})) {
      if (v !== 0) population[res] = v * coefGains
    }
    const vassalite: Record<string, number> = {}
    for (const [res, v] of Object.entries(gainsParJoueur[p.n] ?? {})) {
      const ecart = v - (gainsAvantTribut[p.n]?.[res] ?? 0)
      if (ecart !== 0) vassalite[res] = ecart * coefGains
    }
    apportsParJoueur[p.n] = {
      production: prodParJoueur[p.n] ?? {},
      batiments: batimentsParJoueur[p.n] ?? {},
      amenagements: amenagementsParJoueur[p.n] ?? {},
      autres: autresParJoueur[p.n] ?? {},
      regimesCultures: regimesCulturesParJoueur[p.n] ?? {},
      habitations: habitationsParJoueur[p.n] ?? {},
      population,
      vassalite,
    }
  }
  snapshotRessources(state, turnBefore + 1, apportsParJoueur)

  // 7. Tour suivant
  state.turn = turnBefore + 1
  if (state.log.length > C.p.maxLog) {
    state.log = state.log.slice(state.log.length - C.p.maxLog)
  }
  state.rngState = rng.state()
  return state
}
// ── API publique (ré-exports — signatures et noms inchangés) ────────────

export { newId, isNobleDyn, fullName } from './shared'
export { saisonForTurn, applyEventEffect, applyDynastieCard } from './saisons'
export { calculerGainsPopulation, taxBirthFactor, facteurTaxes, detailGainsVille, type GainsVilleDetail } from './economie'
export {
  effetsTourBatiment, effetsBatimentsVille, appliquerEffetsBatiments,
  garnisonBatiment, coutBatiment, detailsBatimentsJoueur, batimentRef,
  batimentsConstructionsRefs, tourismeStatiqueBatiment, type LigneBatiment,
} from './batiments'
export {
  AMENAGEMENTS, amenagementDef, amenagementRef, amenagementsDefs, aCampDeBatisseurs,
  coutAmenagement, effetsTourAmenagement, effetsAmenagementsVille,
  appliquerEffetsAmenagements,
  detailsAmenagementsJoueur, type LigneAmenagement, type AmenagementDef,
} from './amenagements'
export {
  constructionsRefs, constructionRef, amenagementsRefs, batimentsRefs,
  parseCoutTexte, parseProductionTexte, coutBatimentRef, coutConstructionRef,
  effetsConstructionRef, eteSeulementRef, garnisonConstructionRef,
  reductionCampDeBatisseurs, type ConstructionRef,
} from './constructions'
export {
  effetAutreLigne, effetsAutresVille, appliquerEffetsAutres,
  detailsAutresJoueur, type LigneAutre,
} from './autres'
export {
  nomRang, rangNiveau, garnisonHabitationVille, garnisonHabitationsPays,
  effetsRegime, effetsCulturePays, appliquerEffetsRegimesCultures,
  nbVillesCultureMonde, detailCulturePays, type DetailCultureBonus,
} from './regimes'
export {
  typeVille, habitationDef, rangsDisponibles, garnisonBaseVille,
  habitantsRequisVille, consommationsVille, consommationsPays,
  appliquerConsommationsHabitations,
} from './habitations'
export {
  productionDetaillee, productionVille, provenancesApports,
  type ProductionDetail, type ProductionVilleDetail,
  type ProvenanceApport, type CanalApport,
} from './production'
export { transfererTributVassal } from './vassalite'
export { populationTurn, migrerEnfants } from './population'
export {
  maybeAssignProfesseurs, gestionMariages, formatDynastyPair,
  computeMarriageProbability, tryEducateMinor, assignAdultTitle,
  titreAllowedForCharacter, titresAccessibles,
} from './titres'
export {
  computeAgeMax, killCharacter, handleDirigeantSuccession,
} from './sante'
export {
  computeFecondite, femaleAgeFactor, maleAgeFactor, orientationFertFactor,
  conceptionEtNaissances, pickName, isConsanguineous, computeBabyDynasty,
  inheritTraits,
} from './naissances'
export { applyCultureInfluence, updateCityCultures } from './culture'
export { recruitForArmies, martialiteOk, recomputeArmy } from './armees'
export { snapshotRessources, writeRecap } from './journal'
export { checkVictory } from './victory'
export { findTitleIssues, titleCandidatesFor } from './validation'
