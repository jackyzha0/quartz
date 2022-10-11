---
title: "18-processes-sharing-and-threads"
aliases: 
tags: 
- cosc204
- lecture
---

# Shared memory for processes
![linux memory space layout](https://i.imgur.com/vLlD03U.png)

Can't assume all variables are initally zero. 
OS decide which process maps who which physical address

memory mapping `mmap` is a family of system calls: 
- allow two processes to share some region of their memory space.
- achieved by creating a memory region that can be shared by other processes

![map diagram](https://i.imgur.com/IDk8AcN.png)

![mmap examples](https://i.imgur.com/zKhFpsm.png)

shared memory by two processes mapping to the same file or using fork() after mmap()
``` c
random_fd = open("/home/hzy/test/zero", O_RDWR);
ptr = mmap(NULL, 10240, PROT_READ|PROT_WRITE,
	MAP_SHARED | MAP_FILE, random_fd, 0);
```

private mapping is often ysed to set up new memory sections.
``` c
fd = open("mmap_test_file", O_RDWR); p
tr = mmap(NULL, 10240, PROT_READ|PROT_WRITE, 
	MAP_PRIVATE|MAP_FILE, fd, 0);
```


# Threads
Lightweight process - shares everything except the stack
