import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import rehypePrettyCode, { Options as CodeOptions } from "rehype-pretty-code"

export class SyntaxHighlighting extends QuartzTransformerPlugin {
  name = "SyntaxHighlighting"

  markdownPlugins(): PluggableList {
    return []
  }

  htmlPlugins(): PluggableList {
    return [[rehypePrettyCode, {
      theme: 'css-variables',
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }]
        }
      },
      onVisitHighlightedLine(node) {
        node.properties.className.push('highlighted')
      },
      onVisitHighlightedWord(node) {
        node.properties.className = ['word']
      },
    } satisfies Partial<CodeOptions>]]
  }
}
