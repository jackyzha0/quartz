---
"@jackyzha0/quartz": patch
---

Frontmatter is read with js-yaml 5, using YAML 1.2's core schema (the values Quartz read before are unchanged). Frontmatter with only comments now has no properties, as in Obsidian, instead of being reported as invalid frontmatter.
