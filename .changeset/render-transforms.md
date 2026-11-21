---
"@jackyzha0/quartz": minor
---

Transformers can declare `renderTransforms`: transforms of a page's content when it is rendered, `before` transclusions are inlined and page types' `treeTransforms` run (bases are filled in), and `after` them, on the finished content. encrypted-pages uses them to encrypt a note's finished content, so bases and transclusions in encrypted notes show when unlocked (quartz-community/encrypted-pages#2).
