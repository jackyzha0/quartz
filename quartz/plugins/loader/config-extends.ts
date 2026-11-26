import fs from "fs"
import path from "path"
import { createHash } from "crypto"
import { isMainThread } from "worker_threads"
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
 * - `extends` lists stack (see resolveExtends): every file of the graph is applied once, after
 *   its bases, so presets that share `default` each keep their own changes.
 * - A config without `extends` is used exactly as written, as before.
 */

/** The name `extends: default` stands for. */
export const DEFAULT_EXTENDS = "default"
export const DEFAULT_CONFIG_FILE = "quartz.config.default.yaml"

/** A configuration mistake: reported by its message alone (no stack trace). */
export class ConfigExtendsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ConfigExtendsError"
    this.stack = `${this.name}: ${message}`
  }
}

type PlainObject = Record<string, unknown>

/** A plugin entry in a config that extends another: only `source` is required. */
export interface PluginOverlayEntry {
  source: PluginSource
  enabled?: boolean
  /** Merged into the base entry's options; `null` drops them (the plugin's defaults apply). */
  options?: Record<string, unknown> | null
  order?: number | null
  /** Replace the base entry's constraints; `null` removes them. */
  before?: string | string[] | null
  after?: string | string[] | null
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
 * `explorer`), or the `name` of an object source. An object source without a `name` that
 * points at a `subdir` of a repository is matched by both (`plugins/explorer` in
 * `github:me/quartz-plugins` → `quartz-plugins/plugins/explorer`), so two plugins of one
 * monorepo stay apart.
 */
