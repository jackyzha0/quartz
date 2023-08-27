#!/usr/bin/env node
import { promises, readFileSync } from "fs"
import yargs from "yargs"
import path from "path"
import { hideBin } from "yargs/helpers"
import esbuild from "esbuild"
import chalk from "chalk"
import { sassPlugin } from "esbuild-sass-plugin"
import fs from "fs"
import { intro, isCancel, outro, select, text } from "@clack/prompts"
import { rimraf } from "rimraf"
import chokidar from "chokidar"
import prettyBytes from "pretty-bytes"
import { execSync, spawnSync } from "child_process"
import http from "http"
import serveHandler from "serve-handler"
import { WebSocketServer } from "ws"
import { randomUUID } from "crypto"
import { Mutex } from "async-mutex"
import { handleBuild } from "./handlers.js"
import { CommonArgv, BuildArgv, CreateArgv, SyncArgv } from "./args.js"

const ORIGIN_NAME = "origin"
const UPSTREAM_NAME = "upstream"
const QUARTZ_SOURCE_BRANCH = "v4"
const cwd = process.cwd()
const cacheDir = path.join(cwd, ".quartz-cache")
const cacheFile = "./.quartz-cache/transpiled-build.mjs"
const fp = "./quartz/build.ts"
const { version } = JSON.parse(readFileSync("./package.json").toString())
const contentCacheFolder = path.join(cacheDir, "content-cache")

async function stashContentFolder(contentFolder) {
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
  await fs.promises.cp(contentFolder, contentCacheFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
}

async function popContentFolder(contentFolder) {
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
  await fs.promises.cp(contentCacheFolder, contentFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
}

function gitPull(origin, branch) {
  const flags = ["--no-rebase", "--autostash", "-s", "recursive", "-X", "ours", "--no-edit"]
  const out = spawnSync("git", ["pull", ...flags, origin, branch], { stdio: "inherit" })
  if (out.stderr) {
    throw new Error(`Error while pulling updates: ${out.stderr}`)
  }
}

yargs(hideBin(process.argv))
  .scriptName("quartz")
  .version(version)
  .usage("$0 <cmd> [args]")
  .command("create", "Initialize Quartz", CreateArgv, async (argv) => {
    //
  })
  .command("update", "Get the latest Quartz updates", CommonArgv, async (argv) => {
    const contentFolder = path.join(cwd, argv.directory)
    console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
    console.log("Backing up your content")
    execSync(
      `git remote show upstream || git remote add upstream https://github.com/jackyzha0/quartz.git`,
    )
    await stashContentFolder(contentFolder)
    console.log(
      "Pulling updates... you may need to resolve some `git` conflicts if you've made changes to components or plugins.",
    )
    gitPull(UPSTREAM_NAME, QUARTZ_SOURCE_BRANCH)
    await popContentFolder(contentFolder)
    console.log("Ensuring dependencies are up to date")
    spawnSync("npm", ["i"], { stdio: "inherit" })
    console.log(chalk.green("Done!"))
  })
  .command(
    "restore",
    "Try to restore your content folder from the cache",
    CommonArgv,
    async (argv) => {
      const contentFolder = path.join(cwd, argv.directory)
      await popContentFolder(contentFolder)
    },
  )
  .command("sync", "Sync your Quartz to and from GitHub.", SyncArgv, async (argv) => {
    const contentFolder = path.join(cwd, argv.directory)
    console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
    console.log("Backing up your content")

    if (argv.commit) {
      const contentStat = await fs.promises.lstat(contentFolder)
      if (contentStat.isSymbolicLink()) {
        const linkTarg = await fs.promises.readlink(contentFolder)
        console.log(chalk.yellow("Detected symlink, trying to dereference before committing"))

        // stash symlink file
        await stashContentFolder(contentFolder)

        // follow symlink and copy content
        await fs.promises.cp(linkTarg, contentFolder, {
          recursive: true,
          preserveTimestamps: true,
        })
      }

      const currentTimestamp = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
      spawnSync("git", ["add", "."], { stdio: "inherit" })
      spawnSync("git", ["commit", "-m", `Quartz sync: ${currentTimestamp}`], { stdio: "inherit" })

      if (contentStat.isSymbolicLink()) {
        // put symlink back
        await popContentFolder(contentFolder)
      }
    }

    await stashContentFolder(contentFolder)

    if (argv.pull) {
      console.log(
        "Pulling updates from your repository. You may need to resolve some `git` conflicts if you've made changes to components or plugins.",
      )
      gitPull(ORIGIN_NAME, QUARTZ_SOURCE_BRANCH)
    }

    await popContentFolder(contentFolder)
    if (argv.push) {
      console.log("Pushing your changes")
      spawnSync("git", ["push", "-f", ORIGIN_NAME, QUARTZ_SOURCE_BRANCH], { stdio: "inherit" })
    }

    console.log(chalk.green("Done!"))
  })
  .command("build", "Build Quartz into a bundle of static HTML files", BuildArgv, async (argv) => {
    handleBuild(argv)
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv
