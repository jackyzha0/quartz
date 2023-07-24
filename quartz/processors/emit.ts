import path from "path"
import fs from "fs"
import { PerfTimer } from "../perf"
import { getStaticResourcesFromPlugins } from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"
import { FilePath } from "../path"
import { QuartzLogger } from "../log"
import { trace } from "../trace"
import { BuildCtx } from "../ctx"

export async function emitContent(ctx: BuildCtx, content: ProcessedContent[]) {
  const { argv, cfg } = ctx
  const perf = new PerfTimer()
  const log = new QuartzLogger(ctx.argv.verbose)

  log.start(`Emitting output files`)
  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = path.join(argv.output, slug + ext) as FilePath
    const dir = path.dirname(pathToPage)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(pathToPage, content)
    return pathToPage
  }

  let emittedFiles = 0
  const staticResources = getStaticResourcesFromPlugins(ctx)
  for (const emitter of cfg.plugins.emitters) {
    try {
      const emitted = await emitter.emit(ctx, content, staticResources, emit)
      emittedFiles += emitted.length

      if (ctx.argv.verbose) {
        for (const file of emitted) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
    } catch (err) {
      trace(`Failed to emit from plugin \`${emitter.name}\``, err as Error)
      throw err
    }
  }

  log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)
}
