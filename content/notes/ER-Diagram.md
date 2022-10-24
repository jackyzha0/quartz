---
title: "ER-Diagram"
aliases: 
tags: 
- cosc203
---


Entity: a thing in the real world with *independent existence* (phsyical e.g., person or conceptual e.g., job)
Entity type: A collection of entities 

Attribute: properties of entity
Attibute types:
- simple/composite
- single/multi valued
- stored/derived
- key (simple or composite)

Relationship: when one entity refers to another
Relationship type: a set of relationships with the same entity types
- relationships can have attributes
- relationships have:
	- degree (bi/n-ary)
	- cardinality (1:1, 1:N N:M)
	- participation constraints (total (marked by double line) or partial)

Weak entities
- no key attributes
- requires total participation constraint on identifying relationship to its identifying entity type
- partial key used in combination with identifying entity
