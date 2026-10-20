// ══════════════════════════════════════════════════════════════════════
//  COMMERCE — ROUTES COMMERCIALES DES MARCHANDS (marqueur (t))
//  Un personnage portant le métier « Marchand » ouvre UNE route
//  commerciale entre SA ville (ville actuelle du personnage) et une
//  ville d'un AUTRE joueur. Chaque tour, les DEUX joueurs reliés
//  gagnent marchandOrTour Or (4 par défaut — Paramètres, groupe
//  « Commerce »). Le propriétaire du marchand copie en plus, chaque
//  tour, la production de l'aménagement ENTIER choisi dans la ville
//  ciblée (choix fait à l'ouverture de la route, modifiable à tout
//  moment — toutes ses ressources positives ; une production d'été
//  n'est copiée qu'en été ; la Garnison (valeur
//  d'état) et les effets négatifs sont exclus ; le Tourisme EST copiable —
//  arbitrage Thibaut 2026-10-19 : stock de Tourisme = production, jamais
//  cumulé) — marqueur (u) : plus de choix de
//  ressource, arbitrage Thibaut « c'est l'aménagement entier qui est
//  copié ».
//  La route se ferme si le marchand perd son metier ou meurt.
//  Canal « Commerce » du récap ressources (engine/production.ts),
//  étape 3terdecies de FinDeTour.
//  HYGIÈNE D'IMPORT (règle durable, incident CI #36 du 2026-10-19) : ce
//  module est importé par regimes.ts (canal Tourisme du commerce) — ne
//  JAMAIS importer amenagements.ts ici (effets de bord top-level :
//  AMENAGEMENTS) : le cycle constructions→banque→regimes→commerce→
//  amenagements fait planter l'initialisation du moteur (TDZ). Les
//  recherches du référentiel passent par constructions.ts (constructionRef).
// ══════════════════════════════════════════════════════════════════════

import type {
  City, GameState, Player, RouteCommerce, Saison,
} from './types'
import type { GameConfig } from '../config/defaultConfig'
import { cfgOf, type Cfg } from './gameData'
import { fullName } from './shared'
// RETRAIT 2026-10-19 (incident CI #36, suite B4) : `import { amenagementRef }
// from './amenagements'` — amenagementRef est un alias PUR de constructionRef
// (constructions.ts), mais cet import créait un cycle d'évaluation
// constructions→banque→regimes→commerce→amenagements : l'initialisation
// top-level AMENAGEMENTS (amenagements.ts) s'exécutait alors que
// constructions.ts n'avait pas encore initialisé RESSOURCES_INSTANTANEES
// (ReferenceError TDZ → crash de TOUS les tests, CI #36 + bundle Edge #16).
// commerce.ts n'importe donc PLUS amenagements.ts : constructionRef fait
// la même recherche (nom exact, même sémantique).
import { constructionRef, effetsConstructionRef, effetsEteConstructionRef } from './constructions'
import { nbBatiments } from './factions'
import { aTech } from './progresAuto'

/** Nom du metier (fixe, comme « Ministre » dans engine/ministeres.ts). */
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

/** Marchands vivants d'un joueur (porteurs du métier). */
export function marchandsDe(state: GameState, joueur: number) {
  return (state.population[joueur] ?? [])
    .filter((c) => c.statut !== 'Décédé' && c.metier === TITRE_MARCHAND)
}

/** Personnage marchand d'une route : null s'il est mort, introuvable
 *  ou a perdu son metier (la route est alors mourante → nettoyage). */
function marchandDeRoute(state: GameState, route: RouteCommerce) {
  const c = (state.population[route.joueur] ?? []).find((x) => x.id === route.marchandId)
  if (!c || c.statut === 'Décédé' || c.metier !== TITRE_MARCHAND) return null
  return c
}

/** Ressource copiable d'un aménagement : valeur par tour, été ou non. */
export interface RessourceCopiable {
  ressource: string
  valeur: number
  ete: boolean
}

/** Ressources COPiables d'un aménagement : flux POSITIFS (hors été) et
 *  production d'été positive — la Garnison (valeur d'état, canal
 *  dédié de la banque) est exclue par effetsConstructionRef /
 *  effetsEteConstructionRef ; le Tourisme, flux NORMAL (retour Thibaut
 *  2026-10-16), EST copiable — CONFIRMÉ par arbitrage Thibaut 2026-10-19
 *  (« le Tourisme peut être copié : le stock n'est jamais mis à jour avec
 *  la production, il est recalculé pour l'égaler — stock = production ») ;
 *  les effets négatifs (coûts, ex. Charbon −1 du Moulin à vent) ne sont
 *  pas copiables. */
