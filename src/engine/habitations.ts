// ══════════════════════════════════════════════════════════════════════
//  HABITATIONS — TYPES DE VILLE (Ville / Château), CONSOMMATION PAR
//  TOUR ET GARNISON DE BASE (feuille « Ville » du classeur).
//  Les villes sont de deux types, chacun avec son échelle de rangs :
//    · Ville     : Hameau → Cité (120 hab.) → Grande Cité (200 hab.) ;
//    · Château   : Motte  → Donjon (120 hab.) → Forteresse (200 hab.).
//  Chaque rang consomme des ressources à chaque tour (ex. Cité :
//  −10 Nourriture, −8 Or) et apporte une garnison de base (ex. Cité :
//  24, Forteresse : 90) — s'ajoutant aux garnisons statiques des
//  bâtiments (batiments.ts) et à la loi du régime (regimes.ts).
//  Table entièrement paramétrable : Référentiels → « Habitations ».
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import { cfgOf, type Cfg } from './gameData'
import { parseCoutTexte } from './constructions'

/** Nom court d'un rang d'habitation (« Hameau : 20 Or… » → « Hameau »). */
export function nomRang(rang: string): string {
  return rang.split(':')[0].trim()
}

/** Type d'habitation d'une ville (« Ville » ou « Château » ; défaut
 *  « Ville » pour les vieilles sauvegardes). */
export function typeVille(ville: City): string {
  return ville.type ?? 'Ville'
}

/** Définition du rang d'habitation d'une ville (table typesHabitation).
 *  Repli sur l'ancienne table rangsHabitation (Ville) si absente. */
export function habitationDef(ville: City, C: Cfg): import('./types').HabitationDef | undefined {
  const type = typeVille(ville)
  const nom = nomRang(ville.rang ?? C.config.rangsHabitation?.[0]?.rang ?? 'Hameau')
  const table = C.config.typesHabitation ?? []
  const def = table.find((d) => d.type.toLowerCase() === type.toLowerCase()
    && nomRang(d.rang).toLowerCase() === nom.toLowerCase())
  if (def) return def
  // Repli ancien format (table rangsHabitation, échelle Ville uniquement)
  const idx = (C.config.rangsHabitation ?? [])
    .findIndex((r) => nomRang(r.rang).toLowerCase() === nom.toLowerCase())
  if (idx < 0) return undefined
  const consos = ['2 Or', '10 Nourriture, 8 Or', '20 Nourriture, 20 Or']
  const garr = [10, 24, 40]
  return { type: 'Ville', rang: nom, cout: '', habitantsRequis: [0, 120, 200][idx] ?? 0,
    consommation: consos[idx] ?? '', garnison: garr[idx] ?? 0 }
}

/** Rangs d'habitation disponibles pour un type donné
 *  (pour les listes déroulantes de la page « Pays »). */
export function rangsDisponibles(type: string, C: Cfg): string[] {
  const table = C.config.typesHabitation ?? []
  const rangs = table.filter((d) => d.type.toLowerCase() === type.toLowerCase()).map((d) => d.rang)
  if (rangs.length > 0) return rangs
  return (C.config.rangsHabitation ?? []).map((r) => nomRang(r.rang))
}

/** Garnison de base du rang d'habitation d'une ville
 *  (valeur d'état, pas un flux). */
export function garnisonBaseVille(ville: City, C: Cfg): number {
  return habitationDef(ville, C)?.garnison ?? 0
}

/** Habitants requis pour le rang d'habitation d'une ville. */
export function habitantsRequisVille(ville: City, C: Cfg): number {
  return habitationDef(ville, C)?.habitantsRequis ?? 0
}

/** Consommation par tour d'une ville, quantités NÉGATIVES
 *  (ex. Cité : { Nourriture: -10, Or: -8 }) — texte paramétrable
 *  « 10 Nourriture, 8 Or » de la table typesHabitation. */
export function consommationsVille(ville: City, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  const texte = habitationDef(ville, C)?.consommation ?? ''
  for (const [res, v] of Object.entries(parseCoutTexte(texte))) {
    if (v !== 0) out[res] = (out[res] ?? 0) - v
  }
  return out
}

/** Consommation par tour de toutes les habitations d'un pays. */
export function consommationsPays(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  for (const v of p.villes) {
    for (const [res, val] of Object.entries(consommationsVille(v, C))) {
      out[res] = (out[res] ?? 0) + val
    }
  }
  return out
}

/** Étape moteur : débite du stock la consommation par tour des
 *  habitations du pays (canal « habitations » du récap ressources).
 *  Les quantités sont négatives (elles réduisent le stock). */
export function appliquerConsommationsHabitations(
  state: GameState, p: Player, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out = consommationsPays(p, C)
  for (const [res, v] of Object.entries(out)) {
    const rs = p.resources[res]
    if (rs) rs.stock += v
  }
  if (Object.keys(out).length > 0) {
    const parts = Object.entries(out)
      .map(([r, v]) => `${fmtCourt(v)} ${r}`).join(', ')
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `🏠 ${p.nom} — consommation des habitations : ${parts} par tour.`,
    })
  }
  return out
}

function fmtCourt(v: number): string {
  return `${v < 0 ? '−' : ''}${Math.abs(v)}`
}
