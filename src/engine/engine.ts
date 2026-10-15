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

import type { ApportsTour, GameState, Player } from './types'
import { makeRng } from './rng'
import { cfgOf } from './gameData'
import { saisonForTurn, applyEventEffect, applyDynastieCard } from './saisons'
import { calculerGainsPopulation } from './economie'
import { designerGouverneurs } from './titres'
import { appliquerEffetsBatiments } from './batiments'
import { appliquerEffetsAmenagements, effetsNourrEteAmenagementsVille } from './amenagements'
import { appliquerEffetsAutres, effetsNourrEteAutresVille } from './autres'
import { appliquerEffetsRegimesCultures } from './regimes'
import { appliquerEffetsFaction, nbVassaux } from './factions'
import { appliquerEffetsMinisteres, effetsFinSaisonMinisteres } from './ministeres'
import { appliquerEffetsCommerce, nettoyerRoutesCommerce } from './commerce'
import { appliquerTaxesCitesLibres, citesSuzerainesDe } from './citesLibres'
import { appliquerConsommationsHabitations } from './habitations'
import { transfererTributVassal } from './vassalite'
import { populationTurn } from './population'
import { recruitForArmies } from './armees'
import { snapshotRessources } from './journal'

// ══════════════════════════════════════════════════════════════════════
//  RANGS DE PAYS — condition de sacre (serments possédés)
// ══════════════════════════════════════════════════════════════════════

/** Serments possédés par un joueur : ses vassaux + les cités libres dont
 *  il est le suzerain (une cité libre compte comme un serment, cf. règle
 *  des cités libres). C'est la condition de montée de rang (colonne
 *  « serments » de la table paysRangs, échelle féodale unique). */
