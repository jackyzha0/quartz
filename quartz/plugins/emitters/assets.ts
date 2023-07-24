import { globbyStream } from "globby"
import {
  FilePath, slugifyFilePath,
} from "../../path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"

export const Assets: QuartzEmitterPlugin = () => ({
  name: "Assets",
  getQuartzComponents() {
    return []
  },
  async emit({ argv }, _content, _resources, _emit): Promise<FilePath[]> {
    // glob all non MD/MDX/HTML files in content folder and copy it over
    const assetsPath = path.join(argv.output, "assets")

    const fps: FilePath[] = []
    for await (const rawFp of globbyStream("**", {
      ignore: ["**/*.md"],
      cwd: argv.directory,
    })) {
      const fp = rawFp as FilePath
      const ext = path.extname(fp)
      const src = path.join(argv.directory, fp) as FilePath
      const name = (slugifyFilePath(fp as FilePath) + ext) as FilePath
      const dest = path.join(assetsPath, name) as FilePath
      const dir = path.dirname(dest) as FilePath
      await fs.promises.mkdir(dir, { recursive: true }) // ensure dir exists
      await fs.promises.copyFile(src, dest)
      fps.push(path.join("assets", fp) as FilePath)
    }

    return fps
  },
})
