---
title: "YAC — BFT Consensus Algorithm for Blockchain"
tags: paper, blockchain
date:
authors:
---

link: https://doi.org/10.48550/arXiv.1809.00554

# Summary
This is the algorthm used in Hyperledger Iroha. 

# Extracts

1. A client forms a transaction with commands and signs it with their private key. 
2. The client sends the transaction to a peer. The peer receives the transaction, performs stateless validation (i.e., verifies that it is not malformed), and relays it to the OS. 
3. The OS generates a proposal and sends it to the peers. The proposal contains an ordered list of transactions that will be potentially added to the blockchain in this round. 
4. The proposal is sent to the voting peers. Peers enter the collaboration phase, during which they exchange votes across the network and decide on a block. More details on the collaboration phase are provided in Section V. 
5. The peer commits the block to their local block store.

# Notes
Consensus [7] should guarantee liveness of the system, security, and convergence (consistency) of data stored in the ledger

# Related
