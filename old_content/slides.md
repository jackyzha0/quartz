---
title: RITMO Collab Slides
draft: false
---

> [!Summary]
>  - The Credit Assignment Problem
> 	 - Rerolling “deepness”
>  - Temporal Dynamics
> 	 - Learning How Gestalt Dynamics Emerge From Inter-Unit Dynamics
> 	 - Simultaneously learning about timing in dynamical systems
> 	 - Examples of Temporal dynamics in the brain communications
> 		 - Oscillations
> 		 - Rate encoding
> 		 - Event Driven Computation
> 		 - Multiplexing
> 		 - STDP
> 	- How to go from 70 ms to 100+ ms
>  - Interval Timing
> 	 - Smallest distinction of time in behavioral exercises
> 	 - Associating events through time
> 	 - The receptive fields of time
> 	 - At 100s of ms the composition
>  - SBF
>  - Overlap with 3fa-STDP

---
![[Slide1.PNG]]
---
# 1 Introduction
- Hello I’m Michael Tarlton
![[Slide2.PNG]]

---
# 2 Creating a new type of model
- Ok so if you are here, you presumably *know* about Spiking neural networks 
	- And Neuro-Inspired systems
- And you presumably know about their advantages 
- As well as why we are seeking to expand on these, as opposed to mainstream Deep Learning
- Features largely missing in deep learning, but which we see in the brain, are:
	- Unsupervised / Self-Supervised
		- Self-Organizing
	- Robust (Multi-Modal)
	- Online (Learns in-situ)
	- Continuous (Constantly learning)
		- Non-Catastrophic
- These are all features of learning, 
- and while specialized DL models may be capable of one or more of these features to some degree
- There are no feed forward - back propagation networks that are capable of all them
- And this is a limitation of how these networks learn
![[Slide3.PNG]]

---
# 3 The Credit Assignment Problem
- Deep Learning (and deep SNNs) has been limited by the current method of credit-assignment: Back-Propagation
- We know that back-propagation is not biologically plausible 
	- In addition to being incredibly inefficient
- If we are going to take full advantage advantage of SNNs we need better methods of credit-assignment
	- such as those we see in the brain

- Back-propagation fails to correctly assign credit in *“deep*” and non-linear systems
- When we speak about “deepness” on the brain, we speak of deeply recurrent and complex neural architectures, 
	- which are simultaneously self-adjusting and multiplexing levels of information 
- The flattened structure of a feed-forward network, is an “untangling” and simplification of what may be done by a only a few neurons through time in a complex recurrent network structure
	- Think of how we “un-roll” RNNs
- However when these networks are “rolled up”,
- It is difficult to correctly correlated neuronal activity to causal factors, 
	- particularly wrt to time
- The activity of a neuron which we may wish to reinforce,
	- May be associated with events which have happened in the past or the future in varying amounts of time

- However because spiking neuronal communication is inherently time-based
- We may be able to use time as a dimension to triangulate credit assignments through these deep and otherwise unnavigable systems 

![[Slide4.PNG]]
#### 3.1.1.1 Cut Content
- Neural oscillations may be used to synchronize neural circuits deep within the substrate with meaningful inputs 
- and lock their activity to the timing of the associated signal 

---
# 4 Temporal Dynamics
Time properties are key to understanding the neural dynamics of the brain.

Timing dynamics are also relatively underdeveloped in the field of artificial neural networks.

Where modern neural networks “unroll” time-separated moments of neural processing into extended static layers.

- Temporal dynamics are found throughout the brain at all scales 
- And we know of many time-based mechanisms in the brain, 
	-  Neural oscillations and memory consolidation [[old_content/zot2/@buzsakiBrainRhythmsHave2023]]
	- Spike-Timing Dependent-Plasticity (STDP)
	- Bursts / Spindles / Rate-Encoding
	- Event-Driven Computation
	- Informational Multiplexing
		- Neuronal output
- It is highly likely that temporal mechanisms are a fundamental underpinning of all neural activity 
- 
- But how do these temporal dynamics form out of the interactions individual neurons?
- What is the smallest possible mechanism of time dynamics in the brain
	- The timing of spike-firing neurons is sub 100ms
	- And we know that it has some impact on how the dynamics emerge circuit level through self-organization / regulation via STDP

- But how?
- While STDP is one of the most-atomic levels of timing in the brain, 
- It tells us nothing about timing dynamics we see at the circuit or gestalt level %% from their collective interactions %%
- I.e: 
	- How do neuronal interactions happening at 70 ms
	- contribute to mechanisms working at  +100ms 
		- And we will see why I mention this specific time in a moment
