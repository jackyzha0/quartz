import esbuild from "esbuild"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { Processor, unified } from "unified"
import { Root as MDRoot } from "remark-parse/lib"
import { Root as HTMLRoot } from "hast"
import { ProcessedContent } from "../plugins/vfile"
import { PerfTimer } from "../perf"
import { read } from "to-vfile"
import { FilePath, QUARTZ, slugifyFilePath } from "../path"
import path from "path"
import os from "os"
import workerpool, { Promise as WorkerPromise } from "workerpool"
import { QuartzLogger } from "../log"
import { trace } from "../trace"
import { BuildCtx } from "../ctx"

export type QuartzProcessor = Processor<MDRoot, HTMLRoot, void>
export function createProcessor(ctx: BuildCtx): QuartzProcessor {
  const transformers = ctx.cfg.plugins.transformers

  // base Markdown -> MD AST
  let processor = unified().use(remarkParse)

  // MD AST -> MD AST transforms
  for (const plugin of transformers.filter((p) => p.markdownPlugins)) {
    processor = processor.use(plugin.markdownPlugins!(ctx))
  }

  // MD AST -> HTML AST
  processor = processor.use(remarkRehype, { allowDangerousHtml: true })

  // HTML AST -> HTML AST transforms
  for (const plugin of transformers.filter((p) => p.htmlPlugins)) {
    processor = processor.use(plugin.htmlPlugins!(ctx))
  }

  return processor
}

function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

async function transpileWorkerScript() {
  // transpile worker script
  const cacheFile = "./.quartz-cache/transpiled-worker.mjs"
  const fp = "./quartz/worker.ts"
  return esbuild.build({
    entryPoints: [fp],
    outfile: path.join(QUARTZ, cacheFile),
    bundle: true,
    keepNames: true,
    platform: "node",
    format: "esm",
    packages: "external",
    plugins: [
      {
        name: "css-and-scripts-as-text",
        setup(build) {
          build.onLoad({ filter: /\.scss$/ }, (_) => ({
            contents: "",
            loader: "text",
          }))
          build.onLoad({ filter: /\.inline\.(ts|js)$/ }, (_) => ({
            contents: "",
            loader: "text",
          }))
        },
      },
    ],
  })
}

export function createFileParser(ctx: BuildCtx, fps: FilePath[]) {
  const { argv, cfg } = ctx
  return async (processor: QuartzProcessor) => {
    const res: ProcessedContent[] = []
    for (const fp of fps) {
      try {
        const file = await read(fp)

        // strip leading and trailing whitespace
        file.value = file.value.toString().trim()

        // Text -> Text transforms
        for (const plugin of cfg.plugins.transformers.filter((p) => p.textTransform)) {
          file.value = plugin.textTransform!(ctx, file.value)
        }

        // base data properties that plugins may use
        file.data.slug = slugifyFilePath(path.relative(argv.directory, file.path) as FilePath)
        file.data.filePath = fp

        const ast = processor.parse(file)
        const newAst = await processor.run(ast, file)
        res.push([newAst, file])

        if (argv.verbose) {
          console.log(`[process] ${fp} -> ${file.data.slug}`)
        }
      } catch (err) {
        trace(`\nFailed to process \`${fp}\``, err as Error)
        throw err
      }
    }

    return res
  }
}

export async function parseMarkdown(ctx: BuildCtx, fps: FilePath[]): Promise<ProcessedContent[]> {
  const { argv } = ctx
  const perf = new PerfTimer()
  const log = new QuartzLogger(argv.verbose)

  const CHUNK_SIZE = 128
  let concurrency = fps.length < CHUNK_SIZE ? 1 : os.availableParallelism()

  let res: ProcessedContent[] = []
  log.start(`Parsing input files using ${concurrency} threads`)
  if (concurrency === 1) {
    try {
      const processor = createProcessor(ctx)
      const parse = createFileParser(ctx, fps)
      res = await parse(processor)
    } catch (error) {
      log.end()
      throw error
    }
  } else {
    await transpileWorkerScript()
    const pool = workerpool.pool("./quartz/bootstrap-worker.mjs", {
      minWorkers: "max",
      maxWorkers: concurrency,
      workerType: "thread",
    })

    const childPromises: WorkerPromise<ProcessedContent[]>[] = []
    for (const chunk of chunks(fps, CHUNK_SIZE)) {
      childPromises.push(pool.exec("parseFiles", [argv, chunk, ctx.allSlugs]))
    }

    const results: ProcessedContent[][] = await WorkerPromise.all(childPromises)
    res = results.flat()
    await pool.terminate()
  }

  log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`)
  return res
}
