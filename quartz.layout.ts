import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Mastodon: "https://mastodon.com/@jahinzee",
      GitHub: "https://github.com/jahinzee"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    
    // Component.MobileOnly(Component.Spacer()),
    // Component.ContentMeta(),
    // Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Backlinks()),
    Component.MobileOnly(Component.Spacer()),
    // Component.MobileOnly(Component.Darkmode()),
    Component.ArticleTitle(),
  ],
  left: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
    // Component.Search(),
    Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = defaultContentPageLayout;
