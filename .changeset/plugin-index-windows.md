---
"@jackyzha0/quartz": patch
---

On Windows, regenerating `.quartz/plugins/index.ts` (`npm run install-plugins`, which also runs before every `npm run build`) no longer skips npm plugins with "dist/index.d.ts could not be found", which left exports such as `ExternalPlugin.Explorer` undefined. The package's location was read from a `file:` URL's pathname (`/C:/…`), which is not a Windows path.
