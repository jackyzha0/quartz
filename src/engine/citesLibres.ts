// ══════════════════════════════════════════════════════════════════════
//  CITÉS LIBRES — POPULATION, GARNISON ET TAXES AU SUZERAIN (3decies)
//  Une cité libre est une habitation sans joueur (règle « Cités libres »
//  du référentiel). Elle possède sa PROPRE POPULATION : ses habitants
//  ont des métiers comme ceux d'une ville de joueur, avec une règle
//  propre aux cités libres — les Chasseurs y produisent 1,1 × la
//  Nourriture (revue 2026-10-16).
//  Garnison (règle du référentiel) : 100 + 40 par rang de pays du
//  joueur ayant le plus haut rang (valeur d'état, batailles manuelles).
//  Suzerain : lorsqu'un joueur devient suzerain de la cité (3
//  émissaires — plateau, suivi manuel dans l'onglet « 🗼 Cités
//  libres »), la cité lui verse ses taxes à chaque fin de tour : sa
//  production nette (metiers × niveau de taxes de la cité, moins sa
//  consommation), plafonnée à 0 par ressource — canal « Cités
//  libres » du récap ressources.
//  La population d'une cité libre CONSOMME de la Nourriture comme une
//  ville de joueur (consoNourrParHab par habitant vivant — voir
//  engine/economie.ts) ; sa population démarre à 50 habitants et
//  est gérée dans l'onglet « 👥 Population » comme si c'était un
//  joueur (roturiers OU nobles, dons et mariages inter-porteurs).
//  PYRAMIDE D'ÂGES (revue 2026-10-16) : comme chez les joueurs, la
//  population compte des ENFANTS (sans metier — ils ne produisent
//  pas mais consomment) et des adultes titrés (Chasseur par
//  défaut) ; la population suit TOUJOURS la cité dans ses
//  transformations (ville → cité : les inscrits partent ; cité →
//  ville : ils rejoignent l'acquéreur ; cité supprimée : ils
//  disparaissent avec elle).
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { Character, CiteLibre, GameState, Player, TaxeNiveau } from './types'
import { makeRng } from './rng'
import { cfgOf, peupleDef, metierDef, type Cfg } from './gameData'
import { rangPaysNiveau } from './factions'
import { aMinistre } from './ministeres'
import { isNobleDyn } from './shared'
import { resynchroniserTourisme } from './regimes'

/** Consommation d'une cité libre : même règle qu'une ville de joueur —
 *  chaque habitant vivant consomme consoNourrParHab Nourriture par tour. */
/** Multiplicateur de Nourriture des Chasseurs d'une cité libre : ×1,1
 *  (revue 2026-10-16 — était ×2). */
export const MULT_NOURR_CHASSEUR_CITE = 1.1

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

// ── Gains de la population de la cité (chasseurs ×1,1 Nourriture) ──────

/** Détail des gains d'une cité libre, canal par canal :
 *    metiers     : production brute des metiers des habitants vivants —
 *                 les Chasseurs produisent 1,1 × la Nourriture,
 *    taxeMult   : multiplicateur de taxes de la cité,
 *    taxes      : production taxée (= metiers × taxeMult),
 *    conso      : consommation de la cité (négative — Nourriture par
 *                habitant vivant, comme une ville de joueur),
 *    net        : taxes − conso (peut être négatif),
 *    transfert  : net plafonné à 0 par ressource, × gainsCrediteStock
 *                 — ce que le suzerain reçoit réellement. */
export interface DetailCiteLibre {
  habitants: number
  /** adultes (âge >= adultAge) — les seuls qui portent un metier et produisent */
  adultes: number
  /** enfants vivants (âge < adultAge) — ne produisent pas mais consomment */
  enfants: number
  chasseurs: number
  metiers: Record<string, number>
  taxeMult: number
  taxes: Record<string, number>
  conso: Record<string, number>
  net: Record<string, number>
  transfert: Record<string, number>
}

