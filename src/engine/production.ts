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
import { effetsAmenagementsVille, effetsNourrEteAmenagementsVille, detailsAmenagementsJoueur } from './amenagements'
import { effetsAutresVille, effetsNourrEteAutresVille, estNourrEte, detailsAutresJoueur } from './autres'
import { effetsRegime, effetsCulturePays, detailCulturePays } from './regimes'
import { effetsFaction } from './factions'
import { citesLibresDe, detailCiteLibre } from './citesLibres'
import { consommationsPays, consommationsVille, nomRang } from './habitations'
import { bonusProximite } from './villes'
import { effetsCommerceJoueur, detailCommerceJoueur } from './commerce'
import { portefeuillesDuJoueur } from './ministeres'

export interface ProductionDetail {
  /** production de base du pays (stockée dans resources[r].prod) — la
   *  nourriture générale n'est jamais doublée : la nourriture d'été est
   *  une production séparée (canal nourrEte) */
  base: Record<string, number>
  /** gains d'habitants (titres × taxes — toutes ressources —, − consommation)
   *  × gainsCrediteStock */
  habitants: Record<string, number>
  /** effets automatiques des bâtiments */
  batiments: Record<string, number>
  /** effets des aménagements de terrain (HORS production d'été) */
  amenagements: Record<string, number>
  /** nourriture d'ÉTÉ (ligne « Nourr - été » du classeur : aménagements
   *  Champ/Rizière + lignes « Autres » « Nourr - été ») — créditée au
   *  stock de Nourriture uniquement en été (0 en hiver) */
  nourrEte: Record<string, number>
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
  /** routes commerciales des marchands (engine/commerce.ts — étape
   *  3terdecies : +marchandOrTour Or pour chaque joueur relié + copie
   *  de l'aménagement entier de la ville ciblée, saisonnière (u)) */
  commerce: Record<string, number>
  /** bonus de proximité des villes (marqueur (y) : Rivière +12, Mer
   *  +7 Nourriture/tour par défaut — engine/villes.ts bonusProximite) */
  proximite: Record<string, number>
  /** effets automatiques par tour des portefeuilles ministériels
   *  (Trésorier +5 Or, Grand Précepteur +1 Science… — engine/
   *  ministeres.ts, cumulables) — canal « Ministères » du récap. */
  ministeres: Record<string, number>
  /** Entretien des armées : canal vide (règle du classeur — prix payé
   *  UNE FOIS à la levée, pas d'entretien par tour). */
  armees: Record<string, number>
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

  // Base : production propre du pays (la nourriture générale n'est
  //  JAMAIS doublée — l'été n'ajoute que la production « Nourr - été »,
  //  à part, ci-dessous).
  const base: Record<string, number> = {}
  for (const [res, rs] of Object.entries(p.resources)) {
    if (rs.prod !== 0) base[res] = rs.prod
  }

  // Habitants : gains propres (avant tribut) × coefficient de crédit
  const habitants: Record<string, number> = {}
  for (const [res, v] of Object.entries(gainsBruts(state, p))) {
    if (v !== 0) habitants[res] = v * coefGains
  }

  // Bâtiments + aménagements (hors été) + autres : effets par tour
  // (non taxés, non prélevés par la vassalité)
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

