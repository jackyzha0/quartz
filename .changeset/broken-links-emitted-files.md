---
"@jackyzha0/quartz": patch
---

Links: links to files Quartz emits, such as `[feed](/index.xml)`, `/sitemap.xml`, `/static/icon.png` or `/404.html`, are no longer marked `broken`. A link is only marked when its target is known to be missing: a page that doesn't exist, or a vault file (image, audio, video, PDF, canvas, base) the content doesn't have. Other files may come from an emitter, so they are left unmarked.
