---
"@jackyzha0/quartz": minor
---

New `quartzStyles` option for frames. Set it to `false` and pages using the frame load no Quartz CSS (`index.css` or component styles), so a theme can style the page from scratch instead of overriding Quartz's defaults. This also drops popover styles and the site's `custom.scss`. Plugin stylesheets still load.
