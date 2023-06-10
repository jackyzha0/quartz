import clipboardScript from './scripts/clipboard.inline'
import clipboardStyle from './styles/clipboard.scss'
import { QuartzComponentProps } from "./types"

export default function Body({ children }: QuartzComponentProps) {
  return <article>
    {children}
  </article>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle
