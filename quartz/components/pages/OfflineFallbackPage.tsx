import { QuartzComponentConstructor } from "../types"

function OfflineFallbackPage() {
  return (
    <article class="popover-hint">
      <h1>Offline</h1>
      <p>You're offline and this page hasn't been cached yet.</p>
    </article>
  )
}

export default (() => OfflineFallbackPage) satisfies QuartzComponentConstructor
