

# Integrating Models of Interval Timing and Reinforcement Learning
Read::  
- [x] Integrating Models of Interval Timing and Reinforcement Learning E.A. Petter, S.J. Gershman, W.H. Meck 2018 #reading #citation ✅ 2023-04-12
Print::  ✔
Zotero Link:: NA
PDF:: [[Petter et al_2018_Integrating Models of Interval Timing and Reinforcement Learning.pdf]]
Reading Note:: [[Petter, Gershman, Meck (2018)]]
Files:: [Integrating Models of Interval Timing and Reinforcement Learning - 11.07.22.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/36FD6U9Y/Integrating%20Models%20of%20Interval%20Timing%20and%20Reinforcement%20Learning%20-%2011.07.22.md); 
Reading Note:: [[Petter, Gershman, Meck 2018]]
Web Rip:: [[Integrating Models of Interval Timing and Reinforcement Learning - 11.07.22]]

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "petterIntegratingModelsInterval2018"
SORT file.cday DESC
```

# Abstract
We present an integrated view of interval timing and reinforcement learning (RL) in the brain. The computational goal of RL is to maximize future rewards, and this depends crucially on a representation of time. Different RL systems in the brain process time in distinct ways. A model-based system learns ‘what happens when’, employing this internal model to generate action plans, while a model-free system learns to predict reward directly from a set of temporal basis functions. We describe how these systems are subserved by a computational division of labor between several brain regions, with a focus on the basal ganglia and the hippocampus, as well as how these regions are influenced by the neuromodulator dopamine.

# Quick Reference


# Top Comments
- Ok so It seems like just a list of further reading tbh
- though maybe it can lead me somewhere
- I’ve pointed out further thing I’ve found interesting


# Topics
![[Petter, Gershman, Meck (2018) - topics]]


# Tasks


# Further Reading
## theories of temporal processing [3–6]
3. Daw, N.D. et al. (2006) Representation and timing in theories of the dopamine system. Neural Comput. 18, 1637–1677 
4. Gershman, S.J. et al. (2014) Time representation in reinforcement learning models of the basal ganglia. Front. Comput. Neurosci. 7, 194 
5. Starkweather, C.K. et al. (2017) Dopamine reward prediction errors reflect hidden-state inferences across time. Nat. Neurosci. 20, 581–589 
6. Starkweather, C.K. et al. (2018) The medial prefrontal cortex shapes dopamine reward prediction errors under state uncertainty. Neuron 98, 616–629
## Marr’s three levels of analysis [7,8] 
7. Marr, D. and Poggio, T. (1977) From understanding computation to understanding neural circuitry. Neurosci. Res. Prog. Bull. 15, 470–488 
8. Niv, Y. and Langdon, A. (2016) Reinforcement learning with Marr. Curr. Opin. Behav. Sci. 11, 67–73
## [[Interval Timing]] [85]
85. [Meck, W.H. and Ivry, R.B. (2016) Time in perception and action. Curr. Opin. Behav. Sci. 8, vi–x](https://www.sciencedirect.com/science/article/pii/S2352154616300602)

## RNN
9. [Song, H.F. et al. (2017) Reward-based training of recurrent neural networks for cognitive and value-based tasks. eLife 6, e21492](http://refhub.elsevier.com/S1364-6613(18)30193-1/sbref0045)

## predictive map encodes long range temporal relationships between states [10–13]
10. Dayan, P. (1992) The convergence of TD (l) for general l. Mach.
Learn. 8, 341–362
11. Momennejad, I. et al. (2017) The successor representation in
human reinforcement learning. Nat. Hum. Behav. 1, 680
12. Russek, E.M. et al. (2017) Predictive representations can link
model-based reinforcement learning to model-free mechanisms.
PLoS Comput. Biol. 13, e1005768
13. Stachenfeld, K.L. et al. (2017) The hippocampus as a predictive
map. Nat. Neurosci. 20, 1643
## bias–variance trade-off [26,27]
26. Geman, S. et al. (1992) Neural networks and the bias/variance
dilemma. Neural Comput. 4, 1–58
27. Glaze, C.M. et al. (2018) A bias-variance trade-off governs indi-
vidual differences in on-line learning in an unpredictable environ-
ment. Nat. Hum. Behav. 2, 213–224

## Rescaling neuronal time-intervals [39 - 40] 
39. Wang, J. et al. (2018) Flexible timing by temporal scaling of
cortical responses. Nat. Neurosci. 21, 102
40. Goudar, V. and Buonomano, D.V. (2018) Encoding sensory and
motor patterns as time-invariant trajectories in recurrent neural
networks. eLife 7, e31134

## Gradual rescaling
> At least in some cases [33], the emergence of rescaling is gradual, which could reflect slow reinforcement-driven adaptation. The mechanisms underlying this adaptation are still poorly understood. One possibility is that dopamine itself is the teaching signal for adaptation. 
33. MacDonald, C.J. et al. (2011) Hippocampal “time cells” bridge
the gap in memory for discontiguous events. Neuron 71,
737–749

- Perhaps some sort of study of how it gradually rescales could influence the degree the [[Global Trigger Local Back-Propagation|Golden Seed Dynamics]] should change in response to new input
## studies of temporal integration reviews [58]  [59]
> In these experiments, subjects are separately trained on different stimulus arrangements, and then are tested on their ability to integrate the temporal relationships between events to form expectations about stimulus arrangements that they have not directly experienced.

58. Molet, M. and Miller, R.R. (2014) Timing: an attribute of associative learning. Behav. Process. 101, 4–14

59. Balsam, P.D. and Gallistel, C.R. (2009) Temporal maps and informativeness in associative learning. Trends Neurosci. 32, 73–78

60. Howard, M.W. et al. (2015) A distributed representation of internal time. Psychol. Rev. 122, 24–53

61. Molet, M. et al. (2012) When does integration of independently acquired temporal relationships take place? J. Exp. Psychol. Anim. Behav. Process. 38, 369–380
## Recent attempt at empirically identifying stronger algorithmic assumptions [63]
> In summary, a number of experimental paradigms have shown that subjects learn internal models of timing, which they employ in felxible ways – rapidly adjusting behavior to changes in the internal model, and integrating separately trained fragments of event knowledge. These findings are broadly consistent with computational models of model-based RL (e.g., [62]), but do not strongly favor specifci algorithms (though see [63] for a recent attempt at empirically identifying stronger algorithmic assumptions). 
63. Kheifets, A. et al. (2017) Theoretical implications of quantitative properties of interval timing and probability estimation in mouse and rat. J. Exp. Anal. Behav. 108, 39–72
## Structure Learning 
> In many environments, agents might not only be uncertain about the hidden state, but also be uncertain about the state space. This means agents must solve a structure learning problem simultaneously with the RL problem of maximizing rewards [68]. The formal framework of belief state RL (Box 2) can be naturally extended to the problem of structure learning. 
68. Gershman, S.J. et al. (2015) Discovering latent causes in rein-
forcement learning. Curr. Opin. Behav. Sci. 5, 43–50
69. Gershman, S.J. and Daw, N.D. (2017) Reinforcement learning
and episodic memory in humans and animals: an integrative
framework. Annu. Rev. Psychol. 68, 101–128
70. Roach, N.W. et al. (2017) Generalization of prior information for
rapid Bayesian time estimation. Proc. Natl. Acad. Sci. U. S. A.
114, 412–417

## RL and IT
4. Gershman, S.J. et al. (2014) Time representation in reinforcement learning models of the basal ganglia. Front. Comput. Neurosci. 7, 194
69. Gershman, S.J. and Daw, N.D. (2017) Reinforcement learning and episodic memory in humans and animals: an integrative framework. Annu. Rev. Psychol. 68, 101–128
81. Howard, M.W. et al. (2015) Efficient neural computation in the Laplace domain. In Proceedings of the 2015th International Conference on Cognitive Computation: Integrating Neural and Symbolic Approaches (Vol. 1583), pp. 61–68, CEUR-WS.org
82. Shankar, K.H. and Howard, M.W. (2012) A scale-invariant internal representation of time. Neural Comput. 24, 134–193

--
# Extracted Annotations and Comments

# Figures
