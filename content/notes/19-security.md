---
title: "19-security"
aliases: 
tags: 
- cosc202
- lecture
sr-due: 2022-05-16
sr-interval: 3
sr-ease: 250
---

- why cybersecurity is a growing concern
- sketch confidentiality, integrity, and avalability security
- appreciate that dependencies cause security risks
- explain risks from non-validation of user input
- outline how injection attack works

# growing problem
- more software around
- more dependencies
	- resuse of old code rather than starting from scratch
- more complex programs
- "surface area" of risk is growing
- speed of development has trumped security
- some languages are inherently more secure than other
	- e.g., C can access any memory
- software systems involve large numbers of components
	- large amounts of code is almost guaranteed to have bugs

# Security in development
- - security isn't a single requiremtn you can  tick off
	- it needs consideration throughtout the whole system
	- it is a cross-cutting concern
	- it is hard to retrofit
- notion of security engineering is useful
	- affects design descision fromt the outset
	- changes how code is written and reviewed
	- add a specific type of testing to include
	- needs examination of how users interact with software

# Threat model
- should character what you  want to protect against
- writin standalone software to be used by one person
	- typially dont have to worry about malicious attacks (on self)
- software on a multi-user operating system
	- do need to think about cross-user data leaks
	- all OSs are multi user
- software that has network availability
	- your software can and likely will be attacked
- targeteted by state-sponsored teams? Good Luck...

# Divide into three areas
- confidentiality - e.g., sensitive data is not visible
- integrity e.g., data is protected from modification
- avaliability e.g., services stay accessible

## Confidentiality
- attacks on this involve stealing data
- protect using encrytion (unsecured network or disk) or isolation of processes (if you trust the OS)
- encrption does not necessarly work forever. 


## Integrity
- attacks on data may aim to decieve users
- defence: apply checksums (e.g., check secure hash of data)
- attacks on code are often for *privilege esccalation*
	- e.g., attacker moves from normal user to super user
	- defence: avoid decisions being influenced by outside sources

## Availability
- e.g., DDoS
	- ditributed denial of service
- Defence: host services in multiple countries
	- use CDNs (content delivery networks) for data objects

## Key soft. dev. security area 1: dependencies
- vulnerabilities in dependencies affect your code too
	- determine and examine your software bill of materials SBOM
- subscribe to security alerts for your key dependencies
	- plan to rapidly rebuild and release you software at short notice
- use tools to scan software for know problems
	- e.g., gitlab auto devOps scancs containers for vulnerabilites

- doesn't mean dont use them
	- use them if they are good
- e.g.,
	- dont implement crypto yourself
	- use a secret manager for authentication
	- XACML libray
	- use libraries to parse data

## Key soft. dev. security area 1: santise input
- treat user controlled inpuut to your code as malicious
	- databases must prevent SQL injection 
- many input sources
	- user docs
	- config files
	- env variables

# Injection attacks
- rough def$^n$ some structure is not contained properly
- ![](https://i.imgur.com/59pHOQK.png)

# Resolving problems
![](https://i.imgur.com/8YBGRPq.png)
