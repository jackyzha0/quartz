import { FilePath, FullSlug } from "../../util/path"
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
      umamiScript.src = "https://analytics.umami.is/script.js"
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
        const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
        document.dispatchEvent(event)`)
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
          socket.addEventListener('message', () => document.location.reload())
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
    async emit(ctx, _content, resources, emit): Promise<FilePath[]> {
      // component specific scripts and styles
      const componentResources = getComponentResources(ctx)
      // important that this goes *after* component scripts
      // as the "nav" event gets triggered here and we should make sure
      // that everyone else had the chance to register a listener for it

      if (fontOrigin === "googleFonts") {
        resources.css.push(googleFontHref(ctx.cfg.configuration.theme))
      } else if (fontOrigin === "local") {
        // let the user do it themselves in css
      }

      addGlobalPageResources(ctx, resources, componentResources)

      const stylesheet = joinStyles(ctx.cfg.configuration.theme, ...componentResources.css, styles)
      const [prescript, postscript] = await Promise.all([
        joinScripts(componentResources.beforeDOMLoaded),
        joinScripts(componentResources.afterDOMLoaded),
      ])

      const fps = await Promise.all([
        emit({
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
        emit({
          slug: "prescript" as FullSlug,
          ext: ".js",
          content: prescript,
        }),
        emit({
          slug: "postscript" as FullSlug,
          ext: ".js",
          content: postscript,
        }),
      ])
      return fps
    },
  }
}
