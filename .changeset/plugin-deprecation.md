---
"@jackyzha0/quartz": minor
---

Plugins can be marked deprecated with `quartz.deprecated` (a message naming the replacement) in their `package.json`. Quartz warns while a deprecated plugin is enabled — when the build loads the config (repeated in the end-of-build summary), in `plugin add` and in `plugin doctor` — and suggests removing it. The deprecated `hard-line-breaks` plugin is no longer listed in the default config and templates: ObsidianFlavoredMarkdown 2.0+ handles line breaks (`strictLineBreaks`).
