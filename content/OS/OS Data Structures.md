---
title: "OS Data Structures"
tag: os
date: 
alias:
---

[[Operating Systems]] are programs, so they also have data structures

- [[Process]] list – track the state of each process
	- Running processes
	- Currently running processes
	- Blocked processes

xv6 kernel proc structure:
```C
// the registers xv6 will save and restore
// to stop and subsequently restart a process
struct context {
int eip;
int esp;
int ebx;
int ecx;
int edx;
int esi;
int edi;
int ebp;
};
// the different states a process can be in
enum proc_state { UNUSED, EMBRYO, SLEEPING,
RUNNABLE, RUNNING, ZOMBIE };
// the information xv6 tracks about each process
// including its register context and state
struct proc {
	char *mem; // Start of process memory
	uint sz; // Size of process memory
	char *kstack; // Bottom of kernel stack
	// for this process
	enum proc_state state; // Process state
	int pid; // Process ID
	struct proc *parent; // Parent process
	void *chan; // If non-zero, sleeping on chan
	int killed; // If non-zero, have been killed
	struct file *ofile[NOFILE]; // Open files
	struct inode *cwd; // Current directory
	struct context context; // Switch here to run process
	struct trapframe *tf; // Trap frame for the
	// current interrupt
};
```

- Register context
	- Holds the contents of register state for a stopped process
	- When a process is stopped, its register state will be saved to this memory location
	- By restoring these registers (i.e., placing their values back into the actual physical registers), the OS can resume running the process.
- Initial state
	- State of process when it is being created
- Final/zombie state
	- Exited but has not been cleaned up
	- Can be helpful for examining return code to determine execution success