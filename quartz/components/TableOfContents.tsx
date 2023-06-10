import { QuartzComponentProps } from "./types"
import style from "./styles/toc.scss"

export default function TableOfContents({ fileData, position }: QuartzComponentProps) {
  if (!fileData.toc) {
    return null
  }

  if (position === 'body') {
    // TODO: animate this
    return <details className="toc" open>
      <summary><h3>Table of Contents</h3></summary>
      <ul>
        {fileData.toc.map(tocEntry => <li key={tocEntry.slug} className={`depth-${tocEntry.depth}`}>
          <a href={`#${tocEntry.slug}`}>{tocEntry.text}</a>
        </li>)}
      </ul>
    </details>
  } else if (position === 'sidebar') {
    // TODO
  }
}

TableOfContents.css = style