/** Production brute des métiers des habitants vivants d'une cité libre.
 *  Règle propre aux cités libres : les Chasseurs produisent 1,1 × la
 *  Nourriture (les autres ressources du metier sont inchangées). */
export function detailCiteLibre(cite: CiteLibre, C: Cfg): DetailCiteLibre {
  const vivants = (cite.population ?? []).filter((c) => c.statut !== 'Décédé')
  const adultes = vivants.filter((c) => c.age >= C.p.adultAge).length
  const enfants = vivants.length - adultes
  const metiers: Record<string, number> = {}
  let chasseurs = 0
  for (const c of vivants) {
    if (!c.metier) continue
    const td = metierDef(c.metier, C.config)
    if (!td) continue
    const chass = c.metier === C.p.metierChasseur
    if (chass) chasseurs++
    if (td.ressource1 && td.valeur1 !== 0) {
      const v = chass && td.ressource1 === 'Nourriture' ? td.valeur1 * MULT_NOURR_CHASSEUR_CITE : td.valeur1
      metiers[td.ressource1] = (metiers[td.ressource1] ?? 0) + v
    }
    if (td.ressource2 && td.valeur2 !== 0) {
      const v = chass && td.ressource2 === 'Nourriture' ? td.valeur2 * MULT_NOURR_CHASSEUR_CITE : td.valeur2
      metiers[td.ressource2] = (metiers[td.ressource2] ?? 0) + v
    }
  }
  // Taxes de la cité : le niveau module TOUTES les ressources
  const taxeMult = facteurTaxesCite(cite, C)
  const taxes: Record<string, number> = {}
  for (const [res, v] of Object.entries(metiers)) {
    const tv = v * taxeMult
    if (tv !== 0) taxes[res] = tv
  }
  // Consommation de la cité : comme une ville de joueur — la population
  //  vivante consomme consoNourrParHab Nourriture par habitant et par tour.
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
  return { habitants: vivants.length, adultes, enfants, chasseurs, metiers, taxeMult, taxes, conso, net, transfert }
}

/** Taxes que les cités libres sous suzeraineté d'un joueur lui versent
 *  par tour (somme des transferts — vue « prochain tour » du récap). */
