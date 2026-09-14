---
title: Action suppression reveals opponent parallel control via striatal circuits
aliases:
  - Bruno F. Cruz, Gonçalo Guiomar, Sofia Soares, Asma Motiwala, Christian K.
    Machens, Joseph J. Paton 2022
project: survey paper/timing tasks
type: citation
status: open
created: 2022-07-12 14:37
modified: 2025-03-06 09:35
tags:
  - timing-task
  - RL
  - rd
  - multi-agent system
  - Learning algorithms
  - interval-timing
  - Basal ganglia
year: 2022
URL: NA
people:
  - Sofia Soares
  - Joseph J. Paton
  - Gonçalo Guiomar
  - Christian K. Machens
  - Bruno F. Cruz
  - Asma Motiwala
journal: Nature
file: ""
DOI: 10.1038/s41586-022-04894-9
dateadd: 2022-07-12T12:35:51Z
collection: Interval Timing
citetype: journalArticle
citekey: cruzActionSuppressionReveals2022
---

# Action Suppression Reveals Opponent Parallel Control via Striatal Circuits
Read:: Partially. Left off right before the discussion section. Also a ton of methods to hash through.
Print:: ❌
Zotero Link:: NA
PDF:: NA
Files:: [Cruz et al_2022_Action suppression reveals opponent parallel control via striatal circuits.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/6EGD62RE/Cruz%20et%20al_2022_Action%20suppression%20reveals%20opponent%20parallel%20control%20via%20striatal%20circuits.pdf); [Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/GPYVCDEV/s41586-022-04894-9.html)
Reading Note:: [[Bruno F. Cruz, Gonçalo Guiomar, Sofia Soares, Asma Motiwala, Christian K. Machens, Joseph J. Paton 2022]]
Web Rip:: [ [[Scientists discover how the brain keeps the urge to act in check  Champalimaud Foundation - 12.07.22]] , [[Action suppression reveals opponent parallel control via striatal circuits - 12.07.22]]]

# Abstract
The direct and indirect pathways of the basal ganglia are classically thought to promote and suppress action, respectively1. However, the observed co-activation of striatal direct and indirect medium spiny neurons2 (dMSNs and iMSNs, respectively) has challenged this view. Here we study these circuits in mice performing an interval categorization task that requires a series of self-initiated and cued actions and, critically, a sustained period of dynamic action suppression. Although movement produced the co-activation of iMSNs and dMSNs in the sensorimotor, dorsolateral striatum (DLS), fibre photometry and photo-identified electrophysiological recordings revealed signatures of functional opponency between the two pathways during action suppression. Notably, optogenetic inhibition showed that DLS circuits were largely engaged to suppress—and not promote—action. Specifically, iMSNs on a given hemisphere were dynamically engaged to suppress tempting contralateral action. To understand how such regionally specific circuit function arose, we constructed a computational reinforcement learning model that reproduced key features of behaviour, neural activity and optogenetic inhibition. The model predicted that parallel striatal circuits outside the DLS learned the action-promoting functions, generating the temptation to act. Consistent with this, optogenetic inhibition experiments revealed that dMSNs in the associative, dorsomedial striatum, in contrast to those in the DLS, promote contralateral actions. These data highlight how opponent interactions between multiple circuitand region-specific basal ganglia processes can lead to behavioural control, and establish a critical role for the sensorimotor indirect pathway in the proactive suppression of tempting actions.

# Quick Reference
## Sensorimotor, Dorsolateral Striatum (DLS)

## Broken Fixations
Failure to maintain position in the initiation port until the second tone led to an error tone and trial termination

# Top Comments
- [ ] [Action suppression reveals opponent parallel control via striatal circuits | Nature](https://www.nature.com/articles/s41586-022-04894-9) #rd #timing-task #interval-timing ^0w02ni
	- Turned this into [[cruzActionSuppressionReveals2022|Bruno F. Cruz, Gonçalo Guiomar, Sofia Soares, Asma Motiwala, Christian K. Machens, Joseph J. Paton 2022]] ^4h0zh9
	- Temporal bisection task that relies on stim in a different way ^444vwj
	- More in line with a interval task methinks ^wbq20l
	- [Scientists discover how the brain keeps the urge to act in check | Champalimaud Foundation](https://fchampalimaud.org/news/scientists-discover-how-brain-keeps-urge-act-check) ^l0p5n2
	-  [7/8 1:10 PM] Gustavo Borges Moreno e Mello ^wgrgii
		- Evidence that biological systems can actually operate as a multiple agent system ^pcuibz
		- This maps into the idea of continuous learning where a section of a network (active  motor plan) is being optimized while others( competing motor plans) are being mildly affected  by competition and a third class of motor plans (the inactive ones,) are in affected. ^pqt00u
	- Paton took an original approach to the problem. Whereas previous studies investigated the basal ganglia during movement, Paton’s team focused on active action suppression instead. The team designed a task where mice had to determine whether an interval separating two tones was longer or shorter than 1.5 seconds. If it was shorter, a reward would be provided on the left side of the box, and if it was longer, it would be available on the right. "The key was that the mouse had to stay still in the period between the two tones", said Bruno Cruz, a doctoral student in the lab. "So even if the animal was certain the 1.5-second mark had passed, it needed to suppress the urge to move until after the second tone sounded, and only then go for the reward."

# Topics

# Tasks

----
# Notes
So they don’t really say what the math model is in the web article

Alright so the task is to basically not move while performing the timing task.
If they move, it’s a **broken fixation**

----
# Extracted Annotations and Comments

> According to the authors, this observation suggests that the indirect pathway flexibly supports the behavioural goals of the animal. "As time passes, the mouse becomes more confident that it’s in a ‘long-interval’ trial. And so its urge to move becomes increasingly more difficult to restrain. It’s likely that this continuous increase in activity reflects this internal struggle," Cruz explained.  ^iwrv6a

> Inspired by this idea, Cruz tested the effect of inhibiting the indirect pathway. This manipulation caused the mice to behave impulsively more often, significantly increasing the number of trials where they darted to the reward port prematurely. With this innovative approach, the team effectively uncovered an “impulsivity switch”.

> The team identified a brain region that actively suppresses the drive to act, but where does that drive originate? Since the direct pathway is thought to promote action, the immediate suspect was the direct pathway of the same region. However, the mouse's behaviour was practically unaffected when the researchers inhibited it.
- Behavior unaffected from the impulsivity complex
> The team identified a brain region that actively suppresses the drive to act, but where does that drive originate? Since the direct pathway is thought to promote action, the immediate suspect was the direct pathway of the same region. However, the mouse's behaviour was practically unaffected when the researchers inhibited it.
- Ok so they inhibited the direct pathway in a ***different region*** not the same region shared the inhibited indirect pathway

> ![[Action suppression reveals opponent parallel control via striatal circuits - 12.07.22#^uvsamt]]

![[Action suppression reveals opponent parallel control via striatal circuits - 12.07.22#^uvsamt]]