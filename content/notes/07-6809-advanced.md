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
- extended indirect `LDA [$31FE]` or `LDA [HERE]`
	- useful in a device driver
- direct `LDA $ff` or `lda <HERE`
- register `trf X,Y`
- indexed
- indexed indirect
- relative
	- program counter relative

