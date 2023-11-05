# 实验2：
## Environment
Linux in Virtual Machine on Mac M1
Running `make test BASE=4 LOG=debug` on our base code, we get

![](https://s2.loli.net/2023/02/02/nV8lfRKA4QC3gFW.png)
## Abstract
This experiment aims to incorporate the concept of virtual mapping through the introduction of `vm.c` We learn why we need dynamic memory allocation, and how a virtual/real memory mapping mechanism of the page table allows us to do ensure that each program/application in the user space has its own, independent memory that will not conflict with other applications.
## Experiment
There are two main parts to this experiment.

First we have to re-implement `uint64 sys_task_info()` in `syscall.c` to handle the mapping of new virtual address to physical address introduced in this chapter in `vm.c`.  
```cpp
uint64 sys_task_info(uint64 ti/*TaskInfo *ti*/) {
	struct proc *p = curr_proc();
	// walk to physical address

	uint64 physical_addr = useraddr(p->pagetable, ti);
	struct TaskInfo *temp = (TaskInfo*) physical_addr;
	
	// update physical address values
	for (int i = 0; i < MAX_SYSCALL_NUM; i++) {
		temp->syscall_times[i] = p->taskinfo->syscall_times[i];
	}

	temp->status = Running;
	temp->time = get_time_ms() - p->start_time; 
	return 0;
};
```
We simply map the user application address (virtual address) to physical address using the `useraddr()` function defined for us. This uses Riscv's `SV39` mode, which uses a three-stage mapping process to get the address of the physical location. The other logic is the same. 

The second task was to implement `uint64 sys_mmap()` and `uint64 sys_munmap()` in `syscall.c`. Below is `sys_map()`
```cpp
uint64 sys_mmap(int start, unsigned long long len, int port, int flag, int fd) {
	struct proc *p = curr_proc();

	// errors
	if ((port & 0x8) != 0 ) return -1;  // rest of upper bits have to be zero
	if ((port & 0x7) == 0) return -1;   // makes sure all bits can't be zero
	if ((start % 4096) != 0) return -1; // address has to be page aligned

	// ignore, but can be used for expansion later
	if (fd); if (flag);

	// correctly set PTE flags
	int choice = port;

	switch(choice) {
		case 1: { // 0001 read
			port = port | PTE_R;
			port = port | PTE_U;
			port = port | PTE_V;
			break;
		}
		// no case 2, because ilelgal to write w/o read, so no definition
		case 3: { // 0011 write/read
			port = port | PTE_R;
			port = port | PTE_W;
			port = port | PTE_U;
			port = port | PTE_V;
			break;
		}
		default: {
			break;
		}
	}
	
	if (len % 4096 != 0) { // if len is not aligned
		while (len % 4096!=0) { // keep adding until alligned
			len++;
		}
	}

	// allocate all pages that are required
	int mmp = 0;
	for(int i = 0; i < len / PGSIZE; i++){
		uint64 physical_addr = (uint64) kalloc();
		mmp = mappages(p->pagetable, start+i*PGSIZE, PGSIZE, physical_addr, port);
	}

	// 0 for success
	if (mmp == 0) return 0;
	else return -1;
	return 0;
}
```
First, we check if there are any errors in the virtual address given. If there are, then we immediatly return -1. Otherwise, depending on what port value, we have to update PTE flags with the given masks. Then we simply call the `mappages()` function to allocate the physical memory that the application requires. This function creates page table entries for virtual addresses starting at `start` that refer to physical address starting at `physical_addr`. Note that we first align the `len`  to be of 4096 before mapping the pages. The function returns 0 on success, and -1 on failure. This should successfully handle cases 
- `ch4_mmap0.c`
- `ch4_mmap1.c`
- `ch4_mmap2.c`
- `ch4_mmap3.c`

Next we implment `uint64 sys_munmap()`, which frees up physical address based on given virtual address.
```cpp
uint64 sys_munmap(int start, unsigned long long len) {
	if (start % 4096 != 0) return -1;              // start must be aligned
	if (len % 4096 !=0 ) while(len%4096!=0) len++; // align len

	struct proc *p = curr_proc();
    pte_t *pte;
    // start freeing physical address between start and len, but first make sure that 
    // the address has been mapped
    for (uint64 a = start; a < start + (len/PGSIZE) * PGSIZE; a += PGSIZE) {
		pte = (pte_t *)walk(p->pagetable, a, 0);
		if ((*pte & PTE_V) == 0){
			return -1; //not mapped, return -1
		}
	}
	uvmunmap(p->pagetable, start, len/PGSIZE, 1);
	return 0;
}
```
The processs is relatively simple, we simply call `uvmunmap()` which removes pages of mappings start from `start`. However, first we have to check a couple things. `start`, of course must be page aligned, and len must be also. Then, we also have to check that the mappings indeed exists, if not then there should be nothing to free. This should successfuly pass the following testcases
- `ch4_unmap0.c`
- `ch4_unmap1.c`

The syscall id's were also defined in the `syscall()` function
```cpp
...
case SYS_mmap:
	ret = sys_mmap(args[0], args[1], args[2], args[3], args[4]);
	break;
case SYS_munmap:
	ret = sys_munmap(args[0], args[1]);
	break;
...
```

## Conclusion
Looking at the pipeline, we can see that we passed all test cases
![](https://s2.loli.net/2023/02/02/gSXeKZfciNyAshL.png)

## 问答作业

1. 请列举 SV39 页表页表项的组成，结合课堂内容，描述其中的标志位有何作用／潜在作用
	1. The RISCV SV39 translation system uses 39-bit virtual memory addresses and up to three levels of page tables to translate virtual address into physical addressses. Each page table contains exactly 512, 8-byte entries, which is in total 4,096 bytes (the exact size of a page). 
	2. The Page Table Entries look like this ![](https://marz.utk.edu/wp-content/uploads/2020/11/image-2.png)
	3. As shown, every SV39 PTE has 64 bits. 
	```
	[63:54] Reserved 
	[53:28] PPN[2]:    For first physical page number 
	[27:19] PPN[1]:    For second physical page number
	[18:10] PPN[0]:    For last physical page number 
	[9:8]   Reserved for Supervisor mode
	[7]     Dirty Bit: indicates that page has been written to
	[6]     Accessed:  indicates that page has been accessed
	[5]     Global:    global address mapping
	[4]     User:      indicates that is a user page
	[3:1]   XWR:       xwr permission as described below    
	[0]     Valid:     indicates that page is valid  
	```
![](https://marz.utk.edu/wp-content/uploads/2020/11/image-6-768x403.png)
2. 缺页
	1. 请问哪些异常可能是缺页导致的？
		1. Instruction/Load/Store Page Fault
	2. 发生缺页时，描述相关的重要寄存器的值（lab2中描述过的可以简单点）。
		1. 机器模式异常值寄存器 mtval Machine Trap Value Register: represents machine bad address or instruction
		2. 机器模式异常原因寄存器 mcause Machine Cause Register: stores the cause of the current trap, machine trap cause
	3. 这样做有哪些好处？ 
		1. Due to the high cost of disk access, operations that delay or avoid disk access are likely to improve efficiency. For example, when a program is executed, not all its code is used immediately, and not all its related data are accessed immediately. Therefore, only the code segments executed immeately are loaded, the rest are delayed, saving disk space.
	4. 请问处理 10G 连续的内存页面，需要操作的页表实际大致占用多少内存(给出数量级即可)？
		1. One of the smallest page entries of the sv39 is 4KiB, and one page table, which contains exactly 512 of these pages, means that is $512\times 1024 / (1024 \times 1024)=$ 2MiB of data for one page table.
	5. 请简单思考如何才能在现有框架基础上实现 Lazy 策略，缺页时又如何处理？描述合理即可，不需要考虑实现。
		1. When SYS_MMAP is called, or when the program is loaded, it records which virtual addresses are mapped, but does not operate the page table. After the program accesses the unmapped address, a page fault exception is triggered, and the mapping record is checked in the exception handling function. If the accessed virtual address has been mapped already or should have been loaded before, the actual operation page table allocates memory for it, and then returns to the user program
	6. 此时页面失效如何表现在页表项(PTE)上？
		1. If the XWR of a page is not all zero, but V is zero, it means that the page is meaningful and not in memory, which in turn means that it is in external storage.
3. 双页表与单页表
	1. 单页表情况下，如何更换页表？
		1. Because `satp` CSR manages the address of the root of the page table, it modifies `satp` when replacing the page table, and then clears the TLB to avoid the previous cached page table entries interfering with the new page table
	2. 单页表情况下，如何控制用户态无法访问内核页面？（tips:看看第一题最后一问）
		1. If the U flag of kernel page is set to 0, MMU will check the current privilege level during translation. If it is in U mode, MMU will report `page fault exception`
	3. 单页表有何优势？（回答合理即可）
		1. The thread switch is relatively less, and the privilege level switch of system call is frequent. A thread of single page table only uses one page table, so it is more efficient not to switch page table during the switching of privileges'
	4. 双页表实现下，何时需要更换页表？假设你写一个单页表操作系统，你会选择何时更换页表（回答合理即可）？
		1. The double page table should be replaced when switching at privilege level or thread switching. For single page table system, change the page table when switching the process



