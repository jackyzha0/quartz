import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from "hast-util-to-jsx-runtime"

// @ts-ignore
import popoverScript from './scripts/popover.inline'
import popoverStyle from './styles/popover.scss'

interface Options {
  enablePopover: boolean
}

const defaultOptions: Options = {
  enablePopover: true
}

export default ((opts?: Partial<Options>) => {
  function Content({ tree }: QuartzComponentProps) {
    // @ts-ignore (preact makes it angry)
    const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: 'html' })
    return <article>{content}</article>
  }

  const enablePopover = opts?.enablePopover ?? defaultOptions.enablePopover
  if (enablePopover) {
    Content.afterDOMLoaded = popoverScript
    Content.css = popoverStyle
  }

  return Content
}) satisfies QuartzComponentConstructor
