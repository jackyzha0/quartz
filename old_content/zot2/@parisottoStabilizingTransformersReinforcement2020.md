

# Stabilizing Transformers for Reinforcement Learning
Read:: 
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [Parisotto et al_2020_Stabilizing Transformers for Reinforcement Learning.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/88MT2SFL/Parisotto%20et%20al_2020_Stabilizing%20Transformers%20for%20Reinforcement%20Learning.pdf); [Supplementary PDF](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/6ZX8LLE6/Parisotto%20et%20al.%20-%202020%20-%20Stabilizing%20Transformers%20for%20Reinforcement%20Learnin.pdf)
Reading Note:: [[Emilio Parisotto, Francis Song, Jack Rae, Razvan Pascanu, Caglar Gulcehre, Siddhant Jayakumar, Max Jaderberg, Raphaël Lopez Kaufman, Aidan Clark, Seb Noury, Matthew Botvinick, Nicolas Heess, Raia Hadsell 2020]]
Web Rip:: 
```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
SORT file.cday DESC
```

# Abstract
Owing to their ability to both effectively integrate information over long time horizons and scale to massive amounts of data, self-attention architectures have recently shown breakthrough success in natural language processing (NLP). Harnessing the transformer’s ability to process long time horizons of information could provide a similar performance boost in partially observable reinforcement learning (RL) domains, but the large-scale transformers used in NLP have yet to be successfully applied to the RL setting. In this work we demonstrate that the standard transformer architecture is difficult to optimize, which was previously observed in the supervised learning setting but becomes especially pronounced with RL objectives. We propose architectural modifications that substantially improve the stability and learning speed of the original Transformer and XL variant. The proposed architecture, the Gated Transformer-XL (GTrXL), surpasses LSTMs on challenging memory environments and achieves state-of-the-art results on the multi-task DMLab-30 benchmark suite, exceeding the performance of an external memory architecture. We show that the GTrXL has stability and performance that consistently matches or exceeds a competitive LSTM baseline, including on more reactive tasks where memory is less critical.

# Quick Reference


# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments