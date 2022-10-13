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

When Honan discovered that he had been hacked, he called apple customer service, which achieved very little. He then made a post on his Tumblr account detailing what had happened to him. Subsequently, the hackers reached out to him and told him how and why they had hacked him. Ultimately the hacks main purpose was to gain access to his twitter account which was valuable because he had a short username. They just wanted to ""

- guy got hacked
- amazon - apple - gmail - twitter
- could have been prevented with 2fa on google
- ultimate goal twitter
- should have used backups for devices
- was his fault
- but also security flaws in apple and amazon
	- final four digits shared by amazon are required by apple
	- disconnect exposes flaws in tech industry
	- foreshadows issues in era of cloud and connected devices
	- password based systems are no longer suffice

5pm 
- phone powered down
- This was irritating, but I wasn’t concerned
- assumed it was a software glitch
- phone automatically backs up
- I was irritated, but not alarmed.
- the screen went gray, and asked for a four-digit PIN
- I knew something was very, very wrong.
- unplugged my router and cable modem, turned off the Mac Mini
- called AppleCare
- a call had been placed just a little more than a half an hour before my own.
- Apple rep didn't bother to tell me about the first call concerning my account
- only shared this information after I asked about it
- someone called AppleCare claiming to be me.
	- reported that he couldn't get into his Me.com e-mail
	- issued a temporary password
	- despite the caller’s inability to answer security questions I had set up
	- it did this after the hacker supplied only two pieces of information that anyone with an internet connection and a phone can discover.
- a password reset confirmation arrived in my inbox
	- I don’t really use my me.com e-mail, and rarely check i
	- hackers immediately sent it to the trash.
	- reset my AppleID password
- Gmail password recovery e-mail
	- Google account password had changed
- reset my Twitter password.
- used iCloud’s “Find My” tool to remotely wipe my iPhone, iPad, Macbook
- deleted my Google account
- the attackers posted a message to my account on Twitter taking credit for the hack.
- not only had the ability to control my account, but were able to prevent me from regaining access
- those deletions were just collateral damage
- I spent an hour and a half talking to AppleCare
	- Apple had been looking at the wrong account
	- alternate set of questions
	- a billing address and the last four digits of my credit card.
- all you need to access someone’s AppleID is the associated e-mail address, a credit card number, the billing address, and the last four digits of a credit card on file.
- company spokesperson Natalie Kerris told Wired, "Apple takes customer privacy seriously and requires multiple forms of verification before resetting an Apple ID password. In this particular case, the customer's data was compromised by a person who had acquired personal information about the customer. In addition, we found that our own internal policies were not followed completely. We are reviewing all of our processes for resetting account passwords to ensure our customers' data is protected."
- Wired tried to verify the hackers' access technique by performing it on a different account. We were successful

- I logged into Tumblr and posted an account of how I thought the takedown occurred
- one of my hackers @ messaged me - Phobia
- I agreed not to press charges, and in return he laid out exactly how the hack worked.
- “didnt guess ur password or use bruteforce. i have my own guide on how to secure emails.”
	- why - the hack was simply a grab for my three-character Twitter handle
	- take it, and fuck shit up, and watch it burn.
- My Twitter account linked to my personal website, where they found my Gmail address
- I didn’t have Google's two-factor authentication turned on, when Phobia entered my Gmail address, he could view the alternate e-mail I had set up for account recovery - ....@me.com - revealed he had an appleID acc, and was vulnerable
- Google partially obscures that information, starring out many characters, but there were enough characters available
- “You honestly can get into any email associated with apple,”
- all he needed was my billing address and the last four digits of my credit card
- got the billing address by doing a whois search on my personal web domain
	- can also look up his or her information on Spokeo, WhitePages, and PeopleSmart.
- Getting a credit card number is tricker,
	- call Amazon and tell them you are the account holder, and want to add a credit card number to the account.
	- All you need is the name on the account, an associated e-mail address, and the billing address
	- call back, and tell Amazon that you've lost access to your account
	- providing a name, billing address, and the new credit card number you gave the company on the prior call
	- allow you to add a new e-mail address
	- go to the Amazon website, and send a password reset to the new e-mail account.
	- allows you to see all the credit cards on file for the account – not the complete numbers, just the last four digits
	- Apple only needs those last four digits
