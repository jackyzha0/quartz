// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » (vue joueur) :
//   · ressources : panneau TRÈS LÉGER docké à droite, dépliable —
//     stock modifiable, production / tour CALCULÉE (base + habitants +
//     bâtiments + aménagements + autres + régimes & cultures + vassalité)
//     — invariant : stock du tour N = stock du tour N−1 + production
//     par tour,
//   · culture du pays — encadré « bonus automatiques » : règle de pays
//     chiffrée (ex. Lunisme : +4 Tourisme par ville luniste dans le
//     monde) avec le nombre de villes de cette culture et le bonus
//     adapté en conséquence (appliqué à chaque fin de tour, canal
//     « régimes & cultures » du récap ressources ; +N Science par
//     construction crédité à la construction),
//   · villes : rang d'habitation, AMÉNAGEMENTS au-dessus des
//     BÂTIMENTS, puis catégorie AUTRES — coût, production et
//     description EXACTS du référentiel (table `constructions`),
//     coût déduit du stock à la construction (+ Science par
//     construction selon la règle de culture, ex. Déisme),
//   · cultures de chaque ville : culture majoritaire + toutes les
//     autres cultures présentes avec leur nombre d'habitants, et
//     GARNISON DES HABITATIONS notée sous la culture (bâtiments +
//     loi du régime),
//   · bas de chaque ville : ce que les taxes rapportent — la
//     production en ressources des villageois (les taxes modulent
//     TOUTES les ressources, pas seulement l'Or),
//   · bas de chaque cadre de ville : sa PRODUCTION en ressources
//     (bâtiments + aménagements + autres + villageois + consommation
//     de l'habitation, total par tour),
//   · récap des ressources par tour : chaque ressource et D'OÙ elle
//     provient (tableau canal par canal + origine de chaque apport),
//   · récap ressources du dernier tour (apports cumulés, canal
//     « régimes & cultures » inclus),
//   · récap démographique.
//  Le cadre « Joueur N » (identité du joueur) vit sur la page
//  « Royaume ».
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import type { GameState, Player, AutreDef } from '../engine/types'
import { cfgOf, cultureDef, type Cfg } from '../engine/gameData'
import {
  effetsTourBatiment, garnisonBatiment, coutBatiment,
  batimentsConstructionsRefs, constructionsRefs, amenagementRef, aCampDeBatisseurs,
  coutAmenagement,
  productionDetaillee, detailGainsVille, parseCoutTexte,
  garnisonHabitationVille, nomRang, typeVille, habitationDef,
  rangsDisponibles, consommationsVille, tourismeStatiqueBatiment,
  detailCulturePays, productionVille, provenancesApports,
  type ProductionDetail,
} from '../engine/engine'
import { Card, NumberInput, Select, TextInput, Button, Badge, fmt, TAX_OPTIONS } from './ui'

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

  // ── Production / tour détaillée (calculée, non modifiable) ────────────
  const prodDetail = productionDetaillee(state, p, C)

  // ── Construction d'un bâtiment / aménagement (coût déduit du stock) ────
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement', groupe?: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      const cout = type === 'batiment'
        ? coutBatiment(nom, C, groupe)
        : coutAmenagement(t, C.config, type === 'amenagement' ? nom : undefined)
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
      // Règle de culture : ex. Déisme — +N Science par bâtiment construit
      // (champ paramétrable, onglets « Cultures & régimes »).
      const sci = type === 'batiment' ? (cultureDef(t.culture, C.config)?.scienceParConstruction ?? 0) : 0
      if (sci > 0) {
        const rsSci = t.resources['Science']
        if (rsSci) rsSci.stock += sci
      }
      // Tourisme : valeur d'état acquise UNE FOIS à la construction
      // (ex. « Chapelle : Tourisme +35 ») — pas un flux par tour.
      const tour = type === 'batiment' ? tourismeStatiqueBatiment(nom, C) : 0
      if (tour > 0) {
        const rsTour = t.resources['Tourisme']
        if (rsTour) rsTour.stock += tour
      }
      s.log.push({
        turn: s.turn, type: 'Système', joueur: t.n,
        texte: `🏗 ${nom} construit(e) à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}${sci > 0 ? ` — règle de culture : +${fmt(sci)} Science` : ''}${tour > 0 ? ` — Tourisme +${fmt(tour)} (valeur fixe)` : ''}.`,
      })
    })

  // ── Référentiel des constructions (coût / production / description exacts) ──
  const refs = constructionsRefs(C.config)
  const amRefs = refs.filter((r) => r.categorie === 'Aménagement')
  const batRefs = batimentsConstructionsRefs(C)
  const batParGroupe = ['Ville', 'Château', 'Capitale'].map((groupe) => ({
    label: `Bâtiments de ${groupe.toLowerCase()}`,
    options: batRefs
      .filter((b) => b.groupe === groupe)
      .map((b) => {
        const cout = parseCoutTexte(b.cout)
        return {
          value: `${groupe}|${b.nom}` as const,
          label: `${b.nom} — ${fmtCout(cout)}`,
        }
      }),
  }))

  const coutAm = coutAmenagement(p, C.config)
  const reducBatisseurs = aCampDeBatisseurs(p)

  return (
    <div className="stack">
      {/* Panneau Ressources — très léger, docké à droite, dépliable */}
      <RessourcesDock p={p} C={C} prodDetail={prodDetail} setPlayer={setPlayer} />

      {/* ═══ Culture du pays : règle de pays chiffrée (ex. Lunisme —
          +4 Tourisme par ville luniste dans le monde) avec le NOMBRE de
          villes de cette culture et le bonus ADAPTÉ en conséquence —
          appliqué automatiquement à chaque fin de tour (canal
          « régimes & cultures » du récap ressources). ═══ */}
      <Card title="🛕 Culture du pays — bonus automatiques">
        {(() => {
          const cult = cultureDef(p.culture, C.config)
          const lois = detailCulturePays(state, p, C)
          const traits = cult
            ? `hérédité ${String(cult.heredite).toLowerCase()} · martialité ${String(cult.martialite).toLowerCase()} · mariages homosexuels ${cult.homoAutorisee ? 'autorisés' : 'interdits'}`
            : ''
          return (
            <div className="stack">
              <div>
                <strong>{p.culture}</strong>
                {cult?.reglePays && <span className="muted small"> — {cult.reglePays}</span>}
              </div>
              {traits && <div className="muted small">{traits}</div>}
              {lois.length > 0 ? lois.map((d) => (
                <div key={d.res}>
                  <Badge tone="good">+{fmt(d.total)} {d.res} / tour</Badge>{' '}
                  <span className="muted small">
                    règle de pays : +{fmt(d.parVille)} {d.res} × {d.nbVillesMonde} ville(s)
                    « {p.culture} » dans le monde (dont {d.nbVillesPerso} chez toi) —
                    appliqué automatiquement à chaque fin de tour, colonne
                    « Régimes & cultures » du récap ressources.
                  </span>
                </div>
              )) : (
                <p className="muted small">
                  Pas de règle de pays chiffrée pour cette culture : ses attributs
                  (hérédité, martialité, fécondité, mariages homosexuels) restent
                  appliqués par le moteur (titres, armées, naissances).
                </p>
              )}
              {cult?.scienceParConstruction ? (
                <div>
                  <Badge tone="good">+{fmt(cult.scienceParConstruction)} Science / construction</Badge>{' '}
                  <span className="muted small">
                    chaque construction de bâtiment crédite ce bonus une fois
                    (journal 🏗) — valeur fixe, pas un apport par tour.
                  </span>
                </div>
              ) : null}
            </div>
          )
        })()}
      </Card>

      {/* ═══ Villes : aménagements, bâtiments, autres, cultures, taxes ═══ */}
      <Card title="Villes">
        <div className="grid-2">
          {p.villes.map((ville, idx) => {
            const nbVivants = (state.population[p.n] ?? [])
              .filter((c) => c.statut !== 'Décédé' && c.ville === ville.nom).length
            // Toutes les cultures présentes dans la ville (nombre d'habitants)
            const cultures: Record<string, number> = {}
            for (const c of state.population[p.n] ?? []) {
              if (c.statut === 'Décédé' || c.ville !== ville.nom) continue
              cultures[c.culture] = (cultures[c.culture] ?? 0) + 1
            }
            const culturesTriees = Object.entries(cultures).sort(
              (a, b) => (a[0] === ville.culture ? -1 : b[0] === ville.culture ? 1 : b[1] - a[1]),
            )
            // Ce que les taxes rapportent (production des villageois)
            const tg = detailGainsVille(state, p, ville, C)
            const resTaxes = C.ressources.filter((r) =>
              (tg.titres[r] ?? 0) !== 0 || (tg.taxes[r] ?? 0) !== 0 || (tg.conso[r] ?? 0) !== 0 || (tg.net[r] ?? 0) !== 0)
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
                {culturesTriees.length > 0 && (
                  <div className="small">
                    {culturesTriees.map(([cult, nb], i) => (
                      <span key={cult}>
                        {i > 0 && ' · '}
                        {cult === ville.culture
                          ? <strong>{cult} : {nb}</strong>
                          : <span className="muted">{cult} : {nb}</span>}
                      </span>
                    ))}
                  </div>
                )}
                {/* Garnison des habitations, notée sous la culture —
                    VALEUR D'ÉTAT (pas un flux) : base du rang + bâtiments
                    + loi éventuelle du régime ; ne change pas à chaque tour. */}
                {(() => {
                  const g = garnisonHabitationVille(p, ville, C, state)
                  const base = habitationDef(ville, C)?.garnison ?? 0
                  const bats = g - base
                  const bonusRegime = (C.regimes.find((r) => r.nom === p.regime)?.garnisonParRang ?? 0) > 0
                  return (
                    <div className="small">
                      Garnison des habitations : <strong>{fmt(g)}</strong>
                      <span className="muted small">
                        {' '}(base {fmt(base)} du rang{bats > 0 ? ` + ${fmt(bats)} de bâtiments` : ''}{bonusRegime && base > 0 ? ' (loi du régime incluse)' : bonusRegime ? ' + loi du régime' : ''} — valeur fixe)
                      </span>
                    </div>
                  )
                })()}
                <Field label="Niveau de taxes">
                  <Select
                    value={ville.taxes}
                    options={TAX_OPTIONS}
                    onChange={(v) => setPlayer((x) => { x.villes[idx].taxes = v })}
                  />
                </Field>
                {/* Rang d'habitation et type de ville (Ville / Château)
                    sur la même ligne — échelles de rangs différentes :
                    Hameau → Cité → Grande Cité ou Motte → Donjon → Forteresse. */}
                <div className="grid-2">
                  <Field label="Rang d'habitation">
                    <Select
                      value={ville.rang ?? rangsDisponibles(typeVille(ville), C)[0]}
                      options={rangsDisponibles(typeVille(ville), C).map((r) => {
                        const def = (C.config.typesHabitation ?? []).find(
                          (d) => d.type === typeVille(ville) && d.rang === r)
                        return {
                          value: r,
                          label: def?.cout ? `${r} (${def.cout})` : r,
                        }
                      })}
                      onChange={(v) => setPlayer((x) => { x.villes[idx].rang = v })}
                    />
                  </Field>
                  <Field label="Type de ville">
                    <Select
                      value={typeVille(ville)}
                      options={[{ value: 'Ville', label: 'Ville (Hameau → Cité → Grande Cité)' }, { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' }]}
                      onChange={(v) => setPlayer((x) => {
                        x.villes[idx].type = v
                        // le rang doit appartenir à l'échelle du nouveau type
                        const rangs = rangsDisponibles(v, C)
                        if (!rangs.includes(x.villes[idx].rang ?? '')) x.villes[idx].rang = rangs[0]
                      })}
                    />
                  </Field>
                </div>
                {/* Consommation par tour de la ville, en dessous du rang
                    (ex. Cité : 10 Nourriture + 8 Or) — débitée
                    automatiquement à chaque fin de tour par le moteur. */}
                {(() => {
                  const consos = Object.entries(consommationsVille(ville, C))
                    .filter(([, v]) => v !== 0)
                  const requis = habitationDef(ville, C)?.habitantsRequis ?? 0
                  return (
                    <div className="small">
                      {consos.length > 0 && (
                        <>
                          Consommation de la ville :{' '}
                          <span className="neg">
                            {consos.map(([r, v]) => `${fmt(Math.abs(v))} ${r}`).join(' + ')}
                          </span>
                          <span className="muted small"> par tour (débitée automatiquement)</span>
                          {' '}
                        </>
                      )}
                      {requis > 0 && (
                        <span className={`small ${nbVivants < requis ? 'neg' : 'muted'}`}>
                          · {fmt(requis)} habitants requis ({nbVivants} vivant(s){nbVivants < requis ? ' — insuffisant' : ''})
                        </span>
                      )}
                    </div>
                  )
                })()}

                {/* ── AMÉNAGEMENTS (au-dessus des bâtiments) ── */}
                <div className="mini-title">
                  Aménagements
                  <span className="muted small">
                    {' '}· coût : {fmtCout(coutAm)}
                    {reducBatisseurs ? ' (réduit par le Camp de bâtisseurs)' : ''}
                  </span>
                </div>
                {(ville.amenagements ?? []).length === 0 && <div className="muted small">aucun</div>}
                {(ville.amenagements ?? []).map((a, ai) => {
                  const ref = amenagementRef(a, C.config)
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
                      <span className="muted small" title={ref?.description ?? ''}>
                        {ref ? `${ref.production || '—'}${ref.terrain ? ` (${ref.terrain})` : ''}` : '—'}
                      </span>
                    </div>
                  )
                })}
                <div className="add-bat">
                  <Select
                    value=""
                    options={[{ value: '' as const, label: '+ aménager une case (coût déduit du stock)…' },
                      ...amRefs.map((a) => ({
                        value: a.nom,
                        label: `${a.nom} (${a.terrain}) — ${fmtCout(parseCoutTexte(a.cout))}`,
                      }))]}
                    onChange={(v) => v && construire(idx, v, 'amenagement')}
                  />
                </div>

                {/* ── BÂTIMENTS (ville / château / capitale) ── */}
                <div className="mini-title">Bâtiments</div>
                {ville.batiments.length === 0 && <div className="muted small">aucun</div>}
                {ville.batiments.map((b, bi) => {
                  const ref = refs.find((r) => r.categorie === 'Bâtiment' && r.nom === b)
                  const effets = effetsTourBatiment(b, C)
                  const garnison = garnisonBatiment(b, C)
                  const resume = [
                    ref?.production || '',
                    garnison > 0 ? `Garnison +${garnison}` : '',
                    !ref && Object.keys(effets).length > 0 ? fmtEffets(effets, C) : '',
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
                      <span className="muted small" title={ref?.description ?? ''}>
                        {resume || '—'}
                      </span>
                    </div>
                  )
                })}
                <div className="add-bat">
                  <Select
                    value=""
                    options={[{ value: '' as const, label: '+ construire un bâtiment (coût déduit du stock)…' }]}
                    groups={batParGroupe}
                    onChange={(v) => {
                      if (!v) return
                      const [groupe, nom] = v.split('|')
                      construire(idx, nom, 'batiment', groupe)
                    }}
                  />
                </div>

                {/* ── AUTRES (ressource, source, nombre, bonus) ── */}
                <div className="mini-title">
                  Autres
                  <span className="muted small"> · production additionnelle : ressource × nombre × bonus</span>
                </div>
                {(ville.autres ?? []).length === 0 && <div className="muted small">aucune</div>}
                {(ville.autres ?? []).map((l, li) => (
                  <div key={li} className="autre-ligne">
                    <Select
                      value={l.ressource}
                      options={C.ressources.map((r) => ({ value: r, label: r }))}
                      onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].ressource = v })}
                    />
                    <TextInput
                      value={l.source}
                      placeholder="Source (Rivière, Progrès, Régime…)"
                      onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].source = v })}
                    />
                    <NumberInput
                      value={l.nombre} step={1} min={0}
                      onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].nombre = v })}
                    />
                    <span className="muted">×</span>
                    <NumberInput
                      value={l.bonus} step={1}
                      onChange={(v) => setPlayer((x) => { (x.villes[idx].autres ?? (x.villes[idx].autres = []))[li].bonus = v })}
                    />
                    <span className="muted small">= {fmt((l.nombre ?? 0) * (l.bonus ?? 0))} / tour</span>
                    <button
                      className="badge-x"
                      title="Retirer"
                      onClick={() => setPlayer((x) => {
                        const list = x.villes[idx].autres ?? (x.villes[idx].autres = [])
                        list.splice(li, 1)
                      })}
                    >×</button>
                  </div>
                ))}
                <div className="add-bat">
                  <Button onClick={() => setPlayer((x) => {
                    const list = x.villes[idx].autres ?? (x.villes[idx].autres = [])
                    list.push({ ressource: 'Nourriture', source: '', nombre: 1, bonus: 1 } as AutreDef)
                  })}>+ Ajouter une ligne « Autre »</Button>
                </div>

                {/* ── Ce que les taxes rapportent (production des villageois) ── */}
                <div className="mini-title">Taxes — production des villageois</div>
                {resTaxes.length === 0 ? (
                  <div className="muted small">
                    Aucune production d'habitants (aucun titre actif dans cette ville).
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table className="tbl small taxes-tbl">
                      <thead>
                        <tr>
                          <th>Ressource</th><th>Titres</th>
                          <th>Taxes (×{fmt(tg.taxeMult, 2)})</th>
                          <th>Consommation</th><th>Net / tour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resTaxes.map((r) => (
                          <tr key={r}>
                            <td><strong>{r}</strong></td>
                            <td>{fmtNum(tg.titres[r] ?? 0)}</td>
                            <td>{fmtNum(tg.taxes[r] ?? 0)}</td>
                            <td className={(tg.conso[r] ?? 0) < 0 ? 'neg' : ''}>{fmtNum(tg.conso[r] ?? 0)}</td>
                            <td className={(tg.net[r] ?? 0) < 0 ? 'neg' : ''}><strong>{fmtNum(tg.net[r] ?? 0)}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── Production de la ville : ce qu'elle produit en
                    ressources, tous canaux confondus (bâtiments,
                    aménagements, autres, villageois, consommation de
                    l'habitation) — bas du cadre de chaque ville. ── */}
                {(() => {
                  const pv = productionVille(state, p, ville, C)
                  const resV = C.ressources.filter((r) => (pv.total[r] ?? 0) !== 0)
                  if (resV.length === 0) {
                    return (
                      <div className="muted small">
                        Cette ville ne produit encore rien par tour (aucun bâtiment,
                        aménagement, ligne « Autre » ou villageois actif).
                      </div>
                    )
                  }
                  return (
                    <div>
                      <div className="mini-title">Production de la ville</div>
                      <div className="table-wrap">
                        <table className="tbl small">
                          <thead>
                            <tr>
                              <th>Ressource</th>
                              <th>Bâtiments</th>
                              <th>Aménagements</th>
                              <th>Autres</th>
                              <th>Villageois</th>
                              <th>Conso. habitation</th>
                              <th>Total / tour</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resV.map((r) => {
                              const col = (d: Record<string, number>) =>
                                (d[r] ?? 0) === 0 ? '—' : fmtNum(d[r] ?? 0)
                              const t = pv.total[r] ?? 0
                              return (
                                <tr key={r}>
                                  <td><strong>{r}</strong></td>
                                  <td>{col(pv.batiments)}</td>
                                  <td>{col(pv.amenagements)}</td>
                                  <td>{col(pv.autres)}</td>
                                  <td>{col(pv.habitants)}</td>
                                  <td className={(pv.consoVille[r] ?? 0) < 0 ? 'neg' : ''}>
                                    {col(pv.consoVille)}
                                  </td>
                                  <td className={t < 0 ? 'neg' : ''}><strong>{fmtNum(t)}</strong></td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
        <Button onClick={() => setPlayer((x) => {
          const nom = `Ville ${x.villes.length + 1}`
          x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', type: 'Ville', rang: 'Hameau', batiments: [], amenagements: [], autres: [] })
        })}>+ Ajouter une ville</Button>
      </Card>

      {/* ═══ Récap des ressources par tour : chaque ressource et d'où
          elle provient (calculé pour le prochain tour, moteurs des
          étapes de fin de tour). ═══ */}
      <Card title="Récap des ressources par tour — origine de chaque apport">
        {(() => {
          const canaux: Array<[string, Record<string, number>]> = [
            ['Base', prodDetail.base],
            ['Habitants', prodDetail.habitants],
            ['Bâtiments', prodDetail.batiments],
            ['Aménagements', prodDetail.amenagements],
            ['Autres', prodDetail.autres],
            ['Régimes & cultures', prodDetail.regimesCultures],
            ['Faction', prodDetail.faction],
            ['Cités libres', prodDetail.citesLibres],
            ['Conso villes', prodDetail.habitations],
            ['Vassalité', prodDetail.vassalite],
          ]
          const prov = provenancesApports(state, p, C)
          const res = C.ressources.filter((r) =>
            (prodDetail.total[r] ?? 0) !== 0 || (prov[r] ?? []).length > 0)
          if (res.length === 0) {
            return (
              <p className="muted">
                Aucun apport par tour pour l'instant : la production de ce pays est
                nulle sur tous les canaux (base, villageois, bâtiments, aménagements,
                autres, lois de régime/culture, faction, cités libres, consommations,
                vassalité).
              </p>
            )
          }
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          return (
            <>
              <div className="table-wrap">
                <table className="tbl small">
                  <thead>
                    <tr>
                      <th>Ressource</th>
                      {canaux.map(([label]) => <th key={label}>{label}</th>)}
                      <th>Total / tour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.map((r) => (
                      <tr key={r}>
                        <td><strong>{r}</strong></td>
                        {canaux.map(([label, d]) => (
                          <td key={label} className={val(d, r) < 0 ? 'neg' : ''}>
                            {val(d, r) !== 0 ? fmtNum(val(d, r)) : '—'}
                          </td>
                        ))}
                        <td className={(prodDetail.total[r] ?? 0) < 0 ? 'neg' : ''}>
                          <strong>{fmtNum(prodDetail.total[r] ?? 0)}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── D'où vient chaque ressource, origine par origine ── */}
              <div className="mini-title">D'où vient chaque ressource ?</div>
              {res.map((r) => {
                const lignes = prov[r] ?? []
                if (lignes.length === 0) return null
                return (
                  <div key={r} className="small provenance-ligne">
                    <strong>{r}</strong>
                    {' : '}
                    {lignes.map((a, i) => (
                      <span key={i}>
                        {i > 0 && ' · '}
                        <span className="muted">{a.canal} — </span>
                        {a.origine}{' '}
                        <strong className={a.valeur < 0 ? 'neg' : ''}>
                          {a.valeur > 0 ? '+' : ''}{fmtNum(a.valeur)}
                        </strong>
                      </span>
                    ))}
                  </div>
                )
              })}
            </>
          )
        })()}
        <p className="muted small">
          Récapitulatif CALCULÉ du prochain tour, canal par canal — production
          de base du pays (l'été double la Nourriture), villageois (titres ×
          taxes, toutes ressources), bâtiments et aménagements du référentiel
          exact, lignes « Autres », lois chiffrées du régime et règle de pays
          de la culture, taxes des cités libres sous suzeraineté (Chasseurs
          ×2 Nourriture), consommation par tour des habitations et tribut de
          vassalité. La section « D'où vient chaque ressource ? » détaille
          l'origine de chaque apport (bâtiment, villageois, loi, ville…).
          Tous ces effets sont appliqués automatiquement à chaque fin de
          tour. Les aménagements de terrain (Champ, Rizière) ne produisent
          qu'en été ; la garnison et le Tourisme des bâtiments sont des
          valeurs fixes acquises à la construction.
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
                bâtiments, aménagements, autres, consommations des villes, habitants, régimes & cultures, faction, cités libres, vassalité).
              </p>
            )
          }
          const { production, batiments, amenagements, autres, population, vassalite, regimesCultures, habitations, faction, citesLibres } = row.apports
          const amen = amenagements ?? {}
          const aut = autres ?? {}
          const reg = regimesCultures ?? {}
          const hab = habitations ?? {}
          const fac = faction ?? {}
          const cl = citesLibres ?? {}
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          const res = C.ressources.filter((r) =>
            val(production, r) !== 0 || val(batiments, r) !== 0 || val(amen, r) !== 0
            || val(aut, r) !== 0 || val(hab, r) !== 0 || val(population, r) !== 0 || val(vassalite, r) !== 0
            || val(reg, r) !== 0 || val(fac, r) !== 0 || val(cl, r) !== 0)
          if (res.length === 0) {
            return <p className="muted">Aucun apport au tour {row.turn}.</p>
          }
          return (
            <div className="table-wrap">
              <table className="tbl small">
                <thead>
                  <tr>
                    <th>Ressource</th><th>Production</th><th>Bâtiments</th>
                    <th>Aménagements</th><th>Autres</th>
                    <th>Conso. villes</th>
                    <th>Habitants</th><th>Régimes & cultures</th><th>Faction</th><th>Cités libres</th><th>Vassalité</th><th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {res.map((r) => {
                    const total = val(production, r) + val(batiments, r) + val(amen, r)
                      + val(aut, r) + val(hab, r) + val(population, r) + val(vassalite, r) + val(reg, r)
                      + val(fac, r) + val(cl, r)
                    return (
                      <tr key={r}>
                        <td><strong>{r}</strong></td>
                        <td>{fmtNum(val(production, r))}</td>
                        <td>{fmtNum(val(batiments, r))}</td>
                        <td>{fmtNum(val(amen, r))}</td>
                        <td>{fmtNum(val(aut, r))}</td>
                        <td className="neg">{val(hab, r) !== 0 ? fmtNum(val(hab, r)) : '—'}</td>
                        <td>{fmtNum(val(population, r))}</td>
                        <td>{fmtNum(val(reg, r))}</td>
                        <td>{fmtNum(val(fac, r))}</td>
                        <td>{fmtNum(val(cl, r))}</td>
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
          Nourriture), production exacte des bâtiments et aménagements du référentiel,
          lignes « Autres », consommation par tour des villes selon leur type et leur rang
          (négative — table « Habitations »), gains des habitants (titres × taxes — toutes
          ressources —, après coefficient « gains crédités au stock »), lois chiffrées des
          régimes et cultures (bonus de capitale, etc.), taxes des cités libres sous
          suzeraineté (Chasseurs ×2 Nourriture) et tribut de vassalité
          (négatif = payé, positif = reçu). La garnison et le Tourisme sont des
          valeurs fixes, pas des apports par tour. Les événements et cartes dynastie du
          tour figurent dans le journal.
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

// ═══ Panneau Ressources — très léger, docké à droite, dépliable ═══

function RessourcesDock({ p, C, prodDetail, setPlayer }: {
  p: Player
  C: Cfg
  prodDetail: ProductionDetail
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
}) {
  const [ouvert, setOuvert] = useState(false)
  const [baseOuvert, setBaseOuvert] = useState(false)
  return (
    <div className={`res-dock${ouvert ? ' open' : ''}`}>
      {ouvert && (
        <div className="res-panel">
          <div className="res-panel-head">
            <strong>Ressources</strong>
            <span className="muted small">stock modifiable · production / tour calculée</span>
          </div>
          <div className="table-wrap">
            <table className="tbl small">
              <thead>
                <tr>
                  <th>Ressource</th>
                  <th>Stock</th>
                  <th>Prod. / tour</th>
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
            production par tour. Production calculée : base + habitants (titres
            × taxes, toutes ressources) + bâtiments + aménagements + autres + vassalité.
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
        </div>
      )}
      <button
        className="res-toggle"
        onClick={() => setOuvert(!ouvert)}
        title="Ressources — stock et production par tour"
      >
        {ouvert ? '▸ fermer' : 'Ressources ◂'}
      </button>
    </div>
  )
}

function dictToString(dict: Record<string, number>): string {
  const entries = Object.entries(dict).sort((a, b) => b[1] - a[1])
  if (entries.length === 0) return '—'
  return entries.map(([k, v]) => `${k} : ${v}`).join(', ')
}

/** Formate des effets par tour : « +2 Or, -10 Nourriture ». Garnison et
 *  Tourisme sont des VALEURS D'ÉTAT (pas des flux) : sans signe. */
const RESSOURCES_ETAT = ['Garnison', 'Tourisme']
function fmtEffets(effets: Record<string, number>, C: Cfg): string {
  const entries = Object.entries(effets).filter(([, v]) => v !== 0)
    .sort((a, b) => C.ressources.indexOf(a[0]) - C.ressources.indexOf(b[0]))
  if (entries.length === 0) return '—'
  return entries.map(([r, v]) => {
    const etat = RESSOURCES_ETAT.includes(r)
    return `${!etat && v > 0 ? '+' : ''}${fmt(v)} ${r}`
  }).join(', ')
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
