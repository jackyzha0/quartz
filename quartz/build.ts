import "source-map-support/register.js"
import path from "path"
import { PerfTimer } from "./perf"
import { rimraf } from "rimraf"
import { globby, isGitIgnored } from "globby"
import chalk from "chalk"
import http from "http"
import serveHandler from "serve-handler"
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz.config"
import { FilePath, slugifyFilePath } from "./path"
import chokidar from "chokidar"
import { ProcessedContent } from "./plugins/vfile"
import WebSocket, { WebSocketServer } from "ws"
import { Argv, BuildCtx } from "./ctx"

async function buildQuartz(argv: Argv, version: string) {
  const ctx: BuildCtx = {
    argv,
    cfg,
    allSlugs: [],
  }

  console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
  const perf = new PerfTimer()
  const output = argv.output

  const pluginCount = Object.values(cfg.plugins).flat().length
  const pluginNames = (key: "transformers" | "filters" | "emitters") =>
    cfg.plugins[key].map((plugin) => plugin.name)
  if (argv.verbose) {
    console.log(`Loaded ${pluginCount} plugins`)
    console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`)
    console.log(`  Filters: ${pluginNames("filters").join(", ")}`)
    console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`)
  }

  perf.addEvent("clean")
  await rimraf(output)
  console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`)

  perf.addEvent("glob")
  const fps = await globby("**/*.md", {
    cwd: argv.directory,
    ignore: cfg.configuration.ignorePatterns,
    gitignore: true,
  })
  console.log(
    `Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = fps.map((fp) => `${argv.directory}${path.sep}${fp}` as FilePath)
  ctx.allSlugs = fps.map((fp) => slugifyFilePath(fp as FilePath))

  const parsedFiles = await parseMarkdown(ctx, filePaths)
  const filteredContent = filterContent(ctx, parsedFiles)
  await emitContent(ctx, filteredContent)
  console.log(chalk.green(`Done processing ${fps.length} files in ${perf.timeSince()}`))

  if (argv.serve) {
    await startServing(ctx, parsedFiles)
  }
}

async function startServing(ctx: BuildCtx, initialContent: ProcessedContent[]) {
  const { argv } = ctx
  const wss = new WebSocketServer({ port: 3001 })
  const connections: WebSocket[] = []
  wss.on("connection", (ws) => connections.push(ws))

  const ignored = await isGitIgnored()
  const contentMap = new Map<FilePath, ProcessedContent>()
  for (const content of initialContent) {
    const [_tree, vfile] = content
    contentMap.set(vfile.data.filePath!, content)
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let toRebuild: Set<FilePath> = new Set()
  let toRemove: Set<FilePath> = new Set()
  async function rebuild(fp: string, action: "add" | "change" | "delete") {
    if (!ignored(fp)) {
      const filePath = `${argv.directory}${path.sep}${fp}` as FilePath
      if (action === "add" || action === "change") {
        toRebuild.add(filePath)
      } else if (action === "delete") {
        toRemove.add(filePath)
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(async () => {
        const perf = new PerfTimer()
        console.log(chalk.yellow("Detected change, rebuilding..."))
        try {
          const filesToRebuild = [...toRebuild].filter((fp) => !toRemove.has(fp))

          ctx.allSlugs = [...new Set([...contentMap.keys(), ...toRebuild])]
            .filter((fp) => !toRemove.has(fp))
            .map((fp) => slugifyFilePath(path.relative(argv.directory, fp) as FilePath))

          const parsedContent = await parseMarkdown(ctx, filesToRebuild)
          for (const content of parsedContent) {
            const [_tree, vfile] = content
            contentMap.set(vfile.data.filePath!, content)
          }

          for (const fp of toRemove) {
            contentMap.delete(fp)
          }

          await rimraf(argv.output)
          const parsedFiles = [...contentMap.values()]
          const filteredContent = filterContent(ctx, parsedFiles)
          await emitContent(ctx, filteredContent)
          console.log(chalk.green(`Done rebuilding in ${perf.timeSince()}`))
        } catch {
          console.log(chalk.yellow(`Rebuild failed. Waiting on a change to fix the error...`))
        }
        connections.forEach((conn) => conn.send("rebuild"))
        toRebuild.clear()
        toRemove.clear()
      }, 250)
    }
  }

  const watcher = chokidar.watch(".", {
    persistent: true,
    cwd: argv.directory,
    ignoreInitial: true,
  })

  watcher
    .on("add", (fp) => rebuild(fp, "add"))
    .on("change", (fp) => rebuild(fp, "change"))
    .on("unlink", (fp) => rebuild(fp, "delete"))

  const server = http.createServer(async (req, res) => {
    await serveHandler(req, res, {
      public: argv.output,
      directoryListing: false,
    })
    const status = res.statusCode
    const statusString =
      status >= 200 && status < 300
        ? chalk.green(`[${status}]`)
        : status >= 300 && status < 400
        ? chalk.yellow(`[${status}]`)
        : chalk.red(`[${status}]`)
    console.log(statusString + chalk.grey(` ${req.url}`))
  })
  server.listen(argv.port)
  console.log(chalk.cyan(`Started a Quartz server listening at http://localhost:${argv.port}`))
  console.log("hint: exit with ctrl+c")
}

export default async (argv: Argv, version: string) => {
  try {
    await buildQuartz(argv, version)
  } catch {
    console.log(chalk.red("\nExiting Quartz due to a fatal error"))
    process.exit(1)
  }
}
