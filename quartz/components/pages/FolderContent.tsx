import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import path from "path"

import style from '../styles/listPage.scss'
import { PageList } from "../PageList"

function TagContent(props: QuartzComponentProps) {
  const { tree, fileData, allFiles } = props
  const folderSlug = fileData.slug!
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
  return <div>
    <article>{content}</article>
    <div>
      <PageList {...listProps} /> 
    </div>
  </div>
}

TagContent.css = style + PageList.css
export default (() => TagContent) satisfies QuartzComponentConstructor
