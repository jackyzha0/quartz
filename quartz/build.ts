import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import path from "path"
import fs from "fs"
import { PerfTimer } from "./util/perf"
import { rm, readdir } from "fs/promises"
import { GlobbyFilterFunction, isGitIgnored } from "globby"
import { styleText } from "util"
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz"
import { FilePath, joinSegments, slugifyFilePath } from "./util/path"
import { detectSlugCollisions, formatCollisionWarning } from "./util/slugCollisions"
import chokidar from "chokidar"
import { ProcessedContent } from "./plugins/vfile"
import { Argv, BuildCtx } from "./util/ctx"
import { glob, toPosixPath } from "./util/glob"
import { trace } from "./util/trace"
import { options } from "./util/sourcemap"
import { Mutex } from "async-mutex"
import { getStaticResourcesFromPlugins } from "./plugins"
import { randomIdNonSecure } from "./util/random"
import { ChangeEvent } from "./plugins/types"
import { minimatch } from "minimatch"
import { formatLayoutReport, getLayoutReport } from "./plugins/loader/layoutReport"
import { getBuiltinPlan } from "./plugins/loader/config-loader"
import { prepareContentIndex } from "./plugins/builtins/contentIndex"
import { printDiagnosticsSummary, warn } from "./util/diagnostics"
import { collectPermalinks } from "./util/permalinks"
import { readFrontmatterData } from "./plugins/builtins/frontmatter"
import { ChangeRecord, clearChangeRecord } from "./util/incremental"
import { diffContentFiles, pollingEnabled } from "./util/contentWatcher"

/**
 * Every page's address: permalinks (frontmatter `permalink`, read up front so links can resolve
 * to them) and the slugified paths of all files. A permalinked note's file path stays in
 * `allSlugs`: it becomes a redirect to the permalink.
 */
function updateSlugs(ctx: BuildCtx, allFiles: string[]): void {
  const frontmatter = ctx.cfg.configuration.frontmatter
  const enabled =
    frontmatter !== false && (typeof frontmatter !== "object" || frontmatter.enabled !== false)
  const options = typeof frontmatter === "object" ? frontmatter : {}
  ctx.permalinks = enabled
    ? collectPermalinks({
        files: allFiles.filter((fp) => fp.endsWith(".md")),
        permalinkOf: (fp) => {
          const source = fs.readFileSync(path.join(ctx.argv.directory, fp))
          if (!source.includes("permalink")) return undefined
          try {
            return readFrontmatterData(source, options).permalink
          } catch {
            return undefined // reported when the file is parsed
          }
        },
        warn: (message) => warn({ area: "permalinks", message }),
      })
    : {}
  const pathSlugs = allFiles.map((fp) => slugifyFilePath(fp as FilePath))
  ctx.allSlugs = [...new Set([...pathSlugs, ...Object.values(ctx.permalinks)])]
}

function reportSlugCollisions(content: ProcessedContent[]): void {
  const collisions = detectSlugCollisions(content)
  if (collisions.length === 0) return
  console.warn(styleText("yellow", formatCollisionWarning(collisions)))
}

type ContentMap = Map<
  FilePath,
  | {
      type: "markdown"
      content: ProcessedContent
    }
  | {
      type: "other"
    }
>

type BuildData = {
  ctx: BuildCtx
  ignored: GlobbyFilterFunction
  mut: Mutex
  contentMap: ContentMap
  changesSinceLastBuild: ChangeRecord
  lastBuildMs: number
}

