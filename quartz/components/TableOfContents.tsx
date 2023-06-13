import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/toc.scss"


interface Options {
  layout: 'modern' | 'quartz-3'
}

const defaultOptions: Options = {
  layout: 'quartz-3'
}

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  if (layout === "modern") {
    return function() {
      return null // TODO (make this look like nextra)
    }
  } else {
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
    return TableOfContents
  }
}) satisfies QuartzComponentConstructor
