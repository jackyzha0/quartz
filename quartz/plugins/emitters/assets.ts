import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"

export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    getQuartzComponents() {
      return []
    },
    async emit({ argv, cfg }, _content, _resources, _emit): Promise<FilePath[]> {
      // glob all non MD/MDX/HTML files in content folder and copy it over
      const assetsPath = argv.output
      const fps = await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
      const res: FilePath[] = []
      for (const fp of fps) {
        const ext = path.extname(fp)
        const src = joinSegments(argv.directory, fp) as FilePath
        const name = (slugifyFilePath(fp as FilePath, true) + ext) as FilePath

        const dest = joinSegments(assetsPath, name) as FilePath
        const dir = path.dirname(dest) as FilePath
        await fs.promises.mkdir(dir, { recursive: true }) // ensure dir exists
        await fs.promises.copyFile(src, dest)
        res.push(dest)
      }

      return res
    },
  }
}
