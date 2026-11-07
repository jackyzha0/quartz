import { styleText } from "util"
import { isMainThread } from "node:worker_threads"

/**
 * Build diagnostics: what Quartz knows about the plugins it loaded, collected so that
 *
 * 1. warnings printed while loading the config (capabilities, versions, layout, options, built-ins)
 *    are repeated in a short summary at the end of the build, instead of scrolling away above
 *    hundreds of lines of per-file output;
 * 2. an error thrown by a plugin can be explained: which plugin (package, version, source), what it
 *    was doing, and known problems with it (requires a newer Quartz, missing required data …).
 *
 * The store is process-wide (globalThis) because the config loader may be loaded as several module
 * copies (CLI + bundled build). Worker threads have their own store; they only need plugin origins.
 */

export type DiagnosticSeverity = "warning" | "info"

export interface Diagnostic {
  severity: DiagnosticSeverity
  /** Short area label: "plugins", "capabilities", "layout", "config", "links", "emit" … */
  area: string
  message: string
  hint?: string
  /** Plugin the diagnostic is about (display name), if any. */
  plugin?: string
}

/** Where a plugin instance came from — used to attribute errors. */
export interface PluginOrigin {
  /** Instance name (e.g. "LinkProcessing", "Links"). */
  name: string
  /** Config source or package (e.g. "@quartz-community/graph", "github:me/plugin"); "built-in" for core. */
  source: string
  /** Manifest / package name used in messages (e.g. "graph"). */
  displayName: string
  version?: string
  category?: string
  /** Where to report bugs (repository issues page), when known. */
  issues?: string
  /** Declared `quartzVersion` range. */
  quartzVersion?: string
  builtin?: boolean
}

interface Store {
  diagnostics: Diagnostic[]
  keys: Set<string>
  origins: WeakMap<object, PluginOrigin>
  originsByName: Map<string, PluginOrigin>
  /** Plugin display name → problems known before the build ran (version, capabilities). */
  knownProblems: Map<string, string[]>
  /** Slug → name of the filter that removed it. */
  filtered: Map<string, string>
}

const STORE_KEY = Symbol.for("quartz.diagnostics")

function store(): Store {
  const g = globalThis as Record<symbol, Store | undefined>
  return (g[STORE_KEY] ??= {
    diagnostics: [],
    keys: new Set(),
    origins: new WeakMap(),
    originsByName: new Map(),
    knownProblems: new Map(),
    filtered: new Map(),
  })
}

/** Record a diagnostic (deduplicated). Returns false when it was already recorded. */
export function recordDiagnostic(diagnostic: Diagnostic): boolean {
  const s = store()
  const key = `${diagnostic.severity}\u0000${diagnostic.area}\u0000${diagnostic.message}`
  if (s.keys.has(key)) return false
  s.keys.add(key)
  s.diagnostics.push(diagnostic)
  if (diagnostic.plugin && diagnostic.severity === "warning") {
    const list = s.knownProblems.get(diagnostic.plugin) ?? []
    list.push(diagnostic.message)
    s.knownProblems.set(diagnostic.plugin, list)
  }
  return true
}

export function getDiagnostics(): readonly Diagnostic[] {
  return store().diagnostics
}

/** Forget diagnostics (between rebuilds in watch mode, and in tests). Origins are kept. */
export function resetDiagnostics(): void {
  const s = store()
  s.diagnostics = []
  s.keys.clear()
  s.knownProblems.clear()
  s.filtered.clear()
}

export function registerPluginOrigin(instance: object, origin: PluginOrigin): void {
  const s = store()
  s.origins.set(instance, origin)
  for (const key of [origin.name, origin.displayName]) {
    if (!s.originsByName.has(key)) s.originsByName.set(key, origin)
  }
}

export function getPluginOrigin(instanceOrName: object | string): PluginOrigin | undefined {
  const s = store()
  return typeof instanceOrName === "string"
    ? s.originsByName.get(instanceOrName)
    : s.origins.get(instanceOrName)
}

/** Problems recorded for a plugin before it failed (by display name or instance name). */
export function knownProblemsFor(origin: Pick<PluginOrigin, "displayName" | "name">): string[] {
  const s = store()
  return [
    ...new Set([
      ...(s.knownProblems.get(origin.displayName) ?? []),
      ...(s.knownProblems.get(origin.name) ?? []),
    ]),
  ]
}

export function recordFiltered(slug: string, filter: string): void {
  store().filtered.set(slug, filter)
}

export function filteredBy(slug: string): string | undefined {
  return store().filtered.get(slug)
}

/**
 * Record a warning and print it right away (main thread, once). Use for problems found while
 * loading the config; they are repeated in the end-of-build summary.
 */
export function warn(diagnostic: Omit<Diagnostic, "severity">): void {
  const fresh = recordDiagnostic({ ...diagnostic, severity: "warning" })
  if (!fresh || !isMainThread || process.env.QUARTZ_CONFIG_QUIET === "1") return
  console.warn(styleText("yellow", "⚠") + ` ${diagnostic.message}`)
  if (diagnostic.hint) console.warn(styleText("gray", `    → ${diagnostic.hint}`))
}

/** Print the end-of-build summary of warnings (and infos with --verbose). */
export function printDiagnosticsSummary(options: { verbose?: boolean } = {}): void {
  if (!isMainThread || process.env.QUARTZ_CONFIG_QUIET === "1") return
  const all = getDiagnostics()
  const warnings = all.filter((d) => d.severity === "warning")
  const infos = all.filter((d) => d.severity === "info")
  if (warnings.length === 0 && infos.length === 0) return

  const lines: string[] = [""]
  if (warnings.length > 0) {
    lines.push(
      styleText(
        "yellow",
        `⚠ Build finished with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}:`,
      ),
    )
    for (const d of warnings.slice(0, 15)) {
      lines.push(`  ${styleText("gray", `[${d.area}]`)} ${d.message}`)
      if (d.hint) lines.push(styleText("gray", `      → ${d.hint}`))
    }
    if (warnings.length > 15) lines.push(styleText("gray", `  … and ${warnings.length - 15} more`))
  }
  for (const d of options.verbose ? infos : infos.slice(0, 5)) {
    lines.push(`${styleText("cyan", "ℹ")} ${styleText("gray", `[${d.area}]`)} ${d.message}`)
    if (d.hint) lines.push(styleText("gray", `      → ${d.hint}`))
  }
  if (!options.verbose && infos.length > 5) {
    lines.push(styleText("gray", `ℹ … ${infos.length - 5} more notes (run with --verbose)`))
  }
  console.log(lines.join("\n"))
}
