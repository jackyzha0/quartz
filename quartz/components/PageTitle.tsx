import { pathToRoot } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  /* Default folder where icons are stored */
  iconFolderPath: string
  /* Default icon in case of there is no frontmatter icon key */
  defaultIcon?: string
}

const defaultOpts: Options = {
  iconFolderPath: "", //disable icons by default
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
    const iconFullPath = `${opts.iconFolderPath}/${iconType}.svg`
    return (
      <div
        class={classNames(displayClass, "page-title")}
        data-icon={iconFullPath}
        data-hasIcon={true}
      >
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

  PageTitle.afterDOMLoaded = `
const articleTitle = document.querySelector(".page-title[data-hasicon='true']")
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
  return PageTitle
}) satisfies QuartzComponentConstructor
