---
title: Markov Chain
tags:
  - math
  - stochastic-process
date: 2024-06-25
---

# What's Markov Chain

A Markov chain or Markov process is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.


# Transition Matrix

Transition Matrix is also called stochastic matrix. It describes a Markov chain $X_t$ over a finite state space $S$ with cardinality $\alpha$

If the probability of moving from $i$ to $j$ in one time step is $P(j|i) = P_{i,j}$, the stochastic matrix $P$ is given by using $P_{i,j}$ as the $i$-th row and $j$-th column element, e.g.,

$$
P = \begin{bmatrix}
P_{1,1} & P_{1,2} & \cdots & P_{1,\alpha} \\
P_{2,1} & P_{2,2} & \cdots & P_{2,\alpha} \\
\vdots & \vdots & \ddots & \vdots \\
P_{\alpha,1} & P_{\alpha,2} & \cdots & P_{\alpha,\alpha}
\end{bmatrix}
$$
Since the total of transition probability from a state $i$ to all other states must be 1, so,

$$
\sum_{j=1}^{\alpha} P_{i,j} = 1
$$

# Example

An RPG with a 33% blitz rate. But if the first two times you don't blitz, the third time you're bound to blitz. So what is the actual hit rate?

![](math/Statistics/stochastic_process/attachments/6fd1795d98c9031bc791909a8d098e25.jpg)

Simulation Code:

```python
import numpy as np
import random
from rich.progress import track


def active():
    x = random.randint(0, 2)
    if x == 0:
        return 1
    else:
        return 0


if __name__ == '__main__':
    
    record_list = []
    count = 0
    
    for i in track(range(int(10e6)), description="Simulating..."):
        
        if count == 2:
            record_list.append(1)
            count = 0
            
        else:
        
            if not active():
                record_list.append(0)
                count += 1
            else:
                record_list.append(1)
                count = 0
                
    countActive = record_list.count(1)
    countInactive = record_list.count(0)
    
    probility = countActive / (countActive + countInactive)
    
    print(f"Probability of being active: {probility}")
```
# Reference

* https://www.stat.auckland.ac.nz/~fewster/325/notes/ch8.pdf
* https://www.youtube.com/watch?v=cP3c2PJ4UHg