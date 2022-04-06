---
title: Requirements
sr-due: 2022-04-06
sr-interval: 15
sr-ease: 232
---

tags: #review
resources: 
[article about requirements](https://sceweb.uhcl.edu/helm/RationalUnifiedProcess/process/workflow/requirem/co_req.htm#Reliability)
[IBIS](https://en.wikipedia.org/wiki/Issue-based_information_system)
[moscow method](https://en.wikipedia.org/wiki/MoSCoW_method)

---
## Review Questions

1. Name three properties of good requirements and for each property explain why it is a good property. (NUUCCC)
	- understandable -> by users -> reduces misunderstandings
	- un-ambiguous -> reduces midunderstandings
	- complete -> nothing missing
	- non-prescriptive -> say what the system should do, not how it should do it
	- consistent => do not contradict each other
	- correct -> as judged by user
	
2. What is the difference between functional and non-functional requirements? 
	- features vs contraints
	
3. What effects do poor quality requirements have on the subsequent development of the system? 
	- increased cost/time
	- increase chance of failure
	- more difficult maintenance
	- not meeting needs of client
	
4. How are requirements elicited and managed using the three main agile methodologies presented in the lectures?
	- scrum
		- requirements owned and priotitised by the product owner
	- XP
		- based on user stories, continuous involvement of users
	- UP
		- requirements contructed in at the beginning
		- functional req's implemented first then contrainst like security, performance etc
___
# Requirements
> “…descriptions of how the system should behave, application domain information, constraints on the system’s operation, or specifications of a system property or attribute.”  - Kotonya and Sommerville, 2001, p. 6

> “…a statement of need, something that some class of user or other stakeholder wants.” - Alexander and Stevens, 2002, p. 8

something the system should do or a contrainst the system should adhere to

## Requirements engineering
> “…to cover all of the activities involved in discovering, documenting, and maintaining a set of requirements for a computer-based system.” - Kotonya and Sommerville, 2001, p. 8

robust way to develop requirements
Key concepts
- discovery -> capture, elicitation, identification
- documenting -> specifying, modelling
- maintenance -> manging changes in env of sys

### Requirements document:
- services and function
- contraints
- overall properties
- systems env incl. related sys's
- application domain information
- constraints of development process

## requirements in agile methodologies
[UP](content/notes/agile-development.md#^e2bc0b)
- Requirements (based on use cases) mostly elicited, modelled, and refined during inception, elaboration, and construction phases.
- Functional requirements implemented before technical, performance, reliability requirements.

[XP](content/notes/agile-development.md#^e9fd09)
- Based on user stories rather than explicit individual requirements.
- Continuous involvement of users who can make business decisions about functionality and scope.

[Scrum](content/notes/agile-development.md#^4ddbdc)
- user stories (if mapped back to business process to create stucture to the product backlog)
- requirements owned and prioritised by the product owner

## how to specify requirements
published standards -> (e.g., ISO 9000, IEEE/ANSI 830-1993)
natural language text desciptions and scenarios

models 
- function catalogue
- ERD's
- UML's

prototypes: 
- evolutionary -> changes to existing prototype/idea
- revolutionary -> completely new

formal mathematical notation

## Good requirements 
^df23e2
- understandable -> by users
- non prescriptive -> what not how
- correct -> as judged by user
- complete  -> nothing missing from _individual_ requirements
					-> nothing missing from _complete set_ of requirements
- consistent -> do not contradict each toher
- unambiguous -> one one possible interpretation
- also
	- precise, concise, cohesive, feasible, relevant, up to date, testable, traceable

## Type of requirements

^c1a732
### Functional requirements

^9e1ad5

what should the system do

### Non-functional requirements

^ab5ecd
contraint -> how the system should do something
e.g., behaviour , constrainst , usability , reliability , performance , security

### FURPS
usually overkill

categories
- functional -> features
- usability -> UI and system availability
- reliablility
- performance
- supportability

furps + adds
- design
- implementation
- interface
- physical

**examples**
![300](None)

## Consequences of poor requirements
- Delays and extra costs
- failure to meets real needs of customer
- higher cost of maintenance
- unreliable/non functional system

## Causes of poor requirements
- problem not well understood (domain comlpexity)
- misunderstanding between parties
- [stakeholders](content/notes/stakeholders.md) -> not trained, dont have authority, are not available/plentiful
- continually evolving requirements
- requirements are -> incomplete/abmiguous/inconsistent/overlapping/unimplementable