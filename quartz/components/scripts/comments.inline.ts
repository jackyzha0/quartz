const changeGiscusTheme = (e: CustomEventMap["themechange"]) => {
  const theme = e.detail.theme
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement
  if (!iframe) {
    return
  }

  if (!iframe.contentWindow) {
    return
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: theme,
        },
      },
    },
    "https://giscus.app",
  )
}

type GiscusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict: string
    reactionsEnabled: string
    inputPosition: "top" | "bottom"
  }
}

function setupGiscus() {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return
  }

  const giscusScript = document.createElement("script")
  giscusScript.src = "https://giscus.app/client.js"
  giscusScript.async = true
  giscusScript.crossOrigin = "anonymous"
  giscusScript.setAttribute("data-loading", "lazy")
  giscusScript.setAttribute("data-emit-metadata", "0")
  giscusScript.setAttribute("data-repo", giscusContainer.dataset.repo)
  giscusScript.setAttribute("data-repo-id", giscusContainer.dataset.repoId)
  giscusScript.setAttribute("data-category", giscusContainer.dataset.category)
  giscusScript.setAttribute("data-category-id", giscusContainer.dataset.categoryId)
  giscusScript.setAttribute("data-mapping", giscusContainer.dataset.mapping)
  giscusScript.setAttribute("data-strict", giscusContainer.dataset.strict)
  giscusScript.setAttribute("data-reactions-enabled", giscusContainer.dataset.reactionsEnabled)
  giscusScript.setAttribute("data-input-position", giscusContainer.dataset.inputPosition)

  const theme = document.documentElement.getAttribute("saved-theme")
  if (theme) {
    giscusScript.setAttribute("data-theme", theme)
  }

  giscusContainer.appendChild(giscusScript)

  document.addEventListener("themechange", changeGiscusTheme)
  window.addCleanup(() => document.removeEventListener("themechange", changeGiscusTheme))
}

type CommentoElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    host: string
    cssOverride: string
    noFonts: string
    hideDeleted: string
  }
}

function setupCommento() {
  const commentoContainer = document.querySelector("#commento") as CommentoElement
  if (!commentoContainer) {
    return
  }

  const commentoScript = document.createElement("script")
  commentoScript.src = "https://" + commentoContainer.dataset.host + "/js/commento.js"
  commentoScript.defer = true
  commentoScript.setAttribute("data-css-override", commentoContainer.dataset.cssOverride)
  commentoScript.setAttribute("data-no-fonts", commentoContainer.dataset.noFonts)
  commentoScript.setAttribute("data-hide-deleted", commentoContainer.dataset.hideDeleted)

  commentoContainer.appendChild(commentoScript)
}

type DisqusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    shortName: string
  }
}

function setupDisqus() {
  const disqusContainer = document.querySelector("#disqus_thread") as DisqusElement
  if (!disqusContainer) {
    return
  }

  const disqusScript = document.createElement("script")
  disqusScript.src = "https://" + disqusContainer.dataset.shortName + ".disqus.com/embed.js"
  disqusScript.setAttribute("data-timestamp", "" + +new Date())

  disqusContainer.appendChild(disqusScript)
}

document.addEventListener("nav", () => {
  const commentContainer = document.querySelector("#comment")
  if (!commentContainer) {
    return
  }
  const provider = commentContainer.getAttribute("data-provider")
  switch (provider) {
    case "giscus":
      setupGiscus()
    case "commento":
      setupCommento()
    case "disqus":
      setupDisqus()
  }
})
