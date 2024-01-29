import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { FullSlug, getAllSegmentPrefixes, simplifySlug } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { pluralize } from "../../util/lang"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n/i18next"

const numPages = 10
function TagContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles, cfg } = props
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
      : htmlToJsx(fileData.filePath!, tree)
  const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
  const classes = ["popover-hint", ...cssClasses].join(" ")
  if (tag === "/") {
    const tags = [
      ...new Set(
        allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
      ),
    ].sort((a, b) => a.localeCompare(b))
    const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
    for (const tag of tags) {
      tagItemMap.set(tag, allPagesWithTag(tag))
    }
    return (
      <div class={classes}>
        <article>
          <p>{content}</p>
        </article>
        <p>
          {i18n(cfg.locale, "tagContent.found")} {tags.length}{" "}
          {i18n(cfg.locale, "tagContent.totalTags")}.
        </p>
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
                  <a class="internal tag-link" href={`../tags/${tag}`}>
                    #{tag}
                  </a>
                </h2>
                {content && <p>{content}</p>}
                <div class="page-listing">
                  <p>
                    {pluralize(pages.length, i18n(cfg.locale, "common.item"))}{" "}
                    {i18n(cfg.locale, "tagContent.withThisTag")}.{" "}
                    {pages.length > numPages &&
                      `${i18n(cfg.locale, "tagContent.showingFirst")} ${numPages}.`}
                  </p>
                  <PageList limit={numPages} {...listProps} />
                </div>
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
      <div class={classes}>
        <article>{content}</article>
        <div class="page-listing">
          <p>
            {pluralize(pages.length, i18n(cfg.locale, "common.item"))}{" "}
            {i18n(cfg.locale, "tagContent.withThisTag")}.
          </p>
          <div>
            <PageList {...listProps} />
          </div>
        </div>
      </div>
    )
  }
}

TagContent.css = style + PageList.css
export default (() => TagContent) satisfies QuartzComponentConstructor
