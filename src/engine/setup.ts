// ══════════════════════════════════════════════════════════════════════
//  Génération de la population initiale
//  (portage de la macro VBA GenererPopulationInitiale / frmInitPop)
//  La config (référentiels + paramètres) vient de la configuration
//  COMMUNE à toutes les parties (voir store) : tout reste modifiable
//  à chaud ensuite, sans aucune contrainte.
// ══════════════════════════════════════════════════════════════════════

import type { Character, CiteLibre, GameState, Player } from './types'
import { makeRng, type Rng } from './rng'
import { cfgOf, cloneDefaultConfig, peupleDef, type Cfg } from './gameData'
import type { GameConfig } from '../config/defaultConfig'
import { computeFecondite, isNobleDyn, ajouterHabitantsCiteLibre, rangsDisponibles } from './engine'
import { fullName } from './shared'
import { SCHEMA_VERSION_ETAT } from './migrations'

export interface SetupLine {
  nom: string
  peuple: string
  culture: string
  regime: string
  taillePopulation: number
  pourcentageMariages: number
  villes: string[]
  /** Type d'habitation de la première ville (la capitale) — retour
   *  Thibaut, marqueur (r) : château ou cité au choix de chaque joueur. */
  typeCapitale?: 'Ville' | 'Château'
}

// Par défaut, chaque joueur commence avec UNE ville (« Capitale »).
const DEFAULT_VILLES = ['Capitale']

/**
 * Crée une partie complète à partir des paramètres de setup — UNE
 * LIGNE PAR JOUEUR, le nombre de joueurs est donc LIBRE (retour
 * Thibaut 2026-10-14, marqueur (q) : sélecteur 2-8 à la création).
 * La partie démarre avec la configuration commune (sinon : défauts du classeur).
 */
export function createGame(setups: SetupLine[], seed: number, mode?: 'local' | 'supabase', config?: GameConfig): GameState {
  const rng = makeRng(seed)
  const startConfig: GameConfig = config
    ? (JSON.parse(JSON.stringify(config)) as GameConfig)
    : cloneDefaultConfig()
  const C = cfgOf(startConfig)
  const state: GameState = {
    version: 1,
    // Né à la version courante du schéma (aucune migration à jouer).
    schema: SCHEMA_VERSION_ETAT,
    seed,
    rngState: rng.state(),
    turn: 1,
    saison: 'Été',
    modDanger: 0,
    config: startConfig,
    players: [],
    population: {},
    citesLibres: [],
    log: [
      { turn: 1, type: 'Système', joueur: null, texte: `Partie créée à ${setups.length} joueur(s) (graine ${seed}, mode ${mode ?? 'local'}). Tour 1 = année 1.` },
    ],
    history: [],
  }
  // Nombre de joueurs = nombre de lignes de setup (marqueur (q)).
  for (let i = 0; i < setups.length; i++) {
    const s = setups[i]
    const n = i + 1
    const player = makePlayer(n, s, C)
    state.players.push(player)
    state.population[n] = makePopulation(player, s, rng, C)
  }
  state.rngState = rng.state()

  // Cités libres : AUTANT de cités libres que de joueurs (retour
  //  Thibaut 2026-10-14 : une par joueur, créées AUTOMATIQUEMENT).
  // Chaque cité démarre avec 50 habitants (adultes Chasseurs —
  // Nourriture ×1,1 pour les cités libres) ; la population consomme
  //  de la Nourriture comme une ville de joueur.
  // (plus de répartition tournante), et type d'habitation Hameau ou
  // Château tiré au hasard. Tout est modifiable ensuite dans
  // l'onglet « 🗼 Cités libres ».
  const typesCites = C.config.citesLibres ?? []
  state.citesLibres = []
  for (let i = 0; i < state.players.length; i++) {
    const cite: CiteLibre = {
      nom: `Cité libre ${i + 1}`,
      type: typesCites.length > 0 ? rng.pick(typesCites).type : 'Ville',
      habitation: rng.pick(['Hameau', 'Château'] as ('Hameau' | 'Château')[]),
      culture: rng.pick(C.cultures)?.nom ?? '',
      taxes: 'Moyenne',
      suzerain: null,
      emissaires: {},
      population: [],
    }
    state.citesLibres.push(cite)
    ajouterHabitantsCiteLibre(state, cite, 50, C)
  }
  state.log.push({
    turn: 1, type: 'Système', joueur: null,
    texte: `🗼 ${state.citesLibres.length} cités libres créées (une par joueur) — chacune démarre avec 50 habitants (Chasseurs : Nourriture ×1,1), une culture et un type tirés au hasard (habitation Hameau ou Château) ; sa population consomme de la Nourriture comme une ville de joueur. Chaque joueur démarre avec 1 ville de 50 habitants et 100 Nourriture, 80 Or, 15 Bois.`,
  })
  return state
}

