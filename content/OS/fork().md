---
title: "fork()"
tag: os
date: 
alias:
---

An [[UNIX System Calls|UNIX System Call]] used to create a new processes.

Let’s say we have the following code and output:
```c
int main (int argc, char *argv[]){

	printf("hello world (pid:%d)\n", (int) getpid());
	
	int rc = fork(); // Fork system call!

	if (rc < 0) { // fork failed; 
		fprintf(stderr, "fork failed\n"); 
		exit (1);
	}

	else if (rc == 0){ // child (new process)
		printf("hello, I am child (pid:%d)\n", (int) getpid());
	}

	else { // parent goes down this path (main)
		printf("hello, I am parent of %d (pid:%d)\n", rc, (int) getpid());
	}

	return 0;
}
```
```bash
prompt> ./p1
hello world (pid:29146)
hello, I am parent of 29147 (pid:29146)
hello, I am child (pid:29147)
prompt>
```

- First prints out hello world with a process identifier (PID)
- Process calls the `fork()` system call, which the OS provides as a way to create anew process
- The process that is created is an (almost) *exact copy of the calling process*
	- To the OS, there are two instances of the program `p1` running, and both are about to return from the `fork()` system call
- The newly created child process doesn’t start running in `main` (note that the hello world message was only printed once!) but comes to life as if it had called fork itself
- While the child is identical in many ways, the value it returns to the caller of `fork()` is different – the parent receives the PID of the newly-created child but the child returns 0

It should also be noted that the output is not deterministic, as there is some randomness involved with how the CPU may choose to schedule which process runs first, the parent or the child. In some cases, the child may run first. 