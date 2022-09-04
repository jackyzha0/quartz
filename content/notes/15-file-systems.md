---
title: "15-file-systems"
aliases: 
tags: 
- cosc204
- lecture
---

# what is a file (LINUX)
an interface of OS to users

os manages files just as files - it doesn't care what type of file it is - they are all bytes arranges logically in sequence.

they are arrangges logically in sequence

files need to be interpreted. THis is done by applications. e.g., powerpoint, ms paint, etc.


- the OS provides a logical unit of storage for the user
	- the user refers to files
	- the operating system maps files onto regions of the storage
	- files are really an artifact of the dialogue between the user and the OS

## how to define it
- a collection of related data
- e.g., the set of lines in a program

structure:
- a byte stream or a sequence of bytes, text file is a stream of ascii characgers

what can the user do
- create, write, read, reposition, delete, truncate (through system calls)

## attributes
- name
- owner
	- Uid and Gid
- file type
- location of data
- size of data
- permission
- "housekeeping" information
	- time and created modified etc
- and more

## where is the data stored
- in an index node (inode) pointed by an entry of a directory. (you can think of a directory as just a set of <name, inode> entries. )

internal fragmentation
- dont know exactly how many bytes to allocate to a file
- extra space is lost

external fragmentaion TODO

these issues have been solved using block allocaiton instead of continuous allocation

## system calls for file systems
- open close, read, write, ioctl, etc

`ssize_t write(int fd, const, void *buf, size_t count)`
	- fd - file descriptor
	- write up to count butes from the buffer pointed buf to the file referred to by the file descriptor
	- returns -1 if error. and errno is set
	- should return number of bytes written if ok

`ssize_t read(int fd, void *buf, size_t count)`
- attempt to read up to count bytes from the fd into the buffer starting at buf. On success, the numbber of bytes read is returned and the file position is advanced by this number. It may be < count. zero means end of file
- error is -1 and errno is set

# file access patterns
- sequential access (most common)
	- a file pointer specifies a record within the file.
	- the poniter can be moved incrementally forwards (in read or write) operations or backwards (in rewinding)
	- the hardware metaphor is a tape
- direct access
	- a file is viewed as a numbered sequence of records
	- operations (e.g., read write) can be carried out on any record in any order
	- the hardware metaphor is a disk

you can give *advice* to the OS about how to read the file by specifying sequential or direct


# directory structure

tree structured
![diagram|400](https://i.imgur.com/opniDLZ.png)

mapped onto a storage device

this is done by the organisation module

smallest unit in a disk is a block

the file organiser has to allocate blocks for the storage of files

a file is broken into logical blocks, to make the mapping to disk blocks easier to manage



# file system implementation
# disk allocation methods

continiour allocation
- each file occupies a set of continuous blocks on the disk
- advantages
	- sequential access is easy becaues the next character is in the current block or the very next block
	- direct access is also good, just count the numbe of blocks
- disadvantages
	- extern

