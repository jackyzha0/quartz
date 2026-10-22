// ══════════════════════════════════════════════════════════════════════
//  MÉTIERS, PROFESSEURS, MARIAGES ET ÉDUCATION
//  Professeurs, mariages, éducation des mineurs, metiers automatiques et règles d'attribution.
//  Portage des macros VBA du classeur Chasse & Pêche 7.19.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, City, GameState, Player, PlayerRecap } from './types'
import type { Rng } from './rng'
import { cfgOf, metierDef, cultureDef, traitDef, type Cfg } from './gameData'
import { schoolRankOf } from './gameData2'
import { bump, fullName, isNobleDyn } from './shared'
import { constructionRef, emplacementsConstructionRef } from './constructions'
import { metiersDisponiblesRang } from './habitations'
import { villeCotiere } from './villes'
import { invaliderIndexPopulation } from './naissances'

// ── Professeurs ─────────────────────────────────────────────────────────

export function maybeAssignProfesseurs(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  for (const ville of p.villes) {
    const rank = schoolRankOf(ville.batiments, C.config)
    if (rank <= 0) continue
    const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
    let nbProfs = vivants.filter((c) => c.metier === C.p.metierProfesseur).length
    if (nbProfs >= rank) continue
    // chance = professeurBaseChance / ln(profs + 2,72)
    const chance = C.p.professeurBaseChance / Math.log(nbProfs + 2.72)
    if (!rng.chance(chance)) continue
    // VBA : pas de Professeur « Obstiné » (TRAIT_NO_EDUC).
    // Candidats : SANS metier ou roturier (metier Chasseur) — le setup
    //  metier tous les adultes Chasseur, l'ancien filtre !c.metier
    //  rendait la liste TOUJOURS vide (bug : aucun professeur n'était
    //  jamais nommé automatiquement). Même logique que peuplerMarchands.
    const candidats = vivants.filter((c) =>
      c.age >= C.p.adultAge &&
      (!c.metier || c.metier === C.p.metierChasseur) &&
      !(c.traits ?? []).includes(C.p.traitObstine))
    if (candidats.length === 0) continue
    const elu = rng.pick(candidats)
    elu.metier = C.p.metierProfesseur
    if (!elu.education) elu.education = rng.pick(C.educations)
    nbProfs++
    bump(recap.metiersAttribues, C.p.metierProfesseur)
    state.log.push({
      turn: state.turn + 1, type: 'Métier', joueur: p.n,
      texte: `${fullName(elu)} est promu Professeur à ${ville.nom}.`,
    })
  }
}

// ── Mariages ────────────────────────────────────────────────────────────

export function gestionMariages(state: GameState, p: Player, rng: Rng, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const celib = pop.filter(
    (c) => c.statut !== 'Décédé' && !c.mariageId && c.age >= C.p.adultAge,
  )
  const mariesIds = new Set<string>()
  const marier = (a: Character, b: Character) => {
    invaliderIndexPopulation()
    a.mariage = fullName(b)
    b.mariage = fullName(a)
    // M1 (2026-10-19) : identité du conjoint par id (nom = affichage).
    a.mariageId = b.id
    b.mariageId = a.id
    mariesIds.add(b.id)
    const noble = isNobleDyn(a.dynastie, C) && isNobleDyn(b.dynastie, C)
    if (noble) bump(recap.mariagesNobles, formatDynastyPair(a.dynastie, b.dynastie))
    state.log.push({
      turn: state.turn + 1, type: 'Mariage', joueur: p.n,
      texte: noble
        ? `Mariage noble : ${fullName(a)} (${a.dynastie}) épouse ${fullName(b)} (${b.dynastie}).`
        : `Mariage : ${fullName(a)} épouse ${fullName(b)}.`,
    })
  }
  /** Tente de marier `a` avec un candidat libre. false = plus de candidats. */
  const tenter = (a: Character, candidats: Character[]): boolean => {
    const dispo = candidats.filter((x) => !x.mariageId && !mariesIds.has(x.id))
    if (dispo.length === 0) return false
    const b = rng.pick(dispo)
    if (rng.chance(computeMarriageProbability(a, b, C))) marier(a, b)
    return true
  }
  // Passe hétérosexuelle : chaque femme célibataire avec un homme libre.
  const femmes = rng.shuffle(celib.filter((c) => c.sexe === 'F'))
  const hommes = celib.filter((c) => c.sexe === 'M')
  for (const f of femmes) {
    if (f.mariageId) continue
    if (!tenter(f, hommes)) break
  }
  // Passes homosexuelles — si la culture du pays les autorise (champ
  // paramétrable du référentiel, onglet « Cultures & régimes »). Pas de
  // conception entre époux de même sexe (conceptionEtNaissances,
  // naissances.ts).
  if (cultureDef(p.culture, C.config)?.homoAutorisee) {
    for (const [sexeA, sexeB] of [['F', 'F'], ['M', 'M']] as const) {
      const premiers = rng.shuffle(celib.filter((c) => c.sexe === sexeA))
      const seconds = celib.filter((c) => c.sexe === sexeB)
      for (const a of premiers) {
        if (a.mariageId) continue
        if (!tenter(a, seconds)) break
      }
    }
  }
}

