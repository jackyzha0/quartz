---
title: "23-IO-systems"
aliases: 
tags: 
- cosc204
- lecture
---

interactive between device drivers and IO devices

# Hardware
- IO device linked to machine via Port
- link is a set of wires called a Bus
- as each end of the link is a device controller (basically a process)
- ![diagram|400](https://i.imgur.com/qnmTxrb.png)

![more complete diagram of PCI bus|400](https://i.imgur.com/fbJqpwr.png)

device controller registers
- each contoller has registers for holding signals
- CPU can read and write these
- some hold data some control signals

adressesing devices
- each port has an address range
- CPU can issue IO instructions to particular addresses
- communication can be 1 byte at a time for via direct memory access

# Kernel interface

# Performance
