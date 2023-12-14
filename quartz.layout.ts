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
    // Component.ContentMeta(),
    // Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(
      // {
      //   mapFn: (node) => {
      //     // dont change name of root node
      //     if (node.depth > 0) {
      //       // set emoji for file/folder
      //       if (node.file) {
      //         node.displayName = "📄 " + node.displayName
      //       }
      //       else { node.displayName = "📁 " + node.displayName }
      //     }
      //   },
      // }
      )),
      Component.DesktopOnly(Component.Backlinks()),
    ],
    right: [
      Component.Graph(),
      Component.MobileOnly(Component.Backlinks()),
      Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ folderClickBehavior: "link",  }))],
  right: [],
}