export function makePlayer(n: number, s: SetupLine, C: Cfg): Player {
  const resources: Record<string, { stock: number; prod: number }> = {}
  for (const r of C.ressources) {
    // Stocks de départ du classeur : 100 Nourriture, 80 Or, 15 Bois.
    resources[r] = {
      stock: r === 'Nourriture' ? 100 : r === 'Or' ? 80 : r === 'Bois' ? 15 : 0,
      prod: 0,
    }
  }
  const peuples = C.peuples
  return {
    n,
    nom: s.nom || `Joueur ${n}`,
    peuple: s.peuple || peuples[(n - 1) % Math.max(1, peuples.length)],
    culture: s.culture || C.cultures[(n - 1) % Math.max(1, C.cultures.length)]?.nom || '',
    regime: s.regime || C.regimes[0]?.nom || 'Monarchie',
    resources,
    villes: (s.villes && s.villes.length > 0 ? s.villes : DEFAULT_VILLES).map((nom, idx) => ({
      nom,
      culture: s.culture,
      taxes: 'Moyenne',
      // Type d'habitation (Ville / Château) et rang par défaut —
      // modifiables par ville sur la page « Pays ». Déterminent la
      // consommation par tour et la garnison de base (table
      // typesHabitation, Référentiels → « Habitations »).
      type: idx === 0 ? (s.typeCapitale ?? 'Ville') : 'Ville',
      rang: rangsDisponibles(idx === 0 ? (s.typeCapitale ?? 'Ville') : 'Ville', C)[0] ?? 'Hameau',
      // Retour Thibaut (marqueur (r)) : PLUS AUCUN bâtiment par défaut
      // dans la capitale — tout se construit au plateau.
      batiments: [],
      amenagements: [],
      autres: [],
    })),
    dynastie: null,
    armees: [],
    recap: null,
    rang: rangParDefaut(s.regime || C.regimes[0]?.nom || 'Monarchie', C),
    vassalDe: null,
    progresDebloques: [],
  }
}

/** Rang de pays par défaut : premier rang de l'échelle féodale unique
 *  (Baronnie), quel que soit le régime politique — la couleur civique
 *  des régimes passe par leurs lois (Elections, Pour le peuple…).
 *  Modifiable ensuite depuis la page « Royaume ». */
export function rangParDefaut(_regime: string, C: Cfg): string {
  return (C.config.paysRangs ?? [])[0]?.nom ?? 'Baronnie'
}

