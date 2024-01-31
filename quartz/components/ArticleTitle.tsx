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
  function ArticleTitle({ fileData, displayClass, cfg }: QuartzComponentProps) {
    const title = fileData.frontmatter?.title
    const iconType = fileData.frontmatter?.icon
    if (title) {
      if (opts.iconFolderPath.trim().length === 0 || (!iconType && !opts.defaultIcon)) {
        return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
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
    } else {
      return null
    }
  }

  ArticleTitle.css = `
  .article-title {
    margin: 2rem 0 0 0;
  }
  .article-title[data-hasicon="true"] {
    display: flex;
    align-items: center;
    margin: 0 !important;
  }
  .article-title-icon {
    margin-right: 1rem;
  }
  .article-title[data-hasicon="true"] > h1 {
    margin: 0;
  }
  `
  return ArticleTitle
}) satisfies QuartzComponentConstructor
