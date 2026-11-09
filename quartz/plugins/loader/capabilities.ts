/**
 * Declared plugin capabilities (`package.json` → `quartz.capabilities`).
 *
 * Plugins talk to each other implicitly: through `file.data` keys, DOM classes their scripts
 * query, browser globals, document events, CSS variables and emitted files such as
 * `static/contentIndex.json`. This module lets a plugin *declare* what it provides and what it
 * needs, and checks the enabled plugin set at build time so a missing provider produces a clear
 * warning ("backlinks requires data "links" … enable configuration.links") instead of a silently empty
 * component or a runtime TypeError.
 *
 * Fully opt-in and backwards compatible:
 * - plugins without `capabilities` are never checked and never cause warnings;
 * - a requirement may name its expected provider(s) with `from`; when such a plugin is enabled the
 *   requirement is satisfied even if that provider predates capability declarations;
 * - only warnings are produced — a build never fails because of capabilities.
 *
 * See docs/advanced/plugin capabilities.md for the schema and migration guide.
 */

import { isMainThread } from "node:worker_threads"
import { styleText } from "util"
import { recordDiagnostic } from "../../util/diagnostics"

export const CAPABILITY_KINDS = ["data", "dom", "globals", "events", "files", "cssVars"] as const

/**
 * - `data`    — `file.data` / `fileData` keys (vfile DataMap), e.g. `"links"`
 * - `dom`     — CSS selectors present in rendered HTML or added by scripts, e.g. `".clipboard-button"`
 * - `globals` — browser globals defined by scripts, e.g. `"fetchData"`, `"addCleanup"`
 * - `events`  — document CustomEvents dispatched, e.g. `"themechange"`
 * - `files`   — emitted output paths (relative to the site root), e.g. `"static/contentIndex.json"`
 * - `cssVars` — CSS custom properties defined, e.g. `"--secondary"`
 */
export type CapabilityKind = (typeof CAPABILITY_KINDS)[number]

/** A required capability: its name, or an object naming expected providers and the impact. */
export type CapabilityRequirement =
  | string
  | {
      name: string
      /** Plugin name(s) (manifest `name`, e.g. "crawl-links") known to provide it. */
      from?: string | string[]
      /** What breaks / degrades without it — shown in the warning. */
      reason?: string
    }

export type CapabilityList = Partial<Record<CapabilityKind, string[]>>
export type CapabilityRequirements = Partial<Record<CapabilityKind, CapabilityRequirement[]>>

export interface PluginCapabilities {
  /** What this plugin makes available to others. */
  provides?: CapabilityList
  /** Needed for the plugin to work — a missing provider is a build warning. */
  requires?: CapabilityRequirements
  /** Used when present; the plugin degrades gracefully without it — reported as info only. */
  optional?: CapabilityRequirements
}

/** A plugin as seen by the checker. */
export interface CapabilityPlugin {
  /** Display name used in messages (manifest `name`). */
  name: string
  /** Other names the plugin can be referenced by in `from` (e.g. npm package name). */
  aliases?: string[]
  capabilities?: unknown
}

export interface MissingCapability {
  plugin: string
  kind: CapabilityKind
  name: string
  required: boolean
  reason?: string
  /** Plugins that could provide it (declared providers among available plugins + `from`). */
  candidates: string[]
}

export interface CapabilityReport {
  /** Unsatisfied `requires` entries (one message each). */
  warnings: string[]
  /** Unsatisfied `optional` entries and schema notes. */
  infos: string[]
  missing: MissingCapability[]
}

/**
 * Capabilities Quartz core itself always provides (independent of plugins).
 * Kept deliberately small: only things core code sets or renders unconditionally.
 */
export function coreCapabilities(configuration?: {
  enableSPA?: boolean
  prefetch?: string | boolean
}): CapabilityList {
  const prefetch = configuration?.prefetch !== "off" && configuration?.prefetch !== false
  return {
    // quartz/processors/parse.ts
    data: ["slug", "filePath", "relativePath"],
    // renderPage.tsx / frames
    dom: ["#quartz-body", ".page", ".center", "article", ".popover-hint", ".sidebar"],
    // renderPage.tsx (fetchData, quartzStaticUrl), componentResources.ts (spaNavigate/addCleanup,
    // SPA or not; quartzPrefetch unless prefetching is off)
    globals: [
      "fetchData",
      "addCleanup",
      "spaNavigate",
      "quartzStaticUrl",
      ...(prefetch ? ["quartzPrefetch"] : []),
    ],
    // componentResources.ts dispatches "nav" in both modes; spa.inline.ts adds "prenav"
    events: configuration?.enableSPA === false ? ["nav"] : ["nav", "prenav"],
  }
}

function normalize(kind: CapabilityKind, value: string): string {
  const v = value.trim()
  if (kind === "files") return v.replace(/^\/+/, "")
  return v
}