export function taxesCitesLibresRecues(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  // Grand Chambellan : +10 % sur les taxes reçues (même formule que
  //  l'étape moteur appliquerTaxesCitesLibres — l'aperçu du récap
  //  doit afficher la même valeur que le prochain débit réel).
  const boostChambellan = aMinistre(state, p, 'Grand Chambellan') ? 1.1 : 1
  for (const cite of citesSuzerainesDe(state, p)) {
    for (const [res, v] of Object.entries(detailCiteLibre(cite, C).transfert)) {
      out[res] = (out[res] ?? 0) + v * boostChambellan
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
    // Grand Chambellan (ministère, refonte 2026-10-14) : +10 % sur les
    // taxes reçues des cités libres (cumulable avec les taxes des villes).
    const boostChambellan = aMinistre(state, suz, 'Grand Chambellan') ? 1.1 : 1
    for (const [res, v] of Object.entries(d.transfert)) {
      if (v === 0) continue
      const vv = v * boostChambellan
      gains[res] = (gains[res] ?? 0) + vv
      const rs = suz.resources[res]
      if (rs) rs.stock += vv
      parts.push(`+${Math.round(vv * 10) / 10} ${res}`)
    }
    if (parts.length > 0) {
      state.log.push({
        turn: state.turn + 1, type: 'Système', joueur: suz.n,
        texte: `🗼 Cités libres — ${suz.nom} reçoit les taxes de ${cite.nom} (${d.habitants} hab. dont ${d.adultes} adulte(s) / ${d.enfants} enfant(s), ${d.chasseurs} chasseur(s) : Nourriture ×1,1) : ${parts.join(', ')}.`,
      })
    }
  }
  return out
}

// ── Population : ajout manuel d'habitants (roturiers ou nobles) ─────
//  Retour Thibaut (2026-10-14) : la population d'une cité libre est
//  « semblable en tout point » à celle d'un joueur — roturiers OU
//  nouvelle famille noble, comme setup.ajouterHabitant pour les
//  joueurs. Comme pour les villes de joueur, l'ajout est manuel : les
//  naissances, mariages et décès des cités libres se jouent au plateau
//  (le statut reste éditable dans l'onglet 👥 Population).

/** Ajoute des habitants roturiers à une cité libre (adultes, metier
 *  Chasseur par défaut, culture de la cité). Noms tirés dans une
 *  banque de noms de peuple au hasard (graine d'état → déterministe). */
export function ajouterHabitantsCiteLibre(
  state: GameState, cite: CiteLibre, nb: number, C: Cfg = cfgOf(state.config),
): number {
  return ajouterCiteLibre(state, cite, nb, false, C)
}

/** Ajoute une NOUVELLE famille noble à la cité libre (retour Thibaut
 *  2026-10-14) : un nom de famille jamais utilisé comme dynastie —
 *  jamais une famille déjà existante — comme pour les joueurs
 *  (setup.ajouterHabitant). Ces nobles apparaissent dans le tableau
 *  « La cour » de la cité (onglet 👥 Population) et peuvent être
 *  mariés ou donnés comme ceux des joueurs. */
export function ajouterFamilleNobleCiteLibre(
  state: GameState, cite: CiteLibre, nb: number, C: Cfg = cfgOf(state.config),
): number {
  return ajouterCiteLibre(state, cite, nb, true, C)
}

/** Corps partagé des deux ajouts (roturiers / nouvelle famille noble). */
function ajouterCiteLibre(
  state: GameState, cite: CiteLibre, nb: number,
  noble: boolean, C: Cfg,
): number {
  if (nb <= 0) return 0
  const rng = makeRng(state.rngState)
  const pop = cite.population ?? (cite.population = [])
  const peuple = C.peuples.length > 0
    ? peupleDef(rng.pick(C.peuples), C.config)
    : undefined
  const banque = peuple ?? C.banquesNoms[0]
  const culture = cite.culture || C.config.cultures[0]?.nom || ''
  // nouvelle famille noble : nom jamais utilisé comme dynastie
  let dynNoble = ''
  if (noble) {
    const utilisees = new Set(pop.map((c) => c.dynastie))
    const dispo = banque.noms.filter((n) => !utilisees.has(n))
    dynNoble = dispo.length > 0 ? rng.pick(dispo) : `${rng.pick(banque.noms)} ${pop.length + 1}`
  }
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
    // tirage de l'âge UNE fois : enfant ou adulte (comme setup)
    const ageTiree = rng.int(0, Math.max(1, Math.round(C.p.setupAgeMax)))
    const c: Character = {
      id: `cl_${cite.nom}_${state.turn}_${pop.length + 1}_${i}`,
      nom: noble ? dynNoble : rng.pick(banque.noms),
      prenom: sexe === 'M' ? rng.pick(banque.prenomsM) : rng.pick(banque.prenomsF),
      dynastie: noble ? dynNoble : C.p.dynastieRoturier,
      sexe,
      // Pyramide d'âges réaliste (revue 2026-10-16) : comme la
      //  population d'un joueur au setup — certains habitants sont
      //  des ENFANTS (0..adultAge) sans metier (ils ne produisent pas
      //  mais consomment), les adultes reçoivent le metier Chasseur.
      age: ageTiree,
      culture,
      ville: cite.nom,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
      traits,
      statut: 'Sain',
      mariage: null,
      mariageId: null, mereId: null, pereId: null, pereBioId: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      metier: ageTiree >= C.p.adultAge ? C.p.metierChasseur : null,
      education: null,
      fecondite: 0,
      armee: null,
    }
    pop.push(c)
    ajoutes++
  }
  state.rngState = rng.state()
  state.log.push({
    turn: state.turn, type: 'Système', joueur: null,
    texte: `👥 ${ajoutes} habitant(s) ajouté(s) à la cité libre ${cite.nom} — ${noble ? `nouvelle famille noble « ${dynNoble} »` : 'roturiers'}.`,
  })
  return ajoutes
}

