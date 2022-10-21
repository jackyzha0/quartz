---
title: "04-authentication-authorisation-passwords"
aliases: 
tags: 
- lecture
- comp210
sr-due: 2023-02-05
sr-interval: 106
sr-ease: 250
---

- [authorisation](notes/authorisation.md)
- [authentication](notes/authentication.md)
- [passwords](notes/passwords.md)







# Authentication
- proof of identity
- need to be sure a user is who they say they are before you can trust them
- usually done via a unique identifier
	- unique username
- and a secret that is only known by the authorised user
	- password
	- biometrics
	- 2fa code

## MFA
- many secrets
- protects user/system in the case that a password is disclosed
- additional secrets generated at the time of use.
	- short lived
	- if found - attackers have a small windoe to exploit
- e.g.,
	- sms message
	- authenticator app

# Authorisation
- verifying that a user is allowed to access the operation that they are attempting to access
- requires explicit check in the system for restricted operatons
	- some code that check if the roles assigned to the authenticaed user intersect the roles required for the current operation
- use is assigned a **role** that defines the operations they are allowed to perform
- e.g.
	- custoemer - can view products, and see retail prices
	- sales rep - can view products and see retail and cost prices
	- manager - can add/delete/modify products
	- admin - can change system configuration. can assign roles to users

# Authentication and Authorisation
- one is useless without the other
- many security vulnerabilities are caused by inexperienced/incompetent programmer creating systems that only have one or the other
- authenticaion without authorisation can lead to *path traversal* flaws
	- changing the url path to find admin sites
- authorisation without authenticaion is the equivalent of blindly trusting your users.

# Passwords
- not good
- lots of bad advice
- we are lazy
- "safe" passwords are difficult to enter on touch screen devices
- to many accouts

## entropy
- amount of randomness
- measure of the number of guesse an attacker would need to brute foarce
- $E = log_2(A^L)$ 
- A = size of alphabet
- L = length of password
- E = entropy in bits
- 80 bits is "safe"
	- would take decades
- 6 digits passoword - 29 bits (took 4 seconds to brute force)
- + uppercase and numbers - 36 bits