import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
/* export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
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
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
} */

/** Example of a valid layout for mobile, allowing burger menu */
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.MobileOnly(
      Component.ExplorerBurger({
        folderDefaultState: "open",
        folderClickBehavior: "link",
      }),
    ),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.PageTitle()),
    Component.Search(),
    Component.Darkmode(),
  ],
  footer: Component.Footer({
    links: {
      Github: "https://github.com/Lisandra-dev",
      Twitter: "https://vxtwitter.com/Mara__Li",
      Discord: "Mara__Li"
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.TagList(),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.DesktopOnly(
      Component.ExplorerBurger({
        folderClickBehavior: "link",
        folderDefaultState: "collapsed",
        useSavedState: true,
        title: ""
      }),
    ),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.TableOfContents(),
    Component.DesktopOnly(Component.Backlinks()),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: defaultContentPageLayout.beforeBody,
  left: defaultContentPageLayout.left,
  right: [],
}
