// ═══════════════════════════════════════════════════════════════════════════
//  REGISTRE DE RÈGLES — référentiel → banque d'effets (refactor 2026-10-18)
//
//  LA couche à éditer pour changer une règle : chaque entrée du
//  référentiel (bâtiment, aménagement, dogme…) est traduite en une
//  règle de banque (id stable + effets structurés). Les textes du
//  référentiel restent de l'AFFICHAGE ; les effets deviennent des
//  DONNÉES interprétées par la banque.
//
//  Migration progressive (strangle pattern) : les CONSTRUCTIONS
//  (bâtiments + aménagements, table constructions — format `effets`
//  marqueur (s) mappé 1:1), puis les MINISTÈRES (source 1/3,
//  2026-10-19) et les RÉGIMES & CULTURES (source 2/3, 2026-10-20 —
//  retour Thibaut « toute production passe par la banque »), puis les
//  FLUX DE PROGRÈS (source 3/3, 2026-10-20 — les technologies dont
//  la production par tour vivait codée en dur dans
//  engine/progresAuto.ts) sont traduits. Les autres sources (dogmes,
//  factions…) migrent ensuite une par une ; le moteur continue
//  d'utiliser ses fonctions historiques pour tout ce qui n'est pas
//  encore migré.
// ═══════════════════════════════════════════════════════════════════════════

import type { ContexteEffet, Effet, RegleBanque, SourceRegle } from './types'
import { cfgOf } from '../engine/gameData'
import type { GameConfig } from '../config/defaultConfig'
import type { EffetConstruction } from '../config/defaultConfig'

/** Slug d'identifiant stable depuis un nom affiché (les accents et
 *  espaces deviennent des tirets) : 'Poste de garde' → 'poste-de-garde'.
 *  L'id reste stable même si le nom affiché change (l'id est dérivé une
 *  fois et stocké dans le registre, jamais recalculé depuis l'UI).
 *  CLÉ = (nom, groupe) : 15 constructions existent en DOUBLE (version
 *  Ville ET Château du même bâtiment, effets identiques — ex. Poste de
 *  garde) ; le groupe distingue leurs règles. */