- Well what is the smallest dynamic of time at the circuit activity level
- What is the receptive field of time,
- the smallest perception of time in the brain? 

![[Slide5.PNG]]
#### 4.1.1.1 Cut Content
> Oscillatory processes are the functional basis of homeostasis in the organism, allowing the occupation of a stable state in a dynamic and changing environment and maintaining the continuous functions necessary to survival. Neuronal assemblies such as Cardiopulmonary nerves maintain repetitious functions internally, while assemblies in the deep brain produce endogenous circadian rhythms which allow for the representation of external cycles of time. It follows that rhythmic processes set the basis of many biological functions, perhaps even forming the architectural basis for functional circuits beyond time encoding such as grid and place cells [[old_content/zot2/@tekiPersistenceMemoryHow2017]] [[old_content/zot2/@vagoRobustEfficientCoding2018]] Neural oscillations are ubiquitous throughout the brain at all scales, [[old_content/zot2/@sreenivasanGridCellsGenerate2011a]].^[There is some debate as to if repetitious place/grid cells came first, or if periodic timing cells came first.]
##### 4.1.1.1.1 Citation
[[old_content/zot2/@buzsakiBrainRhythmsHave2023]]

---
# 5 Interval Timing
- One of the most basic properties, if not *the* most basic mechanism of time in the brain, 
	- is the ability to internally represent a single interval of time
- This is known as *interval timing*, 
- Obviously this ability is fundamental to learning separate events in time, and mapping their association through time
- In the animal model this is in the sub-to-supra-second range
	- so +100ms to over a second
- Thus it is possible, we may build a interval timing circuit, out of the not-too-distant, cyclic firing rates of spiking neurons  
- which happen at sub-hundreds-of-milliseconds range
- 
- ***If we can study how microscale time-dynamics of neurons give emergence to macroscale temporal dynamics,*** 
	- ***We may be able to understand how these networks learn as well as key fundamentals of neural dynamics as a whole.***

![[Slide6.PNG]]
#### 5.1.1.1 Cut Content
- Spike-Timing Dependent-Plasticity (STDP) is a well studied mechanism of local learning in biological neurons 
-  In which the timing of neuronal activity in relation to each other decides the likelihood of strengthening or weakening their connections, 
- sometimes mediated by a reward signal such as Dopamine
- It is likely that macroscale timing properties emerge from population activity of individual neuronal timing interactions
- *It is possible the most fundamental aspect of timing in the brain, may be built out an ensemble of individual neurons*

##### 5.1.1.1.1 Citation
[[old_content/zot2/@melloNeuralBehavioralMechanisms2016]]
[[old_content/zot2/@gerstnerEligibilityTracesPlasticity2018]]

---
# 6 Striatal beat Frequency Models
- This brings me to the Striatal Beat Frequency (SBF) model 
- The SBF is a neuroanatomical model of interval timing in the brain
- which is capable of associating separate events in time
- And maintain the representation the time-interval between events in a relatively simple circuit of spike-firing neurons

- This basis of this model is that:
- There are neural assemblies generating unique oscillatory activity 
	- That is there are multiple sub-units
	- or *”oscillators”* 
	- which each produce some oscillatory activity
- These oscillators then provide timed pulses to downstream regions

- Specifically populations of cyclic firing neurons in corticothalamic areas
	- but there oscillatory processes can be found throughout the brain
	- Notably, time-cells, which have cyclic phasic activity at larger scales
	- So we may imagine these *“oscillators”* occurring at multiple scales of time
	- And can contribute to representing varying scales of time
- In the model these project their activity to Medial Spiny Neurons which act as *”coincidence detectors”*, 
	- Associating the cyclic activity with some top-down modulatory signal 
		- (e.g. Dopaminergic reinforcement)
- The Coincidence Detector neuron may strengthen or weaken its weighting to oscillators 
- based on which oscillator activity best informs it about the time-dependencies in its environment
- This allows the oscillators signals to act as predictive signals of meaningful stimuli
- 
- This can be effectively abstracted as a type of reinforcement learning automata

