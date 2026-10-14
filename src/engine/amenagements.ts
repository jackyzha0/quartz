// ══════════════════════════════════════════════════════════════════════
//  AMÉNAGEMENTS DE TERRAIN — EFFETS AUTOMATIQUES PAR TOUR
//  Les villes peuvent accueillir des aménagements en plus des bâtiments :
//  ils exploitent une case de terrain (Baleine, Plaine, Forêt…) et
//  rapportent des ressources à chaque fin de tour.
//  RÉFÉRENTIEL CANONIQUE : chaque aménagement référence son coût exact
//  (« 8 Or + 3 Bois »), sa production exacte (« +2 Or et +10 Nourriture
//  par tour. ») et sa description exacte (feuille « Ville » du classeur,
//  table `constructions` du référentiel). Le Camp de bâtisseurs réduit le
//  coût de construction (réduction lue dans sa description exacte).
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player, Saison } from './types'
import type { GameConfig } from '../config/defaultConfig'
import {
  amenagementsRefs, constructionRef, coutConstructionRef, effetsConstructionRef,
  effetsEteConstructionRef, eteSeulementRef, parseCoutTexte, reductionCampDeBatisseurs,
} from './constructions'

// ── Définitions exposées à l'interface ─────────────────────────────────

export interface AmenagementDef {
  nom: string
  /** case de terrain requise (affichée entre parenthèses dans le classeur) */
  terrain: string
  /** description exacte du classeur (affichée dans l'interface) */
  effet: string
  /** effets de flux par tour ; ignorés hors été si eteSeulement */
  effets: Record<string, number>
  /** production uniquement à la saison d'Été (Champ, Rizière) */
  eteSeulement?: boolean
}

/** Référence brute du référentiel : coût / production / description exacts. */
export function amenagementRef(nom: string, cfg?: GameConfig) {
  return constructionRef(nom, cfg)
}

/** Définitions normalisées de tous les aménagements du référentiel. */
export function amenagementsDefs(cfg?: GameConfig): AmenagementDef[] {
  return amenagementsRefs(cfg).map((ref) => ({
    nom: ref.nom,
    terrain: ref.terrain ?? '—',
    effet: ref.description,
    effets: { ...effetsConstructionRef(ref), ...effetsEteConstructionRef(ref) },
    eteSeulement: eteSeulementRef(ref),
  }))
}

/** Liste du référentiel par défaut (compatibilité : export historique). */
export const AMENAGEMENTS: AmenagementDef[] = amenagementsDefs()

/** Coût de construction affichable d'un aménagement (« 8 Or + 3 Bois »). */
export const COUT_AMENAGEMENT_TEXTE = amenagementRef('Baleinier')?.cout ?? '8 Or + 3 Bois'

export function amenagementDef(nom: string, cfg?: GameConfig): AmenagementDef | undefined {
  return amenagementsDefs(cfg).find((a) => a.nom === nom)
}

/** Le joueur possède-t-il un Camp de bâtisseurs (coût des aménagements réduit) ? */
export function aCampDeBatisseurs(p: Player): boolean {
  return p.villes.some((v) => v.batiments.includes('Camp de bâtisseurs'))
}

/** Coût de construction d'un aménagement pour ce joueur : coût EXACT du
 *  référentiel pour l'aménagement demandé (repli : coût du Baleinier,
 *  standard « 8 Or + 3 Bois »), réduction du Camp de bâtisseurs déduite
 *  (lue dans sa description exacte — plancher à 0). */
export function coutAmenagement(p: Player, cfg?: GameConfig, nom?: string): Record<string, number> {
  const ref = (nom ? amenagementRef(nom, cfg) : undefined) ?? amenagementRef('Baleinier', cfg)
  const base = ref ? coutConstructionRef(ref) : { Or: 8, Bois: 3 }
  if (!aCampDeBatisseurs(p)) return { ...base }
  const reduc = reductionCampDeBatisseurs(cfg)
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(base)) {
    out[res] = Math.max(0, v - (reduc[res] ?? 0))
  }
  return out
}

/** Effets par tour d'un aménagement pour la saison donnée
 *  (Champ et Rizière ne produisent qu'en été — production exacte du
 *  référentiel). */
