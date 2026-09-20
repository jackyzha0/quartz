import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import YAML from "yaml"

const LOCKFILE_PATH = path.join(process.cwd(), "quartz.lock.json")
const PLUGINS_DIR = path.join(process.cwd(), ".quartz", "plugins")
const CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.yaml")
const DEFAULT_CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.default.yaml")
const TEMPLATES_DIR = path.join(process.cwd(), "quartz", "cli", "templates")

const LEGACY_PLUGINS_JSON_PATH = path.join(process.cwd(), "quartz.plugins.json")
const LEGACY_DEFAULT_PLUGINS_JSON_PATH = path.join(process.cwd(), "quartz.plugins.default.json")

function resolveConfigPath() {
  if (fs.existsSync(CONFIG_YAML_PATH)) return CONFIG_YAML_PATH
  if (fs.existsSync(LEGACY_PLUGINS_JSON_PATH)) return LEGACY_PLUGINS_JSON_PATH
  if (fs.existsSync(DEFAULT_CONFIG_YAML_PATH)) return DEFAULT_CONFIG_YAML_PATH
  if (fs.existsSync(LEGACY_DEFAULT_PLUGINS_JSON_PATH)) return LEGACY_DEFAULT_PLUGINS_JSON_PATH
  return CONFIG_YAML_PATH
}

function resolveDefaultConfigPath() {
  if (fs.existsSync(DEFAULT_CONFIG_YAML_PATH)) return DEFAULT_CONFIG_YAML_PATH
  if (fs.existsSync(LEGACY_DEFAULT_PLUGINS_JSON_PATH)) return LEGACY_DEFAULT_PLUGINS_JSON_PATH
  return DEFAULT_CONFIG_YAML_PATH
}

function readFileAsData(filePath) {
  if (!fs.existsSync(filePath)) return null
  try {
    const raw = fs.readFileSync(filePath, "utf-8")
    if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
      return YAML.parse(raw)
    }
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeDataToFile(filePath, data) {
  if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    const header = "# yaml-language-server: $schema=./quartz/plugins/quartz-plugins.schema.json\n"
    fs.writeFileSync(filePath, header + YAML.stringify(data, { lineWidth: 120 }))
  } else {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")
  }
}

export function readPluginsJson() {
  const configPath = resolveConfigPath()
  return readFileAsData(configPath)
}

export function writePluginsJson(data) {
  const { $schema, ...rest } = data
  writeDataToFile(CONFIG_YAML_PATH, rest)
}

function readDefaultPluginsJson() {
  const defaultPath = resolveDefaultConfigPath()
  return readFileAsData(defaultPath)
}

export function readLockfile() {
  if (!fs.existsSync(LOCKFILE_PATH)) return null
  try {
    return JSON.parse(fs.readFileSync(LOCKFILE_PATH, "utf-8"))
  } catch {
    return null
  }
}

export function writeLockfile(lockfile) {
  if (lockfile.plugins) {
    const sorted = {}
    for (const key of Object.keys(lockfile.plugins).sort()) {
      sorted[key] = lockfile.plugins[key]
    }
    lockfile = { ...lockfile, plugins: sorted }
  }
  fs.writeFileSync(LOCKFILE_PATH, JSON.stringify(lockfile, null, 2) + "\n")
}

/**
 * Normalizes a source value to a URL string.
 * Source can be a plain string (e.g. "github:owner/repo") or an object
 * with { name?, repo, subdir? } for installing from a subdirectory of a repo.
 */
export function getSourceUrl(source) {
  if (typeof source === "string") return source
  if (typeof source === "object" && source !== null && typeof source.repo === "string") {
    return source.repo
  }
  throw new Error(`Invalid plugin source: ${JSON.stringify(source)}`)
}

/**
 * Returns the subdir from an object source, or undefined for string sources.
 */
function getSourceSubdir(source) {
  if (typeof source === "object" && source !== null && typeof source.subdir === "string") {
    return source.subdir
  }
  return undefined
}

/**
 * Returns the ref from an object source, or undefined for string sources.
 */
function getSourceRef(source) {
  if (typeof source === "object" && source !== null && typeof source.ref === "string") {
    return source.ref
  }
  return undefined
}

/**
 * Returns a display-friendly string for a source value.
 */
