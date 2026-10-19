// ══════════════════════════════════════════════════════════════════════
//  Armées : lever, renommer, nommer un commandant, définir la cible,
//  dissoudre (portage de LeverArmee / NommerCommandant / RetirerArmee).
//  Général = 45 pts, Soldat = 15 pts, soldat = adulte 16-30 ans conforme
//  à la Martialité de la culture.
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import { useGame } from '../state/store'
import type { GameState, Player } from '../engine/types'
import { cfgOf, cultureDef } from '../engine/gameData'
import { prixArmee, infligerPertes, libererSoldats } from '../engine/armees'
import { isNobleDyn, martialiteOk } from '../engine/engine'
import { Card, NumberInput, Select, TextInput, Button, fmt } from './ui'

export function ArmiesPanel({ joueur }: { joueur: number }) {
  const { state, update } = useGame()
  const [nom, setNom] = useState('')
  const [cible] = useState<number | null>(null)
  const [commandant, setCommandant] = useState('')
  const [puissance, setPuissance] = useState(90)
  // Revue Thibaut 2026-10-15 : la levée se passe DANS une habitation
  //  — le joueur choisit la ville, les bonus de ses bâtiments
  //  s'appliquent (Terrain d'entrainement −10 Or, Ecole militaire
  //  −25, Grande caserne −8, Guilde des explorateurs −20,
  //  Autel eud Guer' −20).
  const [villeLevee, setVilleLevee] = useState('')
  // Pertes par armée (revue 2026-10-17) : saisie locale du nombre de
  //  soldats à tuer (l'ordre d'engagement = ordre du tableau).
  const [pertesParArmee, setPertesParArmee] = useState<Record<number, number>>({})
  const [tuerCmdParArmee, setTuerCmdParArmee] = useState<Record<number, boolean>>({})

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

  // Prix avec réductions automatiques : Grand écuyer (ministre,
  //  −10 Or par rang de pays) et Vengeance de la terre (Sylvains,
  //  −10 Or par apiculture) — mêmes paramètres que le débit.
  const villeLeveeObj = p.villes.find((v) => v.nom === villeLevee)
  const prix = prixArmee(puissance, C, p, state, villeLeveeObj)
  // Prix SANS le bonus de la ville (pour afficher la réduction)
  const prixBrut = prixArmee(puissance, C, p, state)
  const orDispo = p.resources['Or']?.stock ?? 0
  const leverArmee = () => {
    const cmd = commandantsDispo.find((c) => c.id === commandant)
    if (!cmd) return
    const nomArmee = nom.trim() || `Armée ${p.armees.length + 1}`
    update((s) => {
      const target = s.players.find((x) => x.n === joueur)
      if (!target) return
      // Prix de levée (classeur : 1 Or tous les 2 points de force) :
      // débité UNE FOIS à la levée — pas d'entretien par tour.
      const prix2 = prixArmee(puissance, C, target, s, villeLeveeObj)
      const rs = target.resources['Or']
      if (rs && rs.stock < prix2) return
      if (rs && prix2 > 0) rs.stock -= prix2
      // Stratégies militaires I : flag one-shot consommé.
      if (target.prochaineArmeeReduite) target.prochaineArmeeReduite = false
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
      s.log.push({
        turn: s.turn, type: 'Armée', joueur,
        texte: `⚔ ${target.nom} lève l'armée « ${nomArmee} » (cible ${fmt(puissance)} pts) — prix de levée : −${prix2} Or (1 Or tous les ${C.p.armeePriXPuissance} pts de force).`,
      })
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
              {/* ── Infliger des pertes (revue 2026-10-17) : tuer N soldats
                  de l'armée — batailles au plateau, saisie des pertes ici. */}
              <div className="row" style={{ alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <span className="muted small">⚔ Pertes :</span>
                <NumberInput
                  value={pertesParArmee[idx] ?? 1}
                  step={1} min={0} max={999}
                  onChange={(v) => setPertesParArmee((m) => ({ ...m, [idx]: Math.round(v) }))}
                />
                <label className="small" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="checkbox"
                    checked={!!tuerCmdParArmee[idx]}
                    onChange={(e) => setTuerCmdParArmee((m) => ({ ...m, [idx]: e.target.checked }))}
                  />
                  commandant aussi
                </label>
                <Button tone="danger" onClick={() => {
                  const nb = Math.round(pertesParArmee[idx] ?? 0)
                  if (nb <= 0) return
                  if (!window.confirm(`Infliger ${nb} perte(s) à « ${a.nom} » ? Les soldats correspondants seront tués (statut « Décédé »).`)) return
                  setPlayer((x, s2) => { infligerPertes(s2, x, idx, nb, !!tuerCmdParArmee[idx]) })
                }}>⚔ Infliger {Math.round(pertesParArmee[idx] ?? 0)} perte(s)</Button>
                {/* ── Fin de service (revue 2026-10-17) : N soldats
                    quittent l'armée, redeviennent Chasseurs. */}
                <Button onClick={() => {
                  const nb = Math.round(pertesParArmee[idx] ?? 0)
                  if (nb <= 0) return
                  if (!window.confirm(`Libérer ${nb} soldat(s) de « ${a.nom} » ? Ils quittent l'armée et redeviennent Chasseurs (vivants et productifs).`)) return
                  setPlayer((x, s2) => { libererSoldats(s2, x, idx, nb, !!tuerCmdParArmee[idx]) })
                }}>🕊 Libérer {Math.round(pertesParArmee[idx] ?? 0)} en fin de service</Button>
              </div>
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
          <label className="field">
            <span className="field-label">Ville de levée (bonus de ses bâtiments)</span>
            <Select
              value={villeLevee}
              options={[
                { value: '', label: '(hors habitation — aucun bonus)' },
                ...p.villes.map((v) => ({ value: v.nom, label: v.nom })),
              ]}
              onChange={setVilleLevee}
            />
          </label>
        </div>
        <p className="small" style={{ margin: '4px 0' }}>
          Prix de levée : <strong>{fmt(prix)} Or</strong>{' '}
          <span className="muted">
            ({C.p.armeePrixOr} Or tous les {C.p.armeePriXPuissance} points de force — payé une fois, pas d'entretien)
          </span>
          {prixBrut > prix && (
            <span className="muted"> · réductions : −{fmt(prixBrut - prix)} Or (Grand écuyer, merveilles, bâtiments de la ville)</span>
          )}
          {orDispo < prix && <span className="neg"> ⚠ Or insuffisant ({fmt(orDispo)} disponible)</span>}
        </p>
        <Button tone="primary" disabled={!commandant || orDispo < prix} onClick={leverArmee}>⚔ Lever l'armée</Button>
        <p className="muted small" style={{ margin: '4px 0 0' }}>
          Armées : {p.armees.length} (aucun plafond).
        </p>
        <p className="muted small">
          Chaque tour, l'armée recrute automatiquement des soldats (adultes 16-30 ans, conformes à la
          martialité de votre culture) jusqu'à atteindre la puissance cible. Le prix de levée
          (1 Or tous les 2 points de force) est débité une seule fois, à la création de
          l'armée. Choisir une VILLE DE LEVÉE applique les bonus de ses bâtiments
          (Terrain d'entrainement −10 Or, Ecole militaire −25, Grande caserne −8,
          Guilde des explorateurs −20, Autel eud Guer' −20).
        </p>
      </Card>
    </div>
  )
}
