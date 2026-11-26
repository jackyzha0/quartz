---
"@jackyzha0/quartz": patch
---

Pages get a canonical link (`<link rel="canonical">`, the page's URL as the sitemap lists it), and `og:url` uses the same URL: `folder/` instead of `folder/index`, and the site root for the home page. `og:site_name` is a `property` (it was a `name`, which Open Graph readers ignore). Notes are `og:type: article`, with `article:modified_time` and, when the frontmatter has a date, `article:published_time`. The home page and folder and tag pages stay `website`.

The `fonts.gstatic.com` preconnect is a CORS connection, which the font files can reuse, and the unused `cdnjs.cloudflare.com` preconnect is gone.
