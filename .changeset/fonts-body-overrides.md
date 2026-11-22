---
"@jackyzha0/quartz": patch
---

Fonts: explicitly configured `body`, `code` and `interface` fonts now apply with an Obsidian theme. They are also written to Obsidian's `--font-*-override` variables on `body`, which the theme's styles read; before, the theme's own `body` font variables won over Quartz's `:root` ones.
