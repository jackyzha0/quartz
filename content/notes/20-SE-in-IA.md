---
title: "20-SE-in-IA"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2024-08-24
sr-interval: 390
sr-ease: 250
---

# why
- apps for IoT devices contain security flaws
	- smart home security breaches
	- kindles
	- vulnerable libraries lead to vulnerable devices
- software helps us to use hardware
	- need to make the software secure

# overview
combines computer science, engineering, and maths to make software

- software engineering coined in 1968-1969 when discussing 'software cirsis'
	- security breaches
	- bugs etc

different from individual programming because of the Audience
![](https://i.imgur.com/yuIeXpq.png)

- types
	- generic software
		- stand alone systems e.e.g, word etc
	- customized software
		- designed specifically for a customer
	- generic can transistion to customised

# dev process
- tried to mirror engineering process
- software is different
	- needs to be flexible

timeline
- waterfall
- spiral
- [[agile]]

# stages
## design
- feasability
	- ![slide](https://i.imgur.com/KD8J4Dr.png)
	- financial, legal, time, etc
- requirements specification
	- stakeholders
		- anyone affected by the system
		- ![slide](https://i.imgur.com/NkMt4q7.png)
	- features, requirements
		- ![slide](https://i.imgur.com/ghNmRhj.png)
		- ![use vs system reqs](https://i.imgur.com/DWSNrSu.png)
		- ![functional vs non functional](https://i.imgur.com/gWwAWBV.png)
- system design
	- ![slide](https://i.imgur.com/mMBkSp1.png)
	- databse design
		- er model etc
	- architectural design
		- structure of application
		- ![mvc](https://i.imgur.com/V3FvokX.png)
			- view model controller
	- security
		- during development not after
		
## develop
- ![slide](https://i.imgur.com/P852JEc.png)
- version control
	- ![version control](https://i.imgur.com/G6iExvO.png)
	- ![centralised](https://i.imgur.com/gExIZRq.png)
- issue tracking
	- keep track of tasks, bugs, feature requests etc
- unit testing
- code reviewing

## validation
- checking if system conforms to specs
	- unit testing
	- component testing
	- system testing
	- user acceptance testing (UAT)
		- ![UAT](https://i.imgur.com/ksLDRP0.png)
		- finds issues that devs dont see
- ![hehaviour driven development](https://i.imgur.com/M8pxgcO.png)
- code reviews
	- better than one single person
	- different perspectives
	
## evolution
- new requirements derived through software use
- change in business processes occur as a result of new business opportunities
- errors in software surface later
- upgrade to new hardware, 
- need for improved system performance

# for Information assurance
- security should be central
- think of security every step of the way
- code resure and (SDKs) should be critically evaluated
	- often flaws are inherited from reused llibraries or copied online code
- where are the security knowledge gaps
	- use tools to detect vulnerabilities
	- 