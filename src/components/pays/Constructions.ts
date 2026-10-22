// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » — LOGIQUE DE CONSTRUCTION (extrait du monolithe
//  PlayerView.tsx, un fichier par UI) :
//   · faireConstruire : le mutateur « construire » (bâtiment /
//     aménagement) — garde-fous des règles (faction, capitale, type
//     Ville/Château, limites par famille, rang minimum, prérequis,
//     merveilles), réductions (technologies, Basiléens, Sylvains),
//     coût débité, règle de culture, recalcule du Tourisme, effet
//     one-shot des merveilles, déclenchement du Surintendant ;
//   · vague 3c : les aménagements de tier 2/3 (rangMinHabitation +
//     remplaceAmenagement) REMPLACENT une instance du tier inférieur
//     (amélioration, pas construction en plus) ;
//   · faireBatParFamille : les catégories du sélecteur « + Construire »
//     d'une ville (familles × rangs, merveilles par rang, alertes
//     rouges des limites — marqueur (y)).
//  Fonctions pures de fabrique : PlayerView/VilleCarte fournit l'état,
//  ces fabriques referment les closures.
// ══════════════════════════════════════════════════════════════════════

import type { City, GameState, Player } from '../../engine/types'
import {
  effetsTourBatiment, coutBatiment,
  coutAmenagement, constructionRef, prerequisConstruction, detailGainsVille,
  parseCoutTexte, resumeConstruction,
  rangNiveau, batimentsConstructionsRefs, batimentsCapitale,
  capitaleDe, aMinistre,
} from '../../engine/engine'
import { cultureDef, type Cfg } from '../../engine/gameData'
import { statutMerveille, pastilleClass } from '../../engine/statutAuto'
import { villeCotiere } from '../../engine/villes'
import { effetImmediatMerveille } from '../../engine/merveilles'
import { reductionAmenagement, reductionBatiment, aTech } from '../../engine/progresAuto'
import { resynchroniserTourisme } from '../../engine/regimes'
import { fmt } from '../ui'
import type { PickerCategorie } from '../Picker'
import { FAM_BADGES, fmtCout, type ChoixSurintendant } from './pays-utils'

