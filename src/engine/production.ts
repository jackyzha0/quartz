// ══════════════════════════════════════════════════════════════════════
//  PRODUCTION PAR TOUR — VUE DÉTAILLÉE PAR CANAL (page « Pays »)
//  Recense l'ensemble des productions par tour d'un joueur :
//    · base (production propre du pays, stockée dans resources[r].prod),
//    · habitants (titres × taxes — toutes ressources —, moins la
//      consommation — Économie),
//    · bâtiments (production exacte du référentiel, Ville / Château /
//      Capitale),
//    · aménagements (production exacte du référentiel, terrain),
//    · autres (lignes « Autres » des villes : ressource × nombre × bonus),
//    · régimes & cultures (lois chiffrées du régime et règle de pays de
//      la culture — engine/regimes.ts, paramétrables dans les référentiels),
//    · vassalité (tribut payé / reçu, paramètre vassalPrelevement).
//  La production affichée est CALCULÉE (non modifiable) : le stock du
//  tour N égale le stock du tour N−1 plus la production par tour.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import { cfgOf, type Cfg } from './gameData'
import { makeRng } from './rng'
import { calculerGainsPopulation, detailGainsVille } from './economie'
import { effetsBatimentsVille, detailsBatimentsJoueur, tourismeStatiqueBatiment } from './batiments'
import { effetsAmenagementsVille, detailsAmenagementsJoueur } from './amenagements'
import { effetsAutresVille, detailsAutresJoueur } from './autres'
import { effetsRegime, effetsCulturePays, detailCulturePays } from './regimes'
import { effetsFaction } from './factions'
import { citesLibresDe, detailCiteLibre } from './citesLibres'
import { consommationsPays, consommationsVille, nomRang } from './habitations'

export interface ProductionDetail {
  /** production de base (l'Été double la Nourriture, comme le moteur) */
  base: Record<string, number>
  /** gains d'habitants (titres × taxes — toutes ressources —, − consommation)
   *  × gainsCrediteStock */
  habitants: Record<string, number>
  /** effets automatiques des bâtiments */
  batiments: Record<string, number>
  /** effets des aménagements de terrain */
  amenagements: Record<string, number>
  /** lignes « Autres » des villes (ressource × nombre × bonus) */
  autres: Record<string, number>
  /** lois chiffrées du régime et règle de pays de la culture
   *  (engine/regimes.ts) : garnison de la loi, bonus de capitale… */
  regimesCultures: Record<string, number>
  /** consommations par tour des habitations (engine/habitations.ts) —
   *  négatives (ex. Cité : −10 Nourriture, −8 Or) */
  habitations: Record<string, number>
  /** bonus automatiques des règles de faction du peuple du joueur
   *  (engine/factions.ts — étape 3nonies) */
  faction: Record<string, number>
  /** taxes reçues des cités libres sous suzeraineté du joueur
   *  (engine/citesLibres.ts — étape 3decies) */
  citesLibres: Record<string, number>
  /** tribut de vassalité (négatif = payé, positif = reçu) */
  vassalite: Record<string, number>
  /** somme de tous les canaux */
  total: Record<string, number>
}

/** Gains bruts d'habitants d'un joueur, AVANT tribut de vassalité.
 *  calculerGainsPopulation est déterministe (le rng n'est pas consommé). */
function gainsBruts(state: GameState, p: Player): Record<string, number> {
  return calculerGainsPopulation(state, p, makeRng(1))
}

/** Production par tour détaillée d'un joueur, canal par canal.
 *  Reflète exactement les étapes du moteur (FinDeTour) : les valeurs
 *  affichées ici sont celles créditées au stock au prochain tour. */
