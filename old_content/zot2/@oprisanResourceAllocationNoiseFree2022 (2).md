
# Resource Allocation in the Noise-Free Striatal Beat Frequency Model of Interval Timing
Read:: - [ ] Oprisan et al. (2022) - Resource Allocation in the Noise-Free Striatal Beat Frequency Model of Interval Timing 🛫2023-09-18 !!2 #rd #citation #todoist
Print::  ❌
Zotero Link:: [Zotero](zotero://select/library/items/IFRSG2ES) 
Files:: [attachment](<file:///C:/Users/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage_new/Timing%20&%20Time%20Perception_2022/Oprisan%20et%20al_2022_Resource%20Allocation%20in%20the%20Noise-Free%20Striatal%20Beat%20Frequency%20Model%20of%20Interval.pdf>)
Reading Note::
Web Rip::
url:: https://brill.com/view/journals/time/11/1-4/article-p103_005.xml

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "oprisanResourceAllocationNoiseFree2022" 
SORT file.cday DESC
```

> [!Excerpt] Abstract
> Abstract The Striatal Beat Frequency (SBF) model of interval timing uses many neural oscillators, presumably located in the frontal cortex (FC), to produce beats at a specific criterion time Tc. The coincidence detection produces the beats in the basal ganglia spiny neurons by comparing the current state of the FC neural oscillators against the long-term memory values stored at reinforcement time Tc. The neurobiologically realistic SBF model has been previously used for producing precise and scalar timing in the presence of noise. Here we simplified the SBF model to gain insight into the resource allocation problem in interval timing networks. Specifically, we used a noise-free SBF model to explore the lower limits of the number of neural oscillators required for producing accurate timing. Using abstract sine-wave neural oscillators in the SBF-sin model, we found that the lower limit of the number of oscillators needed is proportional to the criterion time Tc and the frequency span (fmax − fmin) of the FC neural oscillators. Using biophysically realistic Morris–Lecar model neurons in the SBF-ML model, the lower bound increased by one to two orders of magnitude compared to the SBF-sin model.

# Quick Reference

# Top Notes

# Tasks






# Further Reading

> - [ ] Oprisan SA and Buhusi CV (2013). How noise contributes to time-scale invariance of interval timing. Phys. Rev. E, 87, 052717. doi: 10.1103/PhysRevE.87.052717.  #rd #p5 🛫2023-10-07
> ^LZA8PLDTaCB5WD6T3p15

> - [ ] Oprisan SA and Buhusi CV (2014). What is all the noise about in interval timing? Philos. Trans. R. Soc. Lond. B Biol. Sci, 369, 20120459. doi: 10.1098/rstb.2012.0459.  #rd #p5 🛫2023-10-07
> ^RFIDD5L4aCB5WD6T3p15

> - [ ] Oprisan SA, Aft T, Buhusi M, & Buhusi CV (2018a). Scalar timing in memory: A temporal map in the hippocampus. J. Theor. Biol, 438:133–142. doi: 10.1016/j.jtbi.2017.11.012. [PubMed: 29155279]  #rd #p5 🛫2023-10-07
> ^L5BQJZQGaCB5WD6T3p15

> - [ ] Oprisan SA, Buhusi M, & Buhusi CV (2018b). A population-based model of the temporal memory in the hippocampus. Front. Neurosci, 12, 521. doi: 10.3389/fnins.2018.00521. [PubMed: 30131668]  #rd #p5 🛫2023-10-07
> ^PD82TTA6aCB5WD6T3p15


# Topics

> ## Morris–Lecar model neurons #tp
> ^2TJSB48FaCB5WD6T3p1


# Extracted Annotations and Comments

> [!Highlight] Page 3
> 	In their model, the current phases of oscillators (clock stage) are continually compared against the memorized phases at the previously reinforced trials (memory stage).
> ^UW8QDKM6aCB5WD6T3p3

> [!Highlight] Page 3
> 	The connectionist model matched peak-interval procedure data with scalar property (Church & Broadbent, 1990, 1991) and fixed-interval schedules (Church et al., 1998). This model also presents higher accuracy for intervals near the underlying oscillator period, similar to the experimental data (Crystal, 1999; Crystal et al., 1997; Wearden and Doherty, 1995).
> ^DNDC4XUEaCB5WD6T3p3

> [!Highlight] Page 3
> 	We implemented the Striatal Beat Frequency (SBF) paradigm (Matell et al., 2004; Miall, 1989) and provided analytical insight into its behavior using simple sine-wave neural oscillators (SBF-sin) and biophysically realistic Morris–Lecar model neurons (SBF-ML). In the SBF model (Buhusi & Meck, 2005; Matell & Meck, 2000, 2004; Matell et al., 2000, 2004), time-scale invariance emerges rather than being artificially constructed (Matell et al., 2004).
> ^C7JYXLQJaCB5WD6T3p3

> [!Highlight] Page 4
> 	The SBF model does not assume time-scale invariance but instead connects it to ubiquitous noise, as suggested by Matell and Meck (Matell et al., 2004).
> ^6HBJAIA4aCB5WD6T3p4

> [!Highlight] Page 4
> 	The paper is organized as follows: a minimal block diagram is presented in section 2. The model shown in Fig. 1 includes (1) an oscillator block (OSC), presumably localized in the frontal cortex (FC); (2) a memory block (MEM), presumably associated with the nucleus basalis magnocellularis (Meck et al., 1987), frontal cortex (Olton et al., 1988) and hippocampus or fimbria fornix (Meck & Church, 1987b; Meck et al., 1987; Olton et al., 1988), that stores information about the state of the brain at the moment of reinforcement; (3) a decision block (OUT), presumably associated with the striatal spiny neurons integrating a vast number of different inputs, and responding selectively to particular reinforced patterns (Beiser & Houk, 1998; Houk, 1995; Houk et al., 1995a, b), and (4) a neuromodulator block (MOD) that mimics the modulation of cortical or thalamic (glutamate) induced striatal spiny neuron activity, and the threshold for coherent activity detection due to dopamine release from substantia niagra pars compacta (Chiodo & Berger, 1986; Groves et al., 1995; Schlauch et al., 1995; Umemiya & Raymond, 1997).
> ^2VPAE4GRaCB5WD6T3p4

> [!Highlight] Page 4
> 	This study discusses the analytical (see section 3.1), and numerical (see section 3.2) results based on the SBF implementation of the noise-free interval timing network shown in Fig. 1. The results presented here concern the resource allocation during interval timing. In particular, we studied the relationship between the signal-tonoise ratio (SNR) and the number of neural oscillators allocated to a timing task in the absence of any noise.
> ^88CUFKGTaCB5WD6T3p4

> [!Highlight] Page 4
> 	While noise is ubiquitous in biological systems, and we previously showed that it is critical for producing the time-scale invariance property (Oprisan & Buhusi, 2013, 2014), it also complicates the analytical derivations and numerical simulations.
> ^KX8XNADCaCB5WD6T3p4

> [!Highlight] Page 4
> 	With the caveat that in the absence of noise, the SBF model only produces precise but not scalar timing, we derived analytical bounds for the minimum number of neural oscillators required in an SBF-sin model (see section 3.1). We also checked the theoretical predictions of the SBF-sin model against numerical simulations with biophysically realistic models of neurons using the SBF-ML model (see section 3.2).
> ^CH55HHXEaCB5WD6T3p4

> [!Highlight] Page 4
> 	In the SBF-ML model, we found that the minimum number of FC neurons required for timing tasks increases by one to two orders of magnitude compared to the SBF-sin model.
> ^BNYAU5HGaCB5WD6T3p4

> [!Highlight] Page 4
> 	see Fig. 1a and Oprisan & Buhusi, 2011, 2014, Oprisan et al., 2018a, b for additional details
> ^964S3L5ZaCB5WD6T3p4

> [!Highlight] Page 5
> 	For example, a start gun that resets the phase of the Nmem BG oscillators is represented by the DA projections from substantia nigra pars compacta (SNc).
> ^7VDMCEF3aCB5WD6T3p5

> [!Highlight] Page 5
> 	A second DA projection from the ventral tegmental area (VTA) is responsible for the modulation of the Nosc oscillators’ speed in the FC
> ^K546IINKaCB5WD6T3p5

> [!Highlight] Page 5
> 	Our minimal computational diagram of the interval timing network (Fig. 1a) includes a time base made of a large number Nosc of neural oscillators with uniformly distributed frequencies f1,f2,...,fNosc presumably localized in the FC area (see the thin dashed line area (OSC) in Fig. 1b) (Matell et al., 2003).
> ^RJTMAKC6aCB5WD6T3p5

> [!Highlight] Page 5
> 	The longterm memory buffer is presumably represented by the set of synaptic weights w0 = {w0(1), w0(2), ..., w0(Nosc)} between neural oscillators in FC and the Nmem spiny neurons in the striatum at the reinforcement time Tc (see the dotted line area (MEM) in Fig. 1b)
> ^2RGPV5L2aCB5WD6T3p5

> [!Highlight] Page 5
> 	At the reinforcement (criterion) time Tc (Fig. 1b), the state of each neural oscillator is transferred to the long-term memory as a set of weights w0 connecting FC and the corresponding spiny neuron of the striatum.
> ^CYBCHUBJaCB5WD6T3p5

> [!Highlight] Page 5
> 	In the actual implementation, there are Nmem spiny neurons (see Fig. 1a), such that at the reinforcement time Tc, each spiny neuron stores a synaptic weight in the long-term memory buffer, while in a noise-free environment, the SBF model would store the same synaptic weights w0 for a given criterion time Tc in each of the Nmem projections from FC to the spiny neurons.
> ^VKRS9MBFaCB5WD6T3p5

> [!Highlight] Page 5
> 	However, the noise induces slight variations of these Nmem values, represented by the Gauss-like shape shown on the top side of the MEM block in Fig. 1b. The vertical line through criterion time Tc inside the OSC block (Fig. 1b) aligns with the peak of the Gauss-like distribution of the memorized weights in the MEM block in the presence of noise.
> ^XQH397VBaCB5WD6T3p5

> [!Highlight] Page 5
> 	Finally, a working SBF model needs a coincidence detector, presumably localized in BG, that integrates a vast number of different inputs and responds selectively to particular reinforced patterns (Beiser & Houk, 1998; Houk, 1995; Houk et al., 1995b) [see the thick long-dashed line area delineating the decision/output block (OUT) in Fig. 1c].
> ^TR4CH5R3aCB5WD6T3p5

> [!Highlight] Page 6
> 	Due to varying factors (biological noise, background neural activity from other cortical areas, etc.), the frequencies fiare slightly different from trial to trial, which leads to slightly different states of neural oscillators at criterion time.
> ^N6ATHIW3aCB5WD6T3p6

> [!Highlight] Page 6
> 	In the SBF models, the intrinsic burster neurons in the OSC block fire in the alpha band, i.e., 8–13 Hz, to match experimentally found resetting of neural activity at the beginning of timing procedures (Anliker, 1963; Rizzuto et al., 2003).
> ^AE6IVKKGaCB5WD6T3p6

> [!Highlight] Page 6
> 	. In our SBF-sin model, the frequencies of the Nosc neural oscillators are uniformly distributed over the interval (fmin = 8 Hz, fmax = 13 Hz).
> ^YAK72BF8aCB5WD6T3p6

> [!Highlight] Page 6
> 	The memory block (MEM) comprises Nmem units, storing a criterion time value Tc memorized during the training trials. Both storing and retrieval of criterion time to and from memory units are affected by biological context (brain state, noise, etc.) Therefore, the state of every single memory cell is modeled by randomly distributing criterion time intervals Tc according to a particular density probability function.
> ^BTVK36GUaCB5WD6T3p6

> [!Highlight] Page 6
> 	In the SBF-sin model implemented with phase oscillators (cosine waves), the MEM stores Nmem copies of the neurons’ states in the OSC block at criterion time Tc.
>     
> ---
> 	This seems quite different
> ^6RQQE4LAaCB5WD6T3p6

> [!Highlight] Page 6
> 	This is because the neural activity (“action potential”) generated by an FC neural oscillator was normalized between (−1, +1) and considered as coupling weight between FC and striatum during the training trials
>     
> ---
> 	Their weights go from -1 to +1
> ^W66YYKXDaCB5WD6T3p6

> [!Highlight] Page 6
> 	During the probe trials, the stored weights at reinforcement time Tc, i.e., the amplitude of the normalized neural activity during the training trial at Tc, are the FC to striatum coupling weights.
>     
> ---
> 	How is this not just "weights"
> ^78G9BV6IaCB5WD6T3p6

> [!Highlight] Page 6
> 	In the absence of memory noise, all Nmem copies are identical. The memory block (MEM) stores the criterion time Tc in the form of the coupling weights wij(Tc) between the neural oscillator i= 1, ..., Nosc in the OSC block and medium spiny neuron j= 1, ..., Nspiny in the decision block (OUT) (see Fig. 1b).
> ^ZDZH33DHaCB5WD6T3p6

> [!Highlight] Page 6
> 	Both storage and retrieval of the criterion time to and from the memory buffers are affected by biological contexts such as trial-to-trial variability, the brain state, noise, and neuromodulatory inputs. To mimic the effect of such noise sources, the weights wij(Tc) have Nmem copies distributed according to the statistics of the respective noise source.
>     
> ---
> 	So the weights are retrieved when the particular interval is observed?
> ^WTQ8VPYHaCB5WD6T3p6

> [!Highlight] Page 6
> 	The decision/output block (OUT) relates the internal representation of durations with external action. In our implementation of the SBF-sin model, the decision block estimates the projection of the current weights w along the direction of the reference weights vector w0, i.e., computes the dot product w*w0.
> ^LNAX9NS5aCB5WD6T3p6

> [!Highlight] Page 6
> 	The OUT block generates an output according to a given physiologically meaningful threshold. The coincidence detector compares the current synaptic weights wij(t) at the present time tagainst the reference weights wij(Tc) at criterion time Tc and delivers an appropriate output
> ^3B7VRGXPaCB5WD6T3p6

> [!Highlight] Page 7
> 	The neuromodulator block (MOD) mimics the effect of neuromodulators such as dopamine, which is known to advance responses in a fixed-interval experiment (Maricq & Church, 1983; Matell and Meck, 2004; Matell et al., 2004; Meck, 1983, 1986; Rammsayer, 1993), or acetylcholine, which induces delayed responses (Meck, 1983, 1996).
> ^7MS7Y59FaCB5WD6T3p7

> [!Highlight] Page 7
> 	Speed-up of the internal clock, presumably due to dopaminergic projections from the VTA to the FC, was observed following systemic dopaminergic agonist administration, e.g., methamphetamine or cocaine (Drew et al., 2003; Matell and Meck, 1997; Meck, 1988). Systemic dopaminergic antagonist administration, e.g., haloperidol, shifts the response time in a pattern consistent with a slow-down of timing (Buhusi & Meck, 2002, 2010].
> ^7GRJ3N7WaCB5WD6T3p7

> [!Highlight] Page 7
> 	While the SBF-sin model is analytically tractable, it seems too remote from neurobiology to be relevant. However, sine (or phase) oscillators have been used in mathematical ecology and the temporal evolution of biological systems (Guckenheimer & Holmes, 1983; Izhikevich, 2000; Winfree, 2001). They proved invaluable in uncovering universal laws of large-scale neural dynamics (Kuramoto, 1984; Kuznetsov, 2004). In principle, any neural oscillator can be reduced to a phase oscillator near a bifurcation point (Ermentrout, 1986).
>     
> ---
> 	More esoteric diatribe on the purpose of oscillators.
> 
> The bifurcation point thing is cool anyways
> ^GWB6MDX6aCB5WD6T3p7

> [!Highlight] Page 7
> 	In the SBF-sin model, the membrane potential V(t) of each neural oscillator is given by V(t) = Acos(2πft), where Ais the amplitude and fthe frequency of the phase oscillator. The synaptic weights connecting the oscillators OSC from the FC with the decision block OUT in the BG (see Fig. 1) are averages of membrane potentials over multiple Nmem trials (see Oprisan & Buhusi, 2013, 2014 for a detailed mathematical derivation and implementation of the weights).
> ^BPB2I7BPaCB5WD6T3p7

> [!Highlight] Page 7
> 	here, we also use a biophysically realistic alternative to phase oscillators, i.e., Morris–Lecar model neurons (Morris & Lecar, 1981; Rinzel & Ermentrout, 1998). The SBF-ML numerical results confirm the theoretical predictions based on the SBF-sin model.
> ^FLC8LXGDaCB5WD6T3p7

> [!Highlight] Page 7
> 	3.1. Theoretical Prediction of the Minimum Number of Oscillators Required for the Timing Task in the Noise-Free SBF-sin Model
>     
> ---
> 	This whole section is more an explanation of their methods. I have extracted most of this section into the glossary of the reading notes for this paper [Attach link]
> ^QBR5QVGBaCB5WD6T3p7

> [!Highlight] Page 8
> 	For the example shown in Fig. 2, with Tc = 10 s and fmax − fmin = 4 Hz, we need at least 40 sine oscillators to resolve such a value of Tc uniquely.
> ^HWQ6E7B8aCB5WD6T3p8

> [!Highlight] Page 8
> 	the maximum amplitude of the theoretical output function (equation (2)) was normalized to the unit. As a result, the normalized minimum amplitude of the theoretical output function was estimated numerically using beta spline envelopes such as those shown in Fig. 3 with long dashed lines.
>     
> ---
> 	Not entirely certain what they mean here. What is a beta-spline envelope?
> ^UUZ7X3XFaCB5WD6T3p8

> [!Highlight] Page 9
> 	The SBF-sin model is helpful because it can lead to general analytic solutions and provide insight into the possible behavior of more complex and biologically realistic implementations of the SBF model (Oprisan & Buhusi, 2014). One such implementation uses Morris and Lecar (1981) spiking neurons instead of sine waved to model neural activity (Oprisan & Buhusi, 2013).
> ^YKUKSKIYaCB5WD6T3p9

> [!Highlight] Page 9
> 	As expected, in the SBF-ML model, the noise level decreases with the neural oscillators’ number (see Fig. 4a). The normalized activation function (determined by the FC to BG weights) shows a more substantial peak at the expected criterion time Tc = 20 s with the increasing number of neural oscillators and a simultaneous reduction in background noise level.
> ^8VC642U7aCB5WD6T3p9

> [!Highlight] Page 10
> 	Similar to the SBF-sin model prediction, we notice that in the SBF-ML model, a more significant number of neural oscillators leads initially to an increase in the SNR followed by its saturation (see Fig. 4c). One notable difference is that the saturation starts at a considerably larger number of neural oscillators, i.e., the SBF-ML model needs a significantly larger number of neural oscillators than the SBF-sin model to resolve the peak of the output function and produce precise timing.
> ^MYBDDWK5aCB5WD6T3p10

> [!Highlight] Page 10
> 	Since the SBF model relies on the set of states of neural oscillators to resolve the output function’s peak, a sine wave offers many discrete values that could encode the state of the FC. For example, an f= 8 Hz sine wave oscillator could be covered by n=1/(fts) = 125 ML neurons, each firing with a spike duration ts = 1 ms.
> ^46W46C65aCB5WD6T3p10

> [!Highlight] Page 10
> 	This is because an ML model neuron with the same period and a ts = 1 ms spike duration can only encode one value since the neuron is at rest for the rest of the time.
>     
> ---
> 	So it is sort of like our discrete model?
> ^S7J7J2J5aCB5WD6T3p10

> [!Highlight] Page 10
> 	In other words, we need 125 ML neurons to cover the same range of discrete values encoded by a sine wave.
>     
> ---
> 	HEY that's the thing! So we need at least 125 discrete oscillators
> ^4IA8UQUWaCB5WD6T3p10

> [!Highlight] Page 10
> 	We also notice from Fig. 4d that the SNR decreases as the criterion time Tc increases for a fixed number of neural oscillators. The reason is that the quantization (discretization or sampling) error of every cosine wave of the time base with a given number of ML spikes of ts = 1 ms duration increases with the to-be-timed duration.
> ^9X28F5T6aCB5WD6T3p10

> [!Highlight] Page 10
> 	Based on the numerical simulations of the SBF-ML model, we know that a similar pattern emerges (see Fig. 4d), with the notable difference that the minimum number of required oscillators is one to two orders of magnitude larger than for the same criterion time in the SBF-sin model.
>     
> ---
> 	I need to figure out what the ML model is and why it is causing this effect
> ^3CSC68KRaCB5WD6T3p10

> [!Highlight] Page 10
> 	A possible explanation is the very different behavior of the action potential in the SBF-sin model compared to SBF-ML. In the SBF-sin model, the membrane potential uniformly samples Oprisan et al. Page 10 TimingTimePercept. Author manuscript; available in PMC 2023 April 14. A u t h o r M a n u s c r i p t A u t h o r M a n u s c r i p t A u t h o r M a n u s c r i p t A u t h o r M a n u s c r i p
> ^DAW6XSDLaCB5WD6T3p10

> [!Highlight] Page 11
> 	all amplitudes during a period, whereas an ML model neuron is only active briefly for 1–3 ms and then is silent. An ML action potential, especially for Type I oscillators used here (Ermentrout, 1986; Rinzel and Ermentrout, 1998), looks like a very sharp spike, which could be assimilated to a delta function for long firing periods. As a result, a sine wave sampled every 1–3 ms over its period will require a considerable number of sampling points, which translates into a large number of ML neural oscillators needed for covering the same discrete values of the membrane potential as a sine wave.
> ^TI43K26QaCB5WD6T3p11

> [!Highlight] Page 11
> 	In a noise-free environment with sine-wave neural oscillators, we found that the model can perform accurate timing with at least Nosc = Tc(fmax − fmin) to encode a duration Tc. However, if spiking neurons are used, like in our SBF-ML model, the numbers above increase by orders of magnitude. This is because every sine wave of frequency fmust be sampled with short spikes (action potentials) of duration ts, which lead to a factor of n=1/(fts).
> ^BHQD4FLGaCB5WD6T3p11

> [!Highlight] Page 11
> 	To conclude, the minimum number of spiking ML neural oscillators required is Nosc = T c fmax − fmin n = T c fmax − fmin / fmax − ts = T c/ts 1 − fmin/fmax (6)
> ^CD3K46A8aCB5WD6T3p11

> [!Highlight] Page 11
> 	a criterion time Tc = 10 s for an SBF-ML implementation with spiking neurons having a spike width of ts = 1 ms and fitting in the alpha band (fmin = 8 Hz, fmax = 13 Hz) needs at least 3800 neurons. This number increases linearly with the criterion time. However, this is the minimum number of neuronal oscillators required for a noise-free SBF-ML model to maintain an acceptable SNR of the output.
> ^XVP75VKMaCB5WD6T3p11

> [!Highlight] Page 11
> 	It is expected that adding noise increases the number of neural oscillators dedicated to the timing task. Since there are so few neurons (a couple of hundreds to thousands) out of billions of neurons in the prefrontal cortex, which can produce accurate timing, the findings seem consistent with the sparse coding.
> ^7465PXECaCB5WD6T3p11

> [!Highlight] Page 11
> 	We also notice when comparing the SNR for the SBF-sin model (Fig. 3d) against the SBF-ML model (Fig. 4d) that the absolute value of the SNR is significantly smaller in the SBF-ML model. In the SBF-ML model (Fig. 4d), the SNR does not exceed 10 units, which corresponds to 20 log10 SNR = 20 dB. At the same time, from Fig. 3d, we notice that the SNR for the SBF-sin model exceeds 100 units, i.e., more than 40 dB. The SNR for most electrophysiological recordings is right at the edge of 20 dB (Suarez-Perez et al., 2018; Venkatachalam et al., 2011)
> ^7KCHBEBVaCB5WD6T3p11

> [!Highlight] Page 11
> 	Behavioral experiments on goldfish (Fay, 2011) showed a similar 20 dB upper bound for SNR. Therefore, the SBF-ML model implemented with realistic biophysical model neurons is within the limits of the SNR reported for biological experiments.
> ^FTQP63RPaCB5WD6T3p11

> [!Highlight] Page 11
> 	We know from the previous implementation that noise is critical for producing the scalar timing in the SBF model (Oprisan & Buhusi, 2013, 2018). Adding noise to the SBF model can only decrease the SNR. Future work will focus on recalculating the lower bounds on the number of neurons required for timing tasks in the presence of noise.
> ^PJL8N57RaCB5WD6T3p11






# Figures (blue)

> Figure 1. The Striatal Beat Frequency model. (a) A minimal neurobiologically realistic structure that connects the Nosc of the frontal cortex (FC), marked with the thin dashed line,with the Nmem spiny neurons of the striatum (see the dotted rectangular area inside the large dashed rectangle suggesting the basal ganglia (BG)). While the BG has many more subnetworks involved in interval timing, we only show its output to globus pallidus internal (GPi). ACh: acetylcholine; FC: frontal cortex; BG: basal ganglia; DA: dopamine; Glu: glutamate; GPi: globus pallidus internal; SNc/r: substantia nigra pars compacta/reticulata; VTA: ventral tegmental area; nucleus basalis magnocellularis (NBM); nucleus basalis (NB). (b) The Nosc frontal cortex (FC) oscillators with different frequencies f1,f2,...,fNosc in the oscillatory block (OSC) (marked with the thin dashed line) provide the base time for the model. At the reinforcement time Tc, the state of the OSC block is copied to the Nmem values of the long-term memory block (MEM) (dotted line area). (c) The decision/output block (OUT),
> 
> Figure 1. The Striatal Beat Frequency model. (a) A minimal neurobiologically realistic structure that connects the Nosc of the frontal cortex (FC), marked with the thin dashed line,with the Nmem spiny neurons of the striatum (see the dotted rectangular area inside the large dashed rectangle suggesting the basal ganglia (BG)). While the BG has many more subnetworks involved in interval timing, we only show its output to globus pallidus internal (GPi). ACh: acetylcholine; FC: frontal cortex; BG: basal ganglia; DA: dopamine; Glu: glutamate; GPi: globus pallidus internal; SNc/r: substantia nigra pars compacta/reticulata; VTA: ventral tegmental area; nucleus basalis magnocellularis (NBM); nucleus basalis (NB). (b) The Nosc frontal cortex (FC) oscillators with different frequencies f1,f2,...,fNosc in the oscillatory block (OSC) (marked with the thin dashed line) provide the base time for the model. At the reinforcement time Tc, the state of the OSC block is copied to the Nmem values of the long-term memory block (MEM) (dotted line area). (c) The decision/output block (OUT),
> **Page 16**
> 
> ---
> 	+
> ^QN45XCDFaCB5WD6T3p16

> [!Fig 1]
> ![[public/Citations/oprisanResourceAllocationNoiseFree2022_Amedia/CU7Q2T3K.png]]
> **Page 16**
> 
> ---
> 	Fig 1
> ^CU7Q2T3KaCB5WD6T3p16

> marked with a thick dashed line, constantly compares the current state of OSC against the stored states from MEM and produces an appropriate output. The SBF model also includes a neuromodulator bloc (MOD) to mimic pharmacological and neuromodulatory effects (marked with the dash-dotted line).
> 
> marked with a thick dashed line, constantly compares the current state of OSC against the stored states from MEM and produces an appropriate output. The SBF model also includes a neuromodulator bloc (MOD) to mimic pharmacological and neuromodulatory effects (marked with the dash-dotted line).
> **Page 17**
> 
> ---
> 	+
> ^Y5ERK7X7aCB5WD6T3p17

> Figure 2. The elements of the theoretical output function of the noise-free SBF-sin (sine-wave) model. Theoretical output function of a noise-free SBF-sin model (equation(2)) for a criterion time Tc = 10 s using a variable number of FC oscillators: 10 (a1), 20 (b1), and 40 (c1). The denominator of the theoretical output function (a2–b2–c2) represents the envelope of the output function shown in panels a1–c1. The numerator of the theoretical output function (a3–b3–c3) represents the fast oscillating part of the output function shown in panels a1–b1c1 that fills in the envelopes shown in panels a2–b2–c2.
> 
> Figure 2. The elements of the theoretical output function of the noise-free SBF-sin (sine-wave) model. Theoretical output function of a noise-free SBF-sin model (equation(2)) for a criterion time Tc = 10 s using a variable number of FC oscillators: 10 (a1), 20 (b1), and 40 (c1). The denominator of the theoretical output function (a2–b2–c2) represents the envelope of the output function shown in panels a1–c1. The numerator of the theoretical output function (a3–b3–c3) represents the fast oscillating part of the output function shown in panels a1–b1c1 that fills in the envelopes shown in panels a2–b2–c2.
> **Page 18**
> 
> ---
> 	+
> ^T2YUKY6CaCB5WD6T3p18

> [!Fig 2]
> ![[public/Citations/oprisanResourceAllocationNoiseFree2022_Amedia/HAATFJTT.png]]
> **Page 18**
> 
> ---
> 	Fig 2
> ^HAATFJTTaCB5WD6T3p18

> [!Fig 3]
> ![[public/Citations/oprisanResourceAllocationNoiseFree2022_Amedia/JUAGBIS8.png]]
> **Page 19**
> 
> ---
> 	Fig 3
> ^JUAGBIS8aCB5WD6T3p19

> Figure 3. The signal-to-noise ratio of a noise-free SBF-sin (sine-wave) model. The theoretical output function (equation (2)), marked with the thin continuous line, was beta spline interpolated (see the thick dashed line) to get the maximum and minimum amplitude of the output signal. The minimum of the envelope decreases, leading to an increase in the SNR, as the number of neural oscillators increases from 20 (a) to the minimum required 40 (b) for a Tc = 10 s (see equation (5)). For more than the minimum number of required oscillators, e.g., 60 oscillators in panel (c), the minimum amplitude of the envelope was measured by averaging over a 3σinterval starting from t= 0 s. As seen in panel (d), the SNR linearly increases with the number of oscillators until the minimum number is reached, and then the SNR saturates. The SNR behavior is consistent over a wide range of criteria from 10 s to 100 s.
> 
> Figure 3. The signal-to-noise ratio of a noise-free SBF-sin (sine-wave) model. The theoretical output function (equation (2)), marked with the thin continuous line, was beta spline interpolated (see the thick dashed line) to get the maximum and minimum amplitude of the output signal. The minimum of the envelope decreases, leading to an increase in the SNR, as the number of neural oscillators increases from 20 (a) to the minimum required 40 (b) for a Tc = 10 s (see equation (5)). For more than the minimum number of required oscillators, e.g., 60 oscillators in panel (c), the minimum amplitude of the envelope was measured by averaging over a 3σinterval starting from t= 0 s. As seen in panel (d), the SNR linearly increases with the number of oscillators until the minimum number is reached, and then the SNR saturates. The SNR behavior is consistent over a wide range of criteria from 10 s to 100 s.
> **Page 19**
> 
> ---
> 	+
> ^YR76VIYIaCB5WD6T3p19

> [!Fig 4]
> ![[public/Citations/oprisanResourceAllocationNoiseFree2022_Amedia/F52ZCAWI.png]]
> **Page 20**
> 
> ---
> 	Fig 4
> ^F52ZCAWIaCB5WD6T3p20

> Figure 4. The signal-to-noise ratio of a noise-free SBF-ML (Morris–Lecar) model. The output function of the SBF-ML model shows a more substantial peak at the criterion time Tc = 20 s as we increase the number of neural oscillators (a). For the same criterion time, the background noise amplitude decreases by increasing the number of neural oscillators (a). The output functions of the SBF-ML model (thin continuous lines) were fitted with a smooth beta spline curve (thick long dashed line for Tc= 20 s, thick dotted line for Tc= 40 s, and thick dashed-dotted line for Tc= 80 s) that allowed us to estimate the background noise level (b). To determine the location of the peak of the output function and the standard deviation σ, we used a Gaussian curve (see continuous line) to fit the output of the SBF-ML model (see dotted lines) (c). The noise level was measured by averaging the output function starting 3σfrom the criterion time (b). The SNR increases with the number of neural oscillators and eventually saturates (d). For a fixed number of neural oscillators, as the criterion time increases from Tc = 20 s (solid red rectangles) to Tc = 40 s (solid green circles) to Tc = 80 s (solid blue triangles), the SNR decreases.
> 
> Figure 4. The signal-to-noise ratio of a noise-free SBF-ML (Morris–Lecar) model. The output function of the SBF-ML model shows a more substantial peak at the criterion time Tc = 20 s as we increase the number of neural oscillators (a). For the same criterion time, the background noise amplitude decreases by increasing the number of neural oscillators (a). The output functions of the SBF-ML model (thin continuous lines) were fitted with a smooth beta spline curve (thick long dashed line for Tc= 20 s, thick dotted line for Tc= 40 s, and thick dashed-dotted line for Tc= 80 s) that allowed us to estimate the background noise level (b). To determine the location of the peak of the output function and the standard deviation σ, we used a Gaussian curve (see continuous line) to fit the output of the SBF-ML model (see dotted lines) (c). The noise level was measured by averaging the output function starting 3σfrom the criterion time (b). The SNR increases with the number of neural oscillators and eventually saturates (d). For a fixed number of neural oscillators, as the criterion time increases from Tc = 20 s (solid red rectangles) to Tc = 40 s (solid green circles) to Tc = 80 s (solid blue triangles), the SNR decreases.
> **Page 20**
> 
> ---
> 	+
> ^SPL3KTKTaCB5WD6T3p20








