---
title: "13-pen-testing-2"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2022-12-15
sr-interval: 30
sr-ease: 270
---

# Intrusion detection cont.
## Auditing
a thorough prces of investiagtina nd analaysing aa system for vilnerabilities 
- e.g., pen testing
- 
can also refer to logging (esp. in a databse context)

## Firewalls
protect aginst network intrusions
- built in or third party
	- built in - integration quality of control. ofen light convenince features maybe no GUI
- black/whitelist
- mandatory access control on routers
	- mandatory access control
		- e.g., block a netork port
		- block icmp packets (some sytems are vulnerable)
- application level filtering for desktop systems
	- finer grained control for linking rules to applications themselves (processes)
	- router doesn't know about applications
	- may not trust an aplication to connect o a web server but do trust other.
	- dont have to block everything on that webserver
- provide altering and logging (avoid crying wolf)
	- "end user alert fatigue"

> northcutt and novak - network intrusion detection


## Intrustion detection systems
- often bundled with commercial routers, network storage devices (NAS, SAN) - "cloud storage within organisation"
- can also be host based (HIDS)  "situated aroud network"
- intrusion can be identified by know signatures (like pattern-based virus scanners)
- can also be anomaly-based (using heuristics)

## other intrusion detection topics
- file integrity checking
	- hash checking to detect changes
- backup and recovery

## keeping up to date with vulnerabilites
- CERT NZ
- US-CERT
- CVE at MITRE
- NVD (us NIST national vulnerabilities database)
- conferences such as DEF CON

# Sting operations
deliberately place sofware where it will interact with attacks, somewhat resembling a police sting operation.

## Honeypot
- decoy service used to attact attackers
- divert attackers from real service
- identify attack origin - analyse attack - create countermeasures
- honey-nets - co-ordiniated honeypots. - analyse malware infection behaviour (malware epidemiology)
- bogus email address lists to hinder spammers
- individual e-mail address can be used to gather and analyse spam smessages

## Tarpits
- similar to honeypots but for *slowing* attack not diverting
- often deployed as a proxy server in front of the real service
	- talks to a web server as a client on behalf of another client
	- intermediate between client and server
	- logging, throttling,  

## Heroic human tarpits
- ![videos|400](https://i.imgur.com/ZqQqBi1.png)

## DNS blackholes/sinkholes
- aka real time blackhole list (RBL)
- anti-spam measure, widely used by ISPs
- traditional SMTP is highly vulnerable to abuse
	- STMP assumes people "will be nice". 
	- you can list whoever you like as the sender
- open mail relays are readly exploited by spammers
	- mail servers recieve email from anywhere and send to anyone
	- exlpoited by spammers
	- can usually be identified by AI and sent to blackholes
- use existing DNS protocols to communicate (OK/bad status)

## Software
- mac os activity monitor
- mac os console (sys logs)
- `tcpdump`
- `iptraf`
- WireShark
- Snort (open source NIDS)
- Fail2Ban ( intrusion prevention system usins logfile monitoring)
- TCP wrappers (historically significant)
- SATAN

# Pen-Testing
checking if system is secure. Simulated attacks of system to detect vulnerabilities
- specialised and technical
- often done by consultants
- mindset of attacker
- complements intrusion detection
	- but proactive not reactive

## tools
- same tools as attackers
- develop own tools
- automate
	- scripts 
	- dedicated hardware
	- parrallel/dist attacks
- create new attacks

## e.g., software
- nmap - network exploration tool
	- scan ports
	- reports finding
		- os, version
		- used to find vulnerabilities
- netcat/ncat interact with network services
- nessus
- hashcat - password cracking
- sqlmap (SQL database pen tester)
	- find account with default passwords etc
- specialised pen-testing OS distribution
	- e.g., blackbox linux

## Phases
- reconnaissance (info gathering) (e.g., finding relevant ip addresses)
- scanning (e.g.,, nmap)
	- which hosts are availale
	- which ports
	- etc
- gaining access (attack)
	- may require sequenced attacks
- maintaining access (avoid detection)
- covering tracks (remove files, edit logs, change timestamps etc)
- 