// ── Population « comme un joueur » (onglet 👥 Population) ────────────

/** Métiers accessibles pour la population d'une cité libre (comme
 *  metiersAccessibles pour un joueur) : Chasseur et Gouverneur, plus
 *  les métiers d'éducation enseignés par un Professeur VIVANT DE LA
 *  CITÉ. Pas de Ministre ni de Dirigeant : une cité libre n'a ni
 *  conseil ni dirigeant (son suzerain est un joueur). */
export function metiersAccessiblesCite(
  state: GameState, cite: CiteLibre, C: Cfg = cfgOf(state.config),
): string[] {
  const out: string[] = [C.p.metierChasseur, C.p.metierGouverneur]
  const pop = cite.population ?? []
  const educations = new Set<string>()
  for (const c of pop) {
    if (c.statut !== 'Décédé' && c.metier === C.p.metierProfesseur && c.education) {
      educations.add(c.education)
    }
  }
  for (const t of C.metiers) {
    if (t.attribution === 'Education' && t.education && educations.has(t.education)) {
      out.push(t.metier)
    }
  }
  return [...new Set(out)]
}

/** Pseudo-joueur représentant une cité libre pour la VALIDATION des
 *  metiers (validateMetierAssignment, validation.ts) : la population de
 *  la cité est semblable en tout point à celle d'un joueur — les
 *  contrôles de cohérence (noblesse, genre, éducation, culture) y
 *  sont appliqués avec la culture de la cité. NB : les règles
 *  d'unicité du classeur (Dirigeant/Gouverneur/Professeur) restent
 *  vacantes pour une cité (pas d'école, pas de dirigeant). */
export function pseudoJoueurDeCite(cite: CiteLibre): Player {
  return {
    n: -1,
    nom: cite.nom,
    peuple: '',
    culture: cite.culture ?? '',
    regime: '',
    resources: {},
    villes: [],
    dynastie: null,
    armees: [],
    recap: null,
  }
}

/** Niveau de taxes d'une cité libre (« Moyenne » si absent). */
export function taxesCite(cite: CiteLibre): TaxeNiveau {
  return cite.taxes ?? 'Moyenne'
}

// ── Transformations ville ↔ cité libre (retour Thibaut 2026-10-15) ──────────

/** Transforme une VILLE de joueur en CITÉ LIBRE (perte, libération,
 *  arbitre…). La ville quitte le joueur ; sa population « classique »
 *  devient la population de la cité libre (les habitants de la cour
 *  restent chez le joueur — un noble ne change de porteur que sur DON,
 *  comme transfererVille). L'ANCIEN PROPRIÉTAIRE reçoit 1 émissaire
 *  PLACÉ dans cette cité (retour Thibaut : « un joueur dont la cité
 *  devient libre reçoit un émissaire dans cette cité »). */
