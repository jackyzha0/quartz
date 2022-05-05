---
title: "round-trip-engineering"
aliases: Round Trip Engineering
tags: 
- info201
---

This is the process of translating models into code, or vice versa. For example, ERDs to SQL, or UML to Java. The main idea is to keep the code and the diagrams sematically equivalent

Converting diagrams to code is more common than the opposite, but both do occur. 

A [model driven architecture]() is when the code is completely derived from diagrams. This tends to be quite difficult. A much easier approach is only using foward engineering to generate skeleton code.

Foward engineering is easier with SQL and ERDs than other types as these don't consider behaviour, so the mapping is more simple than with UML and Java.

Although this idea sounds good, it is not practical. The main argument is that code is part of the design anyway - Code is just a detailed form of a model.
