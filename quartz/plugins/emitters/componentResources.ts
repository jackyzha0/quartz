import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"

// @ts-ignore
import spaRouterScript from "../../components/scripts/spa.inline"
// @ts-ignore
import popoverScript from "../../components/scripts/popover.inline"
import styles from "../../styles/custom.scss"
import popoverStyle from "../../components/styles/popover.scss"
import { BuildCtx } from "../../util/ctx"
import { StaticResources } from "../../util/resources"
import { QuartzComponent } from "../../components/types"
import { googleFontHref, joinStyles } from "../../util/theme"
import { Features, transform } from "lightningcss"
import { transform as transpile } from "esbuild"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

type ComponentResources = {
  css: string[]
  beforeDOMLoaded: string[]
  afterDOMLoaded: string[]
}

function getComponentResources(ctx: BuildCtx): ComponentResources {
  const allComponents: Set<QuartzComponent> = new Set()
  for (const emitter of ctx.cfg.plugins.emitters) {
    const components = emitter.getQuartzComponents(ctx)
    for (const component of components) {
      allComponents.add(component)
    }
  }

  const componentResources = {
    css: new Set<string>(),
    beforeDOMLoaded: new Set<string>(),
    afterDOMLoaded: new Set<string>(),
  }

  for (const component of allComponents) {
    const { css, beforeDOMLoaded, afterDOMLoaded } = component
    if (css) {
      componentResources.css.add(css)
    }
    if (beforeDOMLoaded) {
      componentResources.beforeDOMLoaded.add(beforeDOMLoaded)
    }
    if (afterDOMLoaded) {
      componentResources.afterDOMLoaded.add(afterDOMLoaded)
    }
  }

  return {
    css: [...componentResources.css],
    beforeDOMLoaded: [...componentResources.beforeDOMLoaded],
    afterDOMLoaded: [...componentResources.afterDOMLoaded],
  }
}

async function joinScripts(scripts: string[]): Promise<string> {
  // wrap with iife to prevent scope collision
  const script = scripts.map((script) => `(function () {${script}})();`).join("\n")

  // minify with esbuild
  const res = await transpile(script, {
    minify: true,
  })

  return res.code
}

function addGlobalPageResources(
  ctx: BuildCtx,
  staticResources: StaticResources,
  componentResources: ComponentResources,
) {
  const cfg = ctx.cfg.configuration
  const reloadScript = ctx.argv.serve

  // popovers
  if (cfg.enablePopovers) {
    componentResources.afterDOMLoaded.push(popoverScript)
    componentResources.css.push(popoverStyle)
  }

  if (cfg.analytics?.provider === "google") {
    const tagId = cfg.analytics.tagId
    staticResources.js.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${tagId}`,
      contentType: "external",
      loadTime: "afterDOMReady",
    })
    componentResources.afterDOMLoaded.push(`
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "${tagId}", { send_page_view: false });

      document.addEventListener("nav", () => {
        gtag("event", "page_view", {
          page_title: document.title,
          page_location: location.href,
        });
      });`)
  } else if (cfg.analytics?.provider === "plausible") {
    const plausibleHost = cfg.analytics.host ?? "https://plausible.io"
    componentResources.afterDOMLoaded.push(`
      const plausibleScript = document.createElement("script")
      plausibleScript.src = "${plausibleHost}/js/script.manual.js"
      plausibleScript.setAttribute("data-domain", location.hostname)
      plausibleScript.defer = true
      document.head.appendChild(plausibleScript)

      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

      document.addEventListener("nav", () => {
        plausible("pageview")
      })
    `)
  } else if (cfg.analytics?.provider === "umami") {
    componentResources.afterDOMLoaded.push(`
      const umamiScript = document.createElement("script")
      umamiScript.src = ${cfg.analytics.host} ?? "https://analytics.umami.is/script.js"
      umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}")
      umamiScript.async = true

      document.head.appendChild(umamiScript)
    `)
  }

  if (cfg.enableSPA) {
    componentResources.afterDOMLoaded.push(spaRouterScript)
  } else {
    componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      window.addCleanup = () => {}
      const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
      document.dispatchEvent(event)
    `)
  }

  let wsUrl = `ws://localhost:${ctx.argv.wsPort}`

  if (ctx.argv.remoteDevHost) {
    wsUrl = `wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`
  }

  if (reloadScript) {
    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "inline",
      script: `
          const socket = new WebSocket('${wsUrl}')
          // reload(true) ensures resources like images and scripts are fetched again in firefox
          socket.addEventListener('message', () => document.location.reload(true))
        `,
    })
  }
}

