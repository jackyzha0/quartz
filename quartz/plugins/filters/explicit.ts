import { QuartzFilterPlugin } from "../types"

export const ExplicitPublish: QuartzFilterPlugin = () => ({
  name: "ExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
    const publishProperty = vfile.data?.frontmatter?.publish ?? false
    const publishFlag =
      typeof publishProperty === "string"
        ? publishProperty.toLowerCase() === "true"
        : Boolean(publishProperty)
    return publishFlag
  },
})
