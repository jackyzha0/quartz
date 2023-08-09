import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import cfg from "../quartz.config"
import { Argv, BuildCtx } from "./ctx"
import { FilePath, ServerSlug } from "./path"
import { createFileParser, createProcessor } from "./processors/parse"
import { options } from "./sourcemap"

// only called from worker thread
export async function parseFiles(argv: Argv, fps: FilePath[], allSlugs: ServerSlug[]) {
  const ctx: BuildCtx = {
    cfg,
    argv,
    allSlugs,
  }
  const processor = createProcessor(ctx)
  const parse = createFileParser(ctx, fps)
  return parse(processor)
}
