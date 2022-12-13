---
title: "consensus"
tags: 

---

> The consensus algorithm takes care of the transaction verification within the network. Different blockchain systems implement different consensus algorithms which can benefit the miners directly or indirectly. Some of the popular consensus algorithms include Proof-of-Work(PoW), Proof-of-Stake(PoS), and so on.
> You can think of it as hierarchical centralization when compared to traditional governance. 
> — https://101blockchains.com/blockchain-governance/

Consensus [^7] should guarantee
- **liveness**: system should never stop and should be able to recover from errors
- **security:** nonfaulty peers should not accept false data
- **convergence** (consistency): all non-faulty peers should maintain or converge to the same global ordering and state


BFT/CFT

Algorithms
- PoW: Bitcoin
- PoS: [[ethereum]]
- [[YAC]]: [[hyperledger#Iroha]]


[^7]: L. Lamport, “Generalized consensus and paxos,” Technical Report MSR-TR-2005-33, Microsoft Research, Tech. Rep., 2005. [Online]. Available: https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2005-33.pdf


# Components
- Peer
- Ordering service
- Client