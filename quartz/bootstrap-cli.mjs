#!/usr/bin/env -S node --no-deprecation
import { readFileSync } from "node:fs"
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"))
const minMajor = Number(pkg.engines.node.match(/\d+/)[0])
const [major] = process.versions.node.split(".").map(Number)
if (major < minMajor) {
  console.error(
    `\nQuartz requires Node.js >= ${minMajor}, but you are running Node.js ${process.version}.\n` +
      `Please upgrade: https://nodejs.org/\n`,
  )
  process.exit(1)
}
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import {
  handleBuild,
  handleCreate,
  handleUpgrade,
  handleRestore,
  handleSync,
} from "./cli/handlers.js"

import {
  handlePluginInstallUnified,
  handlePluginAdd,
  handlePluginRemove,
  handlePluginList,
  handlePluginStatus,
  handlePluginEnable,
  handlePluginDisable,
  handlePluginConfig,
  handlePluginPrune,
} from "./cli/plugin-git-handlers.js"
import { CommonArgv, BuildArgv, CreateArgv, SyncArgv } from "./cli/args.js"
import { version } from "./cli/constants.js"

async function launchTui() {
  const { join } = await import("path")
  const { existsSync } = await import("fs")
  const { spawn } = await import("child_process")
  const tuiPath = join(process.cwd(), ".quartz", "plugins", "tui", "dist", "App.mjs")

  if (!existsSync(tuiPath)) {
    console.error(
      "TUI plugin not installed. Install with:\n" +
        "  npx quartz plugin add @quartz-community/tui\n",
    )
    process.exit(1)
  }

  // OpenTUI requires Bun runtime (uses bun:ffi for Zig renderer)
  return new Promise((resolve, reject) => {
    const child = spawn("bun", ["run", tuiPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    })

    child.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error(
          "Error: Bun runtime not found. The TUI requires Bun to run.\n" +
            "Install Bun: https://bun.sh/docs/installation",
        )
      }
      reject(err)
    })

    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`TUI exited with code ${code}`))
      }
    })
  })
}

yargs(hideBin(process.argv))
  .scriptName("quartz")
  .version(version)
  .usage("$0 <cmd> [args]")
  .command("create", "Initialize Quartz", CreateArgv, async (argv) => {
    await handleCreate(argv)
  })
  .command(
    ["upgrade", "update"],
    "Upgrade Quartz to the latest version",
    CommonArgv,
    async (argv) => {
      await handleUpgrade(argv)
    },
  )
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
  .command("tui", "Launch interactive plugin manager", CommonArgv, async () => {
    await launchTui()
  })
  .command(
    "plugin [subcommand]",
    "Manage Quartz plugins",
    (yargs) => {
      return (
        yargs
          .command(
            "install [names..]",
            "Install plugins from lockfile or config",
            {
              ...CommonArgv,
              "from-config": {
                boolean: true,
                default: false,
                describe: "install plugins referenced in quartz.config.yaml instead of lockfile",
              },
              latest: {
                boolean: true,
                default: false,
                describe: "fetch latest version from remote instead of pinned lockfile commit",
              },
              clean: {
                boolean: true,
                default: false,
                describe: "skip plugins whose directory already exists",
              },
              "dry-run": {
                boolean: true,
                default: false,
                describe: "show what would happen without making changes",
              },
            },
            async (argv) => {
              await handlePluginInstallUnified({
                names: argv.names?.length ? argv.names : undefined,
                fromConfig: argv.fromConfig,
                latest: argv.latest,
                clean: argv.clean,
                dryRun: argv.dryRun,
                concurrency: argv.concurrency,
              })
            },
          )
          .command(
            "add <repos..>",
            "Add plugins from Git repositories",
            {
              ...CommonArgv,
              name: {
                string: true,
                alias: ["as"],
                describe: "Override the plugin name (for resolving conflicts with duplicate names)",
              },
              subdir: {
                string: true,
                describe: "Subdirectory within the repository containing the plugin",
              },
            },
            async (argv) => {
              await handlePluginAdd(argv.repos, {
                name: argv.name,
                subdir: argv.subdir,
                concurrency: argv.concurrency,
              })
            },
          )
          .command("remove <names..>", "Remove installed plugins", CommonArgv, async (argv) => {
            await handlePluginRemove(argv.names)
          })
          .command("list", "List all installed plugins", CommonArgv, async () => {
            await handlePluginList()
          })
          .command(
            "enable <names..>",
            "Enable plugins in quartz.config.yaml",
            CommonArgv,
            async (argv) => {
              await handlePluginEnable(argv.names)
            },
          )
          .command(
            "disable <names..>",
            "Disable plugins in quartz.config.yaml",
            CommonArgv,
            async (argv) => {
              await handlePluginDisable(argv.names)
            },
          )
          .command(
            "config <name>",
            "View or set plugin configuration",
            {
              ...CommonArgv,
              set: {
                string: true,
                describe: "Set a config value (key=value)",
              },
            },
            async (argv) => {
              await handlePluginConfig(argv.name, { set: argv.set })
            },
          )
          .command(
            "prune",
            "Remove installed plugins no longer referenced in config",
            {
              ...CommonArgv,
              "dry-run": {
                boolean: true,
                default: false,
                describe: "show what would be pruned without making changes",
              },
            },
            async (argv) => {
              await handlePluginPrune({ dryRun: argv.dryRun })
            },
          )
          // Hidden deprecated aliases
          .command("restore", false, CommonArgv, async (argv) => {
            console.log(
              "\x1b[33m⚠ 'plugin restore' is deprecated. Use 'plugin install --clean' instead.\x1b[0m",
            )
            await handlePluginInstallUnified({ clean: true, concurrency: argv.concurrency })
          })
          .command("update [names..]", false, CommonArgv, async (argv) => {
            console.log(
              "\x1b[33m⚠ 'plugin update' is deprecated. Use 'plugin install --latest' instead.\x1b[0m",
            )
            await handlePluginInstallUnified({
              names: argv.names?.length ? argv.names : undefined,
              latest: true,
              concurrency: argv.concurrency,
            })
          })
          .command("check", false, CommonArgv, async (argv) => {
            console.log(
              "\x1b[33m⚠ 'plugin check' is deprecated. Use 'plugin install --latest --dry-run' instead.\x1b[0m",
            )
            await handlePluginInstallUnified({
              latest: true,
              dryRun: true,
              concurrency: argv.concurrency,
            })
          })
          .command(
            "resolve",
            false,
            {
              ...CommonArgv,
              "dry-run": {
                boolean: true,
                default: false,
                describe: "show what would be resolved without making changes",
              },
            },
            async (argv) => {
              console.log(
                "\x1b[33m⚠ 'plugin resolve' is deprecated. Use 'plugin install --from-config' instead.\x1b[0m",
              )
              await handlePluginInstallUnified({
                fromConfig: true,
                dryRun: argv.dryRun,
                concurrency: argv.concurrency,
              })
            },
          )
          .demandCommand(0, "")
      )
    },
    async (argv) => {
      if (!argv._.includes("plugin") || argv._.length > 1) return
      await handlePluginStatus()
    },
  )
  .showHelpOnFail(true)
  .help()
  .strict()
  .demandCommand().argv
