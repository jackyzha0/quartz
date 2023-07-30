---
title: "use-case-diagrams"
tags: 
- info201
---

- specifies the participants (actors) and the relationships between them
- high level view of what a system does (not how) and who uses it
- represent users perspective of a system
- used mainly in [[requirements]] specification and early system dev
- effectively a todo list

## 1 pros
+ informal, flexible, easy to construct
+ easily understood
	+ improve communication between users and developers
	+ can be used to confirm [[requirements]]
+ provide overview
+ link analysis to design
+ can be used to inform subsequent dev tasks
	+ derive test cases
	+ prioritise implementation tasks
	+ help clarify new feature requests or bug reports

## 2 Notation

### 2.1 Actor
- roles that people have when interacting with the system
- external systems or hardware that are essential to system operation

![](https://i.imgur.com/PtZlwjO.png)

### 2.2 Use case
- discrete unit of system functionality
- activity from perspective of an actor
- can be abstract or focused
- say nothing about flow or behaviour
- map to ⇒ menu items, forms, reports, etc

![](https://i.imgur.com/LiSjoef.png)

### 2.3 Association
- relationship (interaction) between actor and use case
- actor can be associated with more than one use case
- use case can be associated with more than one actor
 
![](https://i.imgur.com/ySvfY3Y.png)

### 2.4 Specialisation/generalisation
- actors and use cases can be organised into special/general hierarchies
	- actors can be specialisations of another actor
	- same for use cases
	- mutually exclusive
	- similar to [[inheritance]]

![](https://i.imgur.com/cw21m6L.png)

### 2.5 Dependency
 - occur between use cases
	 - one case extends the behaviour of another
	 - one case includes the behaviour of another
	 - one case requires the behaviour of another
 - read in direction of arrow
 - indicate opportunities for reuse of functionality

![](https://i.imgur.com/Liv9gan.png)

#### 2.5.1 Extends dependency
- use cases can have optional, subordinate tasks
- useful with specialised actors

![](https://i.imgur.com/f2CNebR.png)

#### 2.5.2 Includes dependency
- use cases that have mandatory, subordinate tasks
- does not indicate sequence, only that they must happen

![](https://i.imgur.com/8exIQtK.png)

#### 2.5.3 Requires dependency
- mandatory, _independent_ tasks, that must be completed first
- forces sequence
- use sparingly

![](https://i.imgur.com/ZjAnIry.png)

## 3 development of use case diagrams
organise related use case diagrams into use case model
- have have multiple levels of detail
- group related diagrams into packages

### 3.1 example methods
- user goal technique ⇒ simple
- event decompositition technique ⇒ more comprehensive

### 3.2 top down
identify actors ⇒ identify use cases ⇒ detail use cases
	- who will enter and/or recience information
	- what other systems will interact with the system
- prioritise use cases
- further develop use case, starting with highest priority
- structure overall use case model

> **avoid specifying the sequence**

### 3.3 bottom up
create scenario ⇒ generalise scenario ⇒ organise use case model

## 4 Examples
![](https://i.imgur.com/ZCgEN9I.png)
![](https://i.imgur.com/LuOYfhy.png)
![](https://i.imgur.com/1ZOgZR9.png)
![](https://i.imgur.com/Y9E8ao2.png)
