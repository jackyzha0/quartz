---
title: "operating-system"
aliases: Operating System, OS, OSs, Operating Systems
tags: 
- cosc202
---

# Userspace
This is where applications run. Computer resources are isolated in compute and data
- cannot access memory belonging to another process
- cannot directly access hardware
- cannot occupy all of the CPUs time on one application

# Kernal space
"all seeing and all powerful" The kernel sits below the userspace and manages resource allocation and directly controls harware. Usuallly you dont directly interact with the kernel when developing software. You do interact indirectly with the kernel, it permits your interactions with the environment (input/output from/to files, network, and terminals). The standard library usually insulates you from the OS kernel, may abstract over different OSs, and do operations in an OS-agnostic way.

Among the Kernels responsibilities are these main tasks
- File systems
- Process Management
- Memory Management
- IO Systems
- Device Drivers