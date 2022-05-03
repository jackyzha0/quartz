import { router, navigate } from "https://unpkg.com/million/dist/router.mjs"

export const init = (loader) => {
  // SPA navigation for access later
  window.navigate = navigate
  // We only mutate document.title and content within .singlePage element
  router(".singlePage")
  // We need on initial load, then subsequent redirs
  window.addEventListener("million:navigate", () => callback(loader))
  window.addEventListener("DOMContentLoaded", () => callback(loader))
}

export const callback = (loader) => {
  // requestAnimationFrame() delays graph draw until SPA routing is finished
  const draw = () => {
    const container = document.getElementById("graph-container")
    // retry if the graph is not ready
    if (!container) return requestAnimationFrame(draw)
    // clear the graph in case there is anything within it
    container.textContent = ""

    loader()
  }
  requestAnimationFrame(draw)
}
