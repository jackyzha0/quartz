

# Towards Biologically Plausible Deep Learning
Read:: 
- [ ] Towards Biologically Plausible Deep Learning🛫 2022-07-22 #reading #citation #p1
Print::  ❌
Zotero Link:: NA
PDF:: NA
Files:: [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/XGFCIM8A/1502.html); [Bengio et al_2016_Towards Biologically Plausible Deep Learning.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/IC9HU7BZ/Bengio%20et%20al_2016_Towards%20Biologically%20Plausible%20Deep%20Learning.pdf)
Reading Note:: [[Yoshua Bengio, Dong-Hyun Lee, Jorg Bornschein, Thomas Mesnard, Zhouhan Lin 2016]]
Web Rip:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "bengioBiologicallyPlausibleDeep2016" 
SORT file.cday DESC
```

# Abstract
Neuroscientists have long criticised deep learning algorithms as incompatible with current knowledge of neurobiology. We explore more biologically plausible versions of deep representation learning, focusing here mostly on unsupervised learning but developing a learning mechanism that could account for supervised, unsupervised and reinforcement learning. The starting point is that the basic learning rule believed to govern synaptic weight updates (Spike-Timing-Dependent Plasticity) arises out of a simple update rule that makes a lot of sense from a machine learning point of view and can be interpreted as gradient descent on some objective function so long as the neuronal dynamics push firing rates towards better values of the objective function (be it supervised, unsupervised, or reward-driven). The second main idea is that this corresponds to a form of the variational EM algorithm, i.e., with approximate rather than exact posteriors, implemented by neural dynamics. Another contribution of this paper is that the gradients required for updating the hidden states in the above variational interpretation can be estimated using an approximation that only requires propagating activations forward and backward, with pairs of layers learning to form a denoising auto-encoder. Finally, we extend the theory about the probabilistic interpretation of auto-encoders to justify improved sampling schemes based on the generative interpretation of denoising auto-encoders, and we validate all these ideas on generative learning tasks.

# Quick Reference


# Top Comments


# Topics


# Tasks

# Associated Works
[Paper Discovery | Inciteful.xyz](https://inciteful.xyz/p/192663521)
[Towards Biologically Plausible Deep Learning](https://www.connectedpapers.com/main/1c3e323d69a41ca914f714e6c1c88ee1e1d9c06a/Towards-Biologically-Plausible-Deep-Learning/graph)

<iframe src="https://www.connectedpapers.com/main/1c3e323d69a41ca914f714e6c1c88ee1e1d9c06a/Towards-Biologically-Plausible-Deep-Learning/derivative" allow="fullscreen" allowfullscreen="" style="height: 100%; width: 100%; aspect-ratio: 1 / 1;"></iframe>
--
# Extracted Annotations and Comments