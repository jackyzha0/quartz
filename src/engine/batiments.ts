// ══════════════════════════════════════════════════════════════════════
//  BÂTIMENTS — EFFETS AUTOMATIQUES PAR TOUR (étape 3quater de FinDeTour)
//  Les bâtiments des villes produisent et consomment des ressources à
//  chaque fin de tour : +1 Bois pour un Camp de bûcheron, −10 Nourriture
//  pour un Poste de garde, +45 Nourriture / −1 Charbon pour un Moulin à
//  vent…
//  RÉFÉRENTIEL CANONIQUE : chaque bâtiment référence son coût exact, sa
//  production exacte et sa description exacte (table `constructions`,
//  feuille « Ville » du classeur 7.19). TOUTE production passe par la
//  BANQUE D'EFFETS (retour Thibaut 2026-10-19) : effetsConstructionRef
//  lit la règle de la construction (rules/registry → rules/effects) ;
//  un bâtiment hors référentiel ne produit RIEN (l'ancien analyseur du
//  texte d'effet et EFFETS_FORCES ont été retirés le 2026-10-19 — les
//  bâtiments santé / écoles portent des effets de moteur, pas des flux).
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player } from './types'
import type { Cfg } from './gameData'
import { aLaboratoireFalheim } from './merveilles'
import { capitaleDe } from './factions'
import {
  constructionRef, coutBatimentRef, effetsConstructionRef, garnisonConstructionRef,
  parseCoutTexte, batimentsRefs, type ConstructionRef,
} from './constructions'

/** Référence du référentiel pour un bâtiment (coût / production / description
 *  exacts), éventuellement restreinte à un groupe (Ville / Château / Capitale). */
export function batimentRef(nom: string, C?: Cfg, groupe?: string): ConstructionRef | undefined {
  return constructionRef(nom, C?.config, groupe)
}

/** Toutes les références de bâtiments du référentiel canonique. */
export function batimentsConstructionsRefs(C?: Cfg): ConstructionRef[] {
  return batimentsRefs(C?.config)
}

// RETRAIT (2026-10-19, retour Thibaut « tout ce qui a rapport à une
//  production passe par la banque ») : l'analyseur local du texte
//  d'effet, EFFETS_FORCES (4 bâtiments « hors référentiel » en fait tous
//  présents dans la table constructions) et le cache associés ont été
//  supprimés — la production d'un bâtiment se lit EXCLUSIVEMENT via la
//  banque d'effets (effetsConstructionRef) ; un bâtiment sans règle ne
//  produit rien.

/** « Remplace X » : les effets du bâtiment remplacé sont ignorés quand
 *  le remplaçant est présent dans la même ville. */
const REMPLACE: Record<string, string[]> = {
  'Camp de travailleurs': ['Camp de bûcheron', 'Camp de mineur'],
  'Silo à grain': ['Grange'],
  'Moulin à vent': ['Silo à grain', 'Grange'],
  'Guilde des artisans de la terre.': ['Moulin à vent', 'Silo à grain', 'Grange'],
  'Ecole intermédiaire': ['Ecole élémentaire', 'École élémentaire'],
  'École intermédiaire': ['Ecole élémentaire', 'École élémentaire'],
  'Ecole supérieure': ['Ecole intermédiaire', 'École intermédiaire', 'Ecole élémentaire', 'École élémentaire'],
  'École supérieure': ['Ecole intermédiaire', 'École intermédiaire', 'Ecole élémentaire', 'École élémentaire'],
  'Guilde des diplomates': [
    'Ecole supérieure', 'École supérieure', 'Ecole intermédiaire', 'École intermédiaire',
    'Ecole élémentaire', 'École élémentaire',
  ],
  'Guilde des savants': ['Institut de recherche'],
  'Guilde des évangiles': ['Conjuratoire'],
  'Guilde des marins': ["Complexe d'exploitation maritime"],
  'Guilde des marchands': ['Plateforme commerciale'],
}

/** Effets par tour d'un bâtiment : production EXACTE du référentiel,
 *  lue via la BANQUE D'EFFETS (règle de la construction — retour Thibaut
 *  2026-10-19 : toute production passe par la banque). Sans règle :
 *  production nulle.
 *  GROUPE (correctif 2026-10-18) : 4 bâtiments existent en versions
 *  Ville ET Château aux effets/coûts DIFFÉRENTS (Herses, Echoppe,
 *  Herboristerie, Observatoire) — l'appelant passe le type
 *  d'habitation de SA ville, sinon la version Ville écraserait les
 *  effets des châteaux. */
export function effetsTourBatiment(nom: string, C: Cfg, groupe?: string): Record<string, number> {
  const ref = constructionRef(nom, C.config, groupe)
  return ref ? effetsConstructionRef(ref) : {}
}

/** Garnison statique accordée par un bâtiment (valeur d'état, pas un
 *  flux) — via la banque ; sans règle : 0. Groupe : cf. effetsTourBatiment
 *  (doublons Ville/Château). */
export function garnisonBatiment(nom: string, C: Cfg, groupe?: string): number {
  const ref = constructionRef(nom, C.config, groupe)
  return ref ? garnisonConstructionRef(ref) : 0
}

