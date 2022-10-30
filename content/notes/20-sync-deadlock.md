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

semaphore without busy waiting ![](https://i.imgur.com/bLzY5q3.png)
![mutex|400](https://i.imgur.com/fkBl7PR.png)
![producer consumer again](https://i.imgur.com/ZN8bonW.png)

range of semaphore init vals
- 1 for mutex
- 0 for process sync
- >1 for concurrent processes/threads

- negative values tell us how many processes are waiting

# Deadlock
Definition of deadlock: a set of processes is in a deadlocked state if every process is waiting for an event that can only be caused by another process in the set.

![slide|400](https://i.imgur.com/XTSVwVI.png)

conditions
- mutual exclusion: at least one of the held resources must be nonsharable
- hold and wait: must be at least one process holding a resource and one waiting
- no preemption: a resource can only be released by the process thats holding it
- circular wait: 
	- P1 is waiting on a resource held by P2; 
	- P2 is waiting on . . . 
	- Pn is waiting on a resource held by P1.

typical solution
- break wait by acquiring lock in the same order
- ![](https://i.imgur.com/tDCTXWu.png)

os solution
- ![](https://i.imgur.com/1qHM2w0.png)
