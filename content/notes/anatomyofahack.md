---
title: "anatomyofahack"
aliases: 
tags: 
- comp210
- 
---

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
