---
title: Prefetching
tags:
  - feature
---

Quartz fetches the pages a reader is likely to open next before they click, so following a link shows the page at once instead of waiting for the network. It works with and without [[SPA Routing]].

## How it works

- **`viewport`** (the default): links on screen are fetched while the browser is idle, two at a time and at most 30 per page view. Pointing at a link or focusing it with the keyboard fetches it first, and touching it on a phone fetches it immediately.
- **`hover`**: only links that are pointed at for a moment, focused or touched are fetched.

With [[SPA Routing]], Quartz keeps the fetched pages in memory for five minutes (at most 40 of them), and both page navigation and [[popover previews]] use them, so a page is never downloaded twice. Without SPA routing every link is a normal page load, so Quartz asks the browser to prefetch instead: with [Speculation Rules](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) where the browser supports them, otherwise with `<link rel="prefetch">`.

Quartz never prefetches:

- links to other sites, links that open in a new tab, and downloads;
- links to files such as images and PDFs (only pages);
- with `viewport`, links on screen to pages that aren't in the site's content index (so a broken link in your layout doesn't show up as a 404 on every page);
- anything but links the reader points at, when the browser asks to save data (Data Saver) or the connection is 2G.

To exclude a single link, add `data-no-prefetch` to it in HTML. Links with `data-router-ignore` are never prefetched either.

## Configuration

Set `prefetch` in the [[configuration]] in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  prefetch: viewport # or hover, or "off"
```
