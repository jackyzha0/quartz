---
title: "sequential-circuits"
aliases: 
tags: 
- cosc204
---


[combinatorial-logic-circuits](notes/combinatorial-logic-circuit.md) always  produce the same outputs given the same input. Sequential curcuits on the other hand, produce different outputs depending on past history and the inputs. 

![combinatorial vs sequential](https://i.imgur.com/GbfAZ4c.png)

There are two main types of sequential circuit
- Sychronous
	- this is when changes of state occur in time with a clock cycle
	- changes of input occur between clock pulses
	- state changes occur at the clock pulses
- Asynchronous
	- state changes occur as the inputs occur
	- event driven

# Main circuits
## SR latch
The set reset latch is the most basic and simple sequential circuit

![sr latch](https://i.imgur.com/mhXd77i.png)

