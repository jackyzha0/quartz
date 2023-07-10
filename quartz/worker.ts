import config from "../quartz.config"
import { createFileParser, createProcessor } from "./processors/parse"

const transformers = config.plugins.transformers
const processor = createProcessor(transformers)

// only called from worker thread
export async function parseFiles(baseDir: string, fps: string[], allSlugs: string[], verbose: boolean) {
  const parse = createFileParser(transformers, baseDir, fps, allSlugs, verbose)
  return parse(processor)
}
