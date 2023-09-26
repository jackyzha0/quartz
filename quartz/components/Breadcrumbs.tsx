import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { capitalize } from "../util/lang"

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  spacerSymbol: string
  rootName: string
  resolveFrontmatterTitle: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: ">",
  rootName: "Home",
  resolveFrontmatterTitle: false,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return { displayName, path: resolveRelative(baseSlug, currentSlug) }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
  function Breadcrumbs({ fileData }: QuartzComponentProps) {
    // Format entry for root element
    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    // Get parts of filePath (every folder)
    const parts = fileData.filePath?.split("/")?.splice(1)
    if (parts) {
      // full path until current part
      let current = ""
      for (let i = 0; i < parts.length - 1; i++) {
        // Add current path to full path
        current += parts[i] + "/"

        // Format and add current crumb
        const crumb = formatCrumb(capitalize(parts[i]), fileData.slug!, current as SimpleSlug)
        crumbs.push(crumb)
      }

      // Add current file to crumb (can directly use frontmatter title)
      if (parts.length > 0) {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: "",
        })
      }
    }
    return (
      <div class="breadcrumb-container">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </div>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle
  return Breadcrumbs
}) satisfies QuartzComponentConstructor