/** Fabrique le mutateur « construire » d'un joueur. */
export function faireConstruire(o: {
  update: (m: (s: GameState) => void) => void
  joueur: number
  C: Cfg
  setSurint: (v: ChoixSurintendant | null) => void
  setSurintRes: (v: string) => void
}) {
  const { update, joueur, C, setSurint, setSurintRes } = o
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement', groupe?: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      // Marqueur (a) : garde-fou — une ancienne sauvegarde peut avoir
      //  une ville sans tableau batiments/aménagements.
      if (!ville.batiments) ville.batiments = []
      if (!ville.amenagements) ville.amenagements = []
      // ── Restrictions des catégories de bâtiments ────────────────────
      // · bâtiment de faction : uniquement ceux du peuple du joueur ;
      // · bâtiment de capitale (groupe « Capitale ») : capitale uniquement.
      // Vague 3c : la ref est résolue pour les DEUX types — les
      //  aménagements de tier 2/3 portent rangMinHabitation et
      //  remplaceAmenagement (les garde-fous « groupe/famille »
      //  ci-dessous restent sans effet sur eux : groupe « Terrain »,
      //  famille vide).
      const ref = constructionRef(nom, C.config)
      const estCapitale = capitaleDe(t)?.nom === ville.nom
      if (ref && ref.groupe === 'Capitale' && !estCapitale) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} se construit normalement dans la capitale (${capitaleDe(t)?.nom ?? '—'}) — ici il est hors zone (construction quand même enregistrée).`,
        })
      }

      // Retour Thibaut 2026-10-15 : un bâtiment du groupe Ville ne se
      //  construit que dans une VILLE, du groupe Château que dans un
      //  CHÂTEAU (la vue filtre, ce garde-fou couvre les états
      //  importés/rebasés).
      if (ref && (ref.groupe === 'Ville' || ref.groupe === 'Château') && (ref.famille ?? '') !== 'Merveille') {
        const typeVilleActuel = (ville.type ?? 'Ville').toLowerCase()
        if (ref.groupe.toLowerCase() !== typeVilleActuel) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} est un bâtiment de ${ref.groupe} — il se construit normalement dans ce type d'habitation, pas dans ${ville.nom} (${ville.type ?? 'Ville'}). Construction quand même enregistrée.`,
          })
        }
      }

      // ── Limites de construction par FAMILLE (règles du classeur,
      //  retour Thibaut 2026-10-15) :
      //  · Militaire : aucune limite ;
      //  · Économique : 1 par RANG de la ville ;
      //  · Guilde : 1 par ville ;
      //  · Capitale : uniquement dans la capitale (géré ci-dessus) ;
      //  · MERVEILLE : rang d'habitation minimum requis + UNE seule
      //    par ville.
      const fam = ref?.famille ?? ''
      if (fam === 'Economique') {
        // « Urbanisme » : la capitale accueille un bâtiment
        //  supplémentaire (+1 slot économique de la capitale).
        //  (RETRAIT 2026-10-19 : bonus Elfes d'Or « Cité d'Or » /
        //  « Palais des Dieux » retirés avec les factions.)
        const bonusCapitale = (aTech(t, 'Urbanisme', C) ? 1 : 0)
        const maxEco = rangNiveau(ville, C) + (estCapitale ? bonusCapitale : 0)
        const nbEco = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Economique').length
        if (nbEco >= maxEco) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} dépasse la limite d'un bâtiment Économique par rang (${nbEco}/${maxEco}). Construction quand même enregistrée.`,
          })
        }
      }
      if (fam === 'Guilde') {
        // Maitre des guildes (ministre, revue 2026-10-15) : la CAPITALE
        //  peut accueillir une Guilde supplementaire (limite 2).
        const maxGuildes = estCapitale && aMinistre(s, t, 'Maître des guildes') ? 2 : 1
        const nbGui = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Guilde').length
        if (nbGui >= maxGuildes) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} dépasse la limite de ${maxGuildes} Guilde(s)${maxGuildes > 1 ? ' (Maître des guildes)' : ''}. Construction quand même enregistrée.`,
          })
        }
      }
      // Rang d'habitation requis (retour Thibaut 2026-10-15) : un
      //  bâtiment du rang N ne se construit pas dans une habitation de
      //  rang inférieur (vérifie Militaire, Économique, Guilde ET
      //  Merveilles — la vue filtre déjà, ce garde-fou couvre les
      //  états importés/rebasés).
      if (ref && ref.rangMinHabitation && rangNiveau(ville, C) < ref.rangMinHabitation) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} exige normalement une habitation de rang ${ref.rangMinHabitation} minimum (${ville.nom} est de rang ${rangNiveau(ville, C)}). Construction quand même enregistrée.`,
        })
      }
      // Ponton (vague 3b, arbitrage Thibaut 2026-10-22) : bâtiment
      //  CÔTIER — proximité Rivière ou Mer requise (garde-fou non
      //  bloquant, même calibre que le rang d'habitation : le moteur
      //  ignore de toute façon ses effets hors proximité).
      if (nom === 'Ponton' && !villeCotiere(ville)) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ Ponton exige normalement une ville côtière (proximité Rivière ou Mer — ${ville.nom} est en Plaine). Construction quand même enregistrée, mais le bâtiment n'y a aucun effet.`,
        })
      }
      // Prérequis de construction (revue 2026-10-16) : « X requis » dans
      //  le coût du référentiel (Caserne ← Poste de garde, Etable ←
      //  Grange…) — le prérequis doit être présent dans la MÊME ville.
      if (type === 'batiment') {
        const pre = prerequisConstruction(ref)
        if (pre && !ville.batiments.includes(pre)) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} exige normalement d'abord « ${pre} » dans ${ville.nom} (prérequis). Construction quand même enregistrée.`,
          })
        }
      }
      if (fam === 'Merveille') {
        const rangRequis = ref?.rangMinHabitation ?? 1
        if (rangNiveau(ville, C) < rangRequis) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : cette merveille exige normalement une habitation de rang ${rangRequis} minimum (${ville.nom} est de rang ${rangNiveau(ville, C)}). Construction quand même enregistrée.`,
          })
        }
        const nbMerv = ville.batiments.filter((b) => (constructionRef(b, C.config)?.famille ?? '') === 'Merveille').length
        if (nbMerv >= 1) {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} : ${ville.nom} possède déjà ${nbMerv} merveille(s) — la règle en prévoit une seule par ville. Construction quand même enregistrée.`,
          })
        }
      }
      const cout = type === 'batiment'
        ? coutBatiment(nom, C, groupe)
        : coutAmenagement(t, C.config, type === 'amenagement' ? nom : undefined)
      // Réductions des TECHNOLOGIES (revue 2026-10-15) :
      //  · Développement durable : aménagements −1 Bois ;
      //  · Développement économe : aménagements −3 Or ;
      //  · Viser le ciel : bâtiments −15 Or.
      if (type === 'amenagement') {
        for (const [r, v] of Object.entries(reductionAmenagement(t, C))) {
          if (cout[r] !== undefined) cout[r] = Math.max(0, cout[r] - v)
        }
      }
      if (type === 'batiment') {
        for (const [r, v] of Object.entries(reductionBatiment(t, C))) {
          if (cout[r] !== undefined) cout[r] = Math.max(0, cout[r] - v)
        }
      }
      // Merveilles & progrès « Tourisme » (retour Thibaut 2026-10-15) :
      //  a.1 Trésor public : merveilles −20 Or ; a.2 Matériaux de
      //  prestige : merveilles −4 de CHAQUE ressource du coût
      //  (plancher 0). Techs débloquées du joueur, cumulables.
      if (ref?.famille === 'Merveille') {
        // Exposition universelle (ouverture culturelle) : merveilles de
        //  la CAPITALE −30 Or de plus.
        if (estCapitale && aTech(t, 'Exposition universelle', C) && cout['Or'] !== undefined) {
          cout['Or'] = Math.max(0, cout['Or'] - 30)
        }
        const debloquees = new Set(t.progresDebloques ?? [])
        const possede = (nomTech: string) => {
          for (let ai = 0; ai < C.config.progres.length; ai++) {
            const a = C.config.progres[ai]
            if (a.nom !== 'Progrès du Tourisme') continue
            for (const slot of ['a1', 'a2', 'b1', 'b2', 'c'] as const) {
              const td = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)[+slot[1] - 1]
              if (td?.nom === nomTech && debloquees.has(`${ai}:${slot}`)) return true
            }
          }
          return false
        }
        let reducOr = 0
        let reducParRessource = 0
        if (possede('Trésor public')) reducOr += 20
        if (possede('Matériaux de prestige')) reducParRessource += 4
        if (reducOr > 0 && cout['Or'] !== undefined) cout['Or'] = Math.max(0, cout['Or'] - reducOr)
        if (reducParRessource > 0) {
          for (const r of Object.keys(cout)) cout[r] = Math.max(0, cout[r] - reducParRessource)
        }
      }
      const cible = type === 'batiment'
        ? ville.batiments
        : (ville.amenagements ?? (ville.amenagements = []))
      // Un même BÂTIMENT ne se construit pas deux fois dans une ville ;
      //  en revanche un AMÉNAGEMENT peut être présent PLUSIEURS FOIS
      //  (plusieurs cases du même terrain, ex. 2 Champs) — chaque
      //  exemplaire produit ses effets (retour Thibaut 2026-10-14).
      // Revue 2026-10-16 : plus JAMAIS de blocage silencieux — le
      //  doublon s'annonce (le joueur peut vouloir dépasser les
      //  limites du référentiel en connaissance de cause).
      if (type === 'batiment' && cible.includes(nom)) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `⚠ ${nom} figure déjà à ${ville.nom} (le référentiel prévoit un seul exemplaire par ville). Construction quand même enregistrée.`,
        })
      }
      // (RETRAIT 2026-10-19 : le remplacement des bâtiments de faction —
      //  Église → Grande Cathédrale → Palais du Palatinat — a été retiré
      //  avec le système de faction.)
      // ── Améliorations d'aménagements (vague 3c, arbitrage Thibaut
      //  2026-10-22) : « Baleinier (tier 2) » / « (tier 3) » REMPLACENT
      //  une instance du tier inférieur dans la ville (le tier inférieur
      //  est un prérequis ; un même terrain peut être aménagé PLUSIEURS
      //  FOIS, chaque action n'améliore qu'UN exemplaire). Garde-fou non
      //  bloquant, même calibre que le rang d'habitation : tier inférieur
      //  absent → ⚠ + amélioration quand même enregistrée (poussée).
      let amelioreDe = ''
      if (type === 'amenagement' && ref?.remplaceAmenagement) {
        const base = ref.remplaceAmenagement
        const iBase = cible.indexOf(base)
        if (iBase >= 0) {
          cible[iBase] = nom
          amelioreDe = base
        } else {
          s.log.push({
            turn: s.turn, type: 'Système', joueur: t.n,
            texte: `⚠ ${nom} améliore normalement d'abord un « ${base} » — aucun exemplaire à ${ville.nom}. Amélioration quand même enregistrée.`,
          })
        }
      }
      if (!amelioreDe) cible.push(nom)
      const parts: string[] = []
      for (const [res, v] of Object.entries(cout)) {
        const rs = t.resources[res]
        if (rs) rs.stock -= v
        if (v > 0) parts.push(`${fmt(v)} ${res}`)
      }
      // Règle de culture : ex. Déisme — +N Science par bâtiment construit
      // (champ paramétrable, onglets « Cultures & régimes »).
      const sci = type === 'batiment' ? (cultureDef(t.culture, C.config)?.scienceParConstruction ?? 0) : 0
      if (sci > 0) {
        const rsSci = t.resources['Science']
        if (rsSci) rsSci.stock += sci
      }
      // Tourisme (retour Thibaut 2026-10-16) : la construction monte
      //  la production Tourisme ; le stock est RECALCULÉ =
      //  production courante (jamais cumulé).
      resynchroniserTourisme(s, t, `${nom} construit(e) à ${ville.nom}`)
      // Merveille : effet one-shot à la construction (Antichambre
      //  +50 % Or, Jardins +40 Habitants, Palais conversions…).
      // Effets one-shot à la construction : MERVEILLES + Guilde des
      //  diplomates (+2 émissaires, retour Thibaut 2026-10-15).
      const mervTxt = ((ref?.famille ?? '') === 'Merveille' || nom === 'Guilde des diplomates')
        ? effetImmediatMerveille(s, t, nom) : ''
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🏗 ${amelioreDe ? `${amelioreDe} amélioré(e) en ${nom}` : `${nom} construit(e)`} à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}${sci > 0 ? ` — règle de culture : +${fmt(sci)} Science` : ''}${mervTxt}.`,
      })
      // Surintendant des finances (marqueur (y)) : « Après avoir
      //  construit un bâtiment, générez 1 Ressource de votre choix
      //  produite par l'habitation par rang de l'habitation » — on
      //  ouvre une carte de choix (ressources produites par les
      //  habitants + bâtiments de la ville, nouveau bâtiment inclus).
      if (type === 'batiment' && aMinistre(s, t, 'Surintendant des finances')) {
        const prodVille = new Set<string>()
        for (const r of Object.keys(detailGainsVille(s, t, ville, C).metiers)) prodVille.add(r)
        for (const r of Object.keys(effetsTourBatiment(nom, C))) prodVille.add(r)
        const options = [...prodVille].filter((r) => t.resources[r] !== undefined)
        const qty = rangNiveau(ville, C)
        if (options.length > 0 && qty > 0) {
          setSurint({ idx, options, qty })
          setSurintRes(options[0])
        }
      }
    })
  return construire
}

/** Fabrique les catégories du sélecteur « + Construire » d'une ville
 *  (marqueur (y) : un bouton par famille, une catégorie par rang). */
export function faireBatParFamille(o: { state: GameState; p: Player; C: Cfg }): (ville: City) => PickerCategorie[] {
  const { state, p, C } = o
  const batRefs = batimentsConstructionsRefs(C)
  // Bâtiments de capitale du référentiel (catégorie « Capitale » des
  //  cadres ville). (RETRAIT 2026-10-19, retour arbitre : les bâtiments
  //  de faction ont été retirés avec le système de faction.)
  const refsBatCapitale = batimentsCapitale(C)
  const nomCapitale = capitaleDe(p)?.nom ?? ''
  /** Catégories de construction d'UNE ville par TYPE de bâtiment
   *  (marqueur (y), retour Thibaut : « peut-être même un bouton par
   *  type de bâtiment ») — arbitrage : les 4 FAMILLES du référentiel
   *  (Militaire, Economique, Guilde, Capitale). Contenu :
   *  bâtiments de ville / château hors faction, bâtiments de FACTION
   *  du peuple du joueur (ceux de capitale uniquement dans la
   *  capitale), bâtiments de CAPITALE pour la capitale uniquement.
   *  Chaque carte montre le coût ET la description du classeur. */
  /** Bâtiments constructibles pour UNE ville (retour Thibaut
   *  2026-10-15) : seuls les bâtiments du TYPE de la ville (Ville ou
   *  Château) s'affichent, et les MERVEILLES sont filtrées par le rang
   *  d'habitation disponible — avec une catégorie SÉPARÉE par rang
   *  (séparation visuelle nette). */
  const batParFamillePour = (ville: City): PickerCategorie[] => {
    const type = (ville.type ?? 'Ville').toLowerCase()
    const estCapitale = ville.nom === nomCapitale
    const rang = rangNiveau(ville, C)
    // Alerte rouge d'une construction (revue 2026-10-16 : les limites
    //  s'INDIQUENT en rouge dans le picker, elles ne bloquent jamais).
    const alertePour = (b: { nom: string; famille?: string; cout: string }): string => {
      const warns: string[] = []
      if (ville.batiments.includes(b.nom)) warns.push('Déjà construit dans cette ville (le référentiel prévoit un seul exemplaire).')
      const pre = prerequisConstruction(b)
      if (pre && !ville.batiments.includes(pre)) warns.push(`Prérequis manquant : ${pre}.`)
      const fam = b.famille ?? ''
      if (fam === 'Economique') {
        const nbEco = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Economique').length
        const bonusCap = (aTech(p, 'Urbanisme', C) ? 1 : 0)
        const maxEco = rang + (estCapitale ? bonusCap : 0)
        if (nbEco >= maxEco) warns.push(`Limite Économique atteinte (${nbEco}/${maxEco} — un par rang).`)
      }
      if (fam === 'Guilde') {
        const nbGui = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Guilde').length
        const maxGui = estCapitale && aMinistre(state, p, 'Maître des guildes') ? 2 : 1
        if (nbGui >= maxGui) warns.push(`Limite Guilde atteinte (${nbGui}/${maxGui} par ville).`)
      }
      if (fam === 'Merveille') {
        const nbMerv = ville.batiments.filter((x) => (constructionRef(x, C.config)?.famille ?? '') === 'Merveille').length
        if (nbMerv >= 1) warns.push(`${nbMerv} merveille(s) déjà présentes (une seule par ville).`)
      }
      return warns.join(' ')
    }
    // Les bâtiments de CAPITALE sont ajoutés explicitement plus bas (une
    //  seule fois) — okGroupe les EXCLUT pour éviter le doublon.
    const okGroupe = (b: { groupe: string; famille?: string }) =>
      b.groupe === 'Capitale' ? false
      // Les MERVEILLES se construisent dans les DEUX types d'habitation
      //  (Ville et Château) — leur description dit « Habitation rang
      //  1+/2+/3 » sans distinction de type.
      : (b.famille ?? '') === 'Merveille' ? true
      : b.groupe.toLowerCase() === type
    const eligibles = [
      ...batRefs.filter((b) => okGroupe(b)).map((b) => ({ b, groupe: b.groupe })),
      ...(estCapitale ? refsBatCapitale.map((b) => ({ b, groupe: 'Capitale' })) : []),
    ]
    // Merveilles du groupe de la ville, triées par rang croissant —
    //  une catégorie par rang DISPONIBLE (les rangs supérieurs au
    //  rang de la ville sont masqués).
    const merveilles = batRefs
      .filter((b) => okGroupe(b) && (b.famille ?? '') === 'Merveille')
      .filter((b) => (b.rangMinHabitation ?? 1) <= rang)
      .sort((a, z) => (a.rangMinHabitation ?? 1) - (z.rangMinHabitation ?? 1))
    const merveillesParRang = new Map<number, typeof merveilles>()
    for (const m of merveilles) {
      const r = m.rangMinHabitation ?? 1
      if (!merveillesParRang.has(r)) merveillesParRang.set(r, [])
      merveillesParRang.get(r)!.push(m)
    }
    // Retour Thibaut 2026-10-15 : séparation par RANG D'HABITATION pour
    //  Militaire / Économique / Guilde — une catégorie par famille et
    //  par rang DISPONIBLE (les bâtiments de rang supérieur au rang de
    //  la ville sont masqués). Capitale reste par famille.
    const out: PickerCategorie[] = []
    const famillesRangees: Array<[string, string]> = [
      ['Militaire', 'Militaire'],
      ['Economique', 'Économique'],
      ['Guilde', 'Guilde'],
    ]
    for (const [fam, label] of famillesRangees) {
      // regrouper les bâtiments de la famille par rang
      const parRang = new Map<number, typeof eligibles>()
      for (const item of eligibles) {
        if ((item.b.famille ?? '') !== fam) continue
        const r = item.b.rangMinHabitation ?? 1
        if (r > rang) continue // rang non disponible → masqué
        if (!parRang.has(r)) parRang.set(r, [])
        parRang.get(r)!.push(item)
      }
      for (const [r, items] of [...parRang.entries()].sort((a, z) => a[0] - z[0])) {
        out.push({
          label: `${label} · rang ${r}${r > 1 ? '+' : ''}`,
          options: items.map(({ b, groupe }) => ({
            value: `${groupe}|${b.nom}`,
            metier: b.nom,
            droite: fmtCout(parseCoutTexte(b.cout)),
            alerte: alertePour(b) || undefined,
            description: [
              prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
              resumeConstruction(b) || b.production || '',
              b.description,
            ].filter(Boolean).join('\n'),
            badge: FAM_BADGES[fam] ?? 'badge-info',
          })),
        })
      }
    }
    // Capitale : une catégorie par famille (sans rang)
    for (const [fam, label] of [['Capitale', 'Capitale']] as const) {
      const options = eligibles
        .filter(({ b }) => (b.famille ?? '') === fam)
        .map(({ b, groupe }) => ({
          value: `${groupe}|${b.nom}`,
          metier: b.nom,
          droite: fmtCout(parseCoutTexte(b.cout)),
          alerte: alertePour(b) || undefined,
          description: [
            prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
            resumeConstruction(b) || b.production || '',
            b.description,
          ].filter(Boolean).join('\n'),
          badge: FAM_BADGES[fam] ?? 'badge-info',
        }))
      if (options.length > 0) out.push({ label, options })
    }
    // Une catégorie de merveilles PAR RANG (séparation visuelle) :
    //  « Merveilles · rang 1 », « Merveilles · rang 2 »…
    for (const [r, ms] of merveillesParRang) {
      out.push({
        label: `Merveilles · rang ${r}${r > 1 ? '+' : ''}`,
        options: ms.map((b) => ({
          value: `${b.groupe}|${b.nom}`,
          metier: b.nom,
          badge: pastilleClass(statutMerveille(b.nom)),
          droite: fmtCout(parseCoutTexte(b.cout)),
          alerte: alertePour(b) || undefined,
          description: [
            prerequisConstruction(b) ? `Prérequis : ${prerequisConstruction(b)} dans cette ville.` : '',
            resumeConstruction(b) || b.production || '',
            b.description,
          ].filter(Boolean).join('\n'),
        })),
      })
    }
    return out
  }
  return batParFamillePour
}
