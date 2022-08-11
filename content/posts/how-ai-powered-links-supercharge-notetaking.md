---
title: "How AI-Powered Link Suggestions Supercharge Note-taking"
date: 2022-06-24
lastmod: 2022-06-24
---
An essential part of connecting notes is to [[posts/learn-zettelkasten-by-example-3-new-note-or-not|find a note that needs to be connected]]. But there are many times when I forget I've made a link. Thus, I either spend a lot of time finding the relevant note or create a note with a title similar to a note I've already made. So, when creating [Fleeting Notes](https://fleetingnotes.app) (A wiki for quick notes), I felt it was paramount to make finding past notes fast and efficient. 

The solution I've settled on is to order the links by relevance when link suggestions are triggered (i.e. the overlay that shows when pressing `[[` ).

Essentially, the text that is written + every link is fed into a machine learning model. Then, the model spits out the most relevant links for the given text. If you're curious about the details of this machine learning model, see the [library](https://www.npmjs.com/package/@tensorflow-models/universal-sentence-encoder) I used to accomplish this.

Fleeting Notes is a free application, but AI-powered link suggestions is a paid feature in Fleeting Notes. If you want to try it out, use the promo code `AILINKS` for a 1 month free trial (Note: This coupon code expires July 31st, 2022).

Here is a demo of the sentence similarity ranking in action:
{{< youtube 3ySN4o0o7Hw >}}