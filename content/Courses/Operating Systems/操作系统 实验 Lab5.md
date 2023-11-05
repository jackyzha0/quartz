## Environment 
Linux in Virtual Machine on Mac M1
Running `make test BASE=1` and 
```
$ make test BASE=1
>> ch7b_usertest
```

![](https://s2.loli.net/2022/11/26/4IBFMzwVOQjdHaZ.png)
## Abstract
In order for processes to communicate with each other, we have to implement 管道, or pipe, so that processes can work together to complete a task.
## Experiment
This lab has no experimet
## Conclusion
### 问答作业

### 实验反馈
1. 举出使用pipe的一个世纪应用的例子
A pipe is a form of redirection (transfer of standard output to some other destination) that is used in Linux and other Unix-like operating to send the output of one command/program/rprocess to another command/program/process for further processing. The Unix/Linux systems allow stdout of a command to be connected to stdin of another command. You can make it do so by using the pipe character **‘|’**.

Using '|', we cancombine two or more commands, and in this, the output of one command acts as the input to another command, and so on. It can visualized as a temporary conection between the two or more commands/programs/processes. The command line programs that do further processing are reffered to as filters.

In Linux for example, a commonly used combination is the command `ls` with `grep`. Ls lists all files/directories in the current directory, and grep filters all files through a matching text. For example，if I go to `/usr/bin/` and enter the command `ls` , I will get 
![ls](https://s2.loli.net/2022/11/26/gIJ9dZwSra4RHhD.png)

This is our output, but lets say I want to filter this list and get files only with riscv64 in it. *The pipe acts as a container which takes the output of ls and gives it to grep as an input*
![ls-grep](https://s2.loli.net/2022/11/26/le48EioHxJL5kAz.png)

2. 如果需要在多个进程间互相通信，则需要为每一个进程建立一个管道，非常繁琐，请设计一个容易用的多进程通信机制

One method would be shared memory that can be accessed by multiple processes. It would allow one or more process to communicate via memory that appears in all of their virtual address space. Access to shared memory areas would be controlled via keys and access rights checking. But there has to be a mechanism in place to syncronize access to the memory, or locking certain regions of the file which can only be executed by one process of at a time.

## Notes

### Pipeline File Abstraction

Before the Unix operating system, most operating systems provided various complex and irregular design implementations to deal with various I/O devices (also known as I/O resources), such as keyboards, monitors, disk-represented storage media, communication devices represented by serial ports, etc., making application development complicated. It is trivial and difficult to uniformly represent and process I/O devices. With the birth of UNIX, the abstraction of a simple and elegant I/O device appeared, which is the file. In the Unix operating system, "**Everything is a file**" is an important design idea, which inherits from the design concept of the versatility of the Multics operating system and has been further simplified. In this chapter, the file that the application sees and is managed by the operating system is just a series of bytes. The operating system does not care about the content of the file, but only cares about the mechanism of how to read and write files through byte stream, which means that any program can read and write any file (i.e. byte stream). Parsing the specific content of the file is the task of the application, and the operating system does not interfere with it. For example, a Rust compiler can read and compile a C language source program, and the operating system does not prevent such a thing from happening.

With such an abstraction of files, the operating system kernel can manage read and write I/O resources through a file, and assign files to the process, so that the process can interact with I/O resources with a unified file access interface. The I/O hardware devices we are currently using can be roughly divided into the following categories.

- **Keyboard device** is a device for the program to obtain character input. It can also be abstracted into a read-only file from which a series of bytes can be read.
- **Screen device** is a character display device that displays the character output of the program. It can be abstracted into a write-only file, which can write a series of bytes to this file, which can be presented directly on the display screen;
- **Serial port device** is a character (byte) communication device that obtains the character input and character output results of the program. It can be abstracted as a read-write file. It can write a series of bytes to this file and pass it to the program, or transmit the characters to be displayed by the program. You can also split this serial port device. It is divided into two files, a read-only file for obtaining input characters and a write-only file that output characters.

There is a serial port device on the QEMU simulated RV computer and K210 physical hardware. The operating system connects to the keyboard device of the computer used by the classmates through the input side of the serial port device, and the output side of the serial port device is connected to the display window of the computer used by the classmates. Because RustSBI directly manages serial port devices and provides the operating system with two SBI interfaces, the operating system can easily output or input characters through these two SBI interfaces.

Files are provided to applications, but the operating system is responsible for management. Although files can represent many different types of I/O resources, in the view of the process, access to all files can be carried out through a very concise unified abstract interface called File. Let's take a look at the expansion of the file structure of our OS framework:

```cpp
// file.h
struct file {
    enum { FD_NONE = 0, FD_PIPE, FD_INODE, FD_STDIO } type;
        int ref; // reference count
        char readable;
        char writable;
        struct pipe *pipe; // FD_PIPE
        struct inode *ip; // FD_INODE
        uint off;
};
```

### Implementation of Pipe
Pipes are a way of inter-process communication. It allows processes at both ends of the pipeline to transmit information to each other. The design of our OS framework for pipe is very simple: find an idle memory as the data buffer of the pipe, and the read/write to the pipe at both ends is transformed into a read/write to this data buffer in memory. Although the logic is very simple, a process reading from or writing to a pipeline is actually implemented through `sys_write` and `sys_read`. at the same time,`sys_write` also needs to finish outputting to the screen output. A program can also have multiple pipes, and the pipe should also be able to make other programs visible to complete the process communication. For each pipe, it also needs to maintain some states to record the position of the last read and write, the actual readable size of pipe, etc. Therefore, we also need to pay attention to the details of our OS pipe implementation.
```cpp
// file.h，抽象成一个文件了。
#define PIPESIZE 512
struct pipe {
    char data[PIPESIZE];
    uint nread;     // number of bytes read
    uint nwrite;    // number of bytes written
    int readopen;   // read fd is still open
    int writeopen;  // write fd is still open
};
```
It can be seen that the pipeline stores the data in a cache of a char array for maintenance. Here we manage the data buffer of the pipeline in the form of a ring buffer.

Let's take a look at how to create a pipeline.
```cpp
int pipealloc(struct file *f0, struct file *f1)
{
    // There is no pre-allocation here. Because the pipe is relatively large, 
    // it is not too wasteful to take a page directly.
    struct pipe *pi = (struct pipe*)kalloc();
    // 一开始 pipe 可读可写，但是已读和已写内容为 0
    pi->readopen = 1;
    pi->writeopen = 1;
    pi->nwrite = 0;
    pi->nread = 0;

    // The two parameters are obtained through filealloc, 
    // which is connected to the pipe and the two files, 
    // which is readable at one end and writeable at the other end. 
    // Read-write control is required by sys_pipe.
    f0->type = FD_PIPE;
    f0->readable = 1;
    f0->writable = 0;
    f0->pipe = pi;

    f1->type = FD_PIPE;
    f1->readable = 0;
    f1->writable = 1;
    f1->pipe = pi;
    return 0;
}
```

> [!note] In the kernel, we can't create a new structure, because we don't implement heap memory management. But we can use a slightly wasteful way, that is, kalloc() a page directly. As long as the data structure is not greater than the whole page, we can use `new`.

The input and output at both ends of the pipeline are abstracted into two files. The creation of these two files is completed by the `sys_pipe` call. When assigning, we will set which end of the pipeline can write which one is readable, and initialize the nread of the pipeline itself and the pointer of the nwrite record buffer.

It is easier to turn off the pipe. In fact, the function only closes one of the read-write terminals. If both are closed, we release the pipe.
```cpp
void pipeclose(struct pipe *pi, int writable)
{
    if(writable){
        pi->writeopen = 0;
    } else {
        pi->readopen = 0;
    }
    if(pi->readopen == 0 && pi->writeopen == 0){
        kfree((char*)pi);
    }
}
```

The reading and writing of the pipeline is the key part.
```cpp

```
Since our pipeline is managed in the form of ring buffer, and its own capacity is only the size of `PAGESIZE`, we need to use two pointers, nread and nwrite, to record where the current two ends are written (their absolute values can be greater than PAGESIZE), the key is the difference between the two). Because we must first write to the pipe to be able to read from it, nwrite >= nread. If it is equal, it means that we have finished reading, and we exit piperead. If nwrite - nread == PAGESIZE,  this shows that we have written to all of PAGESIZE，we can't write to it any more, or else we will overwrite what we haven't read yet. If we can write, the data will be written to the data buffer. Note that because it is a ring, if nwrite % PAGESIZE! = 0, and if the current pointer position is to the tail of the wring, and we still have unwritten data, we continue writing from the start of the ring. You can read the implementation of write carefully.

### Pipe related system calls
```cpp
// os/syscall.c
uint64 sys_pipe(uint64 fdarray) {
    struct proc *p = curr_proc();
    // request two empty files
    struct file* f0 = filealloc();
    struct file* f1 = filealloc();
    // a pipe is allocated two empty files
    pipealloc(f0, f1);
    // assign two fds and associate them with the file pointer.
    fd0 = fdalloc(f0);
    fd1 = fdalloc(f1);
    size_t PSIZE = sizeof(fd0);
    copyout(p->pagetable, fdarray, &fd0, sizeof(fd0));
    copyout(p->pagetable, fdarray + sizeof(uint64), &fd1, sizeof(fd1));
    return 0;
}
```
This system call completes the function of creating a pipe and recording the corresponding files at both ends. And write the corresponding fd to the user's incoming array address and return to the user state.
`sys_close` is relatively simple. Just release the fd of the process and empty the corresponding file, and set its type to FD_NONE
```cpp
```


Note that the current maximum fd of a file is 15.

### Process Communication and Fork
#### Modificaiton of Fork
File support of fork should have been introduced in chapter 6, but in order to better understand the inheritance mechanism of pipelines, we put it in this chapter. Why is fork a cancer? Because you always have to consider whether to add fork support to the new function after adding a new thing. The file in this chapter is the first example, so in the context of fork, the child process also needs to inherit the file resources of the parent process, that is, the array of pointer files in PCB. How should we deal with it? Let's take a look at the implementation of fork in this chapter:
```cpp
int fork() {
    // ...
+   for(int i = 3; i < FD_MAX; ++i)
+       if(p->files[i] != 0 && p->files[i]->type != FD_NONE) {
+           p->files[i]->ref++;
+           np->files[i] = p->files[i];
+       }
    // ...
}
```
It can be seen that when creating a child process, it traverses the parent process, inherits all its open files, and gives the ref + 1 of the specified file. Because what we record itself is just a pointer, we only need to use ref to record a file and if there is a process.

In addition, the resources that need to be cleaned at the end of the process now also included files in as well as the original memory.
```cpp
void freeproc(struct proc *p)
{
    // ...
+   for (int i = 3; i < FD_BUFFER_SIZE; i++) {
+       if (p->files[i] != NULL) {
+           fileclose(p->files[i]);
+       }
+   }
    // ...
}
```

You will find that the implementation of `exec`has not been modified. Note that `exec` only reloads the instance file image executed by the process and will not change other attributes, such as files. That is to say, the child process from fork opens the same file as the parent process, but exec does not brush out the open file. Based on this, we can use the pipe for inter-process communication.

```cpp
// user/src/ch6b_pipetest

char STR[] = "hello pipe!";

int main() {
    uint64 pipe_fd[2];
    int ret = pipe(&pipe_fd);
    if (fork() == 0) {
        // 子进程，从 pipe 读，和 STR 比较。
        char buffer[32 + 1];
        read(pipe_fd[0], buffer, 32);
        assert(strncmp(buffer, STR, strlen(STR) == 0);
        exit(0);
    } else {
        // 父进程，写 pipe
        write(pipe_fd[1], STR, strlen(STR));
        int exit_code = 0;
        wait(&exit_code);
        assert(exit_code == 0);
    }
    return 0;
}
```

Because fork will copy all files and exec will not change the files, the fd list of the parent-son process is consistent, and you can communicate directly with the created pipe.