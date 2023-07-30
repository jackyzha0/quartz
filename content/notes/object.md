---
title: "object"
aliases: Object
tags: 
- info201
---

# Objects

an abstraction of something gin a problem domain, reflecting the capabilities of the system to keep information about it, interact with it, or both

entities in any of the software modelling int implementation spaces that are neatly defined by their identity state and behaviour

similar to an entity but can also include dynamic behaviour

OOP is programming and modelling using objects

## Objects as a Model of reality
theoretically objects give us better models of reality

richer variety of data types
- able to more closely model complexity of real world entities
- compart with most data bases (numbers, text, dates)
- objects and their operations (behaviour) are self contained
- facilitate code reuse

## Basic features of objects

state

behaviour

## Classes and instances
class : definition of object structure and behaviour
instance : object occurrence, derived from a particular class


## References
pointer directly to object _instance_ 


## encapsulation
decouples internal implementation from public [[application-programming-interface|API]]
- can change each independently
- e.g., performance, different algorithms
- [[application-programming-interface|API]] stability is important

state and behaviour separated into pubic and private
- all fields should be private
- some methods will also be private

## Inheritance
usually via specialisation - aka subclass, subtype

subclasses inherit public state and behaviour from superclass
- can define additional properties and behaviour

enable [[polymorphism]]
- e.g., Integer and Rational both subclass Number

