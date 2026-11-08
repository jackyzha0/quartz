---
"@jackyzha0/quartz": patch
---

Security updates: `sharp` 0.35.5 (GHSA-wq5f-xc86-pv6w), `toml` 5 (prototype pollution and DoS advisories; TOML frontmatter parses the same, and now also accepts plain dates like `date = 2024-01-02`) and `minimatch` 11 (GHSA-g3hv-75wg-m249; `ignorePatterns` match the same). The plugin schema's `layout.position` lists exactly the positions Quartz renders. `npx quartz tui` points to the right install command (`github:quartz-community/tui`).
