---
title: "review-i201"
aliases: 
tags: 

---

# soft. dev. methods
- [SDLC](notes/systems-development-life-cycle.md)
- [1 traditional](notes/approaches-to-systems-development.md#1%20traditional) (predictive) vs [1 object oriented](notes/approaches-to-systems-development.md#1%20object%20oriented) (flexible)
- [UP](notes/unified-processes.md) (OO)
- [scrum](notes/scrum.md)
- [xp](notes/extreme-programming.md)

# requirements engineering
- [business-process](notes/business-process.md) re engineering 
- [requirements](notes/requirements.md)
	- properties of good ones [requirements-guidelines](notes/requirements-guidelines.md)
	- functional vs not [furps](notes/furps.md)
	- importance (moscow) 
- elicitation [requirements-elicitation](notes/requirements-elicitation.md)
	- stakeholders techniques [stakeholders](notes/stakeholders.md) [Stakeholders](notes/requirements-elicitation.md#Stakeholders)
	- outcome validation [Validation of Requirements](notes/requirements-elicitation.md#Validation%20of%20Requirements)

# business functions and use cases
- business functions - how to identify [1 Id business functions](notes/business-functions.md#1%20Id%20business%20functions)
- use cases - how to model [2 Use case](notes/business-functions.md#2%20Use%20case)
- uml use case diagrams [use-case-diagrams](notes/use-case-diagrams.md)
	- actors usecases [2 1 Actor](notes/use-case-diagrams.md#2%201%20Actor) [2 2 Use case](notes/use-case-diagrams.md#2%202%20Use%20case)
 	- associations, dependencies [2 3 Association](notes/use-case-diagrams.md#2%203%20Association) [2 5 Dependency](notes/use-case-diagrams.md#2%205%20Dependency)

# BPM
- business processes and how the are modelled [business-process](notes/business-process.md) [[bsin]]
- BPMN vs (high level) UML activity [business-process-model-and-notation](notes/business-process-model-and-notation.md) [activity-diagrams](notes/activity-diagrams.md)

# Data modelling
 - erd concepts [ERD](notes/entity-relationship-diagrams.md)
	 - subtypes [subtypes](notes/entity-relationship-diagrams.md#subtypes)
	 - parrallel and reursive relationships [parallel relationship](notes/entity-relationship-diagrams.md#parallel%20relationship) [recursive relationship](notes/entity-relationship-diagrams.md#recursive%20relationship)
	 - historical data [dealing with data history](notes/entity-relationship-diagrams.md#dealing%20with%20data%20history)
 - normalisation [normalisation](notes/normalisation.md)
	 - redundancy and anomalies [redundancy-and-anomalies](notes/redundancy-and-anomalies.md)
	 - function and multivaly dependencies [dependencies](notes/dependencies.md)
	 - normal forms [2 Normal forms](notes/normalisation.md#2%20Normal%20forms)

# Modelling object structure
- oop concepts [10-oop-concepts-and-uml](notes/10-oop-concepts-and-uml.md)
	- state behaviiour encapsilation
	- class vs instance, object reference
- uml diagrams [what-are-uml-diagrams](notes/what-are-uml-diagrams.md)
	- steriotypes, visibility, multiplicity [1 Stereotypes](notes/class-diagrams.md#1%20Stereotypes) [3 1 multuplicity](notes/class-diagrams.md#3%201%20multuplicity) 
	- specialsation/generalisation, navigability [3 8 Specialisation generalisation](notes/class-diagrams.md#3%208%20Specialisation%20generalisation) [3 4 Navigability](notes/class-diagrams.md#3%204%20Navigability)
	- erd vs class diagram [4 Domain class model](notes/class-diagrams.md#4%20Domain%20class%20model) vs [5 System class model](notes/class-diagrams.md#5%20System%20class%20model)
# object behaviour
- inheritance [1 Inheritance](notes/modelling-behaviour.md#1%20Inheritance)
	- specialisation vs implementing an interface [1 1 Via Specialisation](notes/modelling-behaviour.md#1%201%20Via%20Specialisation) vs [1 2 Via Interface](notes/modelling-behaviour.md#1%202%20Via%20Interface)
	- separation of public private API (programming to interface) [1 3 Public vs Private](notes/modelling-behaviour.md#1%203%20Public%20vs%20Private)
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