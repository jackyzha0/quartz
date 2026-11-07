---
"@jackyzha0/quartz": patch
---

Security: plugin commands no longer build shell commands from plugin sources, refs, pinned commits or package names (#2571). git and npm run with argument arrays, refs/commits/URLs/package names are validated (so a value can't be read as an option either), and generated plugin imports are written as escaped string literals. A source such as `github:owner/repo#main;cmd` used to run `cmd`; it is now rejected as an invalid ref. Also fixes restoring a plugin pinned in `quartz.lock.json` to a commit that is no longer its branch tip (#2559).
