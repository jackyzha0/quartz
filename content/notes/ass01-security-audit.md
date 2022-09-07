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
- you cant also update the data. E.g., set the price of all products to zero using this as a username in the login box
	- '; update PRODUCT set UNIT_PRICE = 0 where 1=1;--

## Javascript Injection
- I could be possible to perform a javascript injection as the users name is displayed in the website. and prodcut information is displayed in the view catalogue page
- You could update a products name to be a script which would then run on others systems
- e.g. '; update PRODUCT set DESCRIPTION = '<script>alert("hello")</script>' where PRODUCT_ID = 67696;--

## Path traversal
- I dont think there are any path traversal flaws in this website. This is because there isn't any urls which contain queryies or 
## Network-Level security
- when a user logs in a post request to the server transmits the username and unhashed password to the server. This informaiton is susceptible to a man in the middle attack or 
![example payload](https://i.imgur.com/9Tn6gx1.png)
## Other
