import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "justin.vc": "https://justin.vc",
      "org-roam": "https://orgroam.com",
      "ox-hugo": "https://ox-hugo.scripter.co/",
      "GNU Emacs": "https://www.gnu.org/software/emacs/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ rootName: "Index" }),
    Component.ArticleTitle(),
    Component.ContentMeta({
      showReadingTime: false,
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        mapFn: (node) => {
          // Don't change name of root node
          node.displayName = node.displayName.toLowerCase()
          if (node.depth > 0) {
            // Set emoji for file/folder
            if (node.file) {
              node.displayName = "📄 " + node.displayName
            } else {
              node.displayName = "📁 " + node.displayName
            }
          }
        },
        sortFn: (a, b) => {
          // Function to check if a file name is in date format (YYYY-MM-DD)
          const isDateFormatted = (name: string): boolean => /^\d{4}-\d{2}-\d{2}/.test(name)

          // Extract date from filename if it's date-formatted
          const getDate = (name: string): Date | null => {
            const match = name.match(/^(\d{4})-(\d{2})-(\d{2})/)
            return match
              ? new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
              : null
          }

          // If both items are date-formatted, sort by date in descending order
          if (isDateFormatted(a.name) && isDateFormatted(b.name)) {
            const dateA = getDate(a.name)
            const dateB = getDate(b.name)
            if (dateA && dateB) {
              return dateB.getTime() - dateA.getTime()
            }
          }

          // For folders, sort by name in ascending order
          if (!a.file && !b.file) {
            return a.name.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          }

          // Files come after folders
          if (a.file && !b.file) return 1
          if (!a.file && b.file) return -1

          // For non-date files, sort by name in ascending order
          return a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        },
      }),
    ),
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
}
