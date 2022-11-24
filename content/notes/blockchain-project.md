---
title: "Blockchain Project"
aliases: 
tags: 
---
# Abstract
Blockchain technology falls into two distinct classes: open (permissionless) blockchains such as those underlying bitcoin, Ethereum and Cardano; and closed (permissioned) blockchains such as implemented in the Hyperledger Fabric project. To motivate decentralised participation, open blockchains (presently) require an associated cryptocurrency, which can be a risky distraction. However, closed blockchains are considered by some to be insufficiently decentralised.This summer project aims to prototype a compromise: a closed blockchain system that encodes voting rules about self-governance, so that closed blockchain technology can be used in a more open manner. Experience in programming blockchain systems is not assumed. Depending on the student involved, the project will balance work between design and modelling of the blockchain governance rules, and implementation of such a rule set over an existing closed blockchain system.

# Questions	
[answered-questions](notes/answered-questions.md)

- [ ] Is the code developed by the central authority or spread across partipants?
	- I think the initiating authority is in charge of developing the inital system. (either they do it internally or contract a software company to do it for them)
	- Maybe they can partner with others to initiate it
	- It is then maintained by the participants
- [ ] How is on-chain governance implemented?
	- Smart contracts?
- [ ] Do we need to track the products physically?
	- e.g., using IoT devices
- [ ] Who will be participating in the blockchain?
	- Three major parties in food supply-chain: Market, Manufacturing, Agriculture
	- Do I need to define this in more detail?
- [ ] What are they voting on?
	- Seems like a very dumb question. I guess a lot of things. But I'm not sure so I'll add it here
- [ ] What do the governance rules need to accomplish?
	- Shouldn't the system just work?
	- Very broad question
	- Maybe:
		- Maintenance/Development of the codebase (PIP/EIP?)
		- Inviting/banning participants
		- Conducting phsysical audits?
- [ ] Need to consider applications of decentralized identity technology
- [ ] What happens if a participant is caught being untruthful? 
	- Can they be automatically kicked out or is a vote required? 
	- How can we distinguish between mistakes and intentional deceit?
		- Maybe a reputation system. This way one mistake is not fatal, and a reputation can be restored over time
- [ ] Should the central/initiating groups retain higher privileges even after other participants have joined?
- [ ] Even if a farm says they didn't use some chemical, how does the blockchain verify that. Does someone need to go and physically audit them?
	- Can the group, as a DAO almost, collectively employ someone to do this?
	- I guess that still wouldn't stop the participant being audited from bribing them or something.

# Notes
- [think-writing/log](notes/think-writing.md)
- [veracity-governance](notes/veracity-governance.md)
- [reading-papers](notes/reading-papers.md)
- 

- [412-lectures](notes/412-lectures.md)
- [hyperledger-fabric](notes/hyperledger-fabric.md)
- [governance](notes/governance.md) 
- [decentralized-autonomous-organization](notes/decentralized-autonomous-organization.md)
- [DeFi](notes/DeFi.md)
- [dApps](notes/dApps.md)
- [sybil-problem](notes/sybil-problem.md)
- [smart-contracts](smart-contracts.md)
- [transaction-finality](transaction-finality.md)
- [consensus](notes/consensus.md)
- [CPR-governance](notes/CPR-governance.md)
- [eth-governance](notes/eth-governance.md)
- [food-manufacturing](notes/food-manufacturing.md)
- [bitcoin-governance](notes/bitcoin-governance.md)]

