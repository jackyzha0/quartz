import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date } from "./Date"

interface Options {
  title: string
  limit: number
  linkToMore: SimpleSlug | false
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions: Options = {
  title: "Recent Notes",
  limit: 3,
  linkToMore: false,
  filter: () => true,
  sort: byDateAndAlphabetical,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }
  function RecentNotes(props: QuartzComponentProps) {
    const { allFiles, fileData, displayClass } = props
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div class={`recent-notes ${displayClass}`}>
        <h3>{opts.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title
            const tags = page.frontmatter?.tags ?? []

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                        {title}
                      </a>
                    </h3>
                  </div>
                  {page.dates && (
                    <p class="meta">
                      <Date date={page.dates.modified} />
                    </p>
                  )}
                  <ul class="tags">
                    {tags.map((tag) => (
                      <li>
                        <a
                          class="internal tag-link"
                          href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                        >
                          #{tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>See {remaining} more →</a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
