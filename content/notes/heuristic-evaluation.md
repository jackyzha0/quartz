---
title: "heuristic-evaluation"
tags: 
- info203
- scott_video
---

>"Heuristics are strategies derived from previous experiences with similar problems"
jacob nielsen and rolf molich

- help find usability problems
- small set of 3-5 evaluators examine UI
- independently check for compliance with usability principles
- different evaluators will find different problems
- evaluators only communicate afterwaards
- findings are aggregated at the end

![example heuristic report](https://i.imgur.com/DfmaHlI.png)

# when?
- as part of need finding -> use experts to critique existing solutions
- before user testing -> identify minor issues before user testing
- before redesigning -> learn what works and what should change
- when you know there are problems but you need evidence -> "provide you with ammunition for design"
- before release -> smooth off rough edges

# What
## Process
### Phases
1. pre evaluation training ⇒ give evaluators needed domain knowledge and information on the scenario
2. evaluation ⇒ individuals evaluate then aggregate result
	1. first as individuals
	2. then sit all together and aggregate
3. Severity rating ⇒ determine how severe each problem is (priority). Can do first individually and then as a group
4. Debriefing ⇒ review with design team

### Individual
dont look search for heuristics individually
just go through the app (like a user). If we find issues, we assign them to categories

step through design several times
- examine details, flow, an architecture
- consult list of usability principles
- … and anything else that comes to mind

which principles
- Nielsen's heuristics
- category specific heuristics
	- e.g., design goals, competitive analysis, existing designs
	
use violations for redesign/fix problems

multiple evaluators because no one finds everything
some will always find more than others (Rule of thumb 5 evaluators find ~75% of problems)

### Severity rating
- independently estimate after viewing
- allocate resources to fix problems
- estimate need for more usability tests

0. not problem
1. cosmetic problem
2. minor usability problem
3. major
4. catastrophe

### Debreifing
- with evaluators observers and dev team
- discuss general characteristics of UI
- suggest potential imporvements
- dev team estimate effort to fix
- brainstorm solutions

# Nielsen's ten heuristics
[design-heuristics](notes/design-heuristics.md)
- visibility of system status
- match between system and world
- user control and freedom
- consistency and standards
- error prevention
- recognition rather than recall
- flexibility and efficiency of use
- aesthetic and minimalist design
- help users recognize, diagnose, and recover from errors
- help and documentation

# Heuristic evaluation vs user testting

heuristics        | user testing
----------------- | --------------
faster            | slower
1-2 hrs each      | 
results pre-interpreted | 
^ done by experts | 
less accurate     | more acurate
does not take into account actual users | can find issues that experts might not have

value to alternate methods
^ find dfferent issues

![](https://i.imgur.com/YgGkBqg.png)

# Extra tips how to individual
- at least two passes each 
	- first get get feel for flow
	- second to focus on specific elements
- if a system is "walk up and use" or evaluators are already domain expers ⇒ no assistance is needed
	- otherwire might supply evaluators with scenarios
- each evaluators should list issues separately
- risk of repeating problematic aspect
- may not be possible to fix all problems
- where problems may be found
	- single location in UI
	- two or more locations that need to be compared
	- problem with overall structure
	- something is missing
	- ambiguous with early prototypes
	- sometimes ....
