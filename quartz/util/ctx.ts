import { QuartzConfig } from "../cfg"
import { FullSlug } from "./path"

export interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
  port: number
  concurrency?: number
}

export interface BuildCtx {
  argv: Argv
  cfg: QuartzConfig
  allSlugs: FullSlug[]
}
