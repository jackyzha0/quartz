import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date } from "./Date"
import { QuartzComponentProps } from "./types"

export function byDateAndAlphabetical(f1: QuartzPluginData, f2: QuartzPluginData): number {
  if (f1.dates && f2.dates) {
    // sort descending by last modified
    return f2.dates.modified.getTime() - f1.dates.modified.getTime()
  } else if (f1.dates && !f2.dates) {
    // prioritize files with dates
    return -1
  } else if (!f1.dates && f2.dates) {
    return 1
  }

  // otherwise, sort lexographically by title
  const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
  const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
  return f1Title.localeCompare(f2Title)
}

type Props = {
  limit?: number
} & QuartzComponentProps

export function PageList({ fileData, allFiles, limit }: Props) {
  let list = allFiles.sort(byDateAndAlphabetical)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []

        return (
          <li class="section-li">
            <div class="section">
              {page.dates && (
                <p class="meta">
                  <Date date={page.dates.modified} />
                </p>
              )}
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
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
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
