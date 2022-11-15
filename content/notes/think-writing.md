---
title: "think-writing"
tags: 

---

15/11

where to start? pretty overwhelmed with this whole blockchain thing. Not really sure where this project is going. At the moment what I understand is that I'm looking to a more open version of a closed blockchain. One which is initiated by a central authority e.g., the government, who then allows other parties to join. In the example with the organic supply wh- would each company who wanted to verify that their produce is organic, "join" a central blockchain. From the beginning of the (supply) chain to the end there are many different companies involved. So would the journey of the item be tracked on a blockchain? Maybe not neccessarily the journey but maybe throughout its route, each thing (or an agreement to provide that thing) that is need to prove an item's "organicness" is added to the chain, then when it reaches the end the chain is discarded? Surely that's not right. Does a blockchain necessarily need to represent a *sequence*? Yeah I think so. But a currency like bitcoin is an infinite sequence, whereas an items journey is finite. ==What does a blockchain used in a supply chain context represent?==

From the abstract - "closed blockchains are considered by some to be insufficiently decentralised.This summer project aims to prototype a compromise: a closed blockchain system that encodes voting rules about self-governance, so that closed blockchain technology can be used in a more open manner"

"insufficiently decentralised" - closed blockchain are regulated by a central authority who decides who can join and leave the network. 

"closed blockchain system that encodes voting rules about self-governance" - this will allow users to come and go at will - to a degree. There must be some limiting factor because otherwise this is just an open blockchain.

I need to lower my expectation for the rate of progess I think. If I can establish a clear goal by the end of the week I will be happy. 

16/11

so is it a closed blockchain with a set number of participants (or a set of requirements for participants?) who can join (what does join mean in this context) and leave at will. How are all the different companies on the same blockchain. How do smart contract fit into all this? Is sequence relevant in a closed blockchain or is it just like a regular but distributed database?

https://medium.com/wavesprotocol/what-closed-blockchain-is-for-190534b5951 This article proposes that closed blockchains should be used for implementing business logic rather than just putting data onto them. It gives the example of a trucking system tracking a drivers route and using a smart contract to automatically give them a bonus for taking a shorter route. It would also be able to detect whether a drive tampers with data by comparing it to the "big data collected during the operation of the company". 

Didn't really answer my above questions and It also seems like all the "new" thing proposed by the article have already been done without blockchain technology. However it does seem like the data is not sequential and works just like a regular database. It's stil not super clear though. 

https://medium.com/@WayneVaughan/open-vs-closed-blockchains-let-s-end-this-madness-8313e4095ead This artivle from 2015 seeks to clear up the terms used to talk about open and closed blockchains. It's defines closed as:
>"A private network that maintains a shared record of transactions. The network is accessible only to those who have permission and transactions can be edited by administrators. Examples: [Hyperledger](http://hyperledger.com/), [Ripple](https://ripple.com/), [Eris](https://erisindustries.com/)"

https://developer.oracle.com/learn/technical-articles/permissioned-blockchain
- Permissioned — Open, decentralized networks with universal consensus validation; anyone can join the network and possess a copy of the ledger
