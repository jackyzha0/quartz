// ══════════════════════════════════════════════════════════════════════
//  Onglet « 🗼 Cités libres » — cités sans joueur (règle « Cités
//  libres » du référentiel) :
//    · chaque cité possède sa PROPRE POPULATION (habitants titrés,
//      roturiers OU nobles — les Chasseurs des cités libres produisent
//      le DOUBLE de Nourriture, la cité consomme 1 Nourriture par
//      tour). Retour Thibaut (2026-10-14, suite) : la population n'est
//      PLUS gérée ici — elle vit dans l'onglet « 👥 Population »,
//      avec un onglet 🗼 par cité « comme si c'étaient des joueurs »
//      (mêmes tableaux, ajout, titres, dons et mariages) ;
//    · garnison automatique : 100 + 40 par rang de pays du joueur
//      ayant le plus haut rang (batailles au plateau : manuel) ;
//    · émissaires : suivi manuel des tentatives d'influence (une par
//      saison au plateau) — à 3 émissaires, un joueur peut devenir
//      suzerain de la cité ;
//    · suzerain : à chaque fin de tour, la cité verse ses taxes à
//      son suzerain (production nette de ses habitants — titres ×
//      niveau de taxes, moins leur consommation —, canal « Cités
//      libres » du récap ressources, appliqué automatiquement).
//  Une cité libre compte comme un Serment pour son suzerain
//  (voie Diplomatique : suzerain de 3 cités libres).
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import { cfgOf } from '../engine/gameData'
import {
  citesLibresDe, garnisonCiteLibre, detailCiteLibre, emissairesDe,
  ajouterHabitantsCiteLibre, taxesCite,
} from '../engine/engine'
import type { CiteLibre, TaxeNiveau } from '../engine/types'
import { Card, Select, TextInput, Button, NumberInput, Badge, TAX_OPTIONS } from './ui'

function fmtNum(v: number): string {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(v)
}

