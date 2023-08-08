import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Fragment, jsx, jsxs } from "preact/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { ServerSlug, canonicalizeServer, getAllSegmentPrefixes } from "../../path"
import { QuartzPluginData } from "../../plugins/vfile"

const numPages = 10
function TagContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const slug = fileData.slug

  if (!slug?.startsWith("tags/")) {
    throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
  }

  const tag = canonicalizeServer(slug.slice("tags/".length) as ServerSlug)
  const allPagesWithTag = (tag: string) =>
    allFiles.filter((file) =>
      (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
    )

  // @ts-ignore
  const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: "html" })
  if (tag === "") {
    const tags = [...new Set(allFiles.flatMap((data) => data.frontmatter?.tags ?? []))]
    const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
    for (const tag of tags) {
      tagItemMap.set(tag, allPagesWithTag(tag))
    }

    return (
      <div class="popover-hint">
        <article>{content}</article>
        <p>Found {tags.length} total tags.</p>
        <div>
          {tags.map((tag) => {
            const pages = tagItemMap.get(tag)!
            const listProps = {
              ...props,
              allFiles: pages,
            }
            return (
              <div>
                <h2>
                  <a class="internal tag-link" href={`./tags/${tag}`}>
                    #{tag}
                  </a>
                </h2>
                <p>
                  {pages.length} items with this tag.{" "}
                  {pages.length > numPages && `Showing first ${numPages}.`}
                </p>
                <PageList limit={numPages} {...listProps} />
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    const pages = allPagesWithTag(tag)
    const listProps = {
      ...props,
      allFiles: pages,
    }

    return (
      <div class="popover-hint">
        <article>{content}</article>
        <p>{pages.length} items with this tag.</p>
        <div>
          <PageList {...listProps} />
        </div>
      </div>
    )
  }
}

TagContent.css = style + PageList.css
export default (() => TagContent) satisfies QuartzComponentConstructor
