import { promises } from "fs"
import path from "path"
import esbuild from "esbuild"
import { styleText } from "util"
import { sassPlugin } from "esbuild-sass-plugin"
import fs from "fs"
import { intro, outro, select, text } from "@clack/prompts"
import { rm } from "fs/promises"
import chokidar from "chokidar"
import prettyBytes from "pretty-bytes"
import { execSync, spawnSync } from "child_process"
import { pathToFileURL } from "url"
import http from "http"
import serveHandler from "serve-handler"
import { WebSocketServer } from "ws"
import { randomUUID } from "crypto"
import { Mutex } from "async-mutex"
import { CreateArgv } from "./args.js"
import { describeQuartzCheckout } from "./compat.js"
import { git } from "./subprocess.js"
import { globby } from "globby"
import {
  exitIfCancel,
  escapePath,
  gitPull,
  popContentFolder,
  stashContentFolder,
  symlinkOrCopy,
} from "./helpers.js"
import {
  handlePluginRestore,
  handlePluginCheck,
  handlePluginResolve,
} from "./plugin-git-handlers.js"
import {
  configExists,
  createConfigFromDefault,
  createConfigFromTemplate,
  readPluginsJson,
  writePluginsJson,
  updateGlobalConfig,
  LOCKFILE_PATH,
} from "./plugin-data.js"
import {
  UPSTREAM_NAME,
  QUARTZ_SOURCE_BRANCH,
  QUARTZ_SOURCE_REPO,
  ORIGIN_NAME,
  version,
  fp,
  cacheFile,
  cwd,
} from "./constants.js"

/**
 * Resolve content directory path
 * @param contentPath path to resolve
 */
function resolveContentPath(contentPath) {
  if (path.isAbsolute(contentPath)) return path.relative(cwd, contentPath)
  return path.join(cwd, contentPath)
}

/**
 * Handles `npx quartz create`
 * @param {*} argv arguments for `create`
 */
