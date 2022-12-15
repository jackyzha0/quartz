---
title: "isolated scenarios"
tags: 
---
# Adding a new member
Within an existing closed BC with 10 participants. say we wanted to add another participant as a validator node. they run the node software on a machine. this node is fully priviledged. they new member had to go through a screening and sign a legal contract to ensure they are not a bad actor. this node recieves a copy of the blockchain so far, and begins participating in the consensus algorithm and submitting transactions. their contract is added to the blockchain as their first transaction (maybe. or it can be stored somewhere else). 

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

# Remove Member
What happens if one participant turned bad and the other wanted to remove them from the group. Ssay we havea grup of 10 participants in a closed blockchain system using a CFT consensus algorithm Then they can be voted out so that their vote is desregarded and so they cant view or access data on the chain. what if they require access to decuments stored on-chain which they dont have local copies of. I guess they wuld have access to a stored copy of the blockchain on their node. But then would this chain be considered valid by oters. they dont store the actual document on the blockchain – only a timestamped hash to prove they had that doc at this particular time. participats should keep local copies of documents. Can participants kick out the initiating authority? You would have some mechanism to ensure that they cant be kicked out. firstly there would have to be a vote to kick them out. unless they aren't actually needed. who are the people that look at the documents that are stored on the chain to check them. Some third party collectively employed by the group? the govt? maybe its required for each participant to sometimes go and check if other participants are being truthful.

Removing member in hyperledger iroha: 


# Accidental Transactions
The new participant makes a mistake and puts the entire document instead of just a hash. this document is sensitive and contains data that should be kept private. 
 - automatically perform some checks to ensure the data lodged during a transaction is always just a hash.
 - is this the responsibility of the participant or the network to prevent. should be participant but that doesn't mean there shouldn't be some checks that the network can do 
 - do we want to store data other than hashed documents.
 - if the document is lodged on the BC can the consortium agree to remove it by doing basically a hard fork
	 - what happens to the other side of the fork? just stops. 
 - i guess thats a lot easier in a closed BC than an open one

If someone uploads a document by accident that is sensitive, then the chain hard forks to remove it from the history, is it still publicly available (to the members of chain) or is the old fork erased. bu then what if someone stored a local copy (which they do). maybe the local copy is stored encrypted and the owner of the document has the key to unlock it.

# Discovery of Security Vulnerability
what if someone found a security vulnerability in the code. would they exploit it? how to change the code. would there be a different process to normal code changes for something critical like this. within the blockchain wallets/accounts are linked to a real world identity. but i guess the person who found the vulnerability could easily (note the "person" is a member of an organisation who has access to the code) tell someone else who is not identifiable and have them exploit the vulnerability. how do organisations decide who has access to the code. if the person does not decide to try to exploit it, they have to bring it to the attention of others or try to fix it themselves. 