export function formatDynastyPair(d1: string, d2: string): string {
  return d1 <= d2 ? `${d1} & ${d2}` : `${d2} & ${d1}`
}

export function computeMarriageProbability(f: Character, h: Character, C: Cfg = cfgOf()): number {
  const nobleF = isNobleDyn(f.dynastie, C)
  const nobleH = isNobleDyn(h.dynastie, C)
  let score: number
  if (!nobleF && !nobleH) score = C.p.mariageRoturiers
  else if (nobleF && nobleH) score = C.p.mariageNobles
  else score = C.p.mariageMesalliance // mésalliance
  // bonus metier non-Chasseur (par époux)
  if (f.metier && f.metier !== C.p.metierChasseur) score += C.p.mariageBonusMetier
  if (h.metier && h.metier !== C.p.metierChasseur) score += C.p.mariageBonusMetier
  // mods marriage_mod des traits (bornés ±mariageTraitMax par époux)
  score += characterMarriageMod(f, C) + characterMarriageMod(h, C)
  // culture
  if (f.culture && h.culture) {
    score += f.culture.toLowerCase() === h.culture.toLowerCase()
      ? C.p.mariageMemeCulture
      : C.p.mariageAutreCulture
  }
  // écart d'âge
  score -= Math.abs(f.age - h.age) * C.p.mariageParAnEcart
  // bâtards
  const batF = (f.traits ?? []).includes(C.p.traitBatard)
  const batH = (h.traits ?? []).includes(C.p.traitBatard)
  if (batF) score += C.p.mariageBatard
  if (batH) score += C.p.mariageBatard
  if (batF && batH) score += C.p.mariageDeuxBatards
  if (batF && nobleF && nobleH) score += C.p.mariageBatard
  if (batH && nobleH && nobleF) score += C.p.mariageBatard
  return Math.min(C.p.mariagePlafond, Math.max(C.p.mariagePlancher, score))
}

function characterMarriageMod(c: Character, C: Cfg = cfgOf()): number {
  let total = 0
  for (const t of (c.traits ?? [])) {
    if (!t) continue
    const td = traitDef(t, C.config)
    if (td) total += td.marriage_mod
  }
  return Math.min(C.p.mariageTraitMax, Math.max(-C.p.mariageTraitMax, total))
}

// ── Éducation des mineurs (TryEducateMinor) ─────────────────────────────

export function tryEducateMinor(state: GameState, p: Player, c: Character, rng: Rng) {
  const C = cfgOf(state.config)
  // VBA : le trait « Obstiné » refuse toute éducation.
  if ((c.traits ?? []).includes(C.p.traitObstine)) return
  const ville = p.villes.find((v) => v.nom === c.ville)
  if (!ville) return
  const rank = schoolRankOf(ville.batiments, C.config)
  if (rank <= 0) return
  const pop = state.population[p.n] ?? []
  const profs = pop.filter((x) => x.statut !== 'Décédé' && x.ville === ville.nom && x.metier === C.p.metierProfesseur)
  if (profs.length === 0) return
  const base = isNobleDyn(c.dynastie, C) ? C.p.chanceEducNoble : C.p.chanceEducRoturier
  let chance = base * rank * (1 + C.p.profBonusEduc * (profs.length - 1))
  chance = Math.min(0.95, chance)
  if (!rng.chance(chance)) return
  const edus = new Set<string>()
  for (const prof of profs) if (prof.education) edus.add(prof.education)
  if (edus.size === 0) return
  c.education = rng.pick([...edus])
  state.log.push({
    turn: state.turn + 1, type: 'Système', joueur: p.n,
    texte: `${fullName(c)} (${c.age} ans) reçoit une éducation ${c.education.toLowerCase()} à ${ville.nom}.`,
  })
}

