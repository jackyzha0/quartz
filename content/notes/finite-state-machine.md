---
title: "finite-state-machine"
tags: 
- cosc202
---

A finite state machine is a program which has a number of states called nodes with transition edges between them. You then move the state of the program to a particular state by navigating through the edges.

This can be implemented as a large switch block. However, this results code which is not suited for readability. It may be useful to define the program using some higher order structure, and create it programmatically via [2 1 Using code to create code](notes/12-automation#2%201%20Using%20code%20to%20create%20code)

For example something like a phone machine could be implemented as a finite state machine