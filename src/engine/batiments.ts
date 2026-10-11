// ══════════════════════════════════════════════════════════════════════
//  BÂTIMENTS — EFFETS AUTOMATIQUES PAR TOUR (étape 3quater de FinDeTour)
//  Les bâtiments des villes produisent et consomment des ressources à
//  chaque fin de tour : +1 Bois pour un Camp de bûcheron, −10 Nourriture
//  pour un Poste de garde, +45 Nourriture / −1 Charbon pour un Moulin à
//  vent… Les effets sont lus dans le texte du référentiel (feuilles
//  Ville / Château du classeur 7.19) par un petit analyseur syntaxique,
//  avec correctifs pour les cas ambigus du classeur.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player } from './types'
import type { Cfg } from './gameData'
import { buildingDef } from './gameData2'

// ── Analyseur du texte d'effet ──────────────────────────────────────────

// Ressources de flux concernées par les effets par tour. Garnison et
// Habitants sont volontairement EXCLUS : ce sont des valeurs d'état
// (défense / population), pas des flux — « Garnison +40 » est une valeur
// statique tant que le bâtiment tient (voir garnisonBatiment).
const RESSOURCES_FLUX = 'Or|Bois|Pierre|Fer|Charbon|Bétail|Soie|Nourritures?|Science|Tourisme'
const NOMBRE = String.raw`\d+(?:[.,]\d+)?`

/** Découpe un texte d'effet en phrases exploitables. */
function phrases(texte: string): string[] {
  return texte
    .replace(/\.\s+/g, '.\n')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/** Analyse une phrase et renvoie les flux par tour qu'elle décrit. */
function analyserPhrase(phrase: string): Record<string, number> {
  // Les réductions de coût (« Coût des Progrès -1 Science », « … coûtent
  // 6 Or et 2 Bois de moins ») ne sont pas des flux par tour.
  if (/coût/i.test(phrase)) return {}
  const out: Record<string, number> = {}
  const push = (negatif: boolean, nb: string, res: string) => {
    let v = parseFloat(nb.replace(',', '.'))
    if (negatif) v = -v
    const ressource = /^nourritures?$/i.test(res) ? 'Nourriture' : res
    out[ressource] = (out[ressource] ?? 0) + v
  }
  // Consommation : « Consomme 10 Nourritures et 8 Or par tour »
  if (/consomme/i.test(phrase)) {
    const re = new RegExp(String.raw`(${NOMBRE})\s*(?:de\s+)?(${RESSOURCES_FLUX})\b`, 'gi')
    for (const m of phrase.matchAll(re)) push(true, m[1], m[2])
    return out
  }
  // Signe avant la ressource : « +1 Bois par tour », « −10 Or »
  const reSigne = new RegExp(String.raw`([+−\-])\s*(${NOMBRE})\s*(${RESSOURCES_FLUX})\b`, 'gi')
  for (const m of phrase.matchAll(reSigne)) push(m[1] === '-' || m[1] === '−', m[2], m[3])
  // Ressource avant le signe : « Tourisme +15 »
  const reInverse = new RegExp(String.raw`(${RESSOURCES_FLUX})\s*([+−\-])\s*(${NOMBRE})\b`, 'gi')
  for (const m of phrase.matchAll(reInverse)) push(m[2] === '-' || m[2] === '−', m[3], m[1])
  return out
}

/** Correctifs : bâtiments dont la production dépend du plateau de jeu
 *  (cases maritimes, routes commerciales…), non modélisé dans le portage.
 *  Seule la consommation fixe est conservée. */
const EFFETS_FORCES: Record<string, Record<string, number>> = {
  'Ponton': {},
  'Port de pêche': {},
  'Port de commerce': {},
  'Guilde des marchands': { Charbon: -1 },
}

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

/** Cache des effets analysés, par (nom, texte d'effet) — le texte peut
 *  être édité à chaud depuis l'onglet Paramètres. */
const CACHE = new Map<string, Record<string, number>>()

/** Effets par tour d'un bâtiment, lus dans son texte d'effet. */
export function effetsTourBatiment(nom: string, C: Cfg): Record<string, number> {
  const bd = buildingDef(nom, C.config)
  const cle = `${nom}|${bd?.effet ?? ''}`
  const cache = CACHE.get(cle)
  if (cache) return cache
  let out: Record<string, number>
  if (nom in EFFETS_FORCES) {
    out = { ...EFFETS_FORCES[nom] }
  } else if (!bd?.effet) {
    out = {}
  } else {
    // Retire les mentions de coût (« Coût des Progrès -1 Science ») AVANT
    // le découpage en phrases : elles peuvent être à cheval sur une ligne.
    const texte = bd.effet.replace(/coût[^.]*\.?/gi, ' ')
    out = {}
    for (const phrase of phrases(texte)) {
      for (const [res, v] of Object.entries(analyserPhrase(phrase))) {
        out[res] = (out[res] ?? 0) + v
      }
    }
  }
  CACHE.set(cle, out)
  return out
}

/** Garnison statique accordée par un bâtiment (valeur d'état, pas un flux). */
export function garnisonBatiment(nom: string, C: Cfg): number {
  const bd = buildingDef(nom, C.config)
  const m = bd?.effet?.match(/Garnison\s*\+?\s*(\d+)/i)
  return m ? parseInt(m[1], 10) : 0
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

/** Effets par tour cumulés des bâtiments d'une ville (remplacements gérés). */
export function effetsBatimentsVille(ville: City, C: Cfg): Record<string, number> {
  const ignores = batimentsRemplaces(ville)
  const out: Record<string, number> = {}
  for (const nom of ville.batiments) {
    if (ignores.has(nom)) continue
    for (const [res, v] of Object.entries(effetsTourBatiment(nom, C))) {
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
