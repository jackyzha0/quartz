---
title: "25-revision"
tags: 
- lecture
- cosc301
---

exam general
- write in space provided
- no calculators
- no books, notes or other material
- 3 hours
- 18 short answer

question templates
- e.g., describe how attacker can launch DoS attack to target a machine using incomplete TCP connection
	- write bullet points: this makes it easier to mark
	- organise thinking
	- put stuff in structured way
	- e.g.,
		- tcp three way handshake
		- syn packet with forged IP source address
		- ...


need to explain meaning and funcionality of protocols in various repects as far as we understand

discuss pros and cons

e.g., given a backup plan (incremental etc), work out how to restore



look at past exams
- recent exams are not typical as they are open book

one question per lecture: issues discussed in lectures will be examined

# Lectures

general
-  can use diagram to explain
-  will ask questions that can be yes or no. you need to explain when its yes and when its no. what conditions are required, and why
-  always explain why

- 1
	- introduction
	- no exam question
	- every year 1 question about scenario in a company: give top 3 tasks you should do in the company
		- e.g., what is most important. put you into real context in company
		- no standard answer
		- need to initiate idea
		- what tasks and why
		- e.g,: security is an issue: educate users, security policy, 
		- e.g.,: email: company is maintaining email - not good - they should outsource, dont just use google, internal email.
		- e.g., web server, dns, etc
- 2
	- summarise everything
	- OSI model:
	- not detailed examination
	- overall examination
	- troubleshooting based on OSI model
- 3 ipv6
	- important
	- the common/different ipv6 addresses
	- dhcp and SLAAC
	- neighbor discovery
- 4 sciprting
	- not examined
	- important for automating administrative work
- 5 filesystems
	- talk about already in 204
	- need to know about access control and access control models
		- mandatory/discretionary
	- backups and how to restore
- 7 sys installation
	- not examined mostly
	- if fs corrupted, important to know how to revover
		- e.g., livecd, mount hdd, fix files, recover
- 8 post installation
	- security issues
		- why not set path =.:/bin:/sbin
			- search order of commands
	- mitm attack
	- security related attacks: should be able to understand reasonably
- 9 wireless networking
	- security issues
	- quality of network
	- what situation to use wifi and when not to use wifi
- 10 scheduled tasks, logs
	- filtering vs scanning
	- log levels
	- logs are very important
	- practical issue, difficult to examine
- 11 DNS
	- understand resource record and its fields, what are their meanings.
	- e.g., MX record, why do we need it, why not just same as A record
	- TTL field: what is it used for for each record. what is impact of ttl
		- normally specifiy per domain
		- everytime you get a new record from a domain: how long to cache the record?
- 12 DHCP
	- basic question
	- not too much detail
- 13 SSH
	- what is port forwarding
	- why do we need it
	- differnce VPN vs SSH
	- security. can it prevent from mitm? explain why or why not
		- need to check public key from the other party to make sure
- 14 mail
	- understand spam and how email is forged
	- which fields can and cannot be forged
- 15 www
	- security issues of cookies
	- xss, how, why, what it is 
	- sanity check
	- most security issue is because of missing sanity check of user input
- 16 TLS + 17 Network security
	- certificate, how it works, why it can authenticate that bob is bob
	- security measures
	- policies
		- who should be involved: which parties and why
- 18 internal routing
	- RIP, BGP protocols understanding
	- firewalls
		- stateful
		- stateless
		- simple routing
		- differences etc
- 19 firewalls
- 21 network accounting
	- not much
- 22 subneting
- 23 exterioir routing
	- BGP
- 24 ethics + diagnostics
	- scientific method for troubleshooting using OSI
	- not examined
