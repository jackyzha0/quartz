import { Locale, i18n } from "../../i18n/i18next"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function NotFound({ cfg }: QuartzComponentProps) {
  const locale = cfg.locale ?? "en-US"
  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(locale, "404")}</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
