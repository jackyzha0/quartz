---
"@jackyzha0/quartz": patch
---

A plugin that depends on a plugin of another pipeline stage (an emitter or component on a transformer) no longer fails the build because of their `order`: order is checked only between plugins of the same stage.