export function pluginMatchKey(source: PluginSource): string {
  if (typeof source === "object" && source !== null) {
    if (source.name) return source.name
    const repoKey = pluginMatchKey(source.repo)
    const subdir = normalizeSubdir(source.subdir)
    return subdir ? `${repoKey}/${subdir}` : repoKey
  }
  let s = String(source).trim()
  s = s.replace(/^git\+/i, "").replace(/^github:/i, "")
  s = s.split("#")[0]
  s = s.replace(/\.git$/i, "").replace(/[\\/]+$/, "")
  // an npm version/range: @scope/name@1.2.3, name@^1
  s = s.replace(/(.)@[^/]*$/, "$1")
  return s.slice(Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\")) + 1)
}

/** `./plugins/x/`, `plugins\\x`, `/plugins/x` → `plugins/x`; empty or `.` → "". */
function normalizeSubdir(subdir: unknown): string {
  if (typeof subdir !== "string") return ""
  return subdir
    .replace(/\\/g, "/")
    .split("/")
    .filter((part) => part !== "" && part !== ".")
    .join("/")
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

function pluginList<T>(value: T[] | null | undefined, where: string): T[] {
  if (value === undefined || value === null) return []
  if (!Array.isArray(value)) {
    throw new ConfigExtendsError(
      `"plugins" in ${where} must be a list of plugin entries (- source: …), not ${typeof value === "object" ? "an object" : JSON.stringify(value)}`,
    )
  }
  return value
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

  const plugins = pluginList(base.plugins, "the base config").map((entry) => ({ ...entry }))
  for (const entry of pluginList(overlayPlugins, "the extending config")) {
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
  /** Local file reader, for tests. */
  readFile?: (file: string) => string
  /** Loader for `https://` bases; default `fetchRemoteConfig` (cached, with a timeout). */
  fetchRemote?: (url: string) => Promise<string>
}

/** Where fetched remote bases are kept (offline builds, worker threads). */
export const REMOTE_CACHE_DIR = path.join(".quartz-cache", "extends")
const REMOTE_TIMEOUT_MS = 10_000
const REMOTE_MAX_BYTES = 1024 * 1024

const isUrl = (s: string) => /^[a-z][a-z0-9+.-]*:\/\//i.test(s)
const isHttps = (s: string) => /^https:\/\//i.test(s)

function remoteCacheFile(url: string, cacheDir: string): string {
  return path.join(cacheDir, createHash("sha256").update(url).digest("hex").slice(0, 32) + ".yaml")
}

export interface FetchRemoteOptions {
  cacheDir?: string
  timeoutMs?: number
  /** Only use the cache (QUARTZ_EXTENDS_OFFLINE=1; always in worker threads). */
  offline?: boolean
  fetchImpl?: typeof fetch
  warn?: (message: string) => void
}

const fetched = new Map<string, Promise<string>>()

/**
 * Fetch a remote base config: once per process, with a timeout and a size limit. A successful
 * fetch is cached in `.quartz-cache/extends/`; when the fetch fails (offline, timeout, HTTP
 * error) the cached copy is used with a warning, and without one the build stops. Worker threads
 * and `QUARTZ_EXTENDS_OFFLINE=1` read only the cache, so every thread of a build sees the copy
 * the main thread fetched.
 */
export function fetchRemoteConfig(url: string, opts: FetchRemoteOptions = {}): Promise<string> {
  const cacheDir = opts.cacheDir ?? path.join(process.cwd(), REMOTE_CACHE_DIR)
  const key = `${cacheDir}\0${url}`
  let pending = fetched.get(key)
  if (!pending) {
    pending = fetchUncached(url, cacheDir, opts)
    fetched.set(key, pending)
    pending.catch(() => fetched.delete(key))
  }
  return pending
}

async function fetchUncached(url: string, cacheDir: string, opts: FetchRemoteOptions) {
  const cacheFile = remoteCacheFile(url, cacheDir)
  const cached = () => {
    try {
      return fs.readFileSync(cacheFile, "utf-8")
    } catch {
      return undefined
    }
  }
  const offline = opts.offline ?? (process.env.QUARTZ_EXTENDS_OFFLINE === "1" || !isMainThread)
  if (offline) {
    const copy = cached()
    if (copy !== undefined) return copy
    throw new ConfigExtendsError(
      `"extends: ${url}": no cached copy in ${cacheDir} (offline build). Build once online first.`,
    )
  }
  const warn = opts.warn ?? ((m: string) => console.warn(`⚠ ${m}`))
  let failure: string
  try {
    const res = await (opts.fetchImpl ?? fetch)(url, {
      signal: AbortSignal.timeout(opts.timeoutMs ?? REMOTE_TIMEOUT_MS),
      headers: { accept: "application/yaml, application/json, text/plain, */*" },
    })
    if (res.url && !isHttps(res.url)) {
      throw new ConfigExtendsError(`"extends: ${url}" redirected to ${res.url}, which is not https`)
    }
    if (!res.ok) {
      failure = `HTTP ${res.status}`
    } else {
      const text = await res.text()
      if (Buffer.byteLength(text) > REMOTE_MAX_BYTES) {
        throw new ConfigExtendsError(`"extends: ${url}" is larger than 1 MB`)
      }
      fs.mkdirSync(cacheDir, { recursive: true })
      fs.writeFileSync(cacheFile, text)
      return text
    }
  } catch (err) {
    if (err instanceof ConfigExtendsError) throw err
    failure = err instanceof Error ? err.message : String(err)
  }
  const copy = cached()
  if (copy !== undefined) {
    warn(`"extends: ${url}" could not be fetched (${failure}); using the cached copy.`)
    return copy
  }
  throw new ConfigExtendsError(`"extends: ${url}" could not be fetched: ${failure}`)
}

function parseConfigFile(file: string, raw: string): PlainObject {
  const data = file.endsWith(".json") ? JSON.parse(raw) : YAML.parse(raw)
  // an empty file (or one with only comments) is an empty config
  if (data === null || data === undefined) return {}
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
        `${file}: "extends" must be "${DEFAULT_EXTENDS}", a path to another config file, an https:// URL, or a list of them`,
      )
    }
  }
  return list as string[]
}

function normalizeUrl(url: string): string {
  try {
    return new URL(url).href
  } catch {
    throw new ConfigExtendsError(`"extends: ${url}" is not a valid URL`)
  }
}

/**
 * Where an `extends` target points, seen from the file (or URL) that names it: `default` is
 * the local quartz.config.default.yaml; a URL is used as is; a relative path is resolved
 * against the extending file's directory, or against its URL when that file was fetched (a
 * remote config cannot reach local files). Only https URLs are allowed. (A future
 * `npm:<package>` target would be one more case here.)
 */
export function resolveTarget(target: string, from: string, quartzRoot: string): string {
  if (target === DEFAULT_EXTENDS) return path.join(quartzRoot, DEFAULT_CONFIG_FILE)
  // URLs are normalised (`HTTPS://Example.org/x` → `https://example.org/x`)
  const resolved = isUrl(target)
    ? normalizeUrl(target)
    : isUrl(from)
      ? new URL(target, from).href
      : path.resolve(path.dirname(from), target)
  if (isUrl(resolved) && !isHttps(resolved)) {
    throw new ConfigExtendsError(
      `${from}: "extends: ${target}" — only https:// URLs can be extended`,
    )
  }
  return resolved
}

