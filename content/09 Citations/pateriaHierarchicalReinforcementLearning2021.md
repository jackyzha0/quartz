---
zotero-key: TS7P2Q3Z
zt-attachments:
  - "5461"
title: "Hierarchical Reinforcement Learning: A Comprehensive Survey"
citekey: pateriaHierarchicalReinforcementLearning2021
aliases:
  - Pateria et al. (2021)
people:
  - Shubham Pateria
  - Budhitama Subagdja
  - Ah-hwee Tan
  - Chai Quek
dateadd: 2022-05-05T15:13:22.000Z
citetype: journalArticle
year: 2021
journal: ACM Computing Surveys
DOI: 10.1145/3453160
tags:
  - HRL
  - Hierarchical reinforcement learning
  - hierarchical reinforcement learning survey
  - hierarchical reinforcement learning taxonomy
  - skill discovery
  - subtask discovery
type: citation
status: open
project: NA
priority: p5
created: 2025-01-29 10:50
modified: 2025-01-29 10:51
---
# Hierarchical Reinforcement Learning: A Comprehensive Survey
> About::
> Read:: - [ ] Pateria et al. (2021) - **Hierarchical Reinforcement Learning: A Comprehensive Survey** ➕2025-01-29 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/TS7P2Q3Z)
> Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage_new/ACM%20Computing%20Surveys_2021/Pateria%20et%20al_2021_Hierarchical%20Reinforcement%20Learning.pdf>)
> Reading Note::
> Web Rip::
> url:: https://doi.org/10.1145/3453160
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "pateriaHierarchicalReinforcementLearning2021" 
> SORT file.cday DESC
> ```

> [!Abstract]
> Hierarchical Reinforcement Learning (HRL) enables autonomous decomposition of challenging long-horizon decision-making tasks into simpler subtasks. During the past years, the landscape of HRL research has grown profoundly, resulting in copious approaches. A comprehensive overview of this vast landscape is necessary to study HRL in an organized manner. We provide a survey of the diverse HRL approaches concerning the challenges of learning hierarchical policies, subtask discovery, transfer learning, and multi-agent learning using HRL. The survey is presented according to a novel taxonomy of the approaches. Based on the survey, a set of important open problems is proposed to motivate the future research in HRL. Furthermore, we outline a few suitable task domains for evaluating the HRL approaches and a few interesting examples of the practical applications of HRL in the Supplementary Material.
# Quick Reference

# Top Notes

# Tasks










# Extracted Annotations and Comments

> [!Highlight] Page 2
> 	transitions. The average length of such sequences1 is called the task horizon. If the horizon is long while the task involves large state and action spaces, then the exploration space also becomes large. This results in the poor performance of the standard RL algorithms [56, 68, 100] on such long-horizon tasks without sophisticated exploration techniques [10, 71, 75].
> ^A4A6W5X7a88KPT7CHp2

> [!Highlight] Page 2
> 	ong-horizon tasks without sophisticated exploration techniques [10, 71, 75]. Hierarchical Reinforcement Learning (HRL) decomposes a long-horizon reinforcement learning task into a hierarchy of subproblems or subtasks such that a higher-level policy learns to perform the task by choosing optimal subtasks as the higher-level actions. A subtask may itself be a reinforcement learning problem with a lower-level policy learning to solve it [39]. This hierarchy of policies collectively determines the behavior of the agent. Task decomposition effectively reduces the original task’s long horizon into a shorter horizon in terms of the sequences of subtasks. This is because each subtask is a higher-level action that persists for a longer timescale compared to a lower-level action, a property that is often referred to as temporal abstraction [7, 20, 93]. Temporal abstraction can also enable efficient credit assignment over longer timescales [99]. At the same time, a subtask may itself be easier to learn and the learned subtasks lead to more structured exploration over the course of training of the HRL agent [71].
> ^YK89IXYEa88KPT7CHp2












