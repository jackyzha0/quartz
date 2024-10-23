import { QuartzFilterPlugin } from "../types"

export const RemoveExcalidrawMarkdown: QuartzFilterPlugin = () => ({
  name: "RemoveExcalidrawMarkdown",
  shouldPublish(_ctx, [_tree, vfile]) {
    const publishFlag: boolean = !vfile.basename?.match(/\.excalidraw\./) || false
    return !publishFlag
  },
})
