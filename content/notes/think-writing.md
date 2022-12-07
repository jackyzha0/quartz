---
title: "think-writing"
tags: 
---


[[veracity-week01]]
[[veracity-week02]]
[[veracity-week03]]

# 5/12

Week Review
- Got the prolog notebook to work. 
- Read some interesting papers, tethering to public chain, reciprocal hyribd on/off chain governance
- thought about some scenarios
	- kick out participant
	- add new participant
	- mistakently add senstitive data to chain
	- one participant finds a security bug

This week
- try to implement some scenarios with a demo network
	- add new participant: off-chain or on-chain voting? Should store some record of vote outcome on-chain
- consider more scenarios
- read more papers

More about adding new member
- Existing members vote to add new member
- on or off chain vote?
- store record of vote outcome on-chain
- consider special cases
	- details of vote cutoff time
	- parameters of vote change during vote
- hyperledger
	- The purpose of add peer command is to write into ledger the fact of peer addition into the peer network. After a transaction with AddPeer has been committed, consensus and synchronization components will start using it.
	- transaction to remove peer requires the node making the transaction to have the can-remove-peer permission
	- can nodes with this perssion remove peers at will?
	- not 1:1 nodes:accounts
	- with HL Burrow you can use Solidity smart-contracts on Iroha
	- iroha would either have to be off-chain voting then a trusted peer (or initial) would add them
	- or: will need to look into HL Burrow but there might a way to have an on-chain smart contract voting system which automatically adds them depending on the vote
		- I could think about how to implement such a smart contract

# 6/12

yesterday
- didn't get a lot done
- trying to get notebook to work with pyswip 0.2.10
- some thoughts about adding a new person to the chain
	- looked at how to do it within hyperledger
	- one existing peer needs permission to add another peer

what about removing a person from the chain?
- within hyperledger. 

should i be using iroha2 - much better docs, newer version.

https://github.com/hyperledger/iroha/blob/iroha2-dev/docs/source/iroha_2_whitepaper.md

Im going to try to add a fifth peer to the four node demo network while its running
# 7/12

yesterday
- tried to get HL iroha to add a node
- think i got but i need to add some logs to check

what i did yesterday didn't work. spend some time this morning to try to get it to work. the docs are not very helpful. might give up on that for now. 

brain is fried. will do some light (ish) reading. 

---

# 7/12

https://doi.org/10.1016/j.pmcj.2019.101050
https://doi.org/10.1016/j.im.2021.103444
https://doi.org/10.1016/j.giq.2021.101625