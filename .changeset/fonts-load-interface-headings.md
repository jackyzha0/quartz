---
"@jackyzha0/quartz": patch
---

Fonts: the `interface` font and per-heading fonts (`h1` … `h6`) are now loaded from Google Fonts (or self-hosted with `fontOrigin: selfHosted`) like the other fonts; before, they only rendered if installed locally. A font with a single weight now loads that weight (`weights: [700]` loaded 400), and a single-weight italic font no longer makes the Google Fonts request fail.
