---
"@jackyzha0/quartz": minor
---

Frontmatter parsing, link resolution, draft handling and the content index are now built into Quartz (configured under `configuration.frontmatter`, `.links`, `.drafts` and `.contentIndex`) instead of being plugins that silently broke the site when disabled. Existing `crawl-links`, `remove-draft` and `content-index` entries keep working and are applied automatically; `npx quartz plugin doctor --fix` moves them into `configuration`. Plugins can add fields to `contentIndex.json` with an `extendContentIndex` hook, and emitters can reuse the built index via `ctx.contentIndex`. The effective built-in settings are available to plugins as `ctx.cfg.configuration.<key>`.
