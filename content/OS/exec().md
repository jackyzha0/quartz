---
title: "exec()"
tag: os
date: 
alias:
---

An [[UNIX System Calls|UNIX System Call]].
This is useful when you want to run a program that is different from the calling program.
`fork()` is only useful if you want to keep running copies of the different program, while exec lets you run a different program.

Example:
```c
int main(int argc, char *argv[]){

	printf("hello world (pid: %d)\n", (int) getpid());
	
	int rc = fork();
	
	if (rc < 0){ // fork failed; exit
		fprintf(stderr, "fork failed\n");
		exit(1);
	}

	else if (rc == 0){ // child (new process)
		printf("hello, I am child (pid: %d) \n"), (int) getpid());
		
		char *myargs[3];
		myargs[0] == strdup("wc"); //program: "wc" (word count)
		myargs[1] == strdup("p3.c"); //argument: file to count
		myargs[2] == NULL; //marks end of array

		execvp(myargs[0], myargs); //runs word count
		printf("this shouldn't print out");
	}

	else { // parent goes down this path (main)
		int wc = wait(NULL);
		printf("hello, I am parent of %d (wc: %d) (pid: %d) \n", 
				rc, wc, (int) getpid());
	}
	return 0;	
}
```
```bash
prompt> ./p3
hello world (pid:29383)
hello, I am child (pid:29384)
	29    107    1030   p3.c
hello, I am parent of 29384 (wc:29384) (pid: 29383)
prompt>
```

Given the name of an executable (`wc()` in this case) and some arguments (e.g., `p3.c`), it loads code and static data from that executable and overwrites its current code segment (and current static data) with it.
The heap and stack and other parts of the memory space of the program are reinitialized. Then the OS simply runs that program, passing in any arguments as  `argv`  of that process. Thus, no new processes are *created*, but it transforms the currently running program (formerly `p3`) into a different running program (`wc`). After the `exec()` in the child, it is almost as if `p3.c` never ran; a successful call to `exec()` never returns.