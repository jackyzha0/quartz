---
title: "Time-sharing"
tag: os
date: 
alias:
---

Method of virtualization (CPU).

By running one [[Process]], stopping it and running another, and so on, the OS can promote the illusion that many virtual CPUs exist when there’s actually only one
- Cost = performance; each process runs slower if CPU is shared
- Counterpart: space-sharing, where a resource is divided in space among those who wish to use it
	- Ex. Disk space is a naturally space-shared resource