/** Production Tourisme par tour d'un bâtiment ou aménagement — lu sur
 *  la règle de BANQUE (voie unique depuis 2026-10-19 ; l'ancienne
 *  double voie « tourisme statique au texte + flux banque » est
 *  unifiée). Le Tourisme est un FLUX NORMAL (retour Thibaut
 *  2026-10-16) : la valeur alimente tourismeCourant (stock = production,
 *  recalculé en fin de tour) et la conversion culturelle. */
export function productionTourismeBatiment(nom: string, C: Cfg, groupe?: string): number {
  const ref = constructionRef(nom, C.config, groupe)
  return ref ? (effetsConstructionRef(ref)['Tourisme'] ?? 0) : 0
}

// ── Coût de construction (référentiel canonique, repli classeur) ────────

/** Coût de construction d'un bâtiment : texte de coût EXACT du référentiel
 *  (groupe optionnel : Ville / Château / Capitale), repli sur l'ancien
 *  analyseur des textes « Coût » de batimentsVille / batimentsChateau. */
export function coutBatiment(nom: string, C: Cfg, groupe?: string): Record<string, number> {
  const ref = constructionRef(nom, C.config, groupe)
  if (ref) return parseCoutTexte(ref.cout)
  const listes = [...(C.config.batimentsVille ?? []), ...(C.config.batimentsChateau ?? [])]
  const ligne = listes.find((b: any) => b?.nom === nom)
  return parseCoutTexte(ligne?.cout ?? '')
}

/** Bâtiments d'une ville neutralisés par un remplaçant présent. */
function batimentsRemplaces(ville: City): Set<string> {
  const presents = new Set(ville.batiments)
  const ignores = new Set<string>()
  for (const nom of presents) {
    for (const remplace of REMPLACE[nom] ?? []) {
      if (presents.has(remplace)) ignores.add(remplace)
    }
  }
  return ignores
}

/** Effets par tour cumulés des bâtiments d'une ville (remplacements gérés).
 *  Le GROUPE est le type d'habitation de la ville (Ville / Château) :
 *  les bâtiments doublés du référentiel rendent leurs effets de la
 *  bonne version (cf. effetsTourBatiment). */
export function effetsBatimentsVille(ville: City, C: Cfg): Record<string, number> {
  const ignores = batimentsRemplaces(ville)
  const groupe = ville.type
  const out: Record<string, number> = {}
  for (const nom of ville.batiments) {
    if (ignores.has(nom)) continue
    for (const [res, v] of Object.entries(effetsTourBatiment(nom, C, groupe))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Crédite au stock les effets par tour de TOUS les bâtiments du joueur,
 *  et renvoie les effets appliqués (pour le récap ressources). */
export function appliquerEffetsBatiments(p: Player, C: Cfg): Record<string, number> {
  const out: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsBatimentsVille(ville, C))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  // Merveille « Laboratoire d'expérimentations de Falheim » (retour
  //  Thibaut 2026-10-15) : double la Science générée par les
  //  bâtiments de la CAPITALE — on ajoute une seconde fois le flux
  //  de Science des bâtiments de la capitale.
  if (aLaboratoireFalheim(p) && capitaleDe(p) != null) {
    const cap = capitaleDe(p)!
    for (const [res, v] of Object.entries(effetsBatimentsVille(cap, C))) {
      if (res === 'Science' && v > 0) out[res] = (out[res] ?? 0) + v
    }
  }
  for (const [res, v] of Object.entries(out)) {
    if (!v) continue
    const rs = p.resources[res]
    if (rs) rs.stock += v
  }
  return out
}

// ── Vue détaillée pour l'interface (tableau des bâtiments) ─────────────

export interface LigneBatiment {
  nom: string
  villes: string[]               // villes qui le possèdent
  effets: Record<string, number>  // flux par tour cumulés (0 si remplacé partout)
  remplacePar: string[]           // remplaçants présents dans les mêmes villes
  garnison: number               // garnison statique
}

/** Détail des bâtiments d'un joueur, agrégé par bâtiment (pour PlayerView). */
export function detailsBatimentsJoueur(p: Player, C: Cfg): LigneBatiment[] {
  const lignes = new Map<string, LigneBatiment>()
  for (const ville of p.villes) {
    const ignores = batimentsRemplaces(ville)
    for (const nom of ville.batiments) {
      let l = lignes.get(nom)
      if (!l) {
        l = { nom, villes: [], effets: {}, remplacePar: [], garnison: garnisonBatiment(nom, C) }
        lignes.set(nom, l)
      }
      l.villes.push(ville.nom)
      if (ignores.has(nom)) {
        for (const autre of ville.batiments) {
          if ((REMPLACE[autre] ?? []).includes(nom) && !l.remplacePar.includes(autre)) {
            l.remplacePar.push(autre)
          }
        }
      } else {
        for (const [res, v] of Object.entries(effetsTourBatiment(nom, C))) {
          l.effets[res] = (l.effets[res] ?? 0) + v
        }
      }
    }
  }
  return [...lignes.values()].sort((a, b) => a.nom.localeCompare(b.nom))
}

export { coutBatimentRef }
