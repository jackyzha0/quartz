---
title: "03-sequential-logic-circuits"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-08-03
sr-interval: 8
sr-ease: 250
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
- Set-reset latch ![sr latch](https://i.imgur.com/mhXd77i.png)
- D-type flip-flop ![delay flip flop](https://i.imgur.com/IpQfNRm.png)
- T-type flip-flop ![t flip flop](https://i.imgur.com/SZn2J94.png)
- JK-type flip-flop ![jk flip flop](https://i.imgur.com/OgfTehO.png), ![jk flip flop 2](https://i.imgur.com/8zJvDuw.png) [simulation](https://tinyurl.com/2bewwd7h)
- synchronous counter ![simulation](https://tinyurl.com/25olydjb), ![slide](https://i.imgur.com/81LS7HL.png)

# State transition

"if you are here and you get this then go here"

basis of all computing  (turing machine)

The computer memory is the current state, the instruction is where to go next