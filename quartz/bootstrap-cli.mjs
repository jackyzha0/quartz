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

const ORIGIN_NAME = "origin"
const UPSTREAM_NAME = "upstream"
const QUARTZ_SOURCE_BRANCH = "v4"
const cwd = process.cwd()
const cacheDir = path.join(cwd, ".quartz-cache")
const cacheFile = "./.quartz-cache/transpiled-build.mjs"
const fp = "./quartz/build.ts"
const { version } = JSON.parse(readFileSync("./package.json").toString())
const contentCacheFolder = path.join(cacheDir, "content-cache")

const CommonArgv = {
  directory: {
    string: true,
    alias: ["d"],
    default: "content",
    describe: "directory to look for content files",
  },
  verbose: {
    boolean: true,
    alias: ["v"],
    default: false,
    describe: "print out extra logging information",
  },
}

const SyncArgv = {
  ...CommonArgv,
  commit: {
    boolean: true,
    default: true,
    describe: "create a git commit for your unsaved changes",
  },
  push: {
    boolean: true,
    default: true,
    describe: "push updates to your Quartz fork",
  },
  pull: {
    boolean: true,
    default: true,
    describe: "pull updates from your Quartz fork",
  },
}

const BuildArgv = {
  ...CommonArgv,
  output: {
    string: true,
    alias: ["o"],
    default: "public",
    describe: "output folder for files",
  },
  serve: {
    boolean: true,
    default: false,
    describe: "run a local server to live-preview your Quartz",
  },
  baseDir: {
    string: true,
    default: "",
    describe: "base path to serve your local server on",
  },
  port: {
    number: true,
    default: 8080,
    describe: "port to serve Quartz on",
  },
  bundleInfo: {
    boolean: true,
    default: false,
    describe: "show detailed bundle information",
  },
  concurrency: {
    number: true,
    describe: "how many threads to use to parse notes",
  },
}

function escapePath(fp) {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^".*"$/, "$1")
    .replace(/^'.*"$/, "$1")
    .trim()
}

