import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import path from "path"
import { PerfTimer } from "./util/perf"
import { rimraf } from "rimraf"
import { isGitIgnored } from "globby"
import chalk from "chalk"
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz.config"
import { FilePath, joinSegments, slugifyFilePath } from "./util/path"
import chokidar from "chokidar"
import { ProcessedContent } from "./plugins/vfile"
import { Argv, BuildCtx } from "./util/ctx"
import { glob, toPosixPath } from "./util/glob"
import { trace } from "./util/trace"
import { options } from "./util/sourcemap"
import { Mutex } from "async-mutex"

async function buildQuartz(argv: Argv, clientRefresh: () => void) {
  const ctx: BuildCtx = {
    argv,
    cfg,
    allSlugs: [],
  }

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
  const allFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
  const fps = allFiles.filter((fp) => fp.endsWith(".md"))
  console.log(
    `Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = fps.map((fp) => joinSegments(argv.directory, fp) as FilePath)
  ctx.allSlugs = allFiles.map((fp) => slugifyFilePath(fp as FilePath))

  const parsedFiles = await parseMarkdown(ctx, filePaths)
  const filteredContent = filterContent(ctx, parsedFiles)
  await emitContent(ctx, filteredContent)
  console.log(chalk.green(`Done processing ${fps.length} files in ${perf.timeSince()}`))

  if (argv.serve) {
    return startServing(ctx, parsedFiles, clientRefresh)
  }
}

// setup watcher for rebuilds
async function startServing(
  ctx: BuildCtx,
  initialContent: ProcessedContent[],
  clientRefresh: () => void,
) {
  const { argv } = ctx

  const ignored = await isGitIgnored()
  const contentMap = new Map<FilePath, ProcessedContent>()
  for (const content of initialContent) {
    const [_tree, vfile] = content
    contentMap.set(vfile.data.filePath!, content)
  }

  const initialSlugs = ctx.allSlugs
  const buildMutex = new Mutex()
  const timeoutIds: Set<ReturnType<typeof setTimeout>> = new Set()
  const toRebuild: Set<FilePath> = new Set()
  const toRemove: Set<FilePath> = new Set()
  const trackedAssets: Set<FilePath> = new Set()
  async function rebuild(fp: string, action: "add" | "change" | "delete") {
    // don't do anything for gitignored files
    if (ignored(fp)) {
      return
    }

    // dont bother rebuilding for non-content files, just track and refresh
    fp = toPosixPath(fp)
    const filePath = joinSegments(argv.directory, fp) as FilePath
    if (path.extname(fp) !== ".md") {
      if (action === "add" || action === "change") {
        trackedAssets.add(filePath)
      } else if (action === "delete") {
        trackedAssets.delete(filePath)
      }
      clientRefresh()
      return
    }

    if (action === "add" || action === "change") {
      toRebuild.add(filePath)
    } else if (action === "delete") {
      toRemove.add(filePath)
    }

    timeoutIds.forEach((id) => clearTimeout(id))

    // debounce rebuilds every 250ms
    timeoutIds.add(
      setTimeout(async () => {
        await buildMutex.acquire()
        const perf = new PerfTimer()
        console.log(chalk.yellow("Detected change, rebuilding..."))
        try {
          const filesToRebuild = [...toRebuild].filter((fp) => !toRemove.has(fp))

          const trackedSlugs = [...new Set([...contentMap.keys(), ...toRebuild, ...trackedAssets])]
            .filter((fp) => !toRemove.has(fp))
            .map((fp) => slugifyFilePath(path.posix.relative(argv.directory, fp) as FilePath))

          ctx.allSlugs = [...new Set([...initialSlugs, ...trackedSlugs])]
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

        clientRefresh()
        toRebuild.clear()
        toRemove.clear()
        buildMutex.release()
      }, 250),
    )
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
}

export default async (argv: Argv, clientRefresh: () => void) => {
  try {
    return await buildQuartz(argv, clientRefresh)
  } catch (err) {
    trace("\nExiting Quartz due to a fatal error", err as Error)
  }
}
