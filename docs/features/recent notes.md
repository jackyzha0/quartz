---
title: Recent Notes
tags: component
---

Quartz can generate a list of recent notes based on some filtering and sorting criteria. Though this component isn't included in any [[layout]] by default, you can add it by using `Component.RecentNotes` in `quartz.layout.ts`.

## Customization

### Parameters

| Parameter Name | Description                                                                                                                                                                                                                                                                                            | Default value                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `title`        | the displayed title of the component                                                                                                                                                                                                                                                                   | the [[i18n]] value                             |
| `limit`        | the number of recent notes                                                                                                                                                                                                                                                                             | `3`                                            |
| `showTags`     | if the note's tags are displayed                                                                                                                                                                                                                                                                       | `true`                                         |
| `linkToMore`   | show a 'see more' link. this field should be a full slug to a page that exists (e.g. "tags/components")                                                                                                                                                                                                | `false`                                        |
| `filter`       | custom filter function that has the signature `(f: QuartzPluginData) => boolean`                                                                                                                                                                                                                       | `() => true`                                   |
| `sort`         | custom sort function. By default, Quartz will sort by date and then tie break lexographically. The sort function should be a function that has the signature `(f1: QuartzPluginData, f2: QuartzPluginData) => number`. See `byDateAndAlphabetical` in `quartz/components/PageList.tsx` for an example. | `byDateAndAlphabetical( GlobalConfiguration )` |

### Relevant files

- Component: `quartz/components/RecentNotes.tsx`
- Style: `quartz/components/styles/recentNotes.scss`