async function buildQuartz(argv: Argv, mut: Mutex, clientRefresh: () => void) {
  const ctx: BuildCtx = {
    buildId: randomIdNonSecure(),
    argv,
    cfg,
    allSlugs: [],
    allFiles: [],
    incremental: false,
    virtualPages: [],
  }

  const perf = new PerfTimer()
  const output = argv.output

  const pluginCount = Object.values(cfg.plugins).flat().length
  const pluginNames = (key: "transformers" | "filters" | "emitters" | "pageTypes") =>
    (cfg.plugins[key] ?? []).map((plugin) => plugin.name)
  if (argv.verbose) {
    console.log(`Loaded ${pluginCount} plugins`)
    console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`)
    console.log(`  Filters: ${pluginNames("filters").join(", ")}`)
    console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`)
    console.log(`  PageTypes: ${pluginNames("pageTypes").join(", ")}`)
    const builtinPlan = getBuiltinPlan()
    if (builtinPlan) {
      console.log(`  Built-ins:`)
      for (const b of builtinPlan.builtins) {
        const state = b.enabled ? `on (order ${b.order})` : `off — ${b.note ?? "disabled"}`
        const from = b.absorbed?.enabled ? " · options from its former plugin entry" : ""
        console.log(`    configuration.${b.spec.configKey}: ${state}${b.enabled ? from : ""}`)
      }
    }
    const pageTypes = (cfg.plugins.pageTypes ?? []).map((pt) => {
      const { name, layout, frame } = pt as { name: string; layout?: unknown; frame?: unknown }
      return {
        name,
        layout: typeof layout === "string" ? layout : name,
        frame: typeof frame === "string" ? frame : undefined,
      }
    })
    console.log(formatLayoutReport(getLayoutReport(), pageTypes))
  }

  const release = await mut.acquire()
  perf.addEvent("clean")
  try {
    const entries = await readdir(output)
    await Promise.all(
      entries.map((e) => rm(path.join(output, e), { recursive: true, force: true })),
    )
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err
  }
  console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`)

  perf.addEvent("glob")
  const allFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
  const markdownPaths = allFiles.filter((fp) => fp.endsWith(".md")).sort()
  console.log(
    `Found ${markdownPaths.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = markdownPaths.map((fp) => joinSegments(argv.directory, fp) as FilePath)
  ctx.allFiles = allFiles
  updateSlugs(ctx, allFiles)

  const parsedFiles = await parseMarkdown(ctx, filePaths)
  reportSlugCollisions(parsedFiles)
  const filteredContent = filterContent(ctx, parsedFiles)

  await emitContent(ctx, filteredContent)
  console.log(
    styleText("green", `Done processing ${markdownPaths.length} files in ${perf.timeSince()}`),
  )
  // Repeat warnings from config loading (they scrolled away) and notes about the output.
  printDiagnosticsSummary({ verbose: argv.verbose })
  release()

  if (argv.watch) {
    ctx.incremental = true
    return startWatching(ctx, mut, parsedFiles, clientRefresh)
  }
}

