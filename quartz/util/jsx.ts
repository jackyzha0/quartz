import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { QuartzPluginData } from "../plugins/vfile"
import { Node, Root } from "hast"
import { Fragment, jsx, jsxs } from "preact/jsx-runtime"
import { trace } from "./trace"
import { type FilePath } from "./path"

export function htmlToJsx(fp: FilePath, tree: Node<QuartzPluginData>) {
  try {
    // @ts-ignore (preact makes it angry)
    return toJsxRuntime(tree as Root, { Fragment, jsx, jsxs, elementAttributeNameCase: "html" })
  } catch (e) {
    trace(`Failed to parse Markdown in \`${fp}\` into JSX`, e as Error)
  }
}
