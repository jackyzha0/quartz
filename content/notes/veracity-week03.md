# 28/11

Week Review. 
- Got four hypderleger iroha nodes working, and connected to them from a python script
- I wasn't able to get the SWIPL notebook to work. Need to decide how much time to spend on that
- I Read the ethereum whitepaper. This gave me a much better understanding of how smart contracts work. As well as how a blockchain more advanced than bitcoin works.
- Some interesting things to note from my reading
	- Permissioned blockchain connect to permissionless chain. (Interesting idea, I cant find where i got this from, need to organise better. Might be worth spending some time today to do this)
	- Storing proof of documents using. Zero Knowledge Proof, Hidden Markov Model. This as also in a paper I cant find.
	- The idea of governance based on a reputation system. Look into stigmergic coordination (http://dx.doi.org/10.2139/ssrn.2811995)
	- https://doi.org/10.1155/2020/5385207 was a useful paper. It gave me some of idea of what we might need to store on the chain, and what steps are involved in the supply chain
- Identified what the governance rules might need to manage. And made a list of some questions I will need to answer.
- I also got some tips from pradeesh for reading papers and started reading a survey paper.

Finished reading Survey paper. Some key takeaways:
- need to consider governance of: platform, community, applications and data
- need to consider governance during 
- need to consider process as well as product mechanisms

I think I should start with an existing example as a base and work on improving/changing it. After that, once I understand what is required, I could think about designing one from the ground up.
- What exists for me to start from?
- What the issues with it? What do I need to change?

Tomorrow/Wednesday: Find a base
EOW: Identify Issues
Next Week or Two: Fix issues and work on implementations as I go
After: Start from ground up. Work on Implementation

In order to find a base I need to know how a system is governed. This might not be the easiest information to find. I will have to rely on implementation of platform governance using product mechanisms as there are more publicly available. Could I use a combination of different bases. e.g., a DAO for community governance, Ethereum for platform governance, and something else for data. Is that a good way of splitting it up. How can I leverage existing governance of organisations such as the Linux Foundation. 

---

# 29/11
I have decided to start from a base such as ethereum and adapt it to what I need. By doing this I will either create a solution or gain a much better understanding of the problems which would allow me to create my own solution from the ground up.

Possible starting points
- swarm.city
- alastria
- various DAOs
- ethereum
- bitcoin

The governance of a blockchain can be split into four main components: platform, community, apps, data. It is possible that I will choose a different starting point for each component.

How am I going to choose a base? I need to decide on some criteria. What does it need to accomplish? Are there any vendor solutions that are close to what we want? I think its not as easy as I thought to understand fully the governance of a blockchain project from its website.

- needs to be a permissioned blockchain. I think? maybe not. 

[[Enhanced immutability of permissioned blockchain networks by tethering provenance with a public blockchain network]]
[[LACChain Framework for Permissioned Public Blockchain Networks – From Blockchain Technology to Blockchain Networks]]

---

# 30/11

Yesterday
- looked at swarm city, alastria, etherum, polymesh as bases.
- Tried to read some papers about public permissioned blockchain. some good. 4 of them most cited were in chinese so I couldn't read them
- i read about lacchain and the tethering blockchain papers. tethering would allow you do leverage the security that public chains get from have a large number of participants without having to have that many participants
- started to think about what I am looking for in a base. I realised I still dont really know and that starting from a base might not actually help me to find that out. I need to identify issues with current systems, because to me it seems like I could almost just use an existing p- maybe not. I think I just need to write down a basic overview of what I want, then work out the details later.

Meeting with david
- I should look into some specific scenarios and how they might play out within existing closed blockchain systems. e.g.,
	- kicking out one or more participants
	- forking due to not trusting or agreeing with other participants
	- what if one participant is a bad actor and the other want to remove them, but the bad actors vote is required
- The idea of tethering a closed blockchain to a public blockchain is worth exploring further
- Within the veracity project (or outside it), rather than acting directly as a source of truth, a blockchain should act as a store of records that can then be used by relevant authorities to make decisions – which can then be recorded on the chain
- maybe consider something related to a reputation system like ebay (talk to andrew), trademe, etc
- regarding scope: this is something I need to think about. Does it make sense to have a closed blockchain with 100s or 1000s of participants. This is somewhere where we would likely have a small group of validator nodes and many less-priviledged participant nodes
- my role is this project is exploratory. By considering many small (or big) scenarios, I might eventually find one which breaks the existing architectures and I can then work on a solution for that.
- I should spend some time to try and get the prolog kernel working
	- try rolling back to an earlier version
- also test the aforementioned scenarios using a small network of ~10 participants

**Scenario 1**
What happens if one participant turned bad and the other wanted to remove them from the group. Ssay we havea grup of 10 participants in a closed blockchain system using a CFT consensus algorithm Then they can be voted out so that their vote is desregarded and so they cant view or access data on the chain. what if they require access to decuments stored on-chain which they dont have local copies of. I guess they wuld have access to a stored copy of the blockchain on their node. But then would this chain be considered valid by oters. they dont store the actual document on the blockchain – only a timestamped hash to prove they had that doc at this particular time. participats should keep local copies of documents. Can participants kick out the initiating authority? You would have some mechanism to ensure that they cant be kicked out. firstly there would have to be a vote to kick them out. unless they aren't actually needed. who are the people that look at the documents to check them. Some third party collectively employed by the group? the govt? maybe its required for each participant to sometimes go and check if other participants are being truthful.

# 01/12
Yesterday
- had a good chat with david.
- decided to spend some more time trying to get the prolog kernel to work
- instead of designing the whole governance system, I'll look how some scenarios might play out within existing closed blockchain systems. Hopefully after ive done a lot of those I will run into some scenarios where the existing system is not good enough and then I can try to improve on it.
- for example say we have a closed chain with 10 participants, and 4 of them are unhappy with the something about how the blockchain is being run. what happens then? can they just fork? how would that work? etc

Today
- read some papers
- think abt some scenarios
- work on swipl notebook

**Scenario 2**
Within an existing closed BC with 10 participants. say we wanted to add another participant as a validator node. they run the node software on a machine. this node is fully priviledged. they new member had to go through a screening and sign a legal contract to ensure they are not a bad actor. this node recieves a copy of the blockchain so far, and begins participating in the consensus algorithm and submitting transactions. their contract is added to the blockchain as their first transaction (maybe. or it can be stored somewhere else). 

**Scenario 3**
 The new participant makes a mistake and puts the entire document instead of just a hash. this document is sensitive and contains data that should be kept private. 
 - automatically perform some checks to ensure the data lodged during a transaction is always just a hash.
 - is this the responsibility of the participant or the network to prevent. should be participant but that doesn't mean there shouldn't be some checks that the network can do 
 - do we want to store data other than hashed documents.
 - if the document is lodged on the BC can the consortium agree to remove it by doing basically a hard fork
	 - what happens to the other side of the fork? just stops. 
 - i guess thats a lot easier in a closed BC than an open one

# 02/12
Yesterday
- spent about a ½ hr figuring out how to edit the code running in the docker container. then I added more logging and found which line was breaking. `prolog.consult(f.name)`. `prolog` is from the `pyswip` package. so ill try a previous version of that today.
- considered two scenarios: uploading a document not a hash and adding a member to the chain
- and read two papers: [Defining Blockchain Governance — A Framework for Analysis and Comparison](notes/Defining%20Blockchain%20Governance%20—%20A%20Framework%20for%20Analysis%20and%20Comparison.md) and [Decision Problems in Blockchain Governance — Old Wine in New Bottles or Walking in Someone Elses Shoes](notes/Decision%20Problems%20in%20Blockchain%20Governance%20—%20Old%20Wine%20in%20New%20Bottles%20or%20Walking%20in%20Someone%20Elses%20Shoes.md)

today
- get kernel to work
- read more papers
- tink about more scenarios+

The SWIPL notebook is working. just need to change the version of pyswip back to 0.2.9. now what code can I work on in the afternoons? 

**Scenario 3 cont.**
If someone uploads a document by accident that is sensitive, then the chain hard forks to remove it from the history, is it still publicly available (to the members of chain) or is the old fork erased. bu then what if someone stored a local copy (which they do). maybe the local copy is stored encrypted and the owner of the document has the key to unlock it.

**Scenario 4**
what if someone found a security vulnerability in the code. would they exploit it? how to change the code. would there be a different process to normal code changes for something critical like this. within the blockchain wallets/accounts are linked to a real world identity. but i guess the person who found the vulnerability could easily (note the "person" is a member of an organisation who has access to the code) tell someone else who is not identifiable and have them exploit the vulnerability. how do organisations decide who has access to the code. if the person does not decide to try to exploit it, they have to bring it to the attention of others or try to fix it themselves. 

---
