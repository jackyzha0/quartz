import { htmlToJsx } from "../../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import assert from 'node:assert';

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree);
  let CSSclass: string[] = fileData.frontmatter?.cssclasses || [];
  CSSclass.push("popover-hint");
  const finalClass = CSSclass.join(" ");
  //const  = "popover-hint"+fileData.frontmatter?.cssclasses
  return <article class={finalClass}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
