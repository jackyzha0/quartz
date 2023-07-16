import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import path from "path"

import style from '../styles/listPage.scss'
import { PageList } from "../PageList"
import { canonicalizeServer } from "../../path"

function FolderContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const folderSlug = canonicalizeServer(fileData.slug!)
  const allPagesInFolder = allFiles.filter(file => {
    const fileSlug = file.slug ?? ""
    const prefixed = fileSlug.startsWith(folderSlug)
    const folderParts = folderSlug.split(path.posix.sep)
    const fileParts = fileSlug.split(path.posix.sep)
    const isDirectChild = fileParts.length === folderParts.length + 1
    return prefixed && isDirectChild
  })

  const listProps = {
    ...props,
    allFiles: allPagesInFolder
  }
  
  // @ts-ignore
  const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: 'html' })
  return <div class="popover-hint">
    <article>{content}</article>
    <p>{allPagesInFolder.length} items under this folder.</p>
    <div>
      <PageList {...listProps} /> 
    </div>
  </div>
}

FolderContent.css = style + PageList.css
export default (() => FolderContent) satisfies QuartzComponentConstructor
