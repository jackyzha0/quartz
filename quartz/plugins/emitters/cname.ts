import { QuartzEmitterPlugin } from "../types"

interface Options {
  domain: string
}

export const CNAME: QuartzEmitterPlugin<Options> = (opts?: Options) => ({
  name: "CNAME",
  getQuartzComponents() {
    return []
  },
  async emit(_contentFolder, _cfg, _content, _resources, emit): Promise<string[]> {
    const slug = "CNAME"

    if (opts?.domain) {
      await emit({
        content: opts?.domain,
        slug,
        ext: "",
      })
    }

    return ["CNAME"]
  }
})
