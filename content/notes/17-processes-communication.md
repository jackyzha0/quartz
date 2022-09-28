---
title: "17-processes-communication"
aliases: 
tags: 
- cosc204
- lecture
---

![process tree example](https://i.imgur.com/4ysHisl.png)

# cooperating processes
defn: coop process -  execution of one process can affect the execution of another. e.e.g, processes for aprallel computing, threads for multithreading.

defn: independent process - one does not affect the other and they do not communicate etc

# creating a child process
A child process is creating from a parent using fork.
everything the same as the parent except the child has a differnent process ID.

# communcation between parent and child
process create a chld process to do a task. but they need to communicate


# signal and pipe for inter process communication
