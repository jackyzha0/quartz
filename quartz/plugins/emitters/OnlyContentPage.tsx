import { OnlyContentPageLayout, sharedPageComponents } from "../../../layouts/OnlyLayout"
import Content from "../../components/pages/Content"
import { pageResources, renderPage } from "../../components/renderPage" // Update this line
import { QuartzComponentProps } from "../../components/types"
import { FilePath, pathToRoot } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const OnlyContentPage: QuartzEmitterPlugin = () => {
  const layout = {
    ...sharedPageComponents,
    ...OnlyContentPageLayout,
    pageBody: Content(),
  }

  const { head, header, beforeBody, pageBody, afterBody, footer } = layout

  return {
    name: "OnlyContentPage",
    getQuartzComponents() {
      return [head, ...header, ...beforeBody, pageBody, ...afterBody, footer]
    },
    async emit(ctx, content, resources) {
      const cfg = ctx.cfg.configuration
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const externalResources = pageResources(pathToRoot(slug), resources)
        const componentData: QuartzComponentProps = {
          ctx,
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        const htmlContent = renderPage(cfg, slug, componentData, layout, externalResources)
        const fp = (await write({
          ctx,
          content: htmlContent,
          slug,
          ext: ".html",
        })) as FilePath

        fps.push(fp)
      }

      return fps
    },
  }
}
