---
title: "16-device-drivers"
aliases: 
tags: 
- lecture
- cosc204
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
- blocking - when a proccess needs IO input it waits to recieve it before c
- non blocking
- async

# IO scheduling and buffering

# UI for IO devices
