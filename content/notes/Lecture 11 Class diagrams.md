---
sr-due: 2022-04-08
sr-interval: 3
sr-ease: 250
---
#review 

# Revision questions
1. What is the purpose of stereotypes in UML? 
2. What is multiplicity and how is it represented on associations between classes? Provide a drawn example which uses an association between two classes.
3. How are role names used for associations between classes and when should you use them?
4. Discuss the issues that arise around the use of composition in the context of “cart-like” entities.
5. Describe the relationship between role names and navigability in a class diagram.
6. Explain the difference bewteen a domain class diagram and a system class diagram.

---
# Lecture 11 Class Diagrams
e.g., ![](https://i.imgur.com/rFmUs5r.png)
![](https://i.imgur.com/1kO9BDk.png)


## 1 Stereotypes
add further meaning to fields and methods
- e.g., << unique >>, << abstrat >>, << interface >>, 

## 2 Packages
group classes together
break system to logical chunks
package diagram, a class diagram with nothing but packages

![](https://i.imgur.com/UiXZeha.png)

## 3 Associations
UML anaglogue of ERD relationsips
- multiplicity
- realtionshpa nd role names

PlUS
- naviagability --> instances of one class can pass messages to instances of another
- several differnt types, e.g., composition, aggregation, associateive classes

### 3.1 multuplicity
![](https://i.imgur.com/1dSergW.png)
![](https://i.imgur.com/4TKsBKd.png)

ERDsd effectively only do zero one many
UML can to any non negative integer
default is 1

### 3.2 association names
![](https://i.imgur.com/btif86K.png)

- usuallya verb phrase like "assings", "manages", "enrols in" ...
- more useful is conpetual level diagrams
- optional arrow head ()

### 3.3 Role names
![](https://i.imgur.com/3HEG9yN.png)

At conceptual level, indicates role of class in association.

At implementation level:
- implies a field in class at opposite end
- should include visibility
- closely related to navigability

### 3.4 Navigability
![](https://i.imgur.com/beoNmcQ.png)

specifies whether we can "navigate from one end of an association to another"
affects how we code access paths between objects

e.g.,
- loan instance can see loanitem instances it contains via private field items
- a loanitem instance can't see loan instance that contains it
- must alwasy include relevant role names
- no arrows = two arrows = bidirectional

#### 3.4.1 why not always bidirectional

- more complex code --> many references/collections to manage
- navigation paths are not all equally important
	- e.g., "what items are in this loan" vs "what loans does this item appear in"
	- determined by requrements and typical usage
- some classes are more "central"
	- usually at the "one" end of accociations
	- often represent transactional entities e.g., loan, sale, order
	- navigability readiates outwards from them

there are exceptions as always e.g., patron <-> item


### 3.5 Aggregation
![](https://i.imgur.com/FI21bfD.png)

one class is made up of one or more other classes
container and content instances _can_ exist separately
usually implied by multiplicity and navigability

e.g.,
- computer is made u of several components
- library catalogue is made up of many items


### 3.6 Composition
![](https://i.imgur.com/2ryJXSM.png)

stonger form of aggregation
container and content _cannot_ exist separately
usually implied by multiplicity and navigability

e.g., 
- building contains many rooms
- loan includes several items

- coicident lifetime
- multiplicity at least 1 at both ends
- deleting an containter must also delete all associated contents
- creating a container should also create some contents


### 3.7 Associative classes
![](https://i.imgur.com/Rq91xGx.png)
![](https://i.imgur.com/zzOlLV1.png)

- used for conceptual design
- similar to associative entities
	- many to many relationship with additional independent fields
	- resolved into class at implementation level

### 3.8 Specialisation generalisation
![](https://i.imgur.com/kfI2YSe.png)

class inheritance
- e.g., book and disc are subclasses of (specialise) Item
- inherit all public fields and methods of superclass
- can add their own fields and methods
- Compare with specialisation of actors and use cases

## 4 Domain class model\
![](https://i.imgur.com/JFHQOFA.png)

only modles the associations among concepts from problem domain

can be at conceptual level or implementation level

## 5 System class model
![](https://i.imgur.com/KsQuCd5.png)
Models associations among domain objects and system components; implementation level only
