---
title: "data-access-object"
aliases: DAO, DAOs, Data Access Object 
tags: 
- info201
---

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

# Multiple implementation of the same DAO
e.g.,:
- `PatronDAO` interface
- `PatronCollectionDAO` class for in memore data
- `PatronJdbcDAO` class for SQL databases
- `PatronCsv` class for CSV files
- all classes implement the `PatronDAO` interface

Having these options allows you to easily switch between, dev, test, and prod, and privileged and non privileged access

