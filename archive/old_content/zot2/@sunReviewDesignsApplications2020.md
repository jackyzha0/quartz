

# A Review of Designs and Applications of Echo State Networks
Read:: 
Project:: []
Print:: ✅ 2022-06-13
Zotero Link:: NA
PDF:: NA
Files:: [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/EN3GF9DZ/2012.html); [Sun et al_2020_A Review of Designs and Applications of Echo State Networks.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/Q893MCFP/Sun%20et%20al_2020_A%20Review%20of%20Designs%20and%20Applications%20of%20Echo%20State%20Networks.pdf)
Reading Note:: [[Chenxi Sun, Moxian Song, Shenda Hong, Hongyan Li 2020]]

# Abstract
Recurrent Neural Networks (RNNs) have demonstrated their outstanding ability in sequence tasks and have achieved state-of-the-art in wide range of applications, such as industrial, medical, economic and linguistic. Echo State Network (ESN) is simple type of RNNs and has emerged in the last decade as an alternative to gradient descent training based RNNs. ESN, with a strong theoretical ground, is practical, conceptually simple, easy to implement. It avoids non-converging and computationally expensive in the gradient descent methods. Since ESN was put forward in 2002, abundant existing works have promoted the progress of ESN, and the recently introduced Deep ESN model opened the way to uniting the merits of deep learning and ESNs. Besides, the combinations of ESNs with other machine learning models have also overperformed baselines in some applications. However, the apparent simplicity of ESNs can sometimes be deceptive and successfully applying ESNs needs some experience. Thus, in this paper, we categorize the ESN-based methods to basic ESNs, DeepESNs and combinations, then analyze them from the perspective of theoretical studies, network designs and specific applications. Finally, we discuss the challenges and opportunities of ESNs by summarizing the open questions and proposing possible future works.

# Quick Reference


# Comments


# Topics


# Tasks


--
# Extracted Annotations

Annotations(6/13/2022, 7:04:40 PM)

> *“Echo State Network (ESN) is simple type of RNNs and has emerged in the last decade as an alternative to gradient descent training based RNNs”* (p. 1)

> *“avoids non-converging and computationally expensive in the gradient descent methods”* (p. 1)

> *“n 2002, abundant existing works have promoted the progress of ESN, and the recently introduced Deep ESN model opened the way to uniting the merits of deep learning and ESNs. Besides, the combinations of ESNs with other machine learning models have also overperformed baselines in some applications. However, the apparent simplicity of ESNs can sometimes be deceptive and successfully applying ESNs needs some experienc”* (p. 1)

> *“RNNs represent”* (p. 1)

> *“most closely resembling biological brains, the substrate of natural intelligence”* (p. 1)

> *“deep RNN are able to develop in their internal states a multiple time-scales representation of the temporal information”* (p. 1)

> *“bifurcations”* (p. 1)-  

==***“What does this mean?”***==

> *“Long short-memory (LSTM) and gated recurrent unit (GRU) are advanced designs to mitigate shortcomings of RNN. But when the length of input sequence exceeds a certain limit, the gradient will still disappear. Meanwhile, each LSTM cell have four full connection layers, if the time span of LSTM is large and the network is very deep, the calculation will be very heavy and time-consuming. Further, too many parameters will lead to over fitting risk.”* (p. 1)

![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_3WVXQ72P.png]] (p. 2)

> *“Echo State Network (ESN) [6] is one of the key RC. ESNs are practical, conceptually simple, and easy to implement. ESNs employ the multiple high-dimensional projection in the large number of states of the reservoir with strong nonlinear mapping capabilities, to capture the dynamics of the input. This basic idea was first clearly spelled out in a neuroscientific model of the corticostriatal processing loop [3]. ESNs enjoy, under mild conditions, the so-called echo state property [6], that ensures that the effect of the initial condition vanishes after a finite transient. The inputs with more similar short-term history will evoke closer echo states, which ensure the dynamical stability of the reservoir.”* (p. 2)-  

^af7xbu

==***“#ESNLookup more on the Coticostriatal processing loop”***==

> *“ensure the dynamical stability of the reservoir. Recently, the introduction of the Deep Echo State Network (DeepESN) model [11, 12] allowed to study the properties of layered RNN architectures separately from the learning aspects. Remarkably, such studies pointed out that the structured state space organization with multiple time-scales dynamics in deep RNNs is intrinsic to the nature of compositionality of recurrent neural modules. The interest in the study of the DeepESN model is hence twofold. On the one hand, it allows to shed light on the intrinsic properties of state dynamics of layered RNN architectures. On the other hand it enables the design of extremely efficiently trained deep neural networks for temporal data.”* (p. 2)

