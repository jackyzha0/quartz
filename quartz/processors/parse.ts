import esbuild from 'esbuild'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { Processor, unified } from "unified"
import { Root as MDRoot } from 'remark-parse/lib'
import { Root as HTMLRoot } from 'hast'
import { ProcessedContent } from '../plugins/vfile'
import { PerfTimer } from '../perf'
import { read } from 'to-vfile'
import { slugify } from '../path'
import path from 'path'
import os from 'os'
import workerpool, { Promise as WorkerPromise } from 'workerpool'
import { QuartzTransformerPlugin } from '../plugins/types'

export type QuartzProcessor = Processor<MDRoot, HTMLRoot, void>
export function createProcessor(transformers: QuartzTransformerPlugin[]): any {
  // base Markdown -> MD AST
  let processor = unified().use(remarkParse)

  // MD AST -> MD AST transforms
  for (const plugin of transformers) {
    processor = processor.use(plugin.markdownPlugins())
  }

  // MD AST -> HTML AST
  processor = processor.use(remarkRehype, { allowDangerousHtml: true })


  // HTML AST -> HTML AST transforms
  for (const plugin of transformers) {
    processor = processor.use(plugin.htmlPlugins())
  }

  return processor
}

function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

async function transpileWorkerScript(verbose: boolean) {
  // transpile worker script
  const cacheFile = "./.quartz-cache/transpiled-worker.mjs"
  const fp = "./quartz/worker.ts"
  if (verbose) {
    console.log("Transpiling worker script")
  }

  await esbuild.build({
    entryPoints: [fp],
    outfile: path.join("quartz", cacheFile),
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

export async function parseMarkdown(transformers: QuartzTransformerPlugin[], baseDir: string, fps: string[], verbose: boolean): Promise<ProcessedContent[]> {
  const perf = new PerfTimer()

  const CHUNK_SIZE = 128
  let concurrency = fps.length < CHUNK_SIZE ? 1 : os.availableParallelism()
  const res: ProcessedContent[] = []
  if (concurrency === 1) {
    // single-thread
    const processor = createProcessor(transformers)
    for (const fp of fps) {
      const file = await read(fp)

      // base data properties that plugins may use
      file.data.slug = slugify(path.relative(baseDir, file.path))
      file.data.filePath = fp

      const ast = processor.parse(file)
      res.push([await processor.run(ast, file), file])

      if (verbose) {
        console.log(`[process] ${fp} -> ${file.data.slug}`)
      }
    }
  } else {
    await transpileWorkerScript(verbose)
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
      childPromises.push(pool.exec('parseFiles', [baseDir, chunk, verbose]))
    }
    const results: ProcessedContent[][] = await WorkerPromise.all(childPromises)
    res.push(...results.flat())
    await pool.terminate()
  }

  console.log(`Parsed and transformed ${res.length} Markdown files with ${concurrency} cores in ${perf.timeSince()}`)
  return res
}
