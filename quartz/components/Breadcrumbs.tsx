import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"

type CrumbData = {
  displayName: string
  path: string
}

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
   * wether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Wether to display breadcrumbs on root `index.md`
   */
  hideOnRoot: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: ">",
  rootName: "Home",
  resolveFrontmatterTitle: false,
  hideOnRoot: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

// given a folderName (e.g. "features"), search for the corresponding `index.md` file
function findCurrentFile(allFiles: QuartzPluginData[], folderName: string) {
  return allFiles.find((file) => {
    if (file.slug?.endsWith("index")) {
      const folderParts = file.filePath?.split("/")
      if (folderParts) {
        const name = folderParts[folderParts?.length - 2]
        if (name === folderName) {
          return true
        }
      }
    }
  })
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  // Merge options with defaults
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }

  function Breadcrumbs({ fileData, allFiles, displayClass }: QuartzComponentProps) {
    // Hide crumbs on root if enabled
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    // Format entry for root element
    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    // Split slug into hierarchy/parts
    const slugParts = fileData.slug?.split("/")
    if (slugParts) {
      // full path until current part
      let currentPath = ""
      for (let i = 0; i < slugParts.length - 1; i++) {
        let currentTitle = slugParts[i]

        // TODO: performance optimizations/memoizing
        // Try to resolve frontmatter folder title
        if (options?.resolveFrontmatterTitle) {
          // try to find file for current path
          const currentFile = findCurrentFile(allFiles, currentTitle)
          if (currentFile) {
            currentTitle = currentFile.frontmatter!.title
          }
        }
        // Add current slug to full path
        currentPath += slugParts[i] + "/"

        // Format and add current crumb
        const crumb = formatCrumb(currentTitle, fileData.slug!, currentPath as SimpleSlug)
        crumbs.push(crumb)
      }

      // Add current file to crumb (can directly use frontmatter title)
      crumbs.push({
        displayName: fileData.frontmatter!.title,
        path: "",
      })
    }
    return (
      <nav class={`breadcrumb-container ${displayClass ?? ""}`} aria-label="breadcrumbs">
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
