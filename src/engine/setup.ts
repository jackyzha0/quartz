// ══════════════════════════════════════════════════════════════════════
//  Génération de la population initiale
//  (portage de la macro VBA GenererPopulationInitiale / frmInitPop)
//  La config (référentiels + paramètres) vient de la configuration
//  COMMUNE à toutes les parties (voir store) : tout reste modifiable
//  à chaud ensuite, sans aucune contrainte.
// ══════════════════════════════════════════════════════════════════════

import type { Character, GameState, Player } from './types'
import { makeRng, type Rng } from './rng'
import { cfgOf, cloneDefaultConfig, peupleDef, type Cfg } from './gameData'
import type { GameConfig } from '../config/defaultConfig'
import { computeAgeMax, computeFecondite, isNobleDyn } from './engine'

export interface SetupLine {
  nom: string
  peuple: string
  culture: string
  regime: string
  taillePopulation: number
  pourcentageMariages: number
  villes: string[]
}

const DEFAULT_VILLES = ['Capitale', 'Bourg']

/**
 * Crée une partie complète à 8 joueurs à partir des paramètres de setup.
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
    seed,
    rngState: rng.state(),
    turn: 1,
    saison: 'Été',
    modDanger: 0,
    config: startConfig,
    players: [],
    population: {},
    log: [
      { turn: 1, type: 'Système', joueur: null, texte: `Partie créée (graine ${seed}, mode ${mode ?? 'local'}). Tour 1 = année 1.` },
    ],
    history: [],
  }
  for (let i = 0; i < 8; i++) {
    const s = setups[i]
    const n = i + 1
    const player = makePlayer(n, s, C)
    state.players.push(player)
    state.population[n] = makePopulation(player, s, rng, C)
  }
  state.rngState = rng.state()
  return state
}

export function makePlayer(n: number, s: SetupLine, C: Cfg): Player {
  const resources: Record<string, { stock: number; prod: number }> = {}
  for (const r of C.ressources) {
    resources[r] = { stock: r === 'Nourriture' ? 50 : r === 'Or' ? 20 : 0, prod: 0 }
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
      batiments: idx === 0 ? ['Ecole élémentaire', 'Herboristerie'] : [],
    })),
    dynastie: null,
    armees: [],
    recap: null,
  }
}

export function makePopulation(player: Player, s: SetupLine, rng: Rng, C: Cfg): Character[] {
  const taille = Math.max(10, s.taillePopulation || 30)
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
      mere: null,
      pere: null,
      pereBio: null,
      enfantBatard: false,
      titre: null,
      education: null,
      fecondite: 0,
      ageMax: 0,
      armee: null,
    }
    c.ageMax = computeAgeMax(c, rng, C)
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
    pereBio: null, enfantBatard: false, titre: null, education: null,
    fecondite: 0, ageMax: 0, armee: null,
  }
  const reine: Character = {
    id: nextId(), nom: reineName, prenom: rng.pick(prenomsF), dynastie: reineName,
    sexe: 'F', age: 20, culture: player.culture, ville: player.villes[0].nom,
    orientation: (C.orientations[0]?.nom ?? 'Hétérosexuelle') as Character['orientation'],
    traits: randomTraits(), statut: 'Sain', mariage: null, mere: null, pere: null,
    pereBio: null, enfantBatard: false, titre: null, education: null,
    fecondite: 0, ageMax: 0, armee: null,
  }
  roi.mariage = `${reine.prenom} ${reine.nom}`
  reine.mariage = `${roi.prenom} ${roi.nom}`
  roi.ageMax = computeAgeMax(roi, rng, C)
  reine.ageMax = computeAgeMax(reine, rng, C)
  // Le Dirigeant est le roi si l'hérédité est masculine ou paritaire, sinon la reine
  if (heredite === 'Féminine') reine.titre = C.p.titreDirigeant
  else roi.titre = C.p.titreDirigeant
  pop.push(roi, reine)

  // 3. Les enfants sont répartis dans le couple royal
  for (const c of pop) {
    if (c.age >= C.p.adultAge || c === roi || c === reine) continue
    if (rng.chance(0.7)) {
      c.nom = roi.nom
      c.dynastie = heredite === 'Féminine' ? reineName : roi.nom
      c.mere = `${reine.prenom} ${reine.nom}`
      c.pere = `${roi.prenom} ${roi.nom}`
    }
  }

  // 4. Titres aléatoires pour les adultes non-Dirigeant, mariages des roturiers.
  //    Seuls les titres roturiers à attribution Manuelle du classeur sont
  //    tirés ici (aucun blocage : corrigez ensuite dans la table Population).
  const adultes = pop.filter((c) => c.age >= C.p.adultAge && c.titre !== C.p.titreDirigeant)
  const titresRoturiers = C.titres
    .filter((t) => !t.nobleSeul && (t.attribution === 'Manuelle' || t.attribution === ''))
    .map((t) => t.titre)
  for (const c of adultes) {
    if (!c.titre && titresRoturiers.length > 0 && rng.chance(0.6)) c.titre = rng.pick(titresRoturiers)
  }
  // ~le % demandé d'adultes roturiers se marient entre eux
  const celibataires = adultes.filter((c) => !c.mariage && !isNobleDyn(c.dynastie, C))
  const nbMariages = Math.floor((celibataires.length * pourcentMariages) / 100)
  const celibM = rng.shuffle(celibataires.filter((c) => c.sexe === 'M'))
  const celibF = rng.shuffle(celibataires.filter((c) => c.sexe === 'F'))
  for (let i = 0; i < Math.min(nbMariages, celibM.length, celibF.length); i++) {
    const h = celibM[i]
    const f = celibF[i]
    h.mariage = `${f.prenom} ${f.nom}`
    f.mariage = `${h.prenom} ${h.nom}`
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
    taillePopulation: 30,
    pourcentageMariages: 40,
    villes: i === 0 ? ['Capitale', 'Bourg'] : ['Capitale'],
  }))
}