// setup watcher for rebuilds
async function startWatching(
  ctx: BuildCtx,
  mut: Mutex,
  initialContent: ProcessedContent[],
  clientRefresh: () => void,
) {
  const { argv, allFiles } = ctx

  const contentMap: ContentMap = new Map()
  for (const filePath of allFiles) {
    contentMap.set(filePath, {
      type: "other",
    })
  }

  for (const content of initialContent) {
    const [_tree, vfile] = content
    const relPath = vfile.data.relativePath
    if (!relPath) {
      console.warn(`Skipping file with no relativePath: ${vfile.path}`)
      continue
    }
    contentMap.set(relPath, {
      type: "markdown",
      content,
    })
  }

  const gitIgnoredMatcher = await isGitIgnored()
  const buildData: BuildData = {
    ctx,
    mut,
    contentMap,
    ignored: (fp) => {
      const pathStr = toPosixPath(fp.toString())
      if (pathStr.startsWith(".git/")) return true
      if (gitIgnoredMatcher(pathStr)) return true
      for (const pattern of cfg.configuration.ignorePatterns) {
        if (minimatch(pathStr, pattern)) {
          return true
        }
      }

      return false
    },

    changesSinceLastBuild: {},
    lastBuildMs: 0,
  }

  const contentRoot = path.resolve(argv.directory)
  const usePerFilePolling = pollingEnabled(process.env.CHOKIDAR_USEPOLLING)
  const knownFiles = new Set(allFiles.map((fp) => toPosixPath(fp.toString()) as FilePath))
  const watcherTargets = usePerFilePolling
    ? Array.from(knownFiles, (fp) => path.resolve(contentRoot, fp))
    : ["."]
  const watcher = chokidar.watch(watcherTargets, {
    awaitWriteFinish: { stabilityThreshold: 250 },
    persistent: true,
    ...(usePerFilePolling ? {} : { cwd: argv.directory }),
    ignoreInitial: true,
  })

  const changes: ChangeEvent[] = []
  let rebuildTimeout: ReturnType<typeof setTimeout> | null = null
  const scheduleRebuild = () => {
    if (rebuildTimeout) clearTimeout(rebuildTimeout)
    rebuildTimeout = setTimeout(() => {
      rebuildTimeout = null
      rebuild(changes, clientRefresh, buildData).catch((err) => {
        console.error(styleText("red", "Rebuild failed:"), err.message ?? err)
      })
    }, 100)
  }

  const recordChange = (fp: string, type: ChangeEvent["type"]) => {
    const relativePath = toPosixPath(
      path.isAbsolute(fp) ? path.relative(contentRoot, fp) : fp,
    ) as FilePath
    if (relativePath.startsWith("../") || buildData.ignored(relativePath)) return

    if (type === "add") knownFiles.add(relativePath)
    if (type === "delete") knownFiles.delete(relativePath)
    changes.push({ path: relativePath, type })
    scheduleRebuild()
  }

  watcher
    .on("add", (fp) => {
      recordChange(fp, "add")
    })
    .on("change", (fp) => {
      recordChange(fp, "change")
    })
    .on("unlink", (fp) => {
      recordChange(fp, "delete")
    })

  let discoveryTimer: ReturnType<typeof setInterval> | undefined
  if (usePerFilePolling) {
    if (watcherTargets.length > 0) {
      await new Promise<void>((resolve, reject) => {
        watcher.once("ready", resolve)
        watcher.once("error", reject)
      })
    }

    const configuredInterval = Number.parseInt(process.env.CHOKIDAR_INTERVAL ?? "", 10)
    const discoveryInterval = Math.max(
      Number.isFinite(configuredInterval) && configuredInterval > 0 ? configuredInterval : 100,
      1000,
    )
    let scanInProgress = false
    const reconcileFileList = async () => {
      if (scanInProgress) return
      scanInProgress = true
      try {
        const scannedFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
        const currentFiles = new Set(scannedFiles)
        const { added, deleted } = diffContentFiles(knownFiles, currentFiles)

        for (const fp of added) {
          watcher.add(path.resolve(contentRoot, fp))
          recordChange(fp, "add")
        }

        for (const fp of deleted) {
          await watcher.unwatch(path.resolve(contentRoot, fp))
          recordChange(fp, "delete")
        }
      } finally {
        scanInProgress = false
      }
    }

    discoveryTimer = setInterval(() => {
      reconcileFileList().catch((err) => {
        console.error(styleText("red", "Content scan failed:"), err.message ?? err)
      })
    }, discoveryInterval)
    console.log(
      `Watching ${knownFiles.size} content files in \`${contentRoot}\` using polling (ready)`,
    )
  }

  return async () => {
    if (discoveryTimer) clearInterval(discoveryTimer)
    await watcher.close()
  }
}

