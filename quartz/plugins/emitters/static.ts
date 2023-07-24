import { globby } from "globby"
import { FilePath, QUARTZ } from "../../path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  getQuartzComponents() {
    return []
  },
  async emit({ argv }, _content, _resources, _emit): Promise<FilePath[]> {
    const staticPath = path.join(QUARTZ, "static")
    const fps = await globby("*", { cwd: staticPath })
    await fs.promises.cp(staticPath, path.join(argv.output, "static"), { recursive: true })
    return fps.map((fp) => path.join("static", fp)) as FilePath[]
  },
})
