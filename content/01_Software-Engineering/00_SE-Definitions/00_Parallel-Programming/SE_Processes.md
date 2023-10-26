#Software-Engineering 

---
## # Processes

A process is a program being executed.
	Process - made out of threads
Processes are managed by the operating system.

![[Pasted image 20230913122451.png]]

## # Consumption

- A process can take up several resources, mainly CPU and Memory (RAM)
- A process can be executed on one ore more CPU cores and thus takes up a percentage of it’s computing power
	Console-Application - takes one core 
- A process can allocate memory in RAM
---
## # Process management

- The operating system can execute more processes than the number of available cores.
- This happens by scheduling the CPU computing time and deviding/sharing it between the processes.

## # Process management (2)

- The OS manages processes using **process tables**.
- They contain the necessary information to control their execution.
- Entries in a process table are called **process control block (PCB)**.
------
## # Process Control Block (PCB)

- Contains:
    - Process Identification (PID)
    - Resources requested by the process (e.g. files)
    - Area of the memory allocated by the process.
    - Process State
    - Contents of the process register

![[Pasted image 20230913123757.png]]

## # Process execution

A process is executed by the operating system by loading it’s registers from the PCB into the CPU

## # Process execution (2)

- A process is being executed if it is assigned to a CPU (and a CPU-Core).
- It’s state will then change to **Running**.

## # Process execution (3)

- Processes are being controlled by changing their states
- We can abstract 3 states:
    - Running
    - Ready
    - Blocked

----
## # Process states

- Running
    - The process is being executed - active on CPU
- Ready
    - The process waits until the OS assigns a CPU to it
- Blocked
    - The process needs an external resource
    - Until the resource can be loaded by the OS, the process will remain in the state **Blocked**.

![[Pasted image 20230913124115.png]]

---
## # Parallel vs. Concurrent

- A system is said to be <mark style="background: #D2B3FFA6;">CONCURRENT</mark> if it can support two or more action in progress at the same time.
	scheduling - at first: Task1 - then: Task2
- A system is said to be <mark style="background: #D2B3FFA6;">PARALLEL</mark> if it can support two or more actions executing simultaneously.
	2 processes on 2 cores at the same time

![[Pasted image 20230913124534.png]]

---

![[Pasted image 20230913124553.png]]

---
## # Concurrent

- Concurrent execution means two or more processes share the same CPU core.
- The CPU will rotate through the processes giving each processes a certain amount of execution time, before switching to the next process.
- When switching a process, the data of the process will be written into memory and the content of the next process will be loaded into the register of the CPU.

- Loading a new process into the CPU is called **context switch**.
	one CPU switches from one process to another
- A **context switch** is a time consuming operations. Many context switches will slow down the system.
---
## # Context Switch

![[Pasted image 20230922081028.png]]

## # Context Switch (2)

- A context switch consists of these steps:
    - Updating and saving the current PCB
    - Selecting the next process for execution
    - Restoring and updating the PCB of the new process.