// ── Metier automatique à l'âge adulte ────────────────────────────────────

export function assignAdultMetier(state: GameState, p: Player, c: Character, recap: PlayerRecap) {
  const C = cfgOf(state.config)
  // Vague 3a (rework métiers & emplacements, 2026-10-21) : AUCUNE
  //  éducation n'est requise — un habitant qui atteint l'âge adulte
  //  prend un emplacement LIBRE (priorisation vague 1 : métier autre
  //  que Chasseur d'abord, ordre du référentiel) ; sans place il reste
  //  Sans-emploi (rôle neutre, impôt nul). Les bâtards suivent la même
  //  règle que les autres habitants (plus de filtre spécial). La
  //  réaffectation de fin de tour (étape 2ter) rééquilibre les places
  //  de toute façon.
  const ville = p.villes.find((v) => v.nom === c.ville)
  let metier: string | null = null
  if (ville) {
    metier = premierPosteLibre(state, p, ville, C)
  }
  c.metier = metier
  if (metier) bump(recap.metiersAttribues, metier)
}

// ── Metiers accessibles (règle simplifiée) ────────────────────────────────

/** Metiers accessibles aux habitants d'un joueur (vague 3a) : TOUS
 *  les métiers du référentiel sans éducation requise — métiers de
 *  production (Chasseur, Pêcheur, Bûcheron, Mineur…), Garde,
 *  Banquier, Troubadour, Gouverneur, Ministre, Marchand, Dirigeant,
 *  Héritier (nomination manuelle, remplacement automatique par
 *  l'interface). Sont exclus du picker les métiers à attribution
 *  Armée (Soldat, Commandant — engagement militaire), Succession et
 *  Ville, ainsi que le Professeur (nomination automatique par les
 *  écoles). L'avertissement de places est une aide, jamais bloquant
 *  — la réaffectation de fin de tour règle le surnombre. */
export function metiersAccessibles(state: GameState, _p: Player, C: Cfg = cfgOf(state.config)): string[] {
  const out: string[] = [C.p.metierChasseur, C.p.metierGouverneur]
  // Dirigeant / Héritier (retour utilisateur 2026-10-17) : nomination
  //  MANUELLE possible — le picker « Attribuer… » de la page
  //  Population remplace automatiquement l'actuel porteur (le metier
  //  est unique : l'ancien Dirigeant/Héritier redevient sans metier).
  //  Le remplacement est fait par l'interface (changeMetier) ; la
  //  validation (unicité, dynastie) reste un AVERTISSEMENT, jamais
  //  bloquant — convention du jeu.
  out.push(C.p.metierDirigeant, C.p.metierHeritierStr)
  // « Ministre » (refonte 2026-10-14) : nomination manuelle — le cap
  //  (nombre de Ministres = rang de pays, table paysRangs) et la règle
  //  « nobleSeul » sont contrôlés par validateMetierAssignment
  //  (avertissement affiché, jamais bloquant). Le portefeuille se
  //  choisit ensuite dans la page Population.
  out.push('Ministre')
  // « Marchand » (marqueur (t)) : attribution manuelle comme Chasseur,
  //  Gouverneur ou Ministre — le metier ouvre UNE route commerciale
  //  (engine/commerce.ts : +marchandOrTour Or pour les 2 joueurs
  //  reliés + copie d'une ressource d'un aménagement de la ville
  //  ciblée). Pas de gain par tour dans la table des metiers.
  out.push('Marchand')
  // Vague 3a (2026-10-21) : AUCUNE éducation n'est requise — les métiers
  //  de production (Pêcheur, Bûcheron, Mineur…), la Garde, le Banquier
  //  et le Troubadour sont attribuables manuellement (l'avertissement
  //  de places est une aide, jamais bloquant — la réaffectation de fin
  //  de tour règle le surnombre). Restent exclus du picker : les métiers
  //  à attribution Armée (engagement militaire) et le Professeur
  //  (nomination automatique par les écoles).
  for (const t of C.metiers) {
    if (t.attribution === 'Armée' || t.attribution === 'Succession' || t.attribution === 'Ville') continue
    out.push(t.metier)
  }
  return [...new Set(out)]
}

