import { Components, Jsx, toJsxRuntime } from "hast-util-to-jsx-runtime"
import { QuartzPluginData } from "../plugins/vfile"
import { Node, Root } from "hast"
import { Fragment, jsx, jsxs } from "preact/jsx-runtime"
import { trace } from "./trace"
import { type FilePath } from "./path"

const customComponents: Components = {
  table: (props) => (
    <div class="table-container">
      <table {...props} />
    </div>
  ),
}

export function htmlToJsx(fp: FilePath, tree: Node<QuartzPluginData>) {
  try {
    return toJsxRuntime(tree as Root, {
      Fragment,
      jsx: jsx as Jsx,
      jsxs: jsxs as Jsx,
      elementAttributeNameCase: "html",
      components: customComponents,
    })
  } catch (e) {
    trace(`Failed to parse Markdown in \`${fp}\` into JSX`, e as Error)
  }
}
