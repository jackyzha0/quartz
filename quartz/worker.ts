import config from "../quartz.config"
import { FilePath, ServerSlug } from "./path"
import { createFileParser, createProcessor } from "./processors/parse"

const transformers = config.plugins.transformers
const processor = createProcessor(transformers)

// only called from worker thread
export async function parseFiles(baseDir: string, fps: FilePath[], allSlugs: ServerSlug[], verbose: boolean) {
  const parse = createFileParser(transformers, baseDir, fps, allSlugs, verbose)
  return parse(processor)
}
