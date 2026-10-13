// ══════════════════════════════════════════════════════════════════════
//  AUTRES — PRODUCTION ADDITIONNELLE PAR VILLE (bloc « Autres » du classeur)
//  Chaque ville peut lister des sources de production hors bâtiments et
//  aménagements : (ressource, source, nombre, bonus) → le moteur crédite
//  « nombre × bonus » de la ressource à chaque fin de tour. Exemples du
//  classeur J{n} : « Nourriture | Rivière | 1 | 12 », « Science | Capital |
//  7 | 1 », « Or | Cité L | 3 | 1 ».
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player } from './types'
import type { AutreDef } from './types'

/** Effet par tour d'une ligne « Autre » : nombre × bonus de la ressource. */
export function effetAutreLigne(l: AutreDef): number {
  return (l.nombre ?? 0) * (l.bonus ?? 0)
}

/** Une ligne « Autre » porte-t-elle sur la NOURRITURE D'ÉTÉ (ligne
 *  « Nourr - été » du classeur) ? Son effet n'est crédité au stock de
 *  Nourriture QUE pendant l'été — c'est une production d'été, pas de
 *  la nourriture générale. */
export function estNourrEte(ressource: string | undefined): boolean {
  return !!ressource && /^\s*nourr[a-z]*\s*[-–]?\s*été\s*$/i.test(ressource.trim().replace(/\s+/g, ' '))
    || !!ressource && /^nourriture\s*(d['’]?)?\s*été$/i.test(ressource.trim().replace(/\s+/g, ' '))
}

/** Effets par tour cumulés des lignes « Autres » d'une ville (hors
 *  production d'été, créditée à part uniquement en été). */
export function effetsAutresVille(ville: City): Record<string, number> {
  const out: Record<string, number> = {}
  for (const l of ville.autres ?? []) {
    if (!l.ressource || estNourrEte(l.ressource)) continue
    const v = effetAutreLigne(l)
    if (v !== 0) out[l.ressource] = (out[l.ressource] ?? 0) + v
  }
  return out
}

/** Production d'ÉTÉ des lignes « Autres » d'une ville (ressource
 *  « Nourr - été » du classeur) : nombre × bonus, crédité au stock de
 *  Nourriture uniquement pendant l'été. */
export function effetsNourrEteAutresVille(ville: City): Record<string, number> {
  const out: Record<string, number> = {}
  for (const l of ville.autres ?? []) {
    if (!l.ressource || !estNourrEte(l.ressource)) continue
    const v = effetAutreLigne(l)
    if (v !== 0) out['Nourriture'] = (out['Nourriture'] ?? 0) + v
  }
  return out
}

/** Crédite au stock les effets des lignes « Autres » de TOUTES les villes
 *  du joueur (étape moteur, après les aménagements) et les renvoie. */
export function appliquerEffetsAutres(p: Player): Record<string, number> {
  const out: Record<string, number> = {}
  for (const ville of p.villes) {
    for (const [res, v] of Object.entries(effetsAutresVille(ville))) {
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

// ── Vue détaillée pour l'interface (tableau des « Autres ») ────────────

export interface LigneAutre {
  ressource: string
  source: string
  villes: string[]   // villes qui possèdent cette ligne (source + ressource)
  nombre: number
  bonus: number
  effets: number     // nombre × bonus cumulé sur les villes
}

/** Détail des lignes « Autres » d'un joueur, agrégé par (ressource, source). */
export function detailsAutresJoueur(p: Player): LigneAutre[] {
  const lignes = new Map<string, LigneAutre>()
  for (const ville of p.villes) {
    for (const l of ville.autres ?? []) {
      if (!l.ressource) continue
      const cle = `${l.ressource}|${l.source ?? ''}`
      let li = lignes.get(cle)
      if (!li) {
        li = { ressource: l.ressource, source: l.source ?? '', villes: [], nombre: 0, bonus: 0, effets: 0 }
        lignes.set(cle, li)
      }
      li.villes.push(ville.nom)
      li.nombre += l.nombre ?? 0
      li.bonus = l.bonus ?? 0
      li.effets += effetAutreLigne(l)
    }
  }
  return [...lignes.values()].sort((a, b) =>
    a.ressource.localeCompare(b.ressource) || a.source.localeCompare(b.source))
}
