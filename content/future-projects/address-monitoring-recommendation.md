---
title: Blockchain monitoring and recommendation engine
tags:
- blockchain
- monitoring
- machine learning
- security
date: 2024-01-03
lastmod: 2024-01-03
---

## TL;DR
The idea is to create an engine that
- takes in an address
- scrapes appropriate blockchains and that address' txn history
- performs analysis (ML) on its history to provide recommendations on 
  - things you could watch
  - recommended options for each other things: boundaries, booleans, white/black-lists, time-based action
- recommends a starting point on what to watch:
  - based on historial activity (_e.g._ $x$ amount over $y$ time, from $(x,y,z)$ account, etc)
  - based on blockchain/dapp trends*
- alert a user when a trigger is hit based on previously mentioned interests of the user
  
## Details
To be added, just needed to get the idea down.

---
*would require some database of this information and ongoing infra to pull and perform analysis