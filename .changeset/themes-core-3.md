---
"@jackyzha0/quartz": patch
---

Updates `@quartz-themes/core` to 3.1, which converts any Obsidian community theme at build time: name a theme as Obsidian lists it (`Minimal`, `AnuPpuccin`), a GitHub repository, a URL or a local `theme.css`; Style Settings exports and CSS snippets apply as in Obsidian. Theme ids from 2.x (`tokyo-night`) keep working; `aspects`, `include`, `calloutStyle` and `fonts` were removed, and the `@quartz-themes/<theme>` packages are no longer needed. Quartz keeps its own page layout under a theme, `themeFonts: false` uses the site's Quartz fonts, and a theme's embedded fonts ship as separate files. See [ThemesCore](https://quartz.jzhao.xyz/plugins/ThemesCore).