export async function handleCreate(argv) {
  console.log()
  intro(styleText(["bgGreen", "black"], ` Quartz v${version} `))
  const contentFolder = resolveContentPath(argv.directory)
  let setupStrategy = argv.strategy?.toLowerCase()
  let linkResolutionStrategy = argv.links?.toLowerCase()
  const sourceDirectory = argv.source
  let template = argv.template?.toLowerCase()
  let baseUrl = argv.baseUrl

  // If all cmd arguments were provided, check if they're valid
  if (setupStrategy && linkResolutionStrategy) {
    // If setup isn't, "new", source argument is required
    if (setupStrategy !== "new") {
      // Error handling
      if (!sourceDirectory) {
        outro(
          styleText(
            "red",
            `Setup strategies (arg '${styleText(
              "yellow",
              `-${CreateArgv.strategy.alias[0]}`,
            )}') other than '${styleText(
              "yellow",
              "new",
            )}' require content folder argument ('${styleText(
              "yellow",
              `-${CreateArgv.source.alias[0]}`,
            )}') to be set`,
          ),
        )
        process.exit(1)
      } else {
        if (!fs.existsSync(sourceDirectory)) {
          outro(
            styleText(
              "red",
              `Input directory to copy/symlink 'content' from not found ('${styleText(
                "yellow",
                sourceDirectory,
              )}', invalid argument "${styleText("yellow", `-${CreateArgv.source.alias[0]}`)})`,
            ),
          )
          process.exit(1)
        } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
          outro(
            styleText(
              "red",
              `Source directory to copy/symlink 'content' from is not a directory (found file at '${styleText(
                "yellow",
                sourceDirectory,
              )}', invalid argument ${styleText("yellow", `-${CreateArgv.source.alias[0]}`)}")`,
            ),
          )
          process.exit(1)
        }
      }
    }
  }

  // Template selection
  if (!template) {
    template = exitIfCancel(
      await select({
        message: "Choose a template for your Quartz configuration",
        options: [
          { value: "default", label: "Default", hint: "clean Quartz setup with sensible defaults" },
          {
            value: "obsidian",
            label: "Obsidian",
            hint: "optimized for Obsidian vaults with full OFM support",
          },
          {
            value: "ttrpg",
            label: "TTRPG",
            hint: "Obsidian + map plugin + ITS Theme for D&D/TTRPG wikis",
          },
          {
            value: "blog",
            label: "Blog",
            hint: "recent notes and comments enabled for blogging",
          },
          {
            value: "docs",
            label: "Documentation",
            hint: "sidebars scroll with the page, for long navigation and tables of contents",
          },
        ],
      }),
    )
  }
  // Use cli process if cmd args werent provided
  if (!setupStrategy) {
    setupStrategy = exitIfCancel(
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
        ],
      }),
    )
  }

  async function rmContentFolder() {
    const contentStat = await fs.promises.lstat(contentFolder)
    if (contentStat.isSymbolicLink()) {
      await fs.promises.unlink(contentFolder)
    } else {
      await rm(contentFolder, { recursive: true, force: true })
    }
  }

  const gitkeepPath = path.join(contentFolder, ".gitkeep")
  if (fs.existsSync(gitkeepPath)) {
    await fs.promises.unlink(gitkeepPath)
  }
  if (setupStrategy === "copy" || setupStrategy === "symlink") {
    let originalFolder = sourceDirectory

    // If input directory was not passed, use cli
    if (!sourceDirectory) {
      originalFolder = escapePath(
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
    }

    await rmContentFolder()
    if (setupStrategy === "copy") {
      await fs.promises.cp(originalFolder, contentFolder, {
        recursive: true,
        preserveTimestamps: true,
      })
    } else if (setupStrategy === "symlink") {
      await symlinkOrCopy(originalFolder, contentFolder)
    }
  } else if (setupStrategy === "new") {
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

  // Obsidian and TTRPG templates auto-set link resolution to "shortest"
  const skipLinkPrompt = template === "obsidian" || template === "ttrpg"
  if (skipLinkPrompt) {
    linkResolutionStrategy = "shortest"
  }

  // Use cli process if cmd args werent provided
  if (!linkResolutionStrategy) {
    // get a preferred link resolution strategy
    linkResolutionStrategy = exitIfCancel(
      await select({
        message: `Choose how Quartz should resolve links in your content. This should match Obsidian's link format. You can change this later in \`quartz.config.yaml\`.`,
        options: [
          {
            value: "shortest",
            label: "Treat links as shortest path",
            hint: "(default)",
          },
          {
            value: "absolute",
            label: "Treat links as absolute path",
          },
          {
            value: "relative",
            label: "Treat links as relative paths",
          },
        ],
      }),
    )
  }

  // Base URL prompt
  if (!baseUrl) {
    baseUrl = exitIfCancel(
      await text({
        message: "Enter the base URL for your Quartz site (e.g. mysite.github.io/quartz)",
        placeholder: "mysite.github.io",
        validate(value) {
          if (!value || value.trim().length === 0) {
            return "Base URL cannot be empty"
          }
        },
      }),
    )
  }

  // Strip protocol prefix if user included it
  baseUrl = baseUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "")

  if (template && template !== "default") {
    createConfigFromTemplate(template)
    console.log(styleText("green", `Created quartz.config.yaml from '${template}' template`))
  } else {
    createConfigFromTemplate("default")
    console.log(styleText("green", "Created quartz.config.yaml from defaults"))
  }

  // Link resolution is built into Quartz (configuration.links)
  const json = readPluginsJson()
  if (json) {
    const links =
      json.configuration?.links && typeof json.configuration.links === "object"
        ? json.configuration.links
        : {}
    json.configuration = {
      ...json.configuration,
      links: { ...links, markdownLinkResolution: linkResolutionStrategy },
    }
    writePluginsJson(json)
  }

  // Update baseUrl in configuration
  updateGlobalConfig({ baseUrl })

  // install plugins referenced in the template config
  await handlePluginResolve()

  // setup remote
  ensureUpstreamRemote()

  outro(`You're all set! Not sure what to do next? Try:
  • Customizing Quartz a bit more by editing \`quartz.config.yaml\`
  • Running \`npx quartz build --serve\` to preview your Quartz locally
  • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
`)
}

