---
title: "think-writing"
tags: 

---

# 15/11

where to start? pretty overwhelmed with this whole blockchain thing. Not really sure where this project is going. At the moment what I understand is that I'm looking to a more open version of a closed blockchain. One which is initiated by a central authority e.g., the government, who then allows other parties to join. In the example with the organic supply wh- would each company who wanted to verify that their produce is organic, "join" a central blockchain. From the beginning of the (supply) chain to the end there are many different companies involved. So would the journey of the item be tracked on a blockchain? Maybe not neccessarily the journey but maybe throughout its route, each thing (or an agreement to provide that thing) that is need to prove an item's "organicness" is added to the chain, then when it reaches the end the chain is discarded? Surely that's not right. Does a blockchain necessarily need to represent a *sequence*? Yeah I think so. But a currency like bitcoin is an infinite sequence, whereas an items journey is finite. What does a blockchain used in a supply chain context represent?

From the abstract - "closed blockchains are considered by some to be insufficiently decentralised.This summer project aims to prototype a compromise: a closed blockchain system that encodes voting rules about self-governance, so that closed blockchain technology can be used in a more open manner"

"insufficiently decentralised" - closed blockchain are regulated by a central authority who decides who can join and leave the network. 

"closed blockchain system that encodes voting rules about self-governance" - this will allow users to come and go at will - to a degree. There must be some limiting factor because otherwise this is just an open blockchain.

I need to lower my expectation for the rate of progess I think. If I can establish a clear goal by the end of the week I will be happy. 

---

# 16/11

so is it a closed blockchain with a set number of participants (or a set of requirements for participants?) who can join (what does join mean in this context) and leave at will. How are all the different companies on the same blockchain. How do smart contract fit into all this? Is sequence relevant in a closed blockchain or is it just like a regular but distributed database?

https://medium.com/wavesprotocol/what-closed-blockchain-is-for-190534b5951 This article proposes that closed blockchains should be used for implementing business logic rather than just putting data onto them. It gives the example of a trucking system tracking a drivers route and using a smart contract to automatically give them a bonus for taking a shorter route. It would also be able to detect whether a drive tampers with data by comparing it to the "big data collected during the operation of the company". 

Didn't really answer my above questions and It also seems like all the "new" thing proposed by the article have already been done without blockchain technology. However it does seem like the data is not sequential and works just like a regular database. It's stil not super clear though. 

https://medium.com/@WayneVaughan/open-vs-closed-blockchains-let-s-end-this-madness-8313e4095ead This article from 2015 seeks to clear up the terms used to talk about open and closed blockchains. It's defines closed as:
>"A private network that maintains a shared record of transactions. The network is accessible only to those who have permission and transactions can be edited by administrators. Examples: [Hyperledger](http://hyperledger.com/), [Ripple](https://ripple.com/), [Eris](https://erisindustries.com/)"

https://developer.oracle.com/learn/technical-articles/permissioned-blockchain
- Permissioned — Open, decentralized networks with universal consensus validation; anyone can join the network and possess a copy of the ledger

https://www.mobycrypt.com/do-we-need-closed-blockchains/ (badly written) Gives an examle of a closed blockchain IBM food trust which tracks the history (changes, as transactions within blocks?) of the food from beginning to end. The members of the supply chain process are the participants in the blockchain. 

So within a supply chain blockchain, each change in the state of an item is recorded as a "transaction" and appended to the blockchain. These transactions are stored indefinitely? Then we can go back and look through the history of that item. How can you view the history of the item. I thought all previous transactions were stored as a hash. I guess we have the key to decrypt it?

