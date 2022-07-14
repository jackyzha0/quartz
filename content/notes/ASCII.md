---
title: "ASCII"
aliases: 
tags: 
- cosc204
---

# ASCII Character Code
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