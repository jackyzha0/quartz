// ══════════════════════════════════════════════════════════════════════
//  COMMERCE — ROUTES COMMERCIALES DES MARCHANDS (marqueur (t))
//  Un personnage portant le titre « Marchand » ouvre UNE route
//  commerciale entre SA ville (ville actuelle du personnage) et une
//  ville d'un AUTRE joueur. Chaque tour, les DEUX joueurs reliés
//  gagnent marchandOrTour Or (4 par défaut — Paramètres, groupe
//  « Commerce »). Le propriétaire du marchand copie en plus, chaque
//  tour, la production de l'aménagement ENTIER choisi dans la ville
//  ciblée (choix fait à l'ouverture de la route, modifiable à tout
//  moment — toutes ses ressources positives ; une production d'été
//  n'est copiée qu'en été ; ressources instantanées Tourisme/Garnison
//  et effets négatifs exclus) — marqueur (u) : plus de choix de
//  ressource, arbitrage Thibaut « c'est l'aménagement entier qui est
//  copié ».
//  La route se ferme si le marchand perd son titre ou meurt.
//  Canal « Commerce » du récap ressources (engine/production.ts),
//  étape 3terdecies de FinDeTour.
// ══════════════════════════════════════════════════════════════════════

import type {
  City, GameState, Player, RouteCommerce, Saison,
} from './types'
import type { GameConfig } from '../config/defaultConfig'
import { cfgOf, type Cfg } from './gameData'
import { fullName } from './shared'
import { amenagementRef } from './amenagements'
import { effetsConstructionRef, effetsEteConstructionRef } from './constructions'
import { nbBatiments } from './factions'
import { aTech } from './progresAuto'

/** Nom du titre (fixe, comme « Ministre » dans engine/ministeres.ts). */
export const TITRE_MARCHAND = 'Marchand'

/** Toutes les routes commerciales du monde (champ optionnel → vide). */
export function routesCommerce(state: GameState): RouteCommerce[] {
  return state.routesCommerce ?? []
}

/** Routes dont le joueur est le PROPRIÉTAIRE du marchand. */
export function routesCommerceDe(state: GameState, joueur: number): RouteCommerce[] {
  return routesCommerce(state).filter((r) => r.joueur === joueur)
}

/** Routes qui visent une ville DU joueur (il encaisse l'Or passif). */
export function routesCommerceVers(state: GameState, joueur: number): RouteCommerce[] {
  return routesCommerce(state).filter((r) => r.joueurCible === joueur)
}

/** Marchands vivants d'un joueur (porteurs du titre). */
export function marchandsDe(state: GameState, joueur: number) {
  return (state.population[joueur] ?? [])
    .filter((c) => c.statut !== 'Décédé' && c.titre === TITRE_MARCHAND)
}

/** Personnage marchand d'une route : null s'il est mort, introuvable
 *  ou a perdu son titre (la route est alors mourante → nettoyage). */
function marchandDeRoute(state: GameState, route: RouteCommerce) {
  const c = (state.population[route.joueur] ?? []).find((x) => x.id === route.marchandId)
  if (!c || c.statut === 'Décédé' || c.titre !== TITRE_MARCHAND) return null
  return c
}

/** Ressource copiable d'un aménagement : valeur par tour, été ou non. */
export interface RessourceCopiable {
  ressource: string
  valeur: number
  ete: boolean
}

/** Ressources COPiables d'un aménagement : flux POSITIFS (hors été) et
 *  production d'été positive — les ressources instantanées (Tourisme,
 *  Garnison) sont déjà exclues par effetsConstructionRef /
 *  effetsEteConstructionRef (marqueur (s)), les effets négatifs
 *  (coûts, ex. Charbon −1 du Moulin à vent) ne sont pas copiables. */
export function ressourcesCopiables(nom: string, cfg?: GameConfig): RessourceCopiable[] {
  const ref = amenagementRef(nom, cfg)
  if (!ref) return []
  const out: RessourceCopiable[] = []
  for (const [res, v] of Object.entries(effetsConstructionRef(ref))) {
    if (v > 0) out.push({ ressource: res, valeur: v, ete: false })
  }
  for (const [res, v] of Object.entries(effetsEteConstructionRef(ref))) {
    if (v > 0) out.push({ ressource: res, valeur: v, ete: true })
  }
  return out
}

/** Aménagements d'une ville qui possèdent AU MOINS une ressource
 *  copiable (sans doublés, dans l'ordre de la ville). */
export function amenagementsCopiables(ville: City, cfg?: GameConfig): string[] {
  const out: string[] = []
  for (const nom of ville.amenagements ?? []) {
    if (!out.includes(nom) && ressourcesCopiables(nom, cfg).length > 0) out.push(nom)
  }
  return out
}

/** Effets par tour d'UNE route pour son PROPRIÉTAIRE : Or pour chaque
 *  joueur relié + copie de la production de l'aménagement ENTIER
 *  choisi (valeur COURANTE du référentiel — éditable à chaud ; les
 *  productions d'été ne sont créditées qu'en été). */
