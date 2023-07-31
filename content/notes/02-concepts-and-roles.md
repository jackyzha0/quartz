---
title: "02-concepts-and-roles"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2024-12-26
sr-interval: 514
sr-ease: 250
---

- [slides](https://blackboard.otago.ac.nz/bbcswebdav/pid-2956897-dt-content-rid-18930757_1/courses/COMP210_S2DNI_2022/Lecture_02%281%29.pdf)

# News
- [more personal email scams](https://theconversation.com/email-scams-are-getting-more-personal-they-even-fool-cybersecurity-experts-186009)
	- They have more knowledge about your personal information
- [deakin university attack](https://australiancybersecuritymagazine.com.au/up-to-10000-students-targeted-in-deakin-university-cyberattack/)
	- staff credentials were leaked and acces to students information was gathered
- [rusian hackers attack lithuania](https://www.reuters.com/world/europe/russian-hacker-group-says-cyber-attacks-continue-lithuania-2022-06-28/)
- [attacks against india](https://www.indiatoday.in/india/story/prophet-row-international-hackers-cyber-attacks-india-nupur-sharma-remark-1961941-2022-06-13)
- [retbleed attack affects AMD and Intel CPUs (spectre-based speculative-execution attacks)](https://thehackernews.com/2022/07/new-retbleed-speculative-execution.html)

# Vulnerabilities
- a potential weakness in an asset
	- or in its defense security control
- e.g., flaws in software packages or an unprotected system port

exploit is the technique used to attack

- [RAND report r-609-1 (1979)](https://i.imgur.com/GEVLIq1.png)
- need to be aware of vulnerabilities

e.g.,
- websites can steal browser data via extension APIs

# Security services and control
- services
	- the intended security goal or property (C.I.A provides the three main security services)
	- confidentiality
	- integrity
	- awareness
- controls
	- the mechanisms employed to implement the services
	- encryption
	- firewalls
	- awareness

## Controls
- physical controls
	- facility protection
	- guards
	- locks
	- monitoring
	- environment controls
	- intrustion detection
- technical controls
	- network security
	- cryptography
	- forensics
	- user authentication
	- etc
- administrative controls
	- policies
	- standards
	- procedures
	- guidelines
	- personnel screening
	- awareness training

- Preventive 
	- e.g., "prevent exposure of critical information"
	- control - e.g., encrpytion
- detective
	- e.g., "we want to warn attempts of intrustions"
	- control - e.g., intrusion detection systems
- corrective
	- reduce/fix damage
	- e.g., "we want to repair our system in case of errors"
	- conrtol - e.g., restoration point mechanisms (e.g., version control systems like [git](notes/git.md))

- we need security controls for all info states:
	- storage
		- information storage containers
		- electronic, physical, human
	- transmission
		- physical or electronic
	- processing
		- physical or electronic

# CIA
- a security service provides a high level security property

## Confidentiality
- information should not be available to unauthorised people
- divided into:
	- secrecy: protecting business data
	- privacy: protecting personal data
	- anonymity: hide who is engaging in what actions
- threats: information theft, unintentional disclosure
- controls: encyption, access control, perimeter defense
- general controls: secure systems development, and incident response

## Integrity
- data integrity: should not be corruped, tampered, altered with etc in an unauthorised manner
- system inegrity: accuracy and completeness
- threats: data and system corruption, loss of accountability
- controls: 
	- hashing, cryptographic integrity check and encryption
	- authentiation, access control
	- digital signing
	- config management and change control 
- general controls: Secure Systems Development and Incident Response

## Availability
- information should be accessible and usable upon demand by an authorised entity
- main threat: DoS
- controls:
	- redundancy of resources
	- load balancing
	- software and data backups
- general controls: Secure Systems Development and Incident Response

## Additionally properties
- accuracy - free from mistakes and erors
- authenticity - genuine or original
- utility - serve a purpose (e.g., census data)
- possession - ownership or control (importat for privacy)

# Privacy and Actors
- [facebook gdpr](https://techcrunch.com/2018/04/17/facebook-gdpr-changes/)

## GDPR
- To protect specific aspects of information that may be related to natural persons (personal information) 
- Prevent unauthorized collection and storage of personal information 
- Make sure your personal information is correct 
- Ensure transparency and access for data subjects 
- Provide adequate information security (C.I.A) around personal information 
- Define clear responsibilities around personal information 
- GDPR became EU law on 25 May 2018 (General Data Protection Regulation)

- [who can see my email](https://i.imgur.com/34R3hJx.png)

## Actors
- threat actors
	- those responsible for the security incident
- (security) Hacker
	- uses technical skills and knowledge to uncover bugs or exploits
- Attacker
	- may use other (non-technical) means to exploit data and system (the malicious intention is what matters here)

- intelligence agencies
- law enforcement
- nation states
- independents (hackers, criminals, private surveillance, manufacturers etc)

- [motivaitions](https://i.imgur.com/74qgpsc.png)

## Skills and focus of actors
- low skill & low focus
- high skill & low focus
- high skill & high focus
	- intelligence agencies
	- highly sophicticated

# Shared responsibility
- business needs first
- [information securty functions](https://i.imgur.com/apXn7Qb.png)
- [protecting the functionality of an organization](https://i.imgur.com/pT1nL8E.png)
- [enablling safe operation of applications](https://i.imgur.com/Ytzlqhc.png)
- [safeguarding technology assets in organizations](https://i.imgur.com/gNgScT8.png)

# Balance

- [balance](https://i.imgur.com/df1LZuP.png)

