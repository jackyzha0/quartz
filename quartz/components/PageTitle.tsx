import { resolveToRoot } from "../path"
import { QuartzComponentProps } from "./types"

export default function({ cfg, fileData }: QuartzComponentProps) {
  const title = cfg.siteTitle
  const slug = fileData.slug!
  const baseDir = resolveToRoot(slug)
  return <h1><a href={baseDir}>{title}</a></h1>
}