export function CitesLibresView() {
  const { state, update } = useGame()
  const [newNom, setNewNom] = useState('')
  const [newType, setNewType] = useState('')
  const [newCulture, setNewCulture] = useState('')
  const [newNb, setNewNb] = useState(10)
  if (!state) return null
  const C = cfgOf(state.config)
  const cites = citesLibresDe(state)
  const garnison = garnisonCiteLibre(state, C)
  const typesConfig = C.config.citesLibres ?? []
  const typeOptions = typesConfig.map((t) => ({
    value: t.type,
    label: t.type.split('\n')[0].trim(),
  }))
  const cultures = C.cultures.map((c) => c.nom)

  // ── Mutations (via le store, comme les autres vues) ────────────────
  const mutCite = (nom: string, fn: (c: CiteLibre) => void) =>
    update((s) => {
      const c = (s.citesLibres ?? []).find((x) => x.nom === nom)
      if (c) fn(c)
    })

  const creerCite = () => {
    const nb = Math.max(0, Math.round(newNb))
    update((s) => {
      const cites2 = s.citesLibres ?? (s.citesLibres = [])
      let nom = newNom.trim()
      if (!nom) {
        let n = cites2.length + 1
        nom = `Cité libre ${n}`
        while (cites2.some((c) => c.nom === nom)) nom = `Cité libre ${++n}`
      }
      if (cites2.some((c) => c.nom === nom)) return
      const cite: CiteLibre = {
        nom,
        type: newType || typesConfig[0]?.type || 'Ville',
        culture: newCulture || cultures[0] || '',
        taxes: 'Moyenne',
        suzerain: null,
        emissaires: {},
        population: [],
      }
      cites2.push(cite)
      if (nb > 0) ajouterHabitantsCiteLibre(s, cite, nb)
      s.log.push({
        turn: s.turn, type: 'Système', joueur: null,
        texte: `🗼 Nouvelle cité libre : ${cite.nom} (${cite.type.split('\n')[0]})${nb > 0 ? `, ${nb} habitant(s)` : ''}.`,
      })
    })
    setNewNom('')
  }

  /** Recrute un émissaire pour un joueur (coût/rythme arbitres au
   *  plateau : la réserve est libre d'édition, les ministres et
   *  merveilles en octroient automatiquement). */
  const recruterEmissaire = (joueur: number, delta: number) =>
    update((s) => {
      const p = s.players.find((x) => x.n === joueur)
      if (!p) return
      const v = Math.max(0, (p.emissaires ?? 0) + delta)
      const dv = v - (p.emissaires ?? 0)
      p.emissaires = v
      if (dv !== 0) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur,
          texte: `✉ ${p.nom} : réserve d'émissaires ${v} (${dv > 0 ? '+' : ''}${dv}, saisie manuelle).`,
        })
      }
    })

  const supprimerCite = (nom: string) =>
    update((s) => {
      s.citesLibres = (s.citesLibres ?? []).filter((c) => c.nom !== nom)
      s.log.push({
        turn: s.turn, type: 'Système', joueur: null,
        texte: `🗼 La cité libre ${nom} n'est plus une cité libre (annexée ou détruite).`,
      })
    })

  const changerEmissaires = (nom: string, joueur: number, delta: number) =>
    update((s) => {
      const c = (s.citesLibres ?? []).find((x) => x.nom === nom)
      if (!c) return
      const p = s.players.find((x) => x.n === joueur)
      if (!p) return
      // Revue 2026-10-15 : les émissaires sont une RESSOURCE du joueur
      //  (p.emissaires) — placer un émissaire dans une cité le DÉPENSE,
      //  le retirer le RECREDITE. Impossible de placer sans réserve.
      const e = c.emissaires ?? (c.emissaires = {})
      const places = e[joueur] ?? 0
      const reserve = p.emissaires ?? 0
      if (delta > 0 && reserve <= 0) return
      const v = Math.max(0, places + delta)
      const dv = v - places
      p.emissaires = Math.max(0, reserve - dv)
      if (v === 0) delete e[joueur]
      else e[joueur] = v
      if (dv !== 0) {
        s.log.push({
          turn: s.turn, type: 'Système', joueur,
          texte: dv > 0
            ? `✉ ${p.nom} place un émissaire à ${c.nom} (réserve : ${p.emissaires}).`
            : `✉ ${p.nom} retire un émissaire de ${c.nom} (réserve : ${p.emissaires}).`,
        })
      }
    })

  const changerSuzerain = (nom: string, v: string) =>
    update((s) => {
      const c = (s.citesLibres ?? []).find((x) => x.nom === nom)
      if (!c) return
      const ancienNom = c.suzerain != null ? s.players.find((p) => p.n === c.suzerain)?.nom : null
      const n = v ? parseInt(v, 10) : null
      const suzNom = n != null ? s.players.find((p) => p.n === n)?.nom : null
      c.suzerain = n
      s.log.push({
        turn: s.turn, type: 'Système', joueur: n ?? null,
        texte: suzNom
          ? `🗼 ${suzNom} devient suzerain de ${nom} — la cité lui verse ses taxes à chaque fin de tour et compte comme un serment.`
          : `🗼 ${nom} n'a plus de suzerain${ancienNom ? ` (fin du serment de ${ancienNom})` : ''}.`,
      })
    })

  return (
    <div className="stack">
      {/* ═══ Réserves d'émissaires (revue 2026-10-15) : ressource
          de chaque joueur, dépensée en plaçant un émissaire dans une
          cité libre. Les ministres (Chancelier des émissaires) et les
          merveilles (Antre de la déesse araignée) créditent automatiquement. */}
      <Card title="✉ Réserves d'émissaires">
        {state.players.map((p) => (
          <div key={p.n} className="cl-emiss">
            <span className="player-chip">J{p.n} · {p.nom}</span>
            <span className="badge badge-info">{p.emissaires ?? 0} en réserve</span>
            <Button onClick={() => recruterEmissaire(p.n, -1)}>−</Button>
            <Button onClick={() => recruterEmissaire(p.n, +1)}>+</Button>
          </div>
        ))}
      </Card>

      {/* ═══ Règle et fonctionnement ═══ */}
      <Card title="🗼 Cités libres — règle et fonctionnement">
        <p className="small muted pre-wrap">{C.config.regleCitesLibres}</p>
        <div className="badges-wrap">
          <Badge tone="good">✓ population : habitants titrés (Chasseurs ×2 Nourriture)</Badge>
          <Badge tone="good">✓ garnison : 100 + 40 × rang de pays le plus haut (auto)</Badge>
          <Badge tone="good">✓ taxes au suzerain : versées à chaque fin de tour (canal « Cités libres »)</Badge>
          <Badge tone="warn">émissaires / influence : 1 tentative par saison au plateau (suivi ici)</Badge>
          <Badge tone="warn">batailles / annexions : manuel</Badge>
        </div>
        <p className="muted small">
          Chaque cité libre sous suzeraineté verse ses taxes à son suzerain à chaque fin de tour
          (canal « Cités libres » du récap).
        </p>
        <p className="muted small">
          Garnison actuelle des cités libres : <strong>{fmtNum(garnison)}</strong>
          {' '}(100 + 40 × rang de pays du joueur au plus haut rang). Suzeraineté par joueur :
          {' '}{state.players.map((p) => {
            const nb = cites.filter((c) => c.suzerain === p.n).length
            return `${p.nom} : ${nb}`
          }).join(' · ')} — la voie Diplomatique demande 3 cités libres.
        </p>
      </Card>

      {/* ═══ Création d'une cité ═══ */}
      <Card title="Créer une cité libre">
        <div className="grid-2">
          <TextInput value={newNom} onChange={setNewNom} placeholder="Nom (vide → auto)" />
          <Select
            value={newType || typeOptions[0]?.value || ''}
            options={typeOptions}
            onChange={setNewType}
          />
          <Select
            value={newCulture || cultures[0] || ''}
            options={cultures.map((c) => ({ value: c, label: c }))}
            onChange={setNewCulture}
          />
          <NumberInput value={newNb} onChange={setNewNb} min={0} />
        </div>
        <Button tone="primary" onClick={creerCite}>+ Créer la cité (et ses habitants)</Button>
      </Card>

      {/* ═══ Cités de la partie ═══ */}
      {cites.length === 0 && (
        <Card>
          <p className="muted">
            Aucune cité libre pour l'instant. Créez-en une ci-dessus lorsqu'une habitation
            devient libre (perdue par tout autre moyen que l'action directe d'un autre joueur).
          </p>
        </Card>
      )}
      <div className="cl-grid">
      {cites.map((cite) => {
        const d = detailCiteLibre(cite, C)
        const suz = cite.suzerain != null ? state.players.find((p) => p.n === cite.suzerain) : undefined
        const pop = cite.population ?? []
        const vivants = pop.filter((h) => h.statut !== 'Décédé')
        const typeEffectif = typeOptions.some((o) => o.value === cite.type)
          ? cite.type
          : (cite.type || '—')
        return (
          <Card
            key={cite.nom}
            title={`🗼 ${cite.nom}`}
            right={
              <span className="badges-wrap">
                <Badge tone="info">{typeEffectif.split('\n')[0]}</Badge>
                {cite.habitation && <Badge tone="neutral">🏰 {cite.habitation}</Badge>}
                <Badge tone="neutral">⚔ {fmtNum(garnison)} de garnison</Badge>
                {suz
                  ? <Badge tone="good">Suzerain : {suz.nom}</Badge>
                  : <Badge tone="warn">Sans suzerain</Badge>}
                <Button tone="danger" onClick={() => supprimerCite(cite.nom)}>Supprimer</Button>
              </span>
            }
          >
            <div className="grid-2">
              {/* ── Identité de la cité ── */}
              <div className="mini">
                <div className="mini-title">Identité</div>
                <TextInput
                  value={cite.nom}
                  onChange={(v) => mutCite(cite.nom, (c) => { c.nom = v })}
                />
                <Select
                  value={cite.type}
                  options={typeOptions.some((o) => o.value === cite.type)
                    ? typeOptions
                    : [{ value: cite.type, label: cite.type.split('\n')[0] || '—' }, ...typeOptions]}
                  onChange={(v) => mutCite(cite.nom, (c) => { c.type = v })}
                />
                <Select
                  value={cite.culture ?? ''}
                  options={cultures.includes(cite.culture ?? '')
                    ? cultures.map((c) => ({ value: c, label: c }))
                    : [{ value: cite.culture ?? '', label: cite.culture ?? '—' }, ...cultures.map((c) => ({ value: c, label: c }))]}
                  onChange={(v) => mutCite(cite.nom, (c) => { c.culture = v })}
                />
                <Select
                  value={cite.habitation ?? ''}
                  options={[
                    { value: '', label: 'Habitation : —' },
                    { value: 'Hameau', label: 'Habitation : Hameau' },
                    { value: 'Château', label: 'Habitation : Château' },
                  ]}
                  onChange={(v) => mutCite(cite.nom, (c) => {
                    c.habitation = (v || null) as CiteLibre['habitation']
                  })}
                />
                <Select
                  value={taxesCite(cite)}
                  options={TAX_OPTIONS}
                  onChange={(v) => mutCite(cite.nom, (c) => { c.taxes = v as TaxeNiveau })}
                />
                <p className="muted small">
                  Garnison : <strong>{fmtNum(garnison)}</strong> (100 + 40 × rang de pays le
                  plus haut). Effet du type (référentiel) :{' '}
                  {typesConfig.find((t) => t.type === cite.type)?.effet ?? '—'}
                </p>
              </div>

              {/* ── Émissaires & suzerain ── */}
              <div className="mini">
                <div className="mini-title">Émissaires & suzerain</div>
                {state.players.map((p) => {
                  const e = emissairesDe(cite, p.n)
                  const reserve = p.emissaires ?? 0
                  return (
                    <div key={p.n} className="cl-emiss">
                      <span className={`player-chip ${e >= 3 ? 'chip-active' : ''}`}>
                        J{p.n} · {p.nom}
                      </span>
                      <span className="badge badge-neutral">{e} placé(s)</span>
                      <span className="badge badge-info" title="Émissaires disponibles (ressource du joueur)">
                        {reserve} en réserve
                      </span>
                      <Button onClick={() => changerEmissaires(cite.nom, p.n, -1)}>−</Button>
                      <Button disabled={reserve <= 0} onClick={() => changerEmissaires(cite.nom, p.n, +1)}>+</Button>
                      {e >= 3 && <Badge tone="good">suzerain possible</Badge>}
                    </div>
                  )
                })}
                <Select
                  value={cite.suzerain != null ? String(cite.suzerain) : ''}
                  options={[
                    { value: '', label: 'Sans suzerain' },
                    ...state.players.map((p) => ({
                      value: String(p.n),
                      label: `${p.nom} (J${p.n})`,
                    })),
                  ]}
                  onChange={(v) => changerSuzerain(cite.nom, v)}
                />
                {(cite.suzerain == null || emissairesDe(cite, cite.suzerain) < 3) && (
                  <p className="muted small">
                    Règle : le suzerain s'obtient à 3 émissaires (aucune contrainte bloquante
                    ici — le suivi des émissaires reflète le plateau).
                  </p>
                )}
              </div>
            </div>

            {/* ── Population : résumé seul — la gestion vit dans le
                panneau séparé « Population des cités libres » en bas de
                page (comme les habitants des joueurs). ── */}
            <div className="mini-title">
              Population — {vivants.length} vivant(s) / {pop.length} au total
              <span className="muted small">
                {' '}· gestion dans l'onglet « 👥 Population » (sélectionnez la cité en haut de la page)
              </span>
            </div>

            {/* ── Production & taxes ── */}
            <div className="mini-title">
              Ce que la cité produit — et verse à son suzerain
            </div>
            <div className="small">
              <span className="muted">
                {d.habitants} vivant(s), dont {d.chasseurs} chasseur(s)
                {d.chasseurs > 0 && <> — <strong>Nourriture ×2</strong> (règle des cités libres)</>}
                {' '}· taxes ×{d.taxeMult}
              </span>
              <div className="badges-wrap">
                {Object.entries(d.titres).map(([res, v]) => (
                  <span key={res} className="badge badge-info">titres : +{fmtNum(v)} {res}</span>
                ))}
                {Object.entries(d.conso).map(([res, v]) => (
                  <span key={res} className="badge badge-neutral">conso : {fmtNum(v)} {res}</span>
                ))}
              </div>
              {suz ? (
                <p className="small">
                  <strong>Taxes versées à {suz.nom} à chaque fin de tour :</strong>{' '}
                  {Object.entries(d.transfert).length === 0
                    ? <span className="muted">rien (production nette nulle ou négative)</span>
                    : Object.entries(d.transfert)
                        .map(([res, v]) => `+${fmtNum(v)} ${res}`)
                        .join(', ')}
                  {' '}(canal « Cités libres » du récap ressources).
                </p>
              ) : (
                <p className="muted small">
                  Sans suzerain, la production de la cité n'est versée à personne —
                  désignez un suzerain pour qu'il perçoive ces taxes.
                </p>
              )}
            </div>
          </Card>
        )
      })}
      </div>

    </div>
  )
}
