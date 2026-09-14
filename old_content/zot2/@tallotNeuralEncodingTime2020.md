

# Neural encoding of time in the animal brain
Read:: Yes
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [Semantic Scholar Link](file://); [Tallot_Doyère_2020_Neural encoding of time in the animal brain.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/HBVFC5PX/Tallot_Doyère_2020_Neural%20encoding%20of%20time%20in%20the%20animal%20brain.pdf)
Reading Note:: [[L. Tallot, V. Doyère 2020]]

# Abstract
The processing of temporal intervals is essential to create causal maps and to predict future events so as to best adapt one’s behavior. In this review, we explore the different brain activity patterns associated with processing durations and expressing temporally-adapted behavior in animals. We begin by describing succinctly some of the current models of the internal clock that can orient us in what to look for in brain activity. We then outline how durations can be decoded by single cell activity and which activity patterns could be associated with interval timing. We further point to similar patterns that have been observed at a more global level within brain areas (e.g. local field potentials) or, even, between these areas, that could represent another way of encoding duration or could constitute a necessary part for more complex temporal processing. Finally, we discuss to what extent neural data fit with internal clock models, and highlight improvements for experiments to obtain a more indepth understanding of the brain’s temporal encoding and processing.

# Quick Reference

## CS : Conditioned Stimulus
## US : Unconditioned Stimulus


# Comments
Maybe I am looking to replicate one of these “cells” in a toy SNN circuit. But I want this circuit to train itself to do these.

Ok so if we can phase lock circuits then perhaps the global timing can be based on oscillations

# Topics

## Population encoding
This is the literature way to refer to what I like to call circuit encoding (or engrams)

Though I think there might be still a small difference, I can’t tell if they are using it synonymously or if pop encoding means more like “by popular support”



--
# Extracted Annotations

Annotations(6/13/2022, 2:02:53 PM)

> *“see Buhusi and Meck, 2005”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=JJZBUJXP)

> *“interval timing - in the seconds to minutes range - is flexible, learned,”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=GY59ZJGJ)

> *“and covers a larger range of durations to allow for a rapid adaptation to changes in the environment. I”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=7B4KVDU7)

> *“In contrast to the well-described dependence of circadian rhythm on the suprachiasmatic nucleus, many brain structures have been linked to interval timing”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=8RDJXACU)

> *“many brain structures have been linked to interval timin”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=UGIG2HR6)

> *“timescale (in the range of a few hundred milliseconds)”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=E3BJINGD)-  

**So we have 3 different timescales.
Meaning I was Probably using the word wrong**

> *“interval timing, which enables organisms to create temporal maps and manage predictions about the outcome of situations, and has therefore a strong cognitive component (Buhusi and Meck, 2005).”* [(p. 146)](zotero://open-pdf/library/items/HBVFC5PX?page=1&annotation=9J8K5ZVF)

^ifi9zk

> *“Weber’s law”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=842TPTJT)-  

**Gotta look this up.**

> *“[[Scalar Expectancy Theory (SET)]] the most influential timing model up to now - was developed by Gibbon (1977), and further improved by Church (1984). It expands on the memory stage of Treisman’s internal clock by incorporating: a working memory component, a multiplicative factor for storage in a reference memory, and a decision rule to determine if ‘yes’ or ‘no’ the duration being measured is similar to previously encoded durations”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=YCYFJVDD)

> *“the importance of several brain areas in **interval timing**, results that have been discussed many times before, and will not be part of this review. Briefly, a few structures have been detected as playing a role in timing across a lot of studies: the supplementary motor area (SMA), the pre-SMA, the prefrontal cortex (PFC), the striatum, the substantia nigra, the inferior parietal cortex and the cerebellum (e.g. Brannon et al., 2008; Buhusi and Meck, 2005; Coull et al., 2011; Harrington et al., 2010, 2004; Lewis and Miall, 2006; Wiener et al., 2010).”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=95KSPW7J) ^v9aff4

> *“One of the core debates on the neurological basis of timing is whether it is dependent on one central timing center, or whether timing is present all over the brain in separate clusters.”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=KNU9INNT)

> *“timing”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=3CX7DWQW)

> *“However there are also studies showing that brain slices can encode durations (up to 2 s) which implies that a very restricted amount of connected neurons is sufficient for simpl e temporal encoding (Chubykin et al., 2013; Goel and Buonomano, 2016; Johnson et al., 2010).”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=2F9JZTRY)

^fzgj4y

> *“To address the issue of the origin of the internal clock, assuming there is one, we must look at neuronal activity from individual neurons to groups of neurons in a large range of brain areas and in different types of timing tasks.”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=RABSI76L)

> *“Patterns of single cell firing activity and synchronous spike activity of neural ensembles could reflect a local processing of time. This synchronous cell activity can generate depolarization/hyperpolarization oscillatory rhythms either locally (through recurrent networks) or in distant brain areas, which can be recorded with local field potentials (LFP).”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=EPA2W35G)-  

^q5jcq8

**there we go. Neural oscillations& timing**

> *“Neural oscillations also give access to subthreshold depolarization”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=ETJBMLNE)-  

**What does this mean?**

> *“which may not be translated into spikes by the integrating neuron”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=8EYRA74G)-  

**Open question?**

> *“As such, recordings of spike activity and oscillations provide complementary, non-fully-overlapping, information”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=V5LM5HCD)

> *“Neural oscillations are an ubiquitous property of brain function and have important roles in learning, memory and cognitive processes such as those involved in timing and time perception (for reviews, Buzsáki et al., 2013; Buzsáki and Draguhn, 2004; Hanslmayr and Staudigl, 2014; Matell and Meck, 2004). Slow (&lt; 50 Hz) oscillations are associated with large fluctuations of neurons’ membrane potential and are considered to cover large brain areas, whereas fast oscillations result from smaller fluctuations in membrane potential and should be restricted to smaller neural volumes. Changes in oscillatory rhythms’ frequency or power may represent timing function at a network level.”* [(p. 147)](zotero://open-pdf/library/items/HBVFC5PX?page=2&annotation=SKL8NQZ7)-  

**Neural Oscillations A time. Several examples given.**

> *“studies have been interested in determining how single neuron activity (i.e. spikes) can encode durations; and it is a growing field of research, as about 30% of these studies have been published within the last five years. Indeed”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=CNITZ5A8)-  

**seems to me like an interesting factoid, at least something to be mentioned for further .**

> *“how can an event of less than ten milliseconds encode durations of several seconds to minutes?”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=M327JE3W)

> *“We are compiling here more than 80 studies that have in some way looked at different patterns of single neuron firing that can represent time in explicit (Table 1) or implicit (Table 2) temporal tasks. We have organized these studies according to the type of task used, as well as the brain area where timing related activity was reported. The studied species, as well as the range of durations used, are also mentioned. We have categorized the modification of neurons’ firing patterns, as compared to baseline activity, in four types (see Fig. 1 for a schematic representation of the different activity patterns): (1) sustained change, (2) phasic change in activity at the stimulus onset or offset, whose amplitude and/or duration is proportional to the duration of the event, (3) peak modulation at a specific time point (‘event time’ cells), and (4) ramping activity. The changes reported are in majority in the direction of an increased cell firing, but several studies have also reported a decrease in cell firing, in particular when baseline levels of activity are high (e.g. Fuster and Alexander, 1973; Oshio et al., 2006).”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=ESUZWILV)-  

**Main statement of the paper.Be sure to clip the two tables mentioned.**

> *“Sustained change in activity is often described in working memory tasks, and may represent the temporary maintenance in memory of a stimulus until a response has to be produced”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=V8JNHVIU)

> *“Sustained increase or decrease in the number of spikes for the whole duration of a stimulus has been observed in 21 studies, in both implicit and explicit tasks. This”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=BDFQHAEM)

> *“delay conditioning”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=9DCJW3FD)

> *“trace conditioning”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=HFRMXBPM)

> *“They used a task somewhat related to a DRL-LH (differential reinforcement of low rates with limited hold) task, in which a brief (100 ms) visual”* [(p. 150)](zotero://open-pdf/library/items/HBVFC5PX?page=5&annotation=RPH2GVHM)

> *“f a reward for a fixed amount of time (1.5 s), but with increasing rewa”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=D8YKIJLS)

> *“Neuronal activity at either the onset or the offset of a stimulus may encode its duration through changes in the firing rate at its onset for representing its expected duration or at its offset for representing its passed duration. Such type of neural encoding has been observed for a large range of durations (from 1 to tens of seconds), and often when several durations are presented within the task, suggesting that it may have a role in differentiating durations (Chiba et al., 2015, 2008; Fiorillo et al., 2008; Jaramillo and Zador, 2011; Ohmae et al., 2008; Roux et al., 2003; Sakurai et al., 2004; Yumoto et al., 2011).”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=RKYXRK46)