export function ressourcesCopiables(nom: string, cfg?: GameConfig): RessourceCopiable[] {
  // 2026-10-19 (correctif cycle d'import, incident CI #36) : constructionRef
  //  remplace amenagementRef (alias strict — amenagements.ts l'implémente
  //  comme `return constructionRef(nom, cfg)`), même recherche par nom exact.
  const ref = constructionRef(nom, cfg)
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
 *  perdu son metier (appelée à chaque FinDeTour avant le crédit, et
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

/** Nomme automatiquement les marchands d'un joueur (revue
 *  2026-10-16, homogénéisation avec les soldats et professeurs) :
 *    · chaque ROUTE commerciale doit avoir son marchand — si un
 *      marchand est mort ou a perdu son metier, un habitant vivant de
 *      sa ville est promu pour reprendre la route ;
 *    · jusqu'au CAP de routes disponibles (maxMarchandsJoueur :
 *      paramètre + techs + échoppes/guildes), des marchands
 *      supplémentaires sont nommés, prêts à ouvrir des routes.
 *  Comme les soldats (armées) et professeurs (écoles), c'est
 *  AUTOMATIQUE : le joueur n'attribue plus le métier à la main.
 *  Dépasser le cap reste possible (annonce, jamais bloqué) — les
 *  marchands au-delà ne sont simplement pas pré-nommés. */
export function peuplerMarchands(state: GameState, p: Player): void {
  const C = cfgOf(state.config)
  const pop = state.population[p.n] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  const routes = routesCommerceDe(state, p.n)
  // 1. chaque route doit avoir un marchand vivant titré
  for (const route of routes) {
    const m = vivants.find((c) => c.id === route.marchandId && c.metier === TITRE_MARCHAND)
    if (m) continue
    // marchand manquant (mort, déchu) : remplacer par un habitant de
    //  la ville du marchand d'origine, sinon n'importe quelle ville
    //  du joueur.
    const ancien = pop.find((c) => c.id === route.marchandId)
    const estCandidat = (c: typeof vivants[number]) =>
      c.age >= C.p.adultAge &&
      (!c.metier || c.metier === C.p.metierChasseur) &&
      p.villes.some((v) => v.nom === c.ville)
    const poolVille = (ancien?.ville ?? '')
    const elu = vivants.find((c) => estCandidat(c) && c.ville === poolVille)
      ?? vivants.find((c) => estCandidat(c))
    if (!elu) continue
    elu.metier = TITRE_MARCHAND
    route.marchandId = elu.id
    state.log.push({
      turn: state.turn + 1, type: 'Commerce', joueur: p.n,
      texte: `🛒 ${fullName(elu)} est promu Marchand (reprend la route vers ${route.villeCible}).`,
    })
  }
  // 2. (SUPPRIMÉ — bug 2026-10-17 « marchands aléatoires
  //    indestructibles ») l'ancienne étape promouvait des marchands
  //    « en réserve » pour remplir le cap SANS route ouverte :
  //    des marchands apparaissaient aléatoirement, et un metier
  //    retiré à la main était re-promu au tour suivant. La demande
  //    d'origine est « les marchands sont nommés automatiquement
  //    S'IL Y A DES ROUTES commerciales » (comme les soldats avec
  //    les armées, les professeurs avec les écoles) : un marchand
  //    n'existe que s'il tient une route. L'étape 1 couvre ce cas —
  //    le cap reste un ANNONCE jamais bloquant (maxMarchandsJoueur,
  //    affiché sur la page Pays), pas un pré-provisionnement.
}

/** Ouvre une route commerciale : un marchand (une seule route par
 *  marchand), une ville d'un AUTRE joueur, un aménagement copiable de
 *  cette ville (l'aménagement ENTIER est copié, marqueur (u)).
 *  Retourne null si OK,
 *  sinon le motif d'erreur (affiché en rouge, jamais bloquant —
 *  convention « dons et mariages », marqueur (r)). */
/** Nombre maximal de marchands d'un joueur (revue 2026-10-15) :
 *  paramètre maxMarchands (0 par défaut), +1 par technologie « marchand
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
  // Plafond de marchands (revue 2026-10-16, homogénéisation soldats /
  //  professeurs) : le cap est une ANNONCE, jamais un blocage — le
  //  joueur peut dépasser le nombre de routes « disponibles » ; les
  //  marchands manants sont nommés automatiquement (peuplerMarchands).
  const pj = state.players.find((q) => q.n === joueur)
  if (pj) {
    const nb = marchandsDe(state, joueur).length
    const cap = maxMarchandsJoueur(pj, C)
    if (nb > cap) {
      state.log.push({
        turn: state.turn, type: 'Commerce', joueur,
        texte: `🛒 ${pj.nom} dépasse son cap de routes commerciales (${nb} marchand(s) pour ${cap} disponibles).`,
      })
    }
  }
  // Revue 2026-10-16 (retour Thibaut) : une route commerciale peut
  //  être créée EN TOUTE SITUATION. Si le marchand fourni est
  //  invalide (absent, décédé, non titré, tient déjà une route), un
  //  ROTURIER VIVANT reçoit automatiquement le métier de Marchand pour
  //  tenir la route — plus aucun refus lié au personnage.
  const popJoueur = state.population[joueur] ?? []
  let m = marchandId ? popJoueur.find((c) => c.id === marchandId) : undefined
  const invalide = !m || m.statut === 'Décédé' || m.metier !== TITRE_MARCHAND
    || routesCommerceDe(state, joueur).some((r) => r.marchandId === marchandId)
  if (invalide) {
    // roturier disponible : adulte vivant sans metier ni metier
    //  spécialisé, dans une ville du joueur.
    const roturier = popJoueur.find((c) =>
      c.statut !== 'Décédé' && c.age >= C.p.adultAge &&
      (!c.metier || c.metier === C.p.metierChasseur) &&
      pj?.villes.some((v) => v.nom === c.ville))
    if (!roturier) {
      return 'Aucun roturier disponible pour tenir la route (population adulte vide).'
    }
    roturier.metier = TITRE_MARCHAND
    m = roturier
    state.log.push({
      turn: state.turn, type: 'Commerce', joueur,
      texte: `🛒 ${fullName(roturier)} reçoit le métier de Marchand pour tenir la nouvelle route.`,
    })
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
  if (!m) return 'Aucun personnage disponible pour tenir la route.'
  ;(state.routesCommerce ?? (state.routesCommerce = [])).push({
    id: `rc-${m.id}-${joueurCible}-${villeCible}`,
    joueur, marchandId: m.id, joueurCible, villeCible, amenagement,
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