export function productionDetaillee(state: GameState, p: Player, C: Cfg): ProductionDetail {
  const saison: GameState['saison'] = state.saison
  const coefGains = C.p.gainsCrediteStock
  const prelevement = C.p.vassalPrelevement

  // Base : production propre + double Nourriture en été (étape 3 du moteur)
  const base: Record<string, number> = {}
  for (const [res, rs] of Object.entries(p.resources)) {
    let v = rs.prod
    if (res === 'Nourriture' && saison === 'Été') v *= 2
    if (v !== 0) base[res] = v
  }

  // Habitants : gains propres (avant tribut) × coefficient de crédit
  const habitants: Record<string, number> = {}
  for (const [res, v] of Object.entries(gainsBruts(state, p))) {
    if (v !== 0) habitants[res] = v * coefGains
  }

  // Bâtiments + aménagements + autres : effets par tour (non taxés,
  // non prélevés par la vassalité)
  const batiments: Record<string, number> = {}
  const amenagements: Record<string, number> = {}
  const autres: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsBatimentsVille(ville, C))) {
      batiments[res] = (batiments[res] ?? 0) + v
    }
    for (const [res, v] of Object.entries(effetsAmenagementsVille(ville, saison, C.config))) {
      amenagements[res] = (amenagements[res] ?? 0) + v
    }
    for (const [res, v] of Object.entries(effetsAutresVille(ville))) {
      autres[res] = (autres[res] ?? 0) + v
    }
  }

  // Régimes & cultures : lois chiffrées du régime (ex. Socialisme :
  // +N Nourriture d'été par champ et rizière) + règle de pays de la
  // culture (ex. Communautarisme : +N Nourriture par habitation de
  // cette culture dans le monde) — étape 3septies du moteur.
  const regimesCultures: Record<string, number> = {}
  for (const [res, v] of Object.entries(effetsRegime(p, saison, C))) {
    regimesCultures[res] = (regimesCultures[res] ?? 0) + v
  }
  for (const [res, v] of Object.entries(effetsCulturePays(state, p, C))) {
    regimesCultures[res] = (regimesCultures[res] ?? 0) + v
  }

  // Vassalité : tribut payé au suzerain + tributs reçus des vassaux
  // (seuls les revenus d'habitants sont prélevés — étape 3bis du moteur)
  const vassalite: Record<string, number> = {}
  if (p.vassalDe != null) {
    const part = (gainsBruts(state, p)['Or'] ?? 0) * prelevement * coefGains
    if (part !== 0) vassalite['Or'] = (vassalite['Or'] ?? 0) - part
  }
  for (const q of state.players) {
    if (q.vassalDe !== p.n) continue
    const part = (gainsBruts(state, q)['Or'] ?? 0) * prelevement * coefGains
    if (part !== 0) vassalite['Or'] = (vassalite['Or'] ?? 0) + part
  }

  // Habitations : consommation par tour de chaque ville selon son type
  //  (Ville / Château) et son rang — étape 3octies du moteur.
  const habitations: Record<string, number> = {}
  for (const [res, v] of Object.entries(consommationsPays(p, C))) {
    if (v !== 0) habitations[res] = (habitations[res] ?? 0) + v
  }

  // Factions : bonus automatiques des règles de faction du peuple du
  //  joueur (2 règles de base + règle d'Âge II / III choisie) —
  //  étape 3nonies du moteur.
  const faction: Record<string, number> = {}
  for (const [res, v] of Object.entries(effetsFaction(state, p, C))) {
    if (v !== 0) faction[res] = v
  }

  // Cités libres : taxes versées par les cités sous suzeraineté du
  //  joueur (production nette, Chasseurs ×2 Nourriture) — étape
  //  3decies du moteur.
  const citesLibres: Record<string, number> = {}
  for (const cite of citesLibresDe(state)) {
    if (cite.suzerain !== p.n) continue
    for (const [res, v] of Object.entries(detailCiteLibre(cite, C).transfert)) {
      if (v !== 0) citesLibres[res] = (citesLibres[res] ?? 0) + v
    }
  }

  // Total
  const total: Record<string, number> = {}
  for (const canal of [base, habitants, batiments, amenagements, autres, regimesCultures, habitations, faction, citesLibres, vassalite]) {
    for (const [res, v] of Object.entries(canal)) {
      total[res] = (total[res] ?? 0) + v
    }
  }
  return { base, habitants, batiments, amenagements, autres, regimesCultures, habitations, faction, citesLibres, vassalite, total }
}

// ══════════════════════════════════════════════════════════════════════
//  PRODUCTION D'UNE VILLE (bas de son cadre, page « Pays »)
//  Ce que la ville produit par tour, canal par canal : bâtiments,
//  aménagements, lignes « Autres », villageois (titres × taxes −
//  consommation, × coefficient de crédit au stock) et consommation
//  par tour de son habitation (négative). La production de base du
//  pays, les lois de régime/culture et le tribut de vassalité sont
//  des canaux du PAYS, pas de la ville — ils ne figurent pas ici.
// ══════════════════════════════════════════════════════════════════════

