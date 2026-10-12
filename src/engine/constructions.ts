// ══════════════════════════════════════════════════════════════════════
//  CONSTRUCTIONS — RÉFÉRENTIEL CANONIQUE (coût / production / description)
//  Source unique : table « constructions » du référentiel (referentiels.json),
//  saisie depuis la feuille « Ville » du classeur 7.19 :
//    · Bâtiments de ville (colonnes B/C/D) et de château (F/G/H),
//    · Bâtiments de capitale (« 12 Or + 6 Bois »),
//    · Aménagements de terrain (« 8 Or + 3 Bois »).
//  Chaque entrée référence le COÛT EXACT, la PRODUCTION EXACTE (texte
//  analysable par le moteur) et la DESCRIPTION EXACTE du classeur —
//  la production et la description sont parfois similaires.
//  Découpage SOLID du moteur : un module = une responsabilité de domaine.
// ══════════════════════════════════════════════════════════════════════

import { DEFAULT_CONFIG, type GameConfig, type ConstructionRef } from '../config/defaultConfig'

export type { ConstructionRef }

// ── Types ───────────────────────────────────────────────────────────────

/** Ligne de la table « constructions » du référentiel (type complet ci-dessus). */

/** Toutes les constructions du référentiel (config de la partie ou défaut). */
export function constructionsRefs(cfg?: GameConfig): ConstructionRef[] {
  const liste = (cfg ?? DEFAULT_CONFIG).constructions
  return Array.isArray(liste) && liste.length > 0 ? liste : DEFAULT_CONFIG.constructions
}

/** Une construction précise (par nom, éventuellement restreinte à un groupe). */
export function constructionRef(nom: string, cfg?: GameConfig, groupe?: string): ConstructionRef | undefined {
  const liste = constructionsRefs(cfg).filter((c) => c.nom === nom)
  return (groupe ? liste.find((c) => c.groupe === groupe) : undefined) ?? liste[0]
}

/** Les aménagements de terrain du référentiel. */
export function amenagementsRefs(cfg?: GameConfig): ConstructionRef[] {
  return constructionsRefs(cfg).filter((c) => c.categorie === 'Aménagement')
}

/** Les bâtiments (ville / château / capitale) du référentiel. */
export function batimentsRefs(cfg?: GameConfig): ConstructionRef[] {
  return constructionsRefs(cfg).filter((c) => c.categorie === 'Bâtiment')
}

// ── Analyseurs de texte (coût et production) ───────────────────────────

const NOMBRE = String.raw`\d+(?:[.,]\d+)?`
/** Ressources de flux (Garnison et Habitants exclus : valeurs d'état). */
const RESSOURCES_FLUX = 'Or|Bois|Pierre|Fer|Charbon|Bétail|Soie|Nourritures?|Science|Tourisme'
/** Ressources telles qu'elles apparaissent dans les textes de coût du classeur. */
const RESSOURCES_COUT = 'Or|Bois|Pierres?|Fer|Charbon|Bétails?|Soie|Nourritures?|Science|Tourisme'

/** Normalise un nom de ressource lu dans un texte (« Pierres » → « Pierre »). */
export function normaliserRessource(res: string): string {
  if (/^pierres?$/i.test(res)) return 'Pierre'
  if (/^bétails?$/i.test(res)) return 'Bétail'
  if (/^nourritures?$/i.test(res)) return 'Nourriture'
  return res
}

/** Analyse un texte de coût (« 25 Or + 4 Fer ») en quantités par ressource. */
export function parseCoutTexte(texte: string): Record<string, number> {
  const out: Record<string, number> = {}
  if (!texte) return out
  const re = new RegExp(String.raw`(${NOMBRE})\s*(?:de\s+)?(${RESSOURCES_COUT})\b`, 'gi')
  for (const m of texte.matchAll(re)) {
    const res = normaliserRessource(m[2])
    out[res] = (out[res] ?? 0) + parseFloat(m[1].replace(',', '.'))
  }
  return out
}

/** Découpe un texte en phrases exploitables. */
function phrases(texte: string): string[] {
  return texte
    .replace(/\.\s+/g, '.\n')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/** Analyse une phrase et renvoie les flux par tour qu'elle décrit. */
function analyserPhrase(phrase: string): Record<string, number> {
  // Les réductions de coût ne sont pas des flux par tour.
  if (/coût/i.test(phrase)) return {}
  const out: Record<string, number> = {}
  const push = (negatif: boolean, nb: string, res: string) => {
    let v = parseFloat(nb.replace(',', '.'))
    if (negatif) v = -v
    out[normaliserRessource(res)] = (out[normaliserRessource(res)] ?? 0) + v
  }
  // Consommation : « Consomme 10 Nourriture par tour »
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

/** Cache des productions analysées, par (nom, texte de production). */
const CACHE: Map<string, Record<string, number>> = new Map()

/** Analyse le texte de production EXACT d'une construction en flux par tour. */
export function parseProductionTexte(nom: string, texte: string): Record<string, number> {
  if (!texte) return {}
  const cle = `${nom}|${texte}`
  const cache = CACHE.get(cle)
  if (cache) return cache
  const out: Record<string, number> = {}
  for (const phrase of phrases(texte)) {
    for (const [res, v] of Object.entries(analyserPhrase(phrase))) {
      out[res] = (out[res] ?? 0) + v
    }
  }
  CACHE.set(cle, out)
  return out
}

// ── Accès moteur : coûts et effets ─────────────────────────────────────

/** Coût de construction d'une entrée du référentiel (texte de coût exact). */
export function coutConstructionRef(ref: ConstructionRef): Record<string, number> {
  return parseCoutTexte(ref.cout)
}

/** Coût de construction d'un bâtiment du référentiel (par nom, groupe optionnel). */
export function coutBatimentRef(nom: string, cfg?: GameConfig, groupe?: string): Record<string, number> {
  const ref = constructionRef(nom, cfg, groupe)
  return ref ? coutConstructionRef(ref) : {}
}

/** Effets par tour d'une construction (texte de production exact analysé). */
export function effetsConstructionRef(ref: ConstructionRef): Record<string, number> {
  return parseProductionTexte(ref.nom, ref.production)
}

/** Une construction ne produit qu'en Été ? (« … par tour en été. ») */
export function eteSeulementRef(ref: ConstructionRef): boolean {
  return /en\s+été/i.test(ref.production)
}

/** Garnison statique accordée par une construction (valeur d'état, pas un flux). */
export function garnisonConstructionRef(ref: ConstructionRef): number {
  const m = ref.description.match(/Garnison\s*\+?\s*(\d+)/i)
  return m ? parseInt(m[1], 10) : 0
}

/** Réduction de coût des aménagements accordée par le Camp de bâtisseurs
 *  (lue dans sa description EXACTE : « Réduit le coût de construction des
 *  aménagements de 5 Or et 1 Bois. »). */
export function reductionCampDeBatisseurs(cfg?: GameConfig): Record<string, number> {
  const ref = constructionRef('Camp de bâtisseurs', cfg)
  const m = ref?.description.match(/aménagements\s+de\s+(\d+)\s*Or\s+et\s+(\d+)\s*Bois/i)
  if (!ref || !m) return { Or: 5, Bois: 1 }
  return { Or: parseInt(m[1], 10), Bois: parseInt(m[2], 10) }
}
