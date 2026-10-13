// ══════════════════════════════════════════════════════════════════════
//  PROGRÈS — EFFETS AUTOMATIQUES DES TECHNOLOGIES DÉBLOQUÉES
//  Les effets chiffrés des technologies (paramétrables dans
//  « 📚 Référentiels » → « Progrès », champ « effets » de chaque tech)
//  sont appliqués AUTOMATIQUEMENT par le moteur :
//    · gain               : crédit unique au déblocage (« recevez 20 Or »),
//    · prodCapitale       : +N ressource par tour (capitale du joueur),
//    · prodParHabitation  : +N ressource par tour et par habitation,
//    · prodParTitre       : +N ressource par tour et par habitant portant
//                          le titre (ex. « marchands +3 Or »),
//    · prodParAmenagement : +N ressource par tour et par aménagement listé
//                          (ex. « champs et rizières +2 Nourriture »),
//    · garnison           : +N garnison statique (capitale ou toutes les
//                          habitations) — visible page « Pays ».
//  Les effets non chiffrés (dés de bataille, réductions de coût de
//  construction, limites d'unités, émissaires…) restent appliqués au
//  plateau, à la main — ils sont notés dans la description de la tech.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import { cfgOf, type Cfg } from './gameData'
import { capitaleDe } from './factions'
import type { EffetProgres, ProgresArbre, ProgresTechDef } from '../config/defaultConfig'

/** Emplacement d'une tech dans un arbre (a1 | a2 | b1 | b2 | c). */
export type SlotProgres = 'a1' | 'a2' | 'b1' | 'b2' | 'c'

/** Définition de la tech d'un emplacement d'arbre. */
export function techDefArbre(arbre: ProgresArbre, s: SlotProgres): ProgresTechDef | undefined {
  if (s === 'c') return arbre.techC
  const br = s[0] === 'a' ? arbre.brancheA : arbre.brancheB
  return br?.[+s[1] - 1]
}

/** Effets automatiques valides d'une tech (montant non nul). */
export function effetsTech(t?: ProgresTechDef): EffetProgres[] {
  return (t?.effets ?? []).filter(
    (e) => e && typeof e.montant === 'number' && e.montant !== 0 && !!e.type,
  )
}

/** Emplacements débloqués d'un joueur (clés « indexArbre:slot »). */
export function slotsDebloques(p: Player, C: Cfg = cfgOf()): { arbre: ProgresArbre; slot: SlotProgres }[] {
  const out: { arbre: ProgresArbre; slot: SlotProgres }[] = []
  for (const k of p.progresDebloques ?? []) {
    const sep = k.lastIndexOf(':')
    if (sep < 0) continue
    const i = +k.slice(0, sep)
    const slot = k.slice(sep + 1) as SlotProgres
    const arbre = C.config.progres[i]
    if (arbre) out.push({ arbre, slot })
  }
  return out
}

/** Effets PAR TOUR d'une tech débloquée pour un joueur (flux du canal
 *  « Progrès »). Les gains uniques et la garnison n'en font pas partie. */
export function effetsTechParTour(state: GameState, p: Player, t: ProgresTechDef): Record<string, number> {
  const out: Record<string, number> = {}
  for (const e of effetsTech(t)) {
    const res = e.ressource
    if (!res) continue
    let n = 0
    if (e.type === 'prodCapitale') n = capitaleDe(p) ? 1 : 0
    else if (e.type === 'prodParHabitation') n = p.villes.length
    else if (e.type === 'prodParTitre') {
      const pop = state.population[p.n] ?? []
      n = pop.filter((c) => c.statut !== 'Décédé' && c.titre === e.titre).length
    } else if (e.type === 'prodParAmenagement') {
      const liste = e.amenagements ?? []
      n = p.villes.reduce(
        (s, v) => s + (v.amenagements ?? []).filter((a) => liste.includes(a)).length, 0)
    } else continue // gain (unique) / garnison (statique) : pas des flux
    const v = e.montant * n
    if (v !== 0) out[res] = (out[res] ?? 0) + v
  }
  return out
}