export interface ProductionVilleDetail {
  /** effets automatiques des bâtiments de la ville */
  batiments: Record<string, number>
  /** effets des aménagements de terrain (saison pris en compte) */
  amenagements: Record<string, number>
  /** lignes « Autres » de la ville (ressource × nombre × bonus) */
  autres: Record<string, number>
  /** villageois (titres × taxes − consommation) × gainsCrediteStock */
  habitants: Record<string, number>
  /** consommation par tour de l'habitation (négative) */
  consoVille: Record<string, number>
  /** somme de tous les canaux de la ville */
  total: Record<string, number>
}

/** Production par tour d'UNE VILLE — affichée en bas de son cadre
 *  (page « Pays »). Reflète les étapes du moteur qui concernent la
 *  ville (bâtiments, aménagements, autres, habitants, habitations). */
export function productionVille(
  state: GameState, p: Player, ville: City, C: Cfg,
): ProductionVilleDetail {
  const saison: GameState['saison'] = state.saison
  const coef = C.p.gainsCrediteStock
  const batiments = effetsBatimentsVille(ville, C)
  const amenagements = effetsAmenagementsVille(ville, saison, C.config)
  const autres = effetsAutresVille(ville)
  const habitants: Record<string, number> = {}
  for (const [res, v] of Object.entries(detailGainsVille(state, p, ville, C).net)) {
    if (v !== 0) habitants[res] = v * coef
  }
  const consoVille = consommationsVille(ville, C)
  const total: Record<string, number> = {}
  for (const canal of [batiments, amenagements, autres, habitants, consoVille]) {
    for (const [res, v] of Object.entries(canal)) {
      total[res] = (total[res] ?? 0) + v
    }
  }
  return { batiments, amenagements, autres, habitants, consoVille, total }
}

/** Attrait migratoire d'une ville : Tourisme STATIQUE de ses bâtiments
 *  (ex. Chapelle +35, crédité à la construction — batiments.ts) PLUS le
 *  Tourisme produit par tour (tous canaux : Artistes de la ville…).
 *  C'est la pondération utilisée par la migration spontanée
 *  (paramètre migrationTourisme) et affichée en heatmap sous chaque
 *  ville (page « Pays »). */
export function attraitTouristiqueVille(
  state: GameState, p: Player, ville: City, C: Cfg = cfgOf(state.config),
): number {
  const statique = (ville.batiments ?? []).reduce(
    (somme, b) => somme + tourismeStatiqueBatiment(b, C), 0)
  const flux = Math.max(0, productionVille(state, p, ville, C).total['Tourisme'] ?? 0)
  return statique + flux
}

/** Attrait maximal parmi toutes les villes du monde — borne haute de la
 *  heatmap (une ville à 100 % est la plus attractive du monde). */
export function attraitMaxMonde(state: GameState): number {
  const C = cfgOf(state.config)
  let max = 0
  for (const q of state.players) {
    for (const v of q.villes) {
      max = Math.max(max, attraitTouristiqueVille(state, q, v, C))
    }
  }
  return max
}

// ══════════════════════════════════════════════════════════════════════
//  PROVENANCE DES APPORTS (encadré « Récap des ressources — origine de
//  chaque apport », page « Pays ») : pour chaque ressource, la liste
//  des origines de ses apports par tour (nom du bâtiment, village de
//  tel villageois, loi du régime, règle de pays, consommation…).
//  Les valeurs sont celles du prochain tour (calculées, étapes du
//  moteur FinDeTour) ; leur somme par canal égale ProductionDetail.
// ══════════════════════════════════════════════════════════════════════

/** Canal d'un apport (colonne du récap ressources). */
export type CanalApport =
  | 'Base' | 'Habitants' | 'Bâtiments' | 'Aménagements' | 'Autres'
  | 'Régimes & cultures' | 'Conso villes' | 'Cités libres' | 'Vassalité'

export interface ProvenanceApport {
  /** canal de l'apport (colonne du récap) */
  canal: CanalApport
  /** origine lisible : nom du bâtiment, « villageois de X », loi… */
  origine: string
  /** valeur par tour (négative = débit) */
  valeur: number
}

/** Pour chaque ressource, la liste des origines de ses apports par
 *  tour — une entrée par origine. Ressources sans apport : absentes. */
