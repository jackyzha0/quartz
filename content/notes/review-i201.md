---
title: "review-i201"
aliases: 
tags: 

---

# soft. dev. methods
- [SDLC](notes/systems-development-life-cycle.md)
- [1 traditional](notes/approaches-to-systems-development.md#1%20traditional) (predictive) vs [1 object oriented](notes/approaches-to-systems-development.md#1%20object%20oriented) (flexible)
- [3 Unified Processes notes unified-processes md UP](notes/03-agile-methodologies.md#3%20Unified%20Processes%20notes%20unified-processes%20md%20UP) (OO)
- [1 scrum notes scrum md](notes/03-agile-methodologies.md#1%20scrum%20notes%20scrum%20md)
- [2 Extreme Programming notes extreme-programming md XP](notes/03-agile-methodologies.md#2%20Extreme%20Programming%20notes%20extreme-programming%20md%20XP)

# requirements engineering
- [business-process](notes/business-process.md) re engineering 
- [requirements](notes/requirements.md)
	- properties of good ones [requirements-guidelines](notes/requirements-guidelines.md)
	- functional vs not [furps](notes/furps.md)
	- importance (moscow) 
- elicitation [requirements-engineering](notes/requirements-engineering.md)
	- stakeholders techniques [stakeholders](notes/stakeholders.md)
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