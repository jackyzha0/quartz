---
title: "think-writing"
tags: 
---


- [[veracity-week01]]
- [[veracity-week02]]
- [[veracity-week03]]
- [[veracity-week04]]

# 12/12
https://doi.org/10.1109/DTPI52967.2021.9540069 [[Parallel Governance for Decentralized Autonomous Organizations enabled by Blockchain and Smart Contracts]]

trying to call a function of a smart contract. I suspect its not working because the function signature hash is wrong

---

# 13/12
Battled the smart contract all day yesterday. Might take a break from that and try to do something else

who generates the keys for a new node?

what if a node removes itself

Implemented a test to remove a node. 

What about forking. do you remove a group of nodes? 

https://eprints.soton.ac.uk/415083
https://arxiv.org/abs/1910.08547
https://scholar.archive.org/work/uf7vmdzi7na5dazrh2jlhvuhr4/access/wayback/https://www.persistent.com/wp-content/uploads/2017/04/WP-Understanding-Blockchain-Consensus-Models.pdf?pdf=Understanding-Blockchain-Consensus-Models
https://ieeexplore.ieee.org/abstract/document/9947249/

Hyperledger consensus algorithm: https://doi.org/10.48550/arXiv.1809.00554

# 14/12

https://arxiv.org/abs/2102.10006
[[An Overview of Forks and Coordination in Blockchain Development]]

# 15/12

https://www.holochain.org [[holochain]]
https://blockchaingov.eu focused more on the legal side of things

Holochain is interesting. Framework for peer for peer apps. Apps built on holochain connect users devices directly in a p2p network. Data created by each user is digitally signed and stored in their device. The apps defines rules about what valid data looks like. The network of peers makes up the entire Distributed Hash Table (DHT), where each peer has a small, random 'shard' of the DHT. 

How does the blockchain work? How does it achieve consensus? Is it BFT? 

How could we use this for veracity? We could make a holochain app. 

https://doi.org/10.1016/j.icte.2020.09.002
https://doi.org/10.1016/j.techfore.2020.120465

www.kaleido.io: blockchain as a service

meeting
- removing participant
	- security risks (whats stopping them from rejoining)
	- remove permanently vs temporarily
- skeptical of decentralised storage:
	- less protections
	- tradeoff availablility vs confidentiality
- maybe dig into holochain "data rules" used for validation

I need to have a more skeptical mindset.

Why cant we use blockchain as a service (blockstream, kaleido, alchemy, aws, IBM). Is it up to me to look into this and decide if we can rule it out?

https://doi.org/10.1016/j.icte.2020.09.002 # Permissioned blockchain frameworks in the industry: A comparison