function exitIfCancel(val) {
  if (isCancel(val)) {
    outro(chalk.red("Exiting"))
    process.exit(0)
  } else {
    return val
  }
}

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
  .command("create", "Initialize Quartz", CommonArgv, async (argv) => {
    console.log()
    intro(chalk.bgGreen.black(` Quartz v${version} `))
    const contentFolder = path.join(cwd, argv.directory)
    const setupStrategy = exitIfCancel(
      await select({
        message: `Choose how to initialize the content in \`${contentFolder}\``,
        options: [
          { value: "new", label: "Empty Quartz" },
          { value: "copy", label: "Copy an existing folder", hint: "overwrites `content`" },
          {
            value: "symlink",
            label: "Symlink an existing folder",
            hint: "don't select this unless you know what you are doing!",
          },
          { value: "keep", label: "Keep the existing files" },
        ],
      }),
    )

    async function rmContentFolder() {
      const contentStat = await fs.promises.lstat(contentFolder)
      if (contentStat.isSymbolicLink()) {
        await fs.promises.unlink(contentFolder)
      } else {
        await rimraf(contentFolder)
      }
    }

    if (setupStrategy === "copy" || setupStrategy === "symlink") {
      const originalFolder = escapePath(
        exitIfCancel(
          await text({
            message: "Enter the full path to existing content folder",
            placeholder:
              "On most terminal emulators, you can drag and drop a folder into the window and it will paste the full path",
            validate(fp) {
              const fullPath = escapePath(fp)
              if (!fs.existsSync(fullPath)) {
                return "The given path doesn't exist"
              } else if (!fs.lstatSync(fullPath).isDirectory()) {
                return "The given path is not a folder"
              }
            },
          }),
        ),
      )

      await rmContentFolder()
      if (setupStrategy === "copy") {
        await fs.promises.cp(originalFolder, contentFolder, {
          recursive: true,
          preserveTimestamps: true,
        })
      } else if (setupStrategy === "symlink") {
        await fs.promises.symlink(originalFolder, contentFolder, "dir")
      }
    } else if (setupStrategy === "new") {
      await rmContentFolder()
      await fs.promises.mkdir(contentFolder)
      await fs.promises.writeFile(
        path.join(contentFolder, "index.md"),
        `---
title: Welcome to Quartz
---

This is a blank Quartz installation.
See the [documentation](https://quartz.jzhao.xyz) for how to get started.
`,
      )
    }

    // get a prefered link resolution strategy
    const linkResolutionStrategy = exitIfCancel(
      await select({
        message: `Choose how Quartz should resolve links in your content. You can change this later in \`quartz.config.ts\`.`,
        options: [
          {
            value: "absolute",
            label: "Treat links as absolute path",
            hint: "for content made for Quartz 3 and Hugo",
          },
          {
            value: "shortest",
            label: "Treat links as shortest path",
            hint: "for most Obsidian vaults",
          },
          {
            value: "relative",
            label: "Treat links as relative paths",
            hint: "for just normal Markdown files",
          },
        ],
      }),
    )

    // now, do config changes
    const configFilePath = path.join(cwd, "quartz.config.ts")
    let configContent = await fs.promises.readFile(configFilePath, { encoding: "utf-8" })
    configContent = configContent.replace(
      /markdownLinkResolution: '(.+)'/,
      `markdownLinkResolution: '${linkResolutionStrategy}'`,
    )
    await fs.promises.writeFile(configFilePath, configContent)

    outro(`You're all set! Not sure what to do next? Try:
   • Customizing Quartz a bit more by editing \`quartz.config.ts\`
   • Running \`npx quartz build --serve\` to preview your Quartz locally
   • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
`)
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
    console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
    const ctx = await esbuild.context({
      entryPoints: [fp],
      outfile: path.join("quartz", cacheFile),
      bundle: true,
      keepNames: true,
      minifyWhitespace: true,
      minifySyntax: true,
      platform: "node",
      format: "esm",
      jsx: "automatic",
      jsxImportSource: "preact",
      packages: "external",
      metafile: true,
      sourcemap: true,
      sourcesContent: false,
      plugins: [
        sassPlugin({
          type: "css-text",
          cssImports: true,
        }),
        {
          name: "inline-script-loader",
          setup(build) {
            build.onLoad({ filter: /\.inline\.(ts|js)$/ }, async (args) => {
              let text = await promises.readFile(args.path, "utf8")

              // remove default exports that we manually inserted
              text = text.replace("export default", "")
              text = text.replace("export", "")

              const sourcefile = path.relative(path.resolve("."), args.path)
              const resolveDir = path.dirname(sourcefile)
              const transpiled = await esbuild.build({
                stdin: {
                  contents: text,
                  loader: "ts",
                  resolveDir,
                  sourcefile,
                },
                write: false,
                bundle: true,
                platform: "browser",
                format: "esm",
              })
              const rawMod = transpiled.outputFiles[0].text
              return {
                contents: rawMod,
                loader: "text",
              }
            })
          },
        },
      ],
    })

    const buildMutex = new Mutex()
    const timeoutIds = new Set()
    let firstBuild = true
    const build = async (clientRefresh) => {
      const release = await buildMutex.acquire()
      if (firstBuild) {
        firstBuild = false
      } else {
        console.log(chalk.yellow("Detected a source code change, doing a hard rebuild..."))
      }

      const result = await ctx.rebuild().catch((err) => {
        console.error(`${chalk.red("Couldn't parse Quartz configuration:")} ${fp}`)
        console.log(`Reason: ${chalk.grey(err)}`)
        process.exit(1)
      })

      if (argv.bundleInfo) {
        const outputFileName = "quartz/.quartz-cache/transpiled-build.mjs"
        const meta = result.metafile.outputs[outputFileName]
        console.log(
          `Successfully transpiled ${Object.keys(meta.inputs).length} files (${prettyBytes(
            meta.bytes,
          )})`,
        )
        console.log(await esbuild.analyzeMetafile(result.metafile, { color: true }))
      }

      // bypass module cache
      // https://github.com/nodejs/modules/issues/307
      const { default: buildQuartz } = await import(cacheFile + `?update=${randomUUID()}`)
      await buildQuartz(argv, clientRefresh)
      clientRefresh()
      release()
    }

    const rebuild = (clientRefresh) => {
      timeoutIds.forEach((id) => clearTimeout(id))
      timeoutIds.clear()
      timeoutIds.add(setTimeout(() => build(clientRefresh), 250))
    }

    if (argv.serve) {
      const connections = []
      const clientRefresh = () => connections.forEach((conn) => conn.send("rebuild"))

      if (argv.baseDir !== "" && !argv.baseDir.startsWith("/")) {
        argv.baseDir = "/" + argv.baseDir
      }

      await build(clientRefresh)
      const server = http.createServer(async (req, res) => {
        if (argv.baseDir && !req.url?.startsWith(argv.baseDir)) {
          console.log(
            chalk.red(
              `[404] ${req.url} (warning: link outside of site, this is likely a Quartz bug)`,
            ),
          )
          res.writeHead(404)
          res.end()
          return
        }

        // strip baseDir prefix
        req.url = req.url?.slice(argv.baseDir.length)

        const serve = async () => {
          await serveHandler(req, res, {
            public: argv.output,
            directoryListing: false,
            headers: [
              {
                source: "**/*.html",
                headers: [{ key: "Content-Disposition", value: "inline" }],
              },
            ],
          })
          const status = res.statusCode
          const statusString =
            status >= 200 && status < 300 ? chalk.green(`[${status}]`) : chalk.red(`[${status}]`)
          console.log(statusString + chalk.grey(` ${argv.baseDir}${req.url}`))
        }

        const redirect = (newFp) => {
          newFp = argv.baseDir + newFp
          res.writeHead(302, {
            Location: newFp,
          })
          console.log(chalk.yellow("[302]") + chalk.grey(` ${argv.baseDir}${req.url} -> ${newFp}`))
          res.end()
        }

        let fp = req.url?.split("?")[0] ?? "/"

        // handle redirects
        if (fp.endsWith("/")) {
          // /trailing/
          // does /trailing/index.html exist? if so, serve it
          const indexFp = path.posix.join(fp, "index.html")
          if (fs.existsSync(path.posix.join(argv.output, indexFp))) {
            req.url = fp
            return serve()
          }

          // does /trailing.html exist? if so, redirect to /trailing
          let base = fp.slice(0, -1)
          if (path.extname(base) === "") {
            base += ".html"
          }
          if (fs.existsSync(path.posix.join(argv.output, base))) {
            return redirect(fp.slice(0, -1))
          }
        } else {
          // /regular
          // does /regular.html exist? if so, serve it
          let base = fp
          if (path.extname(base) === "") {
            base += ".html"
          }
          if (fs.existsSync(path.posix.join(argv.output, base))) {
            req.url = fp
            return serve()
          }

          // does /regular/index.html exist? if so, redirect to /regular/
          let indexFp = path.posix.join(fp, "index.html")
          if (fs.existsSync(path.posix.join(argv.output, indexFp))) {
            return redirect(fp + "/")
          }
        }

        return serve()
      })
      server.listen(argv.port)
      const wss = new WebSocketServer({ port: 3001 })
      wss.on("connection", (ws) => connections.push(ws))
      console.log(
        chalk.cyan(
          `Started a Quartz server listening at http://localhost:${argv.port}${argv.baseDir}`,
        ),
      )
      console.log("hint: exit with ctrl+c")
      chokidar
        .watch(["**/*.ts", "**/*.tsx", "**/*.scss", "package.json"], {
          ignoreInitial: true,
        })
        .on("all", async () => {
          rebuild(clientRefresh)
        })
    } else {
      await build(() => {})
      ctx.dispose()
    }
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv
