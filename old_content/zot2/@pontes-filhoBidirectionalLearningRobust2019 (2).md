

# Bidirectional Learning for Robust Neural Networks
Read:: 
- [ ] Bidirectional Learning for Robust Neural Networks Sidney Pontes-Filho, Marcus Liwicki 2019 🛫 NA #reading #citation
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/SPYERV6H/1805.html); [Pontes-Filho_Liwicki_2019_Bidirectional Learning for Robust Neural Networks.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/VMHAAANY/Pontes-Filho_Liwicki_2019_Bidirectional%20Learning%20for%20Robust%20Neural%20Networks.pdf)

Reading Note:: [[S. Pontes-Filho, M. Liwicki (2019)]]
Reading Note:: [[Sidney Pontes-Filho, Marcus Liwicki 2019]]
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
A multilayer perceptron can behave as a generative classifier by applying bidirectional learning (BL). It consists of training an undirected neural network to map input to output and vice-versa; therefore it can produce a classifier in one direction, and a generator in the opposite direction for the same data. The learning process of BL tries to reproduce the neuroplasticity stated in Hebbian theory using only backward propagation of errors. In this paper, two novel learning techniques are introduced which use BL for improving robustness to white noise static and adversarial examples. The first method is bidirectional propagation of errors, which the error propagation occurs in backward and forward directions. Motivated by the fact that its generative model receives as input a constant vector per class, we introduce as a second method the hybrid adversarial networks (HAN). Its generative model receives a random vector as input and its training is based on generative adversarial networks (GAN). To assess the performance of BL, we perform experiments using several architectures with fully and convolutional layers, with and without bias. Experimental results show that both methods improve robustness to white noise static and adversarial examples, and even increase accuracy, but have different behavior depending on the architecture and task, being more beneficial to use the one or the other. Nevertheless, HAN using a convolutional architecture with batch normalization presents outstanding robustness, reaching state-of-the-art accuracy on adversarial examples of hand-written digits.

# Quick Reference


# Top Comments
According to Sidney this is similar to [[Citation Peter Diehl, Matthew Cook - 2015]] in that the weights encoded by this method are very similar to those found in hebbian learning.


# Topics


# Tasks


--
# Extracted Annotations and Comments