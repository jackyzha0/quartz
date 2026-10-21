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

import { DEFAULT_CONFIG, type GameConfig, type ConstructionRef, type EffetConstruction } from '../config/defaultConfig'
import { reglePourConstruction, contexteLectureSeule } from '../rules/registry'
import type { Effet } from '../rules/types'
import { appliquerRegles } from '../rules/effects/banque'

export type { ConstructionRef, EffetConstruction }

// ── Types ───────────────────────────────────────────────────────────────

/** Ligne de la table « constructions » du référentiel (type complet ci-dessus). */

/** Toutes les constructions du référentiel (config de la partie ou défaut). */
export function constructionsRefs(cfg?: GameConfig): ConstructionRef[] {
  const liste = (cfg ?? DEFAULT_CONFIG).constructions
  return Array.isArray(liste) && liste.length > 0 ? liste : DEFAULT_CONFIG.constructions
}

/** Une construction précise (par nom, éventuellement restreinte à un groupe).
 *  M4 (audit 2026-10-19, repli ASSUMÉ et documenté) : si le `groupe`
 *  demandé n'existe pas dans les variantes de ce nom (constructions
 *  doublées Ville/Château), on replie silencieusement sur la première
 *  variante (historiquement « Ville »). Pragmatisme assumé : ce lookup
 *  est appelé sur les chemins chauds d'affichage — pas de log (le
 *  moteur est pur, zéro console) ; le repli est celui-ci, connu. */
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

// ── Analyseurs de texte (coût uniquement) ───────────────────────────────

const NOMBRE = String.raw`\d+(?:[.,]\d+)?`
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

// ── Effets (marqueur (s)) : la BANQUE D'EFFETS est la voie UNIQUE ──────
// Retour Thibaut 2026-10-16, renforcé le 2026-10-19 (« tout ce qui a
// rapport à une production passe par la banque ») : chaque construction
// porte ses effets en tableau structuré `effets` (paramétrable dans
// l'onglet 🎛 Paramètres), traduit en RÈGLE par le registre
// (rules/registry.ts) et interprété UNE fois par la banque
// (rules/effects/banque.ts). Sémantique :
//   · le Tourisme est un FLUX NORMAL (comme le Bois) — affiché dans les
//     récaps de ville et de tour ; seule différence : son stock est
//     RECALCULÉ en fin de tour pour égaler la production courante
//     (stock = production), jamais cumulé (resynchroniserTourisme) ;
//   · la Garnison est une valeur D'ÉTAT (défense tant que la construction
//     tient) — canal dédié, jamais un flux ;
//   · les effets marqués « été » (Champ, Rizière) produisent uniquement
//     pendant l'Été (canal « Nourr - été »).
// L'ancien repli d'analyse du TEXTE de production (parseProductionTexte)
// a été RETIRÉ le 2026-10-19 : une construction sans règle de banque ne
// produit RIEN — il n'existe plus de seconde interprétation des effets.

/** Contribution de la banque pour une construction (règle identifiée par
 *  (nom, groupe)). Retourne undefined si la construction n'a pas de
 *  règle — production nulle, par convention ci-dessus. */
