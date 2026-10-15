// ══════════════════════════════════════════════════════════════════════
//  ERROR BOUNDARY — filet de sécurité React (marqueur (a), 2026-10-15)
//  Avant : une erreur de rendu démontait TOUT l'arbre React → page
//  ENTIÈREMENT BLANCHE, sans aucun message (impossible à diagnostiquer
//  à distance). Désormais : une carte rouge lisible avec le message de
//  l'erreur et sa pile d'appel, un bouton « recharger » et un bouton
//  « copier le rapport » à envoyer à l'ingénieur. Le reste de l'app
//  continue de fonctionner — changer d'onglet remet la page en état.
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { Button } from './ui'

interface Props {
  children: React.ReactNode
}

interface State {
  err: Error | null
  stack: string
  componentStack: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { err: null, stack: '', componentStack: '' }

  static getDerivedStateFromError(err: Error): Partial<State> {
    return { err, stack: err.stack ?? String(err) }
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    // Pile complète dans la console du navigateur (F12) pour le debug.
    console.error('[Chasse & Pêche] erreur de rendu :', err, info)
    const compStack = String(info?.componentStack ?? '')
    this.setState({ stack: err.stack ?? String(err), componentStack: compStack })
  }

  render() {
    const { err } = this.state
    if (!err) return this.props.children
    const rapport = [
      'CHASSE & PÊCHE — rapport d\'erreur',
      `Message : ${err.message}`,
      `Page : ${window.location.href}`,
      `Navigateur : ${navigator.userAgent}`,
      `Date : ${new Date().toISOString()}`,
      '— Pile d\'appel —',
      this.state.stack || '—',
      '— Composants —',
      (this.state.componentStack || '—').trim().split('\n').slice(0, 14).join('\n'),
    ].join('\n')
    const copier = () => {
      try { void navigator.clipboard?.writeText(rapport) } catch { /* repli ci-dessous */ }
      try {
        const ta = document.createElement('textarea')
        ta.value = rapport
        document.body.appendChild(ta)
        ta.select()
        try { document.execCommand('copy') } catch { /* noop */ }
        document.body.removeChild(ta)
      } catch { /* noop */ }
    }
    return (
      <div className="card err-boundary">
        <h3>⚠ Une erreur est survenue — cette page n'a pas pu s'afficher</h3>
        <p className="small">
          Le reste de l'application fonctionne : change d'onglet pour continuer à jouer
          (la page repartira de zéro). Pour corriger le problème, clique sur
          « 📋 Copier le rapport » et envoie le texte à l'ingénieur.
        </p>
        <pre className="err-stack">{rapport}</pre>
        <div className="filters">
          <Button tone="primary" onClick={() => window.location.reload()}>🔄 Recharger l'application</Button>
          <Button onClick={copier}>📋 Copier le rapport</Button>
        </div>
      </div>
    )
  }
}
