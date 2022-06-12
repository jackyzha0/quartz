---
title: "22-performance-and-security"
aliases: 
tags: 
- info201
- lecture
---

# Performance requirements
- e.g., credit card system
	- functional reqs
		- sales authorised only for valid cards
		- generate monthly statements
		- performance requirements
			- cards are validated quickly
			- statements are accurate and generated on time
		- quickly, accurate, and on time need to be operationalised, measured, and tested.

Why are they important
- vital quality factor
- infosystems are wide and varied
- wide range of performance characteristics

Things to consider
- can interact and conflict with each other
	- accuracy vs speed
	- speed vs space
	- often a trade-off or compromise
- selectig best developent techniques for taget system
	- algorithms
	- data structures
	- languages and frameworkds
	- constraints of target platform 
		- (devs machines are often more powerful)
		- minimum requiremnts for system e.g., min specs for windows
	- ...

- impact of changing requirements, e.g., adding a new module
- need to consider (often conflicting) organisational priorities
- critical to unambiguously document and agree

# Response time
- what is quick
- for most people
	- < 0.1s: instant
	- 0.1s to 1s: noticable
	- 1s to 10s: slow
	- > 10s: user will probably switch tasks
- affected by system workload: number of concurrent users, volume of data, etc vs available resources
- most users really dislike variable response times (unpredicatbility)


- example requiremen: "cards are validated within 2s"
	- this implies 100%
	- better: "95% of cards are validated within 2 s"
- other consideration
	- what is included in response time?
	- what is the measurement period (of the system in general) (often varied workload changes performance)
	- what is the acceptable error rate

# Workload
- system workload is almost never constant
	- may may well defined peaks and troughs
	- may be unpreditable
	- peak vs typical vs minimum
- differet transaction types
	- read vs write transactions
	- online vs batch

- define workload requirements around use cases
- e.g., " the system must be able to validate 1 million cards per day"

# Scalability
- can the system scale to meet changing demand
- can it scale quickly enough
- elasticity particularly important to large public-facing systems
- can be difficult to test "for real"
- example requirement: "the system must be able to handle up to 2 million cards on a busy day"

# Platform
- target for system deployment
	- on prem
	- cloud
- do you have a choice
- will the platform be only just for this system or for other things (multi tenanting)
- what limits are imposed by the platform
- does it inlclude external systems or resources


# Caching
- temporarily store frequently used data
- same concept as [memoization](notes/memoization.md)
- mainly about improving read performance
	- when retrieving data, look in the cache first
	- if its there (=hit), done
	- if not (or stale) (=miss), read from original source
	- can be several orders of magnitude faster
	- ideal for small, frequently accessed data
- cache contents needs to be managed
	- e.g., least recently used (LRU) data drop out as cache fills up
	- cahced data can become inconsistent with original source
- can go anywhere
	- databse, client, dedicated caching server
	- numberourus cahcing tools, e.g., memcache, redis

# Pooling
- pre allocate a set of shared resources that are kept ready for use (e.g., databse connetions, objects)
- useful when:
	- allocating eacch resources has a significant cost (time space)
	- there are frequent requests of short duration
	- we need to limit the total number of resources
- mainly about resource management, so pools ar maintaineed by the resource allocator
- important to reset resources when returning to the pool.
	- e.g., ensure atabase connection has no incomplete statements
	- ensures state doesn't leak across different uses of same resource

# System reliability
- behaviour of system
- graceful degradation - should behave sensibly under all but the most extreme circumstances
- should't just crash
	- thorough automated testing
	- thorough user testing
- raw errors shouldn't bubble up to the user
	- user wont understand -> pointless
	- may expose sensitive information (e.g., file system paths)
	- parti