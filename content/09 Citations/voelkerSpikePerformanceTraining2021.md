---
zotero-key: W6UGS2L2
zt-attachments:
  - "5469"
title: "A Spike in Performance: Training Hybrid-Spiking Neural Networks with Quantized Activation Functions"
citekey: voelkerSpikePerformanceTraining2021
aliases:
  - Voelker et al. (2021)
people:
  - Aaron R. Voelker
  - Daniel Rasmussen
  - Chris Eliasmith
dateadd: 2022-04-29T10:43:05.000Z
citetype: journalArticle
year: 2021
journal: arXiv:2002.03553 [cs, q-bio, stat]
tags:
  - Computer Science - Machine Learning
  - Statistics - Machine Learning
  - Quantitative Biology - Neurons and Cognition
type: citation
status: open
project: NA
priority: p5
created: 2024-06-05 02:07
---
# A Spike in Performance: Training Hybrid-Spiking Neural Networks with Quantized Activation Functions
Read:: - [ ] Voelker et al. (2021) - **A Spike in Performance: Training Hybrid-Spiking Neural Networks with Quantized Activation Functions** ➕2024-06-05 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/W6UGS2L2) 
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage_new/arXiv2002.03553%20[cs,%20q-bio,%20stat]_2021/Voelker%20et%20al_2021_A%20Spike%20in%20Performance.pdf>)
Reading Note::
Web Rip::
url:: http://arxiv.org/abs/2002.03553

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"Obsidian Assets"
WHERE citekey = "voelkerSpikePerformanceTraining2021" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> The machine learning community has become increasingly interested in the energy efficiency of neural networks. The Spiking Neural Network (SNN) is a promising approach to energy-efficient computing, since its activation levels are quantized into temporally sparse, one-bit values (i.e., "spike" events), which additionally converts the sum over weight-activity products into a simple addition of weights (one weight for each spike). However, the goal of maintaining state-of-the-art (SotA) accuracy when converting a non-spiking network into an SNN has remained an elusive challenge, primarily due to spikes having only a single bit of precision. Adopting tools from signal processing, we cast neural activation functions as quantizers with temporally-diffused error, and then train networks while smoothly interpolating between the non-spiking and spiking regimes. We apply this technique to the Legendre Memory Unit (LMU) to obtain the first known example of a hybrid SNN outperforming SotA recurrent architectures -- including the LSTM, GRU, and NRU -- in accuracy, while reducing activities to at most 3.74 bits on average with 1.26 significant bits multiplying each weight. We discuss how these methods can significantly improve the energy efficiency of neural networks.
# Quick Reference

# Top Notes

# Tasks






















