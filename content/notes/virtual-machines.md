---
title: "virtual-machines"
aliases: Virtual Machines
tags: 
- video
- networks
---

link: https://www.youtube.com/watch?v=wX75Z-4MEoM

A computer inside a computer. A computer contains hardware, cpu, ram , storage, etc. To use it we must install an OS. You think that to use another OS, you need another computer. But you can actually but this "computer" inside your existing computer.  This is done using a hyper visor. 'Host' runs 'guest' virtual machines as OS processes. Guests (typically) do not know they are VMs

## What is a Hypervisor
This is a fancy word for an application you install. A good one to use is called virtualbox. The job of the hypervisor is to control computers inside you computers. These virtual computers "think" they are real computers.

### Type 1
Installed on the hardware. e.g., VMware. Can be installed on any computer. Typically used in companies on large servers. 

### Type 2
Installed on a "host OS". Vitual machines use "guest" OSs.

## Why would you want a hyper visor
- safe and secure for learning hacking
- to learn different operating systems
- to try breaking stuff
- facilitate virtualisation of new CPUs and software

## Virtualisation Hosts
- VirtualBox 
	- Free, mostly open source, provides GUI 
- QEMU 
	- Both emulator (dynamic translation) and virtualiser 
- Vmware 
	- An industry leader with many products 
- Xen 
	- Open source hypervisor 
- KVM 
- Virtualisation within Linux main-line kernel

- Vagrant system above VirtualBox, etc. – full virtualisation 
- Docker is a host for “containers” – not full virtualisation

## Containers
- Containers are like VMs, but share the Linux kernel 
	- This makes them memory efficient and very quick to start 
	- Can link parts of their storage and network to the host OS 
		- Also easy to link containers to each other as components 
	- Filesystems used by the container are distributed efficiently 
		- Common ‘layers’ can be factored out, such as a base Linux layer 
		- Over the base layer, just store the delta. e.g. a DB container

## VMs with CI/CD
Virtual machines are used extensively for [[continuous-integration|CI]] and [[continuous-delivery|CD]]. One host can run many different OSs you want to build on (without needing physical machines)