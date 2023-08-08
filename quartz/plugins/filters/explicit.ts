import { QuartzFilterPlugin } from "../types"

export const ExplicitPublish: QuartzFilterPlugin = () => ({
  name: "ExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
    const publishFlag: boolean = vfile.data?.frontmatter?.publish ?? false
    return publishFlag
  },
})