export function provenancesApports(
  state: GameState, p: Player, C: Cfg,
): Record<string, ProvenanceApport[]> {
  const saison: GameState['saison'] = state.saison
  const coef = C.p.gainsCrediteStock
  const prelevement = C.p.vassalPrelevement
  const out: Record<string, ProvenanceApport[]> = {}
  const push = (res: string, canal: CanalApport, origine: string, valeur: number) => {
    if (valeur === 0) return
    ;(out[res] ?? (out[res] = [])).push({ canal, origine, valeur })
  }

  // Base : production propre du pays (×2 Nourriture en été)
  for (const [res, rs] of Object.entries(p.resources)) {
    let v = rs.prod
    if (res === 'Nourriture' && saison === 'Été') v *= 2
    push(res, 'Base', res === 'Nourriture' && saison === 'Été'
      ? 'production propre du pays (×2 en été)' : 'production propre du pays', v)
  }

  // Habitants : villageois de chaque ville (titres × taxes − conso)
  for (const ville of p.villes) {
    const tg = detailGainsVille(state, p, ville, C)
    for (const [res, v] of Object.entries(tg.net)) {
      push(res, 'Habitants',
        `villageois de ${ville.nom} (titres × taxes — ${tg.habitants} hab.)`, v * coef)
    }
  }

  // Bâtiments (nom × villes qui le possèdent)
  for (const l of detailsBatimentsJoueur(p, C)) {
    for (const [res, v] of Object.entries(l.effets)) {
      push(res, 'Bâtiments',
        `${l.nom} (${l.villes.join(', ')})${l.remplacePar.length > 0 ? ' — remplacé' : ''}`, v)
    }
  }

  // Aménagements (saison prise en compte — Champ/Rizière : été seulement)
  for (const l of detailsAmenagementsJoueur(p, saison, C.config)) {
    for (const [res, v] of Object.entries(l.effets)) {
      push(res, 'Aménagements',
        `${l.nom} (${l.villes.join(', ')})${l.horsSaison ? ' — été seulement' : ''}`, v)
    }
  }

  // Autres (source × ressource)
  for (const l of detailsAutresJoueur(p)) {
    push(l.ressource, 'Autres',
      `${l.source || 'sans source'} (${l.villes.join(', ')}) : ${l.nombre} × ${l.bonus}`, l.effets)
  }

  // Régimes & cultures : loi du régime + règle de pays de la culture
  for (const [res, v] of Object.entries(effetsRegime(p, saison, C))) {
    push(res, 'Régimes & cultures', `loi du régime « ${p.regime} »`, v)
  }
  for (const d of detailCulturePays(state, p, C)) {
    push(d.res, 'Régimes & cultures',
      `règle de pays « ${p.culture} » : +${d.parVille} × ${d.nbVillesMonde} ville(s) de cette culture dans le monde (dont ${d.nbVillesPerso} chez toi)`, d.total)
  }

  // Consommation par tour des habitations (par ville, négative)
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(consommationsVille(ville, C))) {
      push(res, 'Conso villes', `${ville.nom} (${nomRang(ville.rang ?? '')})`, v)
    }
  }

  // Cités libres : taxes des cités sous suzeraineté du joueur
  for (const cite of citesLibresDe(state)) {
    if (cite.suzerain !== p.n) continue
    const d = detailCiteLibre(cite, C)
    for (const [res, v] of Object.entries(d.transfert)) {
      push(res, 'Cités libres',
        `taxes de ${cite.nom} (${d.habitants} hab., ${d.chasseurs} chasseur(s) : Nourriture ×2)`, v)
    }
  }

  // Vassalité : tribut payé au suzerain + tributs reçus des vassaux
  if (p.vassalDe != null) {
    const suz = state.players.find((q) => q.n === p.vassalDe)
    const part = (gainsBruts(state, p)['Or'] ?? 0) * prelevement * coef
    push('Or', 'Vassalité', `tribut payé à ${suz?.nom ?? '?'}`, -part)
  }
  for (const q of state.players) {
    if (q.vassalDe !== p.n) continue
    const part = (gainsBruts(state, q)['Or'] ?? 0) * prelevement * coef
    push('Or', 'Vassalité', `tribut reçu de ${q.nom}`, part)
  }

  return out
}
