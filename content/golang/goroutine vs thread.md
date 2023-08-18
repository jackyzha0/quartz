---
title: "Goroutine vs Thread"
tags:
- goroutine
- thread
weight: -4
---

## Concurrency
- Concurrency allows program how to **deal** with multiple things at the same time
	- Eg: one person is responsible for receiving the order and making food concurrently
### Concurrency on Single-Core CPU
- On a single core CPU. the single core (processor) might trick you to think that it’s executing multiple tasks at once, when in fact what happens is that the task execution in the processor is overlapping, meaning that each task is given a time window on the processor to run on, then it would be replaced with another task to be executed on that processor.
- Eg: If we have task “A”, “B” The processor might first assign task “A” 5 microseconds to execute on it, then even though task A needs more time to finish, it tells task “B” to take over and do the computation it needs for let’s say another 5 microseconds. And finally when task “B” is done executing, task “A” can start processing again for another 5 microseconds
## Parallelism
- It refers to a CPU can handle multiple tasks at the same exact time
## Process
- Process is the instance of the program that is being executed by one or many threads
- At the beginning, CPU can only handle only one process at the time
- Multi processing is introduced to solve problem by *time sharing model*
- **time sharing** is the way to share resources between processes, allows them run parallel
- But it is just illusion, under hood of it is **context switch**, it means CPU 
## Thread
- A **thread** is an execution context, which is all the information a CPU needs to execute a stream of the instructions
- Java threads map directly to OS threads
- Threads are created and managed in different ways
	- 1-1
	- n-1
	- n-n

![](/golang/attachment/thread-mapping.png)

## Goroutine
- It is **logical processor** (NOT physical processor). Each of these are bound to a single OS thread
```
OS Thread ------ Logical Processor ------ Goroutine 1, Goroutine 2..... Goroutine n
```
