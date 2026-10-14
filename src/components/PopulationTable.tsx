// ══════════════════════════════════════════════════════════════════════
//  Table de population : récapitulatif des métiers (royaume puis par
//  ville), ajout manuel d'habitants (roturiers ou nouvelle famille
//  noble, culture pondérée par celles présentes dans la ville),
//  filtres, tri, édition des titres — seuls les titres accessibles
//  sont proposés (Chasseur, Gouverneur, titres Education enseignés
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
//  nobles, titres, dons et mariages. Seules différences : pas de
//  Ministres ni d'arbre dynastique, et le STATUT reste éditable
//  (les cités libres ne passent pas au moteur démographique).
// ══════════════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react'
import { useGame } from '../state/store'
import type { Character, CiteLibre, GameState, Player } from '../engine/types'
import { cfgOf } from '../engine/gameData'
import { validateTitleAssignment } from '../engine/validation'
import { ajouterHabitant } from '../engine/setup'
import {
  titresAccessibles, changerPortefeuille, isNobleDyn, fullName,
  marierPersonnages, deplacerPersonnage, toutesLesPopulations,
  titresAccessiblesCite, pseudoJoueurDeCite,
  ajouterHabitantsCiteLibre, ajouterFamilleNobleCiteLibre,
  type Detenteur,
} from '../engine/engine'
import { GenealogyTree } from './GenealogyTree'
import { Card, Select, TextInput, Button, NumberInput, fmt } from './ui'

