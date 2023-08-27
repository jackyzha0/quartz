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
import { handleBuild, handleCreate, handleUpdate, handleRestore, handleSync } from "./handlers.js"
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
    await handleCreate(argv)
  })
  .command("update", "Get the latest Quartz updates", CommonArgv, async (argv) => {
    await handleUpdate(argv)
  })
  .command(
    "restore",
    "Try to restore your content folder from the cache",
    CommonArgv,
    async (argv) => {
      await handleRestore(argv)
    },
  )
  .command("sync", "Sync your Quartz to and from GitHub.", SyncArgv, async (argv) => {
    await handleSync(argv)
  })
  .command("build", "Build Quartz into a bundle of static HTML files", BuildArgv, async (argv) => {
    await handleBuild(argv)
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv
