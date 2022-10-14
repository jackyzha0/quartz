---
title: "ass03-security-flaws-essay"
aliases: 
tags: 
- comp210
- assignment
---

Jet Hughes 9474308

# What are the articles?
## 2012 Honan Wired
[link](https://blackboard.otago.ac.nz/bbcswebdav/pid-2956926-dt-content-rid-18904224_1/xid-18904224_1)

This article, written by Mat Homan for Wired magazine in 2012, gives a detailed account of how Honan's digital life was torn apart. His amazon, apple and gmail account were used to gain access to his twitter profile, which was then used to broadcast hateful messages. And if that wasn't bad enough, his iPhone, iPad, and macbook were all wiped to prevent him from regaining access to his accounts. Unfortunately, Honan did not keep backups of his macbook and lost all his photos and videos of his daughters first few years. 

Firstly, the hacker was able to find his email address on his personal website which was linked to on his twitter profile. Then from the google account recovery website he was able to find out that Honan's recovery email was a me.com email provided by Apple. The hacker then got Honan's billing address using a whois request on his personal website, then manipulated amazons customer service to obtain the last four digits of one of Honan's credit cards. He then used the billing address and the credit card to convince Apple's customer service team that he was Honan - despite being unable to answer the security questions - and take over his Apple account. The hacker then wiped Honan's devices then used his email accounts to gain access to his Twitter.  

When Honan discovered that he had been hacked, he called apple customer service, which achieved very little. He then made a post on his Tumblr account detailing what had happened to him. Subsequently, the hackers reached out to him and told him how and why they had hacked him. Ultimately the hacks main purpose was to gain access to his twitter account which was valuable because he had a short username. They just wanted to "fuck shit up".

## 2015 Brandom Anatomy of a Hack
[link](https://blackboard.otago.ac.nz/bbcswebdav/pid-2956926-dt-content-rid-18904225_1/xid-18904225_1)

The second article, written by Russell Brandom, is vey similar to the previous one. Brandom was also the victim of a hack. However, this time the goal was not just to "fuck shit up". The attackers had a specific goal in mind - his valuable cryptocurrency. They stole 10 bitcoin worth roughly $3000 at the time. However, the other two cryptocurrency services that Brandom used - BTC-e and Bitstamp - had some very simple security measures that prevented the hacker from breaking int them. 

Brandom was not an extremely easy target, he used two-factor authentication, secure passwords, and authentication apps. However, this did not protect him. Brandom used a mail.com address which fowarded emails to his another email. Unfortunately, a script existed that the hacker was able to use to send a password reset email to themselves, thus gaining access to the account. They were then able to manipulate Brandom's phone company so that they would reroute calls to his number to a burner phone the hacker had purchased. The hacker was able to use this phone to get around all the two-factor authentication Brandom had set up. This allowed them to access his coinbase account, and take his Bitcoin. Luckily, Brandom's BTC-e and Bitstamp account were safe. BTC-e required 48 hours wait after a password change, and Bitstamp required a picture of Brandom's drivers license. 

So why did the hacker choose Brandom as their victim? It's clear they chose Brandom because they knew in advance that he had a Coinbase account. It's likely his email was leaked in a list of Coinbase users or from an equipment manufacturer or a bitcoin retailer. The fact is, when people like Brandom have so many different account, all linked together, there is a very large attack surface. This makes it more likely that a hacker will be able to find *some* way to compromise your digital life.

# What do they have in common?
Although the events describes in these articles are unfortunate to put it midly, they do provide valuable insight into the security practices of those individuals and companies affected.


- both stories of people being hacked
- both times customer service and convenience had higher priority than security
- access to one account allowed access to many other account by resetting passwords etc
- 

# Which C.I.A Dimensions are affected?
250
Confidentiality, Integrity and availablility are all affected

C - attackers were able to access private information
I - attackers were able to change information
A - attackers were able to block victims from accessing their accounts

# Case

lessons learned
- large attack surface is bad
- value security over convenience/customer service
- try to prevent information leaks
- use security questions

## Identify risk and threats
- theft of company information
- website defacement
- phishing attacks
- ransomware
- data loss due to natural events and accidents

1. incident response plan
4. use strong user authentication
5. awareness training
6. backups
7. perimeter defenses
8. access control and authorisation

### IR Plan
SMEs should assume that they will be inevitably be compromised, and they should be ready to respond. They should have systems in place to detect attacks when they happen, and have a plan for how to respond, and prevent it from occuring again in the future. If they are unable to respond to attacks themselves, they should know who to contact. They should also purchase a cyber security insurance policy, and consider what legal obligations they have to their stakeholders.

### Strong User Authentication
This one of the most important rules. In addition to strong passwords SMEs should require two-factor authentication, preferrably with an authenticator not just by text. 

SMEs should also require users to create strong security questions, so that accounts can be recovered if a password is stolen, there should not be any secondary questions that a user can use to recover an account.

### Awareness Training
For all employees including customer service and tech support. Employees should be made aware of the proper procedures and standards and adhere strictly to them.

### Backups
In the event of an attack, the company needs to have their data backed up. Backups should be done regularly. Backups should be made not only the main company and user data but also of all employees laptops and mobile devices.

Backups for different devices should be done at varying intervals - the more sensitive or important the data, the more frequent the backup. 

Backups should be stored in a secure place in encrypted form. They should be stored offsite either via a cloud service or external physical locations.

### Perimeter defenses
use firewalls to protect against online threats. Spam and malicious emails should be filtered. should use secure wifi. 

### Access control and Authorisation
Should follow the principle of least privilege. User's should have only the minimal permission required to do their task. Higher level accounts like administrators should have further restrictions preventing them from doing user-level activities

Shared and shared-use accounts should be minimized. Unused accounts should be deleted. 

# References
- https://www.cisecurity.org/wp-content/uploads/2017/09/CIS-Controls-Guide-for-SMEs.pdf
- https://support.google.com/a/answer/7587183?hl=en
- https://support.google.com/a/answer/9211704?hl=en
- https://gblogs.cisco.com/ca/2019/11/08/baseline-cybersecurity-controls-for-small-and-medium-organizations/
- https://www.cisecurity.org/controls/cis-controls-list
- https://cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations