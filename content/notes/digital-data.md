---
title: "digital-data"
aliases: 
tags: 
- cosc204
---

# What is data
- A fact — a piece of information
	- corresponds to discreete facts about phenomena from which we gain information abou the world
- The concept of a *value* is fundamental to data
	- e.g., 25, $356.00, April, "this is a sentence", colours etc
- Vaues are abstract, they are interpretations of data
	- There are many way of storing the same data
	- e.g., 12, twelve, XII, 1100, · ··, ·----··---

# How computers represent data
- In *Binary*
- Stored in one of two states, true/false, 1/0, on/off, voltage/no voltage
- Each instance of a state is called a *bit*. (binary digit)
- *Values* are represented as a sequence of bits.
	- e.g., 1000001
	- The computer doesn't "know" what any given sequence means, **you** know.
	- could be 65, A, or anything **You** want it to mean

# Bits, Nibbles, Bytes
-  The smallest unit of storage is a buit (0 or 1)
- (for convenience) bit are grouped into larger units.
	- a nibble is 4 bits
	- a byte is 8 bits
- For convenience bytes are given addresses, not nibbles or bits. (they are too small to work with most of the time)

# Memory
Data is stored in [memory](notes/memory.md)

# A Word of memory
- The word is the number of bits the cpu uses internally, varies between manufacturers and CPUs.
- Now its usually 64 bits
- [amount of bits for different devices](https://i.imgur.com/nHrz1zX.png)

# Characters
- A written symbol.
- In english are represented as a single byte, (other languages use 2 bytes or more)
- e.g., [different types of characters](https://i.imgur.com/DBLVhw8.png)

- characters are joined together to make human readable numbers and words

- `char ch` 
- ch is a variable name (identifier) 
- used to label a location in the computer's memory where a byte is stored
- when the code is compile, the name is assigned an address, in memory. The meaning of that data depends on how a human interprets it. it might be small integer, or a character, or a color etc.d

- each byte (or group of bytes) represents a number which maps to a character using a mapping like [unicode](notes/unicode.md) or [ASCII](notes/ASCII.md)