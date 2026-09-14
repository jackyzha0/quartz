

# Supervised learning in spiking neural networks with FORCE training
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [Nicola_Clopath_2017_Supervised learning in spiking neural networks with FORCE training.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/3W6N9KGK/Nicola_Clopath_2017_Supervised%20learning%20in%20spiking%20neural%20networks%20with%20FORCE%20training.pdf); [Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/UEVPXKLU/s41467-017-01827-3.html)
Reading Note:: [[Wilten Nicola, Claudia Clopath 2017]]

# Abstract
Populations of neurons display an extraordinary diversity in the behaviors they affect and display. Machine learning techniques have recently emerged that allow us to create networks of model neurons that display behaviors of similar complexity. Here we demonstrate the direct applicability of one such technique, the FORCE method, to spiking neural networks. We train these networks to mimic dynamical systems, classify inputs, and store discrete sequences that correspond to the notes of a song. 

Finally, we use FORCE training to create two biologically motivated model circuits. One is inspired by the zebra finch and successfully reproduces songbird singing. The second network is motivated by the hippocampus and is trained to store and replay a movie scene. FORCE trained networks reproduce behaviors comparable in complexity to their inspired circuits and yield information not easily obtainable with other techniques, such as behavioral responses to pharmacological manipulations and spike timing statistics. ^tzdwtn

# Quick Reference


# Top Comments
From [[old_content/zot2/@zenkeVisualizingJointFuture2021|@zenkeVisualizingJointFuture2021]]
> Time-continuous processing with instantaneous rates One of the first studies to showcase the potential of approaches to build spiking neural networks that solve concrete biological problems adapted the classic FORCE training algorithm for recurrent spiking neural networks (Nicola and Clopath, 2017). The central idea, which sidesteps the problem of having to compute gradients through spikes, is to solve a regression problem at every instant of time over linear combinations of temporally filtered spike trains while using the postsynaptic potential as the filter kernel. This approach does not require stationary firing rates, readily solves complex sequence generation problems, and is robust to the choice of neuron model.



# Topics


# Tasks


# Further Reading
33. London, M., Roth, A., Beeren, L., Häusser, M. & Latham, P. E. Sensitivity to perturbations in vivo implies high noise and suggests rate coding in cortex. Nature 466, 123–127 (2010).
34. Monteforte, M. & Wolf, F. Dynamic flux tubes form reservoirs of stability in neuronal circuits. Phys. Rev. X 2, 041007 (2012).
35. Hahnloser, R. H., Kozhevnikov, A. A. & Fee, M. S. An ultra-sparse code
underlies the generation of neural sequences in a songbird. Nature 419, 65–70 (2002).

36. Long, M. A., Jin, D. Z. & Fee, M. S. Support for a synaptic chain model of
neuronal sequence generation. Nature 468, 394–399 (2010).

	1. Leonardo, A. & Fee, M. S. Ensemble coding of vocal control in birdsong. J. Neurosci. 25, 652–661 (2005).

--
# Extracted Annotations and Comments