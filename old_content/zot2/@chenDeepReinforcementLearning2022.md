

# Deep Reinforcement Learning with Spiking Q-learning

> [!Excerpt] Abstract
> Read::  ✅ Deep Reinforcement Learning with Spiking Q-learning D. Chen, P. Peng, T. Huang, Y. Tian 2022  #reading #citation

Print::  ❌

Zotero Link:: [@chenDeepReinforcementLearning2022-MDnotes.md](zotero://open-pdf/library/items/8ZVCYFJU); [arXiv.org Snapshot](zotero://open-pdf/library/items/TKDBAXKR); [Chen et al_2022_Deep Reinforcement Learning with Spiking Q-learning.pdf](zotero://open-pdf/library/items/LU25QILL); [chenDeepReinforcementLearning2022-zotero.md](zotero://open-pdf/library/items/RA8AXZCN)

PDF:: NA

Files:: [@chenDeepReinforcementLearning2022-MDnotes.md](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/@chenDeepReinforcementLearning2022-MDnotes.md); [arXiv.org Snapshot](file:///C:%5CUsers%5Cmichaelt%5CInsync%5Cm@tarlton.info%5CGoogle%20Drive%5C06.%20Zotero%5Cstorage%5CTKDBAXKR%5C2201.html); [Chen et al_2022_Deep Reinforcement Learning with Spiking Q-learning.pdf](file:///C:%5CUsers%5Cmichaelt%5CInsync%5Cm@tarlton.info%5CGoogle%20Drive%5C06.%20Zotero%5Cstorage%5CLU25QILL%5CChen%20et%20al_2022_Deep%20Reinforcement%20Learning%20with%20Spiking%20Q-learning.pdf); [chenDeepReinforcementLearning2022-zotero.md](file:////home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/chenDeepReinforcementLearning2022-zotero.md)
Print::  ✅ 2022-05-19
Zotero Link:: NA
Files:: [@chenDeepReinforcementLearning2022-MDnotes.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/@chenDeepReinforcementLearning2022-MDnotes.md); [arXiv.org Snapshot](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/TKDBAXKR/2201.html); [Chen et al_2022_Deep Reinforcement Learning with Spiking Q-learning.pdf](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/06.%20Zotero/storage/LU25QILL/Chen%20et%20al_2022_Deep%20Reinforcement%20Learning%20with%20Spiking%20Q-learning.pdf); [chenDeepReinforcementLearning2022-zotero.md](file:///home/michaelt/Insync/m@tarlton.info/Google%20Drive/05.%20Obsidian/Obsidian/oslomet/50%20Reading/Zotero%20Papers/chenDeepReinforcementLearning2022-zotero.md)
Reading Note:: [[Chen 2022]]

Web Rip:: 
Reading Topics:: [[Chen 2022 - topics]]
Reading Comments:: [[Chen 2022 - comments]]
Reading Glossary:: [[Chen 2022 - glossary]]

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "chenDeepReinforcementLearning2022" 
SORT file.cday DESC
```

# Abstract
With the help of special neuromorphic hardware, spiking neural networks (SNNs) are expected to realize artificial intelligence with less energy consumption. It provides a promising energy-efficient way for realistic control tasks by combing SNNs and deep reinforcement learning (RL). There are only a few existing SNN-based RL methods at present. Most of them either lack generalization ability or employ Artificial Neural Networks (ANNs) to estimate value function in training. The former needs to tune numerous hyper-parameters for each scenario, and the latter limits the application of different types of RL algorithm and ignores the large energy consumption in training. To develop a robust spike-based RL method, we draw inspiration from non-spiking interneurons found in insects and propose the deep spiking Q-network (DSQN), using the membrane voltage of non-spiking neurons as the representation of Q-value, which can directly learn robust policies from high-dimensional sensory inputs using end-to-end RL. Experiments conducted on 17 Atari games demonstrate the effectiveness of DSQN by outperforming the ANN-based deep Q-network (DQN) in most games. Moreover, the experimental results show superior learning stability and robustness to adversarial attacks of DSQN.

# Quick Reference


# Top Comments

Let's say grey is for overall comments
- Ok so I’m picking back up my reading flow after a long time
- I am using mathpix for the parts I will need to latex in
- See [[Chen 2022 - glossary#Loss function (pg. 3)]] for Loss function and other formulae
- I’m actually not liking this paper very much
- They pretty much just take a basic DQN and add spiking neurons

## Architecture
- They really do not address if the LIF layer feed into the next trad layer
- The way it is organized is that the trad layer and previous SN layer **both** feed into the next SN layer
- So it’s kinda just a tacked on hypernet
- I have no idea (in fact it seems not) if the SN output is fed to the trad layer
## Spike decoding
- Ok so each SN layer actually consists of two parts a “neuronal” and “synaptic” layer, the latter of which is read as Voltage value of the input spikes (?)
- See Figure 2 and section 3.2
- So they aren’t actually communicating on the spike per-se, but instead the membrane voltage
- **Actually this sisn’t totally correct, as the synaptic layer they speak of is the trad layer**
- Really not sure the spike matters at all
	- Except for the reset 
	- In Liu et al 2022 they split this into a soft and hard reset
	- 

# Topics
"Keyword" Reward-based Learning by Three-factor Learning Rules To bridge the gap between the time scales of behavior and neuronal action potential, modern theories of synaptic plasticity assume that the co-activation of presynaptic and postsynaptic neurons sets a flag at the synapse, called eligibility trace these methods are only suitable for shallow SNNs and lowdimensional control tasks. To solve these problems, Bellec et al. [1] propose a learning method for recurrently connected networks of spiking neurons, which is called e-prop. (p. 2) 
"Keyword" spiking actor network (SAN) (p. 2) 
"Keyword" deep critic network (p. 2) 
"Keyword" spikebased backpropagation (BP) algorithm has quickly become the mainstream solution for training multi-layer SNNs [6; 5]. (p. 2) 
"Keyword" deep spiking Q-network (DSQN) (p. 2) 
"Keyword" Non-spiking neurons can be regarded as a special case of spiking neurons. If we set the threshold voltage Vth of spiking neurons to infinity, the dynamics of neurons will always be under the threshold, which is so-called non-spiking neurons. Since non-spiking neurons do not have the dynamics of firing and resetting, we could simplify the neural model to the following equation (see Figure 2): (p. 3) 
"Keyword" Adam optimizer (p. 5) 

# Further Reading 
- [ ] [4] Wei Fang, Yanqi Chen, Jianhao Ding, Ding Chen, Zhaofei Yu, Huihui Zhou, Yonghong Tian, and other contributors. Spikingjelly. https://github.com/ fangwei123456/spikingjelly, 2020. Accessed: 2021-1201. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %>
- [ ] [6] Wei Fang, Zhaofei Yu, Yanqi Chen, Timothee Masquelier, Tiejun Huang, and Yonghong Tian. Incorporating learnable membrane time constant to enhance learning of spiking neural networks. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 2661–2671, 2021. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %>
- [ ] [14] Volodymyr Mnih, Koray Kavukcuoglu, David Silver, Andrei A Rusu, Joel Veness, Marc G Bellemare, Alex Graves, Martin Riedmiller, Andreas K Fidjeland, Georg Ostrovski, et al. Human-level control through deep reinforcement learning. nature, 518(7540):529–533, 2015. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %>
- [ ] [16] Christian Pehle and Jens Egholm Pedersen. Norse - a deep learning library for spiking neural networks, January 2021. Documentation: https://norse.ai/docs/. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %>
- [ ] [19] Weihao Tan, Devdhar Patel, and Robert Kozma. Strategy and benchmark for converting deep q-networks to event-driven spiking neural networks. arXiv preprint arXiv:2009.14456, 2020. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %>
- [ ] [20] Guangzhi Tang, Neelesh Kumar, and Konstantinos P Michmizos. Reinforcement co-learning of deep and spiking neural networks for energy-efficient mapless navigation with neuromorphic hardware. In 2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pages 6090–6097. IEEE, 2020. (p. 7)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %> 

--
# Extracted Annotations and Comments
There are only a few existing SNN-based RL methods at present. (p. 1) 
them either lack generalization ability or employ Artificial Neural Networks (ANNs) to estimate value function in training. (p. 1) 
The former needs to tune numerous hyper-parameters for each scenario, and the latter limits the application of different types of RL algorithm and ignores the large energy consumption in trainin (p. 1) 
deep spiking Q-network (DSQN) (p. 1) 
ents conducted on 17 Atari games demonstrate the effectiveness of DSQN by outperforming the ANN-based deep Q-network (DQN) in most games (p. 1) 
. To overcome the limitations of SNN in solving high-dimensional control problems, it would be natural to combine the energyefficiency of SNN with the optimality of deep RL (p. 1) 
, these methods only apply to shallow SNNs and low-dimensional control tasks, or need to tune numerous hyper-parameters for each scenario [1] (p. 1) 
several methods aim to apply the surrogate gradient method [11] to train SNN in RL (p. 1) 
Since SNN usually uses the firing rate as the equivalent activation value [17] which is a discrete value between 0 and 1, it is hard to represent the value function of RL which doesn’t have a certain range in training. (p. 1) 
several methods [15; 19] aim to convert the trained DQN to SNN for execution. In addition, several methods based on hybrid framework [21; 22] utilize SNN to model policy function (i.e., a probability distribution), and resort ANN to estimate value function for auxiliary training (p. 1) 
, these methods may lose the potential biological plausibility of SNN, and limit the application of different types of RL algorithm (p. 1) 
, it is necessary to develop a spike-based RL method where only SNN is used in both training and execution (p. 1) 
hod where only SNN is used in both training and execution. The key issue is to design a new neuarXiv:2201.09754v1 [cs.NE] 21 Jan 202 (p. 1) 
ral coding method to decode the spike-train into the results of value function, realizing end-to-end spike-based RL (p. 2) 
## SNN receives the state from the environment and encodes them as spike-train by spiking neurons. Then, the non-spiking neurons are subsequently introduced to calculate the membrane voltage from the spiketrain, which is further used to predict the Q-value of each action.The Proposed Model
Finally, the agent selects the action with the maximum Q-value. To take full advantage of the membrane voltage in all simulation time and make the learning stable, we argue that the statistics of membrane voltage rather than the last membrane voltage should be used to represent Q-value. We empirically find that the maximum membrane voltage among all the simulation time can significantly enhance spike-based RL and ensure strong robustness. (p. 2) 
The main contributions of this paper is summarized as follows: 1. A novel spike-based RL method, referred to as deep spiking Q-network (DSQN), is proposed, which could represent Q-value by the membrane voltage of nonspiking neurons. 2. The method achieves end-to-end Q-learning without any additional ANN for auxiliary training, and maintains the high biological plausibility of SNN. 3. The method is evaluated on 17 Atari games, and our results outperform ANN-based DQN on most of the games. Moreover, the experimental results show superior learning stability and robustness to adversarial attacks such as FGSM [9]. (p. 2) 
matching the firing rates of spiking neurons with the graded activation of analog neurons, trained ANNs can be converted into corresponding SNNs with few accuracy loss [17]. (p. 2) 
For the SNNs converted from the ANNs trained by DQN algorithm, the firing rate of spiking neurons in the output layer is proportional to the Q-value of the corresponding action, which makes it possible to select actions according to the relative size of the Q-value [15; 19]. But there is a tradeoff between the accuracy and the efficiency, which tells us that longer inference latency is needed to improve accuracy. As far as we know, for RL tasks, the converted SNNs cannot achieve better results than ANNs (p. 2) 
## 2.3 Co-learning of Hybrid Framework Tang et al. [20] first propose the hybrid framework, composed of a spiking actor network (SAN) and a deep critic network. Through the co-learning of the two networks, these methods [21; 22] avoid the problem of value estimation using SNNs. Hence, these methods only work for actor-critic structure, and the energy consumption in the training process is much higher than the pure SNN methods [10].
## 2.4 Non-spiking Neurons in Spike-based BP Following the surrogate gradient method [11], the spikebased backpropagation (BP) algorithm has quickly become the mainstream solution for training multi-layer SNNs [6; 5]. As shown in several open-source frameworks of SNNs [4; 16], the membrane voltage of non-spiking neurons is feasible to represent a continuous value in a spike-based BP method. However, how to use it to effectively train SNN with Q-learning has not been systematically studied and remains unsolved, which is the goal of this paper.
# 3 Method In this section, we present the deep spiking Q-network (DSQN) in detail. Firstly, we introduce the preliminary of RL, and the spiking neural model and its discrete dynamics are presented subsequently. Then, we propose the nonspiking neurons for DSQN and analyze the neural coding method. Finally, we present the learning algorithm of spikebased RL and derive the detailed learning rule. (p. 2) 
## 3.1 Deep Q-learning The goal of RL algorithm is to train a strategy to maximize the expected cumulative reward in a Markov decision process (MDP). In RL tasks, the agent interacts with the environment through a series of observations (s), actions (a) and rewards (r). The Q-value function Q(s, a) is to estimate the expected
Figure 2**  

! cumulative rewards of performing action a at s. We refer to a neural network function approximator with weights θ as the Q-network, which can be learned by minimizing the meansquared error in the Bellman equation during the training process. (p. 3) 
Therefore, the loss function is defined as follows: (p. 3) 
## 3.2 Spiking Neural Model
Here we consider the Leaky Integrate-andFire (LIF) model [8], which is one of the most common spiking neuron models used in SNNs. (p. 3) 
## 3.3 Non-spiking Neural Model
## 3.4 Neural Coding
According to the definition of SNN, the output is a spiketrain, but the results of value estimation used in RL are continuous values. (p. 3) 
To bridge the difference between these two data forms, we need a spike decoder to complete the data conversion, that is non-spiking neurons. (p. 3) 
In the sensorimotor neuron path, the membrane voltage of non-spiking interneurons determines the input current of motor neurons. Therefore, for different non-spiking neurons, the greater the membrane voltage, the greater the probability of taking the corresponding action, which reminds us of the Q-value function in RL. (p. 3) 
In the whole simulation time T , the non-spiking neurons take the spike-train as the input sequence, and then the membrane voltage Vt at each time-step t can be obtained. To represent the output of value function, we need to choose an optimal statistic according to the membrane voltage at all times. (p. 3) 
In DSQN, all bias parameters are omitted and all weight parameters are shared at all simulation time-steps (p. 4) 
3.6 Training Framework (p. 4) 
Analysis of Decoders We compare the performance of DSQN with different decoders on four games selected in alphabetical order (Table 1). In all of these games, the DSQN with the maximum membrane voltage achieves better performance. Hence we use the maximum membrane voltage in the subsequent experiments. (p. 5) 

# Figures
Fig. 1**  

![[chenDeepReinforcementLearning2022_NXAWWREF.png]] (p. 1)
Fig. 3**  

![[chenDeepReinforcementLearning2022_8CI4FREQ.png]] (p. 4)
Fig. 4**  

![[chenDeepReinforcementLearning2022_MKIF9H4J.png]] (p. 4)
Fig. 5**  

![[chenDeepReinforcementLearning2022_NVVKWJPW.png]] (p. 4)