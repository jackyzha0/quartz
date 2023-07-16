import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { canonicalizeServer, resolveRelative } from "../path"

function Backlinks({ fileData, allFiles }: QuartzComponentProps) {
  const slug = canonicalizeServer(fileData.slug!)
  const backlinkFiles = allFiles.filter(file => file.links?.includes(slug))
  return <div class="backlinks">
    <h3>Backlinks</h3>
    <ul class="overflow">
      {backlinkFiles.length > 0 ?
        backlinkFiles.map(f => <li><a href={resolveRelative(slug, canonicalizeServer(f.slug!))} class="internal">{f.frontmatter?.title}</a></li>)
        : <li>No backlinks found</li>}
    </ul>
  </div>
}

Backlinks.css = style
export default (() => Backlinks) satisfies QuartzComponentConstructor
