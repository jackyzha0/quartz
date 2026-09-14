---
title: Human-Level Control Through Directly Trained Deep Spiking $Q$-Networks
aliases:
  - Liu et al. (2022)
project: NA
type: citation
status: open
priority: p5
created: 2023-11-27 15:42
modified: 2025-03-06 11:33
tags:
  - tp
  - todoist
  - rd
  - p5
  - citation
zt-attachments:
  - "3781"
zotero-key: P624LQ4B
year: 2022
people:
  - Xiurui Xie
  - Wenjie Deng
  - Li Huang
  - Huajin Tang
  - Guisong Liu
journal: IEEE Transactions on Cybernetics
DOI: 10.1109/TCYB.2022.3198259
dateadd: 2023-02-01T12:51:00.000Z
citetype: journalArticle
citekey: liuHumanLevelControlDirectly2022
---

# Human-Level Control Through Directly Trained Deep Spiking $Q$-Networks
Read:: - [ ] Liu et al. (2022) - Human-Level Control Through Directly Trained Deep Spiking $Q$-Networks ➕2023-11-27 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/P624LQ4B)
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/QNWWEUWG/Liu%20et%20al_2022_Human-Level%20Control%20Through%20Directly%20Trained%20Deep%20Spiking%20$Q$-Networks.pdf>)
Reading Note::
Web Rip::
url:: https://ieeexplore.ieee.org/document/9877913/

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "liuHumanLevelControlDirectly2022" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> As the third-generation neural networks, spiking neural networks (SNNs) have great potential on neuromorphic hardware because of their high energy efficiency. However, deep spiking reinforcement learning (DSRL), that is, the reinforcement learning (RL) based on SNNs, is still in its preliminary stage due to the binary output and the nondifferentiable property of the spiking function. To address these issues, we propose a deep spiking Q -network (DSQN) in this article. Specifically, we propose a directly trained DSRL architecture based on the leaky integrate-and-fire (LIF) neurons and deep Q -network (DQN). Then, we adapt a direct spiking learning algorithm for the DSQN. We further demonstrate the advantages of using LIF neurons in DSQN theoretically. Comprehensive experiments have been conducted on 17 top-performing Atari games to compare our method with the state-of-the-art conversion method. The experimental results demonstrate the superiority of our method in terms of performance, stability, generalization and energy efficiency. To the best of our knowledge, our work is the first one to achieve state-of-the-art performance on multiple Atari games with the directly trained SNN.
# Quick Reference

# Top Notes

# Tasks

# Further Reading

> - [ ] [24] D. Patel, H. Hazan, D. J. Saunders, H. T. Siegelmann, and R. Kozma, “Improved robustness of reinforcement learning policies upon conversion to spiking neuronal network platforms applied to atari breakout game,” Neural Networks, vol. 120, pp. 108–115, 2019. #rd #p5 ➕2023-11-27
> ^EK499NM3aQNWWEUWGp11

> - [ ] [26] B. Rueckauer, I.-A. Lungu, Y. Hu, M. Pfeiffer, and S.-C. Liu, “Conversion of continuous-valued deep networks to efficient event-driven networks for image classification,” Frontiers in Neuroscience, vol. 11, p. 682, 2017. #rd #p5 ➕2023-11-27
> ^Q2XRLI8WaQNWWEUWGp11

> - [ ] [28] W. Tan, D. Patel, and R. Kozma, “Strategy and benchmark for converting deep q-networks to event-driven spiking neural networks,” Proceedings of the AAAI Conference on Artificial Intelligence, vol. 35, no. 11, pp. 9816–9824, May 2021. #rd #p5 ➕2023-11-27
> ^5ZJDR77QaQNWWEUWGp11

# Topics

> ## firing rate encoding #tp
>
> I think this is plenty self explanatory but what does it mean in the sense of encoding data. How does a continuous value map on to this here
> ^JRY6PZKDaQNWWEUWGp3

# Extracted Annotations and Comments

> [!Highlight] Page 2
> we use Leaky Integrate-and-Fire (LIF) neurons in DSQN with firing rate coding and appropriate but extremely short simulation time window (64 timesteps) to address the issue of the confusing Q-values. In addition, we adapt a spiking surrogate gradient learning algorithm to achieve the direct training for DSQN.
> ^SKWDHCWJaQNWWEUWGp2

> [!Highlight] Page 2
> After that, [24] is the first work to introduce spiking conversion methods to the domain of deep Q-learning. They demonstrated that both shallow and deep ReLU networks can be converted to SNNs without performance degradation on Atari game Breakout. Then, they showed that the converted SNN is more robust to input perturbations than the original neural network. However, it only focuses on improving the robustness rather than the performance of SNNs on Atari games.
> ^9DJJ5D32aQNWWEUWGp2

> [!Highlight] Page 2
> To further improve the performance, [28] proposed a more effective conversion method based on the more accurate approximation of the spiking firing rates. It reduced the conversion error based on a pre-trained DQN, and achieved state-ofthe-art performance on multiple Atari games
> ^K77E9XPAaQNWWEUWGp2

> [!Highlight] Page 2
> In contrast to the existing methods, our method is directly trained by spiking surrogate gradient learning on LIF neurons. This makes it more flexible and reduces the training cost because it has no dependence on pre-trained ANNs and only requires extremely short simulation time window.
>
> ---
> Ok so I believe it is completely made up of Sn
> ^BIM6RLCJaQNWWEUWGp2

> [!Highlight] Page 3
> A. Architecture of DSQN
> ^QXNJAJDLaQNWWEUWGp3

> [!Highlight] Page 3
> We use LIF neurons in DSQN to from a directly trained Deep Spiking Reinforcement Learning architecture.
> ^QA2IZQQQaQNWWEUWGp3

> [!Highlight] Page 7
> The proposed DSQN consists of three convolution layers and two fully connected layers.
> ^6DJPMGZ9aQNWWEUWGp7

> [!Highlight] Page 7
> The specific parameters of the three convolution layers are shown in Table II, while the two fully connected layers use different paramaters. The first fully connected layer FC1 has 512 neurons, and the final layer FC2 has different neurons on different Atari games, from 4 to 18, depending on the number of validate actions in the game.
> ^2Z7W4282aQNWWEUWGp7

# Figures (blue)

> [!Figure 1.]
> ![[content/09 Citations/liuHumanLevelControlDirectly2022_Amedia/3Q4AJHI4.png]]
> **Page 2**
>
> ---
> Figure 1.
> ^3Q4AJHI4aQNWWEUWGp2

