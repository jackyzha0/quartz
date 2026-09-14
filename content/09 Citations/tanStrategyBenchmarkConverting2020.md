---
zotero-key: QR5I4AAU
zt-attachments:
  - "2571"
title: Strategy and Benchmark for Converting Deep Q-Networks to Event-Driven Spiking Neural Networks
citekey: tanStrategyBenchmarkConverting2020
aliases:
  - Tan et al. (2020)
people:
  - Weihao Tan
  - Devdhar Patel
  - Robert Kozma
dateadd: 2022-05-20T14:31:28.000Z
citetype: report
year: 2020
tags:
  - Computer Science - Machine Learning
  - Computer Science - Neural and Evolutionary Computing
type: citation
status: open
project: NA
priority: p5
created: 2023-11-27 15:32
modified: 2025-01-29 14:05
---
# Strategy and Benchmark for Converting Deep Q-Networks to Event-Driven Spiking Neural Networks
Read:: - [ ] Tan et al. (2020) - Strategy and Benchmark for Converting Deep Q-Networks to Event-Driven Spiking Neural Networks ➕2023-11-27 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/QR5I4AAU)
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/DWXSVHH6/Tan%20et%20al_2020_Strategy%20and%20Benchmark%20for%20Converting%20Deep%20Q-Networks%20to%20Event-Driven%20Spiking.pdf>)
Reading Note::
Web Rip::
url:: http://arxiv.org/abs/2009.14456

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "tanStrategyBenchmarkConverting2020" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> Spiking neural networks (SNNs) have great potential for energy-efficient implementation of Deep Neural Networks (DNNs) on dedicated neuromorphic hardware. Recent studies demonstrated competitive performance of SNNs compared with DNNs on image classification tasks, including CIFAR-10 and ImageNet data. The present work focuses on using SNNs in combination with deep reinforcement learning in ATARI games, which involves additional complexity as compared to image classification. We review the theory of converting DNNs to SNNs and extending the conversion to Deep Q-Networks (DQNs). We propose a robust representation of the firing rate to reduce the error during the conversion process. In addition, we introduce a new metric to evaluate the conversion process by comparing the decisions made by the DQN and SNN, respectively. We also analyze how the simulation time and parameter normalization influence the performance of converted SNNs. We achieve competitive scores on 17 top-performing Atari games. To the best of our knowledge, our work is the first to achieve state-of-the-art performance on multiple Atari games with SNNs. Our work serves as a benchmark for the conversion of DQNs to SNNs and paves the way for further research on solving reinforcement learning tasks with SNNs.
# Quick Reference

# Top Notes

# Tasks










# Extracted Annotations and Comments

> [!Highlight] Page 2
> 	Our approach provides a more accurate approximation of the firing rates of spiking neurons as compared to the equivalent analog activation value proposed by (Rueckauer et al. 2017).
> ^J48ZGX2GaDWXSVHH6p2

> [!Highlight] Page 2
> 	we propose a more robust representation of firing rate by using the membrane voltage at the end of the simulation time to reduce the error caused during the conversion process
> ^V9MELCS9aDWXSVHH6p2

> [!Highlight] Page 3
> 	The spiking neuron we use is the IF neuron, which is one of the simplest spiking neuron models. The IF neuron simply integrates its input until the membrane potential exceeds the voltage threshold and a spike is generated. IF neuron does not have a decay mechanism, and we assume that there is no refractory period, which is more similar to the artificial neuron.
> ^37JLFE3DaDWXSVHH6p3


# Figures
![[content/09 Citations/tanStrategyBenchmarkConverting2020_Amedia/image-20230427164611214.png]]



![[60 Zotero/Citations/tanStrategyBenchmarkConverting2020_Amedia/image-20230427161631140.png]]










