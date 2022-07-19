---
title: "03-sequential-logic-circuits"
aliases: 
tags: 
- cosc204
---

comb log. circuits always produce the same output with the same inputs

Sequential logic circuit output depends not only on the inputs but also past history (memory)

![combinatorial vs sequential](https://i.imgur.com/GbfAZ4c.png)


Two types:
- synchronous
	- changes of state happen in time with a clock cycle
	- input changes occur between clock pulses
	- state changes occur at the clock pulses
- asynchronous
	- We will not be studying these
	- State changes occur as changes in inputs occur
	- Event driven


# Memory circuits
- Set-reset latch
- D-type flip-flop
- T-type flip-flop
- JK-type flip-flop