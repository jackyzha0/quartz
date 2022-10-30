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

# critical sections
guarantee that certain sections of coopeating processes are not interleaved to avoid data race problem

only one process can execute critical section at a time

![locking examle](https://i.imgur.com/YTqizzt.png)

but there is a data race problem for locking the processes!

# hardware locking
disalow interrupts while a shared variable is being modified. only works for one CPU

modern computers have special **atomic instructions**
- CompareAndSwap
- testAndSet

`CAS(0, a, n)`: If the value at address a is o, write the value n to address a and then return true; Otherwise, return false, where o and n are integers, and a is the address of a memory location.

# CAS based LOCK function
![slide|400mp](https://i.imgur.com/aeS3HGS.png)

![locked producer and consumer|400](https://i.imgur.com/LQfdIVC.png)

still has busy waiting problem

# Semaphores
tool for sync using atomic operations

a semphore S is an integer variable that can only be accessed via two functions fo system calls

``` c
//Wait(S): 
while S <=  do no op;
S := S-1;

//Signal(S):
S := S + 1;
```

implementaion using CAS
``` c
//Wait(int *S): 
again: 
	T = *S;
	if (T <= 0) goto again;
	if(CAS(T, S, T-1) == false) goto again;
//Signal(int *S): 
again: 
	T = *S;
	if(CAS(T, S, T+1) == false) goto again;	

```

## for mutual exclusion
![slide|400](https://i.imgur.com/fkBl7PR.png)


