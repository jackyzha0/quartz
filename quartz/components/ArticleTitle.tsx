import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ArticleTitle({ fileData }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  const displayTitle = fileData.slug === "index" ? undefined : title
  if (displayTitle) {
    return <h1>{displayTitle}</h1>
  } else {
    return null
  }
}

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
