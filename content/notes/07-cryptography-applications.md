---
title: "07-cryptography-applications"
aliases: 
tags: 
- comp210
- lecture
sr-due: 2024-11-04
sr-interval: 462
sr-ease: 250
---


interest doesn't have low level security
- this would decrease compatibility
- easier to add this at hosts and software layer

# Layer model
- each layer of network hides information about lower levels and adds information for higher levels\
- transmission is only at physical layer

OSI model - more complicated but most common

TCP model
- application (http etc)
- transport (tcp etc)
- network (IP)
- data link (ethernet, wifi)
- physical layer

# End to end principle
- add "smarts" at the endpoints
- easier to change these than the middle
	- keep middle simple, scalable, dumb
- KISS

# security not built in
- originall no security
- security was added
	- http -> https
	- ssl (secure socket layer) has been replaced by tls
	- tls (transport layer security)
	- ftp - sftp (file transfer)
	- scp (secure copy)
	- ssh (secure shell)

# security certificates
- client needs to authenticate the server
	- also vice versa
- need to establish secure connection
- trusted third parties are used to sign server host's certificates
- "tree of trust"
- based on public key crypto

# GPG
GNU privacy gurad (free libre open source) work alike for PGP

![GPG example|400](https://i.imgur.com/9f2TJl2.png)

# S/MIME
cryptography for email

secure multipupose internet mail expensions

often not used, as it is not usually built in

# Crypto