export function metierAllowedForCharacter(metier: string, c: Character, p: Player, C: Cfg = cfgOf()): boolean {
  const td = metierDef(metier, C.config)
  if (!td) return false
  if (td.nobleSeul && !isNobleDyn(c.dynastie, C)) return false
  if (td.regleGenre === 'Masculine' && c.sexe !== 'M') return false
  if (td.regleGenre === 'Féminine' && c.sexe !== 'F') return false
  if (td.regleGenre === 'Hérédité' || td.regleGenre === 'Culture') {
    const cult = cultureDef(p.culture, C.config)
    if (cult) {
      if (cult.heredite === 'Masculine' && c.sexe !== 'M') return false
      if (cult.heredite === 'Féminine' && c.sexe !== 'F') return false
    }
  }
  return true
}

// ── Gouverneurs automatiques (marqueur (w), retour Thibaut) ──────────────

/** Gouverneur en poste dans une ville d'un joueur (vivant, metier
 *  « Gouverneur », rattaché à la ville) — null si la ville n'a pas
 *  de gouverneur. */
export function gouverneurDeVille(
  state: GameState, p: Player, ville: string, C: Cfg = cfgOf(state.config),
): Character | null {
  return (state.population[p.n] ?? []).find(
    (c) => c.statut !== 'Décédé' && c.metier === C.p.metierGouverneur && c.ville === ville,
  ) ?? null
}

/** Si une ville sans gouverneur abrite au moins un noble, le noble le
 *  plus âgé devient AUTOMATIQUEMENT gouverneur (retour Thibaut, marqueur
 *  (w) — appelé à chaque fin de tour AVANT le calcul des gains : le
 *  bonus +10 % d'impôts s'applique dès le tour de la nomination). Le
 *  Dirigeant et l'Héritier ne sont jamais choisis (leur metier
 *  commande la succession et ne se remplace pas). */
export function designerGouverneurs(state: GameState, C: Cfg = cfgOf(state.config)): void {
  for (const p of state.players) {
    const pop = state.population[p.n] ?? []
    for (const ville of p.villes) {
      if (gouverneurDeVille(state, p, ville.nom, C)) continue
      const nobles = pop.filter(
        (c) => c.statut !== 'Décédé' && c.ville === ville.nom
          && isNobleDyn(c.dynastie, C)
          && c.metier !== C.p.metierDirigeant && c.metier !== C.p.metierHeritierStr,
      )
      if (nobles.length === 0) continue
      const elu = nobles.reduce((a, b) => (b.age > a.age ? b : a))
      elu.metier = C.p.metierGouverneur
      state.log.push({
        turn: state.turn + 1, type: 'Métier', joueur: p.n,
        texte: `🏰 ${ville.nom} n'a pas de ${C.p.metierGouverneur} — ${fullName(elu)}, noble le plus âgé de la ville, prend automatiquement la charge (+10 % d'impôts sur la ville).`,
      })
    }
  }
}

// ── Caps de métiers par ville (vagues 1, 3a puis 3b) ───────────────────
//  Vague 3b (rangs & bâtiments de tier 1, arbitrage 2026-10-22) : les
//  caps sont CUMULATIVES — cap d'un métier = BASE DU RANG
//  d'habitation (colonne « Métiers disponibles », ex. Hameau :
//  50 Chasseurs, 2 Gardes, 1 Commerçant, 1 Gouverneur) + EMPLACEMENTS
//  des bâtiments ET aménagements présents (Poste de garde : +4 Garde…).
//  Les paramètres capMetierChasseur* sont supprimés (le cas spécial
//  Chasseur disparaît). Un capParVille déclaré au référentiel
//  s'AJOUTE. Les métiers SANS base au rang, sans emplacement et non
//  productifs (Banquier, Troubadour, rôles de cour, Dirigeant/
//  Héritier, métiers personnalisés hors référentiel) restent ∞ :
//  leurs règles propres s'appliquent.

/** Emplacements de `metier` accordés par les bâtiments ET les
 *  aménagements présents dans la ville (vague 3a : aménagements ;
 *  vague 3b 2026-10-22 : les BÂTIMENTS comptent aussi, ex. Poste de
 *  garde +4 Garde — somme des `emplacements` des constructions de la
 *  ville, format référentiel `emplacements: [{ metier, places }]`). */
