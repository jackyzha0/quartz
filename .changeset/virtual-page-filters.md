---
"@jackyzha0/quartz": minor
---

Pages that page types render from files (`.base`, `.canvas`, Excalidraw drawings) follow the site's publish filters (quartz-community/bases-page#11). The filters see each such page with the frontmatter its page type gives it and `file.data.referencedBy`, the published pages that link to it; a page a filter rejects is not emitted and not listed in the content index, sitemap, RSS, folder pages, explorer or search, and can't be embedded. Before, every such file was published regardless of the filters. New transformer hook `virtualPageHtmlPlugins(ctx, content)`: rehype plugins run on these pages' rendered bodies, which never pass through `htmlPlugins`, so plugins such as encrypted-pages can encrypt them.
