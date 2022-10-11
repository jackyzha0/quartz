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

private mapping is often used to set up new memory sections.
``` c
fd = open("mmap_test_file", O_RDWR); p
tr = mmap(NULL, 10240, PROT_READ|PROT_WRITE, 
	MAP_PRIVATE|MAP_FILE, fd, 0);
```



# Threads

## product consumer problem
- a producer process writes data to a buffer of fied size
- a consumer reads data from the buffer
these two processes are being scheduled independently by the CPU

producer must wait if buffer is full
consumer must wait if buffer is empty

## threads
- allows more convenient data sharing
- threads within a single process share everything except they have their own program counter, registers and stack space

![diagram](https://i.imgur.com/XcLsWyd.png)

## why
- responsiveness - parrallelism - dont have to wait
- resource sharing - automaticall share everything in same process
- economy - lightweight, creating and switching between threads is faster than creating heavyweight processes
- scalability - each to work on multiprocessor architectures

## pthread
- pthread_create(): create a thread 
- pthread_exit(): terminate a thread 
- pthread_join(): wait for a thread to terminate 
- pthread_detach(): detach a thread so that it won’t be waited 
- pthread_self(): get the thread id of the current thread 
- pthread_equal(): compare if two threads are the same 
- pthread_cancel(): send a cancellation request to a thread

``` c
void *myThreadFun(void *vargp) { 
	sleep(1);
	printf("Hello from Thread \n");
	return NULL;
} 
	
int main() { 
	pthread_t thread_id;
	printf("Before Thread\n");
	pthread_create(&thread_id, NULL, myThreadFun, NULL);
	pthread_join(thread_id, NULL);
	printf("After Thread\n");
	exit(0);
}
```

## web server thread
- a web server is a process that provides data over the web to requesting clients
- a thread is created for each request



Lightweight process - shares everything except the stack
