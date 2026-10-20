// ═══════════════════════════════════════════════════════════════════════════
//  TEST DE RENDU — page « Population » (PopulationTable) : dynasties,
//  métiers et places par ville, colonne Domicile, ajout d'habitants (le plus gros tableau du
//  jeu — pagination 200 lignes).
// ═══════════════════════════════════════════════════════════════════════════

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prepareRendu, partieRendu } from './testRendu'

prepareRendu()

test('rendu PopulationTable : la page Population s’affiche sans crash', async () => {
  await partieRendu()
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { GameProvider } = await import('../state/store')
  const { PopulationTable } = await import('./PopulationTable')

  const html = renderToString(
    React.createElement(GameProvider, null, React.createElement(PopulationTable, { joueur: 1 })),
  )

  assert.ok(html.length > 2000, `page trop courte pour être complète : ${html.length} caractères`)
  assert.ok(html.includes('Dynasties de la population'), 'carte « Dynasties » absente')
  assert.ok(html.includes('Métiers et places par ville'), 'carte « Métiers et places par ville » absente')
  assert.ok(html.includes('Domicile'), 'colonne « Domicile » absente')
  assert.ok(html.includes('Sans-emploi'), 'ligne « Sans-emploi » absente')
  assert.ok(html.includes('Places libres'), 'colonne « Places libres » absente')
  assert.ok(html.includes('Métiers attribués'), 'récap « Métiers attribués » absent')
})
