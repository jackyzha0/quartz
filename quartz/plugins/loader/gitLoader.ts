import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import git from "isomorphic-git"
import http from "isomorphic-git/http/node"
import { styleText } from "util"
import { fileURLToPath } from "node:url"
import { pathToFileURL } from "url"
import { PluginSource } from "./types"

/**
 * Convert an absolute filesystem path to a file:// URL string for use with dynamic import().
 * On Windows, absolute paths like D:\path\file.js have "D:" interpreted as a URL protocol
 * by Node ESM, so they must be converted to file:// URLs.
 * Non-absolute paths (e.g. npm package names) are returned as-is.
 */
export function toFileUrl(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return pathToFileURL(filePath).href
  }
  return filePath
}

export interface GitPluginSpec {
  /** Plugin name (used for directory) */
  name: string
  /** Git repository URL or absolute local path */
  repo: string
  /** Git ref (branch, tag, or commit hash). Omit to use the remote's default branch. */
  ref?: string
  /** Optional subdirectory within the repo if plugin is not at root */
  subdir?: string
  /** Whether this is a local path source */
  local?: boolean
  /** Whether this is an npm package (installed in node_modules) */
  npmPackage?: boolean
}

export type PluginInstallSource = string | GitPluginSpec

const PLUGINS_CACHE_DIR = path.join(process.cwd(), ".quartz", "plugins")

/**
 * Check if a source string refers to a local file path.
 * Local sources start with ./, ../, / or a Windows drive letter (e.g. C:\).
 */
export function isLocalSource(source: PluginSource): boolean {
  if (typeof source === "object") {
    return isLocalSource(source.repo)
  }
  if (source.startsWith("./") || source.startsWith("../") || source.startsWith("/")) {
    return true
  }
  // Windows absolute paths (e.g. C:\ or D:/)
  if (/^[A-Za-z]:[\\/]/.test(source)) {
    return true
  }
  return false
}

/**
 * Parse a plugin source string into a GitPluginSpec
 * Supports:
 * - "./path/to/plugin" or "/absolute/path" -> local path
 * - "github:user/repo" -> https://github.com/user/repo.git
 * - "github:user/repo#ref" -> https://github.com/user/repo.git with specific ref
 * - "git+https://..." -> direct git URL
 * - "https://github.com/..." -> direct https URL
 */
export function parsePluginSource(source: PluginSource): GitPluginSpec {
  if (typeof source === "object" && source !== null) {
    const url = source.repo
    const subdir = source.subdir
    const ref = source.ref

    if (isLocalSource(url)) {
      const resolved = path.resolve(url)
      const name = source.name ?? path.basename(resolved)
      return { name, repo: resolved, local: true, subdir }
    }

    // Expand shorthand formats in the repo field (e.g. "github:user/repo")
    // by recursing through the string-based parsing path, then overlay
    // the object-level fields (subdir, ref, name) on top.
    const expanded = parsePluginSource(url)
    const name = source.name ?? expanded.name
    return {
      name,
      repo: expanded.repo,
      ref: ref || expanded.ref || undefined,
      subdir,
      local: expanded.local,
      npmPackage: expanded.npmPackage,
    }
  }

  // Handle local paths
  if (isLocalSource(source)) {
    const resolved = path.resolve(source)
    const name = path.basename(resolved)
    return { name, repo: resolved, local: true }
  }

  // Handle github shorthand: github:user/repo or github:user/repo#ref
  if (source.startsWith("github:")) {
    const withoutPrefix = source.replace("github:", "")
    const [repoPath, ref] = withoutPrefix.split("#")
    const [owner, repo] = repoPath.split("/")

    if (!owner || !repo) {
      throw new Error(`Invalid GitHub source: ${source}. Expected format: github:user/repo`)
    }

    return {
      name: repo,
      repo: `https://github.com/${owner}/${repo}.git`,
      ref: ref || undefined,
    }
  }

  // Handle git+https:// protocol
  if (source.startsWith("git+")) {
    const raw = source.replace("git+", "")
    const [url, ref] = raw.split("#")
    const name = extractRepoName(url)
    return { name, repo: url, ref: ref || undefined }
  }

  // Handle direct HTTPS URL (GitHub, GitLab, etc.)
  if (source.startsWith("https://")) {
    const [url, ref] = source.split("#")
    const name = extractRepoName(url)
    return { name, repo: url, ref: ref || undefined }
  }

  // Handle npm scoped packages (e.g. @quartz-community/syntax-highlighting)
  if (
    typeof source === "string" &&
    source.startsWith("@") &&
    source.includes("/") &&
    !source.includes(":")
  ) {
    return { name: source, repo: "", npmPackage: true }
  }

  // Assume it's a plain repo name and try github
  const parts = source.split("/")
  if (parts.length === 2) {
    return {
      name: parts[1],
      repo: `https://github.com/${source}.git`,
    }
  }

  throw new Error(`Cannot parse plugin source: ${source}`)
}

