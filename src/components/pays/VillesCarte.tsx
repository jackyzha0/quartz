// ══════════════════════════════════════════════════════════════════════
//  CARTE « Villes » de la page Pays : grille des villes (2 par ligne,
//  une <VilleCarte> par ville) + pied « + Ajouter une ville / un
//  château » (50 habitants sans noble — marqueur (w)).
//  (Extrait de PlayerView.tsx — un fichier par UI.)
// ══════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import type { GameState, Player } from '../../engine/types'
import { rangsDisponibles, debiterCoutHabitation } from '../../engine/engine'
import { peuplerNouvelleVille } from '../../engine/setup'
import type { Cfg } from '../../engine/gameData'
import { Card, Select, Button } from '../ui'
import { VilleCarte } from './VilleCarte'
import type { ChoixSurintendant } from './pays-utils'

export function VillesCarte({ joueur, p, C, setPlayer, setSurint, setSurintRes }: {
  joueur: number
  p: Player
  C: Cfg
  setPlayer: (fn: (p: Player, s: GameState) => void) => void
  setSurint: (v: ChoixSurintendant | null) => void
  setSurintRes: (v: string) => void
}) {
  // Type d'habitation de la prochaine ville ajoutée (retour Thibaut,
  // marqueur (r) : choisir ville ou château à la création).
  const [typeAjout, setTypeAjout] = useState<'Ville' | 'Château'>('Ville')
  return (
    <Card title="Villes">
      {/* 2 villes par ligne ; repli à 1 colonne en fenêtre étroite —
          les tableaux internes restent lisibles (défilement horizontal
          via .table-wrap si besoin). */}
      <div className="grid-villes">
        {p.villes.map((ville, idx) => (
          <VilleCarte
            key={idx} idx={idx} ville={ville} joueur={joueur} p={p} C={C}
            setPlayer={setPlayer}
            setSurint={setSurint} setSurintRes={setSurintRes}
          />
        ))}
      </div>
      <div className="filters" style={{ alignItems: 'center' }}>
        <Select
          value={typeAjout}
          options={[
            { value: 'Ville', label: 'Ville (Hameau → Cité → Grande Cité)' },
            { value: 'Château', label: 'Château (Motte → Donjon → Forteresse)' },
          ]}
          onChange={(v) => setTypeAjout(v as 'Ville' | 'Château')}
        />
        <Button onClick={() => setPlayer((x, s) => {
          const nom = `${typeAjout} ${x.villes.length + 1}`
          x.villes.push({ nom, culture: x.culture, taxes: 'Moyenne', type: typeAjout, rang: rangsDisponibles(typeAjout, C)[0] ?? 'Hameau', batiments: [], amenagements: [], autres: [] })
          debiterCoutHabitation(s, x, x.villes[x.villes.length - 1], C, true)
          // Marqueur (w), retour Thibaut : une nouvelle ville (ou un
          // nouveau château) démarre avec 50 habitants SANS noble,
          // paramètres similaires à la première ville.
          peuplerNouvelleVille(s, x, nom, 50, C)
        })}>{typeAjout === 'Château' ? '+ Ajouter un château' : '+ Ajouter une ville'}</Button>
      </div>
    </Card>
  )
}
