

# Spike-Based Reinforcement Learning in Continuous State and Action Space: When Policy Gradient Methods Fail
Read:: 
- [ ] Spike-Based Reinforcement Learning in Continuous State and Action Space: When Policy Gradient Methods Fail E. Vasilaki, N. Frémaux, R. Urbanczik, W. Senn, W. Gerstner 2009 🛫 NA #reading #citation
Print::  ❌
Zotero Link:: NA
PDF:: NA
Files:: [Snapshot](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/24BKZ2UC/article.html); [Vasilaki et al_2009_Spike-Bas[[Three-Factor Learning Rule]]ed Reinforcement Learning in Continuous State and Action Space.pdf](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/XSL8HC99/Vasilaki%20et%20al_2009_Spike-Based%20Reinforcement%20Learning%20in%20Continuous%20State%20and%20Action%20Space.pdf)
Reading Note:: [[E. Vasilaki, N. Frémaux, R. Urbanczik, W. Senn, W. Gerstner (2009)]]
Web Rip:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "vasilakiSpikeBasedReinforcementLearning2009a" 
SORT file.cday DESC
```

# Abstract
Changes of synaptic connections between neurons are thought to be the physiological basis of learning. These changes can be gated by neuromodulators that encode the presence of reward. We study a family of reward-modulated synaptic learning rules for spiking neurons on a learning task in continuous space inspired by the Morris Water maze. The synaptic update rule modifies the release probability of synaptic transmission and depends on the timing of presynaptic spike arrival, postsynaptic action potentials, as well as the membrane potential of the postsynaptic neuron. The family of learning rules includes an optimal rule derived from policy gradient methods as well as reward modulated Hebbian learning. The synaptic update rule is implemented in a population of spiking neurons using a network architecture that combines feedforward input with lateral connections. Actions are represented by a population of hypothetical action cells with strong mexican-hat connectivity and are read out at theta frequency. We show that in this architecture, a standard policy gradient rule fails to solve the Morris watermaze task, whereas a variant with a Hebbian bias can learn the task within 20 trials, consistent with experiments. This result does not depend on implementation details such as the size of the neuronal populations. Our theoretical approach shows how learning new behaviors can be linked to reward-modulated plasticity at the level of single synapses and makes predictions about the voltage and spike-timing dependence of synaptic plasticity and the influence of neuromodulators such as dopamine. It is an important step towards connecting formal theories of reinforcement learning with neuronal and synaptic properties.

# Quick Reference

## Time Course $\varepsilon\left(t-t_j^f\right)$
The time course of the EPSP $\varepsilon\left(t-t_j^f\right)$ represents the effect of presynaptic activity at the location of the synapse. 

## [[Excitatory - Inhibitory postsynaptic potential (EPSP) - (IPSP)]]

## $u_i$ the membrane potential  of neuron $i$

## $g\left(u_i\right)$ a positive function that increases with the membrane potential $u_i$,
see also Eq. (24). 

## $\rho_i(t)=g\left(u_i(t)\right)$ roughly equates to “firing rate””
The membrane potential enters in the function $g\left(u_i\right)$ that determines the instantaneous firing rate $\rho_i(t)=g\left(u_i(t)\right)$. 

## $Y_i(t)=\sum_f \delta\left(t-t_i^f\right)$ is the spike train of the postsynaptic neuron 
$\delta(t)$ the Dirac function, 
Postsynaptic spikes are treated as events and described by the function $Y(t)=\sum_f \delta\left(t-t_i^f\right)$. 
## $\tau_c$ a parameter with units of time
The parameter $\tau_c>0$ is a specific feature of our model which allows to turn the model from a strict policy gradient method $\left(\tau_c=0,[33,34]\right.$ see methods) to a naive Hebbian model $\left(\tau_c \rightarrow \infty\right.$, see below the discussion of the postsynaptic factor).

Thus we are able to link and compare these conceptually different rules via the modification of $\tau_c$. 

We note that for small firing rates $\rho(t) \tau_c \ll 1$, Eq. (9) approximates the optimal policy gradient rule of $[33,34]$, while for larger firing rates, it enhances the Hebbian component of the rule. 

For $\rho(t) \tau_c \gg 1$, the term in the square brackets goes to $\left[Y_i(t)-\left(1 / \tau_c\right)\right]$ 
so that for $\tau_c \rightarrow \infty$ learning is driven by the Hebbian correlation term $Y_i(t) \varepsilon\left(t-t_j^f\right)$. 
In the main body of the simulation results, we pick a fixed value of $\tau_c=5 \mathrm{~ms}$ which implies that we use a policy gradient method with a Hebbian bias.


## $D_i$ postsynaptic factor
Encapsulated by the square brackets in Eq. (8)
$D_{i} = \left[Y_i(t)-\frac{\rho_i(t)}{1+\tau_c \rho_i(t)}\right]$
and visualized as a function of membrane potential in **Figure 1**. 

For the case of $\tau_c \rightarrow \infty$ the postsynaptic factor depends only on spike timing, but not on the membrane potential of the postsynaptic neuron.

# Top Comments


# Topics
## [[Eligibility Traces]]

## [[Spike Response Model neuron]]

## eligibility trace time constant $\tau_e$
Appears to be 


# Tasks


--
# Extracted Annotations and Comments
## Introduction
The resulting synaptic update rules can be formulated as a differential equation in continuous time that has the form of a three-factor rule
$$
\begin{gathered}
\frac{d w_{i j}}{d t}(t)=\alpha\left(w_{i j}\right)(R-b) \delta\left(t-t_{h i t}\right) e_{i j}(t) \\
e_{i j}(t)=\int_0^{\infty} \gamma\left(t-t^{\prime}\right) f_1\left(\operatorname{pre}_j\left(t^{\prime}\right)\right) f_2\left(\operatorname{post}_i\left(t^{\prime}\right)\right) d t^{\prime}
\end{gathered}
$$
The term $e_{i j}$, called eligibility trace, picks up the correlations between pre- and postsynaptic activity just as in a Hebbian learning rule and convolves these with a low-pass filter $\gamma$. 

However, the final weight change is implemented only in the presence of a reward signal $R-b$ which is delivered at the time $t_{\text {hit }}$ when the animal hits the target. The choices of $b$ considered in this paper are: $b=0$ and $b=\bar{R}$, where $\bar{R}$ is the reward signal averaged over many trials.

In contrast to earlier work of Xie and Seung [32] but similar to [33-35] our approach takes into account spiking neurons with refractoriness and includes examples such as the standard integrate-and-fire model. Under certain conditions on the refractoriness [34], our learning rule can be identified with a standard STDP model, but modulated by a third factor [33-36]. In contrast to most earlier work $[33,34,36]$, our learning rule is applied to a network of neurons that combines feed-forward input with lateral interactions.
## Three-factor learning rule for spiking neurons
We consider a ==Spike Response Model neuron== with index $i$ that receives input from other neurons $j$. The $f$-th input spike from neuron $j$ arrives at time $t_j^f$ at a synapses onto neuron $i$ and causes there an excitatory (or inhibitory) postsynaptic potential (EPSP or IPSP) of ==time course== $\varepsilon\left(t-t_j^f\right)$ and amplitude $w_{i j}$. 

The EPSPs and IPSPs of all incoming spikes are added to the membrane potential $u_i$ of neuron $i$. Spikes are generated stochastically with an instantaneous rate (or stochastic intensity)
$$
\rho_i(t)=g\left(u_i(t)\right)
$$
where $g\left(u_i\right)$ is a positive function that increases with the membrane potential $u_i$, see also Eq. (24). 

Immediately after a spike of neuron $i$ at time $t_i^f$, 
the neuron enters into a state of relative refractoriness, which is implemented by a hyperpolarizing spike afterpotential $\eta\left(t-t_i^f\right)$. 

Thus the total membrane potential of the Spike Response Model neuron is [20]:
**Equation 6:**$$
u_i(t)=u_{\text {rest }}+\sum_{j=1}^N w_{i j} \sum_{t_j^{\prime} \in x_j} \varepsilon\left(t-t_j^f\right)+\sum_{t_i \in y_{i, t}} \eta\left(t-t_i^f\right)
$$
where $u_{\text {rest }}$ is the resting potential, $x_j$ is the set of presynaptic spikes, $y_{i, t}=\left\{t_i^1, t_i^2, \ldots, t_i^F<t\right\}$ is the set of postsynaptic spikes up to time $t$.

Using this neuron model, we can calculate the probability that neuron $i$ generates a specific spike train with firing times $t_i^1, t_i^2, t_i^3, \ldots$ during a trial of duration $T$ [34], see Methods, Eq. (25).

Some of the spikes of neurons $i$ occur just before a reward is delivered, others not. 

The aim of learning is to change the synaptic weights $w_{i j}$ so that the probability of receiving a reward $R$ increases. We consider learning rules of the form
**Equation 7:**$$
\frac{d w_{i j}}{d t}(t)=\alpha(R-b) \delta\left(t-t_{h i t}\right) e_{i j}(t)
$$
where $\alpha$ is the learning rate (controlling the amplitude of weight updates), 
$t_{\text {hit }}$ the moment when the animal hits the target or the wall, 
$R=1$ is the positive reward for finding the target, 
$R=-1$ the (negative) reward for bumping into a wall 
and $b$ a reward baseline, for instance an estimate of the positive reward based on past experience.

The eligibility trace $e_{i j}(t)$ evolves according
**Equation 8:**
$$
\frac{d e_{i j}}{d t}(t)=-\frac{e_{i j}}{\tau_e}+\frac{g^{\prime}}{g}\left[Y_i(t)-\frac{\rho_i(t)}{1+\tau_c \rho_i(t)}\right] \sum_{t_j^f \in x_{j, t}} \varepsilon\left(t-t_j^f\right)
$$
where
$Y_i(t)=\sum_f \delta\left(t-t_i^f\right)$ is the spike train of the postsynaptic neuron, 
$\delta(t)$ the Dirac function, 
$\tau_e$ the ==eligibility trace time constant==, 
$\tau_c$ a parameter with units of time, 
and $g^{\prime}=d g / d u$ the derivative of the function $g(u)$.

Because of the parameter $\tau_c$, the learning equations (9) and (8) define a ***family of learning rules***, rather than one single instance of a rule. 

The parameter $\tau_c>0$ is a specific feature of our model which allows to turn the model from a strict policy gradient method $\left(\tau_c=0,[33,34]\right.$ see methods) to a naive Hebbian model $\left(\tau_c \rightarrow \infty\right.$, see below the discussion of the postsynaptic factor).

Thus we are able to link and compare these conceptually different rules via the modification of $\tau_c$. 

We note that for small firing rates $\rho(t) \tau_c \ll 1$, Eq. (9) approximates the optimal policy gradient rule of $[33,34]$, while for larger firing rates, it enhances the Hebbian component of the rule.

For $\rho(t) \tau_c \gg 1$, the term in the square brackets goes to $\left[Y_i(t)-\left(1 / \tau_c\right)\right]$ 
so that for $\tau_c \rightarrow \infty$ learning is driven by the Hebbian correlation term $Y_i(t) \varepsilon\left(t-t_j^f\right)$. 
In the main body of the simulation results, we pick a fixed value of $\tau_c=5 \mathrm{~ms}$ which implies that we use a policy gradient method with a Hebbian bias.

The estimate of the positive reward is calculated as a running mean updated at the end of the trial according the following equation: $$\bar{R}(n)=\left(1-\frac{1}{m_r}\right) \bar{R}(n-1)+\frac{1}{m_r} R_T(n)$$, with
$n$ being the number of the trial,
$R_T(n)$ being the reward at the end of the $n$-th trial ( 1 or 0 )
and $m_r$ the width of the averaging window.

We will now show that Eqs. (7) and (8) can be interpreted as a three-factor learning rule for spiking neurons, within the general framework outlined in the introduction.

### Presynaptic factor. 
Presynaptic spike arrival causes an EPSP. 

The time course of the EPSP $\varepsilon\left(t-t_j^f\right)$ represents the effect of presynaptic activity at the location of the synapse. 

We emphasize that the term *presynaptic factor* does not imply that this factor is implemented presynaptically - rather it refers to a term caused by the activity of the presynaptic neuron $j$.

### Postsynaptic factor. 
Postsynaptic activity is represented by both the timing $t_i^f$ of postsynaptic action potentials and the postsynaptic membrane potential $u_i(t)$.

The membrane potential enters in the function $g\left(u_i\right)$ that determines the instantaneous firing rate $\rho_i(t)=g\left(u_i(t)\right)$. 

Postsynaptic spikes are treated as events and described by the function $Y(t)=\sum_f \delta\left(t-t_i^f\right)$. 

The postsynaptic factor, denoted by $D_i$, is encapsulated by the square brackets in Eq. (8) and visualized as a function of membrane potential in Figure 1. 

For the case of $\tau_c \rightarrow \infty$ the postsynaptic factor depends only on spike timing, but not on the membrane potential of the postsynaptic neuron.

The presynaptic and postsynaptic factors both enter into the eligibility trace $e_{i j}$ of Eq. (8) which is a quantity that must be stored locally at the synapses from neuron $j$ to neuron $i$. 

The eligibility trace of the synapse from $j$ to $i$ is updated by a finite positive amount whenever a postsynaptic action potential occurs within the time span of an EPSP at this synapse.

Hence the eligibility trace picks up (potentially causal) correlations between presynaptic spike arrival and postsynaptic spike firing. If an EPSP occurs without a postsynaptic spike, the eligibility trace decays smoothly at a rate proportional to $\rho_i /\left[1+\tau_c \rho_i\right]$. 

In particular, if the membrane potential is high, but no postsynaptic spike is triggered, the eligibility trace decreases strongly. However, in the limit $\tau_c \rightarrow \infty$ such a depression of the synapse does not occur. 

Thus, for $\tau_c \rightarrow \infty$ the eligibility trace is naive Hebbian in the sense that it is increased if postsynpatic spikes occur shortly after (and potentially triggered by) presynaptic spike arrival. If a synapse is not active (that is, in the absence of an EPSP at the synapse), the eligibility always decays with a slow time constant $\tau_e$ in the range of seconds. Whatever the choice of $\tau_c$, the eligibility trace uses only local quantities that are available at the site of the synapse and stores locally the correlations between pre- and postsynaptic activity averaged over several seconds. In the