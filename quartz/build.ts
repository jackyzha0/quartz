import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import path from "path"
import { PerfTimer } from "./util/perf"
import { rimraf } from "rimraf"
import { GlobbyFilterFunction, isGitIgnored } from "globby"
import chalk from "chalk"
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz.config"
import { FilePath, FullSlug, joinSegments, slugifyFilePath } from "./util/path"
import chokidar from "chokidar"
import { ProcessedContent } from "./plugins/vfile"
import { Argv, BuildCtx } from "./util/ctx"
import { glob, toPosixPath } from "./util/glob"
import { trace } from "./util/trace"
import { options } from "./util/sourcemap"
import { Mutex } from "async-mutex"

type BuildData = {
  ctx: BuildCtx
  ignored: GlobbyFilterFunction
  mut: Mutex
  initialSlugs: FullSlug[]
  // TODO merge contentMap and trackedAssets
  contentMap: Map<FilePath, ProcessedContent>
  trackedAssets: Set<FilePath>
  toRebuild: Set<FilePath>
  toRemove: Set<FilePath>
  lastBuildMs: number
}

async function buildQuartz(argv: Argv, mut: Mutex, clientRefresh: () => void) {
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

  const release = await mut.acquire()
  perf.addEvent("clean")
  await rimraf(output)
  console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`)

  perf.addEvent("glob")
  const allFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
  const fps = allFiles.filter((fp) => fp.endsWith(".md")).sort()
  console.log(
    `Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = fps.map((fp) => joinSegments(argv.directory, fp) as FilePath)
  ctx.allSlugs = allFiles.map((fp) => slugifyFilePath(fp as FilePath))

  const parsedFiles = await parseMarkdown(ctx, filePaths)
  const filteredContent = filterContent(ctx, parsedFiles)
  await emitContent(ctx, filteredContent)
  console.log(chalk.green(`Done processing ${fps.length} files in ${perf.timeSince()}`))
  release()

  if (argv.serve) {
    return startServing(ctx, mut, parsedFiles, clientRefresh)
  }
}

// setup watcher for rebuilds
async function startServing(
  ctx: BuildCtx,
  mut: Mutex,
  initialContent: ProcessedContent[],
  clientRefresh: () => void,
) {
  const { argv } = ctx

  const contentMap = new Map<FilePath, ProcessedContent>()
  for (const content of initialContent) {
    const [_tree, vfile] = content
    contentMap.set(vfile.data.filePath!, content)
  }

  const buildData: BuildData = {
    ctx,
    mut,
    contentMap,
    ignored: await isGitIgnored(),
    initialSlugs: ctx.allSlugs,
    toRebuild: new Set<FilePath>(),
    toRemove: new Set<FilePath>(),
    trackedAssets: new Set<FilePath>(),
    lastBuildMs: 0,
  }

  const watcher = chokidar.watch(".", {
    persistent: true,
    cwd: argv.directory,
    ignoreInitial: true,
  })

  watcher
    .on("add", (fp) => rebuildFromEntrypoint(fp, "add", clientRefresh, buildData))
    .on("change", (fp) => rebuildFromEntrypoint(fp, "change", clientRefresh, buildData))
    .on("unlink", (fp) => rebuildFromEntrypoint(fp, "delete", clientRefresh, buildData))

  return async () => {
    await watcher.close()
  }
}

async function rebuildFromEntrypoint(
  fp: string,
  action: "add" | "change" | "delete",
  clientRefresh: () => void,
  buildData: BuildData, // note: this function mutates buildData
) {
  const { ctx, ignored, mut, initialSlugs, contentMap, toRebuild, toRemove, trackedAssets } =
    buildData

  const { argv } = ctx

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

  const buildStart = new Date().getTime()
  buildData.lastBuildMs = buildStart
  const release = await mut.acquire()

  // there's another build after us, release and let them do it
  if (buildData.lastBuildMs > buildStart) {
    release()
    return
  }

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

    const parsedFiles = [...contentMap.values()]
    const filteredContent = filterContent(ctx, parsedFiles)

    // TODO: we can probably traverse the link graph to figure out what's safe to delete here
    // instead of just deleting everything
    await rimraf(argv.output)
    await emitContent(ctx, filteredContent)
    console.log(chalk.green(`Done rebuilding in ${perf.timeSince()}`))
  } catch (err) {
    console.log(chalk.yellow(`Rebuild failed. Waiting on a change to fix the error...`))
    if (argv.verbose) {
      console.log(chalk.red(err))
    }
  }

  release()
  clientRefresh()
  toRebuild.clear()
  toRemove.clear()
}

export default async (argv: Argv, mut: Mutex, clientRefresh: () => void) => {
  try {
    return await buildQuartz(argv, mut, clientRefresh)
  } catch (err) {
    trace("\nExiting Quartz due to a fatal error", err as Error)
  }
}
