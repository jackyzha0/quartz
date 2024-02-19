import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export interface Options {
  startOnly: boolean
}

const defaultOptions: Options = {
  startOnly: true,
}

function removeFirstH1({ startOnly }: Options) {
  return (tree: any) => {
    visit(tree, "heading", (node: any, index: number | undefined, parent: any) => {
      const hasFrontmatter = parent.children.some(
        (child: { type: string }) => child.type === "yaml",
      )
      const isFirstRelevantNode = index === (hasFrontmatter ? 1 : 0)

      if (startOnly && !isFirstRelevantNode) {
        return
      }

      if (node.depth === 1) {
        parent.children.splice(index!, 1)
        return
      }
    })
  }
}

export const RemoveFirstHeading: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "RemoveFirstHeading",
    markdownPlugins() {
      return [[removeFirstH1, { startOnly: opts.startOnly }]]
    },
  }
}
