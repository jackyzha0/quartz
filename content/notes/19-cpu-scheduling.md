---
title: "19-cpu-scheduling"
aliases: 
tags: 
- cosc204
- lecture
---

why shedule?
- keep cpu busy (cpu utilisation)
- so processed dont hae to spend time waithing for the CPU
	- even if cpu is always bust executing processses in different orders can change the average time spent in queue
- cpu burst
	- ![](https://i.imgur.com/0eTDVVu.png)
	- (diagram is old the timing will have changed)
	- between burst - waiting for io
- so that interactive processes respond quickly
	- time spent waiting in total
	- average time between visits to CPU
	- ![](https://i.imgur.com/w9H7MZ7.png)

criteria
- CPU utilisation - % time CPU is busy
- throughput - number of processes completed per time unit
- turnaround time - (for a single process) length of time from submitted to completed
- waiting time - (for a single process) time spent waiting for the CPU
	- does include time wating for IO
- response time - (for a signle process) average time from the submission of a request to a process until the first response is produced

Preemption
- 4 situations for scheduling
	1. a process switches from running to waiting
	2. a process switches from running to ready (due to interrupt)
	3. a process switches from wauting to ready (due to comletion of IO)
	4. a process terminates
- non preemptive - scheduling take splace only under 1 nd 4, which has no choice
- premptive - scheduling can take place under 2 and 3 as well. that means a running process has to give way to the processes with higher priority

if you allow interruption it is preemptive

# Scheduling algorithms
## Gantt charts
The operation of  scheduling algortihm is commonly represented in a Gantt chart

![example chart|400](https://i.imgur.com/haqjMOW.png)
![gantt evaluation|400](https://i.imgur.com/iqtT90Q.png)

## First come first served (FCFS)
![diagram|400](https://i.imgur.com/yAd4LRl.png)

simplest method- executes processes in the ready queue on a first come first served basis

- when a proces become ready it is put at the tail of the queue
- when the currently executig process terminates, or waits for IO, the process at the front of the queue is selected next
- processes can come at any time - what if two at the same time? choose process with smallest ID to serve first

non-preemptive

pro
- easy to understand and implement
con
- waiting time bad
- convoy effect: lots of small process can get stuck behind a big on
- bad response time

fair but not efficient

## Shortest job first (SJF)
choose the job in the queue with the shortest burst time.

- equal burst time are executed FCFS (by process id)

![SJF example|400](https://i.imgur.com/nzwBwjc.png)

pro
- prova
