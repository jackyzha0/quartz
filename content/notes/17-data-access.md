---
title: "17-data-access"
aliases: 
tags: 
- info201
- lecture
sr-due: 2022-05-08
sr-interval: 3
sr-ease: 250
---

[revision questions](https://i.imgur.com/mPmQ28v.png)


Most infosystems require persistent data. e.g.,
- save to file
- save to database
Some systems require several persistent data stores. e.g., multiple databases.

# File based

doesn't scale well

- demlimited text e.g., CSV TSV
	- easy to create and process
	- portable
	- lowest common denominator
- structured text e.g., JSON, XML, YAML
	- many tools for querying and transforming data
	- portable also
- Serialiased data Structures (*usually* binary)
	- more compact
	- easy to do
	- single user only
	- no automatic failure recovery
	- no querying
	- versioning issues
	- no standards
	- less portable

# Databases
- managed by DBMS
	- usually SQL based
	- also noSQL for unstructured big data
- advantages
	- multi user support
	- transactions (failure recovery)
	- (centralised) constraints and referntial integrity
	- flexible and ad-hoc querying
	* manage large data


# Database APIs
- most dbmss have a native datbase api
	- usually proprietry and limited to just that product
	- often the only option for noSQL dbmss
- also generic database apis
	- work with multiple dbmss
	- same code works with any supported dbms
- for sql dbmss
	- ODBC microsoft
	- JDBC java
	- DB-API python
	- PDO php
	- DBI perl

# How to manage persistent data access
1. domain objects interact directly with the data store
	- write to file or send sql statements
	- not easy to change
2. domain objects interact with data store via a mediator
	- either standalone class or implementation of a data access interface
	- data access objects DAOs
	- encapsulates all access to persistent data

# Designing DAOs
- general rule: one DAO per "logical unit" of data access
- many DAOs are just for one class e.g., `PatronDAO`
- some involve many classes
	- things like header/lines objects are always managed together
	- complex operations that join multiple tables or domain classes
- different use cases (features) use different sets of DAOs e.g.,
	- add, find, edit patron ⇒ `PatronDAO`
	- lend items ⇒ `LoanDAO`, `ItemDAO`, `PatronDAO`
- object construction and deconstruction coded into DAOs

## Multiple implementation of the same DAO
[DAO versions](https://i.imgur.com/UZzffto.png)

# JDBC for sql
- [jdbc slide](https://i.imgur.com/Dy79jcM.png)
- [jdbs slide what is does](https://i.imgur.com/NAr95En.png)
- [jdb issues](https://i.imgur.com/WR7qUae.png)
- [alternatives](https://i.imgur.com/rYhiX8o.png)
- [jdbi](https://i.imgur.com/OcNKIfH.png)