export function sermentsPossedes(state: GameState, p: Player): number {
  return nbVassaux(state, p) + citesSuzerainesDe(state, p).length
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
    // Fin de la saison qui se termine : effets automatiques des
    // portefeuilles ministériels (Sénéchal fin d'été, Maître de cour
    // chaque saison — engine/ministeres.ts).
    effetsFinSaisonMinisteres(state, state.saison)
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

  // 2bis. Gouverneurs automatiques (marqueur (w), retour Thibaut) :
  //    une ville sans gouverneur qui abrite un noble prend pour
  //    gouverneur son noble le plus âgé (hors Dirigeant/Héritier) —
  //    AVANT le calcul des gains : le bonus +10 % d'impôts de la
  //    ville s'applique dès le tour de la nomination.
  designerGouverneurs(state, C)

  // 3. Gains de population par joueur (CalculerGainsPopulation), puis
  //    production de base : stock += prod (lignes 18-28 des J{n}).
  //    ATTENTION : la nourriture générale n'est JAMAIS doublée — la
  //    nourriture d'été est une production SÉPARÉE (ligne « Nourr - été »
  //    du classeur), créditée à l'étape 3quinquies-bis, en été seulement.
  //    Les apports sont tracés pour le récap ressources (history.apports).
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
  // (table `constructions`), HORS production d'été (Champ et Rizière ne
  // produisent qu'en été — étape suivante).
  const amenagementsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    amenagementsParJoueur[p.n] = appliquerEffetsAmenagements(p, state.saison, C.config)
  }

  // 3quinquies-bis. Nourr - été : production de NOURRITURE D'ÉTÉ —
  // aménagements d'été (Champ, Rizière) + lignes « Autres » de ressource
  // « Nourr - été ». Créditée au stock de Nourriture UNIQUEMENT quand la
  // saison est Été (macro FinDeTour du classeur : prodSummer = ligne
  // « Nourr - été », S'AJOUTE à la nourriture générale — jamais un
  // doublage de celle-ci).
  const nourrEteParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const out: Record<string, number> = {}
    if (state.saison === 'Été') {
      for (const ville of p.villes) {
        for (const [res, v] of Object.entries(effetsNourrEteAmenagementsVille(ville, C.config))) {
          out[res] = (out[res] ?? 0) + v
        }
        for (const [res, v] of Object.entries(effetsNourrEteAutresVille(ville))) {
          out[res] = (out[res] ?? 0) + v
        }
      }
      for (const [res, v] of Object.entries(out)) {
        if (!v) continue
        const rs = p.resources[res]
        if (rs) rs.stock += v
      }
    }
    nourrEteParJoueur[p.n] = out
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

  // 3nonies. Factions : bonus automatiques des règles de faction du
  //  peuple de chaque joueur (2 règles de base + règle d'Âge II / III
  //  choisie — engine/factions.ts). Les parties au plateau (PM,
  //  émissaires, influence…) restent manuelles.
  const factionsParJoueur: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    factionsParJoueur[p.n] = appliquerEffetsFaction(state, p, C)
  }

  // 3decies. Cités libres : chaque cité libre possédant un suzerain lui
  // verse ses taxes (production nette de ses habitants, Chasseurs ×2
  // Nourriture — engine/citesLibres.ts), canal « Cités libres ».
  const citesLibresParJoueur: Record<number, Record<string, number>> =
    appliquerTaxesCitesLibres(state, C)

  // 3duodecies. Ministères : effets automatiques par tour des
  //  portefeuilles ministériels (Trésorier +5 Or, Grand Précepteur
  //  +1 Science — engine/ministeres.ts, cumulables), canal
  //  « Ministères » du récap ressources.
  const ministeresParJoueur: Record<number, Record<string, number>> =
    appliquerEffetsMinisteres(state, C)

  // 3terdecies. Commerce (marqueur (t)) : les routes commerciales des
  //  marchands génèrent marchandOrTour Or pour CHAQUE joueur relié
  //  (propriétaire du marchand + joueur ciblé) ; le propriétaire copie
  //  en plus la production de l'aménagement ENTIER choisi dans la
  //  ville ciblée, marqueur (u) (engine/commerce.ts — comme les bâtiments : pas de
  //  taxes, pas de coefficient gainsCrediteStock, pas de tribut). Les
  //  routes mortes (marchand décédé ou déchu) sont d'abord fermées.
  nettoyerRoutesCommerce(state)
  const commerceParJoueur: Record<number, Record<string, number>> =
    appliquerEffetsCommerce(state, C)

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
      nourrEte: nourrEteParJoueur[p.n] ?? {},
      autres: autresParJoueur[p.n] ?? {},
      regimesCultures: regimesCulturesParJoueur[p.n] ?? {},
      habitations: habitationsParJoueur[p.n] ?? {},
      faction: factionsParJoueur[p.n] ?? {},
      citesLibres: citesLibresParJoueur[p.n] ?? {},
      ministeres: ministeresParJoueur[p.n] ?? {},
      commerce: commerceParJoueur[p.n] ?? {},
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

