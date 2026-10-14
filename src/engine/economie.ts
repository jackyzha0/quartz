// ══════════════════════════════════════════════════════════════════════
//  ÉCONOMIE — GAINS DE POPULATION (CalculerGainsPopulation)
//  Revenus par ville (titres, taxes, consommation) et facteur de taxes sur
//  les naissances. Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  RÈGLE DES TAXES : le niveau de taxes module la production en TOUTE
//  ressource générée par les habitants (Or, Science, Nourriture, Tourisme…),
//  pas seulement l'Or. La consommation de Nourriture n'est pas taxée.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import type { Rng } from './rng'
import { cfgOf, titreDef, type Cfg } from './gameData'
import { aMinistre } from './ministeres'

// ══════════════════════════════════════════════════════════════════════
//  GAINS DE POPULATION PAR VILLE (CalculerGainsPopulation)
//  Titres → Ressource1/Valeur1 + Ressource2/Valeur2, modulés par le niveau
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

export function calculerGainsPopulation(state: GameState, p: Player, rng: Rng): Record<string, number> {
  return gainsPopulationJoueur(state, p, cfgOf(state.config))
}

/** Gains nets de population d'un joueur, toutes villes (titres × taxes −
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

/** Gains bruts d'une ville (titres × taxes, moins la consommation),
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
 *    titres  : production brute des titres des habitants vivants,
 *    taxeMult: multiplicateur de taxes de la ville (toutes ressources),
 *    taxes   : production taxée (= titres × taxeMult),
 *    conso   : consommation de Nourriture (non taxée),
 *    net     : taxes − conso (ce qui est crédité au stock). */
export interface GainsVilleDetail {
  habitants: number
  titres: Record<string, number>
  taxeMult: number
  taxes: Record<string, number>
  conso: Record<string, number>
  net: Record<string, number>
}

export function detailGainsVille(state: GameState, p: Player, ville: City, C: Cfg): GainsVilleDetail {
  const pop = state.population[p.n] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
  // Production brute des titres des habitants vivants de la ville
  const titres: Record<string, number> = {}
  for (const c of vivants) {
    if (!c.titre) continue
    const td = titreDef(c.titre, C.config)
    if (!td) continue
    if (td.ressource1 && td.valeur1 !== 0) {
      titres[td.ressource1] = (titres[td.ressource1] ?? 0) + td.valeur1
    }
    if (td.ressource2 && td.valeur2 !== 0) {
      titres[td.ressource2] = (titres[td.ressource2] ?? 0) + td.valeur2
    }
  }
  // Taxes : le niveau module TOUTES les ressources produites par les habitants.
  // Grand Chambellan (ministère, refonte 2026-10-14) : +10 % sur toutes
  // les taxes reçues — multiplicateur appliqué ici (cumulables).
  const taxeMult =
    facteurTaxes(ville, C) * (aMinistre(state, p, 'Grand Chambellan') ? 1.1 : 1)
  const taxes: Record<string, number> = {}
  for (const [res, v] of Object.entries(titres)) {
    const tv = v * taxeMult
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
  return { habitants: vivants.length, titres, taxeMult, taxes, conso, net }
}

/** Facteur de taxes sur la conception (Faible ×1,5 / Moyenne ×1 / Forte ×0,5). */
export function taxBirthFactor(ville: City | undefined, C: Cfg = cfgOf()): number {
  if (!ville) return 1
  return ville.taxes === 'Faible' ? C.p.taxNaissFaibles : ville.taxes === 'Forte' ? C.p.taxNaissHautes : 1
}

// ══════════════════════════════════════════════════════════════════════
//  IMPÔTS MANUELS — GÉNÉRATION HORS FIN DE TOUR (retour Thibaut 2026-10-14)
//  Boutons « Générer l'impôt » : créditer AUSSI SOUVENT QUE VOULU l'impôt
//  que la population (ou les vassaux) produit sur UN tour, sans attendre
//  la fin de tour. Mêmes formules que le moteur (canal « Habitants » du
//  récap : titres × taxes − consommation ; tribut de vassalité sur l'Or).
// ══════════════════════════════════════════════════════════════════════

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