export function emplacementsMetierVille(metier: string, ville: City, C: Cfg = cfgOf()): number {
  let total = 0
  for (const nom of [...(ville.batiments ?? []), ...(ville.amenagements ?? [])]) {
    const ref = constructionRef(nom, C.config)
    if (!ref) continue
    // Ponton (vague 3b, arbitrage Thibaut 2026-10-22) : bâtiment
    //  CÔTIER — ses emplacements ne comptent que si la ville a une
    //  proximité Rivière ou Mer (villeCotiere, villes.ts) ; hors
    //  proximité le bâtiment reste affiché mais n'ouvre aucun poste.
    if (nom === 'Ponton' && !villeCotiere(ville)) continue
    for (const e of emplacementsConstructionRef(ref)) {
      if (e.metier === metier) total += e.places
    }
  }
  return total
}

export function capMetierVille(metier: string | null, ville: City, C: Cfg = cfgOf()): number {
  if (!metier) return Number.POSITIVE_INFINITY
  const empl = emplacementsMetierVille(metier, ville, C)
  const td = metierDef(metier, C.config)
  if (td?.capParVille !== undefined) return td.capParVille + empl
  // Vague 3b : cap CUMULATIVE = base du RANG d'habitation
  //  (« Métiers disponibles » du rang — Hameau : 50 Chasseurs,
  //  2 Gardes, 1 Commerçant, 1 Gouverneur…) + emplacements des
  //  bâtiments/aménagements.
  const base = metiersDisponiblesRang(ville, C)[metier] ?? 0
  // Métier de production (gain par tour) : plafonné même sans base
  //  au rang — cap = base + emplacements (sans les deux, cap 0 :
  //  arbitrage 3a assumé).
  const productif = !!td && ((td.ressource1 !== '' && td.valeur1 !== 0) || (td.ressource2 !== '' && td.valeur2 !== 0))
  if (productif || base > 0 || empl > 0) return base + empl
  // Rôles de cour, armée, Banquier, Troubadour, Dirigeant/Héritier
  //  et métiers personnalisés hors référentiel : non plafonnés ici.
  return Number.POSITIVE_INFINITY
}

/** Métiers plafonnés (cap FINIE) d'une ville, dans l'ordre de
 *  PRIORISATION (référentiel, Chasseur en dernier — arbitrage
 *  Thibaut 2026-10-22 : « n'importe quel métier → Chasseur → sans
 *  métier »), avec leurs places libres (cap − en poste, vivants
 *  seulement). */
function postesLibresVille(vivants: Character[], ville: City, C: Cfg): Array<{ metier: string; libres: number }> {
  const enPoste: Record<string, number> = {}
  for (const c of vivants) {
    if (c.metier) enPoste[c.metier] = (enPoste[c.metier] ?? 0) + 1
  }
  const plafonnes: string[] = []
  for (const t of C.metiers) {
    // Vague 3b : la réaffectation automatique ne touche PAS aux
    //  postes nobles (Gouverneur — élu/nommé selon ses propres
    //  règles), ni aux métiers à attribution Armée / Succession /
    //  Ville (Professeur : nomination par les écoles) — sinon elle
    //  créerait des Gouverneurs roturiers ou invaliderait des
    //  nominations automatiques. Ces postes restent plafonnés (le
    //  surnombre s'applique), mais jamais ATTRIBUÉS ici.
    if (t.nobleSeul || t.attribution === 'Armée' || t.attribution === 'Succession' || t.attribution === 'Ville') continue
    if (Number.isFinite(capMetierVille(t.metier, ville, C))) plafonnes.push(t.metier)
  }
  // priorisation : le Chasseur passe en dernier (métier par défaut)
  plafonnes.sort((a, b) => (a === C.p.metierChasseur ? 1 : 0) - (b === C.p.metierChasseur ? 1 : 0))
  return plafonnes.map((m) => ({
    metier: m,
    libres: Math.max(0, Math.floor(capMetierVille(m, ville, C)) - (enPoste[m] ?? 0)),
  }))
}

/** Premier poste libre pour un habitant (priorisation : métier autre
 *  que Chasseur d'abord, ordre du référentiel ; null = aucun). */
