import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from "hast-util-to-jsx-runtime"

function Content({ tree }: QuartzComponentProps) {
  // @ts-ignore (preact makes it angry)
  const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: 'html' })
  return content
}

export default (() => Content) satisfies QuartzComponentConstructor
