// ══════════════════════════════════════════════════════════════════════
//  RÉGIMES POLITIQUES & CULTURES — EFFETS AUTOMATIQUES (page « Royaume »)
//  Les régimes et les cultures sont paramétrables dans les référentiels
//  (onglet « 📚 Référentiels » → « Cultures & régimes », ou « 🎛
//  Paramètres » → Cultures / Régimes) et leurs lois chiffrées sont
//  prises en compte AUTOMATIQUEMENT par le moteur à chaque fin de tour
//  (VOIE BANQUE depuis le 2026-10-20, brûlage #3 source 2/3 — retour
//  Thibaut « toute production passe par la banque » : les montants
//  vivent dans le registre src/rules/registry.ts, ce module ne fait
//  que LIRE la banque) :
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
import { detailGainsVille } from './economie'
import { cfgOf, cultureDef, type Cfg } from './gameData'
import { aMinistre, fluxFinSaisonMinisteres } from './ministeres'
import { garnisonBatiment, productionTourismeBatiment } from './batiments'
import { rangPaysNiveau } from './factions'
import { nomRang, garnisonBaseVille } from './habitations'
import { garnisonProgresVille, lignesGarnisonProgresVille, garnisonMinimaleProgres, fluxProgresJoueur } from './progresAuto'
import { effetsCommerceJoueur } from './commerce'
import { reglesRegimes, reglesCultures } from '../rules/registry'
import { appliquerRegles } from '../rules/effects/banque'

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
  for (const b of ville.batiments) g += garnisonBatiment(b, C, ville.type)
  // Technologies (revue 2026-10-15) : Milices civiles I/III/V, Fortifications,
  //  Pr\u00e9 carr\u00e9, Vasselit\u00e9 \u2014 le commentaire le promettait, c'est r\u00e9el.
  g += garnisonProgresVille(p, ville, C)
  const regime = C.regimes.find((r) => r.nom === p.regime)
  const bonus = regime?.garnisonParRang ?? 0
  if (bonus) g += bonus * rangNiveau(ville, C)
  // Plancher « Combler les lacunes » (engine/progresAuto.ts) : les
  //  habitations ne descendent pas sous 30 si la tech est débloquée.
  return Math.max(g, garnisonMinimaleProgres(p, C))
}

/** Détail de la garnison d'une ville, ligne par ligne (même calibre
 *  que garnisonHabitationVille — l'interface affiche exactement ce
 *  que le moteur calcule). Les lignes à 0 sont omises. */
export interface LigneDetailGarnison {
  label: string
  valeur: number
  /** catégorie affichable : base / bâtiment / technologie /
   *  régime / ministre */
  origine: 'base' | 'bâtiment' | 'technologie' | 'régime' | 'ministre'
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
  for (const b of ville.batiments) push('bâtiment', b, garnisonBatiment(b, C, ville.type))
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
  return out
}

/** Garnison totale des habitations d'un pays (toutes villes). */
export function garnisonHabitationsPays(p: Player, C: Cfg, state?: GameState): number {
  let g = 0
  for (const v of p.villes) g += garnisonHabitationVille(p, v, C, state)
  return g
}

/** Effets par tour de la loi chiffrée du régime du pays (ex.
 *  Socialisme : +N Nourriture d'été par champ et rizière). VOIE
 *  BANQUE (brûlage #3 source 2/3, 2026-10-20) : la règle vit dans le
 *  registre (reglesRegimes — id regime.<slug>, conditions régime +
 *  été, effet fluxParAmenagement) ; cette fonction ne fait que LIRE
 *  la banque, plus aucun montant codé ici. */
export function effetsRegime(state: GameState, p: Player, saison: Saison, C: Cfg): Record<string, number> {
  return appliquerRegles(reglesRegimes(C.config), { state, joueur: p, saison }).flux
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
  const nbVillesPerso = p.villes.filter((v) => v.culture === p.culture).length
  const nbVillesMonde = nbVillesCultureMonde(state, p.culture)
  const out: DetailCultureBonus[] = []
  // VOIE BANQUE (brûlage #3 source 2/3) : les montants par ville sont
  //  LUS sur les règles du registre (reglesCultures — effet
  //  fluxParVilleCultureMonde), plus aucun champ du référentiel décodé
  //  ici. L'ordre Nourriture / Tourisme / Or est conservé.
  for (const r of reglesCultures(C.config)) {
    if (r.conditions?.culture !== p.culture) continue
    for (const e of r.effets) {
      if (e.type !== 'fluxParVilleCultureMonde') continue
      out.push({ res: e.ressource, parVille: e.valeur, nbVillesMonde, nbVillesPerso, total: e.valeur * nbVillesMonde })
    }
  }
  return out
}

/** Effets par tour de la règle du pays de la culture : la capitale
 *  génère +N d'une ressource par habitation de cette culture dans le
 *  monde (tous joueurs confondus). */
export function effetsCulturePays(state: GameState, p: Player, C: Cfg): Record<string, number> {
  if (p.villes.length === 0) return {}
  // VOIE BANQUE (brûlage #3 source 2/3) : la règle de pays vit dans le
  //  registre (reglesCultures — condition culture, effet
  //  fluxParVilleCultureMonde compté sur tout le monde) ; cette
  //  fonction ne fait que LIRE la banque.
  return appliquerRegles(reglesCultures(C.config), { state, joueur: p, saison: state.saison }).flux
}

