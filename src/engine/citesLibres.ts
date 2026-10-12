// ══════════════════════════════════════════════════════════════════════
//  CITÉS LIBRES — POPULATION, GARNISON ET TAXES AU SUZERAIN (3decies)
//  Une cité libre est une habitation sans joueur (règle « Cités libres »
//  du référentiel). Elle possède sa PROPRE POPULATION : ses habitants
//  ont des titres comme ceux d'une ville de joueur, avec une règle
//  propre aux cités libres — les Chasseurs y produisent le DOUBLE de
//  Nourriture.
//  Garnison (règle du référentiel) : 100 + 40 par rang de pays du
//  joueur ayant le plus haut rang (valeur d'état, batailles manuelles).
//  Suzerain : lorsqu'un joueur devient suzerain de la cité (3
//  émissaires — plateau, suivi manuel dans l'onglet « 🗼 Cités
//  libres »), la cité lui verse ses taxes à chaque fin de tour : sa
//  production nette (titres × niveau de taxes de la cité, moins la
//  consommation de ses habitants), plafonnée à 0 par ressource —
//  canal « Cités libres » du récap ressources.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, CiteLibre, GameState, Player, TaxeNiveau } from './types'
import { makeRng } from './rng'
import { cfgOf, peupleDef, titreDef, type Cfg } from './gameData'
import { computeAgeMax } from './sante'
import { rangPaysNiveau } from './factions'

// ── État ──────────────────────────────────────────────────────────────

/** Cités libres de la partie (champ optionnel : vieilles sauvegardes → []). */
export function citesLibresDe(state: GameState): CiteLibre[] {
  return state.citesLibres ?? []
}

/** Garnison d'une cité libre (règle du référentiel) : 100 + 40 par rang
 *  de pays du joueur ayant le plus haut rang. */
export function garnisonCiteLibre(state: GameState, C: Cfg): number {
  let maxRang = 0
  for (const p of state.players) maxRang = Math.max(maxRang, rangPaysNiveau(p, C))
  return 100 + 40 * maxRang
}

/** Multiplicateur de taxes d'une cité libre (comme une ville de joueur :
 *  module TOUTES les ressources produites par ses habitants). */
export function facteurTaxesCite(cite: CiteLibre, C: Cfg): number {
  const t = cite.taxes ?? 'Moyenne'
  if (t === 'Faible') return C.p.taxOrFaibles
  if (t === 'Forte') return C.p.taxOrHautes
  return 1
}

/** Émissaires d'un joueur auprès d'une cité (suivi manuel du plateau). */
export function emissairesDe(cite: CiteLibre, joueur: number): number {
  return cite.emissaires?.[joueur] ?? 0
}

/** Cités libres dont un joueur est le suzerain. */
export function citesSuzerainesDe(state: GameState, p: Player): CiteLibre[] {
  return citesLibresDe(state).filter((c) => c.suzerain === p.n)
}

// ── Gains de la population de la cité (chasseurs ×2 Nourriture) ────────

/** Détail des gains d'une cité libre, canal par canal :
 *    titres     : production brute des titres des habitants vivants —
 *                 les Chasseurs produisent le DOUBLE de Nourriture,
 *    taxeMult   : multiplicateur de taxes de la cité,
 *    taxes      : production taxée (= titres × taxeMult),
 *    conso      : consommation des habitants (négative),
 *    net        : taxes − conso (peut être négatif),
 *    transfert  : net plafonné à 0 par ressource, × gainsCrediteStock
 *                 — ce que le suzerain reçoit réellement. */
export interface DetailCiteLibre {
  habitants: number
  chasseurs: number
  titres: Record<string, number>
  taxeMult: number
  taxes: Record<string, number>
  conso: Record<string, number>
  net: Record<string, number>
  transfert: Record<string, number>
}

/** Production brute des titres des habitants vivants d'une cité libre.
 *  Règle propre aux cités libres : les Chasseurs produisent le DOUBLE
 *  de Nourriture (les autres ressources du titre sont inchangées). */
export function detailCiteLibre(cite: CiteLibre, C: Cfg): DetailCiteLibre {
  const vivants = (cite.population ?? []).filter((c) => c.statut !== 'Décédé')
  const titres: Record<string, number> = {}
  let chasseurs = 0
  for (const c of vivants) {
    if (!c.titre) continue
    const td = titreDef(c.titre, C.config)
    if (!td) continue
    const chass = c.titre === C.p.titreChasseur
    if (chass) chasseurs++
    if (td.ressource1 && td.valeur1 !== 0) {
      const v = chass && td.ressource1 === 'Nourriture' ? td.valeur1 * 2 : td.valeur1
      titres[td.ressource1] = (titres[td.ressource1] ?? 0) + v
    }
    if (td.ressource2 && td.valeur2 !== 0) {
      const v = chass && td.ressource2 === 'Nourriture' ? td.valeur2 * 2 : td.valeur2
      titres[td.ressource2] = (titres[td.ressource2] ?? 0) + v
    }
  }
  // Taxes de la cité : le niveau module TOUTES les ressources
  const taxeMult = facteurTaxesCite(cite, C)
  const taxes: Record<string, number> = {}
  for (const [res, v] of Object.entries(titres)) {
    const tv = v * taxeMult
    if (tv !== 0) taxes[res] = tv
  }
  // Consommation des habitants (non taxée)
  const conso: Record<string, number> = {}
  const consoNourr = C.p.consoNourrParHab * vivants.length
  if (consoNourr !== 0) conso['Nourriture'] = -consoNourr
  // Net = taxes − conso
  const net: Record<string, number> = {}
  for (const [res, v] of Object.entries(taxes)) net[res] = (net[res] ?? 0) + v
  for (const [res, v] of Object.entries(conso)) net[res] = (net[res] ?? 0) + v
  for (const k of Object.keys(net)) if (net[k] === 0) delete net[k]
  // Transfert au suzerain : parties positives seulement, × coefficient
  // de crédit au stock (comme les gains d'habitants d'un joueur).
  const transfert: Record<string, number> = {}
  for (const [res, v] of Object.entries(net)) {
    if (v <= 0) continue
    const t = v * C.p.gainsCrediteStock
    if (t !== 0) transfert[res] = t
  }
  return { habitants: vivants.length, chasseurs, titres, taxeMult, taxes, conso, net, transfert }
}

