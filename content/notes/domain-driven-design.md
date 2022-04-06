---
title: Domain Driven Design
draft: true
aliases: DDD
sr-due: 2022-04-12
sr-interval: 19
sr-ease: 272
---
#review 
# Domain Driven Design

>A method of designing software by designing models of the domain and creating software which conforms to those models

Ubiquitous language -> The language a team agrees on to describe ideas in the problem domain
- This laguage becomes more and more refined as it is used
- This reduces misunderstandings

Diagram:
```mermaid
	flowchart LR
	subgraph Tactical Design Tools
		subgraph Service
			direction TB
			B(Project)
			C(Layers)
			D(Modules)
			E(Design Patters)
			F(OOP)
			G(Classes)
			H(Objects)
			I(Exe, jar, zip)
		end
	end
```

``` mermaid
	flowchart LR
	subgraph  Strategic Design Tools
		direction LR
		Domain-->Sub-Domain1-->Service1
		Domain-->Sub-Domain2-->Service2
		Domain-->Sub-Domain3-->Service3
	end

```