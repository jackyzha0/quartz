---
"@jackyzha0/quartz": minor
---

Markdown renders as it does in Obsidian: Quartz now uses ObsidianFlavoredMarkdown 2.0 and GitHubFlavoredMarkdown 2.0.

- **Line breaks changed:** a single line break inside a paragraph now renders as `<br>`, as in Obsidian's default reading view. Set `strictLineBreaks: true` in the ObsidianFlavoredMarkdown options to keep the previous behaviour (a space).
- ObsidianFlavoredMarkdown parses with Obsidian's own parser by default (`preset: "legacy"`). Use `preset: "strict"` for TOML (`+++`) frontmatter or plugins that add their own Markdown syntax.
- Also new: callouts parsed like Obsidian, inline footnotes (`text^[note]`), image sizes on Markdown images (`![alt|300](image.png)`), Mermaid diagrams that follow the theme's colours, an opt-in Pele diagram renderer, and inline tags that only link to tag pages that exist.
- GitHubFlavoredMarkdown now runs before ObsidianFlavoredMarkdown (order 30, then 40), as in the default config. If your config sets `order` for either plugin, keep GitHubFlavoredMarkdown first.

See the plugins' changelogs for details.
