---
"@jackyzha0/quartz": minor
---

Quartz now requires Node.js 22.22 or later (was 22), for chokidar 6, which watches content in `--serve` mode. chokidar 6 confirms each change against the file system before rebuilding and fixes missed and duplicate change events.
