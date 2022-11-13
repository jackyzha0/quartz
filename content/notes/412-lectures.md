---
title: "412-lectures"
aliases: 
tags: 

---


# Lecture 7
copmuter security
- physical
- software (authenticity correctness)
- information (CIA/ IAS octave)
- network

cryptography can be bad because
- you are still giving access to data in some form
- how long will the cipher remain secure
- managing keys can be challenging

crypto in CIA
- c - hide information
- i - check for changes, checksums, MACs, Digital signatures
- a - not directly, but indirectly, validate authentity of network link usage

fallible machines
- ram corruption, fade or malfunction of storage media, software issues (fs bugs, compression bugs, etc)
- solution
	- estimate probability of failures, determine how many trials to achieve a certain level of confidence
- aside: mahcines are designed to fail frequently
	- reliability tradeoff with increases in speed/power consuption (e.g., overclocking)

distributed consensus
-  e.g., Master/master relational database
-  NoSQL gossip protocols, and eventual consistency
- network instrastructure e.g., routers as hot spares
- consensus gathering systems
	- apache zookeeper distributed synchronisation
	- etcd (used in kubernetes)

dist cons algorithms
- fischer lynch paterson impossibility result
- paxos - fault tolerant consensus over distributed nodes (use din apache zoo)
- raft - alternative to paxos used in etcd
	- easier than paxos to understand and implement
		- sub problems: leader election, log (data) replication by leader to followers
- EPaxos - more compex and efficient that paxos

all used when all servers are trusted. when there are malicious parties the consensus set size must grow. you need a majority of votes from the asumed-benign server set. 

permissionless blockchain - do not control the server set, safety presumed if 50% of nodes are benign

fault tolerance
- CFT - when a node dissapears
- BFT - nodes acting maliciously
- raft and paxos only CFT, variants of Paxos are BFT

building a cryptocurrency
- how to make a 'coin'
- how to id coin owners
- how to protect from forgery
- how to record ownership and transfer of ownership
- how are coins single-use

distributed consensus in bitcoin
- track who has what (in normal currency done by banks)
- bitcion has all validating nodes store the whole ledger - indicates order of transactions
	- collectively agreeing its content avoid double spending
- a wallet is a hash of a public key a client generates

proof of work
- to protect from sybil attacks it is computationaly costly to add transactions
- reward for incorporative a new transaction
- to validate a transaction
	- check for double spending internally
	- make merkle tree over transaction hashes
	-  to close block, apply proof of work algorithm
- must be easy to check and hard to compute
	- bitcoin: find a nonce that when appended to the block of transactions gives a hash value less than the target (SHA-256, target is dynamic ~10min to compute)
	- block has is included in next block

miners
- validate blocks
- reward of 6.25 bitcoin
- ability to levy fees
- broadcast communication between miners uses a p2p protocol
- variance in mining time is larger than message broadcast time - helps serialisation
- possible for multiple answers to be broadcast
	- nodes who 'hear' multiple solutions keep them all
	- subsequent mining is done on the longest fork (parallel forks tend to die quickly)

approving transactions
- transaction is recorded in a block
- relevant block must be in longest blockchain and five for more blocks must follow it
- transaction clearing delay (in effect)

content of transaction
- no persistens coins: serial numbers are transaction hashes
- transaction specifies number of inputs and outputs, 
	- inputs usually previous transactions
	- can ouput back to yourself, thus pocketing 'change'
	- remainder of input, after subtracting output, is transaction fee
- can search back in time to find a transaction
	- either genesis block (50 bitcoin) ir a coinbase mining reward

main node roles
- network - all nodes help routing with p2p protocol
- wallet - manage keys that show ownership of transactions
- miner - participate in proof of work block verifications
- blockchain - can carry full blockchain

bitcoin core refereence client contains all four functions
- miners (may) leave out wallet
- lightweight wallet only has wallet and network components
- some nodes store blockchain but do not do mining

# Lecture 9
![merkle tree|300](https://i.imgur.com/umkxpSZ.png)

Merkle tree
 - hash value compted for each data block
 - tree built with parent