import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/gaylor-wiki/gaylor-vault",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.HBox([
      Component.PageTitle(),
      // Component.MobileOnly(Component.Spacer()),
      Component.Darkmode(),
    ]),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph(), 
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.HBox([
      Component.PageTitle(),
      // Component.MobileOnly(Component.Spacer()),
      Component.Darkmode(),
    ]),
    Component.Search(),
    Component.Explorer(),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
  right: [
  ],
}