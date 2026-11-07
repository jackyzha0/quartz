---
"@jackyzha0/quartz": minor
---

Clearer failures: errors thrown by a plugin now name the plugin (package, version, source), what it was doing (transforming, filtering, emitting, rendering a component) and the file or page, list problems Quartz already knew about that plugin (incompatible Quartz version, missing required data), and say how to check and where to report it. Plugin stack frames are no longer hidden. Warnings from loading the config are repeated in a summary at the end of the build, together with a note about links to pages that are not on the site (including links to drafts).