async function rebuild(changes: ChangeEvent[], clientRefresh: () => void, buildData: BuildData) {
  const { ctx, contentMap, mut, changesSinceLastBuild } = buildData
  const { argv, cfg } = ctx

  const buildId = randomIdNonSecure()
  ctx.buildId = buildId
  buildData.lastBuildMs = new Date().getTime()
  const numChangesInBuild = changes.length
  const release = await mut.acquire()
  try {
    // if there's another build after us, release and let them do it
    if (ctx.buildId !== buildId) {
      return
    }

    const perf = new PerfTimer()
    perf.addEvent("rebuild")
    console.log(styleText("yellow", "Detected change, rebuilding..."))

    // update changesSinceLastBuild
    for (const change of changes) {
      changesSinceLastBuild[change.path] = change.type
    }

    const staticResources = getStaticResourcesFromPlugins(ctx)
    const pathsToParse: FilePath[] = []
    for (const [fp, type] of Object.entries(changesSinceLastBuild)) {
      if (type === "delete" || path.extname(fp) !== ".md") continue
      const fullPath = joinSegments(argv.directory, toPosixPath(fp)) as FilePath
      pathsToParse.push(fullPath)
    }

    const parsed = await parseMarkdown(ctx, pathsToParse)
    for (const content of parsed) {
      const relPath = content[1].data.relativePath
      if (!relPath) {
        console.warn(`Skipping file with no relativePath: ${content[1].path}`)
        continue
      }
      contentMap.set(relPath, {
        type: "markdown",
        content,
      })
    }

    // update state using changesSinceLastBuild
    // we do this weird play of add => compute change events => remove
    // so that partialEmitters can do appropriate cleanup based on the content of deleted files
    for (const [file, change] of Object.entries(changesSinceLastBuild)) {
      if (change === "delete") {
        // universal delete case
        contentMap.delete(file as FilePath)
      }

      // manually track non-markdown files as processed files only
      // contains markdown files
      if (change === "add" && path.extname(file) !== ".md") {
        contentMap.set(file as FilePath, {
          type: "other",
        })
      }
    }

    const changeEvents: ChangeEvent[] = Object.entries(changesSinceLastBuild).map(([fp, type]) => {
      const path = fp as FilePath
      const processedContent = contentMap.get(path)
      if (processedContent?.type === "markdown") {
        const [_tree, file] = processedContent.content
        return {
          type,
          path,
          file,
        }
      }

      return {
        type,
        path,
      }
    })

    // update allFiles and then allSlugs with the consistent view of content map
    ctx.allFiles = Array.from(contentMap.keys())
    updateSlugs(ctx, ctx.allFiles)

    const markdownContent = Array.from(contentMap.values())
      .filter((file) => file.type === "markdown")
      .map((file) => file.content)
    reportSlugCollisions(markdownContent)
    let processedFiles = filterContent(ctx, markdownContent)

    let emittedFiles = 0

    // Phase 1: Run PageTypeDispatcher first so it populates ctx.virtualPages
    const dispatcher = cfg.plugins.emitters.find((e) => e.name === "PageTypeDispatcher")
    if (dispatcher) {
      ctx.virtualPages = []
      const emitFn = dispatcher.partialEmit ?? dispatcher.emit
      const emitted = await emitFn(ctx, processedFiles, staticResources, changeEvents)
      if (emitted !== null) {
        if (Symbol.asyncIterator in emitted) {
          for await (const file of emitted) {
            emittedFiles++
            if (ctx.argv.verbose) {
              console.log(`[emit:${dispatcher.name}] ${file}`)
            }
          }
        } else {
          emittedFiles += emitted.length
          if (ctx.argv.verbose) {
            for (const file of emitted) {
              console.log(`[emit:${dispatcher.name}] ${file}`)
            }
          }
        }
      }
    }

    // Phase 2: Run all other emitters with content extended by virtual pages
    const contentWithVirtual =
      ctx.virtualPages.length > 0 ? [...processedFiles, ...ctx.virtualPages] : processedFiles
    prepareContentIndex(ctx, contentWithVirtual)
    for (const emitter of cfg.plugins.emitters) {
      if (emitter.name === "PageTypeDispatcher") continue
      // Try to use partialEmit if available, otherwise assume the output is static
      const emitFn = emitter.partialEmit ?? emitter.emit
      const emitted = await emitFn(ctx, contentWithVirtual, staticResources, changeEvents)
      if (emitted === null) {
        continue
      }

      if (Symbol.asyncIterator in emitted) {
        // Async generator case
        for await (const file of emitted) {
          emittedFiles++
          if (ctx.argv.verbose) {
            console.log(`[emit:${emitter.name}] ${file}`)
          }
        }
      } else {
        // Array case
        emittedFiles += emitted.length
        if (ctx.argv.verbose) {
          for (const file of emitted) {
            console.log(`[emit:${emitter.name}] ${file}`)
          }
        }
      }
    }

    console.log(
      `Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince("rebuild")}`,
    )
    console.log(styleText("green", `Done rebuilding in ${perf.timeSince()}`))
    clearChangeRecord(changesSinceLastBuild)
    changes.splice(0, numChangesInBuild)
    clientRefresh()
  } finally {
    release()
  }
}

export default async (argv: Argv, mut: Mutex, clientRefresh: () => void) => {
  try {
    return await buildQuartz(argv, mut, clientRefresh)
  } catch (err) {
    trace("\nExiting Quartz due to a fatal error", err as Error)
  }
}
