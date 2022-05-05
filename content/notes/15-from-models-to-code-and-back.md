---
title: "15-from-models-to-code-and-back"
aliases: 
tags: 
- info201
- lecture
sr-due: 2022-05-14
sr-interval: 12
sr-ease: 250
---

- [UML to Java Foward Engineering](notes/uml-java-forward-engineering.md)
- [round-trip-engineering](notes/round-trip-engineering.md)

# Round trip engineering

going from models like UML to code, or ERD's to SQL

the idea is to try and keep the diagrams and code semantivally equivalent

foward - diagrams to code
reverse - code to diagrams

former is more common, but both do occur.

MDA (model driven architecture) is when code is comletely derived from the diagrams. However this is not that easy

foward engineering can be used to create skeleton code much more easily

fully representing code is UML is tricks as code is more difficult. It is hard to maintain consistency. This is easier with erds and sql than other types as these dont have to worry about behaviour. so the mappping is more simple. With uml and java is gets complex fast

this idea sounds good but in practice is not practical. THere is an qgument hat code is part of the design anyway. Code is a detailed form of a model.  