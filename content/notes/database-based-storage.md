---
title: "database-based-storage"
aliases: Database storage
tags: 
- info201
---

- managed by DBMS
	- usually SQL based
	- also noSQL for unstructured big data
- advantages
	- multi user support
	- transactions (failure recovery)
	- (centralised) constraints and referntial integrity
	- flexible and ad-hoc querying
	* manage large data

# Database APIS
APIs #unfinished 

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