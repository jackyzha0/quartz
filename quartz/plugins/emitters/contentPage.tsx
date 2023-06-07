import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { StaticResources } from "../../resources"
import { EmitCallback, QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { render } from "preact-render-to-string"
import { HeadProps } from "../../components/Head"
import { GlobalConfiguration } from "../../cfg"
import { HeaderProps } from "../../components/Header"
import { QuartzComponent } from "../../components/types"
import { resolveToRoot } from "../../path"
import { BodyProps } from "../../components/Body"

interface Options {
  Head: QuartzComponent<HeadProps>
  Header: QuartzComponent<HeaderProps>
  Body: QuartzComponent<BodyProps>
}

export class ContentPage extends QuartzEmitterPlugin {
  name = "ContentPage"
  opts: Options

  constructor(opts: Options) {
    super()
    this.opts = opts
  }

  getQuartzComponents(): QuartzComponent<any>[] {
    return [...Object.values(this.opts)]
  }

  async emit(cfg: GlobalConfiguration, content: ProcessedContent[], resources: StaticResources, emit: EmitCallback): Promise<string[]> {
    const fps: string[] = []

    const { Head, Header, Body } = this.opts
    for (const [tree, file] of content) {
      // @ts-ignore (preact makes it angry)
      const content = toJsxRuntime(tree, { Fragment, jsx, jsxs, elementAttributeNameCase: 'html' })

      const baseDir = resolveToRoot(file.data.slug!)
      const pageResources: StaticResources = {
        css: [baseDir + "/index.css", ...resources.css,],
        js: [
          { src: baseDir + "/prescript.js", loadTime: "beforeDOMReady" },
          ...resources.js,
          { src: baseDir + "/postscript.js", loadTime: "afterDOMReady", type: 'module' }
        ]
      }

      const title = file.data.frontmatter?.title
      const doc = <html>
        <Head
          title={title ?? "Untitled"}
          description={file.data.description ?? "No description provided"}
          slug={file.data.slug!}
          externalResources={pageResources} />
        <body>
          <div id="quartz-root" class="page">
            <Header title={cfg.siteTitle} slug={file.data.slug!} />
            <Body title={file.data.slug === "index" ? undefined : title}>{content}</Body>
          </div>
        </body>
        {pageResources.js.filter(resource => resource.loadTime === "afterDOMReady").map(resource => <script key={resource.src} {...resource} />)}
      </html>

      const fp = file.data.slug + ".html"
      await emit({
        content: "<!DOCTYPE html>\n" + render(doc),
        slug: file.data.slug!,
        ext: ".html",
      })

      fps.push(fp)
    }
    return fps
  }
}
