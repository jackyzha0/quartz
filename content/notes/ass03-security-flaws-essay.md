---
title: "ass03-security-flaws-essay"
aliases: 
tags: 
- comp210
- assignment
---

Jet Hughes 9474308

# References
- 

# What are the articles?
## 2012 Honan Wired
[link](https://blackboard.otago.ac.nz/bbcswebdav/pid-2956926-dt-content-rid-18904224_1/xid-18904224_1)

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

# What do they have in common?

# Which C.I.A Dimensions are affected?

# Case