import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import DepGraph from "../../depgraph"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
  // glob all non MD files in content folder and copy it over
  return await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
}

export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    getQuartzComponents() {
      return []
    },
    async getDependencyGraph(ctx, _content, _resources) {
      const { argv, cfg } = ctx
      const graph = new DepGraph<FilePath>()

      const fps = await filesToCopy(argv, cfg)

      for (const fp of fps) {
        const ext = path.extname(fp)
        const src = joinSegments(argv.directory, fp) as FilePath
        const name = (slugifyFilePath(fp as FilePath, true) + ext) as FilePath

        const dest = joinSegments(argv.output, name) as FilePath

        graph.addEdge(src, dest)
      }

      return graph
    },
    async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
      const assetsPath = argv.output
      const fps = await filesToCopy(argv, cfg)
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
