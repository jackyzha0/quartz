---
title: Interval timing in deep reinforcement learning agents
aliases:
  - Deverett et al. (2019)
project: NA
type: citation
status: open
priority: p5
created: 2025-10-07 13:35
modified: 2025-10-16 14:25
tags:
  - todoist
  - rd
  - p5
  - citation
zt-attachments:
  - "1516"
zotero-key: HCR7TFGV
year: 2019
people:
  - R. Faulkner
  - Meire Fortunato
  - Joel Z. Leibo
  - Greg Wayne
  - B. Deverett
citetype: journalArticle
citekey: deverettIntervalTimingDeep2019
---

# Interval Timing in Deep Reinforcement Learning Agents
> [!Index Card]
> Journal:: “NeurIPS”
> About::
> Read:: - [ X] Deverett et al. (2019) - **Interval timing in deep reinforcement learning agents** ➕2025-10-07 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/HCR7TFGV)
> Files:: [attachment](<file:///C:/Users/michaelt/Zotero/new_storage/moving/NeurIPS_2019/Deverett%20et%20al_2019_Interval%20timing%20in%20deep%20reinforcement%20learning%20agents.pdf>)
> Reading Note::
> Web Rip::
> url:: [semanticscholar.org/paper/Interval-timing-in-deep-reinforcement-learning-Deverett-Faulkner/588c01cce0058a3176ece67e2e5df2e87fe5c325](https://www.semanticscholar.org/paper/Interval-timing-in-deep-reinforcement-learning-Deverett-Faulkner/588c01cce0058a3176ece67e2e5df2e87fe5c325)
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "deverettIntervalTimingDeep2019" 
> SORT file.cday DESC
> ```

> [!Abstract]
> This work characterize the strategies developed by recurrent and feedforward agents, which both succeed at temporal reproduction using distinct mechanisms, some of which bear specific and intriguing similarities to biological systems. The measurement of time is central to intelligent behavior. We know that both animals and artificial agents can successfully use temporal dependencies to select actions. In artificial agents, little work has directly addressed (1) which architectural components are necessary for successful development of this ability, (2) how this timing ability comes to be represented in the units and actions of the agent, and (3) whether the resulting behavior of the system converges on solutions similar to those of biology. Here we studied interval timing abilities in deep reinforcement learning agents trained end-to-end on an interval reproduction paradigm inspired by experimental literature on mechanisms of timing. We characterize the strategies developed by recurrent and feedforward agents, which both succeed at temporal reproduction using distinct mechanisms, some of which bear specific and intriguing similarities to biological systems. These findings advance our understanding of how agents come to represent time, and they highlight the value of experimentally inspired approaches to characterizing agent abilities.
# Quick Reference

# Top Notes
- It looks like they are doing the FI task as well
- This could be a good point of comparison
- Perhaps we can see what a deepRL method does when an SBF-A layer is attached in the online regime
- Their interval task is based on a monkey FI task: [A Neural Mechanism for Sensing and Reproducing a Time Interval: Current Biology](https://www.cell.com/current-biology/fulltext/S0960-9822(15)01009-X)
	- this works better with your DRl atari game framework as it has a visual stimulus
- They also quote using this:
	- Leibo, Joel Z., Cyprien de Masson d’Autume, Daniel Zoran, et al. “Psychlab: A Psychology Laboratory for Deep Reinforcement Learning Agents.” _ArXiv_, January 24, 2018. [https://www.semanticscholar.org/paper/927d904d2aad002eb71e8c6ee45218f31a103100](https://www.semanticscholar.org/paper/927d904d2aad002eb71e8c6ee45218f31a103100).
	- Whihc apparently is the framework for the RL task

# Tasks
# Annotations

## Further Reading

> - [ ] [5] R. M. Church and M. Z. Deluty. Bisection of temporal intervals. J Exp Psychol Anim Behav Process, 3(3):216–228, Jul 1977. #rd #p5 ➕2025-10-07
> ^52TBN8VYaF2QLSMTMp9

> - [ ] [13] M. Jazayeri and M. N. Shadlen. Temporal context calibrates interval timing. Nat. Neurosci., 13(8):1020–1026, Aug 2010. #rd #p5 ➕2025-10-07
> ^TQKSBMU3aF2QLSMTMp9

> - [ ] [14] Mehrdad Jazayeri and Michael N Shadlen. A neural mechanism for sensing and reproducing a time interval. Current Biology, 25(20):2599–2609, 2015. #rd #p5 ➕2025-10-07
> ^W22TRYWFaF2QLSMTMp9

> - [ ] [16] Uma R Karmarkar and Dean V Buonomano. Timing in the absence of clocks: encoding time in neural network states. Neuron, 53(3):427–438, 2007 #rd #p5 ➕2025-10-07
> ^9CJYZ285aF2QLSMTMp9

## Extracted Annotations and Comments

> [!Highlight] Page 2
> A deep reinforcement learning agent with a recurrent module (e.g. LSTM [10]) has, by construction, two distinct mechanisms for storing relevant timing information. First, the LSTM is a source of temporal memory, since it is designed to store past information in model parameters trained by way of backpropagation through time. Second, the reinforcement learning algorithm, regardless of the underlying function approximator, assigns the credit associated with rewards to specific past states and actions. A deep reinforcement learning agent without a recurrent module (i.e. purely feedforward) lacks the former mechanism but retains the latter one. When trained end-to-end on a timing task, it is unclear whether and how agents may come to implicitly or explicitly represent time.
> ^BPQESRDTaF2QLSMTMp2

> [!Highlight] Page 2
> We designed a task based on a temporal reproduction behavioral paradigm in the neuroscience literature [14]. The task was implemented in PsychLab [19], a simulated laboratory-like environment inside DeepMind lab [2] in which agents view a screen and make “eye” movements to obtain rewards. We have open-sourced the task (along with other related timing tasks) for use in future work.
>
> ---
> What are the other tasks?
> ^DTFZP532aF2QLSMTMp2

> [!Highlight] Page 2
> Figure 1: Interval reproduction task. The image sequence shows a single trial of the task. First, the agent fixates on a center cross, at which point the “Go” target appears. After a short delay, the red “Ready” cue flashes, followed by a randomly chosen “sample interval” delay. After the sample interval passes, the yellow “Set” cue flashes. Then the agent must wait for duration of the sample interval before gazing onto the “Go” target to end the trial. If the period over which it waited, the “production interval”, matches the sample interval within a tolerance, the agent is rewarded. This task is closely based on an existing temporal reproduction task for humans and non-human primates [14]. The task is shown in Fig. 1. In each trial, the agent fixates on a central start position, at which point a “Go” target appears on the screen, which will serve as the eventual gaze destination to end the trial. After a delay, a “Ready” cue flashes, followed by a specific “sample“ interval of time, then a “Set” cue flashes. Following the flash of the “Set” cue, the agent must wait for the duration of the sample interval before gazing onto the “Go” target to complete the trial. If the duration of the “production” interval (i.e. the elapsed time from “Set” cue appearance until gaze arrives on “Go” target) matches the sample interval within a specified tolerance, the agent is rewarded.
> ^AY2FVFSRaF2QLSMTMp2

> [!Highlight] Page 3
> The demands of this “temporal reproduction” task are twofold: the agent must first measure the temporal interval presented between two transient environmental events, and it then must reproduce that interval again before ending the trial. Trials are presented in episodes, with each episode containing 300 seconds or a maximum of 50 trials, whichever comes first. Each trial’s sample interval is selected randomly from the uniform range from 10-100 frames in steps of 10 (corresponding to 167-1667 ms at 60 frames per second). The agent is rewarded if the production interval is sufficiently close to the sample interval; specifically, if |tp − ts| < γs(α + βts), where tp is the production interval, ts is the sample interval, α is a baseline tolerance, β is a scaling factor like that used in [14] to account for scalar variability, and γs is an overall difficulty scaling factor for each sample interval s. In practice, we usually set α to 8 frames, β to zero, and γs evolved within an episode from 2.5 to 1.5 to 0, advancing each time two rewards were obtained at the given sample interval s. In practice we found that the results shown are robust to a wide range of parameters for this curriculum.
> ^IADTK56PaF2QLSMTMp3

