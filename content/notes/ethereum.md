---
title: "ethereum"
tags: 
---

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

# Storage
The state of ethereum is not an abstract concept as it is in [[bitcoin]]

Ethereum is a transaction based state machine. 

Activities such as transactions, contracts, and minig all change the state of the ethereum blockchain.

Data like account balances are not stored in the blocks of the chain. only the root node hashes of the transaction trie, staet trie ad receipts trie are stoed directly in the chain.

![](https://i.imgur.com/fIgNeUR.png)

There are two **types of data** stored in Ethereum. _Permanent_ (e.g., a transaction recorded in the transaction trie) and _Ephemeral_ (e.g., an account balance stored in the state trie) data. 

## State Trie
contains a key and value pair for every account which exists on the eth network. The key is a 160 bit id. The value is the encoded details of an etherum account (nonce, balance, storageRoot, codeHash). 

The root node (a hash of the entire tree) is dependent on all internal state trie data.

## Storage Trie
This is where the contract data lives. Each eth account has its own storage trie. this is stored as a hash of the storage trie's root node "storageRoot" in the global state trie

## Transaction Trie
