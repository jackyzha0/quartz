import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import path from "path"

import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { _stripSlashes, simplifySlug } from "../../util/path"
import { Root } from "hast"
import { pluralize } from "../../util/lang"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n/i18next"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  function FolderContent(props: QuartzComponentProps) {
    const { tree, fileData, allFiles, cfg } = props
    const folderSlug = _stripSlashes(simplifySlug(fileData.slug!))
    const allPagesInFolder = allFiles.filter((file) => {
      const fileSlug = _stripSlashes(simplifySlug(file.slug!))
      const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const folderParts = folderSlug.split(path.posix.sep)
      const fileParts = fileSlug.split(path.posix.sep)
      const isDirectChild = fileParts.length === folderParts.length + 1
      return prefixed && isDirectChild
    })
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")
    const listProps = {
      ...props,
      allFiles: allPagesInFolder,
    }

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)

    return (
      <div class={classes}>
        <article>
          <p>{content}</p>
        </article>
        <div class="page-listing">
          {options.showFolderCount && (
            <p>
              {pluralize(allPagesInFolder.length, i18n(cfg.locale, "common.item"))}{" "}
              {i18n(cfg.locale, "folderContent.underThisFolder")}.
            </p>
          )}
          <div>
            <PageList {...listProps} />
          </div>
        </div>
      </div>
    )
  }

  FolderContent.css = style + PageList.css
  return FolderContent
}) satisfies QuartzComponentConstructor
