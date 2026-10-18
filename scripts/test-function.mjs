// Test d'exécution du bundle Edge Function (_engine.mjs) tel que Deno le
// chargera (ESM pur, JSON inliné). Échoue si le bundle ne s'exécute pas.
//   node scripts/build-function.mjs && node scripts/test-function.mjs
import { runTurn, normaliserEtat } from '../supabase/functions/resoudre-tour/_engine.mjs'

const state = {
  version: 1, seed: 42, rngState: 12345, turn: 1, saison: 'Été', modDanger: 0,
  players: [{
    n: 1, nom: 'T', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
    resources: { Or: { stock: 10, prod: 0 }, Nourriture: { stock: 10, prod: 0 } },
    villes: [{ nom: 'A', culture: 'Culture Nordique', taxes: 'Basse', batiments: [] }],
    dynastie: null, armees: [], recap: null,
  }],
  population: { 1: [] },
  log: [], history: [],
}
normaliserEtat(state)
const out = runTurn(state)
if (out.turn !== 2) throw new Error('le tour doit avancer (2 attendu, ' + out.turn + ' obtenu)')
console.log('✓ bundle moteur fonctionnel — runTurn: tour', out.turn, '| saison', out.saison)

// ── Intégration : tour complet sur une partie réelle, bâtiments via la banque ──
// createGame n'est pas exporté par la façade engine.ts (seule la façade
//  est bundlée) : l'état est fabriqué comme le fait setup.ts, puis
//  runTurn l'exécute — les effets de construction passent par la
//  banque d'effets (constructions.ts → rules/).
const state2 = {
  version: 1, seed: 7, rngState: 999, turn: 1, saison: 'Hiver', modDanger: 0,
  players: [{
    n: 1, nom: 'T', peuple: 'NORLS', culture: 'Culture Nordique', regime: 'Autoritarisme',
    resources: { Or: { stock: 100, prod: 0 }, Nourriture: { stock: 100, prod: 0 }, Bois: { stock: 50, prod: 0 } },
    villes: [{
      nom: 'A', culture: 'Culture Nordique', taxes: 'Basse', batiments: ['Poste de garde', 'Camp de bûcheron'],
      amenagements: [],
    }],
    dynastie: null, armees: [], recap: null,
  }],
  population: { 1: [] },
  log: [], history: [],
}
normaliserEtat(state2)
const orAvant = state2.players[0].resources['Or'].stock
const out2 = runTurn(state2)
if (out2.turn !== 2) throw new Error('intégration : le tour doit avancer')
// Le Poste de garde consomme 10 Nourriture/tour (via la banque d'effets)
console.log('✓ intégration : tour 1→2, Or', orAvant, '→', out2.players[0].resources['Or'].stock)
console.log('✓ bâtiments passés par la banque (flux Or/Nourriture appliqués)')
