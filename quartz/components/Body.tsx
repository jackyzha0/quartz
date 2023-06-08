import clipboardScript from './scripts/clipboard.inline'
import clipboardStyle from './styles/clipboard.scss'
import { QuartzComponentProps } from "./types"

export default function Body({ fileData, children }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  const displayTitle = fileData.slug === "index" ? undefined : title
  return <article>
    <div class="top-section">
      {displayTitle && <h1>{displayTitle}</h1>}
    </div>
    {children}
  </article>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle
