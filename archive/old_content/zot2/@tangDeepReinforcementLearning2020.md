

# Deep Reinforcement Learning with Population-Coded Spiking Neural Network for Continuous Control
Read:: 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/SLJKKSWU/2010.html); [Tang et al_2020_Deep Reinforcement Learning with Population-Coded Spiking Neural Network for.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/8YVQHMSK/Tang%20et%20al_2020_Deep%20Reinforcement%20Learning%20with%20Population-Coded%20Spiking%20Neural%20Network%20for.pdf)
Reading Note:: [[Guangzhi Tang, Neelesh Kumar, Raymond Yoo, Konstantinos P. Michmizos 2020]]

# Abstract
The energy-efficient control of mobile robots is crucial as the complexity of their real-world applications increasingly involves high-dimensional observation and action spaces, which cannot be offset by limited on-board resources. An emerging non-Von Neumann model of intelligence, where spiking neural networks (SNNs) are run on neuromorphic processors, is regarded as an energy-efficient and robust alternative to the state-of-the-art real-time robotic controllers for low dimensional control tasks. The challenge now for this new computing paradigm is to scale so that it can keep up with real-world tasks. To do so, SNNs need to overcome the inherent limitations of their training, namely the limited ability of their spiking neurons to represent information and the lack of effective learning algorithms. Here, we propose a population-coded spiking actor network (PopSAN) trained in conjunction with a deep critic network using deep reinforcement learning (DRL). The population coding scheme dramatically increased the representation capacity of the network and the hybrid learning combined the training advantages of deep networks with the energy-efficient inference of spiking networks. To show the general applicability of our approach, we integrated it with a spectrum of both on-policy and off-policy DRL algorithms. We deployed the trained PopSAN on Intel's Loihi neuromorphic chip and benchmarked our method against the mainstream DRL algorithms for continuous control. To allow for a fair comparison among all methods, we validated them on OpenAI gym tasks. Our Loihi-run PopSAN consumed 140 times less energy per inference when compared against the deep actor network on Jetson TX2, and had the same level of performance. Our results support the efficiency of neuromorphic controllers and suggest our hybrid RL as an alternative to deep learning, when both energy-efficiency and robustness are important.

# Quick Reference


# Top Comments
- Hmm I didn’t seem to use this in my DSQN based assignment [[Mandatory Assignment for Module I - Computational Intelligence]] so maybe it isn’t as relevant?

# Topics


# Tasks


--
# Extracted Annotations and Comments