---
"@jackyzha0/quartz": minor
---

Prefetching: Quartz fetches pages before their links are followed, so they open at once. New `configuration.prefetch`:

- `viewport` (default): links on screen are fetched while the browser is idle, and links pointed at, focused or touched first.
- `hover`: only links pointed at, focused or touched.
- `"off"`.

It works with and without SPA routing. With SPA routing, fetched pages are kept in memory (five minutes, at most 40) and used by both page navigation and popover previews, which no longer download a page the router fetches again. Without it, Quartz asks the browser to prefetch (Speculation Rules, or `<link rel="prefetch">`). Nothing is prefetched from links to other sites, files, or pages the site doesn't have, or with Data Saver on or a 2G connection (except links pointed at). Add `data-no-prefetch` to a link to exclude it. See https://quartz.jzhao.xyz/features/prefetching
