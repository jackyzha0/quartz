import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, joinSegments, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"

type CrumbData = {
  displayName: string
  path: string
}

type CrumbStyle = "full" | "letter" | "unique"

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display breadcrumbs on root `index.md`
   */
  hideOnRoot: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
  /**
   * Set a style for breadcrumbs. The following are supported:
   * - full (default): show the full path of the breadcrumb.
   * - letter: works like full, but will write every folder name using first letter only. The last folder will be displayed in full. For example:
   *   - `folder` will be shorten to `f`
   *   - `.config` will be shorten to `.c`
   * - unique: works like `letter`, but will make sure every folder name is shortest unique value. For example:
   *   - `path/path/path/to/file.md` with `unique` will set `p/pa/pat/path/to/file.md`.
   *   - However, uniqueness does not refer different folder at the same level. For example: `path1/file.md` and `path2/file.md` will both show `p/file.md`
   */
  style: CrumbStyle
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  hideOnRoot: true,
  showCurrentPage: true,
  style: "full",
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  // Merge options with defaults
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }

  // computed index of folder name to its associated file data
  let folderIndex: Map<string, QuartzPluginData> | undefined

  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    // Hide crumbs on root if enabled
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    // Format entry for root element
    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    if (!folderIndex && options.resolveFrontmatterTitle) {
      folderIndex = new Map()
      // construct the index for the first time
      for (const file of allFiles) {
        const folderParts = file.slug?.split("/")
        if (folderParts?.at(-1) === "index") {
          folderIndex.set(folderParts.slice(0, -1).join("/"), file)
        }
      }
    }

    // Split slug into hierarchy/parts
    const slugParts = fileData.slug?.split("/")
    if (slugParts) {
      // is tag breadcrumb?
      const isTagPath = slugParts[0] === "tags"

      // full path until current part
      let currentPath = ""

      // Map to store the shortened names for each path segment
      const shortenedNames: Map<string, string> = new Map()

      for (let i = 0; i < slugParts.length - 1; i++) {
        let curPathSegment = slugParts[i]

        // Try to resolve frontmatter folder title
        const currentFile = folderIndex?.get(slugParts.slice(0, i + 1).join("/"))
        if (currentFile) {
          const title = currentFile.frontmatter!.title
          if (title !== "index") {
            curPathSegment = title
          }
        }

        // Add current slug to full path
        currentPath = joinSegments(currentPath, slugParts[i])
        const includeTrailingSlash = !isTagPath || i < 1

        switch (options.style) {
          case "letter":
            if (curPathSegment.startsWith(".")) {
              curPathSegment = curPathSegment.slice(0, 2)
            } else {
              curPathSegment = curPathSegment.charAt(0)
            }
            break
          case "unique":
            let shortenedName = curPathSegment.charAt(0)
            let uniqueName = shortenedName
            let counter = 1

            while (shortenedNames.has(uniqueName)) {
              uniqueName = curPathSegment.slice(0, counter + 1)
              counter++
            }

            shortenedNames.set(uniqueName, currentPath)
            curPathSegment = uniqueName
            break
        }

        // Format and add current crumb
        const crumb = formatCrumb(
          curPathSegment,
          fileData.slug!,
          (currentPath + (includeTrailingSlash ? "/" : "")) as SimpleSlug,
        )
        crumbs.push(crumb)
      }

      if (isTagPath && !options.showCurrentPage) {
        crumbs.push({ displayName: slugParts.at(-1) ?? "", path: "" })
      }

      // Add current file to crumb (can directly use frontmatter title)
      if (options.showCurrentPage && slugParts.at(-1) !== "index") {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: "",
        })
      }
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
