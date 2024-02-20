---
title: "Table of Contents"
tags:
  - component
  - feature/transformer 
---

Quartz can automatically generate a table of contents from a list of headings on each page. It will also show you your current scroll position on the site by marking headings you've scrolled through with a different colour.

By default, it shows all headings from H1 (`# Title`) to H3 (`### Title`) and only shows the table of contents if there is more than one heading on the page.
You can also hide the table of contents on a page by adding `enableToc: false` to the frontmatter for that page.

## Customization

The table of contents is a functionality of the [[TableOfContents]] plugin. See the plugin page for customization options.

It also needs the `TableOfContents` component. The component can be configured with the `layout` parameter, which can either be `modern` (default) or `legacy`.