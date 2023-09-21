---
title: "optimisation"
aliases: 
tags: seng
---

Slow software is not fun to use, as can result in resource overuse. For example it is good to minimise [[CPU]] usage in battery-powered devices, [[memory]] use in resource constrained devices, etc. 

Optimisation can occur at three main levels: programming level, hardware level, and [[network]] level

## Inefficiencies
### Algorithms
- hashing, linear/binary search, space vs time, [[memoization]]/caching
- in well-built software with [[separation-of-concerns]] it should be easy to test different algorithms

### Language
 - OOP costs, garbage collection, [[object]] creation in loops
 - copy-by-value vs copy-by-reference
 - interpreted vs compiled language, compiled [[libraries]] in interpreted languages are faster

### CPU effects
- software emulation of missing hardware support, virtualisation speed may depend on available CPU features
- problems with code structure and CPU pipelines, inefficient looping, pipeline structure, interleaving of non-dependent instructions, branch mispredictions, 
- when to trust the [[compiler]]? usually not worth optimising this manually

### Memory Hierarchy
- CPU registers, best managed by compiler
- caches, Local RAM, remote RAM, NUMA, HDD vs SSD

### Slow Hardware
- GPUs and other external hardware accelerators are fast but it may take a lot of time to load the data into them

### Distributed Resources
- Remotely hosted resources, RTT
- async communication (e.g., email) can be good
- local caches are also good e.g., ([[DNS]])

## Auto-Optimisation
[[compiler]] does this automatically. e.g.,
- reordering lines of code
- changing variables to registers
- remove "dead" code
- remove methods that aren't called

Sometimes this is wrong though, so you may need to tell the compiler to leave stuff alone\

With gcc (and others) use the `-O` flag to optimise compiled code

## Heterogeneous computing
The act of using more than the CPU:
- GPUs
- vector processing: SIMD
- FPGAs
- Neural Units

To optimise for each platform use libraries that automatically detect the environment. e.g., OpenCL

## The 90/10 rule
Your program will spent 90% of the time running 10% of the code. Focus on optimising the 10% of code that is run the most.

## Profilers
Time, cache, memory, data-race checkers, etc

### Time profilers
Runs your program and measures where the time is spent.

Three types: Instrumenting, Sampling, CPU performance counters

Sampling: at each step in the code it records that it has been there, you can adjust how often it samples. runs fast but you get less information