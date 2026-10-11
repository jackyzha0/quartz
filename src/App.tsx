// ══════════════════════════════════════════════════════════════════════
//  Application principale — navigation 7 sections + sélecteur J1..J8
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { useGame } from './state/store'
import { TurnBar } from './components/TurnBar'
import { Dashboard } from './components/Dashboard'
import { PlayerView } from './components/PlayerView'
import { PopulationTable } from './components/PopulationTable'
import { ArmiesPanel } from './components/ArmiesPanel'
import { EventLogPanel } from './components/EventLogPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { SetupPanel } from './components/SetupPanel'
import { ReferenceDataPanel } from './components/ReferenceDataPanel'
import { ParamsPanel } from './components/ParamsPanel'

type Section = 'accueil' | 'joueur' | 'population' | 'armees' | 'journal' | 'historique' | 'referentiels' | 'parametres' | 'setup'

const SECTIONS: { key: Section; label: string }[] = [
  { key: 'accueil', label: '🏛 Accueil' },
  { key: 'joueur', label: '👑 Pays' },
  { key: 'population', label: '👥 Population' },
  { key: 'armees', label: '⚔ Armées' },
  { key: 'journal', label: '📜 Journal' },
  { key: 'historique', label: '📈 Historique' },
  { key: 'referentiels', label: '📚 Référentiels' },
  { key: 'parametres', label: '🎛 Paramètres' },
  { key: 'setup', label: '⚙ Nouvelle partie' },
]

// ══════════════════════════════════════════════════════════════════════
//  Deep link : ouvrir une section directement via l'URL.
//  Ex. /jeu/#nouvelle-partie → ouvre « ⚙ Nouvelle partie » dès l'arrivée.
//  Utilisé par le bouton « ▶ Lancer une campagne » du site quartz.
// ══════════════════════════════════════════════════════════════════════

const HASH_SECTIONS: Record<string, Section> = {
  'nouvelle-partie': 'setup',
  'nouvelle_partie': 'setup',
  setup: 'setup',
}

function sectionFromHash(): Section {
  const h = window.location.hash.replace(/^#/, '').trim().toLowerCase()
  return HASH_SECTIONS[h] ?? 'accueil'
}

export default function App() {
  const { state } = useGame()
  const [section, setSection] = useState<Section>(sectionFromHash)
  const [joueur, setJoueur] = useState(1)

  // Suit aussi les changements de hash pendant la visite
  // (ex. re-clic sur le bouton du site quartz).
  useEffect(() => {
    const onHash = () => setSection(sectionFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const joueursBars = state && (
    <div className="players-bar">
      {state.players.map((p) => (
        <button
          key={p.n}
          className={`player-chip ${joueur === p.n ? 'chip-active' : ''}`}
          onClick={() => setJoueur(p.n)}
          title={`${p.peuple} · ${p.culture}`}
        >
          J{p.n} · {p.nom}
        </button>
      ))}
    </div>
  )

  return (
    <div className="app">
      <header className="header">
        <h1>🐗 Chasse &amp; Pêche <span className="thin">— Légendes</span></h1>
        <span className="muted small">portage web du classeur Excel/VBA · 8 joueurs · un tour = 2 ans</span>
      </header>

      {state ? <TurnBar /> : <div className="banner-info">Créez une partie dans « ⚙ Nouvelle partie » pour commencer.</div>}

      <nav className="nav">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            className={`tab ${section === s.key ? 'tab-active' : ''}`}
            onClick={() => setSection(s.key)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {(section === 'joueur' || section === 'population' || section === 'armees') && joueursBars}

      <main className="main">
        {!state && section !== 'setup' && section !== 'referentiels' && section !== 'parametres' ? (
          <div className="card">Aucune partie en cours. Allez dans « ⚙ Nouvelle partie ».</div>
        ) : (
          <>
            {section === 'accueil' && <Dashboard />}
            {section === 'joueur' && <PlayerView joueur={joueur} />}
            {section === 'population' && <PopulationTable joueur={joueur} />}
            {section === 'armees' && <ArmiesPanel joueur={joueur} />}
            {section === 'journal' && <EventLogPanel />}
            {section === 'historique' && <HistoryPanel />}
            {section === 'referentiels' && <ReferenceDataPanel />}
            {section === 'parametres' && <ParamsPanel />}
            {section === 'setup' && <SetupPanel />}
          </>
        )}
      </main>

      <footer className="footer muted small">
        Chasse &amp; Pêche — Légendes · portage React + TypeScript + Supabase du jeu Excel/VBA.
        Les référentiels viennent du classeur d'origine et les formules du VBA : TOUT est
        modifiable à chaud dans l'onglet « 🎛 Paramètres » (aucune contrainte bloquante).
        Multijoueur en ligne : onglet « ⚙ Nouvelle partie » → 🌐 (aucune ligne de commande,
        les identifiants Supabase se collent directement dans l'interface).
      </footer>
    </div>
  )
}
