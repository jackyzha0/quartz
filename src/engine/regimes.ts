// ══════════════════════════════════════════════════════════════════════
//  RÉGIMES POLITIQUES & CULTURES — EFFETS AUTOMATIQUES (page « Royaume »)
//  Les régimes et les cultures sont paramétrables dans les référentiels
//  (onglet « 📚 Référentiels » → « Cultures & régimes », ou « 🎛
//  Paramètres » → Cultures / Régimes) et leurs lois chiffrées sont
//  prises en compte AUTOMATIQUEMENT par le moteur à chaque fin de tour :
//    · régime — Autoritarisme : garnison des habitations +15 par rang
//      d'habitation (champ `garnisonParRang`) ;
//    · régime — Socialisme : +5 Nourriture par tour d'été pour les
//      champs et rizières (champ `nourrEteChampRiziere`) ;
//    · culture — Communautarisme / Lunisme / Zélotisme : la capitale
//      génère +N d'une ressource par habitation de cette culture dans
//      le monde (champs `capitalNourrParHabMonde`, etc.).
//  Les autres attributs des cultures (hérédité, martialité, fécondité,
//  mariages homosexuels) sont appliqués dans setup / naissances /
//  armees / titres. Les règles restées textuelles (terres de
//  succession, serments supplémentaires, cases de terrain…) restent
//  descriptives tant que ces systèmes ne sont pas modélisés.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player, Saison } from './types'
import { cfgOf, cultureDef, type Cfg } from './gameData'
import { aMinistre } from './ministeres'
import { garnisonBatiment } from './batiments'
import { garnisonFactionVille, rangPaysNiveau } from './factions'
import { nomRang, garnisonBaseVille } from './habitations'

export { nomRang } from './habitations'

/** Niveau du rang d'habitation d'une ville (1 = Hameau / Motte, 2 = Cité /
 *  Donjon, 3 = Grande Cité / Forteresse — ordre de la table
 *  typesHabitation pour le type de la ville). Défaut : 1. */
export function rangNiveau(ville: City, C: Cfg): number {
  const type = ville.type ?? 'Ville'
  const nom = nomRang(ville.rang ?? C.config.rangsHabitation?.[0]?.rang ?? 'Hameau')
  const table = C.config.typesHabitation ?? []
  // niveau DANS l'échelle du type de la ville (1er rang du type = 1)
  const rangsType = table.filter((d) => d.type.toLowerCase() === type.toLowerCase())
  const idx = rangsType.findIndex((d) => nomRang(d.rang).toLowerCase() === nom.toLowerCase())
  if (idx >= 0) return idx + 1
  // Repli ancien format : table rangsHabitation (échelle Ville)
  const idx2 = (C.config.rangsHabitation ?? [])
    .findIndex((r) => nomRang(r.rang).toLowerCase() === nom.toLowerCase())
  return idx2 >= 0 ? idx2 + 1 : 1
}

/** Garnison des habitations d'une ville : garnison de base du rang
 *  d'habitation (typesHabitation — Hameau 10, Cité 24, Motte 26,
 *  Forteresse 90…), garnisons statiques des bâtiments, bonus de la
 *  loi du régime (ex. Autoritarisme : + garnisonParRang × niveau du
 *  rang d'habitation), bonus des règles de faction actives
 *  (engine/factions.ts — état du jeu requis en 4e argument) et garnisons
 *  des technologies de progrès débloquées (engine/progres.ts).
 *  Valeur d'état (pas un flux) : affichée sous la culture de chaque
 *  ville (page « Pays ») et du pays (page « Royaume »). */
export function garnisonHabitationVille(p: Player, ville: City, C: Cfg, state?: GameState): number {
  let g = garnisonBaseVille(ville, C)
  // Ministères : bonus permanent crédité à la prise de fonction d'un
  //  Connétable (+15 par ville — engine/ministeres.ts, marqueur (y)).
  g += p.garnisonMinisteres ?? 0
  // Grand prévôt (marqueur (y)) : « +10 Garnison dans vos habitations
  //  par rang de pays » — bonus DYNAMIQUE (suit le rang courant du
  //  pays), nécessite l'état (population) pour vérifier le ministre.
  if (state && aMinistre(state, p, 'Grand prévôt')) {
    g += 10 * rangPaysNiveau(p, C)
  }
  for (const b of ville.batiments) g += garnisonBatiment(b, C)
  const regime = C.regimes.find((r) => r.nom === p.regime)
  const bonus = regime?.garnisonParRang ?? 0
  if (bonus) g += bonus * rangNiveau(ville, C)
  if (state) g += garnisonFactionVille(state, p, ville, C)
  return g
}

