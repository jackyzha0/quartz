---
title: "dependencies-among-attributes"
aliases: dependencies among attributes
tags: 
- info201
---

# Functional Depenencies (FDs)
If for any given value of attribute A there is _exactly one_ associated value of attribute B, then A _functionally determines_ B (loosely)

This is the theoretical basis for [normalisation](notes/normalisation.md), and uniqueness property of PK (A is unique with respect to B)

- one to one
- Written as: A --> B
- Equivalently, "B is functionally dependent on A"
- Within a single relation only
- every attribute functionally dependent of primary key (PK)
 
## Example 1
- consdier a specific student ID e.g., 123346
- this student ID is alwasys associated witha single studnet name (e.g., jane smith)
- even it the students name changes, that student ID will still be asociated with the name of only that on student
- *The value of student id determines the value of student name*

## Other examples
- student ID --> student name (but not vice versa)
- car registration --> car owner (but not vice versa)
	- rego --> VIN
	- VIN --> rego
- student ID --> name, semester address, mobile number
- car rego --> owener name
- IRD number + year --> tax payable 
- product ID + order no --> quantity ordered

## Anti examples
- student ID  + name --> birth date (overkill, partial dependency)
- home address --> student name
- name --> birth date

e.g.,
![](https://i.imgur.com/J0FzURg.png)
![](https://i.imgur.com/EMSOMmC.png)


## Using Functional dependencies
To determine them:
- need detailed knowledge of thebusiness rules
- examine existing data sets
	- not always practical when these are large or unknown

Can be represented using funcitonal dependency diagrams (FDDs)

Bottom up approach
- ERD is "top-down"
- FD best used as a design validation tool

## Types of functional dependencies
### Dependencies on more that one attribute
non primary attributes that are dependent on two or more attributes
always arise with composite PKs
e.g., 
![](https://i.imgur.com/d4fUeRD.png)

### Partial Dependency
Subset of left hand side determines right hand side
"extra attributes"

e.g.,
![](https://i.imgur.com/clpV0eU.png)


### Transitive dependency
e.g., 
- part num determines supplier number
- supplier number determines supplier name
- part number determines supplier name

BUT 3 is already implied by 1 & 2 --> redundant supplier names
![](https://i.imgur.com/VZbxVff.png)
![](https://i.imgur.com/df0D7Lc.png)

### Multivalued dependencies (MVDs)
if for any given value of attribute A there is a _set_ of associated values of attribute S, the a _Multidetermines_ S (loosely)

- one to many
- written: A ↠ S
- equivalently, "S is multiply dependent on A"
- Generalistion of FDs: all FDs are MVDs, but not vice versa
- A is still unique with respect to S

![](https://i.imgur.com/938t9Kd.png)
