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
// ══════════════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react'
import { useGame } from '../state/store'
import type { Character, Player } from '../engine/types'
import { cfgOf } from '../engine/gameData'
import { validateTitleAssignment } from '../engine/validation'
import { ajouterHabitant } from '../engine/setup'
import {
  titresAccessibles, changerPortefeuille, isNobleDyn, fullName,
  donnerPersonnage, marierPersonnages,
} from '../engine/engine'
import { GenealogyTree } from './GenealogyTree'
import { Card, Select, TextInput, Button, NumberInput, fmt } from './ui'

type SortKey = 'nom' | 'age' | 'dynastie' | 'ville' | 'titre' | 'statut'

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

  const p = state?.players.find((x) => x.n === joueur)
  const pop = state?.population[joueur] ?? []
  const C = cfgOf(state?.config)

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

  if (!state || !p) return null

  // ── Portefeuilles ministériels (refonte 2026-10-14) ──────────────────
  // Rang actuel du joueur dans l'échelle des rangs, pour le contrôle du
  // rang MINIMUM des portefeuilles (avertissement affiché, jamais
  // bloquant — l'arbitre garde la main).
  const rangsPays = C.config.paysRangs ?? []
  const idxRangJoueur = Math.max(0, rangsPays.findIndex((r) => r.nom === (p.rang ?? rangsPays[0]?.nom)))
  const avertissementPortefeuille = (m: string | null | undefined): string | null => {
    if (!m) return null
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
    const issue = validateTitleAssignment(state, p, c, titre)
    setErrors((e) => {
      const copy = { ...e }
      if (issue.ok) delete copy[c.id]
      else copy[c.id] = issue.message
      return copy
    })
    update((s) => {
      const target = (s.population[joueur] ?? []).find((x) => x.id === c.id)
      if (target) {
        target.titre = titre
        // On quitte le titre « Ministre » → le portefeuille part avec.
        if (titre !== 'Ministre') target.ministere = null
      }
    })
  }

  // ── Don de personnage et mariage manuel (retour Thibaut) ───────────
  const autresJoueurs = state.players.filter((q) => q.n !== joueur)
  /** Options « Donner à… » : les autres joueurs de la partie. */
  const optionsDon = autresJoueurs.map((q) => ({ value: String(q.n), label: `${q.nom} (J${q.n})` }))
  /** Options « Marier avec… » : nobles vivants, majeurs et célibataires
   *  de TOUS les joueurs (mariage entre cours, ex. fille de J1 × fils
   *  de J2). Le personnage lui-même est exclu. */
  const optionsMariage = (c: Character) =>
    state.players.flatMap((q) =>
      (state.population[q.n] ?? [])
        .filter((x) =>
          x.id !== c.id && x.statut !== 'Décédé' && !x.mariage
          && x.age >= C.p.adultAge && estNoble(x))
        .map((x) => ({ value: x.id, label: `${fullName(x)} — ${q.nom} (${x.dynastie})` })),
    )
  const donnerA = (c: Character, v: string) => {
    if (!v) return
    const dstNom = state.players.find((q) => q.n === parseInt(v, 10))?.nom
    if (!dstNom) return
    if (c.titre === C.p.titreDirigeant
      && !window.confirm(`Donner ${fullName(c)} (${C.p.titreDirigeant} de ${p.nom}) à ${dstNom} ?`)) return
    update((s) => {
      const src = s.players.find((q) => q.n === joueur)
      const dst = s.players.find((q) => q.n === parseInt(v, 10))
      const tc = src ? (s.population[joueur] ?? []).find((x) => x.id === c.id) : undefined
      if (src && dst && tc) donnerPersonnage(s, src, tc, dst)
    })
  }
  const marierAvec = (c: Character, v: string) => {
    if (!v) return
    update((s) => {
      const a = (s.population[joueur] ?? []).find((x) => x.id === c.id)
      if (!a) return
      let b: Character | undefined
      for (const q of s.players) {
        b = (s.population[q.n] ?? []).find((x) => x.id === v)
        if (b) break
      }
      if (b) marierPersonnages(s, a, b)
    })
  }

  const dynasties = [...new Set(pop.map((c) => c.dynastie))].sort((a, b) => a.localeCompare(b, 'fr'))
  const villes = [...new Set(pop.map((c) => c.ville))]

  // ── Récapitulatif des métiers (royaume entier, puis par ville) ──────
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  const accessibles = titresAccessibles(state, p)
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
  const metiersRoyaume = compteTitres(vivants)

  // ── Ajout manuel d'habitants ────────────────────────────────────────
  const villesAjout = p.villes.map((v) => v.nom)
  const addVilleEff = addVille || villesAjout[0] || ''
  const ajouter = () => {
    const nb = Math.max(1, Math.round(addNb))
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (!target) return
      ajouterHabitant(s, target, addVilleEff, false, nb)
    })
  }
  const ajouterNobles = () => {
    const nb = Math.max(1, Math.round(addNb))
    update((s) => {
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
        {c.titre === 'Ministre' && c.statut !== 'Décédé' && (
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
        <span className={`badge ${c.statut === 'Sain' ? 'badge-good' : c.statut === 'Décédé' ? 'badge-bad' : 'badge-warn'}`}>
          {c.statut}
        </span>
      </td>
      <td className="small">{c.mariage ?? '—'}</td>
      <td>{c.fecondite > 0 ? fmt(c.fecondite, 2) : '—'}</td>
      <td>{c.ageMax || '—'}</td>
      <td className="small">
        {c.statut !== 'Décédé' && (
          <>
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
          </>
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
      <Card title={`🛠️ Métiers du royaume — ${vivants.length} vivants`}>
        <div className="badges-wrap">
          {metiersRoyaume.map(([titre, nb]) => (
            <span key={titre} className={`badge ${titre === '(sans titre)' ? 'badge-neutral' : 'badge-info'}`}>
              {titre} : {nb}
            </span>
          ))}
          {metiersRoyaume.length === 0 && <span className="muted">aucun habitant vivant</span>}
        </div>
      </Card>

      <Card title="🏘️ Occupations par ville">
        <div className="table-wrap">
          <table className="tbl small">
            <thead><tr><th>Ville</th><th>Occupations (vivants)</th><th>Vivants</th></tr></thead>
            <tbody>
              {p.villes.map((v) => {
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

      <Card title={`👑 La cour de ${p.nom} — ${courVivants} vivants / ${pop.filter(estNoble).length} au total`}>
        {blocFiltres}
        <p className="muted small">
          Tous les nobles du joueur (dynastie dirigeante et familles nobles) — filtres et tri
          appliqués aussi au tableau « Population » ci-dessous.
        </p>
        <div className="table-wrap">
          <table className="tbl small">
            {entetes}
            <tbody>
              {rowsCour.length
                ? rowsCour.map((c) => renderLigne(c, true))
                : <tr><td colSpan={14} className="muted">aucun noble</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          « ➡ Donner à… » transfère le noble à un autre joueur (il y est éditable et y produit).
          « 💍 Marier avec… » unit deux nobles — y compris de joueurs différents — sans les
          déplacer : chacun reste dans la cour de son joueur.
        </p>
      </Card>

      <Card title={`Population de ${p.nom} — ${classiqueVivants} vivants / ${pop.filter((c) => !estNoble(c)).length} au total`}>
        <div className="table-wrap">
          <table className="tbl small">
            {entetes}
            <tbody>
              {rowsClassique.length
                ? rowsClassique.map((c) => renderLigne(c, false))
                : <tr><td colSpan={14} className="muted">aucun habitant</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          Population « classique » du joueur (hors nobles) ; une ville transférée à un autre
          joueur emmène ses habitants classiques, la cour reste auprès de son joueur. Titres
          d'éducation « {C.p.titreProfesseur} » : enseignés par un Professeur vivant du royaume.
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

      <GenealogyTree joueur={joueur} />
    </div>
  )
}
