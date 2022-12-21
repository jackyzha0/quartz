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
https://blockchaingov.eu focused more on the legal side of things and the sociological issues.

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

https://doi.org/10.1016/j.icte.2020.09.002 Permissioned blockchain frameworks in the industry: A comparison

Quorum: developed by jp morgan for finance applications. It is a fork of go-ethereum. Add the ability to have private contracts and transactions which are only visible/viewable by participants specifies in the transaction. 

R3 Corda: open source permissioned platform. Follow know your customer principle. each node must prove identity. verified by the  _doorman_ node. Network is made up of one or many _notary_ nodes which validate the uniqueness and sequencing of transactions without global broadcasting. two types of consensus: validity and sequencing, 

---

# 19/12

Still dont understand fabric vs iroha.

https://hyperledger-fabric.readthedocs.io/en/release-2.5/whatis.html

For business use cases:
-   Participants must be identified/identifiable
-   Networks need to be _permissioned_
-   High transaction throughput performance
-   Low latency of transaction confirmation
-   Privacy and confidentiality of transactions and data pertaining to business transactions

Fabric has pluggable consensus algorithms: iroha has only YAC


I started reading the bitcoin paper again. In bitcoin they are able to save space by storing hashes of transactions in a merkle tree and stubbing off branches. In Ethereum and other chains with smart contracts and storage, how to they prevent the chain from taking up a lot of space? I also thought that blockchain can act basically as a database and you are able to go back and look at data stored "on-chain". Where is this data stored? I'll have to read up about Ethereum again but I suspect the chain must use more storage space, or maybe they clean up old smart contracts? How would that even work?

In etherum each block hold the entire state of the chain. The state is stored in a tree structure. And for each block only a small part of the tree needs to be changed. So the data can be stored once, and referenced twice using pointers. This is done using a "patricia tree". Patricia trees are similar to merkle trees but the allow insertion and deletion of nodes. Also since the entire state is stored on each chain there is no need to store the entire blokchain history. 

Did some research on [[merkle tree]]s. Think in bitcoin and ethereum the raw data is also stored somewhere, not only the hashes. But then how does pruning the tree help in bitcoin. Does bitcoin just not store a record of transactions? Does ethereum? I know where blockchain is stored but not what is stored.

https://www.makeuseof.com/what-data-stored-bitcoin-blockchain/ From here it seems that within a block the transactions are stored separately from the merkle tree. And the number of transactions in a block cannot take up more than 1MB.

https://hackernoon.com/getting-deep-into-ethereum-how-data-is-stored-in-ethereum-e3f669d96033 [[ethereum#storage]]

https://medium.com/cybermiles/diving-into-ethereums-world-state-c893102030ed

I think I have a much better understanding 

![](https://i.imgur.com/aKtNoso.png)
![](https://i.imgur.com/xqUG10J.png)

---

# 20/12

Battled the smart contracts again. I dont know why its not working. 

`[2022-12-19 23:20:38.420952000][I][Irohad/CommandService/Processor]: Stateful validation error in transaction 03ff6949aeaaf73e5d49852222faf6ebc4ef69aeeba9932a419f53bc45713ac3: command 'CallEngine' with index '0' did not pass verification with code '3', query arguments: Engine error: Error deploying smart contract at address FBCEC9782F2B09AD4799DF4DE8ACAA34832FDD57: error 13 - Error 13: data stack underflow: data stack underflow.`

`[2022-12-20 01:12:55.936251500][W][Irohad/CommandService/Transport]: Transaction deserialization failed: hash Hash: [6d946f9960c9971f2073a8887aeb77ea3a44ad6f86ca2ce5d22f6adf9597445f], SignedData: [Child errors=[Transaction: [Child errors=[Command #1: [Child errors=[CallEngine: [Child errors=[EvmHexAddress: [Errors=[passed value: '000000000000000000000000f205c4a929072dd6e7fc081c2a78dbc79c76070b' does not match regex '[0-9a-fA-F]{40}'. Hex encoded 20-byte address expected]]]]]]]]]]`

Fooken worked. 

`[2022-12-20 01:14:36.817516000][I][Irohad/Simulator]: Created block: Block: [hash=d77f03e3e5cdbb650b8092a0551d0360ff5e81c395db8e5c4334f0738077bb39, height=3, prevHash=6eeea45250c4df779bf34fa46753f24ccb15d9d730e1a3dd794eda9aeffb8486, createdtime=1671498876805, transactions=[Transaction: [hash=d0669901c2bb33cd69fe7573a888d77258f3f494c12e4f1185136de839d2c0ff, creatorAccountId=admin@test, createdTime=1671498871514, quorum=1, commands=[CallEngine: [type=83, caller=admin@test, callee=f205c4a929072dd6e7fc081c2a78dbc79c76070b, input=40c10f19000000000000000000000000f205c4a929072dd6e7fc081c2a78dbc79c76070b00000000000000000000000000000000000000000000000000000000000003e8]], batch_meta=(not set), reducedHash=Hash: [9e5640d660d7a9b224703a9f3f5513d1ef9b5f3db331d5bcc1b92edd229f443b], signatures=[Signature: [publicKey=313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910, signedData=53af285f82bb2bcf35288e5340d4da396304ea93f92caf7734d9aeadcffdc63a2c6ac31df2034cc462893310adb44252d82a85e23f9b0f02a444eb8df4b95e05]]]], signatures=[Signature: [publicKey=bddd58404d1315e0eb27902c5d7c8eb0602c16238f005773df406bc191308929, signedData=b544add45c65e932f8f1b18a36139b8fa7a198be3064de81e18d412cb8c565df9681feaf2ef1e53ca47522e6561afa3f11c8a7e84cadc04f5fe295df5d808d04]], rejected transactions=[]]`

[[scenarios#Adding a new member]] added some stuff. Idea of having a "lobby" subnetwork where people can apply, and have their documents checked, and where we can vote on them. 

[[scenarios#Proposing Changes/Upgrades to the code or the goverance system]] I think I need to to some reading about the BIP/EIP system. from what I understand they are an off-chain system were someone proposes a change to the protocol, then it is reviewed and accepted, rejected, or modified. I'm not sure who does the voting or how the voting system works for these systems.

---

# 21/12

Last day In Dunedin.

Need to write some documentation so that when I come back after the break I wont be totally lost. 

[[Blockchain as a confidence machine — The problem of trust & challenges of governance]]
[[A blockchain architecture for industrial applications]]
https://www.google.co.nz/books/edition/_/vqXaDwAAQBAJ?hl=en&gbpv=1&pg=PP1