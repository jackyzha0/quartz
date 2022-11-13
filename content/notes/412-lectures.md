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
- 