export function villeDevientCiteLibre(
  state: GameState,
  p: Player,
  idx: number,
): string | null {
  const ville = p.villes[idx]
  if (!ville) return null
  // Tourisme (retour Thibaut 2026-10-16) : la production de la ville
  //  part avec elle — stock recalculé = production courante.
  resynchroniserTourisme(state, p, `ville « ${ville.nom} » devenue cité libre`)
  const nom = ville.nom
  const cites = state.citesLibres ?? (state.citesLibres = [])
  // nom unique parmi les cités libres
  let nomFinal = nom
  let n = 1
  while (cites.some((c) => c.nom === nomFinal)) nomFinal = `${nom} ${++n}`
  // population : les habitants INSCRITS dans cette ville partent
  const pop = state.population[p.n] ?? []
  const partants = pop.filter((c) => c.ville === nom)
  const restants = pop.filter((c) => c.ville !== nom)
  state.population[p.n] = restants
  // les nobles restants chez le joueur restent où ils sont (réancrés
  //  sur sa première ville restante s'ils vivaient dans la ville perdue)
  for (const c of restants) {
    if (isNobleDyn(c.dynastie, cfgOf(state.config)) && c.ville === nom) {
      c.ville = p.villes.find((v) => v.nom !== nom)?.nom ?? c.ville
    }
  }
  p.villes.splice(idx, 1)
  cites.push({
    nom: nomFinal,
    type: (ville.type ?? 'Ville') === 'Ch\u00e2teau' ? 'Militaires - Ch\u00e2teau' : 'Industrielles - Ville',
    culture: ville.culture,
    taxes: ville.taxes,
    habitation: (ville.type ?? 'Ville') === 'Ch\u00e2teau' ? 'Ch\u00e2teau' : 'Hameau',
    suzerain: null,
    emissaires: {},
    population: partants,
  })
  // l'ancien propriétaire reçoit 1 émissaire PLACÉ dans cette cité
  const cite = cites[cites.length - 1]
  const e = cite.emissaires ?? (cite.emissaires = {})
  e[p.n] = (e[p.n] ?? 0) + 1
  state.log.push({
    turn: state.turn, type: 'Syst\u00e8me', joueur: p.n,
    texte: `\u{1F3FC} ${nomFinal} n'est plus une ville de ${p.nom} \u2014 elle devient une CIT\u00c9 LIBRE. ${p.nom} re\u00e7oit 1 \u00e9missaire plac\u00e9 dans cette cit\u00e9.`,
  })
  return nomFinal
}

/** Transforme une CITÉ LIBRE en VILLE d'un joueur (annexion,
 *  conquête, achat…). La cité disparaît de la liste ; ses habitants
 *  rejoignent la population du joueur (ancrés sur la nouvelle ville) ;
 *  le suzerain est libéré ; les émissaires PLACÉS par les joueurs sont
 *  RECREDITÉS à leurs réserves. */
export function citeLibreDevientVille(
  state: GameState,
  nomCite: string,
  acquereur: Player,
): string | null {
  const cites = state.citesLibres ?? []
  const i = cites.findIndex((c) => c.nom === nomCite)
  if (i < 0) return null
  const cite = cites[i]
  // restituer les émissaires placés aux réserves de leurs joueurs
  for (const [nStr, nb] of Object.entries(cite.emissaires ?? {})) {
    const q = state.players.find((x) => x.n === Number(nStr))
    if (q) q.emissaires = (q.emissaires ?? 0) + nb
  }
  // nom unique chez l'acquéreur
  let nomFinal = cite.nom
  let n = 1
  while (acquereur.villes.some((v) => v.nom === nomFinal)) nomFinal = `${cite.nom} ${++n}`
  // la population de la cité rejoint l'acquéreur, ancée sur la ville
  const pop = state.population[acquereur.n] ?? (state.population[acquereur.n] = [])
  for (const c of cite.population ?? []) {
    c.ville = nomFinal
    pop.push(c)
  }
  // collision de nom avec une ville existante de l'acquéreur : renommer
  cites.splice(i, 1)
  acquereur.villes.push({
    nom: nomFinal,
    culture: cite.culture ?? acquereur.culture,
    taxes: cite.taxes ?? 'Moyenne',
    type: cite.habitation === 'Ch\u00e2teau' ? 'Ch\u00e2teau' : 'Ville',
    rang: cite.habitation === 'Ch\u00e2teau' ? 'Motte' : 'Hameau',
    batiments: [],
    amenagements: [],
    autres: [],
  })
  state.log.push({
    turn: state.turn, type: 'Syst\u00e8me', joueur: acquereur.n,
    texte: `\u{1F3FC} La cit\u00e9 libre ${cite.nom} devient la ville \u00ab ${nomFinal} \u00bb de ${acquereur.nom} \u2014 ses habitants lui appartiennent d\u00e9sormais ; les \u00e9missaires plac\u00e9s sont restitu\u00e9s \u00e0 leurs r\u00e9serves.`,
  })
  return nomFinal
}
