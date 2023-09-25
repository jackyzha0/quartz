import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"

type CrumbData = {
  displayName: string
  path: string
}

const capitalize = (s: string): string => {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}

export default (() => {
  function Breadcrumbs({ fileData }: QuartzComponentProps) {
    const crumbs: CrumbData[] = [
      { displayName: "Home", path: resolveRelative(fileData.slug!, "/" as SimpleSlug) },
    ]
    const parts = fileData.filePath?.split("/")?.splice(1)
    if (parts) {
      // full path until current part
      let current = ""
      for (let i = 0; i < parts.length - 1; i++) {
        current += parts[i] + "/"
        crumbs.push({
          displayName: capitalize(parts[i]),
          path: resolveRelative(fileData.slug!, current as SimpleSlug),
        })
      }
      if (parts.length > 0) {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: resolveRelative(fileData.slug!, fileData.slug as FullSlug),
        })
      }
    }
    return (
      <div class={`breadcrumb-container`}>
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{" > "}</p>}
          </div>
        ))}
      </div>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle
  return Breadcrumbs
}) satisfies QuartzComponentConstructor
