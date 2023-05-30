import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { Processor, unified } from "unified"
import { Root as MDRoot } from 'remark-parse/lib'
import { Root as HTMLRoot } from 'hast'
import { ProcessedContent } from '../plugins/vfile'
import { PerfTimer } from '../perf'
import { read } from 'to-vfile'
import { pathToSlug } from '../path'
import path from 'path'
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

export async function parseMarkdown(processor: QuartzProcessor, baseDir: string, fps: string[], verbose: boolean): Promise<ProcessedContent[]> {
  const perf = new PerfTimer()
  const res: ProcessedContent[] = []
  for (const fp of fps) {
    const file = await read(fp)

    // base data properties that plugins may use
    file.data.slug = pathToSlug(path.relative(baseDir, file.path))
    file.data.filePath = fp

    const ast = processor.parse(file)
    res.push([await processor.run(ast, file), file])

    if (verbose) {
      console.log(`[process] ${fp} -> ${file.data.slug}`)
    }
  }

  if (verbose) {
    console.log(`Parsed and transformed ${res.length} Markdown files in ${perf.timeSince()}`)
  }

  return res
}
