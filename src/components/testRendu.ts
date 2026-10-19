// ══════════════════════════════════════════════════════════════════════
//  AIDE AUX TESTS DE RENDU (retour de revue critique n°3) : amorcer
//  l'environnement Node (pas de DOM) puis charger dans le
//  localStorage une VRAIE partie, pour que GameProvider expose un
//  état non-null au premier rendu (renderToString ne joue PAS les
//  useEffect — la partie doit déjà être en localStorage AVANT le
//  montage du Provider, l'état initial est lu dans useState).
//
//  Ce fichier n'est PAS collecté par `tsx --test src/**/*.test.ts`
//  (il ne s'appelle pas *.test.ts) : il n'est qu'un helper d'import.
// ══════════════════════════════════════════════════════════════════════

import type { SetupLine } from '../engine/setup'

/** Shim minimal de localStorage (le store et le storage y accèdent en
 *  try/catch — sous Node l'identifiant n'existe pas sans ce shim). */
export function prepareRendu(): void {
  const store = new Map<string, string>()
  const ls = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, String(v)) },
    removeItem: (k: string) => { store.delete(k) },
    clear: () => { store.clear() },
    key: (_i: number) => null,
    get length() { return store.size },
  }
  ;(globalThis as unknown as { localStorage: typeof ls }).localStorage = ls
}

/** Crée une vraie partie à 8 joueurs (graine fixe → déterministe),
 *  joue 2 tours complets (remplit state.history pour HistoryPanel
 *  et le récap « dernier tour ») puis l'écrit dans le localStorage
 *  shimmé. À appeler APRÈS prepareRendu(), AVANT de rendre le
 *  GameProvider. Les imports sont DYNAMIQUES pour que le shim soit
 *  en place avant tout code applicatif. */
export async function partieRendu(): Promise<void> {
  const { createGame } = await import('../engine/setup')
  const { runTurn } = await import('../engine/engine')
  const { saveLocal } = await import('../state/storage')

  const PEUPLES = ['Basiléens', 'PEAUX VERTES', "ELFES D'OR", 'Sylvains', 'NORLS', 'VERMINES DE KAOSS']
  const CULTURES = ['Communautarisme', 'Déisme', 'Lunisme', 'Naturalisme', 'Sethisme', 'Zélotisme']
  const REGIMES = ['Autoritarisme', 'Socialisme', 'Démocratie', 'Monarchie']
  const setups: SetupLine[] = Array.from({ length: 8 }, (_, i) => ({
    nom: `Joueur ${i + 1}`,
    peuple: PEUPLES[i % PEUPLES.length],
    culture: CULTURES[i % CULTURES.length],
    regime: REGIMES[i % REGIMES.length],
    taillePopulation: 50,
    pourcentageMariages: 40,
    villes: [`Capitale ${i + 1}`],
  }))
  const state = runTurn(runTurn(createGame(setups, 20261019, 'local')))
  saveLocal(state)
}