function extractRepoName(url: string): string {
  // Extract repo name from URL like https://github.com/user/repo.git
  const match = url.match(/\/([^\/]+?)(?:\.git)?$/)
  return match ? match[1] : "unknown"
}

/**
 * Collect native (peer) dependencies from a plugin that declares requiresInstall.
 */
function collectNativeDeps(pluginDir: string): Map<string, string> {
  const result = new Map<string, string>()
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return result

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    const manifest = pkg.quartz ?? pkg.manifest ?? {}
    if (!manifest.requiresInstall) return result

    const peerDeps: Record<string, string> = pkg.peerDependencies ?? {}
    const sharedExternals = getSharedExternals()
    for (const [name, range] of Object.entries(peerDeps)) {
      if (sharedExternals.some((prefix) => name.startsWith(prefix))) {
        continue
      }
      result.set(name, range)
    }
  } catch {
    // ignore parse errors
  }

  return result
}

/**
 * Install all collected native dependencies into the Quartz root with a single
 * `npm install --no-save`. Lets npm resolve compatible versions across plugins.
 */
export function installNativeDeps(
  nativeDeps: Map<string, Map<string, string>>,
  options: { verbose?: boolean },
): void {
  const merged = new Map<string, Map<string, string>>()
  for (const [pluginName, deps] of nativeDeps) {
    for (const [pkg, range] of deps) {
      if (!merged.has(pkg)) {
        merged.set(pkg, new Map())
      }
      merged.get(pkg)!.set(pluginName, range)
    }
  }

  if (merged.size === 0) return

  const installArgs: string[] = []
  for (const [pkg, pluginRanges] of merged) {
    const ranges = [...pluginRanges.values()]
    const uniqueRanges = [...new Set(ranges)]

    if (options.verbose) {
      const sources = [...pluginRanges.entries()]
        .map(([plugin, range]) => `${plugin} (${range})`)
        .join(", ")
      console.log(
        styleText("cyan", `→`),
        `Native dep ${styleText("bold", pkg)} required by: ${sources}`,
      )
    }

    if (uniqueRanges.length === 1) {
      installArgs.push(`${pkg}@${JSON.stringify(uniqueRanges[0])}`)
    } else {
      if (options.verbose) {
        console.warn(
          styleText("yellow", `⚠`),
          `Multiple version ranges for ${pkg}: ${uniqueRanges.join(", ")}. npm will attempt to resolve a compatible version.`,
        )
      }
      // Use first range; npm will fail if truly incompatible
      installArgs.push(`${pkg}@${JSON.stringify(uniqueRanges[0])}`)
    }
  }

  if (installArgs.length === 0) return

  if (options.verbose) {
    console.log(
      styleText("cyan", `→`),
      `Installing ${installArgs.length} native package(s) into Quartz root...`,
    )
  }

  try {
    execSync(`npm install --no-save ${installArgs.join(" ")}`, {
      cwd: process.cwd(),
      stdio: options.verbose ? "inherit" : "pipe",
      timeout: 120_000,
    })

    if (options.verbose) {
      console.log(
        styleText("green", `✓`),
        `Installed native dependencies: ${[...merged.keys()].join(", ")}`,
      )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(
      styleText("red", `✗`),
      `Failed to install native dependencies. This may indicate incompatible version ranges across plugins.\n` +
        `  Packages: ${[...merged.keys()].join(", ")}\n` +
        `  Error: ${message}`,
    )
    throw new Error(`Native dependency installation failed: ${message}`)
  }
}

function isDistGitignored(pluginDir: string): boolean {
  const gitignorePath = path.join(pluginDir, ".gitignore")
  if (!fs.existsSync(gitignorePath)) return false

  const lines = fs.readFileSync(gitignorePath, "utf-8").split("\n")
  return lines.some((line) => {
    const trimmed = line.trim()
    return trimmed === "dist" || trimmed === "dist/" || trimmed === "/dist" || trimmed === "/dist/"
  })
}

function hasPrebuiltDist(pluginDir: string): boolean {
  const distDir = path.join(pluginDir, "dist")
  return fs.existsSync(distDir) && !isDistGitignored(pluginDir)
}

function needsBuild(pluginDir: string): boolean {
  if (isDistGitignored(pluginDir)) return true
  const distDir = path.join(pluginDir, "dist")
  return !fs.existsSync(distDir)
}

function findPluginByPackageName(packageName: string): string | null {
  if (!fs.existsSync(PLUGINS_CACHE_DIR)) return null

  const plugins = fs.readdirSync(PLUGINS_CACHE_DIR).filter((entry) => {
    const entryPath = path.join(PLUGINS_CACHE_DIR, entry)
    return fs.statSync(entryPath).isDirectory()
  })

  for (const pluginDirName of plugins) {
    const pkgPath = path.join(PLUGINS_CACHE_DIR, pluginDirName, "package.json")
    if (!fs.existsSync(pkgPath)) continue
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      if (pkg.name === packageName) {
        return path.join(PLUGINS_CACHE_DIR, pluginDirName)
      }
    } catch {}
  }
  return null
}

