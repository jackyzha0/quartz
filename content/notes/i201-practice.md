---
title: "i201-practice"
aliases: 
tags: 

---


# Section A

## 1
a) sequence diagram - to document a *sequence* of particpant interactions required to carry out a use case
b) 
1 - Actor - a participant in the sequence
2 - Activation Bar - indicate when a participant is doing something
3 - message - indicate communication between participats

## 2
update anomaly - e.g., when a single employee is working on two projects, and we need to update their salary, it is possible to only update their salary in one location causing an update anomaly

root causes - this occired because there was redundancy within the database - the employee and his salary should only be stored in one location

how it can be solved/avoided - this can be easily avoided by normalising the database to remove redundancies.

## 3
a) business functions are things that the business *ought* to be doing, for example "accept payment from customer". The can be identified by verb phrases