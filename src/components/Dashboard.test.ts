// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Accueil » (Dashboard) : tableau de bord des
//  ressources de tous les joueurs. Revue critique n°3 : un test de
//  rendu par vue — un écran blanc de régression ne passe plus la CI.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu Dashboard : le tableau de bord s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { Dashboard } = await import('./Dashboard')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(Dashboard)),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Toutes les ressources'), 'carte « Toutes les ressources » absente')
  assert.ok(html.includes('Joueur 1'), 'joueur 1 absent du tableau de bord')
})
