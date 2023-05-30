import { QuartzFilterPlugin } from "../types"
import { ProcessedContent } from "../vfile"

export class RemoveDrafts extends QuartzFilterPlugin {
  name = "RemoveDrafts"
  shouldPublish([_tree, vfile]: ProcessedContent): boolean {
    const draftFlag: boolean = vfile.data?.frontmatter?.draft ?? false
    return !draftFlag
  }
}
