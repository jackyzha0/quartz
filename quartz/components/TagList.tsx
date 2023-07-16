import { canonicalizeServer, pathToRoot } from "../path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { slug as slugAnchor } from 'github-slugger'

function TagList({ fileData }: QuartzComponentProps) {
  const tags = fileData.frontmatter?.tags
  const slug = canonicalizeServer(fileData.slug!)
  const baseDir = pathToRoot(slug)
  if (tags && tags.length > 0) {
    return <ul class="tags">{tags.map(tag => {
      const display = `#${tag}`
      const linkDest = baseDir + `/tags/${slugAnchor(tag)}`
      return <li>
        <a href={linkDest} class="internal">{display}</a>
      </li>
    })}</ul>
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

.tags > li > a {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.5rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
