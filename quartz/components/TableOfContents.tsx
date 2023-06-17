import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "./styles/legacyToc.scss"
import modernStyle from "./styles/toc.scss"

interface Options {
  layout: 'modern' | 'legacy'
}

const defaultOptions: Options = {
  layout: 'modern'
}

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  function TableOfContents({ fileData }: QuartzComponentProps) {
    if (!fileData.toc) {
      return null
    }

    return <details class="toc" open>
      <summary><h3>Table of Contents</h3></summary>
      <ul>
        {fileData.toc.map(tocEntry => <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
          <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>{tocEntry.text}</a>
        </li>)}
      </ul>
    </details>
  }

  TableOfContents.css = layout === "modern" ? modernStyle : legacyStyle

  if (layout === "modern") {
    TableOfContents.afterDOMLoaded = `
const bufferPx = 150
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElement = document.querySelector(\`a[data-for="$\{slug\}"]\`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElement) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElement.classList.add("in-view")
      } else {
        tocEntryElement.classList.remove("in-view")
      }
    }
  }
})

function init() {
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach(header => observer.observe(header))
}

init()

document.addEventListener("spa_nav", (e) => {
  observer.disconnect()
  init()
})
`
  }

  return TableOfContents
}) satisfies QuartzComponentConstructor
