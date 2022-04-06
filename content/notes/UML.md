---
title: "UML"
tags: 
- info201
---

A standard set of model constructs and notation defined by the object management group

specify what not how

- activity diagrams
	- high level for business prcesses workflows
	- low level for dtailed business logic
- advantages
	-  describe workflows
	- specify relative processing rder of activites
	- simple
	- can be shown to stakeholders for checking and confirmation

enables implementation-independent specification of:
- user/system interactions
- partitioning of responsibility
- integration with larger or existing systems
- data flow and dependency
- order of operations (algorithms and processes)
- concurrent operations

## 1 why is is useful
- helps develop efficient effective correct designs
- better communication with project stakeholders
- gives a big picture view of the project system
- independent of specific programming languages or development processes
- de facto standard for modelling OO systems

## 2 what it is not
- visual modelling software
- a programming languages
- a software development process, method, or methodology

## 3 Types of diagram
### 3.1 structural

![](https://i.imgur.com/zS15EFj.png#invert)

### 3.2 behavioural

![](https://i.imgur.com/4lj2QIt.png#invert)

### 3.3 Linked diagrams
each digram type models a dfiferenct aspect of the system
many of the diagrams link to each other
- e.g., use case, sequence, activity
- e.g., object, communication

e.g.,

![](https://i.imgur.com/CWGGErM.png)
![](https://i.imgur.com/PKHcpMx.png)


### 3.4 Activites and transitions

![](https://i.imgur.com/1G14Ntn.png)

- activities
	- take place over some pariod of time
	- linked by transitions (arrows)
	- only one starting point potentaily many ending conditions

- Transitions
	- have guard conditions that must be satisfied before the transition can occur

### 3.5 Decision points
- represent conditional branching
- two or more alternative transitions depending on condition
- every transiiton exiting the decision point must have a guard condition

![](https://i.imgur.com/KCufkgX.png)

### 3.6 Synchonisation bars
- represents two or more activites running in parallel
- transitions can be split into mutiple paths and recombined later
- if a workflow is split then it must be recombined on the same diagram

![](https://i.imgur.com/IVfP7vt.png)

### 3.7 swim lanes
- same as BPMN
- show who is responsible for a process
- can represent
	- business organisations
	- depts
	- people (actors)
- can simplify processes

![](https://i.imgur.com/cRiZjtE.png)


### 3.8 relationships to use cases
- use case diagrams show the high level interactions between actors and cases
- high level activity diagrams show the sequence of use cases within a workflow

![](https://i.imgur.com/3b9f2va.png)


#### 3.8.1 example

![](https://i.imgur.com/dKHjIdu.png)

![](https://i.imgur.com/yCAjqkZ.png)

![](https://i.imgur.com/RifaVaq.png)

### 3.9 Example producing a book

![](https://i.imgur.com/X5aFAt2.png)

![](https://i.imgur.com/AKVAshk.png)