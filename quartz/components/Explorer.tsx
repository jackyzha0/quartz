import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import modernStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

function Explorer({ fileData, displayClass }: QuartzComponentProps) {
  return (
    <div class={`toc ${displayClass}`}>
      <button type="button" id="toc">
        <h3>Table of Contents</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content">
        <ul class="overflow">
          <li class={`depth-1`}>
            <a href={`#test`}>Test</a>
          </li>
          <li class={`depth-1`}>
            <a href={`#test`}>Test2</a>
          </li>
          <li class={`depth-2`}>
            <a href={`#test`}>Test3</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
Explorer.css = modernStyle
Explorer.afterDOMLoaded = script

function LegacyTableOfContents({ fileData }: QuartzComponentProps) {
  if (!fileData.toc) {
    return null
  }

  return (
    <details id="toc" open>
      <summary>
        <h3>Table of Contents</h3>
      </summary>
      <ul>
        {fileData.toc.map((tocEntry) => (
          <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
            <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
              {tocEntry.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  return layout === "modern" ? Explorer : LegacyTableOfContents
}) satisfies QuartzComponentConstructor
