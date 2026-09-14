---
title: Near real-time online reinforcement learning with synchronous or asynchronous updates
aliases:
  - Radac et al. (2025)
project: NA
type: citation
status: open
priority: p5
created: 2025-10-07 16:13
modified: 2025-10-16 14:44
tags:
  - todoist
  - Software
  - rd
  - Electrical and electronic engineering
  - Computer science
  - citation
zt-attachments:
  - "5302"
zotero-key: VBQB7NJY
year: 2025
people:
  - Mircea-Bogdan Radac
  - Darius-Pavel Chirla
DOI: 10.1038/s41598-025-00492-7
dateadd: 2025-10-07T13:24:26.000Z
citetype: journalArticle
citekey: radacRealtimeOnlineReinforcement2025
---

# Near Real-time Online Reinforcement Learning with Synchronous or Asynchronous Updates
> [!Index Card]
> Journal:: “Scientific Reports”
> About::
> Read:: - [ ] Radac et al. (2025) - **Near real-time online reinforcement learning with synchronous or asynchronous updates** ➕2025-10-07 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/VBQB7NJY)
> Files:: [attachment](<file:///C:/Users/michaelt/Zotero/new_storage/2025/10/radacRealtimeOnlineReinforcement2025/Radac%20and%20Chirla%20-%202025%20-%20Near%20real-time%20online%20reinforcement%20learning%20with%20synchronous%20or%20asynchronous%20updates.pdf>)
> Reading Note::
> Web Rip::
> url:: https://www.nature.com/articles/s41598-025-00492-7
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "radacRealtimeOnlineReinforcement2025" 
> SORT file.cday DESC
> ```

> [!Abstract]
> Reinforcement Learning (RL) is a well-known method for learning control of complex and unknown dynamical systems. In this paper, we propose a solution for addressing a major limitation of the existing RL schemes when it comes to interleaving the environment interaction step with the learning step. Leveraging the neural network approximation complexity with the real-time learning capability is one of several reasons for which RL has not been adopted more in practical control systems.
>
> Our online learning solution with near real-time capability is piloted by a model-reference tracking control problem where the underlying system state is encoded as a moving window of past output and input signals expanded with the reference model state and with the reference input state.
>
> **The value function and the controller neural networks are trained online using the rules of backpropagation**, based on the interaction experiences with the system.
>
> Two case studies, a simulation one and an experimental one involving a real hardware, show that the proposed methodology is valid. We compare learning performance operation times under two popular, high-level software packages with automatic differentiation capabilities, under both synchronous and asynchronous updates. The software challenges are discussed in detail based on code runtime numbers, concluding that for lower order systems with relative fast dynamics and adaptive characteristics, there is a strong incentive to further develop online synchronous RL that are closer to the real-time requirements. While the asynchronous online RL motivates scaling up the learning method to higher dimensional systems with faster dynamics, even in non hard real-time setups.
# Quick Reference

# Top Notes

# Tasks
# Annotations

