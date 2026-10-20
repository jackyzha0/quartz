// ═══════════════════════════════════════════════════════════════════════════
//  PROGRÈS AUTOMATIQUES (retour Thibaut 2026-10-15 : « applique tout ce
//  que tu peux appliquer automatiquement ») — fin de l'arbitrage « tout
//  s'applique au plateau » pour les effets chiffrés.
//
//  VOIE BANQUE depuis le 2026-10-20 (brûlage #3 source 3/3 — retour
//  Thibaut « toute production passe par la banque ») : les FLUX par
//  tour des technologies (fluxProgresJoueur, canal « Progrès » du
//  récap ressources) vivent dans le REGISTRE (rules/registry.ts —
//  PROGRES_FLUX + génériques prodParTitre du référentiel) et sont
//  interprétés par la BANQUE ; ce module ne fait plus que LIRE la
//  banque. Restent locaux, hors production par tour :
//    · aTech                  : résolution nom → clés DÉLÉGUÉE au
//      registre (clesTechsParNom — même sémantique, homonymes inclus) ;
//    · gainDeblocageProgres   : one-shot au déblocage (instantané) ;
//    · reductions de coût     : coûts, pas des productions ;
//    · garnisons + plancher  : valeurs d'état.
//  Ce qui exige le plateau (batailles, cases, assassins, serments,
//  crises, bateaux…) reste une AIDE DE JEU.
// ═══════════════════════════════════════════════════════════════════════════

import type { GameState, Player, City } from './types'
import type { Cfg } from './gameData'
import { capitaleDe } from './factions'
import { reglesProgres, clesTechsParNom } from '../rules/registry'
import { appliquerRegles } from '../rules/effects/banque'

/** Le joueur a-t-il débloqué la tech portant ce NOM ? (les homonymes
 *  de plusieurs arbres matchent — la résolution nom → clés
 *  `<arbre>:<slot>` vit dans le REGISTRE, clesTechsParNom : une
 *  seule vérité entre moteur et banque, brûlage #3 source 3/3.) */
export function aTech(p: Player, nomTech: string, C: Cfg): boolean {
  const set = new Set(p.progresDebloques ?? [])
  return clesTechsParNom(C.config, nomTech).some((k) => set.has(k))
}

/** Flux par tour des technologies débloquées (canal « Progrès » du
 *  récap). VOIE BANQUE (brûlage #3 source 3/3, 2026-10-20) : les
 *  règles vivent dans le registre (reglesProgres — conditions
 *  techNom / tech, effets fluxSiCapitale, fluxParVille,
 *  fluxParVilleProximite, fluxParRangHabitation,
 *  fluxParAmenagement, fluxParBatiment, fluxParGarnisonHabitation,
 *  fluxParTitre) ; cette fonction ne fait que LIRE la banque, plus
 *  aucun montant codé ici. */
export function fluxProgresJoueur(state: GameState, p: Player, C: Cfg): Record<string, number> {
  return appliquerRegles(reglesProgres(C.config), { state, joueur: p, saison: state.saison }).flux
}

/** One-shot au DÉBLOCAGE d'une technologie (appelé par ProgresView) :
 *  crédite Science / Or / Habitants / Émissaires et retourne un texte
 *  de log (vide = rien à créditer). */
export function gainDeblocageProgres(state: GameState, p: Player, nomTech: string): string {
  const credit = (res: string, v: number): string => {
    if (res === '\u00c9missaires') {
      p.emissaires = (p.emissaires ?? 0) + v
      return `+${v} \u00e9missaire(s) en r\u00e9serve`
    }
    if (res === 'Habitants') {
      const rs = p.resources['Habitants']
      if (rs) rs.stock += v
      return `+${v} Habitants`
    }
    const rs = p.resources[res]
    if (rs) rs.stock += v
    return `+${v} ${res}`
  }
  switch (nomTech) {
    case 'Progr\u00e8s technologiques I': return credit('Science', 6)
    case 'Progr\u00e8s technologiques II': return credit('Science', 10)
    case 'Progr\u00e8s technologiques III': return credit('Science', 14)
    case 'S\u00e9dentarisation': return credit('Habitants', 20)
    case 'Préfectures': {
      // Retour Thibaut 2026-10-15 : +15 habitants dans CHACUNE des
      //  villes du joueur (au moment du d\\u00e9blocage).
      return credit('Habitants', 15 * Math.max(1, p.villes.length))
    }
    case 'Greniers': return credit('Habitants', 40)
    case 'Une ville magnifique': return credit('Habitants', 20)
    case "Collecte d'imp\u00f4ts": return credit('Or', 20)
    case 'Recyclage': return credit('Or', 30)
    case 'Taxe n\u00e9c\u00e9ssaire I': return credit('Or', 250)
    case 'Taxes n\u00e9c\u00e9ssaire II': return credit('Or', 300)
    case '\u00c9missaires de cour': return credit('\u00c9missaires', 1)
    case 'Progrès du développement économique C': {
      // Revue 2026-10-16 : 50 Or par ministre en poste au déblocage
      //  (la montée de rang est gérée par ProgresView, qui a l'état).
      const nbMinistres = (state.population[p.n] ?? [])
        .filter((c) => c.statut !== 'Décédé' && c.titre === 'Ministre' && c.ministere).length
      return nbMinistres > 0 ? credit('Or', 50 * nbMinistres) : ''
    }
    case 'Geste': return credit('\u00c9missaires', 1)
    case 'Hommage solennel': return credit('\u00c9missaires', 2)
    case 'Offrande': return credit('\u00c9missaires', 1)
    default: return ''
  }
}