From the bitcoin whitepaper:
![](https://i.imgur.com/VutNw5Y.png) Do closed blockchains look the same?

https://www.hyperledger.org/wp-content/uploads/2018/08/HL_Whitepaper_IntroductiontoHyperledger.pdf
- Different services within hyperledger

So what is the issue with current closed blockchains - "not sufficiently decentralised". Is the problem of storing the history of product within a supply chain "solved"? Let me try an example. There is a company growing organic oranges. Do I need to research the regulations for organicness? The company growing the oranges adds a block to the blockchain containing information or pointers to information required to verify their authenticity. (what about all the products used for growing the oranges, not sure how all the details work here. I dont think that is in the scope) Then as the shipment travels through the supply chain, each step along the way a new "transaction" is added to the chain. These transactions are created by each of the companies handling the shipment. 

what is the scope of "the blockchain". is there one chain per shipment, are all shipments tracked on one blockchain, is it separated by industry. wouldn't shipping companies operate across multiple industries? do they participate in several chains? are there several blockchains interacting (whatever that means)? Can two chains interact? does one shipping company have their own blockchain. 

once a shipment is delivered to a consumer is its history moved to an archive? Is that possible or even necessary on a blockchain?

And how is this chain governed. who is the central authority, who decides who can join and leave, how are participants verified as being who they are? 

"a closed blockchain system that encodes voting rules about self-governance" — so each of the participating parties vote about who can join. Is governance in this sense the same as within an open blockchain? within an open blockchain the goverance includes decisions about update and changes to the code of the blockchain. ==what is governance within a closed blockchain==. Is the code closed source? is development distributed between participating parties, or one central group? ==Why a participant of one of these chain want to fork?== what does that even mean? 

what are public vs private permissioned blockchains

a normal permissioned blockchain is developed and managed by one group. this group governs everything, and decides who can join and leave etc. What i am looking for is a way for a closed blockchain such as this, to be governed by a more decentralised group. This means development is spread across participants, and decisions are voted on by many participants through rules/protocols encoded within the blockchain itself (similar to on-chain governance).

I think I am getting somewhere.

Now what do I do? Still many unanswered questions. I dont understand the scope of a blockchain within a supply chain context.

https://www.ibm.com/blockchain-supply-chain There are clearly many different blockchains. So how do these work together? using the example of the organic produce. A large store like paknsave has an agreement with a farm to but their supposed organic produce. paknsave has created a blockchain where suppliers like these can join and provide relevant information about their product, which pak n save can see. 

or. the government creates some regulations for organic items, and a blockchain. then suppliers can join the blockchain and add their data to it, and retailers like pak n save (maybe also consumers) can also join and view the relevant information. maybe these regulations are trusted internationally so local growers exporting produce dont have to comply to the regulations of multiple governments. so where do the intermediaries such as shipping companies and various depots fit in. are they also participants in this blockchain

---

# 17/11

So who runs/starts the blockchain? Initiated by central authority like the govt. Then compies who want to verify that they are an organic producer ask to join the network so they can add the required documents (or pointers to the documents) to the chain. These documents are now viewable by governing authorities (perhaps internationally) and maybe also other particpants. If necessary, various parties involved in the supply chain can also add blocks. 

In the hyderledger whitepaper they described a use case for seafood tracking where-

is all this writing productive, ive actually started using this doc as just a place to write stuff not as actual think writing. is there a better way to take notes? document for each article? 

public vs private blockchains — [blockchain-types](notes/blockchain-types.md). So it sounds like what I am trying to do Is very similar to a public permissioned blockchain.

is a private blockchain even a chain of blocks. Its an immutable, more transparent, distributed ledger. Why cant that be done with a regular database?

Permissioned (public) blockchains allow "anyone to join the permissioned network after a suitable identity verification process. Some give special and designated permissions to perform only specific activities on a network"

https://sovrin.org example of a public permissioned blockchain. it is a public service utility enabling self-sovereign identity on the internet. it is based on hyperledger indy. interesting but doesn't really help me.

https://www.academia.edu/41965099/Public_Permissioned_blockchains_as_Common_Pool_Resources (written by the CTO of alastria) seems like a very relevant article. It describes a public-permissioned blockchain, with decentralised governance. It likens managing a public permissionless blockchain to managing common pool resources. One of the issues with managing CPRs is developing the required trust. However, with blockchain technology, you can encode goverance rules directly into the infrastructure which are immutable, transparent and automatic. this is [On chain governance](notes/governance.md#On%20chain%20governance). This can be used to implement the rules of [CPR-governance](notes/CPR-governance.md) outlined by Ostram.

[transaction-finality](notes/transaction-finality.md)

two types of nodes in a permissioned blockchain network:
- Consensus nodes - responsible for the execution of the consensus algorithm
- Regular nodes - perform the maintenance of a local copy of the blockchain using the blocks generated from the set of consensus nodes.

alastria uses IBFT consensus algorithm.

---

# 21/11
On friday I tried to get haydens hypderledge iroha code from last year to work [here](https://github.com/hmcalister/SWIPL-Notebook-Blockchain-Filehashing) and [here](https://github.com/hmcalister/Hypderledger-Iroha-Multinode-Demo). I was unable to. Each of the blockchain nodes were running in their containers, but I wasn't able to connect to them from a python script running locally. I need to make a plan for this week. 

- Try to figure out a way to connect to the nodes from a script 
	- Maybe from a fifth container?
- If I am unable to connect to the nodes I might have to start them from scratch
	- This would help me to learn the tools also.
- Try to figure out how the public permissioned blockchain might work in some more detail.

ethereum whitepaper
- a new version of blockchain which has better internal scripting
- the state of ethereum is made up account objects. each acc has:
	- nonce
	- balance
	- contract code
	- storage
- There are two types of accounts
	- external: 
		- controlled by private keys
		- no code
		- can send "messages" as a transaction
	- contract: controled by contract code
		- executes code when it recieves a message
			- read/write from storage
			- send messages
			- create contracts
			- etc
- messages - similar to bitcoin transactions but:	
	- can be created by contract and externall accounts (not only external)
	- can contain data
	- contract accounts can return responses when they recieve a message
		- ∴ can act as functions
- transaction - refers to signed package that stores a message to be sent from an external account
	- they contain
		- recipient of message
		- signature of sender
		- amout of ether and data to send
		- STARTGAS - limit to number of steps of code
		- GASPRICE - fee to pay miner per step
- applications
	- identiy and reputation systems
	- decentralised file storage
	- decentralised autonomous organisations [DAO](notes/decentralized-autonomous-organization.md)
	- savings wallets
	- crop insurance
	- decentralised data feed
	- smart multi-signature escrow
	- cloud computing
	- p2p gambling
	- on-chain decentralised marketplaces

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

permissioned blockchain "connected" to permionless blockchain 

DOI 10.1109/Blockchain.2019.00045
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

I will some of these later maybe. I think i need to start focusing on "design and modelling of the blockchain governance rules, and implementation of such a rule set over an existing closed blockchain system". Clearly the existing blockchain network is not working yet so I might try to implement that later. I think I should start trying to design some governance rules. 

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

I just started [this](notes/veracity-governance.md) document. I think I am going too much into detail about the external system.

In ethereum governance rules are the systems that allow the protocol to change. Do the governance rules in our permissioned chain need to cover anything else. So far I've identified two things that the governance need to manage:
- The process for change of the codebase/protocol
- The process for admitting a new participant

What happens if a participant is caught being untruthful? Can they be automatically kicked out or is a vote required? How can we distinguish between mistakes and intentional deceit?