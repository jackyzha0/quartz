---
title: "authentication"
aliases: 
tags: 
- comp210
---

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
