import { isCancel, outro } from "@clack/prompts"
import { styleText } from "util"
import { contentCacheFolder } from "./constants.js"
import { spawnSync } from "child_process"
import fs from "fs"
import path from "path"

export function escapePath(fp) {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^"(.*)"$/, "$1")
    .replace(/^'(.*)'$/, "$1")
    .trim()
}

export function exitIfCancel(val) {
  if (isCancel(val)) {
    outro(styleText("red", "Exiting"))
    process.exit(0)
  } else {
    return val
  }
}

export async function stashContentFolder(contentFolder) {
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
  await fs.promises.cp(contentFolder, contentCacheFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
}

export function gitPull(origin, branch) {
  const flags = ["--no-rebase", "--autostash", "--no-edit", "--allow-unrelated-histories"]
  const out = spawnSync("git", ["pull", ...flags, origin, branch], { stdio: "inherit" })
  if (out.stderr) {
    throw new Error(styleText("red", `Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(styleText("red", "Error while pulling updates"))
  }
}

export async function popContentFolder(contentFolder) {
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
  await fs.promises.cp(contentCacheFolder, contentFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
}

/**
 * Whether an existing symlink or junction already points at the absolute plugin directory.
 * readlink may return a path relative to the link's parent, so both sides are resolved first.
 */
export function localLinkMatches(linkPath, expectedAbsolute) {
  let target
  try {
    target = fs.readlinkSync(linkPath)
  } catch {
    return false
  }
  const actual = path.resolve(path.dirname(linkPath), target)
  const expected = path.resolve(expectedAbsolute)
  if (process.platform === "win32") return actual.toLowerCase() === expected.toLowerCase()
  return actual === expected
}

/**
 * Create a directory symlink with Windows fallback.
 *
 * On Windows, creating symlinks requires Developer Mode or admin privileges.
 * When that fails (EPERM), we try a junction first (no elevation needed),
 * then fall back to a recursive copy as a last resort.
 *
 * @param {string} target  Symlink target (may be relative)
 * @param {string} linkPath  Path where the link is created
 */
export function symlinkOrCopySync(target, linkPath) {
  try {
    fs.symlinkSync(target, linkPath, "dir")
  } catch (err) {
    if (err.code === "EEXIST") return
    if (err.code === "EPERM" && process.platform === "win32") {
      try {
        fs.symlinkSync(target, linkPath, "junction")
        return
      } catch {
        const resolvedTarget = path.resolve(path.dirname(linkPath), target)
        fs.cpSync(resolvedTarget, linkPath, { recursive: true })
        return
      }
    }
    throw err
  }
}

/**
 * Async version of {@link symlinkOrCopySync}.
 *
 * @param {string} target  Symlink target (may be relative)
 * @param {string} linkPath  Path where the link is created
 */
export async function symlinkOrCopy(target, linkPath) {
  try {
    await fs.promises.symlink(target, linkPath, "dir")
  } catch (err) {
    if (err.code === "EEXIST") return
    if (err.code === "EPERM" && process.platform === "win32") {
      try {
        await fs.promises.symlink(target, linkPath, "junction")
        return
      } catch {
        const resolvedTarget = path.resolve(path.dirname(linkPath), target)
        await fs.promises.cp(resolvedTarget, linkPath, { recursive: true })
        return
      }
    }
    throw err
  }
}
