import styles from "./styles/tags.scss"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Darkmode from "./Darkmode"

function Tags({ displayClass }: QuartzComponentProps) {
  return (
    <div class={`tags left-inline ${displayClass ?? ""}`}>
      <a href="/tags"><i class="nf nf-md-tag_multiple"></i></a>
    </div>
  )
}

Tags.css = styles

export default (() => Tags) satisfies QuartzComponentConstructor
