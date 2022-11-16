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

https://www.linkedin.com/pulse/public-permissioned-blockchains-common-pool-resources-jesus-ruiz/ seems like a very relevant article. It describes a public-permissioned blockchain, with decentralised governance.