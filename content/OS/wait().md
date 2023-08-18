---
title: "wait()"
tag: os
date: 
alias:
---

An example of [[UNIX System Calls]].
Useful for a parent to wait for a child process to finish what its been doing. 
- `waitpid()` is a more complete version

Here is an example using `wait()`:
```c
int main (int argc, char *argv[]){

	printf("hello world (pid:%d)\n", (int) getpid());

	int rc = fork();

	if (rc < 0){ // fork failed
		fprintf(stderr, "fork failed\n")
	}

	else if (rc == 0){ // child (new process)
		printf("hello, I am child (pid:%d)\n", (int) getpid());
	} 

	else {
		int wc = wait(NULL);
		printf("hello, I am parent of %d (wc:%d) (pid:%d)\n", 
				rc, wc, (int) getpid())
	}
	
	return 0;
}
```
```bash
prompt> ./p2
hello world (pid:29266)
hello, I am child(pid:29267)
hello, I am parent of 29267 (wc:29267) (pid:29266)
prompt>
```

In this code, if the parents run first  such that `rc > 0`, it will immediately call `wait()`, which won’t return until the child has run and exited.
Thus, even if the parent runs first it’ll wait for the child to finish