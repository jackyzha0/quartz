---
title: Entity Relationship Diagrams
draft: true
aliases: ERD, ERDs
---
# Entity Relationship Diagrams
![Pasted image 20220328165256.png](None)

cardinality
identifying vs non identifying relationship

labels are important - but not always needed

associative entity => changes many to many relationship with additional relationship

## 1 subtypes
![Pasted image 20220328165640.png](None)
![Pasted image 20220328165656.png](None)

uses:
- model mutual exclusivity
- better for modelling not for implementation

## 2 parallel relationship
![Pasted image 20220328165851.png](None)

could model as separate relationships via staff subtypes
not very common

![Pasted image 20220328165944.png](None)
also an example of recursive many-to-many relationships

## 3 recursive relationship
labels are critical
usually 1:M can be 1:1 or M:M
![Pasted image 20220328200337.png](None)

## 4 dealing with data history
![Pasted image 20220328200434.png](None)

could be many to many relationships:![Pasted image 20220328200517.png](None)

so associative relationship: ![Pasted image 20220328200536.png](None)


what do we require:
- for the current point in time
- an histroical record how ⇒ must be selecetive to not use up to much space