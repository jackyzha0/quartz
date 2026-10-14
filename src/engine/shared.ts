// ══════════════════════════════════════════════════════════════════════
//  OUTILS TRANSVERSAUX DU MOTEUR
//  Identifiants, noms, dynasties nobles, récapitulatifs.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, CiteLibre, GameState, Player, PlayerRecap } from './types'
import type { Rng } from './rng'
import { cfgOf, type Cfg } from './gameData'

// ── Utilitaires ─────────────────────────────────────────────────────────
let idCounter = 0
export function newId(rng: Rng): string {
  return `c${Date.now().toString(36)}${(idCounter++).toString(36)}${rng.int(100, 999)}`
}

export function isNobleDyn(dyn: string, C: Cfg = cfgOf()): boolean {
  const d = dyn.trim()
  return d !== '' && d !== C.p.dynastieRoturier
}

export function fullName(c: Character): string {
  return `${c.prenom} ${c.nom}`
}

// ══════════════════════════════════════════════════════════════════════
//  DÉTENTEURS DE POPULATION (retour Thibaut 2026-10-14) : un JOUEUR ou
//  une CITÉ LIBRE. La population des cités libres est gérée « comme si
//  c'étaient des joueurs » (onglet 👥 Population) : dons, mariages et
//  veuvage parcourent TOUTES les populations du monde, joueurs et
//  cités libres confondues.
// ══════════════════════════════════════════════════════════════════════

/** Porteur d'une population : un joueur ou une cité libre. */
export type Detenteur =
  | { kind: 'joueur'; p: Player }
  | { kind: 'cite'; cite: CiteLibre }

/** Tous les détenteurs de population de la partie (joueurs puis cités
 *  libres, dans l'ordre). */
export function detenteursDe(state: GameState): Detenteur[] {
  return [
    ...state.players.map((p): Detenteur => ({ kind: 'joueur', p })),
    ...(state.citesLibres ?? []).map((cite): Detenteur => ({ kind: 'cite', cite })),
  ]
}

/** Population d'un détenteur (le tableau est MUTÉ en place par les
 *  dons — même référence que state.population[n] ou cite.population). */
export function populationDe(state: GameState, d: Detenteur): Character[] {
  if (d.kind === 'joueur') return state.population[d.p.n] ?? []
  return d.cite.population ?? []
}

/** Étiquette d'un détenteur pour les logs (ex. « J1 · Hugues » ou
 *  « la cité libre Avignon »). */
export function nomDe(d: Detenteur): string {
  return d.kind === 'joueur' ? `J${d.p.n} · ${d.p.nom}` : `la cité libre ${d.cite.nom}`
}

/** Détenteur à la population duquel appartient un personnage
 *  (undefined = introuvable — les cités libres sont incluses). */
export function porteurDe(state: GameState, c: Character): Detenteur | undefined {
  for (const d of detenteursDe(state)) {
    if (populationDe(state, d).includes(c)) return d
  }
  return undefined
}

/** Deux détenteurs désignent-ils le même porteur (joueur ou cité) ? */
export function memeDetenteur(a: Detenteur, b: Detenteur): boolean {
  if (a.kind !== b.kind) return false
  return a.kind === 'joueur'
    ? a.p.n === (b as { kind: 'joueur'; p: Player }).p.n
    : a.cite === (b as { kind: 'cite'; cite: CiteLibre }).cite
}

/** TOUTES les populations du monde, joueurs ET cités libres — pour le
 *  veuvage au décès (sante.ts), la recherche du mari pour les
 *  naissances (naissances.ts) et les mariages manuels (cour.ts). */
export function toutesLesPopulations(state: GameState): Character[] {
  return detenteursDe(state).flatMap((d) => populationDe(state, d))
}

/** Donne un personnage à un détenteur (joueur ou cité libre) : il
 *  quitte sa population actuelle (où qu'elle soit — joueur ou cité
 *  libre) et rejoint celle de la cible ; sa ville est ré-ancrée (1re
 *  ville du joueur cible si la sienne n'y existe pas / nom de la cité
 *  cible). Retourne null si tout s'est bien passé, sinon une erreur. */
export function deplacerPersonnage(
  state: GameState, c: Character, dst: Detenteur,
): string | null {
  const src = porteurDe(state, c)
  if (!src) return 'Personnage introuvable dans les populations de la partie.'
  if (src.kind === dst.kind && (src.kind === 'joueur'
    ? src.p.n === (dst as { kind: 'joueur'; p: Player }).p.n
    : src.cite === (dst as { kind: 'cite'; cite: CiteLibre }).cite)) {
    return 'Ce personnage appartient déjà à ce porteur.'
  }
  const popSrc = populationDe(state, src)
  const i = popSrc.indexOf(c)
  if (i >= 0) popSrc.splice(i, 1)
  if (dst.kind === 'joueur') {
    if (!dst.p.villes.some((v) => v.nom === c.ville)) {
      c.ville = dst.p.villes[0]?.nom ?? c.ville
    }
    const arr = state.population[dst.p.n] ?? (state.population[dst.p.n] = [])
    arr.push(c)
  } else {
    c.ville = dst.cite.nom
    const arr = dst.cite.population ?? (dst.cite.population = [])
    arr.push(c)
  }
  state.log.push({
    turn: state.turn, type: 'Système',
    joueur: src.kind === 'joueur' ? src.p.n : null,
    texte: `🤝 ${fullName(c)} (${c.dynastie}${c.titre ? `, ${c.titre}` : ''}) passe de ${nomDe(src)} à ${nomDe(dst)}.`,
  })
  return null
}

export function emptyRecap(): PlayerRecap {
  return {
    conceptions: {}, naissances: {}, deces: {}, decesMaladie: 0,
    mariagesNobles: {}, conversions: {}, titresAttribues: {}, crises: [],
    commandantTombe: null,
  }
}

export function bump(dict: Record<string, number>, key: string, n = 1) {
  if (!key) key = '(inconnu)'
  dict[key] = (dict[key] ?? 0) + n
}
