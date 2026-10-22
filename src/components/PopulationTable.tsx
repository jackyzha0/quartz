// ══════════════════════════════════════════════════════════════════════
//  Table de population : récapitulatif des métiers (royaume puis par
//  ville), ajout manuel d'habitants (roturiers ou nouvelle famille
//  noble, culture pondérée par celles présentes dans la ville),
//  filtres, tri, édition des métiers — seuls les métiers accessibles.
//  Vague 2 UI (rework habitants 2026-10-20) : colonne Domicile (vague 3 :
//  bâtiments de logement — null = « — » pour l'instant) et écran
//  « Métiers et places par ville » (en poste / cap / places libres,
//  helper moteur occupationsMetierVille).
//  sont proposés (Chasseur, Gouverneur, métiers Education enseignés
//  par un Professeur vivant) — et arbre généalogique de la famille
//  dirigeante (déplacé ici depuis la page Royaume).
//  Retour Thibaut (2026-10-14) : la population est séparée en deux
//  tableaux — « La cour » (tous les nobles du joueur, affichés
//  AU-DESSUS) et la population « classique ». Chaque personnage peut
//  être DONNÉ à un autre joueur ; deux nobles peuvent être MARIÉS
//  manuellement (y compris de joueurs différents — ex. la fille du
//  joueur 1 avec le fils du joueur 2).
//  Retour Thibaut (2026-10-14, suite) : la section Population affiche
//  AUSSI les CITÉS LIBRES comme des onglets « comme si c'étaient des
//  joueurs » (joueur négatif = index de la cité) — mêmes tableaux
//  « La cour » / « Population », ajout de roturiers ou de familles
//  nobles, métiers, dons et mariages. Seules différences : pas de
//  Ministres ni d'arbre dynastique, et le STATUT reste éditable
//  (les cités libres ne passent pas au moteur démographique).
// ══════════════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react'
import { useGame } from '../state/store'
import type { Character, CiteLibre, GameState } from '../engine/types'
import { cfgOf } from '../engine/gameData'
import { validateMetierAssignment } from '../engine/validation'
import { ajouterHabitant } from '../engine/setup'
import {
  metiersAccessibles, changerPortefeuille, isNobleDyn, fullName,
  marierPersonnages, deplacerPersonnage, toutesLesPopulations,
  metiersAccessiblesCite, pseudoJoueurDeCite, occupationsMetierVille,
  ajouterHabitantsCiteLibre, ajouterFamilleNobleCiteLibre,
  type Detenteur,
} from '../engine/engine'
import { GenealogyTree } from './GenealogyTree'
import { Card, Select, TextInput, Button, NumberInput, fmt } from './ui'
import { ChoicePicker } from './Picker'
import { traitDef } from '../engine/gameData'
import { statutMinistre, pastilleClass } from '../engine/statutAuto'
import { resynchroniserTourisme } from '../engine/regimes'

type SortKey = 'nom' | 'age' | 'dynastie' | 'ville' | 'metier' | 'statut'

const STATUTS: Character['statut'][] = ['Sain', 'Malade', 'Décédé']

/** « clé : n » trié par valeur décroissante — carte « Récap du
 *  dernier tour », déplacée de la page Pays vers l'onglet Population
 *  (retour Thibaut 2026-10-14). */
function dictToString(dict: Record<string, number>): string {
  const entries = Object.entries(dict).sort((a, b) => b[1] - a[1])
  if (entries.length === 0) return '—'
  return entries.map(([k, v]) => `${k} : ${v}`).join(', ')
}

