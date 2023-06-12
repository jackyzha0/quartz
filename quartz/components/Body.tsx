import clipboardScript from './scripts/clipboard.inline'
import clipboardStyle from './styles/clipboard.scss'
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Body({ children }: QuartzComponentProps) {
  return <article>
    {children}
  </article>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor

