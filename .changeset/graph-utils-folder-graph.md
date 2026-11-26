---
"@jackyzha0/quartz": patch
---

- `@quartz-community/graph` 1.0.7: the local graph on folder index pages shows the folder's connections instead of a single node.
- `@quartz-community/utils` 1.2.1: `unescapeHTML` decodes each entity once, so a page description that mentions `&lt;br&gt;` keeps it in the page's meta tags instead of turning it into `<br>`.