export function PopulationTable({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  // OPTIMISATION RENDU 2026-10-16 : à 16 000+ personnages, rendre
  //  toutes les lignes = DOM énorme (plusieurs secondes). Pagination
  //  simple : 200 lignes par page.
  const [pageCour, setPageCour] = useState(0)
  const PAR_PAGE = 200
  const [filtreDyn, setFiltreDyn] = useState('')
  const [filtreVille, setFiltreVille] = useState('')
  const [filtreMetier, setFiltreMetier] = useState('')
  const [filtreStatut, setFiltreStatut] = useState('Vivants')
  const [tri, setTri] = useState<SortKey>('age')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [addVille, setAddVille] = useState('')
  const [addNb, setAddNb] = useState(1)

  // ── Cible de l'onglet : un JOUEUR (joueur > 0) ou une CITÉ LIBRE
  //  (joueur = -(index+1) — onglets 🗼 de la section Population,
  //  retour Thibaut 2026-10-14 : « comme si c'étaient des joueurs »). */
  const citeIdx = joueur < 0 ? -joueur - 1 : -1
  const cite: CiteLibre | undefined =
    citeIdx >= 0 && state ? (state.citesLibres ?? [])[citeIdx] : undefined
  const p = cite ? undefined : state?.players.find((x) => x.n === joueur)
  const pop = cite ? (cite.population ?? []) : (state?.population[joueur] ?? [])
  const C = cfgOf(state?.config)
  // Description complète d'un métier pour le picker (marqueur (y)) :
  //  gains par habitant/tour + noblesse + éducation requise.
  const descMetier = (t: string): string => {
    const td = (C.config.metiers ?? []).find((x) => x.metier === t)
    if (!td) return ''
    const parts: string[] = []
    if (td.ressource1 && td.valeur1) parts.push(`+${fmt(td.valeur1)} ${td.ressource1}`)
    if (td.ressource2 && td.valeur2) parts.push(`+${fmt(td.valeur2)} ${td.ressource2}`)
    return [
      parts.length ? `${parts.join(' + ')} par habitant et par tour` : '',
      td.nobleSeul ? 'Nobles seulement' : '',
      td.education ? `Éducation requise : ${td.education}` : '',
      td.description || '',
    ].filter(Boolean).join('\n')
  }
  const resumeMetier = (t: string): string => {
    const td = (C.config.metiers ?? []).find((x) => x.metier === t)
    if (!td) return ''
    const parts: string[] = []
    if (td.ressource1 && td.valeur1) parts.push(`+${fmt(td.valeur1)} ${td.ressource1}`)
    if (td.ressource2 && td.valeur2) parts.push(`+${fmt(td.valeur2)} ${td.ressource2}`)
    return parts.join(' + ')
  }
  const nomPorteur = p?.nom ?? cite?.nom ?? ''

  // ── Séparation cour / population classique (retour Thibaut) ───────
  const estNoble = (c: Character) => isNobleDyn(c.dynastie, C)

  const { rowsCour, rowsClassique } = useMemo(() => {
    const filtre = (liste: Character[]) => {
      let list = [...liste]
      if (filtreStatut === 'Vivants') list = list.filter((c) => c.statut !== 'Décédé')
      else if (filtreStatut === 'Décédés') list = list.filter((c) => c.statut === 'Décédé')
      else if (filtreStatut === 'Enfants') list = list.filter((c) => c.statut !== 'Décédé' && c.age < 16)
      if (filtreDyn) list = list.filter((c) => c.dynastie.toLowerCase().includes(filtreDyn.toLowerCase()))
      if (filtreVille) list = list.filter((c) => c.ville === filtreVille)
      if (filtreMetier) list = list.filter((c) => (c.metier ?? '') === filtreMetier)
      const cmp: Record<SortKey, (a: Character, b: Character) => number> = {
        nom: (a, b) => (a.nom + a.prenom).localeCompare(b.nom + b.prenom, 'fr'),
        age: (a, b) => b.age - a.age,
        dynastie: (a, b) => a.dynastie.localeCompare(b.dynastie, 'fr'),
        ville: (a, b) => a.ville.localeCompare(b.ville, 'fr'),
        metier: (a, b) => (a.metier ?? '').localeCompare(b.metier ?? '', 'fr'),
        statut: (a, b) => a.statut.localeCompare(b.statut, 'fr'),
      }
      list.sort(cmp[tri])
      return list
    }
    return {
      rowsCour: filtre(pop.filter(estNoble)),
      rowsClassique: filtre(pop.filter((c) => !estNoble(c))),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pop, C, filtreDyn, filtreVille, filtreMetier, filtreStatut, tri])

  if (!state || (!p && !cite)) return null

  // ── Portefeuilles ministériels (refonte 2026-10-14) ──────────────────
  // Rang actuel du joueur dans l'échelle des rangs, pour le contrôle du
  // rang MINIMUM des portefeuilles (avertissement affiché, jamais
  // bloquant — l'arbitre garde la main).
  const rangsPays = C.config.paysRangs ?? []
  const idxRangJoueur = Math.max(0, rangsPays.findIndex((r) => r.nom === (p?.rang ?? rangsPays[0]?.nom)))
  const avertissementPortefeuille = (m: string | null | undefined): string | null => {
    if (!p || !m) return null
    const min = (C.config.ministeres ?? []).find((x) => x.ministere === m)?.rangMinimum
    if (!min) return null
    if (rangsPays.findIndex((r) => r.nom === min) > idxRangJoueur) {
      return `Le portefeuille ${m} exige en principe le rang de pays ${min}.`
    }
    return null
  }
  // Plafond de MINISTRES (revue 2026-10-15) : paysRangs.ministres par rang
  //  de pays + 1 si Basiléens « Suzeraineté » (Âge III) — avertissement
  //  non bloquant (l'arbitre reste maître).
  const maxMinistres =
    (rangsPays[idxRangJoueur]?.ministres ?? rangsPays[0]?.ministres ?? 1)
    + (p?.progresDebloques?.some((k) => {
      // « Progrès du développement futur C » : +1 ministre (revue 2026-10-16)
      const C2 = C
      const [iStr, slot] = k.split(':')
      const a = C2.config.progres[Number(iStr)]
      if (!a) return false
      const t = slot === 'c' ? a.techC : (slot[0] === 'a' ? a.brancheA : a.brancheB)[+slot[1] - 1]
      return t?.nom === 'Progrès du développement futur C'
    }) ? 1 : 0)
  const nbMinistres = pop.filter((c) => c.metier === 'Ministre' && c.statut !== 'Décédé' && c.ministere).length

  // Aucune contrainte bloquante : le métier est TOUJOURS appliqué ;
  // le contrôle de cohérence n'affiche qu'un avertissement (ignorable).
  /** Éducation enseignée par un professeur — modifiable à tout moment
   *  (même le métier « sans éducation » est possible). Uniquement pour
   *  les Professeurs vivants, comme demandé — les autres gardent leur
   *  éducation (acquise via un professeur pendant l'enfance). */
  const changerEducationProf = (c: Character, v: string) => {
    update((s) => {
      const liste = cite
        ? ((s.citesLibres ?? [])[citeIdx]?.population ?? [])
        : (s.population[joueur] ?? [])
      const target = liste.find((x) => x.id === c.id)
      if (target) target.education = v || null
    })
  }
  const changeMetier = (c: Character, metier: string) => {
    // Cité libre : validation via un pseudo-joueur (culture de la cité,
    // mêmes contrôles de cohérence que pour un joueur).
    const porteur = p ?? (cite ? pseudoJoueurDeCite(cite) : undefined)
    const issue = porteur
      ? validateMetierAssignment(state, porteur, c, metier)
      : { ok: true, message: '' }
    setErrors((e) => {
      const copy = { ...e }
      if (issue.ok) delete copy[c.id]
      else copy[c.id] = issue.message
      return copy
    })
    update((s) => {
      const liste = cite
        ? ((s.citesLibres ?? [])[citeIdx]?.population ?? [])
        : (s.population[joueur] ?? [])
      const target = liste.find((x) => x.id === c.id)
      if (target) {
        // Dirigeant / Héritier UNIQUE (retour utilisateur
        //  2026-10-17) : nommer un nouveau porteur relève
        //  automatiquement l'ancien (il redevient sans métier) — la
        //  validation ne fait qu'avertir, jamais bloquer, mais on
        //  garantit l'unicité du métier dans l'état.
        if (metier === C.p.metierDirigeant || metier === C.p.metierHeritierStr) {
          for (const autre of liste) {
            if (autre.id !== target.id && autre.metier === metier) {
              autre.metier = null
              s.log.push({
                turn: s.turn, type: 'Métier', joueur,
                texte: `\u{1F451} ${fullName(autre)} quitte le métier ${metier} — remplacé(e) par ${fullName(target)}.`,
              })
            }
          }
        }
        target.metier = metier
        // On quitte le métier « Ministre » → le portefeuille part avec.
        if (metier !== 'Ministre') target.ministere = null
      }
    })
  }

  /** Statut manuel (mode cité libre SEULEMENT — les cités libres ne
   *  passent pas au moteur démographique : décès « au plateau »).
   *  Décès = veuvage du conjoint où qu'il vive (joueur ou cité libre). */
  const changerStatut = (c: Character, v: string) => {
    const nomCite = cite?.nom ?? ''
    update((s) => {
      const tc = ((s.citesLibres ?? [])[citeIdx]?.population ?? []).find((x) => x.id === c.id)
      if (!tc) return
      tc.statut = v as Character['statut']
      if (v === 'Décédé' && tc.mariageId) {
        // M1 (2026-10-19) : veuvage par ID.
        const conjoint = toutesLesPopulations(s).find((x) => x.mariageId === tc.id)
        if (conjoint) { conjoint.mariage = null; conjoint.mariageId = null }
        s.log.push({
          turn: s.turn, type: 'Décès', joueur: null,
          texte: `💀 ${fullName(tc)} est décédé(e) à la cité libre ${nomCite} — le conjoint est libéré.`,
        })
      }
    })
  }

  // ── Don de personnage et mariage manuel (retour Thibaut) ───────────
  //  Dons et mariages couvrent JOUEURS et CITÉS LIBRES (retour
  //  2026-10-14 : la population des cités libres est « semblable en
  //  tout point » à celle des joueurs).
  /** Valeur d'option → détenteur (« j<n> » = joueur, « c<i> » = cité). */
  const detenteurDeCle = (s: GameState, v: string): Detenteur | undefined => {
    if (v.startsWith('j')) {
      const q = s.players.find((x) => x.n === parseInt(v.slice(1), 10))
      return q ? { kind: 'joueur', p: q } : undefined
    }
    const cc = (s.citesLibres ?? [])[parseInt(v.slice(1), 10)]
    return cc ? { kind: 'cite', cite: cc } : undefined
  }
  /** Options « Donner à… » : les autres joueurs ET les cités libres. */
  const optionsDon = [
    ...state.players
      .filter((q) => (cite ? true : q.n !== joueur))
      .map((q) => ({ value: `j${q.n}`, label: `${q.nom} (J${q.n})` })),
    ...(state.citesLibres ?? [])
      .map((cc, i) => (cite === cc
        ? null
        : { value: `c${i}`, label: `🗼 ${cc.nom} (cité libre)` }))
      .filter((x): x is { value: string; label: string } => x !== null),
  ]
  /** Nobles vivants, majeurs et célibataires (validité au moteur). */
  const eligibleMariage = (x: Character, c: Character) =>
    x.id !== c.id && x.statut !== 'Décédé' && !x.mariageId
    && x.age >= C.p.adultAge && estNoble(x)
  /** Options « Marier avec… » (marqueur (z), retour Thibaut) : les
   *  nobles du porteur COURANT UNIQUEMENT (joueur ou cité libre
   *  affiché) — on ne cible plus les autres joueurs/cités. Le moteur
   *  (marierPersonnages) reste capable d'unir deux porteurs
   *  différents (c'est l'interface qui restreint). */
  const optionsMariage = (c: Character) =>
    pop
      .filter((x) => eligibleMariage(x, c))
      .map((x) => ({ value: x.id, label: `${fullName(x)} (${x.dynastie})` }))
  const donnerA = (c: Character, v: string) => {
    if (!v) return
    const dst = detenteurDeCle(state, v)
    if (!dst) return
    const dstNom = dst.kind === 'joueur'
      ? `${dst.p.nom} (J${dst.p.n})`
      : `la cité libre ${dst.cite.nom}`
    if (p && c.metier === C.p.metierDirigeant
      && !window.confirm(`Donner ${fullName(c)} (${C.p.metierDirigeant} de ${p.nom}) à ${dstNom} ?`)) return
    let errDon: string | null = null
    update((s) => {
      const tc = cite
        ? ((s.citesLibres ?? [])[citeIdx]?.population ?? []).find((x) => x.id === c.id)
        : (s.population[joueur] ?? []).find((x) => x.id === c.id)
      const dstS = detenteurDeCle(s, v)
      if (tc && dstS) errDon = deplacerPersonnage(s, tc, dstS)
    })
    setErrors((e) => {
      const copy = { ...e }
      if (errDon) copy[c.id] = errDon
      else delete copy[c.id]
      return copy
    })
  }
  const marierAvec = (c: Character, v: string) => {
    if (!v) return
    // Retour Thibaut (marqueur (o)) : le mariage DÉMÉNAGE la personne
    //  mariée dans la ville de son conjoint — confirmation avant de
    //  déplacer un Dirigeant (changement de porteur possible).
    if (p && c.metier === C.p.metierDirigeant
      && !window.confirm(`Le mariage déplace la personne mariée dans la ville de son conjoint (${fullName(c)} changera de ville). Marier ${fullName(c)} ?`)) return
    let errMariage: string | null = null
    update((s) => {
      const a = cite
        ? ((s.citesLibres ?? [])[citeIdx]?.population ?? []).find((x) => x.id === c.id)
        : (s.population[joueur] ?? []).find((x) => x.id === c.id)
      if (!a) return
      const b = toutesLesPopulations(s).find((x) => x.id === v)
      if (b) errMariage = marierPersonnages(s, a, b)
    })
    setErrors((e) => {
      const copy = { ...e }
      if (errMariage) copy[c.id] = errMariage
      else delete copy[c.id]
      return copy
    })
  }

  const dynasties = [...new Set(pop.map((c) => c.dynastie))].sort((a, b) => a.localeCompare(b, 'fr'))
  const villes = [...new Set(pop.map((c) => c.ville))]

  // ── Récapitulatif des métiers (royaume entier, puis par ville) ──────
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  const villesOcc = cite ? [{ nom: cite.nom }] : (p?.villes ?? [])
  const accessibles = p
    ? metiersAccessibles(state, p)
    : (cite ? metiersAccessiblesCite(state, cite) : [])
  // ── Ajout manuel d'habitants ────────────────────────────────────────
  const villesAjout = cite ? [cite.nom] : (p?.villes.map((v) => v.nom) ?? [])
  const addVilleEff = addVille || villesAjout[0] || ''
  const ajouter = () => {
    const nb = Math.max(1, Math.round(addNb))
    update((s) => {
      if (cite) {
        const cc = (s.citesLibres ?? [])[citeIdx]
        if (cc) ajouterHabitantsCiteLibre(s, cc, nb)
        return
      }
      const target = s.players.find((x) => x.n === joueur)
      if (!target) return
      ajouterHabitant(s, target, addVilleEff, false, nb)
    })
  }
  const ajouterNobles = () => {
    const nb = Math.max(1, Math.round(addNb))
    update((s) => {
      if (cite) {
        const cc = (s.citesLibres ?? [])[citeIdx]
        if (cc) ajouterFamilleNobleCiteLibre(s, cc, nb)
        return
      }
      const target = s.players.find((x) => x.n === joueur)
      if (!target) return
      ajouterHabitant(s, target, addVilleEff, true, nb)
    })
  }

  // ── Ligne d'un personnage (commune aux deux tableaux) ──────────────
  //  avecMariage : le bouton « Marier avec… » n'apparaît que pour la
  //  cour (le mariage manuel unit deux nobles — le reste de la
  //  population se marie au fil des tours).
  const renderLigne = (c: Character, avecMariage: boolean) => (
    <tr key={c.id} className={c.statut === 'Décédé' ? 'dead' : (c.metier === C.p.metierDirigeant || c.metier === C.p.metierHeritierStr) ? 'lead' : ''}>
      <td><strong>{c.prenom} {c.nom}</strong></td>
      <td>{c.dynastie}</td>
      <td>{c.sexe}</td>
      <td>{c.age}</td>
      <td>{c.ville}</td>
      <td>{c.culture}</td>
      <td>
        {/* Marqueur (y), retour Thibaut : attribution de métier avec
            DESCRIPTION (gains du métier, noblesse, éducation) AVANT
            le choix — badge du métier actuel + bouton Retirer. */}
        <div className="row" style={{ alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          <span className={`badge ${c.metier ? 'badge-info' : 'badge-neutral'}`}>
            {c.metier ?? '(sans métier)'}
          </span>
          {c.statut !== 'Décédé' && (
            <ChoicePicker
              bouton="Attribuer…"
              categories={[
                {
                  label: 'Métiers accessibles',
                  options: accessibles
                    .filter((t) => t !== c.metier)
                    .map((t) => ({
                      value: t,
                      metier: t,
                      droite: resumeMetier(t),
                      description: descMetier(t),
                    })),
                },
              ]}
              onPick={(v) => changeMetier(c, v)}
            />
          )}
          {c.metier && c.statut !== 'Décédé' && (
            <Button tone="danger" title="Retirer le métier" onClick={() => changeMetier(c, '')}>✕</Button>
          )}
        </div>
        {errors[c.id] && <div className="neg small">⚠ {errors[c.id]}</div>}
      </td>
      <td className="small" title={c.domicile ? `Logement : ${c.domicile}` : 'Sans domicile — les bâtiments de logement arrivent (vague 3)'}>
        {c.domicile ?? '—'}
      </td>
      <td>
        {c.metier === C.p.metierProfesseur && c.statut !== 'Décédé' ? (
          <Select
            value={c.education ?? ''}
            options={[
              { value: '', label: '—' },
              ...C.educations.map((e) => ({ value: e, label: e })),
            ]}
            onChange={(v) => changerEducationProf(c, v)}
          />
        ) : (
          (c.education ?? '—')
        )}
      </td>
      <td className="small">
        {(c.traits ?? []).filter(Boolean).map((t) => (
          <span key={t} title={traitDef(t, C.config)?.description || undefined}
            className={`badge ${t === 'Bâtard' || t === 'Consanguin' ? 'badge-bad' : 'badge-neutral'}`}>{t}</span>
        ))}
      </td>
      <td>
        {cite ? (
          <Select
            value={c.statut}
            options={STATUTS.map((st) => ({ value: st, label: st }))}
            onChange={(v) => changerStatut(c, v)}
          />
        ) : (
          <span className={`badge ${c.statut === 'Sain' ? 'badge-good' : c.statut === 'Décédé' ? 'badge-bad' : 'badge-warn'}`}>
            {c.statut}
          </span>
        )}
      </td>
      <td className="small">{c.mariage ?? '—'}</td>
      <td>{c.fecondite > 0 ? fmt(c.fecondite, 2) : '—'}</td>
      <td className="small">
        {c.statut !== 'Décédé' && (
          <div className="act-row">
            <Select
              value=""
              options={[
                { value: '' as const, label: '➡ Donner à…' },
                ...optionsDon,
              ]}
              onChange={(v) => donnerA(c, v)}
            />
            {avecMariage && (
              <Select
                value=""
                options={[
                  { value: '' as const, label: '💍 Marier avec…' },
                  ...optionsMariage(c),
                ]}
                onChange={(v) => marierAvec(c, v)}
              />
            )}
          </div>
        )}
      </td>
    </tr>
  )

  // ── Bloc de filtres (commun aux deux tableaux) ─────────────────────
  const blocFiltres = (
    <div className="filters">
      <Select value={filtreStatut} options={[
        { value: 'Vivants', label: 'Vivants' },
        { value: 'Décédés', label: 'Décédés' },
        { value: 'Enfants', label: 'Enfants (<16)' },
        { value: 'Tous', label: 'Tous' },
      ]} onChange={setFiltreStatut} />
      <Select value={filtreVille} options={[
        { value: '', label: 'Toutes les villes' },
        ...villes.map((v) => ({ value: v, label: v })),
      ]} onChange={setFiltreVille} />
      <Select value={filtreMetier} options={[
        { value: '', label: 'Tous les métiers', },
        ...C.metiers.map((t) => ({ value: t.metier, label: t.metier })),
      ]} onChange={setFiltreMetier} />
      <TextInput value={filtreDyn} onChange={setFiltreDyn} placeholder="Filtrer dynastie…" />
      <Select value={tri} options={[
        { value: 'age', label: 'Trier : âge' },
        { value: 'nom', label: 'Trier : nom' },
        { value: 'dynastie', label: 'Trier : dynastie' },
        { value: 'ville', label: 'Trier : ville' },
        { value: 'metier', label: 'Trier : métier', },
      ]} onChange={(v) => setTri(v as SortKey)} />
    </div>
  )

  const entetes = (
    <thead>
      <tr>
        <th>Nom</th><th>Dynastie</th><th>Sx</th><th>Âge</th><th>Ville</th>
        <th>Culture</th><th>Métier</th><th>Domicile</th><th>Éducation</th><th>Traits</th>
        <th>Statut</th><th>Mariage</th><th>Fécondité</th><th>Actions</th>
      </tr>
    </thead>
  )

  const courVivants = pop.filter((c) => estNoble(c) && c.statut !== 'Décédé').length
  const classiqueVivants = vivants.length - courVivants

  return (
    <div className="stack">

      {/* Récap du dernier tour — carte déplacée de la page Pays (retour
          Thibaut 2026-10-14) : elle ne concerne que la population. */}
      {p && (
        <Card title="Récap du dernier tour">
          {p.recap ? (
            <div className="grid-2 small">
              <div>Conceptions : {dictToString(p.recap.conceptions)}</div>
              <div>Naissances : {dictToString(p.recap.naissances)}</div>
              <div>Décès : {dictToString(p.recap.deces)} (dont maladie : {p.recap.decesMaladie})</div>
              <div>Mariages nobles : {dictToString(p.recap.mariagesNobles)}</div>
              <div>Conversions : {dictToString(p.recap.conversions)}</div>
              <div>Métiers attribués : {dictToString(p.recap.metiersAttribues)}</div>
              {(p.recap.crises.length > 0 || p.recap.commandantTombe) && (
                <div className="neg">⚠ {p.recap.crises.join(' ; ')}{p.recap.commandantTombe ? ` Commandant tombé : ${p.recap.commandantTombe}` : ''}</div>
              )}
            </div>
          ) : (
            <p className="muted">Lancez un tour pour voir le récapitulatif.</p>
          )}
        </Card>
      )}
      {/* 👑 Ministres du porteur (retour Thibaut, marqueur (r) : « les
          ministres n'ont jamais été intégrés » — ils l'étaient depuis la
          refonte du 2026-10-14 (métier « Ministre » + portefeuille +
          effets moteur) mais restaient invisibles si on ne savait pas
          où regarder. Cette carte affiche l'équipe en place et rappelle
          comment nommer. Marqueur (v) : le portefeuille se choisit ICI,
          plus dans le tableau de population (retour Thibaut).
          — joueurs seulement (les cités libres n'ont pas de ministères). */}
      {p && (
        <Card title={`👑 Ministres de ${p.nom}`}>
          {(() => {
            const mins = pop.filter((c) => c.metier === 'Ministre' && c.statut !== 'Décédé')
            if (mins.length === 0) {
              return (
                <p className="muted small">
                  Aucun ministre en poste. Pour en nommer un : dans « La cour » ci-dessous,
                  choisir le métier <strong>Ministre</strong> dans la colonne Métier d'un noble vivant,
                  puis revenir choisir son <strong>portefeuille</strong> dans cette carte
                  (Trésorier, Sénéchal, Connétable…). Les effets s'appliquent automatiquement
                  à chaque fin de tour / fin de saison.
                </p>
              )
            }
            return (
              <div className="badges-wrap rows">
                {nbMinistres > maxMinistres && (
                  <p className="neg small" style={{ flexBasis: '100%', margin: 0 }}>
                    ⚠ {nbMinistres} ministres en poste pour un maximum de {maxMinistres}
                    ({rangsPays[idxRangJoueur]?.ministres ?? '?'} par rang de pays
                    {maxMinistres > (rangsPays[idxRangJoueur]?.ministres ?? 0) ? ' + Suzeraineté' : ''})
                    — retirez un portefeuille ou montez de rang.
                  </p>
                )}
                {mins.map((c) => {
                  // Marqueur (y), retour Thibaut : portefeuilles
                  //  CATÉGORISÉS PAR RANG DE PAYS REQUIS + description
                  //  (effet complet) AVANT le choix — et un bouton
                  //  « Retirer » toujours disponible (le portefeuille
                  //  actuel est affiché en badge, plus jamais un
                  //  <select> muet sur une valeur inconnue).
                  const cats = rangsPays
                    .map((r) => ({
                      label: `${r.nom} (min.)`,
                      options: (C.config.ministeres ?? [])
                        .filter((m) => (m.rangMinimum ?? rangsPays[0]?.nom ?? '') === r.nom)
                        .filter((m) => m.ministere !== c.ministere)
                        .map((m) => ({
                          value: m.ministere,
                          metier: m.ministere,
                          droite: m.mode === 'Auto' ? 'auto' : 'plateau',
                          description: m.effet,
                        })),
                    }))
                    .filter((cat) => cat.options.length > 0)
                  return (
                    <div key={c.id} className="row" style={{ alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span className="badge badge-info" title={`${fullName(c)} — ${c.ville}`}>
                        {fullName(c)}
                      </span>
                      <span
                        className={`badge ${c.ministere ? 'badge-good' : 'badge-neutral'}`}
                        title={(() => {
                          const ref = (C.config.ministeres ?? []).find((m) => m.ministere === c.ministere)
                          return ref ? `${ref.effet} (${ref.mode === 'Auto' ? 'appliqué automatiquement' : 'à appliquer au plateau'})` : undefined
                        })()}
                      >
                        {c.ministere ?? '(sans portefeuille)'}
                      </span>
                      <ChoicePicker
                        bouton="Changer de portefeuille…"
                        categories={cats}
                        onPick={(v) => update((s2) => {
                          const tp = s2.players.find((x) => x.n === joueur)
                          const tc = (s2.population[joueur] ?? []).find((x) => x.id === c.id)
                          if (!tp || !tc) return
                          changerPortefeuille(s2, tp, tc, v || null)
                          resynchroniserTourisme(s2, tp, 'portefeuille ministériel')
                        })}
                      />
                      {c.ministere && (
                        <Button tone="danger" title="Retirer le portefeuille" onClick={() => update((s2) => {
                          const tp = s2.players.find((x) => x.n === joueur)
                          const tc = (s2.population[joueur] ?? []).find((x) => x.id === c.id)
                          if (!tp || !tc) return
                          changerPortefeuille(s2, tp, tc, null)
                          resynchroniserTourisme(s2, tp, 'portefeuille retiré')
                        })}>✕ Retirer</Button>
                      )}
                      {avertissementPortefeuille(c.ministere) && (
                        <div className="neg small">⚠ {avertissementPortefeuille(c.ministere)}</div>
                      )}
                      {/* Effet du portefeuille CHOISI (retour Thibaut
                          2026-10-15) : le ministre en poste affiche ce
                          qu'il fait — texte exact du référentiel + badge
                          auto/plateau. */}
                      {c.ministere && (() => {
                        const ref = (C.config.ministeres ?? []).find((m) => m.ministere === c.ministere)
                        if (!ref) return null
                        const st = statutMinistre(ref.mode)
                        return (
                          <div className="small muted" style={{ flexBasis: '100%' }}>
                            <span className={pastilleClass(st)} title={
                              st === 'auto' ? 'Appliqué automatiquement par le moteur'
                              : 'Impossible à automatiser (plateau)'
                            } />
                            {ref.effet}
                          </div>
                        )
                      })()}
                    </div>
                  )
                })}
              </div>
            )
          })()}
          <p className="muted small">
            Portefeuilles et rangs minimum : onglet Référentiels → « Ministères » (paramétrable).
            En principe autant de ministres que le rang de pays l'octroie (avertissement, jamais bloquant).
          </p>
        </Card>
      )}

      {/* Écran « métiers et places par ville » (vague 2 UI, rework
          habitants 2026-10-20) : par ville, une ligne par métier occupé
          ou plafonné — en poste, capacité, places libres — la ligne
          Sans-emploi (rôle neutre : impôt nul, aucun effet) est toujours
          présente. Helper moteur occupationsMetierVille (testé). */}
      <Card title="🏘️ Métiers et places par ville">
        <div className="table-wrap">
          <table className="tbl small">
            <thead><tr><th>Ville</th><th>Métier</th><th>En poste</th><th>Places max</th><th>Places libres</th><th>Vivants</th></tr></thead>
            <tbody>
              {villesOcc.map((v) => {
                const habitants = vivants.filter((c) => c.ville === v.nom)
                const villeObj = p?.villes.find((vv) => vv.nom === v.nom) ?? null
                const lignes = occupationsMetierVille(habitants, villeObj, C)
                return lignes.map((l, i) => (
                  <tr key={`${v.nom}-${l.metier ?? 'sans'}`}>
                    <td>
                      {i === 0
                        ? <strong>{v.nom}{villeObj?.type ? ` (${villeObj.type})` : cite ? ' (cité libre)' : ''}</strong>
                        : <span className="muted">〃</span>}
                    </td>
                    <td>
                      <span
                        className={`badge ${l.metier ? 'badge-info' : 'badge-neutral'}`}
                        title={l.metier ? (descMetier(l.metier) || undefined) : 'Sans-emploi : rôle neutre — impôt nul, aucun effet'}
                      >
                        {l.metier ?? 'Sans-emploi'}
                      </span>
                    </td>
                    <td>{l.enPoste}</td>
                    <td>{Number.isFinite(l.cap) ? l.cap : '∞'}</td>
                    <td>
                      {Number.isFinite(l.cap)
                        ? <span className={l.cap - l.enPoste < 0 ? 'neg' : ''}>{l.cap - l.enPoste}</span>
                        : <span className="muted">—</span>}
                    </td>
                    <td>{i === 0 ? habitants.length : ''}</td>
                  </tr>
                ))
              })}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          Vague 3b — caps CUMULATIVES : cap d'un métier = BASE DU RANG d'habitation
          (colonne « Métiers disponibles », ex. Hameau : 50 Chasseurs, 2 Gardes,
          1 Commerçant, 1 Gouverneur) + EMPLACEMENTS des bâtiments et aménagements de
          la ville (ex. Poste de garde : +4 Garde). Les métiers sans base, sans
          emplacement et non productifs (Banquier, Troubadour, Dirigeant/Héritier,
          rôles de cour/armée) ne sont pas plafonnés ici (∞ = règles propres) ; un
          marchand tenant une route commerciale occupe un poste créé par elle. La
          réaffectation automatique tourne à chaque fin de tour : surnombre →
          les plus âgés passent Sans-emploi ; places libres (ordre « n'importe quel
          métier → Chasseur → sans métier ») → les Sans-emploi adultes prennent un
          poste (autre que Chasseur en priorité ; jamais les postes nobles ni les
          nominations d'école/armée) et les Chasseurs CHANGENT de métier dès qu'un
          autre poste est disponible — le Chasseur n'est jamais qu'un poste de
          repli. Les cités libres ne sont pas concernées par les caps.
        </p>
      </Card>

      <Card title="➕ Ajouter des habitants">
        <div className="filters">
          <Select value={addVilleEff} options={villesAjout.map((v) => ({ value: v, label: v }))} onChange={setAddVille} />
          <NumberInput value={addNb} min={1} max={200} onChange={(v) => setAddNb(Math.round(v))} />
          <Button onClick={ajouter}>+ Roturiers</Button>
          <Button onClick={ajouterNobles}>+ Nouvelle famille noble</Button>
        </div>
        <p className="muted small">
          Les nobles ajoutés apparaissent dans « La cour ».
        </p>
      </Card>

      <Card title={`👑 La cour de ${nomPorteur} — ${courVivants} vivants / ${pop.filter(estNoble).length} au total`}>
        {blocFiltres}
        <p className="muted small">
          Tous les nobles {cite ? 'de la cité libre' : 'du joueur (dynastie dirigeante et familles nobles)'} — filtres et tri
          appliqués aussi au tableau « Population » ci-dessous.
        </p>
        <div className="table-wrap">
          <table className="tbl small pop-tbl">
            {entetes}
            <tbody>
              {rowsCour.length
                ? rowsCour.slice(pageCour * PAR_PAGE, (pageCour + 1) * PAR_PAGE).map((c) => renderLigne(c, true))
                : <tr><td colSpan={14} className="muted">aucun noble</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          « ➡ Donner à… » transfère le noble à un autre porteur (il y est éditable et y produit).
          « 💍 Marier avec… » unit deux nobles DU MÊME porteur (retour Thibaut (z) : on ne
          cible plus les autres joueurs ni les cités) : la personne mariée déménage
          dans la ville de son conjoint (confirmation avant de marier un Dirigeant).
          Si un mariage ou un don est refusé, le motif s'affiche en rouge sous le métier
          (déjà marié, non noble, mineur…).
        </p>
        {p && (
          <p className="muted small">
            👑 Pour nommer un <strong>ministre</strong> : métier « Ministre » dans la colonne
            Métier, puis portefeuille dans la carte « 👑 Ministres » ci-dessus.
          </p>
        )}
      </Card>

      <Card title={`Population de ${nomPorteur} — ${classiqueVivants} vivants / ${pop.filter((c) => !estNoble(c)).length} au total`}>
        <div className="table-wrap">
          <table className="tbl small pop-tbl">
            {entetes}
            <tbody>
              {rowsClassique.length
                ? rowsClassique.slice(pageCour * PAR_PAGE, (pageCour + 1) * PAR_PAGE).map((c) => renderLigne(c, false))
                : <tr><td colSpan={14} className="muted">aucun habitant</td></tr>}
            </tbody>
          </table>
              {(() => {
                const total = Math.max(rowsCour.length, rowsClassique.length)
                const pages = Math.ceil(total / PAR_PAGE)
                if (pages <= 1) return null
                return (
                  <div className="filters" style={{ alignItems: 'center', marginTop: 8 }}>
                    <Button disabled={pageCour === 0} onClick={() => setPageCour((n) => n - 1)}>◀ Précédent</Button>
                    <span className="small">Page {pageCour + 1} / {pages} — {total} personnage(s)</span>
                    <Button disabled={pageCour + 1 >= pages} onClick={() => setPageCour((n) => n + 1)}>Suivant ▶</Button>
                  </div>
                )
              })()}
        </div>
        <p className="muted small">
          Population « classique » {cite ? 'de la cité libre' : 'du joueur'} (hors nobles){cite
            ? ' — le statut (Sain/Malade/Décédé) y est éditable : les cités libres ne passent pas au moteur démographique'
            : ' ; une ville transférée à un autre joueur emmène ses habitants classiques, la cour reste auprès de son joueur'}.
          Metiers d'éducation « {C.p.metierProfesseur} » : enseignés par un Professeur vivant {cite ? 'de la cité' : 'du royaume'}.
        </p>
      </Card>

      <Card title="Dynasties de la population">
        <div className="badges-wrap">
          {dynasties.map((d) => {
            const nb = pop.filter((c) => c.dynastie === d && c.statut !== 'Décédé').length
            return (
              <button key={d} className="badge badge-neutral clickable" onClick={() => setFiltreDyn(d)}>
                {d} : {nb}
              </button>
            )
          })}
        </div>
      </Card>

      {p && <GenealogyTree joueur={joueur} />}
    </div>
  )
}
