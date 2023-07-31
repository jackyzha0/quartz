---
title: "01-bits-and-bytes"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2024-10-18
sr-interval: 445
sr-ease: 230
---

[memory](notes/memory.md)
[unicode](notes/unicode.md)
[characters](notes/characters.md)
[digital-data](notes/digital-data.md)
























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
- For convenience bytes are given addresses, not nibbles or bits. (they are too small to work with most of the time)

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
- when the code is compile, the name is assigned an address, in memory. The meaning of that data depends on how a human interprets it. it might be small integer, or a character, or a color etc.

## ASCII Character Code
![ascii code](https://i.imgur.com/NbBtm1v.png)

1. The computer uses ch as a integer index into a pre-existing table 
2. the computer screen is made up of a thousand little dots called pixels. theyre in a rectangular grid like a table.a

- [ascii code example](https://i.imgur.com/9uvKRVo.png)

- There are several tables that describe what to draw
	- fonts describe how to draw them
- ASCII (american standard code for information) describes what should be drawn for Roman (english like) alphabets
- e.g.,
	- A 1000001 (65)
	- B 1100001 (97)
	- 9 0111001 (57)
- There are only a few letter numbers and punctuation marks. The remaining ASCII code are non-printing and have other meaning (line feed, for feed, tab etcc)
- ASCII characters are stored using 7-bits
	- so there are 128 (2^7) possible characters
	- stored as a byte with the 8th bit set to zero
	- For sorting purposes characters are compared on their numeric value (called the *collating sequence*)
	- 'A' is before 'Z' but 'a' is after 'Z'!

## Unicode
![unicode](https://i.imgur.com/GEtVItW.png)

- Other non roman languages
	- greek, arabic, chinese, hebrew, japanese, thai etc.
	- atrology symbols
	- emoji etc
- Unicode
	- developed by the Unicode Consortium
	- coordinated with ISO/IEC 10646
	- a 21-bit code with 144,697 characters from 159 scripts
	- unicode maps from character numbers (code points) into glyphs (graphical representations)
	- Some(many) are reserved


# Homework
- How are character strings (e.g. “hello world”) stored in a computer?
- Is this different between different programming languages (for example; C and Java)?