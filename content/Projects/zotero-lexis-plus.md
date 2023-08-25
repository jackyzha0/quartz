---
title: "The Tale of Lexis+.js"
tags: ["programming","productivity","project"]
---
This is one of the first open source contributions I made that I felt proud of. I think it genuinely solves a problem that I and hundreds of others have.
## I am faced with a problem:
Law students, as part of the legal professional community, have the wonderful opportunity to contribute to their chosen subject matter field through the *journal*: the exclusive club of editors who receive a few articles a year to divvy up and read through to conform said articles to rigorous syntactical standards before publishing them, to maintain the appearances of authority and polished appeal on the part of both the authors and the journal itself.
## Editing journal articles is repetitive.
As an editor, you're assigned a section of an article from footnote X to footnote Y, where you check the content of the paper (*above-the-line* edits) and the authority it claims supports that content (*source pulling*) as well as how that authority is cited (*below-the-line* edits). 

The process for above-the-line and below-the-line edits is usually just staring at a word doc for a few hours and is of little consequence. The process for source pulling is thus:
1. Find the source cited on the internet or in a library. Could be a journal article, a book (paper or digital), or a court case.
2. Find the point in the source that the article references (usually by page number).
3. Archive that source or an excerpt in a digital format.
4. Mark the cited propositions that support the content above the line
5. Document steps 1-4 in a separate document.
6. Turn the finished document and all archived sources in to the higher-ups.

This takes multiple hours to create:

![[Attachments/pre-lexis-translator.png]]

It's worth noting that all of these steps would be performed in separate locations or programs, wasting a 1L's precious time.

---
## There's got to be an easier way.
I'm familiar with [Zotero](https://www.zotero.org/) from my computer science days for researching IEEE papers sources. It's compatible with the largest academic article and book databases, and supports attachments. 

Alas! I can't use it to save cases. All resources on the internet tell me that Zotero is a great resource for legal research, with the caveat that it's incompatible with the biggest legal research databases, [WestLaw](https://legal.thomsonreuters.com/en/westlaw) and [LexisNexis](https://www.lexisnexis.com/en-us/products/lexis-plus.page). 
## Turns out Zotero's compatibility is an open source project with inbuilt development tools.
Why is Zotero's compatibility an open source project with inbuilt development tools? I don't care, but I love it.

Work starts right away on a [Zotero Translator](https://github.com/zotero/translators) for my database of choice, Lexis's newest iteration called Lexis+. One or two hyperfixations later, I [drop a PR](https://github.com/zotero/translators/pull/3012) and call it a day. 

This was my first medium-term back-and-forth with an open source project contribution. Zotero's development APIs have lackluster documentation, but their maintainers have high standards. Through a team effort, I made it to merge, and could claim victory! Victory over the internet, the legal community, the Zotero project, and the walled-garden ([[Essays/why-i-garden|I hate those]]) legal research databases that dared catch my ire.

Now, the process looks like this:
1. Find the source on an internet database.
2. **Click a single button in your browser to import everything about the source into Zotero**. This part is so damn cool.
3. Go into Zotero, find the part cited, and mark the propositions in support of the article.
4. \[If I had my way,\] click a single button in Zotero to sync your importation and markup to a (*free!*) cloud group for use by the higher-ups.

Roughly three times the footnotes, but less time than the previous article:

![[Attachments/post-lexis-translator.png]]

Unfortunately, the folks at my journal have been resistant to change thus far, and the only time I've saved has been my own.
## Worth it.

#### P.S.
I had a small hiccup that I discovered through subsequent use for another journal article.

[oops](https://github.com/zotero/translators/pull/3038).

There, fixed it. All better.