---
title: "How to implement a spaced repetition writing system"
date: "2021-09-16"
tags:
- "notes"
- "seedlings"
sr-due: 2023-04-07
sr-interval: 3
sr-ease: 253
---

[[Andy Matuschak]] described how a [[Spaced repetition writing system]] how such a system can be [implemented](https://notes.andymatuschak.org/Spaced_repetition_may_be_a_helpful_tool_to_incrementally_develop_inklings) through software. But such software does not exist at the moment. Some solutions around the Internet are Rice Issa's [Spaced Inbox](https://github.com/riceissa/spaced-inbox) and Obsidian's [Spaced Repetition community plugin](https://github.com/st3v3nmw/obsidian-spaced-repetition). Issa's solution seems only applicable for Windows, while Obsidian's plugin requires that all notes to be reviewed are tagged by a specific tag—something that needs to be tediously done to existing notes one-by-one. Also, transporting prompts between Craft and Obsidian creates a lot of unnecessary friction.

I found a more manual solution for implementing this kind of system using a note-writing application that supports interlinking. Cesar Rodriguez [implemented this in Roam](https://cesarr.co/posts/implementing-a-spaced-repetition-writing-system/). I’m implementing it in Craft using a combination of notes, backlinks, Google Calendar, the Mac’s native Calendar app, and Things. For the complete setup see: [[How to setup a spaced repetition writing system in Craft]].

To implement a spaced repetition writing system, the following general rules should be followed:

- Collect inklings in a single [[writing inbox]].
- Review each inkling. If the inkling was interesting and you were able to expand it but you need more time, schedule it soon for another review.
- If the inkling is interesting but is hard to expand, schedule it for a later time.
- If the inkling is no longer interesting, remove it.
- If you have developed the inkling into a permanent note, transfer it to your [[Zettelkasten]].

I implement these rules in [[thoughts/my morning writing practice]].

## References

Matuschak, A. (n.d.). *Spaced repetition may be a helpful tool to incrementally develop inklings*. Andyʼs Working Notes. Retrieved September 16, 2021, from [https://notes.andymatuschak.org/Spaced_repetition_may_be_a_helpful_tool_to_incrementally_develop_inklings](https://notes.andymatuschak.org/Spaced_repetition_may_be_a_helpful_tool_to_incrementally_develop_inklings)

Rodriguez, C. (2020, December 28). *Implementing a Spaced Repetition Writing System*. [https://cesarr.co/posts/implementing-a-spaced-repetition-writing-system/](https://cesarr.co/posts/implementing-a-spaced-repetition-writing-system/)

