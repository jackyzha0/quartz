import { CanonicalSlug, canonicalizeServer, resolveRelative } from "../path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date } from "./Date"
import { QuartzComponentProps } from "./types"

function byDateAndAlphabetical(f1: QuartzPluginData, f2: QuartzPluginData): number {
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

export function PageList({ fileData, allFiles }: QuartzComponentProps) {
  const slug = canonicalizeServer(fileData.slug!)
  return <ul class="section-ul">
    {allFiles.sort(byDateAndAlphabetical).map(page => {
      const title = page.frontmatter?.title
      const pageSlug = canonicalizeServer(page.slug!)
      const tags = page.frontmatter?.tags ?? []

      return <li class="section-li">
        <div class="section">
          {page.dates && <p class="meta">
            <Date date={page.dates.modified} />
          </p>}
          <div class="desc">
            <h3><a href={resolveRelative(slug, pageSlug)} class="internal">{title}</a></h3>
          </div>
          <ul class="tags">
            {tags.map(tag => <li><a class="internal" href={resolveRelative(slug, `tags/${tag}` as CanonicalSlug)}>#{tag}</a></li>)}
          </ul>
        </div>
      </li>
    })}
  </ul>
}

PageList.css = `
.section h3 {
  margin: 0;
}
`
