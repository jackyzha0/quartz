import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { capitalize } from "../util/lang"
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
  return { displayName, path: resolveRelative(baseSlug, currentSlug) }
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

  function Breadcrumbs({ fileData, allFiles }: QuartzComponentProps) {
    // Hide crumbs on root if enabled
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    // Format entry for root element
    const firstEntry = formatCrumb(capitalize(options.rootName), fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    // Get parts of filePath (every folder)
    const parts = fileData.filePath?.split("/")?.splice(1)
    if (parts) {
      // full path until current part
      let current = ""
      for (let i = 0; i < parts.length - 1; i++) {
        const folderName = parts[i]
        let currentTitle = folderName

        // TODO: performance optimizations/memoizing
        // Try to resolve frontmatter folder title
        if (options?.resolveFrontmatterTitle) {
          // try to find file for current path
          const currentFile = findCurrentFile(allFiles, folderName)
          if (currentFile) {
            currentTitle = currentFile.frontmatter!.title
          }
        }
        // Add current path to full path
        current += folderName + "/"

        // Format and add current crumb
        const crumb = formatCrumb(capitalize(currentTitle), fileData.slug!, current as SimpleSlug)
        crumbs.push(crumb)
      }

      // Add current file to crumb (can directly use frontmatter title)
      if (parts.length > 0) {
        crumbs.push({
          displayName: capitalize(fileData.frontmatter!.title),
          path: "",
        })
      }
    }
    return (
      <nav class="breadcrumb-container" aria-label="breadcrumbs">
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
