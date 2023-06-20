import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { relativeToRoot } from "../path"
import { stripIndex } from "./scripts/util"

function Backlinks({ fileData, allFiles }: QuartzComponentProps) {
  const slug = fileData.slug!
  const backlinkFiles = allFiles.filter(file => file.links?.includes(slug))
  return <div class="backlinks">
    <h3>Backlinks</h3>
    <ul>
      {backlinkFiles.length > 0 ?
        backlinkFiles.map(f => <li><a href={stripIndex(relativeToRoot(slug, f.slug!))} class="internal">{f.frontmatter?.title}</a></li>)
        : <li>No backlinks found</li>}
    </ul>
  </div> 
}

Backlinks.css = style 
export default (() => Backlinks) satisfies QuartzComponentConstructor
