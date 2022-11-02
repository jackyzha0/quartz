---
title: "characters"
aliases: 
tags: 
- cosc204
---

# Characters
- A written symbol.
- In english are represented as a single byte, (other languages use 2 bytes or more)
- e.g., [different types of characters](https://i.imgur.com/DBLVhw8.png)

- characters are joined together to make human readable numbers and words

- `char ch` 
- ch is a variable name (identifier) 
- used to label a location in the computer's memory where a byte is stored
- when the code is compile, the name is assigned an address, in memory. The meaning of that data depends on how a human interprets it. it might be small integer, or a character, or a color etc.d

- each byte (or group of bytes) represents a number which maps to a character using a mapping like [Unicode](notes/characters.md#Unicode) or [ASCII](notes/characters.md#ASCII)

# ASCII
![ascii code|300](https://i.imgur.com/NbBtm1v.png)

A char is a 7-bit number (usually stored as a byte with the 8th bit set to zero) used as an index into a table of characters. The font describes how to draw these characters

- ASCII (american standard code for information) describes what should be drawn for Roman (english like) alphabets
- ASCII characters are stored using 7-bits
	- so there are 128 (2^7) possible characters
	- stored as a byte with the 8th bit set to zero
	- For sorting purposes characters are compared on their numeric value (called the *collating sequence*)
	- 'A' is before 'Z' but 'a' is after 'Z'!

# Unicode
![unicode|300](https://i.imgur.com/GEtVItW.png)

A 21-bit code with 144,697 characters from 159 scripts

- Other non roman languages
	- greek, arabic, chinese, hebrew, japanese, thai etc.
	- atrology symbols
	- emoji etc
- Unicode
	- developed by the Unicode Consortium
	- coordinated with ISO/IEC 10646
	- unicode maps from character numbers (code points) into glyphs (graphical representations)
	- Some(many) are reserved