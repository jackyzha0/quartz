// ══════════════════════════════════════════════════════════════════════
//  CHASSE & PÊCHE — Accès aux référentiels
//  Les données vivent dans state.config (onglet « Paramètres ») ;
//  les helpers ci-dessous acceptent une config optionnelle et
//  retombent sur les valeurs par défaut sinon.
// ══════════════════════════════════════════════════════════════════════

import {
  DEFAULT_CONFIG, cfgOf, cloneDefaultConfig,
  type Cfg, type GameConfig, type TitreDef, type TraitDef, type CultureDef,
} from '../config/defaultConfig'

export type { GameConfig, TitreDef, TraitDef, CultureDef, Cfg }

export const RESOURCES: string[] = DEFAULT_CONFIG.ressources
export const TITRES: TitreDef[] = DEFAULT_CONFIG.titres
export const TRAITS: TraitDef[] = DEFAULT_CONFIG.traits
export const CULTURES: CultureDef[] = DEFAULT_CONFIG.cultures
export const REGIMES = DEFAULT_CONFIG.regimes
export const ORIENTATIONS = DEFAULT_CONFIG.orientations
export const GENRES = DEFAULT_CONFIG.genres
export const EDUCATIONS = DEFAULT_CONFIG.educations
export const BANQUES = DEFAULT_CONFIG.banquesNoms
export { DEFAULT_CONFIG, cfgOf, cloneDefaultConfig }

// Peuples (référence : nom + banque de noms associée)
export interface PeupleDef {
  nom: string
  noms: string[]
  prenomsM: string[]
  prenomsF: string[]
}
export const PEUPLES: PeupleDef[] = DEFAULT_CONFIG.peuples.map((nom) => {
  const b = DEFAULT_CONFIG.banquesNoms[DEFAULT_CONFIG.peupleBanque[nom] ?? 0] ?? DEFAULT_CONFIG.banquesNoms[0]
  return { nom, noms: b.noms, prenomsM: b.prenomsM, prenomsF: b.prenomsF }
})

export function titreDef(titre: string, cfg?: GameConfig): TitreDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).titres.find((t) => t.titre === titre)
}
export function traitDef(name: string, cfg?: GameConfig): TraitDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).traits.find((t) => t.name === name)
}
export function cultureDef(nom: string, cfg?: GameConfig): CultureDef | undefined {
  return (cfg ?? DEFAULT_CONFIG).cultures.find((c) => c.nom === nom)
}
export function peupleDef(nom: string, cfg?: GameConfig): PeupleDef | undefined {
  const c = cfg ?? DEFAULT_CONFIG
  const b = c.banquesNoms[c.peupleBanque[nom] ?? 0] ?? c.banquesNoms[0]
  if (!b) return undefined
  return { nom, noms: b.noms, prenomsM: b.prenomsM, prenomsF: b.prenomsF }
}
export function ressourcesOf(cfg?: GameConfig): string[] {
  return (cfg ?? DEFAULT_CONFIG).ressources
}
