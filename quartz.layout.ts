import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "Source code": "https://github.com/bfahrenfort/quartz",
      "RSS": "https://be-far.com/index.xml"
    },
    //remark_config: config.plugins.transformers.find((e) => {e.name === "Remark42"})?.options
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
    Component.DesktopOnly(Component.Explorer({
      sortFn: (a, b) => {
        // Sort order: folders first, then files. Sort folders and files alphabetically
        if (a.name.match(/Home$/)) { console.log(a.displayName); return -1 }
        if (b.name.match(/Home$/)) { console.log(b.displayName); return 1 }
        if ((!a.file && !b.file) || (a.file && b.file)) {
          // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
          // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (a.file && !b.file) {
          return 1
        } else {
          return -1
        }
      }
    })),
    //Component.TableOfContents(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    //Component.MobileOnly(Component.Explorer()),
    Component.Backlinks(),
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
  ],
  right: [],
}
