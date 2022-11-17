---
title: "transaction-finality"
tags: 

---


https://smithandcrown.com/glossary/transaction-finality-probabilisticdeterministic/

Generally, transaction finality refers to the moment when parties involved in a transaction can consider the transaction to be completed. More specifically, this is the moment when it becomes impossible to revert or alter a transaction that has been added to the [blockchain](https://smithandcrown.com/glossary/blockchain). Transaction finality can be either deterministic or probabilistic.

Probabilistic finality occurs when a transaction’s finality increases as more blocks are added to the blockchain after the transaction. That is, as more blocks are added, the transaction is further referenced in the blockchain and becomes increasingly difficult to revert or alter as a result (see [Double Spend](https://smithandcrown.com/glossary/double-spend)). For most protocols providing probabilistic finality, there is a recommended number of blocks to be added following the transaction until it can be considered complete. For example, it is recommended that one wait until six additional blocks have been added to the [Bitcoin](https://smithandcrown.com/projects/bitcoin) blockchain before considering a transaction to be final. The majority of major cryptoassets offer probabilistic finality.

Deterministic finality occurs when a transaction is immediately considered to be final once it is added to the blockchain. For this to happen, a “leader” must propose a block to be added, and then a specified portion of validators must approve it. Deterministic finality is less common and is only provided by Practical Byzantine Fault Tolerance-based (PBFT) protocols such as Tendermint