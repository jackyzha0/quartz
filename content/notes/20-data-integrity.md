---
title: "20-data-integrity"
aliases: 
tags: 
- info201
- lecture
sr-due: 2023-05-16
sr-interval: 206
sr-ease: 250
---

![review questions](https://i.imgur.com/P812tlT.png)

# Data Integrity

GIGO

![recall integrity](https://i.imgur.com/KlL4bjE.png)

Types of error
- ennecessary duplication of data
- missing information (expecially nulls)
- referential integrity problems: broken links,  "orhpan" records (foreign keys)
- data entry errors: typos/keying errors, value in wrong field
- invalid/nonsensical data, e.g., nefative salary
- going against business rules/policy law

## Validation
checking that entered values are plausible.
- values must make sens, be valid
- simple checks to block obvisously bogus data

automated by constraints within the data base

valid ≠ correct

## Verification
Checking that correct value was entered e.g.,
- double check input
- independent double entry
- independent triple entry (or more) for critical checks

manual process invvolving human input and judgement

valid + verified ≠ correct.
- malicious vandalism
- human psychology rtends to promote dertain kinds of error
- misread handwritten notes
- incorrect for fake information provided

![validation and verification examples](https://i.imgur.com/I3EPWZO.png)
![student id check digit](https://i.imgur.com/JlQMPYZ.png)

## Integrity constraints
machine readable conditions (true/false)

checked when data is changed
- in oracle all existing data must conform
- in SQL erver, you havel to explicity tell it to check existing data

ideally these are in the daabase. but some this is not possibe and must be implemented in code.

### Defining constraints
col-level constraints
- specified in line in col defs
- can only refer to that column

table level constraints
- are specified out of line alongside other columns
- can refer to  any col inthe table

constrainst should be named

### Primary and foreign key constraints
![example](https://i.imgur.com/xh5jdPV.png)

primary keys are not null and are unique

some DBMSs support on delete and on update actios on foreign keys when a parent row is deleted or updated
- cascade: "child" rows inherit the same operation as "parent" row
- set null: "child" FK is set to null (if permitted)
- set default: ""

### Unique values (other than primary keys)
![](https://i.imgur.com/QcoDPPq.png)

## Check constrainsts
![](https://i.imgur.com/hBq0Rnp.png)

for chcking if within list. use a lookup table
![](https://i.imgur.com/kHMqxM6.png)

# Automation
## Sequences
generate integer values

![sequence](https://i.imgur.com/oE9BGkt.png)
![sequences auto vs custome](https://i.imgur.com/msmxsgu.png)
![java accesing the sequence](https://i.imgur.com/psDNCrN.png)
![java accesing the sequence (fluent)](https://i.imgur.com/nbfAzca.png)

![caution](https://i.imgur.com/l4fiErh.png)

## Triggers
specific operation on table trigger other operations

normally written in a "proper" language e.g.,
- Oracle: PL/SQL, Java
- H2: java
- SQL server: transact-SQL
- PostgreSQL: most languages, e.g., python, ruby, perl, r, bash, java, php etc

used when:
- as a last resort
- computed columns
- setting status values in reponse to updates
- maintaining refernetial integrity
- rewriting application input
- integrity constraints that involve multiple tables
- row based security policies
- domain specific auditing (beyond standard logging features)
- performing actions outside the DBMS

specifications
- timing: before, after, instead of
- type of operation: insert update delete
- column affected (update only, optional)
- table affected
- other conditions (optional)

triggered operation
- what to do
- trigger will activate only once unless you tell to to execute once for each row affectted by the activation conditions

![H2 trigger](https://i.imgur.com/e4tqfH9.png)
![H2 trigger action](https://i.imgur.com/eSr8Lc4.png)

## Stored procedure
programming code stored within the database

why?:
- reduce or eliminate application/database round trips
- offload database-oriented processing to the DBMS
- encapsulate database code in the database for re use (DRY)
- encapsulate query details

triggers often a special case
h2 lets you create aliases to java functions, but these aren't stored in the database

![h2 function alias](https://i.imgur.com/TjUhVAO.png)
