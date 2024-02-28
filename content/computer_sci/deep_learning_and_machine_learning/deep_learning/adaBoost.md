---
title: AdaBoost
tags:
- deep-learning
- ensemble-learning
---

# Video you need to watch first

* [AdaBoost, Clearly Explained](https://www.youtube.com/watch?v=LsK-xG1cLYA)

# Key words and equation

- **Stump(树桩) means classification just by one feature**
- Amount of say

$$
\text{Amout of say} = \frac{1}{2}\log{(\frac{1-\text{Total Error}}{\text{Total Error}})}
$$

- Wrong Classified Sample New Weight

$$
\text{New Sample Weight} = \text{Sample Weight}\times e^{\text{amount of say}}
$$

- Correct Clasified Sample New Weight

$$
\text{New Sample Weight} = \text{Sample Weight}\times e^{-\text{amount of say}}
$$

- After reassing sample weight, do bootstrap sample based on their new weight, it will select big weight sample lots of times to adjust next model
- In last prediction, the **amount of say** decide which results we will pick.

# Question

- **[why decision stumps instead of trees?](https://stats.stackexchange.com/questions/520667/adaboost-why-decision-stumps-instead-of-trees)**