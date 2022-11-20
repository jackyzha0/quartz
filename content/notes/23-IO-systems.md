---
title: "23-IO-systems"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-12-24
sr-interval: 33
sr-ease: 250
---

interactive between device drivers and IO devices

Hardware
- IO device linked to machine via Port
- link is a set of wires called a Bus
- as each end of the link is a device controller (basically a process)
- ![diagram|400](https://i.imgur.com/qnmTxrb.png)
- ![more complete diagram of PCI bus|400](https://i.imgur.com/fbJqpwr.png)

device controller registers
- each contoller has registers for holding signals
- CPU can read and write these
- some hold data some control signals

adressesing devices
- each port has an address range
- CPU can issue IO instructions to particular addresses
- communication can be 1 byte at a time for via direct memory access

polling
- CPU cycles waiting for busy bit to be clear is known as polling (busy waiting)
- waste CPU time
- if CPU is polling for input from devices too, then all devices have to be monitored - this is big waste of CPU time

interupts
- used for communcation with IO devices: prefered over polling
- CPU hardware contains wire calld interrupt request line
- if cpu senses this line after each instruction it executes
- if intr sensed, CPU saves its current location and jumps to address in the interrupt vector indicated by the signal
- maskable/nonmaskable
	- deal with different priorities of interrupt
	- maskable: device generated, can be diabled when OS is processing a more urgent intr
	- nonmaskable: for error messges, never disabled

Direct memory access
- sending large amounts of data to IO devices
- special purpose process DMA controller used
- CPU writes a DMA command block into memory, specifying which bytes to transfer, and where to put them
- DMA then controller can then execute concurrently
- after transfer is finsished DMA controller interrupts CPU

IO performance
- reduce context switches
- reduce data copies in memory (normamly two: user memory, device/kernel memory): can mmap to share memory
- reduce number of interrupts (e.g., using polling)
	- it data is coming more frequently polling may be faster than interrupts
- increase concurrency (e.g., DMA)
- move data processing to hardware (e.g., network interface card)
- balance CPU, memory system, bus, IO performance

Zero-copy
- avoid memory copy in IO data transfer
- use dynamic mmap
- copy data from deice directly to user spce e.g., remote direct memory access RDMA
- pass packet buffer pointers between layers of TCP/IP protocol