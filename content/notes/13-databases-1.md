---
title: "13-databases-1"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-12-02
sr-interval: 41
sr-ease: 250
---

# What is a database
- an integrated collection of data
- implicit properties
	- represents some aspect of th real world, called miniworld
	- is a coherent collection of data with inherent meaning
	- is designed built and populated with data for a specific purpose

## DBMS
- a software system designed to store, manage, and facilitate access to the database
- Oracle, SQL erver, MySQL, MonogDB

## Application program
- a program that provides access to the dtabase by sending queries and requests for data to the DBMS

![data base system diagram|400](https://i.imgur.com/3xzWCw6.png)

# This course
- modelling and design of DBs 
- programming  (SQL + appliation development)
- DBMS implementation

specifiically *relational databases*
- ER modelling
- datbase normalisation
- SQL

## relational vs nosql
relation is better for structured data, nosql is better for abstract data, as it is more flexible

# Data modelling
first step in designing database
- create a data model for a specific problem domain

a model is Defn: a collection of concepts that can be used to describe the structure of a database such as data types, relationsips, and contraints that should hold for the data

schema Defn: a collection of metadata that describes the logical view of a database

noSQL databases are either schema-free or have relaxed schemas

![example database schema|400](https://i.imgur.com/09ATkHZ.png)

## conceptual data modelling
model the data close to the way the users percieve the data

ER model
- popular high level conceptual model
- uses diagrammatic notations - er diagram (ERD)

three notations
- chens notation
- crows foot notation
- UML notation

# Example
![example data|400](https://i.imgur.com/t3fjN78.png)
![examle chen notation diagram|400](https://i.imgur.com/5a2TCXm.png)

# how to model
## entities
- a thing in the real world with independent existence
	- physical existence
	- conceptial existence

entity type is a collection of entities with the same attributes — represented by a rectangle

![example entity type|200](https://i.imgur.com/70VJhDg.png)

## attribute
- a property of an entity
	- simple (atomic) e.g, first name
	- composite (can be divided) e.g., address
	- single value e.g., id number
	- multi value e.g., siblings
	- stored - by default
	- derived - drawn as dashed ovals e.g., age is derived from birth date
	- key
		- unique
		- simple or composite
		- underlined in ERD

![example attributes|300](https://i.imgur.com/D50Uxad.png)

## relationships
a relationship model the connection between entitiy types

e.g., each employee works for one department

relationship type is a set of relationsihps among entities from the particular entity types
	- represented by diamonds

![example relationship|400](https://i.imgur.com/5ZmJerl.png)


relationship types can have attributes

 properties
 - degree
	 - binary [binary relationship|200](https://i.imgur.com/QDpdMo7.png)
	 - n-ary [n-ary relationship|300](https://i.imgur.com/7oIJP5j.png)
- cardinality for binary relationships
	- one to one
	- one to n
	- m to n
- participation
	- total participation
		- marked by double line
		- relationship is required
	- partial
		- marked by single line
		- relationsihp is not required

![cardinality examples|300](https://i.imgur.com/DmHQaVc.png)
![participation example|300](https://i.imgur.com/hH0v4bR.png)

## weak entities
- regular types have key attributes

- weak types do not have their own key attributes
- they are identified by their relationship with another entity
- this creates and identifying relationship
- must have a total participation constraint
- the other entity type is called the identifying or owner entity type
- denoted by double lined rectable and double lined diamond
- have a partial key
	- a set of attributes that uniquiely identify the weak entities that are related to the same owner entity

![weak entity example|300](https://i.imgur.com/4JMDcN7.png)

