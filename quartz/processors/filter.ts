import { PerfTimer } from "../perf"
import { QuartzFilterPlugin } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"

export function filterContent(plugins: QuartzFilterPlugin[], content: ProcessedContent[], verbose: boolean): ProcessedContent[] {
  const perf = new PerfTimer()
  const initialLength = content.length
  for (const plugin of plugins) {
    content = content.filter(plugin.shouldPublish)
  }

  if (verbose) {
    console.log(`Filtered out ${initialLength - content.length} files in ${perf.timeSince()}`)
  }
  return content
}