export function formatSource(source) {
  if (typeof source === "string") return source
  if (typeof source === "object" && source !== null) {
    const parts = [source.repo]
    if (source.subdir) parts.push(`(subdir: ${source.subdir})`)
    return parts.join(" ")
  }
  return String(source)
}

export function isLocalSource(source) {
  const url = getSourceUrl(source)
  if (url.startsWith("./") || url.startsWith("../") || url.startsWith("/")) {
    return true
  }
  // Windows absolute paths (e.g. C:\ or D:/)
  if (/^[A-Za-z]:[\\/]/.test(url)) {
    return true
  }
  return false
}
export function extractPluginName(source) {
  if (typeof source === "object" && source !== null && typeof source.name === "string") {
    return source.name
  }
  const url = getSourceUrl(source)
  if (isLocalSource(url)) {
    return path.basename(url.replace(/[\/]+$/, ""))
  }
  if (url.startsWith("github:")) {
    const withoutPrefix = url.replace("github:", "")
    const [repoPath] = withoutPrefix.split("#")
    const parts = repoPath.split("/")
    return parts[parts.length - 1]
  }
  if (url.startsWith("git+") || url.startsWith("https://")) {
    const cleaned = url.replace("git+", "")
    const match = cleaned.match(/\/([^/]+?)(?:\.git)?(?:#|$)/)
    return match?.[1] ?? url
  }
  return url
}

export function readManifestFromPackageJson(pluginDir) {
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return null
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    return pkg.quartz ?? null
  } catch {
    return null
  }
}

export function parseGitSource(source) {
  const url = getSourceUrl(source)
  const subdir = getSourceSubdir(source)
  // An object source may carry its own `ref`, which takes precedence over any
  // `#ref` fragment in the repo URL (mirrors parsePluginSource in gitLoader.ts).
  const objectRef = getSourceRef(source)
  if (isLocalSource(url)) {
    const resolved = path.resolve(url)
    const name = typeof source === "object" && source.name ? source.name : path.basename(resolved)
    return { name, url: resolved, ref: undefined, local: true, subdir }
  }
  if (url.startsWith("github:")) {
    const [repoPath, ref] = url.replace("github:", "").split("#")
    const [owner, repo] = repoPath.split("/")
    const name = typeof source === "object" && source.name ? source.name : repo
    return {
      name,
      url: `https://github.com/${owner}/${repo}.git`,
      ref: objectRef || ref || undefined,
      subdir,
    }
  }
  if (url.startsWith("git+")) {
    const raw = url.replace("git+", "")
    const [parsed, ref] = raw.split("#")
    const name =
      typeof source === "object" && source.name ? source.name : path.basename(parsed, ".git")
    return { name, url: parsed, ref: objectRef || ref || undefined, subdir }
  }
  if (url.startsWith("https://")) {
    const [parsed, ref] = url.split("#")
    const name =
      typeof source === "object" && source.name ? source.name : path.basename(parsed, ".git")
    return { name, url: parsed, ref: objectRef || ref || undefined, subdir }
  }
  // Handle npm scoped packages
  if (typeof url === "string" && url.startsWith("@") && url.includes("/") && !url.includes(":")) {
    const name = typeof source === "object" && source.name ? source.name : url
    return { name, url: "", ref: objectRef, npmPackage: true, subdir }
  }
  throw new Error(`Cannot parse plugin source: ${formatSource(source)}`)
}

export function getGitCommit(pluginDir) {
  try {
    return execSync("git rev-parse HEAD", { cwd: pluginDir, encoding: "utf-8" }).trim()
  } catch {
    return "unknown"
  }
}

export function updateGlobalConfig(updates) {
  const json = readPluginsJson()
  if (!json) return false
  json.configuration = { ...json.configuration, ...updates }
  writePluginsJson(json)
  return true
}

export function configExists() {
  return fs.existsSync(CONFIG_YAML_PATH) || fs.existsSync(LEGACY_PLUGINS_JSON_PATH)
}

export function createConfigFromDefault() {
  const defaultData = readDefaultPluginsJson()
  if (!defaultData) {
    // No default available — create minimal config
    const minimal = {
      configuration: {
        pageTitle: "Quartz",
        enableSPA: true,
        enablePopovers: true,
        analytics: { provider: "plausible" },
        locale: "en-US",
        baseUrl: "quartz.jzhao.xyz",
        ignorePatterns: ["private", "templates", ".obsidian"],
        theme: {
          cdnCaching: true,
          typography: {
            header: "Schibsted Grotesk",
            body: "Source Sans Pro",
            code: "IBM Plex Mono",
          },
          colors: {
            lightMode: {
              light: "#faf8f8",
              lightgray: "#e5e5e5",
              gray: "#b8b8b8",
              darkgray: "#4e4e4e",
              dark: "#2b2b2b",
              secondary: "#284b63",
              tertiary: "#84a59d",
              highlight: "rgba(143, 159, 169, 0.15)",
              textHighlight: "#fff23688",
            },
            darkMode: {
              light: "#161618",
              lightgray: "#393639",
              gray: "#646464",
              darkgray: "#d4d4d4",
              dark: "#ebebec",
              secondary: "#7b97aa",
              tertiary: "#84a59d",
              highlight: "rgba(143, 159, 169, 0.15)",
              textHighlight: "#fff23688",
            },
          },
        },
      },
      plugins: [],
      layout: { groups: {}, byPageType: {} },
    }
    writePluginsJson(minimal)
    return minimal
  }

  const { $schema, ...rest } = defaultData
  writePluginsJson(rest)
  return rest
}

const VALID_TEMPLATES = ["default", "obsidian", "ttrpg", "blog"]

export function createConfigFromTemplate(templateName) {
  if (!VALID_TEMPLATES.includes(templateName)) {
    throw new Error(
      `Unknown template: ${templateName}. Valid templates: ${VALID_TEMPLATES.join(", ")}`,
    )
  }

  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.yaml`)
  const templateData = readFileAsData(templatePath)
  if (!templateData) {
    // Template file missing — fall back to default config creation
    return createConfigFromDefault()
  }

  const { $schema, ...rest } = templateData
  writePluginsJson(rest)
  return rest
}

/**
 * Resolves a user-facing plugin name (which may be an overridden name from config)
 * to the corresponding lockfile key (the original name at install time).
 *
 * This bridges the naming identity split between config YAML (which supports
 * source.name overrides) and the lockfile/disk (which are keyed by the original name).
 *
 * @param {string} name - The name the user provided (may be overridden or original)
 * @param {object|null} lockfile - The parsed lockfile
 * @param {object|null} pluginsJson - The parsed config YAML
 * @returns {string} The lockfile key that corresponds to this plugin
 */
export function resolveLockfileName(name, lockfile, pluginsJson) {
  // Direct match — no resolution needed
  if (lockfile?.plugins?.[name]) return name

  // Check if any config entry with this overridden name maps to a different lockfile key
  if (pluginsJson?.plugins) {
    const configEntry = pluginsJson.plugins.find(
      (e) => extractPluginName(e.source) === name || formatSource(e.source) === name,
    )
    if (configEntry) {
      const url = getSourceUrl(configEntry.source)
      for (const [key, lock] of Object.entries(lockfile?.plugins ?? {})) {
        if (
          lock.source === url ||
          lock.source === formatSource(configEntry.source) ||
          lock.resolved === url
        ) {
          return key
        }
      }
    }
  }

  return name
}

/**
 * Builds a map from lockfile keys to their overridden display names from config.
 * Returns entries only where the overridden name differs from the lockfile key.
 *
 * @param {object|null} lockfile - The parsed lockfile
 * @param {object|null} pluginsJson - The parsed config YAML
 * @returns {Map<string, string>} Map of lockfileKey → overriddenName
 */
export function getNameOverrides(lockfile, pluginsJson) {
  const overrides = new Map()
  if (!lockfile?.plugins || !pluginsJson?.plugins) return overrides

  for (const entry of pluginsJson.plugins) {
    const configName = extractPluginName(entry.source)
    const url = getSourceUrl(entry.source)

    for (const [lockKey, lock] of Object.entries(lockfile.plugins)) {
      if (lockKey === configName) break // no override, names match
      if (
        lock.source === url ||
        lock.source === formatSource(entry.source) ||
        lock.resolved === url
      ) {
        overrides.set(lockKey, configName)
        break
      }
    }
  }

  return overrides
}

export const PLUGINS_JSON_PATH = CONFIG_YAML_PATH
export const DEFAULT_PLUGINS_JSON_PATH = DEFAULT_CONFIG_YAML_PATH
export { LOCKFILE_PATH, PLUGINS_DIR }
