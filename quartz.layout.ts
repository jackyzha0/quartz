import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      About: "/About",
      Blog: "https://miguelpimentel.do/",
      Meta: "/Meta",
      GitHub: "https://github.com/semanticdata/",
      Source: "https://github.com/semanticdata/forgetful-notes/",
      // Tags: "/tags",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    // Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Spacer()),
  ],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Backlinks()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.Spacer()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Backlinks()),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Explorer()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Explorer())],
  right: [
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Explorer()),],
}