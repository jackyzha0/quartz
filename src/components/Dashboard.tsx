// ══════════════════════════════════════════════════════════════════════
//  Tableau de bord : vue d'ensemble des 8 joueurs + conditions de victoire
//  (chapitre XII du livret)
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import { VICTORY_TEXT } from '../engine/gameData2'
import { checkVictory } from '../engine/victory'
import { Card, fmt, Select } from './ui'
import { HistogrammeEmpile, CourbeRessource } from './charts'
import type { GroupeChart, SerieCourbe } from './charts'

const RESSOURCES_VUES = ['Or', 'Nourriture', 'Science', 'Tourisme', 'Garnison', 'Habitants']
const RESSOURCES_BASE = ['Bétail', 'Bois', 'Charbon', 'Fer', 'Pierre', 'Soie']

export function Dashboard() {
  const { state } = useGame()
  const [ressourceCourbe, setRessourceCourbe] = React.useState<string>('Or')
  const RESOURCES = state ? cfgOf(state.config).ressources : cfgOf(undefined).ressources
  if (!state) return null

  const victory = checkVictory(state)

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
      <Card title="Ressources des joueurs (stock / production)">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Peuple / Culture</th>
                <th>Pop.</th>
                {RESSOURCES_VUES.map((r) => <th key={r}>{r}</th>)}
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
                        <td key={r} className={low ? 'neg' : ''}>
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
        <HistogrammeEmpile groupes={groupesPour(RESSOURCES_BASE)} />
        <p className="muted small">
          Pour chaque joueur : segment coloré = stock, segment gris clair au-dessus = production
          du tour (les productions négatives, ex. Nourriture, passent sous l'axe zéro).
        </p>
      </Card>

      <div className="grid-2x2">
        <Card title="Or & Nourriture — Stock & Production">
          <HistogrammeEmpile groupes={groupesPour(['Or', 'Nourriture'])} largeur={460} />
        </Card>

        <Card title="Science — Stock & Production">
          <HistogrammeEmpile groupes={groupesPour(['Science'])} largeur={460} />
        </Card>

        <Card title="Habitants — Stock (population vivante)">
          <HistogrammeEmpile groupes={groupeHabitants} avecProd={false} largeur={460} />
          <p className="muted small">Population vivante totale par joueur (décès exclus).</p>
        </Card>

        <Card title="Tourisme — Stock">
          <HistogrammeEmpile groupes={groupesPour(['Tourisme'])} avecProd={false} largeur={460} />
        </Card>
      </div>

      <Card
        title="Évolution par tour — Stock & Production"
        right={
          <Select
            value={ressourceCourbe}
            options={RESOURCES.map((r) => ({ value: r, label: r }))}
            onChange={(v) => setRessourceCourbe(v)}
          />
        }
      >
        <CourbeRessource ressource={ressourceCourbe} series={seriesCourbe} />
      </Card>

      <Card title="Cartes dynastie du tour">
        <div className="grid-4">
          {state.players.map((p) => (
            <div key={p.n} className="mini">
              <strong>{p.nom}</strong>
              {p.dynastie ? (
                <>
                  <div className="mini-title">{p.dynastie.nom}</div>
                  <div className="muted small">{p.dynastie.description}</div>
                </>
              ) : (
                <div className="muted small">pas encore tirée</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Conditions de victoire (chapitre XII du livret)">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Joueur</th>
                {VICTORY_TEXT.map((v) => <th key={v.nom} title={v.texte}>{v.nom}</th>)}
              </tr>
            </thead>
            <tbody>
              {victory.map((v) => (
                <tr key={v.joueur}>
                  <td><strong>{v.nom}</strong></td>
                  {(['militaire', 'economique', 'culturelle', 'scientifique', 'demographique', 'dynastique'] as const).map((k) => (
                    <td key={k} className="center">{v[k] ? '👑' : '·'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="muted small">
          {VICTORY_TEXT.map((v) => <li key={v.nom}><strong>{v.nom}</strong> — {v.texte}</li>)}
        </ul>
      </Card>

      <Card title="Toutes les ressources">
        <div className="table-wrap">
          <table className="tbl small">
            <thead>
              <tr>
                <th>Joueur</th>
                {RESOURCES.map((r) => <th key={r}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {state.players.map((p) => (
                <tr key={p.n}>
                  <td><strong>{p.nom}</strong></td>
                  {RESOURCES.map((r) => (
                    <td key={r} className={(p.resources[r]?.stock ?? 0) < 0 ? 'neg' : ''}>
                      {fmt(p.resources[r]?.stock ?? 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
