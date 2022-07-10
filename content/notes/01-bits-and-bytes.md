---
title: "01-bits-and-bytes"
aliases: 
tags: 
- cosc204
- lecture
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

# Computer memory
- SImilar to the switch board in your home
- Each switch has a number
- they are all always there
- you can switch the state by flipping the switch

 - Each switch has:
	 - A address/location (swtich number)
	 - A value (on/off)

- computer languages allow us to name some of the locations, its easuer than remembering its number (variable)


# Bits, Nibbles, Bytes
-  The smallest unit of storage is a buit (0 or 1)
- (for convenience) bit are grouped into larger units.
	- a nibble is 4 bits
	- a byte is 8 bits
- For convenience bytes are given addresses, not nibble or bits. (they are too small to work with most of the time)

# A Word of memory
- The word is the number of bits the cpu uses internally, varies between manufacturers and CPUs.
- Now its usually 64 bits
-  