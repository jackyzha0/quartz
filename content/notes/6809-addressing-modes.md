---
title: "6809-addressing-modes"
aliases: 
tags: 
- cosc204
---


name | example | description
---------------------------------------------------
implied |`inca `
0immediate  | `lda  #$00`
extended  | `lda $31FE`
extended indirect  | `lda [$31FE]`
direct  | `lda $FF$` or `lda <HERE`
register  | `trf X,Y`
indexed  | `lda #311E, X` `sta 0,X`
indexed relative  | `lda [$10, X]`
relative  | `beq HERE`
pr  | `lda TABLE,PCR`