interface ConfigLayer {
  /** Resolved path or URL ("" for the config being resolved). */
  file: string
  /** The file's own content, without `extends`. */
  data: PlainObject
}

/**
 * Apply `extends` of `data` (read from `file`, a path or URL) and return the merged config.
 * Returns `data` itself when it has no `extends` (or an empty list), so configs without it
 * behave exactly as before.
 *
 * Every file in the `extends` graph is a layer of its own changes, applied once, after all of
 * its bases (depth first, in list order). A base that several entries share (usually
 * `default`) is applied at its first appearance, so for `extends: [./a.yaml, ./b.yaml]` where
 * both extend `default` the order is default → a → b → this file: what a.yaml changes stays
 * unless b.yaml changes the same thing (later entries win), and this file wins over all.
 */
export async function resolveExtends(
  data: PlainObject,
  file: string,
  options: ResolveExtendsOptions = {},
): Promise<QuartzPluginsJson> {
  const targets = data.extends === undefined || data.extends === null ? [] : data.extends
  if (Array.isArray(targets) && targets.length === 0) {
    const { extends: _drop, ...rest } = data
    return ("extends" in data ? rest : data) as unknown as QuartzPluginsJson
  }
  const layers = await extendsLayers(data, file, options)
  const [first, ...rest] = layers
  let merged = first.data as unknown as QuartzPluginsJson
  pluginList(merged.plugins, first.file)
  for (const layer of rest) {
    merged = mergeQuartzConfigs(merged, layer.data as QuartzConfigOverlay)
  }
  return merged
}

/**
 * The local files (absolute paths) `data` extends, directly or through other bases; URLs are
 * left out. For `--serve`, which rebuilds when one of them changes.
 */
export async function localExtendsFiles(
  data: PlainObject,
  file: string,
  options: ResolveExtendsOptions = {},
): Promise<string[]> {
  if (data.extends === undefined || data.extends === null) return []
  const layers = await extendsLayers(data, file, options)
  return layers.map((l) => l.file).filter((f) => f !== "" && !isUrl(f))
}

/** The layers of `data` in the order they are applied: bases first, `data` itself last. */
async function extendsLayers(
  data: PlainObject,
  file: string,
  options: ResolveExtendsOptions,
): Promise<ConfigLayer[]> {
  const readFile = options.readFile ?? ((f: string) => fs.readFileSync(f, "utf-8"))
  const fetchRemote = options.fetchRemote ?? ((url: string) => fetchRemoteConfig(url))
  const quartzRoot = options.quartzRoot ?? process.cwd()
  const layers: ConfigLayer[] = []
  const applied = new Set<string>()

  const visit = async (node: PlainObject, nodeFile: string, chain: string[]) => {
    const self = isUrl(nodeFile) ? nodeFile : path.resolve(nodeFile)
    const here = [...chain, self]
    const raw = node.extends
    const targets = raw === undefined || raw === null ? [] : extendsTargets(raw, nodeFile)
    for (const target of targets) {
      const targetFile = resolveTarget(target, nodeFile, quartzRoot)
      if (here.includes(targetFile)) {
        throw new ConfigExtendsError(
          `"extends" cycle: ${[...here, targetFile].map((f) => (isUrl(f) ? f : path.basename(f))).join(" → ")}`,
        )
      }
      if (applied.has(targetFile)) continue
      let text: string
      if (isUrl(targetFile)) {
        text = await fetchRemote(targetFile)
      } else {
        try {
          text = readFile(targetFile)
        } catch {
          throw new ConfigExtendsError(
            `${nodeFile}: "extends: ${target}" — ${targetFile} not found`,
          )
        }
      }
      const parsePath = isUrl(targetFile) ? new URL(targetFile).pathname : targetFile
      let parsed: PlainObject
      try {
        parsed = parseConfigFile(parsePath, text)
      } catch (err) {
        throw new ConfigExtendsError(
          `"extends: ${target}": ${targetFile} is not a valid config (${err instanceof Error ? err.message : String(err)})`,
        )
      }
      await visit(parsed, targetFile, here)
    }
    const { extends: _drop, ...own } = node
    layers.push({ file: chain.length === 0 ? "" : self, data: own })
    applied.add(self)
  }

  await visit(data, file, [])
  return layers
}
