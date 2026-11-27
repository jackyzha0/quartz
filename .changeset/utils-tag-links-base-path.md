---
"@jackyzha0/quartz": patch
---

utils 1.3.4: inline `#tag` links from notes two or more folders deep stay under the site's base path. They went to `/tags/…` instead of `/<base>/tags/…`, a 404 on sites served under a sub-path such as GitHub Pages project sites.
