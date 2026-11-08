import { BuildCtx } from "../util/ctx"
import { PerfTimer } from "../util/perf"
import { ProcessedContent } from "../plugins/vfile"
import { attributeError, originOf } from "../util/pluginErrors"
import { recordFiltered } from "../util/diagnostics"
import { trace } from "../util/trace"

export function filterContent(ctx: BuildCtx, content: ProcessedContent[]): ProcessedContent[] {
  const { cfg, argv } = ctx
  const perf = new PerfTimer()
  const initialLength = content.length
  for (const plugin of cfg.plugins.filters) {
    const updatedContent = content.filter((item) => {
      try {
        return plugin.shouldPublish(ctx, item)
      } catch (err) {
        const file = item[1].data.relativePath ?? item[1].data.slug
        trace(
          `Failed to filter \`${file}\``,
          attributeError(err, { origin: originOf(plugin), stage: "filter", file }) as Error,
        )
        return false
      }
    })
    for (const item of content) {
      if (!updatedContent.includes(item) && item[1].data.slug) {
        recordFiltered(item[1].data.slug, plugin.name)
      }
    }

    if (argv.verbose) {
      const diff = content.filter((x) => !updatedContent.includes(x))
      for (const file of diff) {
        console.log(`[filter:${plugin.name}] ${file[1].data.slug}`)
      }
    }

    content = updatedContent
  }

  console.log(`Filtered out ${initialLength - content.length} files in ${perf.timeSince()}`)
  return content
}
