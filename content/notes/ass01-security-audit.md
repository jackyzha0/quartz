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
## SQL Injection 
CWE: 89

It is possible to inject SQL into the database using the login username field, and display it in the brower as the "username" of the logged in user.

The first thing I attempted was to login using the username " 'or 1=1;--". This worked and I was logged in as administrator.
After that I created an account. When I noticed that my username was displayed in the brower I attempted to extract data from the database and display is as this username. 

In the username field of the login form I entered the string:

' union select group_concat(username||':'||password||':'||name||':'||credit_card_number||':'||credit_card_expiry||':'||credit_card_cvv) from user as name;--

This resulted in all the users data and hashed passwords being displayed in the browser. I was then able to crack 48 of the passwords using hashcat and the rockyou wordlist. 

## Cross site scripting/Javascript injection
CWE: 79

The product catalogue is visible to other users. This means if we were able to update the product information in the database we could run javascript on the brower of other users.

Since we are able to inject SQL using the username field on the login page, we can execute an UPDATE command on the database. This is the input I used:

'; update PRODUCT set DESCRIPTION = '<script>alert("hello")</script>' where PRODUCT_ID = 67696;--

An attacker could use this to present the user with an unsafe link, or export data such as session ID's and cookie data to a remote server where they can view it.

I was also able to create an account with the username ''<script>alert("hello")</script>", however when I logged in, the alert was not shown and the username in the login page was blank. 

## Password policy
CWE: 521

This website only requires that the users passwords have 5 character and 1 number. This does not at all meet the requirements for a secure password, and means the passwords can be easily cracked.

## Use of a Broken or Risky Cryptographic Algorithm
CWE: 327

The website uses md5 to hash the passwords which is not a secure hash function. It also does not salt or pepper the passwords.

## Improper Restriction of Excessive Authentication Attempts
CWE: 307

The login page does not restrict the number of login attempts. This means it is possible for an attacker to attempt many passwords to gain access to an account.

## Path traversal
CWE: 22
- You can access the welcome page simply using the path /catalogue/welcome.jsp. This will load the welcome page with the username null. However it is unclear whether this is a security issue as curently the welcome page offers no functionality. 
- I dont think there are any path traversal flaws in this website. This is because there isn't any urls which contain queries or parameters relating to sensitive pages. 








## SQL Injection
- can log in to admin using username: " 'or 1=1;--"
- we are able to  extract data which is displayed as the users username
- we can extract the data from the data base using this "username"
	- ' union select group_concat(username||':'||password||':'||name||':'||credit_card_number||':'||credit_card_expiry||':'||credit_card_cvv) from user as name;--
	- I was able to crack 48 of the 101 passwords using the rockyou wordlist. I'm sure It would not be difficult to crack more.
- you cant also update the data. E.g., set the price of all products to zero using this as a username in the login box
	- '; update PRODUCT set UNIT_PRICE = 0 where 1=1;--

## Javascript Injection
- It ispossible to perform a javascript injection as the users name is displayed in the website. and prodcut information is displayed in the view catalogue page
- I was able to create an account and log in using the username ''<script>alert("hello")</script>''. However when I did log in the username wasn't displayed in the browser, and alert didn't show. I also repeated the process with the user name ''<script>console.log("hello")</script>'' which also didn't run
- You was able to update a product name to be a script which would then run on others systems
	- e.g. '; update PRODUCT set DESCRIPTION = '<script>alert("hello")</script>' where PRODUCT_ID = 67696;--
- this could be used to export JSESSIONIDs of other users. Which would allow the attack to access their account (while the other user is logged in).
- It could also be used to present the user with a legitamate seeming message encouraging them to open a malicious link.

## Network-Level security
- when a user logs in a post request to the server transmits the username and unhashed password to the server. This informaiton is susceptible to a man in the middle attack or other kinds of interception. Hopefully the website uses http. 
![example payload](https://i.imgur.com/9Tn6gx1.png)
## Other