/**
 * Symlink peer dependencies to the host Quartz node_modules so plugins
 * share a single copy of packages like unified, vfile, preact, etc.
 * @quartz-community/* peers resolve to co-installed sibling plugins instead.
 */
function trySymlink(target: string, linkPath: string): void {
  try {
    fs.symlinkSync(target, linkPath, "dir")
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "EEXIST") return
    throw err
  }
}

function linkPeerDependencies(pluginDir: string): void {
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  const peers: Record<string, string> = pkg.peerDependencies ?? {}

  const quartzRoot = path.resolve(pluginDir, "..", "..", "..")
  const hostNodeModules = path.join(quartzRoot, "node_modules")

  for (const peerName of Object.keys(peers)) {
    const peerNodeModulesPath = path.join(pluginDir, "node_modules", ...peerName.split("/"))
    if (fs.existsSync(peerNodeModulesPath)) continue

    if (peerName.startsWith("@quartz-community/")) {
      const siblingPlugin = findPluginByPackageName(peerName)
      if (!siblingPlugin) continue

      const scopeDir = path.join(pluginDir, "node_modules", peerName.split("/")[0])
      fs.mkdirSync(scopeDir, { recursive: true })

      const target = path.relative(scopeDir, siblingPlugin)
      trySymlink(target, peerNodeModulesPath)
      continue
    }

    const hostPeerPath = path.join(hostNodeModules, ...peerName.split("/"))
    if (!fs.existsSync(hostPeerPath)) continue

    const parts = peerName.split("/")
    if (parts.length > 1) {
      const scopeDir = path.join(pluginDir, "node_modules", parts[0])
      fs.mkdirSync(scopeDir, { recursive: true })
    } else {
      fs.mkdirSync(path.join(pluginDir, "node_modules"), { recursive: true })
    }

    const target = path.relative(path.dirname(peerNodeModulesPath), hostPeerPath)
    trySymlink(target, peerNodeModulesPath)
  }
}

function buildInstalledPlugin(pluginDir: string, name: string, verbose?: boolean): void {
  if (hasPrebuiltDist(pluginDir)) {
    if (verbose) {
      console.log(styleText("green", `✓`), `${name}: using pre-built dist/`)
    }
    linkPeerDependencies(pluginDir)
    return
  }

  try {
    const shouldBuild = needsBuild(pluginDir)

    if (verbose) {
      console.log(styleText("cyan", `→`), `${name}: installing dependencies...`)
    }
    execSync("npm install --ignore-scripts", {
      cwd: pluginDir,
      stdio: verbose ? "inherit" : "pipe",
      timeout: 120_000,
    })

    if (shouldBuild) {
      if (verbose) {
        console.log(styleText("cyan", `→`), `${name}: building...`)
      }
      execSync("npm run build", {
        cwd: pluginDir,
        stdio: verbose ? "inherit" : "pipe",
        timeout: 120_000,
      })
    }

    execSync("npm prune --omit=dev", {
      cwd: pluginDir,
      stdio: verbose ? "inherit" : "pipe",
      timeout: 60_000,
    })

    linkPeerDependencies(pluginDir)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(styleText("red", `✗`), `${name}: post-install build failed: ${message}`)
    throw new Error(`Failed to build plugin ${name}: ${message}`)
  }
}

interface PluginInstallResult {
  pluginDir: string
  nativeDeps: Map<string, string>
}

/**
 * Install a plugin from a Git repository, or symlink a local plugin.
 * Returns the plugin directory and any native dependencies it requires.
 */
