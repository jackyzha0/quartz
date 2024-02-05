import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import { pluginConfigurations } from "./plugin-store"
import communityPlugins from "../quartz.plugins"
import config from "../quartz.config"
import { Argv, BuildCtx } from "./util/ctx"
import { FilePath, FullSlug } from "./util/path"
import { createFileParser, createProcessor } from "./processors/parse"
import { options } from "./util/sourcemap"

// only called from worker thread
export async function parseFiles(argv: Argv, fps: FilePath[], allSlugs: FullSlug[]) {
  const ctx: BuildCtx = (() => {
    // OCDkirby: pull community plugin configs in from `quartz.plugins.ts`
    let community = pluginConfigurations(communityPlugins)

    let merged: BuildCtx = {
      cfg: {
        configuration: config.configuration,
        plugins: {
          transformers: config.plugins.transformers.concat(community.transformers),
          filters: config.plugins.filters.concat(community.filters),
          emitters: config.plugins.emitters.concat(community.emitters),
        },
      },
      argv: argv,
      allSlugs: allSlugs,
    }

    console.log(merged)
    return merged
  })()
  const processor = createProcessor(ctx)
  const parse = createFileParser(ctx, fps)
  return parse(processor)
}
