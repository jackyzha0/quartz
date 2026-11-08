---
"@jackyzha0/quartz": patch
---

Security: frontmatter can no longer run code during a build. A note starting with `---js` or `---javascript` had its frontmatter evaluated as JavaScript (gray-matter's default engine), so building content you didn't write, such as a pull request preview, could run arbitrary code. Quartz now refuses JavaScript frontmatter with an error naming the file. Invalid frontmatter (for example broken YAML) is now reported as a problem in that file instead of as a Quartz bug.
