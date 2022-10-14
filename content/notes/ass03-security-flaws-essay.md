# Security Flaws Essay

Jet Hughes 9474308

## The Articles
### Mat Honan - Wired 2012
This article [^8], written by Mat Honan for Wired magazine in 2012, gives a detailed account of how Honan's digital life was torn apart. His Amazon, apple and Gmail account were used to gain access to his Twitter profile, which was then used to broadcast hateful messages. And if that was not bad enough, his iPhone, iPad, and MacBook were all wiped to prevent him from regaining access to his accounts. Unfortunately, Honan did not keep backups of his MacBook and lost all his photos and videos of his daughter's first few years.

Firstly, the hacker - Phobia, was able to find his email address on his personal website, which was linked to on his Twitter profile. Then from the Google account recovery website he was able to find out that Honan's recovery email was a me.com email provided by Apple. Phobia then got Honan's billing address using a whois request on his personal website, then manipulated Amazon's customer service to obtain the last four digits of one of Honan's credit cards. He then used the billing address and the credit card to convince Apple's customer service team that he was Honan - despite being unable to answer the security questions - and take over his Apple account. Phobia then wiped Honan's devices, then used his email accounts to gain access to his Twitter.

Ultimately, Phobia’s main purpose was to gain access to Honan's Twitter account, which was valuable because it had a short username. They just wanted to "fuck shit up".

### Russell Brandom - The Verge 2015
The second article [^7], written by Russell Brandom, is similar to the previous one. It describes how one person's online life was compromised - Partap Davis. This time the goal was not just to "fuck shit up". The attacker - Eve, had a specific goal in mind - his valuable cryptocurrency. They stole 10 Bitcoin worth roughly $3000 at the time. 

Davis was not an easy target, he used two-factor authentication, secure passwords, and authentication apps. However, this did not protect him. Davis used a mail.com address which forwarded emails to another email. Unfortunately, a script existed that Eve was able to use to send a password reset email to themselves, thus gaining access to the account. They were then able to manipulate Davis's phone company so that they would reroute calls to his number to a burner phone Eve had purchased. Eve was able to use this phone to get around all the two-factor authentication Davis had set up. This allowed them to access his Coinbase account and take his Bitcoin. Luckily, Davis's BTC-e and Bitstamp account were safe. BTC-e required 48 hours wait after a password change, and Bitstamp required a picture of Davis's driver's license.

It is clear they chose Davis because they knew in advance that he had a Coinbase account. It is likely his email was leaked in a list of Coinbase users or from an equipment manufacturer or a Bitcoin retailer. When people like Davis have so many different accounts, all linked together, there is a large attack surface.

## Commonalities
Although the events described in these articles are unfortunate, they provide valuable insight into the security practices of the individuals and companies affected. There are many similarities in the methods that each of the hackers used, as well as which type of vulnerabilities they were able to exploit. In both cases, the hackers were able to gain access to an email account, and use it to reset passwords, and break into its associated accounts. Both hackers were able to convince tech support that they were who they said they were, with minimal information. These tech support workers, although they may have been merely following company procedure, placed a higher priority on the convenience of their services, to the detriment of their security. 

## C.I.A. Dimensions
Confidentiality, Integrity, and availability are all affected

**Confidentiality:** Attackers were able to access private information. Eve gained access to his emails, phone calls, twitter, and any information stored on his cryptocurrency accounts. Phobia also gained access to all of Honan's emails, and any information stored on his twitter, iCloud, iPad, iPhone, or MacBook.

**Integrity:** Attackers were able to alter information about the victims, without authorisation. They were both able to change the victim’s passwords, and most notably - Phobia wiped all the data from Honan's Apple devices.

**Availability:** Attackers were able to block victims from accessing their accounts. Phobia wiped all of Honan's Apple devices, and he lost all the data stored on them that was not backed up. He was also blocked from accessing any of the accounts where his password was changed. Eve rerouted Davis's calls and locked him out of many accounts he should have had access to.

## Rules
These two articles have taught us some valuable lessons. Some of these include:
- Companies should value security over convenience (to a degree) and tech support staff should adhere strictly to policy
- Companies should be more aware of how information available through their service can be used by hackers to break into other services.
- Individuals should try to limit the degree to which accounts are daisy-chained together.
- Individuals should keep regular backups.

Based on these lessons, we can design a set of rules which small to medium enterprises should follow to keep themselves and their customers secure. Firstly, SMEs should identify and understand their risks. For example: Theft of company information, website defacement, phishing attacks, ransomware, and data loss due to natural events and accidents as well as others.

There are six main rules which I have decided on. These are based on the CIS 18 controls list [^5], the CIS SME controls list [^1], Google's security control list for small [^3] and medium to large [^2] companies, and Canada's list of security controls for small and medium organisations [^6].

**Incident Response Plan:** SMEs should assume that they will inevitably be compromised, and they should be ready to respond. They should have systems in place to detect attacks when they happen, and have a plan for how to respond, and prevent it from occurring again in the future. 

**Strong User Authentication:** This one of the most important rules. In addition to strong passwords, SMEs should require two-factor authentication, preferably with an authenticator app and not just by text. SMEs should also require users to create strong security questions, so that accounts can be recovered if a password is stolen, there should not be any secondary questions or other information that a user can use to recover an account.

**Awareness Training:** For all employees, including customer service and tech support. Employees should be made aware of the proper procedures and standards and adhere strictly to them.

**Backups:** Backups should be done regularly. Backups for different devices should be done at varying intervals - the more sensitive or important the data, the more frequent the backup. They should be stored in a secure place in encrypted form. They should be stored off-site, either via a cloud service or at external physical locations.

**Perimeter defences:** SMEs should use firewalls to protect against online threats. Spam and malicious emails should be filtered. Should use secure Wi-Fi.

**Access Control and Authorisation:** Should follow the principle of least privilege. Users should have only the minimal permission required to do their task. Higher level accounts like administrators should have further restrictions preventing them from doing user-level activities. Shared and shared-use accounts should be minimized. Unused accounts should be deleted.

## Guidelines
The clients of these SME's should:
- Create an incident response plan
- If their risk is high enough, they should hire a third party security company.
- Keep Backups in the same manner as the SMEs
- Provide awareness training to employees
- Use strong passphrases and enable two-factor authentication.
- Keep personal devices and accounts separate from work accounts and devices
- Require employees to keep devices up to date
- Require employees to use antivirus and antimalware tools on their devices

## References
[^1]: https://www.cisecurity.org/wp-content/uploads/2017/09/CIS-Controls-Guide-for-SMEs.pdf
[^2]: https://support.google.com/a/answer/7587183?hl=en
[^3]: https://support.google.com/a/answer/9211704?hl=en
[^4]: https://gblogs.cisco.com/ca/2019/11/08/baseline-cybersecurity-controls-for-small-and-medium-organizations/
[^5]: https://www.cisecurity.org/controls/cis-controls-list
[^6]: https://cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations
[^7]: https://www.theverge.com/a/anatomy-of-a-hack
[^8]: https://www.wired.com/2012/08/apple-amazon-mat-honan-hacking/
