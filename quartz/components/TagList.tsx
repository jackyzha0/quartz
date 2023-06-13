import { resolveToRoot } from "../path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { slug as slugAnchor } from 'github-slugger'

function TagList({ fileData }: QuartzComponentProps) {
  const tags = fileData.frontmatter?.tags
  const slug = fileData.slug!
  const baseDir = resolveToRoot(slug)
  if (tags) {
    return <ul class="tags">{tags.map(tag => {
      const display = `#${tag}`
      const linkDest = baseDir + `/tags/${slugAnchor(tag)}`
      return <li>
        <a href={linkDest}>{display}</a>
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

  & > li {
    display: inline-block;
    margin: 0;

    & > a {
      border-radius: 8px;
      border: var(--lightgray) 1px solid;
      padding: 0.2rem 0.5rem;
    }
  }
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
