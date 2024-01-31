import { IconFolderOptions, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import * as fs from "fs"
import * as path from "path"

export default ((userOpts?: Partial<IconFolderOptions>) => {
  const opts = { ...userOpts }
  function ArticleTitle({ fileData, displayClass }: QuartzComponentProps) {
    const title = fileData.frontmatter?.title
    const iconType = fileData.frontmatter?.icon || opts.default?.file
    if (title) {
      if (!opts.rootIconFolder || !iconType) {
        return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
      }
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