export function makePopulation(player: Player, s: SetupLine, rng: Rng, C: Cfg): Character[] {
  // Habitants par VILLE (défaut : 50) — la population est répartie
  // entre les villes du joueur, la famille de départ vient en plus.
  const parVille = Math.max(2, s.taillePopulation || 50)
  const taille = parVille * Math.max(1, player.villes.length)
  const pourcentMariages = Math.min(100, Math.max(0, s.pourcentageMariages ?? 40))
  const peup = peupleDef(player.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  const fallback = C.banquesNoms[0]
  const noms = peup?.noms ?? fallback.noms
  const prenomsM = peup?.prenomsM ?? fallback.prenomsM
  const prenomsF = peup?.prenomsF ?? fallback.prenomsF
  const cult = C.cultures.find((c) => c.nom === player.culture)
  const heredite = cult ? cult.heredite : 'Masculine'
  const pop: Character[] = []

  let id = 0
  const nextId = () => `p${player.n}c${++id}`

  function randomOrientation(): Character['orientation'] {
    return rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation']
  }

  function randomSexe(): 'M' | 'F' {
    return rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F'
  }

  function randomTraits(): [string, string, string] {
    // Comme la macro VBA AjouterPopulation : 1er trait systématique,
    // 2e à 50 %, 3e à 30 % — tirage pondéré dans traits_genetiques (7.19),
    // sans doublon (exclusion des traits déjà tirés).
    const traits: [string, string, string] = ['', '', '']
    const draw = (exclus: string[]): string => {
      const pool = C.traits.filter((td) => td.weight > 0 && !exclus.includes(td.name))
      if (pool.length === 0) return ''
      return rng.pickWeighted(pool, (td) => td.weight).name
    }
    traits[0] = draw([])
    if (traits[0]) traits[1] = rng.chance(0.5) ? draw([traits[0]]) : ''
    if (traits[1] && rng.chance(0.3)) traits[2] = draw([traits[0], traits[1]])
    return traits
  }

  // 1. Population générale : sexes pondérés par le classeur, âges 0-setupAgeMax
  for (let i = 0; i < taille - 2; i++) {
    const sexe: 'M' | 'F' = randomSexe()
    const c: Character = {
      id: nextId(),
      nom: rng.pick(noms),
      prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
      dynastie: C.p.dynastieRoturier,
      sexe,
      age: rng.int(0, Math.max(1, Math.round(C.p.setupAgeMax))),
      culture: player.culture,
      ville: rng.pick(player.villes).nom,
      orientation: randomOrientation(),
      traits: randomTraits(),
      statut: 'Sain',
      mariage: null,
      mariageId: null, mereId: null, pereId: null, pereBioId: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      metier: null,
      education: null,
      fecondite: 0,
      armee: null,
    }
    pop.push(c)
  }

  // 2. Couple royal : un homme et une femme adultes (âges forcés à 20),
  //    chacun reçoit un nom distinct devenu sa dynastie, mariés.
  const roiName = rng.pick(noms)
  let reineName = rng.pick(noms.filter((x) => x !== roiName))
  if (!reineName) reineName = roiName + 'e'
  const roi: Character = {
    id: nextId(), nom: roiName, prenom: rng.pick(prenomsM), dynastie: roiName,
    sexe: 'M', age: 20, culture: player.culture, ville: player.villes[0].nom,
    orientation: (C.orientations[0]?.nom ?? 'Hétérosexuelle') as Character['orientation'],
    traits: randomTraits(), statut: 'Sain', mariage: null, mere: null, pere: null,
    mariageId: null, mereId: null, pereId: null, pereBioId: null,
    pereBio: null, enfantBatard: false, metier: null, education: null,
    fecondite: 0, armee: null,
  }
  const reine: Character = {
    id: nextId(), nom: reineName, prenom: rng.pick(prenomsF), dynastie: reineName,
    sexe: 'F', age: 20, culture: player.culture, ville: player.villes[0].nom,
    orientation: (C.orientations[0]?.nom ?? 'Hétérosexuelle') as Character['orientation'],
    traits: randomTraits(), statut: 'Sain', mariage: null, mere: null, pere: null,
    mariageId: null, mereId: null, pereId: null, pereBioId: null,
    pereBio: null, enfantBatard: false, metier: null, education: null,
    fecondite: 0, armee: null,
  }
  roi.mariage = `${reine.prenom} ${reine.nom}`
  reine.mariage = `${roi.prenom} ${roi.nom}`
  roi.mariageId = reine.id
  reine.mariageId = roi.id
  // Le Dirigeant est le roi si l'hérédité est masculine ou paritaire, sinon la reine
  if (heredite === 'Féminine') reine.metier = C.p.metierDirigeant
  else roi.metier = C.p.metierDirigeant
  pop.push(roi, reine)

  // 3. Fratrie du couple dirigeant (« potentiellement des frères et
  //    sœurs ») : 0 à 2 frères/sœurs pour chacun des deux époux.
  const ajouterFratrie = (ref: Character, nb: number) => {
    for (let i = 0; i < nb; i++) {
      const sexe = randomSexe()
      const frere: Character = {
        id: nextId(), nom: ref.nom, prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
        dynastie: ref.dynastie,
        sexe, age: rng.int(20, 40), culture: player.culture,
        ville: player.villes[0].nom,
        orientation: randomOrientation(), traits: randomTraits(), statut: 'Sain',
        mariage: null, mere: null, pere: null, pereBio: null, enfantBatard: false,
        mariageId: null, mereId: null, pereId: null, pereBioId: null,
        metier: C.p.metierChasseur, education: null, fecondite: 0, armee: null,
      }
      pop.push(frere)
    }
  }
  ajouterFratrie(roi, rng.chance(0.6) ? rng.int(1, 2) : 0)
  ajouterFratrie(reine, rng.chance(0.6) ? rng.int(1, 2) : 0)

  // 4. Enfants du couple (« potentiellement des enfants ») : 0 à 4,
  //    âges 0-15, dynastie selon l'hérédité de la culture.
  const nbEnfants = rng.chance(0.85) ? rng.int(1, 4) : 0
  for (let i = 0; i < nbEnfants; i++) {
    const sexe = randomSexe()
    const enfant: Character = {
      id: nextId(),
      nom: heredite === 'Féminine' ? reineName : roi.nom,
      prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
      dynastie: heredite === 'Féminine' ? reineName : roi.nom,
      sexe, age: rng.int(0, 15), culture: player.culture,
      ville: player.villes[0].nom,
      orientation: randomOrientation(), traits: randomTraits(), statut: 'Sain',
      mariage: null, mere: fullName(reine), pere: fullName(roi), pereBio: null,
      mariageId: null, mereId: reine.id, pereId: roi.id, pereBioId: null,
      enfantBatard: false, metier: null, education: null, fecondite: 0, armee: null,
    }
    pop.push(enfant)
  }

  // 5. Metier par défaut des adultes : Chasseur (par défaut le seul
  //    metier accessible — les autres dépendent des professeurs,
  //    gouverneur à part, noblesse requise). Puis mariages des
  //    roturiers (~le % demandé).
  const adultes = pop.filter((c) => c.age >= C.p.adultAge && c.metier !== C.p.metierDirigeant)
  for (const c of adultes) {
    if (!c.metier) c.metier = C.p.metierChasseur
  }
  // ~le % demandé d'adultes roturiers se marient entre eux
  const celibataires = adultes.filter((c) => !c.mariageId && !isNobleDyn(c.dynastie, C))
  const nbMariages = Math.floor((celibataires.length * pourcentMariages) / 100)
  const celibM = rng.shuffle(celibataires.filter((c) => c.sexe === 'M'))
  const celibF = rng.shuffle(celibataires.filter((c) => c.sexe === 'F'))
  for (let i = 0; i < Math.min(nbMariages, celibM.length, celibF.length); i++) {
    const h = celibM[i]
    const f = celibF[i]
    h.mariage = `${f.prenom} ${f.nom}`
    f.mariage = `${h.prenom} ${h.nom}`
    h.mariageId = f.id
    f.mariageId = h.id
  }

  // 5. Fécondités calculées pour les adultes
  const fakeState: GameState = {
    config: C.config,
    version: 1, seed: 0, rngState: 0, turn: 1, saison: 'Été', modDanger: 0,
    players: [player], population: { [player.n]: pop }, log: [], history: [],
  } as GameState
  for (const c of pop) {
    c.fecondite = computeFecondite(fakeState, player, c)
  }

  return pop
}

export function defaultSetups(): SetupLine[] {
  const C = cfgOf(undefined)
  const peuples = C.peuples.length > 0 ? C.peuples : ['Basiléens']
  return Array.from({ length: 8 }, (_, i) => ({
    nom: `Joueur ${i + 1}`,
    peuple: peuples[i % peuples.length],
    culture: C.cultures[i % Math.max(1, C.cultures.length)]?.nom ?? '',
    regime: C.regimes[0]?.nom ?? 'Monarchie',
    taillePopulation: 50,
    pourcentageMariages: 40,
    villes: ['Capitale'],
  }))
}

// ══════════════════════════════════════════════════════════════════════
//  AJOUT MANUEL D'HABITANTS (page « Pays », table Population)
//  Ajoute des habitants à une ville : roturiers, ou une NOUVELLE
//  famille noble (un nom de famille jamais utilisé comme dynastie —
//  jamais une famille déjà existante). La culture de chaque nouvel
//  habitant est tirée au hasard, PONDÉRÉE par les cultures présentes
//  dans la ville. Les adultes reçoivent le metier par défaut
//  (Chasseur) — les autres metiers dépendent des professeurs.
// ══════════════════════════════════════════════════════════════════════

export function ajouterHabitant(
  state: GameState, p: Player, nomVille: string,
  noble: boolean, nb: number, C: Cfg = cfgOf(state.config),
): number {
  const ville = p.villes.find((v) => v.nom === nomVille)
  if (!ville || nb <= 0) return 0
  const rng = makeRng(state.rngState)
  const pop = state.population[p.n] ?? (state.population[p.n] = [])
  const peup = peupleDef(p.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  const fallback = C.banquesNoms[0]
  const noms = peup?.noms ?? fallback.noms
  const prenomsM = peup?.prenomsM ?? fallback.prenomsM
  const prenomsF = peup?.prenomsF ?? fallback.prenomsF
  // cultures présentes dans la ville (pondérées par leur effectif vivant)
  const cultures: Record<string, number> = {}
  for (const c of pop) {
    if (c.statut === 'Décédé' || c.ville !== nomVille) continue
    cultures[c.culture] = (cultures[c.culture] ?? 0) + 1
  }
  const poolCultures = Object.entries(cultures)
  // nouvelle famille noble : nom jamais utilisé comme dynastie
  let dynNoble = ''
  if (noble) {
    const utilisees = new Set(pop.map((c) => c.dynastie))
    const dispo = noms.filter((n) => !utilisees.has(n))
    dynNoble = dispo.length > 0 ? rng.pick(dispo) : `${rng.pick(noms)} ${pop.length + 1}`
  }
  let ajoutes = 0
  for (let i = 0; i < nb; i++) {
    const sexe: 'M' | 'F' = rng.pickWeighted(C.genres, (g) => g.poids).nom === 'Masculin' ? 'M' : 'F'
    const culture = poolCultures.length > 0
      ? rng.pickWeighted(poolCultures, ([, n]) => n)[0]
      : (ville.culture || p.culture)
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
      id: `p${p.n}a${state.turn}_${pop.length + 1}_${i}`,
      nom: noble ? dynNoble : rng.pick(noms),
      prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
      dynastie: noble ? dynNoble : C.p.dynastieRoturier,
      sexe,
      age: rng.int(C.p.adultAge, Math.max(C.p.adultAge + 1, 60)),
      culture,
      ville: nomVille,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
      traits,
      statut: 'Sain',
      mariage: null,
      mariageId: null, mereId: null, pereId: null, pereBioId: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      metier: C.p.metierChasseur,
      education: null,
      fecondite: 0,
      armee: null,
    }
    c.fecondite = computeFecondite(state, p, c)
    pop.push(c)
    ajoutes++
  }
  state.rngState = rng.state()
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `👥 ${ajoutes} habitant(s) ajouté(s) à ${nomVille} — ${noble ? `nouvelle famille noble « ${dynNoble} »` : 'roturiers'}.`,
  })
  return ajoutes
}

