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
- response time - (for a signle process) average timefrom the submission of a request to a process util the first response in produced

# Scheduling algorithms

