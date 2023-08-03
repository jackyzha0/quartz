import { FilePath, QUARTZ, joinSegments } from "../../path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../glob"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  getQuartzComponents() {
    return []
  },
  async emit({ argv, cfg }, _content, _resources, _emit): Promise<FilePath[]> {
    const staticPath = path.join(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    await fs.promises.cp(staticPath, joinSegments(argv.output, "static"), { recursive: true })
    return fps.map((fp) => joinSegments("static", fp)) as FilePath[]
  },
})
