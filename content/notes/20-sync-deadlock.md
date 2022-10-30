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
- no data in buffe: consumer has nothing to consume: data race
- buffer is full: no space for producer to produce: busy waiting

private vars
- in: next pos in buf to be writted
- out: next pos in buf to be read

shared variables
- buffer
- counter: number of items in buffer

waiting
- busy: proces keeps checking (if buffer is still full) wasting CPU time
- non busy: suspend the process 

soution with shared array
```c
PRODUCER: repeat 
		...
		produce an item in nextp 
		...
		while counter = n do no-op;
		buffer[in] := nextp;
		in := in+1 mod n;
		counter := counter+1;
	until false;	
CONSUMER: repeat 
		while counter = 0 do no-op;
		nextc := buffer[out];
		out := out+1 mod n;
		counter := counter-1;

		...
		consume the item in nextc 
		...
	until false;
```

counter is a shared variable - causes a data race problem

![data race problem slide|400](https://i.imgur.com/qIz6FGU.png)