function contributionBanque(ref: ConstructionRef): ReturnType<typeof appliquerRegles> | undefined {
  const regle = reglePourConstruction(ref)
  if (!regle) return undefined
  return appliquerRegles([regle], contexteLectureSeule())
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

/** Effets par tour FLUX d'une construction : production régulière de la
 *  règle de banque (le Tourisme est un flux NORMAL ; la Garnison, valeur
 *  d'état, passe par son canal dédié ; l'Été par le canal été). Sans
 *  règle : production nulle. */
export function effetsConstructionRef(ref: ConstructionRef): Record<string, number> {
  const c = contributionBanque(ref)
  return c ? c.flux : {}
}

/** Production d'ÉTÉ d'une construction (canal « Nourr - été » : Champ,
 *  Rizière) — effets marqués « été » dans la banque. */
export function effetsEteConstructionRef(ref: ConstructionRef): Record<string, number> {
  const c = contributionBanque(ref)
  return c ? c.fluxEte : {}
}

/** Valeur d'ÉTAT d'une construction : la Garnison (défense tant que la
 *  construction tient). Le Tourisme n'y figure PLUS : flux normal depuis
 *  le retour Thibaut 2026-10-16 (voir la sémantique en tête de section). */
export function instantanesConstructionRef(ref: ConstructionRef): Record<string, number> {
  const c = contributionBanque(ref)
  if (!c || !c.garnison) return {}
  return { Garnison: c.garnison }
}

/** Une construction ne produit-t-elle qu'en Été ? (Champ, Rizière — lu
 *  sur la RÈGLE de banque : tout flux qu'elle porte est marqué été.) */
export function eteSeulementRef(ref: ConstructionRef): boolean {
  const regle = reglePourConstruction(ref)
  const flux = (regle?.effets ?? []).filter(
    (e): e is Extract<Effet, { type: 'fluxVille' }> => e.type === 'fluxVille',
  )
  return flux.length > 0 && flux.every((e) => e.ete)
}

/** Bâtiment (ou aménagement) prérequis d'une construction, extrait du
 *  texte de coût (« Poste de garde requis. », « Herboristerie requise. »,
 *  « Caserne requise »…). Retourne null si aucun. Le prérequis doit être
 *  présent dans la MÊME ville (règle du classeur). */
export function prerequisConstruction(ref: Pick<ConstructionRef, 'cout'> | undefined): string | null {
  if (!ref) return null
  const m = ref.cout.match(/([A-ZÉÈÀÂÎÔÛ][\wàâäéèêëîïôöûüç'’ .-]*?)\s+requis(?:e)?s?\b/i)
    ?? ref.cout.match(/requis(?:e)?s?\s*:?\s*([A-ZÉÈÀÂÎÔÛ][\wàâäéèêëîïôöûüç'’ .-]*?)(?:\.|$)/i)
  if (!m) return null
  return m[1].trim().replace(/\s*$/,'') || null
}

/** Emplacements de métiers accordés par une construction (vague 3a,
 *  rework métiers & aménagements 2026-10-21) : chaque aménagement tier 1
 *  octroie `places` postes de `metier` aux villes qui le possèdent —
 *  la production directe a disparu au profit de ces postes (caps par
 *  ville = somme des emplacements des aménagements présents, cf.
 *  engine/metiers.ts capMetierVille). Format du référentiel :
 *  `emplacements: [{ metier, places }]`. */
export function emplacementsConstructionRef(ref: ConstructionRef): Array<{ metier: string; places: number }> {
  return (ref.emplacements ?? []).map((e) => ({ metier: e.metier, places: Number(e.places) || 0 }))
}

/** Garnison statique accordée par une construction (valeur d'état, pas un
 *  flux) — via la banque d'effets ; sans règle : 0. */
export function garnisonConstructionRef(ref: ConstructionRef): number {
  const c = contributionBanque(ref)
  return c ? c.garnison : 0
}

/** Résumé affichable des effets d'une construction (badges page Pays et
 *  wiki Référentiels) : « +2 Or / tour · été : +10 Nourriture ·
 *  Garnison +40 ». Le Tourisme apparaît comme flux (« +16 Tourisme /
 *  tour ») conformément à la sémantique stock = production. */
export function resumeConstruction(ref: ConstructionRef | undefined): string {
  if (!ref) return ''
  const parts: string[] = []
  const flux = Object.entries(effetsConstructionRef(ref))
  if (flux.length > 0) {
    parts.push(flux.map(([r, v]) => `${v > 0 ? '+' : ''}${v} ${r}`).join(', ') + ' / tour')
  }
  const ete = Object.entries(effetsEteConstructionRef(ref))
  if (ete.length > 0) {
    parts.push('été : ' + ete.map(([r, v]) => `${v > 0 ? '+' : ''}${v} ${r}`).join(', '))
  }
  const inst = instantanesConstructionRef(ref)
  if (inst.Garnison) parts.push(`Garnison +${inst.Garnison}`)
  const emp = emplacementsConstructionRef(ref)
  if (emp.length > 0) {
    parts.push(emp.map((e) => `${e.places} ${e.metier.toLowerCase()}`).join(', '))
  }
  return parts.join(' · ')
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
