---
title: A neuromorphic multi-scale approach for real-time heart rate and state detection
aliases:
  - De Luca et al. (2025)
project: NA
type: citation
status: open
priority: p5
created: 2025-10-16 12:30
modified: 2025-10-17 16:23
tags:
  - todoist
  - rd
  - Information theory and computation
  - Electrical and electronic engineering
  - Computational science
  - citation
zt-attachments:
  - "5456"
zotero-key: 2PG4DPYM
year: 2025
people:
  - Mirco Tincani
  - Giacomo Indiveri
  - Elisa Donati
  - Chiara De Luca
DOI: 10.1038/s44335-025-00024-6
dateadd: 2025-10-16T09:13:26.000Z
citetype: journalArticle
citekey: delucaNeuromorphicMultiscaleApproach2025
---

# A Neuromorphic Multi-scale Approach for Real-time Heart Rate and State Detection
> [!Index Card]
> About::
> Journal:: “npj Unconventional Computing”
> Read:: - [ ] De Luca et al. (2025) - **A neuromorphic multi-scale approach for real-time heart rate and state detection** ➕2025-10-16 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/2PG4DPYM)
> Repo:: https://gitlab.com/neuroinf/monotonic_nsm
> Files:: [attachment](<file:///home/michaelt/Zotero/storage/9AM57ZT6/De%20Luca%20et%20al.%20-%202025%20-%20A%20neuromorphic%20multi-scale%20approach%20for%20real-time.pdf>)
> Reading Note::
> Web Rip:: [[A neuromorphic multi-scale approach for real-time heart rate and state detection]]
> url:: https://www.nature.com/articles/s44335-025-00024-6
> see:: [[Neural State Machines]][[Winner Takes All]]
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "delucaNeuromorphicMultiscaleApproach2025" 
> SORT file.cday DESC
> ```

> [!Abstract]
> With the advent of novel sensor and machine learning technologies, it is becoming possible to develop wearable systems that perform continuous recording and processing of biosignals for health or body state assessment. For example, modern smartwatches can already track physiological functions, including heart rate and its anomalies, with high precision. However, stringent constraints on size and energy consumption pose significant challenges for always-on operation to detect trends across multiple time scales for extended periods of time. To address these challenges, we propose an alternative solution that exploits the ultra-low power consumption features of mixed-signal neuromorphic technologies. We present a biosignal processing architecture that integrates multimodal sensory inputs and processes them using the principles of neural computation to reliably detect trends in heart rate and physiological states. We validate this architecture on a mixed-signal neuromorphic processor and demonstrate its robust operation despite the inherent variability of the analog circuits present in the system. In addition, we demonstrate how the system can process multi scale signals, namely instantaneous heart rate and its long-term states discretized into distinct zones, effectively detecting monotonic changes over extended periods that indicate pathological conditions such as agitation. This approach paves the way for a new generation of energy-efficient stand-alone wearable devices that are particularly suited for scenarios that require continuous health monitoring with minimal device maintenance.
# Top Notes
### Training Method - [[Nelder-Mead algorithm]]
> The goal was to align the firing rates of the resulting LIF neuron outputs with those derived from the ECG. A comparison between each band’s ECG (i.e., target), PPG, and cleaned signals—optimized across all inputs, subject-specific, and exercise-specific—is shown in Figure [7](https://www.nature.com/articles/s44335-025-00024-6#Fig7), along with the spiking data output from each LIF neuron.

> The optimization process employed the Nelder-Mead algorithm[48](https://www.nature.com/articles/s44335-025-00024-6#ref-CR48 "Glaudell, R., Garcia, R. T. & Garcia, J. B. Nelder-mead simplex method. Computer Journal 7, 308–313 (1965)."), a derivative-free method that is well-suited for optimizing complex, non-differentiable objective functions. The algorithm iteratively refines a set of simplex points to minimize the RRMSE between the firing rate curves derived from the LIF outputs and the reference ECG-derived firing rates. This approach avoids gradient-based methods, which are not ideal due to the overly smooth gradient landscape of the problem. Instead, we used random initialization followed by 20 iterations of optimization to converge on an optimal solution.

> This method was applied to optimize the combination of signals either across all data samples or independently per subject or exercise type. Our results indicate that exercise-specific optimization yields performance comparable to subject-specific optimization, which enhances practical applicability. Although this traditional optimization approach is simpler compared to advanced methods, it yielded satisfactory results, balancing computational efficiency with the need for accurate removal of motion artifacts. Other approaches, such as deep learning models, require large amounts of data for training, while offline methods that analyze the full signal dynamics can be computationally expensive and less practical for real-time applications.
# Quick Reference

# Tasks
# Annotations