![[Slide8.PNG]]
#### 6.1.1.1 Cut Content
- At the onset of a "to-be-timed" signal (the detection of meaningful stimuli or environmental event), 
- These oscillatory ensembles may reset their phase / resynchronize, and begin oscillating at their endogenous periodicities.
- When a "stop" event is signaled by some top-down reinforcement (e.g. Dopaminergic reward signal) occurs, 
- A "coincidence detector" (Medium Spiny Neurons (MSNs) in the model) are activated,
- And the "state" of the oscillators is encoded as a "phase pattern" (onto the Striatum) 
- 
- Additionally this can be layered and replicated in more localized regions which are phase locked to a particular task or association
##### 6.1.1.1.1 Citations
[[old_content/zot2/@matellNeuropsychologicalMechanismsInterval2000]]
[[@matellCorticostriatalCircuitsInterval2004]]
[[old_content/zot2/@allmanPathophysiologicalDistortionsTime2012]] 
[[old_content/zot2/@yinOscillationCoincidenceDetectionModels2022]]

---
# 7 Implementing in an Automata Framework
- This is what we call SBF-Automata model
- Which is a RL-automata framework

- We borrow the concept of an “oscillator block”
	- Composed of a set of individual “oscillators”,
	- each with some unique activity frequency
- The activity of these is projected on to a “coincidence detector”
	- Which we title the “executive unit”
- The activity of each connected oscillator is mediated by some modifiable weight 
	- which allows the executive unit to “judge” the informational value of that oscillator
- This executive unit makes some decision to perform an action based on the weighted activity input from the oscillator block
- Some reinforcement signal from the environment informs the automata if actions were rewarded
- The automata may adjust its weights to reflect which oscillators are most informative recovery of reward
	
- After significant stochastic burn-in, this master automata can then make probabilistic assessment of the likelihood of a target interval occurring based on the phase distribution on the oscillatory automata.
- A master automata can then assess the likelihood of the target event to occur in phase with each oscillatory automata's unique cycle. 

- Now this successful at reproducing a single target time-interval
- It just depends on the number and distribution of oscillators you use

![[Slide11.PNG]]

## 7.1 Complex signals
- As the output of one of these automata will be a more complex phasic waveform
- We may be able to represent more complex time information through layering the SBF-A
- As well allow for rescaling of the receptive field of input oscillators
	- Which is seen in time-cells
- Perhaps we may be able to even intake more complex timing information from the environment, such as an event driven camera

![[Slide12.PNG]]
![[Slide13.PNG]]
#### 7.1.1.1 Cut Content
- Where the cyclic activity of the oscillators have some probability of occurring simultaneously with a target time-interval
- In a discrete automata model this can be mapped to a multiple automata which "wake" on an unique oscillatory cycle, and "vote" to check for some event. 

- One can reframe this as a multi-arm bandit problem of sorts
	- Almost an inverse one

##### 7.1.1.1.1 Citations
[[old_content/zot2/@littlestoneWeightedMajorityAlgorithm1994]]
[[old_content/zot2/@wolfOptimalCrawlingStrategies2002]]
[[old_content/zot2/@kolobovStayingDateOnline2019]]


# 8 Three-Factor STDP Models
- Now some of you may have already noticed a similarity to *Three-Factor STDP*
- This brings us back to our goal of solving of credit-assignment problems with biologically plausible means of learning

- STDP is a well known means of plasticity in the brain, but is met with difficulty in artificial models
- Namely because the methods of training STDP networks can be obtuse and unstable

- Three-factor STDP adds the “third-factor” of some modulatory signal
	- Typically this is modeled as Dopamine as it is commonly associated with reward in the brain
- While in regular STDP, time-difference errors 
	- (differences in the firing time of the pre-synapse wrt to the firing of the post-synapse)
	- are immediately implemented in weight updates %% between two neurons %%
- In three-factor STDP the time-difference errors are instead accumulated as *eligibility traces* 
- which are then summed over at the time of a Dopaminergic reward signal
	- This reward signal can be broadcast globally or to circuits local to specific functions
- Implementing connectivity changes in “batches” rather than in constant microscopic changes 
- thus allowing for greater stability in the network
- 
- This model shows many symmetries with the SBF-A model 
	- So we are simultaneously expanding on both
- If we find effective network architectures in more complicated SBFA models,
- then perhaps we can implement them with 3-factor STDP neurons, for use in SNNs

![[Slide14.PNG]]

---
## 8.1 Three-Factor STDP in Reservoirs
- Because this is a local plasticity method, 
- We would like to see how these units learn in a reservoir type architecture
- Where we may be able to observe properties of self-organizing behavior including emergent architectures and macroscale temporal dynamics, such as neural oscillations or observed animal behavior patterns
# 9 End Summary
![[Slide15.PNG]]
---