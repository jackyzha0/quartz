---
"@jackyzha0/quartz": patch
---

A local plugin source written with Windows separators (`.\my-plugin`, `..\plugins\my-plugin`) is recognised as a local path. Before, it was read as a git or npm source and failed with "Expected github:owner/repo".
