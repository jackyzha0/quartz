import { render } from "preact-render-to-string";
import { QuartzComponent, QuartzComponentProps } from "./types";
import HeaderConstructor from "./Header"
import BodyConstructor from "./Body"
import { JSResourceToScriptElement, StaticResources } from "../resources";
import { resolveToRoot } from "../path";

interface RenderComponents {
  head: QuartzComponent
  header: QuartzComponent[],
  beforeBody: QuartzComponent[],
  pageBody: QuartzComponent,
  left: QuartzComponent[],
  right: QuartzComponent[],
  footer: QuartzComponent,
}

export function pageResources(slug: string, staticResources: StaticResources): StaticResources {
  const baseDir = resolveToRoot(slug)

  const contentIndexPath = baseDir + "/static/contentIndex.json"
  const contentIndexScript = `const fetchData = fetch(\`${contentIndexPath}\`).then(data => data.json())`

  return {
    css: [baseDir + "/index.css", ...staticResources.css],
    js: [
      { src: baseDir + "/prescript.js", loadTime: "beforeDOMReady", contentType: "external" },
      { loadTime: "beforeDOMReady", contentType: "inline", spaPreserve: true, script: contentIndexScript },
      ...staticResources.js,
      { src: baseDir + "/postscript.js", loadTime: "afterDOMReady", moduleType: 'module', contentType: "external" }
    ]
  }
}

export function renderPage(slug: string, componentData: QuartzComponentProps, components: RenderComponents, pageResources: StaticResources): string {
  const { head: Head, header, beforeBody, pageBody: Content, left, right, footer: Footer } = components
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  const LeftComponent =
    <div class="left">
      <div class="left-inner">
        {left.map(BodyComponent => <BodyComponent {...componentData} />)}
      </div>
    </div>

  const RightComponent =
    <div class="right">
      <div class="right-inner">
        {right.map(BodyComponent => <BodyComponent {...componentData} />)}
      </div>
    </div>

  const doc = <html>
    <Head {...componentData} />
    <body data-slug={slug}>
      <div id="quartz-root" class="page">
        <Body {...componentData}>
          {LeftComponent}
          <div class="center">
            <div class="page-header">
              <Header {...componentData} >
                {header.map(HeaderComponent => <HeaderComponent {...componentData} />)}
              </Header>
              <div class="popover-hint">
                {beforeBody.map(BodyComponent => <BodyComponent {...componentData} />)}
              </div>
            </div>
            <Content {...componentData} />
          </div>
          {RightComponent}
        </Body>
        <Footer {...componentData} />
      </div>
    </body>
    {pageResources.js.filter(resource => resource.loadTime === "afterDOMReady").map(res => JSResourceToScriptElement(res))}
  </html>

  return "<!DOCTYPE html>\n" + render(doc)
}
