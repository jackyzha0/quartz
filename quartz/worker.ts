import { read } from "to-vfile"
import config from "../quartz.config"
import { createProcessor } from "./processors/parse"
import { slugify } from "./path"
import path from "path"
import { ProcessedContent } from "./plugins/vfile"

const transformers = config.plugins.transformers
const processor = createProcessor(transformers)

// only called from worker thread
export async function parseFiles(baseDir: string, fps: string[], verbose: boolean) {
  const res: ProcessedContent[] = []
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

  return res
}
