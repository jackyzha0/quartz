import { router, navigate, reload, prefetch } from "https://unpkg.com/million@1.9.6/dist/router.mjs"

export const attachSPARouting = (draw) => {
  // Attach SPA functions to the global Million namespace
  window.Million = {
    router,
    navigate,
    reload,
    prefetch,
  };
  router(".singlePage")
  // We need on initial load, then subsequent redirs
  // requestAnimationFrame() delays graph draw until SPA routing is finished
  reload(draw)
  window.addEventListener("DOMContentLoaded", () => requestAnimationFrame(draw))
}
