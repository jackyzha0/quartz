---
title: "formal-code-review"
aliases: formal code review
tags: seng
---

A [[code-review]] that follows an agreed procedure.

- multiple people
- sync (formal meetings) vs async (email, slack, etc)
- requires prep work
	- reviewers need to understand context
	- coders need to make sure code it good
- formally documented
	- who reviewed
	- what did they say


A method of doing this is the [[fagan-review-process]]


## What to look for
- Deviations from house style 
	- Insufficient [[documentation]] 
	- Indentation errors (c.f., “goto fail;”) 
- Difficult to understand code 
	- Likely to have bugs 
- Efficiency problems 
- Logic errors 
- Security vulnerabilities 
	- Inspection can be more specific

## Documentation
- Process: 
	- What was the purpose of the review 
	- Who did the review and when 
	- What were the results of the review 
	- Reviews need to sign-off when finished 
		- And takes some responsibility for the code at that point 
			- Be careful to avoid a blame culture 
- Content: 
	- Comments (discussion) will be made in the review 
		- Ideally related directly to the code 
	- Important to document and prioritize changes 
- Follow up: 
	- Review may initiate code re-write or change

## Tools
- Code review may be connected to version control 
	- Commits can carry comments (so use them effectively) 
- Comment on the change, and why 
- Code review may be connected to bug tracker 
	- Which bug, fixed when, by who, and how 
- Version control may be connected to bug tracker 
- Some parts of code review can be mechanised through [[continuous integration]] 
	- [[unit-testing]], integration [[testing]], and [[regression tests]] 
	- Coverage 
	- [[Static analysis ]]
	- Etc.

## SmartBear code review tips

Guidelines from SmartBear blog
- Review fewer than 400 lines of code at a time 
- Inspection rates should involve fewer than 500 LOC per hour 
- Do not perform code review for more than an hour at a time 
- Set goals and capture metrics 
	- so you can monitor performance of developers
	- know typical bugs of each developer
- Authors should annotate source code before the review 
- Use checklists  [[the checklist manifesto]]
- Establish a process for fixing defects found 
- Foster a positive code review culture 
- Embrace the subconscious implications of peer review 
- Practice lightweight code reviews
	- Lightweight [[informal-code-review]] takes less than 20% the time of formal reviews and finds just as many bugs!
