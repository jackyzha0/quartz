

# Human-level control through deep reinforcement learning
Read:: 
- [ ] Human-level control through deep reinforcement learning V. Mnih, K. Kavukcuoglu, D. Silver, A.A. Rusu, J. Veness, M.G. Bellemare, A. Graves, M. Riedmiller, A.K. Fidjeland, G. Ostrovski, S. Petersen, C. Beattie, A. Sadik, I. Antonoglou, H. King, D. Kumaran, D. Wierstra, S. Legg, D. Hassabis 2015 🛫 2023-02-23 #reading #citation
Print::  ❌

Zotero Link:: [Human-level control through deep reinforcement learning - 13.05.22.md](zotero://open-pdf/library/items/4TUELFJJ); [Mnih et al_2015_Human-level control through deep reinforcement learning.pdf](zotero://open-pdf/library/items/MMLN3FB9); [Snapshot](zotero://open-pdf/library/items/9QEKXZTG)
Zotero Link:: NA
PDF:: NA
Files:: [Human-level control through deep reinforcement learning - 13.05.22.md](file:///C:%5CUsers%5Cmichaelt%5CInsync%5Cm@tarlton.info%5CGoogle%20Drive%5C06.%20Zotero%5Cstorage%5C4TUELFJJ%5CHuman-level%20control%20through%20deep%20reinforcement%20learning%20-%2013.05.22.md); [Mnih et al_2015_Human-level control through deep reinforcement learning.pdf](file:///C:%5CUsers%5Cmichaelt%5CInsync%5Cm@tarlton.info%5CGoogle%20Drive%5C06.%20Zotero%5Cstorage%5CMMLN3FB9%5CMnih%20et%20al_2015_Human-level%20control%20through%20deep%20reinforcement%20learning.pdf); [Snapshot](file:///C:%5CUsers%5Cmichaelt%5CInsync%5Cm@tarlton.info%5CGoogle%20Drive%5C06.%20Zotero%5Cstorage%5C9QEKXZTG%5Cnature14236.html)
Reading Note:: [[V. Mnih, K. Kavukcuoglu, D. Silver, A.A. Rusu, J. Veness, M.G. Bellemare, A. Graves, M. Riedmiller, A.K. Fidjeland, G. Ostrovski, S. Petersen, C. Beattie, A. Sadik, I. Antonoglou, H. King, D. Kumaran, D. Wierstra, S. Legg, D. Hassabis (2015)]]
Web Rip:: 

```dataview
TABLE without id
file.link as "Related Files",
title as "Title",
type as "type"
FROM "" AND -"ZZ. planning"
WHERE citekey = "mnihHumanlevelControlDeep2015" 
SORT file.cday DESC
```


> [!Excerpt] Abstract
> An artificial agent is developed that learns to play a diverse range of classic Atari 2600 computer games directly from sensory experience, achieving a performance comparable to that of an expert human player; this work paves the way to building general-purpose learning algorithms that bridge the divide between perception and action.


# Quick Reference

# Top Comments

Let's say grey is for overall comments

# Tasks

# Topics
"Keyword" prioritized sweeping’30 (p. 532) 

# Further Reading 
- [ ] O’Neill, J., Pleydell-Bouverie, B., Dupret, D. & Csicsvari, J. Play it again: reactivation of waking experience and memory. Trends Neurosci. 33, 220–229 (2010). (p. 533)  #rd #p5 🛫 <% tp.date.now("YYYY-MM-DD") %> 

--
# Extracted Annotations and Comments
Notably, the successful integration of reinforcement learning with deep network architectures was critically dependent on our incorporation of a replay algorithm21–23 involving the storage and representation of recently experienced transitions. Convergent evidence suggests that the hippocampus may support the physical realization of such a process in the mammalian brain, with the timecompressed reactivation of recently experienced trajectories during offline periods21,22 (for example, waking rest) providing a putative mechanism by which value functions may be efficiently updated through interactions with the basal ganglia22. In the future, it will be important to explore the potential use of biasing the content of experience replay towards salient events, a phenomenon that characterizes empirically observed hippocampal replay29, and relates to the notion of ‘prioritized sweeping’30 in reinforcement learning. (p. 532) 
METHODS (p. 534) 
Preprocessing. Working directly with raw Atari 2600 frames, which are 210 3 160 pixel images with a 128-colour palette, can be demanding in terms of computation and memory requirements. We apply a basic preprocessing step aimed at reducing the input dimensionality and dealing with some artefacts of the Atari 2600 emulator. First, to encode a single frame we take the maximum value for each pixel colour value over the frame being encoded and the previous frame. This was necessary to remove flickering that is present in games where some objects appear only in even frames while other objects appear only in odd frames, an artefact caused by the limited number of sprites Atari 2600 can display at once. Second, we then extract the Y channel, also known as luminance, from the RGB frame and rescale it to 84 3 84. The function w from algorithm 1 described below applies this preprocessing to the m most recent frames and stacks them to produce the input to the Q-function, in which m 5 4, although the algorithm is robust to different values of m (for example, 3 or 5). (p. 534) 
Code availability. The source code can be accessed at https://sites.google.com/a/ deepmind.com/dqn for non-commercial uses only. (p. 534) 
Model architecture. There are several possible ways of parameterizing Q using a neural network. Because Q maps history–action pairs to scalar estimates of their Q-value, the history and the action have been used as inputs to the neural network by some previous approaches24,26. The main drawback of this type of architecture is that a separate forward pass is required to compute the Q-value of each action, resulting in a cost that scales linearly with the number of actions. We instead use an architecture in which there is a separate output unit for each possible action, and only the state representation is an input to the neural network. The outputs correspond to the predicted Q-values of the individual actions for the input state. The main advantage of this type of architecture is the ability to compute Q-values for all possible actions in a given state with only a single forward pass through the network. (p. 534) 
The exact architecture, shown schematically in Fig. 1, is as follows. The input to the neural network consists of an 84 3 84 3 4 image produced by the preprocessing map w. The first hidden layer convolves 32 filters of 8 3 8 with stride 4 with the input image and applies a rectifier nonlinearity31,32. The second hidden layer convolves 64 filters of 4 3 4 with stride 2, again followed by a rectifier nonlinearity. This is followed by a third convolutional layer that convolves 64 filters of 3 3 3 with stride 1 followed by a rectifier. The final hidden layer is fully-connected and consists of 512 rectifier units. The output layer is a fully-connected linear layer with a single output for each valid action. The number of valid actions varied between 4 and 18 on the games we considered. (p. 534) 

# Figures
Figure 1.**  

![[mnihHumanlevelControlDeep2015_ARC9H2T4.png]] (p. 530)