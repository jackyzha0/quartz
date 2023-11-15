import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
export const Cname: QuartzEmitterPlugin = () => ({
  name: "Cname",
  getQuartzComponents() {
    return []
  },
  async emit({ argv, cfg }, _content, _resources, _emit): Promise<FilePath[]> {
    const path = joinSegments(argv.output, "CNAME")
    const content = cfg.configuration.baseUrl
    if (!content) {
      return []
    }
    fs.writeFileSync(path, content)
    return [joinSegments(argv.output, "CNAME")] as FilePath[]
  },
})
