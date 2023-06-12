import { PerfTimer } from "../perf"
import { QuartzFilterPluginInstance } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"

export function filterContent(plugins: QuartzFilterPluginInstance[], content: ProcessedContent[], verbose: boolean): ProcessedContent[] {
  const perf = new PerfTimer()
  const initialLength = content.length
  for (const plugin of plugins) {
    const updatedContent = content.filter(plugin.shouldPublish)

    if (verbose) {
      const diff = content.filter(x => !updatedContent.includes(x))
      for (const file of diff) {
        console.log(`[filter:${plugin.name}] ${file[1].data.slug}`)
      }
    }

    content = updatedContent
  }

  console.log(`Filtered out ${initialLength - content.length} files in ${perf.timeSince()}`)
  return content
}