export function effetsRouteProprietaire(
  route: RouteCommerce, saison: Saison, C: Cfg = cfgOf(),
): Record<string, number> {
  const out: Record<string, number> = { Or: C.p.marchandOrTour }
  // Marqueur (u) : l'aménagement ENTIER est copié — toutes ses
  // ressources copiables (flux positifs + été en été).
  for (const cop of ressourcesCopiables(route.amenagement, C.config)) {
    if (cop.ete && saison !== 'Été') continue
    out[cop.ressource] = (out[cop.ressource] ?? 0) + cop.valeur
  }
  return out
}

/** Effets par tour du commerce pour un joueur : ses routes (Or +
 *  copie) + les routes qui visent ses villes (Or passif). Une route
 *  dont le marchand n'est plus en poste ne produit RIEN. */
export function effetsCommerceJoueur(
  state: GameState, p: Player, saison: Saison, C: Cfg = cfgOf(state.config),
): Record<string, number> {
  const out: Record<string, number> = {}
  for (const route of routesCommerce(state)) {
    if (route.joueur !== p.n && route.joueurCible !== p.n) continue
    if (!marchandDeRoute(state, route)) continue
    const src = route.joueur === p.n
      ? effetsRouteProprietaire(route, saison, C)
      : { Or: C.p.marchandOrTour }
    for (const [res, v] of Object.entries(src)) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Détail des apports de commerce d'un joueur (provenance du récap
 *  ressources) : une ligne par route possédée ou entrante. */
export interface DetailCommerce {
  origine: string
  effets: Record<string, number>
}

export function detailCommerceJoueur(
  state: GameState, p: Player, saison: Saison, C: Cfg = cfgOf(state.config),
): DetailCommerce[] {
  const out: DetailCommerce[] = []
  for (const route of routesCommerce(state)) {
    if (route.joueur !== p.n && route.joueurCible !== p.n) continue
    const m = marchandDeRoute(state, route)
    if (!m) continue
    const cible = state.players.find((q) => q.n === route.joueurCible)
    const proprietaire = state.players.find((q) => q.n === route.joueur)
    const nomVilleCible = `${route.villeCible} (${cible?.nom ?? '?'})`
    if (route.joueur === p.n) {
      out.push({
        origine: `route de ${fullName(m)} : ${m.ville} ↔ ${nomVilleCible} — copie de ${route.amenagement}`,
        effets: effetsRouteProprietaire(route, saison, C),
      })
    } else {
      out.push({
        origine: `route de ${fullName(m)} (${proprietaire?.nom ?? '?'}) vers ta ville ${nomVilleCible}`,
        effets: { Or: C.p.marchandOrTour },
      })
    }
  }
  return out
}

/** Supprime les routes dont le marchand est mort, introuvable ou a
 *  perdu son titre (appelée à chaque FinDeTour avant le crédit, et
 *  c'est aussi la garde-fou des accès calculés). Log « Commerce ». */
export function nettoyerRoutesCommerce(state: GameState): RouteCommerce[] {
  const avant = routesCommerce(state)
  const mortes = avant.filter((r) => !marchandDeRoute(state, r))
  if (mortes.length === 0) return []
  const ids = new Set(mortes.map((r) => r.id))
  state.routesCommerce = avant.filter((r) => !ids.has(r.id))
  for (const r of mortes) {
    state.log.push({
      turn: state.turn + 1, type: 'Commerce', joueur: r.joueur,
      texte: `Route commerciale vers ${r.villeCible} fermée : le marchand n'est plus en poste.`,
    })
  }
  return mortes
}

/** Crédite au stock les effets de commerce de chaque joueur (étape
 *  3terdecies de FinDeTour) et renvoie les apports par joueur. Comme
 *  les bâtiments : pas de taxes, pas de coefficient gainsCrediteStock,
 *  pas de prélèvement de vassalité. */
export function appliquerEffetsCommerce(
  state: GameState, C: Cfg = cfgOf(state.config),
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {}
  for (const p of state.players) {
    const effets = effetsCommerceJoueur(state, p, state.saison, C)
    for (const [res, v] of Object.entries(effets)) {
      const rs = p.resources[res]
      if (rs) rs.stock += v
    }
    out[p.n] = effets
  }
  return out
}

/** Ouvre une route commerciale : un marchand (une seule route par
 *  marchand), une ville d'un AUTRE joueur, un aménagement copiable de
 *  cette ville (l'aménagement ENTIER est copié, marqueur (u)).
 *  Retourne null si OK,
 *  sinon le motif d'erreur (affiché en rouge, jamais bloquant —
 *  convention « dons et mariages », marqueur (r)). */
/** Nombre maximal de marchands d'un joueur (revue 2026-10-15) :
 *  paramètre maxMarchands (0 par défaut) + 1 par règle de faction qui
 *  accorde un marchand supplémentaire, +1 par technologie « marchand
 *  supplémentaire » (Commerce, Collecte d'impôts), +1 par Plateforme
 *  commerciale ou Guilde des marchands (qui la remplace), +1 par Echoppe
 *  (« permet d'entretenir 1 route commerciale supplémentaire »). */
export function maxMarchandsJoueur(
  p: Player,
  C: { p: { maxMarchands: number } } & import('./gameData').Cfg,
): number {
  let max = C.p.maxMarchands
  if (aTech(p, 'Commerce', C)) max += 1
  if (aTech(p, "Collecte d'impôts", C)) max += 1
  max += nbBatiments(p, 'Plateforme commerciale')
  max += nbBatiments(p, 'Guilde des marchands')
  max += nbBatiments(p, 'Echoppe')
  return max
}

export function creerRouteCommerce(
  state: GameState,
  joueur: number, marchandId: string,
  joueurCible: number, villeCible: string,
  amenagement: string,
): string | null {
  const C = cfgOf(state.config)
  // Plafond de marchands (retour Thibaut : 0 par défaut + bonus).
  const pj = state.players.find((q) => q.n === joueur)
  if (pj) {
    const nb = marchandsDe(state, joueur).length
    if (nb >= maxMarchandsJoueur(pj, C)) {
      return `Nombre maximal de marchands atteint (${nb}/${maxMarchandsJoueur(pj, C)} — modifiable dans Paramètres → Armées).`
    }
  }
  if (!marchandId) {
    return 'Choisis un marchand (titre « Marchand » attribué à un personnage vivant, page Population).'
  }
  const m = (state.population[joueur] ?? []).find((c) => c.id === marchandId)
  if (!m || m.statut === 'Décédé') return 'Marchand introuvable ou décédé.'
  if (m.titre !== TITRE_MARCHAND) return `${fullName(m)} ne porte pas le titre ${TITRE_MARCHAND}.`
  if (routesCommerceDe(state, joueur).some((r) => r.marchandId === marchandId)) {
    return `${fullName(m)} tient déjà une route commerciale (un marchand ne tient qu'une route).`
  }
  if (joueurCible === joueur) return "La route doit viser la ville d'un autre joueur."
  const cible = state.players.find((q) => q.n === joueurCible)
  const ville = cible?.villes.find((v) => v.nom === villeCible)
  if (!ville) return 'Ville ciblée introuvable chez ce joueur.'
  if (!(ville.amenagements ?? []).includes(amenagement)) {
    return `${villeCible} ne possède pas l'aménagement « ${amenagement} ».`
  }
  const cops = ressourcesCopiables(amenagement, C.config)
  if (cops.length === 0) {
    return `« ${amenagement} » n'a aucune production copiable.`
  }
  ;(state.routesCommerce ?? (state.routesCommerce = [])).push({
    id: `rc-${marchandId}-${joueurCible}-${villeCible}`,
    joueur, marchandId, joueurCible, villeCible, amenagement,
  })
  state.log.push({
    turn: state.turn, type: 'Commerce', joueur,
    texte: `🛒 ${fullName(m)} ouvre une route commerciale : ${m.ville} ↔ ${villeCible} (${cible?.nom ?? '?'}) — +${C.p.marchandOrTour} Or / tour pour chaque joueur, copie de « ${amenagement} » (${cops.map((c) => `${c.valeur} ${c.ressource}${c.ete ? ' (été)' : ''}`).join(', ')}).`,
  })
  return null
}

/** Change l'aménagement copié d'une route — modifiable à tout moment
 *  (arbitrage Thibaut 2026-10-15 ; marqueur (u) : aménagement entier). */
export function changerCopieRoute(
  state: GameState, routeId: string, amenagement: string,
): string | null {
  const C = cfgOf(state.config)
  const route = routesCommerce(state).find((r) => r.id === routeId)
  if (!route) return 'Route introuvable.'
  const cible = state.players.find((q) => q.n === route.joueurCible)
  const ville = cible?.villes.find((v) => v.nom === route.villeCible)
  if (!ville) return 'Ville ciblée introuvable chez ce joueur.'
  if (!(ville.amenagements ?? []).includes(amenagement)) {
    return `${route.villeCible} ne possède pas l'aménagement « ${amenagement} ».`
  }
  const cops = ressourcesCopiables(amenagement, C.config)
  if (cops.length === 0) {
    return `« ${amenagement} » n'a aucune production copiable.`
  }
  route.amenagement = amenagement
  const m = (state.population[route.joueur] ?? []).find((c) => c.id === route.marchandId)
  state.log.push({
    turn: state.turn, type: 'Commerce', joueur: route.joueur,
    texte: `🛒 Route de ${m ? fullName(m) : 'marchand'} : copie désormais « ${amenagement} » sur ${route.villeCible} (${cops.map((c) => `${c.valeur} ${c.ressource}${c.ete ? ' (été)' : ''}`).join(', ')}).`,
  })
  return null
}

/** Ferme une route commerciale (bouton ✕ de la page Pays). */
export function supprimerRouteCommerce(state: GameState, routeId: string): string | null {
  const routes = routesCommerce(state)
  const route = routes.find((r) => r.id === routeId)
  if (!route) return 'Route introuvable.'
  state.routesCommerce = routes.filter((r) => r.id !== routeId)
  state.log.push({
    turn: state.turn, type: 'Commerce', joueur: route.joueur,
    texte: `🛒 Route commerciale vers ${route.villeCible} fermée.`,
  })
  return null
}