export async function installPlugin(
  spec: GitPluginSpec,
  options: { verbose?: boolean; force?: boolean } = {},
): Promise<PluginInstallResult> {
  const pluginDir = path.join(PLUGINS_CACHE_DIR, spec.name)

  // Local source: symlink instead of clone
  if (spec.local) {
    if (!fs.existsSync(spec.repo)) {
      throw new Error(`Local plugin path does not exist: ${spec.repo}`)
    }

    if (!options.force && fs.existsSync(pluginDir)) {
      // Check if existing entry is already a symlink to the right place
      try {
        const stat = fs.lstatSync(pluginDir)
        if (stat.isSymbolicLink() && fs.realpathSync(pluginDir) === fs.realpathSync(spec.repo)) {
          if (options.verbose) {
            console.log(styleText("cyan", `→`), `Plugin ${spec.name} already linked`)
          }
          linkPeerDependencies(pluginDir)
          return { pluginDir, nativeDeps: collectNativeDeps(pluginDir) }
        }
      } catch {
        // stat failed, recreate
      }
    }

    // Clean up if force reinstall or existing non-symlink entry
    if (fs.existsSync(pluginDir)) {
      const stat = fs.lstatSync(pluginDir)
      if (stat.isSymbolicLink()) {
        fs.unlinkSync(pluginDir)
      } else {
        fs.rmSync(pluginDir, { recursive: true })
      }
    }

    // Ensure parent directory exists
    const parentDir = path.dirname(pluginDir)
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true })
    }

    if (options.verbose) {
      console.log(styleText("cyan", `→`), `Linking ${spec.name} from ${spec.repo}...`)
    }

    fs.symlinkSync(spec.repo, pluginDir, "dir")

    if (options.verbose) {
      console.log(styleText("green", `✓`), `Linked ${spec.name}`)
    }

    // Local sources skip the git-clone build path (and its
    // linkPeerDependencies call in buildInstalledPlugin), so a local
    // plugin that peer-depends on another @quartz-community/* plugin
    // (e.g. a custom view registering against bases-page) would
    // otherwise resolve a different module instance than the one the
    // rest of Quartz uses, breaking any module-level singleton state
    // (like a view-type registry) shared between them.
    linkPeerDependencies(pluginDir)

    return { pluginDir, nativeDeps: collectNativeDeps(pluginDir) }
  }

  // Git source: clone
  // Check if already installed
  if (!options.force && fs.existsSync(pluginDir)) {
    // For subdir installs, the .git directory is removed after extraction,
    // so check for package.json instead. For full-repo installs, check git HEAD.
    if (spec.subdir) {
      const pkgPath = path.join(pluginDir, "package.json")
      if (fs.existsSync(pkgPath)) {
        if (options.verbose) {
          console.log(styleText("cyan", `→`), `Plugin ${spec.name} already installed`)
        }
        return { pluginDir, nativeDeps: collectNativeDeps(pluginDir) }
      }
    } else {
      try {
        await git.resolveRef({ fs, dir: pluginDir, ref: "HEAD" })
        if (options.verbose) {
          console.log(styleText("cyan", `→`), `Plugin ${spec.name} already installed`)
        }
        return { pluginDir, nativeDeps: collectNativeDeps(pluginDir) }
      } catch {
        // If git operations fail, re-clone
      }
    }
  }

  // Clean up if force reinstall or stale install
  if (fs.existsSync(pluginDir)) {
    fs.rmSync(pluginDir, { recursive: true })
  }

  if (options.verbose) {
    const refSuffix = spec.ref ? `#${spec.ref}` : ""
    const subdirSuffix = spec.subdir ? ` (subdir: ${spec.subdir})` : ""
    console.log(
      styleText("cyan", `→`),
      `Cloning ${spec.name} from ${spec.repo}${refSuffix}${subdirSuffix}...`,
    )
  }

  if (spec.subdir) {
    const tmpDir = pluginDir + ".__tmp__"
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true })
    }

    const branchArg = spec.ref ? ` --branch ${spec.ref}` : ""
    execSync(`git clone --depth 1${branchArg} "${spec.repo}" "${tmpDir}"`, { stdio: "pipe" })

    const subdirPath = path.join(tmpDir, spec.subdir)
    if (!fs.existsSync(subdirPath)) {
      fs.rmSync(tmpDir, { recursive: true })
      throw new Error(`Subdirectory "${spec.subdir}" not found in repository ${spec.repo}`)
    }

    fs.renameSync(subdirPath, pluginDir)
    fs.rmSync(tmpDir, { recursive: true })
  } else {
    const branchArg = spec.ref ? ` --branch ${spec.ref}` : ""
    execSync(`git clone --depth 1${branchArg} "${spec.repo}" "${pluginDir}"`, { stdio: "pipe" })
  }

  buildInstalledPlugin(pluginDir, spec.name, options.verbose)

  if (options.verbose) {
    console.log(styleText("green", `✓`), `Installed ${spec.name}`)
  }

  return { pluginDir, nativeDeps: collectNativeDeps(pluginDir) }
}

/**
 * Install multiple plugins from Git repositories
 */
