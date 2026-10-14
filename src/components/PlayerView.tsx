// ══════════════════════════════════════════════════════════════════════
//  Page « Pays » (vue joueur) :
//   · ressources : BARRE FLOTTANTE MINIMALISTE en haut de la page,
//     OUVERTE par défaut (retour Thibaut 2026-10-14) — stock modifiable,
//     production / tour CALCULÉE (base + habitants + bâtiments +
//     aménagements + autres + régimes & cultures + vassalité) —
//     invariant : stock du tour N = stock du tour N−1 + production
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

import React, { useEffect, useRef, useState } from 'react'
import { useGame } from '../state/store'
import type { GameState, Player, AutreDef } from '../engine/types'
import { cfgOf, cultureDef, type Cfg } from '../engine/gameData'
import {
  effetsTourBatiment, garnisonBatiment, coutBatiment,
  batimentsConstructionsRefs, constructionsRefs, amenagementRef, aCampDeBatisseurs,
  coutAmenagement, constructionRef,
  productionDetaillee, detailGainsVille, parseCoutTexte,
  garnisonHabitationVille, nomRang, typeVille, habitationDef,
  rangsDisponibles, consommationsVille, tourismeStatiqueBatiment,
  detailCulturePays, productionVille, provenancesApports,
  attraitTouristiqueVille, attraitMaxMonde,
  capitaleDe, batimentsFaction, batimentsCapitale,
  effetsNourrEteAmenagementsVille, effetsNourrEteAutresVille,
  supprimerVille, transfererVille,
  impotPopulation, impotsVassaux, genererImpotPopulation, genererImpotVassaux,
  debiterCoutHabitation,
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

  // ── Impôts manuels (retour Thibaut 2026-10-14) : prévisualisation de
  //    l'impôt d'UN tour (population / vassaux) pour les boutons
  //    « Générer l'impôt » de la carte récap. ─────────────────────────────
  const [foisImpot, setFoisImpot] = useState(1)
  const impotPopPrev = impotPopulation(state, p, C)
  const impotsVassPrev = impotsVassaux(state, p, C)

  // ── Attrait migratoire : borne haute = ville la plus attractive du
  //    monde (pour la heatmap sous chaque ville). ─────────────────────────
  const maxAttraitMonde = attraitMaxMonde(state)

  // ── Construction d'un bâtiment / aménagement (coût déduit du stock) ────
  const construire = (idx: number, nom: string, type: 'batiment' | 'amenagement', groupe?: string) =>
    update((s) => {
      const t = s.players.find((x) => x.n === joueur)
      const ville = t?.villes[idx]
      if (!t || !ville) return
      // ── Restrictions des catégories de bâtiments ────────────────────
      // · bâtiment de faction : uniquement ceux du peuple du joueur ;
      // · bâtiment de capitale (groupe « Capitale ») : capitale uniquement.
      const ref = type === 'batiment' ? constructionRef(nom, C.config) : undefined
      const estCapitale = capitaleDe(t)?.nom === ville.nom
      if (ref && ref.groupe === 'Capitale' && !estCapitale) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `🏗 ${nom} ne peut être construit(e) que dans la capitale (${capitaleDe(t)?.nom ?? '—'}).`,
        })
        return
      }
      if (ref?.faction && ref.faction !== t.peuple) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur: t.n,
          texte: `🏗 ${nom} est un bâtiment de faction des ${ref.faction} — seuls les bâtiments de faction de ${t.peuple} sont constructibles.`,
        })
        return
      }
      const cout = type === 'batiment'
        ? coutBatiment(nom, C, groupe)
        : coutAmenagement(t, C.config, type === 'amenagement' ? nom : undefined)
      const cible = type === 'batiment'
        ? ville.batiments
        : (ville.amenagements ?? (ville.amenagements = []))
      // Un même BÂTIMENT ne se construit pas deux fois dans une ville ;
      //  en revanche un AMÉNAGEMENT peut être présent PLUSIEURS FOIS
      //  (plusieurs cases du même terrain, ex. 2 Champs) — chaque
      //  exemplaire produit ses effets (retour Thibaut 2026-10-14).
      if (type === 'batiment' && cible.includes(nom)) return
      // Bâtiment de faction : UN par ville — le nouveau remplace l'ancien
      // (ex. Église → Grande Cathédrale → Palais du Palatinat).
      let remplace = ''
      if (type === 'batiment' && ref?.faction) {
        for (let i = ville.batiments.length - 1; i >= 0; i--) {
          const b = ville.batiments[i]
          if (b !== nom && constructionRef(b, C.config)?.faction) {
            remplace = b
            ville.batiments.splice(i, 1)
          }
        }
      }
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
        texte: `🏗 ${nom} construit(e) à ${ville.nom} — coût déduit du stock : ${parts.length ? parts.join(' + ') : 'gratuit'}${sci > 0 ? ` — règle de culture : +${fmt(sci)} Science` : ''}${tour > 0 ? ` — Tourisme +${fmt(tour)} (valeur fixe)` : ''}${remplace ? ` — remplace ${remplace} (bâtiment de faction de la ville)` : ''}.`,
      })
    })

  // ── Référentiel des constructions (coût / production / description exacts) ──
  const refs = constructionsRefs(C.config)
  const amRefs = refs.filter((r) => r.categorie === 'Aménagement')
  const batRefs = batimentsConstructionsRefs(C)
  // Bâtiments de faction du peuple du joueur + bâtiments de capitale
  // du référentiel (2 nouvelles catégories des cadres ville).
  const refsBatFaction = batimentsFaction(p, C)
  const refsBatCapitale = batimentsCapitale(C)
  const nomCapitale = capitaleDe(p)?.nom ?? ''
  const fmtOption = (b: { nom: string; cout: string }, groupe: string) => ({
    value: `${groupe}|${b.nom}`,
    label: `${b.nom} — ${fmtCout(parseCoutTexte(b.cout))}`,
  })
  /** Groupes de construction d'UNE ville : bâtiments de ville / château
   *  (hors faction), bâtiments de FACTION du peuple du joueur (toutes
   *  villes ; ceux de capitale uniquement dans la capitale), et
   *  bâtiments de CAPITALE pour la capitale uniquement. */
  const batParGroupePour = (estCapitale: boolean) => {
    const groupes: { label: string; options: { value: string; label: string }[] }[] = [
      {
        label: 'Bâtiments de ville',
        options: batRefs.filter((b) => b.groupe === 'Ville' && !b.faction).map((b) => fmtOption(b, 'Ville')),
      },
      {
        label: 'Bâtiments de château',
        options: batRefs.filter((b) => b.groupe === 'Château' && !b.faction).map((b) => fmtOption(b, 'Château')),
      },
    ]
    const faction = refsBatFaction.filter((b) => estCapitale || b.groupe !== 'Capitale')
    if (faction.length > 0) {
      groupes.push({
        label: `Bâtiments de faction (${p.peuple})`,
        options: faction.map((b) => fmtOption(b, 'Faction')),
      })
    }
    if (estCapitale) {
      groupes.push({
        label: 'Bâtiments de capitale',
        options: refsBatCapitale.map((b) => fmtOption(b, 'Capitale')),
      })
    }
    return groupes
  }

  const coutAm = coutAmenagement(p, C.config)
  const reducBatisseurs = aCampDeBatisseurs(p)

  return (
    <div className="stack">
      {/* Barre Ressources — flottante en haut de la page, ouverte par
          défaut, minimaliste (retour Thibaut 2026-10-14) */}
      <RessourcesBar p={p} C={C} prodDetail={prodDetail} setPlayer={setPlayer} />

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
                    « {p.culture} » dans le monde (dont {d.nbVillesPerso} chez toi).
                  </span>
                </div>
              )) : null}
              {cult?.scienceParConstruction ? (
                <div>
                  <Badge tone="good">+{fmt(cult.scienceParConstruction)} Science / construction</Badge>{' '}
                  <span className="muted small">
                    crédité à chaque construction (journal 🏗).
                  </span>
                </div>
              ) : null}
            </div>
          )
        })()}
      </Card>

      {/* ═══ Villes : aménagements, bâtiments, autres, cultures, taxes ═══ */}
      <Card title="Villes">
        {/* 2 villes par ligne ; repli à 1 colonne en fenêtre étroite —
            les tableaux internes restent lisibles (défilement horizontal
            via .table-wrap si besoin). */}
        <div className="grid-villes">
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
                {/* Actions de ville : transfert à un autre joueur
                    (capture, vente, cadeau — la ville ET ses habitants
                    suivent) et suppression (les habitants restent
                    inscrits dans la population). Retour Thibaut. */}
                <div className="badges-wrap">
                  <Select
                    value=""
                    options={[
                      { value: '' as const, label: '⇄ Transférer la ville à…' },
                      ...state.players
                        .filter((x) => x.n !== p.n)
                        .map((x) => ({ value: String(x.n), label: `${x.nom} (J${x.n})` })),
                    ]}
                    onChange={(v) => v && update((st) => {
                      const src = st.players.find((x) => x.n === joueur)
                      const dst = st.players.find((x) => x.n === parseInt(v, 10))
                      if (src && dst) transfererVille(st, src, idx, dst)
                    })}
                  />
                  <Button
                    tone="danger"
                    onClick={() => {
                      if (!window.confirm(`Supprimer « ${ville.nom} » ? Ses habitants resteront inscrits dans la population de ${p.nom}.`)) return
                      update((st) => {
                        const src = st.players.find((x) => x.n === joueur)
                        if (src) supprimerVille(st, src, idx)
                      })
                    }}
                  >
                    🗑 Supprimer
                  </Button>
                </div>
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
                        {' '}(base {fmt(base)} du rang{bats > 0 ? ` + ${fmt(bats)} de bâtiments` : ''}{bonusRegime && base > 0 ? ' (loi du régime incluse)' : bonusRegime ? ' + loi du régime' : ''})
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
                      onChange={(v) => setPlayer((x, s) => {
                        const ville = x.villes[idx]
                        ville.rang = v
                        debiterCoutHabitation(s, x, ville, C)
                      })}
                    />
                  </Field>
                  <Field label="Type de ville">
                    <Select
                      value={typeVille(ville)}
                      options={[{ value: 'Ville', label: 'Ville (Hameau → Cité → Grande Cité)' }, { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' }]}
                      onChange={(v) => setPlayer((x, s) => {
                        const ville = x.villes[idx]
                        ville.type = v
                        // le rang doit appartenir à l'échelle du nouveau type
                        const rangs = rangsDisponibles(v, C)
                        if (!rangs.includes(ville.rang ?? '')) ville.rang = rangs[0]
                        debiterCoutHabitation(s, x, ville, C)
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
                    groups={batParGroupePour(ville.nom === nomCapitale)}
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
                    Aucune production d'habitants.
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
                  // « Nourr - été » (ligne du classeur) : production d'été
                  // de la ville, SOURCES SÉPARÉES — aménagements qui ne
                  // produisent qu'en été (Champ, Rizière) et lignes
                  // « Autres » de ressource « Nourr - été ». Affichée
                  // comme LIGNE sous la nourriture, POTENTIEL visible en
                  // toute saison (pour planifier), mais créditée au stock
                  // de Nourriture UNIQUEMENT en été par le moteur.
                  const nEteAm = effetsNourrEteAmenagementsVille(ville, C.config)['Nourriture'] ?? 0
                  const nEteAut = effetsNourrEteAutresVille(ville)['Nourriture'] ?? 0
                  const nEteTot = nEteAm + nEteAut
                  const resV = C.ressources.filter((r) => (pv.total[r] ?? 0) !== 0)
                  if (resV.length === 0 && nEteTot === 0) {
                    return (
                      <div className="muted small">
                        Cette ville ne produit rien par tour.
                      </div>
                    )
                  }
                  // Lignes du tableau : chaque ressource + la ligne
                  // « Nourr - été » juste après la Nourriture (ou en
                  // première ligne s'il n'y a pas de nourriture générale).
                  const lignesV: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
                  for (const r of resV) {
                    lignesV.push({ kind: 'res', r })
                    if (r === 'Nourriture' && nEteTot !== 0) lignesV.push({ kind: 'ete' })
                  }
                  if (nEteTot !== 0 && !resV.includes('Nourriture')) lignesV.unshift({ kind: 'ete' })
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
                            {lignesV.map((l) => {
                              if (l.kind === 'ete') {
                                return (
                                  <tr key="nourr-ete" className="muted">
                                    <td><strong>Nourr - été</strong></td>
                                    <td>—</td>
                                    <td>{nEteAm !== 0 ? fmtNum(nEteAm) : '—'}</td>
                                    <td>{nEteAut !== 0 ? fmtNum(nEteAut) : '—'}</td>
                                    <td>—</td>
                                    <td>—</td>
                                    <td>
                                      <strong>{fmtNum(nEteTot)}</strong>{' '}
                                      <span className="muted small">(créditée en été seulement)</span>
                                    </td>
                                  </tr>
                                )
                              }
                              const r = l.r
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

                {/* ── Heatmap : attrait migratoire de la ville (Tourisme /
                    tour), relatif à la ville la plus attractive du monde.
                    C'est la pondération de la migration spontanée
                    (2 % / tour — paramètre migrationTourisme). ── */}
                {(() => {
                  const attrait = attraitTouristiqueVille(state, p, ville, C)
                  const part = maxAttraitMonde > 0 ? attrait / maxAttraitMonde : 0
                  const chaleur = Math.round(210 - 210 * part) // bleu (froid) → rouge (chaud)
                  return (
                    <div
                      className="heat-row"
                      title={`Attrait migratoire : ${fmt(attrait)} Tourisme (bâtiments + production par tour) — pondération des migrations spontanées (${Math.round(C.p.migrationTourisme * 100)} % / tour par habitant ; conjoint et enfants mineurs suivent).`}
                    >
                      <span className="muted small">Attrait migratoire</span>
                      <div className="heat-bar">
                        {attrait > 0 && (
                          <div
                            className="heat-fill"
                            style={{ width: `${Math.max(4, part * 100)}%`, background: `hsl(${chaleur}, 85%, 48%)` }}
                          />
                        )}
                      </div>
                      <span className="small">
                        {attrait > 0
                          ? `+${fmt(attrait)} Tourisme · ${Math.round(part * 100)} %`
                          : '— (aucun attrait)'}
                      </span>
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
        <Button onClick={() => setPlayer((x, s) => {
          const nom = `Ville ${x.villes.length + 1}`
          x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', type: 'Ville', rang: rangsDisponibles('Ville', C)[0] ?? 'Hameau', batiments: [], amenagements: [], autres: [] })
          debiterCoutHabitation(s, x, x.villes[x.villes.length - 1], C)
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
          // « Nourr - été » en LIGNE (comme dans le classeur), pas en
          // colonne : sources séparées — Aménagements (Champ, Rizière) +
          // Autres (lignes « Nourr - été »). Potentiel affiché en toute
          // saison (planification), crédit au stock UNIQUEMENT en été.
          const nEteAmJ = p.villes.reduce(
            (s, v) => s + (effetsNourrEteAmenagementsVille(v, C.config)['Nourriture'] ?? 0), 0)
          const nEteAutJ = p.villes.reduce(
            (s, v) => s + (effetsNourrEteAutresVille(v)['Nourriture'] ?? 0), 0)
          const nEteTotJ = nEteAmJ + nEteAutJ
          const prov = provenancesApports(state, p, C)
          const res = C.ressources.filter((r) =>
            (prodDetail.total[r] ?? 0) !== 0 || (prov[r] ?? []).length > 0)
          if (res.length === 0 && nEteTotJ === 0) {
            return (
              <p className="muted">
                Aucun apport par tour pour l'instant.
              </p>
            )
          }
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          // Lignes du tableau : chaque ressource + la ligne « Nourr - été »
          // juste après la Nourriture (ou en première ligne s'il n'y en a pas).
          const lignesR: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
          for (const r of res) {
            lignesR.push({ kind: 'res', r })
            if (r === 'Nourriture' && nEteTotJ !== 0) lignesR.push({ kind: 'ete' })
          }
          if (nEteTotJ !== 0 && !res.includes('Nourriture')) lignesR.unshift({ kind: 'ete' })
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
                    {lignesR.map((l) => {
                      if (l.kind === 'ete') {
                        return (
                          <tr key="nourr-ete" className="muted">
                            <td><strong>Nourr - été</strong></td>
                            {canaux.map(([label]) => {
                              const v = label === 'Aménagements' ? nEteAmJ
                                : label === 'Autres' ? nEteAutJ : 0
                              return (
                                <td key={label} className={v < 0 ? 'neg' : ''}>
                                  {v !== 0 ? fmtNum(v) : '—'}
                                </td>
                              )
                            })}
                            <td>
                              <strong>{fmtNum(nEteTotJ)}</strong>{' '}
                              <span className="muted small">(créditée en été seulement)</span>
                            </td>
                          </tr>
                        )
                      }
                      const r = l.r
                      return (
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
                      )
                    })}
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

        {/* ── Générer l'impôt (hors fin de tour, retour Thibaut
            2026-10-14) : crédite l'impôt d'un tour AUTANT DE FOIS que
            voulu — population (canal « Habitants ») ou vassaux (tribut
            de vassalité, Or). Le fin de tour crédite les gains du tour
            normalement par-dessus. ───────────────────────────────── */}
        <div className="mini-title">Générer l'impôt (hors fin de tour)</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label className="small">Nombre de tours :</label>
          <NumberInput value={foisImpot} onChange={setFoisImpot} min={1} />
          <Button tone="primary" onClick={() => update((s) => {
            const t = s.players.find((x) => x.n === joueur)
            if (t) genererImpotPopulation(s, t, C, foisImpot)
          })}>💰 Générer l'impôt de la population</Button>
          <Button tone="primary" onClick={() => update((s) => {
            const t = s.players.find((x) => x.n === joueur)
            if (t) genererImpotVassaux(s, t, C, foisImpot)
          })}>🤝 Générer l'impôt des vassaux</Button>
        </div>
        <p className="muted small">
          Impôt d'un tour — population : {Object.keys(impotPopPrev).length === 0
            ? 'aucun gain d’habitants'
            : Object.entries(impotPopPrev).map(([r, v]) => `${fmt(v)} ${r}`).join(', ')}
          {' · '}vassaux : {impotsVassPrev.length === 0
            ? 'aucun vassal ne reverse d’Or'
            : `+${fmt(impotsVassPrev.reduce((s2, x) => s2 + x.montant, 0))} Or (` +
              impotsVassPrev.map((x) => `${x.vassal} : ${fmt(x.montant)}`).join(', ') + ')'}
        </p>
      </Card>

      {/* ═══ Récap ressources du dernier tour (apports cumulés) ═══ */}
      <Card title="Récap ressources du dernier tour (apports cumulés)">
        {(() => {
          const row = [...state.history].reverse().find((h) => h.joueur === p.n && h.apports)
          if (!row || !row.apports) {
            return (
              <p className="muted">
                Lancez un tour pour voir le détail des apports.
              </p>
            )
          }
          const { production, batiments, amenagements, nourrEte, autres, population, vassalite, regimesCultures, habitations, faction, citesLibres } = row.apports
          const amen = amenagements ?? {}
          const nEte = nourrEte ?? {}
          const aut = autres ?? {}
          const reg = regimesCultures ?? {}
          const hab = habitations ?? {}
          const fac = faction ?? {}
          const cl = citesLibres ?? {}
          const val = (d: Record<string, number>, r: string) => d[r] ?? 0
          const res = C.ressources.filter((r) =>
            val(production, r) !== 0 || val(batiments, r) !== 0 || val(amen, r) !== 0
            || val(nEte, r) !== 0 || val(aut, r) !== 0 || val(hab, r) !== 0 || val(population, r) !== 0 || val(vassalite, r) !== 0
            || val(reg, r) !== 0 || val(fac, r) !== 0 || val(cl, r) !== 0)
          if (res.length === 0) {
            return <p className="muted">Aucun apport au tour {row.turn}.</p>
          }
          // Ligne « Nourr - été » (comme dans le classeur) juste après
          // la Nourriture : valeur d'été créditée ce tour-là (0/en
          // hiver) ; ses sources détaillées sont visibles dans le récap
          // « origine de chaque apport » ci-dessus.
          const lignesD: Array<{ kind: 'res'; r: string } | { kind: 'ete' }> = []
          for (const r of res) {
            lignesD.push({ kind: 'res', r })
            if (r === 'Nourriture' && val(nEte, 'Nourriture') !== 0) lignesD.push({ kind: 'ete' })
          }
          if (val(nEte, 'Nourriture') !== 0 && !res.includes('Nourriture')) lignesD.unshift({ kind: 'ete' })
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
                  {lignesD.map((l) => {
                    if (l.kind === 'ete') {
                      const vEte = val(nEte, 'Nourriture')
                      return (
                        <tr key="nourr-ete" className="muted">
                          <td><strong>Nourr - été</strong></td>
                          <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                          <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                          <td><strong>{fmtNum(vEte)}</strong>{' '}
                            <span className="muted small">(créditée en été seulement)</span></td>
                        </tr>
                      )
                    }
                    const r = l.r
                    const total = val(production, r) + val(batiments, r) + val(amen, r)
                      + val(nEte, r) + val(aut, r) + val(hab, r) + val(population, r) + val(vassalite, r) + val(reg, r)
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
          <p className="muted">Lancez un tour pour voir le récapitulatif.</p>
        )}
      </Card>
    </div>
  )
}

// ═══ Barre Ressources — flottante en haut de page, OUVERTE par défaut,
// minimaliste : une puce par ressource (stock modifiable + production
// / tour), réglage avancé replié, bouton ▼/▲ à droite. ═══

function RessourcesBar({ p, C, prodDetail, setPlayer }: {
  p: Player
  C: Cfg
  prodDetail: ProductionDetail
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
}) {
  const [ouvert, setOuvert] = useState(true)
  const [baseOuvert, setBaseOuvert] = useState(false)
  // Pinnage au scroll (retour Thibaut 2026-10-14) : dès que la page
  // dépasse la position naturelle de la barre, celle-ci se colle en
  // HAUT DE LA FENÊTRE (position:fixed) — elle descend avec le scroll,
  // quel que soit le navigateur. Une butée invisible conserve la
  // mise en page pendant le pinnage.
  const barRef = useRef<HTMLDivElement | null>(null)
  const pinnedRef = useRef(false)
  const natTopRef = useRef(-1)
  const [pin, setPin] = useState<{ width: number; left: number; height: number } | null>(null)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    if (!pinnedRef.current) natTopRef.current = el.getBoundingClientRect().top + window.scrollY
    const sync = () => {
      const parent = el.parentElement
      if (!parent) return
      const pr = parent.getBoundingClientRect()
      const w = pr.width, l = pr.left, h = el.getBoundingClientRect().height
      // ne re-render que si la géométrie change (pas à chaque tick de scroll)
      setPin((prev) => (prev && Math.abs(prev.width - w) < 0.5
        && Math.abs(prev.left - l) < 0.5 && Math.abs(prev.height - h) < 0.5
        ? prev : { width: w, left: l, height: h }))
    }
    const update = () => {
      const should = window.scrollY > natTopRef.current - 8
      if (should === pinnedRef.current) {
        if (should) sync()
        return
      }
      pinnedRef.current = should
      if (should) sync()
      else setPin(null)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ouvert, baseOuvert])
  return (
    <>
      {pin && <div style={{ height: pin.height }} aria-hidden="true" />}
      <div
        ref={barRef}
        className={`res-top${ouvert ? ' open' : ''}${pin ? ' pinned' : ''}`}
        style={pin ? { position: 'fixed', top: 8, width: pin.width, left: pin.left } : undefined}
      >
      {ouvert && (
        <>
          <div className="res-top-row">
            {C.ressources.map((r) => {
              const rs = p.resources[r] ?? { stock: 0, prod: 0 }
              const prod = prodDetail.total[r] ?? 0
              return (
                <span key={r} className="res-chip" title={`${r} — stock modifiable · production / tour calculée${r === 'Habitants' ? ' (production = titres × taxes des habitants)' : ''}`}>
                  <strong>{r}</strong>
                  <span className={rs.stock < 0 ? 'neg' : ''}>
                    <NumberInput
                      value={rs.stock}
                      step={r === 'Habitants' ? 1 : 5}
                      onChange={(v) => setPlayer((x) => {
                        if (!x.resources[r]) x.resources[r] = { stock: 0, prod: 0 }
                        x.resources[r].stock = v
                      })}
                    />
                  </span>
                  <span className={`small ${prod < 0 ? 'neg' : 'muted'}`}>
                    {prod === 0 ? '±0' : fmtNum(prod)}
                  </span>
                </span>
              )
            })}
            <button
              className="res-top-btn"
              onClick={() => setBaseOuvert(!baseOuvert)}
              title="Réglage avancé : production de base du pays"
            >
              {baseOuvert ? '▲ base' : '⚙ base'}
            </button>
          </div>
          {baseOuvert && (
            <div className="res-top-base">
              {C.ressources.map((r) => (
                <label key={r} className="field" style={{ minWidth: 120 }}>
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
      <button
        className="res-top-toggle"
        onClick={() => setOuvert(!ouvert)}
        title="Ressources — stock et production par tour"
      >
        {ouvert ? '▲' : '▼ Ressources'}
      </button>
    </div>
    </>
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
