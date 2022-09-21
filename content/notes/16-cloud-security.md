---
title: "16-cloud-security"
aliases: 
tags: 
- comp210
- lecture
---

- what is cloud computing
- what is service virtualisation
- security issues

# what is cloud
- largely a marketing term
- vague - doesn't mean much
- slowly replacing the word 'web'

implies
- large cluster of networked servers acting as hosts
	- usually virtualised
- large number of users
- complexity of infrastructure hidden from devs
	- and users

## cloud platforms
### SaaS
- provider has an actual product
	- they host it (or delegate the hosting)
	- customer doesn't need to host anything
- thin client
	- usually web based
	- maybe also mobile app

examples
- customer realtions (salesforce)
- accounting (xero)
- PoS (vend)
- dropbox, gmail, google docs

### PaaS
- provides a solution stack
	- tools, environment, services, libraries to run a system
		- storage services / libaries / tools
		- email libraries
		- web app libraries
		- admin tools: deployment, scaling, logs, billing, quotas etc
- extensible
	- devs can add their own libraries

examples
- google app engine
- elastic beanstalk
- azure cloud services
- heroku

### IaaS
- virtual hosting
	- allows custome to run own VM
		- linux or wiindows server
		- customer can install whatever on the VM
		- barebones or canned VM images are available
		- customer can provide own images
- virtual networking
	- public facing IP addresses mapped to virtual network interfaces for load balancing, and fault tolerance
- virtual storage
	- file storage
	- exampkes
		- amazon S3
		- google cloud storage
		- azure storage
	- hot storage for frequently access data
		- higher performance, higher cost
	- cold for infrequent access

## primary selling points
- agility/elasticity
- reduced cost
	- multitenancy
	- economies of scale
	- usage based billing
- reliability
	- massive redundancy
- low capital expenditure
- greener
	- low power hardware, virtualisation, centralisation of cooling, environmental cooling, sharing of resources

## potential problems
- Saas
	- need to train staff
	- importing and exporting data may be difficult
	- dependent on provider health
	- vulnerable to price changes
	- provider may be aquired by another company with different goals
- Paas
	- use of common APIs libraries and services mitigate the lock-in problem
	- avoid using vendor specific APIs, or wrap them with facades
- IaaS
	- mitigated by sticking to the standard services (MySQL & nginx for example) and standard libs
	- avoid vendor specific interfaces to proprietary services