import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { IconFolderOptions } from "../plugins/components/FileIcons"
import { FileTitleIcon } from "../plugins/components/FileIcons"

export default ((opts?: Partial<IconFolderOptions>) => {
  function ArticleTitle(props: QuartzComponentProps) {
    const { displayClass, fileData } = props
    const title = fileData.frontmatter?.title
    const iconType = (fileData.frontmatter?.icon as string) || opts?.default?.file
    if (title) {
      if (!opts?.rootIconFolder || !iconType) {
        return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
      }
      return (
        <FileTitleIcon displayClass={displayClass} opts={opts} iconType={iconType} title={title} />
      )
    } else {
      return null
    }
  }

  ArticleTitle.css = `
  .article-title {
    margin: 2rem 0 0 0;
  }
  `
  return ArticleTitle
}) satisfies QuartzComponentConstructor