/** Taxes que les cités libres sous suzeraineté d'un joueur lui versent
 *  par tour (somme des transferts — vue « prochain tour » du récap). */
export function taxesCitesLibresRecues(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  for (const cite of citesSuzerainesDe(state, p)) {
    for (const [res, v] of Object.entries(detailCiteLibre(cite, C).transfert)) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

// ── Étape moteur (3decies) : transfert réel au suzerain ────────────────

/** Étape moteur : chaque cité libre possédant un suzerain lui verse ses
 *  taxes (production nette plafonnée aux parties positives, × coefficient
 *  de crédit au stock). Crédite les stocks et journalise ; retourne les
 *  apports par joueur (canal « Cités libres » du récap ressources). */
export function appliquerTaxesCitesLibres(
  state: GameState, C: Cfg = cfgOf(state.config),
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {}
  for (const cite of citesLibresDe(state)) {
    const n = cite.suzerain
    if (n == null) continue
    const suz = state.players.find((q) => q.n === n)
    if (!suz) continue // suzerain disparu (joueur absent de la partie)
    const d = detailCiteLibre(cite, C)
    const gains = out[suz.n] ?? (out[suz.n] = {})
    const parts: string[] = []
    for (const [res, v] of Object.entries(d.transfert)) {
      if (v === 0) continue
      gains[res] = (gains[res] ?? 0) + v
      const rs = suz.resources[res]
      if (rs) rs.stock += v
      parts.push(`+${Math.round(v * 10) / 10} ${res}`)
    }
    if (parts.length > 0) {
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: suz.n,
        texte: `🗼 Cités libres — ${suz.nom} reçoit les taxes de ${cite.nom} (${d.habitants} hab., ${d.chasseurs} chasseur(s) : Nourriture ×2) : ${parts.join(', ')}.`,
      })
    }
  }
  return out
}

// ── Population : ajout manuel d'habitants ──────────────────────────────

/** Ajoute des habitants à une cité libre (adultes, titre Chasseur par
 *  défaut, culture de la cité). Noms tirés dans une banque de noms de
 *  peuple au hasard (graine d'état → déterministe). Comme pour les
 *  villes de joueur, l'ajout est manuel : les naissances, mariages et
 *  décès des cités libres se jouent au plateau. */
export function ajouterHabitantsCiteLibre(
  state: GameState, cite: CiteLibre, nb: number, C: Cfg = cfgOf(state.config),
): number {
  if (nb <= 0) return 0
  const rng = makeRng(state.rngState)
  const pop = cite.population ?? (cite.population = [])
  const peuple = C.peuples.length > 0
    ? peupleDef(rng.pick(C.peuples), C.config)
    : undefined
  const banque = peuple ?? C.banquesNoms[0]
  const culture = cite.culture || C.config.cultures[0]?.nom || ''
  let ajoutes = 0
  for (let i = 0; i < nb; i++) {
    const sexe: 'M' | 'F' = rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F'
    // traits : comme la génération initiale (1er systématique, 2e 50 %, 3e 30 %)
    const traits: [string, string, string] = ['', '', '']
    const draw = (exclus: string[]): string => {
      const pool = C.traits.filter((td) => td.weight > 0 && !exclus.includes(td.name))
      return pool.length === 0 ? '' : rng.pickWeighted(pool, (td) => td.weight).name
    }
    traits[0] = draw([])
    if (traits[0]) traits[1] = rng.chance(0.5) ? draw([traits[0]]) : ''
    if (traits[1] && rng.chance(0.3)) traits[2] = draw([traits[0], traits[1]])
    const c: Character = {
      id: `cl_${cite.nom}_${state.turn}_${pop.length + 1}_${i}`,
      nom: rng.pick(banque.noms),
      prenom: sexe === 'M' ? rng.pick(banque.prenomsM) : rng.pick(banque.prenomsF),
      dynastie: C.p.dynastieRoturier,
      sexe,
      age: rng.int(C.p.adultAge, Math.max(C.p.adultAge + 1, 60)),
      culture,
      ville: cite.nom,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
      traits,
      statut: 'Sain',
      mariage: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      titre: C.p.titreChasseur,
      education: null,
      fecondite: 0,
      ageMax: 0,
      armee: null,
    }
    c.ageMax = computeAgeMax(c, rng, C)
    pop.push(c)
    ajoutes++
  }
  state.rngState = rng.state()
  state.log.push({
    turn: state.turn, type: 'Système', joueur: null,
    texte: `👥 ${ajoutes} habitant(s) ajouté(s) à la cité libre ${cite.nom}.`,
  })
  return ajoutes
}

/** Niveau de taxes d'une cité libre (« Moyenne » si absent). */
export function taxesCite(cite: CiteLibre): TaxeNiveau {
  return cite.taxes ?? 'Moyenne'
}
