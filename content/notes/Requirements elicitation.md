---
sr-due: 2022-04-15
sr-interval: 24
sr-ease: 274
---
#### Review questions
1. what is the purpose of requirements elicitation

2. how are models used in requirements elicitation

3. give a brief description of two of the the 6 main methods of requirement elicitation


___

#review 
# Requirements elicitation

## Themes
busines opeations and processes -> _what do you do_
performance of operations -> _how do you do it, what steps do you follow, how could these steps change_
information need for performance of operations -> _what info do you use, what inputs do you use, what outputs do you produce_

Be careful to find a balance between review of the old system and discovery of new requirements

## Use of [[Models]]
- Models are the primary output of requirements phase
- learn more by modelling domain from new perspectives
- abstraction reduces complexxity
- need to document details
	- to remember stuff
	- for future maintenance/enhancement
- used to communicate with [[stakeholders]] and other devs

## Methods
- Review existing material 
	- get inital understanding
	- use as guidelines for [[Interviews]] etc.
	- be cautious of existing material
	- e.g., 
		- internal -> traning modules, job descriptions, forms, mission statement etc
		- external -> trade publication, best practives, standards etc.
		- ![[Pasted image 20220315132940.png]]
- [[Interviews]]
	- e.g., 
		- ![[Pasted image 20220315133134.png]]
		- ![[Pasted image 20220315133326.png]]
- [[Observation]]
	- beware observaion bias
	- document using workflow diagrams
	- not necessary to observe all processes at same level of detail
	- e.g., Apprentice [[Needfinding#^4453ee]]
- [[Prototyping]]
	- to test and evolve concepts
	- to evaluate "look and feel"
	- focus of accomplishing single objective
	- built quickly using [[Integrated Development Environments|IDE]] (drag and drop features etc) and/or RAD frameworks
- [[Questionnaire]]
	- Limited information can be gained
	- Inital insight into business
	- not suited for gathering detail information
	- focus of closed-ended questions with simple direct answers
	- e.g., ![[Pasted image 20220315134147.png]]
- Research existing vendor solutions
	- take advantage of existing tools/software
	- can avoid mistakes and save time and money
	- help users generate new ideas about how to best perform business functions
	- often cheaper and less risky to buy a solution than to build it
		- risky to purchase this before requirements are known
		- its best to wait until reqs are thoroughly investigated

## Validating requirements
- make sure gathred information is correct
- structured walk through
	- effective way to implement quality control
	- verify and validate sys reqs
	- review finding from investigators
	- review of models based on findings
- PM responsible for system quality
- schedule review after doc creation
- review conducted by experienced analyst and [[stakeholders]], presented by analyst

## Use in [[Agile Development]]
reqs should be decoupled
- as inpependent as possible
- id which reqs to inplement not to implement them

every iteratio includes a requirements collection and prioritisation activity
- important requirements are implemented next
- less important are held for later iterations or not at all

Scrum: product backlog
UP: inception and elaboration phases
XP: user stories

## Pain points
- users
	- unable to articulate reqs
	- ignorant of relevant tech
	- reluctant to discuss reqs
	- may contradict or disagree with other
- language terminology barriers between analyst and user
- often need multiple user sources to fully understand a req
- analyst lacks skills
- personality issues, e.g., analyst too assertive or abrasive