---
title: "security"
aliases: 
tags: 
- cosc202
---

# Growing concern
since there is more software, dependencies, and they are getting increaingly complex the "surface area" of risk is growing.

Speed of development is more important than security.

Software systems involve a large number of components, and this means they are more likely to have bugs.

# Elements of Security
## Confidentiality
- Protecting data from being stolen.
- Usually contered using encryption and/or isolation of processes
- Encyption is not time proof.
	- computational power is increasing

## Integrity
- Attacks on data may aim to decieve users
- countered using checksums
- attacks on code are often *privilege escalation*

## Availability
- DDoS
- countered by hosting in multiple countries
	- use CDNs (content delivery networks) for data objects

# Dependencies
- vulnerabilities in [libraries](notes/libraries.md) extend to your code. 
- You should
	- determine and examine your software bill of materials (SBOM)
	- subscribe to security alerts
	- plan to rapidly rebuild and re-release your software
	- use tools to scan software for know problems
- However, still use them when appropriate

# Non-Validation of user input
- Assume user input is malicious
- Prevent SQL injection attacks
- Input from many sources
	- user docs
	- config files
	- env variables

# Injection Attack
## Example:
```java
String query = "UPDATE pw='NEW_PW' WHERE user='user'"
```

malicious input: Bobbie' OR 1=1 wil change all passwords.

use SQL prepared statements or secure DB abstraction

buffer overruns also inject attacker's data:
- e.g., C array that too short for data copied in from network
- attacker overruns end of the C aray: maybe injects code.

# resolving problems
![](https://i.imgur.com/8YBGRPq.png)

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

# sec in dev
- - security isn't a single requiremtn you can  tick off
	- it needs consideration throughtout the whole system
	- it is a cross-cutting concern
	- it is hard to retrofit
- notion of security engineering is useful
	- affects design descision fromt the outset
	- changes how code is written and reviewed
	- add a specific type of testing to include
	- needs examination of how users interact with software