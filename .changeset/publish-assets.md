---
"@jackyzha0/quartz": minor
---

New `configuration.publishAssets: "referenced"` (default `"all"`): only copy the images, PDFs and other files that published pages link to or embed, so files that only unpublished notes use stay private (#2531, from #2544). References are matched against published (slugified) file names and include `<object data>` SVG embeds, `srcset` and URL-encoded paths.
