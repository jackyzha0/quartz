---
title: "19-cpu-scheduling"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-11-27
sr-interval: 16
sr-ease: 250
---

why shedule?
- keep cpu busy (cpu utilisation)
- so processed dont hae to spend time waithing for the CPU
	- even if cpu is always busy executing processses in different orders can change the average time spent in queue
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
- provably optimal average waiting time

con
- never know in advance what the length of next cpu burst will be
- possibility of long processes never being executed
	- starvation of process
- not "fair"

### predicting next burst time
machine learning sorta - burst length predicted from previous CPU bursts using exponential average equation
![example|400](https://i.imgur.com/pPydNXN.png)

preemption example
- p1 is executing
- p2 arrived with burst time shorter that remainging bust time of P1
	- non preemptive - P1 finishes
	- preemptive - P2 takes CPU

![example|400](https://i.imgur.com/oJbB3d4.png)

## Priority scheduling
- each process allocated a priotit when it arrives
- cpu is allocated to the process with the highest priority

low number is a higher priority

- non preemptive - run processes until finished
- preemptive - higher priority process should take over CPU when they arrive

SJF is a type of priority scheduling where the priority is based on the estimated next cpu burst

![example|400](https://i.imgur.com/lLhSjtY.png)


## Starvation and aging
starvation occurs when a proces waits indefinitely to be allocated the CPU

aging - as a process waits its priority increases

## Round Robin
commonly used today

designed for time sharing systems
- small unit of time (time quantum) if defined
- ready queue is treated as a circular list
- cpu schedular goes round the ready queue, allocating the CPU to each process for a time interval up to 1 time quantum

![slide|400](https://i.imgur.com/7swmOID.png)
![example|400](https://i.imgur.com/Crl3xOz.png)

choosing time quantum
- if infinitely large - we have FCFS
- if very small - we have processor sharing - lots of overhead for switching

![pros/cons](https://i.imgur.com/aDemb5s.png)
