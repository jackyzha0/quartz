import fs from "fs"
import path from "path"
import YAML from "yaml"
import type {
  PluginJsonEntry,
  PluginLayoutDeclaration,
  PluginSource,
  QuartzPluginsJson,
} from "./types"

/**
 * `extends:` in quartz.config.yaml (#2440): start from another config and apply only the
 * differences on top.
 *
 * ```yaml
 * extends: default          # quartz.config.default.yaml next to quartz.config.yaml's Quartz
 * configuration:
 *   pageTitle: My garden
 * plugins:
 *   - source: "@quartz-community/explorer"
 *     options: { folderDefaultState: open }
 *   - source: "@quartz-community/graph"
 *     enabled: false
 * ```
 *
 * Merge rules (`mergeQuartzConfigs`):
 * - `configuration` and `layout`: objects merge key by key, recursively; any other value
 *   (strings, numbers, arrays such as `ignorePatterns` or `byPageType.*.exclude`) replaces the
 *   base value; `null` removes the key (back to the built-in default).
 * - `plugins`: an entry matches the base entry of the same plugin (by plugin name, so
 *   `github:quartz-community/explorer` matches `@quartz-community/explorer`, and a fork with the
 *   same name replaces the original). Of a matched entry, `source`, `enabled` and `order`
 *   replace the base values, and `options` and `layout` merge like `configuration`. Entries
 *   that match nothing are appended, as in a full config (so they need `enabled: true`). The base list keeps its order, which only matters as the
 *   tie-break between plugins with the same `order`.
 * - A config without `extends` is used exactly as written, as before.
 */

/** The name `extends: default` stands for. */
export const DEFAULT_EXTENDS = "default"
export const DEFAULT_CONFIG_FILE = "quartz.config.default.yaml"

export class ConfigExtendsError extends Error {}

type PlainObject = Record<string, unknown>

/** A plugin entry in a config that extends another: only `source` is required. */
export interface PluginOverlayEntry {
  source: PluginSource
  enabled?: boolean
  /** Merged into the base entry's options; `null` drops them (the plugin's defaults apply). */
  options?: Record<string, unknown> | null
  order?: number | null
  /** Merged into the base entry's layout; `null` drops it (the plugin's default placement). */
  layout?: Partial<PluginLayoutDeclaration> | null
}

/** What a config with `extends` may contain: any part of a full config. */
export interface QuartzConfigOverlay {
  $schema?: string
  extends?: string | string[] | null
  configuration?: Record<string, unknown>
  plugins?: PluginOverlayEntry[]
  layout?: Record<string, unknown>
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Recursive merge: objects merge, everything else replaces, `null` deletes. */
export function deepMerge(base: unknown, overlay: unknown): unknown {
  if (overlay === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(overlay)) return overlay
  const result: PlainObject = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    if (value === null) {
      delete result[key]
    } else {
      result[key] = deepMerge(base[key], value)
    }
  }
  return result
}

/**
 * The name a plugin entry is matched by: the last path segment of its package or repository
 * (`@quartz-community/explorer`, `github:quartz-community/explorer#v2`, `./plugins/explorer` →
 * `explorer`), or the `name` of an object source.
 */
export function pluginMatchKey(source: PluginSource): string {
  if (typeof source === "object" && source !== null) {
    if (source.name) return source.name
    return pluginMatchKey(source.repo)
  }
  let s = String(source).trim()
  s = s.replace(/^git\+/, "").replace(/^github:/, "")
  s = s.split("#")[0]
  s = s.replace(/\.git$/, "").replace(/\/+$/, "")
  // an npm version/range: @scope/name@1.2.3, name@^1
  s = s.replace(/(.)@[^/]*$/, "$1")
  return s.slice(s.lastIndexOf("/") + 1)
}

function mergePluginEntry(base: PluginJsonEntry, overlay: PluginOverlayEntry) {
  const merged: PlainObject = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    if (value === undefined) continue
    if (key === "options" || key === "layout") {
      const next = value === null ? undefined : deepMerge(merged[key], value)
      if (next === undefined) delete merged[key]
      else merged[key] = next
    } else if (value === null) {
      delete merged[key]
    } else {
      merged[key] = value
    }
  }
  return merged as unknown as PluginJsonEntry
}

