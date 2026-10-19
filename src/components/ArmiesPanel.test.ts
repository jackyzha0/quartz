// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Armées » (ArmiesPanel) : levée d'armée,
//  réserves d'émissaires.
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu ArmiesPanel : la page Armées s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { ArmiesPanel } = await import('./ArmiesPanel')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(ArmiesPanel, { joueur: 1 })),
  )

  assert.ok(html.length > 1000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Lever une armée'), 'carte « Lever une armée » absente')
  assert.ok(html.includes('Armées de Joueur 1'), 'carte « Armées de … » absente')
})