function slug(nom: string): string {
  return nom
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** Traduit les effets STRUCTURÉS d'une construction (marqueur (s),
 *  format { ressource, quantite, ete? }) en effets de la banque.
 *  Règles de traduction (identiques au moteur historique — retour
 *  Thibaut 2026-10-16 : le Tourisme est un FLUX NORMAL) :
 *   · 'Garnison' → garnisonVille (valeur d'état, instantanée) ;
 *   · le reste (Tourisme compris) → fluxVille (production par tour),
 *     canal été si `ete`. */
export function effetsConstructionVersBanque(effets: EffetConstruction[]): Effet[] {
  const out: Effet[] = []
  for (const e of effets) {
    if (e.ressource === 'Garnison') {
      out.push({ type: 'garnisonVille', valeur: e.quantite })
    } else if (e.ete) {
      out.push({ type: 'fluxVille', ressource: e.ressource, valeur: e.quantite, ete: true })
    } else {
      out.push({ type: 'fluxVille', ressource: e.ressource, valeur: e.quantite })
    }
  }
  return out
}

/** Construit les règles de banque de TOUTES les constructions du
 *  référentiel qui portent des effets structurés (bâtiments +
 *  aménagements). Les entrées sans `effets` (texte seul) ne sont PAS
 *  migrées : le moteur historique continue de les analyser. */
export function reglesConstructions(config?: GameConfig): RegleBanque[] {
  const C = cfgOf(config)
  const refs = C.config.constructions ?? []
  const out: RegleBanque[] = []
  for (const ref of refs) {
    if (!ref.effets || ref.effets.length === 0) continue
    const source: SourceRegle = ref.famille === 'Merveille'
      ? 'merveille'
      : ref.categorie === 'Aménagement' ? 'amenagement' : 'batiment'
    out.push({
      id: `${source}.${slug(ref.nom)}@${slug(ref.groupe)}`,
      source,
      nom: ref.nom,
      // Le groupe est porté par la règle (accès moteur par nom+groupe).
      groupe: ref.groupe,
      effets: effetsConstructionVersBanque(ref.effets),
    })
  }
  return out
}

/** Registre complet : toutes les règles migrées. Appelé par le moteur
 *  aux sites d'application (une fois par tour, cacheable). */
export function registreComplet(config?: GameConfig): RegleBanque[] {
  return [...reglesConstructions(config), ...reglesMinistres(), ...reglesRegimes(config), ...reglesCultures(config), ...reglesProgres(config)]
  // Les sources suivantes migrent une par une (dogmes, factions…) :
  //  […, ...reglesProgres(config), …]
}

// ── Ministères (source 'ministre' — portefeuilles automatiques) ──────────

/** Portefeuilles ministériels à effets AUTOMATIQUES de PRODUCTION.
 *  LA couche d'édition d'une règle ministérielle (retour Thibaut
 *  2026-10-19 : toute production passe par la banque — les montants
 *  sont des DONNÉES ici, plus aucun codage en dur du côté moteur).
 *  Cumulables : la valeur s'applique PAR MINISTRE porteur vivant
 *  (effet fluxJoueurParMinistre).
 *  · declencheur 'tour' : crédité à chaque fin de tour (canal
 *    « Ministères » du récap, étape 3duodecies) ;
 *  · declencheur 'finSaison' : crédité au changement de saison —
 *    production ÉQUIVALENTE PAR TOUR, comptée comme telle dans
 *    tourismeCourant (canal « Ministères ») ;
 *  · le Chancelier des émissaires (+1 émissaire en réserve par fin de
 *    saison) reste appliqué au site de fin de saison : instantané hors
 *    calcul de production, pas un flux. */
const MINISTERES_AUTO: RegleBanque[] = [
  {
    id: 'ministre.tresorier', source: 'ministre', nom: 'Trésorier',
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Trésorier', ressource: 'Or', valeur: 5 }],
  },
  {
    id: 'ministre.grand-precepteur', source: 'ministre', nom: 'Grand Précepteur',
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Grand Précepteur', ressource: 'Science', valeur: 1 }],
  },
  {
    id: 'ministre.grand-prevot', source: 'ministre', nom: 'Grand prévôt',
    // « Votre capitale produit +1 Fer par tour » (le 2e effet, +10
    // Garnison par rang, est une valeur d'état : garnisonHabitationVille).
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Grand prévôt', ressource: 'Fer', valeur: 1 }],
  },
  {
    id: 'ministre.senechal', source: 'ministre', nom: 'Sénéchal', declencheur: 'finSaison',
    // +15 Nourriture à la fin de l'ÉTÉ, par Sénéchal.
    conditions: { saison: 'Été' },
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Sénéchal', ressource: 'Nourriture', valeur: 15 }],
  },
  {
    id: 'ministre.maitre-de-cour', source: 'ministre', nom: 'Maître de cour', declencheur: 'finSaison',
    // +2 Tourisme à la fin de CHAQUE saison, par Maître de cour.
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Maître de cour', ressource: 'Tourisme', valeur: 2 }],
  },
  {
    id: 'ministre.legat-du-pontificat', source: 'ministre', nom: 'Légat du pontificat', declencheur: 'finSaison',
    // +20 Tourisme à la fin de CHAQUE saison, par Légat (interprétation
    //  retenue : récurrent — marqueur (y)).
    effets: [{ type: 'fluxJoueurParMinistre', portefeuille: 'Légat du pontificat', ressource: 'Tourisme', valeur: 20 }],
  },
]

/** Règles de banque des portefeuilles ministériels automatiques (les
 *  montants ne dépendent pas du référentiel : données éditoriales du
 *  registre, cf. MINISTERES_AUTO). */
export function reglesMinistres(): RegleBanque[] {
  return MINISTERES_AUTO.map((r) => ({ ...r, effets: [...r.effets] }))
}

// ── Régimes & cultures (sources 'regime' / 'culture' — brûlage #3 source 2/3) ──

/** Règles de banque des LOIS DE PRODUCTION des régimes politiques
 *  (retour Thibaut « toute production passe par la banque », source
 *  2/3 du brûlage #3, 2026-10-20) : générées depuis le référentiel,
 *  montants = DONNÉES. Aujourd'hui seule la loi nourrEteChampRiziere
 *  est un FLUX (Socialisme : +N Nourriture d'été par Champ/Rizière)
 *  — l'été est une CONDITION de la règle, plus un if du moteur. La
 *  garnison de l'Autoritarisme (garnisonParRang) reste une VALEUR
 *  D'ÉTAT (garnisonHabitationVille), pas une production : hors
 *  banque. */
export function reglesRegimes(config?: GameConfig): RegleBanque[] {
  const C = cfgOf(config)
  const out: RegleBanque[] = []
  for (const regime of C.regimes) {
    const n = regime.nourrEteChampRiziere ?? 0
    if (!n) continue
    out.push({
      id: 'regime.' + slug(regime.nom),
      source: 'regime',
      nom: regime.nom,
      conditions: { regime: regime.nom, saison: 'Été' },
      effets: [{ type: 'fluxParAmenagement', ressource: 'Nourriture', valeur: n, noms: ['Champ', 'Rizière'] }],
    })
  }
  return out
}

/** Règles de banque des RÈGLES DE PAYS des cultures (source 2/3 du
 *  brûlage #3, 2026-10-20) : +N d'une ressource PAR VILLE de cette
 *  culture dans le MONDE (tous joueurs confondus — ex. Lunisme :
 *  +4 Tourisme par ville lunisme). Les cultures sans loi chiffrée
 *  (ex. Déisme : scienceParConstruction est un instantané de
 *  construction) ne génèrent PAS de règle. */
export function reglesCultures(config?: GameConfig): RegleBanque[] {
  const C = cfgOf(config)
  const LOIS: Array<[string, 'capitalNourrParHabMonde' | 'capitalTourismeParHabMonde' | 'capitalOrParHabMonde']> = [
    ['Nourriture', 'capitalNourrParHabMonde'],
    ['Tourisme', 'capitalTourismeParHabMonde'],
    ['Or', 'capitalOrParHabMonde'],
  ]
  const out: RegleBanque[] = []
  for (const cult of C.config.cultures) {
    const effets: Effet[] = []
    for (const [res, champ] of LOIS) {
      const v = cult[champ] ?? 0
      if (v) effets.push({ type: 'fluxParVilleCultureMonde', ressource: res, valeur: v })
    }
    if (effets.length === 0) continue
    out.push({
      id: 'culture.' + slug(cult.nom),
      source: 'culture',
      nom: cult.nom,
      conditions: { culture: cult.nom },
      effets,
    })
  }
  return out
}

// ── Technologies de progrès (source 'tech' — brûlage #3 source 3/3) ──────

/** Clés de déblocage `<arbre>:<slot>` de TOUTES les techs portant ce
 *  NOM, tous arbres confondus (les homonymes matchent, comme
 *  l'historique aTech). SEULE vérité de la résolution nom → clés :
 *  la banque l'utilise pour la condition `techNom`, le moteur
 *  (aTech) l'utilise pour les réductions de coût et les garnisons. */
export function clesTechsParNom(config: GameConfig | undefined, nom: string): string[] {
  const C = cfgOf(config)
  const out: string[] = []
  const slots: Array<'a1' | 'a2' | 'b1' | 'b2' | 'c'> = ['a1', 'a2', 'b1', 'b2', 'c']
  C.config.progres.forEach((a, i) => {
    for (const slot of slots) {
      const t = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)[+slot[1] - 1]
      if (t?.nom === nom) out.push(`${i}:${slot}`)
    }
  })
  return out
}