/** Garnison totale des habitations d'un pays (toutes villes). */
export function garnisonHabitationsPays(p: Player, C: Cfg, state?: GameState): number {
  let g = 0
  for (const v of p.villes) g += garnisonHabitationVille(p, v, C, state)
  return g
}

/** Effets par tour de la loi chiffrée du régime du pays
 *  (ex. Socialisme : +N Nourriture par tour d'été pour les champs et
 *  rizières). */
export function effetsRegime(p: Player, saison: Saison, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  const regime = C.regimes.find((r) => r.nom === p.regime)
  if (!regime) return out
  const n = regime.nourrEteChampRiziere ?? 0
  if (n && saison === 'Été') {
    let nb = 0
    for (const v of p.villes) {
      for (const a of v.amenagements ?? []) {
        if (a === 'Champ' || a === 'Rizière') nb++
      }
    }
    if (nb > 0) out['Nourriture'] = (out['Nourriture'] ?? 0) + n * nb
  }
  return out
}

/** Nombre de villes d'une culture dans le monde (tous joueurs
 *  confondus) — chaque ville est une habitation pour la règle de pays
 *  du classeur (« +N par habitation de cette culture dans le monde »). */
export function nbVillesCultureMonde(state: GameState, culture: string): number {
  let n = 0
  for (const q of state.players) {
    for (const v of q.villes) {
      if (v.culture === culture) n++
    }
  }
  return n
}

/** Détail chiffré de la règle de pays d'une culture (affiché sur la page
 *  « Pays », encadré « Culture du pays — bonus automatiques ») : la
 *  capitale génère +N d'une ressource PAR VILLE de cette culture dans le
 *  monde (ex. Lunisme : +4 Tourisme × nombre de villes lunistes). */
export interface DetailCultureBonus {
  res: string
  /** gain par ville de cette culture (champ du référentiel) */
  parVille: number
  /** villes de cette culture dans le monde (tous joueurs) */
  nbVillesMonde: number
  /** villes de cette culture possédées par le joueur */
  nbVillesPerso: number
  /** gain total par tour (parVille × nbVillesMonde) */
  total: number
}

/** Détail des bonus par tour de la règle de pays de la culture du joueur
 *  (une entrée par loi chiffrée présente : Nourriture, Tourisme, Or).
 *  `effetsCulturePays` applique ces valeurs au stock — UI et moteur
 *  partagent le même calcul. */
export function detailCulturePays(state: GameState, p: Player, C: Cfg): DetailCultureBonus[] {
  const cult = cultureDef(p.culture, C.config)
  if (!cult) return []
  const lois: Array<[string, number | undefined]> = [
    ['Nourriture', cult.capitalNourrParHabMonde],
    ['Tourisme', cult.capitalTourismeParHabMonde],
    ['Or', cult.capitalOrParHabMonde],
  ]
  const nbVillesPerso = p.villes.filter((v) => v.culture === p.culture).length
  const nbVillesMonde = nbVillesCultureMonde(state, p.culture)
  const out: DetailCultureBonus[] = []
  for (const [res, parVille] of lois) {
    if (!parVille) continue
    out.push({ res, parVille, nbVillesMonde, nbVillesPerso, total: parVille * nbVillesMonde })
  }
  return out
}

/** Effets par tour de la règle du pays de la culture : la capitale
 *  génère +N d'une ressource par habitation de cette culture dans le
 *  monde (tous joueurs confondus). */
export function effetsCulturePays(state: GameState, p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  if (p.villes.length === 0) return out
  for (const d of detailCulturePays(state, p, C)) {
    out[d.res] = (out[d.res] ?? 0) + d.total
  }
  return out
}

/** Étape moteur : crédite au stock les effets de la loi du régime et de
 *  la règle de pays de la culture (canal « régimes & cultures » du
 *  récap ressources, étape 3septies du FinDeTour). */
export function appliquerEffetsRegimesCultures(
  state: GameState, p: Player, saison: Saison, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(effetsRegime(p, saison, C))) {
    out[res] = (out[res] ?? 0) + v
  }
  for (const [res, v] of Object.entries(effetsCulturePays(state, p, C))) {
    out[res] = (out[res] ?? 0) + v
  }
  for (const [res, v] of Object.entries(out)) {
    const rs = p.resources[res]
    if (rs) rs.stock += v
  }
  if (Object.keys(out).length > 0) {
    const parts = Object.entries(out).map(([r, v]) => `${v > 0 ? '+' : ''}${v} ${r}`).join(', ')
    state.log.push({
      turn: state.turn + 1, type: 'Système', joueur: p.n,
      texte: `🏛 ${p.nom} — loi du régime « ${p.regime} » et règle de pays de la culture « ${p.culture} » : ${parts}.`,
    })
  }
  return out
}
