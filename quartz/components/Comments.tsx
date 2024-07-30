import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = (_props: QuartzComponentProps) => <div class="giscus"></div>

  Comments.afterDOMLoaded = `
    const changeTheme = (e) => {
      const theme = e.detail.theme
      const iframe = document.querySelector('iframe.giscus-frame')
      if (!iframe) {
        return
      }

      iframe.contentWindow.postMessage({
        giscus: {
          setConfig: {
            theme: theme
          }
        }
      }, 'https://giscus.app')
    }

    document.addEventListener("nav", () => {
      const giscusContainer = document.querySelector(".giscus")
      const giscusScript = document.createElement("script")
      giscusScript.src = "https://giscus.app/client.js"
      giscusScript.async = true
      giscusScript.crossOrigin = "anonymous"
      giscusScript.setAttribute("data-loading", "lazy")
      giscusScript.setAttribute("data-emit-metadata", "0")
      giscusScript.setAttribute("data-repo", "${opts.options.repo}")
      giscusScript.setAttribute("data-repo-id", "${opts.options.repoId}")
      giscusScript.setAttribute("data-category", "${opts.options.category}")
      giscusScript.setAttribute("data-category-id", "${opts.options.categoryId}")
      giscusScript.setAttribute("data-mapping", "${opts.options.mapping ?? "url"}")
      giscusScript.setAttribute("data-strict", "${boolToStringBool(opts.options.strict ?? true)}")
      giscusScript.setAttribute("data-reactions-enabled", "${boolToStringBool(opts.options.reactionsEnabled ?? true)}")
      giscusScript.setAttribute("data-input-position", "${opts.options.inputPosition ?? "bottom"}")

      const theme = document.documentElement.getAttribute("saved-theme")
      giscusScript.setAttribute("data-theme", theme)
      giscusContainer.appendChild(giscusScript)

      document.addEventListener("themechange", changeTheme)
      window.addCleanup(() => document.removeEventListener("themechange", changeTheme))
    })`

  return Comments
}) satisfies QuartzComponentConstructor<Options>
