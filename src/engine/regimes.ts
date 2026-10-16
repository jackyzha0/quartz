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
import { garnisonProgresVille, lignesGarnisonProgresVille, aTech } from './progresAuto'
import { regleActive } from './factions'

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
  // Technologies (revue 2026-10-15) : Milices civiles I/III/V, Fortifications,
  //  Pr\u00e9 carr\u00e9, Vasselit\u00e9 \u2014 le commentaire le promettait, c'est r\u00e9el.
  g += garnisonProgresVille(p, ville, C)
  const regime = C.regimes.find((r) => r.nom === p.regime)
  const bonus = regime?.garnisonParRang ?? 0
  if (bonus) g += bonus * rangNiveau(ville, C)
  if (state) g += garnisonFactionVille(state, p, ville, C)
  return g
}

/** Détail de la garnison d'une ville, ligne par ligne (même calibre
 *  que garnisonHabitationVille — l'interface affiche exactement ce
 *  que le moteur calcule). Les lignes à 0 sont omises. */
export interface LigneDetailGarnison {
  label: string
  valeur: number
  /** catégorie affichable : base / bâtiment / technologie /
   *  régime / ministre / faction */
  origine: 'base' | 'bâtiment' | 'technologie' | 'régime' | 'ministre' | 'faction'
}

export function detailGarnisonVille(
  p: Player, ville: City, C: Cfg, state?: GameState,
): LigneDetailGarnison[] {
  const out: LigneDetailGarnison[] = []
  const push = (origine: LigneDetailGarnison['origine'], label: string, valeur: number) => {
    if (valeur !== 0) out.push({ origine, label, valeur })
  }
  // 1. Base du rang d'habitation (ex. Hameau 10, Cité 24, Motte 26…)
  const base = garnisonBaseVille(ville, C)
  push('base', `base du rang ${nomRang(ville.rang ?? '') || ville.rang || 'Hameau'}`, base)
  // 2. Bâtiments de la ville (Poste de garde +40, Caserne +40…)
  for (const b of ville.batiments) push('bâtiment', b, garnisonBatiment(b, C))
  // 3. Technologies (Milices civiles, Fortifications, Pré carré…)
  for (const l of lignesGarnisonProgresVille(p, ville, C)) push('technologie', l.label, l.valeur)
  // 4. Loi du régime (ex. Autoritarisme : +15 par rang d'habitation)
  const regime = C.regimes.find((r) => r.nom === p.regime)
  const bonus = regime?.garnisonParRang ?? 0
  if (bonus) push('régime', `${p.regime} : ${bonus} × rang de la ville`, bonus * rangNiveau(ville, C))
  // 5. Ministres : Connétable (+15 par ville, crédité à la prise de
  //    fonction) et Grand prévôt (+10 × rang de pays).
  if (p.garnisonMinisteres) push('ministre', 'Connétable (prise de fonction)', p.garnisonMinisteres)
  if (state && aMinistre(state, p, 'Grand prévôt')) {
    push('ministre', 'Grand prévôt : 10 × rang de pays', 10 * rangPaysNiveau(p, C))
  }
  // 6. Règles de faction (Puit de mana +40, vassaux +20…)
  if (state) push('faction', 'règles de faction', garnisonFactionVille(state, p, ville, C))
  return out
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
    // Le Tourisme est une VALEUR D'ÉTAT (revue 2026-10-16) : la loi de
    //  pays « +N Tourisme par ville de la culture » n'est PLUS un flux
    //  par tour — affichée en aide de jeu, à créditer une fois au
    //  changement (villes/rang) via la page Pays si Thibaut le veut.
    if (d.res === 'Tourisme') continue
    out[d.res] = (out[d.res] ?? 0) + d.total
  }
  return out
}

/** Cible du Tourisme DYNAMIQUE d'un joueur (valeur d'état mouvante,
 *  revue 2026-10-16) : somme de tous les facteurs de Tourisme qui
 *  suivent l'état courant du monde —
 *    · loi de pays de la culture (ex. Lunisme : +4 × villes
 *      lunistes dans le MONDE) ;
 *    · tech « Surconsommation » : +5 par rang d'habitation ;
 *    · tech « Stands de goodies » : +2 par Foire ;
 *    · Basiléens « Abuser des serfs » : +3 par Champ.
 *  La réconciliation (reconcilierTourismeDynamique) crédite/reprend
 *  le DELTA entre cette cible et ce qui a déjà été crédité
 *  (p.tourismeDynamique) — le stock suit exactement les facteurs,
 *  y compris au changement de culture (Lunisme → Déisme : retrait). */
export function cibleTourismeDynamique(state: GameState, p: Player, C: Cfg): number {
  let cible = 0
  // Loi de pays de la culture : +N Tourisme par ville de cette culture
  //  dans le monde (LA capitale génère, mais la valeur appartient au
  //  pays tant qu'il pratique cette culture).
  const cult = cultureDef(p.culture, C.config)
  if (cult?.capitalTourismeParHabMonde && p.villes.length > 0) {
    cible += cult.capitalTourismeParHabMonde * nbVillesCultureMonde(state, p.culture)
  }
  // Tech « Surconsommation » : +5 Tourisme par rang d'habitation.
  if (aTech(p, 'Surconsommation', C)) {
    for (const v of p.villes) cible += 5 * rangNiveau(v, C)
  }
  // Tech « Stands de goodies » : +2 Tourisme par Foire.
  if (aTech(p, 'Stands de goodies', C)) {
    for (const v of p.villes) cible += 2 * (v.amenagements ?? []).filter((a) => a === 'Foire').length
  }
  // Basiléens « Abuser des serfs » : +3 Tourisme par Champ.
  if (p.peuple === 'Basiléens' && regleActive(p, C, 'Abuser des serfs')) {
    for (const v of p.villes) {
      cible += 3 * (v.amenagements ?? []).filter((a) => a === 'Champ' || a === 'Rizière').length
    }
  }
  return cible
}

/** Reconcilie le stock de Tourisme avec la cible dynamique : crédite
 *  la hausse, REPREND la baisse (plafonnée au stock disponible),
 *  mémorise la nouvelle valeur dans p.tourismeDynamique. Journalise
 *  les mouvements (à la fin de tour et au changement de culture). */
export function reconcilierTourismeDynamique(
  state: GameState, p: Player, contexte: string, C: Cfg = cfgOf(state.config),
): void {
  const rs = p.resources['Tourisme']
  if (!rs) return
  const deja = p.tourismeDynamique ?? 0
  const cible = cibleTourismeDynamique(state, p, C)
  const delta = cible - deja
  if (delta === 0) return
  if (delta > 0) {
    rs.stock += delta
  } else {
    const v = Math.min(-delta, Math.max(0, rs.stock))
    if (v <= 0) { p.tourismeDynamique = cible; return }
    rs.stock -= v
  }
  p.tourismeDynamique = cible
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🌉 Tourisme d'état ${delta > 0 ? '+' : '−'}${Math.abs(delta)} (${contexte}) — total dynamique : ${Math.round(cible * 10) / 10}.`,
  })
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