^grbz6j

> *“Event time’ cells”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=VHCY7T5K)-  

**Doesn't really pertain to whatI 'm looking for. Single cell thingy.**

> *“Event time’ cells”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=LWWS96FK)

> *“Event time’ activity relates to a transient increase or decrease of the firing rate of a neuron at the end of a learned interval, usually reinforcement time or when the animal must respond.”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=5WZXBI25) ^28pf42

> *“Striatal Beat Frequency (SBF) model (Matell and Meck, 2000)”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=PMVVQ5KG)-  

**Sounds cool. Probably not super important**
|
> *“Ramping activity”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=9QNYFP5Y)

> *“Ramping activity, when a neuron’s firing rate increases or decreases gradually with passing time, either from baseline level or after an initial abrupt change in activity”* [(p. 151)](zotero://open-pdf/library/items/HBVFC5PX?page=6&annotation=45WRGMST)

> *“may represent the gradual increase in expectation of the animal. A neuron discharges more and more (or less and less) as time passes until it reaches a threshold which induces a specific response that is time appropriate”* [(p. 152)](zotero://open-pdf/library/items/HBVFC5PX?page=7&annotation=3A5QVJIL)

> *“it is difficult to distinguish between ramping and ‘event time’ cells, because we cannot see the post-expected reinforcement activity.”* [(p. 152)](zotero://open-pdf/library/items/HBVFC5PX?page=7&annotation=V67HU3WR)

> *“Ramping activity has often been described in delayed matching-tosample or non-matching-to-sample (i.e., working memory) tasks, and in expectation tasks, where the animal waits for a stimulus. These tasks are not typical timing tasks, but have a temporal component that can be modulated, i.e. the wait between the first and the second stimulus. The increased activity during the delay could represent an encoding of the hazard rate, that is, the longer the duration, the more likely the stimulus is to appear (Heinen and Liu, 1997; Janssen and Shadlen, 2005; Leon and Shadlen, 2003; Lucchetti and Bon, 2001; Renoult et al., 2006; Riehle et al., 1997). It”* [(p. 152)](zotero://open-pdf/library/items/HBVFC5PX?page=7&annotation=PVTXFELF) ^vdhlpk

> *“Like any unbounded accumulator, however, it seems biologically impossible to encode long durations of more than a minute with ramping activity. There is a limit to the number of spikes a single cell can produce in a definite amount of time. This is where population coding might come into play by having different populations activating each other to represent longer durations than a single cell can”* [(p. 152)](zotero://open-pdf/library/items/HBVFC5PX?page=7&annotation=U2IFVY6Z)

> *“single cells can encode durations but they are limited biologically in how high their firing rate can be, and other mechanisms have to be at play to make them fire at a specific time (outside of the presence of external stimuli)”* [(p. 152)](zotero://open-pdf/library/items/HBVFC5PX?page=7&annotation=Q75KKV6N)-  

**Yeah. Duh**

> *“Sequential time cells Sequential time cells (also known as ‘time cells’) fire one after the other, creating, as a population, a range of firing across time which forms a bridge of activity between events separated by a constant time interval, thus encoding as a whole the event’s duration or the interval between events (Fig. 2A).”* [(p. 154)](zotero://open-pdf/library/items/HBVFC5PX?page=9&annotation=KTEFE8E3)

> *“response field”* [(p. 154)](zotero://open-pdf/library/items/HBVFC5PX?page=9&annotation=FZPJ2CJR)-  

**Response field? what is this?**

> *“et al., 2009; Mello et al., 2015). MacDonald et al. (2011) have differentiated cells depending on whether or not they modify their peak firing time when the duration of the interval is changed. They named ‘absolute time cells’ cells that show a peak response at a specific time point during the interval with a pattern that does not rescale when the duration is modified. ‘Relative time cells’ show a similar peak response at a specific time but their activity is rescaled depending on the duration of the timed interval. Other cells may either lose their activity or change their activity to a non-similar and non-rescaled time point when the interval is modified. Other studies have also highlighted the dichotomy between relative versus absolute time cells (Kojima and Goldman-Rakic, 1982; Merchant et al., 2011). To describe these sequential time cells, MacDonald and collaborators (2011) used a go/no-go paradigm with a delay. The rats were trained to pair objects and odors, such that they had to retain in memory for 10 s the object that was presented at the beginning of a trial to know whether or not they should dig into a scented pot to get a reward. During the 10 s delay, neurons in the hippocampus fired sequentially to cover the whole duration with a firing pattern that was rearranged when the duration was changed. Most neurons were modulated by both space and time, and in a manner independent of locomotion, speed, or head placement. In another study, it was shown that very few neurons depend only on time (MacDonald et al., 2013, 2011). Therefore, these sequential time cells seem similar, or even identical, to the place cells described in the hippocampus (O’Keefe and Dostrovsky, 1971) and may interact with those cells to form spatiotemporal maps of the environment. More recently, Mello et al. (2015) have reported that 68% of cells recorded in the dorsal striatum of rats Sequential Time cells Duration Coherence average over many trials A B C D Evoked Related Potential (ERP) Local Field Potential (LFP) Fig. 2. Schematic representation of possible encoding of time though modulation of population neural activity either through organization of single cells activity (A), or through local field potentials modulations (B-D). L. Tallot and V. Doyère Neuroscience and Biobehavioral Reviews 115 (2020) 146–163 154”* [(p. 154)](zotero://open-pdf/library/items/HBVFC5PX?page=9&annotation=26XUMJ83)

> *“They named ‘absolute time cells’ cells that show a peak response at a specific time point during the interval with a pattern that does not rescale when the duration is modified”* [(p. 154)](zotero://open-pdf/library/items/HBVFC5PX?page=9&annotation=9PUUQHX3)-  

**Need more clarification**

> *“‘Relative time cells’ show a similar peak response at a specific time but their activity is rescaled depending on the duration of the timed interval. Other cells may either lose their activity or change their activity to a non-similar and non-rescaled time point when the interval is modified.”* [(p. 154)](zotero://open-pdf/library/items/HBVFC5PX?page=9&annotation=XMAP3ZEC)

> *“These sequential time cells seem to constitute a “pure” time encoding which can support the encoding of long durations and, even, parallel encoding of multiple durations simultaneously. However, the questions remain of what makes these cells fire at a specific time (e.g., does it result from a local process or do they receive a temporal input from an upstream brain area), and of how to separate the different subpopulations representing different durations in different contexts.”* [(p. 155)](zotero://open-pdf/library/items/HBVFC5PX?page=10&annotation=FD7JF67M)-  

**multiple time scale encoding,Also, ask Gustavo about this**

> *“Local field potentials (LFPs) LFPs represent the sum of depolarization/hyperpolarization of a population of neurons, reflecting action potentials as well as subthreshold electrical modulation such as EPSPs (excitatory post-synaptic potentials) and IPSPs (inhibitory post-synaptic potentials) (Buzsáki et al., 2012). It is important to note that LFPs represent both input activity (i.e. coming from upstream brain areas) as well as local computations and output, in contrast to single unit or multi-unit recordings which only reflect spikes, and thus output data of the recorded area.”* [(p. 155)](zotero://open-pdf/library/items/HBVFC5PX?page=10&annotation=47XWGXBP)

> *“Some LFP modulations are time-locked to the onset of a stimulus and are called event related potentials or ERP (Fig. 2B). They can be observed when averaging a large number of trials under constant conditions”* [(p. 155)](zotero://open-pdf/library/items/HBVFC5PX?page=10&annotation=FBV98TB2)

> *“The raw LFP signal (Fig. 2C) recorded from a brain area can also be decomposed in different frequency components (i.e., oscillations) that are considered to have different roles in neural processing. Data on oscillations are often presented in the form of power spectrum density (PSD), which represents the strength of different frequency bands in a signal. When looked at in a time-frequency manner, one can ask how the power of different frequency bands varies across a trial. Most frequency bands from slow oscillations (like delta and theta) to mid-range (like alpha and beta) and even high frequency oscillations (like gamma and epsilon) - have been described in several mammalian species, and neural oscillations seem to be a conserved phenomenon across mammalian evolution (Buzsáki et al., 2013).”* [(p. 155)](zotero://open-pdf/library/items/HBVFC5PX?page=10&annotation=IIR7RRX4)

> *“Neuronal oscillations have long been hypothesized as the major constituent of the internal clock (Buhusi and Meck, 2005; Treisman, 1963). Oscillations also seem to be involved in structuring events in time (for example events can be associated with the specific phase of an oscillation) (Kösem et al., 2014; Mizuseki et al., 2009).”* [(p. 155)](zotero://open-pdf/library/items/HBVFC5PX?page=10&annotation=HG3RYRET)

> *“Matell and Meck (2004) have proposed, within the frame of SBF model, that the ERP signal could be representative of a reset of cortical neurons at the beginning of a stimulus, which seems coherent with the observation of a time-dependent ERP in the frontal cortex for all tested durations.”* [(p. 156)](zotero://open-pdf/library/items/HBVFC5PX?page=11&annotation=QK995VMM)

> *“Implicit tasks”* [(p. 156)](zotero://open-pdf/library/items/HBVFC5PX?page=11&annotation=JV4JP9NN)-  

**Implicit v. Explicit tasks**

> *“While changes in oscillatory power points to the involvement of a given brain area in timing - although the function of specific frequencies remains to be resolved - it does not give access to the recruitment of potential networks encompassing several structures. Synchronicity of oscillations between different structures, also called coherence (Fig. 2D), gives information about the communication between structures. When two structures are highly coherent, it is thought to make information transfer easier because the other structure is already primed to receive the spiking activity from the first (cf. the communication through coherence hypothesis, Fries, 2005).”* [(p. 156)](zotero://open-pdf/library/items/HBVFC5PX?page=11&annotation=3YF9P3AV)

> *“4. Open questions 4.1. Neural syntax of timing from single cells to networks How the animal brain encodes time remains a challenging question. As we just reviewed above, a large range of activity patterns (ramping, sustained and phasic) could be considered to be associated with passing time and this suggests that it may be their combined activities that underlie timing.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=DZPCZ8CW)

> *“equential time cells may share the role of single unit’s sustained activity but for longer durations that cannot be coded by a single cell. Sequential time cells need to be part of sets (i.e., functional populations) with each set involved in encoding a specific duration, allowing for multiple durations to be encoded and decoded at the same time.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=583HPXTE)

> *“Oscillations may provide a good way to produce those sets either through the phase locking of spikes to different phases of a frequency band (i.e., whether spikes are repeatedly more present at specific phases of the oscillations), or through phase amplitude coupling (PAC) of high frequency oscillations’ power with low frequency oscillations’ phase.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=UZ5PAD3S)

> *“To our knowledge very few studies studies have looked at this aspect of neuronal encoding in a timing task”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=9ESIMZGJ)

> *“Phase-locking of spikes to delta oscillations (centered at 1.6 Hz) in the ACC have been reported to correlate with the growing expectation of a reward in a sustained attention task (Totah et al., 2013a). In that study, the phase-locking was increased significantly more in correct than incorrect trials within the 2 s period before the presentation of the stimulus indicating which hole to choose to get a reward (2 s before). A similar pattern was observed in the PL, but with phase-locking of spikes to beta oscillations (centered at 17 Hz). However, Nakazono et al. (2015), looking at single units and theta oscillations in the hippocampus in a temporal discrimination task, showed that only few cells were time-locked to the oscillations compared to the study by MacDonald et al. (2013). The authors suggested that the two types of activity may have different roles, albeit both related to time: theta oscillations might help the hippocampus to interact with the PFC at the correct time, whereas the spikes may encode both temporal and spatial/sensory information.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=PRJFE875)

> *“4.2. Neural correlates of time associated with models A number of models of interval timing have been proposed, but neural proofs can be contradictory and do not, for now, allow for choosing one specific timing model”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=HNM7XNTA)

> *“The main group of internal clock models are pacemaker accumulator models (PA). Taking into account the intrinsic functioning of neurons and known network connectivity, Matell and Meck (2000) proposed the Striatal Beat Frequency model (SBF). It involves numerous cortical oscillators (representing the pacemaker and accumulator), and the detection of their coincident activation by the medium spiny neurons of the striatum on which they project.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=KZIW4R4U)

> *“[[pacemaker accumulator models (PA)]]”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=VPG4URJM)

> *“At the start of a stimulus, the oscillators are synchronized (maybe by a dopamine burst, Kononowicz, 2015) while keeping their own distinct frequencies, meaning that they will not remain synchronized over time. When a significant event happens (e.g., at the end of the stimulus or at the appearance of a reinforcement), the state of these different oscillators is encoded and stored by the striatum.”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=DYAFAWWG)-  

^lf137y

**❤kfuck,thisisgood.Butwhatis"StoredbySTR''mean?**

> *“By comparing the oscillators’ ongoing activity to the memorized patterns, it is possible for the striatum to determine how much time has passed, provided that the oscillatory activity remains very stable across time”* [(p. 157)](zotero://open-pdf/library/items/HBVFC5PX?page=12&annotation=NFF246WG)

^rth91u

> *“Recently, replacing the memory and decision stage of the SBF by the ones from a well characterized cognitive architecture (the adaptive control of thought-rational, ACT-R), which has defined default parameters, has improved modeling of more complex”* *“temporal behaviors (such as timing of multiple overlapping intervals) (van Rijn et al., 2014). These systems from ACT-R may involve other brain areas (e.g., the hippocampus) for memory and decision-making processes.”* [ ](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=A3UQ6QRT)

> *“Oscillations in the frontal cortex seem to be important for timing (e.g., Parker et al., 2014), and duration-related increased neuronal oscillations have been reported in the dorsomedial striatum (Dallérac et al., 2017) that could reflect a read-out of convergent oscillations from cortical neurons. 
> 
> However, no study has yet shown increased coherence between striatum and prefrontal cortex during interval timing. Potentially adding on to the SBF model, data from our lab seems also to implicate the amygdala as a modulator of cortico-striatal synapses to maintain the memory of a previous duration when learning a new duration. So both memories are maintained even though behavioral expression shifts quickly to the new duration (see Dallérac et al., 2017, Figure 10). 
> 
> However, some of the expected signs of the SBF model, such as phase reset at the beginning of the interval, have not been described in neurophysiological studies (Kononowicz and van Wassenhove, 2016).”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=4QA26NZT)

> *“The TopDDM (Time Adaptative Opponent Poisson drift-diffusion model) is also a PA model, but based on the drift-diffusion model of decision-making (Balci and Simen, 2016; Simen et al., 2011). It considers, in very general terms, that the accumulation of time should be represented by a ramping activity which rate is inversely proportional to the duration encoded. As reported above, this type of activity has been described in multiple papers (e.g., Komura et al., 2001; Lebedev et al., 2008; Murakami et al., 2014).”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=LSLHKXJN)

> *“There are also non-clock-based models; they require a population of units (can be neurons or group of neurons) that respond differently across time, which is consistent with the existence of sequential time cells. Included in those models is the TILT (Timing from Inverse Laplace transform) model from Shankar and Howard (2012), as well as the multi-timescale model (MTS) from Staddon and Higa (1999), and the Spectral Timing Model (Grossberg and Merrill, 1992). 
> 
> TILT model can also explain the scalar property of time as well as the recency effect of episodic memory (Howard et al., 2015). Its principle is that the presentation of a stimulus will activate a certain number of t nodes which will maintain a stable firing rate across the period of to-be-encoded time, and after the end of the interval decay exponentially to result in the activation of T nodes through an inverse Laplace transform. This will produce units that are active at a specific time point after the beginning of the stimulus. The different T nodes are activated sequentially and do not influence one another, they are instead influenced by the activity in the t nodes. Activities resembling to t nodes (stable increased firing) and to T nodes (sequential time cells) that when active during the early part of the interval have smaller spread of activity than cells activated later have both been reported in the literature. However, it remains to be determined to what extent they are found in all brain areas.”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=IVBWGXYW)

> *“TILT (Timing from Inverse Laplace transform) model from Shankar and Howard (2012)”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=XDW2YGUW)

- [ ] TILT (Timing from Inverse Laplace transform) model from Shankar and Howard (2012) #reading #p3|

> *“and the Spectral Timing Model (Grossberg and Merrill, 1992).”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=KBN8EYB4)

> *“duration and spatial location are learned and processed together as shown through space-time-context binding (Malet-Karas et al., 2019). It would seem important to store durations and contextual cues in the same anatomical regions, therefore going in the direction of multiple clocks”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=XDEDHV29)

> *“4.4. Temporal learning vs. temporal behavior”* [(p. 158)](zotero://open-pdf/library/items/HBVFC5PX?page=13&annotation=CKMX4V9I)-  

**kinda dropped off here.this section seems possibly relevantso perhaps revisit,**