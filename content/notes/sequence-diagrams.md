---
title: "sequence-diagrams"
aliases: 
tags: 
- info201
---


equence diagrams document a *sequence* of particpant interactions required to carry out a use case
- actor <-> object
	- actors are outside the system
	- objects are otside the system
	- via a method call
		- might get a result
- object <-> object
- lifetime of interactions and objects
	- when they are created updated destroyed
- time is a key aspect
	- [use-case-diagrams](notes/use-case-diagrams.md) dont have order

These diagrams are:
- detailed, low level, bottom up
- behavioural diagram
	- not structural
- common in industry
	- along with class diagrams
- need to be designed and read alongside corresponding class diagrams
	- e.g., class diagrams with inform sequences diagrams and vice versa
	- back and forth process


General overview example: ![annotated example](https://i.imgur.com/1myG3rU.png)
- time goes from top to bottom
	- however no specific time units
- can have actors as participants
	- but not usually
	- existence of actor usualy indicates a sequence is owned by a use case
- interactions are indicated by messages (solid arrows)
	- e.g. actor to main menu
		- actor clicks a button
		- menu reacts
		- etc
	- messges are synchronous
		- i.e., thing sending message must wait for result
	- always method calls (or something that equated to a method call)
- participants are supposed to be instances of classes
	- however we are usually more interested in the class name
- the dashed lines are lifelines
	- can also be solid
	- basically indicate the existenc of something
	- e.g., Thingform gets destroyed, thingfinder and thing remain throughout
- the rectangles (activation bars) indicate when an a thing is doing somethin 
	- caused by incoming message
	- ended by a return
	- these can have sub activations
		- i.e., nested
	- these can be self-activations
	- implcit: not all methods return something

relevant slide:
![300](https://i.imgur.com/txdVhrV.png)


# Messages
![example](https://i.imgur.com/XedVmng.png)
- direction
	- <- or ->
	- easier to under stand if most messages are ->
	- however this is not always possible
		- same object used by multiple other objects
		- an object calls back to the object that called it
- can be conditions (guards) ![example](https://i.imgur.com/yWTcD1F.png)
	- only sent if condition is true
	- able to approximate if-then-else using multiple branches with exclusive conditions
	- this is better done in activity diagram
- looping messages ![example](https://i.imgur.com/tcFZ4bb.png)
	- an asterisk idicated looping
		- repeat message until condition id false
		- send messge to each object in a collection
	- may also be better in activity diagram

# Interaction frames (UML 2.x)
![example](https://i.imgur.com/V1Jhnd2.png)
- loop frame
	- any kind of loop
	- replaces * notation
- opt frame
	- optional or conditional processing
	- can replace [] notation
- alt frame
	- if-then-else
	- can replace [] notation

one thing that can cause complications is 
- when something can a top level loop which is waiting for input.
- a cancel anytime option


# Basic process of creation

- identity participants of a use case (dont always need to use a use-case diagram)
	- use use case to create first version of the activity diagram. as you implement the code update the class and activity diagrams
- identify messges required to carry out use case
- for each message
	- it is always sent
	- is it sent conditionally
	- is it sent multiple times
- assemble messages in correct sequence and attach to relevant lifelines/activations
- add returns where necessary

# Case study ATM

bank is developing a new ATM system for their customers

scope and requirements
- each customer has one or mor accounts
- transaction types are
	- view balance
	- withdraw cash
	- deposit funds
- the customer can cancel at any point before final confirmation
- customer authenticates by inserting bank card and entering four digit pin

process
- choose account
- choose amount
- check customer funds
- check amount in cash dipenser
- results
	- withdraw amount
	- dispense amount
	- remind user 

![use case diagram |500](https://i.imgur.com/O2mE91J.png)

this diagam is probably too general for this case

![class model](https://i.imgur.com/3kX68dm.png)

note navigability of domain

sequence diagram

- ![part 1](https://i.imgur.com/PJJBZav.png)
- ![part 2](https://i.imgur.com/M3jRM8g.png)
- ![part 3](https://i.imgur.com/PhCYWsy.png)
- ![part 4](https://i.imgur.com/L0h4nb8.png)




[full diagram](https://blackboard.otago.ac.nz/bbcswebdav/pid-2894257-dt-content-rid-18429333_1/courses/INFO201_S1DNIE_2022/2022/lectures/lecture_13_atm-withdraw-sequence-full.pdf)
