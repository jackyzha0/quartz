---
number headings: auto, first-level 1, max 6, 1.1
title: "modelling-behaviour"
aliases: modelling behaviour, Modelling behaviour
tags: 
- info201
---

[relevant slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2892846-dt-content-rid-18407618_1/courses/INFO201_S1DNIE_2022/2022/lectures/lecture_12_slides.pdf), [lecture recording](https://echo360.net.au/lesson/3807232c-e251-4818-a098-c61f6a6b455a/classroom#sortDirection=desc), [relevant article](https://thevaluable.dev/anemic-domain-model/)

Modelling behaviour is more complex than modelling the structure of OOP systems (e.g., [class-diagrams](notes/class-diagrams.md). There are more diagram types, they are more general, and more complicated.

Class do diagrams specify *some* behaviour (public vs private, method signature and implementations, api (what methods are available), inheritance and behaviour).

Models of system and object behaviour cover these and also lower level sequencing and flow of control, and compartmentalisation into "subsystems"

# 1 Inheritance
## 1.1 Via Specialisation
Inheritance via specialisation is when something is subclass of something else. Subclasses inherit all public members of their parents. They are able to replace or customise inherited existing methods and add their own specialsed methods (including constructors). [example class diagram](https://i.imgur.com/Nul5ECp.png), [example java code](https://i.imgur.com/D7nZ2ON.png)

## 1.2 Via Interface
An interface is a class that specifies a set of common behaviour. 
- public methods and constant fields only (no variable fields)
- effectively an “inheritable” public API (no implementation) ⇒ Catalogue must implement all Search methods
- independent of inheritance via specialisation
- a class can implement multiple interfaces

[example class diagram](https://i.imgur.com/tZX8uQT.png) 

in Java: 
- [example java code](https://i.imgur.com/2cXr5CM.png)
- Examples of built-in Java interfaces: (also see INFO 202) 
- Collection: collections of objects (lists, sets, maps, …) 
- Iterable: collections that can be iterated over 
- Comparable: objects that have a concept of ordering

## 1.3 Public vs Private
- The public API defines what a class can do 
	- e.g., read and write data, manage a list of items 
	- effectively a “promise” or “contract” to other classes that use it 
	- should be as stable as possible 

- The private implementation defines how a class behaves 
	- e.g., data stored in memory vs. CSV files vs. SQL DBMS vs. …, unsorted lists vs. sorted vs. unique vs. … 
	- can change to improve speed, reduce memory, redesign architecture, take advantage of new language features, …
	- shouldn’t be exposed to other classes

### 1.3.1 Why
- More stable public API: 
	- doesn’t expose internal implementation details 
	- can change internals without breaking promised behaviour

- More flexible public API: 
	- less coding required to switch implementations 
	- can easily switch internal implementations on the fly (e.g., print receipt vs. save as PDF vs. send as email) 
- Programming to an interface (i.e., public API): 
	- encapsulate public API into a class or (Java) interface 
	- subclass or implement this to create specific implementations 
	- use the top-level class or interface everywhere you would otherwise use the specialised implementations


# 2 Behaviour
## 2.1 Anaemic domain models
In an anaemic domain model the **domain objects** also called **Models** contain (mostly) only data, and very little logic.

The **services** set the properties of the models via getters and setters. This defines the logic of the application

[anaemic example](https://i.imgur.com/PeaBhnX.png)

**Processor objects** are often used in anaemic systems to move data between objects. Also called **services**

[processor example](https://i.imgur.com/jw3Xbc1.png)


## 2.2 Rich domain models
In a rich domain model logic is contained within  **real domain models**. And the service layer thin and used only for third party services.

This means that the behaviour of the domain models is encapsulated within them

[rich example](https://i.imgur.com/eHmda7A.png)



#unfinished 