// ══════════════════════════════════════════════════════════════════════
//  Vue joueur : ressources éditables, villes (taxes, bâtiments, gains),
//  tableau des bâtiments (effets automatiques), récap ressources du
//  dernier tour (apports cumulés), dynastie, récap démographique.
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import type { GameState, Player } from '../engine/types'
import { cfgOf, type Cfg } from '../engine/gameData'
import { detailsBatimentsJoueur } from '../engine/engine'
import { Card, NumberInput, Select, TextInput, Button, fmt, TAX_OPTIONS } from './ui'

export function PlayerView({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return <Card>Joueur introuvable.</Card>

  // Le mutateur reçoit (joueur, état) : la population vit dans
  // state.population[joueur], PAS dans le Player (sinon crash « reading »).
  const setPlayer = (fn: (p: Player, s: GameState) => void) =>
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (target) fn(target, s)
    })

  return (
    <div className="stack">
      <Card title={`${p.nom} — peuple ${p.peuple}, culture ${p.culture}, régime ${p.regime}`}
        right={<span className="muted small">Dynastie : {p.dynastie ? `${p.dynastie.nom} — ${p.dynastie.description}` : '—'}</span>}
      >
        <div className="grid-2">
          <Field label="Nom du joueur">
            <TextInput value={p.nom} onChange={(v) => setPlayer((x) => { x.nom = v })} />
          </Field>
          <Field label="Peuple (faction du classeur)">
            <Select
              value={p.peuple}
              options={C.peuples.map((n) => ({ value: n, label: n }))}
              onChange={(v) => setPlayer((x) => { x.peuple = v })}
            />
          </Field>
          <Field label="Culture du pays (capitale)">
            <Select
              value={p.culture}
              options={C.cultures.map((c) => ({ value: c.nom, label: `${c.nom} (hérédité ${String(c.heredite).toLowerCase()})` }))}
              onChange={(v) => setPlayer((x) => { x.culture = v })}
            />
          </Field>
          <Field label="Régime politique">
            <Select
              value={p.regime}
              options={C.regimes.map((r) => ({ value: r.nom, label: r.nom }))}
              onChange={(v) => setPlayer((x) => { x.regime = v })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Ressources (stock et production modifiables)">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Ressource</th><th>Stock</th><th>Production / tour</th></tr>
            </thead>
            <tbody>
              {C.ressources.map((r) => {
                const rs = p.resources[r] ?? { stock: 0, prod: 0 }
                return (
                  <tr key={r}>
                    <td><strong>{r}</strong></td>
                    <td className={(rs.stock < 0) ? 'neg' : ''}>
                      <NumberInput
                        value={rs.stock}
                        step={r === 'Habitants' ? 1 : 5}
                        onChange={(v) => setPlayer((x) => {
                          if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                          x.resources[r].stock = v
                        })}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={rs.prod}
                        step={0.5}
                        onChange={(v) => setPlayer((x) => {
                          if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                          x.resources[r].prod = v
                        })}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Villes">
        <div className="grid-2">
          {p.villes.map((ville, idx) => {
            const nbVivants = (state.population[p.n] ?? [])
              .filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom).length
            return (
              <div key={idx} className="mini">
                <Field label="Nom">
                  <TextInput
                    value={ville.nom}
                    onChange={(v) => setPlayer((x, s) => {
                      const ancien = x.villes[idx].nom
                      x.villes[idx].nom = v
                      // mettre à jour la ville des habitants
                      for (const c of s.population[joueur] ?? []) {
                        if (c.ville === ancien) c.ville = v
                      }
                    })}
                  />
                </Field>
                <div className="muted small">
                  Culture majoritaire : <strong>{ville.culture}</strong> · {nbVivants} habitant(s) vivant(s)
                </div>
                <Field label="Niveau de taxes">
                  <Select
                    value={ville.taxes}
                    options={TAX_OPTIONS}
                    onChange={(v) => setPlayer((x) => { x.villes[idx].taxes = v })}
                  />
                </Field>
                <div className="batiments">
                  <strong className="small">Bâtiments :</strong>
                  {ville.batiments.length === 0 && <span className="muted small"> aucun</span>}
                  {ville.batiments.map((b, bi) => (
                    <span key={bi} className="badge badge-info">
                      {b}
                      <button
                        className="badge-x"
                        title="Démolir"
                        onClick={() => setPlayer((x) => { x.villes[idx].batiments.splice(bi, 1) })}
                      >×</button>
                    </span>
                  ))}
                </div>
                <div className="add-bat">
                  <Select
                    value=""
                    options={[{ value: '', label: '+ ajouter un bâtiment…' },
                      ...C.batiments.map((b) => ({ value: b.nom, label: `${b.nom} (${b.categorie})` }))]}
                    onChange={(v) => v && setPlayer((x) => {
                      if (!x.villes[idx].batiments.includes(v)) x.villes[idx].batiments.push(v)
                    })}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <Button onClick={() => setPlayer((x) => {
          const nom = `Ville ${x.villes.length + 1}`
          x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', batiments: [] })
        })}>+ Ajouter une ville</Button>
      </Card>

      <Card title="Bâtiments — effets automatiques par tour">
        {(() => {
          const lignes = detailsBatimentsJoueur(p, C)
          if (lignes.length === 0) {
            return (
              <p className="muted">
                Aucun bâtiment construit. Ajoutez-en dans les villes ci-dessus :
                leurs effets s'appliquent automatiquement à chaque fin de tour.
              </p>
            )
          }
          const totaux: Record<string, number> = {}
          for (const l of lignes) {
            for (const [r, v] of Object.entries(l.effets)) totaux[r] = (totaux[r] ?? 0) + v
          }
          return (
            <div className="table-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Bâtiment</th><th>Ville(s)</th>
                    <th>Effets / tour</th><th>Garnison (statique)</th>
                  </tr>
                </thead>
                <tbody>
                  {lignes.map((l) => (
                    <tr key={l.nom}>
                      <td><strong>{l.nom}</strong></td>
                      <td className="muted">{l.villes.join(', ')}</td>
                      <td>
                        {l.remplacePar.length > 0
                          ? <span className="muted">remplacé par {l.remplacePar.join(', ')}</span>
                          : fmtEffets(l.effets, C)}
                      </td>
                      <td>{l.garnison > 0 ? `+${fmt(l.garnison)}` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}><strong>Total</strong></td>
                    <td><strong>{fmtEffets(totaux, C)}</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        })()}
        <p className="muted small">
          Les bâtiments sont pris en compte automatiquement à chaque fin de tour (étape
          « bâtiments » du moteur) : productions, consommations et remplacements (« Camp de
          travailleurs » remplace le Camp de bûcheron, etc.). La garnison est une valeur
          statique, elle n'est pas cumulée chaque tour.
        </p>
      </Card>

      <Card title="Récap ressources du dernier tour (apports cumulés)">
        {(() => {
          const row = [...state.history].reverse().find((h) => h.joueur === p.n && h.apports)
          if (!row || !row.apports) {
            return (
              <p className="muted">
                Lancez un tour pour voir apparaître le détail des apports (production,
                bâtiments, habitants, vassalité).
              </p>
            )
          }
          const { production, batiments, population, vassalite } = row.apports
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          const res = C.ressources.filter((r) =>
            val(production, r) !== 0 || val(batiments, r) !== 0
            || val(population, r) !== 0 || val(vassalite, r) !== 0)
          if (res.length === 0) {
            return <p className="muted">Aucun apport au tour {row.turn}.</p>
          }
          return (
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Ressource</th><th>Production</th><th>Bâtiments</th>
                    <th>Habitants</th><th>Vassalité</th><th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {res.map((r) => {
                    const total = val(production, r) + val(batiments, r)
                      + val(population, r) + val(vassalite, r)
                    return (
                      <tr key={r}>
                        <td><strong>{r}</strong></td>
                        <td>{fmtNum(val(production, r))}</td>
                        <td>{fmtNum(val(batiments, r))}</td>
                        <td>{fmtNum(val(population, r))}</td>
                        <td>{fmtNum(val(vassalite, r))}</td>
                        <td className={total < 0 ? 'neg' : ''}><strong>{fmtNum(total)}</strong></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })()}
        <p className="muted small">
          Tous les apports du tour sont additionnés : production de base (l'été double la
          Nourriture), effets automatiques des bâtiments, gains des habitants (titres et taxes,
          après coefficient « gains crédités au stock ») et tribut de vassalité (négatif = payé,
          positif = reçu). Les événements et cartes dynastie du tour figurent dans le journal.
        </p>
      </Card>

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
          <p className="muted">Lancez un tour pour voir apparaître le récapitulatif (équivalent J{joueur}!A35 du classeur).</p>
        )}
      </Card>
    </div>
  )
}

function dictToString(dict: Record<string, number>): string {
  const entries = Object.entries(dict).sort((a, b) => b[1] - a[1])
  if (entries.length === 0) return '—'
  return entries.map(([k, v]) => `${k} : ${v}`).join(', ')
}

/** Formate des effets par tour : « +2 Or, -10 Nourriture ». */
function fmtEffets(effets: Record<string, number>, C: Cfg): string {
  const entries = Object.entries(effets).filter(([, v]) => v !== 0)
    .sort((a, b) => C.ressources.indexOf(a[0]) - C.ressources.indexOf(b[0]))
  if (entries.length === 0) return '—'
  return entries.map(([r, v]) => `${v > 0 ? '+' : ''}${fmt(v)} ${r}`).join(', ')
}

/** Nombre avec signe explicite pour le récap (0 = —). */
function fmtNum(v: number): string {
  return v === 0 ? '—' : `${v > 0 ? '+' : ''}${fmt(v)}`
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

export { fmt }
