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

write h to top left
```
lda #'H'
sta $0400
```

add an 'e' beside that
```
lda #'E'
sta $0401
```

## print routine
![](https://i.imgur.com/IEiGKtj.png)

- pass the address of the string in Y
- "address" - the index into the memory array the hold the first character of the string
- use $00 to end the string

## algorithm
- print a string
	- Load a character from memory\[Y] 
	- Move on to the next character (Y++) 
	- Compare the character to $00 If equal exit this routine 
	- Write the character to the screen 
	- Move on to the next screen location 
	- GOTO start

PUTS()

```
;
; 
Routine: PUTS 
; Pass the address of the string in Y 
; 
PUTS: 
	ldx #$0400 ; start of screen 
more: 
	lda 0,y ; current char -> A  (load y into a)
	leay 1,y ; increment y 
	cmpa #$00 ; was it a zero? 
	beq done ; if it was 0 then return 
	sta 0,x ; write  (store a in x)
	leax 1,x ; increment x 
	bra more ; repeat 
done: 
	rts ; return from this routine
```

