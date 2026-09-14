---
title: Generative Models for Periodicity Detection in Noisy Signals
aliases:
  - Barnett et al. (2024)
project: NA
type: citation
status: open
priority: p5
created: 2025-05-12 15:56
modified: 2025-10-30 11:37
tags:
  - todoist
  - rd
  - periodicity detection
  - periodicity
  - periodic leg movements during sleep
  - generative models
  - citation
  - algorithm
zt-attachments:
  - "5182"
zotero-key: D2DTDLQA
year: 2024
thumbnail: thumbnails/resized/997eb95e982b94212bf98691caa71aa3_86cf658e.webp
people:
  - Stephany Fulda
  - Olga Kaiser
  - Jonathan Masci
  - Ezekiel Barnett
  - Ernst C. Wit
journal: Clocks & Sleep
feature: thumbnails/autocardlink/bd58f67a0718d36ef1b5cb0dba8f6e80.png
DOI: 10.3390/clockssleep6030025
dateadd: 2025-05-12T13:48:13.000Z
citetype: journalArticle
citekey: barnettGenerativeModelsPeriodicity2024
---

# Generative Models for Periodicity Detection in Noisy Signals
> [!Index Card]
> About:: I actually really like this one and should try to emulate the style in their comparisons
> Read:: - [ ] Barnett et al. (2024) - **Generative Models for Periodicity Detection in Noisy Signals** ➕2025-05-12 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/D2DTDLQA)
> Files:: [attachment](<file:///home/michaelt/Zotero/storage/CEN8KA5D/Barnett%20et%20al.%20-%202024%20-%20Generative%20Models%20for%20Periodicity%20Detection%20in%20Noisy%20Signals.pdf>)
> Reading Note::
> Web Rip:: [[Generative Models for Periodicity Detection in Noisy Signals]]
> url:: https://www.mdpi.com/2624-5175/6/3/25
> git-repo:: [GitHub - nnaisense/gmpda: Gaussian Mixture Periodicity Detection Algorithm](https://github.com/nnaisense/gmpda)
```cardlink
url: https://github.com/nnaisense/gmpda
title: "GitHub - nnaisense/gmpda: Gaussian Mixture Periodicity Detection Algorithm"
description: "Gaussian Mixture Periodicity Detection Algorithm. Contribute to nnaisense/gmpda development by creating an account on GitHub."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/67fd63486f17304dba36d21228e5cc579c82a7ba64d69c8e5a77c08ef3e55370/nnaisense/gmpda
```
>
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "barnettGenerativeModelsPeriodicity2024" 
> SORT file.cday DESC
> ```

> [!Abstract]
> We present the Gaussian Mixture Periodicity Detection Algorithm (GMPDA), a novel method for detecting periodicity in the binary time series of event onsets. The GMPDA addresses the periodicity detection problem by inferring parameters of a generative model. We introduce two models, the Clock Model and the Random Walk Model, which describe distinct periodic phenomena and provide a comprehensive generative framework. The GMPDA demonstrates robust performance in test cases involving single and multiple periodicities, as well as varying noise levels. Additionally, we evaluate the GMPDA on real-world data from recorded leg movements during sleep, where it successfully identifies expected periodicities despite high noise levels. The primary contributions of this paper include the development of two new models for generating periodic event behavior and the GMPDA, which exhibits high accuracy in detecting multiple periodicities even in noisy environments.

# Top Notes
Focuses on mixed multi-period detection. They note that the other methods that are commonly used (ACF, FFT, e-periodicity) do not account for non-stationary periodicities, or mixed-periods. I should emphasize that my method attempts to address both. This mainly focuses on a novel gaussian method for mixed periodicities. This compares some methods including ones that I use: ACF, E-periodicity.

Ok they have two environments:
 - **Clock model, which is static** and thus is ”stationary”
 - And I’m guessing the random walk model is non-stationary

OK so about the time we are reaching eq 14, I believe we are representing the set of “pairwise” events, in that we can have a time relationship betweeen events in the time space whether those be actual events (or interaction between two different periods?), events and noise, or noise and noise
> This modified operator $D(\mu)$ now counts the intervals not only between events from the same periodicity set but also between events in different sets and/or between noise events.

Ok so maybe interactions between all periodicity events

Wait is this also boolean? It appears so but while omitting the null values.

**I’m going to skip the proofs sections for now. Eq. 16 - 32**
- They do this to create a loss function?
# Quick Reference
- ACF-based methods estimate similarity between sub-sequences of event intervals, selecting periods that maximize the ACF. These methods have been used for multiple periodicity detection in character series such as texts [10,11]. However, ACF detects numerous candidate periods, often requiring a self-selected significance threshold to identify true periodicities, and struggles with smaller data sets. These methods are generally not designed for multiple periodicities in event time series. ^zix8ks
- Alternative approaches include E-periodicity [12], which focuses on single period detection using the modulus operation for unevenly/under-sampled time series. E-periodicity segments the time series into all possible periodicities within some a priori specified range. It then overlays the segments and selects the true periodicity as the periodicity that ”covers” the most events.
- Methods like partial periodic patterns, chi-squared tests [13], max sub-pattern trees [13], and projection-based techniques [14] also target single periodic patterns in stationary signals and face challenges with low-frequency periodicities and low sampling rates [15].
- Alternative approaches include E-periodicity [12](https://www.mdpi.com/2624-5175/6/3/25#B12-clockssleep-06-00025), which focuses on single period detection using the modulus operation for unevenly/under-sampled time series. E-periodicity segments the time series into all possible periodicities within some a priori specified range. It then overlays the segments and selects the true periodicity as the periodicity that ”covers” the most events. Methods like partial periodic patterns, chi-squared tests [13](https://www.mdpi.com/2624-5175/6/3/25#B13-clockssleep-06-00025), max sub-pattern trees [13](https://www.mdpi.com/2624-5175/6/3/25#B13-clockssleep-06-00025), and projection-based techniques [14](https://www.mdpi.com/2624-5175/6/3/25#B14-clockssleep-06-00025) also target single periodic patterns in stationary signals and face challenges with low-frequency periodicities and low sampling rates [15](https://www.mdpi.com/2624-5175/6/3/25#B15-clockssleep-06-00025).

# Tasks
# Annotations

