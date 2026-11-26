---
"@jackyzha0/quartz": patch
---

Component styles are one stylesheet (`component-<hash>.css`, in the `quartz-base` layer as before) instead of one per component. Pages load about 20 fewer render-blocking stylesheets (29 to 11 on the docs site), and the styles they compute are unchanged.
