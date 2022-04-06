---
title: Evaluating designs
draft: true
sr-due: 2022-04-07
sr-interval: 10
sr-ease: 210
---

tags: #review

---
#### Review questions
1. what are two of the five (PGRCW) isses to consider when evaluating designs
- precision and reliability
	- are your evaulationg repeatable
	- are they accurate
- generalizability
	- do your findings apply to the real world
- realism
	- do you results apply tot he real world
- comparison
	- better than just "do you like it study"

3.  what are the two styles of evaluation. How do they differ
- ~~qualitative and quantitative~~
- field and lab studies

4. when would you use a qualitative methods and when would you use a quantitative method
- qualitative when comparing designs
- quantitative when evaluating a single design

5. what are two stages of design and in each cycle which type of method should you use
- design stage qualitative
- implentation quantitative

6. give a brief description of one method of evaluation. 
- feedback from experts
- usbility studies
- observation
- simulation/maths
- surveys/focus groups
- comparitive experiments

---

# Evaluating-designs
Why to evaluate using 'outside' people:
- how do we know if a [prototype](out/notes/prototyping.md) is good
- designer/developers are not 'fresh' -> they already have experience with the product
- designer/developers don't know what real users will do

## Issues to consider
- Reliability/precision
	- how accurate is your study?
	- Is is reproducible -> if it was repeated, would you get the same result
- Generalizability
	- Is your sample representative
- Realism
	- Would observed behaviour also occur in the wild
- Comparison
	- Shows how different options were recieved
	- rather than a "people liked it" study
- work involved/efficiency
	- How cost efficient are your methods

## Factors to consider when choosing an evaluation method
- Stage in the cycle at which the evaluation is carried out -> (design / implementation)
- Style of evaluation -> (lab / field)
- Level of subjectivity or objectivity
- Type of measurement -> (qualitative / quantitative)
- Information provided -> (high-level / low-level)
- Immediacy of response -> (real-time / recollection of events)
- Level of interference implied -> (intrusiveness)
- Resources required -> (equipment, time, money, subjects, expertise, context) 

## Styles of evaluation
##### Laboratory Studies 
- 1st step: Designer evaluates his/her UI
- Specialised equipment for testing available
- Undisturbed (can be a good or bad thing) 
- Allows for well controlled experiments
- Substitute for dangerous or remote real-world locations
- Variations in manipulations possible / alternatives

##### Field Studies
- Within the actual user’s working environment
- Observe the system in action
- Disturbance / interruptions (+/-)
- Long-term studies possible
- Bias: presence of observer and equipment
- Needs support / disturbs real workflow

## Quantitative vs Qualitative methods
##### Quantitative Measures
- Usually numeric
- E.g. # of errors, time to complete a certain task, questionnaire with scales
- Can be (easily) analysed using statistical techniques
- Rather objective
- Most useful in comparing alternative designs
- Test hypotheses
- Confirm designs

##### Qualitative Measures
- Non-numeric
- E.g. survey, interview, informal observation, heuristic evaluation
- Difficult to analyse, demands interpretation
- Rather subjective 
- User’s overall reaction and understanding of design
- Generate hypotheses
- Find flaws

## Stage in cycle
##### Design Stage
- Only concept (even if very detailed) exists
- More experts, less users involved
- Greatest pay-off: early error detection saves a lot of development money
- Rather qualitative measures (exceptions: detail alternatives; fundamental questions, ...)

##### Implementation
- Artefact exists, sth. concrete to be tested
- More users, less experts involved
- Assures quality of product before or after deployment; bug detection
- Rather quantitative measures (exceptions: overall satisfaction, appeal, ...)

## Methods
### Usability studies
- Bringing people in to test Product
	- Usage setting is not ecologically valid - usage in real world can be different
	- can have tester bias - testers are not the same as real users
	- cant compare interfaces
	- requires physical contact
### Surveys and focus groups
+ quicly get feedback from large number of responses
+ auto tally ressults
+ easy to compare different products
- responder bias
- Not accurate representation of real product
* e.g., ![Pasted image 20220316130318.png](None)
* Focus groups
	* gathering groups of people to discuss an interface
	* group setting can help or hinder
	
### Feedback from experts
- [Peer critique](None)
- [Dogfooding](None)
	- Using tools yourself
- [Heuristic Evaluation](out/notes/heuristic-evaluation.md)
	- structured feedback

### Comparative experiments
- in lab, field, online
- short or long duration
- which option is better?
- what matters most?
- can see real usage
- more actionable

### Participant observation
- observe what people do in the actual evironment
- usually more long term
	- find things not present in short term studies
- [Observation](out/notes/observation.md)

### Simulation and formal models
- more mathmatical quantitative 
- useful if you have a theory to test
- often used for input techniques
- can test multiple alternatives quickly
- typically simulation is used in conjugtion with [monte carlo optimisation](None)

## Query techniques
- [Interviews](out/notes/interviews.md)
- questionnaires
	- less flexible
	- larger samples possible
	- design of questionnaire is for expert only
	- use of standard (proven) questionnaires recommended
	- types of questions: 
		- general (age, gender)
		- open ended 
		- scalar (e.g., likert-like scales)
		- multiple choice
		- ranking

## Users
- users can come up with great ideas
	- lead user -> need specific soluton that does not exist -> often make up their own solution
	- extreme user -> use existing solution for it's intended purpose to an extreme degree 
	- typical user -> 