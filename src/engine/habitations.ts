// ══════════════════════════════════════════════════════════════════════
//  HABITATIONS — TYPES DE VILLE (Ville / Château), MÉTIERS ET
//  DOMICILES DISPONIBLES PAR RANG (feuille « Ville » du classeur).
//  Les villes sont de deux types, chacun avec son échelle de rangs :
//    · Ville     : Hameau → Cité (120 hab.) → Grande Cité (200 hab.) ;
//    · Château   : Motte  → Donjon (120 hab.) → Forteresse (200 hab.).
//  Vague 3b (arbitrage 2026-10-22) : chaque rang définit les MÉTIERS
//  disponibles à la base (cap de base, ex. Hameau : 50 Chasseurs,
//  2 Gardes, 1 Commerçant, 1 Gouverneur) et les DOMICILES
//  disponibles (affichage seul pour l'instant). La consommation par
//  tour et la garnison de base des rangs sont SUPPRIMÉES : la
//  garnison vient des Gardes en poste (regimes.ts, vague 3a) —
//  (nettoyage 2026-10-22, retour Thibaut : les no-ops qui restaient
//  pour ne pas casser les appelants ont été retirées du code, avec
//  le canal « habitations » des récaps ressources).
//  Table entièrement paramétrable : Référentiels → « Habitations ».
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from './types'
import { type Cfg } from './gameData'
import { parseCoutTexte } from './constructions'
import { aMinistre } from './ministeres'
import { reductionFondation, aTech } from './progresAuto'
import { DEFAULT_CONFIG } from '../config/defaultConfig'

/** Nom court d'un rang d'habitation (« Hameau : 20 Or… » → « Hameau »). */
export function nomRang(rang: string): string {
  return rang.split(':')[0].trim()
}

/** Type d'habitation d'une ville (« Ville » ou « Château » ; défaut
 *  « Ville » pour les vieilles sauvegardes). */
export function typeVille(ville: City): string {
  return ville.type ?? 'Ville'
}

/** Définition du rang d'habitation d'une ville (table typesHabitation). */
export function habitationDef(ville: City, C: Cfg): import('./types').HabitationDef | undefined {
  const type = typeVille(ville)
  const nom = nomRang(ville.rang ?? 'Hameau')
  const table = C.config.typesHabitation ?? []
  return table.find((d) => d.type.toLowerCase() === type.toLowerCase()
    && nomRang(d.rang).toLowerCase() === nom.toLowerCase())
}

/** Rangs d'habitation disponibles pour un type donné
 *  (pour les listes déroulantes de la page « Pays »). */
export function rangsDisponibles(type: string, C: Cfg): string[] {
  const table = C.config.typesHabitation ?? []
  return table.filter((d) => d.type.toLowerCase() === type.toLowerCase()).map((d) => d.rang)
}

/** Habitants requis pour le rang d'habitation d'une ville. */
export function habitantsRequisVille(ville: City, C: Cfg): number {
  return habitationDef(ville, C)?.habitantsRequis ?? 0
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
  // Technologies (revue 2026-10-15) : Colonialisme durable (-5 Bois)
  //  et economome (-20 Or) sur les FONDATIONS d'habitation.
  // Expansion maritime s'applique aux côtières pour la fondation ET
  //  l'amélioration ; Colonialisme pour la fondation seule.
  const reducTechs = fondation
    ? reductionFondation(p, C, ville)
    : (ville.proximite === 'Mer' && aTech(p, 'Expansion maritime', C)
        ? { Bois: 3, Pierre: 3 } : {})
  for (const [r, v] of Object.entries(reducTechs)) {
    if (cout[r] !== undefined) cout[r] = Math.max(0, cout[r] - v)
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
      (def?.metiersDisponibles ? ` Métiers disponibles : ${def.metiersDisponibles}.` : '') +
      (def?.domicilesDisponibles ? ` Domiciles disponibles : ${def.domicilesDisponibles}.` : ''),
  })
  return cout
}

// ── Métiers disponibles à la base du rang (vague 3b) ────────────────────

/** Normalise un nom de métier pour le parse de « Métiers
 *  disponibles » : minuscules, espaces trimés, « s » final retiré
 *  (« Gouverneurs » → « gouverneur »). */
function normaliseMetier(nom: string): string {
  const n = nom.trim().toLowerCase()
  return n.endsWith('s') ? n.slice(0, -1) : n
}

/** Parse la colonne « Métiers disponibles » d'un rang (ex. « 50
 *  Chasseurs, 2 Gardes, 1 Commerçant, 1 Gouverneur ») en
 *  { metier: places } — les noms sont appariés au référentiel
 *  des métiers (insensible à la casse et au pluriel ; entrée non
 *  reconnue = ignorée). */
export function parseMetiersDisponibles(texte: string, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  if (!texte) return out
  const parNom = new Map(C.metiers.map((t) => [normaliseMetier(t.metier), t.metier]))
  for (const morceau of texte.split(',')) {
    const m = /^(\d+)\s+(.+)$/.exec(morceau.trim())
    if (!m) continue
    const places = Number(m[1])
    const metier = parNom.get(normaliseMetier(m[2]))
    if (metier) out[metier] = (out[metier] ?? 0) + places
  }
  return out
}

/** Métiers disponibles à la BASE du rang d'habitation d'une ville
 *  (vague 3b) : cap de base par métier, avant les emplacements des
 *  bâtiments (metiers.ts les AJOUTE). Repli : si la config
 *  sauvegardée (tampon de convergence) n'a pas encore la colonne
 *  « metiersDisponibles », on utilise la ligne du DEFAULT_CONFIG
 *  de même (type, rang) ; à défaut, vide. */
export function metiersDisponiblesRang(ville: City, C: Cfg): Record<string, number> {
  const def = habitationDef(ville, C)
  if (def?.metiersDisponibles) return parseMetiersDisponibles(def.metiersDisponibles, C)
  const type = typeVille(ville)
  const nom = nomRang(ville.rang ?? 'Hameau')
  const defDefaut = DEFAULT_CONFIG.typesHabitation.find(
    (d) => d.type.toLowerCase() === type.toLowerCase()
      && nomRang(d.rang).toLowerCase() === nom.toLowerCase(),
  )
  return parseMetiersDisponibles(defDefaut?.metiersDisponibles ?? '', C)
}
