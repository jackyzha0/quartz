# 操作系统实验一
## Environment
I am using Ubuntu 20.04 Virtual Machine on a MAC M1 Machine. The cross compiler `gcc-riscv64-unknown-elf` and `riscv64-linux-musl-gcc` 
in the setup environment installation documentation did not work for me, receiving an error of 
```
cannot execute binary file: Exec format error"
```
This is probably because M1 is an ARM machine, and the given libraries were built for x86. So, I had to setup my environment for my Arm Ubuntu (arrch64) enviroment.

First I installed 
```
sudo apt install gcc-riscv64-unknown-elf 
```
and removed the path variable for `/usr/local/gcc-riscv64-unknown-elf/bin`
However, the cross compiler for musl was a bit more complicated, I used https://wiki.musl-libc.org/getting-started.html and https://github.com/richfelker/musl-cross-make/ this for reference on compiling musl for my machine.
```
cd Downloads
git clone https://github.com/richfelker/musl-cross-make.git
cd musl-cross-make
make TARGET=risc64-linux-musl install
cd output

vim ~/.bashrc
export PATH="$HOME/Downloads/musl-cross-make/output/bin:$PATH"
```
And it worked as expected
![](https://s2.loli.net/2023/02/02/oYRVTqjP3H2nvW7.png)
## Abstract

The goal of this experiment was to implement `sys_task_info` logic. This allows us to inquire about the currently performing task information, including information about the task control block (task status), the number of system calls used by the task, and the total running time of the task.
## Experiment
First, I defined the `SYS_task_info` id in `syscall_ids.h`. In `proc.h`, I defined the `TaskStatus` and `TaskInfo` data structures. 

```cpp
typedef enum { UnInit, Ready, Running, Exited, } TaskStatus;

struct TaskInfo {
	TaskStatus status;
	unsigned int syscall_times[MAX_SYSCALL_NUM]; // 500
	int time;
};
```

And added the field to `struct proc`. In the `proc.c`, we had to add some initialization for the fields. 
```cpp
__attribute__((aligned(4096))) char ustack[NPROC][PAGE_SIZE];
__attribute__((aligned(4096))) char trapframe[NPROC][PAGE_SIZE];
__attribute__((aligned(4096))) char taskinfo[NPROC][PAGE_SIZE];

...
/* LAB1: you may need to initialize your new fields of proc here */
p->taskinfo = (struct TaskInfo *)taskinfo[p - pool];
...

/* LAB1: you may need to init proc start time here */
p->taskinfo->time = 0;
```

Then we define the interrupt handler in `syscall.c`
```cpp
/* LAB1: you may need to define sys_task_info here */

uint64 sys_task_info(TaskInfo *ti) {
	// update taskinfo
	for (int i = 0; i < MAX_SYSCALL_NUM; i++) {
		ti->syscall_times[i] = curr_proc()->taskinfo->syscall_times[i];
	};
	ti->status = Running;
	ti->time = get_time_ms();
	return 0;
};
...
/* LAB1: you may need to add SYS_taskinfo case here */
case SYS_task_info:
	ret = sys_task_info((TaskInfo *)args[0]);
	break;
case SYS_getpid:
	ret = curr_proc()->pid;
	break;
```
## Conclusion

This lab was relatively simple, but it was a good help in understanding the overall structure of the lab.


### 问答作业
1. 正确进入 U 态后，程序的特征还应有：使用 S 态特权指令，访问 S 态寄存器后会报错。请同学们可以自行测试这些内容（参考 [前三个测例](https://github.com/LearningOS/uCore-Tutorial-Test-2022S/tree/main/src) ，描述程序出错行为，同时注意注明你使用的 sbi 及其版本

RustSBI Version 0.1.1
`__ch1_bad_adress.c` -> error writing 0 at memory location at 0x0
![](https://s2.loli.net/2023/02/02/oaRHlkfF61GAmZb.png)
The result 
![](https://s2.loli.net/2023/02/02/YUgwtGLunDdfWCb.png)

`__ch2_bad_instrution.c` -> error using SRET
![](https://s2.loli.net/2023/02/02/ILZ67kQfdy3EO89.png)
The result 
![](https://s2.loli.net/2023/02/02/D43LEyV6n9bKrwl.png)

`__ch2_bad_register.c` ->  error accessing sstatus using ccsr
![](https://s2.loli.net/2023/02/02/ba81HVWQxdIuCfw.png)

The result 
![](https://s2.loli.net/2023/02/02/ZJgwDUCNLjWf5z6.png)

2.  请结合用例理解 [trampoline.S](https://github.com/LearningOS/uCore-Tutorial-Code-2022S/blob/ch3/os/trampoline.S) 中两个函数 userret 和 uservec 的作用，并回答如下几个问题:
	1. L79: 刚进入 userret 时，a0、a1 分别代表了什么值。
	```
	【解答】
	a0 reprents the initial address of trapframe
	a1 represents the initial address of our user page table
	```
	2. L87-L88: sfence 指令有何作用？为什么要执行该指令，当前章节中，删掉该指令会导致错误吗？
	```
	csrw satp, a1
	sfence.vma zero, zero
	```
	【解答】sfence.wma instruction refreshes/flushes TLB entries, it is done so because userret needs to complete conversion from S state to U state. Because U state uses page tables and TLB., we need to refresh the cached content. Page tables have not been implemented, so deletion will have no effect. Commenting it out will not affect our results.

	3. 1L96-L125: 为何注释中说要除去 a0？哪一个地址代表 a0？现在 a0 的值存在何处？
	```
	# restore all but a0 from TRAPFRAME
	ld ra, 40(a0)
	ld sp, 48(a0)
	ld t5, 272(a0)
	ld t6, 280(a0)
	```
	【解答】`a0` is used to obtain the values of the other registers saved in `trapframe`, thus must be saved after the other registers are are saved
	. The address `112(a0)` represents `a0`, and `a0` is eventuall saved in the `sscratch` register.


4.  userret：中发生状态切换在哪一条指令？为何执行之后会进入用户态？
	【解答】The state switches from S (kernel) to U (user) at the last sret instruction of useret.

![](https://s2.loli.net/2023/02/02/ONsWjyobVrCv6KP.png)
	Since `sstatus` and `sepc` are set in `usertrapret()`, the `sret` instruction will cause the `pc` to jump to the next instruction after the interrupt instruction that cause user mode to jum to kernel node previously.


5.  L29： 执行之后，a0 和 sscratch 中各是什么值，为什么？
	```
	csrrw a0, sscratch, a0
	```
	The `sscratch` CSR points to a memory region that contains the extra data we need to implement context switch. According to documentation

![](https://s2.loli.net/2023/02/02/P41rbTzRJB6ENiM.png)
	`a0` becomes the starting address of the trapframe, and the `sscratch` is the value in the original  U state `a0` register. Before execution, `sscratch` containes the starting address of the trapframe, and the value in `a0` is set in the U state. Basically, the above statement exchanges `a0` and `sscratch`

6.  L32-L61: 从 trapframe 第几项开始保存？为什么？是否从该项开始保存了所有的值，如果不是，为什么？
	```
	sd ra, 40(a0)
	sd sp, 48(a0)
	...
	sd t5, 272(a0)
	sd t6, 280(a0)
	```
	【解答】It starts from the 6th item because the first five items 

![](https://s2.loli.net/2023/02/02/8JsfF5KGMLBx4jD.png)
	are values of the S state, so we don't need to save aything when you enter the S state from the U state.
7.  进入 S 态是哪一条指令发生的？ 
	【解答】We enter the S state when an `ecall` instruction is called by the User program, and `trap.c` catches it and sends us to `uservec`. The RISC-V supervisor specification defines a single kernel trap entry point, which can be set by writing the `stvec` CSR. And we can see this defined in `os\riscv.h`
8. L75-L76: ld t0, 16(a0) 执行之后，`t0`中的值是什么，解释该值的由来？
	```
	ld t0, 16(a0)
	t0
	```
	【解答】The value of the register `t0` is the start adress of `usertrap()` .  `16(a0)` refers to the third item in trapframe, kernel_trap, and this item is assigned to the start address of usertrap in usertrapret.