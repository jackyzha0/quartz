// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » (vue joueur) :
//   · dynastie régnante mise en avant (banner, dirigeant, héritier,
//     membres vivants, carte dynastie du tour),
//   · ressources : stock modifiable, production / tour CALCULÉE
//     (base + habitants + bâtiments + aménagements + vassalité),
//     tableau compact dépliable/repliable — invariant :
//     stock du tour N = stock du tour N−1 + production par tour,
//   · villes : bâtiments ET aménagements de terrain, bonus affichés,
//     coût affiché à la construction et déduit du stock automatiquement,
//   · tableau des constructions (effets automatiques par tour),
//   · récap ressources du dernier tour (apports cumulés),
//   · récap démographique.
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import type { Character, GameState, Player } from '../engine/types'
import { cfgOf, type Cfg } from '../engine/gameData'
import {
  detailsBatimentsJoueur, effetsTourBatiment, garnisonBatiment, coutBatiment,
  AMENAGEMENTS, amenagementDef, aCampDeBatisseurs, coutAmenagement,
  detailsAmenagementsJoueur, productionDetaillee,
} from '../engine/engine'
import { Card, NumberInput, Select, TextInput, Button, Badge, fmt, TAX_OPTIONS } from './ui'

export function PlayerView({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  // État d'affichage (avantd les retours anticipés : règles des hooks).
  const [resOuvert, setResOuvert] = useState(false)
  const [baseOuvert, setBaseOuvert] = useState(false)
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

  // ── Production / tour détaillée (calculée, non modifiable) ────────────
  const prodDetail = productionDetaillee(state, p, C)

  // ── Construction d'un bâtiment / aménagement ─────────────────────────
  // Ajoute la construction à la ville, affiche le coût et le déduit
  // automatiquement du stock une fois la construction effectuée.
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement') =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      const cout = type === 'batiment' ? coutBatiment(nom, C) : coutAmenagement(t)
      const cible = type === 'batiment'
        ? ville.batiments
        : (ville.amenagements ?? (ville.amenagements = []))
      if (cible.includes(nom)) return
      cible.push(nom)
      const parts: string[] = []
      for (const [res, v] of Object.entries(cout)) {
        const rs = t.resources[res]
        if (rs) rs.stock -= v
        if (v > 0) parts.push(`${fmt(v)} ${res}`)
      }
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🏗 ${nom} construit(e) à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}.`,
      })
    })

  // ── Dynastie régnante (mise en avant) ─────────────────────────────────
  const vivants = (state.population[p.n] ?? []).filter((c) => c.statut !== 'Décédé')
  const dirigeant = vivants.find((c) => c.titre === C.p.titreDirigeant)
  const heritier = vivants.find((c) => c.titre === C.p.titreHeritierStr)
  const dynRoyale = dirigeant?.dynastie ?? p.dynastie?.nom ?? null
  const membresDynastie = dynRoyale && dynRoyale !== C.p.dynastieRoturier
    ? vivants.filter((c) => c.dynastie === dynRoyale)
    : []
  const pers = (c: Character) => `${c.prenom} ${c.nom} (${c.age} ans${c.ville ? `, ${c.ville}` : ''})`

  const coutAm = coutAmenagement(p)
  const reducBatisseurs = aCampDeBatisseurs(p)

  return (
    <div className="stack">
      <Card title={`${p.nom} — peuple ${p.peuple}, culture ${p.culture}, régime ${p.regime}`}>
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

      {/* ═══ Dynastie régnante — mise en avant ═══ */}
      <Card
        title="⚜ Dynastie"
        right={<span className="muted small">{membresDynastie.length} membre(s) vivant(s)</span>}
      >
        <div className="dynastie-banner">
          <div className="dynastie-nom">{dynRoyale ?? 'Aucune dynastie régnante'}</div>
          <div className="grid-2">
            <div>
              <span className="muted small">{C.p.titreDirigeant} : </span>
              {dirigeant
                ? <strong>{pers(dirigeant)}</strong>
                : <span className="neg small">poste vacant</span>}
              {' · '}
              <span className="muted small">{C.p.titreHeritierStr} : </span>
              {heritier
                ? <span>{pers(heritier)}</span>
                : <span className="muted small">aucun</span>}
            </div>
            <div>
              <span className="muted small">Carte dynastie : </span>
              {p.dynastie
                ? <span><strong>{p.dynastie.nom}</strong> — {p.dynastie.description}</span>
                : <span className="muted small">aucune (lancez un tour)</span>}
            </div>
          </div>
        </div>
        {membresDynastie.length > 0 && (
          <div className="badges-wrap">
            {membresDynastie.slice(0, 12).map((c) => (
              <Badge key={c.id} tone={c.titre ? 'info' : 'neutral'}>
                {pers(c)}{c.titre ? ` — ${c.titre}` : ''}
              </Badge>
            ))}
            {membresDynastie.length > 12 && (
              <Badge tone="neutral">+{membresDynastie.length - 12} autre(s)</Badge>
            )}
          </div>
        )}
      </Card>

      {/* ═══ Ressources : stock modifiable, production calculée ═══ */}
      <Card
        title="Ressources (stock modifiable)"
        right={(
          <Button tone="normal" onClick={() => setResOuvert(!resOuvert)}>
            {resOuvert ? '▲ Replier' : '▼ Déplier'}
          </Button>
        )}
      >
        {!resOuvert && (
          <div className="badges-wrap">
            {C.ressources
              .filter((r) => (p.resources[r]?.stock ?? 0) !== 0)
              .map((r) => (
                <Badge key={r} tone={(p.resources[r]?.stock ?? 0) < 0 ? 'bad' : 'neutral'}>
                  {r} : {fmt(p.resources[r]?.stock ?? 0)}
                </Badge>
              ))}
            <span className="muted small">— dépliez pour modifier le stock et voir la production par tour.</span>
          </div>
        )}
        {resOuvert && (
          <>
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Ressource</th>
                    <th>Stock (modifiable)</th>
                    <th>Production / tour (calculée)</th>
                  </tr>
                </thead>
                <tbody>
                  {C.ressources.map((r) => {
                    const rs = p.resources[r] ?? { stock: 0, prod: 0 }
                    const prod = prodDetail.total[r] ?? 0
                    return (
                      <tr key={r}>
                        <td><strong>{r}</strong></td>
                        <td className={rs.stock < 0 ? 'neg' : ''}>
                          <NumberInput
                            value={rs.stock}
                            step={r === 'Habitants' ? 1 : 5}
                            onChange={(v) => setPlayer((x) => {
                              if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                              x.resources[r].stock = v
                            })}
                          />
                        </td>
                        <td className={prod < 0 ? 'neg' : ''}>
                          <strong>{prod === 0 ? '—' : fmtNum(prod)}</strong>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="muted small">
              Invariant : le stock du tour N est le stock du tour N−1 plus la
              production par tour (appliquée automatiquement en fin de tour). La
              production / tour est calculée : elle recense l'ensemble des apports
              (production de base, habitants, bâtiments, aménagements, vassalité).
            </p>
            <button className="btn btn-normal small" onClick={() => setBaseOuvert(!baseOuvert)}>
              {baseOuvert ? '▲' : '▼'} Réglage avancé : production de base du pays
            </button>
            {baseOuvert && (
              <div className="badges-wrap">
                {C.ressources.map((r) => (
                  <label key={r} className="field" style={{ minWidth: 130 }}>
                    <span className="field-label">{r}</span>
                    <NumberInput
                      value={p.resources[r]?.prod ?? 0}
                      step={0.5}
                      onChange={(v) => setPlayer((x) => {
                        if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                        x.resources[r].prod = v
                      })}
                    />
                  </label>
                ))}
              </div>
            )}
          </>
        )}
      </Card>

      {/* ═══ Villes : bâtiments + aménagements ═══ */}
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

                {/* Bâtiments : bonus affichés, coût déduit à la construction */}
                <div className="mini-title">Bâtiments</div>
                {ville.batiments.length === 0 && <div className="muted small">aucun</div>}
                {ville.batiments.map((b, bi) => {
                  const effets = effetsTourBatiment(b, C)
                  const garnison = garnisonBatiment(b, C)
                  const resume = [
                    Object.keys(effets).length > 0 ? fmtEffets(effets, C) : '',
                    garnison > 0 ? `Garnison +${garnison}` : '',
                  ].filter(Boolean).join(' · ')
                  return (
                    <div key={bi} className="ligne-construction">
                      <span className="badge badge-info">
                        {b}
                        <button
                          className="badge-x"
                          title="Démolir"
                          onClick={() => setPlayer((x) => { x.villes[idx].batiments.splice(bi, 1) })}
                        >×</button>
                      </span>
                      <span className="muted small">{resume || '—'}</span>
                    </div>
                  )
                })}
                <div className="add-bat">
                  <Select
                    value=""
                    options={[{ value: '', label: '+ construire un bâtiment (coût déduit du stock)…' },
                      ...C.batiments.map((b) => {
                        const cout = coutBatiment(b.nom, C)
                        return { value: b.nom, label: cout && Object.keys(cout).length ? `${b.nom} — ${fmtCout(cout)}` : b.nom }
                      })]}
                    onChange={(v) => v && construire(idx, v, 'batiment')}
                  />
                </div>

                {/* Aménagements : bonus affichés, coût déduit à la construction */}
                <div className="mini-title">
                  Aménagements
                  <span className="muted small">
                    {' '}· coût : {fmtCout(coutAm)}
                    {reducBatisseurs ? ' (réduit par le Camp de bâtisseurs)' : ''}
                  </span>
                </div>
                {(ville.amenagements ?? []).length === 0 && <div className="muted small">aucun</div>}
                {(ville.amenagements ?? []).map((a, ai) => {
                  const def = amenagementDef(a)
                  return (
                    <div key={ai} className="ligne-construction">
                      <span className="badge badge-good">
                        {a}
                        <button
                          className="badge-x"
                          title="Retirer"
                          onClick={() => setPlayer((x) => {
                            const list = x.villes[idx].amenagements ?? (x.villes[idx].amenagements = [])
                            list.splice(ai, 1)
                          })}
                        >×</button>
                      </span>
                      <span className="muted small">
                        {def ? `${def.effet}${def.eteSeulement ? ' (été uniquement)' : ''}` : '—'}
                      </span>
                    </div>
                  )
                })}
                <div className="add-bat">
                  <Select
                    value=""
                    options={[{ value: '', label: '+ aménager une case (coût déduit du stock)…' },
                      ...AMENAGEMENTS.map((a) => ({
                        value: a.nom,
                        label: `${a.nom} (${a.terrain}) — ${fmtCout(coutAm)}`,
                      }))]}
                    onChange={(v) => v && construire(idx, v, 'amenagement')}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <Button onClick={() => setPlayer((x) => {
          const nom = `Ville ${x.villes.length + 1}`
          x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', batiments: [], amenagements: [] })
        })}>+ Ajouter une ville</Button>
      </Card>

      {/* ═══ Constructions : effets automatiques par tour ═══ */}
      <Card title="Bâtiments et aménagements — effets automatiques par tour">
        {(() => {
          const lignes = detailsBatimentsJoueur(p, C)
          const lignesAm = detailsAmenagementsJoueur(p, state.saison)
          if (lignes.length === 0 && lignesAm.length === 0) {
            return (
              <p className="muted">
                Aucune construction. Ajoutez des bâtiments ou des aménagements dans
                les villes ci-dessus : leurs effets s'appliquent automatiquement à
                chaque fin de tour.
              </p>
            )
          }
          const totaux: Record<string, number> = {}
          for (const l of lignes) {
            for (const [r, v] of Object.entries(l.effets)) totaux[r] = (totaux[r] ?? 0) + v
          }
          const totauxAm: Record<string, number> = {}
          for (const l of lignesAm) {
            for (const [r, v] of Object.entries(l.effets)) totauxAm[r] = (totauxAm[r] ?? 0) + v
          }
          return (
            <>
              {lignes.length > 0 && (
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
                        <td colSpan={2}><strong>Total bâtiments</strong></td>
                        <td><strong>{fmtEffets(totaux, C)}</strong></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
              {lignesAm.length > 0 && (
                <div className="table-wrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Aménagement</th><th>Terrain</th><th>Ville(s)</th>
                        <th>Effets / tour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lignesAm.map((l) => (
                        <tr key={l.nom}>
                          <td><strong>{l.nom}</strong></td>
                          <td className="muted">{l.terrain}</td>
                          <td className="muted">{l.villes.join(', ')}</td>
                          <td>
                            {l.horsSaison
                              ? <span className="muted">ne produit qu'en été (hors saison)</span>
                              : fmtEffets(l.effets, C)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3}><strong>Total aménagements ({state.saison.toLowerCase()})</strong></td>
                        <td><strong>{fmtEffets(totauxAm, C)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </>
          )
        })()}
        <p className="muted small">
          Les bâtiments et aménagements sont pris en compte automatiquement à
          chaque fin de tour (étapes « bâtiments » et « aménagements » du moteur) :
          productions, consommations et remplacements (« Camp de travailleurs »
          remplace le Camp de bûcheron, etc.). La garnison est une valeur statique,
          elle n'est pas cumulée chaque tour. Les aménagements de terrain (Champ,
          Rizière) ne produisent qu'en été.
        </p>
      </Card>

      {/* ═══ Récap ressources du dernier tour (apports cumulés) ═══ */}
      <Card title="Récap ressources du dernier tour (apports cumulés)">
        {(() => {
          const row = [...state.history].reverse().find((h) => h.joueur === p.n && h.apports)
          if (!row || !row.apports) {
            return (
              <p className="muted">
                Lancez un tour pour voir apparaître le détail des apports (production,
                bâtiments, aménagements, habitants, vassalité).
              </p>
            )
          }
          const { production, batiments, amenagements, population, vassalite } = row.apports
          const amen = amenagements ?? {}
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          const res = C.ressources.filter((r) =>
            val(production, r) !== 0 || val(batiments, r) !== 0 || val(amen, r) !== 0
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
                    <th>Aménagements</th><th>Habitants</th><th>Vassalité</th><th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {res.map((r) => {
                    const total = val(production, r) + val(batiments, r) + val(amen, r)
                      + val(population, r) + val(vassalite, r)
                    return (
                      <tr key={r}>
                        <td><strong>{r}</strong></td>
                        <td>{fmtNum(val(production, r))}</td>
                        <td>{fmtNum(val(batiments, r))}</td>
                        <td>{fmtNum(val(amen, r))}</td>
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
          Nourriture), effets automatiques des bâtiments, effets des aménagements de
          terrain, gains des habitants (titres et taxes, après coefficient « gains
          crédités au stock ») et tribut de vassalité (négatif = payé, positif = reçu).
          Les événements et cartes dynastie du tour figurent dans le journal.
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

/** Formate un coût de construction : « 25 Or + 4 Fer ». */
function fmtCout(cout: Record<string, number>): string {
  const entries = Object.entries(cout).filter(([, v]) => v > 0)
  if (entries.length === 0) return 'gratuit'
  return entries.map(([r, v]) => `${fmt(v)} ${r}`).join(' + ')
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
