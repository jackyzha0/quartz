---
"@jackyzha0/quartz": patch
---

Links as in Obsidian 1.15.0:

- A Markdown link whose path is not valid percent-encoding (`[x](%zz)`, `[x](a%E2.md)`) is an external link. Before, it failed the whole build with `URI malformed`.
- Link paths are NFC-normalized, so a link spelled with a decomposed `é` reaches `café.md`.
- An image of a file the site doesn't have, with no alt text, gets its percent-decoded path as alt (`![](missing%20pic.png)` → “missing pic.png”), as Obsidian names a missing embed.
- A wikilink's `^id` no longer names its paragraph (Obsidian Flavored Markdown).