interface Options {
  fontOrigin: "googleFonts" | "local"
}

const defaultOptions: Options = {
  fontOrigin: "googleFonts",
}

export const ComponentResources: QuartzEmitterPlugin<Options> = (opts?: Partial<Options>) => {
  const { fontOrigin } = { ...defaultOptions, ...opts }
  return {
    name: "ComponentResources",
    getQuartzComponents() {
      return []
    },
    async getDependencyGraph(ctx, content, _resources) {
      // This emitter adds static resources to the `resources` parameter. One
      // important resource this emitter adds is the code to start a websocket
      // connection and listen to rebuild messages, which triggers a page reload.
      // The resources parameter with the reload logic is later used by the
      // ContentPage emitter while creating the final html page. In order for
      // the reload logic to be included, and so for partial rebuilds to work,
      // we need to run this emitter for all markdown files.
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!
        const slug = file.data.slug!
        graph.addEdge(sourcePath, joinSegments(ctx.argv.output, slug + ".html") as FilePath)
      }

      return graph
    },
    async emit(ctx, _content, resources): Promise<FilePath[]> {
      const promises: Promise<FilePath>[] = []
      const cfg = ctx.cfg.configuration
      // component specific scripts and styles
      const componentResources = getComponentResources(ctx)
      // important that this goes *after* component scripts
      // as the "nav" event gets triggered here and we should make sure
      // that everyone else had the chance to register a listener for it

      let googleFontsStyleSheet = ""
      if (fontOrigin === "local") {
        // let the user do it themselves in css
      } else if (fontOrigin === "googleFonts") {
        if (cfg.theme.cdnCaching) {
          resources.css.push(googleFontHref(cfg.theme))
        } else {
          let match

          const fontSourceRegex = /url\((https:\/\/fonts.gstatic.com\/s\/[^)]+\.(woff2|ttf))\)/g

          googleFontsStyleSheet = await (
            await fetch(googleFontHref(ctx.cfg.configuration.theme))
          ).text()

          while ((match = fontSourceRegex.exec(googleFontsStyleSheet)) !== null) {
            // match[0] is the `url(path)`, match[1] is the `path`
            const url = match[1]
            // the static name of this file.
            const [filename, ext] = url.split("/").pop()!.split(".")

            googleFontsStyleSheet = googleFontsStyleSheet.replace(url, `/fonts/${filename}.ttf`)

            promises.push(
              fetch(url)
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`Failed to fetch font`)
                  }
                  return res.arrayBuffer()
                })
                .then((buf) =>
                  write({
                    ctx,
                    slug: joinSegments("fonts", filename) as FullSlug,
                    ext: `.${ext}`,
                    content: Buffer.from(buf),
                  }),
                ),
            )
          }
        }
      }

      addGlobalPageResources(ctx, resources, componentResources)

      const stylesheet = joinStyles(
        ctx.cfg.configuration.theme,
        ...componentResources.css,
        googleFontsStyleSheet,
        styles,
      )
      const [prescript, postscript] = await Promise.all([
        joinScripts(componentResources.beforeDOMLoaded),
        joinScripts(componentResources.afterDOMLoaded),
      ])

      promises.push(
        write({
          ctx,
          slug: "index" as FullSlug,
          ext: ".css",
          content: transform({
            filename: "index.css",
            code: Buffer.from(stylesheet),
            minify: true,
            targets: {
              safari: (15 << 16) | (6 << 8), // 15.6
              ios_saf: (15 << 16) | (6 << 8), // 15.6
              edge: 115 << 16,
              firefox: 102 << 16,
              chrome: 109 << 16,
            },
            include: Features.MediaQueries,
          }).code.toString(),
        }),
        write({
          ctx,
          slug: "prescript" as FullSlug,
          ext: ".js",
          content: prescript,
        }),
        write({
          ctx,
          slug: "postscript" as FullSlug,
          ext: ".js",
          content: postscript,
        }),
      )

      return await Promise.all(promises)
    },
  }
}
