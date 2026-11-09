---
"@jackyzha0/quartz": patch
---

A plugin that lists a plugin now built into Quartz in `quartz.dependencies` (`@quartz-community/crawl-links`, `remove-draft` or `content-index`) no longer fails the build with "requires crawl-links. Run: npx quartz plugin add …". The built-in (`configuration.links`, `drafts`, `contentIndex`) satisfies the dependency. A warning is shown when that built-in is disabled. `npx quartz plugin doctor` checks the same way.
