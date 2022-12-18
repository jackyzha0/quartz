---
title: "bitcoin"
tags: 
---

whitepaper: bitcoin.org/bitcoin.pdf

# Governance
"Bitcoin governance is the process by which a set of transaction and block verification rules are decided upon, implemented, and enforced, such that individuals adopt these rules for verifying that payments they received in transactions and blocks fit their subjective definition of “Bitcoin”. If two or more individuals adopt the same set validation of rules, they form an inter-subjective social consensus of what “Bitcoin” is."

purpose
- wide range of views
- some argue that trustlessness is most important (the ability to use it trusting only the open source softwar
e)
- some argue that maximizing the value of bitcoin is most important

the bitcoin governance process maintains a set of rules about
- syntax
- data structures
- resource usage limits
- sanity checks
- time locking
- reconciliation with the memory pool and main branch
- coinbase reward and fee calculation
- block header verification

proposal
- researcher disovers a solution
	- share proposed changes will devs through email, white paper and/or a BIP

implementation


# Network
1) New transactions are broadcast to all nodes. 
2) Each node collects new transactions into a block. 
3) Each node works on finding a difficult proof-of-work for its block. 
4) When a node finds a proof-of-work, it broadcasts the block to all nodes. 
5) Nodes accept the block only if all transactions in it are valid and not already spent. 
6) Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.