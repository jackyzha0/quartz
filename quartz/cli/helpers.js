import { isCancel, outro } from "@clack/prompts"
import chalk from "chalk"
import { contentCacheFolder } from "./constants.js"
import { spawnSync } from "child_process"
import fs from "fs"

export function escapePath(fp) {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^".*"$/, "$1")
    .replace(/^'.*"$/, "$1")
    .trim()
}

export function exitIfCancel(val) {
  if (isCancel(val)) {
    outro(chalk.red("Exiting"))
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

export function validatePluginURL(url) {
  /**
   * Validate that the passed-in URL conforms to the plugin format
   *
   * @param url - url to be validated
   *
   * @beta
   */

  if (/^http[s]?\:.*\..*/.test(url)) {
    return 1
  } else if (/^(?:[\w_-]+)\/(?:[\w\.-]+)$/.test(url)) {
    return 2
  } else return -1
}

export function gitSubmoduleAdd(url, dest) {
  /**
   * Add a submodule to the Quartz repo.
   * In order to have update functionality and to be able to push to your remote, needs to be submodule rather than clone.
   * - This creates numerous issues still being resolved.
   *
   * @param url - Source location as a hypertext link or the shorthand "user/repo". The latter will clone from GitHub.
   * @param dest - folder to clone into, relative to the Quartz repo root
   *
   * @beta
   */

  const flags = []
  var out, validation = validatePluginURL(url)
  if (validation == 1) { 
    // TODO broken bc of submodule auth, figure out how to make work with both ssh and gh-auth
    out = spawnSync("git", ["submodule", "add", ...flags, url, dest], { stdio: "inherit" })
  }
  else if (validation == 2) {
    // Ex: "ocdkirby/remark42"

    // Use relative path to avoid an authentication req
    // Assumes that Quartz is hosted on GitHub too
    out = spawnSync("git", ["submodule", "add", ...flags, `../../${url}`, dest], { stdio: "inherit" })
  } else {
    throw new Error(chalk.red(`Error cloning repo: ${url} is not a valid link or shorthand`))
  }

  if (out.stderr) {
    throw new Error(chalk.red(`Error cloning repo: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(chalk.red("Error cloning repo"))
  }
}

export function gitPull(origin, branch) {
  const flags = ["--no-rebase", "--autostash", "-s", "recursive", "-X", "ours", "--no-edit"]
  const out = spawnSync("git", ["pull", ...flags, origin, branch], { stdio: "inherit" })
  if (out.stderr) {
    throw new Error(chalk.red(`Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(chalk.red("Error while pulling updates"))
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