/** Effets par tour de TOUTES les techs débloquées d'un joueur
 *  (canal « Progrès » du récap ressources). */
export function effetsProgresJoueur(state: GameState, p: Player, C: Cfg = cfgOf(state.config)): Record<string, number> {
  const out: Record<string, number> = {}
  for (const { arbre, slot } of slotsDebloques(p, C)) {
    const t = techDefArbre(arbre, slot)
    if (!t) continue
    for (const [res, v] of Object.entries(effetsTechParTour(state, p, t))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Une ligne du détail « origine des apports » (une tech utile). */
export interface LigneProgres {
  /** nom de la technologie */
  nom: string
  /** effets par tour de la tech (ressource → valeur) */
  effets: Record<string, number>
}

/** Détail des effets par tour du joueur : une ligne par tech débloquée
 *  ayant des effets de flux (récap « origine de chaque apport »). */
export function detailsProgresJoueur(
  state: GameState, p: Player, C: Cfg = cfgOf(state.config),
): LigneProgres[] {
  const out: LigneProgres[] = []
  for (const { arbre, slot } of slotsDebloques(p, C)) {
    const t = techDefArbre(arbre, slot)
    if (!t) continue
    const effets = effetsTechParTour(state, p, t)
    if (Object.keys(effets).length === 0) continue
    out.push({ nom: t.nom || 'technologie sans nom', effets })
  }
  return out
}

/** Applique les effets par tour des techs débloquées de chaque joueur
 *  (étape 3undecies de FinDeTour) — crédite les stocks et retourne les
 *  apports par joueur (canal « Progrès » du récap ressources). */
export function appliquerEffetsProgres(
  state: GameState, C: Cfg = cfgOf(state.config),
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const effets = effetsProgresJoueur(state, p, C)
    for (const [res, v] of Object.entries(effets)) {
      const rs = p.resources[res]
      if (rs && v) rs.stock += v
    }
    out[p.n] = effets
  }
  return out
}

/** Garnison statique ajoutée par les techs débloquées à une ville :
 *  cible « capitale » → uniquement la capitale du joueur, « habitations »
 *  → toutes les villes. S'ajoute à la garnison affichée (page « Pays »). */
export function garnisonProgresVille(
  state: GameState, p: Player, ville: City, C: Cfg = cfgOf(state.config),
): number {
  const cap = capitaleDe(p)
  let g = 0
  for (const { arbre, slot } of slotsDebloques(p, C)) {
    const t = techDefArbre(arbre, slot)
    for (const e of effetsTech(t)) {
      if (e.type !== 'garnison') continue
      if (e.cible === 'capitale') {
        if (cap && cap.nom === ville.nom) g += e.montant
      } else {
        g += e.montant
      }
    }
  }
  return g
}

/** Gains immédiats au déblocage d'une tech (effets « gain » — crédités
 *  une seule fois par la vue « Progrès » au moment du déblocage). */
export function gainsDeblocageTech(t: ProgresTechDef | undefined): Record<string, number> {
  const out: Record<string, number> = {}
  for (const e of effetsTech(t)) {
    if (e.type === 'gain' && e.ressource) out[e.ressource] = (out[e.ressource] ?? 0) + e.montant
  }
  return out
}

/** Résumé lisible des effets automatiques d'une tech (badge de l'onglet
 *  Progrès). Chaîne vide = aucun effet automatique (effet au plateau). */
export function resumeEffetsTech(t: ProgresTechDef | undefined): string {
  const parts: string[] = []
  for (const e of effetsTech(t)) {
    const m = e.montant > 0 ? `+${e.montant}` : `${e.montant}`
    if (e.type === 'gain' && e.ressource) parts.push(`${m} ${e.ressource} au déblocage`)
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
