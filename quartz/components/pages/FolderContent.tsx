import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import path from "path"

import style from "../styles/listPage.scss"
import { PageList, SortFn } from "../PageList"
import { FolderList } from "../FolderList"
import { stripSlashes, simplifySlug, SimpleSlug, joinSegments } from "../../util/path"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const folderSlug = stripSlashes(simplifySlug(fileData.slug!))

    const allPagesInFolder: QuartzPluginData[] = []
    const allSubfolders: Set<SimpleSlug> = new Set()

    allFiles.forEach((file) => {
      const fileSlug = stripSlashes(simplifySlug(file.slug!))
      const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const folderParts = folderSlug.split(path.posix.sep)
      const fileParts = fileSlug.split(path.posix.sep)
      const isDirectChild = fileParts.length === folderParts.length + 1

      if (!prefixed) {
        return
      }

      if (isDirectChild) {
        allPagesInFolder.push(file)
      } else {
        const folderSlug = joinSegments(...fileParts.slice(0, folderParts.length + 1))
        allSubfolders.add(folderSlug as SimpleSlug)
      }
    })

    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")
    const pageListProps = {
      ...props,
      sort: options.sort,
      allFiles: allPagesInFolder,
    }
    const folderListProps = {
      ...props,
      allFolders: Array.from(allSubfolders.values()),
    }

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)

    return (
      <div class={classes}>
        <article>{content}</article>
        <div class="page-listing">
          {options.showFolderCount && (
            <p>
              {i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
                count: allPagesInFolder.length,
              })}
            </p>
          )}
          <div>
            <PageList {...pageListProps} />
          </div>
        </div>
        <div class="page-listing">
          {options.showSubfolders && (
            <p>{allSubfolders.size === 1 ? "1 subfolder." : `${allSubfolders.size} subfolders.`}</p>
          )}
          <div>
            <FolderList {...folderListProps} />
          </div>
        </div>
      </div>
    )
  }

  FolderContent.css = style + PageList.css
  return FolderContent
}) satisfies QuartzComponentConstructor
