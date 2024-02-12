import { htmlToJsx } from "../../util/jsx"
import { classNames } from "../../util/lang"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  return <article class={classNames(undefined, "popover-hint", ...classes)}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
