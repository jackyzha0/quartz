---
"@jackyzha0/quartz": patch
---

SPA navigation follows redirects correctly: when a link is redirected (for example `folder` → `folder/` on static hosts, or an alias page's canonical link), relative links on the new page resolve against where it really is, and the address bar shows that URL. Links on folder pages and parent tag pages reached through slash-less links pointed one level too high.
