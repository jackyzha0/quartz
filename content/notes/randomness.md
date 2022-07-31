---
title: "randomness"
aliases: 
tags: 
- comp210
---

- a lack of predicability
- no patterns
- stochastic (can be analysed but not predcted) vs deterministic

used for
- one time pad
- generating key-pairs
- generating salts for password hashing
- seeding pesudo random number generators

humans are not good at randomness
- e.g., see patterns when there are none
- e.g., random dot pattern
- shuffle algorithm
- gambers fallacy

how to prove randomness
- cannot prove
- but can check for uniformity, bias, distribution etc. 
- difficult with small samples
- can identify data that is unlikely to be random
	- (rngtext, diehard, dieharder etc)

# In computers
computers have the same problem: they are deterministic
- cannot really produce true random numbers
- CSPRNGS crypto secure pseudo random number generators
- hardware entropy generator

entropy pool
- modern OSs implement an entropy pool that processes can draw on when the need random data
	- some systems provide blocking and non-blocking random source devices
		- blocking: will stop when entropy is exhausted