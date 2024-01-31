import { pathToRoot } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import * as fs from "fs"
import * as path from "path"

interface Options {
  iconFolderPath: string
  defaultIcon?: string
}

const defaultOpts: Options = {
  iconFolderPath: "",
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOpts, ...userOpts }
  function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
    const title = cfg?.pageTitle ?? "Untitled Quartz"
    const iconType = fileData.frontmatter?.icon ?? opts.defaultIcon
    const baseDir = pathToRoot(fileData.slug!)
    if (opts.iconFolderPath.trim().length === 0 || !iconType) {
      return (
        <h1 class={classNames(displayClass, "page-title")}>
          <a href={baseDir}>{title}</a>
        </h1>
      )
    }
    const iconFullPath = `${opts.iconFolderPath}/${iconType || opts.defaultIcon}.svg`
    let iconAsSVG = ""
    try {
      iconAsSVG = fs.readFileSync(path.join(process.cwd(), iconFullPath), "utf8")
    } catch (e) {
      iconAsSVG = fs.readFileSync(
        path.join(process.cwd(), `${opts.iconFolderPath}/${opts.defaultIcon}.svg`),
        "utf8",
      )
    }
    return (
      <div
        class={classNames(displayClass, "page-title")}
        data-icon={iconFullPath}
        data-hasIcon={true}
      >
        {iconAsSVG && (
          <div class="page-title-icon" dangerouslySetInnerHTML={{ __html: iconAsSVG }} />
        )}
        <h1>
          <a href={baseDir}>{title}</a>
        </h1>
      </div>
    )
  }

  PageTitle.css = `
    .page-title {
      margin: 0;
    }
    .page-title[data-hasicon="true"] {
      display: flex;
      align-items: center;
    }
    .page-title-icon {
      margin-right: 1rem;
    }
    .page-title[data-hasicon="true"] > h1 {
      margin: 0;
    }
  `
  return PageTitle
}) satisfies QuartzComponentConstructor