/** Parse `capabilities` defensively; returns schema problems instead of throwing. */
export function parseCapabilities(
  raw: unknown,
  pluginName: string,
): { capabilities: PluginCapabilities | undefined; problems: string[] } {
  const problems: string[] = []
  if (raw === undefined || raw === null) return { capabilities: undefined, problems }
  if (typeof raw !== "object" || Array.isArray(raw)) {
    problems.push(`Plugin "${pluginName}": quartz.capabilities must be an object (ignored).`)
    return { capabilities: undefined, problems }
  }

  const out: PluginCapabilities = {}
  for (const section of ["provides", "requires", "optional"] as const) {
    const value = (raw as Record<string, unknown>)[section]
    if (value === undefined) continue
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      problems.push(`Plugin "${pluginName}": capabilities.${section} must be an object (ignored).`)
      continue
    }
    const parsed: Record<string, unknown[]> = {}
    for (const [kind, list] of Object.entries(value)) {
      if (!(CAPABILITY_KINDS as readonly string[]).includes(kind)) {
        problems.push(
          `Plugin "${pluginName}": unknown capability kind "${section}.${kind}" (ignored). ` +
            `Known kinds: ${CAPABILITY_KINDS.join(", ")}.`,
        )
        continue
      }
      if (!Array.isArray(list)) {
        problems.push(`Plugin "${pluginName}": capabilities.${section}.${kind} must be an array.`)
        continue
      }
      const items = list.filter((item) => {
        const ok =
          typeof item === "string" ||
          (section !== "provides" &&
            typeof item === "object" &&
            item !== null &&
            typeof (item as { name?: unknown }).name === "string")
        if (!ok) {
          problems.push(
            `Plugin "${pluginName}": invalid entry in capabilities.${section}.${kind}: ${JSON.stringify(item)}`,
          )
        }
        return ok
      })
      parsed[kind] = items
    }
    ;(out as Record<string, unknown>)[section] = parsed
  }
  return { capabilities: out, problems }
}

function toRequirement(req: CapabilityRequirement): {
  name: string
  from: string[]
  reason?: string
} {
  if (typeof req === "string") return { name: req, from: [] }
  const from = req.from === undefined ? [] : Array.isArray(req.from) ? req.from : [req.from]
  return { name: req.name, from, reason: req.reason }
}

function describeKind(kind: CapabilityKind): string {
  switch (kind) {
    case "data":
      return "data"
    case "dom":
      return "DOM element"
    case "globals":
      return "browser global"
    case "events":
      return "event"
    case "files":
      return "file"
    case "cssVars":
      return "CSS variable"
  }
}

/**
 * Check that every requirement of every enabled plugin is provided by core or by an enabled plugin.
 *
 * @param enabled   enabled plugins
 * @param available plugins that are configured but disabled (used only to suggest providers)
 * @param core      capabilities provided by Quartz core (see {@link coreCapabilities})
 */
export function checkCapabilities(
  enabled: CapabilityPlugin[],
  options: { available?: CapabilityPlugin[]; core?: CapabilityList } = {},
): CapabilityReport {
  const report: CapabilityReport = { warnings: [], infos: [], missing: [] }

  const parsedEnabled = enabled.map((plugin) => {
    const { capabilities, problems } = parseCapabilities(plugin.capabilities, plugin.name)
    report.infos.push(...problems)
    return { plugin, capabilities }
  })
  const parsedAvailable = (options.available ?? []).map((plugin) => ({
    plugin,
    capabilities: parseCapabilities(plugin.capabilities, plugin.name).capabilities,
  }))

  const key = (kind: CapabilityKind, name: string) => `${kind}\u0000${normalize(kind, name)}`
  const provided = new Set<string>()
  for (const [kind, names] of Object.entries(options.core ?? {})) {
    for (const name of names ?? []) provided.add(key(kind as CapabilityKind, name))
  }
  for (const { capabilities } of parsedEnabled) {
    for (const [kind, names] of Object.entries(capabilities?.provides ?? {})) {
      for (const name of names ?? []) provided.add(key(kind as CapabilityKind, name))
    }
  }

  const enabledNames = new Set<string>()
  for (const { plugin } of parsedEnabled) {
    enabledNames.add(plugin.name)
    for (const alias of plugin.aliases ?? []) enabledNames.add(alias)
  }

  for (const { plugin, capabilities } of parsedEnabled) {
    if (!capabilities) continue
    for (const required of [true, false]) {
      const section = required ? capabilities.requires : capabilities.optional
      for (const [kindRaw, reqs] of Object.entries(section ?? {})) {
        const kind = kindRaw as CapabilityKind
        for (const raw of reqs ?? []) {
          const req = toRequirement(raw)
          if (provided.has(key(kind, req.name))) continue
          // Named provider enabled → trust it even if it predates capability declarations.
          if (req.from.some((name) => enabledNames.has(name))) continue

          // A `from` name that is now an (available) built-in is suggested under its new name.
          const renamed = (name: string) =>
            parsedAvailable.find(
              (o) => o.plugin.name === name || (o.plugin.aliases ?? []).includes(name),
            )?.plugin.name ?? name
          const candidates = new Set<string>(req.from.map(renamed))
          for (const other of parsedAvailable) {
            const names = other.capabilities?.provides?.[kind] ?? []
            if (names.some((n) => normalize(kind, n) === normalize(kind, req.name))) {
              candidates.add(other.plugin.name)
            }
          }

          const missing: MissingCapability = {
            plugin: plugin.name,
            kind,
            name: req.name,
            required,
            reason: req.reason,
            candidates: [...candidates],
          }
          report.missing.push(missing)

          const what = `${describeKind(kind)} "${req.name}"`
          const hint =
            missing.candidates.length > 0
              ? ` — enable ${missing.candidates.map((c) => `"${c}"`).join(" or ")}`
              : ""
          const why = req.reason ? ` (${req.reason})` : ""
          if (required) {
            report.warnings.push(
              `Plugin "${plugin.name}" requires ${what}, but no enabled plugin provides it${hint}.${why}`,
            )
          } else {
            report.infos.push(
              `Plugin "${plugin.name}" can use ${what}, which no enabled plugin provides${hint}.${why}`,
            )
          }
        }
      }
    }
  }

  return report
}