type SortKey = 'nom' | 'age' | 'dynastie' | 'ville' | 'titre' | 'statut'

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
  const [filtreDyn, setFiltreDyn] = useState('')
  const [filtreVille, setFiltreVille] = useState('')
  const [filtreTitre, setFiltreTitre] = useState('')
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
      if (filtreTitre) list = list.filter((c) => (c.titre ?? '') === filtreTitre)
      const cmp: Record<SortKey, (a: Character, b: Character) => number> = {
        nom: (a, b) => (a.nom + a.prenom).localeCompare(b.nom + b.prenom, 'fr'),
        age: (a, b) => b.age - a.age,
        dynastie: (a, b) => a.dynastie.localeCompare(b.dynastie, 'fr'),
        ville: (a, b) => a.ville.localeCompare(b.ville, 'fr'),
        titre: (a, b) => (a.titre ?? '').localeCompare(b.titre ?? '', 'fr'),
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
  }, [pop, C, filtreDyn, filtreVille, filtreTitre, filtreStatut, tri])

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

  // Aucune contrainte bloquante : le titre est TOUJOURS appliqué ;
  // le contrôle de cohérence n'affiche qu'un avertissement (ignorable).
  const changeTitre = (c: Character, titre: string) => {
    // Cité libre : validation via un pseudo-joueur (culture de la cité,
    // mêmes contrôles de cohérence que pour un joueur).
    const porteur = p ?? (cite ? pseudoJoueurDeCite(cite) : undefined)
    const issue = porteur
      ? validateTitleAssignment(state, porteur, c, titre)
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
        target.titre = titre
        // On quitte le titre « Ministre » → le portefeuille part avec.
        if (titre !== 'Ministre') target.ministere = null
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
      if (v === 'Décédé' && tc.mariage) {
        const conjoint = toutesLesPopulations(s).find((x) => x.mariage === fullName(tc))
        if (conjoint) conjoint.mariage = null
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
  /** Nobles vivants, majeurs et célibataires, chez les joueurs comme
   *  dans les cités libres. Le personnage lui-même est exclu. */
  const eligibleMariage = (x: Character, c: Character) =>
    x.id !== c.id && x.statut !== 'Décédé' && !x.mariage
    && x.age >= C.p.adultAge && estNoble(x)
  const optionsMariage = (c: Character) => [
    ...state.players.flatMap((q) =>
      (state.population[q.n] ?? [])
        .filter((x) => eligibleMariage(x, c))
        .map((x) => ({ value: x.id, label: `${fullName(x)} — ${q.nom} (${x.dynastie})` })),
    ),
    ...(state.citesLibres ?? []).flatMap((cc) =>
      (cc.population ?? [])
        .filter((x) => eligibleMariage(x, c))
        .map((x) => ({ value: x.id, label: `${fullName(x)} — 🗼 ${cc.nom}, cité libre (${x.dynastie})` })),
    ),
  ]
  const donnerA = (c: Character, v: string) => {
    if (!v) return
    const dst = detenteurDeCle(state, v)
    if (!dst) return
    const dstNom = dst.kind === 'joueur'
      ? `${dst.p.nom} (J${dst.p.n})`
      : `la cité libre ${dst.cite.nom}`
    if (p && c.titre === C.p.titreDirigeant
      && !window.confirm(`Donner ${fullName(c)} (${C.p.titreDirigeant} de ${p.nom}) à ${dstNom} ?`)) return
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
    if (p && c.titre === C.p.titreDirigeant
      && !window.confirm(`Le mariage déplace la personne mariée dans la ville de son conjoint (${p.nom} perd ${fullName(c)} si son conjoint est d'un autre porteur). Marier ${fullName(c)} ?`)) return
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
    ? titresAccessibles(state, p)
    : (cite ? titresAccessiblesCite(state, cite) : [])
  const compteTitres = (liste: Character[]): [string, number][] => {
    const parTitre: Record<string, number> = {}
    let sansTitre = 0
    for (const c of liste) {
      if (c.titre) parTitre[c.titre] = (parTitre[c.titre] ?? 0) + 1
      else sansTitre++
    }
    const lignes = Object.entries(parTitre).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'))
    return sansTitre > 0 ? [...lignes, ['(sans titre)', sansTitre]] : lignes
  }

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
    <tr key={c.id} className={c.statut === 'Décédé' ? 'dead' : c.titre === 'Dirigeant' ? 'lead' : ''}>
      <td><strong>{c.prenom} {c.nom}</strong></td>
      <td>{c.dynastie}</td>
      <td>{c.sexe}</td>
      <td>{c.age}</td>
      <td>{c.ville}</td>
      <td>{c.culture}</td>
      <td>
        <Select
          value={c.titre ?? ''}
          options={[
            ...(c.titre ? [{ value: c.titre, label: c.titre }] : []),
            { value: '', label: c.statut === 'Décédé' ? '—' : '(retirer)' },
            ...accessibles
              .filter((t) => t !== c.titre)
              .map((t) => ({ value: t, label: t })),
          ]}
          onChange={(v) => changeTitre(c, v)}
        />
        {errors[c.id] && <div className="neg small">⚠ {errors[c.id]}</div>}
        {p && c.titre === 'Ministre' && c.statut !== 'Décédé' && (
          <>
            <Select
              value={c.ministere ?? ''}
              options={[
                { value: '', label: '(sans portefeuille)' },
                ...(C.config.ministeres ?? []).map((m) => ({
                  value: m.ministere,
                  label: `${m.ministere} — min. ${m.rangMinimum ?? rangsPays[0]?.nom ?? '?'} (${m.mode === 'Auto' ? 'auto' : 'plateau'})`,
                })),
              ]}
              onChange={(v) => update((s) => {
                const tp = s.players.find((x) => x.n === joueur)
                const tc = (s.population[joueur] ?? []).find((x) => x.id === c.id)
                if (!tp || !tc) return
                changerPortefeuille(s, tp, tc, v || null)
              })}
            />
            {avertissementPortefeuille(c.ministere) && (
              <div className="neg small">⚠ {avertissementPortefeuille(c.ministere)}</div>
            )}
          </>
        )}
      </td>
      <td>{c.education ?? '—'}</td>
      <td className="small">
        {c.traits.filter(Boolean).map((t) => (
          <span key={t} className={`badge ${t === 'Bâtard' || t === 'Consanguin' ? 'badge-bad' : 'badge-neutral'}`}>{t}</span>
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
      <td>{c.ageMax || '—'}</td>
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
      <Select value={filtreTitre} options={[
        { value: '', label: 'Tous les titres' },
        ...C.titres.map((t) => ({ value: t.titre, label: t.titre })),
      ]} onChange={setFiltreTitre} />
      <TextInput value={filtreDyn} onChange={setFiltreDyn} placeholder="Filtrer dynastie…" />
      <Select value={tri} options={[
        { value: 'age', label: 'Trier : âge' },
        { value: 'nom', label: 'Trier : nom' },
        { value: 'dynastie', label: 'Trier : dynastie' },
        { value: 'ville', label: 'Trier : ville' },
        { value: 'titre', label: 'Trier : titre' },
      ]} onChange={(v) => setTri(v as SortKey)} />
    </div>
  )

  const entetes = (
    <thead>
      <tr>
        <th>Nom</th><th>Dynastie</th><th>Sx</th><th>Âge</th><th>Ville</th>
        <th>Culture</th><th>Titre</th><th>Éducation</th><th>Traits</th>
        <th>Statut</th><th>Mariage</th><th>Fécondité</th><th>Âge max</th><th>Actions</th>
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
              <div>Titres attribués : {dictToString(p.recap.titresAttribues)}</div>
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
          refonte du 2026-10-14 (titre « Ministre » + portefeuille +
          effets moteur) mais restaient invisibles si on ne savait pas
          où regarder. Cette carte affiche l'équipe en place et rappelle
          comment nommer.) — joueurs seulement (les cités libres n'ont
          pas de ministères). */}
      {p && (
        <Card title={`👑 Ministres de ${p.nom}`}>
          {(() => {
            const mins = pop.filter((c) => c.titre === 'Ministre' && c.statut !== 'Décédé')
            if (mins.length === 0) {
              return (
                <p className="muted small">
                  Aucun ministre en poste. Pour en nommer un : dans « La cour » ci-dessous,
                  choisir le titre <strong>Ministre</strong> dans la colonne Titre d'un noble vivant,
                  puis choisir son <strong>portefeuille</strong> dans le second menu qui apparaît
                  (Trésorier, Sénéchal, Connétable…). Les effets s'appliquent automatiquement
                  à chaque fin de tour / fin de saison.
                </p>
              )
            }
            return (
              <div className="badges-wrap">
                {mins.map((c) => (
                  <span key={c.id} className="badge badge-info" title={`${fullName(c)} — ${c.ville}`}>
                    {fullName(c)} : {c.ministere || '(sans portefeuille)'}
                  </span>
                ))}
              </div>
            )
          })()}
          <p className="muted small">
            Portefeuilles et rangs minimum : onglet Référentiels → « Ministères » (paramétrable).
            En principe autant de ministres que le rang de pays l'octroie (avertissement, jamais bloquant).
          </p>
        </Card>
      )}

      <Card title="🏘️ Occupations par ville">
        <div className="table-wrap">
          <table className="tbl small">
            <thead><tr><th>Ville</th><th>Occupations (vivants)</th><th>Vivants</th></tr></thead>
            <tbody>
              {villesOcc.map((v) => {
                const habitants = vivants.filter((c) => c.ville === v.nom)
                const detail = compteTitres(habitants)
                return (
                  <tr key={v.nom}>
                    <td><strong>{v.nom}</strong></td>
                    <td>
                      {detail.length
                        ? detail.map(([t, n]) => (
                          <span key={t} className={`badge ${t === '(sans titre)' ? 'badge-neutral' : 'badge-info'}`} style={{ marginRight: 4 }}>
                            {t} ×{n}
                          </span>
                        ))
                        : <span className="muted">aucun habitant</span>}
                    </td>
                    <td>{habitants.length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
                ? rowsCour.map((c) => renderLigne(c, true))
                : <tr><td colSpan={14} className="muted">aucun noble</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          « ➡ Donner à… » transfère le noble à un autre porteur (il y est éditable et y produit).
          « 💍 Marier avec… » unit deux nobles — y compris de porteurs différents : la
          personne mariée déménage dans la ville de son conjoint et rejoint son porteur
          (changement de joueur ou de cité possible ; confirmation avant de marier un Dirigeant).
          Si un mariage ou un don est refusé, le motif s'affiche en rouge sous le titre
          (déjà marié, non noble, mineur…).
        </p>
        {p && (
          <p className="muted small">
            👑 Pour nommer un <strong>ministre</strong> : titre « Ministre » dans la colonne
            Titre, puis portefeuille dans le second menu (carte « 👑 Ministres » ci-dessus).
          </p>
        )}
      </Card>

      <Card title={`Population de ${nomPorteur} — ${classiqueVivants} vivants / ${pop.filter((c) => !estNoble(c)).length} au total`}>
        <div className="table-wrap">
          <table className="tbl small pop-tbl">
            {entetes}
            <tbody>
              {rowsClassique.length
                ? rowsClassique.map((c) => renderLigne(c, false))
                : <tr><td colSpan={14} className="muted">aucun habitant</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          Population « classique » {cite ? 'de la cité libre' : 'du joueur'} (hors nobles){cite
            ? ' — le statut (Sain/Malade/Décédé) y est éditable : les cités libres ne passent pas au moteur démographique'
            : ' ; une ville transférée à un autre joueur emmène ses habitants classiques, la cour reste auprès de son joueur'}.
          Titres d'éducation « {C.p.titreProfesseur} » : enseignés par un Professeur vivant {cite ? 'de la cité' : 'du royaume'}.
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
