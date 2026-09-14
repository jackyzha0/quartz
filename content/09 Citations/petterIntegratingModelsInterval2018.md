---
title: Integrating Models of Interval Timing and Reinforcement Learning
aliases:
  - Petter et al. (2018)
project: NA
type: citation
status: open
priority: p5
created: 2023-12-04 15:46
modified: 2025-08-31 17:20
tags:
  - todoist
  - rd
  - notion
  - citation
zt-attachments:
  - "3263"
zotero-key: 7VW6FFUL
year: 2018
people:
  - Warren H. Meck
  - Samuel J. Gershman
  - Elijah A. Petter
journal: Trends in Cognitive Sciences
DOI: 10.1016/j.tics.2018.08.004
dateadd: 2022-07-11T16:36:05.000Z
citetype: journalArticle
citekey: petterIntegratingModelsInterval2018
---

# Integrating Models of Interval Timing and Reinforcement Learning
Read:: - [ ] Petter et al. (2018) - Integrating Models of Interval Timing and Reinforcement Learning ➕2023-12-04 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/7VW6FFUL)
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/CMFVF84G/Petter%20et%20al_2018_Integrating%20Models%20of%20Interval%20Timing%20and%20Reinforcement%20Learning.pdf>)
Reading Note::
Web Rip::
url:: https://www.sciencedirect.com/science/article/pii/S1364661318301931

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "petterIntegratingModelsInterval2018" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> We present an integrated view of interval timing and reinforcement learning (RL) in the brain. The computational goal of RL is to maximize future rewards, and this depends crucially on a representation of time. Different RL systems in the brain process time in distinct ways. A model-based system learns ‘what happens when’, employing this internal model to generate action plans, while a model-free system learns to predict reward directly from a set of temporal basis functions. We describe how these systems are subserved by a computational division of labor between several brain regions, with a focus on the basal ganglia and the hippocampus, as well as how these regions are influenced by the neuromodulator dopamine.
# Quick Reference

# Top Notes

# Tasks

# Extracted Annotations and Comments

> [!Highlight] Page 911
> A model-based system learns ‘what happens when’, employing this internal model to generate action plans, while a model-free system learns to predict reward directly from a set of temporal basis functions.
> ^56G4VKHTaCMFVF84Gp1

> [!Highlight] Page 911
> The goal of RL is to maximize expected cumulative future reward (i.e., value). This requires the agent to solve a ‘prediction problem’, which requires estimating the value of each possible action, and an ‘optimization problem’, which involves balancing exploration and exploitation to select the optimal action.
> ^SPRV5UXMaCMFVF84Gp1

> [!Highlight] Page 912
> This example illustrates how an agent needs to anticipate when the reward will be delivered to solve the RL problem. In this case, the agent must explicitly encode time intervals as part of its state representation. Thus, IT is an integral part of RL, cutting across different algorithmic solutions.
> ^L4RWJMJMaCMFVF84Gp2

> [!Highlight] Page 912
> By contrast, different algorithms make use of time representation in different ways. Model-free algorithms use the time representation as a basis set for approximating the value function. Most commonly, this means approximating values as linear combinations of basis functions defined over time. In some instances, however, nonlinear function approximators, such as recurrent neural networks [9], may be more effective and biologically realistic representations of time.
> ^UDH2WCKEaCMFVF84Gp2

> [!Highlight] Page 912
> Model-based algorithms use the time representation to compute values by simulating the environmental dynamics. This is more computationally intensive than model-free algorithms, but endows model-based algorithms with more flexibility, because parameter changes in the internal model of temporal structure will immediately change the value estimates.
> ^QCSMJAZDaCMFVF84Gp2

> [!Highlight] Page 912
> Timing in Model-Free Reinforcement Learning Model-free algorithms directly estimate the value function by interacting with the environment. The canonical example is temporal difference (TD) learning [14], which uses the discrepancy between received and expected reward (the TD error) to update its value estimates (see Box 1 for technical details). This algorithm has been influential in neuroscience due to the correspondence between the TD error and the firing of midbrain dopamine neurons [15,16]. The value function is thought to be encoded at corticostriatal synapses, where plasticity is modulated by dopamine release similar to the circuits subserving IT [17–21]. This dopamine-dependent plasticity functions within a precise time window (i.e., 0.3–2.0 s), which has been demonstrated using optical activation of dopaminergic and glutamatergic afferents [22].
> ^W9M3LMPMaCMFVF84Gp2

# Figures
![[content/09 Citations/petterIntegratingModelsInterval2018_Amedia/petterIntegratingModelsInterval2018-image-20231204154703635.png]]

