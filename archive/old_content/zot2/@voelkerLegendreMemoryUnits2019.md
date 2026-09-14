

# Legendre Memory Units: Continuous-Time Representation in Recurrent Neural Networks
Read:: partially
Project:: []
Print::  ❌
- [ ] print 
Zotero Link:: NA
PDF:: NA
Files:: [@voelkerLegendreMemoryUnits2019.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/@voelkerLegendreMemoryUnits2019.md); [Voelker et al_2019_Legendre Memory Units.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/7F8ZW28Q/Voelker%20et%20al_2019_Legendre%20Memory%20Units.pdf); [voelkerLegendreMemoryUnits2019-zotero.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/voelkerLegendreMemoryUnits2019-zotero.md)
Reading Note:: [[Aaron Voelker, Ivana Kajić, Chris Eliasmith 2019]]

# Abstract
We propose a novel memory cell for recurrent neural networks that dynamically maintains information across long windows of time using relatively few resources. The Legendre Memory Unit (LMU) is mathematically derived to orthogonalize its continuous-time history - doing so by solving $d$ coupled ordinary differential equations (ODEs), 
whose phase space linearly maps onto sliding windows of time via the Legendre polynomials up to degree $d-1$. 

Backpropagation across LMUs outperforms equivalently-sized LSTMs on a chaotic time-series prediction task, improves memory capacity by two orders of magnitude, and significantly reduces training and inference times.

LMUs can efficiently handle temporal dependencies spanning 100,000 time-steps, converge rapidly, and use few internal state-variables to learn complex functions spanning long windows of time - exceeding state-of-the-art performance among RNNs on permuted sequential MNIST. 

These results are due to the network's disposition to learn scale-invariant features independently of step size. Backpropagation through the ODE solver allows each layer to adapt its internal time-step, enabling the network to learn task-relevant time-scales. 

We demonstrate that LMU memory cells can be implemented using $m$ recurrently-connected Poisson spiking neurons, $\mathcal{O}(m)$ time and memory, with error scaling as $\mathcal{O}(d / \sqrt{m})$. We discuss implementations of LMUs on analog and digital neuromorphic hardware.


# Quick Reference


# Personal Summary
This may be a little too beyond me at the moment as everything refers to some module or topic which I am unfamiliar with.
I think I’m also missing how they actually structure a network with these things. See the section in the paper on the LMU model under 3.2. I may just need to better follow the methods section

# Top Comments


# Topics


# Tasks


--
# Extracted Annotations and Comments

Annotations(5/9/2022, 11:56:47 AM)

> *“, which owes its superior performance to a combination of memory cells and gating mechanisms that maintain and nonlinearly mix information over time.”* (p. 1)

> *“4 Characteristics of the LMU Linear-Nonlinear Processing Linear units maximize the information capacity of dynamical systems, while nonlinearities are required to compute useful functions across this information [19]. The LMU formalizes this linear-nonlinear trade-off by decoupling the functional role of d linear memory units from that of n nonlinear hidden units, and then using backpropagation to learn their coupling. Parameter-State Trade-offs One can increase d to improve the linear memory (m) capacity at the cost of a linear increase in the size of the encoding parameters, or, increase n to improve the complexity of nonlinear interactions with the memory (h) at the expense of a quadratic increase in the size of the recurrent kernels. Thus, d and n can be set independently to trade storage for parameters while balancing linear memory capacity with hidden nonlinear processing. Optimality and Uniqueness The memory cell is optimal in the sense of being derived from the Padé [30] approximants of the delay line expanded about the zeroth frequency [38]. These approximants have been proven optimal for this purpose. Moreover, the phase space of the memory maps onto the unique set of orthogonal polynomials over [0, θ] (the shifted Legendre polynomials) up to a constant scaling factor [24]. Thus the LMU is provably optimal with respect to its continuoustime memory capacity, which provides a nontrivial starting point for backpropagation. To validate this characteristic, we reran the psMNIST benchmark with the diagonals of ̄ A perturbed by ∈ {−0.01, −0.001, 0.001, 0.01}. Despite retraining the network for each , this achieved sub-optimal test performance in each case, and resulted in chance-level performance for larger | |.”* (p. 6)