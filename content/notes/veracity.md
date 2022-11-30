---
title: "Blockchain Project"
aliases: 
tags: 
---
# Abstract
Blockchain technology falls into two distinct classes: open (permissionless) blockchains such as those underlying bitcoin, Ethereum and Cardano; and closed (permissioned) blockchains such as implemented in the Hyperledger Fabric project. To motivate decentralised participation, open blockchains (presently) require an associated cryptocurrency, which can be a risky distraction. However, closed blockchains are considered by some to be insufficiently decentralised.This summer project aims to prototype a compromise: a closed blockchain system that encodes voting rules about self-governance, so that closed blockchain technology can be used in a more open manner. Experience in programming blockchain systems is not assumed. Depending on the student involved, the project will balance work between design and modelling of the blockchain governance rules, and implementation of such a rule set over an existing closed blockchain system.

# Questions	
[answered-questions](notes/answered-questions.md)

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
- [ ] What happens if a participant is caught being untruthful? 
	- Can they be automatically kicked out or is a vote required? 
	- How can we distinguish between mistakes and intentional deceit?
		- Maybe a reputation system. This way one mistake is not fatal, and a reputation can be restored over time
- [ ] Should the central/initiating groups retain higher privileges even after other participants have joined?
- [ ] Even if a farm says they didn't use some chemical, how does the blockchain verify that. Does someone need to go and physically audit them?
	- Can the group, as a DAO almost, collectively employ someone to do this?
	- I guess that still wouldn't stop the participant being audited from bribing them or something.
- Why is block size significant?
- What is Sharding?

# Notes
- [think-writing/log](notes/think-writing.md)
- [veracity-chain](notes/veracity-chain.md)
- [reading-papers](notes/reading-papers.md)
- [blockchain-terms](notes/blockchain-terms.md)

[412-lectures](notes/412-lectures.md), [hyperledger-fabric](notes/hyperledger-fabric.md), [governance](notes/governance.md) , [decentralized-autonomous-organization](notes/decentralized-autonomous-organization.md), [DeFi](notes/DeFi.md), [dApps](notes/dApps.md), [sybil-problem](notes/sybil-problem.md), [smart-contracts](smart-contracts.md), [transaction-finality](transaction-finality.md), [consensus](notes/consensus.md), [CPR-governance](notes/CPR-governance.md), [eth-governance](notes/eth-governance.md), [food-manufacturing](notes/food-manufacturing.md), [bitcoin-governance](notes/bitcoin-governance.md)

# Reading

## Blockchain Papers
**Very good**
- [[a systematic literature review on blockchain governance]]
- [[A novel framework for policy based on-chain governance of blockchain networks]]
- [[Application of Blockchain and Internet of Things to Ensure Tamper-Proof Data Availability for Food Safety]]

**Good**
- [[Permissionless and Permissioned, Technology-Focused and Business Needs-Driven — Understanding the Hybrid Opportunity in Blockchain Through a Case Study of Insolar]]
- [[Fork-free hybrid consensus with flexible Proof-of-Activity]]
- [[zkCrowd — A Hybrid Blockchain-Based Crowdsourcing Platform]]
- [[Toward an Interoperability Architecture for Blockchain Autonomous Systems]]
- [[Blockchain Technology and Decentralized Governance – Is the State Still Necessary]]
- [[Blockchain Based Wine Supply Chain Traceability System]]
- [[A renewable energy microgrids trading management platform based on permissioned blockchain]]
- [[Governance in the Blockchain Economy — A Framework and Research Agenda]]
- [[Enhanced immutability of permissioned blockchain networks by tethering provenance with a public blockchain network]]
- [[A review on blockchain governance]]
- [[research-on-the-reciprocal-mechanism-of-hybrid-governance-in-blockchain]]
- [[Now the Code Runs Itself — On-Chain and Off- Chain Governance-of- Blockchain Technologies]]
- [[Decision Problems in Blockchain Governance — Old Wine in New Bottles or Walking in Someone Elses Shoes]]

