import { router, navigate } from "https://unpkg.com/million@1.8.9-0/dist/router.mjs"

export const attachSPARouting = (draw) => {
  // SPA navigation for access later
  window.navigate = navigate
  // We only mutate document.title and content within .singlePage element
  router(".singlePage")
  // We need on initial load, then subsequent redirs
  // requestAnimationFrame() delays graph draw until SPA routing is finished
  window.addEventListener("million:navigate", () => requestAnimationFrame(draw))
  window.addEventListener("DOMContentLoaded", () => requestAnimationFrame(draw))
}
