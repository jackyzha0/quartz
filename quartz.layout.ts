import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.NavBar(), Component.Search()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/JongDeug/jongdeug-blog",
    },
  }),
}

// 게시글 페이지
// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [],
  right: [
    Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Explorer()),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
}

// 인덱스(tags, folders) 페이지
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [
    Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Explorer()),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
}
