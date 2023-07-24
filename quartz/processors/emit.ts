import path from "path"
import fs from "fs"
import { PerfTimer } from "../perf"
import {
  ComponentResources,
  emitComponentResources,
  getComponentResources,
  getStaticResourcesFromPlugins,
} from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"
import { FilePath } from "../path"

// @ts-ignore
import spaRouterScript from "../components/scripts/spa.inline"
// @ts-ignore
import plausibleScript from "../components/scripts/plausible.inline"
// @ts-ignore
import popoverScript from "../components/scripts/popover.inline"
import popoverStyle from "../components/styles/popover.scss"
import { StaticResources } from "../resources"
import { QuartzLogger } from "../log"
import { googleFontHref } from "../theme"
import { trace } from "../trace"
import { BuildCtx } from "../ctx"

function addGlobalPageResources(
  ctx: BuildCtx,
  staticResources: StaticResources,
  componentResources: ComponentResources,
) {
  const cfg = ctx.cfg.configuration
  const reloadScript = ctx.argv.serve
  staticResources.css.push(googleFontHref(cfg.theme))

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
    gtag(\`js\`, new Date());
    gtag(\`config\`, \`${tagId}\`, { send_page_view: false });

    document.addEventListener(\`nav\`, () => {
      gtag(\`event\`, \`page_view\`, {
        page_title: document.title,
        page_location: location.href,
      });
    });`)
  } else if (cfg.analytics?.provider === "plausible") {
    componentResources.afterDOMLoaded.push(plausibleScript)
  }

  // spa
  if (cfg.enableSPA) {
    componentResources.afterDOMLoaded.push(spaRouterScript)
  } else {
    componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      const event = new CustomEvent("nav", { detail: { slug: document.body.dataset.slug } })
      document.dispatchEvent(event)`)
  }

  if (reloadScript) {
    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "inline",
      script: `
        const socket = new WebSocket('ws://localhost:3001')
        socket.addEventListener('message', () => document.location.reload())
      `,
    })
  }
}

export async function emitContent(
  ctx: BuildCtx,
  content: ProcessedContent[],
) {
  const { argv, cfg }= ctx
  const contentFolder = argv.directory
  const perf = new PerfTimer()
  const log = new QuartzLogger(ctx.argv.verbose)

  log.start(`Emitting output files`)
  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = path.join(argv.output, slug + ext) as FilePath
    const dir = path.dirname(pathToPage)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(pathToPage, content)
    return pathToPage
  }

  // initialize from plugins
  const staticResources = getStaticResourcesFromPlugins(cfg.plugins)

  // component specific scripts and styles
  const componentResources = getComponentResources(cfg.plugins)

  // important that this goes *after* component scripts
  // as the "nav" event gets triggered here and we should make sure
  // that everyone else had the chance to register a listener for it
  addGlobalPageResources(ctx, staticResources, componentResources)

  let emittedFiles = 0
  const emittedResources = await emitComponentResources(cfg.configuration, componentResources, emit)
  if (argv.verbose) {
    for (const file of emittedResources) {
      emittedFiles += 1
      console.log(`[emit:Resources] ${file}`)
    }
  }

  // emitter plugins
  for (const emitter of cfg.plugins.emitters) {
    try {
      const emitted = await emitter.emit(
        ctx,
        content,
        staticResources,
        emit,
      )
      emittedFiles += emitted.length

      if (ctx.argv.verbose) {
        for (const file of emitted) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
    } catch (err) {
      trace(`Failed to emit from plugin \`${emitter.name}\``, err as Error)
      throw err
    }
  }

  log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)
}
