---
title: "20-sync-deadlock"
aliases: 
tags: 
- cosc204
- lecture
---

# Bounded buffer problem
![slide|400](https://i.imgur.com/tdAllKY.png)

producer consumer problem

issues
- no data in buffe: consumer has nothing to consume
- buffer is full: no space for producer to produce

private vars
- in: next pos in buf to be writted
- out: next pos in buf to be read

shared variables
- buffer
- counter: number of items in buffer

waiting
- busy"