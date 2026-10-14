// ══════════════════════════════════════════════════════════════════════
//  PROGRÈS — DÉBLOCAGE DES TECHNOLOGIES
//  Arbitrage Thibaut (2026-10-14) : les effets des technologies ne sont
//  PLUS appliqués automatiquement par le moteur — TOUT s'applique au
//  plateau, à la main (philosophie des dogmes). Le COÛT EN SCIENCE de
//  chaque technologie (champ « cout » du référentiel, ex. « 12 ») est en
//  revanche déduit AUTOMATIQUEMENT du stock de Science au déblocage
//  (et remboursé si la tech est reprise — bouton « − Reprendre »).
//  Les effets chiffrés du référentiel (champ « effets », éditable dans
//  « 📚 Référentiels » → « Progrès ») restent une AIDE DE JEU :
//  résumés affichés sous chaque tech, application au plateau.
// ══════════════════════════════════════════════════════════════════════

import type { Player } from './types'
import type { ProgresArbre, ProgresTechDef } from '../config/defaultConfig'

/** Emplacement d'une tech dans un arbre (a1 | a2 | b1 | b2 | c). */
export type SlotProgres = 'a1' | 'a2' | 'b1' | 'b2' | 'c'

/** Définition de la tech d'un emplacement d'arbre. */
export function techDefArbre(arbre: ProgresArbre, s: SlotProgres): ProgresTechDef | undefined {
  if (s === 'c') return arbre.techC
  const br = s[0] === 'a' ? arbre.brancheA : arbre.brancheB
  return br?.[+s[1] - 1]
}

/** Effets chiffrés valides d'une tech (montant non nul) — AIDE DE JEU :
 *  affichés sous la tech, appliqués au plateau (aucun effet moteur). */
export function effetsTech(t?: ProgresTechDef) {
  return (t?.effets ?? []).filter(
    (e) => e && typeof e.montant === 'number' && e.montant !== 0 && !!e.type,
  )
}

/** Coût en Science d'une technologie (champ « cout » du référentiel,
 *  ex. « 12 »). Retourne null si le coût est absent ou non chiffré
 *  (aucune déduction alors). */
export function coutScienceTech(t: ProgresTechDef | undefined): number | null {
  if (!t?.cout) return null
  const m = String(t.cout).replace(',', '.').match(/\d+(\.\d+)?/)
  if (!m) return null
  const v = parseFloat(m[0])
  return Number.isFinite(v) && v > 0 ? v : null
}

/** Déduit le coût en Science de la tech du stock du joueur (appelé au
 *  DÉBLOCAGE par la vue « Progrès »). Retourne le montant déduit
 *  (0 = coût absent/non chiffré). */
export function debiterScienceTech(p: Player, t: ProgresTechDef | undefined): number {
  const cs = coutScienceTech(t)
  if (cs == null) return 0
  const rs = p.resources['Science']
  if (rs) rs.stock -= cs
  return cs
}

/** Rembourse le coût en Science de la tech (appelé quand on REPREND une
 *  tech débloquée). Retourne le montant remboursé. */
export function rembourserScienceTech(p: Player, t: ProgresTechDef | undefined): number {
  const cs = coutScienceTech(t)
  if (cs == null) return 0
  const rs = p.resources['Science']
  if (rs) rs.stock += cs
  return cs
}

/** Résumé lisible des effets d'une tech (badge de l'onglet Progrès —
 *  AIDE DE JEU : à appliquer au plateau). Chaîne vide = aucun effet
 *  chiffré connu. */
export function resumeEffetsTech(t: ProgresTechDef | undefined): string {
  const parts: string[] = []
  for (const e of effetsTech(t)) {
    const m = e.montant > 0 ? `+${e.montant}` : `${e.montant}`
    if (e.type === 'gain' && e.ressource) parts.push(`${m} ${e.ressource} (une fois)`)
    else if (e.type === 'prodCapitale' && e.ressource) parts.push(`${m} ${e.ressource}/tour (capitale)`)
    else if (e.type === 'prodParHabitation' && e.ressource) parts.push(`${m} ${e.ressource}/tour par habitation`)
    else if (e.type === 'prodParTitre' && e.ressource) parts.push(`${m} ${e.ressource}/tour par ${e.titre ?? 'titulaire'}`)
    else if (e.type === 'prodParAmenagement' && e.ressource)
      parts.push(`${m} ${e.ressource}/tour par ${(e.amenagements ?? []).join(' / ') || 'aménagement'}`)
    else if (e.type === 'garnison')
      parts.push(`garnison ${m} ${e.cible === 'capitale' ? '(capitale)' : '(habitations)'}`)
  }
  return parts.join(' · ')
}
