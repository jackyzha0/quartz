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
- hyperledger docs
	- transaction to remove peer requires the node making the transaction to have the can-remove-peer permission
	- can nodes with this perssion remove peers at will?
	- not 1:1 nodes:accounts
	- with HL Burrow you can use Solidity smart-contracts on Iroha