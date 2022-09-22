---
title: "dns"
aliases: 
tags: 
- cosc203
---

record has four fields
- name
- value
- type
- ttl

meaning of name an value are dependent on type

Types
- A
	- name - hostname
	- value - ipv4 address for the hostname
	- hostname to ipv4 mapping
- AAAA
	- same as A but ipv6
- NS
	- name - domain (e.g., otago.ac.nz)
	- value  - hostname of authoritave DNS server that knows how to get the IP address for hosts in the domain
	- used to route DNS queries further along th