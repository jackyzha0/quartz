---
title: "07-system-installation"
tags: 
- lecture
- cosc301
---

Installation of linux
- Major Linux distributions 
	- Ubuntu, Red Hat, Debian, Fedora, S.u.S.E., etc 
- Why need to install? 
	- Copy Linux onto the hard disk 
	- Properly place the boot program, the Linux kernel, and startup scripts so that the computer can boot up from the hard disk 
- Select an installation method 
	- CD-ROM 
	- NFS

Disk layout after installation
![Disk layout after installation](https://i.imgur.com/C3njX6h.png)

BIOS or EFI 
- BIOS (Basic I/O System) or EFI (Extensible Firmware Interface) 
	- A program that is written in ROM 
	- Provides the lowest level interface to peripheral devices and controls the first step of the boot procedure 
	- BIOS tests the system, looks for and checks peripherals and then looks for a device (floppy, hard disk, or CDROM) to use to boot the system 
	- Master Boot Record (MBR) is the sector that the BIOS reads in and starts when a hard disk is used to boot.