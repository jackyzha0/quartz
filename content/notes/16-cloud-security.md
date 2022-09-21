---
title: "16-cloud-security"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2022-09-24
sr-interval: 3
sr-ease: 250
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
	- scalable as needed
- reduced cost
	- multitenancy
	- economies of scale
	- usage based billing
- reliability
	- massive redundancy
- low capital expenditure
- greener
	- low power hardware, virtualisation, centralisation of cooling, environmental cooling, sharing of resources, on demand activation

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

# Cloud Security
- large orgs can spend more money on security than small ones
	- find flaws in the full stack
- however only covers their infrastructure
	- your application can have its own security flaws
- virtualisation segregates apps from each other
	- a flaw in the application of another organisation should not be able to be exploited in a way that puts your application at risk
- need to trust provider admins
- need to trust governments of host countries

# Virtualisation
- when a real computer runs virtual machines
	- virtual computers where the hardware is virtual (implemented entirely in software)
	- software that provides the virtual hardware is called hypervisor
- can run linux, windows —nesting operating systems
- os on real computer is called the host os
- os running on VM is called the guest os
- a single host can run many guests (limited by memory usually)

![virtualisation diagram|400](https://i.imgur.com/y9vgful.png)

## virtualisation within cloud computing
- makes it easy for providers to run several services on a single physical server
- efficient use of hardware
- no idle servers
- move services from busy server to idle servers to balance load
- standardised virtual hardware exposed to guest OS simplifies guest configuration
- guests are segregated
- deployed using machine image
	- file containing a bit for bit copy of what a real hard drive would contain if it contained
		- an OS (usually linux)
		- a deployment environment (web server, database server, libraries, etc)
		- the service application/executables
- to start a new instance of a service you boot the relevant machine image on a hypervisor
	- its easy to add additional services for scaling to manage load
- copies and backups can be made by snapshotting the state of the virtual machine
	- captures state of disk image
	- and contents of system memory
	- can be used as version control for services
	- can be moved to anothe rhost by making a snapshot and booting on a hypervisor on a new server

## rule 1 and virtualisation
rule 1: if a bad guy can run his program on your computer, then its not your computer anymore

- your apps may be running on the same physical computer as a bad guy
- if they can exit the VM (flaws in hypervisor or hardware) they can cause trouble
- speculative flaws meltdown and spectre are difficult to exploit (no known exlpoits since being found 5 years ago)
	- benefits outweigh risks