export {
  newId, isNobleDyn, fullName,
  type Detenteur, detenteursDe, populationDe, nomDe, porteurDe,
  toutesLesPopulations, memeDetenteur, deplacerPersonnage,
} from './shared'
export { saisonForTurn, applyEventEffect, applyDynastieCard } from './saisons'
export {
  calculerGainsPopulation, taxBirthFactor, detailGainsVille, type GainsVilleDetail,
  impotPopulation, impotsVassaux, type ImpotVassal,
  genererImpotPopulation, genererImpotVassaux,
} from './economie'
export {
  effetsTourBatiment, effetsBatimentsVille, appliquerEffetsBatiments,
  garnisonBatiment, coutBatiment, detailsBatimentsJoueur, batimentRef,
  batimentsConstructionsRefs, tourismeStatiqueBatiment, type LigneBatiment,
} from './batiments'
export {
  AMENAGEMENTS, amenagementDef, amenagementRef, amenagementsDefs, aCampDeBatisseurs,
  coutAmenagement, effetsTourAmenagement, effetsAmenagementsVille,
  effetsNourrEteAmenagementsVille, appliquerEffetsAmenagements,
  detailsAmenagementsJoueur, type LigneAmenagement, type AmenagementDef,
} from './amenagements'
export {
  constructionsRefs, constructionRef, amenagementsRefs, batimentsRefs,
  parseCoutTexte, parseProductionTexte, coutBatimentRef, coutConstructionRef,
  effetsConstructionRef, effetsConstructionEntries, effetsEteConstructionRef,
  instantanesConstructionRef, eteSeulementRef, garnisonConstructionRef,
  resumeConstruction, reductionCampDeBatisseurs, type ConstructionRef,
  type EffetConstruction,
} from './constructions'
export {
  effetAutreLigne, effetsAutresVille, effetsNourrEteAutresVille, estNourrEte,
  appliquerEffetsAutres,
  detailsAutresJoueur, type LigneAutre,
} from './autres'
export {
  nomRang, rangNiveau, garnisonHabitationVille, garnisonHabitationsPays,
  effetsRegime, effetsCulturePays, appliquerEffetsRegimesCultures,
  nbVillesCultureMonde, detailCulturePays, type DetailCultureBonus,
} from './regimes'
export {
  ficheFaction, reglesActives, regleActive, detailsFaction, effetsFaction,
  garnisonFactionVille, appliquerEffetsFaction,
  nbAmenagements, nbBatiments, nbVassaux, rangPaysNiveau, capitaleDe,
  batimentsFaction, batimentsCapitale,
  type DetailFaction, type RegleActive, type SourceRegle,
} from './factions'
export { supprimerVille, transfererVille } from './villes'
export { donnerPersonnage, marierPersonnages, numeroJoueurDe } from './cour'
export {
  citesLibresDe, garnisonCiteLibre, facteurTaxesCite, emissairesDe,
  citesSuzerainesDe, detailCiteLibre, taxesCitesLibresRecues,
  appliquerTaxesCitesLibres, ajouterHabitantsCiteLibre, taxesCite,
  ajouterFamilleNobleCiteLibre, titresAccessiblesCite,
  pseudoJoueurDeCite, CONSO_NOURR_CITE_LIBRE,
  type DetailCiteLibre,
} from './citesLibres'
export {
  typeVille, habitationDef, rangsDisponibles, garnisonBaseVille,
  habitantsRequisVille, consommationsVille, consommationsPays,
  appliquerConsommationsHabitations,
  coutHabitation, debiterCoutHabitation,
} from './habitations'
export {
  productionDetaillee, productionVille, provenancesApports,
  attraitTouristiqueVille, attraitMaxMonde,
  type ProductionDetail, type ProductionVilleDetail,
  type ProvenanceApport, type CanalApport,
} from './production'
export {
  TITRE_MARCHAND, routesCommerce, routesCommerceDe, routesCommerceVers,
  marchandsDe, ressourcesCopiables, amenagementsCopiables,
  effetsRouteProprietaire, effetsCommerceJoueur, detailCommerceJoueur,
  appliquerEffetsCommerce, nettoyerRoutesCommerce, creerRouteCommerce,
  changerCopieRoute, supprimerRouteCommerce,
  type RouteCommerce, type RessourceCopiable, type DetailCommerce,
} from './commerce'
export { transfererTributVassal } from './vassalite'
export {
  aMinistre, portefeuillesDuJoueur, appliquerEffetsMinisteres,
  effetsFinSaisonMinisteres, facteurSacre, facteurAvencement,
  changerPortefeuille, migrerNomsMinisteres,
} from './ministeres'
export {
  techDefArbre, effetsTech, coutScienceTech, debiterScienceTech,
  rembourserScienceTech, resumeEffetsTech,
  type SlotProgres,
} from './progres'
export { populationTurn, migrerPopulation } from './population'
export {
  maybeAssignProfesseurs, gestionMariages, formatDynastyPair,
  computeMarriageProbability, tryEducateMinor, assignAdultTitle,
  titreAllowedForCharacter, titresAccessibles,
  gouverneurDeVille, designerGouverneurs,
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
export {
  cocherLaurier, nbLauriers, victoireAtteinte,
  victoryProgress, victoryLabels,
} from './victory'
export { findTitleIssues, titleCandidatesFor } from './validation'
// Couleurs d'affichage (marqueur (o)) — palettes paramétrables
export {
  couleurJoueur, couleurRessource, fondRessource, migrerCouleurs,
  COULEURS_JOUEURS_DEFAUT, COULEURS_RESSOURCES_DEFAUT, TRANSPARENCE_LIGNES_DEFAUT,
  type CouleursConfig,
} from './gameData'
