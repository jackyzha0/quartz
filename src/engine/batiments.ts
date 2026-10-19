// ══════════════════════════════════════════════════════════════════════
//  BÂTIMENTS — EFFETS AUTOMATIQUES PAR TOUR (étape 3quater de FinDeTour)
//  Les bâtiments des villes produisent et consomment des ressources à
//  chaque fin de tour : +1 Bois pour un Camp de bûcheron, −10 Nourriture
//  pour un Poste de garde, +45 Nourriture / −1 Charbon pour un Moulin à
//  vent…
//  RÉFÉRENTIEL CANONIQUE : chaque bâtiment référence son coût exact, sa
//  production exacte et sa description exacte (table `constructions`,
//  feuille « Ville » du classeur 7.19). La production par tour est lue
//  dans ce texte EXACT ; les bâtiments hors référentiel (santé / écoles)
//  retombent sur l'ancien analyseur du texte d'effet.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import type { City, Player } from './types'
import { cfgOf, type Cfg } from './gameData'
import { buildingDef } from './gameData2'
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

// ── Analyseur du texte d'effet (repli pour les bâtiments hors référentiel) ──

// Ressources de flux concernées par les effets par tour. Garnison,
// Habitants et Tourisme sont volontairement EXCLUS : ce sont des
// valeurs d'état (défense / population / attractivité), pas des flux —
// « Garnison +40 » est une valeur statique tant que le bâtiment tient
// (voir garnisonBatiment) et « Tourisme +15 » est un bonus acquis UNE
// FOIS à la construction (voir tourismeStatiqueBatiment).
const RESSOURCES_FLUX = 'Or|Bois|Pierre|Fer|Charbon|Bétail|Soie|Nourritures?|Science'
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
  const reSigne = new RegExp(String.raw`([+\-\u2212])\s*(${NOMBRE})\s*(${RESSOURCES_FLUX})\b`, 'gi')
  for (const m of phrase.matchAll(reSigne)) push(m[1] === '-' || m[1] === '\u2212', m[2], m[3])
  // Ressource avant le signe : « Tourisme +15 »
  const reInverse = new RegExp(String.raw`(${RESSOURCES_FLUX})\s*([+\-\u2212])\s*(${NOMBRE})\b`, 'gi')
  for (const m of phrase.matchAll(reInverse)) push(m[2] === '-' || m[2] === '\u2212', m[3], m[1])
  return out
}

/** Correctifs de REPLI : bâtiments hors référentiel canonique dont la
 *  production dépend du plateau de jeu (cases maritimes, routes
 *  commerciales…), non modélisé dans le portage. */
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
  // Bâtiments de faction (Basiléens) : chaque palier remplace le précédent.
  'Grande Cathédrale': ['Église'],
  'Palais de Notre-Dame du Palatinat': ['Grande Cathédrale', 'Église'],
}

/** Cache des effets analysés, par (nom, textes de production/effet) — les
 *  textes peuvent être édités à chaud depuis l'onglet Paramètres. */
const CACHE = new Map<string, Record<string, number>>()

/** Effets par tour d'un bâtiment : production EXACTE du référentiel
 *  (table `constructions`), repli sur l'analyse du texte d'effet sinon.
 *  GROUPE (correctif 2026-10-18) : 4 bâtiments existent en versions
 *  Ville ET Château aux effets/coûts DIFFÉRENTS (Herses, Echoppe,
 *  Herboristerie, Observatoire) — l'appelant passe le type
 *  d'habitation de SA ville, sinon la version Ville écraserait les
 *  effets des châteaux. */
export function effetsTourBatiment(nom: string, C: Cfg, groupe?: string): Record<string, number> {
  const ref = constructionRef(nom, C.config, groupe)
  const bd = buildingDef(nom, C.config)
  const cle = `${nom}|${groupe ?? ''}|${ref?.production ?? ''}|${bd?.effet ?? ''}|${JSON.stringify(ref?.effets ?? null)}`
  const cache = CACHE.get(cle)
  if (cache) return cache
  let out: Record<string, number>
  if (ref) {
    // Référentiel canonique : production exacte analysée.
    out = effetsConstructionRef(ref)
  } else if (nom in EFFETS_FORCES) {
    out = { ...EFFETS_FORCES[nom] }
  } else if (!bd?.effet) {
    out = {}
  } else {
    // Repli : ancienne analyse du texte d'effet.
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

/** Garnison statique accordée par un bâtiment (valeur d'état, pas un
 *  flux). Groupe : cf. effetsTourBatiment (doublons Ville/Château). */
export function garnisonBatiment(nom: string, C: Cfg, groupe?: string): number {
  const ref = constructionRef(nom, C.config, groupe)
  if (ref) return garnisonConstructionRef(ref)
  const bd = buildingDef(nom, C.config)
  const m = bd?.effet?.match(/Garnison\s*\+?\s*(\d+)/i)
  return m ? parseInt(m[1], 10) : 0
}

/** Tourisme statique accordé par un bâtiment — valeur d'état acquise
 *  UNE FOIS à la construction (« Tourisme +15 », « Chapelle : Tourisme
 *  +35 »…), pas un flux par tour. Utilisé par construire() (page Pays). */
export function tourismeStatiqueBatiment(nom: string, C: Cfg, groupe?: string): number {
  const ref = constructionRef(nom, C.config, groupe)
  // Effets STRUCTURÉS (marqueur (s)) : le Tourisme est une case à part
  // entière, créditée UNE FOIS à la construction — jamais un flux / tour.
  if (ref?.effets) {
    return ref.effets.filter((e) => e.ressource === 'Tourisme').reduce((s, e) => s + e.quantite, 0)
  }
  const bd = buildingDef(nom, C.config)
  const texte = [ref?.description, ref?.production, bd?.effet].filter(Boolean).join(' ')
  // Deux formes du classeur : « Tourisme +35 » ET « +5 Tourisme par
  // tour. » (Foire, Site archéologique…). Dans les DEUX cas le Tourisme
  // est une valeur FLAT créditée UNE FOIS à la construction (retour
  // Thibaut, marqueur (r)) — jamais un flux par tour. Fonctionne pour
  // les BÂTIMENTS comme pour les AMÉNAGEMENTS (même référentiel).
  const m = texte.match(/Tourisme\s*\+?\s*(\d+(?:[.,]\d+)?)/i)
    ?? texte.match(/\+\s*(\d+(?:[.,]\d+)?)\s*Tourisme/i)
  return m ? parseFloat(m[1].replace(',', '.')) : 0
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