interface ManifestLike {
  name?: string
  displayName?: string
  capabilities?: unknown
}

/**
 * Loader entry point: check the configured plugin entries.
 *
 * `manifestFor` is called for enabled entries, and — only when something is missing — for
 * disabled entries too, so the warning can suggest which configured plugin to enable.
 */
export async function validatePluginCapabilities<E extends { enabled: boolean }>(args: {
  entries: E[]
  nameOf: (entry: E) => string
  manifestFor: (
    entry: E,
  ) => Promise<ManifestLike | null | undefined> | ManifestLike | null | undefined
  configuration?: { enableSPA?: boolean; prefetch?: string | boolean }
  /** Built-in processing steps (see plugins/builtins): enabled ones provide, others are suggested. */
  builtins?: { enabled: CapabilityPlugin[]; available: CapabilityPlugin[] }
}): Promise<CapabilityReport> {
  const toPlugin = async (entry: E): Promise<CapabilityPlugin> => {
    let manifest: ManifestLike | null | undefined
    try {
      manifest = await args.manifestFor(entry)
    } catch {
      manifest = undefined
    }
    const sourceName = args.nameOf(entry)
    const shortName = sourceName.replace(/^@[^/]+\//, "")
    const name = manifest?.name ?? shortName
    return {
      name,
      aliases: [...new Set([sourceName, shortName, manifest?.displayName ?? name])],
      capabilities: manifest?.capabilities,
    }
  }

  const enabled = [
    ...(args.builtins?.enabled ?? []),
    ...(await Promise.all(args.entries.filter((e) => e.enabled).map(toPlugin))),
  ]
  const core = coreCapabilities(args.configuration)
  const first = checkCapabilities(enabled, { core })
  if (first.missing.length === 0) return first

  const available = [
    ...(args.builtins?.available ?? []),
    ...(await Promise.all(args.entries.filter((e) => !e.enabled).map(toPlugin))),
  ]
  return checkCapabilities(enabled, { core, available })
}

// Process-wide: this module can be loaded as several copies (CLI + bundled build).
const printedWarnings: Set<string> = ((globalThis as Record<symbol, unknown>)[
  Symbol.for("quartz.printedCapabilityWarnings")
] ??= new Set<string>()) as Set<string>

/** Print capability warnings once per process (main thread only; workers re-load the config). */
export function printCapabilityWarnings(report: CapabilityReport): void {
  // Record per plugin (also in workers) so a later error in that plugin can mention it.
  for (const m of report.missing) {
    if (!m.required) continue
    const warning = report.warnings.find(
      (w) => w.startsWith(`Plugin "${m.plugin}" requires`) && w.includes(`"${m.name}"`),
    )
    recordDiagnostic({
      severity: "warning",
      area: "capabilities",
      plugin: m.plugin,
      message: warning ?? `${m.plugin} requires ${m.kind} "${m.name}", which nothing provides`,
    })
  }
  if (!isMainThread || process.env.QUARTZ_CONFIG_QUIET === "1") return
  for (const w of report.warnings) {
    if (printedWarnings.has(w)) continue
    printedWarnings.add(w)
    console.warn(styleText("yellow", "⚠") + ` ${w}`)
  }
}
