import esbuild from 'esbuild'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { Processor, unified } from "unified"
import { Root as MDRoot } from 'remark-parse/lib'
import { Root as HTMLRoot } from 'hast'
import { ProcessedContent } from '../plugins/vfile'
import { PerfTimer } from '../perf'
import { read } from 'to-vfile'
import { FilePath, QUARTZ, ServerSlug, slugifyFilePath } from '../path'
import path from 'path'
import os from 'os'
import workerpool, { Promise as WorkerPromise } from 'workerpool'
import { QuartzTransformerPluginInstance } from '../plugins/types'
import { QuartzLogger } from '../log'
import { trace } from '../trace'

export type QuartzProcessor = Processor<MDRoot, HTMLRoot, void>
export function createProcessor(transformers: QuartzTransformerPluginInstance[]): QuartzProcessor {
  // base Markdown -> MD AST
  let processor = unified().use(remarkParse)

  // MD AST -> MD AST transforms
  for (const plugin of transformers.filter(p => p.markdownPlugins)) {
    processor = processor.use(plugin.markdownPlugins!())
  }

  // MD AST -> HTML AST
  processor = processor.use(remarkRehype, { allowDangerousHtml: true })


  // HTML AST -> HTML AST transforms
  for (const plugin of transformers.filter(p => p.htmlPlugins)) {
    processor = processor.use(plugin.htmlPlugins!())
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
        name: 'css-and-scripts-as-text',
        setup(build) {
          build.onLoad({ filter: /\.scss$/ }, (_) => ({
            contents: '',
            loader: 'text'
          }))
          build.onLoad({ filter: /\.inline\.(ts|js)$/ }, (_) => ({
            contents: '',
            loader: 'text'
          }))
        }
      }
    ]
  })
}

export function createFileParser(transformers: QuartzTransformerPluginInstance[], baseDir: string, fps: FilePath[], allSlugs: ServerSlug[], verbose: boolean) {
  return async (processor: QuartzProcessor) => {
    const res: ProcessedContent[] = []
    for (const fp of fps) {
      try {
        const file = await read(fp)

        // strip leading and trailing whitespace
        file.value = file.value.toString().trim()

        // Text -> Text transforms
        for (const plugin of transformers.filter(p => p.textTransform)) {
          file.value = plugin.textTransform!(file.value)
        }

        // base data properties that plugins may use
        file.data.slug = slugifyFilePath(path.relative(baseDir, file.path) as FilePath)
        file.data.allSlugs = allSlugs
        file.data.filePath = fp

        const ast = processor.parse(file)
        const newAst = await processor.run(ast, file)
        res.push([newAst, file])

        if (verbose) {
          console.log(`[process] ${fp} -> ${file.data.slug}`)
        }
      } catch (err) {
        trace(`\nFailed to process \`${fp}\``, err as Error)
        process.exit(1)
      }
    }

    return res
  }
}

export async function parseMarkdown(transformers: QuartzTransformerPluginInstance[], baseDir: string, fps: FilePath[], verbose: boolean): Promise<ProcessedContent[]> {
  const perf = new PerfTimer()
  const log = new QuartzLogger(verbose)

  const CHUNK_SIZE = 128
  let concurrency = fps.length < CHUNK_SIZE ? 1 : os.availableParallelism()

  // get all slugs ahead of time as each thread needs a copy
  const allSlugs = fps.map(fp => slugifyFilePath(path.relative(baseDir, path.resolve(fp)) as FilePath))

  let res: ProcessedContent[] = []
  log.start(`Parsing input files using ${concurrency} threads`)
  if (concurrency === 1) {
    const processor = createProcessor(transformers)
    const parse = createFileParser(transformers, baseDir, fps, allSlugs, verbose)
    res = await parse(processor)
  } else {
    await transpileWorkerScript()
    const pool = workerpool.pool(
      './quartz/bootstrap-worker.mjs',
      {
        minWorkers: 'max',
        maxWorkers: concurrency,
        workerType: 'thread'
      }
    )

    const childPromises: WorkerPromise<ProcessedContent[]>[] = []
    for (const chunk of chunks(fps, CHUNK_SIZE)) {
      childPromises.push(pool.exec('parseFiles', [baseDir, chunk, allSlugs, verbose]))
    }

    const results: ProcessedContent[][] = await WorkerPromise.all(childPromises)
    res = results.flat()
    await pool.terminate()
  }

  log.success(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`)
  return res
}
