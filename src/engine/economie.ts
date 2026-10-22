// ══════════════════════════════════════════════════════════════════════
//  ÉCONOMIE — GAINS DE POPULATION (CalculerGainsPopulation)
//  Revenus par ville (metiers, taxes, consommation) et facteur de taxes sur
//  les naissances. Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  RÈGLE DES TAXES : le niveau de taxes module la production en TOUTE
//  ressource générée par les habitants (Or, Science, Nourriture, Tourisme…),
//  pas seulement l'Or. La consommation de Nourriture n'est pas taxée.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import { cfgOf, metierDef, type Cfg } from './gameData'
import { aMinistre } from './ministeres'
import { gouverneurDeVille } from './metiers'

// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Metiers → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par le niveau
//  de taxes de la ville (sur TOUTES les ressources), puis consommation de
//  1 Nourriture par habitant vivant (non taxée).
// ══════════════════════════════════════════════════════════════════════

/** Multiplicateur de taxes d'une ville pour la production des habitants
 *  (toutes ressources) : Faible ×taxOrFaibles / Forte ×taxOrHautes. */
export function facteurTaxes(ville: City, C: Cfg): number {
  if (ville.taxes === 'Faible') return C.p.taxOrFaibles
  if (ville.taxes === 'Forte') return C.p.taxOrHautes
  return 1
}

export function calculerGainsPopulation(state: GameState, p: Player): Record<string, number> {
  return gainsPopulationJoueur(state, p, cfgOf(state.config))
}

/** Gains nets de population d'un joueur, toutes villes (métiers × taxes −
 *  consommation). Partagé entre le moteur de fin de tour et les impôts
 *  manuels (génération hors fin de tour). */
function gainsPopulationJoueur(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const totals: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(gainsVilleBruts(state, p, ville, C))) {
      totals[res] = (totals[res] ?? 0) + v
    }
  }
  return totals
}

/** Gains bruts d'une ville (métiers × taxes, moins la consommation),
 *  cœur de calcul partagé entre le moteur et le détail affiché. */
function gainsVilleBruts(state: GameState, p: Player, ville: City, C: Cfg): Record<string, number> {
  const detail = detailGainsVille(state, p, ville, C)
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(detail.net)) {
    if (v !== 0) out[res] = v
  }
  return out
}

/** Détail des gains d'une ville, canal par canal (affiché en bas de la
 *  carte de la ville : « ce que les taxes rapportent »).
 *    metiers  : production brute des metiers des habitants vivants,
 *    taxeMult: multiplicateur de taxes de la ville (toutes ressources),
 *    taxes   : production taxée (= metiers × taxeMult),
 *    conso   : consommation de Nourriture (non taxée),
 *    net     : taxes − conso (ce qui est crédité au stock). */
export interface GainsVilleDetail {
  habitants: number
  metiers: Record<string, number>
  taxeMult: number
  /** Bonus de taxe ADDITIF par ressource (vague 3a, rework métiers
   *  & emplacements 2026-10-21) : Gouverneur +10 % sur toutes les
   *  ressources, Professeur +10 % Science, Banquier +10 % Or,
   *  Troubadour +10 % Tourisme — les bonus se CUMULENT de façon
   *  additive (ex. Gouverneur + Professeur = +20 % sur la Science). */
  bonusTaxes: Record<string, number>
  taxes: Record<string, number>
  conso: Record<string, number>
  net: Record<string, number>
}

