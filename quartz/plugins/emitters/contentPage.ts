import { resolveToRoot } from "../../path"
import { EmitCallback, QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"

export class ContentPage extends QuartzEmitterPlugin {
  name = "ContentPage"
  async emit(content: ProcessedContent[], emit: EmitCallback): Promise<string[]> {
    const fps: string[] = []
    for (const [tree, file] of content) {
      const pathToRoot = resolveToRoot(file.data.slug!)

      const fp = file.data.slug + ".html"
      await emit({
        title: file.data.frontmatter?.title ?? "Untitled",
        description: file.data.description ?? "",
        slug: file.data.slug!,
        ext: ".html",
      })

      // TODO: process aliases

      fps.push(fp)
    }
    return fps
  }
}
