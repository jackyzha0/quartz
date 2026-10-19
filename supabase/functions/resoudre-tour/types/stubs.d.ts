// ══════════════════════════════════════════════════════════════════════
//  STUBS DE TYPAGE pour le typecheck tsc du handler Deno (étape CI
//  « Typecheck Edge Function », ci-jeu.yaml + deploy-function.yaml).
//
//  Contexte (bug 2026-10-19) : `cfgMondiale` était utilisé sans être
//  défini dans index.ts et est parti EN PRODUCTION vert — les tests ne
//  couvrent que le bundle moteur (_engine.mjs), jamais le handler, et
//  le tsconfig du jeu n'inclut pas supabase/functions/. Ce check
//  type-résout LE HANDLER.
//
//  Le VRAI module jsr:@supabase/supabase-js et le VRAI bundle
//  _engine.mjs sont résolus par Deno en production : ici ils sont
//  remplacés par des stubs lâches (`any`) — l'objectif du check est de
//  rattraper les identifiants non définis, les erreurs de syntaxe et
//  les fautes de frappe dans le HANDLER, pas de typer la
//  bibliothèque. Un `deno check` complet a été essayé : il tente
//  d'installer les dépendances npm transitives de supabase-js et
//  échoue en CI (jsr 2.118.0 vs node_modules du package-lock).
// ══════════════════════════════════════════════════════════════════════

/** Globals Deno utilisés par le handler (serve, env). Le stub de
 *  `env.get` retourne `string` (en production, l'absence d'une
 *  variable d'environnement échouerait de toute façon au createClient). */
declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void
  env: { get(key: string): string }
}

/** Client supabase factice : les chaînes fluides sont typées `any` —
 *  c'est le comportement du module réel côté Deno (le handler ne
 *  s'appuie pas sur des types supabase précis). */
declare module 'jsr:@supabase/supabase-js@2' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function createClient(url: string, key: string, options?: unknown): any
}

/** Bundle moteur (construit par esbuild, cf. scripts/build-function.mjs)
 *  — le vrai bundle est du JavaScript pur : côté Deno, ses exports sont
 *  typés `any`. Seules les signatures importées par le handler sont
 *  déclarées. */
declare module '*_engine.mjs' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function runTurn(state: any): any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function fusionnerSections(ref: any, sections: any): any
  export function rejouerEvenementsPartages(draft: any, evenements: any): void
  export function migrerEtat(state: any): string[]
  export function appliquerConfigMondiale(draft: any, cfg: any): void
}
