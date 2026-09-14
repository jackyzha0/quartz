

# Encoding time in neural dynamic regimes with distinct computational tradeoffs
Read:: partial 
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Project:: [Survey Paper]
Files:: [Semantic Scholar Link](file://); [Zhou et al_2022_Encoding time in neural dynamic regimes with distinct computational tradeoffs.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/63A3SKVK/Zhou%20et%20al_2022_Encoding%20time%20in%20neural%20dynamic%20regimes%20with%20distinct%20computational%20tradeoffs.pdf)
Reading Note:: [[Shanglin Zhou, S. Masmanidis, D. Buonomano 2022]]
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
The results predict that apparently similar neural dynamic patterns at the population level can exhibit fundamentally different computational properties in regards to their ability to generalize to novel stimuli and their robustness to noise—and that these differences are associated with differences in network connectivity and distinct contributions of excitatory and inhibitory neurons. Converging evidence suggests the brain encodes time in dynamic patterns of neural activity, including neural sequences, ramping activity, and complex dynamics. Most temporal tasks, however, require more than just encoding time, and can have distinct computational requirements including the need to exhibit temporal scaling, generalize to novel contexts, or robustness to noise. It is not known how neural circuits can encode time and satisfy distinct computational requirements, nor is it known whether similar patterns of neural activity at the population level can exhibit dramatically different computational or generalization properties. To begin to answer these questions, we trained RNNs on two timing tasks based on behavioral studies. The tasks had different input structures but required producing identically timed output patterns. Using a novel framework we quantified whether RNNs encoded two intervals using either of three different timing strategies: scaling, absolute, or stimulus-specific dynamics. We found that similar neural dynamic patterns at the level of single intervals, could exhibit fundamentally different properties, including, generalization, the connectivity structure of the trained networks, and the contribution of excitatory and inhibitory neurons. Critically, depending on the task structure RNNs were better suited for generalization or robustness to noise. Further analysis revealed different connection patterns underlying the different regimes. Our results predict that apparently similar neural dynamic patterns at the population level (e.g., neural sequences) can exhibit fundamentally different computational properties in regards to their ability to generalize to novel stimuli and their robustness to noise—and that these differences are associated with differences in network connectivity and distinct contributions of excitatory and inhibitory neurons. We also predict that the task structure used in different experimental studies accounts for some of the experimentally observed variability in how networks encode time.
# Quick Reference
# Top Comments
Recurrent neural networks are trained on two timing tasks based on behavioral studies to understand how networks can encode time and satisfy different computational requirements, and similar patterns of neural activity can be produced by distinct RNN configurations which in turn have fundamentally different computational tradeoffs. 

Converging evidence suggests the brain encodes time in time-varying patterns of neural activity, including neural sequences, ramping activity, and complex dynamics. Temporal tasks that require producing the same time-dependent output patterns may have distinct computational requirements in regard to the need to exhibit temporal scaling or generalize to novel contexts. 

It is not known how neural circuits can both encode time and satisfy distinct computational and generalization requirements, it is also not known whether similar patterns of neural activity at the population level can emerge from distinctly different network configurations. To begin to answer these questions, we trained RNNs on two timing tasks based on behavioral studies. The tasks had different input structures but required producing identically timed output patterns. 

Using a novel framework we quantified whether RNNs encoded two intervals using either of three different timing strategies: **scaling, absolute, or stimulus-specific dynamics**. 

We found that similar neural dynamics for single intervals were associated with fundamentally different encoding strategies and network configurations. Critically, some regimes were better suited for generalization, categorical timing, or robustness to noise. 

Further analysis revealed different connection patterns underlying the different encoding strategies. Our results predict that apparently similar neural dynamic regimes at the population level can be produced through fundamentally different mechanisms—e.g., in regard to network connectivity and the role of excitatory and inhibitory neurons. 

We also predict that the task structure used in different experimental studies accounts for some of the experimentally observed variability in how networks encode time. 

## Author summary 
The ability to tell time and anticipate when external events will occur are among the most fundamental computations the brain performs. Converging evidence suggests the brain encodes time through changing patterns of neural activity. 

Different temporal tasks, however, have distinct computational requirements, such as the need to flexibly scale temporal patterns or generalize to novel inputs. To understand how networks can encode time and satisfy different computational requirements we trained recurrent neural networks (RNNs) on two timing tasks that have previously been used in behavioral studies. Both tasks required producing identically timed output patterns. 

Using a novel framework to quantify how networks encode different intervals, we found that similar patterns of neural activity—neural sequences—were associated with fundamentally different underlying mechanisms, including the connectivity patterns of the RNNs. 

Critically, depending on the task the RNNs were trained on, they were better suited for generalization, categorical timing, or robustness to noise. Our results predict that similar patterns of neural activity can be produced by distinct RNN configurations, which in turn have fundamentally different computational tradeoffs. Our results also predict that differences in task structure account for some of the experimentally observed variability in how networks encode time.

# Comments
Not on SNNs, instead about RNNs (so far). The used something called a **[[Firing-Rate RNN Model]]** 

**This is an SNN** or at least the code they based it on is



I don’t think this is super useful to me, just from a brief overview.



# Topics #topics 
- 2-Context Task
- 2-Stimulus Task
- **[[Firing-Rate RNN Model]]**
- 

# Tasks
- [ ] Add #repos mentioned in this paper #p3



--
# Extracted Annotations
Annotations(6/8/2022, 5:48:50 PM)
- *“Itisnot known how neural circuits can encode time and satisfy distinct computational requirements, nor isitknown whether similar patterns ofneural activity atthe population level can exhibit dramatically different computational orgeneraliza tion properties”* [@zhouEncodingTimeNeural2022, p. 1] [](zotero://open-pdf/library/items/63A3SKVK?page=1&annotation=X4SFB6HR)
- *“Under absolute timing the neurons would PLOS COMPUTATIONALBIOLOGY Distinct dynamic regimes for encoding time PLOS ComputationalBiology |https:/ /doi.org/10.1371/journal.pcbi.1009271 March 3,2022 2/29 analysis, decision topublish, orprepara tionofthe manuscript. Competing interests: Theauthors havedeclared thatnocompeting interests exist”* [@zhouEncodingTimeNeural2022, p. 2] [](zotero://open-pdf/library/items/63A3SKVK?page=2&annotation=4CEZPJFR)
- *“respond at the same moments in time during both the production of short and long intervals but additional neurons would be active during the long interval; in a temporal scaling scheme neurons encode the same relative time during both short and long intervals; and in astimulusspecific code, there would be unrelated patterns for each interval (e.g., entirely different neural sequences for the short and long interval).”* [@zhouEncodingTimeNeural2022, p. 3] [](zotero://open-pdf/library/items/63A3SKVK?page=3&annotation=MVE4AQ8M)
> *“s [14,18,23]”* (p. 3)
- *“s [14,18,23]”* [@zhouEncodingTimeNeural2022, p. 3] [](zotero://open-pdf/library/items/63A3SKVK?page=3&annotation=ZZM39VBH)
- *“The RNNs were based on firing rate units with distinct populations of excitatory (80%) and inhibitory (20%) units.”* [@zhouEncodingTimeNeural2022, p. 3] [](zotero://open-pdf/library/items/63A3SKVK?page=3&annotation=SIGMAUSG)
- *“77. Kim R, Sejnowski TJ. Strong inhibitory signalingunderlies stable temporal dynamics and working memory inspiking neural networks. Nature Neuroscience.2021; 24(1):129–39. https://doi.org/10.1038/ s41593-020-00753-w PMID: 33288909 78. Kim R, LiY, Sejnowski TJ. Simple framework for constructing functional spiking recurrent neural networks. Proc Natl Acad Sci USA. 2019; 116(45):22811–20. https://doi.org/10.1073/pnas.1905926116 PMID: 31636215; PubMed Central PMCID: PMC6842655.”* [@zhouEncodingTimeNeural2022, p. 29] [](zotero://open-pdf/library/items/63A3SKVK?page=29&annotation=UFXUFBFI)

## Firing-rate RNN model
RNNs were based on firing-rate units that obeyed Dale's law $(\mathrm{N}=200,80 / 20 \%$ excitatory/ inhibitory). RNN dynamics was described by the following equations:
$$
\begin{gathered}
\tau \frac{d \boldsymbol{x}}{d t}=-\boldsymbol{x}+\boldsymbol{W}^{\text {rec }} * \boldsymbol{r}+\boldsymbol{W}^{i \boldsymbol{n}} * \boldsymbol{I}+\sigma * \boldsymbol{N}(0,1) * \sqrt{2 * \tau} \\
o=\boldsymbol{W}^{\text {out }} * \boldsymbol{r} \\
\boldsymbol{r}=\min \left(\ln \left(1+e^{x}\right), 20\right)
\end{gathered}
$$
where $\mathbf{x} \in \mathbb{R}^{\mathrm{N} \times 1}$ represents the input currents of RNN units, and firing rate vector $\mathbf{r}$ is obtained by applying a Softplus function constrained by an upper bound of 20 . The time constant $\tau$ was equal to $100 \mathrm{~ms}$ for all units. $\mathbf{W}^{\text {in }} \in \mathbb{R}^{N \times 2}$ and $\mathbf{I}$ are the input weights and external inputs, which are task-specific as described below. Each unit received independent Gaussian noise $\mathbf{N}$ $(0,1)$ with the standard deviation of $\sigma \sqrt{2 \tau}$. Unless otherwise specified, $\sigma=0.45$. $\mathbf{W}^{\text {rec }} \in \mathbb{R}^{\mathrm{N} \times \mathrm{N}}$ is the recurrent weight matrix. Self-connections were absent in the network. The output $(o)$ of the network is computed linearly from the output weights $\mathbf{W}^{\text {out }}$ and $\mathbf{r}$. RNNs were implemented and trained in Tensorflow starting from the code of Kim et al [77,78].
Training. Networks were trained using adaptive moment estimation stochastic gradient descent algorithm (Adam) to minimize the error between network output $o$ and target $z$ :
$$
\text { Error }=\sqrt{\sum_{t=0}^{T}[o(t)-z(t)]^{2}}
$$
where $\mathrm{T}$ is the total length of a given trial. The target and mask are task-dependent as described below. The learning rate was $0.01$, and other TensorFlow default values were used.

Only recurrent weights $\mathbf{W}^{\text {rec }}$ and output weights $\mathbf{W}^{\text {out }}$ were trained. Unless otherwise specified, $\mathbf{W}^{\text {rec }}$ was initialized as a random sparse matrix with a connection probability of $0.2$ from a normal distribution with zero mean and standard deviation (gain) of 1 and transformed to absolute values. To begin in an approximately balanced regime the inhibitory weights were multiplied by 4 for the initialization but not for training. To respect Dale's law during training a rectified linear operation was applied on $\mathbf{W}^{\text {rec }}$ to clip the weights down to zero and then excitation and inhibition were implemented by multiplying the clipped $\mathbf{W}^{\text {rec }}$ with a diagonal matrix of 1 and $-1$ representing excitatory and inhibitory units, respectively $[78,79] . \mathbf{W}^{\text {in }}$ was drawn from a standard normal distribution and was fixed during training.

During training, a discretization step of $20 \mathrm{~ms}$ was used. After training, RNNs were ported to Matlab using the trained parameters and a discretization step of $1 \mathrm{~ms}$ was used to get the dynamics for analyses.

Parameters were updated every trial. After every 100 trials of training, the network was tested for 100 trials to compute the task performance (see below) and mean error. When task performance was higher than 97% and the mean error is lower than 2, the training was considered a success and stopped.

