---
"@jackyzha0/quartz": patch
---

`npx quartz plugin install --latest` (and `plugin update`) no longer fails because a disabled plugin can't be updated, for example an old `quartz-themes` entry whose repository moved its plugin. The build doesn't load disabled plugins, so this is now a warning that says how to remove the entry. A failing enabled plugin still fails the command.
