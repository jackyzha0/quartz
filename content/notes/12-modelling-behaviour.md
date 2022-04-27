---
title: "12-modelling-behaviour"
tags: 
- info201
- lecture
sr-due: 2022-05-28
sr-interval: 31
sr-ease: 250
---
[slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2892846-dt-content-rid-18407618_1/courses/INFO201_S1DNIE_2022/2022/lectures/lecture_12_slides.pdf)

[modelling-behaviour](notes/modelling-behaviour.md)

- method signatures
- inheritance of behaviour
- lower level sequencing and flow of control
- compartmentalisation into "subsystems"

1. Compare and contrast the two typical approaches to inheriting behaviour in OO systems. 
2. What does it mean to “program to an interface” and why is this important?
3. Compare and contrast “rich” versus “anaemic” domain models with regards to behaviour.
4. Give an example of a “processor” in the context of OO system design and explain why these are useful.










# Garbage Notes
# 1 Example of Linked UML (not realistic)

![](https://i.imgur.com/SAp9l60.png)

![200](https://i.imgur.com/sDLFeRe.png) ![150](https://i.imgur.com/JXSxAKy.png) ![200](https://i.imgur.com/RhQZdep.png)

# 2 Inheritance

## 2.1 Inheriting behaviour via specialisation

e.g., 

- subclass of item
	- inherit all public members of Item
	- can replace or customeise any intherited method
	- can add their own specialised methods (including constructors)
	- can’t concurrently be subclasses of anything else (single inheritance)
- Things that know how to use Item will also accept Book or Disc.

![](https://i.imgur.com/Nul5ECp.png)


### 2.1.1 Specialisation in Java

![300](https://i.imgur.com/D7nZ2ON.png)


## 2.2 Inheriting behaviour via implenting an interface

![](https://i.imgur.com/tZX8uQT.png)

- Search specifies a set of common behaviour.
	- public methods and constant fields only (no variable fields)
	- effectively an “inheritable” public API (no implementation) ⇒ Catalogue must implement all Search methods
	- independent of inheritance via specialisation
	- a class can implement multiple interfaces
- Things that know how to use Search will also accept Catalogue.

### 2.2.1 Interface in java

![](https://i.imgur.com/2cXr5CM.png)

- Examples of built-in Java interfaces: (also see INFO 202) 
- Collection: collections of objects (lists, sets, maps, …) 
- Iterable: collections that can be iterated over 
- Comparable: objects that have a concept of ordering

## 2.3 Public API vs private implementation

- The public API defines what a class can do 
	- e.g., read and write data, manage a list of items 
	- effectively a “promise” or “contract” to other classes that use it 
	- should be as stable as possible 

- The private implementation defines how a class behaves 
	- e.g., data stored in memory vs. CSV files vs. SQL DBMS vs. …, unsorted lists vs. sorted vs. unique vs. … 
	- can change to improve speed, reduce memory, redesign architecture, take advantage of new language features, …
	- shouldn’t be exposed to other classes

## 2.4 Why public and private are decoupled

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

## 2.5 Java collection interface example

- A collection is a container for groups of objects: 
	- e.g., lists, sets, stacks, trees, … 
	- common behaviour (public API): add, remove, count items, … 
	- specialised behaviour (private implementation): indexing, uniqueness, sorting, … 
- Java’s Collection interface defines common behaviour: 
	- add() or remove() items 
	- get size() of collection 
	- … 
- All Java collection types implement Collection. 

Anything coded to work with Collection will accept *any* Java collection type. (e.g., ArrayList, HashSet, TreeMap, …)

### 2.5.1 Bad example

![](https://i.imgur.com/89PjFdT.png)

- Internal details (ArrayList) are exposed in public API. 
- What if requirements change so that each product can appear only once? (requires HashSet) 
- Could change all ArrayList to HashSet, but: 
	- need to update everywhere getAllProducts() and getProductsByName() are called! (⇒ massive breakage potential) 
	- what if requirements change again

### 2.5.2 Good Example

![](https://i.imgur.com/j33SjYm.png)


- Public API specifies Collection. (general) 
- Private implementation uses ArrayList. (specific) 
- Everything outside Inventory sees only Collection. (internal details not exposed)
- Can switch to HashSet, TreeSet, … without breaking anything.

# 3 Behaviour in Domain models

## 3.1 Rich domain models

- True OO involves sending objects “native instructions” beyond basic getter/setter methods: 
	- e.g., they can save, display, update, validate, etc., themselves 
	- often requires communicating with other objects 
- Advantages: 
	- better encapsulation ⇒ more scope for reuse 
	- methods are highly cohesive (focused) 
	- natural fit with programming to an interface 
- Disadvantages: 
	- many “chicken and egg” situations ⇒ harder to use 
	- bordering on taking things too far (too much abstraction) 
	- well beyond comfort zone of many developers (“exotic”)

### 3.1.1 Rich domain example: Library system

![](https://i.imgur.com/TCNp6vY.png)


## 3.2 Contrast with anaemic domain models

- Objects have relatively little “native” behaviour: (if any) 
	- mostly just state 
	- don’t inherit from anything else (class or interface) 
	- getters/setters don’t really encapsulate much 
	- methods manipulate only internal state (no external communication) 
	- generally referred to as JavaBeans in Java (also POJO) 
- Require a lot of “plumbing” code to shift data into and out of objects so we can do something useful with it. 
- De facto standard for most programmers/systems

![](https://i.imgur.com/snGpG4m.png)


## 3.3 Reducing the plumbing in anaemic models 

- Frequently need to move data between domain objects and other (sub)systems, e.g.: 
	- GUI components (see INFO 202) 
	- data stores (also see Lecture 17) 
	- barcode management subsystem 
	- shipping (sub)system 
	- inventory (sub)system 
	- … 
- “Processor objects” can encapsulate these interactions: 
	- effectively “(sub)system APIs” that group related behaviour 
	- either classes or (Java) interfaces, as appropriate 
	- methods take relevant domain objects as arguments 
- Third-party frameworks can reduce the amount of code you need to write even further. (see INFO 202)

![](https://i.imgur.com/EoX8sTA.png)

# 4 Lecture summary 

- There are a variety of behavioural diagrams in UML. 
- Behaviour can be inherited directly via specialisation, or indirectly by implementing an interface. 
- interfaces decouple public API from private implementation 
- programming to an interface 
- Domain models can be “rich” or “anaemic”. 
- anaemic more common 
- use “processors” to encapsulate “plumbing” code