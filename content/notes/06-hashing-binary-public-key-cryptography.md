---
title: "06-hashing-binary-public-key-cryptography"
aliases: 
tags: 
- lecture
- comp210
sr-due: 2022-08-19
sr-interval: 3
sr-ease: 250
---

# news
- pegasus project
- cutting internet cables

# Hash function
- yields a small, districtive value (hash or digest) from an arbitrarily sized input.
- one way function
	- non-invertable
- uniform size (each ouput eqaully likely)
- deterministic (same input maps to same output)
- possibility of collisions (b-day paradox, potential attacks)

message => hash() => hash

also
- can be used for data structures
	- [hash-map](notes/hash-map.md)
	- lots of theory
	- often use modular arithmetic
	- usually have more complicated algorithms than mod

## in crypto
- needs to be
	- impossible to reverse
	- difficult to find collision
	- uniform length output (tunable)
	- must account for every bit of information in a message
	- must be sensitive to changes input (avalancge effect)
	- ouput should no contain apparent iinformation (appears random)
	- easily computed (usually)
		- for passowords should be slow
		- makes brute force attacks take time
		- key strechting (repeated application of hash)
		- use complex memory access patterns to defeat esp

effectively a digital fingerprint;

## collision probability

$v = a^l$

- ![theory slide|400](https://i.imgur.com/EqydQtI.png)
- ![example slide|400](https://i.imgur.com/xEKxhIT.png)
- ![reverse example slide|400](https://i.imgur.com/eWjhqjv.png)

can also be used to compare complexity of passwords
- ![passwords slide](https://i.imgur.com/GdaMF4r.png)
- should have about 80 bits of entropy


- ![collision probability slide|400](https://i.imgur.com/auwVphr.png)

## uses of hashing
![hashing security appplications slide|400](https://i.imgur.com/v5T9yTB.png)


# Binary


# One-time-pads


## limitations


# assymetric cryptography


# digital signatures

