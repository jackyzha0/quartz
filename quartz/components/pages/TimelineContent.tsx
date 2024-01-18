import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"

function TimelineContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props

  return (
    <div class="popover-hint">
      <article></article>
      <div>{<PageList {...props} allFiles={allFiles} />}</div>
    </div>
  )
}

TimelineContent.css = style + PageList.css
export default (() => TimelineContent) satisfies QuartzComponentConstructor
