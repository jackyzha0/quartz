---
title: "Goroutine vs Thread"
tags:
- goroutine
- thread
weight: -4
---

## Concurrency
Concurrency allows a program to manage multiple tasks simultaneously. For example, imagine one person handling both order reception and food preparation concurrently.
### Concurrency on Single-Core CPU
On a single-core CPU, it might appear as though the processor is executing multiple tasks simultaneously. However, what's actually happening is that task execution is overlapping. Each task is given a time window on the processor to run, and then it's replaced by another task. For instance, if tasks **A** and **B** are present, the processor might allocate 5 microseconds to task **A** for execution. Even if task **A** requires more time, it will yield to task **B** after 5 microseconds. Once task **B** finishes executing, task **A** resumes for another 5 microseconds.
## Parallelism
Parallelism refers to a CPU's ability to handle multiple tasks truly simultaneously.
## Process
A process is an instance of a program being executed by one or many threads. Initially, a CPU could handle only one process at a time. **Multi-processing** was introduced to address this limitation through a time-sharing model. Time sharing enables resource sharing between processes, allowing them to run in parallel. However, this is an illusion; underneath lies **context switching**, which involves the CPU.
## Thread
A thread is an execution context containing all the information a CPU needs to execute a sequence of instructions. In Java, threads directly map to OS threads. Threads do not switch between units of work, and they are created and managed using various methods such as the 1-1, n-1, and n-n models.

![](/golang/attachment/thread-mapping.png)

When a thread encounters an I/O call (e.g., reading a file), it becomes blocked. If all threads make system calls, incoming requests get queued.

![](/golang/attachment/request-thread.png)
## Goroutine
A **goroutine** is a logical processor (not a physical one). Each **goroutine** is bound to a single OS thread.
 ![](golang/attachment/goroutine.png)

In the diagram above:
- **M** represents an OS thread, functioning like a machine.
- **P** signifies the Go scheduler, acting as a processor.
- **G** denotes a goroutine.

The Go runtime schedules each goroutine internally for concurrent execution. However, when a goroutine makes a system call, such as in the following diagram:

![](golang/attachment/goroutine-sys-call.png)
As you can see, the goroutine that makes the system call is moved to the **NETPOLLER** and **P** continues to handle other goroutines. This prevents your program from becoming blocked.

## Summary
- Thread is good for *CPU bound* operation that needs strong computation 
- Goroutine is good for *IO bound* operation that allows a program can handle numerous tasks which does not strong computation just *IO operation* only

## Source
- https://tuhuynh.com/posts/nio-under-the-hood/
- https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html