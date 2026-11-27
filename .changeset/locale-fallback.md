---
"@jackyzha0/quartz": patch
---

A `locale` that Quartz has no translation for (such as `sv-SE`, `da-DK` or `es-MX`) no longer crashes the build. Quartz uses a translation of the same language (`es-MX` uses `es-ES`), else English, and prints one warning; dates still use the configured locale.
