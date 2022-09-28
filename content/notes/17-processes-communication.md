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

fork returns a value. 0 for the parent, and the id of the child for the child

everything the same as the parent except the child has a differnent process ID. e.g., when they start they the same heap location etc. but as the child runs it may change.

if you kill the parent before the child the child becomes an orhpan process
if yo ukill the child while the parent is waiting for the child the parent becomes a zombie (defunct) process. -- but only if the parent doesn't wait for the child.

the child process can also call exexlp (load program) which erases the copy of the parent (itself not the parent)
- when initally forked the child and parent share the same space
- when the child calls execlp then the child will fully copy the program to a new memory location so it doesn't overwrite the parent

# communcation between parent and child
process create a chld process to do a task. but they need to communicate

after a process calls a chld process. it can execute a wait system call.

this moves a process off the ready queue, untill the chld process has terminated
when the child process has terminated, it can return its status to the parent.

# process termination
automatically executes exit after the last statement.
- may return status to parent who is `wait`ing
- all rsouces are dallocated by the OS

 they can also die more violently
 

# signal and pipe for inter process communication
