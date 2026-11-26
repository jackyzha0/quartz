---
"@jackyzha0/quartz": patch
---

@quartz-community/graph 1.0.5: the graph scales to large sites. On 3,000 notes and 33,000 links, the global graph opens in 0.5 s instead of 2.5 s, and it stops using the CPU once its layout settles. It also loads d3 and PixiJS as pinned, integrity-checked versions, with PixiJS's minified build (200 KB instead of 2.5 MB on every page).