function premierPosteLibre(state: GameState, p: Player, ville: City, C: Cfg): string | null {
  const vivants = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
  const postes = postesLibresVille(vivants, ville, C)
  const premier = postes.find((x) => x.libres > 0)
  return premier ? premier.metier : null
}

export interface OccupationMetier {
  /** Métier concerné — null = ligne « Sans-emploi ». */
  metier: string | null
  /** Occupants VIVANTS en poste (les Décédés ne comptent pas). */
  enPoste: number
  /** Capacité de la ville pour ce métier (capMetierVille) —
   *  Infinity = illimité (ou cité libre : hors champ des caps). */
  cap: number
}

/** Vue « métiers et places par ville » (vague 2 UI, rework habitants
 *  2026-10-20) : pour les habitants d'une ville, une ligne par métier
 *  OCCUPÉ ou PLAFONNÉ (cap finie — ex. Chasseur), dans l'ordre du
 *  référentiel ; les métiers personnalisés hors référentiel
 *  (anciennes sauvegardes) sont conservés en fin de liste ; la ligne
 *  « Sans-emploi » (neutre : impôt nul, aucun effet) est TOUJOURS
 *  présente, en dernière position. ville = null (cité libre) →
 *  toutes les caps sont infinies. */
export function occupationsMetierVille(
  habitants: Character[], ville: City | null, C: Cfg = cfgOf(),
): OccupationMetier[] {
  const vivants = habitants.filter((c) => c.statut !== 'Décédé')
  const par: Record<string, number> = {}
  let sans = 0
  for (const c of vivants) {
    if (c.metier) par[c.metier] = (par[c.metier] ?? 0) + 1
    else sans++
  }
  const lignes: OccupationMetier[] = []
  const ajoute = (m: string) => lignes.push({
    metier: m, enPoste: par[m] ?? 0,
    cap: ville ? capMetierVille(m, ville, C) : Number.POSITIVE_INFINITY,
  })
  for (const m of C.metiers) {
    const cap = ville ? capMetierVille(m.metier, ville, C) : Number.POSITIVE_INFINITY
    if ((par[m.metier] ?? 0) > 0 || Number.isFinite(cap)) ajoute(m.metier)
  }
  for (const m of Object.keys(par)) {
    if (!C.metiers.some((x) => x.metier === m)) ajoute(m)
  }
  lignes.push({ metier: null, enPoste: sans, cap: Number.POSITIVE_INFINITY })
  return lignes
}

/** Réaffectation des postes plafonnés, par joueur et par ville
 *  (vague 1 puis 3a, étape 2ter — AVANT le calcul des gains) :
 *  · SURNOMBRE (cap baissée, aménagement perdu…) : les PLUS ÂGÉS
 *    perdent leur poste en premier (passage Sans-emploi — rôle
 *    neutre : impôt nul, aucun effet) ;
 *  · PLACES LIBRES (arbitrage Thibaut 2026-10-22) : ordre de prise
 *    de poste « n'importe quel métier → Chasseur → sans métier ».
 *    Les Sans-emploi ADULTES prennent un poste, les plus âgés
 *    d'abord (jamais les enfants), en priorisant un métier AUTRE
 *    QUE Chasseur (ordre du référentiel) ; et les CHASSEURS en
 *    poste CHANGENT de métier dès qu'un poste AUTRE est disponible
 *    (même priorisation, même ordre d'âge) — le Chasseur n'est
 *    jamais qu'un poste de repli ; sans place, l'habitant reste
 *    Sans-emploi.
 *  Les cités libres ne passent PAS ici (hors du champ des caps). */
