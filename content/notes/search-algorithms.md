---
title: "search-algorithms"
aliases: search algortithms
tags: AI, algorithm
---

usually searching for either
- a sequence of actions (path) from current state to goal [[uninformed-search]] [[informed-search]]
- the best next actions considering the response of an opponent [[adversarial-search]]
- the best overall state according to some fitness function [[genetic-algorithms]]

this approach is viable when
- state-space is of a reasonable size
- the transition model is known to the agent or
- we can form a fitness function that gradually ranks improving states, and a sensible gross over operator