  // Nourr - été : production de NOURRITURE D'ÉTÉ (ligne « Nourr - été »
  //  du classeur) — aménagements d'été (Champ, Rizière) + lignes
  //  « Autres » « Nourr - été ». Créditée au stock UNIQUEMENT en été
  //  (0 en hiver) ; ajoutée à la nourriture générale, jamais doublée.
  const nourrEte: Record<string, number> = {}
  if (saison === 'Été') {
    for (const ville of p.villes) {
      for (const [res, v] of Object.entries(effetsNourrEteAmenagementsVille(ville, C.config))) {
        nourrEte[res] = (nourrEte[res] ?? 0) + v
      }
      for (const [res, v] of Object.entries(effetsNourrEteAutresVille(ville))) {
        nourrEte[res] = (nourrEte[res] ?? 0) + v
      }
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

  // (Proximité : agrégée plus bas, juste avant le total.)

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
  for (const [res, v] of Object.entries(consommationsPays(p, C, state))) {
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

  // Commerce : routes commerciales des marchands — routes possédées
  //  (Or + copie) et routes entrantes (Or passif), saisonnières.
  const commerce: Record<string, number> = {}
  for (const [res, v] of Object.entries(effetsCommerceJoueur(state, p, saison, C))) {
    if (v !== 0) commerce[res] = v
  }

  // Proximité (marqueur (y)) : bonus de Nourriture par tour de la
  //  proximité de chaque ville (Rivière / Mer — engine/villes.ts),
  //  non taxé, non prélevé.
  const proximite: Record<string, number> = {}
  for (const ville of p.villes) {
    const b = bonusProximite(ville, C)
    if (b !== 0) proximite['Nourriture'] = (proximite['Nourriture'] ?? 0) + b
  }

  // Ministères : effets par tour des portefeuilles (Trésorier +5 Or,
  //  Grand Précepteur +1 Science, Grand prévôt +1 Fer — cumulables,
  //  même logique qu'appliquerEffetsMinisteres mais SANS créditer
  //  le stock : vue pure pour le récap « prochain tour »).
  const ministeres: Record<string, number> = {}
  for (const m of portefeuillesDuJoueur(state, p)) {
    if (m === 'Trésorier') ministeres['Or'] = (ministeres['Or'] ?? 0) + 5
    else if (m === 'Grand Précepteur') ministeres['Science'] = (ministeres['Science'] ?? 0) + 1
    else if (m === 'Grand prévôt') ministeres['Fer'] = (ministeres['Fer'] ?? 0) + 1
  }
  // Armées : entretien déjà payé à la LEVÉE (règle du classeur,
  //  retour Thibaut : pas d'entretien par tour) — canal vide ici.
  const armees: Record<string, number> = {}
  // Total
  const total: Record<string, number> = {}
  for (const canal of [base, habitants, batiments, amenagements, nourrEte, autres, regimesCultures, habitations, faction, citesLibres, commerce, proximite, vassalite, ministeres, armees]) {
    for (const [res, v] of Object.entries(canal)) {
      total[res] = (total[res] ?? 0) + v
    }
  }
  return { base, habitants, batiments, amenagements, nourrEte, autres, regimesCultures, habitations, faction, citesLibres, commerce, proximite, vassalite, ministeres, armees, total }
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
  /** effets des aménagements de terrain, HORS production d'été */
  amenagements: Record<string, number>
  /** nourriture d'ÉTÉ de la ville (ligne « Nourr - été » du classeur :
   *  aménagements Champ/Rizière + lignes « Autres » « Nourr - été ») —
   *  créditée uniquement en été (0 en hiver) */
  nourrEte: Record<string, number>
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
  // Nourr - été de la ville : production d'été (Champ, Rizière…) +
  // lignes « Autres » « Nourr - été » — créditée uniquement en été.
  const nourrEte: Record<string, number> = {}
  if (saison === 'Été') {
    for (const src of [effetsNourrEteAmenagementsVille(ville, C.config), effetsNourrEteAutresVille(ville)]) {
      for (const [res, v] of Object.entries(src)) {
        nourrEte[res] = (nourrEte[res] ?? 0) + v
      }
    }
  }
  const autres = effetsAutresVille(ville)
  const habitants: Record<string, number> = {}
  for (const [res, v] of Object.entries(detailGainsVille(state, p, ville, C).net)) {
    if (v !== 0) habitants[res] = v * coef
  }
  const consoVille = consommationsVille(ville, C)
  const total: Record<string, number> = {}
  for (const canal of [batiments, amenagements, nourrEte, autres, habitants, consoVille]) {
    for (const [res, v] of Object.entries(canal)) {
      total[res] = (total[res] ?? 0) + v
    }
  }
  return { batiments, amenagements, nourrEte, autres, habitants, consoVille, total }
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
  const statique = [...(ville.batiments ?? []), ...(ville.amenagements ?? [])].reduce(
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
  | 'Base' | 'Habitants' | 'Bâtiments' | 'Aménagements' | 'Nourr - été' | 'Autres'
  | 'Régimes & cultures' | 'Conso villes' | 'Progrès' | 'Cités libres' | 'Commerce' | 'Proximité' | 'Vassalité'

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

  // Base : production propre du pays (nourriture générale, jamais doublée)
  for (const [res, rs] of Object.entries(p.resources)) {
    if (rs.prod !== 0) push(res, 'Base', 'production propre du pays', rs.prod)
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

  // Aménagements (HORS production d'été — canal séparé « Nourr - été »)
  for (const l of detailsAmenagementsJoueur(p, saison, C.config)) {
    if (l.eteSeulement) continue // → canal « Nourr - été »
    for (const [res, v] of Object.entries(l.effets)) {
      push(res, 'Aménagements',
        `${l.nom} (${l.villes.join(', ')})`, v)
    }
  }

  // Nourr - été : production de NOURRITURE D'ÉTÉ (ligne « Nourr - été »
  //  du classeur) — aménagements d'été (Champ, Rizière) et lignes
  //  « Autres » de ressource « Nourr - été ». Créditée uniquement en
  //  été (0 en hiver), en plus de la nourriture générale.
  if (saison === 'Été') {
    for (const l of detailsAmenagementsJoueur(p, saison, C.config)) {
      if (!l.eteSeulement) continue
      for (const [res, v] of Object.entries(l.effets)) {
        push(res, 'Nourr - été',
          `${l.nom} (${l.villes.join(', ')}) — nourriture d'été, créditée en été`, v)
      }
    }
    for (const l of detailsAutresJoueur(p)) {
      if (!estNourrEte(l.ressource)) continue
      push('Nourriture', 'Nourr - été',
        `${l.source || 'sans source'} (${l.villes.join(', ')}) : ${l.nombre} × ${l.bonus} — nourriture d'été`, l.effets)
    }
  }

  // Autres (source × ressource) — hors lignes « Nourr - été » (canal
  //  dédié, été seulement)
  for (const l of detailsAutresJoueur(p)) {
    if (estNourrEte(l.ressource)) continue
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

  // Commerce : routes commerciales des marchands — possédées (Or +
  //  copie d'un aménagement de la ville ciblée) et entrantes (Or passif).
  for (const d of detailCommerceJoueur(state, p, saison, C)) {
    for (const [res, v] of Object.entries(d.effets)) {
      push(res, 'Commerce', d.origine, v)
    }
  }

  // Proximité : bonus de Nourriture des villes au bord d'une rivière
  //  ou de la mer (marqueur (y) — engine/villes.ts bonusProximite),
  //  non taxé, non prélevé.
  for (const ville of p.villes) {
    const b = bonusProximite(ville, C)
    if (b !== 0) push('Nourriture', 'Proximité',
      `${ville.nom} (${ville.proximite === 'Mer' ? 'bord de mer' : 'bord de rivière'})`, b)
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
