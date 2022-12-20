---
title: "isolated scenarios"
tags: 
---
# Adding a new member
Within an existing closed BC with 10 participants. say we wanted to add another participant as a validator node. the new participant will run the node software on a machine. the new node will have some privilege/role assigned to it. the new member has to go through a screening and sign a legal contract to ensure they are not a bad actor. this node recieves a copy of the blockchain so far, and begins participating in the consensus algorithm and submitting transactions. their legal contract is added to the blockchain as their first transaction (maybe. or it can be stored somewhere else). 

- Existing members vote to add new member
- on or off chain vote?
- store record of vote outcome on-chain
- consider special cases
	- details of vote cutoff time
	- parameters of vote change during vote
- hyperledger
	- "The purpose of add peer command is to write into ledger the fact of peer addition into the peer network. After a transaction with AddPeer has been committed, consensus and synchronization components will start using it."
	- transaction to remove peer requires the node making the transaction to have the can-remove-peer permission
	- can nodes with this perssion remove peers at will?
	- not necessarily 1:1 nodes:accounts
	- with HL Burrow you can use Solidity smart-contracts on Iroha
	- iroha would either have to be off-chain voting then a trusted peer (maybe the initiating peer) would add them
	- or: will need to look into HL Burrow but there might a way to have an on-chain smart contract voting system which automatically adds them depending on the vote
		- I could think about how to implement such a smart contract

How could a bad actor try to get themselves on the chain? Could they dupe someone else into signing the entry contract on their behalf? Or could they bypass the contract? The genesis block of a new peer (in HL iroha) has to be the exact same as the genesis block of all other peers. Could the genesis block be like a sort of "key to the network. Maybe not because there is not much to stop one of the existing peers sharing the genesis block with third parties. But then even if a someone leaked the genesis block the existing nodes would have to be instructed to start intereacting with the new node. I think the genesis key idea is dumb. We do still have to get the genesis block to the new members though. I think this would just be included as part of a repository for spinning up a node. 

How does a new node request to join the network. Would it be an off-chain application process? Or would they be able to start a node, maybe join a sort of "lobby" network which they use to apply and maybe test their node and maybe some other things. Then once their "application" is accepted, they are allowed in to the main network. Would the lobby network be a sub network within the main network or a totaly separeate network. If it was separate it would have to have its own nodes for vaildation. Does the lobby even need to be blockchain based? What if an applicant sent an application through a website or some other medium. Then this application gets somehow sent to the main network, and voted on by the existing members. Is this just the idea of having validator nodes separate from other nodes. If we were to have separate validator nodes, this would be a level above the accepted nodes. So: lobby > participants > validators. In the lobby we can also carry out security check on the applications and they can upload required documents to this sub network. I would assume the documents that the application would need to supply at this stage are not confidential and it does not matter if other members of the node can view them (the actual doc not just a promise that they exist). Are there a separate set of "validators" for checking new applications? Could these be the same validators that participate in consensus on the main network? 

What if all of the nodes in the main network are validators? lobby > validators. then they all vote on adding new participants. But then they can all view documents that the applicants submit. Could be have some trusted third party check the documents? I think this the kind of thing we are trying to avoid so maybe not. Could we have some automatic system to check the documents?

Do we wan to limit the number of people who can join the chain. maybe a participant from the lobby is selected periodically, and then voted on. Maybe a set of participants are selected and voted on. What would this achieve? this would limit the number of application so that the system does not overload. prevents a person from effectively doing a DoS attack on the application process to prevent ligitamate people from applying. A DoS on the application process might also affect the usual activities of the network. Actually this wouldn't prevent a DoS on the application system. How can we stop a bad actor from sending in many applications? There could be some automatic sreening process which filters out applications that are not valid.  

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

# Proposing Changes/Upgrades to the code or the goverance system

