---
"@jackyzha0/quartz": patch
---

A plugin whose dependency is configured but disabled gets the intended warning ("depends on X which is disabled") instead of failing the build with "requires X. Run: npx quartz plugin add X".
