// ══════════════════════════════════════════════════════════════════════
//  Tableau de bord : vue d'ensemble des 8 joueurs + conditions de victoire
//  (chapitre XII du livret)
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import { cfgOf, couleurRessource, fondRessource } from '../engine/gameData'
import { VICTORY_TEXT } from '../engine/gameData2'
import {
  cocherLaurier, victoireAtteinte, victoryProgress, victoryLabels,
} from '../engine/victory'
import { Card, fmt } from './ui'
import { HistogrammeEmpile, CourbeRessource, Radar } from './charts'
import type { GroupeChart, SerieCourbe, SerieRadar } from './charts'

const RESSOURCES_VUES = ['Or', 'Nourriture', 'Science', 'Tourisme', 'Garnison', 'Habitants']
const RESSOURCES_BASE = ['Bétail', 'Bois', 'Charbon', 'Fer', 'Pierre', 'Soie']

export function Dashboard() {
  const { state, update } = useGame()
  const [ressourceCourbe, setRessourceCourbe] = React.useState<string>('Or')
  const RESOURCES = state ? cfgOf(state.config).ressources : cfgOf(undefined).ressources
  if (!state) return null

  // ── Couleurs paramétrables (marqueur (o)) : palette de la partie ────
  const C = cfgOf(state.config)
  const cR = (nom: string) => couleurRessource(nom, C)
  // Fond teinté des colonnes (retour Thibaut, marqueur (r) : les
  // ressources sont colorées aussi dans les tableaux de l'accueil).
  const fR = (nom: string) => fondRessource(nom, C)
  const couleursJoueurs = C.couleurs.joueurs

  // ── Lauriers de victoire : référentiel + vainqueurs éventuels ──────
  const victoiresRef = C.config.victoires
  const vainqueurs = victoireAtteinte(state)

  // ── Données du radar : progression de chaque joueur par voie ───────
  const axesVictoire = victoryLabels(state)
  const seriesRadar: SerieRadar[] = victoryProgress(state).map((v) => ({
    joueur: v.joueur,
    nom: v.nom,
    points: axesVictoire.map((a) => ({ ratio: v.valeurs[a.key], detail: v.details[a.key] })),
  }))

  // ── Données des histogrammes (stock / production par joueur) ─────────
  const groupesPour = (ressources: string[]): GroupeChart[] =>
    ressources.map((r) => ({
      ressource: r,
      barres: state.players.map((p) => ({
        joueur: p.n,
        nom: p.nom,
        stock: p.resources[r]?.stock ?? 0,
        prod: p.resources[r]?.prod ?? 0,
      })),
    }))

  const popVivante = (n: number) =>
    (state.population[n] ?? []).filter((c) => c.statut !== 'Décédé').length

  const groupeHabitants: GroupeChart[] = [{
    ressource: 'Habitants',
    barres: state.players.map((p) => ({
      joueur: p.n,
      nom: p.nom,
      stock: popVivante(p.n),
      prod: 0,
    })),
  }]

  // ── Données de la courbe : historique + point « vivant » du tour courant ──
  const seriesCourbe: SerieCourbe[] = state.players.map((p) => {
    const pts = state.history
      .filter((h) => h.joueur === p.n)
      .sort((a, b) => a.turn - b.turn)
      .map((h) => ({
        turn: h.turn,
        stock: h.stocks[ressourceCourbe] ?? 0,
        prod: h.prods[ressourceCourbe] ?? 0,
      }))
    const live = {
      turn: state.turn,
      stock: p.resources[ressourceCourbe]?.stock ?? 0,
      prod: p.resources[ressourceCourbe]?.prod ?? 0,
    }
    if (pts.length === 0 || pts[pts.length - 1].turn !== live.turn) pts.push(live)
    else pts[pts.length - 1] = live
    return { joueur: p.n, nom: p.nom, points: pts }
  })

  return (
    <div className="stack">
      <Card title="Toutes les ressources">
        <div className="table-wrap">
          <table className="tbl small">
            <thead>
              <tr>
                <th>Joueur</th>
                {RESOURCES.map((r) => (
                  <th key={r}><span className="dot-res" style={{ background: cR(r) }} />{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.players.map((p) => (
                <tr key={p.n}>
                  <td><strong>{p.nom}</strong></td>
                  {RESOURCES.map((r) => (
                    <td key={r} style={{ background: fR(r) }} className={(p.resources[r]?.stock ?? 0) < 0 ? 'neg' : ''}>
                      {fmt(p.resources[r]?.stock ?? 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Ressources des joueurs (stock / production)">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Peuple / Culture</th>
                <th>Pop.</th>
                {RESSOURCES_VUES.map((r) => (
                  <th key={r}><span className="dot-res" style={{ background: cR(r) }} />{r}</th>
                ))}
                <th>Villes</th>
                <th>Armées</th>
              </tr>
            </thead>
            <tbody>
              {state.players.map((p, i) => {
                const pop = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé').length
                return (
                  <tr key={p.n}>
                    <td><strong>{p.nom}</strong></td>
                    <td className="muted">{p.peuple} · {p.culture}</td>
                    <td>{pop}</td>
                    {RESSOURCES_VUES.map((r) => {
                      const rs = p.resources[r]
                      const low = (r === 'Nourriture' && (rs?.stock ?? 0) < 0)
                      return (
                        <td key={r} style={{ background: fR(r) }} className={low ? 'neg' : ''}>
                          {fmt(rs?.stock ?? 0)} <span className="muted">/ {fmt(rs?.prod ?? 0)}</span>
                        </td>
                      )
                    })}
                    <td>{p.villes.length}</td>
                    <td>{p.armees.length === 0 ? '—' : p.armees.map((a) => a.nom).join(', ')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          La Nourriture en négatif est fidèle au classeur d'origine : la production de départ est nulle et
          chaque habitant vivant consomme 1 Nourriture par tour (cf. README §5.3).
        </p>
      </Card>

      <Card title="Ressources de base — Stock & Production">
        <HistogrammeEmpile groupes={groupesPour(RESSOURCES_BASE)}
          couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
        <p className="muted small">
          Pour chaque joueur : segment coloré = stock, segment gris clair au-dessus = production
          du tour (les productions négatives, ex. Nourriture, passent sous l'axe zéro).
        </p>
      </Card>

      <div className="grid-2x2">
        <Card title="Or & Nourriture — Stock & Production">
          <HistogrammeEmpile groupes={groupesPour(['Or', 'Nourriture'])} largeur={460}
            couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
        </Card>

        <Card title="Science — Stock & Production">
          <HistogrammeEmpile groupes={groupesPour(['Science'])} largeur={460}
            couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
        </Card>

        <Card title="Habitants — Stock (population vivante)">
          <HistogrammeEmpile groupes={groupeHabitants} avecProd={false} largeur={460}
            couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
          <p className="muted small">Population vivante totale par joueur (décès exclus).</p>
        </Card>

        <Card title="Tourisme — Stock">
          <HistogrammeEmpile groupes={groupesPour(['Tourisme'])} avecProd={false} largeur={460}
            couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
        </Card>
      </div>

      <Card
        title="Évolution par tour — Stock & Production"
        right={
          <div className="res-chips">
            {RESOURCES.map((r) => (
              <button
                key={r}
                type="button"
                className={'res-chip' + (r === ressourceCourbe ? ' res-chip-active' : '')}
                style={{ borderColor: cR(r) }}
                onClick={() => setRessourceCourbe(r)}
              >
                <span className="dot-res" style={{ background: cR(r) }} />
                {r}
              </button>
            ))}
          </div>
        }
      >
        <CourbeRessource ressource={ressourceCourbe} series={seriesCourbe}
          couleursJoueurs={couleursJoueurs} couleurRessource={cR} />
      </Card>

      <Card title="Voies de victoire — Lauriers I à IV (chapitre XII, refonte 2026-10-14)">
        {vainqueurs.length > 0 && (
          <div className="pos mb" style={{ fontWeight: 'bold' }}>
            👑 Victoire : {vainqueurs.map((v) => `${v.nom} (${v.voie})`).join(' · ')}
          </div>
        )}
        <Radar axes={axesVictoire.map((a) => a.label)} series={seriesRadar}
          couleursJoueurs={couleursJoueurs} />
        <p className="muted small">
          0 % au centre, 100 % au bord = Laurier IV. Cochez les Lauriers dans le tableau
          ci-dessous (ordre strict) ; chaque Laurier I-III validé déclenche une crise.
        </p>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Joueur</th>
                {victoiresRef.map((v) => <th key={v.voie}>{v.voie}</th>)}
              </tr>
            </thead>
            <tbody>
              {state.players.map((p) => (
                <tr key={p.n}>
                  <td><strong>{p.nom}</strong></td>
                  {victoiresRef.map((v) => {
                    const n = p.lauriers?.[v.voie] ?? 0
                    return (
                      <td key={v.voie} className="center">
                        {v.lauriers.map((l, i) => {
                          const niveau = i + 1
                          const coche = niveau <= n
                          // cliquable : le prochain Laurier (cocher) ou le dernier validé (annuler)
                          const actif = niveau === n + 1 || (coche && niveau === n)
                          return (
                            <span
                              key={niveau}
                              title={actif ? `${l.laurier} — ${l.condition}` : l.condition}
                              onClick={actif ? () => update((s) => {
                                const t = s.players.find((q) => q.n === p.n)
                                if (t) cocherLaurier(s, t, v.voie, coche ? niveau - 1 : niveau)
                              }) : undefined}
                              style={{
                                cursor: actif ? 'pointer' : 'default',
                                opacity: actif ? 1 : 0.45,
                                fontSize: '1.05em',
                                marginRight: 2,
                              }}
                            >
                              {coche ? '☑' : '☐'}
                            </span>
                          )
                        })}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="muted small">
          {VICTORY_TEXT.map((v) => <li key={v.nom}><strong>{v.nom}</strong> — {v.texte}</li>)}
        </ul>
      </Card>
    </div>
  )
}
