# Heuristic evaluation
>"Heuristics are strategies derived from previous experiences with similar problems"
jacob nielsen and rolf molich

help find usability problems
small set of 3-5 evaluators examine UI
independently check for compliance with usability principles
different evaluators will find different problems
evaluators only communicate afterwaards
findings are aggregated at the end

![[Pasted image 20220322102933.png]]

## 1 when?
- as part of need finding -> use experts to critique existing solutions
- before user testing -> identify minor issues before user testing
- before redesigning -> learn what works and what should change
- when you know there are problems but you need evidence -> "provide you with ammunition for design"
- before release -> smooth off rough edges

## 2 What
### 2.1 Process
#### 2.1.1 Overview
Helps find problems in design
- 3-4 evaluators examine UI
	- independent reviewers check for compliance with usability principles
	- each evaluator will find different problems
	- evaluators only communicate afterwards and the findings are aggregated
can perform on working UI or sketches

#### 2.1.2 Phases
1. pre evaluation training ⇒ give evaluators needed domain knowledge and information on the scenario
2. evaluation ⇒ individuals evaluate then aggregate result
	1. first as individuals
	2. then sit all together and aggregate
3. Severity rating ⇒ determine how severe each problem is (priority). Can do first individually and then as a group
4. Debriefing ⇒ review with design team

#### 2.1.3 Individual
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

#### 2.1.4 Severity rating
- independently estimate after viewing
- allocate resources to fix problems
- estimate need for more usability tests

0. not problem
1. cosmetic problem
2. minor usability problem
3. major
4. catastrophe

#### 2.1.5 Debreifing
- with evaluators observers and dev team
- discuss general characteristics of UI
- suggest potential imporvements
- dev team estimate effort to fix
- brainstorm solutions

### 2.2 Nielsen's ten heuristics
visibility of system status
match between system and world
user control and freedom
consistency and standards
error prevention
recognition rather than recall
flexibility and efficiency of use
aesthetic and minimalist design
help users recognize, diagnose, and recover from errors
help and documentation

### 2.3 Heuristic evaluation vs user testting

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


![[Pasted image 20220316101636.png]]


### 2.4 Extra tips how to individual
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