---
title: "05-crypography"
aliases: 
tags: 
- lecture
- comp210
---

# news
- zodiac killer code cracked
- twitter leak

# Brief history
- study of secret messages
- confidentiality of [cia-triad](notes/cia-triad.md)
- also small role in integrity (authentication of message, and sender)
- history of cyprtopgraphy is interwined with information technology

Language use for communication seems to be part of human nature: perhaps the use of covert lanuage is too

## need for confidentiality
"nothing to hide: nothing to fear" look at edward snowdens corrolary

We all have legit needs for privacy. Cryptography provides technical measure for ensuring this privacy.

## history
- caesar cipher
	- simple substitution scheme (rotation)
	- vulnerable to cryptanalysis
	- key is a single integer
	- symmetrical (same key for encrypt and decrypt)
	- so ciphertext has the same patterns as the plaintext e.g., letter frequencies
	- this leads to cryptanalysis: systematic ways of determining the encryption scheme
	- modern ciphers aim to make the cipher text resemble *noise* (random data)

# General process
- encrypt
	- plaintext + key => ciphertext
	- key is a secret
- decrypt
	- ciphertext + key => plaintext

mathmatically
- c = e(p, k)
- p = d(c, k)

# Terminology
- copy later

# Plaintext
refers to unencypted message. In the digital age the messages are often not plain text (ascii, unicode, etc).

digital crypto schemes normally work on the binary data (images, .docs, .txt, mp4 etc.)

# Conventions
- alice, bob, charlie, etc
- mallory -> malicious
- etc
- public vs private domains
	- assume communication is public
	- assume information is prepared and consumed in private domain

# Randomness
- a lack of predicability
- no patterns
- 
