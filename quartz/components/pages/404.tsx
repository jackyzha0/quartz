import i18next from "i18next"
import { QuartzComponentConstructor } from "../types"

function NotFound() {
  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18next.t("404")}</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
