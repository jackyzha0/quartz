import { classNames } from "../../util/lang"
import fs from "fs"
import path from "path"
import { FileNode } from "../../components/ExplorerNode"

export type IconFolderOptions = {
  /** Icon root folder, ie `quartz/static/icon`
   * Set to `undefined` to disable (default)
   */
  rootIconFolder?: string
  /** Default icon if needed */
  default: {
    /** Default icon for file, used in ArticleTitle for example, without root rootIconFolder string
     * e.g. `file`
     * set disable to only use the frontmatter icon
     */
    file?: string
    /** Default icon for folder, used in Explorer, without root rootIconFolder string
     * e.g. `folder`
     * set disable to don't use folder icon before title
     * For index, they will use the frontmatter icon if exists
     */
    folder?: string
  }
}

export function getIconAsSVG(opts: Partial<IconFolderOptions>, iconType?: string) {
  const iconFullPath = `${opts.rootIconFolder}/${iconType}.svg`
  let iconAsSVG = ""
  try {
    iconAsSVG = fs.readFileSync(path.join(process.cwd(), iconFullPath), "utf8")
  } catch (e) {
    iconAsSVG = fs.readFileSync(
      path.join(process.cwd(), `${opts.rootIconFolder}/${opts.default?.file}.svg`),
      "utf8",
    )
  }
  return { iconAsSVG, iconFullPath }
}

export function getIconForNodes(node: FileNode, iconSettings?: IconFolderOptions) {
  let hasIcon = false
  let iconType = ""
  const defaultIcon = node.file ? iconSettings?.default?.file : iconSettings?.default?.folder
  if (iconSettings) {
    if (node.icon) {
      hasIcon = true
      iconType = node.icon
    } else if (iconSettings?.default?.file && node.file) {
      hasIcon = true
      iconType = iconSettings?.default?.file
    } else if (iconSettings?.default?.folder && !node.file) {
      hasIcon = true
      iconType = iconSettings?.default?.folder
    }
  }
  const iconPath =
    hasIcon && iconSettings?.rootIconFolder ? `${iconSettings.rootIconFolder}/${iconType}.svg` : ""
  let iconAsSVG: string | null = null
  if (hasIcon && iconSettings?.rootIconFolder) {
    try {
      iconAsSVG = fs.readFileSync(path.join(process.cwd(), iconPath), "utf8")
    } catch (e) {
      iconAsSVG = defaultIcon
        ? fs.readFileSync(
            path.join(process.cwd(), `${iconSettings.rootIconFolder}/${defaultIcon}.svg`),
            "utf8",
          )
        : null
      hasIcon = defaultIcon ? true : false
    }
  }
  return { hasIcon, iconAsSVG, iconPath }
}

export function NodesIcons(props: {
  iconAsSVG: string | null
  hasIcon: boolean
  nodeType: "file" | "folder"
}) {
  const { iconAsSVG, nodeType, hasIcon } = props
  const classes = classNames(undefined, `${nodeType}-title-icon`)
  if (hasIcon && iconAsSVG) {
    return <div class={classes} dangerouslySetInnerHTML={{ __html: iconAsSVG }} />
  }
  return <></>
}

export function FileTitleIcon(props: {
  displayClass: "mobile-only" | "desktop-only" | undefined
  opts: Partial<IconFolderOptions>
  iconType?: string
  title?: string
}) {
  const { displayClass, opts, iconType, title } = props
  const { iconAsSVG, iconFullPath } = getIconAsSVG(opts, iconType)
  return (
    <div
      class={classNames(displayClass, "article-title")}
      data-icon={iconFullPath}
      data-hasIcon={true}
    >
      {iconAsSVG && (
        <div class="article-title-icon" dangerouslySetInnerHTML={{ __html: iconAsSVG }} />
      )}
      <h1>{title}</h1>
    </div>
  )
}
