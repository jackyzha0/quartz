/**
 * Quartz version and plugin compatibility helpers, shared by the CLI (plain Node) and the build
 * (TypeScript, see compat.d.ts).
 *
 * Plugins declare the Quartz versions they work with in `package.json`:
 *
 *   "quartz": { "quartzVersion": ">=5.1.0" }
 *
 * Any npm semver range works (`^5.1.0`, `>=5.1.0 <7`). Quartz checks it when loading the config
 * (build, `plugin doctor`, `plugin add/install`) and names the requirement in error messages.
 */
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import semver from "semver"

const QUARTZ_PACKAGE = "@jackyzha0/quartz"

/** Version from Quartz's package.json (cwd = Quartz root for every CLI command). */
export function readQuartzVersion(root = process.cwd()) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))
    if (pkg?.name === QUARTZ_PACKAGE && typeof pkg.version === "string") return pkg.version
  } catch {}
  return undefined
}

/**
 * Check a plugin's `quartzVersion` range against the running Quartz version.
 * Returns { status: "ok" | "incompatible" | "invalid" | "unknown" | "none", range, version }.
 * Prereleases of a satisfying version count as satisfying (5.1.0-beta.1 satisfies >=5.1.0-0 and
 * >=5.0.0), so pre-release testing works.
 */
export function checkQuartzRequirement(range, version) {
  if (range === undefined || range === null || range === "") {
    return { status: "none", range: undefined, version }
  }
  if (typeof range !== "string" || semver.validRange(range) === null) {
    return { status: "invalid", range: String(range), version }
  }
  if (!version || semver.valid(version) === null) return { status: "unknown", range, version }
  const ok = semver.satisfies(version, range, { includePrerelease: true })
  return { status: ok ? "ok" : "incompatible", range, version }
}

/** One-line explanation + fix for an incompatible or invalid requirement (undefined when fine). */
export function describeRequirementProblem(pluginName, result, pluginVersion) {
  const label = pluginVersion ? `${pluginName}@${pluginVersion}` : pluginName
  if (result.status === "invalid") {
    return {
      message: `${label} declares quartzVersion "${result.range}", which is not a valid semver range (ignored).`,
      hint: `Plugin authors: use e.g. ">=5.1.0" in package.json → quartz.quartzVersion.`,
    }
  }
  if (result.status !== "incompatible") return undefined
  const min = semver.minVersion(result.range)
  const newer = min && semver.gt(min, result.version)
  return {
    message: `${label} requires Quartz ${result.range}, but this is Quartz ${result.version}.`,
    hint: newer
      ? `Update Quartz (npx quartz upgrade), or use an older version of ${pluginName} that supports ${result.version}.`
      : `${pluginName} does not support this Quartz version yet — check for a newer release of the plugin.`,
  }
}

/**
 * Whether incompatible plugins fail the build: in CI (`CI` set, as GitHub Actions, GitLab CI,
 * Netlify, Vercel, Cloudflare Pages… do) unless QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1. Locally they
 * only warn, so a site keeps building while you sort out versions.
 */
export function incompatiblePluginsFailBuild(env = process.env) {
  if (env.QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS === "1") return false
  return isCI(env)
}

/**
 * Whether plugins that fail to load fail the build: in CI unless QUARTZ_ALLOW_BROKEN_PLUGINS=1.
 * Locally the build continues without them (and says so), so the rest of the site can be checked.
 */
export function brokenPluginsFailBuild(env = process.env) {
  if (env.QUARTZ_ALLOW_BROKEN_PLUGINS === "1") return false
  return isCI(env)
}

/** `CI` set to anything but "", "0" or "false". */
export function isCI(env = process.env) {
  const ci = env.CI
  return ci !== undefined && ci !== "" && ci !== "0" && ci.toLowerCase() !== "false"
}

/**
 * A plugin's `quartz.deprecated` message (a string, ideally naming its replacement) as a warning
 * with a fix; undefined when the plugin isn't deprecated.
 */
export function describeDeprecation(pluginName, deprecated) {
  if (typeof deprecated !== "string" || deprecated.trim() === "") return undefined
  return {
    message: `${pluginName} is deprecated: ${deprecated.trim()}`,
    hint: `Remove it when you have switched: npx quartz plugin remove ${pluginName}`,
  }
}

function git(root, args) {
  try {
    return execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      timeout: 3000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return undefined
  }
}

/**
 * Where this Quartz checkout is, in version terms: `git describe` against release tags
 * (e.g. "v5.1.0", "v5.1.0-3-g1a2b3c4", "v5.1.0-3-g1a2b3c4-dirty"), plus commit and branch.
 * All fields are undefined outside a git checkout.
 */
export function describeQuartzCheckout(root = process.cwd()) {
  const describe = git(root, ["describe", "--tags", "--match", "v*", "--always", "--dirty"])
  const commit = git(root, ["rev-parse", "--short", "HEAD"])
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"])
  const dirtyFiles = git(root, ["status", "--porcelain", "--untracked-files=no"])
  return {
    describe,
    commit,
    branch: branch === "HEAD" ? undefined : branch,
    dirty: dirtyFiles === undefined ? undefined : dirtyFiles.length > 0,
    upstream: git(root, ["config", "--get", "remote.upstream.url"]),
    origin: git(root, ["config", "--get", "remote.origin.url"]),
  }
}

/** "5.1.0" or "5.1.0 (v5.1.0-3-g1a2b3c4-dirty)" when the checkout is not exactly a release. */
export function formatQuartzVersion(version, checkout) {
  const v = version ?? "unknown"
  const d = checkout?.describe
  if (!d || d === `v${v}`) return v
  return `${v} (${d})`
}
