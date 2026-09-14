

# Accurate online training of dynamical spiking neural networks through Forward Propagation Through Time
Read:: 
- [ ] Accurate online training of dynamical spiking neural networks through Forward Propagation Through Time B. Yin, F. Corradi, S.M. Bohte 2022 🛫 NA #reading #citation
Print::  ❌
Zotero Link:: NA
PDF:: NA
Files:: [arXiv.org Snapshot](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/HXFC3LK4/2112.html); [Yin et al_2022_Accurate online training of dynamical spiking neural networks through Forward.pdf](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/K6DFEJBE/Yin%20et%20al_2022_Accurate%20online%20training%20of%20dynamical%20spiking%20neural%20networks%20through%20Forward.pdf)
Reading Note:: [[B. Yin, F. Corradi, S.M. Bohte (2022)]]
Web Rip:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "yinAccurateOnlineTraining2022" 
SORT file.cday DESC
```


> [!Excerpt] Abstract
> The event-driven and sparse nature of communication between spiking neurons in the brain holds great promise for flexible and energy-efficient AI. Recent advances in learning algorithms have demonstrated that recurrent networks of spiking neurons can be effectively trained to achieve competitive performance compared to standard recurrent neural networks. Still, as these learning algorithms use error-backpropagation through time (BPTT), they suffer from high memory requirements, are slow to train, and are incompatible with online learning. This limits the application of these learning algorithms to relatively small networks and to limited temporal sequence lengths. Online approximations to BPTT with lower computational and memory complexity have been proposed (e-prop, OSTL), but in practice also suffer from memory limitations and, as approximations, do not outperform standard BPTT training. Here, we show how a recently developed alternative to BPTT, Forward Propagation Through Time (FPTT) can be applied in spiking neural networks. Different from BPTT, FPTT attempts to minimize an ongoing dynamically regularized risk on the loss. As a result, FPTT can be computed in an online fashion and has fixed complexity with respect to the sequence length. When combined with a novel dynamic spiking neuron model, the Liquid-Time-Constant neuron, we show that SNNs trained with FPTT outperform online BPTT approximations, and approach or exceed offline BPTT accuracy on temporal classification tasks. This approach thus makes it feasible to train SNNs in a memory-friendly online fashion on long sequences and scale up SNNs to novel and complex neural architectures.


# Quick Reference

# Top Comments

# Tasks

# Topics
## e-prop
- [10] [(p. 1)](zotero://open-pdf/library/items/K6DFEJBE?page=1&annotation=D7K65UA8)  "Todo"
## Online spatio-temporal learning (OSTL)
- [11] [(p. 1)](zotero://open-pdf/library/items/K6DFEJBE?page=1&annotation=VRCLWAGS)  "Todo"

# Further Reading 
- [ ] [10] Guillaume Bellec et al. “A solution to the learning dilemma for recurrent networks of spiking neurons”. In: Nature communications 11.1 (2020), pp. 1–15. [(p. 11)](zotero://open-pdf/library/items/K6DFEJBE?page=11&annotation=TWMJX2AG)  #rd #p5
- [ ] [11] Thomas Bohnstingl et al. “Online spatio-temporal learning in deep neural networks”. In: arXiv preprint arXiv:2007.12723 (2020). [(p. 11)](zotero://open-pdf/library/items/K6DFEJBE?page=11&annotation=6XCJ7RVD)  #rd #p5 

--
# Extracted Annotations and Comments


# Figures