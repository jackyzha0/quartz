import { resolveToRoot } from "../path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  title: string
}

export default ((opts?: Options) => {
  const title = opts?.title ?? "Untitled Quartz"
  function PageTitle({ fileData }: QuartzComponentProps) {
    const slug = fileData.slug!
    const baseDir = resolveToRoot(slug)
    return <h1 class="page-title"><a href={baseDir}>{title}</a></h1>
  }
  PageTitle.css = `
  .page-title {
    margin: 0;
  }
  `

  return PageTitle
}) satisfies QuartzComponentConstructor
