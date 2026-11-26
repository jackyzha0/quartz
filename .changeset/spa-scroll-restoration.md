---
"@jackyzha0/quartz": patch
---

With SPA navigation, Back and Forward return to where the reader was on each page. The router keeps each history entry's scroll position and restores it after swapping the page in. The browser restored the position while the previous page was still on screen, so it came out wrong: Back after a table-of-contents link stayed at the heading, and Back to a page landed at its top or bottom. Back and Forward between headings of the same page now only scroll, instead of reloading the page, and a reload keeps the position.
