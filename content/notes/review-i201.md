---
title: "review-i201"
aliases: 
tags: 

---

# soft dev methods
- sdlc
- tradition 9predictive vs agile flexible
- up (OO)
- scrun
- xp

# requirements engineering
- bp re egineering
- requirments
	- properties of good ones
	- functional vs not
	- importance (moscow)
- elicitation
	- stakeholders techniques
	- outcome validation

# business functions and use cases
- business functions - how to identify
- use cases - how to model
- uml use case diagrams
	- actors usecases
	- associations, dependencies

# BPM
- business processes and how the are modelled
- BPMN vs (high level) UML activity

# Data modelling
 - erd concepts
	 - subtypes
	 - parrallel and reursive relationships
	 - historical data
 - normalisation
	 - redundancy and anomalies
	 - function and multivaly dependencies
	 - normal forms

# Modelling object structure
- oop concepts
	- state behaviiour encapsilation
	- class vs instance, object reference
- uml diagrams
	- steriotypes, visibility, multiplicity
	- specialsation/generalisation, navigability
	- erd vs class diagram
# object behaviour
- inheritance
	- specialisation vs implementing an interface
	- separation of public private API (programming to interface)
- rich vs anaemic domaini models "processor objects"
- modelling behaviour with uml
	- sequnce diagrams
	- low level activity and state diagrams

# round trip engineering
- foward engineering
	- erd -> SQL
	- uml class diagram -> e.g., java 
	- correspondenc with use cases
- reverse engineering (code <- diagrams)

# Data access
- data persistence file vs database
- database APIs (JDBC etc)
- DAOs
		- oner per use case (not just per domain class)
		- often programming via DAO interface

# Database transactions
- ACID
- what and why
- commit vs rollback

# SQL select
- select from where
- sorting grouping aggregation
- view, inner and outer joins, subqueries

# data integrity
- nulls and their issues
- business rules, databas contrainsts, veification, validation
- in-database vs outside database 
- in data base automation: sequence, triggers, stored procedures

# softare architectures, patterns, and templates
- monolithic vs client/server vs distributed (services)
- separation of reponsilbilities
- "standard patters" of design (recognise)
- sysstem templates 

# performance and security
- performance requirements
	- how to quantify and measure
	- response time, workload, scalability
	- caching pooling
	- system reliability
- security and integrity requirements
	- consider throughout development
	- authentication and authorisation
	- principle of least privilege

 # cost benefit analysis
 - project feasbility
	 - need, funding, strong will
	 - duration, priority, rick, uncertainty
	 - should we, can we, is it worth it?
 - economic feasibility:
	 - costs vs benefits (tangigble/intangible)
	 - payback time (break even), NPV, ROI