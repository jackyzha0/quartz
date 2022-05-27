---
title: "entity-relationship-diagrams"
aliases: ERDs, ERD, entity relationship diagram, Entity Relationship Diagram
tags: 
- info201
---

![](https://i.imgur.com/SIgTzZ5.png)

cardinality
identifying vs non identifying relationship

labels are important - but not always needed

associative entity => changes many to many relationship with additional relationship

# subtypes
![](https://i.imgur.com/5sgPCxO.png)
![](https://i.imgur.com/Q0jMI3b.png)

uses:
- model mutual exclusivity
- better for modelling not for implementation

# parallel relationship
![](https://i.imgur.com/UJXPI1l.png)

could model as separate relationships via staff subtypes
not very common

![](https://i.imgur.com/niEL1Y2.png)

also an example of recursive many-to-many relationships

# recursive relationship
labels are critical
usually 1:M can be 1:1 or M:M
![](https://i.imgur.com/CaEgEkp.png)

# dealing with data history
![](https://i.imgur.com/cohxggK.png)

could be many to many relationships:![](https://i.imgur.com/g4ynsh2.png)

so associative relationship: ![](https://i.imgur.com/NXxsJRl.png)

what do we require:
- for the current point in time
- an histroical record how ⇒ must be selecetive to not use up to much space