**Papers to read**
- DOI:[10.2139/ssrn.2811995](http://dx.doi.org/10.2139/ssrn.2811995) Disrupting Governance: The New Institutional Economics of Distributed Ledger Technology
- https://doi.org/10.1080/10580530.2020.1720046 Defining Blockchain Governance: A Framework for Analysis and Comparison
- https://tezos.com/whitepaper.pdf
- https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_02A-2_Zhang_paper.pdf A Treasury System for Cryptocurrencies: Enabling Better Collaborative Intelligence
	- Quadratic voting
- https://ieeexplore.ieee.org/document/8818409 # A Full-Spectrum Blockchain-as-a-Service for Business Collaboration
- [systematic review Related papers](notes/a%20systematic%20literature%20review%20on%20blockchain%20governance.md#Related)
- https://doi.org/10.1177/0170840606067250 # Neither Market nor Hierarchy nor Network: The Emergence of Bazaar Governance

From search
- allintitle:(public) (permissioned) (blockchain OR DLT OR "distributed ledger technology")
-  (https://www.igi-global.com/article/designing-the-architecture-of-a-blockchain-platform/259370)
- New permissioned public blockchain based on master-sub chain architecture (http://www.joca.cn/EN/10.11772/j.issn.1001-9081.2021101790)
-  Permissioned public blockchain with high performance (https://journal.szu.edu.cn/en/oa/darticle.aspx?type=view&id=202003003)
-  https://www.researchgate.net/profile/Suna-Kyun/publication/359728024_Design_and_Validation_of_Tertiary_General_Education_System_based_on_Public_Permissioned_Blockchain_and_Smart_Contract/links/624ba62f5e2f8c7a035bb5a0/Design-and-Validation-of-Tertiary-General-Education-System-based-on-Public-Permissioned-Blockchain-and-Smart-Contract.pdf
- [[LACChain Framework for Permissioned Public Blockchain Networks – From Blockchain Technology to Blockchain Networks]]
- https://policycommons.net/artifacts/2437174/gas-distribution-protocol-for-permissioned-public-ethereum-based-blockchain-networks/3458762/

**Other maybe relevant Papers**
- https://www.multichain.com/download/MultiChain-White-Paper.pdf

## Blockchain Articles
**Read**
- ISO Technical Committees. Blockchain and distributed ledger technologies. ISO TC307 WG5 TS23635 
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
- https://medium.com/cryptoapis/utxo-and-account-based-blockchains-d1d3c638524
- https://medium.com/crypto-24-7/bitcoin-is-finished-863e5370150
- https://www.hyperledger.org/blog/2017/09/06/abcs-of-open-governance
- https://www2.deloitte.com/us/en/insights/focus/signals-for-strategists/emergence-of-blockchain-consortia.html

**Might Read**
- https://stakingfac.medium.com/what-is-nominated-proof-of-stake-889fc22bef8f
- https://en.wikipedia.org/wiki/Futarchy
- https://pluralistic.net/2022/02/14/externalities/#dshr
- https://www.apc.org/en/pubs/network-infrastructures-commons-model-local-participation-governance-and-sustainability
- https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/Home
- substrate based blockchains

**Blockchain Projects**
- https://ethereum.org/en/governance/
- https://docs.decred.org/governance/overview/
- https://time.com/6142810/proof-of-humanity/
- https://alastria.io/en/what-is-alastria/
- https://www.lacchain.net
- https://swarm.city
	- https://whitepaper.io/document/140/swarm-whitepaper
- https://internetcomputer.org/what-is-the-ic
- https://polymesh.network/permissioned-blockchain
	- https://polymath.network/polymesh-whitepaper
	- [[polymesh]]
- kosama
- edgeware
- Polkadot

## Other Reading
- https://docs.docker.com/config/containers/container-networking/
- http://nzfoodmanufacturer.co.nz/alibaba-blockchain-technology-drive-food-safety-quality/
- https://collegegrad.com/industries/food-manufacturing