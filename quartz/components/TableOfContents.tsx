import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/toc.scss"

function TableOfContents({ fileData }: QuartzComponentProps) {
  if (!fileData.toc) {
    return null
  }

  return <details class="toc" open>
    <summary><h3>Table of Contents</h3></summary>
    <ul>
      {fileData.toc.map(tocEntry => <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
        <a href={`#${tocEntry.slug}`}>{tocEntry.text}</a>
      </li>)}
    </ul>
  </details>
}

TableOfContents.css = style

export default (() => TableOfContents) satisfies QuartzComponentConstructor
