---
"@jackyzha0/quartz": minor
---

`contentIndex.json` entries now include the page's `date` (the one `defaultDateType` selects) as an ISO 8601 string, so client-side components such as the explorer can sort by date. Pages without a date have no `date` field.
