---
"@jackyzha0/quartz": patch
---

Build-time stand-in dates are no longer written as real dates. A page whose date no source gives (for example `defaultDateType: published` and no `published:`, or an invalid one) gets the build time from the date plugin; `contentIndex.json` now leaves its `date` out, and `article:published_time` / `article:modified_time` are only set for real dates (an invalid `published:` gave the build time). RSS and the sitemap keep the build time. created-modified-date 1.0.5 lists its stand-ins in `file.data.fallbackDates`; with older versions a `published` date only counts when the frontmatter sets it.
