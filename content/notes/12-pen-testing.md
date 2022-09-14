---
title: "12-pen-testing"
aliases: 
tags: 
- comp210
- lecture
---

# News
- DOC mt cook ransomware


# Pen Testing
intrustion detection, system monitoring, penetration testing
- prevention detection analysis
- some ovelap with forensices
- IT interesting in prevention and detection
- security specialists more interesting in analysis

## Terminology
- hacker 
	- was originially positive - enthusism etc
	- became negative through public media (wargames 1983, Hackers 1984)
	- cracking can mean bad hacking
- white hat - good
- black hat - bad
- others:
	- grey hat - may violate laws to discover vulnerabilites for good reasons
	- script kiddie - uses ready made exploits
	- hacktivist - hacks for political/social causes (e.g., Anonymous "Anon")
	- cyberwarfare

## People
- kevin mitnick
- robert tappan morris
	- morris worm (to measure size of internet)
- dan kaminsky
- wietse venema

## Risk assessment
evaluate potential risks so you an safegurad against them
- consider pobability and severity
	- e.g., risk matrix
	- SEP (Severity, Exposure, Probability) model
	- account to cost of safeguarding
	- remember complex attacks may be difficult to carry out
- limitations
	- probabilites and severity are estimatse
	- limitations of qualitative assessment
	- subjectivity

### Attack surface
describe not how vulnerable you are but what vulnerabilites you have
- refers to all potential vulnerabilities
	- includes social engineering etc
- more components of system = greater attack surface
- more widely available = greater attack surface
- principle of leasts privilege

![example risk matrix|400](https://i.imgur.com/RHVe8Vn.png)

### SEP model
- takes into account severity exposure (attcak opporunities), and probability using weighted scores
- severity 1-5 — potential consequences
- exposure 1-4 — frequency or duration of opportunity for attack to occur
- probability 1-5 — likelihood of consequences given exposure instance.
- overall risk is S x E x P

Once score is calculated, the course of action can be determined using the following table.
![actions table|400](https://i.imgur.com/qWCvGgI.png)

### Security through obscurity
an optimistic/idealist approach. Better to think of STO as a 