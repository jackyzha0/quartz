import { StaticResources } from "../util/resources"
import { BuildCtx } from "../util/ctx"

export function getStaticResourcesFromPlugins(ctx: BuildCtx) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
    additionalHead: [],
  }

  for (const transformer of [...ctx.cfg.plugins.transformers, ...ctx.cfg.plugins.emitters]) {
    const res = transformer.externalResources ? transformer.externalResources(ctx) : {}
    if (res?.js) {
      staticResources.js.push(...res.js)
    }
    if (res?.css) {
      staticResources.css.push(...res.css)
    }
    if (res?.additionalHead) {
      staticResources.additionalHead.push(...res.additionalHead)
    }
  }

  // if serving locally, listen for rebuilds and reload the page
  if (ctx.argv.serve) {
    const wsHost = ctx.argv.remoteDevHost || "localhost"

    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "inline",
      script: `
        // the dev server speaks plain ws unless it sits behind a TLS proxy,
        // so follow the page instead of assuming
        const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
        const socket = new WebSocket(\`\${wsProtocol}//${wsHost}:${ctx.argv.wsPort}\`)
        // reload(true) ensures resources like images and scripts are fetched again in firefox
        socket.addEventListener('message', () => document.location.reload(true))
      `,
    })
  }

  return staticResources
}

export * from "./transformers"
export * from "./filters"
export * from "./emitters"
export * from "./types"
export * from "./config"
export * as PageTypes from "./pageTypes"
export * as PluginLoader from "./loader"
