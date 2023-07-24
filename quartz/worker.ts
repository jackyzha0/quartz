import cfg from "../quartz.config"
import { Argv, BuildCtx } from "./ctx"
import { FilePath, ServerSlug } from "./path"
import { createFileParser, createProcessor } from "./processors/parse"

const transformers = cfg.plugins.transformers
const processor = createProcessor(transformers)

// only called from worker thread
export async function parseFiles(argv: Argv, fps: FilePath[], allSlugs: ServerSlug[]) {
  const ctx: BuildCtx = {
    cfg,
    argv,
  }

  const parse = createFileParser(ctx, fps, allSlugs)
  return parse(processor)
}
