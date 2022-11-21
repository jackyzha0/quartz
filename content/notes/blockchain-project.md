---
title: "Blockchain Project"
aliases: 
tags: 
- project
---
# Abstract
Blockchain technology falls into two distinct classes: open (permissionless) blockchains such as those underlying bitcoin, Ethereum and Cardano; and closed (permissioned) blockchains such as implemented in the Hyperledger Fabric project. To motivate decentralised participation, open blockchains (presently) require an associated cryptocurrency, which can be a risky distraction. However, closed blockchains are considered by some to be insufficiently decentralised.This summer project aims to prototype a compromise: a closed blockchain system that encodes voting rules about self-governance, so that closed blockchain technology can be used in a more open manner. Experience in programming blockchain systems is not assumed. Depending on the student involved, the project will balance work between design and modelling of the blockchain governance rules, and implementation of such a rule set over an existing closed blockchain system.

# Questions	
- [x] what actually is hyperledger fabric? Is it a closed blockchain that different groups can run independently for their own use-case? Or is it one single closed blockchain that many different groups participate in.
	- hyperledger fabric is one of the projects created by hyperledger. It is a framework/base from which the community can develop their own blockchains.
- [x] is governance within a closed blockchain the same as within an open blockchain
	- no I dont think so.[Governance of open vs closed blockchains](notes/governance.md#Governance%20of%20open%20vs%20closed%20blockchains)
- [ ] why would a participant want to fork?
	- just having the capability is important
	- swtiching authorities?
- [x] does the central authority e.g., govt decide who can join and leave?
	- yes, but is this responsibility restricted only to them? Can other parties approve new participants?
- [ ] It the code developed by the central authority or spread across partipants?
- [x] What are public vs private permissioned blockchains
	- [blockchain-types](notes/blockchain-types.md)
- [ ] do the records remain forever on the chain?

# Notes
- [think-writing](notes/think-writing.md)

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

# Reading
## Blockchain
- https://101blockchains.com/blockchain-governance/
- https://coopahtroopa.mirror.xyz/_EDyn4cs9tDoOxNGZLfKL7JjLo5rGkkEfRa_a-6VEWw
- https://101blockchains.com/permissioned-blockchain/
- http://eyler.freeservers.com/JeffPers/jefpco55.htm?ref=hackernoon.com
- https://en.wikipedia.org/wiki/Cyberocracy
- https://en.wikipedia.org/wiki/Government_by_algorithm
- https://medium.com/@Vlad_Zamfir/against-on-chain-governance-a4ceacd040ca
- https://medium.com/@FEhrsam/blockchain-governance-programming-our-future-c3bfe30f2d74
- https://doi.org/10.1016/j.ipm.2021.102556
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

- https://en.wikipedia.org/wiki/Futarchy
- https://pluralistic.net/2022/02/14/externalities/#dshr
- https://www.apc.org/en/pubs/network-infrastructures-commons-model-local-participation-governance-and-sustainability
- https://alastria.io/en/what-is-alastria/
- https://www.lacchain.net
- https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/Home
- https://time.com/6142810/proof-of-humanity/

- H. M. Kim, H. Turesson, M. Laskowski and A. F. Bahreini, "Permissionless and Permissioned, Technology-Focused and Business Needs-Driven: Understanding the Hybrid Opportunity in Blockchain Through a Case Study of Insolar," in IEEE Transactions on Engineering Management, vol. 69, no. 3, pp. 776-791, June 2022, doi: 10.1109/TEM.2020.3003565.

## Other
- https://docs.docker.com/config/containers/container-networking/

# Sources