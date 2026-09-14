

# Neuromodulated Spike-Timing-Dependent Plasticity, and Theory of Three-Factor Learning Rules
Read:: 
- [ ] Neuromodulated Spike-Timing-Dependent Plasticity, and Theory of Three-Factor Learning Rules N. Frémaux, W. Gerstner 2016 🛫 NA #reading #citation
Print::  ❌
Zotero Link:: NA
PDF:: NA
Files:: [@fremauxNeuromodulatedSpikeTimingDependentPlasticity2016.md](file:///G:%5CMy%20Drive%5CObsidian%5CObsidian%5CCharlie%20Vault%5CCitations%5C@fremauxNeuromodulatedSpikeTimingDependentPlasticity2016.md); [@fremauxNeuromodulatedSpikeTimingDependentPlasticity2016.md](file:////home/Mike/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/Zotero%20Papers/@fremauxNeuromodulatedSpikeTimingDependentPlasticity2016.md); [Frémaux_Gerstner_2016_Neuromodulated Spike-Timing-Dependent Plasticity, and Theory of Three-Factor.pdf](file:////Users/michaejt/Insync/m@tarlton.info/Google%20Drive/Fr%C3%A9maux_Gerstner_2016_Neuromodulated%20Spike-Timing-Dependent%20Plasticity,%20and%20Theory%20of%20Three-Factor.pdf); [fremauxNeuromodulatedSpikeTimingDependentPlasticity2016-mdnotes.md](file:////home/Mike/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/Zotero%20Papers/fremauxNeuromodulatedSpikeTimingDependentPlasticity2016-mdnotes.md)
Reading Note:: [[N. Frémaux, W. Gerstner (2016)]]
Web Rip:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "fremauxNeuromodulatedSpikeTimingDependentPlasticity2016" 
SORT file.cday DESC
```
# Top Comments
- Looks like a review

# Abstract
Classical Hebbian learning puts the emphasis on joint pre- and postsynaptic activity, but neglects the potential role of neuromodulators. Since neuromodulators convey information about novelty or reward, the influence of neuromodulators on synaptic plasticity is useful not just for action learning in classical conditioning, but also to decide “when” to create new memories in response to a flow of sensory stimuli. In this review, we focus on timing requirements for pre- and postsynaptic activity in conjunction with one or several phasic neuromodulatory signals. While the emphasis of the text is on conceptual models and mathematical theories, we also discuss some experimental evidence for neuromodulation of Spike-Timing-Dependent Plasticity. We highlight the importance of synaptic mechanisms in bridging the temporal gap between sensory stimulation and neuromodulatory signals, and develop a framework for a class of neo-Hebbian three-factor learning rules that depend on presynaptic activity, postsynaptic variables as well as the influence of neuromodulators.

# Quick Reference




# Topics


# Tasks


--
# Extracted Annotations and Comments


# Hand Extracted
## 4.1. Formalization of Modulated Hebbian Plasticity
> While Hebbian learning rules have two main factors, i.e., the presynaptic activity and the state of the postsynaptic neuron, a synaptic plasticity rule that is influenced in addition by a neuromodulator will be called a "three-factor rule" in the following.
>  
>  In general, any three-factor synaptic plasticity rule incorporating neuromodulation, as well as pre- and postsynaptic activity, can be written as
> $$
\dot{w}=F(M, \text { pre, post })
$$
> where $\dot{w}$ represents the weight change rate of a particular synapse from a pre- to a postsynaptic neuron. The variable $M$ on the right-hand side is the modulator signal. Because it is typically received and shared by many synapses, its effect is sometimes called "heterosynaptic modulation" (Bailey et al., 2000). 
> The variable $M$ represents an extrinsic signal in the sense that it is generated neither by the synapse itself nor by the pre- and postsynaptic neurons (Marder, 2012). 
> 
> In the theoretical literature, the variable $M$ is sometimes called a global factor in the sense that information conveyed by the time course of $M$ is available to many (but not necessarily all) neurons and synapses in parallel (Izhikevich, 2007; Frémaux et al., 2013). 
> 
> As before, the acronyms "pre" and "post" represent the spike train of the pre and the state of the postsynaptic neuron, respectively. In the theoretical literature, the variables summarized by "pre" and "post" are called the local factors of the synaptic update rule in the sense that the information conveyed by the spikes of one specific presynaptic neuron and the state of one postsynaptic neuron are available at the synapse (or synapses) connecting those two neurons (but not at other synapses). 
> 
> $F$ is a function, the specifics of which determine the exact type of the learning rule. Since three-factor rules are a modern generalization of the original concept of Hebb, they are also called "neo-Hebbian" (Lisman et al., 2011).

> Experiments that control presynaptic spiking, postsynaptic activity, and neuromodulation (see previous Section) roughly sketch the space of possible candidate functions that we could use for $F$. Since, however, data is scarce, no specific function $F$ can be extracted at present from the experimental data. Instead, theoreticians have proposed potential candidate functions that could play the role of $F$. 
> 
> In particular, the function $F$ of the three variables is sometimes assumed to consist of a "Hebb-like" term $F_1$ (pre, post) multiplied by a modulator function $g_1(M)$, 
> hence $\dot{w}=F(M$, pre, post $)=g_1(M) \cdot F_1$ (pre, post). 
> Alternatively, the neuromodulator could directly change the postsynaptic activity, hence $\dot{w}=F(M$, pre, post $)=F_2($ pre, post $(M))$, but there are also other options.

> In principle, the above mathematical framework of modulated synaptic plasticity should be applicable to various neuromodulators. For example, the phasic signal of noradrenaline-emitting neurons in locus coeruleus which has been linked to focused attentiveness on task-specific targets (Aston-Jones and Cohen, 2005) could influence synaptic plasticity and play the role of the modulator $M$ in Equation (2).
>  
>  Similarly, in conditioning tasks, reward-related dopamine signals (Schultz et al., 1997; Schultz, 2002) can play the role of the modulator $M$ in Equation (2). In particular, several recent studies have proposed models to link reward-based behavioral theories on one side, and models of learning at the level of individual neurons and synapses on the other side. In the following we focus on reward-driven learning models and cast them in the framework of the above three-factor rule.

## 4.2. Policy Gradient Models: R-max
> One of several mathematical schemes to arrive at candidates for the function $F$, is to focus on the problem of reward-driven learning and derive a synaptic plasticity rule from the principle of iterative reward-maximization (Xie and Seung, 2004; Pfister et al., 2006; Baras and Meir, 2007; Florian, 2007; Di Castro et al., 2009; Urbanczik and Senn, 2009; Vasilaki et al., 2009; Frémaux et al., 2010). 
> 
> In the following, rules derived from reward maximization are called R-max. More specifically, R-max plasticity rules result from the application of policy gradient methods (Williams, 1992; Baxter and Bartlett, 2001) to a stochastically spiking neuron model. Synaptic "eligibility traces" arise from theoretical considerations and effectively bridge the temporal gap between the neural activity and the reward signal.

> Suppose a presynaptic neuron sends a spike train "pre" to a postsynaptic neuron with spike train "post." Similar to Hebbian learning the synapse will form a transient memory of coincidences between pre- and postsynaptic spikes. 
> 
> This transient memory, called the "eligibility trace" in the theoretical literature and "tag" in the experimental literature, decays over a time scale $\tau_e$. While the transient memory persists, the synapse is marked and therefore eligible for changes later on (Figure 4A). 
> 
> The actual change of the synapse, however, requires in addition a neuromodulatory signal $M$ (Crow, 1968). Conceptually, the neuromodulator could target a specific subset of synapses, or a large, but random fraction of synapses in the brain. We emphasize, that even if the anatomical branching patterns are unspecific, only the synapses which have been previously marked by the eligibility trace will be changed (Figure 4B).