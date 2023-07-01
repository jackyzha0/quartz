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
  return {
    css: [baseDir + "/index.css", ...staticResources.css],
    js: [
      { src: baseDir + "/prescript.js", loadTime: "beforeDOMReady", contentType: "external" },
      ...staticResources.js,
      { src: baseDir + "/postscript.js", loadTime: "afterDOMReady", moduleType: 'module', contentType: "external" }
    ]
  }
}

export function renderPage(slug: string, componentData: QuartzComponentProps, components: RenderComponents, pageResources: StaticResources): string {
  const { head: Head, header, beforeBody, pageBody: Content, left, right, footer: Footer } = components
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  const doc = <html>
    <Head {...componentData} />
    <body data-slug={slug}>
      <div id="quartz-root" class="page">
        <Header {...componentData} >
          {header.map(HeaderComponent => <HeaderComponent {...componentData} />)}
        </Header>
        <div class="popover-hint">
          {beforeBody.map(BodyComponent => <BodyComponent {...componentData} />)}
        </div>
        <Body {...componentData}>
          <div class="left">
            {left.map(BodyComponent => <BodyComponent {...componentData} />)}
          </div>
          <div class="center popover-hint">
            <Content {...componentData} />
          </div>
          <div class="right">
            {right.map(BodyComponent => <BodyComponent {...componentData} />)}
          </div>
        </Body>
        <Footer {...componentData} />
      </div>
    </body>
    {pageResources.js.filter(resource => resource.loadTime === "afterDOMReady").map(res => JSResourceToScriptElement(res))}
  </html>

  return "<!DOCTYPE html>\n" + render(doc)
}
