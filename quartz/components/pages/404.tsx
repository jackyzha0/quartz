import { QuartzComponentConstructor } from "../types"

function NotFound() {
  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>Either this page is private or doesn't exist.</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
