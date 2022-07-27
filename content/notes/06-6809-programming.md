---
title: "06-6809-programming"
aliases: 
tags: 
- lecture
- cosc204
---

difficult
- no variables
- GOTO not loops
- only compare ints and bytes
- not really routines
- all vars global
- case sensitive

# Hello World

- need a routine that given a string will print each chracter one at a time
- need to know how to print

## Routines
```
routine:
	rts
```

- no params
- no local vars

calling routine
- lbsr, bsr, jsr
- very subtle differences
- we use bsr (branch to subroutine)

```
bsr routine
```

## Interation
use GOTOs

```
	clra           //A = 0
more:
	cmpa #$06      //compare A to $06
	beq done       //if equal, branch to done
	inca           //increment a
	bra more       //branch to more
done:
```

- comparison only compares and sets flags in CC
- you then branch on the result
	- `beq bge` etc
- other intructions set flags to
	- `lda` etc
- so

```
lda $45
beq somewhere
```

## 6809.uk text screen
![](https://i.imgur.com/dC1idMA.png)
