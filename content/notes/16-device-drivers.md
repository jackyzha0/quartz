---
title: "16-device-drivers"
aliases: 
tags: 
- lecture
- cosc204
sr-due: 2022-09-25
sr-interval: 3
sr-ease: 250
---

# Device controller and driver
driver Defn:  a special kernel module that contrls the operations of a device with the device specific information
controller Defn: a hardware unit on a device that can know and control a devices status or behaviour, which communicates with the CPU via a driver

![device drivers and controllers diagram|300](https://i.imgur.com/m0nxDqa.png)

# Types of IO devices
- character stream vs block
- swqeuential vs random access
- synchronous vs async
- sharable or dedicated

OS provides a consistent interface for them in the `/dev` folder (unix systems). e.g., ramdisk device is name `/dev/memdrv`. each device has a file under `/dev` that can be handled with file operations read()/write()

## block devices
commands (sent from device driver to device controller)
- read block
- write block
- seek block (for random access block devices)

the sequence of read/write requests can (should) be optimized

## character devices
- commands
	- get char
	- put char

also support buffering (accepting keyboard input line by line) and editing of buffers (e.g., spcial treatement of backspace character)

# IO models
IO system calls use different IO models
- blocking - when a proccess needs IO input it waits to recieve it before continuing
- non blocking - waits a fixed (small) amount of time, and returns (possibly with some data still untransferred)
- async - does not wait, is informed with a signal when io is completed

# IO scheduling and buffering
for when there are several requests for IO waiting to be serviced
- first come firs served is not efficient

IO buffers are used in main memroy to optimise file systems

when a data block is used often, it is kept is memory and only written to secondary storage once all its accesses are finished

# example ramdisk driver
![](https://i.imgur.com/NIqCAzy.png)

## open
``` c
int temp_open (struct inode *inode, struct file *filp){ 
	// check if the process has the permission to access; 
	// suspend the calling process if the device is busy 
	// or used by another process; 
	// otherwise record the id of the calling process 
	// so that the device is owned by the process; 
	// initialise or reset the device. 
}
```

## read
```c
ssize_t temp_read(struct file *filp, char __user *buf,size_t count,loff_t *f_pos){ 
	// find the location of data; 
	// ask the controller to copy data to kernel kbuf 
	// copy data to user space kbuf -> buf 
	copy_to_user (buf, kbuf, count); 
	*f_pos += count; // update pointer 
	return count; // return the number of bytes read 
}
```

## write
```c
ssize_t temp_write(struct file *filp, char __user *bufsize_t count, loff_t *f_pos){ 
	// copy data from user space buf -> kbuf 
	copy_from_user (kbuf, buf, count); 
	// find the location of data; 
	// ask the controller to copy data from kernel kbuf 
	*f_pos += count; // update pointer 
	return count; // return the number of bytes written 
}
```

## close
```c
int temp_release (struct inode *inode, struct file *filp){
	// release the device by removing the id of the process;
	// check if there is any waiting process to wake up;
	// undo anything done at open(), e.g. free memory. 
}
```

# UI for IO devices
