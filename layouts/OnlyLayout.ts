import { PageLayout, SharedLayout } from "../quartz/cfg"
import * as Component from "../quartz/components"

// Shared components remain the same
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Home: "/",
      "About Us": "/about",
      Contact: "/contact",
      // Add more links as needed
    },
  }),
}

// Custom layout without left and right sections
export const OnlyContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [], // Remove left-hand navigation
  right: [], // Remove right-hand content
}
