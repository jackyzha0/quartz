// ══════════════════════════════════════════════════════════════════════
//  Arbre généalogique de la famille dirigeante d'un joueur :
//   · dynastie du Dirigeant vivant (à défaut, carte dynastie du joueur),
//   · racines = membres dont les parents ne sont pas dans la famille,
//   · enfants reliés par mereId/pereId (ids — M1 2026-10-19), conjoint affiché ⚭,
//   · défunts grisés et barrés, âge au décès conservé.
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useGame } from '../state/store'
import type { Character } from '../engine/types'

import { cfgOf } from '../engine/gameData'
import { Card } from './ui'

export function GenealogyTree({ joueur }: { joueur: number }) {
  const { state } = useGame()
  if (!state) return null
  const C = cfgOf(state.config)
  const p = state.players.find((x) => x.n === joueur)
  if (!p) return null

  const pop = state.population[joueur] ?? []
  const vivants = pop.filter((c) => c.statut !== 'Décédé')
  const dirigeant = vivants.find((c) => c.titre === C.p.titreDirigeant)
  // Famille dirigeante = dynastie du Dirigeant vivant (à défaut la carte
  // dynastie en cours), roturiers exclus.
  const dyn = dirigeant?.dynastie ?? p.dynastie?.nom ?? null
  if (!dyn || dyn === C.p.dynastieRoturier) {
    return (
      <Card title="🌳 Arbre généalogique">
        <p className="muted">Aucune famille dirigeante : ce joueur n'a ni {C.p.titreDirigeant} ni dynastie.</p>
      </Card>
    )
  }

  // Tous les membres de la famille, vivants et défunts (l'arbre montre
  // aussi l'histoire : morts grisés).
  const famille = pop.filter((c) => c.dynastie === dyn)
  // M1 (2026-10-19) : filiation résolue par IDS (mereId/pereId) — les
  //  noms complets restent pour l'affichage uniquement.
  const byId = new Map<string, Character>()
  for (const c of famille) byId.set(c.id, c)

  // Racines : membres dont aucun parent n'est lui-même membre de la
  // famille (les conjoints extérieurs ne comptent pas comme parents
  // ici — seul le lien mere/pere vers un MÉMBER est remonté).
  const parentDansFamille = (c: Character) =>
    (c.mereId && byId.has(c.mereId)) || (c.pereId && byId.has(c.pereId))
  const racines = famille.filter((c) => !parentDansFamille(c))

  const enfantsDe = (c: Character, vus: Set<string>): Character[] =>
    famille.filter((k) => {
      if (vus.has(k.id)) return false
      return k.mereId === c.id || k.pereId === c.id
    })

  // Rendu récursif d'un membre (vus évite les doublons lorsque les
  // deux parents appartiennent à la famille).
  const rendre = (c: Character, vus: Set<string>): React.ReactNode => {
    vus.add(c.id)
    const enfants = enfantsDe(c, vus).filter((k) => !vus.has(k.id))
    for (const k of enfants) vus.add(k.id)
    return (
      <li key={c.id}>
        <div className={`gt-node ${c.statut === 'Décédé' ? 'gt-dead' : ''}`}>
          <div><strong>{c.prenom}</strong> <span className="muted">{c.nom}</span></div>
          <div className="gt-sub">
            {c.statut === 'Décédé' ? `† ${c.age} ans` : `${c.age} ans`}
            {c.titre ? ` · ${c.titre}` : ''}
            {c.sexe === 'F' && c.statut === 'Enceinte' ? ' · enceinte' : ''}
          </div>
          {c.mariage && <div className="gt-spouse">⚭ {c.mariage}</div>}
        </div>
        {enfants.length > 0 && (
          <ul>{enfants.map((k) => rendre(k, vus))}</ul>
        )}
      </li>
    )
  }

  return (
    <Card title={`🌳 Arbre généalogique — famille ${dyn}`}>
      <div className="gt-wrap">
        <div className="gtree">
          <ul>
            {racines.map((c) => rendre(c, new Set<string>()))}
          </ul>
        </div>
      </div>
      <p className="muted small">
        {famille.length} membres (vivants et défunts) · conjoints extérieurs à la famille affichés ⚭ ·
        défunts grisés (âge au décès).
      </p>
    </Card>
  )
}
