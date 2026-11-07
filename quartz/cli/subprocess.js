/**
 * Running git and npm safely (#2571).
 *
 * Plugin sources, refs, pinned commits and package names come from quartz.config.yaml,
 * quartz.lock.json and the command line. They are passed to git/npm as argument arrays, never
 * through a shell, so `;`, `$(…)`, quotes and spaces are inert. Values that end up as positional
 * arguments are also validated (or placed after `--`), because a value starting with `-` would
 * otherwise be read as an option: `git fetch origin --upload-pack=<cmd>` runs <cmd> even without
 * a shell.
 *
 * npm is `npm.cmd` on Windows, which Node only runs through a shell (CVE-2024-27980). There,
 * every argument must pass a strict whitelist first.
 */
import { execFile, execFileSync } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

export const GIT_TIMEOUT_MS = 120_000
export const NPM_TIMEOUT_MS = 600_000
const MAX_BUFFER = 64 * 1024 * 1024

/** A full or abbreviated commit SHA (as written to quartz.lock.json). */
export function assertCommit(commit) {
  if (typeof commit !== "string" || !/^[0-9a-f]{7,64}$/i.test(commit)) {
    throw new Error(`Invalid commit ${JSON.stringify(commit)}: expected a hexadecimal SHA`)
  }
  return commit
}

/**
 * A branch or tag name. Follows `git check-ref-format` closely enough to reject everything that
 * could be an option or isn't a ref: no leading `-`, no whitespace or control characters, none of
 * `~ ^ : ? * [ \`, no `..`, `@{`, `//`, trailing `/`, `.` or `.lock`.
 */
export function assertRef(ref) {
  const invalid =
    typeof ref !== "string" ||
    ref === "" ||
    ref === "@" ||
    ref.startsWith("-") ||
    ref.startsWith("/") ||
    /[\s\x00-\x1f\x7f~^:?*[\\]/.test(ref) ||
    ref.includes("..") ||
    ref.includes("@{") ||
    ref.includes("//") ||
    /(^|\/)\./.test(ref) ||
    /[/.]$/.test(ref) ||
    ref.endsWith(".lock")
  if (invalid) throw new Error(`Invalid git ref ${JSON.stringify(ref)}`)
  return ref
}

/** A repository URL or path for git (never an option). */
export function assertRepoUrl(url) {
  if (typeof url !== "string" || url === "" || url.startsWith("-") || /[\x00-\x1f\x7f]/.test(url)) {
    throw new Error(`Invalid repository ${JSON.stringify(url)}`)
  }
  return url
}

// no leading "-" (it would be read as an npm option), "." or "_"
const NPM_NAME = /^(?:@[a-z0-9~][a-z0-9._~-]*\/)?[a-z0-9~][a-z0-9._~-]*$/
// a version or range after the name: 1.2.3, ^1.2, >=1 <2, latest, npm:alias@1 is not accepted
const NPM_VERSION = /^[0-9A-Za-z.^~<>=*|+ -]+$/

/** An npm package spec: `name`, `@scope/name`, optionally `@<version or range or tag>`. */
export function assertNpmSpec(spec) {
  if (typeof spec !== "string") throw new Error(`Invalid npm package ${JSON.stringify(spec)}`)
  const at = spec.lastIndexOf("@")
  const hasVersion = at > 0
  const name = hasVersion ? spec.slice(0, at) : spec
  const version = hasVersion ? spec.slice(at + 1) : undefined
  if (
    !NPM_NAME.test(name) ||
    name.length > 214 ||
    (version !== undefined && (version === "" || !NPM_VERSION.test(version)))
  ) {
    throw new Error(`Invalid npm package ${JSON.stringify(spec)}`)
  }
  return spec
}

function options(opts = {}, timeout) {
  return {
    cwd: opts.cwd,
    env: opts.env,
    encoding: "utf8",
    stdio: opts.stdio ?? "pipe",
    timeout: opts.timeout ?? timeout,
    maxBuffer: MAX_BUFFER,
    windowsHide: true,
  }
}

/** Run git synchronously; returns stdout ("" with stdio: "inherit"). */
export function git(args, opts) {
  return execFileSync("git", args, options(opts, GIT_TIMEOUT_MS)) ?? ""
}

/** Run git; resolves to { stdout, stderr }. */
export function gitAsync(args, opts) {
  const { stdio: _stdio, ...rest } = options(opts, GIT_TIMEOUT_MS)
  return execFileAsync("git", args, rest)
}

// Characters allowed in an npm argument that must go through cmd.exe on Windows. Each argument
// is wrapped in double quotes, inside which spaces and < > | are literal; `"`, `%` and `!` (the
// characters cmd.exe still interprets there) are never allowed.
const WINDOWS_SHELL_SAFE = /^[A-Za-z0-9@._/:=+~^,<>|* -]+$/

export function npmCommand(args, platform = process.platform) {
  if (platform !== "win32") return { file: "npm", args, shell: false }
  const quoted = args.map((arg) => {
    if (!WINDOWS_SHELL_SAFE.test(arg)) {
      throw new Error(`Refusing to pass ${JSON.stringify(arg)} to npm through the Windows shell`)
    }
    return `"${arg}"`
  })
  return { file: "npm.cmd", args: quoted, shell: true }
}

/** Run npm synchronously; returns stdout ("" with stdio: "inherit"). */
export function npm(args, opts) {
  const cmd = npmCommand(args)
  return (
    execFileSync(cmd.file, cmd.args, { ...options(opts, NPM_TIMEOUT_MS), shell: cmd.shell }) ?? ""
  )
}

/** Run npm; resolves to { stdout, stderr }. */
export function npmAsync(args, opts) {
  const cmd = npmCommand(args)
  const { stdio: _stdio, ...rest } = options(opts, NPM_TIMEOUT_MS)
  return execFileAsync(cmd.file, cmd.args, { ...rest, shell: cmd.shell })
}

/** A string literal for generated TypeScript/JavaScript source. */
export function jsString(value) {
  return JSON.stringify(String(value))
}

/** Whether a name is a plain JavaScript identifier (safe to write into generated source). */
export function isIdentifier(name) {
  return typeof name === "string" && /^[A-Za-z_$][\w$]*$/.test(name)
}