export function detailGainsVille(state: GameState, p: Player, ville: City, C: Cfg): GainsVilleDetail {
  const pop = state.population[p.n] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
  // Production brute des metiers des habitants vivants de la ville.
  // Vague 3a : les métiers marqués `ete` (Fermier) ne produisent
  //  qu'en saison d'Été ; Sans-emploi (metier null) ne produit rien.
  const metiers: Record<string, number> = {}
  // Vague 3b (bâtiment tier 1, 2026-10-22) : Ponton (ville côtière)
  //  — chaque Pêcheur de la ville produit +0,5 Bétail par tour,
  //  AVANT le calcul des taxes (taxé comme les autres gains).
  const ponton = (ville.batiments ?? []).includes('Ponton')
  for (const c of vivants) {
    if (!c.metier) continue
    const td = metierDef(c.metier, C.config)
    if (!td) continue
    if (td.ete && state.saison !== 'Été') continue
    if (ponton && c.metier === 'Pêcheur') {
      metiers['Bétail'] = (metiers['Bétail'] ?? 0) + 0.5
    }
    if (td.ressource1 && td.valeur1 !== 0) {
      metiers[td.ressource1] = (metiers[td.ressource1] ?? 0) + td.valeur1
    }
    if (td.ressource2 && td.valeur2 !== 0) {
      metiers[td.ressource2] = (metiers[td.ressource2] ?? 0) + td.valeur2
    }
  }
  // Taxes : le niveau module TOUTES les ressources produites par les habitants.
  // Grand Chambellan (ministère, refonte 2026-10-14) : +10 % sur toutes
  // les taxes reçues — multiplicateur appliqué ici (cumulables).
  // Vague 3a (rework métiers, arbitrage 2026-10-21) : les bonus de taxe
  //  sont ADDITIFS par ressource — Gouverneur +10 % (toutes ressources),
  //  Professeur +10 % Science, Banquier +10 % Or, Troubadour +10 %
  //  Tourisme (présence d'au moins un titulaire vivant dans la ville ;
  //  ex. Gouverneur + Professeur = +20 % sur la Science).
  const taxeMult =
    facteurTaxes(ville, C)
    * (aMinistre(state, p, 'Grand Chambellan') ? 1.1 : 1)
  const bonusTaxes: Record<string, number> = {}
  const ajouteBonus = (res: string, part: number) => {
    bonusTaxes[res] = (bonusTaxes[res] ?? 0) + part
  }
  if (gouverneurDeVille(state, p, ville.nom, C)) {
    for (const res of Object.keys(metiers)) ajouteBonus(res, 0.1)
  }
  // Vague 3a (cohérence) : les bonus ne portent que les ressources
  //  EFFECTIVEMENT produites dans la ville (comme le Gouverneur) —
  //  un Troubadour sans production de Tourisme n'ouvre aucune clé.
  if (C.p.metierBanquier && vivants.some((c) => c.metier === C.p.metierBanquier) && metiers['Or'] !== undefined) ajouteBonus('Or', 0.1)
  if (C.p.metierProfesseur && vivants.some((c) => c.metier === C.p.metierProfesseur) && metiers['Science'] !== undefined) ajouteBonus('Science', 0.1)
  if (C.p.metierTroubadour && vivants.some((c) => c.metier === C.p.metierTroubadour) && metiers['Tourisme'] !== undefined) ajouteBonus('Tourisme', 0.1)
  const taxes: Record<string, number> = {}
  for (const [res, v] of Object.entries(metiers)) {
    const tv = v * taxeMult * (1 + (bonusTaxes[res] ?? 0))
    if (tv !== 0) taxes[res] = tv
  }
  // Consommation (non taxée, appliquée après)
  const conso: Record<string, number> = {}
  const consoNourr = C.p.consoNourrParHab * vivants.length
  if (consoNourr !== 0) conso['Nourriture'] = -consoNourr
  // Net = taxes − conso
  const net: Record<string, number> = {}
  for (const [res, v] of Object.entries(taxes)) net[res] = (net[res] ?? 0) + v
  for (const [res, v] of Object.entries(conso)) net[res] = (net[res] ?? 0) + v
  for (const k of Object.keys(net)) if (net[k] === 0) delete net[k]
  return { habitants: vivants.length, metiers, taxeMult, bonusTaxes, taxes, conso, net }
}

/** Facteur de taxes sur la conception (Faible ×taxNaissFaibles / Moyenne ×1 / Forte ×taxNaissHautes — ±25 %, marqueur (z)). */
export function taxBirthFactor(ville: City | undefined, C: Cfg = cfgOf()): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? C.p.taxNaissFaibles : ville.taxes === 'Forte' ? C.p.taxNaissHautes : 1
}