export async function installPlugins(
  sources: PluginInstallSource[],
  options: { verbose?: boolean; force?: boolean } = {},
): Promise<Map<string, string>> {
  const installed = new Map<string, string>()
  const allNativeDeps = new Map<string, Map<string, string>>()

  for (const source of sources) {
    try {
      const spec = typeof source === "string" ? parsePluginSource(source) : source
      const result = await installPlugin(spec, options)
      installed.set(spec.name, result.pluginDir)
      if (result.nativeDeps.size > 0) {
        allNativeDeps.set(spec.name, result.nativeDeps)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(styleText("red", `✗`), `Failed to install plugin: ${message}`)
    }
  }

  if (allNativeDeps.size > 0) {
    installNativeDeps(allNativeDeps, options)
  }

  await regeneratePluginIndex(options)

  return installed
}

/**
 * Get the installation directory for a plugin
 */
export function getPluginDir(name: string): string {
  return path.join(PLUGINS_CACHE_DIR, name)
}

/**
 * Check if a plugin is installed
 */
export function isPluginInstalled(name: string): boolean {
  return fs.existsSync(getPluginDir(name))
}

/**
 * Get the entry point for a plugin.
 * Prefers compiled dist/ output over raw src/ to avoid ESM resolution issues.
 */
export function getPluginEntryPoint(name: string): string {
  const pluginDir = getPluginDir(name)
  const searchDir = pluginDir
  // Check package.json exports first (most reliable)
  const pkgJsonPath = path.join(searchDir, "package.json")
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"))
      const exportEntry = pkg.exports?.["."]
      const importPath = typeof exportEntry === "string" ? exportEntry : exportEntry?.import
      if (importPath) {
        const resolved = path.join(searchDir, importPath)
        if (fs.existsSync(resolved)) {
          return resolved
        }
      }
      // Fall back to main/module fields
      const mainField = pkg.module ?? pkg.main
      if (mainField) {
        const resolved = path.join(searchDir, mainField)
        if (fs.existsSync(resolved)) {
          return resolved
        }
      }
    } catch {
      // package.json parse error, fall through to candidates
    }
  }

  // Try common entry points — prefer compiled dist/ over raw src/
  const candidates = [
    path.join(searchDir, "dist", "index.js"),
    path.join(searchDir, "dist", "index.mjs"),
    path.join(searchDir, "index.js"),
    path.join(searchDir, "index.ts"),
    path.join(searchDir, "src", "index.js"),
    path.join(searchDir, "src", "index.ts"),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }
  // If no entry found, return the search dir and let Node handle it
  return searchDir
}

/**
 * Resolve a subpath export for a plugin (e.g. "./components").
 * Uses package.json exports map, then falls back to dist/ directory structure.
 */
export function getPluginSubpathEntry(name: string, subpath: string): string | null {
  const pluginDir = getPluginDir(name)
  const searchDir = pluginDir

  // Check package.json exports map
  const pkgJsonPath = path.join(searchDir, "package.json")
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"))
      const exportEntry = pkg.exports?.[subpath]
      const importPath = typeof exportEntry === "string" ? exportEntry : exportEntry?.import
      if (importPath) {
        const resolved = path.join(searchDir, importPath)
        if (fs.existsSync(resolved)) {
          return resolved
        }
      }
    } catch {
      // fall through
    }
  }

  // Fall back: try dist/<subpath>/index.js
  const subpathClean = subpath.replace(/^\.\/?/, "")
  const fallbackCandidates = [
    path.join(searchDir, "dist", subpathClean, "index.js"),
    path.join(searchDir, "dist", `${subpathClean}.js`),
    path.join(searchDir, subpathClean, "index.js"),
  ]

  for (const candidate of fallbackCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return null
}
/**
 * Update all installed plugins
 */
export async function updatePlugins(options: { verbose?: boolean } = {}): Promise<void> {
  if (!fs.existsSync(PLUGINS_CACHE_DIR)) {
    console.log("No plugins installed")
    return
  }

  const plugins = fs.readdirSync(PLUGINS_CACHE_DIR)

  for (const pluginName of plugins) {
    const pluginDir = path.join(PLUGINS_CACHE_DIR, pluginName)

    try {
      // Check if it's a git repo
      await git.resolveRef({ fs, dir: pluginDir, ref: "HEAD" })

      if (options.verbose) {
        console.log(styleText("cyan", `→`), `Updating ${pluginName}...`)
      }

      // Fetch latest
      await git.fetch({
        fs,
        http,
        dir: pluginDir,
        singleBranch: true,
      })

      // Checkout to latest fetched commit
      await git.checkout({
        fs,
        dir: pluginDir,
        ref: "FETCH_HEAD",
        force: true,
      })

      if (options.verbose) {
        console.log(styleText("green", `✓`), `Updated ${pluginName}`)
      }
    } catch (error) {
      if (options.verbose) {
        console.error(styleText("yellow", `⚠`), `Skipping ${pluginName}: Not a git repo`)
      }
    }
  }
}

/**
 * Clean all installed plugins
 */
