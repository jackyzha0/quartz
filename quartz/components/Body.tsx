import { ComponentChildren } from "preact"
import clipboardScript from './scripts/clipboard.inline'
import clipboardStyle from './styles/clipboard.scss'

export interface BodyProps {
  title?: string
  children: ComponentChildren
}

export default function Body({ title, children }: BodyProps) {
  return <article>
    {title && <h1>{title}</h1>}
    {children}
  </article>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle
