---
"@jackyzha0/quartz": patch
---

Type checking (`npm run check`) uses TypeScript 7. `tsconfig.json` switches `moduleResolution` from `node` (removed in TypeScript 7) to `bundler`, which reads packages' `exports`: custom code that imports a package's internal files may need to import from the package itself.