export function cleanPlugins(): void {
  if (fs.existsSync(PLUGINS_CACHE_DIR)) {
    fs.rmSync(PLUGINS_CACHE_DIR, { recursive: true })
    console.log(styleText("green", `✓`), "Cleaned all plugins")
  }
}

const NODE_BUILTINS = new Set([
  "assert",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
])

/**
 * Packages that must be the same JavaScript module instance at runtime across
 * all plugins and the host. These are true singletons — duplicating them causes
 * broken identity checks (e.g. `instanceof`, shared registries).
 *
 * This list should be kept small and explicit. Only add packages here when
 * multiple copies at runtime would cause correctness issues.
 */
const SINGLETON_EXTERNALS = ["preact", "@jackyzha0/quartz", "vfile", "unified"]

/**
 * Scope prefixes whose packages are always treated as shared externals.
 * Plugins under these scopes are co-installed siblings, not bundled deps.
 */
const SHARED_SCOPES = ["@quartz-community/", "@quartz-themes/"]

/**
 * Build the full shared externals list by combining:
 *  1. Explicit singleton packages (must be same instance at runtime)
 *  2. Shared scope prefixes (@quartz-community/*)
 *  3. Auto-detected dependencies from Quartz's own package.json
 *
 * The auto-detection ensures that when Quartz adds a new dependency,
 * plugins that import it won't get false "unbundled external" warnings.
 */
let _sharedExternalsCache: string[] | null = null

export function getSharedExternals(): string[] {
  if (_sharedExternalsCache) return _sharedExternalsCache

  const externals = [...SINGLETON_EXTERNALS, ...SHARED_SCOPES]

  // Auto-detect from Quartz's package.json
  const quartzPkgPath = path.join(process.cwd(), "package.json")
  if (fs.existsSync(quartzPkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(quartzPkgPath, "utf-8"))
      const deps = Object.keys(pkg.dependencies ?? {})
      for (const dep of deps) {
        if (!externals.includes(dep)) {
          externals.push(dep)
        }
      }
    } catch {
      // Fall back to explicit list only
    }
  }

  _sharedExternalsCache = externals
  return externals
}

/**
 * Check whether an import specifier is an allowed external for a plugin.
 * Allowed externals are: Node builtins, shared externals (singletons +
 * Quartz deps + shared scopes), and the plugin's own declared peerDependencies.
 */
function isAllowedExternal(specifier: string, pluginPeerDeps: string[]): boolean {
  if (specifier.startsWith("node:")) return true

  const bare = specifier.split("/")[0]
  if (NODE_BUILTINS.has(bare)) return true

  const sharedExternals = getSharedExternals()
  if (sharedExternals.some((prefix) => specifier.startsWith(prefix))) return true

  if (pluginPeerDeps.some((dep) => specifier === dep || specifier.startsWith(dep + "/"))) {
    return true
  }

  return false
}

export function validatePluginExternals(
  pluginName: string,
  entryPoint: string,
  _options?: { verbose?: boolean },
): string[] {
  try {
    const content = fs.readFileSync(entryPoint, "utf-8")

    let peerDeps: string[] = []
    const pluginDir = path.dirname(entryPoint).replace(/\/dist$/, "")
    const pkgPath = path.join(pluginDir, "package.json")
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
        peerDeps = Object.keys(pkg.peerDependencies ?? {})
      } catch {
        // ignore parse errors
      }
    }

    const importPattern =
      /^\s*(?:import\s+.*\s+from|export\s+.*\s+from)\s+["']([^"'./][^"']*)["']/gm
    const unexpected: string[] = []

    for (const match of content.matchAll(importPattern)) {
      const specifier = match[1]
      if (!isAllowedExternal(specifier, peerDeps)) {
        unexpected.push(specifier)
      }
    }

    const unique = [...new Set(unexpected)]

    if (unique.length > 0) {
      console.error(
        styleText("red", `✗`) +
          ` Plugin ${styleText("cyan", pluginName)} has unbundled external imports that will fail at runtime:\n` +
          unique.map((s) => `  - ${s}`).join("\n") +
          `\n  These packages are not provided by Quartz. The plugin must bundle them into dist/.` +
          `\n  In the plugin's tsup.config.ts, add these to noExternal or remove the imports.`,
      )
    }

    return unique
  } catch {
    return []
  }
}

