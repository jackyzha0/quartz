---
title: "A blockchain architecture for industrial applications"
tags: 
date:
authors:
---

link: https://doi.org/10.1016/j.bcra.2022.100088

# Summary

# Extracts
"In open permissioned blockchains, the addition of a node and the downloading of the blockchain are granted to everyone. Validator nodes, however, must be approved, either automatically through a poll among existing validators, using a suitable SC, or by the consortium members. Deploying a new SC on the blockchain can be made only by participants with the permission to do so. Everyone can send transactions to the blockchain, but, as in public ones, it is the task of the SC receiving the transaction to decide whether to accept or not the request." - could be relevant to [[scenarios#Adding a new member]]

"in the case that some validators leave, this should trigger a search for new validators to keep the dApp stable." 
# Notes

# Related

# Abstract
Blockchain and the programs running on it, called smart contracts, are increasingly applied in all fields where trust and strong certifications are required. Our work focuses on industrial applications of blockchains and not on cryptocurrencies or tokens. We use frameworks to compare public and permissioned blockchains specifically suited for industrial applications. We also propose a complete solution based on Ethereum to implement a decentralized application, putting together in an original way, components and patterns already used and proven. This solution is characterized by a set of validator nodes running the blockchain using Proof-of-Authority or similar efficient consensus algorithms, by the use of an explorer enabling users to check the blockchain state, and the source code of the smart contracts running on it. From time to time, the hash digest of the last mined block is written into a public blockchain to guarantee immutability. The right to send transactions is granted by validator nodes to users by endowing them with the Ethers mined locally. Overall, the proposed approach has the same transparency and immutability as a public blockchain, largely reducing its drawbacks.