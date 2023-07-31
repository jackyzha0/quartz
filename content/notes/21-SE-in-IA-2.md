---
title: "21-SE-in-IA-2"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2024-10-13
sr-interval: 440
sr-ease: 270
---

# need in all phases
- often overlooked in feasability stages
- security requirements not defined
- built without thinking about security
- tests do not take security into account
- without security evolution can become cumbersome

more costly to fix bug in development than in design
- the later we fix it the more costly it is

## from the start
- hire right people
- with hacking mindset
	- so they alwasys think about security
- invite customers to training and seminars
	- testing could uncover security issues

## questions during feasability
- ![](https://i.imgur.com/svo2sIb.png)
- what are the implications for users if assets are lost
	- some information is more high risk that other information

## during design
- should be designed in iterative manner
- threat modelling
	- ![diagram](https://i.imgur.com/RM6lyC1.png)
	- Data Flow Diagram (DFD)
		- ![](https://i.imgur.com/iCEh2NU.png)
		- high or low level
		- want to be nimble
		- dont want to go overboard
		- ![level 1 dfd](https://i.imgur.com/rfyCUxH.png)
		- 
- potential threats
- STRIDE
	- ![list](https://i.imgur.com/ZBHK7v7.png)
	- can identify parts system using DFD that are threatened by these things
		- ![e.g](https://i.imgur.com/EwUSQzS.png)
		- ![threat tree](https://i.imgur.com/RtqTzJ6.png)
			- defines the potential dcisions that are performed by the attacker
		- ![information to keep track of](https://i.imgur.com/k1vsDfu.png)
		- risk = criticality * likligood of occurance
			- should be consistent
			- can also use DREAD
				- ![list](https://i.imgur.com/VZYmjCU.png)

example
- ![](https://i.imgur.com/ZybxDCx.png)

responsing to threats
- do nothing
- inform user
- remove problem
- fix problem

- design choice sto counter threats
	- ![](https://i.imgur.com/LzIHfdF.png)

## during development
- techniques vary based on type of software
- sytem 
- firmware
- drive
- programming software

- common vulnerabilities
	- ![](https://i.imgur.com/lmU61jd.png)

example connection string
- ![](https://i.imgur.com/sV6OzCo.png)
- can provide extraneous parameters to fiind the right ones

example SQL injection
- ![](https://i.imgur.com/XNNDur9.png)

tips for vailidation and preventing overruns
- ![](https://i.imgur.com/Mz7edc6.png)


## during evolution
- assign security evagelist
- plan "security days"
- learn from mistakes
- minize attack surface

## stack overflow
- ![examples](https://i.imgur.com/NumPTGn.png)


# summary
![](https://i.imgur.com/tTC8jIs.png)
