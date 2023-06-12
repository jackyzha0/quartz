import { resolveToRoot } from "../path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ cfg, fileData }: QuartzComponentProps) {
  const title = cfg.siteTitle
  const slug = fileData.slug!
  const baseDir = resolveToRoot(slug)
  return <h1><a href={baseDir}>{title}</a></h1>
}

export default (() => PageTitle) satisfies QuartzComponentConstructor
