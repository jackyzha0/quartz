import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import path from "path"

import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { _stripSlashes, simplifySlug } from "../../util/path"
import { Root } from "hast"
import { pluralize } from "../../util/lang"
import { htmlToJsx } from "../../util/jsx"

function FolderContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const folderSlug = _stripSlashes(simplifySlug(fileData.slug!))
  const allPagesInFolder = allFiles.filter((file) => {
    const fileSlug = _stripSlashes(simplifySlug(file.slug!))
    const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
    const folderParts = folderSlug.split(path.posix.sep)
    const fileParts = fileSlug.split(path.posix.sep)
    const isDirectChild = fileParts.length === folderParts.length + 1
    return prefixed && isDirectChild
  })

  const listProps = {
    ...props,
    allFiles: allPagesInFolder,
  }

  const content =
    (tree as Root).children.length === 0
      ? fileData.description
      : htmlToJsx(fileData.filePath!, tree)

  return (
    <div class="popover-hint">
      <article>
        <p>{content}</p>
      </article>
      <p>{pluralize(allPagesInFolder.length, "item")} under this folder.</p>
      <div>
        <PageList {...listProps} />
      </div>
    </div>
  )
}

FolderContent.css = style + PageList.css
export default (() => FolderContent) satisfies QuartzComponentConstructor
