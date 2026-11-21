---
"@jackyzha0/quartz": patch
---

Transcluded content no longer duplicates ids. Headings and footnotes inside a transclusion get ids unique on the page, and the links inside it go to them, so the host's footnotes and a `[[#Heading]]` link inside a transclusion jump to the right place. A same-page link whose target isn't in the transcluded section links to the transcluded page. A heading transclusion (`![[note#Heading]]`) holds only the footnotes it references instead of the page's whole footnotes section.