/** Peuple une ville ou un château nouvellement ajouté (marqueur (w),
 *  retour Thibaut) : 50 habitants SANS noble, mêmes paramètres que la
 *  population initiale de la première ville — sexes pondérés par le
 *  classeur, âges 0-setupAgeMax, traits comme la génération initiale,
 *  métier Chasseur des adultes, ~pourcentageMariages % d'adultes
 *  mariés (défaut du setup : 40), fécondités calculées. */
export function peuplerNouvelleVille(
  state: GameState, p: Player, nomVille: string,
  nb = 50, C: Cfg = cfgOf(state.config),
): number {
  const ville = p.villes.find((v) => v.nom === nomVille)
  if (!ville || nb <= 0) return 0
  const rng = makeRng(state.rngState)
  const pop = state.population[p.n] ?? (state.population[p.n] = [])
  const peup = peupleDef(p.peuple, C.config) ?? peupleDef(C.peuples[0], C.config)
  const fallback = C.banquesNoms[0]
  const noms = peup?.noms ?? fallback.noms
  const prenomsM = peup?.prenomsM ?? fallback.prenomsM
  const prenomsF = peup?.prenomsF ?? fallback.prenomsF
  const culture = ville.culture || p.culture

  const ajoutes: Character[] = []
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
      id: `p${p.n}v${state.turn}_${pop.length + 1}_${i}`,
      nom: rng.pick(noms),
      prenom: sexe === 'M' ? rng.pick(prenomsM) : rng.pick(prenomsF),
      dynastie: C.p.dynastieRoturier,
      sexe,
      age: rng.int(0, Math.max(1, Math.round(C.p.setupAgeMax))),
      culture,
      ville: nomVille,
      orientation: rng.pickWeighted(C.orientations, (o) => o.poids).nom as Character['orientation'],
      traits,
      statut: 'Sain',
      mariage: null,
      mariageId: null, mereId: null, pereId: null, pereBioId: null,
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      metier: null,
      education: null,
      fecondite: 0,
      armee: null,
    }
    if (c.age >= C.p.adultAge) c.metier = C.p.metierChasseur
    pop.push(c)
    ajoutes.push(c)
  }

  // ~pourcentageMariages % (défaut du setup : 40) d'ADULTES se marient
  // entre eux (comme la génération initiale — jamais les mineurs)
  const pourcentMariages = Math.min(100, Math.max(0, 40))
  const celibataires = ajoutes.filter((c) => c.age >= C.p.adultAge && !c.mariageId)
  const nbMariages = Math.floor((celibataires.length * pourcentMariages) / 100)
  const celibM = rng.shuffle(celibataires.filter((c) => c.sexe === 'M'))
  const celibF = rng.shuffle(celibataires.filter((c) => c.sexe === 'F'))
  for (let i = 0; i < Math.min(nbMariages, celibM.length, celibF.length); i++) {
    const h = celibM[i]
    const f = celibF[i]
    h.mariage = `${f.prenom} ${f.nom}`
    f.mariage = `${h.prenom} ${h.nom}`
    h.mariageId = f.id
    f.mariageId = h.id
  }

  for (const c of ajoutes) c.fecondite = computeFecondite(state, p, c)
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `👥 ${ajoutes.length} habitants peuplent ${nomVille} (aucun noble).`,
  })
  return ajoutes.length
}
