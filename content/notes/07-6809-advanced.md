---
title: "07-6809-advanced"
aliases: 
tags: 
- lecture
- cosc204
---

10 addressing modes
- implied `inca`
- immediate `lda #$00`
- extended `LDA $31FE` 
- extended indirect `LDA [$31FE]` or `LDA [HERE]` points to a memory location which specifies another memory location
- direct `LDA $ff` or `lda <HERE`
- register `trf X,Y`
- indexed `LDA $3111E, X` use memory location that is the sum of the operands
	- `LDA ,X`
	- `LDA $23,X`
	- etc
- indexed indirect `LDA [$10, X]`
- relative `BEQ HERE`
	- BEQ does a short branch
	- LBEQ does a long branch
	- the value is relative to HERE
- program counter relative `LDA TABLE,PCR ; A = the value stored at TABLE`
	- if all memory references are relative, then the program cna be loaded anywhere is memory, and will still work. It is said to be **relocatable**


 

