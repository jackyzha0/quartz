---
title: "authorisation"
aliases: 
tags: 
- comp210
---


# Authorisation
- verifying that a user is allowed to access the operation that they are attempting to access
- requires explicit check in the system for restricted operatons
	- some code that check if the roles assigned to the authenticaed user intersect the roles required for the current operation
- use is assigned a **role** that defines the operations they are allowed to perform
- e.g.
	- custoemer - can view products, and see retail prices
	- sales rep - can view products and see retail and cost prices
	- manager - can add/delete/modify products
	- admin - can change system configuration. can assign roles to users