import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import { glob } from "../../util/glob"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  getQuartzComponents() {
    return []
  },
  async emit({ argv, cfg }, _content, _resources, _emit): Promise<FilePath[]> {
    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    await fs.promises.cp(staticPath, joinSegments(argv.output, "static"), { recursive: true })
    return fps.map((fp) => joinSegments(argv.output, "static", fp)) as FilePath[]
  },
})
