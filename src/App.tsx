// ══════════════════════════════════════════════════════════════════════
//  Application principale — navigation 7 sections + sélecteur J1..J8
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { useGame } from './state/store'
import { TurnBar } from './components/TurnBar'
import { Dashboard } from './components/Dashboard'
import { PlayerView } from './components/PlayerView'
import { RoyaumeView } from './components/RoyaumeView'
import { PopulationTable } from './components/PopulationTable'
import { ProgresView } from './components/ProgresView'
import { CitesLibresView } from './components/CitesLibresView'
import { ArmiesPanel } from './components/ArmiesPanel'
import { EventLogPanel } from './components/EventLogPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { SetupPanel } from './components/SetupPanel'
import { ReferenceDataPanel } from './components/ReferenceDataPanel'
import { ParamsPanel } from './components/ParamsPanel'
// Marqueur (a) : filet de sécurité — une erreur de rendu d'une page
//  affiche une carte rouge lisible au lieu d'une page toute blanche.
import { ErrorBoundary } from './components/ErrorBoundary'

type Section = 'accueil' | 'royaume' | 'joueur' | 'population' | 'progres' | 'citeslibres' | 'armees' | 'journal' | 'historique' | 'referentiels' | 'parametres' | 'setup'

const SECTIONS: { key: Section; label: string }[] = [
  { key: 'accueil', label: '🏛 Accueil' },
  { key: 'royaume', label: '🏰 Royaume' },
  { key: 'joueur', label: '👑 Pays' },
  { key: 'population', label: '👥 Population' },
  { key: 'progres', label: '🧪 Progrès' },
  { key: 'citeslibres', label: '🗼 Cités libres' },
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

  // Un onglet 🗼 cité libre (joueur NÉGATIF) n'existe que dans la
  //  section « 👥 Population » : en quittant cette section, on retombe
  //  sur le joueur 1 (les autres vues attendent un n° de joueur > 0).
  useEffect(() => {
    if (section !== 'population' && joueur < 0) setJoueur(1)
  }, [section, joueur])

  // Retour Thibaut (2026-10-14) : dans la section « 👥 Population »,
  //  les CITÉS LIBRES apparaissent comme des onglets supplémentaires
  //  « comme si c'étaient des joueurs » (joueur négatif = cité).
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
      {section === 'population' && (state.citesLibres ?? []).map((c, i) => (
        <button
          key={`cite-${i}`}
          className={`player-chip cite-chip ${joueur === -(i + 1) ? 'chip-active' : ''}`}
          onClick={() => setJoueur(-(i + 1))}
          title={`Cité libre${c.culture ? ` · ${c.culture}` : ''}${c.habitation ? ` · ${c.habitation}` : ''}`}
        >
          🗼 {c.nom}
        </button>
      ))}
    </div>
  )

  return (
    <ErrorBoundary>
    <div className="app">
      <header className="header">
        <h1>🐗 Chasse &amp; Pêche <span className="thin">— Légendes</span></h1>
        <span className="muted small">
          {state ? `${state.players.length} joueurs` : '2 à 8 joueurs'} · un tour = 2 ans
        </span>
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

      {(section === 'royaume' || section === 'joueur' || section === 'population' || section === 'progres' || section === 'armees') && joueursBars}

      <main className="main">
        {!state && section !== 'setup' && section !== 'referentiels' && section !== 'parametres' ? (
          <div className="card">Aucune partie en cours. Allez dans « ⚙ Nouvelle partie ».</div>
        ) : (
          <>
            {/* Marqueur (a) : filet PAR ONGLET — key={section} remonte le
                filet quand on change d'onglet, la page repart de zéro. */}
            <ErrorBoundary key={section}>
              <>
            {section === 'accueil' && <Dashboard />}
            {section === 'royaume' && <RoyaumeView joueur={joueur} />}
            {section === 'joueur' && <PlayerView joueur={joueur} />}
            {section === 'population' && <PopulationTable joueur={joueur} />}
            {section === 'progres' && <ProgresView joueur={joueur} />}
            {section === 'citeslibres' && <CitesLibresView />}
            {section === 'armees' && <ArmiesPanel joueur={joueur} />}
            {section === 'journal' && <EventLogPanel />}
            {section === 'historique' && <HistoryPanel />}
            {section === 'referentiels' && <ReferenceDataPanel />}
            {section === 'parametres' && <ParamsPanel />}
            {section === 'setup' && <SetupPanel />}
              </>
            </ErrorBoundary>
          </>
        )}
      </main>

      <footer className="footer muted small">
        Chasse &amp; Pêche — Légendes · 🎛 Paramètres : tout est modifiable à chaud ·
        multijoueur : « ⚙ Nouvelle partie » → 🌐
      </footer>
    </div>
  )
}
