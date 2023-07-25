---
title: "system-templates"
aliases: 
tags: 
- info201
---

# System templates
some standard patterns is system design

especially with respect to structural requirements
- database
- domain classes
- names of entites/classes may vary but pattern is the same

broadly similar structures for similar problem domains
- e.g., retaiol, scheduling, HR
- main difference mostly is small details

## the heirarchy
![hierarchy](https://i.imgur.com/uGcao6S.png)

represents a chian of "containment" relationships

child and parent entities linked by FK (often composite)

examples
- division, department, employee
- student, programme enrolment, paper enrollment, assessment result

## the associative entity
![associative entity example](https://i.imgur.com/JQM0LTd.png)

resolution of a many-to-many relationship

associative entiteis may or may not have additional attributes.

## Headers/lines
![header line example](https://i.imgur.com/MH7mRRi.png)

![more examples](https://i.imgur.com/aHGKqV7.png)

head is associative with one or more other entities.

line is associated with only one thing

### parallel header lines
![parallel header/lines](https://i.imgur.com/CDPLeXG.png)
![other examples](https://i.imgur.com/rG5Jr49.png)

second example has more direct association between sale and shipment.

## general systems
![Point of sale ERD](https://i.imgur.com/S7YhvAa.png)
dont always need all of the things
![booking system ERD](https://i.imgur.com/AOjrHkC.png)
![inventory system ERD](https://i.imgur.com/vdEjRh7.png)

many more e.g., payroll, scheduling/timetabling, tracking

![more examples possibly dated](http://www.databaseanswers.org/data_models/index.html)

# summary
dont always need to create data model from scratch, need to adapt any template to suit your scenario

dont deinveltht the wheel

![revision questions](https://i.imgur.com/LKRU7lh.png)

