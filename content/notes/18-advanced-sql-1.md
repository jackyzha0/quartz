---
title: "18-advanced-SQL"
aliases: 
tags: 
- info201
- lecture
sr-due: 2023-05-25
sr-interval: 215
sr-ease: 250
---
![create table 2](https://i.imgur.com/sVoiVud.png)
![create table 2](https://i.imgur.com/AyzF1kR.png)

varchar usually bigger than you think

# CRUD
- insert adds a row ![](https://i.imgur.com/WLF64jn.png)
- select retrieves rows from the table![](https://i.imgur.com/yHhPL6L.png)
	- ouput can be "saved" as a view![](https://i.imgur.com/iHtC4Vd.png) ![](https://i.imgur.com/NPqTeA1.png)
	- changes to the underlying table also chagnes the view
- update modifies rows ![](https://i.imgur.com/aw74vlk.png)
- delete removes rows ![](https://i.imgur.com/DZyorFF.png) ![](https://i.imgur.com/IOKErzP.png)
	- test as a select statement first

# SQL DAO programming
We want to miniminse load on sql as connecting to database is expensive. 

Optimisations:
- prefer muultiple row operations
- connection pools (keep connections "alive")
- reuse prepared statements (reduce unnecessary SQL parsing)
- consider combining queries to reduce round trips
- batched requests

Follow Optimistic approach
- assume operatios will succeed (no pre checking)
- handle errors with exception handling
- consider using merge if available

## Merge
![](https://i.imgur.com/UUZWjyM.png) aka replace etc.

- update if they exist other wise insert

## JDBC
Java framework for interacting with sql databases.

plaform and DBMS independent
- driver provided by DBMS vendors
- same Java code will work with any DBMC

key concepts
- connections and connection pools
- sql strings and prepared statements
- result sets
- transactions
- batched requrests

![typical jdbc](https://i.imgur.com/jLGbZWW.png)


## JDBI
- better version of [JDBC](notes/java-database-connectibity.md)
	- layered on top of it
	- better APIs
	- less code
- simple class <-> table mapping 
- flexible plugin architecture

![typical jdbi (fluent)](https://i.imgur.com/SwmulpV.png)
![typical jdbi (declarative)](https://i.imgur.com/1uc2t47.png)


# Transactions
interaction between two entities
- follow explicit or implied forms
- usually involves exchange on resources
- may require several steps
- often considered a single unit

## In data bases
- group of db operations is considered a *single logical unit*
	- transfer (read and update)
	- recieve shipement (update accounts)
	- customer sale

transactions are all or nothing. (commit vs rollback)

## ACID
- Atomic
	- all or nothing 
	- operations should be related
- Consistent
	- transactions move dbs from one consistent state to another
		- "consistent" ⇒ all integrity rules are satisfied
	- db may be inconsistent during a transaction
		- require defferable constraints
![atomc and consistent](https://i.imgur.com/tCqEEHy.png)
- Isolated
	- concurrent transactios shouldn't interfere with each other
	- ideally behave as if other transactions dont exist
	- read committed isolation
		- uncommited changes are visible to other transactions
	- require some form of concrrency mangement (e.g., locking)
	- ![improper isolation](https://i.imgur.com/IrZZDlW.png)
- Durability
	- once a transaction is commited it is permanent
	- uncommited transaction dont survive crashes
	- auto rollback of uncommitted transaction

## commit and rollback
- changes are made to "live" data
- commit makes database changes permanent
- rollback removes all changes since that transaction start

## Transaction in Java
default to auto commit.
- each statement is a separate transaction
- if transaction has multiple statements
	- disable auto commit
	- you must manage commit and rollback yourself

![JDBC explicit transactions](https://i.imgur.com/FJaINwD.png)
![JDBI explcit transaction (fluent)](https://i.imgur.com/KvtfZC0.png)
![JDBI explcit transaction (declarative)](https://i.imgur.com/BzGRpV4.png)

# Select
- select <- wahat
- from <- from where
- where <- filter
- group <- aggregation
- order <- order

distinct removes duplicate rows

![distinct](https://i.imgur.com/RiOHBkM.png)

![select](https://i.imgur.com/DWFUQYN.png)

![from](https://i.imgur.com/it107cD.png)

