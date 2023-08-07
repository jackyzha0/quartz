---
title: Popover Previews
---

Like Wikipedia, when you hover over a link in Quartz, there is a popup of a page preview that you can scroll to see the entire content. Links to headers will also scroll the popup to show that specific header in view.

By default, Quartz only fetches previews for pages inside your vault due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). It does this by selecting all HTML elements with the `popover-hint` class. For most pages, this includes the page title, page metadata like words and time to read, tags, and the actual page content.

When [[creating components|creating your own components]], you can include this `popover-hint` class to also include it in the popover.

## Configuration

- Remove popovers: set the `enablePopovers` field in `quartz.config.ts` to be `false`.
- Style: `quartz/components/styles/popover.scss`
- Script: `quartz/components/scripts/popover.inline.ts`