export function effetsTourAmenagement(nom: string, saison: Saison, cfg?: GameConfig): Record<string, number> {
  const ref = amenagementRef(nom, cfg)
  if (!ref) return {}
  if (eteSeulementRef(ref) && saison !== 'Été') return {}
  // Effets structurés (marqueur (s)) : flux hors été + production d'été
  // du canal « Nourr - été » quand c'est la saison d'Été.
  const out = { ...effetsConstructionRef(ref) }
  if (saison === 'Été') {
    for (const [res, v] of Object.entries(effetsEteConstructionRef(ref))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Effets par tour des aménagements d'une ville, HORS production d'été :
 *  la « nourriture d'été » (Champ, Rizière — production exacte du
 *  référentiel, texte « … par tour en été ») est une production
 *  SÉPARÉE, créditée uniquement en été (fonction
 *  effetsNourrEteAmenagementsVille ci-dessous) — jamais doublée ni
 *  mélangée avec la nourriture générale. */
export function effetsAmenagementsVille(ville: City, saison: Saison, cfg?: GameConfig): Record<string, number> {
  const out: Record<string, number> = {}
  for (const nom of ville.amenagements ?? []) {
    const ref = amenagementRef(nom, cfg)
    if (!ref || eteSeulementRef(ref)) continue // production d'été → canal « Nourr - été »
    for (const [res, v] of Object.entries(effetsConstructionRef(ref))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Production d'ÉTÉ d'une ville (ligne « Nourr - été » du classeur) :
 *  effets des aménagements qui ne produisent qu'en été (Champ, Rizière).
 *  Le moteur ne crédite cette production au stock de Nourriture QUE
 *  pendant l'été (macro FinDeTour : prodSummer = ligne « Nourr - été »). */
export function effetsNourrEteAmenagementsVille(ville: City, cfg?: GameConfig): Record<string, number> {
  const out: Record<string, number> = {}
  for (const nom of ville.amenagements ?? []) {
    const ref = amenagementRef(nom, cfg)
    if (!ref) continue
    for (const [res, v] of Object.entries(effetsEteConstructionRef(ref))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Crédite au stock les effets par tour de TOUS les aménagements du joueur
 *  (étape moteur, après les bâtiments) et renvoie les effets appliqués. */
export function appliquerEffetsAmenagements(p: Player, saison: Saison, cfg?: GameConfig): Record<string, number> {
  const out: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsAmenagementsVille(ville, saison, cfg))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  for (const [res, v] of Object.entries(out)) {
    if (!v) continue
    const rs = p.resources[res]
    if (rs) rs.stock += v
  }
  return out
}

// ── Vue détaillée pour l'interface (tableau des aménagements) ───────────

export interface LigneAmenagement {
  nom: string
  terrain: string
  villes: string[]               // villes qui le possèdent
  effets: Record<string, number>  // flux par tour cumulés (0 si hors saison)
  horsSaison: boolean             // true = ne produit pas à la saison actuelle
  /** aménagement à production d'été seule (Champ, Rizière) → canal
   *  « Nourr - été », crédité uniquement en été */
  eteSeulement?: boolean
}

/** Détail des aménagements d'un joueur, agrégé par aménagement (pour PlayerView). */
export function detailsAmenagementsJoueur(p: Player, saison: Saison, cfg?: GameConfig): LigneAmenagement[] {
  const lignes = new Map<string, LigneAmenagement>()
  for (const ville of p.villes) {
    for (const nom of ville.amenagements ?? []) {
      let l = lignes.get(nom)
      if (!l) {
        const ref = amenagementRef(nom, cfg)
        l = {
          nom, terrain: ref?.terrain ?? '—', villes: [], effets: {},
          horsSaison: !!ref && eteSeulementRef(ref) && saison !== 'Été',
          eteSeulement: !!ref && eteSeulementRef(ref),
        }
        lignes.set(nom, l)
      }
      l.villes.push(ville.nom)
      for (const [res, v] of Object.entries(effetsTourAmenagement(nom, saison, cfg))) {
        l.effets[res] = (l.effets[res] ?? 0) + v
      }
    }
  }
  return [...lignes.values()].sort((a, b) => a.nom.localeCompare(b.nom))
}

/** Analyse du texte de coût (ré-exporté pour l'interface). */
export { parseCoutTexte }
