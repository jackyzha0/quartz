import { JSResourceToScriptElement, StaticResources } from "../../resources"
import { QuartzEmitterPlugin } from "../types"
import { render } from "preact-render-to-string"
import { QuartzComponent } from "../../components/types"
import { resolveToRoot } from "../../path"
import HeaderConstructor from "../../components/Header"
import { QuartzComponentProps } from "../../components/types"
import BodyConstructor from "../../components/Body"

interface Options {
  head: QuartzComponent
  header: QuartzComponent[],
  body: QuartzComponent[],
  left: QuartzComponent[],
  right: QuartzComponent[],
  footer: QuartzComponent[],
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
      return [opts.head, Header, Body, ...opts.header, ...opts.body, ...opts.left, ...opts.right, ...opts.footer]
    },
    async emit(_contentDir, cfg, content, resources, emit): Promise<string[]> {
      const fps: string[] = []

      for (const [tree, file] of content) {
        const baseDir = resolveToRoot(file.data.slug!)
        const pageResources: StaticResources = {
          css: [baseDir + "/index.css", ...resources.css],
          js: [
            { src: baseDir + "/prescript.js", loadTime: "beforeDOMReady", contentType: "external" },
            ...resources.js,
            { src: baseDir + "/postscript.js", loadTime: "afterDOMReady", moduleType: 'module', contentType: "external" }
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
          <body data-slug={file.data.slug}>
            <div id="quartz-root" class="page">
              <Header {...componentData} >
                {header.map(HeaderComponent => <HeaderComponent {...componentData} />)}
              </Header>
              <Body {...componentData}>
                {body.map(BodyComponent => <BodyComponent {...componentData} />)}
              </Body>
            </div>
          </body>
          {pageResources.js.filter(resource => resource.loadTime === "afterDOMReady").map(res => JSResourceToScriptElement(res))}
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