/**
 * RESSYNCHRONISATION DU TOURISME (revue 2026-10-16, retour Thibaut) :
 * le Tourisme est traité comme une ressource normale (Bois, Or…)
 * partout — production affichée dans les récaps de ville et de tour,
 * imposable, imputée dans les tableaux — à UNE exception près : le
 * stock n'est JAMAIS cumulé. À chaque fin de tour (et à chaque
 * changement de culture), le stock est RECALCULÉ pour égaler la
 * production courante : stock = prod. Construire une Chapelle monte
 * la production (et le stock) ; perdre le bâtiment le fait
 * redescendre ; les bonus d'état (ministres, vassalité) sont
 * simplement des lignes de production.
 *
 * `tourismeCourant` calcule la production Tourisme d'un joueur à
 * partir des mêmes canaux que le récap (bâtiments & aménagements
 * statiques + gains d'habitants + lois de culture + techs

 * + ministres de fin de saison + COMMERCE (arbitrage Thibaut 2026-10-19 : le

 * Tourisme copié par une route commerciale est une production comme les

 * autres — il compte dans « stock = production »), et `resynchroniserTourisme` écrase
 * le stock avec cette valeur.
 */
export function tourismeCourant(state: GameState, p: Player, C: Cfg): number {
  // canaux déjà rétablis comme flux : cette fonction somme les
  //  composantes Tourisme de la production par tour du joueur.
  let total = 0
  // 1. base réglée manuellement (p.resources.prod)
  total += p.resources['Tourisme']?.prod ?? 0
  // 2. gains d'habitants (Artistes) — même canal que le Bois
  for (const v of p.villes) {
    const d = detailGainsVille(state, p, v, C)
    total += (d.taxes['Tourisme'] ?? 0) * C.p.gainsCrediteStock
  }
  // 3. lois de culture & régime — composante Tourisme seulement
  total += effetsCulturePays(state, p, C)['Tourisme'] ?? 0
  // 4. technologies (Surconsommation, Stands de goodies)
  total += fluxProgresJoueur(state, p, C)['Tourisme'] ?? 0
  // 5. ministres (Maître de cour +2, Légat +20) — fin de saison :
  //  production équivalente par tour, LUE SUR LA RÈGLE DE BANQUE
  //  (voie unique ministres → fluxJoueurParMinistre, montants dans le
  //  registre MINISTERES_AUTO — plus aucun chiffre codé ici).
  total += fluxFinSaisonMinisteres(state, p)['Tourisme'] ?? 0
  // 6. CONSTRUCTIONS (Chapelle +35, Bahamutt +16…) : production Tourisme
  //  des bâtiments/aménagements, lue sur la règle de BANQUE (voie unique
  //  depuis le 2026-10-19 — même valeur que le canal Bâtiments du récap).
  for (const v of p.villes) {
    for (const b of v.batiments) total += productionTourismeBatiment(b, C, v.type)
    for (const a of v.amenagements ?? []) total += productionTourismeBatiment(a, C, v.type)
  }
  // 7. COMMERCE (arbitrage Thibaut 2026-10-19, clôture du B4 de l'audit) :
  // le Tourisme copié par une route commerciale est une production comme
  // les autres — il doit compter dans « stock = production », sinon le
  // récap l'affiche (canal Commerce) mais le stock l'ignore.
  total += effetsCommerceJoueur(state, p, state.saison, C)['Tourisme'] ?? 0
  // VASSALITÉ — CORRECTIF (retour utilisateur 2026-10-17) : le
  //  « +15 Tourisme × rang du suzerain » est une règle de FACTION
  //  (Basiléens « Temps de paix », choix d'âge) : elle est déjà
  //  comptée au canal 5 ci-dessus, et UNIQUEMENT pour un Basiléens
  //  qui a choisi cette règle. L'ancien point 8 la créditait à TOUT
  //  joueur vassal (quelle que soit sa faction) ET la comptait deux
  //  fois pour un Basiléens vassal — supprimé.
  return total
}

/** Écrase le stock de Tourisme avec la production courante (le
 *  Tourisme n'est jamais cumulé — stock = prod). */
export function resynchroniserTourisme(
  state: GameState, p: Player, contexte: string, C: Cfg = cfgOf(state.config),
): void {
  const rs = p.resources['Tourisme']
  if (!rs) return
  const cible = Math.max(0, tourismeCourant(state, p, C))
  if (rs.stock === cible) return
  rs.stock = cible
  state.log.push({
    turn: state.turn, type: 'Système', joueur: p.n,
    texte: `🌉 Tourisme recalculé (${contexte}) : stock = production courante = ${Math.round(cible * 10) / 10}.`,
  })
}

/** Étape moteur : crédite au stock les effets de la loi du régime et de
 *  la règle de pays de la culture (canal « régimes & cultures » du
 *  récap ressources, étape 3septies du FinDeTour). */
export function appliquerEffetsRegimesCultures(
  state: GameState, p: Player, saison: Saison, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(effetsRegime(state, p, saison, C))) {
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
