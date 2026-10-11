// ══════════════════════════════════════════════════════════════════════
//  Armées : lever, renommer, nommer un commandant, définir la cible,
//  dissoudre (portage de LeverArmee / NommerCommandant / RetirerArmee).
//  Général = 45 pts, Soldat = 15 pts, soldat = adulte 16-30 ans conforme
//  à la Martialité de la culture.
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useGame } from '../state/store'
import type { GameState, Player } from '../engine/types'
import { cfgOf, cultureDef } from '../engine/gameData'
import { isNobleDyn, martialiteOk } from '../engine/engine'
import { Card, NumberInput, Select, TextInput, Button, fmt } from './ui'

export function ArmiesPanel({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  const [nom, setNom] = useState('')
  const [cible, setCible] = useState<number | null>(null)
  const [commandant, setCommandant] = useState('')
  const [puissance, setPuissance] = useState(90)

  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return null
  const pop = state.population[joueur] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  const cult = cultureDef(p.culture, C.config)

  // Nobles adultes vivants, pas déjà engagés dans une armée
  const commandantsDispo = vivants.filter(
    (c) => c.age >= C.p.adultAge && isNobleDyn(c.dynastie, C) && !c.armee
      && martialiteOk(cult?.martialite, c.sexe),
  )

  // Le mutateur reçoit (joueur, état) : la population vit dans
  // state.population[joueur], PAS dans le Player (sinon crash « reading »).
  const setPlayer = (fn: (p: Player, s: GameState) => void) =>
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (target) fn(target, s)
    })

  const leverArmee = () => {
    const cmd = commandantsDispo.find((c) => c.id === commandant)
    if (!cmd) return
    const nomArmee = nom.trim() || `Armée ${p.armees.length + 1}`
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (!target) return
      target.armees.push({
        nom: nomArmee,
        puissanceCible: puissance,
        puissance: C.p.puissanceGeneral,
        commandant: cmd.id,
        soldats: [],
        cible: cible ? state.players.find((q) => q.n === cible)?.nom ?? null : null,
      })
      const pers = (s.population[joueur] ?? []).find((c) => c.id === cmd.id)
      if (pers) {
        pers.titre = C.p.titreCommandant
        pers.armee = nomArmee
      }
    })
    setNom('')
    setCommandant('')
    setPuissance(90)
  }

  return (
    <div className="stack">
      <Card title={`Armées de ${p.nom} (culture : martialité ${cult?.martialite ?? '?'} — Soldat 15 pts, Général 45 pts)`}>
        {p.armees.length === 0 && <p className="muted">Aucune armée en lice.</p>}
        {p.armees.map((a, idx) => {
          const cmd = a.commandant ? vivants.find((c) => c.id === a.commandant) : undefined
          const cmdMort = a.commandant && (!cmd || cmd.statut === 'Décédé')
          return (
            <div key={idx} className={`mini ${cmdMort ? 'warn-box' : ''}`}>
              <div className="mini-title">
                <TextInput value={a.nom} onChange={(v) => setPlayer((x, s) => {
                  const ancien = x.armees[idx].nom
                  x.armees[idx].nom = v
                  // renommer chez les soldats et le commandant
                  for (const c of s.population[joueur] ?? []) {
                    if (c.armee === ancien) c.armee = v
                  }
                })} />
              </div>
              <div className="small">
                Puissance : <strong>{fmt(a.puissance)}</strong> / cible {fmt(a.puissanceCible)} ·
                soldats : {a.soldats.length}
                {cmd && <span> · commandant : <strong>{cmd.prenom} {cmd.nom}</strong></span>}
                {cmdMort && <span className="neg"> · ⚠ commandant tombé, à remplacer !</span>}
              </div>
              <div className="grid-2">
                <Select
                  value={a.commandant ?? ''}
                  options={[
                    ...(cmd ? [{ value: cmd.id, label: `${cmd.prenom} ${cmd.nom}` }] : []),
                    { value: '', label: '(sans commandant)' },
                    ...commandantsDispo
                      .filter((c) => c.id !== a.commandant)
                      .map((c) => ({ value: c.id, label: `${c.prenom} ${c.nom} (${c.dynastie})` })),
                  ]}
                  onChange={(v) => setPlayer((x, s) => {
                    const pers = (s.population[joueur] ?? [])
                    const ancien = x.armees[idx].commandant
                    if (ancien) {
                      const ancienPers = pers.find((c) => c.id === ancien)
                      if (ancienPers) {
                        ancienPers.titre = null
                        ancienPers.armee = null
                      }
                    }
                    x.armees[idx].commandant = v || null
                    if (v) {
                      const nouveau = pers.find((c) => c.id === v)
                      if (nouveau) {
                        nouveau.titre = C.p.titreCommandant
                        nouveau.armee = x.armees[idx].nom
                      }
                    }
                  })}
                />
                <Select
                  value={a.cible ?? ''}
                  options={[
                    { value: '', label: 'Pas de cible' },
                    ...state.players.filter((q) => q.n !== p.n).map((q) => ({ value: q.nom, label: `Cible : ${q.nom}` })),
                  ]}
                  onChange={(v) => setPlayer((x) => { x.armees[idx].cible = v || null })}
                />
              </div>
              <Button tone="danger" onClick={() => setPlayer((x, s) => {
                const armee = x.armees[idx]
                const pers = s.population[joueur] ?? []
                for (const c of pers) {
                  if (c.armee === armee.nom) {
                    c.armee = null
                    c.titre = 'Chasseur' // re-titré comme RetirerArmee
                  }
                }
                x.armees.splice(idx, 1)
              })}>Dissoudre l'armée</Button>
            </div>
          )
        })}
      </Card>

      <Card title="Lever une armée (LeverArmee)">
        <div className="grid-3">
          <label className="field">
            <span className="field-label">Nom de l'armée</span>
            <TextInput value={nom} onChange={setNom} placeholder="Garde royale…" />
          </label>
          <label className="field">
            <span className="field-label">Commandant (noble adulte libre)</span>
            <Select
              value={commandant}
              options={[
                { value: '', label: '(choisir…)' },
                ...commandantsDispo.map((c) => ({ value: c.id, label: `${c.prenom} ${c.nom} (${c.dynastie})` })),
              ]}
              onChange={setCommandant}
            />
          </label>
          <label className="field">
            <span className="field-label">Puissance cible (45-300)</span>
            <NumberInput value={puissance} onChange={setPuissance} step={15} min={45} max={300} />
          </label>
        </div>
        <Button tone="primary" disabled={!commandant} onClick={leverArmee}>⚔ Lever l'armée</Button>
        <p className="muted small">
          Chaque tour, l'armée recrute automatiquement des soldats (adultes 16-30 ans, conformes à la
          martialité de votre culture) jusqu'à atteindre la puissance cible.
        </p>
      </Card>
    </div>
  )
}
