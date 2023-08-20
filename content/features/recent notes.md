---
title: Recent Notes
tags: component
---

Quartz can generate a list of recent notes for based on some filtering and sorting criteria. Though this component isn't included in any [[layout]] by default, you can add it by using `Component.RecentNotes`.

## Customization

- Changing the title from "Recent notes": pass in an additional parameter to `Component.RecentNotes({ title: "Recent writing" })`
- Changing the number of recent notes: pass in an additional parameter to `Component.RecentNotes({ limit: 5 })`
- Show a 'see more' link: pass in an additional parameter to `Component.RecentNotes({ linkToMore: "tags/components" })`. This field should be a full slug to a page that exists.
- Customize filtering: pass in an additional parameter to `Component.RecentNotes({ filter: someFilterFunction })`. The filter function should be a function that has the signature `(f: QuartzPluginData) => boolean`.
- Customize sorting: pass in an additional parameter to `Component.RecentNotes({ sort: someSortFunction })`. By default, Quartz will sort by date and then tie break lexographically. The sort function should be a function that has the signature `(f1: QuartzPluginData, f2: QuartzPluginData) => number`. See `byDateAndAlphabetical` in `quartz/components/PageList.tsx` for an example.
- Component: `quartz/components/RecentNotes.tsx`
- Style: `quartz/components/styles/recentNotes.scss`