/** Réduction de co\u00fbt d'un AM\u00c9NAGEMENT par les techs débloquées
 *  (somme, appliquée avant le plancher 0). */
export function reductionAmenagement(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  const add = (res: string, v: number) => { out[res] = (out[res] ?? 0) + v }
  if (aTech(p, 'D\u00e9veloppement durable', C)) add('Bois', 1)
  if (aTech(p, 'D\u00e9veloppement \u00e9conome', C)) add('Or', 3)
  return out
}

/** Réduction de co\u00fbt d'une FONDATION d'habitation. */
export function reductionFondation(p: Player, C: Cfg, ville?: { proximite?: string }): Record<string, number> {
  const out: Record<string, number> = {}
  if (aTech(p, 'Colonialisme durable', C)) out['Bois'] = (out['Bois'] ?? 0) + 5
  if (aTech(p, 'Colonialisme \u00e9conome', C)) out['Or'] = (out['Or'] ?? 0) + 20
  // Expansion maritime (développement côtier) : côtières −3 Bois −3 Pierre.
  if (ville?.proximite === 'Mer' && aTech(p, 'Expansion maritime', C)) {
    out['Bois'] = (out['Bois'] ?? 0) + 3
    out['Pierre'] = (out['Pierre'] ?? 0) + 3
  }
  return out
}

/** Réduction de co\u00fbt d'un B\u00c2TIMENT. */
export function reductionBatiment(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  if (aTech(p, 'Viser le ciel', C)) out['Or'] = (out['Or'] ?? 0) + 15
  return out
}

/** Réduction de co\u00fbt d'une LEV\u00c9E D'ARM\u00c9E (Or). */
export function reductionLevee(p: Player, C: Cfg): number {
  return aTech(p, 'Conscription I', C) ? 10 : 0
}

/** Garnison accordée par les techs débloquées à UNE ville
 *  (valeur d'état, intégrée à garnisonHabitationVille). */
export interface LigneGarnison { label: string; valeur: number }

export function garnisonProgresVille(p: Player, ville: City, C: Cfg): number {
  return lignesGarnisonProgresVille(p, ville, C).reduce((n, l) => n + l.valeur, 0)
}

/** Détail chiffré de la garnison des technologies d'une ville (une
 *  ligne par tech active — moteur et interface partagent le calcul). */
export function lignesGarnisonProgresVille(p: Player, ville: City, C: Cfg): LigneGarnison[] {
  const cap = capitaleDe(p)
  const estCap = cap?.nom === ville.nom
  const out: LigneGarnison[] = []
  if (aTech(p, 'Milices civiles I', C) && estCap) out.push({ label: 'Milices civiles I (capitale)', valeur: 30 })
  if (aTech(p, 'Fortifications solides', C)) out.push({ label: 'Fortifications solides', valeur: 15 })
  if (aTech(p, 'Milices civiles', C)) out.push({ label: 'Milices civiles (toutes habitations)', valeur: 30 })
  if (aTech(p, 'Muraille', C)) out.push({ label: 'Muraille', valeur: 40 })
  if (aTech(p, 'Progrès de la défense nationale A1', C)) out.push({ label: 'Défense nationale A1', valeur: 40 })
  if (aTech(p, 'Milices civiles III', C)) out.push({ label: 'Milices civiles III', valeur: 20 })
  if (aTech(p, 'Milices civiles V', C)) out.push({ label: 'Milices civiles V', valeur: 40 })
  if (aTech(p, 'Pr\u00e9 carr\u00e9', C)) out.push({ label: 'Pr\u00e9 carr\u00e9', valeur: 20 })
  if (aTech(p, 'Vasselit\u00e9', C) && p.vassalDe != null) out.push({ label: 'Vasselit\u00e9 (vassal)', valeur: 20 })
  return out
}

/** Garnison MINIMALE des habitations (retour Thibaut 2026-10-15) :
 *  « Combler les lacunes » — vos habitations ne peuvent avoir moins de
 *  30 Garnison. Retourne le plancher (0 si la tech n'est pas débloquée) ;
 *  garnisonHabitationVille prend le max. */
export function garnisonMinimaleProgres(p: Player, C: Cfg): number {
  return aTech(p, 'Combler les lacunes', C) ? 30 : 0
}
