// ══════════════════════════════════════════════════════════════════════
//  AMÉNAGEMENTS DE TERRAIN — EFFETS AUTOMATIQUES PAR TOUR
//  Les villes peuvent accueillir des aménagements en plus des bâtiments :
//  ils exploitent une case de terrain (Baleine, Plaine, Forêt…) et
//  rapportent des ressources à chaque fin de tour (feuille « Aménagements »
//  du classeur 7.19 : « Aménagements : 8 Or + 3 Bois »).
//  Le Camp de bâtisseurs réduit le coût de construction des aménagements
//  de 5 Or et 1 Bois (effet lu dans le référentiel des bâtiments).
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player, Saison } from './types'
import type { Cfg } from './gameData'

// ── Référentiel des aménagements (classeur 7.19, feuille Aménagements) ──

export interface AmenagementDef {
  nom: string
  /** case de terrain requise (affichée entre parenthèses dans le classeur) */
  terrain: string
  /** description lisible (affichée dans l'interface) */
  effet: string
  /** effets de flux par tour ; ignorés hors été si eteSeulement */
  effets: Record<string, number>
  /** production uniquement à la saison d'Été (Champ, Rizière) */
  eteSeulement?: boolean
}

export const AMENAGEMENTS: AmenagementDef[] = [
  { nom: 'Baleinier', terrain: 'Baleine', effet: '+2 Or et +10 Nourriture par tour.', effets: { Or: 2, Nourriture: 10 } },
  { nom: 'Bâteau de pêche', terrain: 'Crabe', effet: '+8 Nourriture par tour.', effets: { Nourriture: 8 } },
  { nom: 'Carrière', terrain: 'Pierre', effet: '+1 Pierre par tour.', effets: { Pierre: 1 } },
  { nom: 'Champ', terrain: 'Plaine', effet: '+10 Nourriture par tour en été.', effets: { Nourriture: 10 }, eteSeulement: true },
  { nom: 'Foire', terrain: 'Plaine ou Désert', effet: '+5 Tourisme.', effets: { Tourisme: 5 } },
  { nom: 'Mine de Charbon', terrain: 'Charbon', effet: '+1 Charbon par tour.', effets: { Charbon: 1 } },
  { nom: 'Mine de Fer', terrain: 'Fer', effet: '+1 Fer par tour.', effets: { Fer: 1 } },
  { nom: "Mine d'Or", terrain: 'Or', effet: '+4 Or par tour.', effets: { Or: 4 } },
  { nom: 'Observatoire', terrain: 'Geyser/Volcan', effet: '+1 Science par tour.', effets: { Science: 1 } },
  { nom: 'Pâturage', terrain: 'Bétail', effet: '+1 Bétail et +8 Nourriture par tour.', effets: { Bétail: 1, Nourriture: 8 } },
  { nom: 'Rizière', terrain: 'Marais', effet: '+15 Nourriture par tour en été.', effets: { Nourriture: 15 }, eteSeulement: true },
  { nom: 'Scierie', terrain: 'Forêt', effet: '+1 Bois par tour.', effets: { Bois: 1 } },
  { nom: 'Sériciculture', terrain: 'Soie', effet: '+1 Soie par tour.', effets: { Soie: 1 } },
  { nom: 'Site archéologique', terrain: 'Ruine', effet: '+8 Tourisme.', effets: { Tourisme: 8 } },
]

/** Coût de construction d'un aménagement (classeur : « 8 Or + 3 Bois »). */
export const COUT_AMENAGEMENT_BASE: Record<string, number> = { Or: 8, Bois: 3 }
/** Réduction accordée par un Camp de bâtisseurs (« −5 Or et −1 Bois »). */
export const REDUCTION_CAMP_BATISSEURS: Record<string, number> = { Or: 5, Bois: 1 }

export function amenagementDef(nom: string): AmenagementDef | undefined {
  return AMENAGEMENTS.find((a) => a.nom === nom)
}

/** Le joueur possède-t-il un Camp de bâtisseurs (coût des aménagements réduit) ? */
export function aCampDeBatisseurs(p: Player): boolean {
  return p.villes.some((v) => v.batiments.includes('Camp de bâtisseurs'))
}

/** Coût de construction d'un aménagement pour ce joueur (réduction du
 *  Camp de bâtisseurs déduite, plancher à 0). */
export function coutAmenagement(p: Player): Record<string, number> {
  if (!aCampDeBatisseurs(p)) return { ...COUT_AMENAGEMENT_BASE }
  const out: Record<string, number> = {}
  for (const [res, v] of Object.entries(COUT_AMENAGEMENT_BASE)) {
    out[res] = Math.max(0, v - (REDUCTION_CAMP_BATISSEURS[res] ?? 0))
  }
  return out
}

/** Effets par tour d'un aménagement pour la saison donnée
 *  (Champ et Rizière ne produisent qu'en été). */
export function effetsTourAmenagement(nom: string, saison: Saison): Record<string, number> {
  const def = amenagementDef(nom)
  if (!def) return {}
  if (def.eteSeulement && saison !== 'Été') return {}
  return { ...def.effets }
}

/** Effets par tour cumulés des aménagements d'une ville. */
export function effetsAmenagementsVille(ville: City, saison: Saison): Record<string, number> {
  const out: Record<string, number> = {}
  for (const nom of ville.amenagements ?? []) {
    for (const [res, v] of Object.entries(effetsTourAmenagement(nom, saison))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  return out
}

/** Crédite au stock les effets par tour de TOUS les aménagements du joueur
 *  (étape moteur, après les bâtiments) et renvoie les effets appliqués. */
export function appliquerEffetsAmenagements(p: Player, saison: Saison): Record<string, number> {
  const out: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsAmenagementsVille(ville, saison))) {
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
}

/** Détail des aménagements d'un joueur, agrégé par aménagement (pour PlayerView). */
export function detailsAmenagementsJoueur(p: Player, saison: Saison): LigneAmenagement[] {
  const lignes = new Map<string, LigneAmenagement>()
  for (const ville of p.villes) {
    for (const nom of ville.amenagements ?? []) {
      let l = lignes.get(nom)
      if (!l) {
        const def = amenagementDef(nom)
        l = {
          nom, terrain: def?.terrain ?? '—', villes: [], effets: {},
          horsSaison: !!def?.eteSeulement && saison !== 'Été',
        }
        lignes.set(nom, l)
      }
      l.villes.push(ville.nom)
      for (const [res, v] of Object.entries(effetsTourAmenagement(nom, saison))) {
        l.effets[res] = (l.effets[res] ?? 0) + v
      }
    }
  }
  return [...lignes.values()].sort((a, b) => a.nom.localeCompare(b.nom))
}
