---
title: "combinatorial-logic"
aliases:
tags: 
- cosc204
---

> [!Definition]
> Combinatorial Logic Circuit is a circuit whose digital outputs are dependent only on its digital inputs
They can be described using logic expressions and therefore logic gates. We assume the outputs respond immediately^[1]

- current flows from + to -
- input to a unit (e.g., LED) is at the + end

They can be defined:
- Using a truth table
- Using [boolean-equations](notes/boolean-equations.md) ($Q\ =\ A+\ B$) 
- Using graphical symbols

# Adders
![1 Bit half adder](https://i.imgur.com/mjCVU4I.png)
![1 Bit full adder: (includes carry input)](https://i.imgur.com/yu6kS83.png)
![Ripple carry adder](https://i.imgur.com/HtEIZ5t.png)

# Parity Generator
- 3 Bit parity Generator
	- Adds an extra bit to the input data so that the number of ones in the output is always odd
	- Used for error checking
	- [truth table](https://i.imgur.com/KDUiJbN.png)
	- [boolean equation](https://i.imgur.com/mwBpnlO.png)
	- [circuit](https://i.imgur.com/tsgDISC.png)

# Demux

# 7 Segment
- ![7 segment displlay](https://i.imgur.com/qtPmtwR.png)