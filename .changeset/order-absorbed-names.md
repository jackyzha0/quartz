---
"@jackyzha0/quartz": patch
---

Plugin order: `before:` / `after:` naming a plugin that is built into Quartz now (`crawl-links`, `remove-draft`, `content-index`) passed validation but was ignored. They now mean the built-in that replaced them (`links`, `drafts`, `contentIndex`), so `before: crawl-links` orders the plugin before link processing, and is checked against its `order` like `before: links`.
