import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { i18n } from "../../i18n"

const EncryptedContent: QuartzComponent = ({ encryptedContent, cfg }: QuartzComponentProps) => {
  return (
    <>
      <div id="lock">
        <div
          id="msg"
          data-wrong={i18n(cfg.locale).pages.encryptedContent.wrongPassword}
          data-modern={i18n(cfg.locale).pages.encryptedContent.modernBrowser}
          data-empty={i18n(cfg.locale).pages.encryptedContent.noPayload}
        >
          {i18n(cfg.locale).pages.encryptedContent.enterPassword}
        </div>
        <div id="load">
          <p class="spinner"></p>
          <p id="load-text" data-decrypt={i18n(cfg.locale).pages.encryptedContent.decrypting}>
            {i18n(cfg.locale).pages.encryptedContent.loading}
          </p>
        </div>
        <form class="hidden">
          <input
            type="password"
            class="pwd"
            name="pwd"
            aria-label={i18n(cfg.locale).pages.encryptedContent.password}
            autofocus
          />
          <input type="submit" value={i18n(cfg.locale).pages.encryptedContent.submit} />
        </form>
        <pre class="hidden" data-i={cfg.passProtected?.iteration}>
          {encryptedContent}
        </pre>
      </div>
      <article id="content"></article>
    </>
  )
}

export default (() => EncryptedContent) satisfies QuartzComponentConstructor
