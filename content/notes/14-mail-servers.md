---
title: "14-mail-servers"
tags: 
- lecture
- cosc301
---


What is an email? 
- A formatted file in ASCII code 
- Consists of 
	- Envelope 
	- Header 
	- Body

![](https://i.imgur.com/F5e7LZs.png)

Components in Email Architecture 
- User Agent (UA) 
	- For users to compose, send, and browse emails 
	- pine, Mail, ThunderBird 
- Mail Transport Agent (MTA) 
	- Emails are handed to it for delivery 
	- sendmail, exim 
- Mail Access Agent (MAA) 
	- Retrieve message from mailbox

![Email Architecture](https://i.imgur.com/EtIiCDZ.png)

> [!INFO] could be delivered through many proxies

Email Protocols 
- SMTP (Simple Mail Transfer Protocol) 
	- Email delivery protocol between two MTAs 
	- Used twice: between the sender and the sender’s mail server and between the two mail servers 
- Mail fetching protocols 
	- Between the receiver and its mail server 
	- Post Office Protocol (POP): simple but limited in functionality 
	- Internet Mail Access Protocol (IMAP): more features, more powerful and more complex. 
		- Can check the e-mail header prior to downloading 
		- Can search the contents for a specific string prior to downloading 
		- Can partially download email

> [!INFO] STMP sender - server, server to server
> POP simple and limited, STMP more features + more config required

SMTP example SMTP example 
- S: 220 smtp.example.com ESMTP Postfix 
- C: HELO relay.example.org 
- S: 250 Hello relay.example.org, I am glad to meet you 
- C: MAIL FROM: 
- S: 250 Ok 
- C: RCPT TO: 
- S: 250 Ok 
- C: RCPT TO: 
- S: 250 Ok 
- C: DATA 
- S: 354 End data with . 
- C: From: "Bob Example" 
- C: To: Alice Example 
- C: Cc: theboss@example.com 
- C: Date: Tue, 15 January 2008 16:02:43 -0500 
- C: Subject: Test message 
- C: 
- C: Hello Alice. 
- C: This is a test message with 5 header fields and 4 lines in the message body. 
- C: Your friend, 
- C: Bob 
- C: . 
- S: 250 Ok: queued as 12345 
- C: QUIT 
- S: 221 Bye 
- {The server closes the connection}

Email Spams (1) 
- Also called junk emails 
	- Anonymity: address and identity of the sender are concealed 
	- Mass Mailing: sent to large groups of people 
	- Unsolicited: not requested by the recipients 
- Email spams grow steadily. 
	- ~ 200 billion spam messages sent per day [2010] 
	- > 97% of all emails sent over Internet are unwanted 
- The negatives 
	- Use up mailbox space 
	- Click links in spam email may send users to phishing websites or sites that host malware. 
	- May contain malware such as scripts or executable file attachments 
	- Deception and fraud

Email Spoofing/Phishing 
- Spoofing is the creation of email messages with a forged sender address 
	- Simple to do because the core protocols do no authentication 
- Phishing is the attempt to acquire sensitive information such as usernames, passwords, and credit card details by masquerading as a trustworthy entity 
	- Typically carried out by email spoofing 
- Tips to identify spoofing and phishing email 
	- Are the URLs legitimate? 
	- Incorrect grammar/spelling 
	- Suspicious attachments 
	- Request for personal information 
	- Urgent/Too good to be true 
	- IP Reputation

Anti-Spam Techniques (1) 
- Detect spam email 
	- Subject line: “I have money for you” 
	- Attachments: .exe 
	- Contents 
	- DNSBLs: lists of domain names of known spammers 
- End-user techniques 
	- Report an unsolicited email: http://complaints.antispam.govt.nz 
	- Do not expose your email address unless necessary 
- Spammers can collect email addresses from websites, customer lists, newsgroups, and viruses which harvest users' address books. 
	- Avoid responding to spams 
	- Disposable email addresses

Anti-Spam Techniques (2) 
- Automated techniques 
	- DNS-based blacklists 
	- Pattern detection 
	- Email filtering 
		- Statistical content filtering 
		- Checksum-based filtering 
		- Rule-based filtering 
		- Hybrid filtering 
		- …

Email Virus 
- A virus (malware program) that comes within an attached file in an email message. 
	- Trojan horse 
	- macro virus 
	- … 
- Don’t trust attachments. Pay attention to the extensions of the attachments 
	- Files with .EXE or .VBS extensions are always suspect 
	- zip archives may contain executable codes 
	- A full list of blocked extensions in Otago Email system http://www.otago.ac.nz/its/services/security/otago030398.html 
- If uncertain, scan it using an anti-virus software


Email Bomb 
- A form of network abuse consisting of sending huge volumes of email to an address in attempt to overflow the mailbox or the server where the email address is hosted. 
- Is a type of denial-of-service attack (DDoS) 
- Methods of Email bombing 
	- Mass mailing 
		- Can be easily detected by spam filters 
	- List linking 
		- Mailing lists 
	- Zip bombing 
		- Zip files that take long time for the email server to unpack and check contents.

Email Privacy 
- PGP (Pretty Good Privacy) 
	- Provides cryptographic privacy and authentication 
	- Widely used to secure emails 
	- Originally free, now also have commercial versions available 
- S/MIME(Secure MIME): a standard for public key encryption and signing of MIME data 
	- digital signing and message encryption using certificates 
- STARTTLS: a TLS(SSL) layer on top of the SMTP connection that protects emails from being sniffed during transmission 
	- encryption takes place between individual SMTP relays, not between the sender and the recipient.

MTA Configuration (1) 
- Auto-forwarding 
	- Automatically forward emails to another mailbox 
- Auto-reply 
	- I am on vacation between ** and **

MTA Configuration (2) 
- Email fetching protocol 
	- POP or IMAP? 
- Mailing list 
- Server security setting 
- Digital signature and encryption

