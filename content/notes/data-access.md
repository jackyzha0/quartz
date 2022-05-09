---
title: "data-access"
aliases: Data Access, data access
tags: 
- info201
---

Most infosystems require persistent data. e.g.,
- save to file
- save to database
Some systems require several persistent data stores. e.g., multiple databases.

There are three main approaches:
- [file-based-storage](notes/file-based-storage.md)
- [database-based-storage](notes/database-based-storage.md)

# How to manage persistent data access
1. domain objects interact directly with the data store
	- write to file or send sql statements
	- not easy to change
2. domain objects interact with data store via a mediator
	- either standalone class or implementation of a data access interface
	- [data-access-object](notes/data-access-object.md)
	- encapsulates all access to persistent data

# JDBC
[JDBC](notes/java-database-connectibity.md) is a Framework for working with (SQL) databases in Java. It was designed to be independent of the DBMS you are using. The same java code *should* work on all SQL DBMSs (*just* change the driver)