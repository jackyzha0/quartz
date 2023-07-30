---
title: "uml-java-forward-engineering"
aliases: UML to Java Foward Engineering
tags: 
- info201
---

similar to ERD to sql. 

use case diagrams - more about system structure and features
**class diagram - java class
- doesn't have to be java
- could be any oop language
sequence, activity, state etc, may or may not be useful. 
some code can be automatically generated.

custom methods cannot be generated automatically. things like getters and setters can be generated automatically.

## Steps
1. uml class -> java class (in its own file) (dont overdo it) (e.g., librarian)
	1. use conceptual vs implementation level diagrams
2. assign data types to explicit class fields
3. add fields implied by associations
	1. unidir ⇒ field in class at tail of -->
	2. bidir ⇒ field in class at both ends <-->
	3. multi = 1 ⇒ simple field (e.g., string)
	4. multi > 1 ⇒ appropraite collection type (e.g., arraylist, hashmap etc)
4. field visibilty normally private (should match class diagram)
5. add constructors if needed
6. add public getter and setter methods (trivial, can be auto generated)
7. add remaining public or private methods (includilng implemented interfaces)

## Visibility of fields and methods
![visibility of fields and methods](https://i.imgur.com/0xM09La.png)

## use case diagrams
[use-case-diagrams](notes/use-case-diagrams.md)
each use case represents a feature. often items in a menu. sub cases can be sub menu items (extnd, include, require) (sometimes).

actors *can* correspond to domain classes.

one use case might require/use several classes. e.g., UI, processor, or data classes.

## other behavioural diagrams
**sequence:
- could be used for looping and branching
**activity:
- low level in particular
- can be used to generate some code
- would require discipline in diagram conventions
	- by this point you are basically writing code in graphical form anyway
	- might as well just write the code anyway
**state: 
- most useful/likely to be use for code
	- states machines are tedious
	- [finite-state-machine](notes/finite-state-machine.md)
- often translate to some kind of lookup mechanism
- fairly easy to generate correspoding code
- boils down to some kind of index.
- however these are not used very often
- once this code is generated is hard to fix manually
	- better to just change the diagam and regenerate the code

## subclasses
![employe diagram example](https://i.imgur.com/EAiVEkt.png)
![eployee code example](https://i.imgur.com/bighWWJ.png)
![code continued](https://i.imgur.com/Hxcho66.png)

- this example is contrived
- salariedemployee and waged employee inherit all public and protected methods of employee (including getters and setters, not including constructors)
- salariedEmpoyee and waged employee each have thier own computePay method

## Interfaces
![diagram](https://i.imgur.com/pN660p0.png)
![code](https://i.imgur.com/iDyoeSE.png)

- generally preffered to subclasses
- both salaried and waged employees must implement the computePay method

# Domain class model vs ERD structure
- erd are about long term storage. data persistence
- domain [[models]] are about application process, temporary storage. 
- database and class structures dont need to be the same
- but you do need to be able to map between them

![domain class model vs erd structure](https://i.imgur.com/feN6a9W.png)

# Example: Library system
e.g., 
![library example uml diagram](https://i.imgur.com/u4CNXOb.png)
the five horizontal items could be meny items. there will be some kind of authorisation for senior librarians. we probably wouldn't make seniour and junior librarian as differnce classes. there is not really any benefit, doing this would be overkill. We should use a single librarian class with `type` field. this field can be used for authorisation. The apply fine use case is an optional sub task. It could be implemented in many ways: checkbox on return form, sub menu item, automatic. shelve item is a differnt, its more of a business process. only thing need in the code it the change the status of the item. 

![class diagram](https://i.imgur.com/VjyvYPe.png)

![code part 1 Loan class](https://i.imgur.com/6VoV54C.png)
![code part 2 Loan class 2](https://i.imgur.com/Q8yptdE.png)
![code part 2 Loan class 3](https://i.imgur.com/4Xst3ys.png)


## Multiplicity
![](https://i.imgur.com/yJIH7dK.png)

mih multiplicity of - ⇒ can create instances of Loan withou providing any associated LoanItem instances

min multiplicity 1 ⇒ must provide associated Loan instand when creating a LoanItem instance
1. create loan and loanItem then use LoanItem.setLoan()
2. use a custom LoanItem constructor to pass Loan object

![multiplicity code ](https://i.imgur.com/RKa9NBy.png)

unidirectional association are preffered as here we need to link things birdirectionally. this example is contrived, in real life it would not be done this way.
