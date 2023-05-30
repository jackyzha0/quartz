import { QuartzFilterPlugin } from "../types"
import { ProcessedContent } from "../vfile"

export class ExplicitPublish extends QuartzFilterPlugin {
  name = "ExplicitPublish"
  shouldPublish([_tree, vfile]: ProcessedContent): boolean {
    const publishFlag: boolean = vfile.data?.frontmatter?.publish ?? false
    return publishFlag
  }
}