# Reading
## Blockchain Articles
**Read
- https://101blockchains.com/blockchain-governance/
- https://coopahtroopa.mirror.xyz/_EDyn4cs9tDoOxNGZLfKL7JjLo5rGkkEfRa_a-6VEWw
- https://101blockchains.com/permissioned-blockchain/
- http://eyler.freeservers.com/JeffPers/jefpco55.htm?ref=hackernoon.com
- https://en.wikipedia.org/wiki/Cyberocracy
- https://en.wikipedia.org/wiki/Government_by_algorithm
- https://medium.com/@Vlad_Zamfir/against-on-chain-governance-a4ceacd040ca
- https://medium.com/@FEhrsam/blockchain-governance-programming-our-future-c3bfe30f2d74
- https://vitalik.ca/general/2017/12/17/voting.html
- https://bitcoin.org/bitcoin.pdf
- https://medium.com/@WayneVaughan/open-vs-closed-blockchains-let-s-end-this-madness-8313e4095ead
- https://medium.com/good-audience/blockchain-governance-101-eea5201d7992
- https://www.ibm.com/blockchain-supply-chain
- https://www.hyperledger.org/wp-content/uploads/2018/08/HL_Whitepaper_IntroductiontoHyperledger.pdf
- https://www.mobycrypt.com/do-we-need-closed-blockchains/
- https://developer.oracle.com/learn/technical-articles/permissioned-blockchain
- https://medium.com/wavesprotocol/what-closed-blockchain-is-for-190534b5951
- https://www.investopedia.com/news/public-private-permissioned-blockchains-compared/
- https://www.forbes.com/sites/forbestechcouncil/2019/06/11/public-vs-private-permissioned-ledgers-and-blockchain-standards/?sh=39aaa258550b
- https://www.linkedin.com/pulse/public-permissioned-blockchains-common-pool-resources-jesus-ruiz/
- https://smithandcrown.com/glossary/transaction-finality-probabilisticdeterministic/
- https://www.r3.com/blog/how-public-permissioned-blockchains-are-not-an-oxymoron-2/
- https://blog.dshr.org/2022/02/ee380-talk.html
- https://ethereum.org/669c9e2e2027310b6b3cdce6e1c52962/Ethereum_Whitepaper_-_Buterin_2014.pdf
- https://www.investopedia.com/terms/b/blockchainasaservice-baas.asp
- https://nodes.com/#blockchain-nodes-types
- https://ethereum.org/en/governance/

**To Read
- https://en.wikipedia.org/wiki/Futarchy
- https://pluralistic.net/2022/02/14/externalities/#dshr
- https://www.apc.org/en/pubs/network-infrastructures-commons-model-local-participation-governance-and-sustainability
- https://alastria.io/en/what-is-alastria/
- https://www.lacchain.net
- https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/Home
- https://time.com/6142810/proof-of-humanity/

## Blockchain Papers
**Very good

**Good
- H. M. Kim, H. Turesson, M. Laskowski and A. F. Bahreini, "Permissionless and Permissioned, Technology-Focused and Business Needs-Driven: Understanding the Hybrid Opportunity in Blockchain Through a Case Study of Insolar," in IEEE Transactions on Engineering Management, vol. 69, no. 3, pp. 776-791, June 2022, doi: 10.1109/TEM.2020.3003565.
- https://doi.org/10.1016/j.future.2019.02.059 Fork-free hybrid consensus with flexible Proof-of-Activity
- Digital Object Identifier 10.1109/TII.2019.2941735 zkCrowd: A Hybrid Blockchain-Based Crowdsourcing Platform
- https://dx.doi.org/10.1109/TEM.2019.2920154
- https://dx.doi.org/10.2139/ssrn.2709713 # Blockchain Technology and Decentralized Governance: Is the State Still Necessary?
- https://www.researchgate.net/publication/321474197_Blockchain_Based_Wine_Supply_Chain_Traceability_System
- https://doi.org/10.1016/j.eneco.2022.106375 A renewable energy microgrids trading management platform based on permissioned blockchain

**Not good
- 

**Papers to read
- https://doi.org/10.1016/j.ipm.2021.102556 # A novel framework for policy based on-chain governance of blockchain networks
	- 
- DOI:[10.2139/ssrn.2811995](http://dx.doi.org/10.2139/ssrn.2811995) Disrupting Governance: The New Institutional Economics of Distributed Ledger Technology
- 

**Other maybe relevant Papers
- https://www.multichain.com/download/MultiChain-White-Paper.pdf

## Other
- https://docs.docker.com/config/containers/container-networking/
- http://nzfoodmanufacturer.co.nz/alibaba-blockchain-technology-drive-food-safety-quality/
- https://collegegrad.com/industries/food-manufacturing

# Sources