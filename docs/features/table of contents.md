---
title: "Table of Contents"
tags:
  - component
  - plugin/transformer
---

Quartz can automatically generate a table of contents from a list of headings on each page. It will also show you your current scroll position on the site by marking headings you've scrolled through with a different colour.

By default, it will show all headers from H1 (`# Title`) all the way to H3 (`### Title`) and will only show the table of contents if there is more than 1 header on the page.
You can also hide the table of contents on a page by adding `enableToc: false` to the frontmatter for that page.

> [!info]
> This feature requires both `Plugin.TableOfContents` in your `quartz.config.ts` and `Component.TableOfContents` in your `quartz.layout.ts` to function correctly.

## Customization

- Removing table of contents: remove all instances of `Plugin.TableOfContents()` from `quartz.config.ts`. and `Component.TableOfContents()` from `quartz.layout.ts`
- Changing the max depth: pass in a parameter to `Plugin.TableOfContents({ maxDepth: 4 })`
- Changing the minimum number of entries in the Table of Contents before it renders: pass in a parameter to `Plugin.TableOfContents({ minEntries: 3 })`
- Collapse the table of content by default: pass in a parameter to `Plugin.TableOfContents({ collapseByDefault: true })`
- Component: `quartz/components/TableOfContents.tsx`
- Style:
  - Modern (default): `quartz/components/styles/toc.scss`
  - Legacy Quartz 3 style: `quartz/components/styles/legacyToc.scss`
- Script: `quartz/components/scripts/toc.inline.ts`
