// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Cités libres » (CitesLibresView) : règles de
//  fonctionnement, création d'une cité libre, annexion.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu CitesLibresView : la page Cités libres s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { CitesLibresView } = await import('./CitesLibresView')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(CitesLibresView)),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Cités libres'), 'titre « Cités libres » absent')
  assert.ok(html.includes('Créer une cité libre'), 'carte « Créer une cité libre » absente')
})
