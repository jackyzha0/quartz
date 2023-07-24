import { QuartzConfig } from "./cfg"
import { ServerSlug } from "./path"

export interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
  port: number
}

export interface BuildCtx {
  argv: Argv
  cfg: QuartzConfig
  allSlugs: ServerSlug[]
}
