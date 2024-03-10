import { QuartzConfig } from "../cfg"
import { FullSlug } from "./path"

export interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
  fastRebuild: boolean
  port: number
  wsPort: number
  remoteDevHost?: string
  concurrency?: number
}

export interface BuildCtx {
  argv: Argv
  cfg: QuartzConfig
  allSlugs: FullSlug[]
}