/** `overlay` on top of `base` (see the module comment). Neither input is modified. */
export function mergeQuartzConfigs(
  base: QuartzPluginsJson,
  overlay: QuartzConfigOverlay,
): QuartzPluginsJson {
  const { extends: _extends, plugins: overlayPlugins, ...rest } = overlay
  const merged = deepMerge(
    { ...base, plugins: undefined },
    { ...rest, plugins: undefined },
  ) as QuartzPluginsJson

  const plugins = (base.plugins ?? []).map((entry) => ({ ...entry }))
  for (const entry of overlayPlugins ?? []) {
    if (!entry || entry.source === undefined) {
      throw new ConfigExtendsError(`a plugin entry without "source" cannot be merged`)
    }
    const key = pluginMatchKey(entry.source)
    const index = plugins.findIndex((p) => pluginMatchKey(p.source) === key)
    if (index === -1) {
      // a new plugin, read like an entry of a full config (no `enabled` → disabled, with a warning)
      plugins.push({ ...entry } as PluginJsonEntry)
    } else {
      plugins[index] = mergePluginEntry(plugins[index], entry)
    }
  }
  merged.plugins = plugins
  merged.configuration = (merged.configuration ?? {}) as QuartzPluginsJson["configuration"]
  return merged
}

export interface ResolveExtendsOptions {
  /** Directory holding quartz.config.default.yaml (`extends: default`). Default: cwd. */
  quartzRoot?: string
  /** File reader, for tests. */
  readFile?: (file: string) => string
}

function parseConfigFile(file: string, raw: string): PlainObject {
  const data = file.endsWith(".json") ? JSON.parse(raw) : YAML.parse(raw)
  if (!isPlainObject(data)) {
    throw new ConfigExtendsError(`${file} does not contain a configuration object`)
  }
  return data
}

function extendsTargets(value: unknown, file: string): string[] {
  const list = Array.isArray(value) ? value : [value]
  for (const item of list) {
    if (typeof item !== "string" || item.trim() === "") {
      throw new ConfigExtendsError(
        `${file}: "extends" must be "${DEFAULT_EXTENDS}", a path to another config file, or a list of them`,
      )
    }
  }
  return list as string[]
}

/**
 * Apply `extends` of `data` (read from `file`): load each base (recursively; later entries of
 * an `extends` list win), then merge `data` on top. Returns `data` itself when it has no
 * `extends`, so configs without it behave exactly as before.
 */
export function resolveExtends(
  data: PlainObject,
  file: string,
  options: ResolveExtendsOptions = {},
  seen: string[] = [],
): QuartzPluginsJson {
  if (data.extends === undefined || data.extends === null) {
    const { extends: _drop, ...rest } = data
    return (data.extends === null ? rest : data) as unknown as QuartzPluginsJson
  }
  const readFile = options.readFile ?? ((f: string) => fs.readFileSync(f, "utf-8"))
  const quartzRoot = options.quartzRoot ?? process.cwd()
  const chain = [...seen, path.resolve(file)]

  let base: QuartzPluginsJson | undefined
  for (const target of extendsTargets(data.extends, file)) {
    const targetFile =
      target === DEFAULT_EXTENDS
        ? path.join(quartzRoot, DEFAULT_CONFIG_FILE)
        : path.resolve(path.dirname(file), target)
    if (chain.includes(path.resolve(targetFile))) {
      throw new ConfigExtendsError(
        `"extends" cycle: ${[...chain, targetFile].map((f) => path.basename(f)).join(" → ")}`,
      )
    }
    let raw: string
    try {
      raw = readFile(targetFile)
    } catch {
      throw new ConfigExtendsError(`${file}: "extends: ${target}" — ${targetFile} not found`)
    }
    const resolved = resolveExtends(parseConfigFile(targetFile, raw), targetFile, options, chain)
    base = base ? mergeQuartzConfigs(base, resolved as QuartzConfigOverlay) : resolved
  }
  return mergeQuartzConfigs(base!, data as QuartzConfigOverlay)
}
