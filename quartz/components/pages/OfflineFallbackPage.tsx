import { QuartzComponentConstructor } from "../types"

function OfflineFallbackPage() {
  return (
    <article class="popover-hint">
      <h1>Offline</h1>
      <p>This page isn't offline available yet.</p>
    </article>
  )
}

export default (() => OfflineFallbackPage) satisfies QuartzComponentConstructor
