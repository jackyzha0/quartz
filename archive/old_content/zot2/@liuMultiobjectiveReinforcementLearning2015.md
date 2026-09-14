# Multiobjective Reinforcement Learning: A Comprehensive Overview
VALUE:name}
![[liuMultiobjectiveReinforcementLearning2015-zotero#Metadata]]

Other files:
* Mdnotes File Name: [[50 Reading/zot2/@liuMultiobjectiveReinforcementLearning2015]]
* Metadata File Name: [[liuMultiobjectiveReinforcementLearning2015-zotero]]

##  Zotero links
* [Local library](zotero://select/items/1_5WZ9GWUT)
* [Cloud library](http://zotero.org/users/7075634/items/5WZ9GWUT)

# Notes
# Background
## multiobjective reinforcement learning (MORL)
[[Pareto Optimality]]


## Markov decision process (MDP)
> pulling from [[liuMultiobjectiveReinforcementLearning2015-zotero]]

an MDP which is defined as a 4-tuple {S, A, R, P}. 
In this 4-tuple, 
S is the state space of a finite set of states, 
A is the action space of a finite set of actions, 
R is the reward function and 
P is the matrix of state transition probability.

After a state transition from state s to state s’ when taking action a, 
p(s, a, s′) and r(s, a, s′) represent the probability and the reward of the state transition, respectively. 

An **action policy** of the MDP is defined as a function
π : S→Pr(A), where Pr(A) is a probability distribution in A.

Due to the different influences of future rewards on the present value, 
there are **two different objective functions of an MDP**. 

### **discounted reward criteria**, 
which is to estimate the optimal policy $\pi^{*}$ satisfying the following equation:
$$J_{\pi^{*}}=\max _{\pi} J_{\pi}=\max _{\pi} E_{\pi}\left[\sum_{t=0}^{\infty} \gamma^{t} r_{t}\right]$$where 
- $\gamma(1>\gamma>0)$ is the [[discount factor]] and 
- $r_{t}=r\left(x_{t}, a_{t}\right)$ is the reward at time step $t$,
- $E_{\pi}[\cdot]$ stands for the expectation with respect to the policy $\pi$ and the probability matrix $P$, and 
- $J_{\pi}$ is the expected total reward. 

### average reward criteria
The other one is called the **average reward criteria**, 
which is to estimate the optimal policy $\pi^{*}$ satisfying the following equation:
$$
\rho_{\pi^{*}}=\max _{\pi} \rho_{\pi}=\max _{\pi}\left\{\lim _{n \rightarrow \infty} \frac{1}{n} \sum_{t=0}^{n-1} E_{\pi}\left[r_{t}\right]\right\}
$$
where $\rho_{\pi}$ is the average reward per time step for the policy $\pi$.

-
----
# Extracted Annotations
For the discounted reward criteria, the state value function and the state-action value function for a policy $\pi$ are defined by
$$
\begin{gathered}
V^{\pi}(s)=E_{\pi}\left[\sum_{t=0}^{\infty} \gamma^{t} r_{t} \mid s_{0}=s\right] \\
Q^{\pi}(s, a)=E_{\pi}\left[\sum_{t=0}^{\infty} \gamma^{t} r_{t} \mid s_{0}=s, a_{0}=a\right] .
\end{gathered}
$$
….more here that I’m skipping at the moment


## Basic RL algos
where α is the learning rate parameter, and r is the immediate reward.
### Q-Learning Algorithm
Algorithm 1 Q-Learning Algorithm [4], [6] 
\\N: The maximum number of episodes 
1: Initialize Q(s, a) arbitrarily; 
2: repeat (for each episode i) 
3: Initialize s; 
4: repeat (for each step of episode) 
5: Choose a from s using policy derived from Q(s, a); 
6: Take action a, observe r, s′; 
7: Q(s, a) ← Q(s, a) + α[r + γ max a′ Q(s′, a′) − Q(s, a)]; 
8: s ← s′; 
9: until s is terminal 
10: until i = N

If in the limit the Q values of all admissible state-action pairs are updated infinitely often, and α decays in a way satisfying the usual stochastic approximation conditions, then the Q values will converge to the optimal value Q* with probability 1 [20].

For the [[SARSA Algorithm]], if each action is executed infinitely often in every state that is visited infinitely often, the action is greedy with respect to the current Q value in the limit, and the learning rate decays appropriately, then the estimated Q values will also converge to the optimal value Q* with probability 1 [21].

### R-Learning Algorithm 
Algorithm 2 R-Learning Algorithm [4], [22] 
\\ρ: The average reward 
\\N: The maximum number of episodes 
1: Initialize Q(s, a) and ρ arbitrarily; 
2: repeat (for each episode i) 
3: s ← current state; 
4: Select a from s using policy derived from Q(s, a); 
5: Take action a, observe r, s′; 
6: Q(s, a) ← Q(s, a) + α[r − ρ + γ maxa′ Q(s′, a′)− Q(s, a)]; 
7: if Q(s, a) = maxa Q(s, a) then 8: ρ ← ρ + β[r − ρ + maxa′ Q(s′, a′) − maxa Q(s, a)]; 9: end if 10: until i = N

For the average reward criteria, 
R-learning [22]is themost widely studied RL algorithm based on TD. 
The major steps of the R-learning algorithm are illustrated in Algorithm 2

## multiobjective optimization (MOO)
The MOO problem can be formulated as follows [23], [24]:
$$
\begin{aligned}
\max & F(X)=\left[f_{1}(X), f_{2}(X), \ldots, f_{m_{f}}(X)\right] \\
\text { s.t. } g_{i}(X) \leq 0, i=1, \ldots, m_{g}
\end{aligned}
$$
where 
- the "max" operator for a vector is defined either in the sense of [[Pareto Optimality|Pareto]] optimality or in the sense of maximizing a weighted scalar of all the elements, 
- $X=\left[x_{1}, x_{2}, \ldots x_{N}\right]^{T} \in R^{N}$ is the vector of variables to be optimized, 
- $g_{i}(X)$ $\left(i=1,2, \ldots, m_{g}\right)$ are the constraint functions of this problem, and 
- $f_{i}(X)\left(i=1,2, \ldots, m_{f}\right)$ are the objective functions.

**The optimal solutions of an MOO problem can be described by two concepts:**
1. the concept of multiobjective to single objective,  
	- in which a synthetic objective function is derived, 
	- and the optimal solution of this MOO problem can be obtained by solving a SOO (Single OO) problem.

2. the concept of **Pareto dominance** and **Pareto front** [25].  ^s5eqm6
	- When a solution A is better than another solution C for at least one objective, 
	- and A is also superior or at least equal to C for all the other objectives, 
	- the solution A is said to dominate C. 
	- In MOO, it is preferable to find all the dominating solutions instead of the dominated ones [25]
	- ![[Pasted image 20220506175030.png|400]]
	- In the case of mf = 2, as shown in Fig. 2(a), solution C is dominated by A and B, and it is hard to compare the overall performance between A and B.
	- the Pareto front can be generated by deleting all the dominated solutions from the set of all possible solutions [25]
	- From Fig. 2(b), it can be seen that the Pareto front is the set of all the black points, and the solutions corresponding to the gray points are dominated by at least one element of the Pareto front. 
	- Since it is difficult to obtain the complete Pareto front for any real-world MOO problem, a simplified way for MOO is to find a set of solutions that approximates the real Pareto front [26].

# MORL Problem (Multi-Objective RL)

OK pausing / this does no tspark joy, so moving to another paper
