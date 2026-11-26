import { PageFrame, PageFrameProps } from "./types"

/**
 * Minimal page frame — no sidebars, no header/footer chrome. Only the
 * page body is rendered with a thin wrapper, plus the footer for legal/link
 * obligations.
 *
 * Useful for immersive page types like full-screen canvases, kiosks,
 * or custom landing pages that want complete control of the viewport.
 */
export const MinimalFrame: PageFrame = {
  name: "minimal",
  render({ componentData, pageBody: Content, footer }: PageFrameProps) {
    return (
      <>
        <main class="center minimal">
          <Content {...componentData} />
        </main>
        {footer.map((FooterComponent) => (
          <FooterComponent {...componentData} />
        ))}
      </>
    )
  },
}
