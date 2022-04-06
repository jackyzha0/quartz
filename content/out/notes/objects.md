---
title: Objects
---
# 1 Objects
an abastraction of somethin gin a problem domain, reflecting the capabilities of the system to keep information about it interact with it or  both

entities in any of the software nmodelling int implmenation spaces that are enatly defined by their identity state and behaviour

similar to an entity but can also incude dynamic behaviour

oop is programming and modelling using objects

### 0.1 Objects as a Model of reality
theoreftically objects give us better omodels of reality

richer variaty of data types
- able to more closely model complexity of real world entities
- compart with most data bases (numbers, text, datess)
- objects and their operations (behaviour) are self contained
- facilitate code reuse

### 0.2 Basic features of objects

state

behaviour

### 0.3 Classes and instances
class : definition of object structure and behaviour
instance : object occurence, derived from a particular class


### 0.4 References
pointer dirctly to object _instance_ 


### 0.5 encapsulation
decouples internal implementation from public API
- can chagne each independently
- e.g., performance, differnt algroithms
- APi stability is important

state and behaviour separated into pubic and private
- all fields should be private
- some methods will also be private

### 0.6 Inheritance
usually via specialisation - aka subclass, subtype

subclasses inherit public state and behaviour from superclass
- can define additional properties and behaviour

enable polumorphism
- e.g., Integer and Rational both subcalss Number