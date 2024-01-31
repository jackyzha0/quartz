import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  /** Default folder where icons are stored */
  iconFolderPath: string
  /** Default icon in case of there is no frontmatter icon key */
  defaultIcon?: string
}

const defaultOpts: Options = {
  iconFolderPath: "", //disable icons by default
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
      return (
        <div
          class={classNames(displayClass, "article-title")}
          data-icon={iconFullPath}
          data-hasIcon={true}
        >
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
  ArticleTitle.afterDOMLoaded = `
  const articleTitle = document.querySelector(".article-title[data-hasicon='true']")
  if (articleTitle) {
    const iconPath = articleTitle.getAttribute("data-icon")
    const location = window.location.origin
    const iconFullPath = location + "/" + iconPath
    const readSVG = async (path) => {
      const response = await fetch(path)
      const text = await response.text()
      return text
    }
    const svg = readSVG(iconFullPath)
    //add the svg to the article title
    svg.then((data) => {
      data = data.replace(/<svg/g, '<svg class="article-title-icon"')
      articleTitle.insertAdjacentHTML("afterbegin", data)
    })
  }
  `
  return ArticleTitle
}) satisfies QuartzComponentConstructor
