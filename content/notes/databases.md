---
title: "databases"
aliases: 
tags: 
- cosc203
---

# Modelling
Database: integrated collection of data
- meaning
- specific purpose

[ER Diagram](notes/ER-Diagram)
[Schemas](notes/Schemas)

# Relational Model
Two parts
- Relation Schema
- Domain

Constraints
- Domain: each value must an atomic value in the domain e.g., integer, string, date, etc
- Key and NULL: 
	- Superkey: uniquely ids a tuple e.g., set of all attrs
	- Key: minimal superkey
	- Candidate key: a possible key
	- Primary key: the chosen candidate key: cannot have NULL values
- Ref Integrity: Foreign key 
- Functional Dependencies
	- fd: when one value determines another e.g., sid -> sname, {sid, cid}  -> grade
	- armstrong axioms: 

# Normal Forms
[Normal Forms](notes/Normal-Forms)
# SQL
[SQL](notes/SQL)