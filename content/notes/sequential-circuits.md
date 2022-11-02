---
title: "sequential-circuits"
aliases: 
tags: 
- cosc204
---


[combinatorial-logic-circuits](notes/combinatorial-logic.md) always  produce the same outputs given the same input. Sequential curcuits on the other hand, produce different outputs depending on past history and the inputs. 

![combinatorial vs sequential|200](https://i.imgur.com/GbfAZ4c.png)

There are two main types of sequential circuit
- Sychronous
	- this is when changes of state occur in time with a clock cycle
	- changes of input occur between clock pulses
	- state changes occur at the clock pulses
- Asynchronous
	- state changes occur as the inputs occur
	- event driven

# Main circuits
## SR latch
The set reset latch is the most basic and simple sequential circuit. It is anychronous

![simple sr latch with NOR gate|200](https://i.imgur.com/ay6uk33.png)

The ouput is remembered and changed basic on previous output. 
- When S (set) is pulsed Q is one and Q̄ is zero
- When R (reset) is pulsed Q is set to zero and Q̄ is set to one

## D Flip FLop

![D flip flop with NAND gates|200](https://i.imgur.com/XVnK2s6.png)

The D flip flop is basically an SR connected to a clock. Making it synchronous.

Instead of switching when you set or reset. The outputs change when the clock pulses. Depending on the value of the D(ata) input. 

[circuit simulation](https://tinyurl.com/2cafc57y)

## T Flip Flop

![T Flip Flop with NAND and NOR gates|200](https://i.imgur.com/CZd3aYK.png)

The T flip flop swtiches between the two outputs Q and Q̄ when
- T(oggle) is held high
- And the clock is cycled (from off to on to off)

## JK Flip Flop

![JK flip flop diagram|200](https://i.imgur.com/dFZGyMh.png)

The JK flip flop is a combination of the d flip flop and the t flip flop. 

| J | K | Result    |
|:--|:--|:----------|
| 0 | 0 | No Change |
| 0 | 1 | Set       |
| 1 | 0 | Reset     |
| 1 | 1 | Toggle    |

It can be used as a toggle *and* as a d flip flop.

![jk flip flop simulation](https://tinyurl.com/22pvm3sf)

## Synchronous Counter

 ![simulation](https://tinyurl.com/25olydjb)
 ![slide|300](https://i.imgur.com/81LS7HL.png)


## Video demonstration of some sequential circuits
<iframe width="560" height="315" src="https://www.youtube.com/embed/I0-izyq6q5s?start=84" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
