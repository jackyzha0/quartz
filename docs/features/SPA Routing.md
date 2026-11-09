---
title: "SPA Routing"
tags:
  - feature
---

Single-page-app style rendering. This prevents flashes of unstyled content and improves the smoothness of Quartz.

Under the hood, this is done by hijacking page navigations and instead fetching the HTML via a `GET` request and then diffing and selectively replacing parts of the page using [micromorph](https://github.com/natemoo-re/micromorph). This allows us to change the content of the page without fully refreshing the page, reducing the amount of content that the browser needs to load.

## Configuration

- Disable SPA Routing: set the `enableSPA` field of the [[configuration]] in `quartz.config.yaml` to be `false`.
- Exclude a single link: add `data-router-ignore` to it in HTML; it is followed with a normal page load. Links with `target="_blank"` and links to other sites are never handled by the router. `data-router-noscroll` keeps the scroll position when the link is followed.

Pages are fetched ahead of a click by [[prefetching]], which the router uses to show them at once; the fetched pages are also reused by [[popover previews]].

Redirects are followed: when a link is redirected (for example `folder` → `folder/` on static hosts, or an alias page to its canonical page), the address bar shows the final URL and relative links on the new page resolve against it.