- could have used my e-mail accounts to gain access to my online banking, or financial services. They could have used them to contact other people, and socially engineer them as well.

- should have been regularly backing up my MacBook
- shouldn't have daisy-chained two such vital accounts – my Google and my iCloud account – together.
- I shouldn't have used the same e-mail prefix across multiple accounts – mhonan@gmail.com, mhonan@me.com, and mhonan@wired.com.
- should have had a recovery address that's only used for recovery without being tied to core services
- mostly, I shouldn’t have used Find My Mac
- Find My iPhone has been a brilliant Apple service
- When you perform a remote hard drive wipe on Find my Mac, the system asks you to create a four-digit PIN so that the process can be reversed
- If someone else performs that wipe – someone who gained access to your iCloud account through malicious means – there’s no way for you to enter that PIN
- A better way to have this set up would be to require a second method of authentication when Find My Mac is initially set up.

- I’m not even especially angry at Phobia, or his partner in the attack. I’m mostly mad at myself. I’m mad as hell for not backing up my data. I’m sad, and shocked, and feel that I am ultimately to blame for that loss

## 2015 Brandom Anatomy of a Hack
[link](https://blackboard.otago.ac.nz/bbcswebdav/pid-2956926-dt-content-rid-18904225_1/xid-18904225_1)

- david was careful -2fa etc
- used mail.com address which fowarded to another
- someone broke in and stopped the fowarding, added a phone number, 
	- burner Android device registered in Florida.
	- new backup email too, swagger@mailinator.com,
	- likely that she used a script to target a weakness in Mail.com’s password reset page
	- $5 per account. It’s unclear how the exploit worked and whether it has been closed
	- Without any authentication, she was able to reset Davis’ password
- ATT.com sent along a secure link to partap@mail.com to reset it
	- she talked a customer service rep into forwarding his calls to her Long Beach number
	- supposed to be more safeguards required to set up call forwarding
	- But faced with an angry client, customer service reps will often give way, putting user satisfaction over the colder virtues of security.
	- (use robots?)
	- Davis still got texts and emails, but every call was routed straight to the attacker
- Davis’ Google account
	- .Experts will tell you that twofactor authentication is the best protection against attacks
	- two-factor services end up looking like just one more account to crack
	- Davis hadn't set up Google's Authenticator app, the more secure option,
	- thanks to Google's accessibility functions, she could ask for the confirmation code to be read out loud over the phone
- Authy should have been harder to break
	- Eve simply reset the app on her phone using a mail.com address and a new confirmation code, again sent by a voice call.
- Eve reset Davis's Coinbase account, using Authy and his Mail.com address
	- she transferred the full balance
	- Authy might have known something was up. The service keeps an eye out for fishy behavior, and while they’re cagey about what they monitor, it seems likely that an account reset to an out-of-state number in the middle of the night would have raised at least a few red flags
	- Modern security systems like Google’s ReCAPTCHA often work this way, adding together small indicators until there’s enough evidence to freeze an account — but Coinbase and Authy each only saw half the picture, and neither had enough to justify freezing Partap’s account.
- BTC-e had put a 48-hour hold on the account after a password change, giving him time to prove his identity and recover the account. Bitstamp had an even simpler protection: when Eve emailed to reset Davis's authentication token, they had asked for an image of his driver's license. Despite all Eve's access, it was one thing she didn't have. Davis’ last $2,500 worth of bitcoin was safe.

- Eve's computer was piping in from a block of IP addresses in Canada, but she may have used Tor or a VPN service to cover her tracks. Her phone number belonged to an Android device in Long Beach, California, but that phone was most likely a burner

Why did she choose Partap Davis? 
- She knew about the wallets upfront
- somehow, Eve came across a list of bitcoin users with Davis’ email address on it.
- A number of leaked Coinbase customer lists are floating around the internet
- maybe his identity came from an equipment manufacturer or a bitcoin retailer.

- There were just so many accounts, so many ways to get in.
	- attack surface. The bigger the surface, the harder it is to defend

- In the fight between security and convenience, security is simply outgunned.

# What do they have in common?

- both stories of people being hacked
- both times customer service and convenience had higher priority than security
- access to one account allowed access to many other account by resetting passwords etc
- 

# Which C.I.A Dimensions are affected?
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