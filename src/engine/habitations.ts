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
import { aMinistre } from './ministeres'
import { rangPaysNiveau } from './factions'

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

/** Consommation par tour de toutes les habitations d'un pays.
 *  Grand veneur (ministère, marqueur (y)) : « Vos habitations
 *  consomment -5 Nourriture par rang de votre pays » — la
 *  consommation de Nourriture de CHAQUE habitation est réduite de
 *  5 × rang de pays (plafonnée à 0 par habitation, jamais inversée
 *  en gain). Passer `state` active l'effet (moteur et récap) ;
 *  sans `state` (affichages statiques), pas de réduction. */
export function consommationsPays(
  p: Player, C: Cfg, state?: GameState,
): Record<string, number> {
  const out: Record<string, number> = {}
  const veneur = state ? aMinistre(state, p, 'Grand veneur') : false
  const reduc = veneur ? 5 * rangPaysNiveau(p, C) : 0
  for (const v of p.villes) {
    const consoVille = { ...consommationsVille(v, C) }
    if (reduc > 0 && consoVille['Nourriture'] !== undefined) {
      consoVille['Nourriture'] = Math.min(0, (consoVille['Nourriture'] ?? 0) + reduc)
    }
    for (const [res, val] of Object.entries(consoVille)) {
      out[res] = (out[res] ?? 0) + val
    }
  }
  return out
}

/** Coût d'un rang d'habitation (colonne « Coût d'amélioration » du
 *  référentiel, ex. « 20 Or + 10 Bois + 6 Bétail »), en quantités
 *  positives. Vide / inconnu = gratuit. */
export function coutHabitation(ville: City, C: Cfg): Record<string, number> {
  return parseCoutTexte(habitationDef(ville, C)?.cout ?? '')
}

/** Débite automatiquement du stock le coût d'habitation du rang
 *  ACTUEL de la ville (construction / amélioration — retour Thibaut
 *  2026-10-14) + log Système. Avertit (sans bloquer) si les
 *  habitants requis manquent. Retourne le coût débité. */
export function debiterCoutHabitation(
  state: GameState, p: Player, ville: City, C: Cfg,
  /** Fondation (nouvelle ville / château) et non simple amélioration :
   *  active la réduction du Grand bailli (marqueur (y), −8 Or et
   *  −3 Bois — plafonnés à 0). */
  fondation = false,
): Record<string, number> {
  const def = habitationDef(ville, C)
  const cout = coutHabitation(ville, C)
  let reducBailli = false
  if (fondation && aMinistre(state, p, 'Grand bailli')) {
    reducBailli = true
    if (cout['Or'] !== undefined) cout['Or'] = Math.max(0, cout['Or'] - 8)
    if (cout['Bois'] !== undefined) cout['Bois'] = Math.max(0, cout['Bois'] - 3)
  }
  for (const [res, v] of Object.entries(cout)) {
    const rs = p.resources[res]
    if (rs && v !== 0) rs.stock -= v
  }
  const parts = Object.entries(cout)
    .map(([r, v]) => `${v} ${r}`).join(' + ')
  const requis = def?.habitantsRequis ?? 0
  const vivants = (state.population[p.n] ?? [])
    .filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom).length
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🏰 ${ville.nom} — ${def?.rang ?? typeVille(ville)} (${typeVille(ville)})` +
      (parts ? ` — coût débité du stock : ${parts}` : ' — gratuit') +
      (reducBailli ? ' (Grand bailli : −8 Or, −3 Bois).' : '') +
      (requis > 0 && vivants < requis
        ? ` ⚠ habitants insuffisants (${vivants}/${requis}).`
        : '.') +
      (def?.consommation ? ` Consommation : ${def.consommation} par tour.` : ''),
  })
  return cout
}

/** Étape moteur : débite du stock la consommation par tour des
 *  habitations du pays (canal « habitations » du récap ressources).
 *  Les quantités sont négatives (elles réduisent le stock). */
export function appliquerConsommationsHabitations(
  state: GameState, p: Player, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out = consommationsPays(p, C, state)
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
