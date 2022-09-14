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
an optimistic/idealist approach. Better to think of STO as a pseudosecurity measure

### Shannon's Maxim
"The enemy knows the system", i.e., assume that any security mechanism is not secret.

### Kerckoff's Principle (crypto specific)
A cryptosystem should be secure even it its inner workings (though not the key) are know to an attacker

### Questions to consider
- what are the stakes?
	- why might you be a target?
- who are your potential adversaries?
- what resources might they have?
- what is the cost to safeguarding against plausible attacks?
- can you put a monetary value on your data or uptime?

# Intrusion detection
Knowing that an attack has happened, who did it etc

- "logging in"/"logout" the event is logged
- log files get large to rotation (splitting, compression and culling) is used
- need to have a policy of retention and level of detail for log files
- unix-like systems tend to use a standard format (plain test, one line per event, with a timestamp)
- may need specialised tools to searching logs for relevant events
	- correlations, etc

many levels
- system wide events (startup/shutdown)
	- often includes memory dump
- authentication events (log in/log out, sudo commands)
- network level (esp in conjunction with firewall rules)
	- log attempts to access ports
- service specific (e.g., web server, db server, SSH)

![example web server log](https://i.imgur.com/b6XDvJj.png)
client ip, timestamp, request, response code, data length

## system monitoring in general
attacks will often incur ususual loads on the system
- more CPU usage
- high login attempt frequency
- large number of running processes
- (unusuallly) high memory use
- unusual or high network activity (DDoS or incoming attack)
- unusual disk/io usage

standard tools
- top
	- busiest processes - and their information (CPU, Memory)
	- general system information (cpu usage, num processes, network, etc)
- 