/** FLUX par tour des technologies débloquées — la couche d'édition
 *  (source 3/3 du brûlage #3, 2026-10-20, principe Thibaut « TOUTE
 *  production passe par la banque ») : les montants qui vivaient
 *  codés en dur dans engine/progresAuto.ts deviennent des DONNÉES
 *  ici ; la condition `techNom` désigne la tech par nom (homonymes
 *  matchés comme l'historique aTech) et la banque interprète.
 *  Hors banque, en conscience :
 *   · gainDeblocageProgres = ONE-SHOT au déblocage (instantané) ;
 *   · reductions de coût + garnisons + plancher = valeurs d'état ;
 *   · Surconsommation consomme +10 Nourriture/rang : un COÛT
 *     (consommationsVille), pas une production. */
const PROGRES_FLUX: RegleBanque[] = [
  // ── canal historique « prodCapitale » (capitale requise) ──
  { id: 'tech.comprendre-la-soie', source: 'tech', nom: 'Comprendre la soie', conditions: { techNom: 'Comprendre la soie' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Science', valeur: 1 }] },
  { id: 'tech.technologies-futures-i', source: 'tech', nom: 'Technologies futures I', conditions: { techNom: 'Technologies futures I' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Science', valeur: 3 }] },
  { id: 'tech.etude-astronomique', source: 'tech', nom: 'Etude astronomique', conditions: { techNom: 'Etude astronomique' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Science', valeur: 1 }] },
  { id: 'tech.lumiere', source: 'tech', nom: 'Lumière', conditions: { techNom: 'Lumière' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Science', valeur: 1 }] },
  { id: 'tech.deforestation', source: 'tech', nom: 'Déforestation', conditions: { techNom: 'Déforestation' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Bois', valeur: 1 }] },
  { id: 'tech.carrieristes', source: 'tech', nom: 'Carrieristes', conditions: { techNom: 'Carrieristes' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Pierre', valeur: 1 }] },
  { id: 'tech.organisation-fiscale', source: 'tech', nom: 'Organisation fiscale', conditions: { techNom: 'Organisation fiscale' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Or', valeur: 2 }] },
  { id: 'tech.granges', source: 'tech', nom: 'Granges', conditions: { techNom: 'Granges' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Nourriture', valeur: 10 }] },
  { id: 'tech.usinage', source: 'tech', nom: 'Usinage', conditions: { techNom: 'Usinage' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Charbon', valeur: 1 }] },
  { id: 'tech.musees', source: 'tech', nom: 'Musées', conditions: { techNom: 'Musées' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Tourisme', valeur: 30 }] },
  { id: 'tech.hausse-du-loyer', source: 'tech', nom: 'Hausse du loyer', conditions: { techNom: 'Hausse du loyer' }, effets: [{ type: 'fluxSiCapitale', ressource: 'Or', valeur: 15 }] },
  // relations diplomatiques (Âge 1) : capitale ET cité suzeraine requise
  { id: 'tech.garde-suzeraine', source: 'tech', nom: 'Garde suzeraine', conditions: { techNom: 'Garde suzeraine', suzerainDeCite: true }, effets: [{ type: 'fluxSiCapitale', ressource: 'Nourriture', valeur: 12 }] },
  { id: 'tech.patronage', source: 'tech', nom: 'Patronage', conditions: { techNom: 'Patronage', suzerainDeCite: true }, effets: [{ type: 'fluxSiCapitale', ressource: 'Science', valeur: 1 }] },
  // ── canal historique « par habitation » (par ville) ──
  { id: 'tech.assemblees-scientifiques', source: 'tech', nom: 'Assemblées scientifiques', conditions: { techNom: 'Assemblées scientifiques' }, effets: [{ type: 'fluxParVille', ressource: 'Science', valeur: 1 }] },
  { id: 'tech.technologies-futures-ii', source: 'tech', nom: 'Technologies futures II', conditions: { techNom: 'Technologies futures II' }, effets: [{ type: 'fluxParVille', ressource: 'Science', valeur: 1 }] },
  // ── canal historique « côtier » (villes à proximité de la Mer) ──
  { id: 'tech.cours-de-peche', source: 'tech', nom: 'Cours de pêche', conditions: { techNom: 'Cours de pêche' }, effets: [{ type: 'fluxParVilleProximite', ressource: 'Nourriture', valeur: 4, proximite: 'Mer' }] },
  { id: 'tech.commerce-maritime-i', source: 'tech', nom: 'Commerce maritime I', conditions: { techNom: 'Commerce maritime I' }, effets: [{ type: 'fluxParVilleProximite', ressource: 'Or', valeur: 2, proximite: 'Mer' }] },
  { id: 'tech.peche-de-culture', source: 'tech', nom: 'Pêche de culture', conditions: { techNom: 'Pêche de culture' }, effets: [{ type: 'fluxParVilleProximite', ressource: 'Nourriture', valeur: 3, proximite: 'Mer' }] },
  // ── par RANG d'habitation (production ; la consommation de
  //    Nourriture de Surconsommation reste un coût au moteur) ──
  { id: 'tech.surconsommation', source: 'tech', nom: 'Surconsommation', conditions: { techNom: 'Surconsommation' }, effets: [
    { type: 'fluxParRangHabitation', ressource: 'Science', valeur: 1 },
    { type: 'fluxParRangHabitation', ressource: 'Tourisme', valeur: 5 },
  ] },
  // ── par AMÉNAGEMENT ──
  { id: 'tech.engrais-naturels-i', source: 'tech', nom: 'Engrais naturels I', conditions: { techNom: 'Engrais naturels I' }, effets: [{ type: 'fluxParAmenagement', ressource: 'Nourriture', valeur: 2, noms: ['Champ', 'Rizière'] }] },
  { id: 'tech.engrais-naturels-ii', source: 'tech', nom: 'Engrais naturels II', conditions: { techNom: 'Engrais naturels II' }, effets: [{ type: 'fluxParAmenagement', ressource: 'Nourriture', valeur: 3, noms: ['Champ', 'Rizière'] }] },
  { id: 'tech.charues', source: 'tech', nom: 'Charues', conditions: { techNom: 'Charues' }, effets: [
    { type: 'fluxParAmenagement', ressource: 'Nourriture', valeur: 5, noms: ['Champ', 'Rizière'] },
    { type: 'fluxParAmenagement', ressource: 'Or', valeur: 1, noms: ['Champ', 'Rizière'] },
  ] },
  { id: 'tech.exploitation-forestiere', source: 'tech', nom: 'Exploitation forestière', conditions: { techNom: 'Exploitation forestière' }, effets: [
    // les Scieries produisent du Charbon AU LIEU du Bois : −1 Bois +1 Charbon
    { type: 'fluxParAmenagement', ressource: 'Bois', valeur: -1, noms: ['Scierie'] },
    { type: 'fluxParAmenagement', ressource: 'Charbon', valeur: 1, noms: ['Scierie'] },
  ] },
  { id: 'tech.stands-de-goodies', source: 'tech', nom: 'Stands de goodies', conditions: { techNom: 'Stands de goodies' }, effets: [
    { type: 'fluxParAmenagement', ressource: 'Or', valeur: 2, noms: ['Foire'] },
    { type: 'fluxParAmenagement', ressource: 'Tourisme', valeur: 2, noms: ['Foire'] },
  ] },
  { id: 'tech.fascination-culturelle', source: 'tech', nom: 'Fascination culturelle', conditions: { techNom: 'Fascination culturelle' }, effets: [{ type: 'fluxParAmenagement', ressource: 'Tourisme', valeur: 2, noms: ['Foire'] }] },
  { id: 'tech.parcs-naturels', source: 'tech', nom: 'Parcs naturels', conditions: { techNom: 'Parcs naturels' }, effets: [{ type: 'fluxParAmenagement', ressource: 'Tourisme', valeur: 8, noms: ['site archéologique', 'Site archéologique'] }] },
  // ── par BÂTIMENT ──
  { id: 'tech.industrialisation', source: 'tech', nom: 'Industrialisation', conditions: { techNom: 'Industrialisation' }, effets: [{ type: 'fluxParBatiment', ressource: 'Charbon', valeur: 1 }] },
  { id: 'tech.merveilles-naturelles', source: 'tech', nom: 'Merveilles naturelles', conditions: { techNom: 'Merveilles naturelles' }, effets: [{ type: 'fluxParBatiment', ressource: 'Tourisme', valeur: 10, famille: 'Merveille' }] },
  { id: 'tech.merveilleux', source: 'tech', nom: 'Merveilleux', conditions: { techNom: 'Merveilleux' }, effets: [{ type: 'fluxParBatiment', ressource: 'Science', valeur: 1, famille: 'Merveille' }] },
  // ── proportional à la garnison d'habitants ──
  { id: 'tech.service-militaire-avance', source: 'tech', nom: 'Service militaire avancé', conditions: { techNom: 'Service militaire avancé' }, effets: [{ type: 'fluxParGarnisonHabitation', ressource: 'Habitants', valeur: 0.5 }] },
]

/** Règles de banque des FLUX des technologies débloquées (source 3/3
 *  du brûlage #3, 2026-10-20) : table éditoriale PROGRES_FLUX (les
 *  montants sont des DONNÉES — plus aucun codage moteur) + les
 *  génériques `prodParTitre` du référentiel traduits en
 *  fluxParTitre (montants déjà DONNÉES du côté référentiel,
 *  conditions par clé `<arbre>:<slot>` pour préserver
 *  l'application par arbre de l'historique). */
export function reglesProgres(config?: GameConfig): RegleBanque[] {
  const C = cfgOf(config)
  const out: RegleBanque[] = PROGRES_FLUX.map((r) => ({ ...r, effets: [...r.effets] }))
  // Génériques prodParTitre du référentiel (+N ressource par
  //  TITULAIRE vivant — ex. Commerce lointain : +3 Or par Marchand).
  const techs: Array<{ nom: string; cle: string; effets?: Array<{ type?: string; montant?: number; ressource?: string; titre?: string }> | undefined }> = []
  C.config.progres.forEach((a, i) => {
    ;(a.brancheA ?? []).forEach((t, j) => techs.push({ nom: t.nom, cle: `${i}:a${j + 1}`, effets: t.effets }))
    ;(a.brancheB ?? []).forEach((t, j) => techs.push({ nom: t.nom, cle: `${i}:b${j + 1}`, effets: t.effets }))
    techs.push({ nom: a.techC.nom, cle: `${i}:c`, effets: a.techC.effets })
  })
  for (const t of techs) {
    const effets = (t.effets ?? [])
      .filter((e) => e.type === 'prodParTitre' && !!e.titre && !!e.montant && !!e.ressource)
      .map((e): Effet => ({ type: 'fluxParTitre', ressource: e.ressource!, valeur: e.montant!, titre: e.titre! }))
    if (effets.length === 0) continue
    out.push({
      id: 'tech.' + slug(t.nom) + '-' + t.cle,
      source: 'tech',
      nom: t.nom,
      conditions: { tech: t.cle },
      effets,
    })
  }
  return out
}

/** Cache du registre par référence de config (les règles ne dépendent
 *  que du référentiel — recalculées seulement si la config change). */
let cacheRegles: { config: object; regles: RegleBanque[]; parCle: Map<string, RegleBanque> } | null = null

/** Clé d'accès d'une règle de construction : nom + groupe (les
 *  constructions doublées Ville/Château portent le même nom). */
function cleConstruction(nom: string, groupe?: string): string {
  return `${nom}|${groupe ?? ''}`
}

/** Règle de banque d'une construction PAR (nom, groupe) — accès moteur.
 *  Retourne undefined si la construction n'a pas d'effets structurés
 *  (repli texte du moteur historique). */
export function reglePourConstruction(ref: { nom: string; groupe?: string }, config?: GameConfig): RegleBanque | undefined {
  const cfg = config ?? undefined
  if (!cacheRegles || cacheRegles.config !== (cfg as object)) {
    const regles = reglesConstructions(cfg)
    cacheRegles = {
      config: cfg as object,
      regles,
      parCle: new Map(regles.map((r) => [cleConstruction(r.nom, r.groupe), r])),
    }
  }
  return cacheRegles.parCle.get(cleConstruction(ref.nom, ref.groupe))
}

/** Contexte LECTURE SEULE pour évaluer les effets d'une construction
 *  hors partie (récapitulatifs, coûts, UI). Les effets des
 *  constructions sont inconditionnels : aucune condition (peuple,
 *  saison…) ne s'applique à cette source — le contexte factice ne
 *  fausse donc rien. Les types sont relâchés (unknown) car la
 *  production d'une ville ne dépend d'aucun champ du contexte. */
export function contexteLectureSeule(): ContexteEffet {
  return {
    state: {} as never,
    joueur: {} as never,
    saison: '',
  } as ContexteEffet
}
