import path from "path"
import fs from "fs"
import { GlobalConfiguration, QuartzConfig } from "../cfg"
import { PerfTimer } from "../perf"
import { ComponentResources, emitComponentResources, getComponentResources, getStaticResourcesFromPlugins } from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"
import { FilePath, QUARTZ, slugifyFilePath } from "../path"
import { globbyStream } from "globby"
import chalk from "chalk"

// @ts-ignore
import spaRouterScript from '../components/scripts/spa.inline'
// @ts-ignore
import plausibleScript from '../components/scripts/plausible.inline'
// @ts-ignore
import popoverScript from '../components/scripts/popover.inline'
import popoverStyle from '../components/styles/popover.scss'
import { StaticResources } from "../resources"
import { QuartzLogger } from "../log"
import { googleFontHref } from "../theme"
import { trace } from "../trace"

function addGlobalPageResources(cfg: GlobalConfiguration, staticResources: StaticResources, componentResources: ComponentResources) {
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
      contentType: 'external',
      loadTime: 'afterDOMReady',
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
    });`
    )
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
      document.dispatchEvent(event)`
    )
  }
}

export async function emitContent(contentFolder: string, output: string, cfg: QuartzConfig, content: ProcessedContent[], verbose: boolean) {
  const perf = new PerfTimer()
  const log = new QuartzLogger(verbose)

  log.start(`Emitting output files`)
  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = path.join(output, slug + ext) as FilePath
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
  addGlobalPageResources(cfg.configuration, staticResources, componentResources)

  // emit in one go
  const emittedResources = await emitComponentResources(cfg.configuration, componentResources, emit)
  if (verbose) {
    for (const file of emittedResources) {
      console.log(`[emit:Resources] ${file}`)
    }
  }

  // emitter plugins
  let emittedFiles = 0
  for (const emitter of cfg.plugins.emitters) {
    try {
      const emitted = await emitter.emit(contentFolder, cfg.configuration, content, staticResources, emit)
      emittedFiles += emitted.length

      if (verbose) {
        for (const file of emitted) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
    } catch (err) {
      trace(`Failed to emit from plugin \`${emitter.name}\``, err as Error)
      process.exit(1)
    }
  }

  const staticPath = path.join(QUARTZ, "static")
  await fs.promises.cp(staticPath, path.join(output, "static"), { recursive: true })
  if (verbose) {
    console.log(`[emit:Static] ${path.join("static", "**")}`)
  }

  // glob all non MD/MDX/HTML files in content folder and copy it over
  const assetsPath = path.join(output, "assets")
  for await (const rawFp of globbyStream("**", {
    ignore: ["**/*.md"],
    cwd: contentFolder,
  })) {
    const fp = rawFp as FilePath
    const ext = path.extname(fp)
    const src = path.join(contentFolder, fp) as FilePath
    const name = slugifyFilePath(fp as FilePath) + ext as FilePath
    const dest = path.join(assetsPath, name) as FilePath
    const dir = path.dirname(dest) as FilePath
    await fs.promises.mkdir(dir, { recursive: true }) // ensure dir exists
    await fs.promises.copyFile(src, dest)
    emittedFiles += 1
    if (verbose) {
      console.log(`[emit:Assets] ${path.join("assets", name)}`)
    }
  }

  log.success(`Emitted ${emittedFiles} files to \`${output}\` in ${perf.timeSince()}`)
}
