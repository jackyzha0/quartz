import { QuartzComponentProps } from "./types"

export default function ArticleTitle({ fileData }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  const displayTitle = fileData.slug === "index" ? undefined : title
  if (displayTitle) {
    return <h1>{displayTitle}</h1>
  } else {
    return null
  }
}
