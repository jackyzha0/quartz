import { StaticResources } from "../../resources"
import { EmitCallback, QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"
import { render } from "preact-render-to-string"
import { GlobalConfiguration } from "../../cfg"
import { QuartzComponent } from "../../components/types"
import { resolveToRoot } from "../../path"
import HeaderConstructor from "../../components/Header"
import { QuartzComponentProps } from "../../components/types"
import BodyConstructor from "../../components/Body"

interface Options {
  head: QuartzComponent
  header: QuartzComponent[],
  body: QuartzComponent[]
}

export const ContentPage: QuartzEmitterPlugin<Options> = (opts) => {
  if (!opts) {
    throw new Error("ContentPage must be initialized with options specifiying the components to use")
  }

  const { head: Head, header, body } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "ContentPage",
    getQuartzComponents() {
      return [opts.head, Header, ...opts.header, ...opts.body]
    },
    async emit(cfg: GlobalConfiguration, content: ProcessedContent[], resources: StaticResources, emit: EmitCallback): Promise<string[]> {
      const fps: string[] = []

      for (const [tree, file] of content) {
        const baseDir = resolveToRoot(file.data.slug!)
        const pageResources: StaticResources = {
          css: [baseDir + "/index.css", ...resources.css],
          js: [
            { src: baseDir + "/prescript.js", loadTime: "beforeDOMReady" },
            ...resources.js,
            { src: baseDir + "/postscript.js", loadTime: "afterDOMReady", type: 'module' }
          ]
        }

        const componentData: QuartzComponentProps = {
          fileData: file.data,
          externalResources: pageResources,
          cfg,
          children: [],
          tree
        }

        const doc = <html>
          <Head {...componentData} />
          <body>
            <div id="quartz-root" class="page">
              <Header {...componentData} >
                {header.map(HeaderComponent => <HeaderComponent {...componentData} />)}
              </Header>
              <Body {...componentData}>
                {body.map(BodyComponent => <BodyComponent {...componentData} />)}
              </Body>
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
}
