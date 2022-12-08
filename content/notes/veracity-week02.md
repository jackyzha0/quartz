# 21/11
On friday I tried to get haydens hypderledge iroha code from last year to work [here](https://github.com/hmcalister/SWIPL-Notebook-Blockchain-Filehashing) and [here](https://github.com/hmcalister/Hypderledger-Iroha-Multinode-Demo). I was unable to. Each of the blockchain nodes were running in their containers, but I wasn't able to connect to them from a python script running locally. I need to make a plan for this week. 

- Try to figure out a way to connect to the nodes from a script 
	- Maybe from a fifth container?
- If I am unable to connect to the nodes I might have to start them from scratch
	- This would help me to learn the tools also.
- Try to figure out how the public permissioned blockchain might work in some more detail.

---

# 22/11

Yesterday I got one iroha node running by itself in a docker container and was able to make transactions and queries using a python script. This morning I'll try to get a few nodes to interact together. And In the afternoon I will do some reading about CPRs and governance.

doi: 10.1109/TEM.2020.3003565: Permissionless and Permissioned, Technology-Focused and Business Needs-Driven: Understanding the Hybrid Opportunity in Blockchain Through a Case Study of Insolar. 
- Sidechains? 
- soft vs hard fork
	- soft: different states of the same blochain that coexist and are eventually reconnected
	- hard: a complete separate copy of a blockchain
- How will the blockchain be funded? Maybe I need to consider this.
- Blockchain as a service?
	- https://www.investopedia.com/terms/b/blockchainasaservice-baas.asp
	- amazon managed blockchain
	- microsoft ethereum blockchain-as-a-service
	- r3
	- paystand
	- hyperledger cello
	- [IBM Blockchain Platform](https://www.trustradius.com/products/ibm-blockchain-platform/reviews "IBM Blockchain Platform reviews."), [Oracle Blockchain Cloud](https://www.trustradius.com/products/oracle-blockchain-cloud/reviews "Oracle Blockchain Cloud reviews."), [Azure Blockchain Service](https://www.trustradius.com/products/azure-blockchain-service/reviews "Azure Blockchain Service reviews."), [Alchemy](https://www.trustradius.com/products/alchemy/reviews "Alchemy reviews."), [Infura Ethereum API](https://www.trustradius.com/products/infura-ethereum-api/reviews "Infura Ethereum API reviews."), [Kaleido](https://www.trustradius.com/products/kaleido/reviews "Kaleido reviews."), [Amazon Managed Blockchain](https://www.trustradius.com/products/amazon-managed-blockchain/reviews "Amazon Managed Blockchain reviews."), [Crypto APIs](https://www.trustradius.com/products/crypto-apis/reviews "Crypto APIs reviews."), [VMware Blockchain](https://www.trustradius.com/products/vmware-blockchain/reviews "VMware Blockchain reviews."), and [Cryptomat](https://www.trustradius.com/products/cryptomat/reviews "Cryptomat reviews.").

permissioned blockchain "connected" to permissionless blockchain 

https://ieeexplore.ieee.org/document/8818409 # A Full-Spectrum Blockchain-as-a-Service for Business Collaboration
- https://en.wikipedia.org/wiki/Zero-knowledge_proof
- https://en.wikipedia.org/wiki/Hidden_Markov_model

in a public permissioned blockchain, what is stopping an attacker from registering enough nodes to perform a 51% attack, If we are not using a BFT consensus algorithm?

what type of technology is bitcoin (DOI:[10.2139/ssrn.2811995](http://dx.doi.org/10.2139/ssrn.2811995)) makes the case that bitcoin/blockchain technology is not merely a new general purpose technology but a new institutional technology of governance.


"In an important sense the limits of this new technology are the limits of imagination in the same way that once upon a time it was hard to imagine what use computers could be, or to see what things computers could be applied to, before it eventually became clear that the answer was everything. The same pattern unfolded for the internet, and now everything is on the internet. it is not unreasonable to think this same dynamic will play out with blockchain, which is also made of computers and the internet"
p18 social operating system

p20 stigmergic coordination. governance based on a reputation system. reputation can be gained by either making a value contribution or evaluating someone elses conrtibution that is in line with the organisations value system. agents are judged on their actions and their judgements of others actions

p21
"Blockchain distributed ledger technology is a rare and special general purpose technology because it adds a further category to the suite of Williamson’s (1985) ‘economic institutions of capitalism’—namely, markets, hierarchies and relational contracting—with a new type of economic order: a Decentralized Collaborative Organization.16 A Decentralized Collaborative Organization (DCO) is a selfgoverning organization with the coordination properties of a market, the governance properties of a commons, and the constitutional properties of a nation state. It is an organization, but it is not hierarchical. It has the coordination properties of a market through the token systems that coordinate distributed action, but it is not a market because the predominant activity is production, not exchange. And it has the unanimous constitutional properties of a rule-of-law governed nation state, by complicit agreement of all ‘citizens’ who opt-in to such a DCO, and the automatic execution of the rules of that DCO through smart contract enforcement"

p4
Many enthusiasts simply promote the blockchain as a more efficient, decentralized and consensus-driven public repository, which can have a number of applications in order to make citizens less dependent on governments, yet within a society that is ultimately founded upon the State authority. Techno-libertarians and crypto-anarchists hold instead a more extremist position. They are generally inclined to consider the State as an illegitimate, unnecessary and irremediably obsolete depository of power, and they openly encourage the use of the new information technology as a liberating force against the very concept of authority. According to this view, we are at a stage in history when individuals can gradually overcome any centralized political institution through distributed consensus and create the conditions for an idealistic society of equals, characterized by flat, rather than hierarchical, structures.

^ this method of note taking does not work. I need to engage more with the material I think. I need to have a specific purpose when reading, instead of just looking at vaguely relevant papers/articles

---

# 23/11

- https://doi.org/10.1016/j.eneco.2022.106375 A renewable energy microgrids trading management platform based on permissioned blockchain
	- [blockchain types](https://i.imgur.com/5CDGjeL.png)

- M. Crosby, P. Pattanayak, S. Verma, V. Kalyanaraman **Blockchain technology: beyond bitcoin** (2016)
- https://doi.org/10.1155/2020/5385207 Application of Blockchain and Internet of Things to Ensure Tamper-Proof Data Availability for Food Safety
	- supply chain connect three sectors: agriculture, food-manufacturing, marketing (incl dist).
	- three sources of food: crops livestock, seafood
	- [similarities and differences between different meat and milk production systems](https://i.imgur.com/g1NnYSl.png)
	- food fraud is increasing
	- [blockchain types and techs table](https://i.imgur.com/NcCoxiU.png)'
	- rfid tracking
	- traceability
	- ![flow of products and associated data on the blockchain](https://i.imgur.com/qTuzm4e.png)

- https://doi.org/10.1016/j.tre.2020.102025 Evaluating the factors that influence blockchain adoption in the
freight logistics industry
- [http://www.ijpe-online.com/EN/Y2018/V14/I9/2040](http://www.ijpe-online.com/EN/Y2018/V14/I9/2040) Research and Development of Blockchain Security
- https://dl.acm.org/doi/pdf/10.1145/3190508.3190538 Hyperledger Fabric: A Distributed Operating System for Permissioned Blockchains
- https://www.ibm.com/blogs/blockchain/2018/02/one-nations-move-to-increase-food-safety-with-blockchain/
- https://www.researchgate.net/publication/321474197_Blockchain_Based_Wine_Supply_Chain_Traceability_System
- https://ieeexplore.ieee.org/document/8823910 # Ensure Traceability in European Food Supply Chain by Using a Blockchain System
- http://dx.doi.org/10.21900/iconf.2019.103295 # Processes and challenges for the adoption of blockchain technology in food supply chains: A thematic analysis
- https://nofima.com/publication/1673512/ # Applications, limitations, costs, and benefits related to the use of blockchain technology in the food industry 
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3344839 # Blockchain Meets Genomics: Governance Considerations for Promoting Food Safety and Public Health
- https://ieeexplore.ieee.org/document/8674550 # Blockchain Inspired RFID-Based Information Architecture for Food Supply Chain

I read will some of these later maybe. I think i need to start focusing on "design and modelling of the blockchain governance rules, and implementation of such a rule set over an existing closed blockchain system". Clearly the existing blockchain network is not working yet so I might try to implement that later. I think I should start trying to design some governance rules. 

How are they implemented? Are they like smart contracts? Is it like on-chain governance - how is that implemented? Do I need to know that yet? maybe I could look at some existing blockchains with on-chain governance and see how that works. It would have to be a permissioned blockchain because I think a permissionless blockchain would be radically different. "Encodes voting rules about self governance" — What are they voting on? What are they actually governing?
- Development decisions
- Allowing new participants to join the network

Who are the members that are allowed to vote? Who are the members of the network. 

E.g., three farms producing products want to verify they are organic. There exists a blockchain which was initiated by the government, where they can "join" and upload documents (or pointers to documents – maybe using zero knowledge proof?) which prove they are organic. (Do we need to track the actual products using IoT/RFID/etc). Who else is part of the blockchain? Retailers and Food-manufacturing? Then what happens? The farm sends produce to the manufacturers who use it in an organic way and who also upload relevant documents to the blockchain. Next, the product arrives at a retailer who can view the history of the item and market it accordingly. Finally a customer sees it and can and verify that it is organic before they buy it (are they able to view all the documents?).  

What do the "voting rules about self governance" need to accomplish? Shouldn't the system just work by itself. Its just a database, what do they need to vote on? Allowing new members in?

I GOT HAYDENS FOUR NODES TO WORK!!

---

# 24/11

Today I'll spend the morning to get the SWIPL Iroha network to work. And do more reading/thinking this arvo.

Couldn't figure out swipl kernel. Reinstalling virtualbox, and trying to get VM working again. 

In the meantime. I'm going to try to find some example of "governance rules".

starting with https://ethereum.org/en/governance/. Maybe I should aim to produce a similar documet for a proposed veracity blockchain?
- [eth-governance](notes/eth-governance.md)

What do I need to define so that I can design rules for the governance of my blockchain?
- How much can I adapt from existing chains? I should probably review the governance of other chains (while developing my own)
- I need to define:
	- Stakeholders
	- A process for change
	- Handling Disagreements
	- Voting protocol

I just started [this](notes/veracity-chain.md) document. I think I am going too much into detail about the external system.

In ethereum governance rules are the systems that allow the protocol to change. Do the governance rules in our permissioned chain need to cover anything else. So far I've identified two things that the governance need to manage:
- The process for change of the codebase/protocol
- The process for admitting a new participant

What happens if a participant is caught being untruthful? Can they be automatically kicked out or is a vote required? How can we distinguish between mistakes and intentional deceit?

---

# 25/11

https://www.researchgate.net/publication/321474197_Blockchain_Based_Wine_Supply_Chain_Traceability_System
- [wine supply chain entities](https://i.imgur.com/9D0tsVF.png)
	- could be very similar to organic food supply chain
- The proposed traceability system uses a private blockchain with pre-selected miners and a block is added to the chain if and only if it is verified by the majority number of miners

https://www.multichain.com/download/MultiChain-White-Paper.pdf

- https://doi.org/10.1016/j.ipm.2021.102556 # A novel framework for policy based on-chain governance of blockchain networks
	- Like other PDCAs, blockchains may require human intervention from different perspectives (fault, configuration, asset, performance, and security management).
	- main issue with decntralised governance
		- consensus of stakeholders
		- security of governance
		- centralisation risk
		- fairness
		- conflicting interests
		- effectiveness
		- complexity
		- flexible governance
		- slow response in problem cases
		- inter proposeal dependencies
	- It is a double-edged sword. It allows quicker decision-making but it's risky because the governance system becomes harder to change once instituted.

https://arxiv.org/pdf/2105.05460.pdf A SYSTEMATIC LITERATURE REVIEW ON BLOCKCHAIN GOVERNANCE
- 

---
