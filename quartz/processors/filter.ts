import { BuildCtx } from "../util/ctx"
import { PerfTimer } from "../util/perf"
import { ProcessedContent } from "../plugins/vfile"
import { QuartzFilterPluginInstance } from "../plugins/types"
import { attributeError, originOf } from "../util/pluginErrors"
import { recordFiltered } from "../util/diagnostics"
import { trace } from "../util/trace"

/** Whether `plugin` publishes `item`; a filter that throws reports the error and rejects it. */
function publishes(
  ctx: BuildCtx,
  plugin: QuartzFilterPluginInstance,
  item: ProcessedContent,
): boolean {
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
}

/**
 * Run the site's filters on one page (e.g. a virtual page that stands for a `.base` or `.canvas`
 * file). Returns the name of the first filter that rejects it, or `undefined` when it is
 * published. A rejection is recorded like one from `filterContent`.
 */
export function rejectingFilter(ctx: BuildCtx, item: ProcessedContent): string | undefined {
  for (const plugin of ctx.cfg.plugins?.filters ?? []) {
    if (publishes(ctx, plugin, item)) continue
    const slug = item[1].data.slug
    if (slug) recordFiltered(slug, plugin.name)
    if (ctx.argv?.verbose) console.log(`[filter:${plugin.name}] ${slug}`)
    return plugin.name
  }
  return undefined
}

export function filterContent(ctx: BuildCtx, content: ProcessedContent[]): ProcessedContent[] {
  const { cfg, argv } = ctx
  const perf = new PerfTimer()
  const initialLength = content.length
  for (const plugin of cfg.plugins.filters) {
    const updatedContent = content.filter((item) => publishes(ctx, plugin, item))
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
