---
title: "boolean-equations"
aliases: 
tags: 
- cosc204
---

Often used to describe/define [combinatorial-logic](notes/combinatorial-logic.md)

# Precedence
Precedence
- NOT is unary, so it has the highest precedence
- AND is mulitply, so it comes next
- OR is like plus, to it comes last

![Precedence table|200](https://i.imgur.com/jPlrVwW.png)

# Creating boolean equations

![example equation](https://i.imgur.com/fiNKbJT.png)
![equivalent truth table](https://i.imgur.com/wlm0Cu1.png)

Creating boolean equations:
- for each row where output is 1
- write the equation as a function of the inputs  (using AND)
- Write the final equation, putting OR between each clause

# De Morgan's Theorum
- !(A + B) = A! & !B
- !(A + B + C + ... + X) = !A & !B & !C & ... & !X
- [truth table](https://i.imgur.com/QegVxkx.png)
- any boolean function can be represented as the sum of logical products
- All combinatorial circuits can be described using just one gate type (either nand or nor) [^2]

[^2] : The Apollo Guidance Computer used about 5600 NOR gates and no other gate types!