import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Fragment, jsx, jsxs } from "preact/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { FullSlug, getAllSegmentPrefixes, simplifySlug } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { pluralize } from "../../util/lang"

const numPages = 10
function TagContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const slug = fileData.slug

  if (!(slug?.startsWith("tags/") || slug === "tags")) {
    throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
  }

  const tag = simplifySlug(slug.slice("tags/".length) as FullSlug)
  const allPagesWithTag = (tag: string) =>
    allFiles.filter((file) =>
      (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
    )

  const content =
    (tree as Root).children.length === 0
      ? fileData.description
      : // @ts-ignore
        toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: "html" })

  if (tag === "") {
    const tags = [...new Set(allFiles.flatMap((data) => data.frontmatter?.tags ?? []))]
    const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
    for (const tag of tags) {
      tagItemMap.set(tag, allPagesWithTag(tag))
    }

    return (
      <div class="popover-hint">
        <article>
          <p>{content}</p>
        </article>
        <p>Found {tags.length} total tags.</p>
        <div>
          {tags.map((tag) => {
            const pages = tagItemMap.get(tag)!
            const listProps = {
              ...props,
              allFiles: pages,
            }

            const contentPage = allFiles.filter((file) => file.slug === `tags/${tag}`)[0]
            const content = contentPage?.description
            return (
              <div>
                <h2>
                  <a class="internal tag-link" href={`./${tag}`}>
                    #{tag}
                  </a>
                </h2>
                {content && <p>{content}</p>}
                <p>
                  {pluralize(pages.length, "item")} with this tag.{" "}
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
        <p>{pluralize(pages.length, "item")} with this tag.</p>
        <div>
          <PageList {...listProps} />
        </div>
      </div>
    )
  }
}

TagContent.css = style + PageList.css
export default (() => TagContent) satisfies QuartzComponentConstructor
