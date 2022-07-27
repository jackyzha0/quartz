---
title: "02-combinatorial-logic"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-08-16
sr-interval: 20
sr-ease: 250
---

- [slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2954102-dt-content-rid-18888626_1/courses/COSC204_S2DNI_2022/L2%20-%20Combinatorial%20Logic.pdf)



- [transistors](notes/transistors.md)
- [combinatorial-logic-circuit](notes/combinatorial-logic-circuit.md)
- [boolean-equations](notes/boolean-equations.md)
- [logic-gates](notes/logic-gates.md)
- [demultiplexor](notes/demultiplexor.md)















# Circuit basics:
- current flows + to -
- input to a unit (e.g., LED) is the + end

# Combinatorial Logic Circuit
> [!Definition]
> Combinatorial Logic Circuit is a circuit whose digital outputs are dependent only on its digital inputs
They can be described using logic expressions and therefore logic gates. We assume the outputs respond immediately^[1]

They can be defined:
- Using a truth table
- Using boolean equations ($Q\ =\ A+\ B$) 
- Using graphical symbols  

- [1 Bit half adder](https://i.imgur.com/mjCVU4I.png)
- [1 Bit full adder: (includes carry input)](https://i.imgur.com/yu6kS83.png)
- [Ripple carry adder](https://i.imgur.com/HtEIZ5t.png)
- 3 Bit parity Generator
	- Adds an extra bit to the input data so that the number of ones in the output is always odd
	- Used for error checking
	- [truth table](https://i.imgur.com/KDUiJbN.png)
	- [boolean equation](https://i.imgur.com/mwBpnlO.png)
	- [circuit](https://i.imgur.com/tsgDISC.png)
- [7 segment displlay](https://i.imgur.com/qtPmtwR.png)

# Boolean Equations

Precedence
- NOT is unary, so it has the highest precedence
- AND is mulitply, so it comes next
- OR is like plusl, to it comes last

![Precedence table|200](https://i.imgur.com/jPlrVwW.png)

Creating boolean equations:
- for each row where output is 1
- write the equation as a function of the inputs  (using AND)
- Write the final equation, putting OR between each clause
- [example](https://i.imgur.com/RoBTEfH.png)

# De Morgan's Theorum
- !(A + B) = A! & !B
- !(A + B + C + ... + X) = !A & !B & !C & ... & !X
- [truth table](https://i.imgur.com/QegVxkx.png)
- any boolean function can be represented as the sum of logical products
- All combinatorial circuits can be described using just one gate type (either nand or nor) [^2]

# Transistors
![simple transistor diagram|100](https://i.imgur.com/oBuNR9m.png)

- B: Base ⇒ A swtich connecting C to E
	- open (C is disconnected from E) when supplied 0v
	- closed (C is connected to E) by applying +5V
- C: Collector
- E: Emitter

Possible to create NAND gate using just transistors ∴ possible to create all logic gates using only transistors [^3]

# Demultiplexor
- Mutli way swtich where the address determines which output recieves the input
- [2 bit address diagram and truth table](https://i.imgur.com/XQteI3j.png)

# Logic Gates
- NOT
- AND
- OR
- NAND
- NOR
- XOR/EOR




[^1] : In real circuits propagation delay must be considered, hence the clock cycle on CPUs
[^2] : The Apollo Guidance Computer used about 5600 NOR gates and no other gate types!
[^3] : They dont actually do it this way (see lab)