export function reaffecterMetiers(state: GameState, C: Cfg = cfgOf(state.config)): void {
  for (const p of state.players) {
    const pop = state.population[p.n] ?? []
    for (const ville of p.villes) {
      const vivants = pop.filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom)
      // 1. surnombre : par métier plafonné, les plus âgés sortent.
      //    Exception (spec vague 3 « Marchand & routes ») : les
      //    emplacements de Marchand viennent des Mines d'Or ET des
      //    routes commerciales — un marchand qui TIENT une route occupe
      //    un poste créé par elle : il n'est JAMAIS en surnombre (sans
      //    cette exemption, toute route perdrait son titulaire à
      //    chaque fin de tour — contrat B4 « la route vit toujours »).
      //    La dissociation complète des routes (sous-vague 3b)
      //    remplacera ce pont.
      const routes = state.routesCommerce ?? []
      const tientRoute = (id: string) => routes.some((r) => r.marchandId === id)
      const enPoste: Record<string, Character[]> = {}
      for (const c of vivants) {
        if (!c.metier) continue
        ;(enPoste[c.metier] ?? (enPoste[c.metier] = [])).push(c)
      }
      for (const t of C.metiers) {
        const cap = capMetierVille(t.metier, ville, C)
        if (!Number.isFinite(cap)) continue
        const occupants = (enPoste[t.metier] ?? []).filter((c) => !tientRoute(c.id))
        if (occupants.length <= Math.floor(cap)) continue
        const perdants = [...occupants].sort((x, y) => y.age - x.age)
          .slice(0, occupants.length - Math.floor(cap))
        for (const c of perdants) c.metier = null
        state.log.push({
          turn: state.turn + 1, type: 'Métier', joueur: p.n,
          texte: `${ville.nom} : capacité de ${t.metier.toLowerCase()}(s) atteinte (${Math.floor(cap)}) — ${perdants.length} habitant(s) (les plus âgés) passe(nt) sans emploi.`,
        })
      }
      // 2. places libres (arbitrage Thibaut 2026-10-22) : ordre de
      //    prise de poste « n'importe quel métier → Chasseur → sans
      //    métier ». Candidats : les Sans-emploi ADULTES ET les
      //    CHASSEURS en poste (un Chasseur CHANGE de métier dès qu'un
      //    poste AUTRE que Chasseur est disponible — le Chasseur
      //    n'est jamais qu'un poste de repli), les plus âgés d'abord
      //    (jamais les enfants).
      const attribues = new Map<string, number>()
      const changements = new Map<string, number>()
      const candidats = vivants
        .filter((c) => (!c.metier && c.age >= C.p.adultAge) || c.metier === C.p.metierChasseur)
        .sort((a, b) => b.age - a.age)
      if (candidats.length > 0) {
        // postes recalculés APRÈS le surnombre (les perdants ci-dessus
        //  sont déjà Sans-emploi et ne comptent plus comme en poste)
        const postes = postesLibresVille(vivants, ville, C)
        for (const c of candidats) {
          const etaitChasseur = c.metier === C.p.metierChasseur
          // un Chasseur ne « prend » pas son propre poste : il ne
          //  bouge que vers un métier AUTRE (s'il ne reste que des
          //  postes de Chasseur, il reste Chasseur — sans consommer
          //  de place) ; les autres candidats les prennent.
          const poste = postes.find((x) => x.libres > 0
            && (!etaitChasseur || x.metier !== C.p.metierChasseur))
          if (!poste) { if (etaitChasseur) continue; else break }
          c.metier = poste.metier
          poste.libres -= 1
          if (etaitChasseur) {
            // son poste de Chasseur se libère — disponible pour les
            //  candidats suivants (le cap n'est pas concerné : il
            //  repart du nombre d'occupants au prochain tour).
            const pChasseur = postes.find((x) => x.metier === C.p.metierChasseur)
            if (pChasseur) pChasseur.libres += 1
            changements.set(poste.metier, (changements.get(poste.metier) ?? 0) + 1)
          } else {
            attribues.set(poste.metier, (attribues.get(poste.metier) ?? 0) + 1)
          }
        }
      }
      if (attribues.size > 0) {
        const textePostes = [...attribues.entries()].map(([m, n]) => `${n} ${m.toLowerCase()}(s)`).join(', ')
        state.log.push({
          turn: state.turn + 1, type: 'Métier', joueur: p.n,
          texte: `${ville.nom} : ${[...attribues.values()].reduce((x, y) => x + y, 0)} sans-emploi(s) pren(nen)t un poste (places disponibles) — ${textePostes}.`,
        })
      }
      if (changements.size > 0) {
        const textePostes = [...changements.entries()].map(([m, n]) => `${n} ${m.toLowerCase()}(s)`).join(', ')
        state.log.push({
          turn: state.turn + 1, type: 'Métier', joueur: p.n,
          texte: `${ville.nom} : ${[...changements.values()].reduce((x, y) => x + y, 0)} chasseur(s) change(nt) de métier (places disponibles) — ${textePostes} ; le Chasseur n est jamais qu un poste de repli.`,
        })
      }
    }
  }
}
