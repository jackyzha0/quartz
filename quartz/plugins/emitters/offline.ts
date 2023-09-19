import { QuartzEmitterPlugin } from "../types"
import { FilePath, FullSlug } from "../../util/path"

export const Offline: QuartzEmitterPlugin = () => {
  return {
    name: "OfflineSupport",
    getQuartzComponents() {
      return []
    },
    async emit({ cfg }, _content, _resources, emit): Promise<FilePath[]> {
      const manifest = {
        short_name: cfg.configuration.pageTitle,
        name: cfg.configuration.pageTitle,
        description: cfg.configuration.description,
        background_color: cfg.configuration.theme.colors.lightMode.light,
        theme_color: cfg.configuration.theme.colors.lightMode.light,
        display: "minimal-ui",
        icons: [
          {
            src: "static/icon.svg",
            sizes: "any",
            purpose: "maskable",
          },
          {
            src: "static/icon.svg",
            sizes: "any",
            purpose: "any",
          },
        ],
        start_url: "/",
      }

      const serviceWorker =
        "importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');" +
        "const {pageCache, imageCache, staticResourceCache, googleFontsCache, offlineFallback} = workbox.recipes;" +
        "pageCache(); googleFontsCache(); staticResourceCache(); imageCache();offlineFallback();"

      return Promise.all([
        emit({
          content: JSON.stringify(manifest),
          slug: "manifest" as FullSlug,
          ext: ".json",
        }),
        emit({
          content: serviceWorker,
          slug: "sw" as FullSlug,
          ext: ".js",
        }),
      ])
    },
  }
}