> *“Meanwhile, with the development of deep learning, a variety of neural network structures have been proposed, like auto-encoder (AE) [13], generative adversarial networks (GAN) [14], convolutional neural networks (CNNs) [15] and restricted Boltzmann machine (RBM) [16]. ESNs have combined these different structures and achieved state-of-the-art performance in specific tasks and different applications, such as industrial [17], medical [18], financial [19] and robotics with reinforcement learning [20, 21].”* (p. 2)-  

==***“How have ESNs combined these exactly? I assume it's supposing through its complex and undefined architecture?”***==

![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_NYPU4BBC.png]] (p. 2)

> *“Only parameters of readout weights Wout are subject to training.”* (p. 3)

> *“Which can obtain a closed-form solution by extremely fast algorithms such as ridge regression.”* (p. 3)

> *“After training phase, ESNs can give predictions ˆ Y of new data ˆ”* (p. 3)-  

==***“Is the data in the same "genre"? Not sure what I meant by this.”***==

> *“A network with state transition equation F with has the echo state property if for each input sequence U = [u(1), u(2), ...u(N )] and all couples of initial states x, x′, it could hold the condition in Equation 7. ||F (U, x) − F (U, x′)|| → 0 as N → ∞”* (p. 3)-  

==***“What exactly does this mean?”***==

> *“L2-norm”* (p. 3)-  

==***“As in the regularization?”***==

> *“||Wres||D = σ(DWresD−1)”* (p. 4)-  

==***“wtf is this”***==

> *“By the effect analysis and experiments in slow dynamic systems, noisy time series and time-warped dynamic patterns, leaky-ESN outperformed than ESN and could incorporate a time constant to act as a low-pass filter and the dynamics can be slowed down”* (p. 4)-  

==***“How would this be implemented in an SNN?Also what does the "time constant low pass filter " mean?”***==

-  

==***“Fig 2”***==

![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_LFZXEMDY.png]] (p. 5)

> *“non-periodic dynamical systems”* (p. 5)

> *“principle neuron reinforcement (PNR) algorithm”* (p. 5)

> *“[2] Doya K. Bifurcations in the learning of recurrent neural networks. Proceedings of IEEE International Symposium on Circuits and Systems, 6:pp. 2777–2780, 1992.”* (p. 22)

> *“[3] Sotirios P. Chatzis and Yiannis Demiris. The copula echo state network. Pattern Recognit., 45(1):570–577, 2012.”* (p. 22)-  

==***“corticostriatal”***==

> *“[6] Herbert Jaeger. Adaptive nonlinear system identification with echo state networks. In Advances in Neural Information Processing Systems 15 [Neural Information Processing Systems, NIPS 2002, December 9-14, 2002, Vancouver, British Columbia, Canada], pages 593–600, 2002.”* (p. 22)

> *“[12] Claudio Gallicchio, Alessio Micheli, and Luca Pedrelli. Deep reservoir computing: A critical experimental analysis. Neurocomputing, 268(dec.11):87–99, 2017. [13] Pascal Vincent, Hugo Larochelle, Yoshua Bengio, and Pierre-Antoine Manzagol. Extracting and composing robust features with denoising autoencoders. In Machine Learning, Proceedings of the Twenty-Fifth International Conference (ICML 2008), Helsinki, Finland, June 5-9, 2008, 2008.”* (p. 22)-  

==***“Deep ESN related”***==

> *“[20] Leandro Maciel, Fernando A. C. Gomide, David Santos, and Rosangela Ballini. Exchange rate forecasting using echo state networks for trading strategies. In IEEE Conference on Computational Intelligence for Financial Engineering & Economics, CIFEr 2014, London, UK, March 27-28, 2014, pages 40–47, 2014. [21] Julian Whitman, Raunaq M. Bhirangi, Matthew J. Travers, and Howie Choset. Modular robot design synthesis with deep reinforcement learning. In The Thirty-Fourth AAAI Conference on Artificial Intelligence, AAAI 2020, The Thirty-Second Innovative Applications of Artificial Intelligence Conference, IAAI 2020, The Tenth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2020, New York, NY, USA, February 7-12, 2020, pages 10418–10425, 2020.”* (p. 23)-  

==***“Reinforcement learning related”***==

> *“[29] Norbert Michael Mayer and Matthew Browne. Echo state networks and self-prediction. In Biologically Inspired Approaches to Advanced Information Technology, First International Workshop, BioADIT 2004, Lausanne, Switzerland, January 29-30, 2004. Revised Selected Papers, pages 40–48, 2004.”* (p. 23)


![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_3WVXQ72P.png]] (p. 2)
![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_NYPU4BBC.png]] (p. 2)
-  

==***“Fig 2”***==

![[public/Citations/unlinked-attachements/sunReviewDesignsApplications2020-Attachments/sunReviewDesignsApplications2020_LFZXEMDY.png]] (p. 5)