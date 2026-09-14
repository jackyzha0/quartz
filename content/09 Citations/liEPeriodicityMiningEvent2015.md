---
title: "ePeriodicity: Mining Event Periodicity from Incomplete Observations"
aliases:
  - Li et al. (2015)
project: NA
type: citation
status: open
priority: p5
created: 2025-01-27 11:17
modified: 2025-04-09 16:35
tags:
  - Vectors
  - todoist
  - Sensors
  - rd
  - Random processes
  - Probabilistic Model
  - probabilistic model
  - Probabilistic logic
  - Periodicity
  - Nonhomogeneous media
  - Markov processes
  - Incomplete Observations
  - incomplete observations
  - Global Positioning System
  - citation
zt-attachments:
  - "6556"
zotero-key: 9S3S9ECT
year: 2015
people:
  - Zhenhui Li
  - Jingjing Wang
  - Jiawei Han
journal: IEEE Transactions on Knowledge and Data Engineering
DOI: 10.1109/TKDE.2014.2365801
dateadd: 2025-01-21T14:33:16.000Z
citetype: journalArticle
citekey: liEPeriodicityMiningEvent2015
---

# ePeriodicity: Mining Event Periodicity from Incomplete Observations
Read:: - [ X ] Li et al. (2015) - **ePeriodicity: Mining Event Periodicity from Incomplete Observations** ➕2025-01-27 !!2 #rd #citation #todoist
Print::  ✔
Zotero Link:: [Zotero](zotero://select/library/items/9S3S9ECT)
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/MXRAAPYH/Li%20et%20al.%20-%202015%20-%20ePeriodicity%20Mining%20Event%20Periodicity%20from%20Incomplete%20Observations.pdf>)
Reading Note::
Web Rip::
url:: https://ieeexplore.ieee.org/document/6940249
See:: [[Searching for Comparative Periodicity Finding Algorithms]]
```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "liEPeriodicityMiningEvent2015" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> Advanced technology in GPS and sensors enables us to track physical events, such as human movements and facility usage. Periodicity analysis from the recorded data is an important data mining task which provides useful insights into the physical events and enables us to report outliers and predict future behaviors. To mine periodicity in an event, we have to face real-world challenges of inherently complicated periodic behaviors and imperfect data collection problem. Specifically, the hidden temporal periodic behaviors could be oscillating and noisy, and the observations of the event could be incomplete. In this paper, we propose a novel probabilistic measure for periodicity and design a practical algorithm, ePeriodicity, to detect periods. Our method has thoroughly considered the uncertainties and noises in periodic behaviors and is provably robust to incomplete observations. Comprehensive experiments on both synthetic and real datasets demonstrate the effectiveness of our method.
# Quick Reference

# Top Notes
- This is good as it actually provide several metrics
- The problem is that they are inversed from what we have because it is for a time series algorithms
- I.e. Time-Series algorithms test how the algorithms perform under certain constraints
    - While our model is reducing the constraints through learning over the time series
    - E.g.: Their algo "observes" a time-series with a flat sample rate (not to be confused with complete observation sequence) of $P = (1- \eta)$ where as this is comparable to our "total actions", in that our algorithm is minimizing the P over its lifetime
    - So maybe we can compare across the entire lifetime? Or maybe just the action to reach a max accuracy?
    - But it loses the solution seeking aspect
    - The upside is my method would actually be superior in terms of required samples
- I'm running a solution oscillators experiment that is roughly equivalent to this one

# Tasks

