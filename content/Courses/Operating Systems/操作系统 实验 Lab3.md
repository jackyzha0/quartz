## Environment
Linux in Virtual Machine on Silicon Mac
## Abstract 
实验目标
- Understand the difference between spawn, fork, exec, and wait, and using the knowledge to implement spawn.
- Understand the purpose of a scheduler and how to implement the stride scheduler algorithm.

实验要求
- Our goal was to pass the following tests
```shell
make -C user CHAPTER=5 BASE=0
make test CHAPTER=5
make test BASE=1
```
## Experiment
### Base Tests
Running `git checkout ch5` and running `make run`, I get the following result
![](https://s2.loli.net/2023/02/02/4V3pRiTQvECFhrb.png)

But, running `make test BASE=1`, we get 
![](https://s2.loli.net/2023/02/02/bJVERFBcMoQpglC.png)
We have entered the C user shell, here we can run any of the programs
![](https://s2.loli.net/2023/02/02/Nf2LMYqHcZFudrh.png)

After merging using `git merge ch4`, and handling conflicts, running `ch5_mergetest` , we can pass all the test cases, so we can begin our experiment.

### Spawn
In order to implement spawn, we 
```cpp
uint64 sys_spawn(uint64 va); // syscall.c -> call spawn function
int spawn(char *filename);   // proc.c -> process creation without memory copying, simulate posix_spawn
```

Our main spawn algorithm is defined in `spawn(char *filename)`
```cpp
int spawn(char* name){
	// fork
	int pid;
	struct proc *np; // new process
	struct proc *p = curr_proc(); // current processes
	// Allocate process.
	if((np = allocproc()) == 0) {
		panic("allocproc\n");
	}
	// Copy user memory from parent to child -> don't need
	// Copy saved user registers -> don't need
	// Cause fork to return 0 in the child.
	pid = np->pid; // child processes id
	np->parent = p;
	np->state = RUNNABLE;
	//exec
	int id = get_id_by_name(name);
	// dont have to free mem bc never copied
	if(id < 0) { // app doesn't exist
		return -1;
	}
	loader(id, np);
	return pid;
}

```

We should pass the following tests
1. `ch5_spawn0`
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/* 理想结果：生成 MAX_CHILD 个 getpid 的子进程，全部结束后，输出 Test spawn0 OK! */
const int MAX_CHILD = 40;

int main() {
	for (int _ = 0; _ < MAX_CHILD; ++_) {
		int cpid = spawn("ch5b_getpid\0");
		assert(cpid >= 0); // "child pid invalid"
		printf("new child %d\n", cpid);
	}

	int exit_code = 0;
	for (int _ = 0; _ < MAX_CHILD; ++_) {
		assert(wait(&exit_code) > 0); // "wait stopped early"
		assert_eq(exit_code, 0); // "error exit code"
	}
	assert(wait(&exit_code) < 0); // "wait got too many"
	puts("Test many spawn OK!");
	return 0;
}
```

Running this test, we get 
![](https://s2.loli.net/2023/02/02/13lQuXbVjNgLeAD.png)


2. `ch5_spawn1`
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
/// 程序行为：先后产生 3 个有特定返回值的程序，检查 waitpid 能够获取正确返回值。
/// 理想输出：
/// new child i
/// Test wait OK!
/// Test waitpid OK!
int main() {
	int cpid = spawn("ch5_exit0\0");
	assert(cpid >= 0); // "child pid invalid"
	printf("new child %d\n", cpid);
	int exit_code = 0;
	int exit_pid = wait(&exit_code);
	assert_eq(exit_pid, cpid); // "error exit pid"
	assert_eq(exit_code, 66778); // "error exit code"
	puts("Test wait OK!\n");
	int cpid0 = spawn("ch5_exit0\0");
	int cpid1 = spawn("ch5_exit1\0");
	int cpid2 = spawn("ch5_ppid\0");
	exit_pid = waitpid(cpid1, &exit_code);
	assert_eq(exit_pid, cpid1); // "error exit pid"
	assert_eq(exit_code, -233); // "error exit code"
	exit_pid = waitpid(cpid0, &exit_code);
	assert_eq(exit_pid, cpid0); // "error exit pid"
	assert_eq(exit_code, 66778); // "error exit code"
	exit_pid = waitpid(cpid2, &exit_code);
	assert_eq(exit_pid, cpid2); // "error exit pid"
	assert_eq(exit_code, getpid()); // "error exit code"
	puts("Test ppid OK!");
	puts("Test waitpid OK!");
	return 0;
}
```

Running this test, we get 
![](https://s2.loli.net/2023/02/02/QRVEp8S2Pv1kfbJ.png)

### Stride 调度算法
We also implement our priority scheduling algorith, stride scheduling algorithm
> Stride scheduling aims to sequentially allocate a resource for the duration of standard time-slices (quantum) in a fashion, that performs periodic recurrences of allocation. Thus, a process p1 which has reserved twice the share of process p2 will be allocated twice as often as p2. In particular, process p1 will be allocated two times every time p2 is waiting for an allocation 

Stride Scheduling Algorithm
1. Set the current `stride` for each process, representing the processes running "length". Also set a corresponding `pass` value , which represents the cumulative value onto `stride` after being scheduled.
2. Every time a scheduling is required, select the process with the smallest stride from the process pool that is in a `RUNNABLE` state. For the process P that gets the scheduled, add the corresponding `stride` to its corresponding step length `pass`.
3. After a time slice, go back to the previous step and reschedule the current process with the smallest `stride`.

$$
	\text{P.pass} = \frac{\text{BigStride}}{\text{P.priority}}
	$$ where `P.pass` represents a proccess pass value, and `P.priority` represents a processes priority value, and `BigStride` represents a predefined large enough constant, the `pass` value will be porportional to its priority.

In short, HIGHER prority, LOWER pass, which results in shorter stride after stride + pass, thus process with lowest stride will be picked to schedule earlier.

To implement this algorithm, I had to update these functions
```cpp
uint64 sys_set_priority(long long prio);  // syscall.c -> call int priority function
int priority(long long prio);             // proc.c -> set P->prio and P->pass
struct proc *alloc_proc();                // proc.c -> initialize stride
void syscall();                           // syscall.c -> hand sys_setpriority interrupt handler
void scheduler()                          // proc.c -> implement new scheduler logic to pick process with lowest stride
```

To set priority, I called `priority(long long prio)`, and the function is defined as such
```cpp
int priority(long long prio) {
	struct proc *p = curr_proc();
	if (prio >= 2 && prio <= 2147483647) {
		p->prio = prio;
		p->pass = BIG_STRIDE/p->prio;
		return prio;
	} else { // stride 调度要求进程优先级 ≥ 2，所以设定进程优先级 ≤ 1 会导致错误
		return -1;
	}
	return -1;
}
```

And our `scheduler()` function uses a brute force method to scan all process and pic the process with the smallest stride
```cpp
void scheduler() {
	struct proc *p;
	for (;;) {
		struct proc *chosen = 0;
		int has_proc = 0;
		for (p = pool; p < &pool[NPROC]; p++) {
			if (p->state == RUNNABLE && (!chosen || p->stride < chosen->stride)) {
				tracef("swtich to proc %d", p - pool);
				has_proc = 1;
				// Lab3 
				chosen = p;
			}
		}
		if(has_proc == 0) panic("all app are over!\n");
		chosen->state = RUNNING;
		chosen->stride += chosen->pass; //将对应的 stride 加上其对应的步长 pass
		current_proc = chosen;
		swtch(&idle.context, &chosen->context);
	}
}
```

We have to pass this test case 
`ch5_setprio`

```cpp
#include <stdio.h>
#include <stddef.h>
#include <stdlib.h>
#include <unistd.h>
/// 正确输出：（无报错信息）
/// Test set_priority OK!

int main() {
	assert_eq(set_priority(10), 10);
	assert_eq(set_priority(INT_MAX), INT_MAX);
	assert_eq(set_priority(0), -1);
	assert_eq(set_priority(1), -1);
	assert_eq(set_priority(-10), -1);
	puts("Test set_priority OK!");
	return 0;
}
```

### Chapter 5 测试
After implementing the above, we should be able to pass all test cases
`make test CHAPTER=5`
Looking at the pipeline, we get, 

## Conclusion
I though this experiment was relatively simple compared to the previous experiment, and it took a lot less time to complete.

### 问答作业
stride算法深入
stride 算法原理非常简单，但是有一个比较大的问题。例如两个 pass = 10 的进程，使用 8bit 无符号整形储存 stride， p1.stride = 255, p2.stride = 250，在 p2 执行一个时间片后，理论上下一次应该 p1 执行。
- **实际情况是轮到p1执行吗，为什么？**【解答】Since, if we were to use 8bit unsigned, then after P2 executes for a time slice, `p2.stride` = 250 + 10 = 4, which is less then `p1.stride == 255`, so actually p2 will be executed next.
我们之前要求进程优先级 >= 2 其实就是为了解决这个问题。可以证明，**在不考虑溢出的情况下**, 在进程优先级全部 >= 2 的情况下，如果严格按照算法执行，那么 STRIDE_MAX – STRIDE_MIN <= BigStride / 2。
- **为什么**？The processes corresponding to `STRIDE_MIN` should be executed at the next time slice, at this moment, `MAX_STRIDE' = max(MAX_STRIDE, MIN_STRIDE + BigStride / priority)`, and since priority is bigger than 2, then `MAX_STRIDE' <= max(MAX_STRIDE, MIN_STRIDE + BigStride/2`, , which fits the 
已知以上结论，**在考虑溢出的情况下**，假设我们通过逐个比较得到 Stride 最小的进程，请设计一个合适的比较函数，用来正确比较两个 Stride 的真正大小：
```cpp
typedef unsigned long long Stride_t;
const Stride_t BIG_STRIDE = 0xffffffffffffffffULL;
int cmp(Stride_t a, Stride_t b) {
    if (a == b) return 0; // if exact same
	if (a < b) {
		return b - a <= BIG_STRIDE / 2 ? -1 : 1; // ret 1 if smaller
	} else {
		return a - b < BIG_STRIDE / 2 ? -1 : 1; //
	}

}
```