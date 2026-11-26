---
"@jackyzha0/quartz": patch
---

Release tags are verified on GitHub: the release workflow creates each `vX.Y.Z` tag as a lightweight tag on the merged release commit (which GitHub signs) instead of letting the release create an unsigned annotated tag. It also starts the Docker build for the tag, so versioned images (`5.3.0`, `5.3`) are published for each release (none were built for 5.1.0–5.2.2).