// ══════════════════════════════════════════════════════════════════════
//  IMPÔTS MANUELS — GÉNÉRATION HORS FIN DE TOUR (retour Thibaut 2026-10-14)
//  Boutons « Générer l'impôt » : créditer AUSSI SOUVENT QUE VOULU l'impôt
//  que la population (ou les vassaux) produit sur UN tour, sans attendre
//  la fin de tour. Mêmes formules que le moteur (canal « Habitants » du
//  récap : métiers × taxes − consommation ; tribut de vassalité sur l'Or).
// ══════════════════════════════════════════════════════════════════════

/**
 * NOURRITURE DU BÉTAIL (revue valeurs 2026-10-16) : chaque unité de
 *  Bétail en stock rapporte 4 Nourriture par tour — le revenu des
 *  troupeaux (Pâturages). Crédité à chaque fin de tour via le canal
 *  « Autres » du récap.
 */
export function nourritureBetail(p: Player): number {
  const betail = p.resources['Bétail']?.stock ?? 0
  return Math.max(0, betail) * 4
}

/** Impôt que la population de p produit sur UN tour (canal « Habitants » :
 *  taxes − consommation, × gainsCrediteStock comme au fin de tour). */
export function impotPopulation(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(gainsPopulationJoueur(state, p, C))) {
    const cv = v * C.p.gainsCrediteStock
    if (cv !== 0) out[res] = cv
  }
  return out
}

/** Impôt que chaque vassal de p lui reverse sur UN tour (part
 *  vassalPrelevement de l'Or gagné par les habitants du vassal). */
export interface ImpotVassal {
  vassal: string
  montant: number
}

export function impotsVassaux(state: GameState, p: Player, C: Cfg): ImpotVassal[] {
  const out: ImpotVassal[] = []
  for (const v of state.players) {
    if (v.vassalDe !== p.n || p.vassalDe === v.n) continue // serment croisé ignoré
    const gains = gainsPopulationJoueur(state, v, C)
    const part = (gains['Or'] ?? 0) * C.p.vassalPrelevement
    if (part !== 0) out.push({ vassal: v.nom, montant: part })
  }
  return out
}

const fmtImp = (v: number) => Math.round(v * 10) / 10

/** Crédite l'impôt de la population de p, `fois` fois, au stock + log
 *  Système. Retourne le récap crédité (null si rien à créditer). */
export function genererImpotPopulation(
  state: GameState, p: Player, C: Cfg, fois: number,
): Record<string, number> | null {
  if (fois <= 0) return null
  const impot = impotPopulation(state, p, C)
  if (Object.keys(impot).length === 0) {
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `💰 Impôt de la population : rien à générer (aucun gain d'habitants pour ${p.nom}).`,
    })
    return null
  }
  const credite: Record<string, number> = {}
  for (const [res, v] of Object.entries(impot)) {
    const rs = p.resources[res]
    if (!rs) continue
    const total = v * fois
    rs.stock += total
    credite[res] = total
  }
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `💰 Impôt de la population généré ×${fois} pour ${p.nom} : ` +
      Object.entries(credite).map(([r, v]) => `${fmtImp(v)} ${r}`).join(', ') +
      ` (impôt d'un tour × ${fois}).`,
  })
  return credite
}

/** Crédite l'impôt reçu des vassaux de p, `fois` fois, au stock d'Or +
 *  log Système. Retourne le total crédité (null si aucun vassal ne
 *  reverse d'Or). */
export function genererImpotVassaux(
  state: GameState, p: Player, C: Cfg, fois: number,
): number | null {
  if (fois <= 0) return null
  const parts = impotsVassaux(state, p, C)
  if (parts.length === 0) {
    state.log.push({
      turn: state.turn, type: 'Système', joueur: p.n,
      texte: `🤝 Impôt des vassaux : rien à générer (aucun vassal de ${p.nom} ne reverse d'Or).`,
    })
    return null
  }
  const total = parts.reduce((s2, x) => s2 + x.montant, 0) * fois
  const rs = p.resources['Or']
  if (rs) rs.stock += total
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🤝 Impôt des vassaux généré ×${fois} pour ${p.nom} : +${fmtImp(total)} Or (` +
      parts.map((x) => `${x.vassal} : ${fmtImp(x.montant)}`).join(', ') +
      ` par tour × ${fois}).`,
  })
  return total
}
