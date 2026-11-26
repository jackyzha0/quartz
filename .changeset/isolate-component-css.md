---
"@jackyzha0/quartz": patch
---

Each component's CSS is parsed on its own before the component stylesheet is put together, so a missing `}` or an unclosed comment in one plugin's CSS no longer swallows the rules of every component after it, and a stray `}` no longer fails the build; a syntax error is reported with the component's name.
