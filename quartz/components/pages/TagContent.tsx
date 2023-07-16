import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import style from '../styles/listPage.scss'
import { PageList } from "../PageList"
import { ServerSlug, canonicalizeServer } from "../../path"

function TagContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const slug = fileData.slug

  if (slug?.startsWith("tags/")) {
    const tag = canonicalizeServer(slug.slice("tags/".length) as ServerSlug)
    const allPagesWithTag = allFiles.filter(file => (file.frontmatter?.tags ?? []).includes(tag))
    const listProps = {
      ...props,
      allFiles: allPagesWithTag
    }

    // @ts-ignore
    const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: 'html' })
    return <div class="popover-hint">
      <article>{content}</article>
      <p>{allPagesWithTag.length} items with this tag.</p>
      <div>
        <PageList {...listProps} />
      </div>
    </div>
  } else {
    throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
  }
}

TagContent.css = style + PageList.css
export default (() => TagContent) satisfies QuartzComponentConstructor