/**
 * Handles `npx quartz build`
 * @param {*} argv arguments for `build`
 */
export async function handleBuild(argv) {
  if (argv.concurrency !== undefined && argv.concurrency < 1) {
    console.error("Concurrency must be at least 1")
    process.exit(1)
  }

  if (argv.serve) {
    argv.watch = true
  }

  // " Quartz v5.1.0 " for a release checkout, plus `git describe` (e.g. v5.1.0-3-g1a2b3c4-dirty) otherwise
  const checkout = describeQuartzCheckout()
  const describe = checkout.describe && checkout.describe !== `v${version}` ? checkout.describe : ""
  console.log(
    `\n${styleText(["bgGreen", "black"], ` Quartz v${version} `)} ${describe ? styleText("gray", describe) : ""}\n`,
  )
  const ctx = await esbuild.context({
    entryPoints: [fp],
    outfile: cacheFile,
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
    logOverride: {
      "direct-eval": "silent",
      "equals-negative-zero": "silent",
      "duplicate-object-key": "silent",
    },
    plugins: [
      sassPlugin({
        type: "css-text",
        cssImports: true,
      }),
      sassPlugin({
        filter: /\.inline\.scss$/,
        type: "css",
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
              minify: true,
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
  let lastBuildMs = 0
  let cleanupBuild = null
  const build = async (clientRefresh) => {
    const buildStart = new Date().getTime()
    lastBuildMs = buildStart
    const release = await buildMutex.acquire()
    if (lastBuildMs > buildStart) {
      release()
      return
    }

    if (cleanupBuild) {
      console.log(styleText("yellow", "Detected a source code change, doing a hard rebuild..."))
      await cleanupBuild()
    }

    const result = await ctx.rebuild().catch((err) => {
      console.error(
        `${styleText("red", "Failed to build Quartz.")} Check for syntax errors in your configuration or plugins.`,
      )
      console.log(`Reason: ${styleText("gray", err.message ?? String(err))}`)
      // stop esbuild's child process first: it shares our stderr and outlives us otherwise
      void esbuild.stop()
      process.exit(1)
    })
    release()

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
    const { default: buildQuartz } = await import(`../../${cacheFile}?update=${randomUUID()}`)
    // ^ this import is relative, so base "cacheFile" path can't be used

    cleanupBuild = await buildQuartz(argv, buildMutex, clientRefresh)
    clientRefresh()
  }

  let clientRefresh = () => {}
  if (argv.serve) {
    const connections = []
    clientRefresh = () => connections.forEach((conn) => conn.send("rebuild"))

    if (argv.baseDir !== "" && !argv.baseDir.startsWith("/")) {
      argv.baseDir = "/" + argv.baseDir
    }

    await build(clientRefresh)
    const server = http.createServer(async (req, res) => {
      if (argv.baseDir && !req.url?.startsWith(argv.baseDir)) {
        console.log(
          styleText(
            "red",
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
        const release = await buildMutex.acquire()
        await serveHandler(req, res, {
          public: argv.output,
          directoryListing: false,
          headers: [
            {
              source: "**/*.*",
              headers: [{ key: "Content-Disposition", value: "inline" }],
            },
            {
              source: "**/*.webp",
              headers: [{ key: "Content-Type", value: "image/webp" }],
            },
            // fixes bug where avif images are displayed as text instead of images (future proof)
            {
              source: "**/*.avif",
              headers: [{ key: "Content-Type", value: "image/avif" }],
            },
          ],
        })
        const status = res.statusCode
        const statusString =
          status >= 200 && status < 300
            ? styleText("green", `[${status}]`)
            : styleText("red", `[${status}]`)
        console.log(statusString + styleText("gray", ` ${argv.baseDir}${req.url}`))
        release()
      }

      const redirect = (newFp) => {
        newFp = argv.baseDir + newFp
        res.writeHead(302, {
          Location: newFp,
        })
        console.log(
          styleText("yellow", "[302]") +
            styleText("gray", ` ${argv.baseDir}${req.url} -> ${newFp}`),
        )
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

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${argv.port} is already in use. Try a different port with --port <number>`,
        )
        process.exit(1)
      }
      throw err
    })
    server.listen(argv.port)
    const wss = new WebSocketServer({ port: argv.wsPort })
    wss.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `WebSocket port ${argv.wsPort} is already in use. Try a different port with --wsPort <number>`,
        )
        process.exit(1)
      }
      throw err
    })
    wss.on("connection", (ws) => connections.push(ws))
    console.log(
      styleText(
        "cyan",
        `Started a Quartz server listening at http://localhost:${argv.port}${argv.baseDir}`,
      ),
    )
  } else {
    await build(clientRefresh)
    ctx.dispose()
  }

  if (argv.watch) {
    const paths = await globby([
      "**/*.ts",
      "quartz/cli/*.js",
      "quartz/static/**/*",
      "**/*.tsx",
      "**/*.scss",
      "package.json",
      "quartz.config.yaml",
      "quartz.config.default.yaml",
    ])
    chokidar
      .watch(paths, { ignoreInitial: true })
      .on("add", () => build(clientRefresh))
      .on("change", () => build(clientRefresh))
      .on("unlink", () => build(clientRefresh))

    console.log(styleText("gray", "hint: exit with ctrl+c"))
  }
}

/** Add the `upstream` remote (the official Quartz repository) unless it exists. */
function ensureUpstreamRemote() {
  try {
    git(["remote", "get-url", UPSTREAM_NAME])
  } catch {
    git(["remote", "add", UPSTREAM_NAME, QUARTZ_SOURCE_REPO])
  }
}

/**
 * Handles `npx quartz upgrade`
 * Upgrades the Quartz framework itself by pulling latest changes from upstream.
 * @param {*} argv arguments for `upgrade`
 */
export async function handleUpgrade(argv) {
  const contentFolder = resolveContentPath(argv.directory)
  console.log(`\n${styleText(["bgGreen", "black"], ` Quartz v${version} `)} \n`)
  const fromCommit = describeQuartzCheckout().commit
  console.log("Backing up your content")
  ensureUpstreamRemote()
  await stashContentFolder(contentFolder)

  const lockfileBackup = LOCKFILE_PATH + ".bak"
  const hasLockfile = fs.existsSync(LOCKFILE_PATH)
  if (hasLockfile) {
    fs.copyFileSync(LOCKFILE_PATH, lockfileBackup)
  }

  console.log(
    "Pulling updates... you may need to resolve some `git` conflicts if you've made changes to components or plugins.",
  )

  let pullOk = false
  try {
    gitPull(UPSTREAM_NAME, QUARTZ_SOURCE_BRANCH)
    pullOk = true
  } catch {
    if (hasLockfile) {
      try {
        fs.copyFileSync(lockfileBackup, LOCKFILE_PATH)
        git(["add", "--", LOCKFILE_PATH])
        const remaining = execSync("git diff --name-only --diff-filter=U", {
          encoding: "utf-8",
        }).trim()
        if (remaining.length === 0) {
          execSync("git commit --no-edit")
          pullOk = true
          console.log(styleText("cyan", "Resolved quartz.lock.json merge conflict automatically."))
        }
      } catch {
        // Could not auto-resolve, fall through to manual resolution
      }
    }

    if (!pullOk) {
      console.log(
        styleText("red", "An error occurred while pulling updates.") +
          "\nCheck your network connection and git credentials. If you see merge conflicts, resolve them manually and run `npx quartz sync --no-pull`.",
      )
      await popContentFolder(contentFolder)
      if (fs.existsSync(lockfileBackup)) fs.unlinkSync(lockfileBackup)
      return
    }
  }

  if (hasLockfile && fs.existsSync(lockfileBackup)) {
    fs.copyFileSync(lockfileBackup, LOCKFILE_PATH)
    fs.unlinkSync(lockfileBackup)
  }

  await popContentFolder(contentFolder)

  console.log("Ensuring dependencies are up to date")

  /*
  On Windows, if the command `npm` is really `npm.cmd', this call fails
  as it will be unable to find `npm`. This is often the case on systems
  where `npm` is installed via a package manager.

  This means `npx quartz upgrade` will not actually update dependencies
  on Windows, without a manual `npm i` from the caller.

  However, by spawning a shell, we are able to call `npm.cmd`.
  See: https://nodejs.org/api/child_process.html#spawning-bat-and-cmd-files-on-windows
  */

  const opts = { stdio: "inherit" }
  if (process.platform === "win32") {
    opts.shell = true
  }

  const res = spawnSync("npm", ["i"], opts)
  if (res.status === 0) {
    console.log(styleText("green", "Dependencies updated!"))
  } else {
    console.log(
      styleText("red", "An error occurred while installing dependencies.") +
        "\nTry running `npm install` manually to see detailed errors.",
    )
  }

  // Finish with the *new* code (release notes, plugin restore, doctor) — see cli/upgrade.js.
  // This process is still running the Quartz that was checked out before the pull.
  const finishScript = path.resolve("quartz/cli/upgrade.js")
  if (fs.existsSync(finishScript)) {
    const script =
      `import(${JSON.stringify(pathToFileURL(finishScript).href)})` +
      `.then((m) => m.finishUpgrade(${JSON.stringify({ fromVersion: version, fromCommit })}))` +
      `.catch((err) => { console.error(err); process.exitCode = 1 })`
    const res = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
      stdio: "inherit",
      timeout: 15 * 60 * 1000,
    })
    if (res.status !== 0) {
      console.log(
        styleText("yellow", "Some checks reported problems (see above).") +
          " Run `npx quartz plugin doctor` after fixing them.",
      )
      process.exitCode = 1
      return
    }
  } else {
    // Upgraded to a Quartz without cli/upgrade.js (e.g. a downgrade): use this version's steps.
    const newVersion = JSON.parse(fs.readFileSync("./package.json").toString()).version
    console.log(styleText("cyan", `Quartz v${version} → v${newVersion}`))
    console.log("Restoring plugins from lockfile...")
    await handlePluginRestore()
    console.log("Checking plugin compatibility...")
    await handlePluginCheck()
  }

  console.log(styleText("green", "Done!"))
}

/**
 * Handles `npx quartz restore`
 * @param {*} argv arguments for `restore`
 */
export async function handleRestore(argv) {
  const contentFolder = resolveContentPath(argv.directory)
  await popContentFolder(contentFolder)
}

/**
 * Handles `npx quartz sync`
 * @param {*} argv arguments for `sync`
 */
export async function handleSync(argv) {
  const contentFolder = resolveContentPath(argv.directory)
  console.log(`\n${styleText(["bgGreen", "black"], ` Quartz v${version} `)}\n`)
  console.log("Backing up your content")

  if (argv.commit) {
    const contentStat = await fs.promises.lstat(contentFolder)
    if (contentStat.isSymbolicLink()) {
      const linkTarg = await fs.promises.readlink(contentFolder)
      console.log(styleText("yellow", "Detected symlink, trying to dereference before committing"))

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
    const commitMessage = argv.message ?? `Quartz sync: ${currentTimestamp}`
    spawnSync("git", ["add", "."], { stdio: "inherit" })
    spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" })

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
    try {
      gitPull(ORIGIN_NAME, QUARTZ_SOURCE_BRANCH)
    } catch {
      console.log(
        styleText("red", "An error occurred while pulling updates from your repository.") +
          "\nCheck your network connection and git credentials.",
      )
      await popContentFolder(contentFolder)
      return
    }
  }

  await popContentFolder(contentFolder)
  if (argv.push) {
    console.log("Pushing your changes")
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
    const res = spawnSync("git", ["push", "-uf", ORIGIN_NAME, currentBranch], {
      stdio: "inherit",
    })
    if (res.status !== 0) {
      console.log(
        styleText("red", `An error occurred while pushing to remote ${ORIGIN_NAME}.`) +
          "\nCheck that you have push access to the remote repository.",
      )
      return
    }
  }

  console.log(styleText("green", "Done!"))
}