export async function regeneratePluginIndex(
  options: { verbose?: boolean; npmPackages?: string[] } = {},
): Promise<void> {
  if (!fs.existsSync(PLUGINS_CACHE_DIR)) {
    fs.mkdirSync(PLUGINS_CACHE_DIR, { recursive: true })
  }

  const pluginDirs = fs.readdirSync(PLUGINS_CACHE_DIR).filter((name) => {
    const pluginPath = path.join(PLUGINS_CACHE_DIR, name)
    return fs.statSync(pluginPath).isDirectory()
  })

  // Phase 1: Collect all exports per plugin, detect conflicts
  // importPath maps plugin key → the import specifier used in generated index.ts
  const pluginExports = new Map<
    string,
    { overridable: string[]; passthrough: string[]; types: string[] }
  >()
  const importPath = new Map<string, string>()
  const nameCount = new Map<string, number>()

  for (const pluginName of pluginDirs) {
    const pluginDir = path.join(PLUGINS_CACHE_DIR, pluginName)
    const distIndex = path.join(pluginDir, "dist", "index.d.ts")

    if (!fs.existsSync(distIndex)) {
      if (options.verbose) {
        console.log(styleText("yellow", `⚠`), `Skipping ${pluginName}: no dist/index.d.ts found`)
      }
      continue
    }

    const dtsContent = fs.readFileSync(distIndex, "utf-8")
    const exportedNames = parseExportsFromDts(dtsContent)
    const dtsTypes = exportedNames.filter((e) => e.startsWith("type ")).map((e) => e.slice(5))
    const dtsNamed = exportedNames.filter((e) => !e.startsWith("type "))

    const jsIndex = path.join(pluginDir, "dist", "index.js")
    let jsExports = new Set<string>()
    if (fs.existsSync(jsIndex)) {
      const jsContent = fs.readFileSync(jsIndex, "utf-8")
      const jsExportMatches = jsContent.matchAll(/export\s*{\s*([^}]+)\s*}/g)
      for (const m of jsExportMatches) {
        for (const n of m[1].split(",")) {
          const clean = n
            .trim()
            .split(/\s+as\s+/)
            .pop()
            ?.trim()
          if (clean) jsExports.add(clean)
        }
      }
    }

    const named = jsExports.size > 0 ? dtsNamed.filter((n) => jsExports.has(n)) : dtsNamed
    const extraTypes = jsExports.size > 0 ? dtsNamed.filter((n) => !jsExports.has(n)) : []
    const types = [...dtsTypes, ...extraTypes]

    const overridable = named.filter((n) => isOverridableExport(n, dtsContent))
    const passthrough = named.filter((n) => !isOverridableExport(n, dtsContent))

    if (overridable.length > 0 || passthrough.length > 0 || types.length > 0) {
      pluginExports.set(pluginName, { overridable, passthrough, types })
      importPath.set(pluginName, `./${pluginName}`)
      for (const n of [...overridable, ...passthrough]) {
        nameCount.set(n, (nameCount.get(n) ?? 0) + 1)
      }
    }
  }

  for (const npmPkg of options.npmPackages ?? []) {
    let distIndex: string | undefined
    try {
      const pkgJsonPath = fileURLToPath(import.meta.resolve(`${npmPkg}/package.json`))
      distIndex = path.join(path.dirname(pkgJsonPath), "dist", "index.d.ts")
    } catch {
      if (options.verbose) {
        console.log(styleText("yellow", `⚠`), `Skipping npm package ${npmPkg}: not found`)
      }
      continue
    }

    if (!distIndex || !fs.existsSync(distIndex)) {
      if (options.verbose) {
        console.log(styleText("yellow", `⚠`), `Skipping npm package ${npmPkg}: no dist/index.d.ts`)
      }
      continue
    }

    const dtsContent = fs.readFileSync(distIndex, "utf-8")
    const exportedNames = parseExportsFromDts(dtsContent)
    const dtsTypes = exportedNames.filter((e) => e.startsWith("type ")).map((e) => e.slice(5))
    const dtsNamed = exportedNames.filter((e) => !e.startsWith("type "))

    const jsIndex = path.join(path.dirname(distIndex), "index.js")
    let jsExports = new Set<string>()
    if (fs.existsSync(jsIndex)) {
      const jsContent = fs.readFileSync(jsIndex, "utf-8")
      const jsExportMatches = jsContent.matchAll(/export\s*{\s*([^}]+)\s*}/g)
      for (const m of jsExportMatches) {
        for (const n of m[1].split(",")) {
          const clean = n
            .trim()
            .split(/\s+as\s+/)
            .pop()
            ?.trim()
          if (clean) jsExports.add(clean)
        }
      }
    }

    const named = jsExports.size > 0 ? dtsNamed.filter((n) => jsExports.has(n)) : dtsNamed
    const extraTypes = jsExports.size > 0 ? dtsNamed.filter((n) => !jsExports.has(n)) : []
    const types = [...dtsTypes, ...extraTypes]

    const overridable = named.filter((n) => isOverridableExport(n, dtsContent))
    const passthrough = named.filter((n) => !isOverridableExport(n, dtsContent))

    const key = npmPkg.replace(/^@/, "").replace(/\//g, "__")
    if (overridable.length > 0 || passthrough.length > 0 || types.length > 0) {
      pluginExports.set(key, { overridable, passthrough, types })
      importPath.set(key, npmPkg)
      for (const n of [...overridable, ...passthrough]) {
        nameCount.set(n, (nameCount.get(n) ?? 0) + 1)
      }
    }
  }

  // Phase 2: Generate index with registry import, plugin map, and conditional top-level exports
  const lines: string[] = []

  lines.push(`import { componentRegistry } from "../../quartz/components/registry"`)
  lines.push("")

  for (const [pluginKey, { types }] of pluginExports) {
    if (types.length > 0) {
      lines.push(`export type { ${types.join(", ")} } from "${importPath.get(pluginKey)}"`)
    }
  }

  for (const [pluginKey, { passthrough }] of pluginExports) {
    if (passthrough.length === 0) continue
    const unique = passthrough.filter((n) => (nameCount.get(n) ?? 0) === 1)
    if (unique.length > 0) {
      lines.push(`export { ${unique.join(", ")} } from "${importPath.get(pluginKey)}"`)
    }
  }
  lines.push("")

  // Generate the plugins map with override wrappers (overridable exports only)
  lines.push(
    `export const plugins: Record<string, Record<string, (...args: unknown[]) => void>> = {`,
  )
  for (const [pluginName, { overridable }] of pluginExports) {
    if (overridable.length === 0) continue
    const escapedName = pluginName.replace(/"/g, '\\"')
    lines.push(`  "${escapedName}": {`)
    for (const n of overridable) {
      lines.push(
        `    ${n}: (...args: unknown[]) => { componentRegistry.setOptionOverrides("${escapedName}", args[0] as Record<string, unknown>); },`,
      )
    }
    lines.push(`  },`)
  }
  lines.push(`}`)
  lines.push("")

  // Top-level exports for overridable names: alias to the plugins map wrapper
  for (const [pluginName, { overridable }] of pluginExports) {
    if (overridable.length === 0) continue

    const unique = overridable.filter((n) => (nameCount.get(n) ?? 0) === 1)
    const conflicting = overridable.filter((n) => (nameCount.get(n) ?? 0) > 1)

    if (unique.length > 0) {
      const escapedName = pluginName.replace(/"/g, '\\"')
      for (const n of unique) {
        lines.push(`export const ${n} = plugins["${escapedName}"].${n}`)
      }
    }

    if (conflicting.length > 0 && options.verbose) {
      for (const n of conflicting) {
        console.warn(
          styleText("yellow", `⚠`),
          `Export "${n}" conflicts across plugins — use plugins["${pluginName}"].${n} in quartz.ts`,
        )
      }
    }
  }

  lines.push("")

  const indexContent = lines.join("\n")
  const indexPath = path.join(PLUGINS_CACHE_DIR, "index.ts")

  fs.writeFileSync(indexPath, indexContent)

  if (options.verbose) {
    console.log(
      styleText("green", `✓`),
      `Regenerated plugin index with ${pluginDirs.length} plugins`,
    )
  }
}

const INTERNAL_EXPORTS = new Set(["manifest", "default"])

const PLUGIN_TYPE_PATTERN =
  /Quartz(?:Emitter|Transformer|Filter|PageType)Plugin|QuartzComponentConstructor|\(.*\)\s*=>\s*QuartzComponent\b/

function resolveOriginalName(exportName: string, dtsContent: string): string {
  const aliasPattern = new RegExp(`(\\w+)\\s+as\\s+${exportName}\\b`)
  const match = dtsContent.match(aliasPattern)
  return match ? match[1] : exportName
}

function isOverridableExport(name: string, dtsContent: string): boolean {
  const declName = resolveOriginalName(name, dtsContent)
  const declPattern = new RegExp(`declare\\s+const\\s+${declName}\\s*:\\s*(.+?)(?:;|$)`, "m")
  const match = dtsContent.match(declPattern)
  if (!match) return false
  return PLUGIN_TYPE_PATTERN.test(match[1])
}

function parseExportsFromDts(content: string): string[] {
  const exports: string[] = []

  const exportMatches = content.matchAll(/export\s*{\s*([^}]+)\s*}(?:\s*from\s*['"]([^'"]+)['"])?/g)
  for (const match of exportMatches) {
    const fromModule = match[2]
    if (fromModule?.startsWith("@")) {
      continue
    }

    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
    for (const name of names) {
      const cleanName = name.split(" as ").pop()?.trim() || name.trim()
      if (cleanName && !cleanName.startsWith("_") && !INTERNAL_EXPORTS.has(cleanName)) {
        const finalName = cleanName.replace(/^type\s+/, "")
        if (name.includes("type ")) {
          exports.push(`type ${finalName}`)
        } else {
          exports.push(finalName)
        }
      }
    }
  }

  return exports
}
